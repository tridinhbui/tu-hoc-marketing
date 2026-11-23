# Audit nội dung bài học: góc nhìn CMO/Growth + Learning Experience Design

*22/11/2026. Đây là lần chấm độc lập, tách khỏi thang RUBRIC-100. Không sửa file nội dung nào.*

## Phạm vi và giả định

Phần "dữ liệu đầu vào" trong prompt còn để trống, nên bản audit dùng các giả định sau:

- **Phân mảng:** toàn bộ lộ trình (nền tảng → khách hàng → định vị → kênh → đo lường → quảng cáo → case).
- **Người học:** người mới chuyển ngành, chủ shop tự kinh doanh và junior marketer.
- **Đầu ra mong muốn:** tự lập được kế hoạch, đọc số và quyết định chi thêm, giữ hay cắt dựa trên **lãi**, không dựa trên chỉ số nền tảng báo.

Mẫu chấm gồm 12 module, khoảng 106 bài. Mỗi bài được đọc trọn, kể cả 7 câu hỏi, lời giải và bài thực hành. Các phép tính được tính lại.

| Mảng | Module |
|---|---|
| Nền tảng | ob01 |
| Khách hàng | kh04 |
| Định vị, mục tiêu | tp01, gt06 |
| Kênh, quảng cáo | kn06, qc02, qc04, tu02 |
| Đo lường | dl02, dl03, dl08 |
| Case | in02 |

Ngoài mẫu trên, có thêm số liệu cấu trúc quét bằng máy trên cả 789 bài B.

### Số liệu toàn app (789 bài B, quét bằng máy)

| Chỉ số | Giá trị | Ý nghĩa |
|---|---:|---|
| Bài có bài thực hành ra sản phẩm (`BAI_TASKS`) | **37 (4,7%)** | 95% số bài kết thúc mà người học không làm ra thứ gì |
| Phần "Áp dụng" là dạng *"Nói trong 60 giây…"* | **408 (52%)** | Người học chỉ nói miệng, không lưu lại, không ai chấm |
| Bài có mục "Làm từng bước" (`how`) | **16 (2%)** | Gần như không bài nào chỉ quy trình thao tác |
| "Áp dụng" hoặc "Mang theo" có nhắc mẫu, checklist, bảng kiểm | 29 (3,7%) | Gần như không có template dùng lại được |
| Bài có nguồn (`src`) | 153 (19%) | Case về thương hiệu thật phần lớn không có nguồn |
| Câu hỏi | 5.523 (960 câu tính, 4.563 trắc nghiệm) | Rất nhiều câu kiểm tra, rất ít sản phẩm đầu ra |
| Bài đạt chuẩn v2 (có `goals`) | 12 | Mới thí điểm |

Kết luận cấu trúc: app này **là một ngân hàng câu hỏi tốt nhưng chưa phải một xưởng thực hành**. Tỉ lệ trắc nghiệm so với bài thực hành là khoảng 150 : 1.

---

## 1. Bảng điểm tổng quan

| Tiêu chí | Điểm (/10) | Nhận xét cốt lõi |
|---|:---:|---|
| 1. Độ chuẩn xác chiến lược & tư duy dữ liệu | **6,5** | Công thức gần như luôn đúng, nhưng mô hình chi phí sai ở chỗ then chốt: phí sàn bị coi là cố định, chấm lãi mà quên trừ tiền quảng cáo, đo hiệu quả biên bằng cách so tuần trước với tuần sau. Các module còn dạy ngược nhau. |
| 2. Tính cập nhật & chống lý thuyết suông | **6,5** | Bài về Meta, ROAS, COD sát thực tế 2026 và ít sáo rỗng. Mảng case chỉ được 3/10: logo thương hiệu thật gắn với số giả định, thất bại thật bị giấu, sai cả dữ kiện. |
| 3. Sư phạm & tính thực thi | **5** | 95% số bài không có sản phẩm đầu ra, 52% kết thúc bằng "nói 60 giây". Bài thực hành hiếm hoi thì đòi công cụ chưa dạy. Không có template media plan, checklist audit tài khoản hay bảng kinh tế đơn vị. |
| 4. Ngôn ngữ & trải nghiệm đọc | **6** | Bài chiến lược viết sạch. Bài quảng cáo và đo lường dày đặc MER, holdout, incrementality, event_id, Learning limited mà không có bảng thuật ngữ thống nhất. Bài đầu tiên của app quá nặng. |

Điểm theo module (trung bình 4 tiêu chí): tp01 **7,5** · dl02 **7,3** · gt06 **7,0** · qc04 **7,0** · qc02 **6,8** · dl03 **6,8** · dl08 **6,3** · kn06 **6,3** · ob01 **6,0** · tu02 **6,0** · kh04 **6,0** · in02 **5,0**.

---

## 2. Lỗi nghiêm trọng (bắt buộc sửa)

Mọi trích dẫn dưới đây đã được đối chiếu nguyên văn với bản dump nội dung.

### A. Sai khái niệm, sai đáp án: người học sẽ học thuộc cái sai

**A1. B:qc02-02, câu 6: sai khái niệm phễu.**
- Trích nguyên văn: *"CVR và CTR là hai thừa số độc lập; một cái đổi không kéo cái kia."*
- Vì sao sai: creative giật tò mò làm CTR tăng nhưng CVR giảm. Chính B:qc04-07 viết *"creative hút người tò mò có thể làm CTR tăng mà CVR giảm"*, tức app tự mâu thuẫn.
- Sửa: hai thừa số này phụ thuộc nhau, nên phải đọc cả chuỗi CPM → CTR → CVR → lãi.

