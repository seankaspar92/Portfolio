import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {JSDOM} from 'jsdom';
test('pilot form retains two independent evaluator records and reloads the same session',async()=>{
 const dom=new JSDOM(fs.readFileSync('rr01-pilot.html','utf8'),{url:'https://pilot.example.test'});const w=dom.window;Object.assign(globalThis,{window:w,document:w.document,localStorage:w.localStorage,FormData:w.FormData,confirm:()=>false});
 await import('../pilot-capture.mjs?dom1');
 const session=document.querySelector('#session-form');for(const [k,v]of Object.entries({session:'SIM-01',mode:'synthetic rehearsal',date:'2026-10-18'}))session.elements.namedItem(k).value=v;
 const form=document.querySelector('#assessment-form');for(const [k,v]of Object.entries({learner:'L1',evaluator:'E1',attempt:'1',evidence:'WS-01'}))form.elements.namedItem(k).value=v;
 for(let i=0;i<9;i++)form.elements.namedItem('r'+i).value='2';form.dispatchEvent(new w.Event('submit',{cancelable:true}));
 form.elements.namedItem('evaluator').value='E2';form.elements.namedItem('r0').value='1';form.dispatchEvent(new w.Event('submit',{cancelable:true}));
 assert.equal(document.querySelectorAll('#pilot-records article').length,2);assert.match(document.querySelector('#pilot-disagreements').textContent,/R1/);
 const saved=localStorage.getItem('rr01-pilot-v1');assert.equal(JSON.parse(saved).attempts[1].assessment.result,'REMEDIATE');
 const next=new JSDOM(fs.readFileSync('rr01-pilot.html','utf8'),{url:'https://pilot.example.test'});next.window.localStorage.setItem('rr01-pilot-v1',saved);Object.assign(globalThis,{window:next.window,document:next.window.document,localStorage:next.window.localStorage,FormData:next.window.FormData});await import('../pilot-capture.mjs?dom2');assert.equal(document.querySelectorAll('#pilot-records article').length,2);assert.equal(document.querySelector('[name=session]').value,'SIM-01');
});
