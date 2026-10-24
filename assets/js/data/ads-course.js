/* KHOÁ "CHẠY QUẢNG CÁO ĐA NỀN TẢNG" — dữ liệu cho trang khoá quang-cao.html (chặng chuyên đề s7).
   Bài học nằm ở assets/js/data/bai/qc01.js … qc11.js (đăng ký trong bai-index.js, step 'ads').
   Ở đây chỉ có: thứ tự và vai trò từng module, chuẩn 6 phần, bài ôn nền, thực hành 0 đồng, nguồn chính thức và lịch rà soát.
   Trạng thái nguồn: 'doc' đã mở trang chính thức · 'tim' mới thấy qua trích đoạn tìm kiếm trên domain chính thức · 'chua' chưa xác minh. */
const ADS_COURSE = {
  checked: '2026-10-24',
  parts: [
    { t:'Nền tảng chung', d:'Học trước khi mở bất kỳ tài khoản nào: từ mục tiêu kinh doanh tới con số quảng cáo, đọc số, tracking và luật.', mods:['qc01','qc02','qc03'] },
    { t:'Từng nền tảng', d:'Cùng một chuẩn 6 phần cho mọi nền tảng, để bạn so được kênh này với kênh kia.', mods:['qc04','qc05','qc06','qc07','qc08','qc09'] },
    { t:'Chuyên sâu và vận hành', d:'B2B trên LinkedIn, khi nào bỏ qua kênh lạ, và cách điều hành nhiều kênh cùng lúc.', mods:['qc10','qc11'] },
  ],
  platform: ['qc04','qc05','qc06','qc07','qc08','qc09','qc10'],
  aspects: [
    { k:'fit', t:'Hợp với ai, khi nào không nên chạy' },
    { k:'account', t:'Tài khoản, quyền, thanh toán, VAT, xác minh' },
    { k:'setup', t:'Dựng chiến dịch mẫu từng bước' },
    { k:'levers', t:'Nhắm chọn, vị trí, giá thầu, ngân sách, creative, trang đích, tracking' },
    { k:'example', t:'Ví dụ số giả định: brief → chia tiền → dự báo → kết quả → quyết định' },
    { k:'diagnose', t:'Lỗi thường gặp, chẩn đoán bằng số, chính sách' },
  ],
  /* Bài có sẵn ở các chặng khác, đọc trước nếu muốn chắc nền (không bắt buộc). */
  prereq: ['B:kn06-01','B:kn06-03','B:kn06-08','B:dl03-02','B:dl06-03','B:tu02-01'],

  /* Thực hành không tốn tiền. Mỗi bài ra một sản phẩm cụ thể. */
  practice: [
    { t:'Đọc quảng cáo của 3 đối thủ', tool:'Meta Ad Library', u:'https://www.facebook.com/ads/library/', st:'tim',
      d:'Tìm theo tên trang của 3 đối thủ ở quốc gia Việt Nam. Ghi lại: định dạng, câu mở đầu, offer, quảng cáo nào chạy lâu nhất (thường là đang hiệu quả với họ). Thư viện không cho thấy chi tiêu hay kết quả của quảng cáo thương mại.',
      out:'Bảng 3 đối thủ × 5 cột, kèm một giả thuyết bạn muốn thử' },
    { t:'Xem đối thủ chạy gì trên Google và YouTube', tool:'Google Ads Transparency Center', u:'https://adstransparency.google.com/', st:'tim',
      d:'Tìm tên nhà quảng cáo, lọc theo khu vực Việt Nam và định dạng (chữ, hình ảnh, video). Đọc tiêu đề quảng cáo tìm kiếm để biết họ hứa gì với người đang tìm.',
      out:'15 tiêu đề RSA của riêng bạn, không trùng lời hứa với đối thủ' },
    { t:'Xem quảng cáo TikTok đang chạy tốt theo ngành', tool:'TikTok Creative Center · Top Ads', u:'https://ads.tiktok.com/help/article/top-ads', st:'tim',
      d:'Lọc theo khu vực, ngành, mục tiêu chiến dịch. Xem đồ thị theo từng giây để thấy khán giả bỏ đi ở đâu. Một số phần có thể yêu cầu đăng nhập TikTok Ads Manager.',
      out:'3 kịch bản 15 giây với 3 câu mở đầu khác nhau' },
    { t:'Dựng chiến dịch trong mô phỏng', tool:'Marketing Lab trên site', u:'lab-meta.html', st:'doc',
      d:'Lab Meta Ads và Lab Google Search dùng dữ liệu giả lập có nhãn: chọn mục tiêu, đối tượng, ngân sách, rồi đọc kết quả nhiều ngày. Không tốn tiền, không cần tài khoản quảng cáo.',
      out:'Một lần chạy đạt mục tiêu của chế độ Thử thách', also:'lab-gads.html' },
    { t:'Dựng nháp, không bấm Đăng', tool:'Tài khoản quảng cáo của chính bạn', u:'', st:'chua',
      d:'Nếu đã có tài khoản, đi hết các bước dựng chiến dịch theo bài "Làm từng bước" rồi lưu nháp, không đăng. Có nền tảng cho lưu nháp khi chưa có phương thức thanh toán, có nền tảng không — kiểm trong tài khoản của bạn. Không nhập thẻ chỉ để tập.',
      out:'Ảnh chụp màn hình bản nháp + checklist trước khi Đăng (bài qc03-05)' },
    { t:'Đối soát UTM với sổ bán hàng', tool:'Bảng tính', u:'', st:'doc',
      d:'Lấy 2 tuần đơn hàng thật (hoặc bảng giả định trong case Bếp Nhà Lá), gắn nguồn theo UTM, so với số các nền tảng tự báo. Tìm chỗ lệch.',
      out:'Bảng đối soát 1 trang và một câu kết luận' },
  ],

  /* Nguồn chính thức theo nền tảng — đồng bộ với KHOA-QUANG-CAO-AUDIT.md mục 6. */
  sources: [
    { p:'Meta', items:[
      ['6 mục tiêu chiến dịch', 'https://www.facebook.com/business/help/1438417719786914', 'tim'],
      ['Advantage+ sales campaigns', 'https://www.facebook.com/business/ads/meta-advantage-plus/sales-campaigns', 'tim'],
      ['Giai đoạn học và "Learning limited"', 'https://en-gb.facebook.com/business/help/269269737396981', 'tim'],
      ['Khử trùng sự kiện Pixel và Conversions API', 'https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events', 'tim'],
      ['Phương thức thanh toán', 'https://www.facebook.com/business/help/212763688755026', 'tim'],
      ['Thuế VAT tại Việt Nam', '', 'chua'] ] },
    { p:'Google Ads', items:[
      ['Chọn loại chiến dịch', 'https://support.google.com/google-ads/answer/2567043', 'doc'],
      ['Video action → Demand Gen', 'https://support.google.com/google-ads/answer/15110871', 'doc'],
      ['Display dời về Demand Gen', 'https://blog.google/products/ads-commerce/google-display-ads-demand-gen/', 'doc'],
      ['Smart Bidding', 'https://support.google.com/google-ads/answer/7065882', 'doc'],
      ['Kiểu khớp từ khoá', 'https://support.google.com/google-ads/answer/7478529', 'doc'],
      ['Thuế và hoá đơn tại Việt Nam', 'https://support.google.com/google-ads/answer/2375370', 'doc'],
      ['Xác minh nhà quảng cáo', 'https://support.google.com/adspolicy/answer/9703665', 'doc'],
      ['Merchant Center: quốc gia hỗ trợ', 'https://support.google.com/merchants/answer/160637', 'doc'] ] },
    { p:'TikTok', items:[
      ['Chọn mục tiêu chiến dịch', 'https://ads.tiktok.com/help/article/choose-right-objective', 'doc'],
      ['Phương thức thanh toán APAC', 'https://ads.tiktok.com/help/article/asia-pacific-apac-supported-payment-methods', 'doc'],
      ['VAT tại Việt Nam', 'https://ads.tiktok.com/help/article/vietnam-vat-cit', 'doc'],
      ['Product GMV Max', 'https://ads.tiktok.com/help/article/how-to-create-product-gmv-max-ads-in-seller-center', 'doc'],
      ['Giai đoạn học', 'https://ads.tiktok.com/help/article/learning-phase', 'doc'] ] },
    { p:'Zalo', items:[
      ['Các hình thức quảng cáo', 'https://ads.zalo.me/business/cac-hinh-thuc-quang-cao-tren-zalo-ads/', 'doc'],
      ['OA xác thực và hồ sơ quảng cáo', 'https://ads.zalo.me/business/tai-khoan-oa-xac-thuc-va-ho-so-quang-cao-la-gi/', 'doc'],
      ['Nạp tiền', 'https://ads.zalo.me/business/huong-dan-nap-tien-vao-tai-khoan-zalo-ads-2/', 'doc'],
      ['Bảng giá gói OA', 'https://zalo.solutions/oa/pricing', 'doc'] ] },
    { p:'Shopee · Lazada', items:[
      ['Dịch vụ Hiển thị, đổi tên "Doanh số"', 'https://ads.shopee.vn/learn/faq/396/2187', 'doc'],
      ['Tối Đa Doanh Thu (Tùy chỉnh ROAS)', 'https://ads.shopee.vn/learn/faq/398/1800', 'doc'],
      ['Lazada Sponsored Solutions (cần đăng nhập Seller Center)', '', 'chua'] ] },
    { p:'LinkedIn · kênh khác', items:[
      ['LinkedIn: mục tiêu chiến dịch', 'https://www.linkedin.com/help/lms/answer/a424570', 'tim'],
      ['LinkedIn: ngân sách tối thiểu', 'https://business.linkedin.com/advertise/ads/best-practices/maximize-your-budget', 'tim'],
      ['Pinterest: quốc gia mở tài khoản', 'https://help.pinterest.com/en/business/article/promoted-pins-overview', 'doc'],
      ['Snapchat, X: tự phục vụ tại Việt Nam', '', 'chua'] ] },
    { p:'Luật Việt Nam', items:[
      ['Luật sửa đổi Luật Quảng cáo 75/2025/QH15', 'https://bvhttdl.gov.vn/quoc-hoi-thong-qua-luat-sua-doi-bo-sung-mot-so-dieu-cua-luat-quang-cao-20250616092033777.htm', 'doc'],
      ['Nghị định 342/2025/NĐ-CP', 'https://baochinhphu.vn/quy-dinh-moi-ve-hoat-dong-quang-cao-tren-mang-102260102181832697.htm', 'doc'],
      ['Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15', 'https://bocongan.gov.vn/chinh-sach-phap-luat/bai-viet/luat-bao-ve-du-lieu-ca-nhan-chinh-thuc-co-hieu-luc-thi-hanh-tu-ngay-01-01-2026-1767186124', 'doc'],
      ['Nghị định 330/2026/NĐ-CP (xử phạt dữ liệu cá nhân)', 'https://baochinhphu.vn/muc-xu-phat-vi-pham-hanh-chinh-doi-voi-hanh-vi-vi-pham-ve-bao-ve-du-lieu-ca-nhan-102260822154959691.htm', 'doc'],
      ['Thực phẩm bảo vệ sức khoẻ: Nghị định 15/2018 vẫn áp dụng', 'https://baochinhphu.vn/tiep-tuc-ap-dung-nghi-dinh-15-2018-nd-cp-ve-an-toan-thuc-pham-cho-den-khi-co-quy-dinh-moi-102260408123934123.htm', 'doc'] ] },
  ],

  /* Phần cần rà định kỳ: thứ dễ đổi nhất trước. */
  review: [
    { every:'3 tháng', t:'Tên mục tiêu, loại chiến dịch, tên chiến lược giá thầu (Meta Advantage+, Google Demand Gen/AI Max, TikTok Smart+/GMV Max)', mods:['qc04','qc05','qc06','qc07'] },
    { every:'3 tháng', t:'Tên dịch vụ quảng cáo và chỉ số trên Shopee/Lazada; điều kiện quảng cáo Shop', mods:['qc09'] },
    { every:'6 tháng', t:'Thanh toán, VAT, hoá đơn tại Việt Nam (Google giảm 8% tới 31/12/2026; Meta chưa xác minh)', mods:['qc04','qc05','qc07','qc08'] },
    { every:'6 tháng', t:'Zalo: hình thức, mức tối thiểu, gói OA, ZBS/ZNS', mods:['qc08'] },
    { every:'Khi có văn bản mới', t:'Luật Quảng cáo, Nghị định 342/2025, Luật và Nghị định về dữ liệu cá nhân, quy định thực phẩm bảo vệ sức khoẻ', mods:['qc03'] },
    { every:'12 tháng', t:'LinkedIn tiền tệ/ngân sách tối thiểu; Pinterest, Snapchat, X, Amazon ở Việt Nam', mods:['qc10'] },
  ],
};
if (typeof module !== 'undefined') module.exports = ADS_COURSE;
