import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { rel } from './helpers.mjs';
const require = createRequire(import.meta.url);
const { WORLD, worldStep, worldClamp, worldNearest } = require(rel('assets/js/data/world-map.js'));

test('bản đồ: id duy nhất, nằm trong khung, vùng tồn tại, href trỏ tới file thật', () => {
  const ids = WORLD.places.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, 'id trùng');
  const regions = new Set(WORLD.regions.map((r) => r.id));
  for (const p of WORLD.places) {
    assert.ok(p.x >= 40 && p.x <= WORLD.w - 40 && p.y >= 40 && p.y <= WORLD.h - 40, `${p.id} ngoài khung`);
    assert.ok(regions.has(p.region), `${p.id}: vùng ${p.region} không có`);
    if (p.soon) assert.equal(p.href, null, `${p.id}: chỗ "sắp có" không được có href`);
    else assert.ok(fs.existsSync(rel(p.href)), `${p.id}: thiếu file ${p.href}`);
  }
  assert.ok(WORLD.start.x > 0 && WORLD.start.y < WORLD.h);
});

test('bản đồ: toà đang chơi được khớp cấu hình kingdom ở máy chủ (để vẫn nhận xu khi ghé)', () => {
  /* Cấu hình kingdom hiện hành = bản ghi cuối cùng trong các migration (INSERT ở 0004, UPDATE ở các file sau). */
  const dir = rel('api/migrations'); let cfg = null;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.sql')).sort()) {
    const sql = fs.readFileSync(`${dir}/${f}`, 'utf8');
    const m = /\('kingdom', '(\[.*?\])'/s.exec(sql) || /SET value = '(\[.*?\])'[^;]*WHERE key = 'kingdom'/s.exec(sql);
    if (m) cfg = JSON.parse(m[1].replace(/''/g, "'"));
  }
  assert.ok(cfg, 'không thấy cấu hình kingdom');
  const server = new Map(cfg.map((b) => [b.id, b]));
  for (const p of WORLD.places.filter((x) => !x.soon && !x.local)) {
    const s = server.get(p.id); assert.ok(s, `${p.id} không có ở máy chủ`);
    assert.equal(s.href, p.href, `${p.id}: href lệch máy chủ`);
    assert.equal(s.min_level || 1, p.min_level || 1, `${p.id}: cấp mở lệch máy chủ`);
  }
});

test('bản đồ: bước đi không vượt quá quãng cho phép và dừng đúng đích', () => {
  const a = { x: 0, y: 0 }, b = { x: 30, y: 40 };
  const s = worldStep(a, b, 10); assert.ok(Math.abs(Math.hypot(s.x, s.y) - 10) < 1e-9); assert.equal(s.arrived, false);
  assert.deepEqual(worldStep(a, b, 50), { x: 30, y: 40, arrived: true });
  assert.deepEqual(worldClamp({ x: -5, y: 9999 }), { x: 36, y: WORLD.h - 36 });
  const q = WORLD.places[0];
  assert.equal(worldNearest({ x: q.x + 5, y: q.y }).id, q.id);
  assert.equal(worldNearest({ x: -100, y: -100 }), null);
});

const { worldRegionStars, worldChestReady, worldOutfitUnlocked } = require(rel('assets/js/data/world-map.js'));
test('rương vùng và trang phục: ngưỡng đạt được, hàm thuần đúng', () => {
  const total = WORLD.places.filter((p) => p.game && !p.soon).length * 3;
  for (const r of WORLD.regions.filter((x) => x.chest)) {
    const rs = worldRegionStars(r.id, {});
    assert.ok(rs.max >= r.chest.need, `${r.id}: cần ${r.chest.need} sao nhưng vùng chỉ có tối đa ${rs.max}`);
    assert.equal(worldChestReady(r.id, {}), false);
  }
  for (const o of WORLD.outfits) {
    if (o.need && o.need.stars) assert.ok(o.need.stars <= total, `${o.id}: cần ${o.need.stars} sao, tối đa ${total}`);
    if (o.need && o.need.chest) assert.ok(WORLD.regions.find((r) => r.id === o.need.chest && r.chest), `${o.id}: vùng không có rương`);
  }
  assert.equal(worldOutfitUnlocked(WORLD.outfits[0], {}, {}), true);
  assert.equal(worldChestReady('data', { game: 3, g4: 3 }), true);
  assert.equal(worldChestReady('data', { game: 3, g4: 2 }), false);
  assert.equal(worldOutfitUnlocked({ need: { chest: 'data' } }, {}, { data: '2026-01-01' }), true);
});
