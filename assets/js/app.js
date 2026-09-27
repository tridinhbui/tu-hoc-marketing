/* TỰ HỌC MARKETING CASE — lõi ứng dụng.
   Toàn bộ tiến độ nằm trong localStorage của trình duyệt này, khoá 'thmc.v1'. Không tài khoản, không gửi đi đâu. */

/* ---------------- state ---------------- */
const APP_KEY='thmc.v1';
const APP_DEFAULT={ persona:null, path:null, done:{}, drills:{}, talks:{}, xp:0,
  streak:0, lastDay:null, freezes:0, errors:{}, log:[], theme:'light', read:18, focus:{} };
const S={
  get(){ try{ return {...APP_DEFAULT,...JSON.parse(localStorage.getItem(APP_KEY)||'{}')}; }catch(e){ return {...APP_DEFAULT}; } },
  set(p){ const s={...S.get(),...p}; try{ localStorage.setItem(APP_KEY,JSON.stringify(s)); }catch(e){} return s; },
};
const today=(d=new Date())=>{ const z=new Date(d.getTime()-d.getTimezoneOffset()*6e4); return z.toISOString().slice(0,10); };
const addDays=(iso,n)=>{ const d=new Date(iso+'T00:00:00'); d.setDate(d.getDate()+n); return today(d); };
const diffDays=(a,b)=>Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/864e5);

/* ---------------- nội dung: gom bài từ dữ liệu đã có ---------------- */
function lessonMeta(key){
  const [kind,id]=key.split(':');
  if(kind==='L'){ const l=LESSONS.find(x=>String(x.day)===id); if(!l) return null;
    return {key,kind,t:l.t,read:l.read||'6 phút',src:l}; }
  const p=PRINCIPLES.find(x=>x.id===id); if(!p) return null;
  return {key,kind,t:p.vi+(p.t&&p.t!==p.vi?' · '+p.t:''),read:'6 phút',src:p};
}
const ALL=STAGES.flatMap(s=>s.mods.flatMap(m=>m.lessons.map(k=>({key:k,stage:s,mod:m}))));
const where=key=>ALL.find(x=>x.key===key);
function pathLessons(pathId){ const p=PATHS.find(x=>x.id===pathId); return (p&&p.lessons)||ALL.map(x=>x.key); }

/* Chặng mở khi chặng trước xong ít nhất 60%. Chặng 01 luôn mở. Bài trong lộ trình đã chọn luôn mở. */
function stageOpen(sid,s=S.get()){
  const i=STAGES.findIndex(x=>x.id===sid); if(i<=0) return true;
  const prev=STAGES[i-1].mods.flatMap(m=>m.lessons); if(!prev.length) return true;
  return prev.filter(k=>s.done[k]).length/prev.length>=.6 && stageOpen(STAGES[i-1].id,s);
}
function lessonOpen(key,s=S.get()){
  if(s.done[key]) return true;
  if(s.path && s.path!=='full' && pathLessons(s.path).includes(key)) return true;
  const w=where(key); return !!w && stageOpen(w.stage.id,s);
}
function nextLesson(s=S.get()){
  const list=pathLessons(s.path||'full');
  return list.find(k=>!s.done[k]&&lessonOpen(k,s)) || ALL.map(x=>x.key).find(k=>!s.done[k]&&lessonOpen(k,s)) || null;
}
function hereStage(s=S.get()){ const n=nextLesson(s); return n?where(n).stage.id:null; }

/* ---------------- XP, cấp độ ---------------- */
const LEVELS=['Người quan sát','Người ghi chép','Người đặt câu hỏi','Thực tập sinh','Trợ lý marketing',
 'Người đọc số','Người viết brief','Marketing Executive','Người hiểu khách','Người kể chuyện',
 'Content Lead','Người giữ nhận diện','Người tính CAC','Performance Specialist','Brand Executive',
 'Người lập kế hoạch','Senior Executive','Assistant Brand Manager','Người bảo vệ ngân sách','Growth Manager',
 'Brand Manager','Người ra mắt sản phẩm','Senior Brand Manager','Category Lead','Head of Growth',
 'Marketing Manager','Head of Brand','Marketing Director','CMO','Người nhìn thấy'];
