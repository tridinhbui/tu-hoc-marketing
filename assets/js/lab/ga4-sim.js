/* MARKETING LAB · MÔ HÌNH GA4 — thuần, test được bằng node. Cần LabEngine và LAB_GADS (chất lượng trang đích).
   KHÔNG sinh dữ liệu ngẫu nhiên độc lập: mọi phiên, chuyển đổi, doanh thu, chi phí của kênh trả phí đến từ `feed` mà Meta/Google
   Ads Lab xuất ra. Kênh nền (organic, direct, referral) được suy ra từ chính traffic quảng cáo bằng quy tắc công khai
   (direct có "hiệu ứng hào quang" từ quảng cáo) cộng nhiễu có hạt xác định.

   Quy ước đối soát (có kiểm thử):
   - Mua hàng (purchase) của kênh trả phí = feed.conversions, doanh thu = feed.revenue, chi phí = feed.cost.
   - Phễu luôn không tăng: phiên ≥ xem sản phẩm ≥ thêm giỏ ≥ thanh toán ≥ mua.
   - Cả ba mô hình attribution của GA4 (last/first/linear) cộng ra cùng tổng chuyển đổi. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const G = root.LAB_GADS || require('./gads-data.js');
  const clamp = E.clamp;
  const take = (st, k, x) => { const v = (st[k] || 0) + x, n = Math.floor(v + 1e-9); st[k] = v - n; return n; };

  const CHANNELS = {
    meta:     { id: 'meta',     source: 'facebook', medium: 'paid_social', group: 'Paid Social',    paid: true },
    gads:     { id: 'gads',     source: 'google',   medium: 'cpc',         group: 'Paid Search',    paid: true },
    organic:  { id: 'organic',  source: 'google',   medium: 'organic',     group: 'Organic Search' },
    direct:   { id: 'direct',   source: '(direct)', medium: '(none)',      group: 'Direct' },
    referral: { id: 'referral', source: 'zalo.me',  medium: 'referral',    group: 'Referral' },
  };
  /* Hồ sơ hành vi theo kênh: tỉ lệ tương tác, số trang/phiên, thời gian, phần người mới, và các bước phễu. */
  const PROFILE = {
    meta:     { engaged: 0.42, pps: 1.9, eng: 28, newU: 0.90, userR: 0.88, view: 0.55, cart: 0.20, ck: 0.50, pay: 0.60 },
    gads:     { engaged: 0.68, pps: 2.7, eng: 62, newU: 0.78, userR: 0.90, view: 0.72, cart: 0.30, ck: 0.58, pay: 0.66 },
    organic:  { engaged: 0.60, pps: 2.3, eng: 74, newU: 0.80, userR: 0.92, view: 0.50, cart: 0.22, ck: 0.55, pay: 0.62 },
    direct:   { engaged: 0.55, pps: 2.4, eng: 55, newU: 0.50, userR: 0.80, view: 0.62, cart: 0.32, ck: 0.62, pay: 0.70 },
    referral: { engaged: 0.50, pps: 2.0, eng: 40, newU: 0.82, userR: 0.90, view: 0.45, cart: 0.18, ck: 0.50, pay: 0.58 },
  };
  const LANDING_MIX = {
    organic: { blog: 0.5, category: 0.2, product: 0.2, home: 0.1 },
    direct: { home: 0.6, product: 0.2, category: 0.2, blog: 0 },
    referral: { blog: 0.5, home: 0.3, product: 0.2, category: 0 },
  };
  const FUNNEL = [['session_start', 'Bắt đầu phiên'], ['view_item', 'Xem sản phẩm'], ['add_to_cart', 'Thêm vào giỏ'], ['begin_checkout', 'Bắt đầu thanh toán'], ['purchase', 'Mua hàng']];
  const EVENTS = [['session_start', 'Hệ thống', false], ['first_visit', 'Hệ thống', false], ['page_view', 'Tự động', false], ['user_engagement', 'Tự động', false],
    ['scroll', 'Đo lường nâng cao', false], ['click', 'Đo lường nâng cao', false], ['view_item', 'Thương mại điện tử', false], ['add_to_cart', 'Thương mại điện tử', false],
    ['begin_checkout', 'Thương mại điện tử', false], ['purchase', 'Thương mại điện tử', true]];
  const LP = [['product', 'Trang sản phẩm Kem chống nắng', '/san-pham/kem-chong-nang'], ['category', 'Danh mục Chống nắng', '/danh-muc/chong-nang'], ['home', 'Trang chủ', '/'], ['blog', 'Bài hướng dẫn chọn chống nắng', '/blog/chon-kem-chong-nang']];
  const lpQ = (id) => { const l = G.landings.find((x) => x.id === id); return l ? (l.q.transactional + l.q.commercial) / 2 : 0.6; };

  const addDays = (iso, n) => { const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

  const GA4 = {
    CHANNELS, PROFILE, FUNNEL, EVENTS, LP, START: '2026-03-02',

    /* feeds: {meta?, gads?} (đầu ra của hai Lab) · ctx: {aov, seed} → dataset */
    build(feeds, ctx) {
      const days = Math.max(14, ...Object.values(feeds).filter(Boolean).map((f) => f.days.length));
      const rand = E.rng(E.hash(['ga4', ctx.seed, days, feeds.meta ? feeds.meta.sessions : 0, feeds.gads ? feeds.gads.sessions : 0].join('|')));
      const carry = {}, rows = [];
      const noise = () => 0.92 + rand() * 0.16;
      const paidSessions = (d) => ['meta', 'gads'].reduce((s, k) => s + (feeds[k] && feeds[k].days[d - 1] ? feeds[k].days[d - 1].sessions : 0), 0);

      for (let d = 1; d <= days; d++) {
        for (const id of Object.keys(CHANNELS)) {
          const P = PROFILE[id];
          let sessions, conv, revenue = 0, cost = 0;
          if (id === 'meta' || id === 'gads') {
            const fd = feeds[id] && feeds[id].days[d - 1];
            sessions = fd ? fd.sessions : 0; conv = fd ? fd.conversions : 0; revenue = fd ? fd.revenue : 0; cost = fd ? fd.cost : 0;
          } else {
            const base = id === 'organic' ? 16 + 0.7 * d : id === 'direct' ? 5 + 0.10 * paidSessions(d) : 4;     // direct = hào quang từ quảng cáo
            sessions = Math.round(base * noise());
            const cvrS = id === 'organic' ? 0.012 : id === 'direct' ? 0.026 : 0.010;
            conv = take(carry, id + 'c', sessions * cvrS * noise());
            revenue = conv * ctx.aov;
          }
          const cvrS = sessions > 0 ? conv / sessions : 0;
          const users = Math.round(sessions * P.userR), newUsers = Math.round(users * P.newU);
          const engRate = clamp(P.engaged * (0.85 + 6 * cvrS), 0.15, 0.9);
          const engaged = Math.round(sessions * engRate);
          /* phễu dựng ngược từ số mua thật, rồi kẹp để luôn không tăng */
          let ck = conv > 0 ? Math.ceil(conv / P.pay) : Math.round(sessions * P.view * P.cart * P.ck * 0.9);
          let cart = Math.max(ck, Math.round(ck / P.ck));
          let view = Math.max(cart, Math.round(cart / P.cart));
          if (view > sessions) view = sessions; if (cart > view) cart = view; if (ck > cart) ck = cart;
          const purchase = Math.min(conv, ck);
          const ev = { session_start: sessions, first_visit: newUsers, page_view: Math.round(sessions * P.pps), user_engagement: engaged,
            scroll: Math.round(engaged * 0.6), click: Math.round(sessions * 0.3), view_item: view, add_to_cart: cart, begin_checkout: ck, purchase };
          rows.push({ day: d, date: addDays(this.START, d - 1), ch: id, sessions, users, newUsers, engaged, events: ev, conversions: purchase, revenue: purchase === conv ? revenue : purchase * ctx.aov, cost,
            engTime: Math.round(engaged * P.eng * noise()) });
        }
      }
      return { rows, days, feeds, aov: ctx.aov, start: this.START, landing: { meta: (feeds.meta && feeds.meta.landing) || 'product', gads: (feeds.gads && feeds.gads.landing) || 'home' } };
    },

    ranges(ds) {
      const n = ds.days, r = [{ id: 'all', t: `Toàn kỳ (${n} ngày)`, from: 1, to: n }];
      if (n >= 14) r.push({ id: 'w1', t: 'Tuần 1', from: 1, to: 7 }, { id: 'w2', t: 'Tuần 2', from: 8, to: 14 });
      r.push({ id: 'last7', t: '7 ngày cuối', from: Math.max(1, n - 6), to: n });
      return r;
    },
    channelsOf(ds, filter) {   // filter: 'all' | 'organic' | 'paid' | một id kênh
      if (!filter || filter === 'all') return Object.keys(CHANNELS);
      if (filter === 'paid') return ['meta', 'gads'];
      if (filter === 'nonpaid') return ['organic', 'direct', 'referral'];
      return [filter];
    },

    /* Tổng hợp theo từng kênh trong khoảng ngày; trả {byCh, total}. */
    aggregate(ds, from, to, chans) {
      const mk = () => ({ sessions: 0, users: 0, newUsers: 0, engaged: 0, engTime: 0, conversions: 0, revenue: 0, cost: 0, events: Object.fromEntries(EVENTS.map((e) => [e[0], 0])) });
      const byCh = {}, total = mk();
      for (const id of chans || Object.keys(CHANNELS)) byCh[id] = mk();
      for (const r of ds.rows) {
        if (r.day < from || r.day > to || !byCh[r.ch]) continue;
        for (const o of [byCh[r.ch], total]) {
          for (const k of ['sessions', 'users', 'newUsers', 'engaged', 'engTime', 'conversions', 'revenue', 'cost']) o[k] += r[k];
          for (const k in r.events) o.events[k] += r.events[k];
        }
      }
      const fin = (o) => Object.assign(o, { engRate: E.div(o.engaged, o.sessions), cvr: E.div(o.conversions, o.sessions), roas: o.cost > 0 ? E.div(o.revenue, o.cost) : null,
        cpa: o.cost > 0 ? E.div(o.cost, o.conversions) : null, rps: E.div(o.revenue, o.sessions), avgEng: E.div(o.engTime, o.users), aovv: E.div(o.revenue, o.conversions) });
      Object.values(byCh).forEach(fin); fin(total);
      return { byCh, total };
    },

    /* Phễu: các bước, số lượng, tỉ lệ giữ lại, tỉ lệ rơi, bước rơi nhiều nhất. */
    funnel(agg) {
      const steps = FUNNEL.map(([id, t], i) => ({ id, t, n: agg.events[id] }));
      steps.forEach((s, i) => { const p = i ? steps[i - 1].n : null; s.keep = i ? E.div(s.n, p) : 1; s.drop = i ? (p > 0 ? 1 - s.n / p : null) : null; });
      const worst = steps.slice(1).reduce((b, s) => (s.drop !== null && (!b || s.drop > b.drop)) ? s : b, null);
      return { steps, worst };
    },

    /* Trang đích: chia phiên của mỗi kênh theo cơ cấu trang đích, chuyển đổi theo chất lượng trang. */
    landings(ds, from, to, chans) {
      const out = Object.fromEntries(LP.map(([id, t, path]) => [id, { id, t, path, sessions: 0, engaged: 0, conversions: 0, revenue: 0 }]));
      for (const ch of chans) {
        const mix = ch === 'meta' || ch === 'gads' ? (() => { const dom = ds.landing[ch], m = {}; for (const [id] of LP) m[id] = id === dom ? 0.7 : 0.1; return m; })() : LANDING_MIX[ch];
        const a = this.aggregate(ds, from, to, [ch]).total;
        const w = LP.map(([id]) => (mix[id] || 0) * lpQ(id)), W = w.reduce((s, x) => s + x, 0) || 1;
        const cs = { sessions: 0, engaged: 0, conv: 0, rev: 0 };
        LP.forEach(([id], i) => {
          const sh = mix[id] || 0, o = out[id];
          const s = Math.round(a.sessions * sh), e = Math.round(a.engaged * sh * (0.6 + 0.8 * lpQ(id)) / (LP.reduce((q, [j]) => q + (mix[j] || 0) * (0.6 + 0.8 * lpQ(j)), 0) || 1));
          const c = a.conversions * w[i] / W;
          o.sessions += s; o.engaged += e; o.conversions += c; o.revenue += c * ds.aov;
        });
      }
      return Object.values(out).map((o) => ({ ...o, conversions: Math.round(o.conversions), revenue: Math.round(o.revenue), engRate: E.div(o.engaged, o.sessions), cvr: E.div(Math.round(o.conversions), o.sessions) }));
    },

    /* Attribution. Giả định hành trình nhiều điểm chạm (công khai):
       - 30% chuyển đổi của Paid Search có lần chạm đầu từ Paid Social (nếu Paid Social có chạy);
       - 60% chuyển đổi của Direct có lần chạm đầu từ quảng cáo trả phí, chia theo tỉ trọng phiên.
       Last-click: tính cho điểm chạm cuối. First-click: tính cho điểm chạm đầu. Linear: chia đều các điểm chạm. */
    attribution(ds, from, to) {
      const a = this.aggregate(ds, from, to).byCh, ids = Object.keys(CHANNELS);
      const last = Object.fromEntries(ids.map((id) => [id, a[id].conversions])), first = { ...last }, linear = { ...last };
      const move = (fromCh, share, toSplit) => {
        const mc = last[fromCh] * share;
        first[fromCh] -= mc; linear[fromCh] -= mc / 2;
        for (const [ch, w] of toSplit) { first[ch] += mc * w; linear[ch] += mc * w / 2; }
      };
      if (a.meta.sessions > 0) move('gads', 0.30, [['meta', 1]]);
      const pm = a.meta.sessions, pg = a.gads.sessions, pt = pm + pg;
      if (pt > 0) move('direct', 0.60, [['meta', pm / pt], ['gads', pg / pt]]);
      const round = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Math.round(v * 100) / 100]));
      const reported = { meta: ds.feeds.meta ? ds.feeds.meta.reported : null, gads: ds.feeds.gads ? ds.feeds.gads.reported : null };
      return { last: round(last), first: round(first), linear: round(linear), reported, assumptions: { gadsFromMeta: 0.30, directFromPaid: 0.60 } };
    },

    /* Thời gian thực: "phút mô phỏng" tăng dần; người dùng đang hoạt động suy từ phiên/ngày cuối của từng kênh. */
    realtime(ds, minute) {
      const hour = Math.floor(minute / 60) % 24, curve = [0.2, 0.1, 0.1, 0.1, 0.2, 0.4, 0.7, 1.0, 1.2, 1.1, 1.0, 1.1, 1.3, 1.1, 1.0, 1.0, 1.1, 1.3, 1.6, 1.8, 1.9, 1.7, 1.0, 0.5][hour];
      const rand = E.rng(E.hash(['rt', ds.rows.length, minute].join('|'))), last = {};
      for (const r of ds.rows) if (r.day === ds.days) last[r.ch] = r;
      // ngày cuối của chiến dịch có thể đã dừng: lấy ngày gần nhất còn phiên
      const recent = (id) => { for (let d = ds.days; d >= 1; d--) { const r = ds.rows.find((x) => x.day === d && x.ch === id); if (r && r.sessions > 0) return r; } return null; };
      const by = {}; let users = 0;
      for (const id of Object.keys(CHANNELS)) {
        const r = recent(id), perMin = r ? r.users / 1440 * curve * 24 / 24 : 0;
        const u = Math.round(perMin * 30 * (0.8 + rand() * 0.4));        // người dùng trong 30 phút gần nhất
        by[id] = u; users += u;
      }
      const pages = LP.map(([id, t, path]) => [path, t]).map(([p, t], i) => ({ path: p, t, users: Math.round(users * [0.4, 0.2, 0.25, 0.15][i] * (0.9 + rand() * 0.2)) }));
      return { minute, hour, users, by, pages };
    },
  };
  root.GA4Sim = GA4;
  if (typeof module !== 'undefined') module.exports = GA4;
})(typeof globalThis !== 'undefined' ? globalThis : this);
