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

/* ---------------- Google Ads ---------------- */
const GD = require(rel('assets/js/lab/gads-data.js'));
globalThis.LAB_GADS = GD;
const GS = require(rel('assets/js/lab/gads-sim.js'));
const GV = require(rel('assets/js/lab/gads-eval.js'));
const gctx = { seed: C.seed + 7, aov: C.aov, grossMargin: C.grossMargin, leadToSale: C.leadToSale, budget: 5000000 };
const ad = { h: ['Mua kem chống nắng SPF50+', 'Chống nắng không bết dính', 'Giảm 15% đơn đầu tiên', 'Hợp da dầu, nhẹ mặt', ''],
  d: ['Kem chống nắng thấm nhanh, không bết dính. Đã kiểm nghiệm da liễu.', 'Đặt hàng hôm nay, freeship toàn quốc cho đơn từ 250k.'] };
const gbase = { ...GS.emptyConfig(), name: 'g', objective: 'sales', bidStrategy: 'manual', bid: 6000, dailyBudget: 350000, duration: 14, landing: 'product', ad,
  keywords: [{ id: 'k2', match: 'phrase' }, { id: 'k3', match: 'phrase' }, { id: 'k4', match: 'exact' }, { id: 'k11', match: 'exact' }], negatives: ['miễn phí', 'là gì', 'tự làm', 'cho bé'] };
const grun = (c) => GS.simulate(c, gctx);

