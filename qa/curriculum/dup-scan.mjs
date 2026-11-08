/* Quét câu lặp lại trong cùng một bài (dấu hiệu một bản sửa bị áp hai lần) và câu bị cụt.
   Chạy: node qa/curriculum/dup-scan.mjs → in danh sách; thoát 1 nếu có. */
import fs from 'node:fs';
import vm from 'node:vm';
const D = 'assets/js/data/bai';
const strip = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
let bad = 0;
for (const f of fs.readdirSync(D).filter((x) => x.endsWith('.js')).sort()) {
  let p; vm.runInContext(fs.readFileSync(`${D}/${f}`, 'utf8'), vm.createContext({ BAI_ADD: (x) => { p = x; } }));
  for (const l of p.lessons) {
    const fields = { situation: l.situation, concept: l.concept?.body, example: l.example, counter: l.counter, deeper: l.deeper, apply: l.apply };
    (l.points || []).forEach((x, i) => { fields['points' + i] = x; });
    (l.q || []).forEach((q, i) => { fields['q' + (i + 1) + '.stem'] = q.stem; Object.entries(q.why || {}).forEach(([k, v]) => { fields[`q${i + 1}.why.${k}`] = v; }); });
    for (const [k, v] of Object.entries(fields)) {
      const sents = strip(v).split(/(?<=[.!?])\s+/).filter((s) => s.length > 25);
      const seen = new Set();
      for (const s of sents) { if (seen.has(s)) { bad++; console.log(`${l.id} ${k}: câu lặp: "${s.slice(0, 90)}"`); } seen.add(s); }
      if (/\(\s*\)|,\s*,|(?<!\.)\.\s+\.(?!\.)/.test(strip(v))) { bad++; console.log(`${l.id} ${k}: dấu câu lạ: "${strip(v).match(/.{0,30}(\(\s*\)|,\s*,|\.\s*\.(?!\.)).{0,30}/)[0]}"`); }
    }
    const all = Object.values(fields).map(strip).join(' ');
    const phrases = all.match(/(?:nếu màn hình (?:của bạn )?khác[^.]*\.)/gi) || [];
    if (phrases.length > 2) { bad++; console.log(`${l.id}: câu "nếu màn hình khác" lặp ${phrases.length} lần`); }
  }
}
console.log(bad ? `${bad} vấn đề` : 'không thấy câu lặp');
process.exit(bad ? 1 : 0);
