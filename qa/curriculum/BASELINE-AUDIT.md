# Báo cáo chất lượng nền (baseline) — toàn chương trình

*Sinh tự động 2026-11-08 từ `qa/curriculum/baseline.json` (91 file điểm độc lập, thang `RUBRIC-100 v1`). Mọi bài được một người chấm độc lập đọc trọn, tính lại mọi câu tính bằng máy và tự giải mọi câu trắc nghiệm trước khi xem đáp án.*

## 1. Tổng quan

| Chỉ số | Giá trị |
|---|---:|
| Bài đã chấm | 837/837 |
| Điểm trung bình | 72.9/100 |
| Trung vị | 74 |
| Bài ≥ 85 (đạt chuẩn) | 6 (1%) |
| Bài < 60 | 38 |
| Lỗi P0 (sai đáp án / sai sự thật / sai toán) | 2 |
| Lỗi P1 | 478 |
| Lỗi P2 | 2293 |
| Câu tính được tính lại bằng máy | 1018/1018 đúng |

Phân bố điểm: 40–49: **1** · 50–59: **37** · 60–69: **178** · 70–79: **504** · 80–89: **117**.

## 2. Điểm theo chiều (trung bình / tối đa)

| Chiều | TB | Tối đa | % |
|---|---:|---:|---:|
| accuracy | 12.7 | 15 | 85% |
| depth | 10.8 | 15 | 72% |
| practical | 14.3 | 20 | 72% |
| examples | 10.1 | 15 | 67% |
| pedagogy | 7.3 | 10 | 73% |
| assessment | 7.1 | 10 | 71% |
| data | 6.6 | 10 | 66% |
| clarity | 4.2 | 5 | 84% |

Đọc nhanh: hai chiều yếu nhất tính theo phần trăm là **data** (66%) và **examples** (67%): bài đúng và áp dụng được, nhưng số liệu ví dụ thường không gắn nhãn, không nêu nhiễu, và ít bài có phản ví dụ hoặc đào sâu. **accuracy** cao (85%) nhưng phần lớn điểm trừ ở đây là khẳng định về nền tảng/nghiên cứu/luật nêu như sự thật mà không có nguồn.

## 3. Mức tư duy của 5.523 câu hỏi (người chấm gán)

| L1 nhớ | L2 hiểu | L3 áp dụng | L4 phân tích | L5 đánh giá | L6 thiết kế |
|---:|---:|---:|---:|---:|---:|
| 83 | 1406 | 2220 | 1279 | 768 | 42 |

L1–L2 chiếm 26%, L4+ chiếm 36%. Câu #2 (quyết định) của hầu hết bài đạt L4–L5; câu #4–#7 là nơi dồn L2.

## 4. Độ tươi của kiến thức và nguồn

| Loại | Số bài | Yêu cầu nguồn | Thực tế |
|---|---:|---|---|
| evergreen | 595 | không bắt buộc | — |
| periodic | 121 | src + ngày kiểm | chỉ qc có src |
| fast | 121 | src + ngày kiểm + câu "nếu màn hình khác" | 48 bài qc có src; kn06, kn11, kn13–kn16, dl07, tn06, dl03-06 không có |

Nhãn bằng chứng trên mọi khẳng định có tên/số: illustrative-unlabelled **466** · illustrative-labelled **431** · unverified **750** · verified **180** · wrong **8**.

## 5. Điểm theo bước hành trình

| Bước | Bài | TB |
|---|---:|---:|
| ads | 77 | 77.6 |
| test | 59 | 75.2 |
| hypothesis | 59 | 75.1 |
| measure | 92 | 74.4 |
| optimize | 59 | 73.9 |
| insight | 50 | 73.5 |
| observe | 71 | 73.4 |
| understand | 97 | 73 |
| channel | 130 | 71.4 |
| message | 95 | 71.4 |
| legacy-L | 26 | 63.2 |
| legacy-P | 22 | 59 |

## 6. Điểm theo module (xếp từ thấp lên cao)

