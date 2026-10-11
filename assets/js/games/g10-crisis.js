/* G10 · 60 PHÚT ĐẦU CỦA KHỦNG HOẢNG BÌNH LUẬN — mô hình thuần, không ngẫu nhiên. Mọi số là MINH HOẠ.
   Năm điểm quyết định trong 60 phút. Mỗi lựa chọn đổi hai thước: NÓNG (mức bức xúc công khai) và TIN (mức tin của khách).
   Khớp với bài kn09 (giờ vàng đầu tiên, khi nào im lặng là sai) và kn13-06 (phân loại bình luận). Không thay cho tư vấn pháp lý/PR thật:
   thực tế cần phối hợp bộ phận pháp chế và chăm sóc khách hàng. */
const G10 = {
  START: { heat: 55, trust: 45 },
  steps: [
    { id: 'c1', at: 'Phút 0–10',
      brief: 'Một bài đăng về dòng kem dưỡng mới nhận 40 bình luận giận dữ trong 10 phút: vài khách đăng ảnh da nổi mẩn và nói “bị dị ứng sau khi dùng”.',
      options: [
        { id: 'a', t: 'Ẩn các bình luận có ảnh để không lan ra thêm', dHeat: +22, dTrust: -18, why: 'Ẩn phản ánh có ảnh bị đọc là che giấu; người bị ẩn đăng lại ở nơi khác và bức xúc tăng.' },
        { id: 'b', t: 'Trả lời một câu mẫu chung “Chúng tôi rất tiếc, xin liên hệ hotline” dưới mọi bình luận', dHeat: +8, dTrust: -6, why: 'Kịp thời nhưng máy móc; không nói rõ gì đang được làm nên khách vẫn không biết có ai nghe.' },
        { id: 'c', t: 'Ghi nhận công khai, báo đang kiểm tra, chuyển các ca có ảnh cho chăm sóc khách và QA, chỉ định một người phát ngôn', dHeat: -6, dTrust: +10, why: 'Ghi nhận ngay, có việc cụ thể và một đầu mối — đúng việc của giờ vàng đầu tiên.' },
      ] },
    { id: 'c2', at: 'Phút 10–25',
      brief: 'Bộ phận QA báo hai lô sản xuất tháng trước có chỉ số cần kiểm tra thêm; kết quả đầy đủ cần 24 giờ. Mạng xã hội bắt đầu có bài chia sẻ lại.',
      options: [
        { id: 'a', t: 'Im lặng đến khi có đủ kết quả sau 24 giờ rồi mới thông báo một lần', dHeat: +20, dTrust: -16, why: 'Im lặng lúc mọi người đang hỏi bị hiểu là né tránh; khoảng trống được lấp bằng đồn đoán.' },
        { id: 'b', t: 'Đăng thông báo ngắn: đã nhận phản ánh, đang kiểm tra các lô liên quan, tạm ngừng bán lô nghi vấn, cung cấp kênh liên hệ', dHeat: -10, dTrust: +12, why: 'Nói điều đã biết, không hứa điều chưa chắc, và có hành động bảo vệ khách ngay.' },
        { id: 'c', t: 'Khẳng định “sản phẩm đạt chuẩn, mọi phản ánh là không đúng sự thật”', dHeat: +25, dTrust: -22, why: 'Phủ nhận khi chưa có kết quả kiểm tra là rủi ro lớn: nếu sau đó có vấn đề, uy tín mất gấp bội.' },
      ] },
    { id: 'c3', at: 'Phút 25–40',
      brief: 'Một KOL từng quảng cáo sản phẩm bị khách tag vào bình luận. Hai phóng viên nhắn tin xin phản hồi trong ngày.',
      options: [
        { id: 'a', t: 'Nhờ KOL đăng một bài bênh vực rằng mình dùng thấy rất tốt', dHeat: +18, dTrust: -14, why: 'Kéo người có ảnh hưởng vào bênh vực khi chưa có kết quả làm cuộc tranh luận lan rộng và mất tin.' },
        { id: 'b', t: 'Cho phép nhân viên nào nhận được tin nhắn thì tự trả lời theo ý mình', dHeat: +14, dTrust: -10, why: 'Nhiều giọng nói khác nhau dễ mâu thuẫn; khủng hoảng cần một thông điệp thống nhất.' },
        { id: 'c', t: 'Cử một người phát ngôn trả lời báo chí bằng câu thống nhất đã duyệt; liên hệ KOL để cùng chờ kết quả, không bình luận thêm', dHeat: -8, dTrust: +8, why: 'Một người nói, một thông điệp, và KOL không bị đẩy vào thế bảo vệ điều chưa kiểm chứng.' },
      ] },
    { id: 'c4', at: 'Phút 40–55',
      brief: 'Bình luận đã lên 600. Có ca kèm ảnh dị ứng, có ca hỏi “giờ dùng tiếp được không”, có ca chỉ than phiền chung.',
      options: [
        { id: 'a', t: 'Trả lời đồng loạt một mẫu chung cho cả 600 bình luận', dHeat: +10, dTrust: -8, why: 'Không phân biệt ca nặng và ca hỏi; người có vấn đề thật không thấy được ưu tiên.' },
        { id: 'b', t: 'Phân loại: ca có ảnh dị ứng chuyển ngay cho chăm sóc khách gọi điện và hỗ trợ, ca hỏi thì trả lời bằng thông tin đã duyệt', dHeat: -10, dTrust: +10, why: 'Phân loại theo mức nghiêm trọng và đưa đúng người xử lý — đúng cách quản lý bình luận khi khủng hoảng.' },
        { id: 'c', t: 'Khoá phần bình luận của bài để mọi thứ bớt ồn', dHeat: +15, dTrust: -12, why: 'Khoá bình luận đúng lúc khách cần được nghe bị coi là bịt miệng.' },
      ] },
    { id: 'c5', at: 'Phút 55–60',
      brief: 'Kết quả kiểm tra sơ bộ cho thấy một lô có vấn đề; vẫn còn nhiều điều chưa rõ. Đã đến lúc cập nhật cho công chúng.',
      options: [
        { id: 'a', t: 'Xin lỗi thật nặng và hứa bồi thường toàn bộ mọi chi phí cho mọi khách ngay lập tức, không điều kiện', dHeat: -4, dTrust: -4, why: 'Xin lỗi là đúng nhưng lời hứa vượt khả năng kiểm chứng và pháp lý có thể bị khai thác hoặc không giữ được.' },
        { id: 'b', t: 'Cập nhật những gì đã xác nhận, nêu cách xử lý từng ca, và hẹn thời điểm thông tin tiếp theo', dHeat: -12, dTrust: +12, why: 'Trung thực về điều đã biết và chưa biết, có cam kết cụ thể về việc kế tiếp và mốc cập nhật.' },
        { id: 'c', t: 'Xoá thông báo cũ và đăng một thông báo mới để mọi người bớt chú ý đến đợt đầu', dHeat: +18, dTrust: -16, why: 'Xoá thông báo cũ bị nhìn như xoá dấu vết, làm vấn đề tệ hơn.' },
      ] },
  ],
  /* choices = mảng 5 id lựa chọn ('a'|'b'|'c') theo thứ tự các bước. Trả về trạng thái cuối và lịch sử. */
  run(choices) {
    let heat = this.START.heat, trust = this.START.trust; const log = [];
    this.steps.forEach((s, i) => { const o = s.options.find((x) => x.id === choices[i]); if (!o) return;
      heat = Math.max(0, Math.min(100, heat + o.dHeat)); trust = Math.max(0, Math.min(100, trust + o.dTrust));
      log.push({ step: s.id, choice: o.id, heat, trust }); });
    return { heat, trust, log };
  },
  /* điểm 0–1: tin cao và nóng thấp. */
  score(choices) { const r = this.run(choices); return Math.max(0, Math.min(1, (r.trust / 100) * 0.6 + ((100 - r.heat) / 100) * 0.4)); },
  best() { return this.steps.map((s) => s.options.slice().sort((a, b) => (b.dTrust - a.dTrust) || (a.dHeat - b.dHeat))[0].id); },
  /* Điểm đơn điệu theo số quyết định đúng: 5/5 ≈ 0,95 · 4/5 ≥ 0,60 · 3/5 ≥ 0,31 */
  stars(sc) { return sc >= 0.9 ? 3 : sc >= 0.6 ? 2 : sc >= 0.3 ? 1 : 0; },
};
if (typeof module !== 'undefined') module.exports = G10;
