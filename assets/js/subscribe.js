/* Ô để lại email. Gọi cùng origin /api/subscribe — khi chưa deploy Worker thì
   sẽ 404 và ô báo lỗi thật, không giả vờ đã nhận. */
function subscribeBox(source, opts = {}) {
  const id = 'sub-' + Math.random().toString(36).slice(2, 7);
  const html = `
  <section class="subbox" id="${id}" data-reveal>
    <div class="subbox__l">
      <span class="label label--accent">${opts.kicker || 'Mỗi tuần một quan sát'}</span>
      <h3>${opts.title || 'Nhận bài mới qua email'}</h3>
      <p>${opts.body || 'Một email mỗi tuần: bài học mới, một case đáng mổ, và thứ tôi nhìn thấy ngoài đường. Bỏ theo dõi bằng một cú bấm.'}</p>
    </div>
    <form class="subbox__f" novalidate>
      <input class="field" type="email" name="email" required placeholder="email@cua-ban.com" autocomplete="email">
      <button class="btn" type="submit">Đăng ký</button>
      <p class="subbox__msg" role="status"></p>
    </form>
  </section>`;
  queueMicrotask(() => {
    const box = document.getElementById(id); if (!box) return;
    const form = box.querySelector('form'), msg = box.querySelector('.subbox__msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = 'Email trông chưa đúng.'; return; }
      const btn = form.querySelector('button'); btn.disabled = true; msg.textContent = 'Đang gửi…';
      try {
        const r = await fetch('/api/subscribe', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email, source }),
        });
        if (r.ok) { form.innerHTML = '<p class="subbox__msg">Xong. Hẹn gặp trong hộp thư của bạn.</p>'; return; }
        const d = await r.json().catch(() => ({}));
        msg.textContent = d.error === 'rate_limited' ? 'Thử lại sau một lát nhé.' : 'Chưa gửi được. Thử lại sau.';
      } catch { msg.textContent = 'Chưa gửi được — có thể do mạng.'; }
      btn.disabled = false;
    });
  });
  return html;
}