| Module | Tên | Bài | TB | Min | Max |
|---|---|---:|---:|---:|---:|
| s3m3 | bài cũ L:/P: trong module s3m3 | 3 | 54.3 | 49 | 57 |
| s2m3 | bài cũ L:/P: trong module s2m3 | 5 | 56.2 | 54 | 64 |
| s2m1 | bài cũ L:/P: trong module s2m1 | 3 | 56.3 | 55 | 57 |
| s3m2 | bài cũ L:/P: trong module s3m2 | 5 | 57.4 | 54 | 60 |
| s3m1 | bài cũ L:/P: trong module s3m1 | 3 | 58 | 55 | 61 |
| s2m2 | bài cũ L:/P: trong module s2m2 | 4 | 58 | 54 | 63 |
| s4m2 | bài cũ L:/P: trong module s4m2 | 3 | 59.7 | 59 | 61 |
| s1m1 | bài cũ L:/P: trong module s1m1 | 3 | 61.3 | 60 | 64 |
| s5m2 | bài cũ L:/P: trong module s5m2 | 5 | 63.2 | 59 | 68 |
| kn16 | TikTok: bảng đề xuất, độ dài đúng lời hứa, Spark Ads | 5 | 63.4 | 54 | 70 |
| s4m1 | bài cũ L:/P: trong module s4m1 | 3 | 64 | 54 | 72 |
| in03 | Case quốc tế đáng học | 10 | 64.2 | 58 | 74 |
| tp08 | Ý tưởng sáng tạo và big idea | 9 | 64.2 | 60 | 69 |
| kh08 | Bằng chứng xã hội và khan hiếm dùng đúng cách | 8 | 64.5 | 59 | 73 |
| kn04 | Social và content theo nền tảng | 8 | 65.8 | 52 | 76 |
| tp03 | Tên, câu slogan và lời hứa thương hiệu | 9 | 65.9 | 58 | 75 |
| s1m2 | bài cũ L:/P: trong module s1m2 | 3 | 66 | 62 | 73 |
| kn06 | Quảng cáo trả tiền: Meta, Google, TikTok | 9 | 66.4 | 64 | 69 |
| ob01 | Marketing là gì khi nhìn từ quầy bán hàng | 7 | 67.1 | 58 | 75 |
| dl07 | GA4 và dashboard đọc được | 10 | 67.3 | 60 | 74 |
| tu03 | Khuyến mãi không phá giá | 10 | 68 | 52 | 80 |
| kn09 | PR và truyền thông khủng hoảng | 10 | 68.9 | 64 | 75 |
| kn15 | YouTube: đóng gói, giữ chân và đọc đúng báo cáo | 5 | 69.2 | 64 | 78 |
| tp09 | Kể chuyện thương hiệu không sến | 10 | 69.2 | 58 | 78 |
| s5m3 | bài cũ L:/P: trong module s5m3 | 3 | 69.3 | 62 | 81 |
| ob04 | Đối thủ: ai đang lấy tiền của khách bạn | 9 | 69.6 | 59 | 81 |
| kn13 | Mạng xã hội theo nền tảng: được thấy, giữ chân, lịch nội dung, chẩn đoán và báo cáo | 7 | 70.1 | 63 | 79 |
| kh09 | Khách B2B: nhiều người quyết định, chu kỳ dài | 10 | 70.4 | 59 | 80 |
| kn14 | Instagram: mỗi bề mặt một việc, một cách xếp hạng | 5 | 70.4 | 63 | 75 |
| ob06 | Bối cảnh thị trường Việt Nam: kênh, vùng, mùa vụ, Tết | 10 | 70.8 | 59 | 81 |
| tp06 | Được nhớ tới: salience, mental availability | 7 | 71.1 | 64 | 77 |
| s4m3 | bài cũ L:/P: trong module s4m3 | 3 | 71.3 | 68 | 78 |
| kn05 | KOL, KOC, affiliate | 9 | 71.4 | 60 | 83 |
| tu01 | Tối ưu chuyển đổi trang đích | 10 | 71.7 | 67 | 77 |
| kn08 | CRM, Zalo OA, email: kênh của khách cũ | 10 | 71.8 | 62 | 77 |
| tp10 | Thông điệp theo từng bước phễu | 10 | 71.8 | 64 | 76 |
| kh01 | Phân khúc: chia thị trường theo nhu cầu, không theo tuổi | 9 | 71.9 | 63 | 85 |
| tp07 | Viết quảng cáo: dữ kiện thay tính từ | 9 | 72 | 67 | 78 |
| s5m1 | bài cũ L:/P: trong module s5m1 | 2 | 72 | 69 | 75 |
| kh02 | Chọn tệp: phục vụ ai trước | 9 | 72.1 | 62 | 80 |
| tp04 | Tài sản nhận diện riêng | 7 | 72.1 | 63 | 79 |
| tn05 | Ra mắt sản phẩm là bài toán thứ tự | 9 | 72.2 | 60 | 80 |
| kn07 | Ngân sách media và share of voice | 8 | 72.4 | 63 | 79 |
| tn01 | Thử nhỏ trước khi chi lớn | 10 | 72.5 | 68 | 76 |
| kn10 | Kế hoạch truyền thông tích hợp (IMC) | 10 | 72.6 | 65 | 80 |
| kh04 | Insight: sự thật chưa ai nói ra | 9 | 72.8 | 66 | 76 |
| dl04 | Giữ chân, cohort và cái xô thủng | 8 | 72.9 | 68 | 81 |
| tp01 | Định vị: đứng ở đâu so với lựa chọn thay thế | 9 | 72.9 | 66 | 78 |
| kh10 | Gen Z, phụ huynh, người tỉnh: ba nhóm hay bị hiểu sai | 10 | 73 | 66 | 81 |
| tp05 | Tài sản thương hiệu và giá trị dài hạn | 8 | 73.1 | 66 | 78 |
| kh03 | Jobs-to-be-done: khách "thuê" sản phẩm để làm gì | 9 | 73.2 | 68 | 77 |
| dl01 | Phễu và tỉ lệ chuyển đổi | 8 | 73.3 | 68 | 79 |
| in02 | Case thương hiệu Việt | 10 | 73.3 | 66 | 81 |
| gt03 | Giả thuyết kiểm chứng được | 10 | 73.4 | 68 | 77 |
| kn01 | Owned, earned, paid: bạn có bao nhiêu media | 10 | 73.4 | 67 | 79 |
| kh05 | Phỏng vấn khách hàng không dẫn dắt | 8 | 73.6 | 67 | 84 |
| kn12 | Quảng cáo, khuyến mại và dữ liệu khách hàng ở Việt Nam: biết khi nào phải dừng lại hỏi pháp chế | 8 | 73.8 | 71 | 79 |
| ob05 | Tín hiệu hành vi: khách làm gì, không phải khách nói gì | 10 | 74 | 69 | 82 |
| dl08 | Chỉ số phù phiếm và chỉ số ra quyết định | 10 | 74.2 | 71 | 77 |
| qc07 | TikTok Ads và quảng cáo TikTok Shop | 7 | 74.3 | 65 | 83 |
| tp11 | Giá là một thông điệp | 8 | 74.3 | 67 | 78 |
| in05 | Phỏng vấn và case round | 10 | 74.5 | 70 | 83 |
| gt05 | Brief một trang | 9 | 74.6 | 70 | 80 |
| ob08 | Marketing mix 4P/7P: đọc một doanh nghiệp bằng bảng kiểm | 8 | 74.6 | 71 | 80 |
| tu06 | Khi nào dừng một chiến dịch | 10 | 74.6 | 67 | 79 |
| gt01 | Viết vấn đề trước khi viết giải pháp | 10 | 74.7 | 69 | 80 |
| tu02 | Tối ưu ngân sách quảng cáo | 10 | 74.7 | 71 | 79 |
| dl05 | Đo thương hiệu: nhận biết, cân nhắc, sức khoẻ | 10 | 74.9 | 70 | 84 |
| dl09 | Trình bày số cho sếp | 10 | 74.9 | 70 | 80 |
| gt04 | Ưu tiên: làm gì trước khi tiền và người có hạn | 10 | 74.9 | 71 | 78 |
| tn04 | Thử giá và khuyến mãi | 10 | 75.1 | 65 | 81 |
| kn02 | Phân phối và độ phủ điểm bán | 8 | 75.4 | 69 | 79 |
| ob03 | Ngành hàng (category) và luật chơi của nó | 10 | 75.8 | 72 | 80 |
| qc10 | LinkedIn cho B2B và các kênh nên cân nhắc kỹ | 5 | 75.8 | 70 | 80 |
| dl02 | CAC, LTV và kinh tế đơn vị | 8 | 75.9 | 72 | 80 |
| in01 | Đọc lại chiến dịch: post-mortem | 10 | 76 | 70 | 81 |
| kn11 | Tìm kiếm tự nhiên (SEO) cho người mới: để khách tìm thấy bạn không cần trả tiền mỗi lượt | 8 | 76.1 | 71 | 82 |
| dl06 | Attribution: kênh nào được công | 10 | 76.2 | 72 | 82 |
| qc08 | Zalo Ads cho doanh nghiệp địa phương và lead | 6 | 76.2 | 64 | 85 |
| ob07 | Đọc số cho đúng: số nào đáng tin | 7 | 76.3 | 67 | 82 |
| gt02 | Cây vấn đề: doanh thu giảm thì tách ra sao | 10 | 76.4 | 72 | 82 |
| gt06 | Mục tiêu marketing gắn với mục tiêu kinh doanh | 10 | 76.4 | 70 | 84 |
| kn03 | Sàn TMĐT: Shopee, Lazada, TikTok Shop | 10 | 76.4 | 62 | 83 |
| tn06 | Thử kênh mới không đốt tiền | 10 | 76.4 | 66 | 82 |
| kh07 | Tâm lý quyết định: mỏ neo, mặc định, sợ mất | 7 | 76.7 | 69 | 84 |
| qc06 | YouTube, Demand Gen, Display và Performance Max | 7 | 76.7 | 73 | 82 |
| qc04 | Meta Ads (Facebook & Instagram) từ tài khoản tới tối ưu | 8 | 76.8 | 67 | 83 |
| tn03 | Thử sáng tạo: creative testing | 10 | 76.8 | 69 | 81 |
| dl03 | ROAS, lãi gộp, lợi nhuận sau quảng cáo | 10 | 76.9 | 72 | 83 |
| kh06 | Hành trình mua: từ lúc nghĩ tới đến lúc mua lại | 10 | 76.9 | 68 | 83 |
| tu04 | Giới thiệu và truyền miệng | 9 | 76.9 | 68 | 83 |
| qc03 | Creative, trang đích, đo lường, thử nghiệm và báo cáo | 8 | 77.3 | 74 | 81 |
| tn02 | A/B test: thiết kế, cỡ mẫu, đọc kết quả | 10 | 77.7 | 69 | 82 |
| kh11 | STP: ghép phân khúc, chọn tệp và định vị thành một chuỗi | 8 | 77.8 | 70 | 83 |
| ob02 | Đọc kệ hàng, menu và trang sàn | 10 | 77.8 | 70 | 85 |
| qc05 | Google Search Ads từ tài khoản tới tối ưu | 8 | 78 | 73 | 84 |
| tu05 | Tăng mua lặp lại và giá trị đơn | 10 | 78 | 73 | 85 |
| dl10 | ROI, ROAS và lợi nhuận sau quảng cáo: ba con số, ba câu hỏi khác nhau | 8 | 78.3 | 73 | 81 |
| qc01 | Từ mục tiêu kinh doanh tới kế hoạch quảng cáo | 7 | 78.3 | 75 | 81 |
| qc09 | Quảng cáo trên sàn: Shopee và Lazada | 7 | 79.1 | 63 | 87 |
| tp02 | Cửa vào ngành hàng (category entry points) | 9 | 79.2 | 73 | 83 |
| in04 | Viết đề xuất: What / Why / How | 10 | 79.3 | 74 | 84 |
| qc11 | Vận hành đa kênh: chia tiền, chẩn đoán, mở rộng, báo cáo | 6 | 79.7 | 69 | 86 |
| qc02 | Đọc số quảng cáo: từ lượt hiển thị tới lợi nhuận | 8 | 80.5 | 79 | 83 |

