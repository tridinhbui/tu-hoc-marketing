# Kế hoạch hoàn thiện từng trang — rà soát ngày 2026-10-11

Cách rà: chạy `wrangler dev` cục bộ (D1 + KV thật, đăng nhập bằng link dev), nạp **50 trang** trong khung app và đọc nội dung thật hiển thị;
đối chiếu mọi lời gọi `api('/...')` ở client với route ở `api/src/index.js`; chạy `node --test tests/*.test.mjs` (56/56 qua) và `cd api && npm test` (31/31 qua).

Nhãn trạng thái:
- **THẬT** — chạy đủ, có dữ liệu/logic thật (kể cả khi phần lưu là localStorage đồng bộ lên `/api/state`).
- **MỘT PHẦN** — chạy được nhưng thiếu một mảng tính năng/nội dung đã hứa trên giao diện.
- **MÔ PHỎNG** — giao diện có, bên dưới là dữ liệu cố định hoặc phụ thuộc thứ chưa bật.

## 0. Đã sửa trong lượt này
| Vấn đề | Sửa |
|---|---|
| Thanh dọc bị cuộn ngang, icon/chữ lệch trái, tràn khi cửa sổ 861–1100px | `app.html`: `overflow-x:clip`, cột `minmax(0,…)`, chữ cắt `ellipsis`, rail 236px ở 861–1100px, nhánh con có vạch dọc |
| **25 trang** (`core.js`) vẽ thêm header + footer *bên trong* khung → hai thanh điều hướng chồng nhau | `core.js`: trong khung không vẽ header/footer; mở lẻ thì tự đưa vào `app.html?p=` |
| Trang `case/*.html`, `thuong-hieu/*.html` sinh ra đều hiện campaign/brand **đầu tiên** (build gõ cứng `core.js?v=7` nên không chèn `__ID__`) | `tools_build.mjs` khớp mọi số phiên bản |
| Đã đăng nhập vẫn thấy landing / trang đăng nhập | Worker 302 → `/app.html` (hoặc `next` hợp lệ), landing `no-store` |
| P0 #1 Quiz giả | `quiz.html` viết lại thành **Phòng thử thách**: 13 thử thách thật (12 từ `challenges.js` + tình huống cà phê), rút 5/lượt ưu tiên cái chưa làm/làm sai, lý do từng phương án, XP, lịch sử, lọc chủ đề; lưu vào `flags['room:<id>']` nên đồng bộ lên máy chủ |
| P0 #2 Phỏng vấn AI chết khi chưa có key | `phong-van.html` thêm **luyện theo kịch bản không AI** (4 tuyến, hỏi vặn khi thiếu số/thiếu ý, đáp án mẫu); AI vẫn dùng khi có key |
| P0 #4 "Học nhóm · CHECK-IN" | Đổi nhãn thành **Bảng xếp hạng**, bỏ tag check-in; "Quiz" → **Phòng thử thách** |
| P0 #5 Số liệu bịa trên landing | Bỏ câu "hàng nghìn người" |
| P0 #6 25 trang bàn làm việc giao diện tối cũ | `main.css` thêm bảng màu sáng theo `data-theme`, `core.js` đọc theme của app; đổi tên "Nhìn thấy" → "Tự Học Marketing Case" ở title/og; quét tương phản 24 trang: 22 sạch, 2 cảnh báo là false-positive (`mix-blend-mode`, mockup trong taste) |
| Dữ liệu bàn làm việc không đồng bộ | `core.js` dùng khoá riêng `nhinthay.v1` (chỉ localStorage) → nay phản chiếu vào `flags.wb` của trạng thái app và báo khung đồng bộ lên máy chủ; gộp theo hợp mảng/ghi chú (không mất ghi chú giữa hai máy) |

