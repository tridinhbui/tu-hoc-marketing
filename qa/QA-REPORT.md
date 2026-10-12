# QA — redesign "Atelier" (trang bên trong)

Môi trường: `wrangler dev --local` (Worker + D1 + KV cục bộ) phục vụ `dist/` vừa build, đăng nhập thật qua luồng link dev,
9 người học fixture (`api/tools/seed-dev.mjs`: XP 30–600, chuỗi 0–14 ngày, tên rất dài để thử cắt chữ).
Trình duyệt: Browser pane ở 375 · 768 · 1440 · 1920 px. Ảnh trước/sau: `qa/screenshots/`.
"Trước" = commit `29d0903` dựng riêng ở cổng 8790 dùng chung dữ liệu D1 với bản "sau".

## Lỗi thật tìm ra và đã sửa

| # | Mức | Lỗi | Cách phát hiện | Sửa |
|---|---|---|---|---|
| 1 | P1 | **Chuỗi ngày trên thẻ học viên luôn hiện 0**: API trả `stats.streak`, giao diện đọc `streak_current` (có từ trước; trạng thái rỗng che lỗi) | Dữ liệu thật: API `streak:12`, giao diện `0` | `social-ui.js` đọc `streak` |
| 2 | P1 | Bảng xếp hạng tab "Chuỗi ngày"/"Case" luôn hiện số XP kèm đơn vị "XP" | Dữ liệu fixture khác nhau theo tab | Lấy đúng trường `streak`/`cases`, đúng đơn vị |
| 3 | P1 | Nhận thưởng nhiệm vụ xong thì thẻ XP không cập nhật | Bấm "Nhận thưởng" với dữ liệu thật: API 610, thẻ 600 | `questsPanel(..., onChange)` làm mới thẻ |
| 4 | P1 | Xung đột `data-reveal`: Atelier dùng cùng tên thuộc tính với `main.css/core.js` → tiêu đề Sổ tay/Thế giới kẹt mờ | Chụp màn hình journal | Đổi sang `data-at` |
| 5 | P1 | Test `links.test.mjs` bắt `src="assets/img/${…}"` (ảnh hero ghép chuỗi) | `node --test` | Tính đường dẫn ảnh trước khi nhúng vào template |
| 6 | P2 | Bài học ≤1020px: ghi đè `grid-template-columns` của Atelier thắng media query → tràn ngang 9px | Quét tràn ngang ở 375 | Chỉ áp cột 340px khi ≥1021px |
| 7 | P2 | Cộng đồng: tên dài trong "Top tuần" đẩy tràn 49px | Quét tràn ngang ở 1440 | Hàng flex + `text-overflow` |
| 8 | P2 | Thanh thao tác dính đáy của Lab bị nút nổi (Ý Ý, chat) che mất nút "Tiếp tục" | Ảnh Lab Meta | Chừa lề phải cho `.dock`; trang chừa 92–104px cuối |
| 9 | P2 | Dòng folio hiển thị "Bàn làm việc" chung cho nhiều trang | Quét tiêu đề | Bỏ tiền tố "Bàn làm việc", lấy tên trang |
| 10 | P2 | **Chế độ tối nửa vời**: người dùng cũ còn `theme:'dark'` vào giao diện hỗn hợp; nút "Tối" ở menu người dùng | Đọc code + thử `theme='dark'` | Khoá một chế độ sáng ổn định; bỏ nút chọn giao diện |
| 11 | P2 | Bài học/Lab/Game khai nền riêng nên lệch tông với trang khác | Đo `background-color` | Ghi đè biến nền (`--lp-bg`, `--lb-bg`, `--gw-*`) |
| 12 | P2 | Build làm đổi canonical của 34 trang `case/`, `thuong-hieu/` về `nhinthay.pages.dev` | `git diff` | Build với `SITE_URL=https://tuhocmarketing.org`; hoàn nguyên `sitemap.xml`/`robots.txt` |
| 13 | P3 | Trạng thái lỗi/đang tải của bảng xếp hạng & nhiệm vụ im lặng (khối trống) | Ép `fetch` lỗi | Thêm "Đang tải…" và "Chưa tải được… Thử lại" |

## Kiểm tra theo trang (67 trang đã nạp `atelier.css`)

PASS = mở được, không tràn ngang ở 375/768/1440, không ảnh hỏng, tiêu đề/nền đúng art direction, không lỗi JS, không 4xx/5xx từ API.

