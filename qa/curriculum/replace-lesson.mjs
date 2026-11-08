/* Thay đúng một object bài trong assets/js/data/bai/<mod>.js bằng văn bản JS mới, giữ nguyên phần còn lại của file.
   Chạy: node qa/curriculum/replace-lesson.mjs B:ob01-02 path/to/new-object.js
   File mới chứa đúng một object literal JS (bắt đầu bằng '{', kết thúc bằng '}'), không có dấu phẩy cuối.
   Sau khi thay: nạp lại module để chắc cú pháp đúng và id không đổi; có lỗi thì không ghi. */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const [id, newPath] = process.argv.slice(2);
if (!/^B:[a-z]{2}\d\d-\d\d$/.test(id || '') || !newPath) { console.error('dùng: node qa/curriculum/replace-lesson.mjs B:xx00-00 new.js'); process.exit(2); }
const mod = id.slice(2, 6), file = path.join(ROOT, `assets/js/data/bai/${mod}.js`);
const src = fs.readFileSync(file, 'utf8');
const key = src.indexOf(`id:'${id}'`); const key2 = src.indexOf(`id: '${id}'`); const k = key >= 0 ? key : key2;
if (k < 0) { console.error('không thấy', id); process.exit(1); }
/* lùi về dấu { mở object của bài */
let start = src.lastIndexOf('{', k);
/* quét ngoặc có nhận biết chuỗi để tìm } đóng */
let depth = 0, i = start, inStr = null, end = -1;
for (; i < src.length; i++) {
  const c = src[i];
  if (inStr) { if (c === '\\') { i++; continue; } if (c === inStr) inStr = null; continue; }
  if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
  if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 1; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
if (end < 0) { console.error('không đóng được object'); process.exit(1); }
const newObj = fs.readFileSync(path.resolve(newPath), 'utf8').trim().replace(/,\s*$/, '');
const out = src.slice(0, start) + newObj + src.slice(end + 1);
/* kiểm: nạp được, đúng số bài, id giữ nguyên ở cùng vị trí */
const load = (code) => { let p; vm.runInContext(code, vm.createContext({ BAI_ADD: (x) => { p = x; } }), { filename: file }); return p; };
const before = load(src), after = load(out);
if (after.lessons.length !== before.lessons.length) { console.error('số bài đổi', before.lessons.length, '→', after.lessons.length); process.exit(1); }
const pos = before.lessons.findIndex((l) => l.id === id);
if (after.lessons[pos].id !== id) { console.error('id ở vị trí', pos, 'đổi thành', after.lessons[pos].id); process.exit(1); }
const a = after.lessons[pos], b = before.lessons[pos];
for (const f of ['skill', 'read']) if (a[f] !== b[f]) console.error(`cảnh báo: ${f} đổi ${b[f]} → ${a[f]}`);
fs.writeFileSync(file, out);
console.log(`đã thay ${id} trong ${path.relative(ROOT, file)} (${end - start + 1} → ${newObj.length} ký tự); ${a.q.length} câu; std=${a.std || 1}`);
