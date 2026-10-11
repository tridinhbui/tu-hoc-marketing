# Kế hoạch: Game Kingdom thành một thế giới game có thể chơi

## 1. Hiện trạng (đã kiểm trong mã)

| Thành phần | File | Thực chất là gì |
|---|---|---|
| Vương quốc | `kingdom.html` | Lưới thẻ "toà nhà"; bấm thẻ = +5 xu/ngày rồi **chuyển sang trang khác**. Không có bản đồ, không có nhân vật, không có không gian. |
| World Boss | `boss.html` | Một trang quiz 15 câu/tuần, trừ máu boss chung. |
| Đấu trường | `pvp.html` | Một trang quiz so điểm với kết quả đã ghi của người khác (bất đồng bộ). |
| Chợ / Rương | `shop.html`, `ruong.html` | Danh sách hàng; rương mở theo mốc chuỗi ngày. |
| Mini-game | `tro-choi.html` + `game.js` | Điều hành thương hiệu 8 quý, mô hình cố định. **Đây là game thật duy nhất.** |
| Nền | `api/src/realm.js` | Có sẵn: xu, rương, kho đồ, booster, mùa giải, tiêu đề/khung, boss tuần, pvp, ghé toà nhà. |

Kết luận: nền kinh tế (xu, rương, boss, mùa) đã có; thiếu **không gian chơi** và **các game có luật chơi riêng**. Hiện mọi thứ ngoài mini-game 8 quý đều là quiz đội lốt.

## 2. Tầm nhìn

Một **thế giới 2D xem từ trên xuống** (SVG/Canvas, không cần engine nặng): nhân vật của bạn đi trên bản đồ vương quốc, mỗi khu là một game riêng, mở theo cấp độ XP (30 cấp đã có ở `cap-do.html`), mọi thứ chơi xong đều trả về XP/xu/rương như hiện nay.

Nguyên tắc:
1. **Chơi để hiểu, không phải quiz.** Mỗi game dạy đúng một nguyên lý marketing qua luật chơi (như `tro-choi.html` làm với nhận biết/độ phủ/giữ chân).
2. **Mô hình cố định, không may rủi** — cùng chiến lược ra cùng kết quả, người chơi học nguyên lý. Số liệu luôn ghi "minh hoạ".
3. **Chạy được offline trong trình duyệt**; đăng nhập chỉ để đồng bộ xu, bảng xếp hạng, boss chung.
4. **Một nguồn sự thật cho phần thưởng**: dùng `award()` + `XP_CAP` hiện có, không tự cộng xu ở phía game.

## 3. Bản đồ thế giới

Bản đồ một màn hình cuộn ngang, 6 vùng khớp 6 chặng học và `districts.js` (đã có màu, tên, câu hỏi từng khu):

| Vùng (mở ở cấp) | Chặng học | Game chính | Nguyên lý dạy |
|---|---|---|---|
| **Quảng trường** (1) | Nền tảng | Nhiệm vụ ngày, bảng tin, NPC dẫn đường | Thói quen, tiến độ |
| **Khu Khách hàng** (4) | Hiểu khách hàng | *Chọn tệp* (G2) | Phân khúc, tệp mục tiêu |
| **Khu Thương hiệu** (8) | Thương hiệu & định vị | *Bản đồ định vị* (G3) | Định vị, tài sản nhận diện |
| **Khu Kênh** (12) | Kênh & truyền thông | *Chia ngân sách* (G4) | Reach, tần suất, giảm dần lợi ích |
| **Khu Số liệu** (16) | Đo lường & tăng trưởng | *Quán của bạn* (G1, đã có) · *Phễu rò* (G5) | CAC/LTV, giữ chân |
| **Toà Án Case** (20) | Case tổng hợp | World Boss, Đấu trường | Tổng hợp dưới áp lực |
| **Chợ & Kho** (1) | — | Cửa hàng, rương, tuỳ biến nhân vật | Kinh tế xu |

Vùng chưa mở hiện sương mù và nhãn "mở ở cấp N". Đi tới cổng vùng = vào màn game; thoát game trở về đúng chỗ đứng trên bản đồ.

## 4. Danh sách game

Mỗi game: một vòng chơi 3–6 phút, có thang điểm 1–3 sao, chơi lại để lấy sao cao hơn nhưng XP chỉ tính lần đầu mỗi sao (tránh cày).

| # | Game | Luật chơi | Dữ liệu | Sao tính theo |
|---|---|---|---|---|
| G1 | **Điều hành thương hiệu** (có sẵn `tro-choi.html`) | 8 quý, chia ngân sách media / điểm bán / giữ chân / giảm giá | `game.js` | Lãi tích luỹ + thị phần |
| G2 | **Chọn tệp** | Cho 6 nhóm khách + ngân sách nhỏ; chọn nhóm nào, nói gì; thấy ngay doanh thu kỳ vọng và khách "nhầm tệp" | mô hình tự viết, số minh hoạ | Doanh thu / khách lãng phí |
| G3 | **Bản đồ định vị** | Kéo thương hiệu lên ma trận 2 trục (giá × một thuộc tính); đối thủ di chuyển sau mỗi lượt | tập thương hiệu có sẵn trong `brands.js` | Khoảng trống chiếm được |
| G4 | **Chia ngân sách media** | 4 kênh, mỗi kênh đường cong lợi ích giảm dần; có sự kiện mùa vụ | mô hình tự viết | Reach hiệu dụng so mức tối ưu |
| G5 | **Phễu rò** | Phễu 5 tầng, mỗi tầng có điểm rò; sửa đúng tầng có đòn bẩy lớn nhất với số lượt hạn chế | `drills.js` (CAC, LTV, chuyển đổi) | Số lượt dùng + kết quả cuối |
| G6 | **Kể chuyện 60 giây** | Chọn 3 trong 6 mảnh bằng chứng để dựng câu trả lời cho sếp; mảnh yếu bị "sếp hỏi vặn" | `interview-script.js` | Chất lượng bằng chứng |
| G7 | **World Boss** (có sẵn) | Giữ quiz tuần, thêm màn "boss" có hoạt ảnh, đánh chung với mọi người | `realm.js` | Sát thương |
| G8 | **Đấu trường** (có sẵn) | Giữ luật, thêm phòng chờ và hồ sơ đối thủ | `realm.js` | Thắng/hoà/thua |

