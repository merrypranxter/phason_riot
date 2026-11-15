// Phase 014 — bounded chemical painting + reversible chemical/electrical causal coupling
// node test-014.cjs
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const match=html.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(match);
const C=vm.runInNewContext(match[1]+'\nPhasonCore');
const rd=C.createReactionDiffusion(64,791),start=rd.save(),v0=rd.sample(.5,.5);
const changed=rd.paint(.5,.5,.075,'addV',.85);
assert(changed>50&&rd.sample(.5,.5)>v0,'addV modifies actual concentration');
assert.equal(rd.tick,0,'brush does not advance chemical clock');
const injected=rd.save();assert.notEqual(JSON.stringify(start),JSON.stringify(injected));
const replay=C.createReactionDiffusion(64,791);replay.paint(.5,.5,.075,'addV',.85);
assert.equal(JSON.stringify(replay.save()),JSON.stringify(injected),'deterministic brush replay');
const uv=C.createReactionDiffusion(64,791);uv.paint(.5,.5,.075,'addV',.85);
const before=uv.u[32*64+32];uv.paint(.5,.5,.075,'addU',.8);
assert(uv.u[32*64+32]>before,'addU replenishes U');
const after=rd.sample(.5,.5);rd.paint(.5,.5,.075,'eraseV',.9);assert(rd.sample(.5,.5)<after,'eraseV removes V');
for(const a of [rd.u,rd.v])for(const value of a)assert(Number.isFinite(value)&&value>=0&&value<=1);
const restored=C.createReactionDiffusion(64,791,injected);
assert.equal(JSON.stringify(restored.save()),JSON.stringify(injected),'8-bit checkpoint loads');
const geo=C.generate(6,1931,.1,-.13,C.makeGrid(6));
const sources=[{id:'a',pos:[-1.3,-.7],power:1.4,species:'bloom',enabled:true},{id:'b',pos:[1.4,.7],power:1.4,species:'leech',enabled:true}];
const opts={diffusion:.42,decay:.04,competition:.4,imprint:.4,cultivation:true,wake:.11,exhaust:.05,recover:.045,rest:10,genetics:false,ecology:false,underground:false};
const field=new Float32Array(geo.tiles.map(t=>C.clamp(.2+.8*(t.c[0]+8)/16,0,1)));
function run(o){const sim=C.createSignalMemory();for(let i=0;i<160;i++)sim.advance(geo,sources,o);return sim.save();}
const baseline=run(opts);
assert.equal(JSON.stringify(baseline),JSON.stringify(run({...opts,chemicalCoupling:false,chemicalField:field,chemicalStrength:1.5,chemicalMode:'suppress'})),'OFF exactly Phase 013');
const on={...opts,chemicalCoupling:true,chemicalField:field,chemicalStrength:1,chemicalMode:'promote'};
const changedSignal=run(on),blocked=run({...on,chemicalMode:'suppress'});
assert.notEqual(JSON.stringify(changedSignal.cells),JSON.stringify(baseline.cells),'coupling changes real tile history');
assert.notEqual(JSON.stringify(changedSignal.cells),JSON.stringify(blocked.cells),'positive/negative transport differ');
assert.equal(JSON.stringify(changedSignal),JSON.stringify(run(on)),'causal replay deterministic');
assert.equal(JSON.stringify(baseline),JSON.stringify(run({...on,chemicalStrength:0})),'zero strength baseline');
assert.equal(JSON.stringify(baseline),JSON.stringify(run({...on,chemicalField:new Float32Array(7)})),'invalid-length field fallback');
console.log('PASS Phase 014:',changed,'chemical cells edited; causal transport, all modes, exact OFF, deterministic replay and checkpoint');
