/* Đồng bộ tiến độ + bảng xếp hạng tuần.
   Server gộp bản gửi lên với bản đang lưu — không bao giờ ghi đè mù — rồi tính điểm tuần từ nhật ký. */
import { json, now, currentUser, body, publicName } from './lib.js';
import { syncLedger, weekXp } from './progress.js';

const XP = { lesson: 20, drill: 15, talk: 10, review: 5, focus: 15, quiz: 2, case: 40, game: 30, daily: 10 };
const WEEK_XP_CAP = 3000;   // chặn số ảo: một tuần học rất chăm cũng hiếm khi vượt mức này

export function mergeState(a = {}, b = {}) {
  const obj = (x, y) => ({ ...(x || {}), ...(y || {}) });
  const later = (b.lastDay || '') >= (a.lastDay || '') ? b : a;
  const errors = { ...(a.errors || {}) };
  for (const [k, e] of Object.entries(b.errors || {})) {
    const o = errors[k];
    errors[k] = !o ? e : { ...(e.count >= o.count ? e : o), lessons: [...new Set([...(o.lessons || []), ...(e.lessons || [])])] };
  }
  const seen = new Set(), log = [];
  for (const x of [...(a.log || []), ...(b.log || [])]) {
    const id = `${x.d}|${x.k}|${x.r}|${x.x ?? ''}|${x.t ?? ''}`;
    if (!seen.has(id)) { seen.add(id); log.push(x); }
  }
  log.sort((p, q) => (p.d < q.d ? -1 : p.d > q.d ? 1 : 0));
  const cases = {};
  for (const id of new Set([...Object.keys(a.cases || {}), ...Object.keys(b.cases || {})])) {
    const m = new Map();
    for (const t of [...((a.cases || {})[id] || []), ...((b.cases || {})[id] || [])]) m.set(`${t.date}|${t.secs}|${(t.asked || []).join(',')}`, t);
    cases[id] = [...m.values()].slice(-10);
  }
  const quizHits = { ...(a.quizHits || {}) };
  for (const [k, v] of Object.entries(b.quizHits || {})) quizHits[k] = Math.max(quizHits[k] || 0, v);
  const gm = new Map(); for (const g of [...(a.games || []), ...(b.games || [])]) gm.set(`${g.d}|${g.cash}`, g);
  /* Cùng quy tắc với client (assets/js/app.js → mergeState). Sửa một bên thì sửa cả hai. */
  const RANK = { learned: 1, passed: 2, solid: 3 };
  const xpl = { ...(a.xpl || {}) };
  for (const [k, e] of Object.entries(b.xpl || {})) { const o = xpl[k]; xpl[k] = !o || Math.abs(e.x || 0) >= Math.abs(o.x || 0) ? e : o; }
  const hasLedger = !!(a.xpl || b.xpl);
  const xpSum = (m) => Math.max(0, Object.values(m).reduce((n, e) => n + (e.x || 0), 0));
  const lessons = { ...(a.lessons || {}) };
  for (const [k, r] of Object.entries(b.lessons || {})) { const o = lessons[k];
    if (!o) { lessons[k] = r; continue; }
    const hi = (RANK[r.state] || 0) >= (RANK[o.state] || 0) ? r : o, early = (o.at || '9') <= (r.at || '9') ? o : r;
    lessons[k] = { ...hi, score: early.score, right: early.right, total: early.total, at: early.at }; }
  /* Thi vượt chặng: đã qua ở máy nào thì giữ (lấy ngày sớm nhất); số lần và điểm tốt nhất lấy lớn hơn. */
  const exams={...(a.exams||{})};
  for(const [k,e] of Object.entries(b.exams||{})){ const o=exams[k]; if(!o){ exams[k]=e; continue; }
    const passed=[o.passed,e.passed].filter(Boolean).sort()[0]||null;
    exams[k]={attempts:Math.max(o.attempts||0,e.attempts||0),best:Math.max(o.best||0,e.best||0),passed,
      lockUntil:passed?null:Math.max(o.lockUntil||0,e.lockUntil||0)||null}; }
  const modq={...(a.modq||{})};
  for(const [k,e] of Object.entries(b.modq||{})){ const o=modq[k]; if(!o){ modq[k]=e; continue; }
    modq[k]={best:Math.max(o.best||0,e.best||0),of:Math.max(o.of||0,e.of||0),tries:Math.max(o.tries||0,e.tries||0),
      last:[o.last,e.last].filter(Boolean).sort().pop()||null,passed:!!(o.passed||e.passed)}; }
  return {
    ...a, ...b,
    done: obj(a.done, b.done), drills: obj(a.drills, b.drills), talks: obj(a.talks, b.talks), chests: obj(a.chests, b.chests), flags: obj(a.flags, b.flags),
    errors, log: log.slice(-800), cases, quizHits, games: [...gm.values()].slice(-20),
    xpl: hasLedger ? xpl : undefined, lessons, exams, modq,
    xp: hasLedger ? xpSum(xpl) : Math.max(a.xp || 0, b.xp || 0), best: Math.max(a.best || 0, b.best || 0, a.streak || 0, b.streak || 0),
    streak: later.streak || 0, lastDay: later.lastDay || null, freezes: later.freezes || 0,
    fzUsed: Math.max(a.fzUsed || 0, b.fzUsed || 0), fzBought: Math.max(a.fzBought || 0, b.fzBought || 0),
    brokeFrom: later.brokeFrom || null, brokeAt: later.brokeAt || null,
    quizBest: Math.max(a.quizBest || 0, b.quizBest || 0),
    quiz: (b.quiz && (!a.quiz || b.quiz.d >= a.quiz.d)) ? b.quiz : a.quiz,
  };
}

