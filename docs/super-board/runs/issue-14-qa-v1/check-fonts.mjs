import { chromium } from 'playwright';
const E='/Users/rafa/Developer/personal/rafafuentes.com/.claude/worktrees/issue-14-qa/docs/super-board/runs/issue-14-qa-v1'; const base='http://localhost:4399';
const b=await chromium.launch(); const out={};
for (const [name,w,h] of [['desktop',1920,1080],['tablet',1024,768],['mobile',375,667]]) {
  const p=await (await b.newContext({viewport:{width:w,height:h}})).newPage();
  const reqs=[]; p.on('request',r=>reqs.push(r.url()));
  for (const route of ['/','/projects/','/writing/']) {
    await p.goto(base+route,{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
    if(route==='/'){
      const info=await p.evaluate(()=>({
        body:getComputedStyle(document.body).fontFamily,
        h1:getComputedStyle(document.querySelector('h1')).fontFamily,
        code:[...document.querySelectorAll('code,pre,.mono')].slice(0,1).map(e=>getComputedStyle(e).fontFamily),
        loaded:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight),
        monoVar:getComputedStyle(document.documentElement).getPropertyValue('--mono').slice(0,80)}));
      out[name]=info;
      await p.screenshot({path:E+'/'+name+'.png'});
    }
  }
  out[name].external=[...new Set(reqs.filter(u=>!u.startsWith(base)))];
  out[name].total=reqs.length;
}
console.log(JSON.stringify(out,null,1)); await b.close();
