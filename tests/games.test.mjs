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

const G2 = require(rel('assets/js/games/g2-segments.js'));
const G5 = require(rel('assets/js/games/g5-funnel.js'));

test('G2: tối ưu từng vòng đạt 3 sao; luôn chọn nhóm đông nhất không quá 1 sao; lựa chọn cố định không đạt 3 sao', () => {
  assert.equal(G2.stars(G2.score(G2.rounds.map((r) => G2.best(r)))), 3);
  const biggest = [...G2.segments].sort((a, b) => b.size - a.size)[0].id;
  const s = G2.score(G2.rounds.map((r) => ({ seg: biggest, msg: G2.attrs.map((a) => a.id).sort((x, y) => G2.customers(r, biggest, y) - G2.customers(r, biggest, x))[0] })));
  assert.ok(G2.stars(s) <= 1, `nhóm đông nhất = ${s}`);
  for (const sg of G2.segments) for (const a of G2.attrs) assert.ok(G2.stars(G2.score(G2.rounds.map(() => ({ seg: sg.id, msg: a.id })))) < 3);
});
test('G2: nhóm đông nhất không phải nhóm tốt nhất ở phần lớn vòng; trần tiếp cận có tác dụng', () => {
  const biggest = [...G2.segments].sort((a, b) => b.size - a.size)[0].id;
  assert.ok(G2.rounds.filter((r) => G2.best(r).seg !== biggest).length >= 3);
  const r = G2.rounds[0];
  const small = G2.segments.find((s) => s.size < G2.CONTACTS);
  assert.ok(small, 'cần ít nhất một nhóm nhỏ hơn số lượt tiếp cận');
});
test('G5: tối ưu đạt 3 sao; sửa toàn đầu phễu không quá 0 sao; thang đơn điệu theo số hành động', () => {
  assert.equal(G5.stars(G5.score(G5.rounds.map((r) => G5.best(r).fixes))), 3);
  assert.equal(G5.stars(G5.score(G5.rounds.map(() => ['aware', 'aware', 'aware']))), 0);
  const r = G5.rounds[0];
  assert.ok(G5.orders(r, ['buy']) > G5.orders(r, []));
  assert.ok(G5.orders(r, ['buy', 'buy']) > G5.orders(r, ['buy']));
});
test('G5: tầng tốt nhất không phải tầng đầu phễu ở mọi vòng', () => {
  for (const r of G5.rounds) assert.ok(!G5.best(r).fixes.every((x) => x === 'aware'));
});

const G3 = require(rel('assets/js/games/g3-position.js'));
const G6 = require(rel('assets/js/games/g6-story.js'));

test('G3: tối ưu từng thị trường đạt 3 sao; luôn ô trung tâm hoặc luôn ô đông nhất không quá 1 sao; không vị trí cố định nào đạt 3 sao', () => {
  assert.equal(G3.stars(G3.score(G3.rounds.map((r) => G3.best(r).cell))), 3);
  assert.ok(G3.stars(G3.score(G3.rounds.map(() => [2, 2]))) <= 1);
  const peak = G3.rounds.map((r) => { const D = G3.demand(r); let b = [0, 0, -1]; for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if (D[y][x] > b[2]) b = [x, y, D[y][x]]; return [b[0], b[1]]; });
  assert.ok(G3.stars(G3.score(peak)) <= 1);
  for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) assert.ok(G3.stars(G3.score(G3.rounds.map(() => [x, y]))) < 3);
});
test('G3: chia nhu cầu bảo toàn tổng; đặt trùng ô đối thủ thì chia đôi ô đó', () => {
  const r = G3.rounds[0], t = G3.split(r, [4, 0]), all = G3.demand(r).flat().reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(t.total - all) < 1e-9 && t.mine <= t.total);
  const rv = r.rivals[0], same = G3.split(r, rv), cell = G3.demand(r)[rv[1]][rv[0]];
  assert.ok(same.mine >= cell / 2 - 1e-9);
});

