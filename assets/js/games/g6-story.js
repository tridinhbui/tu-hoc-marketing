/* G6 · KỂ CHUYỆN 60 GIÂY — mô hình thuần, không ngẫu nhiên. Mọi số là MINH HOẠ.
   Sếp hỏi một câu. Có 6 mảnh bằng chứng; bạn chọn ĐÚNG 3 và xếp theo thứ tự nói.
   Mỗi mảnh có mức: 2 = số/bằng chứng kiểm chứng được, 1 = giả thuyết có cơ sở, 0 = chung chung, −1 = phản tác dụng.
   Điểm một câu = 1,5×(mảnh đầu) + mảnh thứ hai + mảnh thứ ba (nói ý mạnh nhất trước). Điểm game = trung bình điểm/điểm tốt nhất. */
const G6 = {
  SLOT: [1.5, 1, 1],
  rounds: [
    { id: 's1', ask: 'Doanh thu kênh online quý này giảm 18%. Em khuyên anh làm gì trong tuần này?',
      cards: [
        { id: 'a', t: 'Traffic giảm 5% và chuyển đổi giảm 10%: nhân lại mới giải thích được khoảng 14,5% trong 18%.', tier: 2,
          why: 'Có phép tính và chỉ ra phần còn thiếu (~3,5 điểm) — đây là cách tách doanh thu thành thành phần.' },
        { id: 'b', t: 'Tỷ lệ mua lại của khách cũ tụt từ 32% xuống 24%, khách mới thì ổn.', tier: 2,
          why: 'Định vị được nguyên nhân vào một nhóm khách, bằng hai con số so sánh được.' },
        { id: 'c', t: 'Một mã hàng chủ lực hết hàng 9 ngày trong quý, mã này chiếm 22% doanh thu quý trước.', tier: 1,
          why: 'Giả thuyết hợp lý có số, nhưng cần kiểm chứng: hết hàng có thật làm mất 3,5 điểm còn lại không?' },
        { id: 'd', t: 'Đối thủ lớn vừa chạy khuyến mãi 30% hai tuần liền.', tier: 1,
          why: 'Bối cảnh bên ngoài, đáng nêu, nhưng chưa nối được với con số của mình.' },
        { id: 'e', t: 'Em thấy thị trường chung dạo này khó khăn.', tier: 0,
          why: 'Chung chung, không kiểm chứng được, sếp không có gì để quyết.' },
        { id: 'f', t: 'Em đề xuất tăng ngân sách quảng cáo gấp đôi ngay tuần này.', tier: -1,
          why: 'Nhảy sang giải pháp khi chưa biết nguyên nhân; có thể đổ tiền vào chỗ không phải điểm rò.' },
      ] },
    { id: 's2', ask: 'Có nên giảm giá 20% cả tháng để cứu doanh số không?',
      cards: [
        { id: 'a', t: 'Lãi gộp hiện 35% giá bán. Giảm 20% thì lãi mỗi sản phẩm còn 15 trên 100 — phải bán gấp khoảng 2,3 lần mới giữ nguyên tổng lãi.', tier: 2,
          why: 'Phép tính điểm hoà vốn của giảm giá — con số sếp cần để so với kỳ vọng tăng doanh số.' },
        { id: 'b', t: 'Đợt giảm 15% quý trước: doanh số tăng 28% nhưng tổng lãi gộp giảm 11%.', tier: 2,
          why: 'Bằng chứng từ chính công ty, cùng loại quyết định, có cả hai chiều: doanh số và lãi.' },
        { id: 'c', t: 'Khách quen sau đợt giảm giá thường chờ đợt sau mới mua lại.', tier: 1,
          why: 'Cơ chế đúng và hay gặp, nhưng chưa có số của mình đi kèm.' },
        { id: 'd', t: 'Thay vì giảm cả tháng, thử tặng quà kèm theo cho nhóm đang bỏ giỏ hàng trong một tuần rồi đo lại.', tier: 1,
          why: 'Phương án thay thế có thử nghiệm nhỏ — tốt, nhưng nên đứng sau lập luận vì sao không giảm.' },
        { id: 'e', t: 'Giảm giá là cách nhanh nhất để thấy doanh số tăng.', tier: 0,
          why: 'Đúng về doanh số, bỏ qua lãi — đúng cái sếp đang hỏi là có nên hay không.' },
        { id: 'f', t: 'Nên giảm sâu hơn nữa, 30%, cho chắc khách mua.', tier: -1,
          why: 'Đẩy lỗ lãi lên mà không có bằng chứng khách phản ứng theo mức giảm.' },
      ] },
    { id: 's3', ask: 'Ra mắt sản phẩm mới ở Hà Nội hay TP.HCM trước?',
      cards: [
        { id: 'a', t: 'Khảo sát 1.000 người: nhóm khách mục tiêu ở TP.HCM lớn gấp khoảng 1,6 lần Hà Nội.', tier: 2,
          why: 'Quy mô thị trường có số và nguồn — lý do chính để chọn nơi vào trước.' },
        { id: 'b', t: 'Chi phí mở điểm bán ở TP.HCM cao hơn khoảng 30%, điểm hoà vốn đến chậm hơn khoảng 2 tháng.', tier: 2,
          why: 'Đối trọng có số — cho thấy bạn cân cả chi phí chứ không chỉ quy mô.' },
        { id: 'c', t: 'Đã có sẵn kho và đội bán hàng ở Hà Nội: ra mắt trong 3 tuần thay vì 3 tháng.', tier: 2,
          why: 'Tốc độ và năng lực sẵn có, có mốc thời gian cụ thể.' },
        { id: 'd', t: 'Đối thủ chính mạnh nhất ở TP.HCM, thị phần họ khoảng 40%.', tier: 1,
          why: 'Bối cảnh cạnh tranh liên quan, nhưng chưa nói rõ nó đổi quyết định thế nào.' },
        { id: 'e', t: 'Em thấy TP.HCM sôi động hơn.', tier: 0, why: 'Cảm nhận, không có gì kiểm chứng.' },
        { id: 'f', t: 'Giám đốc quen nhiều người ở Hà Nội nên dễ nhờ vả.', tier: -1,
          why: 'Lý do quan hệ, không phải thị trường — dễ làm mất uy tín của đề xuất.' },
      ] },
  ],
  /* Thứ tự hiển thị cố định (không ngẫu nhiên) để mảnh mạnh không luôn nằm đầu danh sách. Đã áp dụng ở IIFE bên dưới. */
  /* điểm của một cách chọn có thứ tự `ids` (3 id) cho vòng `round` */
  points(round, ids) {
    return ids.reduce((s, id, i) => s + this.SLOT[i] * round.cards.find((c) => c.id === id).tier, 0);
  },
  best(round) {
    const ids = round.cards.map((c) => c.id); let top = { p: -Infinity, ids: [] };
    for (const a of ids) for (const b of ids) for (const c of ids) {
      if (a === b || b === c || a === c) continue;
      const p = this.points(round, [a, b, c]); if (p > top.p) top = { p, ids: [a, b, c] };
    }
    return top;
  },
  /* điểm game 0–1: trung bình max(0, điểm/điểm tốt nhất) */
  score(picks) {
    return picks.length ? picks.reduce((s, ids, i) => s + Math.max(0, this.points(this.rounds[i], ids) / this.best(this.rounds[i]).p), 0) / picks.length : 0;
  },
  stars(s) { return s >= 0.99 ? 3 : s >= 0.8 ? 2 : s >= 0.55 ? 1 : 0; },
};
(() => {
  const ORDER = [[2, 5, 0, 4, 3, 1], [4, 2, 0, 5, 3, 1], [3, 0, 5, 1, 4, 2]];
  G6.rounds.forEach((r, i) => { const cs = ORDER[i].map((k) => r.cards[k]); r.cards = cs.map((c, n) => ({ ...c, id: 'k' + (n + 1) })); });
})();
if (typeof module !== 'undefined') module.exports = G6;
