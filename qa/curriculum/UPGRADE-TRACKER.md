# Sổ theo dõi nâng cấp — từng bài, từng thay đổi (đợt 11/2026)

Quy ước: điểm *trước* lấy từ `qa/curriculum/baseline.json` (người chấm độc lập, 11/2026); điểm *sau* lấy từ `scores/pilot-after.json` (người chấm độc lập khác, chấm mù, không xem điểm trước). Mọi thay đổi giữ `id`, thứ tự, `skill`, `read`, đúng 7 câu; khoá đáp án chỉ đổi khi ghi rõ lý do. Chưa commit.

## A. Thí điểm chuẩn v2 — 12 bài, 10 module, 5 bước hành trình

| Bài | Bước | Trước | Thay đổi chính | Khoá đáp án đổi? |
|---|---|---:|---|---|
| B:ob01-02 | Quan sát | 58 | Thêm giá vốn, chi phí cố định; ví dụ tính lãi đóng góp trước/sau và kết luận thật (chưa hoà vốn, cần ~93 ly); thêm Vì sao/Phản ví dụ/Đào sâu; Q3 đổi từ chênh doanh thu sang chênh lãi đóng góp; Q4 mới (calc hoà vốn); Q6 L5 (A/B hai hướng có ràng buộc); Q7 L4 đọc bảng 7 ngày; goals, prereq, assume | Q3 ans 735→489 (đề đổi), Q4/Q6/Q7 câu mới |
| B:kh05-06 | Hiểu khách | 73 | "Kết luận đổi hướng" từ một trích dẫn → giả thuyết + đếm 4/6 người cùng kể; Q5 L2 → tình huống hai cuộc cách 30 phút; Q7 → giả thuyết kèm bước kiểm; Phản ví dụ (hành vi cũng bị đọc sai), Đào sâu (bảng ba cột) | Q5 câu mới |
| B:kh06-01 | Hiểu khách | 73 | Q7 đổi ngành sữa bột → xe đẩy em bé (tránh dạy nhắm quảng cáo sản phẩm có hạn chế pháp lý; thêm lời cảnh báo); Q3 nhãn 35 → THIEU_TU_SO (mã mới); ví dụ nói rõ tự khai hồi tưởng; Phản ví dụ (ngành không trigger), Đào sâu (tỉ lệ đơn × độ dễ tiếp cận); áp dụng thành bảng đếm 30 đơn | Không |
| B:kh07-02 | Hiểu khách | 73 | Sửa mâu thuẫn "gần gấp đôi" vs 30→45: ví dụ thành 30→55, Q3 ans 525.000 → 795.000; src Frederick–Lee–Baskin 2014 (st:chua); Q4 L2 → L4 (mồi nhử không chạy khi chiều kém không phải chiều khách quý); hedge khẳng định pháp lý Q7; Phản ví dụ, Đào sâu; fresh=periodic | Q3 ans đổi theo ví dụ; Q4 câu mới |
| B:gt04-08 | Giả thuyết | 78 | Áp đúng công thức của bài cho khách mới (250.000 ÷ 1,25 = 200.000/đơn); ví dụ dựng lại theo nhóm chừa 600/200, đơn thêm 54, 185.000đ/đơn (không còn "bằng nửa"); 10 triệu tách tin nhắn + giảm giá; Q6 L5 bậc 1/bậc 2 chi phí biên; mã lỗi TINH_CA_DON_TU_NHIEN | Q3 ans 125 → 185 (đề đổi); Q6 câu mới |
| B:tp01-06 | Thông điệp | 66 | Đưa số vào (350/150 tỉ, +25%/năm, chi phí ba mức); calc mới (thành phố phải tăng 46,7% để bù); Phản ví dụ (lõi mất giá trị → phải mở rộng/dời hẳn); Đào sâu (đo liên tưởng trước–sau); Q6 L4 đọc dữ liệu nhận biết/liên tưởng/cân nhắc; prereq tp01-01, tp04-01 | Q3/Q6 câu mới |
| B:tp08-04 | Thông điệp | 63 | Đưa quy tắc điều kiện cần (≤2 là loại) vào khái niệm và ví dụ cho khớp Q7; mốc thang 1–5; ba người chấm; Q4 L4 (kịch bản 4 cảnh đổi logo); Q6 L4 (xử lý bất đồng 2-4-5); Q3 giá trị sai 45 → 9 (NHAM_DON_VI) và 20; Phản ví dụ (5-5-5 không khả thi), Đào sâu (thử bản phác với 30 khách) | Q4/Q6 câu mới |
| B:tp11-07 | Thông điệp | 67 | 240 triệu "không mất đi" → 90 triệu sau khi trừ chuyển kênh (50%) và chi phí gói riêng (100.000đ/máy); ngưỡng chênh = giá trị gói ÷ giá niêm yết (12%); Q3 calc ngưỡng; Q7 L4 đọc bảng 6 tháng nhập hàng vs mức giảm sàn; src Luật Cạnh tranh 2018 (st:chua); Phản ví dụ xả tồn bằng mã hàng riêng; fresh=periodic | Q3 ans 240 → 12 (đề đổi); Q7 câu mới |
| B:kn06-05 | Kênh | 66 | Dựng nhóm đối chứng tường minh (200/2.000; 4 đơn vs 50 đơn/1.800) và phép suy luận; cảnh báo độ nhạy (4 vs 5 đơn đối chứng: 429.000 vs 1,2 triệu); Q4 calc độ nhạy; CPA tìm khách mới để so (220.000); src Meta attribution/Conversion Lift (st:chua) + câu "nếu màn hình khác"; Phản ví dụ (giỏ bỏ + ưu đãi tăng thêm cao); Đào sâu (cửa sổ, tần suất, loại người đã mua); fresh=fast; mã lỗi TINH_CA_DON_TU_NHIEN | Q3 ans 400 → 429 (đề đổi); Q4 câu mới thay Q5 cũ |
| B:kn13-05 | Kênh | 73 | Sửa phép chuẩn hoá reach (không cộng dồn; so cùng 5 ngày T2–T6); tách trả tiền/tự nhiên bằng số (26.000→27.000 tự nhiên; 15.000→3.000 trả tiền); ngưỡng nhiễu từ 8 tuần (±9%); Q3 calc đổi; Q4 đáp án đổi nội dung (cùng cửa sổ, tách trả tiền); Q7 L4 đọc reach theo nguồn; Phản ví dụ (bước cuối có thật); mã lỗi SO_KHAC_CUA_SO | Q3 ans 40 → 3,8 (đề đổi); Q7 câu mới |
| B:tn04-01 | Thử nghiệm | 66 | Thêm giá vốn 25.000; ví dụ tính lãi gộp hai nhóm (7,6 → 8,64 triệu, +13,7%); nêu dao động tuần ±4%; Q6 đáp án sửa hết tự mâu thuẫn (áp 15 cửa hàng, giữ 5 đối chứng); Q7 L2 → calc lãi gộp; Q3 nhãn 10 → QUEN_DOI_CHUNG (mã mới); Phản ví dụ (đối chứng bị nhiễm); Đào sâu (song song trước thử, diff-in-diff) | Q7 câu mới; Q6 sửa lời phương án |
| B:dl02-02 | Đo lường | 72 | Q6 sửa suy luận không được phép ("giữ chân tốt lên" từ tỉ trọng); Q7 nhiễu vô lý → nhiễu bênh được; Q4 L2 → calc đếm người không đếm đơn (250 người → 240.000đ); nhãn minh hoạ; áp dụng thành ba con số | Q4 câu mới; Q6 đáp án giữ d nhưng nội dung sửa |

