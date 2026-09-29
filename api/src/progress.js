/* Nối bộ máy (engine.js) với D1: nhận sổ cái, tính lại tổng hợp, nhiệm vụ ngày. */
import { json, now, str, currentUser, body } from './lib.js';
import { DEFAULTS, ingestLedger, computeStats, questStatus } from './engine.js';

let cfgCache = null, cfgAt = 0;
export async function loadConfig(env) {
  if (cfgCache && now() - cfgAt < 60e3) return cfgCache;
  const cfg = JSON.parse(JSON.stringify(DEFAULTS));
  try {
    const rows = (await env.DB.prepare('SELECT key, value FROM app_config').all()).results || [];
    for (const r of rows) { try { cfg[r.key] = JSON.parse(r.value); } catch { /* giữ mặc định */ } }
  } catch { /* chưa có bảng: dùng mặc định */ }
  cfgCache = cfg; cfgAt = now();
  return cfg;
}

/* Ngày giờ Việt Nam hôm nay — dùng khi kiểm "hôm nay" ở server. */
export const vnToday = () => new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10);

async function events(env, uid) {
  return ((await env.DB.prepare('SELECT source, source_ref AS ref, amount, day_local AS day FROM xp_events WHERE user_id = ?1').bind(uid).all()).results) || [];
}

/* Ghi sổ cái từ trạng thái đã gộp. Upsert theo (user, source, ref): gửi lại bao nhiêu lần cũng không cộng trùng. */
export async function syncLedger(env, uid, state) {
  const cfg = await loadConfig(env);
  const evs = ingestLedger(state && state.xpl, cfg);
  const t = now();
  for (let i = 0; i < evs.length; i += 50) {
    await env.DB.batch(evs.slice(i, i + 50).map((e) => env.DB.prepare(
      `INSERT INTO xp_events (user_id, source, source_ref, amount, day_local, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)
       ON CONFLICT(user_id, source, source_ref) DO UPDATE SET amount = excluded.amount, day_local = excluded.day_local`)
      .bind(uid, e.source, e.ref, e.amount, e.day, t)));
  }
  return recompute(env, uid, cfg);
}

export async function recompute(env, uid, cfg) {
  cfg = cfg || await loadConfig(env);
  const evs = await events(env, uid);
  const st = computeStats(evs, cfg, vnToday());
  await env.DB.prepare(`INSERT INTO user_stats (user_id, total_xp, level, streak_current, streak_longest, last_active_day, freezes_used, recomputed_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
      ON CONFLICT(user_id) DO UPDATE SET total_xp = excluded.total_xp, level = excluded.level, streak_current = excluded.streak_current,
        streak_longest = excluded.streak_longest, last_active_day = excluded.last_active_day, freezes_used = excluded.freezes_used, recomputed_at = excluded.recomputed_at`)
    .bind(uid, st.total_xp, st.level, st.streak, st.streak_longest, st.last_active_day, st.freezes_used, now()).run();
  return { ...st, events: evs };
}

/* XP tuần (từ thứ Hai, giờ Việt Nam) lấy thẳng từ sổ cái. */
export function weekXp(evs, weekStart) {
  return evs.filter((e) => e.day >= weekStart && e.amount > 0).reduce((n, e) => n + e.amount, 0);
}

export async function myStats(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const cfg = await loadConfig(env);
  const st = await recompute(env, u.id, cfg);
  const day = vnToday();
  const claimed = new Set(((await env.DB.prepare('SELECT quest_id FROM quest_claims WHERE user_id = ?1 AND day_local = ?2').bind(u.id, day).all()).results || []).map((r) => r.quest_id));
  const quests = questStatus(cfg.quests || [], st.events, day).map((q) => ({ ...q, claimed: claimed.has(q.id) }));
  const { events: _, ...stats } = st;
  return json({ stats, levels: cfg.levels, quests, day });
}

/* Nhận thưởng nhiệm vụ: server tự kiểm điều kiện từ sổ cái, tự tính XP từ cấu hình, mỗi ngày một lần. */
export async function claimQuest(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 2000);
  const cfg = await loadConfig(env);
  const q = (cfg.quests || []).find((x) => x.id === str(b.quest_id, 40));
  if (!q) return json({ error: 'unknown_quest' }, 400);
  const day = vnToday();
  const st = questStatus([q], await events(env, u.id), day)[0];
  if (!st.done) return json({ error: 'not_eligible', have: st.have, need: st.need }, 409);
  const ref = `quest:${q.id}@${day}`;
  const ins = await env.DB.prepare('INSERT OR IGNORE INTO quest_claims (user_id, quest_id, day_local, xp, created_at) VALUES (?1, ?2, ?3, ?4, ?5)')
    .bind(u.id, q.id, day, q.xp, now()).run();
  if (!ins.meta || !ins.meta.changes) return json({ error: 'already_claimed' }, 409);
  await env.DB.prepare(`INSERT OR IGNORE INTO xp_events (user_id, source, source_ref, amount, day_local, created_at) VALUES (?1, 'quest', ?2, ?3, ?4, ?5)`)
    .bind(u.id, ref, q.xp, day, now()).run();
  /* Ghi luôn vào trạng thái đã lưu để trình duyệt thấy XP này ở lần đồng bộ sau (khoá này server tự cấp). */
  const row = await env.DB.prepare('SELECT state_json FROM user_state WHERE user_id = ?1').bind(u.id).first();
  if (row) {
    const s = JSON.parse(row.state_json);
    s.xpl = { ...(s.xpl || {}), [ref]: { x: q.xp, d: day } };
    await env.DB.prepare('UPDATE user_state SET state_json = ?1, updated_at = ?2 WHERE user_id = ?3').bind(JSON.stringify(s), now(), u.id).run();
  }
  const stats = await recompute(env, u.id, cfg);
  return json({ ok: true, xp: q.xp, total_xp: stats.total_xp, level: stats.level });
}