test('G6: mỗi vòng đủ 6 mảnh, có đúng mảnh phản tác dụng, mảnh tốt nhất không luôn đứng đầu danh sách', () => {
  for (const r of G6.rounds) { assert.equal(r.cards.length, 6); assert.ok(r.cards.some((c) => c.tier === -1)); assert.equal(new Set(r.cards.map((c) => c.id)).size, 6); }
  const firstStrong = G6.rounds.filter((r) => r.cards[0].tier === 2).length;
  assert.ok(firstStrong < G6.rounds.length, 'mảnh mạnh không được luôn nằm đầu');
});
test('G6: tối ưu 3 sao; có mảnh phản tác dụng không quá 2 sao; ba mảnh yếu 0 sao; thứ tự có ý nghĩa', () => {
  assert.equal(G6.stars(G6.score(G6.rounds.map((r) => G6.best(r).ids))), 3);
  assert.ok(G6.stars(G6.score(G6.rounds.map((r) => { const bad = r.cards.find((c) => c.tier === -1).id, b = G6.best(r).ids; return [b[0], b[1], bad]; })) ) < 3);
  assert.equal(G6.stars(G6.score(G6.rounds.map((r) => r.cards.filter((c) => c.tier <= 0).slice(0, 3).map((c) => c.id)))), 0);
  const r = G6.rounds[0], strong = r.cards.filter((c) => c.tier === 2).map((c) => c.id), mid = r.cards.find((c) => c.tier === 1).id;
  assert.ok(G6.points(r, [strong[0], strong[1], mid]) > G6.points(r, [mid, strong[0], strong[1]]), 'nói mảnh mạnh trước phải điểm cao hơn');
});

const G7 = require(rel('assets/js/games/g7-diagnose.js'));
const G8 = require(rel('assets/js/games/g8-calendar.js'));

test('G7: mỗi vòng đúng một lượt kiểm chứa bằng chứng; kiểm các nghi phạm gần và rẻ rồi kết luận đúng đạt 3 sao', () => {
  for (const r of G7.rounds) {
    const ev = Object.entries(r.checks).filter(([, c]) => c.points === r.truth);
    assert.ok(ev.length >= 1, `${r.id}: không có lượt chứa bằng chứng`);
    assert.ok(G7.causes.some((c) => c.id === r.truth));
    for (const k of Object.keys(G7.checkDefs)) assert.ok(r.checks[k], `${r.id}: thiếu lượt kiểm ${k}`);
  }
  const best = G7.rounds.map((r) => ({ picked: Object.keys(r.checks).filter((k) => r.checks[k].points === r.truth), cause: r.truth }));
  assert.equal(G7.stars(G7.score(best)), 3);
  assert.equal(G7.stars(G7.score(G7.rounds.map(() => ({ picked: ['period', 'paid', 'own'], cause: 'measure' })))), 0);
});
test('G7: kết luận đúng mà không kiểm không quá 2 sao; luôn đổ cho nền tảng thì 0 sao', () => {
  assert.ok(G7.stars(G7.score(G7.rounds.map((r) => ({ picked: [], cause: r.truth })))) <= 2);
  assert.equal(G7.stars(G7.score(G7.rounds.map(() => ({ picked: ['platform'], cause: 'platform' })))), 0);
});
test('G7: lượt kiểm theo thứ tự rẻ-gần (period, paid, own) đủ chẩn đoán cả ba vòng', () => {
  for (const r of G7.rounds) assert.ok(['period', 'paid', 'own'].some((k) => r.checks[k].points === r.truth), r.id);
});

test('G8: lịch mẫu đạt mọi luật cho từng brief; lịch rỗng và lịch toàn bán không đạt 1 sao', () => {
  for (const b of G8.briefs) { const r = G8.check(b, G8.example(b)); assert.equal(r.passed, r.total, `${b.id}: ${r.rules.filter((x) => !x.ok).map((x) => x.detail).join('; ')}`); }
  assert.equal(G8.stars(G8.score(G8.briefs.map(() => new Array(30).fill(null)))), 0);
  assert.equal(G8.stars(G8.score(G8.briefs.map(() => new Array(30).fill('sell')))), 0);
  assert.equal(G8.stars(G8.score(G8.briefs.map((b) => G8.example(b)))), 3);
});
test('G8: vượt sức sản xuất hoặc mở đầu bằng bán hàng bị bắt', () => {
  const b = G8.briefs[0];
  const over = new Array(30).fill('aware'); assert.equal(G8.check(b, over).rules.find((x) => x.id === 'cap').ok, false);
  const ex = G8.example(b), firstIdx = ex.findIndex(Boolean); const bad = [...ex]; bad[firstIdx] = 'sell';
  assert.equal(G8.check(b, bad).rules.find((x) => x.id === 'open').ok, false);
});
