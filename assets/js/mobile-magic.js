/* MOBILE MAGIC — thành phần và chuyển động riêng cho điện thoại.
   Bụi vàng, quầng sáng và dải chữ chạy chạy ở mọi kích thước; phần vuốt ngang / CTA dính đáy / gợn nước chỉ < 1000px. Không đổi nội dung; nếu JS lỗi, trang vẫn đọc được như cũ. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var buzz = function (ms) { try { if (navigator.vibrate) navigator.vibrate(ms || 6); } catch (e) {} };
  var hero = $('.hero');
  if (!hero) return;

  /* ---------- 1. bụi vàng trôi trong hero ---------- */
  var cv = null;
  if (!reduce) {
    cv = document.createElement('canvas');
    cv.className = 'mm-dust'; cv.setAttribute('aria-hidden', 'true');
    hero.appendChild(cv);
    var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), ps = [], running = false, vis = true;
    var size = function () {
      var r = hero.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var spawn = function (fresh) {
      return { x: Math.random() * W, y: fresh ? Math.random() * H : H + 10, r: .6 + Math.random() * 1.8,
        vy: .12 + Math.random() * .42, vx: (Math.random() - .5) * .18, ph: Math.random() * 6.28, sp: .6 + Math.random() * 1.4,
        hue: Math.random() < .3 ? '255,214,160' : '238,106,48' };
    };
    size();
    for (var i = 0; i < 36; i++) ps.push(spawn(true));
    var t0 = 0;
    var tick = function (t) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      var dt = Math.min(40, t - t0 || 16) / 16; t0 = t;
      for (var k = 0; k < ps.length; k++) {
        var p = ps[k];
        p.y -= p.vy * dt; p.x += (p.vx + Math.sin(t / 1400 + p.ph) * .12) * dt;
        if (p.y < -10 || p.x < -10 || p.x > W + 10) { ps[k] = spawn(false); continue; }
        var a = .25 + .55 * (.5 + .5 * Math.sin(t / 600 * p.sp + p.ph));
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, 'rgba(' + p.hue + ',' + a.toFixed(2) + ')'); g.addColorStop(1, 'rgba(' + p.hue + ',0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(tick);
    };
    var go = function () { if (!running && vis && !document.hidden) { running = true; t0 = 0; requestAnimationFrame(tick); } };
    var stop = function () { running = false; };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { vis = e[0].isIntersecting; vis ? go() : stop(); }, { threshold: 0 }).observe(hero);
    }
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : go(); });
    window.addEventListener('resize', size);
    go();
  }

  /* ---------- 2. quầng sáng thở + ảnh nghiêng theo ngón tay / con quay ---------- */
  var ph = $('.h-photo');
  if (ph) {
    var glow = document.createElement('i'); glow.className = 'mm-glow'; glow.setAttribute('aria-hidden', 'true');
    ph.insertBefore(glow, ph.firstChild);
  }
  var title = $('.h-title');
  var tilt = function (nx, ny) { /* -1..1 */
    hero.style.setProperty('--mm-ry', (nx * 7).toFixed(2) + 'deg');
    hero.style.setProperty('--mm-rx', (-ny * 5).toFixed(2) + 'deg');
    hero.style.setProperty('--mm-tx', (nx * -5).toFixed(1) + 'px');
    hero.style.setProperty('--mm-ty', (ny * -3).toFixed(1) + 'px');
  };
  if (!reduce) {
    hero.addEventListener('touchmove', function (e) {
      var t = e.touches[0], r = hero.getBoundingClientRect();
      tilt(Math.max(-1, Math.min(1, (t.clientX - r.left) / r.width * 2 - 1)), Math.max(-1, Math.min(1, (t.clientY - r.top) / r.height * 2 - 1)));
    }, { passive: true });
    var rel = function () { tilt(0, 0); };
    hero.addEventListener('touchend', rel, { passive: true });
    hero.addEventListener('touchcancel', rel, { passive: true });
    /* Android và trình duyệt không cần xin quyền: nghiêng điện thoại thì ảnh nghiêng theo */
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      var last = 0;
      window.addEventListener('deviceorientation', function (e) {
        var n = performance.now(); if (n - last < 50 || e.gamma == null) return; last = n;
        if (scrollY > hero.offsetHeight) return;
        tilt(Math.max(-1, Math.min(1, e.gamma / 28)), Math.max(-1, Math.min(1, ((e.beta || 0) - 50) / 28)));
      }, { passive: true });
    }
  }

  /* ---------- 3. dải chữ chạy giữa Lời mở và Hồ sơ case ---------- */
  var cases = $('#cases');
  if (cases) {
    var words = ['Insight', 'Positioning', 'Creative Brief', 'Storytelling', 'Growth', 'Campaign', 'Brand', 'Behavior'];
    var row = function (arr) {
      var s = arr.map(function (w, i) { return '<span>' + w + '</span><i>✦</i>'; }).join('');
      return '<div class="mm-tick__row">' + s + s + '</div>';
    };
    var tk = document.createElement('div');
    tk.className = 'mm-tick';
    tk.innerHTML = row(words) + row(words.slice().reverse());
    var tw = document.createElement('div');
    tw.className = 'mm-tickwrap'; tw.setAttribute('aria-hidden', 'true');
    tw.appendChild(tk);
    cases.parentNode.insertBefore(tw, cases);
  }

  if (window.innerWidth >= 1000) return;

  /* ---------- 4. case: vuốt ngang, thẻ giữa phóng to, chấm chỉ vị trí ---------- */
  var stage = $('.cases-stage'), cards = $$('.cs');
  if (stage && cards.length > 1) {
    var rail = document.createElement('div');
    rail.className = 'mm-rail'; rail.setAttribute('role', 'group'); rail.setAttribute('aria-label', 'Các case — vuốt ngang để xem');
    var anchor = cards[0];
    anchor.parentNode.insertBefore(rail, anchor);
    cards.forEach(function (c) { c.classList.add('in'); rail.appendChild(c); });
    var quote = $('.cases-quote', stage);
    var dots = document.createElement('div'); dots.className = 'mm-dots';
    cards.forEach(function (c, i) {
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Case ' + (i + 1));
      b.addEventListener('click', function () { buzz(5); c.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' }); });
      dots.appendChild(b);
    });
    var hint = document.createElement('p'); hint.className = 'mm-hint'; hint.setAttribute('aria-hidden', 'true');
    hint.innerHTML = 'Vuốt để xem <svg viewBox="0 0 22 12"><path d="M1 6h19M15 1l5 5-5 5"/></svg>';
    rail.insertAdjacentElement('afterend', dots);
    dots.insertAdjacentElement('afterend', hint);
    var mark = function () {
      var c = rail.getBoundingClientRect(), mid = c.left + c.width / 2, best = 0, bd = 1e9;
      cards.forEach(function (el, i) {
        var r = el.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bd) { bd = d; best = i; }
      });
      cards.forEach(function (el, i) { el.classList.toggle('is-on', i === best); });
      $$('button', dots).forEach(function (b, i) { b.classList.toggle('on', i === best); });
      return best;
    };
    var cur = -1, scrolled = false, raf = 0;
    rail.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0; var b = mark();
        if (b !== cur) { if (cur !== -1) buzz(4); cur = b; }
        if (!scrolled && rail.scrollLeft > 24) { scrolled = true; hint.classList.add('off'); }
      });
    }, { passive: true });
    window.addEventListener('resize', mark);
    mark();
  }

  /* ---------- 5. mục kỹ năng / bậc thang đang ở giữa màn hình thì sáng lên ---------- */
  if ('IntersectionObserver' in window) {
    var focusIO = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { e.target.classList.toggle('is-focus', e.isIntersecting); });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    $$('.sk, .rung').forEach(function (el) { focusIO.observe(el); });
  }

  /* ---------- 6. CTA dính đáy với nhẫn tiến độ ---------- */
  var cta = document.createElement('a');
  cta.className = 'mm-cta mm-rip-host'; cta.href = 'dang-nhap.html';
  cta.innerHTML = '<span class="mm-cta__ring" aria-hidden="true"><svg viewBox="0 0 34 34"><circle cx="17" cy="17" r="15"/><circle cx="17" cy="17" r="15"/></svg><b>→</b></span><span>Bắt đầu miễn phí</span>';
  document.body.appendChild(cta);
  var heroCta = $('.h-cta'), foot = $('.foot'), st = $('.st');
  var ctaTick = function () {
    var h = document.documentElement, max = h.scrollHeight - innerHeight;
    cta.style.setProperty('--cp', max > 0 ? Math.min(1, scrollY / max).toFixed(3) : 0);
    var pastHero = heroCta ? heroCta.getBoundingClientRect().bottom < 0 : scrollY > 500;
    var nearEnd = (foot && foot.getBoundingClientRect().top < innerHeight - 40) || (st && st.getBoundingClientRect().top < innerHeight * .8 && st.getBoundingClientRect().bottom > 0);
    cta.classList.toggle('on', pastHero && !nearEnd);
  };
  var cr = 0;
  window.addEventListener('scroll', function () { if (cr) return; cr = requestAnimationFrame(function () { cr = 0; ctaTick(); }); }, { passive: true });
  window.addEventListener('resize', ctaTick);
  ctaTick();

  /* ---------- 7. gợn nước + rung nhẹ khi chạm ---------- */
  var ripSel = '.btn, .mm-cta, .tabs button, .go, .nav-cta';
  $$(ripSel).forEach(function (el) { el.classList.add('mm-rip-host'); });
  document.addEventListener('pointerdown', function (e) {
    var el = e.target.closest && e.target.closest(ripSel);
    if (!el) return;
    buzz(6);
    if (reduce) return;
    var r = el.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2, s = document.createElement('span');
    s.className = 'mm-rip';
    s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
    el.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 700);
  }, { passive: true });
})();
