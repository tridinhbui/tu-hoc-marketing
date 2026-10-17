# EXP-01 · Lối vào quiz — hướng dẫn phát hành, rollback và đo 7 ngày

Trạng thái: **mã đã xong, mọi cờ mặc định TẮT, chưa phát hành.** Không có bước nào dưới đây đã được chạy trên production.
Nguồn thiết kế: `ACTIVATION-EXPERIMENTS.md`, `EVENT-TRACKING-SPEC.md`, `FIRST-LESSON-REDESIGN.md` (tài liệu Phase 2, đang untracked ở thư mục gốc).

## 1. Thay đổi gồm gì

| Phần | Tệp | Ghi chú |
|---|---|---|
| Lối vào quiz (cờ `exp_quiz_entry`) | `bai.html` | Quiz mở sau câu "Dừng & Kiểm tra" (hoặc ngay nếu bài không có câu giữa bài) thay vì sau "Đổ não 60 giây"; đổ não thành bước tuỳ chọn; thẻ "Điều kiện hoàn thành" ghi đúng logic; thanh cố định **Kiểm tra nhanh · n/5** trên màn ≤1020 px |
| Đoán trước không bị phạt (cờ `exp_pre_ungraded`) | `bai.html`, `api/src/learn.js`, `api/src/learn-core.js` | Ngữ cảnh `prediction`: trả đúng/sai + lời giải, **không** ghi `answer_events`/`skill_mastery`/hàng ôn; có trần 400 lượt/24h bằng KV |
| Sự kiện (cờ `events_enabled`) | `assets/js/learn-events.js`, `api/src/experiments.js`, `api/src/index.js` (`POST /api/events`), `api/migrations/0011_learning_events.sql` | `lesson_opened`, `quiz_visible`, `quiz_started`, `quiz_cta_clicked`, `quiz_submitted` từ trình duyệt; `lesson_completed` do **server** ghi trong `completeLesson` |
| Cờ tới trình duyệt | `api/src/auth.js` (`/api/me` trả `exp`), `assets/js/app.js` (`API.exp`, `account()` gộp yêu cầu đồng thời) | Không có API / lỗi / quá 1,5 giây → mọi cờ tắt |

**Không đổi:** quiz 5 câu, ngưỡng đạt 60% (`lesson_pass_ratio`), XP 10/5, cách chấm, điều kiện hoàn thành server (≥5 câu `lesson` lần đầu), `lesson_progress`, `/api/stats`. Bài không có quiz vẫn cần đổ não/trạng thái để bấm "Hoàn thành bài".

## 2. Cờ (app_config, mặc định TẮT)

| Khoá `app_config` | Giá trị | Tác dụng |
|---|---|---|
| `exp_quiz_entry` | `true` | Bật EXP-01 (release `r1`) |
| `exp_pre_ungraded` | `true` | Câu đoán trước dùng ngữ cảnh `prediction` |
| `events_enabled` | `true` | Bật ghi sự kiện (cần migration 0011) |
| `internal_user_ids` | `["<id>", …]` | (tuỳ chọn) thêm tài khoản nội bộ/test; admin (`ADMIN_EMAILS`) và `@system.invalid` tự động là nội bộ |

Chỉ giá trị **đúng bằng `true`** mới bật. Thiếu khoá, `"true"`, `1`, `null`, JSON hỏng → TẮT.

QA không cần chạm production: `?exp_quiz_entry=0` luôn tắt phiên đó; `?exp_quiz_entry=1` chỉ có hiệu lực khi chạy cục bộ (không có API) hoặc tài khoản admin; phiên bị ép không phát sự kiện.

## 3. Trình tự phát hành (CẦN PHÊ DUYỆT RIÊNG — chưa làm)

1. Merge PR → build → deploy Worker từ `main` (không deploy từ `deploy/2026-10-12`; xem `FINAL-PRODUCTION-AUDIT.md`). Cờ đều tắt nên hành vi production không đổi.
2. Áp dụng migration `0011_learning_events.sql` lên D1 (`wrangler d1 migrations apply`). *Chưa chạy.* Thiếu bảng thì `/api/events` và `lesson_completed` tự bỏ im lặng (đã có test), không ảnh hưởng việc học.
3. Bật `events_enabled=true` **trước** (≥1–2 ngày) để có nền `r0`, kiểm bảng ở `EVENT-TRACKING-SPEC.md` mục 11 bằng tài khoản admin (dòng `is_internal=1`).
4. Bật `exp_quiz_entry=true` (release `r1`). Ghi lại thời điểm bật.
5. (Tuỳ chọn, tách riêng) `exp_pre_ungraded=true`.

Bật/tắt qua `PUT /api/admin/config/<khoá>` với thân `{"value": true}` (admin) — hoặc sửa `app_config` bằng quy trình quản trị D1 đã được duyệt.

## 4. Rollback tức thì

