/* MODULE kn15 · Bước 5 Chọn kênh · YouTube: đóng gói, giữ chân và đọc đúng báo cáo
   5 bài × 7 câu. Con số trong ví dụ là MINH HOẠ và tự khớp nhau.
   Nguồn chính thức đã đối chiếu ngày 2026-10-11 (YouTube Help, có thể đã đổi — luôn kiểm lại):
   - “Decoding CTR & impressions in your Analytics” — https://support.google.com/youtube/answer/16767369
     Nội dung dùng: impressions = số lần hình thu nhỏ được hiển thị; CTR = tần suất người xem bắt đầu xem sau khi thấy hình thu nhỏ;
     CTR có thể giảm khi impressions tăng (ví dụ trong trang: 9% ở 10.000 impressions xuống 3,5% ở 100.000, không phải suy giảm);
     CTR đầu thường cao vì đến từ người xem trung thành; tìm kiếm thường ít impressions nhưng CTR cao, trang chủ thì ngược lại.
   - “Understand your YouTube video reach” — https://support.google.com/youtube/answer/9314355 (tab Tiếp cận cho biết người xem tìm thấy nội dung thế nào).
   - “Metrics definitions” — https://support.google.com/youtube/answer/12942217 (thời lượng xem trung bình = số phút xem trung bình trên mỗi lượt xem).
   Bài KHÔNG nêu “CTR tốt là bao nhiêu phần trăm” vì trang chính thức không đưa mốc chuẩn. */
