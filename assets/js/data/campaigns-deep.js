/* CASE SÂU — lớp phân tích nằm trên campaigns.js (mỗi case một khoá theo id).
   Khung: Observe → Analyze → Strategize → Create → Measure. Mỗi case có: mục tiêu học · vấn đề kinh doanh · điều quan sát được vs diễn giải về khách ·
   các hướng chiến lược (do người viết dựng lại, KHÔNG phải biên bản họp của thương hiệu) · kết quả đã biết kèm nguồn, ai đo, hạn chế ·
   điều chưa biết · giải thích nhân quả kèm "điều khác cũng có thể giải thích" · giới hạn · bài làm thử · cách đo · câu hỏi không có đáp án duy nhất.
   Ba nhãn bằng chứng (campaign.html): Đã xác minh (có nguồn đối chiếu) · Giả định phân tích · Kết luận của tác giả.
   QUY TẮC: không số ROAS/doanh thu/kết quả nếu không có nguồn bấm được; không có số thì ghi vào "unknown". Đối chiếu nguồn: 17/10/2026.
   Kiểm bằng tests/case-deep.test.mjs. */
const CAMPAIGN_DEEP = {};

Object.assign(CAMPAIGN_DEEP, {

'nike-dream-crazy': {
  status: 'success', verified: '17/10/2026',
  objective: 'Phân biệt giá trị phơi sáng truyền thông với kết quả kinh doanh, và đánh giá khi nào “chọn phe” là chiến lược chứ không phải liều lĩnh.',
  problem: 'Nike kỷ niệm 30 năm “Just Do It” và cần giữ sức hút với nhóm khách trẻ, đa văn hoá. Câu hỏi chiến lược: một thương hiệu đại chúng có nên đứng cạnh một nhân vật chia rẽ để đổi lấy sự gắn bó của nhóm cốt lõi, khi biết sẽ mất một nhóm khác?',
  consumer: {
    observed: 'Phản ứng phân cực rõ. Khảo sát Morning Consult sau chiến dịch (mẫu người lớn Mỹ, không công bố sai số) cho thấy tỉ lệ không thích Nike tăng từ 7% lên 24%, thích giảm từ 76% xuống 60%.',
    hypothesis: 'Nike đặt cược rằng nhóm khách trẻ, đô thị — nhóm có sức mua và ảnh hưởng văn hoá lớn — coi việc đứng cạnh Kaepernick là tín hiệu giá trị, còn nhóm phản đối phần lớn không phải khách mục tiêu. Nike không công bố giả định này; đây là cách đọc của người viết.' },
  options: [
    { name: 'Giữ im lặng, không đưa Kaepernick ra mặt trận chính', bet: 'Tiếp tục chiến dịch kỷ niệm an toàn, dùng Kaepernick (đã ký với Nike từ 2011) ở vai phụ.', gain: 'Gần như không rủi ro tẩy chay.', cost: 'Bỏ lỡ cơ hội chạm nhóm cốt lõi; một tài sản sẵn có bị bỏ không.' },
    { name: 'Chỉ dùng Kaepernick ở kênh số', bet: 'Giới hạn phạm vi để giảm rủi ro.', gain: 'Rủi ro nằm trong tầm kiểm soát.', cost: 'Mất hiệu ứng sự kiện; thông điệp chọn phe nhưng không dám nói to.' },
    { name: 'Chọn đề tài phổ quát: vượt giới hạn thể chất', bet: 'Nói chuyện sức mạnh ý chí mà không đụng chính trị.', gain: 'Ít chia rẽ.', cost: 'Gần như mọi thương hiệu thể thao đều nói vậy; khó khác biệt.' },
    { name: 'Đặt Kaepernick ở trung tâm chiến dịch 30 năm', bet: 'Chọn phe công khai, không rút khi bị tẩy chay.', gain: 'Hiệu ứng sự kiện, khẳng định giá trị thương hiệu.', cost: 'Chấp nhận tẩy chay và rủi ro cổ phiếu ngắn hạn.', taken: 'Nike chọn hướng này; chiến dịch do Wieden+Kennedy Portland thực hiện.' } ],
  facts: [
    { t: 'Apex Marketing Group ước tính khoảng 43 triệu USD giá trị phơi sáng truyền thông trong vài ngày đầu, phần lớn trung tính đến tích cực.', who: 'Bên thứ ba ước tính', date: '4–5/9/2018', pub: 'Bloomberg 4/9/2018; MR Magazine 5/9/2018', url: 'https://mr-mag.com/colin-kaepernick-generated-43-million-in-buzz-in-24-hours-with-his-nike-ad', caveat: 'Không công bố phương pháp; không phải doanh thu. Trang Bloomberg gốc không mở được khi kiểm.' },
    { t: 'Doanh số online của Nike tăng 31% từ Chủ nhật đến thứ Ba cuối tuần Labor Day, so với +17% cùng kỳ năm trước.', who: 'Edison Trends (biên lai email của khoảng 3 triệu người Mỹ)', date: '7/9/2018', pub: 'Fortune', url: 'https://fortune.com/2018/09/07/nike-colin-kaepernick-sales/', caveat: 'Chỉ online ở Mỹ, trùng dịp lễ giảm giá, chỉ là tương quan thời gian.' },
    { t: 'Không thích Nike: 7% → 24%; thích: 76% → 60%.', who: 'Morning Consult (1.694 người trước; 5.481 người sau)', date: '6/9/2018', pub: 'CBS Chicago', url: 'https://www.cbsnews.com/amp/chicago/news/poll-says-kaepernick-hurting-nike-brand', caveat: 'Không nêu ngày khảo sát, sai số, câu hỏi. Là đối trọng với con số doanh số online.' },
    { t: 'Cổ phiếu giảm hơn 3% khi công bố rồi phục hồi, tăng khoảng 6% so với trước công bố tới 25/9/2018.', who: 'Fortune dẫn Bespoke', date: '25/9/2018', pub: 'Fortune', url: 'https://fortune.com/2018/09/25/nike-stock-today-earnings-report-colin-kaepernick-ad-campaign', caveat: 'Adidas và Puma cũng giảm tương tự trong ngày đầu. Giá cổ phiếu chịu nhiều yếu tố.' },
    { t: 'Năm tài chính 2019: doanh thu 39,1 tỷ USD (+7%), NIKE Direct 11,8 tỷ USD; Nike không quy kết quả cho riêng Dream Crazy.', who: 'Nike (báo cáo 8-K)', date: '27/6/2019', pub: 'SEC', url: 'https://www.sec.gov/Archives/edgar/data/320187/000032018719000044/q4fy19exhibit991er.htm', caveat: 'Số toàn công ty.' },
    { t: 'Grand Prix Entertainment Lions for Sport và Grand Prix Outdoor tại Cannes Lions 2019; Emmy hạng mục Outstanding Commercial 2019.', who: 'Ban giám khảo', date: '6/2019; 9/2019', pub: 'The Drum 18/6/2019', url: 'https://www.thedrum.com/news/2019/06/18/new-york-times-and-nike-win-grand-prix-cannes-lions-craft-and-entertainment', caveat: 'Giải sáng tạo, không phải bằng chứng hiệu quả kinh doanh.' } ],
  unknown: 'Doanh số hay lợi nhuận toàn cầu quy riêng cho chiến dịch, ngân sách chiến dịch, tác động lên cửa hàng truyền thống, và quy trình duyệt nội bộ (không nguồn nào nêu ai quyết định).',
  causal: [
    { claim: 'Phản ứng phân cực tạo ra lượng truyền thông lớn mà không cần mua thêm.', evidence: 'Ước tính phơi sáng khoảng 43 triệu USD trong vài ngày đầu.', other: 'Đây là ước tính của bên thứ ba về “giá trị”, không phải doanh số; Kaepernick đang là tâm điểm tin tức nên mọi thứ gắn với ông đều được đưa tin.' },
    { claim: 'Chọn đúng nhân vật là chọn thông điệp.', evidence: 'Kaepernick dẫn chuyện; film còn có nhiều vận động viên khác, từ ngôi sao tới người ít được biết.', other: 'Nike đã ký Kaepernick từ 2011: đây là kích hoạt một tài sản có sẵn. Thương hiệu khác không có tài sản tương tự sẽ không lặp lại được.' },
    { claim: 'Doanh số online tăng nhanh sau chiến dịch.', evidence: 'Edison Trends: +31% trong cuối tuần Labor Day.', other: 'Trùng dịp giảm giá; kênh digital của Nike đã tăng 36% ở quý kết thúc trước chiến dịch (Fortune 25/9/2018). Coi 31% là tương quan, không phải hiệu quả đo được của quảng cáo.' } ],
  limits: [
    'Tẩy chay có thật (#JustDont, đốt hoặc cắt logo). Chưa có nghiên cứu theo dõi dài hạn về chi phí này.',
    'Bị phê bình là “woke-washing” khi điều kiện chuỗi cung ứng và cách đối xử với vận động viên nữ mang thai của Nike bị đem ra so (bình luận và nghiên cứu học thuật, không phải số liệu bán hàng).',
    'Điều kiện thành công: nhóm khách chính ở Mỹ nghiêng về phía đồng thuận. Thương hiệu mà đa số khách nằm phía phản đối có thể mất nhiều hơn được.' ],
  practice: 'Chọn một thương hiệu bạn biết. Vẽ hai nhóm: nhóm khách cốt lõi và nhóm “sẽ rời đi nếu thương hiệu chọn phe”. Viết một câu tuyên bố giá trị và một dòng nói rõ bạn chấp nhận mất gì. Nếu nhóm rời đi cũng là nhóm mang nhiều doanh thu, bạn sẽ dừng ở đâu?',
  measure: 'Đừng kết luận từ tuần đầu. Dùng một cặp chỉ số: sức khoẻ thương hiệu theo nhóm (thích/không thích, ý định mua) đo theo thời gian, và doanh số theo kênh so với nền cùng kỳ. Phải đo cả nhóm phản đối thì mới biết “chi phí” thật.',
  reflect: [
    'Nếu Kaepernick chưa từng là vận động viên của Nike, bạn còn khuyên Nike làm chiến dịch này không? Vì sao?',
    'Chỉ dùng các số trong mục “Kết quả đã biết”, bạn nêu được cách đọc nào để Nike thắng, và cách đọc nào để doanh số tăng mà không do chiến dịch?',
    'Thương hiệu của bạn có “nhóm sẽ rời đi” nào? Bạn chấp nhận mất bao nhiêu phần doanh thu để giữ lập trường, và dựa vào đâu?' ],
  transfer: 'Không áp dụng khi thương hiệu không có tài sản nhân vật thật, khi nhóm khách chính đứng phía phản đối, hoặc khi bạn chưa chịu nổi rủi ro ngắn hạn về doanh số và nhân sự.',
  sources: [
    { t: 'Fortune: Nike sales after Kaepernick campaign', pub: 'Fortune', date: '7/9/2018', url: 'https://fortune.com/2018/09/07/nike-colin-kaepernick-sales/' },
    { t: 'Poll: Kaepernick hurting Nike brand', pub: 'CBS Chicago (Morning Consult)', date: '6/9/2018', url: 'https://www.cbsnews.com/amp/chicago/news/poll-says-kaepernick-hurting-nike-brand' },
    { t: 'Nike stock and earnings report', pub: 'Fortune', date: '25/9/2018', url: 'https://fortune.com/2018/09/25/nike-stock-today-earnings-report-colin-kaepernick-ad-campaign' },
    { t: 'Nike FY2019 Q4 earnings release', pub: 'SEC', date: '27/6/2019', url: 'https://www.sec.gov/Archives/edgar/data/320187/000032018719000044/q4fy19exhibit991er.htm' },
    { t: 'Cannes Lions 2019 Grand Prix', pub: 'The Drum', date: '18/6/2019', url: 'https://www.thedrum.com/news/2019/06/18/new-york-times-and-nike-win-grand-prix-cannes-lions-craft-and-entertainment' } ]
},

'apple-1984': {
  status: 'success', verified: '17/10/2026',
  objective: 'Tách “quảng cáo gây tiếng vang” khỏi “sản phẩm bán bền”, và học cách đọc một chiến dịch kinh điển qua cả phần hậu trường lẫn kết quả sau đó.',
  problem: 'Apple sắp ra Macintosh và cần một câu chuyện văn hoá để định nghĩa mình trong thị trường máy tính cá nhân do IBM PC chi phối, với một lần xuất hiện quốc gia duy nhất ở Super Bowl.',
  consumer: {
    observed: 'Người mua đầu tiên của Mac đến rất nhanh: theo Cult of Mac, 50.000 máy bán trong khoảng 73 ngày và 72.000 máy sau 100 ngày. Sau đó doanh số chậm lại, Apple dư công suất sản xuất.',
    hypothesis: 'Spot nói với người sợ trở thành “một con số trong hệ thống” — nhóm người dùng đầu tiên chấp nhận giá cao (2.495 USD). Nhóm đại chúng cần một câu chuyện khác (Apple sau đó phải chạy chương trình dùng thử Mac). Đây là cách đọc của người viết.' },
  options: [
    { name: 'Quảng cáo tính năng: giao diện đồ hoạ và chuột', bet: 'Giải thích sản phẩm mới bằng demo và thông số.', gain: 'Người xem hiểu cái họ sắp mua.', cost: 'Sản phẩm quá mới để diễn đạt bằng lời trong 60 giây; dễ lẫn vào quảng cáo máy tính khác.' },
    { name: 'So sánh trực tiếp với IBM PC', bet: 'Đặt Mac cạnh đối thủ lớn nhất.', gain: 'Định vị rõ.', cost: 'Kẻ nhỏ hơn đi so sánh với kẻ lớn dễ bị coi là phô trương; bảng thông số của Mac lúc đó không thắng rõ.' },
    { name: 'Phát nhiều lần trên nhiều kênh', bet: 'Mua tần suất để mua nhận biết.', gain: 'Phủ rộng, ổn định.', cost: 'Tốn kém; mất tính sự kiện.' },
    { name: 'Một spot điện ảnh phát quốc gia đúng một lần', bet: 'Kể chuyện văn hoá, không hiện sản phẩm, rồi để báo chí phát lại.', gain: 'Hiệu ứng sự kiện, khác phe với IBM.', cost: 'Hội đồng quản trị phản đối; rủi ro tất cả trong một lần.', taken: 'Apple/Chiat Day phát đúng một lần quốc gia ở Super Bowl XVIII; theo các nguồn, một phần vì không bán lại được suất 60 giây.' } ],
  facts: [
    { t: 'Phát quốc gia duy nhất vào quý ba Super Bowl XVIII ngày 22/1/1984; Macintosh ra mắt 24/1/1984. Trước đó spot có mặt ở đài KMVT (Twin Falls, Idaho) ngày 31/12/1983 và ở rạp phim từ 17/1/1984.', who: 'Nhiều nguồn thứ cấp', date: '1983–1984', pub: 'Wikipedia; Mental Floss; Cult of Mac', url: 'https://www.mentalfloss.com/article/29867/how-apples-1984-ad-was-almost-canceled', caveat: 'Một nguồn ghi ngày và tên đài khác; đa số nguồn khớp KMVT, 31/12/1983.' },
    { t: 'Hội đồng quản trị Apple phản đối spot khi xem trước (12/1983); Chiat/Day chỉ bán được suất 30 giây, nói suất 60 giây đã quá trễ để bán lại.', who: 'Mental Floss; Wikipedia (dẫn Isaacson)', date: '12/1983', pub: 'Mental Floss', url: 'https://www.mentalfloss.com/article/29867/how-apples-1984-ad-was-almost-canceled', caveat: 'Nguồn thứ cấp; chuyện hậu trường có nhiều phiên bản.' },
    { t: 'Mac bán 50.000 máy sau khoảng 73 ngày, 72.000 máy sau 100 ngày; sau đó doanh số chậm, Apple dư công suất.', who: 'Cult of Mac', date: '4–5/1984', pub: 'Cult of Mac', url: 'https://www.cultofmac.com/apple-history/mac-first-100-days', caveat: 'Wikipedia ghi 70.000 và đánh dấu cần nguồn; hai nguồn lệch về mục tiêu 50.000 hay 70.000.' },
    { t: 'Apple bán khoảng 250.000 máy Mac trong 1984, 500.000 vào tháng 9/1985, 1 triệu vào tháng 3/1987.', who: 'Macworld', date: '2015+', pub: 'Macworld', url: 'https://www.macworld.com/article/670960/the-mac-in-numbers-surprising-apple-stats.html', caveat: 'Bên thứ ba, không nêu gốc số.' },
    { t: 'Chi phí làm phim ghi khác nhau: khoảng 370.000 USD (NYT), 900.000 USD (Friedman), dưới 250.000 USD (Ridley Scott nói).', who: 'Ba nguồn mâu thuẫn', date: '1983–1984', pub: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/1984_(advertisement)', caveat: 'Nêu cả ba hoặc không nêu.' } ],
  unknown: 'Doanh số trực tiếp do spot tạo ra (chỉ có lời một người trong agency về khoảng 3,5 triệu USD ngay sau đó), giá suất phát Super Bowl, số người xem. Con số “150 triệu USD giá trị phát lại” bị Adweek gọi là huyền thoại; đừng dùng.',
  causal: [
    { claim: 'Một lần phát đúng chỗ tạo ra sự kiện.', evidence: 'Bản tin đêm đó phát lại; giải Clio và Grand Prix Cannes 1984.', other: 'Việc “chỉ một lần” một phần là ngẫu nhiên: hội đồng quản trị suýt chặn, agency không bán được suất. Đừng viết như thể đó là chiến lược khan hiếm có chủ ý.' },
    { claim: 'Câu chuyện văn hoá mở đường cho nhóm người dùng đầu tiên.', evidence: 'Doanh số 100 ngày đầu cao.', other: 'Nhóm đầu tiên không đại diện cho đại chúng; giá cao và bộ nhớ hạn chế làm doanh số chậm sau đó (suy luận của người viết).' } ],
  limits: [
    'Thành công về tiếng vang không bảo đảm doanh số bền: Mac bán nhanh rồi chậm, Apple phải đổi cách tiếp cận khách đại chúng.',
    'Hồ sơ hậu trường cho thấy ý tưởng suýt không bao giờ lên sóng; “dám làm” là một phần câu chuyện nhưng cũng có may mắn.',
    'Mô hình “đặt cược một lần” gần như không lặp lại được với thương hiệu không có sức nặng kỹ thuật như Apple lúc đó.' ],
  practice: 'Chọn một sản phẩm mới mà nhiều người chưa hiểu. Viết hai kịch bản 30 giây: một giải thích tính năng, một kể chuyện văn hoá không hiện sản phẩm. Nêu rõ kịch bản nào cần bằng chứng bổ sung ngay sau khi người xem tò mò, và bằng chứng đó nằm ở đâu.',
  measure: 'Chia hai tầng: tầng chú ý (tìm kiếm tên thương hiệu, lượt nhắc, lượt dùng thử) và tầng bán hàng (đơn theo tuần, tỉ lệ dùng thử thành mua). Một đỉnh ở tầng chú ý không phải bằng chứng cho tầng bán hàng.',
  reflect: [
    'Nếu hội đồng quản trị Apple đã bán được suất 60 giây, bạn nghĩ lịch sử quảng cáo sẽ khác thế nào? Điều đó nói gì về “chiến lược” và “may mắn”?',
    'Mac bán chậm sau 100 ngày. Theo bạn, quảng cáo nên chịu bao nhiêu trách nhiệm cho việc đó, nếu chỉ dùng dữ kiện trong mục “Kết quả đã biết”?',
    'Bạn có thể bán sản phẩm của mình bằng một câu chuyện không hiện sản phẩm không? Điều kiện nào cần có trước?' ],
  transfer: 'Không áp dụng khi sản phẩm cần được hiểu để mua (B2B, tài chính phức tạp), khi ngân sách không đủ để một lần xuất hiện đủ lớn, hoặc khi thương hiệu chưa có đủ uy tín để người xem tin vào câu chuyện.',
  sources: [
    { t: 'How Apple’s 1984 ad was almost cancelled', pub: 'Mental Floss', date: '', url: 'https://www.mentalfloss.com/article/29867/how-apples-1984-ad-was-almost-canceled' },
    { t: 'Mac’s first 100 days', pub: 'Cult of Mac', date: '2026', url: 'https://www.cultofmac.com/apple-history/mac-first-100-days' },
    { t: 'The Mac in numbers', pub: 'Macworld', date: '', url: 'https://www.macworld.com/article/670960/the-mac-in-numbers-surprising-apple-stats.html' },
    { t: '1984 (advertisement)', pub: 'Wikipedia (nguồn thứ cấp, dùng để định hướng)', date: '', url: 'https://en.wikipedia.org/wiki/1984_(advertisement)' } ]
},

'dove-real-beauty': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Phân biệt lượt xem lan truyền với hiệu quả kinh doanh, và biết cách đọc một chiến dịch “có mục đích” vừa được ca ngợi vừa bị phê bình.',
  problem: 'Dove đã theo đuổi “Real Beauty” từ 2004 và cần một nội dung đủ mạnh để chia sẻ được ở quy mô toàn cầu, mà không bị coi là quảng cáo mỹ phẩm thông thường.',
  consumer: {
    observed: 'Dove cung cấp con số của chính họ: chỉ 4% phụ nữ nói mình đẹp (MediaPost). Virginia Postrel phê phán chính con số này vì đánh đồng “đẹp” với giá trị bản thân.',
    hypothesis: 'Người xem tự thấy khoảng cách giữa cách mình tự mô tả và cách người lạ mô tả, nên ít kháng cự hơn một lời khẳng định. Đó là cơ chế thí nghiệm của film, do Dove dàn dựng — không phải một nghiên cứu khoa học.' },
  options: [
    { name: 'Quảng cáo đặc tính sản phẩm (độ ẩm, thành phần)', bet: 'Giữ lối quảng cáo mỹ phẩm quen thuộc.', gain: 'Rõ lợi ích, đo được bán hàng.', cost: 'Không phân biệt với L’Oréal, Olay, Nivea; không tận dụng nền Real Beauty.' },
    { name: 'Chỉ làm CSR (quỹ nâng cao lòng tự trọng)', bet: 'Đầu tư vào chương trình xã hội thay vì phim.', gain: 'Gắn với giá trị thật.', cost: 'Khó lan truyền; khó nối với hành vi mua.' },
    { name: 'Dùng người nổi tiếng nói về sắc đẹp thật', bet: 'Mượn uy tín cá nhân.', gain: 'Chú ý nhanh.', cost: 'Dễ giống mọi chiến dịch người nổi tiếng; rủi ro hình ảnh.' },
    { name: 'Một thí nghiệm dựng thành film chia sẻ được', bet: 'Kể bằng cơ chế để người xem tự rút kết luận.', gain: 'Lan truyền; hợp thông điệp dài hạn.', cost: 'Bị phê bình về phương pháp, tiêu chuẩn sắc đẹp, mâu thuẫn tập đoàn.', taken: 'Ogilvy Brazil thực hiện cho Dove, ra mắt 14/4/2013.' } ],
  facts: [
    { t: 'Phát hành ngày 14/4/2013 (Guinness ghi 15/4) bằng 25 ngôn ngữ ở hơn 110 quốc gia.', who: 'Dove/Ogilvy; Guinness', date: '4/2013', pub: 'Guinness World Records', url: 'https://www.guinnessworldrecords.com/world-records/most-viewed-online-video-advertisement', caveat: 'Lệch một ngày giữa các nguồn do múi giờ.' },
    { t: 'Số lượt xem ghi khác nhau theo nguồn: 114 triệu YouTube sau một tháng (Unruly), 124,9 triệu tính đến 2/11/2013 (Guinness), 163 triệu toàn cầu đến 6/2013 (Google).', who: 'Ba bên đếm khác nhau', date: '5–11/2013', pub: 'Guinness; Unruly; Think with Google', caveat: 'Nêu khoảng 114–163 triệu tuỳ nguồn; Guinness là mốc thời điểm đã lỗi thời.' },
    { t: 'Titanium Grand Prix tại Cannes Lions 2013. Hồ sơ dự giải nêu 46,4 triệu lượt xem YouTube, 1,9 triệu lượt chia sẻ Facebook và khoảng 3 tỷ lượt hiển thị truyền thông trong 10 ngày đầu.', who: 'Unilever/Ogilvy (tự công bố trong hồ sơ)', date: '24/6/2013', pub: 'MediaPost', url: 'https://www.mediapost.com/publications/article/203151/unilevers-dove-beauty-wins-cannes-titanium-gra.html', caveat: 'Tự công bố; lệch với số 114–163 triệu vì khác thời điểm đo.' },
    { t: 'Doanh số Dove tăng từ khoảng 2 tỷ lên 4 tỷ USD trong ba năm đầu của chiến dịch Real Beauty (khởi động 2004).', who: 'Ad Age 2015, dẫn qua Wikipedia', date: '2004–2015', pub: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Dove_Campaign_for_Real_Beauty', caveat: 'Đây là chiến dịch Real Beauty 2004, KHÔNG riêng Sketches 2013; khoảng thời gian ghi mâu thuẫn giữa các nguồn.' } ],
  unknown: 'Doanh số hay thị phần quy riêng cho Real Beauty Sketches 2013. Báo cáo Unilever 2013 không tách riêng chiến dịch này.',
  causal: [
    { claim: 'Một cơ chế “tự thấy” dễ lan hơn một lời khẳng định.', evidence: 'Hàng chục triệu lượt xem, nhiều triệu lượt chia sẻ trong tháng đầu; kỷ lục Guinness.', other: 'Lượt xem được hỗ trợ bởi truyền thông trả tiền và PR; số lượt xem khác nhau 50 triệu giữa các nguồn.' },
    { claim: 'Dài hạn, Real Beauty giúp Dove tăng trưởng.', evidence: 'Doanh số tăng từ khoảng 2 lên 4 tỷ USD (Ad Age).', other: 'Dove đồng thời mở rộng danh mục và thị trường; không tách được riêng Sketches.' } ],
  limits: [
    'Phương pháp: Zamora vẽ khoảng 20 phụ nữ nhưng film chỉ dùng 7; ông biết mục đích nên không phải thí nghiệm mù (Postrel, Bloomberg View 25/4/2013).',
    'Thông điệp vẫn xoay quanh ngoại hình; một số chỉ trích cho rằng người trong film chủ yếu trẻ, gầy, da sáng.',
    'Mâu thuẫn tập đoàn: Unilever còn sở hữu Axe/Lynx và Fair & Lovely; có người coi đây là “genderwashing”, có người cho rằng người tiêu dùng không nối các thương hiệu.' ],
  practice: 'Chọn một nhận định về khách hàng của bạn (“khách luôn nghĩ …”). Thiết kế một cơ chế nhỏ để khách tự thấy nhận định đó đúng hoặc sai mà không cần bạn tuyên bố. Nêu một cách khiến cơ chế của bạn thiên lệch và cách giảm thiên lệch.',
  measure: 'Tách ba lớp: lan truyền (lượt xem, chia sẻ), thay đổi thái độ (khảo sát trước/sau, theo nhóm), và hành vi mua. Chỉ lớp thứ ba mới biện minh cho ngân sách bán hàng.',
  reflect: [
    'Nếu ba trên bảy phụ nữ trong film đổi thành người khác, thông điệp có thay đổi không? Điều đó nói gì về tính phổ quát của “insight”?',
    'Dove nói chiến dịch giúp doanh số cả thương hiệu, nhưng không có số riêng cho Sketches. Bạn sẽ đo gì để biết một nội dung lan truyền có đáng đầu tư tiếp?',
    'Thương hiệu cùng tập đoàn làm điều ngược thông điệp. Khi nào điều đó làm hỏng chiến dịch, khi nào thì không?' ],
  transfer: 'Không áp dụng khi sản phẩm của bạn thật sự phụ thuộc vào cảm giác thiếu hụt của khách, khi bạn không có quyền kiểm soát tính trung thực của “thí nghiệm”, hoặc khi mục tiêu là doanh số quý này.',
  sources: [
    { t: 'Unilever’s Dove Beauty wins Cannes Titanium Grand Prix', pub: 'MediaPost', date: '24/6/2013', url: 'https://www.mediapost.com/publications/article/203151/unilevers-dove-beauty-wins-cannes-titanium-gra.html' },
    { t: 'Most viewed online video advertisement', pub: 'Guinness World Records', date: '', url: 'https://www.guinnessworldrecords.com/world-records/most-viewed-online-video-advertisement' },
    { t: 'Dove’s fake new real beauty ads', pub: 'Virginia Postrel (Bloomberg View)', date: '25/4/2013', url: 'http://www.vpostrel.com/articles/doves-fake-new-real-beauty-ads' },
    { t: 'Dove Real Beauty Sketches', pub: 'Wikipedia (nguồn thứ cấp)', date: '', url: 'https://en.wikipedia.org/wiki/Dove_Real_Beauty_Sketches' } ]
},

'coca-share': {
  status: 'success', verified: '17/10/2026',
  objective: 'Đọc đúng một case “bao bì làm media”: số liệu nào do agency tự công bố, số nào do bên thứ ba đo, và vì sao hiệu ứng ở thị trường này không tự chuyển sang thị trường khác.',
  problem: 'Giới trẻ Úc ít mua Coke thường xuyên và thấy thương hiệu xa cách. Coca-Cola cần tăng mức tiêu dùng mùa hè của nhóm trẻ mà không giảm giá.',
  consumer: {
    observed: 'Khảo sát B3 năm 2010 (qua tóm tắt WARC, chưa mở trang gốc): khoảng một nửa thanh thiếu niên và 45% thanh niên Úc không uống Coke trong 12 tháng trước.',
    hypothesis: 'Cái tên của chính mình là thứ hấp dẫn dễ nhất để người trẻ chụp, tặng, chia sẻ; đổi bao bì sẽ biến việc mua thành việc tặng. Đây là giả thuyết của người viết.' },
  options: [
    { name: 'Giảm giá và khuyến mãi mùa hè', bet: 'Mua thêm lượt tiêu dùng bằng giá.', gain: 'Nhanh, đo được.', cost: 'Không chữa quan hệ “xa cách”; kéo biên lợi nhuận.' },
    { name: 'Thêm vị mới hoặc dòng sản phẩm mới', bet: 'Mở rộng lý do thử.', gain: 'Có chuyện để nói.', cost: 'Tốn R&D, có thể ăn vào doanh số dòng chính.' },
    { name: 'Tăng tần suất quảng cáo TV', bet: 'Giữ tiếng nói thương hiệu truyền thống.', gain: 'An toàn.', cost: 'Không thay đổi cảm giác “xa cách”.' },
    { name: 'Biến bao bì thành phương tiện truyền thông cá nhân hoá', bet: 'In 150 tên phổ biến lên nhãn.', gain: 'Gắn với chia sẻ và quà tặng; tận dụng phân phối sẵn có.', cost: 'In kỹ thuật số và nhiều mã hàng đắt hơn gói chuẩn; phụ thuộc vào năng lực chuỗi cung ứng.', taken: 'Ogilvy Sydney thực hiện cho Coca-Cola Úc, chạy từ 10/2011.' } ],
  facts: [
    { t: 'Úc: tiêu dùng của nhóm thanh niên tăng 7%, hơn 18,3 triệu lượt hiển thị truyền thông, lượt truy cập trang Facebook của Coke +870%, 76.000 lon ảo được chia sẻ, 378.000 lon tuỳ chỉnh in tại Westfield.', who: 'Ogilvy (case study), Packaging News đưa lại', date: '3/6/2014', pub: 'Packaging News', url: 'https://www.packagingnews.com.au/news/how-sharing-turned-a-brand-around', caveat: 'Agency tự công bố; không tách mùa hè, thời tiết, giá, khuyến mãi khác.' },
    { t: 'Hơn 250 triệu chai và lon có tên đã bán ở Úc (dân số gần 23 triệu).', who: 'The Coca-Cola Company', date: '25/9/2014', pub: 'coca-colacompany.com', url: 'https://www.coca-colacompany.com/about-us/history/how-a-campaign-got-its-start-down-under', caveat: 'Đếm số bao bì bán ra, không phải mức tăng.' },
    { t: 'Châu Âu quý 2/2013: sản lượng Coke giảm 4% dù chiến dịch vừa vào Anh; CEO Muhtar Kent nói kết quả dưới kỳ vọng.', who: 'Marketing Week', date: '16/7/2013', pub: 'Marketing Week', url: 'https://www.marketingweek.com/share-a-coke-yet-to-pay-dividends-as-sales-slip/', caveat: 'Một quý; chiến dịch mới ra mắt.' },
    { t: 'Mỹ 2014: sản lượng Coke +0,4% và doanh thu +2,5% theo Nielsen (12 tuần đến tháng 8). Nhưng quý 3/2014 sản lượng Bắc Mỹ vẫn giảm 1%, Coca-Cola nói chiến dịch giúp giành thị phần giá trị.', who: 'Nielsen/WSJ; Coca-Cola (báo cáo quý 3)', date: '9–10/2014', pub: 'Fortune 21/10/2014; SEC', url: 'https://fortune.com/2014/10/21/coke-north-america-volume', caveat: 'Dữ liệu quét cửa hàng; chiến dịch giúp thị phần chứ không đảo chiều cả danh mục.' },
    { t: 'Creative Effectiveness Lion tại Cannes 2013 (không phải Grand Prix).', who: 'Cannes Lions; Coca-Cola', date: '2013', pub: 'Mumbrella; Coca-Cola', caveat: 'Một nguồn ghi nhầm Grand Prix; đừng dùng.' } ],
  unknown: 'Lý do chiến dịch suy yếu sau 2015–2017 (không có nguồn đáng tin), chi phí in ấn và phân phối nhiều mã hàng, và thước đo độc lập cho mức +7% ở Úc.',
  causal: [
    { claim: 'Cá nhân hoá bao bì tăng tiêu dùng nhóm trẻ.', evidence: 'Ogilvy công bố +7% tiêu dùng nhóm thanh niên; hơn 250 triệu bao bì có tên bán ra.', other: 'Số do agency/công ty tự công bố; hè là mùa cao điểm; khuyến mãi và thời tiết có thể ảnh hưởng.' },
    { claim: 'Hiệu ứng lan sang thị trường khác.', evidence: 'Mỹ 2014: Nielsen +0,4% sản lượng; Coca-Cola nói tăng thị phần giá trị.', other: 'Châu Âu 2013 lúc đầu giảm 4%; xu hướng suy giảm của nước ngọt có ga ở Mỹ vẫn mạnh (quý 3/2014 giảm 1%).' } ],
  limits: [
    'Thành công phụ thuộc năng lực chuỗi cung ứng và in kỹ thuật số quy mô lớn mà thương hiệu nhỏ khó có.',
    'Có sự cố lọc nội dung: tên Ả Rập bị bỏ ở một số thị trường (NPR 28/5/2013), danh sách chặn hơn 5.000 từ cho biển hiệu King’s Cross.',
    'Về đạo đức, mục tiêu là tăng tiêu dùng nước ngọt có đường — một điểm cần nêu khi thảo luận (suy luận của người viết).' ],
  practice: 'Chọn một sản phẩm tiêu dùng. Liệt kê ba thứ trên bao bì có thể cá nhân hoá mà không phá tài sản nhận diện, rồi tính thêm chi phí in và lưu kho nếu có 150 phiên bản. Với mức đó, doanh số tăng bao nhiêu mới hoà vốn?',
  measure: 'Doanh số theo mùa so với cùng kỳ năm trước và so với khu vực đối chứng không chạy chiến dịch; chia sẻ không phải kết quả cuối. Theo dõi cả chi phí phụ trội.',
  reflect: [
    'Tên là cá nhân, nhưng 150 tên chỉ phủ một phần dân số. Bạn xử lý những người không tìm thấy tên mình thế nào?',
    'Mỹ 2014: sản lượng quý 3 vẫn giảm 1% nhưng thị phần giá trị tăng. Bạn sẽ gọi chiến dịch này là thành công hay chưa? Dựa trên thước đo nào?',
    'Nếu bạn là thương hiệu nhỏ, phần nào của ý tưởng này vẫn dùng được khi không có HP Indigo và hệ thống phân phối của Coke?' ],
  transfer: 'Không áp dụng khi không có năng lực in số quy mô, khi sản phẩm không phải thứ để tặng hoặc chụp, hoặc khi mức độ nhận biết thương hiệu chưa đủ để cái tên thay được logo.',
  sources: [
    { t: 'How sharing turned a brand around', pub: 'Packaging News', date: '3/6/2014', url: 'https://www.packagingnews.com.au/news/how-sharing-turned-a-brand-around' },
    { t: 'How a campaign got its start down under', pub: 'The Coca-Cola Company', date: '25/9/2014', url: 'https://www.coca-colacompany.com/about-us/history/how-a-campaign-got-its-start-down-under' },
    { t: 'Share a Coke yet to pay dividends as sales slip', pub: 'Marketing Week', date: '16/7/2013', url: 'https://www.marketingweek.com/share-a-coke-yet-to-pay-dividends-as-sales-slip/' },
    { t: 'Coke North America volume', pub: 'Fortune', date: '21/10/2014', url: 'https://fortune.com/2014/10/21/coke-north-america-volume' } ]
},

'ikea-catalogue': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Phân biệt “chiến dịch lan truyền” với “chiến lược kênh”, và nhận ra điều kiện kênh cũ ngừng đáng giữ.',
  problem: 'IKEA Singapore/Malaysia cần làm cho catalogue 2015 — vốn là phần lớn ngân sách marketing — vẫn đáng được người trẻ mở ra khi mọi nội dung đã chuyển lên mạng.',
  consumer: {
    observed: 'Đến 2020 IKEA cho biết lượng truy cập web lên tới hàng tỷ lượt và doanh số online tăng 45% trong 12 tháng đến 8/2020, trong khi quan tâm tới catalogue giấy giảm (Reuters).',
    hypothesis: 'Người xem nhiều khả năng cười trước một quảng cáo nhại giới thiệu sản phẩm công nghệ vì nó tự nhận ra sự lạc hậu của catalogue; sự tự trào làm giảm kháng cự. Đây là giả thuyết của người viết.' },
  options: [
    { name: 'Bỏ catalogue sớm, chuyển hẳn sang app và web', bet: 'Chuyển ngân sách in sang kênh số ngay.', gain: 'Linh hoạt, đo được.', cost: 'Mất một kênh có thói quen cầm xem; IKEA đã làm 12 năm sau (2020).' },
    { name: 'Biến catalogue thành tạp chí cảm hứng', bet: 'Đổi định dạng thay vì đổi kênh.', gain: 'Giữ được lý do cầm lên đọc.', cost: 'Tốn biên tập; khó đo bán hàng.' },
    { name: 'Giữ nguyên, chỉ tăng tần suất quảng cáo', bet: 'Không đổi cách nói.', gain: 'An toàn.', cost: 'Không giải quyết cảm giác lỗi thời.' },
    { name: 'Nhại chính sự lỗi thời bằng một phim giới thiệu “sản phẩm”', bet: 'Giới thiệu catalogue như thiết bị mới.', gain: 'Lan truyền, tự trào đúng chỗ.', cost: 'Lan truyền không đồng nghĩa với bán hàng.', taken: 'BBH Singapore thực hiện “Experience the power of the bookbook” (đăng 3/9/2014).' } ],
  facts: [
    { t: 'Video “Experience the power of the bookbook” đăng ngày 3/9/2014 trên kênh YouTube IKEA Singapore, do BBH Singapore thực hiện cho catalogue 2015 ở Singapore và Malaysia; hơn 700.000 lượt phát lúc Dezeen đưa tin.', who: 'Dezeen; Vulcan Post', date: '4/9/2014', pub: 'Dezeen', url: 'https://www.dezeen.com/?p=535900', caveat: 'Là chiến dịch của hai thị trường, lan truyền toàn cầu — không phải chiến dịch toàn cầu của IKEA. Một nguồn ghi 16 triệu lượt xem, nguồn khác 11–12 triệu: lượt xem lệch theo nguồn.' },
    { t: 'Catalogue in 208 triệu bản năm 2011 (Guinness), đỉnh khoảng 200 triệu bản năm 2016, ấn bản cuối khoảng 40 triệu bản.', who: 'Guinness; Reuters', date: '2011–2020', pub: 'Reuters (qua Fox Business)', url: 'https://www.foxbusiness.com/retail/ikea-turns-the-page-drops-iconic-catalog-after-70-years', caveat: 'Hai số 208 và 200 triệu khác nhau do đếm phiên bản/năm.' },
    { t: 'IKEA công bố ngừng catalogue ngày 7/12/2020; doanh số online +45% trong 12 tháng đến 8/2020.', who: 'IKEA (Konrad Grüss, Inter IKEA Systems)', date: '7/12/2020', pub: 'Reuters; Inquirer 24/2/2021', url: 'https://inquirer.com/business/retail/ikea-catalogue-ending-furniture-sweden-20210224.html', caveat: 'Công ty tự nói; đại dịch là nhiễu lớn.' } ],
  unknown: 'Doanh số hay lượt vào cửa hàng quy cho Bookbook, chi phí sản xuất phim, và độ dài lối đi trung bình trong cửa hàng (chỉ có một nguồn ghi khoảng 2 km ở một cửa hàng Melbourne).',
  causal: [
    { claim: 'Tự trào đúng chỗ giúp một kênh cũ được chú ý lại.', evidence: 'Hơn 700.000 lượt phát trong những ngày đầu; chia sẻ cao.', other: 'Phim ra trước sự kiện iPhone 6 của Apple, được lợi từ chủ đề đang nóng; lượt xem không phải doanh số.' },
    { claim: 'Cửa hàng là một kênh media.', evidence: 'Lối đi dài, gần như một chiều (“Long Natural Way”).', other: 'IKEA phủ nhận việc cố ý gây lạc hướng; học giả cho rằng thiết kế kích thích mua sắm bốc đồng. “Media” là diễn giải của người viết.' } ],
  limits: [
    'Bookbook không có kết quả kinh doanh công bố; “thành công” ở đây là lan truyền.',
    'Nghịch lý với bài học “kênh cũ không chết”: sáu năm sau IKEA vẫn ngừng catalogue vì quan tâm giảm và online tăng.',
    'Catalogue giảm đồng thời với thương mại điện tử tăng (và đại dịch), nên không tách được nguyên nhân.' ],
  practice: 'Chọn một kênh “cũ” của doanh nghiệp bạn quen (tờ rơi, catalogue, email). Viết một tiêu chí để quyết định giữ hay bỏ nó (ví dụ chi phí mỗi đơn, mức độ khách tự mở), và một thử nghiệm nhỏ để đo trước khi bỏ.',
  measure: 'Đo kênh cũ bằng cùng thước với kênh mới: chi phí mỗi đơn, khách mới và khách cũ, lượt ghé cửa hàng có mã. “Tự trào” chỉ có giá trị nếu nó đưa người xem tới hành động.',
  reflect: [
    'IKEA ngừng catalogue sáu năm sau phim Bookbook. Theo bạn, thời điểm nào nên bỏ kênh cũ: khi doanh số giảm, khi chi phí vượt thu, hay sớm hơn? Vì sao?',
    'Lượt xem 700.000 hay 16 triệu: con số nào bạn sẽ dùng để báo cáo với sếp, và bạn sẽ nêu điều kiện gì kèm theo?',
    'Nhại chính mình có nhược điểm nào mà bài này chưa nhắc?' ],
  transfer: 'Không áp dụng khi kênh cũ đang là nguồn chính của khách mới, khi bạn không có thước đo để biết tự trào có đưa người xem tới hành động, hoặc khi thương hiệu chưa đủ vững để cười chính mình.',
  sources: [
    { t: 'IKEA Bookbook video', pub: 'Dezeen', date: '4/9/2014', url: 'https://www.dezeen.com/?p=535900' },
    { t: 'IKEA turns the page, drops iconic catalog', pub: 'Reuters (Fox Business)', date: '7/12/2020', url: 'https://www.foxbusiness.com/retail/ikea-turns-the-page-drops-iconic-catalog-after-70-years' },
    { t: 'IKEA catalogue ending', pub: 'Inquirer', date: '24/2/2021', url: 'https://inquirer.com/business/retail/ikea-catalogue-ending-furniture-sweden-20210224.html' },
    { t: 'Most widely read catalogue', pub: 'Guinness World Records', date: '', url: 'https://www.guinnessworldrecords.com/world-records/most-widely-read-catalogue' } ]
},

});

Object.assign(CAMPAIGN_DEEP, {

'spotify-wrapped': {
  status: 'success', verified: '17/10/2026',
  objective: 'Nhận ra điều kiện để dữ liệu người dùng thành nội dung họ muốn khoe, và vì sao một nghi lễ hằng năm cũng có thể hỏng khi chất lượng giảm.',
  problem: 'Streaming nhạc là category có kho nhạc và giá gần như nhau. Spotify cần một thứ vừa giữ người dùng, vừa kéo người mới, mà không giảm giá.',
  consumer: {
    observed: 'Người dùng tự chia sẻ dữ liệu của mình ở quy mô lớn: Spotify công bố hơn 200 triệu người dùng tương tác trong 24 giờ đầu Wrapped 2025 và hơn 500 triệu lượt chia sẻ (tính cả chia sẻ trong app, ảnh chụp màn hình, tải về).',
    hypothesis: 'Người ta chia sẻ khi tấm thẻ nói hộ “tôi là ai”, không phải vì yêu thương hiệu. Đây là cách đọc của người viết; Spotify không công bố nghiên cứu động cơ.' },
  options: [
    { name: 'Bản tổng kết cập nhật liên tục theo tháng', bet: 'Cho người dùng xem số liệu bất cứ lúc nào.', gain: 'Dùng thường xuyên.', cost: 'Mất tính sự kiện; không có “khoảnh khắc chia sẻ”.' },
    { name: 'Chỉ làm quảng cáo thương hiệu thông thường', bet: 'Mua media để nói về kho nhạc.', gain: 'Kiểm soát thông điệp.', cost: 'Khó khác biệt khi kho nhạc giống nhau.' },
    { name: 'Một dịp cố định mỗi cuối năm, trả dữ liệu thành “chân dung”', bet: 'Biến dữ liệu thành nội dung chia sẻ.', gain: 'Nghi lễ, nội dung tự lan.', cost: 'Phụ thuộc chất lượng mỗi năm; vấn đề riêng tư.', taken: 'Bắt đầu từ “Year in Music” 2015 (hơn 5 triệu người dùng, theo Spotify), đổi tên Wrapped 2016, thành story trong app từ 2019.' } ],
  facts: [
    { t: 'Spotify tự dẫn gốc từ “Year in Music” 2015 với hơn 5 triệu người dùng, đổi tên “Wrapped” năm 2016. Định dạng story trong app có từ 2019.', who: 'Spotify; Wikipedia (dẫn thông cáo 5/12/2019)', date: '2015–2019', pub: 'Spotify Newsroom', url: 'https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/', caveat: 'Spotify tự công bố, không nêu định nghĩa “người dùng”.' },
    { t: 'Wrapped 2023: 227 triệu người dùng hoạt động hàng tháng tương tác.', who: 'Spotify', date: '12/2023', pub: 'Spotify Newsroom', url: 'https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/', caveat: 'Tự công bố, không có số chia sẻ.' },
    { t: 'Wrapped 2025: hơn 200 triệu người dùng tương tác trong 24 giờ đầu (+19%), hơn 500 triệu lượt chia sẻ (+41%); “tương tác” nghĩa là xem ít nhất một story.', who: 'Spotify', date: '4/12/2025', pub: 'Music Business Worldwide', url: 'https://www.musicbusinessworldwide.com/spotify-wrapped-campaign-hit-200m-engaged-users-in-24-hours-a-19-yoy-increase', caveat: 'Số người dùng Spotify cũng tăng, nên tăng số tuyệt đối không đo chất lượng chiến dịch.' },
    { t: 'Sau Wrapped 2024, CARMA ghi tỉ lệ cảm xúc tích cực về Spotify giảm từ 50,5% xuống 41,5%, tiêu cực tăng từ 8,3% lên 13,6%.', who: 'CARMA', date: '12/2024', pub: 'Marketing-Interactive', url: 'https://www.marketing-interactive.com/Spotify-brand-sentiments-dip-after-Wrapped-2024\'s-use-of-AI', caveat: 'Không rõ phương pháp; Truescope nói phần lớn thảo luận trung tính.' } ],
  unknown: 'Số người dùng mới hoặc thuê bao trả phí do Wrapped mang lại, chi phí chiến dịch, và số liệu tổng 2024 (con số 245 triệu chưa xác minh).',
  causal: [
    { claim: 'Dữ liệu cá nhân thành nội dung khoe được nên người dùng lan truyền thay thương hiệu.', evidence: 'Hơn 500 triệu lượt chia sẻ trong 24 giờ đầu năm 2025.', other: 'Spotify cũng chủ động đẩy Wrapped (tính năng chia sẻ tích hợp, quảng bá); số người dùng nền tăng; “chia sẻ” gồm cả tải về.' },
    { claim: 'Tính chu kỳ tạo ra sự chờ đợi.', evidence: 'Wrapped 2024 ra muộn hơn và bị chê “chờ lâu”.', other: 'Cũng có thể phần lớn tiếng chê đến từ nội dung (thiếu thể loại, album hàng đầu, nhãn kỳ lạ), không từ thời điểm.' } ],
  limits: [
    'Wrapped 2024 bị chê (thiếu thể loại và album hàng đầu, nhãn “Music Evolution” vô nghĩa, podcast AI): nghi lễ hằng năm cũng có thể hỏng nếu chất lượng giảm.',
    'Phô bày dữ liệu cá nhân; ngưỡng thoải mái khi chia sẻ khác nhau giữa người dùng.',
    'Chỉ hoạt động khi sản phẩm tạo ra dữ liệu đủ dày và đủ tự hào để khoe.' ],
  practice: 'Chọn một sản phẩm bạn dùng hằng ngày. Liệt kê ba dữ liệu nó thu thập mà bạn sẵn lòng khoe, và ba dữ liệu bạn không muốn ai thấy. Thiết kế một “thẻ” cho dữ liệu đầu tiên và nêu điều kiện để nó không trở nên đáng xấu hổ với người dùng ít hoạt động.',
  measure: 'Tỉ lệ người dùng mở, chia sẻ, và quay lại sau 7 ngày; người dùng mới đến từ link chia sẻ có mã theo dõi; cảm xúc theo nhóm. Theo dõi riêng nhóm người dùng mỏng.',
  reflect: [
    'App của bạn có đủ dữ liệu dày để làm một “Wrapped” không? Nếu 80% người dùng chỉ mở vài lần, bạn làm gì?',
    'Wrapped 2024 bị chê dù số người dùng tăng. Bạn dùng chỉ số nào để biết chất lượng đang giảm trước khi dư luận lên tiếng?',
    'Việc người dùng tự chia sẻ dữ liệu cá nhân có giới hạn đạo đức nào không?' ],
  transfer: 'Không áp dụng khi sản phẩm không tạo dữ liệu đủ dày hoặc đủ thú vị, khi người dùng không muốn công khai thói quen (ví dụ y tế, tài chính), hoặc khi bạn không có nguồn lực làm tốt mỗi năm.',
  sources: [
    { t: '10 years of Spotify Wrapped', pub: 'Spotify Newsroom', date: '4/12/2024', url: 'https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/' },
    { t: 'Spotify Wrapped campaign hit 200M engaged users in 24 hours', pub: 'Music Business Worldwide', date: '8/12/2025', url: 'https://www.musicbusinessworldwide.com/spotify-wrapped-campaign-hit-200m-engaged-users-in-24-hours-a-19-yoy-increase' },
    { t: 'Spotify Wrapped 2024 users furious', pub: 'Forbes Australia', date: '5/12/2024', url: 'https://www.forbes.com.au/news/world-news/spotify-wrapped-is-here-for-2024-and-users-are-furious/' } ]
},

'baemin-vietnam': {
  status: 'failure', verified: '17/10/2026',
  objective: 'Hiểu vì sao thương hiệu được mến vẫn không cứu được cấu trúc chi phí, và tách “thiện cảm” khỏi “thị phần” khi đánh giá một chiến dịch bản địa hoá.',
  problem: 'Baemin vào Việt Nam năm 2019, sau GrabFood và các ứng dụng khác, trong thị trường mà đối thủ có siêu ứng dụng hoặc sàn thương mại điện tử đỡ chi phí. Câu hỏi: giành chỗ đứng bằng gì khi không đủ vốn đốt tiền lâu dài?',
  consumer: {
    observed: 'Một bài của Vietcetera mô tả Baemin được giới trẻ yêu mến; Q&Me xếp Baemin số một về mức hài lòng giao đồ ăn năm 2020 và 2021 — nhưng do Woowa tự công bố, không có cỡ mẫu.',
    hypothesis: 'Giọng điệu thân mật, dí dỏm gắn với từng quận khiến người trẻ thấy thương hiệu “của mình”. Đây là cách đọc của người viết; không có dữ liệu cho thấy giọng nói tạo ra thị phần đáng kể.' },
  options: [
    { name: 'Tập trung vài quận có mật độ cao', bet: 'Làm sâu thay vì mở 21 thành phố.', gain: 'Chi phí giao hàng và khuyến mãi gọn hơn.', cost: 'Chậm có quy mô; khó cạnh tranh với đối thủ phủ toàn quốc.' },
    { name: 'Cạnh tranh bằng khuyến mãi sâu', bet: 'Theo đối thủ đốt tiền.', gain: 'Nhanh có đơn.', cost: 'Cần vốn dài hạn mà Baemin hết sau vài năm.' },
    { name: 'Rút sớm hơn', bet: 'Dừng lỗ trước khi vốn đầu tư thu hẹp.', gain: 'Giảm lỗ.', cost: 'Bỏ thị trường lớn.' },
    { name: 'Xây thương hiệu bản địa với giọng nói riêng', bet: 'Giọng vần vè gắn với quận, màu xanh mint, gom quán theo quận.', gain: 'Thiện cảm, khác biệt về cảm xúc.', cost: 'Không giải quyết bài toán đơn vị kinh tế.', taken: 'Baemin triển khai giọng nói địa phương hoá 2019–2023, rồi thông báo ngừng 24/11/2023.' } ],
  facts: [
    { t: 'Thị phần GMV giao đồ ăn Việt Nam 2022: GrabFood 45%, ShopeeFood 41%, Baemin 12%, Gojek 2%; tổng chi tiêu khoảng 1,1 tỷ USD.', who: 'Momentum Works (qua báo trích lại)', date: '2022', pub: 'Tuổi Trẻ News 24/11/2023', url: 'https://news.tuoitre.vn/news/business/20231124/skorean-food-delivery-firm-baemin-to-withdraw-from-vietnam-next-month/76928.html', caveat: 'Ước tính bên thứ ba; không mở được báo cáo gốc.' },
    { t: 'Baemin thông báo ngừng hoạt động ngày 24/11/2023, đặt hàng đến 7/12/2023; lý do chính thức là khó khăn kinh tế toàn cầu và cạnh tranh gay gắt.', who: 'Baemin Việt Nam', date: '24/11/2023', pub: 'Tuổi Trẻ News; VIR', url: 'https://vir.com.vn/food-delivery-firm-baemin-bids-farewell-to-vietnam-107158.html', caveat: 'Là lời công ty, không phải phân tích độc lập.' },
    { t: 'CEO Delivery Hero nói với Reuters (8/2023) mảng Việt Nam chưa từng có lãi; tập đoàn tập trung vào các thị trường mình dẫn đầu.', who: 'Báo chí trích Delivery Hero', date: '8–11/2023', pub: 'KED Global; VIR', url: 'http://www.kedglobal.com/newsAmp/ked202311270006', caveat: 'Không mở được bản Reuters gốc.' },
    { t: 'Từ 9/2023 Baemin cắt nhân sự, thu hẹp còn Hà Nội, TP.HCM và Đà Nẵng. Năm 2026 các pháp nhân Việt Nam của Woowa đang thanh lý.', who: 'Vietcetera; Korea JoongAng Daily', date: '9/2023; 4/2026', pub: 'Korea JoongAng Daily', url: 'https://www.koreajoongangdaily.com/business/baemin-operator-woowa-brothers-pull-out-of-vietnam-after-failing-to-find-footing/12528181', caveat: 'Không tìm thấy lỗ hằng năm của Baemin Việt Nam.' } ],
  unknown: 'Doanh thu, số người dùng, tổng lỗ 2019–2023 của Baemin Việt Nam; không có nguồn nào cho biết Baemin Việt Nam sau đó được chuyển nhượng hay đổi thành thương hiệu nào.',
  causal: [
    { claim: 'Thiện cảm thương hiệu không bù được cấu trúc chi phí khi đối thủ có nguồn bù lỗ chéo.', evidence: 'Thị phần 12% (2022); Delivery Hero nói mảng này chưa từng có lãi.', other: 'Vietcetera nêu thêm: hết vốn duy trì mã giảm sâu, nhà hàng sau Covid cắt chiết khấu 15–20%, ứng dụng bị lag, ít quán; bối cảnh lãi suất cao và “mùa đông gọi vốn”.' },
    { claim: 'Giọng nói địa phương tạo thiện cảm.', evidence: 'Các bài phân tích chiến dịch OOH vần theo quận (Diễn đàn Doanh nghiệp, 7/2021).', other: 'Baemin cũng khuyến mãi rất mạnh ở giai đoạn đầu; không thể tách thiện cảm do giọng nói khỏi thiện cảm do mã giảm giá.' } ],
  limits: [
    'Rút khỏi thị trường không thể quy riêng cho marketing: có yếu tố vốn, nhà hàng, vận hành, và quyết định cấp tập đoàn.',
    'Số thị phần và xếp hạng hài lòng chủ yếu từ bên liên quan hoặc qua báo trích lại.',
    'Hai đối thủ nhỏ (Baemin, Gojek) cùng rút khỏi Việt Nam trong năm 2023–2024, gợi ý vấn đề của vị thế thứ ba trong một thị trường dồn về hai tay chơi.' ],
  practice: 'Giả sử bạn là Baemin năm 2020. Lập bảng một dòng cho mỗi chặng: giọng nói thương hiệu (đo bằng gì), khuyến mãi (chi bao nhiêu/đơn), nhà hàng (chiết khấu), tài xế (thu nhập/đơn). Chỉ ra chặng nào quyết định bạn có còn sống sau 3 năm.',
  measure: 'Đo song song thiện cảm (khảo sát theo nhóm) và đơn vị kinh tế (lãi/lỗ mỗi đơn sau khuyến mãi, tỉ lệ khách quay lại không mã giảm). Thiện cảm tăng mà lỗ mỗi đơn không giảm là tín hiệu cảnh báo.',
  reflect: [
    'Nếu bạn nắm hết dữ liệu của Baemin, bạn sẽ khuyên rút sớm hơn, tập trung hẹp hơn, hay đốt tiền thêm? Dựa vào đâu?',
    'Bài học “giọng nói là tài sản đối thủ khó sao chép” còn đúng không khi sản phẩm rút? Bạn muốn điều chỉnh bài học đó thế nào?',
    'Thương hiệu của bạn có “vị thế thứ ba” nào không? Lợi thế nào là thật nếu đối thủ lớn có nguồn bù lỗ?' ],
  transfer: 'Không áp dụng khi cuộc chơi phụ thuộc quy mô và vốn hơn là cảm xúc, hoặc khi bạn không kiểm soát được cấu trúc chi phí. Giọng nói riêng chỉ thật sự hữu ích khi đơn vị kinh tế đã sống được.',
  sources: [
    { t: 'Baemin to withdraw from Vietnam next month', pub: 'Tuổi Trẻ News', date: '24/11/2023', url: 'https://news.tuoitre.vn/news/business/20231124/skorean-food-delivery-firm-baemin-to-withdraw-from-vietnam-next-month/76928.html' },
    { t: 'Baemin bids farewell to Vietnam', pub: 'VIR', date: '26/11/2023', url: 'https://vir.com.vn/food-delivery-firm-baemin-bids-farewell-to-vietnam-107158.html' },
    { t: 'Delivery Hero to close Baemin Vietnam', pub: 'KED Global', date: '27/11/2023', url: 'http://www.kedglobal.com/newsAmp/ked202311270006' },
    { t: 'Được giới trẻ yêu mến, tại sao Baemin phải rút khỏi Việt Nam', pub: 'Vietcetera', date: '25/11/2023', url: 'https://vietcetera.com/amp/vn/duoc-gioi-tre-yeu-men-tai-sao-baemin-phai-rut-khoi-viet-nam' },
    { t: 'Baemin operator Woowa Brothers pulls out of Vietnam', pub: 'Korea JoongAng Daily', date: '12/4/2026', url: 'https://www.koreajoongangdaily.com/business/baemin-operator-woowa-brothers-pull-out-of-vietnam-after-failing-to-find-footing/12528181' } ]
},

'momo-lac-xi': {
  status: 'success', verified: '17/10/2026',
  objective: 'Phân tích một trò chơi theo mùa như một cỗ máy tăng trưởng: động cơ xã hội, động cơ tiền thưởng, và phễu kích hoạt đứng sau nó.',
  problem: 'Ví điện tử cần lôi kéo người dùng mở ví, liên kết ngân hàng và chuyển tiền trong một category mà người dùng thường có một ví chính. Tết là cơ hội gắn vào một hành vi gửi tiền đã có.',
  consumer: {
    observed: 'Hàng triệu người chơi tham gia mỗi mùa theo số MoMo tự công bố (2019: hơn 5 triệu; 2021: hơn 11 triệu; 2022: hơn 12 triệu), nhưng “người chơi” không được định nghĩa và gồm cả người dùng sẵn có.',
    hypothesis: 'Lì xì là dịp nổi bật nhất trong năm để việc gửi tiền cho nhau là hành vi bình thường; trò chơi sưu tầm biến việc đó thành cơ hội mời bạn. Đây là diễn giải của người viết.' },
  options: [
    { name: 'Hoàn tiền/chiết khấu giao dịch trực tiếp', bet: 'Trả tiền cho mỗi lần dùng ví.', gain: 'Dễ hiểu, đo được.', cost: 'Không lan truyền; dễ bị đối thủ sao chép.' },
    { name: 'Thưởng tiền mặt cho giới thiệu bạn', bet: 'Trả cho người giới thiệu.', gain: 'Lan nhanh.', cost: 'Thu hút người săn thưởng; chi phí mỗi người dùng cao.' },
    { name: 'Gắn với thanh toán hoá đơn/siêu thị', bet: 'Tạo thói quen sử dụng đều.', gain: 'Hành vi lặp lại.', cost: 'Chậm, cần đối tác.' },
    { name: 'Trò chơi sưu tầm theo mùa Tết có nhiệm vụ mời bạn', bet: 'Lắc nhận thưởng, trao đổi vật phẩm, thêm lượt khi mời bạn.', gain: 'Lan theo quan hệ xã hội, lặp lại mỗi năm.', cost: 'Chi phí giải thưởng lớn; cần tuân thủ quy định khuyến mại.', taken: 'MoMo chạy mỗi mùa Tết từ 2019 (“Lắc heo vàng”), cơ chế thay đổi qua các năm.' } ],
  facts: [
    { t: '2019 (21/1–24/2): hơn 5 triệu người chơi, khoảng 100 triệu lượt lắc, 109.212 người sưu tập đủ 12 con giáp; quỹ chia thưởng nâng từ 2 lên 5 tỷ đồng.', who: 'MoMo', date: '27/2/2019', pub: 'VnEconomy', url: 'https://vneconomy.vn/cung-chia-5-ty-ruoc-loc-dau-nam-20190227091601827.htm', caveat: 'Tự công bố; thông cáo 2022 lại nói năm đầu có 4 triệu người.' },
    { t: '2021: hơn 11 triệu người chơi, gần 400 triệu lượt lắc, tổng giải thưởng công bố 300 tỷ đồng.', who: 'MoMo', date: '11/3/2021', pub: 'Thị trường Tài chính Tiền tệ', url: 'https://thitruongtaichinhtiente.vn/lac-xi-2021-ve-dich-thanh-cong-voi-hon-11-trieu-nguoi-tham-gia-33686.html', caveat: '“300 tỷ” là tổng giá trị giải quảng bá, không phải chi phí thực.' },
    { t: '2022: hơn 12 triệu người chơi, khoảng 300 triệu lượt lắc, hơn 100.000 người sưu tập đủ 8 món.', who: 'MoMo (thông cáo)', date: '1/3/2022', pub: 'momo.vn', url: 'https://www.momo.vn/tin-tuc/thong-cao-bao-chi/lac-xi-2022-ve-dich-hon-12-trieu-nguoi-choi-270-2479', caveat: 'Tự công bố; không công bố chi phí hay số giải.' },
    { t: '2023: chương trình giới thiệu thưởng cả người giới thiệu lẫn người mới một gói quà trị giá 500.000 đồng; người mới phải liên kết ngân hàng và nạp tiền. Mỗi lượt giới thiệu được 5 lượt Lắc Xì và 1 “bảo vật hiếm”.', who: 'MoMo (thể lệ)', date: '12/1/2023', pub: 'momo.vn', url: 'https://www.momo.vn/tin-tuc/khuyen-mai/doc-la-momo-gioi-thieu-momo-ruoc-tron-combo-10-3871', caveat: 'Chỉ là thể lệ một năm; năm khác khác.' } ],
  unknown: 'Chi phí thật của giải thưởng, số người mới nhờ giới thiệu, tỉ lệ người chơi thành người dùng chuyển tiền thường xuyên, và số tổng kết 2023–2024. M-Service lỗ ròng 1.150 tỷ đồng (2022) và 287 tỷ đồng (2023) — số công ty, không tách được Lắc Xì.',
  causal: [
    { claim: 'Trò chơi biến người dùng thành kênh phân phối.', evidence: 'Cơ chế thêm lượt khi mời bạn (2021, 2023); số người chơi tự công bố tăng từ 2019 đến 2022.', other: 'Quà tiền thật (gói 500.000 đồng) là động lực lớn, không chỉ “rủ nhau chơi”; “người chơi” gồm cả người dùng sẵn có.' },
    { claim: 'Trò chơi là phễu kích hoạt ví.', evidence: 'Điều kiện nhận thưởng gắn với xác thực và liên kết ngân hàng (thể lệ 2021, 2023).', other: 'Không có số chuyển đổi công bố; Covid cũng đẩy thanh toán không tiền mặt.' } ],
  limits: [
    'Đây là chiến dịch khuyến mại có ngân sách lớn, không chỉ nghi lễ xã hội; “300 tỷ” và “100 tỷ” là giá trị giải quảng bá.',
    'Chương trình bốc thăm trúng thưởng thuộc phạm vi quy định khuyến mại (chưa đối chiếu được văn bản gốc trong lần kiểm này): cần tư vấn pháp lý trước khi sao chép.',
    'Số người chơi tự công bố, định nghĩa không rõ.' ],
  practice: 'Thiết kế một trò chơi mùa vụ cho sản phẩm của bạn: nêu hành vi xã hội bạn gắn vào, phần thưởng, nhiệm vụ mời bạn, và phễu từ người chơi đến khách thật. Ước tính chi phí mỗi khách mới ở ba kịch bản tỉ lệ chuyển đổi.',
  measure: 'Người chơi mới (không phải tổng người chơi), tỉ lệ hoàn thành xác thực, giao dịch đầu tiên, giữ chân sau 30 ngày; chi phí thưởng trên mỗi người dùng hoạt động sau mùa.',
  reflect: [
    'Nếu bỏ hết quà tiền thật, trò chơi còn chạy không? Bạn dựa vào đâu để dự đoán?',
    'MoMo công bố số người chơi nhưng không công bố chi phí. Bạn cần thêm số nào để kết luận chiến dịch “đáng”?',
    'Khi nào việc biến người dùng thành kênh phân phối gây hại cho trải nghiệm hoặc niềm tin?' ],
  transfer: 'Không áp dụng khi sản phẩm không gắn được vào một hành vi xã hội đã tồn tại, khi bạn không chịu nổi chi phí thưởng, hoặc khi quy định khuyến mại không cho phép cơ chế tương tự.',
  sources: [
    { t: 'Cùng chia 5 tỷ, rước lộc đầu năm', pub: 'VnEconomy', date: '27/2/2019', url: 'https://vneconomy.vn/cung-chia-5-ty-ruoc-loc-dau-nam-20190227091601827.htm' },
    { t: 'Lắc Xì 2021 về đích với hơn 11 triệu người tham gia', pub: 'Thị trường Tài chính Tiền tệ', date: '11/3/2021', url: 'https://thitruongtaichinhtiente.vn/lac-xi-2021-ve-dich-thanh-cong-voi-hon-11-trieu-nguoi-tham-gia-33686.html' },
    { t: 'Lắc Xì 2022 về đích: hơn 12 triệu người chơi', pub: 'MoMo', date: '1/3/2022', url: 'https://www.momo.vn/tin-tuc/thong-cao-bao-chi/lac-xi-2022-ve-dich-hon-12-trieu-nguoi-choi-270-2479' },
    { t: 'MoMo giới thiệu MoMo, rước trọn combo', pub: 'MoMo', date: '12/1/2023', url: 'https://www.momo.vn/tin-tuc/khuyen-mai/doc-la-momo-gioi-thieu-momo-ruoc-tron-combo-10-3871' } ]
},

'katinat-sao-la': {
  status: 'failure', verified: '17/10/2026',
  objective: 'Đọc một khủng hoảng truyền thông qua ba lăng kính: cách đóng khung, thời điểm và quy mô, thay vì chỉ qua “ý định tốt hay xấu”.',
  problem: 'Sau bão Yagi (9/2024), một chuỗi cà phê muốn đóng góp cứu trợ và truyền thông việc đó, nhưng chọn cách trích theo doanh số.',
  consumer: {
    observed: 'Trong ngày 12/9/2024, báo chí đếm hàng chục nghìn lượt phản ứng giận dữ trên bài đăng (số khác nhau theo nguồn và thời điểm đếm: hơn 39.000, hơn 46.000, gần 50.000).',
    hypothesis: 'Trong khoảnh khắc thiên tai, cách diễn đạt “mua thì mới ủng hộ” dễ bị đọc là lợi dụng; 1.000 đồng trên ly 50.000–70.000 đồng làm cảm giác đó mạnh hơn. Cách đọc này là của người viết dựa trên bình luận báo chí.' },
  options: [
    { name: 'Ủng hộ một khoản cố định, rồi công bố', bet: 'Chuyển tiền trước, thông báo số tiền và nơi nhận.', gain: 'Không gắn với doanh số, rõ ràng.', cost: 'Không có hiệu ứng “mua ủng hộ”; ít chuyện để kể.' },
    { name: 'Mời khách cùng đóng góp tại quầy', bet: 'Khách tự quyên, thương hiệu cộng thêm.', gain: 'Giữ quyền lựa chọn cho khách.', cost: 'Tốn vận hành; thu được ít hơn dự tính.' },
    { name: 'Không truyền thông', bet: 'Chỉ làm, không nói.', gain: 'Tránh bị chê.', cost: 'Khó huy động khách; bỏ lỡ công khai minh bạch.' },
    { name: 'Trích 1.000 đồng mỗi ly bán ra trong khoảng thời gian', bet: 'Gắn đóng góp với doanh số.', gain: 'Khuyến khích khách mua ủng hộ.', cost: 'Bị đọc là lợi dụng; thời hạn dài làm chậm cứu trợ.', taken: 'Katinat đăng tối 11/9/2024, áp dụng 12/9–30/9/2024.' } ],
  facts: [
    { t: 'Tối 11/9/2024, Katinat đăng bài trích 1.000 đồng cho mỗi ly bán ra từ 12/9 đến hết 30/9, hẹn công bố số tiền thực tế ngày 1/10.', who: 'Báo chí', date: '11–12/9/2024', pub: 'Znews', url: 'https://znews.vn/katinat-xin-loi-post1497393.html', caveat: '' },
    { t: 'Chiều 12/9, khoảng 20 giờ sau bài đầu, Katinat xin lỗi và công bố chuyển 1 tỷ đồng cho Ban Cứu trợ Trung ương, MTTQ Việt Nam.', who: 'Tuổi Trẻ News; Vietcetera', date: '12–13/9/2024', pub: 'Tuổi Trẻ News', url: 'https://news.tuoitre.vn/coffee-tea-chain-katinat-apologizes-for-controversial-charity-campaign-for-typhoon-yagi-victims-10381931.htm', caveat: 'Các báo khác nhau: 1 tỷ là “ứng trước” tương đương 1 triệu ly × 1.000 đồng (VnBusiness, Vietcetera) hay không lấy từ chiến dịch gây tranh cãi (Tuổi Trẻ News).' },
    { t: 'Quy mô doanh nghiệp (ước tính bên thứ ba): khoảng 73 cửa hàng, doanh thu 2023 gần 470 tỷ đồng, thị phần 1,35% chuỗi cà phê.', who: 'Vietdata, qua VnBusiness', date: '2024', pub: 'VnBusiness', url: 'https://vnbusiness.vn/nhan-bao-phan-no-vi-tuyen-bo-trich-1000-dongly-nuoc-ban-ra-de-ung-ho-khac-phuc-thien-tai-chuoi-cafe-katinat-lam-an-ra-sao.html', caveat: 'Số cửa hàng khác nhau theo nguồn (hơn 60, hơn 70, 73).' } ],
  unknown: 'Tác động đến doanh số hoặc nhận biết thương hiệu (không có số đo sau sự kiện), và bản công bố số tiền thực tế ngày 1/10/2024 (không tìm thấy). Vì vậy đừng gọi đây là “thất bại kinh doanh”; chỉ nói đây là một thất bại về truyền thông và thời điểm.',
  causal: [
    { claim: 'Cách đóng khung “mua nhiều thì ủng hộ nhiều” biến nỗi đau chung thành điều kiện bán hàng.', evidence: 'Phản ứng dữ dội trong vòng một ngày; báo chí gọi đó là “cứu trợ có điều kiện”.', other: 'Bối cảnh bão lũ khiến mọi bài đăng thương mại bị soi kỹ; Katinat vốn là chuỗi có lượng thảo luận lớn nhất (YouNet Media).' },
    { claim: 'Quy mô và thời điểm làm vấn đề nặng thêm.', evidence: '1.000 đồng so với giá ly 50.000–70.000 đồng; hạn 30/9 và công bố 1/10 dù cứu trợ cần nhanh.', other: 'Vietcetera nêu hiệu ứng đóng khung: cùng cam kết nhưng “1 tỷ” nghe lớn hơn “1.000 đồng một ly”.' } ],
  limits: [
    'Không phải mọi gắn kết quyên góp với doanh số đều bị chê: Laurier (1.000 đồng/sản phẩm) và MegRhythm (10.000 đồng/sản phẩm) quyên góp cho quỹ Nơ Hồng năm 2023 được khen (Diễn đàn Doanh nghiệp).',
    'Có người bênh quyền của doanh nghiệp được làm từ thiện theo cách của mình; có kêu gọi tẩy chay nhưng không có số liệu doanh thu.',
    'Các báo mâu thuẫn về bản chất khoản 1 tỷ đồng nên không nên khẳng định cách thương hiệu “sửa sai” là đủ.' ],
  practice: 'Viết lại thông báo của Katinat theo ba phương án (cố định, quyên góp cùng khách, không truyền thông) và nêu với mỗi phương án: ai chịu chi phí, khi nào công bố, rủi ro bị đọc thế nào. Chọn một và nói rõ điều bạn chấp nhận.',
  measure: 'Khủng hoảng đo bằng cảm xúc theo thời gian (đếm lượt giận dữ theo giờ), nội dung bình luận, và sau đó doanh số/độ nhận biết so với nền. Phải có nền trước sự kiện thì mới đo được tác động.',
  reflect: [
    'Nếu Katinat đăng cùng thông điệp nhưng ba tuần sau bão thay vì trong tuần bão, phản ứng sẽ khác thế nào? Điều đó nói gì về vai trò thời điểm?',
    'Đóng góp cố định 1 tỷ đồng và “1.000 đồng/ly” có thể ra cùng số tiền. Vì sao công chúng đọc chúng khác nhau?',
    'Bạn sẽ công bố cái gì, ở đâu, khi nào để thể hiện minh bạch mà không bị coi là khoe?' ],
  transfer: 'Bài học này gắn với bối cảnh thiên tai, khi cảm giác công bằng và nhu cầu khẩn cấp cao. Với cause marketing dài hạn, được lên kế hoạch trước và minh bạch số tiền, kết luận có thể khác.',
  sources: [
    { t: 'Katinat xin lỗi', pub: 'Znews', date: '12/9/2024', url: 'https://znews.vn/katinat-xin-loi-post1497393.html' },
    { t: 'Katinat apologizes for controversial charity campaign for Typhoon Yagi victims', pub: 'Tuổi Trẻ News', date: '13/9/2024', url: 'https://news.tuoitre.vn/coffee-tea-chain-katinat-apologizes-for-controversial-charity-campaign-for-typhoon-yagi-victims-10381931.htm' },
    { t: 'Katinat kêu gọi ủng hộ có thiện chí nhưng gây hiểu lầm', pub: 'Vietcetera', date: '2024', url: 'https://vietcetera.com/vn/katinat-keu-goi-ung-ho-co-thien-chi-nhung-gay-hieu-lam-ve-thong-tin' },
    { t: 'Chiến dịch đỏ của Katinat', pub: 'Diễn đàn Doanh nghiệp', date: '2024', url: 'https://diendandoanhnghiep.vn/chien-dich-do-cua-katinat-10141906.html' } ]
},

'oatly-packaging': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Phân biệt giọng nói thương hiệu mạnh với một mô hình kinh doanh có lãi, và đọc đúng vai trò của kiện tụng, truyền thông và tăng trưởng danh mục trong một câu chuyện “bao bì biết nói”.',
  problem: 'Sữa yến mạch là sản phẩm mới với nhiều người và bị ngành sữa truyền thống phản đối. Oatly có ngân sách media nhỏ, nên dùng chính bao bì làm kênh chính.',
  consumer: {
    observed: 'Không có nghiên cứu công khai về động cơ của khách Oatly. Bài của Bloomberg (2015) ghi CEO nói doanh số tăng sau khi bị kiện, không nêu số.',
    hypothesis: 'Người mua sữa thực vật muốn một cách sống chứ không chỉ một sản phẩm thay thế; một giọng nói thẳng và hài hước tạo cảm giác “người cùng phe”. Đây là diễn giải của người viết.' },
  options: [
    { name: 'Định vị dịu hơn: sữa thực vật cho người dị ứng', bet: 'Tránh đối đầu với ngành sữa.', gain: 'Ít rủi ro pháp lý.', cost: 'Không khác biệt; không tạo chuyện.' },
    { name: 'Tránh dùng từ “milk”', bet: 'Chọn từ khác để không bị kiện.', gain: 'Ít kiện tụng.', cost: 'Mất phần diễn đạt đơn giản nhất của sản phẩm.' },
    { name: 'Quảng cáo đại trà truyền thống', bet: 'Mua TV/OOH nhiều.', gain: 'Phủ rộng.', cost: 'Ngân sách thời kỳ đầu không đủ.' },
    { name: 'Bao bì nói thẳng, và công khai vụ kiện làm chất liệu', bet: 'Giọng cá tính trên hộp; đăng toàn văn đơn kiện, quảng cáo trên báo.', gain: 'Biến đối đầu thành nội dung; “David chống Goliath”.', cost: 'Thua kiện, bị ASA Anh phê, nhiều tranh cãi nhãn hiệu.', taken: 'Oatly làm lại nhận diện từ 2012 và đăng hồ sơ vụ kiện (2014–2015).' } ],
  facts: [
    { t: 'Toà án Thị trường Thuỵ Điển (MD 2015:18, 19/11/2015) cấm câu “like milk but made for humans” trên bao bì ở Thuỵ Điển, phạt 2 triệu SEK nếu vi phạm; Oatly thua phần lớn nhưng thắng một số yêu cầu và chịu án phí 1.259.800 SEK.', who: 'Toà án; SVT', date: '19/11/2015', pub: 'lagen.nu', url: 'https://lagen.nu/dom/md/2015:18', caveat: 'Nguyên đơn là Svensk Mjölk (một số báo gọi LRF Mjölk).' },
    { t: 'Doanh thu Oatly: 2019 204 triệu USD; 2020 421,4; 2021 643,2; 2022 722,2; 2023 783,3; 2024 823,7; 2025 862,5 triệu USD. Lỗ ròng 2021–2023: 212,4; 392,6; 416,9 triệu USD. 2025 là năm đầu có EBITDA điều chỉnh dương cả năm (6,8 triệu USD).', who: 'Oatly (báo cáo 6-K, SEC); WSJ (2019–2020)', date: '2021–2026', pub: 'SEC', url: 'https://www.sec.gov/Archives/edgar/data/1843586/000119312526046546/otly_year-end_report_202.htm', caveat: 'Số công ty, không phải kết quả của bao bì.' },
    { t: 'IPO Nasdaq ngày 20/5/2021 giá 17 USD/cổ phiếu, huy động 1,43 tỷ USD, định giá khoảng 10 tỷ USD. Tháng 7/2020 nhóm nhà đầu tư do Blackstone dẫn dắt mua khoảng 10% với 200 triệu USD.', who: 'WSJ qua Fox Business; FoodNavigator', date: '2020–2021', pub: 'Fox Business', url: 'https://foxbusiness.com/markets/oatly-ipo-prices-at-17-a-share-notching-10b-valuation', caveat: 'Việc Blackstone đầu tư gây phản ứng tẩy chay năm 2020, chưa có số tác động.' },
    { t: 'Cơ quan quảng cáo Anh (ASA) kết luận 4 trong 5 tuyên bố môi trường trong chiến dịch 1/2021 gây hiểu lầm; Oatly nhận “có thể rõ ràng hơn” và sẽ sửa.', who: 'ASA qua FoodNavigator', date: '27/1/2022', pub: 'FoodNavigator', url: 'https://www.foodnavigator.com/Article/2022/01/27/oatly-misleads-consumers-with-environmental-claims-rules-asa/', caveat: 'Là cáo buộc về tuyên bố, không phải lệnh cấm sản phẩm.' } ],
  unknown: 'Phần doanh số nào do bao bì tạo ra (không có nguồn kiểm chứng), và số lượng khách “bị lọc” bởi giọng nói. Lưu ý: phán quyết Toà tối cao Anh 2/2026 là về nhãn “POST MILK GENERATION”, không phải câu “It’s like milk…”; đừng nhầm hai vụ.',
  causal: [
    { claim: 'Giọng nói rõ ràng và việc đối đầu công khai giúp thương hiệu từ ngách ra đại chúng.', evidence: 'Doanh thu từ khoảng 68 triệu USD (2017) lên 204 triệu USD (2019) rồi hơn 640 triệu USD (2021).', other: 'Cả nhóm sữa thực vật tăng (bán lẻ sữa yến mạch Mỹ từ 4,4 lên 29 triệu USD 2017–2018, số cả ngành), cộng với mở rộng phân phối quốc tế và vốn đầu tư.' },
    { claim: 'Giọng nói tạo giá trị kinh doanh bền.', evidence: 'Doanh thu tăng, IPO.', other: 'Lỗ ròng rất lớn 2021–2023 và báo cáo bán khống (Spruce Point, 7/2021) tranh cãi về lợi nhuận; mãi đến 2025 mới có EBITDA dương cả năm.' } ],
  limits: [
    'Rủi ro pháp lý và danh tiếng của lối nói thẳng: thua ở Thuỵ Điển (2015), bị ASA phê (2022), tranh cãi nhãn hiệu “milk”.',
    'Nghịch lý đạo đức thương hiệu: khi nhà đầu tư Blackstone vào (2020), khách trung thành phản ứng vì hành động không khớp giọng nói.',
    'Giọng nói không tự sinh ra biên lợi nhuận.' ],
  practice: 'Chọn một sản phẩm bạn biết. Liệt kê các mặt của bao bì hoặc điểm chạm đang bỏ trống. Viết thử hai đoạn: một giọng trung tính, một giọng đặc trưng. Nêu rõ rủi ro pháp lý của giọng thứ hai và ai cần duyệt.',
  measure: 'Tách đo ba thứ: nhớ thương hiệu (nhận ra giọng không cần logo), hành vi mua và mua lại, và biên lợi nhuận theo kênh. Giọng cá tính cần kiểm tra cả rủi ro pháp lý và phản ứng ngược.',
  reflect: [
    'Oatly thắng ở nhận diện nhưng lỗ nặng nhiều năm. Bạn nên dùng thước đo nào để đánh giá “bao bì biết nói”?',
    'Việc công khai hồ sơ kiện là can đảm hay một chiêu truyền thông? Bạn dựa vào đâu để trả lời?',
    'Giọng nói của bạn có thể gây tổn thương hay vi phạm quy định nào mà bạn chưa nghĩ tới?' ],
  transfer: 'Không áp dụng khi ngành có quy định nhãn chặt, khi thương hiệu không đủ khả năng chịu phản ứng pháp lý, hoặc khi bạn chưa có biên lợi nhuận để chịu giai đoạn lỗ.',
  sources: [
    { t: 'Marknadsdomstolen MD 2015:18', pub: 'lagen.nu', date: '19/11/2015', url: 'https://lagen.nu/dom/md/2015:18' },
    { t: 'Oatly year-end report 2025', pub: 'Oatly (SEC 6-K)', date: '11/2/2026', url: 'https://www.sec.gov/Archives/edgar/data/1843586/000119312526046546/otly_year-end_report_202.htm' },
    { t: 'Oatly IPO prices at $17', pub: 'WSJ qua Fox Business', date: '20/5/2021', url: 'https://foxbusiness.com/markets/oatly-ipo-prices-at-17-a-share-notching-10b-valuation' },
    { t: 'Oatly misleads consumers with environmental claims, rules ASA', pub: 'FoodNavigator', date: '27/1/2022', url: 'https://www.foodnavigator.com/Article/2022/01/27/oatly-misleads-consumers-with-environmental-claims-rules-asa/' },
    { t: 'After angering Swedish dairy industry, Oatly brings controversial ad campaign to the UK', pub: 'The Drum', date: '17/10/2018', url: 'https://www.thedrum.com/news/after-angering-swedish-dairy-industry-oatly-brings-controversial-ad-campaign-the-uk' } ]
},

});

Object.assign(CAMPAIGN_DEEP, {

'patagonia-dont-buy': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Phân biệt một tuyên bố ngược lợi ích bán hàng với một cơ chế vận hành đứng sau nó, và nhận ra vì sao con số “doanh số tăng 30%” không dùng để chứng minh nhân quả.',
  problem: 'Patagonia muốn khẳng định rằng thương hiệu coi trọng môi trường hơn doanh số ngắn hạn, đúng lúc Black Friday kích thích tiêu dùng, mà vẫn phải bán được áo.',
  consumer: {
    observed: 'Không có nghiên cứu của Patagonia xác nhận insight về “cảm giác tội lỗi khi tiêu dùng”. Một người trong cuộc (Vincent Stanley), khi được hỏi quảng cáo có làm tăng doanh số không, đã trả lời “tôi không biết”.',
    hypothesis: 'Khách hàng quan tâm môi trường sẽ tin một thương hiệu nói điều ngược lợi ích bán hàng, nếu thương hiệu có hành động đi kèm. Đây là giả thuyết của người viết.' },
  options: [
    { name: 'Quảng cáo giảm giá Black Friday thông thường', bet: 'Chạy theo mùa mua sắm.', gain: 'Doanh số ngắn hạn rõ.', cost: 'Mâu thuẫn với lập trường môi trường.' },
    { name: 'Chỉ làm chương trình sửa chữa, không có tuyên bố nổi bật', bet: 'Làm lặng lẽ.', gain: 'Ít rủi ro bị gọi là greenwashing.', cost: 'Khó được đưa tin lại, ít người biết.' },
    { name: 'Minh bạch chuỗi cung ứng (Footprint Chronicles) thay vì tuyên bố ngược đời', bet: 'Công bố dữ liệu thay vì lời tuyên bố.', gain: 'Có bằng chứng.', cost: 'Ít gây chú ý; lộ điểm yếu.' },
    { name: 'Một trang quảng cáo toàn trang bảo người đọc đừng mua', bet: 'Đi ngược mùa mua sắm kèm cam kết.', gain: 'Được đưa tin lại nhiều hơn số tiền bỏ ra.', cost: 'Nâng kỳ vọng đạo đức; bị phê bình về mâu thuẫn với tăng trưởng.', taken: 'Quảng cáo “Don’t Buy This Jacket” đăng ngày 25/11/2011 trên New York Times, đặt trên nền Common Threads Initiative.' } ],
  facts: [
    { t: 'Quảng cáo toàn trang trên New York Times ngày Black Friday 25/11/2011, kèm email cho người đăng ký.', who: 'Nhiều nguồn thứ cấp', date: '25/11/2011', pub: 'Brand case studies', caveat: 'Văn bản gốc chưa đọc được khi kiểm; không trích số liệu môi trường trong quảng cáo.' },
    { t: 'Common Threads Initiative, hợp tác với eBay, được công bố ngày 7/9/2011 — khoảng 2,5 tháng trước quảng cáo; chương trình tái chế Common Threads có từ 2005.', who: 'Apparel News; IMD', date: '7/9/2011', pub: 'Apparel News', url: 'https://www.apparelnews.net/news/2011/sep/07/patagonia-initiative-encourages-consumers-to/', caveat: 'Quảng cáo dẫn vào cam kết sẵn có, không “đi kèm” như phát hành đồng thời.' },
    { t: 'Con số “doanh số tăng khoảng 30%”: case study IMD (12/2015) viết như vậy; nhiều blog ghi doanh thu 2012 khoảng 543 triệu USD so với khoảng 414 triệu USD năm 2011 (~31%).', who: 'IMD; blog thứ cấp', date: '2015', pub: 'IMD', url: 'https://www.imd.org/research-knowledge/sustainability/case-studies/patagonia-s-sustainability-strategy-don-t-buy-our-products/', caveat: 'Patagonia là công ty tư nhân, không công bố báo cáo kiểm toán; không tách được phần quảng cáo.' },
    { t: 'Tháng 9/2022, gia đình Chouinard chuyển quyền sở hữu sang Patagonia Purpose Trust và Holdfast Collective; lợi nhuận không tái đầu tư chuyển thành cổ tức cho Holdfast, ước khoảng 100 triệu USD mỗi năm.', who: 'CNN qua abc17news', date: '14/9/2022', pub: 'CNN', url: 'https://abc17news.com/money/cnn-business-consumer/2022/09/14/patagonias-founder-transfers-ownership-into-two-entities-to-help-fight-the-climate-crisis/', caveat: 'Qua tóm tắt báo chí.' } ],
  unknown: 'Doanh số riêng của chiếc áo trong quảng cáo, giá mua trang NYT, dữ liệu giữ chân khách, và mức đóng góp của quảng cáo vào tăng trưởng. Không có vụ kiện greenwashing nhắm vào Patagonia trong các nguồn đã kiểm; hai vụ kiện chính quyền về di tích quốc gia (2017 và 2/9/2026) không liên quan chiến dịch 2011.',
  causal: [
    { claim: 'Một tuyên bố ngược lợi ích bán hàng được tin hơn lời khen.', evidence: 'Quảng cáo được đưa tin lại rộng rãi (theo các case study).', other: 'Patagonia đã tăng gần gấp đôi trong 5 năm đến 2013 (Marcario); tăng trưởng ngành đồ ngoài trời, mở thêm cửa hàng và Common Threads/eBay đều có thể giải thích.' },
    { claim: 'Hành động đi kèm khiến lời nói đáng tin.', evidence: 'Chương trình sửa chữa, bán lại; cam kết 1% doanh thu.', other: 'Chính nội bộ cũng nói nếu doanh số giảm thì “là kẻ tử vì đạo”, nếu tăng thì bị gọi là greenwashing; cơ chế ban đầu của Common Threads khiêm tốn (nguồn không rõ).' } ],
  limits: [
    'Nghịch lý “mua ít hơn” và tăng trưởng: nhiều bình luận cho rằng muốn bán ít đi thì phải sản xuất ít đi, khó khớp với doanh thu tăng.',
    'Lập trường nâng kỳ vọng đạo đức: mọi lỗi chuỗi cung ứng sẽ bị soi kỹ hơn.',
    'Đây là một thương hiệu tư nhân, nên không thể kiểm chứng bằng báo cáo kiểm toán.' ],
  practice: 'Viết một tuyên bố “ngược lợi ích” cho một thương hiệu bạn biết, rồi liệt kê ba hành động có thể kiểm chứng đi kèm. Nếu không có hành động nào, hãy giải thích vì sao bạn không nên đăng tuyên bố đó.',
  measure: 'Đo niềm tin (khảo sát), mua lại và giới thiệu, số lượt sửa chữa/bán lại, và doanh thu theo nhóm khách trong khoảng dài; so với nhóm đối chứng. Không dùng doanh số một tháng sau quảng cáo để kết luận.',
  reflect: [
    'Nếu năm sau doanh số Patagonia giảm, bạn sẽ kết luận chiến lược sai hay chiến lược đúng nhưng chưa đủ? Cần thêm dữ liệu gì?',
    'Con số “tăng 30%” xuất hiện trong nhiều bài nhưng không có nguồn gốc kiểm toán. Bạn sẽ ghi nó vào báo cáo thế nào cho trung thực?',
    'Thương hiệu của bạn có hành động nào đủ mạnh để chống lại một chiến dịch bị gọi là “greenwashing”?' ],
  transfer: 'Không áp dụng khi thương hiệu chưa có hành động vận hành đáng kể đi kèm, khi doanh nghiệp không chịu nổi rủi ro bị soi, hoặc khi nhóm khách không quan tâm vấn đề đó.',
  sources: [
    { t: 'Patagonia initiative encourages consumers', pub: 'Apparel News', date: '7/9/2011', url: 'https://www.apparelnews.net/news/2011/sep/07/patagonia-initiative-encourages-consumers-to/' },
    { t: 'Patagonia’s sustainability strategy: don’t buy our products', pub: 'IMD (case study)', date: '12/2015', url: 'https://www.imd.org/research-knowledge/sustainability/case-studies/patagonia-s-sustainability-strategy-don-t-buy-our-products/' },
    { t: 'The more Patagonia rejects consumerism, the more the brand sells', pub: 'The Correspondent', date: '2020', url: 'https://thecorrespondent.com/424/the-more-patagonia-rejects-consumerism-the-more-the-brand-sells' },
    { t: 'Patagonia’s founder transfers ownership', pub: 'CNN (abc17news)', date: '14/9/2022', url: 'https://abc17news.com/money/cnn-business-consumer/2022/09/14/patagonias-founder-transfers-ownership-into-two-entities-to-help-fight-the-climate-crisis/' } ]
},

'duolingo-tiktok': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Đánh giá một nhân vật thương hiệu như tài sản dài hạn: nó mang lại gì, không chứng minh được gì, và rủi ro khi tài khoản nhân vật bị kéo vào tranh cãi của công ty.',
  problem: 'Duolingo phải giành thời gian của người dùng với giải trí, trên một nền tảng không hoan nghênh quảng cáo. Công ty chọn chạy TikTok hoàn toàn organic bằng mascot Duo.',
  consumer: {
    observed: 'Theo VP marketing của Duolingo, khoảng 80% người dùng đến từ truyền miệng, và TikTok có “tác động rất lớn lên retention” (AdExchanger, 8/2023) — đây là phát biểu của công ty, không phải đo lường độc lập.',
    hypothesis: 'Trên TikTok, người xem chờ xem một nhân vật chứ không xem một thương hiệu. Đây là cách đọc của người viết dựa trên mô tả của đội làm nội dung.' },
  options: [
    { name: 'Chạy quảng cáo hiệu suất trả tiền', bet: 'Mua lượt cài đặt.', gain: 'Đo được CAC.', cost: 'Phải cạnh tranh giá với mọi app; không tạo tài sản thương hiệu.' },
    { name: 'Dùng KOL/người nổi tiếng', bet: 'Mượn uy tín cá nhân.', gain: 'Phủ nhanh.', cost: 'Chi phí cao, không sở hữu tài sản.' },
    { name: 'Bám giao diện sản phẩm', bet: 'Quảng cáo tính năng.', gain: 'Gần mục tiêu cài đặt.', cost: 'Ít được chia sẻ.' },
    { name: 'Dùng mascot Duo như một nhân vật có cá tính, chạy organic', bet: 'Bắt trend, giữ cá tính nhất quán.', gain: 'Tần suất rẻ, tài sản nhân vật.', cost: 'Phụ thuộc nền tảng; nhân vật khó giữ nhất quán khi công ty đổi chiến lược.', taken: 'Duolingo mở TikTok từ 2/2021 và tập trung vào Duo từ khoảng 9/2021.' } ],
  facts: [
    { t: 'Trước khi dùng Duo, video trung bình 20.000–30.000 lượt xem; đến 2/2022 trung bình 3–5 triệu, cao nhất 22 triệu, gần 3 triệu người theo dõi; toàn bộ organic.', who: 'Zaria Parvez (Duolingo) với Marketing Brew', date: '7/2/2022', pub: 'Marketing Brew', url: 'https://www.marketingbrew.com/stories/2022/02/07/mascots-might-be-the-key-to-a-successful-tiktok-strategy-for-brands', caveat: 'Số tự báo cáo; tuổi tài khoản cũng ảnh hưởng.' },
    { t: 'Người dùng hoạt động hằng ngày (DAU): Q4/2021 10,1 triệu (+20%); Q4/2023 26,9 triệu (+65%); Q1/2025 46,6 triệu (+49%); Q4/2025 52,7 triệu (+30%). Doanh thu cả năm 2025 1.037,6 triệu USD.', who: 'Duolingo (thư cổ đông, báo cáo)', date: '2022–2026', pub: 'Duolingo IR; SEC', url: 'https://www.sec.gov/Archives/edgar/data/1562088/000156208825000098/q1fy25duolingo3-31x25share.htm', caveat: 'Là bối cảnh công ty, không phải kết quả riêng của TikTok.' },
    { t: '“Duo chết” (11/2/2025): thư cổ đông Q1/2025 gọi là một trong những chiến dịch thành công nhất, “chi tiêu gần như bằng không”, 1,7 tỷ lượt hiển thị organic.', who: 'Duolingo', date: '5/2025', pub: 'SEC', url: 'https://www.sec.gov/Archives/edgar/data/1562088/000156208825000098/q1fy25duolingo3-31x25share.htm', caveat: 'Số tự công bố, không nêu cách đếm.' },
    { t: 'Ngày 28/4/2025 CEO đăng email nội bộ “AI-first”, mạng xã hội phản ứng mạnh; theo một nguồn Duolingo tạm gỡ bài trên TikTok và Instagram. Tháng 8/2025 CEO nói ông “không đưa đủ ngữ cảnh” và công ty chưa sa thải nhân viên toàn thời gian.', who: 'Fortune; Fast Company (qua tóm tắt)', date: '4–8/2025', pub: 'Fortune', url: 'https://fortune.com/2025/08/18/duolingo-ceo-admits-controversial-ai-memo-did-not-give-enough-context-insists-company-never-laid-off-full-time-employees', caveat: 'Chưa có số ảnh hưởng lên người dùng.' } ],
  unknown: 'Phần DAU nào do TikTok mang lại. Số người theo dõi hiện tại mâu thuẫn giữa các nguồn (6,7 triệu, 15 triệu, 16,3 triệu), nên không nêu một con số khi chưa xem trực tiếp tài khoản.',
  causal: [
    { claim: 'Nhân vật tạo tần suất mà quảng cáo trả tiền không mua nổi.', evidence: 'Video mascot đạt 3–5 triệu lượt xem trung bình năm 2022, tăng từ 20.000–30.000.', other: 'Tài khoản đã có tuổi; làn sóng học trực tuyến thời dịch; truyền miệng chiếm khoảng 80% người dùng.' },
    { claim: 'TikTok đẩy tăng trưởng DAU.', evidence: 'TikTok bùng nổ từ 2021; DAU tăng mạnh từ 2023.', other: 'DAU Q4/2021 chỉ +20%; tăng tốc +65% đến muộn hơn một năm. Cải tiến sản phẩm, gamification, gói AI trả phí đều là ứng viên. Không thể kết luận TikTok là nguyên nhân chính.' } ],
  limits: [
    'Phụ thuộc nền tảng và thuật toán.',
    'Vụ “AI-first” cho thấy một tài khoản nhân vật có thể bị kéo vào tranh cãi doanh nghiệp.',
    'Công ty vẫn chi marketing đáng kể (khoảng 12% doanh thu Q1/2025), nên “organic” chỉ đúng với kênh TikTok chứ không đúng với cả công ty.' ],
  practice: 'Chọn một thương hiệu bạn biết, mô tả một nhân vật (ngoại hình, cá tính, ba điều nhân vật không bao giờ làm). Viết hai tình huống nội dung: một bắt trend, một nằm ngoài trend. Nêu điều gì làm nhân vật “hỏng”.',
  measure: 'Chia: tần suất (lượt xem, tỉ lệ xem hết), nhận biết (tìm kiếm thương hiệu, nhắc không cần gợi ý), và hành vi (đăng ký, DAU của nhóm đến từ TikTok có mã). Đừng dùng số người theo dõi làm chỉ số duy nhất.',
  reflect: [
    'Với dữ liệu hiện có, bạn có kết luận TikTok là kênh quan trọng của Duolingo không? Bằng chứng nào còn thiếu?',
    'Nếu công ty đổi chiến lược (như vụ AI-first), nhân vật nên phản ứng thế nào? Ai quyết định?',
    'Nhân vật “hỗn loạn” có hợp với thương hiệu của bạn không? Điều gì sẽ làm bạn mất kiểm soát?' ],
  transfer: 'Không áp dụng khi thương hiệu chưa có tài sản nhân vật sẵn, khi khách mục tiêu không dùng nền tảng đó, hoặc khi công ty không chịu được một giọng nói không thể kiểm soát hoàn toàn.',
  sources: [
    { t: 'Mascots might be the key to a successful TikTok strategy', pub: 'Marketing Brew', date: '7/2/2022', url: 'https://www.marketingbrew.com/stories/2022/02/07/mascots-might-be-the-key-to-a-successful-tiktok-strategy-for-brands' },
    { t: 'Duolingo Q1 2025 shareholder letter', pub: 'Duolingo (SEC)', date: '5/2025', url: 'https://www.sec.gov/Archives/edgar/data/1562088/000156208825000098/q1fy25duolingo3-31x25share.htm' },
    { t: 'Organic marketing is Duolingo’s lingua franca', pub: 'AdExchanger', date: '2/8/2023', url: 'https://www.adexchanger.com/strategy/organic-marketing-is-duolingos-lingua-franca' },
    { t: 'Duolingo CEO admits AI memo did not give enough context', pub: 'Fortune', date: '18/8/2025', url: 'https://fortune.com/2025/08/18/duolingo-ceo-admits-controversial-ai-memo-did-not-give-enough-context-insists-company-never-laid-off-full-time-employees' } ]
},

'liquid-death': {
  status: 'success', verified: '17/10/2026',
  objective: 'Đọc đúng số “doanh số” của một thương hiệu mới nổi (retail sales khác revenue) và hiểu khi nào khác biệt ở bao bì và giọng điệu là chiến lược chứ không chỉ là thẩm mỹ.',
  problem: 'Nước đóng chai là category ít khác biệt, nơi các thương hiệu mang giọng wellness giống nhau. Liquid Death muốn chen vào những nơi người ta ngại cầm chai nước (quán bar, concert).',
  consumer: {
    observed: 'Không có nghiên cứu công khai của công ty. Doanh số theo SPINS tăng ba chữ số năm thứ ba liên tiếp tính đến 2023, theo công ty.',
    hypothesis: 'Người uống không cồn ở nơi giao lưu cần một vật cầm không khiến họ thành người ngoài cuộc. Đây là diễn giải của người viết.' },
  options: [
    { name: 'Nước thương hiệu wellness', bet: 'Đi theo giọng chung.', gain: 'Dễ hiểu.', cost: 'Không khác biệt.' },
    { name: 'Đóng chai nhựa tái chế, giá rẻ', bet: 'Cạnh tranh bằng giá/bền vững.', gain: 'An toàn.', cost: 'Cuộc đua giá.' },
    { name: 'Đóng vào lon, dùng giọng heavy metal, bán sự hài hước', bet: 'Bao bì là chiến lược; quảng cáo giả mạo.', gain: 'Khác biệt cực đoan, dễ nhận ra.', cost: 'Mâu thuẫn thông điệp, kiện tụng, định giá cao.', taken: 'Mike Cessario nộp nhãn hiệu 7/2017, bán online từ 1/2019, vào Whole Foods 2/2020.' } ],
  facts: [
    { t: 'Doanh số khoảng 3 triệu USD (2019), gần 45 triệu USD (2021); 263 triệu USD “retail sales” năm 2023.', who: 'TechCrunch; công ty qua Food Dive', date: '1/2022; 3/2024', pub: 'Food Dive', url: 'https://www.fooddive.com/news/liquid-death-funding-investment/709912/', caveat: '263 triệu USD là doanh số bán lẻ cuối cùng, không phải doanh thu của công ty. Con số 333 triệu USD năm 2024 chỉ qua nguồn thứ cấp.' },
    { t: 'Tháng 1/2022: 75 triệu USD, định giá 525 triệu USD. Tháng 3/2024: 67 triệu USD, định giá 1,4 tỷ USD; tổng huy động trên 200 triệu USD.', who: 'TechCrunch; Food Dive', date: '1/2022; 11/3/2024', pub: 'TechCrunch', url: 'https://techcrunch.com/2022/01/03/liquid-death-lands-75-million-more-in-funding-including-to-roll-out-flavored-water/', caveat: 'Đặt tên vòng gọi vốn khác nhau giữa các nguồn.' },
    { t: 'Giá tại Anh (10/2023): 1,99 bảng/lon ở một số cửa hàng.', who: 'The Grocer', date: '16/10/2023', pub: 'The Grocer', url: 'https://www.thegrocer.co.uk/soft-drinks/liquid-death-water-open-to-uk-sourcing-in-the-future/684280.article', caveat: 'Giá khác nhau theo điểm bán.' },
    { t: 'Tháng 8/2026 có các vụ kiện tập thể ở Mỹ cáo buộc đồ uống “0g sugar” chứa allulose bị coi là đường; chưa có phán quyết.', who: 'Top Class Actions (qua tóm tắt)', date: '24/8/2026', pub: 'Top Class Actions', caveat: 'Chỉ là cáo buộc.' } ],
  unknown: 'Lợi nhuận hoặc lỗ (không có số công bố đáng tin), doanh thu thuần, và phần tăng trưởng do thương hiệu so với mở rộng danh mục và phân phối.',
  causal: [
    { claim: 'Bao bì cực đoan giúp nhận ra từ xa và định giá cao.', evidence: 'Từ 3 triệu USD (2019) lên 263 triệu USD (2023) doanh số bán lẻ; định giá 1,4 tỷ USD.', other: 'Mở rộng danh mục (có ga, trà, nước tăng lực), phân phối (113.000 điểm bán Mỹ và Anh năm 2023 theo Food Business News), hợp tác Live Nation, 7-Eleven và vốn mạnh.' },
    { claim: 'Giọng điệu phản lại ngành nước đóng chai.', evidence: 'Quảng cáo giả đầu tiên; album “Greatest Hates”.', other: 'Một phần chú ý đến từ vốn truyền thông lớn khi vào Super Bowl 2022; không tách được.' } ],
  limits: [
    'Mâu thuẫn thông điệp: “giết ô nhiễm nhựa” nhưng bán đồ lưu niệm nhựa, mở rộng sang đồ uống có đường/caffeine.',
    'Chỉ trích: nước đóng lon vẫn kém bền vững hơn nước máy; lon có lớp lót nhựa; ban đầu dùng nước từ Áo (sau chuyển sang Mỹ).',
    'Rủi ro pháp lý và nhãn hiệu (đổi tên “Armless Palmer” sau đe dọa kiện 2023; vụ Death Wish Coffee 2025).' ],
  practice: 'Chọn một category ít khác biệt ở Việt Nam. Viết ba “quy ước” mà mọi thương hiệu đang theo (màu, chất liệu, giọng). Chọn một quy ước để phá, nêu rủi ro và điều kiện cần có trong chuỗi cung ứng.',
  measure: 'Tách doanh số bán lẻ (SPINS/Nielsen) và doanh thu thuần; nhớ thương hiệu không cần logo; mua lại; biên lợi nhuận theo kênh. Theo dõi riêng các khiếu nại và vấn đề pháp lý.',
  reflect: [
    'Khi bài báo viết “doanh thu 263 triệu USD” nhưng thực ra là doanh số bán lẻ, bạn sửa nó thế nào trong báo cáo của mình?',
    'Giọng điệu cực đoan hợp với một lon nước, nhưng có hợp với một ngân hàng hay một phòng khám không? Dựa vào đâu?',
    'Bạn sẽ làm gì với mâu thuẫn giữa thông điệp “chống nhựa” và hành vi bán đồ lưu niệm nhựa?' ],
  transfer: 'Không áp dụng khi category phụ thuộc niềm tin và an toàn (y tế, tài chính), khi bạn không có vốn để duy trì phân phối rộng, hoặc khi giọng điệu mâu thuẫn trực tiếp với quy định nhãn.',
  sources: [
    { t: 'Liquid Death lands $75 million more in funding', pub: 'TechCrunch', date: '3/1/2022', url: 'https://techcrunch.com/2022/01/03/liquid-death-lands-75-million-more-in-funding-including-to-roll-out-flavored-water/' },
    { t: 'Liquid Death funding and investment', pub: 'Food Dive', date: '11/3/2024', url: 'https://www.fooddive.com/news/liquid-death-funding-investment/709912/' },
    { t: 'Liquid Death water open to UK sourcing', pub: 'The Grocer', date: '16/10/2023', url: 'https://www.thegrocer.co.uk/soft-drinks/liquid-death-water-open-to-uk-sourcing-in-the-future/684280.article' } ]
},

'bitis-hunter': {
  status: 'success', verified: '17/10/2026',
  objective: 'Phân tích một chiến dịch âm nhạc theo mùa Tết: tách đóng góp của ngôi sao, của ý tưởng, và của hệ thống phân phối sẵn có; đọc số liệu do chính nhãn hàng công bố.',
  problem: 'Biti’s bị coi là thương hiệu của thế hệ cha mẹ. Dòng Hunter ra mắt đầu 2016 nhưng ít được chú ý, trong thị trường sneaker do thương hiệu ngoại thống trị. Cần một cách khiến người trẻ nhìn lại thương hiệu với ngân sách nhỏ.',
  consumer: {
    observed: 'Báo chí mô tả nhiều người trẻ Việt có áp lực giữa khát khao đi xa và bổn phận về nhà dịp Tết (Vietcetera, CafeF). Không có khảo sát độc lập được công bố.',
    hypothesis: 'Chuyến đi và việc trở về không mâu thuẫn; thương hiệu nói được cả hai nên gắn với cảm xúc Tết. Đây là cách đọc của người viết.' },
  options: [
    { name: 'Đại sứ thể thao', bet: 'Gắn Hunter với một vận động viên.', gain: 'Uy tín chức năng.', cost: 'Đắt; khó gắn với Tết.' },
    { name: 'Khuyến mãi giảm giá', bet: 'Đẩy mạnh ưu đãi mùa Tết.', gain: 'Doanh số ngắn hạn.', cost: 'Không đổi hình ảnh “của cha mẹ”.' },
    { name: 'Quảng cáo truyền hình mùa Tết', bet: 'Mua tần suất.', gain: 'Phủ rộng.', cost: 'Ngân sách không đủ.' },
    { name: 'Hai MV âm nhạc nối nhau mùa Tết', bet: '“Lạc trôi” (Sơn Tùng M-TP) rồi “Đi để trở về” (Soobin).', gain: 'Hiệu ứng chú ý lớn với ngân sách nhỏ.', cost: 'Phụ thuộc ngôi sao; hiệu ứng ngắn hạn; các mùa sau kém sức hút hơn.', taken: 'REDDER thực hiện với ngân sách khoảng 3 tỷ đồng cho cả hai MV (theo Biti’s).' } ],
  facts: [
    { t: 'Ngân sách khoảng 3 tỷ đồng cho hai MV, khoảng một phần ba cho “Lạc trôi”, phần còn lại cho “Đi để trở về”; agency REDDER.', who: 'Biti’s qua Vietcetera', date: '23/8/2018', pub: 'Vietcetera', url: 'https://vietcetera.com/en/bitis-hunter-how-a-small-budget-campaign-rebirthed-a-brand', caveat: 'Số do chính Biti’s cung cấp.' },
    { t: 'Phó giám đốc marketing Biti’s nói lượng bán Hunter tăng gấp 3 trong một tuần, bán hết hàng trong 7 ngày; Biti’s chiếm 10% lượt nhắc trên mạng xã hội; chiến dịch tạo 1,7 triệu tương tác; hai MV nằm trong YouTube Trending 21 ngày liên tiếp.', who: 'Biti’s (phát biểu tại sự kiện Forbes)', date: '13/11/2017', pub: 'CafeF', url: 'https://cafef.vn/chien-thang-cua-bitis-hunter-tu-2-mv-son-tung-mtp-soobin-hoang-son-hieu-qua-gap-10-lan-cocacola-pepsi-luong-ban-tang-3-lan-giay-ban-sach-trong-1-tuan-20171113155420982.chn', caveat: 'Người phát biểu là bên liên quan; không giải thích cách đo. Tiêu đề bài “hiệu quả gấp 10 lần Coca-Cola, Pepsi” là suy diễn của báo.' },
    { t: 'Mùa 3 (0 giờ 1/1/2019): 10 triệu lượt xem sau 2 ngày, 11,5 triệu sau 4 ngày. Mùa 9 (30/12/2024): trên 55 triệu reach sau 7 ngày (số của bên làm chiến dịch).', who: 'VnExpress; RGB/BrandsVietnam', date: '2019; 2024', pub: 'VnExpress', url: 'https://vnexpress.net/di-de-tro-ve-3-cua-soobin-hoang-son-dat-11-5-trieu-views-sau-4-ngay-3863242.html', caveat: 'Lượt xem là độ chú ý, không phải doanh số.' },
    { t: 'Doanh thu thuần công ty mẹ: 2016 1.291 tỷ đồng; 2017 1.588 tỷ; 2018 1.862 tỷ; 2019 1.954 tỷ (đỉnh); 2020 1.673 tỷ; 2021 1.234 tỷ đồng.', who: 'Market Times; VnExpress', date: '26/10/2022', pub: 'Market Times', url: 'https://markettimes.vn/biti-s-dang-kinh-doanh-ra-sao-6684.html', caveat: 'Số công ty, gồm xuất khẩu và gia công; không tách riêng Hunter.' } ],
  unknown: 'Doanh thu hoặc số đôi riêng của Hunter, thị phần sneaker của Hunter, và phần đóng góp riêng của MV “Đi để trở về” so với “Lạc trôi”.',
  causal: [
    { claim: 'Âm nhạc và tranh luận xã hội giúp thương hiệu nổi lại với ngân sách nhỏ.', evidence: 'Biti’s công bố x3 lượng bán trong một tuần, 21 ngày trending.', other: 'Phần lớn người thấy giày lần đầu là qua “Lạc trôi” của Sơn Tùng M-TP, một MV có độ lan tỏa riêng; giá thấp (550.000–650.000 đồng/đôi) và mạng lưới bán lẻ sẵn có giúp chuyển chú ý thành doanh số.' },
    { claim: 'Lặp lại nhiều mùa biến chiến dịch thành tài sản.', evidence: 'Chuỗi MV đến mùa 9 (12/2024).', other: 'Doanh thu công ty đạt đỉnh 2019 rồi giảm; nguyên nhân chính được nêu là Covid nhưng tăng trưởng đã chậm từ 2018–2019; báo chí nhận định các mùa sau kém sức hút.' } ],
  limits: [
    'Số liệu chủ yếu do nhãn hàng công bố, không có đo lường độc lập.',
    'Giày giá thấp và nguồn cung hạn chế có thể làm “bán hết trong 7 ngày” không phản ánh nhu cầu bền vững (suy luận của người viết).',
    'Không có bằng chứng ở cấp công ty cho việc “thương hiệu hồi sinh” bền vững ngoài dòng Hunter.' ],
  practice: 'Chọn một thương hiệu nội địa “của thế hệ trước”. Chọn một mùa văn hoá (Tết, Trung thu, mùa tựu trường), một căng thẳng của người trẻ trong mùa đó, và một nghệ sĩ. Nêu rõ điều bạn nhờ nghệ sĩ làm và điều bạn không cho họ cướp diễn đàn.',
  measure: 'Tách độ chú ý (lượt xem, trending), nhận biết (tìm kiếm thương hiệu), và bán hàng theo kênh có mã. Đo cả hiệu ứng lặp lại qua nhiều mùa thay vì chỉ mùa đầu.',
  reflect: [
    'Nếu chỉ có MV của Soobin mà không có “Lạc trôi”, bạn nghĩ kết quả sẽ khác bao nhiêu? Dữ liệu nào cho bạn biết?',
    '“Tăng gấp 3 trong một tuần” do chính Biti’s nói. Bạn cần thêm số nào để tin nó?',
    'Sau nhiều mùa, doanh thu công ty giảm. Chiến dịch có còn “thành công” không? Thành công theo thước đo nào?' ],
  transfer: 'Không áp dụng khi thương hiệu không có mạng lưới phân phối để đón nhu cầu, khi nghệ sĩ cướp diễn đàn, hoặc khi mục tiêu cần doanh số ổn định hơn là đỉnh chú ý.',
  sources: [
    { t: 'Biti’s Hunter: how a small-budget campaign rebirthed a brand', pub: 'Vietcetera', date: '23/8/2018', url: 'https://vietcetera.com/en/bitis-hunter-how-a-small-budget-campaign-rebirthed-a-brand' },
    { t: 'Chiến thắng của Biti’s Hunter từ 2 MV', pub: 'CafeF', date: '13/11/2017', url: 'https://cafef.vn/chien-thang-cua-bitis-hunter-tu-2-mv-son-tung-mtp-soobin-hoang-son-hieu-qua-gap-10-lan-cocacola-pepsi-luong-ban-tang-3-lan-giay-ban-sach-trong-1-tuan-20171113155420982.chn' },
    { t: 'Đi để trở về 3 đạt 11,5 triệu views sau 4 ngày', pub: 'VnExpress', date: '2019', url: 'https://vnexpress.net/di-de-tro-ve-3-cua-soobin-hoang-son-dat-11-5-trieu-views-sau-4-ngay-3863242.html' },
    { t: 'Biti’s đang kinh doanh ra sao', pub: 'Market Times', date: '26/10/2022', url: 'https://markettimes.vn/biti-s-dang-kinh-doanh-ra-sao-6684.html' } ]
},

'grab-super-app': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Đọc câu chuyện “super app” bằng số liệu công ty: tăng tần suất, ưu đãi, và lợi nhuận có thật sự là một cặp nhân quả hay không.',
  problem: 'Sau khi mua mảng Uber Đông Nam Á (3/2018), Grab cần giữ người dùng khi cạnh tranh và ưu đãi vẫn tiếp tục, bằng cách tăng số lý do mở app.',
  consumer: {
    observed: 'Một nguồn thứ cấp (Yahoo Finance) ghi khoảng hai phần ba người dùng dùng từ hai dịch vụ trở lên và retention một năm 88% với nhóm dùng từ ba dịch vụ — chưa kiểm chứng ở báo cáo gốc.',
    hypothesis: 'Người dùng trung thành với thói quen chứ không với một ứng dụng; càng nhiều tình huống mở app, càng khó bỏ. Đây là cách đọc của người viết.' },
  options: [
    { name: 'Tập trung một dịch vụ cốt lõi (gọi xe)', bet: 'Làm sâu một ngành.', gain: 'Vận hành gọn.', cost: 'Dễ bị đối thủ đa dịch vụ bao vây.' },
    { name: 'Đầu tư tài chính trước', bet: 'Giữ khách bằng ví và vay.', gain: 'Biên lợi nhuận tốt.', cost: 'Rủi ro tín dụng.' },
    { name: 'Dùng thuê bao thay mã giảm giá', bet: 'Khoá thói quen bằng gói.', gain: 'Doanh thu đều.', cost: 'Cần đủ dịch vụ để người dùng thấy đáng.' },
    { name: 'Mở rộng đa dịch vụ để tăng tần suất và dữ liệu', bet: 'Xe, giao đồ ăn, giao hàng, thanh toán, thuê bao.', gain: 'Nhiều lý do mở app.', cost: 'Ưu đãi lớn, nhiều mặt trận.', taken: 'Grab mua Uber Đông Nam Á 26/3/2018, ra mắt GrabRewards 12/2016 và GrabUnlimited 2022.' } ],
  facts: [
    { t: 'Ngày 26/3/2018 Grab mua mảng Uber Đông Nam Á (gồm Uber Eats); Uber nhận 27,5% cổ phần Grab; không công bố giá.', who: 'The Edge Malaysia', date: '26–27/3/2018', pub: 'The Edge', url: 'http://theedgemalaysia.com/article/grab-confirms-acquisition-ubers-southeast-asia-operations', caveat: 'Kết quả xem xét cạnh tranh chưa kiểm chứng.' },
    { t: 'Lỗ cả năm: 2022 1.740 triệu USD; 2023 485 triệu; 2024 158 triệu; 2025 lãi 200 triệu USD. Ưu đãi người dùng: 1,2 tỷ USD (2022), 0,9 tỷ (2023), 1,1 tỷ (2024).', who: 'Grab (báo cáo nộp SEC)', date: '2/2025; 2/2026', pub: 'SEC', url: 'https://www.sec.gov/Archives/edgar/data/1855612/000185561225000004/exhibit991-earningsrelease.htm', caveat: 'Công ty tự công bố; số 2025 theo thông cáo 12/2/2026.' },
    { t: 'Năm 2025: dòng tiền hoạt động giảm còn 79 triệu USD từ 852 triệu USD năm 2024, chủ yếu do cho vay tăng; doanh thu mảng tài chính 347 triệu USD.', who: 'Grab (SEC)', date: '12/2/2026', pub: 'SEC', url: 'https://www.sec.gov/Archives/edgar/data/1855612/000185561226000012/a2025q4-earningspressrelea.htm', caveat: 'Lợi nhuận đi cùng rủi ro tín dụng.' },
    { t: 'Chiến dịch GrabFood Việt Nam nhắm khung bữa tối 18–21h: kết quả tự báo cáo +4% số đơn và +15% đối tác độc quyền.', who: 'WARC / MMA Smarties', date: '12/12/2024', pub: 'WARC', url: 'https://www.warc.com/content/article/mma-smarties/grab-drama-flipped-from-kitchen-to-couch/en-gb/157703', caveat: 'Tự báo cáo.' } ],
  unknown: 'Số lượt giao dịch tổng thể, chỉ số tần suất toàn công ty, thị phần Grab ở Việt Nam, và kết cục xem xét cạnh tranh sau thương vụ Uber. Chưa kiểm được chi tiết đồng phục tài xế.',
  causal: [
    { claim: 'Nhiều dịch vụ làm tăng tần suất và giữ chân.', evidence: 'MTU tăng +15% trong khi On-Demand GMV +21% (2025).', other: 'Grab không công bố chỉ số tần suất tổng; GMV tăng cũng do giá và cơ cấu dịch vụ.' },
    { claim: 'Lợi nhuận 2025 là do “thói quen”.', evidence: 'Lãi ròng 200 triệu USD năm 2025.', other: 'Tỉ lệ ưu đãi trên GMV giảm (13,3% → 9,9% → 10%), cắt giảm 11% nhân sự (6/2023), mảng tài chính tăng, đối thủ rút; tương quan, không thuần nhân quả.' } ],
  limits: [
    '“Cuộc chiến đốt tiền kết thúc” chỉ đúng với cuộc đối đầu Grab–Uber; ưu đãi vẫn khoảng 1 tỷ USD mỗi năm.',
    'Lợi nhuận đi cùng dòng tiền hoạt động giảm mạnh vì cho vay; thị trường vẫn cạnh tranh (Xanh SM, Be ở Việt Nam).',
    'Tài xế là đối tác độc lập; các tranh luận về thu nhập và quy định không nằm trong lần kiểm này.' ],
  practice: 'Liệt kê các “lý do mở app” của một ứng dụng bạn dùng (xe, đồ ăn, thanh toán…). Với mỗi lý do, ước tính bạn mở bao nhiêu lần mỗi tháng và vì sao bạn không bỏ. Đâu là lý do mạnh nhất để giữ bạn?',
  measure: 'Tần suất theo người dùng, số dịch vụ mỗi người, giữ chân theo nhóm dùng 1/2/3 dịch vụ, và ưu đãi trên mỗi giao dịch. Đo riêng lợi nhuận sau ưu đãi.',
  reflect: [
    'Nếu ưu đãi giảm về 0, bao nhiêu người dùng của một super app sẽ ở lại? Bạn đo điều đó thế nào?',
    'Lợi nhuận 2025 đi cùng rủi ro cho vay. Bạn có xem đó là thành công của chiến lược “tăng tần suất” không?',
    'Thương hiệu nhỏ có thể “super app hoá” một ngách mà không cần đốt tiền không? Ví dụ nào?' ],
  transfer: 'Không áp dụng khi thị trường không đủ lớn để nhiều dịch vụ chia chi phí nền tảng, hoặc khi bạn không có nguồn vốn để trả giai đoạn ưu đãi.',
  sources: [
    { t: 'Grab confirms acquisition of Uber’s Southeast Asia operations', pub: 'The Edge Malaysia', date: '26/3/2018', url: 'http://theedgemalaysia.com/article/grab-confirms-acquisition-ubers-southeast-asia-operations' },
    { t: 'Grab Q4 and full year 2024 results', pub: 'Grab (SEC)', date: '20/2/2025', url: 'https://www.sec.gov/Archives/edgar/data/1855612/000185561225000004/exhibit991-earningsrelease.htm' },
    { t: 'Grab Q4 and full year 2025 results', pub: 'Grab (SEC)', date: '12/2/2026', url: 'https://www.sec.gov/Archives/edgar/data/1855612/000185561226000012/a2025q4-earningspressrelea.htm' },
    { t: 'Grab: Drama flipped from kitchen to couch', pub: 'WARC / MMA Smarties', date: '12/12/2024', url: 'https://www.warc.com/content/article/mma-smarties/grab-drama-flipped-from-kitchen-to-couch/en-gb/157703' } ]
},

});

