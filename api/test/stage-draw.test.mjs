/* Đề vượt chặng do máy chủ dựng: đủ câu, không lặp, trải bài, có phân cấp độ khó theo kỹ năng. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pickStageItems, STAGE_MIX, seeded, stageExam } from '../src/learn-core.js';
import { deriveDifficulty } from '../src/difficulty.js';

const bank = JSON.parse(fs.readFileSync(new URL('../src/generated/bank.json', import.meta.url)));
const STAGES = ['s1', 's2', 's3', 's4', 's5'];

test('mỗi chặng có đề: đủ 15 câu, không câu nào lặp, mỗi bài ≤ 2 câu, không hai câu liền cùng bài', () => {
  for (const sid of STAGES) for (let s = 1; s <= 20; s++) {
    const ids = pickStageItems(bank, bank.stages[sid], 15, seeded(s));
    assert.equal(ids.length, 15, `${sid}/${s}`);
    assert.equal(new Set(ids).size, 15, `${sid}/${s}: câu lặp`);
    const per = {};
    ids.forEach((id, i) => {
      const l = bank.items[id].lesson || id; per[l] = (per[l] || 0) + 1;
      if (i) assert.notEqual(l, bank.items[ids[i - 1]].lesson, `${sid}/${s}: hai câu liền cùng bài`);
    });
    assert.ok(Math.max(...Object.values(per)) <= 2, `${sid}/${s}: một bài > 2 câu`);
  }
});

test('phân cấp độ khó: đề có đủ mức 3 (nhiều bước/phản biện) theo STAGE_MIX', () => {
  for (const sid of STAGES) {
    const ids = pickStageItems(bank, bank.stages[sid], 15, seeded(7));
    const lv = [1, 2, 3].map((d) => ids.filter((id) => bank.items[id].difficulty === d).length);
    assert.ok(lv[2] >= STAGE_MIX[3] - 1, `${sid}: mức 3 chỉ ${lv[2]} câu (${lv})`);
    assert.ok(lv[0] <= STAGE_MIX[1] + 1, `${sid}: mức 1 vượt ${lv[0]}`);
  }
});

test('thi lại không giống hệt: hai hạt giống khác nhau cho hai đề khác nhau', () => {
  const a = pickStageItems(bank, bank.stages.s2, 15, seeded(1)), b = pickStageItems(bank, bank.stages.s2, 15, seeded(2));
  assert.notDeepEqual([...a].sort(), [...b].sort());
});

test('stageExam (đường GET có cooldown) cũng dùng bộ chọn theo độ khó', () => {
  const r = stageExam(bank, 's3', { count: 15, min_pool: 30 }, seeded(3));
  assert.equal(r.items.length, 15);
  assert.ok(r.items.some((id) => bank.items[id].difficulty === 3));
});

test('độ khó suy ra theo kỹ năng, không theo độ dài: câu dài nhưng chỉ nhớ định nghĩa vẫn là mức 1', () => {
  const long = { type: 'mcq', stem: 'Trong tài liệu marketing, khái niệm nào dưới đây được gọi là thuật ngữ mô tả toàn bộ việc doanh nghiệp tổ chức và quản lý các hoạt động truyền thông cho một sản phẩm hay dịch vụ nhất định trên thị trường?' };
  assert.equal(deriveDifficulty(long), 1);
  const short = { type: 'calc', stem: 'Chi 10, thu 30, vốn 40%, phí 5, thuế 2.', steps: ['a', 'b', 'c'], wrong: [] };
  assert.equal(deriveDifficulty(short), 3);
  assert.equal(deriveDifficulty({ type: 'mcq', stem: 'Bạn làm gì?', difficulty: 3 }), 3, 'giữ độ khó người viết đã gán');
});
