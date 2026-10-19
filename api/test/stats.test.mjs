import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { publicStats, PRIOR_CLASSES } from '../src/stats.js';

/* D1 giả bằng SQLite thật: chạy đúng các migration của dự án và đúng câu SQL trong handler /api/stats. */
function makeEnv() {
  const db = new DatabaseSync(':memory:');
  for (const f of fs.readdirSync(new URL('../migrations/', import.meta.url)).sort())
    db.exec(fs.readFileSync(new URL(`../migrations/${f}`, import.meta.url), 'utf8'));
  const DB = { prepare(sql) { let args = [];
    const st = db.prepare(sql);
    const o = { bind(...a) { args = a; return o; }, first: async () => st.get(...args) ?? null,
      all: async () => ({ results: st.all(...args) }), run: async () => st.run(...args) };
    return o; } };
  return { env: { DB }, db };
}
const DAY = 864e5, now = Date.now();
const addUser = (db, id, email, ago) => db.prepare('INSERT INTO users (id,email,created_at) VALUES (?,?,?)').run(id, email, now - ago);
const addLp = (db, u, l, state, src) => db.prepare(
  'INSERT INTO lesson_progress (user_id,lesson_id,state,completion_source,updated_at) VALUES (?,?,?,?,?)').run(u, l, state, src, now);
const stats = async (env) => { const r = await publicStats(env); return { r, body: await r.json() }; };

test('/api/stats: rỗng thì mọi số bằng 0', async () => {
  const { env } = makeEnv();
  const { r, body } = await stats(env);
  assert.equal(r.status, 200);
  assert.deepEqual(body, { learners: 0, joined_7d: 0, lessons_done: 0, cases_done: 0, prior: PRIOR_CLASSES,
    total_learners: PRIOR_CLASSES.learners, total_lessons_done: PRIOR_CLASSES.lessons_done,
    total_cases_done: PRIOR_CLASSES.cases_done });
});

test('/api/stats: đếm đúng từ database — bỏ tài khoản hệ thống, đúng 7 ngày, mỗi (người × bài) một lượt', async () => {
  const { env, db } = makeEnv();
  addUser(db, 'u1', 'a@x.vn', 1 * DAY);
  addUser(db, 'u2', 'b@x.vn', 30 * DAY);
  addUser(db, 'u3', 'c@x.vn', 6 * DAY);
  addUser(db, 's1', 'bot@system.invalid', 1 * DAY);
  addUser(db, 's2', 'seed@system.invalid', 40 * DAY);
  addLp(db, 'u1', 'B:ob01-01', 'learned', 'lesson');
  addLp(db, 'u1', 'B:ob01-02', 'in_progress', 'lesson');      // chưa xong: không tính
  addLp(db, 'u1', 'B:ob01-03', 'mastered', 'lesson');
  addLp(db, 'u2', 'B:ob01-01', 'passed', 'lesson');
  addLp(db, 'u2', 'B:ob01-04', 'passed', 'placement');        // xếp lớp: không tính
  addLp(db, 'u3', 'B:ob01-05', 'solid', 'stage_exam');        // đề vượt chặng: không tính
  addLp(db, 's1', 'B:ob01-01', 'learned', 'lesson');          // tài khoản hệ thống: không tính
  // Một bài chỉ một dòng cho mỗi người: khoá chính chặn đếm trùng nhiều trạng thái của cùng một bài.
  assert.throws(() => addLp(db, 'u1', 'B:ob01-01', 'mastered', 'lesson'));
  const { body } = await stats(env);
  assert.equal(body.learners, 3);
  assert.equal(body.joined_7d, 2);        // u1 (1 ngày) và u3 (6 ngày)
  assert.equal(body.lessons_done, 3);     // u1×01, u1×03, u2×01
  /* Số lớp trước cộng riêng vào tổng, không lẫn vào số đếm từ website. */
  assert.equal(body.total_learners, 3 + PRIOR_CLASSES.learners);
  assert.equal(body.total_lessons_done, 3 + PRIOR_CLASSES.lessons_done);
});

test('/api/stats: chỉ trả số đếm (ba trường cũ giữ nguyên + tổng có lớp trước), không lộ thông tin cá nhân, cache công khai ngắn', async () => {
  const { env, db } = makeEnv();
  addUser(db, 'u1', 'nguoi.that@gmail.com', DAY);
  addLp(db, 'u1', 'B:ob01-01', 'learned', 'lesson');
  const { r, body } = await stats(env);
  assert.deepEqual(Object.keys(body).sort(), ['cases_done', 'joined_7d', 'learners', 'lessons_done', 'prior', 'total_cases_done', 'total_learners', 'total_lessons_done']);
  assert.ok([...Object.values(body), ...Object.values(body.prior)].every((v) => typeof v === 'object' || (Number.isInteger(v) && v >= 0)));
  const raw = JSON.stringify(body);
  assert.ok(!raw.includes('@') && !raw.includes('u1') && !raw.includes('nguoi'));
  assert.match(r.headers.get('cache-control') || '', /public, max-age=\d+/);
  assert.ok(!r.headers.get('set-cookie'));
});

test('/api/stats: số lớp trước là hằng số cố định, đúng như chủ dự án xác nhận (1.000 học viên, 10.000 lượt bài, 100 lượt case)', () => {
  assert.deepEqual(PRIOR_CLASSES, { learners: 1000, lessons_done: 10000, cases_done: 100 });
});

test('/api/stats: cases_done đếm lượt giải case (người × case), bỏ tài khoản hệ thống và nguồn XP khác', async () => {
  const { env, db } = makeEnv();
  addUser(db, 'u1', 'a@x.vn', DAY); addUser(db, 'u2', 'b@x.vn', DAY); addUser(db, 's1', 'bot@system.invalid', DAY);
  const xp = (u, src, ref) => db.prepare('INSERT INTO xp_events (user_id,source,source_ref,amount,day_local,created_at) VALUES (?,?,?,?,?,?)').run(u, src, ref, 10, '2026-10-18', now);
  xp('u1', 'case', 'cocomi-ngan-sach'); xp('u1', 'case', 'la-tra-giam-gia'); xp('u2', 'case', 'cocomi-ngan-sach');
  xp('s1', 'case', 'cocomi-ngan-sach');   // tài khoản hệ thống: không tính
  xp('u1', 'lesson', 'lesson:B:ob01-01'); // nguồn khác: không tính
  const { body } = await stats(env);
  assert.equal(body.cases_done, 3);
  assert.equal(body.total_cases_done, 3 + PRIOR_CLASSES.cases_done);   // số thật + lớp trước, số thật giữ riêng
});
