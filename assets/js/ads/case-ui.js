/* GIAO DIỆN CASE XUYÊN SUỐT (quang-cao-case.html). Cần app.js (S, escH, qp, lessonMeta), ADS_CASES, AdsCaseEval nạp trước.
   Tiến độ: S.flags.ads.cases[id] = { step, ans, total, pass, at } — đồng bộ theo tài khoản như flags của Lab. */
(() => {
  const E = AdsCaseEval, $app = document.getElementById('app');
  const C = ADS_CASES.find(c => c.id === qp('id')) || ADS_CASES[0];
  const STEPS = ['Brief', 'Chọn kênh', 'Chia ngân sách', 'Brief creative', 'Đọc dashboard', 'Chẩn đoán', 'Quyết định', 'Kết quả'];
  const BF = [['who', 'Khách cụ thể là ai'], ['moment', 'Họ thấy quảng cáo trong khoảnh khắc nào'], ['promise', 'Lời hứa (đo được)'],
    ['proof', 'Bằng chứng nhìn thấy được'], ['offer', 'Offer giảm rủi ro'], ['cta', 'Lời kêu gọi + trang đích'], ['hooks', '2–3 câu mở đầu để thử']];
  const V = { core: ['Nên có', 'ok'], ok: ['Có thể, chưa cần', 'muted'], no: ['Không hợp', 'no'] };
  const vnd = n => Math.round(n).toLocaleString('vi-VN');
  const tr = n => (n / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 2 });
  const pct = (x, d = 2) => x == null ? '—' : (x * 100).toLocaleString('vi-VN', { maximumFractionDigits: d }) + '%';
  const lessonLink = k => { const m = k && lessonMeta(k); return m ? `<a href="bai.html?id=${encodeURIComponent(k)}">${escH(m.t)}</a>` : ''; };

  const store = {
    all() { const a = (S.get().flags || {}).ads || {}; return { cases: {}, ...a }; },
    get() { return this.all().cases[C.id] || { step: 0, ans: {} }; },
    put(v) { const s = S.get(), a = this.all(); a.cases = { ...a.cases, [C.id]: { ...v, at: Date.now() } };
      S.set({ flags: { ...(s.flags || {}), ads: a } }); if (typeof scheduleSync === 'function') scheduleSync(); },
  };
  let st = store.get();
  const save = () => store.put(st);
  const A = () => st.ans;
  const go = n => { st.step = n; save(); render(); window.scrollTo({ top: 0 }); };

  /* phương án theo thứ tự hiển thị cố định */
  const picks = (key, opts, chosen, locked) => E.order(C.id + ':' + key, opts.length).map(i =>
    `<button type="button" class="pick" data-pick="${key}" data-i="${i}" aria-pressed="${chosen === i}" ${locked ? 'disabled' : ''}>${escH(opts[i][0])}</button>`).join('');
  const whyBlock = (key, opts, why, chosen) => E.order(C.id + ':' + key, opts.length).map(i =>
    `<p class="small" style="margin:6px 0;${opts[i][1] ? 'color:var(--ok)' : i === chosen ? 'color:var(--red)' : ''}"><b>${opts[i][1] ? 'Đúng' : i === chosen ? 'Bạn chọn' : 'Kém hơn'}:</b> ${escH(why[i])}</p>`).join('');

  const head = () => `<section class="section" style="padding-bottom:8px">
    <a class="small" href="quang-cao.html">← Khoá Quảng cáo đa nền tảng</a>
    <div class="row between" style="margin-top:10px;align-items:baseline"><span class="mono mono--red">Case xuyên suốt · ${escH(C.kind)}</span>
      <span class="mono">Bước ${Math.min(st.step + 1, 8)}/8 · ${escH(STEPS[st.step])}</span></div>
    <h1 class="h2" style="margin:8px 0 6px">${escH(C.t)}</h1>
    <p class="small muted">${escH(C.brand)} · số liệu giả định để học</p>
    <div class="row" style="gap:4px;margin-top:10px">${STEPS.map((t, i) => `<span title="${escH(t)}" style="flex:1;height:4px;border-radius:2px;background:${i <= st.step ? 'var(--terra,#C85A32)' : 'var(--ink-06)'}"></span>`).join('')}</div>
  </section>`;
  const briefTable = () => `<div style="overflow-x:auto"><table class="t">${C.brief.map(r => `<tr><td class="mono" style="width:38%">${escH(r[0])}</td><td>${escH(r[1])}</td></tr>`).join('')}</table></div>`;
  const nav = (label, next, ok = true) => `<div class="row" style="gap:10px;margin:22px 0 40px"><button class="btn btn--primary" data-go="${next}" ${ok ? '' : 'disabled'}>${label}</button></div>`;

  function step0() {
    return `<p class="lede" style="max-width:64ch">${escH(C.lede)}</p>${briefTable()}
      <p class="small muted" style="margin-top:12px">Mỗi bước bạn chốt câu trả lời trước rồi mới xem lời giải. Chốt rồi không sửa được — muốn làm lại thì bắt đầu lượt mới ở cuối case.</p>
      ${nav('Bắt đầu: chọn kênh', 1)}`;
  }
  function step1() {
    const sel = new Set(A().channels || []), done = !!A().channelsDone;
    const opts = C.channels.opts;
    return `<h2 class="h2">${escH(C.channels.q)}</h2><p class="small muted">Chọn ${C.channels.min}–${C.channels.max} kênh. Đã chọn: ${sel.size}.</p>
      <div style="border-top:var(--rule);margin-top:10px">${opts.map(o => `<button type="button" class="pick" data-ch="${o.id}" aria-pressed="${sel.has(o.id)}" ${done ? 'disabled' : ''}>${escH(o.t)}
        ${done ? `<br><span class="small"><b class="${V[o.v][1]}">${V[o.v][0]}.</b> ${escH(o.why)}</span>` : ''}</button>`).join('')}</div>
      ${done ? `<p class="note" style="margin-top:14px">Điểm phần này: ${Math.round(E.channels(C, A().channels).score * 100)}%.</p>${nav('Tiếp: chia ngân sách', 2)}`
        : `<div class="row" style="margin:18px 0 40px"><button class="btn btn--primary" data-act="chan" ${sel.size >= C.channels.min && sel.size <= C.channels.max ? '' : 'disabled'}>Chốt kênh</button></div>`}`;
  }
  function step2() {
    const B = C.budget, a = A().budget || Object.fromEntries(B.rows.map(r => [r.id, 0])), done = !!A().budgetDone;
    const sum = B.rows.reduce((s, r) => s + (+a[r.id] || 0), 0), chosen = new Set(A().channels || []);
    const res = done ? E.budget(C, a) : null;
    return `<h2 class="h2">Chia ${B.total} ${escH(B.unit)}</h2>
      <p class="small muted">Đơn vị: triệu đồng. Kênh bạn đã chọn được đánh dấu ●. Kênh không chọn thì để 0.</p>
      <div style="overflow-x:auto"><table class="t"><tr><th>Kênh</th><th class="n">Triệu/tháng</th>${done ? '<th>Khoảng hợp lý</th><th class="n">Mẫu</th>' : ''}</tr>
      ${B.rows.map(r => `<tr><td>${chosen.has(r.id) ? '● ' : ''}${escH(r.t)}</td>
        <td class="n"><input class="field" type="number" inputmode="decimal" min="0" step="1" data-bud="${r.id}" value="${+a[r.id] || 0}" style="width:90px;text-align:right" ${done ? 'disabled' : ''}></td>
        ${done ? `<td class="mono">${r.min}–${r.max}</td><td class="n">${B.model[r.id]}</td>` : ''}</tr>`).join('')}
      <tr><td><b>Tổng</b></td><td class="n"><b id="bsum">${sum}</b> / ${B.total}</td>${done ? '<td></td><td></td>' : ''}</tr></table></div>
      ${done ? `<div class="note" style="margin-top:14px"><b>Điểm phần này: ${Math.round(res.score * 100)}%.</b>
          ${res.issues.length ? `<ul>${res.issues.map(i => `<li>${escH(i.msg)}</li>`).join('')}</ul>` : '<p>Phân bổ nằm trong khoảng hợp lý.</p>'}
          <p>${escH(B.why)}</p><p class="small">Học lại: ${lessonLink(B.lesson)}</p></div>${nav('Tiếp: brief creative', 3)}`
        : `<div class="row" style="margin:18px 0 40px"><button class="btn btn--primary" data-act="bud">Chốt ngân sách</button></div>`}`;
  }
  function step3() {
    const cr = C.creative, b = A().brief || {}, ch = new Set(A().checked || []), done = !!A().briefDone;
    return `<h2 class="h2">Viết brief creative cho: ${escH(cr.ch)}</h2>
      <p class="small muted">Mỗi ô ít nhất một câu cụ thể. Sau đó tự soát theo danh sách bên dưới — đánh dấu mục bạn thật sự đạt.</p>
      ${BF.map(([k, t]) => `<label class="stack" style="gap:4px;margin-top:12px"><span class="mono">${t}</span>
        <textarea class="field" rows="2" data-bf="${k}" ${done ? 'disabled' : ''}>${escH(b[k] || '')}</textarea>
        ${done ? `<span class="small muted"><b>Mẫu:</b> ${escH(cr.model[k])}</span>` : ''}</label>`).join('')}
      <h3 class="h3" style="margin-top:20px">Tự soát</h3>
      ${cr.check.map((t, i) => `<label class="row" style="gap:8px;align-items:flex-start;margin:6px 0"><input type="checkbox" data-ck="${i}" ${ch.has(i) ? 'checked' : ''} ${done ? 'disabled' : ''}><span>${escH(t)}</span></label>`).join('')}
      ${done ? `<p class="note">Điểm phần này: ${Math.round(E.creative(C, b, [...ch]).score * 100)}%. So từng ô của bạn với mẫu: mẫu không phải đáp án duy nhất, nhưng mỗi ô của mẫu đều cụ thể tới mức quay được.</p>${nav('Tiếp: đọc dashboard', 4)}`
        : `<div class="row" style="margin:18px 0 40px"><button class="btn btn--primary" data-act="brief">Chốt brief</button></div>`}`;
  }
  function dashTable() {
    const D = C.dash;
    if (!D.funnel) return `<div style="overflow-x:auto"><table class="t"><tr><th>Kênh</th><th class="n">Chi (triệu)</th><th class="n">Hiển thị</th><th class="n">Click</th><th class="n">CTR</th><th class="n">Đơn nền tảng báo</th><th class="n">CPA (đ)</th><th class="n">Doanh thu nền tảng báo (triệu)</th><th class="n">ROAS</th></tr>
      ${D.rows.map(r => { const m = E.metrics(r); return `<tr><td>${escH(r.t)}${r.note ? `<br><span class="small muted">${escH(r.note)}</span>` : ''}</td><td class="n">${tr(r.spend)}</td><td class="n">${vnd(r.impr)}</td><td class="n">${vnd(r.clicks)}</td><td class="n">${pct(m.ctr)}</td><td class="n">${r.conv}</td><td class="n">${vnd(m.cpa)}</td><td class="n">${tr(r.rev)}</td><td class="n">${m.roas.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}</td></tr>`; }).join('')}</table></div>
      ${D.backend ? `<p class="mono" style="margin-top:14px">${escH(D.backend.t)}</p><div style="overflow-x:auto"><table class="t"><tr><th>Nơi bán</th><th class="n">Đơn</th><th class="n">Doanh thu (triệu)</th></tr>
        ${D.backend.rows.map(r => `<tr><td>${escH(r[0])}</td><td class="n">${r[1]}</td><td class="n">${tr(r[2])}</td></tr>`).join('')}</table></div>` : ''}`;
    const cols = D.b2b ? [['leads', 'Lead'], ['mql', 'MQL'], ['sql', 'SQL'], ['opp', 'Cơ hội'], ['won', 'Hợp đồng'], ['open', 'Cơ hội còn mở']] : [['leads', 'Lead'], ['qual', 'Đạt chuẩn'], ['survey', 'Khảo sát'], ['won', 'Ký hợp đồng']];
    return `<div style="overflow-x:auto"><table class="t"><tr><th>Kênh</th><th class="n">Chi (triệu)</th>${cols.map(c => `<th class="n">${c[1]}</th>`).join('')}<th class="n">Chi phí/lead (đ)</th></tr>
      ${D.rows.map(r => `<tr><td>${escH(r.t)}</td><td class="n">${tr(r.spend)}</td>${cols.map(c => `<td class="n">${r[c[0]]}</td>`).join('')}<td class="n">${vnd(r.spend / r.leads)}</td></tr>`).join('')}</table></div>`;
  }
  function step4() {
    const D = C.dash, a = A().dash || {}, done = !!A().dashDone;
    return `<h2 class="h2">${escH(D.title)}</h2>${dashTable()}
      ${D.qs.map((q, n) => `<div style="margin-top:22px;border-top:var(--rule);padding-top:12px"><p><b>${n + 1}.</b> ${escH(q.q)}</p>
        ${q.kind === 'num' ? `<label class="row" style="gap:8px"><input class="field" type="text" inputmode="decimal" data-dq="${q.id}" value="${a[q.id] ?? ''}" style="width:130px" ${done ? 'disabled' : ''}><span class="mono">${escH(q.unit)}</span></label>`
          : `<div style="border-top:var(--rule)">${picks(q.id, q.opts, a[q.id], done)}</div>`}
        ${done ? (q.kind === 'num' ? `<p class="small ${E.num(q, a[q.id]) ? 'ok' : 'no'}" style="margin-top:8px"><b>${E.num(q, a[q.id]) ? 'Đúng.' : 'Chưa đúng — đáp án ' + String(q.ans).replace('.', ',') + ' ' + escH(q.unit) + '.'}</b> ${(q.wrong || []).filter(w => Math.abs(parseFloat(String(a[q.id]).replace(',', '.')) - w[0]) <= q.tol).map(w => escH(w[1])).join(' ')} ${escH(q.why)}</p>`
          : whyBlock(q.id, q.opts, q.why, a[q.id])) + `<p class="small">Học lại: ${lessonLink(q.lesson)}</p>` : ''}</div>`).join('')}
      ${done ? `<p class="note" style="margin-top:14px">Điểm phần này: ${Math.round(E.dash(C, a).score * 100)}%.</p>${nav('Tiếp: chẩn đoán', 5)}`
        : `<div class="row" style="margin:18px 0 40px"><button class="btn btn--primary" data-act="dash" ${D.qs.every(q => a[q.id] !== undefined && a[q.id] !== '') ? '' : 'disabled'}>Chốt câu trả lời</button></div>`}`;
  }
  function step5() {
    const D = C.diag, opened = A().opened || [], done = A().diag !== undefined && A().diagDone;
    return `<h2 class="h2">Chẩn đoán</h2><p class="lede">${escH(D.symptom)}</p>
      <p class="mono" style="margin-top:12px">Đã mở ${opened.length}/${D.max} bảng</p>
      <div style="border-top:var(--rule)">${D.checks.map(k => { const o = opened.includes(k.id);
        return `<div style="border-bottom:var(--rule);padding:10px 0"><button type="button" class="btn btn--quiet" data-open="${k.id}" ${o || opened.length >= D.max || done ? 'disabled' : ''}>${o ? 'Đã mở' : 'Mở'}: ${escH(k.t)}</button>
          ${o ? `<table class="t" style="margin-top:8px">${k.rows.map(r => `<tr><td>${escH(r[0])}</td><td>${escH(r[1])}</td></tr>`).join('')}</table>` : ''}</div>`; }).join('')}</div>
      <h3 class="h3" style="margin-top:20px">Nguyên nhân chính là gì?</h3>
      <div style="border-top:var(--rule)">${picks('diag', D.opts, A().diag, done)}</div>
      ${done ? whyBlock('diag', D.opts, D.why, A().diag) + `<p class="small">Học lại: ${lessonLink(D.lesson)}</p><p class="note">Điểm phần này: ${Math.round(E.diag(C, opened, A().diag).score * 100)}%${E.diag(C, opened, A().diag).sawKey ? '' : ' — bạn chưa mở bảng dữ liệu then chốt nào trước khi kết luận'}.</p>${nav('Tiếp: quyết định', 6)}`
        : `<div class="row" style="margin:18px 0 40px"><button class="btn btn--primary" data-act="diag" ${A().diag !== undefined ? '' : 'disabled'}>Chốt chẩn đoán</button></div>`}`;
  }
  function step6() {
    const T = C.act, done = !!A().actDone;
    return `<h2 class="h2">${escH(T.q)}</h2>
      <div style="border-top:var(--rule)">${picks('act', T.opts, A().act, done)}</div>
      ${done ? whyBlock('act', T.opts, T.why, A().act) + `<p class="small">Học lại: ${lessonLink(T.lesson)}</p>${nav('Xem kết quả', 7)}`
        : `<div class="row" style="margin:18px 0 40px"><button class="btn btn--primary" data-act="act" ${A().act !== undefined ? '' : 'disabled'}>Chốt quyết định</button></div>`}`;
  }
  function step7() {
    const g = E.grade(C, A()), L = { channels: 'Chọn kênh', budget: 'Chia ngân sách', creative: 'Brief creative', dash: 'Đọc dashboard', diag: 'Chẩn đoán', act: 'Quyết định' };
    if (st.total !== g.total) { st.total = g.total; st.pass = g.pass; save(); }
    return `<h2 class="h2">${g.total}/100 · ${g.pass ? 'Đạt' : 'Chưa đạt (cần 70)'}</h2>
      <div style="overflow-x:auto"><table class="t">${Object.keys(E.W).map(k => `<tr><td>${L[k]}</td><td class="n">${Math.round(g.parts[k].score * E.W[k])}/${E.W[k]}</td></tr>`).join('')}</table></div>
      ${g.review.filter(k => lessonMeta(k)).length ? `<h3 class="h3" style="margin-top:20px">Bài nên học lại</h3><ul>${g.review.filter(k => lessonMeta(k)).map(k => `<li>${lessonLink(k)}</li>`).join('')}</ul>` : '<p class="note">Không có phần nào cần học lại. Thử một case khác hoặc làm capstone.</p>'}
      <div class="row" style="gap:10px;margin:22px 0 40px">
        <a class="btn btn--primary" href="quang-cao.html">Về trang khoá</a>
        ${ADS_CASES.filter(c => c.id !== C.id).map(c => `<a class="btn btn--ghost" href="quang-cao-case.html?id=${c.id}">${escH(c.kind)}: ${escH(c.brand.split(' (')[0])}</a>`).join('')}
        <button class="btn btn--quiet" data-act="reset">Làm lại case này</button></div>`;
  }

  function render() {
    $app.innerHTML = head() + `<section class="section" style="padding-top:8px;max-width:860px">${[step0, step1, step2, step3, step4, step5, step6, step7][st.step]()}</section>`;
  }

  $app.addEventListener('click', e => {
    const t = e.target.closest('button,[data-go]'); if (!t || t.disabled) return;
    if (t.dataset.go) return go(+t.dataset.go);
    if (t.dataset.ch) { const s = new Set(A().channels || []); s.has(t.dataset.ch) ? s.delete(t.dataset.ch) : s.add(t.dataset.ch); A().channels = [...s]; save(); return render(); }
    if (t.dataset.pick) { const k = t.dataset.pick, i = +t.dataset.i;
      if (k === 'diag' || k === 'act') A()[k] = i; else { A().dash = { ...(A().dash || {}), [k]: i }; }
      save(); return render(); }
    if (t.dataset.open) { const o = A().opened || []; if (o.length < C.diag.max && !o.includes(t.dataset.open)) A().opened = [...o, t.dataset.open]; save(); return render(); }
    const act = t.dataset.act;
    if (act === 'chan') A().channelsDone = true;
    if (act === 'bud') A().budgetDone = true;
    if (act === 'brief') A().briefDone = true;
    if (act === 'dash') A().dashDone = true;
    if (act === 'diag') A().diagDone = true;
    if (act === 'act') A().actDone = true;
    if (act === 'reset') { st = { step: 0, ans: {} }; save(); return render(); }
    if (act) { save(); render(); }
  });
  $app.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.bud) { A().budget = { ...(A().budget || Object.fromEntries(C.budget.rows.map(r => [r.id, 0]))), [t.dataset.bud]: Math.max(0, +t.value || 0) };
      const sum = C.budget.rows.reduce((s, r) => s + (+A().budget[r.id] || 0), 0); const el = document.getElementById('bsum'); if (el) el.textContent = sum; save(); }
    if (t.dataset.bf) { A().brief = { ...(A().brief || {}), [t.dataset.bf]: t.value }; save(); }
    if (t.dataset.dq) { A().dash = { ...(A().dash || {}), [t.dataset.dq]: t.value }; save();
      const btn = $app.querySelector('[data-act="dash"]'); if (btn) btn.disabled = !C.dash.qs.every(q => A().dash[q.id] !== undefined && A().dash[q.id] !== ''); }
  });
  $app.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.ck !== undefined) { const s = new Set(A().checked || []); t.checked ? s.add(+t.dataset.ck) : s.delete(+t.dataset.ck); A().checked = [...s]; save(); }
  });
  render();
})();