**A2. B:dl02-04, câu 5, lời giải phương án d: sai toán tỉ lệ.**
- Trích nguyên văn: *"cùng tỉ lệ 3 thì lời trên mỗi khách tương đương"*
- Vì sao sai: cùng tỉ lệ không có nghĩa cùng số tiền lời. Với LTV/CAC = 3, CAC 100k cho lời 200k mỗi khách, còn CAC 500k cho lời 1 triệu.

**A3. B:dl03-08: dạy sai mô hình chi phí.**
- Trích nguyên văn: *"Giảm giá lấy tiền trực tiếp từ lãi gộp, vì giá vốn và phí không giảm theo."*
- Vì sao sai: phí sàn và phí thanh toán tính theo % giá bán, nên giảm cùng giá. B:dl02-06 làm đúng điều này. B:dl08-05 lặp lại lỗi của dl03-08.
- Hệ quả: kết luận "vẫn lỗ" tình cờ vẫn đúng, nhưng ROAS hoà vốn bị tính lệch (≈3,5 chứ không phải 4), và người học mang theo một mô hình sai.

**A4. B:dl08-08: chính bài dạy "chỉ số ra quyết định" lại chấm lãi mà quên trừ tiền quảng cáo.**
- Trích nguyên văn: *"Nếu lãi mỗi đơn là 150.000đ, shop mất 3 triệu đồng lãi."*
- Vì sao sai: lượt vào trang giảm từ 10.000 xuống 4.000 thì chi quảng cáo gần như chắc chắn cũng giảm. Thước đo đúng là **lãi sau quảng cáo**, và theo thước đó nhóm hẹp rất có thể lãi hơn. Xem phần viết lại ở mục 4.

**A5. B:ob01-07: sai về chi phí tăng thêm ngay trong module đầu tiên.**
- Trích nguyên văn: *"mỗi khách mới qua thẻ tốn khoảng 35.000đ (giảm 20.000đ + một lần gội cho người giới thiệu…)"*
- Vì sao sai: với khách vốn sẽ không tự đến, khoản giảm 20.000đ là doanh thu không có, không phải chi phí. Ghế đang trống, nên chi phí thật chỉ khoảng 15.000đ và tiệm đã lãi ngay lần đầu. Khoản giảm giá chỉ là tiền mất với những người *đằng nào cũng đến*.
- Đây là bài học về "đơn tăng thêm", và nó đang bị dạy ngược ngay từ module 1.

**A6. B:gt06-02, câu 5: sai sự thật.**
- Trích nguyên văn: *"SMART không yêu cầu tên người phụ trách"*
- Vì sao sai: bản gốc của Doran (1981) có A = **Assignable**, tức chỉ rõ ai làm. "Achievable" là biến thể ra đời sau.

**A7. B:dl08-06, câu 5: quy nhân quả quá tay, ngay trong bài dạy không được quy nhân quả.**
- Đáp án được đánh dấu đúng: *"Nội dung và ưu đãi của A thuyết phục người mua tốt hơn B"*
- Vì sao sai: hai email khác nhau ở cả tiêu đề lẫn thời điểm gửi, và không chia đôi tệp. Đáp án đúng phải là: A mang về nhiều doanh thu hơn trên mỗi email, nguyên nhân chưa xác định, cần chạy A/B.

**A8. B:in02-02: sai dữ kiện về thương hiệu thật.**
- Trích nguyên văn: *"hai MV đầu 2017, “Lạc trôi” rồi “Đi để trở về” của Soobin Hoàng Sơn"*
- Vì sao sai: "Lạc trôi" là MV của Sơn Tùng M-TP, có đặt sản phẩm Biti's Hunter. Bài quy việc Biti's "trẻ lại" cho "sự thật văn hoá" mà không tách riêng hiệu ứng ngôi sao và dòng sản phẩm mới.

### B. Tư duy lỗi thời, giấu thất bại, mẹo không còn làm được

**B1. B:in02-05 (Phúc Long): tình huống viết ở thì hiện tại như thể mô hình đang chạy.**
- Trích nguyên văn: *"thương hiệu xuất hiện dưới dạng quầy nhỏ trong chuỗi cửa hàng bán lẻ"*
- Thực tế (theo VnExpress và World Coffee Portal, cần đối chiếu số trước khi xuất bản): mô hình kiosk trong WinMart+ đã bị thu hẹp rồi dừng năm 2022–2023, và lợi nhuận cải thiện sau khi đóng.
- Đây là case thất bại tốt nhất trong cả module, nhưng đang bị biến thành câu hỏi "giữ món nào trong menu".

**B2. B:tu02-03: mẹo giá thầu lỗi thời.**
- Trích nguyên văn: *"Cách đổi là hạ giá thầu thay vì tắt hẳn, rồi so lại."*
- Vì sao lỗi thời: với Smart Bidding của Google, điều chỉnh giá thầu theo lịch không còn tác dụng (trừ mức −100%). Meta không có điều chỉnh giá thầu theo giờ. Phần lớn tài khoản hiện nay không làm được lời khuyên này.

**B3. B:kn06-07: dùng sai "nguồn sự thật" cho thị trường Việt Nam.**
- Trích nguyên văn: *"Sổ bán hàng là nguồn sự thật về số đơn"*
- Vì sao sai: ở Việt Nam, đơn đặt khác đơn giao thành công vì COD. Nguồn sự thật phải là **đơn giao thành công, đã trừ hoàn**. Cả module kn06 không nhắc COD lần nào.

