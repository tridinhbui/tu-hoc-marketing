/* CORE — shell, state, motion. Everything the reader touches is stored locally. */

const NAV = [
  ['Thế giới','world.html'],
  ['Bài hôm nay','lesson.html'],
  ['Campaign','gallery.html'],
  ['Brand X-Ray','xray.html'],
  ['Thử thách','challenge.html'],
  ['Taste','taste.html'],
  ['Thư viện','library.html'],
  ['Lộ trình','roadmap.html'],
];
const NAV_MORE = [
  ['Dòng thời gian','timeline.html'],
  ['Bộ sưu tập','collections.html'],
  ['Sổ tay','journal.html'],
];

/* ---------------- state ---------------- */
const KEY = 'nhinthay.v1';
const DEFAULT = {
  streak:0, lastDay:null, days:[],
  campaigns:[], brands:[], challenges:[], taste:[], principles:[], roadmap:[], work:{},
  notes:[], answers:{}
};
const State = {
  get(){ try{ return {...DEFAULT, ...JSON.parse(localStorage.getItem(KEY)||'{}')}; }catch(e){ return {...DEFAULT}; } },
  set(patch){ const s={...State.get(),...patch}; localStorage.setItem(KEY,JSON.stringify(s)); return s; },
  push(list,val){ const s=State.get(); const arr=s[list]||[]; if(!arr.includes(val)){ arr.push(val); State.set({[list]:arr}); } return arr; },
  toggle(list,val){ const s=State.get(); const arr=s[list]||[];
    const i=arr.indexOf(val); i>-1?arr.splice(i,1):arr.push(val); State.set({[list]:arr}); return i<0; },
  has(list,val){ return (State.get()[list]||[]).includes(val); },
  /* touch() marks a day of activity — the streak is the only number we count out loud */
  touch(){
    const s=State.get(); const today=new Date().toISOString().slice(0,10);
    if(s.lastDay===today) return s;
    const y=new Date(Date.now()-864e5).toISOString().slice(0,10);
    return State.set({ lastDay:today, streak: s.lastDay===y ? s.streak+1 : 1 });
  }
};

const RANKS = [
  ['Observer',0,'Bắt đầu nhìn thấy marketing ở nơi người khác chỉ thấy quảng cáo.'],
  ['Explorer',8,'Đã đi qua vài khu vực, bắt đầu nối được các mảnh rời.'],
  ['Strategist',20,'Đọc được ý đồ phía sau một lựa chọn, không chỉ bề mặt.'],
  ['Creative Thinker',38,'Nhìn ra vì sao một ý tưởng mạnh trước khi ai giải thích.'],
  ['Brand Builder',60,'Nghĩ bằng hệ thống: định vị, tài sản nhận diện, thời gian.'],
  ['Marketing Director',88,'Nhìn thị trường như một bàn cờ, không phải một chiến dịch.'],
];
function score(s=State.get()){
  return s.days.length*2 + s.campaigns.length*2 + s.brands.length*3
       + s.challenges.length*2 + s.taste.length + s.principles.length + s.notes.length
       + (s.roadmap||[]).length;
}
function rank(n=score()){ let r=RANKS[0]; for(const x of RANKS) if(n>=x[1]) r=x; return r; }
function nextRank(n=score()){ return RANKS.find(x=>x[1]>n) || null; }



/* ---------------- chuẩn hoá màu về họ mực ----------------
   Data cũ mang bảng màu bão hoà. Thay vì sửa tay từng case, mọi màu đi qua đây:
   giữ lại sắc thái riêng (hue) nhưng kéo độ bão hoà và độ sáng về đúng một dải mực,
   nên 20 tấm vẫn khác nhau mà vẫn nằm trong một bức tranh. */
function toInk(hex){
  const h=String(hex||'').replace('#','');
  if(h.length!==6) return '#8A3A12';
  const r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,b=parseInt(h.slice(4,6),16)/255;
  const mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;
  let hu=0; if(d){ hu = mx===r?((g-b)/d+(g<b?6:0)):mx===g?((b-r)/d+2):((r-g)/d+4); hu*=60; }
  const l0=(mx+mn)/2;
  /* Ba thỏi mực Hỏa: chu sa cho sắc nóng sẵn, gạch nung cho sắc lam tím,
     hoàng thổ cho sắc lục. Không nội suy vòng quanh bánh xe màu — đi vòng sẽ
     rơi ra ngoài họ lửa và làm vỡ cả bảng. */
  let anchor;
  if(hu<60||hu>=300) anchor=12;        // đỏ/cam/tím đỏ  → chu sa
  else if(hu<180)    anchor=38;        // vàng/lục       → hoàng thổ
  else               anchor=24;        // lam/chàm/tím   → gạch nung
  let dh=((hu-anchor+540)%360)-180;
  if(Math.abs(dh)>90) dh=0;
  const hue=(anchor+Math.max(-14,Math.min(14,dh*.16))+360)%360;
  const sat=d===0?.44:.50+Math.min(d,.6)*.55;  // lửa phải rực, nâu xỉn là tro
  const lig=.30+l0*.14;                         // sáng vừa đủ, chữ trắng vẫn đọc được
  const f=n=>{const k=(n+hue/30)%12,a=sat*Math.min(lig,1-lig);
    const v=lig-a*Math.max(-1,Math.min(Math.min(k-3,9-k),1));
    return Math.round(v*255).toString(16).padStart(2,'0');};
  return '#'+f(0)+f(8)+f(4);
}

