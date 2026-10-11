/* Gõ chữ cho các đoạn mô tả đầu trang (Ý Ý): nạp yy.js khi trang chưa có, một lần mỗi phiên cho mỗi trang. */
(function(){
  if (window.top === window.self) return;
  var file = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  if (/^(index|dang-nhap|luyen|thi|giai-case)$/.test(file)) return;      // trang có đồng hồ / thi: không làm chậm đọc đề
  var SEL = '.lede, .rm__lede, .cm-head p, .hero p, .d-mission h1, .pv-main .hero p';
  function run(){ try { YY.autoType(SEL, { once: 'p:' + file }); } catch (e) {} }
  function boot(){
    if (window.YY) return setTimeout(run, 500);
    var s = document.createElement('script'); s.src = 'assets/js/yy.js?v=3'; s.onload = function(){ setTimeout(run, 500); };
    document.head.appendChild(s);
  }
  if (document.readyState === 'complete') boot(); else window.addEventListener('load', boot);
})();
/* PAPER — chèn ảnh minh hoạ rách mép + chữ viết tay vào đầu trang (trong khung app). Không đụng cấu trúc trang. */
(function(){
  if(window.top===window.self) return;                                       // chỉ trong khung app
  var file=(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
  var SKIP={'hoc':1,'hoc-bai':1,'cong-dong':1,'bai':1,'index':1,'dang-nhap':1,'luyen':1,'giai-case':1,'quiz':1,'phong-van':1};
  var BIG={'thi':1,'xep-lop':1,'kingdom':1};
  if(SKIP[file]) return;
  var ART=['art-journey.svg','art-notebook.svg','art-panorama.svg','art-megaphone.svg','art-funnel.svg'];
  var CAP=['Nhìn kỹ trước, làm sau','Từng bước nhỏ, đổi lớn','Học thật. Làm được.','Mỗi quyết định có một lý do','Mỗi ngày một bước'];
  var h=0; for(var i=0;i<file.length;i++) h=(h*31+file.charCodeAt(i))>>>0;
  function put(){
    if(document.querySelector('.pp-art')) return;
    var el=document.createElement('div'); el.className='pp-art'+(BIG[file]?' pp-art--lg':''); el.setAttribute('aria-hidden','true');
    el.innerHTML='<img src="assets/img/'+ART[h%ART.length]+'" alt=""><i>'+CAP[h%CAP.length]+'</i>';
    document.body.insertBefore(el,document.body.firstChild);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',put); else put();
  /* body cần là mốc định vị để ảnh bám góc trên */
  var st=getComputedStyle(document.body); if(st.position==='static') document.body.style.position='relative';
})();
