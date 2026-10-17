/* MARKETING LAB · TRANG CHỦ — giới thiệu, công cụ, tiến độ, bài nên làm tiếp, tiếp tục phiên gần nhất, case xuyên suốt. */
(function () {
  appShell('');
  const F = LabEngine.fmt, CASE = LAB_CASES.skincare, app = document.getElementById('app');
  const dt = (t) => new Date(t).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const TOOLS = {
    meta: { t: 'Meta Ads Manager', d: 'Mục tiêu, đối tượng, ngân sách, vị trí, nội dung quảng cáo; mô phỏng theo từng ngày.', href: 'lab-meta.html', modes: LAB_META.modes, gw: 'lab-meta', n: 'Meta' },
    ga4: { t: 'Google Analytics 4', d: 'Đọc lưu lượng, phễu, trang đích và attribution do chính chiến dịch Meta và Google của bạn sinh ra.', href: 'lab-ga4.html',
      modes: { learn: { t: 'Học từng bước' }, practice: { t: 'Tự luyện' }, challenge: { t: 'Thử thách' } }, gw: 'lab-ga4', n: 'GA4', noRoas: true },
    seo: { t: 'SEO Research', d: 'Nghiên cứu từ khoá, cụm chủ đề, đối thủ và lập kế hoạch nội dung với bộ dữ liệu cố định.', href: 'lab-seo.html',
      modes: LAB_SEO.modes, gw: 'lab-seo', n: 'SEO' },
    gads: { t: 'Google Ads', d: 'Từ khoá, kiểu khớp, từ khoá phủ định, giá thầu, quảng cáo tìm kiếm và báo cáo cụm từ tìm kiếm.', href: 'lab-gads.html', modes: LAB_GADS.modes, gw: 'lab-gads', n: 'Google Ads' },
  };
  const info = Object.fromEntries(Object.keys(TOOLS).map((id) => { const a = LabStore.tool(id).attempts;
    return [id, { atts: a, best: a.reduce((b, x) => Math.max(b, x.summary.score), 0), stars: GW.stars(TOOLS[id].gw), by: (m) => a.filter((x) => x.mode === m) }]; }));
  const last = LabStore.last(), picked = { meta: LabStore.picked(CASE.id, 'meta'), gads: LabStore.picked(CASE.id, 'gads') };

  /* Bài nên làm: theo những gì còn thiếu, từ nhẹ đến khó. */
  const rec = [];
  for (const id of ['seo', 'meta', 'gads', 'ga4']) {
    const T = TOOLS[id], I = info[id], tg = T.modes.challenge.targets || { roas: 0, orders: 0 };
    if (!I.by('learn').length) rec.push([`${T.n}: học từng bước`, 'Mất khoảng 15 phút, mỗi thành phần đều được giải thích tại chỗ.', `${T.href}?mode=learn`]);
    else if (!I.by('practice').length) rec.push([`${T.n}: tự luyện, không cần hướng dẫn`, 'Đổi một yếu tố và so sánh hai lần chạy.', `${T.href}?mode=practice`]);
    else if (!I.by('challenge').length) rec.push([`${T.n}: Thử thách với 5 triệu`, T.noRoas ? 'Điều tra dữ liệu không gợi ý: đọc số, chẩn đoán, quyết định phân bổ.' : `Đạt ROAS từ ${tg.roas} và ít nhất ${tg.orders} đơn.`, `${T.href}?mode=challenge`]);
    else if (I.stars < 3) rec.push([`${T.n}: Thử thách lần nữa để lấy thêm sao`, `Điểm cao nhất ${I.best}. Mở "Nên cải thiện" của lần gần nhất rồi sửa đúng điểm yếu nhất.`, `${T.href}?mode=challenge`]);
  }
  if (!rec.length) rec.push(['Chạy lại ở Tự luyện với ngân sách 10 triệu', 'Thử phân bổ lớn hơn và xem ROAS có tăng theo ngân sách không.', 'lab-meta.html?mode=practice']);

  const upcoming = [];
  const total = Object.values(info).reduce((s, i) => s + i.atts.length, 0), best = Math.max(0, ...Object.values(info).map((i) => i.best));
  const stars = Object.values(info).reduce((s, i) => s + i.stars, 0);
  const modesTried = Object.values(info).reduce((s, i) => s + ['learn', 'practice', 'challenge'].filter((m) => i.by(m).length).length, 0);
  const stepState = (id) => (id === 'ga4' || id === 'seo') && info[id].atts.length ? '<span class="lb-tag lb-tag--on">Đã làm</span>' : picked[id] ? '<span class="lb-tag lb-tag--on">Đã chọn kết quả</span>' : TOOLS[id] ? `<a class="lb-btn lb-btn--ghost lb-btn--sm" href="${TOOLS[id].href}">Làm</a>` : '<span class="lb-tag">Sắp mở</span>';


  /* Bàn thứ năm: chiến lược mở, không đáp án duy nhất. Dữ liệu riêng, giả lập có nhãn (strategy-data.js). */
  const strategyDesk = () => { const a = LabStore.tool('strategy').attempts, best = a.reduce((b, x) => Math.max(b, x.summary.score), 0);
    return `<article class="lab-desk lab-desk--e"><p class="lb-eyebrow">Xưởng chiến lược · dữ liệu giả lập</p>
      <h3>Từ brief đến thí nghiệm</h3><p class="lab-desk__d">Nghiên cứu khách, định vị, thông điệp, kênh, ngân sách, KPI, thiết kế thí nghiệm rồi đọc kết quả có nhiễu. Không có đáp án duy nhất: chấm độ nhất quán của lập luận.</p>
      <p class="lab-desk__m">${a.length ? `${a.length} lượt · điểm cao nhất <b>${best}</b>` : 'Chưa có lượt chạy nào'}</p>
      <a class="lb-btn" href="lab-chien-luoc.html">${a.length ? 'Mở xưởng' : 'Nhận brief & bắt đầu'}</a></article>`; };

  const steps = CASE.steps.map(([id, t], i) => `<li class="lab-step" data-id="${id}"><span class="lab-step__n">${String(i + 1).padStart(2, '0')}</span><span class="lab-step__t">${escH(t)}</span><span class="lab-step__s">${stepState(id)}</span></li>`).join('');
  const desk = (id, k) => { const T = TOOLS[id], I = info[id];
    return `<article class="lab-desk lab-desk--${k}"><p class="lb-eyebrow">Bàn ${String(['seo', 'meta', 'gads', 'ga4'].indexOf(id) + 1).padStart(2, '0')} · ${escH(T.n)}</p>
      <h3>${escH(T.t)}</h3><p class="lab-desk__d">${T.d}</p>
      <p class="lab-desk__m">${I.atts.length ? `${I.atts.length} lượt chạy · điểm cao nhất <b>${I.best}</b>` : 'Chưa có lượt chạy nào'}</p>
      <a class="lb-btn" href="${T.href}">${I.atts.length ? 'Mở bàn làm việc' : 'Nhận brief & bắt đầu'}</a></article>`; };

  app.innerHTML = `<div class="lb lab">
    <header class="lab-hero">
      <div class="lab-hero__t">
        <div class="lb-top"><span class="lb-eyebrow">Marketing Lab · Xưởng agency</span><span class="lb-hand">practice safely — fail, fix, repeat</span></div>
        <h1>Luyện cách dùng phần mềm marketing, <em>trước khi dùng tiền thật</em></h1>
        <p class="lb-lede">Bốn công cụ phổ biến được mô phỏng với dữ liệu nhất quán. Bạn nhận brief, đưa ra quyết định, chạy thử, nhìn KPI, hiểu vì sao sai rồi sửa và chạy lại. Điểm đo chất lượng quyết định marketing, không đo việc bấm đúng nút.</p>
      </div>
      <aside class="lab-brief" aria-label="Brief xuyên suốt">
        <span class="lab-brief__tape" aria-hidden="true"></span>
        <p class="lb-eyebrow">Brief của khách</p>
        <h2>${escH(CASE.t)}</h2>
        <p>${escH(CASE.brand)}: ${escH(CASE.product)}. ${escH(CASE.brief)}</p>
        <dl><div><dt>Ngân sách</dt><dd>${F.vnd(CASE.totalBudget)}</dd></div><div><dt>Giá trị đơn TB</dt><dd>${F.vnd(CASE.aov)}</dd></div></dl>
      </aside>
    </header>

    ${last ? `<section class="lb-sec lab-continue"><h2>Tiếp tục từ đây</h2><div class="lb-row"><div><h3>${TOOLS[last.tool].t}</h3><small>${last.draft ? 'Bản nháp' : 'Lần chạy gần nhất'} · ${dt(last.when)}</small></div>
      <p>${last.draft ? `Chế độ ${escH(TOOLS[last.tool].modes[last.draft.mode].t)}, bước ${(last.draft.step || 0) + 1}.` : `Điểm ${last.attempt.summary.score}${last.attempt.summary.roas !== undefined ? ', ROAS ' + F.x(last.attempt.summary.roas) : ''}.`}</p>
      <a class="lb-btn" href="${TOOLS[last.tool].href}${last.draft ? '?mode=' + last.draft.mode : ''}">${last.draft ? 'Tiếp tục bản nháp' : 'Xem lại'}</a></div></section>` : ''}

    <section class="lb-sec"><h2>Từ brief đến báo cáo</h2>
      <p class="lb-lede" style="font-size:14.5px">Mỗi bước dùng đúng dữ liệu của bước trước: nghiên cứu → chiến dịch → đọc số.</p>
      <ol class="lab-steps">${steps}</ol>
      <p class="lb-lede" style="font-size:14px">Từng lab có thể làm độc lập. Khi làm xuyên suốt, GA4 đọc đúng các lần chạy bạn đã chọn của Meta và Google Ads, với giả định attribution nêu rõ. Nhớ bấm "Dùng lần chạy này cho case xuyên suốt" ở màn kết quả.</p>
    </section>

    <section class="lb-sec"><h2>Bốn bàn công cụ và một xưởng chiến lược</h2>
      <div class="lab-desks">
        ${desk('seo', 'a')}${desk('meta', 'b')}${desk('gads', 'c')}${desk('ga4', 'd')}
        ${strategyDesk()}
        ${upcoming.map(([t, d, when]) => `<article class="lab-desk lab-desk--off" data-off="1"><p class="lb-eyebrow">Sắp mở · ${when}</p><h3>${t}</h3><p class="lab-desk__d">${d}</p></article>`).join('')}
      </div>
    </section>

    <section class="lb-sec lab-feedback"><h2>Feedback từ studio</h2>
      ${rec.slice(0, 3).map(([t, d, h], i) => `<div class="lab-note"><span class="lab-note__n">${i + 1}</span><div><h3>${escH(t)}</h3><p>${escH(d)}</p></div><a class="lb-btn lb-btn--ghost" href="${h}">Làm bài</a></div>`).join('')}
    </section>

    <section class="lb-sec"><h2>Bảng thành tích</h2>
      <div class="lb-stat"><div><b>${total}</b><span>lượt chạy</span></div><div><b>${best || '—'}</b><span>điểm cao nhất</span></div><div><b>${stars}/12</b><span>sao Thử thách</span></div><div><b>${modesTried}/12</b><span>chế độ đã thử</span></div></div>
      <p class="lb-lede">Tiến độ lưu theo tài khoản và khôi phục trên máy khác khi bạn đăng nhập.</p>
    </section>
  </div>`;
})();