/* ---------------- mực ----------------
   Không dùng ảnh chụp: núi, sông, thuyền đều là SVG loang bằng
   feTurbulence + blur, mỗi lần gọi cho một dáng khác nhau theo seed. */
function inkDrop(size=18,color='var(--accent)'){
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3.2c3.4 4.1 5.6 7 5.6 9.7a5.6 5.6 0 1 1-11.2 0c0-2.7 2.2-5.6 5.6-9.7Z"
      fill="${color}" opacity=".85"/>
    <path d="M10.1 12.6c0 1.6.9 2.9 2.2 3.4" stroke="#FBF6EE" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>
  </svg>`;
}
function seal(char='觀',size=34){
  return `<svg class="seal" width="${size}" height="${size}" viewBox="0 0 44 44" aria-hidden="true">
    <rect x="1.4" y="1.4" width="41.2" height="41.2" rx="2.5" fill="none" stroke="var(--seal)" stroke-width="2.6" opacity=".9"/>
    <text x="22" y="31" text-anchor="middle" font-family="serif" font-size="24" fill="var(--seal)" opacity=".92">${char}</text>
  </svg>`;
}
/* Tranh thuỷ mặc: dải sương, sườn núi, dòng nước, con thuyền. */
function inkScene(id='ink1',{boat=true,mountains=true}={}){
  const speck = Array.from({length:26},(_,i)=>{
    const x=470+((i*137)%720), y=430+((i*211)%210), r=(i%4)*.5+.9;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#B3350F" opacity="${.12+(i%5)*.05}"/>`;
  }).join('');
  return `<svg class="inkscene" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <filter id="${id}-b" x="-25%" y="-25%" width="150%" height="150%">
        <feTurbulence type="fractalNoise" baseFrequency="0.005 0.009" numOctaves="4" seed="11" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G"/>
        <feGaussianBlur stdDeviation="3.4"/>
      </filter>
      <filter id="${id}-s" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.009 0.017" numOctaves="3" seed="4" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="17" xChannelSelector="R" yChannelSelector="G"/>
        <feGaussianBlur stdDeviation="1.1"/>
      </filter>
      <linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2=".6">
        <stop offset="0" stop-color="#E8A468" stop-opacity=".92"/>
        <stop offset=".45" stop-color="#BE3E0B" stop-opacity=".96"/>
        <stop offset="1" stop-color="#5E1D06" stop-opacity=".96"/>
      </linearGradient>
      <linearGradient id="${id}-m" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#C98B5E" stop-opacity=".5"/>
        <stop offset="1" stop-color="#C98B5E" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${mountains?`<g filter="url(#${id}-b)">
      <path d="M-40 336 C 110 196, 214 252, 318 198 C 398 156, 452 228, 548 274 L 548 392 L -40 392 Z" fill="url(#${id}-m)"/>
      <path d="M604 366 C 722 240, 806 286, 898 214 C 984 146, 1086 214, 1252 180 L 1252 400 L 604 400 Z" fill="url(#${id}-m)" opacity=".78"/>
    </g>`:''}
    <g filter="url(#${id}-s)">
      <path d="M-60 548 C 250 452, 452 610, 726 506 C 928 430, 1074 486, 1272 408"
        stroke="url(#${id}-g)" stroke-width="58" fill="none" opacity=".7" stroke-linecap="round"/>
      <path d="M-60 604 C 268 528, 486 668, 782 570 C 998 498, 1116 546, 1272 490"
        stroke="url(#${id}-g)" stroke-width="26" fill="none" opacity=".58" stroke-linecap="round"/>
      <path d="M-60 492 C 232 418, 414 536, 676 458 C 894 394, 1042 428, 1272 366"
        stroke="#8C3A14" stroke-width="6" fill="none" opacity=".28" stroke-linecap="round"/>
      <path d="M120 660 C 380 596, 560 706, 830 632 C 1020 580, 1140 606, 1272 566"
        stroke="#8C3A14" stroke-width="2.4" fill="none" opacity=".2" stroke-linecap="round"/>
    </g>
    <g>${speck}</g>
    ${boat?`<g opacity=".88" transform="translate(760 528)">
      <path d="M-36 8 C -21 18, 21 18, 36 8 C 21 12.5, -21 12.5, -36 8 Z" fill="#2B1A11"/>
      <path d="M0 -24 L 0 6" stroke="#2B1A11" stroke-width="1.7"/>
      <circle cx="0" cy="-27" r="3.2" fill="#2B1A11"/>
      <path d="M-52 16 C -20 22, 20 22, 52 16" stroke="#8C3A14" stroke-width="1.2" fill="none" opacity=".4"/>
    </g>`:''}
  </svg>`;
}

