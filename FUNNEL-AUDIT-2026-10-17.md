# Audit funnel: đăng ký → hoàn thành bài đầu tiên (2026-10-17)

Chỉ đọc. Số liệu lấy từ D1 production bằng truy vấn tổng hợp `SELECT` (không lấy email, tên hay id), cộng đọc code `bai.html`, `assets/js/app.js`, `api/src/learn.js`. Không sửa code, dữ liệu hay deploy.

## 1. Kết luận
**Đây là vấn đề trải nghiệm/engagement, không phải lỗi ghi nhận tiến độ.** Các bảng khớp nhau từng bước (mục 3). Rớt mạnh nhất nằm ở **cuối bài**: bước Đổ não 60 giây → làm quiz, và quiz bị đặt rất xa trên mobile.

Giới hạn dữ liệu: mới 30 tài khoản, 27 đăng ký cách đây 3–7 ngày (người đầu tiên 2026-10-11), nên chưa kết luận thống kê được. Đã có đo lượt xem trang (`app_events`, loại `page`/`nav`), nhưng chưa có sự kiện theo từng bước trong bài và lượt xem bài chỉ ghi `bai.html`, không kèm mã bài (xem mục 3 và bản hiệu chỉnh cuối file).

## 2. Funnel thực tế (30 tài khoản)
| Bước | Người | % tổng | Nguồn |
|---|---|---|---|
| Đăng ký (đăng nhập lần đầu) | 30 | 100% | `users` |
| Có đồng bộ trạng thái sau khi vào | 25 | 83% | `state.syncedAt` |
| Vào trang Học (`hoc.html`) | 28 | 93% | `app_events` loại `page` |
| Mở ít nhất 1 bài | 17 | 57% | `app_events` (45 lượt xem `bai.html`); trong đó 12 người có tiến độ đọc trong `state.prog` (19 lượt, 18 lượt đọc ≥98%, 1 lượt <25%) |
| Trả lời câu Dừng & Kiểm tra giữa bài | 8 | 27% | `answer_events` context `checkpoint` = `state.cp` |
| Qua bước Đổ não 60 giây (viết hoặc bỏ qua) | 4 | 13% | `state.recall` |
| Nộp quiz cuối bài → hoàn thành | **1** | **3%** | `lesson_progress` (passed/lesson), 5 câu `lesson` |
Cạnh đó: 9 người trả lời câu ở trang luyện (`practice`, 35 câu tổng), 3 người có XP, 1 người thi vượt chặng, 6 người đặt mục tiêu (`goal`), 0 người có `persona`.

## 3. Logic ghi nhận có đúng không
Khớp chéo, không thấy chênh lệch:
- `state.lessons` (client) = 1 người = `lesson_progress` (server) = 1 người = người duy nhất có câu trả lời context `lesson`.
- `state.cp` = 8 người = số người có câu `checkpoint` trên server.
- Không ai có đủ 5 câu `lesson` mà thiếu dòng `lesson_progress`.
- `lessons_done = 1` = đếm D1 trực tiếp.

Rủi ro tiềm ẩn (chưa gây lỗi trong dữ liệu hiện tại):
- `bai.html` gọi `/api/lessons/:key/complete` rồi nuốt lỗi bằng `.catch(()=>{})`, còn client vẫn ghi hoàn thành cục bộ. Nếu server từ chối (409 `quiz_incomplete`, mạng lỗi), người học thấy "xong" nhưng server không ghi, và sẽ chỉ vào số liệu dưới dạng `legacy` (không tính vào `lessons_done`).
- Tiến độ đọc chỉ lưu khi tăng ≥4%, nên người mở bài rồi thoát ngay không để lại dấu vết trong `state.prog`; dùng `app_events` (17 người mở bài) thì chính xác hơn.
- Đo lường đã có `app_events` (`/api/track`): loại `page` (519 lượt, 30 người) và `nav` (315 lượt, 17 người) từ 2026-10-12. Nhưng lượt xem bài chỉ ghi `bai.html`, không kèm mã bài; và chưa có sự kiện cho: thấy quiz, nộp quiz, hoàn thành, lỗi lưu. Không phân biệt được "không thấy" với "thấy mà bỏ" theo từng bài.

