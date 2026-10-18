import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const kit=read('evidence/RR01_PILOT_KIT.json');assert.equal(crypto.createHash('sha256').update(fs.readFileSync(kit.package)).digest('hex'),kit.sha256);assert.equal(kit.pilot_run,false);
const qa=read('QA_REPORT.json'),manifest=read('portfolio-manifest.json');assert.deepEqual(qa.public_pages,manifest.pages);
const recovery=read('evidence/RECOVERY_GATE_RECONCILIATION.json');assert.equal(recovery.gates.length,12);assert.ok(Object.values(recovery.external_acceptance).every(v=>v===false));assert.equal(recovery.gates.find(g=>g.gate===61).evidence.completedLevelCount,0);
const status=read('evidence/PROJECT_STATUS.json');for(const p of status.projects){assert.ok(manifest.pages.includes(p.page.split('#')[0]));assert.ok(p.evidence_date&&p.next_action&&p.maturity);}
console.log('PASS: pilot kit hash, current QA inventory, bounded recovery claims and public status records');
