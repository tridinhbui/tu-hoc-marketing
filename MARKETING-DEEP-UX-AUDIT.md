# Deep UX Audit, Usability Simulation & Learning Experience Review — tuhocmarketing.org

**Ngày:** 18/10/2026
**Nhánh:** `ux/deep-audit` (worktree `../tuhocmarketing-ux`, tách từ `origin/main` @ `718b48d`).
**Trạng thái:** chưa merge, chưa deploy.
**Môi trường test:** Worker local (`wrangler dev --local`, D1/KV local, DB trống), Chrome headless qua Playwright 1.56. Tài khoản test `*@example.com` đăng nhập bằng link dev. Không đụng dữ liệu người dùng thật.

> **Phạm vi bằng chứng — đọc trước:**
> - Toàn bộ "user journey" trong báo cáo là **expert simulation**: kịch bản Playwright cộng với đánh giá của người audit. Đây **không phải usability test có người thật tham gia**. Thời gian đo được là thời gian máy bấm, không phải thời gian người đọc và nghĩ.
> - Các kết luận về "bối rối" và "bỏ cuộc" là giả thuyết có căn cứ (vị trí phần tử, số lựa chọn, quãng cuộn). Cần xác nhận bằng 5–8 buổi test có người thật (xem Roadmap).

---

## 1. Tóm tắt

**Vì sao một sản phẩm thiết kế sáng tạo vẫn khó dùng?** Nguyên nhân không nằm ở thẩm mỹ. Có năm nguyên nhân gốc lặp lại ở nhiều trang:

1. **Điểm đến không khớp lời hứa.**
   - Landing hứa "case thật" (poster Nike, Apple, Duolingo). Sau đăng nhập, người học lại rơi vào danh sách 18 case *giả định* có bấm giờ.
   - Trang "Bắt đầu từ đâu" hỏi "Bạn muốn học theo hướng nào?" nhưng phần chọn hướng nằm cách đó 2.631px.
2. **Nội dung chính bị đẩy xuống dưới các lớp phụ.**
   - Bài học có 4 thẻ meta (điều kiện XP, mẹo, "vì sao quan trọng", chế độ đơn giản) đứng trước câu chuyện.
   - Trang case: tiêu đề cỡ 8rem cộng một tấm màu 16:9 chiếm trọn màn hình đầu, chỉ còn 72 chữ.
3. **Token màu bị phân mảnh.** Năm file CSS tự định nghĩa "mực phụ" với alpha 0,50–0,58. Trung bình **20,4%** chữ trên các trang sau đăng nhập dưới chuẩn WCAG AA (4,5:1), nặng nhất ở hồ sơ 47%, thư viện case 50%.
4. **Tên class trùng giữa các stylesheet.** `.kpi` có ở 4 file. Rule theme của `atelier.css` thắng `lab.css`, nên số liệu ở Xưởng chiến lược vỡ thành "290.00 / 0 đ".
5. **Lớp nhắc nhở và gamification chồng lên nội dung.**
   - Bong bóng chatbot tự gõ ở *mọi* trang, mỗi trang một lần, đè lên cột phải (nhãn "Chưa làm", danh sách quest, bảng xếp hạng).
   - Dashboard có 3 CTA nền đặc cùng lúc.

**Kết quả sau sửa** (cùng kịch bản, đo lại):

| Chỉ số | Trước | Sau |
|---|---|---|
| Chữ thiếu tương phản, trung bình trang sau đăng nhập | 20,4% | **4,2%** |
| Bài 1 (390px): khoảng cách tới phần nội dung đầu tiên | 1.378px | **936px** |
| Bài 1 (390px): câu hỏi đầu tiên | 1.676px | **1.234px** |
| Case thật (390px): "Vấn đề kinh doanh / Bài toán" | 1.523px (≈1,8 màn) | **550px (màn đầu)** |
| Landing → đọc một case thật | 3 click, phải tự tìm tab | **2 click, case thật hiện ngay** |
| Chủ shop thấy hướng "Marketing cho business của mình" | 2.631px | **1.218px** |
| CTA nền đặc trên màn đầu dashboard (1440) | 3 | **1** |
| Lộ trình "đủ": bài cũ (L:) đầu tiên | vị trí 8 | **vị trí 72** |
| Lỗi JS / tràn ngang trên 46 trang×cỡ màn | 0 / 0 | 0 / 0 |

**Kết luận: CONDITIONAL PASS.**
- Không tìm thấy lỗi P0 (chặn hoàn toàn mục tiêu chính).
- **13 lỗi P1 đã sửa và đã đo lại.**
- P2 và các thay đổi cấu trúc (IA, thang chữ, gamification) để ở Roadmap vì cần quyết định sản phẩm và test có người thật.