const lvXP=n=>Math.round(10*Math.pow(n-1,1.65));           // XP cần để đạt cấp n (1..30)
function level(xp=S.get().xp){ let n=1; for(let i=1;i<=30;i++) if(xp>=lvXP(i)) n=i;
  return {n,name:LEVELS[n-1],cur:lvXP(n),next:n<30?lvXP(n+1):null}; }
const XP={lesson:20,drill:15,talk:10,review:5,focus:15,quiz:2};

/* ---------------- streak + thẻ đóng băng ---------------- */
function touch(s=S.get()){
  const t=today(); if(s.lastDay===t) return s;
  let {streak,freezes}=s;
  const gap=s.lastDay?diffDays(s.lastDay,t):null;
  if(gap===1) streak++;
  else if(gap===2 && freezes>0){ freezes--; streak++; toast('Đã dùng một thẻ đóng băng — chuỗi vẫn giữ.'); }
  else streak=1;
  if(streak>0 && streak%7===0 && freezes<2) freezes++;   // mỗi 7 ngày liên tiếp được một thẻ, giữ tối đa 2
  return S.set({streak,freezes,lastDay:t});
}
function award(kind,ref,times=1){
  if(times<=0) return S.get();
  let s=touch(); const before=level(s.xp).n;
  s=S.set({xp:s.xp+XP[kind]*times, log:[...s.log.slice(-400),{d:today(),k:kind,r:ref}]});
  const after=level(s.xp);
  const st=document.querySelector('.top__stat'); if(st) st.textContent=`Cấp ${after.n} · ${fmt(s.xp)} XP · ${s.streak} ngày`;
  if(after.n>before) toast(`Lên cấp ${after.n} · ${after.name}`); else toast(`+${XP[kind]*times} XP`);
  return s;
}

/* ---------------- lỗi: ôn sau 1, 3, 7 ngày ---------------- */
function logError(code,lessonKey){
  const s=S.get(); const e=s.errors[code]||{count:0,lessons:[],step:0,due:null,first:today()};
  e.count++; e.step=0; e.due=addDays(today(),1); e.last=today();
  if(!e.lessons.includes(lessonKey)) e.lessons.push(lessonKey);
  S.set({errors:{...s.errors,[code]:e}});
}
const STEPS=[1,3,7];
function reviewed(code){
  const s=S.get(); const e=s.errors[code]; if(!e) return;
  e.step++; e.due = e.step<STEPS.length ? addDays(today(),STEPS[e.step]-STEPS[e.step-1]) : null;
  S.set({errors:{...s.errors,[code]:e}}); award('review',code);
}
function dueErrors(s=S.get()){ const t=today();
  return Object.entries(s.errors).filter(([,e])=>e.due&&e.due<=t).map(([c,e])=>({code:c,...e})); }
const mustDrill=(s=S.get())=>Object.entries(s.errors).filter(([,e])=>e.count>=3).map(([c,e])=>({code:c,...e}));

/* ---------------- nhiệm vụ: đếm từ nhật ký thật ---------------- */
function weekStart(){ const d=new Date(); const k=(d.getDay()+6)%7; d.setDate(d.getDate()-k); return today(d); }
function missions(s=S.get()){
  const t=today(), w=weekStart();
  const c=(k,from)=>s.log.filter(x=>x.k===k&&x.d>=from).length;
  return {
    daily:[
      {t:'Hoàn thành 1 bài học',have:c('lesson',t),need:1},
      {t:'Làm đúng 1 bài tính số',have:c('drill',t),need:1},
      {t:'Một phiên tập trung 25 phút',have:c('focus',t),need:1},
    ],
    weekly:[
      {t:'Học 3 bài trong tuần',have:c('lesson',w),need:3},
      {t:'Viết 2 câu trả lời 60 giây',have:c('talk',w),need:2},
      {t:'Ôn hết lỗi đến hạn',have:dueErrors(s).length?0:1,need:1},
    ]};
}

/* ---------------- số: hiểu "1.200", "1,5", "300k", "4 tr" ---------------- */
function parseNum(raw){
  let s=String(raw||'').trim().toLowerCase().replace(/\s+/g,'').replace(/đồng|vnd|lần|người|khách|ly|[đ%]/g,'');
  let mult=1;
  if(/(triệu|tr)$/.test(s)){ mult=1e6; s=s.replace(/(triệu|tr)$/,''); }
  else if(/k$/.test(s)){ mult=1e3; s=s.slice(0,-1); }
  if(!s) return NaN;
  if(s.includes('.')&&s.includes(',')) s=s.replace(/\./g,'').replace(',','.');      // 1.234,5
  else if(/^\d{1,3}([.,]\d{3})+$/.test(s)) s=s.replace(/[.,]/g,'');                  // 1.200 · 400,000
  else s=s.replace(',','.');                                                         // 1,5 · 0.6
  const n=Number(s); return isFinite(n)?n*mult:NaN;
}
const fmt=n=>Number(n).toLocaleString('vi-VN',{maximumFractionDigits:2});

