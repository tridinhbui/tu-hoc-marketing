/* CREATIVE CHALLENGE — chọn trước, giải thích sau. Không chỉ đúng/sai. */
const CHALLENGES = [
{id:'ch-headline', kind:'Write the headline', d:'creative', color:'#7A2E8E',
 brief:'Một tiệm giặt là mở giữa khu văn phòng. Khách hàng: nhân viên công sở, gửi đồ sáng, lấy chiều.',
 q:'Headline nào mạnh nhất cho biển hiệu ngoài mặt tiền?',
 opts:[
  {t:'Giặt sạch – nhanh chóng – uy tín', why:'Ba tính từ mà tiệm nào cũng in. Không loại trừ ai, không tạo hình ảnh, không kiểm chứng được. Đây là mức nền của category, không phải một câu quảng cáo.'},
  {t:'Gửi lúc 8h. Mặc lúc 18h.', why:'Đúng. Nó là một dữ kiện, khớp chính xác với nhịp một ngày làm việc, và tự chứng minh lời hứa mà không cần tính từ nào. Cụ thể luôn thắng khái quát.', ok:true},
  {t:'Nâng niu từng sợi vải Việt', why:'Mượn nhịp của một tagline nổi tiếng, nghe êm nhưng nói về cảm xúc mà khách của tiệm giặt không hề có. Sai người, sai lúc.'},
  {t:'Công nghệ giặt hơi nước châu Âu', why:'Nói về đầu vào (tính năng) thay vì kết quả khách quan tâm. Chỉ có tác dụng khi khách đã tin bạn và đang so sánh chi tiết.'}]},

{id:'ch-reposition', kind:'Reposition this brand', d:'brand', color:'#B3320F',
 brief:'Một thương hiệu trà thảo mộc Việt 20 năm tuổi, doanh số ổn định ở nhóm trên 45 tuổi, gần như không có người dùng dưới 30.',
 q:'Hướng tái định vị nào có cơ hội nhất?',
 opts:[
  {t:'Làm bao bì trẻ trung và chạy TikTok', why:'Đây là chiến thuật, không phải định vị. Đổi vỏ mà không đổi lý do tồn tại thì chỉ tạo ra một sản phẩm cũ trong áo mới, và làm mất luôn nhóm khách đang trả tiền.'},
  {t:'Định vị lại quanh dịp dùng: đồ uống không caffeine cho buổi tối', why:'Đúng. Nó tạo một category entry point mới mà không phủ nhận sản phẩm cũ, và trả lời được câu hỏi "khi nào tôi uống thứ này". Nhóm cũ vẫn giữ nguyên.', ok:true},
  {t:'Giảm giá để cạnh tranh với trà đóng chai', why:'Đẩy thương hiệu vào cuộc đua mà nó không có lợi thế chi phí, đồng thời phá bỏ giá trị cảm nhận đã tích luỹ 20 năm.'},
  {t:'Mời một ngôi sao trẻ làm đại sứ', why:'Mua được sự chú ý ngắn hạn nhưng không trả lời câu hỏi vì sao người trẻ nên uống. Đại sứ khuếch đại một định vị; nó không thay thế được định vị.'}]},

{id:'ch-insight', kind:'Find the consumer insight', d:'consumer', color:'#1F5C4A',
 brief:'Phòng gym trong khu chung cư: rất nhiều người đăng ký tháng đầu năm, 60% không quay lại sau tuần thứ ba.',
 q:'Đâu là insight thật sự dùng được?',
 opts:[
  {t:'Người Việt ngày càng quan tâm đến sức khoẻ', why:'Một xu hướng, không phải insight. Đúng với mọi thương hiệu trong ngành nên không dẫn tới hành động cụ thể nào.'},
  {t:'Khách bận nên không có thời gian tập', why:'Là lời bào chữa mà khách nói ra, không phải nguyên nhân. Cùng những người đó vẫn có 40 phút cho việc khác mỗi tối.'},
  {t:'Tôi muốn thay đổi cơ thể, nhưng ba tuần đầu tôi trông tệ hơn và không ai công nhận nỗ lực, nên tôi bỏ.', why:'Đúng. Có cấu trúc "muốn – nhưng – nên", chạm vào một sự thật hơi khó nói, và mở ra giải pháp: thiết kế phần thưởng và sự công nhận cho ba tuần đầu.', ok:true},
  {t:'Giá hội viên còn cao so với thu nhập', why:'Nếu là vấn đề giá thì họ đã không đăng ký ngay từ đầu. Tiền đã trả rồi mà vẫn bỏ — vấn đề nằm ở chỗ khác.'}]},

{id:'ch-ad', kind:'Choose the stronger ad', d:'creative', color:'#7A2E8E',
 brief:'Hai phương án cho một ứng dụng tiết kiệm nhắm tới người mới đi làm.',
 q:'Phương án nào mạnh hơn?',
 opts:[
  {t:'Một film 30 giây: nhân vật lướt app, giọng nói nêu bốn tính năng, kết bằng logo và mã giảm giá.', why:'Đây là bản demo sản phẩm được quay đẹp. Nó chỉ có tác dụng với người đã muốn tìm một app tiết kiệm — tức là phần rất nhỏ của thị trường.'},
  {t:'Một film 30 giây: nhân vật đếm lại xem tháng vừa rồi tiền đi đâu, không nhớ nổi. Màn hình cuối: “Bạn không tiêu hoang. Bạn chỉ không nhìn thấy.”', why:'Đúng. Nó bắt đầu từ một khoảnh khắc ai cũng từng trải, đặt tên cho vấn đề trước khi bán giải pháp, và câu kết đủ cụ thể để nhớ. Sản phẩm xuất hiện như câu trả lời, không như chủ đề.', ok:true}]},

{id:'ch-landing', kind:'Fix this landing page', d:'growth', color:'#1B4C8C',
 brief:'Landing page khoá học online: hero có 3 nút (Đăng ký, Xem học phí, Tải brochure), 6 logo đối tác, một video giới thiệu 4 phút và form 9 trường.',
 q:'Sửa gì đầu tiên?',
 opts:[
  {t:'Đổi màu nút chính sang màu tương phản hơn', why:'Tối ưu bề mặt. Có thể nhích được vài phần trăm nhưng không chạm vào nguyên nhân: người dùng đang phải chọn quá nhiều thứ cùng lúc.'},
  {t:'Bỏ còn một hành động duy nhất và rút form xuống 3 trường', why:'Đúng. Mỗi lựa chọn thêm vào là một cơ hội trì hoãn. Giảm số quyết định gần như luôn là đòn bẩy lớn nhất trên một trang chuyển đổi.', ok:true},
  {t:'Thêm đồng hồ đếm ngược tạo cảm giác gấp', why:'Khan hiếm giả trên một trang chưa tạo được nhu cầu chỉ làm giảm độ tin cậy. Cấp bách chỉ có tác dụng sau khi đã có mong muốn.'},
  {t:'Thay video 4 phút bằng video 8 phút chi tiết hơn', why:'Đi sai hướng: người ở đầu phễu chưa đủ động lực để xem lâu hơn. Nội dung dài thuộc về giai đoạn cân nhắc, không phải giai đoạn đầu.'}]},

{id:'ch-launch', kind:'Design a launch idea', d:'strategy', color:'#4A3A2A',
 brief:'Một thương hiệu nước mắm truyền thống ra mắt dòng cao cấp, giá gấp ba loại phổ thông.',
 q:'Ý tưởng ra mắt nào đúng chiến lược nhất?',
 opts:[
  {t:'Phát mẫu dùng thử miễn phí tại siêu thị', why:'Hợp lý cho hàng phổ thông, nhưng phát miễn phí ở lối đi siêu thị làm tan biến tín hiệu cao cấp. Bối cảnh trải nghiệm chính là một phần của giá.'},
  {t:'Công bố vùng làm mắm, thời gian ủ và tên người làm nghề, kèm số lô giới hạn in trên chai', why:'Đúng. Sản phẩm cao cấp cần bằng chứng kiểm chứng được, câu chuyện xuất xứ và tín hiệu khan hiếm — cả ba đều biện minh cho mức giá gấp ba.', ok:true},
  {t:'Chạy quảng cáo hiệu suất nhắm nhóm thu nhập cao', why:'Đây là kênh phân phối, không phải ý tưởng ra mắt. Nếu không có lý do để tin, nhắm đúng người vẫn không tạo ra doanh số.'},
  {t:'So sánh trực tiếp với loại phổ thông về độ đạm', why:'Kéo cuộc trò chuyện về thông số, nơi mọi thương hiệu đều có thể phản bác — và làm tổn thương chính dòng phổ thông của mình.'}]},

{id:'ch-concept', kind:'Build a campaign concept', d:'brand', color:'#B3320F',
 brief:'Một hiệu sách độc lập sắp đóng cửa chi nhánh thứ hai. Ngân sách gần như bằng không.',
 q:'Concept nào có khả năng tạo tiếng vang nhất?',
 opts:[
  {t:'Giảm giá toàn bộ 50% trong tháng cuối', why:'Thu được tiền mặt ngắn hạn nhưng không tạo câu chuyện, không giữ được khách sau khi kho hết. Đây là thanh lý, không phải campaign.'},
  {t:'“Những cuốn chưa ai mang về”: trưng riêng các đầu sách chưa từng được bán ra lần nào, mỗi cuốn kèm một dòng viết tay của nhân viên', why:'Đúng. Nó biến điểm yếu (sách ế) thành một cơ chế đáng kể lại, cực rẻ, rất dễ chụp ảnh chia sẻ, và nói đúng lý do người ta yêu hiệu sách độc lập: con người phía sau kệ sách.', ok:true},
  {t:'Kêu gọi cộng đồng quyên góp để giữ cửa hàng', why:'Có thể hiệu quả một lần nhưng đặt thương hiệu vào vị thế cần được thương hại, và không giải quyết lý do vì sao người ta ngừng ghé.'},
  {t:'Mời một người nổi tiếng đến ký tặng sách', why:'Tạo được một ngày đông khách. Không có cơ chế lặp lại và không nói gì về bản sắc của chính hiệu sách.'}]},
];

