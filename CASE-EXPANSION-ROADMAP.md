# CASE-EXPANSION-ROADMAP — tuhocmarketing.org

*Ngày: 17/10/2026. Đi kèm `MARKETING-CONTENT-AUDIT.md` (chẩn đoán). Tài liệu này là kế hoạch: khung dạy, mẫu một case, quy tắc bằng chứng, các đợt mở rộng, và việc nào đã làm trong PR này, việc nào chưa.*

## 1. Nguyên tắc

1. **Làm sâu trước khi làm rộng.** Một case có nguồn, có đánh đổi, có phản biện đáng giá hơn ba case kể chuyện.
2. **Dạy cách nghĩ, không dạy thuật ngữ.** Mỗi case phải khiến người học trả lời được: *vấn đề kinh doanh là gì, vì sao chọn hướng đó mà không phải hướng khác, bằng chứng nào cho thấy nó chạy, điều gì khác cũng có thể giải thích, và khi nào bài học này không dùng được.*
3. **Không biến case thành quảng cáo thương hiệu.** Case phải có phản biện, chi phí, rủi ro; thất bại và hỗn hợp chiếm ít nhất một nửa thư viện.
4. **Không bịa.** Số ROAS, doanh thu, kết quả chiến dịch chỉ xuất hiện khi có nguồn bấm được, kèm *ai đo, khi nào, giới hạn*. Không có số thì nói “chưa biết”.
5. **Giữ bản sắc STUDIO:** giấy ngà, serif lớn, nhãn mono nhỏ, đường kẻ mảnh, không thẻ nhiều viền, không ảnh stock. Phần mới dùng đúng token hiện có (`--accent`, `--rule`, `.sec`, `.label`).

## 2. Hành trình Observe → Analyze → Strategize → Create → Measure

| Bước | Câu hỏi người học | Trên trang case | Nhãn bằng chứng |
|---|---|---|---|
| **Observe** — quan sát | Chuyện gì đã xảy ra, với ai, trong bối cảnh nào? | Bối cảnh; vấn đề kinh doanh; điều quan sát được vs diễn giải về khách | Đã xác minh / Giả định |
| **Analyze** — phân tích | Có những lựa chọn nào? Kết quả thật là gì? Vì sao? Điều gì khác cũng giải thích được? | **Chọn hướng trước, đọc đánh đổi sau**; kết quả đã biết (ai đo, ngày, nguồn, hạn chế); điều chưa biết; nhân quả + yếu tố gây nhiễu; giới hạn | Giả định / Đã xác minh / Kết luận |
| **Strategize** — chọn chiến lược | Ý tưởng lớn là gì, thực thi ra sao, thương hiệu đã chọn hướng nào? | Ý tưởng, thực thi, kênh | Giả định / Đã xác minh |
| **Create** — làm thử | Nếu là bạn, bạn làm gì với sản phẩm của mình? | Bài làm thử; liên kết sang **Xưởng chiến lược** | — |
| **Measure** — đo và nhìn lại | Bạn đo gì? Câu hỏi không có đáp án duy nhất; khi nào bài học không áp dụng | Cách đo; 3 câu hỏi nhìn lại; “khi nào không áp dụng”; bài học mang đi | Kết luận |

### Ba nhãn bằng chứng (hiện trên từng khối của trang case)

| Nhãn | Nghĩa | Ví dụ |
|---|---|---|
| **Đã xác minh** | Có nguồn đối chiếu được (URL, ngày, ai công bố) | “Pepsi gỡ quảng cáo ngày 5/4/2017” |
| **Giả định phân tích** | Cách diễn giải hoặc phương án do người viết dựng; không phải lịch sử | “Nike đặt cược nhóm khách trẻ đô thị sẽ…” |
| **Kết luận của tác giả** | Ý kiến có thể tranh luận | “Chọn nhân vật là chọn thông điệp” |

## 3. Mẫu một case (đã có trong `CAMPAIGN_DEEP`)

