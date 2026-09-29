/* MỤC LỤC BÀI HỌC MỚI (mã 'B:') — nhẹ, tải ở mọi trang.
   Nội dung từng bài nằm ở assets/js/data/bai/<mã module>.js, chỉ trang bài học tải file đó.
   Kế hoạch đầy đủ 70 module: KE-HOACH-700-BAI.md. Lược đồ: assets/js/data/bai/README.md.

   Phải tải SAU curriculum.js và TRƯỚC app.js: file này ghép module đã xuất bản vào STAGES/JOURNEY
   để hành trình, kỹ năng, "hôm nay" thấy bài mới mà không cần tải nội dung. */

const BAI_V = 3;   // tăng khi sửa nội dung bất kỳ file bài/*.js

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
