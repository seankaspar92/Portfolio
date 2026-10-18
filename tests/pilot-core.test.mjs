import test from 'node:test';import assert from 'node:assert/strict';
import {score,normalize,disagreements,metadata} from '../pilot-core.mjs';
const meta={session:'SIM-01',mode:'synthetic rehearsal',date:'2026-10-18',minutes:[10,10,25,15,20,10],feedback:'',change:'',owner:''};
const entry={learner:'L1',evaluator:'E1',attempt:1,scores:Array(9).fill(2),evidence:'Worksheet SIM-01',remediation:''};
test('high total cannot override a critical failure',()=>{const scores=Array(9).fill(2);scores[0]=1;assert.equal(score(scores).total,17);assert.equal(score(scores).result,'REMEDIATE');});
test('missing observation cannot become zero or pass',()=>{const scores=Array(9).fill(2);scores[4]=null;assert.equal(score(scores).result,'INCOMPLETE');assert.equal(score(scores).complete,false);});
test('forged derived results are recomputed and duplicate attempts rejected',()=>{const a={...entry,scores:[0,...Array(8).fill(2)],assessment:{result:'PROPOSED PASS'}};const result=normalize({schema:'rr01-pilot/v1',meta,attempts:[a]});assert.equal(result.attempts[0].assessment.result,'REMEDIATE');assert.throws(()=>normalize({schema:'rr01-pilot/v1',meta,attempts:[entry,entry]}),/Duplicate/);});
test('evaluator disagreement compares the same learner and attempt only',()=>{const second={...entry,evaluator:'E2',scores:[1,...Array(8).fill(2)]};assert.deepEqual(disagreements([entry,second])[0].criteria,['R1']);assert.equal(disagreements([entry,{...second,attempt:2}]).length,0);});
test('record types, real dates and observed times remain bounded',()=>{assert.throws(()=>metadata({...meta,date:'2026-02-30'}),/valid session/);assert.throws(()=>metadata({...meta,mode:'verified'}));assert.throws(()=>metadata({...meta,minutes:[-1,10,25,15,20,10]}));assert.equal(metadata(meta).mode,'synthetic rehearsal');});
