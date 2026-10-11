/* G8 · LỊCH NỘI DUNG 30 NGÀY — bộ kiểm luật thuần, không ngẫu nhiên. Mọi số là MINH HOẠ.
   Bạn xếp 30 ô ngày: mỗi ô là nghỉ hoặc một trụ cột nội dung. Bộ kiểm không đoán kết quả nền tảng;
   nó kiểm xem lịch có phục vụ mục tiêu, vừa sức sản xuất và có nhịp hợp lý hay không. */
const G8 = {
  DAYS: 30,
  briefs: [
    { id: 'c1', t: 'Tiệm bánh · tăng đơn bánh sinh nhật',
      goal: 'Tăng 30 đơn bánh sinh nhật trong 30 ngày. Khách thường chốt đơn ở tuần cuối.',
      capacity: 20, minPosts: 12, keyFrom: 22, keySell: 3,
      pillars: [{ id: 'aware', t: 'Được biết', hint: 'Chuyện bánh sinh nhật, mẹo chọn bánh', target: 40 },
                { id: 'proof', t: 'Được tin', hint: 'Khách thật, quy trình làm bánh', target: 30 },
                { id: 'sell',  t: 'Được mua', hint: 'Mẫu, giá, cách đặt, hạn nhận đơn', target: 30 }] },
    { id: 'c2', t: 'Ứng dụng học tiếng Anh · tăng đăng ký dùng thử',
      goal: 'Tăng đăng ký dùng thử 7 ngày. Đợt ưu đãi bắt đầu ngày 15 và kéo dài hai tuần.',
      capacity: 24, minPosts: 15, keyFrom: 15, keySell: 4,
      pillars: [{ id: 'aware', t: 'Được biết', hint: 'Mẹo học, lỗi hay gặp', target: 40 },
                { id: 'proof', t: 'Được tin', hint: 'Học viên thật, trước – sau', target: 30 },
                { id: 'sell',  t: 'Được mua', hint: 'Ưu đãi, cách dùng thử', target: 30 }] },
  ],
  /* cal = mảng 30 phần tử: null (nghỉ) hoặc id trụ cột */
  count(cal) { const c = { total: 0 }; for (const x of cal) if (x) { c[x] = (c[x] || 0) + 1; c.total++; } return c; },
  check(brief, cal) {
    const c = this.count(cal), rules = [];
    const add = (id, t, ok, detail) => rules.push({ id, t, ok, detail });
    add('cap', 'Vừa sức sản xuất', c.total <= brief.capacity, `${c.total} bài, tối đa ${brief.capacity}`);
    add('min', 'Đủ nhịp hiện diện', c.total >= brief.minPosts, `${c.total} bài, tối thiểu ${brief.minPosts}`);
    const mixOk = c.total > 0 && brief.pillars.every((p) => Math.abs((c[p.id] || 0) / c.total * 100 - p.target) <= 12);
    add('mix', 'Tỉ lệ trụ cột sát mục tiêu', mixOk, brief.pillars.map((p) => `${p.t} ${c.total ? Math.round((c[p.id] || 0) / c.total * 100) : 0}% (mục tiêu ${p.target}%)`).join(' · '));
    let run = 0, maxRun = 0, last = null;
    cal.forEach((x) => { if (x && x === last) run++; else run = x ? 1 : 0; last = x || last; if (!x) { run = 0; last = null; } maxRun = Math.max(maxRun, run); });
    add('run', 'Không lặp một trụ cột quá 3 bài liên tiếp', maxRun <= 3, `chuỗi dài nhất: ${maxRun} bài`);
    const sellEnd = cal.slice(brief.keyFrom - 1).filter((x) => x === 'sell').length;
    add('key', `Có bài bán trong giai đoạn chốt (từ ngày ${brief.keyFrom})`, sellEnd >= brief.keySell, `${sellEnd} bài bán, cần ≥ ${brief.keySell}`);
    const firstPosts = cal.filter(Boolean).slice(0, 3);
    add('open', 'Không mở đầu bằng bán hàng', !firstPosts.includes('sell'), firstPosts.length ? `3 bài đầu: ${firstPosts.map((x) => (brief.pillars.find((p) => p.id === x) || {}).t).join(', ')}` : 'chưa có bài');
    const rest = cal.filter((x) => !x).length;
    add('rest', 'Có ngày nghỉ để dồn sức làm bài tốt', rest >= 6, `${rest} ngày nghỉ, cần ≥ 6`);
    return { rules, passed: rules.filter((r) => r.ok).length, total: rules.length, counts: c };
  },
  score(plays) { return plays.length ? plays.reduce((s, cal, i) => { const r = this.check(this.briefs[i], cal); return s + r.passed / r.total; }, 0) / plays.length : 0; },
  stars(s) { return s >= 0.99 ? 3 : s >= 0.8 ? 2 : s >= 0.6 ? 1 : 0; },
  /* một lịch mẫu đạt mọi luật — dùng để kiểm game thắng được */
  example(brief) {
    const total = Math.min(brief.capacity, 20), sell = Math.round(total * 0.3), proof = Math.round(total * 0.3), aware = total - sell - proof;
    const A = new Array(aware).fill('aware'), P = new Array(proof).fill('proof'), S = new Array(sell).fill('sell');
    const early = [], late = [];
    /* trước giai đoạn chốt: xen biết/tin; trong giai đoạn chốt: xen bán với phần biết/tin còn lại */
    const earlyCount = Math.max(0, total - sell - Math.ceil(proof / 2));
    while (early.length < earlyCount && (A.length || P.length)) { if (A.length) early.push(A.shift()); if (early.length < earlyCount && P.length) early.push(P.shift()); }
    const mixLate = [...A, ...P];
    while (S.length || mixLate.length) { if (S.length) late.push(S.shift()); if (mixLate.length) late.push(mixLate.shift()); }
    const days = new Array(this.DAYS).fill(null), spread = (arr, from, to) => {
      const n = to - from; arr.forEach((x, i) => { days[from + Math.floor(i * n / Math.max(1, arr.length))] = x; }); };
    spread(early, 0, brief.keyFrom - 1); spread(late, brief.keyFrom - 1, this.DAYS);
    return days;
  },
};
if (typeof module !== 'undefined') module.exports = G8;
