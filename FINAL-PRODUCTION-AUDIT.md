# FINAL PRODUCTION AUDIT — tuhocmarketing.org
Ngày: 2026-10-17 · Phạm vi: chỉ đọc, không sửa nội dung, không deploy, không đăng nhập.

## Kết luận: CONDITIONAL GO

Production đang ổn định và nhất quán (API sống, 712 bài và bank 5.182 câu khớp nhau, đáp án không lộ, tài nguyên phục vụ đúng). Không có lỗi chặn.
Có 4 điều kiện cần xử lý/quyết định trước khi coi là "chốt" (mục 8).

## 1. Production đang chạy gì

| Hạng mục | Bằng chứng |
|---|---|
| Worker | `wrangler deployments list`: bản mới nhất `a08e5a33-1674-4704-9c9c-da79f2b97aa6`, 2026-10-12 13:50:47Z (09:50 ET), nguồn "Unknown" |
| HTML/asset | `index.html` production trỏ `editorial.css?v=10z1`, `yy.js?v=6z1` = đúng `origin/main` (a54275a) |
| Nội dung bài | `BAI_V = 24` (nâng lên 25 ở bản sửa) (production `bai-index.js`); 79 file module có `points/counter/deeper` ở 293 bài |
| Chưa deploy | `5e90b12` (stats ở trang đăng nhập + `lessons_done` ở `/api/stats`): commit 2026-10-12 23:16Z, sau lần deploy Worker cuối; chưa push (`main` ahead 1 so với `origin/main`) |
| Nhánh khác | `release/launch-rc`: không có commit nào mà main thiếu. `curriculum-fix`, `landing-editorial-redesign`: không có commit riêng. **`deploy/2026-10-12` (bafbb8b) thiếu a54275a (sửa 16px iOS)** → deploy từ nhánh này sẽ làm lùi production |
| `dist/` cục bộ | Cũ (11/10), không phải bản đang chạy; phải build lại trước mọi lần deploy |

## 2. /api/stats

- Production trả `{"learners":30,"joined_7d":30}` — **chưa có `lessons_done`** (Worker cũ), cache 300s.
- D1 (truy vấn COUNT chỉ đọc): 31 user, 1 tài khoản hệ thống `@system.invalid` → 30 tài khoản thật. Khớp 30.
- Chỉ **1** người có tiến độ, **1** bản ghi hoàn thành, **1** bài khác nhau. `lessons_done` sau deploy sẽ = 1.
- Phân biệt: `learners` = **tổng tài khoản đăng ký** (không phải người học hoạt động); `joined_7d` = 30 (toàn bộ tài khoản mới trong 7 ngày); `lessons_done` = số dòng (người × bài) ở trạng thái learned trở lên, tức là **lượt hoàn thành**, không phải số bài khác nhau.
- Không có số giả; câu SQL loại tài khoản hệ thống.
- Vấn đề nhãn: trang đăng nhập (5e90b12) ghi "**người đang học** cùng bạn" cho tổng tài khoản (30, trong đó chỉ 1 người có tiến độ). Nên đổi thành "tài khoản đã đăng ký" hoặc thêm trường `active_7d` từ dữ liệu thật.

## 3. Trang đăng nhập (5e90b12, chạy local, 375px)

| Trường hợp | Kết quả |
|---|---|
| API lỗi/404 | cả hai ô giữ "—" |
| Loading | "—" |
| 30 / 1 | hiện "30" và "1" |
| 0 / 0 | hiện "0" |
| Worker cũ thiếu `lessons_done` | ô 3 giữ "—" (an toàn, không hiện NaN) |
| 12.345 / 1.234.567 | định dạng vi-VN, `scrollWidth` = 375, không tràn |
| Production hiện tại | vẫn hiện 700+ / 0đ / XP (tĩnh) |

Lỗi nhỏ: ô email ở `dang-nhap.html` là 15px, và trang này **không nạp** 3 file CSS nhận luật 16px (`pointer:coarse`) → iOS vẫn tự phóng to khi chạm vào ô email. Đây là trang duy nhất trong số trang có ô nhập bị sót.

## 4. Bài học, cache v24, bank

