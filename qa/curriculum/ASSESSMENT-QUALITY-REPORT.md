# Báo cáo chất lượng đánh giá (câu hỏi, đề chặng, case, bài thực hành)

*Sinh tự động từ `scores/assessment-exam-items.json`, `scores/assessment-cases.json` và baseline.json.*

## 1. Câu hỏi trong bài (5.523 câu của 789 bài B:)

- Mọi câu tính được tính lại bằng máy: **1018/1018 đúng**.
- Mức tư duy: L1 83 · L2 1406 · L3 2220 · L4 1279 · L5 768 · L6 42.
- Lỗi P0 trong câu hỏi bài: 2 (B:kn01-01 Q1 hai phương án bênh được; B:qc06-06 Q1 cơ chế sai) — đã sửa.
- Lỗi P1 hay gặp: đáp án đoán được bằng hình thức; lời giải mâu thuẫn phần đọc; nhãn ERRORS lệch lỗi thật; câu tính một bước lặp lại số trong ví dụ.

## 2. Ngân hàng đề chặng độc lập (198 câu + 12 bài tính số)

| Chỉ số | Giá trị |
|---|---:|
| Câu độc lập | 198 |
| Theo loại | mcq 84 · case 49 · calc 38 · judge 27 |
| Theo chặng | s1 37 · s2 39 · s3 38 · s4 41 · s5 43 |
| Verdict | ok 136 · P0 0 · P1 13 · P2 49 |
| Bloom | L1 7 · L2 34 · L3 62 · L4 56 · L5 34 · L6 5 |
| teaches trỏ sai bài | 21 |
| Bài tính số (drills) tính lại đúng | 12/12 |

### Pool đề so với blueprint

- **s1** (37 câu): Chỉ item độc lập: mcq 16/24 THIẾU 8 · case 9/9 (vừa đủ, không dư) · calc 6/6 (vừa đủ, không dư) · judge 6/6 (vừa đủ, không dư). Lưu ý buildExam() lấy cả item '#' của bài B: cùng chặng, nên mcq/calc thực tế dư rất nhiều; case và judge không có nguồn bù, đang đúng ngưỡng 3× hoặc sát ngưỡng.
- **s2** (39 câu): Chỉ item độc lập: mcq 17/24 THIẾU 7 · case 10/9 · calc 6/6 (vừa đủ, không dư) · judge 6/6 (vừa đủ, không dư). Lưu ý buildExam() lấy cả item '#' của bài B: cùng chặng, nên mcq/calc thực tế dư rất nhiều; case và judge không có nguồn bù, đang đúng ngưỡng 3× hoặc sát ngưỡng.
- **s3** (38 câu): Chỉ item độc lập: mcq 17/24 THIẾU 7 · case 9/9 (vừa đủ, không dư) · calc 6/6 (vừa đủ, không dư) · judge 6/6 (vừa đủ, không dư). Lưu ý buildExam() lấy cả item '#' của bài B: cùng chặng, nên mcq/calc thực tế dư rất nhiều; case và judge không có nguồn bù, đang đúng ngưỡng 3× hoặc sát ngưỡng.
- **s4** (41 câu): Chỉ item độc lập: mcq 18/24 THIẾU 6 · case 11/9 · calc 6/6 (vừa đủ, không dư) · judge 6/6 (vừa đủ, không dư). Lưu ý buildExam() lấy cả item '#' của bài B: cùng chặng, nên mcq/calc thực tế dư rất nhiều; case và judge không có nguồn bù, đang đúng ngưỡng 3× hoặc sát ngưỡng.
- **s5** (43 câu): Chỉ item độc lập: mcq 16/21 THIẾU 5 · case 10/9 · calc 14/12 · judge 3/3 (vừa đủ, không dư). Lưu ý buildExam() lấy cả item '#' của bài B: cùng chặng, nên mcq/calc thực tế dư rất nhiều; case và judge không có nguồn bù, đang đúng ngưỡng 3× hoặc sát ngưỡng.

### Lỗi hệ thống

