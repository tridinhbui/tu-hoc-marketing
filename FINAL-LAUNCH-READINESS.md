# FINAL LAUNCH READINESS — tuhocmarketing.org

Release candidate: nhánh `release/launch-rc` (worktree `../tuhocmarketing-rc`), dựng từ `main@29d0903`.
Ngày: 2026-10-12 · Dựa trên [PRE-LAUNCH-AUDIT.md](PRE-LAUNCH-AUDIT.md).

> **Trạng thái:** RC đã sẵn sàng để duyệt. **Chưa push, chưa deploy.** Dừng trước bước production theo yêu cầu.

---

## 0. Kết luận

# CONDITIONAL GO

Mọi blocker kỹ thuật tôi có thể sửa và kiểm chứng đều đã được sửa và có bằng chứng bên dưới. Không thể nâng lên **GO** vì ba việc chỉ chủ sản phẩm làm được trên production (mục 6): đăng nhập Google thật, áp dụng deploy đúng quy trình, và xác nhận cấu hình OAuth/secrets. Làm xong checklist mục 6 và kết quả khớp thì chuyển thành GO.

---

## 1. Blocker đã sửa — kèm bằng chứng

Mọi kiểm chứng chạy trên worker cục bộ (D1/KV mô phỏng) với **bản dist cuối cùng** (`tools_build.mjs` mặc định gỡ đáp án), trừ ghi chú.

### B1 · Đáp án đề thi / bài tập công khai (P1-1) — ĐÃ SỬA
| Kiểm | Trước | Sau |
|---|---|---|
| `grep -c "answer:" dist/assets/js/data/exam-items.js` | 160 | **0** |
| File `dist/assets/js/data/bai/*.js` còn trường `answer`/`why` | 5.182 câu có đáp án | **0 file** |
| Source map trong `dist/` | — | **0** |
| `GET /api/quiz/lesson/*`, `/api/exams/draw`, `/api/exams/stage`, `/api/placement`, `/api/review/session`, `/api/boss`, `/api/pvp` | — | 12/12 không chứa `answer/ans/why/steps/correct` (`api/qa/leak.mjs`) |
| `POST /api/answers` bằng khách | trả đáp án | **401** |
| `POST /api/answers` với `chosen` rác (`null`, `"zzz"`, `[1]`) | trả đáp án đúng | **400 invalid_answer** |

Thay đổi: `tools_build.mjs` gỡ đáp án **mặc định** (`KEEP_ANSWERS=1` mới giữ, kèm cảnh báo); test `tests/answers-not-public.test.mjs` chặn tái diễn.

### B2 · Trình duyệt tự khai XP / điểm — LỖ HỔNG MỚI PHÁT HIỆN VÀ ĐÃ SỬA
Audit trước chưa phát hiện. Khi kiểm Phase 1, một tài khoản mới gửi `PUT /api/state` với sổ cái giả và **ngay lập tức** có:

| | Trước sửa | Sau sửa |
|---|---|---|
| Tổng XP | **22.550** | **300** (giới hạn cứng của XP mang từ bản cũ) |
| Cấp độ | **14** | 4 |
| Bảng xếp hạng tuần | **hạng 1, 3.000 XP** | **0 XP** |
| 500 "case" không có thật, 50 bài không có thật, `exam:s1` chưa thi | được nhận | **bị loại** (`api/src/xp-trust.js`) |

Cách sửa (không đổi kiến trúc): server chỉ nhận một dòng sổ cái khi có bằng chứng phía server hoặc tham chiếu có thật:
`lesson/learned/solid/drill/talk` ⇒ bài đã được server ghi (`/complete` sau khi server chấm câu trả lời) · `exam` ⇒ lượt thi đã chấm đạt ở server · `case` ⇒ id có trong danh mục · `quest/chest/boss/pvp/referral` ⇒ chỉ server cấp · ngày phải trong cửa sổ [−7, +1] và sự kiện đã ghi không dời ngày được · `legacy:base` ≤ 300, chỉ khi chưa có XP do server cấp, và không tính vào bảng xếp hạng tuần. `ingestLessons` không còn tin trường `source` do trình duyệt khai. Chỉ số "case" của bảng xếp hạng chỉ đếm case có thật (1 lần/case).