**B4. B:kn06-05: ví dụ không thể xảy ra, tự mâu thuẫn với chính bài.**
- Trích nguyên văn: *"bám đuổi (retargeting) cho khoảng 2.000 người đã xem sản phẩm trong 7 ngày. Báo cáo: chi 6 triệu, 50 đơn"*
- Vì sao sai: 6 triệu cho khoảng 2.000 người, kể cả với CPM 100.000đ, nghĩa là mỗi người thấy quảng cáo khoảng 30 lần một tuần. Chính bài này nói quá 5–7 lần là lãng phí.

### C. Mâu thuẫn giữa các bài, người học không biết tin bài nào

**C1. Đo hiệu quả biên.**
- qc02-08 dạy phải có nhóm đối chứng.
- tu02-02 lại đo bằng so tuần trước với tuần sau: *"Tuần trước Quân thử rút mỗi nhóm 1 triệu: "Mẹ bỉm" còn 52 đơn"*.
- Mức chênh 60→52 nằm trong khoảng nhiễu ±21 đơn, nên "8 đơn biên" chỉ là nhiễu.
- Bản thân qc02-08 cũng kết luận "đã rõ" khi chưa báo khoảng sai số. Con số "6 triệu/tuần" ở đó cũng không nói rõ là chi riêng cho vùng thử hay cho toàn quốc.

**C2. Định nghĩa insight.**
- kh04-01 định nghĩa insight là điều *"chưa từng nói thành lời"*, và câu 5 bảo điều khách đã nói ra thì đối thủ đã dùng rồi.
- kh04-09 lại đòi câu insight *"truy ngược được về ít nhất ba lời kể thật"*.
- Cách phân định đúng: khách **nói ra dữ kiện**, còn marketer **diễn giải ra động cơ**.

**C3. Bằng chứng cho insight.**
- kh04-04, câu 7 viết: *"Phép thử đã cho kết quả rõ; bỏ insight là bỏ phần đã chắc."*
- kh04-03 lại nói phép thử chỉ là *"tín hiệu để kiểm tra, không phải bằng chứng tuyệt đối"*.
- Không bài nào trong kh04 nối insight với hành vi mua.

**C4. Tăng trưởng đến từ đâu.**
- gt06-01 khẳng định mời khách cũ quay lại là *"đòn bẩy rẻ nhất"*.
- tp01-05 lại dẫn Byron Sharp: *"tăng trưởng đến từ nhiều người mua thưa"*.
- Hai quan điểm đối lập được dạy như hai chân lý, không có bài nào đặt chúng cạnh nhau để tranh luận.

**C5. Quy tắc dừng chi tiêu, ba bài ba quy tắc.**
- dl02-04: LTV/CAC trung bình ≥ 3.
- dl02-07: dừng khi CAC biên bằng LTV.
- dl03-10: dừng khi ROAS biên bằng mức hoà vốn.
- Không bài nào ghép ba quy tắc này thành một.

**C6. Tối ưu theo doanh thu, không theo lãi.**
- tp01-05 lấy doanh thu làm "giá trị": *"2,4 tỷ trên 4 tỷ, tức 60% doanh thu"*. Phép tính lãi gộp bị đẩy xuống mục Đào sâu là mục tuỳ chọn. Người học chỉ đọc phần thân sẽ mang theo kết luận theo doanh thu.
- gt06-06 âm thầm hạ mục tiêu biên lãi của chủ từ "lên 45%" xuống "không dưới 38%", và nhìn % thay vì tổng lãi tính bằng đồng.
- gt06-09 tính trần chi phí mỗi đơn từ ngân sách (*"80 triệu ÷ 1.600 = 50.000 đồng"*), không tính từ lãi mỗi đơn.

### D. Cần người có chuyên môn kiểm chứng trước khi giữ lại

- B:qc04-04 viện dẫn *"Nghị định 330/2026 có mức phạt 30–50 triệu đồng"*: cần đối chiếu số hiệu, điều khoản và mức phạt với văn bản gốc.
- B:kn06-08 dùng mốc "50 sự kiện/7 ngày" cho learning phase: cần kiểm xem quy định này còn đúng năm 2026 không.
- B:in02-06 viết *"bài chưa gắn nguồn, người học nên tự kiểm"*: bài đẩy việc kiểm chứng cho người học, trong khi đáp án câu 6 dựa trên chính dữ kiện chưa có nguồn này.
- B:in02-08 viết *"các quầy bánh của Kido"*: thương hiệu bánh trung thu "Kinh Đô" đã thuộc Mondelez từ 2014. Cách viết này dễ làm người học nhầm hai công ty.

### E. Lỗi biên tập (sửa nhanh)

- B:tp01-08, câu 4: câu hỏi về khách sạn nhưng còn sót câu *"Bếp không dời được, cách âm tốn kém"* từ ví dụ quán phở.
- B:tp01-09: phần khái niệm đếm câu đúng cả nhóm khách **và** điểm khác biệt, nhưng câu 3 lại đếm **hoặc**, khiến con số 23% bị thổi phồng.
- B:in02-07: một phương án nhắc "bảo hiểm nhân thọ" trong khi câu hỏi không có phương án nào liên quan.
- B:dl02-03, phần bài thực hành: đề cho *"300 đơn"* nhưng rubric chấm *"300 khách mới"*, tức đánh đồng đơn với người. Đây đúng là lỗi mà dl02-02 vừa dạy phải tránh.

---

## 3. Điểm rơi bỏ cuộc

### Điểm rơi 1: phiên học đầu tiên không có "thắng lợi nhỏ" (B:ob01-01 → B:ob01-02)

