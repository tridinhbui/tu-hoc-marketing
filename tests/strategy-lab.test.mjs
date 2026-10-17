import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { rel } from './helpers.mjs';
const require = createRequire(import.meta.url);
globalThis.LabEngine = require(rel('assets/js/lab/engine.js'));
const D = require(rel('assets/js/lab/strategy-data.js'));
globalThis.LAB_STRATEGY = D;
const SE = require(rel('assets/js/lab/strategy-eval.js'));

/* ---- hai hướng đi khác hẳn nhau cho mỗi brief: cả hai phải đạt; kế hoạch tự mâu thuẫn phải rớt ---- */
const mk = (o) => ({ opened: [], give: '', why: '', headline: '', alloc: {}, kpis: { picked: [], targets: {} }, exp: {}, read: {}, ...o });
const H = (c, e, b) => ({ change: c, effect: e, because: b });
const PLANS = {
  nangmaiA: mk({ scenario: 'nangmai', opened: ['r1', 'r2', 'r3', 'r8'], segment: 's1', position: 'p1', give: 'bỏ cuộc đua SPF cao và nhóm ngoài trời',
    why: 'Khảo sát r1 và xu hướng r3 cho thấy bết dính là lý do bỏ', message: 'm1', headline: 'Chống nắng mà quên là đang bôi',
    alloc: { tiktok: 40, google: 15, seo: 15, sample: 15, reserve: 15 },
    kpis: { picked: ['k_orders', 'k_cac', 'k_cvr', 'k_return', 'k_cacmax'], targets: { cac: 130000, orders: 150 } },
    exp: { hypothesis: H('tiêu đề nhấn cảm giác nhẹ', 'tỉ lệ nhấp tăng', 'khảo sát cho thấy bết là rào cản'), variable: 'message', metric: 'ctr', mde: 30, weeks: 6, scaleIf: 20, stopIf: 5 },
    read: { decision: 'iterate', why: 'Tỉ lệ nhấp tăng rõ và khoảng tin cậy không chứa 0, nhưng CTR chỉ là chỉ số thay thế nên tôi sẽ đổi biến sang ưu đãi và theo dõi tỉ lệ hoàn hàng ở bước tiếp theo.' } }),
  nangmaiB: mk({ scenario: 'nangmai', opened: ['r1', 'r2', 'r4', 'r5'], segment: 's2', position: 'p2', give: 'chấp nhận biên mỏng và đơn nhỏ',
    why: 'r4 và r2 cho thấy giá và lời bạn bè quyết định, r5 cho thấy đối thủ đều nói SPF', message: 'm3', headline: 'Chỉ 190.000 ₫ cho cả tháng',
    alloc: { tiktok: 45, shopee: 25, seo: 0, reserve: 15, meta: 0, google: 0, sample: 0, zalo: 0 },
    kpis: { picked: ['k_orders', 'k_cac', 'k_return', 'k_cacmax'], targets: { cac: 110000, orders: 180 } },
    exp: { hypothesis: H('ưu đãi miễn phí giao hàng', 'tỉ lệ nhấp tăng', 'sinh viên nhạy về tổng chi phí'), variable: 'offer', metric: 'ctr', mde: 30, weeks: 6, scaleIf: 20, stopIf: 5 },
    read: { decision: 'extend', why: 'Mức tăng của nhánh B chưa chắc vì khoảng tin cậy rộng; tôi sẽ kéo dài thêm vài tuần và theo dõi tỉ lệ hoàn hàng ở bước tiếp theo.' } }),
  lopchieuA: mk({ scenario: 'lopchieu', opened: ['r1', 'r2', 'r3', 'r8'], segment: 's1', position: 'p1', give: 'bỏ nhóm luyện thi chứng chỉ',
    why: 'r2 cho thấy giới thiệu truyền miệng và r3 cho thấy có danh sách học thử chưa được liên hệ lại', message: 'm1', headline: 'Tuần sau, bạn nói được câu đầu tiên trong họp',
    alloc: { zalo: 10, referral: 5, b2b: 15, google: 30, reserve: 15 },
    kpis: { picked: ['k_students', 'k_cac', 'k_trial', 'k_refund'], targets: { cac: 1200000, orders: 35 } },
    exp: { hypothesis: H('tiêu đề nhấn tình huống họp thật', 'tỉ lệ nhấp tăng', 'khảo sát cho thấy họp là nhu cầu lớn nhất'), variable: 'message', metric: 'ctr', mde: 30, weeks: 8, scaleIf: 20, stopIf: 5 },
    read: { decision: 'extend', why: 'Chênh lệch chưa chắc chắn vì mẫu còn nhỏ; tôi sẽ kéo dài và theo dõi tỉ lệ hoàn học phí ở bước tiếp theo.' } }),
  lopchieuB: mk({ scenario: 'lopchieu', opened: ['r1', 'r4', 'r5', 'r8'], segment: 's2', position: 'p2', give: 'chịu rủi ro hoàn phí',
    why: 'r8 cho thấy nhiều người hỏi hoàn tiền, r4 cho thấy nhu cầu phỏng vấn theo mùa, r5 cho thấy đối thủ không nói về phỏng vấn', message: 'm2', headline: '8 tuần phỏng vấn tiếng Anh, không đạt thì hoàn học phí',
    alloc: { google: 55, zalo: 10, referral: 5, reserve: 15 },
    kpis: { picked: ['k_students', 'k_cac', 'k_refund', 'k_cacmax'], targets: { cac: 1300000, orders: 35 } },
    exp: { hypothesis: H('thêm cam kết hoàn phí vào trang đăng ký', 'tỉ lệ nhấp tăng', '31 người hỏi về hoàn tiền khi tư vấn'), variable: 'offer', metric: 'ctr', mde: 30, weeks: 8, scaleIf: 20, stopIf: 5 },
    read: { decision: 'iterate', why: 'Khoảng tin cậy của mức tăng còn rộng nên chưa chắc; tôi sẽ đổi biến sang thông điệp và theo dõi tỉ lệ hoàn học phí ở bước tiếp theo.' } }),
};
const BAD = mk({ scenario: 'nangmai', opened: ['r6', 'r7'], segment: 's3', position: 'p3', give: 'x', why: 'thích', message: 'm6', headline: 'SPF50 bảo vệ tối đa',
  alloc: { zalo: 50, meta: 50 }, kpis: { picked: ['k_likes', 'k_reach', 'k_follow'], targets: { cac: 300000, orders: 1000 } },
  exp: { hypothesis: H('a', 'b', 'c'), variable: 'price', metric: 'cvr', mde: 5, weeks: 1, scaleIf: 5, stopIf: 10 }, read: { decision: 'scale', why: 'tốt' } });

