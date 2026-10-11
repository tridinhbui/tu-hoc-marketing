import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeGw } from '../src/gw.js';

test('mergeGw: sao và kỷ lục lấy lớn hơn, kẹp tối đa 3 sao; rương lấy ngày sớm hơn', () => {
  const m = mergeGw({ stars: { g4: 2, game: 3 }, best: { g4: 0.9 }, chests: { data: '2026-10-05' } },
                    { stars: { g4: 3, g2: 9 }, best: { g4: 0.8, g2: 0.7 }, chests: { data: '2026-10-09', people: '2026-10-08' }, outfit: 'blue' });
  assert.deepEqual(m.stars, { g4: 3, game: 3, g2: 3 });
  assert.deepEqual(m.best, { g4: 0.9, g2: 0.7 });
  assert.deepEqual(m.chests, { data: '2026-10-05', people: '2026-10-08' });
  assert.equal(m.outfit, 'blue');
});