CHALLENGES.push(
{id:'ch-headline-2', kind:'Write the headline', d:'creative', color:'#7A2E8E',
 brief:'Ứng dụng đặt lịch khám bệnh. Người dùng chính: người đi làm, ngại gọi điện, sợ chờ ba tiếng ở phòng khám.',
 q:'Headline nào cho màn hình đầu tiên của trang tải app?',
 opts:[
  {t:'Giải pháp chăm sóc sức khoẻ toàn diện cho gia đình Việt', why:'Nói về mình, dùng ngôn ngữ hồ sơ năng lực, và không chạm vào bất cứ nỗi khó chịu cụ thể nào. Câu này có thể dán lên bất kỳ ứng dụng y tế nào.'},
  {t:'Đặt lịch trong 30 giây, không phải gọi điện', why:'Đúng. Nó nói đúng hai thứ người dùng thật sự muốn tránh: mất thời gian và phải gọi điện. Cụ thể, kiểm chứng được, và loại trừ rõ một cách làm cũ.', ok:true},
  {t:'Sức khoẻ của bạn là ưu tiên số một của chúng tôi', why:'Một lời cam kết mà ai cũng nói và không ai kiểm chứng được. Nó không cho người dùng biết ứng dụng này làm gì khác đi.'},
  {t:'Ứng dụng y tế được tin dùng bởi hơn 200.000 người', why:'Bằng chứng xã hội đặt sai vị trí: nó là lý do để tin sau khi người ta đã hiểu sản phẩm giải quyết gì. Đặt lên đầu tiên là bỏ qua bước quan trọng nhất.'}]},

{id:'ch-insight-2', kind:'Find the consumer insight', d:'consumer', color:'#1F5C4A',
 brief:'Ứng dụng đọc sách tóm tắt. Người dùng tải nhiều, đọc hai ba cuốn rồi bỏ, nhưng vẫn giữ app trong máy và không huỷ gói.',
 q:'Insight nào giải thích đúng hành vi này?',
 opts:[
  {t:'Người dùng bận nên không có thời gian đọc', why:'Nếu là vấn đề thời gian thì sản phẩm tóm tắt 15 phút đã giải quyết xong rồi. Hành vi giữ app mà không dùng cần một cách giải thích khác.'},
  {t:'Nội dung tóm tắt chưa đủ hay', why:'Có thể đúng một phần, nhưng nó không giải thích được vì sao họ vẫn giữ app và vẫn trả tiền. Người ta không trả tiền cho thứ mình thấy dở.'},
  {t:'Tôi muốn là người ham đọc. Giữ app này khiến tôi thấy mình vẫn đang trên đường đó, ngay cả khi tôi không mở nó.', why:'Đúng. Nó giải thích cả hai hành vi mâu thuẫn: không dùng nhưng không huỷ. Sản phẩm đang bán bản dạng chứ không bán nội dung — và điều đó mở ra hướng thiết kế hoàn toàn khác.', ok:true},
  {t:'Giao diện khó dùng nên người ta bỏ giữa chừng', why:'Đây là giả thuyết về khả năng dùng, kiểm chứng bằng đo lường thì nhanh. Nhưng nó vẫn không giải thích được vì sao người dùng tiếp tục trả tiền.'}]},

{id:'ch-launch-2', kind:'Design a launch idea', d:'strategy', color:'#4A3A2A',
 brief:'Một tiệm bánh trung thu gia truyền, sản lượng có hạn, muốn bán hết sớm mà không phải giảm giá cuối mùa.',
 q:'Cách ra mắt nào đúng nhất với tình thế này?',
 opts:[
  {t:'Mở đặt trước từ sáu tuần, công bố tổng số bánh làm được trong mùa và cập nhật số còn lại mỗi tuần', why:'Đúng. Khan hiếm ở đây là có thật chứ không bịa, nên nó vừa đáng tin vừa dồn nhu cầu về sớm. Đặt trước cũng cho biết cần làm bao nhiêu, tức là hết mùa không còn hàng tồn để phải giảm giá.', ok:true},
  {t:'Chạy quảng cáo phủ rộng suốt mùa với thông điệp chất lượng gia truyền', why:'Đốt ngân sách vào độ phủ trong khi sản lượng có hạn — tạo nhu cầu vượt quá khả năng cung ứng ở sai thời điểm, và "gia truyền" là điều mọi tiệm đều nói.'},
  {t:'Giảm giá 20% cho hai tuần đầu để kích cầu sớm', why:'Đi ngược mục tiêu: nó dạy khách rằng mua sớm là mua rẻ, và cắt thẳng vào biên lợi nhuận của một sản phẩm vốn đã giới hạn sản lượng.'},
  {t:'Làm hộp quà cao cấp cho khách doanh nghiệp', why:'Đây là một hướng kinh doanh hợp lý, nhưng nó là quyết định về danh mục và kênh, không phải một ý tưởng ra mắt. Nó cũng đòi thời gian bán hàng B2B mà mùa vụ không cho phép.'}]},

{id:'ch-funnel', kind:'Fix this funnel', d:'growth', color:'#1B4C8C',
 brief:'Webinar miễn phí về marketing: 4.000 người xem trang, 900 đăng ký, 180 tham dự, 6 mua khoá học sau đó.',
 q:'Bước nào nên sửa trước?',
 opts:[
  {t:'Chạy thêm quảng cáo để tăng lượng người xem trang', why:'Đổ thêm người vào một phễu đang rơi 80% ở khâu tham dự. Chi phí tăng tuyến tính còn kết quả thì không.'},
  {t:'Sửa tỉ lệ đăng ký → tham dự (900 xuống 180)', why:'Đúng. Đây là bước rơi mạnh nhất và cũng rẻ nhất để cứu: nhắc lịch, gửi trước một thứ có giá trị, hỏi họ muốn nghe gì. Người đã đăng ký là người đã giơ tay — mất họ ở đây là lãng phí lớn nhất.', ok:true},
  {t:'Sửa tỉ lệ tham dự → mua (180 xuống 6)', why:'Tỉ lệ 3% từ một webinar miễn phí không phải là bất thường. Nó chỉ đáng động vào sau khi đã có đủ người dự để đo lường có ý nghĩa.'},
  {t:'Rút ngắn form đăng ký', why:'Tỉ lệ trang → đăng ký đang là 22%, khá tốt. Tối ưu ở đây cho thêm vài phần trăm trong khi lỗ hổng thật lớn gấp nhiều lần đang nằm ngay bước sau.'}]},

{id:'ch-reposition-2', kind:'Reposition this brand', d:'brand', color:'#B3320F',
 brief:'Một rạp chiếu phim độc lập 3 phòng chiếu, nằm giữa hai cụm rạp lớn có ghế tốt hơn và giá vé rẻ hơn.',
 q:'Hướng định vị nào có cửa thắng?',
 opts:[
  {t:'Cạnh tranh bằng giá vé thấp hơn vào các ngày trong tuần', why:'Đấu giá với đối thủ có quy mô lớn hơn nhiều là cuộc chiến chắc thua: họ chịu lỗ được lâu hơn bạn.'},
  {t:'Nâng cấp ghế và âm thanh cho bằng cụm rạp lớn', why:'Đầu tư lớn để đạt tới mức ngang bằng — tốn tiền chỉ để hết bất lợi, chứ không tạo được lý do nào để người ta chọn bạn.'},
  {t:'Trở thành rạp của những phim mà nơi khác không chiếu: phim độc lập, phim cũ chiếu lại, có người dẫn chuyện trước buổi chiếu', why:'Đúng. Nó đổi luôn cuộc chơi: không cạnh tranh về tiện nghi mà cạnh tranh về nội dung và cộng đồng — đúng hai thứ mà quy mô lớn khó làm vì họ cần lấp ghế bằng phim bom tấn.', ok:true},
  {t:'Đẩy mạnh combo bắp nước và thẻ thành viên tích điểm', why:'Chiến thuật vận hành có thể tăng chút doanh thu trên mỗi khách, nhưng không trả lời câu hỏi cốt lõi: vì sao tôi nên đi rạp này thay vì rạp kia?'}]},
);

