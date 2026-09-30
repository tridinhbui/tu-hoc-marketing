/* Bỏ đáp án và lời giải khỏi các file câu hỏi trong dist/ trước khi deploy.
   Trình duyệt chỉ còn thân câu và phương án; chấm do server (POST /api/answers) — xem gradeAsync trong exam.js.
   Bản trên máy (thư mục gốc) giữ nguyên đáp án để chạy thử không cần server và để api/tools/build-bank.mjs đọc.
   Chạy: node tools_strip_answers.mjs [thư mục dist]   (tools_build.mjs gọi sau khi gói dist) */
import fs from 'fs';
import vm from 'vm';

const DIST = process.argv[2] || 'dist';
const SECRET = ['answer', 'why', 'ans', 'tol', 'wrong', 'errors', 'steps'];
const strip = (it) => Object.fromEntries(Object.entries(it).filter(([k]) => !SECRET.includes(k)));
const HEAD = '/* Bản xuất bản: đã bỏ đáp án và lời giải — server chấm. Nguồn đầy đủ nằm trong repo. */\n';

let items = 0, files = 0;

/* 1. Ngân hàng đề chặng */
const EX = `${DIST}/assets/js/data/exam-items.js`;
if (fs.existsSync(EX)) {
  const ctx = vm.createContext({});
  vm.runInContext(fs.readFileSync(EX, 'utf8') + '\n;globalThis.__X = EXAM_ITEMS;', ctx);
  const list = ctx.__X.map(strip); items += list.length; files++;
  fs.writeFileSync(EX, HEAD + `const EXAM_ITEMS = ${JSON.stringify(list)};\n` +
    `const EXAM_POOL = (stage) => EXAM_ITEMS.filter(x => x.stage === stage);\n`);
}

/* 2. Câu hỏi trong bài mới (mỗi module một file) */
const BD = `${DIST}/assets/js/data/bai`;
if (fs.existsSync(BD)) for (const f of fs.readdirSync(BD).filter((x) => x.endsWith('.js'))) {
  let pack = null;
  vm.runInContext(fs.readFileSync(`${BD}/${f}`, 'utf8'), vm.createContext({ BAI_ADD: (p) => { pack = p; } }));
  if (!pack) throw new Error(`${f}: không gọi BAI_ADD`);
  pack.lessons.forEach((l) => { l.q = (l.q || []).map(strip); items += l.q.length; });
  fs.writeFileSync(`${BD}/${f}`, HEAD + `BAI_ADD(${JSON.stringify(pack)});\n`); files++;
}

/* 3. Kiểm lại: không file nào trong dist còn trường đáp án */
const leak = [];
const scan = (p) => { for (const e of fs.readdirSync(p, { withFileTypes: true })) {
  const q = `${p}/${e.name}`;
  if (e.isDirectory()) scan(q);
  else if (/exam-items\.js$|\/bai\/[^/]+\.js$/.test(q) && /["']?(answer|why)["']?\s*:/.test(fs.readFileSync(q, 'utf8'))) leak.push(q);
} };
scan(`${DIST}/assets/js/data`);
if (leak.length) { console.error('CÒN ĐÁP ÁN TRONG:', leak.join(', ')); process.exit(1); }
console.log(`đã bỏ đáp án: ${items} câu trong ${files} file`);
