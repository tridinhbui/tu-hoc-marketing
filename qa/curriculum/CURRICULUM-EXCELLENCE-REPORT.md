# Báo cáo cuối — Nâng cấp chất lượng chương trình tuhocmarketing.org (11/2026)

*Phạm vi: toàn bộ 837 bài (789 bài B: · 26 bài L: · 22 nguyên lý P:), 5.721 câu hỏi, 18 case bấm giờ, 3 ads case, 37 bài thực hành, capstone. Mọi điểm số do người chấm độc lập đưa ra theo `RUBRIC-100.md`; chấm "sau" là chấm mù. Chưa commit, chưa deploy.*

## 1. Kết luận

- **Chương trình đúng về số học và khá vững về khái niệm, nhưng chưa đạt chuẩn đào tạo thực chiến (85/100).** Baseline TB **72,9**; chỉ 6/837 bài ≥ 85; 1.018/1.018 câu tính đúng; 2 bài có lỗi P0.
- **Cách nâng cấp đã được chứng minh trên thí điểm:** 12 bài chuẩn v2, chấm mù độc lập: TB **69 → 86,6**, 8/12 ≥ 85, P0 = 0.
- **Đợt sửa lỗi đã được xác nhận cho toàn chương trình:** 431 lỗi P0/P1 → 397 sửa, 34 chờ người; mẫu chấm mù 102 bài: TB **70,7 → 78,2**, P1 **130 → 47**, P0 **1 → 0**, bài ≥ 85 **0 → 17**. 47 P1 còn lại trong mẫu đã chuyển sang đợt sửa tiếp (mục 4).
- **Chưa đạt cổng 85 cho toàn bộ chương trình.** Sửa lỗi nâng sàn; muốn lên 85 phải nâng chuẩn v2 từng bài (goals, phản ví dụ, đào sâu, câu L4/L5) — đây là việc của các đợt sau, có kế hoạch và định mức trong `TRANSFORMATION-PLAN.md`.

## 2. Bộ sản phẩm bàn giao (tất cả trong `qa/curriculum/`)

| # | Sản phẩm yêu cầu | File |
|---|---|---|
| 1 | Kho dữ liệu chương trình (máy đọc) | `inventory.json` (sinh bằng `build-inventory.mjs`) |
| 2 | Audit chất lượng nền | `BASELINE-AUDIT.md`, `baseline.json`, `scores/*.json` (91 file điểm) |
| 3 | Ma trận năng lực | `COMPETENCY-MATRIX.md`, `competency-map.json` |
| 4 | Phân tích khoảng trống | `COMPETENCY-MATRIX.md` (29 chủ đề missing, 51 partial) + `TRANSFORMATION-PLAN.md` đợt 3 |
| 5 | Chuẩn nội dung xuất sắc | `CONTENT-EXCELLENCE-GUIDELINES.md`, `RUBRIC-100.md`, `AUDIT-PROTOCOL.md` |
| 6 | Sổ theo dõi nâng cấp | `UPGRADE-TRACKER.md`, `p1-log/`, `reaudit-log/` |
| 7 | Báo cáo chất lượng đánh giá | `ASSESSMENT-QUALITY-REPORT.md` |
| 8 | Trước và sau | `BEFORE-AFTER.md` (thí điểm), `SWEEP-BEFORE-AFTER.md` (đợt sửa) |
| 9 | Kiểm định tự động | `VALIDATION-REPORT.md` |
| 10 | Báo cáo cuối | file này; việc cần người: `HUMAN-REVIEW-QUEUE.md`; kế hoạch: `TRANSFORMATION-PLAN.md` |

## 3. Số liệu chính

| Chỉ số | Baseline | Sau đợt này | Ghi chú |
|---|---:|---:|---|
| Bài đã chấm độc lập | 837/837 | — | 100% |
| Lỗi P0 đã biết (bài + case) | 3 | 0 | kn01-01, qc06-06, khoa-hoc-online-cac |
| Lỗi P0/P1 có nhật ký xử lý | — | 431/431 | 397 fixed, 34 needs-human, 0 rejected |
| TB 12 bài thí điểm (chấm mù) | 69,0 | 86,6 | 8/12 ≥ 85 |
| TB mẫu 102 bài sau đợt sửa (chấm mù) | 70,7 | 78,2 | P1 130 → 47 |
| Bài có nhãn số minh hoạ | 264 | 769 | 20 bài case thương hiệu thật giữ không nhãn, cần nguồn |
| Bài có `src` (nguồn) | 48 | 149 | 143 nguồn mới chưa mở trang (st:'chua') |
| Validator | 0 lỗi | 0 lỗi | thêm luật chuẩn v2 |
| Test hồi quy site / API | 192 / 49 | 192 / 49 | không hạ ngưỡng nào |
| Khoá đáp án đổi | — | 6 câu + 1 câu mới | đều có lý do ghi trong tracker |

