import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {restore} from '../hops-loop/improvement-loop.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const receipt=read('evidence/RR01_LESSON_VALIDATION.json');
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
assert.equal(sha(receipt.package),receipt.package_sha256);
for(const [file,hash] of Object.entries(receipt.files)){
 const path='files/'+file; assert.equal(sha(path),hash); assert.equal(fs.readFileSync(path).subarray(0,5).toString(),'%PDF-');
}
const spec=read('evidence/lesson_specification.json');
assert.equal(spec.duration.reduce((a,b)=>a+b,0),spec.metadata.duration_minutes);
assert.equal(spec.rubric.reduce((a,r)=>a+r.max_points,0),spec.proposed_pass.maximum_points);
assert.ok(spec.proposed_pass.minimum_points<=spec.proposed_pass.maximum_points);
assert.equal(receipt.pilot_run,false);
const record=restore(read('evidence/RR01_HOPS_Exercise_Example.json'));
assert.equal(record.stage,'TRAINING_REVISED');
assert.equal(record.events.length,6);
assert.equal(record.verification,null); assert.equal(record.closure,null);
console.log('PASS: lesson package/PDF hashes, scoring/timing consistency and HOPS reference replay');