test('gads: xác định, tổng ngày khớp, chi phí không vượt ngân sách ngày', () => {
  assert.deepEqual(grun(gbase).totals, grun(gbase).totals);
  const r = grun(gbase), t = r.totals;
  assert.equal(r.days.reduce((s, d) => s + d.clicks, 0), t.clicks);
  assert.ok(r.days.every((d) => d.spend <= gbase.dailyBudget + 1));
  assert.ok(Math.abs(t.cpc - t.spend / t.clicks) < 1e-9 && Math.abs(t.roas - t.revenue / t.spend) < 1e-9);
});
test('gads: từ khoá chung khớp rộng không phủ định → lãng phí cao, ROAS thấp', () => {
  const junk = { ...gbase, keywords: ['k14', 'k13', 'k15', 'k1'].map((id) => ({ id, match: 'broad' })), negatives: [], landing: 'home' };
  const a = grun(gbase), b = grun(junk);
  assert.ok(b.diag.wasteShare > 0.3 && a.diag.wasteShare < 0.05);
  assert.ok(b.totals.roas < a.totals.roas * 0.5);
});
test('gads: từ khoá phủ định cắt cụm không mua và giảm lãng phí', () => {
  const wide = { ...gbase, keywords: ['k1', 'k2', 'k3'].map((id) => ({ id, match: 'broad' })) };
  const withN = grun({ ...wide, negatives: ['miễn phí', 'là gì', 'tự làm', 'cho bé'] }), none = grun({ ...wide, negatives: [] });
  assert.ok(none.diag.wasteSpend > withN.diag.wasteSpend);
  assert.ok(none.diag.terms.some((t) => t.q.includes('miễn phí')) && !withN.diag.terms.some((t) => t.q.includes('miễn phí')));
  assert.ok(GS.blocked('kem chống nắng cho bé', ['cho bé']) && !GS.blocked('mua kem chống nắng', ['cho bé']));
});
test('gads: kiểu khớp — chính xác ít lượt hiển thị hơn cụm từ hơn khớp rộng', () => {
  const imp = (m) => grun({ ...gbase, keywords: [{ id: 'k3', match: m }], negatives: [] }).totals.impressions;
  assert.ok(imp('exact') < imp('phrase') && imp('phrase') < imp('broad'));
});
test('gads: giá thầu thấp → thị phần thấp, ít đơn; trang đích kém → CVR thấp; quảng cáo không nhắc từ khoá → QS thấp', () => {
  const a = grun(gbase), low = grun({ ...gbase, bid: 1500 }), home = grun({ ...gbase, landing: 'home' });
  assert.ok(low.diag.impressionShare < a.diag.impressionShare && low.orders < a.orders);
  assert.ok(home.totals.cvr < a.totals.cvr);
  const off = grun({ ...gbase, ad: { h: ['Ưu đãi lớn hôm nay', 'Thương hiệu Việt', 'Giao nhanh toàn quốc', '', ''], d: gbase.ad.d } });
  assert.ok(off.diag.qs < a.diag.qs);
});
test('gads: ngân sách ngày nhỏ so với nhu cầu → bị giới hạn bởi ngân sách', () => {
  const wide = { ...gbase, keywords: ['k1', 'k2', 'k3', 'k4', 'k5'].map((id) => ({ id, match: 'phrase' })) };
  const tight = grun({ ...wide, dailyBudget: 100000 }), loose = grun({ ...wide, dailyBudget: 1000000, duration: 14 });
  assert.ok(tight.diag.lostToBudget > 0.3 && loose.diag.lostToBudget < tight.diag.lostToBudget);
});
test('gads: validate chặn thiếu/vi phạm giới hạn ký tự/vượt hạn mức; cảnh báo phủ định chặn chính từ khoá', () => {
  assert.equal(GS.validate(GS.emptyConfig(), gctx).ok, false);
  assert.equal(GS.validate(gbase, gctx).ok, true);
  assert.equal(GS.validate({ ...gbase, ad: { ...ad, h: ['x'.repeat(31), ...ad.h.slice(1)] } }, gctx).ok, false);
  assert.equal(GS.validate({ ...gbase, dailyBudget: 1000000 }, gctx).ok, false);
  assert.ok(GS.validate({ ...gbase, negatives: ['mua'] }, gctx).warnings.length >= 1);
});
test('gads: chấm điểm theo quyết định; đầu ra GA4 là google / cpc', () => {
  const wide = { ...gbase, keywords: ['k1', 'k2', 'k3', 'k4', 'k5', 'k11'].map((id, i) => ({ id, match: id === 'k11' ? 'exact' : 'phrase' })), dailyBudget: 350000 };
  const good = GV.evaluate(wide, grun(wide), gctx, 'challenge', [{ roas: 1 }, { roas: 2 }]);
  assert.ok(good.total >= 75, 'tốt ≥ 75, được ' + good.total);
  const bad = { ...gbase, keywords: ['k14', 'k13', 'k15'].map((id) => ({ id, match: 'broad' })), negatives: [], landing: 'home', bidStrategy: 'maxclicks',
    ad: { h: ['TRẮNG DA 100%', 'SỐ 1', 'MUA NGAY', '', ''], d: ['Tốt nhất', ''] } };
  const eb = GV.evaluate(bad, grun(bad), gctx, 'challenge', []);
  assert.ok(eb.total < 35 && eb.stars === 0, 'xấu < 35, được ' + eb.total);
  assert.equal(good.parts.reduce((s, p) => s + p.max, 0), 100);
  const f = grun(gbase).feed; assert.equal(f.source, 'google'); assert.equal(f.medium, 'cpc'); assert.ok(f.sessions <= grun(gbase).totals.clicks);
});
test('gads: mỗi thí nghiệm cho cấu hình hợp lệ và kết quả khác phiên bản gốc', () => {
  const base = grun(gbase);
  for (const e of GV.experiments(gbase)) {
    const c = e.apply(JSON.parse(JSON.stringify(gbase)));
    assert.ok(GS.validate(c, gctx).ok, e.id);
    assert.notDeepEqual(grun(c).totals, base.totals, e.id);
  }
});
test('gads: từ khoá có id duy nhất, ý định hợp lệ, phủ định nằm trong danh sách', () => {
  assert.equal(new Set(GD.keywords.map((k) => k.id)).size, GD.keywords.length);
  for (const k of GD.keywords) { assert.ok(GD.intentBase[k.intent], k.id); assert.ok(k.rel >= 0 && k.rel <= 1 && k.comp >= 0 && k.comp <= 1 && k.vol > 0 && k.cpc > 0); }
  for (const l of GD.landings) for (const i of Object.keys(GD.intentBase)) assert.ok(l.q[i] > 0 && l.q[i] <= 1);
});

/* ---------------- GA4 ---------------- */
globalThis.LAB_GADS = GD;
const GA = require(rel('assets/js/lab/ga4-sim.js'));
globalThis.GA4Sim = GA;
const GE = require(rel('assets/js/lab/ga4-eval.js'));
const mcfg = { ...good, dailyBudget: 350000, duration: 14 };
const mres = S.simulate(mcfg, ctx), gres = GS.simulate(gbase, gctx);
const ds = GA.build({ meta: mres.feed, gads: gres.feed }, { aov: C.aov, seed: C.seed });
const all = () => GA.aggregate(ds, 1, ds.days);

