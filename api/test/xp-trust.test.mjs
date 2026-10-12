import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { filterClientLedger } from '../src/xp-trust.js';
import { ingestLedger, DEFAULTS } from '../src/engine.js';
import REFS from '../src/generated/xp-refs.json' with { type: 'json' };

const today = '2026-10-12';
const ctx = (o = {}) => ({ today, existing: new Map(), attestedLessons: new Set(['L:53']), passedStages: new Set(['s1']),
  hasServerEvents: false, knownLessons: new Set(['L:53']), knownCases: new Set(['cocomi-ngan-sach']), ...o });
const run = (xpl, o) => filterClientLedger(ingestLedger(xpl, DEFAULTS), ctx(o));
const refs = (r) => r.accepted.map((e) => e.ref).sort();

test('XP bài chỉ nhận khi bài đã được server ghi nhận', () => {
  const r = run({ 'lesson:L:53': { x: 10, d: today }, 'lesson:L:99': { x: 10, d: today }, 'lesson:L:fake': { x: 10, d: today } });
  assert.deepEqual(refs(r), ['lesson:L:53']);
  assert.equal(r.rejected.length, 2);
});
test('500 case giả không có thật: chỉ nhận case trong danh mục', () => {
  const xpl = {}; for (let i = 0; i < 500; i++) xpl['case:fake-' + i] = { x: 40, d: today };
  xpl['case:cocomi-ngan-sach'] = { x: 40, d: today };
  assert.deepEqual(refs(run(xpl)), ['case:cocomi-ngan-sach']);
});
test('đề chặng: chỉ khi server đã chấm đạt', () => {
  assert.deepEqual(refs(run({ 'exam:s1': { x: 50, d: today }, 'exam:s2': { x: 50, d: today } })), ['exam:s1']);
});
test('nguồn chỉ server cấp (quest, chest, boss, pvp, referral) bị loại', () => {
  const r = run({ 'quest@2026-10-12': { x: 30, d: today }, 'chest:abc': { x: 99, d: today }, 'boss:w1': { x: 99, d: today } });
  assert.equal(r.accepted.length, 0);
});
test('ngày ngoài cửa sổ (quá khứ xa / tương lai) bị loại; sự kiện đã có thì không dời ngày được', () => {
  const r = run({ 'quiz@2020-01-01': { x: 60, d: '2020-01-01' }, 'quiz@2030-01-01': { x: 60, d: '2030-01-01' }, 'quiz@2026-10-11': { x: 60, d: '2026-10-11' } });
  assert.deepEqual(refs(r), ['quiz@2026-10-11']);
  const moved = filterClientLedger(ingestLedger({ 'quiz@2026-10-01': { x: 60, d: '2026-10-01' } }, DEFAULTS),
    ctx({ existing: new Map([['quiz@2026-10-01', { day: '2026-10-01', amount: 40 }]]) }));
  assert.equal(moved.accepted[0].day, '2026-10-01');
});
test('legacy:base chỉ nhận khi chưa có XP do server cấp', () => {
  assert.deepEqual(refs(run({ 'legacy:base': { x: 900, d: today } })), ['legacy:base']);
  assert.equal(run({ 'legacy:base': { x: 900, d: today } }, { hasServerEvents: true }).accepted.length, 0);
});
test('amount luôn bị kẹp theo cấu hình (validateEntry) — 99999 XP một bài chỉ còn mức tối đa', () => {
  const r = run({ 'lesson:L:53': { x: 99999, d: today } });
  assert.equal(r.accepted[0].amount, DEFAULTS.xp_once.lesson);
});
test('xp-refs.json khớp danh mục case hiện tại (bản sinh cũ sẽ bị bắt)', () => {
  const ctx2 = vm.createContext({});
  vm.runInContext(fs.readFileSync(new URL('../../assets/js/data/cases.js', import.meta.url), 'utf8') + '\n;globalThis.__C = CASES.map(c => c.id);', ctx2);
  assert.deepEqual([...REFS.cases], [...ctx2.__C].sort());
});
