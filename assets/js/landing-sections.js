/* Tương tác cho các phần bổ sung của landing: accordion, đếm số, thử thách 60 giây, đường lộ trình tự vẽ theo cuộn, chùm ảnh phản ứng chuột. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Accordion: mở một mục tại một thời điểm ---- */
  var acc = $('#labAcc');
  if (acc) acc.addEventListener('click', function (e) {
    var b = e.target.closest('.acc__b'); if (!b) return;
    var item = b.parentElement, was = item.classList.contains('open');
    $$('.acc__i', acc).forEach(function (i) { i.classList.remove('open'); $('.acc__b', i).setAttribute('aria-expanded', 'false'); });
    if (!was) { item.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
  });

  /* ---- Đếm số khi chạm khung nhìn ---- */
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

  /* ---- Thử thách: chọn hướng điều tra, đồng hồ 60 giây ---- */
  var VIEW = {
    A: { t: 'Hành vi & nhu cầu Gen Z', why: 'Đây là điểm khởi đầu quan trọng vì giúp bạn hiểu rõ vấn đề gốc rễ: Gen Z thực sự đang tìm kiếm điều gì ở một thương hiệu cà phê.',
      pts: ['Giúp xác định insight thật, không chỉ dựa trên giả định.', 'Làm rõ những thay đổi trong hành vi, bối cảnh và kỳ vọng.', 'Tạo nền tảng vững chắc cho các quyết định chiến lược tiếp theo.'],
      warn: 'Chỉ nghiên cứu hành vi thôi chưa đủ. Bạn sẽ cần kết hợp với trải nghiệm thương hiệu và truyền thông để có bức tranh toàn diện và đề xuất giải pháp khả thi.' },
    B: { t: 'Trải nghiệm thương hiệu', why: 'Khách có thể rời đi vì trải nghiệm thực tế không khớp lời hứa: không gian, giá, tốc độ phục vụ hay chất lượng sản phẩm.',
      pts: ['Tìm ra điểm “gãy” cụ thể trong hành trình tại cửa hàng.', 'So sánh trải nghiệm của bạn với các đối thủ Gen Z hay ghé.', 'Cho thấy thứ cần sửa ngay, rẻ hơn nhiều so với đổi cả thương hiệu.'],
      warn: 'Nếu chưa hiểu Gen Z muốn gì, bạn có thể tối ưu đúng điều họ không quan tâm. Cần đối chiếu với nhu cầu thật của họ.' },
    C: { t: 'Truyền thông & cộng đồng', why: 'Gen Z khám phá và đánh giá thương hiệu qua mạng xã hội. Cách bạn xuất hiện ở đó quyết định bạn có được cân nhắc hay không.',
      pts: ['Đo mức độ nhận biết và cảm xúc quanh thương hiệu trên mạng xã hội.', 'Nhìn ra khoảng cách giữa điều bạn nói và điều cộng đồng nói về bạn.', 'Tìm tín hiệu sớm về xu hướng mới mà đối thủ đang tận dụng.'],
      warn: 'Số lượt tương tác cao chưa chắc chuyển thành doanh số. Phải nối được với hành vi mua thật.' },
  };
  var vb = $('#viewBody');
  function show(k, animate) {
    var v = VIEW[k]; if (!v || !vb) return;
    vb.innerHTML = '<div class="' + (animate ? 'swap' : '') + '"><h4><i>' + k + '</i>' + v.t + '</h4><p>' + v.why + '</p><ul>' +
      v.pts.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul><div class="chal__warn"><b>Cần lưu ý:</b> ' + v.warn + '</div></div>';
  }
  show('A', false);
  var opts = $('#opts');
  var timer = null, left = 60;
  function startTimer() {
    if (timer || reduce) return;
    var el = $('#chalT');
    timer = setInterval(function () {
      left = Math.max(0, left - 1);
      el.textContent = left > 0 ? left + 's' : 'Hết giờ';
      if (left === 0) clearInterval(timer);
    }, 1000);
  }
  if (opts) opts.addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b) return;
    $$('.opt', opts).forEach(function (o) { o.classList.toggle('on', o === b); });
    show(b.getAttribute('data-k'), true);
    startTimer();
  });
  var chal = $('#challenge');
  if (chal) new IntersectionObserver(function (ents, io) {
    if (ents[0].isIntersecting) { startTimer(); io.disconnect(); }
  }, { threshold: .35 }).observe(chal);

  /* ---- Đường lộ trình tự vẽ theo cuộn ---- */
  var draw = $('#roadDraw'), map = $('#roadMap');
  if (draw && map) {
    var len = draw.getTotalLength ? draw.getTotalLength() : 600;
    draw.style.setProperty('--len', len); draw.style.setProperty('--off', len);
    var nodes = $$('.node', map);
    var upd = function () {
      var r = map.getBoundingClientRect(), vh = innerHeight;
      var p = reduce ? 1 : Math.max(0, Math.min(1, (vh * .85 - r.top) / (r.height * .9)));
      draw.style.setProperty('--off', (len * (1 - p)).toFixed(1));
      nodes.forEach(function (n, i) {
        var on = p >= (i / (nodes.length - 1)) * .92;
        n.style.opacity = on ? 1 : .35;
      });
    };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  /* ---- Chùm ảnh Brand Universe phản ứng với chuột (độ sâu khác nhau) ---- */
  var col = $('#uniCol');
  if (col && matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    var items = $$('[data-d]', col);
    col.addEventListener('pointermove', function (e) {
      var r = col.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      items.forEach(function (el) {
        var d = parseFloat(el.getAttribute('data-d')) || 10;
        el.style.translate = (nx * d * -1.4).toFixed(1) + 'px ' + (ny * d * -1.4).toFixed(1) + 'px';
      });
    });
    col.addEventListener('pointerleave', function () { items.forEach(function (el) { el.style.translate = ''; }); });
  }
})();
