/* G9 · ĐỌC BẢNG YOUTUBE STUDIO — mô hình thuần, không ngẫu nhiên. Mọi số là MINH HOẠ, không phải số thật của nền tảng nào.
   Mỗi vòng là một "bảng Studio" gồm impressions, CTR, thời lượng xem trung bình (% độ dài), nguồn lưu lượng và đường giữ chân.
   Bạn chọn CHẨN ĐOÁN (vấn đề nằm ở đâu) và VIỆC SỬA (làm gì trước). Quy tắc đọc khớp với bài kn15 và kn13-02/03:
   CTR thấp mà giữ chân tốt → sửa gói; rơi dốc ở đầu → sửa mở đầu; vách đứng giữa chừng → sửa đoạn đó; impressions rất thấp → vấn đề phân phối/chủ đề;
   dữ liệu quá ít → chưa kết luận. Không có mốc "CTR tốt" chung vì trang chính thức không đưa mốc. */
const G9 = {
  diags: [
    { id: 'pack',  t: 'Gói video (ảnh bìa / tiêu đề)' },
    { id: 'open',  t: 'Mở đầu video và lời hứa' },
    { id: 'mid',   t: 'Một đoạn ở giữa video' },
    { id: 'reach', t: 'Phân phối / chủ đề (video ít được hiển thị)' },
    { id: 'wait',  t: 'Chưa đủ dữ liệu để kết luận' },
  ],
  acts: {
    pack:  { t: 'Thử một ảnh bìa hoặc tiêu đề khác, mỗi lần đổi một thứ' },
    open:  { t: 'Dựng lại phần đầu cho khớp lời hứa của ảnh bìa' },
    mid:   { t: 'Xem đoạn ở mốc người xem rời nhiều và rút gọn hoặc đổi nhịp đoạn đó' },
    reach: { t: 'Làm thêm video bám chủ đề và viết tiêu đề cho cụm người ta thật sự gõ' },
    wait:  { t: 'Chưa đổi gì, chờ thêm dữ liệu rồi đọc lại bảng' },
  },
  rounds: [
    { id: 's1', t: 'Video “Cách chọn nồi chiên không dầu”', len: '9 phút', imp: 120000, ctr: 2.1, avd: 55, truth: 'pack',
      src: [['Trang chủ', 70], ['Gợi ý', 20], ['Tìm kiếm', 10]], ret: [100, 82, 74, 70, 66, 63, 60, 57, 54, 52, 50],
      why: 'CTR thấp dù người bấm vào thì xem rất lâu (55% độ dài) và đường giữ chân thoải. Phần thân đang giữ được người; cái cần sửa là thứ quyết định việc bấm: ảnh bìa và tiêu đề.' },
    { id: 's2', t: 'Video “Review tai nghe không dây”', len: '12 phút', imp: 40000, ctr: 7.5, avd: 18, truth: 'open',
      src: [['Trang chủ', 55], ['Gợi ý', 30], ['Tìm kiếm', 15]], ret: [100, 48, 36, 30, 26, 24, 22, 20, 19, 18, 17],
      why: 'CTR cao nhưng đường giữ chân rơi dốc ngay đầu rồi đi ngang. Lời hứa kéo người bấm tốt, nhưng mở đầu không giữ được lời hứa — nên dựng lại phần đầu cho khớp.' },
    { id: 's3', t: 'Video “Hướng dẫn làm vườn ban công”', len: '10 phút', imp: 60000, ctr: 5.0, avd: 35, truth: 'mid',
      src: [['Trang chủ', 45], ['Gợi ý', 25], ['Tìm kiếm', 30]], ret: [100, 90, 84, 80, 77, 74, 38, 35, 33, 31, 30],
      why: 'CTR vừa phải, mở đầu giữ tốt, rồi sụt như một vách đứng ở khoảng 60% độ dài. Có một đoạn cụ thể làm người xem rời đi; sửa đúng đoạn đó chứ không đổi ảnh bìa.' },
    { id: 's4', t: 'Video “So sánh hai loại phân bón hữu cơ”', len: '8 phút', imp: 4000, ctr: 6.0, avd: 52, truth: 'reach',
      src: [['Tìm kiếm', 70], ['Gợi ý', 10], ['Trang chủ', 20]], ret: [100, 88, 80, 74, 70, 66, 62, 60, 57, 55, 53],
      why: 'CTR tốt và giữ chân tốt, nhưng video gần như không được hiển thị (impressions rất thấp), phần lớn đến từ tìm kiếm. Vấn đề là phân phối và chủ đề, không phải gói hay thân video.' },
    { id: 's5', t: 'Video mới đăng được 3 giờ', len: '7 phút', imp: 300, ctr: 3.0, avd: 40, truth: 'wait',
      src: [['Theo dõi', 80], ['Gợi ý', 10], ['Tìm kiếm', 10]], ret: [100, 75, 65, 58, 52, 48, 45, 42, 40, 38, 36],
      why: 'Mới 300 impressions, chủ yếu từ người đã theo dõi. Mẫu quá nhỏ và khán giả chưa đại diện; chưa nên sửa gì. Chờ thêm dữ liệu rồi đọc lại bảng.' },
  ],
  roundScore(r, diag, act) { return (diag === r.truth ? 0.6 : 0) + (act === r.truth ? 0.4 : 0); },
  score(plays) { return plays.length ? plays.reduce((s, p, i) => s + this.roundScore(this.rounds[i], p.diag, p.act), 0) / plays.length : 0; },
  stars(s) { return s >= 0.99 ? 3 : s >= 0.8 ? 2 : s >= 0.55 ? 1 : 0; },
};
if (typeof module !== 'undefined') module.exports = G9;
