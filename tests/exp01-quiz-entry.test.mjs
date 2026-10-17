/* EXP-01 · lối vào quiz — phần trình duyệt: bộ phát sự kiện (learn-events.js) và logic mở khoá/cờ trong bai.html.
   Không cần trình duyệt: learn-events.js chạy trong vm với bộ nhớ/thời gian/mạng giả; logic trong bai.html được trích đúng dòng nguồn. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { rel } from './helpers.mjs';

const loadEvents = () => {
  const ctx = vm.createContext({ console, module: { exports: {} }, setTimeout, clearTimeout });
  vm.runInContext(fs.readFileSync(rel('assets/js/learn-events.js'), 'utf8'), ctx, { filename: 'learn-events.js' });
  return ctx.module.exports;
};
const LE = loadEvents();

let uuidN = 0;   // dùng chung giữa các rig để hai rig không sinh trùng id
function rig({ enabled = true, lesson = 'B:ob01-01', store = new Map(), failSend = 0 } = {}) {
  const clock = { t: 1_000_000 }, timers = [], sent = []; let fails = failSend;
  const storage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => { store.set(k, String(v)); } };
  const make = () => LE.create({ enabled, lesson, release: 'r1', device: 'mobile', storage, now: () => clock.t,
    uuid: () => `00000000-0000-4000-8000-${String(++uuidN).padStart(12, '0')}`,
    send: async (batch) => { if (fails > 0) { fails--; throw new Error('net'); } sent.push(JSON.parse(JSON.stringify(batch))); },
    setTimer: (f, ms) => { timers.push({ f, ms }); return timers.length; }, clearTimer: (i) => { if (timers[i - 1]) timers[i - 1].f = null; } });
  return { make, clock, timers, sent, store, runTimers: async () => { for (const t of timers.splice(0)) if (t.f) await t.f(); await Promise.resolve(); await Promise.resolve(); } };
}

test('tắt đo lường → no-op hoàn toàn: không ghi bộ nhớ, không hẹn giờ, không gửi', async () => {
  const r = rig({ enabled: false }); const ev = r.make();
  assert.equal(ev.enabled, false); assert.equal(ev.emit('quiz_started', {}), false);
  assert.equal(r.store.size, 0); assert.equal(r.timers.length, 0); assert.equal(r.sent.length, 0);
});

test('mỗi (lượt học, sự kiện) chỉ phát một lần', () => {
  const r = rig(); const ev = r.make();
  assert.equal(ev.emit('quiz_visible', { unlocked: true, answered: 0 }), true);
  assert.equal(ev.emit('quiz_visible', { unlocked: true, answered: 0 }), false);
  assert.equal(ev.emit('quiz_started', { n_items: 5, unlocked_by: 'checkpoint' }), true);
  assert.equal(ev.pending(), 2);
});

test('refresh trang bài giữ nguyên lsid và không phát lại sự kiện đã phát; sau 30 phút là lượt học mới', () => {
  const r = rig(); const a = r.make(); a.emit('lesson_opened', { mode: 'full' });
  r.clock.t += 60_000;                                       // "refresh" sau 1 phút
  const b = r.make();
  assert.equal(b.lsid, a.lsid);
  assert.equal(b.emit('lesson_opened', { mode: 'full' }), false);
  assert.equal(b.emit('quiz_visible', { unlocked: false, answered: 0 }), true);
  r.clock.t += 31 * 60_000;
  const c = r.make();
  assert.notEqual(c.lsid, a.lsid);
  assert.equal(c.emit('lesson_opened', { mode: 'full' }), true);
});

test('hai bài khác nhau không dùng chung lsid', () => {
  const store = new Map();
  const a = rig({ store, lesson: 'B:ob01-01' }).make(), b = rig({ store, lesson: 'B:ob01-02' }).make();
  assert.notEqual(a.lsid, b.lsid);
});

test('gom lô: gửi khi đủ 5 sự kiện hoặc sau 10 giây; không gửi từng sự kiện', async () => {
  const r = rig(); const ev = r.make();
  ev.emit('lesson_opened', {}); ev.emit('quiz_visible', {});
  assert.equal(r.sent.length, 0); assert.equal(r.timers.length, 1); assert.equal(r.timers[0].ms, 10000);
  await r.runTimers();
  assert.equal(r.sent.length, 1); assert.equal(r.sent[0].length, 2);
  ev.emit('quiz_started', {}); ev.emit('quiz_cta_clicked', {}); ev.emit('quiz_submitted', {});
  assert.equal(r.sent.length, 1);                            // mới 3 sự kiện mới
});

test('payload chỉ có khoá được phép: không email, không tên, không user_id, không nội dung gõ', async () => {
  const r = rig(); const ev = r.make();
  ev.emit('quiz_started', { n_items: 5, unlocked_by: 'checkpoint' }); ev.flush(); await Promise.resolve();
  const e = r.sent[0][0];
  assert.deepEqual(Object.keys(e).sort(), ['device_class', 'event', 'lesson_id', 'lsid', 'props', 'release']);
  assert.ok(!/@|user_id|email|name|text/i.test(JSON.stringify(e)));
});

test('sự kiện lạ và lesson_completed (của server) không phát được từ trình duyệt', () => {
  const ev = rig().make();
  assert.equal(ev.emit('lesson_completed', {}), false);
  assert.equal(ev.emit('bất_kỳ', {}), false);
  assert.deepEqual([...LE.ALLOWED].sort(), ['lesson_opened', 'quiz_cta_clicked', 'quiz_started', 'quiz_submitted', 'quiz_visible']);
});

test('lỗi mạng: thử lại đúng một lần rồi bỏ, không ném lỗi, không vòng lặp vô hạn', async () => {
  const r = rig({ failSend: 2 }); const ev = r.make();
  ev.emit('quiz_visible', {}); ev.flush();
  for (let i = 0; i < 6; i++) await r.runTimers();
  assert.equal(r.sent.length, 0);                            // cả hai lần đều lỗi → bỏ
  assert.equal(ev.pending(), 0);
  const r2 = rig({ failSend: 1 }); const e2 = r2.make();
  e2.emit('quiz_visible', {}); e2.flush();
  for (let i = 0; i < 6; i++) await r2.runTimers();
  assert.equal(r2.sent.length, 1);                           // lần hai thành công
});

test('bộ nhớ trình duyệt hỏng/đầy không làm hỏng việc học', () => {
  const ev = LE.create({ enabled: true, lesson: 'B:ob01-01', release: 'r1', device: 'mobile',
    storage: { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('full'); } },
    now: () => 1, uuid: () => '00000000-0000-4000-8000-000000000001', send: async () => {}, setTimer: () => 1, clearTimer: () => {} });
  assert.equal(ev.emit('quiz_visible', {}), true);
});

/* ---------- bai.html ---------- */
const html = fs.readFileSync(rel('bai.html'), 'utf8');
const lineOf = (re) => { const m = html.match(re); assert.ok(m, `không tìm thấy ${re}`); return m[0]; };

