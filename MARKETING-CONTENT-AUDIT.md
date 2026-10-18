# MARKETING-CONTENT-AUDIT — tuhocmarketing.org

*Ngày audit: 17/10/2026. Phạm vi: **những phần mà audit giáo trình 11/10/2026 (`MARKETING-CURRICULUM-AUDIT.md`) loại ra ngoài** — thư viện campaign (20 case), 12 case bấm giờ, Marketing Lab, challenge, Brand X-Ray, capstone — cộng với đối chiếu chéo 712 bài `B:` để xếp độ phủ theo 12 mảng. Không chấm lại từng bài học đã có trong audit trước.*

## 0. Đọc phần này nếu chỉ có 2 phút

1. **Thư viện 20 campaign là chỗ yếu nhất của nền tảng, đúng như nghi ngờ: chúng kể chuyện thương hiệu, không dạy tư duy chiến lược.** Kiểm bằng máy: 0/20 case có phương án thay thế, 0/20 có phần đánh đổi, 0/20 có mục "kết quả đã biết" kèm nguồn; chỉ 2/20 nêu được một con số kết quả (Nike, Patagonia); 1/20 là thất bại (Katinat), 1/20 hỗn hợp (Baemin). Phần "Why it worked" là lời giải thích một chiều.
2. **Độ chính xác của thư viện đó thấp hơn vẻ ngoài.** Đối chiếu nguồn 167 khẳng định kiểm chứng được trong 20 case: **49 đúng · 95 đúng một phần hoặc thiếu ngữ cảnh · 23 sai hoặc không có nguồn** (điểm chính xác trung bình **2,7/5**). Lỗi nặng nhất không phải số bịa mà là **quy kết nhân quả không có cơ sở** (ví dụ doanh thu Điện Máy Xanh đã tăng 211% *trước* khi TVC lên sóng; "Patagonia tăng 30%" không có số kiểm toán nào).
3. **12 case bấm giờ rất tốt về tính toán nhưng 12/12 cùng một dạng:** quyết định ngân sách/giá có một đáp án đúng. **0** case về phân khúc, định vị, thông điệp, hành vi khách, sáng tạo. Marketing Lab (Meta, Google Ads, GA4, SEO) luyện thao tác phần mềm, **không luyện chuỗi nghiên cứu → định vị → thông điệp → kênh → ngân sách → KPI → thí nghiệm**.
4. **Việc đã làm trong PR này** (chi tiết ở `CASE-EXPANSION-ROADMAP.md`): sửa mọi khẳng định bị bác trong 20 case; viết lớp phân tích sâu theo khung Observe → Analyze → Strategize → Create → Measure cho cả 20 case cũ; thêm 6 case mới (3 Việt Nam, 3 quốc tế; 5/6 là thất bại hoặc tranh cãi); dựng **Xưởng chiến lược** (Marketing Lab, không có đáp án duy nhất, dữ liệu giả lập có nhãn); thêm 19 test hồi quy.
5. **Giới hạn thật thà:** đây là audit do AI thực hiện, **không có chuyên gia marketing con người duyệt**. Hạn mức tìm kiếm web cạn giữa chừng và nhiều trang gốc (Bloomberg, Brands Vietnam, Campaign) trả 403, nên một số nguồn chỉ đọc được qua bản tóm tắt tìm kiếm. Những chỗ đó được ghi thẳng trong từng case và trong §6. Cần một người học marketing thực chiến đọc lại trước khi coi là "đã chốt".

## 1. Cách làm và giới hạn

