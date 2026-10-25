/* Khoá "Chạy quảng cáo đa nền tảng" (chặng chuyên đề s7, module qc01–qc11).
   Khoá các hợp đồng: đăng ký đúng chặng, điều hướng liền mạch, tiến độ lưu được, người mới mở được bài,
   KHÔNG làm đổi đề thi và cổng mở khoá của s1–s6, chuẩn 6 phần cho mỗi nền tảng, nguồn có ngày kiểm. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { loadContent, loadLessons, rel } from './helpers.mjs';

const QC = ['qc01', 'qc02', 'qc03', 'qc04', 'qc05', 'qc06', 'qc07', 'qc08', 'qc09', 'qc10', 'qc11'];
const run = (ctx, f) => vm.runInContext(fs.readFileSync(rel(f), 'utf8'), ctx, { filename: f });
const COURSE = (() => { const c = vm.createContext({}); run(c, 'assets/js/data/ads-course.js'); return vm.runInContext('ADS_COURSE', c); })();
const FIG = (() => { const c = vm.createContext({}); run(c, 'assets/js/ads/figures.js'); return vm.runInContext('ADS_FIG', c); })();
const { MODULES } = await import(rel('tools_bai_index.mjs'));

/* app.js trong vm, localStorage giả — như một trình duyệt mới tinh. */
function appWithStore(init = {}) {
  const store = { ...init };
  const ctx = vm.createContext({ console, setTimeout, clearTimeout, navigator: {}, location: { search: '', pathname: '/bai.html' },
    localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } } });
  ctx.window = ctx;
  ctx.document = { querySelectorAll: () => [], getElementById: () => null, querySelector: () => null, addEventListener() {}, body: { classList: { add() {}, remove() {} } } };
  for (const f of ['lessons', 'principles', 'curriculum', 'drills', 'exams', 'bai-index']) run(ctx, `assets/js/data/${f}.js`);
  run(ctx, 'assets/js/app.js');
  return { ctx, store, ev: (e) => vm.runInContext(e, ctx) };
}

test('đăng ký: 11 module qc, step "ads", nằm đúng chặng s7 theo đúng thứ tự, s7 là chặng chuyên đề', () => {
  const { get } = loadContent();
  assert.equal(get('STEP_STAGE.ads'), 's7');
  const mods = get('BAI_MODS').filter((m) => m.id.startsWith('qc'));
  assert.deepEqual([...mods.map((m) => m.id)], QC);
  mods.forEach((m) => assert.equal(m.step, 'ads', m.id));
  const s7 = get('STAGES').find((s) => s.id === 's7');
  assert.ok(s7 && s7.elective === true, 's7 phải có elective:true');
  assert.deepEqual([...s7.mods.map((m) => m.id)], QC);
  for (const st of get('STAGES').filter((s) => s.id !== 's7'))
    assert.ok(!st.mods.some((m) => m.id.startsWith('qc')), `module qc lọt vào ${st.id}`);
});

test('đăng ký: số bài mỗi module khớp kế hoạch (MODULES.n), mã liên tục, mọi dòng mục lục có nội dung', () => {
  const { get } = loadContent();
  const idx = get('BAI_INDEX'), BAI = get('BAI');
  for (const id of QC) {
    const plan = MODULES.find((m) => m.id === id), rows = idx.filter((r) => r.mod === id);
    assert.ok(plan, `${id} thiếu trong tools_bai_index.mjs MODULES`);
    assert.equal(rows.length, plan.n, `${id}: ${rows.length} bài, kế hoạch ${plan.n}`);
    rows.forEach((r, i) => { assert.equal(r.id, `B:${id}-${String(i + 1).padStart(2, '0')}`); assert.ok(BAI[r.id], `${r.id} không có nội dung`); });
  }
  assert.equal(idx.filter((r) => r.mod.startsWith('qc')).length, MODULES.filter((m) => m.id.startsWith('qc')).reduce((s, m) => s + m.n, 0));
});