- Mẹo hình thức lớn nhất (P1): 56/133 đáp án đúng của mcq/case chứa gạch ngang "—" (cấu trúc "kết luận — giải thích") so với 10/399 phương án sai (42% so với 2,5%). Người học thi 2–3 lần sẽ học được "chọn phương án có gạch ngang". Cần viết phương án sai cùng cấu trúc hoặc bỏ cấu trúc này ở đáp án.
- Phương án vứt đi (P2): 24 item có ít nhất một phương án sai dưới 35 ký tự trong khi đáp án dài trên 55 (vd. e4.039 "Từ lịch đăng bài", e4.012 "Giá bán phải giảm", e4.013 "Nhân viên marketing mất việc", e4.022 "Đối thủ sẽ mua lại các giải đấu"). Vi phạm luật 1 của bank; xác suất đoán thực tế là 1/3 chứ không phải 1/4.
- Judge (P2): phương án sai thường mang số to tròn hoặc từ giục ("10.000 khách", "#1", "98%", "nhanh tay kẻo hết"): 25 lần ở phương án sai so với 11 lần ở phương án đúng. Thông điệp dạy là đúng ("số không kiểm được không có giá trị") nhưng nếu lặp y một khuôn thì người học bắt mẹo "có số to = sai" thay vì học cách kiểm số. Nên có 3–4 judge mà phương án đúng là phương án có số lớn kiểm được.
- teaches lệch khái niệm (P2, 20 item): chuỗi s1m1 gắn media sở hữu (L:56) vào P:physical-availability (e1.003, e1.016, e1.025, e1.031); e1.026 gắn earned media vào P:share-of-voice; e2.012 mỏ neo → P:scarcity; e2.013 mặc định → P:social-proof; e2.030 hoà vốn → P:targeting; e4.025 ROAS → P:funnel; e5.033/e5.034 → P:pricing. Hậu quả: mã ôn KN_ (exams.js sinh từ teaches) nhắc ôn sai nguyên lý.
- Pool thực tế: buildExam() lọc EXAM_ITEMS theo stage, không loại item "#", nên slot mcq (8/15) và calc chủ yếu rút từ hàng trăm câu quiz bài B: (s1 409 mcq, s5 1.199 mcq); 84 mcq và 38 calc độc lập gần như không bao giờ xuất hiện trong đề. Ngược lại case và judge chỉ có nguồn độc lập và đang đúng ngưỡng 3× không dư (s1 case 9/9, judge 6/6; s3 case 9/9; s5 judge 3/3) — thi lại lần 2–3 chắc chắn lặp nhiều case/judge.
- Bloom tổng: không có P0; mcq độc lập thiên về L2 (nhận lại ý bài) với 8 câu L1 định nghĩa (e2.007, e3.001, e3.004, e3.010, e3.012, e4.006, e5.007, e1.014) — thay được bằng câu L3+ như rubric yêu cầu; L6 chỉ xuất hiện ở 5 judge (e3.034, e3.036, e4.031, e4.034, e5.015).
- Trường difficulty lệch với Bloom thực: nhiều câu định nghĩa/một phép chia ghi difficulty 3 (e1.030, e1.036, e3.004, e3.012) trong khi calc nhiều bước ghi 2. Trường này không ảnh hưởng chấm nhưng làm lệch báo cáo năng lực.
- Khẳng định về nền tảng/thuật toán không nguồn trong why (e4.008 why.a, e4.017 why.c, e4.013 why.d) — rubric xếp P1 khi nêu như sự thật; key của e4.008 đã gắn nhãn "quan sát của người làm nghề" là mẫu tốt nên áp dụng cho phần why.
- Số liệu thương hiệu thật trong ctx đều kiểm được hoặc đã gắn nhãn: Vinamilk 6/7/2023 (verified), Nike +31% Edison Trends (labelled estimate), The Coffee House ~150→~93 (verified, có "giả sử"), Patagonia +30% (labelled), MoMo "thể lệ một số năm" (labelled), Grab "diễn giải của tác giả" (labelled). Không phát hiện khẳng định sai sự thật.
- Dung sai: exam.js và api/learn-core.js chấm tuyệt đối (|v−ans| ≤ tol); parseNum xử lý đúng "7.200", "1,25", "33,3". Mọi đáp án sai đã khai báo đều nằm ngoài dung sai của đáp án đúng. drills.js lại ghi tol kiểu tương đối (0,003–0,01) — không gây lỗi vì drill hiển thị trắc nghiệm, nhưng nên thống nhất một quy ước.

### Lỗi nặng nhất

- **e3.013** (P1): Đáp án "âm thanh bị đánh giá thấp nhất" là ý kiến nêu như sự thật, không nguồn; phương án c (màu) bênh được từ chính L:60 — hai phương án đúng tiềm năng.
- **e5.009** (P1): Stem tuyệt đối "chỉ thật sự xảy ra khi", key hẹp hơn chính P:referral ("giúp bạn bè hoặc trông tốt"); phương án a (thưởng) có phản ví dụ thật; why dẫn "Wrapped" không ngữ cảnh.
- **e4.014** (P1): Hai phương án sai mở đầu "Luôn chọn…", đáp án mở đầu "Tuỳ mục tiêu" — đoán được bằng từ tuyệt đối.
- **systemic:em-dash** (P1): 42% đáp án đúng có gạch ngang "—" so với 2,5% phương án sai — mẹo hình thức xuyên bank.
- **e2.021** (P1): Phương án b (bền vững) là trụ định vị thật của Liquid Death nên cũng bênh được; đáp án d dài nhất +14 ký tự.
- **e4.019** (P1): Đáp án dài hơn 20 ký tự, duy nhất có "—" và hai mệnh đề — chọn được bằng hình thức.
- **e4.017** (P1): Đáp án dài nhất +17 ký tự; why.c khẳng định về phân phối TikTok không nguồn.