---

## 2. Phương pháp

| Công cụ | Đo gì | File |
|---|---|---|
| `crawl.mjs` | 23 trang × 2 cỡ (1440×900, 390×844 mobile/touch). Đo: số chữ (tổng, trên màn đầu), % chữ < 13px, % chữ dưới WCAG AA (tính theo màu thực tế và nền gần nhất), số phần tử tương tác, CTA nền đặc trên màn đầu, số "card", vùng chạm < 32px, animation lặp vô hạn, tràn ngang, lỗi JS | `qa/ux-audit/{before,after}/metrics.json` |
| `journeys.mjs` | 5 hành trình. Ghi thời gian, số click, số lựa chọn nhìn thấy ở mỗi bước, toạ độ Y của mục tiêu | `qa/ux-audit/{before,after}/journeys.json` |
| `rm.mjs` | `reducedMotion: 'reduce'` thật của Playwright, đếm animation lặp vô hạn | (kết quả ở §9) |
| Đọc mã nguồn | Mỗi lỗi đều truy tới dòng code | xem cột Root cause |
| Review nội dung | Một agent đọc dữ liệu bài, case, quiz, Lab. Các phát hiện P1 tôi đã tự kiểm lại (đánh dấu ✔︎) | §6 |

"Before" chạy trên mã gốc bằng `git stash` (chỉ giữ lại sửa luồng `next` của đăng nhập email, để mọi hành trình đi được tới đích). "After" chạy trên nhánh này.

Script đo nằm ngoài repo, trong scratchpad của phiên làm việc. Có thể đưa vào `qa/` nếu muốn chạy lại.

---

## 3. 5 user journeys (expert simulation)

| # | Persona | Hành trình | Trước | Sau | Ma sát chính còn lại |
|---|---|---|---|---|---|
| J1 | Người mới từ số 0 (390px) | Landing → "Bắt đầu miễn phí" → đăng nhập → Dashboard → "Bắt đầu bài đầu tiên" → trả lời câu 1 | PASS · 2 click · nội dung bài ở 1.378px | PASS · 2 click · **936px** | Dashboard mobile: ảnh chân dung lớn và thẻ XP chiếm màn hai; 25 mục menu trong ngăn kéo |
| J2 | Sinh viên / Gen Z (390px) | Landing "Khám phá các case" → đăng nhập → tìm case thương hiệu thật → đọc "Bài toán" | PASS nhưng **không thấy case thật**, phải đoán tab "Đọc case thật" · 3 click · bài toán ở 1.523px | PASS · **2 click** · gallery case thật · **550px** | Ba nút chuyển chế độ case chiếm ~170px đầu trang mobile |
| J3 | Người đi làm (1440) | Đăng nhập → Marketing Lab → "Làm" bước 01 SEO | PASS · 1 click · hành động đầu tiên ở 268px | PASS (không đổi) | Bước 05–06 trước đây là ngõ cụt "Sắp mở"; nay trỏ sang Xưởng chiến lược (kịch bản riêng) |
| J4 | Chủ doanh nghiệp nhỏ (1440) | Đăng nhập → "Bắt đầu từ đâu" → chọn "Marketing cho business của mình" | PASS · hướng ở **2.631px**, sau bản đồ địa hình | PASS · **1.218px**, phần chọn hướng lên trước bản đồ | 8 hướng, mỗi hướng một nút "Chọn hướng này" giống hệt nhau |
| J5 | Người có kinh nghiệm (1440) | Đăng nhập → Xưởng chiến lược → Bước 1 | PASS · 17 điều khiển ở bước 1 · KPI vỡ chữ | PASS · KPI hiển thị đúng | Chấm phần chữ bằng đếm chữ và regex (§6) |

**Hiểu mình cần làm gì / vì sao / nhận được gì ở từng bước?**
- Dashboard: **có** CTA rõ ("Bắt đầu bài đầu tiên"), nhưng trước sửa bị 2 nút mực đen và bong bóng chatbot tranh chú ý.
- Bài học: **có** "điều kiện hoàn thành". Thẻ "Vì sao bài này quan trọng" thực chất chỉ nói "bài 4/7 của module…", chưa phải *why*.
- Case: **chưa** nói bài toán ở màn đầu (đã sửa).
- Lab: có brief rõ, nhưng hai bước cuối là ngõ cụt (đã sửa).

**Điểm có nguy cơ bỏ cuộc (giả thuyết, cần test người thật):**
1. Ngay sau đăng nhập ở J2: lời hứa "case thật" bị vỡ.
2. Đầu bài học trên mobile: hơn một màn hình meta trước khi có câu chuyện.
3. Bài thứ 8 của lộ trình người mới: chuyển từ chuyện quán phở sang danh sách thuật ngữ tiếng Anh (L:53).