| Việc | Cách làm | Độ tin cậy |
|---|---|---|
| Kiểm kê | Script nạp toàn bộ `assets/js/data/*.js` và 712 file bài, đếm theo loại (`/tmp` scratchpad, không commit) | Cao (máy đếm) |
| Cấu trúc case | Script kiểm các trường có/không có trong `campaigns.js`, `cases.js`, `challenges.js` | Cao |
| Độ phủ 12 mảng | Gán module → mảng (bảng §3); gán case → mảng bằng tay theo nội dung | Trung bình (phán đoán của người audit) |
| Chính xác & nguồn | 5 tác nhân tra cứu, mỗi người 5 case: mỗi khẳng định → ✔/⚠/✘ kèm sửa; kết quả đo kèm ai công bố, ngày, URL, hạn chế | Trung bình: nhiều nguồn thứ cấp; hạn mức tìm kiếm cạn |
| Chấm 6 chiều | Bảng §4: chính xác tính từ số đối chiếu; 5 chiều còn lại là **phán đoán của người audit**, ghi rõ | Thấp–trung bình |
| Giao diện | Chạy local, đọc DOM, kiểm tràn ngang ở 375 px, chạy toàn bộ bộ test | Cao với phần đã chạy |

**Không dùng được:** Search Console, analytics thật, khảo sát người học. Nên mọi nhận định về "người học có hiểu không" là suy luận từ cấu trúc nội dung, chưa phải đo lường.

## 2. Kiểm kê

| Hạng mục | Số lượng (trước PR) | Ghi chú |
|---|---|---|
| Bài học `B:` | 712 trong 79 module (+ 26 bài daily `L:` + 22 nguyên lý `P:`) | 293 bài đã có "Vì sao hiệu quả / Phản ví dụ / Góc nhìn đào sâu"; 419 bài chưa |
| Câu hỏi ngân hàng đề | 198 mục `EXAM_ITEMS` gốc + 4.984 câu từ bài (mcq 84 · case 49 · calc 38 · judge 27 ở nhóm gốc) | Đã kiểm định bởi `tools_validate_bai.mjs` (0 lỗi, 0 cảnh báo) |
| Bài thực hành có đầu ra | 37 (`BAI_TASKS`) trên 712 bài (5%) | |
| **Campaign case (thư viện)** | **20** | Đối tượng chính của PR này |
| Case có bấm giờ | 12 (`cases.js`) | Dữ liệu thương hiệu giả định, số tự khớp |
| Challenge | 33 (28 loại) | Tự chọn trước rồi xem lý do |
| Brand X-Ray | 14 | Tự viết trước, phân tích mở sau |
| Taste Training | 10 cặp A/B | |
| Marketing Lab | 4 công cụ (Meta, Google Ads, GA4, SEO), 1 brief xuyên suốt (Nắng Mai) | Số liệu minh hoạ, đã có nhãn "Giả định của mô phỏng" |
| Mini-game | 10 | |
| Capstone, phỏng vấn | 1 + 1 kịch bản | |

## 3. Độ phủ theo 12 mảng

Số bài `B:` theo mảng (module gán bằng tay, một module có thể thuộc hai mảng); cột "đã mở rộng" là số bài có phần phân tích nhân quả/phản ví dụ.

| Mảng | Module | Bài | Đã mở rộng | Campaign (20 cũ) | Case bấm giờ (12) | Marketing Lab | Nhận xét |
|---|---|---|---|---|---|---|---|
| Hành vi người tiêu dùng | 8 | 71 | 28 | MoMo, Dove | 0 | — | Bài tốt; **không có case mở** |
| Phân khúc & chọn tệp | 3 | 26 | 6 | — | 0 | Chọn nhóm tuổi/sở thích trong Meta | Mảng mỏng nhất ở cả bài lẫn case |
| Định vị | 3 | 26 | 7 | Apple, Liquid Death, Nike | 0 | — | Nhiều case kể chuyện, không có bài tập định vị mở |
| Thương hiệu | 5 | 41 | 10 | Patagonia, Vinamilk, Baemin, Biti's, Oatly, Điện Máy Xanh | 0 | — | Đông nhất ở case, nhưng nông |
| Kể chuyện | 1 | 10 | 5 | Dove, Biti's, Spotify | 0 | — | Chỉ 1 module |
| Sáng tạo (creative strategy) | 3 | 28 | 10 | Ogilvy, Nike, Dove | 0 | — | Thiếu thất bại sáng tạo (đã thêm Pepsi) |
| Định giá | 3 | 28 | 17 | — | **6** | — | Case bấm giờ lệch về đây |
| Phân phối | 3 | 28 | 19 | Highlands, IKEA | 1 | — | |
| Marketing số | 8 | 57 | 17 | Duolingo, Spotify, Coca-Cola | 0 | Meta, SEO | |
| Performance marketing | 6 | 55 | 25 | Shopee | 5 | Meta, Google Ads | Phủ tốt nhất |
| Analytics | 8 | 71 | 36 | Grab | 1 | GA4 | |
| Thí nghiệm | 4 | 39 | 20 | — | 0 | Chưa có bài thiết kế thí nghiệm mở | **Lab chưa dạy tư duy thí nghiệm** |

