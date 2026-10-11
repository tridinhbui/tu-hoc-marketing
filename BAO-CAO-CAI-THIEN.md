# Báo cáo cải thiện sau audit (2026-10-11)

Nguồn: báo cáo audit `BAO-CAO-AUDIT.md`. Phạm vi: sửa lỗi độ tin cậy/độ chính xác (P0), bổ sung kiến thức nền và bài thực hành (P1), chất lượng câu hỏi (P2), kiểm thử UX (P3). Không thêm AI, không xoá tiến độ người học, không đụng dữ liệu production, không deploy.

**Trạng thái kiểm thử cuối:** `node --test tests/*.test.mjs` 49/49 · `cd api && npm test` 31/31 · `node tools_validate_bai.mjs` 690 bài, 4.830 câu, 0 lỗi, 0 cảnh báo · `node tools_lint_exam.mjs` 0 lỗi.

---

## 1. File đã sửa / tạo

### Logic & độ tin cậy (P0)
| File | Thay đổi |
|---|---|
| `giai-case.html` | Ghi khoá `pass.talk` (đã viết đủ 5 ý phần nói 60 giây); `passed` vẫn chỉ phụ thuộc ba tiêu chí tự chấm; thêm dòng kết quả "Trình bày 60 giây"; sửa chữ mô tả |
| `assets/js/exam.js` | `FULL_CASE_KEYS` + `isFullCase()` (kiểm tên khoá, không đếm số khoá); `drawExam` đánh dấu `items.source='server'` |
| `assets/js/data/exams.js` | `mix` cộng đúng bằng `size` (trước: 12 so với 15); chú thích `full` đúng thực tế |
| `thi.html` | Đề không chấm được → màn "Chưa thi được" trước khi bấm giờ; lưu bài làm dở (`thmc.examdraft`), tiếp tục sau khi mất mạng/tải lại; chỉ ghi lượt thi sau khi chấm xong; sửa chữ "Mới có đề cho chặng 01" và "sai … câu cốt lõi" |
| `bai.html` | Nộp quiz bài: chấm hết trước rồi mới ghi giao diện/hàng ôn/điểm (trước: lỗi giữa chừng để lại lời giải trùng và lỗi bị ghi hai lần); thêm phần thực hành có đầu ra (`outputPart`) |
| `api/src/difficulty.js` (mới) | Độ khó suy ra theo kỹ năng cần vận dụng |
| `api/tools/build-bank.mjs` | Gán độ khó bằng `deriveDifficulty` |
| `api/src/learn-core.js`, `api/src/learn.js` | `pickStageItems`: đề vượt chặng theo độ khó (2·9·4), trải module, ≤2 câu/bài, không liền cùng bài, không lặp |
| `api/src/generated/bank.json` | Dựng lại: 5.028 câu |
| `api/package.json` | Thêm `stage-draw.test.mjs` vào `npm test` |
| các `*.html` | Tăng `?v=` của `exam.js`, `exams.js`, `app.js`, các file dữ liệu |

### Nội dung (P0 chính xác + P1 + P2)
| Nhóm | File |
|---|---|
| Sửa lỗi số học/đáp án/nền tảng (module cũ) | `assets/js/data/bai/{ob01..ob07, kh01..kh10, gt01..gt06, tp01..tp11, kn01..kn10, tn01..tn06, dl01..dl09, tu01..tu06, in01..in05}.js` |
| Dữ liệu cũ + ngân hàng đề | `lessons.js`, `principles.js`, `drills.js` (+3 mã lỗi), `cases.js`, `campaigns.js`, `brands.js`, `exam-items.js` |
| Module mới (40 bài × 7 câu) | `bai/ob08.js` (4P/7P), `bai/kh11.js` (STP), `bai/dl10.js` (ROI/ROAS), `bai/kn11.js` (SEO), `bai/kn12.js` (quy định) |
| Đăng ký mục lục | `tools_bai_index.mjs`, `assets/js/data/bai-index.js` (module, `PATH_MODS`) |
| Bài thực hành có đầu ra | `assets/js/data/tasks.js`, `tasks-a.js`, `tasks-b.js` (30 bài) |
| Capstone | `capstone.html`, `assets/js/data/capstone.js` |
| Thuật ngữ | `thuat-ngu.html`, `assets/js/data/glossary.js` (87 mục) |
| Liên kết | `assets/js/app.js` (chân trang: Thuật ngữ, Kế hoạch chiến dịch) |

### Kiểm thử mới
`tests/` (README.md, helpers.mjs, baselines.json, stage-gate, grade-offline, content-integrity, quiz-quality, tasks, capstone, glossary) và `api/test/stage-draw.test.mjs`.

---

