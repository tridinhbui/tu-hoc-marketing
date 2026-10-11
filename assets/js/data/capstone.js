/* BÀI TẬP TỔNG HỢP · Kế hoạch chiến dịch một trang (capstone).
   Một thương hiệu GIẢ LẬP, một bộ số GIẢ LẬP tự khớp nhau. Mọi con số ở đây là MINH HOẠ cho bài tập,
   không phải số liệu hay benchmark thị trường thật.
   Phần "checks" chỉ kiểm tính nhất quán của số và cấu trúc (có số chưa, có thời hạn chưa, cộng có khớp không).
   Không chấm nội dung, không dùng AI. Mọi hàm là hàm thuần: nhận bảng giá trị v, trả kết quả. */
const CAPSTONE = (() => {

/* ---------- đọc số người học gõ: "34tr", "34.000.000", "3,05", "22,3%" ---------- */
function num(raw) {
  if (typeof raw === 'number') return isFinite(raw) ? raw : NaN;
  let s = String(raw == null ? '' : raw).trim().toLowerCase().replace(/\s+/g, '').replace(/đồng|vnd|đơn|khách|tháng|lần|[đ%x×]/g, '');
  let mult = 1;
  if (/(tỷ|tỉ)$/.test(s)) { mult = 1e9; s = s.replace(/(tỷ|tỉ)$/, ''); }
  else if (/(triệu|tr)$/.test(s)) { mult = 1e6; s = s.replace(/(triệu|tr)$/, ''); }
  else if (/k$/.test(s)) { mult = 1e3; s = s.slice(0, -1); }
  let sign = 1; if (/^[-−]/.test(s)) { sign = -1; s = s.slice(1); }
  if (!s) return NaN;
  if (s.includes('.') && s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}([.,]\d{3})+$/.test(s)) s = s.replace(/[.,]/g, '');
  else s = s.replace(',', '.');
  const n = Number(s); return isFinite(n) ? sign * n * mult : NaN;
}
const txt = (x) => String(x == null ? '' : x).trim();
const words = (x) => txt(x).split(/\s+/).filter(Boolean).length;
const hasNum = (x) => /\d/.test(txt(x));
/* "8 tuần", "trong 2 tháng", "hết 3/1", "trước ngày 31/12", "đến tuần 8" */
const hasDeadline = (x) => /(\d+\s*(tuần|tháng|ngày|quý|năm))|(\d{1,2}\/\d{1,2})|((hết|trước|đến|cuối)\s+(tuần|tháng|ngày|quý|năm))/i.test(txt(x));
const near = (a, b, rel = 0.03, abs = 0) => isFinite(a) && isFinite(b) && Math.abs(a - b) <= Math.max(Math.abs(b) * rel, abs);
const R = (ok, why) => ({ ok: !!ok, why: why || '' });
const vnd = (n) => isFinite(n) ? Math.round(n).toLocaleString('vi-VN') + 'đ' : '—';
const n2 = (n) => isFinite(n) ? (Math.round(n * 100) / 100).toLocaleString('vi-VN') : '—';

/* ---------- (a) hồ sơ thương hiệu giả lập ---------- */
const brand = {
  name: 'Mộc Lam',
  what: 'Trà thảo mộc túi lọc (hoa cúc, lạc tiên, sả, gừng) trồng và sấy ở Lâm Đồng. Không caffeine. Hộp 20 túi, giá 150.000đ.',
  where: 'Bán online qua website và một gian hàng trên sàn, giao toàn quốc. Có 2 điểm bán nhỏ ở TP.HCM (Quận 3 và Phú Nhuận).',
  team: 'Chủ thương hiệu + 1 người làm marketing + 2 người đóng gói. Chưa có ai làm pháp chế toàn thời gian.',
  facts: [
    'Nhãn ghi rõ thành phần, nguồn gốc vùng trồng và "không caffeine". Có phiếu kiểm nghiệm an toàn thực phẩm của lô hàng (minh hoạ).',
    'Gian hàng trên sàn: điểm đánh giá 4,8/5 từ 1.200 lượt đánh giá (minh hoạ).',
    '62% khách online là người đi làm 25–35 tuổi ở thành phố lớn (theo địa chỉ giao hàng, minh hoạ).',
    'Lý do mua hay gặp nhất trong ghi chú đơn: "uống buổi tối", "dễ ngủ", "thay cà phê chiều".',
  ],
};

/* Kinh tế một đơn online (trung bình 2 hộp/đơn). Biên lãi đóng góp = phần còn lại sau giá vốn
   và chi phí biến đổi theo đơn, TRƯỚC quảng cáo. Bài dl03 gọi phần này là "biên lãi gộp". */
const unit = {
  aov: 300000,          // giá trị một đơn
  cogs: 105000,         // giá vốn 2 hộp
  fee: 30000,           // phí sàn & cổng thanh toán (10% giá trị đơn)
  shipPack: 45000,      // phí ship shop chịu + hộp, băng keo
  contribution: 120000, // lãi đóng góp một đơn = 300.000 − 105.000 − 30.000 − 45.000
  margin: 0.4,          // biên lãi đóng góp = 120.000 ÷ 300.000
};

/* 3 tháng gần nhất, kênh online. Đơn = mọi đơn; khách mới = người mua lần đầu. */
const history = [
  { m: 'Tháng 7', revenue: 180000000, orders: 600, newCustomers: 300, adSpend: 30000000 },
  { m: 'Tháng 8', revenue: 195000000, orders: 650, newCustomers: 320, adSpend: 32000000 },
  { m: 'Tháng 9', revenue: 210000000, orders: 700, newCustomers: 330, adSpend: 34000000 },
];
const retention = {
  repeat90: 0.4,        // 40% khách mới mua lại trong 90 ngày
  orders12m: 2.5,       // một khách mới trung bình mua 2,5 đơn trong 12 tháng (kể cả đơn đầu)
  ltv: 300000,          // LTV 12 tháng tính bằng lãi đóng góp = 2,5 × 120.000 (không tính bằng doanh thu)
};
const storesNote = 'Hai điểm bán thu khoảng 60 triệu mỗi tháng. Bài tập chỉ lập kế hoạch cho kênh online; điểm bán chỉ để tham khảo.';
const budget = 80000000;  // tổng ngân sách media 8 tuần, chưa gồm lương
const weeks = 8;

/* (f) ràng buộc */
const limits = {
  stock: 3200,             // hộp có sẵn cho online trong 8 tuần
  boxesPerOrder: 2,
  maxOrders: 1600,         // năng lực đóng gói & giao: 200 đơn/tuần × 8 tuần (cũng = 3.200 hộp ÷ 2)
  returningOrders: 650,    // đơn của khách cũ dự kiến trong 8 tuần, không cần quảng cáo
  maxNew: 950,             // chỗ còn lại cho đơn khách mới = 1.600 − 650
  cacBreakevenFirst: 120000, // CAC hoà vốn ngay đơn đầu = lãi đóng góp một đơn (tương đương ROAS 2,5)
  ltvToCac: 3,             // chủ thương hiệu muốn LTV:CAC ≥ 3 để còn tiền trả lương, mặt bằng
  cacCeiling: 100000,      // trần CAC = LTV ÷ 3 = 300.000 ÷ 3
  repeatPerMonth: 15000,   // lãi đóng góp từ phần mua lại, chia đều 12 tháng = (2,5 − 1) × 120.000 ÷ 12
  businessGoal: 'Vào mùa quà Tết với nhiều khách hơn: doanh thu online 8 tuần ≥ 430 triệu (gồm khoảng 650 đơn khách cũ ≈ 195 triệu).',
};

/* (b) phỏng vấn ngắn (giả lập) */
const interviews = [
  { who: 'Chị Thảo, 29 tuổi, nhân viên văn phòng ở Quận 3, đã mua 2 lần',
    say: 'Tối về đầu vẫn chạy chuyện công ty. Hôm nào lỡ uống cà phê chiều là 1 giờ sáng vẫn tỉnh. Mình cần cái gì đó pha lên là thấy "hết giờ làm rồi". Thuốc ngủ thì mình sợ, không dám.' },
  { who: 'Anh Huy, 34 tuổi, kỹ sư phần mềm làm việc từ xa, mua lần đầu',
    say: 'Trước mua trà túi lọc trên sàn mấy lần, mỗi hộp một kiểu, uống thấy nhạt mà không biết trong đó có gì. Giờ mình đọc nhãn kỹ. Ghi rõ thành phần, nguồn gốc thì mới mua.' },
  { who: 'Cô Lan, 55 tuổi, mua tại điểm bán Phú Nhuận',
    say: 'Tôi mua làm quà cho mấy đứa cháu đi làm xa. Hộp đẹp thì biếu được. Mua trên mạng tôi không rành, ra tiệm cho chắc.' },
];

/* (c) đối thủ (tên giả lập) */
const competitors = [
  { name: 'Trà Đồi Xanh', price: '45.000đ / hộp 25 túi', pos: 'Trà xanh uống hằng ngày, giá rẻ, ai cũng mua được', ch: 'Siêu thị, sàn thương mại điện tử' },
  { name: 'Hoa Mộc', price: '220.000đ / hộp 20 túi', pos: 'Trà hoa nhập khẩu, hộp sang, để làm quà', ch: 'Instagram, cửa hàng quà tặng' },
  { name: 'An Thần Trà', price: '120.000đ / hộp 20 túi', pos: 'Nói mạnh về "giúp ngủ ngon" — nhiều đánh giá chê "không thấy tác dụng như quảng cáo"', ch: 'TikTok Shop, KOC' },
];

/* (d) benchmark kênh GIẢ LẬP.
   Cách tính: CPM → hiển thị = chi ÷ CPM × 1.000; nhấp = hiển thị × CTR. CPC → nhấp = chi ÷ CPC; hiển thị = nhấp ÷ CTR.
   Đơn = nhấp × tỉ lệ chuyển đổi (CVR). cap = mức chi hợp lý tối đa trong 8 tuần; chi quá mức này thì chi phí biên
   (chi phí cho đơn TIẾP THEO) thường tăng, bài tập không mô hình hoá phần đó nên chỉ cảnh báo. */
const benchNote = 'Số minh hoạ trong bài tập, không phải benchmark thị trường.';
const channels = [
  { id: 'fb', t: 'Facebook / Instagram', model: 'cpm', cpm: 40000, ctr: 0.016, cvr: 0.025, cap: 40000000, role: 'Tiếp cận rộng nhóm người đi làm, nhắm lại người đã xem' },
  { id: 'tt', t: 'TikTok', model: 'cpm', cpm: 25000, ctr: 0.010, cvr: 0.020, cap: 30000000, role: 'Video ngắn, rẻ trên mỗi lượt hiển thị nhưng chuyển đổi thấp hơn' },
  { id: 'gg', t: 'Google Search', model: 'cpc', cpc: 4000, ctr: 0.06, cvr: 0.05, cap: 16000000, role: 'Bắt người đang tìm "trà thảo mộc", "trà dễ ngủ" — nhu cầu có hạn' },
  { id: 'zl', t: 'Zalo (Zalo Ads + OA)', model: 'cpc', cpc: 2000, ctr: 0.008, cvr: 0.018, cap: 10000000, role: 'Tệp lớn tuổi hơn, hợp với quà tặng; nối sang OA để chăm khách' },
  { id: 'koc', t: 'KOC / affiliate', model: 'cpm', cpm: 60000, ctr: 0.02, cvr: 0.03, cap: 15000000, role: 'Người dùng thật kể trải nghiệm; phí đăng bài quy đổi ra CPM' },
];

/* (e) lịch mùa vụ 8 tuần (giả định tuần 1 bắt đầu thứ Hai 9/11) */
const calendar = [
  { w: 1, d: '9–15/11', e: 'Ngày đôi 11/11 trên sàn: lưu lượng cao, giá quảng cáo cao' },
  { w: 2, d: '16–22/11', e: '20/11 Ngày Nhà giáo: nhu cầu quà tặng' },
  { w: 3, d: '23–29/11', e: 'Black Friday cuối tuần: mọi thương hiệu cùng giảm giá' },
  { w: 4, d: '30/11–6/12', e: 'Miền Bắc trở lạnh: đồ uống nóng được tìm nhiều hơn (minh hoạ)' },
  { w: 5, d: '7–13/12', e: 'Ngày đôi 12/12 trên sàn' },
  { w: 6, d: '14–20/12', e: 'Chạy deadline cuối năm: người đi làm căng thẳng, ngủ muộn' },
  { w: 7, d: '21–27/12', e: 'Giáng sinh: quà tặng nhỏ' },
  { w: 8, d: '28/12–3/1', e: 'Tết Dương lịch; doanh nghiệp bắt đầu đặt quà Tết' },
];

/* STP: ba phân khúc và năm tiêu chí chấm 1–5 */
const segments = [
  { id: 'A', t: 'Người đi làm 25–35 tuổi ở thành phố, khó "tắt máy" buổi tối, mua online' },
  { id: 'B', t: 'Người mua quà biếu dịp lễ (20/11, Giáng sinh, Tết) cho thầy cô, đồng nghiệp, người thân' },
  { id: 'C', t: 'Người trên 50 tuổi quan tâm sức khoẻ, quen mua ở cửa hàng' },
];
const criteria = [
  { id: 'm', t: 'Đo lường được', h: 'Đếm được quy mô, đo được hành vi qua dữ liệu có sẵn' },
  { id: 's', t: 'Đủ lớn', h: 'Đủ khách để lấp 800–950 đơn mới trong 8 tuần' },
  { id: 'a', t: 'Tiếp cận được', h: 'Có kênh trong bảng benchmark chạm tới họ với chi phí chịu được' },
  { id: 'd', t: 'Khác biệt', h: 'Nhu cầu của họ khác các nhóm kia, đủ để nói một thông điệp riêng' },
  { id: 'x', t: 'Hành động được', h: 'Đội 4 người, ngân sách 80 triệu làm được ngay' },
];

/* ---------- công cụ tính (dùng chung cho trang, checks và test) ---------- */
function channelCalc(ch, spendRaw) {
  const spend = Math.max(0, num(spendRaw) || 0);
  let imps, clicks;
  if (ch.model === 'cpm') { imps = spend / ch.cpm * 1000; clicks = imps * ch.ctr; }
  else { clicks = spend / ch.cpc; imps = clicks / ch.ctr; }
  const orders = clicks * ch.cvr;
  return { id: ch.id, t: ch.t, spend, imps, clicks, orders, cac: orders > 0 ? spend / orders : NaN, overCap: spend > ch.cap };
}
function calc(v) {
  v = v || {};
  const rows = channels.map((ch) => channelCalc(ch, v['al_' + ch.id]));
  const spend = rows.reduce((n, r) => n + r.spend, 0);
  const orders = rows.reduce((n, r) => n + r.orders, 0);
  const cac = orders > 0 ? spend / orders : NaN;
  const revenue = orders * unit.aov;                 // doanh thu đơn đầu của khách mới
  const contrib = orders * unit.contribution;        // lãi đóng góp trước quảng cáo
  const net = contrib - spend;                       // lãi đóng góp sau quảng cáo
  const roas = spend > 0 ? revenue / spend : NaN;
  const roasBE = 1 / unit.margin;                    // ROAS hoà vốn = 1 ÷ biên lãi đóng góp
  const roi = spend > 0 ? net / spend : NaN;         // ROI chiến dịch, chỉ tính đơn đầu
  const ltvNet = orders * retention.ltv - spend;
  const roiLtv = spend > 0 ? ltvNet / spend : NaN;   // ROI nếu tính cả mua lại 12 tháng
  const payback = !isFinite(cac) ? NaN : cac <= unit.contribution ? 0 : (cac - unit.contribution) / limits.repeatPerMonth;
  const ltvCac = isFinite(cac) && cac > 0 ? retention.ltv / cac : NaN;
  const lossBudget = rows.filter((r) => r.spend > 0 && r.cac > limits.cacBreakevenFirst).reduce((n, r) => n + r.spend, 0);
  return { rows, spend, orders, cac, revenue, contrib, net, roas, roasBE, roi, ltvNet, roiLtv, payback, ltvCac, lossBudget };
}

/* ---------- 8 phần của kế hoạch ---------- */
const kpiRows = [1, 2, 3];
const parts = [
  { id: 'p1', n: 1, t: 'Vấn đề kinh doanh & mục tiêu đo được',
    q: 'Doanh nghiệp đang kẹt ở đâu, bằng con số? Sau 8 tuần, con số nào phải khác đi để biết chiến dịch có ích?',
    hint: 'SMART = cụ thể, đo được, khả thi, gắn với mục tiêu kinh doanh, có thời hạn. "Tăng nhận biết" chưa phải mục tiêu; "800 khách mới trong 8 tuần, CAC ≤ 100.000đ" mới là mục tiêu.',
    learn: ['B:gt05-01', 'B:gt06-02'],
    fields: [
      { id: 'p1_problem', type: 'area', label: 'Vấn đề kinh doanh (dùng số trong hồ sơ)', ph: 'Ví dụ: khách mới mỗi tháng đứng ở mức…, trong khi CAC đã…' },
      { id: 'p1_biz', type: 'area', label: 'Mục tiêu kinh doanh mà chiến dịch phục vụ', ph: 'Doanh thu, số khách, lãi… của cả doanh nghiệp' },
      { id: 'p1_goal', type: 'area', label: 'Mục tiêu marketing SMART (một câu, có số và thời hạn)', ph: 'Trong … tuần, có … khách mới …, CAC trung bình ≤ …' },
      { id: 'p1_new', type: 'num', label: 'Số khách mới mục tiêu trong 8 tuần', unit: 'khách' },
      { id: 'p1_cac', type: 'num', label: 'CAC trung bình mục tiêu', unit: 'đ', hint: 'CAC (chi phí có một khách mới) = tiền quảng cáo ÷ số khách mới.' },
    ] },
  { id: 'p2', n: 2, t: 'Chọn phân khúc (STP)',
    q: 'Ba nhóm khách đều có vẻ hứa hẹn. Chấm từng nhóm theo năm tiêu chí, rồi chọn một nhóm để nói chuyện trước.',
    hint: 'STP = phân khúc (Segmentation), chọn mục tiêu (Targeting), định vị (Positioning). Chấm 1 (rất yếu) đến 5 (rất mạnh). Dựa vào hồ sơ, phỏng vấn và bảng kênh — không dựa vào cảm tình.',
    learn: ['B:kh02-01', 'B:kh01-05'],
    tool: 'stp',
    fields: [
      { id: 'p2_pick', type: 'select', label: 'Phân khúc bạn chọn', opts: segments.map((s) => [s.id, s.id + ' · ' + s.t]) },
      { id: 'p2_why', type: 'area', label: 'Vì sao chọn nhóm này (bắt buộc nếu không phải nhóm điểm cao nhất)', ph: 'Một đến hai câu' },
    ] },
  { id: 'p3', n: 3, t: 'Insight & câu định vị',
    q: 'Khách mục tiêu đang mắc ở đâu, theo lời của chính họ? Mộc Lam đứng ở đâu so với lựa chọn thay thế?',
    hint: 'Insight là một sự thật về con người có căng thẳng bên trong ("muốn… nhưng…"), không phải dữ kiện ("khách mua buổi tối"). Câu định vị 4 vế: Với [ai], [thương hiệu] là [hệ quy chiếu — họ so mình với gì] mang lại [lợi ích khác biệt], vì [lý do để tin].',
    learn: ['B:kh04-01', 'B:tp01-01'],
    fields: [
      { id: 'p3_insight', type: 'area', label: 'Insight (một câu, có "muốn… nhưng…")' },
      { id: 'p3_who', type: 'text', label: 'Vế 1 · Với ai' },
      { id: 'p3_frame', type: 'text', label: 'Vế 2 · Hệ quy chiếu (khách so Mộc Lam với gì)' },
      { id: 'p3_benefit', type: 'text', label: 'Vế 3 · Lợi ích khác biệt' },
      { id: 'p3_rtb', type: 'text', label: 'Vế 4 · Lý do để tin (bằng chứng có thật trong hồ sơ)' },
    ] },
  { id: 'p4', n: 4, t: 'Thông điệp, bằng chứng và điều không nói',
    q: 'Nếu khách chỉ nhớ một câu, đó là câu gì? Ba thứ gì làm họ tin? Điều gì tuyệt đối không nói?',
    hint: 'Một thông điệp, tối đa 20 chữ. Bằng chứng phải kiểm được (nhãn, phiếu kiểm nghiệm, đánh giá thật). "Điều không nói" thường là câu dễ bán nhưng không chứng minh được — với trà thảo mộc, đó là lời hứa chữa bệnh.',
    learn: ['B:gt05-05', 'B:gt05-06'],
    fields: [
      { id: 'p4_msg', type: 'text', label: 'Thông điệp chính (≤ 20 chữ)' },
      { id: 'p4_proof1', type: 'text', label: 'Bằng chứng 1' },
      { id: 'p4_proof2', type: 'text', label: 'Bằng chứng 2' },
      { id: 'p4_proof3', type: 'text', label: 'Bằng chứng 3' },
      { id: 'p4_not', type: 'area', label: 'Điều KHÔNG nói (và vì sao)' },
    ] },
  { id: 'p5', n: 5, t: 'Kênh & phân bổ ngân sách',
    q: 'Chia 80 triệu cho năm kênh. Bảng tự tính: hiển thị → nhấp → đơn → CAC từng kênh.',
    hint: 'Gõ số tiền, ví dụ "20tr" hoặc "20.000.000". CPM = chi phí cho 1.000 lượt hiển thị; CPC = chi phí một lượt nhấp; CTR = nhấp ÷ hiển thị; CVR = đơn ÷ nhấp. Kênh rẻ trên mỗi hiển thị chưa chắc rẻ trên mỗi đơn.',
    learn: ['B:dl02-01', 'B:kn07-04'],
    tool: 'alloc',
    fields: [
      ...channels.map((ch) => ({ id: 'al_' + ch.id, type: 'num', label: ch.t, unit: 'đ', alloc: true })),
      { id: 'p5_roles', type: 'area', label: 'Vai trò của từng kênh (một dòng mỗi kênh)', ph: 'Kênh nào để bắt nhu cầu có sẵn, kênh nào để mở rộng, kênh nào chỉ để thử?' },
    ] },
  { id: 'p6', n: 6, t: 'KPI & đo lường',
    q: 'Tuần nào thì biết đang tụt? Đo bằng gì, gắn mã thế nào, và đến ngưỡng nào thì làm gì?',
    hint: 'Chỉ báo sớm (leading) đến trước và báo hiệu kết quả — CTR, chi phí mỗi lượt thêm giỏ. Chỉ báo muộn (lagging) là kết quả — khách mới, CAC, doanh thu. UTM là đoạn gắn vào đường link (utm_source, utm_medium, utm_campaign) để công cụ đo biết khách đến từ đâu.',
    learn: ['B:gt06-04', 'B:dl06-05'],
    fields: [
      ...kpiRows.flatMap((i) => [
        { id: `k${i}_name`, type: 'text', label: `KPI ${i} · Tên chỉ số`, row: i },
        { id: `k${i}_type`, type: 'select', label: `KPI ${i} · Loại`, opts: [['sớm', 'Chỉ báo sớm'], ['muộn', 'Chỉ báo muộn']], row: i },
        { id: `k${i}_target`, type: 'text', label: `KPI ${i} · Mục tiêu (có số)`, row: i },
      ]),
      { id: 'p6_utm', type: 'text', label: 'Mẫu UTM cho một link quảng cáo', ph: '?utm_source=…&utm_medium=…&utm_campaign=…' },
      { id: 'p6_action', type: 'area', label: 'Ngưỡng hành động (nếu chỉ số … thì làm …)' },
    ] },
  { id: 'p7', n: 7, t: 'Dự báo tài chính',
    q: 'Tự tính từ phân bổ ở phần 5, gõ kết quả của bạn, rồi đối chiếu với bảng của trang.',
    hint: 'Doanh thu = đơn × 300.000đ. Lãi đóng góp sau quảng cáo = đơn × 120.000đ − chi. ROAS = doanh thu ÷ chi. ROAS hoà vốn = 1 ÷ biên lãi đóng góp. ROI = lãi sau quảng cáo ÷ chi. Hoàn vốn: CAC ≤ 120.000đ thì đơn đầu đã trả đủ (0 tháng); nếu cao hơn thì phần thiếu ÷ 15.000đ mỗi tháng từ mua lại.',
    learn: ['B:dl03-02', 'B:dl02-05'],
    tool: 'forecast',
    fields: [
      { id: 'f_orders', type: 'num', label: 'Tổng đơn khách mới', unit: 'đơn' },
      { id: 'f_cac', type: 'num', label: 'CAC trung bình', unit: 'đ' },
      { id: 'f_rev', type: 'num', label: 'Doanh thu từ đơn đầu', unit: 'đ' },
      { id: 'f_net', type: 'num', label: 'Lãi đóng góp sau quảng cáo', unit: 'đ' },
      { id: 'f_roas', type: 'num', label: 'ROAS dự báo', unit: '×' },
      { id: 'f_roasbe', type: 'num', label: 'ROAS hoà vốn', unit: '×' },
      { id: 'f_roi', type: 'num', label: 'ROI (chỉ đơn đầu)', unit: '%' },
      { id: 'f_payback', type: 'num', label: 'Thời gian hoàn vốn CAC', unit: 'tháng' },
    ] },
  { id: 'p8', n: 8, t: 'Rủi ro, tiêu chí dừng & tuân thủ',
    q: 'Điều gì có thể hỏng? Đến con số nào thì dừng hoặc chuyển tiền? Đã soát những rủi ro pháp lý phổ biến chưa?',
    hint: 'Tiêu chí dừng viết TRƯỚC khi chạy, bằng số và thời hạn, để khi có kết quả không ai kéo mốc về phía mình. Phần tuân thủ dưới đây chỉ là gợi nhớ chung, không phải tư vấn pháp lý — điều gì chưa chắc, hỏi pháp chế.',
    learn: ['B:tn01-06', 'B:kh08-08'],
    fields: [
      { id: 'p8_risk1', type: 'text', label: 'Rủi ro 1 và cách đỡ' },
      { id: 'p8_risk2', type: 'text', label: 'Rủi ro 2 và cách đỡ' },
      { id: 'p8_stop', type: 'area', label: 'Tiêu chí dừng / chuyển tiền (có số, có thời hạn)' },
      { id: 'p8_c_claim', type: 'check', label: 'Mọi tuyên bố về sản phẩm đều có bằng chứng; không nói như thuốc chữa bệnh' },
      { id: 'p8_c_promo', type: 'check', label: 'Khuyến mại ghi rõ điều kiện, thời hạn, số lượng' },
      { id: 'p8_c_data', type: 'check', label: 'Dữ liệu khách (số điện thoại, Zalo) chỉ dùng khi khách đã đồng ý' },
    ] },
];

/* Ô chấm phân khúc sinh tự động: sc_<phân khúc>_<tiêu chí> */
const scoreFields = segments.flatMap((s) => criteria.map((c) => ({ id: `sc_${s.id}_${c.id}`, type: 'score', label: `${s.id} · ${c.t}`, part: 'p2' })));
function fieldList() {
  return [...parts.flatMap((p) => p.fields.map((f) => ({ ...f, part: p.id }))), ...scoreFields];
}
function segTotals(v) {
  return segments.map((s) => {
    const sc = criteria.map((c) => num(v[`sc_${s.id}_${c.id}`]));
    const ok = sc.every((x) => x >= 1 && x <= 5);
    return { id: s.id, total: sc.reduce((n, x) => n + (isFinite(x) ? x : 0), 0), complete: ok };
  });
}
function isFilled(f, val) {
  if (f.type === 'check') return val === true;
  if (f.type === 'num' || f.type === 'score') return isFinite(num(val)) && (f.alloc ? true : num(val) !== 0 || f.id === 'f_payback');
  return txt(val).length > 0;
}
/* Tỉ lệ ô đã điền (ô phân bổ ngân sách tính là đã điền khi có số, kể cả 0). */
function filled(v) {
  v = v || {};
  const fs = fieldList();
  const have = fs.filter((f) => isFilled(f, v[f.id])).length;
  return { have, total: fs.length, pct: have / fs.length };
}

/* ---------- checks: chỉ số và cấu trúc, không chấm nội dung ---------- */
const kpis = (v) => kpiRows.map((i) => ({ name: txt(v[`k${i}_name`]), type: txt(v[`k${i}_type`]), target: txt(v[`k${i}_target`]) }))
  .filter((k) => k.name);
const allocEntered = (v) => channels.some((ch) => txt(v['al_' + ch.id]) !== '');
const cmp = (label, mine, right, fmtF, rel = 0.03, abs = 0) => (v) => {
  const c = calc(v), m = num(v[mine]);
  if (!allocEntered(v)) return R(false, 'chưa có phân bổ ở phần 5 để đối chiếu');
  if (!isFinite(m)) return R(false, `chưa gõ ${label}`);
  const r = right(c);
  return near(m, r, rel, abs) ? R(true, `${label} khớp (${fmtF(r)})`) : R(false, `${label} bạn ghi ${fmtF(m)}, tính lại từ phân bổ ra ${fmtF(r)}`);
};

const checks = {
  p1: [
    { id: 'goal-smart', t: 'Mục tiêu có con số và thời hạn', fn: (v) =>
      !txt(v.p1_goal) ? R(false, 'chưa viết mục tiêu') :
      !hasNum(v.p1_goal) ? R(false, 'mục tiêu chưa có con số') :
      !hasDeadline(v.p1_goal) ? R(false, 'mục tiêu chưa có thời hạn (ví dụ "trong 8 tuần", "trước 3/1")') : R(true) },
    { id: 'goal-biz', t: 'Có mục tiêu kinh doanh bằng số', fn: (v) =>
      hasNum(v.p1_biz) ? R(true) : R(false, 'mục tiêu kinh doanh chưa có con số — chiến dịch phục vụ con số nào của doanh nghiệp?') },
    { id: 'goal-capacity', t: 'Số khách mới không vượt năng lực giao hàng', fn: (v) => {
      const n = num(v.p1_new);
      if (!isFinite(n) || n <= 0) return R(false, 'chưa ghi số khách mới mục tiêu');
      return n <= limits.maxNew ? R(true) : R(false, `${n2(n)} khách mới vượt chỗ còn lại ${limits.maxNew} đơn (kho và đóng gói)`); } },
    { id: 'goal-cac', t: 'CAC mục tiêu không vượt trần chịu được', fn: (v) => {
      const n = num(v.p1_cac);
      if (!isFinite(n) || n <= 0) return R(false, 'chưa ghi CAC mục tiêu');
      return n <= limits.cacCeiling ? R(true) : R(false, `CAC ${vnd(n)} cao hơn trần ${vnd(limits.cacCeiling)} (LTV ÷ 3)`); } },
  ],
  p2: [
    { id: 'stp-scored', t: 'Đã chấm đủ 3 phân khúc × 5 tiêu chí (1–5)', fn: (v) => {
      const miss = segTotals(v).filter((s) => !s.complete).map((s) => s.id);
      return miss.length ? R(false, `còn thiếu điểm ở phân khúc ${miss.join(', ')}`) : R(true); } },
    { id: 'stp-pick', t: 'Lựa chọn khớp bảng điểm hoặc có lý do', fn: (v) => {
      const pick = txt(v.p2_pick); if (!pick) return R(false, 'chưa chọn phân khúc');
      const tot = segTotals(v), best = Math.max(...tot.map((s) => s.total)), mine = tot.find((s) => s.id === pick);
      if (mine && mine.total === best) return R(true, `phân khúc ${pick} có tổng điểm cao nhất (${best})`);
      return words(v.p2_why) >= 8 ? R(true, 'không phải nhóm điểm cao nhất, nhưng có ghi lý do') : R(false, `bạn chọn ${pick} nhưng nhóm khác điểm cao hơn — ghi lý do (≥ 8 chữ)`); } },
  ],
  p3: [
    { id: 'insight-tension', t: 'Insight có căng thẳng "muốn… nhưng…"', fn: (v) =>
      words(v.p3_insight) < 8 ? R(false, 'insight chưa thành câu (dưới 8 chữ)') :
      /(nhưng|mà lại|lại sợ|ngại|sợ|không muốn)/i.test(txt(v.p3_insight)) ? R(true) : R(false, 'chưa thấy vế mâu thuẫn ("nhưng", "sợ", "ngại"…) — có thể đang là dữ kiện') },
    { id: 'pos-4', t: 'Câu định vị đủ 4 vế', fn: (v) => {
      const miss = [['p3_who', 'với ai'], ['p3_frame', 'hệ quy chiếu'], ['p3_benefit', 'lợi ích'], ['p3_rtb', 'lý do để tin']].filter(([k]) => !txt(v[k])).map(([, t]) => t);
      return miss.length ? R(false, 'thiếu vế: ' + miss.join(', ')) : R(true); } },
  ],
  p4: [
    { id: 'msg-one', t: 'Một thông điệp, tối đa 20 chữ', fn: (v) =>
      !txt(v.p4_msg) ? R(false, 'chưa có thông điệp') : words(v.p4_msg) <= 20 ? R(true) : R(false, `thông điệp dài ${words(v.p4_msg)} chữ`) },
    { id: 'msg-proof', t: 'Đủ 3 bằng chứng', fn: (v) => {
      const n = ['p4_proof1', 'p4_proof2', 'p4_proof3'].filter((k) => txt(v[k])).length;
      return n === 3 ? R(true) : R(false, `mới có ${n}/3 bằng chứng`); } },
    { id: 'msg-not', t: 'Có ghi điều KHÔNG nói', fn: (v) => txt(v.p4_not) ? R(true) : R(false, 'chưa ghi điều không nói') },
  ],
  p5: [
    { id: 'alloc-sum', t: 'Tổng phân bổ bằng ngân sách 80 triệu', fn: (v) => {
      const c = calc(v);
      if (!allocEntered(v)) return R(false, 'chưa phân bổ');
      return Math.abs(c.spend - budget) < 1 ? R(true) : R(false, `tổng đang là ${vnd(c.spend)}, ${c.spend > budget ? 'thừa' : 'thiếu'} ${vnd(Math.abs(c.spend - budget))}`); } },
    { id: 'alloc-cap', t: 'Không kênh nào vượt mức chi hợp lý', fn: (v) => {
      if (!allocEntered(v)) return R(false, 'chưa phân bổ');
      const over = calc(v).rows.filter((r) => r.overCap).map((r) => r.t);
      return over.length ? R(false, `${over.join(', ')} vượt mức chi tối đa — chi phí biên sẽ tăng, số dự báo đang lạc quan`) : R(true); } },
    { id: 'alloc-cac', t: 'CAC trung bình không vượt trần', fn: (v) => {
      const c = calc(v); if (!(c.orders > 0)) return R(false, 'chưa có đơn dự kiến');
      return c.cac <= limits.cacCeiling ? R(true, `CAC trung bình ${vnd(c.cac)}`) : R(false, `CAC trung bình ${vnd(c.cac)} vượt trần ${vnd(limits.cacCeiling)} — cảnh báo, không chặn`); } },
    { id: 'alloc-capacity', t: 'Tổng đơn mới không vượt năng lực giao hàng', fn: (v) => {
      const c = calc(v); if (!(c.orders > 0)) return R(false, 'chưa có đơn dự kiến');
      return c.orders <= limits.maxNew ? R(true) : R(false, `${n2(c.orders)} đơn mới vượt chỗ còn lại ${limits.maxNew} đơn`); } },
    { id: 'alloc-loss', t: 'Kênh lỗ ngay đơn đầu chỉ ở mức thử (≤ 20% ngân sách)', fn: (v) => {
      const c = calc(v); if (!allocEntered(v)) return R(false, 'chưa phân bổ');
      return c.lossBudget <= budget * 0.2 ? R(true) : R(false, `${vnd(c.lossBudget)} đang ở kênh có CAC > ${vnd(limits.cacBreakevenFirst)}`); } },
  ],
  p6: [
    { id: 'kpi-lead', t: 'Có ít nhất 1 chỉ báo sớm có mục tiêu bằng số', fn: (v) =>
      kpis(v).some((k) => k.type === 'sớm' && hasNum(k.target)) ? R(true) : R(false, 'chưa có chỉ báo sớm kèm con số') },
    { id: 'kpi-lag', t: 'Có ít nhất 1 chỉ báo muộn có mục tiêu bằng số', fn: (v) =>
      kpis(v).some((k) => k.type === 'muộn' && hasNum(k.target)) ? R(true) : R(false, 'chưa có chỉ báo muộn kèm con số') },
    { id: 'kpi-utm', t: 'UTM có đủ source, medium, campaign', fn: (v) => {
      const u = txt(v.p6_utm).toLowerCase(), miss = ['utm_source', 'utm_medium', 'utm_campaign'].filter((k) => !u.includes(k));
      return miss.length ? R(false, 'thiếu ' + miss.join(', ')) : R(true); } },
    { id: 'kpi-action', t: 'Ngưỡng hành động có con số', fn: (v) => hasNum(v.p6_action) ? R(true) : R(false, 'ngưỡng hành động chưa có số') },
  ],
  p7: [
    { id: 'fc-orders', t: 'Tổng đơn khớp phân bổ', fn: cmp('tổng đơn', 'f_orders', (c) => c.orders, n2, 0.02, 1) },
    { id: 'fc-cac', t: 'CAC trung bình khớp phân bổ', fn: cmp('CAC', 'f_cac', (c) => c.cac, vnd) },
    { id: 'fc-cac-self', t: 'CAC của bạn = chi ÷ đơn của chính bạn', fn: (v) => {
      const o = num(v.f_orders), m = num(v.f_cac);
      if (!(o > 0) || !isFinite(m)) return R(false, 'chưa gõ đơn hoặc CAC');
      return near(m, budget / o, 0.02) ? R(true) : R(false, `${vnd(budget)} ÷ ${n2(o)} đơn = ${vnd(budget / o)}, không phải ${vnd(m)}`); } },
    { id: 'fc-rev', t: 'Doanh thu khớp', fn: cmp('doanh thu', 'f_rev', (c) => c.revenue, vnd) },
    { id: 'fc-net', t: 'Lãi đóng góp sau quảng cáo khớp', fn: cmp('lãi sau quảng cáo', 'f_net', (c) => c.net, vnd, 0.05, 500000) },
    { id: 'fc-roas', t: 'ROAS khớp', fn: cmp('ROAS', 'f_roas', (c) => c.roas, n2, 0.03) },
    { id: 'fc-roasbe', t: 'ROAS hoà vốn đúng', fn: cmp('ROAS hoà vốn', 'f_roasbe', (c) => c.roasBE, n2, 0.01) },
    { id: 'fc-roi', t: 'ROI khớp', fn: cmp('ROI (%)', 'f_roi', (c) => c.roi * 100, n2, 0.05, 0.5) },
    { id: 'fc-payback', t: 'Thời gian hoàn vốn khớp', fn: cmp('số tháng hoàn vốn', 'f_payback', (c) => c.payback, n2, 0.05, 0.3) },
    { id: 'roas-be', t: 'ROAS dự báo cao hơn ROAS hoà vốn', fn: (v) => {
      const c = calc(v); if (!(c.spend > 0)) return R(false, 'chưa có phân bổ');
      return c.roas > c.roasBE ? R(true, `${n2(c.roas)} > ${n2(c.roasBE)}`) : R(false, `ROAS ${n2(c.roas)} chưa qua hoà vốn ${n2(c.roasBE)}: mỗi đơn đầu đang lỗ`); } },
    { id: 'goal-vs-fc', t: 'Mục tiêu khách mới (phần 1) không cao hơn dự báo', fn: (v) => {
      const c = calc(v), g = num(v.p1_new); if (!(c.orders > 0) || !isFinite(g)) return R(false, 'chưa có mục tiêu hoặc phân bổ');
      return g <= c.orders * 1.02 ? R(true) : R(false, `mục tiêu ${n2(g)} khách nhưng phân bổ chỉ mang về khoảng ${n2(c.orders)}`); } },
  ],
  p8: [
    { id: 'risk-2', t: 'Có ít nhất 2 rủi ro', fn: (v) => (txt(v.p8_risk1) && txt(v.p8_risk2)) ? R(true) : R(false, 'cần 2 rủi ro, mỗi rủi ro kèm cách đỡ') },
    { id: 'stop-num', t: 'Tiêu chí dừng có con số và thời hạn', fn: (v) =>
      !hasNum(v.p8_stop) ? R(false, 'tiêu chí dừng chưa có con số') : !hasDeadline(v.p8_stop) ? R(false, 'tiêu chí dừng chưa có mốc thời gian') : R(true) },
    { id: 'legal', t: 'Đã soát 3 câu hỏi tuân thủ', fn: (v) => {
      const miss = ['p8_c_claim', 'p8_c_promo', 'p8_c_data'].filter((k) => v[k] !== true).length;
      return miss ? R(false, `còn ${miss} mục chưa soát — chưa chắc thì hỏi pháp chế`) : R(true); } },
  ],
};
function runChecks(v) {
  v = v || {};
  return parts.flatMap((p) => (checks[p.id] || []).map((c) => {
    let r; try { r = c.fn(v); } catch (e) { r = R(false, 'lỗi khi kiểm: ' + e.message); }
    return { part: p.id, id: c.id, t: c.t, ok: r.ok, why: r.why };
  }));
}

/* ---------- rubric: 10 tiêu chí × 3 mức, người học tự chấm ---------- */
const levels = ['Chưa đạt', 'Đạt', 'Tốt'];
const rubric = [
  { id: 'r1', t: 'Vấn đề kinh doanh', learn: ['B:gt05-01', 'B:gt06-01'],
    l: ['Mô tả hoạt động ("cần làm TikTok") thay vì vấn đề; không có số.', 'Nêu vấn đề bằng một con số trong hồ sơ.', 'Nêu vấn đề bằng số, chỉ ra chỗ kẹt (khách mới đứng yên, CAC chạm trần) và hệ quả nếu không làm.'] },
  { id: 'r2', t: 'Mục tiêu SMART gắn kinh doanh', learn: ['B:gt06-02', 'B:gt06-03'],
    l: ['Mục tiêu thiếu số hoặc thiếu hạn, hoặc là chỉ số phù phiếm (follower, lượt xem).', 'Có số, có hạn, đo được bằng dữ liệu có sẵn.', 'Có số, có hạn, nằm trong ràng buộc (kho, CAC trần) và nối thẳng vào mục tiêu doanh thu.'] },
  { id: 'r3', t: 'Chọn phân khúc', learn: ['B:kh02-01', 'B:kh02-07'],
    l: ['Chọn theo cảm tình; chấm điểm cho có hoặc bỏ trống.', 'Chấm đủ, chọn theo điểm.', 'Điểm dựa trên bằng chứng cụ thể (phỏng vấn, % khách, kênh) và nói được nhóm nào bị bỏ lại, vì sao.'] },
  { id: 'r4', t: 'Insight', learn: ['B:kh04-01', 'B:kh04-09'],
    l: ['Viết dữ kiện ("khách mua buổi tối") hoặc mong muốn chung ("muốn khoẻ").', 'Có căng thẳng "muốn… nhưng…" và đúng nhóm đã chọn.', 'Căng thẳng lấy từ lời khách trong phỏng vấn, đủ sắc để gợi ra ý tưởng.'] },
  { id: 'r5', t: 'Định vị', learn: ['B:tp01-01', 'B:tp01-02'],
    l: ['Thiếu vế, hoặc lợi ích đối thủ nào cũng nói được.', 'Đủ 4 vế, hệ quy chiếu rõ.', 'Đủ 4 vế; lợi ích khác đối thủ trong bảng; lý do để tin là thứ có thật trong hồ sơ.'] },
  { id: 'r6', t: 'Thông điệp và bằng chứng', learn: ['B:gt05-05', 'B:gt05-06'],
    l: ['Nhiều thông điệp; bằng chứng là tính từ ("chất lượng cao").', 'Một thông điệp; 3 bằng chứng kiểm được.', 'Một thông điệp nối với insight; bằng chứng kiểm được; ghi rõ câu không nói và vì sao (rủi ro pháp lý, niềm tin).'] },
  { id: 'r7', t: 'Kênh và ngân sách', learn: ['B:dl02-01', 'B:kn07-04'],
    l: ['Chia đều hoặc theo cảm tính; tổng lệch ngân sách.', 'Tổng khớp; xem CAC từng kênh khi chia.', 'Ưu tiên kênh rẻ trên mỗi đơn đến mức trần chi; kênh đắt chỉ ở mức thử và có vai trò rõ.'] },
  { id: 'r8', t: 'KPI và đo lường', learn: ['B:gt06-04', 'B:dl06-05'],
    l: ['Chỉ có kết quả cuối, hoặc KPI không có số.', 'Có chỉ báo sớm và muộn kèm số; có UTM.', 'Chỉ báo sớm nối được với kết quả; UTM đặt tên nhất quán; ngưỡng hành động nói rõ ai làm gì.'] },
  { id: 'r9', t: 'Dự báo tài chính', learn: ['B:dl03-02', 'B:dl02-05'],
    l: ['Tính sai hoặc lấy ROAS làm lợi nhuận.', 'Các con số khớp bảng tự tính; so được ROAS với hoà vốn.', 'Khớp, và nói được độ mong manh: CVR giảm một nửa thì CAC, ROI còn bao nhiêu.'] },
  { id: 'r10', t: 'Rủi ro, tiêu chí dừng, tuân thủ', learn: ['B:tn01-06', 'B:kh08-08'],
    l: ['Không có tiêu chí dừng, hoặc tiêu chí không có số.', 'Tiêu chí dừng có số và hạn; đã soát 3 câu tuân thủ.', 'Mỗi rủi ro có người theo dõi và phương án; tiêu chí dừng gắn từng kênh; điều chưa chắc ghi "hỏi pháp chế".'] },
];

/* ---------- worked example: điền đủ, tính đúng cho chính bộ số trên ---------- */
const example = {
  p1_problem: 'Khách mới online đứng ở 300–330 mỗi tháng suốt quý 3, trong khi CAC đã lên khoảng 100.000đ (34 triệu ÷ 330 khách ở tháng 9) — chạm trần chịu được. Muốn có thêm khách trước mùa quà Tết mà không đẩy CAC lên.',
  p1_biz: 'Doanh thu online 8 tuần ≥ 430 triệu (khoảng 195 triệu từ khách cũ + ≥ 235 triệu từ đơn đầu của khách mới), để vào mùa Tết với tệp khách lớn hơn.',
  p1_goal: 'Trong 8 tuần (9/11 – 3/1), có 800 khách mới mua online với CAC trung bình ≤ 100.000đ.',
  p1_new: '800',
  p1_cac: '100.000',
  sc_A_m: 5, sc_A_s: 4, sc_A_a: 5, sc_A_d: 4, sc_A_x: 5,
  sc_B_m: 4, sc_B_s: 4, sc_B_a: 4, sc_B_d: 3, sc_B_x: 4,
  sc_C_m: 3, sc_C_s: 3, sc_C_a: 2, sc_C_d: 3, sc_C_x: 3,
  p2_pick: 'A',
  p2_why: 'Nhóm A chiếm 62% khách online hiện có, tới được bằng Facebook và Google với CAC dưới trần. Nhóm B chỉ mạnh theo dịp; để dành cho chiến dịch Tết. Nhóm C mua ở cửa hàng, ngoài phạm vi kế hoạch online.',
  p3_insight: 'Tôi muốn có một cách để "tắt máy" sau giờ làm và ngủ sớm hơn, nhưng tôi sợ dùng thuốc và đã chán những gói trà không biết bên trong có gì.',
  p3_who: 'Người đi làm 25–35 tuổi ở thành phố, khó dứt việc vào buổi tối',
  p3_frame: 'là ly trà buổi tối thay cho cà phê chiều và thay cho việc lướt điện thoại tới khuya',
  p3_benefit: 'một nghi thức 5 phút để kết thúc ngày làm việc, không caffeine, biết rõ mình uống gì',
  p3_rtb: 'thảo mộc trồng ở Lâm Đồng, nhãn ghi đủ thành phần, có phiếu kiểm nghiệm, 4,8/5 từ 1.200 đánh giá',
  p4_msg: 'Mộc Lam — ly trà 5 phút để tắt máy sau giờ làm.',
  p4_proof1: 'Thành phần và vùng trồng in trên nhãn; ảnh vườn và xưởng sấy ở Lâm Đồng.',
  p4_proof2: 'Không caffeine, có phiếu kiểm nghiệm an toàn thực phẩm của lô hàng.',
  p4_proof3: '4,8/5 từ 1.200 đánh giá trên sàn; trích nguyên văn đánh giá thật, có xin phép.',
  p4_not: 'Không nói "chữa mất ngủ", "an thần", "thay thuốc ngủ": trà là thực phẩm, không chứng minh được công dụng chữa bệnh; đối thủ An Thần Trà đang bị chê đúng ở điểm này. Không chê đích danh đối thủ.',
  al_fb: '34tr', al_tt: '10tr', al_gg: '16tr', al_zl: '5tr', al_koc: '15tr',
  p5_roles: 'Google: bắt người đang tìm, CAC thấp nhất, chi đến mức trần 16 triệu.\nFacebook/Instagram: kênh chính để mở rộng nhóm A, nhắm lại người đã xem.\nKOC: người thật kể nghi thức buổi tối, CAC ngang trần.\nTikTok: phần thử 10 triệu, CAC 125.000đ nên giữ nhỏ, có tiêu chí dừng.\nZalo: thử nhỏ 5 triệu, gom khách vào OA để chăm mua lại.',
  k1_name: 'CTR quảng cáo Facebook/Instagram', k1_type: 'sớm', k1_target: '≥ 1,6% mỗi tuần',
  k2_name: 'Chi phí mỗi lượt thêm vào giỏ', k2_type: 'sớm', k2_target: '≤ 40.000đ',
  k3_name: 'Khách mới và CAC trung bình', k3_type: 'muộn', k3_target: '≥ 100 khách mới/tuần, CAC ≤ 100.000đ',
  p6_utm: '?utm_source=facebook&utm_medium=paid_social&utm_campaign=moclam_tatmay_t11&utm_content=video_5phut',
  p6_action: 'Xem mỗi thứ Hai. Nếu CTR một mẫu quảng cáo < 1,0% sau 3 ngày thì thay mẫu. Nếu chi phí thêm giỏ > 50.000đ hai tuần liền thì xem lại trang sản phẩm trước khi tăng tiền.',
  f_orders: '815',
  f_cac: '98.160',
  f_rev: '244.500.000',
  f_net: '17.800.000',
  f_roas: '3,06',
  f_roasbe: '2,5',
  f_roi: '22,25',
  f_payback: '0',
  p8_risk1: 'Giá quảng cáo tăng mạnh tuần 11/11 và 12/12 → giảm chi Facebook hai tuần đó, dồn sang tuần 4 và 6.',
  p8_risk2: 'Hết hàng nếu KOC lan rộng → theo dõi tồn kho hằng ngày, ngưỡng 600 hộp thì tạm dừng KOC mới.',
  p8_stop: 'Sau 2 tuần, TikTok có CAC > 140.000đ thì dừng hẳn và chuyển tiền sang Google/Facebook. Bất kỳ kênh nào CAC > 150.000đ trong 7 ngày liền thì cắt 50% ngân sách kênh đó. CAC trung bình > 110.000đ sau tuần 4 thì họp lại toàn bộ kế hoạch.',
  p8_c_claim: true, p8_c_promo: true, p8_c_data: true,
};

return { brand, unit, history, retention, storesNote, budget, weeks, limits, interviews, competitors,
  benchNote, channels, calendar, segments, criteria, parts, checks, rubric, levels, example,
  num, calc, channelCalc, fieldList, filled, segTotals, runChecks, unlockAt: 0.6, storageKey: 'thmc.capstone.v1' };
})();