## 1. Việc chặn — làm trước (P0)
| # | Trang | Vấn đề thật | Việc cần làm | Xong khi |
|---|---|---|---|---|
| 1 ✅ | `quiz.html` (mục **Quiz** ở sidebar, nhãn "Tin mới") | ~~**MÔ PHỎNG.**~~ ĐÃ LÀM — còn lại: mở rộng ngân hàng từ 13 lên ≥ 30. Trước đó: Một tình huống cà phê cố định, nhãn "Bài 3/7" nhưng không có 7 bài; chỉ ghi `challenges['room-coffee']`. Hình minh hoạ lấy ảnh chân dung không liên quan | Làm Challenge Room thật: ngân hàng ≥ 30 tình huống (ngành × độ khó) rút ngẫu nhiên, chấm theo rubric có giải thích từng phương án, lưu lịch sử + XP qua `/api/state`, thêm vào `quiz-quality.test` | Mỗi lần vào là tình huống khác; có điểm, lịch sử, chia sẻ được kết quả |
| 2 ◐ | `phong-van.html` | ĐÃ CÓ chế độ kịch bản; AI vẫn cần key. Trước đó **MÔ PHỎNG.** Trang tự báo "AI chưa được bật trên máy chủ" — `ANTHROPIC_API_KEY` chưa đặt, `/api/ai/*` trả 503 | `wrangler secret put ANTHROPIC_API_KEY`; bật quota 3 lượt/tháng đã code; thêm **chế độ không AI**: kịch bản phỏng vấn dựng sẵn (câu hỏi vặn theo từng nhánh) để trang không chết khi hết quota/không có key | Có key: phỏng vấn đủ 6 lượt; không key: vẫn luyện được bằng kịch bản |
| 3 | Đăng nhập Email | `MAIL_FROM` trống → `/api/auth/start` trả `email_not_configured` ở production; chỉ còn Google | Bật Cloudflare Email Sending cho tên miền, điền `MAIL_FROM`; hoặc bỏ hẳn lựa chọn email (UI hiện đang tự ẩn theo `/auth/providers`) | Gửi và nhận link đăng nhập thật |
| 4 ✅ | Sidebar **Học nhóm** (đã đổi nhãn; làm nhóm học thật là việc sau) (tag CHECK-IN) | Trỏ tới `bang-xep-hang.html` — chỉ là bảng xếp hạng tuần; **không có nhóm học, không có check-in** | Chọn: (a) đổi nhãn thành "Bảng xếp hạng" và bỏ tag; hoặc (b) build nhóm học (tạo/mời nhóm, mục tiêu tuần chung, check-in hằng ngày, streak nhóm) — bảng `groups`, `group_members`, `checkins` | Nhãn khớp tính năng |
| 5 ✅ | Landing | Dòng "Cùng hàng nghìn người đang học mỗi ngày" là **số chưa kiểm chứng** (admin hiện 10 người dùng) | Đổi sang số thật từ `/api/stats` hoặc bỏ câu | Không còn con số bịa |
| 6 ✅ | 25 trang bàn làm việc (`core.js`) | Giao diện **tối kiểu cũ, thương hiệu "Nhìn thấy"** lọt vào khung sáng (customer-map, cep, journal, positioning, segmentation, pricing, unit-economics, interview, roadmap, taste, world, timeline, xray, gallery, library, collections, tap-chi, brand, campaign, lesson, principle, brand-audit, assets-audit) | Một lượt thống nhất: token màu theo `data-theme` của app, đổi tên "Nhìn thấy" → "Tự Học Marketing", bỏ `.studio-*` thừa | Mở bất kỳ trang nào trong khung, không còn mảng tối/tên cũ |

## 2. Từng trang theo sidebar

### Dashboard · MarSocial
| Trang | Trạng thái | Thiếu gì | Việc |
|---|---|---|---|
| `hoc.html` Dashboard | THẬT | Chưa có nhật ký tuần/biểu đồ tiến độ; chỉ có "Học tiếp" + KPI | Thêm lịch học 7 ngày, mục tiêu tuần đặt được, gợi ý bài kế từ `/api/me/next` |
| `ruong.html` Rương | THẬT | Rương chỉ theo mốc streak (3/7/14…) | Giữ; thêm lịch sử rương đã mở + nội dung tài liệu thưởng thật cho 6 rương (kiểm lại có file) |
| `cong-dong.html` MarSocial | MỘT PHẦN | **Trống** ("Chưa có bài nào"); có đăng/bình luận/báo cáo nhưng chưa thông báo, chưa theo dõi, chưa ảnh | Seed 15–20 bài mẫu do quản trị đăng; thông báo trả lời; ảnh đính kèm; cuộn vô hạn; chạy `quan-tri` duyệt thử |

### Học tập
| Trang | Trạng thái | Thiếu gì | Việc |
|---|---|---|---|
| `xep-lop.html` | THẬT | Chỉ 1 lần/7 ngày, kết quả chưa hiện bản đồ "đã được ghi công" | Thêm màn kết quả theo chặng + nút "học từ chỗ chưa vững" |
| `hoc-bai.html` | THẬT | 690/738 bài có nội dung (`tools_validate_bai`: 0 lỗi); phần còn lại là chỗ trống trong bản đồ | Viết nốt module thiếu theo `KE-HOACH-700-BAI.md`; ẩn bài chưa có nội dung khỏi danh sách |
| `bai.html` | THẬT | Mở id sai chỉ báo "Không tìm thấy bài này" | Gợi ý bài gần nhất/ về lộ trình |
| `ban-do.html` + `roadmap.html` | THẬT | `roadmap` là kế hoạch 12 tháng tĩnh, chưa gắn tiến độ cá nhân | Đánh dấu tuần đã xong theo journal + hạn dự kiến |
| `nang-luc.html` | THẬT | "Triện" chưa xuất ảnh chia sẻ | Xuất ảnh/PNG hồ sơ năng lực + link công khai (PLAN Phase 5) |
| `capstone.html` + `positioning`/`segmentation`/`pricing` | THẬT (bài tập tự chấm theo ràng buộc) | Không chấm AI/không người duyệt; dữ liệu thương hiệu giả lập | Giữ chấm ràng buộc; thêm "gửi nhờ xem" lên MarSocial |

