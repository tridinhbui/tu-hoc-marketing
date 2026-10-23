/* Câu điền số: người học gõ "20%", "200.000đ", "1.200.000"… Trước đây máy chủ dùng Number() nên trả 400 invalid_answer
   và trình duyệt báo nhầm "Chưa chấm được: cần kết nối máy chủ" (học viên phải refresh, làm lại). */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { loadExamEngine } from './helpers.mjs';
import { parseNum as serverParse, gradeItem as serverGrade } from '../api/src/learn-core.js';

const CASES = [
  ['20', 20], ['20%', 20], ['20 %', 20], [' 20 ', 20], ['12,5', 12.5], ['0.2', 0.2], ['0,25', 0.25],
  ['1.200.000', 1200000], ['200.000đ', 200000], ['290.000 ₫', 290000], ['57,14 nghìn', 57.14], ['1.234,5', 1234.5],
  ['1,234.5', 1234.5], ['3.4', 3.4], ['-5', -5], ['8x', 8], ['', NaN], ['abc', NaN], ['%', NaN],
];

test('máy chủ đọc đúng mọi cách viết số thường gặp của người học', () => {
  for (const [v, want] of CASES) {
    const got = serverParse(v);
    if (Number.isNaN(want)) assert.ok(Number.isNaN(got), `${JSON.stringify(v)} phải là NaN, đang là ${got}`);
    else assert.equal(got, want, JSON.stringify(v));
  }
});

test('trình duyệt và máy chủ đọc số GIỐNG HỆT nhau (hai bản của cùng một hàm)', () => {
  const ctx = loadExamEngine({ api: async () => ({}) });
  for (const [v] of CASES) {
    ctx.__v = v;
    const c = vm.runInContext('parseNum(__v)', ctx), s = serverParse(v);
    assert.ok(Object.is(c, s) || (Number.isNaN(c) && Number.isNaN(s)), `${JSON.stringify(v)}: trình duyệt ${c} ≠ máy chủ ${s}`);
  }
});

test('máy chủ chấm "20%" là đúng (không còn invalid_answer); chữ không phải số mới bị từ chối', () => {
  const it = { type: 'calc', ans: 20, tol: 0.1 };
  assert.equal(serverGrade(it, '20%').correct, true);
  assert.equal(serverGrade(it, '20 %').invalid, undefined);
  assert.equal(serverGrade({ type: 'calc', ans: 1200000, tol: 1 }, '1.200.000').correct, true);
  assert.equal(serverGrade(it, 'hai mươi').invalid, true);
});

test('trình duyệt gửi số đã chuẩn hoá lên máy chủ và tự thử lại một lần khi máy chủ lỗi 5xx', async () => {
  const sent = []; let n = 0;
  const ctx = loadExamEngine({ setTimeout, api: async (path, { body }) => { sent.push(body.chosen); if (++n === 1) throw Object.assign(new Error('error'), { status: 503 }); return { correct: true, answer: 20 }; } });
  ctx.__it = { id: 'c1', type: 'calc', unit: '%' };
  const r = await vm.runInContext(`gradeAsync(__it, '20 %', 'lesson')`, ctx);
  assert.equal(r.ok, true);
  assert.deepEqual(sent, ['20', '20']);
});

test('lỗi do câu trả lời (400) báo đúng lý do, không gọi là "cần kết nối máy chủ"', () => {
  const ctx = loadExamEngine({ api: async () => ({}) });
  const msg = (m) => vm.runInContext(`gradeErrorMsg(Object.assign(new Error(${JSON.stringify(m)}),{status:400}))`, ctx);
  assert.match(msg('invalid_answer'), /con số/);
  assert.match(msg('login_required'), /đăng nhập/);
  assert.doesNotMatch(msg('invalid_answer'), /kết nối máy chủ/);
});
