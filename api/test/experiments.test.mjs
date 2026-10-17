import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { flagsFromConfig, isInternalUser, cleanProps, scoreBucket, CLIENT_EVENTS, SERVER_EVENTS, postEvents, recordLessonCompleted } from '../src/experiments.js';
import { ANSWER_CONTEXTS, answerEffects } from '../src/learn-core.js';

/* D1 + KV giả: SQLite thật chạy đúng các migration của dự án (gồm 0011_learning_events). */
function makeEnv({ skip = [] } = {}) {
  const db = new DatabaseSync(':memory:');
  for (const f of fs.readdirSync(new URL('../migrations/', import.meta.url)).sort()) {
    if (skip.some((s) => f.startsWith(s))) continue;
    db.exec(fs.readFileSync(new URL(`../migrations/${f}`, import.meta.url), 'utf8'));
  }
  const DB = {
    prepare(sql) { let args = []; const st = db.prepare(sql);
      const o = { bind(...a) { args = a; return o; }, first: async () => st.get(...args) ?? null,
        all: async () => ({ results: st.all(...args) }), run: async () => st.run(...args) };
      return o; },
    async batch(list) { for (const s of list) await s.run(); return []; },
  };
  const kv = new Map();
  const SESSIONS = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } };
  return { env: { DB, SESSIONS, ADMIN_EMAILS: 'boss@x.vn' }, db, kv };
}
const SID = 'a'.repeat(64);
const login = (env, db, id, email) => {
  db.prepare('INSERT OR IGNORE INTO users (id,email,created_at) VALUES (?,?,?)').run(id, email, Date.now());
  env.SESSIONS.put(`s:${SID}`, id);
  return SID;
};
const LS = '11111111-2222-4333-8444-555555555555';
const req = (body, sid = SID) => new Request('http://x/api/events', { method: 'POST', headers: { cookie: sid ? `thmc_s=${sid}` : '', 'content-type': 'application/json', 'x-thmc': '1' }, body: JSON.stringify(body) });
const ev = (event, props = {}, over = {}) => ({ event, lsid: LS, lesson_id: 'B:ob01-01', release: 'r1', device_class: 'mobile', props, ...over });
const ON = { events_enabled: true };
const rows = (db) => db.prepare('SELECT * FROM learning_events ORDER BY id').all();

test('cờ: mặc định TẮT; chỉ đúng bằng true mới bật; sai kiểu/thiếu khoá/null đều tắt', () => {
  assert.deepEqual(flagsFromConfig(undefined), { quiz_entry: false, pre_ungraded: false, events: false, release: 'r0' });
  assert.deepEqual(flagsFromConfig({}), { quiz_entry: false, pre_ungraded: false, events: false, release: 'r0' });
  for (const bad of ['true', 1, 'on', {}, [], null]) {
    const f = flagsFromConfig({ exp_quiz_entry: bad, exp_pre_ungraded: bad, events_enabled: bad });
    assert.equal(f.quiz_entry || f.pre_ungraded || f.events, false, `giá trị ${JSON.stringify(bad)} không được bật cờ`);
  }
  assert.deepEqual(flagsFromConfig({ exp_quiz_entry: true, events_enabled: true }), { quiz_entry: true, pre_ungraded: false, events: true, release: 'r1' });
});

test('rollback tức thì: bật rồi đặt lại false thì quay về r0 và tắt', () => {
  assert.equal(flagsFromConfig({ exp_quiz_entry: true }).release, 'r1');
  assert.equal(flagsFromConfig({ exp_quiz_entry: false }).release, 'r0');
});

test('tài khoản nội bộ: admin, @system.invalid, id trong cấu hình; người thật thì không', () => {
  const env = { ADMIN_EMAILS: 'Boss@x.vn' };
  assert.equal(isInternalUser({ id: 'a', email: 'boss@x.vn' }, env, {}), true);
  assert.equal(isInternalUser({ id: 'b', email: 'bot@system.invalid' }, env, {}), true);
  assert.equal(isInternalUser({ id: 'c', email: 'c@x.vn' }, env, { internal_user_ids: ['c'] }), true);
  assert.equal(isInternalUser({ id: 'd', email: 'd@x.vn' }, env, { internal_user_ids: ['c'] }), false);
  assert.equal(isInternalUser(null, env, {}), false);
});

