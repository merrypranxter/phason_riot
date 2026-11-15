// PHASON RIOT Phase 010. Run: node test-010.cjs
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const src=fs.readFileSync(__dirname+'/index.html','utf8'),m=src.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(m,'math core exists');
const C=vm.runInNewContext(m[1]+'\nPhasonCore');
const geo=C.generate(6,1931,.18,-.12,C.makeGrid(6));
const a={id:'colony-A',pos:[-.6,0],species:'bloom',power:1.6,enabled:true,genes:C.defaultGenes('bloom')};
const b={id:'colony-B',pos:[.9,.1],species:'leech',power:1.5,enabled:true,genes:C.defaultGenes('leech')};
const opts={diffusion:.42,decay:.028,competition:.45,imprint:.38,cultivation:true,wake:.11,exhaust:.05,recover:.045,rest:10,genetics:true,ecology:true,cooperation:1.25,exclusion:1.2,bondMemory:.18,treaties:{}};
const key=[a.id,b.id].sort().join('\u001f');
function run(o,steps=110,sources=[a,b]){const mem=C.createSignalMemory();for(let i=0;i<steps;i++)mem.advance(geo,sources,o);return mem;}
const off=run({...opts,ecology:false}),off2=run({...opts,ecology:false,treaties:{[key]:'feud'},cooperation:0,exclusion:1.5});
assert.equal(JSON.stringify(off.save()),JSON.stringify(off2.save()),'OFF exactly reproduces Phase 009 independent of relationship controls');
const truce=run({...opts,treaties:{[key]:'truce'}}),feud=run({...opts,treaties:{[key]:'feud'}}),adaptive=run(opts);
for(const mem of [truce,feud,adaptive]){
 const rel=mem.bonds();assert.equal(rel.length,1);assert.equal(rel[0].age,110);
 assert(Number.isFinite(rel[0].contact)&&rel[0].contact>=0&&rel[0].contact<=1);
 assert(Number.isFinite(rel[0].score)&&Math.abs(rel[0].score)<=1);
 for(const row of mem.save().cells)for(const v of row.slice(1))assert(Number.isInteger(v)&&v>=0&&v<=255);
}
assert(truce.bonds()[0].score>.08,'truce grows earned positive bond');
assert(feud.bonds()[0].score<-.08,'feud grows earned negative bond');
assert.notEqual(JSON.stringify(truce.save().cells),JSON.stringify(feud.save().cells),'truce/feud causally change energy');
assert.notEqual(JSON.stringify(truce.save().cells),JSON.stringify(off.save().cells),'positive coupling is not a cosmetic overlay');
assert.equal(JSON.stringify(truce.save()),JSON.stringify(run({...opts,treaties:{[key]:'truce'}}).save()),'live replay deterministic');
const saved=truce.save(),loaded=C.createSignalMemory();loaded.load(saved);
assert.equal(JSON.stringify(loaded.save()),JSON.stringify(saved),'relationship snapshot stable on load');
assert(Math.abs(loaded.bonds()[0].score-truce.bonds()[0].score)<.0001,'four-decimal relationship quantization');
const frozen=JSON.stringify(truce.save());truce.view(geo);truce.bonds();assert.equal(JSON.stringify(truce.save()),frozen,'read-only visualization');
const scoreBefore=JSON.stringify(loaded.bonds());for(let n=0;n<35;n++)loaded.advance(geo,[a,b],{...opts,ecology:false});
assert.equal(JSON.stringify(loaded.bonds()),scoreBefore,'OFF freezes relationship history');
const old=C.createSignalMemory();old.load(off.save());assert.equal(old.bonds().length,0,'old checkpoint loads without relationship data');
const shifted=C.generate(6,1931,.19,-.13,C.makeGrid(6)),remapped=C.createSignalMemory();remapped.load(saved);
remapped.advance(shifted,[a,b],{...opts,treaties:{[key]:'truce'}});
assert.equal(remapped.bonds()[0].age,111,'pair history retained across phason reconstruction');
const removed=C.createSignalMemory();removed.load(saved);removed.advance(geo,[a],opts);
assert.equal(removed.bonds().length,0,'removed colony loses only its associated bonds');
console.log('PASS Phase 010:',geo.tiles.length,'rhombi; truce',truce.bonds()[0].score.toFixed(3),'feud',feud.bonds()[0].score.toFixed(3),'exact OFF, replay and checkpoint migration.');