### PASS đã xem bằng mắt (tương tác kiểm tra)
`hoc` (dashboard) · `hoc-bai` · `bai` (hoàn thành bài: cổng, quiz 5 câu, nộp bài, XP, hàng ôn lỗi) · `quiz` (trọn vòng 5 câu +10 XP) ·
`thi` · `lab` · `lab-meta` (chạy mô phỏng, lưu lần chạy, hiện lại ở Lab) · `tai-khoan` · `thong-ke` · `cong-dong` ·
`kingdom` · `game-ke-chuyen` · `game-ngan-sach` · `journal` · `world` · `bat-dau`

### PASS theo quét tự động (chưa xem từng pixel)
`assets-audit` `bang-xep-hang` `boss` `brand` `cap-do` `ban-do` `case-thu-vien` `challenge` `campaign` `cep` `brand-audit`
`game-ban-do-dinh-vi` `game-chon-tep` `customer-map` `capstone` `game-lich-noi-dung` `game-chan-doan` `collections` `gioi-thieu`
`game-phieu-ro` `game-khung-hoang` `gallery` `interview` `giai-case` `game-doc-studio` `lab-gads` `lesson` `lab-seo` `lab-ga4`
`on-loi` `principle` `nang-luc` `luyen` `roadmap` `pricing` `positioning` `library` `tro-choi` `phong-van` `shop` `segmentation`
`xray` `pvp` `taste` `tap-chi` `ruong` `timeline` `thuat-ngu` `xep-lop` `unit-economics`

### FAIL / còn tồn tại
| Trang | Mức | Vấn đề |
|---|---|---|
| `quan-tri` | P3 | Trang quản trị có khung/thanh riêng, chưa theo Atelier (chỉ admin thấy). Không ảnh hưởng người học |
| `phong-van` (375px) | P3 | Tràn ngang 1px |
| `thuat-ngu`, `roadmap`, `tap-chi`, `world` | P3 | Xem tự động, chưa duyệt toàn bộ độ dài bằng mắt (trang rất dài) |
| Toàn bộ | P3 | `/favicon.ico` trả 404 (68 lần/lượt quét): trang khai `<link rel=icon>` nhưng trình duyệt vẫn hỏi gốc |
| Rail vs thẻ học viên | P2 | Thanh bên đọc XP từ `localStorage` (210) còn thẻ lấy từ máy chủ (610): chỉ lệch khi tài khoản chưa đồng bộ; không phải lỗi do redesign nhưng người dùng thấy hai con số |

### NOT TESTED
- Đăng nhập Google OAuth (cần khoá thật); gửi email thật (`DEV_SHOW_LINK` thay thế).
- Tính năng AI (Ý Ý, chấm phỏng vấn): không có `ANTHROPIC_API_KEY` ở môi trường thử.
- Thanh toán/`shop.html` mua hàng và `pvp`/`boss` nhiều người (chỉ xem trang, không giao dịch).
- Trình duyệt Safari/Firefox (chỉ Chromium trong Browser pane).
- Màn hình thật cảm ứng; chỉ giả lập kích thước.

## Hồi quy
| Hạng mục | Kết quả |
|---|---|
| `node --test tests/*.test.mjs` | 141/141 pass |
| `api: npm test` | 32/32 pass |
| `tools_validate_bai.mjs` | 712 bài · 4984 câu · 0 lỗi |
| Định tuyến khung (`app.html?p=…`, đổi trang qua sidebar, tìm kiếm ⌘K) | Hoạt động; chuyển trang mờ dần có chốt an toàn 6 giây |
| Quiz: chọn → chốt → lời giải → kết quả → XP | Đúng (+10 XP ở vòng 5 câu) |
| Bài học: cổng → đổ não → quiz → nộp → chấm máy chủ → XP/ôn lỗi | Đúng |
| Nhiệm vụ: nhận thưởng một lần mỗi ngày, XP máy chủ tăng | Đúng |
| Lab Meta: validate, chạy, lưu, hiện ở Lab | Đúng |
| Đăng nhập dev-link, phiên cookie, hồ sơ, đổi tên | Đúng |
| Console / mạng | Không lỗi JS bắt được; chỉ `/favicon.ico` 404 |

## Chưa làm / khuyến nghị
1. Deploy production: **chưa** (cần bạn phê duyệt). Chạy `SITE_URL=https://tuhocmarketing.org node tools_build.mjs` rồi đối chiếu `git diff` của `sitemap.xml`, `robots.txt`.
2. Quét bằng mắt các trang P3 ở trên trước khi mở rộng.
3. Nên đồng bộ XP nền cục bộ lên máy chủ khi vào khung để rail và thẻ học viên luôn khớp.
