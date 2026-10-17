import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { rel } from './helpers.mjs';

const ctx = vm.createContext({ console });
for (const f of ['campaigns', 'campaigns-deep']) vm.runInContext(fs.readFileSync(rel(`assets/js/data/${f}.js`), 'utf8'), ctx, { filename: f });
const C = vm.runInContext('CAMPAIGNS', ctx), D = vm.runInContext('CAMPAIGN_DEEP', ctx);
const plain = (x) => JSON.stringify(x);

test('mọi case đều có lớp phân tích sâu và không có khoá mồ côi', () => {
  assert.equal(C.filter((c) => !D[c.id]).map((c) => c.id).join(','), '', 'case thiếu lớp sâu');
  assert.equal(Object.keys(D).filter((k) => !C.find((c) => c.id === k)).join(','), '', 'khoá mồ côi');
  assert.equal(new Set(C.map((c) => c.id)).size, C.length, 'id trùng');
});

test('mỗi case đủ khung Observe → Analyze → Strategize → Create → Measure', () => {
  for (const c of C) {
    const d = D[c.id], id = c.id;
    assert.ok(['success', 'failure', 'mixed'].includes(d.status), `${id}: status`);
    assert.match(d.verified, /^\d{1,2}\/\d{1,2}\/\d{4}$/, `${id}: thiếu ngày đối chiếu nguồn`);
    for (const k of ['objective', 'problem', 'unknown', 'practice', 'measure', 'transfer']) assert.ok(String(d[k] || '').length >= 40, `${id}.${k} quá ngắn`);
    assert.ok(d.consumer.observed.length >= 40 && d.consumer.hypothesis.length >= 40, `${id}: consumer`);
    assert.ok(d.options.length >= 3 && d.options.length <= 4, `${id}: cần 3–4 hướng chiến lược`);
    assert.equal(d.options.filter((o) => o.taken).length, 1, `${id}: đúng một hướng "taken"`);
    for (const o of d.options) assert.ok(o.name && o.bet && o.gain && o.cost, `${id}: option thiếu trường`);
    assert.ok(d.causal.length >= 2, `${id}: cần ≥2 luận điểm nhân quả`);
    for (const x of d.causal) assert.ok(x.claim && x.evidence && x.other && x.other.length >= 25, `${id}: nhân quả phải có "điều khác cũng có thể giải thích"`);
    assert.ok(d.limits.length >= 3, `${id}: cần ≥3 giới hạn/phản biện`);
    assert.ok(d.reflect.length >= 3 && d.reflect.every((q) => /\?$/.test(q) && q.length > 25), `${id}: câu hỏi nhìn lại phải kết thúc bằng dấu hỏi: ${d.reflect.filter((q) => !/\?$/.test(q)).join(' | ')}`, `${id}: câu hỏi nhìn lại`);
    assert.ok(d.sources.length >= 2, `${id}: cần ≥2 nguồn`);
  }
});

