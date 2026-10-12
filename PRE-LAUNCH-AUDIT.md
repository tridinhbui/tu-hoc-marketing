# PRE-LAUNCH AUDIT — tuhocmarketing.org

Ngày kiểm: 2026-10-12 · Kiểm bởi: Claude (vai QA / Product Tester / UX Researcher)
Phiên bản kiểm: production hiện hành + bản sao cục bộ của repo (commit `29d0903` + working tree)

---

## 0. Phạm vi và giới hạn — đọc trước

| Ràng buộc | Hệ quả |
|---|---|
| Không được tạo tài khoản / đăng nhập thật trên production | Mọi luồng **đã đăng nhập** được kiểm trên **bản sao cục bộ** (Worker + D1 + KV cục bộ, tài khoản thử, `DEV_SHOW_LINK=1`) — cùng mã nguồn, **không** phải dữ liệu production. |
| Không kiểm thử phá hoại trên production | Production chỉ bị kiểm **chỉ-đọc** (GET, header, một POST `email` sai định dạng bị từ chối trước khi ghi gì). |
| Stack thực tế là **Cloudflare Workers + D1 + KV**, không phải Supabase/Vercel | "RLS" không áp dụng; phần tương đương (phân quyền trong Worker) đã được kiểm. Không có số liệu Supabase/Vercel usage. |

Nhãn: **PASS** = đã chạy và có bằng chứng · **FAIL** = lỗi tái hiện được · **PARTIAL** = kiểm một phần · **NOT TESTED** = chưa kiểm, không suy đoán.

---

## 1. Kết luận

# CONDITIONAL GO

Không tìm thấy lỗi P0 tái hiện được trong phạm vi kiểm. Lõi học tập (chấm câu, XP, phân quyền, chống nộp trùng, CSRF, OAuth) chạy đúng và được bảo vệ tốt. Nhưng có **3 điều kiện phải xử lý hoặc chấp nhận có chủ đích trước khi mở công khai**:

1. **Đáp án đề thi / bài tập đang tải được công khai không cần đăng nhập** (P1-1). Triển khai bằng `STRIP_ANSWERS=1` hoặc chấp nhận rủi ro gian lận.
2. **Đăng nhập production chỉ còn Google** (`/api/auth/providers` → `{"email":false,"google":true}`). Phải xác nhận ứng dụng OAuth đã ở trạng thái *In production* (không phải *Testing*, nếu không chỉ tài khoản test đăng nhập được) và đã thử đăng nhập Google thật một lần — việc tôi **không thể** làm.
3. **Triển khai lại bản đã sửa** (meta chia sẻ, sitemap, ảnh nén — xem mục 6) — các sửa này đang nằm trong working tree, **chưa deploy**.

Bằng chứng cho từng điểm ở các mục dưới.

---

## 2. Độ phủ kiểm thử

