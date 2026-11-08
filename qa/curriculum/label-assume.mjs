/* Đợt "gắn nhãn số minh hoạ": thêm assume:true cho mọi bài B: chưa có, trừ in02/in03 (case thương hiệu thật — số ở đó là
   khẳng định chưa xác minh, không phải minh hoạ; cần nguồn, không cần nhãn minh hoạ).
   Căn cứ: header mọi file bài và KE-HOACH-700-BAI.md khai báo "mọi con số là MINH HOẠ và tự khớp nhau"; nhãn chỉ đưa
   điều đã khai báo ra trước mắt người học (bai.html hiện "Số liệu giả định" ở phần Ví dụ). Chạy: node qa/curriculum/label-assume.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIR = path.join(ROOT, 'assets/js/data/bai');
const SKIP = new Set(['in02', 'in03']);
let changed = 0, files = 0;
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.js')).sort()) {
  const mod = f.slice(0, 4); if (SKIP.has(mod)) continue;
  let src = fs.readFileSync(path.join(DIR, f), 'utf8');
  let pack; vm.runInContext(src, vm.createContext({ BAI_ADD: (p) => { pack = p; } }));
  let n = 0;
  for (const l of pack.lessons) {
    if (l.assume) continue;
    const re = new RegExp(`(\\{\\s*id:'${l.id.replace(/[:.-]/g, (c) => '\\' + c)}'[^\\n]*?read:'[^']*')`);
    if (!re.test(src)) { console.error('không tìm thấy mẫu id/read cho', l.id); continue; }
    src = src.replace(re, '$1, assume:true'); n++;
  }
  if (n) { let after; vm.runInContext(src, vm.createContext({ BAI_ADD: (p) => { after = p; } }));
    if (after.lessons.length !== pack.lessons.length) throw new Error(f + ': số bài đổi');
    fs.writeFileSync(path.join(DIR, f), src); changed += n; files++; }
}
console.log(`đã gắn assume:true cho ${changed} bài trong ${files} file (bỏ qua in02, in03)`);
