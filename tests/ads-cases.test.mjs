/* Case xuyên suốt và capstone của khoá Quảng cáo đa nền tảng.
   Số liệu là giả định nhưng phải TỰ KHỚP: test tính lại mọi chỉ số độc lập, kiểm đáp án mẫu đạt tối đa,
   phương án ngây thơ không đạt, mỗi lựa chọn có lời giải, đáp án không lộ theo vị trí/độ dài. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { loadContent, rel } from './helpers.mjs';

const ctx = vm.createContext({});
for (const f of ['assets/js/data/ads-cases.js', 'assets/js/ads/case-eval.js', 'assets/js/ads/plan-eval.js']) vm.runInContext(fs.readFileSync(rel(f), 'utf8'), ctx, { filename: f });
const CASES = vm.runInContext('ADS_CASES', ctx), E = vm.runInContext('AdsCaseEval', ctx), P = vm.runInContext('AdsPlanEval', ctx);
const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} ≠ ${b}`);

test('ít nhất 3 case: một TMĐT, một lead dịch vụ, một B2B; brand ghi rõ giả định', () => {
  assert.ok(CASES.length >= 3);
  for (const k of ['TMĐT', 'Lead dịch vụ', 'B2B']) assert.ok(CASES.some((c) => c.kind === k), `thiếu case ${k}`);
  for (const c of CASES) assert.match(c.brand, /giả định/, `${c.id}: brand phải ghi "giả định"`);
  assert.equal(new Set(CASES.map((c) => c.id)).size, CASES.length);
});

test('case TMĐT: dashboard tự khớp — CPA, ROAS, AOV, MER tính lại đúng; nền tảng báo nhiều hơn sổ ở web', () => {
  const c = CASES.find((x) => x.id === 'bep-nha-la');
  for (const r of c.dash.rows) {
    assert.ok(r.clicks <= r.impr && r.conv <= r.clicks, `${r.id}: phễu ngược`);
    near(r.rev / r.conv, c.econ.aov, 1, `${r.id}: AOV`);
    const m = E.metrics(r);
    near(m.cpa, r.spend / r.conv, 1e-6, `${r.id}: CPA`); near(m.roas, r.rev / r.spend, 1e-9, `${r.id}: ROAS`);
  }
  for (const [n, o, rev] of c.dash.backend.rows) near(rev / o, c.econ.aov, 1, `sổ ${n}: AOV`);
  const spend = c.dash.rows.reduce((s, r) => s + r.spend, 0), back = c.dash.backend.rows.reduce((s, r) => s + r[2], 0);
  near(E.mer(c), back / spend, 1e-9, 'MER');
  const d1 = c.dash.qs.find((q) => q.id === 'd1'); near(d1.ans, back / spend, d1.tol, 'đáp án MER');
  const d2 = c.dash.qs.find((q) => q.id === 'd2'); near(d2.ans, 1 / c.econ.margin.web, d2.tol, 'ROAS hoà vốn web');
  const webClaimed = c.dash.rows.filter((r) => ['meta', 'google'].includes(r.id)).reduce((s, r) => s + r.conv, 0);
  assert.ok(webClaimed > c.dash.backend.rows[0][1], 'case dạy ghi nhận chồng: nền tảng phải báo nhiều hơn sổ web');
  /* chẩn đoán: CPA tuần 3 khớp CPM ÷ (1000 × CTR × CVR) với số trong bảng */
  const cpa3 = 6200 / (1000 * 0.0067 * (45 / 11200));
  assert.ok(cpa3 > 225000 && cpa3 < 235000, `CPA tuần 3 ${cpa3}`);
});