## 4. Việc chưa xong (minh bạch)

1. **47 P1 trong mẫu chấm mù đã sửa** (mục 6) nhưng 41 bài đó **chưa được chấm mù lần ba** sau khi sửa.
2. **~215 bài đã sửa nhưng chưa chấm mù**: theo tỉ lệ mẫu, ước còn khoảng 100 P1. Cần một lượt chấm mù thứ hai.
3. **41 mục cần người** (`HUMAN-REVIEW-QUEUE.md`): 17 pháp lý, 12 nền tảng quảng cáo, 5 nghiên cứu, 5 thương hiệu thật, 2 khác. Tám câu hỏi có khoá phụ thuộc câu trả lời (qc04-01/04 Q6, qc06-03/06/07, qc05-06 Q5, qc07-02 Q6, kn12-04, tu03-06 Q2, dl03-06 Q6).
4. **143 nguồn chưa mở** (st:'chua'): domain chính thức đúng nhưng nhiều link là trang chủ/tìm kiếm.
5. **777 bài chưa theo chuẩn v2**; 29 chủ đề năng lực chưa có bài (đậm nhất: AI & martech, thống kê ứng dụng, nghiên cứu giá/WTP, B2B/SaaS, kích hoạt/growth loop).
6. **Đánh giá**: case bấm giờ không phạt việc hỏi dữ liệu nhiễu; 16/18 case cùng mẫu đáp án; pool case/judge của đề chặng đúng ngưỡng 3×, thi lại sẽ trùng đề.
7. **Chưa kiểm trên giao diện thật** ngoài 1 bài (`bai.html?id=B:ob01-02`); cần biên tập viên đọc các bài thay đổi nhiều trên mobile.

## 5. Ưu tiên kế tiếp

1. Pháp chế và người có tài khoản quảng cáo xử lý 8 mục ảnh hưởng khoá đáp án.
2. Lượt chấm mù thứ hai cho ~215 bài đã sửa chưa trong mẫu; sửa P1 tìm được theo `REAUDIT-FIX-BRIEF.md`.
3. Nâng chuẩn v2 theo `TRANSFORMATION-PLAN.md` đợt 2 (bắt đầu từ 38 bài < 60 và chuỗi performance/growth).
4. Viết 6 module lấp khoảng trống (đợt 3), ưu tiên thống kê ứng dụng và AI.
5. Quyết định commit: toàn bộ thay đổi đang ở cây làm việc; nên chia thành các commit theo nhóm (công cụ & chuẩn · thí điểm · đợt sửa P1 · gắn nhãn · báo cáo).

## 6. Đợt sửa sau chấm mù

- 47 lỗi P1 (41 bài, 37 module) tìm thấy khi chấm mù mẫu 102 bài: **47 fixed · 0 rejected · 0 needs-human** (`reaudit-log/`).
- Một khoá đáp án đổi: **B:qc11-02 Q4** 2,2 → 2,5, vì MER hoà vốn nay tính trên biên đóng góp (khớp qc02-04, giả định phí vận chuyển/thanh toán/hoàn hàng 5% doanh thu). Kết luận ví dụ đảo chiều: khách mới từ lãi 1,1 triệu thành lỗ khoảng 9 triệu, khuyến nghị đổi thành “chưa tăng chi”.
- Các lỗi do chính đợt sửa P1 gây ra đã sửa: tn02-01 (đáp án và lời giải nói ngược nhau), ob03-02 (công thức chỉ tính tiền tăng thêm), dl06-10 Q6 (đếm toàn bộ chi sai là lỗ — kết luận đảo chiều ở mức chi cũ; đề nay dùng 500 triệu/tháng), kn12-01 (ghi chú biên tập viên trong lời giải), tn01-03 (so CAC với doanh thu thay vì lãi gộp).
- Sau đợt này: validator 0 lỗi, quét câu lặp sạch, 192/192 + 49/49 test pass, `bai-index.js` sinh lại (`BAI_V` = 31), `bank.json` dựng lại.
