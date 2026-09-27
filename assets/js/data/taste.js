/* TASTE TRAINING — hai phương án dựng thật bằng CSS. Chọn trước, mổ xẻ sau. */
const T = {
  box:'position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;',
  mono:"font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;",
  serif:"font-family:'Fraunces',serif;font-weight:300;line-height:.92;letter-spacing:-.03em;",
  sans:"font-family:'Inter Tight',sans-serif;",
};

const TASTE = [
{ id:'ts-poster', kind:'Poster sự kiện', stronger:'b',
  brief:'Poster cho một buổi talk về nghề sáng tạo, dán ở trường đại học và đăng Instagram.',
  a:`<div style="${T.box}background:linear-gradient(135deg,#6D28D9,#2563EB);color:#fff;align-items:center;justify-content:center;text-align:center;gap:10px">
      <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.25)"></div>
      <div style="${T.sans}font-size:22px;font-weight:700;line-height:1.15">CREATIVE TALK 2026<br>Bứt Phá Giới Hạn</div>
      <div style="${T.sans}font-size:11px;opacity:.85;max-width:80%">Cùng nhau khám phá hành trình sáng tạo và truyền cảm hứng bất tận</div>
      <div style="${T.sans}font-size:10px;font-weight:600;background:#fff;color:#2563EB;padding:7px 16px;border-radius:99px">ĐĂNG KÝ NGAY</div>
      <div style="${T.sans}font-size:9px;opacity:.7">20.09.2026 · Hội trường A</div>
     </div>`,
  b:`<div style="${T.box}background:#F0EDE6;color:#15120E;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(21,18,14,.25);padding-bottom:7px">
        <span style="${T.mono}">Talk 04</span><span style="${T.mono}">20.09 · 19:00</span></div>
      <div style="${T.serif}font-size:47px;margin:12px 0 0">Nghề<br><em style="font-style:italic">sáng tạo</em><br>không lãng<br>mạn</div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid rgba(21,18,14,.25);padding-top:7px">
        <span style="${T.sans}font-size:9.5px;max-width:58%;line-height:1.35;opacity:.7">Ba art director kể phần công việc không ai đăng lên portfolio.</span>
        <span style="${T.mono}">Hội trường A</span></div>
     </div>`,
  read:[
   ['Hierarchy','A có bốn thứ cùng đòi được đọc trước: hình tròn, tên sự kiện, mô tả, nút. Mắt không biết đi đâu. B có một điểm vào duy nhất là dòng chữ lớn, phần còn lại tự xếp sau.'],
   ['Typography','A dùng một font sans cho mọi cấp độ, phân biệt bằng đậm nhạt — cách phân cấp yếu nhất. B đặt serif oversized cạnh mono nhỏ: tương phản đến từ hai giọng khác nhau, không đến từ kích thước.'],
   ['Composition','A căn giữa mọi thứ, khoảng trắng bị chia đều nên không có nhịp. B dùng lưới bất đối xứng có hai đường kẻ neo trên–dưới, khoảng trống dồn về một phía nên trở thành chủ ý.'],
   ['Message','“Bứt phá giới hạn” không nói gì về buổi talk này. “Nghề sáng tạo không lãng mạn” có quan điểm, và một quan điểm là thứ khiến người ta dừng lại.'],
   ['Distinctiveness','A có thể là poster của bất kỳ sự kiện nào, đổi tên là dùng được — dấu hiệu rõ nhất của thiết kế mẫu. B khó hoán đổi vì chữ và bố cục gắn với đúng nội dung này.'],
   ['Emotional response','Gradient tím–xanh và nút bo tròn phát tín hiệu "quảng cáo", nên người xem tự động phòng thủ. Nền giấy và chữ in phát tín hiệu "ấn phẩm", nên người xem đọc.']]},

{ id:'ts-landing', kind:'Landing page', stronger:'a',
  brief:'Trang giới thiệu một khoá học viết nội dung, nhóm khách là người mới đi làm.',
  a:`<div style="${T.box}background:#15120E;color:#F0EDE6;justify-content:center;gap:14px">
      <span style="${T.mono}color:#C2410C">Khoá 12 · Còn 9 chỗ</span>
      <div style="${T.serif}font-size:34px">Viết để<br>người ta<br>đọc hết</div>
      <div style="${T.sans}font-size:10.5px;line-height:1.5;opacity:.72;max-width:78%">6 buổi, mỗi buổi sửa trực tiếp bài của bạn. Không lý thuyết chép lại từ sách.</div>
      <div style="display:flex;gap:8px;align-items:center">
        <span style="${T.mono}background:#C2410C;color:#fff;padding:8px 14px">Giữ chỗ</span>
        <span style="${T.mono}opacity:.55">2.400.000đ</span></div>
     </div>`,
  b:`<div style="${T.box}background:#fff;color:#0F172A;gap:9px">
      <div style="display:flex;gap:5px;align-items:center"><div style="width:16px;height:16px;background:#6366F1;border-radius:4px"></div><span style="${T.sans}font-size:10px;font-weight:700">ContentPro</span></div>
      <div style="${T.sans}font-size:19px;font-weight:800;line-height:1.2;margin-top:6px">Nền tảng học viết content #1 Việt Nam</div>
      <div style="${T.sans}font-size:9.5px;color:#64748B;line-height:1.5">Giải pháp toàn diện giúp bạn nâng tầm kỹ năng viết và bứt phá sự nghiệp trong kỷ nguyên số</div>
      <div style="display:flex;gap:6px;margin-top:2px">
        <span style="${T.sans}font-size:9px;background:#6366F1;color:#fff;padding:6px 12px;border-radius:8px">Bắt đầu ngay</span>
        <span style="${T.sans}font-size:9px;border:1px solid #E2E8F0;padding:6px 12px;border-radius:8px">Tìm hiểu thêm</span></div>
      <div style="display:flex;gap:6px;margin-top:10px">
        ${[1,2,3].map(()=>`<div style="flex:1;border:1px solid #E2E8F0;border-radius:8px;padding:7px"><div style="width:12px;height:12px;background:#EEF2FF;border-radius:3px;margin-bottom:5px"></div><div style="height:4px;background:#E2E8F0;border-radius:2px;margin-bottom:3px"></div><div style="height:4px;width:70%;background:#F1F5F9;border-radius:2px"></div></div>`).join('')}
      </div>
     </div>`,
  read:[
   ['Hierarchy','B chia sự chú ý cho hai nút ngang cấp và ba thẻ trống — người dùng phải chọn giữa bốn hành động. A chỉ có một việc để làm.'],
   ['Typography','B dùng sans đậm cho mọi cấp, thêm chữ xám nhạt cho phần mô tả — sự tương phản duy nhất là độ đậm. A đặt serif lớn cạnh mono nhỏ, tạo hai lớp giọng nói rõ ràng.'],
   ['Message','“Nền tảng học viết content #1 Việt Nam” là tuyên bố về mình. “Viết để người ta đọc hết” là kết quả của khách, và nó là lý do người ta đăng ký.'],
   ['Distinctiveness','Bộ thẻ ba cột, biểu tượng bo góc, tím indigo — đây là mẫu giao diện lặp lại ở hàng nghìn trang. Che tên đi thì không nhận ra ai.'],
   ['Brand fit','Một khoá dạy viết mà trang chủ viết bằng ngôn ngữ chung chung là tự phủ định lời hứa. A chứng minh năng lực ngay trên chính trang bán hàng.'],
   ['Emotional response','Ba thẻ trống chưa có nội dung tạo cảm giác chưa hoàn thiện; dòng "còn 9 chỗ" trong A là khan hiếm có thật, kiểm chứng được, không cần đồng hồ đếm ngược.']]},

{ id:'ts-pack', kind:'Bao bì', stronger:'b',
  brief:'Bao bì cà phê rang xay, bán ở cửa hàng đặc sản và trên sàn thương mại điện tử.',
  a:`<div style="${T.box}background:#3B2314;color:#F5E6D3;align-items:center;justify-content:center;text-align:center;gap:8px">
      <div style="${T.mono}opacity:.6">PREMIUM QUALITY</div>
      <div style="width:34px;height:34px;border:2px solid #C9A227;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:serif;color:#C9A227">✦</div>
      <div style="font-family:Georgia,serif;font-size:20px;letter-spacing:.14em;color:#C9A227">HIGHLAND<br>GOLD</div>
      <div style="${T.mono}opacity:.55">ARABICA · 100% NATURAL</div>
      <div style="${T.mono}opacity:.45;margin-top:2px">EST. 2019 · VIETNAM</div>
     </div>`,
  b:`<div style="${T.box}background:#E8E2D5;color:#15120E;justify-content:space-between">
      <div style="display:flex;justify-content:space-between"><span style="${T.mono}">Lô 041</span><span style="${T.mono}">250g</span></div>
      <div>
        <div style="${T.serif}font-size:40px;line-height:.9">Cầu<br>Đất</div>
        <div style="${T.sans}font-size:10px;line-height:1.5;margin-top:9px;opacity:.75">Arabica · 1.550m · lên men yếm khí 36 giờ<br>Rang ngày 04.08 · vị: mận, ca cao, mật mía</div>
      </div>
      <div style="border-top:1px solid rgba(21,18,14,.3);padding-top:7px;display:flex;justify-content:space-between">
        <span style="${T.mono}">Nông trại Bảo Lộc</span><span style="${T.mono}">Espresso / Filter</span></div>
     </div>`,
  read:[
   ['Hierarchy','A đặt bốn dòng chữ nhỏ quanh một biểu tượng ở giữa: không dòng nào thắng. B cho tên vùng trồng chiếm không gian lớn nhất, đúng thứ khách đặc sản tìm.'],
   ['Typography','Serif dàn chữ thưa cộng màu vàng đồng là bộ ký hiệu "sang trọng" mặc định mà hàng nghìn thương hiệu dùng, nên nó không còn phát tín hiệu gì. B để thông tin thật làm việc.'],
   ['Message','“Premium quality”, “100% natural” là những từ không ai kiểm chứng nên không ai tin. Độ cao 1.550m, rang ngày 04.08 — cụ thể, kiểm chứng được, và chính là bằng chứng cho giá.'],
   ['Distinctiveness','Trên kệ, A biến mất giữa những túi nâu–vàng giống hệt. Nền giấy sáng của B nổi bật vì đi ngược quy ước của category.'],
   ['Brand fit','Khách mua cà phê đặc sản đọc thông số như đọc nhãn rượu vang. Bao bì B nói đúng ngôn ngữ đó; bao bì A nói ngôn ngữ quà tặng.'],
   ['Composition','B dùng ba khối tách bằng đường kẻ mảnh, để một khoảng trống lớn ở giữa. Khoảng trống có chủ đích trên bao bì là tín hiệu tự tin đắt tiền nhất.']]},

{ id:'ts-identity', kind:'Nhận diện thương hiệu', stronger:'b',
  brief:'Nhận diện cho một phòng khám nha khoa mới ở khu dân cư.',
  a:`<div style="${T.box}background:#fff;color:#0EA5E9;align-items:center;justify-content:center;gap:12px">
      <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#38BDF8,#0EA5E9);display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px">🦷</div>
      <div style="${T.sans}font-size:17px;font-weight:700;letter-spacing:.02em;color:#0F172A">SmileCare Dental</div>
      <div style="${T.sans}font-size:9.5px;color:#64748B;font-style:italic">Nụ cười của bạn, sứ mệnh của chúng tôi</div>
      <div style="display:flex;gap:5px">${['#0EA5E9','#38BDF8','#7DD3FC','#E0F2FE'].map(c=>`<div style="width:17px;height:17px;background:${c};border-radius:4px"></div>`).join('')}</div>
     </div>`,
  b:`<div style="${T.box}background:#F5F2EC;color:#123B33;justify-content:space-between">
      <div style="${T.serif}font-size:40px;line-height:.9">an<br>nhiên</div>
      <div style="display:flex;gap:5px;align-items:center">
        <div style="width:26px;height:26px;border:1.5px solid #123B33;border-radius:50% 50% 50% 0"></div>
        <span style="${T.mono}">Nha khoa · Q.7</span></div>
      <div style="border-top:1px solid rgba(18,59,51,.3);padding-top:8px">
        <div style="${T.sans}font-size:10px;line-height:1.5;opacity:.8">Hẹn đúng giờ. Báo giá trước khi làm.<br>Không bán thêm thứ bạn không cần.</div>
        <div style="display:flex;gap:5px;margin-top:9px">${['#123B33','#E5DFD3','#C2410C'].map(c=>`<div style="width:15px;height:15px;background:${c}"></div>`).join('')}</div>
      </div>
     </div>`,
  read:[
   ['Distinctiveness','Xanh dương và biểu tượng chiếc răng là mặc định của toàn ngành nha khoa. Bảng màu xanh rêu–kem–cam đất của B khiến phòng khám được nhận ra ngay cả khi che tên.'],
   ['Message','“Nụ cười của bạn, sứ mệnh của chúng tôi” là câu rỗng. “Hẹn đúng giờ. Báo giá trước khi làm.” chạm đúng ba nỗi sợ thật khi đi nha sĩ: chờ lâu, đau, và bị bán thêm.'],
   ['Typography','A dùng sans đậm cộng một dòng in nghiêng — kết hợp không có ý đồ. B đặt serif chữ thường nhỏ nhẹ, phù hợp với một cái tên nói về sự bình tĩnh.'],
   ['Composition','A xếp mọi thứ vào trục giữa nên nhìn như một mẫu có sẵn. B để tên chiếm góc trên trái và thông tin dồn xuống dưới, tạo khoảng thở ở giữa.'],
   ['Brand fit','Emoji trong logo phát tín hiệu tạm bợ, điều tối kỵ với một dịch vụ y tế cần cảm giác an tâm.'],
   ['Emotional response','Gradient xanh sáng gợi không khí bệnh viện. Nền kem và xanh rêu gợi phòng chờ yên tĩnh — đúng cảm xúc mà một người sợ nha sĩ đang cần.']]},

{ id:'ts-ooh', kind:'Biển ngoài trời', stronger:'a',
  brief:'Biển quảng cáo bên đường lớn, người đi ngang nhìn thấy trong khoảng 3 giây.',
  a:`<div style="${T.box}background:#C2410C;color:#fff;justify-content:center">
      <div style="${T.serif}font-size:46px;line-height:.88">Hết pin<br>lúc 6 giờ<br>chiều?</div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:14px">
        <span style="${T.sans}font-size:11px;opacity:.85">Trạm sạc ngay lối ra số 4</span>
        <span style="${T.mono}">VOLT</span></div>
     </div>`,
  b:`<div style="${T.box}background:#0F172A;color:#fff;justify-content:center;gap:7px">
      <div style="${T.sans}font-size:14px;font-weight:700">VOLT ENERGY SOLUTIONS</div>
      <div style="${T.sans}font-size:9.5px;opacity:.75;line-height:1.5">Hệ thống trạm sạc thông minh với công nghệ tiên tiến hàng đầu, mang đến trải nghiệm tiện lợi và bền vững cho mọi hành trình của bạn</div>
      <div style="display:flex;gap:8px;margin-top:4px">${['24/7 Hỗ trợ','120+ Trạm','Sạc nhanh 30p'].map(x=>`<span style="${T.sans}font-size:8px;border:1px solid rgba(255,255,255,.3);padding:4px 7px;border-radius:99px">${x}</span>`).join('')}</div>
      <div style="${T.sans}font-size:8px;opacity:.6;margin-top:5px">www.voltenergy.vn · hotline 1900 xxxx · @voltenergy</div>
     </div>`,
  read:[
   ['Hierarchy','Biển ngoài trời chỉ có một cấp độ. A có đúng một câu đọc được ở tốc độ 50 km/h. B có sáu khối thông tin, tức là không khối nào được đọc.'],
   ['Message','A hỏi một câu đúng vào tình huống người lái đang ở trong (category entry point), rồi trả lời ngay bằng chỉ dẫn hành động. B mô tả công ty, thứ không ai quan tâm khi đang lái xe.'],
   ['Typography','Chữ oversized của A dùng chính kích thước làm phương tiện. Sans 14px và các thẻ bo tròn của B là ngôn ngữ của giao diện web, đặt sai môi trường.'],
   ['Distinctiveness','Một mảng cam đặc trên đường phố xám sẽ được nhìn thấy trước khi được đọc. Nền xanh đen chìm vào nền cảnh đô thị.'],
   ['Composition','A dồn chữ về mép trái và để trống phần dưới phải — mắt đọc theo một đường duy nhất. B căn giữa và dàn đều, không có điểm vào.'],
   ['Emotional response','Câu hỏi tạo một khoảng hở trong đầu người xem, và não tự động muốn lấp. Danh sách tính năng thì không tạo khoảng hở nào.']]},

{ id:'ts-social', kind:'Bài đăng thương hiệu', stronger:'b',
  brief:'Một bài đăng Instagram cho thương hiệu bánh mì, trong feed đầy nội dung ăn uống.',
  a:`<div style="${T.box}background:#FEF3C7;color:#78350F;align-items:center;justify-content:center;text-align:center;gap:9px">
      <div style="${T.sans}font-size:8px;letter-spacing:.2em">🥖 BÁNH MÌ HOÀNG 🥖</div>
      <div style="${T.sans}font-size:20px;font-weight:800;line-height:1.15">ƯU ĐÃI CỰC SỐC<br>MUA 2 TẶNG 1</div>
      <div style="${T.sans}font-size:9.5px">Áp dụng từ 01.09 – 15.09.2026<br>Nhanh tay đặt hàng ngay hôm nay!</div>
      <div style="${T.sans}font-size:9px;font-weight:700;background:#DC2626;color:#fff;padding:6px 14px;border-radius:99px">ĐẶT NGAY 📞</div>
     </div>`,
  b:`<div style="${T.box}background:#15120E;color:#F0EDE6;justify-content:space-between">
      <span style="${T.mono}opacity:.6">Ghi chép của lò · 06:12</span>
      <div style="${T.serif}font-size:29px;line-height:.95">Ổ thứ<br>bốn mươi<br>hai</div>
      <div style="${T.sans}font-size:9.5px;line-height:1.55;opacity:.78">Trời nồm, bột nở nhanh hơn 20 phút.<br>Hôm nay vỏ giòn hơn thường lệ. Ai đến trước 7h sẽ biết điều đó.</div>
      <div style="border-top:1px solid rgba(240,237,230,.25);padding-top:7px;${T.mono}">Bánh mì Hoàng · 14 Ngô Quyền</div>
     </div>`,
  read:[
   ['Message','A hô khẩu hiệu khuyến mãi, thứ người ta lướt qua theo phản xạ. B kể một chi tiết nghề nghiệp mà chỉ người làm bánh thật mới biết — và chính chi tiết đó là quảng cáo.'],
   ['Distinctiveness','Vàng kem, emoji, chữ in đậm và nút đỏ bo tròn là mẫu chung của mọi bài khuyến mãi. Nền đen và serif của B tạo một khoảng lặng trong feed đang ồn.'],
   ['Typography','Emoji thay cho phân cấp là dấu hiệu của thiết kế không có hệ thống. B phân cấp bằng ba loại chữ có vai trò rõ ràng: nhãn, tiêu đề, phần thân.'],
   ['Hierarchy','A có bốn khối cùng cỡ và cùng độ đậm. B có một tiêu đề, một đoạn thân, hai nhãn nhỏ — mắt biết đọc theo thứ tự nào.'],
   ['Brand fit','Khuyến mãi mua 2 tặng 1 dạy khách chờ giảm giá. Chuỗi ghi chép hằng ngày dạy khách quay lại đúng giờ — hai hành vi rất khác nhau về giá trị lâu dài.'],
   ['Emotional response','A tạo áp lực mua. B tạo cảm giác được kể cho nghe một chuyện riêng, và đó là thứ khiến người ta bấm theo dõi.']]},
];

