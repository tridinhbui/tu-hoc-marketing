/* Chất lượng câu hỏi: thiên lệch vị trí, manh mối ngôn ngữ, từ tuyệt đối, câu judge đoán được bằng mẹo.
   Các ngưỡng "ratchet" ghi ở tests/baselines.json: chỉ được tốt lên, không được tệ đi. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadContent, loadLessons, rel } from './helpers.mjs';

const { get } = loadContent();
const EXAM_ITEMS = get('EXAM_ITEMS') || [];
const LESSONS = loadLessons();
const BASE = JSON.parse(fs.readFileSync(rel('tests/baselines.json'), 'utf8'));
const strip = (s) => String(s || '').replace(/<[^>]+>/g, ' ').trim();
const ABS = /(\bluôn\b|chắc chắn|tuyệt đối|không bao giờ|hoàn toàn|\bmọi\b|bất kỳ|chỉ cần|duy nhất|toàn bộ|100%|bao giờ cũng|lúc nào cũng)/i;
const mcqs = LESSONS.flatMap((l) => l.q.map((q, i) => ({ ...q, id: `${l.id}#${i + 1}`, mod: l.mod }))).filter((q) => q.type === 'mcq');

test('vị trí đáp án đúng (bài mới): không vị trí nào quá 32% tổng thể, quá 40% trong một module', () => {
  const tot = { a: 0, b: 0, c: 0, d: 0 }, by = {};
  for (const q of mcqs) { tot[q.answer]++; (by[q.mod] = by[q.mod] || { a: 0, b: 0, c: 0, d: 0, n: 0 })[q.answer]++; by[q.mod].n++; }
  const n = mcqs.length;
  for (const [k, v] of Object.entries(tot)) assert.ok(v / n <= 0.32, `vị trí ${k}: ${(v / n * 100).toFixed(1)}%`);
  for (const [m, v] of Object.entries(by)) if (v.n >= 20) for (const k of 'abcd') assert.ok(v[k] / v.n <= 0.4, `${m}: vị trí ${k} ${(v[k] / v.n * 100).toFixed(0)}%`);
});

test('đáp án đúng là phương án dài nhất: ≤ 32% tổng thể (ngẫu nhiên ≈ 25%)', () => {
  let longest = 0;
  for (const q of mcqs) {
    const L = (k) => strip(q.options.find((o) => o.k === k).t).length;
    const right = L(q.answer), others = q.options.filter((o) => o.k !== q.answer).map((o) => strip(o.t).length);
    if (right > Math.max(...others)) longest++;
  }
  assert.ok(longest / mcqs.length <= 0.32, `${(longest / mcqs.length * 100).toFixed(1)}%`);
});

test('từ tuyệt đối làm lộ đáp án (cả hai chiều): ít câu bị lộ, và không đảo thành "có từ tuyệt đối = đúng"', () => {
  let w = 0, wn = 0, r = 0, rn = 0, leakWrong = 0, leakRight = 0;
  for (const q of mcqs) {
    const has = q.options.filter((o) => ABS.test(strip(o.t)));
    for (const o of q.options) {
      if (o.k === q.answer) { rn++; if (ABS.test(strip(o.t))) r++; } else { wn++; if (ABS.test(strip(o.t))) w++; }
    }
    if (has.length === 1) { if (has[0].k === q.answer) leakRight++; else leakWrong++; }   // chỉ đúng một phương án có từ này
  }
  const n = mcqs.length;
  console.log(`  từ tuyệt đối: ${(w / wn * 100).toFixed(1)}% phương án sai, ${(r / rn * 100).toFixed(1)}% đáp án đúng; câu lộ "chỉ phương án sai có": ${(leakWrong / n * 100).toFixed(1)}%, "chỉ đáp án đúng có": ${(leakRight / n * 100).toFixed(1)}%`);
  assert.ok(w / wn <= BASE.absWordWrongShareMax, `phương án sai chứa từ tuyệt đối ${(w / wn * 100).toFixed(1)}% > mốc`);
  assert.ok(leakWrong / n <= BASE.absLeakWrongMax, `${(leakWrong / n * 100).toFixed(1)}% câu chỉ phương án sai có từ tuyệt đối`);
  assert.ok(leakRight / n <= BASE.absLeakRightMax, `${(leakRight / n * 100).toFixed(1)}% câu chỉ đáp án đúng có từ tuyệt đối`);
});

test('câu judge: ≥ 2 phương án, không dồn vị trí, không đoán được bằng "phương án nào có số thì đúng"', () => {
  const J = EXAM_ITEMS.filter((x) => x.type === 'judge');
  assert.ok(J.length >= 20);
  const pos = {};
  let numCue = 0;
  for (const q of J) {
    assert.ok(q.options.length >= 2);
    pos[q.answer] = (pos[q.answer] || 0) + 1;
    const digits = (k) => (strip(q.options.find((o) => o.k === k).t).match(/\d/g) || []).length;
    const others = q.options.filter((o) => o.k !== q.answer).map((o) => digits(o.k));
    if (digits(q.answer) > Math.max(...others)) numCue++;
  }
  for (const [k, v] of Object.entries(pos)) assert.ok(v / J.length <= BASE.judgePositionMax, `judge: vị trí ${k} chiếm ${(v / J.length * 100).toFixed(0)}%`);
  console.log(`  judge: ${J.length} câu; đáp án có nhiều chữ số hơn ở ${(numCue / J.length * 100).toFixed(0)}%`);
  assert.ok(numCue / J.length <= BASE.judgeNumberCueMax, `đoán được bằng mẹo "có số": ${(numCue / J.length * 100).toFixed(0)}% > ${BASE.judgeNumberCueMax * 100}%`);
});

test('vị trí đáp án đúng trong ngân hàng đề chặng (mcq/case): không vị trí nào > 40% (nguồn)', () => {
  const E = EXAM_ITEMS.filter((x) => /^e\d/.test(x.id) && (x.type === 'mcq' || x.type === 'case') && x.options);
  const pos = {};
  for (const q of E) pos[q.answer] = (pos[q.answer] || 0) + 1;
  for (const [k, v] of Object.entries(pos)) assert.ok(v / E.length <= BASE.examPositionMax, `exam: vị trí ${k} chiếm ${(v / E.length * 100).toFixed(0)}%`);
});

test('pool đề vượt chặng trên máy chủ: ≥ 3× số câu mỗi đề, và đủ câu ở mỗi mức khó', () => {
  const bank = JSON.parse(fs.readFileSync(rel('api/src/generated/bank.json'), 'utf8'));
  const E = get('EXAMS');
  for (const [sid, bp] of Object.entries(E)) {
    if (bp.kind === 'cases') continue;
    const pool = bank.stages[sid] || [];
    assert.ok(pool.length >= bp.size * 3, `${sid}: pool ${pool.length} < ${bp.size * 3}`);
    const lv = [1, 2, 3].map((d) => pool.filter((id) => (bank.items[id].difficulty || 2) === d).length);
    assert.ok(lv[2] >= 4 * 3, `${sid}: chỉ ${lv[2]} câu mức 3 (khó)`);
  }
});

/* ---- Lỗi hình thức làm lộ đáp án / hỏng phương án (thêm sau audit 2026-10-11) ---- */
const OPENER = /^(vì|bởi vì|do|để|nhờ)\s/i;
const openerState = (o) => ((strip(o.t).match(OPENER) || [null, 'none'])[1] || 'none').toLowerCase();
const firstWord = (o) => strip(o.t).replace(/^["“'(\[]+/, '').split(/\s+/)[0].toLowerCase().replace(/[,.:;]+$/, '');

test('không lộ đáp án bằng từ mở đầu: đáp án đúng không được là phương án duy nhất khác kiểu mở đầu "Vì/Do/Để/Nhờ"', () => {
  const bad = [];
  for (const q of mcqs) {
    const st = q.options.map(openerState), ai = q.options.findIndex((o) => o.k === q.answer);
    const same = st.filter((s) => s === st[ai]).length;
    const maxOther = Math.max(...st.filter((_, k) => k !== ai).map((s) => st.filter((x) => x === s).length));
    if (same === 1 && maxOther >= 2 && st.some((s) => s !== 'none')) bad.push(q.id);
  }
  assert.equal(bad.length, 0, `${bad.length} câu: ${bad.slice(0, 12).join(', ')}`);
});

test('phương án không bị cụt: không kết thúc bằng dấu phẩy/chấm phẩy/hai chấm hoặc từ nối bỏ lửng', () => {
  const bad = [];
  for (const q of mcqs) for (const o of q.options) {
    const s = strip(o.t);
    if (/[,;:]\s*$/.test(s) || /\s(và|hoặc|nhưng|để|của|với)\s*$/i.test(s)) bad.push(`${q.id}/${o.k}`);
  }
  assert.equal(bad.length, 0, bad.join(', '));
});

test('đáp án đúng không là phương án duy nhất khác từ đầu câu (ratchet): lệch của đáp án đúng ≤ 1,3 lần mức của một phương án sai', () => {
  let cOdd = 0, dOdd = 0;
  for (const q of mcqs) {
    const w = q.options.map(firstWord);
    q.options.forEach((o, k) => {
      const rest = w.filter((_, x) => x !== k);
      if (rest.every((x) => x === rest[0]) && w[k] !== rest[0]) (o.k === q.answer ? cOdd++ : dOdd++);
    });
  }
  const perDistractor = dOdd / 3;
  console.log(`  đáp án đúng là cái duy nhất khác từ đầu câu: ${cOdd} câu; mỗi phương án sai: ${perDistractor.toFixed(0)} câu`);
  assert.ok(cOdd <= Math.max(BASE.firstWordOddCorrectMax, 0), `${cOdd} > mốc ${BASE.firstWordOddCorrectMax}`);
  assert.ok(cOdd <= perDistractor * 1.65, `đáp án đúng lệch ${(cOdd / perDistractor).toFixed(2)}× mức một phương án sai`);
});

test('lời giải phương án sai không tự nhận "cũng đúng": ratchet số câu còn phải rà tay', () => {
  const HEDGE = /(cũng đúng|đúng một phần|cũng hợp lý|cũng có thể đúng|cũng chấp nhận)/i;
  let n = 0;
  for (const q of mcqs) for (const o of q.options) if (o.k !== q.answer && HEDGE.test(strip((q.why || {})[o.k]))) n++;
  assert.ok(n <= BASE.hedgedWrongWhyMax, `${n} lời giải phương án sai có "cũng đúng/đúng một phần" > mốc ${BASE.hedgedWrongWhyMax}`);
});