**Mất cân đối chính:** 11/12 case bấm giờ nằm ở hai mảng (định giá, performance). Bảy trên mười hai mảng không có một case mở nào. Marketing Lab giỏi ở "dùng công cụ" nhưng không có bài nào bắt người học **chọn đúng việc để làm trước khi chạm công cụ**.

## 4. Thư viện 20 campaign: chấm điểm và chẩn đoán

### 4.1 Cấu trúc (kiểm bằng máy)

| Thành phần | Trước PR | Sau PR |
|---|---|---|
| Phương án chiến lược thay thế | 0/20 | 26/26 (3–4 phương án, đánh dấu là phân tích của người viết) |
| Đánh đổi (được/mất) | 0/20 | 26/26 |
| Kết quả đã biết kèm ai đo, ngày, nguồn, hạn chế | 0/20 (2/20 có một con số, không dẫn nguồn bấm được) | 26/26 (≥2 dữ kiện, mỗi cái có `who/date/pub`, ≥1 có URL) |
| “Điều chưa biết” | 0/20 | 26/26 |
| Nhân quả kèm “điều khác cũng có thể giải thích” | 0/20 | 26/26 (≥2 luận điểm mỗi case) |
| Giới hạn, phản biện | 0/20 | 26/26 (≥3) |
| Bài làm thử + cách đo + câu hỏi nhìn lại | 0/20 (chỉ có 3 gạch đầu dòng "What to learn") | 26/26 |
| Nhãn bằng chứng (đã xác minh / giả định / kết luận) | Không có | Có trên từng khối |
| Thành công / hỗn hợp / thất bại | 18 / 1 / 1 (kết luận ngầm; chỉ Katinat và Baemin nhắc giới hạn) | 9 / 12 / 5 trên 26 case (gán theo bằng chứng, có test: ≥50% không phải “thành công thuần”) |

### 4.2 Chấm 6 chiều (0–5)

Chiều **Chính xác** tính từ đối chiếu nguồn: 5 × (số khẳng định đúng + 0,5 × số đúng một phần) ÷ số khẳng định kiểm chứng được. Năm chiều còn lại do người audit chấm theo cấu trúc nội dung; **không phải đo khách quan**.

| Chiều | Trước | Sau | Cơ sở |
|---|---|---|---|
| Chính xác | **2,7** (khoảng 1,7–3,9) | 4,3 | Trước: 49 đúng / 95 một phần / 23 sai trên 167 khẳng định. Sau: mọi khẳng định bị bác đã sửa; chỗ còn mơ hồ chuyển vào “chưa biết”; vẫn còn nguồn chỉ đọc được qua tóm tắt (§6) |
| Chiều sâu chiến lược | 1 | 4 | Có phương án, đánh đổi, nhân quả, giới hạn |
| Độc đáo của góc phân tích | 1,5 | 3,5 | Không còn lặp lại câu chuyện do thương hiệu/đại lý kể |
| Bằng chứng | 1 | 3,5 | Nguồn bấm được; nhưng 1/3 là báo chí thứ cấp |
| Sáng tạo (phân tích quyết định sáng tạo) | 3 | 3,5 | Đây không phải khoảng trống chính; phần visual/insight vốn mạnh |
| Tính ứng dụng | 2,5 | 4 | Bài làm thử, cách đo, nơi bài học không áp dụng được |

### 4.3 Độ chính xác theo từng case (trước khi sửa)

