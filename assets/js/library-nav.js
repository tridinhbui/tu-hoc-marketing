/* Ba thư viện case dùng chung một thanh chuyển chế độ, và campaign ⇄ thương hiệu nối với nhau.
   Đọc case thật (gallery) · Tự dự đoán trước khi đọc (xray) · Giải case có bấm giờ (case-thu-vien). */
(function(){
  var page=(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
  var cnt=function(n){ try{ return eval('typeof '+n+'!=="undefined"?'+n+'.length:0'); }catch(e){ return 0; } };
  var TABS=[
    {id:'gallery', h:'gallery.html', t:'Đọc case thật', s:'Campaign kinh điển, đọc như case study', on:['gallery','campaign']},
    {id:'xray', h:'xray.html', t:'Tự dự đoán trước', s:'Viết nhận định trước, mở phân tích sau', on:['xray','brand']},
    {id:'case', h:'case-thu-vien.html', t:'Giải case có bấm giờ', s:'Số liệu mở theo câu hỏi, chấm tự động', on:['case-thu-vien','giai-case']},
  ];
  var MAP={'nike-dream-crazy':'nike','apple-1984':'apple','bitis-hunter':'bitis','highlands-third-place':'highlands','vinamilk-rebrand':'vinamilk'};
  var host=document.querySelector('main')||document.body;
  var bar=document.createElement('nav');
  bar.setAttribute('aria-label','Thư viện case');
  bar.style.cssText='display:flex;gap:8px;flex-wrap:wrap;max-width:1180px;margin:0 auto;padding:14px clamp(16px,3vw,32px) 0';
  bar.innerHTML=TABS.map(function(t){
    var on=t.on.indexOf(page)>-1;
    return '<a href="'+t.h+'" style="display:inline-flex;flex-direction:column;gap:2px;padding:9px 16px;border-radius:12px;text-decoration:none;'+
      'border:1px solid '+(on?'var(--accent,var(--terra,#C85A32))':'var(--ink-14,rgba(0,0,0,.15))')+';'+
      'background:'+(on?'var(--accent,var(--terra,#C85A32))':'transparent')+';color:'+(on?'#fff':'var(--ink,inherit)')+';font:600 13.5px/1.2 var(--sans,system-ui)">'+
      t.t+'<small style="font-weight:500;opacity:.75;font-size:11.5px">'+t.s+'</small></a>';
  }).join('');
  host.parentNode.insertBefore(bar,host);

  /* campaign ⇄ brand: chỉ hiện khi hai bên cùng có dữ liệu cho thương hiệu đó. */
  if(page==='campaign'||page==='brand'){
    var id=window.__ID__||new URLSearchParams(location.search).get('id'); if(!id) return;
    var href=null,label='';
    if(page==='campaign' && MAP[id]){ href='brand.html?id='+MAP[id]; label='Tự bóc tách thương hiệu này trước khi đọc đáp án → Brand X-Ray'; }
    if(page==='brand'){ for(var k in MAP){ if(MAP[k]===id){ href='campaign.html?id='+k; label='Đọc case chiến dịch của thương hiệu này → Campaign Gallery'; } } }
    if(href){
      var a=document.createElement('a'); a.href=href; a.textContent=label;
      a.style.cssText='display:block;max-width:1180px;margin:28px auto 56px;padding:16px 20px;border:1px solid var(--accent,var(--terra,#C85A32));border-radius:14px;color:var(--accent,var(--terra,#C85A32));font:600 14.5px var(--sans,system-ui);text-decoration:none';
      host.appendChild(a);
    }
  }
})();
