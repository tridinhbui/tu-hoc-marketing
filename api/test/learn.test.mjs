import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { gradeItem, publicItem, updateMastery, masteryScore, stageExam, gradeExam, reviewSession, lockState, nextActions, seeded, lintItem, lengthBias, placementExam, gradePlacement } from '../src/learn-core.js';
const bank = JSON.parse(fs.readFileSync(new URL('../src/generated/bank.json', import.meta.url)));
const NOW = Date.UTC(2026, 8, 29);
const anyMcq = Object.values(bank.items).find((i) => i.type === 'mcq');
const anyCalc = Object.values(bank.items).find((i) => i.type === 'calc');

test('AC4: đề gửi xuống không có đáp án dưới bất kỳ tên nào', () => {
  for (const it of Object.values(bank.items)) {
    const s = JSON.stringify(publicItem(it));
    for (const k of ['"answer"', '"ans"', '"why"', '"tol"', '"steps"', '"wrong"', '"errors"']) assert.ok(!s.includes(k), `${it.id} lộ ${k}`);
  }
});
test('chấm trắc nghiệm: đúng/sai + lời giải theo phương án đã chọn', () => {
  assert.equal(gradeItem(anyMcq, anyMcq.answer).correct, true);
  const wrongK = anyMcq.options.find((o) => o.k !== anyMcq.answer).k;
  const r = gradeItem(anyMcq, wrongK);
  assert.equal(r.correct, false); assert.equal(r.option_feedback, anyMcq.why[wrongK]);
});
test('chấm điền số: trong sai số là đúng, chữ là không hợp lệ', () => {
  assert.equal(gradeItem(anyCalc, String(anyCalc.ans)).correct, true);
  assert.equal(gradeItem(anyCalc, 'abc').invalid, true);
});
test('AC6: kỹ năng mới trả lời đúng một câu độ khó trung bình → p = 0,24; hiển thị ≤ 0,05', () => {
  const m = updateMastery(null, true, 2, NOW);
  assert.ok(Math.abs(m.p - 0.24) < 1e-9);
  assert.ok(masteryScore(m, NOW) <= 0.05);
});
test('mastery: sai thì độ bền giảm, đúng khi đã quên dần thì độ bền tăng', () => {
  const a = updateMastery({ p: .5, stability_days: 10, n_answers: 5, last_answered_at: NOW - 20 * 864e5 }, true, 2, NOW);
  assert.equal(a.stability_days, 25);
  const b = updateMastery({ p: .5, stability_days: 10, n_answers: 5, last_answered_at: NOW - 864e5 }, false, 2, NOW);
  assert.equal(b.stability_days, 4);
});
test('AC5: đề vượt chặng 15 câu; 12/15 đạt, 11/15 trượt, nộp 14 câu là trượt; kho < 30 thì không có đề', () => {
  const cfg = { count: 15, pass: 0.8, min_pool: 30 };
  const { items } = stageExam(bank, 's2', cfg, seeded(1));
  assert.equal(items.length, 15);
  const ans = (n) => Object.fromEntries(items.map((id, i) => { const it = bank.items[id];
    const right = it.type === 'calc' ? String(it.ans) : it.answer; const wrong = it.type === 'calc' ? '-999999' : it.options.find((o) => o.k !== it.answer).k;
    return [id, i < n ? right : wrong]; }));
  assert.equal(gradeExam(bank, items, ans(12), 0.8).passed, true);
  assert.equal(gradeExam(bank, items, ans(11), 0.8).passed, false);
  const fourteen = ans(15); delete fourteen[items[14]];
  assert.equal(gradeExam(bank, items, fourteen, 0.8).passed, false);
  assert.equal(stageExam({ ...bank, stages: { x: ['a'] } }, 'x', cfg, seeded(1)).error, 'pool_too_small');
});
test('AC7: hàng ôn — câu sai ≥3 lần đứng trước câu chỉ đến hạn; không hai câu liền cùng bài', () => {
  const ids = Object.keys(bank.items);
  const memory = [{ question_id: ids[0], wrong_count: 1, due_at: NOW - 1 }, { question_id: ids[40], wrong_count: 4, due_at: NOW + 9e9 }];
  const s = reviewSession(bank, memory, [{ skill_id: 'measure', p: .2, stability_days: 2, n_answers: 3, last_answered_at: NOW - 9e8, due_at: NOW - 1 }], NOW, new Set(), 10, seeded(3));
  assert.ok(s.indexOf(ids[40]) < s.indexOf(ids[0]));
  for (let i = 1; i < s.length; i++) assert.notEqual(bank.items[s[i]].lesson, bank.items[s[i - 1]].lesson);
  assert.ok(s.length <= 10);
});
test('AC10: hard khoá bài chưa đủ điều kiện (ngoài N bài đầu); soft chỉ cảnh báo', () => {
  const order = Array.from({ length: 10 }, (_, i) => ({ key: 'L' + i, stage: 's1', mod: 'm' }));
  const hard = lockState(order, {}, 'hard', 7, null), soft = lockState(order, {}, 'soft', 7, null);
  assert.equal(hard[6].locked, false); assert.equal(hard[7].locked, true);
  assert.equal(soft[7].locked, false); assert.deepEqual(soft[7].warning, ['L6']);
  assert.equal(lockState(order, { L6: { state: 'passed' } }, 'hard', 7, null)[7].locked, false);
});
test('việc tiếp theo: ≥5 câu đến hạn thì ôn lên đầu', () => {
  assert.equal(nextActions({ dueCount: 6, masteryMin: .6, weakSkill: 'brand', nextLesson: 'L:1' }).main.kind, 'review');
  assert.equal(nextActions({ dueCount: 0, masteryMin: .9, weakSkill: 'brand', nextLesson: 'L:1' }).main.kind, 'lesson');
});
test('bài xếp lớp: đạt ≥80% chặng nào thì ghi công chặng đó', () => {
  const items = placementExam(bank, ['s1', 's2'], 4, seeded(5));
  const ans = Object.fromEntries(items.map((id) => { const it = bank.items[id]; return [id, bank.items[id].stage === 's1' ? (it.type === 'calc' ? String(it.ans) : it.answer) : 'z']; }));
  assert.deepEqual(gradePlacement(bank, items, ans, 0.8).passed, ['s1']);
});
test('cổng chất lượng: phát hiện phương án rỗng và lời giải trỏ theo vị trí', () => {
  const bad = { type: 'mcq', answer: 'a', options: [{ k: 'a', t: 'Tăng doanh thu nhờ giá' }, { k: 'b', t: 'Không ảnh hưởng gì' }], why: { a: 'Đúng như phương án A', b: 'x' } };
  const rules = lintItem(bad).map((w) => w.rule);
  assert.ok(rules.includes('empty_distractor')); assert.ok(rules.includes('positional_ref'));
});
test('thống kê mẹo độ dài chạy được trên kho thật', () => {
  const r = lengthBias(Object.values(bank.items));
  assert.ok(r.n > 100); assert.ok(Number.isFinite(r.z));
});
