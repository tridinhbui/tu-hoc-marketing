/* Ảnh đại diện, mời bạn, chat với quản trị, đo lường và bảng điều khiển quản trị. */
import { json, now, rid, str, today, currentUser, isAdmin, allow, body, publicName, randomToken } from './lib.js';
import { grantXp } from './learn.js';
import { vnToday } from './progress.js';

export const REF_XP = { inviter: 50, invitee: 30 };
const CODE = /^[A-Za-z0-9]{6,12}$/;
export const cleanRef = (v) => (typeof v === 'string' && CODE.test(v) ? v : null);

export async function ensureInviteCode(env, uid) {
  const r = await env.DB.prepare('SELECT invite_code FROM users WHERE id = ?1').bind(uid).first();
  if (r && r.invite_code) return r.invite_code;
  for (let i = 0; i < 5; i++) {
    const code = randomToken(5).slice(0, 8);
    try {
      await env.DB.prepare('UPDATE users SET invite_code = ?2 WHERE id = ?1 AND invite_code IS NULL').bind(uid, code).run();
      const again = await env.DB.prepare('SELECT invite_code FROM users WHERE id = ?1').bind(uid).first();
      if (again && again.invite_code) return again.invite_code;
    } catch { /* trùng mã: thử lại */ }
  }
  return null;
}

/* Gắn người mời cho tài khoản MỚI tạo. Không tự mời mình, không gắn lại lần hai. */
export async function attachReferral(env, inviteeId, code) {
  if (!cleanRef(code)) return;
  const inv = await env.DB.prepare('SELECT id FROM users WHERE invite_code = ?1').bind(code).first();
  if (!inv || inv.id === inviteeId) return;
  await env.DB.prepare('INSERT OR IGNORE INTO referrals (invitee_id, inviter_id, created_at) VALUES (?1, ?2, ?3)').bind(inviteeId, inv.id, now()).run();
  await env.DB.prepare('UPDATE users SET invited_by = ?2 WHERE id = ?1 AND invited_by IS NULL').bind(inviteeId, inv.id).run();
}

/* Gọi sau khi người học hoàn thành một bài: cả hai bên nhận XP đúng một lần. */
export async function rewardReferral(env, inviteeId) {
  const r = await env.DB.prepare('SELECT inviter_id FROM referrals WHERE invitee_id = ?1 AND rewarded_at IS NULL').bind(inviteeId).first();
  if (!r) return;
  const claim = await env.DB.prepare('UPDATE referrals SET rewarded_at = ?2 WHERE invitee_id = ?1 AND rewarded_at IS NULL').bind(inviteeId, now()).run();
  if (!claim.meta || !claim.meta.changes) return;
  const day = vnToday();
  await grantXp(env, inviteeId, 'referral', `referral:in:${inviteeId}`, REF_XP.invitee, day);
  await grantXp(env, r.inviter_id, 'referral', `referral:out:${inviteeId}`, REF_XP.inviter, day);
}

export async function myInvite(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const code = await ensureInviteCode(env, u.id);
  const c = await env.DB.prepare('SELECT COUNT(*) AS n, COUNT(rewarded_at) AS ok FROM referrals WHERE inviter_id = ?1').bind(u.id).first();
  const origin = env.APP_ORIGIN || new URL(req.url).origin;
  return json({ code, link: `${origin}/dang-nhap.html?ref=${code}`, invited: c.n || 0, rewarded: c.ok || 0, xp: REF_XP });
}

/* ---------- Chat người học ↔ quản trị ---------- */
const MSG_MAX = 1000;
const mapMsg = (m) => ({ id: m.id, from: m.sender, body: m.body, at: m.created_at, read: !!m.read_at });

export async function myChat(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const rows = (await env.DB.prepare('SELECT * FROM chat_messages WHERE thread_user_id = ?1 ORDER BY created_at DESC LIMIT 100').bind(u.id).all()).results || [];
  await env.DB.prepare(`UPDATE chat_messages SET read_at = ?2 WHERE thread_user_id = ?1 AND sender = 'admin' AND read_at IS NULL`).bind(u.id, now()).run();
  return json({ messages: rows.reverse().map(mapMsg) });
}

export async function myChatUnread(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ unread: 0 });
  const r = await env.DB.prepare(`SELECT COUNT(*) AS n FROM chat_messages WHERE thread_user_id = ?1 AND sender = 'admin' AND read_at IS NULL`).bind(u.id).first();
  return json({ unread: r.n || 0 });
}

