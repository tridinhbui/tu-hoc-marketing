/* ROADMAP — 12 tháng, 4 giai đoạn. Mỗi tuần là một việc tick được, không phải một dòng để đọc. */
const RHYTHM = [
  ['T2','45′','Một nguyên lý mới ở thư viện + tự tìm một ví dụ Việt Nam'],
  ['T3','60′','Một daily lesson, làm cả phần “Try it”'],
  ['T4','90′','Mổ một campaign, viết lại brief ngược'],
  ['T5','60′','Một brand X-Ray: viết nhận định trước, mở phân tích sau'],
  ['T6','90′','Bài tập tay: viết hoặc dựng thật'],
  ['T7','60′','Taste Training + một chương sách'],
  ['CN','45′','Tổng kết vào sổ tay: học được gì, đổi ý điều gì'],
];

const RULES = [
  'Mỗi tuần phải đẻ ra một sản phẩm nhìn được — không phải “đã đọc xong”.',
  'Luôn viết trước, đọc phân tích sau. Đọc trước là tự lừa mình.',
  'Mỗi khái niệm gắn với một ví dụ Việt Nam bạn tự tìm, không lấy ví dụ có sẵn.',
  'Ghi hết vào sổ tay. Cuối mỗi giai đoạn xuất ra đọc lại — đó là bằng chứng tiến bộ.',
];