- Mã nguồn = production (bỏ `answer`/`why`): 79 module, **712 bài B**, 4.984 câu (mcq 4.158, calc 826). 293 bài có đủ `points` (3 ý), `counter`, `deeper`.
- Bank server: `count` 5.182 = 4.984 + 198 câu `exam-items`; 760 bài = 712 B + 48 bài cũ L. Không thiếu bài B nào; số câu từng bài khớp; 0 stem không có trong bank.
- Production file bài: 0 lần xuất hiện `answer`; `exam-items.js` 0 `answer:`; test `answers-not-public` 2/2 pass.
- Cache: file bài `cache-control: public, max-age=0, must-revalidate` + `?v=24` → client nhận bản mới. Hiển thị `Vì sao nó hiệu quả / Phản ví dụ / Góc nhìn đào sâu` đúng ở `B:ob01-04` (375px, không tràn).
- Chưa kiểm tra được trên production sau đăng nhập (không đăng nhập thay người dùng); đã thay bằng so khớp file production với nguồn và chạy bản local.

## 5. Chất lượng 293 bài mở rộng (34 bài, phân tầng 9 nhóm chủ đề × độ dài)

Mẫu: dl08-08, dl08-02, dl03-09, dl06-06, gt06-09, gt02-07, gt05-04, in03-08, in02-10, in01-02, kh10-07, kh03-03, kh10-05, kh10-10, kn02-06, kn04-03, kn05-04, kn07-06, kn09-08, ob01-04, ob05-10, ob01-07, tn04-06, tn05-02, tn01-06, tn02-06, tp10-08, tp06-05, tp01-08, tp09-03, tu05-09, tu01-01, tu03-04, tu02-09.

Đánh giá (đọc toàn văn từng bài):
- **Độ chính xác**: tốt. Các phép tính kiểm được đều đúng (ROAS hoà vốn 1/12,5% = 8 và 1/60% ≈ 1,67; "5 điểm trên nền 30 ≈ 17%"; ngày đôi/cannibalization/đối chứng). Khái niệm dùng đúng (ESOV, SOV, giá tham chiếu, thiên kiến nhìn lại, chạy trọn chu kỳ tuần). Không thấy tuyên bố sai thực chất ở mẫu.
- **Phản ví dụ**: nhìn chung có giá trị, nêu điều kiện làm lời khuyên sai + dấu hiệu nhận ra + hành động (vd. dl03-09, in01-02, kn09-08, tn02-06, tp09-03). Vài bài chỉ là "biến thể ngữ cảnh" chứ chưa là phản ví dụ thật (kn04-03: mùa cao điểm là ngoại lệ hợp lý; tn04-06 yếu hơn, chỉ đảo chiều kết quả).
- **Ứng dụng**: mạnh; 100% `deeper` có phép kiểm tra làm được trong tuần.
- **Lặp lại (vấn đề chính, P2)** — đo trên cả 293 bài:
  - `deeper` mở bằng "Người làm nghề…": **238/293**; câu mở "Khái niệm kề cận" 231, "Tín hiệu cần theo dõi" 191, "Phép kiểm tra trong tuần" 184, "Dấu hiệu nhận ra" ở `counter` 219.
  - Mỗi phần đều xấp xỉ cùng độ dài (tổng thêm 268–303 từ; `counter` 285–374 ký tự) → cảm giác sinh theo khuôn. Người học đọc nhiều bài sẽ thấy nhịp lặp.
- **Lỗi văn bản (P3)**: `tu02-09` — câu "…bỏ trước việc có lời nhất" tự mâu thuẫn và "…và tần suất." cụt ý. Quét heuristic trên 293 bài chỉ ra thêm 1 câu đáng xem (`tp10-06`). Nên đọc lại hai bài này.
- Không dùng số chữ làm tiêu chí; kết luận trên dựa trên đọc nội dung.

## 6. Giao diện (production, trình duyệt thật)