### B3 · Hoàn thành bài không được ghi ở server (lỗi **đang có trên production**) — ĐÃ SỬA
`bai.html` gọi `/api/lessons/` + `encodeURIComponent("B:ob01-01")` ⇒ `%3A`; route chỉ khớp dấu `:` ⇒ **404 trên production** (đã kiểm: `…/L%3A53/complete → 404`, `…/L:53/complete → 401`). Hậu quả: server chưa bao giờ ghi hoàn thành bài từ giao diện thật. Sửa ở `api/src/index.js` (chuẩn hoá `%3A`), giữ nguyên client.
Bằng chứng giao diện: bấm đáp án → "Nộp bài" → **XP server 0 → 10**; chờ đồng bộ vẫn 10; refresh còn `lessons[B:ob01-01].state=passed`; logout → login lại XP vẫn 10.

### B4 · Đề vượt chặng chỉ do trình duyệt tự tính "đã qua" — ĐÃ SỬA
`thi.html` trước đây dùng `/exams/draw` (không có lượt thi) rồi tự quyết đạt/không. Nay (`assets/js/exam.js`, `thi.html`): đăng nhập thì lấy đề theo **lượt thi của server**, nộp cả đề một lần, server chấm, ghi lượt, cấp 50 XP và ghi công bài của chặng. Giao diện kết quả giữ nguyên.
Kiểm bằng trình duyệt:
- đúng 15/15 → "Qua chặng", server cộng **50 XP**, `state.exams.s1.passed` có, thi lại không bị khoá sai.
- sai 0/15 → "Chưa qua… cần 12", **không XP**, server khoá 60 phút (`429 cooldown`), mở lại trang thi không cho thi ngay.
- API: nộp lại cùng lượt → 409; dùng `attempt_id` của người khác → 404; khai `exam:s1` khi chưa đạt → 0 XP.

### B5 · LCP / CLS mobile (P1-4) — ĐÃ SỬA, CẦN ĐO LẠI TRÊN PRODUCTION
| | Production (trước) | RC cục bộ (giả lập 375px, ~1,6 Mbps, RTT 150 ms, CPU ×4) |
|---|---|---|
| CLS | 0,106 | **0,025** |
| LCP | 4,26 s | **1,39 s** (phần tử LCP: đoạn dẫn hero) |
| Dung lượng ảnh lớn nhất | 906 KB | 157 KB (6 ảnh nén, −2,9 MB) |
Nguyên nhân CLS xác định bằng `layout-shift` + nguồn: hiệu ứng gõ chữ của bong bóng Ý Ý (`.yy-tip`, hộp lớn dần từng chữ) và gõ lại đoạn dẫn hero. Sửa: giữ chỗ đúng kích thước cuối cho bong bóng (`yy.js`), bỏ `autoType` trên đoạn dẫn hero.
⚠ Số RC là **cục bộ có giả lập**, không phải đo field trên production — cần đo lại sau deploy (mục 6).

### B6 · SEO / chia sẻ (P1-2, P1-3) — ĐÃ SỬA
Trên `dist/` cuối: canonical `https://tuhocmarketing.org/` · `og:url` · `og:image` tuyệt đối 1200×630 · `twitter:card=summary_large_image` · `sitemap.xml` **1 URL** (trước 104, trong đó 103 bị 302) · `robots.txt` trỏ sitemap đúng tên miền · trang sinh `case/*.html` có canonical riêng đúng tên miền.
Lưu ý sản phẩm (không đổi): `/case/*` vẫn đóng sau đăng nhập nên crawler thấy trang đăng nhập — đây là quyết định chiến lược, xem mục 5.

