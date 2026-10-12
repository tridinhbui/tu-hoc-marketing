/* MARKETING LAB · DỮ LIỆU GOOGLE ADS — bộ từ khoá cố định (seeded, không ngẫu nhiên) cho case kem chống nắng.
   Số liệu là MINH HOẠ. cpc = giá thầu tham chiếu để lên top (VND) ở điểm chất lượng ~6; comp = mức cạnh tranh 0–1.
   intent: transactional (sắp mua) · commercial (đang so sánh) · informational (tìm hiểu) · navigational (tìm một thương hiệu). */
const LAB_GADS = {
  modes: {
    learn:     { t: 'Học từng bước', budget: 2000000, d: 'Làm theo hướng dẫn, mỗi thành phần đều được giải thích tại chỗ.' },
    practice:  { t: 'Tự luyện',      budget: 10000000, d: 'Tự dựng chiến dịch tìm kiếm và tối ưu. Chỉ có vài gợi ý.' },
    challenge: { t: 'Thử thách',     budget: 5000000, d: 'Một bài toán có KPI và ràng buộc. Không hướng dẫn từng bước.', targets: { roas: 2.5, orders: 35 } },
  },
  days: [14, 21, 30],
  objectives: {
    sales:   { t: 'Doanh số',      d: 'Tìm người sẵn sàng mua trên website. Hợp với bán lẻ online.', bids: ['maxconv', 'manual', 'maxclicks'], conv: 'purchase' },
    leads:   { t: 'Khách tiềm năng', d: 'Thu số điện thoại/email để sale gọi lại. Chốt đơn ~10%.', bids: ['maxconv', 'manual', 'maxclicks'], conv: 'lead' },
    traffic: { t: 'Lưu lượng truy cập', d: 'Đưa nhiều người vào website. Chưa gắn với đơn hàng.', bids: ['maxclicks', 'manual'], conv: 'purchase' },
  },
  bidStrategies: {
    manual:   { t: 'Đặt giá thầu thủ công', d: 'Bạn đặt giá tối đa cho mỗi lượt nhấp. Kiểm soát chi phí nhưng phải tự tinh chỉnh.' },
    maxclicks:{ t: 'Tối đa hoá lượt nhấp', d: 'Google lấy nhiều lượt nhấp nhất trong ngân sách, ưu tiên từ khoá rẻ — không phân biệt người mua và người xem.' },
    maxconv:  { t: 'Tối đa hoá chuyển đổi', d: 'Google tự đặt giá theo khả năng chuyển đổi. Cần khoảng 30 chuyển đổi để ổn định.' },
  },
  match: {
    exact:  { t: 'Khớp chính xác', frac: 0.55, d: 'Chỉ hiện với đúng cụm từ (và biến thể rất sát). Ít lượt hiển thị, ý định rõ.' },
    phrase: { t: 'Khớp cụm từ',    frac: 0.80, d: 'Hiện khi truy vấn chứa cụm từ theo thứ tự đó, kể cả có chữ thêm vào.' },
    broad:  { t: 'Khớp rộng',      frac: 1.00, d: 'Hiện với cả truy vấn liên quan lỏng lẻo. Nhiều lượt hiển thị nhưng dễ trúng truy vấn không mua.' },
  },
  keywords: [
    { id: 'k1',  kw: 'kem chống nắng',                 vol: 90000,  cpc: 4200, comp: 0.85, intent: 'commercial',    rel: 0.85 },
    { id: 'k2',  kw: 'mua kem chống nắng',             vol: 14000,  cpc: 5800, comp: 0.80, intent: 'transactional', rel: 1.00 },
    { id: 'k3',  kw: 'kem chống nắng cho da dầu',      vol: 22000,  cpc: 3900, comp: 0.70, intent: 'commercial',    rel: 1.00 },
    { id: 'k4',  kw: 'kem chống nắng không bết dính',  vol: 8000,   cpc: 3500, comp: 0.55, intent: 'commercial',    rel: 1.00 },
    { id: 'k5',  kw: 'kem chống nắng spf50 giá rẻ',    vol: 6500,   cpc: 4800, comp: 0.70, intent: 'transactional', rel: 0.70, note: 'Người tìm "giá rẻ" nhạy giá; sản phẩm 290.000 ₫ không phải hàng rẻ.' },
    { id: 'k6',  kw: 'kem chống nắng nâng tone',       vol: 5000,   cpc: 3300, comp: 0.50, intent: 'commercial',    rel: 0.65, note: 'Sản phẩm không phải dạng nâng tone.' },
    { id: 'k7',  kw: 'review kem chống nắng',          vol: 18000,  cpc: 2200, comp: 0.50, intent: 'informational', rel: 0.55 },
    { id: 'k8',  kw: 'cách chọn kem chống nắng',       vol: 12000,  cpc: 1800, comp: 0.35, intent: 'informational', rel: 0.50 },
    { id: 'k9',  kw: 'kem chống nắng anessa',          vol: 15000,  cpc: 5200, comp: 0.90, intent: 'navigational',  rel: 0.25, competitor: true },
    { id: 'k10', kw: 'kem chống nắng la roche posay',  vol: 9000,   cpc: 5000, comp: 0.90, intent: 'navigational',  rel: 0.25, competitor: true },
    { id: 'k11', kw: 'nắng mai kem chống nắng',        vol: 900,    cpc: 1500, comp: 0.10, intent: 'navigational',  rel: 1.00, brand: true },
    { id: 'k12', kw: 'kem chống nắng trẻ em',          vol: 7000,   cpc: 3800, comp: 0.60, intent: 'commercial',    rel: 0.15, note: 'Sản phẩm dành cho người lớn.' },
    { id: 'k13', kw: 'mỹ phẩm chăm sóc da',            vol: 60000,  cpc: 3000, comp: 0.70, intent: 'informational', rel: 0.30 },
    { id: 'k14', kw: 'làm đẹp',                        vol: 200000, cpc: 2000, comp: 0.60, intent: 'informational', rel: 0.10 },
    { id: 'k15', kw: 'kem chống nắng miễn phí',        vol: 1500,   cpc: 900,  comp: 0.10, intent: 'informational', rel: 0.05, note: 'Người tìm đồ miễn phí không mua.' },
  ],
  /* Cụm từ biến thể mà khớp cụm từ/khớp rộng có thể kéo về (báo cáo cụm từ tìm kiếm). */
  mods: [
    { s: 'review',   share: 0.10, rel: 0.50, intent: 'informational', phrase: true },
    { s: 'giá rẻ',   share: 0.06, rel: 0.60, intent: 'transactional', phrase: true },
    { s: 'là gì',    share: 0.06, rel: 0.12, intent: 'informational', phrase: true },
    { s: 'miễn phí', share: 0.03, rel: 0.05, intent: 'informational', phrase: true },
    { s: 'cho bé',   share: 0.07, rel: 0.15, intent: 'commercial',    phrase: false },
    { s: 'tự làm',   share: 0.03, rel: 0.05, intent: 'informational', phrase: false },
  ],
  negatives: ['miễn phí', 'là gì', 'tự làm', 'cho bé', 'trẻ em', 'review', 'cách', 'giá rẻ', 'anessa', 'la roche posay'],
  /* CTR/CVR cơ sở theo ý định tìm kiếm. */
  intentBase: { transactional: { ctr: 0.055, cvr: 0.036 }, commercial: { ctr: 0.038, cvr: 0.022 }, informational: { ctr: 0.020, cvr: 0.005 }, navigational: { ctr: 0.012, cvr: 0.004 } },
  brandBase: { ctr: 0.16, cvr: 0.07 },
  /* Chất lượng trang đích theo ý định. */
  landings: [
    { id: 'home',     t: 'Trang chủ',                   q: { transactional: 0.55, commercial: 0.55, informational: 0.50, navigational: 0.70 }, d: 'Chung chung; người dùng phải tự tìm sản phẩm.' },
    { id: 'category', t: 'Danh mục Chống nắng',         q: { transactional: 0.75, commercial: 0.80, informational: 0.55, navigational: 0.60 }, d: 'Khớp nhu cầu rộng, nhiều lựa chọn.' },
    { id: 'product',  t: 'Trang sản phẩm Kem chống nắng', q: { transactional: 0.95, commercial: 0.90, informational: 0.50, navigational: 0.80 }, d: 'Trả lời đúng điều người mua cần và có nút mua.' },
    { id: 'blog',     t: 'Bài hướng dẫn chọn chống nắng', q: { transactional: 0.40, commercial: 0.60, informational: 0.90, navigational: 0.40 }, d: 'Tốt cho người tìm hiểu, kém cho người sắp mua.' },
  ],
  verbs: ['mua', 'dat hang', 'nhan', 'xem', 'kham pha', 'thu', 'dat mua', 'chon'],
};
if (typeof globalThis !== 'undefined') globalThis.LAB_GADS = LAB_GADS;
if (typeof module !== 'undefined') module.exports = LAB_GADS;
