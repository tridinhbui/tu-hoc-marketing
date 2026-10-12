/* Thành phần xã hội dùng trong các trang học (chạy trong khung): ảnh đại diện, thẻ mời bạn, bảng xếp hạng gọn, chuỗi ngày.
   Mọi dữ liệu lấy từ API thật; không có API thì từng thẻ tự im lặng, không làm hỏng trang. */
const SocialUI = (() => {
  const esc = (t) => String(t == null ? '' : t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  async function get(path) {
    const r = await fetch('/api' + path, { credentials: 'same-origin', headers: { 'x-thmc': '1' } });
    if (!r.ok || !(r.headers.get('content-type') || '').includes('json')) throw new Error('api_' + r.status);
    return r.json();
  }
  const fmtN = (n) => Number(n || 0).toLocaleString('vi-VN');

  /* Ảnh Google nếu có, không thì chữ cái đầu. */
  function avatar(u, size = 36) {
    const name = (u && u.name) || '?';
    const st = `width:${size}px;height:${size}px;border-radius:50%;flex:none;object-fit:cover;`;
    if (u && u.avatar) return `<img src="${esc(u.avatar)}" alt="" referrerpolicy="no-referrer" style="${st}background:var(--ink-12)">`;
    return `<span aria-hidden="true" style="${st}display:inline-grid;place-items:center;background:var(--terra,#C85A32);color:#fff;font-weight:700;font-size:${Math.round(size * .42)}px">${esc(name.trim()[0] || 'M').toUpperCase()}</span>`;
  }

  const card = (inner, extra = '') => `<div style="background:var(--card,var(--bg-2));border:1px solid var(--ink-12);border-radius:18px;padding:20px;${extra}">${inner}</div>`;
  const label = (t) => `<span style="font:700 11.5px/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-50)">${t}</span>`;

  /* Chuỗi ngày + XP + cấp */
  async function streakCard(el) {
    let d; try { d = await get('/me/stats'); } catch (e) { return; }
    const s = d.stats || {}, lv = d.levels || [];
    const cur = lv[(s.level || 1) - 1] ?? 0, next = lv[s.level] ?? null;
    const pct = next ? Math.max(0, Math.min(100, Math.round(((s.total_xp - cur) / (next - cur)) * 100))) : 100;
    el.innerHTML = card(`
      ${label('Chuỗi ngày & XP')}
      <div style="display:flex;gap:22px;align-items:flex-end;margin:12px 0 14px">
        <div><b style="font:700 2.2rem/1 var(--serif);color:var(--gold)">${fmtN(s.streak)}</b><div class="small" style="color:var(--ink-50)">ngày liên tiếp</div></div>
        <div><b style="font:700 2.2rem/1 var(--serif)">${fmtN(s.total_xp)}</b><div class="small" style="color:var(--ink-50)">XP · cấp ${s.level || 1}</div></div>
      </div>
      <div style="height:8px;border-radius:99px;background:var(--ink-12);overflow:hidden"><i style="display:block;height:100%;width:${pct}%;background:var(--gold)"></i></div>
      <div class="small" style="margin-top:8px;color:var(--ink-50)">${next ? `Còn ${fmtN(Math.max(0, next - s.total_xp))} XP lên cấp ${(s.level || 1) + 1}` : 'Bạn đã đạt cấp cao nhất'} · kỷ lục ${fmtN(s.streak_longest)} ngày</div>`);
  }

  /* Bảng xếp hạng tuần gọn: top 5 + hạng của mình. Số hạng là chữ serif lớn, không có hộp. */
  async function boardCard(el, by = 'xp') {
    el.innerHTML = '<p class="at-state" role="status">Đang tải bảng xếp hạng…</p>';
    let d; try { d = await get('/leaderboard?by=' + by); } catch (e) {
      el.innerHTML = '<p class="at-state">Chưa tải được bảng xếp hạng. <button type="button" data-retry>Thử lại</button></p>';
      el.querySelector('[data-retry]').onclick = () => boardCard(el, by);
      return;
    }
    const rows = d.rows.slice(0, 5), unit = by === 'streak' ? 'ngày' : by === 'cases' ? 'case' : 'XP';
    el.innerHTML = `
      <ol class="at-board">
        ${rows.map((r) => `<li ${r.me ? 'data-me' : ''}>
          <span class="at-board__r">${r.rank}</span>${avatar({ name: r.name, avatar: r.avatar }, 30)}
          <span class="at-board__n">${esc(r.name)}${r.me ? ' (bạn)' : ''}</span>
          <span class="at-board__x">${fmtN(by === 'streak' ? r.streak : by === 'cases' ? r.cases : r.xp)} ${unit}</span></li>`).join('') || '<li class="at-board__n" style="grid-column:1/-1;color:var(--at-ink-3)">Tuần này chưa ai có điểm. Học một bài là có tên ở đây.</li>'}
      </ol>
      ${d.me ? `<p class="sm" style="font-size:12.5px;color:var(--at-ink-3);margin:12px 0 0">Bạn đang hạng <b style="color:var(--at-ink)">${d.me.rank}</b> với ${fmtN(by === 'streak' ? d.me.streak : by === 'cases' ? d.me.cases : d.me.xp)} ${unit} tuần này.</p>` : ''}`;
  }

  /* Mời bạn học cùng */
  async function inviteCard(el) {
    let d; try { d = await get('/me/invite'); } catch (e) { return; }
    const share = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(d.link);
    el.innerHTML = `<section class="at-blk">
      <div class="at-blk__h"><h3 class="at-blk__t">Mời bạn <em>học cùng</em></h3></div>
      <p>Bạn nhận <b>+${d.xp.inviter} XP</b>, bạn bè nhận <b>+${d.xp.invitee} XP</b> khi họ hoàn thành bài học đầu tiên.</p>
      <div class="at-copy">
        <input readonly value="${esc(d.link)}" aria-label="Link mời">
        <button type="button" data-copy>Chép</button>
      </div>
      <p style="margin-top:14px"><a class="at-link" href="${share}" target="_blank" rel="noopener">Chia sẻ lên Facebook</a></p>
      <p class="sm">Đã mời ${fmtN(d.invited)} người · ${fmtN(d.rewarded)} người đã nhận thưởng</p></section>`;
    const btn = el.querySelector('[data-copy]');
    btn.onclick = async () => {
      try { await navigator.clipboard.writeText(d.link); } catch (e) { el.querySelector('input').select(); document.execCommand && document.execCommand('copy'); }
      btn.textContent = 'Đã chép ✓'; setTimeout(() => { btn.textContent = 'Chép'; }, 1800);
    };
  }

  /* Thẻ học viên: con dấu cấp, XP, tiến độ lên cấp và chuỗi ngày (7 chấm). Một vật sưu tầm, không phải widget KPI. */
  async function profileCard(el, user) {
    let d; try { d = await get('/me/stats'); } catch (e) { d = null; }
    const s = d ? d.stats : null, lv = d ? d.levels : [];
    const xp = s ? s.total_xp : 0, level = s ? s.level : 1, streak = s ? s.streak : 0;
    const cur = lv[level - 1] ?? 0, next = lv[level] ?? null;
    const pct = next ? Math.max(0, Math.min(100, Math.round(((xp - cur) / (next - cur)) * 100))) : 100;
    const dots = Array.from({ length: 7 }, (_, i) => `<i ${i < Math.min(7, streak) ? 'class="on"' : ''}></i>`).join('');
    el.innerHTML = `<div class="at-pass">
      <div class="at-pass-av">${avatar(user, 78)}<span class="at-seal" aria-hidden="true">${level}</span></div>
      <div class="at-pass__who">
        <p class="at-kick">Học viên · cấp ${level}</p>
        <p class="at-pass__xp">${fmtN(xp)}<small>XP</small></p>
      </div>
      <div class="at-pass__line" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div>
      <p class="at-pass__sm"><span>${next ? `Còn ${fmtN(Math.max(0, next - xp))} XP lên cấp ${level + 1}` : 'Bạn đã đạt cấp cao nhất'}</span><b>${pct}%</b></p>
      <div class="at-streak"><span class="at-streak__n">${fmtN(streak)}</span><small>ngày<br>liên tiếp</small><span class="at-streak__dots" aria-hidden="true">${dots}</span></div>
    </div>`;
  }

  /* Nhiệm vụ ngày: lấy từ máy chủ; đạt điều kiện thì nhận thưởng */
  async function questsPanel(el, goHref, onChange) {
    let d; try { d = await get('/me/stats'); } catch (e) { el.innerHTML = '<p class="at-state">Chưa tải được nhiệm vụ. <button type="button" data-retry>Thử lại</button></p>'; el.querySelector('[data-retry]').onclick = () => questsPanel(el, goHref, onChange); return; }
    const done = d.quests.filter((q) => q.claimed).length;
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin:14px 0 4px"><h3 class="at-blk__t" style="margin:0">Nhiệm vụ <em>hôm nay</em></h3>
        <span class="small" style="color:var(--at-ink-3)">${done}/${d.quests.length} đã nhận</span></div>
      <div>${d.quests.map((q, i) => `
        <div class="at-quest" data-s="${q.claimed ? 'done' : q.done ? 'claim' : 'todo'}">
          <span class="at-quest__n" aria-hidden="true">${q.claimed ? '✓' : i + 1}</span>
          <div style="min-width:0"><b>${esc(q.t)}</b><span>${q.have}/${q.need} · +${q.xp} XP</span></div>
          ${q.claimed ? '<span class="at-quest__ok">đã nhận</span>'
            : q.done ? `<button type="button" class="at-btn" data-claim="${esc(q.id)}">Nhận thưởng</button>`
            : `<a class="at-link" href="${esc(goHref)}">Làm ngay →</a>`}
        </div>`).join('') || '<p class="small" style="color:var(--at-ink-3)">Hôm nay chưa có nhiệm vụ.</p>'}</div>`;
    el.querySelectorAll('[data-claim]').forEach((b) => { b.onclick = async () => {
      b.disabled = true;
      try {
        const r = await fetch('/api/quests/claim', { method: 'POST', credentials: 'same-origin', headers: { 'x-thmc': '1', 'content-type': 'application/json' }, body: JSON.stringify({ quest_id: b.dataset.claim }) });
        if (!r.ok) throw new Error('claim');
      } catch (e) { b.disabled = false; return; }
      if (onChange) onChange();
      questsPanel(el, goHref, onChange);
    }; });
  }

  return { avatar, streakCard, boardCard, inviteCard, profileCard, questsPanel, esc };
})();