## B. Sửa lỗi P0 và P1 điểm (ngoài thí điểm)

| Mục | Mức | Lỗi | Sửa | Khoá đổi? |
|---|---|---|---|---|
| B:kn01-01 Q1 | P0 | Phương án c (menu trong quầy) bênh được ngang đáp án a theo ba tiêu chí của bài | Đề thêm mục tiêu "nhắc khách quay lại mà không mất tiền mỗi lần"; lời giải c nói rõ menu ở lại tiệm, không đi theo khách | Không |
| B:qc06-06 Q1 (+ khái niệm; mistakes ở qc06-01, qc06-04, qc06-06) | P0 | Cơ chế "nhiều chiến dịch cùng ghi công cho một đơn" trong cùng tài khoản Google Ads nêu sai; đề so tự báo với doanh thu web | Đề so với **phần tăng thêm** của doanh thu web; đáp án: nền tảng ghi công cả đơn vốn sẽ có; phương án b nói đúng cơ chế chia công nhưng sai kết luận; ba câu "nhận ra khi cộng… vượt tổng" sửa thành dấu hiệu đúng | Không (vẫn c) |
| cases.js `khoa-hoc-online-cac` e4/q3 | P0 | Đề hỏi LTV/CAC "của phần tăng thêm" nhưng e4 cho CAC trung bình mới (+20%) → đáp án 1,6 không khớp định nghĩa biên | e4 ghi rõ "phần ngân sách tăng thêm đổ vào kênh B có CAC khoảng 900.000đ"; lời giải nói rõ là CAC phần thêm | Không (1,6 giữ, nay đúng định nghĩa) |
| cases.js `hanh-vi-rau-huu-co` q4.why | P1 | "lãi gộp mỗi gói âm" trong khi 200.000 − 168.000 = +32.000 | Sửa thành "chỉ còn 32.000đ, mỏng hơn gói thường" | Không |

