/* Build ngân hàng câu cho server từ dữ liệu phía trình duyệt (assets/js/data).
   Chạy: node tools/build-bank.mjs  →  src/generated/bank.json
   Server chấm từ file này; đề gửi xuống trình duyệt bị bỏ answer/ans/why. */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const DATA = path.resolve('..', 'assets/js/data');
const ctx = vm.createContext({ console });
const load = (f) => vm.runInContext(fs.readFileSync(path.join(DATA, f), 'utf8'), ctx, { filename: f });
for (const f of ['lessons.js', 'principles.js', 'curriculum.js', 'drills.js', 'cases.js', 'exam-items.js', 'exams.js']) load(f);
if (fs.existsSync(path.join(DATA, 'bai-index.js'))) {
  load('bai-index.js');
  const dir = path.join(DATA, 'bai');
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) load('bai/' + f);
}
const g = (n) => vm.runInContext(`typeof ${n} !== 'undefined' ? ${n} : null`, ctx);
const ITEMS = g('EXAM_ITEMS') || [], COMP = g('COMPETENCIES') || [], BAI_INDEX = g('BAI_INDEX') || [], STAGES = g('STAGES') || [];

/* Kỹ năng = 6 nhóm mà giao diện đang hiển thị. Bài cũ đi qua 15 năng lực; bài mới có skill sẵn. */
const SKILL_OF_COMP = { c01: 'insight', c02: 'insight', c03: 'insight', c04: 'brand', c05: 'brand', c06: 'brand', c08: 'creative',
  c07: 'channel', c09: 'channel', c10: 'channel', c11: 'measure', c12: 'measure', c13: 'measure', c14: 'comm', c15: 'comm' };
const skillOfLesson = {};
for (const c of COMP) for (const k of c.lessons) skillOfLesson[k] = SKILL_OF_COMP[c.id];
for (const b of BAI_INDEX) if (b.skill) skillOfLesson[b.id] = b.skill;

/* Thứ tự bài theo chặng (để tính "bài tiếp theo" và khoá). */
const order = [];
for (const st of STAGES) for (const m of st.mods || []) for (const k of m.lessons || []) order.push({ key: k, stage: st.id, mod: m.id });
for (const b of BAI_INDEX) if (!order.some((o) => o.key === b.id)) order.push({ key: b.id, stage: b.stage || null, mod: b.mod || null });

const items = {}, lessons = {}, stages = {};
for (const it of ITEMS) {
  if (!it || !it.id) continue;
  const lesson = it.source && /^[LPB]:/.test(it.source) ? it.source : (it.teaches || []).find((t) => /^[LPB]:/.test(t)) || null;
  const skill = skillOfLesson[lesson] || (it.teaches || []).map((t) => skillOfLesson[t]).find(Boolean) || null;
  const base = { id: it.id, type: it.type, stage: it.stage || null, mod: it.mod || null, core: !!it.core,
    difficulty: it.difficulty || 2, lesson, skill, stem: it.stem, ctx: it.ctx || null, rows: it.rows || null };
  if (it.type === 'calc') Object.assign(base, { unit: it.unit || '', ans: it.ans, tol: it.tol ?? 0.01, errors: it.errors || [], steps: it.steps || null, wrong: it.wrong || null });
  else Object.assign(base, { options: (it.options || []).map((o) => ({ k: o.k, t: o.t })), answer: it.answer, why: it.why || {} });
  items[it.id] = base;
  if (lesson) (lessons[lesson] = lessons[lesson] || []).push(it.id);
  if (base.stage) (stages[base.stage] = stages[base.stage] || []).push(it.id);
}
const out = { built_at: new Date().toISOString(), count: Object.keys(items).length, items, lessons, stages, order, skillOfLesson };
fs.mkdirSync('src/generated', { recursive: true });
fs.writeFileSync('src/generated/bank.json', JSON.stringify(out));
console.log(`bank: ${out.count} câu · ${Object.keys(lessons).length} bài có câu · chặng ${Object.entries(stages).map(([k, v]) => k + '=' + v.length).join(' ')} · ${Math.round(fs.statSync('src/generated/bank.json').size / 1024)} KB`);
