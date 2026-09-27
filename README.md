# Nhìn thấy — tạp chí tự học Marketing

Static site, không framework, không build step. Mở bằng bất kỳ web server tĩnh nào:

```bash
python3 -m http.server 4321
```

Rồi vào http://localhost:4321

## Cấu trúc

| Trang | Vai trò |
|---|---|
| `index.html` | Bìa tạp chí + editorial front page (bài hôm nay, campaign của tuần, brand, challenge) |
| `world.html` | Marketing World — bảng tra 13 mảng nghề → 6 khu vực, mỗi khu một màu, câu hỏi trước cửa, đường dẫn vào nguyên lý & case |
| `lesson.html` | Daily lesson: Idea · Real world · Why it works · Look closer · Try it — 26 bài, `?day=53` |
| `gallery.html` / `campaign.html` | Campaign Gallery + case study đầy đủ (20 campaign) |
| `xray.html` / `brand.html` | Brand X-Ray — bắt người học tự viết trước, phân tích chỉ mở sau đó (14 thương hiệu) |
| `challenge.html` | 12 creative challenge, chọn trước rồi mới đọc vì sao mạnh/yếu |
| `taste.html` | Taste Training — 10 cặp A/B dựng thật bằng CSS, mổ xẻ theo 6 chiều |
| `library.html` / `principle.html` | 22 nguyên lý, mỗi cái một trang (ví dụ, phản ví dụ, lỗi phổ biến, bài tập) |
| `timeline.html` | 1950s → 2020s |
| `collections.html` | 6 bộ đọc có chủ đề, mở khoá theo tiến trình (gamification: không huy hiệu, phần thưởng là được đọc thêm) |
| `roadmap.html` | Lộ trình 12 tháng: 4 giai đoạn, 48 tuần tick được, 12 sản phẩm đầu ra (tiến độ ở `state.roadmap`) |
| `journal.html` | Sổ tay cá nhân, cấp bậc Observer → Marketing Director, xuất `.txt` |

Dữ liệu nội dung nằm trong `assets/js/data/*.js` — sửa file đó là sửa nội dung, không đụng tới layout.

## Art direction

- Giấy off-white `#F0EDE6`, mực `#15120E`, mỗi khu vực một accent (`[data-district]` trên `<html>`).
- Chữ: Fraunces (serif editorial, oversized) × Inter Tight (thông tin) × JetBrains Mono (nhãn nhỏ).
- Không ảnh stock, không 3D blob, không gradient tím. "Ảnh" là **plate**: mảng màu + một letterform khổng lồ + halftone + lưới hairline (`plate()` trong `assets/js/core.js`).
- Chuyển động: clip-path reveal, fade-up, ticker ngang. Tôn trọng `prefers-reduced-motion`.

## Trạng thái người học

Toàn bộ nằm ở `localStorage` khoá `nhinthay.v1` (streak, bài đã đọc, campaign/brand đã lưu, ghi chép). Không có backend, không tài khoản.

## Bàn phím & không JavaScript

- Tab đầu tiên trên mọi trang là link **"Tới nội dung chính"** (ẩn cho tới khi được focus).
- Viền focus dùng chính accent của khu vực đang đứng, offset 3px; không có chỗ nào tắt `outline`.
- Mỗi trang có khối `<noscript>` nói thẳng rằng nội dung được dựng trong trình duyệt và không gửi đi đâu.
- CSS và JS đều có `?v=` để một người quay lại không chạy JS cũ với HTML mới.

## Tự Học Marketing Case — nền tảng mới (đang dựng)

Giao diện casebook nền trắng: `assets/css/case.css`. Lõi: `assets/js/app.js` (trạng thái ở localStorage khoá `thmc.v1`).

| Trang | Vai trò |
|---|---|
| `hoc.html` | Dashboard: chọn nhóm người học → lộ trình, bài tiếp theo, cấp độ /30, XP, streak + thẻ đóng băng, nhiệm vụ ngày/tuần, Pomodoro 25′ |
| `ban-do.html` | Bắt đầu từ đâu: 6 chặng → 16 module → 48 bài, "Bạn ở đây", chặng mở khi xong 60% chặng trước |
| `bai.html?id=` | Bài học 5 phần: bài đọc · bài tập tính số · nói trong 60 giây · case · ôn lỗi. Chỉnh cỡ chữ, chế độ Sáng / Giấy ngà / Tối |
| `on-loi.html` | Lỗi theo mã có tên, nhắc ôn sau 1 · 3 · 7 ngày, lỗi ≥3 lần thành bài luyện bắt buộc |

Dữ liệu: `curriculum.js` (chặng, module, lộ trình, nhóm người học — xếp 26 daily lesson + 22 nguyên lý có sẵn),
`drills.js` (bài tính số, câu trả lời mẫu 60 giây, mã lỗi — mọi số liệu là minh hoạ).
