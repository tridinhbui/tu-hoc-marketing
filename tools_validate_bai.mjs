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

const { MODULES } = await import('./tools_bai_index.mjs');
const only = process.argv[2];
/* Có mã module: kiểm file đó kể cả khi chưa có trong mục lục (bản nháp). Không có: kiểm mọi module đã có file. */
const mods = only ? [only] : MODULES.map(m => m.id).filter(id => fs.existsSync(`assets/js/data/bai/${id}.js`));
const ERRORS = g('ERRORS'), INDEX = g('BAI_INDEX');
const packs = {}; ctx.__cap = (p) => { packs[p.mod] = p; };
vm.runInContext('const __orig = BAI_ADD; BAI_ADD = (p) => { __cap(p); __orig(p); };', ctx);
const words = (h) => String(h || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
const plain = (h) => String(h || '').replace(/<[^>]+>/g, '').trim().toLowerCase();

let errs = 0, warns = 0, lessonsN = 0, itemsN = 0;
const bad = (id, m) => { errs++; console.log(`  ✗ ${id}: ${m}`); };
const warn = (id, m) => { warns++; console.log(`  ! ${id}: ${m}`); };
const stems = new Map();

let mcqN = 0, longestN = 0;
for (const mod of mods) {
  const f = `assets/js/data/bai/${mod}.js`;
  if (!fs.existsSync(f)) { bad(mod, `thiếu file ${f}`); continue; }
  load(f);
  const pack = packs[mod]; if (!pack) { bad(mod, 'file không gọi BAI_ADD'); continue; }
  if (pack.mod !== mod) bad(mod, `BAI_ADD mod='${pack.mod}' khác tên file`);
  const man = MODULES.find(m => m.id === mod);
  const m0 = mcqN, l0 = longestN;
  const idx = pack.lessons.map(l => ({ id:l.id, mod, skill:l.skill, read:l.read, t:l.t }));
  if (man && idx.length !== man.n) bad(mod, `có ${idx.length} bài, kế hoạch cần ${man.n}`);
  idx.forEach((b, i) => { const want = `B:${mod}-${String(i + 1).padStart(2, '0')}`; if (b.id !== want) bad(b.id, `mã bài phải là ${want}`);
    if (!/^\d+ phút$/.test(b.read || '')) bad(b.id, 'thiếu read dạng "6 phút"'); });
  console.log(`\n${mod} · ${idx.length} bài`);
  for (const b of idx) {
    const L = g('BAI')[b.id];
    if (!L) { bad(b.id, 'có trong mục lục nhưng không có nội dung'); continue; }
    lessonsN++;
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
        const rl = plain(right.t).length, mx = Math.max(...others.map(x => plain(x.t).length));
        mcqN++; if (rl > mx) longestN++;
        if (rl > mx * 1.2) bad(id, `đáp án đúng dài hơn phương án sai dài nhất ${Math.round((rl / mx - 1) * 100)}% — viết lại NHIỄU cho cụ thể và dài bằng, đừng cắt đáp án`);
        if (others.some(x => plain(x.t).length < 12)) bad(id, 'có phương án quá ngắn/rỗng');
        if (/^(không ảnh hưởng|không có (ý nghĩa|rủi ro|tác dụng)|ngẫu nhiên)/i.test(others.map(x => plain(x.t)).join('|').split('|').find(t => /^(không ảnh hưởng|không có (ý nghĩa|rủi ro|tác dụng)|ngẫu nhiên)/i.test(t)) || ''))
          warn(id, 'có phương án kiểu "không ảnh hưởng/ngẫu nhiên" — thay bằng một hiểu lầm cụ thể');
      }
    });
  }
  const pos = { a:0, b:0, c:0, d:0 }; pack.lessons.forEach(l => (l.q || []).forEach(q => { if (q.answer in pos) pos[q.answer]++; }));
  const posN = Object.values(pos).reduce((x, y) => x + y, 0), top = Math.max(...Object.values(pos));
  if (posN >= 20 && top / posN > 0.4) bad(mod, `đáp án đúng dồn vào một vị trí (${JSON.stringify(pos)}) — rải đều a/b/c/d`);
  const share = (longestN - l0) / Math.max(1, mcqN - m0);
  console.log(`  đáp án đúng là phương án dài nhất: ${Math.round(share * 100)}% (${longestN - l0}/${mcqN - m0}) — cần 15–35%`);
  if (share > 0.35) bad(mod, `đáp án đúng dài nhất ở ${Math.round(share * 100)}% câu trắc nghiệm (trần 35%) — người học đoán được theo độ dài`);
  if (mcqN - m0 >= 10 && share < 0.15) bad(mod, `đáp án đúng dài nhất chỉ ở ${Math.round(share * 100)}% câu (sàn 15%) — người học đoán ngược được: loại phương án dài nhất`);
}
console.log(`\n${lessonsN} bài · ${itemsN} câu · ${errs} lỗi · ${warns} cảnh báo`);
process.exit(errs ? 1 : 0);
