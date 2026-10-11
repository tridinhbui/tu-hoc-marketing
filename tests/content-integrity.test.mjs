/* Toàn vẹn dữ liệu câu hỏi: đáp án, lời giải, mã lỗi, tham chiếu bài, và đối chiếu số học đã xác minh. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadContent, loadLessons } from './helpers.mjs';

const { get } = loadContent();
const ERRORS = get('ERRORS') || {};
const EXAM_ITEMS = get('EXAM_ITEMS') || [];
const LESSONS = loadLessons();
const strip = (s) => String(s || '').replace(/<[^>]+>/g, ' ');

/* Mọi câu: BAI_ADD đã đẩy câu của bài mới vào EXAM_ITEMS (id dạng 'B:xx-nn#k'), nên dùng một danh sách. */
const ITEMS = EXAM_ITEMS;

/* Số trong một đoạn lời giải tiếng Việt (1.234,5 → 1234.5; 7,5 → 7.5). */
function numbersIn(text) {
  return [...strip(text).matchAll(/-?\d{1,3}(?:\.\d{3})+(?:,\d+)?|-?\d+(?:,\d+)?/g)]
    .map((m) => parseFloat(m[0].replace(/\.(?=\d{3}\b)/g, '').replace(',', '.'))).filter(Number.isFinite);
}

test('id câu hỏi là duy nhất', () => {
  const seen = new Map(), dup = [];
  for (const it of ITEMS) { if (seen.has(it.id)) dup.push(it.id); seen.set(it.id, 1); }
  assert.deepEqual(dup, []);
});

test('trắc nghiệm: đáp án nằm trong phương án; mọi phương án có lời giải', () => {
  const bad = [];
  for (const it of ITEMS.filter((x) => x.options)) {
    const ks = it.options.map((o) => o.k);
    if (!ks.includes(it.answer)) bad.push(`${it.id}: answer ${it.answer} ∉ [${ks}]`);
    for (const k of ks) if (!strip((it.why || {})[k]).trim()) bad.push(`${it.id}: thiếu why.${k}`);
    if (new Set(ks).size !== ks.length) bad.push(`${it.id}: trùng khoá phương án`);
  }
  assert.deepEqual(bad, []);
});

test('câu bài mới: đúng 4 phương án mcq, 7 câu mỗi bài', () => {
  const bad = [];
  for (const l of LESSONS) {
    if ((l.q || []).length !== 7) bad.push(`${l.id}: ${l.q?.length} câu`);
    (l.q || []).forEach((q, i) => { if (q.type === 'mcq' && q.options.length !== 4) bad.push(`${l.id}#${i + 1}: ${q.options.length} phương án`); });
  }
  assert.deepEqual(bad, []);
});

test('câu tính: ans hữu hạn; đáp án sai định danh không trùng đáp án đúng; mã lỗi tồn tại; có lời giải', () => {
  const bad = [];
  for (const it of ITEMS.filter((x) => x.type === 'calc')) {
    if (!Number.isFinite(it.ans)) { bad.push(`${it.id}: ans không phải số`); continue; }
    const tol = it.tol ?? 0.01;
    for (const [v, code] of it.wrong || []) {
      if (Math.abs(v - it.ans) <= tol) bad.push(`${it.id}: wrong ${v} trùng ans ${it.ans}`);
      if (!ERRORS[code]) bad.push(`${it.id}: mã lỗi không tồn tại ${code}`);
    }
    for (const code of it.errors || []) if (!ERRORS[code]) bad.push(`${it.id}: errors có mã lạ ${code}`);
    if (!(it.steps || []).length) bad.push(`${it.id}: thiếu steps`);
    if (it.unit === undefined) bad.push(`${it.id}: thiếu unit`);
  }
  assert.deepEqual(bad, []);
});

