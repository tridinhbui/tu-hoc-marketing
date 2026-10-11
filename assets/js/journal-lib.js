/* TẠP CHÍ — thư viện bài viết có đánh dấu, ghi chú, tiến độ đọc; thử thách hằng ngày xoay theo khu; "số đặc biệt" mở khoá theo mức đọc.
   Dựa trên core.js (State), lab.js (Lab), reader.js (ghi 'rd:<loại>:<id>' vào Lab) và dữ liệu CAMPAIGNS/PRINCIPLES/LESSONS/CHALLENGES/DISTRICTS. */
(function () {
  const host = document.getElementById('thuvien'); if (!host) return;
  const DKEY = DISTRICTS.map((d) => d.key);
  const dname = (k) => (DISTRICTS.find((d) => d.key === k) || {}).vi || '';
  const flag = (k) => { try { return !!((JSON.parse(localStorage.getItem('thmc.v1') || '{}').flags || {})[k]); } catch (e) { return false; } };
  const dOf = (x) => (DKEY.includes(x) ? x : 'strategy');
  const ART = [
    ...CAMPAIGNS.map((c) => ({ id: 'campaign:' + c.id, type: 'Case', title: `${c.brand} — ${c.title}`, sub: c.insight || '', d: dOf(c.district), href: 'campaign.html?id=' + c.id, read: 'read:campaign.html:' + c.id })),
    ...PRINCIPLES.map((p) => ({ id: 'principle:' + p.id, type: 'Nguyên lý', title: `${p.t} — ${p.vi}`, sub: p.one || '', d: dOf(p.d), href: 'principle.html?id=' + p.id, read: 'read:principle.html:' + p.id })),
    ...LESSONS.map((l) => ({ id: 'lesson:' + l.day, type: 'Bài hôm nay', title: l.t, sub: l.idea || '', d: dOf(l.d), href: 'lesson.html?day=' + l.day, read: 'read:lesson.html:' + l.day })),
  ];
  const rd = (a) => Lab.get('rd:' + a.id) || { p: 0, bm: false };
  const pct = (a) => (flag(a.read) ? Math.max(100, 0) : rd(a).p || 0);
  const day = () => new Date().toISOString().slice(0, 10);
  let tab = 'all', ftype = 'all', fd = 'all';

  const css = document.createElement('style');
  css.textContent = `
.tv{padding-block:clamp(30px,5vw,70px);border-top:var(--rule,1px solid rgba(120,84,50,.2))}
.tv h2{font-family:var(--serif,Georgia,serif);font-weight:400;font-size:clamp(1.8rem,3.4vw,2.6rem);margin:0 0 6px}
.tv__cap{max-width:60ch;opacity:.75;line-height:1.6;margin:0 0 18px}
.tv__tabs,.tv__chips{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 12px}
.tv__tabs button{border:0;background:none;padding:9px 14px;border-bottom:3px solid transparent;font:700 14px var(--sans,system-ui);cursor:pointer;color:inherit;opacity:.65}
.tv__tabs button[aria-selected="true"]{opacity:1;border-bottom-color:var(--accent,#B8502D);color:var(--accent,#B8502D)}
.tv__tabs em{font-style:normal;font-size:11px;margin-left:6px;padding:2px 7px;border-radius:99px;background:rgba(120,84,50,.12)}
.tv__chips button{border:1px solid rgba(120,84,50,.28);background:transparent;color:inherit;border-radius:999px;padding:6px 13px;font:600 12.5px var(--sans,system-ui);cursor:pointer}
.tv__chips button[aria-pressed="true"]{background:var(--ink,#2B1A11);color:#fff;border-color:var(--ink,#2B1A11)}
.tv__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px}
.tv__card{border:1px solid rgba(120,84,50,.2);background:rgba(255,252,246,.9);border-radius:18px;padding:16px;display:grid;gap:8px;align-content:start}
.tv__card .m{font:700 10.5px var(--sans,system-ui);letter-spacing:.1em;text-transform:uppercase;opacity:.55}
.tv__card a.t{font:500 1.12rem/1.3 var(--serif,Georgia,serif);color:inherit;text-decoration:none}
.tv__card a.t:hover{color:var(--accent,#B8502D)}
.tv__card p{margin:0;font-size:13.5px;line-height:1.55;opacity:.75;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.tv__bar{height:5px;border-radius:99px;background:rgba(120,84,50,.16);overflow:hidden}.tv__bar i{display:block;height:100%;background:var(--accent,#B8502D)}
.tv__row{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:12.5px}
.tv__bm{border:1.5px solid rgba(120,84,50,.3);background:#fff;border-radius:999px;padding:5px 12px;font:700 12.5px var(--sans,system-ui);cursor:pointer;color:inherit}
.tv__bm[aria-pressed="true"]{background:var(--accent,#B8502D);border-color:var(--accent,#B8502D);color:#fff}
.tv__note{border-left:3px solid var(--accent,#B8502D);padding:8px 0 8px 14px;margin:0 0 12px}
.tv__note b{display:block}.tv__note small{opacity:.6}.tv__note p{margin:4px 0 0;white-space:pre-wrap;font-size:14px;line-height:1.55}
.tv__sp{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-top:6px}
.tv__sp div{border:1px dashed rgba(120,84,50,.35);border-radius:16px;padding:14px;background:rgba(255,252,246,.7)}
.tv__sp div[data-ok="1"]{border-style:solid;border-color:#3d7a45;background:#f0f7f1}
.tv__sp b{font-family:var(--serif,Georgia,serif);font-weight:500;font-size:1.05rem;display:block}.tv__sp small{opacity:.7;display:block;margin-top:4px;line-height:1.5}
.tv__daily{margin:0 0 26px}`;
  document.head.appendChild(css);

  /* ---- thử thách hằng ngày xoay theo khu ---- */
  function dailyItem() {
    const di = Math.floor(Date.parse(day()) / 864e5), k = DKEY[di % DKEY.length];
    const pool = CHALLENGES.filter((c) => c.d === k);
    const c = pool.length ? pool[di % pool.length] : CHALLENGES[di % CHALLENGES.length];
    const ok = c.opts.findIndex((o) => o.ok);
    return { k, c, item: { q: c.q, ctx: c.brief, opts: c.opts.map((o) => o.t), a: ok, why: c.opts[ok].why } };
  }
  function streak() {
    let n = 0, d = new Date(); if (!Lab.get('daily:' + d.toISOString().slice(0, 10))) d = new Date(d - 864e5);
    while (Lab.get('daily:' + d.toISOString().slice(0, 10))) { n++; d = new Date(d - 864e5); }
    return n;
  }
  function paintDaily(el) {
    const { k, c, item } = dailyItem(), done = Lab.get('daily:' + day());
    el.innerHTML = `<div class="tv__row" style="margin-bottom:10px"><span class="m" style="font:700 11px var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--accent,#B8502D)">Thử thách hôm nay · ${esc(dname(k))}</span>
      <span class="m">Chuỗi ${streak()} ngày · ${done ? 'Đã làm hôm nay' : 'Chưa làm'}</span></div><div id="tv-q"></div>`;
    Lab.quiz(el.querySelector('#tv-q'), { id: 'daily:' + day(), tag: `Hằng ngày · ${c.kind}`, items: [item], xp: 6,
      onDone: () => { setTimeout(() => paintDaily(el), 50); paintAll(); } });
  }

  /* ---- thư viện ---- */
  function counts() {
    const bm = ART.filter((a) => rd(a).bm).length;
    const reading = ART.filter((a) => { const p = pct(a); return p > 0 && p < 100; }).length;
    const notes = (State.get().notes || []).filter((n) => n.kind === 'Ghi chú bài').length;
    return { all: ART.length, bm, reading, notes };
  }
  function list() {
    let a = ART.filter((x) => (ftype === 'all' || x.type === ftype) && (fd === 'all' || x.d === fd));
    if (tab === 'bm') a = a.filter((x) => rd(x).bm);
    if (tab === 'reading') a = a.filter((x) => { const p = pct(x); return p > 0 && p < 100; });
    return a;
  }
  function card(a) {
    const r = rd(a), p = pct(a);
    return `<article class="tv__card"><span class="m">${esc(a.type)} · ${esc(dname(a.d))}</span>
      <a class="t" href="${esc(a.href)}">${esc(a.title)}</a><p>${esc(a.sub)}</p>
      <div class="tv__bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>
      <div class="tv__row"><span>${p >= 100 ? '✓ Đã đọc' : p > 0 ? `Đã đọc ${p}%` : 'Chưa đọc'}${r.noted ? ` · ${r.noted} ghi chú` : ''}</span>
        <button type="button" class="tv__bm" data-id="${esc(a.id)}" aria-pressed="${!!r.bm}">${r.bm ? '🔖 Đã lưu' : '🔖 Lưu'}</button></div></article>`;
  }
  function paintLib() {
    const c = counts(), el = document.getElementById('tv-lib');
    let body;
    if (tab === 'notes') {
      const ns = (State.get().notes || []).filter((n) => n.kind === 'Ghi chú bài');
      body = ns.length ? ns.map((n) => `<div class="tv__note"><b>${n.href ? `<a href="${esc(n.href)}" style="color:inherit">${esc(n.t)}</a>` : esc(n.t)}</b><small>${esc(n.when || '')}</small><p>${esc(n.body)}</p></div>`).join('')
        : '<p class="tv__cap">Chưa có ghi chú nào. Mở một bài và bấm “Ghi chú” ở góc trái dưới.</p>';
    } else {
      const a = list();
      body = a.length ? `<div class="tv__grid">${a.map(card).join('')}</div>`
        : `<p class="tv__cap">${tab === 'bm' ? 'Chưa lưu bài nào. Bấm “Lưu” ở thẻ hoặc ngay trong bài.' : tab === 'reading' ? 'Không có bài nào đang đọc dở.' : 'Không có bài khớp bộ lọc.'}</p>`;
    }
    el.innerHTML = `<div class="tv__tabs" role="tablist" aria-label="Thư viện bài viết">${[['all', 'Tất cả', c.all], ['bm', 'Đã lưu', c.bm], ['reading', 'Đang đọc', c.reading], ['notes', 'Ghi chú', c.notes]]
        .map(([k, l, n]) => `<button type="button" role="tab" aria-selected="${k === tab}" data-tab="${k}">${l}<em>${n}</em></button>`).join('')}</div>
      ${tab === 'notes' ? '' : `<div class="tv__chips" role="group" aria-label="Loại bài">${['all', 'Case', 'Nguyên lý', 'Bài hôm nay'].map((t) => `<button type="button" aria-pressed="${ftype === t}" data-type="${t}">${t === 'all' ? 'Mọi loại' : t}</button>`).join('')}</div>
      <div class="tv__chips" role="group" aria-label="Khu">${[['all', 'Mọi khu'], ...DISTRICTS.map((d) => [d.key, d.vi])].map(([k, l]) => `<button type="button" aria-pressed="${fd === k}" data-d="${k}">${esc(l)}</button>`).join('')}</div>`}
      ${body}`;
    el.querySelectorAll('[data-tab]').forEach((b) => b.onclick = () => { tab = b.dataset.tab; paintLib(); });
    el.querySelectorAll('[data-type]').forEach((b) => b.onclick = () => { ftype = b.dataset.type; paintLib(); });
    el.querySelectorAll('[data-d]').forEach((b) => b.onclick = () => { fd = b.dataset.d; paintLib(); });
    el.querySelectorAll('.tv__bm').forEach((b) => b.onclick = () => {
      const a = ART.find((x) => x.id === b.dataset.id), r = rd(a);
      Lab.set('rd:' + a.id, { ...r, bm: !r.bm, title: a.title, href: a.href }); paintLib();
    });
  }

  /* ---- số đặc biệt: mở khoá khi đã đọc ≥ 3 bài của khu ---- */
  function paintSpecial(el) {
    el.innerHTML = DISTRICTS.map((d) => {
      const items = ART.filter((a) => a.d === d.key && a.type !== 'Bài hôm nay'), read = items.filter((a) => pct(a) >= 100).length, ok = read >= 3;
      const pick = items.filter((a) => a.type === 'Case').slice(0, 3);
      return `<div data-ok="${ok ? 1 : 0}"><b>${esc(d.vi)}</b>
        <small>${ok ? `Đã mở · lộ trình đọc ${pick.length} case của khu` : `Đọc thêm ${3 - read} bài của khu để mở (đã ${read}/3)`}</small>
        ${ok ? `<small>${pick.map((a) => `<a href="${esc(a.href)}">${esc(a.title.split(' — ')[0])}</a>`).join(' · ')}</small>` : ''}</div>`;
    }).join('');
  }
  function paintAll() { paintLib(); const sp = document.getElementById('tv-sp'); if (sp) paintSpecial(sp); }

  host.innerHTML = `<div class="wrap tv"><h2>Thư viện bài viết</h2>
    <p class="tv__cap">Case, nguyên lý và bài hôm nay ở một chỗ. Lưu để đọc sau, ghi chú ngay trong bài, và xem mình đã đọc tới đâu.</p>
    <div class="tv__daily" id="tv-daily"></div><div id="tv-lib"></div>
    <h2 style="margin-top:36px;font-size:1.5rem">Số đặc biệt theo khu</h2>
    <p class="tv__cap">Mở khi bạn đã đọc ít nhất ba bài thuộc khu đó.</p><div class="tv__sp" id="tv-sp"></div></div>`;
  paintDaily(document.getElementById('tv-daily'));
  paintAll();
  window.addEventListener('focus', paintAll);
  window.addEventListener('storage', paintAll);
})();