## 7. Lỗi P0 (2 bài) — đã sửa trong đợt này, xem UPGRADE-TRACKER.md

- **B:kn01-01** — Q1: Theo đúng ba tiêu chí của bài, phương án c bênh được ngang hoặc hơn a: lượt thấy = 9.000/tháng (bằng túi giấy vì mỗi khách một lần), đường dẫn tới hành động ngắn hơn (khách đứng yên một phút, có nhân viên — chính Q2 gọi tình huống này là "đường dẫn tới hành động ngắn nhất"), chi phí sửa ≈ 0 so với 2,7 triệu/tháng của túi. Lời giải loại c ("số lượt không vượt số khách") cũng đúng y như vậy với túi giấy. Hai phương án cùng bênh được.
- **B:qc06-06** — Q1: Theo hiểu biết của người chấm, trong cùng một tài khoản Google Ads một chuyển đổi được chia công giữa các chiến dịch theo mô hình phân bổ (tổng công = 1); Google không ghi trùng một đơn cho nhiều chiến dịch, nên phương án b ('Google khử trùng đơn giữa các chiến dịch') mô tả đúng cơ chế hơn đáp án c. Với đo đúng, tổng doanh thu các chiến dịch tự báo ≤ doanh thu web (không phải đơn nào cũng qua quảng cáo), nên 'lớn hơn' không phải điều 'thường' xảy ra. Hiện tượng bài muốn dạy là 'tổng tự báo lớn hơn PHẦN TĂNG THÊM của doanh thu web' (đúng) — nhưng đề hỏi so với doanh thu web. Hai phương án bênh được và cơ chế nêu như sự thật về cách nền tảng vận hành là sai. Cần người có tài khoản thật đối chiếu trước khi sửa.

