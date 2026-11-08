/* Dựng kho dữ liệu chương trình (machine-readable) từ nguồn thật trong assets/js/data.
   Chạy: node qa/curriculum/build-inventory.mjs  →  qa/curriculum/inventory.json
   Không sửa nội dung; chỉ đọc. Mọi số đếm trong báo cáo lấy từ file này. */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const D = path.join(ROOT, 'assets/js/data');
const ctx = vm.createContext({ console });
const run = (f) => vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
for (const f of ['lessons', 'principles', 'curriculum', 'drills', 'cases', 'campaigns', 'campaigns-deep', 'brands', 'exam-items', 'exams', 'bai-index', 'tasks', 'tasks-a', 'tasks-b', 'capstone', 'ads-cases', 'ads-course', 'glossary']) {
  const p = `${D}/${f}.js`; if (fs.existsSync(p)) run(p);
}
const packs = [];
vm.runInContext('const __o = BAI_ADD; BAI_ADD = (p) => { __cap(p); __o(p); };', ctx); ctx.__cap = (p) => packs.push(p);
for (const f of fs.readdirSync(`${D}/bai`).filter((x) => x.endsWith('.js')).sort()) run(`${D}/bai/${f}`);
const g = (e) => vm.runInContext(`(typeof ${e.split(/[.\[(]/)[0]} !== 'undefined') ? (${e}) : undefined`, ctx);
const { MODULES } = await import(path.join(ROOT, 'tools_bai_index.mjs'));

const strip = (h) => String(h || '').replace(/<[^>]+>/g, ' ');
const words = (h) => strip(h).trim().split(/\s+/).filter(Boolean).length;
const STEP_STAGE = g('STEP_STAGE') || {};
const STAGES = g('STAGES') || [], EXAM_ITEMS = g('EXAM_ITEMS') || [], COMP = g('COMPETENCIES') || [];
const LESSONS_L = g('LESSONS') || [], PRINCIPLES = g('PRINCIPLES') || [], DRILLS = g('DRILLS') || {}, TASKS = g('BAI_TASKS') || {};
const CASES = g('CASES') || [], ADS_CASES = g('ADS_CASES') || [], CAMPAIGNS = g('CAMPAIGNS') || [], DEEP = g('CAMPAIGN_DEEP') || {};
const GLOSSARY = g('GLOSSARY') || [];

/* vị trí trong chặng/module cũ */
const where = {};
for (const st of STAGES) for (const m of st.mods || []) for (const k of m.lessons || []) where[k] = { stage: st.id, mod: m.id, modTitle: m.t };
const compOf = {}; for (const c of COMP) for (const k of c.lessons) (compOf[k] = compOf[k] || []).push(c.id);
const SKILL_OF_COMP = { c01: 'insight', c02: 'insight', c03: 'insight', c04: 'brand', c05: 'brand', c06: 'brand', c08: 'creative', c07: 'channel', c09: 'channel', c10: 'channel', c11: 'measure', c12: 'measure', c13: 'measure', c14: 'comm', c15: 'comm' };