test('ga4: kênh trả phí khớp từng số với feed của Meta/Google (không dữ liệu ngẫu nhiên độc lập)', () => {
  const a = all().byCh;
  assert.equal(a.meta.sessions, mres.feed.sessions); assert.equal(a.meta.conversions, mres.feed.conversions);
  assert.equal(a.meta.revenue, mres.feed.revenue); assert.equal(a.meta.cost, mres.feed.cost);
  assert.equal(a.gads.sessions, gres.feed.sessions); assert.equal(a.gads.conversions, gres.feed.conversions); assert.equal(a.gads.cost, gres.feed.cost);
});
test('ga4: bỏ chiến dịch thì kênh đó biến mất; traffic direct tăng theo quảng cáo', () => {
  const none = GA.build({}, { aov: C.aov, seed: C.seed }), withAds = ds;
  const s = (d, ch) => GA.aggregate(d, 1, d.days).byCh[ch].sessions;
  assert.equal(s(none, 'meta'), 0); assert.equal(s(none, 'gads'), 0);
  assert.ok(s(withAds, 'direct') > s(none, 'direct'), 'direct có hào quang từ quảng cáo');
});
test('ga4: phễu không tăng ở mọi kênh và mọi ngày; mua = chuyển đổi', () => {
  for (const r of ds.rows) {
    const e = r.events;
    assert.ok(e.session_start >= e.view_item && e.view_item >= e.add_to_cart && e.add_to_cart >= e.begin_checkout && e.begin_checkout >= e.purchase, `${r.ch} d${r.day}`);
    assert.equal(e.purchase, r.conversions);
  }
});
test('ga4: xác định (cùng đầu vào → cùng dataset) và đổi cấu hình thì đổi dữ liệu', () => {
  const again = GA.build({ meta: mres.feed, gads: gres.feed }, { aov: C.aov, seed: C.seed });
  assert.deepEqual(again.rows, ds.rows);
  const bad = S.simulate({ ...mcfg, interests: ['gaming'], age: ['a1824'] }, ctx);
  const d2 = GA.build({ meta: bad.feed, gads: gres.feed }, { aov: C.aov, seed: C.seed });
  assert.ok(GA.aggregate(d2, 1, d2.days).byCh.meta.conversions < all().byCh.meta.conversions);
});
test('ga4: ba mô hình attribution cộng ra cùng tổng; first-click chuyển công về Meta', () => {
  const at = GA.attribution(ds, 1, ds.days), tot = (o) => Object.values(o).reduce((s, x) => s + x, 0);
  assert.ok(Math.abs(tot(at.last) - tot(at.first)) < 0.05 && Math.abs(tot(at.last) - tot(at.linear)) < 0.05);
  assert.ok(at.first.meta > at.last.meta && at.first.gads < at.last.gads);
  assert.ok(at.reported.meta.conversions >= at.last.meta, 'nền tảng tự báo ≥ GA4 last-click');
});
test('ga4: khoảng ngày và bộ lọc cộng khớp tổng', () => {
  const w1 = GA.aggregate(ds, 1, 7).total, w2 = GA.aggregate(ds, 8, 14).total, a = all().total;
  assert.equal(w1.sessions + w2.sessions, a.sessions); assert.equal(w1.conversions + w2.conversions, a.conversions);
  const paid = GA.aggregate(ds, 1, ds.days, ['meta', 'gads']).total;
  assert.equal(paid.cost, a.cost); assert.equal(GA.aggregate(ds, 1, ds.days, ['organic']).total.cost, 0);
});
test('ga4: trang đích cộng khớp tổng phiên và chuyển đổi', () => {
  const L = GA.landings(ds, 1, ds.days, Object.keys(GA.CHANNELS)), a = all().total;
  assert.ok(Math.abs(L.reduce((s, x) => s + x.sessions, 0) - a.sessions) <= 6);
  assert.ok(Math.abs(L.reduce((s, x) => s + x.conversions, 0) - a.conversions) <= 4);
});
test('ga4: thời gian thực xác định theo phút mô phỏng và dùng số liệu chiến dịch', () => {
  assert.deepEqual(GA.realtime(ds, 840), GA.realtime(ds, 840));
  assert.ok(GA.realtime(ds, 840).users > 0);
});
test('ga4: câu hỏi sinh từ dữ liệu; trả lời đúng hết + key event sạch = 100; sai/đánh dấu bừa thấp hơn', () => {
  const qs = GE.questions(ds); assert.ok(qs.length >= 6);
  for (const q of qs) assert.ok(q.options.some((o) => o.id === q.answer), q.id);
  const correct = Object.fromEntries(qs.map((q) => [q.id, q.answer]));
  assert.equal(GE.evaluate(ds, correct, ['purchase']).total, 100);
  const wrongKey = GE.evaluate(ds, correct, ['purchase', 'page_view', 'scroll']);
  assert.ok(wrongKey.total < 100 && wrongKey.parts.find((p) => p.key === 'setup').got === 5);
  assert.equal(GE.evaluate(ds, correct, []).parts.find((p) => p.key === 'setup').got, 0);
  const wrong = Object.fromEntries(qs.map((q) => [q.id, q.options.find((o) => o.id !== q.answer).id]));
  assert.ok(GE.evaluate(ds, wrong, ['purchase']).total < 20);
});
test('ga4: đáp án câu CPA/ROAS theo đúng dữ liệu của người học (đổi dữ liệu → đổi đáp án có thể)', () => {
  const q = GE.questions(ds).find((x) => x.id === 'r1'), a = all().byCh;
  assert.equal(q.answer, a.meta.cpa < a.gads.cpa ? 'meta' : 'gads');
});