test('dữ liệu: mọi kịch bản có nhãn giả lập, id duy nhất, tham chiếu hợp lệ', () => {
  assert.match(D.label, /GIẢ LẬP/); assert.match(D.disclaimer, /giả lập|đặt ra/);
  for (const sc of Object.values(D.scenarios)) {
    const uniq = (a) => new Set(a).size === a.length;
    for (const k of ['research', 'segments', 'positions', 'messages', 'channels', 'kpis']) assert.ok(uniq(sc[k].map((x) => x.id)), `${sc.id}.${k} trùng id`);
    const segIds = sc.segments.map((s) => s.id), posIds = sc.positions.map((p) => p.id);
    for (const p of sc.positions) { assert.ok(p.segs.every((s) => segIds.includes(s)), `${sc.id}/${p.id} segs`); assert.ok(p.tradeoff && p.risk, `${sc.id}/${p.id} thiếu đánh đổi/rủi ro`); }
    for (const m of sc.messages) assert.ok(m.pos.every((p) => posIds.includes(p)), `${sc.id}/${m.id} pos`);
    for (const c of sc.channels) for (const s of segIds) assert.ok(c.fit[s] >= 0 && c.fit[s] <= 1, `${sc.id}/${c.id} fit ${s}`);
    for (const r of sc.research) { assert.ok(r.rel > 0 && r.rel <= 1 && r.caveat && r.finding && r.tags.length, `${sc.id}/${r.id}`); }
    assert.ok(sc.research.some((r) => r.rel < 0.35), `${sc.id}: cần có nguồn nhiễu để người học phân biệt`);
    assert.ok(sc.research.filter((r) => r.rel >= 0.6).length >= 4, `${sc.id}: cần ≥4 nguồn đáng tin`);
    for (const t of ['north', 'input', 'guardrail', 'vanity']) assert.ok(sc.kpis.some((k) => k.type === t), `${sc.id}: thiếu KPI loại ${t}`);
    assert.ok(sc.paths.length >= 2 && sc.alt);
    assert.ok(sc.channels.some((c) => c.listSize === 0) || sc.channels.some((c) => c.maxOrders), `${sc.id}: cần một kênh có điều kiện/trần`);
  }
});

