/* MARKETING LAB · MÔ HÌNH GOOGLE ADS (QUẢNG CÁO TÌM KIẾM) — thuần, test được bằng node.
   Cần LabEngine, LAB_META (từ khoá cấm/lợi ích dùng chung với Meta) và LAB_GADS. Không phải thuật toán đấu giá thật.

   Với mỗi từ khoá k:  Điểm chất lượng QS = 1 + 9 × (0,40·liên quan quảng cáo + 0,25·CTR kỳ vọng + 0,35·trang đích)
   Thị phần hiển thị   IS = sigmoid(2,2·ln(giá thầu hiệu dụng / giá tham chiếu) + 0,22·(QS − 6))
   CPC thực            = min(giá thầu, giá tham chiếu × (6,5/QS) × (0,8 + 0,2·IS))
   Mỗi cụm từ tìm kiếm có CTR/CVR theo ý định × chất lượng quảng cáo × độ liên quan × trang đích.
   Từ khoá phủ định cắt đúng các cụm từ chứa chúng; khớp rộng kéo về nhiều cụm từ ngoài ý định. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const M = root.LAB_META || require('./scenario.js').LAB_META;
  const G = root.LAB_GADS || require('./gads-data.js');
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  const STOP = new Set(['cho', 'khong', 'va', 'cua']);
  const toks = (s) => norm(s).split(/[^a-z0-9+]+/).filter((t) => t && !STOP.has(t));
  const kwById = (id) => G.keywords.find((k) => k.id === id);
  const take = (st, k, x) => { const v = (st[k + 'r'] || 0) + x, n = Math.floor(v + 1e-9); st[k + 'r'] = v - n; return n; };
  const DOW = [1, 1.02, 1.02, 1, 0.97, 0.88, 0.85];
  const sigmoid = (x) => 1 / (1 + Math.exp(-x));

  const GadsSim = {
    emptyConfig() {
      return { name: '', objective: null, keywords: [], negatives: [], bidStrategy: null, bid: 5000, dailyBudget: 250000, duration: 14,
        landing: null, ad: { h: ['', '', '', '', ''], d: ['', ''] } };
    },

    /* ---- chất lượng nội dung quảng cáo (0–100) ---- */
    adQuality(cfg) {
      const H = cfg.ad.h.map((x) => x.trim()).filter(Boolean), D = cfg.ad.d.map((x) => x.trim()).filter(Boolean), text = norm(H.concat(D).join(' '));
      const has = (w) => w.filter((x) => text.includes(x));
      const parts = [], flags = [], add = (label, got, max, note) => parts.push({ label, got, max, note });
      const uniq = new Set(H.map(norm)).size;
      add('Số tiêu đề', Math.min(H.length, 5) >= 3 ? (uniq >= Math.min(H.length, 5) ? 20 : 12) : Math.min(H.length, 2) * 6, 20,
        H.length < 3 ? 'Cần ít nhất 3 tiêu đề để hệ thống thử ghép.' : uniq < H.length ? 'Có tiêu đề trùng nhau; hệ thống không có gì để thử.' : 'Đủ tiêu đề khác nhau để thử.');
      const okD = D.filter((x) => x.length >= 50 && x.length <= 90).length;
      add('Mô tả', okD >= 2 ? 15 : okD === 1 ? 9 : D.length ? 4 : 0, 15, okD >= 2 ? 'Hai mô tả đủ ý và vừa khung.' : 'Mô tả nên dài 50–90 ký tự và có đủ hai dòng.');
      const ben = has(M.benefitWords);
      add('Lợi ích', ben.length >= 3 ? 15 : ben.length === 2 ? 11 : ben.length === 1 ? 6 : 0, 15, ben.length ? `Nhắc ${ben.length} lợi ích cụ thể.` : 'Chưa nêu lợi ích cụ thể.');
      const verb = G.verbs.some((v) => ('' + text).includes(v));
      add('Kêu gọi hành động', verb ? 10 : 0, 10, verb ? 'Có động từ kêu gọi.' : 'Thiếu động từ kêu gọi (mua, đặt, nhận…).');
      const off = has(M.offerWords).length || /\d/.test(text);
      add('Ưu đãi / con số', off ? 15 : 0, 15, off ? 'Có ưu đãi hoặc con số cụ thể.' : 'Chưa có ưu đãi, giá hay con số.');
      const proof = has(M.proofWords);
      add('Bằng chứng', proof.length ? 10 : 0, 10, proof.length ? 'Có căn cứ để tin.' : 'Thiếu bằng chứng (kiểm nghiệm, đánh giá).');
      let score = Math.round(parts.reduce((s, p) => s + p.got, 0) / 85 * 100);
      const claims = has(M.claimWords);
      if (claims.length) { score -= 25; flags.push('claim'); }
      const letters = H.concat(D).join('').replace(/[^A-Za-zÀ-ỹ]/g, '');
      if (letters.length > 10 && letters === letters.toUpperCase()) { score -= 10; flags.push('caps'); }
      return { score: E.clamp(score, 0, 100), parts, flags, claims, headlines: H.length, descriptions: D.length };
    },

    /* ---- cụm từ tìm kiếm mà một từ khoá kéo về ---- */
    termsOf(k, match) {
      if (k.brand) return [{ q: k.kw, share: 1, rel: k.rel, intent: k.intent, self: true }];
      const self = { q: k.kw, rel: k.rel, intent: k.intent, self: true };
      if (match === 'exact') return [{ ...self, share: 1 }];
      const ms = G.mods.filter((m) => match === 'broad' || m.phrase);
      const rest = Math.max(0.05, 1 - ms.reduce((s, m) => s + m.share, 0));
      return [{ ...self, share: rest }].concat(ms.map((m) => ({ q: k.kw + ' ' + m.s, share: m.share, rel: m.rel * (0.5 + 0.5 * k.rel), intent: m.intent, self: false })));
    },
    blocked(q, negatives) { const n = norm(q); return negatives.some((x) => n.includes(norm(x))); },

    /* ---- điểm chất lượng từng từ khoá ---- */
    keywordQS(k, cfg, aq) {
      const ktoks = toks(k.kw), htext = norm(cfg.ad.h.concat(cfg.ad.d).join(' '));
      const cover = ktoks.length ? ktoks.filter((t) => htext.includes(t)).length / ktoks.length : 0;
      const adRel = cover >= 0.99 ? 1 : cover;
      const expCtr = E.clamp(0.30 + 0.45 * k.rel + 0.25 * aq.score / 100, 0, 1);
      const lp = (G.landings.find((l) => l.id === cfg.landing) || G.landings[0]).q[k.intent];
      const raw = 0.40 * adRel + 0.25 * expCtr + 0.35 * lp;
      return { qs: E.clamp(Math.round(1 + 9 * raw), 1, 10), adRel, expCtr, lp };
    },

    validate(cfg, ctx) {
      const errors = [], warnings = [], total = cfg.dailyBudget * cfg.duration, H = cfg.ad.h.map((x) => x.trim()).filter(Boolean), D = cfg.ad.d.map((x) => x.trim()).filter(Boolean);
      if (!cfg.objective) errors.push({ step: 0, msg: 'Chưa chọn mục tiêu chiến dịch.' });
      if (!cfg.keywords.length) errors.push({ step: 1, msg: 'Chưa chọn từ khoá nào.' });
      if (!cfg.bidStrategy) errors.push({ step: 3, msg: 'Chưa chọn chiến lược giá thầu.' });
      if (ctx && total > ctx.budget) errors.push({ step: 3, msg: `Tổng ngân sách ${E.fmt.vnd(total)} vượt hạn mức ${E.fmt.vnd(ctx.budget)} của bài.` });
      if (!cfg.landing) errors.push({ step: 4, msg: 'Chưa chọn trang đích.' });
      if (H.length < 3) errors.push({ step: 4, msg: 'Cần ít nhất 3 tiêu đề.' });
      if (!D.length) errors.push({ step: 4, msg: 'Cần ít nhất 1 mô tả.' });
      if (cfg.ad.h.some((h) => h.length > 30)) errors.push({ step: 4, msg: 'Tiêu đề tối đa 30 ký tự.' });
      if (cfg.ad.d.some((d) => d.length > 90)) errors.push({ step: 4, msg: 'Mô tả tối đa 90 ký tự.' });
      for (const sel of cfg.keywords) { const k = kwById(sel.id); if (k && this.blocked(k.kw, cfg.negatives)) warnings.push({ step: 2, msg: `Từ khoá phủ định đang chặn chính từ khoá "${k.kw}": nó sẽ không bao giờ hiển thị.` }); }
      return { errors, warnings, ok: !errors.length, totalBudget: total };
    },

    /* Ước tính trước khi chạy: số lượt tìm kiếm khả dụng, không tiết lộ kết quả. */
    estimate(cfg) {
      const sel = cfg.keywords.map((s) => ({ s, k: kwById(s.id) })).filter((x) => x.k);
      const monthly = sel.reduce((n, { s, k }) => n + k.vol * G.match[s.match || 'broad'].frac, 0);
      return { keywords: sel.length, monthlySearches: Math.round(monthly), total: cfg.dailyBudget * cfg.duration };
    },

    simulate(cfg, ctx) {
      const aq = this.adQuality(cfg), sel = cfg.keywords.map((s) => ({ k: kwById(s.id), match: s.match || 'broad' })).filter((x) => x.k);
      const lp = G.landings.find((l) => l.id === cfg.landing) || G.landings[0], policy = aq.flags.includes('claim');
      const obj = G.objectives[cfg.objective] || G.objectives.sales, isLead = obj.conv === 'lead';
      const info = sel.map(({ k, match }) => {
        const q = this.keywordQS(k, cfg, aq);
        const terms = this.termsOf(k, match).filter((t) => !this.blocked(t.q, cfg.negatives));
        return { k, match, qs: q, terms, frac: G.match[match].frac };
      });
      const seed = E.hash([ctx.seed, cfg.objective, cfg.keywords.map((s) => s.id + s.match).join(), cfg.negatives.join(), cfg.bidStrategy, cfg.bid,
        cfg.dailyBudget, cfg.duration, cfg.landing, cfg.ad.h.join('|'), cfg.ad.d.join('|')].join('#'));
      const acc = new Map(info.map((i) => [i.k.id, { imps: 0, clicks: 0, conv: 0, cost: 0, is: 0, days: 0, terms: new Map() }]));
      let lostSum = 0, eligTotal = 0, impsTotal = 0, convLearn = 0;

      const res = E.run({ days: cfg.duration, seed, step: (d, st, rand) => {
        const noise = () => 0.93 + rand() * 0.14, dow = DOW[(d - 1) % 7];
        const prog = cfg.bidStrategy === 'maxconv' ? Math.min(1, convLearn / 30) : 1;
        const rows = [];
        let potential = 0;
        for (const i of info) {
          const k = i.k;
          const cap = cfg.bid, ref = k.cpc * (1 + 0.3 * (k.comp - 0.5));
          let bidEff = cap;
          if (cfg.bidStrategy === 'maxclicks') bidEff = Math.min(cap * 1.5, k.cpc * 0.9);
          else if (cfg.bidStrategy === 'maxconv') {
            const ex = G.intentBase[k.intent].cvr * (0.4 + 0.8 * k.rel) / 0.03;
            bidEff = Math.min(cap * 1.5, k.cpc * E.clamp(0.6 + 0.9 * ex, 0.5, 1.4));
          }
          const IS = E.clamp(sigmoid(2.2 * Math.log(Math.max(bidEff, 1) / ref) + 0.22 * (i.qs.qs - 6)) * (cfg.bidStrategy === 'maxconv' ? 0.85 + 0.15 * prog : 1), 0.04, 0.92);
          const cpc = Math.min(bidEff, k.cpc * E.clamp(6.5 / i.qs.qs, 0.75, 1.6) * (0.8 + 0.2 * IS)) * (cfg.bidStrategy === 'maxconv' ? 1 + 0.15 * (1 - prog) : 1) * (policy ? 1.15 : 1);
          const elig = k.vol / 30 * dow;
          const imps = elig * i.frac * IS;
          const termRows = i.terms.map((t) => {
            const base = k.brand && t.self ? G.brandBase : (k.competitor ? { ctr: G.intentBase.navigational.ctr * 0.7, cvr: G.intentBase.navigational.cvr * 0.6 } : G.intentBase[t.intent]);
            const lq = lp.q[t.intent];
            const ti = imps * t.share;
            const ctr = base.ctr * (0.55 + 0.6 * aq.score / 100) * (0.7 + 0.5 * t.rel) * (0.8 + 0.4 * IS) * noise();
            const cl = ti * ctr;
            const cvr = base.cvr * (0.4 + 0.8 * lq) * (0.4 + 0.8 * t.rel) * (policy ? 0.9 : 1) * (isLead ? 3.5 : 1) * noise();
            return { t, imps: ti, clicks: cl, conv: cl * cvr, cost: cl * cpc };
          });
          const cost = termRows.reduce((s, r) => s + r.cost, 0); potential += cost;
          rows.push({ i, IS, cpc, elig, termRows, imps, cost });
        }
        const scale = potential > cfg.dailyBudget && potential > 0 ? cfg.dailyBudget / potential : 1;
        let sI = 0, sC = 0, sV = 0, sCost = 0;
        for (const r of rows) {
          const a = acc.get(r.i.k.id); a.is += r.IS; a.days++; a.cpcSum = (a.cpcSum || 0) + r.cpc;
          eligTotal += r.elig; impsTotal += r.imps * scale;
          for (const tr of r.termRows) {
            const imps = tr.imps * scale, clicks = tr.clicks * scale, conv = tr.conv * scale, cost = tr.cost * scale;
            a.imps += imps; a.clicks += clicks; a.conv += conv; a.cost += cost;
            const key = tr.t.q, o = a.terms.get(key) || { q: key, rel: tr.t.rel, intent: tr.t.intent, imps: 0, clicks: 0, conv: 0, cost: 0 };
            o.imps += imps; o.clicks += clicks; o.conv += conv; o.cost += cost; a.terms.set(key, o);
            sI += imps; sC += clicks; sV += conv; sCost += cost;
          }
        }
        lostSum += 1 - scale;
        const impressions = take(st, 'im', sI), clicks = take(st, 'ck', sC), conv = take(st, 'cv', sV);
        convLearn += conv;
        const orders = isLead ? conv * ctx.leadToSale : conv;
        return { spend: Math.round(sCost), impressions, clicks, conversions: conv, revenue: Math.round(orders * ctx.aov), reach: 0, orders };
      } });

      const t = res.totals, orders = res.days.reduce((s, r) => s + r.orders, 0);
      const keywords = info.map((i) => { const a = acc.get(i.k.id);
        return { id: i.k.id, kw: i.k.kw, match: i.match, qs: i.qs.qs, adRel: i.qs.adRel, lp: i.qs.lp, imps: a.imps, clicks: a.clicks, conv: a.conv, cost: a.cost,
          is: a.days ? a.is / a.days : 0, cpc: a.clicks > 0 ? a.cost / a.clicks : (a.days ? a.cpcSum / a.days : 0), relevance: i.k.rel, intent: i.k.intent, blocked: !i.terms.length }; });
      const terms = [];
      for (const i of info) for (const o of acc.get(i.k.id).terms.values()) terms.push({ ...o, kw: i.k.kw, match: i.match, waste: o.rel < 0.3 });
      terms.sort((a, b) => b.cost - a.cost);
      const waste = terms.filter((x) => x.waste).reduce((s, x) => s + x.cost, 0), totCost = terms.reduce((s, x) => s + x.cost, 0);
      const diag = { aq, policy, keywords, terms, qs: keywords.length ? keywords.reduce((s, k) => s + k.qs * (k.cost || 1), 0) / keywords.reduce((s, k) => s + (k.cost || 1), 0) : 0,
        impressionShare: eligTotal > 0 ? impsTotal / eligTotal : 0, lostToBudget: res.days.length ? lostSum / res.days.length : 0,
        wasteSpend: waste, wasteShare: totCost > 0 ? waste / totCost : 0, orders, seed, learns: cfg.bidStrategy === 'maxconv', learned: convLearn >= 30,
        breakEvenRoas: 1 / ctx.grossMargin, profit: t.revenue * ctx.grossMargin - t.spend, landing: lp, isLead,
        underSpend: cfg.dailyBudget * cfg.duration > 0 ? 1 - t.spend / (cfg.dailyBudget * cfg.duration) : 0 };
      return { days: res.days, totals: t, orders, diag, feed: this.toAnalytics(cfg, res) };
    },

    /* ---- đầu ra cho GA4: nguồn google / cpc ----
       Google tự gắn thẻ (gclid) nên ghi nhận tốt hơn Meta: 93% lượt nhấp thành phiên, 95% chuyển đổi được GA4 thấy. */
    toAnalytics(cfg, res) {
      const A = { sessionRate: 0.93, convRate: 0.95 };
      const days = res.days.map((r) => ({ day: r.day, sessions: Math.round(r.clicks * A.sessionRate), conversions: Math.round(r.conversions * A.convRate),
        revenue: Math.round(r.revenue * A.convRate), cost: r.spend }));
      const sum = (k) => days.reduce((s, d) => s + d[k], 0);
      const t = res.totals;
      return { source: 'google', medium: 'cpc', campaign: cfg.name || 'google_search', assumptions: A, landing: cfg.landing || 'home',
        reported: { clicks: t.clicks, conversions: t.conversions, revenue: t.revenue, spend: t.spend }, sessions: sum('sessions'), conversions: sum('conversions'),
        revenue: sum('revenue'), cost: sum('cost'), days, note: 'Gắn thẻ tự động (gclid) nên GA4 ghi nhận gần đủ; chênh lệch còn lại do chặn cookie và cửa sổ attribution.' };
    },
  };
  root.GadsSim = GadsSim;
  if (typeof module !== 'undefined') module.exports = GadsSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
