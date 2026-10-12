/* Phần của KHUNG (app.html): menu avatar (hover), đổi giao diện, đăng xuất, hộp chat với quản trị, đo lượt xem trang.
   Chỉ nạp ở app.html nên chạy đúng một lần, không bị dựng lại khi đổi trang bên trong khung. */
const Social = (() => {
  const esc = (t) => String(t == null ? '' : t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  let me = null, chatOpen = false, pollT = null, unreadT = null, lastSig = '';

  async function call(path, opt = {}) {
    const r = await fetch('/api' + path, { credentials: 'same-origin', ...opt,
      headers: { 'x-thmc': '1', ...(opt.body ? { 'content-type': 'application/json' } : {}) } });
    if (!(r.headers.get('content-type') || '').includes('json')) throw new Error('no_api');
    const d = await r.json(); if (!r.ok) throw Object.assign(new Error(d.error || 'error'), { status: r.status });
    return d;
  }

  /* ---------- đo lường ---------- */
  function track(k, t) {
    try { fetch('/api/track', { method: 'POST', credentials: 'same-origin', keepalive: true,
      headers: { 'x-thmc': '1', 'content-type': 'application/json' }, body: JSON.stringify({ k, t: String(t || '').slice(0, 80) }) }).catch(() => {}); } catch (e) {}
  }

  /* ---------- giao diện ---------- */
  /* Một giao diện sáng duy nhất (art direction Atelier): không còn chế độ tối nửa vời. */
  const themeNow = () => 'ivory';
  function applyThemeTop(t) {
    const v = t === 'ivory' ? 'ivory' : '';
    document.documentElement.dataset.theme = v;
    try { const f = $('#frame'); if (f && f.contentDocument) f.contentDocument.documentElement.dataset.theme = v; } catch (e) {}
  }
  function setTheme(t) { S.set({ theme: t === 'ivory' ? 'ivory' : 'light' }); applyThemeTop(t); paintSeg(); }
  function paintSeg() {
    const t = themeNow();
    document.querySelectorAll('[data-theme-set]').forEach((b) => b.classList.toggle('on', b.dataset.themeSet === t));
  }

  /* ---------- CSS ---------- */
  const CSS = `
  .um{display:none;position:absolute;left:calc(100% + 10px);bottom:0;width:290px;padding:8px;border-radius:16px;z-index:70;
      background:#fff;color:#24160E;border:1px solid rgba(36,22,14,.14);box-shadow:0 18px 40px -12px rgba(0,0,0,.45)}
  .rail__me:hover .um,.rail__me:focus-within .um,.rail__me.open .um{display:block}
  .um::before{content:"";position:absolute;left:-14px;top:0;bottom:0;width:14px}
  .um a,.um button.um__i{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;padding:10px 12px;border:0;border-radius:10px;background:none;
      color:#24160E;font:500 14px/1.2 var(--sans,system-ui);text-decoration:none;cursor:pointer;text-align:left}
  .um a:hover,.um button.um__i:hover{background:rgba(36,22,14,.07)}
  .um svg{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none;opacity:.75}
  .um .um__row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;font:500 14px var(--sans,system-ui)}
  .um .um__seg{display:inline-flex;background:rgba(36,22,14,.08);border-radius:99px;padding:3px}
  .um .um__seg button{border:0;background:none;border-radius:99px;padding:5px 12px;font:700 12px var(--sans,system-ui);color:rgba(36,22,14,.6);cursor:pointer}
  .um .um__seg button.on{background:#fff;color:#24160E;box-shadow:0 1px 3px rgba(0,0,0,.18)}
  .um .um__seg button[disabled]{opacity:.45;cursor:not-allowed}
  .um hr{border:0;border-top:1px solid rgba(36,22,14,.1);margin:6px 4px}
  .um .um__out{color:#C0392B!important}
  .um .um__dot{margin-left:auto;background:#E0344F;color:#fff;border-radius:99px;font:700 11px/1 var(--sans);padding:3px 6px}
  @media(max-width:860px){.um{left:0;right:0;width:auto;bottom:calc(100% + 8px)}.um::before{display:none}}

  .chat__fab{position:fixed;right:18px;bottom:18px;z-index:55;width:52px;height:52px;border-radius:50%;border:0;cursor:pointer;
      background:var(--terra,#C85A32);color:#fff;box-shadow:0 10px 26px -6px rgba(0,0,0,.55);display:grid;place-items:center}
  .chat__fab svg{width:24px;height:24px;stroke:#fff;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .chat__fab .chat__badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:99px;background:#E0344F;color:#fff;font:700 11px/20px var(--sans);text-align:center;padding:0 5px}
  .chat__panel{position:fixed;right:18px;bottom:80px;z-index:56;width:min(360px,calc(100vw - 36px));height:min(480px,70vh);
      display:none;flex-direction:column;border-radius:18px;overflow:hidden;background:#FDF9F3;color:#24160E;border:1px solid rgba(36,22,14,.14);box-shadow:0 22px 50px -14px rgba(0,0,0,.6)}
  .chat__panel.on{display:flex}
  .chat__head{padding:14px 16px;background:#24160E;color:#F9F4EB;display:flex;justify-content:space-between;align-items:center;font:600 15px var(--sans)}
  .chat__head small{display:block;font:400 12px var(--sans);opacity:.7}
  .chat__head button{background:none;border:0;color:inherit;cursor:pointer;font-size:20px;line-height:1}
  .chat__list{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px;background:#F6EFE6}
  .chat__m{max-width:82%;padding:9px 12px;border-radius:14px;font:400 14px/1.45 var(--sans);white-space:pre-wrap;word-break:break-word}
  .chat__m.u{align-self:flex-end;background:#24160E;color:#F9F4EB;border-bottom-right-radius:4px}
  .chat__m.a{align-self:flex-start;background:#fff;border:1px solid rgba(36,22,14,.1);border-bottom-left-radius:4px}
  .chat__m time{display:block;font-size:10.5px;opacity:.55;margin-top:3px}
  .chat__empty{margin:auto;text-align:center;font:400 13.5px/1.5 var(--sans);color:rgba(36,22,14,.6);padding:0 18px}
  .chat__form{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(36,22,14,.1);background:#FDF9F3}
  .chat__form textarea{flex:1;resize:none;border:1px solid rgba(36,22,14,.18);border-radius:12px;padding:9px 11px;font:400 14px/1.4 var(--sans);height:42px;max-height:96px;background:#fff;color:#24160E}
  .chat__form button{border:0;border-radius:12px;padding:0 14px;background:var(--terra,#C85A32);color:#fff;font:700 13px var(--sans);cursor:pointer}
  .chat__form button[disabled]{opacity:.5}`;

  /* ---------- menu avatar ---------- */
  function buildMenu() {
    const host = $('.rail__me'); if (!host || $('#um')) return;
    const card = $('#me');
    const chev = card.querySelector('.chev');
    if (chev) chev.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); host.classList.toggle('open'); });
    const um = document.createElement('div');
    um.id = 'um'; um.className = 'um'; um.setAttribute('role', 'menu');
    const I = (d) => `<svg viewBox="0 0 24 24">${d}</svg>`;
    um.innerHTML = `
      <a data-go href="tai-khoan.html" role="menuitem">${I('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>')}Hồ sơ cá nhân</a>
      <a data-go href="tai-khoan.html?moi=1" role="menuitem">${I('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M16 4.5a3.5 3.5 0 010 7M18 20a6 6 0 00-2.5-4.9"/>')}Bạn bè &amp; Kết nối</a>
      <a data-go href="shop.html" role="menuitem">${I('<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v11H4z"/><path d="M9 20v-6h6v6"/>')}Cửa hàng RPG</a>
      <a data-go href="bang-xep-hang.html" role="menuitem">${I('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0z"/>')}Bảng xếp hạng</a>
      <button type="button" class="um__i" id="umChat" role="menuitem">${I('<path d="M21 12a8 8 0 01-11.5 7.2L4 20l1-4.3A8 8 0 1121 12z"/>')}Nhắn tin với quản trị<span class="um__dot" id="umDot" hidden></span></button>
      <a id="umAdmin" href="quan-tri.html" role="menuitem" hidden>${I('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>')}Trang quản trị</a>
      <hr>
      <div class="um__row"><span>Ngôn ngữ</span><span class="um__seg"><button class="on" type="button">VI</button><button type="button" disabled title="Bản tiếng Anh sắp có">EN</button></span></div>
      <hr>
      <button type="button" class="um__i um__out" id="umOut" role="menuitem">${I('<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>')}Đăng xuất</button>`;
    host.appendChild(um);
    um.addEventListener('click', (e) => e.stopPropagation());
    um.querySelectorAll('[data-theme-set]').forEach((b) => { b.onclick = () => setTheme(b.dataset.themeSet); });
    $('#umChat').onclick = () => { host.classList.remove('open'); toggleChat(true); };
    $('#umOut').onclick = signOut;
    document.addEventListener('click', () => host.classList.remove('open'));
    paintSeg();
  }

  async function signOut() {
    try { await call('/auth/logout', { method: 'POST', body: '{}' }); } catch (e) {}
    try { localStorage.removeItem('thmc.user'); } catch (e) {}
    location.href = 'dang-nhap.html';
  }

  /* ---------- chat ---------- */
  function buildChat() {
    if ($('#chatFab')) return;
    const fab = document.createElement('button');
    fab.id = 'chatFab'; fab.className = 'chat__fab'; fab.type = 'button'; fab.setAttribute('aria-label', 'Nhắn tin với quản trị');
    fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 01-11.5 7.2L4 20l1-4.3A8 8 0 1121 12z"/></svg><span class="chat__badge" id="chatBadge" hidden></span>';
    fab.onclick = () => toggleChat();
    const p = document.createElement('div');
    p.id = 'chatPanel'; p.className = 'chat__panel'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Chat với quản trị');
    p.innerHTML = `
      <div class="chat__head"><div>Nhắn với quản trị<small>Thường trả lời trong ngày</small></div><button type="button" id="chatX" aria-label="Đóng">×</button></div>
      <div class="chat__list" id="chatList"></div>
      <form class="chat__form" id="chatForm"><textarea id="chatIn" maxlength="1000" placeholder="Nhập tin nhắn…" rows="1"></textarea><button type="submit">Gửi</button></form>`;
    document.body.append(fab, p);
    $('#chatX').onclick = () => toggleChat(false);
    const ta = $('#chatIn');
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#chatForm').requestSubmit(); } });
    $('#chatForm').onsubmit = async (e) => {
      e.preventDefault();
      const v = ta.value.trim(); if (!v) return;
      const btn = e.target.querySelector('button'); btn.disabled = true;
      try { await call('/chat', { method: 'POST', body: JSON.stringify({ body: v }) }); ta.value = ''; await loadChat(true); }
      catch (err) { alert(err.status === 429 ? 'Bạn gửi hơi nhanh, đợi một chút nhé.' : 'Chưa gửi được tin nhắn. Thử lại sau.'); }
      btn.disabled = false; ta.focus();
    };
    unreadT = setInterval(pollUnread, 30000); pollUnread();
  }
  const hhmm = (t) => new Date(t).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
  async function loadChat(force) {
    let d; try { d = await call('/chat'); } catch (e) { return; }
    const sig = d.messages.map((m) => m.id).join(',');
    if (!force && sig === lastSig) return;
    lastSig = sig;
    const el = $('#chatList');
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    el.innerHTML = d.messages.length ? d.messages.map((m) =>
      `<div class="chat__m ${m.from === 'user' ? 'u' : 'a'}">${esc(m.body)}<time>${hhmm(m.at)}</time></div>`).join('')
      : '<div class="chat__empty">Chào bạn! Cần hỗ trợ, góp ý hay báo lỗi — cứ nhắn ở đây, quản trị sẽ trả lời tại chính khung này.</div>';
    if (force || atBottom) el.scrollTop = el.scrollHeight;
    setBadge(0);
  }
  function setBadge(n) {
    const b = $('#chatBadge'), d = $('#umDot'), bn = $('#bellN');
    if (bn) { bn.hidden = !n; bn.textContent = n > 9 ? '9+' : n; }
    if (b) { b.hidden = !n; b.textContent = n > 9 ? '9+' : n; }
    if (d) { d.hidden = !n; d.textContent = n > 9 ? '9+' : n; }
  }
  async function pollUnread() {
    if (chatOpen || document.hidden) return;
    try { const d = await call('/chat/unread'); setBadge(d.unread || 0); } catch (e) {}
  }
  function toggleChat(force) {
    chatOpen = typeof force === 'boolean' ? force : !chatOpen;
    $('#chatPanel').classList.toggle('on', chatOpen);
    clearInterval(pollT);
    if (chatOpen) { lastSig = ''; loadChat(true); pollT = setInterval(() => { if (!document.hidden) loadChat(false); }, 5000); setTimeout(() => $('#chatIn').focus(), 50); }
  }

  /* ---------- khởi tạo ---------- */
  function init(u) {
    me = u;
    if (!document.getElementById('socialCss')) {
      const st = document.createElement('style'); st.id = 'socialCss'; st.textContent = CSS; document.head.appendChild(st);
    }
    applyThemeTop(themeNow());
    buildMenu(); buildChat();
    const av = $('#av');
    if (av && u && u.avatar) av.innerHTML = `<img src="${esc(u.avatar)}" alt="" referrerpolicy="no-referrer">`;
    if (u && u.is_admin) { const a = $('#umAdmin'); a.hidden = false; a.target = '_top'; }
    const bell = $('#bell'); if (bell) bell.onclick = () => toggleChat(true);
    call('/wallet').then((w) => { const c = $('#coinN'); if (c) c.textContent = Number(w.coins || 0).toLocaleString('vi-VN'); }).catch(() => {});
  }
  function page(file) { track('page', file); }
  return { init, page, track };
})();
