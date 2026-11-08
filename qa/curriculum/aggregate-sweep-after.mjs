/* So điểm trước (baseline) và sau (chấm mù đợt sửa P1) cho mẫu 102 bài → qa/curriculum/SWEEP-BEFORE-AFTER.md */
import fs from 'node:fs';
const B = JSON.parse(fs.readFileSync('qa/curriculum/baseline.json', 'utf8'));
const DIMS = ['accuracy', 'depth', 'practical', 'examples', 'pedagogy', 'assessment', 'data', 'clarity'];
const rows = [];
for (let g = 1; g <= 5; g++) {
  const f = `qa/curriculum/scores/sweep-after-G${g}.json`; if (!fs.existsSync(f)) { console.error('thiếu', f); continue; }
  for (const l of JSON.parse(fs.readFileSync(f, 'utf8')).lessons) {
    const base = B.lessons.find((x) => x.id === l.id)?.fresh; if (!base) continue;
    const tot = DIMS.reduce((s, d) => s + (+l.scores[d] || 0), 0);
    const sev = (arr, s) => (arr || []).filter((d) => d.sev === s).length;
    rows.push({ id: l.id, mod: l.id.slice(2, 6), before: base.total, after: tot, p0b: sev(base.defects, 'P0'), p1b: sev(base.defects, 'P1'), p0a: sev(l.defects, 'P0'), p1a: sev(l.defects, 'P1'), dimsB: base.scores, dimsA: l.scores, defectsA: (l.defects || []).filter((d) => d.sev !== 'P2') });
  }
}
const n = rows.length, mean = (k) => (rows.reduce((a, r) => a + r[k], 0) / n).toFixed(1), sum = (k) => rows.reduce((a, r) => a + r[k], 0);
let md = `# Trước và sau — đợt sửa lỗi P1 (mẫu chấm mù ${n} bài)\n\n*Mẫu phân tầng 25% trong ${JSON.parse(fs.readFileSync('qa/curriculum/reaudit-sample.json', 'utf8')).totalFixedLessons} bài đã sửa, ≥1 bài mỗi module. Trước: baseline 11/2026. Sau: 5 người chấm độc lập, chấm mù (không xem điểm trước, worklist hay nhật ký sửa).*\n\n`;
md += `| Chỉ số | Trước | Sau |\n|---|---:|---:|\n| Điểm trung bình | ${mean('before')} | ${mean('after')} |\n| Bài ≥ 85 | ${rows.filter((r) => r.before >= 85).length} | ${rows.filter((r) => r.after >= 85).length} |\n| Bài < 60 | ${rows.filter((r) => r.before < 60).length} | ${rows.filter((r) => r.after < 60).length} |\n| Lỗi P0 | ${sum('p0b')} | ${sum('p0a')} |\n| Lỗi P1 | ${sum('p1b')} | ${sum('p1a')} |\n| Bài điểm giảm | — | ${rows.filter((r) => r.after < r.before).length} |\n\n`;
md += `## Theo chiều (TB)\n\n| Chiều | Trước | Sau |\n|---|---:|---:|\n` + DIMS.map((d) => `| ${d} | ${(rows.reduce((a, r) => a + (+r.dimsB[d] || 0), 0) / n).toFixed(1)} | ${(rows.reduce((a, r) => a + (+r.dimsA[d] || 0), 0) / n).toFixed(1)} |`).join('\n') + '\n\n';
md += `## Theo bài\n\n| Bài | Trước | Sau | Δ | P1 trước → sau |\n|---|---:|---:|---:|---|\n` + rows.sort((a, b) => (a.after - a.before) - (b.after - b.before)).map((r) => `| ${r.id} | ${r.before} | ${r.after} | ${r.after - r.before > 0 ? '+' : ''}${r.after - r.before} | ${r.p1b} → ${r.p1a} |`).join('\n') + '\n\n';
const rem = rows.flatMap((r) => r.defectsA.map((d) => ({ id: r.id, ...d })));
md += `## Lỗi P0/P1 còn lại sau chấm mù (${rem.length})\n\n` + rem.map((d) => `- **${d.id}** (${d.sev}, ${d.where}): ${String(d.issue).slice(0, 240)}${String(d.issue).length > 240 ? '…' : ''}`).join('\n') + '\n';
fs.writeFileSync('qa/curriculum/SWEEP-BEFORE-AFTER.md', md);
console.log(`n=${n} TB ${mean('before')} → ${mean('after')} · P0 ${sum('p0b')}→${sum('p0a')} · P1 ${sum('p1b')}→${sum('p1a')} · giảm điểm ${rows.filter((r) => r.after < r.before).length}`);