---

## 4. Đánh giá từng trang (số đo trước → sau, 1440 / 390)

| Trang | Mục tiêu người dùng | Quan sát có số liệu | Đánh giá |
|---|---|---|---|
| Landing `/` | Bị thu hút, biết bắt đầu ở đâu | 1.646 chữ; 1 CTA chính; 10 animation lặp (tắt hết khi reduced-motion); poster case Nike/Apple/Duolingo dẫn tới danh sách case giả định | Đẹp và có nhịp. **Lỗi điểm đến** (đã sửa). Mọi CTA đều phải đăng nhập, không xem trước được case nào (Roadmap) |
| Đăng nhập | Vào nhanh | 3 phần tử tương tác; luồng email làm mất `next` (prod chỉ bật Google, Google giữ `next`) | Gọn. Đã sửa `next` cho luồng email |
| Dashboard `hoc` | Biết hôm nay học gì | 403 chữ trên màn đầu, 23 + 24 (sidebar) phần tử tương tác, 3 CTA đặc, 39% chữ < 13px, lowC 28% → **2%** | **Quá tải**: hero, thẻ XP, bộ sưu tập 30 cấp, 6 chặng, 4 tab nhiệm vụ, bảng xếp hạng (rỗng với người mới), chatbot. Đã giảm còn 1 CTA chính; cấu trúc để Roadmap |
| Bắt đầu từ đâu | Chọn hướng | Hướng "owner" ở 2.631px → **1.218px** | Đã đưa "01 Chọn hướng" lên trước bản đồ |
| Bài học `bai` | Đọc chuyện → hiểu → luyện | Nội dung đầu ở 1.378px → **936px** (390); 19 vùng chạm < 32px (thuật ngữ, nút công cụ) | Nội dung tốt, story-first. Đã gộp 3 thẻ meta vào khối "Trước khi đọc" (gập mặc định) |
| Học theo nghề `ban-do` | Biết nghề/vùng nào | 58% chữ < 13px, lowC 36% → **8%**; chip vàng trên nền kem ~1,9:1 → đã sửa | Thông tin dày ("Mốc kế tiếp: còn 760 bài") làm nản người mới (Roadmap) |
| Thư viện case bấm giờ | Chọn case | 390px: tiêu đề vỡ **một chữ một dòng** vì 3 thẻ meta chiếm cột phải → đã sửa; lowC 50% → **3%** | Tốt sau sửa |
| Trang case thật | Hiểu thương hiệu gặp chuyện gì | 72 chữ trên màn đầu → **163**; "Bài toán" ở màn đầu ở cả hai cỡ | Đã sửa hero. Nhãn mục Observe/Analyze/Strategize/Create/Measure tiếng Anh lẫn tiếng Việt (P2) |
| Phòng thử thách `quiz` | Chọn thử thách | 40% chữ < 13px, lowC 39% → **3%** | OK sau sửa token |
| Thi vượt chặng | Biết điều kiện | lowC 31% → **1%** | OK |
| Marketing Lab | Đi hết chuỗi brief → báo cáo | Không có CTA đặc ở màn đầu; bước 05–06 "Sắp mở" | Đã nối bước 05–06 sang Xưởng chiến lược |
| Xưởng chiến lược | Lập chiến lược | KPI "290.00 / 0 đ" vỡ dòng → đã sửa | Phương pháp còn yếu ở chấm phần chữ (§6) |
| MarSocial | Đọc / đăng | lowC 23% → 3%; 18 vùng chạm nhỏ (desktop) | Roadmap: vùng chạm |
| Hồ sơ `tai-khoan` | Xem tiến độ | lowC 47% → **0%** | OK |
| Kingdom | Chơi | 30 animation lặp (tắt khi reduced-motion) | Gamification tách riêng, không chen vào học: chấp nhận |

---

## 5. Cognitive load, visual hierarchy & creative direction

### Cognitive load / IA

- **Sidebar có 24–25 phần tử** trên mọi trang sau đăng nhập, gồm 3 huy hiệu "TIN MỚI/HOT".
  - Có ba cách vào học khác nhau: "Bắt đầu từ đâu", "Học bài", "Học theo nghề".
  - Có ba cách luyện: Phòng thử thách, Thi vượt chặng, Kingdom.
  - Người mới chưa có tiêu chí để chọn. → Roadmap R2: gom theo *việc* thay vì theo *tính năng*.
