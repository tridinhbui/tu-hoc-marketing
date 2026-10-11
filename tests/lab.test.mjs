import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { rel } from './helpers.mjs';
const require = createRequire(import.meta.url);
const E = require(rel('assets/js/lab/engine.js'));
globalThis.LabEngine = E;
const { LAB_CASES, LAB_META } = require(rel('assets/js/lab/scenario.js'));
globalThis.LAB_META = LAB_META;
const S = require(rel('assets/js/lab/meta-sim.js'));
const V = require(rel('assets/js/lab/meta-eval.js'));
const C = LAB_CASES.skincare;
const ctx = { seed: C.seed, aov: C.aov, grossMargin: C.grossMargin, leadToSale: C.leadToSale, budget: 5000000 };

const good = { ...S.emptyConfig(), name: 'tốt', objective: 'sales', age: ['a2534', 'a3544'], gender: 'female', location: ['hcm', 'hn'], interests: ['skincare', 'beauty'],
  dailyBudget: 350000, duration: 14,
  creative: { format: 'video', headline: 'Chống nắng nhẹ, không bết dính', cta: 'shop_now',
    primary: 'Kem chống nắng SPF50+ PA++++ thấm nhanh, không bết dính, hợp da dầu. Đã kiểm nghiệm da liễu, giảm 15% cho đơn đầu tiên.' } };
const run = (c, x = ctx) => S.simulate(c, x);

test('engine: KPI đúng công thức và mẫu số 0 trả null, không NaN/Infinity', () => {
  const k = E.kpis({ spend: 1000, impressions: 50000, reach: 25000, clicks: 500, conversions: 20, revenue: 4000 });
  assert.equal(k.ctr, 0.01); assert.equal(k.cpc, 2); assert.equal(k.cpm, 20); assert.equal(k.cvr, 0.04); assert.equal(k.cpa, 50); assert.equal(k.roas, 4); assert.equal(k.frequency, 2);
  const z = E.kpis({ spend: 500 });
  for (const m of ['ctr', 'cpc', 'cpm', 'cvr', 'cpa', 'frequency']) assert.equal(z[m], null, m);
  assert.equal(z.roas, 0);           // doanh thu 0 trên chi tiêu 500 là 0, không phải null
  assert.equal(E.kpis({}).roas, null);   // chi tiêu 0 → không xác định
});
test('engine: RNG có hạt xác định; mô phỏng nhiều ngày cộng đúng', () => {
  const a = E.rng(42), b = E.rng(42); assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
  const r = E.run({ days: 3, seed: 1, step: (d) => ({ spend: 10, impressions: 100 * d, clicks: d, conversions: 0, revenue: 0, reach: 50 * d }) });
  assert.equal(r.totals.impressions, 600); assert.equal(r.totals.clicks, 6); assert.equal(r.totals.reach, 150); assert.equal(r.days.length, 3);
});
test('engine: compare nhận biết chiều tốt/xấu (CPA giảm là tốt)', () => {
  const c = E.compare({ cpa: 100, roas: 2, cpm: 10, spend: 5 }, { cpa: 80, roas: 1.5, cpm: 10, spend: 9 });
  assert.equal(c.cpa.verdict, 'better'); assert.equal(c.roas.verdict, 'worse'); assert.equal(c.cpm.verdict, 'flat'); assert.equal(c.spend.verdict, 'flat');
});