### B7 · Người dùng mới (P1-6) — ĐÃ SỬA
- Lời chào dùng `friendly_name` (tên đã đặt, hoặc phần đầu email) — chỉ trả cho chính người đó; bảng xếp hạng vẫn ẩn danh ("Học viên D955").
- Dashboard 0 bài: nhãn "Bài đầu tiên của bạn", giải thích "Mỗi bài khoảng 6 phút: đọc, một câu dừng giữa bài, rồi 5 câu kiểm tra nhanh… +10 XP", nút "Bắt đầu bài đầu tiên →".
- Hồ sơ: tiêu đề là tên thân thiện + gợi ý đặt tên hiển thị; ô đổi tên điền sẵn gợi ý, không điền mã băm.
- Kiểm bằng trình duyệt: "Chào Ui, mình bắt đầu từ đây nhé", không còn "Chào 6B9D".

### B8 · `phong-van.html` tràn ngang (P2-6) — ĐÃ SỬA
`.pv-chip` có `white-space:nowrap` ⇒ 378px ở viewport 375px. Cho phép xuống dòng. Quét 70 trang × 375/768/1440: 0 tràn ngang.

---

## 2. Xác thực (Phase 2)

| Hạng mục | Kết quả | Chứng cứ |
|---|---|---|
| Google OAuth: PKCE S256, `state` dùng một lần 10 phút, kiểm `iss/aud/exp/email_verified`, `next` lọc chống open redirect | **PASS (đọc mã + kiểm cục bộ phần không cần Google)** | `google.js`; callback `state` sai → `loi=google` |
| Redirect URI do server dựng = `${APP_ORIGIN}/api/auth/google/callback` = `https://tuhocmarketing.org/api/auth/google/callback` | **PASS (production, chỉ-đọc)** | `GET /api/auth/google/start` trên production → 302 `accounts.google.com`, `redirect_uri` đúng |
| URI trên đã được khai trong Google Cloud Console | **MANUAL VERIFICATION REQUIRED** | Không có quyền truy cập console |
| Trạng thái OAuth consent screen = *In production* (không phải *Testing*) | **MANUAL VERIFICATION REQUIRED** | idem |
| `GOOGLE_CLIENT_SECRET` đã đặt (`wrangler secret`) | **Gián tiếp:** `/api/auth/providers` → `google:true` yêu cầu cả ID và secret | cần xác nhận lại bằng một lần đăng nhập thật |
| Đăng nhập Google thật trên production | **MANUAL VERIFICATION REQUIRED — chưa PASS** | Không tạo tài khoản / đăng nhập thay người dùng |
| Cookie phiên `HttpOnly; SameSite=Lax; Max-Age=30 ngày` (+`Secure` trên https) | PASS | header `Set-Cookie` |
| Trang bảo vệ: khách → 302 `dang-nhap.html?next=…`; cookie rác → 302; `/api/me` → `user:null` | PASS | `api/qa` + kiểm tay |
| Link email dùng một lần; dùng lại → `loi=het-han`; token sai → `loi=link` | PASS | |
| Hết hạn phiên (xoá khoá phiên khỏi KV) → trang 302, API 401 | PASS (mô phỏng) | không chờ 30 ngày thật |
| Open redirect `next=//evil…`, `next=https://evil…` | PASS (về `/app.html`) | |
| Logout → phiên mất; refresh; login lại khôi phục tiến độ | PASS (UI) | |

**Đăng nhập email đang tắt: là CẤU HÌNH CHƯA THIẾT LẬP, không phải chủ đích tắt tính năng.**
- Cơ sở: `wrangler.jsonc` có `"MAIL_FROM": ""`; `DEPLOY.md` §4 mô tả đây là bước tuỳ chọn cần tên miền riêng + `wrangler email sending enable`; `/api/auth/providers` chỉ báo `email:true` khi có binding `EMAIL` **và** `MAIL_FROM` hợp lệ; giao diện đăng nhập tự ẩn nút email và hiện Google (và có thông báo khi không có phương thức nào).
- Không có cờ/ghi chú "đã chủ đích tắt". Không bật: bật cần quyết định của chủ sản phẩm (tên miền gửi thư, SPF/DKIM) — **không** tự bật theo yêu cầu.
- Hệ quả: người không dùng Google không đăng ký được. Đây là rủi ro tăng trưởng, không phải lỗi.

