export const SCHEMA = 'hops.improvement-loop/v1';
export const STAGES = ['EMPTY','CAPTURED','OWNED','AAR_RECORDED','ACTION_PLANNED','CORRECTION_RECORDED','TRAINING_REVISED','VERIFIED','CLOSED'];
const clone = value => JSON.parse(JSON.stringify(value));
const rules = {
  capture: ['summary','observation','evidence'],
  assign: ['owner','due'],
  aar: ['expected','observed','cause','evidence'],
  plan: ['description','owner','due','success'],
  correct: ['evidence','result'],
  train: ['objective','task','standard','change'],
  verify: ['reviewer','evidence','outcome','trainingVersion'],
  close: ['reviewer','rationale'],
  reopen: ['reason','evidence']
};
export function initialState() {
  return {schema:SCHEMA, synthetic:true, stage:'EMPTY', cycle:1, trainingVersion:1,
    issue:null, assignment:null, aar:null, action:null, correction:null, training:null,
    verification:null, closure:null, events:[]};
}
function text(value, name, limit=600) {
  if(typeof value !== 'string' || !value.trim() || value.length>limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) throw Error(`${name}: supply 1–${limit} readable characters.`);
  return value.trim();
}
function date(value) {
  if(typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value+'T00:00:00Z')) || new Date(value+'T00:00:00Z').toISOString().slice(0,10)!==value) throw Error('Supply a real due date in YYYY-MM-DD format.');
  return value;
}
function requireStage(state, stages) {
  if(!stages.includes(state.stage)) throw Error(`This step is unavailable while the loop is ${state.stage}.`);
}
function advance(state, command, actor, at) {
  if(!command || typeof command !== 'object' || Array.isArray(command)) throw Error('A structured improvement step is required.');
  const allowed=rules[command.type];
  if(!allowed || Object.keys(command).some(k=>!['type',...allowed].includes(k))) throw Error('Unsupported improvement step or fields.');
  const payload={};
  for(const k of allowed) payload[k]=k==='trainingVersion'?command[k]:text(command[k],k);
  const s=clone(state);
  switch(command.type) {
    case 'capture':
      requireStage(s,['EMPTY']);
      s.issue={id:'ISS-001',...payload};s.stage='CAPTURED';break;
    case 'assign':
      requireStage(s,['CAPTURED']);payload.due=date(payload.due);
      s.assignment={...payload};s.stage='OWNED';break;
    case 'aar':
      requireStage(s,['OWNED']);s.aar={id:`AAR-${s.cycle}`,issueId:s.issue.id,...payload};s.stage='AAR_RECORDED';break;
    case 'plan':
      requireStage(s,['AAR_RECORDED']);payload.due=date(payload.due);
      s.action={id:`ACT-${s.cycle}`,aarId:s.aar.id,...payload};s.stage='ACTION_PLANNED';break;
    case 'correct':
      requireStage(s,['ACTION_PLANNED']);s.correction={actionId:s.action.id,...payload};s.stage='CORRECTION_RECORDED';break;
    case 'train':
      requireStage(s,['CORRECTION_RECORDED','TRAINING_REVISED','VERIFIED','CLOSED']);
      s.trainingVersion+=1;
      s.training={id:'TRN-POWER-CHECK',version:s.trainingVersion,actionId:s.action.id,...payload};
      s.verification=null;s.closure=null;s.stage='TRAINING_REVISED';break;
    case 'verify':
      requireStage(s,['TRAINING_REVISED']);
      if(!Number.isSafeInteger(payload.trainingVersion) || payload.trainingVersion!==s.trainingVersion) throw Error('Review the current training revision; an earlier revision cannot pass this gate.');
      if(payload.reviewer.toLowerCase()===s.action.owner.toLowerCase()) throw Error('Use a separate simulated reviewer from the corrective-action owner.');
      if(!['passed','failed'].includes(payload.outcome)) throw Error('Record passed or failed for the simulated check.');
      s.verification={actionId:s.action.id,trainingId:s.training.id,...payload};
      s.stage=payload.outcome==='passed'?'VERIFIED':'TRAINING_REVISED';break;
    case 'close':
      requireStage(s,['VERIFIED']);
      if(payload.reviewer!==s.verification.reviewer || s.verification.trainingVersion!==s.trainingVersion || s.verification.outcome!=='passed') throw Error('Closure requires the reviewer and passed evidence for the current revision.');
      s.closure={...payload,at};s.stage='CLOSED';break;
    case 'reopen':
      requireStage(s,['VERIFIED','CLOSED']);
      s.cycle+=1;s.aar=null;s.action=null;s.correction=null;s.training=null;s.verification=null;s.closure=null;s.stage='OWNED';break;
  }
  s.events.push({sequence:s.events.length+1,type:command.type,actor,at,cycle:s.cycle,payload});
  return s;
}
export function reduce(state, command, {actor='Synthetic demo operator', at=new Date().toISOString()}={}) {
  // Rebuild derived state from validated events. Caller-supplied stage/closure fields are never authority.
  const canonical=restore(state);
  if(canonical.events.length>=100) throw Error('This demo supports at most 100 events. Export the record and reset.');
  actor=text(actor,'actor',100);
  if(typeof at!=='string' || !Number.isFinite(Date.parse(at))) throw Error('A valid event timestamp is required.');
  if(canonical.events.length && Date.parse(at)<Date.parse(canonical.events.at(-1).at)) throw Error('Event time cannot precede the previous event.');
  return advance(canonical,command,actor,at);
}
export function restore(saved) {
  if(!saved || saved.schema!==SCHEMA || saved.synthetic!==true || !Array.isArray(saved.events) || saved.events.length>100) throw Error('Unrecognized or oversized improvement record.');
  let state=initialState();
  for(const [i,event] of saved.events.entries()) {
    if(!event || !event.payload || typeof event.payload!=='object' || Array.isArray(event.payload) || Object.hasOwn(event.payload,'type')) throw Error('Invalid event payload.');
    if(event.sequence!==i+1 || typeof event.at!=='string' || !Number.isFinite(Date.parse(event.at)) || (i && Date.parse(event.at)<Date.parse(saved.events[i-1].at))) throw Error('Invalid event order or timestamp.');
    state=advance(state,{type:event.type,...event.payload},text(event.actor,'actor',100),event.at);
    if(event.cycle!==state.cycle) throw Error('Invalid improvement cycle.');
  }
  return state;
}
export function exportRecord(state) {
  const s=restore(state);
  return {...s,notice:'Synthetic browser-local workflow demonstration. Reviewer labels are not authenticated identities. No mission, training qualification, FleetVoice acceptance, or operational release is authorized.'};
}
export function nextStep(state) {
  return {EMPTY:'capture',CAPTURED:'assign',OWNED:'aar',AAR_RECORDED:'plan',ACTION_PLANNED:'correct',CORRECTION_RECORDED:'train',TRAINING_REVISED:'verify',VERIFIED:'close',CLOSED:null}[state.stage];
}
export function example(type, version=2) {
  const examples={
    capture:{summary:'Spare-power inventory discrepancy found late',observation:'Synthetic preparation exercise: the spare inventory count differed from the readiness packet.',evidence:'SYN-OBS-001: exercise inventory worksheet'},
    assign:{owner:'Demo logistics lead',due:'2026-10-20'},
    aar:{expected:'Reconcile inventory against the readiness packet before the final review.',observed:'The count was checked only during the final exercise review.',cause:'The preparation checklist did not identify a reconciliation owner or earlier checkpoint.',evidence:'SYN-AAR-001: facilitated exercise review'},
    plan:{description:'Add an earlier inventory reconciliation checkpoint and named handoff owner.',owner:'Demo logistics lead',due:'2026-10-21',success:'The sample packet and inventory worksheet reconcile; any discrepancy has an owner before the final review.'},
    correct:{evidence:'SYN-FIX-001: revised checklist and reconciled sample worksheet',result:'Synthetic desk review confirms the checkpoint, owner and discrepancy handoff are present.'},
    train:{objective:'Reconcile an inventory worksheet with a readiness packet and report discrepancies.',task:'Using supplied synthetic documents, compare counts, identify the discrepancy and route it to the named owner.',standard:'Identify every seeded discrepancy and document the owner and next action using the proposed rubric.',change:'Add the earlier reconciliation checkpoint, an explicit owner field and an independent learner attempt.'},
    verify:{reviewer:'Demo training evaluator',evidence:'SYN-CHECK-001: simulated rubric and corrected packet walkthrough',outcome:'passed',trainingVersion:version},
    close:{reviewer:'Demo training evaluator',rationale:'The synthetic correction and current training revision have linked review evidence; no operational approval is implied.'},
    reopen:{reason:'The same inventory mismatch recurred in a later synthetic exercise.',evidence:'SYN-OBS-002: recurrence worksheet'}
  };
  if(!examples[type]) throw Error('Unknown example step.');
  return {type,...clone(examples[type])};
}