test('mô hình: kinh tế đơn vị và trần CAC theo nhóm khách', () => {
  const sc = D.scenarios.nangmai;
  assert.equal(SE.ceiling(sc, 's1'), 290000 * 0.6);                               // 174.000
  assert.equal(SE.ceiling(sc, 's2'), 290000 * 0.75 * 0.6);                        // 130.500
  assert.ok(SE.profitPerOrder(sc, 's1', 0.1) < SE.profitPerOrder(sc, 's1', 0));   // phí sàn làm mỏng lãi
  const lc = D.scenarios.lopchieu;
  assert.ok(Math.abs(SE.ceiling(lc, 's1') - 2900000 * 0.55 * 0.92) < 1);         // có trừ hoàn học phí
});

test('mô hình: kênh cần danh sách mà chưa có danh sách thì không ra đơn; kênh có trần thì bị chặn', () => {
  const m = SE.model(mk({ scenario: 'nangmai', segment: 's1', alloc: { zalo: 60, reserve: 40 } }));
  assert.equal(m.orders, 0); assert.equal(m.cac, null);
  const lc = SE.model(mk({ scenario: 'lopchieu', segment: 's1', alloc: { referral: 100 } }));
  assert.ok(lc.orders <= 8 + 1e-9, 'giới thiệu có trần 8 học viên');
});

test('mô hình: dưới mức chi tối thiểu kém hiệu quả hơn; vượt trần kênh giảm hiệu quả biên', () => {
  const sc = D.scenarios.nangmai, ch = sc.channels.find((c) => c.id === 'meta');
  const a = SE.model(mk({ scenario: 'nangmai', segment: 's1', alloc: { meta: 5 } })).rows[0];     // 1,5 tr < min 3 tr
  const b = SE.model(mk({ scenario: 'nangmai', segment: 's1', alloc: { meta: 10 } })).rows[0];    // 3 tr = min
  assert.ok(a.under && !b.under && a.cac > b.cac);
  const big = SE.model(mk({ scenario: 'nangmai', segment: 's1', alloc: { meta: 100 } })).rows[0];
  assert.ok(big.over && big.cac > b.cac);
  assert.ok(ch.cap < sc.budget);
});

test('chấm: HAI hướng khác hẳn nhau ở mỗi brief đều đạt ngưỡng; kế hoạch tự mâu thuẫn rớt xa', () => {
  for (const [k, p] of Object.entries(PLANS)) {
    const r = SE.run(p);
    assert.ok(r.total >= D.passScore, `${k}: ${r.total} < ${D.passScore} — ${JSON.stringify(r.plan.parts)}`);
    assert.ok(r.total <= 100);
  }
  assert.notEqual(PLANS.nangmaiA.segment, PLANS.nangmaiB.segment); assert.notEqual(PLANS.nangmaiA.position, PLANS.nangmaiB.position);
  assert.notEqual(PLANS.lopchieuA.segment, PLANS.lopchieuB.segment);
  const bad = SE.run(BAD);
  assert.ok(bad.total < 45, `kế hoạch tệ lại được ${bad.total}`);
  assert.equal(bad.pass, false);
});