/* Đợt 3 — mở rộng ngân hàng Phòng thử thách. Vị trí đáp án đúng được xoay vòng, mỗi phương án sai có lý do riêng. */
CHALLENGES.push(
{id:'ch-pricing', kind:'Set the price', d:'strategy', color:'#4A3A2A',
 brief:'Một phòng gym khu dân cư, 300 hội viên trả 450k/tháng, công suất giờ cao điểm đã kín 90%. Chủ phòng muốn tăng doanh thu mà không mở thêm phòng.',
 q:'Hướng nào hợp lý nhất?',
 opts:[
  {t:'Giảm giá 20% để thu hút thêm 100 hội viên', why:'Giờ cao điểm đã kín: khách mới chỉ làm phòng đông hơn và khách cũ bực bội. Giảm giá còn cắt doanh thu trên 300 người đang trả đủ.'},
  {t:'Giữ giá, thêm thật nhiều máy tập mới', why:'Tăng cung trong không gian đã chật không giải quyết điểm nghẽn, đồng thời tốn vốn mà chưa chứng minh có khách sẵn sàng trả thêm.'},
  {t:'Chia giá theo khung giờ: gói giờ thấp điểm rẻ hơn, giờ cao điểm đắt hơn, và dùng gói rẻ để kéo khách sang giờ vắng', why:'Đúng. Giá đang làm đúng việc của nó: dồn nhu cầu từ chỗ nghẽn sang chỗ thừa công suất. Doanh thu tăng mà không cần thêm diện tích.', ok:true},
  {t:'Tăng giá đồng loạt 30% cho mọi hội viên', why:'Có thể tăng doanh thu trước mắt nhưng đánh vào cả người dùng giờ vắng, là nhóm lẽ ra nên giữ. Không dùng giá để giải quyết vấn đề công suất.'}]},

{id:'ch-channel', kind:'Pick the channel', d:'growth', color:'#1B4C8C',
 brief:'Một xưởng làm bánh handmade ở Đà Lạt, bán 3 loại bánh quà tặng, giá 280–450k. Ngân sách 15 triệu/tháng, khách chủ yếu là dân du lịch và người mua quà cho nhau.',
 q:'Kênh nào nên thử trước?',
 opts:[
  {t:'Quảng cáo Facebook rộng toàn quốc theo sở thích “ẩm thực”', why:'Phủ rộng nên tốn tiền cho người không ở trong dịp mua quà. Với ngân sách nhỏ, tệp rộng đốt tiền trước khi kịp học được gì.'},
  {t:'Hợp tác 3–5 homestay và quán cà phê để bày bánh kèm mã giới thiệu riêng', why:'Đúng. Nó đặt sản phẩm đúng nơi và đúng lúc khách đang cần quà, rẻ, đo được bằng mã, và học nhanh kênh nào sinh đơn.', ok:true},
  {t:'Thuê một KOL ẩm thực lớn đăng một bài', why:'Một bài đắt cho một lần phủ không kiểm soát. Không có cách đo, và không có cơ chế để người xem mua đúng lúc.'},
  {t:'Mở kênh TikTok và đăng mỗi ngày', why:'Có thể hiệu quả về lâu dài, nhưng là khoản đầu tư thời gian lớn, chưa trả lời được câu hỏi bán hàng trong 30 ngày tới.'}]},

{id:'ch-retention', kind:'Reduce churn', d:'growth', color:'#1B4C8C',
 brief:'Ứng dụng học tiếng Anh gói 99k/tháng. Tỷ lệ huỷ tháng đầu 38%. Khảo sát cho thấy phần lớn người huỷ nói “không có thời gian học”.',
 q:'Bạn xử lý theo hướng nào?',
 opts:[
  {t:'Gửi email giảm giá 50% cho người sắp huỷ', why:'Giữ được vài người nhưng dạy khách rằng muốn rẻ thì doạ huỷ. Không đụng tới nguyên nhân “không có thời gian”.'},
  {t:'Thêm 200 bài học mới vào thư viện', why:'Người đã không có thời gian sẽ không vì có thêm bài mà có thêm thời gian. Đây là giải pháp cho vấn đề khác.'},
  {t:'Đổi trải nghiệm tuần đầu: bài 5 phút, nhắc đúng giờ khách chọn, và đặt mục tiêu nhỏ có thể xong trong tuần', why:'Đúng. Nguyên nhân thật là thói quen chưa hình thành. Việc cần làm là giảm chi phí để bắt đầu mỗi ngày, ở đúng giai đoạn mà khách rơi nhiều nhất.', ok:true},
  {t:'Thêm bước xác nhận khó hơn khi huỷ gói', why:'Giảm huỷ trên giấy nhưng tăng khiếu nại, hoàn tiền và đánh giá xấu. Đây là dark pattern, không phải giữ chân.'}]},

{id:'ch-positioning-3', kind:'Position the product', d:'brand', color:'#B3320F',
 brief:'Một thương hiệu nước mắm truyền thống muốn bán cho người trẻ nấu ăn tại nhà. Giá cao gấp 2 lần nước mắm phổ thông, nhãn chữ nhỏ và nhiều chữ.',
 q:'Định vị nào có khả năng nhất?',
 opts:[
  {t:'“Nước mắm ngon nhất Việt Nam”', why:'Tuyên bố ai cũng nói, không kiểm chứng được và không cho khách lý do trả gấp đôi.'},
  {t:'“Một muỗng, đủ vị cho một nồi” — nước mắm nguyên chất cho người nấu nhanh', why:'Đúng. Nó gắn sản phẩm với một việc cụ thể của người trẻ (nấu nhanh, ít nêm), biến giá cao thành lượng dùng ít và kết quả chắc, thay vì khoe truyền thống.', ok:true},
  {t:'“Hương vị truyền thống 100 năm”', why:'Hợp với người lớn tuổi đã tin. Với người trẻ, truyền thống không phải lý do mua nếu không gắn với việc họ cần làm.'},
  {t:'“Rẻ như nước mắm thường, ngon như nước mắm cao cấp”', why:'Mâu thuẫn với mức giá thật, làm hỏng niềm tin ngay lần mua đầu và phá vị thế cao cấp của sản phẩm.'}]},

{id:'ch-crisis', kind:'Respond to a crisis', d:'strategy', color:'#4A3A2A',
 brief:'Một khách hàng đăng video quán của bạn giao nhầm đơn, nhân viên nói chuyện thiếu lịch sự. Video đạt 400k lượt xem trong 6 giờ.',
 q:'Bước đầu tiên của bạn là gì?',
 opts:[
  {t:'Đợi vài ngày cho cơn bão qua', why:'Im lặng trong 6 giờ đầu là thừa nhận. Người xem lấp khoảng trống bằng suy đoán của họ.'},
  {t:'Xoá bình luận tiêu cực và nhắn riêng nhờ khách gỡ video', why:'Nhìn như che giấu, thường làm vụ việc nổ lớn hơn. Nhắn riêng chỉ nên là bước liên hệ để sửa, không phải để bịt miệng.'},
  {t:'Đăng phản bác từng điểm trong video', why:'Cãi công khai với khách khi chưa kiểm tra sự thật là cách nhanh nhất để thua trước đám đông.'},
  {t:'Xác minh sự việc trong 1–2 giờ, rồi đăng lời xin lỗi ngắn, nêu rõ việc đã sửa và liên hệ trực tiếp khách', why:'Đúng. Nhanh, có sự thật, có hành động cụ thể. Một lời xin lỗi không kèm sửa chữa chỉ là câu chữ.', ok:true}]},

{id:'ch-insight-3', kind:'Find the consumer insight', d:'consumer', color:'#1F5C4A',
 brief:'Một ứng dụng quản lý chi tiêu nhắm tới người 22–28 tuổi mới đi làm. Khảo sát: 80% nói “muốn tiết kiệm”, nhưng chỉ 12% mở ứng dụng quá 3 lần.',
 q:'Insight nào giải thích hiện tượng này tốt nhất?',
 opts:[
  {t:'Người trẻ không có kỷ luật tài chính', why:'Là phán xét, không phải insight. Nó đổ lỗi cho khách và không chỉ ra thiết kế nào cần đổi.'},
  {t:'Nhìn số dư mỗi ngày làm họ thấy mình tệ hơn, nên họ tránh mở ứng dụng', why:'Đúng. Có căng thẳng thật: muốn kiểm soát nhưng không muốn bị nhắc nhở về lỗi của mình. Hướng thiết kế: cho cảm giác tiến bộ trước, con số sau.', ok:true},
  {t:'Ứng dụng chưa đủ tính năng', why:'Giả định đáp án là thêm tính năng mà chưa kiểm chứng. Có thể khách chưa dùng hết những gì đã có.'},
  {t:'Họ chưa biết lợi ích của việc tiết kiệm', why:'Khảo sát vừa cho thấy 80% nói muốn tiết kiệm; họ biết lợi ích. Vấn đề không nằm ở nhận thức.'}]},

{id:'ch-creative-3', kind:'Judge the concept', d:'creative', color:'#7A2E8E',
 brief:'Chiến dịch cho một thương hiệu dầu gội dành cho tóc rụng. Ba ý tưởng cho video ngắn. Mục tiêu: người xem 25–40 tuổi, ngại nói chuyện tóc rụng.',
 q:'Ý tưởng nào mạnh nhất?',
 opts:[
  {t:'Người mẫu tóc đẹp lắc đầu trong gió, nhạc hoành tráng', why:'Khẩu hiệu của cả category. Tạo lòng khao khát nhưng không chạm tới nỗi ngại, nên người xem không thấy mình trong đó.'},
  {t:'Bác sĩ da liễu giải thích thành phần trong 30 giây', why:'Đúng thông tin nhưng khô. Phù hợp ở giai đoạn so sánh, không phải để mở lời với người đang ngại.'},
  {t:'Một người bạn nhặt tóc trên vai áo giúp người kia mà không ai nói gì, kết bằng câu “Đừng để đến lúc người khác nhắc”', why:'Đúng. Khoảnh khắc nhỏ, thật và đúng nỗi ngại. Nó cho khách cảm giác được hiểu, rồi mới mở ra giải pháp.', ok:true},
  {t:'Danh sách 10 nguyên nhân gây rụng tóc dưới dạng infographic', why:'Hữu ích nhưng dễ bị lướt qua, và không tạo cảm xúc đủ để người xem hành động hoặc nhớ thương hiệu.'}]},

{id:'ch-launch-3', kind:'Plan the launch', d:'strategy', color:'#4A3A2A',
 brief:'Một công ty khởi nghiệp ra mắt ứng dụng giao đồ ăn cho khu công nghiệp: 6 nhà máy, 12.000 công nhân, cơm trưa 20–30k. Ngân sách ra mắt 200 triệu.',
 q:'Bạn mở bán thế nào?',
 opts:[
  {t:'Quảng cáo toàn thành phố để có nhiều lượt tải', why:'Phần lớn người tải không ở khu có dịch vụ, nên trải nghiệm đầu tiên là “không giao được”. Đốt tiền và uy tín.'},
  {t:'Chọn 1 nhà máy, chạy thử 4 tuần với một vài quầy cơm và đo tỷ lệ đặt lại', why:'Đúng. Khép bán kính để học nhanh: giá, giờ cao điểm, thời gian giao, rồi nhân bản. Nhỏ nhưng đo được và sửa được.', ok:true},
  {t:'Tặng 100% phí giao trong 6 tháng ở cả 6 nhà máy', why:'Đốt tiền ở quy mô lớn trước khi biết mô hình có lãi. Khách học thói quen “miễn phí” và rời đi khi hết ưu đãi.'},
  {t:'Chờ hoàn thiện mọi tính năng rồi mới mở bán', why:'Trì hoãn học hỏi. Cơm trưa khu công nghiệp sẽ chỉ dạy bạn điều bạn cần khi có người dùng thật.'}]},

{id:'ch-brief-3', kind:'Write the brief', d:'strategy', color:'#4A3A2A',
 brief:'Agency nhận một brief từ khách: “Chúng tôi muốn tăng nhận biết thương hiệu và doanh số, nhắm tới mọi người từ 18 đến 60 tuổi, ngân sách linh hoạt.”',
 q:'Phản ứng đúng của chiến lược gia là gì?',
 opts:[
  {t:'Bắt tay vào làm ngay vì khách đã cho ngân sách linh hoạt', why:'Một brief không chọn gì thì kết quả sẽ không phục vụ ai. Ngân sách linh hoạt thường đồng nghĩa với kỳ vọng không giới hạn.'},
  {t:'Từ chối dự án vì brief tệ', why:'Quá sớm. Brief tệ thường là vì khách chưa được hỏi đúng câu hỏi, không phải vì họ không muốn làm tốt.'},
  {t:'Hỏi lại ba điều: mục tiêu nào trước, nhóm nào quan trọng nhất, và con số nào cho biết thành công', why:'Đúng. Ép khách chọn: nhận biết hay doanh số, ai là nhóm đầu tiên, đo bằng gì. Brief tốt không phải là danh sách mong muốn.', ok:true},
  {t:'Đề xuất chiến dịch phủ mọi kênh để không bỏ sót ai', why:'Phủ mọi thứ nghĩa là không ưu tiên gì và phân tán ngân sách. Nó chuyển trách nhiệm chọn từ khách sang thị trường.'}]},

{id:'ch-copy-3', kind:'Fix the CTA', d:'creative', color:'#7A2E8E',
 brief:'Landing page khoá học Excel cho nhân viên văn phòng. Nút chính đang ghi “Đăng ký ngay”, tỷ lệ bấm 1,1%. Khách là người đi làm bận, sợ mất tiền cho khoá học bỏ dở.',
 q:'Bạn thử câu nào cho nút chính?',
 opts:[
  {t:'“Đăng ký ngay hôm nay — chỉ còn 3 suất!”', why:'Khan hiếm giả thường bị khách nhận ra, và vẫn không làm giảm nỗi sợ bỏ dở. Cảm giác bị thúc ép làm tăng do dự.'},
  {t:'“Học thử bài đầu — 7 phút, miễn phí, không cần thẻ”', why:'Đúng. Nó giảm rủi ro và chi phí bắt đầu ngay ở bước mà khách đang sợ, và đưa họ tới trải nghiệm thật sớm nhất có thể.', ok:true},
  {t:'“Nâng tầm sự nghiệp cùng chuyên gia hàng đầu”', why:'Tính từ chung. Không nói gì về việc khách sẽ làm được hôm nay, cũng không giải quyết nỗi sợ.'},
  {t:'“Tìm hiểu thêm”', why:'An toàn nhưng không cam kết gì, dẫn tới trang khác mà không giảm rủi ro nên khó tăng đăng ký.'}]},

{id:'ch-segment-3', kind:'Choose the segment', d:'consumer', color:'#1F5C4A',
 brief:'Chuỗi tiệm giặt sấy có 4 phân khúc: sinh viên (giá nhạy cảm), nhân viên văn phòng (cần nhanh), gia đình có con nhỏ (nhiều đồ), khách sạn mini (đơn lớn, trả chậm).',
 q:'Bạn nên ưu tiên phân khúc nào nếu chỉ chọn một để mở rộng?',
 opts:[
  {t:'Sinh viên vì số lượng đông nhất', why:'Đông nhưng nhạy giá và trả ít. Tăng số lượng ở nhóm biên lợi nhuận thấp chỉ làm tiệm bận hơn mà không giàu hơn.'},
  {t:'Khách sạn mini vì đơn lớn', why:'Đơn lớn nhưng trả chậm và quyền thương lượng cao. Rủi ro dòng tiền với tiệm nhỏ có thể lớn hơn lợi ích.'},
  {t:'Nhân viên văn phòng: trả cao hơn cho tốc độ và sự tiện, lặp lại hằng tuần, dễ đo', why:'Đúng. Giá trị khách nhận là thời gian nên chịu trả giá cao, mua đều, và có thể phục vụ theo mô hình thuê bao gọn.', ok:true},
  {t:'Gia đình có con nhỏ vì có nhu cầu lớn', why:'Nhu cầu thật nhưng ngắn hạn theo giai đoạn và đòi hỏi vận hành khác (nhiều đồ, quần áo đặc thù). Chưa chắc phù hợp nhất để mở rộng.'}]},

{id:'ch-measure-3', kind:'Read the numbers', d:'growth', color:'#1B4C8C',
 brief:'Tháng này chiến dịch email có tỷ lệ mở 38% (tháng trước 24%) và doanh thu từ email không đổi. Sếp khen “email tăng trưởng mạnh”.',
 q:'Câu nào đúng nhất?',
 opts:[
  {t:'Đúng, tỷ lệ mở tăng nghĩa là chiến dịch hiệu quả hơn', why:'Tỷ lệ mở là chỉ số trung gian, không phải kết quả. Nó còn bị nhiễu bởi các thay đổi bảo mật của ứng dụng email.'},
  {t:'Tỷ lệ mở tăng nhưng doanh thu không đổi, nên cần kiểm tra bấm vào, chuyển đổi và danh sách người nhận trước khi kết luận', why:'Đúng. Hai con số không khớp là tín hiệu cần mổ xẻ, không phải để vui. Có thể danh sách đã thu hẹp, hoặc tiêu đề hấp dẫn nhưng nội dung không dẫn tới mua.', ok:true},
  {t:'Doanh thu không đổi là do mùa vụ', why:'Một giả thuyết hợp lý nhưng chưa được kiểm chứng. Đừng giải thích bằng giả thuyết trước khi nhìn dữ liệu của chính chiến dịch.'},
  {t:'Nên tăng gấp đôi số email gửi', why:'Tăng tần suất khi chưa hiểu vì sao doanh thu không theo thường làm tỷ lệ huỷ đăng ký tăng.'}]},

{id:'ch-partner-3', kind:'Judge the collaboration', d:'brand', color:'#B3320F',
 brief:'Một thương hiệu mỹ phẩm thuần chay nhỏ được lời mời hợp tác với một người nổi tiếng nhưng từng vướng tranh cãi về quảng cáo thực phẩm chức năng sai sự thật.',
 q:'Bạn quyết định thế nào?',
 opts:[
  {t:'Nhận ngay vì độ phủ lớn', why:'Phủ lớn không bù được rủi ro mất uy tín. Với thương hiệu sống bằng niềm tin “thuần chay, minh bạch”, một nhân vật vướng tranh cãi là mâu thuẫn trực tiếp.'},
  {t:'Từ chối và tìm người sáng tạo nhỏ có uy tín trong nhóm khách mục tiêu', why:'Đúng. Phù hợp giá trị thương hiệu và tệp khách quan tâm thành phần, rẻ hơn, và niềm tin cao hơn so với độ phủ rộng.', ok:true},
  {t:'Nhận nhưng yêu cầu giảm 50% phí hợp tác', why:'Giá không giải quyết rủi ro hình ảnh. Khi sự cố xảy ra, chi phí sửa chữa sẽ lớn hơn nhiều so với khoản giảm.'},
  {t:'Nhận và giấu thông tin hợp tác tới ngày ra mắt', why:'Che giấu không làm rủi ro biến mất; nó chỉ khiến khách thấy bị lừa khi biết. Không giải quyết mâu thuẫn giá trị.'}]},

{id:'ch-loyalty-3', kind:'Design the loyalty', d:'growth', color:'#1B4C8C',
 brief:'Quán cà phê có 1.200 khách quen. Chủ muốn làm chương trình tích điểm, ngân sách nhỏ. Dữ liệu: khách quen ghé trung bình 3 lần/tuần, chi 45k mỗi lần.',
 q:'Cơ chế nào hợp lý nhất?',
 opts:[
  {t:'Tích điểm đổi quà phức tạp theo 5 hạng thành viên', why:'Cơ chế phức tạp tốn vận hành và khách không nhớ. Với tần suất 3 lần/tuần, phần thưởng cần đến nhanh và đơn giản.'},
  {t:'Mua 8 ly tặng 1 ly, thẻ dán tem hoặc theo số điện thoại', why:'Đúng. Gần với nhịp ghé của khách (khoảng 3 tuần một ly miễn phí), dễ hiểu, thưởng nhanh, chi phí tương đương khoảng 11% doanh thu của người dùng đó.', ok:true},
  {t:'Giảm 10% cho mọi khách quen', why:'Tặng cho những người sẽ đến dù có hay không. Giảm doanh thu mà không thay đổi hành vi.'},
  {t:'Chỉ thưởng khi chi trên 500k mỗi tháng', why:'Ngưỡng cao với khách chi trung bình 540k nghĩa là gần như ai cũng được thưởng hoặc không ai; không tạo thêm hành vi mới.'}]},

{id:'ch-trend-3', kind:'Use the trend', d:'creative', color:'#7A2E8E',
 brief:'Một thương hiệu bảo hiểm muốn chạy theo một trend nhảy trên TikTok đang rất hot, nhưng không liên quan tới sản phẩm. Đội sáng tạo đang tranh luận.',
 q:'Bạn quyết định thế nào?',
 opts:[
  {t:'Nhảy theo ngay vì trend có thời hạn', why:'Nhảy cho có mặt thường không mang lại gì ngoài lượt xem của người không liên quan, và làm loãng hình ảnh thương hiệu.'},
  {t:'Bỏ qua mọi trend vì bảo hiểm là ngành nghiêm túc', why:'Quá cứng. Vấn đề không phải trend, mà là liên kết giữa trend và ý tưởng của thương hiệu.'},
  {t:'Chỉ dùng trend nếu nó giúp kể một insight thật của khách bảo hiểm, nếu không thì bỏ', why:'Đúng. Trend là hình thức, insight là nội dung. Không có insight thì dù viral cũng không giúp bán hay xây thương hiệu.', ok:true},
  {t:'Thuê người nổi tiếng nhảy để tăng độ phủ', why:'Tăng độ phủ cho một nội dung không có ý nghĩa là khuếch đại sự vô nghĩa. Chi phí cao, giá trị thấp.'}]},

{id:'ch-experiment-3', kind:'Design the test', d:'growth', color:'#1B4C8C',
 brief:'Cửa hàng thương mại điện tử muốn thử đổi giao diện trang sản phẩm. Lượng truy cập 2.000 lượt/ngày, tỷ lệ mua 2%. Đội muốn kết luận trong 3 ngày.',
 q:'Cách làm nào đúng?',
 opts:[
  {t:'Đổi giao diện cho toàn bộ khách rồi so sánh với tuần trước', why:'So sánh trước/sau bị nhiễu bởi mùa vụ, khuyến mãi và nguồn khách. Không biết thay đổi nào gây ra kết quả.'},
  {t:'Chạy A/B chia ngẫu nhiên 50/50, đặt trước chỉ số và thời lượng đủ mẫu, không kết luận sớm', why:'Đúng. Ở 2% tỷ lệ mua, 3 ngày có thể chưa đủ mẫu; nên tính cỡ mẫu trước, chạy trọn các ngày trong tuần và không dừng khi thấy “thắng”.', ok:true},
  {t:'Hỏi 10 khách xem họ thích bản nào', why:'Ý kiến hữu ích để sinh giả thuyết nhưng 10 người không đủ để quyết định, và lời nói khác với hành vi mua.'},
  {t:'Chờ kết quả 3 ngày, nếu bản mới hơn 10% thì thắng', why:'Ngưỡng tuỳ ý trên mẫu nhỏ dễ cho kết quả ngẫu nhiên. Cần tính ý nghĩa thống kê hoặc ít nhất khoảng dao động.'}]},

{id:'ch-story-3', kind:'Tell the story', d:'brand', color:'#B3320F',
 brief:'Một nhà sản xuất cà phê Tây Nguyên làm việc trực tiếp với 40 hộ nông dân, trả giá cao hơn thị trường 12%. Họ muốn kể điều này trên bao bì.',
 q:'Cách kể nào thuyết phục nhất?',
 opts:[
  {t:'“Cà phê vì cộng đồng, vì một Việt Nam tử tế”', why:'Khẩu hiệu đẹp nhưng không có gì để kiểm chứng; ai cũng nói được, nên ai cũng không tin.'},
  {t:'“Mỗi gói 500g, người trồng nhận thêm 18.000đ so với giá thị trường — hộ ông Tư, buôn Ea Tu”', why:'Đúng. Có con số, có người, có nơi chốn; khách có thể kiểm chứng và nhớ. Cụ thể là cách duy nhất để một câu chuyện có giá trị.', ok:true},
  {t:'Một video hoành tráng về núi rừng Tây Nguyên', why:'Đẹp nhưng không nói gì về điều thương hiệu làm khác; đây là hình ảnh của cả ngành, không phải của riêng họ.'},
  {t:'Liệt kê tất cả chứng nhận trên bao bì', why:'Chứng nhận có thể là bằng chứng, nhưng danh sách dài làm khách bỏ qua. Nên chọn một và nói cụ thể.'}]},

{id:'ch-pricing-2', kind:'Handle the discount', d:'strategy', color:'#4A3A2A',
 brief:'Đối thủ lớn giảm giá 25% trên toàn bộ sản phẩm tương tự của bạn trong dịp 11.11. Bạn có thương hiệu nhỏ, biên gộp 35%, khách quen đang hỏi vì sao không giảm.',
 q:'Bạn phản ứng thế nào?',
 opts:[
  {t:'Giảm 25% theo để không mất khách', why:'Biên gộp 35% giảm 25% còn lại rất mỏng; bạn chọn cuộc chơi nơi đối thủ có lợi thế quy mô. Thua trên chính sân của họ.'},
  {t:'Giữ giá, không làm gì', why:'An toàn về giá nhưng bỏ phí dịp mua sắm lớn nhất năm; khách quen không có lý do để ở lại.'},
  {t:'Giữ giá cho sản phẩm cốt lõi, tạo combo hoặc quà tặng có giá trị cho khách quen, và nhấn vào điều đối thủ không có', why:'Đúng. Phản ứng theo hướng khác biệt thay vì chạy đua giá: bảo vệ biên, thưởng cho khách trung thành, và đưa ra lý do chọn bạn không nằm ở giá.', ok:true},
  {t:'Tăng giá để khẳng định chất lượng', why:'Tăng giá đúng lúc đối thủ giảm 25% là tự tạo khoảng cách lớn nhất mà khách thấy được, không kèm lý do để họ trả thêm.'}]},
);

