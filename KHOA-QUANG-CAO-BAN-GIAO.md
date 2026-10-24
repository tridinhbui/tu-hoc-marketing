# Bàn giao — Khoá "Chạy quảng cáo đa nền tảng"

Ngày: 2026-10-24 · Nhánh: `content/khoa-quang-cao` · Audit trước khi làm: `KHOA-QUANG-CAO-AUDIT.md`

## 1. Đã làm gì

- **Chặng chuyên đề s7** (`curriculum.js`, `elective:true`): luôn mở, không có đề thi chặng; không đổi số bài, pool đề thi hay cổng mở khoá của s1–s6 (có test hồi quy giữ số).
- **11 module · 77 bài · 539 câu** (`assets/js/data/bai/qc01.js` … `qc11.js`), cùng lược đồ bài hiện có (7 câu/bài, validator 0 lỗi 0 cảnh báo).
  - 129 câu tính có bước giải; 76 bài có nhãn "Số liệu giả định".
  - 16 bài "Làm từng bước"; 20 bài có sơ đồ minh hoạ.
  - 128 trích dẫn nguồn kèm ngày kiểm: 60 đã đọc trang, 67 cần mở lại để đối chiếu, 1 chưa xác minh.
- **Trường bài mới** (chỉ hiện khi bài có; bài cũ không đổi):
  - `how` (từng bước) — không dùng tên `steps` vì `tools_strip_answers.mjs` gỡ khoá đó khỏi bản deploy.
  - `fig` (sơ đồ trong `assets/js/ads/figures.js`), `assume`, `src`, `rel` (học sâu hơn), `cover` (chuẩn 6 phần).
- **Trang khoá** `quang-cao.html`: bản đồ module + tiến độ, chuẩn 6 phần, case, capstone, thực hành 0 đồng, bài ôn nền, nguồn, lịch cập nhật. Dữ liệu ở `assets/js/data/ads-course.js`.
- **3 case xuyên suốt** `quang-cao-case.html?id=` (Bếp Nhà Lá · Nội thất An Cư · KhoViệt).
  - 7 bước: brief → chọn kênh → chia ngân sách → brief creative → đọc dashboard → chẩn đoán → quyết định.
  - Mỗi lựa chọn có lời giải và bài học lại.
  - Dữ liệu `assets/js/data/ads-cases.js`, chấm thuần `assets/js/ads/case-eval.js`, giao diện `assets/js/ads/case-ui.js`.
- **Capstone media plan** `quang-cao-capstone.html` + `assets/js/ads/plan-eval.js`.
  - Tự soát: tổng tiền, CPA trần, đủ kết quả/tuần để học, quy tắc dừng, cách đo, thử nghiệm, phần tăng thêm, rủi ro chính sách.
  - Xuất file `.txt`.
- **Điều hướng**:
  - Mục "Khoá Quảng cáo" ở thanh bên (`app.html`); đăng ký nốt 4 trang Lab còn thiếu.
  - Lộ trình tuỳ chọn `ads` (`PATHS`, `PATH_MODS`).
  - Nhãn "Chuyên đề" thay "Chặng 7" ở `bai.html`, `hoc.html`, `hoc-bai.html`, `luyen.html`.
  - Bản đồ 6 chặng ở `bat-dau.html` và `hoc.html` bỏ qua chặng chuyên đề.
- **Thuật ngữ**: thêm 11 mục (giai đoạn học, Advantage+, kiểu khớp, Smart Bidding, điểm chất lượng, Demand Gen, PMax, Spark Ads, GMV Max, Zalo OA, ZNS).

### Sửa nội dung cũ
- `glossary.js` · dữ liệu cá nhân: bỏ "theo Nghị định 13/2023" → Luật 91/2025/QH15 + Nghị định 356/2025.
- `bai/tu01.js`: tương tự.
- `tools_bai_index.mjs`: thêm từ khoá tìm kiếm luật 2025–2026 cho kn12.
- Chạy lại `tools_bai_index.mjs` đồng bộ 13 dòng mục lục cũ có tên khái niệm lệch với nội dung (chỉ mục lục, không đổi bài). `BAI_V` 25 → 28.
- `?v=` cho `curriculum.js` (5), `bai-index.js` (21), `app.js` (22) trên mọi trang.
- `api/src/generated/bank.json` dựng lại. Pool s1–s6 không đổi; s7 = 539 câu.