## C. Thay đổi hạ tầng nội dung

| File | Thay đổi | Tương thích ngược |
|---|---|---|
| `assets/js/data/drills.js` | Thêm 5 mã lỗi: NHAM_DON_VI, THIEU_TU_SO, TINH_CA_DON_TU_NHIEN, SO_KHAC_CUA_SO, QUEN_DOI_CHUNG | Chỉ thêm; mã cũ giữ nguyên |
| `bai.html` | Hiện `goals` + `prereq` ("Sau bài này bạn làm được"), nhãn độ tươi `fresh`/`checked`, giữ nhãn `assume` và mục `src` | Bài không khai trường mới hiện như cũ |
| `tools_validate_bai.mjs` | Luật chuẩn v2 cho bài `std: 2`; đếm bài v2 | Bài cũ không bị siết |
| `assets/js/data/bai/README.md`, `qa/curriculum/CONTENT-EXCELLENCE-GUIDELINES.md` | Lược đồ v2, chính sách nguồn, độ tươi, định lượng, câu hỏi | — |
| `assets/js/data/bai-index.js` | `BAI_V` 28 → 29 | Buộc trình duyệt tải lại nội dung |
| `api/src/generated/bank.json` | Dựng lại từ nội dung mới (5.721 câu) | Đáp án máy chủ khớp câu hỏi mới |
| 748/789 bài B: | `assume:true` (đợt gắn nhãn; bỏ qua in02, in03) | Chỉ thêm nhãn hiển thị |

## C2. Đợt sửa lỗi P1 toàn chương trình (88 module)

- Nguồn lỗi: `p1-worklist/*.json` (431 lỗi P0/P1 đã được người chấm độc lập xác nhận ở baseline, trừ 12 bài thí điểm). Quy tắc: `P1-SWEEP-BRIEF.md`. Nhật ký từng lỗi: `p1-log/*.json`; tổng hợp: `p1-summary.json`.
- Kết quả: **431/431 lỗi có nhật ký · 397 fixed · 0 rejected · 34 needs-human** (danh sách ở `HUMAN-REVIEW-QUEUE.md`).
- 15/30 lô bị ngắt giữa chừng do hết hạn mức API; chạy lại với chỉ dẫn "kiểm văn bản hiện tại trước khi sửa", không áp lại bản sửa đã có. Quét câu lặp sau đó (`dup-scan.mjs`): 0 câu bị áp hai lần.
- **Khoá đáp án đổi trong đợt sửa (đều do đáp án/đề cũ sai hoặc lộ):**