- **Dashboard có hai hệ gamification song song:** "Bộ sưu tập con dấu" (30 cấp) và "Sáu chặng" (760 bài). Cùng lúc hiện "0/760 bài · 0% hành trình" và "Còn 760 bài". Con số 760 ở màn đầu dễ gây choáng thay vì tạo động lực. → Roadmap R3.
- **Progressive disclosure** đang làm tốt ở: bài học có câu "Dừng & Kiểm tra" và phần "Nhìn lại"; Lab Meta có `what`/`why`/`hint` từng bước. Làm chưa tốt ở: đầu bài học và đầu trang case (đã sửa).

### Visual hierarchy

- Landing có thứ bậc rõ: một tiêu đề, một CTA, nhịp section rõ.
- Ở các trang học, thứ bậc bị phá bởi chữ nhãn 10,5–13px.
  - Chiếm 39–58% số chữ ở `hoc` và `ban-do`, dùng mực phụ dưới chuẩn.
  - Mắt không biết đâu là thông tin, đâu là trang trí.
  - Đã sửa phần tương phản. Thang chữ (quá nhiều cỡ dưới 13px) để Roadmap R4.

### Creative direction (Premium Editorial Marketing Studio)

| Tiêu chí | Đánh giá | Bằng chứng |
|---|---|---|
| Bảng màu espresso / ivory / terracotta | **Đồng bộ** giữa landing và ứng dụng | Ảnh `1440-hoc_html`, `1440-lab_html` |
| Serif biểu cảm | Đồng bộ (Fraunces cho tiêu đề, Be Vietnam Pro cho thân) | `families` trong metrics |
| Hình ảnh có chủ đích | **Lệch** | Hero dashboard dùng ảnh chân dung đàn ông (`assets/img/hero_editorial_face.jpg` hoặc `hero_model.jpg`) không liên quan tới bài "hai quán phở". Cần xác minh nguồn ảnh (stock hay AI) theo nguyên tắc "không dùng người AI giả". Trang case dùng tấm màu trừu tượng thay vì hình của chiến dịch |
| Giọng thương hiệu | **Lệch nhẹ** | Chữ viết tay tiếng Anh trên site tiếng Việt: "practice safely — fail, fix, repeat", "From the basics to things you can do…", "Start here", "LEARN IT. DO IT."; nhãn mục case Observe/Analyze… |
| Không lạm dụng card / gradient / animation | Phần lớn đạt | Lab, bài học, case dùng đường kẻ thay cho card. Dashboard dày card và huy hiệu. Kingdom 30 animation nhưng tách riêng |
| Không như template EdTech hay AI-generated | Landing, case, Lab: đạt. Dashboard: gần với "game dashboard" hơn studio | Ảnh `1440-hoc_html` trước sửa |

**Kết luận creative:** sự thiếu đồng bộ người dùng cảm thấy *không đến từ màu hay font*. Nó đến từ **mật độ**: landing thở, các trang học thì nhồi. Hướng sửa là giảm lớp phụ (progressive disclosure) và gom điều hướng, không phải đổi phong cách.

---

## 6. Case Study & Marketing Lab: usability và phương pháp

### Case study (đã đọc 10 case lớp sâu)

- **Mạnh:** mỗi case có bối cảnh, vấn đề, quan sát khách, insight, thực thi, kết quả có nguồn (`who/date/url/caveat`), mục "Chưa biết, đừng khẳng định", nhân quả và yếu tố nhiễu, giới hạn áp dụng. Nhãn bằng chứng V/A/K là điểm khác biệt hiếm có.
- **Yếu:**
  - **Thiếu trường `target` và `positioning` riêng** (26/26 case; agent đọc, tôi kiểm lại cấu trúc trong `campaign.html` ✔︎). Người học phải tự suy ra tệp khách và định vị. → P1 nội dung, Roadmap R5.
  - **Câu chốt `quote` in to khái quát quá mức** (Nike, Shopee: "bị ghét mà nhớ vẫn thắng…"), mâu thuẫn với các case thất bại. Câu này còn được lưu vào sổ tay. → P1 nội dung, cần biên tập viên quyết; Roadmap R6.
  - Ghi chú biên tập "Chưa giải thích được chữ 'hattrick'…" lộ ra cho người học (`campaigns-deep.js` mục `shopee-hattrick`). → **đã xoá** ✔︎.
  - Văn phong lớp sâu là ghi chú kiểm chứng nhiều hơn là kể chuyện. Màn đầu trước đây không có câu chuyện nào → **đã thêm "Bài toán"** ngay dưới tiêu đề, giữ nhãn bằng chứng.
  - **Điểm đến từ landing sai lớp:** poster Nike/Apple/Duolingo dẫn tới danh sách case *giả định* → **đã sửa**, mỗi poster mở đúng case, các link chung mở `gallery.html`.

