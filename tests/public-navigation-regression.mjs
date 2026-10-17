import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const manifest=JSON.parse(fs.readFileSync('portfolio-manifest.json','utf8'));
const pages=fs.readdirSync('.').filter(p=>p.endsWith('.html'));
for(const page of manifest.pages)assert.ok(pages.includes(page),'Manifest page missing: '+page);
for(const page of pages){
  const html=fs.readFileSync(page,'utf8');
  const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,'Duplicate IDs: '+page);
  for(const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
    const ref=match[1];
    if(/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(ref))continue;
    const [target,fragment]=ref.split('#');
    const clean=target.split('?')[0];
    const local=clean?path.normalize(path.join(path.dirname(page),clean.replace(/^\/Portfolio\//,''))):page;
    assert.ok(fs.existsSync(local),page+' missing target: '+ref);
    if(fragment&&local.endsWith('.html')){
      const targetHtml=fs.readFileSync(local,'utf8');
      assert.ok([...targetHtml.matchAll(/\bid=["']([^"']+)["']/g)].some(m=>m[1]===decodeURIComponent(fragment)),page+' missing fragment: '+ref);
    }
  }
}
const home=fs.readFileSync('index.html','utf8');
for(const page of ['fleetvoice.html','mobile-drone-operations.html','train-the-trainer.html','field-deployment.html']){
  assert.ok(home.includes('href="'+page+'"'),'Featured project missing: '+page);
}
assert.ok(!home.includes('Current expansion gates'),'Internal gate heading remains');
const fv=fs.readFileSync('fleetvoice.html','utf8');
for(const text of ['171 pending','Human recognition accuracy remains unmeasured','v0.7–v0.15','Illustrative reconstruction'])assert.ok(fv.includes(text),'FleetVoice boundary missing: '+text);
const hops=fs.readFileSync('hops.html','utf8');
assert.ok(hops.includes('v2.6 test counts above remain scoped'),'HOPS old evidence scope missing');
assert.ok(hops.includes('access restricted'),'Restricted demo disclosure missing');
for(const file of ['evidence/FLEETVOICE_PUBLIC_BASELINE.md','evidence/HOPS_MISSION_THREAD.md','evidence/MOBILE_OPERATIONS_CONCEPT.md','evidence/TRAINING_PATHWAY_SAMPLE.md','evidence/FIELD_DEPLOYMENT_SAMPLE.md'])assert.ok(fs.existsSync(file),'Public proof missing: '+file);
console.log('PASS: root-page targets, fragments, inventory, new project discovery, and evidence boundaries');