### 2.1 Luồng chức năng
| # | Hạng mục | Kết quả | Bằng chứng / ghi chú |
|---|---|---|---|
| 1 | Landing production tải, HTTP 200, `lang=vi`, 1 `<h1>`, ảnh đều có `alt` | PASS | curl + parse HTML |
| 2 | Chặn truy cập: khách vào 102 trang nội bộ → 302 `dang-nhap.html?next=…` | PASS | 102/103 URL sitemap trả 302 (có chủ đích) |
| 3 | Khách gọi API riêng tư (`state`, `me/stats`, `wallet`, `me/next`, `chat`, `admin/*`) | PASS | 7/7 trả 401 |
| 4 | Đăng nhập email → phiên → `/api/me` (cục bộ) | PASS | |
| 5 | Đăng nhập Google (production) | **NOT TESTED** | Chỉ xác nhận `google/start` 302 sang accounts.google.com với PKCE + `state`; không đăng nhập thật. |
| 6 | Gửi email link đăng nhập (production) | **NOT TESTED** | Tắt trên production (`MAIL_FROM` rỗng). |
| 7 | Hết hạn phiên (30 ngày KV) | **NOT TESTED** (chỉ đọc mã) | `Max-Age` 30 ngày; logout xoá phiên — PASS |
| 8 | Lấy quiz bài → trả lời → hoàn thành bài → XP (cục bộ, API) | PASS | `L:53`: 8 câu, hoàn thành khi chưa làm → 409; sau khi làm → `xp:5` (state `learned`, 50%) |
| 9 | Hoàn thành bài lần 2 không cộng XP lại | PASS | `xp:0` |
| 10 | Trả lời lại cùng câu không tính "lần đầu" | PASS | `first_attempt:false` |
| 11 | Gửi đồng thời 2 yêu cầu hoàn thành | **INCONCLUSIVE** | Kịch bản của tôi không đủ điều kiện (cả hai trả 409); chưa chứng minh được tính nguyên tử. |
| 12 | Đồng bộ trạng thái `PUT/GET /api/state` | PARTIAL | Body sai hình dạng bị 400 đúng; chưa kiểm vòng đồng bộ với hình dạng đúng. Body 2 MB bị 413. |
| 13 | Làm quiz bằng giao diện (bấm đáp án → lưu → XP) | **PARTIAL / NOT TESTED** | Trang bài tải, đủ nút đáp án, không lỗi JS; thao tác bấm tự động không kích hoạt được chấm trong trình duyệt headless. |
| 14 | Marketing Lab, mô phỏng, game, phỏng vấn, PvP, boss, shop, rương | PARTIAL | Cả 70 trang **tải sạch** (không lỗi JS, không HTTP ≥ 400) ở 375/768/1440; logic mô phỏng: `lab.test.mjs`, `games.test.mjs` PASS. Chưa chơi tương tác từng game. |
| 15 | Bảng xếp hạng | PARTIAL | API trả đúng, không lộ email; chưa có dữ liệu để kiểm xếp hạng. |
| 16 | Cộng đồng (đăng bài/bình luận/like) qua UI | PARTIAL | Kiểm qua API + đọc mã escape; không thao tác UI. |
| 17 | Phỏng vấn AI / trợ lý AI | **NOT TESTED** | Cần `ANTHROPIC_API_KEY`; không có trong môi trường kiểm. |
| 18 | Người dùng đã hoàn thành nhiều bài / đạt cấp cao | **NOT TESTED** | Mới kiểm tài khoản mới và 1 bài hoàn thành. |
| 19 | Refresh / back-forward trong khung `app.html` | **NOT TESTED** | |
| 20 | Admin (`/admin`, `/api/admin/*`) với tài khoản không phải admin | PASS | 6 endpoint GET + 1 PUT config đều 403 |

### 2.2 Bảo mật / kỹ thuật
| # | Hạng mục | Kết quả | Bằng chứng |
|---|---|---|---|
| S1 | CSRF: POST thiếu header `x-thmc` | PASS | 403 `csrf` |
| S2 | Rate limit link đăng nhập | PASS | 4 lần liên tiếp → 429 (3/15 phút theo email, 8/giờ theo IP) |
| S3 | Đầu vào xấu: JSON hỏng / email sai / email 5000 ký tự / state 2 MB | PASS | 400 / 400 / 413 / 413, không 500 |
| S4 | OAuth Google: PKCE S256, `state` dùng một lần (10 phút), kiểm `iss/aud/exp/email_verified`, `next` được lọc | PASS (đọc mã) | `api/src/google.js` |
| S5 | Cookie phiên `HttpOnly; SameSite=Lax; Secure` | PASS (đọc mã) | `lib.js:33` |
| S6 | Quiz không gửi đáp án xuống trình duyệt | PASS | `publicItem` chỉ trả `id,type,stem,options…` |
| S7 | XSS: tên hiển thị / nội dung cộng đồng render có `esc()` | PASS (mẫu) | Đã grep các trang cộng đồng, xếp hạng, admin; tên nhập `<img onerror>` bị cắt thẻ phía server. Không thể kiểm hết 83 điểm `innerHTML`. |
| S8 | Đáp án trong **file tĩnh công khai** | **FAIL** | Xem P1-1 |
| S9 | Header bảo mật (CSP, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, HSTS) | **FAIL** | Không có trong response production |
| S10 | `.git`, `schema.sql`, `PLAN.md` không truy cập được | PASS | 404 |
| S11 | Console / mạng lỗi | PASS | 70 trang × 3 viewport: 0 lỗi JS, 0 request ≥ 400 (ngoại trừ `/favicon.ico` 404 trên production) |
| S12 | Core Web Vitals / hiệu năng | FAIL (mobile) | Xem P1-4 |
| S13 | Chống gửi trùng (bài cộng đồng) | PARTIAL | Có trần 5 bài/ngày; **không** chống trùng nội dung |
| S14 | Cloudflare usage / giới hạn D1, KV, Workers | **NOT TESTED** | Không có quyền dashboard |
| S15 | Migration D1 trên production đã áp dụng đủ (0001–0010) | **NOT TESTED** | Chỉ kiểm cục bộ; `bank.json` đã sinh lại có thay đổi chưa commit |