Ngoài bài học: ngân hàng đề chặng (198 câu độc lập) P0 = 0, P1 = 13; case bấm giờ/ads case/task/capstone P0 = 1 (khoa-hoc-online-cac/q3, đã sửa), P1 = 5.

## 8. 40 bài điểm thấp nhất (ưu tiên đợt kế tiếp)

| Bài | Điểm | Tiêu đề | Lỗi P1 |
|---|---:|---|---:|
| P:awareness | 49 | Awareness (Nhận biết) | 1 |
| B:kn04-01 | 52 | Tiệm bánh nhỏ có cần có mặt trên cả sáu nền tảng? | 2 |
| B:tu03-06 | 52 | Chiết khấu cho đại lý hay khuyến mãi cho người mua? | 4 |
| B:kn16-03 | 54 | Tài khoản nhỏ có được đề xuất không? Số người theo dõi không phải yếu tố trực tiếp | 3 |
| B:tu03-02 | 54 | Ưu đãi nên dành cho khách mới hay khách trung thành? | 3 |
| L:54 | 54 | Vì sao menu quán cà phê luôn có một món đắt vô lý? | 2 |
| P:brand-equity | 54 | Brand Equity (Tài sản thương hiệu) | 1 |
| P:distinctive-assets | 54 | Distinctive Assets (Tài sản nhận diện) | 1 |
| P:jobs-to-be-done | 54 | Jobs To Be Done (Công việc cần hoàn thành) | 1 |
| P:social-proof | 54 | Social Proof (Bằng chứng xã hội) | 0 |
| P:scarcity | 54 | Scarcity (Khan hiếm) | 1 |
| P:physical-availability | 54 | Physical Availability (Sẵn có về mặt vật lý) | 1 |
| L:70 | 55 | Lựa chọn mặc định là lựa chọn được chọn | 2 |
| P:targeting | 55 | Targeting (Chọn tệp) | 1 |
| P:positioning | 55 | Positioning (Định vị) | 2 |
| L:58 | 57 | Câu hỏi khảo sát tệ nhất trong marketing | 1 |
| L:73 | 57 | Đối thủ lớn nhất là “thôi không làm gì cả” | 1 |
| P:segmentation | 57 | Segmentation (Phân khúc) | 1 |
| P:salience | 57 | Salience (Độ nổi bật trong trí nhớ) | 1 |
| P:mental-availability | 57 | Mental Availability (Sẵn có trong trí nhớ) | 0 |
| B:in03-07 | 58 | Duolingo trên TikTok: thương hiệu nghiêm túc có nên "nhây" không? | 2 |
| B:ob01-02 | 58 | Quán trà sữa vắng khách: sửa sản phẩm, giá, chỗ bán hay cách quảng bá? | 2 |
| B:tp03-01 | 58 | Tên mô tả, tên gợi hình hay tên tự đặt: chọn loại nào cho quán mới? | 0 |
| B:tp09-04 | 58 | Cảm xúc thật hay "lấy nước mắt"? | 1 |
| B:tp09-08 | 58 | Quảng cáo Tết kể chuyện gia đình mà không sáo, làm sao? | 0 |
| L:55 | 58 | Cái tên nào đang làm việc thay bạn? | 1 |
| P:consumer-insight | 58 | Consumer Insight (Sự thật ngầm hiểu) | 1 |
| B:in03-04 | 59 | Apple "Think Different": định vị bằng người khách muốn trở thành? | 2 |
| B:kh08-03 | 59 | "Đã bán 12" có nên hiện lên trang không? | 1 |
| B:kh09-10 | 59 | Chạy quảng cáo B2B như bán trà sữa có được không? | 1 |
| B:kn04-07 | 59 | Một buổi quay có thể thành bao nhiêu bài? | 1 |
| B:ob01-05 | 59 | Shop thời trang chốt đơn giỏi nhưng khách không quay lại: marketing hay bán hàng hỏng? | 2 |
| B:ob04-02 | 59 | Vẽ bản đồ đối thủ thế nào để thấy chỗ trống? | 0 |
| B:ob06-01 | 59 | Hàng của bạn bán ở tạp hoá hay siêu thị — và vì sao điều đó đổi cả cách làm? | 1 |
| L:62 | 59 | Content không phải là lịch đăng bài | 0 |
| L:67 | 59 | Thuật toán không phải khán giả của bạn | 1 |
| L:69 | 59 | Đổi logo hiếm khi là câu trả lời | 0 |
| P:ltv | 59 | LTV (Giá trị vòng đời khách hàng) | 1 |
| B:dl07-01 | 60 | Báo cáo ghi 12.000 lượt xem — vậy có bao nhiêu người đã vào web? | 1 |
| B:kn05-01 | 60 | KOL, KOC hay affiliate: rốt cuộc bạn đang trả tiền cho cái gì? | 1 |

