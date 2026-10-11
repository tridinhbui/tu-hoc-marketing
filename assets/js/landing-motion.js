/* Landing: mọi thứ hiện dần theo nhịp cuộn. Không sửa markup — script tự gắn data-fx vào đúng phần tử.
   Ba lớp chuyển động: (1) hiện ra khi chạm khung nhìn, (2) gắn chặt vào tiến độ cuộn (parallax, phóng, trôi),
   (3) phản hồi con trỏ (vệt sáng, nút hút, nghiêng sân khấu). Tắt hẳn khi người dùng chọn giảm chuyển động. */
(function () {
  'use strict';
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- tách tiêu đề theo <br> thành các dòng có mặt nạ ---- */
  function splitLines(el) {
    if (!el || el.dataset.split) return;
    el.dataset.split = '1';
    var parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (p, i) {
      return '<span class="fxl"><span style="--l:' + i + '">' + p + '</span></span>';
    }).join('');
  }

  /* ---- gắn hiệu ứng ---- */
  function tag(sel, fx, opts, ctx) {
    opts = opts || {};
    $$(sel, ctx).forEach(function (el, i) {
      el.setAttribute('data-fx', fx);
      var d = (opts.base || 0) + i * (opts.step || 0);
      if (d) el.style.setProperty('--d', d.toFixed(2) + 's');
    });
  }
  /* Tiêu đề lớn */
  $$('.lp-h2').forEach(function (h) { splitLines(h); h.setAttribute('data-fx', 'line'); h.style.opacity = 1; });
  /* Hero chạy ngay khi tải: tiêu đề từng dòng, rồi các phần còn lại */
  var h1 = $('.lp-h1'); if (h1) { splitLines(h1); }

  tag('.lp-pill', 'left');
  tag('.lp-p, .lp-lead', 'up', { base: .15 });
  tag('.lp-more, .lp-btn--line', 'up', { base: .3 });
  tag('.lp-cta .lp-btn', 'up', { base: .55, step: .12 });
  tag('.lp-proof', 'up', { base: .8 });
  tag('.lp-ctop .lp-tabs button', 'pop', { base: .3, step: .07 });
  tag('.lp-poster', 'rot', { base: .1, step: .18 });
  tag('.lp-art__photo', 'zoom');
  tag('.lp-art__list span', 'left', { base: .25, step: .12 });
  tag('.lp-art__note', 'rot', { base: .5 });
  tag('.lp-art__arrow', 'zoom', { base: .7 });
  tag('.lp-steps li', 'right', { base: .1, step: .14 });
  tag('.lp-comm .lp-btn', 'up', { base: .45 });
  tag('.lp-doodle', 'rot', { base: .3 });
  tag('.lp-sign', 'drop', { base: .5 });
  tag('.lp-foot .lp-wrap', 'up');
  /* Sân khấu hero: mỗi mảnh vào theo kiểu riêng, so le nhịp */
  var stage = [
    ['.lp-cream', 'zoom', .05], ['.lp-portrait', 'rot', .15], ['.lp-scrap-or', 'zoom', .35], ['.lp-city', 'drop', .45],
    ['.lp-sticky', 'rot', .65], ['.lp-strips', 'up', .8], ['.lp-note-top', 'left', .95], ['.lp-kw', 'right', 1.0],
    ['.lp-note-story', 'left', 1.15], ['.lp-globe', 'zoom', 1.25],
  ];
  stage.forEach(function (s) { var e = $(s[0]); if (e) { e.setAttribute('data-fx', s[1]); e.style.setProperty('--d', s[2] + 's'); } });
  var nav = $('.lp-nav'); if (nav) { nav.setAttribute('data-fx', 'drop'); }
  var heroLead = $('.lp-lead'); if (heroLead) heroLead.style.setProperty('--d', '.5s');

  root.classList.add('fx');

  /* ---- hiện khi chạm khung nhìn ---- */
  function done(el) {
    el.classList.add('in');
    /* Sau khi chạy xong trả phần tử về nguyên trạng để hover, parallax, transform riêng của trang hoạt động bình thường. */
    var ms = 2600;
    setTimeout(function () { el.removeAttribute('data-fx'); el.classList.remove('in'); el.classList.add('fx-done'); }, ms);
  }
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var el = e.target;
      if (el.getAttribute('data-fx') === 'line') {
        el.classList.add('in');
      } else { done(el); }
    });
  }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });
  $$('[data-fx]').forEach(function (el) { io.observe(el); });

  /* Hero: dòng tiêu đề chạy sau một nhịp để chữ không bị chớp lúc tải */
  if (h1) {
    h1.style.setProperty('--d', '.1s');
    requestAnimationFrame(function () { setTimeout(function () { h1.classList.add('fx-line-in'); }, 80); });
  }

  /* ---- thanh tiến độ + hào quang ---- */
  var bar = document.createElement('div'); bar.className = 'fx-bar'; document.body.appendChild(bar);
  var hero = $('.lp-hero'), glow = null;
  if (hero) { glow = document.createElement('div'); glow.className = 'fx-glow'; hero.appendChild(glow); }

  /* ---- chuyển động gắn với cuộn ---- */
  var heroText = $('.lp-hero__text'), stageEl = $('.lp-stage');
  var par = [
    ['.lp-portrait', .06, 6], ['.lp-city', -.10, 14], ['.lp-sticky', -.16, 20], ['.lp-strips', -.07, 10],
    ['.lp-note-top', -.20, 24], ['.lp-kw', -.12, 16], ['.lp-globe', .13, 18], ['.lp-scrap-or', .04, 4], ['.lp-cream', .09, 8],
  ].map(function (p) { return { el: $(p[0]), speed: p[1], depth: p[2] }; }).filter(function (p) { return p.el; });
  var comm = $('.lp-comm'), commImg = $('.lp-comm__img'), sign = $('.lp-sign'), doodle = $('.lp-doodle');
  var paper = $('.lp-paper__bg'), artPhotoImg = $('.lp-art__photo img');
  var method = $('.lp-method');
  var mx = 0, my = 0, tmx = 0, tmy = 0, ticking = false;

  function progress(el) {           /* 0 khi mép trên chạm đáy màn hình → 1 khi mép dưới chạm đỉnh */
    var r = el.getBoundingClientRect(), vh = innerHeight;
    return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
  }
  function frame() {
    ticking = false;
    var y = scrollY, vh = innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';

    mx += (tmx - mx) * .08; my += (tmy - my) * .08;
    if (hero && y < hero.offsetHeight + 200) {
      var hp = Math.min(1, y / (hero.offsetHeight || 700));
      if (heroText) { heroText.style.translate = '0 ' + (-y * .22).toFixed(1) + 'px'; heroText.style.opacity = String(Math.max(0, 1 - hp * 1.35)); }
      par.forEach(function (p) {
        if (p.el.hasAttribute('data-fx')) return;       /* đang chạy hiệu ứng vào thì chưa parallax */
        p.el.style.translate = (mx * p.depth).toFixed(1) + 'px ' + (y * p.speed + my * p.depth).toFixed(1) + 'px';
      });
    }
    if (paper) { var pp = progress(paper.parentElement); paper.style.translate = '0 ' + ((pp - .5) * -40).toFixed(1) + 'px'; }
    if (artPhotoImg && method) { var mp = progress(method); artPhotoImg.style.scale = (1.22 - mp * .2).toFixed(3); }
    if (comm) {
      var cp = progress(comm);
      if (commImg) commImg.style.scale = (1.22 - cp * .2).toFixed(3);
      if (sign && !sign.hasAttribute('data-fx')) sign.style.translate = '0 ' + ((cp - .5) * -60).toFixed(1) + 'px';
      if (doodle && !doodle.hasAttribute('data-fx')) doodle.style.translate = '0 ' + ((cp - .5) * 50).toFixed(1) + 'px';
    }
    if (Math.abs(tmx - mx) > .01 || Math.abs(tmy - my) > .01) request();
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  request();

  /* ---- phản hồi con trỏ ---- */
  if (hero) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      tmx = nx * 2; tmy = ny * 2;
      glow.style.setProperty('--gx', (e.clientX - r.left) + 'px'); glow.style.setProperty('--gy', (e.clientY - r.top) + 'px');
      request();
    });
    hero.addEventListener('pointerleave', function () { tmx = 0; tmy = 0; request(); });
  }
  /* Nút hút nhẹ theo con trỏ */
  if (matchMedia('(hover:hover)').matches) {
    $$('.lp-btn').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        if (b.hasAttribute('data-fx')) return;
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * .18).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * .28).toFixed(1) + 'px';
      });
      b.addEventListener('pointerleave', function () { b.style.translate = ''; });
    });
  }
})();