### 2.3 Nội dung & học tập
| # | Hạng mục | Kết quả | Bằng chứng |
|---|---|---|---|
| C1 | Bộ test hồi quy repo | PASS 137/137 (+32/32 API) | khi chạy lần đầu; hiện **1 fail** do `hoc.html` đang chỉnh dở — xem P3-6 |
| C2 | Ngân hàng 5.182 câu: không trùng đề, không phương án trùng, 3–6 phương án, câu nào cũng thuộc bài, tham chiếu bài đều có thật | PASS | script trên `bank.json` |
| C3 | Tính đúng của câu tính toán (mẫu 7 câu ngẫu nhiên, tự tính lại) | PASS 7/7 | 10÷2,5=4 · (18.000−3.000)÷2=7.500 · 100×500k×40%=20tr · 3×40k=120k · 40×40%=16 · 2×30=60 · (60−40)÷10=2 |
| C4 | Bài ít hơn 5 câu | FAIL (nhẹ) | 29/760 bài; 2 bài chỉ 1 câu, 10 bài 2 câu — điểm bài dựa trên 1–2 câu |
| C5 | Toàn bộ 5.182 câu đúng về mặt chuyên môn | **NOT TESTED** | Chỉ mẫu 7 câu tính toán + các test tự động của repo. Cần người có chuyên môn rà. |
| C6 | Mức XP/streak/level/unlock (logic) | PARTIAL PASS | XP một lần/bài; streak/level trả đúng sau 1 ngày; unlock theo chặng được `stage-gate.test.mjs` bảo vệ; chưa mô phỏng nhiều ngày. |

### 2.4 Giao diện
| # | Hạng mục | Kết quả | Bằng chứng |
|---|---|---|---|
| U1 | Tràn ngang ở 375 / 768 / 1440 (70 trang) | 1 FAIL | `phong-van.html` rộng 378px ở viewport 375 |
| U2 | Landing mới vs trang bên trong | FAIL (nhất quán) | Xem P2-5 |
| U3 | Trạng thái loading / empty / error | NOT TESTED có hệ thống | Chỉ thấy trang trống hợp lệ của admin với người thường |
| U4 | Trợ năng (axe, bàn phím, đọc màn hình) | NOT TESTED | Landing có `aria-*`, focus-visible, reduced-motion (đọc mã) |
| U5 | Thiết bị thật (iOS Safari, Android) | **NOT TESTED** | Chỉ Chrome headless có giả lập |

---

## 3. Danh sách lỗi