### Marketing Lab

- **Lab công cụ** (Meta/Google Ads/GA4/SEO): brief rõ, mỗi bước có giải thích. Bước 05 "Chọn kênh & phân bổ" và 06 "Tóm tắt điều hành" là ngõ cụt "Sắp mở" → **đã nối** sang Xưởng chiến lược (có ghi chú "kịch bản riêng").
  - Còn lệch dữ liệu giữa hai Lab cùng thương hiệu Nắng Mai: 10 triệu so với 30 triệu, khác tệp tuổi. → P2, R7.
- **Xưởng chiến lược** (người mới có tự đi research → insight → định vị → thông điệp → kênh → ngân sách → đo không?):
  - Đủ chuỗi bước, giới hạn 4 nguồn nghiên cứu, báo "Còn thiếu" để chặn bước.
  - **Không có bước viết insight riêng**: đi thẳng từ nguồn sang chọn tệp và định vị (`strategy-ui.js` STEPS).
  - Định vị và thông điệp là **chọn trong menu soạn sẵn**.
  - Phần chữ chấm bằng **đếm chữ và regex** (`strategy-eval.js:112-122, 239-252`).
  - Phản hồi **chỉ có ở báo cáo cuối**.
  - Bước thí nghiệm dùng MDE và khoảng tin cậy 95% mà không có bài bắc cầu.
  - → Lỗi **phương pháp**, P1. Không sửa trong vòng này vì cần thiết kế lại cách chấm. Roadmap R8.

### Nội dung bài và quiz (agent đọc toàn bộ 712 bài, mẫu 40 câu)

- **Lộ trình người mới gãy ở bài 8:** L:53 (danh sách thuật ngữ tiếng Anh), L:56, L:61, L:57, L:71, L:74 chen giữa module ob01. Tôi đã tái hiện bằng `PATHS` ✔︎. Lỗi xảy ra ở *mọi* lộ trình có module cũ chưa liệt kê, ví dụ "owner" có L:53 ở vị trí 8. → **đã sửa** ở bộ so sánh (`bai-index.js`).
- **Chưa có bài "bốn nghề mang tên marketing"** (brand, performance, tâm lý, sáng tạo đặt cạnh nhau). tp05-02 gần nhất nhưng nằm sâu ở chặng 3. → P1 phương pháp, R9.
- **Quiz:** khoảng 55% câu vận dụng hoặc phán đoán, 20% thuần nhớ, 25% câu tính; có 189 câu "tình huống mới".
  - Đáp án đúng là phương án dài nhất ở 36,3% (ngẫu nhiên là 25%).
  - Một số phương án sai quá lố, dễ loại.
  - → P2, R10.

---

## 7. Root-cause table (P0 / P1 / P2)

Trạng thái: ✅ đã sửa và đo lại · 🟡 Roadmap · ⚪ chấp nhận.

