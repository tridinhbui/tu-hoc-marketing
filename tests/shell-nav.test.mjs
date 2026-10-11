/* Một thanh điều hướng duy nhất. Lỗi đã từng xảy ra: hoc.html, quiz.html, index.html mỗi trang tự dựng một header
   khác (dash-nav / room-nav / hd-universe) với mục và chiều cao khác nhau → bấm sang trang là thanh nav "nhảy". */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ROOT, rel } from './helpers.mjs';

const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !/^tools_/.test(f));
const read = (f) => fs.readFileSync(rel(f), 'utf8');
const LEGACY_HEADERS = /<header class="(dash-nav|room-nav|hd-universe)"/;

test('không trang nào tự dựng header riêng (dash-nav, room-nav, hd-universe)', () => {
  const bad = pages.filter((f) => LEGACY_HEADERS.test(read(f)));
  assert.deepEqual(bad, []);
});

test('thanh điều hướng dọc nằm ở app.html, cố định bên phải, nạp trang vào khung', () => {
  const html = read('app.html');
  assert.match(html, /<aside class="rail"/);
  assert.match(html, /<iframe id="frame"/);
  assert.match(html, /grid-template-columns:minmax\(0,1fr\) var\(--side-w\)/, 'thanh dọc phải ở cột bên phải');
  assert.match(html, /e\.preventDefault\(\);[\s\S]*loadInto\(href\)/, 'bấm mục chỉ đổi khung, không điều hướng cả trang');
  assert.match(html, /const SAFE = /, 'tham số p phải qua danh sách trắng (chống open-redirect)');
});

test('trang học chạy trong khung: appShell không dựng header/footer và đưa trang mở lẻ vào khung', () => {
  const js = fs.readFileSync(rel('assets/js/app.js'), 'utf8');
  assert.match(js, /const framed=window\.top!==window\.self/);
  assert.match(js, /location\.replace\('app\.html\?p='/);
  /* chỉ landing và đăng nhập tự mang header; mọi trang khác không được dựng chỗ giữ cho header (padding-top) */
  const withShellClass = pages.filter((f) => /<html[^>]*class="[^"]*has-shell/.test(read(f))).sort();
  assert.deepEqual(withShellClass, ['dang-nhap.html', 'index.html']);
});

test('landing và đăng nhập tự thoát khỏi khung nếu bị nạp trong iframe', () => {
  for (const f of ['index.html', 'dang-nhap.html']) assert.match(read(f), /window\.top!==window\.self/, f);
});

test('thanh nav: fixed, chiều cao cố định, cùng độ đậm chữ ở mọi trạng thái, chừa thanh cuộn', () => {
  const css = fs.readFileSync(rel('assets/css/case.css'), 'utf8');
  assert.match(css, /\.studio-top\{[^}]*position:fixed/);
  assert.match(css, /\.studio-top\{[^}]*height:var\(--shell-h\)/);
  assert.match(css, /html\.has-shell body\{padding-top:var\(--shell-h\)\}/);
  assert.match(css, /html\.has-shell\{[^}]*overflow-y:scroll/);
  const active = css.match(/\.studio-nav a\.active[^{]*\{([^}]*)\}/)[1];
  assert.doesNotMatch(active, /font-weight/, 'mục đang chọn không được đổi độ đậm (làm đổi độ rộng, đẩy mục bên cạnh)');
});

test('chỉ dẫn về trang công khai: máy chủ và trình duyệt cùng một danh sách', () => {
  const server = fs.readFileSync(rel('api/src/index.js'), 'utf8').match(/OPEN_PAGES = new Set\(\[([^\]]*)\]/)[1];
  const client = fs.readFileSync(rel('assets/js/app.js'), 'utf8').match(/const OPEN=\[([^\]]*)\]/)[1];
  const names = (s) => [...s.matchAll(/'([^']*)'/g)].map((m) => m[1].replace(/\.html$/, '')).sort();
  assert.deepEqual(names(client), names(server));
});
