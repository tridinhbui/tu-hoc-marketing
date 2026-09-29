import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULTS as C, validateEntry, ingestLedger, levelOf, replayStreak, streakAsOf, computeStats, questStatus } from '../src/engine.js';

test('bài học: kẹp ở 10 XP dù client gửi 9999', () => {
  assert.deepEqual(validateEntry('lesson:L:57', { x: 9999, d: '2026-09-29' }, C), { source: 'lesson', ref: 'lesson:L:57', amount: 10, day: '2026-09-29' });
});
test('nguồn lặp lại: trần theo ngày (quiz 60)', () => {
  assert.equal(validateEntry('quiz@2026-09-29', { x: 500, d: '2026-09-29' }, C).amount, 60);
});
test('mua lại chuỗi luôn đúng −150, không tin số gửi lên', () => {
  assert.equal(validateEntry('spend:restore:2026-09-29', { x: -1, d: '2026-09-29' }, C).amount, -150);
});
test('khoá lạ và ngày sai bị loại', () => {
  assert.equal(validateEntry('hack:1', { x: 10, d: '2026-09-29' }, C), null);
  assert.equal(validateEntry('lesson:L:1', { x: 10, d: 'hôm nay' }, C), null);
  assert.equal(validateEntry('bogus@2026-09-29', { x: 10, d: '2026-09-29' }, C), null);
});
test('XP cũ (legacy) có trần', () => {
  assert.equal(validateEntry('legacy:base', { x: 50000, d: '2026-09-01' }, C).amount, 2000);
});
test('bảng cấp độ theo spec: 30 XP lên cấp 2, 300000 là cấp 30', () => {
  assert.equal(levelOf(29, C.levels), 1); assert.equal(levelOf(30, C.levels), 2);
  assert.equal(levelOf(2400, C.levels), 8); assert.equal(levelOf(300000, C.levels), 30);
});
test('AC9: học 23:30 thứ Hai và 00:30 thứ Ba (giờ địa phương) → chuỗi 2', () => {
  assert.equal(replayStreak(['2026-09-28', '2026-09-29'], [], C).current, 2);
});
test('AC9: bỏ một ngày khi còn thẻ → tốn 1 thẻ, chuỗi giữ', () => {
  const s = replayStreak(['2026-09-01', '2026-09-02', '2026-09-04'], [], C);
  assert.equal(s.current, 3); assert.equal(s.freezesUsed, 1); assert.equal(s.freezesLeft, 2);
});
test('hết thẻ thì chuỗi về 1 và nhớ chuỗi cũ; mua lại trong 3 ngày thì khôi phục', () => {
  const days = ['2026-09-01', '2026-09-03', '2026-09-05', '2026-09-07', '2026-09-08', '2026-09-10'];
  const broke = replayStreak(days, [], C);            // 3 lần bỏ ngày dùng hết 3 thẻ, lần thứ tư gãy
  assert.equal(broke.current, 1); assert.equal(broke.brokeFrom, 5);
  const fixed = replayStreak(days, ['2026-09-10'], C);
  assert.equal(fixed.current, 5);
});
test('chuỗi tới hôm nay: chưa học hôm nay nhưng hôm qua có học → vẫn giữ', () => {
  const s = replayStreak(['2026-09-27', '2026-09-28'], [], C);
  assert.equal(streakAsOf(s, '2026-09-29'), 2);
  assert.equal(streakAsOf({ ...s, freezesLeft: 0 }, '2026-10-05'), 0);
});
test('tổng hợp: XP = tổng sổ cái, bài chỉ tính một lần, ngày học đếm đúng loại', () => {
  const ev = ingestLedger({
    'lesson:L:57': { x: 10, d: '2026-09-28' }, 'lesson:L:58': { x: 10, d: '2026-09-29' },
    'quiz@2026-09-29': { x: 6, d: '2026-09-29' }, 'spend:restore:2026-09-29': { x: -150, d: '2026-09-29' },
  }, C);
  const st = computeStats(ev, C, '2026-09-29');
  assert.equal(st.total_xp, 0);   // 26 − 150 → không âm
  assert.equal(st.streak, 2);
});
test('nhiệm vụ ngày: đủ điều kiện từ sổ cái hôm nay', () => {
  const q = [{ id: 'q_lesson', t: 'x', xp: 10, need: { any: ['lesson', 'learned'], n: 1 } }];
  const ev = ingestLedger({ 'lesson:L:1': { x: 10, d: '2026-09-29' } }, C);
  assert.equal(questStatus(q, ev, '2026-09-29')[0].done, true);
  assert.equal(questStatus(q, ev, '2026-09-30')[0].done, false);
});
