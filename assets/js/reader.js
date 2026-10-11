/* TRÌNH ĐỌC — thanh nhỏ ở góc trang bài viết (campaign, nguyên lý, bài hôm nay):
   đánh dấu (bookmark), ghi chú theo bài, tiến độ đọc theo cuộn. Cần core.js (State, esc, toast) và lab.js (Lab).
   Dữ liệu: Lab 'rd:<loại>:<id>' = {p: % đã cuộn tới, bm: bool, title, href, t}; ghi chú vào State.notes (kind 'Ghi chú bài'). */
(function () {
  if (typeof Lab === 'undefined' || typeof State === 'undefined') return;
  const file = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  if (!/^(campaign|principle|lesson|brand)$/.test(file)) return;
  const q = new URLSearchParams(location.search);
  const id = window.__ID__ || q.get('id') || q.get('day') || '';
  if (!id) return;
  const key = 'rd:' + file + ':' + id, href = file + '.html?' + (file === 'lesson' ? 'day=' : 'id=') + id;
  const rec = () => Lab.get(key) || { p: 0, bm: false };
  const title = () => (document.querySelector('h1') || {}).innerText || document.title.replace(/\s*—.*$/, '');
  let p = rec().p || 0, dirty = false;

  const css = document.createElement('style');
  css.textContent = `
.rd{position:fixed;left:14px;bottom:14px;z-index:60;display:flex;gap:6px;align-items:center;background:rgba(255,252,246,.96);border:1px solid rgba(120,84,50,.22);
  border-radius:999px;padding:6px 8px;box-shadow:0 14px 30px -14px rgba(60,30,10,.5);font:600 13px var(--sans,system-ui);color:#2B1A11}
.rd button{border:0;background:none;border-radius:999px;padding:7px 12px;font:inherit;cursor:pointer;color:inherit;display:inline-flex;gap:6px;align-items:center}
.rd button:hover{background:rgba(184,80,45,.1)}.rd button[aria-pressed="true"]{background:#B8502D;color:#fff}
.rd__p{display:inline-flex;align-items:center;gap:8px;padding:0 10px 0 6px}
.rd__bar{width:64px;height:6px;border-radius:99px;background:rgba(120,84,50,.18);overflow:hidden}.rd__bar i{display:block;height:100%;background:#B8502D;width:0;transition:width .3s}
.rd__note{position:fixed;left:14px;bottom:70px;z-index:61;width:min(340px,calc(100vw - 28px));background:#FFFCF6;border:1px solid rgba(120,84,50,.25);border-radius:18px;padding:14px;
  box-shadow:0 24px 50px -20px rgba(60,30,10,.55);font:500 14px var(--sans,system-ui);color:#2B1A11}
.rd__note[hidden]{display:none}
.rd__note textarea{width:100%;min-height:92px;border:1.5px solid rgba(120,84,50,.25);border-radius:12px;padding:10px;font:inherit;margin:8px 0;box-sizing:border-box}
.rd__note .row{display:flex;gap:8px;justify-content:flex-end}
.rd__note .go{border:0;background:#B8502D;color:#fff;border-radius:999px;padding:8px 16px;font:700 13px var(--sans);cursor:pointer}
.rd__note .no{border:1.5px solid rgba(120,84,50,.3);background:none;border-radius:999px;padding:8px 14px;font:600 13px var(--sans);cursor:pointer}
@media(max-width:560px){.rd{left:8px;right:8px;justify-content:space-between}.rd__bar{width:44px}}`;
  document.head.appendChild(css);

  const bar = document.createElement('div'); bar.className = 'rd'; bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'Công cụ đọc');
  bar.innerHTML = `<button type="button" id="rd-bm" aria-pressed="${!!rec().bm}">${'🔖'} <span>${rec().bm ? 'Đã lưu' : 'Lưu'}</span></button>
    <button type="button" id="rd-nt">✎ <span>Ghi chú</span></button>
    <span class="rd__p" aria-live="polite"><span class="rd__bar"><i id="rd-i" style="width:${p}%"></i></span><span id="rd-n">${p}%</span></span>`;
  const note = document.createElement('div'); note.className = 'rd__note'; note.hidden = true;
  note.innerHTML = `<b>Ghi chú cho bài này</b><textarea id="rd-ta" aria-label="Ghi chú" placeholder="Điều bạn rút ra, câu hỏi, ví dụ của riêng bạn…"></textarea>
    <div class="row"><button type="button" class="no" id="rd-x">Đóng</button><button type="button" class="go" id="rd-sv">Lưu ghi chú</button></div>`;
  document.body.appendChild(bar); document.body.appendChild(note);

  function save(extra) { Lab.set(key, { ...rec(), p, title: title(), href, ...(extra || {}) }); }
  bar.querySelector('#rd-bm').onclick = (e) => {
    const on = !rec().bm; save({ bm: on });
    e.currentTarget.setAttribute('aria-pressed', String(on)); e.currentTarget.querySelector('span').textContent = on ? 'Đã lưu' : 'Lưu';
    if (typeof toast === 'function') toast(on ? 'Đã lưu bài vào Tạp chí' : 'Đã bỏ lưu');
  };
  bar.querySelector('#rd-nt').onclick = () => { note.hidden = !note.hidden; if (!note.hidden) note.querySelector('textarea').focus(); };
  note.querySelector('#rd-x').onclick = () => { note.hidden = true; };
  note.querySelector('#rd-sv').onclick = () => {
    const v = note.querySelector('textarea').value.trim(); if (!v) return;
    const s = State.get(), notes = s.notes || [];
    notes.unshift({ t: 'Ghi chú · ' + title(), body: v, when: new Date().toISOString().slice(0, 10), kind: 'Ghi chú bài', href });
    State.set({ notes }); save({ noted: (rec().noted || 0) + 1 });
    note.querySelector('textarea').value = ''; note.hidden = true;
    if (typeof toast === 'function') toast('Đã lưu ghi chú vào sổ tay');
  };

  /* tiến độ đọc: vị trí cuộn lớn nhất đã tới; ghi tối đa mỗi 1,5 giây */
  let t = null;
  function onScroll() {
    const de = document.documentElement, h = de.scrollHeight - de.clientHeight;
    const v = h <= 0 ? 100 : Math.min(100, Math.round((de.scrollTop || document.body.scrollTop) / h * 100));
    if (v > p) { p = v; dirty = true; bar.querySelector('#rd-i').style.width = p + '%'; bar.querySelector('#rd-n').textContent = p + '%'; }
    if (dirty && !t) t = setTimeout(() => { t = null; if (dirty) { dirty = false; save(); } }, 1500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pagehide', () => { if (dirty) save(); });
  setTimeout(onScroll, 600);
})();
