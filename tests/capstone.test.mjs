/* Bài tập tổng hợp "Kế hoạch chiến dịch một trang": số liệu giả lập tự khớp, bài mẫu tính đúng và qua mọi kiểm tra,
   rubric đủ 10 × 3, mọi liên kết bài có thật, kế hoạch cố tình sai bị bắt. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { loadLessons, rel } from './helpers.mjs';

const ctx = vm.createContext({ console });
vm.runInContext(fs.readFileSync(rel('assets/js/data/capstone.js'), 'utf8'), ctx, { filename: 'capstone.js' });
const C = vm.runInContext('CAPSTONE', ctx);
const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

test('(i) số liệu gốc nhất quán: biên lãi, LTV, ngưỡng CAC, năng lực', () => {
  const u = C.unit, L = C.limits, Rt = C.retention;
  assert.equal(u.contribution, u.aov - u.cogs - u.fee - u.shipPack, 'lãi đóng góp = giá − giá vốn − phí − ship');
  assert.ok(close(u.margin, u.contribution / u.aov), 'biên = lãi đóng góp ÷ giá trị đơn');
  assert.ok(close(u.fee, u.aov * 0.1), 'phí sàn 10%');
  assert.equal(Rt.ltv, Rt.orders12m * u.contribution, 'LTV = số đơn 12 tháng × lãi đóng góp');
  assert.equal(L.cacCeiling, Rt.ltv / L.ltvToCac, 'trần CAC = LTV ÷ 3');
  assert.equal(L.cacBreakevenFirst, u.contribution, 'CAC hoà vốn đơn đầu = lãi đóng góp');
  assert.ok(close(u.aov / L.cacBreakevenFirst, 1 / u.margin), 'ROAS hoà vốn = 1 ÷ biên');
  assert.ok(close(L.repeatPerMonth, (Rt.orders12m - 1) * u.contribution / 12), 'lãi mua lại mỗi tháng');
  assert.equal(L.maxOrders, L.stock / L.boxesPerOrder, 'kho ÷ 2 hộp mỗi đơn');
  assert.equal(L.maxNew, L.maxOrders - L.returningOrders);
  for (const h of C.history) assert.equal(h.revenue, h.orders * u.aov, `${h.m}: doanh thu = đơn × giá trị đơn`);
  assert.ok(C.history.every((h) => h.newCustomers < h.orders));
  assert.match(C.benchNote, /minh hoạ.*không phải benchmark/);
  assert.equal(C.channels.length, 5);
  for (const ch of C.channels) {
    assert.ok(ch.model === 'cpm' ? ch.cpm > 0 : ch.cpc > 0, ch.id);
    assert.ok(ch.ctr > 0 && ch.ctr < 1 && ch.cvr > 0 && ch.cvr < 1 && ch.cap > 0, ch.id);
  }
  assert.equal(C.calendar.length, C.weeks);
  assert.equal(C.interviews.length, 3);
  assert.equal(C.competitors.length, 3);
});

test('(ii) bài mẫu: tổng phân bổ = ngân sách, mọi số tính lại đúng từ benchmark', () => {
  const E = C.example, c = C.calc(E);
  const spend = C.channels.reduce((n, ch) => n + C.num(E['al_' + ch.id]), 0);
  assert.equal(spend, C.budget, 'tổng phân bổ = ngân sách');
  let orders = 0;
  for (const ch of C.channels) {
    const s = C.num(E['al_' + ch.id]);
    const clicks = ch.model === 'cpm' ? s / ch.cpm * 1000 * ch.ctr : s / ch.cpc;
    const o = clicks * ch.cvr; orders += o;
    const r = c.rows.find((x) => x.id === ch.id);
    assert.ok(close(r.orders, o), `${ch.id}: đơn`);
    assert.ok(close(r.cac, s / o), `${ch.id}: CAC = chi ÷ đơn`);
    assert.ok(s <= ch.cap, `${ch.id}: không vượt mức chi tối đa`);
  }
  assert.ok(close(c.orders, orders));
  assert.ok(close(c.orders, 815), 'tổng 815 đơn');
  // số người học gõ trong bài mẫu khớp lời giải
  assert.equal(C.num(E.f_orders), Math.round(c.orders));
  assert.ok(Math.abs(C.num(E.f_cac) - C.budget / c.orders) < 1, 'CAC');
  assert.equal(C.num(E.f_rev), c.orders * C.unit.aov);
  assert.ok(close(C.num(E.f_net), c.orders * C.unit.contribution - C.budget, 1));
  assert.ok(Math.abs(C.num(E.f_roas) - c.orders * C.unit.aov / C.budget) < 0.01, 'ROAS');
  assert.equal(C.num(E.f_roasbe), 1 / C.unit.margin, 'ROAS hoà vốn');
  assert.ok(Math.abs(C.num(E.f_roi) - (c.orders * C.unit.contribution - C.budget) / C.budget * 100) < 0.01, 'ROI');
  assert.equal(C.num(E.f_payback), 0, 'CAC < lãi đơn đầu → hoàn vốn ngay');
  assert.ok(c.cac <= C.limits.cacCeiling && c.orders <= C.limits.maxNew && c.roas > c.roasBE);
  assert.ok(C.num(E.p1_new) <= c.orders);
  const fails = C.runChecks(E).filter((x) => !x.ok);
  assert.equal(fails.length, 0, 'bài mẫu qua toàn bộ checks: ' + JSON.stringify(fails));
  assert.equal(C.filled(E).pct, 1, 'bài mẫu điền đủ mọi ô');
});

test('(ii-b) mọi check là hàm thuần, chạy được trên kế hoạch rỗng mà không ném lỗi', () => {
  const r = C.runChecks({});
  assert.ok(r.length >= 25);
  for (const x of r) assert.ok(x.ok === false && x.why && !/lỗi khi kiểm/.test(x.why), x.id);
  assert.equal(C.filled({}).have, 0);
  assert.ok(C.unlockAt >= 0.6);
});

test('(iii) rubric đủ 10 tiêu chí × 3 mức', () => {
  assert.equal(C.rubric.length, 10);
  assert.equal(C.levels.join('|'), 'Chưa đạt|Đạt|Tốt');
  for (const r of C.rubric) {
    assert.equal(r.l.length, 3, r.id);
    assert.ok(r.l.every((d) => d.length > 20), r.id);
    assert.ok(r.learn.length >= 1, r.id);
  }
  assert.equal(new Set(C.rubric.map((r) => r.id)).size, 10);
});

test('(iv) mọi id bài được liên kết đều tồn tại', () => {
  const ids = new Set(loadLessons().map((l) => l.id));
  const linked = [...C.rubric.flatMap((r) => r.learn), ...C.parts.flatMap((p) => p.learn)];
  for (const k of linked) assert.ok(ids.has(k), `không có bài ${k}`);
  assert.equal(C.parts.length, 8);
});

test('(v) kế hoạch cố tình sai bị checks bắt', () => {
  const bad = { ...C.example, al_fb: '29tr', k3_type: 'sớm', f_cac: '50.000' };
  const res = C.runChecks(bad), fail = (id) => res.find((x) => x.id === id);
  assert.equal(fail('alloc-sum').ok, false); assert.match(fail('alloc-sum').why, /thiếu/);
  assert.equal(fail('kpi-lag').ok, false);
  assert.equal(fail('fc-cac-self').ok, false);
  assert.equal(fail('fc-orders').ok, false, 'dự báo cũ không còn khớp phân bổ mới');
  // mục tiêu không số / không hạn, tiêu chí dừng không số, vượt trần CAC, dồn tiền vào kênh lỗ
  const bad2 = { ...C.example, p1_goal: 'Tăng nhận biết thương hiệu', p8_stop: 'Theo dõi sát, thấy không ổn thì dừng',
    al_fb: '20tr', al_tt: '30tr', al_gg: '10tr', al_zl: '5tr', al_koc: '15tr' };
  const r2 = C.runChecks(bad2), f2 = (id) => r2.find((x) => x.id === id).ok;
  for (const id of ['goal-smart', 'stop-num', 'alloc-cac', 'alloc-loss', 'goal-vs-fc']) assert.equal(f2(id), false, id);
  assert.equal(f2('alloc-sum'), true);
  // chọn phân khúc không phải điểm cao nhất mà không ghi lý do
  assert.equal(C.runChecks({ ...C.example, p2_pick: 'C', p2_why: '' }).find((x) => x.id === 'stp-pick').ok, false);
});

test('trang capstone.html chỉ nạp script có thật và dùng đúng khoá lưu', () => {
  const html = fs.readFileSync(rel('capstone.html'), 'utf8');
  for (const m of html.matchAll(/<script src="([^"?]+)/g)) assert.ok(fs.existsSync(rel(m[1])), m[1]);
  assert.match(html, /<noscript>/);
  assert.match(html, /aria-live/);
  assert.equal(C.storageKey, 'thmc.capstone.v1');
  assert.doesNotMatch(html, /fetch\(|XMLHttpRequest|sendBeacon/);
});