- **ob01-01:** lời rào phương pháp luận xuất hiện trước cả khoảnh khắc "à ra thế". Trích: *"Nhưng đếm lặp chưa loại được vị trí hay thâm niên quán; phải đổi biển ở quán B rồi đếm lại mới biết."*
  - Sau đó, phần Áp dụng bắt người học **rời app**: *"Đứng xem 15 phút, đếm người vào mỗi quán"*.
  - Kết quả là phiên đầu không có hành động nào hoàn thành được ngay trong app.
- **ob01-02:** bảy con số dồn vào ngay đoạn mở. Trích: *"Giá vốn mỗi ly… khoảng 9.000đ; tiền thuê, điện, lương khoảng 1,85 triệu một ngày. Để hoà vốn, chị cần bán khoảng 71 ly"*.
  - Tiếp theo là "lãi đóng góp", "biên bình quân" không được định nghĩa, một tham chiếu tới ob08-03 chưa học, rồi hai câu tính nhiều bước.
  - Bài dài khoảng 2.000 âm tiết nhưng ghi "7 phút".
- **Hệ quả:** đây đúng là vị trí có tỉ lệ rời app cao nhất của mọi app học. Người học chưa thấy mình *làm được* gì đã bị đẩy vào kế toán.

### Điểm rơi 2: "nói trong 60 giây" về "một thương hiệu bạn biết" (408 bài, 52%)

Ví dụ:
- B:dl02-04: *"Tính LTV/CAC cho một sản phẩm bạn biết. Nói trong 60 giây…"*
- B:in02-05: *"Chọn một thương hiệu đồ uống bạn thích. Trong 60 giây, nói…"*

Vì sao đây là điểm rơi:
- Người học không có số của "sản phẩm bạn biết", nên không làm được.
- Kể cả nói xong thì cũng không có gì được lưu, chấm hay dùng lại ở bài sau.
- Cảm giác tích luỹ bằng 0. Đây chính là chỗ người học thấy "đọc thì hay, áp vào shop mình thì không biết làm".
- Các module cũng không nối tiếp nhau. Câu insight viết ở kh04-09 không chảy sang câu định vị ở tp01-01. Câu định vị không chảy sang cây mục tiêu ở gt06. Người học viết xong rồi bỏ đó.

### Điểm rơi 3: được giao việc nhưng không có công cụ (ngõ cụt công cụ)

**B:dl02-04, bài thực hành:** rubric 7 dòng đòi *"Tính CAC biên… (khoảng 141.667đ)"* và *"Chỉ rõ hoàn vốn ở đơn nào"*. Nhưng thời gian hoàn vốn đến dl02-05 mới dạy, còn CAC biên đến dl02-07. Không có bảng tính mẫu.

**B:dl03-06:** ba phương pháp nhét trong một câu. Trích: *"hỏi khách "bạn biết shop từ đâu" ở bước thanh toán, gắn mã UTM cho từng link, hoặc tắt thử một kênh ở vài khu vực"*.
- UTM không được giải thích.
- Người bán trên Shopee không thể thêm câu hỏi vào bước thanh toán.
- Thử tắt theo vùng thì không nói cỡ mẫu hay thời gian.

**B:kn06-05:** *"chừa 10–20% tệp, tách theo tỉnh, hay bật/tắt theo tuần"*.
- Không chỉ cách tách tệp trên Meta.
- "Bật/tắt theo tuần" lại chính là cách mà qc02-08 gọi là sai.

**B:qc04-06:** *"Conversions API Gateway là cách không cần lập trình"*.
- Shop Việt Nam chủ yếu dùng Haravan, Sapo, WooCommerce. Bài không chỉ đường tích hợp sẵn của các nền tảng này.
- Bài cũng không nói Gateway cần thuê hạ tầng đám mây.

**B:kh04-03:** *"Đọc nguyên văn hai câu cho khoảng 20 người"*. Không có kịch bản tiếp cận, không có phiếu ghi kết quả, và phần Áp dụng lại hạ xuống 5 người.

---

## 4. Mẫu viết lại (Before → After)

### 4.1. B:dl08-08: chỉ số ra quyết định phải là lãi sau quảng cáo

**Before**
> Tháng trước: 10.000 × 1% = 100 đơn. Tháng này: 4.000 × 2% = 80 đơn. Tỉ lệ tăng gấp đôi nhưng đơn giảm 20%. Nếu lãi mỗi đơn là 150.000đ, shop mất 3 triệu đồng lãi. Shop giữ nhóm đối tượng hẹp (người đã xem sản phẩm) nhưng mở thêm một nhóm rộng riêng, và đặt mục tiêu bằng tổng lãi mỗi tháng.

**After** *(số minh hoạ)*
> Tỉ lệ chuyển đổi gấp đôi không nói gì. Số đơn giảm cũng chưa nói hết. Hãy đặt ba tháng lên một dòng: **đơn giao thành công × lãi mỗi đơn − tiền quảng cáo**.
>
> | | Lượt vào | Chi quảng cáo | Đơn giao thành công | Lãi trước QC (150k/đơn) | **Lãi sau QC** |
> |---|---:|---:|---:|---:|---:|
> | Tháng trước (nhắm rộng) | 10.000 | 18 tr | 100 | 15 tr | **−3 tr** |
> | Tháng này (nhắm hẹp) | 4.000 | 10 tr | 80 | 12 tr | **+2 tr** |
>
> Đơn giảm 20% nhưng shop lãi hơn 5 triệu. Báo cáo "hiệu quả gấp đôi" đúng hướng nhưng sai lý do.
>
> **Việc tiếp theo:** giữ nhóm hẹp, mở một nhóm rộng riêng với trần chi phí mỗi đơn 150.000đ, tức bằng lãi mỗi đơn. Sau 30 đơn, nhóm nào vượt trần thì cắt.
>
> **Tự làm (5 phút):** điền bảng trên bằng số tháng trước của shop bạn. Nếu chưa có shop, dùng file mẫu. Đạt khi cột cuối có số, và bạn viết được một câu "giữ, tăng hay cắt, vì sao".