test('allow-list: khoá lạ và giá trị sai kiểu bị bỏ; không có chỗ cho chuỗi tự do', () => {
  const spec = CLIENT_EVENTS.quiz_started;
  assert.deepEqual(cleanProps(spec, { n_items: 5, unlocked_by: 'checkpoint', email: 'a@b.c', text: 'ý chính của tôi là…' }), { n_items: 5, unlocked_by: 'checkpoint' });
  assert.deepEqual(cleanProps(spec, { n_items: '5', unlocked_by: 'tuỳ ý' }), {});
  assert.deepEqual(cleanProps(spec, { n_items: 999 }), {});
  for (const [name, s] of Object.entries({ ...CLIENT_EVENTS, ...SERVER_EVENTS })) {
    for (const [k, ok] of Object.entries(s)) assert.equal(ok('một chuỗi tự do rất dài viết bởi người dùng'), false, `${name}.${k} nhận chuỗi tự do`);
  }
});

test('scoreBucket theo ngưỡng 0-39/40-59/60-79/80-100', () => {
  assert.deepEqual([0, 39, 40, 59, 60, 79, 80, 100].map(scoreBucket), ['0-39', '0-39', '40-59', '40-59', '60-79', '60-79', '80-100', '80-100']);
});

test('POST /api/events: khách chưa đăng nhập → 401', async () => {
  const { env } = makeEnv();
  const r = await postEvents(req({ events: [ev('lesson_opened')] }, null), env, ON);
  assert.equal(r.status, 401);
});

test('POST /api/events: cờ events_enabled TẮT → không ghi gì, báo disabled', async () => {
  const { env, db } = makeEnv(); login(env, db, 'u1', 'a@x.vn');
  for (const cfg of [{}, { events_enabled: false }, { events_enabled: 'true' }]) {
    const r = await postEvents(req({ events: [ev('lesson_opened', { mode: 'full' })] }), env, cfg);
    assert.equal(r.status, 200); assert.equal((await r.json()).disabled, true);
  }
  assert.equal(rows(db).length, 0);
});

test('POST /api/events: ghi đúng, user_id từ phiên (không từ thân), chỉ props trong allow-list, không lưu IP/email', async () => {
  const { env, db } = makeEnv(); login(env, db, 'u1', 'nguoi.that@gmail.com');
  const r = await postEvents(req({ events: [
    ev('lesson_opened', { mode: 'full', lesson_kind: 'B', is_first_lesson: true, leak: 'x' }, { user_id: 'ke-gian', email: 'nguoi.that@gmail.com', ip: '1.2.3.4' }),
    ev('quiz_visible', { unlocked: true, answered: 0 }),
  ] }), env, ON);
  assert.equal((await r.json()).accepted, 2);
  const out = rows(db);
  assert.equal(out.length, 2);
  assert.ok(out.every((x) => x.user_id === 'u1' && x.is_internal === 0 && x.release === 'r1' && x.device_class === 'mobile'));
  assert.deepEqual(JSON.parse(out[0].props), { mode: 'full', lesson_kind: 'B', is_first_lesson: true });
  const all = JSON.stringify(out);
  assert.ok(!all.includes('nguoi.that') && !all.includes('1.2.3.4') && !all.includes('ke-gian') && !all.includes('leak'));
  assert.deepEqual(Object.keys(out[0]).sort(), ['day_vn', 'device_class', 'event', 'id', 'idem', 'is_internal', 'lesson_id', 'lsid', 'props', 'release', 'ts', 'user_id']);
});

test('POST /api/events: gửi lại (refresh/mạng) không tạo dòng thứ hai; khác lsid thì là lượt học khác', async () => {
  const { env, db } = makeEnv(); login(env, db, 'u1', 'a@x.vn');
  await postEvents(req({ events: [ev('quiz_started', { n_items: 5, unlocked_by: 'checkpoint' })] }), env, ON);
  await postEvents(req({ events: [ev('quiz_started', { n_items: 5, unlocked_by: 'checkpoint' })] }), env, ON);
  assert.equal(rows(db).length, 1);
  await postEvents(req({ events: [ev('quiz_started', { n_items: 5, unlocked_by: 'checkpoint' }, { lsid: '99999999-2222-4333-8444-555555555555' })] }), env, ON);
  assert.equal(rows(db).length, 2);
});