## 3. Case bấm giờ (18), ads case (3), bài thực hành (37), capstone

| Nhóm | Số | TB /100 (10 phần của case chuẩn) |
|---|---:|---:|
| Case bấm giờ | 18 | 65.9 |
| Ads case | 3 | 76.0 |
| Bài thực hành có đầu ra | 37 | 70.6 |
| Capstone | 1 | 72 |

### Theo case

| Case | Loại | Điểm | Lĩnh vực | P0/P1 |
|---|---|---:|---|---:|
| ngan-sach-share-of-voice | timed | 44 | D4 D6 D1 | 2 |
| la-tra-giam-gia | timed | 61 | D10 D1 D2 | 0 |
| chia-ngan-sach-hai-kenh | timed | 61 | D6 D1 D8 | 0 |
| quan-an-voucher-san | timed | 62 | D10 D5 D1 | 0 |
| phat-mau-thu-sampling | timed | 62 | D5 D1 D7 | 0 |
| khoa-hoc-online-cac | timed | 63 | D1 D6 D8 | 1 |
| cocomi-ngan-sach | timed | 65 | D1 D6 D8 D7 | 0 |
| mo-diem-ban | timed | 65 | D5 D4 D1 D8 | 1 |
| the-hoan-tien | timed | 66 | D1 D7 D10 D2 | 0 |
| ban-ship-mien-phi | timed | 67 | D10 D6 D1 | 0 |
| so-ban-hang-churn | timed | 68 | D7 D1 D9 D8 | 0 |
| duoc-nho-ca-phe-lon | timed | 69 | D4 D2 D6 | 0 |
| tang-gia-goi-thang | timed | 70 | D10 D7 D8 | 0 |
| thong-diep-excel-ke-toan | timed | 71 | D11 D7 D6 D8 | 0 |
| hanh-vi-rau-huu-co | timed | 72 | D2 D3 D8 D10 | 1 |
| dinh-vi-so-ngay | timed | 72 | D4 D2 D3 D9 | 0 |
| mo-than-goi-gia | timed | 74 | D10 D2 D7 D8 | 0 |
| phan-khuc-sua-hat | timed | 75 | D1 D5 D2 | 0 |
| kho-viet | ads | 75 | D9 D6 D8 D12 | 0 |
| bep-nha-la | ads | 76 | D6 D8 D11 D12 D1 | 0 |
| noi-that-an-cu | ads | 77 | D6 D8 D9 D11 | 0 |

### Phủ lĩnh vực của đánh giá ứng dụng

- D1: 29 mục
- D2: 11 mục
- D3: 10 mục
- D4: 8 mục
- D5: 10 mục
- D6: 21 mục
- D7: 16 mục
- D8: 32 mục
- D9: 4 mục
- D10: 13 mục
- D11: 10 mục
- D12: **không có**

Lĩnh vực chưa có đánh giá ứng dụng: **D12**.

### Lỗi hệ thống