test('quizOpen: cờ TẮT = điều kiện cũ (phải nhớ lại hoặc đã có trạng thái); cờ BẬT = qua câu giữa bài hoặc bài không có câu giữa bài', () => {
  const src = lineOf(/const quizOpen=\(s=S\.get\(\)\)=>[^\n]+;/).replace(/^const quizOpen=/, '').replace(/;$/, '');
  const mk = (EXP, { recall, state, cp, hasCp }) => {
    const fn = new Function('EXP', 'S', 'key', 'PLAN', 'lessonState', 'cpDone', `return (${src});`);
    return fn(EXP, { get: () => ({ recall: recall ? { k: 'x' } : {} }) }, 'k', { cp: hasCp ? {} : null }, () => (state ? { state: 'learned' } : null), () => !!cp)();
  };
  const OFF = { quiz: false }, ON = { quiz: true };
  // cờ tắt: chỉ recall hoặc state mở quiz — checkpoint KHÔNG đủ
  assert.equal(mk(OFF, { hasCp: true, cp: true }), false);
  assert.equal(mk(OFF, { hasCp: false }), false);
  assert.equal(mk(OFF, { recall: true, hasCp: true }), true);
  assert.equal(mk(OFF, { state: true, hasCp: true }), true);
  // cờ bật: checkpoint đủ; không có checkpoint thì mở; chưa làm gì thì khoá
  assert.equal(mk(ON, { hasCp: true, cp: true }), true);
  assert.equal(mk(ON, { hasCp: true, cp: false }), false);
  assert.equal(mk(ON, { hasCp: false }), true);
  assert.equal(mk(ON, { recall: true, hasCp: true }), true);
});

