// Phase 007: deterministic, graph-linked, history-dependent signal garden
// Run: node test-007.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(script,'Math kernel present');
const C=vm.runInNewContext(script[1]+'\nPhasonCore;');
const grid=C.makeGrid(7),geo=C.generate(7,1931,.22,-.15,grid),other=C.generate(7,1931,.23,-.12,grid);
const sources=[{id:'a',pos:[-2,-1],power:1,enabled:true,species:'bloom'},{id:'b',pos:[2.3,1.4],power:1,enabled:true,species:'leech'}];
const opts={diffusion:.32,decay:.045,competition:.45,imprint:.5};
function run(config=opts,steps=120){const sim=C.createSignalMemory();for(let i=0;i<steps;i++)sim.advance(geo,sources,config);return sim;}
const A=run(),B=run();
assert.equal(JSON.stringify(A.save()),JSON.stringify(B.save()),'fixed seed + steps reproduces signal field');
assert.equal(A.stats().owners,2);assert(A.stats().occupied>8);assert(A.save().cells.length>30);
const map=new Map(A.save().cells.map(row=>[row[0],row]));assert(map.size>30);
for(const row of A.save().cells)for(const v of row.slice(1))assert(v>=0&&v<=255&&Number.isInteger(v));
const noMemory=run({...opts,imprint:0}),noCompetition=run({...opts,competition:0});
assert.notEqual(JSON.stringify(A.save().cells),JSON.stringify(noMemory.save().cells),'historical deposits causally change propagation');
assert.notEqual(JSON.stringify(A.save().cells),JSON.stringify(noCompetition.save().cells),'rival pressure changes propagation');
const saved=A.save(),restored=C.createSignalMemory();restored.load(saved);
assert.equal(restored.save().cells.length,saved.cells.length,'checkpoint works before any geometry update');
const frozen=restored.view(other);assert(frozen.table.size>30,'frozen memory renders without mutation');
restored.advance(other,sources,opts);assert.equal(restored.stats().tickCount,121);
let retained=0;for(const tile of other.tiles)if(map.has(restored.stableKey(tile))&&restored.values(tile,restored.view(other)))retained++;
assert(retained>8,'same tile-label identities retain history across a phason rearrangement');
const none=C.createSignalMemory();none.advance(geo,[],opts);assert.equal(none.stats().occupied,0);
const old=JSON.stringify(A.save());A.view(other);assert.equal(JSON.stringify(A.save()),old,'render reads must not advance state');
console.log('PASS Phase 007:',geo.tiles.length,'tiles,',A.stats().occupied,'charged,',saved.cells.length,'checkpoint cells,',retained,'retained.');
