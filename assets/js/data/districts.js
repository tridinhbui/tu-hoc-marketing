/* Sáu khu vực lớn của thế giới marketing. Mỗi khu có màu riêng, cùng một hệ chữ. */
const DISTRICTS = [
  { id:'brand', key:'brand', color:'#B3320F', mark:'B', name:'Brand District',
    vi:'Khu Thương hiệu',
    line:'Nơi một cái tên trở thành một ý nghĩa, và một ý nghĩa trở thành một khoản tài sản.',
    topics:['Positioning','Brand equity','Identity & tone of voice','Distinctive assets','Brand architecture','Brand perception'],
    ask:'Nếu ngày mai logo bị gỡ khỏi mọi thứ bạn làm, khách hàng còn nhận ra bạn bằng gì?',
    reads:['positioning','brand-equity','distinctive-assets','salience','mental-availability'] },

  { id:'creative', key:'creative', color:'#7A2E8E', mark:'C', name:'Creative Studio',
    vi:'Xưởng Sáng tạo',
    line:'Ý tưởng không đến từ cảm hứng. Nó đến từ một sự thật được nhìn đủ lâu.',
    topics:['Insight → idea','Concept','Copywriting','Art direction','Visual communication','Craft'],
    ask:'Ý tưởng của bạn có thể kể lại bằng một câu qua điện thoại mà người kia vẫn thấy nó không?',
    reads:['consumer-insight','distinctive-assets','social-proof'] },

  { id:'consumer', key:'consumer', color:'#1F5C4A', mark:'P', name:'Consumer Lab',
    vi:'Phòng thí nghiệm Người tiêu dùng',
    line:'Người ta hiếm khi nói dối. Người ta chỉ không biết vì sao mình mua.',
    topics:['Behavioral economics','Segmentation','Jobs to be done','Insight mining','Nghiên cứu định tính','Bias'],
    ask:'Lần cuối bạn mua một thứ đắt hơn mức cần thiết — bạn đã tự giải thích với mình thế nào?',
    reads:['consumer-insight','jobs-to-be-done','social-proof','scarcity','segmentation'] },

  { id:'growth', key:'growth', color:'#1B4C8C', mark:'G', name:'Growth Room',
    vi:'Phòng Tăng trưởng',
    line:'Một phễu là một câu chuyện có số. Đọc số mà không đọc người thì chỉ tối ưu được cái sai.',
    topics:['Acquisition','Retention','Referral','Funnel','Experimentation','Unit economics'],
    ask:'Bạn đang thiếu người mới, hay đang mất người cũ nhanh hơn tốc độ kiếm người mới?',
    reads:['funnel','cac','ltv','retention','referral','conversion'] },

  { id:'media', key:'media', color:'#A8620B', mark:'M', name:'Media Floor',
    vi:'Sàn Truyền thông',
    line:'Nội dung hay mà đặt sai chỗ thì vẫn là một cái cây đổ trong rừng vắng.',
    topics:['Paid media','Organic & owned','Channel strategy','Share of voice','Reach vs frequency','PR & earned'],
    ask:'Bạn mua sự chú ý, mượn nó, hay đã tự xây được nó?',
    reads:['share-of-voice','physical-availability','category-entry-point','conversion'] },

  { id:'strategy', key:'strategy', color:'#4A3A2A', mark:'S', name:'Strategy Office',
    vi:'Văn phòng Chiến lược',
    line:'Chiến lược là danh sách những thứ bạn đồng ý không làm.',
    topics:['STP','4P','Go-to-market','Pricing','Market research','Competitive strategy'],
    ask:'Nếu phải bỏ 70% việc đang làm, bạn giữ lại 30% nào — và vì sao đúng 30% đó?',
    reads:['segmentation','targeting','positioning','pricing','category-entry-point','awareness'] },
];

/* Mười ba mảng chuyên môn của brief, ánh xạ vào sáu khu. Đây là bảng tra —
   người học nghĩ theo tên nghề, còn site tổ chức theo khu vực. */
const FIELDS = [
 {t:'Brand',            vi:'Thương hiệu',            d:'brand',    line:'Định vị, tài sản nhận diện, ý nghĩa tích luỹ theo thời gian.'},
 {t:'Consumer Psychology', vi:'Tâm lý người tiêu dùng', d:'consumer', line:'Vì sao người ta mua, và vì sao họ giải thích sai về chính mình.'},
 {t:'Advertising',      vi:'Quảng cáo',              d:'creative', line:'Sống sót qua nửa giây đầu tiên trước khi nói bất cứ điều gì.'},
 {t:'Creative',         vi:'Sáng tạo',               d:'creative', line:'Từ insight tới ý tưởng, rồi tới thứ làm được và craft.'},
 {t:'Social Media',     vi:'Mạng xã hội',            d:'media',    line:'Nói tiếng bản địa của từng nền tảng, xây nhân vật thay vì đăng bài.'},
 {t:'Growth',           vi:'Tăng trưởng',            d:'growth',   line:'Phễu, thử nghiệm, và cái xô thủng phía sau mọi biểu đồ đẹp.'},
 {t:'Product Marketing',vi:'Marketing sản phẩm',     d:'strategy', line:'Ai biết trước, biết cái gì, và vì sao phải là bây giờ.'},
 {t:'Performance',      vi:'Quảng cáo hiệu suất',    d:'growth',   line:'Thu hoạch nhu cầu có sẵn — nên phải có ai đó chịu gieo.'},
 {t:'PR',               vi:'Quan hệ công chúng',     d:'media',    line:'Quản trị việc bạn được kể lại khi không có mặt trong phòng.'},
 {t:'Content',          vi:'Nội dung',               d:'creative', line:'Dạy, giải trí hoặc chứng minh. Còn lại là lấp lịch đăng bài.'},
 {t:'Pricing',          vi:'Giá',                    d:'strategy', line:'Đòn bẩy lợi nhuận mạnh nhất và tuyên bố định vị to nhất.'},
 {t:'Research',         vi:'Nghiên cứu',             d:'consumer', line:'Đúng câu hỏi, hỏi đúng người, ngay sau khi họ vừa hành động.'},
 {t:'Marketing Strategy',vi:'Chiến lược',            d:'strategy', line:'Danh sách những thứ bạn đồng ý không làm.'},
];