| Case | Khẳng định kiểm | ✔ | ⚠ | ✘ | Điểm chính xác /5 |
|---|---|---|---|---|---|
| `nike-dream-crazy` | 11 | 6 | 5 | 0 | 3,9 |
| `apple-1984` | 8 | 2 | 5 | 0 | 2,8 |
| `dove-real-beauty` | 9 | 2 | 5 | 1 | 2,5 |
| `coca-share` | 9 | 4 | 4 | 1 | 3,3 |
| `ikea-catalogue` | 9 | 1 | 6 | 2 | 2,2 |
| `patagonia-dont-buy` | 10 | 1 | 8 | 1 | 2,5 |
| `duolingo-tiktok` | 7 | 1 | 4 | 2 | 2,1 |
| `liquid-death` | 6 | 1 | 2 | 1 | 1,7 |
| `bitis-hunter` | 8 | 3 | 4 | 0 | 3,1 |
| `grab-super-app` | 8 | 0 | 7 | 1 | 2,2 |
| `shopee-hattrick` | 10 | 1 | 6 | 2 | 2,0 |
| `vinamilk-rebrand` | 11 | 3 | 3 | 4 | 2,0 |
| `highlands-third-place` | 11 | 1 | 6 | 3 | 1,8 |
| `ogilvy-rolls` | 11 | 5 | 5 | 0 | 3,4 |
| `dienmayxanh-nguoi-xanh` | 10 | 3 | 3 | 3 | 2,2 |
| `baemin-vietnam` | 7 | 3 | 3 | 1 | 3,2 |
| `momo-lac-xi` | 7 | 3 | 3 | 1 | 3,2 |
| `katinat-sao-la` | 7 | 4 | 3 | 0 | 3,9 |
| `oatly-packaging` | 10 | 4 | 6 | 0 | 3,5 |
| `spotify-wrapped` | 8 | 1 | 7 | 0 | 2,8 |
| **Tổng** | **167** | **49** | **95** | **23** | **2,7** |

*Cách đếm: các hàng trong bảng "kiểm chứng câu chữ hiện có" của tác nhân tra cứu; một hàng có cả ✔ và ⚠ tính là ⚠. Đây là số **hàng**, không phải số câu.*

### 4.4 Lỗi nghiêm trọng nhất (đã sửa trong PR)

| # | Case | Văn bản cũ | Phát hiện | Mức |
|---|---|---|---|---|
| 1 | Điện Máy Xanh | Quảng cáo “người xanh” tạo bùng nổ | Doanh thu đã **+211% sau 9 tháng 2016**, TVC chỉ lên sóng từ 1/11/2016; mở 81 cửa hàng trong 9 tháng là giải thích mạnh hơn | Nhân quả sai |
| 2 | Patagonia | “Doanh số còn tăng khoảng 30% sau đó” | Chỉ có trong case study IMD và blog; công ty tư nhân không công bố số kiểm toán; người trong cuộc nói “tôi không biết” | Số không có nguồn gốc |
| 3 | Vinamilk | “Triển khai đồng loạt”; “earned media lớn hơn ngân sách” | Các nguồn đều ghi áp dụng **dần** từ 7/2023; không có số earned media; lợi nhuận 2023 tăng nhờ nguyên liệu rẻ, doanh thu nội địa đi ngang | Sai + không nguồn |
| 4 | Shopee | Tiêu đề “2018”; “đại sứ toàn cầu”; “jingle rẻ nhất” | 9.9 đầu tiên là **2016**; 11.11 do Alibaba; Ronaldo là đại sứ **khu vực**; mỗi đơn lúc đó lỗ ~0,86–1,42 USD (EBITDA điều chỉnh); “Son Heung-min” không có nguồn | Sai mốc, quá mức |
| 5 | IKEA | “Toàn cầu”; “cửa hàng dài 1,5 km” | Bookbook là chiến dịch của **Singapore/Malaysia**; không nguồn nào ghi 1,5 km | Sai |
| 6 | MoMo | “Giới thiệu không dựa vào thưởng tiền mà dựa vào lý do xã hội” | Thể lệ 2023 thưởng cả hai bên gói quà 500.000 đồng, người mới phải liên kết ngân hàng | Sai |
| 7 | Coca-Cola | “Toàn bộ social là nội dung do người dùng tạo” | Quá mức; số +7% là do Ogilvy tự công bố; Mỹ 2014: sản lượng quý 3 vẫn giảm 1% | Quá mức |
| 8 | Rolls-Royce | “Tiêu đề là sự thật đo được”; “13 điểm đánh số”; ngầm hiểu doanh số tăng | Tiêu đề là câu trích của biên tập viên *The Motor*; số điểm khác nhau theo phiên bản; “+50%” chỉ lưu truyền qua blog | Không nguồn |
| 9 | Oatly | “(2018 →)”; “bao bì là kênh media duy nhất” | Đổi nhận diện từ **2012**; còn OOH, báo, TV; lỗ ròng 212–417 triệu USD mỗi năm 2021–2023 | Sai mốc, quá mức |
| 10 | Grab | “Cuộc chiến đốt tiền kết thúc”; “marketing theo giờ sáng/trưa/tối”; “đồng phục tài xế” | Ưu đãi vẫn 0,9–1,2 tỷ USD/năm; chỉ có bằng chứng cho từng chiến dịch giờ, không có khung chung; đồng phục chưa kiểm chứng | Sai/chưa kiểm chứng |
| 11 | Baemin | “Đặt tên món theo văn hoá mạng”; “không thể thắng bằng mã giảm giá” | Không có nguồn; Baemin khuyến mãi rất mạnh rồi hết vốn | Không nguồn |
| 12 | Biti's Hunter | Thiếu MV “Lạc trôi”; Hunter ra 2017 | Chiến dịch là hai MV nối nhau; Hunter ra đầu **2016**; “x3 trong tuần” do chính Biti's nói | Thiếu, sai mốc |