(() => {
  const K = 'abcd';
  const PAT = 'bdcabadcdabcbdca'; let nQ = 0;
  const mcq = (stem, o, ans, w) => {
    const from = K.indexOf(ans), to = K.indexOf(PAT[nQ++ % PAT.length]);
    const mv = (arr) => { const c = arr.slice(), [x] = c.splice(from, 1); c.splice(to, 0, x); return c; };
    const oo = mv(o), ww = mv(w);
    return { type: 'mcq', stem, options: oo.map((t, i) => ({ k: K[i], t })), answer: K[to], why: Object.fromEntries(ww.map((x, i) => [K[i], x])) };
  };
  const calc = (stem, unit, ans, tol, wrong, steps) => ({ type: 'calc', stem, unit, ans, tol, wrong, errors: wrong.map((w) => w[1]), steps });

  BAI_ADD({ mod: 'kn15', lessons: [

/* ------------------------------------------------------------------ 01 */
{ id: 'B:kn15-01', skill: 'measure', read: '6 phút', t: 'CTR tụt từ 9% xuống 3,5% khi video đến người lạ: tin xấu hay tin tốt?',
  situation: 'Kênh YouTube dạy nấu ăn của một thương hiệu nồi chiên có video mới. Tuần đầu: 10.000 lượt hiển thị hình thu nhỏ, CTR 9%. Tuần ba: 100.000 lượt hiển thị, CTR 3,5%. Người quản lý hoảng: “CTR giảm hơn một nửa, hình thu nhỏ hỏng rồi, đổi ngay đi!” Trong khi số lượt xem mỗi tuần lại đang tăng.',
  concept: { name: 'CTR giảm khi tiếp cận rộng hơn',
    body: 'Theo trang trợ giúp chính thức của YouTube, <b>impressions</b> là số lần hình thu nhỏ được hiển thị, còn <b>CTR</b> là tần suất người xem bắt đầu xem sau khi thấy hình thu nhỏ. Trang này chỉ rõ CTR có thể giảm khi impressions tăng: lúc đầu video chủ yếu hiện với người xem trung thành nên CTR cao, rồi được đưa tới nhiều người xa lạ hơn thì CTR thấp đi, và đó không nhất thiết là suy giảm. Nên đọc CTR cùng số impressions và số lượt xem, không đọc riêng.' },
  example: 'Tính lượt xem từ hình thu nhỏ: tuần đầu 10.000 × 9% = 900 lượt; tuần ba 100.000 × 3,5% = 3.500 lượt. CTR giảm hơn một nửa nhưng lượt xem tăng gần gấp bốn. Kênh chưa cần đổi hình thu nhỏ. Đội chỉ ghi chú rằng khán giả đã mở rộng, rồi so CTR giữa các video ở cùng giai đoạn và cùng nguồn, thay vì so tuần đầu với tuần ba.',
  takeaway: 'CTR giảm khi impressions tăng chưa chắc là xấu; hãy đọc cùng impressions và lượt xem rồi mới kết luận.',
  apply: 'Mở một video có CTR giảm theo thời gian. Nói trong 60 giây: impressions và lượt xem đã đổi thế nào, và bạn có thật sự cần đổi hình thu nhỏ không.',
  mistakes: ['Thấy CTR giảm là đổi ngay hình thu nhỏ mà chưa nhìn impressions và lượt xem.', 'So CTR của tuần đầu (khán giả trung thành) với tuần sau (khán giả rộng hơn) như thể cùng một nhóm người.'],
  q: [
    mcq('Đoán trước: CTR giảm từ 9% xuống 3,5% trong khi impressions tăng gấp mười. Điều nào nhiều khả năng đúng nhất?',
      ['Hình thu nhỏ đã hỏng và cần thay thế ngay lập tức bằng bản mới', 'Video đang đến nhiều người xa lạ hơn nên CTR thấp đi, chưa chắc là xấu', 'Số liệu lúc đầu sai vì CTR 9% không thể có thật', 'Khán giả cũ đã chán kênh nên bỏ không xem nữa'], 'b',
      ['Chưa đủ cơ sở để kết luận hình thu nhỏ hỏng; cần nhìn cả impressions và lượt xem.', 'Đúng. Trang chính thức nêu chính xác hiện tượng này và coi đó không nhất thiết là suy giảm.', 'Không có lý do để nghi số liệu; đây là mô tả thường gặp.', 'Chưa có bằng chứng khán giả cũ rời đi; lượt xem đang tăng.']),
    mcq('Bạn làm gì trước khi quyết định đổi hình thu nhỏ của video này?',
      ['Đổi ngay vì CTR giảm hơn một nửa là tín hiệu rõ nhất', 'Xem impressions và lượt xem cùng kỳ, so CTR với video khác ở cùng giai đoạn', 'Chờ thêm sáu tháng cho đến khi CTR tự phục hồi về mức ban đầu, không làm thêm điều gì khác', 'Gỡ video và đăng lại như một video mới để lấy lại CTR cao'], 'b',
      ['CTR một mình không đủ để kết luận khi impressions đổi lớn như vậy.', 'Đúng. Đọc CTR cùng impressions, lượt xem và so cùng giai đoạn mới công bằng.', 'Chờ sáu tháng không đưa ra thông tin nào hữu ích.', 'Gỡ rồi đăng lại là hành động trước khi hiểu nguyên nhân.']),
    calc('Tuần ba có 100.000 lượt hiển thị hình thu nhỏ và CTR 3,5%. Có bao nhiêu lượt xem đến từ hình thu nhỏ?', 'lượt', 3500, 5,
      [[350000, 'NHAM_DIEM_PHAN_TRAM'], [35, 'SAI_TINH_TOAN']],
      ['Lượt xem từ hình thu nhỏ = impressions × CTR.', '100.000 × 3,5% = <b>3.500 lượt</b>.']),
    mcq('Tuần đầu 900 lượt xem (10.000 × 9%), tuần ba 3.500 lượt. Điều nào mô tả đúng nhất?',
      ['CTR giảm nhưng lượt xem tăng', 'CTR và lượt xem luôn tăng giảm cùng chiều nên số liệu chắc bị lỗi', 'Lượt xem tăng chỉ vì thuật toán, không liên quan gì tới impressions', 'Không thể nói gì vì hai tuần có số lượt hiển thị khác nhau'], 'a',
      ['Đúng. Lượt xem = impressions × CTR; impressions tăng mạnh bù cho CTR thấp hơn.', 'Hai chỉ số không buộc phải đi cùng chiều.', 'Lượt xem phụ thuộc trực tiếp impressions và CTR theo công thức.', 'Vẫn so được bằng cách tính ra lượt xem từ hình thu nhỏ.']),
    mcq('Điều nào là cách so CTR công bằng giữa hai video?',
      ['So CTR video mới ngày đầu với CTR video cũ đã chạy một năm, vì cả hai đều là video của kênh', 'So CTR ở cùng giai đoạn sau đăng, cùng nguồn lưu lượng và cỡ impressions tương đương', 'So CTR video có ảnh bìa màu sáng với video ảnh bìa màu tối', 'So CTR của một video trong ngày thường với ngày lễ lớn'], 'b',
      ['Khán giả ngày đầu và sau một năm rất khác, nên không so được.', 'Đúng. So cùng điều kiện giảm các nhiễu từ khác biệt khán giả.', 'Màu ảnh bìa là một biến; so như vậy chưa kiểm soát được nguồn lưu lượng.', 'Ngày lễ làm đổi hành vi, nên cần chuẩn hoá trước khi so.']),
    mcq('Trang trợ giúp chính thức có đưa ra một mốc CTR “tốt” chuẩn cho mọi kênh không?',
      ['Có, mọi kênh nên đạt khoảng một con số cố định', 'Không đưa mốc chuẩn; CTR còn phụ thuộc nguồn và khán giả của từng kênh', 'Có, nhưng chỉ cho kênh trên một triệu người đăng ký', 'Có, và mốc đó giống nhau giữa tìm kiếm và trang chủ, áp dụng cho mọi kênh mọi chủ đề'], 'b',
      ['Trang không nêu một mốc cố định như vậy.', 'Đúng. Vì vậy cần so với chính kênh và theo nguồn, không theo con số chung.', 'Trang không phân theo quy mô kênh như vậy.', 'Chính trang chỉ ra CTR khác nhau giữa các nguồn lưu lượng.']),
    mcq('Quản lý yêu cầu “CTR phải luôn trên 8%”. Bạn trả lời thế nào cho đúng nhất?',
      ['Đồng ý và đặt mục tiêu 8% cho mọi video của kênh', 'Giải thích CTR đổi theo nguồn và giai đoạn nên cần đặt mục tiêu theo từng nguồn', 'Từ chối đặt mọi mục tiêu về CTR vì chỉ số này vô nghĩa', 'Đề nghị chỉ đo bằng lượt đăng ký mới thay cho mọi chỉ số khác, kể cả CTR và lượt xem'], 'b',
      ['Một con số cố định bỏ qua khác biệt giữa nguồn và giai đoạn.', 'Đúng. Mục tiêu hợp lý theo nguồn và theo giai đoạn đời video.', 'CTR vẫn có ích khi đọc đúng; không nên bỏ.', 'Một chỉ số đơn lẻ khác cũng có giới hạn tương tự.']),
  ] },

/* ------------------------------------------------------------------ 02 */
{ id: 'B:kn15-02', skill: 'measure', read: '6 phút', t: 'Cùng một video, CTR tìm kiếm cao còn CTR trang chủ thấp: có nên so không?',
  situation: 'Một kênh dạy tiếng Anh đăng video “Cách phát âm 12 âm khó”. Trong báo cáo, nguồn tìm kiếm cho 4.000 lượt hiển thị và CTR 12%; nguồn trang chủ cho 60.000 lượt hiển thị và CTR 3%. Người làm kênh kết luận “trang chủ kém hiệu quả, bỏ hết đầu tư cho việc làm cho video lên trang chủ”.',
  concept: { name: 'CTR phụ thuộc vào ý định của người nhìn',
    body: 'Theo trang trợ giúp của YouTube, ở <b>tìm kiếm</b> thường có ít impressions hơn nhưng CTR cao hơn, vì người xem có ý định cụ thể và đang tìm lời giải. Ở <b>trang chủ</b> thường có nhiều impressions nhưng CTR thấp hơn, vì người xem đang ở chế độ khám phá và nhiều video cạnh tranh nhau. Vì vậy không so thẳng CTR giữa hai nguồn. Cách đúng là đọc từng nguồn riêng: với nguồn tìm kiếm hỏi “tiêu đề có khớp điều người ta gõ không”, với nguồn trang chủ hỏi “hình thu nhỏ có đủ nổi bật giữa những video khác không”.' },
  example: 'Tính lượt xem theo nguồn. Tìm kiếm: 4.000 × 12% = 480 lượt. Trang chủ: 60.000 × 3% = 1.800 lượt. Trang chủ mang về gấp 3,75 lần lượt xem dù CTR thấp hơn nhiều, vì lượng impressions lớn. Kênh không bỏ trang chủ. Họ tối ưu tiêu đề cho cụm từ người học hay gõ (“cách phát âm th”) để tăng impressions ở tìm kiếm, và thử hai hình thu nhỏ cho trang chủ.',
  takeaway: 'Đừng so CTR giữa tìm kiếm và trang chủ; đọc từng nguồn theo ý định của người nhìn.',
  apply: 'Mở báo cáo nguồn lưu lượng của một video. Nói trong 60 giây: nguồn nào cho nhiều lượt xem nhất, CTR từng nguồn là bao nhiêu và bạn tối ưu gì cho từng nguồn.',
  mistakes: ['So CTR giữa các nguồn rồi bỏ nguồn có CTR thấp dù nó mang về nhiều lượt xem.', 'Tối ưu hình thu nhỏ cho tìm kiếm trong khi điều quyết định ở nguồn này là tiêu đề khớp truy vấn.'],
  q: [
    mcq('Đoán trước: CTR từ tìm kiếm là 12%, từ trang chủ là 3%. Nguyên nhân hợp lý nhất cho sự chênh lệch là gì?',
      ['Hình thu nhỏ hiện ở tìm kiếm được YouTube chỉnh đẹp hơn hình thu nhỏ hiện ở trang chủ nhiều', 'Người tìm kiếm có ý định cụ thể, người ở trang chủ đang khám phá và có nhiều lựa chọn', 'Trang chủ không đáng tin nên người ta ít bấm vào video ở đó', 'Số liệu ở trang chủ luôn bị tính thấp hơn thực tế'], 'b',
      ['Cùng một video và cùng hình thu nhỏ nên không phải hình đẹp hơn.', 'Đúng. Trang chính thức giải thích đúng vì sao hai nguồn khác nhau.', 'Không có cơ sở nói trang chủ “không đáng tin”.', 'Không có bằng chứng cho việc tính thấp hơn thực tế.']),
    mcq('Bạn làm gì với báo cáo nguồn lưu lượng của video này?',
      ['Bỏ đầu tư cho trang chủ vì CTR ở đó chỉ 3%', 'Đọc hai nguồn riêng, tối ưu tiêu đề cho tìm kiếm và hình thu nhỏ cho trang chủ', 'Đồng nhất mọi hình thu nhỏ để CTR hai nguồn bằng nhau', 'Chỉ nhìn tổng CTR của cả video để cho gọn, bỏ qua nguồn lưu lượng của từng lượt xem'], 'b',
      ['Trang chủ đang mang về nhiều lượt xem nhất; bỏ là mất phần lớn lượt xem.', 'Đúng. Mỗi nguồn có ý định người xem riêng nên tối ưu khác nhau.', 'Không thể làm CTR hai nguồn bằng nhau bằng cách đồng nhất hình ảnh.', 'Tổng CTR trộn hai nguồn khác nhau, che mất thông tin.']),
    calc('Nguồn trang chủ có 60.000 lượt hiển thị và CTR 3%. Có bao nhiêu lượt xem đến từ nguồn này?', 'lượt', 1800, 2,
      [[180000, 'NHAM_DIEM_PHAN_TRAM'], [20000, 'SAI_MAU_SO']],
      ['Lượt xem = impressions × CTR.', '60.000 × 3% = <b>1.800 lượt</b>.']),
    mcq('Nguồn tìm kiếm cho 480 lượt xem, nguồn trang chủ cho 1.800 lượt xem. Kết luận nào đúng nhất về hai nguồn?',
      ['Tìm kiếm tốt hơn vì CTR cao hơn nhiều', 'Trang chủ đang mang về nhiều lượt xem hơn dù CTR thấp hơn nhiều', 'Hai nguồn như nhau vì tổng cả hai ra đủ 2.280 lượt xem và cùng thuộc một video', 'Không so được vì hai nguồn có đơn vị khác nhau'], 'b',
      ['CTR cao không có nghĩa mang về nhiều lượt xem hơn khi impressions rất khác nhau.', 'Đúng. Lượt xem = impressions × CTR; trang chủ có impressions lớn hơn nhiều.', 'Khác nhau về đóng góp từng nguồn nên không thể coi là như nhau.', 'Cùng là lượt xem nên vẫn so được từng nguồn.']),
    mcq('Muốn tăng lượt xem từ nguồn tìm kiếm, bạn nên làm điều gì trước?',
      ['Đặt tiêu đề trả lời đúng cụm từ người học hay gõ khi tìm cách phát âm', 'Thêm thật nhiều chữ và biểu tượng vào hình thu nhỏ để nổi bật hơn hẳn các video khác ở kết quả tìm kiếm', 'Đăng video vào đêm khuya khi ít video cạnh tranh', 'Đổi tên kênh thành một tên ngắn hơn và dễ nhớ hơn'], 'a',
      ['Đúng. Ở tìm kiếm, người xem có ý định cụ thể; khớp truy vấn là điều quyết định.', 'Hình thu nhỏ quan trọng hơn ở trang chủ nơi nhiều video cạnh tranh.', 'Giờ đăng không giải quyết việc khớp truy vấn.', 'Đổi tên kênh không giúp khớp điều người ta gõ.']),
    mcq('Khi nào việc tách báo cáo theo nguồn lưu lượng đặc biệt quan trọng?',
      ['Khi video có rất ít lượt xem nên không cần tách gì cả', 'Khi một video có nhiều nguồn với ý định người xem khác nhau', 'Khi muốn số liệu trông đẹp hơn trong báo cáo cho sếp', 'Khi video mới đăng chưa được vài giờ nên chưa có dữ liệu'], 'b',
      ['Ít lượt xem vẫn cần đọc cẩn thận, chỉ là dữ liệu ít.', 'Đúng. Khi nguồn khác nhau, tách ra giúp tránh kết luận sai từ con số trung bình.', 'Mục đích không phải làm số đẹp mà làm đúng.', 'Không có dữ liệu thì không có gì để tách, đó là một trường hợp khác.']),
    mcq('Một kênh chỉ có một nguồn lưu lượng chính là trang chủ. Việc nào hợp lý nhất để cải thiện?',
      ['Thử hai phiên bản hình thu nhỏ và tiêu đề khác nhau, đổi một thứ mỗi lần', 'Viết lại mô tả video thật dài với nhiều từ khoá', 'Đổi tên kênh mỗi tháng để người xem thấy mới', 'Tắt tính năng bình luận để người xem tập trung vào video và không bị phân tán khi xem'], 'a',
      ['Đúng. Ở trang chủ, gói video quyết định việc được bấm giữa nhiều lựa chọn.', 'Mô tả dài không ảnh hưởng nhiều tới việc bấm từ trang chủ.', 'Đổi tên kênh làm người xem khó nhận ra.', 'Tắt bình luận không liên quan tới CTR.']),
  ] },

/* ------------------------------------------------------------------ 03 */
{ id: 'B:kn15-03', skill: 'measure', read: '6 phút', t: 'Thời lượng xem trung bình 3 phút: tốt hay xấu — còn tuỳ video dài bao nhiêu?',
  situation: 'Một kênh review đồ công nghệ có hai video. Video A dài 4 phút, thời lượng xem trung bình 2 phút 20 giây. Video B dài 15 phút, thời lượng xem trung bình 4 phút 30 giây. Người dựng nói “video B tốt hơn vì người xem xem lâu hơn gần gấp đôi” và định dựng tất cả video theo kiểu B.',
  concept: { name: 'Quy thời lượng xem về phần trăm độ dài',
    body: 'Theo định nghĩa của YouTube, <b>thời lượng xem trung bình</b> là số phút người ta xem trung bình trên mỗi lượt xem. Con số tuyệt đối phụ thuộc rất nhiều vào độ dài video, nên để so các video khác độ dài, hãy <b>quy về phần trăm độ dài</b>: thời lượng xem trung bình ÷ độ dài video. Video 4 phút mà người ta xem 2 phút 20 giây là giữ phần lớn hơn so với video 15 phút mà người ta chỉ xem 4 phút 30 giây. Sau đó mới đọc biểu đồ giữ chân để biết người xem rời ở đâu.' },
  example: 'Đổi ra giây: video A dài 240 giây, xem trung bình 140 giây, tức 140 ÷ 240 ≈ 58%. Video B dài 900 giây, xem trung bình 270 giây, tức 270 ÷ 900 = 30%. Video A giữ một phần lớn hơn gần gấp đôi dù thời lượng tuyệt đối thấp hơn. Người dựng không bỏ video dài, nhưng cắt video B xuống còn khoảng 9 phút ở những đoạn người xem rời nhiều nhất, rồi so lại phần trăm giữ chân.',
  takeaway: 'Để so video khác độ dài, hãy quy thời lượng xem trung bình về phần trăm độ dài trước.',
  apply: 'Chọn hai video khác độ dài của bạn. Nói trong 60 giây: mỗi video giữ được bao nhiêu phần trăm độ dài và video nào cần sửa trước.',
  mistakes: ['So thời lượng xem tuyệt đối giữa video 4 phút và video 15 phút rồi kết luận video dài “tốt hơn”.', 'Chỉ nhìn số trung bình mà không mở biểu đồ giữ chân để tìm chỗ người xem rời đi.'],
  q: [
    mcq('Đoán trước: video 4 phút xem trung bình 2 phút 20 giây, video 15 phút xem trung bình 4 phút 30 giây. Video nào giữ được phần lớn hơn?',
      ['Video 15 phút, vì thời lượng xem tuyệt đối lớn hơn', 'Video 4 phút, vì phần trăm độ dài được xem cao hơn rõ rệt', 'Hai video như nhau vì cùng là video của một kênh', 'Không thể so vì độ dài khác nhau hoàn toàn'], 'b',
      ['Thời lượng tuyệt đối bị ảnh hưởng bởi độ dài; cần quy về phần trăm.', 'Đúng. 140 ÷ 240 ≈ 58% so với 270 ÷ 900 = 30%.', 'Hai video cho hai kết quả rất khác nhau khi so phần trăm.', 'Có thể so được bằng cách quy về phần trăm độ dài.']),
    mcq('Bạn làm gì với video 15 phút xem trung bình 30% độ dài?',
      ['Dựng mọi video đều dài 15 phút vì người xem “xem lâu hơn”', 'Mở biểu đồ giữ chân, tìm đoạn người xem rời nhiều và rút gọn chỗ đó', 'Xoá video vì 30% là quá thấp không thể cứu', 'Giữ nguyên rồi đăng thêm nhiều video dài để bù cho các video yếu trong tháng'], 'b',
      ['Độ dài không phải mục tiêu; giữ được người xem mới là mục tiêu.', 'Đúng. Biểu đồ giữ chân chỉ ra chỗ cần sửa cụ thể.', 'Xoá là quyết định vội khi chưa tìm ra nguyên nhân.', 'Thêm video dài không giải quyết việc người xem đang rời.']),
    calc('Video 4 phút (240 giây) có thời lượng xem trung bình 2 phút 20 giây (140 giây). Phần trăm độ dài được xem là bao nhiêu (làm tròn số nguyên)?', '%', 58, 0.6,
      [[171.4, 'SAI_MAU_SO'], [1.7, 'SAI_TINH_TOAN']],
      ['Phần trăm độ dài = thời lượng xem trung bình ÷ độ dài video.', '140 ÷ 240 ≈ 0,583 ≈ <b>58%</b>.']),
    calc('Video 15 phút (900 giây) có thời lượng xem trung bình 4 phút 30 giây (270 giây). Phần trăm độ dài được xem là bao nhiêu?', '%', 30, 0.1,
      [[333.3, 'SAI_MAU_SO'], [3, 'NHAM_DIEM_PHAN_TRAM']],
      ['Phần trăm độ dài = thời lượng xem trung bình ÷ độ dài video.', '270 ÷ 900 = 0,3 = <b>30%</b>.']),
    mcq('Điều nào đúng về thời lượng xem trung bình?',
      ['Nó là số phút người xem xem trung bình trên mỗi lượt xem', 'Nó là tổng số phút của mọi lượt xem cộng lại, tính trên toàn bộ kênh', 'Nó luôn bằng nửa độ dài của video', 'Nó chỉ tính những người đã đăng ký kênh và đã bật chuông thông báo'], 'a',
      ['Đúng. Đây là định nghĩa trong trang chỉ số của YouTube.', 'Tổng phút là chỉ số khác (tổng thời gian xem).', 'Không có quy tắc nào buộc nó bằng nửa độ dài.', 'Chỉ số này tính trên mọi lượt xem, không chỉ người đăng ký.']),
    mcq('Hai video cùng giữ 40% độ dài. Điều gì vẫn nên xem thêm để biết sửa gì?',
      ['Không cần xem gì thêm vì hai video giống nhau hoàn toàn', 'Biểu đồ giữ chân của từng video', 'Chỉ nhìn số người đăng ký mới sau mỗi video', 'Chỉ nhìn số lượt thích dưới mỗi video'], 'b',
      ['Cùng phần trăm có thể đến từ hai hình dạng giữ chân rất khác nhau.', 'Đúng. Hình dạng đường cong cho biết sửa mở đầu, nhịp hay một đoạn cụ thể.', 'Số đăng ký mới là chỉ số khác; không trả lời việc người xem rời ở đâu.', 'Lượt thích không cho biết chỗ người xem rời đi.']),
    mcq('Người dựng muốn rút video 15 phút xuống 9 phút. Cách làm hợp lý nhất là gì?',
      ['Cắt đều mọi đoạn mỗi đoạn một ít cho đỡ mất nội dung', 'Cắt hoặc rút gọn các đoạn mà biểu đồ giữ chân cho thấy người xem rời nhiều', 'Cắt phần đầu video vì phần đầu luôn không quan trọng', 'Cắt phần cuối vì người xem không bao giờ xem tới cuối nên phần đó chắc chắn là thừa'], 'b',
      ['Cắt đều không nhắm đúng chỗ người xem rời.', 'Đúng. Dữ liệu chỉ ra đoạn cần sửa; cắt đúng chỗ giữ được nội dung quan trọng.', 'Phần đầu thường quyết định người xem ở lại hay rời đi.', 'Không có quy luật chung nào nói người xem không bao giờ xem tới cuối.']),
  ] },

/* ------------------------------------------------------------------ 04 */
{ id: 'B:kn15-04', skill: 'measure', read: '7 phút', t: 'Mở tab Tiếp cận trong YouTube Studio: bốn câu hỏi cần trả lời trước khi sửa',
  situation: 'Một kênh bán dụng cụ làm vườn thấy lượt xem tháng này giảm 30%. Chủ kênh mở YouTube Studio, nhìn thấy một đống biểu đồ và chỉ biết “lượt xem giảm”. Anh định đăng gấp ba số video trong tháng sau. Chưa ai mở tab Tiếp cận hay xem nguồn lưu lượng.',
  concept: { name: 'Bốn câu hỏi của tab Tiếp cận',
    body: 'Theo trang trợ giúp của YouTube, tab <b>Tiếp cận</b> cho biết người xem tìm thấy nội dung của bạn như thế nào, với các chỉ số như impressions, CTR và lượt xem. Đọc nó bằng bốn câu hỏi theo thứ tự: <b>(1) Impressions có đổi không</b> (video có được hiển thị ít hơn?), <b>(2) CTR có đổi không</b> (gói video có kém hơn hay chỉ do khán giả rộng ra?), <b>(3) nguồn lưu lượng nào đổi</b> (tìm kiếm, trang chủ, gợi ý, bên ngoài), <b>(4) video nào kéo số chung đi lên hay xuống</b>. Trả lời được bốn câu mới chọn việc sửa.' },
  example: 'Chủ kênh mở tab Tiếp cận. (1) Impressions giảm từ 200.000 xuống 120.000, tức giảm 40%. (2) CTR gần như không đổi, 4,1% xuống 4,0%. (3) Nguồn giảm nhiều nhất là trang chủ; tìm kiếm ổn định. (4) Ba video cũ từng có nhiều impressions từ trang chủ đã mất gần hết. Kết luận: vấn đề là video không còn được hiển thị nhiều ở trang chủ, không phải gói video kém đi. Việc cần làm là làm video mới bám chủ đề của ba video cũ, không phải đăng gấp ba số lượng.',
  takeaway: 'Trả lời bốn câu: impressions, CTR, nguồn nào, video nào — rồi mới chọn việc sửa.',
  apply: 'Mở tab Tiếp cận của một kênh. Nói trong 60 giây: impressions và CTR đổi ra sao, nguồn nào đổi nhiều nhất và video nào kéo đi lên hay xuống.',
  mistakes: ['Chỉ nhìn số lượt xem tổng rồi quyết định đăng nhiều hơn mà không mở tab Tiếp cận.', 'Nhầm lượt xem giảm do ít impressions với lượt xem giảm do CTR thấp, rồi sửa nhầm hướng.'],
  q: [
    mcq('Đoán trước: lượt xem giảm 30%. Việc đầu tiên nên làm trong YouTube Studio là gì?',
      ['Đăng gấp ba số video trong tháng sau để bù lại phần lượt xem đã giảm', 'Mở tab Tiếp cận để xem impressions, CTR và nguồn nào thay đổi', 'Đổi toàn bộ hình thu nhỏ của mọi video cũ sang một kiểu thiết kế khác', 'Tắt phần bình luận để người xem tập trung hơn'], 'b',
      ['Đăng nhiều hơn khi chưa biết nguyên nhân có thể không đúng chỗ.', 'Đúng. Xác định lượt xem giảm do impressions hay CTR hay nguồn nào trước khi sửa.', 'Đổi hình cũ khi chưa biết CTR có phải nguyên nhân là hành động sớm.', 'Tắt bình luận không liên quan tới lượt xem.']),
    mcq('Impressions giảm 40% nhưng CTR gần như không đổi. Bạn chọn sửa gì trước?',
      ['Sửa lại hình thu nhỏ vì gói video đã kém đi nên người xem bấm ít hơn', 'Tìm vì sao video được hiển thị cho ít người hơn: chủ đề, nguồn phân phối', 'Đổi tên kênh vì người xem đã chuyển sang kênh khác hết', 'Bỏ qua báo cáo vì số liệu CTR sai nên không đọc được'], 'b',
      ['CTR gần như không đổi nghĩa là gói video không tệ đi.', 'Đúng. Giảm impressions với CTR giữ nguyên chỉ ra việc được hiển thị ít hơn.', 'Chưa có bằng chứng người xem chuyển sang kênh khác.', 'Không có lý do để nghi số CTR.']),
    calc('Impressions giảm từ 200.000 xuống 120.000. Mức giảm là bao nhiêu phần trăm?', '%', 40, 0.1,
      [[60, 'NHAM_SO_TUYET_DOI'], [80000, 'NHAM_DIEM_PHAN_TRAM']],
      ['Mức giảm = (cũ − mới) ÷ cũ.', '(200.000 − 120.000) ÷ 200.000 = 0,4 = <b>40%</b>.']),
    mcq('Ba video cũ từng có nhiều impressions từ trang chủ đã mất gần hết impressions đó. Việc hợp lý nhất là gì?',
      ['Gỡ ba video đó vì chúng đã hết giá trị', 'Làm video mới bám các chủ đề của ba video cũ và so lại số liệu', 'Đăng lại đúng ba video đó với tiêu đề không đổi', 'Mua quảng cáo cho ba video đó để lấy lại impressions'], 'b',
      ['Gỡ video mất cả lượt xem đến từ các nguồn khác.', 'Đúng. Học từ chủ đề từng hiệu quả để tạo video mới là bước tiếp hợp lý.', 'Đăng lại y hệt không giải quyết việc video không còn được hiển thị.', 'Mua quảng cáo chưa nhất thiết là cách hợp lý khi chưa hiểu nguyên nhân.']),
    mcq('Nguồn lưu lượng nào giảm nhiều nhất cho biết điều gì hữu ích?',
      ['Cho biết cửa phát hiện nào đang mất, từ đó biết nên sửa gì', 'Cho biết kênh nên đổi tên ngay lập tức để lấy lại lượt xem', 'Cho biết người xem đã ghét nội dung của kênh', 'Không cho biết điều gì vì mọi nguồn đều giống nhau'], 'a',
      ['Đúng. Nguồn giảm chỉ ra cửa đang mất và hướng sửa phù hợp.', 'Tên kênh không liên quan tới việc một nguồn giảm.', 'Không thể kết luận ghét nội dung từ việc một nguồn giảm.', 'Các nguồn khác nhau có ý nghĩa khác nhau, không giống nhau.']),
    mcq('Sau khi trả lời bốn câu, bạn phát hiện CTR giảm nhưng impressions tăng mạnh. Bạn nên nghĩ gì trước?',
      ['Gói video bị hỏng và cần sửa gấp mọi thứ', 'Có thể khán giả đang rộng ra', 'Người xem cũ đều đã rời kênh', 'Số liệu impressions bị lỗi nên cần bỏ qua'], 'b',
      ['Cần xem lượt xem và so cùng giai đoạn trước khi kết luận gói video hỏng.', 'Đúng. Trang chính thức cho biết CTR có thể giảm khi impressions tăng.', 'Chưa có bằng chứng người xem cũ rời kênh.', 'Không có lý do để nghi số impressions.']),
    mcq('Cách nào đúng để dùng bốn câu hỏi này trong báo cáo cho quản lý?',
      ['Gửi toàn bộ ảnh chụp mọi biểu đồ trong Studio để quản lý tự đọc và tự rút ra kết luận', 'Nêu kết luận, rồi hai–ba con số trả lời bốn câu hỏi và một việc đề xuất', 'Chỉ nói “lượt xem giảm” và hứa sẽ cố gắng hơn', 'Chỉ báo cáo số người đăng ký mà không nói gì khác'], 'b',
      ['Quản lý cần kết luận và hành động, không phải tất cả biểu đồ.', 'Đúng. Một kết luận gọn dựa trên vài con số và một đề nghị cụ thể.', 'Lời hứa chung không phải báo cáo.', 'Số đăng ký không trả lời lượt xem giảm vì sao.']),
  ] },

/* ------------------------------------------------------------------ 05 */
{ id: 'B:kn15-05', skill: 'channel', read: '6 phút', t: 'Video dài hay video ngắn dọc: chọn theo việc và đo từng loại riêng',
  situation: 'Một thương hiệu mỹ phẩm có kênh YouTube với 12 video dài 8–12 phút và vừa đăng thêm 20 video ngắn dọc 30–50 giây. Người phụ trách gộp mọi số liệu vào một bảng: “tổng lượt xem tăng 150% nhờ video ngắn!”, rồi định bỏ video dài. Nhưng số người đăng ký mới và lượt xem trang sản phẩm gần như không đổi.',
  concept: { name: 'Chọn theo việc, đo từng loại riêng',
    body: 'Video dài và video ngắn dọc là hai định dạng với hai việc thường khác nhau: <b>ngắn</b> thường để gặp nhiều người nhanh và gợi tò mò, <b>dài</b> thường để giải thích sâu và xây niềm tin. Mỗi định dạng cũng có cách người xem tiếp cận và chỉ số phù hợp riêng, nên <b>không gộp số liệu của hai loại vào một con số</b>. Cách làm chắc nhất là gán việc cho từng loại, đo riêng bằng chỉ số đúng việc, rồi mới so tác dụng với mục tiêu chung. Cách mỗi định dạng được phân phối có thể đổi; luôn kiểm tài liệu chính thức của nền tảng.' },
  example: 'Họ tách bảng. Video ngắn: 400.000 lượt xem, thời lượng xem hết 70%, đăng ký mới 120. Video dài: 60.000 lượt xem, xem trung bình 45% độ dài, đăng ký mới 480 và 900 lượt nhấp sang trang sản phẩm. Vậy video ngắn giúp gặp người mới, video dài mới là nơi tạo đăng ký và nhấp sang trang sản phẩm. Họ giữ cả hai, giao cho video ngắn việc kéo người mới và cuối mỗi video ngắn mời xem video dài liên quan.',
  takeaway: 'Gán việc cho từng định dạng, đo riêng bằng chỉ số của việc đó, đừng gộp mọi số vào một con số.',
  apply: 'Chọn hai định dạng bạn đang dùng. Nói trong 60 giây: việc của mỗi định dạng là gì, bạn đo bằng chỉ số nào và bạn nối chúng với nhau thế nào.',
  mistakes: ['Gộp lượt xem của mọi định dạng rồi kết luận định dạng nào “thắng”.', 'Bỏ định dạng đang tạo ra hành động cuối vì định dạng khác có nhiều lượt xem hơn.'],
  q: [
    mcq('Đoán trước: tổng lượt xem tăng 150% nhờ video ngắn nhưng đăng ký và nhấp trang sản phẩm không đổi. Điều nào đúng nhất?',
      ['Tăng lượt xem chắc chắn sẽ sớm kéo theo tăng đăng ký và tăng cả số người nhấp sang trang bán hàng', 'Video ngắn đang làm việc gặp người mới, chưa nhất thiết làm việc tạo hành động', 'Số liệu lượt xem của video ngắn không đáng tin', 'Video dài là định dạng kém nhất và nên bỏ'], 'b',
      ['Không có bảo đảm lượt xem tự biến thành đăng ký.', 'Đúng. Mỗi định dạng có việc khác nhau; cần đo hành động cuối cho từng loại.', 'Không có cơ sở để nghi số lượt xem.', 'Video dài có thể đang tạo hành động cuối; cần xem số của nó.']),
    mcq('Bạn làm gì với bảng số liệu gộp của cả hai định dạng?',
      ['Giữ nguyên bảng gộp vì gộp cho một con số dễ đọc nhất và dễ trình bày cho cả đội', 'Tách theo định dạng, gán việc rồi đo từng loại bằng chỉ số đúng việc', 'Chỉ giữ số liệu video ngắn vì có nhiều lượt xem nhất', 'Chỉ giữ số liệu video dài vì thời lượng xem lớn hơn'], 'b',
      ['Gộp che đi việc mỗi định dạng đang làm.', 'Đúng. Tách ra, gán việc rồi đo đúng việc là cách đọc đúng.', 'Bỏ video dài là bỏ nơi đang tạo đăng ký.', 'Bỏ video ngắn là bỏ nơi đang gặp người mới.']),
    calc('Video ngắn có 400.000 lượt xem và 120 đăng ký mới. Có bao nhiêu đăng ký mới trên 1.000 lượt xem?', 'đăng ký', 0.3, 0.01,
      [[3333, 'SAI_MAU_SO'], [30, 'SAI_TINH_TOAN']],
      ['Đăng ký trên 1.000 lượt xem = đăng ký ÷ lượt xem × 1.000.', '120 ÷ 400.000 × 1.000 = <b>0,3</b>.']),
    calc('Video dài có 60.000 lượt xem và 480 đăng ký mới. Có bao nhiêu đăng ký mới trên 1.000 lượt xem?', 'đăng ký', 8, 0.1,
      [[125, 'SAI_MAU_SO'], [0.8, 'SAI_TINH_TOAN']],
      ['Đăng ký trên 1.000 lượt xem = đăng ký ÷ lượt xem × 1.000.', '480 ÷ 60.000 × 1.000 = <b>8</b>.']),
    mcq('Cách nối hai định dạng hợp lý nhất cho thương hiệu này là gì?',
      ['Để hai định dạng hoàn toàn tách biệt, không nhắc tới nhau, để mỗi bên tự đo kết quả riêng', 'Cuối video ngắn mời xem video dài liên quan, đo số người đi từ ngắn sang dài', 'Đăng cùng một nội dung ở cả hai định dạng, không đổi gì', 'Chỉ đăng định dạng ngắn vì nhanh hơn để làm'], 'b',
      ['Tách biệt bỏ lỡ cơ hội dẫn người mới sang nội dung sâu hơn.', 'Đúng. Mỗi định dạng làm việc của mình và có cầu nối đo được.', 'Sao chép không tận dụng việc khác nhau của từng định dạng.', 'Chỉ làm một định dạng bỏ việc mà định dạng kia làm tốt hơn.']),
    mcq('Một đồng nghiệp nói “nền tảng chắc chắn ưu tiên định dạng ngắn, nên bỏ video dài”. Bạn xử lý thế nào?',
      ['Làm theo ngay vì đồng nghiệp có vẻ rất chắc chắn', 'Kiểm lại tài liệu chính thức và dữ liệu kênh trước khi quyết định bỏ định dạng nào', 'Bỏ hẳn các định dạng ngắn ngay hôm nay để chứng minh ngược lại với lời của đồng nghiệp', 'Đợi cả ngành đổi trước rồi mới quyết định'], 'b',
      ['Nhận định chắc chắn về “ưu tiên” cần nguồn chính thức hay dữ liệu.', 'Đúng. Dựa vào tài liệu chính thức và dữ liệu của chính kênh.', 'Bỏ định dạng ngắn là một cực đoan khác chưa kiểm chứng.', 'Chờ cả ngành là bỏ lỡ việc có thể kiểm bằng dữ liệu của bạn.']),
    mcq('Khi đo định dạng dài, chỉ số nào phù hợp với việc “xây niềm tin” hơn tổng lượt xem?',
      ['Phần trăm độ dài được xem và số người nhấp sang bước tiếp', 'Số lượt hiển thị hình thu nhỏ của video đó trên mọi nguồn', 'Số biểu tượng cảm xúc mà người xem đã dùng trong phần bình luận', 'Số video bạn đăng trong tháng'], 'a',
      ['Đúng. Xem đủ lâu và đi tiếp sang bước sau phản ánh niềm tin hơn lượt xem thô.', 'Impressions đo việc được thấy, chưa đo niềm tin.', 'Biểu tượng cảm xúc khó gán cho niềm tin.', 'Số video đăng đo công sức, không đo kết quả.']),
  ] },

  ] });
})();