### Thực hành
| Trang | Trạng thái | Thiếu gì | Việc |
|---|---|---|---|
| `quiz.html` | **MÔ PHỎNG** | xem P0 #1 | |
| `challenge.html` | THẬT | Chỉ 1 tập thử thách cố định | Gộp vào Challenge Room mới để mục Quiz dẫn tới một nơi |
| `luyen.html` | THẬT | Cuối module, chưa có lịch lặp lại giãn cách | Nối với `on-loi` (ôn giãn cách 1-3-7 ngày) |
| `thi.html` | THẬT | Đề rút từ server; chưa có chứng nhận hoàn thành chặng | Cấp huy hiệu/giấy chứng nhận khi qua chặng, tải PDF |
| `kingdom.html` · `boss.html` · `pvp.html` · `shop.html` | THẬT (D1) | PvP đấu "bóng ma" là kết quả người học thật khi có, nếu không thì điểm mặc định `ghost_default`; boss/mùa cần người dùng mới sống | Seed ghost thật; kiểm cron reset tuần; chợ chưa có vật phẩm cosmetic hiển thị trên hồ sơ |
| `phong-van.html` | **MÔ PHỎNG** | xem P0 #2 | |
| `interview.html` | THẬT | Là bàn ghi phỏng vấn khách hàng (khác `phong-van`) — dễ nhầm tên | Đổi nhãn "Phỏng vấn khách hàng", liên kết chéo |
| `unit-economics.html` (Mô phỏng công cụ) | THẬT (máy tính) | Một công cụ duy nhất dưới nhãn "công cụ" | Thêm 3 công cụ: ma trận ưu tiên ICE, ngân sách media/SOV, cohort retention |
| `tro-choi.html` | THẬT nhưng là **mô hình cố định** ("số liệu minh hoạ") | Không bảng xếp hạng, không lưu kỷ lục | Lưu điểm tốt nhất + xếp hạng tuần |
| `on-loi.html` | THẬT | Chỉ phủ 12 bài tính số | Mở rộng sang lỗi MCQ; email/push nhắc đến hạn |

### Cộng đồng
| Trang | Trạng thái | Thiếu gì | Việc |
|---|---|---|---|
| `case-thu-vien.html` (Thư viện) | THẬT | Chỉ 5 case có dữ liệu mở | Mở rộng theo `cases.js`; lọc ngành/độ khó |
| `giai-case.html` | THẬT | Case giả định "COCOMI" | Thêm 5–10 case giả định theo ngành |
| `gallery`/`campaign`/`brand`/`xray`/`thuat-ngu` | THẬT (tĩnh) | Giao diện cũ (P0 #6) | Thống nhất giao diện |
| `bang-xep-hang.html` | THẬT | Trống khi chưa ai học; xem P0 #4 | |

### Tài khoản · Quản trị · Công khai
| Trang | Trạng thái | Việc |
|---|---|---|
| `tai-khoan.html` | THẬT (đổi tên, mời bạn, đăng xuất) | Thêm ảnh đại diện tải lên, xoá tài khoản, xuất dữ liệu |
| `quan-tri.html` | THẬT (số liệu D1, tin nhắn, kiểm duyệt) | Đặt `ADMIN_EMAILS` đúng ở production; thêm xuất CSV |
| `dang-nhap.html` | THẬT (Google) / email xem P0 #3 | |
| `index.html` landing | THẬT (tĩnh) | P0 #5; thêm trang "Giới thiệu/Điều khoản/Quyền riêng tư" công khai (hiện `gioi-thieu` yêu cầu đăng nhập) |

## 3. Việc xuyên suốt
1. **Responsive các trang nội dung.** Rail đã ổn ở 375/1000/1280; chưa rà từng trang nội dung ở 375px. Việc: chụp 50 trang ở 375 và 768, sửa tràn ngang/bảng.
2. **Kiểm thử E2E.** Thêm Playwright smoke: đăng nhập dev-link → mở lần lượt mọi mục sidebar → không lỗi console, không "cần máy chủ", không header nhân đôi.
3. **Trang ngoài khung.** Link tuyệt đối `/cong-dong.html` mở lẻ được đưa vào khung nhờ `core.js`/`app.js`; thêm test cho `case/*.html`.
4. **Chế độ tối.** `app.html` có theme tối nhưng nhiều trang nội dung chỉ hợp theme sáng — hoặc bỏ tối, hoặc chuẩn hoá token.
5. **Thanh toán/Pro** (PLAN Phase 3): chưa có và `PLAN.md` ghi rõ chưa làm. Cần quyết định có làm không trước khi gắn bất kỳ nhãn Pro nào.

## 4. Thứ tự đề xuất
1. P0 #1, #4, #5 (1 ngày — không cần dịch vụ ngoài) → 2. P0 #6 thống nhất giao diện (2–3 ngày) →
3. P0 #2, #3 (cần key/tên miền của bạn) → 4. Cộng đồng seed + thông báo → 5. Công cụ mới + nhóm học → 6. E2E + responsive nội dung.
