/* MARKETING LAB · GIAO DIỆN GOOGLE ADS — workspace, kết quả, báo cáo cụm từ tìm kiếm.
   Logic ở gads-sim.js / gads-eval.js. Cần: app.js, frame.js, engine, scenario, gads-data, store, ui-kit, gads-guide. */
(function () {
  const E = LabEngine, F = E.fmt, G = LAB_GADS, CASE = LAB_CASES.skincare, TOOL = 'gads', GID = 'lab-gads', LAST = GADS_STEPS.length - 1;
  const app = document.getElementById('app'), U = LabUI, dt = U.dt, starsTxt = U.stars;
  const q = new URLSearchParams(location.search);
  let mode = G.modes[q.get('mode')] ? q.get('mode') : null, cfg = null, step = 0, view = 'start', hintsUsed = {}, shown = null, cmpId = null;
  let kwSort = 'vol', kwFilter = 'all', metric = 'roas', customNeg = '';
  const HINTS = 3;
  const SC = () => ({ seed: CASE.seed + 7, aov: CASE.aov, grossMargin: CASE.grossMargin, leadToSale: CASE.leadToSale });
  const ctx = (m) => ({ ...SC(), budget: G.modes[m || mode || 'practice'].budget });
  const termBtn = (k, label) => `<button type="button" class="term" data-term="${k}">${escH(label || GADS_TERMS[k][0])}</button>`;
  const KW = (id) => G.keywords.find((k) => k.id === id);
  const INTENT = { transactional: 'Mua ngay', commercial: 'So sánh', informational: 'Tìm hiểu', navigational: 'Tìm thương hiệu' };
  const stepDone = (i) => GADS_STEPS[i].tasks.every(([, f]) => f(cfg, ctx()));
  const reachable = (i) => mode !== 'learn' || GADS_STEPS.slice(0, i).every((_, j) => stepDone(j));

  function saveDraft() { LabStore.setDraft(TOOL, cfg ? { mode, cfg, step, hints: hintsUsed, at: Date.now() } : null); }
  function evalAttempt(a) {
    const all = LabStore.attempts(TOOL), idx = all.findIndex((x) => x.id === a.id), c = ctx(a.mode);
    const res = GadsSim.simulate(a.cfg, c), hist = all.slice(0, Math.max(idx, 0)).filter((x) => x.mode === a.mode).map((x) => ({ roas: x.summary.roas }));
    return { res, ev: GadsEval.evaluate(a.cfg, res, c, a.mode, hist) };
  }

  /* ---------- màn hình bắt đầu ---------- */
  function renderStart() {
    const t = LabStore.tool(TOOL), atts = t.attempts, draft = t.draft;
    const stat = (m) => { const a = atts.filter((x) => x.mode === m); return { n: a.length, best: a.reduce((b, x) => Math.max(b, x.summary.score), 0) }; };
    app.innerHTML = `<div class="lb">
      <div class="lb-top"><a class="lb-back" href="lab.html">← Marketing Lab</a><span class="lb-eyebrow">Google Ads · quảng cáo tìm kiếm · mô phỏng</span></div>
      <h1>Bắt người đang tìm kem chống nắng</h1>
      <p class="lb-lede">Khác với Meta (đi tìm người), ở đây người dùng tự gõ nhu cầu. Bạn chọn từ khoá, kiểu khớp, từ khoá phủ định, giá thầu, viết quảng cáo và chọn trang đích. Kết quả phụ thuộc ý định tìm kiếm, độ liên quan, điểm chất lượng, cạnh tranh và trang đích. Đây là mô hình dạy học, không phải thuật toán thật.</p>
      ${draft ? `<div class="lb-note"><b>Bạn có một bản nháp chưa chạy</b>Chế độ ${escH(G.modes[draft.mode].t)}, bước ${draft.step + 1}/${GADS_STEPS.length}, lưu lúc ${dt(draft.at)}.
        <div class="actions" style="margin-top:10px"><button class="lb-btn lb-btn--sm" data-act="resume">Tiếp tục bản nháp</button><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="drop">Bỏ bản nháp</button></div></div>` : ''}
      <section class="lb-sec"><h2>Chọn chế độ</h2>
        ${Object.entries(G.modes).map(([id, m]) => { const s = stat(id);
          return `<div class="lb-row"><div><h3>${escH(m.t)}</h3><small>Hạn mức ${F.vnd(m.budget)}${s.n ? ` · ${s.n} lượt · điểm cao nhất ${s.best}` : ''}</small></div>
            <p>${escH(m.d)}${id === 'challenge' ? ` KPI: ROAS từ ${m.targets.roas} và ít nhất ${m.targets.orders} đơn.` : ''}</p>
            <button class="lb-btn${id === 'learn' ? '' : ' lb-btn--ghost'}" data-act="start" data-m="${id}">${s.n ? 'Làm lượt mới' : 'Bắt đầu'}</button></div>`; }).join('')}
      </section>
      ${atts.length ? `<section class="lb-sec"><h2>Lịch sử các lần chạy</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Lúc</th><th>Chế độ</th><th>Phiên bản</th><th>ROAS</th><th>Đơn</th><th>Điểm</th><th></th></tr></thead><tbody>
        ${atts.slice().reverse().map((a) => `<tr><td>${dt(a.at)}</td><td>${escH(G.modes[a.mode].t)}</td><td>${escH(a.label || a.cfg.name || '—')}</td><td>${F.x(a.summary.roas)}</td><td>${F.int(a.summary.orders)}</td><td>${a.summary.score}${a.mode === 'challenge' ? ` <span class="stars" style="font-size:.9rem">${starsTxt(a.summary.stars)}</span>` : ''}</td>
          <td><button class="lb-btn lb-btn--text" data-act="open" data-id="${a.id}">Xem</button></td></tr>`).join('')}
      </tbody></table></div></section>` : ''}
    </div>`;
  }

  /* ---------- các bước ---------- */
  function kwTable() {
    const sel = new Map(cfg.keywords.map((s) => [s.id, s.match]));
    let list = G.keywords.filter((k) => kwFilter === 'all' || k.intent === kwFilter);
    const by = { vol: (a, b) => b.vol - a.vol, cpc: (a, b) => b.cpc - a.cpc, comp: (a, b) => b.comp - a.comp, rel: (a, b) => b.rel - a.rel };
    list = list.slice().sort(by[kwSort]);
    return `<div class="fld"><div class="chips" style="margin-bottom:10px">${[['all', 'Tất cả']].concat(Object.entries(INTENT)).map(([id, t]) =>
        `<label class="chip"><input type="radio" name="kwf" data-f="kwfilter" value="${id}" ${kwFilter === id ? 'checked' : ''}>${escH(t)}</label>`).join('')}</div>
      <label style="font-size:14px">Sắp xếp theo <select class="pick" data-f="kwsort">${[['vol', 'Lượt tìm kiếm'], ['cpc', 'Giá thầu tham chiếu'], ['comp', 'Cạnh tranh'], ['rel', 'Độ phù hợp với sản phẩm']].map(([v, t]) => `<option value="${v}" ${kwSort === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Chọn</th><th>Từ khoá</th><th>Tìm/tháng</th><th>Cạnh tranh</th><th>CPC tham chiếu</th><th>Ý định</th><th>Phù hợp</th><th>Kiểu khớp</th></tr></thead><tbody>
      ${list.map((k) => `<tr><td><input type="checkbox" data-f="kw" value="${k.id}" ${sel.has(k.id) ? 'checked' : ''} aria-label="Chọn ${escH(k.kw)}"></td>
        <td><b>${escH(k.kw)}</b>${mode === 'learn' && k.note ? `<br><small>${escH(k.note)}</small>` : ''}</td><td>${F.int(k.vol)}</td>
        <td><div class="meter" style="width:70px"><i style="width:${k.comp * 100}%"></i></div></td><td>${F.vnd(k.cpc)}</td><td>${INTENT[k.intent]}</td>
        <td>${F.num(k.rel * 100, 0)}/100</td>
        <td><select class="pick" data-f="match" data-id="${k.id}" ${sel.has(k.id) ? '' : 'disabled'}>${Object.entries(G.match).map(([v, m]) => `<option value="${v}" ${(sel.get(k.id) || 'phrase') === v ? 'selected' : ''}>${m.t}</option>`).join('')}</select></td></tr>`).join('')}
      </tbody></table></div>`;
  }

  function negBox() {
    const sel = cfg.keywords.map((s) => ({ k: KW(s.id), match: s.match })).filter((x) => x.k);
    const terms = [];
    for (const { k, match } of sel) for (const t of GadsSim.termsOf(k, match)) terms.push({ q: t.q, rel: t.rel, blocked: GadsSim.blocked(t.q, cfg.negatives) });
    const uniq = [...new Map(terms.map((t) => [t.q, t])).values()].sort((a, b) => a.rel - b.rel);
    return uniq.length ? `<ul style="list-style:none;padding:0;margin:8px 0">${uniq.map((t) => `<li class="task" data-ok="${t.blocked ? 1 : 0}" style="grid-template-columns:20px 1fr"><i></i><span>${escH(t.q)} <small style="color:var(--lb-ink3)">· phù hợp ${F.num(t.rel * 100, 0)}/100${t.blocked ? ' · đã chặn' : ''}</small></span></li>`).join('')}</ul>` : '<p>Chọn từ khoá ở bước trước để thấy các cụm có thể kéo về.</p>';
  }

  function fieldHTML() {
    const c = cfg, key = GADS_STEPS[step].key, learn = mode === 'learn';
    if (key === 'objective') return `
      <div class="fld"><label for="f-name">Tên chiến dịch</label><input id="f-name" type="text" data-f="name" value="${escH(c.name)}" maxlength="60" placeholder="Ví dụ: Nắng Mai · Tìm kiếm · Doanh số"></div>
      <div class="fld" data-tipbox><span class="lbl">Mục tiêu ${learn ? '· ' + termBtn('intent') : ''}</span><div class="opts" role="radiogroup">
        ${Object.entries(G.objectives).map(([id, x]) => `<label class="opt"><input type="radio" name="obj" data-f="objective" value="${id}" ${c.objective === id ? 'checked' : ''}><span><b>${escH(x.t)}</b><span>${escH(x.d)}</span></span></label>`).join('')}</div></div>`;
    if (key === 'keywords') return `<div class="fld" data-tipbox>${learn ? `<p style="margin:0">${termBtn('intent')} · ${termBtn('match')} · ${termBtn('cpc')}</p>` : ''}</div><div id="kwt">${kwTable()}</div>`;
    if (key === 'negatives') return `
      <div class="fld" data-tipbox><span class="lbl">Từ khoá phủ định ${learn ? '· ' + termBtn('negative') : ''}</span>
        <div class="chips">${G.negatives.map((n) => `<label class="chip"><input type="checkbox" data-f="neg" value="${escH(n)}" ${c.negatives.includes(n) ? 'checked' : ''}>${escH(n)}</label>`).join('')}</div>
        <div style="display:flex;gap:8px;margin-top:12px"><input type="text" id="f-neg" data-f="negtext" value="${escH(customNeg)}" placeholder="Tự thêm từ khoá phủ định" style="flex:1"><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="addneg">Thêm</button></div>
        ${c.negatives.filter((n) => !G.negatives.includes(n)).map((n) => `<span class="lb-tag" style="margin:8px 6px 0 0">${escH(n)} <button type="button" data-act="rmneg" data-n="${escH(n)}" class="lb-btn--text" style="padding:0 0 0 6px" aria-label="Xoá">✕</button></span>`).join('')}</div>
      <div class="fld" data-tipbox><span class="lbl">Cụm có thể kéo về ${learn ? '· ' + termBtn('searchterm') : ''}</span><div id="negpv">${negBox()}</div></div>`;
    if (key === 'bid') { const ok = G.objectives[c.objective] ? G.objectives[c.objective].bids : Object.keys(G.bidStrategies);
      return `
      <div class="fld" data-tipbox><span class="lbl">Chiến lược giá thầu ${learn ? '· ' + termBtn('bid') : ''}</span><div class="opts" role="radiogroup">
        ${ok.map((id) => `<label class="opt"><input type="radio" name="bs" data-f="bidStrategy" value="${id}" ${c.bidStrategy === id ? 'checked' : ''}><span><b>${escH(G.bidStrategies[id].t)}</b><span>${escH(G.bidStrategies[id].d)}</span></span></label>`).join('')}</div></div>
      <div class="fld"><label for="f-bid">Giá thầu tối đa mỗi lượt nhấp: <b id="v-bid">${F.vnd(c.bid)}</b></label><input id="f-bid" type="range" min="1000" max="12000" step="500" value="${c.bid}" data-f="bid">
        <small>${c.bidStrategy === 'maxclicks' || c.bidStrategy === 'maxconv' ? 'Với giá thầu tự động, đây là mức trần Google được phép trả.' : 'Mức bạn sẵn sàng trả cho một lượt nhấp.'}</small></div>
      <div class="fld" data-tipbox><label for="f-daily">Ngân sách mỗi ngày: <b id="v-daily">${F.vnd(c.dailyBudget)}</b> ${learn ? '· ' + termBtn('budget') : ''}</label><input id="f-daily" type="range" min="50000" max="1000000" step="10000" value="${c.dailyBudget}" data-f="daily"></div>
      <div class="fld"><label for="f-dur">Số ngày chạy</label><select id="f-dur" data-f="duration">${G.days.map((d) => `<option value="${d}" ${c.duration === d ? 'selected' : ''}>${d} ngày</option>`).join('')}</select><p id="v-total" style="margin:10px 0 0"></p></div>`; }
    if (key === 'ad') return `
      <div class="fld" data-tipbox><span class="lbl">Trang đích ${learn ? '· ' + termBtn('landing') : ''}</span><div class="opts" role="radiogroup">
        ${G.landings.map((l) => `<label class="opt"><input type="radio" name="lp" data-f="landing" value="${l.id}" ${c.landing === l.id ? 'checked' : ''}><span><b>${escH(l.t)}</b><span>${escH(l.d)}</span></span></label>`).join('')}</div></div>
      <div class="fld" data-tipbox><span class="lbl">Tiêu đề (≤ 30 ký tự, cần ít nhất 3) ${learn ? '· ' + termBtn('rsa') : ''}</span>
        ${c.ad.h.map((h, i) => `<input type="text" data-f="h" data-i="${i}" value="${escH(h)}" maxlength="40" placeholder="Tiêu đề ${i + 1}" style="margin-bottom:8px" aria-label="Tiêu đề ${i + 1}">`).join('')}<small id="c-h"></small></div>
      <div class="fld"><span class="lbl">Mô tả (≤ 90 ký tự)</span>
        ${c.ad.d.map((h, i) => `<input type="text" data-f="d" data-i="${i}" value="${escH(h)}" maxlength="100" placeholder="Mô tả ${i + 1}" style="margin-bottom:8px" aria-label="Mô tả ${i + 1}">`).join('')}<small id="c-d"></small></div>
      <div class="fld"><span class="lbl">Xem trước trên trang kết quả tìm kiếm</span><div id="preview"></div></div>`;
    return '<div id="review"></div>';
  }

  function serpHTML() {
    const H = cfg.ad.h.map((x) => x.trim()).filter(Boolean).slice(0, 3), D = cfg.ad.d.map((x) => x.trim()).filter(Boolean);
    const first = cfg.keywords[0] ? KW(cfg.keywords[0].id).kw : 'kem chống nắng';
    return `<div class="adpv" style="max-width:520px"><div class="txt" style="padding:12px 14px 0"><small style="color:var(--lb-ink3)">Kết quả cho: ${escH(first)}</small></div>
      <div class="txt" style="padding:10px 14px 14px"><small><b>Được tài trợ</b> · nangmai.vn/${escH(cfg.landing || 'trang-dich')}</small>
      <div style="font-size:1.1rem;color:var(--lb-acc);margin:4px 0">${escH(H.join(' | ')) || 'Tiêu đề quảng cáo sẽ hiện ở đây'}</div>
      <div style="color:var(--lb-ink2)">${escH(D.join(' ')) || 'Mô tả sẽ hiện ở đây…'}</div></div></div>`;
  }

  function reviewHTML() {
    const v = GadsSim.validate(cfg, ctx()), line = (i, k, val) => `<tr><th>${k}</th><td>${val}</td><td><button class="lb-btn lb-btn--text" data-act="goto" data-s="${i}">Sửa</button></td></tr>`;
    const lp = G.landings.find((l) => l.id === cfg.landing);
    return `<table class="tbl"><tbody>
      ${line(0, 'Chiến dịch', `${escH(cfg.name) || '—'} · ${cfg.objective ? escH(G.objectives[cfg.objective].t) : 'chưa chọn mục tiêu'}`)}
      ${line(1, 'Từ khoá', cfg.keywords.length ? cfg.keywords.map((s) => `${escH(KW(s.id).kw)} <small>(${G.match[s.match].t})</small>`).join('<br>') : '—')}
      ${line(2, 'Phủ định', cfg.negatives.length ? escH(cfg.negatives.join(', ')) : 'Chưa có')}
      ${line(3, 'Giá thầu', `${cfg.bidStrategy ? escH(G.bidStrategies[cfg.bidStrategy].t) : 'chưa chọn'} · tối đa ${F.vnd(cfg.bid)}/nhấp<br><small>${F.vnd(cfg.dailyBudget)} × ${cfg.duration} ngày = <b>${F.vnd(v.totalBudget)}</b></small>`)}
      ${line(4, 'Quảng cáo', `${escH(cfg.ad.h.filter(Boolean).join(' | ')) || '—'}<br><small>Trang đích: ${lp ? escH(lp.t) : 'chưa chọn'}</small>`)}
    </tbody></table>
    ${v.errors.map((e) => `<div class="lb-note lb-note--bad"><b>Cần sửa</b>${escH(e.msg)} <button class="lb-btn lb-btn--text" data-act="goto" data-s="${e.step}">Đi tới bước</button></div>`).join('')}
    ${v.warnings.map((e) => `<div class="lb-note lb-note--warn"><b>Lưu ý</b>${escH(e.msg)}</div>`).join('')}
    <div class="lb-note"><b>Giả định của mô phỏng</b>Số tìm kiếm, giá và tỉ lệ là số minh hoạ. Giá trị đơn ${F.vnd(CASE.aov)}, biên lợi nhuận gộp ${F.pct(CASE.grossMargin, 0)} (hoà vốn ở ROAS ${F.x(1 / CASE.grossMargin)}). Cùng cấu hình luôn cho cùng kết quả.</div>`;
  }

  function sideHTML() {
    const est = GadsSim.estimate(cfg), s = GADS_STEPS[step], x = ctx(), m = G.modes[mode];
    const estBox = `<section class="est"><h3>Ước tính</h3>
      <div><span>Từ khoá đã chọn</span><b>${est.keywords}</b></div>
      <div><span>Lượt tìm kiếm khả dụng/tháng</span><b>${est.keywords ? F.int(est.monthlySearches) : '—'}</b></div>
      <div><span>Tổng ngân sách</span><b${est.total > x.budget ? ' style="color:var(--lb-bad)"' : ''}>${F.vnd(est.total)}</b></div>
      <div><span>Hạn mức bài</span><b>${F.vnd(x.budget)}</b></div></section>`;
    let guide;
    if (mode === 'learn') {
      guide = `<section data-tipbox><h3>Hướng dẫn · bước ${step + 1}/${GADS_STEPS.length}</h3><p>${escH(s.what)}</p>
        ${s.tasks.length ? s.tasks.map(([t, f]) => `<div class="task" data-ok="${f(cfg, x) ? 1 : 0}"><i></i><span>${escH(t)}</span></div>`).join('') : ''}
        <p><b>Vì sao:</b> ${escH(s.why)}</p><p>${s.terms.map((k) => termBtn(k)).join(' · ')}</p>
        ${s.fill ? `<button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="fill">Điền gợi ý của bài học</button>` : ''}</section>`;
    } else if (mode === 'practice') {
      const left = HINTS - Object.keys(hintsUsed).length;
      guide = `<section><h3>Gợi ý · còn ${left}/${HINTS}</h3>${hintsUsed[s.key] ? `<p>${escH(s.hint)}</p>` : left > 0 ? `<button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="hint">Xem gợi ý cho bước này</button>` : '<p>Bạn đã dùng hết gợi ý. Hãy dựa vào các lần chạy trước và báo cáo cụm từ tìm kiếm.</p>'}</section>`;
    } else {
      const t = m.targets;
      guide = `<section><h3>Đề bài</h3><p><b>${escH(CASE.brand)}</b>: ${escH(CASE.product)}. Thương hiệu mới, chưa ai biết tên. Hãy bắt đúng người đang tìm mua.</p>
        <div class="task" data-ok="${est.total <= x.budget ? 1 : 0}"><i></i><span>Ngân sách ≤ ${F.vnd(x.budget)}</span></div>
        <div class="task" data-ok="0"><i></i><span>ROAS ≥ ${t.roas} (hoà vốn ${F.x(1 / CASE.grossMargin)})</span></div>
        <div class="task" data-ok="0"><i></i><span>Tối thiểu ${GadsEval.targets('challenge', x.budget).orders} đơn hàng</span></div>
        <p style="font-size:13px">Không có hướng dẫn từng bước. Điểm chấm theo chất lượng quyết định, không theo việc bấm đúng nút.</p></section>`;
    }
    return guide + estBox;
  }

  function dockHTML() {
    const est = GadsSim.estimate(cfg), v = GadsSim.validate(cfg, ctx()), gate = mode === 'learn' && !stepDone(step);
    return `<div class="dock"><div><small>Tổng ngân sách<br><b>${F.vnd(est.total)}</b></small><span style="display:flex;gap:10px">
      ${step > 0 ? `<button class="lb-btn lb-btn--ghost" data-act="prev">Quay lại</button>` : `<button class="lb-btn lb-btn--ghost" data-act="exit">Thoát</button>`}
      ${step === LAST ? `<button class="lb-btn" data-act="run" ${v.ok ? '' : 'disabled'}>Xuất bản & chạy mô phỏng</button>` : `<button class="lb-btn" data-act="next" ${gate ? 'disabled' : ''}>Tiếp theo</button>`}</span></div></div>`;
  }

  function renderBuild() {
    const s = GADS_STEPS[step];
    app.innerHTML = `<div class="lb">
      <div class="lb-top"><a class="lb-back" href="#" data-act="exit">← Chế độ & lịch sử</a><span class="lb-eyebrow">${escH(G.modes[mode].t)} · Google Ads</span></div>
      <h1 style="font-size:clamp(1.4rem,2.6vw,1.9rem)">${escH(cfg.name || 'Chiến dịch mới')}</h1>
      <nav class="steps" aria-label="Các bước">${GADS_STEPS.map((x, i) => `<button type="button" data-act="goto" data-s="${i}" ${i === step ? 'aria-current="step"' : ''} ${reachable(i) ? '' : 'disabled'}>${i + 1}. ${escH(x.t)}</button>`).join('')}</nav>
      <div class="ws"><div class="pane"><h2>${escH(s.t)}</h2>${fieldHTML()}</div><aside class="side" id="side"></aside></div><div id="dockwrap"></div></div>`;
    refresh();
  }

  function refresh() {
    const side = document.getElementById('side'); if (!side) return;
    side.innerHTML = sideHTML(); document.getElementById('dockwrap').innerHTML = dockHTML();
    const set = (id, h) => { const el = document.getElementById(id); if (el) el.innerHTML = h; };
    set('preview', serpHTML()); set('negpv', negBox());
    const rv = document.getElementById('review'); if (rv) rv.innerHTML = reviewHTML();
    const t = document.getElementById('v-total');
    if (t) { const tot = cfg.dailyBudget * cfg.duration, cap = ctx().budget; t.innerHTML = `Tổng chi tiêu tối đa: <b>${F.vnd(tot)}</b> / hạn mức ${F.vnd(cap)}${tot > cap ? ' <span style="color:var(--lb-bad)">— vượt hạn mức.</span>' : ''}`; }
    const vb = document.getElementById('v-bid'); if (vb) vb.textContent = F.vnd(cfg.bid);
    const vd = document.getElementById('v-daily'); if (vd) vd.textContent = F.vnd(cfg.dailyBudget);
    const ch = document.getElementById('c-h'); if (ch) ch.textContent = `${cfg.ad.h.filter((x) => x.trim()).length} tiêu đề${cfg.ad.h.some((x) => x.length > 30) ? ' · có tiêu đề quá 30 ký tự' : ''}`;
    const cd = document.getElementById('c-d'); if (cd) cd.textContent = cfg.ad.d.some((x) => x.length > 90) ? 'Có mô tả quá 90 ký tự' : '';
    document.querySelectorAll('.steps button').forEach((b, i) => { b.disabled = !reachable(i); });
    const h1 = app.querySelector('h1'); if (h1) h1.textContent = cfg.name || 'Chiến dịch mới';
    saveDraft();
  }

  function readField(el) {
    const f = el.dataset.f, v = el.value, c = cfg;
    if (f === 'name') c.name = v;
    else if (f === 'objective') { c.objective = v; if (c.bidStrategy && !G.objectives[v].bids.includes(c.bidStrategy)) c.bidStrategy = null; }
    else if (f === 'kw') { if (el.checked) { if (!c.keywords.some((s) => s.id === v)) c.keywords.push({ id: v, match: 'phrase' }); } else c.keywords = c.keywords.filter((s) => s.id !== v); }
    else if (f === 'match') { const s = c.keywords.find((x) => x.id === el.dataset.id); if (s) s.match = v; }
    else if (f === 'neg') c.negatives = el.checked ? [...new Set([...c.negatives, v])] : c.negatives.filter((x) => x !== v);
    else if (f === 'negtext') customNeg = v;
    else if (f === 'bidStrategy') c.bidStrategy = v;
    else if (f === 'bid') c.bid = +v;
    else if (f === 'daily') c.dailyBudget = +v;
    else if (f === 'duration') c.duration = +v;
    else if (f === 'landing') c.landing = v;
    else if (f === 'h') c.ad.h[+el.dataset.i] = v;
    else if (f === 'd') c.ad.d[+el.dataset.i] = v;
  }

  /* ---------- chạy ---------- */
  function publish(label, base) {
    const x = ctx(), v = GadsSim.validate(cfg, x); if (!v.ok) return false;
    const prior = LabStore.attempts(TOOL), res = GadsSim.simulate(cfg, x);
    const ev = GadsEval.evaluate(cfg, res, x, mode, prior.filter((a) => a.mode === mode).map((a) => ({ roas: a.summary.roas })));
    const gw = mode === 'challenge' ? GW.report(GID, ev.stars, ev.total) : null;
    const a = LabStore.addAttempt(TOOL, { mode, cfg: JSON.parse(JSON.stringify(cfg)), label: label || '',
      summary: { roas: res.totals.roas, orders: Math.round(res.orders), spend: res.totals.spend, revenue: res.totals.revenue, score: ev.total, stars: ev.stars }, feed: res.feed });
    LabStore.clearDraft(TOOL);
    shown = { a, res, ev, gw }; cmpId = base || (prior.length ? prior[prior.length - 1].id : null); view = 'results'; render(); window.scrollTo(0, 0);
    return true;
  }

  const METRICS = { impressions: ['Hiển thị', (r) => r.impressions, F.int], clicks: ['Lượt nhấp', (r) => r.clicks, F.int], conversions: ['Chuyển đổi', (r) => r.conversions, F.int],
    spend: ['Chi phí', (r) => r.spend, F.vndShort], roas: ['ROAS luỹ kế', (r) => r.cum.roas, (v) => F.num(v, 2)], cpa: ['CPA luỹ kế', (r) => r.cum.cpa, F.vndShort] };

  function renderResults() {
    const { a, res, ev, gw } = shown, t = res.totals, d = res.diag, others = LabStore.attempts(TOOL).filter((x) => x.id !== a.id);
    const base = cmpId ? others.find((x) => x.id === cmpId) : null;
    const cmp = base ? E.compare(GadsSim.simulate(base.cfg, ctx(base.mode)).totals, t) : null;
    const kp = [['impressions', 'Hiển thị', F.int], ['clicks', 'Lượt nhấp', F.int], ['ctr', 'CTR', F.pct], ['cpc', 'CPC trung bình', F.vnd], ['spend', 'Chi phí', F.vnd],
      ['conversions', d.isLead ? 'Khách tiềm năng' : 'Chuyển đổi', F.int], ['cvr', 'CVR', F.pct], ['cpa', 'CPA', F.vnd], ['revenue', 'Giá trị chuyển đổi', F.vnd], ['roas', 'ROAS', F.x]];
    const kpi = kp.map(([k, l, f]) => { const c = cmp && cmp[k], tip = GADS_TERMS[k] ? termBtn(k, l) : escH(l);
      const sign = c && c.delta !== null && c.verdict !== 'flat' ? (c.delta > 0 ? '▲ ' : '▼ ') : '';
      return `<div class="kpi" data-tipbox><span>${tip}</span><b>${f(t[k])}</b>${c ? `<em data-v="${c.verdict}">${c.delta === null ? 'chưa so được' : c.verdict === 'flat' ? 'không đổi' : sign + (c.pct === null ? '' : F.num(Math.abs(c.pct) * 100, 0) + '%')} ${c.verdict === 'better' ? 'tốt hơn' : c.verdict === 'worse' ? 'kém hơn' : ''}</em>` : ''}</div>`; }).join('')
      + `<div class="kpi" data-tipbox><span>${termBtn('is', 'Thị phần hiển thị')}</span><b>${F.pct(d.impressionShare, 0)}</b></div><div class="kpi" data-tipbox><span>${termBtn('qs', 'Điểm chất lượng TB')}</span><b>${F.num(d.qs, 1)}/10</b></div>`;
    const m = METRICS[metric], mType = a.mode === 'challenge', exps = GadsEval.experiments(a.cfg);
    const picked = LabStore.picked(CASE.id, TOOL), isPicked = picked && picked.id === a.id;
    app.innerHTML = `<div class="lb">
      <div class="lb-top"><a class="lb-back" href="#" data-act="exit">← Chế độ & lịch sử</a><span class="lb-eyebrow">Kết quả · ${escH(G.modes[a.mode].t)}</span></div>
      <h1>${escH(a.label || a.cfg.name || 'Chiến dịch')}</h1>
      <div class="score" style="margin-top:18px"><b>${ev.total}</b><span>/ 100 điểm${mType ? ` <span class="stars">${starsTxt(ev.stars)}</span>` : ''}</span></div>
      <p class="lb-lede" style="margin-top:6px">${gw ? (gw.gain > 0 ? (gw.xp > 0 ? `Sao mới +${gw.gain} → +${gw.xp} XP.` : `Sao mới +${gw.gain}; hôm nay đã đủ XP từ game.`) : 'Chưa có sao mới. XP chỉ tính cho sao mới.') : `Chế độ ${escH(G.modes[a.mode].t)} cho điểm để bạn so sánh, nhưng chỉ Thử thách mới tính sao và XP.`}</p>
      <div class="parts">${ev.parts.map((p) => `<div class="part"><span>${escH(p.label)}</span><div class="meter"><i style="width:${p.got / p.max * 100}%"></i></div><b>${p.got}/${p.max}</b></div>`).join('')}</div>

      <section class="lb-sec"><h2>Chỉ số chiến dịch</h2>
        ${base ? `<p class="lb-lede" style="margin-top:6px">So với: <b>${escH(base.label || base.cfg.name || 'lần trước')}</b> (${dt(base.at)}).</p>` : ''}
        <div class="kpis">${kpi}</div>
        <div class="tabs" role="group" aria-label="Chỉ số theo ngày">${Object.entries(METRICS).map(([k, x]) => `<button type="button" data-act="metric" data-k="${k}" aria-pressed="${k === metric}">${x[0]}</button>`).join('')}</div>
        ${U.chart(res.days, m[1], m[2])}
      </section>

      <section class="lb-sec"><h2>Báo cáo cụm từ tìm kiếm</h2>
        <p class="lb-lede" style="margin-top:6px">Đây là điều người dùng thật sự gõ. ${d.wasteSpend > 0 ? `<b>${F.vnd(d.wasteSpend)}</b> (${F.pct(d.wasteShare, 0)} chi phí) đi vào cụm từ không liên quan.` : 'Không có chi phí đáng kể vào cụm từ không liên quan.'}</p>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Cụm từ</th><th>Từ khoá / kiểu khớp</th><th>Nhấp</th><th>Chi phí</th><th>Chuyển đổi</th><th>Đánh giá</th></tr></thead><tbody>
        ${d.terms.slice(0, 14).map((x) => `<tr><td>${escH(x.q)}</td><td>${escH(x.kw)} <small>· ${G.match[x.match].t}</small></td><td>${F.int(x.clicks)}</td><td>${F.vndShort(x.cost)}</td><td>${F.num(x.conv, 1)}</td>
          <td>${x.waste ? '<span style="color:var(--lb-bad);font-weight:700">Nên phủ định</span>' : x.conv >= 1 ? '<span style="color:var(--lb-ok);font-weight:700">Có đơn</span>' : 'Theo dõi'}</td></tr>`).join('')}
        </tbody></table></div>
      </section>

      <section class="lb-sec"><h2>Hiệu quả theo từ khoá</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Từ khoá</th><th>QS</th><th>Thị phần</th><th>CPC</th><th>Nhấp</th><th>Chi phí</th><th>Đơn</th></tr></thead><tbody>
        ${d.keywords.map((k) => `<tr><td>${escH(k.kw)} <small>· ${G.match[k.match].t}</small>${k.blocked ? ' <small style="color:var(--lb-bad)">· bị phủ định chặn</small>' : ''}</td><td>${k.qs}/10</td><td>${F.pct(k.is, 0)}</td><td>${F.vnd(k.cpc)}</td><td>${F.int(k.clicks)}</td><td>${F.vndShort(k.cost)}</td><td>${F.num(k.conv, 1)}</td></tr>`).join('')}
      </tbody></table></div></section>

      <section class="lb-sec"><h2>Đọc kết quả</h2>${ev.interpretation.map((p) => `<p style="margin:8px 0">${escH(p)}</p>`).join('')}</section>
      <section class="lb-sec"><h2>Vì sao (từng quyết định)</h2>${ev.decisions.map((x) => `<div class="dec" data-t="${x.tone}"><b>${escH(x.title)}</b><p>${escH(x.body)}</p></div>`).join('')}</section>
      <section class="lb-sec"><h2>Nên cải thiện gì tiếp theo</h2>
        ${ev.recommendations.length ? `<ol style="padding-left:20px">${ev.recommendations.map((r) => `<li style="margin:8px 0">${escH(r)}</li>`).join('')}</ol>` : '<p>Không còn điểm yếu lớn. Thử các thay đổi bên dưới để hiểu độ nhạy của kết quả.</p>'}</section>

      <section class="lb-sec"><h2>Thử thay đổi một quyết định</h2><p class="lb-lede">Mỗi thử nghiệm đổi đúng một điều rồi chạy lại ngay, so sánh với phiên bản này.</p>
        ${exps.map((e) => `<div class="lb-exp"><div><b>${escH(e.t)}</b><p>${escH(e.why)}</p></div><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="exp" data-e="${e.id}">Chạy thử</button></div>`).join('')}</section>

      <section class="lb-sec"><h2>So sánh các phiên bản</h2>
        ${others.length ? `<label style="font-size:14px">So với: <select class="pick" data-act="cmp">${others.slice().reverse().map((x) => `<option value="${x.id}" ${x.id === cmpId ? 'selected' : ''}>${dt(x.at)} · ${escH(G.modes[x.mode].t)} · ${escH(x.label || x.cfg.name || '')} · điểm ${x.summary.score}</option>`).join('')}</select></label>` : '<p class="lb-lede">Đây là lần chạy đầu tiên. Sửa một thứ rồi chạy lại để so sánh.</p>'}
        <div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Lần chạy</th><th>Chi phí</th><th>ROAS</th><th>Đơn</th><th>Điểm</th></tr></thead><tbody>
          ${LabStore.attempts(TOOL).slice(-8).reverse().map((x) => `<tr><td>${dt(x.at)}${x.id === a.id ? ' · <b>đang xem</b>' : ''}</td><td>${F.vndShort(x.summary.spend)}</td><td>${F.x(x.summary.roas)}</td><td>${F.int(x.summary.orders)}</td><td>${x.summary.score}</td></tr>`).join('')}
        </tbody></table></div></section>

      <section class="lb-sec"><h2>Dữ liệu sang GA4</h2>
        <p>GA4 sẽ nhận từ lần chạy này: <b>${F.int(res.feed.sessions)}</b> phiên (nguồn <code>google / cpc</code>), <b>${F.int(res.feed.conversions)}</b> chuyển đổi, doanh thu <b>${F.vnd(res.feed.revenue)}</b>.
        Giả định: ${F.pct(res.feed.assumptions.sessionRate, 0)} lượt nhấp thành phiên có ghi nhận; GA4 thấy ${F.pct(res.feed.assumptions.convRate, 0)} số chuyển đổi Google báo. ${escH(res.feed.note)}</p>
        <div class="actions"><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="pick" ${isPicked ? 'disabled' : ''}>${isPicked ? 'Đã chọn cho case xuyên suốt' : 'Dùng lần chạy này cho case xuyên suốt'}</button></div></section>

      <div class="actions"><button class="lb-btn" data-act="edit">Sửa phiên bản này & chạy lại</button><button class="lb-btn lb-btn--ghost" data-act="new">Làm phiên bản mới từ đầu</button><a class="lb-btn lb-btn--ghost" href="lab.html">Về Marketing Lab</a></div>
    </div>`;
  }

  /* ---------- điều phối ---------- */
  function startMode(m, from) {
    mode = m; cfg = from || GadsSim.emptyConfig(); step = 0; hintsUsed = {};
    if (!from) { const cap = ctx().budget; if (cfg.dailyBudget * cfg.duration > cap) cfg.dailyBudget = Math.floor(cap / cfg.duration / 10000) * 10000; }
    view = 'build'; render();
  }
  function render() {
    if (view === 'build' && cfg) renderBuild(); else if (view === 'results' && shown) renderResults(); else { view = 'start'; renderStart(); }
    const u = new URL(location.href); if (mode && view !== 'start') u.searchParams.set('mode', mode); else u.searchParams.delete('mode');
    history.replaceState(null, '', u);
  }
  const redoKw = () => { const el = document.getElementById('kwt'); if (el) el.innerHTML = kwTable(); };
  const isTyping = (el) => el.type === 'text' || el.tagName === 'TEXTAREA' || el.type === 'range';

  app.addEventListener('input', (e) => { const el = e.target; if (el.dataset && el.dataset.f && isTyping(el)) { readField(el); if (el.dataset.f !== 'negtext') refresh(); } });
  app.addEventListener('change', (e) => { const el = e.target, f = el.dataset && el.dataset.f;
    if (el.dataset && el.dataset.act === 'cmp') { cmpId = el.value; renderResults(); return; }
    if (!f || isTyping(el)) return;
    if (f === 'kwfilter') { kwFilter = el.value; redoKw(); return; }
    if (f === 'kwsort') { kwSort = el.value; redoKw(); return; }
    readField(el); if (f === 'kw') redoKw(); refresh(); });
  LabUI.bindTerms(app, GADS_TERMS);
  app.addEventListener('click', (e) => {
    if (e.target.closest('.term')) return;
    const b = e.target.closest('[data-act]'); if (!b || b.tagName === 'SELECT') return;
    const act = b.dataset.act, scroll = () => window.scrollTo(0, 0);
    if (act === 'exit') { e.preventDefault(); if (cfg && view === 'build') saveDraft(); view = 'start'; shown = null; render(); }
    else if (act === 'start') { const d = LabStore.tool(TOOL).draft; if (d && d.mode === b.dataset.m) { mode = d.mode; cfg = d.cfg; step = d.step || 0; hintsUsed = d.hints || {}; view = 'build'; render(); } else startMode(b.dataset.m); }
    else if (act === 'resume') { const d = LabStore.tool(TOOL).draft; if (d) { mode = d.mode; cfg = d.cfg; step = d.step || 0; hintsUsed = d.hints || {}; view = 'build'; render(); } }
    else if (act === 'drop') { LabStore.clearDraft(TOOL); render(); }
    else if (act === 'goto') { const s = +b.dataset.s; if (reachable(s)) { step = s; render(); scroll(); } }
    else if (act === 'next') { if (step < LAST && (mode !== 'learn' || stepDone(step))) { step++; render(); scroll(); } }
    else if (act === 'prev') { if (step > 0) { step--; render(); scroll(); } }
    else if (act === 'fill') { cfg = GADS_STEPS[step].fill(cfg, ctx()); render(); }
    else if (act === 'hint') { hintsUsed[GADS_STEPS[step].key] = 1; refresh(); }
    else if (act === 'addneg') { const v = customNeg.trim().toLowerCase(); if (v && !cfg.negatives.includes(v)) cfg.negatives.push(v); customNeg = ''; render(); }
    else if (act === 'rmneg') { cfg.negatives = cfg.negatives.filter((n) => n !== b.dataset.n); render(); }
    else if (act === 'run') publish('');
    else if (act === 'open') { const a = LabStore.attempts(TOOL).find((x) => x.id === b.dataset.id); if (a) { const r = evalAttempt(a); mode = a.mode; shown = { a, res: r.res, ev: r.ev, gw: null };
      const all = LabStore.attempts(TOOL), i = all.findIndex((x) => x.id === a.id); cmpId = i > 0 ? all[i - 1].id : null; view = 'results'; render(); scroll(); } }
    else if (act === 'metric') { metric = b.dataset.k; renderResults(); }
    else if (act === 'edit') { cfg = JSON.parse(JSON.stringify(shown.a.cfg)); mode = shown.a.mode; step = 0; hintsUsed = {}; view = 'build'; render(); scroll(); }
    else if (act === 'new') startMode(shown.a.mode);
    else if (act === 'pick') { LabStore.pickForCase(CASE.id, TOOL, shown.a.id); renderResults(); }
    else if (act === 'exp') { const ex = GadsEval.experiments(shown.a.cfg).find((x) => x.id === b.dataset.e); if (!ex) return;
      const baseId = shown.a.id; mode = shown.a.mode; cfg = ex.apply(JSON.parse(JSON.stringify(shown.a.cfg)));
      if (!publish('Thử nghiệm: ' + ex.t, baseId)) { view = 'build'; step = LAST; render(); } }
  });

  const d0 = LabStore.tool(TOOL).draft;
  if (mode && d0 && d0.mode === mode) { cfg = d0.cfg; step = d0.step || 0; hintsUsed = d0.hints || {}; view = 'build'; render(); }
  else if (mode) startMode(mode);
  else render();
})();
