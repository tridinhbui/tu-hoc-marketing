/* Cộng đồng: bài đăng hiện ngay, ai cũng báo cáo được; đủ 3 báo cáo thì tự ẩn chờ quản trị xem. */
import { json, now, rid, str, currentUser, isAdmin, allow, body, publicName, today } from './lib.js';

const KINDS = ['phan-tich', 'phong-van', 'hoi'];
const HIDE_AT = 3;
const clean = (s) => s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '');

export async function listPosts(req, env) {
  const q = new URL(req.url).searchParams;
  const kind = KINDS.includes(q.get('kind')) ? q.get('kind') : null;
  const before = Number(q.get('before')) || now() + 1;
  const u = await currentUser(req, env);
  const rows = (await env.DB.prepare(
    `SELECT p.*, u.display_name FROM posts p JOIN users u ON u.id = p.user_id
     WHERE p.hidden = 0 AND p.created_at < ?1 ${kind ? 'AND p.kind = ?2' : ''}
     ORDER BY p.created_at DESC LIMIT 20`).bind(...(kind ? [before, kind] : [before])).all()).results || [];
  let liked = new Set();
  if (u && rows.length) {
    const ids = rows.map((r) => r.id);
    const l = await env.DB.prepare(`SELECT post_id FROM likes WHERE user_id = ?1 AND post_id IN (${ids.map((_, i) => '?' + (i + 2)).join(',')})`)
      .bind(u.id, ...ids).all();
    liked = new Set((l.results || []).map((x) => x.post_id));
  }
  return json({ posts: rows.map((r) => view(r, liked.has(r.id), u)), next: rows.length === 20 ? rows[rows.length - 1].created_at : null });
}
const view = (r, liked, u) => ({
  id: r.id, kind: r.kind, title: r.title, body: r.body, likes: r.likes, comments: r.comments,
  created_at: r.created_at, author: publicName({ id: r.user_id, display_name: r.display_name }), liked, mine: !!u && u.id === r.user_id,
});

export async function getPost(req, env, id) {
  const u = await currentUser(req, env);
  const r = await env.DB.prepare(`SELECT p.*, u.display_name FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = ?1`).bind(id).first();
  if (!r || (r.hidden && !isAdmin(u, env))) return json({ error: 'not_found' }, 404);
  const liked = u ? !!(await env.DB.prepare('SELECT 1 FROM likes WHERE post_id = ?1 AND user_id = ?2').bind(id, u.id).first()) : false;
  const cs = (await env.DB.prepare(`SELECT c.*, u.display_name FROM comments c JOIN users u ON u.id = c.user_id
     WHERE c.post_id = ?1 AND c.hidden = 0 ORDER BY c.created_at ASC LIMIT 200`).bind(id).all()).results || [];
  return json({ post: view(r, liked, u), comments: cs.map((c) => ({ id: c.id, body: c.body, created_at: c.created_at,
    author: publicName({ id: c.user_id, display_name: c.display_name }), mine: !!u && u.id === c.user_id })) });
}

export async function createPost(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 30000);
  const kind = KINDS.includes(b.kind) ? b.kind : null;
  const text = clean(str(b.body, 5000));
  /* Đăng kiểu mạng xã hội: không bắt buộc tiêu đề. Bỏ trống thì lấy dòng đầu của nội dung (không đủ 4 ký tự thì lấy 120 ký tự đầu). */
  let title = clean(str(b.title, 120)).trim();
  if (!title) { const first = text.trim().split('\n')[0].trim(); title = (first.length >= 4 ? first : text.trim()).slice(0, 120); }
  if (!kind) return json({ error: 'bad_kind' }, 400);
  if (title.length < 4) return json({ error: 'title_too_short' }, 400);
  if (text.length < 20) return json({ error: 'body_too_short' }, 400);
  if (!(await allow(env, `rl:post:${u.id}:${today()}`, 5, 86400))) return json({ error: 'rate_limited' }, 429);
  const id = rid();
  await env.DB.prepare('INSERT INTO posts (id, user_id, kind, title, body, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
    .bind(id, u.id, kind, title, text, now()).run();
  return json({ ok: true, id });
}

export async function createComment(req, env, postId) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 10000);
  const text = clean(str(b.body, 2000));
  if (text.length < 2) return json({ error: 'body_too_short' }, 400);
  const p = await env.DB.prepare('SELECT id FROM posts WHERE id = ?1 AND hidden = 0').bind(postId).first();
  if (!p) return json({ error: 'not_found' }, 404);
  if (!(await allow(env, `rl:cmt:${u.id}:${today()}`, 30, 86400))) return json({ error: 'rate_limited' }, 429);
  const id = rid();
  await env.DB.batch([
    env.DB.prepare('INSERT INTO comments (id, post_id, user_id, body, created_at) VALUES (?1, ?2, ?3, ?4, ?5)').bind(id, postId, u.id, text, now()),
    env.DB.prepare('UPDATE posts SET comments = comments + 1 WHERE id = ?1').bind(postId),
  ]);
  return json({ ok: true, id });
}

