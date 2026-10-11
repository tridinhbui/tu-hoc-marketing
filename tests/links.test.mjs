/* Mọi liên kết nội bộ tới trang .html phải trỏ vào file có thật — bắt lỗi trang mồ côi / link gãy sau mỗi lần đổi tên. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ROOT, rel } from './helpers.mjs';

const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !/^tools_/.test(f));
const exists = (f) => fs.existsSync(rel(f));
const SKIP = new Set(['case', 'thuong-hieu']); // thư mục sinh bởi tools_build.mjs

test('href/location trỏ tới .html trong cùng thư mục đều tồn tại', () => {
  const broken = [];
  const files = [...pages, ...fs.readdirSync(rel('assets/js')).filter((f) => f.endsWith('.js')).map((f) => 'assets/js/' + f)];
  for (const f of files) {
    const src = fs.readFileSync(rel(f), 'utf8');
    for (const m of src.matchAll(/(?:href=|location(?:\.href)?\s*=\s*|replace\()\s*["'`]\/?([a-z0-9-]+\.html)(?:[?#"'`])/gi)) {
      const t = m[1];
      if (!exists(t)) broken.push(`${f} → ${t}`);
    }
  }
  assert.deepEqual([...new Set(broken)], []);
});

test('mọi mục sidebar trỏ tới file có thật', () => {
  const app = fs.readFileSync(rel('app.html'), 'utf8');
  const missing = [...app.matchAll(/\['[^']+',\s*'([a-z0-9-]+\.html)'/g)].map((m) => m[1]).filter((f) => !exists(f));
  assert.deepEqual(missing, []);
});

test('mỗi trang tham chiếu tới script/css cục bộ có thật', () => {
  const missing = [];
  for (const f of pages) {
    const src = fs.readFileSync(rel(f), 'utf8');
    for (const m of src.matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^"]*)?"/g)) if (!/['+]/.test(m[1]) && !exists(m[1])) missing.push(`${f} → ${m[1]}`);
  }
  assert.deepEqual([...new Set(missing)], []);
});