## 2. Phân loại lỗi đã sửa

| Loại | Ví dụ đã xác minh | Số mục (gần đúng) |
|---|---|---|
| **Lỗi tính toán / đáp án** | `kn08-04` ans 7688 → 7685 (8.000×0,99⁴=7.684,8); `dl03-01#5c` "16+6+10+8" → "24+6+10"; `tn06-05` dừng theo CPA trung bình → chi phí biên 232k; `tn02-03` ±2√k → ±2√(kA+kB); `ob07-03` kết luận ngược; `ob06-06` 150%/250%; `kh08-06` biên 23,6% | ~25 |
| **Lỗi dữ liệu** (số đề lệch lời giải/ví dụ) | `gt06-10` 105%; `tp10-10` 60/40 đảo chiều; `tp07-07` đếm chữ; `kh07-05` mẫu số; `kn03-10` hoàn vốn 19 → 60 tháng; `ob05-01` 62% vs 9% khác mẫu | ~30 |
| **Làm tròn / dung sai** | `kn08-04` tol; `kn07-02#4` 29,95→30; `tn06-06` | ~5 |
| **Mâu thuẫn nội dung** | `ob03-09` mistakes vs Q5; `in04-02`/`in01-04` (ROAS gán vs tăng thêm); `kn01-03` CPC 25–50k vs 800đ; `dl06-03` ROAS/MER | ~35 |
| **Mã lỗi gán sai** | `cases.js mo-diem-ban`, `e2.025`, `e2.030`, `ob02-09`, `ob02-03`, `gt03-05`, `gt02-07`, + 11 nhãn `teaches` sai | ~20 |
| **Nền tảng / pháp lý lỗi thời** | `dl06` mô hình attribution đã bị gỡ khỏi GA4/Google Ads; `kn06` mục tiêu Meta → ODAX + Conversions API/ATT; `dl07-04` engagement time; `ob01-06` sữa <24 tháng; thuế sàn | ~15 |
| **Kết luận nhân quả quá tay** | ~25 ví dụ trước/sau không đối chứng được thêm câu giới hạn | ~25 |
| **Case facts** | Nike (+31%, bỏ "mất doanh số"/"90%"), Patagonia, Netflix ~3s, Vinamilk, Dove, Apple 1984, IKEA | ~12 |

Mọi mục được **kiểm chứng trước khi sửa** (tự tính lại bằng script); không có mục nào bị bác là "không tái hiện".

---

## 3. Test cases và kết quả

| Bộ test | Nội dung | Kết quả |
|---|---|---|
| `stage-gate` (7) | Hợp đồng khoá `pass` giữa `giai-case.html` và `exam.js`; chặng 06 vượt được; thiếu `talk` không tính 4/4; lần nộp cũ 3 khoá không bị xoá; hết giờ không tính; thiếu case Khó; `mix`=`size`; `stageOpen` | **pass** |
| `grade-offline` (7) | Đề đã bỏ đáp án + máy chủ lỗi → ném lỗi, không "ok"; câu trống không gọi server; một câu lỗi giữa chừng → cả lượt bị từ chối; server nói sai thì đề trượt; `thi.html`/`bai.html` có tách "chấm xong rồi mới ghi" | **pass** |
| `content-integrity` (10) | id duy nhất; đáp án ∈ phương án; mọi phương án có `why`; 4 phương án/7 câu; `wrong`≠`ans`; mã lỗi tồn tại; `ans` có trong `steps`; tham chiếu bài/campaign/brand có thật; hồi quy `kn08-04`, `tn06-05`, `tn02-03`, `dl03-01` | **pass** |
| `quiz-quality` (6) | Vị trí đáp án (bài mới ≤32%/module ≤40%); đáp án đúng dài nhất ≤32%; từ tuyệt đối hai chiều; judge không dồn vị trí/không đoán bằng "có số"; vị trí ngân hàng đề; pool ≥3× & đủ câu khó | **pass** |
| `tasks` (4), `capstone` (7), `glossary` (8) | Cấu trúc bài thực hành; số liệu capstone tự khớp và bắt kế hoạch sai; thuật ngữ/công thức/liên kết | **pass** |
| `api/test` (31) | engine, vòng học, đề theo độ khó (đủ 15, không lặp, ≤2/bài, có câu khó), độ khó suy theo kỹ năng | **pass** |
| Kiểm trực tiếp trình duyệt | (a) đề bị bỏ đáp án + không máy chủ → màn "Chưa thi được", **không tính lượt thi**; (b) làm đủ 15 câu, `/answers` lỗi → giữ bài làm dở, `exams` không đổi; sửa mạng → chấm, xoá bản nháp, triện đóng; (c) bài thực hành, capstone, thuật ngữ ở 375px: không cuộn ngang | **đạt** |