export async function toggleLike(req, env, postId) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const p = await env.DB.prepare('SELECT id FROM posts WHERE id = ?1 AND hidden = 0').bind(postId).first();
  if (!p) return json({ error: 'not_found' }, 404);
  const had = await env.DB.prepare('SELECT 1 FROM likes WHERE post_id = ?1 AND user_id = ?2').bind(postId, u.id).first();
  await env.DB.batch(had ? [
    env.DB.prepare('DELETE FROM likes WHERE post_id = ?1 AND user_id = ?2').bind(postId, u.id),
    env.DB.prepare('UPDATE posts SET likes = MAX(likes - 1, 0) WHERE id = ?1').bind(postId),
  ] : [
    env.DB.prepare('INSERT INTO likes (post_id, user_id) VALUES (?1, ?2)').bind(postId, u.id),
    env.DB.prepare('UPDATE posts SET likes = likes + 1 WHERE id = ?1').bind(postId),
  ]);
  const r = await env.DB.prepare('SELECT likes FROM posts WHERE id = ?1').bind(postId).first();
  return json({ liked: !had, likes: r.likes });
}

export async function report(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 3000);
  const type = b.type === 'comment' ? 'comment' : b.type === 'post' ? 'post' : null;
  const id = str(b.id, 64);
  if (!type || !id) return json({ error: 'bad_target' }, 400);
  const table = type === 'post' ? 'posts' : 'comments';
  const t = await env.DB.prepare(`SELECT id FROM ${table} WHERE id = ?1`).bind(id).first();
  if (!t) return json({ error: 'not_found' }, 404);
  const ins = await env.DB.prepare('INSERT OR IGNORE INTO reports (target_type, target_id, user_id, reason, created_at) VALUES (?1, ?2, ?3, ?4, ?5)')
    .bind(type, id, u.id, str(b.reason, 300), now()).run();
  if (ins.meta && ins.meta.changes) {
    await env.DB.prepare(`UPDATE ${table} SET reports = reports + 1, hidden = CASE WHEN reports + 1 >= ?2 THEN 1 ELSE hidden END WHERE id = ?1`).bind(id, HIDE_AT).run();
  }
  return json({ ok: true });
}

export async function adminQueue(req, env) {
  const u = await currentUser(req, env);
  if (!isAdmin(u, env)) return json({ error: 'forbidden' }, 403);
  const posts = (await env.DB.prepare(`SELECT p.id, p.title, p.body, p.reports, p.hidden, p.created_at, u.email FROM posts p JOIN users u ON u.id = p.user_id
    WHERE p.reports > 0 OR p.hidden = 1 ORDER BY p.hidden DESC, p.reports DESC LIMIT 100`).all()).results || [];
  const comments = (await env.DB.prepare(`SELECT c.id, c.post_id, c.body, c.reports, c.hidden, c.created_at, u.email FROM comments c JOIN users u ON u.id = c.user_id
    WHERE c.reports > 0 OR c.hidden = 1 ORDER BY c.hidden DESC, c.reports DESC LIMIT 100`).all()).results || [];
  const reasons = (await env.DB.prepare(`SELECT target_type, target_id, reason FROM reports ORDER BY created_at DESC LIMIT 500`).all()).results || [];
  return json({ posts, comments, reasons });
}

export async function moderate(req, env) {
  const u = await currentUser(req, env);
  if (!isAdmin(u, env)) return json({ error: 'forbidden' }, 403);
  const b = await body(req, 2000);
  const table = b.type === 'comment' ? 'comments' : b.type === 'post' ? 'posts' : null;
  const id = str(b.id, 64);
  if (!table || !id) return json({ error: 'bad_target' }, 400);
  if (b.action === 'hide') await env.DB.prepare(`UPDATE ${table} SET hidden = 1 WHERE id = ?1`).bind(id).run();
  else if (b.action === 'restore') await env.DB.batch([
    env.DB.prepare(`UPDATE ${table} SET hidden = 0, reports = 0 WHERE id = ?1`).bind(id),
    env.DB.prepare('DELETE FROM reports WHERE target_type = ?1 AND target_id = ?2').bind(b.type, id),
  ]);
  else if (b.action === 'delete') {
    const stmts = [env.DB.prepare(`DELETE FROM ${table} WHERE id = ?1`).bind(id),
      env.DB.prepare('DELETE FROM reports WHERE target_type = ?1 AND target_id = ?2').bind(b.type, id)];
    if (table === 'posts') stmts.push(env.DB.prepare('DELETE FROM comments WHERE post_id = ?1').bind(id), env.DB.prepare('DELETE FROM likes WHERE post_id = ?1').bind(id));
    else { const c = await env.DB.prepare('SELECT post_id, hidden FROM comments WHERE id = ?1').bind(id).first();
      if (c) stmts.push(env.DB.prepare('UPDATE posts SET comments = MAX(comments - 1, 0) WHERE id = ?1').bind(c.post_id)); }
    await env.DB.batch(stmts);
  } else return json({ error: 'bad_action' }, 400);
  return json({ ok: true });
}

