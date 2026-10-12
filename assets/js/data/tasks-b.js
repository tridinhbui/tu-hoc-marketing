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

/* ===== Phase 5 · bảy bài thực hành tạo ra một sản phẩm công việc hoàn chỉnh (memo, brief, chiến lược, media plan, ngân sách, phân tích, post-mortem).
   Mọi con số là minh hoạ, tự khớp nhau; thương hiệu là giả định. ===== */
Object.assign(BAI_TASKS, {

/* kh05-07 · customer insight memo từ 8 ghi chú phỏng vấn */
'B:kh05-07': {
  given: [
    ['Bối cảnh', 'Startup quản lý căn hộ dịch vụ ở quận 7 phỏng vấn 8 người đang thuê (ghi chú rút gọn, số minh hoạ)'],
    ['Người 1 · nhân viên IT, ở 14 tháng', '"Vòi nước bồn rửa rỉ từ tháng 3, tôi nhắn chủ nhà qua Zalo 3 lần, 9 ngày mới có thợ. Tối chủ nhật máy lạnh hư thì không biết gọi ai."'],
    ['Người 2 · giáo viên, ở 8 tháng', '"Báo đèn hành lang hư, chủ nhà bảo để tuần sau. Lúc trả phòng bị trừ cọc 1,5 triệu mà không có hoá đơn, tôi không biết trừ vào đâu."'],
    ['Người 3 · kế toán, ở 20 tháng', '"Hợp đồng ghi trừ cọc theo thực tế hư hỏng, không ghi mức. Gọi chủ nhà ngoài giờ hành chính thì không ai bắt máy."'],
    ['Người 4 · kỹ sư, ở 5 tháng', '"Máy giặt kẹt cửa, chờ 11 ngày mới có người sửa. Tôi đã xem một toà khác gần đó, giá tương đương."'],
    ['Người 5 · nhân viên ngân hàng, ở 11 tháng', '"Báo vòi sen hỏng, 6 ngày mới có người. Nửa đêm mất nước thì nhắn quản lý rồi chờ tới sáng."'],
    ['Người 6 · làm tự do, ở 9 tháng', '"Trả phòng bị trừ 2 triệu tiền sơn tường, tôi không được xem phòng cùng. Hôm kẹt thang máy buổi tối cũng không có số nào để gọi."'],
    ['Người 7 · sinh viên, ở 6 tháng', '"Cửa sổ kẹt, báo 2 lần, hơn 2 tuần mới sửa. Hết hợp đồng là tôi chuyển đi vì chuyện này."'],
    ['Người 8 · nhân viên marketing, ở 3 tháng', '"Mọi thứ ổn. Wifi hơi chậm buổi tối. Mới 3 tháng nên chưa có gì cần sửa."']
  ],
  output: 'Viết memo một trang gồm: (1) ba chủ đề, mỗi chủ đề là một câu mô tả vấn đề, kèm số người khác nhau nhắc tới (ghi mã người) và một trích dẫn nguyên văn; (2) một câu insight dạng căng thẳng "muốn … nhưng …"; (3) một giả thuyết kiểm tiếp có cách đo, mốc số và điều kiện sai; (4) mức tin cậy kèm lý do cụ thể.',
  rubric: [
    'Đếm theo số người khác nhau (không đếm số lần nhắc), có mã người cho từng chủ đề.',
    'Mỗi chủ đề có một trích dẫn nguyên văn lấy từ ghi chú, không diễn giải lại.',
    'Tên chủ đề là câu mô tả vấn đề, không phải một từ như "sửa chữa".',
    'Ý chỉ một người nhắc (wifi chậm) không bị nâng thành chủ đề, hoặc được ghi rõ là tín hiệu lẻ.',
    'Insight có dạng căng thẳng "muốn … nhưng …" và chỉ dựa vào điều có trong ghi chú.',
    'Giả thuyết kiểm tiếp có cách đo, mốc bằng số và điều kiện làm nó sai.',
    'Mức tin cậy nêu lý do cụ thể (8 người, cùng khu, chưa nghe chủ nhà) và chỉ ra chủ đề nào chắc hơn.'
  ],
  model: `<p><b>MEMO · Người thuê căn hộ dịch vụ quận 7 (8 phỏng vấn)</b></p>
<table class="t"><thead><tr><th>Chủ đề</th><th class="n">Số người</th><th>Trích dẫn</th></tr></thead><tbody>
<tr><td>Báo hỏng xong phải chờ nhiều ngày và nhắn nhiều lần mới có người sửa</td><td class="n">5 / 8 (N1, N2, N4, N5, N7)</td><td>"Máy giặt kẹt cửa, chờ 11 ngày mới có người sửa." (N4)</td></tr>
<tr><td>Sự cố ngoài giờ hành chính không có ai để gọi</td><td class="n">4 / 8 (N1, N3, N5, N6)</td><td>"Gọi chủ nhà ngoài giờ hành chính thì không ai bắt máy." (N3)</td></tr>
<tr><td>Bị trừ cọc khi trả phòng mà không biết trừ vào đâu</td><td class="n">3 / 8 (N2, N3, N6)</td><td>"Tôi không được xem phòng cùng." (N6)</td></tr></tbody></table>
<p><b>Insight:</b> Họ muốn ở yên trong một căn nhà cũ hay hỏng vặt, nhưng mỗi lần hỏng lại phải thành người đi đòi, đòi từ lúc báo cho tới lúc trả phòng.</p>
<p><b>Giả thuyết kiểm tiếp:</b> Nếu mỗi yêu cầu sửa được xác nhận trong 24 giờ kèm ngày hẹn cụ thể, số lần người thuê phải nhắn lại cho mỗi yêu cầu giảm. Thử 4 tuần trên 10 căn, so với 10 căn giữ cách cũ; hiện N1 phải nhắn 3 lần cho một yêu cầu. Giả thuyết sai nếu nhóm thử không giảm ít nhất một phần ba số lần nhắn lại so với nhóm đối chứng.</p>
<p><b>Mức tin cậy:</b> trung bình cho chủ đề 1 (5/8 người, có hành vi đi kèm: N7 đã chuyển đi, N4 đã xem toà khác, N1 nhắn 3 lần), thấp cho chủ đề 2 và 3 (3–4 người, chưa có ai rời đi vì chúng). Chung: chỉ 8 người, cùng một khu, chưa nghe chủ nhà, và N8 mới ở 3 tháng nên chưa gặp sự cố nào. Wifi chậm chỉ một người nhắc, ghi lại làm tín hiệu lẻ, không thành chủ đề.</p>`
},

/* gt05-09 · creative brief một trang */
'B:gt05-09': {
  given: [
    ['Brief gốc', '"Cần chiến dịch viral. Mục tiêu: tăng doanh số và nhận biết. Đối tượng: phụ huynh và học sinh. Thông điệp: bền, êm, rẻ, đẹp, chống trơn. Ngân sách: tuỳ ý tưởng. Hạn: càng sớm càng tốt."'],
    ['Sản phẩm (thương hiệu minh hoạ)', 'Giày học sinh Bước Nhỏ, giá 389.000đ, lãi gộp 40% (155.600đ/đôi), cao hơn đôi phổ thông khoảng 100.000đ'],
    ['Doanh số', 'Năm ngoái bán 1.800 đôi trong 6 tuần trước khai giảng; năm nay chỉ tiêu 3.000 đôi cùng khoảng thời gian'],
    ['Người mua thật', 'Mẹ 32–42 tuổi mua cho con tiểu học hoặc THCS. Hỏi nhanh 40 khách cũ: 26 người đã phải mua thêm một đôi giữa học kỳ vì giày bong đế hoặc toác mũi'],
    ['Lời khách cũ', '"Mua đôi rẻ cho đỡ tốn, tới tháng 11 lại phải mua đôi nữa, tính ra tốn hơn."'],
    ['Điều thương hiệu chứng minh được', 'Bảo hành đổi đôi mới nếu bong đế trong 6 tháng; đế cao su có rãnh chống trơn'],
    ['Ràng buộc', 'Ngân sách trọn gói 150 triệu (gồm sản xuất nội dung và media); khai giảng sau 6 tuần, lên sóng được 4 tuần; bắt buộc có mã giảm 10% và logo; không dùng hình trẻ em dưới 12 tuổi khi thiếu giấy đồng ý của phụ huynh']
  ],
  output: 'Viết lại thành creative brief một trang gồm 7 mục: vấn đề kinh doanh (có số), mục tiêu một câu đo được (kèm chi phí tối đa mỗi đôi bán thêm), chân dung một người mua cụ thể, insight dạng căng thẳng, một thông điệp duy nhất không quá 10 từ, lý do để tin, ràng buộc. Cuối brief liệt kê những ý trong brief gốc bị bỏ.',
  rubric: [
    'Vấn đề kinh doanh nêu số hiện tại và khoảng cách (1.800 → 3.000 đôi, thêm 1.200 đôi).',
    'Mục tiêu là một câu có số lượng, mốc thời gian và trần chi phí mỗi đôi bán thêm so với lãi gộp 155.600đ.',
    'Chân dung là một người mua cụ thể kèm hành vi, không viết "phụ huynh và học sinh".',
    'Insight là một mâu thuẫn của khách thật (muốn … nhưng …), không phải dữ kiện như "giày hay hỏng".',
    'Chỉ một thông điệp, không quá 10 từ, và nói rõ đã bỏ ý nào trong năm ý cũ.',
    'Lý do để tin chỉ dùng điều thương hiệu chứng minh được từ dữ liệu cho sẵn (bảo hành, giá chia theo tháng).',
    'Ràng buộc đủ: 150 triệu, 4 tuần lên sóng, mã giảm 10%, logo, hạn chế hình trẻ em.'
  ],
  model: `<table class="t"><tbody>
<tr><td><b>Vấn đề kinh doanh</b></td><td>Năm ngoái bán 1.800 đôi trong 6 tuần trước khai giảng, năm nay cần 3.000 (thêm 1.200, tăng 67%). Giá cao hơn đôi phổ thông khoảng 100.000đ nên khách chưa thấy lý do trả thêm.</td></tr>
<tr><td><b>Mục tiêu</b></td><td>Bán 3.000 đôi trong 6 tuần trước khai giảng với chi không quá 150 triệu, tức không quá 125.000đ cho mỗi đôi bán thêm (150.000.000 ÷ 1.200), thấp hơn lãi gộp 155.600đ.</td></tr>
<tr><td><b>Chân dung</b></td><td>Mẹ 32–42 tuổi, con học tiểu học hoặc THCS, mỗi đầu năm học mua giày cho con và đã từng phải mua lại giữa học kỳ (26/40 khách cũ).</td></tr>
<tr><td><b>Insight</b></td><td>Chị chọn đôi rẻ để đỡ tốn, rồi tới tháng 11 lại phải mua đôi nữa, cuối cùng tốn hơn.</td></tr>
<tr><td><b>Thông điệp</b></td><td>"Mua một đôi, đi trọn năm học." (7 từ)</td></tr>
<tr><td><b>Lý do để tin</b></td><td>Bảo hành đổi đôi mới nếu bong đế trong 6 tháng. 389.000đ chia cho 9 tháng học khoảng 43.000đ mỗi tháng.</td></tr>
<tr><td><b>Ràng buộc</b></td><td>Trọn gói 150 triệu gồm sản xuất và media; lên sóng 4 tuần trong 6 tuần còn lại; bắt buộc mã giảm 10% và logo; không dùng hình trẻ em dưới 12 tuổi khi thiếu giấy đồng ý.</td></tr></tbody></table>
<p><b>Đã bỏ:</b> "viral" và "nhận biết" (không đo được và không phải vấn đề), "phụ huynh và học sinh" (hai nhóm, người trả tiền là mẹ), và bốn trong năm ý thông điệp (êm, rẻ, đẹp, chống trơn). "Rẻ" bị bỏ vì giá thật cao hơn đôi phổ thông.</p>`
},

/* kh11-07 · chiến lược chiến dịch tích hợp từ STP đến rủi ro */
'B:kh11-07': {
  given: [
    ['Doanh nghiệp (minh hoạ)', 'Tiệm cơm văn phòng, định vị đã chọn: "cơm trưa giao trong 30 phút cho dân văn phòng chỉ có 45 phút nghỉ"'],
    ['Thị trường gần', '3 toà nhà văn phòng quanh tiệm, khoảng 1.500 nhân viên ăn trưa tại toà'],
    ['Hiện trạng', '40 món nấu theo yêu cầu; hộp cơm 50.000đ bán chủ yếu qua app (hoa hồng 25%); fanpage đăng mâm cơm gia đình cuối tuần'],
    ['Chi phí mỗi hộp', 'Món ăn 18.000đ + bao bì 3.000đ; giao tập trung theo toà 4.000đ/hộp (kênh đặt trực tiếp)'],
    ['Kênh đặt trực tiếp', 'Nhóm Zalo theo từng toà, đặt trước 10:30, giao lên sảnh lúc 11:45, không tính hoa hồng'],
    ['Mục tiêu chiến dịch', '6 tuần; tuần 6 đạt 120 khách đặt trực tiếp từ 3 hộp/tuần, giả định 70 người chuyển từ app và 50 người là khách mới'],
    ['Ngân sách tối đa', '20 triệu đồng']
  ],
  output: 'Viết chiến lược chiến dịch 6 tuần một trang theo chuỗi: STP (tệp, định vị) → lời hứa đo được → kênh và vai trò → KPI (mốc tuần 3 và tuần 6) → ngân sách theo hạng mục khớp 20 triệu, có lãi tăng thêm mỗi hộp từ từng nhóm khách → hai rủi ro, mỗi rủi ro có tín hiệu sớm và việc làm.',
  rubric: [
    'Lời hứa viết thành chỉ số đo được (ví dụ ít nhất 90% đơn giao trong 30 phút), không chỉ là khẩu hiệu.',
    'Nói rõ bỏ gì để giữ lời hứa (giảm số món, ngừng đăng mâm cơm gia đình), không chỉ thêm việc.',
    'Tính lãi tăng thêm đúng: khách chuyển từ app chỉ tăng 8.500đ/hộp, khách mới tăng 25.000đ/hộp.',
    'KPI có mốc tuần 3 và tuần 6 bằng số, kèm một điều kiện dừng hoặc đổi cách làm.',
    'Ngân sách chia theo hạng mục và cộng đúng bằng 20 triệu, có phần dự phòng.',
    'Có thời gian hoàn vốn tính từ lãi tăng thêm mỗi tuần, không tính từ doanh thu.',
    'Hai rủi ro, mỗi rủi ro có tín hiệu sớm đo được và phương án, không viết "rủi ro thị trường" chung chung.'
  ],
  model: `<p><b>1. STP.</b> Phân khúc: nhân viên văn phòng trong 3 toà quanh tiệm (khoảng 1.500 người), chỉ có 45 phút nghỉ trưa và không muốn rời toà. Chọn: ăn trưa tại toà, đặt trước. Định vị: cơm trưa giao tới sảnh trong 30 phút.</p>
<p><b>2. Lời hứa đo được.</b> Ít nhất 90% đơn đặt trước 10:30 tới sảnh trong 30 phút. Để giữ lời hứa: rút 40 món còn 6 món mỗi ngày, ngừng đăng ảnh mâm cơm gia đình.</p>
<p><b>3. Kênh.</b> Nhóm Zalo theo từng toà là kênh chính (đặt 10:30, giao 11:45); poster thang máy và tờ rơi kéo người vào nhóm; app giữ làm kênh phụ, không đẩy thêm.</p>
<table class="t"><thead><tr><th>Mỗi hộp 50.000đ</th><th class="n">Qua app</th><th class="n">Đặt trực tiếp</th></tr></thead><tbody>
<tr><td>Món ăn + bao bì</td><td class="n">21.000đ</td><td class="n">21.000đ</td></tr>
<tr><td>Hoa hồng / giao tập trung</td><td class="n">12.500đ</td><td class="n">4.000đ</td></tr>
<tr><td><b>Còn lại</b></td><td class="n"><b>16.500đ</b></td><td class="n"><b>25.000đ</b></td></tr></tbody></table>
<p>Khách chuyển từ app chỉ thêm 25.000 − 16.500 = 8.500đ mỗi hộp; khách mới thêm 25.000đ mỗi hộp.</p>
<p><b>4. KPI.</b> Tuần 3: ít nhất 40 khách đặt từ 3 hộp/tuần, nếu thấp hơn thì ngừng chi poster và dồn vào nhóm Zalo. Tuần 6: 120 khách (70 chuyển từ app, 50 mới) và tỉ lệ giao đúng 30 phút từ 90%.</p>
<p><b>5. Ngân sách 20 triệu.</b> Hộp ăn thử 200 × 25.000đ = 5 triệu; poster, standee, tờ rơi 3 toà = 6 triệu; nhắn và quảng cáo vào nhóm toà = 5 triệu; giảm 10% hộp đầu 300 × 5.000đ = 1,5 triệu; dự phòng 2,5 triệu. Cộng 20 triệu.</p>
<p><b>Lãi tăng thêm mỗi tuần khi đạt mục tiêu:</b> 70 × 3 × 8.500 + 50 × 3 × 25.000 = 1.785.000 + 3.750.000 = 5.535.000đ. Hoàn vốn 20 triệu sau khoảng 3,6 tuần giữ ổn định.</p>
<p><b>6. Rủi ro.</b> (a) Giao trễ giờ cao điểm: tín hiệu là hơn 15% đơn trễ quá 30 phút trong 2 ngày liền, việc làm là giới hạn 60 hộp cho khung 11:45 và mở thêm khung 12:15. (b) Khách ăn thử rồi không quay lại: tín hiệu là tuần 3 dưới 40 khách đặt thường xuyên dù đã phát đủ 200 hộp thử, việc làm là đổi thực đơn 6 món và cắt poster để dồn tiền sang nhóm Zalo.</p>`
},

/* kn07-08 · media plan có reach / tần suất / CPM và kịch bản cắt 30% */
'B:kn07-08': {
  given: [
    ['Bối cảnh (minh hoạ)', 'Hãng bột giặt, nửa cuối năm có 20 tỉ cho quảng cáo; giám đốc muốn cắt 30% còn 14 tỉ'],
    ['Nhóm mục tiêu', '20 triệu phụ nữ 25–55 tuổi'],
    ['TV', 'Tiếp cận 14 triệu người · tần suất 12 · CPM 60.000đ'],
    ['YouTube', 'Tiếp cận 8 triệu người · tần suất 8 · CPM 50.000đ · 70% số người này đã nằm trong nhóm xem TV'],
    ['Facebook / TikTok', 'Tiếp cận 9 triệu người · tần suất 10 · CPM 40.000đ'],
    ['Điểm bán (siêu thị, tạp hoá)', 'Tiếp cận 4 triệu người · tần suất 6 · CPM 100.000đ'],
    ['Chi phí cố định', 'Sản xuất và phí thực hiện 0,72 tỉ, nằm trong 20 tỉ và không cắt được'],
    ['Giả định ngưỡng tần suất', 'Dưới 6 lần trong 6 tháng, quảng cáo gần như không đọng lại ở nhóm này'],
    ['Chỉ số theo dõi', 'Nhận biết gợi nhớ có trợ giúp của nhóm mục tiêu hiện 42%']
  ],
  output: 'Lập media plan gốc: tính lượt hiển thị (= tiếp cận × tần suất) và chi phí từng kênh bằng CPM, chứng minh tổng khớp 20 tỉ. Rồi lập kịch bản cắt còn không quá 14 tỉ: chỉ rõ kênh bỏ hoặc giảm, tần suất mỗi kênh còn lại, số lượt hiển thị và số người tiếp cận mất đi, và so với cách cắt đều. Thêm một mốc kiểm tra kèm điều kiện khôi phục.',
  rubric: [
    'Lượt hiển thị tính bằng tiếp cận × tần suất, chi phí = lượt ÷ 1.000 × CPM; từng kênh đúng số.',
    'Tổng kế hoạch gốc khớp 20 tỉ gồm 19,28 tỉ media và 0,72 tỉ cố định.',
    'Kịch bản cắt có tổng không quá 14 tỉ và không cắt khoản cố định.',
    'Không kênh nào còn dưới ngưỡng tần suất 6.',
    'Tính trùng lặp của YouTube với TV khi nói số người tiếp cận mất đi, không trừ cả 8 triệu.',
    'So sánh với cách cắt đều và chỉ ra kênh nào rơi dưới ngưỡng.',
    'Có mốc kiểm tra bằng con số và điều kiện khôi phục một phần ngân sách.'
  ],
  model: `<table class="t"><thead><tr><th>Kênh</th><th class="n">Tiếp cận (triệu)</th><th class="n">Tần suất</th><th class="n">Lượt hiển thị (triệu)</th><th class="n">CPM</th><th class="n">Chi (tỉ)</th></tr></thead><tbody>
<tr><td>TV</td><td class="n">14</td><td class="n">12</td><td class="n">168</td><td class="n">60.000đ</td><td class="n">10,08</td></tr>
<tr><td>YouTube</td><td class="n">8</td><td class="n">8</td><td class="n">64</td><td class="n">50.000đ</td><td class="n">3,20</td></tr>
<tr><td>Facebook / TikTok</td><td class="n">9</td><td class="n">10</td><td class="n">90</td><td class="n">40.000đ</td><td class="n">3,60</td></tr>
<tr><td>Điểm bán</td><td class="n">4</td><td class="n">6</td><td class="n">24</td><td class="n">100.000đ</td><td class="n">2,40</td></tr>
<tr><td><b>Media</b></td><td></td><td></td><td class="n"><b>346</b></td><td></td><td class="n"><b>19,28</b></td></tr>
<tr><td>Sản xuất, phí cố định</td><td></td><td></td><td></td><td></td><td class="n">0,72</td></tr>
<tr><td><b>Tổng</b></td><td></td><td></td><td></td><td></td><td class="n"><b>20,00</b></td></tr></tbody></table>
<p><b>Kịch bản cắt có chọn:</b> bỏ YouTube (3,2 tỉ) vì 70% người của nó đã thấy TV, nên chỉ mất 8 × 30% = 2,4 triệu người mới, tức 12% nhóm mục tiêu. Giảm TV từ tần suất 12 xuống 8,5: 14 triệu × 8,5 = 119 triệu lượt = 7,14 tỉ. Giữ Facebook/TikTok 3,6 tỉ và điểm bán 2,4 tỉ. Media còn 7,14 + 3,6 + 2,4 = 13,14 tỉ, cộng 0,72 cố định = 13,86 tỉ, giảm 6,14 tỉ (30,7%). Lượt hiển thị còn 233 triệu, mất 113 triệu (32,7%). Mọi kênh còn tần suất từ 6 trở lên.</p>
<p><b>Cắt đều:</b> media phải xuống 13,28 tỉ, tức mỗi kênh giảm còn khoảng 69%; tần suất thành TV 8,3, YouTube 5,5, Facebook/TikTok 6,9, điểm bán 4,1. Hai kênh rơi dưới ngưỡng 6, tiền còn bỏ ra mà gần như không đọng lại.</p>
<p><b>Mốc kiểm tra:</b> sau 8 tuần đo nhận biết gợi nhớ; nếu tụt từ 42% xuống dưới 39% thì đề nghị khôi phục TV về tần suất 10 (14 × 10 × 60.000đ = 8,4 tỉ, thêm 1,26 tỉ).</p>`
},

/* dl02-04 · ngân sách marketing từ kinh tế đơn vị */
'B:dl02-04': {
  given: [
    ['Sản phẩm (minh hoạ)', 'Hạt điều rang muối đóng hộp, bán online, giá 180.000đ mỗi đơn'],
    ['Chi phí mỗi đơn', 'Giá vốn và đóng gói 72.000đ · phí sàn, thanh toán, giao hàng 28.000đ'],
    ['Khách quay lại', 'Trung bình 3 đơn trong 12 tháng kể từ khách mới (gồm đơn đầu), không tốn thêm chi phí thu hút'],
    ['Quy tắc', 'Chỉ chi khi LTV lãi gộp ÷ CAC trung bình từ 3 trở lên; quỹ tiền mặt cho quảng cáo tháng này tối đa 60 triệu'],
    ['CAC đo được khi thử các mức chi', 'Thấp: 400 khách mới, 60.000đ/khách · Cơ sở: 700 khách mới, 75.000đ/khách · Cao: 1.000 khách mới, 95.000đ/khách']
  ],
  output: 'Từ giá và chi phí tính biên đóng góp mỗi đơn, LTV 12 tháng và CAC trần theo quy tắc. Lập bảng 3 kịch bản (ngân sách, LTV/CAC, lãi tăng thêm 12 tháng, đơn nào hoàn vốn CAC) và chọn một mức ngân sách. Nêu CAC biên khi nâng từ cơ sở lên cao và một điều kiện làm lựa chọn sai.',
  rubric: [
    'Biên đóng góp mỗi đơn đúng 180.000 − 72.000 − 28.000 = 80.000đ, không dùng giá bán.',
    'LTV = 3 × 80.000 = 240.000đ và CAC trần theo quy tắc = 240.000 ÷ 3 = 80.000đ.',
    'Ngân sách mỗi kịch bản = khách × CAC của chính kịch bản đó (24 / 52,5 / 95 triệu).',
    'Loại kịch bản cao bằng cả hai điều kiện: LTV/CAC dưới 3 và vượt quỹ tiền mặt 60 triệu.',
    'Tính CAC biên khi nâng từ cơ sở lên cao (khoảng 141.667đ) và chỉ ra nó cao hơn CAC trung bình.',
    'Chỉ rõ hoàn vốn ở đơn nào cho mỗi kịch bản.',
    'Có điều kiện sai bằng số: số đơn mỗi khách xuống dưới khoảng 2,8 thì kịch bản cơ sở rơi dưới 3.'
  ],
  model: `<p><b>Biên mỗi đơn</b> = 180.000 − 72.000 − 28.000 = 80.000đ. <b>LTV 12 tháng</b> = 3 × 80.000 = 240.000đ. <b>CAC trần theo quy tắc</b> = 240.000 ÷ 3 = 80.000đ.</p>
<table class="t"><thead><tr><th>Kịch bản</th><th class="n">Khách mới</th><th class="n">CAC</th><th class="n">Ngân sách</th><th class="n">LTV/CAC</th><th class="n">Lãi tăng thêm 12 tháng</th><th>Hoàn vốn</th></tr></thead><tbody>
<tr><td>Thấp</td><td class="n">400</td><td class="n">60.000đ</td><td class="n">24 tr</td><td class="n">4,0</td><td class="n">180.000 × 400 = 72 tr</td><td>đơn đầu</td></tr>
<tr><td>Cơ sở</td><td class="n">700</td><td class="n">75.000đ</td><td class="n">52,5 tr</td><td class="n">3,2</td><td class="n">165.000 × 700 = 115,5 tr</td><td>đơn đầu</td></tr>
<tr><td>Cao</td><td class="n">1.000</td><td class="n">95.000đ</td><td class="n">95 tr</td><td class="n">2,5</td><td class="n">145.000 × 1.000 = 145 tr</td><td>đơn thứ hai (160.000đ)</td></tr></tbody></table>
<p><b>Chọn cơ sở, 52,5 triệu.</b> Kịch bản cao có lãi tuyệt đối nhiều nhất nhưng LTV/CAC 2,5 dưới 3 và 95 triệu vượt quỹ 60 triệu. CAC biên từ cơ sở lên cao = (95 − 52,5) triệu ÷ 300 khách ≈ 141.667đ, gần gấp đôi CAC trung bình 75.000đ; tỉ lệ biên chỉ khoảng 1,7, còn lãi nhưng chậm hoàn vốn. Từ thấp lên cơ sở CAC biên là 95.000đ.</p>
<p><b>Điều kiện sai:</b> tỉ lệ 3 ở CAC 75.000đ cần LTV 225.000đ, tức khoảng 2,8 đơn mỗi khách. Nếu khách thật chỉ mua dưới 2,8 đơn trong 12 tháng thì chọn thấp hoặc cắt CAC xuống. Đo lại số đơn mỗi khách sau 3 tháng đầu.</p>`
},

/* dl06-03 · phân tích hiệu quả: nền tảng báo vs đơn thật */
'B:dl06-03': {
  given: [
    ['Cửa hàng (minh hoạ)', 'Bán đồ gia dụng online; biên đóng góp 50% doanh thu sau giá vốn, phí sàn và giao'],
    ['Facebook Ads', 'Chi 30 triệu · nền tảng báo doanh thu 105 triệu (ROAS 3,5)'],
    ['TikTok Ads', 'Chi 20 triệu · nền tảng báo doanh thu 90 triệu (ROAS 4,5)'],
    ['Sổ đơn thật cả tháng', '130 triệu doanh thu: 45 triệu từ khách cũ quay lại trực tiếp, 38 triệu ghi theo lần chạm cuối là Facebook, 22 triệu là TikTok, 25 triệu không rõ nguồn'],
    ['Thử tắt TikTok', 'Tắt 2 tuần ở 3 tỉnh, so với 3 tỉnh tương đương vẫn chạy: ước lượng doanh thu mất nếu tắt cả tháng khoảng 28 triệu (dao động 18–38 triệu)'],
    ['Facebook', 'Chưa từng thử tắt']
  ],
  output: 'Viết bản phân tích hiệu quả một trang: bảng so ROAS theo nền tảng, theo lần chạm cuối và theo thử nghiệm; ngưỡng hoà vốn ROAS; kết luận cho từng kênh kèm mức chắc chắn; đề xuất quyết định có số tiền (cả cận xấu nhất) và một điều kiện làm quyết định sai.',
  rubric: [
    'Chỉ ra nền tảng báo 195 triệu so với sổ đơn 130 triệu (vượt 65 triệu) và không dùng ROAS nền tảng làm cơ sở quyết định.',
    'Tính ngưỡng hoà vốn của ROAS tăng thêm = 1 ÷ 0,5 = 2,0, không lấy ROAS nền tảng làm mốc.',
    'Có ROAS lần chạm cuối đúng (Facebook ≈ 1,27, TikTok 1,10) và ROAS thử nghiệm TikTok 1,4 (0,9–1,9).',
    'Mỗi kết luận có mức chắc chắn kèm lý do (khoảng dao động, thời gian thử, Facebook chưa thử).',
    'Quyết định có số: tiết kiệm bao nhiêu, doanh thu mất ước bao nhiêu, ròng bao nhiêu, kể cả cận xấu nhất.',
    'Có điều kiện sai bằng con số (doanh thu mất vượt 16 triệu) và việc đo tiếp với Facebook.'
  ],
  model: `<table class="t"><thead><tr><th>Kênh</th><th class="n">Chi</th><th class="n">ROAS nền tảng</th><th class="n">ROAS lần chạm cuối</th><th class="n">ROAS tăng thêm (thử tắt)</th></tr></thead><tbody>
<tr><td>Facebook</td><td class="n">30 tr</td><td class="n">3,5</td><td class="n">38 ÷ 30 ≈ 1,27</td><td class="n">chưa đo</td></tr>
<tr><td>TikTok</td><td class="n">20 tr</td><td class="n">4,5</td><td class="n">22 ÷ 20 = 1,10</td><td class="n">28 ÷ 20 = 1,4 (0,9–1,9)</td></tr></tbody></table>
<p>Hai nền tảng cộng lại báo 195 triệu trong khi sổ đơn chỉ có 130 triệu, vượt 65 triệu (50%): cùng một khách bị nhiều nơi nhận công, và 45 triệu thuộc khách cũ vốn không do quảng cáo. Ngưỡng hoà vốn ROAS tăng thêm = 1 ÷ 50% = 2,0.</p>
<p><b>Kết luận.</b> Chắc: không dùng ROAS nền tảng (3,5 và 4,5) để quyết định, vì cộng lại đã vượt sổ đơn. Khá chắc: TikTok dưới ngưỡng, 1,4 và ngay cận trên 1,9 vẫn dưới 2,0, nhưng chỉ thử 2 tuần ở 3 tỉnh. Chưa kết luận: Facebook, ROAS thật nằm đâu đó giữa 1,27 và 3,5, khoảng này chứa ngưỡng 2,0.</p>
<p><b>Quyết định.</b> Giảm TikTok từ 20 xuống 12 triệu, tiết kiệm 8 triệu. Doanh thu mất ước 8 × 1,4 = 11,2 triệu (khoảng 7,2–15,2), mất biên 5,6 triệu (3,6–7,6), ròng +2,4 triệu (+0,4 đến +4,4). Giữ Facebook 30 triệu và chạy thử tắt 2 tuần ở 3 tỉnh để đo. Giả định tuyến tính theo mức chi.</p>
<p><b>Điều kiện sai:</b> hoà vốn khi doanh thu mất bằng 8 ÷ 0,5 = 16 triệu. Nếu tháng sau doanh thu tổng giảm quá 16 triệu (đã loại mùa vụ), khôi phục TikTok về 20 triệu.</p>`
},

/* in01-04 · post-mortem chiến dịch */
'B:in01-04': {
  given: [
    ['Chiến dịch (minh hoạ)', 'Back-to-school của một nhà sách online, tổng chi 200 triệu, doanh thu tăng thêm 600 triệu; biên đóng góp 35%'],
    ['KOL review', 'Chi 60 triệu (8 KOL, 7,5 triệu mỗi người) · doanh thu tăng thêm 120 triệu; 2 KOL tạo 85 triệu, 6 KOL còn lại tạo 35 triệu'],
    ['Livestream', 'Chi 40 triệu · doanh thu tăng thêm 150 triệu'],
    ['Voucher email', 'Chi 20 triệu (gồm giá trị voucher) · doanh thu tăng thêm 180 triệu'],
    ['Quảng cáo tìm kiếm', 'Chi 50 triệu · doanh thu tăng thêm 110 triệu; tháng đầu chi 30 triệu thu 90 triệu, 2 tuần cuối chi 20 triệu thu 20 triệu'],
    ['Tờ rơi tại trường', 'Chi 30 triệu · doanh thu tăng thêm 40 triệu (đếm theo mã QR riêng)'],
    ['Năm sau', 'Sếp hỏi có giữ nguyên 200 triệu cho cả 5 hoạt động không']
  ],
  output: 'Viết post-mortem một trang: kết quả tính bằng lãi tăng thêm; bảng Giữ / Bỏ / Thử lại có sửa cho 5 hoạt động (mỗi ô một số làm bằng chứng); hai nguyên nhân gốc về quyết định hoặc quy trình; kế hoạch ngân sách năm sau có lãi ước tính và giả định; một bài học viết kèm điều kiện và ngưỡng.',
  rubric: [
    'Kết quả tính bằng lãi tăng thêm: 600 × 35% − 200 = +10 triệu, không dừng ở "doanh thu tăng thêm 600 triệu".',
    'Mỗi hoạt động nằm đúng một cột Giữ / Bỏ / Thử lại và có lãi tăng thêm đúng bằng số.',
    'Tách KOL thành 2 người hiệu quả và 6 người còn lại, hoặc tìm kiếm thành tháng đầu và 2 tuần cuối.',
    'Nguyên nhân gốc nằm ở cách ra quyết định và quy trình (chia đều, không mốc dừng), không đổ lỗi cho người.',
    'Kế hoạch năm sau có lãi ước tính, nói rõ giả định lặp lại kết quả cũ và không bắt buộc tiêu hết 200 triệu.',
    'Bài học có điều kiện, ngưỡng bằng số và việc làm cụ thể để người sau dùng được.'
  ],
  model: `<p><b>Kết quả.</b> Doanh thu tăng thêm 600 triệu nhân biên 35% = 210 triệu, trừ chi 200 triệu: lãi tăng thêm chỉ +10 triệu. Ngưỡng hoà vốn của mỗi hoạt động là doanh thu tăng thêm ≥ chi ÷ 0,35 ≈ 2,86 lần chi.</p>
<table class="t"><thead><tr><th>Hoạt động</th><th class="n">Chi</th><th class="n">Doanh thu thêm</th><th class="n">Lãi tăng thêm</th><th>Cột</th><th>Bằng chứng</th></tr></thead><tbody>
<tr><td>Voucher email</td><td class="n">20</td><td class="n">180</td><td class="n">+43</td><td>Giữ</td><td>9 lần chi, vượt ngưỡng 2,86</td></tr>
<tr><td>Livestream</td><td class="n">40</td><td class="n">150</td><td class="n">+12,5</td><td>Giữ</td><td>3,75 lần chi</td></tr>
<tr><td>KOL review</td><td class="n">60</td><td class="n">120</td><td class="n">−18</td><td>Thử lại có sửa</td><td>2 KOL: 85 × 35% − 15 = +14,75; 6 KOL: 35 × 35% − 45 = −32,75</td></tr>
<tr><td>Quảng cáo tìm kiếm</td><td class="n">50</td><td class="n">110</td><td class="n">−11,5</td><td>Thử lại có sửa</td><td>Tháng đầu 90 × 35% − 30 = +1,5; 2 tuần cuối 20 × 35% − 20 = −13</td></tr>
<tr><td>Tờ rơi tại trường</td><td class="n">30</td><td class="n">40</td><td class="n">−16</td><td>Bỏ</td><td>1,33 lần chi, dưới ngưỡng</td></tr>
<tr><td><b>Tổng</b></td><td class="n">200</td><td class="n">600</td><td class="n"><b>+10</b></td><td></td><td></td></tr></tbody></table>
<p>(đơn vị: triệu đồng). <b>Nguyên nhân gốc:</b> (1) ngân sách chia theo hoạt động rồi chạy hết, không có mốc dừng, nên tìm kiếm vẫn chạy 2 tuần khi lãi đã âm; (2) KOL trả cố định 7,5 triệu mỗi người, không chọn lọc theo kết quả thử nhỏ trước.</p>
<p><b>Kế hoạch năm sau.</b> Giữ voucher 20, livestream 40, 2 KOL hiệu quả 15, tìm kiếm giới hạn 30 triệu; bỏ tờ rơi. Tổng 105 triệu, lãi ước 43 + 12,5 + 14,75 + 1,5 = 71,75 triệu, so với +10 triệu trên 200 triệu năm nay. Giả định mỗi hoạt động lặp lại kết quả cũ; không tiêu hết 200 triệu, phần còn lại để thử tối đa 30 triệu cho hoạt động mới.</p>
<p><b>Bài học.</b> Với quảng cáo tìm kiếm, đặt trần chi theo tuần và dừng khi doanh thu tăng thêm trên mỗi đồng chi xuống dưới 2,86 (biên 35%); lần này mức đó xuống 1,0 ở 2 tuần cuối.</p>`
}

});
