import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const receipt=JSON.parse(fs.readFileSync('evidence/HOPS_IMPROVEMENT_RECEIPT.json','utf8'));
for(const [file,hash]of Object.entries(receipt.source_files))assert.equal(crypto.createHash('sha256').update(fs.readFileSync('hops-loop/'+file)).digest('hex'),hash,'HOPS component receipt drift: '+file);
const sample=JSON.parse(fs.readFileSync('evidence/HOPS_Improvement_Synthetic_Example.json','utf8'));
const {restore}=await import('../hops-loop/improvement-loop.mjs');
assert.equal(restore(sample).stage,'CLOSED');assert.equal(sample.synthetic,true);assert.equal(receipt.fleetvoice_verification,'deferred and unchanged');
console.log('PASS: shared HOPS component hashes, synthetic sample replay and deferred FleetVoice boundary');
