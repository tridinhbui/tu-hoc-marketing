/* MARKETING LAB · TRANG CHỦ — giới thiệu, 4 công cụ, tiến độ, bài nên làm tiếp, tiếp tục phiên gần nhất. */
(function () {
  appShell('');
  const F = LabEngine.fmt, M = LAB_META, CASE = LAB_CASES.skincare, app = document.getElementById('app');
  const dt = (t) => new Date(t).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const T = LabStore.tool('meta'), atts = T.attempts, last = LabStore.last();
  const byMode = (m) => atts.filter((a) => a.mode === m);
  const best = atts.reduce((b, a) => Math.max(b, a.summary.score), 0), stars = GW.stars('lab-meta');
  const picked = LabStore.picked(CASE.id, 'meta');

  /* Bài nên làm: gợi ý theo những gì còn thiếu, từ nhẹ đến khó. */
  const rec = [];
  if (!byMode('learn').length) rec.push(['Học từng bước: dựng chiến dịch Meta đầu tiên', 'Mất khoảng 15 phút, mỗi thành phần đều được giải thích tại chỗ.', 'lab-meta.html?mode=learn']);
  if (byMode('learn').length && !byMode('practice').length) rec.push(['Tự luyện: dựng lại chiến dịch không cần hướng dẫn', 'Thử đổi một yếu tố (đối tượng, ngân sách, nội dung) và so sánh hai lần chạy.', 'lab-meta.html?mode=practice']);
  if (byMode('practice').length && !byMode('challenge').length) rec.push(['Thử thách: ra mắt kem chống nắng với 5 triệu', `Đạt ROAS từ ${M.modes.challenge.targets.roas} và ít nhất ${M.modes.challenge.targets.orders} đơn.`, 'lab-meta.html?mode=challenge']);
  if (byMode('challenge').length && stars < 3) rec.push(['Thử thách lần nữa để lấy thêm sao', `Điểm cao nhất hiện tại ${best}. Mở phần "Nên cải thiện" của lần gần nhất rồi sửa đúng điểm yếu nhất.`, 'lab-meta.html?mode=challenge']);
  if (!rec.length) rec.push(['Chạy lại ở chế độ Tự luyện với ngân sách 10 triệu', 'Thử phân bổ lớn hơn và xem ROAS có tăng theo ngân sách không.', 'lab-meta.html?mode=practice']);

  const tools = [
    ['Meta Ads Manager', 'Mục tiêu, đối tượng, ngân sách, vị trí, nội dung quảng cáo; mô phỏng theo từng ngày.', 'meta', 'lab-meta.html'],
    ['Google Ads', 'Từ khoá, loại khớp, từ khoá phủ định, giá thầu, quảng cáo tìm kiếm. Dùng lại engine của Meta.', null, null, 'Bước 3'],
    ['Google Analytics 4', 'Đọc lưu lượng và chuyển đổi do chính chiến dịch Meta/Google của bạn sinh ra.', null, null, 'Bước 4'],
    ['SEO Research', 'Nghiên cứu từ khoá, đối thủ, kế hoạch nội dung với bộ dữ liệu cố định.', null, null, 'Bước 5'],
  ];
  const caseDone = { meta: !!picked };
  app.innerHTML = `<div class="lb">
    <div class="lb-top"><span class="lb-eyebrow">Marketing Lab</span><span class="lb-hand">thực hành an toàn, sai được, sửa được</span></div>
    <h1>Luyện cách dùng phần mềm marketing, trước khi dùng tiền thật</h1>
    <p class="lb-lede">Bốn công cụ phổ biến được mô phỏng với dữ liệu nhất quán. Bạn tự đưa ra quyết định, chạy thử, nhìn KPI, hiểu vì sao sai rồi sửa và chạy lại. Điểm đo chất lượng quyết định marketing, không đo việc bấm đúng nút.</p>

    ${last ? `<section class="lb-sec"><h2>Tiếp tục</h2><div class="lb-row"><div><h3>Meta Ads Manager</h3><small>${last.draft ? 'Bản nháp' : 'Lần chạy gần nhất'} · ${dt(last.when)}</small></div>
      <p>${last.draft ? `Chế độ ${escH(M.modes[last.draft.mode].t)}, bước ${(last.draft.step || 0) + 1}/5.` : `Điểm ${last.attempt.summary.score}, ROAS ${F.x(last.attempt.summary.roas)}.`}</p>
      <a class="lb-btn" href="lab-meta.html${last.draft ? '?mode=' + last.draft.mode : ''}">${last.draft ? 'Tiếp tục bản nháp' : 'Xem lại'}</a></div></section>` : ''}

    <section class="lb-sec"><h2>Công cụ</h2>
      ${tools.map(([t, d, id, href, when]) => id ? `<div class="lb-row"><div><h3>${t}</h3><small>${atts.length ? `${atts.length} lượt chạy · điểm cao nhất ${best}` : 'Chưa chạy lần nào'}</small></div><p>${d}</p><a class="lb-btn" href="${href}">${atts.length ? 'Mở' : 'Bắt đầu'}</a></div>`
        : `<div class="lb-row" data-off="1"><div><h3>${t}</h3><small>Sắp mở</small></div><p>${d}</p><span class="lb-tag">${when}</span></div>`).join('')}
    </section>

    <section class="lb-sec"><h2>Nên làm tiếp</h2>
      ${rec.map(([t, d, h]) => `<div class="lb-row"><div><h3>${escH(t)}</h3></div><p>${escH(d)}</p><a class="lb-btn lb-btn--ghost" href="${h}">Làm bài</a></div>`).join('')}
    </section>

    <section class="lb-sec"><h2>Tiến độ</h2>
      <div class="lb-stat"><div><b>${atts.length}</b><span>lượt chạy</span></div><div><b>${best || '—'}</b><span>điểm cao nhất</span></div><div><b>${'★'.repeat(stars) + '☆'.repeat(3 - stars)}</b><span>sao Thử thách Meta</span></div>
        <div><b>${['learn', 'practice', 'challenge'].filter((m) => byMode(m).length).length}/3</b><span>chế độ đã thử</span></div></div>
      <p class="lb-lede">Tiến độ lưu theo tài khoản và khôi phục trên máy khác khi bạn đăng nhập.</p>
    </section>

    <section class="lb-sec"><h2>Case xuyên suốt: ${escH(CASE.t)}</h2>
      <p class="lb-lede">${escH(CASE.brand)}: ${escH(CASE.product)}. Ngân sách ${F.vnd(CASE.totalBudget)}, giá trị đơn trung bình ${F.vnd(CASE.aov)}. ${escH(CASE.brief)}</p>
      <div style="margin-top:12px">${CASE.steps.map(([id, t], i) => `<div class="lb-row" style="grid-template-columns:34px 1fr auto;padding:12px 0"><span class="lb-hand" style="font-size:1.4rem">${i + 1}</span><span>${escH(t)}</span>
        ${caseDone[id] ? '<span class="lb-tag lb-tag--on">Đã chọn kết quả</span>' : id === 'meta' ? '<a class="lb-btn lb-btn--ghost lb-btn--sm" href="lab-meta.html">Làm</a>' : '<span class="lb-tag">Sắp mở</span>'}</div>`).join('')}</div>
      <p class="lb-lede" style="font-size:14px">Từng lab có thể làm độc lập. Khi làm xuyên suốt, kết quả của Meta (và Google Ads sau này) được GA4 đọc lại với giả định attribution nêu rõ.</p>
    </section>
  </div>`;
})();
