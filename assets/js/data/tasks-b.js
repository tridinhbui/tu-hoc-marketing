/* Bài thực hành — phần B. Xem tasks.js. Mọi con số là minh hoạ, tự khớp nhau. */
Object.assign(BAI_TASKS, {

/* kn01-06 · chia tiền và giờ theo nguồn doanh thu */
'B:kn01-06': {
  given: [
    ['Sản phẩm', 'Trà thảo mộc đóng hộp, một hộp dùng hết trong khoảng 1 tháng'],
    ['Doanh thu tháng trước', '50 triệu đồng'],
    ['Phần đến từ khách quay lại', '20% (10 triệu đồng)'],
    ['Khách đã mua trong 6 tháng qua', '1.200 người, trong đó 800 người có Zalo'],
    ['Quảng cáo tìm khách mới tháng trước', '6 triệu đồng → 60 khách mới (100.000đ/khách)'],
    ['Nguồn lực tháng tới', '7 triệu đồng và 25 giờ']
  ],
  output: 'Lập bảng phân bổ 4–5 dòng (hạng mục · owned hay paid · tiền · giờ · chỉ số sẽ đo), tổng đúng 7 triệu đồng và 25 giờ. Thêm một câu chỉ ra nút thắt nằm ở đâu, dựa vào số cho sẵn.',
  rubric: [
    'Tổng tiền đúng 7 triệu và tổng giờ đúng 25.',
    'Có chia giờ, không chỉ chia tiền; phần lớn giờ nằm ở owned.',
    'Câu nút thắt dựa trên số: trà dùng hết mỗi tháng mà chỉ 20% doanh thu từ khách quay lại.',
    'Paid vẫn giữ một khoản để có khách mới, kèm mức CAC sẽ so (khoảng 100.000đ).',
    'Mỗi dòng có một chỉ số đo được cuối tháng, không áp một tỉ lệ "chuẩn" kiểu 70/30.'
  ],
  model: `<table class="t"><thead><tr><th>Hạng mục</th><th>Loại</th><th class="n">Tiền</th><th class="n">Giờ</th><th>Đo bằng</th></tr></thead><tbody>
<tr><td>Nhắn Zalo nhắc mua lại cho 800 khách cũ</td><td>Owned</td><td class="n">0,5 tr</td><td class="n">8</td><td>Đơn từ khách cũ</td></tr>
<tr><td>Thẻ trong hộp: mã mua lại + mã giới thiệu</td><td>Owned</td><td class="n">1,0 tr</td><td class="n">3</td><td>Lượt dùng mã</td></tr>
<tr><td>Quảng cáo tìm khách mới</td><td>Paid</td><td class="n">5,5 tr</td><td class="n">4</td><td>Khách mới, CAC ≤ 100.000đ</td></tr>
<tr><td>Ảnh, bài đăng fanpage</td><td>Owned</td><td class="n">0</td><td class="n">6</td><td>Tin nhắn hỏi hàng</td></tr>
<tr><td>Tổng hợp số, so kết quả cuối tháng</td><td>—</td><td class="n">0</td><td class="n">4</td><td>—</td></tr>
<tr><td><b>Tổng</b></td><td></td><td class="n"><b>7,0 tr</b></td><td class="n"><b>25</b></td><td></td></tr></tbody></table>
<p>Nút thắt: trà dùng hết mỗi tháng mà chỉ 20% doanh thu đến từ khách quay lại, nên khách cũ đang rơi rụng. Giờ dồn cho owned để kéo khách cũ mua lại; tiền quảng cáo giữ gần mức cũ để dòng khách mới không đứt.</p>`
},

/* kn05-05 · KOL hay KOC, so bằng chi phí mỗi đơn */
'B:kn05-05': {
  given: [
    ['Sản phẩm', 'Bàn chải điện trẻ em, giá 400.000đ, lãi gộp 180.000đ/đơn (trước phí KOL)'],
    ['Ngân sách', '60 triệu đồng'],
    ['A · 1 KOL lớn', 'Phí 60 triệu, 1 video, lượt xem điển hình 800.000'],
    ['B · 15 KOC', '4 triệu/người, mỗi video khoảng 25.000 lượt xem'],
    ['Tỉ lệ ra đơn trên lượt xem (đợt trước)', 'KOL 0,03% · KOC 0,1%']
  ],
  output: 'Lập bảng hai phương án gồm: lượt xem, CPM, số đơn, chi phí mỗi đơn, lãi hoặc lỗ sau phí. Tính thêm kịch bản video KOL chỉ đạt một nửa lượt xem, rồi viết một câu chọn phương án.',
  rubric: [
    'Tính cả CPM lẫn chi phí mỗi đơn, không dừng ở CPM.',
    'So chi phí mỗi đơn với lãi gộp 180.000đ, ra được lãi hoặc lỗ của từng phương án.',
    'Có kịch bản KOL hụt (một phát bắn duy nhất) với chi phí mỗi đơn mới.',
    'Nhắc rủi ro của B: KOC có khán giả trùng nhau thì phải lọc trước khi ký.',
    'Câu chọn bám vào số, không vào cảm giác "chắc ăn".'
  ],
  model: `<table class="t"><thead><tr><th></th><th class="n">A · KOL</th><th class="n">B · 15 KOC</th></tr></thead><tbody>
<tr><td>Lượt xem</td><td class="n">800.000</td><td class="n">375.000</td></tr>
<tr><td>CPM</td><td class="n">75.000đ</td><td class="n">160.000đ</td></tr>
<tr><td>Số đơn</td><td class="n">240</td><td class="n">375</td></tr>
<tr><td>Chi phí mỗi đơn</td><td class="n">250.000đ</td><td class="n">160.000đ</td></tr>
<tr><td>Lãi gộp − phí</td><td class="n">−16,8 tr</td><td class="n">+7,5 tr</td></tr>
<tr><td>Nếu KOL chỉ 400.000 lượt xem</td><td class="n">120 đơn · 500.000đ/đơn</td><td class="n">—</td></tr></tbody></table>
<p>A rẻ hơn gấp đôi tính theo CPM nhưng mỗi đơn đắt hơn lãi gộp 70.000đ. Chọn B, lọc bỏ KOC trùng khán giả trước khi ký, sau hai tuần dồn tiền quảng cáo vào các video tốt nhất.</p>`
},

/* kn06-09 · kế hoạch CPM → CPC → CPA */
'B:kn06-09': {
  given: [
    ['Sản phẩm', 'Sổ tay planner, lãi gộp 150.000đ/đơn (trước quảng cáo)'],
    ['Ngân sách tuần', '6 triệu đồng'],
    ['CPM dự kiến', '40.000đ'],
    ['Tỉ lệ bấm (CTR)', '1% · mức thường thấy 1%'],
    ['Tỉ lệ trang tải xong trên lượt bấm', '80% · mức thường thấy 95%'],
    ['Tỉ lệ mua trên lượt xem trang', '2% · mức thường thấy 3%']
  ],
  output: 'Viết kế hoạch thành chuỗi: lượt hiển thị → lượt bấm và CPC → lượt xem trang → số đơn và CPA. So CPA với mức trần, tính số đơn cần để hoà vốn, và nêu bước sửa trước kèm CPA sau khi sửa.',
  rubric: [
    'Tính đúng thứ tự: hiển thị = chi ÷ CPM × 1.000, rồi nhân tiếp từng tỉ lệ.',
    'CPC chia cho lượt bấm, CPA chia cho số đơn — không lẫn hai mẫu số.',
    'So CPA với lãi gộp mỗi đơn (mức trần 150.000đ), không so với "CPA ngành".',
    'Chỉ ra bước lệch so với mức thường thấy (tải trang, mua), không đổi creative khi CTR đang ổn.',
    'Có CPA ước tính sau khi sửa, tính lại bằng số.'
  ],
  model: `<p>6.000.000 ÷ 40.000 × 1.000 = <b>150.000</b> lượt hiển thị → × 1% = <b>1.500</b> lượt bấm, CPC = <b>4.000đ</b> → × 80% = <b>1.200</b> lượt xem trang → × 2% = <b>24 đơn</b>, CPA = <b>250.000đ</b>.</p>
<p>Mức trần là lãi gộp 150.000đ/đơn, nên cần 6.000.000 ÷ 150.000 = <b>40 đơn</b> mới hoà. CTR đúng mức thường thấy; hai bước lệch là tải trang (80% so với 95%) và mua (2% so với 3%).</p>
<p>Sửa tốc độ trang trước, rồi trang bán: 1.500 × 95% × 3% ≈ 42,75 đơn → CPA ≈ <b>140.000đ</b>, dưới trần. Chỉ sửa một bước thì chưa đủ (95% → 28,5 đơn; 3% → 36 đơn).</p>`
},

/* kn07-04 · CPM hiệu dụng */
'B:kn07-04': {
  given: [
    ['Sản phẩm, nhóm mục tiêu', 'Sữa hạt đóng chai, dân văn phòng 25–40 tuổi'],
    ['Banner báo điện tử', 'CPM 20.000đ · 25% lượt thật sự được nhìn thấy · 50% đúng nhóm mục tiêu'],
    ['Video YouTube bỏ qua được', 'CPM 60.000đ · 50% xem tới logo · 70% đúng nhóm'],
    ['Màn hình sảnh toà nhà văn phòng', 'CPM 90.000đ · 70% nhìn thấy · 90% đúng nhóm'],
    ['Ngân sách', '120 triệu đồng'],
    ['Giới hạn chỗ bán tháng này', 'màn hình sảnh tối đa 60 triệu · banner báo tối đa 40 triệu']
  ],
  output: 'Lập bảng 3 kênh với CPM hiệu dụng = CPM ÷ (tỉ lệ thấy × tỉ lệ đúng nhóm), xếp hạng. Chia 120 triệu cho 3 kênh và tính tổng số nghìn lượt thấy đúng nhóm mà kế hoạch mua được.',
  rubric: [
    'Chia CPM cho cả tỉ lệ thấy lẫn tỉ lệ đúng nhóm, không chỉ một trong hai.',
    'Xếp hạng theo CPM hiệu dụng; kênh rẻ nhất trên báo giá không tự động đứng đầu.',
    'Tôn trọng giới hạn chỗ bán: sảnh tối đa 60 triệu, banner tối đa 40 triệu.',
    'Tổng tiền đúng 120 triệu và có số nghìn lượt thấy đúng nhóm cho từng kênh.'
  ],
  model: `<table class="t"><thead><tr><th>Kênh</th><th class="n">CPM hiệu dụng</th><th class="n">Chi</th><th class="n">Nghìn lượt thấy đúng nhóm</th></tr></thead><tbody>
<tr><td>Màn hình sảnh</td><td class="n">90.000 ÷ 0,63 ≈ 142.900đ</td><td class="n">60 tr</td><td class="n">420</td></tr>
<tr><td>Banner báo</td><td class="n">20.000 ÷ 0,125 = 160.000đ</td><td class="n">40 tr</td><td class="n">250</td></tr>
<tr><td>YouTube</td><td class="n">60.000 ÷ 0,35 ≈ 171.400đ</td><td class="n">20 tr</td><td class="n">≈ 117</td></tr>
<tr><td><b>Tổng</b></td><td></td><td class="n"><b>120 tr</b></td><td class="n"><b>≈ 787</b></td></tr></tbody></table>
<p>Banner rẻ gấp 4,5 lần màn hình sảnh trên báo giá nhưng đắt hơn khi tính trên người đúng nhóm thật sự thấy. Đổ tiền theo thứ hạng đến khi hết chỗ bán: sảnh 60 triệu, banner 40 triệu, phần còn lại 20 triệu cho YouTube.</p>`
},

/* kn08-03 · chi phí mỗi đơn theo kênh nhắn tin */
'B:kn08-03': {
  given: [
    ['Thử cùng một tin "đặt lịch làm móng, giảm 20% thứ Ba–thứ Năm"', 'mỗi kênh 1.500 khách'],
    ['SMS thương hiệu', '750đ/tin · gửi được cả 1.500 · 18 lượt đặt'],
    ['Zalo OA (ZNS)', '350đ/tin · chỉ 1.000 khách nhận được · 21 lượt đặt'],
    ['Email', 'Phí công cụ 900.000đ/tháng, gửi bao nhiêu cũng vậy · 6 lượt đặt'],
    ['Lãi gộp mỗi lượt đặt', '80.000đ'],
    ['Tháng tới', '6.000 khách, trong đó 4.000 người nhận được Zalo']
  ],
  output: 'Lập bảng 3 kênh: chi phí gửi, số lượt đặt, chi phí mỗi lượt đặt. Rồi viết kế hoạch gửi cho 6.000 khách tháng tới: kênh nào cho nhóm nào, chi phí dự kiến, số lượt đặt dự kiến và chi phí mỗi lượt đặt.',
  rubric: [
    'Chi phí Zalo tính trên số tin gửi được (1.000), không trên 1.500.',
    'Xếp kênh theo chi phí mỗi lượt đặt, không theo giá mỗi tin.',
    'So chi phí mỗi lượt đặt với lãi gộp 80.000đ trước khi giữ một kênh.',
    'Kế hoạch tháng tới dùng cùng một thông điệp cho mọi kênh và cộng đủ chi phí.',
    'Nhận ra email là phí cố định: không rẻ theo đơn ở quy mô nhỏ.'
  ],
  model: `<table class="t"><thead><tr><th>Kênh</th><th class="n">Chi phí</th><th class="n">Lượt đặt</th><th class="n">Chi phí/lượt đặt</th></tr></thead><tbody>
<tr><td>SMS</td><td class="n">1.125.000đ</td><td class="n">18</td><td class="n">62.500đ</td></tr>
<tr><td>Zalo OA</td><td class="n">350.000đ</td><td class="n">21</td><td class="n">≈ 16.700đ</td></tr>
<tr><td>Email</td><td class="n">900.000đ</td><td class="n">6</td><td class="n">150.000đ</td></tr></tbody></table>
<p>Tháng tới: Zalo cho 4.000 người nhận được → 1.400.000đ, khoảng 84 lượt đặt (2,1%). SMS cho 2.000 người còn lại → 1.500.000đ, khoảng 24 lượt đặt (1,2%), vẫn dưới lãi 80.000đ. Tổng 2,9 triệu, khoảng 108 lượt đặt, ≈ 26.900đ/lượt. Email "rẻ nhất mỗi tin" lại đắt nhất mỗi lượt đặt; chỉ giữ nếu dùng phí cố định đó cho bản tin cả tháng.</p>`
},

/* tn01-05 · ngân sách thử tính ngược */
'B:tn01-05': {
  given: [
    ['Dịch vụ', 'Vệ sinh sofa tại nhà, thử kênh quảng cáo tìm kiếm mới'],
    ['Tỉ lệ đặt lịch trên lượt vào trang', '5%'],
    ['Chi phí mỗi lượt vào', '6.000đ'],
    ['Số lượt đặt tối thiểu để đọc kết quả', '40'],
    ['Kênh mua được tối đa', '120 lượt vào/ngày'],
    ['Chi phí mỗi lượt đặt chấp nhận được', '150.000đ'],
    ['Sếp đang cho', '3 triệu đồng']
  ],
  output: 'Tính ngược 3 bước: lượt đặt cần → lượt vào cần → ngân sách; tính số ngày chạy. Nói 3 triệu thiếu bao nhiêu, rồi viết trước quy tắc dừng/đi tiếp bằng con số.',
  rubric: [
    'Tính ngược đúng: 40 ÷ 5% = 800 lượt vào; × 6.000đ = 4,8 triệu.',
    'Có số ngày chạy dựa trên giới hạn 120 lượt vào/ngày.',
    'Chỉ ra 3 triệu chỉ cho khoảng 25 lượt đặt — quá ít để kết luận.',
    'Quy tắc dừng/đi tiếp viết bằng con số và đặt trước khi chạy.'
  ],
  model: `<p>Cần 40 lượt đặt ÷ 5% = <b>800 lượt vào</b> × 6.000đ = <b>4,8 triệu</b>. Với 120 lượt/ngày: 800 ÷ 120 ≈ 6,7 → chạy <b>7 ngày</b>.</p>
<p>3 triệu chỉ mua 500 lượt vào, khoảng 25 lượt đặt; lệch vài lượt là kết luận đảo chiều. Xin thêm 1,8 triệu.</p>
<p>Quy tắc viết trước: hết 4,8 triệu, nếu có từ <b>32 lượt đặt</b> trở lên (chi phí ≤ 150.000đ/lượt) thì giao ngân sách tháng; dưới 32 thì dừng kênh, không chạy thêm "cho chắc".</p>`
},

/* tn02-04 · thiết kế A/B test: cỡ mẫu và thời gian */
'B:tn02-04': {
  given: [
    ['Trang', 'Đăng ký học thử của một trung tâm tiếng Anh'],
    ['Thay đổi muốn thử', 'Thêm video 30 giây của giáo viên ngay đầu trang'],
    ['Tỉ lệ đăng ký hiện tại', '10%'],
    ['Mức chênh nhỏ nhất đáng làm', 'lên 12% (2 điểm)'],
    ['Lượt xem trang', '800/ngày, chia đôi cho hai bản'],
    ['Công thức ước lượng', 'mỗi nhóm ≈ 16 × p × (1 − p) ÷ d²']
  ],
  output: 'Viết bản thiết kế test 5 dòng: giả thuyết, chỉ số chính, cỡ mẫu mỗi nhóm, số ngày chạy (làm tròn theo tuần), cách đọc kết quả bằng ±2×√(kA+kB). Thêm một câu: nếu muốn thấy chênh 1 điểm thì mất bao lâu.',
  rubric: [
    'Cỡ mẫu tính trước khi chạy: 16 × 0,1 × 0,9 ÷ 0,02² = 3.600 mỗi nhóm.',
    'Số ngày dựa trên tổng hai nhóm và lượt xem/ngày, làm tròn lên đủ tuần.',
    'Có một chỉ số chính duy nhất, đặt trước.',
    'Cách đọc kết quả so chênh lệch với ±2×√(kA+kB), không nhìn phần trăm tăng.',
    'Thấy rằng chênh nhỏ đi một nửa thì mẫu gấp bốn.'
  ],
  model: `<ol>
<li>Giả thuyết: video giáo viên đầu trang đẩy tỉ lệ đăng ký từ 10% lên 12%.</li>
<li>Chỉ số chính: lượt đăng ký học thử ÷ lượt xem trang.</li>
<li>Cỡ mẫu: 16 × 0,1 × 0,9 ÷ 0,0004 = <b>3.600 lượt mỗi nhóm</b>, tổng 7.200.</li>
<li>Thời gian: 7.200 ÷ 800 = 9 ngày → chạy đủ <b>14 ngày</b> (hai tuần trọn), không dừng sớm.</li>
<li>Đọc kết quả: ví dụ 360 so với 432 đăng ký, chênh 72 > 2×√(360+432) ≈ 56 → B thắng thật; chênh dưới khoảng đó là chưa phân biệt được.</li></ol>
<p>Muốn thấy chênh 1 điểm: 14.400 mỗi nhóm, khoảng 36 ngày — nên thử thay đổi táo bạo hơn thay vì chờ.</p>`
},

/* tn04-02 · giảm giá, số bán thêm để hoà lãi */
'B:tn04-02': {
  given: [
    ['Sản phẩm', 'Hộp bông lan trứng muối, giá 120.000đ'],
    ['Giá vốn + hộp', '78.000đ'],
    ['Bán hiện tại', '500 hộp/tháng'],
    ['Đang cân nhắc', 'Giảm 10% hoặc giảm 15% trong một tháng']
  ],
  output: 'Lập bảng cho hai mức giảm: giá mới, lãi mỗi hộp, số hộp cần để giữ tổng lãi cũ, phần trăm bán thêm cần đạt. Thêm một câu: nếu giảm 15% mà bán được 650 hộp thì doanh thu và lãi thay đổi thế nào.',
  rubric: [
    'Tính lãi mỗi hộp trước và sau giảm, không lấy mức giảm giá làm mức giảm lãi.',
    'Số hộp hoà lãi = tổng lãi cũ ÷ lãi mỗi hộp mới.',
    'Phần trăm bán thêm cần đạt lớn hơn hẳn mức giảm giá, có con số.',
    'Câu 650 hộp tách rõ doanh thu tăng nhưng lãi giảm.'
  ],
  model: `<p>Lãi cũ: 120.000 − 78.000 = 42.000đ/hộp × 500 = <b>21 triệu/tháng</b>.</p>
<table class="t"><thead><tr><th></th><th class="n">Giảm 10%</th><th class="n">Giảm 15%</th></tr></thead><tbody>
<tr><td>Giá mới</td><td class="n">108.000đ</td><td class="n">102.000đ</td></tr>
<tr><td>Lãi mỗi hộp</td><td class="n">30.000đ</td><td class="n">24.000đ</td></tr>
<tr><td>Hộp cần để giữ 21 tr</td><td class="n">700</td><td class="n">875</td></tr>
<tr><td>Phải bán thêm</td><td class="n">+40%</td><td class="n">+75%</td></tr></tbody></table>
<p>Giảm 15% mà bán 650 hộp: doanh thu 66,3 triệu (tăng từ 60 triệu) nhưng lãi chỉ 15,6 triệu — mất 5,4 triệu so với không giảm.</p>`
},

/* dl02-03 · CAC khách mới, LTV theo lãi gộp */
'B:dl02-03': {
  given: [
    ['Shop', 'Hạt cho mèo bán online'],
    ['Chi quảng cáo tháng này', '45 triệu đồng'],
    ['Đơn tháng này', '900 đơn, trong đó 300 đơn của khách mua lần đầu'],
    ['Giá trị đơn trung bình', '350.000đ'],
    ['Số lần mua trong vòng đời', '4'],
    ['Biên lãi gộp', '35%'],
    ['Phí ship shop chịu', '20.000đ/đơn']
  ],
  output: 'Tính 5 con số: CAC (đúng mẫu số), LTV theo doanh thu, LTV theo lãi gộp sau ship, tỉ lệ LTV/CAC đúng, và CAC tối đa để LTV/CAC đạt 3. Viết một câu so với tỉ lệ người ta hay tính sai.',
  rubric: [
    'CAC chia cho 300 khách mới, không chia cho 900 đơn.',
    'LTV dùng lãi gộp và trừ phí ship mỗi đơn, không dùng doanh thu.',
    'Có tỉ lệ LTV/CAC đúng và tỉ lệ sai để so.',
    'Có mức CAC tối đa để đạt 3 lần, kèm việc sẽ làm.'
  ],
  model: `<ul>
<li>CAC = 45.000.000 ÷ 300 khách mới = <b>150.000đ</b> (không phải 50.000đ nếu chia 900 đơn).</li>
<li>LTV doanh thu = 350.000 × 4 = 1.400.000đ.</li>
<li>Lãi mỗi đơn = 350.000 × 35% − 20.000 = 102.500đ → LTV lãi gộp = <b>410.000đ</b>.</li>
<li>LTV/CAC = 410.000 ÷ 150.000 ≈ <b>2,7</b>.</li>
<li>CAC tối đa để đạt 3 lần: 410.000 ÷ 3 ≈ <b>137.000đ</b>.</li></ul>
<p>Tính sai (doanh thu ÷ CAC theo đơn) ra 28 lần; tính đúng chỉ 2,7 — dưới mức 3. Chưa tăng ngân sách; trước hết hạ CAC xuống dưới 137.000đ hoặc tăng số lần mua.</p>`
},

/* dl02-05 · đọc bảng cohort để tính hoàn vốn */
'B:dl02-05': {
  given: [
    ['Dịch vụ', 'Giao trái cây văn phòng theo gói tháng, 300.000đ/tháng, lãi gộp 35% = 105.000đ/tháng'],
    ['CAC', '300.000đ'],
    ['Nhóm khách mới tháng 3 (cohort)', '200 khách'],
    ['Còn đăng ký tháng thứ 1', '200 (100%)'],
    ['Tháng thứ 2', '150 (75%)'],
    ['Tháng thứ 3', '126 (63%)'],
    ['Tháng thứ 4', '114 (57%)'],
    ['Tháng thứ 5', '106 (53%)'],
    ['Tháng thứ 6', '100 (50%)'],
    ['Vốn chờ được tối đa', '5 tháng']
  ],
  output: 'Lập bảng 6 tháng: tỉ lệ còn lại, lãi gộp mỗi khách ban đầu trong tháng, lãi gộp cộng dồn. Ghi tháng hoàn vốn CAC, so với cách tính "không ai huỷ", và chỉ ra tháng rơi nhiều nhất.',
  rubric: [
    'Lãi gộp mỗi tháng nhân với tỉ lệ còn lại của cohort, không giả định ai cũng ở lại.',
    'Dùng lãi gộp, không dùng 300.000đ doanh thu (sẽ ra hoàn vốn 1 tháng giả).',
    'Ghi đúng tháng cộng dồn vượt 300.000đ.',
    'Chỉ ra bước rơi lớn nhất (tháng 1 → 2) và việc sẽ làm ở đó.'
  ],
  model: `<table class="t"><thead><tr><th>Tháng</th><th class="n">Còn lại</th><th class="n">Lãi gộp/khách ban đầu</th><th class="n">Cộng dồn</th></tr></thead><tbody>
<tr><td>1</td><td class="n">100%</td><td class="n">105.000</td><td class="n">105.000</td></tr>
<tr><td>2</td><td class="n">75%</td><td class="n">78.750</td><td class="n">183.750</td></tr>
<tr><td>3</td><td class="n">63%</td><td class="n">66.150</td><td class="n">249.900</td></tr>
<tr><td>4</td><td class="n">57%</td><td class="n">59.850</td><td class="n"><b>309.750</b></td></tr>
<tr><td>5</td><td class="n">53%</td><td class="n">55.650</td><td class="n">365.400</td></tr>
<tr><td>6</td><td class="n">50%</td><td class="n">52.500</td><td class="n">417.900</td></tr></tbody></table>
<p>Hoàn vốn ở <b>tháng thứ 4</b>, trong ngưỡng 5 tháng. Tính "không ai huỷ" ra 300.000 ÷ 105.000 ≈ 2,9 tháng — lạc quan hơn một tháng. Rơi nhiều nhất là tháng 1 → 2 (mất 25% khách): tập trung chăm khách ngay sau lần giao đầu.</p>`
},

/* dl03-02 · ROAS hoà vốn có đủ phí */
'B:dl03-02': {
  given: [
    ['Sản phẩm', 'Áo thun bán trên sàn, giá 200.000đ'],
    ['Giá vốn', '82.000đ'],
    ['Phí sàn', '14% giá bán'],
    ['Đóng gói', '5.000đ/đơn'],
    ['Hỗ trợ ship shop chịu', '15.000đ/đơn'],
    ['Tháng này', 'Chi quảng cáo 12 triệu, ROAS 3,2']
  ],
  output: 'Tính 4 con số: biên lãi gộp sau mọi chi phí theo đơn, ROAS hoà vốn, tiền lãi hoặc lỗ sau quảng cáo tháng này, và ROAS cần để lãi sau quảng cáo bằng 10% doanh thu. Viết một câu nếu quên phí sàn và ship thì ROAS hoà vốn sai thành bao nhiêu.',
  rubric: [
    'Biên lãi trừ đủ giá vốn, phí sàn, đóng gói, ship (35%), không chỉ trừ giá vốn.',
    'ROAS hoà vốn = 1 ÷ biên lãi gộp, ra khoảng 2,86.',
    'Tính lãi sau quảng cáo bằng tiền, không nói "ROAS 3,2 là lãi 3,2 lần".',
    'ROAS mục tiêu tính bằng 1 ÷ (biên − lãi mong muốn) = 4.',
    'Có con số ROAS hoà vốn sai khi quên phí để thấy độ lệch.'
  ],
  model: `<ul>
<li>Chi phí theo đơn: 82.000 + 28.000 (phí sàn) + 5.000 + 15.000 = 130.000đ → lãi gộp 70.000đ, biên <b>35%</b>.</li>
<li>ROAS hoà vốn = 1 ÷ 0,35 ≈ <b>2,86</b>.</li>
<li>Tháng này: doanh thu 12 tr × 3,2 = 38,4 tr; lãi gộp 13,44 tr − quảng cáo 12 tr = <b>+1,44 triệu</b>. ROAS 3,2 chỉ lãi chưa tới 4% doanh thu.</li>
<li>Muốn lãi sau quảng cáo bằng 10% doanh thu: ROAS = 1 ÷ (0,35 − 0,10) = <b>4</b>.</li></ul>
<p>Nếu chỉ trừ giá vốn, biên thành 59% và ROAS hoà vốn thành ≈ 1,69 — shop sẽ tưởng ROAS 2 đã lãi trong khi thực tế lỗ.</p>`
},

/* dl07-06 · dashboard một màn hình */
'B:dl07-06': {
  given: [
    ['Doanh nghiệp', 'Phòng khám nha khoa nhận đặt lịch online · mục tiêu doanh thu tuần 260 triệu'],
    ['Phiên truy cập', 'Tuần này 12.000 · tuần trước 12.000'],
    ['Tỉ lệ đặt lịch', '3,0% · 3,5%'],
    ['Lịch hẹn', '360 · 420'],
    ['Tỉ lệ khách đến', '75% · 80%'],
    ['Lượt khám', '270 · 336'],
    ['Doanh thu trung bình mỗi lượt khám', '800.000đ · 780.000đ'],
    ['Doanh thu', '216 triệu · 262,08 triệu'],
    ['Chi quảng cáo', '30 triệu · 30 triệu'],
    ['Số khác có sẵn', 'Thời gian trên trang 1:42 · tỉ lệ thoát 58% · +320 người theo dõi fanpage · 45.000 lượt xem video · 81% dùng điện thoại · 64% dùng Chrome']
  ],
  output: 'Chọn đúng 6 ô cho dashboard (1 kết quả, 3 dẫn dắt, 2 sức khoẻ). Mỗi ô ghi số tuần này, số so sánh, và "nếu xấu đi thì ai làm gì". Kết thúc bằng 1 câu trả lời "tuần này ổn không", chỉ ra bước hỏng bằng chuỗi nhân.',
  rubric: [
    'Đúng 6 ô; bỏ các số không dẫn tới hành động (thoát, trình duyệt, người theo dõi…).',
    'Mỗi ô có số so sánh với tuần trước hoặc mục tiêu.',
    'Mỗi ô có người và việc cụ thể khi nó xấu đi.',
    'Câu kết luận dùng chuỗi phiên × tỉ lệ đặt × tỉ lệ đến × giá trị, chỉ ra bước rơi.',
    'Số học đúng: 12.000 × 3% × 75% × 800.000đ = 216 triệu.'
  ],
  model: `<table class="t"><thead><tr><th>Ô</th><th class="n">Tuần này / so sánh</th><th>Nếu xấu đi</th></tr></thead><tbody>
<tr><td>Doanh thu</td><td class="n">216 tr / mục tiêu 260 tr (83%)</td><td>Quản lý xem chuỗi bên dưới</td></tr>
<tr><td>Phiên</td><td class="n">12.000 / 12.000</td><td>Người chạy ads xem lại kênh</td></tr>
<tr><td>Tỉ lệ đặt lịch</td><td class="n">3,0% / 3,5%</td><td>Web: kiểm form đặt lịch, ưu đãi</td></tr>
<tr><td>Tỉ lệ khách đến</td><td class="n">75% / 80%</td><td>Lễ tân: gọi nhắc lịch trước 1 ngày</td></tr>
<tr><td>Doanh thu/lượt khám</td><td class="n">800.000đ / 780.000đ</td><td>Bác sĩ trưởng: xem gói dịch vụ</td></tr>
<tr><td>Chi ads mỗi lượt khám</td><td class="n">≈ 111.000đ / ≈ 89.000đ</td><td>Người chạy ads: giữ hay giảm chi</td></tr></tbody></table>
<p>Chưa ổn: phiên giữ nguyên, nhưng tỉ lệ đặt lịch rơi 3,5% → 3,0% và tỉ lệ đến rơi 80% → 75%, nên doanh thu 12.000 × 3% × 75% × 800.000đ = 216 triệu. Lỗi nằm ở form đặt lịch và khâu nhắc lịch, không phải ở quảng cáo.</p>`
},

/* dl09-09 · báo cáo tuần 5 dòng */
'B:dl09-09': {
  given: [
    ['Shop', 'Gốm sứ bán online'],
    ['Mục tiêu doanh thu tuần', '180 triệu'],
    ['Thực đạt', '171 triệu, 1.000 đơn'],
    ['Livestream thứ Bảy', '42 triệu, gấp 1,5 lần buổi trước nhờ trình diễn đổ nước sôi vào ly'],
    ['Tỉ lệ đơn hoàn', '9% (90 đơn), thường là 4%; phần lớn do ly vỡ khi giao'],
    ['Chi phí mỗi đơn hoàn', '80.000đ (ship hai chiều + hàng vỡ)'],
    ['Đổi sang thùng carton 2 lớp', 'thêm 3.000đ/đơn, cần sếp duyệt'],
    ['Bộ chén men lam', 'còn 120 bộ, bán 40 bộ/ngày; xưởng cần đặt trước 5 ngày'],
    ['Việc đã làm', 'đăng 14 bài, chạy 3 nhóm quảng cáo, họp 2 KOC, sửa ảnh 20 sản phẩm']
  ],
  output: 'Viết báo cáo tuần đúng 5 dòng: kết quả so mục tiêu · điều tốt và vì sao · rủi ro · việc tuần tới · cần sếp quyết gì. Mỗi dòng ≤ 25 chữ, có ít nhất một con số.',
  rubric: [
    'Dòng 1 có phần trăm đạt mục tiêu (95%), không liệt kê việc đã làm.',
    'Rủi ro hết hàng chén men lam (còn 3 ngày, đặt trước 5 ngày) nằm ở dòng 3.',
    'Có tính chi phí hoàn đơn tăng thêm so với chi phí thùng mới.',
    'Dòng 5 là một yêu cầu cụ thể sếp chỉ cần gật hoặc lắc.',
    'Đúng 5 dòng, mỗi dòng ≤ 25 chữ.'
  ],
  model: `<ol>
<li>Doanh thu 171 triệu, đạt 95% mục tiêu 180 triệu; hụt chủ yếu vì 90 đơn hoàn.</li>
<li>Livestream thứ Bảy 42 triệu, gấp 1,5 lần nhờ trình diễn đổ nước sôi vào ly.</li>
<li>Rủi ro: chén men lam còn 3 ngày hàng, xưởng cần 5 ngày; đơn hoàn 9%, thêm khoảng 4 triệu/tuần.</li>
<li>Tuần tới: lặp kịch bản livestream, giảm quảng cáo chén men lam đến khi có hàng.</li>
<li>Xin anh duyệt hôm nay: đặt gấp chén men lam và đổi thùng 2 lớp (3 triệu/tuần, rẻ hơn 4 triệu hoàn hàng).</li></ol>`
},

/* tu02-02 · dời tiền theo lãi biên */
'B:tu02-02': {
  given: [
    ['Shop', 'Phụ kiện điện thoại, lãi gộp 70.000đ/đơn trước quảng cáo'],
    ['Nhóm A · Nam 18–24', '4 triệu/tuần → 80 đơn; tuần thử ở 3 triệu → 72 đơn'],
    ['Nhóm B · Dân văn phòng', '4 triệu/tuần → 50 đơn; ở 3 triệu → 32 đơn'],
    ['Nhóm C · Bám đuổi người đã xem web', '4 triệu/tuần → 40 đơn; ở 3 triệu → 35 đơn']
  ],
  output: 'Lập bảng 3 nhóm: chi phí trung bình mỗi đơn, số đơn thêm của 1 triệu cuối, lãi biên của 1 triệu cuối (bằng đồng). Viết quyết định dời bao nhiêu tiền từ nhóm nào sang nhóm nào, và điều kiện đo lại tuần sau.',
  rubric: [
    'Tính cả trung bình lẫn phần biên; quyết định dựa trên phần biên.',
    'Lãi biên = đơn thêm × 70.000đ − 1 triệu, có dấu âm hoặc dương.',
    'Không dồn thêm tiền vào nhóm A chỉ vì trung bình rẻ nhất.',
    'Dời một nấc (1 triệu) rồi đo lại, không dời hết một lần.',
    'Nói rõ lãi biên của B là mức trần vì lợi suất giảm dần.'
  ],
  model: `<table class="t"><thead><tr><th>Nhóm</th><th class="n">TB/đơn</th><th class="n">Đơn thêm của 1 tr cuối</th><th class="n">Lãi biên 1 tr cuối</th></tr></thead><tbody>
<tr><td>A · Nam 18–24</td><td class="n">50.000đ</td><td class="n">8</td><td class="n">−440.000đ</td></tr>
<tr><td>B · Văn phòng</td><td class="n">80.000đ</td><td class="n">18</td><td class="n">+260.000đ</td></tr>
<tr><td>C · Bám đuổi</td><td class="n">100.000đ</td><td class="n">5</td><td class="n">−650.000đ</td></tr></tbody></table>
<p>Dời 1 triệu từ C sang B. C còn 3 triệu (35 đơn); B lên 5 triệu, tối đa 68 đơn — 18 đơn thêm là mức trần vì đồng thứ năm thường mua được ít hơn đồng thứ tư. A rẻ nhất trung bình nhưng 1 triệu cuối đang lỗ, cũng nên thử rút một nấc tuần sau. Tuần sau đo lại: nếu 1 triệu mới của B mang về dưới 15 đơn (lãi biên âm) thì dừng dời.</p>`
},

/* in04-04 · đề xuất có ngân sách và con số hứa lại */
'B:in04-04': {
  given: [
    ['Doanh nghiệp', 'Chuỗi bánh mì 10 điểm bán'],
    ['Đề xuất', 'Thẻ tích điểm "mua 10 tặng 1" trong 6 tháng'],
    ['Ngân sách xin', '120 triệu (đã gồm bánh tặng, in thẻ, phần mềm)'],
    ['Giá một ổ / lãi gộp', '25.000đ / 48% = 12.000đ'],
    ['Khách mỗi tháng', '20.000 người'],
    ['Giả định mỗi khách quay lại thêm', 'mua thêm 2 ổ/tháng'],
    ['Tỉ lệ quay lại tăng thêm', 'thận trọng +2 điểm · cơ sở +5 · lạc quan +8']
  ],
  output: 'Viết đề xuất What / Why / How (mỗi phần 1–2 câu) có ngân sách, số ổ thêm cần để hoà vốn tính bằng lãi gộp, bảng 3 kịch bản (ổ thêm trong 6 tháng, lãi gộp thêm, chênh so với 120 triệu) và một mốc kiểm tra kèm điều kiện dừng.',
  rubric: [
    'Hoà vốn tính bằng lãi gộp 12.000đ/ổ, không bằng giá bán 25.000đ.',
    'Có số ổ thêm cần mỗi ngày mỗi điểm để người duyệt hình dung được.',
    'Có đủ 3 kịch bản, kể cả kịch bản lỗ.',
    'Có mốc kiểm tra giữa chừng và điều kiện dừng bằng con số.',
    'Không có cụm "tăng đáng kể" hay lời hứa không kèm phép tính.'
  ],
  model: `<p><b>What:</b> Thẻ "mua 10 tặng 1" tại 10 điểm trong 6 tháng, ngân sách 120 triệu. <b>Why:</b> hoà vốn cần 120.000.000 ÷ 12.000 = 10.000 ổ thêm, tức khoảng 56 ổ/ngày cả chuỗi, chưa tới 6 ổ mỗi điểm. <b>How:</b> phát thẻ tại quầy từ tháng đầu, theo dõi tỉ lệ khách quay lại hằng tháng.</p>
<table class="t"><thead><tr><th>Kịch bản</th><th class="n">Ổ thêm / 6 tháng</th><th class="n">Lãi gộp thêm</th><th class="n">So với 120 tr</th></tr></thead><tbody>
<tr><td>Thận trọng +2 điểm</td><td class="n">4.800</td><td class="n">57,6 tr</td><td class="n">−62,4 tr</td></tr>
<tr><td>Cơ sở +5 điểm</td><td class="n">12.000</td><td class="n">144 tr</td><td class="n">+24 tr</td></tr>
<tr><td>Lạc quan +8 điểm</td><td class="n">19.200</td><td class="n">230,4 tr</td><td class="n">+110,4 tr</td></tr></tbody></table>
<p>Mốc kiểm tra cuối tháng 2: nếu tỉ lệ quay lại tăng dưới 3 điểm thì dừng phát thẻ mới. Hoà vốn cần khoảng +4,2 điểm.</p>`
}

});