| # | Trang | Mục tiêu người dùng | Ma sát | Bằng chứng | Root cause | Mức | Sửa (ít phá vỡ nhất) | Tác động kỳ vọng / đo được | TT |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Landing → case | Xem case thật | Sau đăng nhập ra danh sách case giả định; phải đoán tab | J2 before: không thấy Nike/Apple/Dove; 3 click | `index.html`: 6 link `next=/case-thu-vien.html` (thư viện *bấm giờ*) | P1 | Poster → đúng case (`campaign.html?id=`); link chung → `gallery.html` | J2: 3 → 2 click, case thật hiện ngay | ✅ |
| 2 | Bài học | Vào câu chuyện | 4 thẻ meta trước nội dung | Nội dung đầu ở 1.378px (390) | `bai.html`: tip, why, ELI là 3 `lp-card` độc lập trước `PLAN.pre` | P1 | Gộp vào `<details class="lp-before">` "Trước khi đọc" (gập mặc định); bỏ khỏi vùng tự gắn thuật ngữ | 1.378 → 936px (−32%) | ✅ |
| 3 | Lộ trình (mọi path) | Học liền mạch | Bài 8–13 là bài ghi chú cũ, cắt ngang module kể chuyện | `PATHS.full[7..12]` = L:53…L:74; owner L:53 ở vị trí 8 | `bai-index.js`: `pos()` cho module cũ là −1 (đứng trước); `full` theo thứ tự `STAGES` (s1m1 trước ob01) | P1 | Module cũ đứng sau trong cùng bước; `full`: B trước L trong cùng chặng | L: đầu tiên ở vị trí 8 → 72 (full), 45 (owner); 760/760 bài giữ nguyên | ✅ |
| 4 | Toàn app | Đọc được nhãn, số liệu | Chữ phụ mờ | lowC trung bình 20,4%; hồ sơ 47%, case 50% | 5 token "mực phụ" độc lập: `--at-ink-3` .52, `--r-ink2` .58, `--st-ink-3` .58, `--lb-ink3` .50, `--ink-50`/`--ink-dark-50` .52–.56, `--ink-38` .58 | P1 | Nâng tất cả lên .64 (≥4,5:1 trên nền kem). Chip vàng `#7a5410` | 20,4% → 4,2% | ✅ |
| 5 | Thư viện case (390) | Đọc tiêu đề case | Tiêu đề vỡ một chữ một dòng | Ảnh `before/journey-j2-genz-case-1.jpg` | `.item` grid `44px 1fr auto`; cột `auto` chứa 3 thẻ meta, ăn hết bề ngang | P1 | ≤560px: 2 cột, meta xuống dưới tiêu đề | Ảnh `after/390-case_thu_vien_html.jpg` | ✅ |
| 6 | Trang case | Biết thương hiệu gặp chuyện gì | Màn đầu chỉ có tiêu đề cộng tấm màu | 72 chữ trên màn đầu; "Vấn đề" ở 1.523px (390) | `campaign.html`: H1 `9vw/8rem` cộng `plate--wide` 16:9 | P1 | H1 ≤5,6rem; "Bài toán" (kèm nhãn bằng chứng) dưới H1; tấm màu thành dải 120–240px | 550px (390), 163 chữ trên màn đầu | ✅ |
| 7 | Bắt đầu từ đâu | Chọn hướng học | Câu hỏi ở H1, câu trả lời cách 2,6k px | J4 before | Section `#map` đứng trước `#s1` | P1 | Đổi thứ tự `#s1` trước `#map`, tab theo đó | 2.631 → 1.218px | ✅ |
| 8 | Mọi trang app | Đọc nội dung cột phải | Bong bóng chatbot gõ chữ đè nội dung ở mỗi trang | Ảnh `before/1440-hoc`, `ban-do`, `case-thu-vien` | `YY.tip` giới hạn 1 lần *mỗi trang* mỗi phiên | P1 | Tối đa 2 lời nhắc mỗi phiên | Không còn che từ trang thứ 3 | ✅ |
| 9 | Dashboard | Biết bước tiếp theo | 3 CTA nền đặc tranh nhau | `ctaAbove` 3 | "Học bài ngay" (trùng đích CTA hero) và "Xem bản đồ" dùng nền mực đặc | P1 | Một nút viền, một link chữ | 3 → 1 | ✅ |
| 10 | Xưởng chiến lược | Đọc brief | Số "290.00 / 0 đ", "30 / triệu" | Ảnh before j5-2 | `.kpi b` của theme ivory (`atelier.css`, 3,2rem) thắng `lab.css`, cộng `overflow-wrap:anywhere` | P1 | Rule Lab đặc hiệu hơn, chỉ ngắt ở khoảng trắng | Ảnh after j5-2 | ✅ |
| 11 | Lab công cụ | Đi hết 6 bước | Bước 05–06 "Sắp mở" | `home.js:33` | Chưa xây bước alloc/summary | P1 | Nút "Luyện ở Xưởng chiến lược" (ghi rõ kịch bản riêng) | Không còn ngõ cụt | ✅ |
| 12 | Dashboard | Thấy cấp độ | "Học viên · cấp 1" gần như vô hình; "ngàyliên tiếp" dính chữ | contrast 1,06:1 | `.at-hero .at-kick` màu cho nền tối áp lên thẻ trắng; `ngày<br>liên tiếp` không có khoảng trắng | P2 | Rule riêng cho `.at-pass__who`; thêm khoảng trắng | Đọc được | ✅ |
| 13 | Đăng nhập email | Quay về trang định tới | Luôn về `/tai-khoan` | J1–J5 lần đầu đều rơi vào `tai-khoan?dang-nhap=ok` | `auth.js` không lưu `next` (Google có) | P2 (prod tắt email) | Lưu `{email,next}` trong KV; tương thích link cũ | J1–J5 tới đúng trang | ✅ |
| 14 | Case Shopee | Tin nội dung | Ghi chú biên tập lộ ra | `campaigns-deep.js` | Ghi chú nội bộ nằm trong `unknown` | P2 | Xoá câu | — | ✅ |
| 15 | Sidebar / IA | Biết vào đâu | 24–25 mục, 3 lối vào học, 3 lối luyện, huy hiệu | metrics `shellInteractive` | IA theo tính năng | P1 | Gom theo việc: Học / Luyện / Case / Lab / Cộng đồng; ẩn huy hiệu sau 7 ngày | Cần test người thật trước | 🟡 R2 |
| 16 | Dashboard | Có động lực | Hai hệ cấp độ, "0/760", bảng xếp hạng rỗng | Ảnh before | Gamification thêm dần theo lớp | P1 | Người mới (<3 bài): ẩn bộ sưu tập và bảng xếp hạng, hiện "3 bài đầu" | Cần A/B | 🟡 R3 |
| 17 | `hoc`, `ban-do` | Đọc nhãn | 39–58% chữ < 13px | metrics `smallPct` | Nhiều cỡ 10,5/11/11,5/12/12,5px | P2 | Thang chữ tối thiểu 13px cho chữ có nghĩa; 11px chỉ cho chữ hoa trang trí | — | 🟡 R4 |
| 18 | Case | Hiểu tệp và định vị | Không có ô Target, Positioning | 26/26 case | Khung Observe→Measure thiếu 2 ô | P1 | Thêm 2 trường một dòng, hiện ở Analyze | — | 🟡 R5 |
| 19 | Case | Mang đi bài học đúng | Câu chốt khái quát quá mức | Nike, Shopee | Viết cho hay, chưa đối chiếu case thất bại | P1 | Thêm điều kiện hoặc nhãn K | — | 🟡 R6 |
| 20 | Xưởng chiến lược | Học từ phản hồi | Không có bước insight, chấm bằng đếm chữ, phản hồi dồn cuối | `strategy-eval.js` | Thiết kế chấm | P1 | Ô insight bắt buộc trích nguồn r#; nhận xét theo bước; bài mẫu sau khi nộp | — | 🟡 R8 |
| 21 | Bài học (390) | Chạm chính xác | 19 vùng chạm < 32px | metrics `smallTap` | Link thuật ngữ, nút công cụ nhỏ | P2 | Tăng vùng chạm bằng padding hoặc `::after` | — | 🟡 R11 |
| 22 | Giới thiệu | Tin trước khi đăng ký | "Về chúng tôi" yêu cầu đăng nhập | `/gioi-thieu` → 302 | `needsLogin` chặn mọi trang trừ landing và đăng nhập | P2 | Mở `gioi-thieu` và 1–2 case mẫu công khai (quyết định sản phẩm) | — | 🟡 R1 |