## 4. Điểm ma sát (đo trên bài đầu tiên `B:ob01-01`, mobile 375×744)
- Trang dài **13,1 màn hình** (9.726px), 1.271 chữ, 12 khối.
- Thứ tự dọc: Dừng & Kiểm tra ở màn 4,0 → Luyện tập 7,2 → Thực hành 7,8 → Đổ não 60 giây 9,7 → Góp ý 10,5 → Case study 10,9 → Sổ tay ôn lỗi 11,3 → **Quiz ở màn 12,1**.
- Nội dung sau điểm giữa bài bị khoá (`#read2 locked`) cho tới khi trả lời câu giữa bài; quiz bị khoá (`#quizBox locked`) cho tới khi hoàn tất hoặc bỏ qua Đổ não 60 giây.
- Danh sách "Điều kiện hoàn thành" (đọc hết, câu giữa bài, quiz) **không nhắc bước Đổ não** dù nó chặn quiz.
- Trên mobile chỉ có thanh đầu trang cố định (`lp-head`, 109px); không có nút "Làm quiz" cố định. Quiz nằm trong cột phụ nên bị đẩy xuống sau Góp ý, Case study, Sổ tay.
- Quiz 5 câu chấm một lần lúc nộp; đáp án chọn dở nằm trong bộ nhớ trang, rời trang là mất.
- Sau đăng nhập người dùng vào `hoc.html` với nút "Bắt đầu bài đầu tiên" — phần này ổn.

## 5. Năm cải tiến tác động lớn nhất (xếp theo ưu tiên)
1. **Đưa quiz lên ngay sau phần học và thêm nút cố định "Làm quiz" trên mobile.** Trên màn <860px, đặt khối quiz ngay sau Đổ não (trước Góp ý/Case/Sổ tay) và thêm thanh đáy cố định "Làm 5 câu để hoàn thành (+10 XP)" cuộn tới và mở quiz. Đánh vào chỗ rớt lớn nhất (4 người qua Đổ não, 1 người xong).
2. **Làm gọn lộ trình bài đầu tiên.** Với người chưa hoàn thành bài nào: bỏ gate Đổ não khỏi đường tới quiz (chuyển thành phần thưởng sau khi xong), ẩn hoặc gập Luyện tập, Thực hành, Góp ý, Case, Sổ tay đến sau khi hoàn thành. Mục tiêu bài đầu ≤ 6 màn hình trên mobile.
3. **Onboarding và CTA đưa thẳng tới bài 1.** Sau đăng nhập, mở thẳng `B:ob01-01` kèm dải 3 bước ("Đọc ~3 phút → 1 câu giữa bài → 5 câu quiz"), thanh CTA cố định "Tiếp tục bài 1 — còn X phút". Dời việc chọn mục tiêu/persona (chỉ 6/30 đặt mục tiêu) sang sau bài đầu.
4. **Giữ tiến độ và cho thấy "còn mấy bước".** Lưu đáp án quiz dở và hiện biểu ngữ "Bạn đang làm dở bài X, còn 2 bước" ở dashboard và `hoc.html`; checklist điều kiện hoàn thành bấm được (nhảy tới bước), có đủ bước Đổ não; khi hoàn thành hiện ngay khoảnh khắc thắng (XP/con dấu) và nút "Bài tiếp theo".
5. **Đo và sửa phần ghi nhận trước khi tối ưu tiếp.** Dùng `/api/track` có sẵn, thêm sự kiện theo bước: `lesson_open`, `gate_answered`, `recall_done|skip`, `quiz_view`, `quiz_submit`, `lesson_complete`, `complete_error`; bỏ `.catch(()=>{})` ở `/complete` (thử lại và báo lỗi cho người học). Kèm kênh nhắc quay lại cho 21 người chưa làm gì (hiện đăng nhập email đang tắt vì `MAIL_FROM` trống; có thể xin đồng ý nhận nhắc qua email Google).

## 6. Cách kiểm chứng sau khi làm
Chạy lại cùng bộ truy vấn tổng hợp sau 7 ngày với nhóm đăng ký mới; mục tiêu đầu tiên: tỷ lệ "qua Đổ não → nộp quiz" từ 1/4 lên ≥50%, và số người hoàn thành bài 1 từ 1/30 lên ≥6/30.

## Hiệu chỉnh (cùng ngày)
Bản đầu của audit này ghi "chưa có telemetry xem trang" và đếm "mở bài" chỉ từ `state.prog` (12 người). Đó là sai sót: hệ thống đã có `app_events`. Số đúng cho bước mở bài là **17/30 (57%)**, và 28/30 đã vào trang Học. Kết luận không đổi: không có lỗi ghi nhận; điểm rớt lớn nhất vẫn nằm ở nửa sau bài (mở bài 17 → câu giữa bài 8 → Đổ não 4 → hoàn thành 1). Lượt xem bài hiện không kèm mã bài, nên chưa lập được phễu theo từng bài.
