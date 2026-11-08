# Đợt sửa sau chấm mù (reaudit fix) — bổ sung cho P1-SWEEP-BRIEF.md

Worklist: `qa/curriculum/reaudit-worklist/<mod>.json` — các lỗi P0/P1 do người chấm mù tìm thấy SAU đợt sửa P1. Áp dụng mọi quy tắc của `P1-SWEEP-BRIEF.md`, cộng thêm các quy tắc rút ra từ lần chấm mù:

1. **Không chèn ghi chú kiểu biên tập viên vào chữ người học đọc.** Không viết "theo tóm tắt thứ cấp", "chưa đối chiếu toàn văn", "đã sửa ở lượt trước", "cần đối chiếu nguyên văn". Viết lời dặn cho người học: "chưa phải văn bản gốc — hỏi pháp chế", "kiểm trang chính thức của nền tảng".
2. **Không đặt câu rào đón vào phương án đúng hoặc lời giải của phương án đúng** nếu làm nó dài hơn hẳn phương án khác. Đặt rào đón vào phần đọc (khái niệm/ví dụ/đào sâu).
3. **Câu thêm vào phải khớp với câu đứng cạnh.** Đọc lại cả đoạn sau khi sửa; nếu câu mới mâu thuẫn ý cũ, sửa ý cũ hoặc bỏ câu mới. Đáp án và lời giải của cùng một câu không được nói ngược nhau.
4. **Tính lại mọi kết luận có số sau khi sửa**, kể cả kết luận ở câu khác trong cùng bài (ví dụ: đổi cách tính lỗ ở Q5 thì kiểm lại Q6). Dùng đúng mẫu số (biên đóng góp hay biên gộp — nói rõ dùng cái nào và vì sao).
5. Mẫu nhỏ: khi kết luận dựa vào chênh lệch giữa hai nhóm, nói một câu về nhiễu; không khẳng định thắng/thua khi chênh lệch nằm trong ±2√k.
6. Ghi `qa/curriculum/reaudit-log/<mod>.json` theo cùng lược đồ nhật ký của đợt P1 (một dòng mỗi lỗi: fixed / rejected / needs-human).
