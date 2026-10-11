/* MARKETING LAB · CHẤM ĐIỂM & PHẢN HỒI CHO META ADS — thuần, test được bằng node.
   Chấm CHẤT LƯỢNG QUYẾT ĐỊNH chứ không chấm "bấm đúng nút": mỗi phần điểm gắn với một quyết định marketing và một lý do.
   Tổng 100: Kết quả KPI 40 · Đối tượng 20 · Nội dung 15 · Thiết lập 15 · Quy trình thử–đo–sửa 10. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const M = root.LAB_META || require('./scenario.js').LAB_META;
  const F = E.fmt, clamp = E.clamp;

  const MetaEval = {
    targets(mode, budget) {
      const t = (M.modes[mode] || M.modes.practice).targets || M.modes.challenge.targets;
      return { roas: t.roas, orders: Math.max(5, Math.round(t.orders * budget / M.modes.challenge.budget)) };
    },
    stars(total) { return total >= 90 ? 3 : total >= 70 ? 2 : total >= 50 ? 1 : 0; },

    /* res: kết quả MetaSim.simulate · hist: các lượt chạy TRƯỚC của cùng chế độ [{roas, score}] */
    evaluate(cfg, res, ctx, mode, hist = []) {
      const d = res.diag, t = res.totals, tg = this.targets(mode, ctx.budget), aud = d.audience;
      const parts = [], decisions = [], recs = [];
      const part = (key, label, got, max) => { parts.push({ key, label, got: Math.round(got), max }); return got; };
      const dec = (tone, title, body) => decisions.push({ tone, title, body });
      const rec = (lost, text) => { if (lost > 0.5) recs.push({ lost, text }); };

      /* 1. KPI — 40 */
      const roasPts = clamp(t.roas / tg.roas, 0, 1) * 25, ordPts = clamp(res.orders / tg.orders, 0, 1) * 15;
      part('kpi', 'Kết quả KPI', roasPts + ordPts, 40);

      /* 2. Đối tượng — 20 */
      const relPts = clamp((aud.rel - 0.35) / 0.55, 0, 1) * 14;
      const sz = aud.size, sizePts = sz >= 150000 && sz <= 4000000 ? 6 : (sz >= 50000 && sz < 150000) || (sz > 4000000 && sz <= 8000000) ? 3 : 0;
      part('audience', 'Đối tượng', relPts + sizePts, 20);
      const weakest = Object.entries(aud.fits).sort((a, b) => a[1] - b[1])[0];
      if (aud.rel >= 0.8) dec('ok', 'Đối tượng sát khách mua', `Độ phù hợp ${F.num(aud.rel * 100, 0)}/100. Bạn nhắm đúng nhóm có nhu cầu và khả năng mua, nên CTR và CVR đều được cộng điểm.`);
      else if (aud.rel >= 0.55) dec('warn', 'Đối tượng tạm ổn', `Độ phù hợp ${F.num(aud.rel * 100, 0)}/100. Phần kéo điểm xuống nhiều nhất là ${({ age: 'nhóm tuổi', gender: 'giới tính', location: 'khu vực', interest: 'sở thích' })[weakest[0]]} (${F.num(weakest[1] * 100, 0)}/100).`);
      else dec('bad', 'Đối tượng lệch khỏi khách mua', `Độ phù hợp chỉ ${F.num(aud.rel * 100, 0)}/100. Quảng cáo đến nhiều người không có nhu cầu: CTR thấp, CVR thấp và CPM cao hơn. Điểm yếu nhất là ${({ age: 'nhóm tuổi', gender: 'giới tính', location: 'khu vực', interest: 'sở thích' })[weakest[0]]}.`);
      if (aud.broadInterest) dec('warn', 'Không chọn sở thích', 'Để trống sở thích nghĩa là phủ người dùng trung bình (độ phù hợp 45/100). Chọn sở thích sát sản phẩm giúp thuật toán bắt đúng người hơn.');
      if (sz < 50000) dec('bad', 'Đối tượng quá hẹp', `Chỉ ${F.int(sz)} người. Mỗi người thấy quảng cáo nhiều lần (tần suất ${F.num(d.freq, 1)}), người xem mệt, CPM và chi phí chuyển đổi tăng.`);
      else if (d.freq > 2.5) dec('warn', 'Tần suất cao', `Mỗi người thấy quảng cáo trung bình ${F.num(d.freq, 1)} lần. Trên mức 2,5 CTR bắt đầu giảm vì mỏi quảng cáo.`);
      rec(14 - relPts, `Thu hẹp về nhóm tuổi 25–44, nữ, TP.HCM/Hà Nội và sở thích Chăm sóc da/Làm đẹp. Đây là nhóm có độ phù hợp cao nhất với kem chống nắng 290.000 ₫.`);
      rec(6 - sizePts, sz < 150000 ? 'Mở rộng đối tượng (thêm một sở thích gần hoặc thêm khu vực) để tần suất không vượt 2,5.' : 'Thu hẹp bớt đối tượng; tệp quá rộng làm ngân sách loãng.');

      /* 3. Nội dung — 15 */
      const cr = d.creative;
      part('creative', 'Nội dung quảng cáo', cr.score / 100 * 15, 15);
      for (const p of cr.parts) if (p.got < p.max) rec((p.max - p.got) / 100 * 15 * 1.6, `${p.label}: ${p.note}`);
      if (d.policy) dec('bad', 'Cam kết quá mức', `Nội dung có cụm kiểu cam kết tuyệt đối ("${cr.claims.join('", "')}"). Quảng cáo bị hạn chế phân phối: CPM +20%, CVR giảm. Với mỹ phẩm, hãy nói về công dụng đã kiểm chứng.`);
      else if (cr.score >= 75) dec('ok', 'Nội dung đủ sức thuyết phục', `Điểm nội dung ${cr.score}/100: có lợi ích cụ thể, nút kêu gọi khớp mục tiêu.`);
      else dec(cr.score >= 45 ? 'warn' : 'bad', 'Nội dung còn thiếu', `Điểm nội dung ${cr.score}/100. ${cr.parts.filter((p) => p.got < p.max).map((p) => p.note).slice(0, 2).join(' ')}`);

      /* 4. Thiết lập — 15 */
      const objPts = { sales: 7, leads: 3, traffic: 2, awareness: 1 }[cfg.objective] || 0;
      const pl = d.placement;
      const plPts = !pl.manual ? 4 : pl.count === 1 ? 2 : pl.usesNetwork ? 1 : 4;
      const learnPts = res.totals.conversions >= 50 ? 4 : res.totals.conversions >= 25 ? 2 : 0;
      part('setup', 'Thiết lập chiến dịch', objPts + plPts + learnPts, 15);
      if (cfg.objective === 'sales') dec('ok', 'Mục tiêu khớp bài toán', 'Bài toán cần đơn hàng nên "Doanh số" cho thuật toán tìm đúng người sắp mua. Giá mỗi nghìn hiển thị cao hơn nhưng sát đơn nhất.');
      else dec(cfg.objective === 'leads' ? 'warn' : 'bad', `Mục tiêu "${M.objectives[cfg.objective].t}" chưa đúng ưu tiên`,
        { awareness: 'Nhận biết phủ rộng và rẻ nhưng người xem ít có ý định mua ngay; hợp khi thương hiệu cần được biết đến, không hợp khi KPI là đơn hàng.',
          traffic: 'Lưu lượng cho nhiều lượt nhấp nhưng chất lượng ý định thấp: CVR giảm còn khoảng 65%.',
          leads: 'Khách tiềm năng cần đội sale gọi lại và chỉ khoảng 10% chốt đơn. Với bán lẻ online, mua thẳng trên website ít bước hơn.' }[cfg.objective]);
      rec(7 - objPts, 'Đổi mục tiêu sang Doanh số khi KPI là đơn hàng và website đã có pixel/sự kiện mua.');
      if (pl.manual && pl.usesNetwork) dec('warn', 'Có Audience Network', 'Vị trí này rẻ (CPM thấp) nhưng CTR và CVR kém: nhiều lượt hiển thị trên ứng dụng ngoài, hay bấm nhầm.');
      if (pl.narrow) dec('warn', 'Chỉ một vị trí', 'Một vị trí làm kho hiển thị hẹp, CPM tăng ~10% và mất cơ hội thử vị trí tốt hơn.');
      rec(4 - plPts, pl.count === 1 ? 'Chọn thêm 2–3 vị trí (Feed, Reels, Stories) hoặc để tự động để thuật toán phân bổ.' : 'Bỏ Audience Network hoặc để vị trí tự động.');
      if (d.learns) {
        if (t.conversions >= 50) dec('ok', 'Thoát giai đoạn học', `Đạt ${F.int(t.conversions)} chuyển đổi: thuật toán đã đủ dữ liệu để tối ưu${d.learningEnded ? ' từ ngày ' + (d.learningEnded + 1) : ''}.`);
        else dec('warn', 'Chưa thoát giai đoạn học', `Mới ${F.int(t.conversions)}/50 chuyển đổi. Khi ngân sách/ngày quá nhỏ, thuật toán thiếu dữ liệu nên hiệu quả bị trừ ~20% trong phần lớn thời gian chạy.`);
      }
      rec(4 - learnPts, 'Tập trung ngân sách (ít nhóm quảng cáo, ít ngày hơn nhưng mỗi ngày nhiều hơn) để đạt khoảng 50 chuyển đổi và thoát giai đoạn học.');

      /* 5. Quy trình — 10 */
      const n = hist.length + 1, prev = hist[hist.length - 1];
      const procA = Math.min(n, 3) / 3 * 6, procB = prev && t.roas > prev.roas + 1e-9 ? 4 : 0;
      part('process', 'Thử – đo – sửa', procA + procB, 10);
      if (!prev) rec(4, 'Chạy thêm ít nhất một phiên bản, chỉ đổi MỘT thứ mỗi lần (đối tượng, nội dung hoặc ngân sách) để biết thứ nào tạo ra khác biệt.');
      else if (procB === 0) rec(4, 'Phiên bản này chưa hơn lần trước về ROAS. Hãy đọc phần "Vì sao" ở lần trước và chỉ sửa đúng điểm yếu nhất.');

      /* Ngân sách / hiệu quả — diễn giải KPI */
      const total = parts.reduce((s, p) => s + p.got, 0);   // tổng các phần đã làm tròn: số hiển thị luôn cộng khớp
      const perOrderMargin = ctx.aov * ctx.grossMargin;
      const interp = [];
      interp.push(t.roas === null ? 'Chưa có chi tiêu.' : t.roas >= d.breakEvenRoas
        ? `ROAS ${F.x(t.roas)} cao hơn điểm hoà vốn ${F.x(d.breakEvenRoas)} (biên lợi nhuận gộp ${F.pct(ctx.grossMargin, 0)}): chiến dịch lãi khoảng ${F.vnd(d.profit)} trước chi phí cố định.`
        : `ROAS ${F.x(t.roas)} thấp hơn điểm hoà vốn ${F.x(d.breakEvenRoas)}: mỗi 1.000 ₫ quảng cáo mang về ${F.int(t.roas * 1000)} ₫ doanh thu, chưa đủ bù giá vốn (lỗ ${F.vnd(-d.profit)}).`);
      interp.push(t.cpa === null ? 'Không có chuyển đổi nào nên chưa tính được CPA.'
        : `CPA ${F.vnd(t.cpa)}${cfg.objective === 'leads' ? ' / lead' : ''}; lợi nhuận gộp mỗi đơn là ${F.vnd(perOrderMargin)}${t.cpa <= perOrderMargin && cfg.objective !== 'leads' ? ', nên mỗi đơn vẫn có lãi.' : cfg.objective === 'leads' ? '. Lead cần nhân với tỉ lệ chốt 10% mới ra giá mỗi đơn.' : ', nên mỗi đơn đang lỗ.'}`);
      interp.push(`CTR ${F.pct(t.ctr)} (đường cơ sở ${F.pct(M.base ? M.base.ctr : 0.012)}), CVR ${F.pct(t.cvr)}. ${t.ctr !== null && t.ctr < 0.008 ? 'CTR thấp: nội dung hoặc đối tượng chưa chạm đúng người.' : t.cvr !== null && t.cvr < 0.012 ? 'Có nhấp nhưng ít mua: kiểm tra độ khớp giữa đối tượng, mục tiêu và trang đích.' : 'Cả hai chỉ số nằm trong vùng khoẻ.'}`);
      interp.push(`Tiếp cận ${F.int(t.reach)} người với tần suất ${F.num(t.frequency, 2)}; CPM ${F.vnd(t.cpm)}.`);

      return { total: Math.round(total), stars: this.stars(total), parts, decisions, interpretation: interp,
        recommendations: recs.sort((a, b) => b.lost - a.lost).slice(0, 4).map((r) => r.text), targets: tg,
        met: { roas: t.roas !== null && t.roas >= tg.roas, orders: res.orders >= tg.orders } };
    },

    /* Các thí nghiệm "thử thay đổi": mỗi cái đổi MỘT quyết định để người học thấy hệ quả. */
    experiments(cfg, ctx) {
      const out = [];
      out.push({ id: 'badaud', t: 'Nhắm sai đối tượng', why: 'Đổi sang tệp Game, Công nghệ, nam, 18–24 để thấy CVR rơi.',
        apply: (c) => ({ ...c, age: ['a1824'], gender: 'male', interests: ['gaming', 'tech'] }) });
      out.push({ id: 'budget2', t: 'Gấp đôi ngân sách mỗi ngày, chạy ngắn hơn', why: 'Cùng tổng tiền nhưng dồn vào ít ngày hơn: reach tăng, nhưng ROAS có tăng không?',
        apply: (c) => { const daily = Math.min(c.dailyBudget * 2, 1500000), days = M.days.filter((n) => daily * n <= ctx.budget);
          return days.length ? { ...c, dailyBudget: daily, duration: Math.max(...days) } : { ...c, duration: M.days[0], dailyBudget: Math.floor(ctx.budget / M.days[0] / 10000) * 10000 }; } });
      out.push({ id: 'awareness', t: 'Đổi mục tiêu sang Nhận biết', why: 'So sánh reach/CPM với ROAS.',
        apply: (c) => ({ ...c, objective: 'awareness', creative: { ...c.creative, cta: 'learn_more' } }) });
      out.push({ id: 'claim', t: 'Dùng cam kết tuyệt đối', why: 'Xem hạn chế phân phối ảnh hưởng chi phí thế nào.',
        apply: (c) => ({ ...c, creative: { ...c.creative, headline: '100% trắng da ngay lập tức', primary: c.creative.primary + ' Cam kết trắng da ngay.' } }) });
      return out.filter((e) => cfg.objective);
    },
  };
  root.MetaEval = MetaEval;
  if (typeof module !== 'undefined') module.exports = MetaEval;
})(typeof globalThis !== 'undefined' ? globalThis : this);
