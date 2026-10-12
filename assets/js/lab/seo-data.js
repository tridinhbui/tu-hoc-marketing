/* MARKETING LAB · DỮ LIỆU SEO — bộ từ khoá và đối thủ cố định (seeded) cho case kem chống nắng.
   Dùng lại 15 từ khoá của Google Ads Lab (cùng id, lượt tìm, CPC) rồi thêm từ khoá dài và cụm thông tin, để hai Lab nói về cùng một thị trường.
   Số liệu là MINH HOẠ. kd = độ khó 0–100; rel = độ liên quan với sản phẩm Nắng Mai 0–1. */
const LAB_SEO = {
  domain: 'nangmai.vn', authority: 12,
  modes: {
    learn:     { t: 'Học từng bước', pieces: 4, budget: 7500000, d: 'Làm theo hướng dẫn, mỗi báo cáo đều có giải thích.' },
    practice:  { t: 'Tự luyện',      pieces: 10, budget: 20000000, d: 'Tự nghiên cứu và lập kế hoạch nội dung với ít gợi ý.' },
    challenge: { t: 'Thử thách',     pieces: 8, budget: 11000000, d: 'Một kế hoạch SEO có ngân sách nội dung và KPI. Không hướng dẫn.', targets: { roas: 5, orders: 150 } },
  },
  clusters: [
    { id: 'product', t: 'Sản phẩm chính' }, { id: 'buy', t: 'Mua hàng & giá' }, { id: 'skin', t: 'Theo loại da' }, { id: 'guide', t: 'Kiến thức & hướng dẫn' },
    { id: 'review', t: 'Review & so sánh' }, { id: 'brand', t: 'Thương hiệu' }, { id: 'use', t: 'Theo hoàn cảnh sử dụng' }, { id: 'out', t: 'Ngoài phạm vi' },
  ],
  /* kw: id, kw, vol/tháng, kd, cpc, intent, cluster đúng, rel */
  keywords: [
    { id: 'k1',  kw: 'kem chống nắng',                       vol: 90000,  kd: 78, cpc: 4200, intent: 'commercial',    cluster: 'product', rel: 0.85 },
    { id: 'k2',  kw: 'mua kem chống nắng',                   vol: 14000,  kd: 52, cpc: 5800, intent: 'transactional', cluster: 'buy',     rel: 1.00 },
    { id: 'k3',  kw: 'kem chống nắng cho da dầu',            vol: 22000,  kd: 48, cpc: 3900, intent: 'commercial',    cluster: 'skin',    rel: 1.00 },
    { id: 'k4',  kw: 'kem chống nắng không bết dính',        vol: 8000,   kd: 38, cpc: 3500, intent: 'commercial',    cluster: 'skin',    rel: 1.00 },
    { id: 'k5',  kw: 'kem chống nắng spf50 giá rẻ',          vol: 6500,   kd: 45, cpc: 4800, intent: 'transactional', cluster: 'buy',     rel: 0.70 },
    { id: 'k6',  kw: 'kem chống nắng nâng tone',             vol: 5000,   kd: 40, cpc: 3300, intent: 'commercial',    cluster: 'out',     rel: 0.65 },
    { id: 'k7',  kw: 'review kem chống nắng',                vol: 18000,  kd: 55, cpc: 2200, intent: 'informational', cluster: 'review',  rel: 0.55 },
    { id: 'k8',  kw: 'cách chọn kem chống nắng',             vol: 12000,  kd: 42, cpc: 1800, intent: 'informational', cluster: 'guide',   rel: 0.50 },
    { id: 'k9',  kw: 'kem chống nắng anessa',                vol: 15000,  kd: 70, cpc: 5200, intent: 'navigational',  cluster: 'brand',   rel: 0.25, competitor: true },
    { id: 'k10', kw: 'kem chống nắng la roche posay',        vol: 9000,   kd: 68, cpc: 5000, intent: 'navigational',  cluster: 'brand',   rel: 0.25, competitor: true },
    { id: 'k11', kw: 'nắng mai kem chống nắng',              vol: 900,    kd: 5,  cpc: 1500, intent: 'navigational',  cluster: 'brand',   rel: 1.00, own: true },
    { id: 'k12', kw: 'kem chống nắng trẻ em',                vol: 7000,   kd: 50, cpc: 3800, intent: 'commercial',    cluster: 'out',     rel: 0.15 },
    { id: 'k13', kw: 'mỹ phẩm chăm sóc da',                  vol: 60000,  kd: 80, cpc: 3000, intent: 'informational', cluster: 'out',     rel: 0.30 },
    { id: 'k14', kw: 'làm đẹp',                              vol: 200000, kd: 90, cpc: 2000, intent: 'informational', cluster: 'out',     rel: 0.10 },
    { id: 'k15', kw: 'kem chống nắng miễn phí',              vol: 1500,   kd: 15, cpc: 900,  intent: 'informational', cluster: 'out',     rel: 0.05 },
    { id: 's1',  kw: 'kem chống nắng là gì',                 vol: 11000,  kd: 30, cpc: 1200, intent: 'informational', cluster: 'guide',   rel: 0.40 },
    { id: 's2',  kw: 'spf và pa là gì',                      vol: 9500,   kd: 28, cpc: 1100, intent: 'informational', cluster: 'guide',   rel: 0.50 },
    { id: 's3',  kw: 'cách bôi kem chống nắng đúng cách',    vol: 16000,  kd: 35, cpc: 1300, intent: 'informational', cluster: 'guide',   rel: 0.55 },
    { id: 's4',  kw: 'kem chống nắng cho da nhạy cảm',       vol: 9000,   kd: 44, cpc: 3600, intent: 'commercial',    cluster: 'skin',    rel: 0.90 },
    { id: 's5',  kw: 'kem chống nắng cho da mụn',            vol: 8500,   kd: 43, cpc: 3500, intent: 'commercial',    cluster: 'skin',    rel: 0.85 },
    { id: 's6',  kw: 'kem chống nắng đi biển',               vol: 6000,   kd: 33, cpc: 2800, intent: 'commercial',    cluster: 'use',     rel: 0.80 },
    { id: 's7',  kw: 'kem chống nắng đi làm',                vol: 4500,   kd: 30, cpc: 2700, intent: 'commercial',    cluster: 'use',     rel: 0.90 },
    { id: 's8',  kw: 'kem chống nắng vật lý hay hoá học',    vol: 7000,   kd: 32, cpc: 1400, intent: 'informational', cluster: 'guide',   rel: 0.60 },
    { id: 's9',  kw: 'top kem chống nắng tốt nhất',          vol: 13000,  kd: 58, cpc: 3200, intent: 'commercial',    cluster: 'review',  rel: 0.80 },
    { id: 's10', kw: 'kem chống nắng bao nhiêu tiền',        vol: 3500,   kd: 36, cpc: 3000, intent: 'transactional', cluster: 'buy',     rel: 0.80 },
    { id: 's11', kw: 'kem chống nắng chính hãng ở đâu',      vol: 2800,   kd: 34, cpc: 3400, intent: 'transactional', cluster: 'buy',     rel: 0.90 },
    { id: 's12', kw: 'kem chống nắng dạng sữa',              vol: 3200,   kd: 31, cpc: 3100, intent: 'commercial',    cluster: 'product', rel: 1.00 },
    { id: 's13', kw: 'kem chống nắng spf 50 pa++++',         vol: 7500,   kd: 46, cpc: 3700, intent: 'commercial',    cluster: 'product', rel: 1.00 },
    { id: 's14', kw: 'so sánh kem chống nắng vật lý và hoá học', vol: 2400, kd: 25, cpc: 1500, intent: 'informational', cluster: 'review', rel: 0.60 },
    { id: 's15', kw: 'kem chống nắng không trôi mồ hôi',     vol: 3800,   kd: 34, cpc: 2900, intent: 'commercial',    cluster: 'use',     rel: 0.85 },
    { id: 's16', kw: 'kem chống nắng cho nam',               vol: 6800,   kd: 41, cpc: 3300, intent: 'commercial',    cluster: 'out',     rel: 0.50 },
    { id: 's17', kw: 'bôi kem chống nắng bao lâu một lần',   vol: 2100,   kd: 22, cpc: 1000, intent: 'informational', cluster: 'guide',   rel: 0.50 },
    { id: 's18', kw: 'kem chống nắng có gây mụn không',      vol: 5200,   kd: 33, cpc: 1500, intent: 'informational', cluster: 'skin',    rel: 0.70 },
    { id: 's19', kw: 'nắng mai có tốt không',                vol: 600,    kd: 8,  cpc: 1200, intent: 'navigational',  cluster: 'brand',   rel: 1.00, own: true },
    { id: 's20', kw: 'kem chống nắng nào tốt cho da dầu mụn', vol: 6400,  kd: 40, cpc: 3500, intent: 'commercial',    cluster: 'skin',    rel: 0.95 },
  ],
  /* Loại nội dung: chi phí sản xuất (VND) và độ khớp với từng ý định. */
  types: {
    product:  { t: 'Trang sản phẩm',        cost: 1500000, fit: { transactional: 1.0, commercial: 0.75, informational: 0.2, navigational: 1.0 } },
    category: { t: 'Trang danh mục',        cost: 2000000, fit: { transactional: 0.85, commercial: 0.9, informational: 0.3, navigational: 0.5 } },
    blog:     { t: 'Bài viết hướng dẫn',    cost: 1250000, fit: { transactional: 0.3, commercial: 0.6, informational: 1.0, navigational: 0.4 } },
    compare:  { t: 'Bài so sánh / review',  cost: 2250000, fit: { transactional: 0.5, commercial: 1.0, informational: 0.6, navigational: 0.4 } },
    faq:      { t: 'Trang hỏi đáp',         cost: 750000, fit: { transactional: 0.3, commercial: 0.4, informational: 0.9, navigational: 0.5 } },
  },
  /* Đối thủ giả lập (không phải tên thật). focus = cụm chủ đề họ đầu tư mạnh. */
  competitors: [
    { id: 'c1', domain: 'nangvang.vn',       auth: 52, focus: ['product', 'review', 'brand'],   note: 'Trang thương mại lớn, mạnh ở review và từ khoá chung.' },
    { id: 'c2', domain: 'dalieuxanh.vn',     auth: 41, focus: ['guide', 'skin'],                 note: 'Blog da liễu, mạnh nội dung kiến thức và theo loại da.' },
    { id: 'c3', domain: 'mypham24h.vn',      auth: 35, focus: ['buy', 'product'],                note: 'Cửa hàng online, mạnh trang danh mục và từ khoá mua hàng.' },
    { id: 'c4', domain: 'reviewlamdep.vn',   auth: 28, focus: ['review', 'use'],                 note: 'Blog review nhỏ, nhiều bài so sánh và theo hoàn cảnh.' },
  ],
  ctr: [0.28, 0.15, 0.10, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018],         // CTR theo vị trí 1–10
  cvr: { transactional: 0.030, commercial: 0.018, informational: 0.0018, navigational: 0.050 },
  months: 12,
};
if (typeof globalThis !== 'undefined') globalThis.LAB_SEO = LAB_SEO;
if (typeof module !== 'undefined') module.exports = LAB_SEO;
