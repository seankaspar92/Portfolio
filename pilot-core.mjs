export const CRITICAL=[0,1,2,5,8];
export const PHASES=['Framing','Demonstration','Independent review','Brief and assess','HOPS follow-through','Debrief'];
export const CRITERIA=['Source traceability','Available inventory','Revision mismatch','Owner handoff','Due date handoff','Readiness disposition','Actionable communication','HOPS and training linkage','Evidence integrity'];
export function score(values){
 if(!Array.isArray(values)||values.length!==9||values.some(v=>v!==null&&![0,1,2].includes(v)))throw Error('Use nine scores of 0, 1, 2 or not observed.');
 const complete=values.every(v=>v!==null),total=values.reduce((a,v)=>a+(v??0),0),criticalMisses=CRITICAL.filter(i=>values[i]!==2).map(i=>'R'+(i+1));
 return {total,complete,criticalMisses,result:!complete?'INCOMPLETE':total>=16&&!criticalMisses.length?'PROPOSED PASS':'REMEDIATE'};
}
const alias=(s,name)=>{if(typeof s!=='string'||! /^[A-Za-z0-9_-]{1,30}$/.test(s))throw Error(name+': use a short alias with letters, numbers, underscores or hyphens.');return s;};
const text=(s,n)=>{if(typeof s!=='string'||s.length>2000)throw Error(n+': maximum 2000 characters.');return s.trim();};
export function metadata(m){
 alias(m.session,'Session');if(!['planning','synthetic rehearsal','observed pilot'].includes(m.mode))throw Error('Select the record type.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(m.date)||!Number.isFinite(Date.parse(m.date))||new Date(m.date+'T00:00:00Z').toISOString().slice(0,10)!==m.date)throw Error('Enter a valid session date.');
 if(!Array.isArray(m.minutes)||m.minutes.length!==6||m.minutes.some(v=>v!==null&&(!Number.isFinite(v)||v<0||v>1440)))throw Error('Enter six nonnegative phase times or leave unobserved.');
 return {session:m.session,mode:m.mode,date:m.date,minutes:[...m.minutes],feedback:text(m.feedback,'Feedback'),change:text(m.change,'Proposed change'),owner:m.owner?alias(m.owner,'Editor alias'):''};
}
export function attempt(a){
 alias(a.learner,'Learner');alias(a.evaluator,'Evaluator');if(!Number.isInteger(a.attempt)||a.attempt<1||a.attempt>20)throw Error('Attempt must be 1–20.');
 return {learner:a.learner,evaluator:a.evaluator,attempt:a.attempt,scores:[...a.scores],evidence:text(a.evidence,'Evidence'),remediation:text(a.remediation,'Remediation'),assessment:score(a.scores)};
}
export function normalize(s){
 if(!s||s.schema!=='rr01-pilot/v1'||!Array.isArray(s.attempts)||s.attempts.length>100)throw Error('Invalid pilot record. Export the original or explicitly reset.');
 const out={schema:s.schema,lesson:'RR-01 v1.0',meta:metadata(s.meta),attempts:s.attempts.map(attempt),notice:'Locally recorded observations, not authenticated judgments or validated learning outcomes.'};
 const keys=out.attempts.map(a=>[a.learner,a.evaluator,a.attempt].join(':'));if(new Set(keys).size!==keys.length)throw Error('Duplicate learner/evaluator/attempt.');
 return out;
}
export function disagreements(attempts){
 const out=[];
 for(let i=0;i<attempts.length;i++)for(let j=i+1;j<attempts.length;j++){
 const a=attempts[i],b=attempts[j];if(a.learner!==b.learner||a.attempt!==b.attempt||a.evaluator===b.evaluator)continue;
 const criteria=a.scores.map((v,k)=>v!==null&&b.scores[k]!==null&&v!==b.scores[k]?'R'+(k+1):null).filter(Boolean);
 if(criteria.length)out.push({learner:a.learner,attempt:a.attempt,evaluators:[a.evaluator,b.evaluator],criteria});
 }return out;
}
