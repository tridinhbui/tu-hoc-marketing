import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { rel } from './helpers.mjs';
const require = createRequire(import.meta.url);
const G1 = require(rel('assets/js/game.js'));
const G4 = require(rel('assets/js/games/g4-budget.js'));

const run1 = (p) => { let s = G1.start(); for (let i = 0; i < G1.QUARTERS; i++) s = G1.step(s, p); return s; };

test('G1: cùng chiến lược luôn ra cùng kết quả; thang sao đơn điệu theo lãi', () => {
  const a = run1({ m: 1, d: 1, r: 1, disc: 0 }), b = run1({ m: 1, d: 1, r: 1, disc: 0 });
  assert.equal(a.cash, b.cash);
  assert.equal(G1.stars(-1e9), 0); assert.equal(G1.stars(1e9), 1); assert.equal(G1.stars(60e9), 2); assert.equal(G1.stars(80e9), 3);
});
test('G1: chia đều được ≥ 2 sao, không chi gì thì 0 sao, giảm giá sâu thì lỗ', () => {
  assert.ok(G1.stars(run1({ m: 1, d: 1, r: 1, disc: 0 }).cash) >= 2);
  assert.equal(G1.stars(run1({ m: 0, d: 0, r: 0, disc: 0 }).cash), 0);
  assert.ok(run1({ m: 1, d: 1, r: 1, disc: 0.3 }).cash < 0);
});
test('G1: có chiến lược cố định đạt 3 sao (game thắng được)', () => {
  let top = -Infinity;
  for (let m = 0; m <= 3; m += .25) for (let d = 0; d <= 3 - m; d += .25) top = Math.max(top, run1({ m, d, r: 3 - m - d, disc: 0 }).cash);
  assert.equal(G1.stars(top), 3);
});

test('G4: reach đơn điệu theo tiền, lợi ích giảm dần, các kênh chồng lấn (< tổng)', () => {
  const m = { search: 1, social: 1, video: 1, ooh: 1 };
  const r = (s) => G4.reach({ search: 0, social: s, video: 0, ooh: 0 }, m);
  assert.ok(r(2) > r(1) && r(4) > r(2));
  assert.ok(r(2) - r(1) > r(4) - r(3), 'phải giảm dần');
  const two = G4.reach({ search: 0, social: 2, video: 2, ooh: 0 }, m), sum = r(2) + G4.reach({ search: 0, social: 0, video: 2, ooh: 0 }, m);
  assert.ok(two < sum, 'chồng lấn');
});
test('G4: mùa vụ đổi cách chia tối ưu; chia theo tối ưu từng quý đạt 3 sao, chia đều không', () => {
  const bests = G4.quarters.map((q) => G4.best(q.mult));
  for (const b of bests) assert.ok(Math.abs(G4.total(b.alloc) - G4.BUDGET) < 1e-9);
  assert.notDeepEqual(bests[0].alloc, bests[1].alloc);
  assert.equal(G4.stars(G4.score(bests.map((b) => b.alloc))), 3);
  const even = Object.fromEntries(G4.channels.map((c) => [c.id, G4.BUDGET / G4.channels.length]));
  const s = G4.score(G4.quarters.map(() => even));
  assert.ok(G4.stars(s) < 3 && G4.stars(s) >= 1);
  assert.equal(G4.stars(G4.score(G4.quarters.map(() => ({ search: 0, social: 0, video: 0, ooh: 0 })))), 0);
});
test('G4: không có chiến lược cố định nào đạt 3 sao (buộc phải đổi theo mùa)', () => {
  let top = 0; const n = G4.BUDGET / G4.UNIT;
  for (let a = 0; a <= n; a++) for (let b = 0; a + b <= n; b++) for (let c = 0; a + b + c <= n; c++) {
    const al = { search: a * G4.UNIT, social: b * G4.UNIT, video: c * G4.UNIT, ooh: (n - a - b - c) * G4.UNIT };
    top = Math.max(top, G4.score(G4.quarters.map(() => al)));
  }
  assert.ok(G4.stars(top) < 3, `cố định tốt nhất = ${top}`);
});
