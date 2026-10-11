/* MARKETING LAB · KỊCH BẢN & DỮ LIỆU THỊ TRƯỜNG DÙNG CHUNG.
   Một bộ dữ liệu kinh doanh duy nhất cho cả 4 công cụ: Meta, Google Ads, GA4, SEO đọc cùng một brand, giá, biên lợi nhuận.
   Số liệu là MINH HOẠ có logic (không lấy từ nền tảng thật) — dùng để luyện cách ra quyết định. */
const LAB_CASES = {
  skincare: {
    id: 'skincare',
    t: 'Ra mắt thương hiệu chăm sóc da Việt Nam',
    brand: 'Nắng Mai',
    product: 'Kem chống nắng SPF50+ PA++++ dạng sữa, không bết dính, 50 ml',
    seed: 20260101,
    totalBudget: 10000000,        // ngân sách quảng cáo ban đầu, VND
    aov: 290000,                  // giá trị đơn trung bình, VND
    grossMargin: 0.6,             // biên lợi nhuận gộp sau giá vốn; hoà vốn quảng cáo khi ROAS = 1/0.6 ≈ 1,67
    leadToSale: 0.10,             // Leads: 10% người để lại SĐT thật sự mua sau khi sale gọi
    brief: 'Thương hiệu mới, chưa có tệp khách cũ. Sản phẩm giá 290.000 ₫, bán qua website. Tháng ra mắt cần đơn hàng đầu tiên và biết kênh nào đáng đầu tư tiếp.',
    steps: [
      ['seo', 'SEO Research: tìm nhu cầu và từ khoá của thị trường'],
      ['meta', 'Meta Ads: xây chiến dịch nhận biết / chuyển đổi'],
      ['gads', 'Google Ads: bắt người đã có ý định mua'],
      ['ga4', 'GA4: đọc kết quả, so sánh các kênh'],
      ['alloc', 'Chọn kênh hiệu quả và tối ưu phân bổ ngân sách'],
      ['summary', 'Viết bản tóm tắt điều hành'],
    ],
  },
};

