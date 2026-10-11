/* LAB — bài tập nhỏ dùng chung cho các trang tham khảo (Thế giới, Tạp chí).
   Cần core.js (State, esc). Kết quả lưu ở State.work.lab (được app đồng bộ như phần còn lại của sổ tay);
   XP ghi thẳng vào sổ XP của app như markRead: một lần cho mỗi bài, tối đa 30 XP bài tập mỗi ngày. */
const Lab = (() => {
  const day = () => new Date().toISOString().slice(0, 10);
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);

  function get(id) { return ((State.get().work || {}).lab || {})[id] || null; }
  function set(id, v) { const s = State.get(), w = s.work || {}; State.set({ work: { ...w, lab: { ...(w.lab || {}), [id]: { ...v, t: Date.now() } } } }); }

  /* Cộng XP một lần cho khoá `key`. Trả về số XP thật sự cộng. */
  function xp(key, x) {
    try {
      const APP = 'thmc.v1', app = JSON.parse(localStorage.getItem(APP) || '{}');
      app.xpl = app.xpl || {}; app.flags = app.flags || {};
      const fk = 'lab:' + key; if (app.flags[fk]) return 0;
      const cap = 'labcap@' + day(), used = (app.xpl[cap] || {}).x || 0, got = Math.max(0, Math.min(x, 30 - used));
      app.flags[fk] = day();
      if (got > 0) {
        app.xpl[cap] = { x: used + got, d: day() };
        app.xp = Object.values(app.xpl).reduce((n, e) => n + (e.x || 0), 0);
        app.log = [...(app.log || []).slice(-400), { d: day(), k: 'quiz', r: fk, x: got, t: Date.now() }];
      }
      localStorage.setItem(APP, JSON.stringify(app));
      if (window.top !== window.self) window.parent.postMessage({ thmc: 'sync' }, location.origin);
      return got;
    } catch (e) { return 0; }
  }

  function css() {
    if (document.getElementById('lab-css')) return;
    const s = document.createElement('style'); s.id = 'lab-css';
    s.textContent = `
.lab{background:rgba(255,252,246,.92);color:var(--ink,#2B1A11);border:1px solid rgba(120,84,50,.16);border-radius:20px;padding:clamp(16px,2.4vw,24px);box-shadow:0 14px 34px -24px rgba(92,56,28,.4)}
.lab__top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 10px}
.lab__tag{font:700 10.5px/1 var(--sans,system-ui);letter-spacing:.12em;text-transform:uppercase;color:var(--accent,#B8502D)}
.lab__n{font:600 12px var(--sans,system-ui);opacity:.6}
.lab__q{font-family:var(--serif,Georgia,serif);font-weight:400;font-size:clamp(1.15rem,2vw,1.45rem);line-height:1.25;margin:6px 0 4px}
.lab__ctx{font-size:14.5px;line-height:1.6;opacity:.8;margin:6px 0 4px}
.lab__opts{display:grid;gap:8px;margin-top:12px}
.lab__opts--chips{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.lab__o{display:block;width:100%;text-align:left;border:1.5px solid rgba(120,84,50,.22);background:#fff;color:inherit;border-radius:14px;padding:11px 14px;font:500 14.5px/1.45 var(--sans,system-ui);cursor:pointer;transition:border-color .15s,background .15s}
.lab__o:hover:not([disabled]){border-color:var(--c,#B8502D)}
.lab__o[disabled]{cursor:default}
.lab__o i{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--c,#B8502D);margin-right:8px}
.lab__o[data-s=right]{border-color:#3d8a4f;background:#e8f3ea}
.lab__o[data-s=wrong]{border-color:#c0392b;background:#fbeae7}
.lab__why{margin:12px 0 0;padding:12px 14px;border-radius:12px;background:rgba(184,80,45,.07);font-size:14px;line-height:1.6}
.lab__why b{display:block;margin-bottom:2px}
.lab__act{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;align-items:center}
.lab__btn{border:0;background:var(--accent,#B8502D);color:#fff;border-radius:999px;padding:10px 20px;font:700 14px var(--sans,system-ui);cursor:pointer;text-decoration:none;display:inline-block}
.lab__btn--ghost{background:transparent;color:inherit;border:1.5px solid rgba(120,84,50,.3)}
.lab__bar{display:flex;gap:5px;margin:2px 0 10px}
.lab__bar i{flex:1;height:5px;border-radius:9px;background:rgba(120,84,50,.14)}
.lab__bar i.ok{background:#3d8a4f}.lab__bar i.bad{background:#c0392b}.lab__bar i.now{background:var(--accent,#B8502D)}
.lab__done{text-align:center;padding:6px 0}
.lab__done b{font-family:var(--serif,Georgia,serif);font-weight:400;font-size:2.6rem;display:block;line-height:1.1}
.lab__done p{margin:8px auto 0;max-width:46ch;line-height:1.6;opacity:.8}
.lab__field{width:100%;min-height:84px;border:1.5px solid rgba(120,84,50,.22);border-radius:14px;background:#fff;padding:12px 14px;font:500 14.5px/1.55 var(--sans,system-ui);color:inherit;resize:vertical}
`;
    document.head.appendChild(s);
  }

  /* cfg: { id, tag, title?, items:[{q, ctx?, opts:[str|{t,c}], a:int, why, link?:{href,label}}], chips?, xp?, onDone?(score,total) }
     Hiện từng câu: chọn → hiện đúng/sai và lời giải → "Câu kế". Xong thì lưu điểm cao nhất và cộng XP một lần. */
  function quiz(el, cfg) {
    css();
    const items = cfg.items; let i = 0, ok = 0; const res = [];
    const best = get(cfg.id);
    const head = () => `<div class="lab__top"><span class="lab__tag">${esc(cfg.tag || 'Bài tập')}</span><span class="lab__n">${best ? `Tốt nhất ${best.best}/${best.total}` : 'Chưa làm'}</span></div>`;
    const bar = () => `<div class="lab__bar">${items.map((_, k) => `<i class="${k < res.length ? (res[k] ? 'ok' : 'bad') : k === i ? 'now' : ''}"></i>`).join('')}</div>`;
    function step() {
      const it = items[i];
      const order = shuffle(it.opts.map((_, k) => k));
      el.innerHTML = `<div class="lab">${head()}${bar()}
        <h3 class="lab__q">${esc(it.q)}</h3>${it.ctx ? `<p class="lab__ctx">${esc(it.ctx)}</p>` : ''}
        <div class="lab__opts ${cfg.chips ? 'lab__opts--chips' : ''}">${order.map((k) => {
          const o = typeof it.opts[k] === 'string' ? { t: it.opts[k] } : it.opts[k];
          return `<button type="button" class="lab__o" data-k="${k}" style="${o.c ? `--c:${o.c}` : ''}">${o.c ? '<i></i>' : ''}${esc(o.t)}</button>`;
        }).join('')}</div><div id="lab-fb"></div></div>`;
      el.querySelectorAll('.lab__o').forEach((b) => b.onclick = () => {
        const k = +b.dataset.k, good = k === it.a;
        if (good) ok++; res.push(good);
        el.querySelectorAll('.lab__o').forEach((x) => { x.disabled = true; const n = +x.dataset.k; x.dataset.s = n === it.a ? 'right' : n === k ? 'wrong' : ''; });
        const last = i === items.length - 1;
        el.querySelector('.lab__bar').outerHTML = bar();
        el.querySelector('#lab-fb').innerHTML = `<div class="lab__why"><b>${good ? 'Đúng.' : 'Chưa đúng.'}</b>${esc(it.why || '')}</div>
          <div class="lab__act">${it.link ? `<a class="lab__btn lab__btn--ghost" href="${esc(it.link.href)}">${esc(it.link.label)}</a>` : ''}
          <button type="button" class="lab__btn" id="lab-next">${last ? 'Xem kết quả' : 'Câu kế →'}</button></div>`;
        el.querySelector('#lab-next').onclick = () => { if (last) finish(); else { i++; step(); } };
      });
    }
    function finish() {
      const prev = get(cfg.id), total = items.length;
      set(cfg.id, { best: Math.max(prev ? prev.best : 0, ok), total });
      let got = 0;
      if (cfg.xp) got = xp(cfg.id, cfg.xp);
      if (typeof State.touch === 'function') State.touch();
      if (cfg.onDone) cfg.onDone(ok, total);
      const msg = ok === total ? 'Trọn vẹn.' : ok >= total / 2 ? 'Khá. Đọc lại lời giải của những câu trượt.' : 'Chưa sao — phần có giá trị nằm ở lời giải. Làm lại để chắc hơn.';
      el.innerHTML = `<div class="lab">${head()}<div class="lab__done"><b>${ok}/${total}</b><p>${msg}${got ? ` +${got} XP.` : ''}</p></div>
        <div class="lab__act" style="justify-content:center"><button type="button" class="lab__btn" id="lab-again">Làm lại</button></div></div>`;
      el.querySelector('#lab-again').onclick = () => { if (cfg.fresh) { const n = cfg.fresh(); if (n) { items.length = 0; items.push(...n); } } i = 0; ok = 0; res.length = 0; step(); };
    }
    step();
  }

  return { quiz, xp, get, set, shuffle, pick, css };
})();
