/* G4 · CHIA NGÂN SÁCH MEDIA — mô hình thuần, không ngẫu nhiên. Mọi số là MINH HOẠ.
   Mỗi quý có một ngân sách cố định và một "bối cảnh mùa vụ" làm đổi hiệu quả từng kênh.
   Nguyên lý dạy: (1) tiền vào một kênh có lợi ích giảm dần, (2) các kênh chồng lấn khán giả nên cộng lại không bằng tổng,
   (3) mùa vụ đổi kênh nào đáng tiền. Điểm = reach hiệu dụng trung bình so với mức tốt nhất có thể. */
const G4 = {
  UNIT: 0.5,            // bước chia, tỷ đồng
  BUDGET: 6,            // tỷ đồng mỗi quý
  channels: [
    { id: 'search', t: 'Tìm kiếm',      cap: 0.30, k: 1.2, note: 'Bắt người đã có nhu cầu; trần khán giả thấp.' },
    { id: 'social', t: 'Mạng xã hội',   cap: 0.55, k: 2.4, note: 'Phủ rộng, lợi ích giảm dần vừa phải.' },
    { id: 'video',  t: 'Video ngắn',    cap: 0.60, k: 3.0, note: 'Trần cao nhưng cần nhiều tiền mới đầy.' },
    { id: 'ooh',    t: 'Ngoài trời',    cap: 0.35, k: 2.0, note: 'Phủ theo khu vực, trần thấp.' },
  ],
  quarters: [
    { id: 'q1', t: 'Quý 1 · Bình thường', brief: 'Không có sự kiện đặc biệt. Mọi kênh hoạt động ở mức cơ bản.', mult: { search: 1, social: 1, video: 1, ooh: 1 } },
    { id: 'q2', t: 'Quý 2 · Tết',         brief: 'Cả nhà xem video và đi ngoài đường nhiều hơn; người ta ít tự tìm kiếm.', mult: { search: 0.8, social: 1, video: 1.4, ooh: 1.3 } },
    { id: 'q3', t: 'Quý 3 · Hè',          brief: 'Giới trẻ nghỉ học, lướt mạng xã hội nhiều hơn; ngoài trời kém đi vì ít người đi làm.', mult: { search: 1, social: 1.35, video: 1.1, ooh: 0.8 } },
    { id: 'q4', t: 'Quý 4 · Mua sắm cuối năm', brief: 'Người mua đã lên danh sách và đi tìm; tìm kiếm và mạng xã hội sinh lời.', mult: { search: 1.5, social: 1.2, video: 1, ooh: 1 } },
  ],
  /* reach hiệu dụng của một quý: 1 - Π(1 - reach_i), reach_i = cap·mult·(1 - e^(-spend/k)). Trả về tỉ lệ 0–1. */
  reach(alloc, mult) {
    let miss = 1;
    for (const c of this.channels) {
      const r = Math.min(0.95, c.cap * (mult[c.id] ?? 1) * (1 - Math.exp(-(alloc[c.id] || 0) / c.k)));
      miss *= 1 - r;
    }
    return 1 - miss;
  },
  /* Cách chia tốt nhất trong bước UNIT (vét cạn: vài trăm tổ hợp). */
  best(mult) {
    const n = Math.round(this.BUDGET / this.UNIT), ids = this.channels.map((c) => c.id);
    let top = { r: -1, alloc: null };
    const go = (i, left, cur) => {
      if (i === ids.length - 1) { const a = { ...cur, [ids[i]]: left * this.UNIT }; const r = this.reach(a, mult); if (r > top.r) top = { r, alloc: a }; return; }
      for (let u = 0; u <= left; u++) go(i + 1, left - u, { ...cur, [ids[i]]: u * this.UNIT });
    };
    go(0, n, {});
    return top;
  },
  /* Điểm cả game: trung bình (reach của bạn / reach tốt nhất) qua các quý, 0–1. */
  score(plays) {
    if (!plays.length) return 0;
    return plays.reduce((s, p, i) => s + this.reach(p, this.quarters[i].mult) / this.best(this.quarters[i].mult).r, 0) / plays.length;
  },
  /* Chia đều mọi quý ≈ 0,95 (1 sao). Muốn 2 sao phải chia khác nhau, 3 sao phải đổi theo từng mùa. */
  stars(score) { return score >= 0.985 ? 3 : score >= 0.96 ? 2 : score >= 0.85 ? 1 : 0; },
  total(a) { return this.channels.reduce((s, c) => s + (a[c.id] || 0), 0); },
};
if (typeof module !== 'undefined') module.exports = G4;