test('hồi quy: chặng s1–s6 giữ nguyên số bài và pool đề thi (khoá mới không đụng cổng mở khoá của khoá khác)', () => {
  const { get } = loadContent();
  /* Số chụp từ HEAD trước khi thêm khoá (2026-10-24). Đổi số này chỉ khi cố ý sửa chương trình chính. */
  const LESSONS = { s1: 77, s2: 168, s3: 106, s4: 139, s5: 220, s6: 50 };
  const POOL = { s1: 534, s2: 1131, s3: 703, s4: 951, s5: 1513, s6: 350 };
  for (const st of get('STAGES').filter((s) => s.id !== 's7'))
    assert.equal(st.mods.flatMap((m) => m.lessons).length, LESSONS[st.id], `số bài ${st.id}`);
  const pool = {}; get('EXAM_ITEMS').forEach((x) => { pool[x.stage] = (pool[x.stage] || 0) + 1; });
  for (const s of Object.keys(POOL)) assert.equal(pool[s], POOL[s], `pool đề ${s}`);
  assert.ok(!get('EXAMS.s7'), 's7 không có đề thi chặng');
});

test('tiến độ: người mới mở được mọi bài qc, cổng s2–s6 vẫn khoá như cũ', () => {
  const { ev } = appWithStore();
  assert.equal(ev("stageOpen('s7')"), true);
  assert.equal(ev("ALL.filter(x=>x.stage.id==='s7').every(x=>lessonOpen(x.key))"), true);
  for (const s of ['s2', 's3', 's4', 's5', 's6']) assert.equal(ev(`stageOpen('${s}')`), false, `${s} không được tự mở`);
});

test('tiến độ: hoàn thành bài qc ghi vào thmc.v1 (done + lessons), đọc lại được sau khi tải lại trang', () => {
  const a = appWithStore();
  a.ev("completeLesson('B:qc01-01', 4, 5)");
  const saved = JSON.parse(a.store['thmc.v1']);
  assert.ok(saved.done['B:qc01-01'], 'không ghi done');
  assert.equal(saved.lessons['B:qc01-01'].state, 'passed');
  const b = appWithStore({ 'thmc.v1': a.store['thmc.v1'] });
  assert.equal(b.ev("!!S.get().done['B:qc01-01']"), true);
  assert.equal(b.ev("pathLessons('ads').find(k=>!S.get().done[k])"), 'B:qc01-02');
});

test('điều hướng: thứ tự trong ALL là qc01-01 → … → qc11-cuối, bài cuối mỗi module nối sang bài đầu module sau', () => {
  const { ev } = appWithStore();
  const keys = ev("ALL.filter(x=>x.stage.id==='s7').map(x=>x.key)");
  const want = loadLessons().filter((l) => l.mod.startsWith('qc')).sort((x, y) => x.id < y.id ? -1 : 1).map((l) => l.id);
  assert.deepEqual([...keys], want);
  /* bai.html: bài kế = phần tử kế trong ALL */
  const all = ev('ALL.map(x=>x.key)');
  for (let i = 0; i < QC.length - 1; i++) {
    const last = want.filter((k) => k.startsWith(`B:${QC[i]}-`)).pop();
    assert.equal(all[all.indexOf(last) + 1], `B:${QC[i + 1]}-01`, `sau ${last}`);
  }
  assert.deepEqual([...ev("pathLessons('ads')")], want, 'lộ trình ads = đúng thứ tự khoá');
});

test('chuẩn 6 phần: mỗi module nền tảng phủ đủ fit/account/setup/levers/example/diagnose, có bài từng bước và nguồn', () => {
  const L = loadLessons(), need = COURSE.aspects.map((a) => a.k);
  for (const id of COURSE.platform) {
    const ls = L.filter((l) => l.mod === id), cov = new Set(ls.flatMap((l) => l.cover || []));
    for (const k of need) assert.ok(cov.has(k), `${id} thiếu khía cạnh "${k}"`);
    assert.ok(ls.some((l) => (l.how || []).length >= 4), `${id} chưa có bài "Làm từng bước" (≥4 bước)`);
    assert.ok(ls.some((l) => (l.src || []).length), `${id} chưa có nguồn chính thức`);
  }
});

