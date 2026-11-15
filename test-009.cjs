// Phase 009: deterministic source genomes and causal ablations.
// Run: node test-009.cjs
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const m=html.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(m,'core script');
const C=vm.runInNewContext(m[1]+'\nPhasonCore');
const geo=C.generate(7,1931,.17,-.13,C.makeGrid(7));
const x={id:'a',pos:[-1.2,-1.3],power:1.2,species:'bloom',enabled:true};
const y={id:'b',pos:[1.4,1.2],power:1.1,species:'leech',enabled:true};
const genes=C.defaultGenes;
const attach=(s,g)=>({...s,genes:g});
const opts={cultivation:true,diffusion:.4,decay:.025,competition:.68,imprint:.45,wake:.07,exhaust:.11,recover:.045,rest:7,genetics:true};
function run(sources,config=opts,count=145){const sim=C.createSignalMemory();for(let i=0;i<count;i++)sim.advance(geo,sources,config);return sim;}
const primary=attach(x,genes('bloom')),rival=attach(y,genes('leech'));
const A=run([primary,rival]);
assert.equal(JSON.stringify(A.save()),JSON.stringify(run([primary,rival]).save()),'identical deterministic replay');
const baseline1=run([x,y],{...opts,genetics:false});
const baseline2=run([attach(x,{affinity:1,inhibition:2,stamina:2,recovery:2}),attach(y,{affinity:-1,inhibition:0,stamina:.45,recovery:.45})],{...opts,genetics:false});
assert.equal(JSON.stringify(baseline1.save()),JSON.stringify(baseline2.save()),'genetic OFF has unchanged baseline');
assert.notEqual(JSON.stringify(A.save()),JSON.stringify(baseline1.save()),'genetic ON changes physical signal field');
const affPositive=run([attach(x,{...genes('bloom'),affinity:1})],opts,80);
const affNegative=run([attach(x,{...genes('bloom'),affinity:-1})],opts,80);
assert.notEqual(JSON.stringify(affPositive.save().cells),JSON.stringify(affNegative.save().cells),'edge affinity changes propagation');
const interferenceLow=run([primary,attach(y,{...genes('leech'),inhibition:0})]);
const interferenceHigh=run([primary,attach(y,{...genes('leech'),inhibition:2})]);
assert.notEqual(JSON.stringify(interferenceLow.save().cells),JSON.stringify(interferenceHigh.save().cells),'offensive genome changes rival suppression');
const weak=run([attach(x,{...genes('bloom'),stamina:.45})],opts,200);
const strong=run([attach(x,{...genes('bloom'),stamina:2})],opts,200);
assert.notEqual(JSON.stringify(weak.save().cells),JSON.stringify(strong.save().cells),'stamina changes local fatigue history');
const slow=run([attach(x,{...genes('bloom'),recovery:.45})],opts,200);
const fast=run([attach(x,{...genes('bloom'),recovery:2})],opts,200);
assert.notEqual(JSON.stringify(slow.save().cells),JSON.stringify(fast.save().cells),'recovery changes tile state history');
const mutation=C.mutateGenes('bloom',genes('bloom'),42);
assert.equal(JSON.stringify(mutation),JSON.stringify(C.mutateGenes('bloom',genes('bloom'),42)),'mutation repeats from seed');
assert.notEqual(JSON.stringify(mutation),JSON.stringify(genes('bloom')),'mutation materially alters genome');
const child=C.crossGenes(primary,rival,101);
assert.equal(JSON.stringify(child),JSON.stringify(C.crossGenes(primary,rival,101)),'breeding repeats from seed');
assert.notEqual(JSON.stringify(child),JSON.stringify(primary.genes),'child is not clone of parent A');
assert.notEqual(JSON.stringify(child),JSON.stringify(rival.genes),'child is not clone of parent B');
for(const g of [mutation,child,genes('leech',{affinity:300,inhibition:Infinity,stamina:-4,recovery:'bad'})]){
 for(const [k,[lo,hi]] of Object.entries({affinity:[-1,1],inhibition:[0,2],stamina:[.45,2],recovery:[.45,2]})){
  assert(Number.isFinite(g[k])&&g[k]>=lo&&g[k]<=hi,k+' remains bounded');
 }
}
const field=A.view(geo),census=C.colonyCensus(geo,field);
assert.equal(census.leaders.length,geo.tiles.length);
assert.equal(census.occupied.length,2);
assert(census.occupied.reduce((a,b)=>a+b,0)<=geo.tiles.length);
const frozen=JSON.stringify(A.save());C.colonyCensus(geo,A.view(geo));assert.equal(JSON.stringify(A.save()),frozen,'census is read-only');
const restored=C.createSignalMemory();restored.load(A.save());
assert.equal(JSON.stringify(restored.save()),JSON.stringify(A.save()),'checkpoint is unchanged and backward compatible');
console.log('PASS Phase 009:',geo.tiles.length,'tiles,',census.occupied.join('/'),'owned tiles; exact OFF, causal genetics, inheritance and checkpoints.');
