/* ENGINE THI VƯỢT CHẶNG
   Không chứa nội dung. Thêm câu hỏi = sửa exam-items.js, không đụng file này.
   Dùng chung state 'thmc.v1' với app.js: S, today(), addDays(), logError(), award().
*/

/* ---------------- dựng đề ---------------- */
const shuf = (a) => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);

/* Đề từ máy chủ: rút từ toàn bộ kho chặng (cả bài mới), không có đáp án. Không có máy chủ thì dựng đề tại chỗ. */
async function drawExam(sid) {
  try {
    const r = await api('/exams/draw/' + sid);
    /* Đề từ server không mang `teaches`; lấy bài gốc của câu làm chỗ "cần xem lại" và mã lỗi khái niệm. */
    if (r.items && r.items.length >= 10) return r.items.map(it => {
      const x = { ...it, teaches: it.teaches || (it.lesson ? [it.lesson] : []) };
      return x.options ? { ...x, options: shuf(x.options) } : x;
    });
  } catch (e) { /* rơi xuống đề tại chỗ */ }
  return buildExam(sid);
}
function buildExam(sid) {
  const bp = EXAMS[sid]; if (!bp) return null;
  const pool = EXAM_ITEMS.filter(x => x.stage === sid);
  const picked = [];

  /* Lấy đủ số item core trước — đây là ràng buộc cứng của đề. */
  const cores = shuf(pool.filter(x => x.core));
  picked.push(...cores.slice(0, bp.core));

  /* Rồi lấp theo tỉ lệ loại, không lấy trùng item đã chọn. */
  const taken = new Set(picked.map(x => x.id));
  for (const [type, n] of Object.entries(bp.mix)) {
    const have = picked.filter(x => x.type === type).length;
    const need = Math.max(0, n - have);
    const rest = shuf(pool.filter(x => x.type === type && !taken.has(x.id)));
    rest.slice(0, need).forEach(x => { picked.push(x); taken.add(x.id); });
  }
  /* Thiếu thì lấy bất kỳ item nào còn lại — pool nhỏ thì đề vẫn đủ số câu. */
  if (picked.length < bp.size) {
    shuf(pool.filter(x => !taken.has(x.id))).slice(0, bp.size - picked.length)
      .forEach(x => { picked.push(x); taken.add(x.id); });
  }

  /* Cân lại số item core. Bước lấp theo loại ở trên có thể kéo thêm item core vào
     (core cũng là mcq/case/calc), làm đề này 4 câu cốt lõi còn đề kia 6 — trong khi
     ngưỡng coreMiss giữ nguyên. Độ khó phải như nhau giữa các lần thi. */
  let extra = picked.filter(x => x.core).length - bp.core;
  if (extra > 0) {
    const spare = shuf(pool.filter(x => !x.core && !taken.has(x.id)));
    for (const c of shuf(picked.filter(x => x.core))) {
      if (extra <= 0) break;
      const swap = spare.find(x => x.type === c.type && !taken.has(x.id))
                || spare.find(x => !taken.has(x.id));
      if (!swap) break;
      picked[picked.indexOf(c)] = swap; taken.add(swap.id); taken.delete(c.id); extra--;
    }
  }

  /* Dư câu thì cắt, nhưng chỉ cắt câu thường. Cắt ngẫu nhiên sẽ có lúc lấy nhầm
     câu cốt lõi và đề đó nhẹ hơn các đề khác — hiếm, nhưng là bất công thật. */
  while (picked.length > bp.size) {
    const i = picked.findIndex(x => !x.core);
    if (i < 0) break;                       // toàn core thì thôi, để bước dưới cắt
    taken.delete(picked[i].id); picked.splice(i, 1);
  }

  /* Xáo thứ tự câu và thứ tự phương án — cùng một item, mỗi lần một mặt. */
  return shuf(picked).slice(0, bp.size).map(it => {
    if (!it.options) return { ...it };
    return { ...it, options: shuf(it.options) };
  });
}

/* ---------------- chấm ---------------- */
function gradeItem(it, given) {
  if (it.type === 'calc') {
    const v = parseFloat(String(given).replace(',', '.'));
    if (!isFinite(v)) return { ok:false, err:null };
    if (Math.abs(v - it.ans) <= (it.tol || 0.01)) return { ok:true, err:null };
    /* Sai đúng vào một giá trị đã biết trước thì gọi tên được cái lỗi. */
    const hit = (it.wrong || []).find(([val]) => Math.abs(v - val) <= (it.tol || 0.01));
    return { ok:false, err: hit ? hit[1] : (it.errors && it.errors[0]) || 'SAI_TINH_TOAN' };
  }
  return { ok: given === it.answer, err: null };
}

/* ---------------- chấm qua máy chủ ----------------
   Bản xuất bản đã bỏ đáp án và lời giải khỏi các file trình duyệt tải về (tools_build.mjs).
   Còn đáp án tại chỗ (bản chạy trên máy) thì chấm tại chỗ; không còn thì hỏi server — server chấm
   và chỉ trả lời giải của đáp án đúng và của phương án đã chọn. Kết quả đưa về một dạng chung. */
