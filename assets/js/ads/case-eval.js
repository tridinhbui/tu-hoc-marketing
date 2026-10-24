/* CHẤM CASE XUYÊN SUỐT — thuần, không DOM, không mạng. Dùng chung cho trang quang-cao-case.html và tests/ads-cases.test.mjs.
   Thang điểm 100: chọn kênh 15 · chia ngân sách 20 · brief creative 10 · đọc dashboard 20 · chẩn đoán 20 · hành động 15. Đạt từ 70. */
const AdsCaseEval = {
  W: { channels:15, budget:20, creative:10, dash:20, diag:20, act:15 },
  PASS: 70,
  div(a, b) { return b > 0 ? a / b : null; },

  /* Chỉ số một dòng dashboard. Dòng TMĐT có impr/clicks/conv/rev; dòng phễu lead có leads/qual|mql/sql/won. */
  metrics(r) {
    const d = this.div;
    return { ctr: d(r.clicks, r.impr), cpc: d(r.spend, r.clicks), cpm: r.impr ? r.spend / r.impr * 1000 : null,
      cvr: d(r.conv, r.clicks), cpa: d(r.spend, r.conv), roas: d(r.rev, r.spend), aov: d(r.rev, r.conv),
      cpl: d(r.spend, r.leads), cpq: d(r.spend, r.qual != null ? r.qual : r.mql), cpsql: d(r.spend, r.sql), cpw: d(r.spend, r.won) };
  },
  /* MER = doanh thu sổ bán hàng ÷ tổng chi quảng cáo. */
  mer(c) {
    const spend = c.dash.rows.reduce((s, r) => s + r.spend, 0);
    const rev = (c.dash.backend ? c.dash.backend.rows : []).reduce((s, r) => s + r[2], 0);
    return this.div(rev, spend);
  },

  /* Bước 2: chọn kênh. Mỗi kênh "core" chọn được +1, "no" chọn phải −1, "ok" trung tính. Thiếu/thừa số kênh trừ điểm. */
  channels(c, picked) {
    const opts = c.channels.opts, set = new Set(picked || []);
    const core = opts.filter(o => o.v === 'core'), bad = opts.filter(o => o.v === 'no');
    const hit = core.filter(o => set.has(o.id)).length, miss = bad.filter(o => set.has(o.id)).length;
    let s = Math.max(0, hit - miss) / core.length;
    if (set.size < c.channels.min || set.size > c.channels.max) s *= 0.7;
    return { score: Math.round(s * 100) / 100, hit, miss, missedCore: core.filter(o => !set.has(o.id)).map(o => o.id), wrongPicks: bad.filter(o => set.has(o.id)).map(o => o.id) };
  },

  /* Bước 3: chia ngân sách (đơn vị triệu). Tổng phải khớp (±1), mỗi kênh trong khoảng hợp lý.
     Kênh có `learn` thì kiểm sàn học: ngân sách/tuần ÷ CPA dự kiến ≥ số sự kiện cần. */
  budget(c, alloc) {
    const B = c.budget, a = alloc || {}, issues = [];
    const sum = B.rows.reduce((s, r) => s + (+a[r.id] || 0), 0);
    if (Math.abs(sum - B.total) > 1) issues.push({ kind: 'sum', msg: `Tổng đang là ${sum} ${B.unit}, ngân sách là ${B.total}.` });
    let inRange = 0;
    for (const r of B.rows) {
      const v = +a[r.id] || 0;
      if (v >= r.min && v <= r.max) inRange++;
      else issues.push({ kind: 'range', id: r.id, msg: v < r.min ? `${r.t}: ${v} thấp hơn mức hợp lý (${r.min}–${r.max}).` : `${r.t}: ${v} cao hơn mức hợp lý (${r.min}–${r.max}).` });
      if (r.learn && v > 0) {
        const perWeek = v * 1e6 / (30 / 7), events = perWeek / r.learn.cpa;
        if (events < r.learn.events) issues.push({ kind: 'learn', id: r.id, msg: `${r.t}: ${v} ${B.unit} ≈ ${Math.round(events)} sự kiện/tuần với CPA dự kiến ${Math.round(r.learn.cpa / 1000)}.000đ — chưa đủ ${r.learn.events} (${r.learn.label}).` });
      }
    }
    let s = inRange / B.rows.length;
    if (issues.some(i => i.kind === 'sum')) s *= 0.5;
    if (issues.some(i => i.kind === 'learn')) s *= 0.8;
    return { score: Math.round(s * 100) / 100, sum, issues };
  },

  /* Bước 4: brief creative — chấm hoàn thành (đủ 7 ô, mỗi ô ≥ 4 chữ) và tự kiểm (số mục checklist bạn đánh dấu đạt). */
  creative(c, brief, checked) {
    const keys = ['who', 'moment', 'promise', 'proof', 'offer', 'cta', 'hooks'];
    const filled = keys.filter(k => String((brief || {})[k] || '').trim().split(/\s+/).filter(Boolean).length >= 4).length;
    const ticks = (checked || []).filter(i => i >= 0 && i < c.creative.check.length).length;
    const s = 0.6 * filled / keys.length + 0.4 * ticks / c.creative.check.length;
    return { score: Math.round(s * 100) / 100, filled, ticks };
  },

  /* Thứ tự hiển thị phương án: hoán vị cố định theo mã câu (cùng câu luôn cùng thứ tự), để đáp án không luôn đứng đầu.
     Trả mảng chỉ số gốc theo thứ tự hiển thị; chấm luôn bằng chỉ số gốc. */
  order(id, n) {
    let h = 2166136261; for (let i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = Math.imul(h, 16777619); }
    const idx = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; const j = h % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx;
  },

  num(q, v) { const x = typeof v === 'number' ? v : parseFloat(String(v || '').replace(',', '.')); return Number.isFinite(x) && Math.abs(x - q.ans) <= q.tol; },
  pick(q, i) { return !!(q.opts[i] && q.opts[i][1]); },

  /* Bước 5: đọc dashboard. */
  dash(c, answers) {
    const qs = c.dash.qs, a = answers || {};
    const right = qs.filter(q => q.kind === 'num' ? this.num(q, a[q.id]) : this.pick(q, a[q.id]));
    return { score: Math.round(right.length / qs.length * 100) / 100, right: right.map(q => q.id), wrong: qs.filter(q => !right.includes(q)).map(q => q.id) };
  },

  /* Bước 6: chẩn đoán — 0,75 cho nguyên nhân đúng, 0,25 nếu đã mở ít nhất một bảng dữ liệu then chốt. */
  diag(c, opened, pickIdx) {
    const D = c.diag, keys = D.checks.filter(k => k.key).map(k => k.id);
    const sawKey = (opened || []).some(id => keys.includes(id));
    const ok = !!(D.opts[pickIdx] && D.opts[pickIdx][1]);
    return { score: (ok ? 0.75 : 0) + (sawKey ? 0.25 : 0), ok, sawKey, overLimit: (opened || []).length > D.max };
  },

  act(c, pickIdx) { const ok = !!(c.act.opts[pickIdx] && c.act.opts[pickIdx][1]); return { score: ok ? 1 : 0, ok }; },

  /* Cả case: ans = {channels:[], budget:{}, brief:{}, checked:[], dash:{}, opened:[], diag:i, act:i} */
  grade(c, ans) {
    const A = ans || {};
    const parts = { channels: this.channels(c, A.channels), budget: this.budget(c, A.budget), creative: this.creative(c, A.brief, A.checked),
      dash: this.dash(c, A.dash), diag: this.diag(c, A.opened, A.diag), act: this.act(c, A.act) };
    const total = Math.round(Object.keys(this.W).reduce((s, k) => s + this.W[k] * parts[k].score, 0));
    /* Bài cần học lại: theo từng phần sai. */
    const review = new Set();
    parts.channels.missedCore.concat(parts.channels.wrongPicks).forEach(id => { const o = c.channels.opts.find(x => x.id === id); if (o && o.lesson) review.add(o.lesson); });
    if (parts.budget.score < 1) review.add(c.budget.lesson);
    if (parts.creative.score < 0.7) review.add(c.creative.lesson);
    parts.dash.wrong.forEach(id => review.add(c.dash.qs.find(q => q.id === id).lesson));
    if (!parts.diag.ok) review.add(c.diag.lesson);
    if (!parts.act.ok) review.add(c.act.lesson);
    return { parts, total, pass: total >= this.PASS, review: [...review].filter(Boolean) };
  },

  /* Đáp án mẫu — dùng cho nút "xem cách làm mẫu" và cho test (đáp án mẫu phải đạt điểm tối đa). */
  model(c) {
    return { channels: c.channels.opts.filter(o => o.v === 'core').map(o => o.id), budget: { ...c.budget.model },
      brief: { ...c.creative.model }, checked: c.creative.check.map((_, i) => i),
      dash: Object.fromEntries(c.dash.qs.map(q => [q.id, q.kind === 'num' ? q.ans : q.opts.findIndex(o => o[1])])),
      opened: c.diag.checks.filter(k => k.key).map(k => k.id).slice(0, c.diag.max), diag: c.diag.opts.findIndex(o => o[1]), act: c.act.opts.findIndex(o => o[1]) };
  },
};
if (typeof globalThis !== 'undefined') globalThis.AdsCaseEval = AdsCaseEval;
if (typeof module !== 'undefined') module.exports = AdsCaseEval;
