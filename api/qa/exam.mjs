const B=process.env.B||'http://localhost:8788';
const bank=JSON.parse((await import('fs')).readFileSync('' + new URL('../src/generated/bank.json', import.meta.url).pathname,'utf8'));
class C{constructor(){this.ck=''}
 async f(m,p,b){const h={origin:B,'x-thmc':'1'};if(this.ck)h.cookie=this.ck;if(b!==undefined)h['content-type']='application/json';
  const r=await fetch(B+p,{method:m,headers:h,body:b===undefined?undefined:JSON.stringify(b),redirect:'manual'});
  const sc=r.headers.get('set-cookie');if(sc)this.ck=sc.split(';')[0];let j=null;try{j=await r.json()}catch{}return{s:r.status,j}}}
const ok=(n,c,d='')=>console.log(c?'PASS':'FAIL',n,d);
const g=new C();
ok('khách /api/answers → 401',(await g.f('POST','/api/answers',{question_id:'e1.001',chosen:'a'})).s===401);
const u=new C();const a=await u.f('POST','/api/auth/start',{email:'exam'+Date.now()+'@example.com'});await u.f('GET',a.j.dev_link.replace(B,''));
ok('chosen rác → 400',(await u.f('POST','/api/answers',{question_id:'e1.001',chosen:'zzz'})).s===400);
ok('chosen null → 400',(await u.f('POST','/api/answers',{question_id:'e1.001',chosen:null})).s===400);
ok('calc không phải số → 400',(await u.f('POST','/api/answers',{question_id:'B:kn04-06#3',chosen:'abc'})).s===400);
// đề thi theo lượt
const ex=await u.f('GET','/api/exams/stage/s1');ok('lấy lượt thi s1',ex.s===200&&ex.j.attempt_id,`${ex.j.items&&ex.j.items.length} câu`);
ok('đề không chứa đáp án',!JSON.stringify(ex.j).match(/"(answer|ans|why|steps)"\s*:/));
// nộp 1 nửa sai → trượt
const wrong={};for(const it of ex.j.items)wrong[it.id]=it.options?it.options[0].k:'0';
const f1=await u.f('POST','/api/exams/stage/s1',{attempt_id:ex.j.attempt_id,answers:wrong});
ok('nộp đáp án bừa → không đạt',f1.s===200&&!f1.j.passed,`score ${f1.j.score}/${f1.j.total}`);
ok('nộp lại cùng lượt → 409',(await u.f('POST','/api/exams/stage/s1',{attempt_id:ex.j.attempt_id,answers:wrong})).s===409);
const cd=await u.f('GET','/api/exams/stage/s1');ok('thi lại ngay → cooldown 429',cd.s===429,JSON.stringify(cd.j));
// XP giả cho exam: client khai exam:s1 khi chưa qua
const today=new Date(Date.now()+7*3600e3).toISOString().slice(0,10);
const forge=await u.f('PUT','/api/state',{state:{xpl:{'exam:s1':{x:50,d:today}},exams:{s1:{attempts:1,best:15,passed:today}}}});
ok('khai exam:s1 khi chưa đạt → không có XP',forge.j.stats.total_xp===0,'total_xp='+forge.j.stats.total_xp+' xpl='+JSON.stringify(forge.j.state.xpl));
// attempt của người khác
const v=new C();const a2=await v.f('POST','/api/auth/start',{email:'exam2'+Date.now()+'@example.com'});await v.f('GET',a2.j.dev_link.replace(B,''));
const ex2=await v.f('GET','/api/exams/stage/s2');
const steal=await u.f('POST','/api/exams/stage/s2',{attempt_id:ex2.j.attempt_id,answers:{}});
ok('dùng attempt_id của người khác → 404',steal.s===404,String(steal.s));