const hasKey = (it) => it.type === 'calc' ? it.ans !== undefined : it.answer !== undefined;
async function gradeAsync(it, given, context = 'practice') {
  if (hasKey(it)) {
    const g = gradeItem(it, given);
    return { ...g, answer: it.answer, ans: it.ans, unit: it.unit, why: it.why || {}, steps: it.steps || [], full: true };
  }
  if (given === undefined || given === null || given === '') return { ok: false, err: null, why: {}, steps: [], full: false, blank: true };
  const r = await api('/answers', { method: 'POST', body: { question_id: it.id, chosen: given, context } });
  const why = {};
  if (r.explanation && r.answer !== undefined) why[r.answer] = r.explanation;
  if (r.option_feedback && given !== undefined) why[given] = r.option_feedback;
  return { ok: !!r.correct, err: r.error_code || null, answer: r.answer, ans: r.answer, unit: r.unit ?? it.unit,
           why, steps: r.steps || [], full: false, xp: r.xp || 0 };
}
/* Chấm cả đề: tuần tự để không dội server, trả về dạng giống gradeExam. */
async function gradeExamAsync(sid, items, answers, context = 'practice') {
  const bp = EXAMS[sid], marks = [];
  for (const it of items) marks.push({ it, given: answers[it.id], ...(await gradeAsync(it, answers[it.id], context)) });
  const right = marks.filter(m => m.ok).length, coreWrong = marks.filter(m => m.it.core && !m.ok).length;
  const passed = right >= bp.pass && coreWrong <= bp.coreMiss;
  return { marks, right, total: items.length, coreWrong, passed, reason: passed ? null : (right < bp.pass ? 'thieu-diem' : 'sai-cot-loi') };
}
const GRADE_OFFLINE = 'Chưa chấm được: cần kết nối máy chủ. Thử lại sau ít phút.';

function gradeExam(sid, items, answers) {
  const bp = EXAMS[sid];
  const marks = items.map(it => ({ it, given: answers[it.id], ...gradeItem(it, answers[it.id]) }));
  const right = marks.filter(m => m.ok).length;
  const coreWrong = marks.filter(m => m.it.core && !m.ok).length;
  const passed = right >= bp.pass && coreWrong <= bp.coreMiss;
  return { marks, right, total: items.length, coreWrong, passed,
           reason: passed ? null : (right < bp.pass ? 'thieu-diem' : 'sai-cot-loi') };
}

/* ---------------- ghi kết quả ---------------- */
const LOCK_HOURS = 1;   // trượt thì nghỉ 60 phút (khớp spec chấm ở server)

function examState(sid, s = S.get()) { return (s.exams || {})[sid] || { attempts:0, passed:null, lockUntil:null, best:0 }; }
function examLocked(sid, s = S.get()) {
  const e = examState(sid, s);
  return e.lockUntil && Date.now() < e.lockUntil ? e.lockUntil : null;
}
function stagePassed(sid, s = S.get()) { return !!examState(sid, s).passed; }

function saveExam(sid, res) {
  const s = S.get();
  const e = examState(sid, s);
  e.attempts++;
  e.best = Math.max(e.best || 0, res.right);
  if (res.passed) { e.passed = today(); e.lockUntil = null; }
  else { e.lockUntil = Date.now() + LOCK_HOURS * 3600e3; }
  S.set({ exams: { ...(s.exams || {}), [sid]: e } });

  /* Lỗi số đi thẳng vào hệ ôn lỗi đã có — không dựng hàng đợi thứ hai. */
  res.marks.filter(m => !m.ok && m.err).forEach(m => logError(m.err, m.it.source || sid));

  /* Câu khái niệm sai cũng vào hàng ôn. Link "làm lại" trỏ về đúng bài nguyên lý. */
  res.marks.filter(m => !m.ok && !m.err && m.it.type !== 'calc')
    .forEach(m => (m.it.teaches || []).slice(0, 1)
      .forEach(pid => logError(conceptCode(pid), pid)));

  if (res.passed) { award('exam', sid); creditStage(sid); }
  return e;
}

/* Qua đề vượt chặng = chứng minh đã nắm: bài nào của chặng chưa học được tính Đạt
   (nguồn 'stage_exam', không cộng XP bài). Bài 'đã học' được nâng lên Đạt; điểm quiz lần đầu giữ nguyên. */
function creditStage(sid) {
  if (typeof completeLesson !== 'function') return;
  const st = STAGES.find(x => x.id === sid); if (!st) return;
  st.mods.flatMap(m => m.lessons).forEach(k => { const r = lessonState(k); if (!r || r.state === 'learned') completeLesson(k, null, null, 'stage_exam'); });
}

/* ---------------- triện ----------------
   Qua chặng thì đóng một dấu triện, có ngày tháng. Không huy hiệu hoạt hình. */