/* ---------------- shell ---------------- */
const APP_NAV=[['Học','hoc.html'],['Bắt đầu từ đâu','ban-do.html'],['Quiz 60 giây','quiz.html'],['Ôn lỗi','on-loi.html'],['Thư viện case','gallery.html'],['Bàn làm việc','roadmap.html']];
function applyTheme(s=S.get()){
  document.documentElement.dataset.theme=s.theme==='light'?'':s.theme;
  document.documentElement.style.setProperty('--read',(s.read||18)+'px');
}
function appShell(here){
  const s=S.get(); applyTheme(s); const lv=level(s.xp);
  const main=document.querySelector('main'); if(main&&!main.id) main.id='main';
  document.body.insertAdjacentHTML('afterbegin',`
    <a class="skip" href="#main">Tới nội dung chính</a>
    <header class="top"><div class="wrap top__in">
      <a class="logo" href="gioi-thieu.html"><b>Tự Học</b> Marketing Case<span>MIỄN PHÍ</span></a>
      <nav class="nav" aria-label="Chính">${APP_NAV.map(([t,h])=>`<a href="${h}"${h===here?' aria-current="page"':''}>${t}</a>`).join('')}</nav>
      <span class="top__stat" title="Cấp độ · XP · chuỗi ngày">Cấp ${lv.n} · ${fmt(s.xp)} XP · ${s.streak} ngày</span>
    </div></header>`);
  document.body.insertAdjacentHTML('beforeend',`
    <footer class="foot"><div class="wrap row between">
      <span>Tự Học Marketing Case · miễn phí. Mọi số liệu trong ví dụ là minh hoạ trừ khi ghi rõ nguồn.</span>
      <span>Tiến độ lưu trong trình duyệt này, không gửi đi đâu.</span>
    </div></footer><div class="toast" id="toast" role="status" aria-live="polite"></div>`);
}
function toast(m){ const t=document.getElementById('toast'); if(!t) return; t.textContent=m; t.classList.add('on');
  clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove('on'),2200); }
const escH=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const qp=k=>new URLSearchParams(location.search).get(k);

/* ---------------- quiz: câu hỏi sinh từ chính nội dung bài học ---------------- */
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function drillMCQ(key){
  const D=DRILLS[key]; if(!D) return null;
  const vals=[D.ans,...D.wrong.map(w=>w[0])];
  for(const x of [D.ans*2,D.ans/2]) if(vals.length<4&&!vals.some(v=>Math.abs(v-x)<1e-9)) vals.push(Math.round(x*100)/100);
  const uniq=[...new Set(vals)];
  return {key,type:'drill',q:D.q,ctx:D.rows.map(r=>r[0]+': '+r[1]).join(' · '),
    opts:shuffle(uniq).map(v=>({t:fmt(v)+' '+D.unit,ok:v===D.ans,code:(D.wrong.find(w=>w[0]===v)||[])[1]||null}))};
}
function conceptMCQ(key){
  const m=lessonMeta(key); if(!m) return null;
  if(m.kind==='L'){
    const others=shuffle(LESSONS.filter(l=>'L:'+l.day!==key)).slice(0,2);
    return {key,type:'idea',q:`Ý chính của bài “${m.t}” là gì?`,
      opts:shuffle([{t:m.src.idea,ok:true},...others.map(o=>({t:o.idea,ok:false}))])};
  }
  const others=shuffle(PRINCIPLES.filter(p=>'P:'+p.id!==key)).slice(0,2);
  return {key,type:'def',q:`Câu nào nói đúng về ${m.src.vi} (${m.src.t})?`,
    opts:shuffle([{t:m.src.one,ok:true},...others.map(o=>({t:o.one,ok:false}))])};
}
function quizBank(keys){ return shuffle(keys.flatMap(k=>[conceptMCQ(k),drillMCQ(k)]).filter(Boolean)); }
