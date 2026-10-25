/* SƠ ĐỒ MINH HOẠ cho khoá Quảng cáo đa nền tảng (bài qc*).
   Không phải ảnh chụp giao diện: là sơ đồ cấu trúc, tên mục lấy theo tài liệu chính thức tại ngày kiểm tra (xem src của bài).
   Màu lấy từ token của trang bài (.lp-fig .bx/.ac/.ln/.mu trong bai.html) nên đọc được ở mọi chế độ nền.
   Bài gọi bằng khoá: { fig:'meta-structure' }. */
const ADS_FIG = (() => {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  /* hộp: tiêu đề đậm + vài dòng phụ */
  const box = (x, y, w, h, title, lines = [], cls = 'bx') =>
    `<g><rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>` +
    `<text class="tt" x="${x + 12}" y="${y + 22}">${esc(title)}</text>` +
    lines.map((l, i) => `<text class="mu" x="${x + 12}" y="${y + 42 + i * 17}">${esc(l)}</text>`).join('') + `</g>`;
  const arrow = (x1, y1, x2, y2) => `<path class="ln" d="M${x1} ${y1} L${x2} ${y2}" marker-end="url(#ah)"/>`;
  const label = (x, y, t, cls = 'mu') => `<text class="${cls}" x="${x}" y="${y}">${esc(t)}</text>`;
  const svg = (w, h, body) =>
    `<svg viewBox="0 0 ${w} ${h}" role="img" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 L10 5 L0 10 z"/></marker></defs>${body}</svg>`;

  /* chuỗi cấp bậc từ trên xuống, mỗi cấp một hộp và ghi chú bên phải */
  const ladder = (rows, note) => {
    const W = 720, rowH = 86, h = rows.length * rowH + 20;
    let b = '';
    rows.forEach((r, i) => {
      const y = 10 + i * rowH;
      b += box(20, y, 300, 66, r[0], r[1] || [], i === 0 ? 'ac' : 'bx');
      if (r[2]) b += r[2].map((t, k) => label(346, y + 24 + k * 18, t)).join('');
      if (i < rows.length - 1) b += arrow(170, y + 66, 170, y + rowH + 8);
    });
    if (note) b += label(346, h - 8, note, 'mu it');
    return svg(W, h, b);
  };

  return {
    'meta-structure': { t: 'Cấu trúc Meta Ads', svg: ladder([
      ['Business portfolio', ['Trang, tài khoản Instagram, tài khoản QC'], ['Quản lý trong Meta Business Suite.', 'Cấp quyền cho người, không đưa mật khẩu.']],
      ['Tài khoản quảng cáo', ['Tiền tệ, múi giờ, phương thức thanh toán'], ['Tiền tệ và quốc gia chọn lúc tạo tài khoản;', 'MoMo/VNPay chỉ có khi tài khoản là VND.']],
      ['Chiến dịch', ['Mục tiêu: 1 trong 6'], ['Awareness · Traffic · Engagement · Leads', 'App promotion · Sales. Có thể đặt ngân sách ở đây.']],
      ['Nhóm quảng cáo', ['Đối tượng, vị trí, sự kiện tối ưu, lịch'], ['Thuật toán học ở cấp này: ~50 sự kiện tối ưu', 'trong 1 tuần thì ra khỏi giai đoạn học.']],
      ['Quảng cáo', ['Creative, chữ, đích đến, theo dõi'], ['Video/ảnh/carousel; đích đến: web, form,', 'Messenger/WhatsApp; Pixel + Conversions API.']],
    ]) },

    'google-structure': { t: 'Cấu trúc Google Ads', svg: ladder([
      ['Tài khoản người quản lý (MCC)', ['Tuỳ chọn, cho agency hoặc nhiều thương hiệu'], ['Một nơi xem và cấp quyền nhiều tài khoản.']],
      ['Tài khoản Google Ads', ['Hồ sơ thanh toán, xác minh nhà quảng cáo'], ['VND + địa chỉ VN: hoá đơn do Google Việt Nam xuất,', 'cần mã số thuế để nhận hoá đơn hợp lệ.']],
      ['Chiến dịch', ['Loại, ngân sách/ngày, chiến lược giá thầu, vị trí, ngôn ngữ'], ['Search · Performance Max · Demand Gen · Video', 'Shopping · Display · App.']],
      ['Nhóm quảng cáo', ['Một chủ đề = một bộ từ khoá'], ['PMax không có nhóm quảng cáo,', 'thay bằng nhóm thành phần (asset group).']],
      ['Từ khoá + quảng cáo', ['RSA: tới 15 tiêu đề, 4 mô tả; thành phần'], ['Kiểu khớp: rộng · cụm từ "…" · chính xác […]', 'Từ khoá phủ định chặn lượt tìm không đáng tiền.']],
    ]) },

    'tiktok-structure': { t: 'Cấu trúc TikTok Ads Manager', svg: ladder([
      ['Business Center', ['Tài khoản QC, người dùng, tài sản (Pixel, danh mục)'], ['Xác minh doanh nghiệp bằng giấy ĐKKD Việt Nam', 'khi chi tiêu vượt ngưỡng của thị trường.']],
      ['Tài khoản quảng cáo', ['Tiền tệ, thanh toán, mã số thuế'], ['VND: thẻ, chuyển khoản, MoMo, ZaloPay (trả trước).', 'VAT 10% từ 1/7/2025.']],
      ['Chiến dịch', ['Mục tiêu'], ['Reach · Traffic · Video views · Community interaction', 'Lead generation · Sales · App promotion.']],
      ['Nhóm quảng cáo', ['Vị trí, đối tượng, ngân sách, lịch, tối ưu, giá thầu'], ['Giai đoạn học: biến động giảm sau khoảng', '25 kết quả hoặc 7 ngày (trang trợ giúp TikTok).']],
      ['Quảng cáo', ['Video, Spark Ads, chữ, CTA, theo dõi'], ['Spark Ads dùng bài đăng sẵn có (của bạn hoặc', 'creator có mã uỷ quyền).']],
    ]) },

    'tracking-dedup': { t: 'Một đơn, hai đường báo về nền tảng, một lần đếm', svg: svg(720, 300,
      box(20, 20, 200, 70, 'Trình duyệt khách', ['Pixel/tag bắn "Purchase"', 'event_id = DH1024']) +
      box(20, 200, 200, 70, 'Máy chủ của shop', ['CAPI / Events API gửi', '"Purchase", event_id = DH1024']) +
      box(300, 110, 170, 80, 'Nền tảng QC', ['Cùng tên sự kiện', '+ cùng event_id → 1'], 'ac') +
      box(540, 20, 160, 70, 'Báo cáo QC', ['1 chuyển đổi']) +
      box(540, 200, 160, 70, 'Sổ bán hàng', ['Đơn DH1024', 'đối soát hằng tuần']) +
      arrow(220, 55, 300, 135) + arrow(220, 235, 300, 170) + arrow(470, 140, 540, 60) +
      `<path class="ln dash" d="M120 90 L120 200"/>` + label(130, 150, 'cùng một đơn') +
      `<path class="ln dash" d="M620 90 L620 200"/>` + label(470, 150 + 0, '') + label(630, 150, 'so khớp')) },

    'result-layers': { t: 'Năm tầng kết quả và chỉ số đo từng tầng', svg: (() => {
      const L = [['Reach', 'Bao nhiêu người thấy', 'CPM, tần suất, reach'], ['Traffic', 'Bao nhiêu người bấm vào', 'CTR, CPC'],
        ['Lead', 'Bao nhiêu người để lại liên hệ', 'CVR, CPL, tỉ lệ lead đạt chuẩn'], ['Conversion', 'Bao nhiêu người mua', 'CPA, ROAS, MER'],
        ['Profit', 'Còn lại bao nhiêu tiền', 'Lãi gộp − chi QC; LTV : CAC']];
      let b = '';
      L.forEach((r, i) => { const w = 680 - i * 90, x = 20 + i * 45, y = 10 + i * 58;
        b += `<rect class="${i === 4 ? 'ac' : 'bx'}" x="${x}" y="${y}" width="${w}" height="48" rx="8"/>` +
          label(x + 14, y + 20, r[0], 'tt') + label(x + 14, y + 38, r[1]) + label(x + w - 14, y + 30, r[2], 'mu end'); });
      return svg(720, 310, b);
    })() },

    'cpa-tree': { t: 'Cây chẩn đoán khi CPA tăng', svg: svg(720, 330,
      box(260, 10, 200, 56, 'CPA tăng 40%', ['So cùng kỳ, cùng cửa sổ ghi nhận'], 'ac') +
      arrow(300, 66, 110, 120) + arrow(360, 66, 290, 120) + arrow(420, 66, 470, 120) + arrow(450, 66, 640, 120) +
      box(20, 124, 170, 92, 'CPM tăng?', ['Mùa cao điểm, đấu giá', 'đông, tệp quá hẹp']) +
      box(200, 124, 170, 92, 'CTR giảm?', ['Creative mệt, tần suất', 'cao, thông điệp lệch']) +
      box(380, 124, 170, 92, 'CVR giảm?', ['Trang đích, giá, hết', 'hàng, form lỗi']) +
      box(560, 124, 140, 92, 'Đo hỏng?', ['Pixel mất sự kiện,', 'đổi cửa sổ']) +
      label(20, 250, 'Đọc theo thứ tự: kiểm tra đo lường trước, rồi tách CPA = CPM ÷ (1000 × CTR × CVR) để biết tầng nào đổi.', 'mu') +
      label(20, 274, 'Chỉ sửa tầng đang hỏng. Đổi nhiều thứ cùng lúc thì không biết cái nào có tác dụng, và thuật toán học lại từ đầu.', 'mu')) },

    'zalo-flow': { t: 'Đường đi của khách từ quảng cáo Zalo', svg: svg(720, 210,
      box(20, 20, 150, 70, 'Quảng cáo Zalo', ['OA · form · tin nhắn', 'website · bài viết']) +
      box(200, 20, 150, 70, 'Điểm đến', ['Quan tâm OA, điền form,', 'nhắn tin, vào web']) +
      box(380, 20, 150, 70, 'Chăm sóc', ['Tư vấn qua OA, gọi điện', 'ZNS theo mẫu đã duyệt']) +
      box(560, 20, 140, 70, 'Chốt', ['Hẹn, báo giá, ký'], 'ac') +
      arrow(170, 55, 200, 55) + arrow(350, 55, 380, 55) + arrow(530, 55, 560, 55) +
      label(20, 130, 'Phần lớn chi phí và thời gian nằm sau cú bấm: tốc độ phản hồi và kịch bản tư vấn quyết định giá mỗi khách thật.') +
      label(20, 152, 'Danh sách số điện thoại tải lên để nhắm chọn phải có sự đồng ý của khách (Luật Bảo vệ dữ liệu cá nhân 91/2025).') +
      label(20, 174, 'OA xác thực cần giấy tờ doanh nghiệp; "hồ sơ quảng cáo" không cần nhưng chỉ dùng để chạy quảng cáo.')) },

    'shopee-surfaces': { t: 'Quảng cáo trong sàn: khách đang ở đâu khi thấy bạn', svg: svg(720, 230,
      box(20, 20, 210, 90, 'Tìm kiếm', ['Khách gõ từ khoá trên sàn', 'Đấu thầu theo từ khoá', 'Ý định mua cao nhất']) +
      box(255, 20, 210, 90, 'Khám phá', ['Mục gợi ý, sản phẩm tương tự', 'Không có từ khoá', 'Bắt người đang lướt']) +
      box(490, 20, 210, 90, 'Shop', ['Đầu kết quả tìm kiếm', 'Dẫn vào gian hàng', 'Cần đủ đánh giá và sản phẩm']) +
      box(20, 135, 680, 70, 'Tối Đa Doanh Thu (Tùy chỉnh ROAS) — Shopee', ['Bạn đặt ROAS mục tiêu cho từng sản phẩm; hệ thống tự phân bổ vào Tìm kiếm và Khám phá.', 'Từ 16/1/2026 chỉ số "Doanh số" thay "Doanh thu (GMV)" và không tính phần trợ giá của người bán.'], 'ac')) },

    'gg-campaign-map': { t: 'Chọn loại chiến dịch Google theo việc cần làm', svg: svg(720, 250,
      box(20, 20, 220, 96, 'Search', ['Người đang tìm đúng thứ bạn bán', 'Từ khoá + quảng cáo chữ', 'Bắt nhu cầu có sẵn']) +
      box(250, 20, 220, 96, 'Demand Gen', ['YouTube, Shorts, Discover, Gmail,', 'Display (đang dời về đây tới 2027)', 'Tạo nhu cầu, hình ảnh/video']) +
      box(480, 20, 220, 96, 'Video', ['Reach · Views · Ad sequence', 'Nhắc thương hiệu, độ phủ', 'Đo bằng reach, lượt xem']) +
      box(20, 134, 450, 96, 'Performance Max', ['Một chiến dịch chạy trên mọi kênh của Google từ nhóm thành phần', 'Cần dữ liệu chuyển đổi tốt; dễ ăn vào từ khoá thương hiệu', 'TMĐT: nối Merchant Center để có quảng cáo Mua sắm'], 'ac') +
      box(480, 134, 220, 96, 'Shopping', ['Cần Merchant Center + feed', 'Ảnh, giá, tên sản phẩm', 'Việt Nam có tab Mua sắm'])) },

    'b2b-pipeline': { t: 'B2B: quảng cáo chỉ là đoạn đầu của phễu bán', svg: svg(720, 200,
      box(20, 20, 120, 64, 'Lead', ['Form, tải tài liệu']) + box(160, 20, 120, 64, 'MQL', ['Đúng ngành, cỡ']) +
      box(300, 20, 120, 64, 'SQL', ['Sales gặp được']) + box(440, 20, 120, 64, 'Cơ hội', ['Demo, báo giá']) +
      box(580, 20, 120, 64, 'Hợp đồng', ['Doanh thu năm'], 'ac') +
      arrow(140, 52, 160, 52) + arrow(280, 52, 300, 52) + arrow(420, 52, 440, 52) + arrow(560, 52, 580, 52) +
      label(20, 120, 'Đo giá mỗi hợp đồng, không dừng ở giá mỗi lead. Đưa trạng thái từ CRM về nền tảng (chuyển đổi offline)') +
      label(20, 142, 'để thuật toán tìm người giống khách đã ký, không giống người chỉ thích tải tài liệu miễn phí.') +
      label(20, 172, 'Chu kỳ dài: đánh giá kênh theo cohort tháng tạo lead, không theo tháng phát sinh chi phí.', 'mu it')) },
  };
})();