function examSeal(sid, date) {
  const n = (EXAMS[sid] && EXAMS[sid].title) || sid;
  return `<svg viewBox="0 0 120 120" width="108" height="108" role="img" aria-label="Triện chặng ${n} ngày ${date}">
    <rect x="4" y="4" width="112" height="112" rx="6" fill="none" stroke="currentColor" stroke-width="5" opacity=".92"/>
    <text x="60" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="34" fill="currentColor">過</text>
    <text x="60" y="84" text-anchor="middle" font-family="Georgia,serif" font-size="19" fill="currentColor" opacity=".9">${sid.toUpperCase()}</text>
    <text x="60" y="104" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="9" fill="currentColor" opacity=".75">${date}</text>
  </svg>`;
}


/* ---------------- cổng case (chặng cuối) ----------------
   Đọc thẳng s.cases do giai-case.html ghi — không dựng hệ chấm thứ hai. */
function caseGate(sid, s = S.get()) {
  const bp = EXAMS[sid]; if (!bp || bp.kind !== 'cases') return null;
  const cs = typeof CASES !== 'undefined' ? CASES : [];
  const first = (list) => list.length ? list.map(a => a.date).sort()[0] : null;
  const rows = cs.map(c => {
    const tries = ((s.cases || {})[c.id]) || [];
    const ok = tries.filter(a => a.passed && (!bp.inTime || !a.timeout));
    const full = ok.filter(a => Object.values(a.pass || {}).length === 4 && Object.values(a.pass).every(Boolean));
    const lastTimeout = tries.some(a => a.passed && a.timeout);
    return { c, tries: tries.length, okDate: first(ok), fullDate: first(full),
             hard: /khó/i.test(c.level || ''), lastTimeout };
  });
  const ok = rows.filter(r => r.okDate), full = rows.filter(r => r.fullDate);
  const hardOk = ok.some(r => r.hard);
  const met = ok.length >= bp.need && full.length >= bp.full && (!bp.hard || hardOk);

  /* Ngày vượt chặng là ngày điều kiện CUỐI CÙNG được thoả — không phải ngày mở trang này. */
  let date = null;
  if (met) {
    const nth = (list, key, n) => list.map(r => r[key]).sort()[n - 1];
    date = [nth(ok, 'okDate', bp.need), nth(full, 'fullDate', bp.full),
            bp.hard ? ok.filter(r => r.hard).map(r => r.okDate).sort()[0] : null]
           .filter(Boolean).sort().pop();
  }
  return { rows, ok: ok.length, full: full.length, hardOk, met, date };
}

/* Chỉ đóng triện khi chặng đã mở — case làm trước vẫn được tính, nhưng không ai
   vượt được chặng 06 khi chưa qua đề chặng 05. */
function syncCaseGate(sid) {
  const g = caseGate(sid); if (!g || !g.met) return g;
  if (typeof stageOpen === 'function' && !stageOpen(sid)) return g;
  const s = S.get(), e = examState(sid, s);
  if (!e.passed) {
    e.passed = g.date; e.attempts = (e.attempts || 0) + 1;
    S.set({ exams: { ...(s.exams || {}), [sid]: e } });
    award('exam', sid); creditStage(sid);
  }
  return g;
}

/* ---------------- luyện tập cuối module ----------------
   Khác đề thi ở ba chỗ: hiện giải thích ngay sau mỗi câu, không khoá, không đóng triện.
   Chỉ rút câu THƯỜNG — câu cốt lõi để dành cho đề thi, để điều kiện "không sai quá
   một câu cốt lõi" đo đúng hiểu biết trên câu chưa từng gặp. */
const PRACTICE_MAX = 8;
function practicePool(mid) { return EXAM_ITEMS.filter(x => x.mod === mid && !x.core); }
function buildPractice(mid) {
  return shuf(practicePool(mid)).slice(0, PRACTICE_MAX)
    .map(it => it.options ? { ...it, options: shuf(it.options) } : { ...it });
}
const practicePassMark = (n) => Math.ceil(n * 0.6);

function savePractice(mid, marks) {
  const s = S.get(), right = marks.filter(m => m.ok).length, n = marks.length;
  const prev = (s.modq || {})[mid] || { best: 0, tries: 0 };
  const rec = { best: Math.max(prev.best, right), of: n, tries: prev.tries + 1, last: today(),
                passed: prev.passed || right >= practicePassMark(n) };
  S.set({ modq: { ...(s.modq || {}), [mid]: rec } });
  /* Sai ở đây cũng vào hàng ôn — luyện tập mà không để lại dấu thì chỉ là đọc lướt. */
  marks.filter(m => !m.ok).forEach(m => {
    if (m.err) logError(m.err, m.it.source || mid);
    else if (m.it.type !== 'calc') (m.it.teaches || []).slice(0, 1).forEach(pid => logError(conceptCode(pid), pid));
  });
  if (right) award('quiz', 'mod:' + mid, right);
  return rec;
}
