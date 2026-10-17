/* MARKETING LAB · GIAO DIỆN XƯỞNG CHIẾN LƯỢC — brief → nghiên cứu → định vị → thông điệp → kênh & ngân sách → KPI → thí nghiệm → đọc kết quả.
   Logic ở strategy-eval.js, dữ liệu ở strategy-data.js. Cần: app.js, frame.js, engine, store, strategy-data, strategy-eval. */
(function () {
  appShell('');
  const E = LabEngine, F = E.fmt, D = LAB_STRATEGY, SE = StrategyEval, TOOL = 'strategy', app = document.getElementById('app');
  const dt = (t) => new Date(t).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const STEPS = [['research', '1. Nghiên cứu'], ['strategy', '2. Khách & định vị'], ['message', '3. Thông điệp'], ['budget', '4. Kênh & ngân sách'], ['kpi', '5. KPI'], ['experiment', '6. Thí nghiệm'], ['read', '7. Đọc kết quả']];
  const KIND = { north: 'Chỉ số chính', input: 'Chỉ số đầu vào', guardrail: 'Chỉ số bảo vệ', vanity: 'Dễ đẹp, ít nghĩa' };
  const q = new URLSearchParams(location.search);

  let sc = null, p = null, step = 0, view = 'start', reported = false;
  const S = () => D.scenarios[p.scenario];
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const blank = (id) => ({ scenario: id, opened: [], segment: '', position: '', give: '', why: '', message: '', headline: '', alloc: { reserve: 15 },
    kpis: { picked: [], targets: { cac: '', orders: '' } }, exp: { hypothesis: { change: '', effect: '', because: '' }, variable: '', metric: 'cvr', mde: 30, weeks: 6, scaleIf: 20, stopIf: 5 }, read: { decision: '', why: '' } });
  const save = () => LabStore.setDraft(TOOL, p ? { p, step, at: Date.now() } : null);
  const chip = (name, val, checked, label, extra = '') => `<label class="chip"><input type="checkbox" name="${name}" value="${val}" ${checked ? 'checked' : ''} ${extra}>${label}</label>`;
  const radio = (name, val, checked, title, sub = '') => `<label class="opt"><input type="radio" name="${name}" value="${val}" ${checked ? 'checked' : ''}><span><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</span></label>`;
  const tag = () => `<span class="lb-tag" title="${escH(D.disclaimer)}">${D.label}</span>`;
  const miss = () => SE.missing(p)[STEPS[step][0]] || [];

  /* ---------- màn hình bắt đầu ---------- */
  function renderStart() {
    const t = LabStore.tool(TOOL), atts = t.attempts, d = t.draft;
    app.innerHTML = `<div class="lb"><div class="lb-top"><a class="lb-back" href="lab.html">← Marketing Lab</a><span class="lb-eyebrow">Xưởng chiến lược · không có đáp án duy nhất</span></div>
      <h1>Từ brief đến thí nghiệm: tự dựng chiến lược và tự bảo vệ nó</h1>
      <p class="lb-lede">Ở bốn bàn kia, bạn luyện thao tác phần mềm. Ở đây bạn luyện điều đứng trước thao tác: <b>chọn đúng việc để làm và biết vì sao</b>. Mỗi bước dùng chính lựa chọn ở bước trước, và hệ thống chấm độ <em>nhất quán</em> của chuỗi lập luận chứ không chấm một đáp án.</p>
      <div class="lb-note"><b>${tag()} Toàn bộ dữ liệu là giả lập</b>${escH(D.disclaimer)} Kết quả thí nghiệm có nhiễu ngẫu nhiên đúng cỡ mẫu, nên đọc nó như đọc số thật: có sai số.</div>
      ${d ? `<div class="lb-note"><b>Bạn có bài đang làm dở</b>Bước ${(d.step || 0) + 1}/7, lưu lúc ${dt(d.at)}.<div style="margin-top:10px"><button class="lb-btn lb-btn--sm" data-act="resume">Tiếp tục</button> <button class="lb-btn lb-btn--sm lb-btn--ghost" data-act="drop">Bỏ bản nháp</button></div></div>` : ''}
      <section class="lb-sec"><h2>Chọn một brief</h2>
        ${Object.values(D.scenarios).map((s) => { const a = atts.filter((x) => x.scenario === s.id), best = a.reduce((b, x) => Math.max(b, x.summary.score), 0);
          return `<div class="lb-row"><div><h3>${escH(s.t)}</h3><small>${escH(s.brand)} · ${escH(s.sector)} · ${F.vndShort(s.budget)} cho ${s.months} tháng${a.length ? ` · ${a.length} lượt, cao nhất ${best}` : ''}</small></div><p>${escH(s.brief)}</p>
          <button class="lb-btn" data-act="start" data-id="${s.id}">${a.length ? 'Làm lượt mới' : 'Bắt đầu'}</button></div>`; }).join('')}</section>
      <section class="lb-sec"><h2>Bạn sẽ làm gì</h2>
        <ol style="padding-left:20px;line-height:1.7;max-width:70ch">
          <li>Mở tối đa ${D.researchSlots} nguồn nghiên cứu. Có nguồn đáng tin, có nguồn gần như nhiễu — chọn thế nào là một phần của bài.</li>
          <li>Chọn nhóm khách, định vị và nói rõ bạn <b>bỏ</b> điều gì.</li>
          <li>Chọn thông điệp và phân bổ ngân sách theo kênh, mô hình báo CAC và đơn dự kiến.</li>
          <li>Chọn KPI, thiết kế một thí nghiệm có giả thuyết và ngưỡng quyết định đặt trước.</li>
          <li>Đọc kết quả giả lập, rồi quyết định mở rộng, kéo dài, đổi biến hay dừng — và viết lý do.</li></ol></section>
      ${atts.length ? `<section class="lb-sec"><h2>Lịch sử</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Lúc</th><th>Brief</th><th>Kế hoạch</th><th>Đọc kết quả</th><th>Tổng</th></tr></thead><tbody>
        ${atts.slice().reverse().map((a) => `<tr><td>${dt(a.at)}</td><td>${escH(D.scenarios[a.scenario] ? D.scenarios[a.scenario].brand : a.scenario)}</td><td>${a.summary.plan}/80</td><td>${a.summary.read}/20</td><td><b>${a.summary.score}</b>${a.summary.pass ? ' · đạt' : ''}</td></tr>`).join('')}</tbody></table></div></section>` : ''}
    </div>`;
    app.onclick = (e) => { const b = e.target.closest('[data-act]'); if (!b) return;
      if (b.dataset.act === 'start') { p = blank(b.dataset.id); step = 0; view = 'work'; reported = false; save(); render(); window.scrollTo(0, 0); }
      if (b.dataset.act === 'resume') { p = t.draft.p; step = t.draft.step || 0; view = 'work'; reported = false; render(); }
      if (b.dataset.act === 'drop') { LabStore.clearDraft(TOOL); renderStart(); } };
  }

  /* ---------- khung làm việc ---------- */
  function shell(inner) {
    const m = SE.missing(p), done = (i) => (m[STEPS[i][0]] || []).length === 0;
    return `<div class="lb"><div class="lb-top"><a class="lb-back" href="lab-chien-luoc.html" data-act="home">← Chọn brief khác</a><span class="lb-eyebrow">${escH(S().brand)} · ${tag()}</span></div>
      <h1 style="font-size:clamp(1.4rem,2.6vw,1.9rem)">${escH(S().t)}</h1>
      <div class="tabs" role="tablist" aria-label="Các bước">${STEPS.map(([id, t], i) => `<button type="button" data-step="${i}" aria-pressed="${i === step}" ${i > step && !STEPS.slice(0, i).every((_, k) => done(k)) ? 'disabled' : ''}>${t}${i < step && done(i) ? ' ✓' : ''}</button>`).join('')}</div>
      <div id="stage">${inner}</div>
      <div class="dock"><div><small id="hint">${miss().length ? '<b>Còn thiếu:</b> ' + escH(miss()[0]) + (miss().length > 1 ? ` (+${miss().length - 1})` : '') : '<b>Sẵn sàng.</b> Bạn có thể sang bước sau.'}</small>
        <span style="display:flex;gap:8px"><button class="lb-btn lb-btn--ghost lb-btn--sm" data-nav="-1" ${step === 0 ? 'disabled' : ''}>Trước</button>
        <button class="lb-btn lb-btn--sm" data-nav="1" id="nextBtn" ${miss().length ? 'disabled' : ''}>${step === STEPS.length - 1 ? 'Nộp và xem báo cáo' : 'Tiếp'}</button></span></div></div></div>`;
  }
  function refreshNav() {
    const b = document.getElementById('nextBtn'), h = document.getElementById('hint'); if (!b) return; const m = miss();
    b.disabled = m.length > 0; h.innerHTML = m.length ? '<b>Còn thiếu:</b> ' + escH(m[0]) + (m.length > 1 ? ` (+${m.length - 1})` : '') : '<b>Sẵn sàng.</b> Bạn có thể sang bước sau.';
    save();
  }

  /* ---------- từng bước ---------- */
  function stepResearch() {
    const s = S(), n = p.opened.length;
    return `<section class="lb-sec"><h2>Brief</h2><p class="lb-lede">${escH(s.brief)}</p>
      <div class="kpis"><div class="kpi"><span>Mục tiêu</span><b style="font-size:1.05rem">${escH(s.goal.text)}</b></div><div class="kpi"><span>Ngân sách</span><b>${F.vndShort(s.budget)}</b></div>
        <div class="kpi"><span>Giá trị đơn</span><b>${F.vnd(s.economics.aov)}</b></div><div class="kpi"><span>Tỉ lệ chuyển đổi nền</span><b>${F.pct(s.site.baseCvr, 1)}</b></div></div>
      <div class="lb-note"><b>Kinh tế đơn vị</b>${escH(s.economics.ceilingNote)}</div>
      <ul style="margin:10px 0 0;padding-left:18px;color:var(--lb-ink2)">${s.constraints.map((c) => `<li>${escH(c)}</li>`).join('')}</ul></section>
      <section class="lb-sec"><h2>Nghiên cứu khách <small style="font-size:13px;color:var(--lb-ink3);font-family:var(--lb-sans)">· đã mở ${n}/${D.researchSlots}</small></h2>
        <p class="lb-lede" style="font-size:14.5px">Chỉ mở được ${D.researchSlots} nguồn. Bấm để xem phát hiện <i>và</i> hạn chế của nó. Nguồn nào cũng có điểm yếu — câu hỏi là điểm yếu đó có làm hỏng kết luận của bạn không.</p>
        ${s.research.map((r) => { const on = p.opened.includes(r.id), lock = !on && n >= D.researchSlots;
          return `<div class="fld"><div style="display:flex;gap:10px;justify-content:space-between;flex-wrap:wrap;align-items:baseline"><b>${escH(r.t)} <span class="lb-tag">${escH(r.kind)}</span></b>
            <button class="lb-btn lb-btn--sm ${on ? 'lb-btn--ghost' : ''}" data-open="${r.id}" ${lock ? 'disabled' : ''}>${on ? 'Đã mở' : 'Mở nguồn này'}</button></div>
            ${on ? `<p style="margin:8px 0 4px">${escH(r.finding)}</p><small><b>Hạn chế:</b> ${escH(r.caveat)}</small>` : ''}</div>`; }).join('')}</section>`;
  }
  function stepStrategy() {
    const s = S();
    return `<section class="lb-sec"><h2>Khách mục tiêu</h2><p class="lb-lede" style="font-size:14.5px">Chọn một nhóm để đi trước. Chọn một nhóm nghĩa là tạm gác các nhóm còn lại.</p>
      ${s.segments.map((x) => radio('seg', x.id, p.segment === x.id, escH(x.t), `${Math.round(x.size * 100)}% thị trường · cần: ${escH(x.need)}${x.aovMult !== 1 ? ` · giá trị đơn ×${x.aovMult}` : ''}`)).join('')}</section>
      <section class="lb-sec"><h2>Định vị</h2><p class="lb-lede" style="font-size:14.5px">Mỗi định vị là một cược. Đọc cả điều bạn bỏ và rủi ro.</p>
      ${s.positions.map((x) => radio('pos', x.id, p.position === x.id, escH(x.t), `<b>Bỏ:</b> ${escH(x.tradeoff)}<br><b>Rủi ro:</b> ${escH(x.risk)}`)).join('')}</section>
      <section class="lb-sec"><h2>Lập luận của bạn</h2>
        <div class="fld"><label for="f-give">Bạn chấp nhận bỏ điều gì để chọn hướng này?</label><input id="f-give" type="text" data-t="give" value="${escH(p.give)}" maxlength="140" placeholder="Ví dụ: bỏ nhóm … để tập trung …"></div>
        <div class="fld"><label for="f-why">Vì sao chọn hướng này? Dựa vào nguồn nghiên cứu nào bạn đã mở?</label><textarea id="f-why" data-t="why" maxlength="500" placeholder="Nêu nguồn (ví dụ: khảo sát r1 cho thấy …) và điều nó chưa chứng minh.">${escH(p.why)}</textarea></div></section>`;
  }
  function stepMessage() {
    const s = S();
    return `<section class="lb-sec"><h2>Hướng thông điệp</h2><p class="lb-lede" style="font-size:14.5px">Thông điệp phải nói đúng định vị bạn chọn. Có thông điệp nghe hay nhưng cần bằng chứng mà bạn chưa có.</p>
      ${s.messages.map((x) => radio('msg', x.id, p.message === x.id, escH(x.t), `${escH(x.appeal)}${x.needsProof ? ' · <b>cần bằng chứng</b>' : ''}<br>${escH(x.note)}`)).join('')}</section>
      <section class="lb-sec"><h2>Tiêu đề của riêng bạn</h2>
        <div class="fld"><label for="f-head">Viết một tiêu đề quảng cáo theo hướng đã chọn</label><input id="f-head" type="text" data-t="headline" value="${escH(p.headline)}" maxlength="90">
          <small>Nên có một dữ kiện hoặc tình huống cụ thể thay vì tính từ. Tiêu đề này sẽ vào bản báo cáo cuối.</small></div></section>`;
  }
  function stepBudget() {
    const s = S(), m = SE.model(p), a = p.alloc, sum = Object.values(a).reduce((t, x) => t + (+x || 0), 0);
    const row = (ch, i) => { const r = m.rows[i], v = a[ch.id] || 0, fit = (ch.fit && ch.fit[p.segment]) || 0;
      return `<tr><td><b>${escH(ch.t)}</b><br><small style="color:var(--lb-ink3)">${escH(ch.stage)} · khớp khách ${Math.round(fit * 100)}/100<br>${escH(ch.note)}</small></td>
        <td><label class="sr-only" for="a-${ch.id}" style="position:absolute;left:-9999px">Phần trăm cho ${escH(ch.t)}</label><input id="a-${ch.id}" type="number" min="0" max="100" step="5" inputmode="numeric" data-alloc="${ch.id}" value="${v}" style="width:72px;padding:8px;border:1.5px solid var(--lb-line);border-radius:8px;background:var(--lb-card);color:var(--lb-ink);font:inherit"> %</td>
        <td>${v ? F.vndShort(s.budget * v / 100) : '—'}${r.under ? '<br><small style="color:var(--lb-warn)">dưới mức tối thiểu ' + F.vndShort(ch.min) + '</small>' : ''}${r.over ? '<br><small style="color:var(--lb-warn)">vượt trần kênh</small>' : ''}</td>
        <td>${r.orders ? F.num(r.orders, 0) : '—'}</td><td>${r.cac ? F.vndShort(r.cac) : '—'}</td></tr>`; };
    return `<section class="lb-sec"><h2>Phân bổ ngân sách</h2>
      <p class="lb-lede" style="font-size:14.5px">Chia ${F.vndShort(s.budget)} theo %, tổng đúng 100%. Giữ một phần làm <b>dự phòng cho bước sau thí nghiệm</b>. Số "đơn dự kiến" và "CAC" là ước tính của mô hình giả lập để so các phương án, không phải dự báo.</p>
      <div class="tbl-wrap"><table class="tbl tbl--wide"><thead><tr><th>Kênh</th><th>% ngân sách</th><th>Chi</th><th>Đơn dự kiến</th><th>CAC</th></tr></thead><tbody>${s.channels.map(row).join('')}
        <tr><td><b>Dự phòng (chưa chi)</b><br><small style="color:var(--lb-ink3)">Để mở rộng điều thắng hoặc chạy lại thí nghiệm</small></td><td><input type="number" min="0" max="100" step="5" inputmode="numeric" data-alloc="reserve" aria-label="Phần trăm dự phòng" value="${a.reserve || 0}" style="width:72px;padding:8px;border:1.5px solid var(--lb-line);border-radius:8px;background:var(--lb-card);color:var(--lb-ink);font:inherit"> %</td><td>${F.vndShort(s.budget * (a.reserve || 0) / 100)}</td><td></td><td></td></tr></tbody></table></div>
      <div class="kpis" id="bsum"><div class="kpi"><span>Tổng phân bổ</span><b ${sum === 100 ? '' : 'style="color:var(--lb-bad)"'}>${sum}%</b></div><div class="kpi"><span>Đơn dự kiến</span><b>${F.num(m.orders, 0)}</b><em data-v="flat">mục tiêu ${s.goal.orders}</em></div>
        <div class="kpi"><span>CAC dự kiến</span><b>${m.cac ? F.vndShort(m.cac) : '—'}</b><em data-v="flat">trần ${F.vndShort(m.ceiling)}</em></div><div class="kpi"><span>Lãi gộp sau QC (ước tính)</span><b ${m.profit < 0 ? 'style="color:var(--lb-bad)"' : ''}>${F.vndShort(m.profit)}</b></div></div></section>`;
  }
  function stepKpi() {
    const s = S(), k = p.kpis, m = SE.model(p);
    return `<section class="lb-sec"><h2>Chọn chỉ số theo dõi</h2><p class="lb-lede" style="font-size:14.5px">Một bộ chỉ số tốt có <b>ít nhất một chỉ số chính</b> (gắn với mục tiêu kinh doanh), <b>một chỉ số đầu vào</b> (cho biết vì sao) và <b>một chỉ số bảo vệ</b> (không để bạn thắng sai). Chỉ số "dễ đẹp" không bị cấm, nhưng đừng để nó đứng một mình.</p>
      ${['north', 'input', 'guardrail', 'vanity'].map((t) => `<div class="fld"><span class="lbl">${KIND[t]}</span><div class="chips">${s.kpis.filter((x) => x.type === t).map((x) => chip('kpi', x.id, k.picked.includes(x.id), escH(x.t))).join('')}</div></div>`).join('')}</section>
      <section class="lb-sec"><h2>Mục tiêu bằng số</h2>
        <div class="fld"><label for="f-cac">CAC mục tiêu (₫ mỗi khách mới)</label><input id="f-cac" type="text" inputmode="numeric" data-k="cac" value="${escH(k.targets.cac)}" placeholder="Trần hoà vốn ${Math.round(m.ceiling).toLocaleString('vi-VN')} ₫">
          <small>Mô hình ước tính CAC của kế hoạch bạn là ${m.cac ? Math.round(m.cac).toLocaleString('vi-VN') + ' ₫' : 'chưa có'}; trần hoà vốn ${Math.round(m.ceiling).toLocaleString('vi-VN')} ₫.</small></div>
        <div class="fld"><label for="f-ord">Số đơn mục tiêu</label><input id="f-ord" type="text" inputmode="numeric" data-k="orders" value="${escH(k.targets.orders)}" placeholder="Mục tiêu của brief: ${s.goal.orders}"><small>Mô hình ước tính ${F.num(m.orders, 0)} đơn.</small></div></section>`;
  }
  function stepExperiment() {
    const s = S(), ex = p.exp, h = ex.hypothesis, m = SE.model(p);
    const base = ex.metric === 'ctr' ? SE.CTR_BASE : s.site.baseCvr;
    const need = ex.mde > 0 ? SE.sampleSize(base, ex.mde / 100) : NaN, have = SE.availablePerArm(s, m, p);
    return `<section class="lb-sec"><h2>Giả thuyết</h2><p class="lb-lede" style="font-size:14.5px">Một thí nghiệm tốt thay <b>một</b> thứ, đo <b>một</b> chỉ số chính và đặt trước ngưỡng quyết định.</p>
      <div class="fld"><label for="h1">Nếu chúng ta thay đổi …</label><input id="h1" type="text" data-h="change" value="${escH(h.change)}" maxlength="120"></div>
      <div class="fld"><label for="h2">… thì điều này sẽ xảy ra …</label><input id="h2" type="text" data-h="effect" value="${escH(h.effect)}" maxlength="120"></div>
      <div class="fld"><label for="h3">… vì …</label><input id="h3" type="text" data-h="because" value="${escH(h.because)}" maxlength="160"><small>Dẫn lại bằng chứng ở bước nghiên cứu.</small></div></section>
      <section class="lb-sec"><h2>Thiết kế</h2>
      <div class="fld"><label for="v">Biến thử (chỉ một)</label><select id="v" data-e="variable"><option value="">— chọn —</option>${D.variables.map((x) => `<option value="${x.id}" ${ex.variable === x.id ? 'selected' : ''}>${escH(x.t)}</option>`).join('')}</select></div>
      <div class="fld"><label for="mt">Chỉ số chính</label><select id="mt" data-e="metric">${[['cvr', 'Tỉ lệ chuyển đổi trang (khách mua / lượt truy cập)'], ['ctr', 'Tỉ lệ nhấp quảng cáo (CTR) — nhiều sự kiện hơn nhưng chỉ là chỉ số thay thế']].map(([v, t]) => `<option value="${v}" ${ex.metric === v ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
      <div class="fld"><label for="mde">Mức thay đổi tương đối muốn phát hiện: <b id="mdev">${ex.mde}%</b></label><input id="mde" type="range" min="5" max="100" step="5" data-e="mde" value="${ex.mde}"><small>Muốn thấy thay đổi nhỏ thì cần nhiều quan sát hơn rất nhiều.</small></div>
      <div class="fld"><label for="wk">Số tuần chạy: <b id="wkv">${ex.weeks}</b></label><input id="wk" type="range" min="1" max="12" step="1" data-e="weeks" value="${ex.weeks}"></div>
      <div class="lb-note" id="powerbox"><b>Kiểm tra cỡ mẫu</b>Với tỉ lệ nền ${F.pct(base, 1)}, cần khoảng <b>${isFinite(need) ? Math.round(need).toLocaleString('vi-VN') : '—'}</b> quan sát mỗi nhánh để thấy mức thay đổi ${ex.mde}%. Kế hoạch ngân sách của bạn cho khoảng <b>${Math.round(have).toLocaleString('vi-VN')}</b> sau ${ex.weeks} tuần
        (${F.num(m.weeklyVisits, 0)} lượt truy cập web mỗi tuần, chia đôi hai nhánh). ${have >= need ? 'Đủ.' : 'Chưa đủ: kéo dài, nâng mức thay đổi cần phát hiện, hoặc đổi sang chỉ số có nhiều sự kiện hơn.'}</div></section>
      <section class="lb-sec"><h2>Quy tắc quyết định — đặt trước khi thấy kết quả</h2>
      <div class="fld"><label for="si">Mở rộng nếu mức tăng tương đối từ … % trở lên: <b id="siv">${ex.scaleIf}%</b></label><input id="si" type="range" min="5" max="60" step="5" data-e="scaleIf" value="${ex.scaleIf}"></div>
      <div class="fld"><label for="st">Dừng nếu mức tăng thấp hơn … %: <b id="stv">${ex.stopIf}%</b></label><input id="st" type="range" min="0" max="30" step="5" data-e="stopIf" value="${ex.stopIf}"><small>Khoảng giữa hai ngưỡng là vùng "chạy tiếp hoặc đổi biến".</small></div></section>`;
  }
  function stepRead() {
    const s = S(), res = SE.simulateExperiment(p), ex = p.exp, f = (x, d = 2) => F.pct(x, d), sgn = (x) => (x > 0 ? '+' : '') + F.num(x * 100, 0) + '%';
    const unit = res.metric === 'ctr' ? 'lượt hiển thị' : 'lượt truy cập';
    return `<section class="lb-sec"><h2>Kết quả thí nghiệm ${tag()}</h2>
      <p class="lb-lede" style="font-size:14.5px">Biến: <b>${escH((D.variables.find((x) => x.id === ex.variable) || {}).t)}</b>. Chỉ số: <b>${res.metric === 'ctr' ? 'CTR' : 'tỉ lệ chuyển đổi'}</b>. ${Math.round(res.n).toLocaleString('vi-VN')} ${unit} mỗi nhánh.</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nhánh</th><th>${unit}</th><th>${res.metric === 'ctr' ? 'Lượt nhấp' : 'Khách mua'}</th><th>Tỉ lệ</th></tr></thead><tbody>
        <tr><td>A · đối chứng</td><td>${Math.round(res.n).toLocaleString('vi-VN')}</td><td>${res.xa.toLocaleString('vi-VN')}</td><td><b>${f(res.ra)}</b></td></tr>
        <tr><td>B · biến thể</td><td>${Math.round(res.n).toLocaleString('vi-VN')}</td><td>${res.xb.toLocaleString('vi-VN')}</td><td><b>${f(res.rb)}</b></td></tr></tbody></table></div>
      <div class="kpis"><div class="kpi"><span>Mức thay đổi tương đối (B so với A)</span><b>${res.rel == null ? '—' : sgn(res.rel)}</b></div>
        <div class="kpi"><span>Khoảng tin cậy 95% của mức thay đổi</span><b style="font-size:1.15rem">${res.relLo == null ? '—' : sgn(res.relLo) + ' đến ' + sgn(res.relHi)}</b></div>
        <div class="kpi"><span>Ngưỡng bạn đặt trước</span><b style="font-size:1.15rem">mở rộng ≥ ${ex.scaleIf}% · dừng &lt; ${ex.stopIf}%</b></div></div>
      <div class="lb-note"><b>Chỉ số bảo vệ · tỉ lệ hoàn hàng</b>A: ${f(res.guard.ra, 1)} (${res.guard.ya}/${res.guard.na} đơn) · B: ${f(res.guard.rb, 1)} (${res.guard.yb}/${res.guard.nb} đơn). Số đơn nhỏ nên chênh lệch này cũng có thể chỉ là nhiễu.</div></section>
      <section class="lb-sec"><h2>Quyết định của bạn</h2>
      ${[['scale', 'Mở rộng: dồn ngân sách dự phòng vào biến thể B'], ['extend', 'Kéo dài: chạy tiếp để có thêm mẫu'], ['iterate', 'Đổi biến: thử một thay đổi khác'], ['stop', 'Dừng: biến này không đáng đầu tư']].map(([v, t]) => radio('dec', v, p.read.decision === v, t)).join('')}
      <div class="fld"><label for="rw">Vì sao? Trích số liệu, nói về độ chắc chắn, nêu bước tiếp theo và chỉ số bảo vệ bạn sẽ theo dõi.</label><textarea id="rw" data-t="readwhy" maxlength="700">${escH(p.read.why)}</textarea><small>Phần chấm tự động tìm dấu hiệu của lập luận (có trích số, có nói về sai số, có bước tiếp). Hãy tự đọc lại theo bảng tự kiểm ở báo cáo.</small></div></section>`;
  }

  /* ---------- báo cáo ---------- */
  function renderReport() {
    const r = SE.run(p), s = S(), m = r.plan.model, res = r.result, rd = r.read;
    if (!reported) {
      reported = true; LabStore.clearDraft(TOOL);
      LabStore.addAttempt(TOOL, { scenario: p.scenario, mode: 'practice', p: clone(p), summary: { score: r.total, plan: r.planScore, read: rd ? rd.total : 0, pass: r.pass } });
    }
    const seg = s.segments.find((x) => x.id === p.segment), pos = s.positions.find((x) => x.id === p.position), msg = s.messages.find((x) => x.id === p.message);
    const bar = (a, b) => `<div class="part"><span>${a.label}</span><div class="meter"><i style="width:${Math.round(a.got / a.max * 100)}%"></i></div><b>${a.got}/${a.max}</b></div>`;
    app.innerHTML = `<div class="lb"><div class="lb-top"><a class="lb-back" href="lab-chien-luoc.html">← Làm brief khác</a><span class="lb-eyebrow">Báo cáo · ${escH(s.brand)} · ${tag()}</span></div>
      <div class="score"><b>${r.total}</b><span>/ 100 · ${r.pass ? 'Đạt' : 'Chưa đạt'} (ngưỡng ${D.passScore})</span></div>
      <p class="lb-lede">Điểm đo độ nhất quán của chuỗi lập luận và độ trung thực khi đọc số, không đo việc bạn "đoán đúng" chiến lược. ${escH(s.alt)}</p>
      <section class="lb-sec"><h2>Điểm theo phần</h2><div class="parts">${r.plan.parts.map(bar).join('')}${rd ? `<div class="part"><span>Đọc kết quả</span><div class="meter"><i style="width:${rd.total * 5}%"></i></div><b>${rd.total}/20</b></div>` : ''}</div></section>
      <section class="lb-sec"><h2>Nhận xét</h2>${[...r.plan.notes, ...(rd ? rd.notes : [])].map((n) => `<div class="dec" data-t="${n.tone}"><b>${escH(n.title)}</b><p>${escH(n.body)}</p></div>`).join('')}</section>
      <section class="lb-sec"><h2>Bản tóm tắt chiến lược của bạn</h2>
        <div class="tbl-wrap"><table class="tbl"><tbody>
          <tr><th>Khách</th><td>${escH(seg ? seg.t : '')}</td></tr><tr><th>Định vị</th><td>${escH(pos ? pos.t : '')}<br><small>Bỏ: ${escH(p.give)}</small></td></tr>
          <tr><th>Thông điệp</th><td>${escH(msg ? msg.t : '')}<br><b>${escH(p.headline)}</b></td></tr>
          <tr><th>Kênh</th><td>${m.active.map((c) => `${escH(c.t)} ${p.alloc[c.id]}%`).join(' · ') || '—'} · dự phòng ${p.alloc.reserve || 0}%</td></tr>
          <tr><th>Mô hình</th><td>${F.num(m.orders, 0)} đơn dự kiến · CAC ${m.cac ? F.vndShort(m.cac) : '—'} · trần ${F.vndShort(m.ceiling)}</td></tr>
          <tr><th>KPI</th><td>${p.kpis.picked.map((id) => escH(s.kpis.find((x) => x.id === id).t)).join(' · ')}<br><small>Mục tiêu: CAC ${escH(p.kpis.targets.cac)} ₫ · ${escH(p.kpis.targets.orders)} đơn</small></td></tr>
          <tr><th>Thí nghiệm</th><td>Nếu ${escH(p.exp.hypothesis.change)} thì ${escH(p.exp.hypothesis.effect)} vì ${escH(p.exp.hypothesis.because)}.<br><small>Mở rộng ≥ ${p.exp.scaleIf}% · dừng &lt; ${p.exp.stopIf}% · ${p.exp.weeks} tuần</small></td></tr>
          ${res ? `<tr><th>Kết quả</th><td>A ${F.pct(res.ra)} · B ${F.pct(res.rb)} · ${res.sig ? 'khác biệt vượt nhiễu' : 'chưa tách được khỏi nhiễu'}<br><small>Quyết định: ${SE.LABEL[p.read.decision] || '—'}</small></td></tr>` : ''}</tbody></table></div>
        <div class="row" style="margin-top:14px"><button class="lb-btn lb-btn--sm lb-btn--ghost" id="copy">Sao chép bản tóm tắt</button></div></section>
      <section class="lb-sec"><h2>Tự kiểm: bốn câu mà người duyệt thật sẽ hỏi</h2>
        <ul style="padding-left:20px;line-height:1.7;max-width:72ch">
          <li>Nếu giả thuyết của bạn sai, <b>con số nào</b> sẽ cho bạn biết, và bạn có đặt ngưỡng đó trước không?</li>
          <li>Nguồn nghiên cứu nào bạn tin nhất? Điểm yếu của nó có thể làm đổi kết luận không?</li>
          <li>Hướng đi khác ở brief này là gì? Bạn đã bỏ nó vì lý do gì ngoài cảm giác?</li>
          <li>Kết quả giả lập có thể do nhiễu. Bạn sẽ làm gì khác nếu chạy lại và thấy kết quả ngược lại?</li></ul></section>
      <section class="lb-sec"><h2>Hướng đi khác cũng hợp lý</h2>${s.paths.map((x) => `<div class="lb-row"><div><h3>Hướng ${x.id}</h3></div><p>${escH(x.name)}</p><span></span></div>`).join('')}
        <p class="lb-lede" style="font-size:14px">Thử lại với hướng còn lại để thấy đánh đổi thay đổi thế nào: nhóm khác, định vị khác, kênh khác, trần CAC khác.</p></section>
      <div class="row" style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap"><a class="lb-btn" href="lab-chien-luoc.html">Làm lượt mới</a><a class="lb-btn lb-btn--ghost" href="lab.html">Về Marketing Lab</a></div></div>`;
    document.getElementById('copy').onclick = () => { const t = [...document.querySelectorAll('.tbl tbody tr')].map((tr) => tr.innerText.replace(/\s+/g, ' ')).join('\n');
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => { const b = document.getElementById('copy'); b.textContent = 'Đã sao chép'; }); };
    window.scrollTo(0, 0);
  }

  /* ---------- vòng chính ---------- */
  const STAGE = [stepResearch, stepStrategy, stepMessage, stepBudget, stepKpi, stepExperiment, stepRead];
  function render() {
    if (view === 'start') return renderStart();
    app.innerHTML = shell(STAGE[step]());
    wire();
  }
  function go(i) { step = Math.max(0, Math.min(STEPS.length - 1, i)); save(); render(); window.scrollTo(0, 0); }
  function wire() {
    app.onclick = (e) => {
      const st = e.target.closest('[data-step]'); if (st && !st.disabled) return go(+st.dataset.step);
      const nv = e.target.closest('[data-nav]'); if (nv && !nv.disabled) { const d = +nv.dataset.nav; if (d > 0 && step === STEPS.length - 1) { view = 'report'; return renderReport(); } return go(step + d); }
      const op = e.target.closest('[data-open]'); if (op && !op.disabled) { const id = op.dataset.open; p.opened = p.opened.includes(id) ? p.opened : [...p.opened, id]; save(); render(); }
    };
    app.onchange = (e) => { const t = e.target;
      if (t.name === 'seg') p.segment = t.value;
      else if (t.name === 'pos') p.position = t.value;
      else if (t.name === 'msg') p.message = t.value;
      else if (t.name === 'dec') p.read.decision = t.value;
      else if (t.name === 'kpi') { const set = new Set(p.kpis.picked); t.checked ? set.add(t.value) : set.delete(t.value); p.kpis.picked = [...set]; }
      else if (t.dataset.alloc) { p.alloc[t.dataset.alloc] = Math.max(0, Math.min(100, Math.round(+t.value || 0))); save(); return render(); }
      else if (t.dataset.e) { p.exp[t.dataset.e] = ['mde', 'weeks', 'scaleIf', 'stopIf'].includes(t.dataset.e) ? +t.value : t.value; save(); return render(); }
      else return;
      save(); refreshNav();
    };
    app.oninput = (e) => { const t = e.target;
      if (t.dataset.t === 'give') p.give = t.value; else if (t.dataset.t === 'why') p.why = t.value; else if (t.dataset.t === 'headline') p.headline = t.value; else if (t.dataset.t === 'readwhy') p.read.why = t.value;
      else if (t.dataset.k) p.kpis.targets[t.dataset.k] = t.value.replace(/[^\d]/g, '');
      else if (t.dataset.h) p.exp.hypothesis[t.dataset.h] = t.value;
      else if (t.dataset.e && t.type === 'range') { p.exp[t.dataset.e] = +t.value; const lab = { mde: 'mdev', weeks: 'wkv', scaleIf: 'siv', stopIf: 'stv' }[t.dataset.e]; if (lab) document.getElementById(lab).textContent = t.value + (t.dataset.e === 'weeks' ? '' : '%'); return; }
      else return;
      refreshNav();
    };
  }

  const draft = LabStore.tool(TOOL).draft;
  if (q.get('id') && D.scenarios[q.get('id')]) { p = blank(q.get('id')); view = 'work'; save(); }
  else if (q.get('resume') && draft) { p = draft.p; step = draft.step || 0; view = 'work'; }
  render();
})();
