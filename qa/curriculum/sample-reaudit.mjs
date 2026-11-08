/* Chọn mẫu phân tầng các bài đã sửa trong đợt P1 để chấm mù lại (≥ 25% số bài đã sửa, tối thiểu 1 bài/module có sửa).
   Chạy: node qa/curriculum/sample-reaudit.mjs [tỉ lệ=0.25] → in danh sách id và ghi qa/curriculum/reaudit-sample.json */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const Q = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const share = +(process.argv[2] || 0.25);
const LG = path.join(Q, 'p1-log');
const byMod = {};
for (const f of fs.readdirSync(LG).filter((x) => x.endsWith('.json')).sort()) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(LG, f), 'utf8')); } catch { continue; }
  const ids = [...new Set((j.items || []).filter((i) => i.status === 'fixed').map((i) => i.id))];
  if (ids.length) byMod[f.slice(0, -5)] = ids;
}
/* chọn xác định: hash đơn giản theo id để lặp lại được */
const h = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const sample = [];
let totalFixed = 0;
for (const [m, ids] of Object.entries(byMod)) {
  totalFixed += ids.length;
  const k = Math.max(1, Math.round(ids.length * share));
  sample.push(...ids.slice().sort((a, b) => h(a) - h(b)).slice(0, k));
}
fs.writeFileSync(path.join(Q, 'reaudit-sample.json'), JSON.stringify({ share, totalFixedLessons: totalFixed, sample }, null, 1));
console.log(`bài đã sửa: ${totalFixed} · mẫu chấm lại: ${sample.length}`);
console.log(sample.join(' '));
