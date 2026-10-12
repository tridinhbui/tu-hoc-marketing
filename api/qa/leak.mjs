const B=process.env.B||'http://localhost:8788';
class C{constructor(){this.ck=''}
 async f(m,p,b){const h={origin:B,'x-thmc':'1'};if(this.ck)h.cookie=this.ck;if(b!==undefined)h['content-type']='application/json';
  const r=await fetch(B+p,{method:m,headers:h,body:b===undefined?undefined:JSON.stringify(b),redirect:'manual'});
  const sc=r.headers.get('set-cookie');if(sc)this.ck=sc.split(';')[0];let j=null,t='';try{t=await r.text();j=JSON.parse(t)}catch{}return{s:r.status,j,t}}}
const u=new C();const a=await u.f('POST','/api/auth/start',{email:'leak'+Date.now()+'@example.com'});await u.f('GET',a.j.dev_link.replace(B,''));
const SECRET=/"(answer|ans|why|steps|correct|tol|wrong|errors|explanation|option_feedback)"\s*:/;
for(const p of ['/api/exams/draw/s1','/api/exams/stage/s1','/api/review/session','/api/placement','/api/quiz/lesson/B:ob01-01','/api/quiz/lesson/L:53','/api/tracks','/api/me/next','/api/me/mastery','/api/boss','/api/pvp','/api/kingdom']){
  const r=await u.f('GET',p);console.log(String(r.s).padEnd(4),SECRET.test(r.t)?'LEAK ':'ok   ',p,r.t.length+'B', SECRET.test(r.t)?(r.t.match(SECRET)[0]):'');}
// answers: trước khi chọn đáp án, API không được trả đáp án đúng nếu chosen sai? (thiết kế: trả sau khi chấm)
const r=await u.f('POST','/api/answers',{question_id:'e1.001',chosen:'a',context:'practice'});console.log('answers ->',JSON.stringify(r.j).slice(0,260));
// chosen rác
for(const ch of [null,'zzz',{a:1},[1],'']){const q=await u.f('POST','/api/answers',{question_id:'e1.001',chosen:ch});console.log('chosen',JSON.stringify(ch),'->',q.s,JSON.stringify(q.j).slice(0,80))}
