/* Kiểm mẹo độ dài trong ngân hàng đề cũ (assets/js/data/exam-items.js).
   Chạy: node tools_lint_exam.mjs [s1..s6]. Luật giống tools_validate_bai.mjs. */
import fs from 'fs'; import vm from 'vm';
const c = vm.createContext({});
['lessons','principles','curriculum','drills','exam-items'].forEach(f => vm.runInContext(fs.readFileSync(`assets/js/data/${f}.js`,'utf8'), c));
const only = process.argv[2];
const items = vm.runInContext('EXAM_ITEMS', c).filter(it => it.options && (!only || it.stage === only));
const plain = h => String(h||'').replace(/<[^>]+>/g,'').trim();
let n = 0, longest = 0, errs = 0;
for (const it of items) {
  const r = it.options.find(o => o.k === it.answer), o = it.options.filter(x => x.k !== it.answer);
  const rl = plain(r.t).length, mx = Math.max(...o.map(x => plain(x.t).length)); n++; if (rl > mx) longest++;
  if (rl > mx * 1.2) { errs++; console.log(`  ✗ ${it.id}: đáp án đúng dài hơn nhiễu dài nhất ${Math.round((rl/mx-1)*100)}%`); }
  if (o.some(x => plain(x.t).length < 12)) { errs++; console.log(`  ✗ ${it.id}: có phương án quá ngắn/rỗng`); }
  it.options.forEach(x => { if (!it.why || !plain(it.why[x.k])) { errs++; console.log(`  ✗ ${it.id}: thiếu lời giải ${x.k}`); } });
}
const share = longest / Math.max(1, n);
console.log(`${only||'tất cả'}: ${n} câu trắc nghiệm · đáp án đúng dài nhất ${Math.round(share*100)}% (cần 15–35%) · ${errs} lỗi`);
process.exit(errs || share > 0.35 || (n >= 10 && share < 0.15) ? 1 : 0);
