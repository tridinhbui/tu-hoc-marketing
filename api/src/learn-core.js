/* Lõi học tập phía server — hàm thuần, không đụng DB, kiểm bằng unit test.
   Chỉ chấm tự động câu có đáp án duy nhất: trắc nghiệm (so khoá phương án) và điền số (so trong sai số). */

const DAY_MS = 864e5;

/* ---------- chấm một câu ---------- */
export function gradeItem(item, chosen) {
  if (!item) return null;
  if (item.type === 'calc') {
    const n = Number(String(chosen ?? '').replace(',', '.'));
    if (!Number.isFinite(n)) return { correct: false, invalid: true };
    /* tol là dung sai TUYỆT ĐỐI theo đơn vị của đáp án (cách nội dung được viết: ans 7200 · tol 1, ans 30 · tol 0.1). */
    const tol = Math.max(Number(item.tol ?? 0.01), 1e-9);
    const ok = Math.abs(n - item.ans) <= tol;
    const hit = !ok && Array.isArray(item.wrong) ? item.wrong.find(([v]) => Math.abs(n - v) <= tol) : null;
    return { correct: ok, answer: item.ans, unit: item.unit, error_code: ok ? null : (hit ? hit[1] : (item.errors && item.errors[0]) || null), steps: item.steps || null };
  }
  const k = String(chosen ?? '');
  const ok = k === item.answer;
  return { correct: ok, answer: item.answer, explanation: (item.why || {})[item.answer] || null,
    option_feedback: ok ? null : (item.why || {})[k] || null };
}

/* Đề gửi xuống trình duyệt: không bao giờ có đáp án hay lời giải. */
export function publicItem(item) {
  if (!item) return null;
  const { answer, why, ans, tol, errors, steps, wrong, ...rest } = item;
  return rest;
}

/* ---------- mastery theo kỹ năng: p (thành thạo) và S (độ bền, ngày) ---------- */
export const W_DIFF = { 1: 1, 2: 1.2, 3: 1.5 };
export const recall = (tDays, S) => Math.exp(-Math.max(0, tDays) / Math.max(S, 0.01));
export function updateMastery(m, correct, difficulty, now) {
  const cur = m || { p: 0, stability_days: 2, n_answers: 0, last_answered_at: null };
  const w = W_DIFF[difficulty] || 1.2, y = correct ? 1 : 0;
  const p = cur.p + 0.2 * w * (y - cur.p);
  const t = cur.last_answered_at ? (now - cur.last_answered_at) / DAY_MS : 0;
  const R = cur.last_answered_at ? recall(t, cur.stability_days) : 1;
  let S = cur.stability_days;
  if (correct && cur.last_answered_at && R < 0.9) S = S * 2.5;
  if (!correct) S = Math.max(1, S * 0.4);
  const due_at = now + Math.round(-S * Math.log(0.85) * DAY_MS);     // hết hạn ôn khi R(t) < 0,85
  return { p, stability_days: S, n_answers: cur.n_answers + 1, last_answered_at: now, due_at };
}
/* Điểm hiển thị có hệ số bằng chứng: trả lời ít câu thì không được điểm cao. */
export function masteryScore(m, now, N0 = 20) {
  if (!m || !m.n_answers) return 0;
  const t = (now - m.last_answered_at) / DAY_MS;
  return m.p * recall(t, m.stability_days) * Math.min(1, m.n_answers / N0);
}

