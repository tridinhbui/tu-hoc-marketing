# Kế hoạch 700 bài học — Tự Học Marketing Case

Viết ngày 29.09.2026. Hiện có **48 bài** (26 bài daily `L:` + 22 nguyên lý `P:`) và 198 câu hỏi.
Đích: **700 bài**, mỗi bài đủ 7 câu hỏi → khoảng **4.900 câu**. Đây là một dự án nội dung,
không phải dự án code: phần code đã có (engine bài học, XP, ôn lỗi, kỹ năng, hành trình 9 bước).

---

## 1. Nguyên tắc không đổi

1. **Mỗi bài dạy đúng một quyết định marketer phải ra.** Không có bài "giới thiệu về…".
   Tiêu đề là một câu hỏi hoặc một tình huống, không phải tên chương.
2. **Mở bằng tình huống thật ở Việt Nam** (thương hiệu thật được nêu như ví dụ công khai;
   số liệu trong tình huống là minh hoạ và phải tự khớp nhau). Không mở bằng định nghĩa.
3. **Đủ 7 câu, không câu nào đoán được bằng mẹo**: 1 câu đoán trước, 1 câu quyết định giữa bài,
   5 câu quiz. Phương án sai là lỗi có thật. Mọi phương án có lời giải.
4. **Một bài ≤ 7 phút đọc.** Dài hơn thì tách bài.
5. **Không bịa cho đủ số.** Bài chưa đạt kiểm định thì không lên app — 700 là đích, không phải hạn.

## 2. Khuôn một bài (theo flow bài học)

