# Audit ngắn — Khoá "Chạy quảng cáo đa nền tảng"

Ngày kiểm: 2026-10-24 · Nhánh: `content/khoa-quang-cao` · Phạm vi: nội dung quảng cáo trả tiền đang có trên site, lỗ hổng, cấu trúc khoá đề xuất, thứ tự làm.

## 1. Sơ đồ nội dung quảng cáo hiện có

```
Chặng s4 Kênh ─┬─ kn06  Quảng cáo trả tiền: Meta, Google, TikTok (9 bài, mức khái niệm)
               ├─ kn07  Ngân sách media, reach/tần suất, CPM hiệu dụng (8)
               ├─ kn03  Sàn TMĐT: phí sàn, quảng cáo trong sàn vs kéo về sàn (10)
               ├─ kn11  SEO (8) · kn12 Luật QC & dữ liệu khách (8) · kn16 TikTok, Spark Ads (5)
Chặng s5 Đo ───┬─ tn03  Test creative (10) · tn06 Thử kênh mới (10)
               ├─ dl03  ROAS (10) · dl06 Attribution, geo holdout (10) · dl07 GA4/dashboard (10) · dl10 ROI (8)
               └─ tu02  Tối ưu ngân sách quảng cáo (10)
Lab ───────────── lab-meta (mô phỏng Ads Manager) · lab-gads (Search) · lab-ga4 · lab-chien-luoc
Case/capstone ─── 18 case bấm giờ (vài case về CAC/ngân sách) · capstone Mộc Lam (80tr, 8 tuần)
Game ──────────── game-ngan-sach (chia tiền 4 kênh) · game-chan-doan (chẩn đoán nguyên nhân)
```

Kiến thức nền về đọc số (ROAS hoà vốn, attribution, lợi suất giảm dần, cắt ngân sách) **đã sâu và tốt**. Thứ còn thiếu là phần **làm nghề trên từng nền tảng**.

## 2. Lỗ hổng

| # | Lỗ hổng | Hệ quả cho người mới |
|---|---|---|
| 1 | Không có bài dựng chiến dịch từng bước theo nền tảng (tài khoản → thanh toán → chiến dịch → nhóm → quảng cáo) | Đọc xong vẫn không biết bắt đầu từ nút nào |
| 2 | Không có Performance Max, Demand Gen, YouTube, Merchant Center; Google chỉ có Search | Bỏ sót loại chiến dịch Google đang đẩy mạnh nhất 2025–2026 |
| 3 | Không có Zalo Ads, quảng cáo Shopee/Lazada có hệ thống, LinkedIn cho B2B | Lệch so với kênh người học Việt Nam thật sự dùng |
| 4 | Tracking chỉ ở mức "Pixel là gì"; thiếu CAPI/Events API/Enhanced conversions, khử trùng sự kiện | Dashboard sai mà không biết sai |
| 5 | Thiếu MER và một khung thống nhất reach → traffic → lead → conversion → profit | Học viên lấy ROAS nền tảng làm sự thật |
| 6 | Case: không có case lead-gen dịch vụ, không có B2B; chưa có case xuyên suốt từ chọn kênh tới chẩn đoán | Chưa luyện được chuỗi quyết định liền mạch |
| 7 | Chưa có bài thực hành cho người chưa có ngân sách thật | Người mới không có chỗ tập |
| 8 | Không có trang khoá: nội dung quảng cáo rải ở 6 module thuộc 2 chặng, chặng s5 khoá sau đề thi s4 | Người chỉ muốn học quảng cáo bị chặn bởi đề thi chặng khác |

## 3. Giữ · sửa · gộp · viết mới

| Hạng mục | Quyết định | Lý do |
|---|---|---|
| kn06, kn07, kn03, kn16, tn03, tn06, dl03, dl06, dl07, dl10, tu02 | **Giữ** | Đúng, sâu, đang thuộc các lộ trình khác. Khoá mới dẫn sang như "học sâu hơn", không chép lại |
| kn12 (luật) | **Giữ** — đã cập nhật Luật 91/2025, NĐ 356/2025 | Khoá mới chỉ thêm phần riêng cho quảng cáo: Luật QC sửa đổi 75/2025 (KOL), NĐ 342/2025 |
| glossary `du-lieu-ca-nhan`, tu01 | **Sửa nhỏ** | Còn viết "theo Nghị định 13/2023" như văn bản chính |
| Lab Meta / Google / GA4, capstone Mộc Lam, game | **Giữ, nối vào khoá** | Dùng làm bài thực hành không tốn tiền |
| kn06 vs khoá mới | **Gộp ở mức điều hướng** | Không chuyển bài (đổi mã bài sẽ mất tiến độ người đang học); trang khoá ghi kn06 là bài đọc trước tuỳ chọn |
| 11 module `qc01–qc11`, 3 case xuyên suốt, capstone media plan, trang khoá | **Viết mới** | Lấp lỗ hổng 1–8 |