## 2. Danh sách bài đã tạo

**qc01 · Từ mục tiêu kinh doanh tới kế hoạch quảng cáo**

- qc01-01 Sếp nói "chạy quảng cáo cho có đơn" — câu hỏi đầu tiên của bạn là gì?
- qc01-02 Chân dung "nữ 25–40" có giúp bạn chọn kênh và viết quảng cáo không?
- qc01-03 Cùng một chiếc chảo, vì sao offer này CPA 90.000đ còn offer kia 150.000đ?
- qc01-04 Chỉ chạy quảng cáo cho người đã ghé web: vì sao tháng thứ ba hết đơn?
- qc01-05 Ba doanh nghiệp, ba ngân sách: mỗi bên nên bắt đầu ở kênh nào?
- qc01-06 9 triệu một tuần nuôi nổi mấy nhóm quảng cáo?
- qc01-07 Trước khi bấm đăng quảng cáo, bạn đã viết sẵn khi nào dừng, khi nào tăng tiền chưa?

**qc02 · Đọc số quảng cáo: từ lượt hiển thị tới lợi nhuận**

- qc02-01 Chiến dịch "vượt KPI" với 380.000 người tiếp cận — thành công ở tầng nào?
- qc02-02 CPA tăng 50% trong một tuần: tầng nào đã đổi?
- qc02-03 Đơn 400.000đ trên web và trên Shopee: mỗi bên được chi tối đa bao nhiêu cho một đơn?
- qc02-04 Meta báo ROAS 3,2 — Bếp Gọn đang lãi hay lỗ?
- qc02-05 Ba kênh tự khen, doanh thu tổng không nhúc nhích: nhìn MER thế nào?
- qc02-06 Lỗ 40.000đ ở đơn đầu: khi nào được chịu, khi nào là tự lừa mình?
- qc02-07 Meta 300 đơn, Google 220, TikTok 90 — sổ bán hàng chỉ có 420: tin ai?
- qc02-08 Tắt quảng cáo thì mất bao nhiêu đơn — và chỉ số nào nói được điều đó?

**qc03 · Creative, trang đích, đo lường, thử nghiệm và báo cáo**

- qc03-01 Viết brief creative một trang thế nào để designer làm đúng ngay lần đầu?
- qc03-02 Sau cú bấm, đưa khách về website, form, Zalo OA hay Messenger?
- qc03-03 Gắn pixel rồi, có cần gửi sự kiện từ máy chủ nữa không?
- qc03-04 Đặt tên chiến dịch và UTM thế nào để cuối tuần đối soát trong 15 phút?
- qc03-05 Trước khi bấm Đăng ở Việt Nam năm 2026: kiểm những gì để không vi phạm luật?
- qc03-06 Muốn biết trang đích mới có tốt hơn không: cần bao nhiêu click, chạy bao lâu?
- qc03-07 Sếp muốn sửa creative ngày thứ 2 của chiến dịch: sửa hay chờ?
- qc03-08 Báo cáo tuần một trang: xếp số theo thứ tự nào để sếp quyết được trong 5 phút?

**qc04 · Meta Ads (Facebook & Instagram) từ tài khoản tới tối ưu**

- qc04-01 Shop của bạn có nên chạy Meta Ads lúc này không?
- qc04-02 Mở tài khoản quảng cáo Meta: chọn gì lúc đầu để sau khỏi phải làm lại?
- qc04-03 Dựng chiến dịch Sales đầu tiên trên Meta: đi qua từng ô thế nào?
- qc04-04 Nhắm đối tượng trên Meta 2025–2026: còn tự khoanh tệp được tới đâu?
- qc04-05 Vị trí, ngân sách, giá thầu trên Meta: để máy chọn hay tự cầm lái?
- qc04-06 Creative, đích đến và Pixel trên Meta: khách bấm xong đi đâu, đếm thế nào?
- qc04-07 Ví dụ xuyên suốt: 30 triệu/tháng cho shop đồ bếp — chia tiền, dự báo, đọc tuần đầu
- qc04-08 Quảng cáo Meta đang tệ đi: đọc số nào trước, sửa gì trước?

