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

  const card = (inner, extra = '') => `<div style="background:var(--bg-2);border:1px solid var(--ink-12);border-radius:18px;padding:20px;${extra}">${inner}</div>`;
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
        <div><b style="font:700 2.2rem/1 var(--serif);color:var(--gold)">${fmtN(s.streak_current)}</b><div class="small" style="color:var(--ink-50)">ngày liên tiếp</div></div>
        <div><b style="font:700 2.2rem/1 var(--serif)">${fmtN(s.total_xp)}</b><div class="small" style="color:var(--ink-50)">XP · cấp ${s.level || 1}</div></div>
      </div>
      <div style="height:8px;border-radius:99px;background:var(--ink-12);overflow:hidden"><i style="display:block;height:100%;width:${pct}%;background:var(--gold)"></i></div>
      <div class="small" style="margin-top:8px;color:var(--ink-50)">${next ? `Còn ${fmtN(Math.max(0, next - s.total_xp))} XP lên cấp ${(s.level || 1) + 1}` : 'Bạn đã đạt cấp cao nhất'} · kỷ lục ${fmtN(s.streak_longest)} ngày</div>`);
  }

  /* Bảng xếp hạng tuần gọn: top 5 + hạng của mình */
  async function boardCard(el, by = 'xp') {
    let d; try { d = await get('/leaderboard?by=' + by); } catch (e) { return; }
    const rows = d.rows.slice(0, 5);
    el.innerHTML = card(`
      <div style="display:flex;justify-content:space-between;align-items:center">${label('Bảng xếp hạng tuần')}
        <a href="bang-xep-hang.html" style="font-size:13px;color:var(--terra)">Xem tất cả →</a></div>
      <ol style="list-style:none;margin:12px 0 0;padding:0;display:grid;gap:8px">
        ${rows.map((r) => `<li style="display:flex;align-items:center;gap:10px;${r.me ? 'font-weight:700' : ''}">
          <span style="width:20px;text-align:center;color:var(--ink-50)">${r.rank}</span>${avatar({ name: r.name, avatar: r.avatar }, 28)}
          <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.name)}${r.me ? ' (bạn)' : ''}</span>
          <span style="color:var(--gold)">${fmtN(r.xp)} XP</span></li>`).join('') || '<li class="small" style="color:var(--ink-50)">Tuần này chưa ai có điểm. Học một bài là có tên ở đây.</li>'}
      </ol>
      ${d.me ? `<div class="small" style="margin-top:12px;color:var(--ink-50)">Bạn đang hạng <b style="color:var(--ink)">${d.me.rank}</b> với ${fmtN(d.me.xp)} XP tuần này.</div>` : ''}`);
  }

  /* Mời bạn học cùng */
  async function inviteCard(el) {
    let d; try { d = await get('/me/invite'); } catch (e) { return; }
    const share = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(d.link);
    el.innerHTML = card(`
      ${label('Mời bạn học cùng')}
      <p style="margin:10px 0 14px;font-size:14px;color:var(--ink-70)">Bạn nhận <b style="color:var(--gold)">+${d.xp.inviter} XP</b>, bạn bè nhận <b style="color:var(--gold)">+${d.xp.invitee} XP</b> khi họ hoàn thành bài học đầu tiên.</p>
      <div style="display:flex;gap:8px">
        <input readonly value="${esc(d.link)}" aria-label="Link mời" style="flex:1;min-width:0;padding:10px 12px;border-radius:10px;border:1px solid var(--ink-12);background:var(--bg);color:var(--ink);font:13px var(--sans)">
        <button type="button" data-copy style="padding:0 14px;border-radius:10px;border:1px solid var(--ink-12);background:var(--bg);color:var(--ink);cursor:pointer;font:600 13px var(--sans)">Chép</button>
      </div>
      <a href="${share}" target="_blank" rel="noopener" style="display:block;margin-top:10px;text-align:center;padding:11px;border-radius:12px;background:#1877F2;color:#fff;text-decoration:none;font:600 14px var(--sans)">Chia sẻ lên Facebook</a>
      <div class="small" style="margin-top:12px;color:var(--ink-50)">Đã mời ${fmtN(d.invited)} người · ${fmtN(d.rewarded)} người đã nhận thưởng</div>`);
    const btn = el.querySelector('[data-copy]');
    btn.onclick = async () => {
      try { await navigator.clipboard.writeText(d.link); } catch (e) { el.querySelector('input').select(); document.execCommand && document.execCommand('copy'); }
      btn.textContent = 'Đã chép ✓'; setTimeout(() => { btn.textContent = 'Chép'; }, 1800);
    };
  }

  return { avatar, streakCard, boardCard, inviteCard, esc };
})();
