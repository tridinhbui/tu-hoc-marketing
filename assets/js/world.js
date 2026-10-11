/* THẾ GIỚI MARKETING — bản đồ tương tác sáu khu + phòng khu (giới thiệu · học liệu · case thật · thử thách · công cụ).
   Dựng trên hạ tầng sẵn có: DISTRICTS/FIELDS, PRINCIPLES, CAMPAIGNS, CHALLENGES, Lab (bài tập + XP một lần),
   State.work.lab (đồng bộ lên máy chủ cùng sổ tay), cờ "đã đọc" của core.js (thmc.v1.flags) và sao game (thmc.v1.gw). */
(function () {
  'use strict';
  const POS = { consumer: [13, 30], brand: [36, 17], creative: [59, 33], media: [84, 22], growth: [70, 72], strategy: [32, 73] };
  const ORDER = ['consumer', 'brand', 'creative', 'media', 'growth', 'strategy'];
  const byKey = (k) => DISTRICTS.find((d) => d.key === k);
  const app = () => { try { return JSON.parse(localStorage.getItem('thmc.v1') || '{}'); } catch (e) { return {}; } };
  const flag = (k) => !!((app().flags || {})[k]);
  const stars = (id) => (((app().gw || {}).stars || {})[id]) || 0;
  const LABEL = { new: 'Chưa ghé', go: 'Đang khám phá', done: 'Hoàn thành' };

  /* công cụ của từng khu: inline = dựng ngay trong phòng; game/lab = trang có sẵn; soon = đã lên kế hoạch (không có nút) */
  const TOOLS = {
    brand: [
      { id: 'dna', kind: 'inline', t: 'Brand DNA Canvas', d: 'Điền bảy ô: mục đích, giá trị, tính cách, giọng nói, tài sản, lời hứa, khác biệt. Mỗi ô có phép kiểm.' },
      { id: 'g3', kind: 'game', href: 'game-ban-do-dinh-vi.html', t: 'Bản đồ định vị', d: 'Đặt thương hiệu lên bản đồ hai trục, so với đối thủ.' },
    ],
    consumer: [
      { id: 'g2', kind: 'game', href: 'game-chon-tep.html', t: 'Chọn tệp', d: 'Chọn phân khúc phục vụ trước khi tiền và người có hạn.' },
      { id: 'insight', kind: 'soon', t: 'Consumer Insight Lab', d: 'Biến trích dẫn thật thành insight có căng thẳng — giai đoạn 2.' },
    ],
    creative: [
      { id: 'g6', kind: 'game', href: 'game-ke-chuyen.html', t: 'Kể chuyện 60 giây', d: 'Kể một ý tưởng thương hiệu trong một phút.' },
      { id: 'brief', kind: 'soon', t: 'Creative Brief Builder', d: 'Dựng brief một trang từ vấn đề tới thông điệp — giai đoạn 2.' },
    ],
    growth: [
      { id: 'g5', kind: 'game', href: 'game-phieu-ro.html', t: 'Phễu rò', d: 'Tìm chỗ rò trong phễu và quyết định vá ở đâu.' },
      { id: 'meta', kind: 'lab', href: 'lab-meta.html', t: 'Growth Experiment Lab', d: 'Thiết kế thử nghiệm quảng cáo, chạy mô phỏng và đọc kết quả.' },
    ],
    media: [
      { id: 'g4', kind: 'game', href: 'game-ngan-sach.html', t: 'Media Budget Simulator', d: 'Chia ngân sách media giữa các kênh và xem hệ quả.' },
    ],
    strategy: [
      { id: 'case', kind: 'lab', href: 'case-thu-vien.html', t: 'Strategy Case Room', d: 'Giải case có bấm giờ: chọn hỏi dữ liệu, chấm theo tính toán, insight, đề xuất.' },
    ],
  };

  /* ------- tiến độ từng khu (tính từ dữ liệu thật; không có số nào là mô phỏng) ------- */
  function dna() { return Lab.get('dna') || { data: {}, done: false }; }
  function stat(x) {
    const reads = x.reads.map((id) => PRINCIPLES.find((p) => p.id === id)).filter(Boolean);
    const camps = CAMPAIGNS.filter((c) => c.district === x.key);
    const rDone = reads.filter((p) => flag('read:principle.html:' + p.id)).length;
    const cDone = camps.filter((c) => flag('read:campaign.html:' + c.id)).length;
    const ch = Lab.get('wd:ch:' + x.key), chal = !!(ch && ch.total);
    const gate = State.has('districts', x.id);
    const tools = TOOLS[x.key] || [];
    const toolDone = tools.some((t) => (t.id === 'dna' ? dna().done : /^g\d$/.test(t.id) ? stars(t.id) > 0 : t.id === 'case' ? Object.keys(app().cases || {}).length > 0 : t.id === 'meta' ? !!Lab.get('meta:any') : false));
    const pct = Math.round(100 * ((reads.length ? rDone / reads.length : 1) * .25 + (camps.length ? cDone / camps.length : 1) * .25 + (chal ? 1 : 0) * .2 + (gate ? 1 : 0) * .1 + (toolDone ? 1 : 0) * .2));
    return { reads, camps, rDone, cDone, chal, gate, toolDone, pct, state: pct >= 100 ? 'done' : pct > 0 ? 'go' : 'new', unlocked: gate || chal };
  }

  /* ------- bản đồ ------- */
  function paintMap() {
    const host = document.getElementById('wmap'); if (!host) return;
    const R = 38, C = 2 * Math.PI * R;
    const st = Object.fromEntries(DISTRICTS.map((d) => [d.key, stat(d)]));
    const pts = ORDER.map((k) => POS[k]);
    const path = (a, b) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - 10; return `M${a[0] * 10},${a[1] * 5.625} Q${mx * 10},${my * 5.625} ${b[0] * 10},${b[1] * 5.625}`; };
    host.innerHTML = `<svg class="wm__paths" viewBox="0 0 1000 562.5" preserveAspectRatio="none" aria-hidden="true">${
      pts.slice(0, -1).map((p, i) => `<path class="${st[ORDER[i]].state === 'done' ? 'done' : ''}" d="${path(p, pts[i + 1])}"/>`).join('')}</svg>
      <span class="wm__hint" aria-hidden="true">Chọn một khu để bước vào →</span>
      ${ORDER.map((k, i) => { const d = byKey(k), s = st[k], off = C * (1 - s.pct / 100);
        return `<button type="button" class="wm__node" data-k="${k}" data-s="${s.state}" style="--x:${POS[k][0]}%;--y:${POS[k][1]}%;--c:${d.color}"
          aria-label="${d.vi}: ${LABEL[s.state]}, ${s.pct}%">
          <span class="wm__isle">${d.mark}<svg class="wm__ring" viewBox="0 0 100 100" aria-hidden="true"><circle class="bg" cx="50" cy="50" r="${R + 10}" /><circle class="fg" cx="50" cy="50" r="${R + 10}" stroke-dasharray="${2 * Math.PI * (R + 10)}" stroke-dashoffset="${2 * Math.PI * (R + 10) * (1 - s.pct / 100)}"/></svg></span>
          <span><b>${d.vi}</b><small>${i + 1} · ${LABEL[s.state]} · ${s.pct}%</small></span></button>`; }).join('')}`;
    host.querySelectorAll('.wm__node').forEach((b) => { b.onclick = () => openRoom(b.dataset.k, true); });
    const done = DISTRICTS.filter((d) => st[d.key].state === 'done').length;
    const el = document.getElementById('wmSum'); if (el) el.textContent = `${done}/6 khu hoàn thành · ${Math.round(DISTRICTS.reduce((n, d) => n + st[d.key].pct, 0) / 6)}% hành trình`;
  }

  /* ------- phòng khu ------- */
  let cur = null, tab = 'intro';
  const room = () => document.getElementById('room');
  function openRoom(k, scroll) {
    const x = byKey(k); if (!x) return;
    cur = k; tab = 'intro';
    history.replaceState(null, '', '#phong-' + k);
    Lab.set('world:last', { k });
    renderRoom();
    if (scroll) room().scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    const h = room().querySelector('h2'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
  }
  function closeRoom() { cur = null; room().hidden = true; history.replaceState(null, '', location.pathname + location.search); document.getElementById('wmap').scrollIntoView({ block: 'center' }); }

  function tabs(s, x) {
    const t = TOOLS[x.key] || [];
    return [['intro', 'Giới thiệu', ''], ['mat', 'Học liệu', `${s.rDone}/${s.reads.length}`], ['case', 'Case thật', `${s.cDone}/${s.camps.length}`],
      ['chal', 'Thử thách', s.chal ? '✓' : ''], ['tool', 'Công cụ', String(t.filter((z) => z.kind !== 'soon').length)]];
  }
  function renderRoom() {
    const x = byKey(cur), s = stat(x), el = room();
    el.hidden = false; el.style.setProperty('--c', x.color);
    const T = tabs(s, x);
    el.innerHTML = `<header class="rm__head"><div><span class="mono" style="opacity:.85">Khu ${ORDER.indexOf(x.key) + 1}/6 · ${esc(x.name)}</span><h2>${esc(x.vi)}</h2><p>${esc(x.line)}</p></div>
        <div class="rm__pct"><b>${s.pct}%</b>hoàn thành</div><button type="button" class="rm__close" id="rmX">← Về bản đồ</button></header>
      <div class="rm__tabs" role="tablist" aria-label="Nội dung khu">${T.map(([id, t, n]) => `<button type="button" role="tab" id="tb-${id}" aria-selected="${id === tab}" aria-controls="pn-${id}" data-t="${id}">${t}${n ? `<em>${n}</em>` : ''}</button>`).join('')}</div>
      <div class="rm__panel" role="tabpanel" id="pn-${tab}" aria-labelledby="tb-${tab}"></div>`;
    el.querySelector('#rmX').onclick = closeRoom;
    const tabsEl = el.querySelectorAll('[role=tab]');
    tabsEl.forEach((b, i) => {
      b.onclick = () => { tab = b.dataset.t; renderRoom(); el.querySelector('[role=tab][aria-selected=true]').focus(); };
      b.onkeydown = (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = tabsEl[(i + (e.key === 'ArrowRight' ? 1 : tabsEl.length - 1)) % tabsEl.length]; n.click(); } };
    });
    const p = el.querySelector('.rm__panel');
    ({ intro: introP, mat: matP, case: caseP, chal: chalP, tool: toolP })[tab](p, x, s);
    paintMap();
  }

  function introP(p, x, s) {
    p.innerHTML = `<blockquote class="rm__ask">${esc(x.ask)}</blockquote>
      <div class="rm__topics">${x.topics.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="rm__grid">
        <div class="rm__card"><span class="st">Bạn đang ở đâu</span><b>${s.pct}% khu này</b>
          <span>Học liệu ${s.rDone}/${s.reads.length} · Case ${s.cDone}/${s.camps.length} · Thử thách ${s.chal ? 'đã làm' : 'chưa làm'} · Cửa vào khu ${s.gate ? 'đã qua' : 'chưa qua'} · Công cụ ${s.toolDone ? 'đã dùng' : 'chưa dùng'}</span></div>
        <div class="rm__card" data-lock="${s.unlocked ? 0 : 1}"><span class="st">${s.unlocked ? 'Đã mở' : 'Đang khoá'}</span><b>Công cụ của khu</b>
          <span>${s.unlocked ? 'Bạn đã mở công cụ: vào tab Công cụ để bắt đầu.' : 'Làm bộ thử thách của khu hoặc qua cửa vào khu (ở danh mục bên dưới) để mở công cụ.'}</span></div>
      </div>
      <div class="rm__sub">Bắt đầu từ đâu</div>
      <div class="rm__grid">
        <button type="button" class="rm__card" data-go="mat"><span class="st">Bước 1</span><b>Đọc ${s.reads.length} nguyên lý của khu</b><span>Mỗi trang đọc 15 giây trở lên được ghi là đã đọc.</span></button>
        <button type="button" class="rm__card" data-go="case"><span class="st">Bước 2</span><b>Mổ ${s.camps.length} case thật</b><span>Xem chiến dịch ngoài đời và rút bài học.</span></button>
        <button type="button" class="rm__card" data-go="chal"><span class="st">Bước 3</span><b>Làm thử thách</b><span>Chọn hướng đi, rồi đọc lý do từng phương án.</span></button>
      </div>`;
    p.querySelectorAll('[data-go]').forEach((b) => b.onclick = () => { tab = b.dataset.go; renderRoom(); });
  }
  function matP(p, x, s) {
    p.innerHTML = `<div class="rm__grid">${s.reads.map((r) => { const d = flag('read:principle.html:' + r.id);
      return `<a class="rm__card" href="principle.html?id=${esc(r.id)}" data-done="${d ? 1 : 0}"><span class="st">${d ? '✓ Đã đọc' : 'Chưa đọc'} · ${esc(r.n || '')}</span><b>${esc(r.t)}</b><span>${esc(r.vi)} — ${esc(r.one || '')}</span></a>`; }).join('')
      || '<p>Khu này chưa có nguyên lý nào được gắn.</p>'}</div>
      <p class="caption" style="margin-top:14px">Học thêm bài học tương ứng ở <a href="hoc-bai.html">Học bài</a>.</p>`;
  }
  function caseP(p, x, s) {
    p.innerHTML = `<div class="rm__grid">${s.camps.map((c) => { const d = flag('read:campaign.html:' + c.id);
      return `<a class="rm__card" href="campaign.html?id=${esc(c.id)}" data-done="${d ? 1 : 0}"><span class="st">${d ? '✓ Đã mổ' : 'Chưa mổ'} · ${esc(c.year || '')} · ${esc(c.market || '')}</span><b>${esc(c.brand)} — ${esc(c.title)}</b><span>${esc(c.insight || '')}</span></a>`; }).join('')
      || '<p>Chưa có case nào cho khu này. Xem thêm ở <a href="gallery.html">Campaign Gallery</a>.</p>'}</div>
      <p class="caption" style="margin-top:14px">Muốn tự dự đoán trước khi đọc đáp án? <a href="xray.html">Brand X-Ray</a>.</p>`;
  }
  function chalItems(x) {
    const src = CHALLENGES.filter((c) => c.d === x.key);
    return src.map((c) => { const ok = c.opts.findIndex((o) => o.ok);
      return { q: c.q, ctx: c.brief, opts: c.opts.map((o) => o.t), a: ok, why: c.opts[ok].why }; });
  }
  function chalP(p, x) {
    const items = chalItems(x);
    if (!items.length) { p.innerHTML = '<p>Chưa có thử thách riêng cho khu này.</p>'; return; }
    p.innerHTML = '<div id="wd-q"></div>';
    Lab.quiz(document.getElementById('wd-q'), { id: 'wd:ch:' + x.key, tag: `Thử thách · ${x.name}`, items: Lab.shuffle(items), fresh: () => Lab.shuffle(chalItems(x)), xp: 8,
      onDone: () => { paintMap(); const t = room().querySelector('#tb-chal'); if (t && !t.querySelector('em')) t.insertAdjacentHTML('beforeend', '<em>✓</em>'); } });
  }
  function toolP(p, x, s) {
    const list = TOOLS[x.key] || [];
    p.innerHTML = `${s.unlocked ? '' : `<p class="note" style="margin:0 0 14px">Công cụ đang khoá: làm bộ thử thách của khu (tab Thử thách) hoặc qua cửa vào khu để mở.</p>`}
      <div class="rm__grid">${list.map((t) => t.kind === 'soon'
        ? `<div class="rm__card" data-lock="1"><span class="st">Sắp có</span><b>${esc(t.t)}</b><span>${esc(t.d)}</span></div>`
        : t.kind === 'inline'
          ? `<button type="button" class="rm__card" data-lock="${s.unlocked ? 0 : 1}" data-tool="${t.id}" ${s.unlocked ? '' : 'disabled'}><span class="st">${s.unlocked ? (dna().done ? '✓ Đã hoàn thành' : 'Mở ngay') : 'Đang khoá'}</span><b>${esc(t.t)}</b><span>${esc(t.d)}</span></button>`
          : `<a class="rm__card" ${s.unlocked ? `href="${t.href}"` : 'aria-disabled="true"'} data-lock="${s.unlocked ? 0 : 1}" data-done="${/^g\d$/.test(t.id) && stars(t.id) ? 1 : 0}"><span class="st">${s.unlocked ? (/^g\d$/.test(t.id) ? (stars(t.id) ? '★'.repeat(stars(t.id)) + '☆'.repeat(3 - stars(t.id)) : 'Chưa chơi') : 'Mở') : 'Đang khoá'}</span><b>${esc(t.t)}</b><span>${esc(t.d)}</span></a>`).join('')}</div>
      <div id="tool-host" style="margin-top:20px"></div>`;
    p.querySelectorAll('[data-tool]').forEach((b) => b.onclick = () => { if (b.dataset.tool === 'dna') mountDNA(document.getElementById('tool-host'), x); document.getElementById('tool-host').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    p.querySelectorAll('a[aria-disabled]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); toast('Làm thử thách của khu để mở công cụ'); }));
    if (s.unlocked && x.key === 'brand' && (dna().done || Object.keys(dna().data || {}).length)) mountDNA(document.getElementById('tool-host'), x);
  }

  /* ------- Brand DNA Canvas ------- */
  const TRAITS = ['Ấm áp', 'Tinh tế', 'Táo bạo', 'Chân thật', 'Hài hước', 'Điềm tĩnh', 'Khơi gợi', 'Chuyên gia', 'Gần gũi', 'Sắc sảo', 'Mộc mạc', 'Thanh lịch'];
  const VAGUE = /(tốt nhất|chất lượng|hàng đầu|uy tín|số 1|số một|chuyên nghiệp|tận tâm|hoàn hảo)/i;
  const words = (t) => String(t || '').trim().split(/\s+/).filter(Boolean).length;
  const CHECKS = [
    ['Mục đích nêu rõ “để làm gì”', 'Một câu, có chữ “để”, từ 30 ký tự.', (d) => String(d.purpose || '').length >= 30 && /(^|\s)để(\s|$)/i.test(d.purpose)],
    ['Ba giá trị, mỗi giá trị có hành vi', 'Tên giá trị và một việc cụ thể bạn làm vì nó (từ 20 ký tự).', (d) => [1, 2, 3].every((i) => String(d['v' + i] || '').trim().length >= 2 && String(d['b' + i] || '').trim().length >= 20)],
    ['Đúng bốn nét tính cách', 'Chọn đúng 4, không hơn không kém.', (d) => (d.traits || []).length === 4],
    ['Giọng nói có “nói” và “không nói”', 'Hai câu mẫu khác nhau, mỗi câu từ 20 ký tự.', (d) => String(d.say || '').length >= 20 && String(d.nosay || '').length >= 20 && d.say.trim() !== d.nosay.trim()],
    ['Ít nhất hai tài sản nhận diện', 'Màu, hình, hoặc từ ngữ/âm thanh riêng.', (d) => ['a1', 'a2', 'a3'].filter((k) => String(d[k] || '').trim().length >= 3).length >= 2],
    ['Lời hứa gọn và không sáo', '6–20 từ, không dùng “tốt nhất, chất lượng, hàng đầu, uy tín”.', (d) => { const n = words(d.promise); return n >= 6 && n <= 20 && !VAGUE.test(d.promise); }],
    ['Khác biệt nói được với một đối thủ', 'Đối thủ nói gì, bạn nói gì — hai câu phải khác nhau.', (d) => String(d.rival || '').trim().length >= 3 && String(d.rsay || '').trim().length >= 10 && String(d.wesay || '').trim().length >= 10 && d.rsay.trim() !== d.wesay.trim()],
  ];
  function summary(d) {
    return ['BRAND DNA CANVAS', `Mục đích: ${d.purpose || ''}`,
      `Giá trị: ${[1, 2, 3].map((i) => `${d['v' + i] || ''} — ${d['b' + i] || ''}`).join(' | ')}`,
      `Tính cách: ${(d.traits || []).join(', ')}`, `Chúng tôi nói kiểu: ${d.say || ''}`, `Chúng tôi không nói kiểu: ${d.nosay || ''}`,
      `Tài sản nhận diện: ${[d.a1, d.a2, d.a3].filter(Boolean).join(' · ')}`, `Lời hứa: ${d.promise || ''}`,
      `Khác biệt: ${d.rival || '…'} nói “${d.rsay || ''}”; chúng tôi nói “${d.wesay || ''}”`].join('\n');
  }
  function mountDNA(host, x) {
    const saved = dna(); const d = { ...(saved.data || {}) }; d.traits = d.traits || [];
    const V = (k) => esc(d[k] || '');
    host.innerHTML = `<div class="dna" style="--c:${x.color}">
      <div>
        <div class="dna__sec"><h4>1 · Mục đích</h4><p class="h">Thương hiệu tồn tại để làm gì, cho ai? Một câu, bắt đầu bằng “Chúng tôi tồn tại để…”.</p>
          <textarea data-k="purpose" aria-label="Mục đích" placeholder="Chúng tôi tồn tại để giúp … có thể …">${V('purpose')}</textarea></div>
        <div class="dna__sec"><h4>2 · Ba giá trị cốt lõi</h4><p class="h">Mỗi giá trị đi kèm một hành vi cụ thể — nếu không có hành vi thì nó chỉ là khẩu hiệu.</p>
          ${[1, 2, 3].map((i) => `<div class="dna__row"><input type="text" data-k="v${i}" aria-label="Giá trị ${i}" placeholder="Giá trị ${i}" value="${V('v' + i)}"><input type="text" data-k="b${i}" aria-label="Hành vi của giá trị ${i}" placeholder="Vì thế chúng tôi luôn…" value="${V('b' + i)}"></div>`).join('')}</div>
        <div class="dna__sec"><h4>3 · Tính cách <span id="dna-tn" style="font:600 12px var(--sans);opacity:.6"></span></h4><p class="h">Chọn đúng bốn nét. Nếu thương hiệu là một người, họ là ai?</p>
          <div class="dna__chips" id="dna-traits">${TRAITS.map((t) => `<button type="button" aria-pressed="${d.traits.includes(t)}" data-t="${esc(t)}">${esc(t)}</button>`).join('')}</div></div>
        <div class="dna__sec"><h4>4 · Giọng nói</h4><p class="h">Một câu thương hiệu sẽ nói, và một câu thương hiệu sẽ không bao giờ nói.</p>
          <input type="text" data-k="say" aria-label="Chúng tôi nói kiểu" placeholder="Chúng tôi nói kiểu: …" value="${V('say')}">
          <input type="text" data-k="nosay" aria-label="Chúng tôi không nói kiểu" placeholder="Chúng tôi không nói kiểu: …" value="${V('nosay')}"></div>
        <div class="dna__sec"><h4>5 · Tài sản nhận diện</h4><p class="h">Nếu che logo đi, khách còn nhận ra bạn bằng gì?</p>
          <input type="text" data-k="a1" aria-label="Màu sắc" placeholder="Màu / bảng màu" value="${V('a1')}">
          <input type="text" data-k="a2" aria-label="Hình" placeholder="Hình / hoạ tiết / hình dáng" value="${V('a2')}">
          <input type="text" data-k="a3" aria-label="Từ ngữ" placeholder="Từ ngữ / âm thanh / nghi thức" value="${V('a3')}"></div>
        <div class="dna__sec"><h4>6 · Lời hứa</h4><p class="h">Một câu gọn, đo được bằng trải nghiệm. 6–20 từ.</p>
          <input type="text" data-k="promise" aria-label="Lời hứa" placeholder="Mỗi … bạn nhận được …" value="${V('promise')}"></div>
        <div class="dna__sec"><h4>7 · Khác biệt</h4><p class="h">Chọn một đối thủ. Họ nói gì? Bạn nói gì khác?</p>
          <input type="text" data-k="rival" aria-label="Đối thủ" placeholder="Tên đối thủ" value="${V('rival')}">
          <input type="text" data-k="rsay" aria-label="Đối thủ nói" placeholder="Họ nói: …" value="${V('rsay')}">
          <input type="text" data-k="wesay" aria-label="Bạn nói" placeholder="Chúng tôi nói: …" value="${V('wesay')}"></div>
      </div>
      <aside class="dna__side" aria-live="polite"><b style="font-family:var(--serif);font-size:1.15rem">Độ sắc nét</b>
        <div class="dna__meter"><i id="dna-m" style="width:0"></i></div>
        <ul class="dna__chk" id="dna-chk"></ul>
        <div class="dna__act"><button type="button" class="dna__btn" id="dna-save" disabled>Lưu vào sổ tay</button>
          <button type="button" class="dna__btn dna__btn--g" id="dna-copy">Sao chép bản tóm tắt</button>
          <button type="button" class="dna__btn dna__btn--g" id="dna-reset">Làm lại từ đầu</button></div>
        <div class="dna__msg" id="dna-msg"></div></aside></div>`;
    const msg = (t) => { host.querySelector('#dna-msg').textContent = t; };
    let timer;
    function eval_() {
      const res = CHECKS.map(([t, h, f]) => [t, h, !!f(d)]), n = res.filter((r) => r[2]).length;
      host.querySelector('#dna-m').style.width = Math.round(n / CHECKS.length * 100) + '%';
      host.querySelector('#dna-chk').innerHTML = res.map(([t, h, ok]) => `<li data-ok="${ok ? 1 : 0}"><span>${esc(t)}<small>${esc(h)}</small></span></li>`).join('');
      host.querySelector('#dna-tn').textContent = `${d.traits.length}/4`;
      host.querySelector('#dna-save').disabled = n < CHECKS.length;
      return n;
    }
    function persist() {
      const n = eval_(), prev = dna(), done = n === CHECKS.length;
      Lab.set('dna', { data: d, done: prev.done || done });
      if (done && !prev.done) {
        const got = Lab.xp('dna', 20);
        msg(`Hoàn thành Brand DNA Canvas${got ? ` · +${got} XP` : ''}. Lưu vào sổ tay để giữ bản này.`);
        if (typeof State.touch === 'function') State.touch();
        paintMap(); const rp = room().querySelector('.rm__pct b'); if (rp) rp.textContent = stat(x).pct + '%';
      }
    }
    host.querySelectorAll('[data-k]').forEach((el) => el.addEventListener('input', () => { d[el.dataset.k] = el.value; clearTimeout(timer); eval_(); timer = setTimeout(persist, 450); }));
    host.querySelectorAll('#dna-traits [data-t]').forEach((b) => b.onclick = () => {
      const t = b.dataset.t, i = d.traits.indexOf(t);
      if (i > -1) d.traits.splice(i, 1); else if (d.traits.length < 4) d.traits.push(t); else { msg('Chỉ chọn đúng 4 nét — bỏ một nét trước.'); return; }
      b.setAttribute('aria-pressed', String(d.traits.includes(t))); persist();
    });
    host.querySelector('#dna-save').onclick = () => {
      const s = State.get(), notes = s.notes || [];
      notes.unshift({ t: 'Brand DNA Canvas', body: summary(d), when: new Date().toISOString().slice(0, 10), kind: 'Brand DNA', href: 'world.html#phong-brand' });
      State.set({ notes }); msg('Đã lưu vào sổ tay.');
    };
    host.querySelector('#dna-copy').onclick = async () => {
      const t = summary(d);
      try { await navigator.clipboard.writeText(t); msg('Đã sao chép bản tóm tắt.'); }
      catch (e) { const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); msg('Đã sao chép bản tóm tắt.'); } catch (_) { msg('Không sao chép được — hãy chọn và chép thủ công.'); } ta.remove(); }
    };
    host.querySelector('#dna-reset').onclick = () => {
      if (!confirm('Xoá toàn bộ Brand DNA Canvas và làm lại?')) return;
      Lab.set('dna', { data: {}, done: false }); mountDNA(host, x); msg('Đã xoá. Bắt đầu lại nhé.');
    };
    eval_();
  }

  /* ------- khởi động ------- */
  function boot() {
    paintMap();
    const m = /^#phong-([a-z]+)$/.exec(location.hash || '');
    if (m && byKey(m[1])) openRoom(m[1], true);
    window.addEventListener('hashchange', () => { const h = /^#phong-([a-z]+)$/.exec(location.hash || ''); if (h && byKey(h[1]) && h[1] !== cur) openRoom(h[1], true); });
    window.addEventListener('storage', paintMap);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.WorldMap = { open: openRoom, repaint: paintMap };
})();
