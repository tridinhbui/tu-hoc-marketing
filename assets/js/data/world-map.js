/* BẢN ĐỒ THẾ GIỚI — dữ liệu thuần, không phụ thuộc giao diện (kiểm bằng tests/world-map.test.mjs).
   Toạ độ trong khung WORLD.w × WORLD.h. `id` của toà khớp với cấu hình kingdom ở máy chủ (migration 0004) để vẫn nhận +xu khi ghé.
   `soon:true` = chỗ dành cho game sẽ làm; hiện sương, không bấm vào được.
   `local:true` = toà chưa có ở cấu hình máy chủ (không gọi API ghé thăm) — hiện không còn toà nào (migration 0008, 0009 đã thêm g2–g8).
   `game:true` = có chấm sao (S.gw.stars[id]). */
const WORLD = {
  w: 1200, h: 760,
  start: { x: 600, y: 640 },
  speed: 300,                                  // px mỗi giây
  reach: 54,                                   // lại gần một toà trong ngần này thì coi là "tới nơi"
  regions: [
    { id: 'plaza',  t: 'Quảng trường',     x: 600,  y: 560, rx: 300, ry: 170, c: '#C85A32' },
    { id: 'court',  t: 'Toà Án Case',      x: 600,  y: 215, rx: 380, ry: 150, c: '#7A2E8E', chest: { need: 2, badge: 'Người bảo vệ ý kiến' } },
    { id: 'people', t: 'Khách hàng & Thương hiệu', x: 190, y: 440, rx: 175, ry: 230, c: '#1F5C4A', chest: { need: 4, badge: 'Người chọn tệp' } },
    { id: 'data',   t: 'Khu Số liệu & Kênh', x: 985, y: 440, rx: 190, ry: 240, c: '#3F7EA6', chest: { need: 6, badge: 'Người đọc số' } },
  ],
  /* Trang phục: mở bằng rương vùng hoặc tổng sao. `fill` là màu áo của nhân vật. */
  outfits: [
    { id: 'default', t: 'Áo cam',          fill: '#C85A32' },
    { id: 'blue',    t: 'Áo xanh Số liệu', fill: '#3F7EA6', need: { chest: 'data' } },
    { id: 'green',   t: 'Áo lá Khách hàng', fill: '#1F5C4A', need: { chest: 'people' } },
    { id: 'purple',  t: 'Áo tím Toà Án',   fill: '#7A2E8E', need: { chest: 'court' } },
    { id: 'gold',    t: 'Áo vàng',         fill: '#D9A21B', need: { stars: 9 } },
    { id: 'ink',     t: 'Áo mực',          fill: '#2A1A12', need: { stars: 14 } },
  ],
  places: [
    { id: 'quiz',    t: 'Sảnh phản xạ',               d: 'Quiz 60 giây từ bài đã học',               href: 'quiz.html',            x: 600,  y: 480, region: 'plaza',  min_level: 1 },
    { id: 'shop',    t: 'Chợ',                         d: 'Đổi xu lấy thẻ đóng băng, rương, booster', href: 'shop.html',            x: 450,  y: 600, region: 'plaza',  min_level: 1 },
    { id: 'library', t: 'Thư viện case',               d: 'Đọc case thật không bấm giờ',              href: 'gallery.html',         x: 750,  y: 600, region: 'plaza',  min_level: 1 },
    { id: 'case',    t: 'Phòng họp case',              d: 'Case có bấm giờ theo ngành',               href: 'case-thu-vien.html',   x: 600,  y: 235, region: 'court',  min_level: 1 },
    { id: 'pvp',     t: 'Đấu trường',                  d: 'Đấu với bóng ma của người học thật',       href: 'pvp.html',             x: 335,  y: 225, region: 'court',  min_level: 1 },
    { id: 'boss',    t: 'Tháp World Boss',             d: 'Cả server cùng hạ một boss mỗi tuần',      href: 'boss.html',            x: 830,  y: 215, region: 'court',  min_level: 1 },
    { id: 'game',    t: 'Toà điều hành thương hiệu',   d: 'Điều hành một thương hiệu qua 8 quý',      href: 'tro-choi.html',        x: 990,  y: 330, region: 'data',   min_level: 1, game: true },
    { id: 'growth',  t: 'Phòng lab tăng trưởng',       d: 'Bàn tính unit economics và giá',           href: 'unit-economics.html',  x: 1030, y: 550, region: 'data',   min_level: 3 },
    { id: 'g2',      t: 'Chọn tệp',                    d: 'Chọn nhóm khách và thông điệp cho 4 sản phẩm',  href: 'game-chon-tep.html',  x: 170,  y: 330, region: 'people', min_level: 1, game: true },
    { id: 'g3',      t: 'Bản đồ định vị',              d: 'Đặt thương hiệu lên ma trận giá × thuộc tính',   href: 'game-ban-do-dinh-vi.html', x: 255, y: 565, region: 'people', min_level: 1, game: true },
    { id: 'g8',      t: 'Lịch nội dung 30 ngày',      d: 'Xếp lịch đăng vừa sức, đúng mục tiêu',           href: 'game-lich-noi-dung.html', x: 105, y: 478, region: 'people', min_level: 1, game: true },
    { id: 'g6',      t: 'Kể chuyện 60s',           d: 'Chọn 3 bằng chứng để trả lời sếp',                href: 'game-ke-chuyen.html',  x: 468, y: 235, region: 'court', min_level: 1, game: true },
    { id: 'g10',     t: 'Khủng hoảng',                 d: '60 phút đầu khi bình luận bùng nổ',                 href: 'game-khung-hoang.html', x: 715, y: 230, region: 'court', min_level: 1, game: true },
    { id: 'g4',      t: 'Chia ngân sách media',        d: 'Chia tiền giữa 4 kênh qua 4 mùa — học lợi ích giảm dần', href: 'game-ngan-sach.html', x: 780, y: 400, region: 'data', min_level: 1, game: true },
    { id: 'g5',      t: 'Phễu rò',                     d: 'Sửa đúng tầng của phễu bán hàng',          href: 'game-phieu-ro.html',  x: 1110, y: 440, region: 'data',   min_level: 1, game: true },
    { id: 'g7',      t: 'Chẩn đoán reach giảm',       d: 'Kiểm đúng thứ tự khi reach tụt',                 href: 'game-chan-doan.html',  x: 960, y: 640, region: 'data',   min_level: 1, game: true },
    { id: 'g9',      t: 'Đọc Studio',                  d: 'Đọc bảng YouTube Studio: sửa gói, mở đầu hay đoạn giữa', href: 'game-doc-studio.html', x: 880, y: 490, region: 'data', min_level: 1, game: true },
  ],
};

