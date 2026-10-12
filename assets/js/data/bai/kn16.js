/* MODULE kn16 · Bước 5 Chọn kênh · TikTok: bảng đề xuất, độ dài đúng lời hứa, Spark Ads
   5 bài × 7 câu. Con số trong ví dụ là MINH HOẠ và tự khớp nhau.
   Nguồn chính thức đã đối chiếu ngày 2026-10-11 (có thể đã đổi — luôn kiểm lại):
   - TikTok Newsroom, “How TikTok recommends videos #ForYou” — https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you
     Nội dung dùng: ba nhóm yếu tố (tương tác của người dùng; thông tin video như chú thích, âm thanh, hashtag; thiết lập thiết bị và tài khoản
     với trọng số thấp hơn); tín hiệu được tính theo mức thể hiện quan tâm (xem hết một video dài có trọng số lớn hơn tín hiệu yếu);
     số người theo dõi và các video từng hiệu quả không phải yếu tố trực tiếp; bảng đề xuất tránh hai video liền nhau cùng âm thanh hoặc
     cùng người đăng, loại nội dung trùng lặp và đã xem; một số nội dung (đang xét duyệt, spam, nội dung nhạy cảm) không đủ điều kiện đề xuất.
   - TikTok Ads Help, “About Spark Ads” — https://ads.tiktok.com/resources/help/article/spark-ads?lang=en
     Nội dung dùng: Spark Ads quảng bá một bài đăng tự nhiên có sẵn; tương tác được tính cho bài đăng gốc; người sáng tạo cấp mã uỷ quyền
     với thời hạn do họ chọn (7, 30, 60 hoặc 365 ngày theo trang trợ giúp).
   Bài KHÔNG nêu “mẹo giờ đăng”, “số hashtag tối ưu” hay “trọng số %” vì không có nguồn chính thức. */