```
objective     mục tiêu học (đo được, 1–2 câu)
status        success | mixed | failure
problem       vấn đề kinh doanh
consumer      observed (có nguồn) · hypothesis (diễn giải, nói rõ là giả định)
options[3–4]  name · bet · gain · cost · taken (đúng một hướng = hướng thương hiệu đã chọn, có nguồn)
facts[≥2]     t · who (ai đo) · date · pub · url · caveat (hạn chế)
unknown       điều không được khẳng định vì không có dữ liệu công khai
causal[≥2]    claim · evidence · other (điều khác cũng có thể giải thích)
limits[≥3]    phản biện, rủi ro, chi phí
practice      bài làm thử   measure  cách đo   transfer  khi nào không áp dụng
reflect[≥3]   câu hỏi nhìn lại, không có đáp án duy nhất
sources[≥2]   nguồn bấm được
verified      ngày đối chiếu nguồn
```

Ràng buộc kiểm tự động ở `tests/case-deep.test.mjs`: đủ trường; đúng một `taken`; mỗi `causal` có `other` ≥ 25 ký tự; mỗi dữ kiện có `who/date/pub`, mỗi case ≥ 1 URL; không có số ROAS/ROI; **danh sách câu đã bị bác (hồi quy sự kiện)** không được quay lại; thư viện có ≥ 50% không phải “thành công thuần”, ≥ 9 case Việt Nam và ≥ 9 quốc tế; mỗi case có trang tĩnh `case/<id>.html`.

## 4. Quy trình QA cho một case mới (checklist người duyệt)

1. **Marketer:** vấn đề kinh doanh có thật không? Các phương án thay thế có hợp lý và đủ khác nhau?
2. **Strategist:** nhân quả có bị đổ cho chiến dịch trong khi có giải thích mạnh hơn (mở cửa hàng, giảm giá, đối thủ vấp)?
3. **Người mới học:** có thuật ngữ nào chưa giải thích? Có hiểu “vì sao” mà không cần biết thương hiệu?
4. **Người làm thực tế:** bài làm thử có chạy được với ngân sách nhỏ? “Khi nào không áp dụng” có thật không?
5. **Fact-check:** mỗi con số có nguồn; hai nguồn lệch thì nêu cả hai; số tài chính phân biệt retail sales/revenue, GMV/doanh thu; ngày đối chiếu ghi vào `verified`.
6. **Không quảng cáo:** có ít nhất một phản biện nghiêm túc và một chi phí/rủi ro không do thương hiệu tự nêu.

## 5. Các đợt mở rộng

### Đợt 1 — đã làm trong PR này

| Việc | Trạng thái |
|---|---|
| Sửa mọi khẳng định bị bác trong 20 case cũ (§4.4 của audit) | Xong |
| Lớp phân tích sâu cho 20 case cũ | Xong |
| 6 case mới: Pepsi × Kendall Jenner (2017), Old Spice (2010), New Coke (1985), Bách Hóa Xanh (2022 →), Tiki (2018–2025), Vietjet (2012–2019) | Xong — 3 Việt Nam, 3 quốc tế; 1 thành công, 3 thất bại, 2 hỗn hợp |
| Xưởng chiến lược (brief → nghiên cứu → định vị → thông điệp → kênh → ngân sách → KPI → thí nghiệm → đọc kết quả), 2 brief, chấm theo nhất quán | Xong |
| Test hồi quy (19 test mới) | Xong |
| Trang gallery hiện trạng thái thành công/hỗn hợp/thất bại | Xong |

### Đợt 2 — ưu tiên cao (đề xuất)

| Việc | Lý do | Điều kiện |
|---|---|---|
| Chuyên gia đọc lại 26 case; ký duyệt từng case | Audit này không có người duyệt | Người thật |
| Kiểm chứng lại các nguồn chỉ đọc qua tóm tắt (Bloomberg Nike, Brands Vietnam, Fast Company, Patagonia trang chính, Momentum Works) | Giảm rủi ro nguồn thứ cấp | Hạn mức tìm kiếm / truy cập |
| Bổ sung 4 case đã nghiên cứu một phần nhưng chưa đủ nguồn: Burger King “Moldy Whopper”, Gap logo 2010, Dollar Shave Club, Heineken Tết | Cân bằng thành công/thất bại, thêm case sáng tạo | Nghiên cứu nguồn |
| ~~6 case bấm giờ mới về phân khúc, định vị, thông điệp, hành vi khách~~ **Đã làm (18/10/2026)**: 6 case, xem §10 audit | — | Còn: thêm case thứ hai cho c01 (phân khúc) và c05 (tài sản thương hiệu); sửa chống lộ đáp án cho 12 case cũ |
| Thêm bài “thí nghiệm” vào module `tn` có bài thực hành liên kết Xưởng chiến lược | Lab dạy kết quả có nhiễu | Viết bài |