/* ---------------- shell ---------------- */
function shell(current){
  const here = current || location.pathname.split('/').pop() || 'index.html';
  const nav = NAV.map(([t,h])=>`<a href="${h}"${h===here?' aria-current="page"':''}>${t}</a>`).join('');
  const s = State.get(), n = score(s), r = rank(n), nx = nextRank(n);
  const m = document.querySelector('main'); if(m && !m.id) m.id='main';
  document.body.insertAdjacentHTML('afterbegin',`
    <a class="skip" href="${location.pathname}#main">Tới nội dung chính</a>
    <header class="masthead">
      <a class="masthead__brand" href="index.html">
        <span class="masthead__seal">${seal('觀',30)}</span>
        <span class="masthead__logo">Nhìn thấy</span>
        <span class="masthead__tag">Marketing Observation World</span>
      </a>
      <nav>${nav}</nav>
      <div class="crest">
        <span class="crest__rank"><span class="crest__drop">${inkDrop(15)}</span>
          <span class="crest__name">${r[0]}</span></span>
        <span class="crest__cell"><span class="label">Bước</span><b>${n}${nx?' / '+nx[1]:''}</b></span>
        <span class="crest__cell"><span class="label">Chuỗi</span><b>${s.streak} ngày</b></span>
        <a class="crest__me" href="journal.html" aria-label="Sổ tay của bạn"></a>
      </div>
    </header>`);
  document.body.insertAdjacentHTML('beforeend',`
    <footer class="colophon">
      <div>
        <div class="label">Colophon</div>
        <p><em>Nhìn thấy</em> là một tạp chí tự học marketing: không bài giảng, không chứng chỉ.
        Mỗi ngày một quan sát, mỗi tuần một thương hiệu bị bóc tách. Chữ xếp bằng Cormorant Garamond và Inter Tight;
        núi, sông và thuyền đều vẽ bằng mực SVG, không dùng ảnh chụp.
        Toàn bộ tiến trình của bạn nằm trong trình duyệt này, không gửi đi đâu cả.</p>
      </div>
      <div>
        <div class="label">Khu vực</div>
        ${NAV.slice(0,4).map(([t,h])=>`<a href="${h}">${t}</a>`).join('')}
      </div>
      <div>
        <div class="label">Mục</div>
        ${NAV.slice(4).concat(NAV_MORE).map(([t,h])=>`<a href="${h}">${t}</a>`).join('')}
      </div>
    </footer>
    <div id="toast"></div>`);
  reveal(); State.touch();
}

/* ---------------- motion ---------------- */
function reveal(root=document){
  const els=[...root.querySelectorAll('[data-reveal],[data-reveal-clip]')].filter(e=>!e.classList.contains('is-in'));
  const show=(el,i)=>{
    el.style.transitionDelay=(parseFloat(el.dataset.delay||0)+Math.min(i,6)*.05)+'s';
    el.classList.add('is-in');
  };
  /* Những gì đã nằm trong khung nhìn ngay lúc gọi thì hiện luôn — hero không bao giờ
     phải chờ observer, nên không có nguy cơ thủng một mảng trắng ở đầu trang. */
  const rest=[];
  els.forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top < innerHeight && r.bottom > 0) rest.push(null), show(el, rest.length-1);
    else rest.push(el);
  });
  const later=rest.filter(Boolean);
  if(!later.length) return;
  if(!('IntersectionObserver' in window)) return later.forEach((e,i)=>show(e,i));
  const io=new IntersectionObserver((ents)=>{
    ents.forEach((e,i)=>{ if(e.isIntersecting){ show(e.target,i); io.unobserve(e.target); }});
  },{rootMargin:'0px 0px -8% 0px',threshold:.08});
  later.forEach(e=>io.observe(e));
}

function toast(msg){
  const t=document.getElementById('toast'); if(!t) return;
  t.textContent=msg; t.classList.add('on'); clearTimeout(toast._t);
  toast._t=setTimeout(()=>t.classList.remove('on'),2100);
}

/* ---------------- plate (typographic poster) ---------------- */
function plate({color,mark,kicker,title,meta,shape='',href,tone='#fff'}){
  const inner=`
    <span class="plate__wash"></span><span class="plate__halftone"></span>
    <span class="plate__mark" style="color:${tone}">${mark}</span>
    <span class="plate__top"><span class="label">${kicker||''}</span><span class="label">${meta||''}</span></span>
    <span class="plate__foot"><h3>${title||''}</h3></span>`;
  const attrs=`class="plate ${shape}" style="--pl:${toInk(color)}"`;
  return href ? `<a href="${href}" ${attrs}>${inner}</a>` : `<div ${attrs}>${inner}</div>`;
}

const qs = k => new URLSearchParams(location.search).get(k);
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* deterministic pick — same "today" gives the same lesson to everyone, no randomness */
const dayIndex = (len) => Math.floor(Date.now()/864e5) % len;