Cùng đợt, hai câu hỏi thi trong `exam-items.js` bị sửa vì dựa vào mô tả chưa kiểm chứng (“sơn xanh” → “mặc đồ xanh”; đồng phục Grab đặt thành giả định).

### 4.5 Đánh giá “kể chuyện, không phân tích”

Dấu hiệu cấu trúc của một case chỉ kể chuyện (cả 20 đều có): (a) thành công được coi là hiển nhiên; (b) một chiều “Why it worked”; (c) không phương án thay thế; (d) con số nếu có thì không ghi ai đo; (e) bài học là khẩu hiệu (“Nó chọn phe…”). Hậu quả với người học: học thuật ngữ (“mental availability”, “distinctive asset”) áp lên câu chuyện mà không kiểm xem câu chuyện có đứng được không. Lớp `campaigns-deep.js` thêm đúng phần còn thiếu và gắn nhãn từng khối.

## 5. Case bấm giờ, challenge, Lab, capstone

| Hạng mục | Điểm mạnh | Điểm yếu | Việc làm trong PR |
|---|---|---|---|
| 12 case bấm giờ | Dữ liệu mở theo câu hỏi; chấm lỗi theo mã; tính toán đúng | 12/12 là quyết định ngân sách/giá có đáp án đúng; thiếu tình huống mơ hồ; 1 đáp án “insight” và 1 “đề xuất” được chấm đúng/sai | Thêm **Xưởng chiến lược** (không đáp án duy nhất); chưa động tới 12 case cũ |
| 33 challenge | Đủ 28 loại tác vụ sáng tạo/chiến lược | Chọn A/B rồi đọc “vì sao”: không đòi lập luận bằng số liệu | Để roadmap §wave 3 |
| Marketing Lab 4 công cụ | Mô phỏng xác định, số khớp, có nhãn; KPI đúng công thức | Không có bước trước công cụ (nghiên cứu, định vị, thông điệp, thí nghiệm); một brief duy nhất | Xưởng chiến lược: 2 brief mới (kem chống nắng, khoá tiếng Anh), nối với brief Nắng Mai |
| Capstone | Dữ liệu tự khớp, rubric rõ | Chưa kiểm sâu trong audit này | Ngoài phạm vi |
| Brand X-Ray (14) | Tự viết trước | Chưa kiểm chứng nguồn (dùng khẳng định thương hiệu tự công bố) | Để roadmap |