test('case lead và B2B: phễu không ngược, đáp án số tính lại đúng', () => {
  const b = CASES.find((x) => x.id === 'noi-that-an-cu');
  for (const r of b.dash.rows) assert.ok(r.leads >= r.qual && r.qual >= r.survey && r.survey >= r.won, `${r.id}: phễu ngược`);
  const meta = b.dash.rows.find((r) => r.id === 'meta');
  near(b.dash.qs.find((q) => q.id === 'd1').ans, meta.spend / meta.qual / 1000, 0.5, 'chi phí/lead đạt chuẩn Meta');
  const sp = b.dash.rows.reduce((s, r) => s + r.spend, 0), won = b.dash.rows.reduce((s, r) => s + r.won, 0);
  near(b.dash.qs.find((q) => q.id === 'd2').ans, sp / won / 1e6, 0.01, 'chi phí mỗi hợp đồng');
  const f = b.econ.funnel; near(b.econ.maxPerContract * f.qual * f.survey * f.win, 675000, 1, 'trần mỗi lead trong lời giải');
  assert.ok(sp / won <= b.econ.maxPerContract);

  const c = CASES.find((x) => x.id === 'kho-viet');
  for (const r of c.dash.rows) assert.ok(r.leads >= r.mql && r.mql >= r.sql && r.sql >= r.opp && r.opp >= r.won + r.open, `${r.id}: phễu ngược`);
  const li = c.dash.rows.find((r) => r.id === 'linkedin');
  near(c.dash.qs.find((q) => q.id === 'd1').ans, li.spend / li.sql / 1e6, 0.01, 'chi phí mỗi SQL LinkedIn');
  near(c.dash.qs.find((q) => q.id === 'd2').ans, (li.spend / li.won) / (c.econ.acv * c.econ.gross / 12), 0.06, 'tháng hoàn vốn');
  /* tổng chi quý khớp ngân sách mẫu của các kênh đã chạy */
  for (const r of c.dash.rows) near(r.spend, c.budget.model[r.id] * 3e6, 1, `${r.id}: chi quý = 3 × ngân sách mẫu`);
});

test('ngân sách mẫu: cộng đúng tổng, nằm trong khoảng hợp lý, kênh "không hợp" nhận 0, đủ sàn học', () => {
  for (const c of CASES) {
    const B = c.budget, sum = B.rows.reduce((s, r) => s + B.model[r.id], 0);
    assert.equal(sum, B.total, `${c.id}: tổng mẫu`);
    for (const r of B.rows) assert.ok(B.model[r.id] >= r.min && B.model[r.id] <= r.max, `${c.id}/${r.id} ngoài khoảng`);
    for (const o of c.channels.opts.filter((x) => x.v === 'no')) assert.equal(B.model[o.id], 0, `${c.id}/${o.id} không hợp mà có tiền`);
    assert.deepEqual(new Set(B.rows.map((r) => r.id)), new Set(c.channels.opts.map((o) => o.id)), `${c.id}: bảng ngân sách khớp danh sách kênh`);
    assert.equal(E.budget(c, B.model).issues.length, 0, `${c.id}: mẫu bị bắt lỗi`);
  }
  const a = CASES[0], thin = { ...a.budget.model, meta: 20, shopee: 50 };
  assert.ok(E.budget(a, thin).issues.some((i) => i.kind === 'learn'), 'Meta 20 triệu phải bị cảnh báo thiếu sự kiện học');
});

test('chấm: đáp án mẫu 100/100; chọn ngây thơ không đạt và được chỉ bài học lại có thật', () => {
  const { get } = loadContent(), idx = new Set(get('BAI_INDEX').map((r) => r.id));
  for (const c of CASES) {
    const g = E.grade(c, E.model(c));
    assert.equal(g.total, 100, `${c.id}: mẫu ${g.total}`); assert.equal(g.pass, true);
    const wrongPick = (opts) => opts.findIndex((o) => !o[1]);
    const naive = { channels: c.channels.opts.filter((o) => o.v !== 'core').slice(0, 3).map((o) => o.id),
      budget: Object.fromEntries(c.budget.rows.map((r) => [r.id, c.budget.total / c.budget.rows.length])),
      dash: Object.fromEntries(c.dash.qs.map((q) => [q.id, q.kind === 'num' ? q.wrong[0][0] : wrongPick(q.opts)])),
      opened: [], diag: wrongPick(c.diag.opts), act: wrongPick(c.act.opts) };
    const n = E.grade(c, naive);
    assert.equal(n.pass, false, `${c.id}: ngây thơ mà đạt (${n.total})`);
    assert.ok(n.review.length >= 4);
    for (const k of n.review) assert.ok(idx.has(k), `${c.id}: bài học lại ${k} không có`);
  }
});