/* ---------------- SEO ---------------- */
const SD = require(rel('assets/js/lab/seo-data.js'));
globalThis.LAB_SEO = SD;
const SS = require(rel('assets/js/lab/seo-sim.js'));
globalThis.SeoSim = SS;
const SV = require(rel('assets/js/lab/seo-eval.js'));
const sctx = { seed: C.seed + 13, aov: C.aov, budget: 11000000, pieces: 8 };
const splan = (arr) => ({ ...SS.emptyPlan(), plan: arr.map(([id, type]) => ({ id, type })) });
const sgood = splan([['s4', 'category'], ['k4', 'compare'], ['s12', 'product'], ['s3', 'blog'], ['s7', 'category'], ['k2', 'product']]);
const srun = (p, c = sctx) => SS.simulate(p, c);

test('seo: dữ liệu hợp lệ — id duy nhất, cụm tồn tại, dùng lại từ khoá của Google Ads với cùng lượt tìm/CPC', () => {
  assert.equal(new Set(SD.keywords.map((k) => k.id)).size, SD.keywords.length);
  const cl = new Set(SD.clusters.map((c) => c.id));
  for (const k of SD.keywords) { assert.ok(cl.has(k.cluster), k.id); assert.ok(SD.cvr[k.intent] > 0 && k.kd >= 0 && k.kd <= 100 && k.rel >= 0 && k.rel <= 1); }
  for (const g of GD.keywords) { const k = SD.keywords.find((x) => x.id === g.id); assert.ok(k, g.id); assert.equal(k.vol, g.vol); assert.equal(k.cpc, g.cpc); assert.equal(k.intent, g.intent); }
});
test('seo: tìm kiếm từ khoá có hạt — cùng seed cùng kết quả, lọc và sắp xếp đúng', () => {
  assert.deepEqual(SS.search('da dầu').map((k) => k.id), SS.search('da dầu').map((k) => k.id));
  assert.ok(SS.search('da dầu').every((k) => /da/.test(k.kw)));
  const sorted = SS.search('', { sort: 'kd' }); assert.ok(sorted.every((k, i) => i === 0 || sorted[i - 1].kd <= k.kd));
  assert.ok(SS.search('', { maxKd: 30 }).every((k) => k.kd <= 30));
  assert.ok(SS.search('', { intent: 'transactional' }).every((k) => k.intent === 'transactional'));
});
test('seo: CTR giảm theo vị trí; từ khoá khó + website mới → vị trí xấu; từ khoá dễ khớp loại → vị trí tốt', () => {
  for (let i = 1; i < 10; i++) assert.ok(SS.ctrAt(i) > SS.ctrAt(i + 1));
  const hard = srun(splan([['k1', 'category']])).diag.pieces[0], easy = srun(splan([['s17', 'faq']])).diag.pieces[0];
  assert.ok(hard.pos > 20 && easy.pos < hard.pos);
});
test('seo: sai loại nội dung làm vị trí và kết quả xấu đi', () => {
  const ok = srun(splan([['k2', 'product'], ['s10', 'product'], ['s11', 'product']])), bad = srun(splan([['k2', 'blog'], ['s10', 'blog'], ['s11', 'blog']]));
  assert.ok(bad.diag.pieces.every((x, i) => x.pos >= ok.diag.pieces[i].pos) && bad.totals.conversions < ok.totals.conversions);
});
test('seo: nhiều bài cùng cụm tăng sức mạnh chủ đề (vị trí tốt hơn so với đứng riêng)', () => {
  const alone = srun(splan([['s4', 'compare']])).diag.pieces[0], withPeers = srun(splan([['s4', 'compare'], ['k4', 'compare'], ['s12', 'compare'].slice(0, 2), ['s20', 'compare']].map((x) => x))).diag.pieces[0];
  assert.ok(withPeers.pos <= alone.pos);
});
test('seo: lưu lượng tăng dần theo thời gian, bài mới chưa có lưu lượng ở tháng đăng; chi phí khớp loại nội dung', () => {
  const r = srun(sgood), v = r.days.map((d) => d.clicks);
  assert.equal(r.days[0].clicks, 0); assert.ok(v[5] > v[2] && v[11] >= v[5]);
  assert.equal(r.totals.spend, sgood.plan.reduce((s, i) => s + SD.types[i.type].cost, 0));
  assert.deepEqual(srun(sgood).totals, r.totals);
});
test('seo: từ khoá thương hiệu đã xếp hạng không tạo thêm lưu lượng và bị phê bình', () => {
  const r = srun(splan([['k11', 'blog']]));
  assert.equal(r.totals.clicks, 0);
  const ev = SV.evaluate(splan([['k11', 'blog']]), r, sctx, 'practice', []);
  assert.ok(ev.decisions.some((d) => /đã xếp hạng 1/.test(d.title)));
});
test('seo: validate chặn vượt số bài/ngân sách/thiếu loại', () => {
  assert.equal(SS.validate(SS.emptyPlan(), sctx).ok, false);
  assert.equal(SS.validate(sgood, sctx).ok, true);
  assert.equal(SS.validate(sgood, { ...sctx, budget: 5000000 }).ok, false);
  assert.equal(SS.validate(sgood, { ...sctx, pieces: 3 }).ok, false);
  assert.equal(SS.validate(splan([['k2', null]]), sctx).ok, false);
});
test('seo: đối thủ — khoảng trống không chứa từ khoá đã có của ta hoặc thương hiệu đối thủ; share of voice cộng ≈ 1', () => {
  const c = SS.competitor('c2'), mine = SS.market().me;
  assert.ok(c.gap.length > 0 && c.gap.every((k) => !mine[k.id] && !k.competitor));
  assert.ok(c.pages.length > 0 && c.traffic > 0);
  const sov = SS.shareOfVoice(); assert.ok(Math.abs(Object.values(sov).reduce((s, x) => s + x, 0) - 1) < 1e-9);
  assert.ok(sov.me < 0.05);
});
test('seo: chấm điểm theo chất lượng quyết định — kế hoạch tốt > rác/sai loại; tổng tối đa 100', () => {
  const evOf = (p) => SV.evaluate(p, srun(p), sctx, 'challenge', []);
  const good = evOf(sgood);
  const junk = evOf(splan([['k14', 'blog'], ['k13', 'blog'], ['k1', 'blog'], ['k9', 'blog'], ['k15', 'blog']]));
  const mism = evOf(splan([['k2', 'blog'], ['s10', 'blog'], ['s11', 'blog'], ['s4', 'blog'], ['s12', 'blog'], ['k4', 'blog']]));
  assert.ok(good.total > mism.total && mism.total > junk.total, `${good.total} > ${mism.total} > ${junk.total}`);
  assert.ok(junk.total < 40 && good.total >= 50);
  assert.equal(good.parts.reduce((s, x) => s + x.max, 0), 100);
  assert.ok(good.decisions.length >= 4 && junk.recommendations.length >= 2);
});
test('seo: phân cụm đúng được thưởng; thí nghiệm cho kế hoạch hợp lệ và kết quả khác', () => {
  const p = { ...sgood, shortlist: sgood.plan.map((i) => i.id), clusters: {} };
  const wrong = SV.evaluate(p, srun(p), sctx, 'practice', []).parts.find((x) => x.key === 'clusters').got;
  for (const id of p.shortlist) p.clusters[id] = SD.keywords.find((k) => k.id === id).cluster;
  const right = SV.evaluate(p, srun(p), sctx, 'practice', []).parts.find((x) => x.key === 'clusters').got;
  assert.ok(right > wrong);
  const base = srun(sgood);
  for (const e of SV.experiments(sgood)) { const c = e.apply(JSON.parse(JSON.stringify(sgood))); assert.ok(SS.validate(c, { ...sctx, budget: 1e9 }).ok, e.id); assert.notDeepEqual(srun(c).totals, base.totals, e.id); }
});
test('seo: bộ điền gợi ý của bài học luôn nằm trong giới hạn từng chế độ', () => {
  const FILL = [['s4', 'category'], ['k4', 'compare'], ['s12', 'product'], ['s3', 'blog'], ['s20', 'compare'], ['s7', 'category'], ['k2', 'product'], ['s11', 'product']];
  for (const m of ['learn', 'practice']) {
    const c = SD.modes[m], p = splan(FILL.slice(0, c.pieces)); assert.ok(SS.validate(p, { ...sctx, budget: c.budget, pieces: c.pieces }).ok, m);
  }
});
