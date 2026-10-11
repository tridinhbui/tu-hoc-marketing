/* G5 · PHỄU RÒ — mô hình thuần, không ngẫu nhiên. Mọi số là MINH HOẠ.
   Phễu 5 tầng. Mỗi vòng bạn có ACTIONS hành động; mỗi hành động chọn MỘT tầng để sửa, kéo tỉ lệ của tầng đó
   lên LIFT (35%) khoảng cách tới mức tốt của ngành. Doanh thu ∝ tích các tỉ lệ nên điều quan trọng là
   tầng còn nhiều chỗ cải thiện nhất, không phải tầng đầu phễu. */
const G5 = {
  ACTIONS: 3, LIFT: 0.35, VISITORS: 100000, REV: 120,         // 100.000 người, 120 nghìn đồng/đơn
  tiers: [{ id: 'aware', t: 'Biết đến → ghé' }, { id: 'interest', t: 'Ghé → quan tâm' }, { id: 'cart', t: 'Quan tâm → bỏ vào giỏ' },
          { id: 'buy', t: 'Giỏ → thanh toán' }, { id: 'repeat', t: 'Mua → mua lại' }],
  rounds: [
    { id: 'f1', t: 'Cửa hàng online', brief: 'Khách vào nhiều nhưng ít người đặt hàng. Giỏ hàng nhiều, thanh toán lại rơi rụng.',
      rate:  { aware: .30, interest: .55, cart: .40, buy: .30, repeat: .20 },
      bench: { aware: .40, interest: .65, cart: .55, buy: .75, repeat: .30 } },
    { id: 'f2', t: 'Ứng dụng đặt đồ ăn', brief: 'Cài nhiều, đặt đơn đầu tiên ổn, nhưng ít người quay lại lần hai.',
      rate:  { aware: .35, interest: .60, cart: .55, buy: .70, repeat: .12 },
      bench: { aware: .45, interest: .70, cart: .65, buy: .80, repeat: .45 } },
    { id: 'f3', t: 'Khoá học trực tuyến', brief: 'Quảng cáo tốt, nhiều người xem trang bán, nhưng ít người xem tới phần giá và đăng ký.',
      rate:  { aware: .38, interest: .20, cart: .35, buy: .60, repeat: .25 },
      bench: { aware: .42, interest: .50, cart: .45, buy: .75, repeat: .35 } },
  ],
  /* tỉ lệ sau khi áp dụng `fixes` (mảng id tầng, có thể lặp lại: sửa lần hai vẫn kéo tiếp 35% khoảng còn lại) */
  rates(round, fixes) {
    const r = { ...round.rate };
    for (const id of fixes) r[id] += this.LIFT * (round.bench[id] - r[id]);
    return r;
  },
  orders(round, fixes) { const r = this.rates(round, fixes); return this.tiers.reduce((n, t) => n * r[t.id], this.VISITORS); },
  best(round) {
    const ids = this.tiers.map((t) => t.id); let top = { o: -1, fixes: [] };
    const go = (left, cur) => { if (!left) { const o = this.orders(round, cur); if (o > top.o) top = { o, fixes: [...cur] }; return; } for (const id of ids) go(left - 1, [...cur, id]); };
    go(this.ACTIONS, []);
    return top;
  },
  /* điểm 0–1: phần đơn tăng thêm so với phần tăng thêm tối đa, trung bình các vòng */
  score(plays) {
    if (!plays.length) return 0;
    return plays.reduce((t, fixes, i) => { const r = this.rounds[i], base = this.orders(r, []), b = this.best(r).o - base;
      return t + (b > 0 ? (this.orders(r, fixes) - base) / b : 1); }, 0) / plays.length;
  },
  stars(score) { return score >= 0.99 ? 3 : score >= 0.85 ? 2 : score >= 0.6 ? 1 : 0; },
};
if (typeof module !== 'undefined') module.exports = G5;
