/* MARKETING LAB · MÔ HÌNH SEO — thuần, test được bằng node. Cần LabEngine và LAB_SEO. Không phải thuật toán xếp hạng thật.
   Vị trí đạt được = clamp(1 + (KD − sức mạnh) × 0,8, 1, 60), sức mạnh = authority + 12 × độ khớp nội dung + thưởng cụm chủ đề (4 mỗi bài cùng cụm, tối đa 12).
   Lưu lượng tháng = lượt tìm × CTR(vị trí) × độ tăng dần theo thời gian kể từ ngày đăng (nội dung mới cần ~2–3 tháng).
   Chuyển đổi = lượt truy cập × CVR theo ý định. Từ khoá thương hiệu của chính bạn đã xếp hạng sẵn nên không tạo thêm lưu lượng. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const D = root.LAB_SEO || require('./seo-data.js');
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  const kwById = (id) => D.keywords.find((k) => k.id === id);
  const take = (st, k, x) => { const v = (st[k] || 0) + x, n = Math.floor(v + 1e-9); st[k] = v - n; return n; };
  const ctrAt = (p) => p <= 10 ? D.ctr[Math.max(1, p) - 1] : p <= 20 ? 0.008 : p <= 30 ? 0.002 : 0;
  const vis = (p) => p <= 10 ? 1 : p <= 20 ? 0.5 : p <= 30 ? 0.15 : 0.03;      // tỉ lệ lượt tìm mà trang có mặt trong kết quả

  const SeoSim = {
    ctrAt,
    emptyPlan() { return { seed: '', shortlist: [], clusters: {}, competitor: 'c1', opps: [], plan: [] }; },

    /* ---- nghiên cứu từ khoá: từ khoá gốc → các từ khoá liên quan (có hạt, không ngẫu nhiên) ---- */
    search(seed, f = {}) {
      const toks = norm(seed).split(/\s+/).filter((t) => t.length >= 2 && !['cho', 'va', 'la'].includes(t));
      let rows = D.keywords.map((k) => {
        const h = norm(k.kw), words = h.split(/\s+/), full = toks.length && h.includes(norm(seed).trim());
        const hit = toks.length ? toks.filter((t) => words.includes(t)).length / toks.length : 1;
        return { k, score: full ? 2 + hit : hit };
      }).filter((x) => !toks.length || (toks.length <= 2 ? x.score >= 1 : x.score >= 0.5));
      if (f.intent && f.intent !== 'all') rows = rows.filter((x) => x.k.intent === f.intent);
      if (f.maxKd) rows = rows.filter((x) => x.k.kd <= f.maxKd);
      if (f.minVol) rows = rows.filter((x) => x.k.vol >= f.minVol);
      const by = { vol: (a, b) => b.k.vol - a.k.vol, kd: (a, b) => a.k.kd - b.k.kd, cpc: (a, b) => b.k.cpc - a.k.cpc, rel: (a, b) => b.k.rel - a.k.rel,
        opp: (a, b) => this.opportunity(b.k) - this.opportunity(a.k) };
      rows.sort((a, b) => (b.score - a.score) || (by[f.sort || 'vol'](a, b)));
      if (f.sort) rows.sort(by[f.sort]);
      return rows.map((x) => x.k);
    },
    /* Điểm cơ hội: nhiều lượt tìm, dễ, liên quan. Dùng để so sánh nhanh, không phải đáp án duy nhất. */
    opportunity(k) { return k.vol * (1 - k.kd / 100) * k.rel; },

    /* ---- đối thủ ---- */
    market() {
      const ranks = {};
      for (const c of D.competitors) {
        const r = {};
        for (const k of D.keywords) {
          const j = (E.hash(c.id + k.id) % 5) - 2;
          const pos = E.clamp(Math.round(1 + (k.kd - (c.auth * 0.6 + (c.focus.includes(k.cluster) ? 18 : 0))) * 0.7 + j), 1, 60);
          if (pos <= 30 && !k.own) r[k.id] = pos;
        }
        ranks[c.id] = r;
      }
      const own = {}; for (const k of D.keywords) if (k.own) own[k.id] = 1;
      ranks.me = own;
      return ranks;
    },
    competitor(id) {
      const c = D.competitors.find((x) => x.id === id), r = this.market()[id];
      const rows = Object.entries(r).map(([kid, pos]) => { const k = kwById(kid); return { k, pos, visits: Math.round(k.vol * ctrAt(pos)) }; }).sort((a, b) => b.visits - a.visits);
      const pageOf = (k) => k.intent === 'transactional' ? (k.cluster === 'buy' ? 'category' : 'product') : k.intent === 'commercial' ? (k.cluster === 'review' ? 'compare' : 'category') : (k.cluster === 'guide' ? 'blog' : 'faq');
      const pages = new Map();
      for (const x of rows) { const type = pageOf(x.k), key = x.k.cluster + '-' + type;
        const p = pages.get(key) || { url: `/${x.k.cluster}/${type}`, type, cluster: x.k.cluster, visits: 0, keywords: 0, top: x.k.kw };
        p.visits += x.visits; p.keywords++; pages.set(key, p); }
      const mine = this.market().me;
      const gap = rows.filter((x) => x.pos <= 10 && !mine[x.k.id] && !x.k.competitor).map((x) => x.k).sort((a, b) => this.opportunity(b) - this.opportunity(a));
      return { c, rows, pages: [...pages.values()].sort((a, b) => b.visits - a.visits), traffic: rows.reduce((s, x) => s + x.visits, 0), gap, keywordCount: rows.length };
    },
    /* Tỉ trọng hiện diện (share of voice) trên toàn bộ từ khoá thị trường. */
    shareOfVoice() {
      const m = this.market(), tot = {}; let sum = 0;
      for (const [id, r] of Object.entries(m)) { tot[id] = Object.entries(r).reduce((s, [kid, p]) => s + kwById(kid).vol * ctrAt(p), 0); sum += tot[id]; }
      return Object.fromEntries(Object.entries(tot).map(([id, v]) => [id, sum ? v / sum : 0]));
    },

    /* ---- kế hoạch nội dung ---- */
    validate(p, ctx) {
      const errors = [], warnings = [], items = p.plan.map((x) => ({ ...x, k: kwById(x.id) })).filter((x) => x.k);
      const cost = items.reduce((s, x) => s + (D.types[x.type] ? D.types[x.type].cost : 0), 0);
      if (!items.length) errors.push({ tab: 3, msg: 'Chưa có bài nào trong kế hoạch nội dung.' });
      if (items.length > ctx.pieces) errors.push({ tab: 3, msg: `Tối đa ${ctx.pieces} bài trong bài tập này.` });
      if (cost > ctx.budget) errors.push({ tab: 3, msg: `Chi phí nội dung ${E.fmt.vnd(cost)} vượt ngân sách ${E.fmt.vnd(ctx.budget)}.` });
      if (items.some((x) => !x.type || !D.types[x.type])) errors.push({ tab: 3, msg: 'Có bài chưa chọn loại nội dung.' });
      if (items.some((x) => x.k.own)) warnings.push({ tab: 3, msg: 'Từ khoá thương hiệu của bạn đã xếp hạng 1; viết thêm bài cho nó không tạo thêm lưu lượng.' });
      return { errors, warnings, ok: !errors.length, cost, pieces: items.length };
    },

    simulate(p, ctx) {
      const items = p.plan.filter((x) => kwById(x.id) && D.types[x.type]).map((x) => ({ ...x, k: kwById(x.id) }));
      const n = items.length, perMonth = Math.max(1, Math.ceil(n / 3));
      const depth = (it) => items.filter((o) => o !== it && o.k.cluster === it.k.cluster && o.k.cluster !== 'out').length;
      const pieces = items.map((it, i) => {
        const fit = D.types[it.type].fit[it.k.intent], bonus = Math.min(12, 4 * depth(it));
        const strength = D.authority + 12 * fit + bonus;
        const pos = E.clamp(Math.round(1 + (it.k.kd - strength) * 0.8), 1, 60);
        const pub = 1 + Math.floor(i / perMonth), already = !!it.k.own;
        const steady = already ? 0 : it.k.vol * ctrAt(pos);
        return { id: it.id, kw: it.k.kw, type: it.type, intent: it.k.intent, cluster: it.k.cluster, kd: it.k.kd, vol: it.k.vol, fit, bonus, pos, pub, steady, already,
          conv: steady * D.cvr[it.k.intent] * (0.5 + 0.5 * fit) * (0.3 + 0.7 * it.k.rel), cost: D.types[it.type].cost, rel: it.k.rel };
      });
      const seed = E.hash(['seo', ctx.seed, ...items.map((x) => x.id + x.type)].join('|'));
      const res = E.run({ days: D.months, seed, step: (m, st, rand) => {
        let visits = 0, conv = 0, imps = 0, cost = 0;
        for (const pc of pieces) {
          if (m === pc.pub) cost += pc.cost;
          if (m <= pc.pub || pc.already) continue;
          const ramp = 1 - Math.exp(-(m - pc.pub) / 2.5), nz = 0.95 + rand() * 0.10;
          visits += pc.steady * ramp * nz; conv += pc.conv * ramp * nz; imps += pc.vol * vis(pc.pos) * ramp;
        }
        const v = take(st, 'v', visits), cv = take(st, 'c', conv);
        return { spend: cost, impressions: Math.round(imps), clicks: v, conversions: cv, revenue: cv * ctx.aov, reach: 0, orders: cv };
      } });
      const t = res.totals, m6 = res.days[5], m12 = res.days[11];
      let cumC = 0, cumR = 0, payback = null;
      for (const r of res.days) { cumC += r.spend; cumR += r.revenue; if (payback === null && cumC > 0 && cumR >= cumC) payback = r.day; }
      const diag = { pieces, cost: pieces.reduce((s, x) => s + x.cost, 0), month6: { visits: m6.clicks, conv: m6.conversions, revenue: m6.revenue }, month12: { visits: m12.clicks, conv: m12.conversions, revenue: m12.revenue },
        payback, roas12: t.roas, orders12: t.conversions, steadyVisits: pieces.reduce((s, x) => s + x.steady, 0) };
      const feed = { source: 'google', medium: 'organic', campaign: 'seo_content_plan', monthly: res.days.map((r) => ({ month: r.day, sessions: r.clicks, conversions: r.conversions, revenue: r.revenue })),
        sessions: t.clicks, conversions: t.conversions, revenue: t.revenue, cost: t.spend,
        note: 'Organic tăng chậm: nội dung đăng tháng 1 thường chỉ đem lưu lượng đáng kể từ tháng 3–4.' };
      return { days: res.days, totals: t, orders: t.conversions, diag, feed };
    },
  };
  root.SeoSim = SeoSim;
  if (typeof module !== 'undefined') module.exports = SeoSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