Object.assign(CAMPAIGN_DEEP, {

'shopee-hattrick': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Phân tích một “lễ hội mua sắm” như một cỗ máy dồn nhu cầu, và tách tác động của ngày, đại sứ, âm nhạc khỏi khoản trợ giá lớn nằm phía sau.',
  problem: 'Thương mại điện tử Đông Nam Á cạnh tranh bằng giá; Shopee cần một lý do để người mua quay về cùng lúc, thay vì giảm giá nhỏ giọt mỗi ngày.',
  consumer: {
    observed: 'Không có khảo sát nào về việc người mua “nhớ ngày”. Điều đo được là hành vi: Shopee tự công bố 9.9/2016 đơn hàng 24 giờ tăng 5 lần và lưu lượng tăng 3 lần so với ngày thường.',
    hypothesis: 'Một ngày cố định tạo cảm giác khan hiếm và đám đông, nên người mua dồn nhu cầu vào đó. Đây là giả thuyết của người viết.' },
  options: [
    { name: 'Voucher và giảm giá mỗi ngày', bet: 'Cạnh tranh giá liên tục.', gain: 'Linh hoạt.', cost: 'Không tạo khoảnh khắc; kéo biên lợi nhuận.' },
    { name: 'Xây lòng trung thành bằng dịch vụ và logistics', bet: 'Đầu tư vận hành thay vì sự kiện.', gain: 'Bền hơn.', cost: 'Chậm, ít hiệu ứng truyền thông.' },
    { name: 'Chỉ theo ngày 11.11 của Alibaba', bet: 'Nhập cuộc một ngày đã có.', gain: 'Khách đã quen.', cost: 'Alibaba/Lazada đã chiếm ngày đó.' },
    { name: 'Tạo thêm ngày đôi riêng (9.9) và chạy song song 11.11, 12.12', bet: 'Gắn sự kiện với âm nhạc và đại sứ.', gain: 'Dồn nhu cầu theo lịch.', cost: 'Trợ giá lớn, đối thủ chạy cùng các ngày.', taken: 'Shopee tổ chức 9.9 đầu tiên ngày 9/9/2016.' } ],
  facts: [
    { t: '9.9 đầu tiên (9/9/2016): 25.000 người bán, đơn hàng 24 giờ tăng 5 lần và lưu lượng tăng 3 lần so với bất kỳ ngày nào trước đó.', who: 'Shopee (qua báo chí)', date: '28/9/2016', pub: 'Digital News Asia', url: 'https://digitalnewsasia.com/business/shopee-pioneers-largest-mobile-shopping-festival', caveat: 'Công ty tự công bố; không có mẫu số tuyệt đối.' },
    { t: '9.9/2019: đơn hàng gấp 3 lần năm trước, 187.606 sản phẩm bán trong một phút, quảng cáo đầu tiên của Ronaldo đạt 35 triệu lượt xem online.', who: 'Shopee', date: '12/9/2019', pub: 'Inside Retail Asia', url: 'https://insideretail.asia/2019/09/12/shopee-smashes-its-own-records-for-9-9-super-shopping-day/', caveat: 'Công ty tự công bố, không có số đơn tuyệt đối trong bài.' },
    { t: 'Lỗ EBITDA điều chỉnh trên mỗi đơn: 1,42 USD (2018) và 0,86 USD (2019). Mảng E-commerce: EBITDA điều chỉnh −1,69 tỷ USD năm 2022 và −213,8 triệu USD năm 2023.', who: 'Sea Ltd', date: '3/2020; 3/2024', pub: 'KrASIA; SEC', url: 'https://www.sec.gov/Archives/edgar/data/1703399/000110465924030484/tm247857d1_ex99-1.htm', caveat: 'Không tách chi phí marketing hay trợ giá riêng cho Shopee.' },
    { t: 'Thị phần GMV thương mại điện tử Việt Nam 2022: Shopee 63%, Lazada 23%, Tiki 6%, TikTok Shop 4%, Sendo 4%.', who: 'Momentum Works', date: '17/6/2023', pub: 'The Investor', url: 'https://theinvestor.vn/shopee-lazada-dominate-e-commerce-in-vietnam-d5436.html', caveat: 'Ước tính một công ty nghiên cứu; không tách tác động nhạc hiệu.' } ],
  unknown: 'Doanh số riêng của 9.9 hay 11.11 ở Việt Nam, chi phí đại sứ và trợ giá, và bất kỳ phép đo nào tách tác động của nhạc hiệu khỏi giảm giá và đại sứ. Chưa giải thích được chữ “hattrick” trong tên tệp của case này; không nên coi đó là tên chiến dịch chính thức.',
  causal: [
    { claim: 'Một ngày đôi dồn nhu cầu vào một thời điểm.', evidence: 'Đơn hàng 9.9 tăng 3–5 lần so với nền theo công bố của Shopee.', other: 'Trợ giá và miễn phí vận chuyển, mỗi đơn lúc đó lỗ khoảng 0,86–1,42 USD (EBITDA điều chỉnh); đại sứ siêu sao; mở rộng người dùng và người bán cùng lúc.' },
    { claim: 'Âm nhạc lặp giúp thương hiệu dễ nhận ra.', evidence: 'Bản “Baby Shark” của Shopee ở Việt Nam bị chê “ám ảnh” (14 nghìn dislike).', other: 'Không có phép đo mức nhớ thương hiệu; người ta cũng nhớ vì khuyến mãi và đại sứ.' } ],
  limits: [
    'Đối thủ cũng chạy cùng các ngày (Lazada 11.11 từ ít nhất 2017); “sở hữu” một ngày chưa có bằng chứng.',
    'Mô hình chạy bằng trợ giá: lợi nhuận chỉ xuất hiện sau khi chi phí marketing giảm (Sea 2023, −15%) và trong khi cạnh tranh từ TikTok Shop tăng.',
    'Chiến dịch đại sứ BLACKPINK ở Philippines từng bị Bộ Thương mại điều tra (theo Wikipedia).' ],
  practice: 'Chọn một sản phẩm của một cửa hàng nhỏ. Thiết kế một “ngày của riêng bạn” với: lý do chọn ngày, ưu đãi tối đa bạn chịu được (tính theo biên lợi nhuận), và cách bạn tránh bị trùng với sự kiện sàn. Ước tính lỗ/lãi một đơn trong ngày đó.',
  measure: 'Đơn trong ngày so với nền cùng kỳ, nhưng phải đo cả hiệu ứng “kéo trước, tụt sau” (đơn của các ngày lân cận), lợi nhuận sau trợ giá, và tỉ lệ khách quay lại không có ưu đãi.',
  reflect: [
    'Nếu bỏ hết trợ giá, “ngày đôi” còn dồn nhu cầu được không? Bạn dựa vào dữ liệu nào để dự đoán?',
    'Tách thế nào tác động của đại sứ khỏi tác động của giảm giá khi cả hai xảy ra cùng một ngày?',
    'Thương hiệu nhỏ không có ngân sách trợ giá của Sea có thể học điều gì từ mô hình này?' ],
  transfer: 'Không áp dụng khi bạn không chịu nổi trợ giá, khi đối thủ lớn chiếm sẵn ngày đó, hoặc khi khách hàng của bạn không mua theo mùa khuyến mãi.',
  sources: [
    { t: 'Shopee pioneers largest mobile shopping festival', pub: 'Digital News Asia', date: '28/9/2016', url: 'https://digitalnewsasia.com/business/shopee-pioneers-largest-mobile-shopping-festival' },
    { t: 'Shopee smashes its own records for 9.9 Super Shopping Day', pub: 'Inside Retail Asia', date: '12/9/2019', url: 'https://insideretail.asia/2019/09/12/shopee-smashes-its-own-records-for-9-9-super-shopping-day/' },
    { t: 'Sea Limited Q4 and full year 2023 results', pub: 'Sea Ltd (SEC)', date: '3/2024', url: 'https://www.sec.gov/Archives/edgar/data/1703399/000110465924030484/tm247857d1_ex99-1.htm' },
    { t: 'Shopee, Lazada dominate e-commerce in Vietnam', pub: 'The Investor', date: '17/6/2023', url: 'https://theinvestor.vn/shopee-lazada-dominate-e-commerce-in-vietnam-d5436.html' } ]
},

'vinamilk-rebrand': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Đọc một rebrand đúng cách: phân biệt “tài sản được giữ” với “kiểu dáng được đổi”, và không đổ công cho logo những kết quả kinh doanh do nguyên liệu và thị trường quyết định.',
  problem: 'Vinamilk muốn hiện đại hoá trải nghiệm khách hàng và nhận diện sau gần 47 năm, nhưng thương hiệu đã quá quen thuộc với nhiều thế hệ.',
  consumer: {
    observed: 'Phản ứng chia đôi: có lời khen tối giản, có chỉ trích cụ thể (khoảng cách giữa “EST” và “1976”, màu nền). Trào lưu đổi avatar “phủ xanh” và công cụ tạo logo ra mắt ngày 9/7/2023 (qua tóm tắt BrandsVietnam).',
    hypothesis: 'Người tiêu dùng trẻ nhìn thương hiệu qua kênh số và bao bì; một hệ nhận diện mới có thể giúp thương hiệu được chọn bởi thế hệ đang lớn. Chưa có nghiên cứu nào được công bố để chứng minh hình ảnh “gắn với thế hệ trước”.' },
  options: [
    { name: 'Giữ logo cũ, chỉ làm mới bao bì', bet: 'Tiến hoá nhẹ.', gain: 'Rủi ro thấp, giữ độ quen thuộc.', cost: 'Không tạo được câu chuyện thay đổi.' },
    { name: 'Đổi nhận diện theo từng dòng sản phẩm', bet: 'Kiến trúc thương hiệu đa tầng.', gain: 'Nhắm đúng từng nhóm khách.', cost: 'Phức tạp, loãng thương hiệu mẹ.' },
    { name: 'Đầu tư vào sản phẩm và nội dung thay vì logo', bet: 'Đổi giá trị chứ không đổi vỏ.', gain: 'Gần doanh số hơn.', cost: 'Không giải quyết cảm giác “cũ”.' },
    { name: 'Đổi cả hệ nhận diện, công bố một lần, áp dụng dần', bet: 'Từ phù hiệu sang wordmark, hệ minh hoạ, bảng màu phụ.', gain: 'Một câu chuyện thay đổi rõ.', cost: 'Chi phí thay đổi bao bì và điểm chạm; rủi ro mất tính thân quen.', taken: 'Công bố 6/7/2023; Studio DUY, Sovereign Objects, Yellow Type Foundry tham gia theo thông cáo.' } ],
  facts: [
    { t: 'Vinamilk công bố nhận diện mới ngày 6/7/2023, được gọi là lần đổi nhận diện hoàn chỉnh đầu tiên sau 47 năm; giữ xanh và trắng làm màu chính, thêm kem sữa và bảng màu phụ từ nguyên liệu địa phương; áp dụng dần từ tháng 7/2023.', who: 'Vinamilk (qua Báo Chính phủ, The Investor)', date: '7/7/2023', pub: 'Báo Chính phủ; The Investor', caveat: 'Thành lập 20/8/1976: đến 6/7/2023 là 46 năm 10 tháng.' },
    { t: 'Hơn 55 chuyên gia thuộc 10 quốc gia, chuẩn bị khoảng một năm; CEO Mai Kiều Liên nói chi phí tài chính “không nhiều” (không nêu số).', who: 'Vinamilk', date: '7/2023', pub: 'The Investor', caveat: 'Không kiểm chứng được chi phí.' },
    { t: 'Doanh thu hợp nhất 2023 khoảng 60,4 nghìn tỷ đồng (+0,7–1%), doanh thu nội địa gần như đi ngang (50.617 tỷ đồng); lợi nhuận sau thuế 9.019 tỷ đồng (+5,2%); biên lợi nhuận gộp 40,7% (+0,8 điểm %).', who: 'Vinamilk (qua VnBusiness, Thị trường Tài chính Tiền tệ)', date: '30–31/1/2024', pub: 'VnBusiness', url: 'https://vnbusiness.vn/vinamilk-dong-luc-thuc-day-doanh-thu-quy-42023-den-tu-thi-truong-nuoc-ngoai.html', caveat: 'Hai nguồn lệch nhẹ ở tổng doanh thu; nên dùng báo cáo tài chính gốc.' },
    { t: 'Lợi nhuận tăng chủ yếu nhờ giá nguyên liệu thấp; chi phí bán hàng và quảng cáo tăng từ nửa cuối 2023; doanh thu Q3/2023 giảm 2,8%.', who: 'Sài Gòn Đầu tư Tài chính', date: '4/1/2024', pub: 'SGĐT', url: 'https://dttc.sggp.org.vn/can-vinamilk-sustain-its-winning-streak-post110941.html', caveat: 'Phân tích báo chí.' } ],
  unknown: 'Tác động của rebrand lên doanh số, nhận biết hay thị phần; chi phí rebrand thật; số lượt “earned media” so với ngân sách ra mắt.',
  causal: [
    { claim: 'Một hệ nhận diện mới tạo chú ý và câu chuyện thay đổi.', evidence: 'Trào lưu đổi avatar, VietnamFinance đánh giá thành công truyền thông.', other: 'Chú ý không phải doanh số: doanh thu nội địa năm 2023 đi ngang, quý 3 giảm 2,8%.' },
    { claim: 'Rebrand giúp lợi nhuận tăng.', evidence: 'Lợi nhuận 2023 +5,2%.', other: 'Chủ yếu nhờ nguyên liệu rẻ; không thể viết “rebrand giúp tăng trưởng”.' } ],
  limits: [
    'Rủi ro mất tính thân quen của một thương hiệu quốc dân; một số chỉ trích cho rằng bản mới “kém thân thiện hơn” (qua tóm tắt tìm kiếm).',
    'Không có đo lường nhận biết/yêu thích trước và sau.',
    'Chi phí thay bao bì toàn dải rất lớn (suy luận), CEO nói không nhiều nhưng không có số.' ],
  practice: 'Chọn một thương hiệu lâu năm bạn biết. Liệt kê 5 tài sản nhận diện, rồi đánh dấu tài sản nào khách nhận ra chỉ bằng một cái liếc (màu, chữ, hình, âm). Viết quyết định giữ/đổi cho từng tài sản và cách bạn kiểm tra bằng 20 người trước khi đổi.',
  measure: 'Trước–sau: nhận ra thương hiệu không logo, nhầm lẫn với đối thủ, ý định mua theo nhóm tuổi; sau 3–6–12 tháng. Rebrand cần ít nhất một chỉ số hành vi, không chỉ cảm xúc trên mạng.',
  reflect: [
    'Vinamilk nói chi phí “không nhiều”. Bạn cần thấy con số nào để tin?',
    'Nếu doanh số nội địa năm sau tăng, bạn sẽ quy bao nhiêu cho rebrand? Bạn cần đối chứng nào?',
    'Khi nào phản đối trên mạng là dấu hiệu tài sản mạnh, khi nào là dấu hiệu bạn đã đổi sai?' ],
  transfer: 'Không áp dụng khi vấn đề thật sự là sản phẩm hoặc giá, khi bạn chưa biết tài sản nào của mình đáng giữ, hoặc khi ngân sách không đủ để thay đồng bộ các điểm chạm.',
  sources: [
    { t: 'Vinamilk công bố nhận diện mới', pub: 'Báo Chính phủ', date: '7/7/2023' },
    { t: 'Vinamilk rebrand', pub: 'The Investor', date: '9/7/2023' },
    { t: 'Vinamilk: động lực thúc đẩy doanh thu quý 4/2023', pub: 'VnBusiness', date: '31/1/2024', url: 'https://vnbusiness.vn/vinamilk-dong-luc-thuc-day-doanh-thu-quy-42023-den-tu-thi-truong-nuoc-ngoai.html' },
    { t: 'Can Vinamilk sustain its winning streak', pub: 'Sài Gòn Đầu tư Tài chính', date: '4/1/2024', url: 'https://dttc.sggp.org.vn/can-vinamilk-sustain-its-winning-streak-post110941.html' } ]
},

