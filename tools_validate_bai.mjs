/* Kiểm định bài học mới trước khi lên app.
   Chạy: node tools_validate_bai.mjs            (mọi module)
         node tools_validate_bai.mjs ob02       (một module)
   Luật lấy từ KE-HOACH-700-BAI.md mục 2 và 4. Có lỗi thì thoát mã 1. */
import fs from 'fs';
import vm from 'vm';

const ctx = vm.createContext({ console });
const load = (f) => vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
['lessons', 'principles', 'curriculum', 'drills', 'exam-items', 'bai-index'].forEach(f => load(`assets/js/data/${f}.js`));
const g = (e) => vm.runInContext(e, ctx);

const only = process.argv[2];
const mods = g('BAI_MODS').map(m => m.id).filter(id => !only || id === only);
const ERRORS = g('ERRORS'), INDEX = g('BAI_INDEX');
const words = (h) => String(h || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
const plain = (h) => String(h || '').replace(/<[^>]+>/g, '').trim().toLowerCase();

let errs = 0, warns = 0, lessonsN = 0, itemsN = 0;
const bad = (id, m) => { errs++; console.log(`  ✗ ${id}: ${m}`); };
const warn = (id, m) => { warns++; console.log(`  ! ${id}: ${m}`); };
const stems = new Map();

for (const mod of mods) {
  const f = `assets/js/data/bai/${mod}.js`;
  if (!fs.existsSync(f)) { bad(mod, `thiếu file ${f}`); continue; }
  load(f);
  const idx = INDEX.filter(b => b.mod === mod);
  console.log(`\n${mod} · ${idx.length} bài trong mục lục`);
  for (const b of idx) {
    const L = g('BAI')[b.id];
    if (!L) { bad(b.id, 'có trong mục lục nhưng không có nội dung'); continue; }
    lessonsN++;
    if (L.t !== b.t) bad(b.id, 'tiêu đề khác với mục lục');
    if (!['insight', 'brand', 'creative', 'channel', 'measure', 'comm'].includes(b.skill)) bad(b.id, `kỹ năng lạ: ${b.skill}`);
    const W = (k, lo, hi) => { const n = words(k === 'concept' ? L.concept && L.concept.body : L[k]);
      if (n < lo || n > hi) warn(b.id, `${k} ${n} chữ (nên ${lo}–${hi})`); };
    ['situation', 'example', 'takeaway', 'apply'].forEach(k => { if (!L[k]) bad(b.id, `thiếu ${k}`); });
    if (!L.concept || !L.concept.name || !L.concept.body) bad(b.id, 'thiếu concept.name/body');
    W('situation', 40, 120); W('concept', 50, 170); W('example', 50, 170); W('takeaway', 6, 28);
    if (!(L.mistakes || []).length) warn(b.id, 'chưa có lỗi hay gặp');
    const q = L.q || [];
    if (q.length !== 7) bad(b.id, `có ${q.length} câu, cần đúng 7`);
    if (q[1] && !/bạn (làm|chọn|sửa|đặt|ưu tiên|phản ứng|đề xuất)|nên (làm|chọn|sửa|xem|đặt)|chọn (đâu|cách|kiểu|theo)|(sửa|làm|chọn) gì/i.test(plain(q[1].stem)))
      warn(b.id, 'câu #2 nên là câu quyết định ("bạn làm gì / chọn gì")');
    if (q.length && !q.slice(2).some(x => x.type === 'calc') && /\d{2,}/.test(plain(L.example))) warn(b.id, 'bài có số nhưng quiz không có câu tính');
    q.forEach((it, i) => {
      const id = `${b.id}#${i + 1}`; itemsN++;
      const st = plain(it.stem); if (!st) return bad(id, 'thiếu stem');
      if (stems.has(st)) bad(id, `trùng thân câu với ${stems.get(st)}`); stems.set(st, id);
      if (it.type === 'calc') {
        if (typeof it.ans !== 'number') bad(id, 'calc thiếu ans số');
        if (!(it.steps || []).length) bad(id, 'calc thiếu steps');
        if (!(it.wrong || []).length) bad(id, 'calc cần ít nhất một đáp án sai định danh lỗi');
        (it.wrong || []).forEach(([v, c]) => { if (!ERRORS[c]) bad(id, `mã lỗi không tồn tại: ${c}`);
          if (Math.abs(v - it.ans) <= (it.tol || 0.01)) bad(id, `đáp án sai ${v} trùng đáp án đúng`); });
        (it.errors || []).forEach(c => { if (!ERRORS[c]) bad(id, `mã lỗi không tồn tại: ${c}`); });
        return;
      }
      const o = it.options || [];
      if (o.length !== 4) bad(id, `có ${o.length} phương án, cần 4`);
      const ks = o.map(x => x.k);
      if (new Set(ks).size !== ks.length) bad(id, 'trùng khoá phương án');
      if (!ks.includes(it.answer)) bad(id, 'đáp án không nằm trong phương án');
      ks.forEach(k => { if (!it.why || !plain(it.why[k])) bad(id, `thiếu lời giải cho phương án ${k}`); });
      if (o.some(x => /tất cả (đều|các)|không (có )?đáp án nào|cả [a-d] và [a-d]/i.test(plain(x.t)))) bad(id, 'phương án kiểu "tất cả/không đáp án nào"');
      const right = o.find(x => x.k === it.answer), others = o.filter(x => x.k !== it.answer);
      if (right && others.length) {
        const avg = others.reduce((n, x) => n + plain(x.t).length, 0) / others.length;
        if (plain(right.t).length > avg * 1.6 + 8) warn(id, `đáp án đúng dài hơn hẳn các phương án sai (${plain(right.t).length} so với ~${Math.round(avg)} ký tự) — dễ đoán theo độ dài`);
      }
    });
  }
}
console.log(`\n${lessonsN} bài · ${itemsN} câu · ${errs} lỗi · ${warns} cảnh báo`);
process.exit(errs ? 1 : 0);
