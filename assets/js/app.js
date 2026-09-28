/* TỰ HỌC MARKETING CASE — lõi ứng dụng.
   Toàn bộ tiến độ nằm trong localStorage của trình duyệt này, khoá 'thmc.v1'. Không tài khoản, không gửi đi đâu. */

/* ---------------- state ---------------- */
const APP_KEY='thmc.v1';
const APP_DEFAULT={ persona:null, path:null, done:{}, drills:{}, talks:{}, xp:0,
  streak:0, lastDay:null, freezes:0, errors:{}, log:[], theme:'light', read:18, focus:{}, quizHits:{}, cases:{}, chests:{}, best:0, games:[] };
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
  /* Chặng trước có đề thi thì cổng là đề thi, không phải tỉ lệ bài đã đọc.
     Chặng nào chưa soạn đề thì vẫn dùng luật cũ 60% — không chặn người học vì
     mình chưa viết xong nội dung. */
  const prevId=STAGES[i-1].id;
  if(typeof EXAMS!=='undefined' && EXAMS[prevId])
    return !!((s.exams||{})[prevId]||{}).passed && stageOpen(prevId,s);
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
/* ---------------- cấp độ ----------------
   Bảng 30 mốc cố định (đặc tả cơ chế XP). Tên cấp giữ theo nghề marketing.
   Một bảng duy nhất: server tính bảng xếp hạng cũng đọc XP rồi tra đúng bảng này. */
const LEVEL_MIN=[0,30,100,250,500,900,1500,2400,3600,5200,7500,10500,14500,20000,27000,
  35000,44000,54000,65000,77000,90000,104000,120000,138000,158000,180000,205000,233000,265000,300000];
const lvXP=n=>LEVEL_MIN[Math.max(1,Math.min(30,n))-1];
function level(xp=S.get().xp){ let n=1; for(let i=1;i<=30;i++) if(xp>=lvXP(i)) n=i;
  return {n,name:LEVELS[n-1],cur:lvXP(n),next:n<30?lvXP(n+1):null}; }

/* ---------------- XP: thưởng HỌC, không thưởng BẤM ----------------
   Mọi con số hứa trên giao diện đọc từ đây.
   ONE_TIME: mỗi (loại, mục) chỉ cộng một lần, có chống cộng trùng giữa các máy.
   DAILY_CAP: nguồn lặp lại được, có trần theo ngày địa phương. */
const XP={lesson:10,learned:5,solid:10,exam:50,drill:15,talk:10,review:2,focus:15,quiz:2,case:40,game:30,daily:10};
const XP_ONCE={lesson:'lesson',learned:'lesson',solid:'solid',exam:'exam',drill:'drill',talk:'talk',case:'case'};
const XP_CAP={review:40,quiz:60,game:50,focus:15,daily:10};
const STREAK_RESTORE_XP=150, STREAK_RESTORE_DAYS=3, FREE_FREEZES=3;
/* "Một ngày học" = có hoạt động học thật: bài, ôn, bài tính, case, thi. Mở quiz 60 giây hay chơi game không tính. */
const STREAK_KINDS=new Set(['lesson','learned','solid','review','drill','talk','case','exam','focus']);

/* Sổ cái: s.xpl = { khoá: {x, d} }. Tổng XP là phép cộng của sổ — không cộng dồn mù.
   Lần đầu chạy: toàn bộ XP cũ vào một dòng "legacy" để không ai mất điểm, và mọi thứ đã làm
   được đánh dấu "đã trả" (x = 0) để làm lại không được cộng lần hai. */
function ledger(s=S.get()){
  if(s.xpl) return s;
  const xpl={'legacy:base':{x:s.xp||0,d:today()}};
  for(const k of Object.keys(s.done||{})) xpl['lesson:'+k]={x:0,d:s.done[k]};
  for(const k of Object.keys(s.drills||{})) xpl['drill:'+k]={x:0,d:s.drills[k]};
  for(const k of Object.keys(s.talks||{})) xpl['talk:'+k]={x:0,d:today()};
  for(const [id,list] of Object.entries(s.cases||{})) if((list||[]).some(a=>a.passed)) xpl['case:'+id]={x:0,d:today()};
  return S.set({xpl, xp:xpSum(xpl), fzBought:Math.max(s.fzBought||0,s.freezes||0), fzUsed:s.fzUsed||0});
}
const xpSum=(xpl)=>Math.max(0,Object.values(xpl||{}).reduce((n,e)=>n+(e.x||0),0));
function xpToday(kind,s=S.get()){ return ((s.xpl||{})[kind+'@'+today()]||{}).x||0; }
const freezesLeft=(s=S.get())=>Math.max(0,FREE_FREEZES+(s.fzBought||0)-(s.fzUsed||0));

