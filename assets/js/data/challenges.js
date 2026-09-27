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