### Đợt 3 — mở rộng thư viện (sau khi đợt 2 qua duyệt)

- 10–12 case Việt Nam có nguồn tốt (ứng viên: Cốc Cốc, Ông Thọ, Cocoon khi có số độc lập, TH true MILK khi có báo cáo gốc, Trung Nguyên Legend khi có số mới).
- 8 case quốc tế về thất bại/đánh đổi (Gap, Airbnb, Burger King, Peloton, Bud Light…): **chỉ thêm khi có ≥ 2 nguồn độc lập**.
- Biến 33 challenge thành dạng “chọn + lập luận bằng số liệu” (chấm theo rubric).
- Brand X-Ray: gắn nhãn bằng chứng và nguồn cho phần “analysis”.

### Đợt 4 — dài hạn

- Case so sánh đối nghịch theo cặp (Nike–Pepsi; Shopee–Tiki; Baemin–Grab) và “tình huống chọn phe” dạng tranh biện.
- Dữ liệu mô phỏng Meta/Google Ads/GA4/SEO có **kịch bản mơ hồ** (CTR tăng, CVR phẳng, mẫu nhỏ) để luyện đọc analytics.
- Đo thật: tỉ lệ hoàn thành case, câu trả lời nhìn lại (khi có phép đo), so điểm Xưởng chiến lược trước/sau bài học.

## 6. Marketing Lab: lộ trình

| Mảng | Hiện có | Thêm trong PR | Tiếp theo |
|---|---|---|---|
| Thao tác công cụ | Meta, Google Ads, GA4, SEO | — | — |
| Chuỗi chiến lược | Không | **Xưởng chiến lược**: 7 bước + đọc kết quả giả lập | Thêm brief B2B, offline/F&B, marketplace |
| Không đáp án duy nhất | Không | Kiểm test: ≥ 2 hướng khác hẳn đều đạt ≥ 70; kế hoạch tự mâu thuẫn < 45 | Thêm “phản biện đồng đội” (đọc bài của người khác) |
| Dữ liệu giả lập có nhãn | Có ở 4 công cụ | Nhãn `DỮ LIỆU GIẢ LẬP` cố định + disclaimer + kết quả thí nghiệm có nhiễu đúng cỡ mẫu | Kịch bản mơ hồ cho GA4 và Ads |
| Chấm điểm | KPI theo quyết định | Chấm **độ nhất quán** (bằng chứng ↔ khách ↔ định vị ↔ thông điệp ↔ kênh ↔ ngân sách ↔ KPI ↔ thí nghiệm) + lập luận đọc kết quả | Chấm bằng người/nhóm với rubric (hiện tự động bằng dấu hiệu văn bản, có nói rõ giới hạn) |

**Giới hạn đã biết của Xưởng chiến lược:** (1) mô hình kênh là mô hình giả định đơn giản (chi ÷ giá mỗi lượt × tỉ lệ chốt × hệ số khớp), không phải mô phỏng đấu giá thật; (2) phần “đọc kết quả” chấm lập luận bằng dấu hiệu văn bản (có trích số, có nói sai số, có bước tiếp) — người học nên tự đọc lại bằng bảng tự kiểm cuối báo cáo; (3) chỉ có 2 brief.

## 7. Điều cần quyết định của chủ sản phẩm

1. Có đổi tên tệp `shopee-hattrick` (chữ “hattrick” chưa giải thích được) sang `shopee-ngay-doi`? Đổi sẽ cần chuyển hướng URL (`case/shopee-hattrick.html`).
2. Có bật công khai trang case sâu cho SEO không? Hiện Worker chuyển mọi trang ngoài `/` và `/dang-nhap` sang đăng nhập; nội dung mới sẽ chưa được Google thấy (xem `MARKETING-AUDIT.md`).
3. Ai duyệt chuyên môn? Quy trình §4 cần ít nhất một người có kinh nghiệm thực chiến.