test('câu tính: lời giải (steps) có nhắc con số bằng đáp án (bắt trường hợp đổi ans mà quên steps)', () => {
  const bad = [];
  for (const it of ITEMS.filter((x) => x.type === 'calc' && Number.isFinite(x.ans) && Math.abs(x.ans) > 0)) {
    const tol = Math.max(it.tol ?? 0.01, Math.abs(it.ans) * 0.006);
    const nums = numbersIn((it.steps || []).join(' '));
    /* đáp án có thể ghi theo phần trăm/triệu/nghìn khác đơn vị: chấp nhận ×/÷ 10, 100, 1000 */
    const scales = [1, 100, 0.01, 1000, 0.001, 1e6, 1e-6, 10, 0.1];
    const ok = nums.some((n) => scales.some((s) => Math.abs(n * s - it.ans) <= tol * Math.max(1, s > 1 ? s : 1) + 1e-9) || Math.abs(Math.abs(n) - Math.abs(it.ans)) <= tol);
    if (!ok) bad.push(`${it.id}: ans=${it.ans} không xuất hiện trong steps`);
  }
  /* Có thể có ít ca bất thường vì cách trình bày; ngưỡng cứng để không tăng thêm. */
  assert.ok(bad.length <= (Number(process.env.STEPS_MISMATCH_MAX) || 0), `${bad.length} câu lệch ans/steps:\n${bad.slice(0, 60).join('\n')}`);
});

test('tham chiếu: source/teaches trỏ tới bài, nguyên lý, campaign, brand có thật', () => {
  const L = new Set((get('LESSONS') || []).map((l) => `L:${l.day}`));
  const P = new Set((get('PRINCIPLES') || []).map((p) => `P:${p.id}`));
  const B = new Set(LESSONS.map((l) => l.id));
  const C = new Set((get('CAMPAIGNS') || []).map((c) => `campaign:${c.id}`));
  const BR = new Set((get('BRANDS') || []).map((c) => `brand:${c.id}`));
  const known = (k) => L.has(k) || P.has(k) || B.has(k) || C.has(k) || BR.has(k) || /^taste:/.test(k);
  const bad = [];
  for (const it of EXAM_ITEMS) {
    if (it.source && !known(it.source)) bad.push(`${it.id}: source ${it.source}`);
    for (const t of it.teaches || []) if (!known(t)) bad.push(`${it.id}: teaches ${t}`);
  }
  assert.deepEqual(bad, []);
});

/* --------- Hồi quy các lỗi số học đã xác minh (tính lại từ công thức, không tin vào ans đã gõ) --------- */
const byId = (id) => ITEMS.find((x) => x.id === id);
const REGRESSIONS = [
  { id: 'B:kn08-04#3', calc: () => 8000 * 0.99 ** 4, why: 'giữ lại 99% sau mỗi tin, 4 tin' },
  { id: 'B:tn06-05#4', calc: () => Math.round((1220 - 977) / (1220 / 92 - 977 / 80)), why: 'chi phí biên của phần tiền thêm' },
  { id: 'B:tn02-03#3', calc: () => 2 * Math.sqrt(100), why: 'dao động của một nhóm k=100' },
];

for (const r of REGRESSIONS) {
  test(`hồi quy ${r.id}: ans khớp tính lại (${r.why})`, () => {
    const it = byId(r.id);
    assert.ok(it, `không thấy ${r.id}`);
    assert.ok(Math.abs(it.ans - r.calc()) <= Math.max(it.tol ?? 0.01, 0.5), `ans=${it.ans}, tính lại=${r.calc()}`);
  });
}

test('hồi quy: dl03-01 Q5 — tổng chi phí hoà vốn ghi đúng 24 + 6 + 10', () => {
  const q = byId('B:dl03-01#5'), c = q.options.find((o) => o.k === q.answer).t;
  assert.match(c, /24 \+ 6 \+ 10/);
  assert.equal(0.6 * 40 + 0.15 * 40 + 10, 40);
});
