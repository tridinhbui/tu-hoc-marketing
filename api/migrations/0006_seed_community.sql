-- Hạt giống cho cộng đồng: tài khoản biên tập (không đăng nhập được, email .invalid) và vài bài mở hàng.
-- Mục đích: người đầu tiên vào không thấy trang trống. Bài ghi rõ là của Ban biên tập; xoá được bằng DELETE theo user_id.
INSERT OR IGNORE INTO users (id, email, created_at, display_name)
VALUES ('editorial-board', 'ban-bien-tap@system.invalid', strftime('%s','now') * 1000, 'Ban biên tập');

INSERT OR IGNORE INTO posts (id, user_id, kind, title, body, created_at) VALUES
('seed-0000-0000-0000-000000000001', 'editorial-board', 'phan-tich',
 'Cùng một ly cà phê: vì sao có quán bán 25k, có quán bán 65k?',
 'Hãy chọn hai quán cà phê gần nhà bạn có giá chênh nhau từ 2 lần. Trước khi so hương vị, hãy so ba thứ: dịp khách đến (làm việc, hẹn hò, mua mang đi), thứ khách trả tiền cho (chỗ ngồi, không gian, thương hiệu), và lựa chọn thay thế của họ. Viết lại vào đây: quán nào, giá bao nhiêu, và theo bạn khách đang “thuê” quán để làm việc gì?',
 strftime('%s','now') * 1000 - 6 * 86400000),
('seed-0000-0000-0000-000000000002', 'editorial-board', 'hoi',
 'ROAS 4 có nghĩa là lãi không? Cho ví dụ có số của bạn',
 'ROAS 4 nghe đẹp, nhưng với biên lợi nhuận gộp 20% thì 1 đồng quảng cáo ra 4 đồng doanh thu chỉ còn 0,8 đồng lợi nhuận gộp — lỗ. Bạn đã từng gặp một con số “đẹp” nhưng hoá ra không lãi chưa? Kể ngắn: số liệu, cách bạn nhận ra, và bạn đã làm gì.',
 strftime('%s','now') * 1000 - 5 * 86400000),
('seed-0000-0000-0000-000000000003', 'editorial-board', 'phong-van',
 'Câu hỏi phỏng vấn “Tại sao doanh số giảm?” — bạn trả lời thế nào trong 60 giây?',
 'Một khung gợi ý: tách doanh thu thành lượt truy cập × tỷ lệ chuyển đổi × giá trị đơn, nêu giả thuyết mạnh nhất kèm cách kiểm, rồi đề xuất một việc có ngưỡng đo. Hãy viết câu trả lời của bạn (không quá 120 chữ) và để bạn khác góp ý chỗ thiếu số.',
 strftime('%s','now') * 1000 - 4 * 86400000),
('seed-0000-0000-0000-000000000004', 'editorial-board', 'phan-tich',
 'Duolingo: “unhinged” là chiến lược hay là may mắn?',
 'Chọn một mốc trong chiến dịch mạng xã hội của Duolingo và phân tích: họ nhắm ai, điều họ cố tình KHÔNG làm là gì, và vì sao một thương hiệu giáo dục lại dám làm vậy. Nếu bạn là brand manager của một ứng dụng nhỏ hơn, bạn học được điều gì và bỏ điều gì?',
 strftime('%s','now') * 1000 - 3 * 86400000),
('seed-0000-0000-0000-000000000005', 'editorial-board', 'hoi',
 'Ngân sách 20 triệu/tháng cho quán mới: dồn vào đâu trước?',
 'Một quán trà sữa mở ở khu văn phòng, 20 triệu mỗi tháng cho marketing, chưa có khách quen. Bạn chia thế nào giữa: biển hiệu/điểm bán, quảng cáo trả tiền, tặng thử, và giữ chân? Hãy nêu con số và chỉ số bạn sẽ nhìn sau 30 ngày.',
 strftime('%s','now') * 1000 - 2 * 86400000),
('seed-0000-0000-0000-000000000006', 'editorial-board', 'phong-van',
 'Phỏng vấn Management Trainee: bạn bị hỏi gì ở vòng case?',
 'Nếu bạn vừa đi phỏng vấn MT/Brand Executive, hãy chia sẻ (ẩn tên công ty nếu cần): đề bài dạng gì, họ hỏi vặn ở chỗ nào, và điều gì bạn ước đã chuẩn bị. Một bài chia sẻ cụ thể giúp cả cộng đồng hơn mười lời khuyên chung chung.',
 strftime('%s','now') * 1000 - 1 * 86400000);
