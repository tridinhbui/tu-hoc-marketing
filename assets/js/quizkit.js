/* Bộ hiển thị đề dùng chung cho các trang chấm ở server (World Boss, Đấu trường, Xếp lớp).
   Đề nhận từ server KHÔNG có đáp án; trang chỉ gom lựa chọn rồi gửi lên để server chấm.
   Chỉ có câu có đáp án duy nhất: trắc nghiệm (chọn một) và điền số. */
const QK = {
  render(box, items) {
    box.innerHTML = items.map((it, n) => `
      <div class="qk" data-q="${escH(it.id)}" style="border-top:1px solid var(--ink-12);padding:16px 0">
        <p class="mono" style="margin:0 0 6px">Câu ${n + 1} / ${items.length}</p>
        ${it.ctx ? `<p style="margin:0 0 8px">${escH(it.ctx)}</p>` : ''}
        ${it.rows ? `<div class="scroll"><table class="t" style="margin:0 0 10px"><tbody>${it.rows.map((r) => `<tr><td>${escH(r[0])}</td><td class="n">${escH(r[1])}</td></tr>`).join('')}</tbody></table></div>` : ''}
        <p style="margin:0 0 10px;font-weight:600">${escH(it.stem)}</p>
        ${it.type === 'calc'
          ? `<label class="row" style="gap:8px"><input class="field" inputmode="decimal" data-calc style="max-width:200px" aria-label="Đáp án"><span class="mono">${escH(it.unit || '')}</span></label>`
          : `<div role="radiogroup">${(it.options || []).map((o) => `<button type="button" class="qk__o" data-k="${escH(o.k)}" aria-pressed="false"
              style="display:block;width:100%;text-align:left;border:1px solid var(--ink-12);background:transparent;border-radius:8px;padding:10px 12px;margin-top:8px;cursor:pointer;font:inherit;color:inherit">${escH(o.t)}</button>`).join('')}</div>`}
      </div>`).join('');
    box.querySelectorAll('.qk__o').forEach((b) => b.onclick = () => {
      b.parentElement.querySelectorAll('.qk__o').forEach((x) => { x.setAttribute('aria-pressed', x === b); x.style.borderColor = x === b ? 'var(--ink)' : 'var(--ink-12)'; x.style.fontWeight = x === b ? '600' : '400'; });
    });
  },
  answers(box) {
    const out = {};
    box.querySelectorAll('.qk').forEach((q) => {
      const c = q.querySelector('[data-calc]');
      if (c) { const n = parseNum(c.value); if (Number.isFinite(n)) out[q.dataset.q] = n; }
      else { const p = q.querySelector('.qk__o[aria-pressed="true"]'); if (p) out[q.dataset.q] = p.dataset.k; }
    });
    return out;
  },
  /* Sau khi server chấm: tô đúng/sai và hiện lời giải của đúng phương án đã chọn. */
  mark(box, detail) {
    for (const d of detail || []) {
      const q = box.querySelector(`.qk[data-q="${CSS.escape(d.id)}"]`); if (!q) continue;
      q.querySelectorAll('button,input').forEach((x) => x.disabled = true);
      if (d.answer !== undefined && q.querySelector('.qk__o')) {
        q.querySelectorAll('.qk__o').forEach((x) => { if (x.dataset.k === d.answer) { x.style.borderColor = 'var(--ok)'; x.style.background = 'rgba(92,107,30,.08)'; }
          else if (x.getAttribute('aria-pressed') === 'true') { x.style.borderColor = 'var(--red)'; x.style.textDecoration = 'line-through'; } });
      }
      const note = d.correct ? (d.explanation || 'Đúng.') : (d.option_feedback || d.explanation || (d.answer !== undefined ? `Đáp án: ${fmt(d.answer)} ${d.unit || ''}` : 'Chưa đúng.'));
      q.insertAdjacentHTML('beforeend', `<p class="small" style="margin:10px 0 0;color:${d.correct ? 'var(--ok)' : 'var(--red)'}">${d.correct ? '✓' : '✗'} ${escH(note)}</p>`);
    }
  },
};
/* Trang cần tài khoản: trả về người dùng, hoặc vẽ thông báo đăng nhập / chưa có máy chủ. */
async function needLogin(app, what) {
  const u = await account();
  if (API.on === false) { app.innerHTML = `<section class="section"><span class="mono mono--red">Chưa bật</span><h1 class="h2" style="margin:12px 0">${what} cần máy chủ.</h1><p class="muted">Bản bạn đang xem chỉ có phần tĩnh.</p></section>`; return null; }
  if (!u && !(await canLogin())) { app.innerHTML = `<section class="section"><span class="mono mono--red">Chưa mở</span><h1 class="h2" style="margin:12px 0">${what} sẽ mở khi đăng nhập được bật.</h1>
    <p class="muted">Tính năng này lưu kết quả ở máy chủ nên cần tài khoản. Trong lúc chờ, mọi bài học, quiz, case và đề thi vượt chặng vẫn dùng được.</p><a class="btn" style="margin-top:14px" href="hoc.html">Về trang Hôm nay</a></section>`; return null; }
  if (!u) { app.innerHTML = `<section class="section"><span class="mono mono--red">Cần đăng nhập</span><h1 class="h2" style="margin:12px 0">${what} cần tài khoản.</h1>
    <p class="muted">Kết quả, xu và XP được chấm và lưu ở máy chủ.</p><a class="btn" style="margin-top:14px" href="tai-khoan.html?next=${encodeURIComponent(location.pathname.slice(1) + location.search)}">Đăng nhập</a></section>`; return null; }
  return u;
}
