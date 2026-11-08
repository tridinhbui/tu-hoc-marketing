/* Gộp điểm độc lập qa/curriculum/scores/*.json với inventory → qa/curriculum/baseline.json + bảng tóm tắt.
   Chạy: node qa/curriculum/aggregate-scores.mjs [--round=baseline|after] */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SD = path.join(ROOT, 'qa/curriculum/scores');
const inv = JSON.parse(fs.readFileSync(path.join(ROOT, 'qa/curriculum/inventory.json'), 'utf8'));
const byId = Object.fromEntries(inv.lessons.map((l) => [l.id, l]));
const DIMS = ['accuracy', 'depth', 'practical', 'examples', 'pedagogy', 'assessment', 'data', 'clarity'];
const MAX = { accuracy: 15, depth: 15, practical: 20, examples: 15, pedagogy: 10, assessment: 10, data: 10, clarity: 5 };
const files = fs.readdirSync(SD).filter((f) => /^(ob|kh|gt|tp|kn|tn|dl|tu|in|qc)\d\d\.json$|^legacy\.json$/.test(f)).sort();
const scored = {}, problems = [], modNotes = {};
for (const f of files) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(SD, f), 'utf8')); } catch (e) { problems.push(`${f}: JSON lỗi ${e.message}`); continue; }
  modNotes[j.mod] = j.module_notes || null;
  for (const l of j.lessons || []) {
    if (!byId[l.id]) { problems.push(`${f}: id lạ ${l.id}`); continue; }
    const sum = DIMS.reduce((a, d) => a + (+l.scores?.[d] || 0), 0);
    for (const d of DIMS) if (l.scores?.[d] > MAX[d]) problems.push(`${f}: ${l.id} ${d}=${l.scores[d]} > ${MAX[d]}`);
    if (l.total !== undefined && Math.abs(sum - l.total) > 0.5) problems.push(`${f}: ${l.id} total ${l.total} ≠ tổng chiều ${sum} (dùng tổng chiều)`);
    scored[l.id] = { ...l, total: sum, file: f };
  }
}
const mean = (a) => a.length ? +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1) : null;
const lessons = inv.lessons.map((l) => ({ id: l.id, kind: l.kind, mod: l.mod, step: l.step, stage: l.stage, title: l.title, skill: l.skill, prior: l.prior ? l.prior.total : null, fresh: scored[l.id] || null }));
const have = lessons.filter((l) => l.fresh);
const sevCount = (sev) => have.reduce((a, l) => a + (l.fresh.defects || []).filter((d) => d.sev === sev).length, 0);
const dist = {}; for (const l of have) { const b = Math.floor(l.fresh.total / 10) * 10; dist[b] = (dist[b] || 0) + 1; }
const byStep = {}; for (const l of have) { const k = l.kind === 'B' ? l.step : 'legacy-' + l.kind; (byStep[k] = byStep[k] || []).push(l.fresh.total); }
const byMod = {}; for (const l of have) (byMod[l.mod || l.kind] = byMod[l.mod || l.kind] || []).push(l.fresh.total);
const dimMeans = Object.fromEntries(DIMS.map((d) => [d, mean(have.map((l) => +l.fresh.scores[d] || 0))]));
const bloom = {}; for (const l of have) for (const b of l.fresh.bloom_items || []) bloom[b] = (bloom[b] || 0) + 1;
const freshness = {}; for (const l of have) freshness[l.fresh.freshness || '?'] = (freshness[l.fresh.freshness || '?'] || 0) + 1;
const claims = {}; for (const l of have) for (const c of l.fresh.claims || []) claims[c.status || '?'] = (claims[c.status || '?'] || 0) + 1;
const calc = have.reduce((a, l) => { a.n += +(l.fresh.calc_check?.n || 0); a.ok += +(l.fresh.calc_check?.ok || 0); return a; }, { n: 0, ok: 0 });
const out = { generated: new Date().toISOString().slice(0, 10), rubric: 'RUBRIC-100 v1', coverage: { scored: have.length, total: lessons.length, files: files.length },
  summary: { mean: mean(have.map((l) => l.fresh.total)), median: have.map((l) => l.fresh.total).sort((a, b) => a - b)[Math.floor(have.length / 2)] ?? null, dist, dims: dimMeans, P0: sevCount('P0'), P1: sevCount('P1'), P2: sevCount('P2'), ge85: have.filter((l) => l.fresh.total >= 85).length, lt60: have.filter((l) => l.fresh.total < 60).length, bloom, freshness, claims, calc },
  byStep: Object.fromEntries(Object.entries(byStep).map(([k, v]) => [k, { n: v.length, mean: mean(v) }])),
  byModule: Object.fromEntries(Object.entries(byMod).map(([k, v]) => [k, { n: v.length, mean: mean(v), min: Math.min(...v), max: Math.max(...v) }])),
  lessons, moduleNotes: modNotes, problems };
fs.writeFileSync(path.join(ROOT, 'qa/curriculum/baseline.json'), JSON.stringify(out, null, 1));
console.log(`chấm ${have.length}/${lessons.length} bài từ ${files.length} file · TB ${out.summary.mean} · ≥85: ${out.summary.ge85} · <60: ${out.summary.lt60} · P0 ${out.summary.P0} · P1 ${out.summary.P1} · P2 ${out.summary.P2}`);
console.log('phân bố', JSON.stringify(dist), '· chiều', JSON.stringify(dimMeans));
console.log('Bloom', JSON.stringify(bloom), '· tươi', JSON.stringify(freshness), '· calc', JSON.stringify(calc));
if (problems.length) console.log('VẤN ĐỀ FILE ĐIỂM:\n  ' + problems.join('\n  '));