test('cờ mặc định TẮT trong bai.html và mọi đường mới đều đi qua cờ', () => {
  assert.ok(html.includes('let EXP={quiz:false,pre:false,events:false,release:\'r0\',forced:false};'));
  assert.ok(html.includes('let EV={enabled:false,'));
  // render CTA, thẻ điều kiện, chữ đổ não, ngữ cảnh prediction đều có điều kiện EXP
  assert.ok(/\$\{EXP\.quiz&&nq\?`<div class="lp-qcta"/.test(html));
  assert.ok(html.includes("context:EXP.pre?'prediction':'practice'"));
  assert.ok(html.includes("const recallOptional=()=>EXP.quiz&&PLAN.quiz.length>0;"));
  assert.ok(html.includes("${EXP.quiz?'':'<li id=\"todoRead\">"));
});

test('đường cũ còn nguyên chữ khi cờ tắt (không phá luồng cũ)', () => {
  for (const s of ['Đọc hết 100% nội dung bài', 'Kiểm tra nhanh mở sau phần <a data-goto="recall">Đổ não 60 giây</a> — nhớ lại trước, kiểm tra sau.',
    "'Đổ não 60 giây'", 'Trước khi xem tóm tắt: viết lại ý chính của bài', "context:'practice'"])
    assert.ok(html.includes(s), `thiếu đường cũ: ${s}`);
});

test('bài không có quiz: nút Hoàn thành vẫn đòi đổ não/trạng thái bất kể cờ', () => {
  assert.ok(html.includes('openedByRecall=!!(s.recall||{})[key]||!!st'));
  assert.ok(html.includes('id="noQuizDone" ${openedByRecall?\'\':\'disabled\'}'));
});

test('KHÔNG đổi: quiz 5 câu, ngưỡng đạt 60%, XP, cách chấm và điều kiện hoàn thành', () => {
  assert.ok(html.includes('const QUIZ_TARGET=5;'));
  assert.ok(html.includes('quiz:q.slice(0,QUIZ_TARGET)'));
  const app = fs.readFileSync(rel('assets/js/app.js'), 'utf8');
  assert.ok(app.includes('const LESSON_PASS=0.6;'));
  assert.ok(app.includes("let state=(source!=='lesson'||score>=LESSON_PASS*100)?'passed':'learned';"));
  const api = fs.readFileSync(rel('api/src/learn.js'), 'utf8');
  assert.ok(api.includes("answered.length < Math.min(5, ids.length)"));
  assert.ok(api.includes("Number(cfg.lesson_pass_ratio || 0.6) * 100"));
  assert.ok(html.includes("api('/lessons/'+encodeURIComponent(key)+'/complete'"), 'nộp bài vẫn gọi /complete');
  assert.ok(html.includes('const rec=completeLesson(key,right,PLAN.quiz.length);'));
});

test('sự kiện: phát đúng chỗ và chỉ qua EV (no-op khi tắt); không gửi chữ người dùng hay đáp án', () => {
  for (const s of ["EV.emit('lesson_opened'", "EV.emit('quiz_visible'", "EV.emit('quiz_started'", "EV.emit('quiz_cta_clicked'", "EV.emit('quiz_submitted'"])
    assert.ok(html.includes(s), s);
  const emits = html.match(/EV\.emit\([^)]*\{[^}]*\}\)/g) || [];
  assert.ok(emits.length >= 5);
  for (const e of emits) assert.ok(!/rIn|tIn|ntIn|\.value|ANS\[|given|chosen/.test(e), `emit chứa dữ liệu người dùng: ${e}`);
  // lesson_completed do server ghi, không phát từ trình duyệt
  assert.ok(!html.includes("EV.emit('lesson_completed'"));
});

test('QA: ?exp_quiz_entry=1 chỉ có hiệu lực khi chạy cục bộ hoặc admin; phiên bị ép không phát sự kiện', () => {
  const body = html.slice(html.indexOf('async function loadExp()'), html.indexOf('const isFirstLesson'));
  assert.ok(body.includes("force==='1'&&(API.on!==true||(user&&user.is_admin))"));
  assert.ok(body.includes("force==='0'"));
  assert.ok(body.includes('events:!!fl.events&&!!user&&!forced'));
  assert.ok(body.includes('setTimeout(()=>r(undefined),1500)'), 'quá 1,5 giây → cờ tắt');
});

test('bai.html nạp learn-events.js và app.js bản mới (cache-bust)', () => {
  assert.ok(html.includes('assets/js/learn-events.js?v=1'));
  assert.ok(html.includes('assets/js/app.js?v=22'));
  assert.ok(fs.existsSync(rel('assets/js/learn-events.js')));
});

test('a11y: thanh CTA là <button> có aria-label cập nhật được, ẩn bằng [hidden] (rời khỏi thứ tự Tab), có focus-visible, cuộn tôn trọng reduced-motion', () => {
  assert.ok(/<button type="button" class="lp-qcta__btn" id="quizCtaBtn" aria-controls="quizPart">/.test(html));
  assert.ok(html.includes("setAttribute('aria-label','Kiểm tra nhanh, đã trả lời '"));
  assert.ok(html.includes('.lp-qcta[hidden]{display:none}'));
  assert.ok(html.includes('.lp-qcta__btn:focus-visible'));
  assert.ok(html.includes(':root[data-theme="ivory"] #app>.lp-qcta{animation:none}'), 'không dính hiệu ứng trồi chung của #app>*');
  assert.ok(html.includes("matchMedia('(prefers-reduced-motion: reduce)').matches"));
  assert.ok(html.includes('env(safe-area-inset-bottom'));
});