/* Đợt 4 — Khu Truyền thông (media): trước đây ngân hàng chưa có thử thách nào cho khu này. */
CHALLENGES.push(
{id:'ch-media-mix', kind:'Pick the media mix', d:'media', color:'#A8620B',
 brief:'Một tiệm bánh mì online sắp ra mắt ở TP.HCM, ngân sách 30 triệu trong 3 tuần đầu. Khách mục tiêu: người 18–30 tuổi sống và làm việc trong bán kính 3km quanh điểm giao.',
 q:'Bạn chia 30 triệu thế nào?',
 opts:[
  {t:'Dồn hết vào một video quảng cáo chạy rộng toàn thành phố', why:'Phủ cả thành phố khi chỉ giao được trong 3km là trả tiền cho người không mua được. Reach rộng nhưng gần như toàn lãng phí.'},
  {t:'60% quảng cáo định vị theo bán kính 3km, 30% mời nhóm KOC nhỏ ăn thử và kể lại, 10% giữ để nhắc lại người đã xem', why:'Đúng. Mỗi phần tiền có một việc: tạo biết đến đúng nơi, mượn lời kể của người thật, rồi chốt người đã quan tâm. Bán kính giao hàng quyết định tệp.', ok:true},
  {t:'Mời một KOL lớn đăng một bài', why:'Một lần phủ không kiểm soát, người theo dõi KOL phần lớn không ở trong bán kính giao hàng, và không có cách đo.'},
  {t:'Đăng bài PR trên báo mạng', why:'Báo mạng cho độ tin cậy nhưng ít chuyển ra đơn trong 3 tuần với một tiệm nhỏ; nên là việc sau khi đã có khách quen.'}]},

{id:'ch-media-frequency', kind:'Reach or frequency', d:'media', color:'#A8620B',
 brief:'Chiến dịch hai tuần cho một dịch vụ mới có thông điệp khá dài. Báo cáo: reach 40% nhóm mục tiêu nhưng tần suất trung bình chỉ 1,2 lần; tỉ lệ nhớ thông điệp 6%.',
 q:'Nên điều chỉnh thế nào?',
 opts:[
  {t:'Mở rộng thêm tệp để reach lên 60%', why:'Reach tăng nhưng mỗi người vẫn chỉ thấy khoảng một lần, nên thông điệp phức tạp vẫn không đọng lại.'},
  {t:'Đổi sang tệp hẹp hơn, tăng tần suất lên 3–4 lần cho nhóm cốt lõi và rút gọn thông điệp', why:'Đúng. Thông điệp mới và dài cần lặp lại; ngân sách cố định thì đổi bớt reach lấy tần suất ở nhóm đáng nhất.', ok:true},
  {t:'Giữ nguyên và chờ thêm một tuần', why:'Số liệu đã nói rõ vấn đề: nhìn ít và nhớ ít. Chờ thêm chỉ tốn tiền để lặp lại đúng chỗ yếu.'},
  {t:'Tăng ngân sách gấp đôi trên cùng tệp rộng', why:'Có thể tăng tần suất, nhưng giá để đạt 3–4 lần trên tệp rộng rất cao và phần lớn người không thuộc nhóm đáng nhắm.'}]},

{id:'ch-media-owned', kind:'Build owned media', d:'media', color:'#A8620B',
 brief:'Fanpage của một thương hiệu mỹ phẩm có 80.000 người theo dõi nhưng bài đăng chỉ tiếp cận khoảng 2% số đó. Chủ thương hiệu muốn một kênh ổn định hơn không phụ thuộc thuật toán.',
 q:'Kênh sở hữu nào nên xây trước?',
 opts:[
  {t:'Thêm một kênh mạng xã hội mới và đăng song song', why:'Vẫn là kênh đi thuê: tiếp cận do nền tảng quyết định, và bạn chia mỏng nội dung trên hai nơi.'},
  {t:'Danh sách liên hệ của người đã mua (Zalo OA, email) với nội dung nhắc mua lại và chăm sóc sau mua', why:'Đúng. Đây là tài sản bạn sở hữu: liên hệ trực tiếp, đo được, và rẻ hơn mua khách mới. Bắt đầu từ người đã mua vì họ có lý do đọc.', ok:true},
  {t:'Chạy quảng cáo để tăng thêm 50.000 lượt theo dõi', why:'Mua thêm người theo dõi vào đúng kênh đang bị hạn chế tiếp cận chỉ làm vấn đề lớn hơn.'},
  {t:'Bỏ fanpage và chuyển hết sang quảng cáo trả tiền', why:'Quảng cáo trả tiền hợp lý nhưng không thay được tài sản sở hữu; ngừng chi là biến mất, không còn gì tích luỹ.'}]},
);
