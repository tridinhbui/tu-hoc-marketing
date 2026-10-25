/* Ý Ý — bạn đồng hành học marketing. Một file, không phụ thuộc trang:
   · YY.type / YY.typeHTML : hiệu ứng "đang gõ" cho văn bản
   · YY.sumHTML            : thẻ "Ý Ý tóm tắt" gõ chữ khi hiện ra (thay các khối tóm tắt trong bài học)
   · YY.mount              : bong bóng chat nổi (landing, khung app); trả lời bằng hiểu biết cục bộ, có AI thì dùng AI
   · YY.tip                : lời nhắc ngắn theo từng trang, hiện đúng một lần mỗi phiên cho mỗi trang */
(function(){
  if (window.YY) return;
  var YY = window.YY = {};
  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var norm = function(t){ return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d'); };
  /* Logo Ý Ý: assets/img/yy-logo.png. Chưa có file thì rơi về chữ “Ý” trên nền cam. */
  var LOGO = 'assets/img/yy-logo.png?v=2';
  var AV = function(){ return '<span class="yy-av"><img src="' + LOGO + '" alt="Ý Ý" onerror="this.parentNode.classList.add(\'yy-av--t\');this.outerHTML=\'Ý\'"></span>'; };
  var sleep = function(ms){ return new Promise(function(r){ setTimeout(r, ms); }); };

  /* ---------- CSS (tự chứa; dùng biến của trang nếu có) ---------- */
  var css = '' +
  '.yy-av{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;flex:none;background:radial-gradient(circle at 30% 25%,#F0875F,#B8502D);color:#fff;font:italic 600 17px/1 "Fraunces",serif;letter-spacing:-.03em;box-shadow:0 6px 14px -6px rgba(120,40,10,.6);position:relative}' +
  '.yy-av{overflow:hidden}.yy-av img{display:block;width:100%;height:100%;object-fit:cover;border-radius:50%;transform:scale(1.12)}' +
  '.yy-av:not(.yy-av--t){background:#fff3e8;box-shadow:0 6px 16px -6px rgba(200,110,60,.55)}' +
  '.yy-caret{display:inline-block;width:2px;height:1.05em;background:currentColor;margin-left:2px;vertical-align:-.15em;animation:yyb 1s steps(1) infinite}' +
  '@keyframes yyb{50%{opacity:0}}' +
  '.yy-dots{display:inline-flex;gap:4px;align-items:center;height:1em}.yy-dots i{width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.4;animation:yyd 1s infinite}.yy-dots i:nth-child(2){animation-delay:.15s}.yy-dots i:nth-child(3){animation-delay:.3s}' +
  '@keyframes yyd{50%{opacity:1;transform:translateY(-3px)}}' +
  /* thẻ tóm tắt */
  '.yy-sum{display:flex;gap:14px;align-items:flex-start;margin:18px 0;padding:16px 18px;border-radius:20px;border:1px solid rgba(120,84,50,.18);background:linear-gradient(120deg,#fffdf8,#fbefe6);color:#2B1A11}' +
  '.yy-sum__b{min-width:0;flex:1}.yy-sum__h{font:700 11.5px/1 var(--sans,system-ui);letter-spacing:.1em;text-transform:uppercase;color:#B8502D;margin:2px 0 10px}' +
  '.yy-sum__r{margin:0 0 10px;font-size:15px;line-height:1.6}.yy-sum__r:last-child{margin-bottom:0}.yy-sum__r small{display:block;font:700 10.5px var(--sans,system-ui);letter-spacing:.09em;text-transform:uppercase;color:rgba(43,26,17,.5);margin-bottom:2px}' +
  /* bong bóng chat */
  '.yy-fab{position:fixed;right:18px;bottom:84px;z-index:70;border:0;padding:0;cursor:pointer;background:none}' +
  '.yy-fab .yy-av{width:54px;height:54px;font-size:22px}' +
  '.yy-fab--solo{right:max(76px,calc(env(safe-area-inset-right) + 70px));bottom:16px;display:flex;align-items:center;gap:10px;background:#fffdf8;border:1px solid rgba(120,84,50,.22);border-radius:999px;padding:6px 16px 6px 6px;box-shadow:0 18px 36px -16px rgba(60,30,10,.6)}' +
  '.yy-fab--solo .yy-av{width:48px;height:48px}.yy-fab--solo b{font:700 14px var(--sans,system-ui);color:#2B1A11}' +
  '@media(max-width:999px){.yy-fab--solo{right:12px;bottom:max(16px,env(safe-area-inset-bottom));padding:5px}.yy-fab--solo b{display:none}.yy-tip--solo{right:12px;bottom:78px}}' +
  '.yy-fab--solo::before{content:"";position:absolute;inset:-5px;border-radius:999px;border:2px solid rgba(184,80,45,.35);animation:yyp 2.4s ease-out infinite;pointer-events:none}' +
  '@keyframes yyp{0%{transform:scale(.96);opacity:.9}100%{transform:scale(1.12);opacity:0}}' +
  '.yy-tip{position:fixed;right:84px;bottom:92px;z-index:70;max-width:min(300px,calc(100vw - 120px));background:#fffdf8;color:#2B1A11;border:1px solid rgba(120,84,50,.2);border-radius:16px 16px 4px 16px;padding:11px 14px;font:500 13.5px/1.5 var(--sans,system-ui);box-shadow:0 14px 30px -14px rgba(60,30,10,.5);cursor:pointer}' +
  '.yy-tip--solo{right:max(76px,calc(env(safe-area-inset-right) + 70px));bottom:84px;border-radius:16px 16px 16px 4px}' +
  '.yy-panel{position:fixed;right:18px;bottom:150px;z-index:71;width:min(380px,calc(100vw - 36px));height:min(520px,calc(100vh - 190px));display:flex;flex-direction:column;background:#FFFCF6;color:#2B1A11;border:1px solid rgba(120,84,50,.2);border-radius:22px;box-shadow:0 30px 60px -24px rgba(60,30,10,.55);overflow:hidden}' +
  '.yy-panel--solo{bottom:90px}' +
  '.yy-panel[hidden]{display:none}' +
  '.yy-ph{display:flex;gap:10px;align-items:center;padding:12px 14px;background:linear-gradient(120deg,#fbefe6,#fffcf6);border-bottom:1px solid rgba(120,84,50,.14)}' +
  '.yy-ph b{display:block;font-size:15px}.yy-ph small{color:rgba(43,26,17,.55);font-size:12px}.yy-x{margin-left:auto;border:0;background:none;font-size:20px;cursor:pointer;color:rgba(43,26,17,.55)}' +
  '.yy-log{flex:1;overflow:auto;padding:14px;display:grid;gap:10px;align-content:start}' +
  '.yy-m{max-width:88%;padding:10px 13px;border-radius:16px;font:500 14px/1.55 var(--sans,system-ui);background:#f6ebdb}' +
  '.yy-m a{color:#B8502D;font-weight:700}' +
  '.yy-m--me{justify-self:end;background:#B8502D;color:#fff;border-radius:16px 16px 4px 16px}' +
  '.yy-links{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.yy-links a{border:1px solid rgba(184,80,45,.35);border-radius:999px;padding:5px 11px;font-size:12.5px;text-decoration:none;background:#fff}' +
  '.yy-chips{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 10px}.yy-chips button{border:1px solid rgba(120,84,50,.22);background:#fff;border-radius:999px;padding:6px 11px;font:600 12.5px var(--sans,system-ui);cursor:pointer;color:#2B1A11}' +
  '.yy-chips button:hover{border-color:#B8502D;color:#B8502D}' +
  '.yy-f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(120,84,50,.14);background:#fff}' +
  '.yy-f input{flex:1;min-width:0;border:1.5px solid rgba(120,84,50,.2);border-radius:999px;padding:10px 14px;font:500 16px var(--sans,system-ui);outline:none}.yy-f input:focus{border-color:#B8502D}' +
  '.yy-f button{border:0;background:#B8502D;color:#fff;border-radius:999px;padding:0 16px;font:700 13.5px var(--sans,system-ui);cursor:pointer}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- hiệu ứng gõ ---------- */
  function delay(n){ return n > 400 ? 9 : n > 200 ? 14 : 22; }
  /* gõ văn bản thuần vào el; trả Promise khi xong */
  YY.type = function(el, text, opt){
    opt = opt || {};
    text = String(text);
    if (REDUCED) { el.textContent = text; return Promise.resolve(); }
    var caret = document.createElement('span'); caret.className = 'yy-caret';
    var node = document.createTextNode(''); el.textContent = ''; el.appendChild(node); el.appendChild(caret);
    var d = delay(text.length), i = 0;
    return new Promise(function(done){
      (function step(){
        if (opt.cancel && opt.cancel()) { node.nodeValue = text; caret.remove(); return done(); }
        i = Math.min(text.length, i + (Math.random() < .15 ? 2 : 1));
        node.nodeValue = text.slice(0, i);
        if (i >= text.length) { setTimeout(function(){ caret.remove(); done(); }, 250); return; }
        var ch = text[i - 1], pause = /[.!?…]/.test(ch) ? 220 : /[,;:]/.test(ch) ? 110 : 0;
        setTimeout(step, d + Math.random() * d * .6 + pause);
      })();
    });
  };
  /* gõ HTML: giữ nguyên thẻ, chỉ gõ các nút văn bản */
  YY.typeHTML = function(el, html){
    el.innerHTML = html;
    if (REDUCED) return Promise.resolve();
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [], n;
    while ((n = walker.nextNode())) if (n.nodeValue.trim()) nodes.push([n, n.nodeValue]);
    nodes.forEach(function(p){ p[0].nodeValue = ''; });
    var caret = document.createElement('span'); caret.className = 'yy-caret';
    var total = nodes.reduce(function(a, p){ return a + p[1].length; }, 0), d = delay(total);
    return new Promise(function(done){
      var k = 0, i = 0;
      (function step(){
        if (k >= nodes.length) { caret.remove(); return done(); }
        var p = nodes[k]; if (!caret.parentNode || caret.previousSibling !== p[0]) p[0].parentNode.insertBefore(caret, p[0].nextSibling);
        i += Math.random() < .2 ? 2 : 1;
        if (i >= p[1].length) { p[0].nodeValue = p[1]; k++; i = 0; return setTimeout(step, 60); }
        p[0].nodeValue = p[1].slice(0, i);
        var ch = p[1][i - 1]; setTimeout(step, d + Math.random() * d * .6 + (/[.!?…]/.test(ch) ? 160 : 0));
      })();
    });
  };


  /* ---------- gõ chữ cho đoạn mô tả có sẵn trong trang ----------
     YY.autoType('.lede, .hero p', {once:'khóa'}) — mỗi phần tử gõ khi cuộn tới, một lần cho mỗi phiên (theo khoá). */
  YY.autoType = function(selector, opt){
    opt = opt || {};
    if (REDUCED) return;
    if (opt.once) { try { if (sessionStorage.getItem('yy.typed:' + opt.once)) return; } catch(e){} }
    var els = Array.prototype.slice.call(document.querySelectorAll(selector)).filter(function(el){
      if (el.__yyTyped || el.closest('[hidden]') || el.querySelector('input,textarea,button,select,svg,img')) return false;
      var n = (el.textContent || '').trim().length; return n >= 20 && n <= 420;
    });
    if (!els.length) return;
    if (opt.once) { try { sessionStorage.setItem('yy.typed:' + opt.once, '1'); } catch(e){} }
    var begin = function(el){
      if (el.__yyGo) return; el.__yyGo = 1;
      YY.typeHTML(el, el.__yyHTML).then(function(){ el.style.minHeight = ''; });
    };
    var inView = function(el){ var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < (window.innerHeight || 800); };
    var ob = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ ob.unobserve(e.target); begin(e.target); } });
    }, { threshold: .4 }) : null;
    els.forEach(function(el){
      el.__yyTyped = 1; el.__yyHTML = el.innerHTML;
      el.style.minHeight = el.offsetHeight + 'px'; el.textContent = '\u200b';
      if (ob) ob.observe(el); else begin(el);
      /* dự phòng: tab ẩn / khung chưa vẽ thì IntersectionObserver không chạy — nếu đã nằm trong màn hình thì vẫn gõ */
      setTimeout(function(){ if (!el.__yyGo && inView(el)) begin(el); }, 2200);
      setTimeout(function(){ if (!el.__yyGo) { el.innerHTML = el.__yyHTML; el.style.minHeight = ''; el.__yyGo = 1; } }, 20000);
    });
  };

  /* ---------- thẻ "Ý Ý tóm tắt" ---------- */
  /* rows: [[nhãn, html], …]. Trả về HTML giữ chỗ; YY tự gõ khi thẻ lọt vào màn hình. */
  YY.sumHTML = function(o){
    var data = encodeURIComponent(JSON.stringify({ t: o.title || 'Ý Ý tóm tắt', r: (o.rows || []).filter(function(r){ return r && r[1]; }) }));
    return '<div class="yy-sum" data-yy="' + data + '">' + AV() + '<div class="yy-sum__b"><div class="yy-sum__h">' + esc(o.title || 'Ý Ý tóm tắt') + '</div><div class="yy-sum__rows"></div></div></div>';
  };
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ io.unobserve(e.target); play(e.target); } });
  }, { threshold: .25 }) : null;
  function play(card){
    if (card.__yy) return; card.__yy = 1;
    var d; try { d = JSON.parse(decodeURIComponent(card.getAttribute('data-yy'))); } catch(e){ return; }
    var box = card.querySelector('.yy-sum__rows'); box.innerHTML = '';
    (async function(){
      for (var i = 0; i < d.r.length; i++){
        var p = document.createElement('p'); p.className = 'yy-sum__r';
        p.innerHTML = '<small>' + esc(d.r[i][0]) + '</small><span></span>'; box.appendChild(p);
        await YY.typeHTML(p.querySelector('span'), d.r[i][1]);
        await sleep(160);
      }
    })();
  }
  function scan(root){
    (root || document).querySelectorAll('.yy-sum[data-yy]').forEach(function(c){
      if (c.__yyw) return; c.__yyw = 1;
      if (io) io.observe(c); else play(c);
      setTimeout(function(){ if (!c.__yy) { var r = c.getBoundingClientRect(); if (r.bottom > 0 && r.top < (window.innerHeight || 800) && !c.closest('[hidden]')) play(c); } }, 2200);
    });
  }
  YY.scan = scan;
  document.addEventListener('DOMContentLoaded', function(){ scan(); });
  if (document.readyState !== 'loading') scan();
  try { new MutationObserver(function(){ scan(); }).observe(document.documentElement, { childList: true, subtree: true }); } catch(e){}

  /* ---------- bộ não cục bộ ---------- */
  var FAQ = [
    { k: /(ban la ai|y y la ai|ten (ban|may)|ai vay|gioi thieu ban)/, a: 'Mình là Ý Ý, bạn đồng hành học marketing của Tự Học Marketing Case. Mình giải thích thuật ngữ, gợi ý bài nên học và chỉ đường trong app. Mình không chấm điểm bài làm của bạn.' },
    { k: /(mien phi|gia ca|bao nhieu tien|tra phi|mat tien|hoc phi)/, a: 'Miễn phí cho người học. Bạn chỉ cần đăng nhập bằng Google để tiến độ được lưu lại và đồng bộ giữa các máy.' },
    { k: /(bat dau|moi hoc|nguoi moi|hoc tu dau|hoc gi truoc|nen hoc gi)/, a: 'Nếu mới bắt đầu: làm bài xếp lớp để app biết bạn đã vững chặng nào, rồi học theo lộ trình từ Chặng 1. Mỗi bài chỉ khoảng 6 phút.', links: [['Bài xếp lớp', 'xep-lop.html'], ['Học bài', 'hoc-bai.html']] },
    { k: /(xp|cap do|level|diem kinh nghiem|len cap)/, a: 'Mỗi bài học, bài tính số và case đều cộng XP. Có 30 cấp độ chia 6 bậc nghề, từ “Người quan sát” đến “Người nhìn thấy”. Xem tab Cấp độ & XP ở Dashboard.', links: [['Cấp độ & XP', 'cap-do.html']] },
    { k: /(case|tinh huong|giai case|bam gio)/, a: 'Case có bấm giờ: bạn chọn hỏi dữ liệu nào, đồng hồ vẫn chạy, rồi được chấm tự động theo tính toán, insight và đề xuất. Hiện có 12 case.', links: [['Thư viện case', 'case-thu-vien.html']] },
    { k: /(quiz|thu thach|phong thu thach|trac nghiem)/, a: 'Phòng thử thách có 31 tình huống: bạn chọn hướng đi, rồi đọc lý do của từng phương án. Làm lại bao nhiêu lần cũng được.', links: [['Phòng thử thách', 'quiz.html']] },
    { k: /(thi vuot chang|thi chang|de thi|vuot chang)/, a: 'Thi vượt chặng: một đề rút ngẫu nhiên từ toàn bộ bài của chặng, đúng từ 80% trở lên là qua chặng, không cần học lại từng bài.', links: [['Thi vượt chặng', 'thi.html']] },
    { k: /(phong van|interview)/, a: 'Luyện phỏng vấn có tình huống có số, hỏi vặn khi bạn thiếu số hoặc thiếu ý, cuối buổi có đáp án mẫu để tự so. Không chấm điểm.', links: [['Luyện phỏng vấn', 'phong-van.html']] },
    { k: /(dang nhap|google|tai khoan|luu tien do)/, a: 'Đăng nhập bằng Google là đủ. Tiến độ, XP và kết quả được lưu vào tài khoản và đồng bộ giữa các máy.', links: [['Đăng nhập', 'dang-nhap.html']] },
    { k: /(cong dong|dang bai|marsocial|thao luan)/, a: 'MarSocial là nơi chia sẻ phân tích chiến dịch, kinh nghiệm phỏng vấn và đặt câu hỏi. Có thăm dò mỗi ngày nữa.', links: [['MarSocial', 'cong-dong.html']] },
    { k: /(cam on|thanks|tuyet|hay qua)/, a: 'Rất vui được giúp bạn! Cứ hỏi thêm bất cứ lúc nào nhé.' },
    { k: /(xin chao|chao|hello|hi\b|alo)/, a: 'Chào bạn! Bạn muốn mình giải thích một thuật ngữ, gợi ý bài nên học, hay chỉ đường trong app?' }
  ];
  var glossP = null;
  function loadGlossary(base){
    if (typeof GLOSSARY !== 'undefined') return Promise.resolve(GLOSSARY);
    if (glossP) return glossP;
    glossP = new Promise(function(res){
      var s = document.createElement('script'); s.src = (base || '') + 'assets/js/data/glossary.js?v=1';
      s.onload = function(){ res(typeof GLOSSARY !== 'undefined' ? GLOSSARY : []); }; s.onerror = function(){ res([]); };
      document.head.appendChild(s);
    });
    return glossP;
  }
  function termAnswer(q, G){
    var nq = ' ' + norm(q).replace(/[^a-z0-9 ]/g, ' ') + ' ', best = null, score = 0;
    G.forEach(function(g){
      [g.vi, g.en, g.id].forEach(function(name){
        if (!name) return; var nn = ' ' + norm(name).replace(/[^a-z0-9 ]/g, ' ').trim() + ' ';
        if (nn.trim().length >= 2 && nq.indexOf(nn) > -1 && nn.length > score){ best = g; score = nn.length; }
      });
    });
    if (!best) return null;
    var t = best.vi + (best.en ? ' (' + best.en + ')' : '') + ': ' + best.def;
    if (best.formula) t += ' Công thức: ' + best.formula + '.';
    if (best.example) t += ' Ví dụ: ' + best.example;
    var links = (best.lessons || []).slice(0, 2).map(function(k){ var m = window.lessonMeta && lessonMeta(k); return m ? [m.t.length > 38 ? m.t.slice(0, 36) + '…' : m.t, 'bai.html?id=' + encodeURIComponent(k)] : null; }).filter(Boolean);
    return { a: t, links: links };
  }
  function lessonAnswer(q){
    if (typeof BAI_INDEX === 'undefined') return null;
    var toks = norm(q).replace(/[^a-z0-9 ]/g, ' ').split(' ').filter(function(w){ return w.length >= 3; });
    if (!toks.length) return null;
    var scored = BAI_INDEX.map(function(b){
      var h = norm(b.t + ' ' + (b.c || '')), sc = 0; toks.forEach(function(w){ if (h.indexOf(w) > -1) sc++; });
      return [sc, b];
    }).filter(function(x){ return x[0] >= Math.min(2, toks.length); }).sort(function(a, b){ return b[0] - a[0]; }).slice(0, 3);
    if (!scored.length) return null;
    return { a: 'Mình tìm được vài bài liên quan tới câu hỏi của bạn:', links: scored.map(function(x){ return [x[1].t.length > 48 ? x[1].t.slice(0, 46) + '…' : x[1].t, 'bai.html?id=' + encodeURIComponent(x[1].id)]; }) };
  }

  /* ---------- widget ---------- */
  var cfg = null, panel, log, fab, tipEl, aiState = null;
  function go(href){
    if (cfg.go) return cfg.go(href);
    location.href = href;
  }
  function addMsg(who){
    var m = document.createElement('div'); m.className = 'yy-m' + (who === 'me' ? ' yy-m--me' : '');
    log.appendChild(m); log.scrollTop = 1e9; return m;
  }
  function addLinks(m, links){
    if (!links || !links.length) return;
    var w = document.createElement('div'); w.className = 'yy-links';
    links.forEach(function(l){
      var a = document.createElement('a'); a.href = l[1]; a.textContent = l[0];
      a.onclick = function(e){ e.preventDefault(); go(l[1]); }; w.appendChild(a);
    });
    m.appendChild(w); log.scrollTop = 1e9;
  }
  async function say(text, links){
    var m = addMsg('yy'); m.innerHTML = '<span class="yy-dots"><i></i><i></i><i></i></span>';
    await sleep(380 + Math.min(500, text.length * 3));
    await YY.type(m, text);
    addLinks(m, links); log.scrollTop = 1e9;
  }
  YY.say = function(t, l){ return say(t, l); };

  async function aiConfigured(){
    if (aiState !== null) return aiState;
    aiState = false;
    try {
      if (typeof API !== 'undefined' && typeof api === 'function' && typeof account === 'function') {
        var u = await account();
        if (u) { var q = await api('/ai/quota'); aiState = !!(q && q.configured); }
      }
    } catch(e){}
    return aiState;
  }
  async function answer(q){
    var nq = norm(q);
    for (var i = 0; i < FAQ.length; i++) if (FAQ[i].k.test(nq)) return FAQ[i];
    var G = await loadGlossary(cfg.base);
    var t = termAnswer(q, G); if (t) return t;
    var l = lessonAnswer(q); if (l) return l;
    if (cfg.mode === 'app' && await aiConfigured()) {
      try {
        var r = await api('/ai/assist', { method: 'POST', body: { question: q, context: { page: document.title } } });
        return { a: r.reply };
      } catch(e){ if (e && e.message === 'quota_exceeded') return { a: 'Hôm nay bạn đã dùng hết lượt hỏi AI. Mình vẫn trả lời được thuật ngữ và gợi ý bài học nhé.' }; }
    }
    return { a: 'Mình chưa hiểu rõ câu này. Bạn thử hỏi một thuật ngữ (ví dụ “CAC là gì?”), hoặc hỏi “nên học gì trước?”, “case có bấm giờ là gì?”.',
      links: cfg.mode === 'app' ? [['Học bài', 'hoc-bai.html'], ['Thuật ngữ', 'thuat-ngu.html']] : null };
  }
  async function ask(q){
    q = String(q || '').trim(); if (q.length < 2) return;
    var m = addMsg('me'); m.textContent = q;
    var a = await answer(q);
    await say(a.a, a.links);
  }
  function build(){
    var solo = cfg.mode === 'landing';
    fab = document.createElement('button'); fab.className = 'yy-fab' + (solo ? ' yy-fab--solo' : ''); fab.type = 'button';
    fab.setAttribute('aria-label', 'Mở trò chuyện với Ý Ý'); fab.innerHTML = AV() + (solo ? '<b>Hỏi Ý Ý</b>' : '');
    panel = document.createElement('section'); panel.className = 'yy-panel' + (solo ? ' yy-panel--solo' : ''); panel.hidden = true;
    panel.setAttribute('aria-label', 'Trò chuyện với Ý Ý');
    panel.innerHTML = '<header class="yy-ph">' + AV() + '<div><b>Ý Ý</b><small>Bạn đồng hành học marketing</small></div><button class="yy-x" type="button" aria-label="Đóng">×</button></header>' +
      '<div class="yy-log" aria-live="polite"></div><div class="yy-chips"></div>' +
      '<form class="yy-f"><input type="text" maxlength="300" placeholder="Hỏi Ý Ý một thuật ngữ, một bài học…" aria-label="Câu hỏi"><button>Gửi</button></form>';
    document.body.appendChild(panel); document.body.appendChild(fab);
    log = panel.querySelector('.yy-log');
    var chips = panel.querySelector('.yy-chips');
    (cfg.chips || []).forEach(function(c){
      var b = document.createElement('button'); b.type = 'button'; b.textContent = c; b.onclick = function(){ ask(c); }; chips.appendChild(b);
    });
    var started = false;
    function open(){
      panel.hidden = false; hideTip(); fab.setAttribute('aria-expanded', 'true');
      if (!started){ started = true; say(cfg.greet); }
      panel.querySelector('input').focus();
    }
    fab.onclick = function(){ panel.hidden ? open() : (panel.hidden = true); };
    panel.querySelector('.yy-x').onclick = function(){ panel.hidden = true; };
    panel.querySelector('form').onsubmit = function(e){ e.preventDefault(); var i = e.target.querySelector('input'); var v = i.value; i.value = ''; ask(v); };
    YY.open = open;
  }
  function hideTip(){ if (tipEl){ tipEl.remove(); tipEl = null; } }
  /* lời nhắc ngắn, gõ chữ, tự tắt; hiện một lần mỗi phiên cho mỗi khoá key */
  YY.tip = function(key, text){
    /* Tối đa 2 lời nhắc mỗi phiên: nhắc ở mọi trang thì bong bóng thành lớp che nội dung (cột phải, nút "Làm ngay"). */
    try { var seen = JSON.parse(sessionStorage.getItem('yy.seen') || '{}'); if (seen[key] || Object.keys(seen).length >= 2) return; seen[key] = 1; sessionStorage.setItem('yy.seen', JSON.stringify(seen)); } catch(e){}
    if (!fab || !panel.hidden) return;
    hideTip();
    tipEl = document.createElement('div'); tipEl.className = 'yy-tip' + (cfg.mode === 'landing' ? ' yy-tip--solo' : ''); tipEl.setAttribute('role', 'status');
    tipEl.onclick = function(){ YY.open(); };
    document.body.appendChild(tipEl);
    var el = tipEl;
    var gone = function(){ if (tipEl === el) hideTip(); };
    YY.hideTip = gone;
    setTimeout(function(){
      ['wheel','touchmove','keydown','pointerdown'].forEach(function(ev){ document.addEventListener(ev, gone, { once: true, passive: true, capture: true }); });
      try { var fr = document.getElementById('frame'); if (fr && fr.contentWindow) ['wheel','touchmove','pointerdown'].forEach(function(ev){ fr.contentWindow.addEventListener(ev, gone, { once: true, passive: true, capture: true }); }); } catch (e) {}
    }, 1200);
    /* Giữ chỗ đúng cỡ cuối cùng trước khi gõ: hộp tự lớn dần theo từng chữ là nguồn gây layout shift (CLS). */
    if (!REDUCED) {
      el.style.visibility = 'hidden'; el.textContent = text;
      var w = el.offsetWidth, h = el.offsetHeight;
      el.textContent = ''; el.style.visibility = '';
      el.style.boxSizing = 'border-box'; el.style.width = w + 'px'; el.style.minHeight = h + 'px';
    }
        YY.type(el, text).then(function(){ setTimeout(gone, 5000); });
  };

  /* cấu hình: {mode:'app'|'landing'|'page', greet, chips, go, base} */
  YY.mount = function(c){
    if (window.__yyMounted) return; window.__yyMounted = true;
    cfg = c || {};
    cfg.mode = cfg.mode || 'page';
    cfg.greet = cfg.greet || 'Chào bạn, mình là Ý Ý. Bạn muốn hỏi về thuật ngữ, bài học hay cách dùng app?';
    cfg.chips = cfg.chips || ['CAC là gì?', 'Nên học gì trước?', 'Case có bấm giờ là gì?'];
    var run = function(){ build(); if (cfg.onReady) cfg.onReady(); };
    if (document.body) run(); else document.addEventListener('DOMContentLoaded', run);
  };
})();