---

## 3. Build / lint / test

| Lệnh | Kết quả |
|---|---|
| `node --test tests/*.test.mjs` | **139 pass / 0 fail** (RC; thêm 2 test chống lộ đáp án) |
| `cd api && npm test` | **40 pass / 0 fail** (thêm 8 test `xp-trust`, 1 test legacy cap) |
| `node --check` mọi `api/src/*.js`, `assets/js/exam.js`, `assets/js/yy.js` | OK |
| Lint | **Không có công cụ lint trong repo** — NOT RUN (không tự thêm toolchain sát launch) |
| `SITE_URL=https://tuhocmarketing.org node tools_build.mjs` | OK: 70 trang + 34 trang sinh, "đã bỏ đáp án: 5182 câu trong 80 file", dist 22,2 MB (trước 27,3 MB) |
| `api/qa/{forge,legit,exam,leak}.mjs` (mới) | Đều đạt kỳ vọng (xem B1–B4) |

Ghi chú: ở `main` làm việc (nhánh `curriculum-fix`) một phiên khác có `hoc.html` dở dang khiến `links.test` fail giả (template literal). RC không chứa thay đổi đó nên không bị ảnh hưởng.

---

## 4. Thay đổi của release candidate

Nhánh `release/launch-rc`, 4 commit. Tổng 36 file (+900 −145 dòng so với `main`):

**Commit 1 — Bảo mật & toàn vẹn thi** (`security:`)
`api/src/{xp-trust.js (mới), progress.js, state.js, learn.js, engine.js, index.js}` · `api/src/generated/xp-refs.json (mới)` · `api/tools/build-xp-refs.mjs (mới)` · `api/package.json` · `api/test/{xp-trust.test.mjs (mới), engine.test.mjs}` · `assets/js/exam.js` · `thi.html` · `tools_build.mjs` · `tests/answers-not-public.test.mjs (mới)` · `api/qa/* (mới)` · `DEPLOY.md`

**Commit 2 — Hiệu năng & SEO** (`perf/seo:`)
`index.html` · `assets/js/yy.js` · `assets/img/{hero_editorial_face,hero_painting,notebook_field_art,poster_apple_thinker,poster_duolingo_owl,poster_nike_athlete}.jpg` · `sitemap.xml`

**Commit 3 — Người dùng mới & tràn ngang** (`ux:`)
`hoc.html` · `tai-khoan.html` · `api/src/auth.js` · `phong-van.html`

**Commit 4 — Tài liệu**
`PRE-LAUNCH-AUDIT.md` · `FINAL-LAUNCH-READINESS.md`

### Phân loại thay đổi KHÔNG đưa vào RC (nằm ở working tree / nhánh khác)

| Nhóm | Nội dung | Trạng thái | Quyết định |
|---|---|---|---|
| **A. Làm mới giao diện "atelier"** (phiên khác) | `assets/css/atelier.css`, `atelier-shell.css` (mới) + ~70 trang HTML thêm `<link>` + `paper.js`, `social-ui.js`, `social.js`, `core.js`, `app.js`, `bai.html`, `hoc.html` (133 dòng) | **Đang dở, chưa commit, chưa qua regression** | **Loại.** Cần regression riêng (đặc biệt `hoc.html`: sẽ xung đột với B7) |
| **B. Rà nội dung `curriculum-fix`** (phiên khác) | 2 commit sau `main`: "sửa P0 quiz…", "xác minh 186 khẳng định…"; 81 file, +43.552 dòng (`bank.json`, dữ liệu bài) | Đã commit trên nhánh, **chưa qua regression của RC** | **Loại.** Merge sau khi chạy lại `npm test`, `qa/*`, quét 70 trang |
| **C. Thay đổi từ phiên audit của tôi ở working tree** | `index.html` meta, `tools_build.mjs`, `sitemap.xml`, 6 ảnh, `PRE-LAUNCH-AUDIT.md` | Đã kiểm | **Đã gộp vào RC** (commit 2, 4) — bản trong working tree sẽ trùng, bỏ qua khi merge |
| **D. Chưa xác minh** | `api/tools/seed-dev.mjs`, `api/src/generated/bank.json` (bản đang sửa) | Không rõ nguồn | **Loại** |