/* ---------- ngẫu nhiên có hạt giống (đề cố định theo người + tuần, không đổi khi tải lại) ---------- */
export function seeded(seed) { let x = (Math.abs(Math.floor(seed)) % 2147483646) + 1; return () => (x = (x * 16807) % 2147483647) / 2147483647; }
export function shuffle(a, rnd) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
export function hashStr(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

/* Lấy n câu, tối đa perLesson câu mỗi bài để đề trải rộng. */
export function pickSpread(ids, bank, n, rnd, perLesson = 2) {
  const out = [], per = {};
  for (const id of shuffle(ids, rnd)) {
    const l = bank.items[id].lesson || id;
    if ((per[l] || 0) >= perLesson) continue;
    per[l] = (per[l] || 0) + 1; out.push(id);
    if (out.length === n) break;
  }
  return out;
}

/* ---------- hàng ôn: một hàng duy nhất ----------
   Thứ tự: câu sai ≥ 3 lần → câu đến hạn → câu của kỹ năng quá hạn → câu của kỹ năng yếu nhất.
   Không hai câu liền cùng bài; ưu tiên câu chưa thấy khi lấp theo kỹ năng. */
export function reviewSession(bank, memory, mastery, now, seen, size = 10, rnd = Math.random) {
  const picked = [], used = new Set();
  const push = (id) => { if (id && bank.items[id] && !used.has(id)) { used.add(id); picked.push(id); } };
  const mem = memory.filter((m) => bank.items[m.question_id]);
  mem.filter((m) => m.wrong_count >= 3).sort((a, b) => b.wrong_count - a.wrong_count).forEach((m) => push(m.question_id));
  mem.filter((m) => m.due_at && m.due_at <= now && m.wrong_count < 3).sort((a, b) => a.due_at - b.due_at).forEach((m) => push(m.question_id));
  const skills = [...mastery].map((m) => ({ ...m, score: masteryScore(m, now), overdue: m.due_at && m.due_at <= now }));
  const bySkill = (sk) => shuffle(Object.values(bank.items).filter((i) => i.skill === sk).map((i) => i.id), rnd)
    .sort((a, b) => (seen.has(a) ? 1 : 0) - (seen.has(b) ? 1 : 0));
  for (const sk of skills.filter((s) => s.overdue).sort((a, b) => a.due_at - b.due_at)) bySkill(sk.skill_id).slice(0, 3).forEach(push);
  for (const sk of skills.sort((a, b) => a.score - b.score)) bySkill(sk.skill_id).slice(0, 3).forEach(push);
  /* xen kẽ: không hai câu liền cùng bài */
  const out = [], pool = picked.slice(0, Math.max(size * 3, size));
  while (out.length < size && pool.length) {
    const last = out.length ? bank.items[out[out.length - 1]].lesson : null;
    const i = pool.findIndex((id) => bank.items[id].lesson !== last);
    out.push(pool.splice(i >= 0 ? i : 0, 1)[0]);
  }
  return out;
}

/* ---------- đề vượt chặng ---------- */
export function stageExam(bank, stageId, cfg, rnd) {
  const pool = bank.stages[stageId] || [];
  if (pool.length < cfg.min_pool) return { error: 'pool_too_small', pool: pool.length };
  return { items: pickSpread(pool, bank, cfg.count, rnd) };
}
export function gradeExam(bank, itemIds, answers, passRatio) {
  const detail = itemIds.map((id) => ({ id, ...gradeItem(bank.items[id], (answers || {})[id]), answered: (answers || {})[id] !== undefined && (answers || {})[id] !== '' }));
  const score = detail.filter((d) => d.correct).length, complete = detail.every((d) => d.answered);
  const need = Math.ceil(passRatio * itemIds.length - 1e-9);
  return { score, total: itemIds.length, need, complete, passed: complete && score >= need, detail };
}

/* ---------- bài xếp lớp: vài câu cốt lõi mỗi chặng; đạt ≥ 80% chặng nào thì ghi công chặng đó ---------- */
export function placementExam(bank, stageIds, perStage, rnd) {
  const items = [];
  for (const s of stageIds) {
    const pool = bank.stages[s] || [];
    const core = pool.filter((id) => bank.items[id].core);
    items.push(...pickSpread(core.length >= perStage ? core : pool, bank, perStage, rnd, 1));
  }
  return items;
}
export function gradePlacement(bank, itemIds, answers, passRatio) {
  const by = {};
  for (const id of itemIds) {
    const it = bank.items[id], r = gradeItem(it, (answers || {})[id]);
    const b = (by[it.stage] = by[it.stage] || { score: 0, total: 0 });
    b.total++; if (r.correct) b.score++;
  }
  const stages = Object.entries(by).map(([s, v]) => ({ stage: s, ...v, passed: v.score >= Math.ceil(passRatio * v.total - 1e-9) }));
  return { stages, passed: stages.filter((s) => s.passed).map((s) => s.stage) };
}

/* ---------- khoá bài: open | soft | hard ---------- */
const DONE = new Set(['passed', 'solid', 'mastered']);
export function lockState(order, progress, mode, openFirstN, prereq) {
  const byStage = {};
  return order.map((o) => {
    const idx = (byStage[o.stage] = (byStage[o.stage] ?? -1) + 1);
    const reqs = (prereq && prereq[o.key]) || (idx > 0 ? [order.filter((x) => x.stage === o.stage)[idx - 1].key] : []);
    const missing = reqs.filter((r) => !DONE.has((progress[r] || {}).state));
    const inFirst = idx < openFirstN;
    const locked = mode === 'hard' && !inFirst && missing.length > 0 && !DONE.has((progress[o.key] || {}).state);
    return { key: o.key, stage: o.stage, mod: o.mod, state: (progress[o.key] || {}).state || null, locked,
      requires: missing, warning: mode === 'soft' && missing.length ? missing : [] };
  });
}

/* ---------- việc nên làm tiếp: score = 3·due + 2·(1 − mastery_min) + 1,5·next_in_path + 1·goal_match ---------- */
export function nextActions({ dueCount, masteryMin, weakSkill, nextLesson, nextInGoal, stageExamReady }) {
  const c = [];
  c.push({ kind: 'review', score: 3 * (dueCount >= 5 ? 1 : dueCount / 5), t: `Ôn ${Math.min(10, dueCount)} câu đến hạn`, count: dueCount });
  if (nextLesson) c.push({ kind: 'lesson', key: nextLesson, score: 1.5 + (nextInGoal ? 1 : 0), t: 'Học bài tiếp theo' });
  if (weakSkill) c.push({ kind: 'skill', skill: weakSkill, score: 2 * (1 - masteryMin), t: 'Luyện kỹ năng yếu nhất' });
  if (stageExamReady) c.push({ kind: 'stage_exam', stage: stageExamReady, score: 1.2, t: 'Thi vượt chặng' });
  const ranked = c.filter((x) => x.kind !== 'review' || dueCount > 0).sort((a, b) => b.score - a.score);
  return { main: ranked[0] || null, secondary: ranked.slice(1, 3) };
}

/* ---------- cổng chất lượng câu hỏi (cảnh báo, không chặn lưu) ---------- */
const EMPTY = ['luôn tốt', 'không ảnh hưởng', 'tất cả đều đúng', 'không đáp án nào', 'cả a và b', 'tất cả các phương án'];
export function lintItem(it) {
  const w = [];
  if (it.type === 'calc') {
    if (!Number.isFinite(it.ans)) w.push({ rule: 'calc_no_answer', level: 'error', msg: 'Câu điền số không có đáp án số.' });
    return w;
  }
  const opts = it.options || [];
  if (opts.length < 2) w.push({ rule: 'too_few_options', level: 'error', msg: 'Ít hơn 2 phương án.' });
  if (!opts.some((o) => o.k === it.answer)) w.push({ rule: 'answer_missing', level: 'error', msg: 'Đáp án không khớp phương án nào.' });
  for (const o of opts) {
    if (!(it.why || {})[o.k]) w.push({ rule: 'missing_feedback', level: 'warn', msg: `Phương án ${o.k} thiếu lời giải.` });
    /* Spec: phương án rỗng là phương án MỞ BẰNG cụm rỗng — không bắt cụm đó nằm giữa một hiểu nhầm có thật. */
    if (EMPTY.some((e) => o.t.trim().toLowerCase().startsWith(e))) w.push({ rule: 'empty_distractor', level: 'error', msg: `Phương án rỗng: “${o.t}”.` });
  }
  for (const [k, t] of Object.entries(it.why || {})) if (/phương án\s+[a-dA-D](?!\p{L})|phương án (cuối|đầu)(?!\p{L})/iu.test(t))   /* \b của JS chỉ hiểu ASCII: “phương án cũng” từng bị bắt nhầm */ w.push({ rule: 'positional_ref', level: 'error', msg: `Lời giải ${k} trỏ theo vị trí phương án.` });
  const lens = opts.map((o) => o.t.length), avg = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
  if (opts.length >= 3 && lens.some((l) => Math.abs(l - avg) > 0.2 * avg)) w.push({ rule: 'length_spread', level: 'warn', msg: 'Độ dài phương án lệch quá ±20% trung bình.' });
  return w;
}
/* Mẹo "chọn câu dài nhất": tỉ lệ đáp án là phương án dài nhất so với kỳ vọng 1/k, tính z-score. */
export function lengthBias(items) {
  const mc = items.filter((i) => i.options && i.options.length >= 2);
  let longest = 0, exp = 0, varr = 0;
  for (const i of mc) {
    const max = Math.max(...i.options.map((o) => o.t.length));
    const ties = i.options.filter((o) => o.t.length === max);
    const p = 1 / i.options.length;
    if (ties.some((o) => o.k === i.answer)) longest += 1 / ties.length;
    exp += p; varr += p * (1 - p);
  }
  const z = varr ? (longest - exp) / Math.sqrt(varr) : 0;
  return { n: mc.length, answer_is_longest: Math.round(longest), expected: Math.round(exp), share: mc.length ? longest / mc.length : 0, z };
}