'highlands-third-place': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Đánh giá câu “phân phối là chiến lược marketing” bằng dữ kiện: cái nào là số đo, cái nào là cách giải thích phổ biến, và vì sao vốn và đối thủ vấp cũng quan trọng.',
  problem: 'Thị trường cà phê Việt Nam rất đông (317.299 cửa hàng cà phê và trà năm 2023, theo iPOS qua Vietnam News). Highlands cần mở rộng nhanh bằng một mô hình đủ phổ thông để nhân bản.',
  consumer: {
    observed: 'Không có khảo sát hay phát biểu của Highlands về insight “khách cần một chỗ ngồi hơn là cà phê”.',
    hypothesis: 'Khách ở đô thị cần chỗ ngồi có điều hoà, ổ điện, riêng tư tương đối; sự tiện lợi và quen thuộc thắng chất lượng hạt trong category này. Đây là giả định của người viết; các bài marketing cũng thường diễn giải như vậy.' },
  options: [
    { name: 'Định vị cao cấp kiểu Starbucks', bet: 'Ít cửa hàng, giá cao.', gain: 'Biên lợi nhuận cao.', cost: 'Quy mô nhỏ; theo VIRAC, chuỗi nước ngoài định giá cao gấp 2–3 lần quán nội.' },
    { name: 'Mô hình mang đi/kiosk', bet: 'Giảm tiền thuê mặt bằng.', gain: 'Chi phí gọn.', cost: 'Mất “chỗ ngồi”.' },
    { name: 'Nhượng quyền sớm và rộng', bet: 'Mở nhanh bằng vốn người khác.', gain: 'Tốc độ.', cost: 'Khó giữ chuẩn.' },
    { name: 'Phủ rộng ở điểm đông người với menu phổ thông', bet: 'Mở nhiều cửa hàng chuẩn hoá.', gain: 'Độ phủ, nhận diện qua điểm bán.', cost: 'Chi phí thuê tăng, cạnh tranh cửa hàng.', taken: 'Jollibee mua 50% SuperFoods (chủ Highlands) ngày 24/1/2012 với 25 triệu USD.' } ],
  facts: [
    { t: 'Jollibee công bố ngày 24/1/2012 mua 50% SuperFoods Group (chủ sở hữu Highlands Coffee và Phở 24) giá 25 triệu USD từ Viet Thai International, kèm khoản vay 35 triệu USD cho VTI; lúc đó Highlands có 54 cửa hàng.', who: 'Báo chí (DTi News)', date: '24/1/2012', pub: 'DTi News', url: 'https://dtinews.dantri.com.vn/print/20120913171436460.htm', caveat: 'Nhiều nguồn Việt ghi 2011; đây là ngày công bố thương vụ theo DTi.' },
    { t: 'Năm 2018: Highlands 240 cửa hàng, doanh thu khoảng 1.628 tỷ đồng, lợi nhuận sau thuế khoảng 99 tỷ; The Coffee House 140 cửa hàng (lãi khoảng 2 tỷ); Starbucks 45 cửa hàng (lãi 27 tỷ).', who: 'VIRAC', date: '12/10/2020', pub: 'Doanh nghiệp & Hội nhập', url: 'https://doanhnghiephoinhap.vn/chuoi-ca-phe-viet-thang-the-46731.html', caveat: 'Tổng hợp của một công ty nghiên cứu.' },
    { t: 'Số cửa hàng ghi khác nhau theo nguồn: 605 (cuối 2022), 777 (đầu 2024, website công ty), 928 (cuối Q3/2025, JFC). Mỗi câu “Highlands có X cửa hàng” phải kèm năm và nguồn.', who: 'iPOS/Vietnam News; Tuổi Trẻ (JFC)', date: '2022–2025', pub: 'Tuổi Trẻ', url: 'https://tuoitre.vn/chuoi-ca-phe-lon-nhat-viet-nam-bao-lai-cao-nhat-2-nam-co-ke-hoach-len-san-20251117143042242.htm', caveat: 'Các số mâu thuẫn (phạm vi Philippines, nhượng quyền); không xếp thành một chuỗi liền.' },
    { t: 'Ngày 23/9/2026 Jollibee công bố bán 11% cho VTI của David Thái (từ 60% xuống 49%), định giá vốn 800 triệu USD; IPO dự kiến Q1/2027.', who: 'JFC (qua Vietnam News)', date: '24/9/2026', pub: 'Vietnam News', url: 'https://vietnamnews.vn/economy/1800450/highlands-coffee-founder-spends-over-88-million-to-buy-back-stake.html', caveat: 'Chưa hoàn tất, cần cơ quan quản lý duyệt.' } ],
  unknown: 'Mặt bằng có phải yếu tố quyết định hay không (không có phát biểu công ty hay nghiên cứu xác nhận), số cửa hàng và thị phần theo doanh thu từ nguồn độc lập, và tách tác động vốn của Jollibee khỏi tác động mô hình.',
  causal: [
    { claim: 'Độ phủ điểm bán là chiến lược thắng của Highlands.', evidence: 'Số cửa hàng tăng nhanh theo mọi nguồn (54 năm 2012 lên vài trăm đến hơn 900 sau đó).', other: 'Vốn và hậu thuẫn của Jollibee (25 triệu USD và khoản vay 35 triệu USD năm 2012); đối thủ vấp (Starbucks mở chậm, Caffe Bene thu hẹp từ kế hoạch 300 còn 100 cửa hàng).' },
    { claim: 'Mô hình bền vững.', evidence: 'Same-store sales +17,2% và EBITDA cao nhất 2 năm (Q3/2025).', other: 'Cùng kỳ chuỗi mở 109 và đóng 31 điểm; nhiều ý kiến cho rằng cuộc đua số cửa hàng làm tăng chi phí (Võ Văn Quang 2020; báo Đại biểu Nhân dân 2026 — ý kiến, không phải số liệu).' } ],
  limits: [
    '“Mặt bằng là chiến lược” chỉ là cách giải thích phổ biến trong các bài marketing, không phải phát biểu của công ty.',
    'Mô hình điểm bán dày dễ tổn thương khi lưu lượng người giảm (Covid, nguồn cần kiểm).',
    'Gen Z có thể chuyển sang cà phê đặc sản (ý kiến báo chí).' ],
  practice: 'Chọn một khu phố bạn biết. Đếm 5 quán cà phê và ghi: vị trí, chỗ ngồi, ổ điện, giá. Với mỗi quán, nêu người khách nào không có lựa chọn nào tốt hơn. Rồi đoán nếu mở thêm một Highlands thì quán nào mất khách nhiều nhất và vì sao.',
  measure: 'Doanh thu trên mỗi điểm bán, tỉ lệ đóng/mở điểm, same-store sales, và chi phí thuê trên doanh thu; nhận diện thương hiệu theo khu vực có và không có điểm bán.',
  reflect: [
    'Nếu không có vốn Jollibee, bạn nghĩ Highlands vẫn mở nhanh vậy không? Dữ liệu nào cho biết?',
    'Số cửa hàng tăng có phải bằng chứng của chiến lược đúng? Bạn cần thêm chỉ số nào?',
    'Khi nào “có mặt đúng chỗ” thua “được yêu thích”?' ],
  transfer: 'Không áp dụng cho category cần niềm tin hoặc trải nghiệm đặc trưng (cà phê đặc sản, dịch vụ chuyên sâu), hoặc khi chi phí mặt bằng làm biên lợi nhuận không còn.',
  sources: [
    { t: 'Jollibee mua 50% SuperFoods Group', pub: 'DTi News', date: '1/2012', url: 'https://dtinews.dantri.com.vn/print/20120913171436460.htm' },
    { t: 'Chuỗi cà phê Việt thắng thế', pub: 'Doanh nghiệp & Hội nhập', date: '12/10/2020', url: 'https://doanhnghiephoinhap.vn/chuoi-ca-phe-viet-thang-the-46731.html' },
    { t: 'Chuỗi cà phê lớn nhất Việt Nam báo lãi cao nhất 2 năm', pub: 'Tuổi Trẻ', date: '17/11/2025', url: 'https://tuoitre.vn/chuoi-ca-phe-lon-nhat-viet-nam-bao-lai-cao-nhat-2-nam-co-ke-hoach-len-san-20251117143042242.htm' },
    { t: 'Highlands Coffee founder buys back stake', pub: 'Vietnam News', date: '24/9/2026', url: 'https://vietnamnews.vn/economy/1800450/highlands-coffee-founder-spends-over-88-million-to-buy-back-stake.html' } ]
},

