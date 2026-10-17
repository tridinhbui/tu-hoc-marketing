/* MARKETING LAB · XƯỞNG CHIẾN LƯỢC — mô hình và chấm điểm. Thuần, không DOM, không mạng, không Math.random.
   Không chấm "đúng đáp án": chấm độ NHẤT QUÁN của chuỗi lập luận (bằng chứng → khách → định vị → thông điệp → kênh → ngân sách → KPI → thí nghiệm)
   và độ trung thực khi đọc kết quả. Hai chiến lược khác hẳn nhau đều có thể đạt điểm cao (kiểm ở tests/strategy-lab.test.mjs).
   Tổng 100 = Kế hoạch 80 (Bằng chứng 16 · Khách & định vị 12 · Thông điệp & kênh 12 · Ngân sách 12 · KPI 12 · Thí nghiệm 16) + Đọc kết quả 20. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const D = root.LAB_STRATEGY || require('./strategy-data.js');
  const clamp = E.clamp;
  const plain = (s) => String(s || '').replace(/\s+/g, ' ').trim();
  const words = (s) => plain(s).split(' ').filter(Boolean).length;

  const SC = (id) => D.scenarios[id];
  const seg = (sc, id) => sc.segments.find((x) => x.id === id);
  const pos = (sc, id) => sc.positions.find((x) => x.id === id);
  const msg = (sc, id) => sc.messages.find((x) => x.id === id);
  const kpi = (sc, id) => sc.kpis.find((x) => x.id === id);

  /* ---- kinh tế đơn vị của một đơn đầu, theo nhóm khách và phí kênh ---- */
  function profitPerOrder(sc, segId, fee) {
    const s = seg(sc, segId) || { aovMult: 1, marginMult: 1 }, e = sc.economics;
    return e.aov * s.aovMult * (e.margin * s.marginMult - (fee || 0)) * (1 - (e.refund || 0));
  }
  /* Trần CAC hoà vốn đơn đầu cho nhóm khách (không tính phí kênh). */
  function ceiling(sc, segId) { return profitPerOrder(sc, segId, 0); }

  /* ---- ước lượng theo kênh: chi tiêu → đơn, lượt truy cập, CAC ----
     Hiệu quả = lượt (chi/cpc) × tỉ lệ chốt × hệ số khớp khách (0,4 + 0,8 × fit) × hệ số trễ.
     Dưới mức tối thiểu: ×0,6 (chưa thoát giai đoạn học). Vượt trần kênh: phần vượt chỉ có 35% hiệu quả. */
  function channelModel(sc, ch, segId, spend) {
    if (!spend || spend <= 0) return { spend: 0, orders: 0, visits: 0, cac: null, under: false, over: false, profit: 0 };
    const fit = (ch.fit && ch.fit[segId]) || 0;
    const fitMult = 0.4 + 0.8 * fit;
    const under = spend < ch.min, over = spend > ch.cap;
    const eff = under ? 0.6 : 1;
    const s = Math.min(spend, ch.cap) + Math.max(0, spend - ch.cap) * 0.35;
    const units = s / ch.cpc;
    let orders = units * ch.cvr * fitMult * eff * (ch.lag == null ? 1 : ch.lag);
    if (ch.listSize === 0) orders = 0;                                   // kênh cần danh sách mà chưa có danh sách
    if (ch.maxOrders != null) orders = Math.min(orders, ch.maxOrders);
    const visits = ch.web === false ? 0 : units;
    const ppo = profitPerOrder(sc, segId, ch.fee);
    return { spend, orders, visits, cac: orders > 0 ? spend / orders : null, under, over, profit: orders * ppo - spend, ppo };
  }

  function model(plan) {
    const sc = SC(plan.scenario), segId = plan.segment, a = plan.alloc || {};
    const rows = sc.channels.map((ch) => channelModel(sc, ch, segId, sc.budget * ((a[ch.id] || 0) / 100)));
    const tot = rows.reduce((t, r) => ({ spend: t.spend + r.spend, orders: t.orders + r.orders, visits: t.visits + r.visits, profit: t.profit + r.profit }), { spend: 0, orders: 0, visits: 0, profit: 0 });
    const active = sc.channels.filter((ch) => (a[ch.id] || 0) > 0);
    const cac = tot.orders > 0 ? tot.spend / tot.orders : null;
    return { rows, ...tot, cac, ceiling: ceiling(sc, segId), reserve: a.reserve || 0, active,
      weeklyVisits: tot.visits / (sc.months * 4.33) };
  }

  /* ---- cỡ mẫu mỗi nhánh để thấy mức tăng tương đối `rel` ở tỉ lệ nền p0 (α = 0,05 hai phía, power 80%) ---- */
  function sampleSize(p0, rel) {
    const p1 = p0 * (1 + rel), pb = (p0 + p1) / 2, za = 1.96, zb = 0.8416;
    const d = Math.abs(p1 - p0);
    if (!(d > 0)) return Infinity;
    return Math.ceil(Math.pow(za * Math.sqrt(2 * pb * (1 - pb)) + zb * Math.sqrt(p0 * (1 - p0) + p1 * (1 - p1)), 2) / (d * d));
  }
  const CTR_BASE = 0.012;     // CTR quảng cáo nền (giả lập), dùng khi chọn CTR làm chỉ số chính
  const CTR_FACTOR = { message: 0.9, creative: 1.4, offer: 0.5, audience: 0.8, landing: 0, price: 0.2 };

  function expBase(sc, metric) { return metric === 'ctr' ? CTR_BASE : sc.site.baseCvr; }
  /* Số quan sát mỗi nhánh có được trong `weeks` tuần: lượt truy cập (cvr, cpa) hoặc lượt hiển thị (ctr). */
  function availablePerArm(sc, m, plan) {
    const ex = plan.exp || {}, weeks = ex.weeks || 0;
    const visits = m.weeklyVisits * weeks * 0.5;
    return ex.metric === 'ctr' ? visits / CTR_BASE : visits;
  }

  /* ---- sinh kết quả thí nghiệm giả lập: có hạt, có nhiễu ngẫu nhiên đúng cỡ mẫu ---- */
  function normal(rand) { let u = 0, v = 0; while (u === 0) u = rand(); while (v === 0) v = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function simulateExperiment(plan) {
    const sc = SC(plan.scenario), m = model(plan), ex = plan.exp || {};
    const metric = ex.metric === 'ctr' ? 'ctr' : 'cvr';             // CPA suy ra từ CVR
    const n = Math.max(0, Math.floor(availablePerArm(sc, m, plan)));
    const p0 = expBase(sc, metric);
    const trueRel = (sc.truth[ex.variable] || 0) * (metric === 'ctr' ? (CTR_FACTOR[ex.variable] == null ? 0.5 : CTR_FACTOR[ex.variable]) : 1);
    const p1 = clamp(p0 * (1 + trueRel), 0, 1);
    const rand = E.rng(sc.seed + E.hash(`${ex.variable}|${metric}|${ex.weeks}|${Math.round(n)}`));
    const draw = (p) => Math.max(0, Math.round(n * p + Math.sqrt(n * p * (1 - p)) * normal(rand)));
    const xa = draw(p0), xb = draw(p1);
    const ra = n ? xa / n : 0, rb = n ? xb / n : 0, diff = rb - ra;
    const se = n ? Math.sqrt(ra * (1 - ra) / n + rb * (1 - rb) / n) : Infinity;
    const lo = diff - 1.96 * se, hi = diff + 1.96 * se;
    /* Chỉ số bảo vệ: tỉ lệ hoàn hàng của đơn trong thí nghiệm. */
    const g = sc.guardrailTruth, visitsPerArm = metric === 'ctr' ? n * CTR_BASE : n, orders = Math.max(0, Math.round(visitsPerArm * 2 * sc.site.baseCvr));
    const na = Math.max(1, Math.round(orders / 2)), nb = na;
    const gA = clamp(g.return, 0, 1), gB = clamp(g.return + g.returnDelta, 0, 1);
    const ya = Math.max(0, Math.round(na * gA + Math.sqrt(na * gA * (1 - gA)) * normal(rand))), yb = Math.max(0, Math.round(nb * gB + Math.sqrt(nb * gB * (1 - gB)) * normal(rand)));
    return { metric, n, xa, xb, ra, rb, diff, rel: ra > 0 ? diff / ra : null, lo, hi, relLo: ra > 0 ? lo / ra : null, relHi: ra > 0 ? hi / ra : null,
      sig: n > 0 && (lo > 0 || hi < 0), guard: { na, nb, ya, yb, ra: ya / na, rb: yb / nb }, trueRel };
  }

  /* ---- các quyết định có thể bảo vệ được trước một kết quả ---- */
  function defensible(res, plan) {
    const ex = plan.exp || {}, scaleIf = (ex.scaleIf || 0) / 100;
    if (!res.n) return ['extend', 'iterate'];
    if (res.sig && res.diff > 0) return res.relLo >= scaleIf * 0.5 ? ['scale', 'iterate'] : ['scale', 'iterate', 'extend'];
    if (res.sig && res.diff < 0) return ['stop', 'iterate'];
    // không đủ bằng chứng: không được nhảy sang "scale"; khoảng tin cậy rộng → kéo dài; hẹp quanh 0 → đổi biến
    const narrowAroundZero = res.relHi != null && res.relHi < Math.max(0.05, (ex.stopIf || 0) / 100);
    return narrowAroundZero ? ['stop', 'iterate'] : ['extend', 'iterate'];
  }

  /* ---- thiếu gì thì chưa thể sang bước sau ---- */
  function missing(plan) {
    const sc = SC(plan.scenario), out = {}, a = plan.alloc || {};
    out.research = (plan.opened || []).length >= 2 ? [] : ['Mở ít nhất 2 nguồn nghiên cứu'];
    out.strategy = [!plan.segment && 'Chọn nhóm khách mục tiêu', !plan.position && 'Chọn định vị', words(plan.give) < 3 && 'Nêu điều bạn chấp nhận bỏ (≥ 3 chữ)', words(plan.why) < 6 && 'Viết lý do chọn, dựa vào nguồn bạn đã mở (≥ 6 chữ)'].filter(Boolean);
    out.message = [!plan.message && 'Chọn một hướng thông điệp', words(plan.headline) < 3 && 'Viết một tiêu đề quảng cáo của riêng bạn (≥ 3 chữ)'].filter(Boolean);
    const sum = Object.values(a).reduce((s, x) => s + (+x || 0), 0);
    out.budget = sum === 100 ? [] : [`Tổng phân bổ đang là ${sum}%, cần đúng 100%`];
    const k = plan.kpis || {};
    out.kpi = [(k.picked || []).length < 3 && 'Chọn ít nhất 3 chỉ số', !(k.targets && +k.targets.cac > 0) && 'Đặt mục tiêu CAC (số tiền)', !(k.targets && +k.targets.orders > 0) && 'Đặt mục tiêu số đơn'].filter(Boolean);
    const ex = plan.exp || {}, h = ex.hypothesis || {};
    out.experiment = [!ex.variable && 'Chọn một biến để thử', !ex.metric && 'Chọn chỉ số chính', !(ex.mde > 0) && 'Chọn mức thay đổi muốn phát hiện', !(ex.weeks > 0) && 'Chọn số tuần chạy',
      words(h.change) < 2 && 'Giả thuyết: Nếu bạn thay đổi gì', words(h.effect) < 2 && 'Giả thuyết: thì điều gì xảy ra', words(h.because) < 3 && 'Giả thuyết: vì sao bạn tin vậy',
      !(+ex.scaleIf > 0) && 'Đặt ngưỡng "mở rộng nếu tăng ≥ …%"', !(ex.stopIf >= 0 && ex.stopIf !== '' && ex.stopIf != null) && 'Đặt ngưỡng "dừng nếu tăng < …%"'].filter(Boolean);
    return out;
  }

  /* ---- chấm kế hoạch ---- */
  function scorePlan(plan) {
    const sc = SC(plan.scenario), m = model(plan), a = plan.alloc || {}, parts = [], notes = [];
    const part = (key, label, got, max) => { parts.push({ key, label, got: Math.round(clamp(got, 0, max)), max }); };
    const note = (tone, title, body) => notes.push({ tone, title, body });
    const opened = (plan.opened || []).map((id) => sc.research.find((r) => r.id === id)).filter(Boolean);
    const position = pos(sc, plan.position), segment = seg(sc, plan.segment), message = msg(sc, plan.message);

    /* 1. Bằng chứng (16): mở đủ, nguồn đáng tin, bằng chứng phủ nhu cầu của định vị. */
    const avgRel = opened.length ? opened.reduce((s, r) => s + r.rel, 0) / opened.length : 0;
    const tags = new Set(opened.flatMap((r) => r.tags));
    const need = position ? position.needs : [];
    const covered = need.length ? need.filter((t) => tags.has(t)).length / need.length : 0;
    const noiseN = opened.filter((r) => r.rel < 0.35).length;
    part('evidence', 'Dùng bằng chứng', Math.min(opened.length, 4) / 4 * 4 + clamp((avgRel - 0.35) / 0.35, 0, 1) * 6 + covered * 6, 16);
    if (noiseN) note('warn', `${noiseN} nguồn bạn mở gần như không mang thông tin`, opened.filter((r) => r.rel < 0.35).map((r) => `"${r.t}" (${r.caveat})`).join(' · '));
    if (position && covered < 1) note('warn', 'Định vị chưa được nghiên cứu đỡ', `Định vị "${position.t}" cần bằng chứng về: ${need.filter((t) => !tags.has(t)).join(', ')}. Bạn chưa mở nguồn nào nói về điều đó.`);
    else if (position) note('ok', 'Định vị có bằng chứng đỡ', `Các nguồn bạn mở phủ ${need.length}/${need.length} nhu cầu mà định vị này dựa vào.`);

    /* 2. Khách & định vị (12). */
    let sp = 0;
    if (position && segment) {
      const fits = position.segs.includes(segment.id);
      sp += fits ? 6 : 0;
      if (!fits) note('bad', 'Định vị và nhóm khách chưa khớp', `"${position.t}" được thiết kế cho ${position.segs.map((s) => seg(sc, s).t).join(' / ')}, không phải "${segment.t}".`);
      sp += words(plan.give) >= 3 ? 3 : 0;
      const needsProof = position.proof.length > 0;
      sp += needsProof ? 0 : 3;
      if (needsProof) note('bad', 'Lời hứa chưa có gì đỡ', position.risk);
    }
    part('strategy', 'Khách & định vị', sp, 12);

    /* 3. Thông điệp & kênh (12). */
    let mc = 0;
    if (message && position) {
      const fits = message.pos.includes(position.id);
      mc += fits ? 4 : 0;
      if (!fits) note('warn', 'Thông điệp chưa nói đúng định vị', message.pos.length ? `Thông điệp bạn chọn thuộc hướng khác. ${message.note}` : message.note);
      mc += message.needsProof ? 0 : 2;
      if (message.needsProof) note('warn', 'Thông điệp cần bằng chứng bạn chưa có', message.note);
    }
    const spendTotal = Object.entries(a).filter(([k]) => k !== 'reserve').reduce((s, [, v]) => s + (+v || 0), 0);
    if (spendTotal > 0 && plan.segment) {
      const wfit = sc.channels.reduce((s, ch) => s + (a[ch.id] || 0) * ((ch.fit && ch.fit[plan.segment]) || 0), 0) / spendTotal;
      mc += clamp((wfit - 0.45) / 0.4, 0, 1) * 6;
      if (wfit < 0.6) note('warn', 'Kênh chưa khớp nơi khách của bạn ở', `Độ khớp trung bình của kênh bạn chọn với nhóm khách này là ${Math.round(wfit * 100)}/100.`);
      else note('ok', 'Kênh khớp khách mục tiêu', `Độ khớp trung bình ${Math.round(wfit * 100)}/100.`);
    }
    part('channel', 'Thông điệp & kênh', mc, 12);

    /* 4. Ngân sách (12): khả thi theo mô hình, không phải "đúng tỉ lệ". */
    let bp = 0;
    const sum = Object.values(a).reduce((s, x) => s + (+x || 0), 0);
    if (sum === 100) bp += 1;
    if (m.active.length >= 1 && m.active.length <= 4) bp += 2; else if (m.active.length > 4) note('warn', 'Rải quá nhiều kênh', `Với ${sc.budget.toLocaleString('vi-VN')} ₫, ${m.active.length} kênh khiến kênh nào cũng dưới mức tối thiểu để máy học.`);
    const under = m.rows.filter((r) => r.under).length;
    bp += under === 0 ? 2 : 0;
    if (under) note('warn', `${under} kênh dưới mức chi tối thiểu`, 'Dưới mức tối thiểu, kênh chưa thoát giai đoạn học nên hiệu quả giảm khoảng 40%.');
    const res = a.reserve || 0;
    bp += res >= 10 && res <= 25 ? 2 : 0;
    if (res < 10) note('warn', 'Không giữ tiền cho bước sau thí nghiệm', 'Nên giữ 10–25% ngân sách để mở rộng điều thắng hoặc chạy lại thử nghiệm.');
    if (m.cac != null) {
      bp += m.cac <= m.ceiling ? 3 : m.cac <= m.ceiling * 1.15 ? 1 : 0;
      bp += m.profit >= 0 ? 2 : 0;
      note(m.cac <= m.ceiling ? 'ok' : 'bad', `CAC dự kiến ${Math.round(m.cac).toLocaleString('vi-VN')} ₫ so với trần ${Math.round(m.ceiling).toLocaleString('vi-VN')} ₫`,
        `Mô hình ước tính ${Math.round(m.orders)} đơn từ ${Math.round(m.spend).toLocaleString('vi-VN')} ₫ chi, lãi gộp sau quảng cáo ${Math.round(m.profit).toLocaleString('vi-VN')} ₫ (giả lập, chỉ để so các phương án).`);
    } else note('bad', 'Kế hoạch này không ra đơn', 'Không kênh nào bạn chọn tạo ra được đơn trong mô hình (ví dụ kênh cần danh sách khách mà thương hiệu chưa có).');
    part('budget', 'Ngân sách', bp, 12);

    /* 5. KPI (12). */
    const k = plan.kpis || {}, picked = (k.picked || []).map((id) => kpi(sc, id)).filter(Boolean);
    const by = (t) => picked.filter((x) => x.type === t).length;
    let kp = 0;
    kp += by('north') >= 1 ? 3 : 0; kp += by('input') >= 1 ? 2 : 0; kp += by('guardrail') >= 1 ? 3 : 0;
    const vanityOnly = picked.length > 0 && by('vanity') === picked.length;
    const onlyVanity = by('north') + by('input') === 0;
    if (!onlyVanity) kp += 1; else note('bad', 'Toàn chỉ số phù phiếm', 'Lượt thích, tiếp cận, người theo dõi không cho biết bạn có kiếm được tiền hay không.');
    if (by('guardrail') === 0) note('warn', 'Thiếu chỉ số bảo vệ', 'Không có chỉ số bảo vệ, bạn có thể "thắng" mà vẫn hỏng (ví dụ CAC đẹp nhưng hoàn hàng tăng).');
    if (by('vanity') > 0 && !vanityOnly) kp -= 0;       // có chỉ số phù phiếm kèm chỉ số thật thì không trừ
    const tc = +((k.targets || {}).cac), to = +((k.targets || {}).orders);
    if (tc > 0 && m.ceiling) { if (tc <= m.ceiling) kp += 2; else note('bad', 'Mục tiêu CAC cao hơn trần hoà vốn', 'Mục tiêu CAC phải nằm dưới lãi gộp của đơn đầu, nếu không mỗi khách mới làm lỗ.'); }
    if (to > 0 && m.orders > 0) { const r = to / m.orders; if (r >= 0.6 && r <= 1.4) kp += 1; else note('warn', 'Mục tiêu số đơn lệch xa mô hình', `Mục tiêu ${to} đơn so với ước tính ${Math.round(m.orders)}: tham vọng thì được, nhưng hãy biết mình đặt cược vào điều gì.`); }
    part('kpi', 'Chuỗi KPI', kp, 12);

    /* 6. Thí nghiệm (16). */
    const ex = plan.exp || {}, h = ex.hypothesis || {};
    let xp = 0;
    if (words(h.change) >= 2 && words(h.effect) >= 2 && words(h.because) >= 3) xp += 3;
    if (ex.variable) xp += 2;
    if (ex.metric) xp += 1;
    let power = null;
    if (ex.variable && ex.metric && ex.mde > 0 && ex.weeks > 0) {
      const p0 = expBase(sc, ex.metric === 'ctr' ? 'ctr' : 'cvr'), need = sampleSize(p0, ex.mde / 100), have = availablePerArm(sc, m, plan);
      power = { need, have, ok: have >= need };
      if (power.ok) { xp += 6; note('ok', 'Thí nghiệm đủ mẫu để thấy mức thay đổi bạn chọn', `Cần khoảng ${Math.round(need).toLocaleString('vi-VN')} quan sát mỗi nhánh, kế hoạch cho ${Math.round(have).toLocaleString('vi-VN')}.`); }
      else if (have >= need * 0.5) { xp += 2; note('warn', 'Thí nghiệm hơi thiếu mẫu', `Cần khoảng ${Math.round(need).toLocaleString('vi-VN')} mỗi nhánh để thấy mức thay đổi ${ex.mde}%, kế hoạch chỉ cho ${Math.round(have).toLocaleString('vi-VN')}. Kéo dài, tăng mức thay đổi cần phát hiện, hoặc dùng chỉ số có nhiều sự kiện hơn.`); }
      else note('bad', 'Thí nghiệm quá thiếu mẫu để kết luận', `Cần khoảng ${Math.round(need).toLocaleString('vi-VN')} quan sát mỗi nhánh, kế hoạch chỉ cho ${Math.round(have).toLocaleString('vi-VN')}. Kết quả sẽ chủ yếu là nhiễu.`);
    }
    if (+ex.scaleIf > 0) xp += 2;
    if (ex.stopIf >= 0 && ex.stopIf !== '' && ex.stopIf != null && +ex.stopIf < +ex.scaleIf) xp += 2;
    else if (+ex.scaleIf > 0) note('warn', 'Ngưỡng dừng không thấp hơn ngưỡng mở rộng', 'Giữa hai ngưỡng phải có vùng "chạy tiếp / đổi biến"; nếu không bạn sẽ quyết định theo cảm tính.');
    part('experiment', 'Thiết kế thí nghiệm', xp, 16);
    return { model: m, parts, notes, power, total: parts.reduce((s, p) => s + p.got, 0) };
  }

  /* ---- chấm phần đọc kết quả (20) ---- */
  const UNCERT = /(khoảng tin cậy|không chắc|sai số|nhiễu|ngẫu nhiên|chưa đủ|có thể do|biên độ|độ tin|mẫu|không đủ|chưa kết luận|ý nghĩa thống kê)/i;
  const NEXT = /(bước tiếp|tiếp theo|sẽ |chạy lại|mở rộng|kéo dài|đổi biến|thử thêm|dừng|hoàn hàng|đánh giá|chỉ số bảo vệ)/i;
  function numbersShown(res) {
    const f = (x, d) => (x * 100).toFixed(d).replace('.', ',');
    return [f(res.ra, 2), f(res.rb, 2), res.rel == null ? '' : Math.abs(res.rel * 100).toFixed(0), String(res.xa), String(res.xb), f(res.guard.ra, 1), f(res.guard.rb, 1),
      Math.round(res.n).toLocaleString('vi-VN')].filter(Boolean);
  }
  function scoreRead(plan, res) {
    const r = plan.read || {}, parts = [], notes = [];
    const txt = plain(r.why), ok = defensible(res, plan);
    const part = (label, got, max) => parts.push({ label, got, max });
    const dec = ok.includes(r.decision);
    part('Quyết định bảo vệ được trước số liệu', dec ? 8 : 0, 8);
    notes.push({ tone: dec ? 'ok' : 'bad', title: dec ? 'Quyết định bảo vệ được' : 'Quyết định khó bảo vệ trước số liệu này',
      body: dec ? 'Quyết định của bạn khớp với những gì khoảng tin cậy cho phép kết luận.' : `Với kết quả này, các quyết định bảo vệ được là: ${ok.map((x) => LABEL[x]).join(', ')}.` });
    const cites = numbersShown(res).some((n) => n.length >= 2 && txt.replace(/\./g, ',').includes(n));
    part('Trích số liệu của kết quả', cites ? 4 : 0, 4);
    if (!cites) notes.push({ tone: 'warn', title: 'Lập luận chưa trích số liệu', body: 'Nói rõ bạn dựa vào con số nào (tỉ lệ hai nhánh, mức tăng, khoảng tin cậy).' });
    const unc = UNCERT.test(txt);
    part('Nói về độ chắc chắn', unc ? 4 : 0, 4);
    if (!unc) notes.push({ tone: 'warn', title: 'Chưa nói về độ chắc chắn', body: 'Một chênh lệch luôn có thể là nhiễu. Hãy nêu khoảng tin cậy hoặc cỡ mẫu.' });
    const nxt = words(txt) >= 15 && NEXT.test(txt);
    part('Bước tiếp theo và chỉ số bảo vệ', nxt ? 4 : 0, 4);
    if (!nxt) notes.push({ tone: 'warn', title: 'Thiếu bước tiếp theo', body: 'Kết luận cần kèm việc làm kế tiếp và chỉ số bảo vệ bạn sẽ theo dõi (≥ 15 chữ).' });
    if (res.metric === 'ctr') notes.push({ tone: 'warn', title: 'CTR chỉ là chỉ số thay thế', body: 'Một tiêu đề nhiều người nhấp hơn chưa chắc làm nhiều người mua hơn. Trước khi dồn tiền, hãy kiểm lại bằng tỉ lệ chuyển đổi hoặc theo dõi đơn của nhóm nhấp từ biến thể.' });
    return { parts, notes, defensible: ok, total: parts.reduce((s, p) => s + p.got, 0) };
  }
  const LABEL = { scale: 'mở rộng', iterate: 'đổi biến và thử tiếp', extend: 'kéo dài để có thêm mẫu', stop: 'dừng' };

  function run(plan) {
    const p = scorePlan(plan), out = { plan: p, planScore: p.total };
    if (plan.exp && plan.exp.variable && plan.exp.metric && plan.exp.weeks) {
      out.result = simulateExperiment(plan);
      if (plan.read && plan.read.decision) { out.read = scoreRead(plan, out.result); }
    }
    out.total = p.total + (out.read ? out.read.total : 0);
    out.pass = !!out.read && out.total >= D.passScore;
    return out;
  }

  const StrategyEval = { scorePlan, scoreRead, run, model, missing, simulateExperiment, defensible, sampleSize, profitPerOrder, ceiling, availablePerArm, LABEL, CTR_BASE };
  root.StrategyEval = StrategyEval;
  if (typeof module !== 'undefined') module.exports = StrategyEval;
})(typeof globalThis !== 'undefined' ? globalThis : this);