- Landing 1440px: `scrollWidth` 1425 < 1440, không tràn ngang; 0 lỗi console; DCL 850 ms, load 876 ms, 17 request, ~38 KB truyền (cache nóng); TTFB trang chủ 0,16 s. Hai dải chữ chạy (`.mq` cam, `.mq` kem/đảo chiều) và dải `mm-tick` đang chạy.
- Landing 375px: `scrollWidth` 375, `overflow-x:hidden`; phần tử vượt biên chỉ là băng cuộn có chủ ý (thẻ case) và quầng sáng.
- Đăng nhập 375px: không tràn, bố cục đúng.
- Reduced motion: kiểm qua mã nguồn — `.mq__row` (editorial.css:662), `.mm-tick__row`/`.mm-glow`/`.mm-dust` (mobile-magic.css:108), hiệu ứng landing-motion (landing-motion.css:98) đều tắt; **chưa chạy emulation prefers-reduced-motion thực tế**.
- Sidebar, học bài sau đăng nhập, phòng thử thách, MarSocial: bị chặn bởi đăng nhập (302 → /dang-nhap); **không kiểm được trên production**. Có chạy bản local: shell + bài `ob01-04` hiển thị đúng ở 375px.

## 7. Test

- `node --test tests/*.test.mjs`: **143/143 pass**
- `cd api && npm test`: **40/40 pass**
- `node tools_validate_bai.mjs`: 712 bài · 4.984 câu · 0 lỗi · 0 cảnh báo
- Tài nguyên production: 32 asset tham chiếu từ `/` và `/dang-nhap` đều 200 (các URL `.html` trả 302/307 về URL sạch, không phải lỗi); `robots.txt`, `sitemap.xml`, `bai-index.js`, `bai/*.js`, `curriculum.js` phục vụ đúng loại; trang cần đăng nhập 302 đúng với `?next=`.
- Chưa chạy E2E đăng nhập → làm bài → chấm trên production (không đăng nhập thay người dùng).

## 8. Điều kiện để GO

1. **Quyết định deploy `5e90b12`**: push + build `dist` + deploy Worker (để `/api/stats` có `lessons_done` và trang đăng nhập hiện số thật). Trước khi deploy, sửa nhãn "người đang học" → "tài khoản đã đăng ký" (hoặc thêm số hoạt động thật), vì hiện 30 tài khoản nhưng chỉ 1 người có tiến độ và 1 lượt hoàn thành — số thật nhưng nhãn dễ gây hiểu sai.
2. **Không deploy từ `deploy/2026-10-12`**: nhánh này thiếu `a54275a` (v=10z1, 16px iOS) và sẽ làm lùi production. Deploy từ `main` đã build lại `dist`.
3. Thêm luật 16px cho `dang-nhap.html` (iOS phóng to ô email).
4. Chấp nhận hoặc lên kế hoạch xử lý tính lặp khuôn của 293 bài (P2) và sửa `tu02-09` (và đọc `tp10-06`) — không chặn phát hành.

## Chưa kiểm tra / hạn chế

Đăng nhập thật, phòng thử thách, MarSocial, sidebar trên production; emulation reduced-motion; Lighthouse/INP; thiết bị iOS thật. Báo cáo này không thay đổi mã, dữ liệu hay production.

---

## Cập nhật 2026-10-17 (vòng xử lý điều kiện)

Đã sửa (chưa deploy):
- `dang-nhap.html`: nhãn "người đang học cùng bạn" → "người đã đăng ký"; "bài đã được hoàn thành" → "lượt hoàn thành bài"; thêm luật 16px (`hover:none` + `pointer:coarse`) cho mọi ô nhập.
- `api/src/index.js` (`/api/stats`): `lessons_done` chỉ đếm lượt hoàn thành bài học thật (`completion_source='lesson'`) của tài khoản thật; chú thích ghi rõ đây là tổng lượt (người × bài), không phải số bài khác nhau. Dữ liệu production hiện tại (1 dòng, nguồn `lesson`) cho kết quả không đổi: 1.
- `tu02-09`: sửa câu `deeper` mâu thuẫn và câu cụt, không thêm số liệu. `tp10-06`: ghi rõ 100 vs 350 là số trong ví dụ của bài.

Kết luận audit lặp khuôn: không có bài nào trùng ý (trùng 3-gram trung bình 1–6%, 0 cặp `deeper` gần giống nhau); `deeper` đều có hành động trong tuần. Lặp nằm ở khung câu chữ, không biên tập hàng loạt theo yêu cầu. `ob07-01` đã kiểm: "gần ba phần tư doanh thu" = 5.000/6.800 ≈ 73,5%, đúng.

Kiểm tra: 143/143 + 40/40 test, validator 0 lỗi, build OK (đáp án bị bỏ 5.182 câu), bank chỉ đổi `built_at`.
