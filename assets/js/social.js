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
  const themeNow = () => (S.get().theme === 'ivory' ? 'ivory' : 'dark');
  function applyThemeTop(t) {
    const v = t === 'ivory' ? 'ivory' : '';
    document.documentElement.dataset.theme = v;
    try { const f = $('#frame'); if (f && f.contentDocument) f.contentDocument.documentElement.dataset.theme = v; } catch (e) {}
    document.documentElement.style.setProperty('--rail-bg', t === 'ivory' ? '#EFE5D8' : '#1A130F');
  }
  function setTheme(t) { S.set({ theme: t === 'ivory' ? 'ivory' : 'light' }); applyThemeTop(t); paintSeg(); }
  function paintSeg() {
    const t = themeNow();
    document.querySelectorAll('[data-theme-set]').forEach((b) => b.classList.toggle('on', b.dataset.themeSet === t));
  }

  /* ---------- CSS ---------- */
  const CSS = `
  .rail__me{position:relative}
  .um{display:none;position:absolute;left:0;right:0;bottom:calc(100% - 6px);padding:8px;border-radius:16px;z-index:70;
      background:var(--paper-card,#FDF9F3);color:#24160E;border:1px solid rgba(36,22,14,.14);box-shadow:0 18px 40px -12px rgba(0,0,0,.55)}
  .rail__me:hover .um,.rail__me:focus-within .um,.rail__me.open .um{display:block}
  .um::after{content:"";position:absolute;left:0;right:0;bottom:-14px;height:14px}
  .um a,.um button.um__i{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;padding:10px 12px;border:0;border-radius:10px;background:none;
      color:#24160E;font:500 14px/1.2 var(--sans,system-ui);text-decoration:none;cursor:pointer;text-align:left}
  .um a:hover,.um button.um__i:hover{background:rgba(36,22,14,.07)}
  .um .um__row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;font:500 14px var(--sans,system-ui)}
  .um .um__seg{display:inline-flex;background:rgba(36,22,14,.08);border-radius:99px;padding:3px}
  .um .um__seg button{border:0;background:none;border-radius:99px;padding:5px 12px;font:700 12px var(--sans,system-ui);color:rgba(36,22,14,.6);cursor:pointer}
  .um .um__seg button.on{background:#fff;color:#24160E;box-shadow:0 1px 3px rgba(0,0,0,.18)}
  .um .um__seg button[disabled]{opacity:.45;cursor:not-allowed}
  .um hr{border:0;border-top:1px solid rgba(36,22,14,.1);margin:6px 4px}
  .um .um__out{color:#C0392B!important}
  .um .um__dot{margin-left:auto;background:#E0344F;color:#fff;border-radius:99px;font:700 11px/1 var(--sans);padding:3px 6px}
  .rail__av img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}
  .rail__tg{margin-left:auto;display:none;border:0;background:none;color:inherit;cursor:pointer;padding:6px}
  @media(hover:none){.rail__tg{display:block}.rail__me:hover .um{display:none}.rail__me.open .um{display:block}}

  .chat__fab{position:fixed;right:calc(var(--side-w,248px) + 18px);bottom:18px;z-index:55;width:52px;height:52px;border-radius:50%;border:0;cursor:pointer;
      background:var(--terra,#C85A32);color:#fff;box-shadow:0 10px 26px -6px rgba(0,0,0,.55);display:grid;place-items:center}
  .chat__fab svg{width:24px;height:24px;stroke:#fff;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .chat__fab .chat__badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:99px;background:#E0344F;color:#fff;font:700 11px/20px var(--sans);text-align:center;padding:0 5px}
  .chat__panel{position:fixed;right:calc(var(--side-w,248px) + 18px);bottom:80px;z-index:56;width:min(360px,calc(100vw - var(--side-w,248px) - 36px));height:min(480px,70vh);
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
  .chat__form button[disabled]{opacity:.5}
  @media(max-width:860px){.chat__fab{right:16px}.chat__panel{right:8px;width:calc(100vw - 16px)}}
  html[data-theme="ivory"] .rail{background:var(--rail-bg,#EFE5D8)!important;color:#24160E!important;border-left-color:rgba(36,22,14,.12)!important}
  html[data-theme="ivory"] .rail__logo,html[data-theme="ivory"] .rail__card{color:#24160E!important}
  html[data-theme="ivory"] .rail__nav a{color:rgba(36,22,14,.75)}
  html[data-theme="ivory"] .rail__nav a:hover{background:rgba(36,22,14,.07);color:#24160E}
  html[data-theme="ivory"] .rail__nav a[aria-current="page"]{color:#fff}
  html[data-theme="ivory"] .rail__sub a{color:rgba(36,22,14,.62)}
  html[data-theme="ivory"] .rail__sm{color:rgba(36,22,14,.62)}
  html[data-theme="ivory"] .rail__card{background:rgba(36,22,14,.05)!important;border-color:rgba(36,22,14,.12)!important}
  html[data-theme="ivory"],html[data-theme="ivory"] body,html[data-theme="ivory"] .stage,html[data-theme="ivory"] .stage iframe{background:#F7F0E6!important}`;

  /* ---------- menu avatar ---------- */
  function buildMenu() {
    const host = $('.rail__me'); if (!host || $('#um')) return;
    const card = $('#me');
    const tg = document.createElement('button');
    tg.className = 'rail__tg'; tg.type = 'button'; tg.setAttribute('aria-label', 'Mở menu tài khoản'); tg.textContent = '⌄';
    tg.onclick = (e) => { e.preventDefault(); e.stopPropagation(); host.classList.toggle('open'); };
    card.querySelector('.rail__who').appendChild(tg);
    const um = document.createElement('div');
    um.id = 'um'; um.className = 'um'; um.setAttribute('role', 'menu');
    um.innerHTML = `
      <a data-go href="tai-khoan.html" role="menuitem">Hồ sơ cá nhân</a>
      <a data-go href="tai-khoan.html?moi=1" role="menuitem">Bạn bè &amp; Mời bạn học cùng</a>
      <a data-go href="bang-xep-hang.html" role="menuitem">Bảng xếp hạng</a>
      <button type="button" class="um__i" id="umChat" role="menuitem">Nhắn tin với quản trị<span class="um__dot" id="umDot" hidden></span></button>
      <a id="umAdmin" href="quan-tri.html" role="menuitem" hidden>Trang quản trị</a>
      <hr>
      <div class="um__row"><span>Ngôn ngữ</span><span class="um__seg"><button class="on" type="button">VI</button><button type="button" disabled title="Bản tiếng Anh sắp có">EN</button></span></div>
      <div class="um__row"><span>Giao diện</span><span class="um__seg"><button type="button" data-theme-set="ivory">Sáng</button><button type="button" data-theme-set="dark">Tối</button></span></div>
      <hr>
      <button type="button" class="um__i um__out" id="umOut" role="menuitem">Đăng xuất</button>`;
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
    const b = $('#chatBadge'), d = $('#umDot');
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
    if (u && u.is_admin) $('#umAdmin').hidden = false;
  }
  function page(file) { track('page', file); }
  return { init, page, track };
})();