- Mẫu khuyến nghị lộ: 16/18 case bấm giờ có đáp án đúng là 'không làm điều sếp đề xuất; thử nhỏ/đi từng nấc và đo' (ngoại lệ: ngan-sach-share-of-voice, tang-gia-goi-thang một phần). Đáp án đúng gần như luôn chứa động từ đo lường (đo, thử, so, từng nấc, ngưỡng dừng) trong khi phương án sai thường không. Tests chỉ kiểm vị trí/độ dài, không kiểm dấu hiệu từ vựng; người học có thể đoán đúng rec mà không tính.
- Hỏi exhibit nhiễu không mất gì: giai-case.html chỉ ghi chú 'đó là thời gian mất đi' sau khi nộp, không trừ giờ, không trừ điểm, không ảnh hưởng đạt/chưa đạt. Chiến lược trội là hỏi tất cả. Năng lực 'chọn hỏi cái gì' (lời tựa của cases.js) không được đánh giá; key:false hiện vô nghĩa về chấm.
- Tiêu chí 'Cấu trúc / trình bày 60 giây' (comps.structure → c15) được tính đạt khi mỗi ô ≥ 3 chữ; không chấm nội dung. Năng lực c15 'Đọc số & trình bày' được ghi nhận trên bản đồ năng lực mà không có bằng chứng.
- Exhibit nhiễu yếu: 30/32 exhibit key:false là follower, lượt thích, điểm đánh giá, thời tiết, độ tuổi — hiển nhiên không liên quan; chỉ ads-cases (CPM, pixel, tốc độ gọi lại) có nhiễu 'trông như nguyên nhân'. Hai exhibit key:false lại được dùng trong lời giải/mẫu (ban-ship e4, thong-diep e6) → nhãn key không nhất quán.
- Không có bước giả thuyết hay phương án thay thế do người học tạo: cả 18 case, 3 ads case và capstone đều cho insight/đề xuất dưới dạng chọn 1 trong 3–4; phương án thay thế và trade-off chỉ tồn tại trong lời giải của đáp án sai. Kế hoạch triển khai là một câu (model.n), không có chủ sở hữu, mốc, ngưỡng dừng theo kênh — ngoại trừ capstone.
- Kinh tế lệch một chiều ở nhiều case (mo-diem-ban 3×, phan-khuc 5,8× so với lỗ, chia-ngan-sach 250k vs 200k với LTV 220k ở giữa — ok): sau phép tính, quyết định hiển nhiên; chỉ tang-gia (LTV gần bằng), mo-than (tăng lãi nhưng nhiễu mùa), dinh-vi (−0,1 điểm), thong-diep (mẫu nhỏ) là quyết định thật sự khó.
- Đòn bẩy được khuyến nghị thường không có dữ liệu để tính (cocomi: mua lại 30→45%; khoa-hoc: mua thêm 20→30%; the-hoan-tien: hoàn tiền trải đều; la-tra: khung giờ vắng): người học bị buộc chọn phương án 'nghe hợp lý' thay vì tính được — trái với tiêu chí 'Khuyến nghị bám vào số'.
- Chấm đạt/chưa đạt bằng MCQ 3–4 phương án không phạt đoán: xác suất đoán trúng cả insight lẫn rec ≈ 6–11%; phần calc phải đúng hết nên tổng thể vẫn chặt, nhưng bản đồ năng lực ghi c-insight/c-rec từ một lần chọn đúng.
- Bài thực hành (37/37) tính đúng; rubric nhìn chung quan sát được (số cụ thể, điều kiện hình thức). Nhưng 30/37 là bài tính một đường (given → công thức → số); chỉ 7 bài Phase 5 đòi hỏi giả thuyết, điều kiện sai, mức tin cậy. Rubric lệ thuộc tự chấm, không có mẫu sai để đối chiếu.
- Phân bố bài học lại tập trung: L:63, L:65, L:59, P:ltv, P:cac chiếm phần lớn lesson của qs; comps dồn vào c11, c13, c15; c05 (tài sản thương hiệu) chỉ xuất hiện ở một case (ca-phe, rec).
- D12 (AI & martech) không có bất kỳ đánh giá ứng dụng nào; D9 không có task; D3 không có case bấm giờ trung tâm.

### Lỗi nặng nhất

- **khoa-hoc-online-cac/q3** (P0): Câu hỏi 'LTV/CAC của phần tăng thêm' nhưng đáp án 1,6 dùng CAC trung bình mới của kênh B (900.000đ); CAC biên theo chính dữ liệu e4 là 1.125.000đ → 1,28. Người học hiểu đúng bài L:65 (biên ≠ trung bình) bị chấm sai.
- **ngan-sach-share-of-voice** (P1): Khuyến nghị do 'quy tắc nội bộ SOV=SOM' quyết; không có biên lãi, quy mô ngành hay giá trị điểm thị phần để biết chi thêm 5,5 tỷ/năm có đáng; 4 exhibit, 1 nhiễu, không giả thuyết thay thế. Tổng 44/100.
- **systemic/asks** (P1): Hỏi exhibit nhiễu không mất giờ/điểm (giai-case.html) nên 'chọn hỏi gì' — ý tưởng trung tâm của case bấm giờ — không được đánh giá; đồng thời 16/18 case có đáp án rec cùng một mẫu 'không làm theo sếp, thử nhỏ và đo'.
- **hanh-vi-rau-huu-co/q4.why** (P1): Lời giải nói giảm giá hữu cơ về 200.000đ làm 'lãi gộp mỗi gói âm' trong khi 200.000 − 168.000 = +32.000đ.
- **mo-diem-ban** (P1): Phương án B thắng gấp 3 nhờ bỏ qua chi phí phục vụ 4.000 điểm và suy giảm chất lượng điểm biên; quyết định hiển nhiên, không có trade-off.
- **capstone/channels** (P1): Mô hình kênh tuyến tính theo chi, không lợi suất giảm dần, không phụ thuộc lịch mùa vụ → phân bổ tối ưu là máy móc; bước 5 không có quyết định thật.