test('meta: cùng cấu hình → cùng kết quả (xác định)', () => {
  assert.deepEqual(run(good).totals, run(good).totals);
});
test('meta: KPI của tổng khớp công thức từ tổng thô; tổng ngày = tổng chiến dịch', () => {
  const r = run(good), t = r.totals, sum = (k) => r.days.reduce((s, d) => s + d[k], 0);
  assert.equal(sum('impressions'), t.impressions); assert.equal(sum('spend'), t.spend); assert.equal(t.spend, good.dailyBudget * good.duration);
  assert.ok(Math.abs(t.ctr - t.clicks / t.impressions) < 1e-12); assert.ok(Math.abs(t.roas - t.revenue / t.spend) < 1e-12);
  assert.ok(Math.abs(t.cpm - t.spend / t.impressions * 1000) < 1e-9);
});
test('meta: chọn sai đối tượng làm CVR và ROAS giảm mạnh', () => {
  const bad = run({ ...good, age: ['a1824'], gender: 'male', location: ['other'], interests: ['gaming', 'tech'] });
  const ok = run(good);
  assert.ok(bad.diag.audience.rel < ok.diag.audience.rel - 0.3);
  assert.ok(bad.totals.cvr < ok.totals.cvr * 0.6, 'CVR phải thấp rõ rệt');
  assert.ok(bad.totals.roas < ok.totals.roas * 0.5);
});
test('meta: tăng ngân sách tăng reach/chi tiêu nhưng không bảo đảm ROAS', () => {
  const a = run({ ...good, dailyBudget: 350000, duration: 7 }), b = run({ ...good, dailyBudget: 700000, duration: 7 });
  assert.ok(b.totals.reach > a.totals.reach && b.totals.spend === 2 * a.totals.spend);
  assert.ok(b.totals.roas < a.totals.roas, 'ngân sách/ngày cao hơn đẩy CPM và làm ROAS giảm');
});
test('meta: tệp quá hẹp → tần suất cao và ROAS thấp hơn tệp vừa', () => {
  const narrow = run({ ...good, age: ['a2534'], location: ['dn'], interests: ['skincare'] }), ok = run(good);
  assert.ok(narrow.diag.audience.size < 50000 || narrow.totals.frequency > 2.5);
  assert.ok(narrow.totals.roas < ok.totals.roas);
});
test('meta: mục tiêu — Nhận biết phủ nhiều hơn, Doanh số cho ROAS tốt hơn; Leads quy đổi theo tỉ lệ chốt', () => {
  const sales = run(good), aw = run({ ...good, objective: 'awareness', creative: { ...good.creative, cta: 'learn_more' } });
  const lead = run({ ...good, objective: 'leads', creative: { ...good.creative, cta: 'sign_up' } });
  assert.ok(aw.totals.reach > sales.totals.reach && aw.totals.cpm < sales.totals.cpm);
  assert.ok(sales.totals.roas > aw.totals.roas && sales.totals.roas > lead.totals.roas);
  assert.ok(Math.abs(lead.orders - lead.totals.conversions * C.leadToSale) < lead.days.length * 0.51);
});
test('meta: cam kết tuyệt đối bị phạt (vi phạm → CPM cao, điểm nội dung giảm)', () => {
  const claim = { ...good, creative: { ...good.creative, headline: '100% trắng da ngay lập tức' } };
  const a = run(good), b = run(claim);
  assert.ok(b.diag.policy && !a.diag.policy); assert.ok(b.totals.cpm > a.totals.cpm); assert.ok(b.diag.creative.score < a.diag.creative.score);
});
test('meta: Audience Network rẻ nhưng chất lượng kém; một vị trí duy nhất đắt hơn', () => {
  const net = S.placementMix({ ...good, placementMode: 'manual', placements: ['network'] }), feed = S.placementMix({ ...good, placementMode: 'manual', placements: ['feed'] });
  assert.ok(net.cpm < feed.cpm && net.ctr < feed.ctr && net.cvr < feed.cvr);
  assert.ok(feed.narrow); assert.ok(!S.placementMix(good).narrow);
});
test('meta: validate chặn cấu hình thiếu và vượt hạn mức', () => {
  const v = S.validate(S.emptyConfig(), ctx); assert.equal(v.ok, false);
  assert.ok(v.errors.length >= 5);
  assert.equal(S.validate(good, ctx).ok, true);
  assert.equal(S.validate({ ...good, dailyBudget: 1000000 }, ctx).ok, false, '14 triệu > 5 triệu');
});
test('meta: ngân sách nhỏ không làm chuyển đổi về 0 chỉ vì làm tròn', () => {
  const r = run({ ...good, dailyBudget: 100000, duration: 7 });
  assert.ok(r.totals.conversions >= 1);
});
test('meta: đầu ra GA4 nhất quán với chiến dịch và nêu giả định', () => {
  const r = run(good), f = r.feed;
  assert.equal(f.source, 'facebook'); assert.equal(f.medium, 'paid_social');
  assert.ok(f.sessions <= r.totals.clicks); assert.ok(f.conversions <= r.totals.conversions); assert.ok(f.revenue <= r.totals.revenue);
  assert.equal(f.cost, r.totals.spend); assert.ok(f.assumptions.sessionRate < 1 && f.assumptions.convRate < 1);
});

test('chấm điểm: cấu hình tốt đạt 3 sao ở Thử thách sau vài lần thử; sai đối tượng+nội dung thì thấp', () => {
  const r = run(good), hist = [{ roas: 1 }, { roas: 1.5 }];
  const ev = V.evaluate(good, r, ctx, 'challenge', hist);
  assert.ok(ev.total >= 85, 'tốt phải ≥ 85, được ' + ev.total); assert.equal(ev.stars, 3);
  const bad = { ...good, age: ['a1824', 'a55'], gender: 'male', location: ['other'], interests: ['gaming'], objective: 'awareness',
    creative: { format: 'image', headline: 'MUA NGAY!!! 100% TRẮNG DA', primary: 'Kem tốt', cta: 'learn_more' } };
  const eb = V.evaluate(bad, run(bad), ctx, 'challenge', []);
  assert.ok(eb.total < 40 && eb.stars === 0, 'xấu phải < 40, được ' + eb.total);
  assert.equal(ev.parts.reduce((s, p) => s + p.max, 0), 100);
});
test('chấm điểm: lần đầu chưa có điểm quy trình; điểm không chỉ phụ thuộc click đúng (cùng nội dung, sai mục tiêu → thấp hơn)', () => {
  const first = V.evaluate(good, run(good), ctx, 'challenge', []);
  assert.ok(first.parts.find((p) => p.key === 'process').got <= 2);
  const wrongObj = { ...good, objective: 'traffic', creative: { ...good.creative, cta: 'learn_more' } };
  assert.ok(V.evaluate(wrongObj, run(wrongObj), ctx, 'challenge', []).total < first.total);
});
test('phản hồi: cấu hình xấu có giải thích và khuyến nghị cụ thể', () => {
  const bad = { ...good, interests: [], age: ['a55'], creative: { ...good.creative, headline: 'x', primary: 'y', cta: 'sign_up' } };
  const ev = V.evaluate(bad, run(bad), ctx, 'practice', []);
  assert.ok(ev.decisions.some((d) => d.tone === 'bad' || d.tone === 'warn'));
  assert.ok(ev.recommendations.length >= 2); assert.ok(ev.interpretation.length >= 3);
});
test('thí nghiệm: mỗi thí nghiệm cho cấu hình hợp lệ và kết quả khác phiên bản gốc', () => {
  const base = run(good);
  for (const e of V.experiments(good, ctx)) {
    const c = e.apply(JSON.parse(JSON.stringify(good)));
    assert.ok(S.validate(c, ctx).ok, e.id);
    assert.notDeepEqual(run(c).totals, base.totals, e.id);
  }
});