**Nhãn dữ liệu giả lập:** các trang Lab hiện có đã ghi “Giả định của mô phỏng”. Xưởng chiến lược dùng thêm nhãn cố định `DỮ LIỆU GIẢ LẬP` trên mọi màn hình, có test (`strategy-lab.test.mjs`) kiểm nhãn và disclaimer.

## 6. Giới hạn của lần fact-check này (phải đọc trước khi tin “đã xác minh”)

- **Nguồn thứ cấp là chính.** Báo cáo gốc (Sea, Grab, Oatly, MWG) có một phần đọc được trực tiếp; còn Bloomberg, Brands Vietnam, Campaign, Patagonia, Fast Company trả 403, chỉ đọc được qua tóm tắt tìm kiếm. Mỗi dữ kiện trong từng case ghi `caveat` khi chưa mở được trang gốc.
- **Hạn mức tìm kiếm cạn** khi các tác nhân đang làm: chưa kiểm được đồng phục tài xế Grab, kết cục pháp lý thương vụ Uber, tin sáp nhập GoTo, mô tả chi tiết TVC Điện Máy Xanh, bản scan quảng cáo Rolls-Royce gốc, doanh số Shopee Việt Nam riêng. Đã chuyển các mục này vào “Điều chưa biết”, không đoán.
- **Số mâu thuẫn không giải quyết được** được giữ nguyên dưới dạng khoảng (lượt xem Dove 114–163 triệu; thị phần Vietjet theo nhiều thước đo; số cửa hàng Highlands; lỗ FY2022 của Tiki 93 hay 116,25 triệu USD).
- **Ngày đối chiếu: 17/10/2026**, mọi “đã xác minh” chỉ đúng tại ngày đó. Doanh nghiệp, giá cổ phiếu và vụ kiện có thể đã thay đổi.
- **Chưa kiểm** phần pháp lý của khuyến mại bốc thăm (MoMo) ở văn bản gốc; chưa duyệt đạo đức bởi người ngoài.
- **Ứng viên bị loại** vì nguồn yếu: TH true MILK, Cocoon, Trung Nguyên Legend. **Chưa nghiên cứu** do hết hạn mức: Burger King “Moldy Whopper”, Gap, Dollar Shave Club, Airbnb, Heineken Tết, Cốc Cốc, Ông Thọ.

## 7. Bài học `B:` — bổ sung so với audit 11/10

Không chấm lại. Chỉ ghi các phát hiện thêm: (1) 419/712 bài chưa có phần nhân quả/phản ví dụ — ưu tiên theo mảng ở §3 (phân khúc, định vị, kể chuyện còn mỏng); (2) chỉ 37 bài có bài thực hành có đầu ra; (3) các bài `in02` (case Việt) và `in03` (case quốc tế) đã được viết thận trọng (“điều được biết rộng rãi”, số liệu minh hoạ) và không chứa các lỗi ở §4.4, trừ hai câu thi nằm ở `exam-items.js` (đã sửa).

## 8. QA triển khai

| Kiểm tra | Kết quả |
|---|---|
| `node --test tests/*.test.mjs` | 167 test đạt (gồm 7 test `case-deep`, 12 test `strategy-lab`, 5 test `cases-new`) |
| `cd api && npm test` | 43 test đạt |
| `node tools_validate_bai.mjs` | 712 bài · 0 lỗi · 0 cảnh báo |
| Giải thử một case mới trên trình duyệt (`dinh-vi-so-ngay`, gồm đáp án âm) | Chấm đúng 3/3 tiêu chí; thư viện hiện 18 case |
| Xưởng chiến lược, 2 brief × đủ 7 bước trên trình duyệt | Hoàn thành bằng thao tác thật (DOM), không lỗi console liên quan; báo cáo hiện đúng |
| Trang case sâu ở 375 px | Không tràn ngang; phần chọn phương án, nguồn, nhãn hiển thị |
| Lỗi console còn lại | 404/501 từ API cục bộ không chạy (đã có từ trước khi sửa) |
| Chưa làm | Chưa duyệt bằng người học thật; chưa kiểm trên Safari iOS thực; chưa deploy |

