/* MARKETING LAB · GIAO DIỆN META ADS — dựng workspace, kết quả, so sánh. Logic nằm ở meta-sim.js / meta-eval.js.
   Cần: app.js (S, escH, award, appShell), frame.js (GW), engine/scenario/meta-sim/meta-eval/meta-guide/store. */
(function () {
  const E = LabEngine, F = E.fmt, M = LAB_META, CASE = LAB_CASES.skincare, TOOL = 'meta';
  const app = document.getElementById('app');
  const q = new URLSearchParams(location.search);
  const modeOf = (m) => M.modes[m] ? m : null;

  let mode = modeOf(q.get('mode')), cfg = null, step = 0, view = 'start', hintsUsed = {}, shown = null, cmpId = null, tipsOpen = {};
  const ctx = () => ({ seed: CASE.seed, aov: CASE.aov, grossMargin: CASE.grossMargin, leadToSale: CASE.leadToSale, budget: M.modes[mode || 'practice'].budget });
  const HINTS = 3;

  /* ---------- tiện ích ---------- */
  const modeName = (m) => M.modes[m].t;
  const dt = (t) => new Date(t).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const termBtn = (k, label) => `<button type="button" class="term" data-term="${k}">${escH(label || META_TERMS[k][0])}</button>`;
  const starsTxt = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
  const stepDone = (i) => META_STEPS[i].tasks.every(([, f]) => f(cfg, ctx()));
  const reachable = (i) => mode !== 'learn' || META_STEPS.slice(0, i).every((_, j) => stepDone(j));

  function saveDraft() { LabStore.setDraft(TOOL, cfg ? { mode, cfg, step, hints: hintsUsed, at: Date.now() } : null); }
  function evalAttempt(a, upto) {      // tính lại kết quả từ cấu hình đã lưu (mô hình xác định nên luôn ra cùng số)
    const all = LabStore.attempts(TOOL), idx = upto === undefined ? all.findIndex((x) => x.id === a.id) : upto;
    const c = { seed: CASE.seed, aov: CASE.aov, grossMargin: CASE.grossMargin, leadToSale: CASE.leadToSale, budget: M.modes[a.mode].budget };
    const res = MetaSim.simulate(a.cfg, c);
    const hist = all.slice(0, idx < 0 ? all.length : idx).filter((x) => x.mode === a.mode).map((x) => ({ roas: x.summary.roas }));
    return { res, ev: MetaEval.evaluate(a.cfg, res, c, a.mode, hist), c };
  }

  /* ---------- màn hình bắt đầu ---------- */
  function renderStart() {
    const t = LabStore.tool(TOOL), atts = t.attempts;
    const stat = (m) => { const a = atts.filter((x) => x.mode === m); return { n: a.length, best: a.reduce((b, x) => Math.max(b, x.summary.score), 0) }; };
    const draft = t.draft;
    app.innerHTML = `<div class="lb">
      <div class="lb-top"><a class="lb-back" href="lab.html">← Marketing Lab</a><span class="lb-eyebrow">Meta Ads Manager · mô phỏng</span></div>
      <h1>Chạy quảng cáo Meta cho một thương hiệu kem chống nắng</h1>
      <p class="lb-lede">Bạn sẽ dựng chiến dịch như trong Ads Manager: chọn mục tiêu, đối tượng, ngân sách, vị trí và viết quảng cáo. Mô phỏng chạy theo từng ngày với dữ liệu minh hoạ nhất quán, rồi giải thích vì sao kết quả như vậy. Không dùng tiền hay API thật.</p>
      ${draft ? `<div class="lb-note"><b>Bạn có một bản nháp chưa chạy</b>Chế độ ${escH(modeName(draft.mode))}, bước ${draft.step + 1}/5, lưu lúc ${dt(draft.at)}.
        <div class="actions" style="margin-top:10px"><button class="lb-btn lb-btn--sm" data-act="resume">Tiếp tục bản nháp</button><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="drop">Bỏ bản nháp</button></div></div>` : ''}
      <section class="lb-sec"><h2>Chọn chế độ</h2>
        ${Object.entries(M.modes).map(([id, m]) => { const s = stat(id);
          return `<div class="lb-row"><div><h3>${escH(m.t)}</h3><small>Hạn mức ${F.vnd(m.budget)}${s.n ? ` · ${s.n} lượt · điểm cao nhất ${s.best}` : ''}</small></div>
            <p>${escH(m.d)}${id === 'challenge' ? ` KPI: ROAS từ ${m.targets.roas} và ít nhất ${m.targets.orders} đơn.` : ''}</p>
            <button class="lb-btn${id === 'learn' ? '' : ' lb-btn--ghost'}" data-act="start" data-m="${id}">${s.n ? 'Làm lượt mới' : 'Bắt đầu'}</button></div>`; }).join('')}
      </section>
      ${atts.length ? `<section class="lb-sec"><h2>Lịch sử các lần chạy</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Lúc</th><th>Chế độ</th><th>Phiên bản</th><th>ROAS</th><th>Đơn</th><th>Điểm</th><th></th></tr></thead><tbody>
        ${atts.slice().reverse().map((a) => `<tr><td>${dt(a.at)}</td><td>${escH(modeName(a.mode))}</td><td>${escH(a.label || a.cfg.name || '—')}</td><td>${F.x(a.summary.roas)}</td><td>${F.int(a.summary.orders)}</td><td>${a.summary.score} ${a.mode === 'challenge' ? `<span class="stars" style="font-size:.9rem">${starsTxt(a.summary.stars)}</span>` : ''}</td>
          <td><button class="lb-btn lb-btn--text" data-act="open" data-id="${a.id}">Xem</button></td></tr>`).join('')}
      </tbody></table></div></section>` : ''}
    </div>`;
  }

  /* ---------- workspace dựng chiến dịch ---------- */
  function fieldHTML() {
    const c = cfg, o = M.objectives, key = META_STEPS[step].key, learn = mode === 'learn';
    const chk = (arr, id) => arr.includes(id) ? 'checked' : '';
    if (key === 'objective') return `
      <div class="fld"><label for="f-name">Tên chiến dịch</label><input id="f-name" type="text" data-f="name" value="${escH(c.name)}" maxlength="60" placeholder="Ví dụ: Nắng Mai · Ra mắt · Doanh số"></div>
      <div class="fld" data-tipbox><span class="lbl">Mục tiêu chiến dịch ${learn ? '· ' + termBtn('objective') : ''}</span>
        <div class="opts" role="radiogroup">${Object.entries(o).map(([id, x]) => `<label class="opt"><input type="radio" name="obj" data-f="objective" value="${id}" ${c.objective === id ? 'checked' : ''}><span><b>${escH(x.t)}</b><span>${escH(x.d)}</span></span></label>`).join('')}</div></div>`;
    if (key === 'audience') {
      const why = (arr, id) => { const x = arr.find((y) => y.id === id); return learn && x && x.why ? ` title="${escH(x.why)}"` : ''; };
      const chips = (arr, field, cur) => `<div class="chips">${arr.map((x) => `<label class="chip"${why(arr, x.id)}><input type="checkbox" data-f="${field}" value="${x.id}" ${chk(cur, x.id)}>${escH(x.t)}</label>`).join('')}</div>`;
      return `
      <div class="fld"><span class="lbl">Độ tuổi</span>${chips(M.age, 'age', c.age)}<small>${learn ? 'Di chuột (hoặc nhấn giữ) vào từng nhóm để xem lý do.' : ''}</small></div>
      <div class="fld"><span class="lbl">Giới tính</span><div class="seg" role="radiogroup">${M.gender.map((g) => `<label><input type="radio" name="gen" data-f="gender" value="${g.id}" ${c.gender === g.id ? 'checked' : ''}>${escH(g.t)}</label>`).join('')}</div></div>
      <div class="fld"><span class="lbl">Khu vực</span>${chips(M.location, 'location', c.location)}</div>
      <div class="fld" data-tipbox><span class="lbl">Sở thích (nhắm chi tiết) ${learn ? '· ' + termBtn('relevance') : ''}</span>${chips(M.interests, 'interests', c.interests)}
        <small>Chọn nhiều sở thích nghĩa là "hoặc": đối tượng rộng hơn. Không chọn gì là phủ người dùng nói chung.</small></div>`;
    }
    if (key === 'budget') return `
      <div class="fld" data-tipbox><label for="f-daily">Ngân sách mỗi ngày: <b id="v-daily">${F.vnd(c.dailyBudget)}</b> ${learn ? '· ' + termBtn('daily') : ''}</label>
        <input id="f-daily" type="range" min="50000" max="1500000" step="10000" value="${c.dailyBudget}" data-f="daily"></div>
      <div class="fld"><label for="f-dur">Số ngày chạy</label><select id="f-dur" data-f="duration">${M.days.map((d) => `<option value="${d}" ${c.duration === d ? 'selected' : ''}>${d} ngày</option>`).join('')}</select>
        <p id="v-total" style="margin:10px 0 0"></p></div>
      <div class="fld" data-tipbox><span class="lbl">Vị trí hiển thị ${learn ? '· ' + termBtn('placement') : ''}</span>
        <div class="seg" role="radiogroup"><label><input type="radio" name="pm" data-f="pmode" value="auto" ${c.placementMode === 'auto' ? 'checked' : ''}>Tự động</label><label><input type="radio" name="pm" data-f="pmode" value="manual" ${c.placementMode === 'manual' ? 'checked' : ''}>Thủ công</label></div>
        <div class="chips" id="plc" style="margin-top:12px">${M.placements.map((p) => `<label class="chip"><input type="checkbox" data-f="plc" value="${p.id}" ${chk(c.placements, p.id)} ${c.placementMode === 'auto' ? 'disabled' : ''}>${escH(p.t)}</label>`).join('')}</div>
        <small>${c.placementMode === 'auto' ? 'Meta tự phân bổ tới các vị trí có hiệu quả tốt nhất.' : 'Chỉ chạy ở các vị trí bạn chọn. Một vài vị trí rẻ hơn nhưng chất lượng lượt nhấp kém hơn.'}</small></div>`;
    if (key === 'creative') return `
      <div class="fld"><span class="lbl">Định dạng</span><div class="seg" role="radiogroup">${M.formats.map((f) => `<label><input type="radio" name="fmt" data-f="format" value="${f.id}" ${c.creative.format === f.id ? 'checked' : ''}>${escH(f.t)}</label>`).join('')}</div></div>
      <div class="fld"><label for="f-head">Tiêu đề <span class="cnt" id="c-head"></span></label><input id="f-head" type="text" data-f="headline" value="${escH(c.creative.headline)}" maxlength="80" placeholder="Nói lợi ích chính trong một dòng"></div>
      <div class="fld"><label for="f-prim">Nội dung chính <span class="cnt" id="c-prim"></span></label><textarea id="f-prim" data-f="primary" maxlength="400" placeholder="Lợi ích, bằng chứng và lý do hành động ngay">${escH(c.creative.primary)}</textarea></div>
      <div class="fld" data-tipbox><label for="f-cta">Nút kêu gọi (CTA) ${learn ? '· ' + termBtn('cta') : ''}</label><select id="f-cta" data-f="cta"><option value="">— Chọn —</option>${M.ctas.map((x) => `<option value="${x.id}" ${c.creative.cta === x.id ? 'selected' : ''}>${escH(x.t)}</option>`).join('')}</select></div>
      <div class="fld"><span class="lbl">Xem trước (Bảng tin di động)</span><div id="preview"></div></div>`;
    /* review */
    return `<div id="review"></div>`;
  }

  function previewHTML() {
    const c = cfg.creative, cta = (M.ctas.find((x) => x.id === c.cta) || { t: 'Chọn CTA' }).t;
    return `<div class="adpv"><header><span class="av" aria-hidden="true">${escH(CASE.brand[0])}</span><span><b>${escH(CASE.brand)}</b><span>Được tài trợ</span></span></header>
      <div class="txt">${escH(c.primary) || '<span style="color:var(--lb-ink3)">Nội dung chính sẽ hiện ở đây…</span>'}</div>
      <div class="img" data-f="${c.format}">${c.format === 'carousel' ? 'Nhiều ảnh · vuốt ngang' : 'Ảnh/video sản phẩm'}</div>
      <footer><span><small>tuhocmarketing.vn</small><b>${escH(c.headline) || 'Tiêu đề quảng cáo'}</b></span><i>${escH(cta)}</i></footer></div>`;
  }

  function reviewHTML() {
    const v = MetaSim.validate(cfg, ctx()), a = MetaSim.audience(cfg), cr = cfg.creative;
    const line = (i, k, val) => `<tr><th>${k}</th><td>${val}</td><td><button class="lb-btn lb-btn--text" data-act="goto" data-s="${i}">Sửa</button></td></tr>`;
    const nm = (arr, ids) => ids.map((id) => (arr.find((x) => x.id === id) || {}).t).filter(Boolean).join(', ') || '—';
    return `<table class="tbl"><tbody>
      ${line(0, 'Chiến dịch', `${escH(cfg.name) || '—'} · ${cfg.objective ? escH(M.objectives[cfg.objective].t) : 'chưa chọn mục tiêu'}`)}
      ${line(1, 'Đối tượng', `${escH(nm(M.age, cfg.age))} · ${escH((M.gender.find((g) => g.id === cfg.gender) || {}).t)} · ${escH(nm(M.location, cfg.location))}<br><small>Sở thích: ${escH(nm(M.interests, cfg.interests))} · ${F.int(a.size)} người</small>`)}
      ${line(2, 'Ngân sách', `${F.vnd(cfg.dailyBudget)} × ${cfg.duration} ngày = <b>${F.vnd(v.totalBudget)}</b><br><small>${cfg.placementMode === 'auto' ? 'Vị trí tự động' : 'Vị trí: ' + escH(nm(M.placements, cfg.placements))}</small>`)}
      ${line(3, 'Quảng cáo', `${escH(cr.headline) || '—'}<br><small>${escH((M.formats.find((f) => f.id === cr.format) || {}).t)} · CTA: ${escH((M.ctas.find((x) => x.id === cr.cta) || { t: 'chưa chọn' }).t)}</small>`)}
    </tbody></table>
    ${v.errors.map((e) => `<div class="lb-note lb-note--bad"><b>Cần sửa</b>${escH(e.msg)} <button class="lb-btn lb-btn--text" data-act="goto" data-s="${e.step}">Đi tới bước</button></div>`).join('')}
    ${v.warnings.map((e) => `<div class="lb-note lb-note--warn"><b>Lưu ý</b>${escH(e.msg)}</div>`).join('')}
    <div class="lb-note"><b>Giả định của mô phỏng</b>Giá và tỉ lệ cơ sở là số minh hoạ cho thị trường Việt Nam. Giá trị đơn trung bình ${F.vnd(CASE.aov)}, biên lợi nhuận gộp ${F.pct(CASE.grossMargin, 0)} (hoà vốn ở ROAS ${F.x(1 / CASE.grossMargin)}). Cùng một cấu hình luôn cho cùng một kết quả.</div>`;
  }

  function sideHTML() {
    const est = MetaSim.estimate(cfg), m = M.modes[mode], s = META_STEPS[step], x = ctx();
    const over = est.total > x.budget;
    const estBox = `<section class="est"><h3>Ước tính</h3>
      <div><span>Quy mô đối tượng</span><b>${est.audience ? F.int(est.audience) : '—'}</b></div>
      <div><span>Tiếp cận mỗi ngày</span><b>${est.audience ? F.int(est.reachLow) + '–' + F.int(est.reachHigh) : '—'}</b></div>
      <div><span>Tổng ngân sách</span><b${over ? ' style="color:var(--lb-bad)"' : ''}>${F.vnd(est.total)}</b></div>
      <div><span>Hạn mức bài</span><b>${F.vnd(x.budget)}</b></div>
      ${mode === 'learn' && est.audience ? `<div><span>Độ phù hợp ${termBtn('relevance')}</span><b>${Math.round(est.rel * 100)}/100</b></div>` : ''}</section>`;
    let guide = '';
    if (mode === 'learn') {
      guide = `<section data-tipbox><h3>Hướng dẫn · bước ${step + 1}/5</h3><p>${escH(s.what)}</p>
        ${s.tasks.length ? `<div>${s.tasks.map(([t, f]) => `<div class="task" data-ok="${f(cfg, x) ? 1 : 0}"><i></i><span>${escH(t)}</span></div>`).join('')}</div>` : ''}
        <p><b>Vì sao:</b> ${escH(s.why)}</p>
        <p>${s.terms.map((k) => termBtn(k)).join(' · ')}</p>
        ${s.fill ? `<button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="fill">Điền gợi ý của bài học</button>` : ''}</section>`;
    } else if (mode === 'practice') {
      const left = HINTS - Object.keys(hintsUsed).length, shownHint = hintsUsed[s.key];
      guide = `<section><h3>Gợi ý · còn ${left}/${HINTS}</h3>
        ${shownHint ? `<p>${escH(s.hint)}</p>` : left > 0 ? `<button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="hint">Xem gợi ý cho bước này</button>` : '<p>Bạn đã dùng hết gợi ý. Hãy dựa vào dữ liệu ước tính và các lần chạy trước.</p>'}</section>`;
    } else {
      const t = m.targets;
      guide = `<section><h3>Đề bài</h3><p><b>${escH(CASE.brand)}</b> ra mắt ${escH(CASE.product)}. ${escH(CASE.brief)}</p>
        <div class="task" data-ok="${est.total <= x.budget ? 1 : 0}"><i></i><span>Ngân sách ≤ ${F.vnd(x.budget)}</span></div>
        <div class="task" data-ok="0"><i></i><span>ROAS ≥ ${t.roas} (hoà vốn ${F.x(1 / CASE.grossMargin)})</span></div>
        <div class="task" data-ok="0"><i></i><span>Tối thiểu ${MetaEval.targets('challenge', x.budget).orders} đơn hàng</span></div>
        <p style="font-size:13px">Không có hướng dẫn từng bước. Điểm chấm theo chất lượng quyết định, không theo việc bấm đúng nút.</p></section>`;
    }
    return guide + estBox;
  }

  function dockHTML() {
    const est = MetaSim.estimate(cfg), last = step === 4, v = MetaSim.validate(cfg, ctx());
    const gate = mode === 'learn' && !stepDone(step);
    return `<div class="dock"><div><small>Tổng ngân sách<br><b>${F.vnd(est.total)}</b></small>
      <span style="display:flex;gap:10px">${step > 0 ? `<button class="lb-btn lb-btn--ghost" data-act="prev">Quay lại</button>` : `<button class="lb-btn lb-btn--ghost" data-act="exit">Thoát</button>`}
      ${last ? `<button class="lb-btn" data-act="run" ${v.ok ? '' : 'disabled'}>Xuất bản & chạy mô phỏng</button>` : `<button class="lb-btn" data-act="next" ${gate ? 'disabled' : ''}>Tiếp theo</button>`}</span></div></div>`;
  }

  function renderBuild() {
    const s = META_STEPS[step];
    app.innerHTML = `<div class="lb">
      <div class="lb-top"><a class="lb-back" href="#" data-act="exit">← Chế độ & lịch sử</a><span class="lb-eyebrow">${escH(modeName(mode))} · Meta Ads Manager</span></div>
      <h1 style="font-size:clamp(1.4rem,2.6vw,1.9rem)">${escH(cfg.name || 'Chiến dịch mới')}</h1>
      <nav class="steps" aria-label="Các bước">${META_STEPS.map((x, i) => `<button type="button" data-act="goto" data-s="${i}" ${i === step ? 'aria-current="step"' : ''} data-done="${i < step && (!x.tasks.length || stepDone(i)) ? 1 : 0}" ${reachable(i) ? '' : 'disabled'}>${i + 1}. ${escH(x.t)}</button>`).join('')}</nav>
      <div class="ws"><div class="pane"><h2>${escH(s.t)}</h2>${fieldHTML()}</div><aside class="side" id="side"></aside></div>
      <div id="dockwrap"></div></div>`;
    refresh();
  }

  /* cập nhật các phần phụ thuộc cấu hình mà KHÔNG dựng lại ô nhập (giữ nguyên con trỏ) */
  function refresh() {
    const side = document.getElementById('side'); if (!side) return;
    side.innerHTML = sideHTML(); document.getElementById('dockwrap').innerHTML = dockHTML();
    const set = (id, h) => { const el = document.getElementById(id); if (el) el.innerHTML = h; };
    set('preview', previewHTML());
    const rv = document.getElementById('review'); if (rv) rv.innerHTML = reviewHTML();
    const t = document.getElementById('v-total');
    if (t) { const tot = cfg.dailyBudget * cfg.duration, cap = ctx().budget;
      t.innerHTML = `Tổng chi tiêu: <b>${F.vnd(tot)}</b> / hạn mức ${F.vnd(cap)}${tot > cap ? ' <span style="color:var(--lb-bad)">— vượt hạn mức, hãy giảm ngân sách hoặc số ngày.</span>' : ''}`; }
    const vd = document.getElementById('v-daily'); if (vd) vd.textContent = F.vnd(cfg.dailyBudget);
    const ch = document.getElementById('c-head'); if (ch) { const n = cfg.creative.headline.length; ch.textContent = n + '/45 gợi ý'; ch.dataset.over = n > 45 ? 1 : 0; }
    const cp = document.getElementById('c-prim'); if (cp) { const n = cfg.creative.primary.length; cp.textContent = n + '/280 gợi ý'; cp.dataset.over = n > 280 ? 1 : 0; }
    document.querySelectorAll('.steps button').forEach((b, i) => { b.disabled = !reachable(i); b.dataset.done = i < step && (!META_STEPS[i].tasks.length || stepDone(i)) ? 1 : 0; });
    const h1 = app.querySelector('h1'); if (h1) h1.textContent = cfg.name || 'Chiến dịch mới';
    saveDraft();
  }

  function readField(el) {
    const f = el.dataset.f, v = el.value, c = cfg;
    const toggle = (arr) => el.checked ? [...new Set([...arr, v])] : arr.filter((x) => x !== v);
    if (f === 'name') c.name = v;
    else if (f === 'objective') { c.objective = v; const ok = M.objectives[v].cta; if (c.creative.cta && !ok.includes(c.creative.cta)) { /* giữ CTA; điểm nội dung sẽ phản ánh lệch */ } }
    else if (f === 'age') c.age = toggle(c.age);
    else if (f === 'gender') c.gender = v;
    else if (f === 'location') c.location = toggle(c.location);
    else if (f === 'interests') c.interests = toggle(c.interests);
    else if (f === 'daily') c.dailyBudget = +v;
    else if (f === 'duration') c.duration = +v;
    else if (f === 'pmode') { c.placementMode = v; document.querySelectorAll('#plc input').forEach((i) => { i.disabled = v === 'auto'; }); }
    else if (f === 'plc') c.placements = toggle(c.placements);
    else if (f === 'format') c.creative.format = v;
    else if (f === 'headline') c.creative.headline = v;
    else if (f === 'primary') c.creative.primary = v;
    else if (f === 'cta') c.creative.cta = v || null;
  }

  /* ---------- chạy mô phỏng ---------- */
  function publish(label, base) {
    const x = ctx(), v = MetaSim.validate(cfg, x); if (!v.ok) return false;
    const prior = LabStore.attempts(TOOL);
    const res = MetaSim.simulate(cfg, x);
    const hist = prior.filter((a) => a.mode === mode).map((a) => ({ roas: a.summary.roas }));
    const ev = MetaEval.evaluate(cfg, res, x, mode, hist);
    let gw = null;
    if (mode === 'challenge') gw = GW.report('lab-meta', ev.stars, ev.total);
    const a = LabStore.addAttempt(TOOL, { mode, cfg: JSON.parse(JSON.stringify(cfg)), label: label || '',
      summary: { roas: res.totals.roas, orders: Math.round(res.orders), spend: res.totals.spend, revenue: res.totals.revenue, score: ev.total, stars: ev.stars },
      feed: res.feed });
    LabStore.clearDraft(TOOL);
    shown = { a, res, ev, gw, baseId: base || (prior.length ? prior[prior.length - 1].id : null) };
    cmpId = shown.baseId; view = 'results'; render(); window.scrollTo(0, 0);
    return true;
  }

  /* ---------- biểu đồ ---------- */
  function chart(rows, accessor, fmt, cumulative) {
    const W = 640, H = 210, L = 46, B = 26, T = 10, R = 10;
    const ys = rows.map((r) => accessor(r) ?? 0), max = Math.max(...ys, 1e-9);
    const px = (i) => L + (rows.length > 1 ? i / (rows.length - 1) : 0.5) * (W - L - R), py = (y) => T + (1 - y / max) * (H - T - B);
    const pts = ys.map((y, i) => `${px(i).toFixed(1)},${py(y).toFixed(1)}`).join(' ');
    const area = `${L},${H - B} ${pts} ${px(ys.length - 1).toFixed(1)},${H - B}`;
    const grid = [0, 0.5, 1].map((g) => `<line x1="${L}" x2="${W - R}" y1="${py(max * g)}" y2="${py(max * g)}" stroke="currentColor" opacity=".13"/><text x="${L - 6}" y="${py(max * g) + 4}" text-anchor="end">${fmt(max * g)}</text>`).join('');
    const xl = rows.map((r, i) => (rows.length <= 10 || i % 2 === 0) ? `<text x="${px(i)}" y="${H - 8}" text-anchor="middle">N${r.day}</text>` : '').join('');
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ theo ngày"><g style="color:var(--lb-ink)">${grid}</g>
      <polygon points="${area}" fill="var(--lb-acc)" opacity=".12"/><polyline points="${pts}" fill="none" stroke="var(--lb-acc)" stroke-width="2.4" stroke-linejoin="round"/>
      ${ys.map((y, i) => `<circle cx="${px(i)}" cy="${py(y)}" r="3" fill="var(--lb-acc)"><title>Ngày ${rows[i].day}: ${fmt(y)}</title></circle>`).join('')}${xl}</svg>`;
  }
  const METRICS = {
    impressions: ['Hiển thị', (r) => r.impressions, F.int], clicks: ['Lượt nhấp', (r) => r.clicks, F.int], conversions: ['Chuyển đổi', (r) => r.conversions, F.int],
    roas: ['ROAS luỹ kế', (r) => r.cum.roas, (v) => F.num(v, 2)], reach: ['Tiếp cận luỹ kế', (r) => r.reach, F.int], cpa: ['CPA luỹ kế', (r) => r.cum.cpa, F.vndShort],
  };
  let metric = 'roas';

  /* ---------- màn hình kết quả ---------- */
  function renderResults() {
    const { a, res, ev, gw } = shown, t = res.totals, d = res.diag;
    const others = LabStore.attempts(TOOL).filter((x) => x.id !== a.id);
    const base = cmpId ? others.find((x) => x.id === cmpId) : null;
    const bt = base ? MetaSim.simulate(base.cfg, { seed: CASE.seed, aov: CASE.aov, grossMargin: CASE.grossMargin, leadToSale: CASE.leadToSale, budget: M.modes[base.mode].budget }).totals : null;
    const cmp = bt ? E.compare(bt, t) : null;
    const kp = [['impressions', 'Hiển thị', F.int], ['reach', 'Tiếp cận', F.int], ['cpm', 'CPM', F.vnd], ['clicks', 'Lượt nhấp', F.int], ['ctr', 'CTR', F.pct], ['cpc', 'CPC', F.vnd],
      ['conversions', d.objective === 'leads' ? 'Khách tiềm năng' : 'Chuyển đổi', F.int], ['cvr', 'CVR', F.pct], ['cpa', 'CPA', F.vnd], ['revenue', 'Doanh thu', F.vnd], ['roas', 'ROAS', F.x], ['spend', 'Chi tiêu', F.vnd]];
    const kpi = kp.map(([k, l, f]) => { const c = cmp && cmp[k], tip = META_TERMS[k] ? termBtn(k, l) : escH(l);
      const sign = c && c.delta !== null && c.verdict !== 'flat' ? (c.delta > 0 ? '▲ ' : '▼ ') : '';
      return `<div class="kpi" data-tipbox><span>${tip}</span><b>${f(t[k])}</b>${c ? `<em data-v="${c.verdict}">${c.delta === null ? 'chưa so được' : c.verdict === 'flat' ? 'không đổi' : sign + (c.pct === null ? '' : F.num(Math.abs(c.pct) * 100, 0) + '%')} ${c.verdict === 'better' ? 'tốt hơn' : c.verdict === 'worse' ? 'kém hơn' : ''}</em>` : ''}</div>`; }).join('');
    const m = METRICS[metric];
    const exps = MetaEval.experiments(a.cfg, { budget: M.modes[a.mode].budget });
    const mType = a.mode === 'challenge';
    app.innerHTML = `<div class="lb">
      <div class="lb-top"><a class="lb-back" href="#" data-act="exit">← Chế độ & lịch sử</a><span class="lb-eyebrow">Kết quả · ${escH(modeName(a.mode))}</span></div>
      <h1>${escH(a.label || a.cfg.name || 'Chiến dịch')}</h1>
      <div class="score" style="margin-top:18px"><b>${ev.total}</b><span>/ 100 điểm${mType ? ` <span class="stars">${starsTxt(ev.stars)}</span>` : ''}</span></div>
      ${gw ? `<p class="lb-lede" style="margin-top:6px">${gw.gain > 0 ? (gw.xp > 0 ? `Sao mới +${gw.gain} → +${gw.xp} XP.` : `Sao mới +${gw.gain}; hôm nay đã đủ XP từ game.`) : 'Chưa có sao mới. XP chỉ tính cho sao mới.'}</p>` : `<p class="lb-lede" style="margin-top:6px">Chế độ ${escH(modeName(a.mode))} cho điểm để bạn so sánh, nhưng chỉ Thử thách mới tính sao và XP.</p>`}
      <div class="parts">${ev.parts.map((p) => `<div class="part"><span>${escH(p.label)}</span><div class="meter"><i style="width:${p.got / p.max * 100}%"></i></div><b>${p.got}/${p.max}</b></div>`).join('')}</div>

      <section class="lb-sec"><h2>Chỉ số chiến dịch</h2>
        ${base ? `<p class="lb-lede" style="margin-top:6px">So với: <b>${escH(base.label || base.cfg.name || 'lần trước')}</b> (${dt(base.at)}).</p>` : ''}
        <div class="kpis">${kpi}</div>
        <div class="tabs" role="group" aria-label="Chỉ số theo ngày">${Object.entries(METRICS).map(([k, x]) => `<button type="button" data-act="metric" data-k="${k}" aria-pressed="${k === metric}">${x[0]}</button>`).join('')}</div>
        ${chart(res.days, (r) => m[1](r), m[2])}
      </section>

      <section class="lb-sec"><h2>Đọc kết quả</h2>
        ${ev.interpretation.map((p) => `<p style="margin:8px 0">${escH(p)}</p>`).join('')}
        ${d.learns && t.conversions < 50 ? `<div class="lb-note lb-note--warn" data-tipbox><b>${termBtn('learning')}</b>Chiến dịch ${F.int(t.conversions)}/50 chuyển đổi nên phần lớn thời gian bị phạt hiệu quả ~20%.</div>` : ''}
      </section>

      <section class="lb-sec"><h2>Vì sao (từng quyết định)</h2>
        ${ev.decisions.map((x) => `<div class="dec" data-t="${x.tone}"><b>${escH(x.title)}</b><p>${escH(x.body)}</p></div>`).join('')}
      </section>

      <section class="lb-sec"><h2>Nên cải thiện gì tiếp theo</h2>
        ${ev.recommendations.length ? `<ol style="padding-left:20px">${ev.recommendations.map((r) => `<li style="margin:8px 0">${escH(r)}</li>`).join('')}</ol>` : '<p>Không còn điểm yếu lớn. Thử thay đổi từng biến số bên dưới để hiểu độ nhạy của kết quả.</p>'}
      </section>

      <section class="lb-sec"><h2>Thử thay đổi một quyết định</h2>
        <p class="lb-lede">Mỗi thử nghiệm đổi đúng một điều rồi chạy lại ngay; kết quả được so sánh với phiên bản này.</p>
        ${exps.map((e) => `<div class="lb-exp"><div><b>${escH(e.t)}</b><p>${escH(e.why)}</p></div><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="exp" data-e="${e.id}">Chạy thử</button></div>`).join('')}
      </section>

      <section class="lb-sec"><h2>So sánh các phiên bản</h2>
        ${others.length ? `<label style="font-size:14px">So với: <select class="pick" data-act="cmp">${others.slice().reverse().map((x) => `<option value="${x.id}" ${x.id === cmpId ? 'selected' : ''}>${dt(x.at)} · ${escH(modeName(x.mode))} · ${escH(x.label || x.cfg.name || '')} · điểm ${x.summary.score}</option>`).join('')}</select></label>` : '<p class="lb-lede">Đây là lần chạy đầu tiên. Sửa một thứ rồi chạy lại để so sánh.</p>'}
        <div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Lần chạy</th><th>Mục tiêu</th><th>Chi tiêu</th><th>ROAS</th><th>Đơn</th><th>Điểm</th></tr></thead><tbody>
          ${LabStore.attempts(TOOL).slice(-8).reverse().map((x) => `<tr><td>${dt(x.at)}${x.id === a.id ? ' · <b>đang xem</b>' : ''}</td><td>${escH(M.objectives[x.cfg.objective].t)}</td><td>${F.vndShort(x.summary.spend)}</td><td>${F.x(x.summary.roas)}</td><td>${F.int(x.summary.orders)}</td><td>${x.summary.score}</td></tr>`).join('')}
        </tbody></table></div>
      </section>

      <section class="lb-sec"><h2>Dữ liệu sang GA4</h2>
        <p>GA4 sẽ nhận từ lần chạy này: <b>${F.int(res.feed.sessions)}</b> phiên (nguồn <code>facebook / paid_social</code>), <b>${F.int(res.feed.conversions)}</b> chuyển đổi, doanh thu <b>${F.vnd(res.feed.revenue)}</b>.
        Giả định: ${F.pct(res.feed.assumptions.sessionRate, 0)} lượt nhấp thành phiên có ghi nhận; GA4 thấy ${F.pct(res.feed.assumptions.convRate, 0)} số chuyển đổi mà Meta báo vì dùng last-click. ${escH(res.feed.note)}</p>
        <div class="actions"><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="pick" ${LabStore.picked(CASE.id, TOOL) && LabStore.picked(CASE.id, TOOL).id === a.id ? 'disabled' : ''}>${LabStore.picked(CASE.id, TOOL) && LabStore.picked(CASE.id, TOOL).id === a.id ? 'Đã chọn cho case xuyên suốt' : 'Dùng lần chạy này cho case xuyên suốt'}</button></div>
      </section>

      <div class="actions"><button class="lb-btn" data-act="edit">Sửa phiên bản này & chạy lại</button><button class="lb-btn lb-btn--ghost" data-act="new">Làm phiên bản mới từ đầu</button><a class="lb-btn lb-btn--ghost" href="lab.html">Về Marketing Lab</a></div>
    </div>`;
  }

  /* ---------- điều phối ---------- */
  function startMode(m, from) {
    mode = m; cfg = from || MetaSim.emptyConfig(); step = 0;
    if (!from) { const cap = ctx().budget; if (cfg.dailyBudget * cfg.duration > cap) cfg.dailyBudget = Math.floor(cap / cfg.duration / 10000) * 10000; } hintsUsed = {}; view = 'build'; render();
  }
  function render() {
    if (view === 'build' && cfg) renderBuild(); else if (view === 'results' && shown) renderResults(); else { view = 'start'; renderStart(); }
    const u = new URL(location.href); if (mode && view !== 'start') u.searchParams.set('mode', mode); else u.searchParams.delete('mode');
    history.replaceState(null, '', u);
  }

  app.addEventListener('input', (e) => { const el = e.target; if (el.dataset && el.dataset.f && (el.type === 'text' || el.tagName === 'TEXTAREA' || el.type === 'range')) { readField(el); refresh(); } });
  app.addEventListener('change', (e) => { const el = e.target;
    if (el.dataset && el.dataset.f && !(el.type === 'text' || el.tagName === 'TEXTAREA' || el.type === 'range')) { readField(el); refresh(); }
    if (el.dataset && el.dataset.act === 'cmp') { cmpId = el.value; renderResults(); } });
  app.addEventListener('click', (e) => {
    const term = e.target.closest('.term');
    if (term) { const box = term.closest('[data-tipbox]') || term.parentElement, id = term.dataset.term, old = box.querySelector(`.termtip[data-for="${id}"]`);
      if (old) { old.remove(); return; }
      const tip = document.createElement('span'); tip.className = 'termtip'; tip.dataset.for = id; tip.textContent = META_TERMS[id][1]; box.appendChild(tip); return; }
    const b = e.target.closest('[data-act]'); if (!b || b.tagName === 'SELECT') return;
    const act = b.dataset.act;
    if (act === 'exit') { e.preventDefault(); if (cfg && view === 'build') saveDraft(); view = 'start'; shown = null; render(); }
    else if (act === 'start') { const d = LabStore.tool(TOOL).draft; startMode(b.dataset.m, d && d.mode === b.dataset.m ? d.cfg : null); if (d && d.mode === b.dataset.m) { step = d.step || 0; hintsUsed = d.hints || {}; render(); } }
    else if (act === 'resume') { const d = LabStore.tool(TOOL).draft; if (d) { mode = d.mode; cfg = d.cfg; step = d.step || 0; hintsUsed = d.hints || {}; view = 'build'; render(); } }
    else if (act === 'drop') { LabStore.clearDraft(TOOL); render(); }
    else if (act === 'goto') { const s = +b.dataset.s; if (reachable(s)) { step = s; render(); window.scrollTo(0, 0); } }
    else if (act === 'next') { if (step < 4 && (mode !== 'learn' || stepDone(step))) { step++; render(); window.scrollTo(0, 0); } }
    else if (act === 'prev') { if (step > 0) { step--; render(); window.scrollTo(0, 0); } }
    else if (act === 'fill') { cfg = META_STEPS[step].fill(cfg, ctx()); render(); }
    else if (act === 'hint') { hintsUsed[META_STEPS[step].key] = 1; refresh(); }
    else if (act === 'run') { publish(''); }
    else if (act === 'open') { const a = LabStore.attempts(TOOL).find((x) => x.id === b.dataset.id); if (a) { const r = evalAttempt(a); mode = a.mode; shown = { a, res: r.res, ev: r.ev, gw: null }; const all = LabStore.attempts(TOOL), i = all.findIndex((x) => x.id === a.id); cmpId = i > 0 ? all[i - 1].id : null; view = 'results'; render(); window.scrollTo(0, 0); } }
    else if (act === 'metric') { metric = b.dataset.k; renderResults(); }
    else if (act === 'edit') { cfg = JSON.parse(JSON.stringify(shown.a.cfg)); mode = shown.a.mode; step = 0; hintsUsed = {}; view = 'build'; render(); window.scrollTo(0, 0); }
    else if (act === 'new') { startMode(shown.a.mode, null); }
    else if (act === 'pick') { LabStore.pickForCase(CASE.id, TOOL, shown.a.id); renderResults(); }
    else if (act === 'exp') { const ex = MetaEval.experiments(shown.a.cfg, { budget: M.modes[shown.a.mode].budget }).find((x) => x.id === b.dataset.e); if (!ex) return;
      const baseId = shown.a.id; mode = shown.a.mode; cfg = ex.apply(JSON.parse(JSON.stringify(shown.a.cfg)));
      if (!publish('Thử nghiệm: ' + ex.t, baseId)) { view = 'build'; step = 4; render(); } }
  });

  /* mở trực tiếp ?mode=… */
  const d0 = LabStore.tool(TOOL).draft;
  if (mode && d0 && d0.mode === mode) { cfg = d0.cfg; step = d0.step || 0; hintsUsed = d0.hints || {}; view = 'build'; render(); }
  else if (mode) startMode(mode);
  else render();
})();