test('chấm: từng lỗi lập luận bị bắt đúng chỗ', () => {
  const A = PLANS.nangmaiA, sc = D.scenarios.nangmai;
  const score = (p, key) => SE.run(p).plan.parts.find((x) => x.key === key).got;
  const base = (key) => score(A, key);
  // định vị không khớp nhóm khách
  assert.ok(score({ ...A, segment: 's3' }, 'strategy') < base('strategy'));
  // định vị cần bằng chứng mà không có (chống nước)
  assert.ok(score({ ...A, position: 'p3', segment: 's3' }, 'strategy') < base('strategy'));
  // chỉ mở nguồn nhiễu
  assert.ok(score({ ...A, opened: ['r6', 'r7'] }, 'evidence') < base('evidence') - 6);
  // KPI toàn phù phiếm
  assert.ok(score({ ...A, kpis: { ...A.kpis, picked: ['k_likes', 'k_reach'] } }, 'kpi') < base('kpi') - 6);
  // thiếu chỉ số bảo vệ
  assert.ok(score({ ...A, kpis: { ...A.kpis, picked: ['k_orders', 'k_cac'] } }, 'kpi') < base('kpi'));
  // mục tiêu CAC vượt trần hoà vốn
  assert.ok(score({ ...A, kpis: { ...A.kpis, targets: { cac: 250000, orders: 150 } } }, 'kpi') < base('kpi'));
  // rải 6 kênh: mỗi kênh dưới mức tối thiểu
  assert.ok(score({ ...A, alloc: { meta: 12, tiktok: 12, google: 12, shopee: 12, seo: 12, sample: 12, reserve: 28 } }, 'budget') < base('budget'));
  // không giữ dự phòng
  assert.ok(score({ ...A, alloc: { tiktok: 45, google: 20, seo: 20, sample: 15, reserve: 0 } }, 'budget') < base('budget') + 1);
  // thí nghiệm thiếu mẫu
  assert.ok(score({ ...A, exp: { ...A.exp, metric: 'cvr', mde: 10, weeks: 2 } }, 'experiment') < base('experiment'));
  // ngưỡng dừng không thấp hơn ngưỡng mở rộng
  assert.ok(score({ ...A, exp: { ...A.exp, scaleIf: 10, stopIf: 20 } }, 'experiment') < base('experiment'));
  assert.ok(sc);
});

test('missing: không cho sang bước sau khi thiếu dữ liệu bắt buộc, và tổng phân bổ phải đúng 100%', () => {
  const m = SE.missing(mk({ scenario: 'nangmai', alloc: { tiktok: 50 } }));
  assert.ok(m.research.length && m.strategy.length && m.message.length && m.kpi.length && m.experiment.length);
  assert.match(m.budget[0], /50%/);
  const ok = SE.missing(PLANS.nangmaiA);
  for (const k of Object.keys(ok)) assert.deepEqual(ok[k], [], k);
});

test('cỡ mẫu: tăng khi muốn thấy thay đổi nhỏ hơn; xác định; ~đúng công thức hai tỉ lệ', () => {
  assert.ok(SE.sampleSize(0.024, 0.1) > SE.sampleSize(0.024, 0.3));
  assert.ok(SE.sampleSize(0.024, 0.3) > SE.sampleSize(0.024, 0.6));
  assert.equal(SE.sampleSize(0.024, 0.2), SE.sampleSize(0.024, 0.2));
  const n = SE.sampleSize(0.1, 0.5);                 // 10% → 15%: khoảng 680 mỗi nhánh theo công thức chuẩn
  assert.ok(n > 600 && n < 760, String(n));
  assert.equal(SE.sampleSize(0.1, 0), Infinity);
});