Lỗi thật tìm thấy khi thử trực tiếp: bảng "dữ liệu cho sẵn" bị cắt chữ trên mobile → đã đổi sang dòng xếp chồng.

---

## 4. Số đo trước/sau

| Chỉ số | Trước | Sau |
|---|---|---|
| Chặng 06 vượt được | **không** | có |
| Phương án sai chứa từ tuyệt đối | 14,6% (6,1× so với đáp án đúng) | 0,1% |
| Câu mà chỉ phương án sai có từ tuyệt đối (lộ) | chưa đo trực tiếp (14,6% phương án sai có từ này) | 0,2% |
| Câu mà chỉ đáp án đúng có từ tuyệt đối (lộ ngược) | chưa đo | 1,4% (phần lớn là số/thuật ngữ thật) |
| Đáp án judge ở vị trí "b" | 81% | 48% |
| Đáp án mcq/case ở vị trí "b" (nguồn) | 95% | ~25% mỗi vị trí |
| Đáp án judge có nhiều chữ số hơn | — | 15% |
| Độ khó trong ngân hàng | gần như toàn mức 2 (≈99%) | mức 1/2/3 ≈ 1%/83%/16% |
| Đề vượt chặng | ngẫu nhiên theo loại, `mix` cộng 12/15 | 2·9·4 theo độ khó, trải module |
| Bài | 650 | 690 |
| Câu | 4.550 | 4.830 (bank 5.028) |
| Bài `apply` có rubric/mẫu | 28/650 | 69/690 + 30 bài thực hành riêng + capstone |

---

## 5. Khoảng trống chương trình — trước/sau

| Chủ đề | Trước | Sau |
|---|---|---|
| ROI | MISSING (0 lần xuất hiện) | **COVERED** `dl10` (8 bài) |
| STP | PARTIAL (3 mảnh rời) | **COVERED** `kh11` (chuỗi S→T→P, tiêu chí, chấm điểm) |
| 4P/7P | MISSING | **COVERED** `ob08` (4P, 7P, 4C, giới hạn) |
| SEO | MISSING | **COVERED (cơ bản)** `kn11` (nguồn Google Search Central) |
| Pháp lý/đạo đức quảng cáo | PARTIAL (rất mỏng) | **PARTIAL+** `kn12` — xem rủi ro bên dưới |
| Attribution (GA4) | OUTDATED | cập nhật theo Google Help (10/2026) |
| Meta Ads mục tiêu/đo lường | OUTDATED | cập nhật ODAX, Conversions API, ATT |
| Quan điểm tranh luận (Sharp vs định vị) | không nêu | `kh02`, `tp01`, `tp02`, `tp05`, `tp06`, `tp10` ghi nguồn + "một quan điểm" |
| Bài tập tổng hợp (lập kế hoạch) | MISSING | **`capstone.html`**: 8 phần, dữ liệu giả lập nhất quán, 34 kiểm tra tự động, rubric 10×3, bài mẫu |
| Bài tập có đầu ra | ~0 | 30 bài có dữ liệu cho sẵn + rubric + bài mẫu; mọi bài B có tiêu chí tự kiểm |
| Thuật ngữ | MISSING | `thuat-ngu.html` (87 mục) |
| Content marketing, email nâng cao, marketing automation, B2B pipeline, cohort↔LTV, MMM, power/p-value | MISSING/PARTIAL | **chưa làm** (không có bằng chứng cần gấp hơn các mục trên) |

---

## 6. Lỗi/rủi ro còn tồn tại (nói thẳng)

**Cần người thật xử lý**
1. **`kn12` (pháp lý) chưa được pháp chế duyệt.** Một số điều khoản (NĐ 342/2025, NĐ 239/2026, NĐ 356/2025, Nghị quyết 21/2026, NĐ 87/2026) lấy từ nguồn thứ cấp; module đã ghi "hỏi pháp chế" và không nêu mức phạt, nhưng **không nên công bố trước khi có người pháp lý đối chiếu văn bản gốc**. Có thể tạm bỏ `kn12` khỏi `MODULES` trong `tools_bai_index.mjs`.
2. **Zalo OA/ZNS**: hạn mức và giá (`kn08-03`, `kn08-04`) chưa kiểm được trên tài liệu chính thức; cần người có quyền vào trang quản trị OA.
3. **Nguồn kinh điển viết từ trí nhớ**: McCarthy 1960, Neil Borden (`ob08`); Binet & Field, Farris et al. (`dl10`); Smith 1956, Kotler & Keller (`kh11`). Chưa tra lại bản gốc.
4. **Case facts chưa kiểm được**: Highlands (slogan), Grab (khung giờ), nguyên nhân thu hẹp The Coffee House.
5. **Đăng nhập bắt buộc**: commit `15c23f1` (không phải của đợt này) chặn mọi trang HTML trừ landing và đăng nhập — ngược với khuyến nghị audit "không bắt đăng nhập trước khi trải nghiệm giá trị". Cần quyết định có chủ đích.