Không có thao tác discard / overwrite nào lên work của phiên khác: RC được dựng trong **worktree riêng**; working tree gốc (nhánh `curriculum-fix`) không bị đụng.

---

## 5. Kết quả regression cuối (Phase 5)

Môi trường: worker cục bộ + bản dist cuối; Chrome headless; tài khoản thử đăng nhập bằng link dev. **Google không test được** (xem §2).

| # | Luồng | 375 | 768 | 1440 | Ghi chú |
|---|---|---|---|---|---|
| 1 | Landing → CTA → trang đăng nhập | PASS | NOT TESTED | NOT TESTED | 390px đã chạy UI; 768/1440 chỉ quét tải trang |
| 1b | Landing → **Google login** → Dashboard | **MANUAL** | | | |
| 1c | Landing → email login (dev link) → Dashboard | PASS | | | |
| 2 | Dashboard → Học bài → Quiz → Nộp → XP server → Progress | PASS (390) | NOT TESTED | NOT TESTED | 5/5, +10 XP, `state=passed` |
| 3 | Refresh → Logout → Login → khôi phục tiến độ | PASS | | | XP 10 → 10 |
| 4 | Thi thử → Nộp → Chấm → Kết quả (đạt) | PASS (390) | | | +50 XP, triện |
| 4b | Thi thử trượt → khoá 60' → mở lại | PASS (390) | | | server 429, UI không cho thi |
| 5 | Marketing Lab (Meta/GAds/GA4/SEO): vào → thao tác → lưu → refresh | PARTIAL | | | Bắt đầu + ghi `flags.lab` + đồng bộ server + còn sau reload: PASS. **Chưa chạy sâu một vòng mô phỏng bằng UI** (logic mô phỏng đã có test) |
| 6 | Hồ sơ / Bảng xếp hạng | PASS (tải, nội dung) | | | Bảng xếp hạng chưa có dữ liệu thật để kiểm xếp hạng nhiều người |
| 6b | Streak qua nhiều ngày | **NOT TESTED** | | | Chỉ ngày đầu; logic `replayStreak` có test |
| 7 | Quét 70 trang: lỗi JS / HTTP ≥ 400 / tràn ngang | **PASS** 0/0/0 | **PASS** 0/0/0 | **PASS** 0/0/0 | `quan-tri.html` hiện thông báo quyền với tài khoản thường (đúng) |
| 8 | Chống thao tác lặp: nộp bài lặp, `complete` lặp, `PUT state` lặp | PASS (API) | | | XP không nhân đôi |
| 9 | Hai lần `complete` đồng thời | **NOT TESTED** | | | `INSERT OR IGNORE` có ràng buộc duy nhất — chưa chạy song song |
| 10 | Trạng thái lỗi: server 5xx giữa lúc chấm | PARTIAL | | | `GRADE_OFFLINE` có trong mã; không mô phỏng ngắt mạng |
| 11 | Phỏng vấn AI / trợ lý AI | **NOT TESTED** | | | Cần `ANTHROPIC_API_KEY` |
| 12 | Thiết bị thật iOS/Android | **NOT TESTED** | | | |

### Rủi ro còn tồn tại (đã biết, có chủ đích hoặc chờ quyết định)