import { bloomOf as BLOOM } from './bloom.mjs';
const ILLUS = /minh ho[aạ]|giả định|giả lập|tự đặt|ví dụ (số|giả)/i;
const BRAND_RE = /\b(Highlands|Vinamilk|Biti'?s|Mixue|Grab|Shopee|Lazada|TikTok Shop|Th[ếe] Gi[ớo]i Di [Đđ][ộo]ng|Trung Nguy[êe]n|Coca|Nike|Apple|Dove|Spotify|Duolingo|IKEA|McDonald|Starbucks|UNIQLO|Patagonia|Kido|Masan|Vinfast|Phúc Long|Katinat|Cocoon|Saigon|Heineken|Unilever|P&G|Pepsi|Samsung|Oppo|Viettel|VNPay|Momo|ZaloPay|Tiki|Sendo|Bách Hoá Xanh|WinMart|Circle K|GS25)\b/;

const lessons = [];
for (const p of packs) {
  const man = MODULES.find((m) => m.id === p.mod) || {};
  p.lessons.forEach((l, i) => {
    const q = l.q || [];
    const calc = q.filter((x) => x.type === 'calc');
    const text = [l.situation, l.concept?.body, l.example, ...(l.points || []), l.counter, l.deeper].join(' ');
    lessons.push({
      id: l.id, kind: 'B', mod: p.mod, modTitle: man.t || '', step: man.step || '', stage: STEP_STAGE[man.step] || null, order: i + 1,
      title: l.t, skill: l.skill, read: l.read, loc: `assets/js/data/bai/${p.mod}.js`,
      fields: { situation: !!l.situation, concept: !!(l.concept && l.concept.body), example: !!l.example, points: (l.points || []).length, counter: !!l.counter, deeper: !!l.deeper, mistakes: (l.mistakes || []).length, apply: !!l.apply, how: (l.how || []).length, fig: !!l.fig, src: (l.src || []).length, rel: (l.rel || []).length, assume: !!l.assume },
      words: { situation: words(l.situation), concept: words(l.concept?.body), example: words(l.example), body: words(text) },
      quiz: { n: q.length, mcq: q.length - calc.length, calc: calc.length, calcSteps: calc.reduce((a, c) => a + (c.steps || []).length, 0), bloom: q.map(BLOOM), errorCodes: [...new Set(calc.flatMap((c) => [...(c.errors || []), ...(c.wrong || []).map((w) => w[1])]))] },
      labels: { illustrative: ILLUS.test(text), realBrand: BRAND_RE.test(text), sources: (l.src || []).length },
      hasTask: !!TASKS[l.id], hasDrill: !!DRILLS[l.id], legacyRefs: man.old || [],
      examItems: EXAM_ITEMS.filter((x) => x.source === l.id && !/#/.test(x.id)).length,
    });
  });
}
for (const L of LESSONS_L) {
  const id = `L:${L.day}`, w = where[id] || {};
  const text = [L.idea, L.real, ...(L.why || []), L.closer].join(' ');
  lessons.push({ id, kind: 'L', mod: w.mod || null, modTitle: w.modTitle || '', step: null, stage: w.stage || null, order: null, title: L.t, skill: SKILL_OF_COMP[(compOf[id] || [])[0]] || null,
    read: L.read, loc: 'assets/js/data/lessons.js', fields: { idea: !!L.idea, real: !!L.real, why: (L.why || []).length, closer: !!L.closer, try: !!L.try },
    words: { body: words(text) }, quiz: { n: EXAM_ITEMS.filter((x) => x.source === id || (x.teaches || []).includes(id)).length },
    labels: { illustrative: ILLUS.test(text), realBrand: BRAND_RE.test(text), sources: 0 }, hasTask: !!TASKS[id], hasDrill: !!DRILLS[id], competencies: compOf[id] || [], d: L.d });
}
for (const P of PRINCIPLES) {
  const id = `P:${P.id}`, w = where[id] || {};
  const text = [P.one, P.ex, P.counter, P.brand, P.mistake].join(' ');
  lessons.push({ id, kind: 'P', mod: w.mod || null, modTitle: w.modTitle || '', step: null, stage: w.stage || null, order: null, title: `${P.t} (${P.vi})`, skill: SKILL_OF_COMP[(compOf[id] || [])[0]] || null,
    read: null, loc: 'assets/js/data/principles.js', fields: { one: !!P.one, ex: !!P.ex, counter: !!P.counter, brand: !!P.brand, mistake: !!P.mistake, drill: !!P.drill },
    words: { body: words(text) }, quiz: { n: EXAM_ITEMS.filter((x) => x.source === id || (x.teaches || []).includes(id)).length },
    labels: { illustrative: ILLUS.test(text), realBrand: BRAND_RE.test(text), sources: 0 }, hasTask: !!TASKS[id], hasDrill: !!DRILLS[id], competencies: compOf[id] || [], d: P.d });
}

/* Lịch sử audit cũ (10/2026): điểm 8 chiều thang 10 → điểm mới nhất theo bài */
const prior = {};
try {
  const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'MARKETING-CURRICULUM-AUDIT-DATA.json'), 'utf8'));
  /* Audit cũ đánh số bài L: theo chỉ số mảng (L:0…L:25); bài thật dùng ngày (L:53…L:78). */
  const fixId = (id) => { const m = /^L:(\d+)$/.exec(id); return m && +m[1] < 53 ? `L:${53 + +m[1]}` : id; };
  for (const l of A.lessons) prior[fixId(l.id)] = { round: 'baseline-2026-10-11', scores: l.scores, total: l.total, bloom: l.bloom_now, priority: l.priority, decision: l.decision };
  const R = JSON.parse(fs.readFileSync(path.join(ROOT, 'CURRICULUM-IMPROVEMENT-LOG-DATA.json'), 'utf8'));
  for (const x of R.reaudit) if (x.scores) prior[fixId(x.id)] = { ...(prior[fixId(x.id)] || {}), round: x.round, scores: x.scores, total: x.total, bloom: x.bloom_now, reaudited: true };
} catch (e) { console.error('prior audit không đọc được:', e.message); }
for (const l of lessons) l.prior = prior[l.id] || null;