- `PUT /api/admin/config/exp_quiz_entry` `{"value": false}` → trình duyệt lấy cờ ở `/api/me` mỗi lần mở bài; **tối đa 60 giây** (cache cấu hình của Worker) để mọi isolate thấy giá trị mới. Không cần deploy, không cần migration ngược, không mất dữ liệu.
- Tắt `events_enabled` dừng ghi ngay (dữ liệu đã ghi giữ nguyên).
- Dữ liệu người học không bị ảnh hưởng: `cp` và `recall` trong `state_json` giữ nguyên; người đã mở quiz ở `r1` quay về điều kiện cũ (cần "Đổ não" để mở quiz) nhưng bài đã có trạng thái vẫn mở.

**Điều kiện kích hoạt rollback** (đã đăng ký trước): (a) lỗi chặn hoàn thành; (b) điểm quiz lần đầu trung bình giảm ≥10 điểm % khi có ≥10 lượt nộp; (c) `client_error`/lỗi 5xx của `/api/events` hoặc `/api/lessons/*/complete` tăng bất thường; (d) hai người dùng/quan sát nói họ "nộp quiz mà chưa hiểu bài".

## 5. Kế hoạch đo 7 ngày (chỉ mang tính định hướng)

~1 tài khoản mới/ngày → 7 ngày ≈ 7 người. **Không kết luận thống kê.** Quyết định dựa trên rào an toàn + quan sát + xu hướng số tuyệt đối; kết luận có ý nghĩa cần ≥31 lượt học tới cuối trang mỗi giai đoạn (có thể 3–5 tuần).

- **Chỉ số chính:** `quiz_started / quiz_visible` (lượt học bài đầu, `is_first_lesson=true`, `is_internal=0`). Nền cũ (dữ liệu lịch sử, loại chủ site): 1 trong 10 người cuộn tới cuối đã nộp quiz.
- **Phụ:** `quiz_submitted / quiz_started`; `lesson_completed` / người mới trong 7 ngày; tỉ lệ chạm thanh cố định (`quiz_cta_clicked / quiz_visible`).
- **Rào:** điểm quiz lần đầu (`score_bucket`), tỉ lệ `passed`, lỗi `/api/events`.
- Báo cáo luôn ghi n, số loại trừ (`is_internal`), khoảng tin cậy Wilson 95%.

```sql
-- Phễu theo lượt học (đơn vị = lsid), chỉ bài đầu của người mới, loại nội bộ
SELECT release,
  COUNT(DISTINCT CASE WHEN event='lesson_opened' THEN lsid END) opened,
  COUNT(DISTINCT CASE WHEN event='quiz_visible'  THEN lsid END) quiz_visible,
  COUNT(DISTINCT CASE WHEN event='quiz_started'  THEN lsid END) quiz_started,
  COUNT(DISTINCT CASE WHEN event='quiz_submitted' THEN lsid END) quiz_submitted
FROM learning_events
WHERE is_internal = 0 AND json_extract(props,'$.is_first_lesson') = 1
GROUP BY release;
-- lesson_completed (server) theo release và điểm
SELECT release, json_extract(props,'$.score_bucket') bucket, COUNT(*) n
FROM learning_events WHERE event='lesson_completed' AND is_internal=0 GROUP BY 1,2;
```

Lịch: D-2…D0 bật đo (`r0`) · D1 bật EXP-01 · D3 chỉ xem rào · D4–D6 quan sát 2–3 người dùng · D7 báo cáo và quyết định (xem `ACTIVATION-EXPERIMENTS.md` mục 4.6).

## 6. Quyền riêng tư

Bảng `learning_events` chỉ có: id/`idem`, thời điểm, ngày VN, `user_id` nội bộ (lấy từ phiên, trình duyệt không gửi), `lsid` ngẫu nhiên, `lesson_id`, tên sự kiện, `props` (allow-list: bool/enum/số nhỏ), `device_class`, `release`, `is_internal`. **Không** có email, tên, IP, nội dung đổ não/ghi chú, hay đáp án đã chọn. Props chuỗi tự do bị loại (có test). Xoá tài khoản nên kéo theo `DELETE FROM learning_events WHERE user_id=?` (chưa tự động — cần thêm vào quy trình xoá dữ liệu trước khi bật rộng).

## 7. Xung đột cần quyết định trước khi merge

Nhánh `feat/first-lesson-activation` (đã đẩy lên origin, commit `c3f4a10`/`01bf43e`) sửa **cùng các vùng** trong `bai.html` (mở quiz sau câu giữa bài, thanh CTA mobile, 3 bước, đo bằng `/api/track`) nhưng **không có cờ** và đổi hành vi mặc định. Hai nhánh sẽ xung đột khi merge và ý nghĩa của "cờ tắt = hành vi cũ" sẽ không còn nếu nhánh kia vào trước. Cần chọn một hướng: (A) chỉ dùng EXP-01 có cờ (đo được r0/r1); (B) dùng nhánh kia và bỏ cờ; (C) hợp nhất có chủ đích.

## 8. Kết quả kiểm thử (2026-10-17, môi trường cục bộ)

Xem mô tả PR. Tóm tắt: `node --test tests/*.test.mjs` 161/161 · `cd api && npm test` 62/62 · `tools_validate_bai.mjs` 0 lỗi · `tools_build.mjs` chạy được, đáp án vẫn bị loại khỏi `dist/`.