### 4.2. B:ob01-01: bước đầu tiên phải làm được ngay trong app, trên sản phẩm của chính người học

**Before**
> ÁP DỤNG: Chọn hai quán cùng loại gần nhà. Đứng xem 15 phút, đếm người vào mỗi quán và ghi lại một lý do mà quán đông hơn đang cho khách thấy.

**After**
> **Làm ngay (3 phút, trong app):** nghĩ về sản phẩm của bạn. Nếu chưa có, chọn quán bạn hay ghé. Điền vào câu:
> *"Người đi ngang có 3 giây. Họ thấy ngay ______, nên họ dừng lại."*
>
> ✅ **Đạt** khi chỗ trống là thứ mắt thấy được hoặc đếm được, ví dụ "bảng *phở bò 45k – ra món 3 phút*" hay "hàng 6 người đang chờ".
> ❌ **Chưa đạt** khi chỗ trống là "chất lượng", "uy tín", "tận tâm".
>
> Câu của bạn được lưu vào **Hồ sơ shop**. Bài 2 sẽ dùng nó để tính bạn cần bao nhiêu người dừng lại mỗi ngày mới hoà vốn.
>
> **Làm thêm trong tuần (tuỳ chọn):** đứng 15 phút trước hai quán cùng loại, đếm người vào, chụp biển hiệu quán đông hơn và dán vào Hồ sơ shop.

### 4.3. B:in02-05 (Phúc Long): từ câu hỏi chọn món thành case thất bại có phân tích cơ chế

**Before**
> Phúc Long nổi tiếng với trà… bài này giả định lõi thương hiệu là vị trà đậm (giả định để phân tích, không phải số liệu công bố). Ngoài cửa hàng riêng, thương hiệu xuất hiện dưới dạng quầy nhỏ trong chuỗi cửa hàng bán lẻ… Giả sử một quầy nhỏ có menu 15 món thay vì 40 món…

**After** *(các mốc dưới đây phải đối chiếu nguồn trước khi xuất bản, gắn `src`)*
> **Chuyện gì đã xảy ra.** Sau khi về với Masan, Phúc Long mở rất nhanh các kiosk nhỏ đặt trong WinMart+ (từ 2021). Đến 2022–2023, chuỗi đóng phần lớn số kiosk này và dừng mô hình. Lợi nhuận của Phúc Long cải thiện *sau khi* đóng. [Nguồn: VnExpress, World Coffee Portal; ghi ngày truy cập]
>
> **Ba giả thuyết, phân biệt bằng bằng chứng nào:**
> 1. *Lõi thương hiệu bị pha loãng:* kiosk thiếu chỗ ngồi và trải nghiệm. Nếu đúng, doanh thu *cửa hàng lớn* cùng khu vực sẽ giảm khi kiosk mở gần đó.
> 2. *Kinh tế điểm bán không đủ:* lượng khách siêu thị ít mua đồ uống mang đi, trong khi mỗi điểm vẫn phải trả lương và khấu hao. Nếu đúng, doanh thu mỗi kiosk thấp ngay từ đầu, bất kể menu.
> 3. *Ăn khách của nhau:* kiosk lấy khách của cửa hàng gần đó chứ không mang thêm khách mới. Nếu đúng, tổng doanh thu khu vực gần như không đổi khi kiosk mở hay đóng.
>
> **Bài học chuyển giao được:** mở rộng kênh phải qua được hai bài kiểm: *khách có nhận ra đúng thứ họ chọn bạn không*, và *một điểm bán có tự nuôi được chính nó không*. Nhiều thương hiệu chỉ kiểm bài thứ nhất.
>
> **Tự làm (10 phút):** bạn định mở thêm một kênh, ví dụ sàn, đại lý hay quầy ký gửi. Điền bảng gồm doanh thu dự kiến một điểm/tháng, chi phí cố định một điểm và lãi mỗi đơn. Tính xem cần bao nhiêu đơn/ngày mới hoà vốn. Đạt khi có con số và một câu nói bạn sẽ đo bằng chứng nào trong 30 ngày đầu.

---

## 5. Đề xuất khung chuẩn hoá nội dung

Áp dụng cho cả đội nội dung lẫn prompt AI sinh bài. Mỗi quy tắc đều kiểm được bằng validator (`tools_validate_bai.mjs`) hoặc bằng người duyệt.

### Quy tắc 1: Mỗi bài phải để lại một sản phẩm, và sản phẩm đó được bài sau dùng tiếp

- Bỏ dạng "Nói trong 60 giây" làm phần Áp dụng chính. Thay bằng một ô điền có cấu trúc, như bảng, câu mẫu hay checklist, gắn **Đạt khi / Chưa đạt khi** đo được.
- Kết quả được lưu vào **Hồ sơ shop** của người học. Ít nhất một bài trong module sau phải mở lại kết quả đó.
- Ví dụ chuỗi: câu insight (kh04) → câu định vị (tp01) → cây mục tiêu (gt06) → media plan (qc01) → bảng lãi sau quảng cáo (dl03).
- Validator: phần `apply` không được chứa "Nói trong", phải có trường `pass` và `carry` (dùng ở bài nào).
- Mục tiêu: từ 4,7% lên ≥ 60% số bài có sản phẩm đầu ra trong 1 quý.