## 9. Mẫu lỗi lặp lại toàn chương trình (tổng hợp từ 91 báo cáo chấm)

1. **Số ví dụ không gắn nhãn minh hoạ** (≈ 2/3 số bài): người học không biết đâu là số thật.
2. **Khẳng định nền tảng/thuật toán/luật/nghiên cứu nêu như sự thật, không nguồn**: Meta/Google/TikTok/Shopee cơ chế phân phối, cửa sổ ghi nhận, "50 sự kiện/tuần", GA4 định nghĩa, Binet–Field 60/40, Spiegel 4,2–4,5, các nghị định 2025–2026.
3. **So trước–sau không đối chứng rồi kết luận nhân quả**, kể cả trong module dạy đối chứng (tn04, tn05, kh03, tp05, in03).
4. **Không nói độ nhiễu khi mẫu nhỏ** (khảo sát 20–40 người, 4–5 đơn đối chứng, chênh 3–5 điểm %).
5. **Thiếu Vì sao / Phản ví dụ / Đào sâu** ở 419/789 bài; các bài thiếu ba phần này thấp hơn bài đủ phần khoảng 8–12 điểm trong cùng module.
6. **Đáp án đoán được bằng hình thức**: phương án dài nhất, duy nhất có số, có "luôn/chắc chắn/không bao giờ", mẫu "viện luật là sai", mẫu "không làm theo sếp, thử nhỏ và đo".
7. **Nhãn lỗi (ERRORS) của giá trị sai không khớp lỗi thật** ở nhiều câu calc, làm ôn lỗi 1·3·7 ngày nhắc sai hiểu lầm.
8. **Trùng ý giữa bài trong cùng module hoặc chéo module** (ob06-09/ob05-08, kn02-07/kn03-09, dl09-05/dl08-08, tu06-10/in01-09, tp08-05/tp06-05, qc03-07/qc01-06).
9. **Áp dụng = "nói trong 60 giây"** không có tiêu chí đạt ở phần lớn bài.
10. **Bài cũ L:/P: (48)**: 42 bài trùng hoàn toàn với module B: mới, điểm TB 61; nên giữ làm bài đọc, không làm đơn vị đánh giá.
