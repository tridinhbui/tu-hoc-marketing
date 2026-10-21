/* Trang chọn lối vào (hub) dùng chung: Hub.render({ key, kicker, title, sub, cards:[{ id, href, title, desc, meta?, cta, alt?, art }] })
   · Mỗi thẻ: hình minh hoạ thu nhỏ (art: chuỗi HTML từ Hub.art.*), một dòng mô tả, đúng một nút.
   · "Lần trước": nhớ thẻ người học chọn gần nhất cho từng hub (localStorage, chỉ là tiện ích, lỗi thì bỏ qua). */
(function(){
  const esc = (t) => String(t == null ? '' : t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const CLOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const get = (k) => { try { return localStorage.getItem('thmc.hub.' + k); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem('thmc.hub.' + k, v); } catch (e) {} };

  const art = {
    /* đường đi qua các chặng, nút "on" là chỗ đang đứng */
    path(labels, on = 0, tabs) {
      const n = labels.length, W = 520, H = 150, xs = labels.map((_, i) => 34 + i * (W - 68) / (n - 1)), ys = labels.map((_, i) => (i % 2 ? 46 : 104));
      let d = `M${xs[0]} ${ys[0]}`; for (let i = 1; i < n; i++) { const mx = (xs[i - 1] + xs[i]) / 2; d += ` C${mx} ${ys[i - 1]} ${mx} ${ys[i]} ${xs[i]} ${ys[i]}`; }
      const nodes = labels.map((_, i) => `<circle class="${i === on ? 'on' : ''}" cx="${xs[i]}" cy="${ys[i]}" r="${i === on ? 18 : 15}"/><text class="${i === on ? 'on' : ''}" x="${xs[i]}" y="${ys[i]}">${i + 1}</text>`).join('');
      return (tabs ? `<div class="ha-tabs">${tabs.map((t, i) => `<span class="${i ? '' : 'on'}">${esc(t)}</span>`).join('')}</div>` : '') +
        `<svg class="ha-path" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="bg" d="${d}"/><path class="ln" d="${d}"/>${nodes}</svg>` +
        `<div class="ha-cap"><b>Chặng ${on + 1} · ${esc(labels[on])}</b>${esc(labels.slice(on + 1, on + 3).join(' → '))}${labels.length > on + 3 ? ' → …' : ''}</div>`;
    },
    /* chọn một vùng nghề + 4 bước sẵn sàng */
    career(chips, on = 0) {
      return `<div class="ha-chips">${chips.map((c, i) => `<span class="${i === on ? 'on' : ''}">${esc(c)}</span>`).join('')}</div>
        <div class="ha-steps"><b class="on">1</b><i class="on"></i><b>2</b><i></i><b>3</b><i></i><b>4</b></div>
        <div class="ha-steplab"><span>Nền tảng</span><span>Kỹ năng nghề</span><span>Tình huống thật</span><span>Sẵn sàng</span></div>`;
    },
    quiz(q, opts, ok) { return `<div class="ha-q">${esc(q)}</div>${opts.map((o, i) => `<div class="ha-opt ${i === ok ? 'ok' : ''}">${esc(o)}</div>`).join('')}`; },
    stages(n = 6, done = 0) {
      return `<div class="ha-badges">${Array.from({ length: n }, (_, i) => `<span class="${i < done ? 'on' : i === done ? '' : 'lk'}">${String(i + 1).padStart(2, '0')}</span>`).join('')}</div>
        <div class="ha-cap"><b>15 câu · 25 phút · cần 12/15</b>Qua đề chặng nào thì mở chặng sau. Đã vững rồi thì thi luôn, không phải học lại.</div>`;
    },
    kingdom() {
      return `<div class="ha-boss"><span>Boss Rò Phễu</span><span>72/100</span></div><div class="ha-bar"><i></i></div>
        <div class="ha-chips"><span class="on">Ngân sách</span><span>Chọn tệp</span><span>Kể chuyện</span><span>Lịch nội dung</span></div>`;
    },
    tiles(list) { return `<div class="ha-tiles">${list.map(([b, t, c]) => `<div class="ha-tile" style="background:${c}"><span>${esc(t)}</span><b>${esc(b)}</b></div>`).join('')}</div>`; },
    note(label, text) { return `<div class="ha-note"><small>${esc(label)}</small>${esc(text)}</div>`; },
    timer(t, q) { return `<div class="ha-timer"><b>${esc(t)}</b><span class="ha-sub">đồng hồ đang chạy</span></div><div class="ha-cap"><b>${esc(q)}</b>Mở số liệu theo câu hỏi, chấm tự động.</div>`; },
    kpis(rows) { return `<div class="ha-kpis">${rows.map(([k, v, d]) => `<div class="ha-kpi"><small>${esc(k)}</small><b>${esc(v)}</b>${d ? `<em>${esc(d)}</em>` : ''}</div>`).join('')}</div>`; },
    chips(list, on = 0) { return `<div class="ha-chips">${list.map((c, i) => `<span class="${i === on ? 'on' : ''}">${esc(c)}</span>`).join('')}</div>`; },
    formula(html) { return `<div class="ha-formula">${html}</div>`; },
  };

  function render(o) {
    const last = get(o.key);
    const el = document.getElementById('app') || document.querySelector('main');
    el.innerHTML = `<section class="hub" aria-labelledby="hubT">
      <p class="hub__k">${esc(o.kicker)}</p>
      <h1 class="hub__t" id="hubT">${o.title}</h1>
      ${o.sub ? `<p class="hub__p">${esc(o.sub)}</p>` : ''}
      <div class="hub__list">${o.cards.map((c) => `<article class="hcard" data-id="${esc(c.id)}">
        <div class="hcard__art ${c.dark ? 'ha-dark' : ''}" aria-hidden="true">${c.art || ''}</div>
        <div class="hcard__body">
          ${last === c.id ? `<span class="hcard__last">${CLOCK}Lần trước</span>` : ''}
          <h2>${esc(c.title)}</h2>
          <p>${esc(c.desc)}</p>
          ${c.meta ? `<div class="hcard__meta">${esc(c.meta)}</div>` : ''}
          <a class="hcard__go" href="${esc(c.href)}" data-hub="${esc(c.id)}">${esc(c.cta)} ${ARROW}</a>
          ${c.alt ? `<a class="hcard__alt" href="${esc(c.alt[1])}" data-hub="${esc(c.id)}">${esc(c.alt[0])}</a>` : ''}
        </div></article>`).join('')}</div>
    </section>`;
    el.addEventListener('click', (e) => { const a = e.target.closest('a[data-hub]'); if (a) put(o.key, a.dataset.hub); });
  }
  window.Hub = { render, art };
})();