### Quy tắc 2: Mọi quyết định đều chấm bằng lãi tính bằng đồng, theo một chuỗi chi phí chuẩn của Việt Nam

- Mọi ví dụ có số dùng chung một mẫu "kinh tế đơn vị": **giá bán − giảm giá − phí sàn % − phí thanh toán % − giá vốn − vận chuyển − tỉ lệ hoàn/COD thất bại × chi phí hoàn = lãi đóng góp → trừ quảng cáo = lãi sau quảng cáo.**
- Phí tính theo % thì phải giảm theo giá.
- "Nguồn sự thật" luôn là **đơn giao thành công**.
- Tách hai trần chi phí, không gộp:
  - **Trần lãi** = lãi đóng góp mỗi đơn − lãi tối thiểu muốn giữ. Vượt trần lãi thì cắt.
  - **Chi phí kế hoạch** = ngân sách ÷ số đơn mục tiêu. Vượt chi phí kế hoạch thì sửa.
- Thống nhất thuật ngữ: chỉ dùng "lãi đóng góp" cho phần trước quảng cáo và "lãi sau quảng cáo" cho phần sau. Bỏ "lãi gộp" khi thật ra đang nói về biên đóng góp.

### Quy tắc 3: Không kết luận nhân quả nếu không có nhóm đối chứng, và luôn báo nhiễu

- So tuần trước với tuần sau, hoặc so hai email khác tiêu đề, chỉ được gọi là **tín hiệu**, không bao giờ là **kết quả**.
- Mọi so sánh số đơn phải kèm biên nhiễu nhanh ±2√(a+b). Ví dụ 60 với 52 đơn có biên ±21, nên chưa kết luận được.
- Mọi bài có thử nghiệm phải nêu cỡ mẫu tối thiểu và thời gian chạy.
- Đáp án câu hỏi không được khẳng định "đã rõ" khi khoảng sai số còn chứa 0.

### Quy tắc 4: Case thương hiệu thật phải có nguồn, có mốc thời gian, có kết cục, có ít nhất một giả thuyết đối lập

- Bài dùng tên thương hiệu thật thì bắt buộc có `src` gồm URL, ngày truy cập và trạng thái đã kiểm.
- **Cấm** gắn số giả định vào tên thương hiệu thật. Muốn dùng số minh hoạ thì đổi sang thương hiệu hư cấu.
- Khung case cố định gồm 6 mục:
  1. Bối cảnh và mốc thời gian.
  2. Họ đã làm gì.
  3. Kết quả, có số, có nguồn.
  4. Những gì khác cũng thay đổi cùng lúc (yếu tố gây nhiễu).
  5. Hai giả thuyết đối lập, và bằng chứng nào phân biệt được chúng.
  6. Bài học chuyển giao, kèm một bài tự làm trên sản phẩm của người học.
- Tối thiểu 30% số case trong mỗi module là **thất bại hoặc thoái lui**.
- Mỗi quý rà lại mục "kết cục" của mọi case.

### Quy tắc 5: Bài đầu tiên của mỗi module phải tạo được thắng lợi nhỏ trong 3 phút; thuật ngữ đi qua một bảng chung

- **Thứ tự trình bày cố định:**
  1. Tình huống, tối đa 3 con số.
  2. Khoảnh khắc "à ra thế".
  3. Ô làm ngay, dưới 3 phút, trong app.
  4. Khái niệm.
  5. Lời rào đón và phương pháp luận, đặt ở mục **Đào sâu**, không chen vào ví dụ.
- Nhãn thời gian đọc tính bằng máy: số âm tiết ÷ 200, cộng 1,5 phút cho mỗi câu tính. Không ghi tay.
- **Thuật ngữ tiếng Anh:**
  - Lần đầu xuất hiện trong mỗi bài phải có giải nghĩa bình dân, dạng *"tỉ lệ bấm (CTR)"*.
  - Chỉ dùng từ đã có trong `thuat-ngu.html`.
  - Validator chặn từ viết tắt chưa khai báo, ví dụ MER, holdout, UTM, event_id.
- **Phương án nhiễu trong câu hỏi:** phải là một **sai lầm thật mà người làm nghề hay mắc**. Cấm phương án vô lý kiểu "luật cấm…", "nhà nước hỗ trợ…", "Meta khoá tài khoản…".

---

## Ưu tiên sửa (gợi ý)

1. **Tuần này: sửa lỗi sai khái niệm và sai đáp án.**
   - Các lỗi A1–A8, B1, B3, B4.
   - Lỗi biên tập ở mục E.
   - Đưa mục D vào `HUMAN-REVIEW-QUEUE.md`.
2. **2 tuần: hoà giải các mâu thuẫn ở mục C.**
   - Mỗi cặp mâu thuẫn được giải quyết bằng một câu phân định trong *cả hai* bài.
   - Thêm một bài tổng hợp "ba quy tắc dừng chi tiêu" ở cuối dl03.
3. **1 quý: triển khai Quy tắc 1 và Hồ sơ shop.**
   - Đây là thay đổi tác động lớn nhất lên khả năng giữ chân người học và đầu ra thực tế.
   - Bắt đầu với chuỗi ob01 → kh04 → tp01 → gt06 → qc01 → dl03.
4. **Viết lại mảng case (in02, in03)** theo Quy tắc 4, mỗi tháng 5 case.

---

## Nhật ký sửa nhóm A và B (22/11/2026)