## 9. Khuyến nghị tiếp theo

Xem `CASE-EXPANSION-ROADMAP.md`. Ba việc đáng làm trước: (1) một chuyên gia marketing thực chiến đọc lại 26 case; (2) kiểm chứng 8–10 nguồn còn đọc qua tóm tắt khi có lại hạn mức tìm kiếm; (3) thêm case bấm giờ về phân khúc, định vị và thông điệp — mảng hiện không có case mở nào.

## 10. Cập nhật: 6 case bấm giờ mới (18/10/2026)

Khoảng trống ở §3 (12/12 case bấm giờ là quyết định ngân sách/giá) đã được lấp một phần bằng 6 case trong `cases.js`: phân khúc, hành vi khách, định vị, thông điệp, tâm lý giá, được nhớ tới.

| Case | Mảng | Mức | Điều dạy |
|---|---|---|---|
| `phan-khuc-sua-hat` | Phân khúc (c01) | Trung bình | Phân khúc đáng chọn là nơi lãi gộp trọn đời vượt CAC nhiều nhất, không phải nơi đông nhất |
| `hanh-vi-rau-huu-co` | Insight, tâm lý (c02, c03) | Trung bình | Ý định nói ra ≠ hành vi; tìm “việc khách thật sự thuê sản phẩm làm” |
| `dinh-vi-so-ngay` | Định vị (c04) | Khó | Thua tổng điểm vẫn có thể đứng ở thuộc tính quan trọng nhất mà mình hơn rõ |
| `thong-diep-excel-ke-toan` | Thông điệp (c08) | Dễ | CTR cao với lời hứa lệch trang đích; đọc kết quả trên mẫu nhỏ |
| `mo-than-goi-gia` | Tâm lý giá (c03, c13) | Khó | Hiệu ứng gói thứ ba, và vì sao so tháng này với tháng trước chưa chứng minh nhân quả |
| `duoc-nho-ca-phe-lon` | Được nhớ tới (c06, c05) | Trung bình | Nhận biết có gợi ý che việc không được nghĩ tới trong tình huống mua |

**Phát hiện khi làm:** các năng lực c01, c02, c04, c05, c08 trước đây **không có case nào** nên người học không thể lên mức “Phân tích” ở bản đồ năng lực qua case; nay c02, c04, c08 có 2 case, nhưng **c01 và c05 mới có 1 case** (cần ít nhất 2 để lên mức “Thuyết phục”): ưu tiên trong đợt tới.

**Chất lượng đề (đã sửa):** trước đây 24/24 câu chọn của 12 case cũ có đáp án đúng là phương án dài nhất và chỉ ở vị trí 1–2 (đúng loại lỗi audit giáo trình đã nêu: người học đoán được bằng hình thức). Đã viết lại các phương án sai cho đủ dài và đủ thuyết phục, rồi xáo vị trí. Kết quả trên 36 câu chọn của 18 case: đáp án đúng dài nhất ở 16/36 (44%, trước đó 24/24 ở case cũ); vị trí 1/2/3/4 = 9/9/14/4 (trước đó 12/12/0/0); không case nào có đáp án đúng dài nhất ở cả hai câu. Test `cases-new.test.mjs` khoá các ngưỡng này (≤ 55% dài nhất, ≤ 45% mỗi vị trí, mỗi câu q4/q5 rơi vào ≥ 3 vị trí, độ dài các phương án không chênh quá 2,2 lần). Lưu ý: nội dung các phương án sai nay có thêm chi tiết minh hoạ; **đã giữ nguyên ý nghĩa đúng/sai và lời giải**, nhưng chưa có người duyệt đọc lại.

**Đồng bộ phía máy chủ:** `api/src/generated/xp-refs.json` (danh sách case hợp lệ cho XP) phải sinh lại khi thêm case — test `xp-trust` đã bắt lỗi này; `bank.json` cũng được sinh lại (đang lệch từ khi sửa hai câu thi ở PR này).

