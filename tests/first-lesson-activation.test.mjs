/* Giữ các điểm chính của "First Lesson Activation" khỏi bị hoàn tác nhầm.
   bai.html là trang dựng bằng JS nên kiểm ở mức mã nguồn: thứ tự, điều kiện mở quiz, xử lý lỗi /complete, nháp. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../bai.html', import.meta.url), 'utf8');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');

test('bai.html: script inline hợp lệ cú pháp', () => { assert.doesNotThrow(() => new Function(script)); });

test('quiz mở sau câu giữa bài, không còn bị Đổ não chặn', () => {
  assert.match(script, /const quizOpen=\(s=S\.get\(\)\)=>!PLAN\.cp\|\|cpDone\(s\)\|\|!!lessonState\(key,s\)/);
  assert.match(script, /opened=quizOpen\(s\)/);
  assert.doesNotMatch(script, /opened=!!\(s\.recall/);                       // điều kiện cũ: mở sau recall
  assert.doesNotMatch(script, /mở sau phần <a data-goto="recall">/);          // ghi chú khoá cũ
  const open = script.slice(script.indexOf('const openSummary'), script.indexOf("document.getElementById('rDone')"));
  assert.doesNotMatch(open, /quizBox|qLockNote|noQuizDone/);                  // recall không mở/đóng quiz nữa
});

test('quiz nằm ngay sau phần học trên màn hẹp, trước Góp ý/Case/Sổ tay; vẫn đủ 5 câu', () => {
  assert.match(script, /id="quizSlotM"/);
  assert.match(script, /id="quizSlotD">\$\{quizPart\(\)\}/);
  const body = script.slice(script.indexOf('function bodyHTML'), script.indexOf('function sideHTML'));
  const at = (s) => body.indexOf(s);
  assert.ok(at('quizSlotM') > at('id="read2"') && at('quizSlotM') < at("sec('drill'"), 'slot quiz sau nội dung chính, trước Luyện tập');
  assert.ok(at("sec('recall'") > at('quizSlotM'), 'Ôn lại nằm sau quiz');
  assert.ok(at("sec('rate'") > at("sec('recall'") && at("sec('case'") > at("sec('rate'") && at("sec('review'") > at("sec('case'"));
  assert.match(script, /const QUIZ_TARGET=5;/);
  const server = fs.readFileSync(new URL('../api/src/learn.js', import.meta.url), 'utf8');
  assert.match(server, /answered\.length < Math\.min\(5, ids\.length\)/);   // server vẫn đòi tối thiểu 5 câu
});

test('thanh CTA cố định + 3 bước Học/Thực hành/Hoàn thành', () => {
  for (const id of ['lpCta', 'ctaBtn', 'ctaTxt', 'lpSteps', 'stLearn', 'stDo', 'stDone']) assert.ok(script.includes(`id="${id}"`), id);
  assert.match(html, /@media\(max-width:1020px\)\{[\s\S]*?\.lp-cta\{display:block;position:fixed/);
  assert.match(html, /\.lp-cta\{display:none\}/);                                // desktop không hiện
  assert.match(html, /\.lp-grid\{padding-bottom:calc\(104px/);                  // chừa chỗ, không che nội dung
  for (const t of ['Học', 'Thực hành', 'Hoàn thành']) assert.ok(script.includes(`<b>${t}</b>`), t);
});

test('lỗi /complete không bị nuốt; có báo, thử lại, nhớ để thử lại', () => {
  assert.doesNotMatch(script, /\/complete'[^\n]*\.catch\(\(\)=>\{\}\)/);
  assert.match(script, /async function syncComplete/);
  assert.match(script, /function showSyncBanner/);
  assert.match(script, /id="qSyncRetry"/);
  assert.match(script, /pend:\{/);
  assert.match(script, /retryPending\(\)/);
  assert.match(script, /if\(!sync\.ok\) showSyncBanner\(sync\.err\)/);
});

test('nháp quiz: lưu khi chọn, khôi phục khi vào lại, xoá khi nộp', () => {
  assert.match(script, /function saveDraft/);
  assert.match(script, /function restoreDraft/);
  assert.match(script, /function clearDraft/);
  assert.equal((script.match(/saveDraft\(\);/g) || []).length >= 2, true);   // trắc nghiệm + điền số
  assert.match(script, /clearDraft\(\); const sync=await syncComplete\(\)/);
});

test('đo từng bước bằng /api/track có sẵn, mỗi sự kiện một lần, không đổi schema', () => {
  assert.match(script, /function evt\(kind\)/);
  assert.match(script, /fetch\('\/api\/track'/);
  for (const k of ['lesson_open', 'gate_done', 'quiz_view', 'quiz_submit', 'lesson_done', 'sync_error']) assert.ok(script.includes(`'${k}'`) || script.includes(k), k);
  for (const k of ['lesson_open', 'gate_done', 'quiz_view', 'quiz_submit', 'lesson_done', 'sync_error']) assert.match(k, /^[a-z_]{2,30}$/);   // đúng luật ở api/src/social.js
  const server = fs.readFileSync(new URL('../api/src/social.js', import.meta.url), 'utf8');
  assert.match(server, /\^\[a-z_\]\{2,30\}\$/);
});