1. **Case / drill / bài lab vẫn chấm ở trình duyệt** (`cases.js`, `drills.js`, `ga4-eval.js` còn đáp án trong gói công khai). Đây là luyện tập chấm tại chỗ theo thiết kế; chuyển sang server là đổi kiến trúc. **Mức rủi ro đã giới hạn:** XP của case ≤ 12×40 = 480 tổng, drill 15 XP/bài và chỉ tính khi bài đã được server ghi; trần ngày cho nhóm tự khai (quiz/game/focus/daily/review ≈ 175 XP/ngày, tuần ≤ 3.000). Người dùng vẫn có thể tự "đọc đáp án" các phần này — không ảnh hưởng đề vượt chặng hay bảng xếp hạng tuần vượt trần.
2. **Ngân hàng câu hỏi dùng chung cho luyện tập và đề chặng**: sau khi trả lời, `/api/answers` phải trả đáp án, nên người dùng kiên nhẫn có thể vét ngân hàng bằng nhiều tài khoản. Đã giảm: khách bị chặn, `chosen` rác bị loại, trần 3.000 lượt chấm/24 giờ/tài khoản, đề chặng chấm cả đề ở server. Chống triệt để cần tách ngân hàng đề — việc sau launch.
3. **`legacy:base` tối đa 300 XP** cho tài khoản mới tự khai (cần cho người đã học trước khi có tài khoản). Tương đương một vài bài; không vào bảng xếp hạng tuần.
4. **`app_config` production có `legacy_cap=2000`** (seed `0002`). Mã đã kẹp cứng ở 300; nên cập nhật DB cho khớp (không bắt buộc).
5. **Học ngoại tuyến quá 7 ngày**: XP cũ hơn cửa sổ ngày không được ghi khi đồng bộ.
6. **`hoc.html` xung đột sẽ xảy ra** khi hợp nhất nhóm A (atelier) với B7.
7. **Cổng đăng nhập toàn site** (`/case/*` cũng đóng): làm yếu SEO và chia sẻ trang case. Mở công khai các trang case và dùng `SITEMAP_ALL=1` là quyết định sản phẩm.
8. **Header bảo mật** (CSP, `nosniff`, `Referrer-Policy`) chưa có — P2, không sửa sát launch.
9. **Link email một lần có thể bị bộ quét email tiêu thụ** — chỉ khi bật email.
10. **Quy mô thật** chưa kiểm (production hiện ~2 học viên).

---

## 6. Checklist xác minh thủ công (cho quản trị viên)

Làm **sau deploy**, theo thứ tự. Mỗi mục ghi PASS/FAIL, ngày, người kiểm.

**A. Cấu hình (trước khi deploy)**
- [ ] Google Cloud Console → OAuth consent screen: *Publishing status = In production*.
- [ ] Credentials → OAuth client: *Authorized redirect URIs* có `https://tuhocmarketing.org/api/auth/google/callback`; *Authorized JavaScript origins* có `https://tuhocmarketing.org`.
- [ ] `npx wrangler secret list` có `GOOGLE_CLIENT_SECRET` (và `ANTHROPIC_API_KEY` nếu dùng AI).
- [ ] `ADMIN_EMAILS` đúng; **không** đặt `DEV_SHOW_LINK` trên production.
- [ ] `npx wrangler d1 migrations list DB --remote`: 0001–0010 đều *applied*.

**B. Deploy (cần phê duyệt của bạn)**
- [ ] Làm đúng `DEPLOY.md` mục "Phát hành production": test → `tools_build.mjs` → `grep -c "answer:" dist/…/exam-items.js` = 0 → `cd api && npm run deploy`.
- [ ] Ghi lại ID phiên bản Worker trước khi deploy (để rollback).

**C. Ngay sau deploy (production, không phá hoại)**
- [ ] `curl -s https://tuhocmarketing.org/assets/js/data/exam-items.js | grep -c "answer:"` → **0**.
- [ ] `curl -s https://tuhocmarketing.org/ | grep -E "canonical|og:image|twitter:card"` có đủ, URL tuyệt đối.
- [ ] `https://tuhocmarketing.org/sitemap.xml` chỉ 1 URL. Dán link vào Facebook Sharing Debugger / Zalo: ảnh và tiêu đề hiện đúng.
- [ ] `curl -s -XPOST https://tuhocmarketing.org/api/lessons/L%3A53/complete -H 'x-thmc: 1' -H 'content-type: application/json' -d '{}'` → **401** (không còn 404).