test('POST /api/events: sự kiện lạ, lsid sai, lesson_completed từ trình duyệt đều bị bỏ; lô >20 bị cắt', async () => {
  const { env, db } = makeEnv(); login(env, db, 'u1', 'a@x.vn');
  const r = await postEvents(req({ events: [
    ev('lesson_completed', { state: 'passed' }), ev('hack'), ev('quiz_visible', {}, { lsid: 'khong-phai-uuid' }), ev('quiz_visible', { unlocked: false, answered: 0 }),
  ] }), env, ON);
  assert.equal((await r.json()).accepted, 1);
  assert.deepEqual(rows(db).map((x) => x.event), ['quiz_visible']);
  const many = Array.from({ length: 40 }, (_, i) => ev('quiz_visible', {}, { lsid: `00000000-0000-4000-8000-${String(i).padStart(12, '0')}` }));
  const r2 = await postEvents(req({ events: many }), env, ON);
  assert.equal((await r2.json()).accepted, 20);
});

test('POST /api/events: admin/tài khoản hệ thống được gán is_internal=1 ngay lúc ghi', async () => {
  const { env, db } = makeEnv(); login(env, db, 'adm', 'boss@x.vn');
  await postEvents(req({ events: [ev('lesson_opened', { mode: 'full' })] }), env, ON);
  assert.equal(rows(db)[0].is_internal, 1);
  const e2 = makeEnv(); login(e2.env, e2.db, 'sys', 'bot@system.invalid');
  await postEvents(req({ events: [ev('lesson_opened', { mode: 'full' })] }), e2.env, ON);
  assert.equal(rows(e2.db)[0].is_internal, 1);
});

test('POST /api/events: giới hạn theo LÔ (60 lô/10 phút), vượt thì bỏ im lặng chứ không lỗi', async () => {
  const { env, db, kv } = makeEnv(); login(env, db, 'u1', 'a@x.vn');
  let dropped = 0;
  for (let i = 0; i < 62; i++) {
    const r = await postEvents(req({ events: [ev('quiz_visible', {}, { lsid: `00000000-0000-4000-8000-${String(i).padStart(12, '0')}` })] }), env, ON);
    assert.equal(r.status, 200);
    if ((await r.json()).dropped === 'rate_limited') dropped++;
  }
  assert.equal(dropped, 2);
  assert.equal(kv.size >= 2, true);   // chỉ khoá phiên + một khoá đếm lô: không có một khoá cho mỗi sự kiện
  assert.equal([...kv.keys()].filter((k) => k.startsWith('rl:ev:')).length, 1);
});

test('POST /api/events: thiếu bảng (chưa áp dụng migration 0011) → 200 ok, không ném lỗi, không ảnh hưởng', async () => {
  const { env, db } = makeEnv({ skip: ['0011'] }); login(env, db, 'u1', 'a@x.vn');
  const r = await postEvents(req({ events: [ev('lesson_opened', { mode: 'full' })] }), env, ON);
  assert.equal(r.status, 200);
  assert.equal((await r.json()).dropped, 'storage');
});