test('trường mới hợp lệ: fig có thật, src có https + ngày + trạng thái, rel trỏ bài có thật, số liệu giả định có nhãn', () => {
  const { get } = loadContent(), idx = new Set(get('BAI_INDEX').map((r) => r.id));
  for (const l of loadLessons().filter((x) => x.mod.startsWith('qc'))) {
    if (l.fig) assert.ok(FIG[l.fig], `${l.id}: sơ đồ "${l.fig}" không tồn tại`);
    for (const s of l.src || []) {
      assert.match(s.u, /^https:\/\//, `${l.id}: nguồn thiếu https`);
      assert.match(s.d, /^\d{4}-\d{2}-\d{2}$/, `${l.id}: nguồn thiếu ngày kiểm`);
      assert.ok(['doc', 'tim', 'chua'].includes(s.st), `${l.id}: trạng thái nguồn lạ "${s.st}"`);
      assert.ok(s.t && s.t.length > 3, `${l.id}: nguồn thiếu tên`);
    }
    for (const k of l.rel || []) assert.ok(idx.has(k), `${l.id}: rel ${k} không có`);
    for (const st of l.how || []) assert.ok(st.t && st.d, `${l.id}: bước thiếu t/d`);
    assert.equal(l.steps, undefined, `${l.id}: dùng "how" cho từng bước — "steps" bị tools_strip_answers gỡ khỏi bản deploy`);
    for (const c of l.cover || []) assert.ok(COURSE.aspects.some((a) => a.k === c), `${l.id}: cover lạ "${c}"`);
    const txt = String(l.example || '').replace(/<[^>]+>/g, '');
    if (/\d[\d.,]*\s*(đ|triệu|nghìn|%|đơn|lead|click)/.test(txt)) assert.ok(l.assume === true || (l.src || []).length, `${l.id}: ví dụ có số liệu nhưng không có nhãn assume:true và cũng không có nguồn`);
  }
});

test('quiz: đáp án đúng rải đều vị trí, không lộ theo độ dài, câu tính có đáp án và bước giải', () => {
  const L = loadLessons().filter((x) => x.mod.startsWith('qc'));
  const mcq = L.flatMap((l) => l.q.filter((q) => q.type === 'mcq'));
  const pos = { a: 0, b: 0, c: 0, d: 0 }; mcq.forEach((q) => pos[q.answer]++);
  for (const k of Object.keys(pos)) assert.ok(pos[k] / mcq.length <= 0.4, `đáp án dồn vào ${k}: ${JSON.stringify(pos)}`);
  const plain = (s) => String(s).replace(/<[^>]+>/g, '').trim();
  const longest = mcq.filter((q) => { const r = plain(q.options.find((o) => o.k === q.answer).t).length;
    return r > Math.max(...q.options.filter((o) => o.k !== q.answer).map((o) => plain(o.t).length)); }).length;
  assert.ok(longest / mcq.length <= 0.35, `đáp án đúng là phương án dài nhất ở ${Math.round(longest / mcq.length * 100)}% câu`);
  for (const l of L) {
    assert.equal(l.q.length, 7, l.id);
    for (const q of l.q.filter((x) => x.type === 'calc')) {
      assert.ok(Number.isFinite(q.ans) && q.steps.length && q.wrong.length, `${l.id}: câu tính thiếu ans/steps/wrong`);
      for (const [v] of q.wrong) assert.ok(Math.abs(v - q.ans) > (q.tol || 0.01), `${l.id}: đáp án sai trùng đáp án đúng`);
    }
  }
});

test('trang khoá: mọi link nội bộ trỏ tới file có thật; nguồn trong dữ liệu khoá có trạng thái hợp lệ', () => {
  for (const f of ['quang-cao.html', 'quang-cao-case.html', 'quang-cao-capstone.html', 'assets/js/ads/figures.js', 'assets/js/ads/case-eval.js', 'assets/js/ads/case-ui.js', 'assets/js/ads/plan-eval.js'])
    assert.ok(fs.existsSync(rel(f)), `thiếu ${f}`);
  for (const p of COURSE.practice) if (p.u && !/^https?:/.test(p.u)) assert.ok(fs.existsSync(rel(p.u)), `practice trỏ tới ${p.u}`);
  for (const g of COURSE.sources) for (const [, u, st] of g.items) { assert.ok(['doc', 'tim', 'chua'].includes(st)); if (st !== 'chua') assert.match(u, /^https:\/\//); }
  const { get } = loadContent(), idx = new Set(get('BAI_INDEX').map((r) => r.id));
  for (const k of COURSE.prereq) assert.ok(idx.has(k), `bài ôn nền ${k} không có`);
  const appHtml = fs.readFileSync(rel('app.html'), 'utf8');
  assert.match(appHtml, /'quang-cao\.html'/, 'thanh bên chưa có trang khoá');
  /* bai.html chỉ nạp sơ đồ cho bài qc */
  assert.match(fs.readFileSync(rel('bai.html'), 'utf8'), /\^qc\/\.test\(m\[1\]\).*figures\.js/);
});