/* ---------------- streak + thẻ đóng băng ----------------
   Bỏ lỡ bao nhiêu ngày cũng vậy: còn thẻ thì tốn một thẻ và chuỗi vẫn giữ; hết thẻ thì chuỗi về 1,
   nhưng chuỗi cũ được nhớ lại để mua lại trong 3 ngày bằng 150 XP. Không bao giờ trừ XP khi mất chuỗi. */
function touch(s=S.get()){
  const t=today(); if(s.lastDay===t) return s;
  let {streak=0}=s, fzUsed=s.fzUsed||0, brokeFrom=s.brokeFrom||null, brokeAt=s.brokeAt||null;
  const gap=s.lastDay?diffDays(s.lastDay,t):null;
  if(gap===1) streak++;
  else if(gap!==null && gap>1 && freezesLeft(s)>0){ fzUsed++; streak++;
    setTimeout(()=>toast(`Đã dùng 1 thẻ đóng băng — chuỗi ${streak} ngày vẫn giữ. Còn ${Math.max(0,FREE_FREEZES+(s.fzBought||0)-fzUsed)} thẻ.`),600); }
  else if(gap!==null && gap>1){ brokeFrom=streak; brokeAt=t; streak=1; }
  else streak=1;
  if(streak>1){ brokeFrom=null; brokeAt=null; }
  return S.set({streak,fzUsed,brokeFrom,brokeAt,lastDay:t,best:Math.max(s.best||0,streak)});
}
function canRestoreStreak(s=S.get()){
  return !!(s.brokeFrom && s.brokeFrom>(s.streak||0) && s.brokeAt && diffDays(s.brokeAt,today())<=STREAK_RESTORE_DAYS
    && (s.xp||0)>=STREAK_RESTORE_XP);
}
function restoreStreak(){
  let s=ledger(); if(!canRestoreStreak(s)) return false;
  const xpl={...s.xpl,['spend:restore:'+today()]:{x:-STREAK_RESTORE_XP,d:today()}};
  s=S.set({xpl,xp:xpSum(xpl),streak:s.brokeFrom,brokeFrom:null,brokeAt:null,lastDay:today(),best:Math.max(s.best||0,s.brokeFrom)});
  scheduleSync(); toast(`Đã mua lại chuỗi ${s.streak} ngày · −${STREAK_RESTORE_XP} XP`); return true;
}

/* award(kind, ref, times): trả về state; số XP thật sự cộng nằm ở award.last. */
function award(kind,ref,times=1){
  award.last=0;
  if(times<=0||!(kind in XP)) return S.get();
  let s=ledger();
  if(STREAK_KINDS.has(kind)) s=touch(s);
  const before=level(s.xp).n, want=XP[kind]*times, xpl={...s.xpl};
  let key, got=want;
  // Mốc một lần: chỉ bù phần chênh (đã học 5 → đạt 10 thì cộng thêm 5). Mốc 0 XP của dữ liệu cũ thì không bù.
  if(XP_ONCE[kind]){ key=XP_ONCE[kind]+':'+ref; if(xpl[key]) got=xpl[key].x>0?Math.max(0,want-xpl[key].x):0; }
  else if(XP_CAP[kind]){ key=kind+'@'+today(); got=Math.max(0,Math.min(want,XP_CAP[kind]-((xpl[key]||{}).x||0))); }
  else key=kind+':'+ref+':'+Date.now();
  if(got>0){ xpl[key]={x:((xpl[key]||{}).x||0)+got,d:today()}; }
  else if(XP_ONCE[kind]&&!xpl[key]) xpl[key]={x:0,d:today()};
  s=S.set({xpl, xp:xpSum(xpl), log:got>0?[...s.log.slice(-400),{d:today(),k:kind,r:ref,x:got,t:Date.now()}]:s.log});
  award.last=got;
  if(got>0) scheduleSync();
  const after=level(s.xp);
  const st=document.querySelector('.top__stat'); if(st) st.textContent=`Cấp ${after.n} · ${fmt(s.xp)} XP · ${s.streak} ngày`;
  if(after.n>before) toast(`Lên cấp ${after.n} · ${after.name}`);
  else if(got>0) toast(`+${got} XP`);
  else if(XP_CAP[kind]&&want>0) toast('Đã đủ XP hôm nay cho mục này — vẫn học được, chỉ không cộng thêm.');
  return s;
}

