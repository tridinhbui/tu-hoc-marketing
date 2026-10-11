/* Bài thực hành có đầu ra: mỗi bài phải tự đủ — có dữ liệu cho sẵn, đầu ra cụ thể, tiêu chí tự kiểm, bài làm mẫu. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { loadLessons, rel } from './helpers.mjs';

const ctx = vm.createContext({ console });
for (const f of ['tasks', 'tasks-a', 'tasks-b']) vm.runInContext(fs.readFileSync(rel(`assets/js/data/${f}.js`), 'utf8'), ctx, { filename: f });
const TASKS = vm.runInContext('BAI_TASKS', ctx);
const ids = new Set(loadLessons().map((l) => l.id));
const strip = (s) => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const entries = Object.entries(TASKS);

test('có bài thực hành soạn riêng (mục tiêu ≥ 20)', () => {
  assert.ok(entries.length >= 20, `mới có ${entries.length}`);
});

test('mỗi bài thực hành trỏ tới bài có thật và đủ bốn phần', () => {
  const bad = [];
  for (const [id, t] of entries) {
    if (!ids.has(id)) bad.push(`${id}: bài không tồn tại`);
    if (!t.given || (Array.isArray(t.given) ? !t.given.length : !strip(t.given))) bad.push(`${id}: thiếu dữ liệu cho sẵn`);
    if (strip(t.output).length < 30) bad.push(`${id}: đầu ra quá ngắn`);
    if (!Array.isArray(t.rubric) || t.rubric.length < 4) bad.push(`${id}: rubric < 4 tiêu chí`);
    if (strip(t.model).length < 40) bad.push(`${id}: thiếu bài làm mẫu`);
  }
  assert.deepEqual(bad, []);
});

test('không đòi "nói 60 giây" hay dữ liệu riêng của người học', () => {
  const bad = [];
  for (const [id, t] of entries) {
    const o = strip(t.output);
    if (/nói (trong )?60 giây|đọc to|nói to/i.test(o)) bad.push(`${id}: vẫn bắt nói`);
    if (/(của bạn|bạn (đang|từng|biết)|shop bạn|đội bạn|công ty bạn|doanh nghiệp bạn)/i.test(o)) bad.push(`${id}: đòi dữ liệu riêng`);
  }
  assert.deepEqual(bad, []);
});

test('tiêu chí tự kiểm quan sát được: không dùng từ mơ hồ làm tiêu chí duy nhất', () => {
  for (const [id, t] of entries) {
    const vague = t.rubric.filter((r) => /^(hay|tốt|đẹp|sáng tạo|hợp lý)\.?$/i.test(strip(r)));
    assert.equal(vague.length, 0, `${id}: tiêu chí mơ hồ`);
  }
});
