/* G2 · CHỌN TỆP — mô hình thuần, không ngẫu nhiên. Mọi số là MINH HOẠ.
   Mỗi vòng: một sản phẩm giả định, 6 nhóm khách. Bạn chọn MỘT nhóm để nhắm tới và MỘT thông điệp nhấn vào một thuộc tính.
   Ngân sách mua được đúng CONTACTS nghìn lượt tiếp cận; nhóm nhỏ hơn thì phần dư bị bỏ phí.
   Phản hồi = độ hợp sản phẩm–nhóm × mức thông điệp chạm đúng điều nhóm đó quan tâm × độ đáng tin (sản phẩm có thật thuộc tính đó).
   Nguyên lý: nhóm đông nhất hiếm khi là nhóm đúng; nói điều khách quan tâm VÀ điều bạn có thật. */
const G2 = {
  CONTACTS: 180,                         // nghìn lượt tiếp cận ngân sách mua được
  MARGIN: 30,                            // nghìn đồng lãi mỗi khách, minh hoạ
  attrs: [{ id: 'health', t: 'Sức khoẻ' }, { id: 'price', t: 'Giá hợp lý' }, { id: 'status', t: 'Hình ảnh / đẳng cấp' }, { id: 'conv', t: 'Tiện lợi' }],
  segments: [
    { id: 'sv',    t: 'Sinh viên',                size: 420, w: { health: .05, price: .55, status: .10, conv: .30 } },
    { id: 'vp',    t: 'Nhân viên văn phòng trẻ',  size: 300, w: { health: .20, price: .15, status: .25, conv: .40 } },
    { id: 'me',    t: 'Mẹ có con nhỏ',            size: 260, w: { health: .55, price: .20, status: .05, conv: .20 } },
    { id: 'huu',   t: 'Người hưu trí',            size: 200, w: { health: .45, price: .35, status: .05, conv: .15 } },
    { id: 'trung', t: 'Trung niên khá giả',       size: 150, w: { health: .35, price: .05, status: .45, conv: .15 } },
    { id: 'gym',   t: 'Người tập thể thao',       size: 90,  w: { health: .60, price: .05, status: .20, conv: .15 } },
  ],
  rounds: [
    { id: 'r1', t: 'Sữa hạt không đường, giá cao', brief: 'Làm từ hạt, không thêm đường, đóng hộp giấy đẹp; giá cao hơn sữa thường 40%.',
      attr: { health: .9, price: .15, status: .55, conv: .5 } },
    { id: 'r2', t: 'Cà phê hoà tan 3 trong 1, giá rẻ', brief: 'Vị quen thuộc, pha trong 10 giây, một gói chỉ vài nghìn đồng.',
      attr: { health: .1, price: .9, status: .15, conv: .85 } },
    { id: 'r3', t: 'Bột protein nhập khẩu', brief: 'Hàm lượng đạm cao, có chứng nhận kiểm nghiệm; giá cao, mua theo hũ lớn.',
      attr: { health: .85, price: .1, status: .6, conv: .35 } },
    { id: 'r4', t: 'Bữa sáng ăn liền cao cấp', brief: 'Mở nắp là ăn, gói gọn trong 2 phút; bao bì đẹp, giá cao vừa phải.',
      attr: { health: .5, price: .3, status: .65, conv: .95 } },
  ],
  /* số khách (nghìn) khi nhắm `seg` với thông điệp `msg` cho sản phẩm `round` */
  customers(round, segId, msg) {
    const s = this.segments.find((x) => x.id === segId), p = round.attr;
    const base = this.attrs.reduce((a, k) => a + s.w[k.id] * p[k.id], 0);              // hợp sản phẩm–nhóm, 0–1
    const resonance = 0.4 + 1.6 * s.w[msg];                                              // thông điệp chạm điều nhóm quan tâm
    const credible = 0.25 + 0.75 * p[msg];                                               // sản phẩm có thật thuộc tính đó
    return Math.min(s.size, this.CONTACTS) * base * resonance * credible * 0.35;
  },
  best(round) {
    let top = { c: -1 };
    for (const s of this.segments) for (const a of this.attrs) { const c = this.customers(round, s.id, a.id); if (c > top.c) top = { c, seg: s.id, msg: a.id }; }
    return top;
  },
  /* điểm cả game 0–1: trung bình (khách của bạn / khách tốt nhất) */
  score(picks) { return picks.length ? picks.reduce((t, p, i) => t + this.customers(this.rounds[i], p.seg, p.msg) / this.best(this.rounds[i]).c, 0) / picks.length : 0; },
  stars(score) { return score >= 0.97 ? 3 : score >= 0.8 ? 2 : score >= 0.55 ? 1 : 0; },
  revenue(c) { return c * this.MARGIN; },     // nghìn khách × nghìn đồng = triệu đồng
};
if (typeof module !== 'undefined') module.exports = G2;