/* ---------------- trạng thái bài: đang học → đã học (chưa vững) → đạt → vững ----------------
   Điểm bài là điểm LẦN ĐẦU. Làm lại để học, không để nâng điểm. */
const LESSON_PASS=0.6;
const LESSON_RANK={learned:1,passed:2,solid:3};
function lessonState(k,s=S.get()){
  const r=(s.lessons||{})[k]; if(r) return r;
  return s.done&&s.done[k]?{state:'learned',source:'legacy'}:null;
}
function completeLesson(k,right,total,source='lesson'){
  const s=ledger(), prev=(s.lessons||{})[k];
  if(source==='lesson' && prev && prev.score!=null) return prev;   // đã có điểm lần đầu: giữ nguyên
  const graded=source==='lesson'&&total>0;
  const score=graded?Math.round(right/total*100):(prev?prev.score:null)??null;
  let state=(source!=='lesson'||score>=LESSON_PASS*100)?'passed':'learned';
  if(prev&&LESSON_RANK[prev.state]>LESSON_RANK[state]) state=prev.state;   // không bao giờ tụt trạng thái
  const rec={...(prev||{}),state,score,
    right:graded?right:prev?prev.right:null, total:graded?total:prev?prev.total:null,
    source:graded||!prev?source:source==='stage_exam'?'stage_exam':prev.source, at:(prev&&prev.at)||today()};
  S.set({lessons:{...(s.lessons||{}),[k]:rec}, done:{...(s.done||{}),[k]:(s.done||{})[k]||today()}});
  if(source!=='stage_exam') award(state==='passed'?'lesson':'learned',k);   // qua đề chặng đã có XP của đề
  return rec;
}
/* Vững = nhớ lại đúng ở một ngày khác, cách lần học ít nhất 3 ngày. */
function markSolid(k){
  const s=S.get(), r=(s.lessons||{})[k];
  if(!r||r.state==='solid'||diffDays(r.at,today())<3) return false;
  S.set({lessons:{...s.lessons,[k]:{...r,state:'solid',solidAt:today()}}}); award('solid',k); return true;
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
  if(/(tỷ|tỉ)$/.test(s)){ mult=1e9; s=s.replace(/(tỷ|tỉ)$/,''); }
  else if(/(triệu|tr)$/.test(s)){ mult=1e6; s=s.replace(/(triệu|tr)$/,''); }
  else if(/k$/.test(s)){ mult=1e3; s=s.slice(0,-1); }
  let sign=1; if(/^[-−]/.test(s)){ sign=-1; s=s.slice(1); }
  if(!s) return NaN;
  if(s.includes('.')&&s.includes(',')) s=s.replace(/\./g,'').replace(',','.');      // 1.234,5
  else if(/^\d{1,3}([.,]\d{3})+$/.test(s)) s=s.replace(/[.,]/g,'');                  // 1.200 · 400,000
  else s=s.replace(',','.');                                                         // 1,5 · 0.6
  const n=Number(s); return isFinite(n)?sign*n*mult:NaN;
}
const fmt=n=>Number(n).toLocaleString('vi-VN',{maximumFractionDigits:2});