'ogilvy-rolls': {
  status: 'success', verified: '17/10/2026',
  objective: 'Học nguyên tắc “dữ kiện thay tính từ” từ một quảng cáo kinh điển, đồng thời học cách nghi ngờ chuyện kể của chính người trong cuộc.',
  problem: 'Rolls-Royce tự nhận “xe tốt nhất thế giới” mà không chứng minh. Ogilvy cần một quảng cáo in thuyết phục người mua xe sang ở Mỹ, với ngân sách chỉ khoảng 50.000 USD (theo lời Ogilvy, chưa đến 2% ngân sách Cadillac).',
  consumer: {
    observed: 'Người mua xe sang đọc nhiều và so sánh; Ogilvy nói ông mất ba tuần đọc về chiếc xe trước khi viết (lời kể của chính ông).',
    hypothesis: 'Người mua tiền tỷ cần một chi tiết cụ thể đủ để tự thuyết phục mình và người khác; nhiều chữ không làm họ mệt vì đây là quyết định mua đắt. Đây là cách đọc của người viết.' },
  options: [
    { name: 'Quảng cáo địa vị, người nổi tiếng', bet: 'Đi theo lối sống.', gain: 'Gắn cảm xúc.', cost: 'Cadillac đã chiếm lối đó với ngân sách lớn hơn nhiều.' },
    { name: 'Chỉ dùng tính từ', bet: 'Giữ lối “tốt nhất thế giới”.', gain: 'An toàn.', cost: 'Không phân biệt, không chứng minh.' },
    { name: 'Tiêu đề dữ kiện và nội dung dài trên báo cao cấp', bet: 'Chứng minh bằng chi tiết cụ thể.', gain: 'Uy tín cho khách đọc kỹ.', cost: 'Chỉ hợp ngành và kênh đọc kỹ; không đo được mức đọc.', taken: 'Chạy từ 1958 trên The New Yorker và các báo lớn, đến khoảng 1962.' } ],
  facts: [
    { t: 'Tiêu đề là một câu trích từ biên tập viên kỹ thuật tạp chí The Motor (Ogilvy nói như vậy); quảng cáo Pierce-Arrow 1933 có câu gần như giống, và Charles Brower (BBDO) đã chỉ ra điều đó.', who: 'Ogilvy; Swiped', date: '1933; 1958', pub: 'Swiped', url: 'https://swiped.co/guide-to-rolls-royce-ogilvy/', caveat: 'Chưa tìm được số The Motor gốc.' },
    { t: 'Số chữ ghi lệch: 719 chữ (theo trí nhớ của Ogilvy, trong “Confessions of an Advertising Man”, 1963) hay 607 chữ (nguồn khác). Số điểm đánh số khác nhau theo phiên bản (một bản 1959 có 9 điểm).', who: 'Ogilvy; các nguồn khác', date: '1958–1963', pub: 'Swiped; Consumer Guide', url: 'https://swiped.co/guide-to-rolls-royce-ogilvy/', caveat: 'Có nhiều phiên bản của quảng cáo.' },
    { t: 'Silver Cloud I (1955–1958): 2.238 xe sản xuất; toàn dòng Cloud 7.372 xe (1955–1966).', who: 'Wikipedia (thứ cấp)', date: '1955–1966', pub: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Rolls-Royce_Silver_Cloud', caveat: 'Không phải doanh số Mỹ, không theo năm.' } ],
  unknown: 'Hiệu quả bán hàng của quảng cáo. Con số “doanh số tăng 50% năm 1958” chỉ lưu truyền qua blog, không có nguồn gốc kiểm được; đừng dùng. Cũng không có số đo mức đọc hay nhớ quảng cáo.',
  causal: [
    { claim: 'Một dữ kiện cụ thể thuyết phục hơn nhiều tính từ.', evidence: 'Quảng cáo được trích dẫn rộng rãi như một mẫu mực; Ogilvy dùng nó để thu hút các tài khoản lớn như Shell.', other: 'Hầu hết dữ kiện (ba tuần đọc, 719 chữ, “tiêu đề hay nhất”) đến từ chính Ogilvy — người hưởng lợi từ câu chuyện.' },
    { claim: 'Doanh số Rolls-Royce tăng nhờ quảng cáo.', evidence: 'Chỉ có tuyên bố lưu truyền.', other: 'Rolls-Royce là hàng xa xỉ khối lượng rất nhỏ nên dao động vài xe tạo phần trăm lớn; mạng đại lý, mẫu xe mới và kinh tế Mỹ đều là ứng viên (suy luận).' } ],
  limits: [
    'Tính nguyên bản của “ý tưởng” bị đặt dấu hỏi: tiêu đề là câu trích; một quảng cáo 1933 có câu gần giống.',
    'Nội dung dài chỉ phù hợp khách hàng và kênh in cao cấp; không suy rộng được cho mọi ngành.',
    'Tuyên bố “xe yên lặng nhất” mang tính marketing; một nguồn nói chiếc đồng hồ không hoàn toàn im lặng.' ],
  practice: 'Lấy một đoạn quảng cáo của một sản phẩm bạn biết, gạch dưới mọi tính từ. Thay mỗi tính từ bằng một dữ kiện kiểm được (số, thử nghiệm, thời gian). Nếu không thay được, hãy ghi “cần nghiên cứu sản phẩm thêm”.',
  measure: 'Đo mức đọc (thời gian trên trang, cuộn), nhớ quảng cáo trong nhóm khách mục tiêu, và nguồn khách có mã. Quảng cáo kiểu này đo bằng chất lượng khách hơn là lượng nhấp.',
  reflect: [
    'Biết rằng tiêu đề là câu trích của một biên tập viên khác, bạn còn gọi đây là “ý tưởng sáng tạo của Ogilvy” không?',
    'Làm sao bạn kiểm tra một con số được nêu trong quảng cáo của chính mình không bị phóng đại?',
    'Chữ nhiều hợp với ngành nào, và ngành nào thì quảng cáo dài là tự sát?' ],
  transfer: 'Không áp dụng khi sản phẩm không có dữ kiện cụ thể đáng nói, khi khách không đọc kỹ (hàng tiêu dùng nhanh), hoặc khi kênh không cho phép nội dung dài.',
  sources: [
    { t: 'Guide to the Rolls-Royce ad', pub: 'Swiped', date: '', url: 'https://swiped.co/guide-to-rolls-royce-ogilvy/' },
    { t: 'Rolls-Royce Silver Cloud', pub: 'Wikipedia (thứ cấp)', date: '', url: 'https://en.wikipedia.org/wiki/Rolls-Royce_Silver_Cloud' },
    { t: 'Confessions of an Advertising Man', pub: 'David Ogilvy', date: '1963' } ]
},

'dienmayxanh-nguoi-xanh': {
  status: 'mixed', verified: '17/10/2026',
  objective: 'Học cách tách tác động của một TVC khỏi tác động của việc mở cửa hàng cực nhanh, và đọc một mục tiêu “top-of-mind” khi chưa có số đo top-of-mind.',
  problem: 'Điện Máy Xanh (Thế Giới Di Động) mở rất nhanh, cần cái tên bật ra đầu tiên khi người ta nghĩ đến mua tivi, tủ lạnh, máy giặt — Chủ tịch Nguyễn Đức Tài nêu đúng mục tiêu đó.',
  consumer: {
    observed: 'Thảo luận mạng xã hội rất lớn theo một nguồn (khoảng 400 nghìn bài viết, hơn 3,4 triệu tương tác, không nêu ai đo); đến 29/12/2016 quảng cáo đạt 2,3 triệu lượt xem trên Facebook và gần 2 triệu trên YouTube.',
    hypothesis: 'Ở category mua thưa, được nhớ quan trọng hơn được khen; gây khó chịu cũng là một cách để được nhớ. Đây là cách nhìn của người viết, phù hợp mục tiêu top-of-mind nhưng chưa có số đo.' },
  options: [
    { name: 'Quảng cáo cảm xúc “đẹp”', bet: 'Kể chuyện gia đình.', gain: 'Thiện cảm.', cost: 'Dễ lẫn với các chuỗi khác.' },
    { name: 'Cạnh tranh giá', bet: 'Giảm giá mạnh.', gain: 'Doanh số nhanh.', cost: 'Kéo biên lợi nhuận.' },
    { name: 'Chỉ mở cửa hàng, dựa vào mạng lưới Thế Giới Di Động', bet: 'Không chi lớn cho TVC.', gain: 'Chi phí gọn.', cost: 'Khó thành cái tên đầu tiên trong đầu.' },
    { name: 'Vừa mở cửa hàng cực nhanh vừa quảng cáo dày ở giờ vàng', bet: 'TVC nhạc lặp, nhân vật đồ xanh.', gain: 'Nhận biết nhanh.', cost: 'Hàng trăm tỷ đồng quảng cáo, rủi ro “con dao hai lưỡi”.', taken: 'TVC bắt đầu phát khoảng 1/11/2016, kéo dài sang 2017.' } ],
  facts: [
    { t: '9 tháng đầu 2016: doanh thu Điện Máy Xanh tăng 211%, tháng 9/2016 đạt 1.165 tỷ đồng; mở 81 cửa hàng trong 9 tháng, nhiều hơn tổng số mở từ 2010 đến 2015.', who: 'MWG qua VnEconomy', date: '19/11/2016', pub: 'VnEconomy', url: 'https://vneconomy.vn/9-thang-2016-dien-may-xanh-tang-truong-doanh-thu-tren-200.htm', caveat: 'Mức tăng này xảy ra TRƯỚC khi TVC lên sóng ngày 1/11/2016.' },
    { t: '2017: doanh thu chuỗi Điện Máy Xanh 30.245 tỷ đồng (+120,6%); mở 386 siêu thị trong năm (khoảng 32 cửa hàng mỗi tháng); doanh thu mỗi cửa hàng mỗi tháng giảm còn 5,88 tỷ đồng từ 8,82 tỷ do mở mini.', who: 'MWG, tổng hợp của CTS', date: '6/2/2018', pub: 'CTS (VietinBank Securities)', url: 'https://cts.vn/wp-content/uploads/migrate/2018/02/09/mwgupdate06022018.pdf', caveat: 'Báo cáo của công ty chứng khoán; số cửa hàng đọc từ biểu đồ có thể lệch vài đơn vị.' },
    { t: 'Thị phần điện tử tiêu dùng của MWG: 8% (2015) lên 28% (cuối 2017), gồm cả sáp nhập Trần Anh.', who: 'GfK qua CTS', date: '2/2018', pub: 'CTS', url: 'https://cts.vn/wp-content/uploads/migrate/2018/02/09/mwgupdate06022018.pdf', caveat: 'Không tách tác động quảng cáo.' },
    { t: 'Chủ tịch MWG nói TVC phát ở khung giờ vàng trong 4 tháng cuối 2016 và cả 2017; chi phí cuối 2016 là “hàng trăm tỷ đồng”, 2017 cao hơn nhiều.', who: 'Nguyễn Đức Tài', date: '29/12/2016', pub: 'VietnamFinance', url: 'https://vietnamfinance.vn/quang-cao-cua-dien-may-xanh-co-phai-la-chieu-thuc-co-chu-dich-d6611.html', caveat: 'Không nêu số chính xác; bài cũng nói chưa có kết quả kinh doanh của chiến dịch.' } ],
  unknown: 'Bất kỳ số liệu nào gắn riêng TVC với doanh số, độ nhận biết top-of-mind hay thị phần; tác động lâu dài lên hình ảnh thương hiệu. Chưa xem lại video gốc để xác nhận mô tả chi tiết nhân vật.',
  causal: [
    { claim: 'TVC giúp Điện Máy Xanh bùng nổ năm 2016.', evidence: 'Doanh thu 11 tháng 2016 +207%, nhận biết rộng theo thảo luận mạng.', other: 'Doanh thu đã +211% sau 9 tháng, trước TVC. Mở cửa hàng cực nhanh (81 cửa hàng trong 9 tháng; 386 trong 2017), mô hình cửa hàng nhỏ dễ mở, tín dụng tiêu dùng tăng, và sáp nhập Trần Anh giải thích tốt hơn.' },
    { claim: 'Bị chê nhiều tạo thêm lượt nhắc.', evidence: 'Hàng trăm nghìn bài thảo luận, hơn 3,4 triệu tương tác (một nguồn).', other: 'Diễn đàn Doanh nghiệp (2020) gọi đó là “con dao hai lưỡi”; chưa có số đo tác động tiêu cực lâu dài.' } ],
  limits: [
    'Không thể quy “bùng nổ 2016” cho TVC: tăng trưởng đã xảy ra trước khi quảng cáo lên sóng.',
    'Doanh thu mỗi cửa hàng giảm khi mở nhiều mini ở nông thôn: mở nhanh có giá.',
    'Phong cách gây tranh cãi có thể ảnh hưởng hình ảnh dài hạn; chưa có nghiên cứu theo dõi.' ],
  practice: 'Giả sử bạn là marketing của một chuỗi bán lẻ đang mở 30 điểm mỗi tháng. Thiết kế một thử nghiệm đo riêng tác động quảng cáo: chọn tỉnh có và không có quảng cáo, nêu chỉ số, thời gian, và cách loại trừ hiệu ứng điểm bán mới.',
  measure: 'Top-of-mind (hỏi “khi nghĩ đến mua máy giặt, bạn nghĩ đến đâu đầu tiên?”) theo khu vực, tách khu có và không có cửa hàng mới; doanh thu trên mỗi cửa hàng cũ; chi phí quảng cáo trên mỗi đơn mới.',
  reflect: [
    'Nếu doanh thu đã tăng 211% trước TVC, bài học nào về TVC vẫn đáng giữ, bài học nào phải bỏ?',
    'Bạn sẽ thiết kế thế nào để biết quảng cáo gây khó chịu đang giúp hay hại?',
    'Mục tiêu “top-of-mind” có hợp lý khi bạn chưa đo nó trước và sau chiến dịch không?' ],
  transfer: 'Không áp dụng khi category được mua thường xuyên, khi bạn chưa có độ phủ điểm bán để đón nhu cầu, hoặc khi thương hiệu không chịu được phản ứng tiêu cực.',
  sources: [
    { t: '9 tháng 2016, Điện Máy Xanh tăng trưởng doanh thu trên 200%', pub: 'VnEconomy', date: '19/11/2016', url: 'https://vneconomy.vn/9-thang-2016-dien-may-xanh-tang-truong-doanh-thu-tren-200.htm' },
    { t: 'Quảng cáo của Điện Máy Xanh có phải là chiêu thức có chủ đích', pub: 'VietnamFinance', date: '29/12/2016', url: 'https://vietnamfinance.vn/quang-cao-cua-dien-may-xanh-co-phai-la-chieu-thuc-co-chu-dich-d6611.html' },
    { t: 'MWG update', pub: 'CTS (VietinBank Securities)', date: '6/2/2018', url: 'https://cts.vn/wp-content/uploads/migrate/2018/02/09/mwgupdate06022018.pdf' } ]
},

});

