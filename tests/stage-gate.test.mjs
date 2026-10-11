/* Cổng vượt chặng. Lỗi đã từng xảy ra: giai-case.html chỉ ghi 3 khoá `pass` (calc, insight, rec) nhưng
   exam.js đòi đúng 4 khoá cho "đạt 4/4" → chặng 06 không ai vượt được. Các test dưới đây khoá hợp đồng đó. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { loadExamEngine, rel } from './helpers.mjs';

const mkState = (cases) => ({ cases, exams: {} });
const attempt = (pass, passed = true, extra = {}) => ({ date: '2026-10-10', secs: 400, timeout: false, pass, passed, ...extra });
const ALL4 = { calc: true, insight: true, rec: true, talk: true };

function engine(cases, caseList) {
  const ctx = loadExamEngine({ CASES: caseList });
  vm.runInContext(`S = { get: () => (${JSON.stringify(mkState(cases))}) };`, ctx);   // stub đọc state
  return ctx;
}
const CASE_LIST = ['a', 'b', 'c', 'd'].map((id, i) => ({ id, t: id, level: i === 3 ? 'Khó' : 'Vừa', industry: 'x', minutes: 10 }));

test('hợp đồng: các khoá giai-case.html ghi vào `pass` phủ đủ khoá exam.js đòi cho "4/4"', () => {
  const html = fs.readFileSync(rel('giai-case.html'), 'utf8');
  const m = html.match(/const pass=\{([^}]*)\}/);
  assert.ok(m, 'không tìm thấy khai báo `const pass={...}` trong giai-case.html');
  const written = [...m[1].matchAll(/(\w+)\s*:/g)].map((x) => x[1]);
  const ctx = loadExamEngine();
  const needed = vm.runInContext('FULL_CASE_KEYS', ctx);
  for (const k of needed) assert.ok(written.includes(k), `giai-case.html không ghi khoá '${k}' → không ai đạt 4/4`);
});

test('chặng 06 vượt được: ≥ need case đạt trong giờ, ≥ full case đủ 4 khoá, có case Khó', () => {
  const bp = vm.runInContext('EXAMS.s6', loadExamEngine());
  const cases = Object.fromEntries(CASE_LIST.map((c) => [c.id, [attempt(ALL4)]]));
  const g = vm.runInContext('caseGate("s6")', engine(cases, CASE_LIST));
  assert.equal(g.ok, 4);
  assert.ok(g.full >= bp.full, `full ${g.full} < ${bp.full}`);
  assert.equal(g.hardOk, true);
  assert.equal(g.met, true);
});

test('chỉ đúng ba khoá tự chấm mà chưa viết phần nói (talk=false) thì KHÔNG tính 4/4, nhưng vẫn tính đạt case', () => {
  const cases = Object.fromEntries(CASE_LIST.map((c) => [c.id, [attempt({ calc: true, insight: true, rec: true, talk: false })]]));
  const g = vm.runInContext('caseGate("s6")', engine(cases, CASE_LIST));
  assert.equal(g.ok, 4); assert.equal(g.full, 0); assert.equal(g.met, false);
});

test('lần nộp cũ chỉ có 3 khoá (trước khi sửa) không bị xoá, không tự thành 4/4', () => {
  const old = { calc: true, insight: true, rec: true };
  const cases = Object.fromEntries(CASE_LIST.map((c) => [c.id, [attempt(old)]]));
  const g = vm.runInContext('caseGate("s6")', engine(cases, CASE_LIST));
  assert.equal(g.ok, 4); assert.equal(g.full, 0);
});

test('hết giờ không được tính; thiếu case Khó thì chưa vượt', () => {
  const late = Object.fromEntries(CASE_LIST.map((c) => [c.id, [attempt(ALL4, true, { timeout: true })]]));
  assert.equal(vm.runInContext('caseGate("s6")', engine(late, CASE_LIST)).ok, 0);
  const easyOnly = CASE_LIST.slice(0, 3);
  const cases = Object.fromEntries(easyOnly.map((c) => [c.id, [attempt(ALL4)]]));
  const g = vm.runInContext('caseGate("s6")', engine(cases, easyOnly));
  assert.equal(g.hardOk, false); assert.equal(g.met, false);
});

test('mọi chặng có đề: size, pass, mix nhất quán; mix cộng đúng bằng size', () => {
  const ctx = loadExamEngine();
  const E = vm.runInContext('EXAMS', ctx);
  for (const [sid, bp] of Object.entries(E)) {
    if (bp.kind === 'cases') { assert.ok(bp.need >= 1 && bp.full <= bp.need, `${sid}: full > need`); continue; }
    const sum = Object.values(bp.mix).reduce((a, b) => a + b, 0);
    assert.equal(sum, bp.size, `${sid}: mix cộng ${sum} ≠ size ${bp.size}`);
    assert.ok(bp.pass <= bp.size && bp.pass / bp.size >= 0.6, `${sid}: ngưỡng đạt bất thường`);
  }
});

test('cổng chặng: chặng sau chỉ mở khi chặng trước đã có triện (stageOpen)', () => {
  const src = fs.readFileSync(rel('assets/js/app.js'), 'utf8');
  const m = src.match(/function stageOpen\([\s\S]*?\n}\n/);
  assert.ok(m, 'không tìm thấy stageOpen');
  const ctx = vm.createContext({ console });
  vm.runInContext(`const STAGES=[{id:'s1',mods:[{lessons:['a']}]},{id:'s2',mods:[{lessons:['b']}]},{id:'s3',mods:[{lessons:['c']}]}];
    const S={get:()=>({})}; const EXAMS={s1:{},s2:{}}; ${m[0]}`, ctx);
  assert.equal(vm.runInContext(`stageOpen('s1',{})`, ctx), true);
  assert.equal(vm.runInContext(`stageOpen('s2',{exams:{}})`, ctx), false);
  assert.equal(vm.runInContext(`stageOpen('s2',{exams:{s1:{passed:'2026-01-01'}}})`, ctx), true);
  assert.equal(vm.runInContext(`stageOpen('s3',{exams:{s2:{passed:'2026-01-01'}}})`, ctx), false, 's3 mở khi chưa qua s1');
  assert.equal(vm.runInContext(`stageOpen('s3',{exams:{s1:{passed:'x'},s2:{passed:'y'}}})`, ctx), true);
});
