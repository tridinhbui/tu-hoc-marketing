/* MARKETING LAB · GIAO DIỆN SEO — nghiên cứu từ khoá, cụm chủ đề, đối thủ, kế hoạch nội dung, dự báo 12 tháng.
   Logic ở seo-sim.js / seo-eval.js. Cần: app.js, frame.js, engine, scenario, store, ui-kit, seo-data. */
(function () {
  appShell('');
  const E = LabEngine, F = E.fmt, U = LabUI, D = LAB_SEO, CASE = LAB_CASES.skincare, TOOL = 'seo', GID = 'lab-seo', app = document.getElementById('app');
  const dt = U.dt, q = new URLSearchParams(location.search), HINTS = 3;
  const TABS = [['research', '1. Từ khoá'], ['list', '2. Danh sách & cụm'], ['comp', '3. Đối thủ'], ['plan', '4. Kế hoạch nội dung']];
  const INTENT = { transactional: 'Mua ngay', commercial: 'So sánh', informational: 'Tìm hiểu', navigational: 'Tìm thương hiệu' };
  const TERMS = {
    vol: ['Lượt tìm/tháng', 'Số lần từ khoá được tìm mỗi tháng. Cao không đồng nghĩa đáng làm: còn phải xét độ khó và ý định.'],
    kd: ['Độ khó (KD)', 'Thang 0–100: bao nhiêu sức mạnh (liên kết, uy tín, nội dung) cần để lên top 10. Website mới nên bắt đầu từ KD thấp.'],
    intent: ['Ý định tìm kiếm', 'Người gõ muốn mua, so sánh, tìm hiểu hay tìm một thương hiệu. Nội dung phải trả lời đúng ý định đó.'],
    cluster: ['Cụm chủ đề', 'Nhóm từ khoá cùng nhu cầu của người tìm. Viết nhiều bài trong một cụm giúp Google coi bạn là chuyên gia chủ đề.'],
    gap: ['Khoảng trống từ khoá', 'Từ khoá đối thủ đã lên top 10 mà bạn chưa có. Đã được kiểm chứng là có nhu cầu.'],
    sov: ['Share of voice', 'Tỉ trọng lượng truy cập tiềm năng từ tìm kiếm tự nhiên mà một tên miền chiếm trong cả thị trường từ khoá.'],
    auth: ['Authority', 'Điểm uy tín tổng của tên miền (liên kết trỏ về, tuổi, chất lượng). Website mới thường rất thấp.'],
    ctr: ['CTR theo vị trí', 'Vị trí 1 nhận ~28% lượt nhấp, vị trí 10 chỉ ~2%. Lên top 3 quan trọng hơn nhiều so với top 10.'],
    fit: ['Độ khớp nội dung', 'Mức loại trang bạn làm phù hợp với ý định. Người muốn mua cần trang sản phẩm/danh mục, người tìm hiểu cần bài hướng dẫn.'],
  };
  const FILL = {
    shortlist: ['s4', 'k4', 's12', 's3', 's20', 's7', 'k2', 's11'],
    plan: [['s4', 'category'], ['k4', 'compare'], ['s12', 'product'], ['s3', 'blog'], ['s20', 'compare'], ['s7', 'category'], ['k2', 'product'], ['s11', 'product']],
  };
  const SC = () => ({ seed: CASE.seed + 13, aov: CASE.aov });
  const ctx = (m) => ({ ...SC(), budget: D.modes[m || mode || 'practice'].budget, pieces: D.modes[m || mode || 'practice'].pieces });
  const KW = (id) => D.keywords.find((k) => k.id === id);
  const termBtn = (k, l) => `<button type="button" class="term" data-term="${k}">${escH(l || TERMS[k][0])}</button>`;

  let mode = D.modes[q.get('mode')] ? q.get('mode') : null, view = 'start', tab = 'research', p = null, hints = {}, shown = null, cmpId = null;
  let fl = { intent: 'all', sort: 'opp', maxKd: 0, minVol: 0 }, metric = 'visits';

  const TASKS = {
    research: [['Nhập từ khoá gốc hoặc lọc theo ý định', () => true], ['Thêm ít nhất 6 từ khoá vào danh sách', (x) => x.shortlist.length >= 6]],
    list: [['Xếp các từ khoá vào cụm chủ đề', (x) => x.shortlist.length > 0 && x.shortlist.every((id) => x.clusters[id])]],
    comp: [['Chọn một đối thủ để phân tích', (x) => !!x.competitor], ['Chọn ít nhất 2 cơ hội từ khoảng trống', (x) => x.opps.length >= 2]],
    plan: [['Thêm bài vào kế hoạch', (x) => x.plan.length >= 1], ['Chọn loại nội dung cho mọi bài', (x) => x.plan.length && x.plan.every((i) => i.type)]],
  };
  const WHAT = {
    research: 'Bắt đầu từ một từ khoá gốc rồi mở rộng. Đừng chỉ nhìn lượt tìm: hãy xét độ khó, ý định và độ liên quan với sản phẩm.',
    list: 'Gom các từ khoá cùng nhu cầu vào một cụm chủ đề. Cụm cho bạn biết mình cần viết gì và bài nào hỗ trợ bài nào.',
    comp: 'Nhìn đối thủ đang chiếm những trang và từ khoá nào, rồi tìm khoảng trống: từ khoá họ có mà bạn chưa có.',
    plan: 'Chọn từ khoá mục tiêu và loại trang cho từng bài. Mô phỏng dự báo vị trí, lưu lượng và đơn hàng trong 12 tháng.',
  };
  const HINT = { research: 'Từ khoá dài và cụ thể thường dễ lên top hơn và gần quyết định mua hơn.', list: 'Hỏi: người gõ hai từ khoá này có cùng nhu cầu không?',
    comp: 'Đối thủ nào mạnh ở cụm bạn có thể thắng? Tránh đối đầu ở nơi họ mạnh hơn nhiều.', plan: 'Với website mới: vài từ khoá KD thấp, nhiều bài trong cùng cụm, đúng loại trang.' };

  /* ---------- lưu ---------- */
  function save() { LabStore.setDraft(TOOL, p ? { mode, p, tab, hints, at: Date.now(), step: 0 } : null); }
  function evalAttempt(a) {
    const all = LabStore.attempts(TOOL), i = all.findIndex((x) => x.id === a.id), c = ctx(a.mode), res = SeoSim.simulate(a.p, c);
    return { res, ev: SeoEval.evaluate(a.p, res, c, a.mode, all.slice(0, Math.max(i, 0)).filter((x) => x.mode === a.mode).map((x) => ({ roas: x.summary.roas }))) };
  }
  const clone = (x) => JSON.parse(JSON.stringify(x));

  /* ---------- màn hình bắt đầu ---------- */
  function renderStart() {
    const t = LabStore.tool(TOOL), atts = t.attempts, d = t.draft;
    app.innerHTML = `<div class="lb"><div class="lb-top"><a class="lb-back" href="lab.html">← Marketing Lab</a><span class="lb-eyebrow">SEO Research · mô phỏng kiểu Semrush/Ahrefs</span></div>
      <h1>Lên kế hoạch SEO cho một thương hiệu mới</h1>
      <p class="lb-lede">Website ${escH(D.domain)} còn rất mới (authority ${D.authority}). Bạn sẽ nghiên cứu từ khoá, phân cụm chủ đề, xem đối thủ, rồi chọn bài nào đáng viết với ngân sách nội dung có hạn. Bộ dữ liệu cố định: cùng câu hỏi, cùng số liệu mỗi lần.</p>
      ${d ? `<div class="lb-note"><b>Bạn có kế hoạch đang làm dở</b>Chế độ ${escH(D.modes[d.mode].t)}, lưu lúc ${dt(d.at)}.<div class="actions" style="margin-top:10px"><button class="lb-btn lb-btn--sm" data-act="resume">Tiếp tục</button><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="drop">Bỏ</button></div></div>` : ''}
      <section class="lb-sec"><h2>Chọn chế độ</h2>${Object.entries(D.modes).map(([id, m]) => { const a = atts.filter((x) => x.mode === id), best = a.reduce((b, x) => Math.max(b, x.summary.score), 0);
        return `<div class="lb-row"><div><h3>${m.t}</h3><small>Tối đa ${m.pieces} bài · ngân sách nội dung ${F.vnd(m.budget)}${a.length ? ` · ${a.length} lượt, cao nhất ${best}` : ''}</small></div><p>${m.d}${id === 'challenge' ? ` KPI: ROAS 12 tháng ≥ ${m.targets.roas} và ≥ ${m.targets.orders} đơn.` : ''}</p>
          <button class="lb-btn${id === 'learn' ? '' : ' lb-btn--ghost'}" data-act="start" data-m="${id}">${a.length ? 'Làm lượt mới' : 'Bắt đầu'}</button></div>`; }).join('')}</section>
      ${atts.length ? `<section class="lb-sec"><h2>Lịch sử</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Lúc</th><th>Chế độ</th><th>Bài</th><th>ROAS 12 tháng</th><th>Đơn</th><th>Điểm</th><th></th></tr></thead><tbody>
        ${atts.slice().reverse().map((a) => `<tr><td>${dt(a.at)}</td><td>${D.modes[a.mode].t}</td><td>${a.summary.pieces}</td><td>${F.x(a.summary.roas)}</td><td>${F.int(a.summary.orders)}</td><td>${a.summary.score}</td><td><button class="lb-btn lb-btn--text" data-act="open" data-id="${a.id}">Xem</button></td></tr>`).join('')}</tbody></table></div></section>` : ''}</div>`;
  }

  /* ---------- các tab ---------- */
  const kwRow = (k, extra = '') => `<tr><td><b>${escH(k.kw)}</b>${k.own ? ' <small>· thương hiệu của bạn</small>' : ''}${k.competitor ? ' <small>· thương hiệu đối thủ</small>' : ''}</td><td>${F.int(k.vol)}</td>
    <td><div class="meter" style="width:64px;display:inline-block;vertical-align:middle"><i style="width:${k.kd}%"></i></div> ${k.kd}</td><td>${F.vnd(k.cpc)}</td><td>${INTENT[k.intent]}</td><td>${F.num(k.rel * 100, 0)}</td>${extra}</tr>`;

  function tResearch() {
    const rows = SeoSim.search(p.seed, { ...fl, sort: fl.sort }), inList = new Set(p.shortlist);
    return `<div class="fld" data-tipbox><label for="f-seed">Từ khoá gốc</label><div style="display:flex;gap:8px"><input id="f-seed" type="text" data-f="seed" value="${escH(p.seed)}" placeholder="Ví dụ: kem chống nắng, da dầu, mua" style="flex:1"><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="clearseed">Xoá</button></div>
        <div class="chips" style="margin-top:12px">${['kem chống nắng', 'da dầu', 'mua', 'cách', 'review'].map((s) => `<button type="button" class="chip" data-act="seed" data-s="${s}">${s}</button>`).join('')}</div>
        ${mode === 'learn' ? `<p style="margin:12px 0 0">${termBtn('vol')} · ${termBtn('kd')} · ${termBtn('intent')} · ${termBtn('ctr')}</p>` : ''}</div>
      <div class="fld" style="display:flex;gap:12px;flex-wrap:wrap">
        <label style="margin:0">Ý định<br><select class="pick" data-f="fintent">${[['all', 'Tất cả']].concat(Object.entries(INTENT)).map(([v, t]) => `<option value="${v}" ${fl.intent === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <label style="margin:0">Sắp xếp<br><select class="pick" data-f="fsort">${[['opp', 'Điểm cơ hội'], ['vol', 'Lượt tìm'], ['kd', 'Độ khó (thấp trước)'], ['cpc', 'CPC'], ['rel', 'Độ liên quan']].map(([v, t]) => `<option value="${v}" ${fl.sort === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <label style="margin:0">KD tối đa<br><select class="pick" data-f="fkd">${[[0, 'Không giới hạn'], [30, '≤ 30'], [40, '≤ 40'], [50, '≤ 50']].map(([v, t]) => `<option value="${v}" ${fl.maxKd === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <label style="margin:0">Lượt tìm tối thiểu<br><select class="pick" data-f="fvol">${[[0, 'Không'], [3000, '3.000'], [6000, '6.000'], [10000, '10.000']].map(([v, t]) => `<option value="${v}" ${fl.minVol === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label></div>
      <p class="lb-lede" style="margin:6px 0">${rows.length} từ khoá. Điểm cơ hội = lượt tìm × (1 − KD) × độ liên quan.</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Từ khoá</th><th>Lượt tìm</th><th>KD</th><th>CPC</th><th>Ý định</th><th>Liên quan</th><th>Danh sách</th></tr></thead><tbody>
      ${rows.map((k) => kwRow(k, `<td><input type="checkbox" data-f="short" value="${k.id}" ${inList.has(k.id) ? 'checked' : ''} aria-label="Thêm ${escH(k.kw)}"></td>`)).join('') || '<tr><td colspan="7">Không có từ khoá phù hợp bộ lọc.</td></tr>'}
      </tbody></table></div>`;
  }

  function tList() {
    if (!p.shortlist.length) return '<div class="lb-note lb-note--warn"><b>Danh sách còn trống</b>Vào tab Từ khoá và thêm từ khoá bạn quan tâm.</div>';
    return `<p class="lb-lede" style="margin-top:0" data-tipbox>Xếp từng từ khoá vào cụm chủ đề (${termBtn('cluster')}). ${mode === 'learn' ? '<button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="autocluster">Gợi ý cụm giúp tôi</button>' : ''}</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Từ khoá</th><th>Lượt tìm</th><th>KD</th><th>CPC</th><th>Ý định</th><th>Liên quan</th><th>Cụm chủ đề</th></tr></thead><tbody>
      ${p.shortlist.map((id) => kwRow(KW(id), `<td><select class="pick" data-f="cluster" data-id="${id}"><option value="">— Chọn —</option>${D.clusters.map((c) => `<option value="${c.id}" ${p.clusters[id] === c.id ? 'selected' : ''}>${c.t}</option>`).join('')}</select></td>`)).join('')}
      </tbody></table></div>
      <h3 style="margin-top:20px">Tổng quan cụm</h3>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Cụm</th><th>Số từ khoá</th><th>Tổng lượt tìm</th></tr></thead><tbody>
      ${D.clusters.map((c) => { const ids = p.shortlist.filter((id) => p.clusters[id] === c.id); return ids.length ? `<tr><td>${c.t}</td><td>${ids.length}</td><td>${F.int(ids.reduce((s, id) => s + KW(id).vol, 0))}</td></tr>` : ''; }).join('')}
      </tbody></table></div>`;
  }

  function tComp() {
    const c = SeoSim.competitor(p.competitor), sov = SeoSim.shareOfVoice(), opp = new Set(p.opps);
    return `<div class="fld" data-tipbox><span class="lbl">Chọn đối thủ ${mode === 'learn' ? '· ' + termBtn('auth') + ' · ' + termBtn('sov') : ''}</span><div class="chips">${D.competitors.map((x) => `<label class="chip"><input type="radio" name="comp" data-f="comp" value="${x.id}" ${p.competitor === x.id ? 'checked' : ''}>${escH(x.domain)}</label>`).join('')}</div>
        <p style="margin:10px 0 0">${escH(c.c.note)} Authority <b>${c.c.auth}</b> (của bạn: ${D.authority}).</p></div>
      <div class="kpis"><div class="kpi"><span>Lưu lượng tự nhiên ước tính/tháng</span><b>${F.int(c.traffic)}</b></div><div class="kpi"><span>Từ khoá xếp hạng</span><b>${c.keywordCount}</b></div>
        <div class="kpi"><span>Share of voice</span><b>${F.pct(sov[c.c.id], 0)}</b></div><div class="kpi"><span>Share of voice của bạn</span><b>${F.pct(sov.me, 1)}</b></div></div>
      <h3 style="margin-top:20px">Trang hàng đầu của đối thủ</h3>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Trang</th><th>Loại</th><th>Cụm</th><th>Từ khoá</th><th>Lưu lượng/tháng</th><th>Từ khoá chính</th></tr></thead><tbody>
      ${c.pages.slice(0, 6).map((x) => `<tr><td><code>${escH(c.c.domain + x.url)}</code></td><td>${D.types[x.type].t}</td><td>${(D.clusters.find((y) => y.id === x.cluster) || { t: x.cluster }).t}</td><td>${x.keywords}</td><td>${F.int(x.visits)}</td><td>${escH(x.top)}</td></tr>`).join('')}</tbody></table></div>
      <h3 style="margin-top:20px" data-tipbox>Khoảng trống từ khoá ${termBtn('gap')}</h3>
      <p class="lb-lede" style="margin-top:4px">Từ khoá ${escH(c.c.domain)} đã lên top 10 mà bạn chưa có. Chọn những cơ hội bạn thực sự có thể thắng.</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Từ khoá</th><th>Lượt tìm</th><th>KD</th><th>CPC</th><th>Ý định</th><th>Liên quan</th><th>Vị trí của họ</th><th>Chọn</th></tr></thead><tbody>
      ${c.gap.length ? c.gap.slice(0, 12).map((k) => kwRow(k, `<td>#${(c.rows.find((r) => r.k.id === k.id) || {}).pos}</td><td><input type="checkbox" data-f="opp" value="${k.id}" ${opp.has(k.id) ? 'checked' : ''} aria-label="Chọn ${escH(k.kw)}"></td>`)).join('') : '<tr><td colspan="8">Không có khoảng trống nổi bật với đối thủ này.</td></tr>'}
      </tbody></table></div>`;
  }

  function planCost() { return p.plan.reduce((s, i) => s + (D.types[i.type] ? D.types[i.type].cost : 0), 0); }
  function tPlan() {
    const c = ctx(), cost = planCost(), have = new Set(p.plan.map((i) => i.id));
    const pool = [...new Set([...p.opps, ...p.shortlist])].filter((id) => !have.has(id));
    return `<div class="kpis"><div class="kpi"><span>Số bài</span><b>${p.plan.length} / ${c.pieces}</b></div><div class="kpi"><span>Chi phí nội dung</span><b${cost > c.budget ? ' style="color:var(--lb-bad)"' : ''}>${F.vndShort(cost)}</b></div><div class="kpi"><span>Ngân sách</span><b>${F.vndShort(c.budget)}</b></div></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th>Từ khoá mục tiêu</th><th>Ý định</th><th>KD</th><th>Loại nội dung</th><th>Chi phí</th><th></th></tr></thead><tbody>
      ${p.plan.map((it, i) => { const k = KW(it.id); return `<tr><td>${i + 1}</td><td><b>${escH(k.kw)}</b></td><td>${INTENT[k.intent]}</td><td>${k.kd}</td>
        <td><select class="pick" data-f="ptype" data-i="${i}"><option value="">— Chọn —</option>${Object.entries(D.types).map(([v, t]) => `<option value="${v}" ${it.type === v ? 'selected' : ''}>${t.t}</option>`).join('')}</select></td>
        <td>${it.type ? F.vndShort(D.types[it.type].cost) : '—'}</td><td><button class="lb-btn lb-btn--text" data-act="up" data-i="${i}" ${i ? '' : 'disabled'} aria-label="Lên">↑</button><button class="lb-btn lb-btn--text" data-act="rm" data-i="${i}">Xoá</button></td></tr>`; }).join('') || '<tr><td colspan="7">Chưa có bài nào. Thêm từ khoá bên dưới.</td></tr>'}
      </tbody></table></div>
      <div class="fld" style="display:flex;gap:10px;flex-wrap:wrap;align-items:end"><label style="margin:0" data-tipbox>Thêm bài cho từ khoá ${mode === 'learn' ? termBtn('fit') : ''}<br>
        <select class="pick" id="addkw"><option value="">— Chọn từ danh sách / cơ hội —</option>${pool.map((id) => `<option value="${id}">${escH(KW(id).kw)} (KD ${KW(id).kd})</option>`).join('')}</select></label>
        <button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="addplan" ${p.plan.length >= c.pieces ? 'disabled' : ''}>Thêm vào kế hoạch</button></div>
      ${!pool.length ? '<p class="lb-lede" style="font-size:14px">Chưa còn từ khoá nào để thêm: hãy bổ sung ở tab Từ khoá hoặc chọn cơ hội ở tab Đối thủ.</p>' : ''}
      <div id="planmsg"></div>
      <div class="actions"><button class="lb-btn" data-act="run">Chạy dự báo 12 tháng</button></div>`;
  }
  const BODY = { research: tResearch, list: tList, comp: tComp, plan: tPlan };

  function sideHTML() {
    const s = TASKS[tab], m = D.modes[mode];
    let g;
    if (mode === 'learn') g = `<section data-tipbox><h3>Hướng dẫn</h3><p>${WHAT[tab]}</p>${s.map(([t, f]) => `<div class="task" data-ok="${f(p) ? 1 : 0}"><i></i><span>${escH(t)}</span></div>`).join('')}
      <button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="fill">Điền gợi ý của bài học</button></section>`;
    else if (mode === 'practice') { const left = HINTS - Object.keys(hints).length;
      g = `<section><h3>Gợi ý · còn ${left}/${HINTS}</h3>${hints[tab] ? `<p>${escH(HINT[tab])}</p>` : left > 0 ? '<button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="hint">Xem gợi ý cho bước này</button>' : '<p>Bạn đã dùng hết gợi ý.</p>'}</section>`; }
    else { const t = m.targets;
      g = `<section><h3>Đề bài</h3><p><b>${escH(CASE.brand)}</b> cần kênh tăng trưởng không trả tiền theo từng lượt nhấp. Website mới, authority ${D.authority}.</p>
        <div class="task" data-ok="${planCost() <= m.budget && p.plan.length <= m.pieces ? 1 : 0}"><i></i><span>≤ ${m.pieces} bài, ≤ ${F.vnd(m.budget)}</span></div>
        <div class="task" data-ok="0"><i></i><span>ROAS 12 tháng ≥ ${t.roas}</span></div><div class="task" data-ok="0"><i></i><span>≥ ${t.orders} đơn trong 12 tháng</span></div>
        <p style="font-size:13px">Không có hướng dẫn từng bước. Điểm chấm theo chất lượng quyết định.</p></section>`; }
    return g + `<section class="est"><h3>Tiến độ</h3><div><span>Danh sách từ khoá</span><b>${p.shortlist.length}</b></div><div><span>Đã phân cụm</span><b>${p.shortlist.filter((id) => p.clusters[id]).length}</b></div>
      <div><span>Cơ hội đã chọn</span><b>${p.opps.length}</b></div><div><span>Bài trong kế hoạch</span><b>${p.plan.length}/${m.pieces}</b></div></section>`;
  }

  function renderWork() {
    app.innerHTML = `<div class="lb"><div class="lb-top"><a class="lb-back" href="#" data-act="exit">← Chế độ & lịch sử</a><span class="lb-eyebrow">${D.modes[mode].t} · SEO Research</span></div>
      <h1 style="font-size:clamp(1.4rem,2.6vw,1.9rem)">Kế hoạch SEO · ${escH(D.domain)}</h1>
      <nav class="steps">${TABS.map(([id, t]) => `<button type="button" data-act="tab" data-t="${id}" ${id === tab ? 'aria-current="step"' : ''}>${t}</button>`).join('')}</nav>
      <div class="ws"><div class="pane"><h2>${TABS.find((x) => x[0] === tab)[1].replace(/^\d\. /, '')}</h2><div id="body">${BODY[tab]()}</div></div><aside class="side" id="side">${sideHTML()}</aside></div></div>`;
  }
  const refreshSide = () => { const s = document.getElementById('side'); if (s) s.innerHTML = sideHTML(); save(); };

  /* ---------- kết quả ---------- */
  const SERIES = { visits: ['Lượt truy cập', (r) => r.clicks, F.int], conv: ['Đơn hàng', (r) => r.conversions, F.int], revenue: ['Doanh thu', (r) => r.revenue, F.vndShort],
    cum: ['Lãi/lỗ luỹ kế', (r) => r.cumNet, F.vndShort] };
  function renderResults() {
    const { a, res, ev, gw } = shown, d = res.diag, t = res.totals, P = a.p, mType = a.mode === 'challenge';
    let cn = 0; const rows = res.days.map((r) => { cn += r.revenue * 1 - r.spend; return { ...r, cumNet: cn }; });
    const sov = SeoSim.shareOfVoice(), baseMe = sov.me;
    const otherT = D.competitors.reduce((s, c) => s + SeoSim.competitor(c.id).traffic, 0), meBase = Object.entries(SeoSim.market().me).reduce((s, [id, pos]) => s + KW(id).vol * SeoSim.ctrAt(pos), 0);
    const meAfter = (meBase + d.steadyVisits) / (otherT + meBase + d.steadyVisits);
    const others2 = LabStore.attempts(TOOL).filter((x) => x.id !== a.id), base = cmpId ? others2.find((x) => x.id === cmpId) : null;
    const bt = base ? SeoSim.simulate(base.p, ctx(base.mode)).totals : null, cmp = bt ? E.compare(bt, t) : null;
    const k = (l, v, key) => `<div class="kpi"><span>${l}</span><b>${v}</b>${cmp && cmp[key] ? `<em data-v="${cmp[key].verdict}">${cmp[key].delta === null ? '' : cmp[key].verdict === 'flat' ? 'không đổi' : (cmp[key].delta > 0 ? '▲ ' : '▼ ') + (cmp[key].pct === null ? '' : F.num(Math.abs(cmp[key].pct) * 100, 0) + '%') + (cmp[key].verdict === 'better' ? ' tốt hơn' : ' kém hơn')}</em>` : ''}</div>`;
    const exps = SeoEval.experiments(P), m = SERIES[metric];
    app.innerHTML = `<div class="lb"><div class="lb-top"><a class="lb-back" href="#" data-act="exit">← Chế độ & lịch sử</a><span class="lb-eyebrow">Kết quả · ${D.modes[a.mode].t}</span></div>
      <h1>${escH(a.label || 'Kế hoạch SEO')}</h1>
      <div class="score" style="margin-top:18px"><b>${ev.total}</b><span>/ 100 điểm${mType ? ` <span class="stars">${U.stars(ev.stars)}</span>` : ''}</span></div>
      <p class="lb-lede" style="margin-top:6px">${gw ? (gw.gain > 0 ? (gw.xp > 0 ? `Sao mới +${gw.gain} → +${gw.xp} XP.` : `Sao mới +${gw.gain}; hôm nay đã đủ XP từ game.`) : 'Chưa có sao mới. XP chỉ tính cho sao mới.') : `Chế độ ${D.modes[a.mode].t} cho điểm để bạn so sánh, nhưng chỉ Thử thách mới tính sao và XP.`}</p>
      <div class="parts">${ev.parts.map((x) => `<div class="part"><span>${escH(x.label)}</span><div class="meter"><i style="width:${x.got / x.max * 100}%"></i></div><b>${x.got}/${x.max}</b></div>`).join('')}</div>
      <section class="lb-sec"><h2>Dự báo 12 tháng</h2>${base ? `<p class="lb-lede" style="margin-top:6px">So với: <b>${escH(base.label || 'lần trước')}</b> (${dt(base.at)}).</p>` : ''}
        <div class="kpis">${k('Chi phí nội dung', F.vnd(t.spend), 'spend')}${k('Lượt truy cập (12 tháng)', F.int(t.clicks), 'clicks')}${k('Đơn hàng (12 tháng)', F.int(t.conversions), 'conversions')}${k('Doanh thu', F.vnd(t.revenue), 'revenue')}${k('ROAS 12 tháng', F.x(t.roas), 'roas')}
          <div class="kpi"><span>Hoàn vốn</span><b>${d.payback ? 'Tháng ' + d.payback : 'Chưa hoàn vốn'}</b></div><div class="kpi"><span>Lượt truy cập tháng 6</span><b>${F.int(d.month6.visits)}</b></div></div>
        <div class="tabs">${Object.entries(SERIES).map(([id, s]) => `<button type="button" data-act="metric" data-k="${id}" aria-pressed="${id === metric}">${s[0]}</button>`).join('')}</div>
        ${U.chart(rows.map((r) => ({ ...r, day: r.day })), m[1], m[2]).replace(/>N(\d+)</g, '>T$1<')}</section>
      <section class="lb-sec"><h2>Chi tiết từng bài</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Từ khoá</th><th>Loại</th><th>Đăng</th><th>Khớp</th><th>KD</th><th>Vị trí dự kiến</th><th>Truy cập/tháng</th></tr></thead><tbody>
        ${d.pieces.map((x) => `<tr><td>${escH(x.kw)}${x.already ? ' <small style="color:var(--lb-bad)">· đã xếp hạng</small>' : ''}</td><td>${D.types[x.type].t}</td><td>Tháng ${x.pub}</td><td>${F.num(x.fit * 100, 0)}</td><td>${x.kd}</td><td>${x.pos > 30 ? '> 30' : '#' + x.pos}</td><td>${F.int(x.steady)}</td></tr>`).join('')}</tbody></table></div></section>
      <section class="lb-sec"><h2>Mức hiện diện (share of voice)</h2><p>Hiện tại bạn chiếm <b>${F.pct(baseMe, 1)}</b> thị trường từ khoá. Nếu kế hoạch đạt vị trí dự kiến, con số lên <b>${F.pct(meAfter, 1)}</b>. Đối thủ lớn nhất: ${escH(D.competitors.slice().sort((x, y) => sov[y.id] - sov[x.id])[0].domain)} (${F.pct(Math.max(...D.competitors.map((c) => sov[c.id])), 0)}).</p></section>
      <section class="lb-sec"><h2>Đọc kết quả</h2>${ev.interpretation.map((x) => `<p style="margin:8px 0">${escH(x)}</p>`).join('')}</section>
      <section class="lb-sec"><h2>Vì sao</h2>${ev.decisions.map((x) => `<div class="dec" data-t="${x.tone}"><b>${escH(x.title)}</b><p>${escH(x.body)}</p></div>`).join('')}</section>
      <section class="lb-sec"><h2>Nên cải thiện gì tiếp theo</h2>${ev.recommendations.length ? `<ol style="padding-left:20px">${ev.recommendations.map((x) => `<li style="margin:8px 0">${escH(x)}</li>`).join('')}</ol>` : '<p>Không còn điểm yếu lớn. Thử các thay đổi bên dưới để hiểu độ nhạy.</p>'}</section>
      <section class="lb-sec"><h2>Thử thay đổi một quyết định</h2>${exps.map((e) => `<div class="lb-exp"><div><b>${escH(e.t)}</b><p>${escH(e.why)}</p></div><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="exp" data-e="${e.id}">Chạy thử</button></div>`).join('')}</section>
      <section class="lb-sec"><h2>So sánh các phiên bản</h2>${others2.length ? `<label style="font-size:14px">So với: <select class="pick" data-act="cmp">${others2.slice().reverse().map((x) => `<option value="${x.id}" ${x.id === cmpId ? 'selected' : ''}>${dt(x.at)} · ${D.modes[x.mode].t} · ${escH(x.label || '')} · điểm ${x.summary.score}</option>`).join('')}</select></label>` : '<p class="lb-lede">Đây là lần đầu. Sửa một thứ rồi chạy lại để so sánh.</p>'}</section>
      <div class="actions"><button class="lb-btn" data-act="edit">Sửa kế hoạch này & chạy lại</button><button class="lb-btn lb-btn--ghost" data-act="new">Làm lại từ đầu</button><a class="lb-btn lb-btn--ghost" href="lab.html">Về Marketing Lab</a></div></div>`;
  }

  /* ---------- điều phối ---------- */
  function render() {
    if (view === 'work' && p) renderWork(); else if (view === 'results' && shown) renderResults(); else { view = 'start'; renderStart(); }
    const u = new URL(location.href); if (mode && view !== 'start') u.searchParams.set('mode', mode); else u.searchParams.delete('mode'); history.replaceState(null, '', u);
  }
  const body = () => { const el = document.getElementById('body'); if (el) el.innerHTML = BODY[tab](); refreshSide(); };
  function run(label, base) {
    const c = ctx(), v = SeoSim.validate(p, c); const msg = document.getElementById('planmsg');
    if (!v.ok) { if (msg) msg.innerHTML = v.errors.map((e) => `<div class="lb-note lb-note--bad"><b>Cần sửa</b>${escH(e.msg)}</div>`).join(''); return false; }
    const prior = LabStore.attempts(TOOL), res = SeoSim.simulate(p, c);
    const ev = SeoEval.evaluate(p, res, c, mode, prior.filter((x) => x.mode === mode).map((x) => ({ roas: x.summary.roas })));
    const gw = mode === 'challenge' ? GW.report(GID, ev.stars, ev.total) : null;
    const a = LabStore.addAttempt(TOOL, { mode, p: clone(p), label: label || '', summary: { roas: res.totals.roas, orders: Math.round(res.orders), pieces: p.plan.length, score: ev.total, stars: ev.stars }, feed: res.feed });
    LabStore.clearDraft(TOOL); shown = { a, res, ev, gw }; cmpId = base || (prior.length ? prior[prior.length - 1].id : null); view = 'results'; render(); window.scrollTo(0, 0); return true;
  }
  function start(m, from) { mode = m; p = from || SeoSim.emptyPlan(); tab = 'research'; hints = {}; view = 'work'; render(); }

  LabUI.bindTerms(app, TERMS);
  let seedTimer = 0;
  app.addEventListener('input', (e) => { const el = e.target; if (el.dataset.f === 'seed') { p.seed = el.value; clearTimeout(seedTimer); seedTimer = setTimeout(() => { const pos = el.selectionStart; body(); const n = document.getElementById('f-seed'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }, 250); } });
  app.addEventListener('change', (e) => {
    const el = e.target, f = el.dataset && el.dataset.f;
    if (el.dataset && el.dataset.act === 'cmp') { cmpId = el.value; renderResults(); return; }
    if (!f) return;
    if (f === 'fintent') fl.intent = el.value; else if (f === 'fsort') fl.sort = el.value; else if (f === 'fkd') fl.maxKd = +el.value; else if (f === 'fvol') fl.minVol = +el.value;
    else if (f === 'short') { p.shortlist = el.checked ? [...new Set([...p.shortlist, el.value])] : p.shortlist.filter((x) => x !== el.value); if (!el.checked) { delete p.clusters[el.value]; p.plan = p.plan.filter((i) => i.id !== el.value || p.opps.includes(i.id)); } }
    else if (f === 'cluster') { if (el.value) p.clusters[el.dataset.id] = el.value; else delete p.clusters[el.dataset.id]; }
    else if (f === 'comp') p.competitor = el.value;
    else if (f === 'opp') p.opps = el.checked ? [...new Set([...p.opps, el.value])] : p.opps.filter((x) => x !== el.value);
    else if (f === 'ptype') p.plan[+el.dataset.i].type = el.value || null;
    if (f === 'cluster' || f === 'ptype') { refreshSide(); if (f === 'ptype') body(); return; }
    body();
  });
  app.addEventListener('click', (e) => {
    if (e.target.closest('.term')) return;
    const b = e.target.closest('[data-act]'); if (!b || b.tagName === 'SELECT') return; const act = b.dataset.act;
    if (act === 'exit') { e.preventDefault(); if (view === 'work') save(); view = 'start'; shown = null; render(); }
    else if (act === 'start') { const d = LabStore.tool(TOOL).draft; if (d && d.mode === b.dataset.m) { mode = d.mode; p = d.p; tab = d.tab || 'research'; hints = d.hints || {}; view = 'work'; render(); } else start(b.dataset.m); }
    else if (act === 'resume') { const d = LabStore.tool(TOOL).draft; if (d) { mode = d.mode; p = d.p; tab = d.tab || 'research'; hints = d.hints || {}; view = 'work'; render(); } }
    else if (act === 'drop') { LabStore.clearDraft(TOOL); render(); }
    else if (act === 'tab') { tab = b.dataset.t; save(); renderWork(); window.scrollTo(0, 0); }
    else if (act === 'seed') { p.seed = b.dataset.s; body(); const n = document.getElementById('f-seed'); if (n) n.value = p.seed; }
    else if (act === 'clearseed') { p.seed = ''; body(); }
    else if (act === 'hint') { hints[tab] = 1; refreshSide(); }
    else if (act === 'autocluster') { for (const id of p.shortlist) p.clusters[id] = KW(id).cluster; body(); }
    else if (act === 'fill') {
      if (tab === 'research') p.shortlist = [...new Set([...p.shortlist, ...FILL.shortlist])];
      else if (tab === 'list') for (const id of p.shortlist) p.clusters[id] = KW(id).cluster;
      else if (tab === 'comp') { p.competitor = 'c2'; p.opps = SeoSim.competitor('c2').gap.slice(0, 3).map((k) => k.id); }
      else if (tab === 'plan') { const c = ctx(); p.plan = FILL.plan.slice(0, c.pieces).map(([id, type]) => ({ id, type })); p.shortlist = [...new Set([...p.shortlist, ...p.plan.map((i) => i.id)])]; }
      body();
    }
    else if (act === 'addplan') { const sel = document.getElementById('addkw'); if (sel && sel.value && p.plan.length < ctx().pieces) { p.plan.push({ id: sel.value, type: null }); body(); } }
    else if (act === 'rm') { p.plan.splice(+b.dataset.i, 1); body(); }
    else if (act === 'up') { const i = +b.dataset.i; if (i > 0) { [p.plan[i - 1], p.plan[i]] = [p.plan[i], p.plan[i - 1]]; body(); } }
    else if (act === 'run') run('');
    else if (act === 'open') { const a = LabStore.attempts(TOOL).find((x) => x.id === b.dataset.id); if (a) { const r = evalAttempt(a); mode = a.mode; shown = { a, res: r.res, ev: r.ev, gw: null };
      const all = LabStore.attempts(TOOL), i = all.findIndex((x) => x.id === a.id); cmpId = i > 0 ? all[i - 1].id : null; view = 'results'; render(); window.scrollTo(0, 0); } }
    else if (act === 'metric') { metric = b.dataset.k; renderResults(); }
    else if (act === 'edit') { mode = shown.a.mode; p = clone(shown.a.p); tab = 'plan'; hints = {}; view = 'work'; render(); window.scrollTo(0, 0); }
    else if (act === 'new') start(shown.a.mode);
    else if (act === 'exp') { const ex = SeoEval.experiments(shown.a.p).find((x) => x.id === b.dataset.e); if (!ex) return; const baseId = shown.a.id; mode = shown.a.mode; p = ex.apply(clone(shown.a.p));
      if (!run('Thử nghiệm: ' + ex.t, baseId)) { view = 'work'; tab = 'plan'; render(); } }
  });

  const d0 = LabStore.tool(TOOL).draft;
  if (mode && d0 && d0.mode === mode) { p = d0.p; tab = d0.tab || 'research'; hints = d0.hints || {}; view = 'work'; render(); }
  else if (mode) start(mode);
  else render();
})();