---

## 8. Thay đổi đã triển khai (nhánh `ux/deep-audit`)

| File | Thay đổi |
|---|---|
| `index.html` | Poster Nike/Duolingo/Apple → đúng case; "Khám phá các case" → `gallery.html` |
| `bai.html` | Khối "Trước khi đọc" (`details.lp-before`) gộp mẹo, vì sao, chế độ đơn giản; loại khỏi vùng gắn thuật ngữ |
| `assets/js/data/bai-index.js` | Thứ tự lộ trình: module cũ đứng sau trong cùng bước; `full`: B trước L trong cùng chặng |
| `bat-dau.html` | "01 Chọn hướng" trước "Bản đồ" (cả section lẫn tab) |
| `campaign.html` (+ `case/*.html` sinh lại) | H1 nhỏ lại, "Bài toán" kèm nhãn bằng chứng dưới H1, tấm màu thành dải thấp |
| `assets/css/{atelier,atelier-shell,studio,lab,case,main}.css` | Token mực phụ lên .64; chip vàng đậm; `.at-pass__who .at-kick`; `.kpi` của Lab; danh sách case ≤560px; nút `lvmap__go` viền |
| `hoc.html` | "Xem bản đồ hành trình" thành link chữ |
| `assets/js/yy.js` | Tối đa 2 lời nhắc chatbot mỗi phiên |
| `assets/js/lab/home.js` | Bước alloc/summary → "Luyện ở Xưởng chiến lược" |
| `assets/js/social-ui.js` | "ngày <br>liên tiếp" |
| `assets/js/data/campaigns-deep.js` | Xoá ghi chú biên tập "hattrick" |
| `api/src/auth.js`, `dang-nhap.html` | Đăng nhập email giữ `next` (cùng quy tắc `safeNext` với Google; link cũ vẫn hợp lệ) |

Không xoá tính năng nào. Không đổi cấu trúc trang. Không đổi màu thương hiệu hay font.

---

## 9. Kết quả test