const assessments = {
  examItems: { total: EXAM_ITEMS.length, standalone: EXAM_ITEMS.filter((x) => !/#/.test(x.id)).length, fromLessons: EXAM_ITEMS.filter((x) => /#/.test(x.id)).length,
    byType: EXAM_ITEMS.reduce((a, x) => { a[x.type] = (a[x.type] || 0) + 1; return a; }, {}), byStage: EXAM_ITEMS.reduce((a, x) => { a[x.stage || '?'] = (a[x.stage || '?'] || 0) + 1; return a; }, {}) },
  drills: Object.keys(DRILLS).length, tasks: Object.keys(TASKS), timedCases: CASES.map((c) => ({ id: c.id, t: c.t, level: c.level, minutes: c.minutes, industry: c.industry, asks: (c.asks || []).length })),
  adsCases: ADS_CASES.map((c) => ({ id: c.id, t: c.t, kind: c.kind })), capstone: !!g('CAPSTONE'), competencies: COMP.map((c) => ({ id: c.id, t: c.t, lessons: c.lessons })),
  campaigns: CAMPAIGNS.map((c) => ({ id: c.id, t: c.t || c.title, deep: !!DEEP[c.id] })), glossary: GLOSSARY.length,
};
const modules = MODULES.map((m) => ({ id: m.id, step: m.step, stage: STEP_STAGE[m.step], t: m.t, planned: m.n, published: lessons.filter((l) => l.mod === m.id && l.kind === 'B').length, legacy: m.old || [] }));
const out = { generated: new Date().toISOString().slice(0, 10), counts: { lessons: lessons.length, B: lessons.filter((l) => l.kind === 'B').length, L: LESSONS_L.length, P: PRINCIPLES.length, modules: modules.filter((m) => m.published).length, quizItems: lessons.reduce((a, l) => a + (l.kind === 'B' ? l.quiz.n : 0), 0) }, stages: STAGES.map((s) => ({ id: s.id, t: s.t, elective: !!s.elective })), modules, lessons, assessments };
fs.writeFileSync(path.join(ROOT, 'qa/curriculum/inventory.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.counts), '· exam items', assessments.examItems.total, '· tasks', assessments.tasks.length, '· timed cases', assessments.timedCases.length, '· campaigns', assessments.campaigns.length, '· glossary', assessments.glossary);
console.log('prior scores available for', lessons.filter((l) => l.prior).length, 'lessons; missing for', lessons.filter((l) => !l.prior).map((l) => l.mod || l.id).reduce((a, m) => { a[m] = (a[m] || 0) + 1; return a; }, {}));