**Lỗi kỹ thuật/giới hạn**
6. **Đổi vị trí đáp án ngân hàng đề**: bản nháp bài thi (`thmc.examdraft`) làm trước khi deploy bank mới có thể chấm lệch nếu hoàn tất sau; bản nháp hết hạn sau 24 giờ. Triển khai nên đi cùng việc xoá nháp hoặc chấp nhận ảnh hưởng nhỏ.
7. **Độ khó "mức 1" chỉ ~1%**: bài mới thiên về vận dụng nên ít câu thuần nhớ; đề theo `STAGE_MIX` bù từ mức 2 khi thiếu. Chưa có thước đo độ khó từ dữ liệu người học thật.
8. **Từ tuyệt đối còn trong ~1,4% đáp án đúng** (số "100%", "tuyệt đối" là thuật ngữ thật): manh mối ngược yếu, test canh ≤3%.
9. **Mật độ calc "một phép chia"** (~75% calc) và độ trùng khuôn khái niệm giữa các bài chưa giải quyết.
10. **`--paper` sáng + chữ sáng** trong theme "studio": `.exhibit`, `.field` và nút "Sáng" của bộ chọn giao diện khó đọc ở trang bài (thấy khi thử mobile). `case.css` đang được chỉnh ở nơi khác nên **không sửa trong đợt này**.
11. **P3 (đơn giản hoá UX) chỉ kiểm chứng, không thay đổi nhiều**: giao diện đang được thiết kế lại song song (nav 5 mục, dashboard một nút "Tiếp tục học"); nav mới **không còn lối vào `on-loi.html` và `nang-luc.html`** ("Ôn lỗi" là cốt lõi giữ chân) — cần xác nhận cố ý hay thiếu sót. Các tính năng game phụ (Vương quốc, PvP, World Boss, chợ) đã không còn trong nav; trang vẫn tồn tại để không mất tiến độ.
12. **Chưa kiểm thử với người học thật**; capstone và bài thực hành là tự chấm.
13. **Máy chủ chưa deploy**: `api/` đã đổi (chọn đề theo độ khó, `bank.json`), cần `wrangler deploy` có kiểm soát.

---

## 7. Đánh giá lại: người mới có tự hoàn thành một chiến dịch Marketing thực tế không?

*(Suy luận từ nội dung và code — chưa có người học thật.)*

| Kỹ năng | Trước | Sau | Ghi chú |
|---|---|---|---|
| Xác định khách mục tiêu | Một phần | **Có** | `kh01–kh03` + `kh11` (tiêu chí, chấm điểm) |
| Nghiên cứu thị trường & đối thủ | Một phần | Một phần | có bài thực hành bảng đối thủ; chưa có dữ liệu thật để người học tự thu |
| Value proposition / định vị | Một phần | **Có** | `kh11-06`, `tp01`, câu định vị 4 vế trong capstone |
| Chọn kênh | Một phần | **Có** | + SEO, pháp lý; capstone bắt phân bổ bằng benchmark |
| Thiết kế chiến dịch | **Không** | **Có (có hướng dẫn)** | capstone 8 phần |
| Lập ngân sách | Một phần | **Có** | bảng phân bổ tự tính CAC/đơn theo kênh |
| KPI | Một phần | **Có** | kiểm tra chỉ báo sớm/muộn, ngưỡng hành động |
| Đo lường | Có | Có | + ROI, GA4 hiện hành |
| Phân tích dữ liệu | Một phần | Một phần | thiếu thống kê (power, CI) |
| Đề xuất tối ưu | Một phần | Một phần → Có | `in04` + tiêu chí dừng bằng số trong capstone |

**Kết luận:** người mới giờ **có thể** đi từ bài đầu đến một "Kế hoạch chiến dịch một trang" **trong môi trường có dữ liệu giả lập**, với công cụ kiểm tra số học và rubric tự chấm. **Chưa chứng minh** rằng họ làm được trên dữ liệu thật của doanh nghiệp thật hoặc rằng phần tự chấm đủ phản hồi để cải thiện; điều đó cần thử với 5–8 người học thật. Mức sẵn sàng cho thực tập: tốt hơn rõ rệt về "làm ra sản phẩm", vẫn thiếu kỹ năng công cụ cụ thể (thiết lập UTM/GA4 thật, viết email, lịch nội dung).
