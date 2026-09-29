/* MỤC LỤC BÀI HỌC MỚI (mã 'B:') — nhẹ, tải ở mọi trang.
   Nội dung từng bài nằm ở assets/js/data/bai/<mã module>.js, chỉ trang bài học tải file đó.
   Kế hoạch đầy đủ 70 module: KE-HOACH-700-BAI.md. Lược đồ: assets/js/data/bai/README.md.

   Phải tải SAU curriculum.js và TRƯỚC app.js: file này ghép module đã xuất bản vào STAGES/JOURNEY
   để hành trình, kỹ năng, "hôm nay" thấy bài mới mà không cần tải nội dung. */

const BAI_V = 4;   // tăng khi sửa nội dung bất kỳ file bài/*.js

/* Bước hành trình → chặng nội dung (đề vượt chặng, cổng mở khoá). */
const STEP_STAGE = { observe:'s1', understand:'s2', hypothesis:'s2', message:'s3', channel:'s4',
                     test:'s5', measure:'s5', optimize:'s5', insight:'s6' };

/* Module đã xuất bản. Thêm một dòng khi một module qua kiểm định và người duyệt. */
const BAI_MODS = [
  { id:'ob01', step:'observe', t:'Marketing là gì khi nhìn từ quầy bán hàng' },
  { id:'ob02', step:'observe', t:'Đọc kệ hàng, menu và trang sàn' },
  { id:'ob03', step:'observe', t:'Ngành hàng (category) và luật chơi của nó' },
  { id:'ob04', step:'observe', t:'Đối thủ: ai đang lấy tiền của khách bạn' },
  { id:'ob05', step:'observe', t:'Tín hiệu hành vi: khách làm gì, không phải khách nói gì' },
  { id:'ob06', step:'observe', t:'Bối cảnh thị trường Việt Nam: kênh, vùng, mùa vụ, Tết' },
  { id:'ob07', step:'observe', t:'Tư duy bằng dữ kiện: số nào đáng tin' },
  { id:'kh01', step:'understand', t:'Phân khúc: chia thị trường theo nhu cầu, không theo tuổi' },
  { id:'kh02', step:'understand', t:'Chọn tệp: phục vụ ai trước' },
  { id:'kh03', step:'understand', t:'Jobs-to-be-done: khách "thuê" sản phẩm để làm gì' },
  { id:'kh04', step:'understand', t:'Insight: sự thật chưa ai nói ra' },
  { id:'kh05', step:'understand', t:'Phỏng vấn khách hàng không dẫn dắt' },
  { id:'kh06', step:'understand', t:'Hành trình mua: từ lúc nghĩ tới đến lúc mua lại' },
  { id:'kh07', step:'understand', t:'Tâm lý quyết định: mỏ neo, mặc định, sợ mất' },
  { id:'kh08', step:'understand', t:'Bằng chứng xã hội và khan hiếm dùng đúng cách' },
  { id:'kh09', step:'understand', t:'Khách B2B: nhiều người quyết định, chu kỳ dài' },
  { id:'kh10', step:'understand', t:'Gen Z, phụ huynh, người tỉnh: ba nhóm hay bị hiểu sai' },
];