**qc05 · Google Search Ads từ tài khoản tới tối ưu**

- qc05-01 Sản phẩm mới chưa ai gõ tìm: chạy Google Search có phí tiền không?
- qc05-02 Mở tài khoản Google Ads cho công ty: ai đứng tên, trả bằng gì, hoá đơn ra sao?
- qc05-03 Dựng chiến dịch Search đầu tiên: làm theo thứ tự nào để không đốt tiền tuần đầu?
- qc05-04 Từ khoá rộng, cụm từ hay chính xác — và khi Google tự nới rộng thì giữ tiền thế nào?
- qc05-05 Điểm chất lượng 4/10: sửa quảng cáo, sửa trang đích, hay mặc kệ con số?
- qc05-06 Khi nào chuyển từ Maximize conversions sang Target CPA, và đặt mục tiêu bao nhiêu?
- qc05-07 Diệt mối ở Hà Nội với 15 triệu/tháng: từ brief tới quyết định sau 2 tuần
- qc05-08 Quảng cáo không hiện, click không ra cuộc gọi, CPA tăng sau khi bật khớp rộng: kiểm theo thứ tự nào?

**qc06 · YouTube, Demand Gen, Display và Performance Max**

- qc06-01 Có 30 triệu cho Google: mở Search, Demand Gen, Video hay Performance Max trước?
- qc06-02 Video YouTube 2 triệu lượt hiển thị mà ít đơn: chiến dịch hỏng hay đo sai thước?
- qc06-03 Dựng Demand Gen từng bước: ngân sách bao nhiêu thì máy mới đủ dữ liệu để học?
- qc06-04 Performance Max báo ROAS đẹp: làm sao biết nó tạo đơn mới hay chỉ nhận công?
- qc06-05 Đưa 300 sản phẩm lên tab Mua sắm: Merchant Center và feed cần đúng những gì?
- qc06-06 Shop đồ bếp thêm 40 triệu cho PMax và Demand Gen: chia, dự báo, đọc kết quả thế nào?
- qc06-07 PMax báo ROAS 8, video nhiều view, Demand Gen tuần đầu đắt: chẩn đoán từng ca thế nào?

**qc07 · TikTok Ads và quảng cáo TikTok Shop**

- qc07-01 TikTok Ads có hợp với việc kinh doanh của bạn không?
- qc07-02 Mở tài khoản TikTok Ads ở Việt Nam: Business Center, thanh toán, VAT, xác minh
- qc07-03 Dựng chiến dịch TikTok đầu tiên: Sales hay Lead generation, Smart+ hay thủ công?
- qc07-04 Creative trên TikTok: làm video kiểu gì, và khi nào dùng Spark Ads?
- qc07-05 Đo và học trên TikTok: Pixel, Events API và giai đoạn học
- qc07-06 Quảng cáo TikTok Shop: GMV Max báo ROAS 8, có thật là gấp đôi Meta?
- qc07-07 Ví dụ xuyên suốt: shop đồ bếp thêm TikTok — xem nhiều, đơn ít, sửa ở đâu?

**qc08 · Zalo Ads cho doanh nghiệp địa phương và lead**

- qc08-01 Doanh nghiệp của bạn có nên chạy Zalo Ads, hay chưa nên bật?
- qc08-02 OA xác thực hay Hồ sơ quảng cáo: chuẩn bị gì trước khi nạp tiền Zalo Ads?
- qc08-03 Chọn hình thức nào trên Zalo Ads, và dựng chiến dịch Form từng bước ra sao?
- qc08-04 Sau cú bấm quảng cáo Zalo, điều gì quyết định chi phí mỗi khách thật?
- qc08-05 Công ty nội thất có 20 triệu/tháng cho Zalo: chia tiền, dự báo và quyết định thế nào?
- qc08-06 Lead Zalo rẻ mà không ra khách: bệnh nằm ở tầng nào?

**qc09 · Quảng cáo trên sàn: Shopee và Lazada**

