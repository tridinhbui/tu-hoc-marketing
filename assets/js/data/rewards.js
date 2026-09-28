/* RƯƠNG THƯỞNG — mở theo mốc chuỗi ngày dài nhất bạn từng đạt.
   Mỗi rương có một tài liệu viết riêng cho nền tảng và một huy hiệu. */
const CHESTS = [
{ id:'r3', streak:3, badge:'Người giữ nhịp', doc:{ t:'Khung trả lời 60 giây — bản dùng hằng ngày', parts:[
  ['Kết luận trước',['Một câu, trả lời thẳng câu được hỏi: “Có” / “Không” / “Làm A, không làm B”.','Không mở đầu bằng bối cảnh — người nghe bận chỉ nhớ câu đầu.']],
  ['Ba lý do có số',['Mỗi lý do một con số hoặc một bằng chứng kiểm chứng được.','Xếp lý do mạnh nhất lên đầu, không xếp theo thứ tự bạn tìm ra.','Nếu chỉ có hai lý do thật, nói hai — lý do thứ ba yếu làm hỏng hai lý do kia.']],
  ['Bước tiếp theo',['Một việc cụ thể, có thời hạn, đo được.','“Cần nghiên cứu thêm” không phải bước tiếp theo.']],
  ['Tự kiểm tra',['Đọc to và bấm giờ. Quá 60 giây: cắt bối cảnh trước, không cắt số.','Hỏi: nếu người nghe chỉ nhớ một con số, đó là số nào?']]]}},
{ id:'r7', streak:7, badge:'Một tuần không bỏ', doc:{ t:'Brief một trang', parts:[
  ['Vấn đề kinh doanh',['Con số nào đang không như mong muốn, bao nhiêu, từ khi nào.']],
  ['Ai',['Một nhóm người cụ thể, trong một tình huống cụ thể — không phải nhân khẩu học chung chung.']],
  ['Họ đang nghĩ gì',['Điều họ tin bây giờ.','Điều ta muốn họ tin sau khi thấy chiến dịch.']],
  ['Một điều muốn nói',['Một câu. Nếu có hai, chọn một.']],
  ['Vì sao nên tin',['Bằng chứng: số liệu, tính năng, người dùng thật.']],
  ['Đo bằng gì',['Một chỉ số chính, một chỉ số cảnh báo, và mốc so sánh.']],
  ['Không làm gì',['Những thứ đội sáng tạo không cần bận tâm — giúp họ tập trung.']]]}},
{ id:'r14', streak:14, badge:'Hai tuần đều tay', doc:{ t:'Checklist trước khi tăng ngân sách quảng cáo', parts:[
  ['Tách số',['CAC đã tính cả lương, công cụ và khuyến mãi chưa?','Doanh thu từ khách cũ và từ khoá thương hiệu đã tách ra chưa?']],
  ['So với giá trị',['LTV tính bằng lãi gộp, không phải doanh thu.','LTV:CAC hiện tại là bao nhiêu? Ngưỡng bạn chấp nhận là bao nhiêu?']],
  ['CAC biên',['Lần gần nhất tăng ngân sách, mỗi khách thêm tốn bao nhiêu?','CPM và tần suất thay đổi thế nào khi tăng chi?']],
  ['Rò rỉ',['Tỉ lệ giữ chân tháng 1–3 có đang tụt không? Đổ thêm khách vào xô thủng là đốt tiền.']],
  ['Kế hoạch tăng',['Tăng từng nấc 10–15%, mỗi nấc có điều kiện dừng bằng số.']]]}},
{ id:'r30', streak:30, badge:'Một tháng', doc:{ t:'25 câu giám khảo và sếp hay hỏi tiếp', parts:[
  ['Về số liệu',['Con số này so với cái gì?','Mẫu bao nhiêu, thời gian bao lâu?','Bao nhiêu phần trong đó đằng nào cũng xảy ra?','Nếu số này sai 30%, kết luận còn đúng không?','Bạn tính chi phí gồm những gì?']],
  ['Về khách hàng',['Bạn đã nói chuyện với bao nhiêu khách thật?','Họ đang dùng gì thay thế?','Ai là người trả tiền, ai là người quyết định?','Vì sao họ chưa mua?','Nhóm nào bạn cố tình không phục vụ?']],
  ['Về đề xuất',['Vì sao không làm phương án ngược lại?','Cần bao nhiêu tiền, bao lâu thấy kết quả?','Điều kiện nào khiến bạn dừng?','Rủi ro lớn nhất là gì?','Đối thủ sẽ phản ứng thế nào?']],
  ['Về thương hiệu',['Che logo đi còn nhận ra không?','Điều gì sẽ không đổi trong ba năm?','Thông điệp này có nói được cho thương hiệu khác không?','Khách nhớ tới bạn trong tình huống nào?','Bạn đang xây trí nhớ hay chỉ thu hoạch nhu cầu?']],
  ['Về chính bạn',['Nếu chỉ được làm một việc, bạn làm việc gì?','Bạn đã đổi ý ở đâu trong lúc làm bài?','Giả định nào bạn ít chắc nhất?','Bạn cần thêm dữ liệu gì?','Nói lại kết luận trong một câu?']]]}},
{ id:'r60', streak:60, badge:'Hai tháng bền bỉ', doc:{ t:'Checklist ra mắt sản phẩm', parts:[
  ['Trước khi nói với ai',['Ai là 100 người đầu tiên và vì sao họ?','Giá, kênh, và câu định vị đã khớp với nhau chưa?']],
  ['Thứ tự',['Đội bán hàng và chăm sóc khách biết trước khách hàng.','Người có ảnh hưởng dùng thử trước khi công bố.','Trang đích, thanh toán, tồn kho đã thử tải thật chưa?']],
  ['Ngày ra mắt',['Một thông điệp, lặp ở mọi kênh.','Người trực số liệu theo giờ trong 48 giờ đầu.']],
  ['Sau 30 ngày',['Tỉ lệ dùng lại, không chỉ lượt mua đầu.','Ba lời phàn nàn lặp nhiều nhất và ai xử lý.']]]}},
{ id:'r100', streak:100, badge:'Một trăm ngày', doc:{ t:'Bộ công thức số marketing — một trang', parts:[
  ['Phễu',['CTR = click ÷ hiển thị','CVR = chuyển đổi ÷ click (hoặc ÷ lượt vào trang — nói rõ mẫu số)','Tỉ lệ rơi ở một bước = (vào − ra) ÷ vào']],
  ['Chi phí',['CAC = (media + lương + công cụ + khuyến mãi) ÷ khách MỚI','CAC biên = chi phí tăng thêm ÷ khách tăng thêm','ROAS = doanh thu ÷ chi quảng cáo · ROAS hoà vốn = 1 ÷ biên gộp']],
  ['Giá trị',['LTV = lãi gộp mỗi đơn × số đơn cả đời','Số tháng ở lại trung bình ≈ 1 ÷ tỉ lệ huỷ tháng','Còn lại sau n kỳ = ban đầu × tỉ lệ giữ^n']],
  ['Giá',['Hoà vốn (sản lượng) = chi phí cố định ÷ (giá − chi phí biến đổi)','Giảm giá x% với biên m: sản lượng cần tăng = m ÷ (m − x) − 1']],
  ['Media',['Tần suất = lượt hiển thị ÷ số người tiếp cận','SOV = chi của mình ÷ tổng chi ngành · ESOV = SOV − thị phần']]]}},
];
