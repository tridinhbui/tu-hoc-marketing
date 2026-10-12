/* MARKETING LAB · CHẤM ĐIỂM & PHẢN HỒI CHO SEO — thuần, test được bằng node.
   Tổng 100: Chọn từ khoá 25 · Khả thi (độ khó so với sức mạnh) 20 · Khớp ý định & loại nội dung 20 · Cụm chủ đề & bao phủ 15 ·
   Tiềm năng kinh doanh 10 · Khai thác phân tích đối thủ 10. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const D = root.LAB_SEO || require('./seo-data.js');
  const S = root.SeoSim || require('./seo-sim.js');
  const F = E.fmt, clamp = E.clamp;
  const CL = Object.fromEntries(D.clusters.map((c) => [c.id, c.t]));

  const SeoEval = {
    targets(mode, budget) {
      const t = (D.modes[mode] || D.modes.practice).targets || D.modes.challenge.targets;
      return { roas: t.roas, orders: Math.max(10, Math.round(t.orders * budget / D.modes.challenge.budget)) };
    },
    stars(t) { return t >= 90 ? 3 : t >= 70 ? 2 : t >= 50 ? 1 : 0; },

    evaluate(p, res, ctx, mode, hist = []) {
      const d = res.diag, P = d.pieces, n = P.length || 1, parts = [], decisions = [], recs = [];
      const part = (key, label, got, max) => { parts.push({ key, label, got: Math.round(got), max }); return got; };
      const dec = (tone, title, body) => decisions.push({ tone, title, body });
      const rec = (lost, text) => { if (lost > 0.5) recs.push({ lost, text }); };
      const tg = this.targets(mode, ctx.budget), real = P.filter((x) => !x.already);

      /* 1. Chọn từ khoá — 25 */
      const avgRel = P.reduce((s, x) => s + x.rel, 0) / n;
      const highIntent = P.filter((x) => (x.intent === 'transactional' || x.intent === 'commercial') && x.rel >= 0.7).length, info = P.filter((x) => x.intent === 'informational' && x.rel >= 0.4).length;
      const kwPts = clamp((avgRel - 0.4) / 0.5, 0, 1) * 15 + (highIntent >= 2 ? 6 : highIntent === 1 ? 3 : 0) + (info >= 1 ? 4 : 0);
      part('keywords', 'Chọn từ khoá', kwPts - P.filter((x) => x.already).length * 2, 25);
      dec(avgRel >= 0.75 ? 'ok' : avgRel >= 0.55 ? 'warn' : 'bad', `Độ liên quan trung bình ${F.num(avgRel * 100, 0)}/100`,
        avgRel >= 0.75 ? 'Bạn chọn từ khoá sát sản phẩm và sát người sẽ mua.' : `Một số từ khoá lệch khỏi sản phẩm hoặc khách hàng: ${P.filter((x) => x.rel < 0.5).map((x) => '"' + x.kw + '"').slice(0, 3).join(', ') || 'xem lại danh sách'}. Lượt tìm cao không đồng nghĩa với khách mua.`);
      if (!highIntent) dec('warn', 'Thiếu từ khoá ý định mua/so sánh', 'Toàn bộ nội dung là kiến thức sẽ cho nhiều lượt xem nhưng ít đơn. Cần ít nhất vài bài ở tầng gần mua.');
      if (!info) dec('warn', 'Thiếu nội dung kiến thức', 'Một bài hướng dẫn giúp xây uy tín chủ đề và đón người chưa sẵn sàng mua.');
      const own = P.filter((x) => x.already);
      if (own.length) dec('bad', 'Viết bài cho từ khoá đã xếp hạng 1', `${own.map((x) => '"' + x.kw + '"').join(', ')} là từ khoá thương hiệu của bạn, đã đứng đầu. Bài mới không tạo thêm lưu lượng.`);
      rec(15 - clamp((avgRel - 0.4) / 0.5, 0, 1) * 15, 'Thay từ khoá chung hoặc ngoài phạm vi ("làm đẹp", "trẻ em", "nâng tone") bằng từ khoá theo loại da, hoàn cảnh sử dụng và mua hàng.');
      rec(6 - (highIntent >= 2 ? 6 : highIntent === 1 ? 3 : 0), 'Thêm 2–3 bài ở tầng gần mua: danh mục, so sánh, trang sản phẩm cho từ khoá có ý định mua.');

      /* 2. Khả thi — 20 */
      const reach = real.filter((x) => x.pos <= 10).length / (real.length || 1), quick = real.filter((x) => x.pos <= 5).length;
      part('feasible', 'Khả thi với sức mạnh hiện tại', reach * 14 + (quick >= 1 ? 6 : quick === 0 && real.some((x) => x.pos <= 10) ? 3 : 0), 20);
      const hard = real.filter((x) => x.pos > 20);
      if (hard.length) dec('bad', `${hard.length} bài gần như không thể lên top`, `${hard.map((x) => `"${x.kw}" (KD ${x.kd}, dự kiến vị trí ${x.pos})`).slice(0, 3).join('; ')}. Website mới (authority ${D.authority}) khó cạnh tranh từ khoá khó; hãy bắt đầu bằng từ khoá dài, KD thấp rồi xây dần.`);
      else dec('ok', 'Kế hoạch trong tầm với', `${F.pct(reach, 0)} bài có thể vào top 10 với sức mạnh hiện tại.`);
      rec(14 - reach * 14, 'Thay các từ khoá KD > 55 bằng biến thể dài hơn (theo loại da, hoàn cảnh) hoặc viết nhiều bài cùng cụm để tăng sức mạnh chủ đề.');
      rec(6 - (quick >= 1 ? 6 : 0), 'Giữ ít nhất một "chiến thắng nhanh": từ khoá KD dưới 35 với nội dung khớp ý định.');

      /* 3. Khớp ý định & loại nội dung — 20 */
      const fit = P.reduce((s, x) => s + x.fit, 0) / n;
      part('fit', 'Khớp ý định & loại nội dung', fit * 20, 20);
      const mis = P.filter((x) => x.fit < 0.5);
      if (mis.length) dec('bad', 'Loại nội dung không khớp ý định', mis.map((x) => `"${x.kw}" (${{ transactional: 'sắp mua', commercial: 'so sánh', informational: 'tìm hiểu', navigational: 'tìm thương hiệu' }[x.intent]}) làm bằng ${D.types[x.type].t.toLowerCase()}`).slice(0, 3).join('; ') + '. Google xếp hạng trang trả lời đúng ý định, nên bài sai loại rất khó lên top.');
      else dec('ok', 'Nội dung khớp ý định', `Độ khớp trung bình ${F.num(fit * 100, 0)}/100.`);
      rec(20 - fit * 20, 'Dùng trang sản phẩm/danh mục cho từ khoá mua, bài so sánh cho từ khoá cân nhắc, bài hướng dẫn hoặc hỏi đáp cho từ khoá tìm hiểu.');

      /* 4. Cụm chủ đề & bao phủ — 15 */
      const sel = p.shortlist.filter((id) => p.clusters[id] !== undefined);
      const correct = sel.filter((id) => (D.keywords.find((k) => k.id === id) || {}).cluster === p.clusters[id]).length;
      const clAcc = sel.length ? correct / sel.length : 0;
      const byCl = {}; for (const x of P) byCl[x.cluster] = (byCl[x.cluster] || 0) + 1;
      const deepShare = P.filter((x) => x.cluster !== 'out' && byCl[x.cluster] >= 2).length / n;
      part('clusters', 'Cụm chủ đề & bao phủ', clAcc * 8 + deepShare * 7, 15);
      if (sel.length) dec(clAcc >= 0.8 ? 'ok' : clAcc >= 0.5 ? 'warn' : 'bad', `Phân nhóm đúng ${correct}/${sel.length}`, clAcc >= 0.8 ? 'Bạn nhìn ra các cụm chủ đề đúng, nên nội dung có thể liên kết nội bộ với nhau.' : 'Một số từ khoá bị xếp sai cụm. Cụm chủ đề dựa trên cùng nhu cầu của người tìm, không chỉ trùng từ.');
      else dec('warn', 'Chưa phân nhóm từ khoá', 'Phân nhóm giúp bạn thấy cụm nào còn thiếu bài và cụm nào đã đủ.');
      dec(deepShare >= 0.6 ? 'ok' : 'warn', `Chiều sâu chủ đề: ${F.pct(deepShare, 0)} bài thuộc cụm có từ 2 bài`, deepShare >= 0.6 ? 'Nhiều bài cùng cụm giúp trang web được coi là chuyên về chủ đề, vị trí của các bài hỗ trợ lẫn nhau.' : 'Mỗi cụm chỉ một bài sẽ không tạo được sức mạnh chủ đề. Tập trung vào 2–3 cụm và viết sâu.');
      rec(7 - deepShare * 7, 'Gom bài vào 2–3 cụm chủ đề (ví dụ: loại da, mua hàng) thay vì rải mỗi cụm một bài.');
      rec(8 - clAcc * 8, 'Xếp lại cụm cho đúng: từ khoá cùng nhu cầu người tìm thì cùng cụm.');

      /* 5. Tiềm năng kinh doanh — 10 */
      part('business', 'Tiềm năng kinh doanh', clamp(d.orders12 / tg.orders, 0, 1) * 5 + clamp((d.roas12 || 0) / tg.roas, 0, 1) * 5, 10);

      /* 6. Khai thác phân tích đối thủ — 10 */
      const gapIds = new Set(); for (const c of D.competitors) S.competitor(c.id).gap.forEach((k) => gapIds.add(k.id));
      const inGap = P.filter((x) => gapIds.has(x.id)).length / n, picked = p.opps.length;
      part('gap', 'Khai thác phân tích đối thủ', inGap * 6 + (picked >= 1 ? 4 : 0), 10);
      dec(inGap >= 0.5 ? 'ok' : 'warn', `${F.pct(inGap, 0)} bài lấy từ khoảng trống đối thủ`, inGap >= 0.5 ? 'Bạn nhắm vào từ khoá mà đối thủ đã chứng minh có nhu cầu và bạn chưa có mặt.' : 'Xem tab Đối thủ: từ khoá đối thủ đã lên top 10 mà bạn chưa có là nguồn ý tưởng đã được kiểm chứng.');
      rec(10 - inGap * 6 - (picked >= 1 ? 4 : 0), 'Mở phân tích đối thủ, chọn các từ khoá khoảng trống có điểm cơ hội cao và đưa vào kế hoạch.');

      /* diễn giải */
      const interp = [`Kế hoạch ${P.length} bài, chi phí nội dung ${F.vnd(d.cost)}. Dự kiến tháng 6: ${F.int(d.month6.visits)} lượt truy cập/tháng; sau 12 tháng: ${F.int(d.orders12)} đơn, doanh thu ${F.vnd(res.totals.revenue)}.`,
        d.payback ? `Hoàn vốn nội dung vào tháng ${d.payback}. SEO chậm hơn quảng cáo trả phí nhưng không phải trả tiền cho từng lượt nhấp.` : 'Trong 12 tháng chưa hoàn vốn chi phí nội dung.',
        `ROAS 12 tháng ${F.x(d.roas12)} (mục tiêu ${F.x(tg.roas)}); mục tiêu số đơn ${tg.orders}, dự kiến ${F.int(d.orders12)}.`];
      const total = parts.reduce((s, x) => s + x.got, 0), prev = hist[hist.length - 1];
      return { total: Math.max(0, Math.round(total)), stars: this.stars(total), parts, decisions, interpretation: interp, targets: tg,
        recommendations: recs.sort((a, b) => b.lost - a.lost).slice(0, 4).map((r) => r.text), improved: prev ? d.roas12 > prev.roas : null };
    },

    experiments(p) {
      if (!p.plan.length) return [];
      return [
        { id: 'allblog', t: 'Làm mọi bài thành bài viết hướng dẫn', why: 'Xem độ khớp ý định giảm thế nào với từ khoá mua hàng.', apply: (x) => ({ ...x, plan: x.plan.map((i) => ({ ...i, type: 'blog' })) }) },
        { id: 'hard', t: 'Đổi từ khoá đầu tiên sang "kem chống nắng"', why: 'Từ khoá lượt tìm lớn nhưng KD 78: website mới lên được không?', apply: (x) => ({ ...x, plan: [{ id: 'k1', type: 'category' }, ...x.plan.slice(1)] }) },
        { id: 'spread', t: 'Mỗi bài một cụm khác nhau', why: 'Mất sức mạnh chủ đề khi không có bài hỗ trợ cùng cụm.', apply: (x) => { const ids = ['s12', 's3', 's6', 's7', 'k2', 's14', 's8', 's9']; return { ...x, plan: x.plan.map((i, n) => ({ ...i, id: ids[n % ids.length] })) }; } },
      ];
    },
  };
  root.SeoEval = SeoEval;
  if (typeof module !== 'undefined') module.exports = SeoEval;
})(typeof globalThis !== 'undefined' ? globalThis : this);