/* Tuần của bảng xếp hạng tính theo giờ Việt Nam (UTC+7), bắt đầu thứ Hai —
   nhật ký học ghi ngày theo giờ của người học, phần lớn ở Việt Nam. */
const VN_OFFSET = 7 * 3600e3;
export function weekStart(d = new Date()) {
  const v = new Date(d.getTime() + VN_OFFSET);
  const x = new Date(Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()));
  x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7));
  return x.toISOString().slice(0, 10);
}
function weekStats(s) {
  const w = weekStart();
  /* Có mốc thời gian tuyệt đối (t) thì quy ra ngày giờ Việt Nam — không phụ thuộc múi giờ máy người học. */
  const vnDay = (x) => (Number.isFinite(x.t) ? new Date(x.t + VN_OFFSET).toISOString().slice(0, 10) : x.d);
  const xp = (s.log || []).filter((x) => vnDay(x) >= w)
    .reduce((n, x) => n + Math.min(Number.isFinite(x.x) ? x.x : (XP[x.k] || 0), 100), 0);
  const cases = Object.values(s.cases || {}).flat().filter((a) => a.passed && a.date >= w).length;
  return { week: w, xp: Math.min(xp, WEEK_XP_CAP), streak: Math.min(s.streak || 0, 3650), cases: Math.min(cases, 200) };
}

export async function getState(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const r = await env.DB.prepare('SELECT state_json, updated_at FROM user_state WHERE user_id = ?1').bind(u.id).first();
  return json({ state: r ? JSON.parse(r.state_json) : null, updated_at: r ? r.updated_at : null });
}

export async function putState(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 400000);
  if (!b.state || typeof b.state !== 'object') return json({ error: 'bad_state' }, 400);
  const r = await env.DB.prepare('SELECT state_json FROM user_state WHERE user_id = ?1').bind(u.id).first();
  const merged = mergeState(r ? JSON.parse(r.state_json) : {}, b.state);
  const text = JSON.stringify(merged);
  if (text.length > 400000) return json({ error: 'too_large' }, 413);
  const w = weekStats(merged), t = now();
  /* Sổ cái phía server: XP tuần lấy từ xp_events đã kẹp luật, không lấy từ số trình duyệt tự cộng. */
  const led = await syncLedger(env, u.id, merged);
  w.xp = Math.min(weekXp(led.events, w.week), WEEK_XP_CAP);
  w.streak = led.streak;
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO user_state (user_id, state_json, updated_at) VALUES (?1, ?2, ?3)
      ON CONFLICT(user_id) DO UPDATE SET state_json = excluded.state_json, updated_at = excluded.updated_at`).bind(u.id, text, t),
    env.DB.prepare(`INSERT INTO weekly (user_id, week, xp, streak, cases, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)
      ON CONFLICT(user_id, week) DO UPDATE SET xp = excluded.xp, streak = excluded.streak, cases = excluded.cases, updated_at = excluded.updated_at`)
      .bind(u.id, w.week, w.xp, w.streak, w.cases, t),
  ]);
  const { events: _e, ...stats } = led;
  return json({ state: merged, updated_at: t, week: w, stats });
}

export async function leaderboard(req, env) {
  const by = ({ xp: 'xp', streak: 'streak', cases: 'cases' })[new URL(req.url).searchParams.get('by')] || 'xp';
  const w = weekStart();
  const rows = (await env.DB.prepare(
    `SELECT w.user_id, w.xp, w.streak, w.cases, u.display_name FROM weekly w JOIN users u ON u.id = w.user_id
     WHERE w.week = ?1 AND w.${by} > 0 ORDER BY w.${by} DESC, w.updated_at ASC LIMIT 50`).bind(w).all()).results || [];
  const u = await currentUser(req, env);
  let me = null;
  if (u) {
    const mine = await env.DB.prepare(`SELECT xp, streak, cases FROM weekly WHERE user_id = ?1 AND week = ?2`).bind(u.id, w).first();
    if (mine) {
      const ahead = await env.DB.prepare(`SELECT COUNT(*) AS n FROM weekly WHERE week = ?1 AND ${by} > ?2`).bind(w, mine[by]).first();
      me = { ...mine, rank: (ahead?.n || 0) + 1, name: publicName(u) };
    }
  }
  return json({ week: w, by, rows: rows.map((r, i) => ({ rank: i + 1, name: publicName({ id: r.user_id, display_name: r.display_name }), xp: r.xp, streak: r.streak, cases: r.cases, me: !!u && u.id === r.user_id })), me });
}
