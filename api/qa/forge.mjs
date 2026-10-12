const B=process.env.B||'http://localhost:8788';
class C{constructor(){this.ck=''}
 async f(m,p,b){const h={origin:B,'x-thmc':'1'};if(this.ck)h.cookie=this.ck;if(b!==undefined)h['content-type']='application/json';
  const r=await fetch(B+p,{method:m,headers:h,body:b===undefined?undefined:JSON.stringify(b),redirect:'manual'});
  const sc=r.headers.get('set-cookie');if(sc)this.ck=sc.split(';')[0];let j=null;try{j=await r.json()}catch{}return{s:r.status,j}}}
async function login(e){const c=new C();const a=await c.f('POST','/api/auth/start',{email:e});await c.f('GET',a.j.dev_link.replace(B,''));return c}
const u=await login('forge'+Date.now()+'@example.com');
const today=new Date(Date.now()+7*3600e3).toISOString().slice(0,10);
const xpl={};
for(let i=0;i<500;i++)xpl['case:fake-'+i]={x:40,d:today};          // 500 "case" không có thật
for(let i=0;i<50;i++)xpl['lesson:L:fake'+i]={x:10,d:today};
xpl['exam:s1']={x:50,d:today};xpl['legacy:base']={x:2000,d:today};
const lessons={};for(const k of ['L:53','L:56','L:61'])lessons[k]={state:'passed',score:100,at:today,source:'lesson'};
const r=await u.f('PUT','/api/state',{state:{xpl,lessons,exams:{s1:{attempts:1,best:99,passed:today}},lastDay:today,streak:400,log:[]}});
console.log('PUT',r.s,JSON.stringify(r.j&&r.j.stats||r.j).slice(0,300));
const st=await u.f('GET','/api/me/stats');console.log('STATS',JSON.stringify(st.j.stats));
const lb=await u.f('GET','/api/leaderboard');console.log('LEADERBOARD me',JSON.stringify(lb.j.me));
const nx=await u.f('GET','/api/me/next');console.log('NEXT',JSON.stringify(nx.j).slice(0,200));
const m=await u.f('GET','/api/me/mastery');