/* Mục lục bài: id · tiêu đề · module · kỹ năng (khớp SKILLS trong app.js) · thời lượng. */
const BAI_INDEX = [
  { id:'B:ob01-01', mod:'ob01', skill:'insight', read:'6 phút', t:'Hai quán phở cùng dãy phố, vì sao khách đứng xếp hàng ở một quán?' },
  { id:'B:ob01-02', mod:'ob01', skill:'insight', read:'7 phút', t:'Quán trà sữa vắng khách: sửa sản phẩm, giá, chỗ bán hay cách quảng bá?' },
  { id:'B:ob01-03', mod:'ob01', skill:'insight', read:'6 phút', t:'Khách vào hỏi mua máy khoan, thật ra họ cần gì?' },
  { id:'B:ob01-04', mod:'ob01', skill:'brand', read:'7 phút', t:'Cùng một ổ bánh mì, vì sao chỗ này bán 25.000đ, chỗ kia bán 40.000đ vẫn đông?' },
  { id:'B:ob01-05', mod:'ob01', skill:'channel', read:'7 phút', t:'Shop thời trang chốt đơn giỏi nhưng khách không quay lại: marketing hay bán hàng hỏng?' },
  { id:'B:ob01-06', mod:'ob01', skill:'insight', read:'6 phút', t:'Bán đồ chơi giáo dục: nói chuyện với đứa trẻ hay với bố mẹ?' },
  { id:'B:ob01-07', mod:'ob01', skill:'comm', read:'7 phút', t:'Tiệm tóc không có gì để trưng lên kệ: làm sao để khách tin trước khi ngồi ghế?' },
  { id:'B:ob02-01', mod:'ob02', skill:'insight', read:'6 phút', t:'Kệ hàng nói gì trước khi bạn đọc nhãn?' },
  { id:'B:ob02-02', mod:'ob02', skill:'insight', read:'6 phút', t:'Vì sao hàng đặt ngang tầm mắt bán chạy hơn?' },
  { id:'B:ob02-03', mod:'ob02', skill:'measure', read:'6 phút', t:'Đọc menu: món nào quán thật sự muốn bán?' },
  { id:'B:ob02-04', mod:'ob02', skill:'measure', read:'7 phút', t:'Giá theo gram: cách khách so hai gói hàng' },
  { id:'B:ob02-05', mod:'ob02', skill:'channel', read:'6 phút', t:'Trang sản phẩm trên sàn: 3 giây đầu tiên' },
  { id:'B:ob02-06', mod:'ob02', skill:'insight', read:'6 phút', t:'Đánh giá 1 sao đáng đọc hơn đánh giá 5 sao' },
  { id:'B:ob02-07', mod:'ob02', skill:'channel', read:'6 phút', t:'Quầy thu ngân: vì sao kẹo luôn nằm ở đó?' },
  { id:'B:ob02-08', mod:'ob02', skill:'brand', read:'6 phút', t:'Nhãn riêng của siêu thị đang cạnh tranh với ai?' },
  { id:'B:ob02-09', mod:'ob02', skill:'measure', read:'7 phút', t:'Khuyến mãi trên kệ: mua 2 tặng 1 có rẻ thật không?' },
  { id:'B:ob02-10', mod:'ob02', skill:'comm', read:'7 phút', t:'Viết một bản quan sát điểm bán trong 10 phút' },
  { id:'B:ob03-01', mod:'ob03', skill:'insight', read:'6 phút', t:'Hãng nước suối của bạn đang cạnh tranh với ai?' },
  { id:'B:ob03-02', mod:'ob03', skill:'measure', read:'7 phút', t:'Ngành to hay ngành đang lớn — nên vào đâu?' },
  { id:'B:ob03-03', mod:'ob03', skill:'measure', read:'7 phút', t:'Khách mua bao lâu một lần, mỗi lần bao nhiêu?' },
  { id:'B:ob03-04', mod:'ob03', skill:'insight', read:'6 phút', t:'Khách mua theo thói quen hay mua sau khi cân nhắc?' },
  { id:'B:ob03-05', mod:'ob03', skill:'brand', read:'7 phút', t:'Ai dẫn đầu ngành, và họ dẫn đầu nhờ đâu?' },
  { id:'B:ob03-06', mod:'ob03', skill:'measure', read:'7 phút', t:'Ngành này để lại bao nhiêu lãi trên mỗi đồng bán ra?' },
  { id:'B:ob03-07', mod:'ob03', skill:'channel', read:'6 phút', t:'Ngành của bạn bán mạnh vào tháng nào?' },
  { id:'B:ob03-08', mod:'ob03', skill:'channel', read:'7 phút', t:'Khách của ngành này mua ở đâu nhiều nhất?' },
  { id:'B:ob03-09', mod:'ob03', skill:'insight', read:'7 phút', t:'Vì sao ngành trông dễ làm nhưng người mới hay thua?' },
  { id:'B:ob03-10', mod:'ob03', skill:'brand', read:'7 phút', t:'Khi luật chơi của ngành đang đổi, bạn đọc dấu hiệu nào?' },
  { id:'B:ob04-01', mod:'ob04', skill:'insight', read:'6 phút', t:'Quán cà phê của bạn đang cạnh tranh với ai — quán bên kia đường hay ly trà sữa?' },
  { id:'B:ob04-02', mod:'ob04', skill:'insight', read:'7 phút', t:'Vẽ bản đồ đối thủ thế nào để thấy chỗ trống?' },
  { id:'B:ob04-03', mod:'ob04', skill:'creative', read:'7 phút', t:'Đối thủ đang chạy quảng cáo gì — và nó nói lên điều gì?' },
  { id:'B:ob04-04', mod:'ob04', skill:'measure', read:'7 phút', t:'Giá niêm yết của đối thủ có phải giá khách thật sự trả?' },
  { id:'B:ob04-05', mod:'ob04', skill:'brand', read:'7 phút', t:'Điểm mạnh nhất của đối thủ đang che giấu điểm yếu nào?' },
  { id:'B:ob04-06', mod:'ob04', skill:'measure', read:'7 phút', t:'Đối thủ giảm giá 20% — bạn có nên giảm theo?' },
  { id:'B:ob04-07', mod:'ob04', skill:'insight', read:'6 phút', t:'Một đối thủ mới vừa vào ngành — lo hay chưa cần lo?' },
  { id:'B:ob04-08', mod:'ob04', skill:'comm', read:'6 phút', t:'Bảng so sánh đối thủ một trang: giữ gì, bỏ gì?' },
  { id:'B:ob04-09', mod:'ob04', skill:'brand', read:'6 phút', t:'Học từ đối thủ đến đâu thì thành sao chép?' },
  { id:'B:ob05-01', mod:'ob05', skill:'insight', read:'6 phút', t:'Khách nói thích ít đường, sao đơn vẫn toàn full đường?' },
  { id:'B:ob05-02', mod:'ob05', skill:'insight', read:'7 phút', t:'Khách cầm lên rồi đặt xuống: kệ đang nói gì?' },
  { id:'B:ob05-03', mod:'ob05', skill:'measure', read:'7 phút', t:'Giỏ hàng bỏ dở: khách đổi ý hay bị chặn?' },
  { id:'B:ob05-04', mod:'ob05', skill:'insight', read:'6 phút', t:'Lượt tìm kiếm tăng vọt: nhu cầu thật hay cơn sốt?' },
  { id:'B:ob05-05', mod:'ob05', skill:'channel', read:'6 phút', t:'Bình luận livestream toàn hỏi giá: khách đang bảo bạn gì?' },
  { id:'B:ob05-06', mod:'ob05', skill:'measure', read:'7 phút', t:'Khách khen ngon mà không quay lại: tin lời khen hay tin lịch sử đơn?' },
  { id:'B:ob05-07', mod:'ob05', skill:'channel', read:'6 phút', t:'Giờ nào khách thật sự mua, và bạn đang quảng cáo giờ nào?' },
  { id:'B:ob05-08', mod:'ob05', skill:'insight', read:'7 phút', t:'Khách chọn COD rồi bom hàng: đó là tín hiệu gì?' },
  { id:'B:ob05-09', mod:'ob05', skill:'insight', read:'6 phút', t:'Khách mở ba sàn so giá: bạn nên đua giá hay đua thứ khác?' },
  { id:'B:ob05-10', mod:'ob05', skill:'measure', read:'7 phút', t:'Dữ liệu đơn cũ biết khách sắp mua lại khi nào?' },
  { id:'B:ob06-01', mod:'ob06', skill:'channel', read:'6 phút', t:'Hàng của bạn bán ở tạp hoá hay siêu thị — và vì sao điều đó đổi cả cách làm?' },
  { id:'B:ob06-02', mod:'ob06', skill:'insight', read:'7 phút', t:'Cùng một gói gia vị, vì sao Bắc – Trung – Nam phản ứng khác nhau?' },
  { id:'B:ob06-03', mod:'ob06', skill:'insight', read:'6 phút', t:'Khách nông thôn mua ít hơn, hay mua khác đi?' },
  { id:'B:ob06-04', mod:'ob06', skill:'channel', read:'7 phút', t:'Tết đến sớm hơn bạn nghĩ: khi nào phải có hàng trên kệ?' },
  { id:'B:ob06-05', mod:'ob06', skill:'brand', read:'6 phút', t:'Hộp quà Tết bán cho người ăn hay cho người nhận?' },
  { id:'B:ob06-06', mod:'ob06', skill:'measure', read:'6 phút', t:'Tháng Giêng doanh số rơi mạnh: báo động hay chuyện năm nào cũng thế?' },
  { id:'B:ob06-07', mod:'ob06', skill:'channel', read:'6 phút', t:'Mùa tựu trường, mùa mưa, mùa nóng: lịch nào đang điều khiển ngành của bạn?' },
  { id:'B:ob06-08', mod:'ob06', skill:'channel', read:'7 phút', t:'Ngày đôi 9.9, 11.11, 12.12 trên sàn: chạy theo hay đứng ngoài?' },
  { id:'B:ob06-09', mod:'ob06', skill:'comm', read:'6 phút', t:'COD, ví điện tử và Zalo: khách Việt muốn trả tiền và nói chuyện ở đâu?' },
  { id:'B:ob06-10', mod:'ob06', skill:'insight', read:'7 phút', t:'Mùng 1, ngày rằm và cả nhà cùng quyết: bạn đang bán cho một người hay một gia đình?' },
  { id:'B:ob07-01', mod:'ob07', skill:'measure', read:'6 phút', t:'Giá trị đơn trung bình 680 nghìn — khách của bạn có thật chi chừng đó?' },
  { id:'B:ob07-02', mod:'ob07', skill:'insight', read:'6 phút', t:'24 trên 30 người bạn nói sẽ mua — đã đủ để ra mắt?' },
  { id:'B:ob07-03', mod:'ob07', skill:'measure', read:'7 phút', t:'Cửa hàng treo nhiều poster bán chạy hơn — có nên in thêm poster?' },
  { id:'B:ob07-04', mod:'ob07', skill:'measure', read:'6 phút', t:'"Tỉ lệ chuyển đổi 20%" — 20% của cái gì?' },
  { id:'B:ob07-05', mod:'ob07', skill:'insight', read:'6 phút', t:'Đối thủ tăng trưởng 300% — có nên hoảng không?' },
  { id:'B:ob07-06', mod:'ob07', skill:'measure', read:'7 phút', t:'Doanh số tháng Tết tăng 60% — chiến dịch có thật sự hiệu quả?' },
  { id:'B:ob07-07', mod:'ob07', skill:'measure', read:'6 phút', t:'Tỉ lệ mua lại từ 20% lên 25%: tăng 5% hay tăng 25%?' },
  { id:'B:kh01-01', mod:'kh01', skill:'insight', read:'6 phút', t:'Hai khách cùng 28 tuổi, cùng lương — sao mua hai kiểu khác hẳn nhau?' },
  { id:'B:kh01-02', mod:'kh01', skill:'insight', read:'7 phút', t:'Bán bánh trung thu: chia khách theo tuổi hay theo dịp mua?' },
  { id:'B:kh01-03', mod:'kh01', skill:'measure', read:'7 phút', t:'Khách mua thường xuyên và khách mua một lần: chia thế nào để tiêu tiền đúng?' },
  { id:'B:kh01-04', mod:'kh01', skill:'insight', read:'6 phút', t:'Khách mua xe máy: người cần "bền, tiết kiệm" và người cần "đẹp, được khen" có chung một quảng cáo?' },
  { id:'B:kh01-05', mod:'kh01', skill:'measure', read:'7 phút', t:'Phân khúc nghe hay nhưng có dùng được không?' },
  { id:'B:kh01-06', mod:'kh01', skill:'measure', read:'7 phút', t:'Phân khúc có bao nhiêu tiền? Ước lượng nhanh trước khi đầu tư' },
  { id:'B:kh01-07', mod:'kh01', skill:'brand', read:'7 phút', t:'Một sản phẩm, ba phân khúc: làm riêng hay làm chung?' },
  { id:'B:kh01-08', mod:'kh01', skill:'comm', read:'6 phút', t:'Persona "Chị Hoa 32 tuổi thích đọc sách": giúp được gì hay chỉ để trang trí slide?' },
  { id:'B:kh01-09', mod:'kh01', skill:'insight', read:'7 phút', t:'Dữ liệu nói "khách chủ yếu nữ 25–34" — có nên chỉ nhắm nhóm đó?' },
  { id:'B:kh02-01', mod:'kh02', skill:'insight', read:'7 phút', t:'Ba tệp khách đều hứa hẹn — chấm điểm thế nào để chọn một?' },
  { id:'B:kh02-02', mod:'kh02', skill:'comm', read:'6 phút', t:'Sản phẩm “dành cho mọi người” — vì sao lại chẳng ai thấy mình trong đó?' },
  { id:'B:kh02-03', mod:'kh02', skill:'insight', read:'7 phút', t:'Sản phẩm mới toanh: nên chiếm “bãi đổ bộ” nào trước?' },
  { id:'B:kh02-04', mod:'kh02', skill:'insight', read:'7 phút', t:'Tệp nhỏ lãi dày hay tệp lớn cạnh tranh gắt?' },
  { id:'B:kh02-05', mod:'kh02', skill:'measure', read:'7 phút', t:'Khách mua nhiều hay khách mua thỉnh thoảng — ai đáng để nói chuyện?' },
  { id:'B:kh02-06', mod:'kh02', skill:'measure', read:'7 phút', t:'Tệp này đáng bao nhiêu tiền mỗi tháng?' },
  { id:'B:kh02-07', mod:'kh02', skill:'channel', read:'6 phút', t:'Tệp nhiều tiền nhưng khó với tới, hay tệp vừa túi nhưng gặp dễ?' },
  { id:'B:kh02-08', mod:'kh02', skill:'insight', read:'6 phút', t:'Khi nào nên mở rộng sang tệp tiếp theo?' },
  { id:'B:kh02-09', mod:'kh02', skill:'measure', read:'7 phút', t:'Có nên bỏ bớt một tệp khách đang mang doanh thu?' },
  { id:'B:kh03-01', mod:'kh03', skill:'insight', read:'6 phút', t:'Ly cà phê sữa đá 7 giờ sáng đang làm mấy việc cùng lúc?' },
  { id:'B:kh03-02', mod:'kh03', skill:'insight', read:'7 phút', t:'Cùng một người, vì sao sáng mua bánh mì mà tối lại gọi phở giao tận nhà?' },
  { id:'B:kh03-03', mod:'kh03', skill:'insight', read:'7 phút', t:'Ly cà phê buổi sáng thật ra đang cạnh tranh với những gì?' },
  { id:'B:kh03-04', mod:'kh03', skill:'comm', read:'6 phút', t:'Viết câu job thế nào để cả nhóm cùng hiểu một việc?' },
  { id:'B:kh03-05', mod:'kh03', skill:'measure', read:'7 phút', t:'Khách "sa thải" ứng dụng của bạn thì họ đang thuê gì thay thế?' },
  { id:'B:kh03-06', mod:'kh03', skill:'insight', read:'7 phút', t:'Thêm tính năng mới hay làm tốt hơn việc khách đang thuê?' },
  { id:'B:kh03-07', mod:'kh03', skill:'brand', read:'6 phút', t:'Đặt tên và viết thông điệp theo việc của khách thế nào?' },
  { id:'B:kh03-08', mod:'kh03', skill:'creative', read:'7 phút', t:'Người ta đăng ký phòng gym để làm việc gì — và vì sao tháng thứ ba bỏ?' },
  { id:'B:kh03-09', mod:'kh03', skill:'measure', read:'7 phút', t:'Chọn việc nào để tập trung khi khách thuê bạn cho nhiều việc khác nhau?' },
  { id:'B:kh04-01', mod:'kh04', skill:'insight', read:'6 phút', t:'"Khách mua vào buổi tối" là insight hay chỉ là dữ kiện?' },
  { id:'B:kh04-02', mod:'kh04', skill:'insight', read:'7 phút', t:'Vì sao "mẹ muốn con khoẻ" không phải là insight?' },
  { id:'B:kh04-03', mod:'kh04', skill:'insight', read:'7 phút', t:'Làm sao biết insight của bạn đúng trước khi làm quảng cáo?' },
  { id:'B:kh04-04', mod:'kh04', skill:'creative', read:'7 phút', t:'Có insight rồi, làm sao ra được ý tưởng?' },
  { id:'B:kh04-05', mod:'kh04', skill:'insight', read:'7 phút', t:'Sĩ diện, ngại từ chối, lo cho con — insight Việt nằm ở đâu?' },
  { id:'B:kh04-06', mod:'kh04', skill:'measure', read:'7 phút', t:'Đọc 2.000 bình luận thế nào để ra insight?' },
  { id:'B:kh04-07', mod:'kh04', skill:'insight', read:'6 phút', t:'Mẹ mua, con dùng — insight của ai?' },
  { id:'B:kh04-08', mod:'kh04', skill:'brand', read:'6 phút', t:'Insight từng đúng, sao giờ quảng cáo hết chạm?' },
  { id:'B:kh04-09', mod:'kh04', skill:'comm', read:'7 phút', t:'Viết câu insight thế nào để cả nhóm dùng được?' },
  { id:'B:kh05-01', mod:'kh05', skill:'insight', read:'6 phút', t:'"Chị có mua không?" — vì sao câu trả lời "có" gần như vô giá trị?' },
  { id:'B:kh05-02', mod:'kh05', skill:'insight', read:'6 phút', t:'Câu hỏi của bạn đã chứa sẵn câu trả lời chưa?' },
  { id:'B:kh05-03', mod:'kh05', skill:'insight', read:'7 phút', t:'Phỏng vấn đồng nghiệp và bạn bè có tính không?' },
  { id:'B:kh05-04', mod:'kh05', skill:'measure', read:'6 phút', t:'Phỏng vấn bao nhiêu người là đủ?' },
  { id:'B:kh05-05', mod:'kh05', skill:'comm', read:'6 phút', t:'Khách vừa nói "cũng được", bạn hỏi tiếp hay chuyển câu?' },
  { id:'B:kh05-06', mod:'kh05', skill:'insight', read:'6 phút', t:'Trong ghi chép của bạn, đâu là lời khách, đâu là suy diễn của bạn?' },
  { id:'B:kh05-07', mod:'kh05', skill:'insight', read:'7 phút', t:'Tám cuộc phỏng vấn xong, làm sao ra được ba chủ đề?' },
  { id:'B:kh05-08', mod:'kh05', skill:'measure', read:'7 phút', t:'Khảo sát online: cần bao nhiêu phiếu và hỏi thang điểm thế nào?' },
  { id:'B:kh06-01', mod:'kh06', skill:'insight', read:'6 phút', t:'Điều gì khiến khách bắt đầu nghĩ tới việc mua?' },
  { id:'B:kh06-02', mod:'kh06', skill:'insight', read:'7 phút', t:'Khách so sánh những ai trước khi chọn bạn?' },
  { id:'B:kh06-03', mod:'kh06', skill:'channel', read:'7 phút', t:'Khách xem trên TikTok, hỏi Zalo, mua ở cửa hàng — tính công cho ai?' },
  { id:'B:kh06-04', mod:'kh06', skill:'channel', read:'6 phút', t:'Khách đã chọn hãng bạn ở nhà, sao đến cửa hàng lại đổi ý?' },
  { id:'B:kh06-05', mod:'kh06', skill:'brand', read:'6 phút', t:'Mua xong rồi, sao vẫn cần lo lần mở hộp và lần dùng đầu?' },
  { id:'B:kh06-06', mod:'kh06', skill:'comm', read:'6 phút', t:'Khách vừa mua xong lại thấy lo — bạn nói gì với họ?' },
  { id:'B:kh06-07', mod:'kh06', skill:'measure', read:'7 phút', t:'Làm sao để lần mua thứ hai tự xảy ra?' },
  { id:'B:kh06-08', mod:'kh06', skill:'insight', read:'7 phút', t:'Bản đồ hành trình dán trên tường — làm sao để nó thật sự có ích?' },
  { id:'B:kh06-09', mod:'kh06', skill:'channel', read:'6 phút', t:'Chai nước 10 nghìn và căn hộ 3 tỉ có chung một hành trình không?' },
  { id:'B:kh06-10', mod:'kh06', skill:'measure', read:'7 phút', t:'Khách rơi rụng ở đâu trên đường tới đơn hàng?' },
  { id:'B:kh07-01', mod:'kh07', skill:'comm', read:'6 phút', t:'Nói “tiết kiệm 300.000đ” hay “đang mất 300.000đ mỗi tháng”?' },
  { id:'B:kh07-02', mod:'kh07', skill:'insight', read:'7 phút', t:'Vì sao thêm một gói “chẳng ai mua” lại làm gói giữa bán chạy?' },
  { id:'B:kh07-03', mod:'kh07', skill:'insight', read:'6 phút', t:'Menu trà sữa 48 món: nhiều lựa chọn hơn có bán được nhiều hơn?' },
  { id:'B:kh07-04', mod:'kh07', skill:'insight', read:'6 phút', t:'Vì sao tiền thưởng Tết được tiêu dễ hơn tiền lương?' },
  { id:'B:kh07-05', mod:'kh07', skill:'insight', read:'7 phút', t:'Dùng thử miễn phí 7 ngày: vì sao khách khó trả lại thứ đã cầm?' },
  { id:'B:kh07-06', mod:'kh07', skill:'comm', read:'6 phút', t:'Trả góp 0%, mua trước trả sau: vì sao “chỉ 22.000đ mỗi ngày” lại bán được điện thoại?' },
  { id:'B:kh07-07', mod:'kh07', skill:'comm', read:'7 phút', t:'Khi nào một cú hích tâm lý trở thành “dark pattern”?' },
  { id:'B:kh08-01', mod:'kh08', skill:'insight', read:'7 phút', t:'Khách này tin số đông, chuyên gia hay người giống mình?' },
  { id:'B:kh08-02', mod:'kh08', skill:'insight', read:'6 phút', t:'Vì sao 4,9 sao với toàn lời khen lại bán kém hơn 4,6 sao?' },
  { id:'B:kh08-03', mod:'kh08', skill:'measure', read:'6 phút', t:'"Đã bán 12" có nên hiện lên trang không?' },
  { id:'B:kh08-04', mod:'kh08', skill:'creative', read:'7 phút', t:'Testimonial nào khiến người đọc tin, testimonial nào bị lướt qua?' },
  { id:'B:kh08-05', mod:'kh08', skill:'comm', read:'6 phút', t:'Đồng hồ đếm ngược chạy lại mỗi lần tải trang thì sao?' },
  { id:'B:kh08-06', mod:'kh08', skill:'channel', read:'7 phút', t:'Flash sale mỗi tuần kéo doanh số hay đang dạy khách chờ giảm giá?' },
  { id:'B:kh08-07', mod:'kh08', skill:'channel', read:'6 phút', t:'"Chỉ còn 3 sản phẩm" trên sàn: khi nào giúp, khi nào hại?' },
  { id:'B:kh08-08', mod:'kh08', skill:'brand', read:'7 phút', t:'Mua review, bịa "khách nói gì": ranh giới pháp lý và đạo đức ở đâu?' },
  { id:'B:kh09-01', mod:'kh09', skill:'insight', read:'6 phút', t:'Ai thật sự "mua" phần mềm kế toán trong một công ty 200 người?' },
  { id:'B:kh09-02', mod:'kh09', skill:'insight', read:'7 phút', t:'Vì sao khách chọn hãng lớn đắt hơn dù sản phẩm của bạn tốt hơn?' },
  { id:'B:kh09-03', mod:'kh09', skill:'channel', read:'7 phút', t:'Khách mất 6 tháng mới ký, marketing làm gì trong 6 tháng đó?' },
  { id:'B:kh09-04', mod:'kh09', skill:'comm', read:'6 phút', t:'Case study nào khiến giám đốc nhà máy tin bạn?' },
  { id:'B:kh09-05', mod:'kh09', skill:'measure', read:'7 phút', t:'Báo giá B2B: giảm giá hay đổi cách chào giá?' },
  { id:'B:kh09-06', mod:'kh09', skill:'channel', read:'6 phút', t:'Demo cho cả phòng ban hay dùng thử có hướng dẫn?' },
  { id:'B:kh09-07', mod:'kh09', skill:'brand', read:'6 phút', t:'Khi sales nghỉ việc, khách có đi theo không?' },
  { id:'B:kh09-08', mod:'kh09', skill:'measure', read:'7 phút', t:'500 lead rẻ hay 80 lead đúng người?' },
  { id:'B:kh09-09', mod:'kh09', skill:'insight', read:'7 phút', t:'Hợp đồng còn 90 ngày hết hạn, bắt đầu giữ khách từ đâu?' },
  { id:'B:kh09-10', mod:'kh09', skill:'comm', read:'6 phút', t:'Chạy quảng cáo B2B như bán trà sữa có được không?' },
  { id:'B:kh10-01', mod:'kh10', skill:'insight', read:'6 phút', t:'Gen Z chỉ thích bắt trend — hay bạn đang nhìn nhầm lý do?' },
  { id:'B:kh10-02', mod:'kh10', skill:'insight', read:'7 phút', t:'Sinh viên ít tiền thì chỉ mua đồ rẻ nhất?' },
  { id:'B:kh10-03', mod:'kh10', skill:'creative', read:'6 phút', t:'Vì sao video "chuyên nghiệp" lại thua video quay bằng điện thoại?' },
  { id:'B:kh10-04', mod:'kh10', skill:'channel', read:'7 phút', t:'Khách trẻ tìm quán ăn trên TikTok — Google của bạn còn đủ không?' },
  { id:'B:kh10-05', mod:'kh10', skill:'insight', read:'7 phút', t:'Phụ huynh mua sữa cho con vì dinh dưỡng — hay vì sợ điều gì?' },
  { id:'B:kh10-06', mod:'kh10', skill:'channel', read:'7 phút', t:'Một bà mẹ trong nhóm Facebook có sức nặng hơn quảng cáo của bạn?' },
  { id:'B:kh10-07', mod:'kh10', skill:'comm', read:'6 phút', t:'Người dùng là đứa trẻ, người trả tiền là bố mẹ — bạn nói với ai?' },
  { id:'B:kh10-08', mod:'kh10', skill:'channel', read:'7 phút', t:'Người tỉnh mua ở đâu và tin ai — có giống người thành phố?' },
  { id:'B:kh10-09', mod:'kh10', skill:'brand', read:'7 phút', t:'Người ngoại thành chọn thương hiệu quen vì bảo thủ — hay vì sợ mất tiền?' },
  { id:'B:kh10-10', mod:'kh10', skill:'insight', read:'7 phút', t:'Chân dung khách của bạn là người thật — hay là một khuôn mẫu?' },
];