`BAI_V` 31 → 32. Validator: 0 lỗi; 18 cảnh báo, đúng bằng danh sách trước khi sửa. Test: gốc 192/192, API 49/49. `bank.json` đã dựng lại (5.721 câu). Đã commit ở 7d7718f.

| Mã | Bài | Đã sửa |
|---|---|---|
| A1 | qc02-02 Q6 | Lời giải phương án b: CTR và CVR liên quan nhau, phải mở báo cáo xem chứ không suy ra được. |
| A2 | dl02-04 Q5 | Lời giải phương án d: cùng tỉ lệ 3 nhưng số tiền lời khác nhau, kèm ví dụ số. |
| A3 | dl03-08 | Tình huống đổi sang bán qua web riêng (chi phí mỗi đơn là giá vốn, đóng gói, ship, đều cố định nên mọi phép tính giữ nguyên). Khái niệm nói rõ phí sàn và phí thanh toán tính theo % thì giảm theo giá. Thêm một lỗi hay gặp. |
| A3' | dl08-05 | Tách phí sàn 10% khỏi ship 20.000đ. Lãi sau giảm 50.000đ (trước ghi 40.000đ), cần bán gấp 2,8 lần (trước ghi 3,5 lần). Quảng cáo đổi thành 90 triệu để vẫn lỗ 20 triệu. Thêm lưu ý mốc so sánh theo mùa. Câu tính đổi đáp án thành 50 và dùng mã lỗi mới `PHI_PHAN_TRAM_COI_CO_DINH` (đã thêm vào `drills.js`). |
| A4 | dl08-08 | Ví dụ thêm tiền quảng cáo: tháng trước lỗ 3 triệu, tháng này lãi 2 triệu, tức lãi hơn 5 triệu. "Mang theo" đổi sang chấm bằng lãi sau quảng cáo. Câu tính đổi đáp án từ 3 thành 5, mã lỗi `QUEN_TRU_CHI_PHI_QC`. |
| A5 | ob01-07 | Khoản giảm 20.000đ là phần thu ít đi, không phải tiền chi ra, nên lần đầu tiệm đã dư khoảng 45.000đ. Thêm câu hỏi "không có thẻ, anh có ghé không" (phần Đào sâu). |
| A6 | gt06-02 Q5 | Lời giải phương án c: SMART gốc của Doran (1981) có A = Assignable, tức có ghi người phụ trách. |
| A7 | dl08-06 Q5 | Đáp án đúng đổi thành "A đem về nhiều tiền hơn trên mỗi thư; muốn biết vì sao phải thử A/B". |
| A8 | in02-02 | Nguồn ghi đúng "Lạc trôi" là MV của Sơn Tùng M-TP. Thêm phần Đào sâu về ba đòn bẩy chạy cùng lúc và cách tách chúng. |
| B1 | in02-05 | Viết lại thành case kiosk thất bại, có nguồn (VnExpress, World Coffee Portal). Gồm khung hai bài kiểm, ba giả thuyết đối lập, phản ví dụ, và phần Áp dụng có đầu ra. Sửa Q1 (phương án d) và Q6 cho khớp. |
| B2 | tu02-03 | Bỏ lời khuyên "hạ giá thầu theo giờ". Thay bằng: Smart Bidding chỉ tôn trọng việc tắt hẳn một khung; Meta không chỉnh giá thầu theo giờ; shop nhỏ chỉ nên tắt khung không phục vụ được và chấm bằng tổng đơn cả ngày. |
| B3 | kn06-07 | Nguồn sự thật là đơn giao thành công (đã trừ huỷ, COD không nhận, đơn hoàn). Phần Đào sâu có ví dụ COD: CPA 222.000đ, cách đối soát ba cột. Thêm một lỗi hay gặp. |
| B4 | kn06-05 | Tệp bám đuổi đổi từ 2.000 lên 20.000 người, tỉ lệ mua 0,28% và 0,2%. CPA tăng thêm vẫn khoảng 429.000đ, các câu tính giữ đáp án. Thêm phép kiểm tần suất (khoảng 5 lần/tuần). |

**Còn chờ người duyệt:** mục D (Nghị định 330/2026, mốc 50 sự kiện, nguồn in02-06, Kido/Kinh Đô). Nguồn của in02-05 đang ở trạng thái `tim` (mới thấy qua kết quả tìm kiếm); cần đọc bài gốc rồi chuyển sang `doc`.

## Nhật ký sửa nhóm C, D, E (22/11/2026)

`BAI_V` 32 → 33. Validator: 0 lỗi, 18 cảnh báo (không đổi). Test: gốc 192/192, API 49/49. `bank.json` đã dựng lại (5.721 câu). Chưa commit.

**Nhóm E (biên tập)**

| Mã | Bài | Đã sửa |
|---|---|---|
| E1 | tp01-08 Q4 | "Bếp không dời được" thành "Khách sạn không dời được, cách âm cả toà thì quá tốn kém". |
| E2 | tp01-09 | Khái niệm, ví dụ, câu 3 và quy tắc mã hoá ở Đào sâu cùng đếm **cả hai vế** (cho ai và khác gì). Chỉ nói một vế thì ghi riêng. Con số 46/200 = 23% giữ nguyên, nay khớp định nghĩa. |
| E3 | in02-07 Q6 | Lời giải phương án b bỏ câu "bảo hiểm nhân thọ" lạc đề, nói thẳng vì sao bảo hiểm xe máy không hợp. |
| E4 | dl02-03 (bài thực hành, `tasks-b.js`) | Đề ghi "300 đơn của 300 khách mua lần đầu (lọc theo số điện thoại, mỗi người một đơn)", khớp rubric "chia cho 300 khách mới". |

