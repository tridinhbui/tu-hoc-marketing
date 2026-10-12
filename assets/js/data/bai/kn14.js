/* MODULE kn14 · Bước 5 Chọn kênh · Instagram: mỗi bề mặt một việc, một cách xếp hạng
   5 bài × 7 câu. Con số trong ví dụ là MINH HOẠ và tự khớp nhau.
   Nguồn chính thức đã đối chiếu ngày 2026-10-11 (bản cập nhật 31/05/2023, có thể đã đổi — luôn kiểm lại):
   - Instagram, “Instagram Ranking Explained” — https://about.instagram.com/blog/announcements/instagram-ranking-explained
     Nội dung dùng: mỗi bề mặt (Feed, Stories, Explore, Reels, Search) có mô hình xếp hạng riêng; bốn nhóm tín hiệu
     (hoạt động của bạn, thông tin về bài, thông tin về người đăng, lịch sử tương tác); các dự đoán nhìn kỹ nhất ở Feed, Stories, Reels.
   Bài KHÔNG dùng các “trọng số” hay “mẹo” chỉ có ở blog bên thứ ba, vì chưa có nguồn chính thức. */
(() => {
  const K = 'abcd';
  const PAT = 'dbacbcadcabdacdb'; let nQ = 0;
  const mcq = (stem, o, ans, w) => {
    const from = K.indexOf(ans), to = K.indexOf(PAT[nQ++ % PAT.length]);
    const mv = (arr) => { const c = arr.slice(), [x] = c.splice(from, 1); c.splice(to, 0, x); return c; };
    const oo = mv(o), ww = mv(w);
    return { type: 'mcq', stem, options: oo.map((t, i) => ({ k: K[i], t })), answer: K[to], why: Object.fromEntries(ww.map((x, i) => [K[i], x])) };
  };
  const calc = (stem, unit, ans, tol, wrong, steps) => ({ type: 'calc', stem, unit, ans, tol, wrong, errors: wrong.map((w) => w[1]), steps });

  BAI_ADD({ mod: 'kn14', lessons: [

/* ------------------------------------------------------------------ 01 */
{ id: 'B:kn14-01', skill: 'channel', read: '6 phút', t: 'Ảnh cùng bó hoa trên Feed, Stories và Reels: ba bề mặt, ba việc khác nhau?',
  situation: 'Tiệm hoa ở Hà Nội có 4.000 người theo dõi trên Instagram. Chủ tiệm đăng cùng một bó hoa lên Feed, rồi lặp lại trên Stories và Reels. Feed tiếp cận 900 tài khoản, Stories 350 tài khoản xem, Reels 6.200 lượt phát (một người có thể xem lặp lại, nên số tài khoản thấp hơn). Nhưng chỉ Stories dẫn tới 14 tin nhắn đặt hoa. Chủ tiệm không hiểu vì sao Reels “nhiều view nhất” mà không ra đơn.',
  concept: { name: 'Mỗi bề mặt một việc',
    body: 'Theo bài giải thích chính thức của Instagram, Feed, Stories, Explore, Reels và Tìm kiếm mỗi nơi có mô hình xếp hạng riêng, vì người ta dùng mỗi nơi cho một việc khác. Stories thường để xem những người gần mình; Explore và Reels để khám phá và giải trí. Với thương hiệu, cách nghĩ gọn là: <b>Stories để giữ và thúc người đã quen, Reels và Explore để gặp người chưa biết, Feed để trưng bày lâu dài</b>. Chọn bề mặt theo việc cần làm, rồi đo bằng chỉ số của đúng bề mặt đó. Nền tảng có thể đổi cách xếp hạng, nên luôn kiểm lại tài liệu chính thức.' },
  example: 'Chủ tiệm gán việc: Reels dùng để gặp người ở Hà Nội chưa biết tiệm, đo bằng số người xem hết và số người vào trang cá nhân. Stories dùng để thúc người đã theo dõi, kèm nhãn hỏi “mẫu nào cho 20/10?”, đo bằng số tin nhắn. Feed là nơi xếp bộ ảnh các mẫu hoa để ai vào trang cũng thấy. Cô không còn so 6.200 với 350, vì khác đơn vị (lượt phát với tài khoản) và làm hai việc khác nhau. Một điều nữa: khách nhắn từ Stories có thể đã thấy Reels trước đó, nên cô thêm câu hỏi “bạn biết tiệm từ đâu?” vào tin nhắn trả lời đầu tiên để biết Reels có góp phần không.',
  takeaway: 'Đừng so lượt xem giữa các bề mặt; hãy hỏi mỗi bề mặt đang làm việc gì rồi đo đúng việc đó.',
  apply: 'Chọn một sản phẩm của bạn. Nói trong 60 giây: bề mặt nào để gặp người mới, bề mặt nào để thúc người quen, và mỗi nơi đo bằng chỉ số gì.',
  mistakes: ['Đăng một bản sao y nguyên lên mọi bề mặt rồi so lượt xem như thể cùng một việc.', 'Coi bề mặt có nhiều lượt xem nhất là bề mặt “tốt nhất”, bỏ qua việc nó có làm đúng việc mình cần không.'],
  q: [
    mcq('Đoán trước: Reels có 6.200 lượt xem, Stories chỉ 350 người xem nhưng ra nhiều tin nhắn đặt hoa hơn. Điều gì nhiều khả năng nhất?',
      ['Reels kém chất lượng nên nền tảng không cho người xem hành động tiếp ở bất kỳ nội dung nào khác', 'Reels đang đến với người chưa quen, còn Stories đến với người đã sẵn sàng hỏi', 'Số liệu Stories sai vì lượt xem Stories không bao giờ đáng tin cậy', 'Người xem Reels không dùng tin nhắn nên không thể đặt hoa qua đó'], 'b',
      ['Không có cơ sở để nói Reels kém chất lượng chỉ từ hai con số này.', 'Đúng. Hai bề mặt gặp hai nhóm người khác nhau, nên hành động khác nhau là điều dễ hiểu.', 'Không có lý do để nghi số Stories; đó là số của chính tài khoản.', 'Người xem Reels vẫn có thể nhắn tin; vấn đề là họ chưa ở giai đoạn đặt hoa.']),
    mcq('Bạn làm gì với ngân sách thời gian của tuần tới để bán thêm hoa dịp 20/10?',
      ['Dồn toàn bộ vào Reels vì đó là nơi có nhiều lượt xem nhất hiện nay', 'Dùng Reels để gặp người mới, Stories để thúc người đã quen nhắn tin đặt hoa', 'Bỏ Stories vì chỉ có 350 người xem, chuyển hết sang Feed ổn định', 'Đăng cùng nội dung ở cả ba nơi, ít sửa, để tiết kiệm công dựng'], 'b',
      ['Lượt xem nhiều chưa chắc đúng việc; Stories đang chạm người sẵn sàng đặt.', 'Đúng. Mỗi bề mặt gán một việc rõ và đo bằng chỉ số của việc đó.', 'Bỏ Stories là bỏ nơi đang ra tin nhắn đặt hàng.', 'Sao chép không tận dụng khác biệt giữa các bề mặt.']),
    calc('Stories của tiệm có 350 người xem và 14 người nhắn tin đặt hoa. Tỉ lệ nhắn tin trên số người xem là bao nhiêu phần trăm?', '%', 4, 0.05,
      [[25, 'SAI_MAU_SO'], [0.04, 'NHAM_DIEM_PHAN_TRAM']],
      ['Tỉ lệ nhắn tin = số người nhắn ÷ số người xem Stories.', '14 ÷ 350 = 0,04 = <b>4%</b>.']),
    mcq('Chủ tiệm kết luận: “14 tin nhắn đều nhờ Stories, Reels không đóng góp gì.” Cách rẻ nhất để kiểm lại kết luận này?',
      ['Hỏi khách nhắn tới “bạn biết tiệm từ đâu, thấy video nào chưa?” rồi ghi lại', 'Tắt Reels một tuần, nếu tin nhắn từ Stories giảm thì Reels có đóng góp', 'Cộng lượt phát Reels với người xem Stories để ra tổng hiệu quả hai nơi', 'Lấy số tin nhắn chia cho lượt phát Reels để biết Reels ra đơn kém thế nào'], 'a',
      ['Đúng. Câu hỏi nguồn biết khách có đi qua Reels trước Stories không, gần như không tốn gì.', 'Tắt cả một bề mặt là cách tốn kém, và tuần đó còn lẫn yếu tố khác như ngày lễ.', 'Cộng hai đơn vị khác nhau không cho biết nơi nào dẫn tới tin nhắn.', 'Phép chia chỉ lặp lại số liệu bề mặt; không cho biết khách có thấy Reels trước đó hay không.']),
    mcq('Nhóm Stories của tiệm chỉ có 350 người xem. Đây có phải dấu hiệu nên bỏ Stories không?',
      ['Có, vì ít người xem nghĩa là bề mặt này không đáng đầu tư thời gian', 'Không, nếu bề mặt đó đang tạo ra hành động đúng việc với người đã quen', 'Có, vì Stories luôn kém hiệu quả hơn Reels ở mọi tài khoản thương hiệu', 'Không, vì cứ đăng Stories là tự nhiên sẽ được nhiều người xem hơn'], 'b',
      ['Quy mô nhỏ nhưng ra tin nhắn đặt hàng vẫn đang làm việc có ích.', 'Đúng. Bề mặt nên đánh giá theo việc nó làm, không chỉ theo quy mô.', 'Không có quy luật nào nói Stories luôn kém hơn Reels.', 'Không có đảm bảo như vậy; cần dựa vào số liệu thực tế.']),
    mcq('Chọn chỉ số hợp lý nhất để đo việc “gặp người chưa biết tiệm” trên Reels.',
      ['Số tin nhắn đặt hoa, vì đó là kết quả cuối cùng mong muốn', 'Số người xem hết Reels và số người vào trang cá nhân sau khi xem', 'Số lượt thích trên Stories của cùng ngày với Reels', 'Số người theo dõi tiệm vào cuối tháng so với đầu tháng'], 'b',
      ['Tin nhắn đặt hàng là việc của người đã sẵn sàng; người mới chưa tới bước đó.', 'Đúng. Xem hết và vào trang cá nhân là bước kế tiếp tự nhiên của người mới gặp.', 'Stories và Reels làm hai việc khác nhau; lượt thích Stories không đo Reels.', 'Follower cuối tháng gộp nhiều nguồn, khó gán cho Reels.']),
    mcq('Một đồng nghiệp nói “Instagram chắc chắn thích Reels nên hãy bỏ Feed”. Việc nên làm trước khi quyết?',
      ['Bỏ Feed ngay, vì nền tảng ưu tiên Reels thì bề mặt khác mất tác dụng', 'Xem người mới vào trang từ Reels có dừng ở Feed rồi mới nhắn tin hay không', 'Giữ nguyên Feed, vì nền tảng không bao giờ đổi cách xếp hạng các bề mặt', 'Bỏ Feed khi đối thủ cùng ngành đã bỏ trước, vì họ chắc đã kiểm số liệu'], 'b',
      ['Nền tảng ưu tiên một nơi không có nghĩa nơi khác hết việc; Feed là chỗ người mới xem thêm mẫu.', 'Đúng. Feed có thể là bước giữa của người mới; chỉ bỏ khi số liệu của kênh cho thấy không ai đi qua.', 'Nền tảng đổi cách xếp hạng được, nhưng đó không phải lý do để không kiểm.', 'Đối thủ có khách và chỉ số khác; bạn không biết họ bỏ vì lý do gì.']),
  ] },

/* ------------------------------------------------------------------ 02 */
{ id: 'B:kn14-02', skill: 'creative', read: '7 phút', t: 'Reels: xem hết, chia sẻ lại, thích, vào trang âm thanh — thiết kế cho điều nào?',
  situation: 'Một quán cà phê ở Đà Nẵng đăng Reels dài 55 giây giới thiệu menu mới. Báo cáo cho thấy 8.000 lượt xem nhưng chỉ 1.200 lượt xem hết video và 12 lượt chia sẻ lại. Một Reels khác dài 18 giây về “cách pha cà phê muối ở nhà” có 5.000 lượt xem, 2.800 lượt xem hết và 140 lượt chia sẻ lại. Quán đang phân vân nên quay kiểu nào tiếp.',
  concept: { name: 'Thiết kế Reels theo những điều nền tảng nói là nhìn kỹ',
    body: 'Năm 2021 Instagram mô tả rằng với Reels, các dự đoán quan trọng nhất là: bạn có <b>xem hết</b> không, có <b>thích</b> không, có thấy vui hay giải trí không (qua khảo sát) và có <b>vào trang âm thanh</b> không. Đầu 2025, người đứng đầu Instagram nói ba tín hiệu quan trọng nhất là thời gian xem, lượt thích và lượt gửi (<b>chia sẻ lại</b>); gửi quan trọng hơn khi tiếp cận người chưa theo dõi. Với người làm nội dung, đây không phải “mẹo qua mặt” mà là câu hỏi thiết kế: video có lý do để xem tới cuối, có lý do để gửi cho ai đó, và có âm thanh đáng để nghe tiếp không. Độ dài nên khớp với lời hứa: video chỉ đủ nội dung cho 18 giây mà kéo 55 giây thì người xem rời đi. Mô tả này có thể đã thay đổi; luôn kiểm lại.' },
  example: 'So hai Reels của quán. Reels 55 giây: xem hết 1.200 trên 8.000 lượt xem, tức 15%; chia sẻ lại 12. Reels 18 giây: xem hết 2.800 trên 5.000, tức 56%; chia sẻ lại 140. Chia sẻ lại: 1,5 so với 28 trên 1.000 lượt xem. Chênh lệch lớn, nhưng hai video khác cả độ dài, chủ đề lẫn mục đích: menu vốn ít người gửi cho bạn bè. Vì vậy đây mới là gợi ý để thử, chưa phải kết luận. Quán quay cùng một mẹo ở hai bản 18 và 40 giây, đăng cách nhau vài ngày, hai tuần sau so tỉ lệ xem hết và chia sẻ lại.',
  takeaway: 'Thiết kế Reels để có lý do xem hết và lý do gửi cho ai đó, rồi đo đúng hai việc đó.',
  apply: 'Chọn một Reels của bạn. Nói trong 60 giây: lý do để người ta xem tới cuối là gì, lý do để gửi cho bạn bè là gì, và độ dài có khớp với lời hứa không.',
  mistakes: ['Kéo dài video cho “đủ thông tin” khi lời hứa chỉ cần vài chục giây.', 'Chỉ nhìn tổng lượt xem, bỏ qua tỉ lệ xem hết và số lần được gửi lại.'],
  q: [
    mcq('Đoán trước: giữa hai Reels, một có nhiều lượt xem hơn, một có tỉ lệ xem hết và chia sẻ cao hơn. Bạn nên học từ Reels nào?',
      ['Reels nhiều lượt xem hơn, vì tổng lượt xem là thước đo tốt nhất', 'Reels có tỉ lệ xem hết và chia sẻ lại cao hơn', 'Không Reels nào, vì mỗi video là một trường hợp riêng không học được', 'Reels dài hơn, vì dài hơn nghĩa là nhiều giá trị hơn cho người xem'], 'b',
      ['Tổng lượt xem bỏ qua việc người xem có ở lại và có gửi lại không.', 'Đúng. Xem hết là dự đoán Instagram nêu rõ; chia sẻ lại là tín hiệu họ nói là quan trọng.', 'Mỗi video riêng nhưng so sánh các video vẫn rút ra được mẫu lặp lại.', 'Dài hơn không đồng nghĩa nhiều giá trị; có thể chỉ là kéo giãn.']),
    mcq('Quản lý nói: “Video 18 giây hơn hẳn nên mọi Reels phải ngắn.” Bạn làm gì để biết độ dài có thật là nguyên nhân?',
      ['Rút video menu 55 giây xuống 18 giây rồi so với bản cũ của chính video đó', 'Quay một mẹo ở hai bản 18 và 40 giây, đăng cách nhau vài ngày rồi so', 'Quay thêm mười video 18 giây thuộc nhiều chủ đề rồi lấy trung bình', 'Hỏi đối thủ trong ngành Reels của họ thường dài bao nhiêu giây'], 'b',
      ['Cắt từ 55 xuống 18 giây làm mất cả nội dung, nên vẫn lẫn độ dài với chủ đề.', 'Đúng. Giữ nguyên chủ đề và chỉ đổi độ dài thì chênh lệch mới quy được cho độ dài.', 'Mười video khác chủ đề vẫn lẫn nhiều yếu tố; trung bình không tách được độ dài.', 'Khách và nội dung của đối thủ khác bạn; số của họ không kiểm được kênh của bạn.']),
    calc('Reels 18 giây có 5.000 lượt xem và 2.800 lượt xem hết. Tỉ lệ xem hết là bao nhiêu phần trăm?', '%', 56, 0.1,
      [[178.6, 'SAI_MAU_SO'], [5.6, 'SAI_TINH_TOAN']],
      ['Tỉ lệ xem hết = lượt xem hết ÷ lượt xem.', '2.800 ÷ 5.000 = 0,56 = <b>56%</b>.']),
    calc('Reels 55 giây: 12 lượt chia sẻ lại trên 8.000 lượt xem. Reels 18 giây: 140 lượt trên 5.000 lượt xem. Số chia sẻ lại trên 1.000 lượt xem của Reels 18 giây gấp bao nhiêu lần Reels 55 giây?', 'lần', 18.7, 0.2,
      [[11.7, 'SAI_MAU_SO'], [1.6, 'SAI_TINH_TOAN']],
      ['Reels 55 giây: 12 ÷ 8.000 × 1.000 = 1,5 lượt; Reels 18 giây: 140 ÷ 5.000 × 1.000 = 28 lượt.', '28 ÷ 1,5 ≈ <b>18,7 lần</b>. So số tuyệt đối (140 ÷ 12 ≈ 11,7) bỏ qua việc hai video có số lượt xem khác nhau.']),
    mcq('Điều nào là một lý do tốt để người xem gửi Reels cho ai đó?',
      ['Video có logo thật lớn để người nhận biết ngay thương hiệu', 'Video có một mẹo hoặc câu chuyện đúng với một người cụ thể họ quen', 'Video có thật nhiều hiệu ứng chuyển cảnh chớp nhoáng', 'Video đăng đúng giờ cao điểm của cả tuần'], 'b',
      ['Logo lớn không tạo lý do để gửi; người ta gửi vì nội dung hợp với ai đó.', 'Đúng. Nội dung gợi một người cụ thể là lý do tự nhiên để chia sẻ lại.', 'Hiệu ứng nhanh có thể gây xem, nhưng chưa tạo lý do để gửi.', 'Giờ đăng không tạo ra lý do để gửi.']),
    mcq('Một nhân viên nói “Instagram chắc chắn thưởng cho video đăng nhiều nhất mỗi ngày”. Bạn nên làm gì?',
      ['Làm theo ngay, vì đăng nhiều thì xác suất được thưởng cao hơn', 'Kiểm lại với nguồn chính thức và số liệu kênh trước khi thay đổi lịch đăng', 'Phủ nhận hoàn toàn vì số lượng không bao giờ liên quan gì đến kết quả của bất kỳ tài khoản nào', 'Đăng gấp đôi để thử trong một tháng rồi rút ra kết luận chung'], 'b',
      ['Nhận định chắc chắn về thưởng cần nguồn; nguồn chính thức không nói vậy.', 'Đúng. Dựa vào mô tả chính thức và dữ liệu của kênh, không dựa vào lời đồn.', 'Phủ nhận tuyệt đối cũng là kết luận chưa kiểm chứng.', 'Đổi gấp đôi một lúc rồi chờ cả tháng là thử khó đọc kết quả.']),
    mcq('Reels của bạn có tỉ lệ xem hết thấp nhưng chia sẻ lại khá tốt. Điều gì nên xem xét trước?',
      ['Xem có đoạn nào làm người xem rời đi sớm rồi sửa đoạn đó', 'Bỏ hẳn video vì tỉ lệ xem hết thấp là dấu hiệu xấu tuyệt đối', 'Thêm nhiều hashtag hơn để tăng tỉ lệ xem hết', 'Đăng lại ngay cùng nội dung vào một giờ khác trong ngày'], 'a',
      ['Đúng. Kết hợp đường giữ chân với nội dung để tìm đoạn cần sửa.', 'Chia sẻ khá tốt cho thấy nội dung có giá trị; bỏ là phí.', 'Hashtag không sửa việc người xem rời đi.', 'Đăng lại không giải quyết vấn đề nằm ở nội dung.']),
  ] },

/* ------------------------------------------------------------------ 03 */
{ id: 'B:kn14-03', skill: 'creative', read: '6 phút', t: 'Bài để lưu lại: đo lượt lưu trên reach, không đo trái tim',
  situation: 'Một phòng tập yoga ở TP.HCM đăng hai bài. Bài A là ảnh giáo viên với câu “Chào tuần mới!”, 6.000 người tiếp cận, 420 lượt thích, 12 lượt lưu. Bài B là chuỗi 6 ảnh “5 tư thế giãn lưng cho dân văn phòng”, 4.000 người tiếp cận, 160 lượt thích, 180 lượt lưu. Quản lý chỉ nhìn lượt thích và nói bài A “tốt hơn”.',
  concept: { name: 'Lưu là lời hẹn quay lại',
    body: 'Instagram nêu rằng hoạt động của bạn như thích, chia sẻ, <b>lưu</b> và bình luận giúp họ hiểu bạn quan tâm gì. Với người làm nội dung, lượt lưu có ý nghĩa riêng: người ta lưu thứ mình muốn <b>dùng lại sau</b>, như một danh sách, một hướng dẫn, một công thức. Vì vậy với nội dung hướng dẫn, nên đo <b>lượt lưu trên reach</b> chứ không chỉ lượt thích. Một bài ít thích nhưng nhiều lưu cho thấy giá trị thực dụng; một bài nhiều thích mà không ai lưu thường là bài dễ chịu nhưng dễ quên.' },
  example: 'Tỉ lệ lưu trên reach: bài A 12 ÷ 6.000 = 0,2%; bài B 180 ÷ 4.000 = 4,5%. Bài B gấp hơn 20 lần dù ít thích hơn. Phòng tập nhận ra bài B làm đúng việc “để lại một thứ dùng được”. Họ lập loạt “dành cho dân văn phòng” mỗi tuần một bài, cuối bài gắn một lời mời thử buổi học, và theo dõi số người nhắn tin sau mỗi bài thay vì chỉ đếm lượt thích.',
  takeaway: 'Với nội dung hướng dẫn, hỏi “có ai lưu để dùng lại không” trước khi hỏi “có bao nhiêu trái tim”.',
  apply: 'Chọn một chủ đề bạn có thể dạy. Nói trong 60 giây: bài đó để người ta lưu lại dùng sau thế nào, và bạn đo lượt lưu trên reach ra sao.',
  mistakes: ['Chỉ đếm lượt thích rồi kết luận bài nào “tốt”, bỏ qua lượt lưu và chia sẻ.', 'Đăng nội dung hướng dẫn mà không có cấu trúc dễ lưu như danh sách hay bước.'],
  q: [
    mcq('Đoán trước: bài A nhiều thích nhưng ít lưu, bài B ít thích nhưng nhiều lưu. Bài nào đang làm việc hữu ích hơn cho phòng tập?',
      ['Bài A, vì nhiều thích hơn nghĩa là nhiều người thích hơn', 'Bài B, vì nhiều người giữ lại', 'Hai bài như nhau vì cả hai đều được tương tác', 'Không thể so được vì hai bài có kiểu nội dung khác nhau'], 'b',
      ['Lượt thích nhiều không nói gì về việc có ai dùng lại nội dung.', 'Đúng. Lưu cho thấy người ta giữ để dùng lại, một dấu hiệu giá trị thực dụng.', 'Hai bài làm hai việc khác; không thể coi là như nhau.', 'Vẫn so được nếu so đúng thước đo cho đúng mục tiêu của từng bài.']),
    mcq('Bạn làm gì với loạt bài tuần tới của phòng tập?',
      ['Đăng thêm ảnh giáo viên vì ảnh này có nhiều lượt thích nhất', 'Làm chuỗi hướng dẫn mỗi tuần một chủ đề dễ lưu, gắn lời mời thử buổi học', 'Chỉ đăng bài khuyến mãi mỗi ngày vì khuyến mãi đem lại đơn nhanh nhất và dễ đo nhất', 'Đổi sang đăng ngắn hơn một ảnh duy nhất cho mọi bài'], 'b',
      ['Nhiều thích chưa chắc mang lại người nhắn tin hay quay lại.', 'Đúng. Nội dung dễ lưu kèm lời mời rõ phục vụ cả giá trị và hành động.', 'Chỉ khuyến mãi bỏ qua việc xây giá trị trước khi mời mua.', 'Một ảnh duy nhất không hợp với nội dung gồm nhiều bước cần lưu.']),
    calc('Bài B có 4.000 người tiếp cận và 180 lượt lưu. Tỉ lệ lưu trên reach là bao nhiêu phần trăm?', '%', 4.5, 0.05,
      [[22.2, 'SAI_MAU_SO'], [0.045, 'NHAM_DIEM_PHAN_TRAM']],
      ['Tỉ lệ lưu = lượt lưu ÷ reach.', '180 ÷ 4.000 = 0,045 = <b>4,5%</b>.']),
    mcq('Tỉ lệ lưu của bài A là 0,2%, của bài B là 4,5%. Cách nói đúng về hai con số này là gì?',
      ['Bài B hơn bài A 4,3 điểm phần trăm, tức gấp khoảng 22 lần', 'Bài B hơn bài A 4,3%, vì lấy 4,5 trừ 0,2 ra mức hơn', 'Bài B hơn bài A khoảng 4.300 lần, vì lấy số lưu chia cho nhau', 'Bài B hơn bài A 450%, vì 4,5 nhân với 100 ra mức hơn'], 'a',
      ['Đúng. Hiệu hai tỉ lệ là điểm phần trăm; tỉ số 4,5 ÷ 0,2 ≈ 22 lần.', 'Hiệu hai tỉ lệ là điểm phần trăm, không phải phần trăm tăng.', 'Con số 4.300 lần là sai đơn vị; so tỉ lệ chứ không so số lưu thô.', 'Nhân 100 không cho mức hơn; đó chỉ là đổi tỉ lệ ra phần trăm.']),
    mcq('Nội dung nào dễ được lưu lại nhất với một tiệm làm tóc?',
      ['Ảnh khách vừa làm tóc xong với dòng chữ “Cảm ơn bạn!”', 'Bộ ảnh 5 kiểu buộc tóc nhanh cho buổi sáng bận rộn có từng bước', 'Ảnh không gian tiệm lúc sáng sớm kèm một câu chào buổi sáng', 'Video quay lại cảnh nhân viên pha trà đãi khách đến tiệm'], 'b',
      ['Ảnh cảm ơn có thể được thích nhưng ít lý do để lưu.', 'Đúng. Có bước làm theo là kiểu nội dung người ta giữ lại để dùng sau.', 'Ảnh không gian tạo cảm giác tốt nhưng không có giá trị dùng lại.', 'Cảnh pha trà không có gì để lưu cho việc sau.']),
    mcq('Bài của bạn có nhiều lượt lưu nhưng ít người nhắn tin hỏi mua. Điều gì nên làm tiếp?',
      ['Coi lượt lưu là vô nghĩa và chỉ theo dõi lượt thích', 'Thêm bước nối từ giá trị sang hành động, như lời mời cụ thể cuối bài', 'Đăng lại đúng bài đó mỗi ngày cho đến khi có người hỏi mua, rồi mới nghĩ tới việc khác', 'Xoá các bài ít người hỏi để trang trông gọn hơn'], 'b',
      ['Lượt lưu vẫn có ý nghĩa; chỉ là chưa nối tới hành động.', 'Đúng. Giá trị đã có, cần thêm một bước mời hành động rõ ràng.', 'Đăng lại một bài mỗi ngày không thêm bước nối nào.', 'Xoá bài hữu ích là phí giá trị đã có.']),
    mcq('Điều nào đúng về việc dùng lượt lưu làm thước đo?',
      ['Lượt lưu tính trên reach cho biết bài có giá trị dùng lại tương đối', 'Lượt lưu luôn quan trọng hơn mọi chỉ số khác ở mọi loại bài', 'Lượt lưu chỉ có ý nghĩa với tài khoản trên một triệu người theo dõi', 'Lượt lưu không liên quan gì tới việc người xem có quay lại hay không'], 'a',
      ['Đúng. Quy về reach để so các bài có quy mô khác nhau.', 'Không chỉ số nào luôn quan trọng nhất; phụ thuộc mục tiêu của bài.', 'Quy mô tài khoản không quyết định ý nghĩa của lượt lưu.', 'Lưu là một dấu hiệu người xem muốn quay lại với nội dung.']),
  ] },

/* ------------------------------------------------------------------ 04 */
{ id: 'B:kn14-04', skill: 'channel', read: '6 phút', t: 'Stories: người xem chạm vào, trả lời hay lướt sang — bạn thiết kế cho điều nào?',
  situation: 'Một thương hiệu quần áo trẻ em đăng 9 Stories mỗi ngày: ảnh sản phẩm, bảng giá, ảnh mẫu, rồi một đường dẫn. Người xem Story đầu là 1.000 người, tới Story thứ 5 còn 520, tới Story thứ 9 còn 180. Tuần này chỉ có 6 người trả lời Stories. Họ định đăng thêm cho chắc.',
  concept: { name: 'Stories: mời trả lời, đừng chỉ phát',
    body: 'Instagram mô tả rằng khi xếp hạng Stories, họ dự đoán bạn có <b>chạm vào story</b> không, có <b>trả lời</b> không và có <b>lướt sang story tiếp theo</b> không. Với người làm Stories, đây là gợi ý thiết kế: khung đầu phải có lý do để chạm vào, một khung cuối cùng có <b>lời mời trả lời cụ thể</b> (một câu hỏi, một lựa chọn) và chuỗi vừa đủ dài để người xem không lướt đi giữa chừng. Số khung cần thử và đo, không có con số “đúng” cho mọi tài khoản. Mỗi lần chỉ đổi một việc, và so tỉ lệ còn lại ở cùng vị trí khung, vì người xem rơi dần theo vị trí.' },
  example: 'Thương hiệu đo trước: còn 520 ÷ 1.000 = 52% ở khung 5 và 18% ở khung 9. Tuần 1 họ chỉ rút chuỗi còn 5 khung, giữ nguyên nội dung: còn lại ở khung 5 lên 61%, nhưng người trả lời chỉ từ 6 lên 7. Tuần 2, giữ chuỗi 5 khung, đổi khung 4 thành câu hỏi “bé nhà bạn size mấy?”: 58 người trả lời trên cùng khoảng 1.000 người xem khung đầu. Rút ngắn giữ được người, nhưng chính lời mời mới tạo ra trả lời. Con số minh hoạ.',
  takeaway: 'Một chuỗi Stories tốt có lý do để chạm vào đầu chuỗi và một lời mời trả lời cụ thể ở cuối.',
  apply: 'Mở chuỗi Stories gần nhất của bạn. Nói trong 60 giây: khung nào mời trả lời, bao nhiêu người còn ở khung cuối, và bạn sẽ rút hay đổi khung nào.',
  mistakes: ['Đăng thật nhiều khung vì nghĩ “càng nhiều càng được xem”, bỏ qua tỉ lệ người rời giữa chuỗi.', 'Không có khung nào mời người xem trả lời, rồi ngạc nhiên vì không ai nhắn tin.'],
  q: [
    mcq('Đoán trước: chỉ 18% người xem còn ở khung 9. Kết luận nào vững nhất?',
      ['Chuỗi quá dài, nên chắc chắn phải rút còn một nửa số khung hiện có', 'Chưa nói được chuỗi tệ; cần mốc cùng vị trí khung ở tuần trước', 'Người xem thích khung cuối nhất nên đưa khung đó lên đầu chuỗi', 'Mức 18% là bình thường với mọi tài khoản nên không cần quan tâm'], 'b',
      ['Một con số chưa đủ để chắc chắn; còn cần mốc so sánh trước khi rút bao nhiêu khung.', 'Đúng. Người xem rơi dần theo vị trí là bình thường; cần mốc cùng vị trí để biết có xấu đi không.', 'Chưa có bằng chứng người xem thích khung cuối; phần lớn chưa đến được đó.', 'Không có mức chung cho mọi tài khoản; chính vì vậy cần mốc của kênh mình.']),
    mcq('Bạn làm gì với chuỗi Stories của thương hiệu quần áo trẻ em tuần tới?',
      ['Đăng 12 khung mỗi ngày để người xem thấy nhiều sản phẩm hơn trong cùng một lượt xem', 'Tuần này chỉ rút còn 5 khung, giữ nguyên nội dung; tuần sau mới thêm khung hỏi', 'Bỏ Stories hoàn toàn vì chỉ 6 người trả lời tuần này', 'Giữ nguyên chuỗi 9 khung vì đã đăng như vậy cả tháng'], 'b',
      ['Thêm khung khi người xem đã rời nhiều giữa chuỗi làm vấn đề tệ hơn.', 'Đúng. Đổi từng việc một và đo lại, nên biết rút khung hay lời mời mới tạo ra khác biệt.', 'Bỏ Stories là bỏ bề mặt đang có người xem ở khung đầu.', 'Giữ nguyên khi số liệu đang kém là không học gì thêm.']),
    calc('Tuần 1 có 7 người trả lời, tuần 2 có 58 người trả lời, cùng khoảng 1.000 người xem khung đầu. Số trả lời tuần 2 gấp bao nhiêu lần tuần 1?', 'lần', 8.3, 0.1,
      [[51, 'NHAM_SO_TUYET_DOI'], [0.12, 'SAI_MAU_SO']],
      ['Cùng cơ sở 1.000 người xem, so thẳng hai số trả lời: 58 ÷ 7.', '58 ÷ 7 ≈ <b>8,3 lần</b>. Lấy hiệu 58 − 7 = 51 chỉ cho số người tăng thêm, không cho biết gấp mấy lần.']),
    mcq('Điều nào là lời mời trả lời cụ thể trong một Story?',
      ['Một nhãn hỏi “bé nhà bạn mặc size mấy?” kèm hai lựa chọn', 'Dòng chữ “Xem thêm sản phẩm ở link trong tiểu sử nhé!”', 'Một ảnh sản phẩm có logo thương hiệu thật lớn ở góc', 'Nhạc nền sôi động chạy suốt chuỗi cho đẹp mắt'], 'a',
      ['Đúng. Câu hỏi cụ thể kèm lựa chọn giúp người xem trả lời dễ dàng.', 'Dẫn tới link là lời mời khác, chưa phải mời trả lời tại chỗ.', 'Ảnh có logo không mời hành động nào.', 'Nhạc nền không mời người xem làm gì.']),
    mcq('Người trả lời Story qua tin nhắn nên được thương hiệu xử lý thế nào?',
      ['Gom lại trả lời một lượt vào cuối tuần để câu trả lời kỹ hơn và đỡ rời rạc', 'Trả lời sớm trong ngày, vì đó là người đã thể hiện sự quan tâm rõ nhất', 'Chỉ trả lời người hỏi giá, vì họ gần mua nhất; các câu khác để cuối tuần', 'Giao hết cho trả lời tự động để mọi tin nhắn đều được đáp ngay lập tức'], 'b',
      ['Trả lời muộn làm mất đúng lúc người đó đang quan tâm; kỹ hơn nhưng chậm là đánh đổi tồi.', 'Đúng. Phản hồi sớm tận dụng lúc quan tâm cao, cũng là một tín hiệu quan hệ.', 'Câu hỏi về size hay chất vải cũng là người sắp mua; lọc theo giá bỏ sót họ.', 'Trả lời tự động bỏ qua điều từng người hỏi và không xây được quan hệ.']),
    mcq('Chủ thương hiệu so 18% ở khung 9 của chuỗi cũ với 61% ở khung cuối của chuỗi 5 khung mới rồi kết luận chuỗi mới giữ người tốt hơn. Sai ở đâu?',
      ['Phải so bằng số người tuyệt đối chứ không dùng tỉ lệ phần trăm', 'So hai vị trí khác nhau; phải so cùng vị trí, như khung 5 với khung 5', 'Quá ít người để so bất kỳ tỉ lệ nào trong Stories của một tiệm', 'Phải chờ đủ một tháng, vì dưới một tháng mọi con số đều vô nghĩa'], 'b',
      ['Hai chuỗi có số người xem khác nhau nên tỉ lệ mới so được; số tuyệt đối thì không.', 'Đúng. Người xem rơi dần theo vị trí; khung cuối của chuỗi ngắn tự nhiên còn nhiều hơn khung 9 của chuỗi dài.', 'Số người nhỏ làm kết quả dao động, nhưng lỗi chính là so hai vị trí khác nhau.', 'Không có mốc một tháng cố định; so cùng vị trí khung đã đọc được từ vài ngày dữ liệu.']),
    mcq('Chọn câu mô tả đúng nhất giá trị của việc biết Instagram dự đoán “chạm vào, trả lời, lướt sang”.',
      ['Đó là mẹo để qua mặt hệ thống và được hiển thị nhiều hơn', 'Đó là gợi ý thiết kế: cho người xem lý do chạm, trả lời và ở lại', 'Đó là quy định bắt buộc mọi chuỗi Stories phải có đủ ba hành động', 'Đó là con số cố định về số khung nên có trong một chuỗi'], 'b',
      ['Mô tả chính thức không phải mẹo qua mặt; nó là mô tả cách xếp hạng.', 'Đúng. Dùng nó để thiết kế nội dung tốt cho người xem, không để “lách”.', 'Không có quy định bắt buộc như vậy.', 'Không có con số khung cố định trong mô tả chính thức.']),
  ] },

/* ------------------------------------------------------------------ 05 */
{ id: 'B:kn14-05', skill: 'channel', read: '6 phút', t: 'Trang cá nhân là trang đích: khách ghé vào thấy gì trong 5 giây?',
  situation: 'Một thương hiệu nến thơm có Reels được 40.000 lượt xem, đem về 2.400 lượt ghé trang cá nhân. Tuần đó chỉ 96 người bấm vào link trong tiểu sử. Trang cá nhân ghi “Thắp lên khoảnh khắc ✨”, ảnh đại diện là một cây nến trong bóng tối, không có Stories nổi bật, và link dẫn tới trang chủ có 300 sản phẩm.',
  concept: { name: 'Trang cá nhân là một trang đích',
    body: 'Người ghé trang cá nhân đã dừng lại vì một nội dung; họ cần nhanh chóng biết <b>bạn là ai, bán gì cho ai, và bước kế tiếp là gì</b>. Một trang cá nhân hiệu quả có bốn phần rõ: ảnh đại diện nhận ra được, tiểu sử nói thẳng việc bạn làm và cho ai, mục nổi bật trả lời các câu hỏi hay gặp (giá, giao hàng, cách đặt), và một đường dẫn đưa tới đúng nơi người ta cần, không phải tới cả cửa hàng. Đo bằng <b>tỉ lệ ghé trang rồi bấm đường dẫn</b>.' },
  example: 'Tỉ lệ bấm đường dẫn: 96 ÷ 2.400 = 4%. Thương hiệu sửa bốn việc: tiểu sử “Nến thơm handmade từ sáp đậu nành · Giao nội thành Hà Nội trong 24 giờ”; mục nổi bật “Mùi hương nào hợp phòng ngủ?”, “Giao hàng & đổi trả”, “Khách nói gì”; ảnh đại diện có logo; đường dẫn đến một trang chỉ có 6 mẫu bán chạy. Hai tuần sau tỉ lệ bấm đường dẫn lên 9%, tức 216 người trên 2.400 lượt ghé.',
  takeaway: 'Trang cá nhân phải trả lời trong vài giây: bạn là ai, bán gì cho ai, và bấm vào đâu tiếp.',
  apply: 'Mở trang cá nhân của bạn như một người lạ. Nói trong 60 giây: trong 5 giây người ta hiểu được gì, và bạn sửa dòng tiểu sử hay đường dẫn nào trước.',
  mistakes: ['Viết tiểu sử bằng câu nghe hay nhưng không nói bạn bán gì cho ai.', 'Dẫn tới trang chủ có hàng trăm sản phẩm thay vì một nơi hẹp, đúng nhu cầu người vừa xem.'],
  q: [
    mcq('Đoán trước: 2.400 người ghé trang cá nhân nhưng chỉ 4% bấm đường dẫn. Phần nào của trang cá nhân nên xem trước?',
      ['Ảnh nền của Reels đã đăng vì đó là nguồn người ghé trang và quyết định họ ở lại hay thoát', 'Tiểu sử và đường dẫn, vì đó là nơi người ghé quyết định bước kế tiếp', 'Số lượt thích của các bài đã đăng trong suốt cả năm trước và các năm trước đó nữa', 'Giờ đăng bài của toàn tài khoản trong cả tháng qua'], 'b',
      ['Reels đã dẫn người đến; việc cần xem là họ thấy gì sau khi đến.', 'Đúng. Hai phần này nói bạn là ai và bấm vào đâu, tức bước chuyển đổi tại trang cá nhân.', 'Lượt thích cũ không quyết định bước kế tiếp của người vừa ghé.', 'Giờ đăng không ảnh hưởng điều người ghé trang thấy.']),
    mcq('Bạn làm gì với dòng tiểu sử “Thắp lên khoảnh khắc ✨”?',
      ['Giữ nguyên vì nghe thương hiệu và đã quen thuộc với khách cũ', 'Viết lại nói rõ bạn bán gì, cho ai, và một lý do hay điều kiện hấp dẫn', 'Xoá hết tiểu sử cho trang cá nhân nhìn gọn và tối giản hơn', 'Thêm nhiều biểu tượng cảm xúc để câu nổi bật hơn trên màn hình, vì biểu tượng dễ nhớ hơn mọi chữ khác'], 'b',
      ['Câu đẹp nhưng người lạ không biết bạn bán gì cho ai.', 'Đúng. Tiểu sử phải trả lời ngay: bán gì, cho ai, vì sao nên bấm.', 'Bỏ tiểu sử là bỏ một cơ hội nói rõ giá trị.', 'Thêm biểu tượng không làm thông tin rõ hơn.']),
    calc('Có 2.400 lượt ghé trang cá nhân và 96 người bấm đường dẫn. Tỉ lệ bấm đường dẫn là bao nhiêu phần trăm?', '%', 4, 0.05,
      [[25, 'SAI_MAU_SO'], [0.04, 'NHAM_DIEM_PHAN_TRAM']],
      ['Tỉ lệ bấm = lượt bấm ÷ lượt ghé trang.', '96 ÷ 2.400 = 0,04 = <b>4%</b>.']),
    mcq('Đường dẫn trong tiểu sử nên đưa người xem tới đâu để tăng khả năng họ làm bước tiếp theo?',
      ['Trang chủ có đủ 300 sản phẩm để họ tự chọn mọi thứ', 'Một trang hẹp, đúng sản phẩm hoặc ưu đãi mà nội dung vừa nhắc tới', 'Trang giới thiệu lịch sử công ty và đội ngũ để họ hiểu thương hiệu hơn trước khi mua', 'Trang đăng nhập tài khoản để họ tạo hồ sơ khách hàng trước'], 'b',
      ['Quá nhiều lựa chọn làm người vừa xem Reels lúng túng.', 'Đúng. Đường dẫn càng sát điều họ vừa xem thì càng dễ làm bước tiếp theo.', 'Lịch sử công ty không phải điều khiến họ bấm.', 'Bắt đăng nhập ngay là thêm một rào cản.']),
    mcq('Mục “nổi bật” của trang cá nhân nên chứa nội dung nào là hữu ích nhất cho người mới?',
      ['Các Stories gần đây nhất theo thứ tự thời gian đăng', 'Câu trả lời cho các câu hỏi hay gặp', 'Toàn bộ ảnh hậu trường nhân viên trong văn phòng', 'Các bài chúc mừng năm mới và lời cảm ơn khách của các năm trước'], 'b',
      ['Stories gần đây không chắc trả lời điều người mới đang hỏi.', 'Đúng. Trả lời trước các băn khoăn khiến người ta không bấm hay không mua.', 'Hậu trường không giải quyết băn khoăn mua hàng.', 'Lời chúc cũ không giúp người mới đưa ra quyết định.']),
    mcq('Sau khi sửa trang cá nhân, tỉ lệ bấm đường dẫn tăng từ 4% lên 9%. Bạn nên báo cáo thế nào?',
      ['Tăng 5%, vì 9 trừ 4 bằng 5 nên mức tăng là 5%', 'Tăng 5 điểm phần trăm, tức gấp khoảng 2,25 lần mức cũ', 'Tăng 225%, vì lấy 9 chia 4 rồi nhân với 100', 'Tăng 9%, vì đó là mức mới đạt được sau khi sửa'], 'b',
      ['Hiệu hai tỉ lệ là điểm phần trăm, không phải phần trăm tăng.', 'Đúng. 9 − 4 = 5 điểm; 9 ÷ 4 = 2,25 lần, tức tăng 125%.', '9 ÷ 4 = 2,25 là tỉ số; mức tăng là 125%, không phải 225%.', '9% là mức mới, không phải mức tăng.']),
    mcq('Điều nào là một cách đo sai khi đánh giá trang cá nhân?',
      ['So tỉ lệ bấm đường dẫn trên số lượt ghé trang trước và sau khi sửa', 'Chỉ đếm tổng số lượt bấm, không chia cho số lượt ghé trang', 'Đo trong cùng độ dài thời gian trước và sau, ghi chú các thay đổi khác', 'So hai tuần có cường độ đăng nội dung mới tương đương nhau'], 'b',
      ['Đây là cách đo đúng: chuẩn hoá theo số người ghé trang.', 'Đúng. Số tuyệt đối tăng có thể chỉ vì lượt ghé trang tăng, không phải vì trang tốt hơn.', 'Đo cùng độ dài thời gian và ghi chú thay đổi khác là cách làm tốt.', 'So hai tuần tương đương nhau là cách giảm nhiễu hợp lý.']),
  ] },

  ] });
})();
