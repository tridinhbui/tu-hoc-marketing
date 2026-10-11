# Thế giới Marketing — kiểm kê, kiến trúc và lộ trình

## 1. Kiểm kê (đã đọc mã, không dựng lại thứ đã có)
| Hạ tầng sẵn có | Dùng để làm gì |
|---|---|
| `assets/js/data/districts.js` — `DISTRICTS` (6 khu: id, key, màu, chủ đề, câu hỏi, `reads`), `FIELDS` (13 mảng nghề) | Khung dữ liệu của sáu khu |
| `PRINCIPLES` (22), `CAMPAIGNS` (20, có `district`), `BRANDS` (14), `CHALLENGES` (33, có `d`) | Học liệu, case thật, thử thách của từng khu |
| `assets/js/lab.js` — `Lab.quiz`, `Lab.xp`, `Lab.get/set` | Bài tập nhỏ; XP một lần/khoá, trần 30 XP/ngày; lưu ở `State.work.lab` (đã đồng bộ lên máy chủ) |
| `core.js` — `State`, `markRead` (cờ `read:<trang>:<id>` trong `thmc.v1.flags`) | Theo dõi "đã đọc" nguyên lý/case, sổ tay (`State.notes`) |
| `assets/js/games/*` + `GW.report` (sao ở `thmc.v1.gw.stars`) | 5 mini-game: định vị, chọn tệp, ngân sách media, phễu rò, kể chuyện |
| `lab-meta.html`, `giai-case.html` + `CASES` (12) | Meta Ads Lab; Case Room có bấm giờ |
| `journal.html`, `tap-chi.html`, `world.html` (cửa khu + quiz `State.districts`) | Sổ tay, phòng tập hằng ngày, cửa vào khu |

Sáu công cụ yêu cầu → hiện trạng: **Media Budget Simulator** = `game-ngan-sach`; **Growth Experiment Lab** = `lab-meta`; **Strategy Case Room** = `giai-case`; còn **Brand DNA Canvas**, **Creative Brief Builder**, **Consumer Insight Lab** chưa có.

## 2. Kiến trúc
- Một trang: `world.html`. Bản đồ (`#wmap`) → bấm khu → **phòng khu** (`#room`) với 5 tab: Giới thiệu · Học liệu · Case thật · Thử thách · Công cụ. Địa chỉ `world.html#phong-<khu>` mở thẳng phòng.
- Logic: `assets/js/world.js` (không phụ thuộc framework), giao diện `assets/css/world.css`; các khối cũ trong `world.html` giữ nguyên bên dưới (cửa vào khu, danh mục 13 mảng).
- **Tiến độ khu** (tính từ dữ liệu thật): 25% học liệu đã đọc + 25% case đã mổ + 20% bộ thử thách + 10% cửa vào khu + 20% công cụ.
- **Mở khoá**: công cụ của khu mở khi làm bộ thử thách của khu *hoặc* qua cửa vào khu.
- **XP**: `Lab.xp` (một lần/khoá); công cụ Brand DNA 20 XP; thử thách khu 8 XP; game vẫn dùng sao `GW`.
- **Lưu**: `State.work.lab['dna']` = `{data:{purpose,v1..v3,b1..b3,traits[],say,nosay,a1..a3,promise,rival,rsay,wesay}, done, t}`; `wd:ch:<khu>` = `{best,total,t}`; `world:last` = `{k}`.
- **Responsive**: ≥760px: bản đồ 16:9, nút khu đặt theo %, đường cong SVG; <760px: danh sách dọc xen kẽ, không có đường nối. Mọi nút là `<button>`, tab có điều hướng bàn phím mũi tên, focus rõ.

## 3. Giai đoạn
| GĐ | Nội dung | Trạng thái |
|---|---|---|
| 1 | Bản đồ 6 khu + phòng khu (5 tab) cho cả sáu khu; **Brand DNA Canvas** hoàn chỉnh (7 phép kiểm, tự lưu, XP, sổ tay, sao chép); thử thách Khu Truyền thông (thêm 3) | ✅ làm xong |
| 2 | **Creative Brief Builder** (brief một trang, chấm ràng buộc) và **Consumer Insight Lab** (trích dẫn → insight có "nhưng") | chưa |
| 3 | Tạp chí: bài viết, đánh dấu (bookmark), ghi chú theo bài, tiến độ đọc; thử thách hằng ngày xoay theo khu | chưa |
| 4 | Mở khoá nội dung theo mốc khu (case nâng cao), huy hiệu khu, đồng bộ máy chủ riêng cho bookmark | chưa |
