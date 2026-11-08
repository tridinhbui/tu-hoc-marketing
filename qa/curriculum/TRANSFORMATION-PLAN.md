# Kế hoạch chuyển đổi chương trình — các đợt kế tiếp (sau baseline và thí điểm 11/2026)

Nguyên tắc: làm theo đợt nhỏ, mỗi đợt có validator 0 lỗi + test pass + chấm mù ≥ 25% bài trước khi sang đợt sau; giữ id và tiến độ người học; không bịa nguồn; không commit/deploy khi chưa được duyệt.

## Đợt 0 (đã làm trong phiên này)
Baseline 837 bài · chuẩn v2 + validator + giao diện · 12 bài thí điểm (TB 69 → 86,6) · sửa 2 P0 bài học + 1 P0 case · gắn nhãn minh hoạ 769 bài · đợt sửa P1 (431 lỗi, xem p1-summary.json) · dựng lại bank.json.

## Đợt 1 — Hoàn tất lỗi đã biết (1–2 tuần)
1. Rà `needs-human` trong `p1-summary.json`: pháp chế đọc kn12, kn08-09, kh08-08, qc03-05, tu01-09, tu03-04/06/07; người có tài khoản thật kiểm các khẳng định nền tảng còn `st:'chua'` (Meta/Google/TikTok/Shopee/Zalo) và đổi thành `doc`.
2. 13 P1 đề chặng độc lập (e3.013, e5.009, 56 câu có dấu gạch dài lộ đáp án…) và 5 P1 case/task (ngan-sach-share-of-voice, mo-diem-ban, capstone kênh tuyến tính).
3. Sửa hệ thống `giai-case.html`: hỏi exhibit nhiễu phải tốn giờ hoặc điểm, nếu không “chọn hỏi gì” không được đánh giá.
4. Nhãn mã lỗi lệch ở câu calc (P2, danh sách trong từng file điểm) — một đợt 2 giờ, kiểm bằng test hồi quy.

## Đợt 2 — Nâng chuẩn v2 theo module, ưu tiên theo điểm và theo lộ trình (6–8 tuần, 3 nhóm song song)
Thứ tự: (a) 38 bài < 60; (b) các module TB < 70: kn16, kn04, in03, kh08, tu03, kn06, dl07, kn09; (c) module lõi của lộ trình perf/growth (dl01–dl04, dl06, tn02, tn06, tu02) để người học performance có trọn chuỗi ≥ 85; (d) phần còn lại theo bước hành trình.
Mỗi bài theo đúng khuôn 12 bài thí điểm (`qa/curriculum/pilot/*.js`): goals · counter · deeper · ≥1 câu L4 từ dữ liệu · ≥1 câu L5 đánh đổi · nhãn/nguồn · áp dụng có tiêu chí đạt. Định mức thực tế từ thí điểm: 35–50 phút/bài cho người viết có kinh nghiệm + 15 phút chấm mù.
Cổng mỗi đợt: TB ≥ 85 trên bài đã nâng (chấm mù), P0 = 0, P1 ≤ 1/10 bài.

## Đợt 3 — Lấp khoảng trống năng lực (viết mới, không trùng; ~45 bài)
| Module mới (đề xuất mã) | Bước | Lấp lĩnh vực | Bài |
|---|---|---|---|
| `tk01` Thống kê ứng dụng cho marketer: khoảng tin cậy, cỡ mẫu/MDE, SRM, Simpson, peeking, nhiều phép so | Giả thuyết (trước gt03) | D7, D8, D3 | 8 |
| `ng01` Nghiên cứu giá & WTP: Van Westendorp, Gabor-Granger, co giãn, mô hình tăng giá 15% (case của master brief) | Thử nghiệm | D10, D3 | 6 |
| `gr01` Growth loop & kích hoạt: AARRR như hệ thống, chỉ số kích hoạt, North Star, PMF theo cohort | Đo lường | D7, D1 | 6 |
| `b2b01` B2B/SaaS: ICP, ABM, pipeline, MRR/NRR/churn B2B, win-loss | Hiểu khách / Kênh | D9 | 7 |
| `ai01` AI trong marketing: luồng nghiên cứu/nội dung có AI, prompt, đánh giá đầu ra, human-in-the-loop, bịa và thiên lệch, ROI luồng | Chuyên đề (luôn mở) | D12 | 8 |
| `th01` Trường phái thương hiệu và bằng chứng: Ehrenberg-Bass vs định vị/khác biệt, Binet–Field, kiến trúc thương hiệu, tái định vị có số | Thông điệp | D4 | 6 |
| Bài cầu nối kinh tế đơn vị sớm (1 bài trong ob08 hoặc kh02): biên, CAC trần, trước khi học kênh | Quan sát | D1 | 1 |
Mỗi module có ≥1 bài thực hành có đầu ra (`BAI_TASKS`) và một case bấm giờ; D12 hiện không có đánh giá ứng dụng nào.

## Đợt 4 — Đánh giá bằng sản phẩm (song song đợt 2–3)
- Năm case của master brief (performance $50k, thương hiệu mất thị phần, SaaS giữ chân, tăng giá 15%, hai kênh ROAS cao mà doanh thu đứng yên) viết theo khuôn 10 phần; hai case đã có gần (cocomi, dl06-03) nâng lên.
- Thêm `judge`/`case` vào pool đề chặng (đang đúng ngưỡng 3×, thi lại trùng đề).
- Mã hoá hiểu lầm của câu trắc nghiệm (không chỉ calc) để ôn lỗi 1·3·7 ngày nhắc được cả khái niệm.
- Cổng chặng theo bằng chứng năng lực (bài tính + case + task) thay cho % bài đã đọc.

## Đợt 5 — Bài cũ L:/P: (48 bài, TB 61)
42 bài trùng module B: → chuyển thành “bài đọc thêm” (giữ URL, bỏ khỏi đếm năng lực và pool đề, đổi `teaches` của 20 câu e*.* đang trỏ sai); 6 bài còn giá trị riêng (L:53, L:55, L:65, L:68, L:73, L:78) nâng chuẩn v2 hoặc gộp ý vào module B: tương ứng. Không xoá id.

## Quản trị độ tươi (thường xuyên)
- `fast` (kn06, kn11, kn13–16, dl07, qc01–11, tn06, dl03-06): rà mỗi quý; mỗi bài có `checked`; script liệt kê bài quá 90 ngày.
- `periodic` (luật, benchmark, nghiên cứu): rà 6–12 tháng; mọi số hiệu văn bản có pháp chế ký.
- Mọi `src` `st:'chua'` phải thành `doc` trước phát hành; test chặn `st:'chua'` ở bài `std:2` khi bật cờ phát hành.

## Ước lượng
Đợt 1: 1 người × 2 tuần. Đợt 2: 3 người viết + 1 người chấm × 8 tuần cho ~400 bài ưu tiên; phần còn lại thêm 8 tuần. Đợt 3: 2 người × 6 tuần. Đợt 4–5: 1 người × 4 tuần. Có thể dùng agent cho bản nháp và chấm mù, nhưng cổng cuối phải là người biên tập đọc trên giao diện và pháp chế ký các bài luật.