/* ---------- thăm dò mỗi ngày + tóm tắt cho cột phải ---------- */
const POLLS = [
  ['Một thương hiệu mới ít tiền: nên dồn vào…', 'Sản phẩm thật tốt', 'Câu chuyện thương hiệu'],
  ['Giảm giá 20% để kéo khách: bạn thấy…', 'Hợp lý nếu có ngưỡng', 'Phá giá trị thương hiệu'],
  ['Số liệu nào đáng tin hơn khi ra quyết định?', 'Dữ liệu hành vi', 'Khảo sát khách nói gì'],
  ['KOL lớn hay nhiều KOC nhỏ cho ngân sách vừa?', 'Một KOL lớn', 'Nhiều KOC nhỏ'],
  ['Quảng cáo hôm nay nên đo bằng…', 'ROAS ngắn hạn', 'Sức khoẻ thương hiệu dài hạn'],
  ['Tăng trưởng bền hơn đến từ…', 'Khách mới', 'Khách cũ mua lại'],
  ['Khi đối thủ giảm giá mạnh, bạn…', 'Giữ giá, đổi cách nói', 'Giảm theo để giữ khách'],
  ['Một insight tốt thường đến từ…', 'Phỏng vấn người dùng', 'Phân tích dữ liệu'],
  ['Ra mắt sản phẩm: bắt đầu ở…', 'Một tệp hẹp, làm thật kỹ', 'Phủ rộng để học nhanh'],
  ['Slogan hay giá trị hơn ở…', 'Dễ nhớ, vui tai', 'Nói đúng một lợi ích'],
];
const dayIndex = () => Math.floor(Date.parse(today()) / 864e5);
const pollOf = () => { const i = dayIndex() % POLLS.length, [q, a, b] = POLLS[i]; return { id: today(), q, a, b }; };

export async function pollGet(req, env) {
  const u = await currentUser(req, env), p = pollOf();
  const rows = (await env.DB.prepare('SELECT choice, COUNT(*) AS n FROM poll_votes WHERE poll_id = ?1 GROUP BY choice').bind(p.id).all()).results || [];
  const votes = { a: 0, b: 0 }; for (const r of rows) votes[r.choice] = r.n;
  const mine = u ? (await env.DB.prepare('SELECT choice FROM poll_votes WHERE poll_id = ?1 AND user_id = ?2').bind(p.id, u.id).first())?.choice || null : null;
  return json({ ...p, votes, mine });
}
export async function pollVote(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 500), choice = b.choice === 'a' || b.choice === 'b' ? b.choice : null;
  if (!choice) return json({ error: 'bad_choice' }, 400);
  await env.DB.prepare('INSERT OR IGNORE INTO poll_votes (poll_id, user_id, choice, created_at) VALUES (?1, ?2, ?3, ?4)')
    .bind(pollOf().id, u.id, choice, now()).run();
  return pollGet(req, env);
}

/* Số thật: bài đã hoàn thành trên hệ thống + người đóng góp 30 ngày (bài, bình luận) — không tính tài khoản hệ thống. */
export async function communitySummary(req, env) {
  const since = now() - 30 * 864e5;
  const learned = (await env.DB.prepare(`SELECT COUNT(*) AS n FROM lesson_progress WHERE state IN ('learned','passed','solid','mastered')`).first())?.n || 0;
  const rows = (await env.DB.prepare(
    `SELECT t.user_id, u.display_name, COUNT(*) AS n FROM (
        SELECT user_id FROM posts WHERE hidden = 0 AND created_at > ?1
        UNION ALL SELECT user_id FROM comments WHERE hidden = 0 AND created_at > ?1) t
     JOIN users u ON u.id = t.user_id WHERE u.email NOT LIKE '%@system.invalid'
     GROUP BY t.user_id ORDER BY n DESC LIMIT 5`).bind(since).all()).results || [];
  return json({ learned, contributors: rows.map((r) => ({ name: publicName({ id: r.user_id, display_name: r.display_name }), n: r.n })) },
    200, { 'cache-control': 'public, max-age=120' });
}
