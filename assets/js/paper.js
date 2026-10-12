/* ATELIER — hai việc nhỏ cho mọi trang trong khung app:
   1) dòng folio kiểu tạp chí ở đầu trang (tên ấn phẩm · trang đang xem · ngày);
   2) "editorial reveal": phần tử có data-at hiện dần khi cuộn tới. Không có JS thì mọi thứ hiện sẵn. */
(function(){
  var doc=document, root=doc.documentElement, reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var file=(location.pathname.split('/').pop()||'').replace(/\.html$/,'');

  /* ---- reveal ---- */
  if(!reduce && 'IntersectionObserver' in window){
    root.classList.add('at-js');
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{rootMargin:'0px 0px -8% 0px',threshold:.06});
    var scan=function(n){
      (n.querySelectorAll?n.querySelectorAll('[data-at]:not(.in)'):[]).forEach(function(el,i){
        if(el.__at) return; el.__at=1; el.style.setProperty('--d',(Math.min(i,4)*.08)+'s'); io.observe(el); });
    };
    var start=function(){ scan(doc); new MutationObserver(function(ms){ ms.forEach(function(m){ m.addedNodes.forEach(function(n){ if(n.nodeType===1){ if(n.matches&&n.matches('[data-at]')) scan({querySelectorAll:function(){return [n];}}); scan(n); } }); }); }).observe(doc.body,{childList:true,subtree:true}); };
    if(doc.readyState==='loading') doc.addEventListener('DOMContentLoaded',start); else start();
  }

  /* ---- folio ---- */
  if(window.top===window.self) return;                                       // chỉ trong khung app
  var SKIP={'bai':1,'index':1,'dang-nhap':1,'luyen':1,'thi':1,'giai-case':1,'quiz':1,'phong-van':1,'app':1};
  if(SKIP[file]) return;
  function put(){
    if(doc.querySelector('.at-folio')||!doc.body) return;
    var parts=(doc.title||'').split(/\s[—–]\s/).filter(function(x){return x&&!/^Tự Học Marketing/.test(x);});
    if(parts.length>1&&/^Bàn làm việc$/i.test(parts[0])) parts.shift();
    var t=parts[0]||'';
    var d=new Date(), mon=['Th1','Th2','Th3','Th4','Th5','Th6','Th7','Th8','Th9','Th10','Th11','Th12'][d.getMonth()];
    var el=doc.createElement('div'); el.className='at-folio'; el.setAttribute('aria-hidden','true');
    el.innerHTML='<span><b>Tự Học Marketing</b></span><i>'+t.replace(/[<>&]/g,'')+'</i><span>'+d.getDate()+' '+mon+' · '+d.getFullYear()+'</span>';
    doc.body.insertBefore(el,doc.body.firstChild);
  }
  if(doc.readyState==='loading') doc.addEventListener('DOMContentLoaded',put); else put();
})();