/* Cấu hình từng chế độ của Meta Ads Lab. */
const LAB_META = {
  days: [7, 10, 14],
  modes: {
    learn:     { t: 'Học từng bước', budget: 2000000, d: 'Làm theo hướng dẫn, mỗi thành phần đều được giải thích tại chỗ.' },
    practice:  { t: 'Tự luyện',      budget: 10000000, d: 'Tự dựng chiến dịch và tối ưu. Chỉ có vài gợi ý.' },
    challenge: { t: 'Thử thách',     budget: 5000000, d: 'Một bài toán có KPI và ràng buộc. Không hướng dẫn từng bước.',
      targets: { roas: 2.0, orders: 30 } },
  },
  /* Quần thể minh hoạ: người dùng 18+ có thể được nhắm tới trên Facebook/Instagram ở Việt Nam. */
  population: 18000000,
  age: [
    { id: 'a1824', t: '18–24', share: 0.27, fit: 0.75, why: 'Quan tâm chống nắng nhưng ví hạn chế, hay chọn sản phẩm rẻ hơn.' },
    { id: 'a2534', t: '25–34', share: 0.33, fit: 1.00, why: 'Đi làm, có thu nhập, quan tâm chăm sóc da — nhóm mua tốt nhất.' },
    { id: 'a3544', t: '35–44', share: 0.22, fit: 0.85, why: 'Mua đều, ưu tiên hiệu quả và thành phần.' },
    { id: 'a4554', t: '45–54', share: 0.12, fit: 0.50, why: 'Ít mua mỹ phẩm trực tuyến, cần niềm tin cao.' },
    { id: 'a55',   t: '55+',   share: 0.06, fit: 0.25, why: 'Ít khi mua chống nắng qua quảng cáo mạng xã hội.' },
  ],
  gender: [
    { id: 'all',    t: 'Tất cả',  share: 1.00, fit: 0.712 },
    { id: 'female', t: 'Nữ',      share: 0.52, fit: 1.00 },
    { id: 'male',   t: 'Nam',     share: 0.48, fit: 0.40 },
  ],
  location: [
    { id: 'hcm',   t: 'TP.HCM',          share: 0.22, fit: 1.00, why: 'Nắng nóng quanh năm, thu nhập cao, thói quen mua mỹ phẩm online.' },
    { id: 'hn',    t: 'Hà Nội',          share: 0.18, fit: 1.00, why: 'Thị trường mỹ phẩm online lớn, nắng hè gay gắt.' },
    { id: 'dn',    t: 'Đà Nẵng',         share: 0.04, fit: 0.85, why: 'Nhiều nắng, thị trường nhỏ hơn.' },
    { id: 'other', t: 'Tỉnh thành khác', share: 0.56, fit: 0.55, why: 'Tệp rất rộng nhưng nhu cầu và khả năng giao hàng không đồng đều.' },
  ],
  interests: [
    { id: 'skincare', t: 'Chăm sóc da',               share: 0.16, fit: 1.00, why: 'Đúng nhu cầu của sản phẩm.' },
    { id: 'beauty',   t: 'Làm đẹp & mỹ phẩm',         share: 0.24, fit: 0.95, why: 'Rất gần, tệp lớn hơn.' },
    { id: 'outdoor',  t: 'Dã ngoại & thể thao ngoài trời', share: 0.12, fit: 0.75, why: 'Tiếp xúc nắng nhiều, có nhu cầu chống nắng thật.' },
    { id: 'travel',   t: 'Du lịch',                   share: 0.30, fit: 0.60, why: 'Có nhu cầu theo mùa, ý định mua chưa rõ.' },
    { id: 'fashion',  t: 'Thời trang',                share: 0.28, fit: 0.55, why: 'Quan tâm ngoại hình nhưng không đồng nghĩa với chăm sóc da.' },
    { id: 'parenting',t: 'Mẹ và bé',                  share: 0.15, fit: 0.45, why: 'Mua cho con nhiều hơn cho bản thân.' },
    { id: 'tech',     t: 'Công nghệ',                 share: 0.22, fit: 0.20, why: 'Ít liên quan tới sản phẩm.' },
    { id: 'gaming',   t: 'Game',                      share: 0.25, fit: 0.12, why: 'Ít liên quan, thường không mua mỹ phẩm.' },
    { id: 'property', t: 'Bất động sản',              share: 0.08, fit: 0.08, why: 'Không liên quan.' },
  ],
  broadFit: 0.45,   // không chọn sở thích: người dùng trung bình
  /* Mục tiêu chiến dịch → hệ số nhân lên đường cơ sở (xem meta-sim.js). */
  objectives: {
    awareness: { t: 'Nhận biết',   cpm: 0.72, ctr: 0.75, cvr: 0.30, optimizes: 'số người nhìn thấy quảng cáo', cta: ['learn_more', 'watch_more'],
      d: 'Phủ rộng với giá mỗi nghìn lượt hiển thị thấp. Người xem ít có ý định mua ngay.' },
    traffic:   { t: 'Lưu lượng truy cập', cpm: 0.95, ctr: 1.35, cvr: 0.65, optimizes: 'số lượt nhấp vào website', cta: ['learn_more', 'shop_now'],
      d: 'Tìm người hay nhấp. Nhiều lượt nhấp nhưng chất lượng ý định thấp hơn.' },
    leads:     { t: 'Khách tiềm năng', cpm: 1.05, ctr: 1.00, cvr: 4.00, optimizes: 'số người để lại thông tin', cta: ['sign_up', 'get_offer', 'contact_us'], conv: 'lead',
      d: 'Thu số điện thoại/email. Cần đội sale gọi lại, chỉ một phần chốt đơn.' },
    sales:     { t: 'Doanh số',    cpm: 1.20, ctr: 0.95, cvr: 1.00, optimizes: 'số lượt mua hàng', cta: ['shop_now', 'order_now'], conv: 'purchase',
      d: 'Tìm người có khả năng mua cao. Giá mỗi nghìn hiển thị cao hơn nhưng sát đơn hàng nhất.' },
  },
  placements: [
    { id: 'feed',      t: 'Bảng tin (Feed)',     cpm: 1.00, ctr: 1.00, cvr: 1.00, auto: 0.38, vertical: false },
    { id: 'reels',     t: 'Reels',               cpm: 0.85, ctr: 1.15, cvr: 0.90, auto: 0.27, vertical: true },
    { id: 'stories',   t: 'Stories',             cpm: 0.80, ctr: 1.00, cvr: 0.85, auto: 0.18, vertical: true },
    { id: 'messenger', t: 'Messenger',           cpm: 0.90, ctr: 0.80, cvr: 1.05, auto: 0.05, vertical: false },
    { id: 'rightcol',  t: 'Cột bên phải (máy tính)', cpm: 0.60, ctr: 0.40, cvr: 0.70, auto: 0.02, vertical: false },
    { id: 'network',   t: 'Audience Network',    cpm: 0.45, ctr: 0.50, cvr: 0.45, auto: 0.10, vertical: false },
  ],
  formats: [
    { id: 'image',    t: 'Một ảnh',   ctr: 1.00, score: 8,  d: 'Dễ làm, hiệu quả ổn định.' },
    { id: 'carousel', t: 'Nhiều ảnh', ctr: 1.10, score: 12, d: 'Kể được nhiều lợi ích, hợp để so sánh/giải thích.' },
    { id: 'video',    t: 'Video ngắn',ctr: 1.15, score: 15, d: 'Thu hút nhất, hợp Reels/Stories.' },
  ],
  ctas: [
    { id: 'shop_now',  t: 'Mua ngay' }, { id: 'order_now', t: 'Đặt hàng' }, { id: 'learn_more', t: 'Tìm hiểu thêm' },
    { id: 'sign_up',   t: 'Đăng ký' },  { id: 'get_offer', t: 'Nhận ưu đãi' }, { id: 'contact_us', t: 'Liên hệ' },
    { id: 'watch_more',t: 'Xem thêm' },
  ],
  /* Từ khoá chấm chất lượng nội dung. Viết hoa/thường và dấu đều được chuẩn hoá. */
  benefitWords: ['chong nang', 'spf', 'pa++', 'khong bet', 'khong trang', 'nang tong', 'duong am', 'nhe', 'tham nhanh', 'khong troi', 'da dau', 'da nhay cam', 'tia uv', 'khong gay mun', 'thanh phan'],
  proofWords:   ['kiem nghiem', 'da lieu', 'danh gia', 'khach hang', 'chung nhan', 'ngay thu', '%', 'spf50'],
  offerWords:   ['giam', 'tang', 'freeship', 'mien phi', 'combo', 'mua 1', 'uu dai', 'qua'],
  claimWords:   ['100%', 'trang da ngay', 'cam ket trang', 'vinh vien', 'so 1', 'tot nhat the gioi', 'chua khoi', 'tri nam', 'tuyet doi', 'khong tac dung phu'],
};
if (typeof globalThis !== 'undefined') { globalThis.LAB_CASES = LAB_CASES; globalThis.LAB_META = LAB_META; }
if (typeof module !== 'undefined') module.exports = { LAB_CASES, LAB_META };