Làm trước G2 và G4 vì tái dùng đúng kiểu mô hình của G1 (hàm thuần, kiểm bằng test được).

## 5. Tiến trình & kinh tế

- **Cấp độ**: dùng 30 cấp và `LEVEL_MIN` sẵn có; vùng mở theo cấp (bảng ở mục 3).
- **Sao**: mỗi game 3 sao → mốc mở rương nhỏ; tổng sao của một vùng mở "rương vùng".
- **Xu**: thu từ sao lần đầu, boss, đấu trường, ghé vùng mỗi ngày (giữ +5 xu/vùng/ngày); tiêu ở Chợ: thẻ đóng băng chuỗi, booster, rương, tiêu đề, khung, **trang phục nhân vật**.
- **Trần ngày**: dùng `XP_CAP` hiện có; thêm khoá `game` theo từng game để không cày một game.
- **Mùa giải**: giữ `season`; bảng xếp hạng mùa theo tổng sao + sát thương boss.

## 6. Kiến trúc kỹ thuật

- `assets/js/world/engine.js`: vòng lặp, camera, nhân vật, va chạm cổng, lưu vị trí (không phụ thuộc game cụ thể).
- `assets/js/world/maps/*.js`: dữ liệu bản đồ (toạ độ vùng, cổng, NPC) — thuần dữ liệu, kiểm được bằng test.
- `assets/js/games/g2-chon-tep.js`, `g4-ngan-sach.js`…: mỗi game xuất `{ step, score, stars }` thuần (như `game.js`), phần vẽ tách riêng.
- Giao diện: SVG cho bản đồ và nhân vật (nhẹ, theo theme sáng/tối), HTML cho bảng điều khiển game.
- Trạng thái: thêm khoá `gw` (world) vào `S`: `{pos, stars:{gid:n}, outfit, seen}`; đồng bộ cùng cơ chế `syncNow` hiện có, phía máy chủ thêm vào `state.js` merge.
- Trang: `kingdom.html` đổi thành màn bản đồ; `tro-choi.html`, `boss.html`, `pvp.html`, `shop.html` giữ URL cũ để liên kết không gãy, nhúng vào khung game.
- Test: mỗi game có test "cùng input → cùng output", ngưỡng sao, và "không cộng XP hai lần".

## 7. Lộ trình

| Giai đoạn | Nội dung | Hoàn thành khi |
|---|---|---|
| **P0 · Móng** ✅ xong | Engine bản đồ, nhân vật đi lại, 6 vùng khoá/mở theo cấp, cổng dẫn vào trang cũ; lưu vị trí | Mở `kingdom.html` thấy bản đồ, đi vào được từng vùng, vùng chưa mở bị sương |
| **P1 · Game đầu** ✅ xong | Chuyển G1 vào khung game (sao, thưởng); làm G4 Chia ngân sách | 2 game có sao và thưởng đúng, có test |
| **P2 · Mở rộng** ✅ xong (trang phục mở bằng rương/sao, chưa mua bằng xu) | G2 Chọn tệp, G5 Phễu rò; rương vùng; tuỳ biến nhân vật ở Chợ | 4 game chơi được, rương vùng mở đúng |
| **P3 · Xã hội** ✅ xong (boss có trận đánh, PvP có phòng chờ, bảng mùa có sao; cần triển khai máy chủ) | Boss có màn riêng, Đấu trường có phòng chờ, bảng xếp hạng mùa theo sao | Boss/PvP dùng chung khung; mùa giải có xếp hạng sao |
| **P4 · Đánh bóng** | G3, G6, âm thanh, hoạt ảnh, hướng dẫn lần đầu, mobile | Bản chạy mượt trên điện thoại, có hướng dẫn |

## 8. Rủi ro và cách chặn

- **Phình phạm vi**: chỉ làm game khi mô hình viết được thành hàm thuần ≤150 dòng; không có thì giữ ở dạng quiz và nói rõ.
- **Số liệu bịa**: mọi số trong game ghi "minh hoạ"; không dùng số thật của thương hiệu thật trừ khi có nguồn.
- **Cày XP**: XP chỉ tính lần đầu mỗi sao; trần ngày theo `XP_CAP`.
- **Hiệu năng/di động**: SVG tĩnh + vài phần tử động; không dùng thư viện game; thử trên khổ 375px ngay từ P0.
- **Phụ thuộc máy chủ**: bản đồ và game chạy không cần mạng; xu/rương/boss cần đăng nhập và báo rõ khi offline (như `needLogin`).

## 9. Cần bạn quyết trước khi làm

1. Phong cách hình ảnh: **minh hoạ phẳng sạch** (nhanh, đồng nhất theme) hay **tranh vẽ tay như mẫu Tài Chính** (đẹp hơn nhưng cần ảnh nền từng vùng)?
2. Nhân vật: **tuỳ biến được** (mua trang phục bằng xu) hay chỉ một avatar cố định?
3. Thứ tự ưu tiên: bắt đầu từ **bản đồ (P0)** hay từ **game mới G2/G4**?