### P0 — Blocker
**Không có lỗi P0 tái hiện được.** (Điều kiện gate #2 ở mục 1 là rủi ro cần xác nhận, không phải lỗi đã chứng minh.)

### P1 — Critical

**P1-1 · Đáp án đề thi và bài tập tải được công khai, không cần đăng nhập**
- URL: `https://tuhocmarketing.org/assets/js/data/exam-items.js` (160 dòng `answer:` + 38 `ans:`), `…/drills.js` (12 `ans:`). `/assets/*` bỏ qua Worker (`run_worker_first: ["/*","!/assets/*"]`) nên không bị chặn bởi tường đăng nhập.
- Tái hiện: `curl -s https://tuhocmarketing.org/assets/js/data/exam-items.js | grep -c "answer:"`.
- Mong đợi: đáp án chỉ ở server (`/api/answers`), như thiết kế của `bank.json`. Thực tế: `tools_build.mjs` chỉ gỡ đáp án khi `STRIP_ANSWERS=1`, và bản production đang không bật.
- Tác động: gian lận bài thi chặng, làm sai lệch bảng xếp hạng và độ tin cậy.
- Hướng sửa: deploy với `STRIP_ANSWERS=1 node tools_build.mjs`, rồi chạy lại các trang thi/luyện (`thi.html`, `on-loi.html`, `luyen.html`, `quiz.html`, `giai-case.html`) để chắc chắn không còn đường nào đọc đáp án từ file tĩnh. **Chưa kiểm tác động của bản đã gỡ đáp án lên giao diện** — cần chạy regression trước khi bật.

**P1-2 · Chia sẻ mạng xã hội hỏng; meta thiếu** — *ĐÃ SỬA trong working tree, chưa deploy*
- URL: `https://tuhocmarketing.org/`. `og:image` là đường dẫn tương đối (`assets/og/default.png`) nên Facebook/Zalo/Slack không lấy được ảnh; thiếu `og:url`, `canonical`, `twitter:card`, kích thước ảnh.
- Sửa: `index.html` — thêm canonical, `og:url/site_name/locale`, `og:image` tuyệt đối + `1200×630`, `twitter:card=summary_large_image`.
- Ghi chú sản phẩm: mọi trang `/case/*.html` đều bị 302 sang đăng nhập → link chia sẻ một case sẽ hiển thị trang đăng nhập cho crawler. Đây là **quyết định sản phẩm** (đóng cổng toàn site), không tự đổi.

**P1-3 · Sitemap liệt kê 103 URL bị chuyển hướng, gồm trang nội bộ** — *ĐÃ SỬA trong working tree, chưa deploy*
- URL: `https://tuhocmarketing.org/sitemap.xml` (104 URL; 102 × 302 + 1 × 307 + 1 × 200). Gồm cả `quan-tri.html`, `tools_og.html`.
- Tác động: Search Console báo "URL gửi qua sitemap bị chuyển hướng", lộ tên trang quản trị.
- Sửa: `tools_build.mjs` chỉ khai báo `/` (có `SITEMAP_ALL=1` để mở lại), `sitemap.xml` đã sinh lại (1 URL). Cần deploy.

**P1-4 · Hiệu năng mobile kém trên mạng chậm**
- Đo trên production, giả lập 375px, ~1,6 Mbps / RTT 150 ms, CPU ×4: **LCP 4,26 s (Poor > 4 s) · CLS 0,106 (Needs improvement > 0,1) · 38 request · 1,97 MB**. Desktop: LCP 0,41 s, CLS 0,018.
- Nguyên nhân thấy được: ảnh JPEG không tối ưu (hero 692 KB, owl 906 KB, nike 696 KB, apple 601 KB); trang cao ~16.000 px; HTML `no-store` và asset `max-age=0, must-revalidate` (không cache dài hạn).
- Đã làm: nén lại 6 ảnh (`hero_editorial_face` 691→85 KB, `poster_duolingo_owl` 906→157 KB, `poster_nike_athlete` 696→111 KB, `poster_apple_thinker` 601→71 KB, `hero_painting` 542→201 KB, `notebook_field_art` 207→106 KB; tổng −2,9 MB, cùng kích thước điểm ảnh, kiểm mắt trên landing). **Chưa đo lại LCP/CLS sau khi deploy.**
- Còn lại: nguồn CLS 0,106 chưa xác định; cần `fetchpriority`/preload ảnh hero, cache dài hạn cho `/assets/*` (đặt tên file có hash hoặc `Cache-Control` trong `_headers`).

**P1-5 · Đăng nhập email đang tắt trên production → Google là điểm lỗi duy nhất**
- `GET /api/auth/providers` → `{"email":false,"google":true}`; `wrangler.jsonc` có `"MAIL_FROM": ""`.
- Tác động: người không dùng Google không thể đăng ký; nếu OAuth ở chế độ Testing thì **không ai** ngoài tài khoản test đăng nhập được.
- Hướng: xác nhận trạng thái OAuth consent screen = *In production*; hoặc bật email (`wrangler email sending enable`, đặt `MAIL_FROM`). Kiểm màn hình `dang-nhap` hiển thị gì khi `email:false` — **NOT TESTED trên production**.

**P1-6 · Người dùng mới vào không có onboarding và được gọi bằng mã băm**
- Tái hiện (cục bộ, tài khoản mới): sau đăng nhập email → `tai-khoan.html?dang-nhap=ok` (hồ sơ, 0 XP, "Học viên 59B4"); lời chào ở dashboard: "Chào 6B9D, tiếp tục nhé".
- Mong đợi: người mới hiểu ngay phải làm gì tiếp theo và được gọi bằng tên/email, không phải 4 ký tự của UUID. Đăng nhập Google đi tới `next` còn đăng nhập email đi tới hồ sơ → hai luồng không nhất quán.
- Hướng sửa nhỏ: `publicName()` dùng phần trước `@` của email làm tên mặc định; sau đăng nhập đầu tiên điều hướng tới `bat-dau.html` (trang "Bạn muốn học marketing theo hướng nào?").
- Không tự sửa vì chạm luồng đăng nhập sát ngày launch.

### P2 — Minor

| ID | Vấn đề | Chi tiết / hướng sửa |
|---|---|---|
| P2-1 | Không có header bảo mật | Thiếu CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`. (Không đặt `X-Frame-Options: DENY` vì app chạy bằng iframe cùng origin — dùng `frame-ancestors 'self'`.) |
| P2-2 | Link đăng nhập một lần có thể bị bộ quét email "ăn" | `GET /api/auth/verify` tiêu thụ token ngay; Outlook/Gmail quét link trước khi người dùng bấm → báo "hết hạn". Nên dùng trang trung gian có nút xác nhận (POST). Chỉ liên quan khi bật lại email. |
| P2-3 | Rate-limit KV đọc-rồi-ghi (không nguyên tử) | `allow()` trong `lib.js:50`; yêu cầu song song có thể vượt hạn mức. Với mức dùng hiện tại ảnh hưởng thấp. |
| P2-4 | 29/760 bài có < 5 câu | 2 bài chỉ 1 câu (`L:61`…), điểm đạt dựa trên 1–2 câu → XP "passed" dễ. Bổ sung câu hoặc gộp bài. |
| P2-5 | Landing mới ≠ ngôn ngữ thiết kế bên trong | Landing đen/ngà + Fraunces; app bên trong kem/đất nung + Playfair + hoạ tiết hoa. Cùng "họ màu" nhưng đổi cảm giác ngay sau đăng nhập. (Một phiên làm việc khác đang có `atelier*.css` chưa commit để đồng bộ — nên chờ.) |
| P2-6 | `phong-van.html` tràn ngang 3 px ở 375 | `scrollWidth 378 > 375`. |
| P2-7 | Chữ số kiểu cổ điển làm "0đ" đọc thành "od" | Trang đăng nhập, ô thống kê "0đ miễn phí mãi mãi" (Playfair old-style figures). Dùng `font-variant-numeric: lining-nums`. |
| P2-8 | Nút chat Ý Ý + bong bóng lời chào chồng lên nội dung ở 375 | Che chữ ở cuối mỗi màn hình (dashboard, bản đồ cấp độ). |
| P2-9 | Cache tài sản | `Cache-Control: max-age=0, must-revalidate` cho CSS/JS/ảnh → mỗi lượt xem đều phải xác nhận lại. |
| P2-10 | `/favicon.ico` 404 | Landing có favicon SVG nhúng nên trình duyệt hiện đại ổn; một số crawler/ứng dụng vẫn hỏi `/favicon.ico`. |

### P3 — Enhancement / backlog
1. Khách gọi được `/api/answers` cho mọi `question_id` và nhận đáp án → có thể liệt kê đáp án rồi dùng tài khoản khác để lấy XP bài. Giới hạn theo IP/khách hoặc chỉ trả lời giải thích sau khi tài khoản đã có lượt đầu.
2. Bài đăng cộng đồng không chống trùng nội dung (chỉ giới hạn 5/ngày).
3. Like dùng "kiểm tra rồi chèn/xoá" (không có ràng buộc duy nhất tường minh trong đoạn đã đọc) — nên có `PRIMARY KEY (post_id, user_id)`.
4. `/api/stats` công khai trả `{"learners":2,"joined_7d":2}` — nếu hiển thị ra giao diện sẽ phản tác dụng khi số còn nhỏ.
5. Tiêu đề trang trùng nhau (`app`, `hoc`, `index`, `dang-nhap` cùng "Hành trình hôm nay…") — khó phân biệt tab/lịch sử.
6. `tests/links.test.mjs` fail giả trên `hoc.html:181` (`assets/img/${PHOTO[…]}` — test không hiểu template literal). Do chỉnh sửa chưa commit của phiên khác; ảnh có thật, không phải lỗi chạy.
7. Sửa test/quy trình để `STRIP_ANSWERS` là mặc định cho deploy production (bảo vệ bằng test: không file trong `dist/` chứa `answer:` của bank).

---

## 4. Mô phỏng 5 nhóm người dùng

Cách đánh giá: đọc landing production + duyệt bản cục bộ ở 375/1440 + trải nghiệm tài khoản mới. Đây là **đánh giá chuyên gia (heuristic)**, không phải nghiên cứu với người thật.

| Persona | Hiểu sản phẩm? | Tìm được nội dung phù hợp? | Hoàn thành một bài? | Lý do quay lại? | Điểm nghẽn chính |
|---|---|---|---|---|---|
| Người mới hoàn toàn | Có — headline "nhìn thế giới như strategist" rõ, nhưng thuật ngữ (strategist, case, XP) chưa được giải thích | Dashboard chỉ ra bài đầu "Hai quán phở…"; `bat-dau.html` hỏi hướng học | Không kiểm bằng UI (xem #13); API: được | Streak, bản đồ cấp độ — có nhưng chưa thấy trên ngày đầu | Đăng nhập → vào **hồ sơ 0 XP "Học viên 59B4"**, không có bước kế tiếp nổi bật (P1-6) |
| Sinh viên marketing | Có | Thư viện 20 case + 14 thương hiệu rất phù hợp | Có thể (case có bấm giờ) | Case thực tế, giải case có bấm giờ | Case bị đóng sau đăng nhập → khó chia sẻ/tìm trên Google (P1-2) |
| Người đi làm chuyển ngành | Phần lớn | Có lộ trình nghề nghiệp ("Bản đồ nghề nghiệp", 0% sẵn sàng Marketing Executive) | — | Có mục tiêu nghề rõ | Chỉ Google để đăng nhập (P1-5); yêu cầu thời gian chưa rõ |
| Marketing professional luyện chiến lược | Có | Marketing Lab (SEO, Meta, Google Ads, GA4), giải case dữ liệu mở | Không kiểm sâu | Công cụ mô phỏng có KPI là lý do mạnh nhất | Nội dung bậc cơ bản có thể làm họ thấy chậm — cần đường tắt/placement (có `/api/placement`, **NOT TESTED**) |
| Mobile, 5 phút | Khá — nhưng landing rất dài (16.000 px) và nặng (LCP 4,3 s trên mạng giả lập) | Nút "Bắt đầu" luôn thấy | Bài học "6 phút/bài" vừa sức | Streak | Tải chậm (P1-4); chat Ý Ý che nội dung (P2-8) |

---

## 5. Top 10 cần xử lý trước launch

1. **Gỡ đáp án khỏi file tĩnh công khai** (`STRIP_ANSWERS=1`) và chạy regression các trang thi/luyện. — P1-1
2. **Xác nhận Google OAuth ở trạng thái *In production* và đăng nhập thật một lần** (cả tài khoản mới). — P1-5
3. **Deploy bản đã sửa**: meta chia sẻ, sitemap 1 URL, ảnh đã nén. — P1-2/3/4
4. **Đo lại LCP/CLS mobile sau deploy** và tìm nguồn CLS 0,106 (ưu tiên ảnh hero có kích thước cố định). — P1-4
5. **Điều hướng người mới sau đăng nhập tới "Bắt đầu từ đâu"** và đặt tên mặc định từ email thay vì mã UUID. — P1-6
6. **Quyết định sản phẩm về cổng đăng nhập cho `/case/*`**: nếu cần SEO/chia sẻ thì mở các trang case và dùng `SITEMAP_ALL=1`; nếu không thì ghi rõ trong kế hoạch tăng trưởng.
7. **Thêm header bảo mật cơ bản** (`nosniff`, `Referrer-Policy`, CSP ở chế độ report-only trước). — P2-1
8. **Cache dài hạn cho `/assets/*`** (hash tên file hoặc `_headers`). — P2-9
9. **Chạy kiểm UI thật** quiz → XP → lưu tiến độ trên thiết bị thật (iOS Safari + Android Chrome) — phần tôi chưa kiểm được (#13, U5).
10. **Rà chuyên môn nội dung** (C5) và bổ sung câu cho 12 bài có ≤ 2 câu. — P2-4

---

## 6. Thay đổi đã thực hiện (chưa commit, chưa deploy)

| File | Thay đổi | Lý do |
|---|---|---|
| `index.html` | Thêm canonical, `og:url`, `og:site_name`, `og:locale`, `og:image` tuyệt đối + kích thước, `twitter:*` | P1-2 |
| `tools_build.mjs` | Sitemap chỉ chứa trang công khai (`SITEMAP_ALL=1` để mở lại) | P1-3 |
| `sitemap.xml` | Sinh lại: 1 URL | P1-3 |
| `assets/img/{hero_editorial_face,poster_duolingo_owl,poster_nike_athlete,poster_apple_thinker,hero_painting,notebook_field_art}.jpg` | Nén lại (q76, progressive), cùng kích thước | P1-4 |

Không đổi kiến trúc, không đổi luồng đăng nhập, không đổi thiết kế.

**Regression sau sửa:** landing hiển thị đúng (ảnh case, hero) ở 1440; `node --test tests/*.test.mjs` → 136 pass / 1 fail; lỗi duy nhất là `links.test` bắt `hoc.html` chưa commit của phiên khác (P3-6), không liên quan thay đổi trên.

---

## 7. Rủi ro còn tồn tại

- **Chưa có bằng chứng** đăng nhập Google hoạt động trên production với người dùng thật.
- **Chưa kiểm** quiz bằng giao diện từ đầu đến cuối (chỉ qua API) và trên thiết bị thật.
- **Chưa kiểm** phỏng vấn AI (phụ thuộc secret + hạn mức AI: `AI_INTERVIEW_PER_MONTH=3`, `AI_ASSIST_PER_DAY=10`) — một lỗi ở đây hiện ra ngay với người dùng và có chi phí.
- **Working tree đang rất bẩn**: hàng chục file chưa commit từ các phiên khác (`atelier*.css`, `hoc.html`, `bank.json`…). Nếu deploy từ thư mục làm việc thay vì từ commit, thứ lên production không tái hiện được. Nên cố định một commit để deploy.
- **Cổng đăng nhập toàn site** làm giảm khả năng khám phá (SEO, chia sẻ). Đây là rủi ro tăng trưởng, không phải lỗi.
- **Quy mô**: production hiện có 2 học viên (`/api/stats`). Mọi hành vi dưới tải thật (D1 ghi đồng thời, KV rate limit không nguyên tử) **chưa được kiểm**.
- **Bản cục bộ ≠ production**: D1/KV production có thể khác (migration, dữ liệu); không có cách kiểm từ phía tôi.

---

## 8. Cách kiểm để tái hiện

- Production chỉ-đọc: `curl -sI`, `curl -s …/assets/js/data/exam-items.js | grep -c "answer:"`, `curl -s …/api/auth/providers`, so khớp `sitemap.xml` với trạng thái 302.
- Cục bộ: `wrangler dev` với D1/KV mô phỏng, `DEV_SHOW_LINK=1`, build `dist/` từ `tools_build.mjs`; kịch bản `e2e.mjs` (36 kiểm tra API: 35 PASS, 1 FAIL do kịch bản sai hình dạng body — không phải lỗi sản phẩm), quét 70 trang bằng Chrome ở 375/768/1440, đo hiệu năng bằng CDP (giả lập 4G + CPU ×4).
