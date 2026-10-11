/* Khi máy chủ chấm lỗi: không tự cho qua, không ghi kết quả nửa chừng, không mất câu đã trả lời. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { loadExamEngine, rel } from './helpers.mjs';

const stripped = [
  { id: 'q1', type: 'mcq', options: [{ k: 'a', t: 'x' }, { k: 'b', t: 'y' }] },   // bản dist: không còn `answer`
  { id: 'q2', type: 'calc', unit: 'đ' },
];
const withKey = { id: 'k1', type: 'mcq', options: [{ k: 'a', t: 'x' }, { k: 'b', t: 'y' }], answer: 'a', why: { a: 'ok', b: 'no' } };

test('đề đã bỏ đáp án + máy chủ lỗi → gradeAsync NÉM LỖI (không trả ok=true)', async () => {
  const ctx = loadExamEngine({ api: async () => { throw new Error('network'); } });
  ctx.__it = stripped[0];
  await assert.rejects(vm.runInContext(`gradeAsync(__it, 'a', 'practice')`, ctx));
});

test('câu bỏ trống không gọi máy chủ và bị tính sai (không phải đúng)', async () => {
  let called = 0; const ctx = loadExamEngine({ api: async () => { called++; return {}; } });
  ctx.__it = stripped[0];
  const r = await vm.runInContext(`gradeAsync(__it, '', 'practice')`, ctx);
  assert.equal(r.ok, false); assert.equal(called, 0);
});

test('cả đề: một câu lỗi mạng giữa chừng → cả lượt bị từ chối, không có kết quả "đạt"', async () => {
  let n = 0;
  const ctx = loadExamEngine({ api: async () => { if (++n === 2) throw new Error('timeout'); return { correct: true, answer: 'a' }; } });
  ctx.__items = [{ ...stripped[0], id: 'x1' }, { ...stripped[0], id: 'x2' }, { ...stripped[0], id: 'x3' }];
  ctx.__ans = { x1: 'a', x2: 'a', x3: 'a' };
  await assert.rejects(vm.runInContext(`gradeExamAsync('s1', __items, __ans)`, ctx));
});

test('chấm tại chỗ chỉ khi có đáp án; không có đáp án thì hỏi máy chủ và dùng kết quả máy chủ', async () => {
  let asked = null;
  const ctx = loadExamEngine({ api: async (p, o) => { asked = { p, o }; return { correct: false, answer: 'b', explanation: 'vì…' }; } });
  ctx.__it = stripped[0]; ctx.__k = withKey;
  const a = await vm.runInContext(`gradeAsync(__k, 'a', 'practice')`, ctx);
  assert.equal(a.ok, true); assert.equal(asked, null);
  const b = await vm.runInContext(`gradeAsync(__it, 'a', 'practice')`, ctx);
  assert.equal(b.ok, false); assert.equal(asked.p, '/answers'); assert.equal(asked.o.body.question_id, 'q1');
});

test('máy chủ trả "không đúng" thì đề KHÔNG đạt dù client có thể đoán', async () => {
  const ctx = loadExamEngine({ api: async () => ({ correct: false, answer: 'b' }) });
  ctx.__items = Array.from({ length: 15 }, (_, i) => ({ ...stripped[0], id: 'z' + i }));
  ctx.__ans = Object.fromEntries(ctx.__items.map((x) => [x.id, 'a']));
  const r = await vm.runInContext(`gradeExamAsync('s1', __items, __ans)`, ctx);
  assert.equal(r.passed, false); assert.equal(r.right, 0);
});

test('thi.html: đề không chấm được → màn "chưa thi được" trước khi bấm giờ; lỗi chấm → giữ bài làm dở', () => {
  const html = fs.readFileSync(rel('thi.html'), 'utf8');
  assert.match(html, /!items\.source && !items\.every\(hasKey\)/, 'thiếu kiểm đề không chấm được trước khi bắt đầu');
  assert.match(html, /catch \(e\) \{ saveDraft\(\)/, 'thiếu lưu bài làm dở khi chấm lỗi');
  assert.match(html, /clearDraft\(\);\s*saveExam\(/, 'bài làm dở phải xoá sau khi đã chấm xong');
  /* saveExam (ghi lượt thi/khoá) chỉ được gọi sau khi chấm xong, không nằm trong nhánh catch */
  const i = html.indexOf('catch (e) { saveDraft()'), j = html.indexOf('saveExam(SID, res)');
  assert.ok(i > 0 && j > i, 'saveExam phải đứng sau nhánh xử lý lỗi chấm');
});

test('bai.html: nộp quiz bài học chấm hết rồi mới ghi; lỗi mạng giữ nguyên câu trả lời', () => {
  const html = fs.readFileSync(rel('bai.html'), 'utf8');
  assert.match(html, /grades\[i\]=await gradeAsync\(PLAN\.quiz\[i\],ANS\['qz'\+i\],'lesson'\)/);
  const g = html.indexOf("grades[i]=await gradeAsync"), c = html.indexOf('completeLesson(key,right,PLAN.quiz.length)');
  assert.ok(g > 0 && c > g, 'completeLesson phải chạy sau khi chấm xong mọi câu');
});