| Hạng mục | Kết quả |
|---|---|
| `node --test tests/*.test.mjs` | **168/168 PASS** |
| `cd api && npm test` | **43/43 PASS** |
| `node tools_validate_bai.mjs` | 712 bài · 4.984 câu · 0 lỗi · 0 cảnh báo |
| `node --check` các file JS đã sửa | PASS |
| Build `tools_build.mjs` | PASS: bỏ đáp án 5.182 câu; 0 `answer:` trong `dist/…/exam-items.js` |
| Lộ trình sau sửa | 9 lộ trình giữ nguyên số bài, không trùng (full 760/760) |
| E2E: 5 journeys (Playwright) | **5/5 PASS** before và after (§3) |
| Responsive 1440 / 390: 23 trang | 0 tràn ngang, 0 lỗi JS (`pageerror`), before và after |
| Reduced motion (emulation thật) | **PASS**. Không bật: landing 10, Kingdom 30, shell 1 animation lặp. `reduce`: **0** ở cả 5 trang |
| Tương phản (WCAG AA, tính máy) | 20,4% → **4,2%** chữ dưới chuẩn (trang sau đăng nhập) |
| Ảnh thiếu `alt` | 0 |
| Nút không có tên | 1–2 (bài học, bắt đầu) — P2 |
| Vùng chạm < 32px (390) | Bài học 19, MarSocial 13 — P2 (R11) |

### Screenshots trước/sau

Thư mục `qa/ux-audit/before/` và `qa/ux-audit/after/`, tên file theo `<rộng>-<trang>.jpg` và `journey-<id>-<bước>.jpg`. Các cặp nên xem:

- `390-case_thu_vien_html.jpg`: tiêu đề vỡ chữ → đọc được.
- `1440-campaign_html_id_highlands_third_place.jpg` và `390-…`: màn đầu trống → có "Bài toán".
- `journey-j5-strategist-2.jpg`: KPI vỡ dòng → đúng.
- `journey-j1-nguoi-moi-3.jpg`: đầu bài học.
- `1440-hoc_html.jpg`: 3 CTA đặc và chatbot đè → 1 CTA.
- `1440-bat_dau_html.jpg`: bản đồ trước → chọn hướng trước.

---

## 10. PASS / FAIL / BLOCKED

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Sửa P1 đã xác minh (13 mục) | **PASS** | Đo lại cùng kịch bản |
| E2E 5 journeys | **PASS** | Expert simulation |
| Responsive 1440/390 (+ 768/1024 cho landing ở vòng audit trước) | **PASS** | |
| Reduced motion | **PASS** | |
| Accessibility tương phản | **PASS (cơ bản)** | Còn 4,2%: chữ trên ảnh, nền gradient, nhãn trang trí |
| Vùng chạm mobile | **FAIL (P2)** | Bài học và MarSocial |
| Usability test có người thật | **BLOCKED** | Cần tuyển 5–8 người theo 5 persona |
| Xưởng chiến lược: phương pháp chấm | **FAIL (P1, chưa sửa)** | Cần thiết kế lại (R8) |
| Production | **Chưa deploy** | Chưa merge, theo yêu cầu |

---

## 11. Roadmap tiếp theo (theo đòn bẩy)

1. **R1 · Xem trước không cần đăng nhập:** mở `gioi-thieu` và 1–2 case mẫu. Đây là quyết định sản phẩm và chính sách `needsLogin`.
2. **R2 · Gom sidebar theo việc** (Học / Luyện / Case / Lab / Cộng đồng). Mục tiêu ≤ 12 mục. Test cây menu (tree test) với 5 người trước.
3. **R3 · Dashboard cho người mới** (< 3 bài): một khối "3 bài đầu tiên" thay cho bộ sưu tập 30 cấp và bảng xếp hạng rỗng. A/B bằng tỉ lệ hoàn thành bài 1 → bài 3.
4. **R4 · Thang chữ:** chữ có nghĩa tối thiểu 13px; gom 10,5/11/11,5/12/12,5 về 2 cỡ.
5. **R5 · Case:** thêm `target` và `positioning`.
6. **R6 · Biên tập lại `quote`** cho Nike, Apple, Shopee: thêm điều kiện hoặc nhãn K.
7. **R7 · Thống nhất kịch bản Nắng Mai** giữa hai Lab (ngân sách, tệp khách).
8. **R8 · Xưởng chiến lược:** thêm ô insight trích nguồn r#, nhận xét theo bước, bài mẫu sau khi nộp, đặt sẵn MDE kèm "vì sao".
9. **R9 · Bài "bốn nghề mang tên marketing"** trong 7 bài mở đầu (có thể dùng tp05-02).
10. **R10 · Quiz:** cảnh báo trong validator khi đáp án đúng dài hơn phương án dài thứ hai quá 20%; viết lại các phương án lố.
11. **R11 · Vùng chạm ≥ 44px** cho link thuật ngữ và nút công cụ bài học trên mobile.
12. **R12 · Usability test thật:** 5 persona × 1–2 người. Đo time-to-first-lesson, tỉ lệ hoàn thành bài 1, SUS, và đối chiếu với các giả thuyết ở §3.
