import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { getPost, createPost, createComment, toggleLike } from '../src/community.js';

/* D1 giả bằng SQLite thật (đúng các migration của dự án, gồm bài mẫu 0006) + KV giả trong bộ nhớ. */
function makeEnv() {
  const db = new DatabaseSync(':memory:');
  for (const f of fs.readdirSync(new URL('../migrations/', import.meta.url)).sort())
    db.exec(fs.readFileSync(new URL(`../migrations/${f}`, import.meta.url), 'utf8'));
  const DB = { prepare(sql) { let args = []; const st = db.prepare(sql);
      const o = { bind(...a) { args = a; return o; }, first: async () => st.get(...args) ?? null,
        all: async () => ({ results: st.all(...args) }), run: async () => st.run(...args) }; return o; },
    batch: async (list) => { for (const s of list) await s.run(); } };
  const kv = new Map();
  const SESSIONS = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } };
  const sid = 'a'.repeat(64);
  db.prepare('INSERT INTO users (id,email,created_at) VALUES (?,?,?)').run('u1', 'hv@x.vn', Date.now());
  kv.set(`s:${sid}`, 'u1');
  return { env: { DB, SESSIONS, APP_ORIGIN: 'https://tuhocmarketing.org' }, db, sid };
}
/* Định tuyến giống index.js: lấy đúng regex trong mã nguồn để test không lệch khỏi code thật. */
const SRC = fs.readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
const RX = (suffix) => { const m = SRC.match(new RegExp('p\\.match\\((/\\^\\\\/api\\\\/posts\\\\/[^/]*' + suffix + '\\$/)\\)')); return m && eval(m[1]); };
const ROUTES = [[RX(''), 'GET', getPost], [RX('\\\\/comments'), 'POST', createComment], [RX('\\\\/like'), 'POST', toggleLike]];
const req = (path, method, body, sid) => new Request('https://tuhocmarketing.org' + path, { method, body: body ? JSON.stringify(body) : undefined,
  headers: { 'content-type': 'application/json', ...(sid ? { cookie: `thmc_s=${sid}` } : {}) } });
const call = async (env, path, { method = 'GET', body, sid } = {}) => {
  if (path === '/api/posts' && method === 'POST') return createPost(req(path, method, body, sid), env);
  for (const [rx, m, fn] of ROUTES) { const mm = path.match(rx); if (mm && m === method) return fn(req(path, method, body, sid), env, mm[1]); }
  return new Response('{"error":"not_found"}', { status: 404 });
};

test('MarSocial: route lấy được từ index.js', () => { for (const [rx] of ROUTES) assert.ok(rx instanceof RegExp); });

test('MarSocial: mở, thả tim và bình luận được bài mẫu id "seed-…" (trước đây route chỉ nhận hex 36 ký tự → 404)', async () => {
  const { env, sid } = makeEnv();
  const id = 'seed-0000-0000-0000-000000000001';
  const g = await call(env, `/api/posts/${id}`);
  assert.equal(g.status, 200);
  assert.equal((await g.json()).post.id, id);
  const l = await call(env, `/api/posts/${id}/like`, { method: 'POST', body: {}, sid });
  assert.equal(l.status, 200);
  assert.equal((await l.json()).liked, true);
  const c = await call(env, `/api/posts/${id}/comments`, { method: 'POST', body: { body: 'Bình luận thử' }, sid });
  assert.equal(c.status, 200);
  assert.equal((await (await call(env, `/api/posts/${id}`)).json()).comments.length, 1);
});

test('MarSocial: id lạ (có ký tự đặc biệt, quá dài) vẫn bị chặn ở route', async () => {
  const { env } = makeEnv();
  assert.equal((await call(env, "/api/posts/abc'or'1")).status, 404);
  assert.equal((await call(env, '/api/posts/' + 'a'.repeat(60))).status, 404);
});

test('MarSocial: đăng bài không cần tiêu đề, server lấy dòng đầu làm tiêu đề; vẫn chặn nội dung quá ngắn', async () => {
  const { env, sid } = makeEnv();
  const text = 'Highlands chọn bán chỗ ngồi chứ không chỉ bán cà phê.\nVì vậy giá ly nước gánh cả tiền mặt bằng.';
  const r = await call(env, '/api/posts', { method: 'POST', body: { kind: 'phan-tich', body: text }, sid });
  assert.equal(r.status, 200);
  const { id } = await r.json();
  const p = (await (await call(env, `/api/posts/${id}`)).json()).post;
  assert.equal(p.title, 'Highlands chọn bán chỗ ngồi chứ không chỉ bán cà phê.');
  assert.equal(p.body, text);
  const short = await call(env, '/api/posts', { method: 'POST', body: { kind: 'hoi', body: 'Ngắn quá' }, sid });
  assert.equal(short.status, 400);
  assert.equal((await short.json()).error, 'body_too_short');
});
