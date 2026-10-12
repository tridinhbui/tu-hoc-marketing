const B=process.env.B||'http://localhost:8788';
const bank=JSON.parse((await import('fs')).readFileSync('' + new URL('../src/generated/bank.json', import.meta.url).pathname,'utf8'));
class C{constructor(){this.ck=''}
 async f(m,p,b){const h={origin:B,'x-thmc':'1'};if(this.ck)h.cookie=this.ck;if(b!==undefined)h['content-type']='application/json';
  const r=await fetch(B+p,{method:m,headers:h,body:b===undefined?undefined:JSON.stringify(b),redirect:'manual'});
  const sc=r.headers.get('set-cookie');if(sc)this.ck=sc.split(';')[0];let j=null;try{j=await r.json()}catch{}return{s:r.status,j}}}
const u=new C();const a=await u.f('POST','/api/auth/start',{email:'legit'+Date.now()+'@example.com'});await u.f('GET',a.j.dev_link.replace(B,''));
const today=new Date(Date.now()+7*3600e3).toISOString().slice(0,10);
const key='B:ob01-01';const ids=bank.lessons[key];console.log('lesson',key,ids.length,'q');
// trả lời ĐÚNG như học viên thật (lấy đáp án từ bank - phía test)
let right=0;for(const id of ids){const it=bank.items[id];const ch=it.type==='calc'?String(it.ans):it.answer;const r=await u.f('POST','/api/answers',{question_id:id,chosen:ch,context:'lesson'});if(r.j.correct)right++}
console.log('right',right,'/',ids.length);
// giống bai.html: encodeURIComponent(key)
const c=await u.f('POST','/api/lessons/'+encodeURIComponent(key)+'/complete',{});console.log('complete (encoded path)',c.s,JSON.stringify(c.j));
// trình duyệt đồng bộ sổ cái như app.js
const put=await u.f('PUT','/api/state',{state:{xpl:{['lesson:'+key]:{x:10,d:today}},lessons:{[key]:{state:'passed',score:100,at:today}},lastDay:today,streak:1,log:[{d:today,k:'lesson',r:key,x:10,t:Date.now()}]}});
console.log('PUT',put.s,'stats',JSON.stringify(put.j.stats),'state.xp',put.j.state.xp,'xpl keys',Object.keys(put.j.state.xpl));
const again=await u.f('PUT','/api/state',{state:put.j.state});console.log('PUT lặp lại -> total_xp',again.j.stats.total_xp);
const st=await u.f('GET','/api/me/stats');console.log('stats',JSON.stringify(st.j.stats));