**D. Tài khoản thật (một tài khoản Google mới + một tài khoản đã có)**
- [ ] Landing → "Bắt đầu học" → Đăng nhập Google → vào dashboard. Lời chào **không** là mã 4 ký tự.
- [ ] Làm 1 bài + 5 câu → hiện "Hoàn thành", XP tăng đúng 10 ở dashboard **và** sau khi F5.
- [ ] Đăng xuất → đăng nhập lại → XP, bài đã học còn.
- [ ] Thi thử chặng 1 (cố tình trượt): hiện "Chưa qua", mở lại thấy phải chờ; (nếu đủ kiên nhẫn) thi đạt → +50 XP.
- [ ] Mở Marketing Lab (Meta Ads): bắt đầu → chạy một vòng → F5 → dữ liệu còn.
- [ ] Hồ sơ hiển thị XP/streak; Bảng xếp hạng tuần có tên ẩn danh, không lộ email.
- [ ] Trên điện thoại thật (iOS Safari + Android Chrome): landing cuộn mượt, không tràn ngang; làm một bài.
- [ ] Thử đóng trình duyệt giữa lúc thi và mở lại: bài làm dở được khôi phục.

**E. Theo dõi 24 giờ đầu**
- [ ] Cloudflare Workers Observability: tỉ lệ 5xx, lỗi `/api/answers`, `/api/exams/stage`.
- [ ] D1: số dòng `xp_events` bất thường theo user (có ai > 3.000 XP/tuần không).
- [ ] Core Web Vitals field (CrUX/RUM) hoặc đo lại LCP/CLS mobile bằng PageSpeed Insights.

---

## 7. Kế hoạch rollback

**Nguyên tắc:** thay đổi đều nằm trong 1 Worker + assets cùng origin, không có migration DB mới ⇒ rollback chỉ là quay lại phiên bản Worker trước. Không có thay đổi schema để hoàn tác.

1. **Nhanh nhất (< 2 phút):** Cloudflare Dashboard → Workers → `tu-hoc-marketing` → *Deployments* → chọn phiên bản trước → *Rollback*. Hoặc: `cd api && npx wrangler rollback`.
2. **Từ git:** `git checkout main -- . && SITE_URL=https://tuhocmarketing.org STRIP_ANSWERS=1 node tools_build.mjs && cd api && npm run deploy`.
3. **Dữ liệu:** RC không xoá/ghi dữ liệu mới ngoài các bảng sẵn có. Sổ cái `xp_events` chỉ ít bị cập nhật hơn (không dời ngày, không tăng giá trị tự khai). Không cần khôi phục D1.
4. **Triệu chứng nên rollback ngay:** (a) người học báo "làm bài xong không được XP" kéo dài (kiểm `/api/lessons/*/complete` trả 409/500); (b) thi không nộp được (`/api/exams/stage/*` 5xx); (c) tỉ lệ 5xx `/api/state` > 2%.
5. **Giảm thiểu không cần rollback:** nếu chỉ riêng đề chặng gặp lỗi, người học vẫn làm bài/lab bình thường; sửa nhanh bằng cách đưa `drawExam` về `/exams/draw` (commit 1, `assets/js/exam.js`).

---

## 8. Quy tắc đã giữ

- Không báo PASS khi chưa test: Google, quiz nhiều thiết bị, AI, streak nhiều ngày, hai yêu cầu đồng thời → ghi rõ NOT TESTED / MANUAL.
- Không vô hiệu hoá tính năng để sửa lỗi: đề chặng, quiz, XP đều giữ nguyên hành vi với người dùng thật.
- Không đổi kiến trúc: không thêm bảng, không thêm migration, không đổi luồng đăng nhập, không đổi art direction.
- Không push/deploy production.
