/* EDITORIAL COLLECTIONS — phần thưởng duy nhất của site này là được đọc thêm.
   Mỗi bộ mở ra ở một mốc tiến trình, và là một bài đọc có chủ đề chứ không phải huy hiệu. */
const COLLECTIONS = [
{ id:'cu-the', name:'Sự cụ thể', sub:'Vì sao chi tiết thắng tính từ', need:0,
  color:'#4A3A2A', mark:'01',
  essay:'Gần như mọi bài học trong marketing đều quy về một chỗ: người mua không tin tính từ, họ tin dữ kiện. Ba trang này đọc cùng nhau sẽ cho bạn thấy cùng một nguyên lý hoạt động ở ba quy mô khác nhau — một dòng tiêu đề, một bao bì, và một thương hiệu 60 năm tuổi.',
  items:[{k:'lesson',id:57},{k:'campaign',id:'ogilvy-rolls'},{k:'principle',id:'social-proof'},{k:'taste',id:'ts-pack'}] },

{ id:'chon-phe', name:'Khi thương hiệu chọn phe', sub:'Định vị luôn có hoá đơn', need:8,
  color:'#B3320F', mark:'02',
  essay:'Một định vị chỉ có giá trị khi nó khiến ai đó rời đi. Bộ này gom ba thương hiệu đã trả giá thật cho lựa chọn của mình — và một nguyên lý giải thích vì sao cái giá đó chính là thứ tạo ra tài sản.',
  items:[{k:'campaign',id:'nike-dream-crazy'},{k:'campaign',id:'patagonia-dont-buy'},{k:'campaign',id:'apple-1984'},{k:'principle',id:'positioning'},{k:'brand',id:'muji'}] },

{ id:'viet-nam', name:'Thị trường Việt Nam', sub:'Những căng thẳng chỉ người ở đây mới thấy', need:20,
  color:'#166534', mark:'03',
  essay:'Case quốc tế dạy bạn nguyên lý; case nội địa dạy bạn ngữ cảnh. Bộ này đi qua mùa vụ văn hoá, mật độ điểm bán, ký ức thế hệ và bài toán rebrand của một thương hiệu quốc dân — bốn thứ mà không sách nước ngoài nào viết hộ bạn.',
  items:[{k:'campaign',id:'bitis-hunter'},{k:'campaign',id:'highlands-third-place'},{k:'campaign',id:'vinamilk-rebrand'},{k:'brand',id:'coolmate'},{k:'lesson',id:55}] },

{ id:'mac-dinh', name:'Chống lại cái mặc định', sub:'Vì sao mọi thứ bắt đầu trông giống nhau', need:38,
  color:'#8E1B47', mark:'04',
  essay:'Công cụ càng dễ, mặt bằng càng đồng đều, và cái mặc định càng nguy hiểm: gradient tím, ba thẻ bo góc, một câu slogan không loại trừ ai. Bộ này là phần huấn luyện mắt — nhận ra cái mặc định trước khi bạn vô tình sản xuất thêm một cái nữa.',
  items:[{k:'taste',id:'ts-landing'},{k:'taste',id:'ts-identity'},{k:'taste',id:'ts-social'},{k:'principle',id:'distinctive-assets'},{k:'lesson',id:60}] },

{ id:'tien', name:'Tiền', sub:'Giá, phễu và cái xô thủng', need:60,
  color:'#1B4C8C', mark:'05',
  essay:'Phần này ít lãng mạn nhất và cũng quyết định nhiều nhất. Ba nguyên lý cộng một bài học sẽ cho bạn khung để trả lời một câu duy nhất: chúng ta đang kiếm tiền hay đang thuê khách hàng theo tháng?',
  items:[{k:'principle',id:'pricing'},{k:'principle',id:'ltv'},{k:'principle',id:'retention'},{k:'lesson',id:59},{k:'lesson',id:65}] },

{ id:'giam-doc', name:'Bàn của giám đốc', sub:'Nhìn thị trường như một bàn cờ', need:88,
  color:'#15120E', mark:'06',
  essay:'Ở mức này, câu hỏi không còn là "campaign nào hay" mà là "chúng ta đang chơi ván nào, trong bao lâu, và bỏ lại gì". Bộ cuối gom những trang nói về thời gian: trí nhớ tích luỹ, tỉ trọng tiếng nói, và bảy mươi năm phương tiện thay đổi.',
  items:[{k:'principle',id:'mental-availability'},{k:'principle',id:'share-of-voice'},{k:'principle',id:'category-entry-point'},{k:'era',id:'2020s'},{k:'brand',id:'apple'}] },
];