/* ---------------- shell ---------------- */
const APP_NAV=[['Học','hoc.html'],['Học bài','hoc-bai.html'],['Bắt đầu từ đâu','ban-do.html'],['Quiz 60 giây','quiz.html'],['Case có giờ','case-thu-vien.html'],['Năng lực','nang-luc.html'],['Ôn lỗi','on-loi.html'],['Cộng đồng','cong-dong.html'],['Xếp hạng','bang-xep-hang.html'],['Bàn làm việc','roadmap.html']];
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
      <a class="top__stat" id="acct" href="tai-khoan.html" style="text-decoration:none">Tài khoản</a>
    </div></header>`);
  document.body.insertAdjacentHTML('beforeend',`
    <footer class="foot"><div class="wrap row between">
      <span>Tự Học Marketing Case · miễn phí. Mọi số liệu trong ví dụ là minh hoạ trừ khi ghi rõ nguồn.</span>
      <span>Tiến độ lưu trong trình duyệt này, không gửi đi đâu.</span>
    </div></footer><div class="toast" id="toast" role="status" aria-live="polite"></div>`);
  account().then(u=>{ const a=document.getElementById('acct'); if(!a) return;
    a.textContent = u ? u.name : (API.on ? 'Đăng nhập' : 'Tài khoản');
    if(!u && API.on){                       // chưa đăng nhập: nút rõ ràng, quay lại đúng trang đang đọc
      const here=(location.pathname.split('/').pop()||'hoc.html')+location.search;
      a.className='btn'; a.style.cssText='padding:7px 14px;font-size:13px;text-decoration:none';
      if(!/^tai-khoan\.html/.test(here)) a.href='tai-khoan.html?next='+encodeURIComponent(here); }
    if(u){ syncNow(); mountAssistant(); } });
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

/* ---------------- năng lực: mức chỉ lên từ bài nộp, không tự đánh giá ----------------
   1 Nhận biết  — trả lời đúng ít nhất một câu quiz hoặc bài tính số thuộc năng lực này
   2 Áp dụng    — làm đúng bài tính số của năng lực, hoặc đúng ≥3 câu quiz, và không còn lỗi bắt buộc chưa xử lý
   3 Phân tích  — đạt tiêu chí gắn với năng lực này trong một case có bấm giờ
   4 Thuyết phục — đạt tiêu chí đó trong một case đạt tổng thể VÀ phần nói 60 giây cũng đạt */
function caseAttempts(s=S.get()){ return Object.entries(s.cases||{}).flatMap(([id,list])=>list.map(a=>({id,...a}))); }
function compLevel(c,s=S.get()){
  const drillOk=c.lessons.filter(k=>s.drills[k]).length;
  const qh=c.lessons.reduce((n,k)=>n+((s.quizHits||{})[k]||0),0);
  const blocked=mustDrill(s).some(e=>e.lessons.some(k=>c.lessons.includes(k)));
  const cs=typeof CASES!=='undefined'?CASES:[];
  const hitsFor=a=>{const cd=cs.find(x=>x.id===a.id); if(!cd) return false;
    return Object.entries(cd.comps).some(([crit,ids])=>ids.includes(c.id)&&a.pass&&a.pass[crit]);};
  const att=caseAttempts(s);
  const l3=att.filter(hitsFor), l4=l3.filter(a=>a.passed&&a.pass.structure);
  let n=0, why='Chưa có bài nộp nào thuộc năng lực này.';
  if(drillOk+qh>=1){ n=1; why=`${drillOk} bài tính số đúng · ${qh} câu quiz đúng.`; }
  if((drillOk>=1||qh>=3)&&!blocked){ n=2; why=`${drillOk} bài tính số đúng · ${qh} câu quiz đúng · không còn lỗi bắt buộc.`; }
  else if(n===1&&blocked) why+=' Còn lỗi bắt buộc chưa xử lý nên chưa lên được mức Áp dụng.';
  if(l3.length){ n=3; why=`Đạt tiêu chí liên quan trong ${new Set(l3.map(a=>a.id)).size} case có bấm giờ.`; }
  if(l4.length){ n=4; why='Đạt case tổng thể và phần nói 60 giây cũng đạt.'; }
  return {n,why};
}

/* ---------------- tài khoản & đồng bộ (cần backend /api) ----------------
   Không có backend (chỉ deploy trang tĩnh) thì mọi thứ vẫn chạy bằng localStorage như cũ. */
const API={on:null, user:undefined};
async function api(path,{method='GET',body}={}){
  const r=await fetch('/api'+path,{method,credentials:'same-origin',
    headers:{'x-thmc':'1',...(body!==undefined?{'content-type':'application/json'}:{})},
    body:body!==undefined?JSON.stringify(body):undefined});
  const ct=r.headers.get('content-type')||'';
  if(!ct.includes('application/json')){ API.on=false; throw Object.assign(new Error('no_api'),{status:r.status}); }
  API.on=true;
  const data=await r.json();
  if(!r.ok) throw Object.assign(new Error(data.error||'error'),{status:r.status,data});
  return data;
}
async function account(){
  if(API.user!==undefined) return API.user;
  try{ API.user=(await api('/me')).user; }catch(e){ API.user=null; }
  return API.user;
}
/* Gộp hai bản trạng thái — cùng quy tắc với server (api/src/state.js). */
function mergeState(a={},b={}){
  const obj=(x,y)=>({...(x||{}),...(y||{})});
  const later=(b.lastDay||'')>=(a.lastDay||'')?b:a;
  const errors={...(a.errors||{})};
  for(const [k,e] of Object.entries(b.errors||{})){ const o=errors[k];
    errors[k]=!o?e:{...(e.count>=o.count?e:o),lessons:[...new Set([...(o.lessons||[]),...(e.lessons||[])])]}; }
  const seen=new Set(), log=[];
  for(const x of [...(a.log||[]),...(b.log||[])]){ const id=`${x.d}|${x.k}|${x.r}|${x.x??''}|${x.t??''}`; if(!seen.has(id)){seen.add(id);log.push(x);} }
  log.sort((p,q)=>p.d<q.d?-1:p.d>q.d?1:0);
  const cases={};
  for(const id of new Set([...Object.keys(a.cases||{}),...Object.keys(b.cases||{})])){ const m=new Map();
    for(const t of [...((a.cases||{})[id]||[]),...((b.cases||{})[id]||[])]) m.set(`${t.date}|${t.secs}|${(t.asked||[]).join(',')}`,t);
    cases[id]=[...m.values()].slice(-10); }
  const quizHits={...(a.quizHits||{})}; for(const [k,v] of Object.entries(b.quizHits||{})) quizHits[k]=Math.max(quizHits[k]||0,v);
  const gm=new Map(); for(const g of [...(a.games||[]),...(b.games||[])]) gm.set(`${g.d}|${g.cash}`,g);
  /* Sổ cái XP: hợp theo khoá. Cùng khoá ở hai máy (ví dụ trần ngày) lấy dòng lớn hơn — không bao giờ cộng trùng. */
  const xpl={...(a.xpl||{})};
  for(const [k,e] of Object.entries(b.xpl||{})){ const o=xpl[k]; xpl[k]=!o||Math.abs(e.x||0)>=Math.abs(o.x||0)?e:o; }
  /* Trạng thái bài: giữ bậc cao hơn; điểm lần đầu lấy bản sớm hơn. */
  const lessons={...(a.lessons||{})};
  for(const [k,r] of Object.entries(b.lessons||{})){ const o=lessons[k];
    if(!o){ lessons[k]=r; continue; }
    const hi=(LESSON_RANK[r.state]||0)>=(LESSON_RANK[o.state]||0)?r:o, early=(o.at||'9')<=(r.at||'9')?o:r;
    lessons[k]={...hi,score:early.score,right:early.right,total:early.total,at:early.at}; }
  const hasLedger=!!(a.xpl||b.xpl);
  /* Thi vượt chặng: đã qua ở máy nào thì giữ (lấy ngày sớm nhất); số lần và điểm tốt nhất lấy lớn hơn. */
  const exams={...(a.exams||{})};
  for(const [k,e] of Object.entries(b.exams||{})){ const o=exams[k]; if(!o){ exams[k]=e; continue; }
    const passed=[o.passed,e.passed].filter(Boolean).sort()[0]||null;
    exams[k]={attempts:Math.max(o.attempts||0,e.attempts||0),best:Math.max(o.best||0,e.best||0),passed,
      lockUntil:passed?null:Math.max(o.lockUntil||0,e.lockUntil||0)||null}; }
  const modq={...(a.modq||{})};
  for(const [k,e] of Object.entries(b.modq||{})){ const o=modq[k]; if(!o){ modq[k]=e; continue; }
    modq[k]={best:Math.max(o.best||0,e.best||0),of:Math.max(o.of||0,e.of||0),tries:Math.max(o.tries||0,e.tries||0),
      last:[o.last,e.last].filter(Boolean).sort().pop()||null,passed:!!(o.passed||e.passed)}; }
  return {...a,...b, done:obj(a.done,b.done), drills:obj(a.drills,b.drills), talks:obj(a.talks,b.talks), chests:obj(a.chests,b.chests), flags:obj(a.flags,b.flags), flags:obj(a.flags,b.flags),
    errors, log:log.slice(-800), cases, quizHits, games:[...gm.values()].slice(-20),
    xpl:hasLedger?xpl:undefined, lessons, exams, modq,
    xp:hasLedger?xpSum(xpl):Math.max(a.xp||0,b.xp||0), best:Math.max(a.best||0,b.best||0,a.streak||0,b.streak||0),
    streak:later.streak||0, lastDay:later.lastDay||null, freezes:later.freezes||0,
    fzUsed:Math.max(a.fzUsed||0,b.fzUsed||0), fzBought:Math.max(a.fzBought||0,b.fzBought||0),
    brokeFrom:later.brokeFrom||null, brokeAt:later.brokeAt||null,
    quizBest:Math.max(a.quizBest||0,b.quizBest||0), quiz:(b.quiz&&(!a.quiz||b.quiz.d>=a.quiz.d))?b.quiz:a.quiz};
}
let syncT=null, syncing=false;
async function syncNow(){
  if(syncing||!(await account())) return; syncing=true;
  try{
    const local=S.get();
    const r=await api('/state',{method:'PUT',body:{state:local}});
    const merged=mergeState(r.state,S.get());          // giữ cả thay đổi xảy ra trong lúc đang gửi
    try{ localStorage.setItem(APP_KEY,JSON.stringify(merged)); }catch(e){}
    S.set({syncedAt:Date.now()});
  }catch(e){} finally{ syncing=false; }
}
function scheduleSync(){ if(!API.user) return; clearTimeout(syncT); syncT=setTimeout(syncNow,4000); }

/* ---------------- trợ lý nổi (AI, có hạn mức mỗi ngày) ---------------- */
function mountAssistant(){
  if(document.getElementById('ast')) return;
  document.body.insertAdjacentHTML('beforeend',`
  <div id="ast" style="position:fixed;right:16px;bottom:16px;z-index:15;max-width:calc(100vw - 32px)">
    <div id="astPanel" hidden style="width:min(380px,calc(100vw - 32px));background:var(--bg);border:1px solid var(--ink);padding:14px;margin-bottom:10px">
      <div class="row between"><span class="mono mono--red">Trợ lý học tập</span><button class="mono" id="astX" style="background:none;border:0;cursor:pointer" aria-label="Đóng">Đóng</button></div>
      <div id="astLog" class="small" style="max-height:46vh;overflow:auto;margin:10px 0"></div>
      <form id="astF" class="stack" style="gap:8px"><textarea class="field" id="astQ" rows="2" placeholder="Hỏi về một khái niệm, hoặc: nên học gì tiếp?" aria-label="Câu hỏi"></textarea>
        <div class="row between"><span class="mono" id="astQuota"></span><button class="btn">Hỏi</button></div></form>
    </div>
    <button class="btn" id="astBtn" style="float:right">Hỏi trợ lý</button>
  </div>`);
  const panel=document.getElementById('astPanel'), log=document.getElementById('astLog');
  document.getElementById('astBtn').onclick=()=>{ panel.hidden=!panel.hidden; if(!panel.hidden) document.getElementById('astQ').focus(); };
  document.getElementById('astX').onclick=()=>panel.hidden=true;
  const linkify=t=>escH(t).replace(/\b([LP]:[a-z0-9-]+)\b/g,(m,k)=>lessonMeta(k)?`<a href="bai.html?id=${encodeURIComponent(k)}">${escH(lessonMeta(k).t)}</a>`:m).replace(/\n/g,'<br>');
  document.getElementById('astF').onsubmit=async e=>{
    e.preventDefault(); const q=document.getElementById('astQ').value.trim(); if(q.length<3) return;
    const s=S.get(); const next=nextLesson(s);
    const context={next:next?{key:next,t:lessonMeta(next).t}:null, done:Object.keys(s.done).slice(-15),
      weak:typeof COMPETENCIES!=='undefined'?COMPETENCIES.filter(c=>compLevel(c,s).n===0).map(c=>c.t).slice(0,5):[],
      lessons:ALL.map(x=>({k:x.key,t:lessonMeta(x.key).t}))};
    log.insertAdjacentHTML('beforeend',`<p style="margin:8px 0"><b>Bạn:</b> ${escH(q)}</p>`);
    document.getElementById('astQ').value=''; log.insertAdjacentHTML('beforeend','<p class="muted" id="astWait">Đang nghĩ…</p>'); log.scrollTop=1e9;
    try{ const r=await api('/ai/assist',{method:'POST',body:{question:q,context}});
      document.getElementById('astWait').outerHTML=`<p style="margin:8px 0">${linkify(r.reply)}</p>`;
      document.getElementById('astQuota').textContent=`${r.quota.used}/${r.quota.limit} lượt hôm nay`;
    }catch(err){ const msg={quota_exceeded:'Hết lượt hỏi hôm nay. Mai quay lại nhé.',not_configured:'Trợ lý AI chưa được bật trên máy chủ.',login_required:'Cần đăng nhập để dùng trợ lý.'}[err.message]||'Chưa hỏi được, thử lại sau.';
      document.getElementById('astWait').outerHTML=`<p class="muted">${msg}</p>`; }
    log.scrollTop=1e9;
  };
}