export async function sendChat(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 4000);
  const text = str(b.body, MSG_MAX);
  if (!text) return json({ error: 'empty' }, 400);
  if (!(await allow(env, `rl:chat:${u.id}`, 20, 60))) return json({ error: 'rate_limited' }, 429);
  const id = rid();
  await env.DB.prepare(`INSERT INTO chat_messages (id, thread_user_id, sender, body, created_at) VALUES (?1, ?2, 'user', ?3, ?4)`).bind(id, u.id, text, now()).run();
  return json({ ok: true, id });
}

/* ---------- Đo lường ---------- */
export async function track(req, env) {
  const u = await currentUser(req, env);
  const b = await body(req, 1000);
  const kind = str(b.k, 30), target = str(b.t, 80);
  if (!/^[a-z_]{2,30}$/.test(kind)) return json({ error: 'bad_kind' }, 400);
  const who = u ? u.id : (req.headers.get('cf-connecting-ip') || 'anon');
  if (!(await allow(env, `rl:trk:${who}`, 120, 600))) return json({ ok: true, dropped: true });
  await env.DB.prepare('INSERT INTO app_events (user_id, kind, target, day, created_at) VALUES (?1, ?2, ?3, ?4, ?5)')
    .bind(u ? u.id : null, kind, target || null, vnToday(), now()).run();
  return json({ ok: true });
}

/* ---------- Quản trị ---------- */
async function adminOnly(req, env) {
  const u = await currentUser(req, env);
  if (!u) return [null, json({ error: 'login_required' }, 401)];
  if (!isAdmin(u, env)) return [null, json({ error: 'forbidden' }, 403)];
  return [u, null];
}

export async function adminChats(req, env) {
  const [, err] = await adminOnly(req, env); if (err) return err;
  const rows = (await env.DB.prepare(
    `SELECT m.thread_user_id AS uid, u.email, u.display_name, u.avatar_url,
            MAX(m.created_at) AS last_at,
            SUM(CASE WHEN m.sender = 'user' AND m.read_at IS NULL THEN 1 ELSE 0 END) AS unread,
            (SELECT body FROM chat_messages x WHERE x.thread_user_id = m.thread_user_id ORDER BY x.created_at DESC LIMIT 1) AS last_body,
            (SELECT sender FROM chat_messages x WHERE x.thread_user_id = m.thread_user_id ORDER BY x.created_at DESC LIMIT 1) AS last_from
       FROM chat_messages m JOIN users u ON u.id = m.thread_user_id
      GROUP BY m.thread_user_id ORDER BY last_at DESC LIMIT 100`).all()).results || [];
  return json({ threads: rows.map((r) => ({ uid: r.uid, name: publicName({ id: r.uid, display_name: r.display_name }), email: r.email,
    avatar: r.avatar_url, last_at: r.last_at, last_body: r.last_body, last_from: r.last_from, unread: r.unread || 0 })) });
}

export async function adminThread(req, env, uid) {
  const [, err] = await adminOnly(req, env); if (err) return err;
  const rows = (await env.DB.prepare('SELECT * FROM chat_messages WHERE thread_user_id = ?1 ORDER BY created_at DESC LIMIT 200').bind(uid).all()).results || [];
  await env.DB.prepare(`UPDATE chat_messages SET read_at = ?2 WHERE thread_user_id = ?1 AND sender = 'user' AND read_at IS NULL`).bind(uid, now()).run();
  const u = await env.DB.prepare('SELECT id, email, display_name, avatar_url, created_at FROM users WHERE id = ?1').bind(uid).first();
  return json({ user: u ? { id: u.id, email: u.email, name: publicName(u), avatar: u.avatar_url, created_at: u.created_at } : null, messages: rows.reverse().map(mapMsg) });
}

export async function adminReply(req, env, uid) {
  const [, err] = await adminOnly(req, env); if (err) return err;
  const text = str((await body(req, 4000)).body, MSG_MAX);
  if (!text) return json({ error: 'empty' }, 400);
  const exists = await env.DB.prepare('SELECT 1 AS x FROM users WHERE id = ?1').bind(uid).first();
  if (!exists) return json({ error: 'not_found' }, 404);
  await env.DB.prepare(`INSERT INTO chat_messages (id, thread_user_id, sender, body, created_at) VALUES (?1, ?2, 'admin', ?3, ?4)`).bind(rid(), uid, text, now()).run();
  return json({ ok: true });
}

const dayMinus = (n) => new Date(Date.now() + 7 * 3600e3 - n * 864e5).toISOString().slice(0, 10);