test('mọi lựa chọn có lời giải; đúng một đáp án tốt nhất; mọi kênh có lý do và bài liên quan', () => {
  const { get } = loadContent(), idx = new Set(get('BAI_INDEX').map((r) => r.id));
  for (const c of CASES) {
    const groups = [...c.dash.qs.filter((q) => q.kind === 'pick').map((q) => [q.id, q.opts, q.why, q.lesson]), ['diag', c.diag.opts, c.diag.why, c.diag.lesson], ['act', c.act.opts, c.act.why, c.act.lesson]];
    for (const [id, opts, why, lesson] of groups) {
      assert.equal(opts.filter((o) => o[1]).length, 1, `${c.id}/${id}: cần đúng 1 đáp án`);
      opts.forEach((_, i) => assert.ok(why[i] && why[i].length > 30, `${c.id}/${id}: thiếu lời giải phương án ${i}`));
      assert.ok(idx.has(lesson), `${c.id}/${id}: bài ${lesson} không có`);
    }
    for (const o of c.channels.opts) { assert.ok(['core', 'ok', 'no'].includes(o.v)); assert.ok(o.why.length > 30); assert.ok(idx.has(o.lesson), `${c.id}/${o.id}: ${o.lesson}`); }
    assert.ok(c.channels.opts.filter((o) => o.v === 'core').length >= c.channels.min - 0 && c.channels.opts.some((o) => o.v === 'no'));
    for (const q of c.dash.qs) assert.ok(idx.has(q.lesson), `${c.id}/${q.id}: ${q.lesson}`);
    assert.ok(idx.has(c.budget.lesson) && idx.has(c.creative.lesson));
    assert.ok(c.diag.checks.some((k) => k.key) && c.diag.checks.some((k) => !k.key), `${c.id}: chẩn đoán cần cả bảng then chốt lẫn bảng nhiễu`);
    assert.equal(Object.keys(c.creative.model).length, 7);
  }
});

test('chống lộ đáp án: vị trí hiển thị rải đều, đáp án đúng không thường là phương án dài nhất', () => {
  const pos = [0, 0, 0, 0]; let longest = 0, n = 0;
  for (const c of CASES) {
    const qs = [...c.dash.qs.filter((q) => q.kind === 'pick').map((q) => [q.id, q.opts]), ['diag', c.diag.opts], ['act', c.act.opts]];
    for (const [id, opts] of qs) {
      const ord = E.order(c.id + ':' + id, opts.length);
      assert.deepEqual([...ord].sort(), [0, 1, 2, 3], 'hoán vị phải đủ 4 phương án');
      pos[ord.findIndex((i) => opts[i][1])]++; n++;
      const len = opts.map((o) => o[0].length), r = len[opts.findIndex((o) => o[1])];
      if (r >= Math.max(...len)) longest++;
      assert.ok(Math.max(...len) / Math.min(...len) <= 2.2, `${c.id}/${id}: độ dài phương án chênh quá xa`);
    }
  }
  assert.ok(Math.max(...pos) / n <= 0.45, `vị trí đáp án dồn: ${pos}`);
  assert.ok(longest / n <= 0.55, `đáp án đúng dài nhất ở ${longest}/${n}`);
});

test('capstone: kế hoạch mẫu không có lỗi "cần sửa"; bắt được tổng lệch, CPA vượt trần, thiếu đo, thiếu quy tắc dừng', () => {
  const ok = P.check(P.sample());
  assert.equal(P.summary(ok).bad, 0, ok.filter((x) => x.lv === 'bad').map((x) => x.msg).join(' | '));
  const bad = P.sample();
  bad.channels[0].budget = 60;                       // tổng 135 ≠ 120
  bad.channels[1].cpa = 400000;                      // trần 450.000 × 37% = 166.500đ
  bad.channels[2].track = false; bad.channels[3].stop = '';
  bad.test = 'thử';
  const r = P.check(bad), has = (k) => r.some((x) => x.lv === 'bad' && x.k.startsWith(k));
  for (const k of ['sum', 'cpa:', 'track:', 'stop:', 'test']) assert.ok(has(k), `không bắt được ${k}`);
  near(P.cpaMax(P.sample()), 166500, 1, 'CPA trần');
  const tiny = P.sample(); tiny.channels = [{ name: 'Meta', role: 'x', budget: 3, kpi: 'CPA', cpa: 150000, stop: 'dừng khi CPA vượt mục tiêu', track: true }]; tiny.budget = 3;
  assert.ok(P.check(tiny).some((x) => x.k === 'learn:Meta' && x.lv === 'bad'), '3 triệu/tháng phải bị báo quá ít kết quả');
  assert.match(P.text(P.sample(), ok), /MEDIA PLAN/);
});
