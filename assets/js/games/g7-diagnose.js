/* G7 · CHẨN ĐOÁN REACH GIẢM — mô hình thuần, không ngẫu nhiên. Mọi số là MINH HOẠ, không dự đoán nền tảng thật.
   Mỗi vòng: một kênh có reach giảm. Bạn được chạy tối đa MAXCHECKS lượt kiểm trong các lượt có sẵn, mỗi lượt trả về một bảng số.
   Sau đó chọn nguyên nhân gốc. Điểm vòng = 0,7 nếu chọn đúng nguyên nhân + 0,3 nếu trong các lượt kiểm có lượt chứa bằng chứng của nó.
   Nguyên lý: kiểm nghi phạm rẻ và gần trước (đo sai, mùa vụ, việc mình đổi, nguồn người xem), giả định về nền tảng đứng cuối. */
const G7 = {
  MAXCHECKS: 3,
  causes: [
    { id: 'measure',  t: 'Đo sai: khác khoảng thời gian hoặc định nghĩa chỉ số' },
    { id: 'season',   t: 'Mùa vụ: tuần này vốn thấp hơn theo cùng kỳ' },
    { id: 'paid',     t: 'Tuần trước có quảng cáo trả tiền kéo reach lên' },
    { id: 'own',      t: 'Chính mình đổi: số bài, định dạng hoặc giờ đăng' },
    { id: 'platform', t: 'Nền tảng đổi cách phân phối (có thông báo chính thức)' },
  ],
  checkDefs: {
    period:   'Đối chiếu khoảng thời gian và định nghĩa chỉ số',
    season:   'So cùng kỳ năm trước / mùa vụ',
    paid:     'Tách reach trả tiền và reach tự nhiên',
    own:      'Kiểm lịch đăng của chính mình (số bài, định dạng, giờ)',
    source:   'Nguồn người xem theo cửa (theo dõi / tìm kiếm / đề xuất)',
    platform: 'Tìm thông báo thay đổi từ nền tảng (nguồn chính thức)',
  },
  rounds: [
    { id: 'd1', t: 'Reach tụt 40% trong báo cáo tuần', truth: 'measure',
      brief: 'Kênh có reach 50.000 tuần trước và 30.000 tuần này. Quản lý hỏi ngay “thuật toán đổi à?”. Bạn có tối đa 3 lượt kiểm.',
      checks: {
        period:   { rows: [['Tuần trước', '7 ngày · 50.000 reach · 7.143/ngày'], ['Tuần này', 'mới có 5 ngày dữ liệu · 30.000 reach · 6.000/ngày'], ['Mỗi ngày giảm', '−16%, không phải −40%']], points: 'measure' },
        season:   { rows: [['Cùng tuần năm trước so tuần liền trước', '−4%'], ['Kết luận', 'Mùa vụ chỉ giải thích vài phần trăm']], points: null },
        paid:     { rows: [['Quảng cáo trả tiền', 'Không chạy ở cả hai tuần'], ['Reach tự nhiên', 'Bằng tổng reach']], points: null },
        own:      { rows: [['Số bài', '7 → 6'], ['Định dạng', 'Không đổi'], ['Giờ đăng', 'Không đổi']], points: null },
        source:   { rows: [['Cơ cấu nguồn', 'Theo dõi 30% · Tìm kiếm 10% · Đề xuất 60% — giống tuần trước']], points: null },
        platform: { rows: [['Thông báo chính thức', 'Không có thay đổi nào trong tuần này']], points: null },
      } },
    { id: 'd2', t: 'Reach tụt sau tuần có chạy quảng cáo', truth: 'paid',
      brief: 'Tổng reach 80.000 tuần trước và 36.000 tuần này, cùng 7 ngày. Tuần trước đội có chạy một chiến dịch lớn. Tối đa 3 lượt kiểm.',
      checks: {
        period:   { rows: [['Khoảng thời gian', 'Cùng 7 ngày'], ['Định nghĩa reach', 'Giống nhau ở cả hai báo cáo']], points: null },
        season:   { rows: [['Cùng kỳ năm trước', 'Không có biến động lớn so với tuần liền trước']], points: null },
        paid:     { rows: [['Tuần trước', 'Trả tiền 41.000 · Tự nhiên 39.000'], ['Tuần này', 'Trả tiền 0 · Tự nhiên 36.000'], ['Tự nhiên giảm', '−8%']], points: 'paid' },
        own:      { rows: [['Số bài', '6 → 6'], ['Định dạng', 'Không đổi']], points: null },
        source:   { rows: [['Cơ cấu nguồn tự nhiên', 'Gần như không đổi']], points: null },
        platform: { rows: [['Thông báo chính thức', 'Không có']], points: null },
      } },
    { id: 'd3', t: 'Reach tụt dần ba tuần liên tiếp', truth: 'own',
      brief: 'Reach đi từ 60.000 xuống 38.000 trong ba tuần, cùng khoảng thời gian, không chạy quảng cáo. Tối đa 3 lượt kiểm.',
      checks: {
        period:   { rows: [['Khoảng thời gian', 'Cùng 7 ngày'], ['Định nghĩa reach', 'Giống nhau']], points: null },
        season:   { rows: [['Cùng kỳ năm trước', 'Giảm khoảng 5%, chưa giải thích được phần lớn']], points: null },
        paid:     { rows: [['Quảng cáo trả tiền', 'Không chạy']], points: null },
        own:      { rows: [['Video ngắn mỗi tuần', '6 → 1 (đội bận làm việc khác)'], ['Ảnh đăng mỗi tuần', '4 → 5'], ['Reach trung bình mỗi video ngắn', '~7.500'], ['Reach trung bình mỗi ảnh', '~2.000']], points: 'own' },
        source:   { rows: [['Phần reach đến từ đề xuất', '55% → 25%'], ['Ghi chú', 'Khớp với việc đăng ít video ngắn hơn']], points: 'own' },
        platform: { rows: [['Thông báo chính thức', 'Không có']], points: null },
      } },
  ],
  /* điểm một vòng; `picked` = mảng id lượt kiểm đã chạy, `cause` = nguyên nhân bạn chọn */
  roundScore(r, picked, cause) {
    const found = picked.some((id) => r.checks[id] && r.checks[id].points === r.truth);
    return (cause === r.truth ? 0.7 : 0) + (found ? 0.3 : 0);
  },
  score(plays) { return plays.length ? plays.reduce((s, p, i) => s + this.roundScore(this.rounds[i], p.picked, p.cause), 0) / plays.length : 0; },
  stars(s) { return s >= 0.99 ? 3 : s >= 0.8 ? 2 : s >= 0.55 ? 1 : 0; },
};
if (typeof module !== 'undefined') module.exports = G7;