## 4. Cấu trúc khoá đề xuất

Chặng chuyên đề **s7 · "Chuyên đề: Quảng cáo đa nền tảng"** — luôn mở, không đề thi chặng, không ảnh hưởng cổng mở khoá và đề thi s1–s6. Có trang khoá `quang-cao.html` và lộ trình tuỳ chọn `ads`.

```
NỀN TẢNG CHUNG
 qc01  Từ mục tiêu kinh doanh tới kế hoạch quảng cáo  (mục tiêu → khách → offer → phễu → kênh → ngân sách → kế hoạch 90 ngày)
 qc02  Đọc số quảng cáo                               (5 tầng kết quả · CPM/CPC/CTR/CPA/ROAS/MER/LTV · attribution · incrementality)
 qc03  Creative, landing, tracking, test, báo cáo     (brief · điểm đến · Pixel+server · UTM · luật 2026 · quy tắc tối ưu)
TỪNG NỀN TẢNG (cùng một chuẩn 6 phần)
 qc04  Meta Ads            qc05  Google Search        qc06  YouTube · Demand Gen · PMax · Merchant Center
 qc07  TikTok Ads + Shop   qc08  Zalo Ads             qc09  Shopee & Lazada
CHUYÊN SÂU & VẬN HÀNH
 qc10  LinkedIn cho B2B và các kênh nên cân nhắc kỹ (Pinterest, Snapchat, X, Amazon)
 qc11  Vận hành đa kênh: chia tiền, dashboard chéo kênh, cây chẩn đoán, mở rộng, báo cáo
THỰC HÀNH
 3 case xuyên suốt (TMĐT · lead dịch vụ · B2B) · thực hành 0 đồng · capstone media plan đa kênh
```

Chuẩn 6 phần cho mỗi nền tảng: (1) hợp với ai, khi nào không chạy · (2) tài khoản, quyền, thanh toán, VAT, xác minh · (3) dựng chiến dịch mẫu từng bước (sơ đồ minh hoạ) · (4) nhắm chọn, vị trí, giá thầu, ngân sách, creative, landing, tracking · (5) ví dụ số giả định có nhãn: brief → chia tiền → dự báo → kết quả → quyết định · (6) lỗi thường gặp, chẩn đoán bằng số, chính sách.

Về LinkedIn, Pinterest, Snapchat, X, Amazon: chỉ LinkedIn có giá trị thật cho người học Việt Nam (B2B). Pinterest tại Việt Nam phải qua đối tác; Snapchat và X chưa xác minh được khả năng mở tài khoản tự phục vụ; Amazon chỉ dành cho người bán qua Global Selling. Gộp chúng thành **một bài quyết định "khi nào không đáng chạy"** thay vì dạy dàn trải.

## 5. Thứ tự ưu tiên

1. Hạ tầng: chặng s7, lộ trình `ads`, trường bài mới (từng bước, sơ đồ, nguồn, nhãn số giả định), trang khoá.
2. qc01–qc03 (nền tảng chung) → qc04 Meta → qc05 Google Search: phủ phần lớn ngân sách của người mới.
3. Case TMĐT + case lead + capstone.
4. qc06, qc07, qc08, qc09.
5. qc10, qc11, case B2B.
6. Sửa nội dung cũ, test, đi thử như người mới, mobile.

## 6. Nguồn chính thức (kiểm 2026-10-24)

Trạng thái: **Đọc** = đã mở trang chính thức · **Tìm** = chỉ thấy qua trích đoạn tìm kiếm trên domain chính thức, cần mở lại · **Chưa** = chưa xác minh được.