export async function adminMetrics(req, env) {
  const [, err] = await adminOnly(req, env); if (err) return err;
  const d7 = dayMinus(6), d30 = dayMinus(29), t = vnToday();
  const one = async (sql, ...a) => (await env.DB.prepare(sql).bind(...a).first()) || {};
  const all = async (sql, ...a) => (await env.DB.prepare(sql).bind(...a).all()).results || [];

  const [users, active7, activeToday, lessons, ans, unread, refs, withAvatar, unreadChats] = await Promise.all([
    one("SELECT COUNT(*) AS n FROM users WHERE email NOT LIKE '%@system.invalid'"),
    one('SELECT COUNT(DISTINCT user_id) AS n FROM xp_events WHERE day_local >= ?1', d7),
    one('SELECT COUNT(DISTINCT user_id) AS n FROM xp_events WHERE day_local = ?1', t),
    one(`SELECT COUNT(*) AS n FROM lesson_progress WHERE state IN ('passed','solid','mastered')`),
    one('SELECT COUNT(*) AS n, COALESCE(SUM(correct),0) AS ok FROM answer_events WHERE is_first_attempt = 1'),
    one(`SELECT COUNT(*) AS n FROM chat_messages WHERE sender = 'user' AND read_at IS NULL`),
    one('SELECT COUNT(*) AS n, COUNT(rewarded_at) AS ok FROM referrals'),
    one('SELECT COUNT(*) AS n FROM users WHERE avatar_url IS NOT NULL'),
    one(`SELECT COUNT(DISTINCT thread_user_id) AS n FROM chat_messages WHERE sender = 'user' AND read_at IS NULL`),
  ]);

  const signups = await all(`SELECT strftime('%Y-%m-%d', (created_at / 1000) + 25200, 'unixepoch') AS d, COUNT(*) AS n
                             FROM users WHERE created_at >= ?1 GROUP BY d`, Date.now() - 7 * 864e5);
  const dau = await all('SELECT day_local AS d, COUNT(DISTINCT user_id) AS n FROM xp_events WHERE day_local >= ?1 GROUP BY day_local', d7);
  const topLessons = await all(`SELECT lesson_id, COUNT(*) AS n FROM lesson_progress WHERE state IN ('passed','solid','mastered')
                                GROUP BY lesson_id ORDER BY n DESC LIMIT 5`);
  const features = await all(`SELECT kind, target, COUNT(*) AS n FROM app_events WHERE day >= ?1 GROUP BY kind, target ORDER BY n DESC LIMIT 15`, d30);
  const eventsTotal = await one('SELECT COUNT(*) AS n FROM app_events WHERE day >= ?1', d30);
  const xpAvg = await one('SELECT COALESCE(AVG(total_xp),0) AS a FROM user_stats');

  const series = (rows) => { const m = Object.fromEntries(rows.map((r) => [r.d, r.n])); return Array.from({ length: 7 }, (_, i) => { const d = dayMinus(6 - i); return { d, n: m[d] || 0 }; }); };
  return json({
    totals: { users: users.n || 0, active_today: activeToday.n || 0, active_7d: active7.n || 0, lessons_done: lessons.n || 0,
      answers: ans.n || 0, accuracy: ans.n ? Math.round((ans.ok / ans.n) * 100) : null, avg_xp: Math.round(xpAvg.a || 0),
      referrals: refs.n || 0, referrals_rewarded: refs.ok || 0, with_avatar: withAvatar.n || 0,
      unread_messages: unread.n || 0, unread_threads: unreadChats.n || 0, events_30d: eventsTotal.n || 0 },
    signups: series(signups), dau: series(dau), top_lessons: topLessons, features,
  });
}

export async function adminUsers(req, env) {
  const [, err] = await adminOnly(req, env); if (err) return err;
  const q = str(new URL(req.url).searchParams.get('q'), 60).toLowerCase();
  const rows = (await env.DB.prepare(
    `SELECT u.id, u.email, u.display_name, u.avatar_url, u.created_at, COALESCE(s.total_xp,0) AS xp, COALESCE(s.streak_current,0) AS streak, s.last_active_day
       FROM users u LEFT JOIN user_stats s ON s.user_id = u.id
      WHERE (?1 = '' OR lower(u.email) LIKE ?2 OR lower(COALESCE(u.display_name,'')) LIKE ?2)
      ORDER BY u.created_at DESC LIMIT 60`).bind(q, `%${q}%`).all()).results || [];
  return json({ users: rows.map((r) => ({ id: r.id, email: r.email, name: publicName(r), avatar: r.avatar_url, created_at: r.created_at,
    xp: r.xp, streak: r.streak, last_active: r.last_active_day })) });
}
