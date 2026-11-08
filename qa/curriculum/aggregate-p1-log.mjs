/* Gộp nhật ký đợt sửa P1: qa/curriculum/p1-log/*.json ↔ worklist → thống kê fixed/rejected/needs-human, khoá đáp án đổi, mục thiếu log.
   Chạy: node qa/curriculum/aggregate-p1-log.mjs  → in bảng + ghi qa/curriculum/p1-summary.json */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const Q = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const WL = path.join(Q, 'p1-worklist'), LG = path.join(Q, 'p1-log');
const out = { mods: {}, totals: { worklist: 0, logged: 0, fixed: 0, rejected: 0, 'needs-human': 0, key_changed: 0, missing_log: 0 }, key_changes: [], needs_human: [], missing: [] };
for (const f of fs.readdirSync(WL).filter((x) => x.endsWith('.json')).sort()) {
  const mod = f.slice(0, -5), wl = JSON.parse(fs.readFileSync(path.join(WL, f), 'utf8'));
  const want = wl.lessons.reduce((a, l) => a + l.defects.length, 0);
  const m = { worklist: want, logged: 0, fixed: 0, rejected: 0, 'needs-human': 0, key_changed: 0, validator: null, tests: null };
  const lf = path.join(LG, f);
  if (fs.existsSync(lf)) {
    let j; try { j = JSON.parse(fs.readFileSync(lf, 'utf8')); } catch (e) { out.missing.push(`${mod}: log JSON lỗi`); }
    if (j) { m.validator = j.validator; m.tests = j.tests;
      for (const it of j.items || []) { m.logged++; const st = ['fixed', 'rejected', 'needs-human'].includes(it.status) ? it.status : 'needs-human'; m[st]++;
        if (it.key_changed) { m.key_changed++; out.key_changes.push({ mod, id: it.id, where: it.where, change: it.change }); }
        if (st === 'needs-human') out.needs_human.push({ mod, id: it.id, where: it.where, note: it.note || it.change }); } }
  } else { out.missing.push(mod); out.totals.missing_log++; }
  out.mods[mod] = m;
  for (const k of ['worklist', 'logged', 'fixed', 'rejected', 'needs-human', 'key_changed']) out.totals[k] += m[k];
}
fs.writeFileSync(path.join(Q, 'p1-summary.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.totals));
console.log('module chưa có log:', out.missing.join(' ') || 'không');
console.log('khoá đáp án đổi:', out.key_changes.length, out.key_changes.map((k) => k.id + ' ' + k.where).join(' | '));