| Nền tảng | Điểm chính | Nguồn | TT |
|---|---|---|---|
| Meta | 6 mục tiêu (Awareness, Traffic, Engagement, Leads, App promotion, Sales) | facebook.com/business/help/1438417719786914 | Tìm |
| Meta | Advantage+ sales campaigns (tên mới của Advantage+ shopping) | facebook.com/business/ads/meta-advantage-plus/sales-campaigns | Tìm |
| Meta | Learning limited: ~50 sự kiện tối ưu trong 1 tuần sau chỉnh sửa lớn | facebook.com/business/help/269269737396981 | Tìm |
| Meta | Pixel + Conversions API, khử trùng bằng event_id + tên sự kiện | developers.facebook.com/…/deduplicate-pixel-and-server-events | Tìm |
| Meta | Chặn tệp gợi ý sức khoẻ/tài chính từ 2/9/2025; bỏ loại trừ chi tiết (v22) | developers.facebook.com/…/custom-audience, …/version22.0 | Tìm |
| Meta | Thanh toán VN: thẻ, PayPal, MoMo/VNPay (tài khoản VND) | facebook.com/business/help/212763688755026 | Tìm |
| Meta | VAT tại VN | — | Chưa |
| Google | Loại chiến dịch: PMax, Search, Display, Video, App, Shopping, Demand Gen | support.google.com/google-ads/answer/2567043 | Đọc |
| Google | Video action → Demand Gen; Display dời về Demand Gen tới 2027 | support.google.com/google-ads/answer/15110871 · blog.google (26/5/2026) | Đọc |
| Google | Smart Bidding; nhãn "Target CPA/ROAS" từ 6/2026 | support.google.com/google-ads/answer/7065882 | Đọc |
| Google | Kiểu khớp từ khoá | support.google.com/google-ads/answer/7478529 | Đọc |
| Google | Thanh toán VN: MoMo trả trước tối thiểu 170.000đ; thẻ cần KYC | support.google.com/google-ads/answer/2375433 | Tìm/Đọc |
| Google | Hoá đơn Google Việt Nam từ 1/4/2025, VAT 10% (8% tới 31/12/2026) | support.google.com/google-ads/answer/2375370 | Đọc |
| Google | Xác minh nhà quảng cáo | support.google.com/adspolicy/answer/9703665 | Đọc |
| Google | Merchant Center hỗ trợ VN (tab Mua sắm) | support.google.com/merchants/answer/160637 | Đọc |
| TikTok | Mục tiêu: Reach / Traffic, Video views, Community interaction / Lead gen, Sales, App | ads.tiktok.com/help/article/choose-right-objective | Đọc |
| TikTok | Thanh toán VN: thẻ, chuyển khoản, MoMo, ZaloPay | ads.tiktok.com/help/article/asia-pacific-apac-supported-payment-methods | Đọc |
| TikTok | VAT 10% từ 1/7/2025, cần mã số thuế | ads.tiktok.com/help/article/vietnam-vat-cit | Đọc |
| TikTok | Product GMV Max có tại VN; GMV Pay | ads.tiktok.com/help/article/how-to-create-product-gmv-max-ads-in-seller-center | Đọc |
| TikTok | Giai đoạn học (~25 kết quả hoặc 7 ngày; FAQ: ~50) | ads.tiktok.com/help/article/learning-phase | Đọc |
| Zalo | Hình thức quảng cáo và cách tính phí | ads.zalo.me/business/cac-hinh-thuc-quang-cao-tren-zalo-ads/ | Đọc |
| Zalo | OA xác thực vs Hồ sơ quảng cáo | ads.zalo.me/business/tai-khoan-oa-xac-thuc-va-ho-so-quang-cao-la-gi/ | Đọc |
| Zalo | Nạp tiền trả trước | ads.zalo.me/business/huong-dan-nap-tien-vao-tai-khoan-zalo-ads-2/ | Đọc |
| Zalo | Gói OA | zalo.solutions/oa/pricing | Đọc |
| Shopee | "Dịch vụ Hiển thị"; "Doanh thu (GMV)" → "Doanh số" từ 16/1/2026 | ads.shopee.vn/learn/faq/396/2187 | Đọc |
| Shopee | Tối Đa Doanh Thu (Tùy chỉnh ROAS) | ads.shopee.vn/learn/faq/398/1800 | Đọc |
| Lazada | Sponsored Solutions VN | — (cần đăng nhập Seller Center) | Chưa |
| LinkedIn | Mục tiêu; ngân sách tối thiểu $10/ngày | linkedin.com/help/lms/answer/a424570 | Tìm |
| Pinterest | VN nhắm được; mở tài khoản phải qua đối tác | help.pinterest.com/en/business/article/promoted-pins-overview | Đọc |
| Snapchat, X | Khả năng tự phục vụ tại VN | — | Chưa |
| Luật | Luật QC sửa đổi 75/2025/QH15, hiệu lực 1/1/2026 (người chuyển tải QC) | bvhttdl.gov.vn | Đọc |
| Luật | NĐ 342/2025/NĐ-CP, hiệu lực 15/2/2026 (đóng QC 1 thao tác, video chờ ≤5 giây, gỡ trong 24 giờ) | baochinhphu.vn · congbao.chinhphu.vn | Đọc |
| Luật | Luật BVDLCN 91/2025/QH15 + NĐ 356/2025, hiệu lực 1/1/2026; NĐ 330/2026 xử phạt (19/8/2026) | bocongan.gov.vn · vanban.chinhphu.vn · baochinhphu.vn | Đọc |
| Luật | TPBVSK: NĐ 15/2018 vẫn áp dụng (NĐ 46/2026 bị tạm ngưng) | baochinhphu.vn | Đọc |

Mọi bước bấm nút trong khoá được viết theo tên có trong các nguồn trên; không có ảnh chụp giao diện thật (không tạo tài khoản quảng cáo) — thay bằng **sơ đồ minh hoạ có nhãn**.
