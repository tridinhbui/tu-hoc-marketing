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
  const sql = fs.readFileSync(rel('api/migrations/0004_realm.sql'), 'utf8');
  const m = /\('kingdom', '(\[.*?\])'/s.exec(sql); assert.ok(m, 'không thấy cấu hình kingdom');
  const server = new Map(JSON.parse(m[1]).map((b) => [b.id, b]));
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
