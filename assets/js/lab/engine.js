/* MARKETING LAB · ENGINE CHUNG — thuần, không DOM, không gọi mạng, không dùng Math.random.
   Mọi simulator (Meta, Google Ads, GA4, SEO) dùng chung: công thức KPI, RNG có hạt, vòng mô phỏng nhiều ngày,
   so sánh phiên bản và định dạng số. Mọi số trong Lab là MINH HOẠ để học, không phải dữ liệu thật. */
const LabEngine = {
  /* ---- số học an toàn ---- */
  clamp(x, lo, hi) { return Math.min(hi, Math.max(lo, x)); },
  /* Mẫu số = 0 → null (hiển thị "—"), không bao giờ Infinity/NaN. */
  div(a, b) { return b > 0 ? a / b : null; },

  /* ---- RNG có hạt: cùng cấu hình + cùng hạt → cùng kết quả ---- */
  hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; },
  rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },

  /* ---- KPI: một công thức duy nhất cho mọi công cụ ----
     CTR = clicks/impressions · CPC = spend/clicks · CPM = spend/impressions×1000
     CVR = conversions/clicks · CPA = spend/conversions · ROAS = revenue/spend */
  kpis(t) {
    const { spend = 0, impressions = 0, reach = 0, clicks = 0, conversions = 0, revenue = 0 } = t || {};
    const d = this.div.bind(this), cpm = d(spend, impressions);
    return { spend, impressions, reach, clicks, conversions, revenue,
      ctr: d(clicks, impressions), cpc: d(spend, clicks), cpm: cpm === null ? null : cpm * 1000,
      cvr: d(conversions, clicks), cpa: d(spend, conversions), roas: d(revenue, spend), frequency: d(impressions, reach) };
  },

  /* ---- vòng mô phỏng nhiều ngày ----
     step(day, state, rand) → {spend, impressions, clicks, conversions, revenue, reach(luỹ kế)}; state do model tự giữ.
     Trả {days:[{day, ...số liệu ngày, k:kpis ngày, cum:kpis luỹ kế}], totals:kpis}. */
  run({ days, seed, step }) {
    const rand = this.rng(seed), state = {}, rows = [];
    const sum = { spend: 0, impressions: 0, clicks: 0, conversions: 0, revenue: 0, reach: 0 };
    for (let d = 1; d <= days; d++) {
      const r = step(d, state, rand);
      for (const k of ['spend', 'impressions', 'clicks', 'conversions', 'revenue']) sum[k] += r[k];
      sum.reach = Math.max(sum.reach, r.reach || 0);
      rows.push({ day: d, ...r, k: this.kpis(r), cum: this.kpis(sum) });
    }
    return { days: rows, totals: this.kpis(sum) };
  },

  /* ---- so sánh hai phiên bản: chiều "tốt" của từng chỉ số ---- */
  DIRECTION: { spend: 0, impressions: 1, reach: 1, clicks: 1, conversions: 1, revenue: 1, ctr: 1, cvr: 1, roas: 1, cpc: -1, cpm: -1, cpa: -1, frequency: 0 },
  compare(a, b) {
    const out = {};
    for (const m of Object.keys(this.DIRECTION)) {
      const x = a[m], y = b[m];
      const delta = x === null || y === null ? null : y - x;
      const pct = delta === null || x === 0 ? null : delta / x;
      const dir = this.DIRECTION[m];
      out[m] = { from: x, to: y, delta, pct, verdict: delta === null || dir === 0 || Math.abs(delta) < 1e-9 ? 'flat' : (delta * dir > 0 ? 'better' : 'worse') };
    }
    return out;
  },

  /* ---- định dạng (vi-VN) ---- */
  fmt: {
    int: (n) => n === null || n === undefined ? '—' : Math.round(n).toLocaleString('vi-VN'),
    vnd: (n) => n === null || n === undefined ? '—' : Math.round(n).toLocaleString('vi-VN') + ' ₫',
    vndShort(n) { if (n === null || n === undefined) return '—'; const a = Math.abs(n);
      return a >= 1e9 ? (n / 1e9).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + ' tỷ' : a >= 1e6 ? (n / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + ' triệu' : a >= 1e3 ? (n / 1e3).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + 'k' : String(Math.round(n)); },
    pct: (n, d = 2) => n === null || n === undefined ? '—' : (n * 100).toLocaleString('vi-VN', { maximumFractionDigits: d }) + '%',
    x: (n, d = 2) => n === null || n === undefined ? '—' : n.toLocaleString('vi-VN', { maximumFractionDigits: d }) + '×',
    num: (n, d = 1) => n === null || n === undefined ? '—' : n.toLocaleString('vi-VN', { maximumFractionDigits: d }),
  },
};
if (typeof globalThis !== 'undefined') globalThis.LabEngine = LabEngine;
if (typeof module !== 'undefined') module.exports = LabEngine;
