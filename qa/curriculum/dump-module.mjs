/* In nội dung một module (hoặc bài cũ) ra văn bản thuần để đọc/chấm.
   node qa/curriculum/dump-module.mjs dl02          → mọi bài trong module dl02 (kèm đáp án, lời giải)
   node qa/curriculum/dump-module.mjs legacy        → 26 bài L: + 22 nguyên lý P: + câu hỏi đề chặng gắn với chúng
   node qa/curriculum/dump-module.mjs B:dl02-03     → một bài */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const D = path.join(ROOT, 'assets/js/data');
const ctx = vm.createContext({ console });
const run = (f) => vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
for (const f of ['lessons', 'principles', 'curriculum', 'drills', 'cases', 'exam-items', 'exams', 'bai-index', 'tasks', 'tasks-a', 'tasks-b']) run(`${D}/${f}.js`);
const packs = {}; vm.runInContext('const __o = BAI_ADD; BAI_ADD = (p) => { __cap(p); __o(p); };', ctx); ctx.__cap = (p) => { packs[p.mod] = p; };
for (const f of fs.readdirSync(`${D}/bai`).filter((x) => x.endsWith('.js')).sort()) run(`${D}/bai/${f}`);
const g = (e) => vm.runInContext(`(typeof ${e.split(/[.\[(]/)[0]} !== 'undefined') ? (${e}) : undefined`, ctx);
const strip = (h) => String(h || '').replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '');
const arg = process.argv[2];
const TASKS = g('BAI_TASKS') || {}, DRILLS = g('DRILLS') || {}, EXAM = g('EXAM_ITEMS') || [];
const qText = (q, i) => {
  if (q.type === 'calc') return `  Q${i + 1} [calc] ${strip(q.stem)}\n    → đáp án: ${q.ans} ${q.unit || ''} (tol ${q.tol ?? 0.01}); sai hay gặp: ${JSON.stringify(q.wrong || [])}\n    → các bước: ${(q.steps || []).map(strip).join(' | ')}`;
  return `  Q${i + 1} [${q.type}] ${strip(q.stem)}\n` + (q.options || []).map((o) => `    ${o.k === q.answer ? '✔' : ' '} ${o.k}) ${strip(o.t)}\n        vì: ${strip((q.why || {})[o.k])}`).join('\n');
};
const printB = (l, mod) => {
  const out = [`\n==================== ${l.id} · ${mod} · skill=${l.skill} · ${l.read} ====================`, `TIÊU ĐỀ: ${l.t}`, `TÌNH HUỐNG: ${strip(l.situation)}`,
    `KHÁI NIỆM [${strip(l.concept?.name)}]: ${strip(l.concept?.body)}`, `VÍ DỤ${l.assume ? ' (gắn nhãn: số liệu giả định)' : ''}: ${strip(l.example)}`];
  if (l.how?.length) out.push('LÀM TỪNG BƯỚC: ' + l.how.map((h) => `${strip(h.t)}: ${strip(h.d)}`).join(' | '));
  if (l.points?.length) out.push('VÌ SAO HIỆU QUẢ: ' + l.points.map(strip).map((p, i) => `(${i + 1}) ${p}`).join(' '));
  if (l.counter) out.push(`PHẢN VÍ DỤ: ${strip(l.counter)}`);
  if (l.deeper) out.push(`ĐÀO SÂU: ${strip(l.deeper)}`);
  out.push(`MANG THEO: ${strip(l.takeaway)}`, `ÁP DỤNG: ${strip(l.apply)}`, `LỖI HAY GẶP: ${(l.mistakes || []).map(strip).join(' · ')}`);
  if (l.src?.length) out.push('NGUỒN: ' + l.src.map((s) => `${s.t} <${s.u}> (${s.st}, ${s.d})`).join('; '));
  if (l.rel?.length) out.push('LIÊN KẾT: ' + l.rel.join(', '));
  out.push('CÂU HỎI (7 câu: #1 đoán trước · #2 quyết định · #3–#7 quiz):', ...(l.q || []).map(qText));
  if (TASKS[l.id]) out.push(`BÀI THỰC HÀNH CÓ ĐẦU RA: given=${JSON.stringify(TASKS[l.id].given).slice(0, 600)} … output=${strip(TASKS[l.id].output)} rubric=${(TASKS[l.id].rubric || []).map(strip).join(' | ')}`);
  console.log(out.join('\n'));
};
if (arg === 'legacy') {
  for (const L of g('LESSONS')) {
    const id = `L:${L.day}`;
    console.log(`\n==================== ${id} · daily lesson · ${L.d} · ${L.read} ====================\nTIÊU ĐỀ: ${L.t}\nÝ CHÍNH: ${strip(L.idea)}\nĐỜI THẬT: ${strip(L.real)}\nVÌ SAO: ${(L.why || []).map(strip).map((p, i) => `(${i + 1}) ${p}`).join(' ')}\nNHÌN KỸ: ${strip(L.closer)}\nTHỬ: ${strip(L.try)}`);
    const qs = EXAM.filter((x) => x.source === id || (x.teaches || []).includes(id));
    console.log(`CÂU HỎI ĐỀ CHẶNG GẮN VỚI BÀI (${qs.length}):`, ...qs.map((q, i) => `${q.id} ${qText(q, i)}`));
    if (DRILLS[id]) console.log('BÀI TÍNH SỐ:', JSON.stringify(DRILLS[id]).slice(0, 1200));
  }
  for (const P of g('PRINCIPLES')) {
    const id = `P:${P.id}`;
    console.log(`\n==================== ${id} · nguyên lý · ${P.d} ====================\nTIÊU ĐỀ: ${P.t} (${P.vi})\nMỘT DÒNG: ${strip(P.one)}\nVÍ DỤ: ${strip(P.ex)}\nPHẢN VÍ DỤ: ${strip(P.counter)}\nTHƯƠNG HIỆU: ${strip(P.brand)}\nLỖI: ${strip(P.mistake)}\nBÀI TẬP: ${strip(P.drill)}`);
    const qs = EXAM.filter((x) => x.source === id || (x.teaches || []).includes(id));
    console.log(`CÂU HỎI ĐỀ CHẶNG GẮN VỚI BÀI (${qs.length}):`, ...qs.map((q, i) => `${q.id} ${qText(q, i)}`));
    if (DRILLS[id]) console.log('BÀI TÍNH SỐ:', JSON.stringify(DRILLS[id]).slice(0, 1200));
  }
} else if (/^B:/.test(arg)) {
  const mod = arg.slice(2, 6); const l = (packs[mod]?.lessons || []).find((x) => x.id === arg); if (!l) { console.error('không thấy', arg); process.exit(1); } printB(l, mod);
} else {
  const p = packs[arg]; if (!p) { console.error('không có module', arg); process.exit(1); }
  console.log(`MODULE ${arg} · ${p.lessons.length} bài`); p.lessons.forEach((l) => printB(l, arg));
}