test('thí nghiệm giả lập: xác định, đúng cỡ mẫu, kết quả tốt với mẫu lớn, nhiễu với mẫu nhỏ', () => {
  const A = PLANS.nangmaiA;
  const r1 = SE.simulateExperiment(A), r2 = SE.simulateExperiment(A);
  assert.deepEqual(r1, r2);
  assert.ok(r1.n > 0 && r1.xa >= 0 && r1.xb >= 0 && r1.lo < r1.hi);
  assert.equal(r1.metric, 'ctr');
  const tiny = SE.simulateExperiment({ ...A, exp: { ...A.exp, metric: 'cvr', weeks: 1 } });
  assert.ok(tiny.n < 400); assert.equal(tiny.sig, false, 'mẫu nhỏ không được "vượt nhiễu"');
  const wideTiny = tiny.hi - tiny.lo, wideBig = r1.hi - r1.lo;
  assert.ok(wideTiny > wideBig * 2 || tiny.n === 0);
  // không có lưu lượng web (chỉ kênh ngoài web) → không có thí nghiệm
  const none = SE.simulateExperiment({ ...A, alloc: { sample: 100 } });
  assert.equal(none.n, 0); assert.equal(none.sig, false);
});

test('đọc kết quả: nhảy "mở rộng" trước kết quả chưa vượt nhiễu bị chấm là khó bảo vệ', () => {
  const A = PLANS.nangmaiA;
  const noisy = { ...A, exp: { ...A.exp, metric: 'cvr', weeks: 1 }, read: { decision: 'scale', why: 'Tỉ lệ cao hơn nên mở rộng ngay, sẽ tăng ngân sách.' } };
  const res = SE.simulateExperiment(noisy);
  assert.equal(SE.defensible(res, noisy).includes('scale'), false);
  assert.equal(SE.scoreRead(noisy, res).parts[0].got, 0);
  // đúng hướng + trích số + nói về sai số + bước tiếp
  const good = { ...noisy, read: { decision: 'extend', why: `Nhánh B ${(res.rb * 100).toFixed(2).replace('.', ',')}% so với ${(res.ra * 100).toFixed(2).replace('.', ',')}% nhưng khoảng tin cậy rộng, mẫu chưa đủ nên chưa chắc; sẽ kéo dài và theo dõi tỉ lệ hoàn hàng.` } };
  const s = SE.scoreRead(good, res);
  assert.equal(s.total, 20, JSON.stringify(s.parts));
  // lập luận cụt không được điểm trích số / bước tiếp
  const lazy = SE.scoreRead({ ...good, read: { decision: 'extend', why: 'tốt' } }, res);
  assert.equal(lazy.total, 8);
});

test('đọc kết quả: khi mẫu đủ và khác biệt vượt nhiễu, "dừng" không bảo vệ được; mức giảm thật thì "mở rộng" không bảo vệ được', () => {
  const up = { n: 100000, sig: true, diff: 0.003, relLo: 0.15, relHi: 0.3, rel: 0.2, lo: 0.002, hi: 0.004 };
  assert.ok(!SE.defensible(up, { exp: { scaleIf: 20, stopIf: 5 } }).includes('stop'));
  const down = { n: 100000, sig: true, diff: -0.003, relLo: -0.3, relHi: -0.15, rel: -0.2, lo: -0.004, hi: -0.002 };
  assert.ok(!SE.defensible(down, { exp: {} }).includes('scale'));
  assert.deepEqual(SE.defensible({ n: 0 }, { exp: {} }).sort(), ['extend', 'iterate']);
});

test('báo cáo: tổng = kế hoạch (80) + đọc kết quả (20), không vượt 100', () => {
  for (const p of Object.values(PLANS)) {
    const r = SE.run(p), sum = r.plan.parts.reduce((s, x) => s + x.max, 0);
    assert.equal(sum, 80); assert.equal(r.read.parts.reduce((s, x) => s + x.max, 0), 20);
    assert.equal(r.total, r.planScore + r.read.total);
  }
});
