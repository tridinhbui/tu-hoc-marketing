/* Sinh api/src/generated/xp-refs.json: danh sách tham chiếu hợp lệ cho XP tự khai (id case).
   Chạy cùng build-bank (npm run deploy). Có test đối chiếu (test/xp-trust.test.mjs) nên bản cũ sẽ bị bắt. */
import fs from 'fs'; import vm from 'vm'; import path from 'path'; import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/data/cases.js'), 'utf8') + '\n;globalThis.__C = CASES.map(c => c.id);', ctx);
const out = { cases: [...ctx.__C].sort() };
fs.mkdirSync(path.join(root, 'api/src/generated'), { recursive: true });
fs.writeFileSync(path.join(root, 'api/src/generated/xp-refs.json'), JSON.stringify(out, null, 1) + '\n');
console.log('xp-refs: cases', out.cases.length);