**Nhóm D (chuyển cho người duyệt)**

- Đã thêm vào `HUMAN-REVIEW-QUEUE.md`: qc04-04 (Nghị định 330/2026), kn06-08 (mốc 50 sự kiện/7 ngày), in02-05 (nguồn kiosk Phúc Long).
- in02-06: đã có nguồn. Thêm `src` là bản cáo bạch HKEX của Mixue, `st:'tim'`. Bỏ câu "bài chưa gắn nguồn", ghi số cụ thể: khoảng 97% doanh thu đến từ bán hàng hoá và thiết bị cho cửa hàng, phí nhượng quyền khoảng 2%. Vẫn cần người đọc bản gốc.
- in02-08: ghi rõ là KIDO’s Bakery (Kido quay lại ngành bánh trung thu từ 2022), khác với bánh Kinh Đô nay thuộc Mondelez. Thêm `src` Báo Đầu tư, `st:'tim'`.

**Nhóm C (hoà giải mâu thuẫn: mỗi cặp có câu phân định ở cả hai bài)**

| Mã | Bài | Đã sửa |
|---|---|---|
| C1 | tu02-02 | Thêm phản ví dụ: so tuần trước với tuần sau chỉ là giả thuyết. Ước nhiễu khoảng ±20 đơn, nên 60→52 nằm trong nhiễu. Dời một nấc vẫn hợp lý vì là cược nhỏ, rút lại được; muốn chắc thì làm nhóm đối chứng như qc02-08. Thêm lỗi hay gặp và `rel` sang qc02-08. |
| C1 | qc02-08 | Ví dụ nói rõ 6 triệu/tuần chi ở vùng thử, Meta báo 40 đơn ở vùng đó. Đào sâu mở đầu bằng khoảng sai số: 20 ± 15 đơn/tuần, đầu tốt nhất CPA tăng thêm ≈ 170.000đ, tức ngang hoà vốn. Kết luận "không dồn thêm" vẫn đứng, còn 300.000đ chỉ là ước lượng giữa. Q2 lời giải d bỏ chữ "đã rõ". |
| C2 | kh04-01 | Khái niệm phân vai: khách **kể ra** dữ kiện, marketer **ghép** thành động cơ. Q5 phương án a nói nhẹ lại ("dễ nghe được"), lời giải trỏ sang kh04-09. |
| C2 | kh04-09 | Phần kiểm chứng thêm: lời kể là dữ kiện, câu insight là động cơ ghép lại, không chép nguyên một lời kể. |
| C3 | kh04-04 Q7 | Lời giải a: "đúng quá" là tín hiệu, không phải bằng chứng (trỏ kh04-03), nhưng 70% là tín hiệu mạnh. Nên nghi bước gần chỗ hỏng nhất trước. |
| C3 | kh04-03 | Thêm Đào sâu nối insight với hành vi: hai tiêu đề hoặc trang đích chạy cùng ngân sách, so tỉ lệ mua hoặc để lại số; trong phỏng vấn thì hỏi về lần gần nhất khách thật sự làm vậy. Thêm một lỗi hay gặp. |
| C4 | gt06-01 | Câu hỏi "đòn bẩy rẻ nhất" giới hạn lại thành "ngắn hạn, mỗi đơn". Đào sâu đặt cạnh quan điểm Sharp: tăng trưởng qua nhiều quý cần dòng khách mới. |
| C4 | tp01-05 | Đào sâu thêm câu phân định với gt06-01: định vị sắc để kéo người mua mới, nhưng không cắt kênh với khách cũ. |
| C5 | dl03-10 | Thêm Đào sâu "ba quy tắc, một câu hỏi". (1) Quy tắc biên quyết định có chi thêm không: CAC biên < LTV tương đương ROAS biên > hoà vốn; khi khách mua lại thì dùng bản theo khách. (2) LTV/CAC trung bình 3 là kiểm sức khoẻ. (3) Hoàn vốn là giới hạn tiền mặt. Dừng ở điểm sớm nhất. Đây là phương án thay cho việc viết một bài tổng hợp mới. |
| C5 | dl02-04, dl02-07 | Mỗi bài thêm một câu: mốc 3 không phải quy tắc dừng, nên dừng sớm hơn điểm CAC biên = LTV một chút. Cả hai trỏ sang dl03-10. |
| C6 | tp01-05 | Phần thân ví dụ nói rõ phép tính một phần ba là theo doanh thu, quyết định phải chấm bằng lãi gộp (Đào sâu ra 50%). Q3 thêm bước nhắc điều này; đáp án 33,3 giữ nguyên. |
| C6 | gt06-06 | Khái niệm: mức sàn 38% phải do chủ duyệt vì nó hoãn mục tiêu 45%. Đào sâu thêm con số bằng đồng: lãi gộp 1.248.000 so với 1.000.000 đồng, tức biên giảm còn 38,4% nhưng lãi tăng 25%. |
| C6 | gt06-09 | Khái niệm: trần chi phí mỗi đơn có hai nguồn (ngân sách và lãi gộp mỗi đơn), lấy mức thấp hơn. Ví dụ gọi 50.000đ là trần ngân sách, có giả định lãi gộp để thấy đó là trần dùng được. |

**Còn mở:** chưa viết bài tổng hợp riêng cho ba quy tắc dừng (đã gộp vào Đào sâu dl03-10). Các nguồn `st:'tim'` (in02-05, in02-06, in02-08) cần người đọc bản gốc. Quy tắc 1 (bài nào cũng có đầu ra, Hồ sơ shop) chưa bắt đầu.