Object.assign(CAMPAIGN_DEEP, {

'pepsi-kendall-jenner': {
  status: 'failure', verified: '17/10/2026', isNew: true,
  objective: 'Phân biệt “thích quảng cáo” với “thương hiệu không bị tổn hại”, và nhận ra vì sao đối tượng đo quyết định kết luận về một sự cố truyền thông.',
  problem: 'Pepsi muốn gắn “Live for Now” với tinh thần đoàn kết của người trẻ bằng một quảng cáo lớn do đội in-house tự làm; câu hỏi là làm sao dùng một chủ đề xã hội nóng mà không bị coi là chiếm dụng.',
  consumer: {
    observed: 'Hai phép đo cho kết quả trái chiều. Morning Consult (khoảng 2.000 người Mỹ được cho xem quảng cáo, tháng 4/2017): 44% có thiện cảm hơn với Pepsi, khoảng một phần tư kém thiện cảm hơn. YouGov BrandIndex (dân số chung): chỉ số Buzz của Pepsi từ 9 (4/4) xuống −7 (11/4) rồi hồi lên −3 sau khoảng một tuần.',
    hypothesis: 'Người xem trực tiếp quảng cáo có thể thấy nó thân thiện, còn dư luận chung phản ứng với việc một thương hiệu dùng hình ảnh phong trào xã hội. Đây là cách giải thích của người viết dựa trên hai phép đo khác nhau.' },
  options: [
    { name: 'Giữ ý tưởng đoàn kết nhưng đặt ở bối cảnh không đụng phong trào (lễ hội, thể thao)', bet: 'Chủ đề lành.', gain: 'Gần như không rủi ro.', cost: 'Mờ nhạt, khó tạo chuyện.' },
    { name: 'Hợp tác thật với người/tổ chức từng tham gia hoạt động xã hội', bet: 'Trả công, trao quyền duyệt.', gain: 'Tính xác thực.', cost: 'Chậm, mất kiểm soát thông điệp.' },
    { name: 'Thử nội dung trên nhóm đa dạng hoặc qua đại lý ngoài trước khi phát', bet: 'Tìm điểm mù.', gain: 'Phát hiện sớm.', cost: 'Tốn thời gian và tiền; có thể nhạt đi.' },
    { name: 'Phát hành quảng cáo như đã làm', bet: 'Kể câu chuyện đoàn kết bằng một người nổi tiếng.', gain: 'Chú ý lớn.', cost: 'Bị chỉ trích dữ dội, gỡ sau khoảng một ngày.', taken: 'Pepsi phát hành 4/4/2017 và gỡ 5/4/2017.' } ],
  facts: [
    { t: 'Quảng cáo ra mắt thứ Ba 4/4/2017; Pepsi gỡ ngày 5/4/2017, nói “missed the mark”, xin lỗi và xin lỗi riêng Kendall Jenner.', who: 'Pepsi', date: '5/4/2017', pub: 'Fox Business', url: 'https://www.foxbusiness.com/features/2017/04/05/pepsi-apologizes-pulls-mocked-kendall-jenner-protest-ad.html', caveat: 'Bài không nêu lượt xem hay dislike.' },
    { t: 'YouGov BrandIndex: Buzz của Pepsi từ 9 (4/4) xuống −7 (11/4), hồi lên −3 sau khoảng một tuần; ý định cân nhắc mua từ 28% xuống 20% rồi 24%.', who: 'YouGov (Ted Marzilli)', date: '19/4/2017', pub: 'YouGov', url: 'https://yougov.com/en-us/articles/17985-pepsi-recovering-slowly-pulling-kendall-jenner-ad', caveat: 'Không nêu cỡ mẫu; chính bài nêu giả thuyết nhiễu (vụ United Airlines, Coachella cùng thời điểm).' },
    { t: 'Morning Consult: 44% người xem quảng cáo có thiện cảm hơn với Pepsi, 32% dễ mua hơn, 20% khó mua hơn, chỉ 28% nhìn Jenner tích cực hơn.', who: 'Morning Consult (khoảng 2.000 người Mỹ)', date: '16/4/2017', pub: 'The Drum', url: 'https://www.thedrum.com/news/pepsis-brand-image-has-improved-44-following-ad-fiasco', caveat: 'Khảo sát người được cho xem quảng cáo; đo thái độ, không đo hành vi mua.' },
    { t: 'Quảng cáo do đội in-house Creators League Studio của PepsiCo làm; người đứng đầu đội sáng tạo in-house rời PepsiCo khoảng 6 tháng sau.', who: 'Marketing Week; Adweek', date: '4–10/2017', pub: 'Marketing Week', url: 'https://www.marketingweek.com/pepsi-scandal-prove-lack-diversity-house-work-flawed/', caveat: 'Chưa có bằng chứng ông rời đi vì vụ này.' } ],
  unknown: 'Tác động lên doanh số hay thị phần (PepsiCo không tách trong báo cáo), chi phí sản xuất, tiền chi cho Jenner, quy trình duyệt nội bộ. Số “giá trị thương hiệu giảm 4% còn 18,3 tỷ USD” là số năm 2016, trước quảng cáo: đừng dùng như hậu quả.',
  causal: [
    { claim: 'Một chủ đề xã hội mượn mà không có người trong cuộc dễ bị đọc là chiếm dụng.', evidence: 'Phản ứng dữ dội trong ngày, quảng cáo bị gỡ sau khoảng một ngày.', other: 'Marketing Week trích ba chuyên gia bất đồng nhau về nguyên nhân chính (in-house, thiếu đa dạng, thiếu thử nghiệm): đây là ý kiến.' },
    { claim: 'Tổn hại thương hiệu là ngắn hạn.', evidence: 'Buzz hồi từ −7 lên −3 trong khoảng một tuần.', other: 'Không có dữ liệu dài hạn công khai; vụ United Airlines và Coachella cùng thời điểm có thể làm nhiễu số YouGov.' } ],
  limits: [
    'Hai phép đo trái chiều không mâu thuẫn mà đo hai nhóm khác nhau.',
    'Nhận định “in-house nên hỏng” chỉ là ý kiến người trong ngành.',
    'Không có số doanh số, nên không nên khẳng định “quảng cáo làm giảm doanh số”.' ],
  practice: 'Lấy một chủ đề xã hội đang nóng. Viết ba điều kiện để một thương hiệu bạn biết được phép nói về nó: người trong cuộc nào cùng làm, thương hiệu chịu chi phí gì, ai có quyền duyệt. Nếu thiếu điều kiện nào thì nên làm gì thay thế?',
  measure: 'Đo ở ba nhóm: người xem trực tiếp, dân số chung, và nhóm mục tiêu; đo thái độ theo ngày trong tuần đầu và theo tháng. Thêm hành vi mua nếu có thể.',
  reflect: [
    'Hai phép đo trái chiều: bạn tin phép đo nào để quyết định gỡ quảng cáo? Vì sao?',
    'So với Nike Dream Crazy, điều gì khác nhau ở chỗ người trong cuộc và chi phí chịu?',
    'Nếu bạn là giám đốc marketing ngay sáng 5/4/2017, bạn làm gì trong 3 giờ đầu?' ],
  transfer: 'Không áp dụng như một công thức “quảng cáo luôn hỏng khi chạm chính trị”; Nike cho thấy kết quả khác khi có người trong cuộc và chịu chi phí. Bài học nằm ở điều kiện, không ở chủ đề.',
  sources: [
    { t: 'Pepsi apologizes, pulls mocked Kendall Jenner protest ad', pub: 'Fox Business', date: '5/4/2017', url: 'https://www.foxbusiness.com/features/2017/04/05/pepsi-apologizes-pulls-mocked-kendall-jenner-protest-ad.html' },
    { t: 'Pepsi recovering slowly after pulling Kendall Jenner ad', pub: 'YouGov', date: '19/4/2017', url: 'https://yougov.com/en-us/articles/17985-pepsi-recovering-slowly-pulling-kendall-jenner-ad' },
    { t: 'Pepsi’s brand image has improved 44% following ad fiasco', pub: 'The Drum', date: '16/4/2017', url: 'https://www.thedrum.com/news/pepsis-brand-image-has-improved-44-following-ad-fiasco' },
    { t: 'Pepsi scandal proves lack of diversity in in-house work is flawed', pub: 'Marketing Week', date: '7/4/2017', url: 'https://www.marketingweek.com/pepsi-scandal-prove-lack-diversity-house-work-flawed/' } ]
},

'old-spice-smell-like-a-man': {
  status: 'success', verified: '17/10/2026', isNew: true,
  objective: 'Đọc một case “số đẹp” bằng ba câu hỏi (ai đo, kỳ nào, cấp nào) và học cách đổi đối tượng nói tới từ insight về người mua.',
  problem: 'Old Spice là thương hiệu lâu đời bị coi là của thế hệ trước, đối mặt Axe và Dove Men+Care (cùng thuộc Unilever) trong phân khúc sữa tắm nam.',
  consumer: {
    observed: 'Theo hồ sơ dự giải của Wieden+Kennedy gửi D&AD, phụ nữ chiếm hơn 50% lượng mua sữa tắm. Đây là nghiên cứu nội bộ của đại lý, chưa có kiểm chứng độc lập.',
    hypothesis: 'Nếu phụ nữ mua cho người đàn ông của mình, một quảng cáo nói với phụ nữ mà đàn ông vẫn thấy hài hước có thể phục vụ cả người mua lẫn người dùng. Đây là cách đọc của người viết.' },
  options: [
    { name: 'Tiếp tục nói thẳng với đàn ông (kiểu Axe)', bet: 'Quyến rũ tình dục.', gain: 'Đúng người dùng.', cost: 'Axe đã chiếm vị trí này.' },
    { name: 'Giảm giá và khuyến mãi tại điểm bán', bet: 'Đẩy doanh số.', gain: 'Nhanh, đo được.', cost: 'Không giải quyết hình ảnh “của ông nội”.' },
    { name: 'Mua TV đại chúng, không làm phản hồi thời gian thực', bet: 'Dễ kiểm soát.', gain: 'Rủi ro thấp.', cost: 'Mất hiệu ứng cuộc trò chuyện.' },
    { name: 'Nói với phụ nữ về người đàn ông của họ, rồi phản hồi từng bình luận', bet: 'Hài hước phi lý, 186 video trả lời.', gain: 'Chú ý lớn.', cost: 'Cần đội làm nhanh; số đo bán hàng gây tranh cãi.', taken: 'Wieden+Kennedy Portland, đạo diễn Tom Kuntz, ra mắt 2/2010.' } ],
  facts: [
    { t: 'Chiến dịch ra mắt trực tuyến trước Super Bowl rồi lên TV; Film Grand Prix tại Cannes Lions 2010 (26/6/2010).', who: 'D&AD; Campaign', date: '2/2010; 6/2010', pub: 'D&AD', url: 'https://www.dandad.org/insights/awards/old-spice-case-study-insights', caveat: 'Ngày ra mắt khác nhau giữa các nguồn (7 hoặc 8/2/2010). Giải thưởng đo sáng tạo, không đo bán hàng.' },
    { t: 'Chiến dịch phản hồi tháng 7/2010: 186 video trả lời bình luận, làm trong khoảng 2,5 ngày.', who: 'Đại lý (hồ sơ D&AD)', date: '7/2010', pub: 'D&AD', url: 'https://www.dandad.org/insights/awards/old-spice-case-study-insights', caveat: 'Số do đại lý công bố. Con số “40 triệu lượt xem tuần đầu” không tìm thấy nguồn.' },
    { t: 'Theo Nielsen do Old Spice cung cấp: doanh số nhóm sữa tắm Old Spice +11% (12 tháng), +27% (6 tháng), +55% (3 tháng), +107% (tháng gần nhất).', who: 'Old Spice (qua Adweek)', date: '~7/2010', pub: 'Adweek', url: 'https://www.adweek.com/?p=12422', caveat: 'Do hãng cung cấp; chỉ một tháng cho +107%; ngày đăng suy luận.' },
    { t: 'Cùng thời điểm, riêng sản phẩm Red Zone After Hours giảm 7% trong 2010.', who: 'WARC qua MSNBC', date: '20/7/2010', pub: 'MSNBC', url: 'https://www.nbcnews.com/id/wbna38329241', caveat: 'Chỉ một SKU; kỳ đo khác với +107%.' },
    { t: 'Hồ sơ của đại lý nêu doanh số +125% so với cùng kỳ tới cuối 7/2010 và là thương hiệu sữa tắm nam bán chạy nhất Mỹ cuối 2010.', who: 'Wieden+Kennedy (hồ sơ D&AD)', date: '2010', pub: 'D&AD', url: 'https://www.dandad.org/insights/awards/old-spice-case-study-insights', caveat: 'Tự công bố; +125% khác +107% vì khác kỳ đo — nêu cả hai, đừng trộn.' } ],
  unknown: 'ROI hay lợi nhuận P&G công bố, chi phí sản xuất và media, hiệu ứng sau 2010. Cũng không có nguồn xác nhận “Titanium Grand Prix”: đừng dùng.',
  causal: [
    { claim: 'Chuyển người được nói tới (sang phụ nữ) giúp thương hiệu thoát hình ảnh cũ.', evidence: 'Hồ sơ đại lý: doanh số nhóm sữa tắm tăng mạnh theo số do hãng cung cấp.', other: 'Khuyến mãi cùng thời điểm; Dove Men+Care của Unilever cũng chạy chiến dịch Super Bowl 2010; thị trường sữa tắm nam tăng chung (chưa kiểm chứng).' },
    { claim: 'Chú ý chuyển thành bán hàng.', evidence: 'Các số +107% và +125%.', other: 'Một SKU chủ lực (Red Zone After Hours) giảm 7%; số một tháng không phải xu hướng.' } ],
  limits: [
    'Không có dữ liệu P&G về lợi nhuận hay thị phần sau 2010, nên không biết hiệu ứng bền hay không.',
    'Chú ý và bán hàng là hai tầng; số đo ở cấp dòng sản phẩm khác cấp SKU.',
    'Không nên khẳng định “chiến dịch đã cứu Old Spice” hay “không bán được hàng”.' ],
  practice: 'Chọn một thương hiệu dành cho một nhóm nhưng được mua bởi một nhóm khác (đồ lót nam, đồ chơi, thức ăn thú cưng). Viết insight về người mua, rồi viết một quảng cáo 15 giây nói với người mua mà người dùng vẫn thấy hợp. Nêu rủi ro làm người dùng cảm thấy bị bỏ rơi.',
  measure: 'Đo riêng chú ý (lượt xem, bình luận) và bán hàng (SKU, kênh, kỳ), nhiều tháng sau chiến dịch; có nhóm đối chứng nếu được. Ghi rõ ai cung cấp số.',
  reflect: [
    'Bạn tin con số +107% đến mức nào, và cần thêm dữ liệu gì để tin hơn?',
    'Khi một SKU giảm trong khi cả dòng tăng, bạn kết luận gì về chiến dịch?',
    'Chiến dịch phản hồi 186 video có đáng chi phí không? Thước đo nào?' ],
  transfer: 'Không áp dụng khi người mua và người dùng là một, khi bạn không có đội làm nội dung phản hồi nhanh, hoặc khi hài hước phi lý không hợp thương hiệu.',
  sources: [
    { t: 'Old Spice case study insights', pub: 'D&AD', date: '', url: 'https://www.dandad.org/insights/awards/old-spice-case-study-insights' },
    { t: 'Old Spice sales (Nielsen, do hãng cung cấp)', pub: 'Adweek', date: '2010', url: 'https://www.adweek.com/?p=12422' },
    { t: 'Old Spice Red Zone sales drop', pub: 'MSNBC', date: '20/7/2010', url: 'https://www.nbcnews.com/id/wbna38329241' },
    { t: 'Old Spice scoops Cannes Film Lions Grand Prix', pub: 'Campaign', date: '26/6/2010', url: 'https://www.campaignlive.co.uk/article/old-spice-scoops-cannes-film-lions-grand-prix/1012646' } ]
},

'new-coke-1985': {
  status: 'failure', verified: '17/10/2026', isNew: true,
  objective: 'Hiểu vì sao nghiên cứu thị trường đo đúng cái hỏi mà vẫn dẫn tới quyết định sai, và phân biệt “vị” với “gắn bó”.',
  problem: 'Coke mất thị phần dần trong nhiều thập kỷ, còn Pepsi dùng thử vị mù làm đòn tấn công. Coca-Cola cần phản ứng với lời thách thức “vị nào ngon hơn”.',
  consumer: {
    observed: 'Theo History.com, khoảng 190.000 lượt thử vị mù ở Mỹ và Canada cho thấy người thử nhìn chung thích công thức mới hơn cả Pepsi lẫn Coke cũ. Nghiên cứu không hỏi người uống sẽ cảm thấy thế nào nếu công thức cũ biến mất.',
    hypothesis: 'Quyết định mua có phần là nhận diện và ý nghĩa, không chỉ vị giác: thử vị mù thắng nhưng thị trường phản ứng ngược. Đây là cách đọc của người viết.' },
  options: [
    { name: 'Ra công thức mới như một dòng bổ sung', bet: 'Giữ công thức gốc.', gain: 'Giữ lòng trung thành, thử thị trường.', cost: 'Mất tuyên bố “vị Coke tốt hơn”; thêm SKU.' },
    { name: 'Giữ công thức, đánh trả bằng truyền thông di sản', bet: 'Bảo vệ tài sản lâu đời.', gain: 'An toàn.', cost: 'Không trả lời được thách thức “vị nào ngon hơn”.' },
    { name: 'Thử ở vài thị trường nhỏ, có hỏi nhà đóng chai', bet: 'Học nhanh, rẻ.', gain: 'Ít rủi ro.', cost: 'Pepsi biết trước và phản ứng.' },
    { name: 'Thay công thức gốc trên toàn quốc', bet: 'Công thức thắng thử vị mù.', gain: 'Tuyên bố vị tốt hơn.', cost: 'Phản ứng dữ dội, đảo ngược sau 79 ngày.', taken: 'Công bố 23/4/1985; Coca-Cola Classic trở lại khoảng 11/7/1985.' } ],
  facts: [
    { t: 'Ngày 23/4/1985 Coca-Cola công bố đổi công thức lần đầu sau 99 năm; công thức gốc trở lại dưới tên Coca-Cola Classic khoảng 11/7/1985, tức 79 ngày sau.', who: 'History.com; MediaVillage', date: '1985', pub: 'History.com', url: 'https://history.com/this-day-in-history/new-coke-debuts-one-of-the-biggest-product-flops-in-history', caveat: 'Britannica ghi 77 ngày; nguồn lệch 1–4 ngày.' },
    { t: 'Khoảng 190.000 lượt thử vị mù ở Mỹ và Canada trước khi công bố.', who: 'Coca-Cola, qua History.com', date: '4/1985', pub: 'History.com', url: 'https://www.history.com/articles/why-coca-cola-new-coke-flopped', caveat: 'Con số “200.000” thường gặp không xác minh được.' },
    { t: 'Coca-Cola nói nghiên cứu không đo được độ gắn bó cảm xúc sâu bền với công thức cũ (diễn giải gần nguyên văn lời công bố 11/7).', who: 'Coca-Cola (Keough), qua CBS News', date: '23/4/2015', pub: 'CBS News', url: 'https://www.cbsnews.com/amp/news/30-years-ago-today-coca-cola-new-coke-failure', caveat: 'Diễn giải.' },
    { t: 'Thị phần Coke trong thị trường cola Mỹ: khoảng 60% (1948) → 21,8% (1984); Pepsi 18,8%.', who: 'MediaVillage', date: '25/7/2024', pub: 'MediaVillage', url: 'https://mediavillage.com/article/historys-moment-in-media-the-return-of-coca-cola-classic/amp', caveat: 'Một nguồn; không rõ gốc.' },
    { t: 'Số cuộc gọi phản đối ghi từ khoảng 1.500 đến 8.000 mỗi ngày tuỳ nguồn; con số “400.000 cuộc gọi và thư” không xác minh được.', who: 'History.com; MediaVillage', date: '5–6/1985', pub: 'History.com', caveat: 'Mâu thuẫn hai bậc độ lớn: nêu khoảng, không nêu một số.' } ],
  unknown: 'Doanh số và lợi nhuận 1985 từ nguồn gốc, tỉ lệ người thích New Coke theo từng nhóm. Không nên khẳng định “thất bại tai hại nhất lịch sử” như sự thật; đó là cách báo chí gọi.',
  causal: [
    { claim: 'Nghiên cứu đo vị nhưng không đo gắn bó.', evidence: 'Lời công ty về điều nghiên cứu không đo được.', other: 'Một góc nhìn khác: vấn đề nằm ở triển khai — không tham vấn nhà đóng chai, áp đặt từ trên xuống.' },
    { claim: 'Đây là một sai lầm mà công ty cố ý tạo ra để tăng lòng trung thành.', evidence: 'Không có bằng chứng.', other: 'Chính Keough bác bỏ giả thuyết này.' } ],
  limits: [
    'Hậu quả kinh doanh ròng còn tranh cãi; một số nguồn coi đây là bước “chấp nhận rủi ro thông minh”.',
    'Thử vị mù tách thương hiệu ra khỏi sản phẩm, nhưng người mua trong đời thật không mua mù.',
    'Số liệu phản ứng của người tiêu dùng mâu thuẫn mạnh giữa các nguồn.' ],
  practice: 'Chọn một sản phẩm khách yêu. Soạn ba câu hỏi nghiên cứu mà thử vị mù không hỏi (ví dụ “nếu mai nó biến mất, bạn cảm thấy gì”). Quyết định bạn sẽ đưa ra nếu câu trả lời cho thấy gắn bó rất mạnh.',
  measure: 'Đo hai tầng: ưa thích trong thử mù và gắn bó/ý nghĩa; thử thị trường nhỏ trước khi mở rộng; theo dõi khiếu nại và thị phần theo tuần.',
  reflect: [
    'Nếu bạn làm nghiên cứu cho Coke năm 1985, bạn sẽ thêm câu hỏi nào, và nó có thể ngăn được quyết định không?',
    'Việc rút lại sau 79 ngày là thất bại hay là học nhanh? Bạn dựa vào đâu?',
    'Sản phẩm của bạn có phần nào “người ta thích vì ý nghĩa” mà thử nghiệm sản phẩm sẽ bỏ sót?' ],
  transfer: 'Không áp dụng khi sản phẩm là hàng thay thế dễ, khi khách không gắn bó, hoặc khi bạn có thể thử ở quy mô nhỏ trước.',
  sources: [
    { t: 'New Coke debuts: one of the biggest product flops in history', pub: 'History.com', date: '', url: 'https://history.com/this-day-in-history/new-coke-debuts-one-of-the-biggest-product-flops-in-history' },
    { t: 'Why Coca-Cola’s New Coke flopped', pub: 'History.com', date: '', url: 'https://www.history.com/articles/why-coca-cola-new-coke-flopped' },
    { t: '30 years ago today: Coca-Cola New Coke failure', pub: 'CBS News', date: '23/4/2015', url: 'https://www.cbsnews.com/amp/news/30-years-ago-today-coca-cola-new-coke-failure' },
    { t: 'History’s moment in media: the return of Coca-Cola Classic', pub: 'MediaVillage', date: '25/7/2024', url: 'https://mediavillage.com/article/historys-moment-in-media-the-return-of-coca-cola-classic/amp' } ]
},

'bach-hoa-xanh-co-cum': {
  status: 'mixed', verified: '17/10/2026', isNew: true,
  objective: 'Đọc một điều chỉnh mô hình bán lẻ: tách “định vị mới”, “cắt chi phí” và “đóng điểm yếu”, và nhận ra hồi phục mỏng so với lỗ lũy kế.',
  problem: 'Chuỗi tăng rất nhanh trong Covid nhưng trải nghiệm không đều (chủ tịch MWG thừa nhận cách làm cũ coi “có hàng là được”). Cần quyết định mở tiếp hay sửa nền tảng.',
  consumer: {
    observed: 'Theo Báo Đầu tư (21/7/2022), Chủ tịch MWG thừa nhận cách làm cũ coi trọng việc có hàng, làm hại trải nghiệm khách (diễn giải của phóng viên).',
    hypothesis: 'Khách thực phẩm tươi cần cửa hàng sạch, đủ hàng thiết yếu và ổn định hơn là danh mục rộng bất kỳ. Đây là cách đọc của người viết; chưa có số liệu khách hàng.' },
  options: [
    { name: 'Tiếp tục mở nhanh (kiểu WinMart+)', bet: 'Giữ tốc độ phủ.', gain: 'Lợi thế quy mô.', cost: 'Tiếp tục đốt tiền, trải nghiệm không đều.' },
    { name: 'Nhượng quyền/asset-light', bet: 'Giảm vốn.', gain: 'Phủ nhanh.', cost: 'Khó kiểm soát chuỗi lạnh.' },
    { name: 'Chuyển sang online/giao tận nhà', bet: 'Theo xu hướng Covid.', gain: 'Đúng thời điểm.', cost: 'Biên mỏng, chi phí chặng cuối.' },
    { name: 'Co cụm và chuẩn hoá', bet: 'Đóng cửa hàng yếu, chuẩn hoá diện tích và danh mục, đổi chính sách bán.', gain: 'Tăng doanh thu mỗi cửa hàng, có lãi.', cost: 'Mất cửa hàng, nhân sự, uy tín với đối tác.', taken: 'MWG bắt đầu 4/2022; không mở mới trong 2022.' } ],
  facts: [
    { t: 'Năm 2021: doanh thu chuỗi 28.216 tỷ đồng (+33%, 23% doanh thu MWG), EBITDA toàn chuỗi dương lần đầu, doanh thu bình quân khoảng 1,2 tỷ đồng/cửa hàng.', who: 'MWG qua Báo Đầu tư', date: '21/7/2022', pub: 'Báo Đầu tư', url: 'https://baodautu.vn/bach-hoa-xanh-thu-hep-quy-mo-khi-vua-cham-diem-hoa-von-d169950.html', caveat: 'Bài không ghi rõ đơn vị thời gian của 1,2 tỷ đồng.' },
    { t: 'Từ 4/2022 chuẩn hoá khu bán khoảng 200 m², thu hẹp mặt hàng thiết yếu, đổi chính sách bán, trang trí, nhận diện; không mở thêm trong 2022. Số cửa hàng 2.140 → 1.972 (11/7/2022); một bài khác ghi 1.824 tại 15/7/2022.', who: 'MWG (Đặng Thanh Phong, Nguyễn Đức Tài) qua Báo Đầu tư', date: '12/7/2022', pub: 'Báo Đầu tư', url: 'https://baodautu.vn/hang-loat-cua-hang-bach-hoa-xanh-dong-cua-vi-khong-dap-ung-tieu-chuan-moi-d169520.html', caveat: 'Hai số lệch khoảng 150 trong 4 ngày: nêu cả hai.' },
    { t: 'Quý 2/2024: lãi lần đầu khoảng 7 tỷ đồng sau 9 năm, doanh thu quý khoảng 10.300 tỷ, doanh thu bình quân đạt khoảng 2,1 tỷ đồng/cửa hàng/tháng, 1.701 cửa hàng cuối quý.', who: 'MWG (báo cáo quý 2/2024) qua Thời báo Tài chính', date: '10/8/2024', pub: 'Thời báo Tài chính', url: 'https://thitruongtaichinhtiente.vn/print/61769.html', caveat: '7 tỷ trên 10.300 tỷ doanh thu (~0,07%): hồi phục có thật nhưng mỏng.' },
    { t: 'Quý 3/2024: lãi gần 90 tỷ, 1.726 cửa hàng cuối 9/2024, lỗ lũy kế 7.905 tỷ đồng.', who: 'MWG (BCTC quý 3/2024)', date: '30/10/2024', pub: 'Thời báo Tài chính', url: 'https://thitruongtaichinhtiente.vn/print/63748.html', caveat: 'Chỉ lỗ lũy kế ghi rõ nguồn BCTC.' },
    { t: '6 tháng đầu 2026: lãi sau thuế khoảng 910 tỷ đồng, 3.191 cửa hàng cuối 6/2026; lỗ lũy kế còn khoảng 7.000 tỷ, kỳ vọng xoá trong 2–3 năm trước khi IPO.', who: 'MWG (Tổng giám đốc) qua Tuổi Trẻ', date: '5/8/2026', pub: 'Tuổi Trẻ', url: 'https://tuoitre.vn/bach-hoa-xanh-se-xoa-sach-lo-luy-ke-khoang-7000-ti-trong-2-3-nam-toi-de-len-san-100260805164015254.htm', caveat: 'Công bố tại họp nhà đầu tư; chưa có thời điểm IPO.' } ],
  unknown: 'Đóng góp riêng của định vị mới, cắt chi phí và đóng cửa hàng yếu; số cửa hàng đỉnh và số đã đóng chính xác (một nguồn ghi “900 cửa hàng/đỉnh 2.600” không khớp số có tài liệu — đừng dùng); lợi nhuận gộp thật và unit economics. Đừng khẳng định tái định vị là nguyên nhân có lãi.',
  causal: [
    { claim: 'Chuẩn hoá làm cửa hàng có lãi.', evidence: 'Doanh thu bình quân từ ~1,2 lên ~2,1 tỷ đồng/cửa hàng/tháng; lãi quý 2/2024.', other: 'Lạm phát thực phẩm 2022–2024 làm tăng doanh thu danh nghĩa (suy luận); Covid kéo cầu bất thường 2021; giảm chi phí và đóng điểm yếu chứ không phải thông điệp.' },
    { claim: 'Mô hình tập đoàn mẹ giúp chịu lỗ lâu.', evidence: 'Lỗ lũy kế 7.905 tỷ đồng (Q3/2024).', other: 'Chuỗi độc lập không có nguồn lực tương tự (suy luận).' } ],
  limits: [
    'Hồi phục mỏng: 7 tỷ đồng trên doanh thu quý khoảng 10.300 tỷ; lỗ lũy kế vẫn lớn.',
    'Đối thủ đi ngược chiều: WinMart mở thêm khoảng 720 cửa hàng năm 2022 (Diễn đàn Doanh nghiệp); EY cảnh báo cắt chi phí đơn thuần ít khi tạo tăng trưởng dài hạn.',
    'Số cửa hàng và lãi gộp có số mâu thuẫn trong nguồn: chỉ dùng số có tài liệu.' ],
  practice: 'Chọn một chuỗi bạn biết. Lập bảng một cửa hàng điển hình: doanh thu, chi phí thuê, nhân sự, hao hụt, và điểm hoà vốn. Nêu điều kiện (doanh thu mỗi cửa hàng) để mở thêm cửa hàng là hợp lý, và điều gì sẽ khiến bạn dừng mở.',
  measure: 'Doanh thu và lãi theo từng cửa hàng, tỉ lệ cửa hàng hoà vốn, khách quay lại, hao hụt; so với cùng kỳ và với số cửa hàng.',
  reflect: [
    'Nếu bạn là MWG năm 2022, bạn dừng mở mới hay mở tiếp như WinMart? Dựa vào dữ liệu nào?',
    'Làm sao tách “do định vị” khỏi “do cắt chi phí” khi cả hai xảy ra cùng lúc?',
    'Một chuỗi độc lập không có tập đoàn mẹ sẽ làm khác ở điểm nào?' ],
  transfer: 'Không áp dụng khi mô hình chưa có đơn vị kinh tế dương ở cấp cửa hàng, khi không có nguồn lực để chịu giai đoạn đóng cửa, hoặc khi thị trường đang đủ cho mở nhanh.',
  sources: [
    { t: 'Bách Hóa Xanh thu hẹp quy mô khi vừa chạm điểm hoà vốn', pub: 'Báo Đầu tư', date: '21/7/2022', url: 'https://baodautu.vn/bach-hoa-xanh-thu-hep-quy-mo-khi-vua-cham-diem-hoa-von-d169950.html' },
    { t: 'Hàng loạt cửa hàng Bách Hóa Xanh đóng cửa vì không đáp ứng tiêu chuẩn mới', pub: 'Báo Đầu tư', date: '12/7/2022', url: 'https://baodautu.vn/hang-loat-cua-hang-bach-hoa-xanh-dong-cua-vi-khong-dap-ung-tieu-chuan-moi-d169520.html' },
    { t: 'Bách Hóa Xanh lãi quý 2/2024', pub: 'Thời báo Tài chính', date: '10/8/2024', url: 'https://thitruongtaichinhtiente.vn/print/61769.html' },
    { t: 'Bách Hóa Xanh quý 3/2024', pub: 'Thời báo Tài chính', date: '30/10/2024', url: 'https://thitruongtaichinhtiente.vn/print/63748.html' },
    { t: 'Bách Hóa Xanh sẽ xoá sạch lỗ luỹ kế khoảng 7.000 tỉ', pub: 'Tuổi Trẻ', date: '5/8/2026', url: 'https://tuoitre.vn/bach-hoa-xanh-se-xoa-sach-lo-luy-ke-khoang-7000-ti-trong-2-3-nam-toi-de-len-san-100260805164015254.htm' } ]
},

'tiki-giao-nhanh': {
  status: 'failure', verified: '17/10/2026', isNew: true,
  objective: 'Phân tích vì sao một lời hứa khác biệt (giao nhanh, đáng tin) không đủ khi đối thủ có vốn lớn hơn nhiều lần, và học cách dùng số thị phần của bên thứ ba.',
  problem: 'Tiki phải cạnh tranh với Shopee, Lazada và sau đó TikTok Shop, trong thị trường mà khuyến mãi lớn và “mua sắm giải trí” trở thành cuộc chơi chính.',
  consumer: {
    observed: 'Không có khảo sát khách của Tiki trong các nguồn đã đọc; chỉ có số thị phần của bên thứ ba (Metric.vn): Tiki khoảng 2,2% (Q1/2023, hạng 4) rồi dưới 1% (cuối 2024).',
    hypothesis: 'Một nhóm khách chịu trả cho độ tin cậy và tốc độ, nhưng nhóm đó không đủ lớn để nuôi một sàn đại chúng. Đây là suy luận của người viết.' },
  options: [
    { name: 'Cạnh tranh giá và miễn phí vận chuyển với Shopee', bet: 'Giữ lưu lượng.', gain: 'Lưu lượng.', cost: 'Lỗ sâu hơn với vốn nhỏ hơn nhiều lần.' },
    { name: 'Thu hẹp thành chuyên gia ngách', bet: 'Danh mục chọn lọc.', gain: 'Biên tốt hơn, bản sắc rõ.', cost: 'Quy mô nhỏ, khó thoả kỳ vọng nhà đầu tư.' },
    { name: 'Chuyển sang sàn mở asset-light', bet: 'Giảm vốn.', gain: 'Danh mục rộng.', cost: 'Mất kiểm soát trải nghiệm — đúng thứ làm nên khác biệt.' },
    { name: 'Giao nhanh và marketing âm nhạc', bet: 'Khác biệt bằng dịch vụ và nhận biết.', gain: 'Lời hứa rõ.', cost: 'Chi phí cao, vốn bị bào mòn.', taken: 'TikiNOW và tài trợ MV nhạc Việt (2019); Series E 11/2021.' } ],
  facts: [
    { t: 'TikiNOW giao hơn 100.000 sản phẩm trong 2 giờ, mở rộng 3 giờ/trong ngày; Tiki lỗ 757 tỷ đồng năm 2018, lỗ lũy kế khoảng 1.300 tỷ.', who: 'Diễn đàn Doanh nghiệp', date: '3/7/2019', pub: 'Diễn đàn Doanh nghiệp', url: 'https://diendandoanhnghiep.vn/tiki-153182.html', caveat: 'Nguồn của số lỗ không nêu.' },
    { t: 'Series E 258 triệu USD (11/2021), AIA dẫn đầu; định giá “gần 1 tỷ USD” theo một nguồn, 832 triệu USD theo Multiples.vc.', who: 'Tiki xác nhận số vốn; định giá do bên thứ ba', date: '9/11/2021', pub: 'The Bridge', url: 'https://thebridge.jp/2021/11/vietnams-tiki-confirms-258m-raise-in-series-e-funding', caveat: 'Định giá không phải số Tiki công bố; hai số khác nhau.' },
    { t: 'Năm tài chính kết thúc 31/3/2022 Tiki lỗ ròng 116,25 triệu USD (The Investor); Tech in Asia nêu 93 triệu USD.', who: 'Hồ sơ Tiki Global qua The Investor', date: '17/1/2023', pub: 'The Investor', url: 'https://theinvestor.vn/news/tiki-sees-fiscal-year-2022-net-loss-exceed-116-mln-d3376.amp', caveat: 'Hai số mâu thuẫn chưa giải quyết được.' },
    { t: 'Thị phần Metric.vn: Q1/2023 Tiki ~2,2% (hạng 4); cuối 2024 dưới 1%. Q3/2025: Shopee 56%, TikTok Shop 41%, Lazada ~3%.', who: 'Metric.vn qua VnEconomy, Báo Đại biểu Nhân dân', date: '5/2025; 10/2025', pub: 'VnEconomy', url: 'https://vneconomy.vn/tiki-tu-ky-lan-chua-thanh-hinh-den-cu-truot-dai-dinh-gia-duoi-10-trieu-usd.htm', caveat: 'Chỉ tính trên các sàn Metric theo dõi; cần đối chiếu Metric gốc.' },
    { t: 'TikiNow Smart Logistics (đơn vị giao hàng) bị Ủy ban Cạnh tranh Quốc gia phạt 200 triệu đồng vì thông tin gây nhầm lẫn về độ phủ và số đơn; đính chính 27/6/2025.', who: 'Cơ quan quản lý qua Znews', date: '16/7/2025', pub: 'Znews', url: 'https://znews.vn/tikinow-bi-phat-post1569000.html', caveat: 'Đơn vị bị phạt không phải sàn Tiki; lỗi là phóng đại quy mô, không phải lời hứa tốc độ.' } ],
  unknown: 'Doanh thu và lỗ sau FY2022, hiệu quả riêng của marketing nhạc hoặc TikiNOW, giá giao dịch thật của định giá dưới 10 triệu USD. Định vị “hàng chính hãng” quen thuộc chưa có nguồn trong lần soát này. Không khẳng định “Tiki thua vì marketing yếu”.',
  causal: [
    { claim: 'Tiki thua vì cạnh tranh về vốn và khuyến mãi.', evidence: 'Thị phần từ ~2,2% xuống dưới 1% trong khi Shopee và TikTok Shop chiếm gần hết.', other: 'Tiki rút khỏi các mùa khuyến mãi lớn năm 2023 trong giai đoạn tái cấu trúc; lỗ lớn và thị trường vốn khó từ 2022 (suy luận).' },
    { claim: 'Lời hứa giao nhanh tạo khác biệt.', evidence: 'TikiNOW 2–3 giờ.', other: 'Đối thủ cũng mở rộng giao nhanh; chi phí logistics đắt khi quy mô nhỏ.' } ],
  limits: [
    'Vụ phạt cho thấy bài học riêng: thương hiệu đặt cược vào “đáng tin” mà phóng đại số liệu là tự phá cược.',
    'Các số thị phần chỉ tính trên bộ sàn Metric theo dõi.',
    'Số lỗ FY2022 mâu thuẫn giữa các nguồn.' ],
  practice: 'Đối chiếu Tiki với Shopee (case “ngày đôi”): lập bảng hai cột về lời hứa, chi phí để giữ lời hứa, nguồn vốn, và rủi ro. Chỉ ra điều kiện để một sàn nhỏ có thể sống bằng lời hứa dịch vụ.',
  measure: 'Thị phần theo bộ đo cố định, tần suất mua lại, tỉ lệ giao đúng hẹn và chi phí logistics trên đơn; lỗ trên mỗi đơn. Ghi rõ nguồn và phạm vi từng số.',
  reflect: [
    'Nếu Tiki chọn thu hẹp thành chuyên gia ngách năm 2019, họ còn là “Tiki” không? Nhà đầu tư kỳ vọng gì?',
    'Số thị phần dưới 1% có nghĩa là Tiki biến mất khỏi thị trường không? Bạn cần thêm số nào?',
    'Khi một lời hứa dịch vụ đắt, làm sao bạn quyết định nới hay giữ?' ],
  transfer: 'Không áp dụng khi bạn có nguồn vốn ngang đối thủ, khi khách đủ nhiều để trả cho dịch vụ, hoặc khi bạn không phụ thuộc vào cuộc đua khuyến mãi.',
  sources: [
    { t: 'Tiki', pub: 'Diễn đàn Doanh nghiệp', date: '3/7/2019', url: 'https://diendandoanhnghiep.vn/tiki-153182.html' },
    { t: 'Vietnam’s Tiki confirms $258M raise in Series E funding', pub: 'The Bridge', date: '9/11/2021', url: 'https://thebridge.jp/2021/11/vietnams-tiki-confirms-258m-raise-in-series-e-funding' },
    { t: 'Tiki sees fiscal year 2022 net loss exceed $116 mln', pub: 'The Investor', date: '17/1/2023', url: 'https://theinvestor.vn/news/tiki-sees-fiscal-year-2022-net-loss-exceed-116-mln-d3376.amp' },
    { t: 'Tiki từ kỳ lân chưa thành hình đến cú trượt dài', pub: 'VnEconomy', date: '8/5/2025', url: 'https://vneconomy.vn/tiki-tu-ky-lan-chua-thanh-hinh-den-cu-truot-dai-dinh-gia-duoi-10-trieu-usd.htm' },
    { t: 'TikiNow bị phạt', pub: 'Znews', date: '16/7/2025', url: 'https://znews.vn/tikinow-bi-phat-post1569000.html' } ]
},

'vietjet-bikini-pr': {
  status: 'mixed', verified: '17/10/2026', isNew: true,
  objective: 'Đánh giá một chiến thuật PR gây tranh cãi: tách nổi tiếng khỏi lợi nhuận, và đặt câu hỏi đạo đức song song với câu hỏi hiệu quả.',
  problem: 'Vietjet là hãng giá rẻ ra mắt 12/2011, đối đầu Vietnam Airlines. Trong ngành sản phẩm ít khác biệt, sự nổi tiếng là tài sản; câu hỏi là loại nổi tiếng nào và giá phải trả.',
  consumer: {
    observed: 'Không có số liệu khách hàng riêng cho hoạt động bikini. Reuters/Fortune nói chiến dịch “giúp tăng trưởng nhanh, giành thị phần” nhưng không kèm số.',
    hypothesis: 'Hình ảnh gây chú ý giúp một hãng mới được nhắc đến thường xuyên. Đây là diễn giải của người viết; các nguồn không đo được nhân quả.' },
  options: [
    { name: 'Chỉ cạnh tranh bằng vé rẻ và khuyến mãi', bet: 'Không dùng hình ảnh gợi dục.', gain: 'Tránh phản ứng đạo đức.', cost: 'Dễ bị sao chép, ít nhận diện.' },
    { name: 'Định vị tin cậy và đúng giờ', bet: 'Đối đầu hãng truyền thống.', gain: 'Đúng nhu cầu cốt lõi.', cost: 'Đó là sở trường của Vietnam Airlines.' },
    { name: 'Hài hước, ngôn ngữ địa phương không dùng cơ thể phụ nữ', bet: 'Lan truyền lành hơn.', gain: 'Ít tranh cãi đạo đức.', cost: 'Khó duy trì độ sốc.' },
    { name: 'Dùng hình ảnh bikini làm chất liệu PR lặp lại', bet: 'Video, lịch hằng năm, sự kiện.', gain: 'Nổi tiếng nhanh với chi phí thấp.', cost: 'Bị chỉ trích; khủng hoảng 1/2018.', taken: 'Từ hè 2012 đến lịch 2019.' } ],
  facts: [
    { t: 'Hè 2012, trên đường bay TP.HCM–Nha Trang, tiếp viên và người mẫu mặc bikini nhảy trên khoang; Cục Hàng không phạt 20 triệu đồng. Khoảng hai năm sau, video mở đường bay Singapore lan mạnh, gắn danh xưng “hãng hàng không bikini”.', who: 'Nikkei qua VOV', date: '7/3/2017', pub: 'VOV', url: 'https://vov.vn/kinh-te/nikkei-chieu-pr-bikini-giup-danh-tieng-vietjet-air-noi-nhu-con-600098.vov', caveat: 'Bài gốc Nikkei không mở được; “~2014” suy từ “khoảng hai năm sau”.' },
    { t: 'Thị phần nội địa: 26,1% (12/2013) so với Vietnam Airlines 57,1% (Cục Hàng không); 41,5% so với 42,5% (Nikkei, ~3/2017); 23,8% (vận tải 2017, Bộ GTVT); 40,1% (số chuyến bay 2018, KBSV).', who: 'Nhiều nguồn', date: '2013–2018', pub: 'Thương hiệu & Công luận; VOV', url: 'https://thuonghieucongluan.com.vn/vietjetair-giat-thi-phan-vietnam-airlines-lo-doi-pho-a17237.html', caveat: 'Các số dùng thước đo khác nhau (hành khách hay chuyến bay) và chưa xác định thước đo: không xếp thành một chuỗi liền.' },
    { t: 'Lịch bikini 2018: khoảng 910.000 lượt xem lịch và video hậu trường; thu nhập từ bán lịch dành cho từ thiện; Giám đốc điều hành nói hãng không bận tâm bị gắn bikini; một tiếp viên Mỹ gọi là “kéo lùi 50 năm”.', who: 'Reuters qua Fortune', date: '28/12/2017', pub: 'Fortune', url: 'https://fortune.com/2017/12/28/vietjet-bikini-calendar-criticism', caveat: 'Số lượt xem do bên báo cáo nêu; không có doanh số.' },
    { t: 'Chuyến bay đón U23 (1/2018): CEO xin lỗi, nói đó là tiết mục ngoài chương trình; người mẫu phản bác rằng họ được mời diễn bikini; Cục Hàng không phạt hãng 40 triệu đồng và tiếp viên trưởng 4 triệu đồng; Vietjet đóng fanpage.', who: 'CBS News; The Leader', date: '30–31/1/2018', pub: 'CBS News', url: 'https://www.cbsnews.com/news/vietjet-airline-vietnam-sorry-bikini-flight-stewardess-performance-soccer-team/', caveat: 'Hai lời kể mâu thuẫn, không có bên thứ ba xác nhận.' } ],
  unknown: 'ROI hay phần đóng góp của bikini vào tăng trưởng và thị phần, tác động khủng hoảng 1/2018 lên doanh thu hoặc cổ phiếu, và ai quyết định tiết mục trên chuyến bay U23. Không khẳng định “bikini làm Vietjet thành công” hay “làm hỏng thương hiệu”.',
  causal: [
    { claim: 'PR bikini giúp Vietjet nổi tiếng.', evidence: 'Danh xưng “hãng hàng không bikini”; lịch lan truyền.', other: 'Tăng trưởng đồng thời đến từ mô hình bay giá rẻ, bộ máy tinh gọn, mở rộng đội bay và mức vé rất thấp (Vietnamnet 13/1/2014).' },
    { claim: 'Rủi ro pháp lý và danh tiếng thấp.', evidence: 'Mức phạt 20 triệu (2012) và 40 triệu đồng (2018).', other: 'Chi phí thực tế thấp nhưng chi phí danh tiếng của khủng hoảng 1/2018 (đóng fanpage, bị chỉ trích) không đo được.' } ],
  limits: [
    'Khía cạnh đạo đức: bị gọi là biến tiếp viên thành đối tượng gợi dục (Reuters/Fortune).',
    'Lời giải thích của hãng thay đổi theo bối cảnh (nguồn thứ cấp).',
    'Không có số liệu để đánh giá cả lợi ích lẫn thiệt hại.' ],
  practice: 'Viết một ma trận hai trục: mức nổi tiếng và mức rủi ro đạo đức/pháp lý cho bốn lựa chọn ở mục “Bạn sẽ chọn hướng nào?”. Chọn một và nêu ngưỡng dừng định trước nếu bị phản ứng.',
  measure: 'Tách ba tầng: nhận biết (tìm kiếm, nhắc), thiện cảm và niềm tin theo nhóm, và đặt vé theo kênh có mã. Đo cả phản ứng tiêu cực và nhóm khách từ chối thương hiệu.',
  reflect: [
    'Nếu đúng là PR bikini góp phần vào tăng trưởng, điều đó có biện minh cho nó không? Bạn dựa vào tiêu chuẩn nào?',
    'Mức phạt nhỏ thay đổi tính toán rủi ro của một doanh nghiệp thế nào? Điều đó nói gì về trách nhiệm?',
    'Bạn sẽ đặt ngưỡng dừng định trước nào cho một chiến thuật gây tranh cãi?' ],
  transfer: 'Không áp dụng khi thương hiệu dựa vào niềm tin và an toàn, khi tổ chức không có cách xử lý khủng hoảng, hoặc khi chiến thuật dựa trên việc hạ thấp một nhóm người.',
  sources: [
    { t: 'Nikkei: chiêu PR bikini giúp danh tiếng Vietjet Air nổi như cồn', pub: 'VOV', date: '7/3/2017', url: 'https://vov.vn/kinh-te/nikkei-chieu-pr-bikini-giup-danh-tieng-vietjet-air-noi-nhu-con-600098.vov' },
    { t: 'Vietjet giật thị phần, Vietnam Airlines lo đối phó', pub: 'Thương hiệu & Công luận', date: '13/1/2014', url: 'https://thuonghieucongluan.com.vn/vietjetair-giat-thi-phan-vietnam-airlines-lo-doi-pho-a17237.html' },
    { t: 'Vietjet bikini calendar criticism', pub: 'Reuters qua Fortune', date: '28/12/2017', url: 'https://fortune.com/2017/12/28/vietjet-bikini-calendar-criticism' },
    { t: 'Vietjet apologizes for bikini flight performance', pub: 'CBS News', date: '30/1/2018', url: 'https://www.cbsnews.com/news/vietjet-airline-vietnam-sorry-bikini-flight-stewardess-performance-soccer-team/' },
    { t: 'Vietjet caught in PR crisis', pub: 'The Leader', date: '31/1/2018', url: 'https://e.theleader.vn/vietjet-caught-in-pr-crisis-amid-bikini-scandal-and-a-punitive-fine-of-us1760-20180131111345116.htm' } ]
},

});
