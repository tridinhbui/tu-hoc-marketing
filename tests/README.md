# Kiểm thử hồi quy

Chạy từ thư mục gốc repo (không cần cài gì thêm, Node ≥ 20):

```bash
node --test tests/*.test.mjs        # nội dung, cổng chặng, chấm khi mất mạng, chất lượng câu hỏi
cd api && npm test                  # máy chủ: engine, vòng học, đề vượt chặng theo độ khó
node tools_validate_bai.mjs         # kiểm định từng module bài (đã có từ trước)
```

| File | Giữ cho điều gì không tái diễn |
|---|---|
| `stage-gate.test.mjs` | Chặng 06 phải vượt được: khoá `pass` mà `giai-case.html` ghi phải phủ `FULL_CASE_KEYS`; bài cũ không bị mất; hết giờ không tính; mix đề cộng đúng bằng size |
| `grade-offline.test.mjs` | Máy chủ chấm lỗi thì không tự cho qua, không ghi lượt thi nửa chừng, không mất câu đã trả lời |
| `content-integrity.test.mjs` | Đáp án nằm trong phương án, mọi phương án có lời giải, mã lỗi tồn tại, `ans` có trong `steps`, tham chiếu bài có thật, hồi quy các lỗi số học đã xác minh |
| `quiz-quality.test.mjs` | Thiên lệch vị trí đáp án, đáp án đúng dài nhất, từ tuyệt đối làm lộ đáp án (ngưỡng ratchet ở `baselines.json`), câu judge đoán được bằng mẹo, pool đề đủ |
| `tasks.test.mjs` | Bài thực hành có đầu ra: đủ dữ liệu cho sẵn, rubric, bài làm mẫu |
| `games.test.mjs` | Mô hình mini-game thuần và công bằng: tối ưu đạt 3 sao, chiến lược cố định/"đông nhất" không đạt, thang sao đơn điệu |
| `world-map.test.mjs` | Bản đồ vương quốc: id duy nhất, toạ độ trong khung, khớp cấu hình máy chủ, ngưỡng rương/trang phục đạt được |
| `lab.test.mjs` | Marketing Lab (Meta, Google Ads, GA4 đối soát với feed, SEO): KPI đúng công thức và mẫu số 0, mô phỏng xác định, sai đối tượng/tăng ngân sách/tệp hẹp cho hệ quả đúng chiều, chấm điểm theo quyết định, đầu ra GA4 khớp chiến dịch |
| `case-deep.test.mjs` | Case sâu: đủ khung Observe→…→Measure, đúng một hướng "taken", nhân quả kèm yếu tố khác, mỗi dữ kiện có ai đo/ngày/nguồn, không có số ROAS/ROI, các câu đã bị fact-check bác không quay lại, thư viện cân bằng thành công/thất bại và Việt Nam/quốc tế |
| `cases-new.test.mjs` | 18 case bấm giờ: cấu trúc, mã lỗi/mã bài/năng lực có thật; số liệu của 6 case mới được tính lại độc lập; phủ các năng lực trước đây không có case; đáp án đúng không luôn dài nhất, không dồn một vị trí |
| `strategy-lab.test.mjs` | Xưởng chiến lược: dữ liệu giả lập có nhãn, tham chiếu hợp lệ, mô hình kênh (trần, mức tối thiểu, kênh cần danh sách), hai hướng khác hẳn nhau đều đạt ngưỡng còn kế hoạch tự mâu thuẫn rớt xa, cỡ mẫu, thí nghiệm giả lập xác định, đọc kết quả không nhảy sang "mở rộng" khi chưa vượt nhiễu |
| `capstone.test.mjs`, `glossary.test.mjs` | Dữ liệu capstone tự khớp; thuật ngữ đúng và liên kết bài có thật |

`baselines.json` là ngưỡng ratchet: chỉ hạ khi nội dung tốt lên.
