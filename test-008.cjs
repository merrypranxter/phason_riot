// PHASON RIOT Phase 008 — dependency-free test suite. Run: node test-008.cjs
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const raw=html.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(raw);
const C=vm.runInNewContext(raw[1]+'\nPhasonCore');
const geo=C.generate(6,1931,.1,-.13,C.makeGrid(6));
const sources=[{id:'a',pos:[0,0],species:'bloom',power:2,enabled:true},{id:'b',pos:[2,2],species:'leech',power:1.5,enabled:true}];
const params={cultivation:true,diffusion:.48,decay:.02,imprint:.3,competition:.45,exhaust:.15,recover:.12,wake:.06,rest:6};
function sim(opts,steps=85){const m=C.createSignalMemory();for(let i=0;i<steps;i++)m.advance(geo,sources,opts);return m;}
const a=sim(params),b=sim(params);
assert.equal(JSON.stringify(a.save()),JSON.stringify(b.save()),'same starting state gives deterministic history');
const stats=a.stats();assert(stats.active>0&&stats.refractory>0&&stats.dormant>0,'three actual regimes emerge');
assert.equal(stats.active+stats.refractory+stats.dormant,geo.tiles.length,'one regime per tile');
const saved=a.save();assert.equal(saved.format,'signal-memory-v2');
for(const row of saved.cells){assert.equal(row.length,saved.owners.length+5);
 for(const v of row.slice(1))assert(Number.isInteger(v)&&v>=0&&v<=255);}
const loaded=C.createSignalMemory();loaded.load(saved);
assert.equal(JSON.stringify(saved),JSON.stringify(loaded.save()),'checkpoint save/load is stable');
for(let i=0;i<9;i++){a.advance(geo,sources,params);loaded.advance(geo,sources,params);}
const expected=new Map(a.save().cells.map(row=>[row[0],row])),actual=loaded.save().cells;
let differences=0,approx=0;
for(const row of actual){const old=expected.get(row[0]);if(!old)continue;
 if(row[old.length-2]!==old[old.length-2])differences++;
 for(let j=1;j<row.length-2;j++)approx+=Math.abs(row[j]-old[j]);}
assert(differences<geo.tiles.length*.08,'resumed regime field stays close after quantized restore');
assert(approx/(actual.length*3)<3,'resumed concentrations stay close after 8-bit restore');
const baseline=sim({...params,cultivation:false});
assert.equal(baseline.stats().active,0);assert.equal(baseline.stats().refractory,0);
assert.notEqual(JSON.stringify(baseline.save().cells),JSON.stringify(b.save().cells),'ON changes actual causal field');
const freeze=JSON.stringify(a.save());a.view(geo);assert.equal(JSON.stringify(a.save()),freeze,'render must not change history');
const sample=geo.tiles[0],v1={format:'signal-memory-v1',tickCount:7,owners:['a','b'],cells:[[sample.id+'|'+sample.label,125,200,70]]};
const migrate=C.createSignalMemory();migrate.load(v1);
assert.equal(migrate.save().format,'signal-memory-v2');migrate.advance(geo,sources,params);
assert.equal(migrate.stats().tickCount,8);
const shifted=C.generate(6,1931,.11,-.14,C.makeGrid(6)),remap=C.createSignalMemory();
remap.load(saved);remap.advance(shifted,sources,params);
assert.equal(remap.stats().tickCount,86,'global phason remap preserves history tick counter');
console.log('PASS Phase 008:',geo.tiles.length,'rhombi,',stats.active,'conducting,',stats.refractory,'refractory; replay, ablation, v1 migration, remap');
