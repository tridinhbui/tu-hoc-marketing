/* Dùng chung cho các test: nạp dữ liệu nội dung và script trình duyệt vào một vm, không cần trình duyệt. */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const rel = (p) => path.join(ROOT, p);

/* Nạp toàn bộ dữ liệu bài học như trang bai.html thấy: lessons, principles, curriculum, bai-index, drills,
   cases, exam-items, exams + mọi file bai/<mã>.js. Trả về { get(expr), ctx }. */
export function loadContent({ withBai = true } = {}) {
  const ctx = vm.createContext({ console });
  const run = (file) => vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
  const D = rel('assets/js/data');
  for (const f of ['lessons', 'principles', 'curriculum', 'drills', 'cases', 'campaigns', 'campaigns-deep', 'brands', 'taste', 'exam-items', 'exams', 'bai-index']) run(`${D}/${f}.js`);
  if (withBai) for (const f of fs.readdirSync(`${D}/bai`).filter((x) => x.endsWith('.js')).sort()) run(`${D}/bai/${f}`);
  const get = (expr) => vm.runInContext(`(typeof ${expr.split(/[.\[]/)[0]} !== 'undefined') ? (${expr}) : undefined`, ctx);
  return { ctx, get };
}

/* Nạp assets/js/exam.js (+ exams.js) trong vm với các stub tối thiểu; trả về ctx để gọi hàm. */
export function loadExamEngine(extra = {}) {
  const ctx = vm.createContext({ console, ...extra });
  const run = (file) => vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
  run(rel('assets/js/data/exams.js'));
  run(rel('assets/js/exam.js'));
  return ctx;
}

/* Tách mọi bài mới ra danh sách phẳng { id, mod, q:[...] , ...lesson }. */
export function loadLessons() {
  const out = [];
  const ctx = vm.createContext({ console, BAI_ADD: (p) => p.lessons.forEach((l) => out.push({ mod: p.mod, ...l })) });
  const dir = rel('assets/js/data/bai');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort())
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
  return out;
}