const PHASES = [
  { id:'nen', n:'01', d:'consumer', name:'Nền',
    span:'Tháng 1 — 3',
    goal:'Gọi đúng tên mọi thứ đang diễn ra trong một chiến dịch.',
    done:'Xem một TVC hay một landing page là tách được: nhắm ai, đứng ở đâu, dùng đòn bẩy nào, đo bằng gì.',
    months:[
      { m:'Tháng 1', t:'Thị trường & khách hàng',
        prin:['segmentation','targeting','positioning','consumer-insight','jobs-to-be-done'],
        weeks:[
          ['Tuần 1','Phân khúc theo <em>dịp sử dụng</em>, không theo tuổi/giới. Chia 4 phân khúc cho một ngành bạn hiểu; mỗi phân khúc viết một câu “vì họ như vậy nên kế hoạch phải khác ở chỗ ___”. <a href="segmentation.html">Mở bàn làm việc →</a>'],
          ['Tuần 2','Viết 5 positioning statement cho cùng một sản phẩm, mỗi cái nhắm một đối thủ khác nhau. <a href="positioning.html">Mở bàn định vị →</a>'],
          ['Tuần 3','Phỏng vấn thật 5 người, 30 phút mỗi người. Không hỏi “bạn thích gì”, chỉ hỏi “kể lại lần gần nhất”. <a href="interview.html">Mở bàn phỏng vấn →</a>'],
          ['Tuần 4','Tổng hợp thành bản đồ khách hàng: 4 phân khúc × JTBD × 3 insight có trích dẫn thật. <a href="customer-map.html">Mở bàn bản đồ →</a>'],
        ],
        out:'Bản đồ khách hàng' },
      { m:'Tháng 2', t:'Thương hiệu',
        prin:['brand-equity','awareness','salience','distinctive-assets','mental-availability','category-entry-point'],
        weeks:[
          ['Tuần 5','Brand equity đứng ở đâu so với performance. Đi một vòng Brand District.'],
          ['Tuần 6','Liệt kê tài sản nhận diện của 5 thương hiệu Việt, chấm điểm “che logo đi còn nhận ra không”. <a href="assets-audit.html">Mở bàn che logo →</a>'],
          ['Tuần 7','Liệt kê 10 điểm vào category; xem thương hiệu bạn chọn chiếm được mấy cái. <a href="cep.html">Mở bàn mười cửa →</a>'],
          ['Tuần 8','Ba brand X-Ray liên tiếp, rồi tự làm một cái cho thương hiệu chưa có trên site. <a href="brand-audit.html">Mở bàn audit →</a>'],
        ],
        out:'Brand audit một thương hiệu Việt' },
      { m:'Tháng 3', t:'Kênh, phễu, tiền',
        prin:['funnel','conversion','cac','ltv','retention','referral','pricing'],
        weeks:[
          ['Tuần 9','Vẽ phễu của một sản phẩm số bạn dùng hằng ngày, đánh dấu chỗ người ta rơi.'],
          ['Tuần 10','Dựng spreadsheet thật: traffic → CVR → AOV → tần suất → LTV, rồi tính điểm hoà vốn CAC. <a href="unit-economics.html">Mở bàn tính →</a>'],
          ['Tuần 11','Cohort, retention, referral: vì sao giữ chân đắt giá hơn giành mới.'],
          ['Tuần 12','Năm mô hình giá cho cùng một sản phẩm, chọn một và bảo vệ lựa chọn đó. <a href="pricing.html">Mở bàn giá →</a>'],
        ],
        out:'Mô hình unit economics + một trang “ở mức CAC nào thì kế hoạch này chết”' },
    ]},
  { id:'tay-nghe', n:'02', d:'creative', name:'Tay nghề',
    span:'Tháng 4 — 6',
    goal:'Chuyển từ phân tích sang sản xuất.',
    done:'Viết được, dựng được, chạy được — và có số của chính mình.',
    months:[
      { m:'Tháng 4', t:'Viết', prin:['social-proof','scarcity'],
        weeks:[
          ['Tuần 13','Đặc tính → lợi ích → ý nghĩa. Mỗi ngày 10 headline cho một sản phẩm, chọn 1, ghi lý do.'],
          ['Tuần 14','Một landing page hoàn chỉnh: hero, chứng minh, xử lý phản đối, CTA.'],
          ['Tuần 15','Chuỗi 5 email onboarding.'],
          ['Tuần 16','Học cả cách dùng bẩn của bằng chứng xã hội và khan hiếm — để không dùng.'],
        ],
        out:'Landing page tự viết, tự dựng HTML, kèm phần “vì sao mỗi khối tồn tại”' },
      { m:'Tháng 5', t:'Nhìn — taste & nội dung', prin:[],
        weeks:[
          ['Tuần 17','Chạy hết Taste Training: chọn trước, đọc mổ xẻ sau.'],
          ['Tuần 18','Đọc layout: lưới, phân cấp, khoảng trắng, cỡ chữ. Không cần vẽ, cần chấm được điểm.'],
          ['Tuần 19','Một concept nội dung cho một kênh + 12 ý tưởng bài cụ thể.'],
          ['Tuần 20','Làm thật 3 bài hoặc video, đăng thật.'],
        ],
        out:'Content calendar một tháng + 3 sản phẩm đã đăng' },
      { m:'Tháng 6', t:'Chạy số', prin:['share-of-voice','conversion'],
        weeks:[
          ['Tuần 21','Đấu giá quảng cáo hoạt động thế nào, vì sao CPM nhảy.'],
          ['Tuần 22','Dựng đo lường trước khi tiêu tiền: UTM, sự kiện chuyển đổi, một dashboard tối giản.'],
          ['Tuần 23','Chạy một chiến dịch tiền thật, ngân sách nhỏ. Mục tiêu không phải lãi, mục tiêu là cầm được số.'],
          ['Tuần 24','Đọc số: cái gì là tín hiệu, cái gì là nhiễu ở quy mô nhỏ.'],
        ],
        out:'Báo cáo hậu chiến dịch: giả định — kết quả — chênh lệch — điều học được' },
    ]},
  { id:'chien-luoc', n:'03', d:'strategy', name:'Chiến lược',
    span:'Tháng 7 — 9',
    goal:'Đứng ở ghế người ra quyết định.',
    done:'Biết chọn không làm gì, và giải thích được vì sao.',
    months:[
      { m:'Tháng 7', t:'Kiến trúc chiến dịch', prin:['mental-availability','physical-availability'],
        weeks:[
          ['Tuần 25','Brief ngược 4 campaign: vấn đề kinh doanh → nhiệm vụ truyền thông → ý tưởng → thực thi → đo lường.'],
          ['Tuần 26','Brief ngược 4 campaign nữa, lần này tự chấm điểm trước khi đọc case.'],
          ['Tuần 27','Phân bổ 60/40 brand–performance: khi nào lệch được, khi nào không.'],
          ['Tuần 28','Sẵn có trong trí nhớ và sẵn có vật lý: hai chân của tăng trưởng.'],
        ],
        out:'Tám brief ngược, đóng thành một tập' },
      { m:'Tháng 8', t:'Kế hoạch & thuyết phục', prin:[],
        weeks:[
          ['Tuần 29','Ngân sách, lịch, tuyến nội dung, phân vai kênh: kênh nào để biết, kênh nào để chốt.'],
          ['Tuần 30','Nói chuyện với sếp và khách: một slide một luận điểm, số trước ý kiến.'],
          ['Tuần 31','Làm hết 7 challenge.'],
          ['Tuần 32','Học viết một trang tóm tắt mà người bận đọc trong 90 giây.'],
        ],
        out:'Bộ khung trình bày + 7 challenge đã làm' },
      { m:'Tháng 9', t:'Kế hoạch 12 tháng', prin:[],
        weeks:[
          ['Tuần 33','Chọn một doanh nghiệp thật. Phân tích thị trường và định vị.'],
          ['Tuần 34','Mục tiêu có số, chiến lược kênh, ngân sách.'],
          ['Tuần 35','Lịch triển khai và cách đo. Viết cả phần “điều gì khiến kế hoạch này sai”.'],
          ['Tuần 36','Trình bày trực tiếp cho ít nhất 2 người có nghề. Ghi lại họ phản bác chỗ nào.'],
        ],
        out:'Kế hoạch marketing 12 tháng đã bị phản biện' },
    ]},
  { id:'chuyen-sau', n:'04', d:'growth', name:'Chuyên sâu & bằng chứng',
    span:'Tháng 10 — 12',
    goal:'Chọn một hướng và có bằng chứng người ngoài xem được.',
    done:'Có portfolio với kết quả thật, không phải bài tập.',
    months:[
      { m:'Tháng 10', t:'Chọn hướng', prin:[],
        weeks:[
          ['Tuần 37','Chọn một khu vực: Brand · Creative · Consumer · Growth · Media · Strategy.'],
          ['Tuần 38','Ba cuốn chuyên sâu của hướng đó — đọc để làm, không đọc để biết.'],
          ['Tuần 39','Một dự án nhỏ đúng hướng đó.'],
          ['Tuần 40','Tìm một người đang làm nghề đó, hỏi họ chấm dự án của bạn.'],
        ],
        out:'Một dự án chuyên hướng + nhận xét của người trong nghề' },
      { m:'Tháng 11', t:'Dự án thật', prin:[],
        weeks:[
          ['Tuần 41','Nhận một việc thật: freelance nhỏ, tổ chức phi lợi nhuận, hoặc sản phẩm của chính bạn.'],
          ['Tuần 42','Điều kiện bắt buộc: mục tiêu có số, có thời hạn, có người ngoài đánh giá.'],
          ['Tuần 43','Chạy và ghi nhật ký quyết định — mỗi lần đổi hướng ghi lý do.'],
          ['Tuần 44','Kết thúc, đo, đối chiếu với mục tiêu ban đầu.'],
        ],
        out:'Một kết quả đo được, có người ngoài xác nhận' },
      { m:'Tháng 12', t:'Đóng gói', prin:[],
        weeks:[
          ['Tuần 45','Bốn tới sáu case: bối cảnh → việc tôi làm → kết quả → điều tôi làm khác đi lần sau.'],
          ['Tuần 46','Viết 3 bài công khai. Viết ra mới lộ chỗ còn lỗ hổng.'],
          ['Tuần 47','Đọc lại toàn bộ sổ tay 12 tháng.'],
          ['Tuần 48','Một trang: “tôi từng tin gì và giờ tin gì.”'],
        ],
        out:'Portfolio + một trang tự kiểm' },
    ]},
];

const READING = [
  ['01','How Brands Grow — Byron Sharp · Positioning — Ries & Trout · Obviously Awesome — April Dunford'],
  ['02','Made to Stick — Heath · Everybody Writes — Ann Handley · Building a StoryBrand — Miller'],
  ['03','Good Strategy Bad Strategy — Rumelt · The Long and the Short of It — Binet & Field · Alchemy — Rory Sutherland'],
  ['04','Ba cuốn của hướng đã chọn · Thinking, Fast and Slow — Kahneman'],
];

const SELFCHECK = [
  'Tôi có sản phẩm mới nào người ngoài xem được không?',
  'Tôi có con số thật nào của chính mình không?',
  'Tôi có đổi ý về điều gì mình từng chắc chắn không?',
  'Tôi giải thích được cho một người ngoài ngành trong 3 phút không?',
];
