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
| `capstone.test.mjs`, `glossary.test.mjs` | Dữ liệu capstone tự khớp; thuật ngữ đúng và liên kết bài có thật |

`baselines.json` là ngưỡng ratchet: chỉ hạ khi nội dung tốt lên.