| Bài | Câu | Trước → Sau | Lý do |
|---|---|---|---|
| B:kn04-08 | Q3 (calc) | 84 lượt → 32,1 % | Đề cũ dựa trên giả định ẩn (bình luận đều 6/giờ); câu mới đo đúng kỹ năng của bài |
| B:kn05-03 | Q4 (calc) | 200 → 250 | Q3–Q5 cùng đáp số 200, đoán được theo mẫu |
| B:kn05-03 | Q5 (calc) | 200 → 100 | như trên |
| B:ob03-02 | Q1 | chữ d giữ, nội dung đáp án đổi “Ngành B” → “Chưa chọn được, phải ước phần giành” | Đáp án cũ sai theo chính ví dụ của bài (1% tăng trưởng B = 3 tỉ < 4 tỉ của A) |
| B:kn16-03 | Q6 | câu hỏi mới (đọc dữ liệu 6 video) | Q6 cũ trùng Q1 |
| B:tu03-01 | Q3 | đáp số 7 giữ; nhãn mã lỗi sửa | Nhãn cũ chẩn đoán sai hiểu lầm của người học |
| B:qc11-02 | Q4 (calc) | 2,2 → 2,5 | MER hoà vốn tính trên biên đóng góp thay biên gộp (đợt sửa sau chấm mù) |

- Bỏ qua ghi chú "đã sửa": agent lô kn04–kn06 ghi `fixed` cho 5 khẳng định đã hedge nhưng chưa xác nhận; đã đưa thêm vào `HUMAN-REVIEW-QUEUE.md`.
- Sửa 3 câu ghi chú kiểu biên tập viên lọt vào chữ người học (kn12 ×2, qc08 ×1).
- Đổi tiêu đề 2 bài theo bản sửa (B:in02-02, B:tp08-04); `bai-index.js` sinh lại, `BAI_V` 29 → 30; `bank.json` dựng lại.

## C3. Chấm mù sau đợt sửa và đợt sửa tiếp theo

- Mẫu phân tầng 102/317 bài đã sửa (`reaudit-sample.json`), 5 người chấm mù. Kết quả: `SWEEP-BEFORE-AFTER.md` — TB 70,7 → 78,2; bài ≥ 85: 0 → 17; P0 1 → 0; P1 130 → 47; 5 bài giảm 1–4 điểm.
- 47 lỗi P1 còn lại (41 bài, 37 module) → `reaudit-worklist/`, quy tắc bổ sung `REAUDIT-FIX-BRIEF.md` (không ghi chú biên tập viên, không rào đón trong đáp án đúng, câu thêm phải khớp câu cạnh, tính lại kết luận liên quan). Nhật ký: `reaudit-log/`. Kết quả: 47/47 fixed, 0 rejected, 0 needs-human; 41 bài này chưa chấm mù lần ba.

## D. Chưa làm (đợt kế tiếp, xem CURRICULUM-EXCELLENCE-REPORT.md mục kế hoạch)

- Lỗi P1 ước còn lại trong 215 bài đã sửa nhưng không nằm trong mẫu chấm mù (tỉ lệ mẫu: 47 P1 / 102 bài) — cần một lượt chấm mù thứ hai trên phần còn lại.
- 13 P1 trong đề chặng độc lập; 5 P1 trong case/task/capstone.
- Nhãn mã lỗi lệch ở nhiều câu calc (danh sách trong từng file điểm, sev P2).
- 777 bài chưa theo chuẩn v2 (goals, fresh, counter/deeper ở 419 bài).