- qc09-01 Gian hàng của bạn đã sẵn sàng trả tiền quảng cáo trong sàn chưa?
- qc09-02 Shopee bán chỗ hiển thị ở đâu, và Lazada khác gì?
- qc09-03 Dựng quảng cáo Tìm kiếm sản phẩm trên Shopee từng bước, và khi nào giao cho Tối Đa Doanh Thu?
- qc09-04 ROAS trên sàn báo 8, vì sao cuối tháng vẫn không có lãi?
- qc09-05 Ngoài tăng giá thầu, bạn còn đòn bẩy nào để đơn quảng cáo trên sàn rẻ hơn?
- qc09-06 Shop đồ gia dụng nhà bếp có 25 triệu/tháng trên Shopee: chia tiền theo sản phẩm thế nào?
- qc09-07 Nhiều click không đơn, ROAS tụt ngày sale, Lazada chạy ngang: đọc bệnh từ số nào?

**qc10 · LinkedIn cho B2B và các kênh nên cân nhắc kỹ**

- qc10-01 Lead LinkedIn giá 1,5 triệu: đắt hay rẻ với công ty B2B của bạn?
- qc10-02 Dựng chiến dịch Lead generation đầu tiên trên LinkedIn Campaign Manager thế nào?
- qc10-03 Lead LinkedIn đã đi tới đâu: đo MQL, SQL, cơ hội, hợp đồng thế nào?
- qc10-04 Lead LinkedIn nhiều mà sales chê, tháng đầu "lỗ": sửa hay dừng?
- qc10-05 Pinterest, Snapchat, X, Amazon Ads: khi nào không đáng thử?

**qc11 · Vận hành đa kênh: chia tiền, chẩn đoán, mở rộng, báo cáo**

- qc11-01 Có 60 triệu mỗi tháng cho Meta, TikTok, Google: chia thế nào?
- qc11-02 Ba nền tảng cộng lại 900 đơn, sổ bán hàng 600: đọc dashboard chéo kênh thế nào?
- qc11-03 CPA tăng 40% trong một tuần: tìm nguyên nhân theo thứ tự nào?
- qc11-04 Chiến dịch đang lãi: tăng tiền bao nhiêu mỗi lần và khi nào phải dừng?
- qc11-05 Vì sao quảng cáo đang chạy bỗng dừng, và lịch tuần nào phòng được?
- qc11-06 Tháng này kết quả xấu: báo cáo cho sếp hoặc khách hàng thế nào?

## 3. Nguồn chính thức theo nền tảng
Bảng đầy đủ kèm trạng thái: `KHOA-QUANG-CAO-AUDIT.md` mục 6 và mục "Nguồn chính thức" trên `quang-cao.html` (dữ liệu `ADS_COURSE.sources`). Mỗi bài nền tảng có `src` riêng hiện ở cuối bài.

## 4. Cần cập nhật định kỳ
| Bao lâu | Rà gì | Module |
|---|---|---|
| 3 tháng | Tên mục tiêu, loại chiến dịch, chiến lược giá thầu (Meta Advantage+, Google Demand Gen/AI Max/nhãn Target CPA-ROAS, TikTok Smart+/GMV Max) | qc04–qc07 |
| 3 tháng | Tên dịch vụ và chỉ số Shopee/Lazada | qc09 |
| 6 tháng | Thanh toán, VAT, hoá đơn (Google 8% hết hạn 31/12/2026) | qc04, qc05, qc07, qc08 |
| 6 tháng | Zalo: hình thức, mức tối thiểu, gói OA, ZBS/ZNS | qc08 |
| Khi có văn bản mới | Luật Quảng cáo, NĐ 342/2025, Luật/NĐ dữ liệu cá nhân, quy định TPBVSK | qc03 |
| 12 tháng | LinkedIn tiền tệ/ngân sách tối thiểu; Pinterest, Snapchat, X, Amazon tại VN | qc10 |