TASTE.push(
{ id:'ts-menu', kind:'Menu quán ăn', stronger:'b',
  brief:'Menu treo tường của một quán cơm văn phòng, khách xếp hàng và quyết định trong khoảng 20 giây.',
  a:`<div style="${T.box}background:#7F1D1D;color:#FEF3C7;justify-content:flex-start;gap:5px">
      <div style="${T.sans}font-size:15px;font-weight:800;text-align:center;margin-bottom:4px">🍚 THỰC ĐƠN ĐA DẠNG 🍚</div>
      ${['Cơm gà xối mỡ','Cơm sườn nướng','Cơm bò lúc lắc','Cơm cá kho tộ','Cơm tấm bì chả','Bún thịt nướng','Miến gà','Phở bò','Hủ tiếu','Cơm chiên dương châu','Mì xào bò','Cháo sườn'].map((x,i)=>
        `<div style="${T.sans}font-size:9px;display:flex;justify-content:space-between;border-bottom:1px dotted rgba(254,243,199,.3);padding-bottom:2px"><span>${x}</span><span>${45+i}.000</span></div>`).join('')}
      <div style="${T.sans}font-size:8px;text-align:center;margin-top:4px;opacity:.8">Và nhiều món khác — hỏi nhân viên</div>
     </div>`,
  b:`<div style="${T.box}background:#F5F2EC;color:#15120E;justify-content:space-between">
      <div><span style="${T.mono}">Hôm nay · Thứ Tư</span></div>
      <div>
        <div style="${T.serif}font-size:29px;line-height:.95">Cơm gà<br>xối mỡ</div>
        <div style="${T.sans}font-size:10px;opacity:.7;margin-top:6px">Gà ta, da giòn, kèm canh rong biển — 55.000</div>
      </div>
      <div style="border-top:1px solid rgba(21,18,14,.25);padding-top:8px">
        <div style="${T.mono}margin-bottom:6px">Luôn có</div>
        ${[['Cơm sườn nướng','55.000'],['Cơm cá kho tộ','60.000'],['Bún thịt nướng','50.000']].map(([n,p])=>
          `<div style="${T.sans}font-size:10.5px;display:flex;justify-content:space-between;padding:3px 0"><span>${n}</span><span style="opacity:.6">${p}</span></div>`).join('')}
      </div>
     </div>`,
  read:[
   ['Hierarchy','A cho 12 món cùng một cỡ chữ, cùng một sức nặng — khách phải tự sắp xếp, mà trong 20 giây thì họ không làm nổi. B quyết định hộ: một món hôm nay, ba món luôn có.'],
   ['Message','“Thực đơn đa dạng” là lợi ích của quán, không phải của khách. Với người xếp hàng, đa dạng là một gánh nặng chứ không phải một lời mời.'],
   ['Composition','A dàn đều kín mặt, không có khoảng nghỉ nào cho mắt. B chia ba khối rõ, để trống ở giữa, nên mắt biết dừng ở đâu trước.'],
   ['Typography','Chữ đậm cộng emoji là cách phân cấp bằng âm lượng — khi mọi thứ đều to thì không gì nổi. B dùng serif lớn cho một món và sans nhỏ cho phần còn lại, tương phản đến từ vai trò.'],
   ['Distinctiveness','Đỏ–vàng cộng emoji là ngôn ngữ mặc định của quán ăn bình dân; che tên đi thì đây là bất kỳ quán nào. Nền giấy sáng của B hiếm gặp trong category, nên được nhớ.'],
   ['Brand fit','Menu ngắn ngầm nói rằng bếp làm ít món nhưng làm kỹ — một tín hiệu chất lượng. Menu 12 món gợi ý ngược lại: đông lạnh, hâm sẵn, cái gì cũng có.']]},

{ id:'ts-email', kind:'Email xác nhận đơn hàng', stronger:'a',
  brief:'Email gửi ngay sau khi khách đặt hàng — loại email có tỉ lệ mở cao nhất của mọi thương hiệu.',
  a:`<div style="${T.box}background:#fff;color:#15120E;justify-content:space-between">
      <div>
        <span style="${T.mono}">Đơn #4412 · đã nhận</span>
        <div style="${T.serif}font-size:26px;line-height:1;margin-top:12px">Bánh của bạn<br>vào lò lúc 5h sáng mai</div>
      </div>
      <div style="${T.sans}font-size:10px;line-height:1.55;opacity:.78">
        Chị Hoa sẽ là người nướng mẻ này. Nếu trời nồm, bột nở nhanh hơn — chúng tôi sẽ nhắn cho bạn nếu giờ giao lệch quá 15 phút.
      </div>
      <div style="border-top:1px solid rgba(21,18,14,.2);padding-top:8px;display:flex;justify-content:space-between">
        <span style="${T.mono}">Giao 8:30 · 12 Lý Tự Trọng</span><span style="${T.mono}">Đổi giờ →</span></div>
     </div>`,
  b:`<div style="${T.box}background:#F8FAFC;color:#0F172A;justify-content:flex-start;gap:8px">
      <div style="${T.sans}font-size:11px;font-weight:700">XÁC NHẬN ĐƠN HÀNG #4412</div>
      <div style="${T.sans}font-size:9.5px;color:#475569;line-height:1.5">Kính gửi Quý khách,<br>Cảm ơn Quý khách đã tin tưởng và sử dụng dịch vụ. Đơn hàng của Quý khách đã được ghi nhận thành công trên hệ thống.</div>
      <div style="border:1px solid #E2E8F0;border-radius:6px;padding:8px;background:#fff">
        ${[['Mã đơn','#4412'],['Trạng thái','Đang xử lý'],['Tổng tiền','185.000đ'],['Thanh toán','COD']].map(([k,v])=>
          `<div style="${T.sans}font-size:8.5px;display:flex;justify-content:space-between;padding:2.5px 0;color:#475569"><span>${k}</span><span style="color:#0F172A">${v}</span></div>`).join('')}
      </div>
      <div style="${T.sans}font-size:8px;color:#94A3B8;line-height:1.5">Đây là email tự động, vui lòng không trả lời email này. Mọi thắc mắc xin liên hệ hotline 1900 xxxx.</div>
     </div>`,
  read:[
   ['Message','B dùng điểm chạm có tỉ lệ mở cao nhất để in lại thông tin khách đã biết. A dùng đúng khoảnh khắc đó để kể một chi tiết chỉ người làm thật mới có — và đó là quảng cáo hiệu quả nhất mà không tốn đồng media nào.'],
   ['Brand fit','“Vui lòng không trả lời email này” nói thẳng rằng thương hiệu không muốn nghe. Với một tiệm bánh, câu đó phá hỏng đúng thứ mà tiệm nhỏ có lợi thế: quan hệ con người.'],
   ['Hierarchy','B mở đầu bằng mã đơn — dữ liệu vận hành. A mở đầu bằng thứ khách thật sự quan tâm: bánh của tôi khi nào được làm, ai làm, có kịp giờ không.'],
   ['Typography','Bảng thông tin viền bo góc là ngôn ngữ của bảng điều khiển nội bộ. A dùng serif cho câu quan trọng nhất và mono cho dữ liệu, nên vẫn đầy đủ thông tin mà không đọc như phiếu xuất kho.'],
   ['Emotional response','A xử lý trước nỗi lo lớn nhất (giao trễ) bằng cách hứa sẽ báo — chủ động thay vì chờ khách hỏi. B để khách tự lo và đẩy họ sang tổng đài.'],
   ['Distinctiveness','Xám xanh, viền bo, chữ "Kính gửi Quý khách" — đây là mẫu email của mọi hệ thống bán hàng. Không có gì trong đó cho biết bạn vừa mua của ai.']]},

{ id:'ts-storefront', kind:'Biển hiệu cửa hàng', stronger:'b',
  brief:'Biển mặt tiền một tiệm sửa xe máy trong hẻm, khách đi ngang chủ yếu là người trong khu.',
  a:`<div style="${T.box}background:#1D4ED8;color:#fff;align-items:center;justify-content:center;text-align:center;gap:6px">
      <div style="${T.sans}font-size:9px;letter-spacing:.12em">CHUYÊN NGHIỆP · UY TÍN · GIÁ RẺ</div>
      <div style="${T.sans}font-size:21px;font-weight:800;line-height:1.1">SỬA XE MÁY<br>THÀNH ĐẠT</div>
      <div style="${T.sans}font-size:9px;line-height:1.6;opacity:.9">Sửa chữa – Bảo dưỡng – Thay nhớt<br>Rửa xe – Vá ép – Đề nổ – Điện xe<br>Nhận sửa tất cả các loại xe</div>
      <div style="${T.sans}font-size:12px;font-weight:700;background:#FACC15;color:#1D4ED8;padding:4px 12px">0909 xxx xxx</div>
     </div>`,
  b:`<div style="${T.box}background:#15120E;color:#F0EDE6;justify-content:space-between">
      <span style="${T.mono}">Hẻm 42 · mở 6h–19h</span>
      <div style="${T.serif}font-size:38px;line-height:.92">Thành<br>Đạt</div>
      <div>
        <div style="${T.sans}font-size:11px;line-height:1.5;opacity:.85">Thay nhớt trong 10 phút.<br>Không cần hẹn.</div>
        <div style="${T.mono}margin-top:10px;color:#E5A33B">0909 xxx xxx</div>
      </div>
     </div>`,
  read:[
   ['Hierarchy','A có bốn khối cùng đòi được đọc; người đi xe máy ngang qua chỉ kịp nhận một thứ. B cho đúng một cái tên lớn và một lời hứa ngắn.'],
   ['Message','Liệt kê chín dịch vụ không làm tăng niềm tin — nó chỉ nói rằng tiệm làm mọi thứ. “Thay nhớt trong 10 phút, không cần hẹn” là một dữ kiện, và nó nhắm đúng dịch vụ có tần suất cao nhất.'],
   ['Distinctiveness','Xanh dương với vàng chanh là bảng màu mặc định của biển hiệu in kỹ thuật số; cả con hẻm trông giống nhau. Nền đen chữ serif tạo một khoảng lặng và được nhìn thấy trước.'],
   ['Typography','“Chuyên nghiệp · uy tín · giá rẻ” là ba tính từ tự phong, và cả ba đều đứng ở vị trí đắt nhất trên biển. B dành chỗ đó cho tên và giờ mở cửa — thứ khách cần biết.'],
   ['Composition','A căn giữa tuyệt đối nên không có điểm vào. B neo trên–dưới bằng thông tin nhỏ, dồn tên vào giữa trái, mắt đi theo một đường.'],
   ['Brand fit','Với khách trong khu, thứ quyết định là tin được và tiện. Giờ mở cửa cùng lời hứa về thời gian nói đúng hai điều đó; danh sách dịch vụ thì không.']]},

{ id:'ts-deck', kind:'Slide mở đầu bài thuyết trình', stronger:'a',
  brief:'Slide đầu tiên khi trình bày kế hoạch marketing quý cho ban lãnh đạo.',
  a:`<div style="${T.box}background:#F5F2EC;color:#15120E;justify-content:space-between">
      <span style="${T.mono}">Kế hoạch Q4 · 12.09</span>
      <div>
        <div style="${T.serif}font-size:26px;line-height:1.02">Chúng ta mất<br>62% khách mới<br>trong 30 ngày<br>đầu tiên</div>
        <div style="${T.sans}font-size:10px;opacity:.72;margin-top:12px">Đề xuất: dừng tăng ngân sách quảng cáo, dồn quý này vào 30 ngày đầu của vòng đời khách hàng.</div>
      </div>
      <div style="border-top:1px solid rgba(21,18,14,.25);padding-top:7px;${T.mono}">3 quyết định cần thông qua hôm nay</div>
     </div>`,
  b:`<div style="${T.box}background:linear-gradient(135deg,#1E3A8A,#0EA5E9);color:#fff;align-items:center;justify-content:center;text-align:center;gap:9px">
      <div style="${T.sans}font-size:9px;letter-spacing:.2em;opacity:.85">MARKETING DEPARTMENT</div>
      <div style="${T.sans}font-size:20px;font-weight:800;line-height:1.15">KẾ HOẠCH MARKETING<br>QUÝ 4 / 2026</div>
      <div style="${T.sans}font-size:9.5px;opacity:.85">Bứt phá doanh số – Chinh phục thị trường</div>
      <div style="width:40px;height:2px;background:rgba(255,255,255,.6)"></div>
      <div style="${T.sans}font-size:8.5px;opacity:.7">Người trình bày: Phòng Marketing<br>Ngày: 12/09/2026</div>
     </div>`,
  read:[
   ['Message','B dùng slide đầu — lúc sự chú ý cao nhất — để nói tên tài liệu, thứ ai cũng đã biết. A dùng nó để đặt vấn đề bằng một con số, nên phần còn lại của buổi họp có một câu hỏi để bám vào.'],
   ['Hierarchy','Trên slide của A, thứ lớn nhất là thứ quan trọng nhất. Trên slide của B, thứ lớn nhất là tiêu đề hành chính.'],
   ['Typography','Sans đậm in hoa toàn bộ đọc chậm hơn và không tạo được cấp độ. Serif cỡ lớn của A cho một câu duy nhất, kèm sans nhỏ cho đề xuất — hai vai trò tách bạch.'],
   ['Distinctiveness','Gradient xanh với gạch trang trí là mẫu slide mặc định; nó phát tín hiệu rằng nội dung bên trong cũng sẽ là mặc định. Không phải chuyện thẩm mỹ — nó ảnh hưởng tới mức độ nghiêm túc mà người nghe dành cho bạn.'],
   ['Composition','A neo bằng hai đường kẻ và để khoảng trống lớn quanh con số. B căn giữa mọi thứ, dồn đều, nên không có gì được nhấn.'],
   ['Emotional response','Dòng “3 quyết định cần thông qua hôm nay” đặt kỳ vọng ngay từ giây đầu và biến buổi họp thành nơi ra quyết định thay vì nơi nghe báo cáo.']]},
);
