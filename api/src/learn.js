/* Vòng học phía server: đề không có đáp án → chấm tự động → mastery → hàng ôn → thi vượt chặng / xếp lớp.
   Chỉ chấm câu có đáp án duy nhất (trắc nghiệm, điền số). Không có đường chấm tự luận. */
import { json, now, rid, str, currentUser, isAdmin, body } from './lib.js';
import { loadConfig, vnToday, recompute, invalidateConfig } from './progress.js';
import BANK from './generated/bank.json';
import { onStagePassed } from './realm.js';
import { gradeItem, publicItem, updateMastery, masteryScore, reviewSession, stageExam, gradeExam, placementExam,
  gradePlacement, lockState, nextActions, seeded, hashStr, lintItem, lengthBias } from './learn-core.js';

const DAY = 864e5;
const RANK = { in_progress: 0, learned: 1, passed: 2, solid: 3, mastered: 4 };

/* Cộng XP do server cấp: ghi sổ cái + ghi vào trạng thái đã lưu để trình duyệt thấy ở lần đồng bộ sau. */
export async function grantXp(env, uid, source, ref, amount, day = vnToday()) {
  const ins = await env.DB.prepare('INSERT OR IGNORE INTO xp_events (user_id, source, source_ref, amount, day_local, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
    .bind(uid, source, ref, amount, day, now()).run();
  if (!ins.meta || !ins.meta.changes) return 0;
  const row = await env.DB.prepare('SELECT state_json FROM user_state WHERE user_id = ?1').bind(uid).first();
  if (row) {
    const s = JSON.parse(row.state_json);
    s.xpl = { ...(s.xpl || {}), [ref]: { x: amount, d: day } };
    await env.DB.prepare('UPDATE user_state SET state_json = ?1, updated_at = ?2 WHERE user_id = ?3').bind(JSON.stringify(s), now(), uid).run();
  }
  return amount;
}

async function setProgress(env, uid, lesson, state, source, score = null) {
  const cur = await env.DB.prepare('SELECT state, first_score FROM lesson_progress WHERE user_id = ?1 AND lesson_id = ?2').bind(uid, lesson).first();
  if (cur && RANK[cur.state] >= RANK[state]) return false;              // không bao giờ tụt trạng thái
  await env.DB.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, state, first_score, completion_source, completed_at, updated_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
      ON CONFLICT(user_id, lesson_id) DO UPDATE SET state = excluded.state, completion_source = excluded.completion_source,
        first_score = COALESCE(lesson_progress.first_score, excluded.first_score), updated_at = excluded.updated_at`)
    .bind(uid, lesson, state, score, source, vnToday(), now()).run();
  return true;
}

/* Nhận trạng thái bài từ trình duyệt khi đồng bộ (bài cũ học trên máy trước khi có server). Không bao giờ tụt. */
export async function ingestLessons(env, uid, lessons) {
  for (const [k, r] of Object.entries(lessons || {})) {
    if (!/^[LPB]:/.test(k) || !r || !(r.state in RANK)) continue;
    const src = ['lesson', 'stage_exam', 'placement'].includes(r.source) ? r.source : 'legacy';
    await setProgress(env, uid, k, r.state, src, Number.isFinite(r.score) ? Math.max(0, Math.min(100, r.score)) : null);
  }
}

async function progressMap(env, uid) {
  const rows = (await env.DB.prepare('SELECT lesson_id, state, first_score FROM lesson_progress WHERE user_id = ?1').bind(uid).all()).results || [];
  return Object.fromEntries(rows.map((r) => [r.lesson_id, r]));
}
async function lockMode(env, cfg) {
  const pre = ((await env.DB.prepare('SELECT lesson_id, requires_lesson_id FROM prerequisites').all()).results) || [];
  const prereq = {};
  for (const p of pre) (prereq[p.lesson_id] = prereq[p.lesson_id] || []).push(p.requires_lesson_id);
  return { mode: cfg.unlock_mode || 'soft', first: Number(cfg.open_first_n || 7), prereq: pre.length ? prereq : null };
}

/* ---------- GET /api/quiz/lesson/:key ---------- */
export async function lessonQuiz(req, env, key) {
  const ids = BANK.lessons[key];
  if (!ids) return json({ error: 'not_found' }, 404);
  const u = await currentUser(req, env);
  const cfg = await loadConfig(env);
  let warning = [];
  if (u) {
    const lm = await lockMode(env, cfg);
    const unlocked = await env.DB.prepare('SELECT 1 FROM admin_unlocks WHERE user_id = ?1 AND lesson_id = ?2').bind(u.id, key).first();
    const st = lockState(BANK.order, await progressMap(env, u.id), lm.mode, lm.first, lm.prereq).find((x) => x.key === key);
    if (st && st.locked && !unlocked) return json({ error: 'locked', requires: st.requires }, 403);
    warning = st ? st.warning : [];
  }
  return json({ lesson: key, items: ids.map((id) => publicItem(BANK.items[id])), warning });
}

/* ---------- POST /api/answers ---------- */
export async function answer(req, env) {
  const b = await body(req, 4000);
  const it = BANK.items[str(b.question_id, 80)];
  if (!it) return json({ error: 'unknown_question' }, 404);
  const ctxName = ['lesson', 'checkpoint', 'review', 'practice'].includes(b.context) ? b.context : 'practice';
  const r = gradeItem(it, b.chosen);
  if (r.invalid) return json({ error: 'invalid_answer' }, 400);
  const u = await currentUser(req, env);
  if (!u) return json({ ...r, saved: false });                       // khách: chấm được, không lưu
  const t = now();
  const prior = await env.DB.prepare('SELECT 1 FROM answer_events WHERE user_id = ?1 AND question_id = ?2 AND context = ?3 LIMIT 1').bind(u.id, it.id, ctxName).first();
  const m = await env.DB.prepare('SELECT * FROM skill_mastery WHERE user_id = ?1 AND skill_id = ?2').bind(u.id, it.skill).first();
  const nm = updateMastery(m, r.correct, it.difficulty, t);
  const mem = await env.DB.prepare('SELECT wrong_count FROM question_memory WHERE user_id = ?1 AND question_id = ?2').bind(u.id, it.id).first();
  const wrong = (mem ? mem.wrong_count : 0) + (r.correct ? 0 : 1);
  const stmts = [
    env.DB.prepare(`INSERT INTO answer_events (user_id, question_id, lesson_id, skill_id, context, attempt_id, chosen, correct, is_first_attempt, answered_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`).bind(u.id, it.id, it.lesson, it.skill, ctxName, str(b.attempt_id, 64) || null,
      it.type === 'calc' ? null : 'abcdefgh'.indexOf(String(b.chosen)), r.correct ? 1 : 0, prior ? 0 : 1, t),
    env.DB.prepare(`INSERT INTO skill_mastery (user_id, skill_id, p, stability_days, n_answers, last_answered_at, due_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
      ON CONFLICT(user_id, skill_id) DO UPDATE SET p = excluded.p, stability_days = excluded.stability_days, n_answers = excluded.n_answers,
        last_answered_at = excluded.last_answered_at, due_at = excluded.due_at`).bind(u.id, it.skill, nm.p, nm.stability_days, nm.n_answers, nm.last_answered_at, nm.due_at),
    env.DB.prepare(`INSERT INTO question_memory (user_id, question_id, wrong_count, last_correct, due_at) VALUES (?1, ?2, ?3, ?4, ?5)
      ON CONFLICT(user_id, question_id) DO UPDATE SET wrong_count = excluded.wrong_count, last_correct = excluded.last_correct, due_at = excluded.due_at`)
      .bind(u.id, it.id, wrong, r.correct ? 1 : 0, r.correct ? null : t + DAY),     // sai → ôn lại ngày mai
  ];
  await env.DB.batch(stmts);
  let xp = 0;
  if (ctxName === 'review' && r.correct) {                          // câu ôn đúng: 2 XP, trần 40/ngày
    const day = vnToday(), cfg = await loadConfig(env);
    const used = (await env.DB.prepare(`SELECT COALESCE(SUM(amount),0) AS n FROM xp_events WHERE user_id = ?1 AND source = 'review' AND day_local = ?2`).bind(u.id, day).first()).n;
    const cap = (cfg.xp_daily_cap || {}).review ?? 40;
    if (used + 2 <= cap) xp = await grantXp(env, u.id, 'review', `review:${it.id}@${day}`, 2, day);
  }
  return json({ ...r, saved: true, first_attempt: !prior, xp, mastery: { skill: it.skill, score: masteryScore(nm, t) } });
}

/* ---------- POST /api/lessons/:key/complete — điểm bài = lần làm đầu ---------- */
export async function completeLesson(req, env, key) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const ids = BANK.lessons[key];
  if (!ids) return json({ error: 'not_found' }, 404);
  const rows = (await env.DB.prepare(`SELECT question_id, correct FROM answer_events WHERE user_id = ?1 AND lesson_id = ?2 AND context = 'lesson' AND is_first_attempt = 1`).bind(u.id, key).all()).results || [];
  const first = new Map(rows.map((r) => [r.question_id, r.correct]));
  const answered = ids.filter((id) => first.has(id));
  if (answered.length < Math.min(5, ids.length)) return json({ error: 'quiz_incomplete', answered: answered.length, need: Math.min(5, ids.length) }, 409);
  const cfg = await loadConfig(env);
  const score = Math.round(answered.filter((id) => first.get(id)).length / answered.length * 100);
  const state = score >= Number(cfg.lesson_pass_ratio || 0.6) * 100 ? 'passed' : 'learned';
  await setProgress(env, u.id, key, state, 'lesson', score);
  const want = state === 'passed' ? (cfg.xp_once.lesson ?? 10) : (cfg.xp_once.learned ?? 5);
  const had = await env.DB.prepare(`SELECT amount FROM xp_events WHERE user_id = ?1 AND source = 'lesson' AND source_ref = ?2`).bind(u.id, 'lesson:' + key).first();
  let xp = 0;
  if (!had) xp = await grantXp(env, u.id, 'lesson', 'lesson:' + key, want);
  else if (had.amount < want) {                                     // đã học 5 → đạt 10: chỉ bù phần chênh
    await env.DB.prepare(`UPDATE xp_events SET amount = ?3 WHERE user_id = ?1 AND source = 'lesson' AND source_ref = ?2`).bind(u.id, 'lesson:' + key, want).run();
    xp = want - had.amount;
  }
  return json({ lesson: key, state, first_score: score, xp });
}

/* ---------- GET /api/exams/draw/:stage — đề thi vượt chặng cho cả khách chưa đăng nhập ----------
   Rút từ toàn bộ kho của chặng (cũ + bài mới), không gửi đáp án; từng câu chấm qua /api/answers.
   Đạt/trượt và triện do trình duyệt ghi (không có tài khoản thì không có nơi nào khác để ghi). */
export async function stageExamDraw(req, env, stageId) {
  const cfg = (await loadConfig(env)).stage_exam || { count: 15, min_pool: 30 };
  const pool = BANK.stages[stageId] || [];
  if (pool.length < (cfg.min_pool || 30)) return json({ error: 'pool_too_small', pool: pool.length }, 409);
  const ids = pickSpreadFor(stageId, pool, cfg.count || 15);
  return json({ stage: stageId, count: ids.length, items: ids.map((id) => publicItem(BANK.items[id])) });
}
function pickSpreadFor(stageId, pool, n) {
  /* Chia đều theo module của chặng để đề không dồn vào một mảng kiến thức. */
  const byMod = {};
  for (const id of pool) (byMod[BANK.items[id].mod || '_'] = byMod[BANK.items[id].mod || '_'] || []).push(id);
  const mods = Object.keys(byMod).sort(() => Math.random() - 0.5), out = [], used = new Set();
  let guard = 0;
  while (out.length < n && guard++ < n * 20) for (const m of mods) {
    const left = byMod[m].filter((id) => !used.has(id)); if (!left.length) continue;
    const id = left[Math.floor(Math.random() * left.length)]; used.add(id); out.push(id);
    if (out.length === n) break;
  }
  return out.sort(() => Math.random() - 0.5);
}

/* ---------- GET /api/review/session ---------- */
export async function reviewSessionApi(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const t = now(), cfg = await loadConfig(env);
  const memory = (await env.DB.prepare('SELECT question_id, wrong_count, due_at FROM question_memory WHERE user_id = ?1').bind(u.id).all()).results || [];
  const mastery = (await env.DB.prepare('SELECT * FROM skill_mastery WHERE user_id = ?1').bind(u.id).all()).results || [];
  const seen = new Set(((await env.DB.prepare('SELECT DISTINCT question_id FROM answer_events WHERE user_id = ?1').bind(u.id).all()).results || []).map((r) => r.question_id));
  const ids = reviewSession(BANK, memory, mastery, t, seen, (cfg.review || {}).session || 10, seeded(hashStr(u.id + vnToday())));
  const due = memory.filter((m) => m.wrong_count >= 3 || (m.due_at && m.due_at <= t)).length;
  return json({ due, items: ids.map((id) => publicItem(BANK.items[id])) });
}

/* ---------- đề vượt chặng: GET lấy đề (cooldown khi trượt), POST chấm và ghi công ---------- */
export async function stageExamGet(req, env, stageId) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const cfg = (await loadConfig(env)).stage_exam || { count: 15, pass: 0.8, cooldown_min: 60, min_pool: 30 };
  const last = await env.DB.prepare(`SELECT passed, submitted_at FROM exam_attempts WHERE user_id = ?1 AND kind = 'stage' AND stage_id = ?2 AND submitted_at IS NOT NULL ORDER BY submitted_at DESC LIMIT 1`).bind(u.id, stageId).first();
  if (last && !last.passed) {
    const wait = last.submitted_at + cfg.cooldown_min * 60e3 - now();
    if (wait > 0) return json({ error: 'cooldown', cooldown_ms: wait }, 429);
  }
  const seed = hashStr(u.id + stageId + now());
  const ex = stageExam(BANK, stageId, cfg, seeded(seed));
  if (ex.error) return json(ex, 409);
  const id = rid();
  await env.DB.prepare('INSERT INTO exam_attempts (id, user_id, kind, stage_id, seed, total, started_at, items_json) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)')
    .bind(id, u.id, 'stage', stageId, seed, ex.items.length, now(), JSON.stringify(ex.items)).run();
  return json({ attempt_id: id, stage: stageId, pass_ratio: cfg.pass, items: ex.items.map((q) => publicItem(BANK.items[q])) });
}
export async function stageExamPost(req, env, stageId) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 20000);
  const a = await env.DB.prepare(`SELECT * FROM exam_attempts WHERE id = ?1 AND user_id = ?2 AND kind = 'stage' AND stage_id = ?3`).bind(str(b.attempt_id, 64), u.id, stageId).first();
  if (!a) return json({ error: 'unknown_attempt' }, 404);
  if (a.submitted_at) return json({ error: 'already_submitted' }, 409);
  const cfg = (await loadConfig(env)).stage_exam || { pass: 0.8 };
  const r = gradeExam(BANK, JSON.parse(a.items_json), b.answers, cfg.pass);
  await env.DB.prepare('UPDATE exam_attempts SET score = ?1, passed = ?2, submitted_at = ?3 WHERE id = ?4').bind(r.score, r.passed ? 1 : 0, now(), a.id).run();
  let credited = 0, xp = 0;
  if (r.passed) {
    for (const o of BANK.order.filter((x) => x.stage === stageId)) if (await setProgress(env, u.id, o.key, 'passed', 'stage_exam')) credited++;
    xp = await grantXp(env, u.id, 'exam', 'exam:' + stageId, (await loadConfig(env)).xp_once.exam ?? 50);
    await onStagePassed(env, u.id, stageId);
  }
  return json({ ...r, credited, xp, cooldown_ms: r.passed ? 0 : (cfg.cooldown_min || 60) * 60e3 });
}

/* ---------- bài xếp lớp: một lần lúc đầu, làm lại sau 7 ngày ---------- */
export async function placementGet(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const cfg = (await loadConfig(env)).placement;
  const last = await env.DB.prepare(`SELECT submitted_at FROM exam_attempts WHERE user_id = ?1 AND kind = 'placement' AND submitted_at IS NOT NULL ORDER BY submitted_at DESC LIMIT 1`).bind(u.id).first();
  if (last && now() - last.submitted_at < cfg.retry_days * DAY) return json({ error: 'cooldown', cooldown_ms: last.submitted_at + cfg.retry_days * DAY - now() }, 429);
  const seed = hashStr(u.id + 'placement' + now());
  const items = placementExam(BANK, cfg.stages, cfg.per_stage, seeded(seed));
  const id = rid();
  await env.DB.prepare('INSERT INTO exam_attempts (id, user_id, kind, seed, total, started_at, items_json) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)')
    .bind(id, u.id, 'placement', seed, items.length, now(), JSON.stringify(items)).run();
  return json({ attempt_id: id, items: items.map((q) => publicItem(BANK.items[q])) });
}
export async function placementPost(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 20000);
  const a = await env.DB.prepare(`SELECT * FROM exam_attempts WHERE id = ?1 AND user_id = ?2 AND kind = 'placement'`).bind(str(b.attempt_id, 64), u.id).first();
  if (!a) return json({ error: 'unknown_attempt' }, 404);
  if (a.submitted_at) return json({ error: 'already_submitted' }, 409);
  const cfg = (await loadConfig(env)).placement;
  const r = gradePlacement(BANK, JSON.parse(a.items_json), b.answers, cfg.pass);
  const score = r.stages.reduce((n, s) => n + s.score, 0);
  await env.DB.prepare('UPDATE exam_attempts SET score = ?1, passed = ?2, submitted_at = ?3 WHERE id = ?4').bind(score, r.passed.length ? 1 : 0, now(), a.id).run();
  let credited = 0;
  for (const s of r.passed) for (const o of BANK.order.filter((x) => x.stage === s)) if (await setProgress(env, u.id, o.key, 'passed', 'placement')) credited++;
  return json({ ...r, credited });
}

/* ---------- GET /api/tracks — trạng thái và khoá từng bài, tính ở server ---------- */
export async function tracks(req, env) {
  const u = await currentUser(req, env), cfg = await loadConfig(env), lm = await lockMode(env, cfg);
  const prog = u ? await progressMap(env, u.id) : {};
  return json({ unlock_mode: lm.mode, open_first_n: lm.first, lessons: lockState(BANK.order, prog, lm.mode, lm.first, lm.prereq) });
}

/* ---------- mastery + việc nên làm tiếp ---------- */
const SKILLS = ['insight', 'brand', 'creative', 'channel', 'measure', 'comm'];
export async function mastery(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const rows = (await env.DB.prepare('SELECT * FROM skill_mastery WHERE user_id = ?1').bind(u.id).all()).results || [];
  const t = now();
  return json({ skills: SKILLS.map((s) => { const m = rows.find((r) => r.skill_id === s);
    return { skill: s, mastery: masteryScore(m, t), p: m ? m.p : 0, n_answers: m ? m.n_answers : 0, due: !!(m && m.due_at && m.due_at <= t) }; }) });
}
export async function next(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const t = now(), cfg = await loadConfig(env);
  const memory = (await env.DB.prepare('SELECT wrong_count, due_at FROM question_memory WHERE user_id = ?1').bind(u.id).all()).results || [];
  const due = memory.filter((m) => m.wrong_count >= 3 || (m.due_at && m.due_at <= t)).length;
  const rows = (await env.DB.prepare('SELECT * FROM skill_mastery WHERE user_id = ?1').bind(u.id).all()).results || [];
  const scored = SKILLS.map((s) => ({ s, v: masteryScore(rows.find((r) => r.skill_id === s), t) })).sort((a, b) => a.v - b.v);
  const prog = await progressMap(env, u.id), lm = await lockMode(env, cfg);
  const locks = lockState(BANK.order, prog, lm.mode, lm.first, lm.prereq);
  const nextL = locks.find((l) => !l.locked && !['passed', 'solid', 'mastered'].includes(l.state));
  const stageDone = (s) => BANK.order.filter((o) => o.stage === s).every((o) => ['passed', 'solid', 'mastered'].includes((prog[o.key] || {}).state));
  const examStage = nextL && !stageDone(nextL.stage) && (BANK.stages[nextL.stage] || []).length >= ((cfg.stage_exam || {}).min_pool || 30) ? nextL.stage : null;
  return json(nextActions({ dueCount: due, masteryMin: scored[0].v, weakSkill: scored[0].s, nextLesson: nextL && nextL.key, nextInGoal: false, stageExamReady: examStage }));
}

/* ---------- admin: cấu hình + cổng chất lượng ---------- */
export async function adminConfigGet(req, env) {
  const u = await currentUser(req, env);
  if (!isAdmin(u, env)) return json({ error: 'forbidden' }, 403);
  const rows = (await env.DB.prepare('SELECT key, value, updated_by, updated_at FROM app_config ORDER BY key').all()).results || [];
  return json({ config: rows.map((r) => ({ ...r, value: JSON.parse(r.value) })) });
}
export async function adminConfigPut(req, env, key) {
  const u = await currentUser(req, env);
  if (!isAdmin(u, env)) return json({ error: 'forbidden' }, 403);
  const b = await body(req, 20000);
  if (!/^[a-z_]{2,40}$/.test(key) || b.value === undefined) return json({ error: 'bad_input' }, 400);
  await env.DB.prepare(`INSERT INTO app_config (key, value, updated_by, updated_at) VALUES (?1, ?2, ?3, ?4)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_by = excluded.updated_by, updated_at = excluded.updated_at`)
    .bind(key, JSON.stringify(b.value), u.email, now()).run();
  invalidateConfig();
  return json({ ok: true });
}
export async function adminLint(req, env) {
  const u = await currentUser(req, env);
  if (!isAdmin(u, env)) return json({ error: 'forbidden' }, 403);
  const items = Object.values(BANK.items);
  const warnings = items.map((it) => ({ id: it.id, lesson: it.lesson, w: lintItem(it) })).filter((x) => x.w.length);
  const pools = Object.fromEntries(Object.entries(BANK.stages).map(([s, ids]) => [s, { pool: ids.length, ratio: +(ids.length / 15).toFixed(2) }]));
  const acc = (await env.DB.prepare(`SELECT question_id, COUNT(*) AS n, AVG(correct) AS rate FROM answer_events WHERE is_first_attempt = 1 GROUP BY question_id HAVING n >= 20`).all()).results || [];
  return json({ count: items.length, errors: warnings.filter((x) => x.w.some((w) => w.level === 'error')).length, warnings, length_bias: lengthBias(items), pools,
    review_queue: acc.filter((a) => a.rate > 0.95 || a.rate < 0.2) });
}
