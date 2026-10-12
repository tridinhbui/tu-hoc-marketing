# MARKETING-CURRICULUM-AUDIT — tuhocmarketing.org

*Audit độc lập, chưa sửa nội dung. Ngày audit: 11/10/2026. Phạm vi: 760 bài (712 bài mã `B:` trong 79 module + 26 bài daily `L:` + 22 nguyên lý `P:`), đọc trực tiếp từ `assets/js/data/bai/*.js`, `lessons.js`, `principles.js`. Dữ liệu chi tiết từng bài (trích dẫn, đề xuất viết lại): `MARKETING-CURRICULUM-AUDIT-DATA.json`.*

---

## 0. Cách audit và giới hạn (đọc trước)

- **Đã đọc đủ 760/760 bài**, chia 41 batch (1–2 module mỗi batch), mỗi batch do một người chấm đọc trọn situation, concept, example, takeaway, apply, mistakes và cả 7 câu quiz kèm lời giải; tự giải lại từng câu calc/mcq. Mỗi bài có đủ 8 điểm, Bloom hiện tại/mục tiêu, lỗi kèm trích dẫn, nhãn xác minh, quyết định và ưu tiên.
- **Người chấm là các agent AI (không phải giảng viên con người)**, chạy cùng một rubric. Tôi (người điều phối) đã tự kiểm lại bằng máy 3 việc: (1) thống kê vị trí đáp án và độ dài đáp án trên 4.176 câu MCQ; (2) lint "dấu hiệu hình thức" (mục 4.1); (3) kiểm tay tận nguồn 3 lỗi P0 — `B:tp04-02` Q7, `B:kn14-01` Q2, hiện tượng "Vì…" ở `B:ob03` — cả ba **đúng**. Các P0 còn lại là kết luận của người chấm đã trích dẫn nguồn, **cần người có chuyên môn xác nhận trước khi sửa**.
- **Thang điểm bị nén**: không bài nào ≥ 8; 514 bài nằm trong 6,0–6,9. Điểm tổng chỉ để xếp hạng tương đối; dùng **ưu tiên P0–P3 và danh sách lỗi** để ra quyết định.
- **Xác minh sự kiện không dùng web**: nhãn VERIFIED = kiến thức nền của người chấm, không phải tra nguồn. 185 khẳng định ở trạng thái **UNVERIFIED** — đặc biệt các văn bản pháp luật 2025–2026 ở `kn12` (cần luật sư/pháp chế).
- **Ngoài phạm vi**: game, lab, capstone, phỏng vấn, thư viện case (`case/*.html`) và đề thi `exam-items.js` — không nằm trong 760 bài.

---

## 1. Executive summary

**Điểm tổng thể: 6.2/10 — "dùng được, chưa đáng launch như một chương trình đào tạo thực chiến".** Không có bài nào xuống mức hỏng nặng; cũng không bài nào xuất sắc. Chương trình rất *đều* và *sạch* (số học tự khớp, văn phong rõ, hầu hết bài có phép tính), nhưng *nông ở tầng phân tích–đánh giá* và *chưa bắt người học làm ra sản phẩm*.

| Tiêu chí | Điểm TB |
|---|---|
| Accuracy | 6.7 |
| Depth | 5.8 |
| Clarity | 7.0 |
| Practicality | 6.7 |
| Critical Thinking | 5.8 |
| Case Quality | 5.6 |
| Learning Effectiveness | 5.9 |
| Engagement | 6.0 |
| **Tổng** | **6.2** |

**Bốn phát hiện chính**

1. **Mạnh ở Clarity/Accuracy, yếu ở Depth, Critical Thinking, Case, Learning (5,6–5,9).** Bài giải thích tốt "cái gì" nhưng ít khi đào "vì sao cơ chế đó chạy, khi nào nó gãy, đánh đổi là gì".
2. **Bloom bị kẹt ở L3.** Hiện tại: L2 80 · L3 458 · L4 214 · L5 8 · L6 0. Mục tiêu hợp lý theo vị trí bài: L3 68 · L4 555 · L5 134 · L6 3. Có 470 bài đáng ra phải ở L4 trở lên nhưng hiện dừng ở L3 hoặc thấp hơn; chỉ 8 bài chạm L5 (đánh giá chiến lược/trade-off) trong khi 137 bài có mục tiêu L5–L6.
3. **Quiz chưa hỏng nhưng có lỗi hệ thống**: 21 bài P0 (đáp án sai/hai đáp án cùng đúng/số bất khả thi/phương án đúng bị cụt) và **104 câu MCQ (2,5%) lộ đáp án bằng hình thức** — phương án đúng là cái *duy nhất không mở đầu bằng "Vì…/Do…/Để…"* (tập trung ở ob03 (10), kh02 (9), kn02 (8), tu04 (7), dl05 (5), tu03 (5)).
4. **Không phát hiện case bịa số liệu**; 596 khẳng định là minh hoạ tự đặt (được nêu rõ), 578 đúng theo kiến thức nền, **185 chưa xác minh được**, 1 sai (`B:tp03-01`: Vinamilk bị xếp vào loại "tên tự đặt ghép chữ" — thực chất là tên ghép mô tả Vina + milk). Điểm yếu thật là **thiếu case thật có nguồn**: 596/1.360 khẳng định là số minh hoạ, người học khó phân biệt "ví dụ" với "bằng chứng".

**Phân bố quyết định / ưu tiên**

| Quyết định | Số bài | | Ưu tiên | Số bài |
|---|---|---|---|---|
| KEEP | 191 | | P0 | 21 |
| IMPROVE | 544 | | P1 | 100 |
| MERGE | 21 | | P2 | 403 |
| REWRITE | 4 | | P3 | 217 |
| REMOVE | 0 | | Không | 19 |

> REMOVE = 0 vì người chấm đánh giá bài từng bài: không bài nào "vô giá trị". Vấn đề của chương trình là **thừa chồng chéo + nông**, giải quyết bằng gộp/đào sâu chứ không phải xoá (xem mục 4.3).

**Theo từng bước lộ trình**

| Bước | Số bài | Điểm TB | Depth | Case | Learning | P0+P1 | Manager: LOW_VALUE | Manager: TOO_EASY |
|---|---|---|---|---|---|---|---|---|
| 1·Quan sát | 71 | 6.2 | 5.8 | 5.7 | 5.9 | 19 | 44 | 7 |
| 2·Hiểu khách | 97 | 6.2 | 6.0 | 5.6 | 5.9 | 15 | 51 | 24 |
| 3·Giả thuyết | 59 | 6.2 | 5.7 | 5.8 | 5.8 | 7 | 24 | 15 |
| 4·Thông điệp | 95 | 6.2 | 5.6 | 5.6 | 6.0 | 10 | 52 | 19 |
| 5·Kênh | 130 | 6.1 | 5.8 | 5.6 | 5.8 | 26 | 64 | 26 |
| 6·Thử nghiệm | 59 | 6.3 | 6.2 | 5.6 | 5.9 | 11 | 16 | 20 |
| 7·Đo lường | 92 | 6.5 | 6.0 | 5.9 | 6.3 | 15 | 26 | 22 |
| 8·Tối ưu | 59 | 6.3 | 5.9 | 5.8 | 6.0 | 7 | 23 | 20 |
| 9·Insight | 50 | 6.0 | 5.4 | 5.5 | 5.9 | 6 | 26 | 13 |
| Bài daily cũ (L:) | 26 | 5.6 | 5.1 | 4.6 | 5.0 | 4 | 7 | 3 |
| Nguyên lý cũ (P:) | 22 | 5.2 | 4.5 | 4.3 | 4.5 | 1 | 8 | 2 |

**Ba nhóm người học** (nhãn của từng bài, tổng 760):

| Nhóm | Phù hợp (RIGHT) | Vấn đề chính |
|---|---|---|
| Người chưa biết gì | 714 (94%) | 29 bài quá khó (thuật ngữ nén, nhảy bước), 17 bài thiếu nền. **Đây là nhóm được phục vụ tốt nhất.** |
| Sinh viên marketing | 550 (72%) | 207 bài (27%) quá dễ: nhắc lại khung kinh điển không thêm nguồn/biến thể/phản biện. |
| Marketing Manager 5 năm | 239 (31%) | **341 bài (45%) giá trị thấp**, 171 quá dễ: đa số bài giải quyết bài toán họ đã gặp, không đưa kỹ thuật mới (incrementality, MMM, cohort thật). |

Chương trình hiện là **khoá nhập môn → trung cấp thấp**. Nếu định vị là "đi từ chưa biết đến làm được thực chiến" thì nửa sau (cấp quản lý) chưa có.

---

## 2. Đánh giá chi tiết từng bài (760 bài)

Cột điểm: **A**ccuracy · **D**epth · **C**larity · **P**racticality · **K**ritical thinking · **Cs** case · **L**earning · **E**ngagement. Bloom: hiện tại→mục tiêu. QĐ: K=KEEP, I=IMPROVE, M=MERGE, W=REWRITE. Cột cuối là vấn đề đáng kể nhất; trích dẫn và đề xuất viết lại đầy đủ nằm trong file DATA.

### 2.1 Tổng hợp theo module (cột "Tiêu chí thấp nhất" = tiêu chí có điểm TB thấp nhất trong module; K/I/M+W = số bài KEEP/IMPROVE/MERGE+REWRITE)

| Module | Bài | Điểm TB | Tiêu chí thấp nhất | P0/P1 | K/I/M+W |
|---|---|---|---|---|---|
| ob01 | 7 | 6.2 | dep 5.6 | 0/1 | 2/5/0 |
| ob02 | 10 | 6.1 | dep 5.4 | 0/1 | 2/7/1 |
| ob03 | 10 | 5.8 | eng 5.2 | 10/0 | 2/8/0 |
| ob04 | 9 | 6.0 | case 5.3 | 1/2 | 4/4/1 |
| ob05 | 10 | 6.2 | crit 5.7 | 0/2 | 3/7/0 |
| ob06 | 10 | 6.0 | crit 5.4 | 0/1 | 2/7/1 |
| ob07 | 7 | 6.7 | case 6.0 | 0/1 | 2/5/0 |
| ob08 | 8 | 6.6 | case 6.0 | 0/0 | 2/6/0 |
| kh01 | 9 | 6.3 | learn 5.6 | 0/0 | 1/7/1 |
| kh02 | 9 | 6.4 | learn 5.6 | 0/2 | 2/7/0 |
| kh03 | 9 | 6.1 | crit 5.2 | 0/0 | 2/7/0 |
| kh04 | 9 | 6.2 | crit 5.2 | 1/2 | 2/6/1 |
| kh05 | 8 | 6.4 | crit 5.8 | 0/2 | 5/3/0 |
| kh06 | 10 | 5.9 | crit 5.2 | 1/3 | 2/8/0 |
| kh07 | 7 | 6.1 | case 5.0 | 0/1 | 1/6/0 |
| kh08 | 8 | 6.1 | crit 5.1 | 0/1 | 2/5/1 |
| kh09 | 10 | 6.3 | crit 5.6 | 0/1 | 4/6/0 |
| kh10 | 10 | 6.3 | crit 5.7 | 0/1 | 1/9/0 |
| kh11 | 8 | 6.8 | eng 6.1 | 0/0 | 5/3/0 |
| gt01 | 10 | 6.1 | crit 5.1 | 0/1 | 2/8/0 |
| gt02 | 10 | 6.2 | dep 5.8 | 0/3 | 1/8/1 |
| gt03 | 10 | 6.2 | learn 5.6 | 1/1 | 1/8/1 |
| gt04 | 10 | 6.0 | dep 5.3 | 0/1 | 3/7/0 |
| gt05 | 9 | 6.3 | crit 5.9 | 0/0 | 4/5/0 |
| gt06 | 10 | 6.2 | crit 5.6 | 0/0 | 3/7/0 |
| tp01 | 9 | 6.3 | case 5.7 | 0/0 | 3/6/0 |
| tp02 | 9 | 6.0 | dep 5.2 | 0/0 | 1/7/1 |
| tp03 | 9 | 6.2 | dep 5.3 | 0/0 | 2/7/0 |
| tp04 | 7 | 6.2 | crit 5.6 | 1/1 | 2/5/0 |
| tp05 | 8 | 6.0 | case 5.3 | 0/1 | 2/6/0 |
| tp06 | 7 | 6.3 | crit 5.7 | 0/1 | 2/5/0 |
| tp07 | 9 | 5.9 | crit 4.8 | 0/1 | 2/6/1 |
| tp08 | 9 | 6.2 | case 5.6 | 0/0 | 3/5/1 |
| tp09 | 10 | 6.1 | case 5.2 | 0/1 | 1/9/0 |
| tp10 | 10 | 6.3 | crit 5.6 | 0/1 | 2/8/0 |
| tp11 | 8 | 6.1 | crit 5.6 | 0/3 | 2/6/0 |
| kn01 | 10 | 6.1 | crit 5.5 | 0/1 | 0/9/1 |
| kn02 | 8 | 5.9 | crit 5.3 | 0/2 | 0/7/1 |
| kn03 | 10 | 6.5 | eng 5.9 | 0/2 | 5/5/0 |
| kn04 | 8 | 6.0 | case 5.4 | 0/0 | 3/5/0 |
| kn05 | 9 | 6.3 | case 5.4 | 0/0 | 2/7/0 |
| kn06 | 9 | 6.1 | case 5.4 | 0/2 | 1/8/0 |
| kn07 | 8 | 6.4 | dep 5.9 | 0/1 | 2/6/0 |
| kn08 | 10 | 6.3 | dep 5.8 | 0/2 | 3/7/0 |
| kn09 | 10 | 6.0 | case 5.3 | 0/2 | 2/8/0 |
| kn10 | 10 | 5.9 | case 5.2 | 0/3 | 1/9/0 |
| kn11 | 8 | 6.4 | dep 5.8 | 0/2 | 4/4/0 |
| kn12 | 8 | 5.9 | learn 5.5 | 0/2 | 4/4/0 |
| kn13 | 7 | 6.0 | learn 5.3 | 0/1 | 1/6/0 |
| kn14 | 5 | 5.8 | learn 4.8 | 1/2 | 0/5/0 |
| kn15 | 5 | 6.3 | crit 5.4 | 0/1 | 0/5/0 |
| kn16 | 5 | 6.3 | crit 5.6 | 0/2 | 1/4/0 |
| tn01 | 10 | 6.3 | case 5.8 | 0/1 | 2/8/0 |
| tn02 | 10 | 6.5 | case 6.0 | 1/2 | 5/5/0 |
| tn03 | 10 | 6.0 | case 5.0 | 0/1 | 3/7/0 |
| tn04 | 10 | 6.4 | case 5.2 | 0/1 | 4/6/0 |
| tn05 | 9 | 6.3 | case 5.9 | 1/2 | 4/5/0 |
| tn06 | 10 | 6.2 | learn 5.6 | 0/2 | 2/8/0 |
| dl01 | 8 | 6.6 | case 5.8 | 0/1 | 4/4/0 |
| dl02 | 8 | 6.4 | case 5.6 | 0/2 | 1/6/1 |
| dl03 | 10 | 6.7 | case 6.0 | 0/1 | 3/6/1 |
| dl04 | 8 | 6.4 | learn 5.6 | 1/3 | 1/7/0 |
| dl05 | 10 | 6.6 | case 6.0 | 1/1 | 5/5/0 |
| dl06 | 10 | 6.4 | dep 5.6 | 0/2 | 1/9/0 |
| dl07 | 10 | 6.1 | eng 5.0 | 0/0 | 1/9/0 |
| dl08 | 10 | 6.4 | eng 5.6 | 0/1 | 3/6/1 |
| dl09 | 10 | 6.4 | dep 5.3 | 0/1 | 5/4/1 |
| dl10 | 8 | 6.9 | case 6.0 | 0/1 | 6/1/1 |
| tu01 | 10 | 6.6 | crit 5.7 | 0/0 | 3/7/0 |
| tu02 | 10 | 6.7 | case 5.8 | 0/0 | 2/8/0 |
| tu03 | 10 | 6.2 | crit 5.7 | 0/1 | 0/10/0 |
| tu04 | 9 | 6.3 | crit 5.8 | 0/1 | 1/8/0 |
| tu05 | 10 | 6.0 | dep 5.5 | 0/4 | 2/8/0 |
| tu06 | 10 | 5.9 | dep 5.1 | 1/0 | 2/8/0 |
| in01 | 10 | 6.0 | case 5.0 | 0/1 | 4/6/0 |
| in02 | 10 | 5.7 | dep 4.7 | 0/0 | 3/6/1 |
| in03 | 10 | 6.3 | learn 5.9 | 0/1 | 1/9/0 |
| in04 | 10 | 6.3 | crit 5.5 | 0/4 | 2/8/0 |
| in05 | 10 | 5.9 | dep 4.9 | 0/0 | 1/9/0 |
| L-strategy | 5 | 5.5 | case 4.6 | 0/2 | 1/3/1 |
| L-consumer | 5 | 5.7 | case 4.2 | 0/0 | 1/3/1 |
| L-brand | 4 | 5.3 | case 4.5 | 0/0 | 1/0/3 |
| L-media | 5 | 5.4 | case 4.6 | 0/1 | 1/4/0 |
| L-creative | 4 | 5.9 | crit 5.3 | 0/1 | 2/2/0 |
| L-growth | 3 | 5.5 | case 4.3 | 0/0 | 0/3/0 |
| P-principles | 22 | 5.2 | case 4.3 | 0/1 | 3/18/1 |

### 2.2 Bảng từng bài

| ID | Tên bài | A | D | C | P | K | Cs | L | E | Tổng | Bloom | QĐ | Ưu tiên | Vấn đề chính |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ob01-01 | Hai quán phở cùng dãy phố, vì sao khách đứng xếp hàng … | 7 | 5 | 8 | 6 | 5 | 6 | 6 | 7 | **6.3** | L2→L3 | K | P3 | [P2 example] Độ ngon bằng nhau là giả định, bài chưa nói cách biết; 30 phút đếm một lần không loại được yếu tố vị trí/giờ. |
| ob01-02 | Quán trà sữa vắng khách: sửa sản phẩm, giá, chỗ bán ha… | 6 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] Mâu thuẫn: nói đã có size M ('rất ít') rồi lại 'thêm' size M. |
| ob01-03 | Khách vào hỏi mua máy khoan, thật ra họ cần gì? | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L3→L4 | K | P3 | Không đi tới câu hỏi tiếp: chọn khách mục tiêu nào, hỏi thế nào để lộ nhu cầu thật; ví dụ 'hỏi để làm gì' còn đơn giản. |
| ob01-04 | Cùng một ổ bánh mì, vì sao chỗ này bán 25.000đ, chỗ ki… | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Gán toàn bộ chênh giá cho 3.000đ chi phí, bỏ qua mặt bằng, thương hiệu, khách văn phòng vs khách đường phố; hai chỗ khác phân khúc khách. |
| ob01-05 | Shop thời trang chốt đơn giỏi nhưng khách không quay l… | 7 | 6 | 7 | 6 | 7 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P3 | [P2 Q3] Situation nói 500 đơn, quiz đổi thành 500 khách; tỉ lệ mua lại tính theo khách. |
| ob01-06 | Bán đồ chơi giáo dục: nói chuyện với đứa trẻ hay với b… | 6 | 5 | 6 | 6 | 5 | 6 | 5 | 6 | **5.6** | L3→L4 | I | P1 | [P1 Q7] Hai đáp án cùng có thể đúng: lời hứa 'mèo mê ngay' nói với chủ (người mua) về trải nghiệm người dùng; phương án c được bẻ thành câu ghép để thành đáp án. |
| ob01-07 | Tiệm tóc không có gì để trưng lên kệ: làm sao để khách… | 7 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **6.0** | L2→L3 | I | P2 | [P2 example] Không tính chi phí thưởng; Q4 why.a nói 'tiệm phải tính xem có đáng không' nhưng bài không tính. |
| ob02-01 | Kệ hàng nói gì trước khi bạn đọc nhãn? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P1 Q5] Phương án b và c không loại trừ nhau (bán chạy là một nguyên nhân của hết hàng); why.a còn dùng 'giữ nguyên nhãn giá', chi tiết không có trong đề. |
| ob02-02 | Vì sao hàng đặt ngang tầm mắt bán chạy hơn? | 6 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.5** | L4→L4 | I | P2 | [P2 concept] Số đo cụ thể không nguồn; thực nghiệm (ví dụ Chandon và cộng sự 2009) cho thấy số facing ảnh hưởng mạnh hơn tầng kệ, tác động tầng vừa phải. |
| ob02-03 | Đọc menu: món nào quán thật sự muốn bán? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P1 Q6] Lời giải tự thừa nhận hiệu ứng trung bình gần 0, nhưng câu hỏi vẫn khẳng định 'vấn đề chính là quá nhiều lựa chọn' (b); dữ kiện chỉ nói 2 phút. |
| ob02-04 | Giá theo gram: cách khách so hai gói hàng | 7 | 4 | 7 | 6 | 5 | 5 | 5 | 5 | **5.5** | L2→L3 | M | P2 | [P2 Q3] Situation ghi nhãn '338đ/g'; người học nhập 338 sẽ bị chấm sai dù khớp nhãn. |
| ob02-05 | Trang sản phẩm trên sàn: 3 giây đầu tiên | 6 | 5 | 7 | 7 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 example] So sánh nhiễu: B còn có nhãn Mall, 4,9 sao, 12 nghìn đã bán (bằng chứng xã hội mà shop mới không thể sửa nhanh). Gán 3x cho ảnh chính là quá chặt. |
| ob02-06 | Đánh giá 1 sao đáng đọc hơn đánh giá 5 sao | 7 | 6 | 7 | 8 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | [P2 concept] Khái quát; bỏ qua đánh giá 3 sao (thường cân bằng nhất), thiên lệch chọn mẫu (người bực mới viết) và đánh giá ảo. |
| ob02-07 | Quầy thu ngân: vì sao kẹo luôn nằm ở đó? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L2→L3 | I | P2 | [P2 example] Lấy toàn bộ doanh thu kệ quầy làm 'tăng thêm', trong khi pin/bao cao su có thể mua dù ở đâu; không đối chứng như bài 02-02; so sánh mỗi mét kệ không có số c… |
| ob02-08 | Nhãn riêng của siêu thị đang cạnh tranh với ai? | 6 | 5 | 7 | 6 | 6 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P1 | [P1 concept vs Q7] Q7 lại kết luận hãng ở giữa mất nhiều nhất; hai ý mâu thuẫn. Nghiên cứu (Sethuraman và cộng sự) cho thấy nhãn riêng cạnh tranh gần nhất với thương hiệ… |
| ob02-09 | Khuyến mãi trên kệ: mua 2 tặng 1 có rẻ thật không? | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L4 | K | P3 | Concept đúng nhưng chưa bàn ROI khuyến mãi thực (kéo mua trước, giảm mua sau, biên lãi). |
| ob02-10 | Viết một bản quan sát điểm bán trong 10 phút | 7 | 5 | 7 | 7 | 6 | 5 | 4 | 6 | **5.9** | L2→L5 | I | P2 | [P2 quiz] Bài dạy kỹ năng viết nhưng quiz chỉ nhận diện; không có câu nào bắt viết/sửa một đoạn báo cáo thật. |
| ob03-01 | Hãng nước suối của bạn đang cạnh tranh với ai? | 7 | 6 | 7 | 6 | 6 | 6 | 5 | 6 | **6.1** | L3→L4 | I | P0 | [P0 Q4] Phương án đúng là cái duy nhất không bắt đầu bằng 'Hai sản phẩm...' như ba phương án nhiễu, nên lộ đáp án theo hình thức |
| ob03-02 | Ngành to hay ngành đang lớn — nên vào đâu? | 7 | 6 | 7 | 6 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P0 | [P0 Q4] Phương án đúng không mở đầu bằng 'Vì' như a, b, d; lộ đáp án bằng hình thức |
| ob03-03 | Khách mua bao lâu một lần, mỗi lần bao nhiêu? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.6** | L3→L4 | I | P0 | [P0 Q4] Ba nhiễu đều mở đầu 'Vì', đáp án đúng thì không; ngoài ra là câu ngắn nhất tự nhiên |
| ob03-04 | Khách mua theo thói quen hay mua sau khi cân nhắc? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.5** | L2→L4 | I | P0 | [P0 Q5] Ba nhiễu mở đầu 'Vì', đáp án đúng thì không; lộ đáp án |
| ob03-05 | Ai dẫn đầu ngành, và họ dẫn đầu nhờ đâu? | 6 | 5 | 7 | 6 | 5 | 6 | 5 | 5 | **5.6** | L3→L4 | I | P0 | [P0 Q4] Đáp án đúng không mở đầu 'Vì' như a, b, c; ngoài ra phát biểu nhân quả đảo một chiều là quá tay (quảng cáo cũng góp xây thị phần) |
| ob03-06 | Ngành này để lại bao nhiêu lãi trên mỗi đồng bán ra? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 5 | **6.3** | L3→L4 | K | P0 | [P0 Q4] Đáp án đúng không có 'Vì', ba nhiễu đều có; lộ đáp án |
| ob03-07 | Ngành của bạn bán mạnh vào tháng nào? | 7 | 5 | 7 | 7 | 5 | 5 | 5 | 5 | **5.8** | L3→L4 | I | P0 | [P0 Q4] Đáp án đúng không mở đầu 'Vì', còn a, b, c đều có; lộ đáp án |
| ob03-08 | Khách của ngành này mua ở đâu nhiều nhất? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.5** | L3→L4 | I | P0 | [P0 Q1] Phương án đúng là cái duy nhất không bắt đầu bằng 'Vì'; lặp lại ở Q4 ('Nhẹ, giá trị cao, nhiều lựa chọn, khách cần xem đánh giá') |
| ob03-09 | Vì sao ngành trông dễ làm nhưng người mới hay thua? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 5 | **6.3** | L3→L4 | K | P0 | [P0 Q6] Đáp án đúng là cái duy nhất không mở đầu 'Vì'; lộ đáp án |
| ob03-10 | Khi luật chơi của ngành đang đổi, bạn đọc dấu hiệu nào? | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 5 | **5.4** | L3→L5 | I | P0 | [P0 Q4] Phương án đúng không mở đầu 'Vì' trong khi b, c, d đều có |
| ob04-01 | Quán cà phê của bạn đang cạnh tranh với ai — quán bên … | 6 | 5 | 7 | 6 | 5 | 6 | 5 | 5 | **5.6** | L2→L4 | W | P0 | [P0 Q4] Theo chính định nghĩa này, nước lọc bình văn phòng (có bán, giải khát) là gián tiếp (phương án b), nhưng đáp án chấm là thay thế (d). Hai phương án cùng hợp định… |
| ob04-02 | Vẽ bản đồ đối thủ thế nào để thấy chỗ trống? | 7 | 5 | 7 | 6 | 6 | 5 | 5 | 5 | **5.8** | L3→L4 | I | P1 | [P1 example] Ý định nói ra từ 60 người chưa phải 'có khách thật'; kết luận 'có khách thật, đó là cơ hội' quá mạnh |
| ob04-03 | Đối thủ đang chạy quảng cáo gì — và nó nói lên điều gì? | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | K | P3 | [P1 concept] Heuristic hữu ích nhưng không chắc: nhiều mẫu cũ bị quên tắt, ngân sách chia nhỏ; cần ghi là tín hiệu yếu và đối chiếu thêm (số biến thể, ngày bắt đầu) |
| ob04-04 | Giá niêm yết của đối thủ có phải giá khách thật sự trả? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 example] Chênh 170.000đ chưa chứng minh nguyên nhân bán chạy; đánh giá, xếp hạng sàn, uy tín shop cũng có thể |
| ob04-05 | Điểm mạnh nhất của đối thủ đang che giấu điểm yếu nào? | 6 | 5 | 7 | 6 | 6 | 5 | 5 | 6 | **5.8** | L4→L5 | I | P2 | [P1 concept] Khẳng định tuyệt đối: chuỗi lớn có thể tách cơ sở cao cấp/nhượng quyền hoặc tăng diện tích/máy; ví dụ gym 150 hội viên cũng chưa kiểm tra kinh tế (2 cơ sở ×… |
| ob04-06 | Đối thủ giảm giá 20% — bạn có nên giảm theo? | 8 | 7 | 7 | 8 | 7 | 6 | 7 | 6 | **7.0** | L4→L4 | K | P3 | [P2 example] Tính chi phí quà cho toàn bộ 2.000 túi trong khi chỉ tặng khách quen; tính tay chênh nhưng thận trọng nên chấp nhận được; không nói về độ co giãn nên chưa b… |
| ob04-07 | Một đối thủ mới vừa vào ngành — lo hay chưa cần lo? | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | K | P3 | [P2 Q4] Concept nói 'chỉ đáng lo khi cả ba đều nghiêng', nhưng Q4 chấm 'đe doạ cao' khi mới 2/3 và chưa biết mua lại |
| ob04-08 | Bảng so sánh đối thủ một trang: giữ gì, bỏ gì? | 7 | 4 | 7 | 6 | 4 | 5 | 5 | 5 | **5.4** | L2→L4 | I | P1 | [P1 Q2] Đáp án đúng chép nguyên văn từ ví dụ, dài và cụ thể nhất; nhiễu a, b, d rất yếu |
| ob04-09 | Học từ đối thủ đến đâu thì thành sao chép? | 6 | 5 | 7 | 6 | 6 | 5 | 5 | 6 | **5.8** | L3→L5 | I | P2 | [P2 Q7] So sánh 18% với 5% là của chai thường, không phải so với nhãn biệt danh; 'thành công hơn' không rõ chuẩn; nghiệm không có đối chứng ngẫu nhiên |
| ob05-01 | Khách nói thích ít đường, sao đơn vẫn toàn full đường? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 Q3] calc chỉ là phép trừ 62-9, bài tự nói đây là so thô nên không kiểm năng lực |
| ob05-02 | Khách cầm lên rồi đặt xuống: kệ đang nói gì? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q4 why.a] Nhãn giá/khuyến mãi trên kệ thường thấy từ xa; khẳng định tuyệt đối |
| ob05-03 | Giỏ hàng bỏ dở: khách đổi ý hay bị chặn? | 7 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.6** | L4→L4 | K | P3 | [P2 Q5] Đáp án b là 'Thành công' nhưng lời giải tự thừa nhận chưa kết luận được; phương án c 'chưa kết luận được' cũng bảo vệ được |
| ob05-04 | Lượt tìm kiếm tăng vọt: nhu cầu thật hay cơn sốt? | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P1 Q2] Tình huống nói đỉnh kéo dài tháng 11–1, nên tháng 12 vẫn trong đỉnh; đáp án c lại không trả lời quyết định tháng 12 của sếp |
| ob05-05 | Bình luận livestream toàn hỏi giá: khách đang bảo bạn … | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Suy diễn không có dữ liệu, trình bày như sự thật |
| ob05-06 | Khách khen ngon mà không quay lại: tin lời khen hay ti… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 Q2 a] Phương án này khá hợp lý (xếp hạng app phụ thuộc điểm) và why chỉ nói 'điểm sao đã cao'; tặng quà đổi 5 sao còn trái chính sách nhiều app |
| ob05-07 | Giờ nào khách thật sự mua, và bạn đang quảng cáo giờ n… | 7 | 6 | 7 | 6 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P1 | [P1 concept/example] Đơn dồn trưa chưa chứng minh quảng cáo trưa tạo đơn (có thể là đơn tự nhiên); thiếu CPA/ROAS theo khung giờ và bão hoà |
| ob05-08 | Khách chọn COD rồi bom hàng: đó là tín hiệu gì? | 6 | 7 | 6 | 7 | 6 | 6 | 5 | 6 | **6.1** | L4→L4 | I | P1 | [P1 example vs Q6] Ví dụ khuyến nghị ưu đãi 15.000đ nhưng why.c Q6 tính chính ưu đãi đó tốn 6,75 triệu mà chỉ tiết kiệm ~2,2 triệu: tự mâu thuẫn |
| ob05-09 | Khách mở ba sàn so giá: bạn nên đua giá hay đua thứ kh… | 6 | 6 | 6 | 6 | 5 | 6 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P1 example/Q2] Dữ liệu bài nói mã giảm 20.000đ kéo 'đơn chuyển hẳn sang sàn đó' tức khách rất nhạy giá, nhưng đáp án khuyên giữ giá khi đối thủ giảm 15% mà không tính m… |
| ob05-10 | Dữ liệu đơn cũ biết khách sắp mua lại khi nào? | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L4 | K | P3 | [P2 Q3/example] 75% 'lệch nhịp' là giả định cửa sổ đúng lúc rộng 1 tuần, không phải dữ kiện |
| ob06-01 | Hàng của bạn bán ở tạp hoá hay siêu thị — và vì sao đi… | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 concept] Đúng xu hướng nhưng không dẫn tỉ trọng thật (Kantar/NielsenIQ), người học không có chuẩn so |
| ob06-02 | Cùng một gói gia vị, vì sao Bắc – Trung – Nam phản ứng… | 6 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | K | P3 | [P2 concept] Khuôn mẫu khẩu vị vùng miền không nguồn; bài đã hedge nhưng Q1 vẫn dùng như căn cứ đáp án |
| ob06-03 | Khách nông thôn mua ít hơn, hay mua khác đi? | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Khuyến nghị không có kinh tế đơn vị: giá bán 1.600đ/6ml có lãi không, chi phí phân phối |
| ob06-04 | Tết đến sớm hơn bạn nghĩ: khi nào phải có hàng trên kệ? | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q6 vs situation] Tình huống nói Tết giữa tháng 2; 'sớm hơn gần ba tuần' hàm ý năm ngoái đầu tháng 3 — không thể xảy ra |
| ob06-05 | Hộp quà Tết bán cho người ăn hay cho người nhận? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L2→L4 | I | P2 | [P2 quiz] Đáp án đúng gần như nằm sẵn trong tình huống/concept; nhiều câu (Q1, Q2, Q6) cho ra đáp án 'thể diện' theo từ khoá |
| ob06-06 | Tháng Giêng doanh số rơi mạnh: báo động hay chuyện năm… | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example vs concept] Concept nói phải so theo âm lịch khi Tết dịch chuyển, nhưng ví dụ so 'tháng Giêng' hai năm không kiểm Tết rơi ở đâu; 'tháng Giêng/Chạp' lẫn tháng… |
| ob06-07 | Mùa tựu trường, mùa mưa, mùa nóng: lịch nào đang điều … | 5 | 5 | 6 | 6 | 5 | 5 | 6 | 5 | **5.4** | L2→L4 | I | P1 | [P1 situation/Q1] Nhu cầu sữa học đường theo lịch học, không theo mưa; mưa miền Nam kéo từ tháng 5–11 gồm cả tháng 8–9 đang đỉnh: gán nguyên nhân sai |
| ob06-08 | Ngày đôi 9.9, 11.11, 12.12 trên sàn: chạy theo hay đứn… | 7 | 7 | 7 | 8 | 7 | 6 | 7 | 6 | **6.9** | L4→L5 | K | P3 | [P2 Q4 step] Kết luận chính nằm trong step phụ của calc chỉ hỏi lãi ngày 11.11; bỏ qua hiệu ứng thứ hạng/thuật toán của sàn, phí sàn |
| ob06-09 | COD, ví điện tử và Zalo: khách Việt muốn trả tiền và n… | 6 | 5 | 6 | 6 | 5 | 5 | 6 | 5 | **5.5** | L2→L3 | M | P2 | [P2 overlap] Trùng ý, câu hỏi (Q1, Q6) và giải pháp với ob05-08; số 10% boom mâu thuẫn mức 25% hoàn của ob05-08 |
| ob06-10 | Mùng 1, ngày rằm và cả nhà cùng quyết: bạn đang bán ch… | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.5** | L2→L4 | I | P2 | [P2 concept/title] Tiêu đề hứa 'cả nhà cùng quyết' nhưng nội dung chủ yếu là lịch âm; vai trò người đề xuất/quyết/mua/dùng chỉ vài câu |
| ob07-01 | Giá trị đơn trung bình 680 nghìn - khách của bạn có th… | 8 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.8** | L3→L4 | K | P3 | [P2 Q1/Q6] Đáp án đúng đều là phương án có lý giải đi kèm, dễ chọn theo giọng bài; Q6 d trùng ý Q2 nên không thêm tư duy |
| ob07-02 | 24 trên 30 người bạn nói sẽ mua - đã đủ để ra mắt? | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L4 | I | P2 | [P2 Q4] So đơn với chai nhưng không nói 1 đơn = bao nhiêu chai; và 9% là tỉ lệ cọc trên click chứ chưa phải tỉ lệ mua thật |
| ob07-03 | Cửa hàng treo nhiều poster bán chạy hơn - có nên in th… | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L5 | I | P2 | [P2 situation/example] 5.000 poster cho 5.000 tiệm là 1 poster/tiệm, trong khi giả thuyết là 'từ 3 poster trở lên'; thí nghiệm cũng không nói mỗi tiệm dán mấy poster |
| ob07-04 | 'Tỉ lệ chuyển đổi 20%' - 20% của cái gì? | 8 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.8** | L3→L4 | K | P3 | [P2 Q6] Phương án a cũng là bước kiểm hợp lý; 'cần kiểm gì' có hai đáp án chấp nhận được |
| ob07-05 | Đối thủ tăng trưởng 300% - có nên hoảng không? | 8 | 5 | 8 | 6 | 6 | 6 | 6 | 6 | **6.4** | L3→L5 | I | P2 | [P2 Q7] Nhãn lỗi 'RETENTION' không liên quan; 600 vốn là 200x3 chứ không phải cộng tuyến tính (cộng tuyến tính ra 800) |
| ob07-06 | Doanh số tháng Tết tăng 60% - chiến dịch có thật sự hi… | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L5 | I | P1 | [P1 Q1] Phương án d cũng là một cơ chế mùa vụ có thật và trả lời đúng 'vì sao chưa thể ghi toàn bộ 60%'; lời giải chỉ gạt vì 'không có dữ kiện', hai đáp án gần như cùng … |
| ob07-07 | Tỉ lệ mua lại từ 20% lên 25%: tăng 5% hay tăng 25%? | 8 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.8** | L3→L4 | I | P3 | [P2 example] Quy cho chương trình tích điểm mà không nhắc đối chứng/cùng kỳ (đã dạy ở 06); câu 'không ai cãi nhau về con số' bỏ qua nguyên nhân |
| ob08-01 | Quán bún bò bán chậm: lỗi ở món, ở giá, ở chỗ bán hay … | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | I | P2 | [P2 example/Q1] Xếp gửi xe vào Place là tranh cãi: với dịch vụ ăn uống đây là Physical evidence/Process (bài 06 sẽ dạy), tạo mâu thuẫn xuyên module |
| ob08-02 | Cùng một hũ sữa chua, khách thật ra đang mua gì? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | I | P2 | [P2 Q1/Q5] Bài 04 lại định nghĩa Place là 'hàng có sẵn ở nơi khách mua' và dạy giao/phân phối ở đó; học viên có thể hỏi vì sao giao hàng không phải Place; không có chú g… |
| ob08-03 | Giảm giá 10% thì phải bán thêm bao nhiêu để giữ nguyên… | 8 | 7 | 8 | 8 | 7 | 6 | 7 | 6 | **7.1** | L4→L4 | K | P3 | Chưa có chi phí cố định/điểm hoà vốn; chưa thử mô hình co giãn (khách thật sẽ mua thêm bao nhiêu), nên 'bù' dừng ở điều kiện. |
| ob08-04 | Quảng cáo chạy tốt, nhưng khách tìm mà không thấy hàng… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 situation/Q1] Hãng đã có gian hàng sàn nên khách hỏi 'mua ở đâu' vẫn có chỗ mua online; kết luận 'tạp hoá là chỗ nghẽn' bỏ qua việc 500.000 lượt xem có thể ở ngoài k… |
| ob08-05 | Marketing có phải là chạy quảng cáo không? | 7 | 5 | 7 | 6 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 concept] Định nghĩa được phê duyệt 2007 và tái khẳng định 2017; ghi mốc có thể gây hiểu lầm |
| ob08-06 | Bán dịch vụ: vì sao 4P chưa đủ? | 8 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.6** | L4→L4 | I | P3 | [P2 Q2/Q1] Đáp án đúng là gói ba việc dài nhất, khớp từng ghi chú trong tình huống nên lộ; không có trade-off hay ưu tiên giữa 3 việc |
| ob08-07 | Trà 'cao cấp' mà lúc nào cũng giảm 30%: các P có khớp … | 8 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.8** | L4→L5 | K | P3 | [P2 Q2] Đáp án đúng chọn đúng cách nhà thiết kế bài định hướng; phương án a (đổi định vị) bị loại với lý do 'lãi mỏng' nhưng chưa tính thử, trong khi 80% khách đã quen g… |
| ob08-08 | 4P nhìn từ quầy người bán - khách nhìn thấy gì khác? | 8 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.8** | L4→L5 | I | P3 | [P2 situation] Chỉ hỏi nhóm bỏ học, không so với nhóm học hết khoá: người ở lại cũng có thể ở xa; kết luận 'xa' gây bỏ học thiếu đối chứng (survivorship, nối ob07) |
| kh01-01 | Hai khách cùng 28 tuổi, cùng lương — sao mua hai kiểu … | 8 | 6 | 8 | 7 | 6 | 6 | 6 | 7 | **6.8** | L3→L4 | K | P3 | [P2 Q6] Ví dụ nằm ngay trong đáp án đúng nên lộ đáp án; phương án sai ngắn và mơ hồ |
| kh01-02 | Bán bánh trung thu: chia khách theo tuổi hay theo dịp … | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | [P2 Q1/situation] Đề không có dữ kiện nói hộp 4 bánh do doanh nghiệp mua; thông tin chỉ lộ ở phần Example, nên Q1 'đoán' phải dựa điều chưa cho |
| kh01-03 | Khách mua thường xuyên và khách mua một lần: chia thế … | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 Q6] Dùng nhóm đối chứng (holdout) mà bài chưa dạy |
| kh01-04 | Khách mua xe máy: người cần bền, tiết kiệm và người cầ… | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L2→L4 | I | P2 | [P2 Q7] Đáp án lấy nguyên văn từ Example nên chỉ cần nhận diện chuỗi chữ |
| kh01-05 | Phân khúc nghe hay nhưng có dùng được không? | 7 | 6 | 7 | 6 | 6 | 6 | 5 | 6 | **6.1** | L3→L4 | I | P2 | [P1 Q5] Đáp án b mô tả cách giải quyết (từ khoá tìm kiếm) chứ không chỉ ra phép thử nào khó; why.d lại nói 'đo được' cũng giải được bằng lượng tìm kiếm, nên câu hỏi mơ hồ |
| kh01-06 | Phân khúc có bao nhiêu tiền? Ước lượng nhanh trước khi… | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | M | P2 | [P2 Example] Tỉ lệ 20% ăn kiêng và 50% sẵn sàng trả đều là giả định, không nêu nguồn; chưa phân biệt TAM và phần thị phần khả thi |
| kh01-07 | Một sản phẩm, ba phân khúc: làm riêng hay làm chung? | 7 | 6 | 7 | 6 | 6 | 5 | 5 | 6 | **6.0** | L3→L4 | I | P2 | [P1 Q6] Concept định nghĩa 'đổi bề mặt' gồm 'đổi quy cách'; cỡ lớn gấp đôi cũng là quy cách nên đáp án d cạnh tranh với b |
| kh01-08 | Persona Chị Hoa 32 tuổi thích đọc sách: giúp được gì h… | 7 | 6 | 7 | 7 | 6 | 5 | 5 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q1] Phương án d không có trong persona gốc; why.d tự thừa nhận, nên không phải lựa chọn hợp lệ cho câu hỏi 'dòng nào trong persona ban đầu' |
| kh01-09 | Dữ liệu nói khách chủ yếu nữ 25–34 — có nên chỉ nhắm n… | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L4 | I | P3 | [P2 situation/example] Situation chỉ nêu hai ngày (14/2, 20/10) còn Example nói ba dịp |
| kh02-01 | Ba tệp khách đều hứa hẹn — chấm điểm thế nào để chọn m… | 8 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.9** | L4→L5 | K | P3 | [P2 Example] Chỉ tính số cho tệp gym; hai tệp còn lại nhận xét định tính, so sánh không đồng đều |
| kh02-02 | Sản phẩm dành cho mọi người — vì sao lại chẳng ai thấy… | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 7 | **6.6** | L3→L4 | I | P2 | [P2 situation] 90 triệu cho 300.000 lượt hiển thị nghĩa là 300.000đ/CPM, gấp nhiều lần mức thị trường; làm 'rải mỏng' trở nên phi thực tế |
| kh02-03 | Sản phẩm mới toanh: nên chiếm bãi đổ bộ nào trước? | 8 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.8** | L4→L5 | K | P3 | [P2 Example] Không đối chiếu với chi phí đội 5 người và 6 tháng tiền chạy nên 'đủ' chưa chứng minh |
| kh02-04 | Tệp nhỏ lãi dày hay tệp lớn cạnh tranh gắt? | 8 | 6 | 7 | 7 | 6 | 6 | 5 | 6 | **6.4** | L3→L4 | I | P3 | [P2 concept] Khẳng định chung cho mọi tệp nhỏ, không phân biệt khi nào đúng |
| kh02-05 | Khách mua nhiều hay khách mua thỉnh thoảng — ai đáng đ… | 6 | 6 | 7 | 7 | 5 | 5 | 5 | 6 | **5.9** | L3→L4 | I | P1 | [P1 example] So sánh +1 lần của 800 khách nhẹ (tăng 50% tần suất của họ) với +4 lần của khách nặng (tăng 33%) là so khác tỉ lệ; theo mức tăng tương đối, khách nhẹ khó hơ… |
| kh02-06 | Tệp này đáng bao nhiêu tiền mỗi tháng? | 6 | 7 | 7 | 8 | 7 | 6 | 6 | 6 | **6.6** | L4→L5 | I | P1 | [P1 example/Q2.why.d/Q7.why.d] 4,5% là ngưỡng lấp công suất 18.000 ly; kết luận 'dư sức trả 80 triệu mặt bằng' chỉ đổi chiều khi lãi gộp dưới 80 triệu, tức khoảng 5.333 … |
| kh02-07 | Tệp nhiều tiền nhưng khó với tới, hay tệp vừa túi nhưn… | 7 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.9** | L3→L4 | I | P2 | [P1 Q6] Phương án d về thực chất là lợi ích truyền miệng, gần với c; why.d phủ nhận ('Họ không dễ dãi') trong khi Example nói thành viên giới thiệu nhau, nên hai phương … |
| kh02-08 | Khi nào nên mở rộng sang tệp tiếp theo? | 7 | 6 | 7 | 7 | 6 | 6 | 5 | 6 | **6.3** | L4→L5 | I | P2 | [P2 example] Khẳng định không nguồn; và Q4 nói còn 65% 'đắt để giành' mà không có số |
| kh02-09 | Có nên bỏ bớt một tệp khách đang mang doanh thu? | 7 | 6 | 7 | 7 | 6 | 6 | 5 | 6 | **6.3** | L4→L5 | I | P2 | [P2 concept] Chưa xét giá trị chiến lược của tệp (độ phủ vùng, quy mô sản xuất, tiềm năng tăng) và rủi ro mất doanh thu cố định |
| kh03-01 | Ly cà phê sữa đá 7 giờ sáng đang làm mấy việc cùng lúc? | 7 | 6 | 8 | 7 | 5 | 6 | 5 | 7 | **6.4** | L3→L3 | I | P2 | [P2 Q1 why.a] Khẳng định như sự thật nghiên cứu nhưng không có nguồn; dùng để loại phương án a |
| kh03-02 | Cùng một người, vì sao sáng mua bánh mì mà tối gọi phở… | 7 | 6 | 8 | 7 | 6 | 6 | 5 | 7 | **6.5** | L3→L3 | K | NONE | [P2 Q4] Đáp án đúng dài nhất và là phương án duy nhất mô tả hoàn cảnh; dễ đoán bằng mẹo |
| kh03-03 | Ly cà phê buổi sáng thật ra đang cạnh tranh với những … | 7 | 7 | 7 | 7 | 6 | 6 | 6 | 7 | **6.6** | L4→L4 | K | P3 | [P2 situation/example] Không tăng trong khi 30/200 khách chuyển sang hoà tan hãng khác là chưa tự nhất quán; trùng hợp 15% với mức giảm doanh số gây rối |
| kh03-04 | Viết câu job thế nào để cả nhóm cùng hiểu một việc? | 7 | 6 | 8 | 8 | 5 | 5 | 5 | 6 | **6.3** | L3→L4 | I | P2 | [P1 Q1] Hai phương án a và c đều là lỗi hay gặp; 'hay sai nhất' không có dữ liệu, phụ thuộc quan điểm tác giả |
| kh03-05 | Khách 'sa thải' ứng dụng của bạn thì họ đang thuê gì t… | 6 | 6 | 7 | 6 | 6 | 5 | 6 | 7 | **6.1** | L4→L4 | I | P2 | [P2 Q3] 3.000 người mở hằng tuần cuối tháng 4 không đồng nghĩa 17.000 người đã rời bỏ; đồng nhất 'không active tuần' với churn |
| kh03-06 | Thêm tính năng mới hay làm tốt hơn việc khách đang thu… | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L3→L4 | I | P2 | [P2 Q3] Đại lượng này không phải chỉ số kinh doanh (bỏ qua chiết khấu kênh, thuế, bảo hành, biên %); đề calc gượng ép để có số |
| kh03-07 | Đặt tên và viết thông điệp theo việc của khách thế nào? | 6 | 5 | 7 | 7 | 4 | 5 | 5 | 7 | **5.8** | L3→L4 | I | P2 | [P1 example] Thử 20 vs 20 cửa hàng, không nói ngẫu nhiên hay cân bằng vị trí/lưu lượng; vẫn kết luận 'bản theo việc cao hơn 50%'. Dễ dạy kết luận nhân quả từ thử nghiệm … |
| kh03-08 | Người ta đăng ký phòng gym để làm việc gì — và vì sao … | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 7 | **6.1** | L3→L4 | I | P2 | [P1 example] Nhóm thử và nhóm cũ không cùng thời điểm/không ngẫu nhiên, gói mới gộp ba thay đổi; không thể quy 25 điểm cho từng yếu tố |
| kh03-09 | Chọn việc nào để tập trung khi khách thuê bạn cho nhiề… | 6 | 6 | 7 | 7 | 5 | 5 | 5 | 6 | **5.9** | L4→L5 | I | P2 | [P2 example/concept] Hai trục (quy mô, chưa thoả mãn) đủ ra quyết định là quá giản lược; không nói ai chấm, cỡ mẫu, và 70/30 lấy từ đâu |
| kh04-01 | "Khách mua vào buổi tối" là insight hay chỉ là dữ kiện? | 7 | 7 | 8 | 7 | 6 | 6 | 6 | 7 | **6.8** | L4→L4 | K | P3 | [P2 concept] Ví dụ lại xếp 'mua hai túi' là quan sát, mâu thuẫn với 'số túi' là dữ kiện |
| kh04-02 | Vì sao "mẹ muốn con khoẻ" không phải là insight? | 6 | 6 | 8 | 7 | 5 | 5 | 5 | 7 | **6.1** | L3→L4 | I | P0 | [P0 Q3] Đề hỏi 'câu nào có cấu trúc căng thẳng'; phương án c có đủ cấu trúc (muốn + nhưng), lời giải còn thừa nhận 'Có chữ nhưng' nên hai đáp án cùng đúng theo đề |
| kh04-03 | Làm sao biết insight của bạn đúng trước khi làm quảng … | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L3→L5 | I | P2 | [P1 concept] 'Đúng quá' đo mức cộng hưởng, không phải ý định mua; lịch sự/xã hội hoá vẫn gây dương tính giả |
| kh04-04 | Có insight rồi, làm sao ra được ý tưởng? | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L5 | I | P3 | [P2 Q3] Cũng có thể đọc là 'gỡ' (cho con tự chọn là cách làm dễ hơn); ranh giới 'đổi góc nhìn' và 'gỡ' mờ |
| kh04-05 | Sĩ diện, ngại từ chối, lo cho con — insight Việt nằm ở… | 6 | 6 | 7 | 7 | 4 | 5 | 5 | 8 | **6.0** | L3→L5 | I | P1 | [P1 Q1] Khẳng định 'phần lớn là từ chối mềm' không có số liệu; 'để bàn với nhà' thường cũng là cần đồng thuận thật. Dạy một diễn giải như sự thật |
| kh04-06 | Đọc 2.000 bình luận thế nào để ra insight? | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L4→L4 | I | P1 | [P1 Q6 why.d] Sai: bình luận ảo/hướng dẫn mẫu thường lặp lại; sàn còn thưởng xu cho bình luận dài, nên 'dài và lặp' chưa chắc thật |
| kh04-07 | Mẹ mua, con dùng — insight của ai? | 7 | 6 | 8 | 7 | 5 | 5 | 6 | 7 | **6.4** | L3→L4 | K | P3 | [P2 Q7] Cho là sai vì 'quá ngắn để nói chuyện an toàn', nhưng mẹ đang ở ngay đó; có thể làm kênh nhắc phù hợp |
| kh04-08 | Insight từng đúng, sao giờ quảng cáo hết chạm? | 6 | 6 | 7 | 6 | 6 | 5 | 5 | 6 | **5.9** | L4→L5 | I | P2 | [P2 example] Khẳng định xu hướng như sự thật, không dẫn số liệu; 'nhiều bạn học gần nhà' khó kiểm |
| kh04-09 | Viết câu insight thế nào để cả nhóm dùng được? | 7 | 5 | 8 | 8 | 5 | 6 | 5 | 6 | **6.3** | L3→L3 | M | P3 | [P2 order] Dạy cách viết câu mà đứng sau bài đo, kiểm, ý tưởng; thứ tự học ngược |
| kh05-01 | Chị có mua không? Vì sao câu trả lời có gần như vô giá… | 7 | 6 | 8 | 7 | 6 | 6 | 7 | 7 | **6.8** | L3→L4 | K | P3 | [P2 example] Chốt chiến lược từ 3/20 người từng mua ngũ cốc, mẫu quá nhỏ; chưa kiểm chứng |
| kh05-02 | Câu hỏi của bạn đã chứa sẵn câu trả lời chưa? | 7 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.6** | L3→L4 | K | P3 | [P2 example] Đổi cùng lúc cả câu hỏi, cách hỏi và nhóm khách nhưng quy hết chênh lệch 85% vs 35% cho cách đặt câu hỏi |
| kh05-03 | Phỏng vấn đồng nghiệp và bạn bè có tính không? | 5 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.6** | L3→L4 | I | P1 | [P1 situation] Người cần phỏng vấn là chủ tiệm nhưng tiêu chí sàng lọc và ví dụ lại chọn người đi cắt tóc; nhầm khách trả tiền với khách của khách |
| kh05-04 | Phỏng vấn bao nhiêu người là đủ? | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L4 | K | NONE | — |
| kh05-05 | Khách vừa nói cũng được, bạn hỏi tiếp hay chuyển câu? | 7 | 6 | 8 | 7 | 6 | 7 | 6 | 7 | **6.8** | L3→L3 | K | P3 | [P2 Q6] Giải thích why.a mâu thuẫn với lập luận 'tốn thời gian' của đáp án a, gây khó hiểu |
| kh05-06 | Trong ghi chép của bạn, đâu là lời khách, đâu là suy d… | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | K | P3 | [P2 example] Đổi thông điệp dựa trên lời kể của một người (chị Lan) trong 6 cuộc, mâu thuẫn tinh thần đếm số người ở bài kh05-07 |
| kh05-07 | Tám cuộc phỏng vấn xong, làm sao ra được ba chủ đề? | 6 | 6 | 7 | 7 | 5 | 6 | 7 | 6 | **6.3** | L4→L4 | I | P2 | [P2 example] Mức bức xúc suy ra từ 15 thẻ của một người, chính là kiểu lệch bài vừa dạy phải loại bằng cách đếm người |
| kh05-08 | Khảo sát online: cần bao nhiêu phiếu và hỏi thang điểm… | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P1 | [P1 concept] Sai số 1/căn n chỉ đúng với mẫu ngẫu nhiên; 8% phản hồi tự chọn bị lệch (người giận hoặc người rảnh), bài không nhắc nên ±5 điểm tạo cảm giác chắc chắn giả |
| kh06-01 | Điều gì khiến khách bắt đầu nghĩ tới việc mua? | 6 | 5 | 7 | 6 | 4 | 5 | 6 | 6 | **5.6** | L2→L3 | I | P1 | [P1 Q2] Dạy dời phần lớn ngân sách theo trigger, loại hẳn lập luận hiện diện thương hiệu quanh năm (phần lớn khách không in-market tại một thời điểm) mà không nêu đánh đ… |
| kh06-02 | Khách so sánh những ai trước khi chọn bạn? | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.8** | L3→L4 | I | P2 | [P2 Q6] Chỉ hỏi người đã mua, bỏ qua người không chọn bạn (thiên lệch người sống sót); bài không nói cách bắt khách đã loại bạn |
| kh06-03 | Khách xem trên TikTok, hỏi Zalo, mua ở cửa hàng — tính… | 6 | 6 | 7 | 7 | 6 | 6 | 5 | 6 | **6.1** | L4→L4 | I | P0 | [P0 Q1] Phương án c cũng đúng (lời giải why.c còn xác nhận video là bước đầu dẫn tới mua); hai đáp án cùng chấp nhận được, chỉ d là câu trả lời cho 'báo cáo sai ở đâu' |
| kh06-04 | Khách đã chọn hãng bạn ở nhà, sao đến cửa hàng lại đổi… | 5 | 5 | 7 | 6 | 4 | 5 | 6 | 6 | **5.5** | L3→L4 | I | P1 | [P1 example] Đổi ba thứ cùng lúc, nhưng Q7 dạy 'đổi một thứ ở 2 siêu thị'; ví dụ tự mâu thuẫn bài học và không tách được thứ nào có tác dụng |
| kh06-05 | Mua xong rồi, sao vẫn cần lo lần mở hộp và lần dùng đầ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | — |
| kh06-06 | Khách vừa mua xong lại thấy lo — bạn nói gì với họ? | 6 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 concept] Đưa như sự thật không nguồn; khái niệm dissonance sau mua có thật nhưng không gọi tên |
| kh06-07 | Làm sao để lần mua thứ hai tự xảy ra? | 5 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.6** | L3→L4 | I | P1 | [P1 Q1] Stem không có dữ kiện nào chọn được d; cả bốn nguyên nhân đều hợp lý. Đáp án chỉ đúng vì bài khẳng định, và why.b ('nếu đắt họ đã không mua lần đầu') là lập luận… |
| kh06-08 | Bản đồ hành trình dán trên tường — làm sao để nó thật … | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.5** | L2→L4 | I | P2 | [P2 apply] Bài tập chỉ vẽ 5 bước theo trí nhớ, đúng kiểu 'bản đồ đoán' mà bài chê; không có dữ liệu hay lời nguyên văn |
| kh06-09 | Chai nước 10 nghìn và căn hộ 3 tỉ có chung một hành tr… | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L2→L4 | I | P2 | [P2 example] Số liệu thực tế ngành bất động sản đưa như thật không nguồn |
| kh06-10 | Khách rơi rụng ở đâu trên đường tới đơn hàng? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L4 | K | P3 | [P2 Q1] Stem không có số 800 mà why.a/b/d đều dựa vào số này; đáp án c quá chung, gần như tautology |
| kh07-01 | Nói 'tiết kiệm 300.000đ' hay 'đang mất 300.000đ mỗi th… | 7 | 7 | 7 | 6 | 7 | 5 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 Q5] Cơ chế đúng là sở hữu/endowment (kh07-05), không phải khung mất đã dạy trong bài; người học chưa có công cụ để suy ra |
| kh07-02 | Vì sao thêm một gói 'chẳng ai mua' lại làm gói giữa bá… | 6 | 7 | 7 | 7 | 7 | 5 | 7 | 7 | **6.6** | L3→L4 | I | P2 | [P2 concept/example] Gói 6 tháng rẻ hơn gói 12 tháng về tổng tiền nên không bị lấn át hoàn toàn (không phải asymmetric dominance chuẩn); thực chất là phép so giá trên th… |
| kh07-03 | Menu trà sữa 48 món: nhiều lựa chọn hơn có bán được nh… | 6 | 5 | 7 | 7 | 4 | 5 | 5 | 6 | **5.6** | L3→L4 | I | P1 | [P1 concept] Trình bày hiệu ứng như quy luật chắc chắn, không nhắc meta-analysis (Scheibehenne 2010) cho hiệu ứng trung bình gần 0, khác với kh07-01/02 vốn có cảnh báo |
| kh07-04 | Vì sao tiền thưởng Tết được tiêu dễ hơn tiền lương? | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P1 Q4] Chỉ là giả định; đáp án c ('để dành lâu hơn vì thấy quý hơn') cũng có cơ sở (earmarking). Đề đưa như quy luật |
| kh07-05 | Dùng thử miễn phí 7 ngày: vì sao khách khó trả lại thứ… | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 7 | **6.1** | L3→L4 | I | P2 | [P1 example/concept] Bài đã cảnh báo mẫu số nhưng vẫn quy cả bước nhảy 200->560 cho hiệu ứng sở hữu; nguyên nhân có thể là bản thân việc trải nghiệm thật (try-before-buy… |
| kh07-06 | Trả góp 0%, mua trước trả sau: vì sao 'chỉ 22.000đ mỗi… | 5 | 5 | 7 | 7 | 6 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P1 concept] Gán tất cả cho 'thiên kiến hiện tại'. Chia theo ngày là hiệu ứng pennies-a-day/đóng khung đơn vị (Gourville), tách khoản trả là payment decoupling; present … |
| kh07-07 | Khi nào một cú hích tâm lý trở thành 'dark pattern'? | 6 | 6 | 7 | 7 | 6 | 5 | 6 | 7 | **6.3** | L4→L5 | I | P2 | [P1 Q7] Chính why.c cho thấy tick sẵn vẫn lời hơn 315 triệu; đáp án 'phần lời thêm nhỏ hơn nhiều' không được số liệu chứng minh; lập luận dựa vào khoản chưa lượng hoá. Đ… |
| kh08-01 | Khách này tin số đông, chuyên gia hay người giống mình? | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L3→L4 | K | P3 | [P2 Q5] Đưa kiến thức pháp lý không dạy trong bài; thực tế giới hạn nặng nhất áp dụng cho sữa thay thế dưới 24 tháng, câu chữ 'trẻ nhỏ' chung chung |
| kh08-02 | Vì sao 4,9 sao với toàn lời khen lại bán kém hơn 4,6 s… | 6 | 6 | 7 | 7 | 4 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P1 situation] Hai shop khác số đánh giá (520 vs 300) và rất có thể khác lịch sử bán; bài quy cho 'chi tiết' mà không loại bỏ nhiễu, nghịch lý nhân quả |
| kh08-03 | 'Đã bán 12' có nên hiện lên trang không? | 6 | 6 | 7 | 7 | 4 | 5 | 6 | 7 | **6.0** | L3→L4 | I | P2 | [P1 example/Q4] Ba thay đổi cùng lúc nhưng Q4 hỏi riêng 'vì sao gộp trang tăng niềm tin' và chấm 'Đúng' cho một cơ chế duy nhất; không có caveat như các bài kh08-02/04 |
| kh08-04 | Testimonial nào khiến người đọc tin, testimonial nào b… | 7 | 6 | 7 | 8 | 5 | 5 | 6 | 7 | **6.4** | L3→L4 | I | P3 | [P2 concept] Mẫu 2 không có chi tiết này, Q4 hỏi về một câu không có trong mẫu nên người học khó đối chiếu |
| kh08-05 | Đồng hồ đếm ngược chạy lại mỗi lần tải trang thì sao? | 6 | 5 | 7 | 7 | 5 | 5 | 6 | 7 | **6.0** | L3→L4 | M | P2 | [P2 Q2] Hạn chót cá nhân hoá (evergreen) mà thật sự kết thúc với từng khách là thực hành hợp lệ nếu nêu rõ; bài phủ nhận tuyệt đối |
| kh08-06 | Flash sale mỗi tuần kéo doanh số hay đang dạy khách ch… | 7 | 7 | 7 | 8 | 7 | 6 | 7 | 6 | **6.9** | L4→L5 | K | NONE | [P2 Q6] Phương án nhiễu bịa luật nên lời giải phải thêm ghi chú thay vì để học viên tự suy ra |
| kh08-07 | 'Chỉ còn 3 sản phẩm' trên sàn: khi nào giúp, khi nào h… | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 Q3] Calc đúng (60/9 ÷ 3 ≈ 2,2) nhưng không gắn với quyết định khan hiếm, chỉ đo tốc độ bán |
| kh08-08 | Mua review, bịa 'khách nói gì': ranh giới pháp lý và đ… | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.8** | L3→L5 | I | P1 | [P1 example] Đánh giá từ người được tặng hàng là quan hệ lợi ích; ví dụ chính không nói phải công khai, mâu thuẫn ranh giới 'công khai' của bài |
| kh09-01 | Ai thật sự 'mua' phần mềm kế toán trong một công ty 20… | 7 | 6 | 8 | 7 | 5 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 Q3 why.c / example] Mâu thuẫn với example: giám đốc tài chính được gán là 'người ảnh hưởng', chỉ tổng giám đốc là người duyệt |
| kh09-02 | Vì sao khách chọn hãng lớn đắt hơn dù sản phẩm của bạn… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | Không bàn chi phí của việc giảm rủi ro (bồi hoàn SLA, pilot) với một hãng nhỏ, và khi nào hãng lớn thật sự tốt hơn. |
| kh09-03 | Khách mất 6 tháng mới ký, marketing làm gì trong 6 thá… | 7 | 6 | 7 | 7 | 5 | 5 | 5 | 6 | **6.0** | L3→L4 | I | P2 | [P2 example] Không có tỉ lệ nền trước đó và không cảnh báo đối chứng, kết quả 30% được đọc như do chuỗi nội dung |
| kh09-04 | Case study nào khiến giám đốc nhà máy tin bạn? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P3 | Không bàn cách xin khách duyệt tên/số liệu, hay case khi khách không cho công khai (ẩn danh, trích dẫn). Thiếu rào cản thật của việc sản xuất case. |
| kh09-05 | Báo giá B2B: giảm giá hay đổi cách chào giá? | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P1 | [P1 example/Q3] Cơ sở so sánh sai: 117 triệu chỉ có khi thắng thầu ở 30.000, nhưng đối thủ chào 28.000. Giá 27.500 thắng thì lãi 19,5 triệu/tháng, thua thì 0. Bài không … |
| kh09-06 | Demo cho cả phòng ban hay dùng thử có hướng dẫn? | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | Không tính chi phí chuyên viên trên mỗi đơn khi quy mô lên 2.000 đăng ký/tháng; không so với onboarding tự động. |
| kh09-07 | Khi sales nghỉ việc, khách có đi theo không? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L2→L3 | I | P2 | [P2 Q3/example] Giữ chân theo số bệnh viện bỏ qua trọng số doanh thu (15 khách chiếm 40% doanh thu), bài không nói 3 khách mất lớn cỡ nào |
| kh09-08 | 500 lead rẻ hay 80 lead đúng người? | 8 | 7 | 7 | 8 | 6 | 7 | 7 | 6 | **7.0** | L4→L4 | K | P3 | Chi phí trên hợp đồng chưa đặt cạnh giá trị hợp đồng, LTV, thời gian chốt; 'ba tháng' có 5 và 8 hợp đồng mâu thuẫn nhẹ với chu kỳ 6 tháng ở kh09-03. |
| kh09-09 | Hợp đồng còn 90 ngày hết hạn, bắt đầu giữ khách từ đâu? | 7 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.6** | L3→L4 | K | P3 | [P2 Q7b] Đáp án đúng có vế 'không tốn chi phí' quá tuyệt đối; giữ chân cũng tốn chi phí chăm sóc |
| kh09-10 | Chạy quảng cáo B2B như bán trà sữa có được không? | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.8** | L2→L3 | I | P2 | [P2 example] Before/after không đối chứng, không nêu chi phí và chu kỳ; 18 hợp đồng trong 2 tháng mâu thuẫn với chu kỳ dài đã dạy ở kh09-03 |
| kh10-01 | Gen Z chỉ thích bắt trend — hay bạn đang nhìn nhầm lý … | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 7 | **6.3** | L3→L4 | I | P2 | [P2 example] Doanh số giảm 85% không phải tỉ lệ khách giữ lại; không có dữ liệu mua lặp của ly trend. Dùng một số để kết luận về hành vi quay lại. |
| kh10-02 | Sinh viên ít tiền thì chỉ mua đồ rẻ nhất? | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P1 | [P1 Q5b] Đáp án 'đúng' chứa tuyên bố so sánh không kiểm chứng, trái với tinh thần các bài kh10-03/06 về nói thật; trả góp 0% còn có phí cho người bán |
| kh10-03 | Vì sao video 'chuyên nghiệp' lại thua video quay bằng … | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 7 | **6.3** | L3→L4 | I | P2 | [P2 example/concept] Hai video khác người, nội dung, bối cảnh, độ dài; chỉ một cặp. Gán nguyên nhân cho 'thật' mà không nêu biến gây nhiễu |
| kh10-04 | Khách trẻ tìm quán ăn trên TikTok — Google của bạn còn… | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 situation/Q1] Khảo sát khách đã đến quán (survivorship); không biết bao nhiêu người tìm trên Google Maps mà không đến. 65% là tỉ lệ trong nhóm khách trẻ đã tới, khôn… |
| kh10-05 | Phụ huynh mua sữa cho con vì dinh dưỡng — hay vì sợ đi… | 6 | 6 | 7 | 6 | 6 | 6 | 7 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q2b] Đáp án 'đúng' vẫn đánh vào nỗi sợ 'thấp hơn bạn' mà bài lại bảo đừng khuếch đại; ranh giới giữa chạm nỗi lo và khai thác không rõ, dễ chạm quy định quảng cáo sữ… |
| kh10-06 | Một bà mẹ trong nhóm Facebook có sức nặng hơn quảng cá… | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 7 | **6.3** | L3→L4 | I | P2 | [P2 example] Seeding cho khách thật vẫn cần công khai nếu mẫu miễn phí và nhóm nhiều khi cấm hãng quảng bá; bài không nêu |
| kh10-07 | Người dùng là đứa trẻ, người trả tiền là bố mẹ — bạn n… | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L3→L4 | K | P3 | Không bàn dữ liệu trẻ em và đồng thuận của phụ huynh khi gửi 'phát âm đúng 80%', cũng không bàn 'pester power'. |
| kh10-08 | Người tỉnh mua ở đâu và tin ai — có giống người thành … | 7 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example] Không có số kết quả; ví dụ kết thúc bằng khẳng định mơ hồ |
| kh10-09 | Người ngoại thành chọn thương hiệu quen vì bảo thủ — h… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P3 | Bài nói 'rẻ hơn 15% nhưng mất trọn 100%' mà không tính xác suất hoà vốn (nếu P(hỏng) > ~18% thì tiết kiệm mất giá trị). Cơ chế đổi hàng không nêu ai chịu chi phí. |
| kh10-10 | Chân dung khách của bạn là người thật — hay là một khu… | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | I | P3 | [P2 Q7a/Q7b] Đáp án nhiễu b cũng đúng một phần và lời giải chỉ nói 'có khi đúng một phần'; người học giỏi có thể chọn b hợp lý |
| kh11-01 | Viết slogan trước rồi mới tìm khách — vì sao chuỗi này… | 8 | 6 | 7 | 7 | 5 | 6 | 6 | 7 | **6.5** | L3→L4 | I | P2 | [P2 example] Phân khúc dựa trên người đang mua, bị chính quảng cáo sai nhóm trước đó định hình; không nhắc thiên lệch người sống sót |
| kh11-02 | Phòng gym chia hội viên theo tuổi hay theo cách họ tập? | 8 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.8** | L3→L4 | I | P3 | [P2 concept/example] Tần suất tập vừa là hành vi vừa là kết quả của việc gắn bó; chia theo nó gần như lặp lại biến cần giải thích (vòng lặp), bài không nêu |
| kh11-03 | Ba phân khúc trên giấy — cái nào thật sự dùng được? | 8 | 7 | 7 | 7 | 7 | 7 | 7 | 6 | **7.0** | L4→L4 | K | NONE | [P2 Q3 wrong] 120 = 300 / 2,5 là chia cho doanh thu; nhãn lỗi 'quên chi phí biến đổi' không khớp với lỗi dùng doanh thu thay lãi gộp |
| kh11-04 | Nhắm một nhóm, vài nhóm hay cả thị trường — và có ai n… | 8 | 7 | 7 | 6 | 8 | 6 | 7 | 6 | **6.9** | L5→L5 | K | P3 | Quan điểm Sharp chỉ được tóm tắt, chưa giải thích cơ chế (người mua nhẹ, ít người trung thành) nên người học khó tự đánh giá mức hợp lý. |
| kh11-05 | Phân khúc to nhất có phải phân khúc đáng chọn nhất? | 8 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.9** | L4→L5 | K | P3 | [P2 concept] Công thức bỏ chi phí thu hút khách và chi phí làm dòng riêng (đã dạy ở kh11-03); lãi kỳ vọng bị phóng đại, nhất là với phân khúc phải cạnh tranh khốc liệt n… |
| kh11-06 | Đã chọn tệp — viết câu định vị thế nào để không trôi k… | 8 | 7 | 7 | 7 | 6 | 7 | 7 | 6 | **6.9** | L4→L4 | K | NONE | [P2 Q2 why.a] Diễn đạt khó hiểu; ý là khách nhận đơn trễ sẽ thấy lời hứa sai rõ hơn |
| kh11-07 | Định vị xong rồi — sản phẩm, giá, kênh và lời nói phải… | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q1] Tình huống không nói bếp là nguyên nhân trễ; why.a khẳng định nhân quả không có dữ kiện (đúng cái lỗi mà gt01 cảnh báo) |
| kh11-08 | Chọn tệp một đằng, quảng cáo nói một nẻo — tìm điểm đứ… | 8 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.9** | L4→L4 | K | NONE | [P2 concept] Bốn mắt xích là khung do khoá học đặt ra, không có nguồn; trình bày như danh mục chuẩn |
| gt01-01 | 'Doanh số giảm' là vấn đề hay chỉ là triệu chứng? | 7 | 6 | 8 | 7 | 5 | 6 | 6 | 7 | **6.5** | L3→L4 | I | P3 | [P2 Q5] Situation đã ghi 'giảm 15%'; đáp án 15 bị coi sai trong khi đáp án 14,64 chỉ khác do làm tròn |
| gt01-02 | Câu vấn đề thiếu số và thiếu thời hạn thì hỏng ở đâu? | 7 | 5 | 7 | 7 | 5 | 5 | 5 | 5 | **5.8** | L2→L3 | I | P2 | [P1 Q2] Đáp án đúng là câu duy nhất có số và dài nhất, chỉ cần so mẫu; không kiểm tư duy chọn mục tiêu 25% (vì sao 25%?) |
| gt01-03 | Hỏi 'vì sao' mấy lần thì chạm tới vấn đề thật? | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P1 example] Chuỗi vì sao nhảy: 60% không nghe máy được gán cho gọi chậm mà không có dữ kiện nào cho thấy khách nghe nếu gọi sớm; chất lượng lead từ quảng cáo là giả thu… |
| gt01-04 | Vấn đề này là vấn đề của ai? | 5 | 5 | 7 | 6 | 4 | 6 | 5 | 6 | **5.5** | L2→L4 | I | P1 | [P1 concept/Q4] Quy tắc khái quát hoá: vấn đề cũng có thể xuất phát từ trên (sản phẩm, đại lý không giao hàng). Q4 (app trẻ em) đáp 'của trẻ' mâu thuẫn với quy tắc vì ng… |
| gt01-05 | Sếp bảo 'làm TikTok đi' thì hỏi lại gì? | 7 | 6 | 7 | 8 | 6 | 6 | 6 | 7 | **6.6** | L3→L4 | K | P3 | [P2 Q3 / example] Example nói 25% đơn, Q3 nói 25% doanh thu; hai đơn vị khác nhau |
| gt01-06 | Đây là vấn đề marketing hay vấn đề sản phẩm, vận hành? | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q5 why.b] Giải thích mơ hồ, không nói gì về cơ chế |
| gt01-07 | Vấn đề nằm ở khắp nơi hay chỉ ở một góc? | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 5 | **6.0** | L3→L4 | I | P2 | [P2 example] Diễn đạt gượng, dễ tưởng là lỗi; cộng khớp 5 tỉ -> 4,5 tỉ |
| gt01-08 | Đằng sau 'doanh số giảm' là thành phần nào? | 8 | 6 | 7 | 8 | 5 | 6 | 7 | 6 | **6.6** | L3→L4 | K | P3 | [P2 example] Không kiểm xem 2% -> 1,6% (240 -> 200 đơn) có nằm trong nhiễu không, và lượt vào tăng 500 có thể là traffic kém chất lượng |
| gt01-09 | Có dữ kiện mới rồi, có dám viết lại câu vấn đề? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L5 | I | P2 | [P1 example] Chỉ phỏng vấn người đã đến thử rồi không đăng ký (thiên lệch chọn mẫu); người thấy giá cao có thể chẳng bao giờ đến. 22/40 không đại diện cho 'khách mới đăn… |
| gt01-10 | Câu hỏi then chốt của dự án này là gì? | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 5 | **5.6** | L2→L5 | I | P2 | [P1 Q2/Q5] Đáp án đúng chép gần nguyên văn câu trong Example; Q5 cùng khuôn 'Có nên... nếu cần N'. Người học chỉ khớp mẫu, không tự dựng ngưỡng |
| gt02-01 | Doanh thu giảm 20%: bắt đầu tách từ đâu? | 7 | 5 | 8 | 6 | 5 | 6 | 6 | 6 | **6.1** | L3→L3 | I | P2 | [P2 Q6] Ba thừa số nhân với nhau, không phải 'loại trừ nhau'; dễ gây hiểu sai về phép phân rã |
| gt02-02 | Khách mới hay khách cũ đang biến mất? | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P1 | [P1 Q1] Câu hỏi bảo 'đoán' nhưng phương án a (quảng cáo ngày càng đắt) cũng hợp lý; đáp án d là suy diễn từ quy mô, không có căn cứ trong đề |
| gt02-03 | Tách theo kênh, vùng hay sản phẩm trước? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 concept] Mức giảm dồn có thể chỉ vì nhánh đó chiếm phần lớn doanh thu; cần so tỉ trọng giảm với tỉ trọng doanh thu |
| gt02-04 | Cây này có nhánh nào trùng hay sót không? | 7 | 5 | 8 | 6 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 concept] Cộng khớp chưa chứng minh MECE: trùng và sót có thể bù nhau (ví dụ trùng 150 và sót 150) |
| gt02-05 | Nhánh nào kéo doanh thu xuống nhiều nhất? | 8 | 7 | 6 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | — |
| gt02-06 | Doanh thu tăng mà lãi giảm: vẽ cây gì? | 6 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **5.9** | L3→L4 | I | P1 | [P2 concept/example] Mã giảm giá là giảm doanh thu thuần, không phải chi phí; ví dụ để 'mã giảm giá' làm chi phí biến đổi tăng lẫn kế toán |
| gt02-07 | Lượt tải app tăng mà doanh thu không tăng? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L3→L4 | I | P2 | [P1 Q6] Phương án a và c đều đúng về mặt lý luận; câu hỏi 'vì sao làm méo phễu' cho phép chọn cả hai |
| gt02-08 | Thiếu dữ liệu một nhánh thì làm sao? | 5 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.4** | L3→L4 | W | P1 | [P1 situation] Doanh thu của hãng chính là tiền đại lý nhập (sell-in), nên nhánh này thực ra có số; bài lẫn sell-in và sell-out nên phép trừ 'ước' vô nghĩa |
| gt02-09 | Cây sâu bao nhiêu tầng là đủ? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 concept] Quy tắc ngón tay cái đưa như thực tế, không nguồn |
| gt02-10 | Từ nhánh gãy đến giả thuyết: viết thế nào? | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L4 | I | P3 | [P2 example] Câu mơ hồ: 'mã giảm' và 'giảm tần suất' dính nhau, đọc thành khách dùng mã mua nhiều hơn; ý đúng là họ giảm tần suất nhiều hơn |
| gt03-01 | "Làm video TikTok sẽ tăng doanh số" đã là giả thuyết c… | 7 | 6 | 8 | 7 | 6 | 6 | 5 | 6 | **6.4** | L3→L3 | I | P2 | [P2 example/quiz] Không nói cỡ mẫu: 2% so với 2,5% trên vài trăm lượt vào có thể chỉ là nhiễu; cũng chưa giải thích làm sao gán chuyển đổi cho video |
| gt03-02 | Giả thuyết không thể sai thì có đáng kiểm không? | 7 | 5 | 7 | 6 | 6 | 6 | 5 | 6 | **6.0** | L3→L4 | M | P2 | [P2 Q7] 78 vs 80 đơn trên nền 60 đơn/tháng nằm trong nhiễu; bài coi ngưỡng là nhị phân mà không nói độ tin cậy |
| gt03-03 | Số nào sẽ chứng minh bạn đúng — và bao nhiêu thì đủ? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L5 | I | P0 | [P0 Q6] Mâu thuẫn với concept 'chỉ số phụ không được lật kết quả': ngưỡng AOV 52k đã vượt (55k) và why.c tự nói doanh thu vẫn nhích (46,8 vs 45); theo luật bài thì a ('t… |
| gt03-04 | Vấn đề nằm ở khách, ở kênh hay ở thông điệp? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] Tối ưu CTR dễ ra thông điệp câu click; bài trước dạy gắn ngưỡng với kết quả kinh doanh, ở đây dừng ở CTR; không nêu cỡ mẫu 1,2% vs 1,8% |
| gt03-05 | Doanh thu giảm 20% — nên tin giả thuyết đầu tiên nghĩ … | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L4 | K | P3 | Trùng hầu hết gt02-10 (nhiều giả thuyết, dấu vết khác nhau). Giải thích 'vì sao giả thuyết đối thủ hay đến đầu' là tâm lý học, đưa như sự thật không nguồn. |
| gt03-06 | Chỉ đọc bình luận khen thì có kiểm được giả thuyết khô… | 6 | 6 | 7 | 6 | 6 | 6 | 5 | 6 | **6.0** | L3→L4 | I | P1 | [P1 concept] Vấn đề nêu là thiên kiến chọn mẫu tự nguyện (voluntary response), không phải thiên kiến xác nhận; bài gộp hai khái niệm và quiz Q1 kiểm đúng thiên kiến chọn… |
| gt03-07 | Có ba giả thuyết mà tiền chỉ đủ kiểm một — chọn cái nà… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L5 | I | P2 | [P2 example] Ngưỡng 2% không suy ra từ bài toán (cần bao nhiêu khách để hoà vốn 30 triệu); 30 người và bước từ để lại số tới mua chưa được tính; đạt 'đúng 2%' trên mẫu 3… |
| gt03-08 | Giả thuyết sai rồi — tiền đã mất hay đã mua được bài h… | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | I | P2 | [P2 situation] Mục tiêu tăng 25% giá trị đơn trung bình bằng quà ngưỡng 200k là phi thực tế; giả thuyết tự thất bại do đặt mục tiêu sai, không hẳn do lý luận |
| gt03-09 | Vì sao nhóm cứ thử lại những ý đã thử năm ngoái? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.5** | L2→L4 | I | P2 | [P2 example] Kết luận 'hợp kéo khách mới' không có dữ liệu (chỉ biết mua lại tăng 1 điểm); trái với tinh thần gt03-08 là bài học vừa phạm vi |
| gt03-10 | Trong một case thi, giả thuyết nên xuất hiện ở đâu? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L5 | I | P2 | [P2 example] Tăng 67% tương đối không có cơ chế định lượng, trong khi Q5 chê 3%->15%; con số 5% cũng chưa được suy ra, và 150 triệu là doanh thu, chưa trừ chiết khấu gói… |
| gt04-01 | Mười việc trên bảng, đội chỉ đủ sức làm ba: chọn thế n… | 7 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **6.0** | L3→L4 | I | P2 | [P2 Q2 why.c] Câu giải thích bị lỗi/không rõ nghĩa |
| gt04-02 | Ba ý tưởng tăng đơn cùng hấp dẫn: chấm điểm để chọn mộ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] Thang Impact (2/3/1) không được định nghĩa; RICE gốc dùng 0,25-3 nhưng bài không nói |
| gt04-03 | Nhận hợp đồng tài trợ sự kiện thì mất gì mà không ai g… | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | K | P3 | [P2 example] So hai ước lượng bằng một con số điểm, không xét rủi ro/độ chắc chắn; phương án lên kệ có thể kém chắc hơn |
| gt04-04 | Một nhóm nhỏ khách mang về phần lớn doanh thu: dồn sức… | 7 | 5 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 concept] Xếp hạng theo doanh thu chứ không theo lợi nhuận; khách lớn thường được chiết khấu sâu nên 80% doanh thu có thể là 50% lợi nhuận |
| gt04-05 | Việc tốt nhưng không quan trọng: nói 'không' sao cho n… | 6 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **5.9** | L2→L3 | I | P2 | [P2 Q2] Phương án nhiễu chứa từ tuyệt đối nên lộ |
| gt04-06 | Sếp muốn làm tất cả trong một quý: bạn trình bày thế n… | 6 | 5 | 7 | 7 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | K | P3 | [P2 example] Kịch bản A/B có tổng giờ nhưng không có giờ từng hạng mục nên không kiểm lại được 900/950 |
| gt04-07 | Việc nhanh thắng hay việc nền tảng: đội nhỏ nên làm cá… | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 5 | **5.4** | L2→L4 | I | P1 | [P1 example] Ưu đãi cho 60 lịch/2 tuần (khoảng 120/tháng) còn nhiều hơn nền tảng 40/tháng; số liệu không chứng minh nền tảng thắng, bài không đưa chi phí/biên lợi nhuận … |
| gt04-08 | Tiền có hạn: chia cho giữ khách cũ hay tìm khách mới? | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | K | P3 | [P2 example/concept] So một đơn tăng thêm với CAC của một đơn đầu mà bỏ qua giá trị vòng đời và biên lợi nhuận; khách mới còn 25% mua lại |
| gt04-09 | Mùa cao điểm sắp đến: dồn sức vào đâu và khi nào? | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 5 | **5.4** | L2→L3 | I | P2 | [P2 Q3] Giả định đều theo tuần; thực tế doanh thu mùa vụ dồn về 2 tuần cuối, trung bình che mất đỉnh cần chuẩn bị công suất |
| gt04-10 | Hai giả thuyết ngang điểm: chọn cái nào khi chỉ đủ tiề… | 6 | 5 | 6 | 6 | 6 | 5 | 5 | 5 | **5.5** | L3→L4 | I | P2 | [P2 example/Q2] Hai giả thuyết không độc lập: phụ huynh bỏ form có thể vì thiếu tin tưởng (B); đánh giá thường đặt trước form nên có thể tăng hoàn tất form |
| gt05-01 | Brief ghi 'tăng nhận biết thương hiệu' — vấn đề kinh d… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] Dùng tỉ trọng như doanh thu 'giảm'; tỉ trọng có thể giảm vì sáng tăng chứ không phải chiều giảm (Q5 mới tính ra số tuyệt đối) |
| gt05-02 | Viết mục tiêu trong brief thành một câu đo được thế nà… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 5 | **6.3** | L3→L4 | I | P2 | [P2 example] Không giải thích vì sao 8.000 và có khả thi theo ngân sách hay benchmark; mẫu số 40.000 là lượt tải cộng dồn, không phải người dùng còn hoạt động |
| gt05-03 | 'Nữ 18–35, thu nhập trung bình' — chân dung khách tron… | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L3→L4 | K | P3 | [P2 Q2] Đáp án đúng là phương án duy nhất có dữ liệu nên lộ |
| gt05-04 | Ô 'insight' trong brief đang chứa dữ kiện hay chứa sự … | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P1 example/situation] Định vị đồ uống tăng lực cho tài xế để 'không phải dừng nghỉ' khi buồn ngủ là rủi ro an toàn giao thông và pháp lý quảng cáo; bài không nhắc |
| gt05-05 | Brief muốn nói năm điều — chọn một thông điệp duy nhất… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 example] Một lời hứa đo được nhưng bài chưa kiểm là sản phẩm làm được và có bằng chứng; mâu thuẫn nhẹ với bài lý do để tin sau đó |
| gt05-06 | Thông điệp đã có — lý do để tin nào làm khách chịu tin? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 example/Q4] Thử nghiệm tự đánh giá, không nhóm đối chứng, khoảng tin cậy rộng (khoảng 62–86%); bài chỉ dạy 'ghi nguồn và cỡ mẫu' mà không nói giới hạn |
| gt05-07 | Ngân sách, thời hạn, điều bắt buộc — ghi ràng buộc vào… | 7 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **6.0** | L2→L3 | I | P2 | [P2 example] Tỉ lệ 25/75 như chân lý; không giải thích cách chọn hoặc ảnh hưởng của phí agency |
| gt05-08 | Cùng một chiến dịch, brief cho agency và brief cho KOL… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 example] Hứa tác dụng sức khoẻ cho thực phẩm thường nhưng cùng lúc cấm 'chữa bệnh'; chưa nhất quán với quy định quảng cáo thực phẩm |
| gt05-09 | Cầm một brief tệ trong tay — sửa phần nào trước? | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L4→L5 | I | P2 | [P2 example] Không kiểm mục tiêu so với ngân sách: 300 triệu để kéo thêm 1.000 đôi tức 300.000 đồng/đôi, có thể ngang giá bán giày |
| gt06-01 | Sếp giao 600 triệu doanh thu quý - cần bao nhiêu khách? | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q2 why.d] Câu giải thích lủng củng, sai chữ ('còn nhiều' thay vì 'nhiều') |
| gt06-02 | 'Tăng 30% follower trong 3 tháng' - SMART rồi, sao vẫn… | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L4 | K | P3 | [P2 example] Mã giảm giá riêng bỏ sót người thấy trên Instagram rồi mua ở nơi khác hoặc không dùng mã; coi là đo đầy đủ là quá tay |
| gt06-03 | Mục tiêu thương hiệu hay mục tiêu bán hàng - quý này c… | 7 | 7 | 7 | 6 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | K | P3 | [P2 Q4] Đáp án khuyên chờ tới cuối quý mới đánh giá, bỏ qua chỉ số giữa kỳ của thương hiệu (reach, tần suất, view-through, brand lift giữa kỳ) |
| gt06-04 | Doanh thu chỉ biết cuối tháng - theo dõi gì mỗi tuần? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example vs Q2] Ví dụ kết luận hụt từ đúng một tuần, trong khi Q2 why.c nói 'Một tuần chưa đủ để kết luận'; mâu thuẫn ngầm. Chia 200 lịch đều 50/tuần cũng trái với bà… |
| gt06-05 | Team 4 người, 12 chỉ số - nên nhìn con số nào trước? | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.8** | L3→L4 | I | P2 | [P2 example] 40% x 8.000 x 10% = 320 người, còn 400 người; 'hơn hẳn' là phóng đại (chỉ hơn 25%) |
| gt06-06 | Tăng khách hay tăng lãi - khi hai mục tiêu giành nhau? | 7 | 7 | 7 | 7 | 6 | 6 | 7 | 7 | **6.8** | L4→L5 | K | P3 | [P2 concept] Giới hạn 38% xuất hiện không có cách chọn; và 1,3 x 38% = 49,4 > 40% cho thấy tổng lãi gộp vẫn tăng, bài không so lãi tuyệt đối với biên lãi % |
| gt06-07 | Mở shop mới, chưa có số năm trước - mục tiêu đặt từ đâ… | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 example] 15 triệu/100 đơn = 150.000 đồng mỗi đơn; bài không kiểm xem shop hạt dinh dưỡng chịu nổi CPA này (giá đơn, biên lãi không được nói) |
| gt06-08 | Team 3 người có nên dùng OKR không? | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 5 | **5.8** | L3→L4 | I | P2 | [P2 title vs content] Tiêu đề hỏi 'có nên' nhưng nội dung chỉ dạy cách viết OKR gọn, không cân nhắc chi phí/lợi ích hay khi nào không nên dùng |
| gt06-09 | Chiến dịch một tháng - đặt mục tiêu sao cho biết ngày … | 7 | 6 | 7 | 7 | 5 | 6 | 7 | 6 | **6.4** | L3→L4 | I | P2 | [P2 concept] Trần CPA lấy bằng ngân sách chia mục tiêu là vòng tròn; trần thật phải suy từ biên lãi mỗi đơn. Q4 nói 'giữ lãi' nhưng bài không có giá/biên lãi balo |
| gt06-10 | Hụt mục tiêu quý - báo cáo sao cho trung thực mà vẫn c… | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L4→L5 | I | P2 | [P2 Q4 why.a] Đủ lượt vào trang không có nghĩa lưu lượng đúng người; tỉ lệ mua thấp có thể do chất lượng traffic, nên kết luận 'hụt ở trang' quá chắc |
| tp01-01 | Câu định vị của bạn có đủ để đội thiết kế tự quyết mà … | 7 | 7 | 7 | 7 | 6 | 6 | 7 | 7 | **6.8** | L4→L4 | K | P3 | [P2 concept] Khung này gần với template của Geoffrey Moore/Keller nhưng không ghi nguồn; vế 'là gì' trùng với 'khung tham chiếu' ở bài tp01-02 |
| tp01-02 | Trà thảo mộc đóng chai của bạn đang cạnh tranh với trà… | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | K | P3 | [P2 concept] Tuyệt đối hoá: định vị cũng có thể chủ động đổi khung (tạo ngành hàng/tái khung) và chỉ hỏi 40 khách hiện tại thì thiên lệch người đã chọn mình |
| tp01-03 | Nên khoe điểm độc đáo, hay chứng minh mình không thua … | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P1 Q4] Với khung 'sữa hạt' (chính bài tp01-02 dạy khung quyết định), 'không lactose' là điểm tương đồng; chỉ khi khung là sữa bò nó mới là điểm khác. Đề không nêu khung… |
| tp01-04 | Bản đồ định vị cho thấy một ô trống - đó là cơ hội hay… | 7 | 6 | 7 | 6 | 7 | 6 | 6 | 6 | **6.4** | L4→L4 | I | P3 | [P2 example] Hai trục này là vị trí/tiện lợi chứ không phải định vị nhận thức; bài chuyển sang chuyện vị trí cửa hàng, nên ví dụ không còn minh hoạ bản đồ định vị |
| tp01-05 | Muốn định vị rõ, bạn phải chấp nhận mất nhóm khách nào? | 7 | 7 | 7 | 7 | 8 | 6 | 7 | 6 | **6.9** | L5→L5 | K | P3 | [P2 example/Q3] Chỉ tính doanh thu, không tính biên lãi từng nhóm; giả định 'một nửa' không có căn cứ |
| tp01-06 | Khi thị trường đổi, bạn giữ định vị cũ hay dời chỗ đứn… | 6 | 6 | 6 | 6 | 5 | 5 | 6 | 6 | **5.8** | L3→L4 | I | P2 | [P1 concept vs example] Theo định nghĩa này, việc thêm sinh viên thành phố vào hãng là 'mở rộng', nhưng ví dụ và Q2 why.d gọi là 'giữ lõi, đổi cách nói'; hai mức bị nhầm |
| tp01-07 | Thương hiệu nhỏ nên đứng ở đâu khi gã khổng lồ chiếm c… | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 example] Bỏ qua chi phí thật: hàng hạn 7 ngày gây hao hụt, trả hàng, siêu thị ngại nhận (chính Q4 why.c thừa nhận) |
| tp01-08 | Quảng cáo nói 'phục vụ tận tâm' nhưng khách phải chờ l… | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | I | P3 | [P2 title vs situation] Tiêu đề nói 'phục vụ tận tâm' nhưng tình huống và quiz xoay quanh lời hứa '5 phút' |
| tp01-09 | Làm sao biết khách có hiểu định vị của bạn như bạn ngh… | 7 | 6 | 7 | 7 | 5 | 6 | 7 | 6 | **6.4** | L4→L5 | I | P2 | [P2 example] Chỉ hỏi khách đã mua; định vị cần đo trong nhóm mục tiêu, kể cả người chưa mua. Mẫu 200 chưa nói nhiễu: 23% -> 35% có sai số ~+-6 điểm; việc 'đếm đúng' cũng… |
| tp02-01 | Khách nghĩ đến ngành hàng của bạn vào những lúc nào? | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L2→L3 | I | P2 | [P2 Q7] 'để làm gì' không nằm trong năm câu hỏi của bài; đáp án trộn thêm một trục mới |
| tp02-02 | Có 14 cửa vào, nên chiếm cửa vào nào trước? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L4→L5 | I | P2 | [P2 concept/Q4] Nhân điểm thang thứ tự 1-5 tạo ra độ chính xác giả (10 vs 64) và Q7 tự thừa nhận 'sai số'; bài chưa nói rõ đây chỉ là công cụ xếp hạng thô |
| tp02-03 | Cửa vào lớn nhưng đông đối thủ, hay cửa vào nhỏ còn bỏ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L5 | I | P3 | [P2 concept] Khẳng định như quy tắc, trái với bằng chứng Ehrenberg-Bass rằng tăng trưởng đến từ độ phủ rộng; bài không nêu điều kiện/giới hạn |
| tp02-04 | Làm sao để quảng cáo gắn tên thương hiệu vào đúng một … | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | Ba nguyên tắc 'tình huống rõ + thương hiệu sớm + lặp' không nói tại sao thương hiệu mới cần logo sớm mà thương hiệu đã nổi thì khác, và không có phần distinctive assets:… |
| tp02-05 | Mùa Tết và mùa thi: có nên chạy theo cửa vào theo mùa? | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.8** | L4→L5 | I | P2 | [P2 example/Q3] Gán toàn bộ mức tăng cho chiến dịch; không có baseline mùa vụ, không trừ giá vốn. 0,75 đồng doanh thu/đồng chi còn xa mới hoà vốn |
| tp02-06 | Đo thế nào để biết thương hiệu đã gắn được với cửa vào? | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L5 | K | P3 | [P2 concept] Mơ hồ: danh sách có sẵn hay câu hỏi mở? Hai cách cho kết quả rất khác (gợi nhớ vs tự nhớ), mâu thuẫn một phần với Q5 'không gợi tên' |
| tp02-07 | Muốn tăng trưởng, nên mở thêm cửa vào nào? | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L4→L5 | I | P2 | [P2 example] Giả định rất tham vọng, không có căn cứ; toàn bộ 20% mục tiêu dựa vào một con số bịa |
| tp02-08 | Thương hiệu B2B thì cửa vào ngành hàng trông ra sao? | 7 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **6.0** | L3→L4 | I | P2 | [P2 example/Q6] 80 cuộc gọi chỉ gồm khách đã chọn gọi bạn: thiên lệch sống sót, bỏ sót sự kiện của khách không tìm tới |
| tp02-09 | Quảng cáo chỉ nói lợi ích, không nói tình huống — sai … | 7 | 4 | 7 | 6 | 4 | 5 | 5 | 5 | **5.4** | L2→L3 | M | P2 | Ý chính trùng gần 100% với tp02-04 (câu chốt có tình huống + tên) và Mistakes của tp02-01. 'Lợi ích cần một tình huống' là điều học viên đã biết từ bài trước; bài không … |
| tp03-01 | Tên mô tả, tên gợi hình hay tên tự đặt: chọn loại nào … | 6 | 5 | 7 | 7 | 6 | 6 | 6 | 7 | **6.3** | L3→L4 | I | P2 | [P2 concept] Vinamilk = Vina + milk, thực chất mô tả/địa danh; không phải tên tự đặt rỗng nghĩa như Bunza |
| tp03-02 | Tên đã chọn xong — kiểm tra gì trước khi in biển và là… | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L3→L4 | I | P2 | [P2 Q4/Q6 why] Lời nhắc nội bộ khi soạn đề lọt vào lời giải; học viên không biết quy định thật là gì |
| tp03-03 | Tên tiếng Anh hay tiếng Việt cho một thương hiệu Việt? | 6 | 5 | 7 | 6 | 5 | 6 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 example] 'Bà Sáu' cực phổ biến, trái với tp03-02 (trùng nhãn hiệu, tìm kiếm); bài tự mâu thuẫn mà không nói |
| tp03-04 | Slogan này là một lời hứa hay chỉ là một câu cho vui? | 6 | 5 | 7 | 7 | 6 | 6 | 6 | 6 | **6.1** | L4→L4 | I | P2 | [P2 Q4] Nguyên nhân Vietjet thành công không chứng minh được bằng slogan; sức mạnh đến từ giá vé và khuyến mãi |
| tp03-05 | Slogan này đối thủ dán vào có đúng không? | 7 | 5 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L4→L5 | I | P3 | Phép thử hay nhưng chỉ kiểm tính 'riêng', Q7 mới nhắc thêm tiêu chí 'khách quan tâm'; thiếu cách xử lý khi điều cụ thể đối thủ sao chép được. |
| tp03-06 | Lời hứa 'giao trong 30 phút' — vận hành có giữ được kh… | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | K | P3 | Thiếu chi phí của lời hứa 'trễ tặng nước' (17% đơn x giá nước); Mistake thứ hai (tính trên giờ thấp điểm) không được kiểm trong quiz. |
| tp03-07 | Sếp mới muốn đổi slogan — khi nào đổi mới là đúng? | 7 | 5 | 7 | 6 | 6 | 5 | 6 | 6 | **6.0** | L4→L5 | I | P3 | Khá một chiều: ba lý do hợp lệ để đổi được liệt kê nhưng không nêu cách đo 'còn đáng giá' ngoài 'khách nhắc đúng'. Ví dụ không có case thật như Nike hay McDonald's. |
| tp03-08 | Sản phẩm con mới nên mang tên mẹ hay có tên riêng? | 7 | 5 | 7 | 7 | 6 | 5 | 6 | 6 | **6.1** | L4→L4 | I | P3 | Ba mô hình được mô tả đúng nhưng chỉ có Vinamilk làm ví dụ thật; thiếu P&G, Unilever, Toyota/Lexus và mô hình lai. Không nêu tiêu chí định lượng. |
| tp03-09 | Đặt tên cho chiến dịch sao cho khách nhắc được và nối … | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L5 | K | P3 | Không gọi tên khái niệm distinctive brand assets (Sharp/Romaniuk) và cũng không bàn độ khó giữ tên qua năm khi khuyến mãi đổi. |
| tp04-01 | Thương hiệu của bạn đang có những tài sản nhận diện nà… | 8 | 5 | 8 | 6 | 5 | 6 | 5 | 6 | **6.1** | L2→L3 | I | P2 | [P2 Q1] Hỏi dự đoán hành vi tập thể; đáp án ‘logo’ lộ ngay vì cả bài nói logo, không kiểm năng lực |
| tp04-02 | Làm sao biết tài sản nào đáng đầu tư? | 6 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L3→L4 | I | P0 | [P0 Q7] Theo định nghĩa của bài, nổi tiếng = đúng/tổng; riêng = đúng/số người gắn với một hãng nào đó. Riêng 40% kéo theo 55%/0,40 = 137,5% người gắn với một hãng, vượt … |
| tp04-03 | Màu đỏ ai cũng dùng thì có còn là tài sản của bạn? | 8 | 6 | 8 | 6 | 7 | 6 | 6 | 6 | **6.6** | L3→L4 | K | NONE | [P2 SITUATION] ‘Số còn lại’ gồm cả người không nhận ra; mô tả mơ hồ về mẫu số 78% hay 100% |
| tp04-04 | Video ngắn của bạn có một âm thanh riêng chưa? | 7 | 6 | 8 | 7 | 7 | 6 | 6 | 7 | **6.8** | L3→L4 | K | P3 | [P2 SITUATION] Khẳng định hành vi theo nền tảng, không nguồn; trên nhiều nền tảng (Facebook/Instagram) phần lớn xem tắt tiếng |
| tp04-05 | Có nên tạo linh vật cho thương hiệu? | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 Q5/EXAMPLE] Bỏ qua chi phí sản xuất hoạt hình, bản quyền, giọng, cập nhật; 2 đồng/lần thấy chỉ là chi phí thiết kế, không phải tổng |
| tp04-06 | Tài sản xuất hiện ở bao nhiêu điểm chạm thì đủ? | 6 | 5 | 7 | 7 | 4 | 5 | 5 | 6 | **5.6** | L3→L4 | I | P2 | [P2 TITLE/CONCEPT] Tiêu đề hỏi ‘bao nhiêu thì đủ’ nhưng bài chỉ trả lời ‘mọi nơi’, không có tiêu chí ưu tiên theo mức tiếp xúc |
| tp04-07 | Đối thủ bắt chước tài sản của bạn, làm gì bây giờ? | 6 | 6 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P1 | [P1 EXAMPLE/Q4] Coi một chi tiết hình dạng là ‘khó sao chép’ trong khi đối thủ đã sao chép màu và nón lá; why.a của chính Q4 nói đối thủ dễ chỉnh theo |
| tp05-01 | Thương hiệu của bạn cho phép bán đắt hơn bao nhiêu? | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | [P2 SITUATION/Q4] Bài dạy ‘so với sản phẩm cùng chất lượng’ nhưng chính ví dụ chỉ khớp độ đạm; xuất xứ, cá cơm Phú Quốc, ủ chượp khác nhau là khác chất lượng, đúng lỗi Q… |
| tp05-02 | Chia ngân sách cho xây thương hiệu và chạy khuyến mãi … | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L3→L5 | I | P2 | [P2 EXAMPLE] Dẫn quy tắc 60/40 rồi chọn 50/50 không giải thích vì sao; tăng 35% lên 48% mua giá gốc sau 9 tháng là con số đẹp không có đối chứng và không gắn nhãn minh h… |
| tp05-03 | Hãng sữa nổi tiếng có nên mở thêm dòng cà phê? | 6 | 5 | 7 | 6 | 6 | 5 | 6 | 6 | **5.9** | L3→L5 | I | P2 | [P2 TITLE/EXAMPLE] Tiêu đề và tình huống nói ‘cà phê lon’, nhưng ví dụ chỉ khảo sát sữa chua uống và nước tăng lực; câu hỏi cà phê không được trả lời |
| tp05-04 | Hợp tác với thương hiệu khác: cộng hưởng hay tự làm mờ… | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L3→L5 | I | P2 | [P2 EXAMPLE/Q3] Chỉ tính doanh thu; không tính doanh thu tăng thêm (bao nhiêu hộp sẽ bán dù không hợp tác), chi phí hộp, biên lợi nhuận |
| tp05-05 | Một khủng hoảng lấy đi bao nhiêu năm tài sản thương hi… | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 7 | **5.9** | L3→L5 | I | P2 | [P2 TITLE] Tiêu đề hứa lượng hoá ‘bao nhiêu năm’ nhưng nội dung chỉ tính tuần doanh số mất, không đo tài sản |
| tp05-06 | Vì sao thương hiệu nhà tuyển dụng cũng là tài sản? | 6 | 5 | 7 | 6 | 4 | 5 | 5 | 6 | **5.5** | L3→L4 | I | P1 | [P1 Q6] Đáp án đúng là một giả thuyết; why.d chê ‘kết luận khi chưa hỏi người nghỉ là đoán’ nhưng c cũng đoán. Lương, quản lý, công việc đều có thể |
| tp05-07 | Làm sao biết thương hiệu đang khoẻ lên hay yếu đi? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L4 | K | P3 | [P2 EXAMPLE] Mẫu 250 có sai số khoảng ±5 điểm phần trăm; kết luận ‘premium 12% lên 14%’ nằm trong nhiễu nhưng được đọc là ‘tăng’ |
| tp05-08 | Nhà sáng lập nổi tiếng: tài sản hay rủi ro của thương … | 7 | 5 | 7 | 6 | 6 | 5 | 6 | 6 | **6.0** | L3→L5 | I | P2 | [P2 CONCEPT/EXAMPLE] Chưa nói ai sở hữu kênh/tài khoản livestream và người theo dõi; đây là rủi ro lớn nhất của phụ thuộc cá nhân |
| tp06-01 | Khách 'biết' thương hiệu của bạn — nhưng biết kiểu nào? | 8 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 concept] Gộp mental availability và salience với unprompted awareness; Romaniuk đo mental availability bằng CEP, không bằng một câu tự nêu tên |
| tp06-02 | Nói thật sâu với fan hay nói vừa đủ với rất nhiều ngườ… | 7 | 6 | 7 | 6 | 7 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 Q1] Phương án a và b gần như trùng ý, một phương án nhiễu thừa, làm câu hỏi dễ hơn |
| tp06-03 | Chạy một đợt thật lớn rồi nghỉ, hay nhắc đều suốt năm? | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.8** | L3→L4 | I | P1 | [P1 concept] Trình bày như kết luận chung trong khi bằng chứng về burst/pulsing/continuity còn tranh luận, và ngành mùa vụ (Tết) có lý do chạy dồn |
| tp06-04 | Có mặt trong danh sách thôi đã đủ, hay phải là cái tên… | 6 | 6 | 7 | 6 | 5 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P1 concept] Cho thứ tự nêu tên trong khảo sát là thứ tự chọn mua mà không có nguồn; top-of-mind đo trí nhớ, không đo lựa chọn |
| tp06-05 | Quảng cáo được nhớ, nhưng người xem có nhớ là của ai? | 7 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q4] Số liệu nền tảng đưa như thật, không nguồn |
| tp06-06 | Khách thích hãng đối thủ hơn — vậy vì sao họ vẫn mua c… | 6 | 6 | 7 | 6 | 7 | 6 | 6 | 6 | **6.3** | L4→L5 | I | P2 | [P2 concept] Gộp mental availability (bật ra trong đầu) và physical availability (dễ mua) vào một khái niệm; trong Sharp hai thứ này tách bạch |
| tp06-07 | Không có tiền thuê hãng nghiên cứu — đo độ được nhớ th… | 8 | 7 | 7 | 8 | 6 | 6 | 7 | 6 | **6.9** | L4→L4 | K | P3 | [P2 situation] Sếp hỏi sau khi chạy, nhưng ví dụ giả sử có mốc đo tháng 1; chưa nói nếu không có mốc trước thì làm gì |
| tp07-01 | Tiêu đề này có khiến ai đọc dòng thứ hai không? | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 7 | **6.3** | L3→L4 | K | P3 | [P2 Q2] Ngoài lời tự khen, 'số 1' còn có thể vi phạm quy định quảng cáo về từ tuyệt đối nếu không có chứng cứ; bài không nêu |
| tp07-02 | Khách mua pin 10.000 mAh hay mua 'điện thoại sống qua … | 7 | 6 | 7 | 8 | 5 | 6 | 7 | 7 | **6.6** | L3→L4 | K | NONE | [P2 example] Phụ thuộc vào điện thoại có hỗ trợ sạc nhanh 20W; bài dạy chuyển tính năng sang lợi ích nhưng không cảnh báo lời hứa phải đúng |
| tp07-03 | Viết cho 'quý khách hàng' hay viết cho chị Lan? | 6 | 5 | 7 | 6 | 4 | 6 | 6 | 6 | **5.8** | L3→L4 | I | P2 | [P1 concept] Dạy dựng người đọc tưởng tượng mà không yêu cầu dựa trên khách thật (inbox, phỏng vấn); dễ thành định kiến |
| tp07-04 | 'Liên hệ ngay' hay 'Nhắn chữ SIZE để được tư vấn trong… | 6 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 example] Kết quả được viết như thật nhưng không gắn nhãn minh hoạ, không có nhóm đối chứng; chỉ một lần thử |
| tp07-05 | Ba dòng đầu caption: khách có bấm 'xem thêm' không? | 6 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 Q6] Facebook thường không báo riêng lượt bấm 'xem thêm' cho người làm quảng cáo; người học không đo được như bài giả định |
| tp07-06 | Banner 300×250 có chỗ cho bao nhiêu chữ? | 5 | 5 | 6 | 6 | 4 | 5 | 5 | 6 | **5.3** | L2→L4 | I | P1 | [P1 Q5] Đáp án lẫn: nói 'trang đích' nhưng 'cạnh lời hứa trên banner'; phương án a (chữ nhỏ dưới banner) cũng có thể coi là đúng và là thông lệ minh bạch, khuyến mại thư… |
| tp07-07 | Câu 42 chữ này còn lại bao nhiêu nếu bỏ chữ thừa? | 7 | 4 | 7 | 6 | 4 | 5 | 5 | 5 | **5.4** | L2→L3 | M | P2 | [P2 Q3] 'An toàn cho làn da' vẫn là tuyên bố rỗng/khó kiểm và có thể gây rủi ro pháp lý với mỹ phẩm; đáp án đúng mà vẫn mơ hồ |
| tp07-08 | Mô tả sản phẩm trên sàn: khách đọc gì trước khi thêm v… | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 concept] Giả định khách đọc mô tả; trên sàn nhiều người quyết định từ ảnh, giá, đánh giá trước; bài trả lời đầy đủ phần chữ nhưng không nói thứ tự ưu tiên |
| tp07-09 | Trước khi bấm chạy: thay tên đối thủ vào, quảng cáo cò… | 6 | 5 | 6 | 7 | 6 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 Q5] Đáp án có điều kiện nên gần như tautology, và lời giải a lại nói câu 'sẽ đạt' làm hai lời giải không khớp |
| tp08-01 | Sếp nói 'chiến dịch cần một big idea' — khẩu hiệu mới … | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L2→L3 | I | P2 | Chỉ dạy nhận ra, chưa dạy tạo: 'Tìm ý tưởng trước, viết câu sau' mà không nói tìm bằng cách nào (insight, tension). |
| tp08-02 | Ngồi họp cả buổi không ra ý tưởng — nên bắt đầu từ đâu? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 example] 'Mẹ bỉm' là mẹ có con nhỏ; con đi học là tệp khác, nhãn nhân khẩu lệch |
| tp08-03 | Ý tưởng này chạy được một quý hay ba năm? | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 situation] Đổi ý tưởng truyền thông không đồng nghĩa phải làm lại bộ nhận diện; gộp hai khái niệm khiến phép tính tiết kiệm 800 triệu thiếu chặt |
| tp08-04 | Ý tưởng nghe 'đã' — nhưng có gắn tên hãng, đúng chiến … | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L4 | I | P2 | [P2 concept/quiz] Bài cộng điểm tổng (5/15, 14/15) nhưng Q7 lại dạy 'cộng điểm che mất câu trượt nặng' mà concept không nêu ngưỡng loại trừ |
| tp08-05 | Quảng cáo được cả mạng khen — sao khách không nhớ là c… | 7 | 5 | 7 | 6 | 6 | 5 | 6 | 6 | **6.0** | L3→L4 | M | P2 | [P2 example] Kết luận 75% gán nhầm cho hãng khác, nhưng 150 người còn lại có thể chỉ không nhớ hãng nào |
| tp08-06 | Có nên làm quảng cáo hài cho một sản phẩm chăm sóc sức… | 7 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.1** | L4→L4 | I | P2 | [P2 example] Tình huống ban đầu không có cảnh kính dày; ví dụ đưa vào để sửa nên không thật sự chấm đề xuất ban đầu, ví dụ không có căng thẳng |
| tp08-07 | Trend đang nổ — nhảy vào ngay hay đứng ngoài? | 6 | 5 | 7 | 7 | 6 | 5 | 6 | 7 | **6.1** | L3→L4 | I | P2 | [P2 Q3/concept] Con số 72 giờ đưa như thông lệ nhưng không có nguồn, trend khác nhau rất nhiều; ví dụ nói 'bài lên sau 6 tiếng' không khớp 20 giờ trong calc |
| tp08-08 | Agency trình ba ý tưởng — chọn thế nào cho khỏi theo c… | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | K | P3 | [P2 concept] Cộng 4 tiêu chí cùng trọng số, nhưng Q7 dạy 'đúng brief là điều kiện cần' mà concept không nói; trùng gần như hoàn toàn khung tp08-04 |
| tp08-09 | Sếp nói 'tôi không thích' — bảo vệ ý tưởng thế nào? | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 7 | **6.6** | L4→L5 | K | P3 | [P1 Q7] Phương án b cũng là cách rất đúng để dễ bảo vệ ý tưởng trước buổi trình bày; lời giải tự nhận 'là tốt' nhưng đáp án d vẫn được chấm đúng duy nhất, mơ hồ |
| tp09-01 | Kịch bản 60 giây của bạn có phải là một câu chuyện khô… | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 7 | **6.1** | L3→L4 | I | P2 | [P2 Q1 why.b] Khẳng định thần kinh học không nguồn, như sự thật |
| tp09-02 | Ai là nhân vật chính: khách hàng hay thương hiệu? | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 7 | **6.3** | L3→L4 | I | P2 | [P2 example/Q1] So 1 tập thử với 3 tập khác rồi kết luận nhân quả (khách là người hùng) mà không kiểm soát chủ đề, thời điểm, chi phí; 140 tin nhắn ghi là 'chuyển đổi' |
| tp09-03 | Chuyện người sáng lập: khi nào nên kể, khi nào nên cất? | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | I | P3 | [P2 Q6] Calc đúng (200 nghìn) nhưng không có mốc so sánh nên không dẫn tới quyết định; CPM 200k cao hơn nhiều mặt bằng thường gặp, người học không biết có đắt không |
| tp09-04 | Cảm xúc thật hay 'lấy nước mắt'? | 6 | 6 | 7 | 6 | 6 | 5 | 5 | 7 | **6.0** | L3→L4 | I | P2 | [P2 Q4] Đáp án đúng trùng nguyên văn chi tiết trong example nên Q4 kiểm nhớ chứ không kiểm khả năng nhận chi tiết thật |
| tp09-05 | Chi tiết nào làm câu chuyện đáng tin? | 5 | 5 | 7 | 7 | 4 | 5 | 6 | 7 | **5.8** | L3→L4 | I | P1 | [P1 example/Q4] Giày chạy bộ thường 500-800 km là hết vòng đời; 1.100 km trên một đôi lại là dấu hiệu quá cũ, suy luận 'độ bền' này không chắc; bài cũng không nói là một… |
| tp09-06 | Kể một câu chuyện trong 15 giây được không? | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 7 | **6.1** | L3→L4 | I | P2 | [P2 Q3 why.a] Mâu thuẫn mềm với tp08-05 và tp09-09 (dấu hiệu nhận diện nên xuất hiện sớm) |
| tp09-07 | Câu chuyện khách hàng thật (UGC) dùng thế nào cho đúng? | 6 | 5 | 7 | 7 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 example] Giải thích nhân quả cho chênh 37% chi phí mà không có bằng chứng; A và B còn khác tập video, chủ thể |
| tp09-08 | Quảng cáo Tết kể chuyện gia đình mà không sáo, làm sao? | 6 | 5 | 7 | 7 | 5 | 5 | 6 | 7 | **6.0** | L3→L4 | I | P2 | [P2 Q1 why.d] Khẳng định số đông không có nguồn, giống chính kiểu khái quát bị phê |
| tp09-09 | Câu chuyện hay nhưng không ai nhớ sản phẩm: sửa ở đâu? | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | I | P2 | [P2 example] Kết quả tự đặt, nhảy từ 8% lên 36% không có kiểm soát; nhãn minh hoạ thiếu |
| tp09-10 | Làm sao biết câu chuyện thương hiệu đang hiệu quả? | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L5 | K | P3 | [P2 Q3 wrong] Nhãn lỗi sai: 60 là quên trừ phần tăng ở nhóm đối chứng, không liên quan chi phí quảng cáo |
| tp10-01 | Người chưa biết mình có vấn đề thì cần nghe gì? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L3→L4 | K | P3 | [P2 situation] H13 theo EN 1822 là 99,95%; 99,97% (ở 0,3 micron) là chuẩn HEPA kiểu Mỹ. Trộn hai chuẩn. |
| tp10-02 | Người đang so sánh ba lựa chọn cần nghe gì? | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L4 | K | P3 | [P2 example] Gán toàn bộ mức tăng 25 -> 40 cho việc viết lại trang, bỏ qua mùa vụ, review mới, giá. |
| tp10-03 | Người sắp mua còn chần chừ vì nỗi lo gì? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q4] Suy luận sai: trả hàng bằng 0 thường là sản phẩm hợp, không phải cam kết yếu. |
| tp10-04 | Khách đã mua một lần cần nghe gì để quay lại? | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P3 | [P2 example] Nhảy 18% -> 28% quy hết cho chuỗi tin, không có nhóm đối chứng hay kiểm tra khác biệt do mùa vụ/khuyến mãi. |
| tp10-05 | Quảng cáo nhắc lại cho người đã xem thì nên nói gì? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q7] Lý lẽ ngược: giảm 40% -> 30% -> 20% dạy khách mua sớm hơn có lợi, không phải chờ. |
| tp10-06 | Quảng cáo hứa một đằng, trang đích nói một nẻo thì sao? | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Giấu giá khỏi trang đích có thể gây phản cảm hoặc khiến lead kém chất lượng; không bàn rủi ro minh bạch. |
| tp10-07 | Vì sao một câu cho mọi bước phễu lại nói không trúng a… | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L2→L4 | I | P2 | [P2 Q4] Phương án d gần như trùng b ('Đầu phễu, để thu hút...'): hai nhiễu cùng ý, làm quiz yếu và lộ đáp án (chỉ a khác). |
| tp10-08 | Email chào mừng đầu tiên nên nói điều gì? | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P3 | [P2 Q4] Nhiễu bịa ra một giới hạn không có thật; nhiễu yếu. |
| tp10-09 | Khách bỏ giỏ hàng thì nên nhắn gì? | 6 | 7 | 7 | 7 | 7 | 6 | 6 | 7 | **6.6** | L4→L4 | I | P1 | [P1 Q7] Suy luận không chặt: 40/150 dùng mã không có nghĩa 110 người còn lại quay lại trước khi nhận mã (có thể nhận mã rồi mua giá đầy đủ). Mâu thuẫn với lời cảnh báo c… |
| tp10-10 | Chia ngân sách thông điệp đầu phễu và cuối phễu thế nà… | 6 | 7 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L5 | I | P2 | [P2 concept/example] Bài trích Binet & Field (đúng) nhưng ví dụ chuyển sang 40% đầu phễu / 60% cuối phễu: ngược chiều con số trích dẫn, và 'đầu phễu' không đồng nghĩa 'x… |
| tp11-01 | Bán rẻ hơn đối thủ mà vẫn ế: khi nào giá thấp làm khác… | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 7 | **6.4** | L3→L4 | I | P2 | [P2 example] Giá và bằng chứng đổi cùng lúc nên không tách được; bài lại đưa kết luận cơ chế như đã chứng minh. |
| tp11-02 | Nên ghi 199.000đ hay 200.000đ cho chiếc váy của bạn? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L2→L4 | I | P1 | [P1 concept] Trình bày nghiên cứu hành vi (left-digit effect, Thomas & Morwitz 2005; round prices & feelings, Wadhwa & Zhang 2015) như quy tắc chắc chắn, không dẫn nguồn… |
| tp11-03 | Chi phí 40.000đ thì bán 60.000đ — hay bán theo giá trị… | 6 | 5 | 6 | 6 | 5 | 5 | 6 | 6 | **5.6** | L3→L5 | I | P1 | [P1 example] Phạm vi công việc tăng từ 8 lên 40 giờ; tăng giá một phần do khối lượng chứ không thuần 'theo giá trị'. Lẫn hai khái niệm. |
| tp11-04 | Phải tăng giá 10%: báo cho khách thế nào để họ không b… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 Q2] Đáp án đúng dài nhất và nhắc lại đủ bốn ý của bài, lộ đáp án. |
| tp11-05 | Gói tháng 149.000đ hay gói năm 1.190.000đ: nên đẩy gói… | 6 | 7 | 6 | 7 | 7 | 6 | 5 | 6 | **6.3** | L3→L5 | I | P1 | [P1 Q3] Bài tự cảnh báo 'giả định người chuyển giống người gói tháng trung bình' (chọn lọc), nhưng Q3 và Q1 vẫn dùng đúng giả định đó để cho đáp án +594 nghìn. Còn bỏ qu… |
| tp11-06 | Phí ship 25.000đ khiến khách bỏ giỏ: có nên freeship k… | 6 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **5.9** | L3→L4 | I | P2 | [P2 example] Kết luận chính 'đáng làm' dựa vào 'bỏ giỏ giảm' mà bài không cho con số nào (bỏ giỏ từ 40% xuống bao nhiêu). |
| tp11-07 | Trên sàn rẻ hơn cửa hàng 15%: khách và đại lý sẽ nghĩ … | 7 | 7 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L4→L5 | K | P3 | [P2 concept] Thiếu thuật ngữ cốt lõi để người học tra cứu (channel conflict, showrooming, MAP/MRP). |
| tp11-08 | Giá gạch ngang 590.000đ — khi nào nó là thật, khi nào … | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L4→L5 | I | P2 | [P2 concept] Chỉ nêu hậu quả uy tín; thiếu rủi ro pháp lý. Quy định khuyến mại ở Việt Nam (Luật Thương mại 2005, Nghị định 81/2018) giới hạn mức giảm tối đa và thời gian… |
| kn01-01 | Tiệm bánh của bạn đang sở hữu những kênh nào mà chưa t… | 7 | 5 | 7 | 7 | 5 | 6 | 5 | 7 | **6.1** | L3→L3 | I | P2 | [P2 example/Q1] Theo chính ví dụ, biển hiệu (~60.000 lượt/tháng) lớn hơn túi giấy (9.000), nhưng bài chọn túi giấy làm kênh 'lớn nhất'. Lượt hiển thị cũng bị nhầm với lư… |
| kn01-02 | Khách tự khen bạn trên mạng — kiểm soát được đến đâu? | 6 | 5 | 7 | 6 | 6 | 6 | 5 | 7 | **6.0** | L2→L3 | I | P2 | [P2 Q1] Khái quát hoá thành quy luật từ một case tự đặt (200 → 260), không có nguồn. |
| kn01-03 | Nên trả tiền để mua người xem mới, hay để đẩy cái đã c… | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.5** | L3→L4 | I | P1 | [P1 Q4/Q2] Chính phương án 'đẩy bài đã chứng minh' mà bài khuyên lại lỗ theo số của bài; Q2 chia 8 triệu cũng lỗ. Luận điểm 'đẩy cái đã thắng' bị phá bởi phép tính của c… |
| kn01-04 | Fanpage "miễn phí" thật ra tốn bao nhiêu? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 concept/Q7] Trộn giá thuê ngoài với chi phí cơ hội của chủ shop; Q7 so chi phí/đơn có tính công của fanpage với quảng cáo không tính công quản lý, và so chi phí trun… |
| kn01-05 | Trong một chiến dịch, mỗi loại media làm việc gì? | 7 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **6.0** | L3→L4 | M | P2 | [P2 example] Không giải thích vì sao 80% ngân sách cho paid, không có mục tiêu hay kết quả dự kiến; vai trò không gắn KPI. |
| kn01-06 | Shop nhỏ 5 triệu mỗi tháng nên chia tiền và giờ thế nà… | 6 | 5 | 7 | 6 | 5 | 6 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 Q7 wrong] 250 nghìn = 5 triệu/20 khách, tức gộp thêm 1 triệu in thẻ chứ không phải tính cả khách cũ; nhãn lỗi sai. |
| kn01-07 | Fanpage bị khoá sáng mai — bạn còn lại gì? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L3→L4 | I | P3 | [P2 Q7/example] Nhóm đặt cơm (Zalo) vẫn là 'đất thuê'; bài lại đưa như cách giảm phụ thuộc, mâu thuẫn với định nghĩa 'đất nhà' ở Q4. |
| kn01-08 | Làm sao biến người theo dõi thành danh sách của riêng … | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example] Tỉ lệ chuyển đổi trang đăng ký 50% cho SĐT là rất cao, nêu như thể thông thường. |
| kn01-09 | Mỗi loại media thật ra chạm tới bao nhiêu người? | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 5 | **6.0** | L3→L4 | I | P2 | [P2 example/Q7] Khảo sát chỉ trên người đã mua (thiên lệch sống sót), chọn một nguồn duy nhất nên cộng đúng 100%, bỏ qua đa chạm; 22% 'đi ngang' không chứng minh biển hi… |
| kn01-10 | Khi nào thì đáng tăng tiền quảng cáo? | 7 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.6** | L4→L4 | I | P2 | [P2 example] Bài chưa tính chi phí biên: 6→9 triệu thêm 3 triệu cho 50 đơn (60.000đ/đơn), 9→12 triệu thêm 3 triệu cho 30 đơn (100.000đ/đơn, vượt lãi gộp 80.000). Đây là … |
| kn02-01 | Có mặt ở 30% cửa hàng là nhiều hay ít? | 7 | 6 | 7 | 6 | 5 | 6 | 5 | 6 | **6.0** | L3→L4 | I | P2 | [P2 Q1] Câu 'đoán trước' có đáp án 'tuỳ' nên không kiểm tra điều gì; đúng nhưng không phân biệt được người hiểu và người đoán. |
| kn02-02 | Giá bán lẻ 20.000 đồng, hãng thực thu được bao nhiêu? | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 5 | **6.0** | L3→L3 | I | P2 | [P1 Q5] Không được dạy trong concept, và trái kn02-07 nơi đại lý 'mua vào 85.000'. Thực tế VN 'đại lý' thường cũng mua đứt. |
| kn02-03 | Mở thêm 500 điểm bán hay bán thêm ở 2.000 điểm cũ? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.5** | L3→L4 | I | P1 | [P1 concept/example] Bài nói 'đặt cạnh chi phí để chọn' nhưng không đưa chi phí nào; so hai phương án chỉ bằng số hộp. Lift +4 hộp/điểm bằng khuyến mãi cũng là tạm thời,… |
| kn02-04 | Kệ trống 3 ngày mỗi tháng thì mất bao nhiêu? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q3/concept] Tỉ lệ chuyển hãng 60% là số tự đặt nhưng Q6 b bác 'mức 60% thường gặp' như lỗi, tự mâu thuẫn; nghiên cứu out-of-stock cho thấy phần chuyển hãng thường th… |
| kn02-05 | Bán vào trường học, văn phòng hay bệnh viện? | 6 | 4 | 7 | 5 | 4 | 5 | 4 | 5 | **5.0** | L2→L4 | W | P1 | [P1 example/concept] Chỉ nhân ra số hộp; không có doanh thu, lãi, chi phí tủ lạnh, nhân sự châm hàng, thất thoát tự phục vụ, hay thời gian hoàn vốn. 'Kênh đặc biệt' được… |
| kn02-06 | Vào chuỗi 300 cửa hàng tiện lợi thì phải bán bao nhiêu… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 Q2 why.c] Lời giải chèn tính toán không liên quan tới phương án nào, dễ gây rối. |
| kn02-07 | Đại lý giận vì hãng bán online rẻ hơn, xử lý sao? | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.5** | L3→L4 | I | P2 | [P2 situation] Hãng nồi chiên nhưng case xoay quanh một bộ phụ kiện 99.000đ; đại lý điện gia dụng 'mua vào 85.000' khớp lạ, và mâu thuẫn định nghĩa đại lý ở kn02-02. |
| kn02-08 | Kênh nào thật sự mang lại lãi? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L4 | I | P3 | [P2 Q2/concept] Dùng lãi đóng góp trung bình để quyết định đầu tư thêm; bỏ qua lãi biên và trần công suất của tạp hoá; chưa phân biệt chi phí biến đổi và cố định trực ti… |
| kn03-01 | Mới bán online với 30 triệu: lên sàn nào trước? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] Dồn 100% vốn vào quảng cáo, không chừa tồn kho/vận hành, phi thực tế |
| kn03-02 | Đơn 200.000đ trên sàn, bạn thật sự lãi bao nhiêu? | 8 | 7 | 7 | 8 | 6 | 7 | 7 | 6 | **7.0** | L3→L3 | K | P3 | Chưa trừ quảng cáo, hoàn đơn, phí ship Freeship; "lãi đóng góp" vẫn cao hơn thực tế. Q7 gần như lặp giả định bài. |
| kn03-03 | Quảng cáo tìm kiếm trong sàn hay kéo khách từ Facebook… | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | [P2 example] Số tự đặt, kết luận "Facebook đắt hơn" có thể ngược nếu đo đơn gián tiếp |
| kn03-04 | Vì sao sản phẩm của bạn nằm trang 5 khi khách tìm kiếm? | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q5] Tiêu đề này thực ra gần chuẩn từ khoá; chỉ "đẹp rẻ hot trend" thừa. Đáp án c đúng nhưng ví dụ chưa đại diện lỗi |
| kn03-05 | Livestream bán hàng lần đầu: chuẩn bị gì để không nói … | 5 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.5** | L3→L4 | I | P1 | [P1 example] 25 người ở lại nhưng 30 đơn; 20% của 150 mới ra 30. Mâu thuẫn nội bộ |
| kn03-06 | Có đáng trả thêm phí để vào gian hàng chính hãng (Mall… | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L5 | K | P3 | [P2 concept] Bỏ qua phí cố định/ký quỹ/yêu cầu vận hành của Mall |
| kn03-07 | 100 đơn đặt, bao nhiêu đơn thật sự thành tiền? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 example] Lợi ích 40 đơn x 40.000đ = 1,6 triệu không được cộng vào tiết kiệm |
| kn03-08 | 5.000 khách đã mua trên sàn: họ là khách của bạn hay c… | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 5 | **6.1** | L3→L4 | I | P2 | [P2 concept] Gợi ý thu dữ liệu ngoài sàn mà tự mâu thuẫn quy định đã nhắc |
| kn03-09 | Giá trên sàn rẻ hơn đại lý: bạn đang tự đánh nhau với … | 6 | 7 | 7 | 7 | 7 | 7 | 7 | 6 | **6.8** | L4→L5 | I | P1 | [P1 concept] Quy định giá sàn/giá khuyến nghị với đại lý có thể vướng luật cạnh tranh Việt Nam; bài không cảnh báo (chỉ có trong Q5 why.d) |
| kn03-10 | Khi nào nên làm website bán hàng riêng? | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 6 | **6.9** | L4→L5 | K | P3 | [P2 Q1] Phí cổng thanh toán 3% là 11,25 triệu/tháng, chiếm 20% khoản "tiết kiệm" 56 triệu; không nhỏ |
| kn04-01 | Tiệm bánh nhỏ có cần có mặt trên cả sáu nền tảng? | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 Q4] Đáp án c bỏ qua website/blog và Google Search, phù hợp hơn khi khách "gõ tìm" báo cáo thuế |
| kn04-02 | Sáng nào cũng ngồi nghĩ hôm nay đăng gì? | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 example] Đề nói 30 bài/tháng, ví dụ lặng lẽ giảm còn 20 bài |
| kn04-03 | Bao nhiêu bài bán hàng thì khách bắt đầu bỏ theo dõi? | 7 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.1** | L3→L4 | K | P3 | [P2 situation] Quy cho tỉ lệ bán hàng, bỏ qua thay đổi thuật toán/mùa vụ |
| kn04-04 | Mười nghìn lượt thích, sao không ai nhắn mua? | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L4 | K | P3 | [P2 Q2] Nội dung pháp lý quan trọng nằm trong lời giải đáp án, không trong concept; minigame đề đã vi phạm |
| kn04-05 | Bài nào thắng khi bài tiếp cận cao lại ít người lưu? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 5 | **6.3** | L3→L4 | I | P2 | Chỉ chuẩn hoá theo tiếp cận; chưa bàn mẫu nhỏ, tệp khác nhau (A và B tới ai) và chất lượng click. |
| kn04-06 | Đăng mỗi ngày hay đăng ít mà chất? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.5** | L3→L4 | I | P2 | [P2 concept] Không định nghĩa ngưỡng chất lượng; dạy "đều" mà không có dữ liệu về thử nghiệm tần suất |
| kn04-07 | Một buổi quay có thể thành bao nhiêu bài? | 7 | 5 | 7 | 7 | 5 | 5 | 6 | 5 | **5.9** | L3→L4 | I | P2 | [P2 example/Q3] So sánh lệch: bỏ 10 giờ quay gốc; tính cả thì 16 so 27 giờ, tiết kiệm 11 giờ, mà đáp án sai Q3 lại liệt 11 là "SAI_TINH_TOAN" |
| kn04-08 | Có nên xoá bình luận chê trên fanpage? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L4 | K | P3 | Chưa phân biệt bình luận chê thật và chê giả (đối thủ, spam), chưa có quy trình leo thang khi liên quan sức khoẻ/pháp lý. |
| kn05-01 | KOL, KOC hay affiliate: rốt cuộc bạn đang trả tiền cho… | 7 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q2] Đáp án b là phương án duy nhất có trình tự và điều kiện nên bị lộ; a/c/d là rơm |
| kn05-02 | KOL 500 nghìn người theo dõi: bao nhiêu người thật sự … | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Dẫn nguồn có ngày tháng không kiểm chứng được ngay, giọng như đã tra cứu |
| kn05-03 | Video 40 triệu đắt hay rẻ: quy về giá mỗi nghìn lượt x… | 8 | 7 | 7 | 7 | 6 | 6 | 6 | 6 | **6.6** | L3→L4 | K | P3 | Ví dụ đảo chiều (CPM rẻ nhưng đơn đắt) rất tốt. Thiếu: lượt xem điển hình có thể bị thổi phồng, cửa sổ đo đơn, và chi phí cơ hội không đo được bằng mã. |
| kn05-04 | Brief cho KOL: để họ tự do đến đâu mà vẫn đúng thông đ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L3→L4 | I | P3 | [P2 Q2] Đáp án là bản sao của khái niệm, dài nhất, dễ chọn bằng cách khớp văn bản |
| kn05-05 | 100 triệu: một KOL lớn hay 25 KOC nhỏ? | 7 | 6 | 6 | 6 | 6 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 example] Câu vá ngân sách ngoài đề bài làm bài toán 100 triệu mất sạch; số liệu khó theo dõi |
| kn05-06 | Hoa hồng affiliate bao nhiêu phần trăm thì mỗi đơn vẫn… | 8 | 7 | 7 | 8 | 7 | 6 | 7 | 6 | **7.0** | L4→L4 | K | P3 | Khá chắc. Còn thiếu: hoàn/huỷ đơn (hoa hồng đã trả), thuế và phí nền tảng của affiliate, và chi phí cố định chưa được định lượng khi ‘không sát trần’. |
| kn05-07 | KOL bạn vừa ký dính lùm xùm: dừng ngay hay chờ gió lặn… | 7 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example] Ngầm cho rằng điều khoản đạo đức luôn cho phép không trả; thực tế phải đọc điều khoản, nghĩa vụ thanh toán đã thực hiện |
| kn05-08 | Có nên để KOL ghi rõ “hợp tác quảng cáo” không? | 6 | 5 | 6 | 6 | 6 | 5 | 5 | 6 | **5.6** | L2→L4 | I | P2 | [P1 example] Ngụ ý hãng đã thử giấu nhãn trước đó; mâu thuẫn với thông điệp bài và là dữ liệu không thể xác minh |
| kn05-09 | Làm sao biết đơn nào đến từ KOL nào? Dùng mã giảm giá … | 6 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example] Quyết định chỉ dựa trên CPA theo mã, trong khi bài cảnh báo mã là mức sàn và có thể rò rỉ; không so tỉ lệ bắt mã giữa các KOL |
| kn06-01 | Vì sao cùng một quảng cáo mà tuần này đắt gấp rưỡi tuầ… | 7 | 7 | 7 | 6 | 7 | 6 | 6 | 6 | **6.5** | L3→L4 | K | P3 | Chuỗi CPM→CPC→CPA rõ ràng và là xương sống tốt. Bài chưa nói rằng đấu giá hiện đại trả theo giá sàn thứ hai/giá trị tổng (bid × tỉ lệ hành động × chất lượng) và cơ chế k… |
| kn06-02 | Khách đang tìm “sửa máy lạnh quận 7” — nên chạy Google… | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.8** | L3→L4 | I | P1 | [P1 example] Không tính chi phí: 8 triệu/tháng mà chỉ khoảng 7 cuộc, CPA ngầm >1 triệu/cuộc; bài không so với doanh thu một ca sửa |
| kn06-03 | Muốn có đơn hàng, vì sao đừng chọn mục tiêu “Lưu lượng… | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Hai chiến dịch của hai shop khác nhau, so như thí nghiệm có đối chứng; quy kết nhân quả quá mức |
| kn06-04 | Nhắm “nữ 25–30, thích yoga, sống ở Quận 1” có phải là … | 6 | 6 | 7 | 6 | 6 | 5 | 6 | 5 | **5.9** | L3→L4 | I | P2 | [P2 situation vs example] Ví dụ tính trung bình 5 lần và CPM 100.000/40.000 = 2,5 lần; hai con số lệch tình huống |
| kn06-05 | Quảng cáo bám đuổi báo CPA rất rẻ — có thật là rẻ? | 7 | 7 | 7 | 6 | 7 | 6 | 7 | 6 | **6.6** | L4→L5 | I | P2 | [P2 example] So CPA tăng thêm của retargeting với CPA báo cáo của prospecting (cũng chứa đơn tự nhiên) và không đưa số prospecting; so sánh không đồng nhất |
| kn06-06 | Khi thuật toán tự tìm khách, thứ gì quyết định ai thấy… | 5 | 6 | 6 | 6 | 5 | 5 | 6 | 6 | **5.6** | L3→L4 | I | P1 | [P1 example] Tỉ lệ mua bằng nhau (2,5%) nên khác biệt CPA chỉ đến từ CTR; không có bằng chứng B ‘chọn đúng người’, có thể chỉ là hook hấp dẫn hơn |
| kn06-07 | Trình quản lý quảng cáo báo 80 đơn, sổ bán hàng chỉ có… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 situation] Mơ hồ: kế toán biết nguồn đơn bằng cách nào; mâu thuẫn với ‘sổ là nguồn sự thật về số đơn’ không phải về nguồn |
| kn06-08 | Vì sao chia 5 triệu ra 5 nhóm quảng cáo lại làm mọi nh… | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L3→L4 | I | P3 | [P3 Q2] Đưa lời khuyên cứng 1 nhóm; không nêu cách kiểm tệp/creative khi chỉ có 1 nhóm |
| kn06-09 | Báo cáo quảng cáo đầu tiên: đọc từ dòng nào? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 Q2] Đáp án chứa nguyên kết luận ‘mất 50%’ nên quá lộ; các đáp án khác là rơm |
| kn07-01 | Ngân sách năm sau nên là 5% doanh thu hay con số khác? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] Con số 6 lần không có căn cứ, người học dễ tưởng đó là chuẩn |
| kn07-02 | Chi nhiều hơn thị phần bao nhiêu thì đủ để lớn? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L3→L4 | I | P1 | [P1 Q7] Share of search được kiểm chứng như proxy của thị phần/nhu cầu, không phải của share of voice (chi tiêu); gán nhãn proxy cho SOV là lẫn khái niệm |
| kn07-03 | Kế hoạch có 20 triệu lượt hiển thị — vậy bao nhiêu ngư… | 7 | 6 | 7 | 7 | 5 | 6 | 7 | 6 | **6.4** | L3→L3 | I | P2 | [P2 example] Khẳng định ngưỡng tần suất hiệu dụng như sự thật mà không có căn cứ; lý thuyết effective frequency còn tranh cãi |
| kn07-04 | CPM rẻ nhất có phải kênh rẻ nhất không? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | I | P2 | [P2 concept] Tên gọi chuẩn là vCPM (viewable CPM); 'CPM hiệu dụng' dễ lẫn với eCPM; số 20%/75%/60% là giả định |
| kn07-05 | Chạy đều 12 tháng hay dồn vào vài đợt? | 6 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 situation] Ngân sách 12 tỉ nhưng phương án dồn đợt chỉ dùng 10 tỉ, 2 tỉ không giải thích; so sánh ba phương án không cùng tổng tiền |
| kn07-06 | Hãng nhỏ 2 tỉ đối đầu hãng lớn 50 tỉ thì chi vào đâu? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | K | P3 | [P2 example] Giả định hãng lớn không phản ứng và quảng cáo toàn quốc chia theo dân số; chiến trường hẹp cũng bị phản đòn, bài không nêu |
| kn07-07 | Tiền media đang rò rỉ ở đâu? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | I | P2 | [P2 Q1] Đề không nói 25% tính trên phần đúng nhóm; người đọc có thể hiểu cộng 43% và chọn a (57%) |
| kn07-08 | Sếp muốn cắt 30% ngân sách quảng cáo — bạn nói gì? | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 7 | **6.8** | L5→L5 | K | P3 | [P2 concept] Khẳng định không nguồn; bằng chứng về độ trễ tác động khá hỗn hợp |
| kn08-01 | Danh sách 20.000 số điện thoại, bao nhiêu số thật sự d… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L3 | K | P3 | [P2 Q3] Cộng thẳng ba nhóm giả định không chồng nhau; 'trùng' là khách thật bị lặp, không phải số bị mất |
| kn08-02 | Nên nhắn ai trước khi chỉ có ngân sách cho 1.000 tin? | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P1 example] Gửi cho nhóm vốn sẽ mua đều tối đa hoá tỉ lệ ra đơn nhưng ít đơn tăng thêm — mâu thuẫn với bài kn08-10; con số 3 lần là ra đơn, không phải tăng thêm |
| kn08-03 | Zalo OA, SMS hay email: kênh nào rẻ hơn cho mỗi đơn? | 6 | 6 | 6 | 7 | 6 | 6 | 7 | 6 | **6.3** | L4→L4 | I | P2 | [P2 example] Chú thích kiểu nhật ký kiểm chứng chen vào thân bài, làm vỡ mạch; đoạn phân bổ phí hai cách khiến người đọc không biết dùng số nào |
| kn08-04 | Nhắn mỗi ngày thì bán thêm hay bị chặn thêm? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | K | P3 | [P2 example] Tỉ lệ huỷ nhảy 5 lần và đơn mỗi tin giảm 4 lần là số đặt để khớp kết luận, không có quy luật hay nguồn |
| kn08-05 | Gọi tên khách trong tin là đủ cá nhân hoá chưa? | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.8** | L3→L4 | I | P2 | [P2 Q4] Đề không nói hệ thống gán giới tính; đáp án đúng bịa nguyên nhân; thêm nữa khách là phụ nữ nhận son môi chưa chắc sai |
| kn08-06 | Chương trình tích điểm đang giữ khách hay chỉ đang tặn… | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L5 | I | P2 | [P1 situation] Kế toán hỏi chi phí nhưng bài không tính chi phí chương trình (5% giá trị đổi + vận hành) so với lợi nhuận từ 0,6 lần ghé thêm |
| kn08-07 | Khách 6 tháng không quay lại: gọi dậy hay để yên? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L4 | K | P3 | [P2 example] Kết luận lãi không được tính trong example (giá, chi phí chỉ xuất hiện ở Q3 quiz); so 240 vs 300 khách không có số lãi |
| kn08-08 | Một khách, bốn hồ sơ: dữ liệu nằm rải rác thì làm sao? | 6 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 example/Q7] Ví dụ coi dữ liệu Shopee có số điện thoại để gộp, trong khi Q7 nói dữ liệu sàn khó gộp; thực tế sàn thường che số |
| kn08-09 | File khách hàng gửi qua Zalo cho cả nhóm: có vấn đề gì? | 6 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P1 | [P1 Q4] Theo phân loại pháp luật VN số căn cước thuộc dữ liệu cơ bản; gọi là nhạy cảm sai thuật ngữ trong bài về tuân thủ |
| kn08-10 | CRM mang về bao nhiêu tiền thật, hay chỉ ghi công cho … | 6 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L5→L5 | I | P1 | [P1 Q3] Doanh thu tăng thêm trừ chi phí gửi không phải lãi; thiếu giá vốn/biên gộp của đơn tăng thêm nên 42 triệu bị thổi phồng |
| kn09-01 | Câu chuyện của bạn có đáng thành tin không? | 7 | 5 | 8 | 6 | 5 | 5 | 5 | 6 | **5.9** | L3→L4 | I | P2 | [P2 Q4] Đáp án d quá lộ vì đã nằm sẵn trong MISTAKES; câu 'KHÔNG' dễ loại trừ |
| kn09-02 | Thông cáo báo chí nào được nhà báo đọc hết? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 Q6] Phương án nhiễu vô lý, không phải lỗi thật của người làm PR |
| kn09-03 | Chỉ gọi nhà báo khi cần đăng bài thì sao? | 7 | 5 | 7 | 6 | 6 | 5 | 5 | 6 | **5.9** | L3→L4 | I | P2 | [P2 Q7] Lời giải why.b bịa quy tắc, không thuyết phục |
| kn09-04 | Tài trợ giải chạy 500 triệu đổi lấy gì? | 6 | 6 | 7 | 6 | 6 | 5 | 5 | 6 | **5.9** | L3→L5 | I | P1 | [P1 example] Không có tiêu chuẩn đánh giá đắt/rẻ: chi phí/người dùng thử không so với giá sản phẩm, LTV hay chi phí kênh khác; kết luận trôi |
| kn09-05 | Đây là khủng hoảng loại gì? | 6 | 6 | 7 | 6 | 6 | 5 | 5 | 7 | **6.0** | L3→L4 | I | P1 | [P1 Q6] Nhãn sai độ đạm vừa là lời hứa với khách (dịch vụ/phát ngôn) vừa là chất lượng; hai đáp án b và d đều có thể bảo vệ được |
| kn09-06 | Giờ vàng đầu tiên: ai nói, nói gì? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L4→L4 | K | P3 | [P2 Q1] Khẳng định chung không nguồn nằm trong lời giải phương án sai |
| kn09-07 | Lời xin lỗi này có thật lòng không? | 7 | 6 | 7 | 6 | 6 | 6 | 5 | 7 | **6.3** | L3→L4 | K | P3 | [P2 Q2] Đáp án trùng nguyên văn câu mẫu trong example, đo trí nhớ không đo viết |
| kn09-08 | Khi nào im lặng là sai? | 6 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.0** | L4→L5 | I | P2 | [P2 concept] Không xử lý ca trộn: có bằng chứng nhưng không đụng an toàn và chưa lan; hoặc lan nhanh nhưng không bằng chứng |
| kn09-09 | Trả lời 3.000 bình luận giận dữ thế nào? | 7 | 6 | 7 | 7 | 5 | 6 | 5 | 6 | **6.1** | L3→L4 | I | P2 | [P2 concept] Khẳng định tuyệt đối, không nguồn; mâu thuẫn một phần với bài giờ vàng |
| kn09-10 | Khủng hoảng qua rồi, bạn học được gì? | 7 | 6 | 7 | 6 | 6 | 5 | 6 | 5 | **6.0** | L4→L5 | I | P2 | [P2 situation] Mâu thuẫn ngầm với kn09-05 (Hạt Vàng xử lý đúng) và bài giờ vàng (<vài giờ); nhưng số liệu không nối với cách xử lý đã nêu |
| kn10-01 | Năm kênh chạy năm câu chuyện — sao khách không nhớ gì? | 7 | 6 | 7 | 6 | 6 | 5 | 5 | 6 | **6.0** | L3→L4 | I | P2 | [P2 Q7] Tình huống không nói chia đều; calc 1.200÷5 là phép chia tầm thường, lời giải rút kết luận ('không cái nào đủ sức') ngoài phép tính |
| kn10-02 | Mỗi kênh trong chiến dịch nên giữ vai trò gì? | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | I | P2 | [P1 Q6] Đúng một phần: bỏ trống cách liên kết kênh làm biết với doanh thu, người học dễ coi 'kênh biết' là miễn kiểm chứng |
| kn10-03 | Chiến dịch Tết nên bắt đầu từ lúc nào? | 7 | 6 | 7 | 7 | 5 | 5 | 5 | 6 | **6.0** | L3→L4 | I | P2 | [P2 example] Không giải thích vì sao pha trước 25%, pha sau 15%: số tự đặt, người học dễ sao chép tỉ lệ |
| kn10-04 | Khách gặp thương hiệu theo thứ tự nào? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L3→L4 | I | P2 | [P1 example] So sánh không có mẫu số: không nói bao nhiêu người xem/chi bao nhiêu, nên 'gấp nhiều lần' không thể kiểm chứng; 0,3% đăng ký là tỉ lệ trên click không phải … |
| kn10-05 | Có 50 triệu thì kế hoạch khác 5 tỷ ở đâu? | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.8** | L3→L5 | I | P1 | [P1 concept] Nguyên lý cốt lõi nhưng không nêu ngưỡng hay cách ước (số chuyển đổi cần cho học thuật toán, tần suất hiệu quả) |
| kn10-06 | Một thông điệp, nhưng mỗi kênh một hình dạng? | 7 | 6 | 7 | 7 | 5 | 6 | 5 | 6 | **6.1** | L3→L4 | K | P3 | [P2 Q4] Tình huống bài chỉ có một sản phẩm (sữa chua); calc chỉ nhân số, không dạy ra quyết định sản xuất |
| kn10-07 | Bốn agency, ai giữ câu chuyện chung? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.6** | L3→L4 | I | P2 | [P2 Q4] Calc n(n-1)/2 là toán tổ hợp, không dạy kỹ năng marketing; lời giải tự nói 'một buổi duyệt chung gọn hơn' nên đáp số không thúc đẩy quyết định |
| kn10-08 | Đo từng kênh hay đo cả chiến dịch? | 5 | 5 | 7 | 6 | 6 | 6 | 6 | 6 | **5.9** | L4→L5 | I | P1 | [P1 example/Q2/Q3] Gọi toàn bộ đơn kho là 'đơn do chiến dịch' mà không trừ baseline (đơn vốn có) và hoàn/huỷ; chi phí mỗi đơn tính ra bị đánh giá thấp, đồng thời không c… |
| kn10-09 | Rà soát gì trước khi bấm chạy? | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P1 | [P1 Q1] Hai đáp án b và c đều bảo vệ được: link bio 404 chặn toàn bộ lượng vào từ TikTok, mã KOL chỉ chặn một nhóm; lời giải c 'có thể tìm hãng trên sàn' là suy đoán |
| kn10-10 | Một kênh hỏng giữa chừng thì làm gì? | 6 | 6 | 7 | 7 | 6 | 5 | 5 | 6 | **6.0** | L4→L5 | I | P2 | [P2 example/Q1] Nguyên tắc 'không dồn vào kênh chưa thử' nhưng ví dụ tăng từ 20 triệu lên 240 triệu (12 lần) vẫn là tăng đột ngột; Q1 lại giả định 'chưa từng chạy thử' |
| kn11-01 | Tắt quảng cáo Google là hết khách - có cách nào để khá… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L3 | K | P3 | [P2 Q7] Đáp án đúng là phương án dài nhất và rào đón nhiều ('có thể', 'nếu'), dễ đoán trúng bằng văn phong. |
| kn11-02 | Người gõ 'máy lọc nước loại nào tốt' có đang muốn mua … | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L4 | K | P3 | [P2 example] Khẳng định 'hợp lý' mà không có benchmark nào; 0,5% vs 1,5% chỉ là số tự đặt và không biết đơn có gán cho đúng trang hay không. |
| kn11-03 | Nhắm từ khoá 12.000 lượt tìm hay 900 lượt tìm - chọn c… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P1 | [P1 concept/example] Chỉ số nhấp kỳ vọng xếp 'máy lọc nước' (120) cao nhất, trái với kết luận chọn từ nhỏ khớp ý định; công thức không tự bảo vệ được kết luận vì thiếu t… |
| kn11-04 | Viết 120 bài na ná nhau hay 10 bài thật sự giúp người … | 7 | 5 | 7 | 6 | 7 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Không nói gộp bài làm sao (redirect 301, canonical) nên người học có thể xoá bài và mất URL đã có liên kết. |
| kn11-05 | Trang đẹp trên máy tính nhưng khách điện thoại bỏ đi -… | 7 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **6.0** | L2→L3 | I | P1 | [P1 concept] Bài gắn nhãn 'kỹ thuật cơ bản' nhưng bỏ hẳn kiểm tra lập chỉ mục (site:, URL Inspection), robots/noindex, HTTPS, Core Web Vitals; quán có thể sửa đủ sáu thứ… |
| kn11-06 | Khách tìm 'phở gần đây': vì sao quán bên kia đường hiệ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L3 | K | P3 | [P2 concept] Trình bày như việc 'làm được' để tăng hạng; tài liệu Google không nêu NAP nhất quán trên Facebook là yếu tố, chỉ yêu cầu thông tin chính xác. |
| kn11-07 | Vị trí trung bình tụt từ 8 xuống 15 - website đang tệ … | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L4 | K | P3 | [P2 Q5] Nhóm Organic Search của GA4 gồm cả Bing và công cụ khác, nên so với nhấp Search Console (chỉ Google) không hoàn toàn cùng phạm vi. |
| kn11-08 | Bỏ 12 triệu làm nội dung SEO - bao lâu hoàn vốn, và cá… | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | I | P2 | [P2 example/Q4] Giá trị thay thế quảng cáo (1,2 triệu) trùng đúng lãi gộp tháng (1,2 triệu); Q4 distractor a ('lợi nhuận ròng') số học không phân biệt được, dễ gây rối. |
| kn12-01 | Bài đăng nào phải dừng lại trước khi bấm 'Đăng'? | 6 | 5 | 7 | 6 | 6 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 concept] Số hiệu và hiệu lực văn bản năm 2025-2026 tôi không xác minh được; học viên có thể trích sai nếu văn bản đổi. |
| kn12-02 | 'Kem chống nắng số 1 Việt Nam' - bằng chứng nằm ở đâu? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L4→L4 | K | P3 | [P2 concept] Không nói thế nào là 'tài liệu hợp pháp' (khảo sát độc lập, kiểm nghiệm phòng lab được công nhận); người học không biết chuẩn bị gì. |
| kn12-03 | Viên uống 'đẹp da' lên sóng thứ Hai - đã có giấy xác n… | 6 | 6 | 6 | 6 | 5 | 6 | 5 | 5 | **5.6** | L3→L4 | I | P1 | [P1 Q1] Stem hỏi 'mấy chỗ có thể vướng'; c là đúng một phần, d dùng 'Từ ba chỗ' mơ hồ; có thể bị tranh cãi hai đáp án. |
| kn12-04 | Mua 1 tặng 1 hay phiếu cào trúng xe máy - cái nào cần … | 6 | 5 | 6 | 6 | 6 | 6 | 5 | 5 | **5.6** | L3→L4 | I | P1 | [P1 concept] Tôi không xác minh được văn bản; bài dựa vào tóm tắt bên thứ ba. Nếu sai, nhiều câu (Q1 why.b, Q2) sai; trong khi nguồn thông dụng vẫn nói hạn mức 50%. |
| kn12-05 | KOC nói 'trị dứt mụn' trong video được trả tiền - ai c… | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L4→L4 | K | P2 | [P2 Q2] Lỗi thứ ba của tình huống là KOC chưa dùng sản phẩm, không phải 'không có hồ sơ'; bốn việc (brief, nháp, nhãn, hồ sơ) không chặn được lỗi chưa dùng thử. |
| kn12-06 | 12.000 số điện thoại trong file Excel - được gửi tin c… | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L4→L4 | K | P2 | [P2 Q6] Stem hỏi 'Điểm yếu?' nhưng d là hành động, không phải câu trả lời; lộ là nhiễu. |
| kn12-07 | Gắn pixel lên web là xong - hay còn phải báo và xin đồ… | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 5 | **5.4** | L3→L4 | I | P2 | [P1 concept] Khung pháp lý then chốt của bài được bỏ trống, bài quay về điều khoản nền tảng. |
| kn12-08 | Đội 4 người, không có pháp chế riêng - quy trình duyệt… | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L4→L5 | K | P2 | [P2 concept] Chưa xác minh được thời hạn 24 giờ; 'checklist 5 câu' lại không được liệt kê trong bài. |
| kn13-01 | Cùng một video đăng ba nền tảng: người xem đến từ cửa … | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L2→L4 | I | P2 | [P2 Q4] Đáp án đúng lặp lại gần nguyên văn ví dụ trong bài và là phương án duy nhất hợp lý, nên học thuộc là đủ |
| kn13-02 | Đường cong giữ chân: người xem rơi ở giây nào? | 7 | 6 | 7 | 7 | 6 | 6 | 5 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Kết luận nhân quả từ một bản dựng lại, không có đối chứng; 78% ở giây 3 có thể do ngẫu nhiên hoặc nguồn người xem khác |
| kn13-03 | Ảnh bìa hứa gì, video giữ được gì? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P3 | Không nói bản A/B được chia ngẫu nhiên thế nào trong thực tế (YouTube có công cụ thử ảnh bìa); không bàn thêm tác động dài hạn 'mất tin vào kênh' dù có nêu trong concept. |
| kn13-04 | Lịch nội dung 30 ngày: lập từ mục tiêu hay từ ý tưởng? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.6** | L3→L5 | I | P1 | [P1 example] Mục tiêu 30 đơn nhưng 30 bài chia 12-9-9 không có phép nối từ bài đến đơn (cần bao nhiêu lượt xem, tỉ lệ nhắn, tỉ lệ chốt), nên 'lịch từ mục tiêu' chỉ là ch… |
| kn13-05 | Reach tuần này giảm 40%: kiểm theo thứ tự nào? | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L4 | K | P3 | [P2 example] Reach là số người duy nhất, không cộng được theo ngày; chia tổng 7 ngày cho 7 là xấp xỉ, có thể nhầm khi hai kỳ có độ chồng người xem khác nhau |
| kn13-06 | 300 bình luận một tuần: trả lời ai trước? | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 5 | **5.6** | L3→L4 | I | P2 | [P2 concept] Quá tuyệt đối: bình luận chứa thông tin cá nhân, lời kêu gọi vi phạm, thông tin sai gây hại cũng cần xử lý theo chính sách; quy tắc nên đi kèm tiêu chí công… |
| kn13-07 | Báo cáo mạng xã hội cho quản lý: bạn mở đầu bằng gì? | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.8** | L3→L5 | I | P2 | [P2 example] Không nói cách ghi nhận đơn từ video (last-click, mã, hỏi lúc đặt); quản lý khó tin 18/41 nếu không có cách đo |
| kn14-01 | Ảnh cùng bó hoa trên Feed, Stories và Reels: ba bề mặt… | 7 | 6 | 7 | 6 | 6 | 5 | 4 | 6 | **5.9** | L2→L4 | I | P0 | [P0 Q2] Phương án đúng bị cụt giữa câu, không tự đứng được; why.b nói 'Mỗi bề mặt gán một việc rõ' nhưng nội dung phương án thiếu hẳn nửa sau |
| kn14-02 | Reels: xem hết, chia sẻ lại, thích, vào trang âm thanh… | 6 | 6 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P1 | [P1 example] So Reels 55 giây về menu với Reels 18 giây về mẹo: khác độ dài, chủ đề, mục đích; nên không kết luận được độ dài là nguyên nhân. Tỉ lệ xem hết thấp hơn ở vi… |
| kn14-03 | Bài để lưu lại: đo lượt lưu trên reach, không đo trái … | 7 | 6 | 7 | 7 | 6 | 5 | 5 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example] Hai bài khác định dạng (ảnh đơn vs carousel 6 ảnh) và chủ đề; carousel tự nó có lưu cao hơn, nên '20 lần' chưa thể quy cho 'giá trị thực dụng' |
| kn14-04 | Stories: người xem chạm vào, trả lời hay lướt sang — b… | 6 | 5 | 7 | 6 | 4 | 5 | 5 | 6 | **5.5** | L3→L4 | I | P1 | [P1 example] Đổi cùng lúc số khung, thêm khung hỏi, thêm nút nhắn tin, rồi quy cải thiện (6→58 trả lời) cho cả gói; trái với Q6 dạy đổi một biến |
| kn14-05 | Trang cá nhân là trang đích: khách ghé vào thấy gì tro… | 7 | 5 | 7 | 7 | 4 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P1 example] Sửa bốn thứ cùng lúc rồi quy 4%→9% cho cả gói, không có đối chứng; thiếu cảnh báo về nhiễu (Reels khác, mùa) |
| kn15-01 | CTR tụt từ 9% xuống 3,5% khi video đến người lạ | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P3 | [P2 example] Số liệu minh hoạ tự đặt nhưng không ghi ILLUSTRATIVE; 'impressions x CTR' chỉ là lượt xem từ hình thu nhỏ, không phải tổng lượt xem |
| kn15-02 | Cùng một video, CTR tìm kiếm cao còn CTR trang chủ thấ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 mistakes/Q5] Nói quá: hình thu nhỏ vẫn ảnh hưởng CTR ở kết quả tìm kiếm; why.b của Q5 'hình thu nhỏ quan trọng hơn ở trang chủ' không có nguồn |
| kn15-03 | Thời lượng xem trung bình 3 phút: tốt hay xấu, còn tuỳ… | 7 | 5 | 7 | 7 | 4 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P1 | [P1 concept/example] Phần trăm giữ chân cũng giảm tự nhiên khi video dài ra; 58% của video 4 phút và 30% của video 15 phút không so thẳng được. 30% cho video 15 phút có … |
| kn15-04 | Mở tab Tiếp cận trong YouTube Studio: bốn câu hỏi cần … | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L4→L4 | I | P2 | [P2 situation/example] Số liệu ví dụ ngầm cho lượt xem từ thumbnail giảm 8.200 -> 4.800 (khoảng 41%), mâu thuẫn với 'lượt xem giảm 30%' ở tình huống |
| kn15-05 | Video dài hay video ngắn dọc: chọn theo việc và đo từn… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L4 | I | P2 | [P2 example] Bảng so sánh thiếu số nhấp sang trang sản phẩm của video ngắn nên kết luận 'video dài mới tạo hành động' chưa đủ chứng cứ; mặt khác cách tính lượt xem của S… |
| kn16-01 | Bảng đề xuất của TikTok đọc những gì và bạn kiểm soát … | 8 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **6.0** | L2→L3 | I | P1 | [P2 example/Q3] Chia 12 video thành hai nhóm rồi so được trình bày như bằng chứng; nhóm nhỏ, không kiểm soát chủ đề/giờ/độ dài, nên chỉ là tương quan. Q7 lại dạy A/B đổi… |
| kn16-02 | Xem hết một video dài là tín hiệu mạnh: độ dài phải đú… | 8 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.6** | L4→L4 | K | P3 | [P2 example] Kết quả cắt video được nêu như đã xảy ra nhưng không có cơ sở, và so với video A 45 giây khác thực thi nên không chứng minh 'ngắn hơn là tốt hơn' |
| kn16-03 | Tài khoản nhỏ có được đề xuất không? Số người theo dõi… | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | [P2 example] Một video nổi bật trong 18 video được coi như tín hiệu lặp lại được; thiếu cảnh báo cỡ mẫu và hồi quy về trung bình. Bài cũng bỏ qua rằng follower vẫn ảnh h… |
| kn16-04 | Đăng cùng một âm thanh, cùng một kiểu mỗi ngày: vì sao… | 7 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P1 | [P1 Q5 why.a] Mô tả của TikTok nói tránh cho người xem thấy lại nội dung đã xem/trùng; không nói đăng lại video cũ của chính mình bị loại. Giải thích đáp án vượt quá ngu… |
| kn16-05 | Spark Ads: biến video tự nhiên đã giữ được người xem t… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L4 | I | P2 | [P1 example/concept] So Spark Ads (36 đơn) với video studio (25 đơn) làm lẫn tác động của định dạng với tác động của nội dung; chênh lệch 36 so với 25 đơn là cỡ mẫu nhỏ,… |
| tn01-01 | Chiến dịch 800 triệu hay bản thử 30 triệu trước? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L3 | I | P2 | [P2 example] Không có ngưỡng/benchmark nên 9% và 22% 'đủ' hay không là không biết; mâu thuẫn tinh thần bài tn01-06 (tiêu chí đặt trước) |
| tn01-02 | Tung toàn quốc hay thử ở một tỉnh trước? | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | [P2 concept] Chỉ dùng mốc 10.000 chai trước đó; chưa nhắc so sánh xu hướng trước khi thử (pre-trend) để biết hai vùng đi song song |
| tn01-03 | Chưa có sản phẩm, làm sao biết có ai muốn mua? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] Không có chuẩn so sánh hay tiêu chí; 5% đăng ký (chưa trả tiền) khó nói 'đáng kể' |
| tn01-04 | Khách nói 'sẽ mua' hay khách đặt cọc? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L3→L4 | I | P2 | [P2 Q4] Số 27/180 cho thấy 85% người cọc chưa từng bình luận; đưa 9% làm 'tỉ lệ chuyển' dễ khiến học viên suy ra bình luận dự báo nhu cầu |
| tn01-05 | Ngân sách thử bao nhiêu là đủ? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L3→L4 | I | P2 | [P2 concept] Ngưỡng 'vài chục đơn' không có cơ sở; không có tiêu chí so sánh với kênh cũ (CPA/ROAS) nên 50 đơn chưa trả lời câu hỏi giao ngân sách hằng tháng |
| tn01-06 | Khi nào dừng, khi nào đi tiếp - quyết trước hay sau? | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L4 | K | P3 | Ngưỡng 15%/8% xuất hiện không có cách chọn (từ biên lãi? từ lịch sử?). |
| tn01-07 | Thử nhỏ thắng - nhân lên có thắng như vậy không? | 6 | 6 | 7 | 6 | 7 | 6 | 6 | 6 | **6.3** | L4→L5 | I | P2 | [P2 takeaway] Khái quát hoá: kết quả có thể thấp hơn hoặc cao hơn; cơ chế chính xác là hồi quy về trung bình, điểm chọn lọc và thực thi, không phải luật 'luôn là trần' |
| tn01-08 | Hỏi khách cho nhanh hay đo hành vi cho chắc? | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P1 | [P1 example/Q3] So sánh hai đại lượng khác bản chất: 68% người nói sẽ chuyển với 18% thị phần đơn vị bán trên kệ; trừ ra '50 điểm %' không phải khoảng cách nói-làm |
| tn01-09 | Thử xong rồi - ghi lại thế nào để không ai thử lại đún… | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.6** | L2→L3 | I | P2 | [P2 Q1] Bài coi lặp lại thử cũ là luôn sai, nhưng bối cảnh đổi thì thử lại có thể hợp lý; nhật ký nên ghi điều kiện để quyết định thử lại |
| tn01-10 | Làm sao để đội dám thử - và dám dừng? | 6 | 5 | 7 | 5 | 5 | 5 | 5 | 6 | **5.5** | L2→L4 | I | P2 | [P2 Q1/situation] Kết luận '100% thắng = chỉ thử điều chắc thắng' dựa trên 2 mẫu; quá nhỏ để suy luận, và đáp án d tuyệt đối hoá |
| tn02-01 | Trang mới bán tốt hơn 30% - nhưng nhờ cái gì? | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L4 | I | P2 | [P2 Q2/why.d] Chưa kiểm chứng ý nghĩa: nếu 10.000 lượt/tuần chia hai nhóm, 100 vs 130 đơn có chênh 30 gần bằng 2x√230=30 (sát ngưỡng); ngược quy tắc tn02-03/04 chính mod… |
| tn02-02 | Nhóm nhận voucher mua lại gấp ba - voucher giỏi thật k… | 8 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.9** | L4→L4 | K | P3 | Chưa tính chi phí voucher: 200 lượt thêm có đủ bù 15% trên 1.200 lượt dùng (incrementality về lãi). |
| tn02-03 | 40 đơn so với 30 đơn - B thắng hay chỉ gặp may? | 6 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L4 | I | P1 | [P1 concept/Q4] Dao động tuyệt đối 2√k tăng gấp đôi khi số đơn gấp 4; chỉ dao động tương đối (so với số đơn/tỉ lệ) mới giảm một nửa. Phát biểu 'khoảng dao động hẹp đi mộ… |
| tn02-04 | Test này cần bao nhiêu khách mới đáng đọc? | 7 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.6** | L3→L4 | K | P3 | [P2 example] 12.288/1.500 ≈ 8,2 ngày; và 9 ngày không là bội của tuần, lệch quy tắc trọn chu kỳ tuần ở tn02-06 |
| tn02-05 | Ngày thứ ba B đang dẫn 25% - dừng luôn được không? | 8 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.9** | L4→L4 | K | P3 | [P2 situation] 15 ngày không phải bội của 7, mâu thuẫn quy tắc trọn tuần ở tn02-06 |
| tn02-06 | Test chạy thứ Hai đến thứ Năm - kết quả có dùng cho cả… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 Q5] Khuyến nghị hiển thị theo ngày dựa trên chia nhỏ sau test, nơi mẫu giảm và dễ nhiễu; đáp án không cảnh báo phải kiểm lại ý nghĩa |
| tn02-07 | Chuyển đổi tăng, giá trị đơn giảm - bản nào thắng? | 6 | 6 | 7 | 7 | 6 | 6 | 5 | 6 | **6.1** | L4→L5 | I | P0 | [P0 Q7] Hai đáp án cùng đúng: d là lý do thật (cỡ mẫu phụ thuộc chỉ số chính) và why.d tự nhận 'Cũng đúng một phần'; stem không giới hạn 'lý do chính' |
| tn02-08 | B thắng thật - nhưng có đáng bỏ công triển khai? | 6 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | I | P2 | [P2 situation/Q1] Bài thừa nhận test không thể khẳng định (cần 1,25 triệu lượt/nhóm) rồi coi 'chạy lại' là đáp án sai; học viên có thể thấy chạy lại hợp lý hơn |
| tn02-09 | Test 6 mẫu banner cùng lúc - nhanh hơn hay chậm hơn? | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.3** | L4→L4 | I | P1 | [P1 Q2] Đáp án đúng khuyên test 5 ngày, mâu thuẫn quy tắc trọn chu kỳ tuần mà tn02-06 dạy (7/14/21 ngày); 10 ngày cũng không trọn tuần |
| tn02-10 | Giao diện mới tuần đầu tăng 40%, tuần ba còn 5% - tin … | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L4 | K | P3 | Không có ví dụ nhóm người dùng mới thực sự cho thấy mức tăng bao nhiêu; kết luận '5%' vẫn chưa kiểm tra ý nghĩa thống kê. |
| tn03-01 | Có nên quay TVC 300 triệu khi chưa biết ý tưởng nào ch… | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 example] Không nêu số hiển thị/lượt bấm nên không biết chênh lệch có vượt nhiễu; Q4 why.c khẳng định đủ lớn mà không có dữ liệu |
| tn03-02 | Ba giây đầu video giữ hay đánh rơi người xem? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L3→L4 | K | P3 | [P2 Q1] Câu 'Đoán trước' có đáp án hiển nhiên vì chính tiêu đề bài đã gợi ý |
| tn03-03 | Đổi tiêu đề hay đổi ảnh chính trước? | 6 | 5 | 7 | 6 | 4 | 5 | 5 | 6 | **5.5** | L3→L4 | I | P1 | [P1 Q2] Đáp án đúng là so trước-sau, tự mâu thuẫn với Q5 (chê so tháng này tháng sau) và với cảnh báo mùa vụ trong chính ví dụ |
| tn03-04 | Hai thông điệp, hai hình ảnh: cần chạy mấy bản? | 8 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | I | P2 | [P2 Q6] Chú thích sửa lỗi nằm ngay trong đề, rối; tính đúng (dự đoán cộng 1,55 vs thực 1,6) nhưng khó theo dõi |
| tn03-05 | Thumb-stop, xem hết, CTR: chỉ số nào nói gì? | 6 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.0** | L4→L4 | I | P2 | [P2 situation] Nếu xem hết tính trên hiển thị thì 91% người qua 3 giây xem hết video, phi thực tế; mẫu số không rõ |
| tn03-06 | Quảng cáo đang thắng bỗng hụt hơi: khi nào thay? | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | I | P2 | [P2 example] CTR giảm đều 0,1-0,2 mỗi tuần, không có điểm gãy rõ; ngưỡng 2,5 rút ra từ một đường |
| tn03-07 | Quảng cáo thắng về click có đang làm hại thương hiệu? | 7 | 6 | 7 | 6 | 7 | 5 | 6 | 6 | **6.3** | L5→L5 | K | P3 | [P2 example] Khảo sát quan sát, không phân nhóm ngẫu nhiên; người thấy bản khuyến mãi có thể vốn là nhóm săn giảm giá (retarget) |
| tn03-08 | Cả phòng thích bản A, khách lại chọn bản B? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 example] Chỉ 3 điểm mỗi nhóm, không ngẫu nhiên, chênh 15% có thể do vị trí; không đề cập hoán đổi poster để loại hiệu ứng điểm |
| tn03-09 | 5 triệu mỗi tháng thì thử mấy biến thể? | 7 | 7 | 7 | 7 | 6 | 5 | 6 | 6 | **6.4** | L4→L4 | K | P3 | [P2 Q4] Chính ví dụ nói 41 vs 26 còn trong dao động và cần vòng nữa xác nhận, nhưng đáp án đã tinh chỉnh trong hướng đó; hơi lệch |
| tn03-10 | Thử xong rồi quên: làm sao để lần sau không thử lại từ… | 7 | 5 | 7 | 6 | 5 | 4 | 4 | 5 | **5.4** | L2→L4 | I | P2 | [P2 example] Rút quy luật từ 5 lần thử mà không nói độ tin cậy; chính bài dạy hệ thống nhưng ví dụ cho một khái quát hoá yếu |
| tn04-01 | Tăng giá thử ở 5 cửa hàng, doanh số giảm 10% — do giá … | 8 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.9** | L4→L4 | K | P3 | [P2 concept] Đây là phép khác biệt trong khác biệt nhưng không gọi tên, không nói điều kiện xu hướng song song, không đề cập nhiễu với chỉ 5 cửa hàng |
| tn04-02 | Giảm giá 10% thì phải bán thêm bao nhiêu mới không lỗ? | 8 | 7 | 8 | 8 | 7 | 6 | 7 | 6 | **7.1** | L4→L4 | K | NONE | [P2 Q7] Đáp án đúng nhưng đủ rộng; chưa tính phí sàn, cannibalization hay pull-forward ở tn04-04 |
| tn04-03 | Giảm 20% hay tặng quà: kiểu nào thắng khi đo bằng lãi? | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | I | P2 | [P2 example] Shopee thu phí theo % giá bán; bỏ qua phí sàn thì lãi hai kiểu lệch, nhất là khi giá khác nhau |
| tn04-04 | Tuần khuyến mãi bán gấp đôi, hai tuần sau tụt — đợt đó… | 7 | 6 | 7 | 7 | 7 | 5 | 6 | 6 | **6.4** | L4→L4 | I | P2 | [P2 Q4] Lý do trong phương án sai (hiếm mua lốc) thực ra sai về sự thật, nhưng why.d chỉ nói 'ví dụ điển hình', không bác lý do; có thể gây lẫn |
| tn04-05 | Mã giảm 30k có 400 người dùng — bao nhiêu người là khá… | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L4→L4 | K | P3 | [P2 example] Giả định cả 100 khách mới đều do mã tạo ra; có thể một phần vẫn tự mua, nên 120k là cận dưới của chi phí mỗi khách mới tăng thêm |
| tn04-06 | Vị mới bán 500 ly, nhưng vị cũ mất 300 ly — quán lời h… | 6 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.0** | L4→L4 | I | P2 | [P2 situation/example] Ví dụ lại đặt cả hai vị giá vốn 25k, mâu thuẫn mô tả; nếu vốn thật cao hơn thì lãi ròng nhỏ hơn 2,5 triệu |
| tn04-07 | Thử combo burger – khoai – nước: combo kéo đơn to hơn … | 8 | 7 | 7 | 7 | 6 | 5 | 6 | 6 | **6.5** | L4→L4 | K | P3 | [P2 Q6] Đáp án 'đưa ra toàn quán' không kèm sai số hay cỡ mẫu; 3k chênh có thể do nhiễu |
| tn04-08 | Freeship cho đơn từ 199k hay từ 299k: ngưỡng nào lãi h… | 6 | 6 | 7 | 6 | 6 | 5 | 5 | 6 | **5.9** | L4→L4 | I | P1 | [P1 Q5] Với số liệu bài (A 1.000 đơn/AOV 230k, B 900 đơn/AOV 260k), biên 60% và ship 15k vẫn cho B lãi hơn A (135 triệu vs 127,5 triệu), nên đáp án a không được dữ liệu … |
| tn04-09 | Đợt khuyến mãi đã hết: đọc kết quả thế nào cho khỏi tự… | 8 | 6 | 7 | 7 | 7 | 5 | 6 | 6 | **6.5** | L4→L5 | I | P2 | [P2 concept] Trùng hoàn toàn ý bài tn04-04, và ý lãi trên mọi đơn trùng tn04-02 |
| tn04-10 | Khi nào thử giá lại gây hại cho thương hiệu? | 6 | 6 | 7 | 6 | 6 | 5 | 5 | 6 | **5.9** | L4→L5 | I | P2 | [P2 example] Nếu hiển thị ngẫu nhiên trên cùng website cùng lúc, hai khách vẫn thấy hai ưu đãi khác nhau, tái tạo đúng rủi ro bài cảnh báo |
| tn05-01 | Ra mắt toàn quốc ngay hay bán thử ở một vùng trước? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 Q2] Đáp án đúng dài nhất và hedge đủ ý; bài không định lượng chi phí chờ 6-10 tuần so với rủi ro bắt chước nên câu trả lời cho giám đốc vẫn mơ hồ |
| tn05-02 | Quảng cáo đã chạy mà khách ra tiệm không thấy hàng | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 example/Q4] Giả định lượt xem phân bố đều theo độ phủ điểm bán; thực tế quảng cáo trúng vùng đô thị có độ phủ khác trung bình, và độ phủ theo số tiệm khác độ phủ the… |
| tn05-03 | Nhân viên quầy chưa biết món mới thì ai giới thiệu cho… | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P1 example] 12 cửa hàng có quản lý tự tổ chức uống thử là nhóm tự chọn, có thể vốn là cửa hàng tốt hơn; nhân quả chưa chứng minh. Nhóm 28 cửa hàng lên 15% sau đào tạo m… |
| tn05-04 | Khách đầu tiên của sản phẩm mới nên là ai? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 concept] Beachhead (Moore) là một phân khúc thị trường được chọn để thống trị, không đồng nghĩa danh sách khách cũ; bài gộp 'khách cũ' với 'beachhead' nên mơ hồ về k… |
| tn05-05 | Đặt mục tiêu gì cho tuần đầu và tháng đầu ra mắt? | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L4 | K | P3 | [P2 example] Phủ 110/200 nên còn thiếu 90 cửa hàng so với 100%, chỉ thiếu 50 so với mốc 160; dễ gây hiểu lầm |
| tn05-06 | Có nên chạy teaser gây tò mò trước ngày ra mắt? | 7 | 6 | 7 | 6 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P1 | [P1 example] Kết luận không có giá bán/biên lãi nên không biết 150 triệu cho 600 đôi (250.000đ/đôi) có lời không; lần trước hàng đã hết trong hai ngày nên 600 đôi có thể… |
| tn05-07 | Ra mắt ế: đọc số nào để biết lỗi nằm ở đâu? | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L4 | K | P3 | [P2 example] Tích các tỉ lệ cho ra khoảng 35% kế hoạch, không phải 40% như doanh số ở situation; thiếu khâu khối lượng mua mỗi lần/tần suất nên 'doanh số là tích' chưa đ… |
| tn05-08 | Sản phẩm mới bán chạy nhưng lấy khách của chính sản ph… | 5 | 7 | 7 | 7 | 6 | 6 | 5 | 6 | **6.1** | L4→L5 | I | P0 | [P0 Q1] Đáp án a cũng khiến lợi nhuận cả hãng không tăng dù doanh số vượt kế hoạch; lời giải why.a nói 'không giải thích được' là sai. Câu có hai đáp án cùng đúng (a và … |
| tn05-09 | Khi nào nên rút một sản phẩm vừa ra mắt? | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L5 | I | P1 | [P1 example] Bỏ qua phương án đã nằm trong số: cắt 40 triệu quảng cáo duy trì thì sản phẩm lãi +20 triệu/tháng (100 - 80). Đội chỉ thử đổi bao bì và giảm giá, chưa thử c… |
| tn06-01 | Nên bỏ bao nhiêu tiền để thử một kênh mới? | 6 | 6 | 7 | 7 | 6 | 6 | 5 | 6 | **6.1** | L3→L4 | I | P2 | [P2 concept] Không giải thích vì sao 40 đơn đủ kết luận; với 40 đơn sai số rất lớn (khoảng ±15-30%), có thể phân biệt gấp đôi nhưng không phân biệt 1,2 lần. Quy tắc 10-1… |
| tn06-02 | Mới chạy 5 ngày, chưa có mấy đơn — nhìn vào đâu để quy… | 5 | 6 | 6 | 6 | 4 | 5 | 5 | 6 | **5.4** | L3→L4 | I | P1 | [P1 example/Q2/Q5] Bài tự đặt điều kiện: chỉ số dẫn đầu chỉ đáng tin khi đã biết tỉ lệ sang đơn. Q5 cho thấy 120 giỏ kỳ vọng 24 đơn nhưng thực tế 3 (1/8 tỉ lệ Facebook),… |
| tn06-03 | Kênh mới chạy 3 ngày đã đắt — tắt ngay hay chờ? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q5] Đáp án 'ít khả năng học lại' không chắc: trên Meta mọi chỉnh sửa nội dung quảng cáo đều có thể được tính là thay đổi creative; đáp án dựa vào quy tắc nền tảng kh… |
| tn06-04 | So kênh mới với kênh cũ thế nào cho công bằng? | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L4 | K | P3 | [P2 example] Đơn từ retargeting chưa chắc là đơn tăng thêm; người đã vào web phần lớn sẽ mua; bài trừ ra nhưng chưa nói phần retargeting cũng bị tính trùng |
| tn06-05 | Kênh mới chạy tốt — tăng tiền bao nhiêu là vừa? | 7 | 8 | 7 | 8 | 8 | 6 | 7 | 6 | **7.1** | L4→L5 | K | P3 | [P2 Q2] 'Dừng khi chạm ngưỡng' ngầm hiểu theo chi phí trung bình, trái với bài học vừa dạy (chi phí biên chạm ngưỡng sớm hơn); người học làm đúng đáp án vẫn dừng muộn |
| tn06-06 | Khi nào phải dừng thử một kênh? | 5 | 6 | 6 | 7 | 6 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P1 | [P1 example] 9 triệu là tiền chi thêm, không phải tiền tiết kiệm: 9 triệu đó vẫn mang khoảng 50 đơn x 120.000 = 6 triệu lãi gộp; khoản lỗ tránh được chỉ khoảng 3 triệu. … |
| tn06-07 | Kênh mới mang khách mới, hay chỉ lấy khách của kênh cũ? | 7 | 7 | 7 | 7 | 7 | 6 | 5 | 6 | **6.5** | L4→L5 | I | P2 | [P2 concept/example] So trước-sau không loại được mùa vụ/khuyến mãi; bài sau (tn06-08 Q1) lại chê trước-sau; việc quy Facebook giảm 250 cho Google chỉ là suy đoán |
| tn06-08 | Thử sự kiện, tờ rơi — làm sao biết có hiệu quả? | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q1] Mâu thuẫn với Q4 (mã chỉ là mức sàn, khách quên mang). 'Chính xác' là quá mức |
| tn06-09 | Đang bán mạnh trên Shopee — có nên thử TikTok Shop? | 6 | 6 | 7 | 7 | 6 | 5 | 6 | 7 | **6.3** | L3→L4 | I | P2 | [P2 Q4] Số phí đưa ra như thật nhưng không gắn nhãn minh hoạ; phí thực tế thay đổi theo loại shop/ngành/thời điểm |
| tn06-10 | Báo cáo kết quả thử kênh cho sếp thế nào? | 6 | 5 | 8 | 7 | 5 | 5 | 4 | 6 | **5.8** | L2→L4 | I | P2 | [P2 example] Lý do đề xuất dựa vào tỉ lệ doanh thu/chi phí, trong khi Q4 của chính bài nói doanh thu trừ quảng cáo chưa phải lãi; ví dụ mẫu tự vi phạm điều quiz dạy |
| dl01-01 | Tỉ lệ chuyển đổi 2% là tốt hay xấu — 2% của bước nào? | 8 | 5 | 8 | 6 | 5 | 5 | 6 | 6 | **6.1** | L3→L3 | K | P3 | Bài chủ yếu là phép nhân; 'Cùng một bộ số mà có bốn tỉ lệ khác nhau' không đi sâu vào việc chọn mốc so sánh hay nhiễu thống kê. |
| dl01-02 | Bước nào rò nhất: nơi mất nhiều người hay nơi tỉ lệ th… | 8 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | Ví dụ giả định +5 điểm ở mọi bước, nhưng +5 điểm ở bước 20% (tăng 25%) khó hơn nhiều so với bước 25% -> 30%; bài chưa nói tính khả thi của mức cải thiện. |
| dl01-03 | Tỉ lệ chung 3% mà điện thoại chỉ 1,5% — nên xem phễu g… | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L4 | I | P2 | [P2 title/situation] Tiêu đề nói điện thoại 1,5% nhưng situation và quiz đều dùng 2% -> không khớp, gây hoang mang |
| dl01-04 | Tuần này đơn giảm 20% — so với tuần trước có đúng cách… | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | [P2 Q5] Tết rơi vào tháng 1 hoặc tháng 2 tuỳ năm; khẳng định này không luôn đúng, và 'tháng có Tết năm trước' cũng lệch theo âm lịch |
| dl01-05 | Bán phần mềm cho doanh nghiệp: phễu lead → gặp → báo g… | 7 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.6** | L4→L4 | I | P2 | [P2 example] Khẳng định bất thường/không bất thường mà không có mốc nào; trong khi Q5 lại nói '25% là thường gặp' không thay được việc tìm lý do thua |
| dl01-06 | Tăng một bước của phễu thêm 5 điểm thì doanh thu tăng … | 8 | 7 | 7 | 8 | 7 | 6 | 7 | 6 | **7.0** | L4→L5 | K | P3 | [P2 Q4 wrong] Nhãn lỗi 'ROAS' không khớp phép tính 40/36 |
| dl01-07 | Phễu báo 130% người thêm giỏ đã mua — phễu gãy hay đo … | 8 | 6 | 7 | 8 | 7 | 6 | 7 | 7 | **7.0** | L4→L4 | K | P3 | [P2 example] Giải thích phiên-xem (view-through) khẳng định chắc dù dữ kiện chưa đủ, trộn với các lý do khác (cửa sổ quy chiếu, đơn huỷ) |
| dl01-08 | Mục tiêu tỉ lệ chuyển đổi 10% — đặt theo đâu mới thực … | 7 | 5 | 7 | 6 | 6 | 5 | 6 | 5 | **5.9** | L3→L5 | I | P1 | [P1 concept/example] Không cho phương pháp tạo 'căn cứ': benchmark nội bộ, headroom theo bước, thử nghiệm nhỏ. Mục tiêu 0,75% (+25%) được đặt không lý do |
| dl02-01 | CAC trung bình 150.000đ đang giấu kênh nào? | 8 | 5 | 8 | 7 | 6 | 5 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 Q5 a] Phương án nhiễu chạm vào vấn đề thật (CAC đầy đủ có lương), nhưng lời giải gạt đi là 'quy ước'; gây lẫn với CAC chỉ tiền quảng cáo |
| dl02-02 | 800 đơn tháng này — bao nhiêu là khách mới thật? | 7 | 5 | 7 | 7 | 5 | 5 | 5 | 5 | **5.8** | L3→L4 | I | P2 | [P2 concept] Khẳng định chắc; quảng cáo tái tiếp thị/CRM cũng kéo khách cũ, và khách 'mới' theo SĐT có thể đã mua qua sàn/kênh khác |
| dl02-03 | LTV 1,2 triệu mà vẫn lỗ khi CAC 500.000đ? | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | [P2 Q5] Concept vừa phân biệt biên gộp với biên đóng góp, rồi Q5 gọi tổng biến phí này là 'biên lãi gộp'; không nhất quán thuật ngữ |
| dl02-04 | Tỉ lệ LTV/CAC bằng 3 thì nên làm gì tiếp? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.6** | L2→L4 | M | P1 | [P2 concept] Mốc 3:1 có gốc từ SaaS đăng ký; áp cho thực phẩm giao nhà mà không nói điều kiện, và không nêu nguồn |
| dl02-05 | Bán gói cà phê tháng hay bán lẻ từng túi: bao lâu thì … | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L4→L4 | I | P1 | [P1 concept/example/Q2/Q4] Mô hình liên tục bỏ qua việc đơn đầu trả tiền ngay lúc thu hút: mua tháng 0,2,4,6 -> đủ 400.000đ ở tháng 6, nằm trong ngưỡng vốn; gói tháng đạ… |
| dl02-06 | Đơn 250.000đ trên sàn: thật sự còn lại bao nhiêu? | 8 | 7 | 8 | 8 | 7 | 6 | 7 | 6 | **7.1** | L4→L4 | K | P3 | [P2 situation] Đồ gốm dễ vỡ nhưng không tính hoàn/vỡ/huỷ, thường làm đóng góp biến mất; phí sàn 12% là số tự đặt |
| dl02-07 | Nhân đôi ngân sách thì CAC có giữ nguyên không? | 7 | 7 | 7 | 8 | 7 | 6 | 7 | 6 | **6.9** | L4→L5 | I | P2 | [P2 Q2 why.b] Khoảng này phụ thuộc đường cong chưa nêu; với đường luỹ thừa khớp hai điểm dữ liệu, nấc hoà vốn ra khoảng 22–23 triệu, thấp hơn khoảng 25–30 mà đáp án khuy… |
| dl02-08 | Khi nào nên chấp nhận CAC 1,2 triệu cho một khách? | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L5 | I | P2 | [P2 example] LTV 'ở lại trung bình 12 tháng' nghĩa là một phần rời trước tháng 4; payback theo cohort dài hơn 4 tháng, trái với cảnh báo của chính bài dl02-05 |
| dl03-01 | ROAS 4 nghĩa là shop đang lãi gấp 4? | 8 | 6 | 8 | 7 | 6 | 6 | 6 | 7 | **6.8** | L2→L3 | I | P3 | [P2 concept] 'biên lãi gộp' ở đây là biên đóng góp (đã trừ phí sàn, ship) nhưng bài chưa định nghĩa; bài 02 mới đính chính, dễ lẫn với lãi gộp kế toán |
| dl03-02 | ROAS bao nhiêu thì mới hết lỗ? | 8 | 7 | 8 | 8 | 6 | 6 | 6 | 6 | **6.9** | L3→L3 | K | NONE | [P2 quiz] Q3 và Q4 cùng một kỹ năng, không thêm tầng tư duy |
| dl03-03 | ROAS 3 mà cuối tháng vẫn âm tiền — chuyện gì xảy ra? | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L3 | M | P2 | [P2 Q6] Phương án nhiễu có thể bảo vệ được; phân biệt c/d dựa vào 'khoảng cách đang thu hẹp' ngoài đề |
| dl03-04 | Sau khi trả tiền quảng cáo, mỗi tháng thật sự còn lại … | 8 | 7 | 7 | 8 | 7 | 6 | 6 | 6 | **6.9** | L3→L4 | I | P2 | [P2 concept] Có tới bốn tên (lãi gộp, lãi gộp sau CPBĐ, lãi đóng góp trước QC, đóng góp sau QC) cho ba con số; làm người mới rối |
| dl03-05 | ROAS 6 nhờ khách cũ — có nên khoe không? | 7 | 7 | 7 | 7 | 8 | 6 | 7 | 6 | **6.9** | L4→L4 | K | NONE | [P2 situation] 'Hay mua lại' không đồng nghĩa 'sẽ mua dù không có quảng cáo'; bài coi là hằng số rồi mới dạy đo bằng holdout |
| dl03-06 | Ba nền tảng cùng nhận công — doanh thu thật ở đâu? | 6 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P1 | [P1 Q6] Meta đã bỏ cửa sổ 28 ngày (từ 2021 tối đa 7 ngày bấm; 2026 bỏ thêm 7/28 ngày xem). Kịch bản không còn thực hiện được trên Facebook |
| dl03-07 | Không tin được ROAS từng kênh thì nhìn số nào? | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | [P2 concept] MER gồm cả doanh thu tự nhiên/khách cũ/offline và chịu độ trễ, mùa vụ; bài chưa nói nên dễ coi MER = hiệu quả của marketing |
| dl03-08 | Giảm giá 20% thì mục tiêu ROAS phải đổi thế nào? | 8 | 7 | 8 | 8 | 6 | 6 | 6 | 6 | **6.9** | L3→L3 | I | P3 | [P2 example] Khẳng định không có cơ sở: lỗ phụ thuộc chi quảng cáo; nếu doanh thu gấp đôi nhờ chi gấp đôi thì lỗ gấp đôi, nếu nhờ giá thấp thì khác |
| dl03-09 | Một cửa hàng, hai sản phẩm — có nên dùng chung một mục… | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | [P2 quiz] Câu tương tự dl03-02 Q6; bài này gần như lặp cấu trúc 02 với hai sản phẩm |
| dl03-10 | Sếp hỏi 'tháng này quảng cáo thế nào' — trả lời bằng R… | 8 | 7 | 7 | 8 | 7 | 6 | 7 | 6 | **7.0** | L4→L4 | K | NONE | [P2 concept] Quá tuyệt đối; ROAS thường giảm dần nhưng có thể không giảm khi còn tệp chưa chạm tới |
| dl04-01 | Bảng cohort: đọc theo hàng ngang hay theo cột dọc? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example/Q5] Đánh số tháng bất nhất: ví dụ coi 100% là tháng 1 và 22% là 'tháng thứ 2'; Q5 coi 'tháng thứ 1' là 40%, và '13%' là tháng thứ 5 trong khi trong hàng ví d… |
| dl04-02 | Tỉ lệ rời bỏ 15% tính trên ai? | 8 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.8** | L2→L3 | I | P2 | Chỉ một ý (mẫu số đầu kỳ); Q1, Q3, Q7 cùng một phép chia. Không nói churn theo hợp đồng vs không hợp đồng, khách vào và rời trong cùng kỳ. |
| dl04-03 | Mất 8% khách mỗi tháng thì sau một năm còn bao nhiêu? | 6 | 7 | 7 | 7 | 6 | 6 | 5 | 6 | **6.3** | L3→L3 | I | P0 | [P0 Q5] Tiền đề sai: why.b tự tính chênh khoảng 13 điểm (61% - 48%), nhỏ hơn 24 điểm, không lớn hơn; phương án d 'đúng bằng 24 điểm, không lớn hơn' bị loại vì lý do khác… |
| dl04-04 | Đường cong giữ chân cắm xuống hay nằm ngang thì tốt? | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L4 | I | P1 | [P1 Q7] Đề không nói khoá học là gói nhiều tháng; với khoá học mua một lần, rơi về gần 0 sau khi học xong là bình thường, nên b có thể bảo vệ được và c không 'chắc' là đ… |
| dl04-05 | 10.000 tài khoản, nhưng bao nhiêu khách đang 'sống'? | 8 | 6 | 7 | 7 | 6 | 6 | 5 | 6 | **6.4** | L3→L3 | I | P2 | [P2 quiz] Q1 và Q3 là cùng một câu (trắc nghiệm và tự luận) với đúng số của ví dụ |
| dl04-06 | Kênh nào mang về khách ở lại, không chỉ khách rẻ? | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L4→L4 | I | P1 | [P1 concept] Bỏ qua doanh thu/biên của đơn đầu và độ sâu giảm giá: kênh A (giảm 50%) khác đáng kể về biên; chỉ đếm 'khách còn giữ' chưa phải giá trị |
| dl04-07 | Tỉ lệ mua lại 90 ngày: tính cho khách nào mới đúng? | 6 | 7 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P1 | [P1 situation/example] Tình huống đã cho 132/600 người mua lại trong 90 ngày của cohort tháng 4 ở thời điểm báo cáo cuối tháng 6, nhưng ví dụ lại nói cohort đó chỉ chín … |
| dl04-08 | Doanh thu tăng đều, sao vẫn gọi là xô thủng? | 8 | 7 | 7 | 7 | 7 | 6 | 6 | 7 | **6.9** | L4→L4 | K | NONE | [P2 concept] Theo chính công thức, tăng ròng giảm dần (300 -> 0 theo hàm mũ), không đột ngột; mô tả sai cơ chế |
| dl05-01 | Thương hiệu được biết nhiều mà bán ít: tắc ở tầng nào? | 8 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | K | P3 | [P2 concept] Phễu xem như lồng nhau tuyệt đối; thực tế người mua có thể không nằm trong nhóm ưa thích. Số 90% ưa thích→mua trong ví dụ cũng khá đẹp. |
| dl05-02 | Khảo sát 300 người trong nhóm fan: số nhận biết có tin… | 8 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L3→L4 | K | P3 | [P2 Q2] Đáp án đúng là phương án dài và đầy đủ nhất, dễ chọn theo mẹo. |
| dl05-03 | Nhận biết tăng 8 điểm sau chiến dịch: có phải nhờ quản… | 8 | 7 | 7 | 7 | 8 | 6 | 7 | 6 | **7.0** | L4→L5 | K | P3 | [P2 example] Bài sai số (dl05-08) đứng sau bài này, người học dùng ±9 điểm trước khi được dạy. |
| dl05-04 | Lượng tìm kiếm tên thương hiệu tăng: tín hiệu thật hay… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 situation/Q3] Chuỗi mới nhưng Q3, Q4 đòi so cùng kỳ năm trước và ví dụ lại so tháng 5 với tháng 6; không nhất quán với chính bài. |
| dl05-05 | Share of search 18% nói gì về thị phần năm sau? | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P1 | [P1 concept/situation] Bằng chứng thường dẫn là ngành lựa chọn cao cân nhắc (xe, tài chính); bột giặt là hàng mua nhanh ít ai tìm tên hãng, nhưng bài không nêu điều kiện… |
| dl05-06 | NPS 45: nên treo lên tường hay nên đọc kỹ hơn? | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.6** | L4→L5 | K | P3 | [P2 Q4] Phương án nhiễu quá rơm, không phải lỗi người học hay mắc. |
| dl05-07 | Lượt nhắc trên mạng xã hội tăng gấp ba: mừng hay lo? | 7 | 6 | 7 | 7 | 7 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | [P2 example] Chỉ hiệu chỉnh nhóm trung tính; Q4 lại cho thấy máy cũng gán sai tích cực. Hiệu chỉnh một chiều làm ròng −16% có thể chệch, và mẫu 200 có sai số ±6 điểm khô… |
| dl05-08 | Nhận biết giảm từ 34% xuống 30%: báo động hay dao động? | 8 | 7 | 8 | 8 | 8 | 6 | 8 | 6 | **7.4** | L4→L5 | K | P3 | [P2 Q7] 9 điểm so với ±8,2 chỉ vừa vượt (p khoảng 0,04) và bài không nói việc chọn khoảng thời gian sau khi thấy dữ liệu; kết luận mạnh hơn thực. |
| dl05-09 | Đo thương hiệu mỗi quý: theo dõi những gì cho đủ mà kh… | 7 | 5 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P3 | Hầu như chỉ nói 'giữ nhất quán'; thiếu cách chọn mẫu, bộ 12 câu cụ thể, độ lệch khi đổi phương pháp. |
| dl05-10 | Sếp chỉ có hai phút: báo cáo sức khoẻ thương hiệu một … | 5 | 6 | 8 | 8 | 6 | 6 | 5 | 7 | **6.4** | L3→L5 | I | P0 | [P0 Q3/example] ±3,5 là sai số của một đợt (n=700). Chênh lệch hai đợt có sai số ≈ ±4,9 (như dl05-08 vừa dạy); 5 điểm chỉ vừa vượt. Q3 'vượt 1,5 điểm' dạy đọc sai chuẩn … |
| dl06-01 | Khách xem TikTok, rồi tìm Google, rồi mới mua: ai được… | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 7 | **6.6** | L3→L4 | I | P2 | [P2 example/Q3] Khẳng định nhân quả chỉ dựa trên lời khách tự nhớ (20/30), có thiên lệch trí nhớ; không đề xuất thử bật tắt để kiểm. |
| dl06-02 | Cùng một tháng, bốn mô hình cho bốn kết quả: tin cái n… | 7 | 5 | 7 | 6 | 6 | 5 | 5 | 6 | **5.9** | L2→L4 | I | P1 | [P1 Q2] Bài nói 'không mô hình nào đúng' rồi lại bắt chọn mô hình 40-20-40 làm chuẩn chia ngân sách; tỉ lệ 40-20-40 cũng tuỳ ý. Không nhắc cần đối chiếu thử nghiệm tăng … |
| dl06-03 | Ba nền tảng cộng lại 180 triệu, két chỉ có 100 triệu? | 8 | 6 | 7 | 8 | 7 | 6 | 7 | 7 | **7.0** | L3→L4 | K | P3 | [P2 Q4] Đề lẫn gợi ý và giải thích trong đề; ROAS gán và MER chưa được dạy ở phần concept. |
| dl06-04 | Khách xem quảng cáo 20 ngày trước mới mua: có tính khô… | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example/takeaway] Khách cân nhắc 2–4 tuần và takeaway nói 'dài bằng thời gian cân nhắc', nhưng ví dụ chọn 7 ngày chỉ bắt 28/40 (70%) đơn thay vì 28 ngày (95%). |
| dl06-05 | Link giống nhau, báo cáo gộp hết vào 'khác': sửa thế n… | 7 | 5 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L3→L3 | I | P2 | [P2 example] GA4 gom kênh mặc định theo giá trị medium chuẩn; 'message' và 'kol' không nhận diện, thường rơi vào Unassigned. Ví dụ báo 'direct/khác' giảm 45%→18% mà khôn… |
| dl06-06 | Hỏi thẳng khách 'biết shop qua đâu' có đáng tin không? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 7 | **6.5** | L3→L4 | I | P2 | [P2 Q4] Bài đặt câu hỏi bắt buộc nhưng bắt buộc cũng sinh trả lời đại; nói không bắt buộc 'lệch hơn' là khẳng định chưa có căn cứ. |
| dl06-07 | Tắt quảng cáo ở Đà Nẵng một tháng để biết nó đáng bao … | 8 | 7 | 7 | 8 | 8 | 6 | 8 | 7 | **7.4** | L4→L5 | I | P2 | [P2 situation/example] Ví dụ Hà Nội 200 triệu, Đà Nẵng 100 triệu: gấp đôi quy mô; thêm một cặp vùng, một tháng, không có khoảng nhiễu nên 14% chưa chắc khác 0. |
| dl06-08 | TV, TikTok, sale, mùa lễ cùng lúc: cái nào đẩy doanh s… | 7 | 6 | 7 | 6 | 7 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 Q4] ROAS trung bình 1,5 dễ khiến người học kết luận cắt hoặc tăng TV; bài không nói quyết định ngân sách cần ROAS biên và hiệu ứng trễ. |
| dl06-09 | Khách xem Facebook rồi ra cửa hàng mua: ai ghi công? | 7 | 5 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 concept] Nhồi hai chủ đề (đơn offline, và đánh giá quảng cáo thương hiệu) trong một bài; Q5, Q6 trùng với dl06-01 và dl06-07. |
| dl06-10 | Shop 30 triệu/tháng có cần công cụ ghi công đắt tiền? | 6 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.8** | L3→L5 | I | P1 | [P1 Q5] Tính 5%×3 tỉ=150 triệu chỉ là số tiền chuyển, không phải giá trị tạo ra; câu không kiểm khả năng đánh giá lợi ích so với chi phí công cụ như bài nói. |
| dl07-01 | Báo cáo ghi 12.000 lượt xem — vậy có bao nhiêu người đ… | 8 | 5 | 7 | 7 | 5 | 6 | 6 | 5 | **6.1** | L2→L3 | K | P3 | Chỉ định nghĩa; chưa nói GA4 mặc định báo 'người dùng hoạt động' và không nêu đủ cách đọc 'mới/quay lại'. |
| dl07-02 | Web có hàng trăm sự kiện — nên đánh dấu cái nào là chu… | 8 | 6 | 7 | 7 | 6 | 6 | 7 | 5 | **6.5** | L3→L4 | I | P2 | [P2 example] Ghi chú tham khảo kiểu biên tập lọt vào văn bản học viên; gây lạ và nhanh lỗi thời |
| dl07-03 | Vì sao một nửa lưu lượng hiện là “direct” dù bạn chạy … | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 5 | **6.0** | L3→L4 | I | P2 | [P2 concept/Q5] Tự mâu thuẫn mềm: vừa nói GA4 không tách phiên, vừa khẳng định UTM nội bộ 'ghi đè nguồn thật của phiên'. Thực tế phiên giữ nguồn đầu, nhưng dữ liệu campa… |
| dl07-04 | Tỉ lệ thoát 70% — trang đích tệ thật hay bạn đang đọc … | 7 | 6 | 6 | 7 | 6 | 5 | 7 | 5 | **6.1** | L3→L4 | I | P2 | [P2 situation/example] Situation nói 'thoát 70%' còn example đổi thành 'tương tác 70%/thoát 30%' trùng số 70% gây rối; không nói rõ 70% sếp thấy là bounce kiểu UA hay GA4 |
| dl07-05 | Lưu lượng tăng vọt đêm qua — khách thật hay chính nhân… | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 5 | **6.0** | L3→L4 | I | P2 | [P2 concept] Thiếu cơ chế thật: GA4 data filter (testing/active), bộ lọc không áp ngược và không thể hoàn tác khi đã active |
| dl07-06 | Dashboard 30 chỉ số, sếp vẫn hỏi “tuần này ổn không” —… | 8 | 5 | 7 | 7 | 5 | 6 | 6 | 5 | **6.1** | L3→L4 | I | P2 | [P2 situation/example] Bối cảnh 15 cửa hàng nhưng dashboard chỉ có đơn online; bỏ qua doanh thu cửa hàng/kênh giao |
| dl07-07 | Biểu đồ tròn 12 lát cho doanh thu theo tháng — chọn sa… | 8 | 5 | 8 | 7 | 5 | 5 | 6 | 5 | **6.1** | L3→L4 | I | P2 | [P2 example] Kết quả minh hoạ không có cơ sở, ngụ ý biểu đồ đúng tự động rút họp |
| dl07-08 | Doanh thu tháng 2 giảm 30% so với tháng 1 — đáng lo ha… | 7 | 6 | 6 | 7 | 6 | 6 | 6 | 5 | **6.1** | L3→L4 | I | P2 | [P2 Q4] Why.a của Q4 nói 'tháng 2 năm nay có Tết' trong khi situation/example nói tháng 2 năm nay là tháng sau Tết, tạo hai kịch bản Tết mâu thuẫn |
| dl07-09 | Đơn hàng về 0 suốt 6 tiếng mà không ai biết — cần cảnh… | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 5 | **6.0** | L3→L4 | I | P2 | [P2 concept] Ngưỡng tương đối không xử lý giờ ít đơn (3 giờ sáng trung bình 1–2 đơn, 0 đơn rất thường); bài nói giải quyết báo giả 3 giờ sáng nhưng chưa đủ |
| dl07-10 | Một dashboard cho cả giám đốc lẫn người chạy ads — vì … | 8 | 5 | 7 | 7 | 5 | 6 | 6 | 5 | **6.1** | L3→L4 | I | P2 | [P2 example/Q3] 'Lãi gộp' kế toán là doanh thu trừ giá vốn; ở đây bài dùng như 'biên đóng góp' nhưng lẫn thuật ngữ |
| dl08-01 | Fanpage tăng 20.000 follower, sao đơn hàng vẫn đứng yê… | 8 | 6 | 7 | 7 | 6 | 7 | 7 | 6 | **6.8** | L4→L4 | K | P3 | Khá tốt; thiếu cách thiết kế minigame đúng đối tượng hoặc chỉ số đối trọng; không nói follower có thể mất dần (churn). |
| dl08-02 | Video 1 triệu view, nhưng bao nhiêu người xem tới đoạn… | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L3→L4 | I | P2 | [P2 concept] Quy tắc đếm view khác nhau (TikTok, Reels, YouTube) nhưng bài nói chung chung |
| dl08-03 | App đạt 100.000 lượt tải, vậy có bao nhiêu người thật … | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L3→L4 | I | P3 | [P2 example] Lẫn đơn vị lượt tải (có thể trùng người) và người; Q1 why.c nhắc nhưng example chia thẳng |
| dl08-04 | Team marketing mang về 800 lead, sao sales vẫn kêu thi… | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 5 | **6.0** | L3→L4 | I | P1 | [P1 example/Q4] Cơ chế không thuyết phục: thêm hai câu hỏi vào form chỉ lọc lead, không tạo thêm lead đủ điều kiện (64→90); không giải thích cách tăng |
| dl08-05 | Doanh thu Tết tăng 40%, sao cuối quý lại lỗ? | 8 | 7 | 7 | 8 | 6 | 6 | 7 | 6 | **6.9** | L4→L4 | K | P3 | [P2 concept] Thuật ngữ lỏng: 'lãi gộp' là doanh thu trừ giá vốn; bài trừ cả phí sàn, ship, quảng cáo (biên đóng góp) |
| dl08-06 | Email có tỉ lệ mở 45%, sao không ai đặt hàng? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example/situation] So trước–sau cùng lúc đổi tiêu đề; có thể do mùa/ưu đãi; bài dạy tư duy nhân quả lỏng |
| dl08-07 | Khi chỉ số thành mục tiêu, người ta sẽ “chơi” nó thế n… | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L5 | K | P3 | [P2 Q2] Overclaim: nhân viên có thể nhờ người nhà mua lần hai; chỉ số đối trọng cũng bị chơi |
| dl08-08 | Tỉ lệ chuyển đổi tăng gấp đôi, sao số đơn lại giảm? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 5 | **6.4** | L4→L4 | I | P2 | [P2 example/Q3] Bỏ qua chi phí quảng cáo: lượt vào giảm 60% nhiều khả năng chi quảng cáo cũng giảm; 'mất 3 triệu' chưa là lãi ròng |
| dl08-09 | Giá trị đơn trung bình 500.000đ, nhưng có bao nhiêu đơ… | 7 | 6 | 7 | 7 | 6 | 5 | 7 | 5 | **6.3** | L3→L4 | I | P2 | [P2 example] Số ép: đơn lẻ trung bình 205.000đ mà trung vị 240.000đ và 'phần lớn đơn 200–300k' khó khớp; không có phân phối kèm theo |
| dl08-10 | Chỉ số này tăng hay giảm thì bạn có làm khác đi không? | 7 | 5 | 7 | 7 | 5 | 5 | 6 | 5 | **5.9** | L3→L4 | M | P2 | [P2 concept/example] Trùng gần như nguyên bài dl07-06 (30 chỉ số → 6 ô, mỗi ô phải dẫn tới hành động) |
| dl09-01 | Sếp chỉ có 2 phút: bạn nói câu nào đầu tiên? | 8 | 5 | 8 | 7 | 5 | 6 | 6 | 7 | **6.5** | L3→L3 | K | P3 | [P2 Q1/Q4] Phương án nhiễu Q4 a/b/c ('bí mật nghiệp vụ', 'quy trình thường sai') quá hiển nhiên, đáp án đúng là câu duy nhất nghe hợp lý |
| dl09-02 | Slide có 4 biểu đồ và 12 con số: sếp nhớ được gì? | 8 | 5 | 8 | 7 | 5 | 6 | 6 | 6 | **6.4** | L3→L3 | K | P3 | [P3 Q4] Phương án nhiễu chứa từ tuyệt đối và tự lộ là sai |
| dl09-03 | "Doanh thu 850 triệu" — cao hay thấp? | 8 | 6 | 8 | 7 | 7 | 7 | 7 | 6 | **7.0** | L4→L4 | K | NONE | [P3 Q2] Phương án nhiễu dài và có lý do, làm câu khó hơn (tốt) nhưng why.a khá ngắn |
| dl09-04 | "CAC 187.432 đồng" hay "khoảng 190 nghìn"? | 7 | 5 | 8 | 6 | 5 | 6 | 6 | 6 | **6.1** | L3→L3 | I | P2 | [P2 example/Q6] 63,47% là gần 63%/khoảng 5/8, nói 'gần 2/3' (66,7%) thổi nhẹ con số, mâu thuẫn tinh thần bài ('nói số tròn... không phóng đại'). why.d của Q6 thừa nhận n… |
| dl09-05 | "Tăng 200%" hay "tăng 30 đơn"? | 8 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | [P3 Q6] why.a nói 'là lúc phần trăm hữu ích' trong khi phương án a bị coi là sai; lời giải chấp nhận được nhưng ngoằn ngoèo |
| dl09-06 | Cột này cao gấp ba cột kia — thật vậy không? | 8 | 5 | 8 | 7 | 6 | 6 | 6 | 6 | **6.5** | L4→L4 | K | P3 | [P3 Q4] Nhiễu lộ rõ; Q4 a là đáp án đúng dễ loại suy từ chính câu hỏi vì 'cổ phiếu 95–105' |
| dl09-07 | Con số này chắc tới đâu — và bạn có nói ra không? | 6 | 5 | 7 | 6 | 6 | 5 | 6 | 6 | **5.9** | L4→L5 | I | P1 | [P1 concept] ±11 là sai số 95% cho mẫu ngẫu nhiên, không áp dụng khi mẫu lệch một cửa hàng như chính bài nói; không nêu công thức hay giả định; example lại ghi 45%–65% |
| dl09-08 | Số đã đúng, sếp vẫn hỏi "Vậy thì sao?" | 7 | 6 | 8 | 7 | 6 | 6 | 6 | 7 | **6.6** | L4→L4 | I | P2 | [P2 example] Nguyên nhân 'phí ship mới' xuất hiện bất ngờ trong example, không có trong situation; Q6 sau đó coi miễn ship là giả thuyết |
| dl09-09 | Báo cáo tuần dài 3 trang — ai đọc? | 7 | 4 | 8 | 6 | 4 | 5 | 5 | 5 | **5.5** | L3→L3 | M | P2 | [P2 Q3] Cùng dạng phép chia % hoàn thành đã có ở dl09-01 Q3, lặp |
| dl09-10 | Sếp hỏi câu bạn chưa chuẩn bị: trả lời sao? | 7 | 6 | 8 | 7 | 6 | 6 | 6 | 7 | **6.6** | L4→L4 | I | P2 | [P2 Q5] Coi 25% năm trước hoàn toàn do mùa lễ và năm nay y hệt — một phép trừ ngây thơ, trái với cảnh báo 'chưa có đối chứng' ở Q2; why.b phê phán 'khó tách' dù đáp án c… |
| dl10-01 | ROAS 4, lãi 12 triệu, ROI 60%: ba con số trả lời ba câ… | 8 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.8** | L3→L4 | K | P3 | [P2 concept] Không phân biệt doanh thu do nền tảng ghi nhận (attributed) với doanh thu tăng thêm (incremental); toàn bài coi 80 triệu là lợi ích |
| dl10-02 | Agency báo "ROI 300%" vì doanh thu gấp 4 lần chi: sai … | 8 | 6 | 8 | 7 | 7 | 6 | 7 | 6 | **6.9** | L4→L4 | M | P2 | [P2 overlap] Ý này đã nằm trong dl10-01 (Q1 a/b, Q3 wrong 300/400, Q4); hai bài lặp cùng số 80/20/32/12 và 200/50/60/10 |
| dl10-03 | ROI 100% chỉ tính tiền media — còn quay dựng và lương … | 7 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.6** | L4→L4 | I | P1 | [P1 Q3/step] Bỏ phần lương thì tổng chi 90 triệu, ROI = 30/90 = 33,3%, không phải 50%; số 50 trong 'wrong' không ứng với lỗi nào |
| dl10-04 | ROI tháng đầu −67%: dừng chiến dịch hay chờ khách ở lạ… | 8 | 7 | 8 | 7 | 7 | 6 | 7 | 6 | **7.0** | L4→L5 | K | P3 | [P3 Q2] 'Hoàn vốn 3 tháng' dựa trên giả định mọi người ở đủ 3 tháng; bài tự thừa nhận 'chưa trừ người rời sớm' nhưng đáp án nêu như chắc chắn |
| dl10-05 | Phải bán bao nhiêu hộp thì chiến dịch không lỗ? | 8 | 6 | 8 | 8 | 6 | 6 | 7 | 6 | **6.9** | L3→L4 | K | P3 | [P3 apply] APPLY là bản scale 0,72 của EXAMPLE (cùng 400 đơn, 3,33, 2,5); người học chỉ cần nhân tỉ lệ, không kiểm tra hiểu |
| dl10-06 | Chiến dịch thương hiệu ROI −80% sau một tháng: cắt hay… | 8 | 7 | 8 | 7 | 8 | 6 | 7 | 6 | **7.1** | L5→L5 | K | P3 | [P3 concept] Nêu 'hơn 6 tháng' như ngưỡng thời gian; nguồn gốc là phân tích hiệu ứng dài hạn, không phải ngưỡng cố định; bài có cảnh báo 'có quan điểm khác' |
| dl10-07 | ROI 150% hay ROI 60%: phương án nào để lại nhiều tiền … | 8 | 7 | 8 | 7 | 8 | 6 | 7 | 6 | **7.1** | L5→L5 | K | NONE | [P3 Q6] Đáp án đúng dài nhất, chứa trọn nguyên lý; 'tháng công' không có trong dữ kiện |
| dl10-08 | Báo ROI cho sếp trên một trang: viết gì, bỏ gì? | 8 | 7 | 8 | 8 | 7 | 6 | 7 | 6 | **7.1** | L5→L6 | K | P3 | [P3 concept] Khoảng chỉ phản ánh dải doanh thu tăng thêm, chưa tính bất định của biên và phép đối chứng 2 cửa hàng; dễ tạo cảm giác chắc |
| tu01-01 | Khách thấy gì trong 5 giây đầu khi mở trang? | 8 | 6 | 8 | 7 | 5 | 6 | 6 | 7 | **6.6** | L3→L3 | K | P3 | Không bàn đến việc kiểm chứng ở nhiều thiết bị, hoặc khi nào màn hình đầu dài (sản phẩm phức tạp). |
| tu01-02 | Trang đích nên có một mục tiêu hay năm lựa chọn? | 8 | 6 | 8 | 7 | 5 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | Mệnh đề 'Mỗi nút phụ là một cửa thoát' nói như quy luật; không nêu khi nào nút phụ (tài liệu, FAQ) lại tăng chuyển đổi. Gần trùng tu01-01. |
| tu01-03 | Form đăng ký có 9 trường — bỏ bớt cái nào? | 8 | 7 | 8 | 7 | 7 | 6 | 7 | 6 | **7.0** | L4→L4 | K | NONE | — |
| tu01-04 | Trang tải 6 giây thì mất bao nhiêu khách? | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | I | P2 | [P2 title/concept] Tiêu đề hứa một con số tỉ lệ rời theo thời gian tải nhưng bài không đưa số nghiên cứu nào, chỉ suy ra từ chênh 35% (mà bài nói chính là có nhiều nguyê… |
| tu01-05 | Vì sao thiết kế trên máy tính rồi mới 'co lại' cho điệ… | 7 | 6 | 8 | 7 | 5 | 5 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 concept/Q1] Tỉ lệ mua trên điện thoại thường thấp hơn máy tính do hành vi (duyệt trên mobile, mua trên desktop); chênh không tự chứng minh lỗi trang. |
| tu01-06 | Đánh giá của khách nên đặt ở đâu trên trang? | 8 | 6 | 8 | 7 | 5 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P3 | Không bàn rủi ro bằng chứng giả/đánh giá mua; chỉ Q6 bàn đánh giá xấu. Trùng ý với tu01-07. |
| tu01-07 | Khách đã thích sản phẩm, sao vẫn không bấm mua? | 8 | 6 | 8 | 8 | 6 | 6 | 6 | 6 | **6.8** | L3→L4 | I | P2 | [P2 Q2] Đáp án đúng sao chép gần nguyên văn từ CONCEPT; kiểm tra nhớ, không kiểm tra suy luận. Q5 stem còn lỗi gõ 'ghi đổi miễn phí'. |
| tu01-08 | Nút 'Gửi' và nút 'Nhận lịch tư vấn miễn phí' khác nhau… | 7 | 6 | 8 | 7 | 5 | 5 | 6 | 6 | **6.3** | L3→L3 | I | P3 | Gần như chỉ là copywriting + tương phản; không bàn truy cập (độ tương phản WCAG), A/B đo. |
| tu01-09 | Bản đồ nhiệt và ghi hình phiên cho biết điều gì? | 8 | 7 | 8 | 7 | 7 | 6 | 7 | 6 | **7.0** | L4→L4 | K | NONE | — |
| tu01-10 | Mười việc cần sửa trên trang — làm cái nào trước? | 7 | 6 | 8 | 7 | 5 | 6 | 6 | 6 | **6.4** | L4→L5 | I | P2 | [P2 concept] Điểm tác động thang 1-10 chia ngày công không có đơn vị chung; nhóm 'sửa nút lỗi' bị chuẩn hoá lẫn với việc nhỏ. Thiếu yếu tố độ tin cậy (như ICE/RICE). |
| tu02-01 | Nhân đôi ngân sách thì có được gấp đôi đơn không? | 8 | 8 | 8 | 7 | 7 | 6 | 8 | 7 | **7.4** | L4→L4 | K | NONE | Chưa bàn incrementality (đơn có thể vốn đã tự đến). |
| tu02-02 | Nhóm quảng cáo nào nên nhận thêm tiền, nhóm nào nên bị… | 8 | 8 | 7 | 7 | 8 | 6 | 8 | 6 | **7.3** | L4→L5 | K | P3 | — |
| tu02-03 | Có nên tắt quảng cáo lúc 1 giờ sáng? | 7 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.6** | L3→L4 | I | P2 | [P2 concept] Không nêu rằng một số nền tảng chỉ cho lịch theo giờ trong điều kiện nhất định (Meta cần ngân sách trọn đời; Google Ads dùng lịch quảng cáo), nên hướng dẫn … |
| tu02-04 | Vì sao người tìm 'giày chạy bộ miễn phí' lại ăn tiền c… | 7 | 6 | 8 | 8 | 6 | 6 | 7 | 6 | **6.8** | L3→L3 | I | P2 | [P2 concept] Thiếu loại khớp (broad/phrase/exact) của từ phủ định, vốn quyết định việc chặn nhầm (như Q6 cảnh báo). |
| tu02-05 | Một người thấy quảng cáo 9 lần/tuần thì có sao? | 7 | 6 | 8 | 7 | 6 | 6 | 7 | 6 | **6.6** | L3→L4 | I | P3 | [P2 concept] Giới hạn tần suất chỉ có ở một số kiểu mua (Meta: Reach & Frequency/Reach) và không phải mọi chiến dịch; nêu như tuỳ chọn chung. |
| tu02-06 | Nhóm nhiều đơn nhất có phải nhóm lãi nhất? | 8 | 7 | 8 | 8 | 7 | 6 | 7 | 6 | **7.1** | L4→L4 | I | P3 | ROAS của Serum cao hơn nên ví dụ không minh hoạ trường hợp ROAS đánh lừa (xếp hạng đảo). |
| tu02-07 | Có nên để dành một phần ngân sách chỉ để thử? | 7 | 8 | 7 | 7 | 8 | 6 | 7 | 6 | **7.0** | L4→L5 | I | P2 | [P2 Q6 vs Q4/example] Mâu thuẫn với chính bài: 0,6-1,2tr chỉ mua vài đơn, trong khi bài nói cần vài chục đơn để thấy chênh 35% và vài trăm cho 10-20%. |
| tu02-08 | Mùa sale lớn, CPM tăng gấp đôi thì làm gì với ngân sác… | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Ví dụ không có ghi chú 'số minh hoạ' như các bài khác và đưa CPM gấp đôi, ra đơn gấp đôi như một thực tế; người học có thể hiểu đó là quy luật. |
| tu02-09 | Bị cắt 30% ngân sách thì cắt ở đâu? | 7 | 6 | 8 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P3 | Trùng lập luận lãi biên của 02-01 và 02-02; thiếu bài toán cắt khi không đo được lãi biên theo nhóm. |
| tu02-10 | Mỗi tuần rà soát ngân sách quảng cáo theo thứ tự nào? | 7 | 5 | 8 | 7 | 4 | 5 | 5 | 6 | **5.9** | L2→L4 | I | P2 | [P2 Q3/Q4] Hai calc chỉ là phép nhân/chia đơn giản, không kiểm năng lực; số 1,5tr 'bịt rò' gắn như đã tiết kiệm thật dù nó chỉ là ước. |
| tu03-01 | Giảm 10% cho mọi đơn, hay chỉ cho đơn từ 400.000đ? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L3→L4 | I | P2 | [P2 example] Đơn vốn đã từ 400.000đ trở lên cũng nhận giảm mà không đổi hành vi; ví dụ cho mọi đơn đạt ngưỡng đều được kéo từ 300.000đ lên 420.000đ |
| tu03-02 | Ưu đãi nên dành cho khách mới hay khách trung thành? | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L2→L4 | I | P2 | [P2 example] Thực chất là giảm ~10% cho mọi lượt giặt của khách quen, tức vẫn trả tiền cho hành vi đã có; bài tự mâu thuẫn với lời khuyên 'đừng giảm giá sâu cho khách qu… |
| tu03-03 | Làm sao để khách không 'chờ sale' mới mua? | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 Q7] Tỉ lệ có thể tăng chỉ vì doanh số ngày sale giảm, tổng doanh thu hoặc lãi vẫn có thể xấu đi; chỉ số một mình đánh lừa |
| tu03-04 | Xả hàng tồn thế nào mà không kéo giá hàng mới xuống? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] Không nói gì về 600 áo còn lại và không so chi phí giữ tồn với giảm sâu hơn |
| tu03-05 | Quà tặng nào khách thấy đáng giá mà bạn tốn ít? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L2→L4 | I | P2 | [P2 concept/example] Giá trị cảm nhận được đưa như dữ kiện; khách đã có phin thì quà vô giá trị, không bàn rủi ro này |
| tu03-06 | Chiết khấu cho đại lý hay khuyến mãi cho người mua? | 7 | 7 | 7 | 7 | 6 | 6 | 6 | 6 | **6.5** | L3→L4 | I | P2 | [P2 example] Gắn thưởng với việc đại lý không bán dưới giá đề xuất có thể bị xem là ấn định giá bán lại; bài chỉ cảnh báo pháp lý ở tem cào, không ở điều kiện này |
| tu03-07 | Viết điều kiện khuyến mãi sao cho rõ mà vẫn hấp dẫn? | 6 | 5 | 7 | 7 | 5 | 6 | 5 | 6 | **5.9** | L2→L3 | I | P2 | [P2 Q4 why.b] Lời nhắn của người viết bài lọt vào lời giải, làm người học bối rối và tố ra đáp án b chưa được kiểm chứng |
| tu03-08 | Hợp tác khuyến mãi với đối tác thế nào để cả hai cùng … | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.5** | L2→L4 | I | P1 | [P1 example] Mâu thuẫn với situation: quán nước ép giảm 20% chính sản phẩm của mình cho hội viên gym; takeaway 'tặng thứ tốn ít' không áp dụng cho bên này |
| tu03-09 | Chương trình kết thúc rồi, khách có còn ở lại không? | 7 | 7 | 7 | 7 | 7 | 6 | 6 | 6 | **6.6** | L4→L5 | I | P2 | [P2 example] Nhóm đối chứng không ngẫu nhiên, cùng lúc có thể bị cannibalize bởi chương trình; so sánh tỉ lệ ở lại chưa đủ, cần so doanh thu/lãi tăng thêm so với kịch bả… |
| tu03-10 | Khi nào nên dừng hẳn một kiểu khuyến mãi? | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L5 | I | P2 | [P2 example] Kết quả đẹp không gắn nhãn minh hoạ như các bài khác; không loại trừ mùa vụ hay yếu tố khác khi so trước sau |
| tu04-01 | Mỗi khách hàng thật sự mang về bao nhiêu khách mới? | 7 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.6** | L4→L4 | I | P3 | [P2 concept] Bỏ qua thời gian một vòng lan truyền và việc khách rời bỏ; K>1 vẫn có thể không bền |
| tu04-02 | Thưởng cho người mời, người được mời, hay cả hai? | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example/concept] Tình huống chỉ cho 6%, không nói số lời mời nhiều; kết luận 'rào cản ở người nhận' từ 6% khi chưa có benchmark. Mở ví có thể vướng eKYC, thưởng khôn… |
| tu04-03 | Thưởng giới thiệu bao nhiêu thì vẫn còn lãi? | 6 | 7 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L5 | I | P1 | [P1 Q6] Lãi gộp là doanh thu trừ giá vốn, trước chi phí vận hành; 'lãi gộp sau chi phí vận hành' là nhầm thuật ngữ (đúng là lãi hoạt động hoặc biên đóng góp). Đáp án a l… |
| tu04-04 | Nên xin khách giới thiệu vào lúc nào? | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example] Thực tế đổi nhiều thứ: từ voucher 100.000đ sang buổi gội đầu, từ SMS sang thẻ QR tại quầy, thêm tin cảm ơn; kết luận 'chỉ thời điểm' là nhân quả quá tay |
| tu04-05 | Làm sao để khách tự kể về bạn mà không cần thưởng? | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 7 | **5.8** | L2→L4 | I | P2 | [P2 example] Kết quả mạnh được đưa như đo thật nhưng không gắn nhãn minh hoạ; thêm chả tặng thực chất là ưu đãi, cùng lúc đổi bát sành, nên không tách được chi tiết nào … |
| tu04-06 | Chương trình giới thiệu tăng vọt — thật hay bị gian lậ… | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 7 | **6.9** | L4→L5 | K | P3 | [P2 example] Chỉ tính tiền thưởng, bỏ chi phí hàng và giao của các đơn giả (người gian lận nhận thưởng 100.000đ cho đơn 100.000đ) |
| tu04-07 | Review và video của khách có đáng đầu tư như giới thiệ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 Q2/example] Cho rằng tỉ lệ mua 1,5% vs 3% do thiếu đánh giá; còn nhiều nguyên nhân (giá, ảnh, nhắm đúng người, mức giá vận chuyển) chưa được loại trừ |
| tu04-08 | Nên thuê KOL hay nuôi cộng đồng đại sứ từ chính khách … | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L5 | I | P2 | [P2 example] So hai quý khác nhau, khác hàng và mùa, lại tính quà tặng theo giá bán lẻ; kết luận đại sứ rẻ gấp 2,6 lần là quá tay |
| tu04-09 | Làm sao đo được truyền miệng khi không có mã giới thiệ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 example] 'Bạn kể' có thể là hệ quả gián tiếp của quảng cáo hoặc hoạt động khác; đưa 50% như tỉ trọng nguồn độc lập rồi quyết định giữ quảng cáo thì kết luận quá chắc |
| tu05-01 | Muốn doanh thu năm tăng 20%, nên kéo cần nào | 7 | 5 | 7 | 6 | 5 | 6 | 6 | 5 | **5.9** | L3→L4 | I | P1 | [P1 Q2] Lời giải của chính câu thừa nhận phương án a có thể đúng (750.000 doanh thu/khách vs CAC 150.000), nên hai đáp án cùng bảo vệ được; đáp án c chỉ đúng nhờ chữ 'tr… |
| tu05-02 | Gợi ý bán thêm lúc nào: trước thanh toán hay sau khi m… | 6 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 situation/example] Quy toàn bộ +6 điểm cho gợi ý đắt, bỏ qua mùa vụ/giá/ship; không có nhóm đối chứng; tất 59.000 cũng chưa được tách tác động |
| tu05-03 | Nhắc mua lại vào ngày nào để khách không mua chỗ khác | 7 | 5 | 8 | 7 | 5 | 6 | 5 | 6 | **6.1** | L3→L4 | K | P3 | Chu kỳ lấy từ lượng dùng giả định; chỉ Q4 nhắc dùng dữ liệu thật, không dạy cách đọc phân phối (phân vị 25 thay vì trung vị). |
| tu05-04 | Có nên mở gói giao định kỳ giảm 10% | 7 | 7 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L5 | K | P3 | [P2 example] Bỏ qua chi phí giao/đóng gói của kỳ nhận, chi phí thanh toán định kỳ và việc khách đăng ký có thể vốn là khách 12 lần |
| tu05-05 | Nên bán gì tiếp cho người đã mua sản phẩm chủ lực | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 5 | **5.5** | L3→L4 | I | P2 | [P2 example] Khẳng định chắc chắn không có căn cứ; khách cũng mua lõi trôi nổi, như bài 08 chính nó nói |
| tu05-06 | Giá trị đơn tăng 25% mà doanh thu gần như đứng yên | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P1 | [P1 Q6] Hỏi 'ít làm giảm tần suất' nhưng đáp án thừa nhận tần suất mua vẫn giảm; bài lẫn tần suất mua với lượng tiêu thụ. Gói lớn luôn giảm số đơn; điều cần giữ là doanh… |
| tu05-07 | Nhóm khách VIP chiếm bao nhiêu doanh thu, đối xử khác … | 6 | 5 | 7 | 6 | 5 | 6 | 5 | 6 | **5.8** | L3→L4 | I | P1 | [P1 concept] Mâu thuẫn số trong chính bài: 3,6 triệu vs 489.000 chỉ ~7,4 lần, không phải 'vài chục' |
| tu05-08 | Làm gì sau khi giao hàng để khách mua lần sau | 6 | 5 | 7 | 6 | 6 | 6 | 5 | 6 | **5.9** | L3→L4 | I | P2 | [P2 example/Q3] Lõi cần thay mỗi 6 tháng nên nhu cầu mỗi quý phụ thuộc cơ sở máy đã bán, không chỉ 800 máy mới; phép tính bỏ qua chi phí cuộc gọi/kỹ thuật |
| tu05-09 | Có nên bán cỡ gói lớn cho khách quen | 5 | 6 | 6 | 6 | 6 | 6 | 6 | 5 | **5.8** | L3→L5 | I | P1 | [P1 example] Với số của bài: lãi/lít giảm 40.000 -> 32.500 (mất 18,75%) nhưng chỉ giữ 15% khách vốn sẽ đi; nếu toàn bộ khách chuyển túi, 100×32.500 = 3.250 < 85×40.000 =… |
| tu05-10 | Chọn đòn bẩy nào khi mỗi cái đều hứa tăng doanh thu năm | 7 | 6 | 7 | 7 | 7 | 6 | 7 | 5 | **6.5** | L4→L5 | I | P2 | [P2 example] Bài nói phải quy về lãi nhưng không tính lãi của B; thực ra B (biên 40%) lãi giảm ~160 triệu trong khi A tăng, kết luận mạnh hơn |
| tu06-01 | Đã tiêu 200 triệu, có nên đổ thêm 100 triệu để gỡ | 7 | 6 | 8 | 7 | 7 | 6 | 6 | 7 | **6.8** | L4→L5 | K | P3 | [P2 Q5] Lãi gộp đã trừ giá vốn hàng; nếu 70 triệu gồm hàng thì tính trùng, so 70 với 40 là lẫn doanh thu/chi phí |
| tu06-02 | Chi phí mỗi đơn tăng: quảng cáo mỏi hay thị trường đã … | 6 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.3** | L4→L4 | I | P2 | [P2 concept] Nhị phân đơn giản hoá: CPM tăng do đấu giá, landing page/giá/hết size cũng làm CVR rơi; thiếu chẩn đoán CPM |
| tu06-03 | Chiến dịch thương hiệu mới chạy 3 tuần chưa ra đơn, dừ… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L4→L5 | I | P3 | [P2 example] Mẫu 200 người không kiểm sai số/nhóm đối chứng; tìm kiếm tăng có thể do khuyến mãi sàn |
| tu06-04 | Tắt một phát hay giảm dần ngân sách | 6 | 5 | 7 | 6 | 6 | 6 | 6 | 5 | **5.9** | L3→L5 | I | P2 | [P1 example] Cho sẵn lãi của 'nửa đầu' và 'nửa sau' mà không dạy cách tách; thực tế chỉ quan sát được tổng và sự thay đổi khi đổi ngân sách |
| tu06-05 | Bão lũ đang xảy ra, chiến dịch vui nhộn có nên tạm dừng | 7 | 4 | 7 | 5 | 4 | 5 | 4 | 6 | **5.3** | L2→L4 | I | P2 | [P2 quiz] Cả 7 câu đều có một đáp án đạo đức hiển nhiên, các phương án nhiễu quá lộ (băng rôn lớn, mua một tặng một) |
| tu06-06 | Đạt mục tiêu sau 2 tuần thay vì 4: dừng hay chạy nốt | 6 | 4 | 7 | 6 | 5 | 6 | 4 | 5 | **5.4** | L3→L4 | I | P2 | [P1 concept] Đăng ký khác đóng học phí/nhập học; không tính tỉ lệ rụng nên dừng ở 125/130 có thể thiếu hoặc thừa |
| tu06-07 | Muốn dừng chiến dịch nhưng đã ký hợp đồng với KOL | 4 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.3** | L3→L5 | I | P0 | [P0 Q3/example] Hợp đồng 80, đã trả 40, còn video 3 và 4 chưa trả. Nếu làm video 3 (đổi nội dung) rồi livestream, tổng vẫn ~80; 55 chỉ đúng nếu dừng và không trả video 3… |
| tu06-08 | Doanh thu chiến dịch vẫn cao: sao lại nói nên dừng | 8 | 6 | 8 | 8 | 7 | 6 | 7 | 7 | **7.1** | L4→L5 | K | P3 | Chưa nêu ROAS hoà vốn = giá bán ÷ lãi biên trước QC (7,1; sau quà 10,9) là con số người học cần nhớ. |
| tu06-09 | Dừng chương trình khuyến mãi: báo khách và đối tác thế… | 6 | 4 | 7 | 6 | 4 | 5 | 4 | 5 | **5.1** | L2→L4 | I | P2 | [P2 Q3] Nhóm 5 dấu trở lên gồm cả người đủ 10 dấu sẽ nhận 'phần lớn' (đắt hơn); phép nhân 1.200 × 25.000 đánh giá thấp |
| tu06-10 | Chiến dịch đã tắt: cần lưu lại những gì | 7 | 5 | 7 | 7 | 5 | 5 | 5 | 5 | **5.8** | L3→L4 | I | P3 | [P2 example/Q3] Cộng lãi theo kênh mà không nhắc trùng lặp attribution giữa kênh; tổng 14 triệu có thể sai |
| in01-01 | Chiến dịch “thành công” — nhưng so với mục tiêu nào? | 8 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | K | P3 | Chỉ dừng ở 'so với mục tiêu'; không hỏi mục tiêu có đặt đúng không: “Mục tiêu 25.000 ly” không có căn cứ đặt ngưỡng. |
| in01-02 | Bán vượt chỉ tiêu nhờ mình giỏi hay nhờ trời nắng? | 8 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.4** | L3→L5 | K | P3 | [P2 Q4] cụm 'cùng thời tiết' đã tự lộ đáp án; đồng thời Hải Phòng chưa chắc có cùng xu hướng thị trường |
| in01-03 | Landing page sập ngày ra mắt: lỗi của ai? | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P2 | Không nói giới hạn của 5 Whys (một chuỗi đơn, dễ dừng tại điều dễ sửa) và blameless khác với không ai chịu trách nhiệm: “Vì sao? Checklist ra mắt chưa có mục đó.” |
| in01-04 | Cái gì giữ lại, cái gì bỏ cho lần sau? | 8 | 7 | 7 | 7 | 7 | 5 | 7 | 6 | **6.8** | L4→L5 | K | P3 | [P3 Q3] calc đo đúng thước mà concept khuyên không dùng (doanh thu/chi), dù có step ghi chú |
| in01-05 | Khuyến mãi bán bùng tháng này — tháng sau thì sao? | 6 | 6 | 7 | 6 | 6 | 5 | 6 | 6 | **6.0** | L3→L5 | I | P1 | [P1 example] Mua 1 tặng 1: nếu 70.000 chai gồm cả hàng tặng thì chỉ ~35.000 chai trả tiền, thấp hơn nền 40.000; số 6.000 chai ròng trộn chai tặng và chai bán, mâu thuẫn … |
| in01-06 | Buổi post-mortem nên mời ai, và ai nói trước? | 7 | 4 | 7 | 5 | 4 | 5 | 5 | 5 | **5.3** | L2→L4 | I | P2 | [P3 example] tình huống nói 12 người, ví dụ chốt 7 mà không giải thích 5 người còn lại xử lý ra sao |
| in01-07 | “Biết ngay mà” — có thật là bạn đã biết? | 8 | 6 | 7 | 6 | 7 | 5 | 6 | 6 | **6.4** | L4→L5 | K | P3 | [P3 Q3] calc phép trừ phần trăm tầm thường, tách rời nội dung bài |
| in01-08 | Chiến dịch vượt chỉ tiêu có cần post-mortem không? | 7 | 5 | 7 | 6 | 5 | 5 | 6 | 6 | **5.9** | L3→L5 | I | P2 | Trùng ý với in01-02 (tách phần do mình khi thắng). Nhận định “60% đơn đến từ một KOL” không bàn chuyện cách đo ghi nhận KOL (mã giảm giá, last-click) và phần đơn tự nhiê… |
| in01-09 | Viết bài học sao cho người sau dùng được? | 7 | 5 | 7 | 7 | 5 | 5 | 5 | 6 | **5.9** | L3→L6 | I | P2 | [P2 Q2/Q7] đáp án đúng là phương án duy nhất có số cụ thể/có 'vì', lộ qua hình thức, không cần hiểu |
| in01-10 | Bài học nằm trong ổ đĩa ai đó thì có ích gì? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L3→L5 | I | P3 | [P3 example] kết quả nhân quả khẳng định chắc từ một con số tự dựng, không có đối chứng |
| in02-01 | Highlands Coffee bán cà phê hay bán chỗ ngồi? | 6 | 5 | 7 | 6 | 5 | 5 | 6 | 7 | **5.9** | L3→L4 | I | P2 | [P2 concept/example] mâu thuẫn ngầm với mistake 'coi khách ngồi lâu là gánh nặng': tăng lượt (turn) và khách ngồi lâu là hai mục tiêu ngược nhau, không bàn trade-off |
| in02-02 | Vì sao “Đi để trở về” giúp Biti's Hunter trẻ lại? | 7 | 4 | 7 | 5 | 5 | 6 | 5 | 6 | **5.6** | L2→L4 | I | P2 | [P2 example/Q3] ví dụ về 'dép giả định' không dùng dữ kiện Biti's; chi phí/lượt xem không nối tới mục tiêu thương hiệu hay doanh số |
| in02-03 | Vinamilk dạy gì về chuyện “có mặt ở mọi nơi”? | 7 | 5 | 7 | 6 | 5 | 6 | 7 | 6 | **6.1** | L3→L4 | K | P3 | [P2 concept] đúng tinh thần Byron Sharp (How Brands Grow) nhưng không nêu nguồn, và bỏ qua chi phí để phủ kệ (nhà phân phối, chiết khấu, tồn kho) |
| in02-04 | Khi điện thoại ở đâu cũng giống nhau, Thế Giới Di Động… | 7 | 5 | 7 | 6 | 5 | 6 | 6 | 6 | **6.0** | L3→L4 | K | P3 | [P3 example vs Q3] example chia cho giá chuỗi (3,75%), Q3 chia cho giá rẻ hơn (5,3%); hai mẫu số không thống nhất, dễ gây rối |
| in02-05 | Phúc Long giữ gì khi mở rộng sang kênh mới? | 6 | 4 | 6 | 5 | 4 | 5 | 5 | 5 | **5.0** | L2→L4 | I | P2 | [P2 Q1] phương án a (khách kênh mới có thể không hợp) là rủi ro có thật, bị loại bằng một khẳng định; đáp án 'đúng' là điều hiển nhiên |
| in02-06 | Mixue lan nhanh ở Việt Nam nhờ những gì ai cũng thấy? | 7 | 5 | 7 | 6 | 5 | 6 | 6 | 7 | **6.1** | L3→L4 | I | P2 | [P1 concept] bỏ mảnh ghép cốt lõi: mô hình nhượng quyền và chuỗi cung ứng tích hợp khiến giá thấp và độ phủ khả thi |
| in02-07 | Vì sao Grab và Be không dừng ở gọi xe? | 6 | 5 | 7 | 6 | 5 | 6 | 6 | 6 | **5.9** | L3→L4 | I | P2 | [P2 concept] một chiều: dịch vụ kề (giao đồ ăn) thường cần trợ giá lớn và lỗ nhiều năm; không nêu mặt trái |
| in02-08 | Bánh trung thu Kido: người mua có phải người ăn? | 6 | 4 | 6 | 5 | 4 | 4 | 5 | 5 | **4.9** | L2→L4 | W | P2 | [P2 case] tiêu đề hứa case Kido nhưng ví dụ và quiz chỉ nói chung về bánh biếu, không có dữ kiện về Kido |
| in02-09 | Trung Nguyên bán cà phê hay bán một ý nghĩa? | 6 | 4 | 6 | 5 | 4 | 5 | 5 | 5 | **5.0** | L2→L4 | I | P2 | [P2 concept] hai ý khác nhau (ý nghĩa thương hiệu; danh mục theo dịp) bị ghép, quiz Q2–Q4 chỉ về danh mục, tiêu đề hứa ý nghĩa; không nêu hạn chế của Trung Nguyên thực tế |
| in02-10 | Shopee ngày đôi: tạo ra dịp mua sắm từ con số? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L5 | K | P3 | [P2 Q1] d là một nguyên nhân thật của thói quen ngày đôi (miễn phí ship, voucher); c và d cùng hợp lý |
| in03-01 | Spotify Wrapped: vì sao người dùng tự đi khoe dữ liệu … | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 7 | **6.4** | L3→L4 | I | P2 | [P2 concept] Không nêu năm, số người chia sẻ hay kết quả; chỉ là mô tả cơ chế quen thuộc |
| in03-02 | Dove Real Beauty: khi nào chạm vào nỗi đau thật thì bá… | 7 | 6 | 7 | 6 | 7 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 quiz Q5] Đáp án đúng là phương án dài nhất và chứa cả hai vế nên dễ đoán |
| in03-03 | Nike 'Just Do It': vì sao một câu ba chữ sống được hàn… | 7 | 5 | 7 | 6 | 5 | 6 | 5 | 6 | **5.9** | L2→L4 | I | P1 | [P2 quiz Q3] Phép nhân thuần tuý, không kiểm tra hiểu biết về slogan; 'cộng dồn' không tạo ra kết luận nào |
| in03-04 | Apple 'Think Different': định vị bằng người khách muốn… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 6 | **6.4** | L3→L4 | I | P2 | [P2 concept] Bỏ qua bối cảnh 1997: Apple gần phá sản và chiến dịch đi cùng việc đổi sản phẩm (iMac); lời hứa bản ngã không đứng một mình |
| in03-05 | Old Spice: làm mới một thương hiệu 'của bố' bằng sự hà… | 6 | 6 | 7 | 6 | 6 | 6 | 6 | 7 | **6.3** | L3→L4 | I | P2 | [P2 example/Q2] Chiến dịch gốc có một video lớn làm hero rồi hàng trăm video phản hồi; dạy 'nhiều video nhỏ thay video lớn' lệch với case |
| in03-06 | Airbnb: bán nỗi sợ ở nhà người lạ hay bán cảm giác thu… | 7 | 7 | 7 | 7 | 7 | 7 | 6 | 6 | **6.8** | L4→L4 | K | P3 | [P2 quiz Q4] Đáp án khẳng định nhân quả từ trước/sau (5% lên 9%) khi có thêm đánh giá; chỉ phần why.b nhắc so cùng kỳ |
| in03-07 | Duolingo trên TikTok: thương hiệu nghiêm túc có nên 'n… | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 7 | **6.4** | L3→L4 | I | P2 | [P2 quiz Q3] Chỉ cộng lượt xem; không gắn với mục tiêu (cài app, đăng ký) nên 'thành công' chưa chứng minh |
| in03-08 | IKEA: khi khách tự làm, họ quý sản phẩm hơn? | 7 | 6 | 7 | 6 | 6 | 6 | 6 | 6 | **6.3** | L3→L4 | I | P2 | [P2 example] Không nhắc an toàn khi tự đun sáp/nấu nến (bỏng, cháy) và chi phí chăm sóc khách khi làm hỏng |
| in03-09 | Share a Coke: in tên người lên chai có dùng được cho m… | 7 | 6 | 7 | 6 | 5 | 6 | 6 | 7 | **6.3** | L3→L4 | I | P2 | [P2 quiz Q7] 'Bán hết nhanh' chịu nhiễu số lượng in và vị trí trưng bày; đáp án a kết luận nhân quả khi chưa kiểm tra tốc độ bán trên mỗi nghìn chai |
| in03-10 | McDonald's: sự nhất quán đáng giá bao nhiêu khi mở chu… | 7 | 6 | 7 | 7 | 6 | 6 | 6 | 5 | **6.3** | L3→L4 | I | P2 | [P2 Q3] Đúng tính nhưng chỉ là phép trừ phần trăm; khảo sát hai mẫu 200 khác nhau không kiểm tra ý nghĩa thống kê |
| in04-01 | Đề xuất của bạn nói được trong một câu không? | 7 | 5 | 8 | 7 | 5 | 6 | 6 | 7 | **6.4** | L3→L4 | I | P2 | [P2 quiz Q2/Q4/Q6] Đáp án đúng luôn là phương án duy nhất có con số, người học chỉ cần tìm con số |
| in04-02 | Lý do nào đủ nặng để sếp gật đầu? | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | **7.0** | L4→L5 | K | NONE | [P2 example] Là insight nhưng dữ kiện về tỉ lệ chi theo nhóm khách không nằm trong phần Dữ kiện |
| in04-03 | 'Sẽ triển khai trong quý 3' — ai làm, bắt đầu khi nào? | 6 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example vs Q4] In cần 10 ngày không vừa trong một tuần; lại duyệt thiết kế tuần −3, còn Q4 tính duyệt muộn nhất 19/6 (nằm trong tuần −2) nên lịch tự mâu thuẫn |
| in04-04 | Xin 200 triệu thì phải hứa lại con số nào? | 6 | 7 | 7 | 7 | 7 | 7 | 7 | 6 | **6.8** | L4→L5 | I | P1 | [P1 quiz Q6] Đáp án đúng so chi phí mỗi học viên (830k) với giá bán 1,5 triệu, chính là lỗi so với doanh thu mà bài cảnh báo; chỉ why.d nhắc muộn |
| in04-05 | Điều gì có thể hỏng, và bạn đã chuẩn bị gì? | 7 | 6 | 7 | 7 | 5 | 6 | 6 | 6 | **6.3** | L3→L5 | I | P1 | [P1 example] Thử 50 đơn: 5% là 2,5 đơn, 8% là 4 đơn, chênh quá nhỏ để phân biệt, ngưỡng không đo được; hoàn hàng còn trễ sau tuần đầu |
| in04-06 | 'Sao không làm cách khác?' — bạn đã so chưa? | 7 | 6 | 7 | 7 | 6 | 6 | 7 | 6 | **6.5** | L4→L5 | K | P3 | [P2 Q3 vs Q4] Q3 coi Zalo OA chạy đủ 6 tháng nhưng ví dụ nói cần 2 tuần để chạy; Q4 lại trừ thời gian xây app, nên hai câu tính không đồng nhất |
| in04-07 | Sếp chỉ đọc 30 giây — trang đầu viết gì? | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q3] Người bỏ về không mua, nên họ không nằm trong nhóm 'khách mua rau' đã đo bằng hoá đơn; 38,4 là cách đọc nghĩa đen, mô hình mơ hồ |
| in04-08 | Tám phút trước ban giám khảo: nói gì ở phút đầu? | 6 | 5 | 7 | 7 | 5 | 5 | 6 | 6 | **5.9** | L3→L4 | I | P1 | [P2 example] Không có lợi nhuận gộp mỗi chai nên chưa biết lãi hay lỗ; 6.700đ marketing/chai gần chắc lớn hơn lãi gộp sữa chua uống, trái với bài in04-04 dạy hoà vốn |
| in04-09 | Bị hỏi vặn 'nếu không hiệu quả thì sao?' — trả lời thế… | 6 | 5 | 7 | 7 | 5 | 6 | 6 | 6 | **6.0** | L3→L5 | I | P2 | [P2 example/Q3] Ngưỡng 4% không có cơ sở (không nối với hoà vốn); 'đổi mã' chưa phải doanh thu tăng thêm, lại bỏ qua chiết khấu mã |
| in04-10 | Đề xuất này yếu ở đâu, và sửa thế nào cho mạnh? | 5 | 6 | 7 | 7 | 5 | 5 | 6 | 6 | **5.9** | L4→L6 | I | P1 | [P1 example vs Q4] Voucher 150.000đ x 5.000 lượt đổi = 750 triệu (hoặc x 3.000 đôi = 450 triệu), không khớp 300 triệu; Q4 lại tính lợi nhuận gộp 405k/đôi mà không trừ vo… |
| in05-01 | Hãy kể về một chiến dịch bạn thích | 7 | 5 | 8 | 7 | 5 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 example] Ví dụ vừa nói không có số doanh số rồi vẫn rút bài học như thể chiến dịch đã thành công; chính nó mắc lỗi đánh đồng độ phủ với hiệu quả mà bài cảnh báo |
| in05-02 | Case thị phần đang giảm, bạn bắt đầu từ đâu | 8 | 6 | 7 | 7 | 7 | 6 | 7 | 6 | **6.8** | L4→L4 | K | P3 | [P2 Q2] Phương án d thực ra là hành vi hợp lý trong case thật; why.d phán xét quá mạnh nên đáp án a không tuyệt đối |
| in05-03 | Mỗi năm Việt Nam bán bao nhiêu hộp sữa chua | 7 | 5 | 7 | 7 | 6 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 concept] Tiêu đề hỏi Việt Nam nhưng nội dung và ví dụ chỉ TP.HCM, gây lệch |
| in05-04 | Được đưa một quảng cáo và hỏi em thấy sao | 7 | 5 | 7 | 6 | 6 | 4 | 6 | 5 | **5.8** | L3→L4 | I | P2 | [P2 concept] Không dạy cách suy ra mục tiêu khi người phỏng vấn không đưa brief, trong khi mọi đánh giá hiệu quả phụ thuộc mục tiêu |
| in05-05 | Kể về một lần bạn gặp khó khăn (STAR) | 7 | 5 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 example] Gán tăng bán cho kênh mới mà không nói đến yếu tố khác (mùa, sát ngày sự kiện), ví dụ mẫu thiếu thận trọng nhân quả |
| in05-06 | Đề case mơ hồ - hỏi lại gì để không lạc đề | 7 | 5 | 7 | 7 | 6 | 5 | 6 | 6 | **6.1** | L3→L4 | I | P2 | [P2 Q4] Phương án đúng lặp nguyên cụm từ concept nên dễ đoán; 'mười câu' và 'không hỏi' quá hiển nhiên |
| in05-07 | Case 30 phút - chia thời gian thế nào | 6 | 4 | 7 | 6 | 5 | 5 | 5 | 5 | **5.4** | L2→L3 | I | P2 | [P2 concept] Tình huống nói Đức phải 'trình bày vội' trong 30 phút, nhưng tỉ lệ không dành thời gian cho việc trình bày thật; nhập nhằng 'chuẩn bị' với 'nói' |
| in05-08 | Case nhóm với người lạ - đóng góp sao cho được chấm đi… | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 concept] Bỏ qua mâu thuẫn thật: người chấm cần hành vi quan sát được, nói quá ít vẫn bị đánh giá thấp; bài không nói ngưỡng tối thiểu |
| in05-09 | Vì sao em chọn công ty chúng tôi | 7 | 5 | 7 | 7 | 5 | 5 | 6 | 6 | **6.0** | L3→L4 | I | P2 | [P2 concept] Câu thiên về slogan; thiếu hướng dẫn tìm điểm cụ thể (nguồn nào, 3 quan sát gì) khi chỉ có 1 giờ |
| in05-10 | Em có câu hỏi gì cho chị không | 6 | 4 | 7 | 6 | 4 | 4 | 5 | 5 | **5.1** | L2→L3 | I | P2 | [P2 Q2] Quan điểm bị trình bày như quy tắc tuyệt đối; nhiều công ty cho phép hỏi và ứng viên cần biết sớm làm việc từ xa |
| L:0 | Vì sao trường đại học cũng phải làm marketing? | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.5** | L2→L3 | I | P2 | [P2 closer] Khẳng định tuyệt đối không số liệu, không phải trường nào cũng đúng (thi tuyển Việt Nam thường rơi ở bước nộp hồ sơ) |
| L:1 | Vì sao menu quán cà phê luôn có một món đắt vô lý? | 7 | 5 | 7 | 6 | 5 | 5 | 5 | 7 | **5.9** | L2→L3 | I | P2 | [P2 example] Ví dụ nói "mỏ neo" nhưng thực chất là decoy/đối xứng giá; không nêu Ariely (The Economist) hay Kahneman-Tversky |
| L:2 | Cái tên nào đang làm việc thay bạn? | 6 | 5 | 6 | 6 | 5 | 6 | 5 | 6 | **5.6** | L2→L3 | M | P2 | [P2 real] Bỏ qua việc HEATTECH là công nghệ sợi thật hợp tác Toray; chỉ đặt tên không đủ, sản phẩm thật mới giữ được tên |
| L:3 | Bạn có bao nhiêu media mà không phải trả tiền? | 6 | 5 | 6 | 7 | 5 | 4 | 5 | 6 | **5.5** | L3→L3 | I | P2 | [P2 real] Phần real chỉ là danh sách, không phải case; không có số liệu hay kết quả |
| L:4 | Thay tính từ bằng dữ kiện | 7 | 6 | 7 | 7 | 5 | 7 | 6 | 6 | **6.4** | L3→L4 | K | P3 | [P2 closer] Dùng "insight" sai nghĩa (đây là fact/proof, không phải insight người dùng) |
| L:5 | Câu hỏi khảo sát tệ nhất trong marketing | 7 | 5 | 6 | 7 | 6 | 4 | 5 | 6 | **5.8** | L3→L4 | I | P2 | [P2 why] "Đắt hơn" khó hiểu: ý là giá trị hơn, không phải chi phí cao |
| L:6 | Cái xô thủng | 6 | 5 | 7 | 6 | 5 | 5 | 5 | 6 | **5.6** | L3→L4 | I | P2 | [P2 why] Khẳng định tuyệt đối, retention cũng có chi phí |
| L:7 | Che logo đi, bạn còn nhận ra ai? | 6 | 5 | 6 | 6 | 5 | 4 | 5 | 6 | **5.4** | L3→L3 | M | P2 | [P2 real] Mô tả quá chung, không chỉ campaign cụ thể; không kiểm chứng |
| L:8 | PR không phải là đăng báo | 6 | 5 | 6 | 6 | 6 | 6 | 5 | 7 | **5.9** | L3→L4 | K | P3 | [P2 real] Đây là quảng cáo trả tiền tạo ra earned media; bài chưa nói rõ nên dễ nhầm paid với earned |
| L:9 | Content không phải là lịch đăng bài | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.5** | L3→L4 | I | P3 | Khung 3 việc (dạy, giải trí, chứng minh) không giải thích cách chọn; "Người theo dõi vì tò mò ở lại lâu hơn" không bằng chứng. |
| L:10 | Giảm giá là một khoản vay | 6 | 5 | 6 | 6 | 6 | 5 | 5 | 6 | **5.6** | L3→L4 | I | P1 | [P1 try] Không cho biên lợi nhuận gộp nên người học không tính được; công thức hoà vốn không được nêu |
| L:11 | Ba câu hỏi thay cho một bản nghiên cứu | 6 | 5 | 7 | 7 | 5 | 4 | 5 | 6 | **5.6** | L3→L4 | M | P2 | [P2 real] Chỉ hỏi người đã mua: thiên lệch người sống sót, bỏ qua người không mua (L:20 lại hỏi người chưa mua) |
| L:12 | Quảng cáo hiệu suất không tạo ra nhu cầu | 6 | 6 | 6 | 6 | 6 | 4 | 5 | 6 | **5.6** | L4→L4 | I | P2 | [P2 closer] Lời khuyên rủi ro không có cơ chế kiểm soát; nên dùng geo holdout |
| L:13 | Ra mắt sản phẩm là một bài toán thứ tự | 5 | 4 | 6 | 6 | 5 | 4 | 4 | 5 | **4.9** | L2→L4 | M | P2 | [P2 real] Lặp lại ví dụ L:2 y hệt; không liên quan trực tiếp tới "thứ tự" ra mắt (ai biết trước, biết gì) |
| L:14 | Thuật toán không phải khán giả của bạn | 5 | 5 | 6 | 5 | 5 | 5 | 5 | 6 | **5.3** | L2→L3 | I | P2 | [P2 idea] Tiêu đề nói thuật toán nhưng nội dung chuyển sang tính cách nhân vật; không giải thích cơ chế giữ chân (watch time, completion) |
| L:15 | Quảng cáo bị bỏ qua trước khi bị đọc | 5 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.4** | L2→L3 | I | P1 | [P1 try] Logic ngược: nếu quảng cáo yếu đi sau khi cắt thì phần bị cắt CHÍNH LÀ thứ gánh việc |
| L:16 | Đổi logo hiếm khi là câu trả lời | 6 | 5 | 6 | 6 | 6 | 5 | 5 | 6 | **5.6** | L3→L4 | K | P3 | [P2 idea] Tuyệt đối "gần như không bao giờ"; vài trường hợp logo/thiết kế gây hại thật (Gap 2010) |
| L:17 | Lựa chọn mặc định là lựa chọn được chọn | 6 | 5 | 6 | 6 | 6 | 4 | 5 | 6 | **5.5** | L3→L4 | I | P2 | [P2 real] Không nêu nghiên cứu (Johnson & Goldstein, hiến tạng) hay số |
| L:18 | Chỉ số làm bạn thấy vui, không làm bạn giỏi hơn | 5 | 5 | 6 | 6 | 6 | 4 | 5 | 6 | **5.4** | L3→L4 | I | P2 | [P2 why] Sai nhẹ: follower có thể giảm; reach/impressions theo kỳ không tích luỹ |
| L:19 | Bao nhiêu lần thì đủ để được nhớ? | 5 | 5 | 6 | 5 | 5 | 4 | 4 | 6 | **5.0** | L3→L4 | I | P1 | [P1 idea/title] Tiêu đề đặt câu hỏi nhưng bài không bao giờ trả lời (không nêu effective frequency 3+, reach vs frequency) |
| L:20 | Đối thủ lớn nhất là "thôi không làm gì cả" | 7 | 6 | 7 | 7 | 7 | 5 | 6 | 7 | **6.5** | L4→L4 | K | P3 | Real là ví dụ chung, không case có số; nhưng ý cốt lõi chắc. |
| L:21 | Brief một trang | 7 | 6 | 7 | 7 | 6 | 5 | 6 | 6 | **6.3** | L3→L5 | K | P3 | [P3 idea] Tiêu đề "một trang" nhưng nội dung là "sáu dòng"; nhất quán hơn nếu chọn một |
| L:22 | "Đắt quá" hiếm khi nói về tiền | 6 | 6 | 6 | 7 | 6 | 4 | 6 | 6 | **5.9** | L3→L4 | K | P3 | Real là mô tả chung chung "Cùng một mức giá..." không có case; trùng một phần L:1 và L:10. |
| L:23 | Thuê KOL là thuê khán giả hay thuê uy tín? | 6 | 5 | 6 | 6 | 6 | 4 | 5 | 6 | **5.5** | L3→L4 | I | P2 | [P2 real] Khái quát hoá macro vs micro, không số liệu; thiếu rủi ro follower ảo, disclosure #ad |
| L:24 | Chọn kênh phân phối là chọn khách hàng | 5 | 5 | 6 | 6 | 5 | 4 | 4 | 5 | **5.0** | L3→L4 | I | P1 | [P1 closer] Mâu thuẫn trực tiếp P:physical-availability (mở rộng phân phối là lõi tăng trưởng) và tuyệt đối hoá |
| L:25 | Nhất quán nhìn từ bên trong luôn giống nhàm chán | 5 | 4 | 6 | 6 | 5 | 3 | 4 | 5 | **4.8** | L2→L3 | M | P2 | [P2 why] Nhân quả đảo/thiên lệch người sống sót: nhớ rõ vì lặp lại hay vì lớn? |
| P:segmentation | Segmentation | 6 | 5 | 7 | 7 | 6 | 5 | 5 | 6 | **5.9** | L3→L4 | I | P3 | [P2 brand] Khẳng định về chiến lược nội bộ Highlands, không nguồn |
| P:targeting | Targeting | 6 | 5 | 6 | 6 | 6 | 5 | 5 | 6 | **5.6** | L3→L4 | K | P3 | [P2 brand] Diễn giải triết lý "no brand" như chiến lược targeting, không nguồn |
| P:positioning | Positioning | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 5 | **5.4** | L3→L4 | I | P2 | [P2 ex] "Third place" là khái niệm Oldenburg, không phải "định vị" chuẩn; không nêu frame of reference/POD |
| P:brand-equity | Brand Equity | 6 | 4 | 6 | 5 | 5 | 3 | 4 | 5 | **4.8** | L2→L4 | I | P2 | [P2 ex] Ví dụ trừu tượng, không case cụ thể, không đo |
| P:awareness | Awareness | 6 | 4 | 6 | 5 | 5 | 4 | 4 | 5 | **4.9** | L2→L3 | I | P3 | [P3 ex/brand] ex và brand cùng 1 ví dụ (Biti's), thừa |
| P:salience | Salience | 6 | 4 | 6 | 6 | 5 | 4 | 4 | 5 | **5.0** | L2→L3 | M | P2 | [P2 overlap] Trùng gần như hoàn toàn P:mental-availability |
| P:distinctive-assets | Distinctive Assets | 6 | 5 | 6 | 6 | 6 | 5 | 5 | 6 | **5.6** | L3→L4 | I | P3 | [P3 mistake] Khẳng định không nguồn (Romaniuk/Sharp) |
| P:consumer-insight | Consumer Insight | 6 | 5 | 6 | 6 | 6 | 6 | 5 | 6 | **5.8** | L3→L5 | K | P3 | [P2 one] Tiêu chí "hơi bị lộ" quá chủ quan; insight tốt vẫn khiến gật gù |
| P:jobs-to-be-done | Jobs To Be Done | 6 | 5 | 6 | 6 | 5 | 5 | 5 | 6 | **5.5** | L3→L4 | I | P3 | [P2 ex] Không phải ví dụ Christensen (milkshake); diễn giải tự do, không nguồn |
| P:funnel | Funnel | 5 | 6 | 5 | 6 | 6 | 3 | 5 | 5 | **5.1** | L3→L4 | I | P2 | [P2 ex] CTR 12% không thực tế (thường 1-2%); ex lẫn lời khuyên dài, rối |
| P:cac | CAC | 7 | 4 | 6 | 6 | 5 | 3 | 4 | 4 | **4.9** | L3→L4 | I | P2 | [P3 brand] Không phải thương hiệu |
| P:ltv | LTV | 6 | 4 | 6 | 5 | 5 | 3 | 4 | 4 | **4.6** | L3→L4 | I | P2 | [P2 ex] Không cho giá trị đơn nên không tính ra số |
| P:retention | Retention | 6 | 4 | 6 | 6 | 5 | 5 | 4 | 5 | **5.1** | L3→L4 | I | P2 | [P2 ex] Wrapped chủ yếu là viral/engagement, ví dụ trùng P:referral |
| P:referral | Referral | 5 | 4 | 6 | 5 | 5 | 5 | 4 | 5 | **4.9** | L2→L4 | I | P1 | [P1 one/counter] Tuyệt đối hoá; referral có thưởng như Dropbox vẫn hiệu quả, counter "nhận 20k" quá phủ định |
| P:conversion | Conversion | 5 | 4 | 6 | 5 | 5 | 3 | 4 | 5 | **4.6** | L3→L4 | I | P2 | [P2 brand] Không đúng thực tế (trang UNIQLO có nhiều lựa chọn màu/size/CTA) |
| P:pricing | Pricing | 5 | 4 | 6 | 5 | 5 | 4 | 4 | 5 | **4.8** | L3→L4 | I | P2 | [P2 drill] Lời khuyên rủi ro không có nhóm kiểm soát/ độ co giãn |
| P:social-proof | Social Proof | 6 | 4 | 6 | 6 | 5 | 4 | 4 | 5 | **5.0** | L2→L3 | I | P3 | [P3 one] Cialdini chưa nêu nguồn |
| P:scarcity | Scarcity | 6 | 4 | 6 | 6 | 5 | 4 | 4 | 5 | **5.0** | L2→L3 | I | P3 | [P3 brand] Không phải thương hiệu |
| P:category-entry-point | Category Entry Point | 7 | 5 | 6 | 7 | 6 | 5 | 5 | 6 | **5.9** | L3→L4 | K | P3 | [P3 brand] Không nguồn |
| P:share-of-voice | Share of Voice | 6 | 5 | 5 | 5 | 6 | 5 | 5 | 5 | **5.3** | L3→L4 | I | P2 | [P2 ex] Ngoặc đơn rối, gộp earned media/ESOV |
| P:mental-availability | Mental Availability | 7 | 5 | 6 | 6 | 6 | 4 | 5 | 5 | **5.5** | L3→L4 | I | P2 | Trùng với P:salience và L:25. |
| P:physical-availability | Physical Availability | 6 | 4 | 6 | 5 | 5 | 4 | 4 | 5 | **4.9** | L2→L3 | I | P2 | [P3 d] Phân loại sai nhóm (nên là strategy/distribution) |

---

## 3. Top 30 bài yếu nhất cần sửa trước launch

Xếp theo chỉ số yếu tổng hợp (điểm thấp, lỗi P0/P1 thật, REWRITE/MERGE). Lỗi "lộ đáp án bằng hình thức" của `ob03` xử lý hàng loạt ở 4.1 nên chỉ tính nhẹ ở đây.

**1.** **B:kn02-05** — Bán vào trường học, văn phòng hay bệnh viện? · tổng 5.0 · L2→L4 · REWRITE
- *P1 example/concept* — «5.120 hộp mỗi tháng. Người quyết định là phòng hành chính» → Chỉ nhân ra số hộp; không có doanh thu, lãi, chi phí tủ lạnh, nhân sự châm hàng, thất thoát tự phục vụ, hay thời gian hoàn vốn. 'Kênh đặc biệt' được chọn chỉ theo cảm tính khớp khách mục tiêu. **Sửa:** Thêm tính toán 5.120 hộp × lãi trừ chi phí tủ và nhân sự, để đối chiếu với kênh tạp hoá.
- **Đề xuất/viết lại:** Viết lại thành bài so sánh 3 kênh bằng bảng: khách mục tiêu, người gác cổng, chi phí vào, doanh số/tháng, lãi sau chi phí. Hỏi chọn kênh nào khi lãi 40 công ty chỉ 3 triệu/tháng.

**2.** **B:in02-08** — Bánh trung thu Kido: người mua có phải người ăn? · tổng 4.9 · L2→L4 · REWRITE
- *P2 case* — «Bạn được giao phân tích: ai là khách hàng thật của hộp bánh?» → tiêu đề hứa case Kido nhưng ví dụ và quiz chỉ nói chung về bánh biếu, không có dữ kiện về Kido **Sửa:** thêm dữ kiện công khai về Kido (quầy, mẫu hộp, giá công bố) hoặc đổi tiêu đề thành khái quát
- *P3 Q4* — «nhiều đơn biếu được đặt trước khá lâu» → giả định đưa như dữ kiện **Sửa:** đưa vào đề bài làm dữ kiện
- **Đề xuất/viết lại:** Viết lại ví dụ: 'Phòng hành chính mua 40 hộp: ai duyệt? ai ký? ai nhận? Mỗi người lo gì? Thông điệp riêng cho từng người.'

**3.** **B:ob04-01** — Quán cà phê của bạn đang cạnh tranh với ai — quán bên kia đường hay ly trà sữa? · tổng 5.6 · L2→L4 · REWRITE → B:ob03-01
- *P0 Q4* — «Đối thủ gián tiếp bán sản phẩm khác nhưng giải cùng nhu cầu» → Theo chính định nghĩa này, nước lọc bình văn phòng (có bán, giải khát) là gián tiếp (phương án b), nhưng đáp án chấm là thay thế (d). Hai phương án cùng hợp định nghĩa; why.a còn nói sai 'không phải sản phẩm bán lẻ' **Sửa:** Đổi ví dụ thành thứ rõ ràng không mua: 'nước máy/bình tự mang theo'; hoặc sửa định nghĩa phân biệt ‘có mua của hãng khác’ vs ‘tự làm/tự có’
- *P1 Q2* — «Nhắm vào nhóm lớn nhất (45%) bằng cách giải đúng nhu cầu» → Ví dụ trong bài nói chưa biết vì sao khách đi (vị, mới lạ, chỗ ngồi) nhưng Q2 chốt ngay 'món ít đắng'; nhảy từ phân bổ nhóm sang giải pháp **Sửa:** Thêm bước phỏng vấn lý do; đáp án đúng là 'xác định lý do trước, thử món'
- **Đề xuất/viết lại:** Viết lại bài: bỏ ba vòng, tập trung vào 'nhận bằng chứng chuyển đổi từ khách bỏ đi' và nhóm theo job. Ví dụ: 'Hỏi 20 khách đã bỏ: lần cuối bạn mua gì thay, vì sao?'.

**4.** **L:25** — Nhất quán nhìn từ bên trong luôn giống nhàm chán · tổng 4.8 · L2→L3 · MERGE → P:mental-availability
- *P2 why* — «Những thương hiệu bạn nghĩ là "nhất quán đến phát chán" chính là những cái bạn nhớ rõ nhất» → Nhân quả đảo/thiên lệch người sống sót: nhớ rõ vì lặp lại hay vì lớn? **Sửa:** Thêm cơ chế: lặp lại tạo trí nhớ (Sharp)
- **Đề xuất/viết lại:** Gộp vào P:mental-availability; thêm case Coca-Cola/Nike "Just do it" lặp 30 năm.

**5.** **L:13** — Ra mắt sản phẩm là một bài toán thứ tự · tổng 4.9 · L2→L4 · MERGE → L:2
- *P2 real* — «UNIQLO không ra mắt "áo giữ nhiệt", họ ra mắt HEATTECH» → Lặp lại ví dụ L:2 y hệt; không liên quan trực tiếp tới "thứ tự" ra mắt (ai biết trước, biết gì) **Sửa:** Dùng case khác có trình tự thật (beta -> early adopter -> đại chúng)
- **Đề xuất/viết lại:** Gộp vào L:2 hoặc viết lại với case có trình tự, ví dụ Superhuman, Notion hoặc Momo ra mắt theo nhóm.

**6.** **P:salience** — Salience · tổng 5.0 · L2→L3 · MERGE → P:mental-availability
- *P2 overlap* — «Khả năng bạn bật ra trong đầu đúng lúc người ta cần mua» → Trùng gần như hoàn toàn P:mental-availability **Sửa:** Gộp
- **Đề xuất/viết lại:** Gộp salience + mental availability thành 1 bài.

**7.** **B:gt02-08** — Thiếu dữ liệu một nhánh thì làm sao? · tổng 5.4 · L3→L4 · REWRITE
- *P1 situation* — «chỉ có tổng tiền đại lý nhập hàng, không biết đại lý bán ra bao nhiêu» → Doanh thu của hãng chính là tiền đại lý nhập (sell-in), nên nhánh này thực ra có số; bài lẫn sell-in và sell-out nên phép trừ 'ước' vô nghĩa **Sửa:** Đặt bài về sell-out (đại lý bán ra tạp hoá) hoặc về nhánh thực sự không có số, ví dụ doanh số qua phân phối cấp hai
- *P2 concept* — «lấy tổng trừ các nhánh đã biết» → Phần dư chứa cả sai số đo, các nhánh chưa liệt kê; không nêu rủi ro này **Sửa:** Ghi: phần dư = nhánh thiếu + sai số + nhánh bị sót; cần kiểm chứng độc lập
- *P2 Q6* — «Ghi "khoảng 180 triệu, ước bằng phép trừ, chưa kiểm chứng"» → Đáp án đúng dài nhất, mô tả đầy đủ, lộ **Sửa:** Làm các phương án cùng độ dài
- **Đề xuất/viết lại:** Viết lại tình huống: 'Hãng có số đại lý nhập nhưng không có số đại lý bán ra; doanh thu nhập giảm 180 triệu có thể là tồn kho dồn chứ chưa phải sức mua giảm.' Khi đó bài thành bài về sell-in vs sell-out.

**8.** **P:ltv** — LTV · tổng 4.6 · L3→L4 · IMPROVE
- *P2 ex* — «Biên 40%, mua 4 lần/năm, ở lại 3 năm → LTV tính được» → Không cho giá trị đơn nên không tính ra số **Sửa:** Thêm AOV 300.000: 0,4×300k×4×3=1,44 triệu
- *P2 drill* — «tăng tỉ lệ giữ chân thêm 5%» → Mơ hồ 5 điểm % hay 5% tương đối; không nguồn (Reichheld) **Sửa:** Nêu rõ
- **Đề xuất/viết lại:** Thêm công thức LTV = AOV×biên×tần suất×tuổi thọ.

**9.** **P:referral** — Referral · tổng 4.9 · L2→L4 · IMPROVE
- *P1 one/counter* — «Chỉ xảy ra khi việc giới thiệu làm người giới thiệu trông tốt hơn» → Tuyệt đối hoá; referral có thưởng như Dropbox vẫn hiệu quả, counter "nhận 20k" quá phủ định **Sửa:** Phân biệt referral có thưởng vs word-of-mouth tự nhiên
- *P2 ex* — «Wrapped» → Trùng P:retention **Sửa:** Đổi ví dụ
- **Đề xuất/viết lại:** Thêm Dropbox và công thức K.

**10.** **P:conversion** — Conversion · tổng 4.6 · L3→L4 · IMPROVE
- *P2 brand* — «Trang sản phẩm của UNIQLO: một quyết định mỗi màn hình» → Không đúng thực tế (trang UNIQLO có nhiều lựa chọn màu/size/CTA) **Sửa:** Thay bằng ví dụ có nguồn
- *P2 one* — «Thường tăng nhanh nhất bằng cách bớt đi» → Khái quát hoá **Sửa:** Nêu điều kiện
- **Đề xuất/viết lại:** Thêm quy trình CRO: friction -> hypothesis -> test.

**11.** **B:tu06-07** — Muốn dừng chiến dịch nhưng đã ký hợp đồng với KOL · tổng 5.3 · L3→L5 · IMPROVE
- *P0 Q3/example* — «Tổng chi tối đa 55 triệu thay vì 80 triệu» → Hợp đồng 80, đã trả 40, còn video 3 và 4 chưa trả. Nếu làm video 3 (đổi nội dung) rồi livestream, tổng vẫn ~80; 55 chỉ đúng nếu dừng và không trả video 3. Q3 hỏi 'tổng chi tối đa' nhưng 40+15 bỏ qua phí video làm thêm **Sửa:** Nói rõ: nếu dừng ngay sau video 3 thì tổng 40 + 20 (video 3) + 15 = 75; nếu không dừng 80. Hoặc đổi câu hỏi thành 'chi phí thoát nếu dừng ngay'
- *P1 concept/situation* — «số đơn từ mã giảm giá riêng của KOL rất thấp» → Coi mã giảm giá là thước đo duy nhất; KOL mang lại nhận biết/tìm kiếm, mâu thuẫn tu06-03 **Sửa:** Thêm lượt tìm kiếm, nhận biết, đơn không qua mã
- **Đề xuất/viết lại:** Viết lại Q3: 'Còn 2 video x 20 triệu. Phương án A làm đủ; B dừng sau video 3 và trả thêm 15 triệu thoả thuận. Nếu video 3 hứa 40 đơn lãi 100.000, chọn A hay B?' để tính được.

**12.** **P:brand-equity** — Brand Equity · tổng 4.8 · L2→L4 · IMPROVE
- *P2 ex* — «Cùng một chiếc áo phông, gắn tên khác nhau» → Ví dụ trừu tượng, không case cụ thể, không đo **Sửa:** Dùng blind test Pepsi/Coke hoặc giá Apple vs OEM
- **Đề xuất/viết lại:** Thêm 3 cách đo: price premium, repeat rate, sẵn sàng giới thiệu.

**13.** **P:pricing** — Pricing · tổng 4.8 · L3→L4 · IMPROVE
- *P2 drill* — «Tăng giá 10% trên một dòng sản phẩm và đo lượng bán» → Lời khuyên rủi ro không có nhóm kiểm soát/ độ co giãn **Sửa:** Thêm A/B theo vùng/khách hàng
- **Đề xuất/viết lại:** Thêm độ co giãn và van Westendorp.

**14.** **B:tp02-09** — Quảng cáo chỉ nói lợi ích, không nói tình huống — sai ở đâu? · tổng 5.4 · L2→L3 · MERGE → B:tp02-04

- **Đề xuất/viết lại:** Gộp vào tp02-04 làm phần 'Sửa một câu chốt toàn lợi ích' hoặc đặt trước bài 04. Ví dụ bài tập: viết lại 3 câu chốt của ổ cắm thông minh cho ba cửa vào khác nhau.

**15.** **B:tp07-07** — Câu 42 chữ này còn lại bao nhiêu nếu bỏ chữ thừa? · tổng 5.4 · L2→L3 · MERGE → B:tp07-09
- *P2 Q3* — «d) "An toàn cho làn da", rồi thêm bằng chứng» → 'An toàn cho làn da' vẫn là tuyên bố rỗng/khó kiểm và có thể gây rủi ro pháp lý với mỹ phẩm; đáp án đúng mà vẫn mơ hồ **Sửa:** Đáp án nên là 'đã thử trên 50 người da nhạy cảm' (có bằng chứng)
- *P2 Q7* — «c) Tính từ đứng trước danh từ là chữ thừa» → Phương án nhiễu sai ngữ pháp tiếng Việt (tính từ thường đứng sau), nên quá yếu **Sửa:** Đổi thành 'Chữ nào quá dài là chữ thừa'
- **Đề xuất/viết lại:** Gộp vào tp07-09 làm bước thứ 4 'cắt chữ thừa' kèm một bài tập. Hoặc thêm cạnh tranh: câu cần giọng trang trọng (thông báo ngân hàng) cắt thế nào.

**16.** **P:awareness** — Awareness · tổng 4.9 · L2→L3 · IMPROVE
- *P3 ex/brand* — «Ai ở Việt Nam cũng biết Biti's» → ex và brand cùng 1 ví dụ (Biti's), thừa **Sửa:** Đổi brand sang ví dụ khác
- **Đề xuất/viết lại:** Phân biệt unaided/aided awareness và top-of-mind.

**17.** **P:cac** — CAC · tổng 4.9 · L3→L4 · IMPROVE
- *P3 brand* — «Thương hiệu D2C nào cũng sống hoặc chết bởi tỉ số này» → Không phải thương hiệu **Sửa:** Dùng ví dụ thật
- **Đề xuất/viết lại:** Ghép với LTV thành bài LTV:CAC; thêm payback.

**18.** **P:physical-availability** — Physical Availability · tổng 4.9 · L2→L3 · IMPROVE
- *P3 d* — «media» → Phân loại sai nhóm (nên là strategy/distribution) **Sửa:** Đổi nhóm
- **Đề xuất/viết lại:** Thêm availability số và dung hoà với L:24.

**19.** **B:ob02-04** — Giá theo gram: cách khách so hai gói hàng · tổng 5.5 · L2→L3 · MERGE → B:ob02-09
- *P2 Q3* — «337.5 ±0.2 đ/g» → Situation ghi nhãn '338đ/g'; người học nhập 338 sẽ bị chấm sai dù khớp nhãn. **Sửa:** Tăng tolerance lên ±0.6 hoặc ghi 'làm tròn số nguyên'.
- *P2 concept* — «Gói lớn thường rẻ hơn theo gram» → Không nói đến trường hợp gói lớn đắt hơn mỗi gram (bulk penalty); câu 'gói lớn luôn tốt' chỉ được nhắc ở Mistakes. **Sửa:** Thêm một ví dụ ngược.
- *P2 Q2* — «giá dưới ngưỡng 100.000đ để khách dám thử» → Ngưỡng 100.000đ tâm lý nêu như sự thật, không nguồn. **Sửa:** Nêu là giả thuyết cần thử.
- **Đề xuất/viết lại:** Gộp vào bài 02-09 thành 'Đọc giá thật: đơn giá và khuyến mãi'. Thêm ca gói lớn đắt hơn. Ví dụ: 'Gói 500g giá 190.000đ vs 2×250g giá 89.000đ: gói nào rẻ hơn mỗi gram?'

**20.** **B:dl09-09** — Báo cáo tuần dài 3 trang — ai đọc? · tổng 5.5 · L3→L3 · MERGE → B:dl09-01
- *P2 Q3* — «Doanh thu tuần đạt 312 triệu, mục tiêu tuần là 300 triệu. Tỉ lệ hoàn thành» → Cùng dạng phép chia % hoàn thành đã có ở dl09-01 Q3, lặp **Sửa:** Thay bằng câu đo năng lực chọn 3 ưu tiên khi có 10 vấn đề
- **Đề xuất/viết lại:** Gộp vào dl09-01 thành 'Kết luận trước + khung 5 dòng'. Nếu giữ, thêm bài tập: cho 8 sự kiện tuần, chọn 1 rủi ro cho dòng 3.

**21.** **B:in02-05** — Phúc Long giữ gì khi mở rộng sang kênh mới? · tổng 5.0 · L2→L4 · IMPROVE
- *P2 Q1* — «Không có căn cứ; người đi cửa hàng tiện lợi vẫn mua đồ uống.» → phương án a (khách kênh mới có thể không hợp) là rủi ro có thật, bị loại bằng một khẳng định; đáp án 'đúng' là điều hiển nhiên **Sửa:** đổi nhiễu a thành lỗi thật rõ hơn (thuê quầy đắt) hoặc bỏ 'rủi ro lớn nhất'
- *P2 Q4* — «nhiều người lần đầu biết đến thương hiệu qua gói trà» → khẳng định như sự thật, không nguồn; phương án d cũng dài nhất **Sửa:** nói 'giả sử, một nhóm khách'
- **Đề xuất/viết lại:** Thêm cách xác định lõi: khảo sát 10 khách 'nếu mất món X bạn có còn đến?' hoặc xếp món theo mua lặp lại.

**22.** **B:in02-09** — Trung Nguyên bán cà phê hay bán một ý nghĩa? · tổng 5.0 · L2→L4 · IMPROVE
- *P2 concept* — «Một thương hiệu có thể gắn sản phẩm với một ý nghĩa lớn hơn công dụng» → hai ý khác nhau (ý nghĩa thương hiệu; danh mục theo dịp) bị ghép, quiz Q2–Q4 chỉ về danh mục, tiêu đề hứa ý nghĩa; không nêu hạn chế của Trung Nguyên thực tế **Sửa:** tách thành hai bài hoặc nối bằng một ví dụ: dòng nào mang ý nghĩa, dòng nào mang dịp
- *P3 Q7* — «Kể thêm tin đồn nội bộ chưa kiểm chứng» → phương án sai quá rõ, không đo kỹ năng **Sửa:** thay bằng lỗi tinh tế: dẫn doanh số G7 không nguồn
- **Đề xuất/viết lại:** Thêm phản ví dụ: có thương hiệu có ý nghĩa lớn nhưng vẫn mất thị phần khi đối thủ vượt về phân phối/giá. Hỏi người học vì sao.

**23.** **P:social-proof** — Social Proof · tổng 5.0 · L2→L3 · IMPROVE
- *P3 one* — «Càng giống mình càng có sức nặng» → Cialdini chưa nêu nguồn **Sửa:** Dẫn nguồn
- **Đề xuất/viết lại:** Thêm các dạng: chuyên gia, đám đông, bạn bè.

**24.** **P:scarcity** — Scarcity · tổng 5.0 · L2→L3 · IMPROVE
- *P3 brand* — «Bộ sưu tập giới hạn của các thương hiệu thời trang» → Không phải thương hiệu **Sửa:** Dùng ví dụ cụ thể như Supreme drop
- **Đề xuất/viết lại:** Thêm nguồn và ví dụ drop.

**25.** **B:ob04-08** — Bảng so sánh đối thủ một trang: giữ gì, bỏ gì? · tổng 5.4 · L2→L4 · IMPROVE
- *P1 Q2* — «4 đối thủ chính, 5 tiêu chí khách chọn, ba dòng kết» → Đáp án đúng chép nguyên văn từ ví dụ, dài và cụ thể nhất; nhiễu a, b, d rất yếu **Sửa:** Thêm nhiễu hợp lý: '3 đối thủ, 8 tiêu chí' hoặc '4 đối thủ, 5 tiêu chí nhưng không có kết luận'
- **Đề xuất/viết lại:** Gộp với ob04-02 hoặc thêm bước 'chọn tiêu chí từ 10 review'. Ví dụ bài tập: 'Từ 20 review balo, rút 5 tiêu chí khách nhắc nhiều nhất'.

**26.** **B:tu06-06** — Đạt mục tiêu sau 2 tuần thay vì 4: dừng hay chạy nốt · tổng 5.4 · L3→L4 · IMPROVE
- *P2 example* — «đạt 104% mục tiêu với 47% ngân sách» → Đã chi 28 + 5 triệu danh sách chờ = 33 triệu (55%), nên 47% chỉ đúng nếu bỏ 5 triệu; mâu thuẫn với '27 triệu giữ lại' **Sửa:** Báo 55% hoặc nói rõ 47% là trước phần danh sách chờ
- *P1 concept* — «125 đăng ký» → Đăng ký khác đóng học phí/nhập học; không tính tỉ lệ rụng nên dừng ở 125/130 có thể thiếu hoặc thừa **Sửa:** Thêm tỉ lệ ghi danh thực (vd 85%) và cân nhắc dự phòng
- **Đề xuất/viết lại:** Viết lại Q3: 'Lớp 130 chỗ, 125 đăng ký, 80% đóng tiền thật; cần thêm bao nhiêu lead để đủ 130 và chi bao nhiêu với CPA 224.000?' để có tính toán thật.

**27.** **B:tu06-09** — Dừng chương trình khuyến mãi: báo khách và đối tác thế nào · tổng 5.1 · L2→L4 · IMPROVE → B:tu06-07
- *P2 Q3* — «40% có từ 5 dấu trở lên và được đổi một phần nhỏ giá vốn 25.000đ» → Nhóm 5 dấu trở lên gồm cả người đủ 10 dấu sẽ nhận 'phần lớn' (đắt hơn); phép nhân 1.200 × 25.000 đánh giá thấp **Sửa:** Tách hai nhóm 5–9 và ≥10 dấu với giá vốn khác nhau
- *P2 concept* — «báo trước đủ thời gian (ví dụ 30 ngày)» → Chương trình tích điểm có thể thuộc khuyến mại có quy định thông báo/đăng ký; bài chỉ nêu mốc 'gợi ý' **Sửa:** Thêm lưu ý kiểm tra quy định và điều khoản chương trình
- **Đề xuất/viết lại:** Thêm quyết định có số: 'Duy trì thêm 6 tháng tốn 180 triệu, quy đổi nhanh tốn 30–45 triệu; thông báo kịp thời ảnh hưởng gì tới giữ chân?'

**28.** **B:in05-10** — Em có câu hỏi gì cho chị không · tổng 5.1 · L2→L3 · IMPROVE
- *P2 Q2* — «Chế độ nên để vòng sau; hỏi đầu tiên cho tín hiệu sai.» → Quan điểm bị trình bày như quy tắc tuyệt đối; nhiều công ty cho phép hỏi và ứng viên cần biết sớm làm việc từ xa **Sửa:** Nêu là 'cân nhắc thời điểm: ưu tiên câu về công việc trước, chế độ hỏi sau'
- *P2 Q1* — «Ứng viên chưa thực sự quan tâm hoặc chưa tìm hiểu công việc» → Khẳng định chung 'thường bị hiểu' mà không có nguồn; có thể đúng nhưng cực đoan **Sửa:** Đổi cách hỏi: 'rủi ro lớn nhất của việc không hỏi gì là gì'
- **Đề xuất/viết lại:** Thêm góc ứng viên đánh giá công ty (red flag) và câu hỏi theo vai người phỏng vấn. Ví dụ: 'Nếu trả lời mơ hồ về ba tháng đầu, đó là tín hiệu quy trình onboarding yếu.'

**29.** **P:retention** — Retention · tổng 5.1 · L3→L4 · IMPROVE
- *P2 ex* — «Wrapped của Spotify là một nghi lễ giữ chân» → Wrapped chủ yếu là viral/engagement, ví dụ trùng P:referral **Sửa:** Dùng ví dụ khác
- **Đề xuất/viết lại:** Hợp nhất với L:6 và dạy đọc cohort.

**30.** **B:tu06-05** — Bão lũ đang xảy ra, chiến dịch vui nhộn có nên tạm dừng · tổng 5.3 · L2→L4 · IMPROVE
- *P2 quiz* — «Làm thật qua kênh đáng tin, nói không đặt thương hiệu lên trung tâm» → Cả 7 câu đều có một đáp án đạo đức hiển nhiên, các phương án nhiễu quá lộ (băng rôn lớn, mua một tặng một) **Sửa:** Thêm tình huống ranh giới: vùng bão có đại lý cần hàng, hoặc bài hẹn giờ ở vùng chưa ảnh hưởng
- **Đề xuất/viết lại:** Thêm checklist 60 phút đầu: (1) pause chiến dịch có giọng vui, (2) rà bài hẹn giờ, (3) khóa từ khoá nhạy cảm, (4) giám sát bình luận. Viết thêm ca: 'bão ở miền Trung, đại lý miền Nam vẫn cần hàng'.


---

## 4. Lỗ hổng kiến thức và cấu trúc toàn chương trình

### 4.1 Lỗi hệ thống của quiz (đo bằng máy trên 4.176 câu MCQ)

| Hiện tượng | Số liệu | Ghi chú |
|---|---|---|
| **Phương án đúng là cái duy nhất không mở đầu bằng "Vì/Do/Để/Nhờ"** (≥2 nhiễu có) | **104 câu (2,5%)** | Tập trung: ob03 (10), kh02 (9), kn02 (8), tu04 (7), dl05 (5), tu03 (5), dl04 (4), kh05 (4), ob02 (4), tu05 (4), in05 (3), kh09 (3), tp08 (3), tp10 (3), in01 (2), kh06 (2), kh08 (2), kh10 (2), kh11 (2), kn04 (2), kn06 (2), kn11 (2), tn06 (2), tp04 (2), dl01 (1), dl02 (1), dl06 (1), kh07 (1), kn08 (1), kn12 (1), ob01 (1), ob08 (1), tn03 (1), tu01 (1), tu02 (1), tu06 (1). Người chấm của `ob03` gắn P0 cho 10/10 bài; ở `kh02`, `kn02`, `tu03`, `tu04` hiện tượng tương tự chưa được gắn P0 — **cần lint tự động**, không chờ mắt người. |
| Đáp án đúng là phương án dài nhất | 34% (kỳ vọng 25%) | Lệch nhẹ +9 điểm %: người học đoán theo độ dài vẫn đúng ~1/3. |
| Vị trí đáp án | a 22,8% · b 26,1% · **c 27,9%** · d 23,1% | Thiên c; nên cân bằng ngẫu nhiên lúc build. |
| Phương án đúng bị cụt giữa câu | `kn14-01` Q2 («Dùng Reels để gặp người mới, Stories») | Lỗi nhập liệu thật, đã xác nhận ở nguồn `kn14.js:35`. |
| Hai đáp án cùng đúng / lời giải mâu thuẫn đề | `kh04-02`, `kh06-03`, `gt03-03`, `tn02-07`, `tn05-08`, `dl04-03`, `ob04-01` | Chi tiết ở Phụ lục A. |
| Số bất khả thi / sai chuẩn so sánh | `tp04-02` (riêng 40% ⇒ 137,5%), `dl05-10` (±3,5 là sai số một đợt), `tu06-07` | Đã kiểm tay `tp04-02`. |

**Quiz đang kiểm tra "nhận ra ý chính của bài"** hơn là năng lực: người chấm lặp lại ở nhiều module nhận xét "đáp án đúng gần như là câu tóm tắt concept" (ob01, ob02, kn05…). Chỉ 18% bài đạt Learning ≥ 7.

### 4.2 Thứ tự học và kiến thức nền

- **Thống kê/độ nhiễu xuất hiện quá muộn.** Cỡ mẫu, ý nghĩa thống kê, nhiễu được người chấm báo thiếu ở ≥15 module, trong đó 6 module đứng *trước* `tn02` (A/B test): `ob05`, `ob07`, `kh07`, `gt03`, `kn06`, `kn13`; và vẫn thiếu sau đó ở `tn03`, `tn06`, `dl01`, `dl09`, `tu01`, `in01`. Học viên gặp "so hai kết quả" từ bước 1 nhưng chỉ có công cụ đọc ở bước 6.
- **Incrementality (phần tăng thêm thật) bị nhắc nhưng chưa thành một kỹ năng**: được báo thiếu ở `ob05`, `kn07`, `kn10`, `tn06`, `dl03`, `dl06`, `dl10`, `tu02–tu06`, `in01`, `in04`. Đây là kỹ năng phân biệt marketer giỏi với marketer chỉ đọc ROAS; hiện nằm rải rác thay vì một chuỗi 3–4 bài.
- **Kinh tế đơn vị (biên lãi, CAC, LTV, payback) dạy ở bước 7 nhưng cần từ bước 2–3**: `kh02` (chọn tệp), `gt06` (đặt mục tiêu), `tp11` (giá) đều bị báo "thiếu LTV/CAC/biên lãi làm ràng buộc".
- **Khung lý thuyết chưa được gọi tên**: Keller CBBE/Aaker, Ehrenberg-Bass (mental/physical availability), Christensen/Ulwick (JTBD), Cialdini, SCCT/Coombs, Pyramid Principle/SCQA. Bài dạy ý tưởng nhưng người học không tra cứu được nguồn, và không nói được tên khung khi phỏng vấn.
- **Bài nền xuất hiện sau bài dùng nó**: `ob08` (4P/7P) nằm sau `ob01–ob07` nhưng là khung nền; `kh11` (STP) nằm sau `kh01–kh02` đã dạy riêng từng phần nên chỉ còn là bài tổng kết.

### 4.3 Trùng lặp, quá vụn, nên gộp (người chấm đề xuất)

- `B:ob02-04` **MERGE** → `B:ob02-09` — Giá theo gram: cách khách so hai gói hàng. Gộp vào bài 02-09 thành 'Đọc giá thật: đơn giá và khuyến mãi'. Thêm ca gói lớn đắt hơn. Ví dụ: 'Gói 500g giá 190.000đ vs 2×250g giá 89.000đ: gói nào rẻ hơn mỗi gram?'
- `B:ob04-01` **REWRITE** → `B:ob03-01` — Quán cà phê của bạn đang cạnh tranh với ai — quán bên kia đường hay l…. Viết lại bài: bỏ ba vòng, tập trung vào 'nhận bằng chứng chuyển đổi từ khách bỏ đi' và nhóm theo job. Ví dụ: 'Hỏi 20 khách đã bỏ: lần cuối bạn mua gì thay, vì sao?'.
- `B:ob06-09` **MERGE** → `B:ob05-08` — COD, ví điện tử và Zalo: khách Việt muốn trả tiền và nói chuyện ở đâu?. Gộp: giữ 'chọn kênh nhắn tin theo độ tuổi' và 'ví điện tử/QR' thành mục ngắn trong ob05-08. Ví dụ: 'Zalo có tỉ lệ đọc ~X% vs email ~Y%, test A/B 1.000 khách mỗi bên.'
- `B:kh01-06` **MERGE** → `B:kh02-06` — Phân khúc có bao nhiêu tiền? Ước lượng nhanh trước khi đầu tư. Gộp vào kh02-06 hoặc tách phần riêng 'kiểm tra chéo từ trên xuống' làm điểm khác biệt.
- `B:kh04-09` **MERGE** → `B:kh04-02` — Viết câu insight thế nào để cả nhóm dùng được?. Gộp phần 'giọng khách' và 'số liệu để ở bối cảnh' vào 04-02 dưới dạng bước cuối. Ví dụ: 'Bản nháp: ... -> câu một hơi: Tôi biết phải uống nước, nhưng uống nhiều thì leo …
- `B:kh08-05` **MERGE** → `B:kh08-07` — Đồng hồ đếm ngược chạy lại mỗi lần tải trang thì sao?. Gộp vào kh08-07 thành một bài 'Khan hiếm thật vs dựng: đồng hồ và tồn kho', thêm bảng 4 dạng khan hiếm (số lượng, thời gian, cá nhân hoá, xã hội) và tiêu chí kiểm chứng.
- `B:gt02-08` **REWRITE** — Thiếu dữ liệu một nhánh thì làm sao?. Viết lại tình huống: 'Hãng có số đại lý nhập nhưng không có số đại lý bán ra; doanh thu nhập giảm 180 triệu có thể là tồn kho dồn chứ chưa phải sức mua giảm.' Khi đó bài…
- `B:gt03-02` **MERGE** → `B:gt03-03` — Giả thuyết không thể sai thì có đáng kiểm không?. Gộp thành một phần trong gt03-03 (ngưỡng) hoặc gt03-01. Nếu giữ: đổi trọng tâm thành 'chọn trước kết quả nào làm bạn dừng', ví dụ 'dưới 70 đơn sau 8 video thì dừng kênh …
- `B:tp02-09` **MERGE** → `B:tp02-04` — Quảng cáo chỉ nói lợi ích, không nói tình huống — sai ở đâu?. Gộp vào tp02-04 làm phần 'Sửa một câu chốt toàn lợi ích' hoặc đặt trước bài 04. Ví dụ bài tập: viết lại 3 câu chốt của ổ cắm thông minh cho ba cửa vào khác nhau.
- `B:tp07-07` **MERGE** → `B:tp07-09` — Câu 42 chữ này còn lại bao nhiêu nếu bỏ chữ thừa?. Gộp vào tp07-09 làm bước thứ 4 'cắt chữ thừa' kèm một bài tập. Hoặc thêm cạnh tranh: câu cần giọng trang trọng (thông báo ngân hàng) cắt thế nào.
- `B:tp08-05` **MERGE** → `B:tp09-09` — Quảng cáo được cả mạng khen — sao khách không nhớ là của hãng nào?. Gộp vào tp09-09 làm bài 'thương hiệu phải nằm trong ý tưởng', giữ phần đo tỉ lệ gọi đúng tên và tài sản nhận diện. Ví dụ: 'Đo hai con số: nhớ quảng cáo (%) và gọi đúng t…
- `B:kn01-05` **MERGE** → `B:kn01-06` — Trong một chiến dịch, mỗi loại media làm việc gì?. Biến thành bài lập kế hoạch có số: 'Mục tiêu 1.500 chai trong 6 tuần: 400 từ khách cũ (owned), 800 từ quảng cáo, 300 từ truyền miệng; chi phí/chai theo từng nguồn.'
- `B:kn02-05` **REWRITE** — Bán vào trường học, văn phòng hay bệnh viện?. Viết lại thành bài so sánh 3 kênh bằng bảng: khách mục tiêu, người gác cổng, chi phí vào, doanh số/tháng, lãi sau chi phí. Hỏi chọn kênh nào khi lãi 40 công ty chỉ 3 tri…
- `B:dl02-04` **MERGE** → `B:dl02-05` — Tỉ lệ LTV/CAC bằng 3 thì nên làm gì tiếp?. Gộp vào dl02-05 như phần mở đầu, hoặc thêm tình huống 3 doanh nghiệp cùng tỉ lệ 3 nhưng payback 2, 10, 24 tháng và buộc người học xếp hạng theo rủi ro vốn.
- `B:dl03-03` **MERGE** → `B:dl03-02` — ROAS 3 mà cuối tháng vẫn âm tiền — chuyện gì xảy ra?. Gộp vào dl03-02; giữ lại Q2, Q5 và tình huống 'marketing vs kế toán' làm phần mở rộng 'đàm phán nội bộ'.
- `B:dl08-10` **MERGE** → `B:dl07-06` — Chỉ số này tăng hay giảm thì bạn có làm khác đi không?. Gộp vào dl07-06 như một mục 'phép thử giảm một nửa' (3–4 câu) và bỏ bài này để giảm lặp.
- `B:dl09-09` **MERGE** → `B:dl09-01` — Báo cáo tuần dài 3 trang — ai đọc?. Gộp vào dl09-01 thành 'Kết luận trước + khung 5 dòng'. Nếu giữ, thêm bài tập: cho 8 sự kiện tuần, chọn 1 rủi ro cho dòng 3.
- `B:dl10-02` **MERGE** → `B:dl10-01` — Agency báo "ROI 300%" vì doanh thu gấp 4 lần chi: sai ở đâu?. Gộp dl10-01 + 02. Nếu giữ, đổi tiêu đề thành 'Doanh thu có phải là lợi ích? Doanh thu tăng thêm vs đơn đằng nào cũng có' và dồn nội dung về incrementality.
- `B:in02-08` **REWRITE** — Bánh trung thu Kido: người mua có phải người ăn?. Viết lại ví dụ: 'Phòng hành chính mua 40 hộp: ai duyệt? ai ký? ai nhận? Mỗi người lo gì? Thông điệp riêng cho từng người.'
- `L:2` **MERGE** → `L:13` — Cái tên nào đang làm việc thay bạn?. Gộp với L:13: một bài về "đặt tên + ra mắt" có số liệu (giá HEATTECH so với áo giữ nhiệt thường).
- `L:7` **MERGE** → `P:distinctive-assets` — Che logo đi, bạn còn nhận ra ai?. Gộp thành 1 bài về distinctive assets có bài kiểm nhận diện che logo (Ehrenberg-Bass).
- `L:11` **MERGE** → `L:5` — Ba câu hỏi thay cho một bản nghiên cứu. Gộp L:5 + L:11 thành 1 bài; thêm mẫu ghi nguyên văn và cách coding câu trả lời.
- `L:13` **MERGE** → `L:2` — Ra mắt sản phẩm là một bài toán thứ tự. Gộp vào L:2 hoặc viết lại với case có trình tự, ví dụ Superhuman, Notion hoặc Momo ra mắt theo nhóm.
- `L:25` **MERGE** → `P:mental-availability` — Nhất quán nhìn từ bên trong luôn giống nhàm chán. Gộp vào P:mental-availability; thêm case Coca-Cola/Nike "Just do it" lặp 30 năm.
- `P:salience` **MERGE** → `P:mental-availability` — Salience. Gộp salience + mental availability thành 1 bài.

Ngoài các bài gộp, nhiều module lặp cùng một thông điệp ("đừng tăng quảng cáo, sửa gốc" ở `ob01`; "phát hiện mẫu số" ở `dl01–dl04`; "ngưỡng thành bại" ở `gt03`, `tn01`, `tn02`, `in01`). Lặp có chủ đích thì tốt cho ghi nhớ; ở đây nó thay thế cho việc đi sâu.

### 4.4 Cân bằng chủ đề (số bài theo năng lực)

| Năng lực | Số bài ước tính | Nhận định |
|---|---|---|
| Kênh & digital (`kn`) | 130 (17%) | Nhiều nhất; 3 module phân tích nền tảng (`kn14–kn16`, mỗi module 5 bài) gắn chặt UI của Instagram/YouTube/TikTok, dễ lỗi thời. |
| Thông điệp, thương hiệu, sáng tạo (`tp`) | 95 | Đủ cho brand cơ bản; **creative craft mỏng** (brief sáng tạo, concept test, đánh giá tác phẩm). |
| Đo lường & phân tích (`dl`, `tu`) | 151 | Rộng nhất về độ sâu số học; thiếu cohort/retention thật, MMM, lift test. |
| Hiểu khách & tâm lý (`kh`) | 97 | Tốt về khái niệm; **nghiên cứu định lượng và định tính bài bản** gần như chỉ có `kh05` (8 bài) + `ob05`, `ob07`. |
| Chiến lược (`gt`, `kh11`, `tp01`) | ~75 | Có khung, thiếu bài tổng hợp "từ dữ liệu → chiến lược → kế hoạch → ngân sách" (một case xuyên suốt). |
| Quan sát (`ob`) | 71 | Ổn, nhiều bài lặp motif. |
| Thử nghiệm (`tn`) | 59 | `tn02` là module tốt nhất chương trình (6,5); `tn03` yếu nhất ở Case (5,0). |

---

## 5. Những chủ đề còn thiếu để đạt chuẩn đào tạo thực chiến

Tổng hợp từ danh sách "thiếu" của từng module, lọc những chủ đề được lặp ≥3 module hoặc là năng lực lõi.

1. **Phương pháp nghiên cứu**: thiết kế khảo sát (câu hỏi, mẫu, thang đo, thiên lệch), phân tích định tính (laddering, affinity, 5 Whys), quan sát/ethnography, đạo đức nghiên cứu (Nghị định 13/2023), Win-loss, social listening có phương pháp.
2. **Thống kê ứng dụng**: khoảng tin cậy, cỡ mẫu, SRM/A-A test, Simpson, so sánh nhiều lần, survivorship/selection bias.
3. **Incrementality & attribution**: holdout/geo test, conversion lift, MMM cơ bản, mất tín hiệu (iOS ATT, consent, server-side/CAPI), data-driven attribution; MER/blended ROAS.
4. **Kinh tế đơn vị đầy đủ**: CAC có lương/agency/công cụ, LTV theo cohort có churn và chiết khấu, payback, contribution margin, ngưỡng ROAS hoà vốn từ biên.
5. **Cohort & retention**: đọc đường cong giữ chân, RFM, NRR, churn B2C/B2B.
6. **Quản trị giá**: độ co giãn, Van Westendorp/Gabor-Granger, decoy/Good-Better-Best, luật niêm yết giá và khuyến mãi VN.
7. **Sáng tạo có kỷ luật**: creative brief (single-minded proposition), concept test/pre-test, hook & kịch bản video ngắn, phản hồi có cấu trúc cho agency.
8. **Planning media thật**: reach/frequency/CPM, effective frequency, pacing/scale ngân sách, ngưỡng tối thiểu theo kênh, 60/40 brand–activation.
9. **B2B**: ICP, ABM, CAC/LTV B2B, LinkedIn/sự kiện/SEO nội dung, đối tác kênh, chu kỳ nhiều người quyết định.
10. **Kênh truyền thống & trade marketing**: GT/MT, nhà phân phối, chiết khấu, planogram, share of shelf, POSM, perfect store, slotting.
11. **Pháp lý–tuân thủ VN**: Luật Quảng cáo (sửa đổi), Luật BVQLNTD, dữ liệu cá nhân, quảng cáo thực phẩm/mỹ phẩm/sức khoẻ, sở hữu trí tuệ, đăng ký nhãn hiệu (Cục SHTT), quyền hình ảnh KOL/UGC.
12. **Khủng hoảng chuẩn mực**: SCCT/Coombs, ma trận mức độ, kế hoạch dựng trước, case thật có phân tích.
13. **Case thật có nguồn**: Avis, Red Bull, Dropbox, Buffer, Zappos, Share a Coke, Real Beauty, Mixue, Highlands, Biti's… kèm năm/thị trường/KPI/nguồn và **phản ví dụ thất bại**.
14. **Tổng hợp & giao tiếp**: Pyramid Principle/SCQA, one-pager, memo; đọc bảng/biểu đồ; chọn loại biểu đồ; kể chuyện số liệu có cấu trúc.
15. **Kỹ thuật SEO/Commerce**: lập chỉ mục, canonical, Core Web Vitals, SEO thương mại điện tử, quảng cáo tự động của sàn (GMV Max), mega-sale planning.

---

## 6. Kế hoạch cải thiện theo ưu tiên

**Giai đoạn 0 — Cổng chặn launch (1–2 tuần)**
- Sửa **21 bài P0** (Phụ lục A). Việc cụ thể nhất: viết lại phương án nhiễu `ob03` bỏ mẫu "Vì…"; sửa `kn14-01` Q2; chữa số liệu `tp04-02`, `dl04-03`, `dl05-10`, `tu06-07`; tách hai đáp án đúng ở `kh04-02`, `kh06-03`, `gt03-03`, `tn02-07`, `tn05-08`, `ob04-01`.
- Thêm vào `tools_validate_bai.mjs` lint "dấu hiệu hình thức": mở đầu giống nhau, độ dài, cụt câu, vị trí đáp án; chặn build nếu 104 câu hiện tại chưa sửa.
- **Xác minh 185 khẳng định UNVERIFIED**: pháp chế kiểm `kn12` (8+ văn bản 2025–2026); người biên tập tra nguồn cho `P:*` (13), `ob02`, `kh06`, `kh08`, `kh10`, `tu04`. Gắn nguồn hoặc đổi nhãn "minh hoạ".
- Sửa `tp03-01` (Vinamilk).

**Giai đoạn 1 — P1 (100 bài, 3–5 tuần)** — nông ở kỹ năng lõi/lời giải mâu thuẫn. Dồn ở: tu05 (4), in04 (4), gt02 (3), kh06 (3), tp11 (3), kn10 (3), dl04 (3), kn02 (2), L-strategy (2), ob04 (2), tn06 (2), kn03 (2). Với mỗi bài: thêm *cơ chế vì sao*, *điều kiện làm nó sai*, *một phương án thay thế bị loại và vì sao*; nâng ≥1 câu quiz lên L4 (cho dữ liệu → yêu cầu chẩn đoán).

**Giai đoạn 2 — Cấu trúc (4–8 tuần)**
- Gộp 21 bài MERGE, viết lại 4 bài REWRITE (mục 4.3).
- Đưa **"Số liệu & độ nhiễu"** (CI, cỡ mẫu, SRM) thành một module nền trước `gt03`; **"Incrementality"** thành chuỗi 4 bài (khái niệm → holdout → geo → đọc lift) xuyên `tn06`, `dl06`, `dl10`, `tu06`.
- Thêm module mới theo mục 5 (ưu tiên 1, 2, 3, 4, 7, 11).
- Thêm "thẻ nguồn" cho mỗi case: **thật / dựng từ dữ kiện công khai / minh hoạ**, kèm năm, thị trường, nguồn.
- Chuyển ít nhất 20 bài lên L5 bằng câu hỏi buộc chọn giữa 2 phương án đúng một phần và biện hộ.

**Giai đoạn 3 — Đánh giá bằng sản phẩm (song song giai đoạn 2)** — mỗi bước kết thúc bằng một *output* chấm theo rubric, không trắc nghiệm:

| Bước | Output | Rubric (tiêu chí chấm) |
|---|---|---|
| 2 Hiểu khách | **Customer insight memo** 1 trang + 5 trích dẫn phỏng vấn | Câu insight có căng thẳng; có bằng chứng từ ≥3 người; có giả thuyết phản bác |
| 3 Giả thuyết | **Cây vấn đề + 3 giả thuyết kiểm chứng** | MECE; mỗi giả thuyết có chỉ số, ngưỡng, điều kiện bác bỏ |
| 4 Thông điệp | **Positioning statement + bản đồ định vị + creative brief** | Khác biệt có thật so với lựa chọn thay thế; brief một mệnh đề chính |
| 5 Kênh | **Media plan** (reach, tần suất, CPM, ngân sách theo kênh) | Số học khớp; lý do chọn/bỏ từng kênh; kịch bản ngân sách −30% |
| 6 Thử nghiệm | **Test plan** (giả thuyết, cỡ mẫu, thời gian, quy tắc dừng) | Cỡ mẫu tính được; chỉ số chính/phụ; điều gì làm kết quả vô hiệu |
| 7 Đo lường | **Performance report 1 trang** + quyết định | Bắt đầu từ quyết định; có baseline/incrementality; nêu độ chắc chắn |
| 8 Tối ưu | **Marketing budget** với CAC trần, payback, kịch bản thấp/cơ sở/cao | Biên lãi → CAC chịu được → ngân sách; nhạy cảm với giả định |
| 9 Insight | **Campaign post-mortem** về một chiến dịch thật | Tách thực thi/ý tưởng/thị trường; kết luận không vượt quá dữ liệu |

**Giai đoạn 4 — P2/P3 (liên tục, 620 bài)**: làm rõ diễn đạt, ví dụ yếu, storytelling. Không chặn launch.

---

## 7. Đánh giá cuối cùng

**Học viên hoàn thành chương trình hiện nay: biết *lý luận như một marketer ở quy mô nhỏ và có tình huống được dựng sẵn*, nhưng chưa được chứng minh là *biết làm marketing*.**

Bằng chứng:
- **Bloom**: 71% bài dừng ở L2–L3; L5 chỉ 8 bài; **không có bài nào ở L6**. Một chương trình "từ biết đến làm được" cần phần lớn nửa sau ở L4–L6.
- **Hình thức đánh giá chỉ là trắc nghiệm/tính toán**; phần "Áp dụng ngay" là nhiệm vụ nói/viết 60 giây, không có sản phẩm nộp, không có tiêu chí chấm. Học viên chưa bao giờ phải *tạo ra* insight, positioning, creative brief, media plan, ngân sách hay báo cáo.
- **Số liệu và tình huống do tác giả dựng sẵn sao cho tự khớp**: người học chưa từng phải đối mặt với dữ liệu bẩn, mâu thuẫn, thiếu hoặc nhiễu.
- **Quiz có thể đoán một phần bằng hình thức** (104 câu lộ bằng "Vì…", 34% đáp án đúng là câu dài nhất), nên điểm quiz *thổi phồng* năng lực.
- **Nửa sau còn thiếu "khó"**: 341 / 760 bài ít giá trị với manager; kỹ thuật trưởng thành (incrementality, MMM, cohort thật, pháp lý) chưa có.

Điều chương trình **làm tốt**: người mới được dắt từ "marketing là gì" qua phễu, đơn vị kinh tế, thử nghiệm và đọc số; văn phong tiếng Việt rõ, ngữ cảnh Việt Nam cụ thể; số học sạch; tinh thần "đừng kết luận vượt quá dữ liệu" nhất quán. Đủ làm *nền tảng tốt cho người mới và sinh viên*.

**Trả lời thẳng**: *với trạng thái hiện tại, học viên giỏi chương trình này sẽ trả lời quiz tốt và giải thích được vì sao một quyết định marketing hợp lý trong tình huống cho sẵn; chưa đủ cơ sở để nói họ tự nghiên cứu khách hàng, xây chiến lược, triển khai chiến dịch, đo lường và bảo vệ quyết định bằng dữ liệu trong môi trường thật.* Khoảng cách đó đóng được bằng 3 việc: (1) sửa lỗi P0 và lint quiz; (2) thêm chuỗi kỹ năng còn thiếu — nghiên cứu, thống kê/incrementality, kinh tế đơn vị, sáng tạo; (3) **đánh giá bằng sản phẩm** theo bảng ở mục 6 — thay đổi quan trọng nhất.

**Khuyến nghị launch**: *chưa launch dưới nhãn "đào tạo marketing thực chiến"*. Có thể launch giới hạn như **"Nhập môn tư duy marketing (beta)"** sau Giai đoạn 0, rồi gắn nhãn thực chiến khi có Giai đoạn 2–3.

---

## Phụ lục A — Chi tiết 21 bài P0

**B:dl04-03** — Mất 8% khách mỗi tháng thì sau một năm còn bao nhiêu? · tổng 6.3 · L3→L3 · IMPROVE
- *P0 Q5* — «Vì sao hiệu quả sau một năm lớn hơn “2 điểm × 12”?» → Tiền đề sai: why.b tự tính chênh khoảng 13 điểm (61% - 48%), nhỏ hơn 24 điểm, không lớn hơn; phương án d 'đúng bằng 24 điểm, không lớn hơn' bị loại vì lý do khác với tiền đề. Lời giải mâu thuẫn đề **Sửa:** Viết lại: 'Hạ rời bỏ từ 6% xuống 4%. Sau 12 tháng giữ thêm bao nhiêu điểm: 24 hay khoảng 13? Vì sao?'
- **Đề xuất/viết lại:** Sửa Q5 như trên; thêm một câu 'tuổi thọ trung bình khách = 1/churn' để nối với LTV.

**B:dl05-10** — Sếp chỉ có hai phút: báo cáo sức khoẻ thương hiệu một trang trông thế nào? · tổng 6.4 · L3→L5 · IMPROVE
- *P0 Q3/example* — «cân nhắc 31% (−5, vượt sai số ±3,5 với mẫu 700)» → ±3,5 là sai số của một đợt (n=700). Chênh lệch hai đợt có sai số ≈ ±4,9 (như dl05-08 vừa dạy); 5 điểm chỉ vừa vượt. Q3 'vượt 1,5 điểm' dạy đọc sai chuẩn so sánh. **Sửa:** Dùng ±4,9 cho chênh hai kỳ; Q3 hỏi 'sai số của chênh lệch là bao nhiêu'.
- **Đề xuất/viết lại:** Sửa ngưỡng. Ví dụ: 'Cân nhắc −5 điểm (±4,9 với mẫu 700 mỗi kỳ): ở mức biên, đánh dấu cần xác nhận quý sau.'

**B:gt03-03** — Số nào sẽ chứng minh bạn đúng — và bao nhiêu thì đủ? · tổng 6.3 · L3→L5 · IMPROVE
- *P0 Q6* — «Cần xem doanh thu sáng; lẽ ra phải đặt ngưỡng trên chỉ số tổng» → Mâu thuẫn với concept 'chỉ số phụ không được lật kết quả': ngưỡng AOV 52k đã vượt (55k) và why.c tự nói doanh thu vẫn nhích (46,8 vs 45); theo luật bài thì a ('thắng') đúng hoặc cả a và c đều đúng **Sửa:** Đổi dữ kiện để doanh thu giảm rõ (đơn giảm 25%), hoặc đổi câu hỏi thành 'lỗi lớn nhất của cách đặt chỉ số'
- **Đề xuất/viết lại:** Viết ví dụ: 'Thêm kênh tốn 1,5 triệu quản lý mỗi tháng; với 50 hội viên mới, cần giảm CAC ≥ 30.000đ → ngưỡng 120.000đ'. Cho người học tự tính ngưỡng.

**B:kh04-02** — Vì sao "mẹ muốn con khoẻ" không phải là insight? · tổng 6.1 · L3→L4 · IMPROVE
- *P0 Q3* — «Tôi muốn con ăn đủ chất, nhưng sữa ngoại thì giá hơi cao so với thu nhập» → Đề hỏi 'câu nào có cấu trúc căng thẳng'; phương án c có đủ cấu trúc (muốn + nhưng), lời giải còn thừa nhận 'Có chữ nhưng' nên hai đáp án cùng đúng theo đề **Sửa:** Đổi đề thành 'Câu nào là insight tốt nhất (căng thẳng riêng, cảm xúc, có thể gỡ)?'
- *P1 Q5* — «lời giải duy nhất là giảm giá, ăn vào lãi» → Tuyệt đối hoá: rào cản giá có thể gỡ bằng gói nhỏ, trả góp, đổi trả; có insight giá hay (lo bị coi là keo kiệt) **Sửa:** Viết 'thường dẫn tới cuộc đua giảm giá, trừ khi có nỗi sợ cảm xúc đi kèm'
- **Đề xuất/viết lại:** Viết lại Q3 như trên. Thêm đối chiếu: 'mong muốn chung: con khỏe' vs 'tôi muốn con ăn đủ chất nhưng sợ bị coi là mẹ thất bại' và nêu vì sao vế thứ hai gỡ được.

**B:kh06-03** — Khách xem trên TikTok, hỏi Zalo, mua ở cửa hàng — tính công cho ai? · tổng 6.1 · L4→L4 · IMPROVE
- *P0 Q1* — «TikTok tạo nhận biết, còn quyết định mua nằm ở kênh khác» → Phương án c cũng đúng (lời giải why.c còn xác nhận video là bước đầu dẫn tới mua); hai đáp án cùng chấp nhận được, chỉ d là câu trả lời cho 'báo cáo sai ở đâu' **Sửa:** Sửa c thành khẳng định sai rõ: 'TikTok không có tác dụng vì không ra đơn'
- **Đề xuất/viết lại:** Sửa Q1 c; thêm một câu quiz về thiết kế đối chứng vùng. Ví dụ: 'Tắt TikTok ở 2 chi nhánh trong 4 tuần, so lượng khách tới với 2 chi nhánh còn lại.'

**B:kn14-01** — Ảnh cùng bó hoa trên Feed, Stories và Reels: ba bề mặt, ba việc khác nhau? · tổng 5.9 · L2→L4 · IMPROVE
- *P0 Q2* — «b) Dùng Reels để gặp người mới, Stories» → Phương án đúng bị cụt giữa câu, không tự đứng được; why.b nói 'Mỗi bề mặt gán một việc rõ' nhưng nội dung phương án thiếu hẳn nửa sau **Sửa:** Dùng Reels để gặp người mới, Stories để thúc người quen, Feed để trưng bày bộ mẫu, rồi đo mỗi nơi bằng chỉ số riêng
- **Đề xuất/viết lại:** Sửa Q2b thành câu trọn vẹn. Thêm tình huống: khách nhắn tin ở Stories có thể đã thấy Reels trước đó; hỏi cách kiểm bằng cách hỏi 'bạn biết tiệm từ đâu' khi nhắn.

**B:ob03-01** — Hãng nước suối của bạn đang cạnh tranh với ai? · tổng 6.1 · L3→L4 · IMPROVE
- *P0 Q4* — «Khi một bên tăng giá, khách của bên đó chuyển sang bên kia» → Phương án đúng là cái duy nhất không bắt đầu bằng 'Hai sản phẩm...' như ba phương án nhiễu, nên lộ đáp án theo hình thức **Sửa:** Viết lại cả 4 phương án cùng cấu trúc, ví dụ: 'Hai sản phẩm được coi là cùng ngành khi khách đổi qua lại giữa chúng lúc giá thay đổi'
- **Đề xuất/viết lại:** Thêm 1 bước lấy bằng chứng: 'hỏi 30 khách tại tủ mát: nếu hết nước suối bạn lấy gì?' rồi lập bảng hoán đổi. Viết lại Q4 với 4 phương án song song.

**B:ob03-02** — Ngành to hay ngành đang lớn — nên vào đâu? · tổng 6.0 · L3→L4 · IMPROVE
- *P0 Q4* — «Mỗi đồng bạn có là một đồng đối thủ mất, nên họ phản đòn» → Phương án đúng không mở đầu bằng 'Vì' như a, b, d; lộ đáp án bằng hình thức **Sửa:** Cho cả 4 phương án cùng mở đầu 'Vì...' hoặc cùng bỏ
- *P1 example* — «startup giành được 1% phần tăng thêm đã là giỏi» → 1% và 10% là con số chọn để kết quả nghiêng về B; kết luận 'ngành nhỏ tăng nhanh thắng' tự khớp **Sửa:** Cho học viên tự đặt giả định giành phần và thử độ nhạy (1%/5%/10%) ở cả hai ngành
- **Đề xuất/viết lại:** Thêm bước: so doanh số giành được SAU biên gộp. Ví dụ viết lại: 'Giành 4 tỉ ở A với biên 25% hay 30 tỉ ở B với biên 10%? Bên nào cho lãi gộp nhiều hơn?'

**B:ob03-03** — Khách mua bao lâu một lần, mỗi lần bao nhiêu? · tổng 5.6 · L3→L4 · IMPROVE
- *P0 Q4* — «Nhiều lần đứng trước kệ, sai một lần cũng chẳng mất gì» → Ba nhiễu đều mở đầu 'Vì', đáp án đúng thì không; ngoài ra là câu ngắn nhất tự nhiên **Sửa:** Chuẩn hoá thành 'Vì mỗi lần mua rủi ro thấp nên khách sẵn lòng thử hãng khác'
- **Đề xuất/viết lại:** Thêm ca khó: ngành mua thưa nhưng có vòng đời gia hạn (bảo hiểm, phần mềm); yêu cầu chọn giữa tần suất và giá trị đơn để tăng doanh thu mỗi khách.

**B:ob03-04** — Khách mua theo thói quen hay mua sau khi cân nhắc? · tổng 5.5 · L2→L4 · IMPROVE
- *P0 Q5* — «Ngành mua cân nhắc cần bằng chứng, 6 giây không đủ gỡ lo» → Ba nhiễu mở đầu 'Vì', đáp án đúng thì không; lộ đáp án **Sửa:** Đồng bộ cấu trúc: 'Vì ngành mua cân nhắc cần bằng chứng, 6 giây không đủ gỡ lo'
- **Đề xuất/viết lại:** Thay Q4 bằng ca khó: sản phẩm giữa hai cực (kem chống nắng, bột giặt thương hiệu mới) và yêu cầu chọn hiện diện hay bằng chứng.

**B:ob03-05** — Ai dẫn đầu ngành, và họ dẫn đầu nhờ đâu? · tổng 5.6 · L3→L4 · IMPROVE
- *P0 Q4* — «Quảng cáo nhiều thường là kết quả của việc đã dẫn đầu» → Đáp án đúng không mở đầu 'Vì' như a, b, c; ngoài ra phát biểu nhân quả đảo một chiều là quá tay (quảng cáo cũng góp xây thị phần) **Sửa:** Diễn đạt 'không đủ để giải thích': dẫn đầu nhờ nhiều yếu tố, quảng cáo vừa là nguyên nhân vừa là kết quả
- **Đề xuất/viết lại:** Cho học viên điền bảng 4 nguồn × 3 hãng với bằng chứng quan sát được, và hỏi 'nguồn nào mất đi nếu đối thủ vào được kênh X?'.

**B:ob03-06** — Ngành này để lại bao nhiêu lãi trên mỗi đồng bán ra? · tổng 6.3 · L3→L4 · KEEP
- *P0 Q4* — «Biên gộp cao để lại đủ tiền sau giá vốn» → Đáp án đúng không có 'Vì', ba nhiễu đều có; lộ đáp án **Sửa:** Đồng bộ mở đầu 'Vì' cho cả 4 phương án
- **Đề xuất/viết lại:** Thêm bài tập: ngân sách marketing tối đa = lãi gộp − chi phí vận hành − lãi mong muốn, cho số cụ thể; dùng ngay ca nhà phân phối gạo.

**B:ob03-07** — Ngành của bạn bán mạnh vào tháng nào? · tổng 5.8 · L3→L4 · IMPROVE
- *P0 Q4* — «Nhiều hãng cùng đấu giá cho cùng lượng người xem» → Đáp án đúng không mở đầu 'Vì', còn a, b, c đều có; lộ đáp án **Sửa:** Đồng bộ cấu trúc 4 phương án
- **Đề xuất/viết lại:** Thêm bước tính chỉ số mùa vụ từ 3 năm doanh số và tự đặt rule 'đỉnh −6 tuần'. Ví dụ: 'Nếu tháng 1 chiếm 22% doanh số, ngân sách tối thiểu cho tháng 12–1 là bao nhiêu?'

**B:ob03-08** — Khách của ngành này mua ở đâu nhiều nhất? · tổng 5.5 · L3→L4 · IMPROVE
- *P0 Q1* — «Hàng nặng, giá thấp, cần ngay, tạp hoá gần nhà tiện hơn» → Phương án đúng là cái duy nhất không bắt đầu bằng 'Vì'; lặp lại ở Q4 ('Nhẹ, giá trị cao, nhiều lựa chọn, khách cần xem đánh giá') **Sửa:** Viết lại đồng nhất 'Vì...' cho cả bốn phương án ở Q1 và Q4
- **Đề xuất/viết lại:** Thêm bài tập điều tra: đi 5 điểm bán, đếm facing và hỏi chủ tiệm nhập từ đâu. Thay Q7 bằng ca: khi online giao 2 giờ, kênh nào mất trước?

**B:ob03-09** — Vì sao ngành trông dễ làm nhưng người mới hay thua? · tổng 6.3 · L3→L4 · KEEP
- *P0 Q6* — «Hàng giao trước, tiền thu sau, vốn nằm ở kho và công nợ» → Đáp án đúng là cái duy nhất không mở đầu 'Vì'; lộ đáp án **Sửa:** Đồng bộ 'Vì...' cho cả 4 phương án
- **Đề xuất/viết lại:** Thêm bảng 'rào cản nào tiền vượt được, rào cản nào cần thời gian'. Gợi ý: 'Với 1 tỉ vốn, rào cản nào bạn vượt được trong 12 tháng?'

**B:ob03-10** — Khi luật chơi của ngành đang đổi, bạn đọc dấu hiệu nào? · tổng 5.4 · L3→L5 · IMPROVE
- *P0 Q4* — «Luật cũ đang nuôi họ, đổi là tự làm hại phần đang có lãi» → Phương án đúng không mở đầu 'Vì' trong khi b, c, d đều có **Sửa:** Đồng bộ cấu trúc
- *P1 example* — «tại cửa hàng giảm từ 85 tỉ còn 65 tỉ» → Đơn giao qua app thường vẫn do chính cửa hàng thực hiện; chuyển kênh bán không chứng minh 'luật đổi'. Nhầm kênh bán với địa điểm vận hành **Sửa:** Tách rõ: doanh thu giao hàng từ cửa hàng hiện có vs. ki-ốt mới; đo biên của đơn giao
- **Đề xuất/viết lại:** Thêm bài tập chỉ số kênh: 'liệt kê 3 chỉ số quý, ngưỡng nào thì bạn mở ki-ốt thử?'. Ví dụ: 'Nếu giao hàng vượt 30% hai quý liền, mở 3 ki-ốt'.

**B:ob04-01** — Quán cà phê của bạn đang cạnh tranh với ai — quán bên kia đường hay ly trà sữa? · tổng 5.6 · L2→L4 · REWRITE → B:ob03-01
- *P0 Q4* — «Đối thủ gián tiếp bán sản phẩm khác nhưng giải cùng nhu cầu» → Theo chính định nghĩa này, nước lọc bình văn phòng (có bán, giải khát) là gián tiếp (phương án b), nhưng đáp án chấm là thay thế (d). Hai phương án cùng hợp định nghĩa; why.a còn nói sai 'không phải sản phẩm bán lẻ' **Sửa:** Đổi ví dụ thành thứ rõ ràng không mua: 'nước máy/bình tự mang theo'; hoặc sửa định nghĩa phân biệt ‘có mua của hãng khác’ vs ‘tự làm/tự có’
- *P1 Q2* — «Nhắm vào nhóm lớn nhất (45%) bằng cách giải đúng nhu cầu» → Ví dụ trong bài nói chưa biết vì sao khách đi (vị, mới lạ, chỗ ngồi) nhưng Q2 chốt ngay 'món ít đắng'; nhảy từ phân bổ nhóm sang giải pháp **Sửa:** Thêm bước phỏng vấn lý do; đáp án đúng là 'xác định lý do trước, thử món'
- **Đề xuất/viết lại:** Viết lại bài: bỏ ba vòng, tập trung vào 'nhận bằng chứng chuyển đổi từ khách bỏ đi' và nhóm theo job. Ví dụ: 'Hỏi 20 khách đã bỏ: lần cuối bạn mua gì thay, vì sao?'.

**B:tn02-07** — Chuyển đổi tăng, giá trị đơn giảm - bản nào thắng? · tổng 6.1 · L4→L5 · IMPROVE
- *P0 Q7* — «d) Để tính cỡ mẫu, vì mỗi chỉ số cần một cỡ mẫu riêng của mình» → Hai đáp án cùng đúng: d là lý do thật (cỡ mẫu phụ thuộc chỉ số chính) và why.d tự nhận 'Cũng đúng một phần'; stem không giới hạn 'lý do chính' **Sửa:** Đổi stem: 'Lý do QUAN TRỌNG NHẤT để ghi chỉ số chính TRƯỚC khi chạy là gì?' hoặc sửa d thành phương án sai rõ
- **Đề xuất/viết lại:** Sửa Q7 như trên; thêm một câu rào chắn 'tỉ lệ hoàn đơn tăng 4 điểm: bản có thắng?'

**B:tn05-08** — Sản phẩm mới bán chạy nhưng lấy khách của chính sản phẩm cũ · tổng 6.1 · L4→L5 · IMPROVE
- *P0 Q1* — «Chi phí quảng cáo cho sản phẩm mới quá lớn so với doanh số» → Đáp án a cũng khiến lợi nhuận cả hãng không tăng dù doanh số vượt kế hoạch; lời giải why.a nói 'không giải thích được' là sai. Câu có hai đáp án cùng đúng (a và d, thậm chí c do biên thấp hơn) **Sửa:** Đổi stem: 'Khi chi phí quảng cáo không đổi, nguyên nhân nào khiến lãi tăng ít nhất so với doanh số mới?' hoặc thay phương án a bằng thứ không liên quan lãi.
- *P1 example* — «Lãi mất ở chai có đường: 120.000 × 4.000 = 480 triệu đồng» → Giả định toàn bộ mức giảm 120.000 chai là do chai mới và so với cùng kỳ; chính bài nói xu hướng giảm đường đang kéo khách đi nên một phần mức giảm vốn có. Cũng chưa trừ chi phí marketing của sản phẩm mới **Sửa:** Ghi rõ ước tính tỉ lệ chuyển và trừ chi phí ra mắt trước khi gọi 'lãi tăng thêm thực'.
- **Đề xuất/viết lại:** Thêm chỉ số 'tỉ lệ ăn thịt' = số chai cũ mất / số chai mới = 60% và ví dụ: 'Cứ 10 chai mới có 6 chai là của khách cũ; lãi thực còn 120 triệu chưa kể quảng cáo'.

**B:tp04-02** — Làm sao biết tài sản nào đáng đầu tư? · tổng 6.5 · L3→L4 · IMPROVE
- *P0 Q7* — «độ nổi tiếng 55%, độ riêng 40%» → Theo định nghĩa của bài, nổi tiếng = đúng/tổng; riêng = đúng/số người gắn với một hãng nào đó. Riêng 40% kéo theo 55%/0,40 = 137,5% người gắn với một hãng, vượt 100%. Số liệu bất khả thi, mâu thuẫn why.a ‘60% người nhận ra màu lại nghĩ tới đối thủ’ **Sửa:** Đổi thành nổi tiếng 32%, riêng 40% (gắn với một hãng 80%) hoặc nổi tiếng 55%, riêng 70%
- **Đề xuất/viết lại:** Sửa Q7 như trên. Thêm một câu cho trường hợp riêng cao-nổi tiếng thấp so với nổi tiếng cao-riêng thấp với cùng ngân sách. Nêu nguồn Romaniuk và cỡ mẫu tối thiểu.

**B:tu06-07** — Muốn dừng chiến dịch nhưng đã ký hợp đồng với KOL · tổng 5.3 · L3→L5 · IMPROVE
- *P0 Q3/example* — «Tổng chi tối đa 55 triệu thay vì 80 triệu» → Hợp đồng 80, đã trả 40, còn video 3 và 4 chưa trả. Nếu làm video 3 (đổi nội dung) rồi livestream, tổng vẫn ~80; 55 chỉ đúng nếu dừng và không trả video 3. Q3 hỏi 'tổng chi tối đa' nhưng 40+15 bỏ qua phí video làm thêm **Sửa:** Nói rõ: nếu dừng ngay sau video 3 thì tổng 40 + 20 (video 3) + 15 = 75; nếu không dừng 80. Hoặc đổi câu hỏi thành 'chi phí thoát nếu dừng ngay'
- *P1 concept/situation* — «số đơn từ mã giảm giá riêng của KOL rất thấp» → Coi mã giảm giá là thước đo duy nhất; KOL mang lại nhận biết/tìm kiếm, mâu thuẫn tu06-03 **Sửa:** Thêm lượt tìm kiếm, nhận biết, đơn không qua mã
- **Đề xuất/viết lại:** Viết lại Q3: 'Còn 2 video x 20 triệu. Phương án A làm đủ; B dừng sau video 3 và trả thêm 15 triệu thoả thuận. Nếu video 3 hứa 40 đơn lãi 100.000, chọn A hay B?' để tính được.


## Phụ lục B — Chi tiết 100 bài P1 (xếp theo điểm tăng dần)

**P:referral** — Referral · tổng 4.9 · L2→L4 · IMPROVE
- *P1 one/counter* — «Chỉ xảy ra khi việc giới thiệu làm người giới thiệu trông tốt hơn» → Tuyệt đối hoá; referral có thưởng như Dropbox vẫn hiệu quả, counter "nhận 20k" quá phủ định **Sửa:** Phân biệt referral có thưởng vs word-of-mouth tự nhiên
- **Đề xuất/viết lại:** Thêm Dropbox và công thức K.

**B:kn02-05** — Bán vào trường học, văn phòng hay bệnh viện? · tổng 5.0 · L2→L4 · REWRITE
- *P1 example/concept* — «5.120 hộp mỗi tháng. Người quyết định là phòng hành chính» → Chỉ nhân ra số hộp; không có doanh thu, lãi, chi phí tủ lạnh, nhân sự châm hàng, thất thoát tự phục vụ, hay thời gian hoàn vốn. 'Kênh đặc biệt' được chọn chỉ theo cảm tính khớp khách mục tiêu. **Sửa:** Thêm tính toán 5.120 hộp × lãi trừ chi phí tủ và nhân sự, để đối chiếu với kênh tạp hoá.
- **Đề xuất/viết lại:** Viết lại thành bài so sánh 3 kênh bằng bảng: khách mục tiêu, người gác cổng, chi phí vào, doanh số/tháng, lãi sau chi phí. Hỏi chọn kênh nào khi lãi 40 công ty chỉ 3 triệu/tháng.

**L:19** — Bao nhiêu lần thì đủ để được nhớ? · tổng 5.0 · L3→L4 · IMPROVE
- *P1 idea/title* — «Bao nhiêu lần thì đủ để được nhớ?» → Tiêu đề đặt câu hỏi nhưng bài không bao giờ trả lời (không nêu effective frequency 3+, reach vs frequency) **Sửa:** Nêu khung Krugman/Sharp và con số tham chiếu
- **Đề xuất/viết lại:** Giải bài toán: tính reach*frequency với ngân sách cố định; chỉ khi muốn nhớ thì cần tần suất hiệu dụng. Viết lại câu hỏi mở thành kết luận.

**L:24** — Chọn kênh phân phối là chọn khách hàng · tổng 5.0 · L3→L4 · IMPROVE
- *P1 closer* — «Mở rộng kênh gần như luôn tăng doanh số ngắn hạn và giảm giá trị cảm nhận dài hạn» → Mâu thuẫn trực tiếp P:physical-availability (mở rộng phân phối là lõi tăng trưởng) và tuyệt đối hoá **Sửa:** Nêu điều kiện: với thương hiệu cao cấp cần kiểm soát; còn lại mở rộng phân phối thường tốt
- **Đề xuất/viết lại:** Thêm bảng ví dụ chiết khấu kênh 30/20/10% và biên còn lại. Giải mâu thuẫn với P:physical-availability.

**B:tp07-06** — Banner 300×250 có chỗ cho bao nhiêu chữ? · tổng 5.3 · L2→L4 · IMPROVE
- *P1 Q5* — «b) Ở trang đích, ngay cạnh lời hứa trên banner» → Đáp án lẫn: nói 'trang đích' nhưng 'cạnh lời hứa trên banner'; phương án a (chữ nhỏ dưới banner) cũng có thể coi là đúng và là thông lệ minh bạch, khuyến mại thường phải nêu điều kiện ngay trong quảng cáo **Sửa:** Viết lại: đáp án đúng là 'dấu * nhỏ trên banner kèm điều kiện đầy đủ ở trang đích', bỏ phương án a mơ hồ
- **Đề xuất/viết lại:** Viết lại Q5 và thêm quy tắc tuân thủ. Ví dụ: 'Giao thuốc trong 1 giờ*  (*nội thành, đơn từ 200k — xem chi tiết sau khi bấm)'. Thêm tiêu chí kiểm tra: xem banner ở kích thước thật trên điện thoại.

**B:ob04-08** — Bảng so sánh đối thủ một trang: giữ gì, bỏ gì? · tổng 5.4 · L2→L4 · IMPROVE
- *P1 Q2* — «4 đối thủ chính, 5 tiêu chí khách chọn, ba dòng kết» → Đáp án đúng chép nguyên văn từ ví dụ, dài và cụ thể nhất; nhiễu a, b, d rất yếu **Sửa:** Thêm nhiễu hợp lý: '3 đối thủ, 8 tiêu chí' hoặc '4 đối thủ, 5 tiêu chí nhưng không có kết luận'
- **Đề xuất/viết lại:** Gộp với ob04-02 hoặc thêm bước 'chọn tiêu chí từ 10 review'. Ví dụ bài tập: 'Từ 20 review balo, rút 5 tiêu chí khách nhắc nhiều nhất'.

**B:ob06-07** — Mùa tựu trường, mùa mưa, mùa nóng: lịch nào đang điều khiển ngành của bạn? · tổng 5.4 · L2→L4 · IMPROVE
- *P1 situation/Q1* — «các tháng mưa ở miền Nam chỉ 14.000 thùng/tháng» → Nhu cầu sữa học đường theo lịch học, không theo mưa; mưa miền Nam kéo từ tháng 5–11 gồm cả tháng 8–9 đang đỉnh: gán nguyên nhân sai **Sửa:** Đổi sang ngành thực sự theo mưa (áo mưa, thuốc cảm) hoặc nói nhu cầu theo kỳ nghỉ hè
- **Đề xuất/viết lại:** Thay ví dụ bằng ngành mưa thật (đồ ăn giao tận nơi) hoặc dựng chỉ số mùa 12 tháng. Ví dụ: 'Ngân sách = tổng × chỉ số mùa từng tháng/Σ chỉ số'.

**B:gt02-08** — Thiếu dữ liệu một nhánh thì làm sao? · tổng 5.4 · L3→L4 · REWRITE
- *P1 situation* — «chỉ có tổng tiền đại lý nhập hàng, không biết đại lý bán ra bao nhiêu» → Doanh thu của hãng chính là tiền đại lý nhập (sell-in), nên nhánh này thực ra có số; bài lẫn sell-in và sell-out nên phép trừ 'ước' vô nghĩa **Sửa:** Đặt bài về sell-out (đại lý bán ra tạp hoá) hoặc về nhánh thực sự không có số, ví dụ doanh số qua phân phối cấp hai
- **Đề xuất/viết lại:** Viết lại tình huống: 'Hãng có số đại lý nhập nhưng không có số đại lý bán ra; doanh thu nhập giảm 180 triệu có thể là tồn kho dồn chứ chưa phải sức mua giảm.' Khi đó bài thành bài về sell-in vs sell-out.

**B:gt04-07** — Việc nhanh thắng hay việc nền tảng: đội nhỏ nên làm cái nào trước? · tổng 5.4 · L2→L4 · IMPROVE
- *P1 example* — «mang về khoảng 60 lịch trong 2 tuần ... 40 lịch mỗi tháng» → Ưu đãi cho 60 lịch/2 tuần (khoảng 120/tháng) còn nhiều hơn nền tảng 40/tháng; số liệu không chứng minh nền tảng thắng, bài không đưa chi phí/biên lợi nhuận mỗi lịch **Sửa:** Thêm giá trị mỗi lịch: ưu đãi 99.000 đồng là lỗ vốn, khách quay lại thanh toán đủ; so lợi nhuận chứ không so số lịch
- **Đề xuất/viết lại:** Viết lại ví dụ so lợi nhuận 12 tháng: ưu đãi lặp mỗi quý 60 lịch x lãi 20.000 đồng; nhắc lịch 40 lịch/tháng x lãi 250.000 đồng = 10 triệu/tháng. Đây mới là lý do nền tảng thắng.

**B:tn06-02** — Mới chạy 5 ngày, chưa có mấy đơn — nhìn vào đâu để quyết? · tổng 5.4 · L3→L4 · IMPROVE
- *P1 example/Q2/Q5* — «Chi phí mỗi lượt thêm giỏ trên TikTok: 6.000.000 ÷ 120 = 50.000đ. ... Chỉ số dẫn đầu tốt hơn rõ.» → Bài tự đặt điều kiện: chỉ số dẫn đầu chỉ đáng tin khi đã biết tỉ lệ sang đơn. Q5 cho thấy 120 giỏ kỳ vọng 24 đơn nhưng thực tế 3 (1/8 tỉ lệ Facebook), tức quan hệ đã gãy; đơn vị đúng là chi phí mỗi đơn kỳ vọng tệ hơn Facebook. Kết luận 'tín hiệu tốt' vi phạm chính điều kiện đó **Sửa:** Đổi hướng: 'thêm giỏ nhiều nhưng không thành đơn là tín hiệu cảnh báo; kiểm tra thanh toán hoặc chất lượng giỏ (tò mò/lướt) trước khi tăng tiền'.
- **Đề xuất/viết lại:** Viết lại example: 'Nếu Facebook cứ 10 giỏ ra 2 đơn thì 120 giỏ phải ra khoảng 24 đơn; mới có 3 nghĩa là giỏ TikTok đang kém chất lượng. Dùng giỏ để chẩn đoán, chưa dùng để khen kênh'.

**L:15** — Quảng cáo bị bỏ qua trước khi bị đọc · tổng 5.4 · L2→L3 · IMPROVE
- *P1 try* — «Nếu nó yếu đi, phần bị cắt không phải là thứ đang gánh việc» → Logic ngược: nếu quảng cáo yếu đi sau khi cắt thì phần bị cắt CHÍNH LÀ thứ gánh việc **Sửa:** Sửa: "Nếu nó yếu đi, phần bị cắt đang gánh việc; nếu vẫn mạnh, phần đó chỉ là trang trí."
- **Đề xuất/viết lại:** Sửa logic try; thêm "kiểm 1 giây" là test cụ thể. Gộp ý màu/bố cục sang L:7.

**B:kh06-04** — Khách đã chọn hãng bạn ở nhà, sao đến cửa hàng lại đổi ý? · tổng 5.5 · L3→L4 · IMPROVE
- *P1 example* — «đổi vị trí lên ngang tầm mắt, làm dải kệ cùng màu để dễ tìm, và in lợi ích chính» → Đổi ba thứ cùng lúc, nhưng Q7 dạy 'đổi một thứ ở 2 siêu thị'; ví dụ tự mâu thuẫn bài học và không tách được thứ nào có tác dụng **Sửa:** Nêu rõ thử từng thay đổi một, hoặc nói 'gói thay đổi, sau đó tách ra thử'
- **Đề xuất/viết lại:** Thêm dữ liệu 'lý do đặt xuống' (hỏi khách tại chỗ). Ví dụ: 'Hỏi 20 người đặt xuống: vì sao chọn chai bên cạnh? Giá, tem, hay màu sắc?'

**B:gt01-04** — Vấn đề này là vấn đề của ai? · tổng 5.5 · L2→L4 · IMPROVE
- *P1 concept/Q4* — «Thường nên đi tới mắt xích gần người mua nhất đang bị kẹt» → Quy tắc khái quát hoá: vấn đề cũng có thể xuất phát từ trên (sản phẩm, đại lý không giao hàng). Q4 (app trẻ em) đáp 'của trẻ' mâu thuẫn với quy tắc vì người mua là phụ huynh, và phụ huynh quyết định gia hạn: hai đáp án cùng bảo vệ được **Sửa:** Đổi quy tắc thành 'đi tới nơi hành vi cần đổi để con số đổi' và viết lại Q4 theo đó.
- **Đề xuất/viết lại:** Viết lại phần concept quanh câu hỏi: 'Hành vi của ai cần đổi để con số đổi, và rào cản của họ là gì?' Ví dụ: 'Chủ tạp hoá chưa treo bánh vì biên lãi 8% và quầy chật; thưởng 20.000đ/tháng cùng giá treo gọn gỡ được cả hai.'

**B:tp05-06** — Vì sao thương hiệu nhà tuyển dụng cũng là tài sản? · tổng 5.5 · L3→L4 · IMPROVE
- *P1 Q6* — «Tin tuyển dụng có thể hứa điều mà trải nghiệm thật không giữ» → Đáp án đúng là một giả thuyết; why.d chê ‘kết luận khi chưa hỏi người nghỉ là đoán’ nhưng c cũng đoán. Lương, quản lý, công việc đều có thể **Sửa:** Đổi câu hỏi thành ‘Việc đầu tiên bạn làm là gì?’ và đáp án ‘phỏng vấn người nghỉ’
- **Đề xuất/viết lại:** Thêm EVP (3 lý do người giỏi chọn và ở lại) và đổi ví dụ sang ‘hồ sơ đạt chuẩn’. Ví dụ: ‘120 hồ sơ nhưng 18 đạt vòng 1 so với 6 trước đó, tỉ lệ đạt 15% so với 15%: kết luận gì?’.

**B:kn01-03** — Nên trả tiền để mua người xem mới, hay để đẩy cái đã chạy tốt? · tổng 5.5 · L3→L4 · IMPROVE
- *P1 Q4/Q2* — «9.000.000 − 10.000.000 = −1.000.000 đ» → Chính phương án 'đẩy bài đã chứng minh' mà bài khuyên lại lỗ theo số của bài; Q2 chia 8 triệu cũng lỗ. Luận điểm 'đẩy cái đã thắng' bị phá bởi phép tính của chính nó mà bài không giải quyết. **Sửa:** Chỉnh số (CPC, tỉ lệ đặt, lãi) để có lãi, hoặc biến Q4 thành bài học 'rẻ hơn ≠ có lãi' có kết luận hành động rõ.
- *P1 concept* — «3.000 lượt tương tác trong khi bài thường chỉ 80» → Tương tác trên bài kể chuyện ủ chượp chưa chứng minh ý định mua; bài coi tín hiệu 'thích' là bằng chứng chạm đúng người. **Sửa:** Thêm điều kiện: bài phải có tín hiệu gần mua (nhắn tin, lưu, nhấp trang) và thử với ngân sách nhỏ trước.
- **Đề xuất/viết lại:** Viết lại ví dụ: 'Bài ủ chượp có 40 tin nhắn hỏi mua trong 2 ngày, bài thường 1. Đẩy 2 triệu thử trước; nếu CPA dưới 60.000đ thì nâng.' Dùng tín hiệu gần mua thay cho lượt tương tác.

**B:kn02-03** — Mở thêm 500 điểm bán hay bán thêm ở 2.000 điểm cũ? · tổng 5.5 · L3→L4 · IMPROVE
- *P1 concept/example* — «Điểm cũ đã có đường giao hàng nên chi phí thêm cho mỗi hộp thường thấp hơn.» → Bài nói 'đặt cạnh chi phí để chọn' nhưng không đưa chi phí nào; so hai phương án chỉ bằng số hộp. Lift +4 hộp/điểm bằng khuyến mãi cũng là tạm thời, trong khi điểm mới còn tích luỹ lâu dài. **Sửa:** Thêm chi phí: mở điểm 200.000đ/điểm, khuyến mãi 150.000đ/điểm/tháng; so chi phí mỗi hộp thêm, và tách lift tạm thời/bền vững.
- **Đề xuất/viết lại:** Viết lại ví dụ có chi phí: 'Mở rộng 6.000 hộp tốn 100 triệu = 16.700đ/hộp; đào sâu 8.000 hộp tốn 120 triệu = 15.000đ/hộp nhưng chỉ kéo 2 tháng.' Hỏi: chọn phương án nào và vì sao.

**B:kn03-05** — Livestream bán hàng lần đầu: chuẩn bị gì để không nói chuyện một mình? · tổng 5.5 · L3→L4 · IMPROVE
- *P1 example* — «người ở lại tăng lên 25 và 20% người xem mua, phiên live có 30 đơn» → 25 người ở lại nhưng 30 đơn; 20% của 150 mới ra 30. Mâu thuẫn nội bộ **Sửa:** Nói rõ: 25 người ở lại cùng lúc, 150 lượt vào lũy kế, 8% mua trên lượt vào = 12 đơn
- *P1 Q3/Q7* — «20% mua, giá trị mỗi đơn 120.000đ» → Tỉ lệ mua 20% trên lượt vào phi thực tế (live thường vài %); dạy kỳ vọng sai **Sửa:** Dùng 3-5% và tính doanh thu ~ 540.000-900.000đ
- **Đề xuất/viết lại:** Thêm bảng kịch bản 12 phút theo giây. Viết lại ví dụ: "150 lượt vào, 25 người xem đồng thời, 12 đơn (8%); mục tiêu phiên sau: giữ trung bình 40 người xem đồng thời".

**B:kn14-04** — Stories: người xem chạm vào, trả lời hay lướt sang — bạn thiết kế cho điều nào? · tổng 5.5 · L3→L4 · IMPROVE
- *P1 example* — «Họ rút chuỗi còn 5 khung: ảnh mẫu mở đầu, hai ảnh sản phẩm, một khung hỏi» → Đổi cùng lúc số khung, thêm khung hỏi, thêm nút nhắn tin, rồi quy cải thiện (6→58 trả lời) cho cả gói; trái với Q6 dạy đổi một biến **Sửa:** Đổi từng việc hoặc nêu rõ đây là gói thay đổi, không quy cho từng phần
- *P1 example* — «người xem còn lại ở khung cuối là 46%» → So 18% ở khung 9 với 46% ở khung 5 là so hai chuỗi khác độ dài; còn lại ở khung cuối tự nhiên cao hơn khi chuỗi ngắn hơn, không chứng minh chuỗi tốt hơn **Sửa:** So tỉ lệ còn lại ở cùng vị trí khung hoặc so số người trả lời/bấm
- **Đề xuất/viết lại:** Viết lại ví dụ theo từng thử một: tuần 1 chỉ rút 9→5 khung, tuần 2 mới thêm khung hỏi, ghi số trả lời mỗi tuần. Đổi chỉ số thành 'số người trả lời trên người xem khung đầu'.

**B:tn03-03** — Đổi tiêu đề hay đổi ảnh chính trước? · tổng 5.5 · L3→L4 · IMPROVE
- *P1 Q2* — «Chỉ đổi ảnh chính, giữ nguyên các yếu tố khác, đo tỉ lệ bấm sau một tuần» → Đáp án đúng là so trước-sau, tự mâu thuẫn với Q5 (chê so tháng này tháng sau) và với cảnh báo mùa vụ trong chính ví dụ **Sửa:** Ghi rõ: tạo hai bản cùng lúc hoặc có đối chứng; hoặc thêm 'và đối chiếu tuần cùng kỳ không có sự kiện'
- **Đề xuất/viết lại:** Sửa Q2 đáp án thành thiết kế có đối chứng. Ví dụ viết lại: 'Chạy ảnh cũ và ảnh mới cho hai nhóm hiển thị song song trong một tuần, so CTR từng nhóm.'

**B:tu03-08** — Hợp tác khuyến mãi với đối tác thế nào để cả hai cùng lợi? · tổng 5.5 · L2→L4 · IMPROVE
- *P1 example* — «không bên nào giảm giá sản phẩm chính của mình cho khách đại trà» → Mâu thuẫn với situation: quán nước ép giảm 20% chính sản phẩm của mình cho hội viên gym; takeaway 'tặng thứ tốn ít' không áp dụng cho bên này **Sửa:** Đổi ưu đãi nước ép thành 'tặng ly nhỏ thứ hai' hoặc voucher giờ vắng, hoặc sửa câu cho đúng
- **Đề xuất/viết lại:** Thêm calc đối soát: '60 hội viên x 1,2 triệu/năm = 72 triệu so với chi phí tuần thử'. Viết lại ví dụ: 'Quán nước ép tặng ly nhỏ miễn phí lần đầu thay vì giảm 20%.'

**B:ob01-06** — Bán đồ chơi giáo dục: nói chuyện với đứa trẻ hay với bố mẹ? · tổng 5.6 · L3→L4 · IMPROVE
- *P1 Q7* — «c) Người dùng, qua nỗi lo của người mua là mèo chê ăn» → Hai đáp án cùng có thể đúng: lời hứa 'mèo mê ngay' nói với chủ (người mua) về trải nghiệm người dùng; phương án c được bẻ thành câu ghép để thành đáp án. **Sửa:** Đổi tình huống: 'Quảng cáo chiếu trong giờ hoạt hình, nhân vật mèo nhảy múa — ai là đối tượng thông điệp?'
- **Đề xuất/viết lại:** Thêm bảng vai-điều họ cần nghe-kênh. Ví dụ viết lại: 'Mẹ: chứng nhận an toàn trong 3 giây đầu; bé: video 15 giây; cô giáo: bộ mẫu kèm phiếu hoạt động.'

**B:kh05-03** — Phỏng vấn đồng nghiệp và bạn bè có tính không? · tổng 5.6 · L3→L4 · IMPROVE
- *P1 situation* — «khách mục tiêu của app là chủ tiệm tóc bình dân» → Người cần phỏng vấn là chủ tiệm nhưng tiêu chí sàng lọc và ví dụ lại chọn người đi cắt tóc; nhầm khách trả tiền với khách của khách **Sửa:** Tách rõ hai nhóm: chủ tiệm (khách trả tiền) và người đến cắt (người dùng cuối), rồi viết tiêu chí cho từng nhóm
- **Đề xuất/viết lại:** Viết lại tình huống: app đặt lịch cho chủ tiệm bình dân; sàng lọc 'đang tự quản lý lịch hẹn bằng sổ/Zalo, tiệm có từ 1–3 thợ'. Ví dụ rewrite: 'Hỏi: Tuần rồi tiệm anh có khách phải chờ quá 20 phút không? Ghi lại lần gần nhất.'

**B:kh06-01** — Điều gì khiến khách bắt đầu nghĩ tới việc mua? · tổng 5.6 · L2→L3 · IMPROVE
- *P1 Q2* — «Dời phần lớn tiền sang nơi trigger xảy ra, giữ khoản dự phòng bật nhanh» → Dạy dời phần lớn ngân sách theo trigger, loại hẳn lập luận hiện diện thương hiệu quanh năm (phần lớn khách không in-market tại một thời điểm) mà không nêu đánh đổi **Sửa:** Sửa đáp án: 'Chia: nền hiện diện tối thiểu + dồn đỉnh vào trigger; thử bằng vùng đối chứng'
- **Đề xuất/viết lại:** Thêm cách tìm trigger: phỏng vấn 'điều gì xảy ra ngay trước khi bạn bắt đầu tìm?'. Rewrite Q2: 'Bạn chia ngân sách 70% nền và 30% đợt trigger, hay ngược lại, vì sao?'

**B:kh06-07** — Làm sao để lần mua thứ hai tự xảy ra? · tổng 5.6 · L3→L4 · IMPROVE
- *P1 Q1* — «Đoán xem lý do phổ biến nhất là gì?» → Stem không có dữ kiện nào chọn được d; cả bốn nguyên nhân đều hợp lý. Đáp án chỉ đúng vì bài khẳng định, và why.b ('nếu đắt họ đã không mua lần đầu') là lập luận sai logic **Sửa:** Thêm dữ kiện: 'khảo sát 100 người không mua lại: 60 nói quên, 15 nói không ngon'
- *P1 concept* — «Khách không bỏ đi vì ghét, mà vì quên đúng lúc hết hàng» → Khẳng định chung không bằng chứng; 28% mua lại có thể do chất lượng, giá, hoặc chỉ mua thử **Sửa:** Viết 'một nguyên nhân hay gặp là quên; cần hỏi khách không quay lại'
- **Đề xuất/viết lại:** Thêm bước 'hỏi 10 người không mua lại' trước khi đề xuất nhắc. Ví dụ: 'Gọi 10 khách không quay lại: lần gần nhất hết cà phê, bạn mua ở đâu?'

**B:kh07-03** — Menu trà sữa 48 món: nhiều lựa chọn hơn có bán được nhiều hơn? · tổng 5.6 · L3→L4 · IMPROVE
- *P1 concept* — «Khi quá nhiều, khách mệt, sợ chọn sai, và phản ứng bằng cách hoãn» → Trình bày hiệu ứng như quy luật chắc chắn, không nhắc meta-analysis (Scheibehenne 2010) cho hiệu ứng trung bình gần 0, khác với kh07-01/02 vốn có cảnh báo **Sửa:** Thêm: 'Hiệu ứng phụ thuộc độ phức tạp và độ rõ tiêu chí; nhiều nghiên cứu lặp lại không thấy - hãy thử'
- **Đề xuất/viết lại:** Thêm đoạn 'Khi nào nhiều lựa chọn lại tốt: khách rành, có tiêu chí'. Q mới: 'Quán A cắt 48->16 món nhưng doanh thu/khách giảm 8%. Hai giả thuyết? Bạn đo gì để phân biệt?'.

**B:tp11-02** — Nên ghi 199.000đ hay 200.000đ cho chiếc váy của bạn? · tổng 5.6 · L2→L4 · IMPROVE
- *P1 concept* — «giá lẻ hợp với hàng mua vì lý trí, khách hay so giá; giá tròn hợp với hàng mua vì cảm xúc» → Trình bày nghiên cứu hành vi (left-digit effect, Thomas & Morwitz 2005; round prices & feelings, Wadhwa & Zhang 2015) như quy tắc chắc chắn, không dẫn nguồn, không nêu bằng chứng trái chiều. **Sửa:** Ghi: 'Nghiên cứu cho thấy xu hướng; thị trường Việt Nam cần thử giá thật'.
- **Đề xuất/viết lại:** Thêm một mục 'Bằng chứng và giới hạn' và bài tập thiết kế thử A/B giá. Viết lại: 'Quy tắc này là giả thuyết; thử 199.000đ vs 200.000đ trong 2 tuần và đo doanh thu, không chỉ số đơn.'

**B:tp11-03** — Chi phí 40.000đ thì bán 60.000đ — hay bán theo giá trị khách nhận? · tổng 5.6 · L3→L5 · IMPROVE
- *P1 example* — «Cô báo 15 triệu cho logo kèm bộ quy chuẩn dùng trên biển hiệu, áo, ứng dụng: làm 40 giờ» → Phạm vi công việc tăng từ 8 lên 40 giờ; tăng giá một phần do khối lượng chứ không thuần 'theo giá trị'. Lẫn hai khái niệm. **Sửa:** Tách: 'Cùng 8 giờ, giá trị cho chuỗi gym lớn hơn nhiều; nếu thêm bộ quy chuẩn thì thêm giờ và thêm giá'.
- **Đề xuất/viết lại:** Viết lại tiêu đề và thêm bước 'hỏi khách' để tìm giá trị: 'Logo giúp chuỗi gym bán thêm bao nhiêu thẻ? Nếu 5 chi nhánh x 100 thẻ x 5 triệu thì 15 triệu chỉ là 0,6% giá trị.'

**B:kn06-06** — Khi thuật toán tự tìm khách, thứ gì quyết định ai thấy quảng cáo? · tổng 5.6 · L3→L4 · IMPROVE
- *P1 example* — «nhưng CTR 2% và tỉ lệ mua vẫn 2,5% → CPA 120.000đ ... vì cảnh 7h sáng đã tự chọn đúng người» → Tỉ lệ mua bằng nhau (2,5%) nên khác biệt CPA chỉ đến từ CTR; không có bằng chứng B ‘chọn đúng người’, có thể chỉ là hook hấp dẫn hơn **Sửa:** Đổi số: CVR của B cao hơn (3,5%) hoặc nói rõ lợi thế là CTR
- *P1 Q7/why.c* — «họ bấm và mua nhiều hơn hẳn» → Dữ liệu cho CVR bằng nhau; ‘mua nhiều hơn’ chỉ đúng trên mỗi lượt hiển thị **Sửa:** Sửa thành ‘bấm nhiều hơn’
- *P1 example vs kn06-01* — «B đắt hơn ở lượt hiển thị (CPM 60.000đ) dù CTR gấp đôi» → Mâu thuẫn bài 01 (quảng cáo được bấm nhiều thường trả CPM thấp hơn); giải thích ‘tệp bị cạnh tranh nhiều’ là suy đoán **Sửa:** Thống nhất: nói CPM của B không thấp hơn vì tệp khác, hoặc cho CPM thấp hơn
- **Đề xuất/viết lại:** Viết lại ví dụ: cùng ngân sách, B có CTR 2% và CVR 3%, kèm thống kê khán giả 70% dân văn phòng. Thêm câu: ‘vì sao không thể kết luận B tốt hơn nếu A chạy tuần trước, B chạy tuần Tết?’.

**B:kn12-03** — Viên uống 'đẹp da' lên sóng thứ Hai - đã có giấy xác nhận nội dung chưa? · tổng 5.6 · L3→L4 · IMPROVE
- *P1 Q1* — «c) Hai chỗ: câu 'hết nám' và câu 'thay được thuốc bôi'» → Stem hỏi 'mấy chỗ có thể vướng'; c là đúng một phần, d dùng 'Từ ba chỗ' mơ hồ; có thể bị tranh cãi hai đáp án. **Sửa:** Hỏi 'chỗ nào KHÔNG phải vấn đề' hoặc liệt kê rõ 4 lỗi.
- *P1 example/Q5* — «Nghị quyết 21/2026/NQ-CP» → Căn cứ báo chí về chuyển thẩm quyền xác nhận; why.c nêu NĐ 342/2025 giữ giá trị giấy cũ, tôi không xác minh được. **Sửa:** Thay bằng văn bản gốc và kiểm lại.
- **Đề xuất/viết lại:** Tách thành 'TPBVSK và giấy xác nhận' và 'sản phẩm trẻ em/thuốc'; viết lại lời thoại mẫu: 'Collagen X là thực phẩm bảo vệ sức khỏe, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.'

**B:kn12-04** — Mua 1 tặng 1 hay phiếu cào trúng xe máy - cái nào cần thủ tục? · tổng 5.6 · L3→L4 · IMPROVE
- *P1 concept* — «Nghị định 239/2026/NĐ-CP (hiệu lực 26/6/2026). Theo tóm tắt của LuatVietnam, Nghị định 239 bỏ mức giảm giá tối đa» → Tôi không xác minh được văn bản; bài dựa vào tóm tắt bên thứ ba. Nếu sai, nhiều câu (Q1 why.b, Q2) sai; trong khi nguồn thông dụng vẫn nói hạn mức 50%. **Sửa:** Dẫn văn bản gốc, ghi rõ giai đoạn trước/sau và hạn mức cũ để người học không nhầm.
- **Đề xuất/viết lại:** Thêm bài toán incremental: 'tuần 1 bán 6.000 ly (3.000 trả tiền) so với tuần thường 1.500: doanh thu thêm bao nhiêu, lãi gộp thêm bao nhiêu so với chi phí 45 triệu?'

**B:kn13-04** — Lịch nội dung 30 ngày: lập từ mục tiêu hay từ ý tưởng? · tổng 5.6 · L3→L5 · IMPROVE
- *P1 example* — «Đội chọn mục tiêu: tăng 30 đơn bánh sinh nhật.» → Mục tiêu 30 đơn nhưng 30 bài chia 12-9-9 không có phép nối từ bài đến đơn (cần bao nhiêu lượt xem, tỉ lệ nhắn, tỉ lệ chốt), nên 'lịch từ mục tiêu' chỉ là chia đều theo tỉ lệ tự đặt **Sửa:** Tính ngược: 30 đơn ÷ 10% chốt = 300 tin nhắn; ÷ 3% từ trang = 10.000 lượt vào; từ đó mới ra số bài và trụ cột
- **Đề xuất/viết lại:** Thêm một bước ngược từ mục tiêu ra khối lượng nội dung, kèm trade-off 'ít bài tốt hay nhiều bài vừa'. Ví dụ: 'Với 3% từ bài sang tin nhắn và 10% chốt, 30 đơn cần ~1.000 tin nhắn nên cần tăng bài đặt bánh lên'.

**B:dl02-04** — Tỉ lệ LTV/CAC bằng 3 thì nên làm gì tiếp? · tổng 5.6 · L2→L4 · MERGE → B:dl02-05

- **Đề xuất/viết lại:** Gộp vào dl02-05 như phần mở đầu, hoặc thêm tình huống 3 doanh nghiệp cùng tỉ lệ 3 nhưng payback 2, 10, 24 tháng và buộc người học xếp hạng theo rủi ro vốn.

**L:10** — Giảm giá là một khoản vay · tổng 5.6 · L3→L4 · IMPROVE
- *P1 try* — «bù đúng một đợt giảm 20% vừa rồi» → Không cho biên lợi nhuận gộp nên người học không tính được; công thức hoà vốn không được nêu **Sửa:** Cho công thức: tăng sản lượng cần = giảm giá / (biên - giảm giá). Ví dụ biên 40%, giảm 20% => +100%
- **Đề xuất/viết lại:** Thêm ví dụ tính: biên 30%, giảm 10% => cần +50% sản lượng. Kèm bảng 10/20/30%.

**B:ob02-08** — Nhãn riêng của siêu thị đang cạnh tranh với ai? · tổng 5.8 · L3→L4 · IMPROVE
- *P1 concept vs Q7* — «Chúng thường không cạnh tranh với tất cả, mà nhắm vào hãng lớn nhất» → Q7 lại kết luận hãng ở giữa mất nhiều nhất; hai ý mâu thuẫn. Nghiên cứu (Sethuraman và cộng sự) cho thấy nhãn riêng cạnh tranh gần nhất với thương hiệu quốc gia hạng hai/ba. **Sửa:** Sửa concept: 'nhãn riêng thường lấy nhiều nhất từ hãng gần giá/gần chất lượng'.
- **Đề xuất/viết lại:** Thêm ví dụ VN thật (ví dụ nhãn riêng của chuỗi siêu thị) và biên lãi. Ví dụ: 'Nhãn riêng giá 32k, vốn 20k (lãi 12k) vs hãng 45k, vốn 36k (lãi 9k): vì sao chuỗi muốn đẩy nhãn riêng?'

**B:ob04-02** — Vẽ bản đồ đối thủ thế nào để thấy chỗ trống? · tổng 5.8 · L3→L4 · IMPROVE
- *P1 example* — «21 người (35%) nói sẵn sàng trả trên 25.000đ» → Ý định nói ra từ 60 người chưa phải 'có khách thật'; kết luận 'có khách thật, đó là cơ hội' quá mạnh **Sửa:** Gọi là tín hiệu, rồi kiểm tra bằng bán thử/đặt cọc
- **Đề xuất/viết lại:** Thêm bước chọn trục bằng 10 phỏng vấn: 'khi chọn bánh sáng, 2 yếu tố bạn nghĩ tới đầu tiên?'. Ví dụ bài tập: so sánh hai bản đồ cho cùng ngành với trục khác nhau.

**B:kh08-08** — Mua review, bịa 'khách nói gì': ranh giới pháp lý và đạo đức ở đâu? · tổng 5.8 · L3→L5 · IMPROVE
- *P1 example* — «họ gửi 200 hộp dùng thử cho người mua đầu tiên, nhắn sau 3 tuần xin đánh giá thật» → Đánh giá từ người được tặng hàng là quan hệ lợi ích; ví dụ chính không nói phải công khai, mâu thuẫn ranh giới 'công khai' của bài **Sửa:** Thêm: 'yêu cầu ghi rõ đã nhận hàng dùng thử, không điều kiện số sao'
- *P1 Q7* — «Video có "hợp tác" vẫn đạt tỉ lệ nhấp tương đương các video không ghi» → Số liệu không nguồn; Q7 yêu cầu giải thích một dữ kiện chưa chứng minh và chấm 'người xem quen nhãn hợp tác' là đúng **Sửa:** Bỏ hoặc nêu rõ là giả định; đổi câu hỏi sang 'Bạn thiết kế A/B nào để kiểm tra?'
- **Đề xuất/viết lại:** Thêm bảng 'được/không được' với 6 tình huống xám (tặng hàng, giảm giá cho đánh giá, trích 'bán chạy' nhưng lọc bớt). Viết lại example: 'Họ ghi rõ ... đã nhận hộp dùng thử; chỉ mời đánh giá, không yêu cầu số sao'.

**B:tp06-03** — Chạy một đợt thật lớn rồi nghỉ, hay nhắc đều suốt năm? · tổng 5.8 · L3→L4 · IMPROVE
- *P1 concept* — «hiện diện đều ở mức vừa đủ thường tốt hơn một cú nổ» → Trình bày như kết luận chung trong khi bằng chứng về burst/pulsing/continuity còn tranh luận, và ngành mùa vụ (Tết) có lý do chạy dồn **Sửa:** Nói rõ điều kiện: ngành mua quanh năm thì liên tục; mùa vụ cao thì dồn quanh mùa kèm lớp nền
- **Đề xuất/viết lại:** Tính ví dụ cụ thể hai lịch chạy với cùng 1,2 tỉ qua 12 tháng, cho thấy mức nhớ trung bình. Thêm câu: 'Khi nào dồn là đúng? — hàng mua một mùa'.

**B:tp09-05** — Chi tiết nào làm câu chuyện đáng tin? · tổng 5.8 · L3→L4 · IMPROVE
- *P1 example/Q4* — «chỉ cần 1.100 km là người đọc tự suy ra "giày chịu được"» → Giày chạy bộ thường 500-800 km là hết vòng đời; 1.100 km trên một đôi lại là dấu hiệu quá cũ, suy luận 'độ bền' này không chắc; bài cũng không nói là một đôi **Sửa:** Dùng chi tiết thay thế: 'đôi giày thứ hai của anh, đế vẫn bám đường sau 600 km'
- **Đề xuất/viết lại:** Sửa ví dụ để không suy ra sai và thêm bước thu thập chi tiết. Ví dụ: 'Hỏi khách 3 câu: sáng đó bạn làm gì đầu tiên, ai thấy bạn thay đổi, ngày nào bạn nhận ra?'

**B:kn06-02** — Khách đang tìm “sửa máy lạnh quận 7” — nên chạy Google hay TikTok? · tổng 5.8 · L3→L4 · IMPROVE
- *P1 example* — «tiệm có khoảng 7 cuộc đặt/tháng từ một nguồn khách đang cần ngay» → Không tính chi phí: 8 triệu/tháng mà chỉ khoảng 7 cuộc, CPA ngầm >1 triệu/cuộc; bài không so với doanh thu một ca sửa **Sửa:** Thêm CPC ước tính (khoảng 8–15 nghìn?), tổng chi và giá trị một ca; chỉ ra phần ngân sách còn dư
- **Đề xuất/viết lại:** Thêm một vòng kinh tế: CPC 8.000đ → 144 click = 1,15 triệu; CPA ≈160.000đ/cuộc. Ngay sau đó chỉ ra 6,8 triệu còn lại nên dùng cho Maps/đánh giá hoặc video địa phương.

**B:kn10-05** — Có 50 triệu thì kế hoạch khác 5 tỷ ở đâu? · tổng 5.8 · L3→L5 · IMPROVE
- *P1 concept* — «Mỗi kênh cần một mức tối thiểu để có tác dụng» → Nguyên lý cốt lõi nhưng không nêu ngưỡng hay cách ước (số chuyển đổi cần cho học thuật toán, tần suất hiệu quả) **Sửa:** Cho ví dụ: Meta cần khoảng 50 chuyển đổi/tuần để ra pha học; ngân sách theo ngày tối thiểu
- **Đề xuất/viết lại:** Thêm bảng ngưỡng ngân sách tối thiểu tham khảo và bài toán 20 triệu với yêu cầu ghi kênh/tuần/chỉ số; đưa vào số 'khách đến từ đâu' của quán.

**B:kn10-09** — Rà soát gì trước khi bấm chạy? · tổng 5.8 · L3→L4 · IMPROVE
- *P1 Q1* — «Mã giảm giá KOL chưa tạo — khách nhập mã thất bại đúng lúc định mua» → Hai đáp án b và c đều bảo vệ được: link bio 404 chặn toàn bộ lượng vào từ TikTok, mã KOL chỉ chặn một nhóm; lời giải c 'có thể tìm hãng trên sàn' là suy đoán **Sửa:** Nêu tỉ lệ lượng khách qua từng đường để câu có đáp số duy nhất
- **Đề xuất/viết lại:** Thêm 'ba mức lỗi' (chặn mua, sai niềm tin, mất đo lường) và sửa Q1 thành xếp thứ tự có số khách qua từng đường.

**B:kn14-02** — Reels: xem hết, chia sẻ lại, thích, vào trang âm thanh — thiết kế cho điều nào? · tổng 5.8 · L3→L4 · IMPROVE
- *P1 example* — «Reels ngắn giữ người và được gửi lại nhiều hơn rõ rệt» → So Reels 55 giây về menu với Reels 18 giây về mẹo: khác độ dài, chủ đề, mục đích; nên không kết luận được độ dài là nguyên nhân. Tỉ lệ xem hết thấp hơn ở video dài là bình thường **Sửa:** Nói đây là gợi ý để thử, và thử cùng chủ đề ở hai độ dài
- **Đề xuất/viết lại:** Thêm bước kiểm: 'chỉ đổi độ dài, giữ chủ đề'. Viết lại ví dụ: 'Cùng mẹo, quay bản 18 giây và bản 40 giây, so tỉ lệ xem hết và gửi lại sau hai tuần'.

**B:dl06-10** — Shop 30 triệu/tháng có cần công cụ ghi công đắt tiền? · tổng 5.8 · L3→L5 · IMPROVE
- *P1 Q5* — «giá trị ngân sách được phân bổ lại mỗi tháng là bao nhiêu triệu» → Tính 5%×3 tỉ=150 triệu chỉ là số tiền chuyển, không phải giá trị tạo ra; câu không kiểm khả năng đánh giá lợi ích so với chi phí công cụ như bài nói. **Sửa:** Hỏi lợi nhuận tăng thêm nếu kênh tốt có iROAS cao hơn rồi so với phí công cụ.
- **Đề xuất/viết lại:** Thêm ngưỡng cụ thể. Ví dụ: 'Nâng cấp khi chi quảng cáo trên 100 triệu/tháng và có hơn 3 kênh, vì sai 10% ngân sách đã bằng phí công cụ.'

**B:tu05-07** — Nhóm khách VIP chiếm bao nhiêu doanh thu, đối xử khác thế nào · tổng 5.8 · L3→L4 · IMPROVE
- *P1 concept* — «Mất một khách VIP bằng mất vài chục khách thường» → Mâu thuẫn số trong chính bài: 3,6 triệu vs 489.000 chỉ ~7,4 lần, không phải 'vài chục' **Sửa:** Sửa thành 'khoảng 7 khách thường' hoặc dùng số của bài
- **Đề xuất/viết lại:** Thêm bước xếp hạng RFM đơn giản và một bài thử: 'VIP nhóm A nhận ưu tiên, nhóm B đối chứng; so tần suất sau 3 tháng'. Sửa 'vài chục' thành '~7 lần'.

**B:tu05-09** — Có nên bán cỡ gói lớn cho khách quen · tổng 5.8 · L3→L5 · IMPROVE → B:tu05-04
- *P1 example* — «phần giữ lại có thể bù» → Với số của bài: lãi/lít giảm 40.000 -> 32.500 (mất 18,75%) nhưng chỉ giữ 15% khách vốn sẽ đi; nếu toàn bộ khách chuyển túi, 100×32.500 = 3.250 < 85×40.000 = 3.400, nên KHÔNG bù. Ví dụ dẫn người học tới kết luận sai **Sửa:** Tính hoà vốn: cần giữ ≥ 18,75% khách vốn sẽ đi, hoặc chỉ khoảng một phần khách quen chuyển túi
- **Đề xuất/viết lại:** Thêm: 'Nếu 100 khách quen chuyển hết sang túi, cần ít nhất bao nhiêu khách vốn sẽ bỏ đi mà túi giữ lại để hoà vốn?' (đáp số ~18,75).

**B:kh02-05** — Khách mua nhiều hay khách mua thỉnh thoảng — ai đáng để nói chuyện? · tổng 5.9 · L3→L4 · IMPROVE
- *P1 example* — «Để khách nặng tạo thêm chừng đó, mỗi người phải mua thêm 4 lần» → So sánh +1 lần của 800 khách nhẹ (tăng 50% tần suất của họ) với +4 lần của khách nặng (tăng 33%) là so khác tỉ lệ; theo mức tăng tương đối, khách nhẹ khó hơn. Phép tính đúng nhưng kết luận 'bất khả' bị thổi phồng **Sửa:** So cùng tỉ lệ: +10% tần suất ở mỗi nhóm cho +240 và +160 lượt
- *P1 concept* — «Nhiều nghiên cứu hành vi mua cũng cho thấy» → Dựa vào Byron Sharp/Ehrenberg-Bass nhưng không nêu nguồn và trình bày như đồng thuận, trong khi kh02-02 nêu quan điểm này như một trong hai trường phái **Sửa:** Nêu tên nguồn và nói còn tranh luận
- **Đề xuất/viết lại:** Đặt cạnh hai nhóm một bảng: lượt mua hiện có, mức tăng khả thi, chi phí kích hoạt, lãi thêm. Ví dụ viết lại: 'Nhắc 800 khách nhẹ tốn 20 triệu, nếu 30% mua thêm 1 lần x 80.000đ lãi = 19 triệu'.

**B:gt02-06** — Doanh thu tăng mà lãi giảm: vẽ cây gì? · tổng 5.9 · L3→L4 · IMPROVE

- **Đề xuất/viết lại:** Thêm tính biên đóng góp mỗi đơn: 'giá 100k - giảm 15k - giá vốn 45k - phí sàn 8k - KOC 10k = 22k'. Hỏi: bán thêm 20% đơn nhưng biên giảm còn 15k thì lãi gộp đổi ra sao.

**B:tp04-07** — Đối thủ bắt chước tài sản của bạn, làm gì bây giờ? · tổng 5.9 · L3→L4 · IMPROVE
- *P1 EXAMPLE/Q4* — «đường viền cắt răng cưa ở mép túi» → Coi một chi tiết hình dạng là ‘khó sao chép’ trong khi đối thủ đã sao chép màu và nón lá; why.a của chính Q4 nói đối thủ dễ chỉnh theo **Sửa:** Nói rõ ‘khó sao chép’ nghĩa là gì: sở hữu độc quyền được đăng ký hoặc chi phí chuyển đổi, không phải chỉ là khác biệt thẩm mỹ
- **Đề xuất/viết lại:** Thêm một câu hỏi về việc đã đăng ký nhãn hiệu/kiểu dáng chưa, và thang phản ứng: theo dõi → làm đậm → thư cảnh báo → kiện. Ví dụ: ‘Túi chưa đăng ký kiểu dáng; việc đầu tiên là…’.

**B:kn09-04** — Tài trợ giải chạy 500 triệu đổi lấy gì? · tổng 5.9 · L3→L5 · IMPROVE
- *P1 example* — «100 nghìn đồng mỗi người, tốn nhưng có lý do để tính tiếp» → Không có tiêu chuẩn đánh giá đắt/rẻ: chi phí/người dùng thử không so với giá sản phẩm, LTV hay chi phí kênh khác; kết luận trôi **Sửa:** So với CPA/giá trị khách; nêu ngưỡng chấp nhận được
- **Đề xuất/viết lại:** Thêm bước so sánh: 'Cùng 800 triệu cho quảng cáo số, trial thật ước tính bao nhiêu? Nếu giá bán 15 nghìn và biên 40% thì cần mua lại bao lần để hoà vốn?'.

**B:kn10-08** — Đo từng kênh hay đo cả chiến dịch? · tổng 5.9 · L4→L5 · IMPROVE
- *P1 example/Q2/Q3* — «Tổng đơn thật 7.000 trên 2 tỷ, tức khoảng 286.000 đồng mỗi đơn.» → Gọi toàn bộ đơn kho là 'đơn do chiến dịch' mà không trừ baseline (đơn vốn có) và hoàn/huỷ; chi phí mỗi đơn tính ra bị đánh giá thấp, đồng thời không có doanh thu hay biên nên 'có đáng tiền không' chưa trả lời được **Sửa:** Tách đơn nền, ước đơn tăng thêm (so kỳ trước, vùng đối chứng) và so với giá trị đơn/biên
- **Đề xuất/viết lại:** Đổi chỉ số chung thành 'đơn tăng thêm so với kỳ nền' và thêm bước: 'đơn nền thường 5.000/kỳ; chiến dịch 7.000, vậy chi phí mỗi đơn tăng thêm là bao nhiêu?' (2 tỷ ÷ 2.000 = 1 triệu).

**B:tn04-08** — Freeship cho đơn từ 199k hay từ 299k: ngưỡng nào lãi hơn? · tổng 5.9 · L4→L4 · IMPROVE
- *P1 Q5* — «Ngưỡng thấp hơn có thể lãi hơn, vì mỗi đơn thêm đáng hơn phí ship» → Với số liệu bài (A 1.000 đơn/AOV 230k, B 900 đơn/AOV 260k), biên 60% và ship 15k vẫn cho B lãi hơn A (135 triệu vs 127,5 triệu), nên đáp án a không được dữ liệu ủng hộ; chỉ đúng nếu hành vi khác **Sửa:** Nêu số cho nhóm giả định (ví dụ B mất 300 đơn) hoặc đổi câu hỏi thành 'điều gì thay đổi'
- **Đề xuất/viết lại:** Sửa Q5 với bảng số. Ví dụ: 'Biên 60%, ship 15k. Ngưỡng cao mất 300 đơn, AOV +30k. Tính lãi hai nhóm.'

**B:dl01-08** — Mục tiêu tỉ lệ chuyển đổi 10% — đặt theo đâu mới thực tế? · tổng 5.9 · L3→L5 · IMPROVE
- *P1 concept/example* — «đặt mục tiêu cải thiện từng bước có căn cứ» → Không cho phương pháp tạo 'căn cứ': benchmark nội bộ, headroom theo bước, thử nghiệm nhỏ. Mục tiêu 0,75% (+25%) được đặt không lý do **Sửa:** Dạy: mục tiêu = hiện tại + (mức tăng bước có thử nghiệm) tính ngược ra số đơn
- **Đề xuất/viết lại:** Viết lại phần example: 'Mức 0,75% đến từ giả thuyết: nút gọi tư vấn kéo 15% khách để lại số, 40% số chốt đơn = +0,15 điểm.' Gắn mục tiêu với một thử nghiệm đo được.

**B:dl06-02** — Cùng một tháng, bốn mô hình cho bốn kết quả: tin cái nào? · tổng 5.9 · L2→L4 · IMPROVE
- *P1 Q2* — «Theo vị trí, giữ công cho cả chạm đầu lẫn chạm cuối» → Bài nói 'không mô hình nào đúng' rồi lại bắt chọn mô hình 40-20-40 làm chuẩn chia ngân sách; tỉ lệ 40-20-40 cũng tuỳ ý. Không nhắc cần đối chiếu thử nghiệm tăng thêm. **Sửa:** Đáp án nên là 'dùng nhiều mô hình để đối chiếu, kiểm bằng thử nghiệm'.
- **Đề xuất/viết lại:** Đổi Q2 đáp án thành 'đối chiếu và thử nghiệm'. Ví dụ: 'So last-click, tuyến tính, data-driven; kênh nào đổi thứ hạng nhiều nhất thì thử tắt kênh đó ở một vùng.'

**B:dl09-07** — Con số này chắc tới đâu — và bạn có nói ra không? · tổng 5.9 · L4→L5 · IMPROVE
- *P1 concept* — «một tỉ lệ 55% có thể dao động khoảng ±11 điểm, tức từ khoảng 44% đến 66%» → ±11 là sai số 95% cho mẫu ngẫu nhiên, không áp dụng khi mẫu lệch một cửa hàng như chính bài nói; không nêu công thức hay giả định; example lại ghi 45%–65% **Sửa:** Nêu công thức ≈ 1/√n (≈ ±11% với n=80), nêu rõ 'chỉ đúng nếu mẫu ngẫu nhiên', và thống nhất 44–66 hay 45–65
- **Đề xuất/viết lại:** Thêm một khung 3 dòng: n, ai được hỏi, khoảng. Viết lại example: 'Với 80 người ngẫu nhiên, 55% có thể là 44–66%; vì chỉ một cửa hàng nên độ lệch còn lớn hơn'.

**B:tu05-01** — Muốn doanh thu năm tăng 20%, nên kéo cần nào · tổng 5.9 · L3→L4 · IMPROVE
- *P1 Q2* — «với chi phí 150.000 đồng mỗi khách, mua khách mới cũng có thể có lãi» → Lời giải của chính câu thừa nhận phương án a có thể đúng (750.000 doanh thu/khách vs CAC 150.000), nên hai đáp án cùng bảo vệ được; đáp án c chỉ đúng nhờ chữ 'trước' **Sửa:** Đưa lãi gộp/khách vào đề (vd 30%) và hỏi so sánh lãi của hai cách; hoặc bỏ phương án a mơ hồ
- **Đề xuất/viết lại:** Thêm một cột lãi gộp và một câu hỏi so lãi của 'mua 420 khách' với '+10% hai cần'. Vd: 'Giả sử CAC 150.000 và lãi gộp 30%, cách nào lãi cao hơn?'

**B:in03-03** — Nike 'Just Do It': vì sao một câu ba chữ sống được hàng chục năm? · tổng 5.9 · L2→L4 · IMPROVE

- **Đề xuất/viết lại:** Thêm một khẩu hiệu nhiều tiện ích đã thất bại hoặc bị đổi (so sánh) và một bài tập chấm 3 slogan Việt theo 'khoảnh khắc / độ rộng / độ ngắn'. Viết lại Q3: 'Đổi slogan mỗi năm tốn 500 triệu để làm quen lại; giữ chỉ tốn 150 triệu duy trì. Sau 5 năm chênh bao nhiêu?'

**B:in04-08** — Tám phút trước ban giám khảo: nói gì ở phút đầu? · tổng 5.9 · L3→L4 · IMPROVE

- **Đề xuất/viết lại:** Thêm số kinh tế vào câu What: 'Giá bán 9.000đ, lãi gộp 3.500đ; hoà vốn 114.000 chai, cao hơn mục tiêu 60.000 nên cần bỏ chi tiêu tủ mát hoặc giảm ngân sách.' để bài tự nhất quán với in04-04.

**B:in04-10** — Đề xuất này yếu ở đâu, và sửa thế nào cho mạnh? · tổng 5.9 · L4→L6 · IMPROVE
- *P1 example vs Q4* — «380 triệu, gồm 300 triệu chi phí voucher dự kiến» → Voucher 150.000đ x 5.000 lượt đổi = 750 triệu (hoặc x 3.000 đôi = 450 triệu), không khớp 300 triệu; Q4 lại tính lợi nhuận gộp 405k/đôi mà không trừ voucher **Sửa:** Tính lại ngân sách voucher hoặc giới hạn số voucher; trừ voucher khỏi lợi nhuận gộp
- **Đề xuất/viết lại:** Sửa lại ngân sách và biên: 'Voucher 150k chỉ áp khi mua đôi mới, giới hạn 2.000 voucher = 300 triệu; lợi nhuận gộp/đôi sau voucher 255k.' Rồi hỏi Q4 với số liệu này. Thêm câu hỏi chấm 'How' và 'Phương án thay thế' trong ví dụ.

**B:kh04-05** — Sĩ diện, ngại từ chối, lo cho con — insight Việt nằm ở đâu? · tổng 6.0 · L3→L5 · IMPROVE
- *P1 Q1* — «Một cách từ chối giữ hoà khí; lý do thật chưa được nói ra» → Khẳng định 'phần lớn là từ chối mềm' không có số liệu; 'để bàn với nhà' thường cũng là cần đồng thuận thật. Dạy một diễn giải như sự thật **Sửa:** Đổi thành 'Điều nào cần kiểm chứng đầu tiên?' hoặc cho tỉ lệ từ phỏng vấn
- *P1 example* — «không nói rủi ro, nói "quỹ học cho con"» → Khuyên đổi khung để tránh nói rủi ro trong bảo hiểm nhân thọ dễ dẫn tới bán sai (mis-selling) như bán bảo hiểm như tiết kiệm; thiếu cảnh báo đạo đức **Sửa:** Thêm: khung 'quỹ học' vẫn phải nêu rõ quyền lợi bảo vệ và rủi ro, nói đúng sản phẩm
- **Đề xuất/viết lại:** Thêm phương pháp: 'Hỏi theo tình huống, không hỏi lý do: lần gần nhất bạn hẹn rồi không quay lại, chuyện gì xảy ra?' và thêm cảnh báo mis-selling.

**B:kh04-06** — Đọc 2.000 bình luận thế nào để ra insight? · tổng 6.0 · L4→L4 · IMPROVE
- *P1 Q6 why.d* — «chuyện kể chi tiết lặp lại khó giả đều như vậy» → Sai: bình luận ảo/hướng dẫn mẫu thường lặp lại; sàn còn thưởng xu cho bình luận dài, nên 'dài và lặp' chưa chắc thật **Sửa:** Nêu cách lọc: người mua đã xác minh, ảnh/video, dùng lâu; so với nguồn thứ hai
- **Đề xuất/viết lại:** Thêm bước lọc thật/ảo và bảng nhãn mẫu. Ví dụ viết lại Q6 d: 'Có bình luận ảo; vì vậy cần xác minh bằng phỏng vấn, không dùng riêng bình luận.'

**B:kh10-02** — Sinh viên ít tiền thì chỉ mua đồ rẻ nhất? · tổng 6.0 · L3→L4 · IMPROVE
- *P1 Q5b* — «Chất âm như hàng 2 triệu, trả góp 0%, 263.000đ/tháng» → Đáp án 'đúng' chứa tuyên bố so sánh không kiểm chứng, trái với tinh thần các bài kh10-03/06 về nói thật; trả góp 0% còn có phí cho người bán **Sửa:** Thay bằng thông số đo được: 'Driver 40mm, pin 30 giờ, đổi trả 7 ngày'
- **Đề xuất/viết lại:** Viết lại tình huống: 'Trong 50 sinh viên, 19 người dùng tai nghe ≥1 triệu, 22 người dùng 200–400k'. Đổi Q5b thành thông số thật và thêm câu đề xuất thử bản 790k trên một nhóm nhỏ trước.

**B:gt03-06** — Chỉ đọc bình luận khen thì có kiểm được giả thuyết không? · tổng 6.0 · L3→L4 · IMPROVE
- *P1 concept* — «Bình luận khen tự đến với bạn; người không quan tâm bao bì thì không bình luận» → Vấn đề nêu là thiên kiến chọn mẫu tự nguyện (voluntary response), không phải thiên kiến xác nhận; bài gộp hai khái niệm và quiz Q1 kiểm đúng thiên kiến chọn mẫu **Sửa:** Tách hai ý: (1) mẫu tự chọn; (2) tìm bằng chứng ủng hộ. Đặt tiêu đề theo ý chính
- **Đề xuất/viết lại:** Đổi tên 'Thiên kiến chọn mẫu và xác nhận'. Thêm bài tập: hai nhóm mẫu (bình luận vs người mua) cho kết luận ngược nhau, yêu cầu giải thích.

**B:kn08-09** — File khách hàng gửi qua Zalo cho cả nhóm: có vấn đề gì? · tổng 6.0 · L3→L4 · IMPROVE
- *P1 Q4* — «Số căn cước là dữ liệu nhạy cảm» → Theo phân loại pháp luật VN số căn cước thuộc dữ liệu cơ bản; gọi là nhạy cảm sai thuật ngữ trong bài về tuân thủ **Sửa:** Nói: 'dữ liệu định danh, rủi ro cao nếu lộ' và không dùng 'nhạy cảm' theo nghĩa pháp lý
- **Đề xuất/viết lại:** Thêm bước xử lý sự cố: 'Phát hiện lộ: khoá file, thống kê ai đã tải, báo cáo nội bộ trong 24 giờ, kiểm nghĩa vụ thông báo.'

**B:kn09-05** — Đây là khủng hoảng loại gì? · tổng 6.0 · L3→L4 · IMPROVE
- *P1 Q6* — «Khủng hoảng sản phẩm, vì chất lượng thật khác với cam kết» → Nhãn sai độ đạm vừa là lời hứa với khách (dịch vụ/phát ngôn) vừa là chất lượng; hai đáp án b và d đều có thể bảo vệ được **Sửa:** Đổi tình huống rõ ràng hơn (ví dụ phát hiện chất cấm trong sản phẩm) hoặc nêu tiêu chí phân biệt
- **Đề xuất/viết lại:** Thêm trục mức độ (an toàn con người / uy tín / tiện lợi) và ma trận phản ứng. Viết lại Q6: 'Phát hiện lô hàng chứa chất cấm vượt ngưỡng; loại nào, hành động đầu tiên là gì?'.

**B:kn11-05** — Trang đẹp trên máy tính nhưng khách điện thoại bỏ đi - kiểm gì trong một buổi? · tổng 6.0 · L2→L3 · IMPROVE
- *P1 concept* — «Người mới kiểm sáu thứ.» → Bài gắn nhãn 'kỹ thuật cơ bản' nhưng bỏ hẳn kiểm tra lập chỉ mục (site:, URL Inspection), robots/noindex, HTTPS, Core Web Vitals; quán có thể sửa đủ sáu thứ mà trang vẫn không được index. **Sửa:** Thêm mục 0: trang thực đơn có được lập chỉ mục không (URL Inspection).
- **Đề xuất/viết lại:** Thêm: 'Gõ site:domain-quán.vn/thuc-don lên Google; nếu không ra thì ưu tiên lỗi lập chỉ mục trước khi chỉnh tiêu đề.' và thêm một câu quiz chẩn đoán từ triệu chứng.

**B:kn15-03** — Thời lượng xem trung bình 3 phút: tốt hay xấu, còn tuỳ video dài bao nhiêu? · tổng 6.0 · L3→L4 · IMPROVE
- *P1 concept/example* — «Video A giữ một phần lớn hơn gần gấp đôi dù thời lượng tuyệt đối thấp hơn.» → Phần trăm giữ chân cũng giảm tự nhiên khi video dài ra; 58% của video 4 phút và 30% của video 15 phút không so thẳng được. 30% cho video 15 phút có thể là khá tốt. Bài chỉ thay một so sánh sai bằng một so sánh thiên lệch khác **Sửa:** So với benchmark cùng độ dài của chính kênh (YouTube có hiển thị khoảng điển hình cho video tương tự) trước khi nói video nào cần sửa
- **Đề xuất/viết lại:** Thêm câu quiz: 'Video 15 phút có 30% còn video 4 phút có 58%; các video 15 phút khác của kênh trung bình 28%. Nên kết luận gì?' Rồi cho học viên so với nhóm video cùng độ dài thay vì chỉ so hai video.

**B:kn16-01** — Bảng đề xuất của TikTok đọc những gì và bạn kiểm soát được phần nào? · tổng 6.0 · L2→L3 · IMPROVE

- **Đề xuất/viết lại:** Thay Q1 bằng tình huống phân loại: cho 6 thay đổi (đổi chú thích, đổi điện thoại, đổi quốc gia...) và yêu cầu xếp theo mức kiểm soát được. Thêm một bước thiết kế lý do xem hết, ví dụ 'Kết quả ở giây 3: nền sau 3 bước'.

**B:tn05-06** — Có nên chạy teaser gây tò mò trước ngày ra mắt? · tổng 6.0 · L3→L4 · IMPROVE
- *P1 example* — «Với hàng giới hạn và fan sẵn có, teaser làm được việc.» → Kết luận không có giá bán/biên lãi nên không biết 150 triệu cho 600 đôi (250.000đ/đôi) có lời không; lần trước hàng đã hết trong hai ngày nên 600 đôi có thể vẫn mua dù không teaser, không có phần tăng thêm **Sửa:** Thêm giá bán, biên lãi và so với cách chỉ nhắn 40.000 người theo dõi qua kênh miễn phí.
- **Đề xuất/viết lại:** Viết lại kết luận example: 'Giá 1,5 triệu, lãi gộp 40% = 600.000đ/đôi; 600 đôi cho 360 triệu lãi gộp, so 150 triệu teaser. Nhưng nếu 400 đôi vẫn bán nhờ lần trước hết hàng, phần tăng thêm chỉ 200 đôi'.

**B:tn06-06** — Khi nào phải dừng thử một kênh? · tổng 6.0 · L3→L4 · IMPROVE
- *P1 example* — «dừng ở đó, tiết kiệm được 9 triệu (24 − 15) đã chi thêm sau mốc» → 9 triệu là tiền chi thêm, không phải tiền tiết kiệm: 9 triệu đó vẫn mang khoảng 50 đơn x 120.000 = 6 triệu lãi gộp; khoản lỗ tránh được chỉ khoảng 3 triệu. Gọi 'tiết kiệm 9 triệu' thổi phồng lợi ích của mốc dừng **Sửa:** Viết: 'tránh chi thêm 9 triệu, tương ứng tránh lỗ ròng khoảng 3 triệu (mỗi đơn lỗ 60.000đ x 50 đơn)'.
- *P1 Q4* — «Xin gia hạn một lần có giới hạn, ghi rõ lý do và mốc mới» → Đáp án đúng trái với TAKEAWAY 'đừng thương lượng với nó' và MISTAKES 'đổi mốc dừng giữa chừng'; bài không dạy quy tắc gia hạn, và 125.000đ vẫn lớn hơn lãi gộp 120.000đ (đơn vẫn lỗ) **Sửa:** Hoặc thêm quy tắc gia hạn vào concept, hoặc đổi đáp án thành dừng và thử lại với biến thay đổi.
- **Đề xuất/viết lại:** Viết lại câu example: 'Dừng ở 15 triệu là tránh chi thêm 9 triệu, tương đương khoảng 3 triệu lỗ ròng: 50 đơn x 60.000đ'.

**B:dl08-04** — Team marketing mang về 800 lead, sao sales vẫn kêu thiếu khách? · tổng 6.0 · L3→L4 · IMPROVE
- *P1 example/Q4* — «đủ điều kiện lên 90» → Cơ chế không thuyết phục: thêm hai câu hỏi vào form chỉ lọc lead, không tạo thêm lead đủ điều kiện (64→90); không giải thích cách tăng **Sửa:** Giải thích: 'lọc đồng thời đổi quảng cáo nhắm đúng độ tuổi' hoặc giữ qualified=64 và chỉ giảm chi phí mỗi qualified
- **Đề xuất/viết lại:** Viết lại ví dụ: 'form mới lọc 800 → 300 lead; 64 qualified trước, 62 sau; chi phí mỗi qualified giảm vì sales bớt gọi 500 lead'. Q4: hỏi 'Điều gì phải đúng để 64→90?'.

**B:in01-05** — Khuyến mãi bán bùng tháng này — tháng sau thì sao? · tổng 6.0 · L3→L5 · IMPROVE
- *P1 example* — «Tăng thêm ròng = 30.000 − 24.000 = 6.000 chai.» → Mua 1 tặng 1: nếu 70.000 chai gồm cả hàng tặng thì chỉ ~35.000 chai trả tiền, thấp hơn nền 40.000; số 6.000 chai ròng trộn chai tặng và chai bán, mâu thuẫn mistake thứ hai của chính bài **Sửa:** ghi rõ 70.000 là chai bán ra hay tính cả chai tặng, rồi tính ròng theo chai trả tiền hoặc theo lãi
- **Đề xuất/viết lại:** Viết lại: 'Tháng 3 bán 70.000 chai, trong đó 35.000 tặng. Số chai trả tiền 35.000 < nền 40.000: tháng 3 đã thua trước khi tính hụt tháng 4–5.'

**B:ob05-07** — Giờ nào khách thật sự mua, và bạn đang quảng cáo giờ nào? · tổng 6.1 · L3→L4 · IMPROVE
- *P1 concept/example* — «dồn phần lớn ngân sách vào 9h30–11h30 để bắt người đang đói» → Đơn dồn trưa chưa chứng minh quảng cáo trưa tạo đơn (có thể là đơn tự nhiên); thiếu CPA/ROAS theo khung giờ và bão hoà **Sửa:** So CPA theo khung giờ, thử tăng 30% ngân sách trưa trong 2 tuần
- **Đề xuất/viết lại:** Thêm số CPA từng khung giờ. Ví dụ: 'CPA trưa 28.000đ, CPA tối 60.000đ, nhưng đơn trưa 80% tự nhiên; quyết định thay đổi thế nào?'

**B:ob05-08** — Khách chọn COD rồi bom hàng: đó là tín hiệu gì? · tổng 6.1 · L4→L4 · IMPROVE
- *P1 example vs Q6* — «giảm 15.000đ cho đơn trả trước» → Ví dụ khuyến nghị ưu đãi 15.000đ nhưng why.c Q6 tính chính ưu đãi đó tốn 6,75 triệu mà chỉ tiết kiệm ~2,2 triệu: tự mâu thuẫn **Sửa:** Khuyến nghị ưu đãi chỉ cho đơn giá trị lớn hoặc tính ngưỡng hoà vốn
- *P1 example* — «mất 400 đơn mà chỉ tránh được khoảng 100 đơn hoàn (4 triệu)» → So số đơn với tiền; bỏ qua 400 khách còn lại chuyển sang trả trước có tỉ lệ hoàn thấp hơn; không có lãi biên **Sửa:** Tính đủ 2 vế bằng lãi biên mỗi đơn
- **Đề xuất/viết lại:** Bổ sung biên lãi mỗi đơn (vd 60.000đ) và hoà vốn ưu đãi. Viết lại ví dụ: 'Ưu đãi 15.000đ chỉ có lợi khi mỗi đơn hoàn tránh được trị giá ≥ 15.000/(chênh tỉ lệ hoàn).'

**B:kh05-08** — Khảo sát online: cần bao nhiêu phiếu và hỏi thang điểm thế nào? · tổng 6.1 · L3→L4 · IMPROVE
- *P1 concept* — «Vì vậy 400 phiếu thường là đủ cho một quyết định marketing.» → Sai số 1/căn n chỉ đúng với mẫu ngẫu nhiên; 8% phản hồi tự chọn bị lệch (người giận hoặc người rảnh), bài không nhắc nên ±5 điểm tạo cảm giác chắc chắn giả **Sửa:** Thêm: 'sai số này chưa tính sai lệch do ai chịu trả lời; so cơ cấu người trả lời với cơ cấu khách thật'
- **Đề xuất/viết lại:** Thêm Q về sai lệch phản hồi. Ví dụ: 'Chỉ 8% trả lời và phần lớn là khách đã giận; con số 41% có thể nghiêng ra sao? Làm gì để kiểm?'

**B:kh09-05** — Báo giá B2B: giảm giá hay đổi cách chào giá? · tổng 6.1 · L3→L4 · IMPROVE
- *P1 example/Q3* — «lãi còn 19,5 triệu thay vì 117 triệu» → Cơ sở so sánh sai: 117 triệu chỉ có khi thắng thầu ở 30.000, nhưng đối thủ chào 28.000. Giá 27.500 thắng thì lãi 19,5 triệu/tháng, thua thì 0. Bài không xét xác suất thắng. **Sửa:** So sánh kỳ vọng: P(thắng)xlãi. Hoặc xét các mức 28.000/29.000 thay vì 27.500
- **Đề xuất/viết lại:** Viết lại: 'Giữ 30.000 chỉ thắng nếu giá trị thêm bù được 2.000 đồng/suất mà khu công nghiệp chấp nhận. Nếu xác suất thắng chỉ 30%, kỳ vọng lãi 35 triệu/tháng; hạ 27.500 và thắng chắc là 19,5 triệu. Cần biết hồ sơ chấm theo giá hay theo điểm tổng.'

**B:gt02-02** — Khách mới hay khách cũ đang biến mất? · tổng 6.1 · L3→L4 · IMPROVE
- *P1 Q1* — «Khách cũ thường chiếm phần lớn doanh thu nên cũng dễ gây giảm lớn» → Câu hỏi bảo 'đoán' nhưng phương án a (quảng cáo ngày càng đắt) cũng hợp lý; đáp án d là suy diễn từ quy mô, không có căn cứ trong đề **Sửa:** Cho số tỉ trọng doanh thu mới/cũ rồi hỏi nhánh nào ảnh hưởng nhiều nhất
- **Đề xuất/viết lại:** Thêm định nghĩa khách cũ theo chu kỳ mua (ví dụ mua lại trong 90 ngày) vào concept và một câu quiz chọn cửa sổ thời gian cho sản phẩm tiêu thụ nhanh/chậm.

**B:kn16-04** — Đăng cùng một âm thanh, cùng một kiểu mỗi ngày: vì sao không giúp bảng đề xuất · tổng 6.1 · L3→L4 · IMPROVE
- *P1 Q5 why.a* — «Nội dung trùng lặp được mô tả là bị loại khỏi đề xuất.» → Mô tả của TikTok nói tránh cho người xem thấy lại nội dung đã xem/trùng; không nói đăng lại video cũ của chính mình bị loại. Giải thích đáp án vượt quá nguồn, trong khi Q4 dạy chỉ dựa vào điều nguồn nói **Sửa:** Viết lại why.a: đăng y nguyên không cho thông tin mới và người đã xem sẽ không thấy lại; đây là suy luận, không phải quy tắc được xác nhận
- **Đề xuất/viết lại:** Thêm giả thuyết cạnh tranh trong situation (âm thanh trend nguội) và thay Q3 bằng câu so tỉ lệ xem hết giữa năm video khác lời hứa. Sửa why.a của Q5 như trên.

**B:tn01-08** — Hỏi khách cho nhanh hay đo hành vi cho chắc? · tổng 6.1 · L3→L4 · IMPROVE
- *P1 example/Q3* — «68% nói 'sẽ chuyển sang refill'. Kệ thử: túi refill chiếm 18% số đơn vị» → So sánh hai đại lượng khác bản chất: 68% người nói sẽ chuyển với 18% thị phần đơn vị bán trên kệ; trừ ra '50 điểm %' không phải khoảng cách nói-làm **Sửa:** Đo cùng đơn vị: tỉ lệ người mua refill ít nhất một lần trên kệ so với 68% (hoặc dùng tỉ lệ hiệu chỉnh)
- **Đề xuất/viết lại:** Viết lại ví dụ: 'Khảo sát: 68% nói sẽ thử refill. Trên kệ: 18% người mua nước giặt đã mua refill ít nhất một lần trong 4 tuần.' Rồi hỏi tỉ lệ quy đổi 26%.

**B:dl05-05** — Share of search 18% nói gì về thị phần năm sau? · tổng 6.1 · L3→L4 · IMPROVE
- *P1 concept/situation* — «share of search thường đi trước thị phần doanh số» → Bằng chứng thường dẫn là ngành lựa chọn cao cân nhắc (xe, tài chính); bột giặt là hàng mua nhanh ít ai tìm tên hãng, nhưng bài không nêu điều kiện này và khẳng định như quy luật. **Sửa:** Ghi rõ share of search hợp ngành cân nhắc cao; với FMCG chỉ là tín hiệu phụ, cần đối chiếu.
- **Đề xuất/viết lại:** Thêm điều kiện ngành. Ví dụ: 'Share of search tin cậy hơn với xe máy, bảo hiểm; với bột giặt hãy đối chiếu thêm với khảo sát cân nhắc.'

**B:tp11-05** — Gói tháng 149.000đ hay gói năm 1.190.000đ: nên đẩy gói nào? · tổng 6.3 · L3→L5 · IMPROVE
- *P1 Q3* — «Một người chuyển sang gói năm mang về thêm bao nhiêu nghìn đồng so với trung bình gói tháng?» → Bài tự cảnh báo 'giả định người chuyển giống người gói tháng trung bình' (chọn lọc), nhưng Q3 và Q1 vẫn dùng đúng giả định đó để cho đáp án +594 nghìn. Còn bỏ qua 10% khách gói năm 1.490.000đ bị mất 300.000đ. **Sửa:** Thêm bước: 'Nếu 10% đang mua 1.490.000đ chuyển sang giá mới, lãi/lỗ ròng là bao nhiêu?'.
- **Đề xuất/viết lại:** Thêm một phép so hai kịch bản: người dùng gói năm ở lại 12 tháng vs gói tháng ở lại 8 tháng. Viết lại Q3: 'Nếu người chọn gói năm vốn định dùng 9 tháng, gói năm 1.190.000đ thu hơn gói tháng bao nhiêu? (9 x 149.000 = 1.341.000, tức giảm 151.000).'

**B:tn02-09** — Test 6 mẫu banner cùng lúc - nhanh hơn hay chậm hơn? · tổng 6.3 · L4→L4 · IMPROVE
- *P1 Q2* — «a) Lọc còn 2 bản khác biệt rõ nhất, test cùng bản cũ trong 5 ngày» → Đáp án đúng khuyên test 5 ngày, mâu thuẫn quy tắc trọn chu kỳ tuần mà tn02-06 dạy (7/14/21 ngày); 10 ngày cũng không trọn tuần **Sửa:** Sửa: 'trong 7 ngày (một tuần trọn)' và tính lại lượt cần hoặc tăng lượt xem
- **Đề xuất/viết lại:** Sửa thời lượng cho trọn tuần; thêm câu: 'Hiệu chỉnh ngưỡng khi so 5 bản: dùng 1% thay vì 5% mỗi lần.'

**B:dl02-05** — Bán gói cà phê tháng hay bán lẻ từng túi: bao lâu thì hoàn vốn CAC? · tổng 6.3 · L4→L4 · IMPROVE
- *P1 concept/example/Q2/Q4* — «Bán lẻ: trung bình 50.000đ mỗi tháng → 8 tháng, vượt ngưỡng.» → Mô hình liên tục bỏ qua việc đơn đầu trả tiền ngay lúc thu hút: mua tháng 0,2,4,6 -> đủ 400.000đ ở tháng 6, nằm trong ngưỡng vốn; gói tháng đạt ở tháng 3. Kết luận 'bán lẻ vượt ngưỡng' phụ thuộc giả định ngầm **Sửa:** Tính payback theo lịch dòng tiền rời rạc, hoặc nêu rõ giả định lãi về đều
- **Đề xuất/viết lại:** Viết lại example theo lịch: 'Tháng 0 +100k, tháng 1 +100k... gói đạt 400k ở tháng 3; bán lẻ (mua tháng 0,2,4,6) đạt ở tháng 6 — sát ngưỡng, không còn khoảng đệm.'

**B:tu05-06** — Giá trị đơn tăng 25% mà doanh thu gần như đứng yên · tổng 6.3 · L3→L4 · IMPROVE → B:tu05-01
- *P1 Q6* — «gói lớn chỉ dời lịch mua, khách vẫn dùng hết» → Hỏi 'ít làm giảm tần suất' nhưng đáp án thừa nhận tần suất mua vẫn giảm; bài lẫn tần suất mua với lượng tiêu thụ. Gói lớn luôn giảm số đơn; điều cần giữ là doanh thu/lãi mỗi khách theo thời gian **Sửa:** Đổi sang đo 'lượng tiêu thụ' và 'lãi mỗi khách mỗi quý', hoặc diễn đạt Q6 theo doanh thu mỗi khách
- **Đề xuất/viết lại:** Gộp bài vào tu05-01/10 hoặc đổi trọng tâm: 'AOV tăng nhờ gói lớn, theo dõi doanh thu mỗi khách mỗi quý và tỉ lệ còn mua'. Đổi Q6 thành so lượng tiêu thụ.

**B:in04-05** — Điều gì có thể hỏng, và bạn đã chuẩn bị gì? · tổng 6.3 · L3→L5 · IMPROVE
- *P1 example* — «Ngưỡng dừng: tỉ lệ hoàn trên 8% trong tuần đầu thì dừng quảng cáo» → Thử 50 đơn: 5% là 2,5 đơn, 8% là 4 đơn, chênh quá nhỏ để phân biệt, ngưỡng không đo được; hoàn hàng còn trễ sau tuần đầu **Sửa:** Tăng cỡ mẫu (200-300 đơn) hoặc đo theo số đơn đã giao đủ ngày
- **Đề xuất/viết lại:** Sửa ví dụ: 'Ngưỡng dừng: sau 150 đơn đầu, nếu hoàn trên 8% (12 đơn) thì dừng quảng cáo.' Thêm rủi ro tồn kho: 'Nếu đến Rằm còn 800 hộp, giảm 30% ở tuần cuối.'

**B:kn11-03** — Nhắm từ khoá 12.000 lượt tìm hay 900 lượt tìm - chọn cái nào? · tổng 6.4 · L3→L4 · IMPROVE
- *P1 concept/example* — «12.000 × 1% = 120 nhấp ... 900 × 10% = 90 nhấp ... 300 × 15% = 45 nhấp» → Chỉ số nhấp kỳ vọng xếp 'máy lọc nước' (120) cao nhất, trái với kết luận chọn từ nhỏ khớp ý định; công thức không tự bảo vệ được kết luận vì thiếu tỉ lệ ra đơn theo ý định. **Sửa:** Thêm cột tỉ lệ ra đơn giả định theo nhóm ý định: đơn = nhấp x CVR.
- **Đề xuất/viết lại:** Viết lại ví dụ: 'máy lọc nước: 120 nhấp x 0,5% = 0,6 đơn; lắp máy lọc nước Đà Nẵng: 45 nhấp x 8% = 3,6 đơn' để thấy vì sao từ nhỏ thắng.

**B:dl04-07** — Tỉ lệ mua lại 90 ngày: tính cho khách nào mới đúng? · tổng 6.4 · L3→L4 · IMPROVE
- *P1 situation/example* — «báo cáo cuối tháng 6 thật ra chưa có cohort nào chín» → Tình huống đã cho 132/600 người mua lại trong 90 ngày của cohort tháng 4 ở thời điểm báo cáo cuối tháng 6, nhưng ví dụ lại nói cohort đó chỉ chín ở cuối tháng 7, rồi 'dùng cohort tháng 3 (đã chín)': tự mâu thuẫn; Q4 hỏi tỉ lệ 'đúng' của cohort tháng 4 **Sửa:** Dời báo cáo sang cuối tháng 7, hoặc đổi dữ liệu thành cohort tháng 3 (600 khách, 132 mua lại).
- **Đề xuất/viết lại:** Sửa mốc thời gian; thêm 'đọc cohort tháng 6 tại ngày 30 bằng mua lại 30 ngày để cảnh báo sớm'.

**B:kn07-02** — Chi nhiều hơn thị phần bao nhiêu thì đủ để lớn? · tổng 6.5 · L3→L4 · IMPROVE
- *P1 Q7* — «Share of search hoặc share of mention là số đại diện phổ biến» → Share of search được kiểm chứng như proxy của thị phần/nhu cầu, không phải của share of voice (chi tiêu); gán nhãn proxy cho SOV là lẫn khái niệm **Sửa:** Nói rõ: không có số chi tiêu thì ước SOV bằng ước tính chi (rate card) hoặc dùng share of search như chỉ báo sức khoẻ thương hiệu, không thay SOV
- **Đề xuất/viết lại:** Thêm 1 câu về quy luật nhỏ cần ESOV cao hơn: 'Hãng 8% thường cần SOV vượt phần mình nhiều hơn hãng 30% để cùng tăng một điểm.' Sửa Q7 theo hướng ước chi từ rate card.

**B:tn02-03** — 40 đơn so với 30 đơn - B thắng hay chỉ gặp may? · tổng 6.5 · L4→L4 · IMPROVE
- *P1 concept/Q4* — «gấp 4 lần số đơn mới hẹp được một nửa dao động» → Dao động tuyệt đối 2√k tăng gấp đôi khi số đơn gấp 4; chỉ dao động tương đối (so với số đơn/tỉ lệ) mới giảm một nửa. Phát biểu 'khoảng dao động hẹp đi một nửa' dễ gây hiểu sai **Sửa:** Đổi thành 'dao động tương đối (±% so với số đơn) giảm một nửa'
- **Đề xuất/viết lại:** Viết lại Q4: 'Muốn sai số tương đối (±% của số đơn) giảm một nửa cần số đơn gấp mấy lần?' Thêm 1 câu giải thích ±2 ≈ 95%.

**B:dl03-06** — Ba nền tảng cùng nhận công — doanh thu thật ở đâu? · tổng 6.5 · L3→L4 · IMPROVE
- *P1 Q6* — «Bạn đổi cửa sổ gán của Facebook từ 7 ngày sang 28 ngày, ROAS tăng từ 2,8 lên 3,6» → Meta đã bỏ cửa sổ 28 ngày (từ 2021 tối đa 7 ngày bấm; 2026 bỏ thêm 7/28 ngày xem). Kịch bản không còn thực hiện được trên Facebook **Sửa:** Dùng cửa sổ có thật: 'từ 1 ngày sang 7 ngày bấm' hoặc nói chung 'một nền tảng đổi cửa sổ gán'.
- **Đề xuất/viết lại:** Viết lại Q6: 'Nền tảng X đổi cửa sổ gán từ 1 ngày lên 7 ngày bấm, ROAS 2,8 lên 3,6. Doanh thu thực nhận tháng đó không đổi. Vì sao?'

**B:dl04-06** — Kênh nào mang về khách ở lại, không chỉ khách rẻ? · tổng 6.5 · L4→L4 · IMPROVE
- *P1 concept* — «chấm bằng chi phí trên khách còn ở lại» → Bỏ qua doanh thu/biên của đơn đầu và độ sâu giảm giá: kênh A (giảm 50%) khác đáng kể về biên; chỉ đếm 'khách còn giữ' chưa phải giá trị **Sửa:** Dùng LTV 6 tháng hoặc (chi - lãi đơn đầu) / khách còn giữ.
- **Đề xuất/viết lại:** Thêm calc: 'đơn đầu A lãi 0 do giảm 50%, B lãi 30.000đ; chi phí ròng trên khách giữ lại bao nhiêu?'

**B:tu04-03** — Thưởng giới thiệu bao nhiêu thì vẫn còn lãi? · tổng 6.5 · L4→L5 · IMPROVE
- *P1 Q6* — «phải tính trên lãi gộp sau chi phí vận hành» → Lãi gộp là doanh thu trừ giá vốn, trước chi phí vận hành; 'lãi gộp sau chi phí vận hành' là nhầm thuật ngữ (đúng là lãi hoạt động hoặc biên đóng góp). Đáp án a lại thiếu yếu tố thời gian giữ chân (gym giữ nhiều năm) **Sửa:** Sửa thành 'lãi gộp hoặc biên đóng góp' và thêm 'nhân với số năm hội viên giữ chân'
- **Đề xuất/viết lại:** Sửa Q6: 'thưởng 3 triệu bằng 50% doanh thu năm đầu; hội viên trung bình giữ 1,5 năm với biên 60%: trần thưởng bao nhiêu?'.

**B:ob07-06** — Doanh số tháng Tết tăng 60% - chiến dịch có thật sự hiệu quả? · tổng 6.6 · L4→L5 · IMPROVE
- *P1 Q1* — «Vì doanh số tháng 12 thường bị kéo thấp do khách chờ mua dồn vào Tết» → Phương án d cũng là một cơ chế mùa vụ có thật và trả lời đúng 'vì sao chưa thể ghi toàn bộ 60%'; lời giải chỉ gạt vì 'không có dữ kiện', hai đáp án gần như cùng đúng **Sửa:** Đổi d thành lý do không phải mùa vụ (vd 'vì doanh thu tháng 1 gồm đơn nhập sỉ dồn') hoặc hỏi 'nguyên nhân chính'
- **Đề xuất/viết lại:** Thêm chỉ số mùa vụ: 'Tháng 1 thường cao hơn trung bình 40%; kỳ vọng 1,2 x 1,40 = 1,68 tỷ - vậy 1,38 là dưới kỳ vọng'. Cho thấy bài có thể đổi kết luận.

**B:kh02-06** — Tệp này đáng bao nhiêu tiền mỗi tháng? · tổng 6.6 · L4→L5 · IMPROVE
- *P1 example/Q2.why.d/Q7.why.d* — «Kết luận chỉ đổi chiều khi tỉ lệ dưới khoảng 4,5%.» → 4,5% là ngưỡng lấp công suất 18.000 ly; kết luận 'dư sức trả 80 triệu mặt bằng' chỉ đổi chiều khi lãi gộp dưới 80 triệu, tức khoảng 5.333 ly hay khoảng 1,3% tệp, và cao hơn nếu tính lương, điện nước **Sửa:** Tách hai ngưỡng: 4,5% để đủ công suất, khoảng 1,3% để đủ trả mặt bằng
- **Đề xuất/viết lại:** Sửa Example: 'Mặt bằng 80 triệu cần ít nhất khoảng 5.300 ly/tháng nên cần khoảng 670 khách, tức khoảng 1,3% tệp; 4,5% mới lấp đầy công suất'.

**B:tp10-09** — Khách bỏ giỏ hàng thì nên nhắn gì? · tổng 6.6 · L4→L4 · IMPROVE
- *P1 Q7* — «110 người quay lại trước khi cần mã — đúng như thứ tự nhẹ tới mạnh.» → Suy luận không chặt: 40/150 dùng mã không có nghĩa 110 người còn lại quay lại trước khi nhận mã (có thể nhận mã rồi mua giá đầy đủ). Mâu thuẫn với lời cảnh báo chưa có đối chứng của chính bài. **Sửa:** Hỏi: 'Số liệu nào cần thêm để biết chuỗi tin tạo thêm bao nhiêu đơn?' (đáp: nhóm đối chứng không nhận tin).
- **Đề xuất/viết lại:** Sửa Q7 thành câu hỏi về thiết kế đối chứng. Ví dụ viết lại: 'Giữ 10% giỏ không nhận tin; nếu nhóm này vẫn tự quay lại 8% thì phần chuỗi nhắc thêm vào chỉ là 4,5 điểm %.'

**B:kn08-10** — CRM mang về bao nhiêu tiền thật, hay chỉ ghi công cho đơn tự đến? · tổng 6.6 · L5→L5 · IMPROVE
- *P1 Q3* — «Lãi tăng thêm trên doanh thu (sau khi trừ chi phí đó)» → Doanh thu tăng thêm trừ chi phí gửi không phải lãi; thiếu giá vốn/biên gộp của đơn tăng thêm nên 42 triệu bị thổi phồng **Sửa:** Nhân doanh thu tăng thêm với biên gộp (vd 50% -> 27 triệu) rồi trừ 12 triệu = 15 triệu; hoặc đổi tên thành 'doanh thu tăng thêm ròng chi phí gửi'
- **Đề xuất/viết lại:** Sửa Q3 và example: 'Doanh thu tăng thêm 54 triệu × biên gộp 50% = 27 triệu; trừ 12 triệu chi phí = 15 triệu lãi tăng thêm.'

**B:tn05-09** — Khi nào nên rút một sản phẩm vừa ra mắt? · tổng 6.6 · L4→L5 · IMPROVE
- *P1 example* — «Hãng rút sản phẩm, dùng chỗ trên kệ cho vị bánh quy bơ đang thiếu hàng.» → Bỏ qua phương án đã nằm trong số: cắt 40 triệu quảng cáo duy trì thì sản phẩm lãi +20 triệu/tháng (100 - 80). Đội chỉ thử đổi bao bì và giảm giá, chưa thử cắt quảng cáo; 'đã thử hai cách sửa' chưa đủ để kết luận rút **Sửa:** Thêm bước 'thử cắt chi phí duy trì và đo doanh số' trước khi rút, hoặc ghi rõ đã thử và doanh số rơi bao nhiêu.
- **Đề xuất/viết lại:** Thêm bước 3 lựa chọn trước khi rút: sửa, thu nhỏ (cắt quảng cáo/số điểm bán), hay rút; so lãi từng lựa chọn bằng số.

**B:dl04-04** — Đường cong giữ chân cắm xuống hay nằm ngang thì tốt? · tổng 6.6 · L4→L4 · IMPROVE
- *P1 Q7* — «b) Bình thường, vì khoá học nào cũng rơi mạnh sau khi học xong» → Đề không nói khoá học là gói nhiều tháng; với khoá học mua một lần, rơi về gần 0 sau khi học xong là bình thường, nên b có thể bảo vệ được và c không 'chắc' là đúng **Sửa:** Nêu rõ 'gói học theo tháng, mục tiêu là dùng đều' hoặc đổi sản phẩm thành app đăng ký.
- **Đề xuất/viết lại:** Sửa Q7 như trên; thay Q4 bằng 'mức phẳng 25% -> 30% cho thêm bao nhiêu khách ở 5.000 khách mới/năm'.

**B:dl10-03** — ROI 100% chỉ tính tiền media — còn quay dựng và lương thì sao? · tổng 6.6 · L4→L4 · IMPROVE
- *P1 Q3/step* — «Chỉ tính media ra 100%; quên phần lương ra 50%.» → Bỏ phần lương thì tổng chi 90 triệu, ROI = 30/90 = 33,3%, không phải 50%; số 50 trong 'wrong' không ứng với lỗi nào **Sửa:** Sửa: 'quên phần lương ra 33,3%; quên cả quay dựng, thiết kế ra 100%'; đổi wrong [50] thành [33.3]
- **Đề xuất/viết lại:** Sửa step Q3. Đổi 'cố định/biến đổi' sang 'chi phí media / chi phí sản xuất & nhân sự' hoặc giải thích rõ.

**B:kn03-09** — Giá trên sàn rẻ hơn đại lý: bạn đang tự đánh nhau với ai? · tổng 6.8 · L4→L5 · IMPROVE
- *P1 concept* — «đặt giá sàn thấp nhất» → Quy định giá sàn/giá khuyến nghị với đại lý có thể vướng luật cạnh tranh Việt Nam; bài không cảnh báo (chỉ có trong Q5 why.d) **Sửa:** Thêm câu: "giá khuyến nghị, không ép; hỏi pháp chế"
- **Đề xuất/viết lại:** Đưa cảnh báo pháp lý vào concept. Ví dụ: "Giá khuyến nghị là khuyến nghị; tránh thoả thuận ép giá và hỏi pháp chế".

**B:in04-04** — Xin 200 triệu thì phải hứa lại con số nào? · tổng 6.8 · L4→L5 · IMPROVE
- *P1 quiz Q6* — «giá mỗi học viên khoảng 830.000đ, trong 30 ngày» → Đáp án đúng so chi phí mỗi học viên (830k) với giá bán 1,5 triệu, chính là lỗi so với doanh thu mà bài cảnh báo; chỉ why.d nhắc muộn **Sửa:** Cho biên gộp và yêu cầu so chi phí với lợi nhuận gộp mỗi học viên
- **Đề xuất/viết lại:** Sửa Q6: 'Giá 1,5 triệu, biên gộp 70%, quảng cáo 50 triệu: cần tối thiểu bao nhiêu học viên để hoà vốn?' (48 học viên) để áp đúng nguyên tắc 'tính trên lợi nhuận gộp'.