test('kết quả đã biết: mỗi mục nêu ai đo, khi nào, nguồn; con số phải có nguồn bấm được hoặc tên nhà xuất bản', () => {
  for (const c of C) {
    const d = D[c.id];
    assert.ok(d.facts.length >= 2, `${c.id}: cần ≥2 dữ kiện`);
    for (const f of d.facts) {
      assert.ok(f.t && f.who && f.date && f.pub, `${c.id}: dữ kiện thiếu who/date/pub: ${String(f.t).slice(0, 50)}`);
      if (f.url) assert.match(f.url, /^https?:\/\/[^\s]+$/, `${c.id}: url`);
    }
    // ít nhất một dữ kiện có đường dẫn mở được
    assert.ok(d.facts.some((f) => f.url), `${c.id}: không có dữ kiện nào có url`);
    for (const s of d.sources) { assert.ok(s.t && s.pub, `${c.id}: nguồn thiếu tên/nhà xuất bản`); if (s.url) assert.match(s.url, /^https?:\/\//); }
  }
});

test('không bịa ROAS/ROI/doanh thu: cấm số ROAS, ROI trong văn bản case; số tiền phải đi kèm đơn vị', () => {
  const all = plain(C) + plain(D);
  assert.ok(!/ROAS[^a-z]{0,6}\d/i.test(all), 'có số ROAS trong case');
  assert.ok(!/\bROI\b[^a-z]{0,6}\d/i.test(all.replace(/ROI hay[^"]*/g, '')), 'có số ROI trong case');
});

test('hồi quy sự kiện đã kiểm: các câu bị fact-check bác không được quay lại', () => {
  const all = plain(C) + plain(D);
  const banned = [
    ['1,5 km', 'IKEA: không nguồn nào ghi 1,5 km'],
    ['Cửa hàng dài 1,5', 'IKEA'],
    ['toàn bộ social là nội dung do người dùng', 'Coca-Cola: quá mức'],
    ['sơn xanh toàn thân', 'Điện Máy Xanh: nguồn ghi "mặc đồ xanh"'],
    ['đặt tên món theo văn hoá mạng', 'Baemin: không có nguồn'],
    ['40 triệu lượt xem tuần đầu', 'Old Spice: không nguồn'],
    ['Son Heung-min', 'Shopee: không nguồn'],
    ['không dựa vào thưởng tiền mà dựa vào lý do xã hội', 'MoMo: sai, có gói quà 500.000đ'],
    ['Triển khai đồng loạt', 'Vinamilk: áp dụng dần'],
    ['13 điểm đánh số', 'Rolls-Royce: chưa xác minh'],
    ['đồng phục là mạng lưới hiển thị', 'Grab: chưa kiểm chứng'],
    ['400.000 cuộc gọi', 'New Coke: không xác minh'],
    ['18,3 tỷ USD', 'Pepsi: số năm 2016 trước quảng cáo — chỉ được nhắc trong "unknown" cảnh báo'],
  ];
  // Old Spice không được nhận 'Titanium Grand Prix' (không nguồn); Dove thì đúng (Cannes 2013)
  const os = plain(D['old-spice-smell-like-a-man']) + plain(C.find((c) => c.id === 'old-spice-smell-like-a-man'));
  assert.ok(!/Titanium/.test(os.replace(/Cũng không có nguồn xác nhận “Titanium Grand Prix”[^"]*/, '')), 'Old Spice: không nguồn cho Titanium');
  for (const [frag, why] of banned) {
    if (frag === '18,3 tỷ USD') { // chỉ được xuất hiện trong phần cảnh báo "unknown"
      const where = Object.entries(D).filter(([, d]) => plain(d).includes(frag)).map(([k]) => k);
      for (const k of where) assert.ok(D[k].unknown.includes(frag), `${k}: ${why}`);
      continue;
    }
    // cho phép xuất hiện khi nằm trong câu phủ định/cảnh báo ("đừng dùng", "không tìm thấy", "không xác minh", "không nguồn")
    const re = new RegExp(frag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    let m; while ((m = re.exec(all))) {
      const ctxStr = all.slice(Math.max(0, m.index - 140), m.index + frag.length + 140);
      assert.ok(/đừng|không tìm thấy|không xác minh|không nguồn|chưa xác minh|không dùng|bị bác|sai|ghi nhầm|không phải/i.test(ctxStr), `${why}: "${frag}" xuất hiện không kèm cảnh báo`);
    }
  }
});

test('cân bằng thư viện: có case Việt Nam và quốc tế, và không chỉ có thành công', () => {
  const fail = C.filter((c) => D[c.id].status !== 'success').length;
  assert.ok(fail / C.length >= 0.5, `chỉ ${fail}/${C.length} case không phải "thành công thuần"`);
  const vn = C.filter((c) => /Việt Nam/.test(c.market)).length;
  assert.ok(vn >= 9 && C.length - vn >= 9, `VN ${vn}, quốc tế ${C.length - vn}`);
  assert.ok(C.filter((c) => D[c.id].status === 'failure').length >= 5);
  assert.equal(C.filter((c) => D[c.id].isNew).length, 6);
});

test('mỗi case có trang tĩnh case/<id>.html (sinh bởi tools_build.mjs)', () => {
  for (const c of C) assert.ok(fs.existsSync(rel(`case/${c.id}.html`)), `thiếu case/${c.id}.html — chạy: node tools_build.mjs`);
});
