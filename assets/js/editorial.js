/* EDITORIAL — chuyển động có chủ đích cho landing.
   Mọi nội dung đọc được khi không có JS; JS chỉ thêm nhịp cuộn, kéo thả trên bàn Lab và các tương tác học tập. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches;
  var wide = function () { return window.innerWidth >= 1000; };

  /* ---------- Hiện dần khi vào khung nhìn ---------- */
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
    });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  /* .cu bị cắt gần hết bằng clip-path nên cần ngưỡng 0 mới được tính là giao nhau */
  var cuIO = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); cuIO.unobserve(e.target); } });
  }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
  $$('.rv').forEach(function (el) { io.observe(el); });
  $$('.cu').forEach(function (el) { cuIO.observe(el); });
  $$('h1,h2').forEach(function (h) { if ($('.ln', h)) io.observe(h); });
  /* bìa: chạy ngay, sau khi chữ đã tải */
  var heroGo = function () { $$('.hero .cu, .hero h1').forEach(function (el) { el.classList.add('in'); }); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(heroGo, 60); }); else setTimeout(heroGo, 200);
  setTimeout(heroGo, 1200);

  /* ---------- Thanh tiến độ + parallax ảnh ---------- */
  var prog = $('#prog');
  var pars = $$('.h-photo img, .mani-pic img, .met-pic img, .chal-img img, .comm>img').map(function (img) {
    return { img: img, box: img.parentElement };
  });
  var ticking = false;
  function frame() {
    ticking = false;
    var h = document.documentElement, max = h.scrollHeight - innerHeight;
    if (prog) prog.style.setProperty('--sp', max > 0 ? (scrollY / max).toFixed(4) : 0);
    if (reduce) return;
    var vh = innerHeight;
    pars.forEach(function (p) {
      var r = p.box.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var head = p.img.offsetHeight - p.box.offsetHeight;
      if (head <= 0) return;
      var t = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); /* -1..1 */
      var py = Math.max(0, Math.min(head, head * (0.5 - t * 0.5)));
      p.img.style.setProperty('--py', py.toFixed(1));
    });
    roadUpdate(); navTone();
  }
  var nav = $('.nav');
  function navTone() {
    if (!nav) return;
    var els = document.elementsFromPoint(innerWidth / 2, 70), tone = 'dark';
    for (var i = 0; i < els.length; i++) {
      var s = els[i].closest && els[i].closest('section,footer');
      if (!s) continue;
      tone = s.classList.contains('on-iv') || s.classList.contains('lab') || s.classList.contains('chal') || s.classList.contains('road-sky') ? 'light'
        : s.classList.contains('on-tc') || s.classList.contains('foot') ? 'tc' : 'dark';
      var rs = els[i].closest('.road-sky'); if (rs) tone = 'light';
      break;
    }
    if (nav.dataset.tone !== tone) nav.dataset.tone = tone;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  /* ---------- Lời mở: chữ sáng dần theo nhịp đọc ---------- */
  var mani = $('#maniText');
  var words = [];
  if (mani) {
    var frag = document.createDocumentFragment();
    Array.prototype.slice.call(mani.childNodes).forEach(function (n) {
      var em = n.nodeType === 1 && n.classList.contains('em');
      var txt = n.textContent;
      txt.split(/(\s+)/).forEach(function (t) {
        if (!t) return;
        if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
        var s = document.createElement('span');
        s.className = 'w' + (em ? ' em' : ''); s.textContent = t;
        frag.appendChild(s); words.push(s);
      });
    });
    mani.textContent = ''; mani.appendChild(frag);
    mani.setAttribute('aria-label', mani.textContent);
    var readUpd = function () {
      var r = mani.getBoundingClientRect(), vh = innerHeight;
      var p = reduce ? 1 : Math.max(0, Math.min(1, (vh * .82 - r.top) / (r.height + vh * .25)));
      var n = Math.round(p * words.length);
      words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
    };
    addEventListener('scroll', readUpd, { passive: true }); addEventListener('resize', readUpd); readUpd();
  }

  /* ---------- Lọc case ---------- */
  var tabs = $$('.tabs button'), cards = $$('.cs');
  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      tabs.forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
      var f = b.dataset.f;
      cards.forEach(function (c) { c.classList.toggle('dim', f !== 'all' && c.dataset.c !== f); });
    });
  });

  /* ---------- Mổ xẻ: bước nào đang ở giữa màn hình thì sáng, ghim di chuyển trên ảnh ---------- */
  var steps = $$('#anaSteps .ana-step'), pin = $('#anaPin'), tag = $('#anaTag');
  if (steps.length) {
    var so = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        steps.forEach(function (s) { s.classList.toggle('act', s === e.target); });
        var t = e.target;
        if (pin) { pin.style.setProperty('--x', t.dataset.x); pin.style.setProperty('--y', t.dataset.y); pin.textContent = $('.n', t).textContent; }
        if (tag) tag.textContent = $('.k', t).textContent;
      });
    }, { rootMargin: '-42% 0px -42% 0px' });
    steps.forEach(function (s) { so.observe(s); });
  }

  /* ---------- Bậc thang phương pháp: leo từng bậc ---------- */
  var rungs = $$('#ladder .rung');
  if (rungs.length) {
    var ro = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('act'); });
    }, { rootMargin: '-30% 0px -30% 0px' });
    rungs.forEach(function (r) { ro.observe(r); });
  }

  /* ---------- Accordion trên tờ brief ---------- */
  var acc = $('#labAcc');
  if (acc) acc.addEventListener('click', function (e) {
    var b = e.target.closest('.acc__b'); if (!b) return;
    var item = b.parentElement, was = item.classList.contains('open');
    $$('.acc__i', acc).forEach(function (i) { i.classList.remove('open'); $('.acc__b', i).setAttribute('aria-expanded', 'false'); });
    if (!was) { item.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
  });

  /* ---------- Kéo thả đồ vật trên bàn (chỉ màn rộng) ---------- */
  var desk = $('#desk'), zTop = 10;
  if (desk) $$('.obj.drag', desk).forEach(function (o) {
    var sx, sy, ox = 0, oy = 0, on = false;
    o.addEventListener('pointerdown', function (e) {
      if (!wide() || e.button > 0 || e.target.closest('button,a')) return;
      on = true; sx = e.clientX; sy = e.clientY;
      ox = parseFloat(o.dataset.dx || 0); oy = parseFloat(o.dataset.dy || 0);
      o.classList.add('on'); o.style.zIndex = ++zTop;
      try { o.setPointerCapture(e.pointerId); } catch (x) {}
    });
    o.addEventListener('pointermove', function (e) {
      if (!on) return;
      var dx = ox + e.clientX - sx, dy = oy + e.clientY - sy;
      o.dataset.dx = dx; o.dataset.dy = dy;
      o.style.setProperty('--dx', dx + 'px'); o.style.setProperty('--dy', dy + 'px');
    });
    var end = function () { on = false; o.classList.remove('on'); };
    o.addEventListener('pointerup', end); o.addEventListener('pointercancel', end);
  });

  /* ---------- Đếm số + vòng tiến bộ ---------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-count')), suf = el.getAttribute('data-suf') || '';
    if (reduce || !isFinite(to)) { el.textContent = to + suf; return; }
    var t0 = performance.now(), dur = 1400;
    (function tick(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * e) + suf;
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  var visIO = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (!en.isIntersecting) return;
      visIO.unobserve(en.target);
      var el = en.target;
      if (el.hasAttribute('data-count')) countUp(el);
      if (el.id === 'labProg') {
        el.classList.add('is-vis');
        var ring = $('#labRing'), t0 = performance.now();
        (function tick(now) { var k = Math.min(1, (now - t0) / 1400); ring.style.setProperty('--p', (62 * (1 - Math.pow(1 - k, 3))).toFixed(1)); if (k < 1) requestAnimationFrame(tick); })(t0);
      }
    });
  }, { threshold: .4 });
  $$('[data-count]').forEach(function (el) { visIO.observe(el); });
  var lp = $('#labProg'); if (lp) visIO.observe(lp);

  /* ---------- Lộ trình: đường tự vẽ khi cuộn ---------- */
  var draw = $('#roadDraw'), map = $('#roadMap'), nodes = $$('.nd');
  function roadUpdate() {
    if (!draw || !map) return;
    var r = map.getBoundingClientRect(), vh = innerHeight;
    var p = reduce ? 1 : Math.max(0, Math.min(1, (vh * .9 - r.top) / (r.height * .95 + vh * .2)));
    draw.style.setProperty('--off', (1 - p).toFixed(3));
    nodes.forEach(function (n, i) { n.classList.toggle('on', p >= (i / (nodes.length - 1)) * .9); });
  }
  roadUpdate();

  /* ---------- Mục lục kỹ năng: ảnh hiện theo con trỏ ---------- */
  var pv = $('#skPv');
  if (pv && fine && !reduce) {
    var pimg = $('img', pv), tx = 0, ty = 0, cx = 0, cy = 0, run = false;
    var loop = function () {
      cx += (tx - cx) * .16; cy += (ty - cy) * .16;
      pv.style.translate = cx + 'px ' + cy + 'px';
      if (run) requestAnimationFrame(loop);
    };
    $$('.sk').forEach(function (a) {
      a.addEventListener('mouseenter', function (e) {
        pimg.src = a.dataset.img; pv.classList.add('on'); tx = cx = e.clientX + 24; ty = cy = e.clientY - 120;
        if (!run) { run = true; loop(); }
      });
      a.addEventListener('mousemove', function (e) { tx = e.clientX + 24; ty = e.clientY - 120; });
      a.addEventListener('mouseleave', function () { pv.classList.remove('on'); run = false; });
    });
  }

  /* ---------- Thử thách 60 giây ---------- */
  var VIEW = {
    A: { t: 'Hành vi & nhu cầu Gen Z', why: 'Đây là điểm khởi đầu quan trọng vì giúp bạn hiểu rõ vấn đề gốc rễ: Gen Z thực sự đang tìm kiếm điều gì ở một thương hiệu cà phê.',
      pts: ['Giúp xác định insight thật, không chỉ dựa trên giả định.', 'Làm rõ những thay đổi trong hành vi, bối cảnh và kỳ vọng.', 'Tạo nền tảng vững chắc cho các quyết định chiến lược tiếp theo.'],
      warn: 'Chỉ nghiên cứu hành vi thôi chưa đủ. Bạn sẽ cần kết hợp với trải nghiệm thương hiệu và truyền thông để có bức tranh toàn diện và đề xuất giải pháp khả thi.' },
    B: { t: 'Trải nghiệm thương hiệu', why: 'Khách có thể rời đi vì trải nghiệm thực tế không khớp lời hứa: không gian, giá, tốc độ phục vụ hay chất lượng sản phẩm.',
      pts: ['Tìm ra điểm “gãy” cụ thể trong hành trình tại cửa hàng.', 'So sánh trải nghiệm của bạn với các đối thủ Gen Z hay ghé.', 'Cho thấy thứ cần sửa ngay, rẻ hơn nhiều so với đổi cả thương hiệu.'],
      warn: 'Nếu chưa hiểu Gen Z muốn gì, bạn có thể tối ưu đúng điều họ không quan tâm. Cần đối chiếu với nhu cầu thật của họ.' },
    C: { t: 'Truyền thông & cộng đồng', why: 'Gen Z khám phá và đánh giá thương hiệu qua mạng xã hội. Cách bạn xuất hiện ở đó quyết định bạn có được cân nhắc hay không.',
      pts: ['Đo mức độ nhận biết và cảm xúc quanh thương hiệu trên mạng xã hội.', 'Nhìn ra khoảng cách giữa điều bạn nói và điều cộng đồng nói về bạn.', 'Tìm tín hiệu sớm về xu hướng mới mà đối thủ đang tận dụng.'],
      warn: 'Số lượt tương tác cao chưa chắc chuyển thành doanh số. Phải nối được với hành vi mua thật.' }
  };
  var vb = $('#viewBody');
  function show(k, animate) {
    var v = VIEW[k]; if (!v || !vb) return;
    vb.innerHTML = '<div class="' + (animate ? 'swap' : '') + '"><h4><i>' + k + '</i>' + v.t + '</h4><p>' + v.why + '</p><ul>' +
      v.pts.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul><div class="chal__warn"><b>Cần lưu ý:</b> ' + v.warn + '</div></div>';
  }
  show('A', false);
  var opts = $('#opts'), timer = null, left = 60, line = $('#chalLine');
  function startTimer() {
    if (timer || reduce) return;
    var el = $('#chalT');
    if (line) { void line.offsetWidth; line.classList.add('run'); }
    timer = setInterval(function () {
      left = Math.max(0, left - 1);
      el.textContent = left > 0 ? left + 's' : 'Hết giờ';
      if (left === 0) clearInterval(timer);
    }, 1000);
  }
  if (opts) opts.addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b) return;
    $$('.opt', opts).forEach(function (o) { var on = o === b; o.classList.toggle('on', on); o.setAttribute('aria-pressed', on); });
    show(b.getAttribute('data-k'), true);
    startTimer();
  });
  var chal = $('#challenge');
  if (chal) new IntersectionObserver(function (ents, o) {
    if (ents[0].isIntersecting) { startTimer(); o.disconnect(); }
  }, { threshold: .4 }).observe(chal);

  /* ---------- Tường dấu vết: các mảnh trôi nhẹ theo con trỏ ---------- */
  var wall = $('#wall');
  if (wall && fine && !reduce) {
    var items = $$('[data-d]', wall);
    wall.addEventListener('pointermove', function (e) {
      if (!wide()) return;
      var r = wall.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      items.forEach(function (el) {
        var d = parseFloat(el.getAttribute('data-d')) || 10;
        el.style.setProperty('--tx', (nx * d * -2).toFixed(1) + 'px');
        el.style.setProperty('--ty', (ny * d * -2).toFixed(1) + 'px');
      });
    });
    wall.addEventListener('pointerleave', function () { items.forEach(function (el) { el.style.removeProperty('--tx'); el.style.removeProperty('--ty'); }); });
  }

  frame();
})();