test('lesson_completed do server ghi đúng một lần cho (người × bài); chấm lại không nhân đôi; cờ tắt thì không ghi', async () => {
  const { env, db } = makeEnv(); const u = { id: 'u1', email: 'a@x.vn' };
  assert.equal(await recordLessonCompleted(env, {}, u, 'B:ob01-01', { state: 'passed', score: 80, isFirst: true }), false);
  assert.equal(rows(db).length, 0);
  assert.equal(await recordLessonCompleted(env, ON, u, 'B:ob01-01', { state: 'learned', score: 40, isFirst: true, lsid: LS, release: 'r1' }), true);
  await recordLessonCompleted(env, ON, u, 'B:ob01-01', { state: 'passed', score: 100, isFirst: false, lsid: LS, release: 'r1' });
  const out = rows(db);
  assert.equal(out.length, 1);
  assert.equal(out[0].event, 'lesson_completed'); assert.equal(out[0].lsid, LS); assert.equal(out[0].release, 'r1');
  assert.deepEqual(JSON.parse(out[0].props), { state: 'learned', score_bucket: '40-59', is_first_lesson: true });   // lần đầu giữ nguyên
  await recordLessonCompleted(env, ON, u, 'B:ob01-02', { state: 'passed', score: 60, isFirst: false });
  assert.equal(rows(db).length, 2);
  assert.equal(rows(db)[1].lsid, 'server'); assert.equal(rows(db)[1].release, 'r0');
});

test('lesson_completed: lỗi lưu trữ không ném ra (không bao giờ làm hỏng việc chấm bài)', async () => {
  const { env, db } = makeEnv({ skip: ['0011'] });
  assert.equal(await recordLessonCompleted(env, ON, { id: 'u1', email: 'a@x.vn' }, 'B:ob01-01', { state: 'passed', score: 80 }), false);
  void db;
});

test('câu ĐOÁN TRƯỚC (prediction): không ghi answer_events, không cập nhật mastery, không vào hàng ôn; các ngữ cảnh khác giữ nguyên', () => {
  assert.ok(ANSWER_CONTEXTS.includes('prediction'));
  assert.deepEqual(answerEffects('prediction'), { record: false, mastery: false, memory: false, capped: false });
  for (const c of ['lesson', 'checkpoint', 'review', 'practice']) assert.deepEqual(answerEffects(c), { record: true, mastery: true, memory: true, capped: true }, c);
  assert.deepEqual(ANSWER_CONTEXTS.slice(0, 4), ['lesson', 'checkpoint', 'review', 'practice']);
});

test('handler /api/answers: nhánh prediction trả về TRƯỚC mọi câu INSERT và có trần KV riêng; ngữ cảnh lạ vẫn rơi về practice', () => {
  const src = fs.readFileSync(new URL('../src/learn.js', import.meta.url), 'utf8');
  const fn = src.slice(src.indexOf('export async function answer('), src.indexOf('/* ---------- POST /api/lessons/:key/complete'));
  const iPred = fn.indexOf('answerEffects(ctxName).record'), iInsert = fn.indexOf('INSERT INTO answer_events');
  assert.ok(iPred > 0 && iInsert > iPred, 'nhánh prediction phải đứng trước INSERT answer_events');
  const branch = fn.slice(iPred, fn.indexOf('Chặn vét đáp án'));
  assert.ok(branch.includes('rl:pred:') && branch.includes('return json'), 'có trần riêng và trả về sớm');
  assert.ok(!/skill_mastery|question_memory|answer_events/.test(branch), 'nhánh prediction không chạm bảng học');
  assert.ok(fn.includes("ANSWER_CONTEXTS.includes(b.context) ? b.context : 'practice'"));
});

test('/api/me trả cờ exp cho người đã đăng nhập, mặc định tắt khi cấu hình lỗi', () => {
  const src = fs.readFileSync(new URL('../src/auth.js', import.meta.url), 'utf8');
  const me = src.slice(src.indexOf('export async function me('), src.indexOf('export async function updateMe'));
  assert.ok(me.includes('let exp = flagsFromConfig(null)'), 'bắt đầu từ cờ tắt');
  assert.ok(/try \{ exp = flagsFromConfig\(await loadConfig\(env\)\); \} catch/.test(me), 'lỗi cấu hình giữ cờ tắt');
  assert.ok(me.includes('}, exp });'));
});

test('/api/events chỉ qua đường POST có header x-thmc (CSRF) và dùng cấu hình đã nạp', () => {
  const src = fs.readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
  assert.ok(src.includes("p === '/api/events' && m === 'POST') return postEvents(request, env, await pg.loadConfig(env))"));
  assert.ok(!src.includes("CSRF_EXEMPT = new Set(['/api/subscribe', '/api/events"), '/api/events không được miễn CSRF');
});