| # | Phần | Nội dung | Độ dài |
|---|------|----------|--------|
| 1 | Tình huống thật | Một thương hiệu/người làm marketing đang kẹt ở đâu, có số | 60–110 chữ |
| 2 | Câu hỏi nghĩ trước | Câu đoán trước (câu #1) — không chấm điểm | 1 câu |
| 3 | Khái niệm | Tên khung/nguyên lý + giải thích bằng lời thường | 80–160 chữ |
| 4 | Ví dụ áp dụng | Chạy khái niệm qua đúng tình huống ở phần 1, có con số | 80–160 chữ |
| 5 | Quyết định | "Nếu là marketer, bạn làm gì tiếp?" (câu #2) — mở nửa sau bài | 1 câu |
| 6 | Phản hồi | Vì sao từng lựa chọn đúng/sai (nằm trong lời giải câu #2) | — |
| 7 | Mang theo một câu | Takeaway nhớ được | ≤ 25 chữ |
| 8 | Áp dụng ngay | Nhiệm vụ nói/viết 60 giây | 1–2 câu |
| + | Lỗi hay gặp | 1–3 lỗi, mỗi lỗi một dòng | — |
| + | Quiz | Câu #3–#7: ít nhất 1 câu tình huống mới, 1 câu số nếu bài có số | 5 câu |

Lược đồ dữ liệu: `assets/js/data/bai/README.md`. Kiểm định tự động: `node tools_validate_bai.mjs`.

## 3. Cấu trúc: 9 bước → 70 module → 700 bài

Mỗi module ~10 bài, có 1 lượt luyện cuối module. Mỗi bước kết thúc bằng mốc đánh giá
(đề vượt chặng đang có). `(có sẵn: …)` là bài hiện có sẽ xếp vào module đó.

### Bước 1 · Quan sát — 70 bài (7 module)
| Mã | Module | Bài |
|---|---|---|
| ob01 | Marketing là gì khi nhìn từ quầy bán hàng | 10 (có sẵn: L:53, L:56, L:61) |
| ob02 | Đọc một kệ hàng, một menu, một trang sàn TMĐT | 10 |
| ob03 | Ngành hàng (category) và luật chơi của nó | 10 |
| ob04 | Đối thủ: ai đang lấy tiền của khách bạn | 10 (L:73) |
| ob05 | Tín hiệu hành vi: khách làm gì, không phải khách nói gì | 10 |
| ob06 | Bối cảnh thị trường Việt Nam: kênh, vùng, mùa vụ, Tết | 10 |
| ob07 | Tư duy bằng dữ kiện: số nào đáng tin | 10 (L:57, L:71, L:74) |

### Bước 2 · Hiểu khách hàng — 100 bài (10 module)
| Mã | Module | Bài |
|---|---|---|
| kh01 | Phân khúc: chia thị trường theo nhu cầu, không theo tuổi | 10 (P:segmentation) |
| kh02 | Chọn tệp: phục vụ ai trước | 10 (P:targeting) |
| kh03 | Jobs-to-be-done: khách "thuê" sản phẩm để làm gì | 10 (P:jobs-to-be-done) |
| kh04 | Insight: sự thật chưa ai nói ra | 10 (P:consumer-insight) |
| kh05 | Phỏng vấn khách hàng không dẫn dắt | 10 (L:58, L:64) |
| kh06 | Hành trình mua: từ lúc nghĩ tới đến lúc mua lại | 10 |
| kh07 | Tâm lý quyết định: mỏ neo, mặc định, sợ mất | 10 (L:54, L:70, L:75) |
| kh08 | Bằng chứng xã hội và khan hiếm dùng đúng cách | 10 (P:social-proof, P:scarcity) |
| kh09 | Khách B2B: nhiều người quyết định, chu kỳ dài | 10 |
| kh10 | Gen Z, phụ huynh, người tỉnh: ba nhóm hay bị hiểu sai | 10 |

### Bước 3 · Đặt giả thuyết — 60 bài (6 module)
| Mã | Module | Bài |
|---|---|---|
| gt01 | Viết vấn đề trước khi viết giải pháp | 10 |
| gt02 | Cây vấn đề: doanh thu giảm thì tách ra sao | 10 |
| gt03 | Giả thuyết kiểm chứng được | 10 |
| gt04 | Ưu tiên: làm gì trước khi tiền và người có hạn | 10 |
| gt05 | Brief một trang | 10 (L:74) |
| gt06 | Mục tiêu marketing gắn với mục tiêu kinh doanh | 10 |

### Bước 4 · Tạo thông điệp — 110 bài (11 module)
| Mã | Module | Bài |
|---|---|---|
| tp01 | Định vị: đứng ở đâu so với lựa chọn thay thế | 10 (P:positioning) |
| tp02 | Cửa vào ngành hàng (category entry points) | 10 (P:category-entry-point) |
| tp03 | Tên, câu slogan và lời hứa thương hiệu | 10 (L:55) |
| tp04 | Tài sản nhận diện riêng | 10 (P:distinctive-assets, L:60, L:69) |
| tp05 | Tài sản thương hiệu và giá trị dài hạn | 10 (P:brand-equity, L:78) |
| tp06 | Được nhớ tới: salience, mental availability | 10 (P:awareness, P:salience, P:mental-availability) |
| tp07 | Viết quảng cáo: dữ kiện thay tính từ | 10 |
| tp08 | Ý tưởng sáng tạo và big idea | 10 (L:68) |
| tp09 | Kể chuyện thương hiệu không sến | 10 |
| tp10 | Thông điệp theo từng bước phễu | 10 |
| tp11 | Giá là một thông điệp | 10 (P:pricing, L:63) |

### Bước 5 · Chọn kênh — 100 bài (10 module)
| Mã | Module | Bài |
|---|---|---|
| kn01 | Owned, earned, paid: bạn có bao nhiêu media | 10 |
| kn02 | Phân phối và độ phủ điểm bán | 10 (L:77, P:physical-availability) |
| kn03 | Sàn TMĐT: Shopee, Lazada, TikTok Shop | 10 |
| kn04 | Social và content theo nền tảng | 10 (L:62, L:67) |
| kn05 | KOL, KOC, affiliate | 10 (L:76) |
| kn06 | Quảng cáo trả tiền: Meta, Google, TikTok | 10 (L:65) |
| kn07 | Ngân sách media và share of voice | 10 (P:share-of-voice, L:72) |
| kn08 | CRM, Zalo OA, email: kênh của khách cũ | 10 |
| kn09 | PR và truyền thông khủng hoảng | 10 |
| kn10 | Kế hoạch truyền thông tích hợp (IMC) | 10 |

### Bước 6 · Thử nghiệm — 60 bài (6 module)
| Mã | Module | Bài |
|---|---|---|
| tn01 | Thử nhỏ trước khi chi lớn | 10 |
| tn02 | A/B test: thiết kế, cỡ mẫu, đọc kết quả | 10 |
| tn03 | Thử sáng tạo: creative testing | 10 |
| tn04 | Thử giá và khuyến mãi | 10 |
| tn05 | Ra mắt sản phẩm là bài toán thứ tự | 10 (L:66) |
| tn06 | Thử kênh mới không đốt tiền | 10 |

### Bước 7 · Đo lường — 90 bài (9 module)
| Mã | Module | Bài |
|---|---|---|
| dl01 | Phễu và tỉ lệ chuyển đổi | 10 (P:funnel, P:conversion) |
| dl02 | CAC, LTV và kinh tế đơn vị | 10 (P:cac, P:ltv) |
| dl03 | ROAS, lãi gộp, lợi nhuận sau quảng cáo | 10 |
| dl04 | Giữ chân, cohort và cái xô thủng | 10 (L:59, P:retention) |
| dl05 | Đo thương hiệu: nhận biết, cân nhắc, sức khoẻ | 10 |
| dl06 | Attribution: kênh nào được công | 10 |
| dl07 | GA4 và dashboard đọc được | 10 |
| dl08 | Chỉ số phù phiếm và chỉ số ra quyết định | 10 |
| dl09 | Trình bày số cho sếp | 10 |

### Bước 8 · Tối ưu — 60 bài (6 module)
| Mã | Module | Bài |
|---|---|---|
| tu01 | Tối ưu chuyển đổi trang đích | 10 |
| tu02 | Tối ưu ngân sách quảng cáo | 10 |
| tu03 | Giảm giá là một khoản vay | 10 (L:63) |
| tu04 | Giới thiệu và truyền miệng | 10 (P:referral) |
| tu05 | Tăng mua lặp lại và giá trị đơn | 10 |
| tu06 | Khi nào dừng một chiến dịch | 10 |

### Bước 9 · Rút insight — 50 bài (5 module)
| Mã | Module | Bài |
|---|---|---|
| in01 | Đọc lại chiến dịch: post-mortem | 10 |
| in02 | Case thương hiệu Việt (Highlands, Vinamilk, Biti's…) | 10 |
| in03 | Case quốc tế đáng học | 10 |
| in04 | Viết đề xuất: What / Why / How | 10 |
| in05 | Phỏng vấn và case round | 10 |

**Tổng: 70 module · 700 bài** (48 bài hiện có nằm trong 700).

## 4. Luật viết câu hỏi (kiểm tự động được)

- 4 phương án, đúng 1 đáp án; mọi phương án có `why`.
- Cấm "tất cả đều đúng", "không đáp án nào", "cả A và B".
- Độ dài phương án đúng không được dài hơn trung bình các phương án sai quá 60% (chống đoán theo độ dài).
- Câu số (`calc`) phải có `steps` và tính lại được từ số trong đề; có ít nhất một đáp án sai định danh lỗi (`wrong: [[giá_trị, 'MÃ_LỖI']]`).
- Mỗi câu có `teaches` hoặc gắn về bài; câu #2 phải là câu **quyết định** ("bạn làm gì tiếp").
- Không trùng thân câu giữa các bài.

## 5. Quy trình sản xuất một module

1. **Dàn ý module** (10 tiêu đề + 1 quyết định chính của mỗi bài) → duyệt.
2. **Viết nháp** 10 bài theo khuôn, kèm 70 câu. Claude viết nháp; mỗi module một file
   `assets/js/data/bai/<mã>.js`.
3. **Kiểm định tự động** `node tools_validate_bai.mjs <mã>` — phải 0 lỗi.
4. **Người duyệt** đọc tình huống, số liệu, giọng văn; sửa hoặc loại bài.
5. **Lên app**: thêm module vào `bai-index.js`, tăng phiên bản, deploy.
6. **Sau 2 tuần có người học**: xem câu nào tỉ lệ đúng > 95% (quá dễ) hoặc < 20% (đề lỗi) → sửa.

## 6. Lịch và thứ tự

Nhịp thực tế: **1 module / buổi làm** (nháp + tự kiểm) và duyệt vào buổi sau.
Ở nhịp 3 module/tuần: 70 module ≈ **6 tháng**. Thứ tự ưu tiên theo giá trị cho người học mới:

| Đợt | Module | Lý do |
|---|---|---|
| 1 (tuần 1–2) | ob01–ob07 | Bước 1 phải đầy đủ vì ai cũng đi qua |
| 2 (tuần 3–6) | kh01–kh10 | Kỹ năng bị hỏi nhiều nhất khi phỏng vấn |
| 3 (tuần 7–10) | tp01–tp11 | Brand/thông điệp: nhóm người học lớn nhất |
| 4 (tuần 11–14) | dl01–dl09, kn06–kn07 | Performance/growth: nhiều số, dễ chấm |
| 5 (tuần 15–19) | kn01–kn05, kn08–kn10, gt01–gt06 | |
| 6 (tuần 20–24) | tn01–tn06, tu01–tu06, in01–in05 | |

Mỗi đợt xong thì viết lại đề vượt chặng của bước đó cho khớp bài mới.

## 7. Kỹ thuật để 700 bài không làm app nặng

- Mỗi module một file (~40–60 KB). Trang bài học chỉ tải file của module đang học.
- `bai-index.js` là mục lục nhẹ (mã, tiêu đề, module, kỹ năng, thời lượng) — tải ở mọi trang
  để hành trình, kỹ năng, "hôm nay" biết bài có tồn tại mà không cần nội dung.
- Câu hỏi của bài mới nằm ngay trong bài, được đăng ký vào ngân hàng câu khi file module tải xong,
  nên quiz, ôn lỗi, kỹ năng dùng lại được, không phải viết engine mới.
- Bài cũ (`L:`, `P:`) giữ nguyên mã để không mất tiến độ người học.

## 8. Rủi ro

| Rủi ro | Cách giữ |
|---|---|
| Chất lượng tụt khi làm nhanh | Kiểm định tự động + người duyệt; không đạt thì không lên |
| Số liệu minh hoạ bị hiểu là số thật | Ghi rõ "minh hoạ" ở tình huống; số thật phải có nguồn |
| Nói sai về thương hiệu thật | Chỉ nêu sự kiện công khai; nhận xét là của bài, không gán cho thương hiệu |
| Trùng ý giữa các bài | Mỗi bài một quyết định; kiểm trùng tiêu đề và thân câu |
| File quá nặng | Tách theo module, tải theo bài |