## 5. Kết quả kiểm thử (2026-10-24)
- `node --test tests/*.test.mjs`: **186/186 đạt** (thêm `tests/ads-course.test.mjs` 10 test, `tests/ads-cases.test.mjs` 8 test).
  - Đăng ký và hồi quy s1–s6.
  - Người mới mở được bài qc; hoàn thành bài ghi tiến độ và đọc lại được.
  - Thứ tự điều hướng; chuẩn 6 phần; trường mới hợp lệ; đáp án rải đều.
  - Dữ liệu case tự khớp; đáp án mẫu 100/100, phương án ngây thơ không đạt; chống lộ đáp án; capstone bắt lỗi.
  - Không nới ngưỡng `baselines.json` nào: 113 phương án lộ đáp án qua từ tuyệt đối và 8 câu lộ qua từ mở đầu đã được viết lại.
- `node tools_validate_bai.mjs`: 789 bài · 5523 câu · 0 lỗi · 0 cảnh báo.
- `node tools_lint_exam.mjs`: 0 lỗi.
- `cd api && npm test`: 43/43 đạt. `node tools/build-bank.mjs`: 5721 câu, s7=539.
- `node tools_build.mjs`: dist sạch đáp án; kiểm `dist/…/qc04.js` vẫn giữ `how`, `src`, `fig`.
- Đi thử trên preview ở 1200px và 375px:
  - Đi hết: thanh bên → trang khoá → bài qc01-01 → nộp quiz (lưu "Đạt", nút bài tiếp dẫn qc01-02) → case Bếp Nhà Lá đủ 7 bước (chấm điểm, chỉ bài học lại) → capstone.
  - Không tràn ngang ở 375px trên 6 trang. Không có lỗi JavaScript (chỉ 404 `/api` do server tĩnh).

## 6. Giới hạn, chưa xác minh được
- **Chưa deploy.** Câu hỏi mới chỉ được server chấm và cộng XP sau khi deploy Worker với `bank.json` mới (`cd api && npm run deploy`). Trước đó, người đã đăng nhập làm quiz bài qc sẽ nhận `unknown_question`.
- **Không có ảnh chụp giao diện thật**: không tạo tài khoản quảng cáo. Thay bằng 10 sơ đồ minh hoạ có nhãn; tên mục chỉ lấy từ nguồn đã kiểm, chỗ khác ghi "kiểm trong tài khoản".
- **Chưa xác minh trên trang chính thức**:
  - Meta: VAT tại VN; trang phương thức thanh toán ở VN (không tải được).
  - Meta: dịch vụ nội thất có thuộc danh mục quảng cáo đặc biệt "Nhà ở" không — bài và case đã ghi cảnh báo.
  - Lazada Sponsored Solutions (cần đăng nhập Seller Center).
  - Snapchat, X tự phục vụ tại VN.
  - Toàn văn NĐ 342/2025 (hình thức gắn nhãn QC) và việc NĐ 356/2025 thay NĐ 13/2023.
  - Giá mỗi tin ZNS.
  - VAT Google/TikTok cộng thêm hay đã gồm (bài ghi "giả sử", nhắc đối chiếu hoá đơn).
  - Khuyến nghị 10× CPA của Demand Gen là theo ngày hay tổng (trang không nói; bài ghi rõ).
  - Shopee "Trên Facebook" chỉ suy từ tên gọi.
  - Ngưỡng xác minh doanh nghiệp TikTok tại VN.
- 67 trích dẫn mang trạng thái "cần mở lại": mới thấy qua trích đoạn tìm kiếm trên domain chính thức. Nên mở lại từng trang trước khi quảng bá khoá.
- **Đáp án case xuyên suốt nằm ở trình duyệt**, giống case bấm giờ hiện có. Case và capstone không cộng XP (để khỏi sửa whitelist `xp-refs` của server). Tiến độ lưu ở `flags.ads`, đồng bộ theo tài khoản.
- **Tổng số bài trên dashboard tăng thêm 77** (chặng chuyên đề nằm trong `ALL`). Cổng và đề thi s1–s6 không đổi.
- **Agent viết bài đề xuất thêm sơ đồ, chưa làm**: phễu nhiệt độ, LTV-payback, ROAS phần tăng thêm, ROAS sàn tối thiểu, khung 4 câu hỏi kênh lạ, brief 1 trang, dashboard 2 tầng, đường cong mở rộng.
