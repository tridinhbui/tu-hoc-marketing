/* MARKETING LAB · MÔ HÌNH META ADS — thuần, test được bằng node. Cần LabEngine và LAB_META (nạp trước).
   Mô hình dạy học: đơn giản, nhất quán, giải thích được — KHÔNG phải thuật toán đấu giá thật.

   CPM = CPM_gốc × mục tiêu × độ hẹp đối tượng × độ phù hợp × vị trí × áp lực ngân sách × vi phạm
   CTR = CTR_gốc × mục tiêu × độ phù hợp × nội dung × vị trí × mỏi quảng cáo (tần suất cao)
   CVR = CVR_gốc × mục tiêu × độ phù hợp × nội dung × vị trí × giai đoạn học × độ sâu tệp
   Mỗi hệ số được trả trong `diag` để màn kết quả giải thích đúng nguyên nhân. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const M = root.LAB_META || require('./scenario.js').LAB_META;
  const BASE = { cpm: 70000, ctr: 0.012, cvr: 0.02 };      // VND/1000 hiển thị · 1,2% · 2% (khách lạnh, di động)
  const DOW_CPM = [1, 0.98, 0.98, 1, 1.03, 1.06, 1.05], DOW_CVR = [0.97, 1, 1, 1, 1.02, 1.05, 1];
  const UPPER = /[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/g;
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  const byId = (arr, id) => arr.find((x) => x.id === id);
  /* Làm tròn có giữ phần dư sang ngày sau: tổng không bị lệch và ngân sách nhỏ không ra 0 chỉ vì làm tròn. */
  const take = (st, k, x) => { const v = (st[k + 'r'] || 0) + x, n = Math.floor(v + 1e-9); st[k + 'r'] = v - n; return n; };
  const has = (txt, words) => words.filter((w) => txt.includes(w));

  const MetaSim = {
    BASE,
    emptyConfig() {
      return { name: '', objective: null, age: [], gender: 'all', location: [], interests: [], dailyBudget: 300000, duration: 14,
        placementMode: 'auto', placements: [], creative: { format: 'image', primary: '', headline: '', cta: null } };
    },

    /* ---- đối tượng ---- */
    audience(cfg) {
      const ages = cfg.age.map((id) => byId(M.age, id)).filter(Boolean);
      const locs = cfg.location.map((id) => byId(M.location, id)).filter(Boolean);
      const ints = cfg.interests.map((id) => byId(M.interests, id)).filter(Boolean);
      const gen = byId(M.gender, cfg.gender) || M.gender[0];
      const ageShare = ages.reduce((s, a) => s + a.share, 0), locShare = locs.reduce((s, l) => s + l.share, 0);
      const intShare = ints.length ? 1 - ints.reduce((p, i) => p * (1 - i.share), 1) : 1;      // nhiều sở thích = hợp (OR)
      const wavg = (arr, tot) => arr.reduce((s, x) => s + x.fit * x.share, 0) / (tot || 1);
      const ageFit = ages.length ? wavg(ages, ageShare) : 0, locFit = locs.length ? wavg(locs, locShare) : 0;
      const intFit = ints.length ? wavg(ints, ints.reduce((s, i) => s + i.share, 0)) : M.broadFit;
      const size = Math.round(M.population * ageShare * gen.share * locShare * intShare);
      const rel = ages.length && locs.length
        ? Math.pow(ageFit, 0.30) * Math.pow(gen.fit, 0.20) * Math.pow(locFit, 0.15) * Math.pow(intFit, 0.35) : 0;
      return { size, rel, fits: { age: ageFit, gender: gen.fit, location: locFit, interest: intFit }, broadInterest: !ints.length };
    },

    /* ---- vị trí hiển thị ---- */
    placementMix(cfg) {
      const manual = cfg.placementMode === 'manual' && cfg.placements.length > 0;
      const list = manual ? cfg.placements.map((id) => byId(M.placements, id)).filter(Boolean) : M.placements;
      const tot = list.reduce((s, p) => s + p.auto, 0) || 1, isImage = cfg.creative.format === 'image';
      let cpm = 0, ctr = 0, cvrN = 0;
      for (const p of list) {
        const w = p.auto / tot, c = p.ctr * (isImage && p.vertical ? 0.85 : 1);     // ảnh ngang trong khung dọc 9:16 bị cắt
        cpm += w * p.cpm; ctr += w * c; cvrN += w * c * p.cvr;
      }
      const narrow = manual && list.length === 1;                                     // ít kho hiển thị → đắt hơn
      return { cpm: cpm * (narrow ? 1.10 : 1), ctr, cvr: ctr > 0 ? cvrN / ctr : 1, narrow, count: list.length,
        usesNetwork: list.some((p) => p.id === 'network'), manual, ids: list.map((p) => p.id) };
    },

    /* ---- chất lượng nội dung quảng cáo (0–100) ---- */
    creative(cfg) {
      const c = cfg.creative, head = c.headline.trim(), prim = c.primary.trim(), text = norm(head + ' ' + prim);
      const obj = M.objectives[cfg.objective], fmt = byId(M.formats, c.format) || M.formats[0];
      const parts = [], flags = [];
      const add = (label, got, max, note) => parts.push({ label, got, max, note });
      const hl = head.length, pl = prim.length;
      add('Tiêu đề', hl >= 15 && hl <= 45 ? 15 : hl > 0 ? 6 : 0, 15,
        hl === 0 ? 'Chưa có tiêu đề.' : hl < 15 ? 'Tiêu đề quá ngắn, chưa nói được lợi ích.' : hl > 45 ? 'Tiêu đề dài, bị cắt trên di động.' : 'Độ dài phù hợp để đọc nhanh.');
      add('Nội dung chính', pl >= 80 && pl <= 280 ? 15 : pl > 0 ? 6 : 0, 15,
        pl === 0 ? 'Chưa có nội dung chính.' : pl < 80 ? 'Nội dung ngắn, chưa đủ thuyết phục.' : pl > 280 ? 'Nội dung dài, người lướt sẽ bỏ qua.' : 'Đủ ý, đọc được trong vài giây.');
      const ben = has(text, M.benefitWords);
      add('Lợi ích rõ ràng', ben.length >= 3 ? 20 : ben.length === 2 ? 15 : ben.length === 1 ? 8 : 0, 20,
        ben.length ? `Nhắc ${ben.length} lợi ích/đặc điểm cụ thể.` : 'Chưa nêu lợi ích cụ thể cho người đọc.');
      const proof = has(text, M.proofWords);
      add('Bằng chứng', proof.length ? 10 : 0, 10, proof.length ? 'Có con số hoặc căn cứ để tin.' : 'Thiếu bằng chứng (kiểm nghiệm, đánh giá, con số).');
      const ctaOk = !!c.cta && !!obj && obj.cta.includes(c.cta);
      add('CTA đúng mục tiêu', !c.cta ? 0 : ctaOk ? 15 : 5, 15,
        !c.cta ? 'Chưa chọn nút kêu gọi.' : ctaOk ? 'Nút kêu gọi khớp mục tiêu chiến dịch.' : 'Nút kêu gọi lệch với mục tiêu chiến dịch.');
      const off = has(text, M.offerWords);
      add('Ưu đãi', off.length ? 10 : 0, 10, off.length ? 'Có lý do để hành động ngay.' : 'Chưa có ưu đãi hay lý do hành động.');
      add('Định dạng', fmt.score, 15, `${fmt.t}: ${fmt.d}`);
      let score = parts.reduce((s, p) => s + p.got, 0);
      const claims = has(text, M.claimWords);
      if (claims.length) { score -= 25; flags.push('claim'); }
      const letters = (head + prim).replace(/[^A-Za-zÀ-ỹ]/g, '');
      if (letters.length > 10 && (letters.match(UPPER) || []).length / letters.length > 0.5) { score -= 10; flags.push('caps'); }
      if ((head + prim).split('!').length - 1 > 2) { score -= 5; flags.push('bang'); }
      return { score: E.clamp(score, 0, 100), parts, flags, claims, format: fmt };
    },

    /* ---- kiểm tra cấu hình trước khi chạy ---- */
    validate(cfg, ctx) {
      const errors = [], warnings = [], aud = this.audience(cfg), total = cfg.dailyBudget * cfg.duration;
      if (!cfg.objective) errors.push({ step: 0, msg: 'Chưa chọn mục tiêu chiến dịch.' });
      if (!cfg.age.length) errors.push({ step: 1, msg: 'Chọn ít nhất một nhóm tuổi.' });
      if (!cfg.location.length) errors.push({ step: 1, msg: 'Chọn ít nhất một khu vực.' });
      if (cfg.placementMode === 'manual' && !cfg.placements.length) errors.push({ step: 2, msg: 'Đã chọn vị trí thủ công nhưng chưa chọn vị trí nào.' });
      if (ctx && total > ctx.budget) errors.push({ step: 2, msg: `Tổng ngân sách ${E.fmt.vnd(total)} vượt hạn mức ${E.fmt.vnd(ctx.budget)} của bài.` });
      if (!cfg.creative.headline.trim()) errors.push({ step: 3, msg: 'Chưa viết tiêu đề quảng cáo.' });
      if (!cfg.creative.primary.trim()) errors.push({ step: 3, msg: 'Chưa viết nội dung chính.' });
      if (!cfg.creative.cta) errors.push({ step: 3, msg: 'Chưa chọn nút kêu gọi (CTA).' });
      if (aud.size > 0 && aud.size < 50000) warnings.push({ step: 1, msg: 'Đối tượng dưới 50.000 người: dễ chạm tần suất cao, chi phí tăng.' });
      if (aud.size > 8000000) warnings.push({ step: 1, msg: 'Đối tượng rất rộng: ngân sách nhỏ sẽ bị loãng.' });
      return { errors, warnings, ok: !errors.length, audienceSize: aud.size, totalBudget: total };
    },

    /* ---- ước tính trước khi chạy (giống ô "Ước tính" của Ads Manager): chỉ quy mô, KHÔNG tiết lộ kết quả ---- */
    estimate(cfg) {
      const aud = this.audience(cfg), pl = this.placementMix(cfg), obj = M.objectives[cfg.objective] || { cpm: 1 };
      const cpm = BASE.cpm * obj.cpm * pl.cpm * (1 + 0.35 * E.clamp((6.3 - Math.log10(Math.max(1000, aud.size))) / 1.5, 0, 1));
      const imps = cpm > 0 ? cfg.dailyBudget / cpm * 1000 : 0, pool = Math.max(1, aud.size * 0.65);
      const reach = pool * (1 - Math.exp(-imps / pool));
      return { audience: aud.size, rel: aud.rel, reachLow: Math.round(reach * 0.75), reachHigh: Math.round(reach * 1.25), total: cfg.dailyBudget * cfg.duration };
    },

    /* ---- chạy mô phỏng nhiều ngày ---- */
    simulate(cfg, ctx) {
      const obj = M.objectives[cfg.objective], aud = this.audience(cfg), pl = this.placementMix(cfg), cr = this.creative(cfg);
      const pool = Math.max(1, aud.size * 0.65);                            // phần tệp thật sự lên mạng trong kỳ
      const rel = aud.rel, policy = cr.flags.includes('claim');
      const f = {
        cpmAudience: 1 + 0.35 * E.clamp((6.3 - Math.log10(Math.max(1000, aud.size))) / 1.5, 0, 1),   // đối tượng hẹp → đắt
        cpmRelevance: 1.15 - 0.25 * rel,
        cpmAuction: 1 + 0.15 * Math.log2(Math.max(1, cfg.dailyBudget / 200000)),                    // ngân sách/ngày lớn → đẩy giá
        cpmPolicy: policy ? 1.20 : 1,
        ctrRel: 0.55 + 0.95 * Math.pow(rel, 1.2), cvrRel: 0.35 + 1.15 * Math.pow(rel, 1.5),
        ctrCr: (0.6 + 0.9 * cr.score / 100) * cr.format.ctr, cvrCr: (0.85 + 0.3 * cr.score / 100) * (policy ? 0.85 : 1),
      };
      const cpmBase = BASE.cpm * obj.cpm * f.cpmAudience * f.cpmRelevance * pl.cpm * f.cpmAuction * f.cpmPolicy;
      const ctrBase = BASE.ctr * obj.ctr * f.ctrRel * f.ctrCr * pl.ctr;
      const cvrBase = BASE.cvr * obj.cvr * f.cvrRel * f.cvrCr * pl.cvr;
      const seed = E.hash([ctx.seed, cfg.objective, cfg.age.join(), cfg.gender, cfg.location.join(), cfg.interests.join(), cfg.dailyBudget,
        cfg.duration, cfg.placementMode, cfg.placements.join(), cfg.creative.format, cfg.creative.headline, cfg.creative.primary, cfg.creative.cta].join('|'));
      const learns = obj.conv === 'purchase' || obj.conv === 'lead';
      let learnDone = null;

      const res = E.run({ days: cfg.duration, seed, step: (d, st, rand) => {
        st.imps = st.imps || 0; st.conv = st.conv || 0;
        const noise = () => 0.94 + rand() * 0.12;
        const fq = st.imps / pool;                                           // tần suất luỹ kế trên tệp
        const fatigue = 1 / (1 + 0.22 * Math.max(0, fq - 2.5));
        const depth = 1 - 0.40 * Math.pow(Math.min(1, fq), 0.8);             // người dễ mua nhất đã bị chạm hết
        const learn = learns ? 0.78 + 0.22 * Math.min(1, st.conv / 50) : 1;  // giai đoạn học: cần ~50 sự kiện
        if (learns && learnDone === null && st.conv >= 50) learnDone = d - 1;
        const dow = (d - 1) % 7;
        const cpm = cpmBase * DOW_CPM[dow] * (1 + 0.12 * Math.max(0, fq - 2)) * noise();
        const spend = cfg.dailyBudget, imps = Math.round(spend / cpm * 1000);
        const clicks = take(st, 'ck', imps * ctrBase * fatigue * noise());
        const conv = take(st, 'cv', clicks * cvrBase * learn * depth * DOW_CVR[dow] * noise());
        const orders = obj.conv === 'lead' ? conv * ctx.leadToSale : conv;
        st.imps += imps; st.conv += conv;
        return { spend, impressions: imps, clicks, conversions: conv, revenue: Math.round(orders * ctx.aov),
          reach: Math.round(pool * (1 - Math.exp(-st.imps / pool))), orders };
      } });

      const orders = res.days.reduce((s, r) => s + r.orders, 0), t = res.totals;
      const diag = { audience: aud, placement: pl, creative: cr, factors: f, objective: cfg.objective, policy, learns, learningEnded: learns ? learnDone : null,
        freq: t.frequency, pool, orders, seed, breakEvenRoas: 1 / ctx.grossMargin, profit: t.revenue * ctx.grossMargin - t.spend };
      return { days: res.days, totals: t, orders, diag, feed: this.toAnalytics(cfg, res) };
    },

    /* ---- đầu ra cho GA4 Lab: phiên và chuyển đổi mà GA4 SẼ THẤY, kèm giả định công khai ----
       80% lượt nhấp thành phiên có ghi nhận (rớt do tải chậm, chặn tracking). GA4 mặc định last-click nên thấy
       khoảng 85% số chuyển đổi mà Meta báo (Meta còn tính cả view-through 1 ngày). */
    toAnalytics(cfg, res) {
      const A = { sessionRate: 0.80, convRate: 0.85 };
      const days = res.days.map((r) => ({ day: r.day, sessions: Math.round(r.clicks * A.sessionRate),
        conversions: Math.round(r.conversions * A.convRate), revenue: Math.round(r.revenue * A.convRate), cost: r.spend }));
      const sum = (k) => days.reduce((s, d) => s + d[k], 0);
      return { source: 'facebook', medium: 'paid_social', campaign: cfg.name || 'meta_campaign', assumptions: A,
        sessions: sum('sessions'), conversions: sum('conversions'), revenue: sum('revenue'), cost: sum('cost'), days,
        note: 'Meta tính cửa sổ 7 ngày nhấp / 1 ngày xem; GA4 mặc định last-click nên thường thấy ít hơn.' };
    },
  };
  root.MetaSim = MetaSim;
  if (typeof module !== 'undefined') module.exports = MetaSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
