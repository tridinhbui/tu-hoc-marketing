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

test('từ tuyệt đối làm lộ đáp án: tỉ lệ (phương án sai chứa từ tuyệt đối) / (đáp án đúng chứa) không tệ hơn mốc', () => {
  let w = 0, wn = 0, r = 0, rn = 0;
  for (const q of mcqs) for (const o of q.options) {
    const has = ABS.test(strip(o.t));
    if (o.k === q.answer) { rn++; if (has) r++; } else { wn++; if (has) w++; }
  }
  const share = w / wn, ratio = share / Math.max(r / rn, 1e-3);
  console.log(`  từ tuyệt đối: ${(share * 100).toFixed(1)}% phương án sai, ${(r / rn * 100).toFixed(1)}% đáp án đúng, tỉ lệ ${ratio.toFixed(1)}×`);
  assert.ok(share <= BASE.absWordWrongShareMax, `phương án sai chứa từ tuyệt đối ${(share * 100).toFixed(1)}% > mốc ${(BASE.absWordWrongShareMax * 100).toFixed(1)}%`);
  assert.ok(ratio <= BASE.absWordRatioMax, `tỉ lệ ${ratio.toFixed(1)}× > mốc ${BASE.absWordRatioMax}×`);
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
