/* Đáp án không được nằm trong gói công khai. Chạy bộ gỡ đáp án trên bản sao dữ liệu rồi quét lại. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

test('tools_strip_answers: sau khi gỡ, exam-items.js và bai/*.js không còn answer/why/ans/steps', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'strip-'));
  fs.cpSync(path.join(root, 'assets/js/data'), path.join(tmp, 'assets/js/data'), { recursive: true });
  execFileSync(process.execPath, [path.join(root, 'tools_strip_answers.mjs'), tmp], { cwd: root, stdio: 'pipe' });
  const files = [path.join(tmp, 'assets/js/data/exam-items.js'),
    ...fs.readdirSync(path.join(tmp, 'assets/js/data/bai')).filter((f) => f.endsWith('.js')).map((f) => path.join(tmp, 'assets/js/data/bai', f))];
  const bad = files.filter((f) => /["']?(answer|why|steps|wrong|errors|tol)["']?\s*:/.test(fs.readFileSync(f, 'utf8')));
  assert.deepEqual(bad, []);
  assert.ok(files.length > 50);
});

test('build mặc định gỡ đáp án (không cần cờ), chỉ KEEP_ANSWERS=1 mới giữ', () => {
  const src = fs.readFileSync(path.join(root, 'tools_build.mjs'), 'utf8');
  assert.match(src, /KEEP_ANSWERS === '1'/);
  assert.doesNotMatch(src, /STRIP_ANSWERS === '1'\)\s*\n\s*import/);
});