/* Nội dung bài (được các file bài/*.js điền vào khi tải). */
const BAI = {};
function BAI_ADD(pack){
  const mod = BAI_MODS.find(m => m.id === pack.mod), stage = mod && STEP_STAGE[mod.step];
  pack.lessons.forEach(l => {
    BAI[l.id] = l;
    /* Câu hỏi của bài vào chung ngân hàng câu: quiz, ôn lỗi, thi dùng lại được. #1 đoán trước, #2 quyết định. */
    if (typeof EXAM_ITEMS !== 'undefined') (l.q || []).forEach((it, i) => {
      const id = `${l.id}#${i + 1}`;
      if (!EXAM_ITEMS.some(x => x.id === id))
        EXAM_ITEMS.push({ core:false, difficulty:2, minutes:1, ...it, id, source:l.id, stage, mod:pack.mod,
                          teaches: it.teaches || [l.id] });
    });
  });
}

/* Ghép module đã xuất bản vào chương trình. */
(() => {
  if (typeof STAGES === 'undefined') return;
  BAI_MODS.forEach(m => {
    const st = STAGES.find(s => s.id === STEP_STAGE[m.step]); if (!st || st.mods.some(x => x.id === m.id)) return;
    st.mods.push({ id:m.id, t:m.t, lessons:BAI_INDEX.filter(b => b.mod === m.id).map(b => b.id),
      caseLink:{ t:'Áp dụng vào một case có bấm giờ', href:'case-thu-vien.html' } });
    const j = typeof JOURNEY !== 'undefined' && JOURNEY.find(x => x.k === m.step);
    if (j && !j.mods.includes(m.id)) j.mods.push(m.id);
  });
})();