(() => {
  const K = 'abcd';
  const PAT = 'cabdbdcadbcaabdc'; let nQ = 0;
  const mcq = (stem, o, ans, w) => {
    const from = K.indexOf(ans), to = K.indexOf(PAT[nQ++ % PAT.length]);
    const mv = (arr) => { const c = arr.slice(), [x] = c.splice(from, 1); c.splice(to, 0, x); return c; };
    const oo = mv(o), ww = mv(w);
    return { type: 'mcq', stem, options: oo.map((t, i) => ({ k: K[i], t })), answer: K[to], why: Object.fromEntries(ww.map((x, i) => [K[i], x])) };
  };
  const calc = (stem, unit, ans, tol, wrong, steps) => ({ type: 'calc', stem, unit, ans, tol, wrong, errors: wrong.map((w) => w[1]), steps });

  BAI_ADD({ mod: 'kn16', lessons: [

/* ------------------------------------------------------------------ 01 */
{ id: 'B:kn16-01', skill: 'channel', read: '6 phút', t: 'Bảng đề xuất của TikTok đọc những gì — và bạn kiểm soát được phần nào?',
  situation: 'Một thương hiệu đồ ăn vặt có 800 người theo dõi trên TikTok. Họ đăng 12 video trong tháng, đa số dưới 1.000 lượt xem. Cô quản lý nói: “Thuật toán chê mình, chắc phải đổi giờ đăng và đổi cả điện thoại quay”. Chưa ai nhìn xem video có chú thích rõ ràng, âm thanh phù hợp hay lý do để người ta bấm xem hết.',
  concept: { name: 'Ba nhóm yếu tố và phần bạn kiểm soát',
    body: 'TikTok mô tả bảng đề xuất “Dành cho bạn” dựa trên ba nhóm yếu tố. <b>Tương tác của người dùng</b>: video họ thích hay chia sẻ, tài khoản họ theo dõi, bình luận họ đăng, nội dung họ tạo. <b>Thông tin video</b>: chú thích, âm thanh, hashtag. <b>Thiết lập thiết bị và tài khoản</b>: ngôn ngữ, quốc gia, loại thiết bị, với trọng số thấp hơn. Bạn đặt trực tiếp được phần <b>thông tin video</b>; tương tác thì chỉ tác động gián tiếp, bằng cách cho người xem <b>một lý do cụ thể để xem hết</b>: kết quả nói ngay ở giây đầu, hoặc một câu hỏi chỉ trả lời ở cuối. Thiết lập của người xem thì bạn không đổi được. Mô tả này có thể đã đổi; luôn kiểm lại.' },
  example: 'Đội viết một danh sách kiểm cho mỗi video: chú thích nói rõ video về gì và cho ai; âm thanh khớp nội dung; hashtag mô tả đúng chủ đề; và một lý do xem hết, ví dụ đặt kết quả ngay giây 3 (“nền sau 3 bước”), để dành cách làm cho phần cuối. Khi so lại 12 video, 5 video đạt danh sách kiểm trung bình 1.800 lượt, 7 video còn lại 600 (số minh hoạ). Chênh này mới là tín hiệu để lập giả thuyết, vì chủ đề, giờ đăng và độ dài hai nhóm không giống nhau. Muốn kiểm, họ quay khoảng 6 cặp video cùng chủ đề nhỏ, mỗi cặp đổi đúng một thứ, rồi so tỉ lệ xem hết; một cặp thì chưa đủ để kết luận.',
  takeaway: 'Tập trung vào phần bạn kiểm soát: thông tin video và lý do để người xem tương tác, không đổ cho thiết bị hay may rủi.',
  apply: 'Chọn một video gần đây của bạn. Nói trong 60 giây: chú thích, âm thanh, hashtag nói gì về nội dung và lý do nào khiến người ta xem hết.',
  mistakes: ['Đổi giờ đăng hay thiết bị quay rồi kỳ vọng bảng đề xuất đổi, mà bỏ qua nội dung và thông tin video.', 'Chạy theo hashtag không liên quan để “ké” lượt xem, làm thông tin video không còn mô tả đúng nội dung.'],
  q: [
    mcq('Đoán trước: trong những điều bảng đề xuất đọc, điều nào bạn đặt trực tiếp được khi đăng một video?',
      ['Chú thích nói rõ video về gì và dành cho ai', 'Loại điện thoại và ngôn ngữ cài đặt của người xem', 'Quốc gia nơi người xem đang sử dụng ứng dụng', 'Số lượt thích mà người xem sẽ bấm sau khi xem'], 'a',
      ['Đúng. Chú thích thuộc thông tin video, một phần bạn viết trực tiếp; tương tác thì chỉ tác động gián tiếp qua nội dung.', 'Thiết lập thiết bị và ngôn ngữ thuộc về người xem, bạn không đổi được và trọng số vốn thấp hơn.', 'Quốc gia là thiết lập của người xem; không phải thứ người làm nội dung điều khiển.', 'Lượt thích là phản ứng của người xem; bạn chỉ tác động gián tiếp bằng nội dung, không đặt trực tiếp được.']),
    mcq('Bạn làm gì với 12 video ít lượt xem của thương hiệu đồ ăn vặt?',
      ['Đổi giờ đăng và đổi điện thoại quay vì cô quản lý cho rằng đó là nguyên nhân chính của việc ít người xem', 'Xem chú thích, âm thanh, hashtag và lý do xem hết rồi so nhóm tốt và nhóm yếu', 'Ngừng đăng một tháng để thuật toán “quên” những video cũ', 'Đăng gấp ba số video mỗi ngày cho chắc thế nào cũng có video lên'], 'b',
      ['Đổi điều ngoài tầm kiểm soát nội dung khi chưa kiểm các yếu tố bạn điều khiển được.', 'Đúng. Bắt đầu từ phần bạn kiểm soát và so các video với nhau.', 'Ngừng đăng không cho thêm thông tin nào để cải thiện.', 'Đăng nhiều hơn không sửa việc nội dung và thông tin video chưa tốt.']),
    calc('Trong 12 video, 5 video có chú thích rõ ràng trung bình 1.800 lượt xem và 7 video còn lại trung bình 600 lượt xem. Trung bình mỗi video trong cả 12 video có bao nhiêu lượt xem?', 'lượt', 1100, 1,
      [[1200, 'SAI_TINH_TOAN'], [13200, 'NHAM_SO_TUYET_DOI']],
      ['Tổng lượt xem = 5 × 1.800 + 7 × 600 = 9.000 + 4.200 = 13.200.', 'Trung bình = 13.200 ÷ 12 = <b>1.100 lượt</b>.']),
    mcq('Một người nói “chỉ cần hashtag thật nhiều thì video sẽ lên”. Bạn nên đáp thế nào?',
      ['Đồng ý, vì hashtag nhiều nghĩa là thông tin video phong phú hơn', 'Chưa chắc; hashtag chỉ hữu ích khi mô tả đúng điều video nói', 'Không đồng ý vì hashtag chẳng giúp gì nhiều, nên bỏ hẳn khỏi video', 'Chỉ cần dùng đúng một hashtag duy nhất cho mọi video của kênh'], 'b',
      ['Nhiều hashtag không đồng nghĩa với thông tin đúng; nguồn chính thức không nói vậy.', 'Đúng. Thông tin video có ích khi mô tả đúng điều video nói.', 'Hashtag là một phần của thông tin video; bỏ hẳn là mất thông tin mô tả.', 'Một hashtag cho mọi video là cứng nhắc và không mô tả đúng từng video.']),
    mcq('Thay đổi nào trong nội dung có khả năng nhất tác động gián tiếp tới nhóm “tương tác của người dùng”?',
      ['Đổi sang điện thoại có camera tốt hơn và quay ở độ phân giải cao nhất', 'Thêm lý do cụ thể để người xem xem hết, gửi cho bạn hoặc bình luận', 'Đổi giờ đăng sang buổi tối vì cho rằng giờ đó đông người xem nhất', 'Đổi tên tài khoản sang một tên dài hơn và dễ nhớ hơn'], 'b',
      ['Chất lượng máy quay không phải một lý do tương tác chính.', 'Đúng. Lý do để xem, gửi, bình luận chính là tương tác của người dùng.', 'Nguồn chính thức không nêu giờ đăng là yếu tố; đây là suy đoán chưa được kiểm.', 'Tên tài khoản dài hơn không tạo thêm tương tác với video.']),
    mcq('Điều nào mô tả đúng giá trị của việc đọc mô tả chính thức của TikTok về đề xuất?',
      ['Cho bạn khung tách điều kiểm soát được khỏi điều không, rồi vẫn phải đo kênh', 'Cho bạn công thức khá chắc để phần lớn video đăng lên được đề xuất rộng', 'Thay thế hoàn toàn việc phải thử và đo số liệu từ chính kênh của mình', 'Cho biết con số cụ thể về giờ đăng và số hashtag được xem là tốt nhất'], 'a',
      ['Đúng. Mô tả cho khung để nghĩ; dữ liệu của kênh mới cho biết điều gì thật sự hiệu quả.', 'Mô tả chính thức không đưa công thức nào, kể cả công thức khá chắc.', 'Vẫn phải thử và đo; mô tả không thay được dữ liệu kênh.', 'Mô tả chính thức không nêu giờ đăng hay số hashtag tốt nhất.']),
    mcq('Hai video cùng chủ đề: một cái có chú thích rõ ràng, một cái không có. Nên làm gì để biết chú thích có tác dụng?',
      ['Kết luận ngay chú thích rõ ràng giúp được, vì video đó nhiều lượt xem hơn', 'Quay vài cặp video khác chủ đề nhỏ, mỗi cặp chỉ đổi chú thích, rồi so tỉ lệ xem hết', 'Hỏi bạn bè kiểu chú thích nào nghe hay hơn rồi chọn kiểu đó', 'Đổi cả chú thích, âm thanh và hashtag cùng lúc để thấy khác biệt rõ nhất'], 'b',
      ['Hai video khác nhau ở nhiều thứ khác (chủ đề, giờ, người xem); lượt xem cao hơn chưa chứng minh chú thích là nguyên nhân.', 'Đúng. Đổi một biến, lặp trên nhiều cặp, so trên chỉ số đúng việc; một cặp duy nhất mới là n=1.', 'Ý kiến vài người không thay được hành vi của người xem.', 'Đổi nhiều biến không cho biết cái nào có tác dụng.']),
  ] },

/* ------------------------------------------------------------------ 02 */
{ id: 'B:kn16-02', skill: 'creative', read: '6 phút', t: 'Xem hết một video dài là tín hiệu mạnh: độ dài phải đúng với lời hứa',
  situation: 'Một kênh hướng dẫn trang điểm đăng hai video. Video A dài 45 giây “3 bước nền mỏng nhẹ”, 10.000 lượt xem, 5.200 lượt xem hết. Video B dài 2 phút 10 giây cùng chủ đề nhưng nói dông dài, 10.000 lượt xem, 1.500 lượt xem hết. Biên tập viên nghĩ: “video dài thì nền tảng chắc thích hơn, cứ kéo dài”.',
  concept: { name: 'Xem hết đúng độ dài lời hứa',
    body: 'TikTok mô tả rằng các tín hiệu được tính theo mức độ chúng thể hiện sự quan tâm, và nêu ví dụ: <b>xem hết một video dài</b> là tín hiệu mạnh, có trọng số lớn hơn một tín hiệu yếu như người xem và người đăng cùng một quốc gia. Điều này không có nghĩa “video càng dài càng tốt”. Nó nghĩa là việc người ta <b>xem hết</b> mới là tín hiệu mạnh, nên độ dài phải vừa đủ để lời hứa được thực hiện và người xem muốn xem tới cuối. Kéo dài cho có thể làm giảm đúng tín hiệu bạn cần.' },
  example: 'Tỉ lệ xem hết: video A 5.200 ÷ 10.000 = 52%; video B 1.500 ÷ 10.000 = 15%. Video ngắn có người xem hết gấp hơn ba lần. Biên tập viên cắt video B xuống còn khoảng một phút, bỏ phần dẫn dài, và chuyển kết quả “trước – sau” lên đầu. Bản mới có 40% xem hết. Họ ghi nguyên tắc: độ dài đi theo lời hứa của video, không theo cảm giác “dài thì sang”.',
  takeaway: 'Đừng kéo dài video để “đủ dài”; hãy làm cho người xem muốn xem hết một video vừa đủ cho lời hứa.',
  apply: 'Chọn một video của bạn. Nói trong 60 giây: lời hứa của video là gì, nó cần bao nhiêu giây để thực hiện, và tỉ lệ xem hết hiện là bao nhiêu.',
  mistakes: ['Hiểu “xem hết video dài là tín hiệu mạnh” thành “làm video thật dài”.', 'Nhồi phần dẫn và lặp ý để đủ thời lượng, làm người xem rời đi giữa chừng.'],
  q: [
    mcq('Đoán trước: video 45 giây có 52% xem hết, video 2 phút 10 giây có 15% xem hết. Điều nào nhiều khả năng đúng?',
      ['Video dài hơn tốt hơn vì thời lượng của nó lớn hơn', 'Video ngắn đang giữ lời hứa tốt hơn nên nhiều người xem hết hơn', 'Hai video như nhau vì cùng chủ đề và cùng số lượt xem, nên không có gì để học', 'Video ngắn luôn tốt hơn video dài ở mọi chủ đề'], 'b',
      ['Độ dài không tự là lợi thế; xem hết mới là tín hiệu mạnh.', 'Đúng. Phần trăm xem hết cho thấy người xem có theo tới cuối hay không.', 'Cùng chủ đề và lượt xem nhưng tỉ lệ xem hết rất khác.', 'Không có quy luật ngắn luôn tốt hơn; tuỳ lời hứa.']),
    mcq('Bạn làm gì với video 2 phút 10 giây chỉ có 15% xem hết?',
      ['Giữ nguyên và đăng thêm nhiều video dài hơn nữa để người xem quen dần với kiểu dài', 'Rút còn vừa đủ lời hứa, đưa kết quả lên đầu, bỏ phần dẫn dài', 'Xoá video rồi đăng lại y nguyên vào giờ khác trong ngày', 'Thêm nhạc dài hơn để người xem ở lại nghe hết bài hát'], 'b',
      ['Dài hơn khi người xem đã bỏ giữa chừng là đi ngược lại vấn đề.', 'Đúng. Giữ đúng lời hứa, rút phần thừa để người xem muốn xem hết.', 'Đăng lại y nguyên không sửa điều khiến người xem rời đi.', 'Nhạc dài không giữ người xem ở lại khi nội dung dông dài.']),
    calc('Video A có 10.000 lượt xem và 5.200 lượt xem hết. Tỉ lệ xem hết là bao nhiêu phần trăm?', '%', 52, 0.1,
      [[192.3, 'SAI_MAU_SO'], [5.2, 'SAI_TINH_TOAN']],
      ['Tỉ lệ xem hết = lượt xem hết ÷ lượt xem.', '5.200 ÷ 10.000 = 0,52 = <b>52%</b>.']),
    mcq('Video B tăng tỉ lệ xem hết từ 15% lên 40%. Cách nói đúng về mức thay đổi là gì?',
      ['Tăng 25%, vì 40 trừ 15 bằng 25 nên mức tăng chính là 25% so với mức cũ', 'Tăng 25 điểm phần trăm, tức gấp khoảng 2,7 lần mức cũ', 'Tăng 267%, vì lấy 40 chia 15 rồi nhân với 100', 'Tăng 40%, vì đó là mức mới đạt được sau khi sửa'], 'b',
      ['Hiệu hai tỉ lệ là điểm phần trăm, không phải phần trăm tăng.', 'Đúng. 40 − 15 = 25 điểm; 40 ÷ 15 ≈ 2,7 lần, tức tăng khoảng 167%.', '40 ÷ 15 ≈ 2,67 là tỉ số; mức tăng là khoảng 167%.', '40% là mức mới, không phải mức tăng.']),
    mcq('Một người nói “TikTok thích video dài nên cứ kéo dài video lên”. Điều chỉnh nào đúng nhất cho câu này?',
      ['Đúng hoàn toàn, vì dài hơn luôn đem lại tín hiệu mạnh hơn', 'Xem hết một video dài là tín hiệu mạnh', 'Sai hoàn toàn, vì độ dài không có liên quan gì tới đề xuất', 'Chỉ đúng với video của các tài khoản trên một triệu người theo dõi'], 'b',
      ['Dài mà không xem hết thì không tạo tín hiệu mạnh.', 'Đúng. Chính việc xem hết mới là tín hiệu; độ dài chỉ có ích khi nội dung giữ được người.', 'Mô tả chính thức nêu rõ xem hết video dài là tín hiệu mạnh.', 'Mô tả chính thức không phân biệt theo quy mô tài khoản.']),
    mcq('Điều nào giúp quyết định độ dài của một video đúng nhất?',
      ['Chọn độ dài cố định cho mọi video để tạo thói quen', 'Chọn độ dài vừa đủ để thực hiện lời hứa của video và giữ người xem', 'Chọn độ dài dài nhất có thể trong giới hạn của nền tảng', 'Chọn độ dài giống video đang nổi nhất tuần này'], 'b',
      ['Độ dài cố định bỏ qua việc mỗi lời hứa cần thời gian khác nhau.', 'Đúng. Độ dài theo lời hứa và theo dữ liệu giữ chân.', 'Dài nhất có thể thường làm người xem rời đi.', 'Theo video khác bỏ qua lời hứa riêng của bạn.']),
    mcq('Để biết rút ngắn có tác dụng, bạn nên so điều gì?',
      ['Tổng lượt xem trước và sau khi rút ngắn trong cùng một ngày', 'Tỉ lệ xem hết của bản cũ và bản mới ở cùng điều kiện đăng', 'Số lượt thích của bản mới với bản cũ của một video khác', 'Số hashtag đã dùng trong bản mới và bản cũ'], 'b',
      ['Tổng lượt xem bị ảnh hưởng nhiều thứ khác ngoài việc rút ngắn.', 'Đúng. Tỉ lệ xem hết là chỉ số đúng việc cho thay đổi này.', 'So với video khác không kiểm soát được các khác biệt.', 'Số hashtag không đo việc người xem có xem hết không.']),
  ] },

/* ------------------------------------------------------------------ 03 */
{ id: 'B:kn16-03', skill: 'channel', read: '6 phút', t: 'Tài khoản nhỏ có được đề xuất không? Số người theo dõi không phải yếu tố trực tiếp',
  situation: 'Một cửa hàng gốm thủ công mới lập tài khoản TikTok, chỉ có 120 người theo dõi. Chủ cửa hàng nói: “Mình chưa có người theo dõi nên đăng cũng không ai thấy, chờ lên 10.000 người rồi mới đầu tư video”. Ba tháng trôi qua, cửa hàng đăng 4 video nhẹ nhàng và vẫn ở nguyên 120 người theo dõi.',
  concept: { name: 'Mỗi video được xét bằng tín hiệu của chính nó',
    body: 'TikTok nêu rõ rằng <b>số người theo dõi</b> và <b>các video từng hiệu quả</b> không phải là yếu tố trực tiếp cho đề xuất. Điều đó không có nghĩa tài khoản lớn không có lợi thế: tài khoản nổi tiếng có thể vẫn nhận nhiều lượt xem. Nó chỉ nghĩa là bạn không cần chờ “đủ người theo dõi” mới làm video tốt. Mỗi video nên được làm như một cơ hội riêng: có chú thích rõ, có lý do xem hết, có lý do tương tác, rồi đo kết quả của chính video đó. Chờ đợi là lựa chọn chắc chắn nhất để không có tín hiệu nào.' },
  example: 'Cửa hàng gốm đổi cách làm: mỗi tuần quay 3 video ngắn theo một lời hứa rõ, như “cách nhận biết men gốm thật”. Họ đo từng video theo ba con số: lượt xem, tỉ lệ xem hết, số lượt chia sẻ. Sau 6 tuần, một video về “cách chọn bát ăn cơm không bị bỏng tay” có tỉ lệ xem hết cao gần gấp ba các video còn lại và được gửi nhiều. Họ không chờ đủ người theo dõi; họ làm nhiều hơn các video có cùng kiểu lời hứa đó.',
  takeaway: 'Đừng chờ đủ người theo dõi; mỗi video là một cơ hội riêng, làm và đo từng video.',
  apply: 'Chọn một video gần đây ít người theo dõi nhất của bạn. Nói trong 60 giây: lời hứa của nó, lý do để xem hết và cách bạn sẽ đo nó.',
  mistakes: ['Hoãn đầu tư vào video cho tới khi “đủ người theo dõi”, nên không bao giờ có tín hiệu để học.', 'Hiểu “follower không phải yếu tố trực tiếp” thành “follower không bao giờ có ích”.'],
  q: [
    mcq('Đoán trước: theo mô tả chính thức của TikTok, số người theo dõi có phải yếu tố trực tiếp cho đề xuất không?',
      ['Có, đây là yếu tố trực tiếp và quan trọng nhất', 'Không phải yếu tố trực tiếp, dù tài khoản lớn vẫn có thể có lợi thế khác', 'Có, nhưng chỉ khi tài khoản có hơn 10.000 người theo dõi và đã đăng ít nhất 30 video', 'Không, và tài khoản lớn không có bất kỳ lợi thế nào'], 'b',
      ['Mô tả chính thức nói không phải yếu tố trực tiếp.', 'Đúng. TikTok nói số người theo dõi không phải yếu tố trực tiếp, dù tài khoản lớn vẫn có thể có nhiều lượt xem.', 'Mô tả không nêu ngưỡng 10.000.', 'Mô tả không phủ nhận mọi lợi thế của tài khoản lớn.']),
    mcq('Bạn làm gì với kế hoạch “chờ đủ 10.000 người rồi mới đầu tư video”?',
      ['Giữ nguyên kế hoạch vì chưa đủ người thì đăng cũng uổng công', 'Bắt đầu làm video có lời hứa rõ ngay và đo từng video để học', 'Mua người theo dõi để nhanh chóng đạt đủ 10.000', 'Dừng dùng TikTok vì tài khoản nhỏ không có cơ hội'], 'b',
      ['Chờ đợi không tạo ra tín hiệu nào để học.', 'Đúng. Mỗi video là một cơ hội riêng để thử lời hứa và đo kết quả.', 'Mua người theo dõi không tạo ra tương tác thật và có thể vi phạm quy định.', 'Mô tả chính thức không nói tài khoản nhỏ không có cơ hội.']),
    calc('Một video có 3.000 lượt xem và 1.350 lượt xem hết. Tỉ lệ xem hết là bao nhiêu phần trăm?', '%', 45, 0.1,
      [[222.2, 'SAI_MAU_SO'], [4.5, 'SAI_TINH_TOAN']],
      ['Tỉ lệ xem hết = lượt xem hết ÷ lượt xem.', '1.350 ÷ 3.000 = 0,45 = <b>45%</b>.']),
    mcq('Điều nào là cách đánh giá một video đúng với tinh thần “mỗi video xét bằng tín hiệu của chính nó”?',
      ['Đánh giá bằng tổng số người theo dõi của tài khoản', 'Đánh giá bằng tỉ lệ xem hết, chia sẻ và lượt xem của chính video đó', 'Đánh giá bằng số video đã đăng của cả tháng trước', 'Đánh giá bằng việc đối thủ lớn có đăng cùng chủ đề trong cùng tuần hay không'], 'b',
      ['Số người theo dõi không phải thước đo của một video.', 'Đúng. Chỉ số của chính video cho biết video đó làm đúng việc hay không.', 'Số video đã đăng đo công sức chứ không đo kết quả.', 'Đối thủ đăng gì không đánh giá được video của bạn.']),
    mcq('Một video của tài khoản nhỏ bất ngờ có tỉ lệ xem hết cao. Bạn nên làm gì tiếp?',
      ['Coi đó là may mắn và quay lại cách làm cũ', 'Làm thêm video cùng kiểu lời hứa rồi so lại các chỉ số', 'Đổi hoàn toàn chủ đề để thử một hướng mới', 'Xoá video vì kết quả bất thường rất khó lặp lại và có thể làm sai lệch số liệu kênh'], 'b',
      ['Bỏ qua tín hiệu tốt là mất cơ hội học.', 'Đúng. Lặp lại kiểu lời hứa đã có tín hiệu tốt để kiểm tra có phải mẫu ổn định.', 'Đổi hoàn toàn chủ đề bỏ đi điều đang hiệu quả.', 'Xoá một video tốt không giúp ích gì.']),
    mcq('Điều nào đúng về việc tài khoản lớn nhận nhiều lượt xem?',
      ['Điều đó chứng minh số người theo dõi là yếu tố trực tiếp và duy nhất của đề xuất', 'Tài khoản nổi tiếng vẫn có thể nhận nhiều lượt xem, nhưng không có nghĩa là yếu tố trực tiếp', 'Điều đó chỉ xảy ra vì tài khoản lớn đăng nhiều video hơn', 'Điều đó cho thấy tài khoản nhỏ không nên đăng video'], 'b',
      ['Mô tả chính thức vẫn nói không phải yếu tố trực tiếp.', 'Đúng. TikTok thừa nhận tài khoản phổ biến vẫn có thể có nhiều lượt xem mà không coi đó là yếu tố trực tiếp.', 'Không có dữ liệu chứng minh lý do này.', 'Kết luận đó không theo từ một quan sát về tài khoản lớn.']),
    mcq('Chọn câu mô tả đúng cách một tài khoản mới nên bắt đầu.',
      ['Đăng thật nhiều video giống hệt nhau cho đến khi một video lên', 'Làm vài video với lời hứa khác nhau, đo từng video rồi lặp lại điều có tín hiệu tốt', 'Chờ ít nhất 10.000 người theo dõi từ nguồn khác rồi mới bắt đầu làm video chính thức cho kênh', 'Sao chép nguyên video đang nổi của đối thủ để giữ an toàn'], 'b',
      ['Giống hệt nhau không cho thông tin về điều gì tốt hơn.', 'Đúng. Thử, đo và lặp lại điều có tín hiệu là vòng học thực tế.', 'Chờ đợi không tạo ra tín hiệu.', 'Sao chép nguyên video có thể vi phạm quy định và không có lời hứa riêng.']),
  ] },

/* ------------------------------------------------------------------ 04 */
{ id: 'B:kn16-04', skill: 'creative', read: '6 phút', t: 'Đăng cùng một âm thanh, cùng một kiểu mỗi ngày: vì sao không giúp bảng đề xuất',
  situation: 'Một thương hiệu sữa hạt đăng 5 video mỗi ngày trong một tuần, cả 5 dùng cùng một âm thanh đang thịnh hành và cùng một cảnh mở đầu “mở nắp hộp”. Hai ngày đầu có 3.000 lượt xem mỗi video, ba ngày sau chỉ còn 600–800. Đội cho rằng “chắc bị hệ thống phạt vì đăng nhiều”; chưa ai nghĩ tới việc âm thanh đang thịnh hành có thể đã nguội dần.',
  concept: { name: 'Bảng đề xuất tìm sự đa dạng',
    body: 'TikTok mô tả rằng bảng “Dành cho bạn” thường tránh cho người xem thấy <b>hai video liền nhau cùng âm thanh hoặc cùng người đăng</b>, loại nội dung <b>trùng lặp</b> và nội dung đã xem, và cố ý đưa vào một số video ngoài sở thích để tạo đa dạng. Khi lượt xem tụt sau chuỗi video giống nhau có ít nhất ba cách giải thích: bảng đề xuất tránh lặp, âm thanh thịnh hành đã nguội, hoặc người xem mệt vì thấy cùng một thứ. Mô tả chính thức chỉ nhắc tới cách đầu, và dù vậy đó vẫn là suy luận, không phải “hình phạt” được xác nhận. Cách làm chung cho cả ba: mỗi video một <b>lời hứa, cảnh mở và góc nhìn khác</b> dù cùng chủ đề; muốn biết nguyên nhân nào, đổi từng biến một.' },
  example: 'Đội đổi cách làm: 5 video tuần sau có 5 lời hứa khác nhau (“3 cách uống sữa hạt buổi sáng”, “so sánh sữa hạt và sữa bò”, “khách hàng nói gì”, “cách làm sữa hạt tại nhà”, “sữa hạt có đường không?”), dùng hai âm thanh khác nhau và mở cảnh khác nhau. Lượt xem trung bình mỗi video từ 700 lên 2.100 (số minh hoạ). Vì đổi cùng lúc lời hứa, âm thanh, cảnh mở, không thể nói riêng “đa dạng” tạo ra mức tăng. Điều học được: tỉ lệ xem hết giữa các video giờ có khác biệt để so, rồi ở vòng sau đổi từng biến một.',
  takeaway: 'Mỗi video một lời hứa và một cảnh mở khác nhau; đăng bản sao chỉ làm người xem và hệ thống thấy lặp.',
  apply: 'Nhìn 5 video gần nhất của bạn. Nói trong 60 giây: mỗi video hứa điều gì, và có video nào lặp âm thanh hay cảnh mở với video khác không.',
  mistakes: ['Đăng nhiều video cùng âm thanh và cảnh mở rồi kết luận “bị phạt vì đăng nhiều”.', 'Đăng lại nội dung trùng lặp để lấy số lượng thay vì làm một lời hứa mới.'],
  q: [
    mcq('Đoán trước: theo mô tả chính thức, bảng đề xuất thường tránh điều gì khi xếp hai video liền nhau?',
      ['Hai video do cùng người đăng hoặc dùng cùng một âm thanh', 'Hai video cùng chủ đề dù do hai tài khoản khác nhau đăng', 'Hai video có cùng độ dài vì người xem dễ chán khi nhịp giống nhau', 'Hai video của hai thương hiệu đang cạnh tranh trực tiếp với nhau'], 'a',
      ['Đúng. Đây là mô tả về sự đa dạng trong bảng đề xuất.', 'Mô tả chỉ nói về người đăng và âm thanh, không nói tránh cùng chủ đề.', 'Mô tả chính thức không nêu độ dài là tiêu chí tránh lặp.', 'Mô tả không nói gì về việc tránh thương hiệu cạnh tranh.']),
    mcq('Bạn làm gì với kế hoạch 5 video mỗi ngày cùng một âm thanh?',
      ['Giữ nguyên, vì số lượng nhiều là cách chắc chắn để có video lên', 'Làm mỗi video một lời hứa, một cảnh mở và góc nhìn khác nhau', 'Đăng cả 5 video cùng một lúc để người xem thấy hết một lượt', 'Dừng đăng vì hệ thống đã phạt kênh và không thể sửa'], 'b',
      ['Nhiều video giống nhau làm vấn đề trùng lặp tệ hơn.', 'Đúng. Dù nguyên nhân là tránh lặp, âm thanh nguội hay người xem mệt, mỗi video có lời hứa và cảnh mở riêng đều xử lý được cả ba và cho dữ liệu để so.', 'Đăng cùng lúc không giải quyết việc các video giống nhau.', 'Chưa có bằng chứng bị “phạt”; sửa cách làm là việc có thể làm.']),
    calc('Tuần trước cả 5 video đều xem hết khoảng 25% nên không so được. Tuần này 5 video có tỉ lệ xem hết 22%, 41%, 19%, 30%, 28%, và video “so sánh” đạt 41%. Video đó cao hơn mức trung bình của 4 video còn lại bao nhiêu điểm phần trăm?', 'điểm %', 16.25, 0.1,
      [[13, 'SAI_MAU_SO'], [65.7, 'NHAM_DIEM_PHAN_TRAM']],
      ['4 video còn lại: 22 + 19 + 30 + 28 = 99; trung bình = 99 ÷ 4 = 24,75%.', 'Chênh = 41 − 24,75 = <b>16,25 điểm phần trăm</b>. (Trừ cho mức 28% của cả 5 video, tính cả chính nó, là sai nhóm đối chiếu; 16,25 ÷ 24,75 ≈ 66% là mức tương đối, không phải điểm.)']),
    mcq('Điều nào đúng về nhận định “đăng nhiều bị hệ thống phạt”?',
      ['Đó là sự thật chính thức đã được TikTok xác nhận', 'Đó là suy đoán; mô tả chính thức nói về tính đa dạng, không nói về hình phạt vì đăng nhiều', 'Đó là sự thật nhưng chỉ với tài khoản thương hiệu', 'Đó là sự thật chính thức nhưng chỉ xảy ra khi đăng quá nhiều video vào ban đêm'], 'b',
      ['Mô tả chính thức không xác nhận hình phạt như vậy.', 'Đúng. Hãy chỉ dựa vào điều nguồn chính thức nói và dữ liệu của chính kênh.', 'Không có phân biệt như vậy trong mô tả chính thức.', 'Không có điều kiện về ban đêm trong mô tả chính thức.']),
    mcq('Một đồng nghiệp muốn đăng lại một video cũ y nguyên vì “nó từng có nhiều lượt xem”. Bạn nên nói gì?',
      ['Đồng ý, vì video từng tốt thì đăng lại sẽ tốt tương tự', 'Nên làm bản mới có góc nhìn hoặc lời hứa khác', 'Không bao giờ đăng lại bất kỳ chủ đề nào đã từng đăng', 'Đăng lại nhưng đổi thời gian đăng sang đúng giờ cũ'], 'b',
      ['Đăng y nguyên không đem thông tin mới, và người đã xem video đó khó thấy lại; đây là suy luận từ mô tả về tránh nội dung trùng lặp và đã xem, không phải quy tắc được xác nhận về video cũ của chính bạn.', 'Đúng. Làm bản mới với góc nhìn khác tận dụng chủ đề mà không trùng lặp.', 'Chủ đề đã từng đăng vẫn có thể làm lại với lời hứa khác.', 'Đổi giờ không đổi việc nội dung trùng lặp.']),
    mcq('Muốn biết đổi cảnh mở có tác dụng không, bạn nên làm gì?',
      ['Đổi cảnh mở, âm thanh, chú thích và độ dài cùng một lúc', 'Giữ nguyên nội dung và chỉ đổi cảnh mở ở hai bản, so tỉ lệ xem hết', 'Hỏi bạn bè cảnh mở nào đẹp hơn rồi áp dụng luôn', 'So lượt xem của bản mới với bản cũ đã đăng từ tháng trước rồi kết luận luôn'], 'b',
      ['Đổi nhiều biến làm không biết cái nào có tác dụng.', 'Đúng. Một biến, một chỉ số đúng việc.', 'Ý kiến vài người không thay được hành vi của người xem thật.', 'So ở thời điểm khác trộn nhiều yếu tố vào kết quả.']),
    mcq('Điều nào là lợi ích chính của việc mỗi video có một lời hứa khác nhau?',
      ['Giúp bạn so được video nào làm việc gì và học từ khác biệt', 'Giúp mỗi video có khoảng trống riêng nên được đề xuất đủ lượt xem', 'Giúp đăng nhiều video hơn mà không cần nghĩ thêm ý tưởng mới', 'Giúp bỏ bớt việc đo vì khác biệt tự cho biết video nào tốt'], 'a',
      ['Đúng. Khác biệt có kiểm soát mới cho dữ liệu để học.', 'Không có đảm bảo về lượt đề xuất; khác biệt chỉ giúp video không bị coi là lặp.', 'Làm mỗi video khác nhau đòi hỏi nghĩ ý tưởng, không ít hơn.', 'Vẫn phải đo; khác biệt chỉ làm số đo có ý nghĩa hơn.']),
  ] },

/* ------------------------------------------------------------------ 05 */
{ id: 'B:kn16-05', skill: 'channel', read: '7 phút', t: 'Spark Ads: biến video tự nhiên đã giữ được người xem thành quảng cáo',
  situation: 'Một thương hiệu dụng cụ nhà bếp có hai video: một video tự nhiên về “xào không dính chảo” có 40.000 lượt xem và 48% xem hết, và một video quảng cáo dựng riêng trong studio chạy quảng cáo 10 triệu đồng với 20.000 lượt xem, 14% xem hết, 25 đơn. Một creator cũng có video đánh giá nồi chiên với 120.000 lượt xem. Đội chưa biết nên đẩy video nào bằng quảng cáo.',
  concept: { name: 'Chọn bài đã chứng minh, rồi đẩy bằng Spark Ads',
    body: 'Theo trang trợ giúp của TikTok, <b>Spark Ads</b> là định dạng quảng cáo cho phép quảng bá một bài đăng tự nhiên có sẵn, và tương tác từ quảng cáo được tính cho bài đăng gốc. Nếu bài đăng là của creator, họ cấp cho nhà quảng cáo một <b>mã uỷ quyền</b> với thời hạn do họ chọn. Cách dùng hợp lý là <b>chọn bài đã giữ được người xem</b> (xem hết, chia sẻ, bình luận tốt), rồi dùng ngân sách quảng cáo để đưa nó tới người đúng nhóm. Đo bằng chi phí trên mỗi hành động mong muốn và so với quảng cáo dựng riêng, không chỉ bằng lượt xem. Kiểm lại điều kiện hiện hành trong Ads Manager.' },
  example: 'Họ chạy Spark Ads với video tự nhiên 48% xem hết, ngân sách 10 triệu đồng, được 36 đơn. Video studio cùng ngân sách có 25 đơn. CPA: Spark Ads 10.000.000 ÷ 36 ≈ 277.800đ; video studio 10.000.000 ÷ 25 = 400.000đ. Thấp hơn khoảng 30%. Họ xin mã uỷ quyền 30 ngày cho video của creator, và chạy thử cùng ngân sách để so lại CPA, thay vì chọn theo cảm giác.',
  takeaway: 'Chọn bài tự nhiên đã giữ được người xem để đẩy bằng Spark Ads, và so CPA với quảng cáo dựng riêng.',
  apply: 'Chọn hai video của bạn. Nói trong 60 giây: video nào đã giữ được người xem, bạn sẽ đẩy nó thế nào và đo CPA ra sao.',
  mistakes: ['Đẩy quảng cáo vào video chưa giữ được người xem tự nhiên rồi mong tiền sẽ “cứu” nó.', 'So các video chỉ bằng lượt xem, bỏ qua chi phí cho mỗi đơn.'],
  q: [
    mcq('Đoán trước: giữa video tự nhiên 48% xem hết và video studio 14% xem hết, bạn nên chọn video nào để thử Spark Ads?',
      ['Video studio vì được dựng công phu hơn', 'Video tự nhiên đã giữ được người xem tốt hơn', 'Cả hai chia đều ngân sách vì không có cơ sở chọn', 'Không video nào vì Spark Ads chỉ dùng cho video của creator'], 'b',
      ['Dựng công phu không bảo đảm giữ người xem; số liệu nói điều khác.', 'Đúng. Bài đã giữ được người xem là ứng viên tốt để đẩy bằng quảng cáo.', 'Có cơ sở chọn: tỉ lệ xem hết chênh lệch lớn.', 'Spark Ads có thể dùng bài đăng của chính tài khoản bạn.']),
    mcq('Bạn làm gì để kiểm tra Spark Ads có đáng đầu tư hơn quảng cáo dựng riêng?',
      ['Chạy Spark Ads với ngân sách cao hơn nhiều để thấy rõ tác dụng', 'Chạy cùng ngân sách, cùng mục tiêu và thời gian', 'So lượt xem của hai quảng cáo ngay sau một ngày chạy', 'Chọn bên nào đội thích hơn rồi dừng quảng cáo còn lại'], 'b',
      ['Ngân sách khác nhau làm không so được tác dụng thật.', 'Đúng. Cùng điều kiện, so chi phí trên mỗi hành động mong muốn.', 'Lượt xem sau một ngày chưa nói về đơn hay CPA.', 'Chọn theo ý thích bỏ qua dữ liệu.']),
    calc('Spark Ads chi 10.000.000đ và có 36 đơn. CPA khoảng bao nhiêu đồng mỗi đơn (làm tròn đến nghìn)?', 'đồng', 278000, 1000,
      [[3600000, 'NHAM_CTR_CVR'], [360000, 'SAI_TINH_TOAN']],
      ['CPA = chi phí quảng cáo ÷ số đơn.', '10.000.000 ÷ 36 ≈ 277.778 ≈ <b>278.000đ</b>.']),
    calc('Video studio chi 10.000.000đ và có 25 đơn. CPA là bao nhiêu đồng mỗi đơn?', 'đồng', 400000, 1000,
      [[250000, 'NHAM_CTR_CVR'], [2500000, 'SAI_TINH_TOAN']],
      ['CPA = chi phí quảng cáo ÷ số đơn.', '10.000.000 ÷ 25 = <b>400.000đ</b>.']),
    mcq('Điều nào đúng về Spark Ads theo mô tả chính thức của TikTok?',
      ['Nó là quảng cáo dựng hoàn toàn mới, không liên quan gì tới bài đăng tự nhiên có sẵn của tài khoản', 'Nó quảng bá một bài đăng tự nhiên có sẵn và tương tác được tính cho bài gốc', 'Nó chỉ chạy được trên video do đội quảng cáo dựng trong studio', 'Nó không cần bất kỳ sự cho phép nào của người sáng tạo video'], 'b',
      ['Spark Ads dựa trên bài đăng tự nhiên có sẵn.', 'Đúng. Đây là mô tả chính thức của định dạng.', 'Spark Ads dùng chính bài đăng tự nhiên, không phải video studio riêng.', 'Với bài của creator cần mã uỷ quyền do họ cấp.']),
    mcq('Muốn đẩy video của một creator bằng Spark Ads, bạn cần gì?',
      ['Chỉ cần liên kết video là đủ, không cần xin phép ai cả', 'Mã uỷ quyền do creator cấp, với thời hạn họ chọn', 'Thanh toán thêm một khoản phí cố định cho nền tảng', 'Đăng lại video của creator trên tài khoản của bạn trước'], 'b',
      ['Không có liên kết nào thay được sự cho phép của creator.', 'Đúng. Creator tạo mã trong ứng dụng và gửi cho nhà quảng cáo.', 'Mô tả chính thức không nêu phí cố định như vậy.', 'Đăng lại video của người khác không thay được uỷ quyền.']),
    mcq('Điều nào là chỉ số đúng nhất để quyết định có tiếp tục chi cho một Spark Ad?',
      ['Số lượt xem tổng cộng của bài đăng gốc', 'CPA so với mục tiêu và so với biên lợi nhuận mỗi đơn', 'Số bình luận mà quảng cáo đã nhận được', 'Số lần video được lưu vào danh sách yêu thích'], 'b',
      ['Lượt xem không nói chi phí hay lãi trên mỗi đơn.', 'Đúng. CPA so với biên lợi nhuận cho biết quảng cáo có lãi hay không.', 'Bình luận là tín hiệu phụ, không thay CPA.', 'Lượt lưu là tín hiệu phụ, không trả lời quảng cáo có lãi không.']),
  ] },

  ] });
})();
