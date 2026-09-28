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
  const title = clean(str(b.title, 120)), text = clean(str(b.body, 5000));
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
