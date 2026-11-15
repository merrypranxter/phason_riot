// PHASON RIOT 015: real, bounded electrical -> chemical deposits and two-way causal loop.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const src=fs.readFileSync(__dirname+'/index.html','utf8'),code=src.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(code);
const C=vm.runInNewContext(code[1]+'\nPhasonCore');
const grid=C.makeGrid(6),geo=C.generate(6,1931,.18,-.10,grid),extent=6*2.6+5;
const fresh=()=>C.createReactionDiffusion(64,791);
const source=(species,id='colony-A')=>({id,species,pos:[0,0],power:1.5,enabled:true});
const tile=geo.tiles[Math.floor(geo.tiles.length/2)],nx=tile.c[0]/extent+.5,ny=tile.c[1]/extent+.5;
const row=new Float32Array(geo.tiles.length);row.fill(0);row[Math.floor(geo.tiles.length/2)]=.85;
for(const [species,kind] of [['bloom','V gain'],['leech','V loss'],['fossil','U gain']]){
 const rd=fresh();rd.paint(nx,ny,.09,'addV',.8);
 const beforeU=rd.u.reduce((a,b)=>a+b,0),beforeV=rd.v.reduce((a,b)=>a+b,0);
 const info=C.depositSignalChemistry(rd,geo,[source(species)],{owners:['colony-A'],rows:[row]},{mode:'ecosystem',threshold:.1,strength:1.6,extent});
 assert(info.sites===1&&info.cells>0&&info.dose>0,kind+' has bounded real deposits');
 const afterU=rd.u.reduce((a,b)=>a+b,0),afterV=rd.v.reduce((a,b)=>a+b,0);
 if(species==='bloom')assert(afterV>beforeV,'Bloom increases actual activator V');
 if(species==='leech')assert(afterV<beforeV,'Leech removes actual activator V');
 if(species==='fossil')assert(afterU>beforeU,'Fossil replenishes actual substrate U');
 for(const value of [...rd.u,...rd.v])assert(Number.isFinite(value)&&value>=0&&value<=1,'chemical bounds maintained');
}
const owner=[source('bloom','a'),source('leech','b'),source('fossil','c')];owner[0].pos=[-1,-.8];owner[1].pos=[1,.9];owner[2].pos=[0,-2];
const opts={diffusion:.4,decay:.03,competition:.45,imprint:.4,cultivation:true,wake:.11,exhaust:.055,recover:.05,rest:8,genetics:true,ecology:true,cooperation:.7,exclusion:.6,bondMemory:.12,treaties:{},underground:false};
function run(strength=1,chemToElectric=true,count=65){
 const signal=C.createSignalMemory(),rd=fresh();let last;
 for(let i=0;i<count;i++){
  const chemField=Float32Array.from(geo.tiles,t=>rd.sample(t.c[0]/extent+.5,t.c[1]/extent+.5));
  signal.advance(geo,owner,{...opts,chemicalCoupling:chemToElectric,chemicalStrength:.85,chemicalMode:'contrast',chemicalField:chemField});
  last=C.depositSignalChemistry(rd,geo,owner,signal.excitation(geo),{mode:'ecosystem',threshold:.09,strength,extent});
  rd.step(.037,.062,2);
 }
 return {rd:rd.save(),signal:signal.save(),last};
}
const on=run(),again=run(),baseline=run(0),oneWay=run(1,false);
assert.deepEqual(on.rd,again.rd,'deterministic chemistry history with identical seeds');
assert.deepEqual(on.signal,again.signal,'deterministic electrical history with identical seeds');
assert.notDeepEqual(on.rd,baseline.rd,'signal deposits causally modify chemical reaction history');
assert.notDeepEqual(on.signal,baseline.signal,'chemistry feedback changes later electrical history');
assert.notDeepEqual(on.signal,oneWay.signal,'chemical-to-electrical switch changes electrical future');
assert(on.last.sites>0&&on.last.cells>0,'actual active colonies deposit into grid');
const rd=fresh(),unchanged=rd.save();
assert.equal(JSON.stringify(C.depositSignalChemistry(rd,geo,owner,{owners:['a'],rows:[row]},{mode:'secrete',strength:0,extent})),JSON.stringify({cells:0,dose:0,sites:0}));
assert.deepEqual(rd.save(),unchanged,'zero-strength exact baseline');
assert.equal(JSON.stringify(C.depositSignalChemistry(rd,geo,owner,{owners:['a'],rows:[new Float32Array(1)]},{mode:'secrete',strength:1,extent})),JSON.stringify({cells:0,dose:0,sites:0}),'invalid rows cannot deposit');
console.log('PASS Phase 015:',geo.tiles.length,'tiles;',on.last.sites,'active sites;',on.last.cells,'chem pixels affected; 3 species, exact OFF, 2-way causal divergence and deterministic replay');
