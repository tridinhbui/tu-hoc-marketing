/* BẢN ĐỒ THẾ GIỚI — dữ liệu thuần, không phụ thuộc giao diện (kiểm bằng tests/world-map.test.mjs).
   Toạ độ trong khung WORLD.w × WORLD.h. `id` của toà khớp với cấu hình kingdom ở máy chủ (migration 0004) để vẫn nhận +xu khi ghé.
   `soon:true` = chỗ dành cho game sẽ làm; hiện sương, không bấm vào được. */
const WORLD = {
  w: 1200, h: 760,
  start: { x: 600, y: 640 },
  speed: 300,                                  // px mỗi giây
  reach: 54,                                   // lại gần một toà trong ngần này thì coi là "tới nơi"
  regions: [
    { id: 'plaza',  t: 'Quảng trường',     x: 600,  y: 560, rx: 300, ry: 170, c: '#C85A32' },
    { id: 'court',  t: 'Toà Án Case',      x: 600,  y: 200, rx: 360, ry: 130, c: '#7A2E8E' },
    { id: 'people', t: 'Khu Khách hàng & Thương hiệu', x: 190, y: 440, rx: 175, ry: 230, c: '#1F5C4A' },
    { id: 'data',   t: 'Khu Số liệu & Kênh', x: 985, y: 440, rx: 190, ry: 240, c: '#3F7EA6' },
  ],
  places: [
    { id: 'quiz',    t: 'Sảnh phản xạ',               d: 'Quiz 60 giây từ bài đã học',               href: 'quiz.html',            x: 600,  y: 480, region: 'plaza',  min_level: 1 },
    { id: 'shop',    t: 'Chợ',                         d: 'Đổi xu lấy thẻ đóng băng, rương, booster', href: 'shop.html',            x: 450,  y: 600, region: 'plaza',  min_level: 1 },
    { id: 'library', t: 'Thư viện case',               d: 'Đọc case thật không bấm giờ',              href: 'gallery.html',         x: 750,  y: 600, region: 'plaza',  min_level: 1 },
    { id: 'case',    t: 'Phòng họp case',              d: 'Case có bấm giờ theo ngành',               href: 'case-thu-vien.html',   x: 600,  y: 200, region: 'court',  min_level: 1 },
    { id: 'pvp',     t: 'Đấu trường',                  d: 'Đấu với bóng ma của người học thật',       href: 'pvp.html',             x: 380,  y: 170, region: 'court',  min_level: 1 },
    { id: 'boss',    t: 'Tháp World Boss',             d: 'Cả server cùng hạ một boss mỗi tuần',      href: 'boss.html',            x: 820,  y: 170, region: 'court',  min_level: 1 },
    { id: 'game',    t: 'Toà điều hành thương hiệu',   d: 'Điều hành một thương hiệu qua 8 quý',      href: 'tro-choi.html',        x: 990,  y: 330, region: 'data',   min_level: 1 },
    { id: 'growth',  t: 'Phòng lab tăng trưởng',       d: 'Bàn tính unit economics và giá',           href: 'unit-economics.html',  x: 1030, y: 550, region: 'data',   min_level: 3 },
    { id: 'g2',      t: 'Chọn tệp',                    d: 'Chọn nhóm khách nào để nói gì — sắp có',   href: null,                   x: 170,  y: 330, region: 'people', soon: true },
    { id: 'g3',      t: 'Bản đồ định vị',              d: 'Chiếm khoảng trống trên ma trận — sắp có', href: null,                   x: 210,  y: 560, region: 'people', soon: true },
    { id: 'g4',      t: 'Chia ngân sách media',        d: 'Chia tiền giữa các kênh — sắp có',         href: null,                   x: 780,  y: 400, region: 'data',   soon: true },
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
if (typeof module !== 'undefined') module.exports = { WORLD, worldStep, worldClamp, worldNearest };