/* Đi một bước về phía đích, không vượt quá `dist`. Trả {x,y,arrived}. */
function worldStep(pos, target, dist) {
  const dx = target.x - pos.x, dy = target.y - pos.y, d = Math.hypot(dx, dy);
  if (d <= dist || d === 0) return { x: target.x, y: target.y, arrived: true };
  return { x: pos.x + dx / d * dist, y: pos.y + dy / d * dist, arrived: false };
}
function worldClamp(p, m = 36) {
  return { x: Math.max(m, Math.min(WORLD.w - m, p.x)), y: Math.max(m, Math.min(WORLD.h - m, p.y)) };
}
/* Toà gần nhất trong tầm `reach` (không tính chỗ "sắp có"? — vẫn tính để hiện thông tin). */
function worldNearest(pos, places = WORLD.places, reach = WORLD.reach) {
  let best = null, bd = Infinity;
  for (const p of places) { const d = Math.hypot(p.x - pos.x, p.y - pos.y); if (d < bd) { bd = d; best = p; } }
  return best && bd <= reach ? best : null;
}
/* Tổng sao của các game chơi được trong một vùng. `stars` = { gameId: 0–3 }. */
function worldRegionStars(regionId, stars = {}) {
  const games = WORLD.places.filter((p) => p.region === regionId && p.game && !p.soon);
  return { have: games.reduce((n, p) => n + (stars[p.id] || 0), 0), max: games.length * 3 };
}
function worldChestReady(regionId, stars = {}) {
  const r = WORLD.regions.find((x) => x.id === regionId);
  return !!(r && r.chest && worldRegionStars(regionId, stars).have >= r.chest.need);
}
function worldOutfitUnlocked(o, stars = {}, chests = {}) {
  if (!o.need) return true;
  if (o.need.chest) return !!chests[o.need.chest];
  if (o.need.stars) return Object.values(stars).reduce((n, v) => n + v, 0) >= o.need.stars;
  return false;
}
if (typeof module !== 'undefined') module.exports = { WORLD, worldStep, worldClamp, worldNearest, worldRegionStars, worldChestReady, worldOutfitUnlocked };
