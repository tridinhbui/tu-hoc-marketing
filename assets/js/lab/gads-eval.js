/* MARKETING LAB · CHẤM ĐIỂM & PHẢN HỒI CHO GOOGLE ADS — thuần, test được bằng node.
   Tổng 100: KPI 35 · Từ khoá & ý định 20 · Phủ định & kiểu khớp 10 · Quảng cáo & trang đích 15 · Giá thầu & ngân sách 10 · Thử–đo–sửa 10. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const G = root.LAB_GADS || require('./gads-data.js');
  const F = E.fmt, clamp = E.clamp;

  const GadsEval = {
    targets(mode, budget) {
      const t = (G.modes[mode] || G.modes.practice).targets || G.modes.challenge.targets;
      return { roas: t.roas, orders: Math.max(5, Math.round(t.orders * budget / G.modes.challenge.budget)) };
    },
    stars(total) { return total >= 90 ? 3 : total >= 70 ? 2 : total >= 50 ? 1 : 0; },

    evaluate(cfg, res, ctx, mode, hist = []) {
      const d = res.diag, t = res.totals, tg = this.targets(mode, ctx.budget);
      const parts = [], decisions = [], recs = [];
      const part = (key, label, got, max) => { parts.push({ key, label, got: Math.round(got), max }); return got; };
      const dec = (tone, title, body) => decisions.push({ tone, title, body });
      const rec = (lost, text) => { if (lost > 0.5) recs.push({ lost, text }); };
      const kws = d.keywords, cost = kws.reduce((s, k) => s + k.cost, 0) || 1;
      const wavg = (f) => kws.reduce((s, k) => s + f(k) * k.cost, 0) / cost;

      /* 1. KPI — 35 */
      part('kpi', 'Kết quả KPI', clamp((t.roas || 0) / tg.roas, 0, 1) * 22 + clamp(res.orders / tg.orders, 0, 1) * 13, 35);

      /* 2. Từ khoá & ý định — 20 */
      const relAvg = wavg((k) => k.relevance), buy = kws.filter((k) => (k.intent === 'transactional' || k.intent === 'commercial') && k.relevance >= 0.6 && !k.blocked).length;
      const wastePts = (1 - clamp(d.wasteShare / 0.3, 0, 1)) * 10, kwPts = clamp((relAvg - 0.3) / 0.6, 0, 1) * 6 + (buy >= 3 ? 4 : buy >= 1 ? 2 : 0);
      part('keywords', 'Từ khoá & ý định', Math.min(20, wastePts * 0.6 + kwPts + (d.wasteShare < 0.05 ? 4 : 0)), 20);
      if (!kws.length) dec('bad', 'Chưa có từ khoá', 'Không có từ khoá nên quảng cáo không hiển thị.');
      else {
        dec(relAvg >= 0.8 ? 'ok' : relAvg >= 0.55 ? 'warn' : 'bad', `Độ liên quan của từ khoá: ${F.num(relAvg * 100, 0)}/100`,
          relAvg >= 0.8 ? 'Phần lớn tiền đi vào từ khoá đúng sản phẩm và có ý định mua/so sánh.'
            : `Tiền đang đổ vào từ khoá chung hoặc sai đối tượng (${kws.filter((k) => k.relevance < 0.5).map((k) => '"' + k.kw + '"').slice(0, 3).join(', ') || 'một số từ khoá'}).`);
        if (d.wasteShare >= 0.15) dec('bad', `Lãng phí ${F.pct(d.wasteShare, 0)} chi tiêu`, `${F.vnd(d.wasteSpend)} đã chi cho cụm từ tìm kiếm không liên quan (xem báo cáo cụm từ tìm kiếm). Thêm từ khoá phủ định hoặc đổi kiểu khớp.`);
        else if (d.wasteShare >= 0.05) dec('warn', `Lãng phí ${F.pct(d.wasteShare, 0)} chi tiêu`, 'Còn vài cụm từ tìm kiếm không mua lọt vào. Xem báo cáo cụm từ tìm kiếm để thêm phủ định.');
        else dec('ok', 'Chi tiêu sạch', 'Hầu như không có tiền chi vào cụm từ không liên quan.');
        if (!buy) dec('warn', 'Thiếu từ khoá ý định mua', 'Hãy thêm từ khoá có ý định mua hoặc so sánh rõ như "mua kem chống nắng" hoặc "kem chống nắng cho da dầu".');
      }
      rec(10 - wastePts, 'Mở báo cáo cụm từ tìm kiếm, thêm phủ định cho các cụm không mua (miễn phí, là gì, tự làm, cho bé).');
      rec(10 - kwPts, 'Thay từ khoá chung ("làm đẹp", "mỹ phẩm") bằng từ khoá dài, đúng sản phẩm: da dầu, không bết dính, mua…');

      /* 3. Phủ định & kiểu khớp — 10 */
      const broadCost = kws.filter((k) => k.match === 'broad' && !/nắng mai/.test(k.kw)).reduce((s, k) => s + k.cost, 0) / cost;
      const negPts = (1 - clamp(d.wasteShare / 0.15, 0, 1)) * 6, matchPts = broadCost <= 0.2 ? 4 : broadCost <= 0.6 ? 2 : 0;
      part('match', 'Phủ định & kiểu khớp', negPts + matchPts, 10);
      if (cfg.negatives.length) dec('ok', `Đã có ${cfg.negatives.length} từ khoá phủ định`, 'Phủ định cắt trước khi tốn tiền: là công cụ rẻ nhất để giảm chi phí.');
      else dec('warn', 'Chưa có từ khoá phủ định', 'Không phủ định nghĩa là chấp nhận mọi truy vấn khớp, kể cả người tìm đồ miễn phí hay đang tìm hiểu.');
      if (broadCost > 0.6) dec('warn', 'Quá nhiều khớp rộng', `${F.pct(broadCost, 0)} chi tiêu qua khớp rộng. Khớp rộng cho nhiều lượt hiển thị nhưng kéo cả truy vấn ngoài ý định.`);
      rec(6 - negPts, 'Thêm từ khoá phủ định dựa trên báo cáo cụm từ tìm kiếm.');
      rec(4 - matchPts, 'Dùng khớp cụm từ/khớp chính xác cho các từ khoá cốt lõi; chỉ dùng khớp rộng khi đã có đủ phủ định.');

      /* 4. Quảng cáo & trang đích — 15 */
      const lpAvg = wavg((k) => k.lp), adPts = d.aq.score / 100 * 8, lpPts = clamp((lpAvg - 0.4) / 0.5, 0, 1) * 7;
      part('ad', 'Quảng cáo & trang đích', adPts + lpPts, 15);
      if (d.policy) dec('bad', 'Cam kết quá mức', `Có cụm kiểu cam kết tuyệt đối ("${d.aq.claims.join('", "')}"). Quảng cáo bị hạn chế: CPC +15%, CVR giảm.`);
      else dec(d.aq.score >= 70 ? 'ok' : 'warn', `Chất lượng quảng cáo ${d.aq.score}/100`, d.aq.parts.filter((p) => p.got < p.max).map((p) => p.note).slice(0, 2).join(' ') || 'Có đủ tiêu đề, lợi ích, ưu đãi và kêu gọi.');
      dec(lpAvg >= 0.8 ? 'ok' : lpAvg >= 0.6 ? 'warn' : 'bad', `Trang đích: ${d.landing.t}`, lpAvg >= 0.8 ? 'Khớp với ý định của phần lớn lượt tìm kiếm bạn mua.' : `Độ khớp ${F.num(lpAvg * 100, 0)}/100 với ý định tìm kiếm. ${d.landing.d}`);
      const covered = kws.filter((k) => k.adRel >= 0.99).length;
      if (kws.length && covered < kws.length) dec('warn', 'Quảng cáo chưa nhắc từ khoá', `${kws.length - covered}/${kws.length} từ khoá không xuất hiện đủ trong tiêu đề, nên điểm chất lượng (QS trung bình ${F.num(d.qs, 1)}) bị kéo xuống. Nhóm từ khoá cùng chủ đề và để quảng cáo nhắc đúng từ khoá.`);
      for (const p of d.aq.parts) if (p.got < p.max) rec((p.max - p.got) / 85 * 8 * 1.5, `${p.label}: ${p.note}`);
      rec(7 - lpPts, 'Chọn trang đích khớp ý định: trang sản phẩm cho người sắp mua, bài hướng dẫn chỉ cho từ khoá tìm hiểu.');

      /* 5. Giá thầu & ngân sách — 10 */
      const spendPts = d.underSpend <= 0.15 ? 3 : d.underSpend <= 0.5 ? 1.5 : 0, lostPts = d.lostToBudget <= 0.15 ? 3 : d.lostToBudget <= 0.35 ? 1.5 : 0;
      const fit = cfg.objective === 'traffic' ? (cfg.bidStrategy === 'maxclicks' ? 4 : 3) : (cfg.bidStrategy === 'maxclicks' ? 1 : 4);
      part('bid', 'Giá thầu & ngân sách', spendPts + lostPts + fit, 10);
      dec(fit >= 3 ? 'ok' : 'warn', `Chiến lược giá thầu: ${G.bidStrategies[cfg.bidStrategy].t}`,
        cfg.bidStrategy === 'maxclicks' && cfg.objective !== 'traffic' ? 'Tối đa hoá lượt nhấp kéo về nhiều người xem, ít người mua, khi mục tiêu là đơn hàng. Hãy đổi sang tối đa hoá chuyển đổi hoặc đặt giá thủ công.'
          : cfg.bidStrategy === 'maxconv' && !d.learned ? `Mới ${F.int(t.conversions)}/30 chuyển đổi nên giá thầu tự động chưa ổn định.` : 'Phù hợp với mục tiêu của chiến dịch.');
      if (d.underSpend > 0.3) dec('warn', 'Ngân sách dùng chưa hết', `Chỉ chi ${F.pct(1 - d.underSpend, 0)} ngân sách. Giá thầu thấp, thị phần hiển thị chỉ ${F.pct(d.impressionShare, 0)} hoặc từ khoá quá hẹp: bạn bỏ lỡ nhu cầu có thật.`);
      if (d.lostToBudget > 0.25) dec('warn', 'Bị giới hạn bởi ngân sách', `Khoảng ${F.pct(d.lostToBudget, 0)} cơ hội bị mất vì hết ngân sách ngày. Có thể dồn tiền vào từ khoá hiệu quả nhất thay vì rải đều.`);
      rec(3 - spendPts, 'Tăng giá thầu hoặc mở rộng từ khoá để dùng hết ngân sách có ích.');
      rec(3 - lostPts, 'Ngân sách ngày chưa đủ cho số từ khoá: bỏ từ khoá kém hiệu quả để dồn tiền.');
      rec(4 - fit, 'Với mục tiêu doanh số, dùng tối đa hoá chuyển đổi hoặc giá thủ công thay vì tối đa hoá lượt nhấp.');

      /* 6. Quy trình — 10 */
      const n = hist.length + 1, prev = hist[hist.length - 1];
      const procA = Math.min(n, 3) / 3 * 6, procB = prev && t.roas > prev.roas + 1e-9 ? 4 : 0;
      part('process', 'Thử – đo – sửa', procA + procB, 10);
      if (!prev) rec(4, 'Chạy thêm một phiên bản, chỉ đổi MỘT thứ (từ khoá, phủ định hoặc trang đích) để thấy tác động.');
      else if (!procB) rec(4, 'Phiên bản này chưa hơn lần trước về ROAS; hãy đọc báo cáo cụm từ tìm kiếm trước khi sửa.');

      const total = parts.reduce((s, p) => s + p.got, 0), perOrder = ctx.aov * ctx.grossMargin, interp = [];
      interp.push(t.roas === null ? 'Chưa có chi tiêu.' : t.roas >= d.breakEvenRoas
        ? `ROAS ${F.x(t.roas)} cao hơn hoà vốn ${F.x(d.breakEvenRoas)}: lãi khoảng ${F.vnd(d.profit)} trước chi phí cố định.`
        : `ROAS ${F.x(t.roas)} thấp hơn hoà vốn ${F.x(d.breakEvenRoas)}: mỗi 1.000 ₫ quảng cáo chỉ mang về ${F.int(t.roas * 1000)} ₫ doanh thu (lỗ ${F.vnd(-d.profit)}).`);
      interp.push(t.cpa === null ? 'Chưa có chuyển đổi nên chưa tính được CPA.' : `CPA ${F.vnd(t.cpa)}${d.isLead ? ' mỗi lead' : ''}; lợi nhuận gộp mỗi đơn ${F.vnd(perOrder)}${!d.isLead ? (t.cpa <= perOrder ? ': mỗi đơn đều có lãi.' : ': mỗi đơn đang lỗ.') : '. Cần nhân với tỉ lệ chốt 10%.'}`);
      interp.push(`CTR ${F.pct(t.ctr)} · CPC ${F.vnd(t.cpc)} · CVR ${F.pct(t.cvr)}. ${t.ctr !== null && t.ctr < 0.03 ? 'CTR thấp: từ khoá lệch ý định hoặc quảng cáo không nhắc đúng nhu cầu.' : t.cvr !== null && t.cvr < 0.015 ? 'Có nhấp nhưng ít mua: kiểm tra trang đích và ý định của cụm từ tìm kiếm.' : 'CTR và CVR trong vùng khoẻ.'}`);
      interp.push(`Thị phần hiển thị ${F.pct(d.impressionShare, 0)}; điểm chất lượng trung bình ${F.num(d.qs, 1)}/10.`);

      return { total: Math.round(total), stars: this.stars(total), parts, decisions, interpretation: interp,
        recommendations: recs.sort((a, b) => b.lost - a.lost).slice(0, 4).map((r) => r.text), targets: tg,
        met: { roas: t.roas !== null && t.roas >= tg.roas, orders: res.orders >= tg.orders } };
    },

    experiments(cfg) {
      if (!cfg.objective) return [];
      return [
        { id: 'nonegs', t: 'Bỏ toàn bộ từ khoá phủ định', why: 'Xem cụm từ lạ lọt vào và kéo tiền đi đâu.', apply: (c) => ({ ...c, negatives: [] }) },
        { id: 'broadjunk', t: 'Thêm từ khoá chung "làm đẹp" khớp rộng', why: 'Nhiều lượt hiển thị hơn, nhưng là ai?', apply: (c) => ({ ...c, negatives: [], keywords: c.keywords.some((k) => k.id === 'k14') ? c.keywords : [...c.keywords, { id: 'k14', match: 'broad' }] }) },
        { id: 'home', t: 'Đổi trang đích sang Trang chủ', why: 'Cùng người tìm, nhưng họ phải tự tìm sản phẩm.', apply: (c) => ({ ...c, landing: 'home' }) },
        { id: 'lowbid', t: 'Hạ giá thầu thủ công xuống 1.500 ₫', why: 'CPC rẻ, nhưng bạn còn xuất hiện không?', apply: (c) => ({ ...c, bidStrategy: 'manual', bid: 1500 }) },
        { id: 'claim', t: 'Dùng cam kết tuyệt đối trong tiêu đề', why: 'Xem hạn chế phân phối ảnh hưởng chi phí thế nào.', apply: (c) => ({ ...c, ad: { ...c.ad, h: ['Trắng da 100% sau 1 ngày', ...c.ad.h.slice(1)] } }) },
      ];
    },
  };
  root.GadsEval = GadsEval;
  if (typeof module !== 'undefined') module.exports = GadsEval;
})(typeof globalThis !== 'undefined' ? globalThis : this);
