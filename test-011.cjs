// PHASON RIOT Phase 011: actual shared-edge underground conduits and causal ecology.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8'),m=html.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(m);
const C=vm.runInNewContext(m[1]+'\nPhasonCore');
const radius=6,grid=C.makeGrid(radius),geo=C.generate(radius,1931,.11,-.08,grid);
const a={id:'colony-A',pos:[-1.4,-.5],species:'bloom',power:1.8,enabled:true,genes:C.defaultGenes('bloom')};
const b={id:'colony-B',pos:[1.4,.5],species:'leech',power:1.7,enabled:true,genes:C.defaultGenes('leech')};
const pair=[a.id,b.id].sort().join('\u001f');
const route={id:'path-1',name:'Bridge',enabled:true,points:[a.pos.slice(),[0,1.7],b.pos.slice()],bondPair:pair,velocity:1,forks:0};
const opts={diffusion:.5,decay:.025,competition:.4,imprint:.4,cultivation:true,wake:.11,exhaust:.05,recover:.045,rest:8,genetics:true,ecology:true,cooperation:1.3,exclusion:1.2,bondMemory:.18,treaties:{[pair]:'truce'},underground:true,undergroundStrength:1.3,stitches:[route]};
const network=C.compileUnderground(geo,[route],[a,b]);
assert(network.edges.length>4,'authored path becomes a nonempty graph conduit');
const graphEdges=new Set(geo.connections.map(e=>[Math.min(e.a,e.b),Math.max(e.a,e.b)].join(':')));
for(const e of network.edges){assert(graphEdges.has([Math.min(e.a,e.b),Math.max(e.a,e.b)].join(':')),'NO imaginary edges');assert.equal(e.pair,pair)}
assert.equal(JSON.stringify(network),JSON.stringify(C.compileUnderground(geo,[route],[a,b])),'cached network deterministic');
function start(config,steps=150){const mem=C.createSignalMemory();for(let i=0;i<steps;i++)mem.advance(geo,[a,b],config);return mem;}
const off=start({...opts,underground:false});
const baseline=start({...opts,underground:false,stitches:[]});
assert.equal(JSON.stringify(off.save()),JSON.stringify(baseline.save()),'OFF completely ignores stitched relationship routes');
const before=start({...opts,underground:false},120).save();
function nextOne(snapshot,options){const mem=C.createSignalMemory();mem.load(snapshot);mem.advance(geo,[a,b],options);return mem.save();}
const enabled=nextOne(before,opts),disabled=nextOne(before,{...opts,underground:false});
assert.notEqual(JSON.stringify(enabled.cells),JSON.stringify(disabled.cells),'positive bond changes real tile concentrations');
assert.equal(JSON.stringify(enabled),JSON.stringify(nextOne(before,opts)),'ON replay deterministic');
assert.equal(JSON.stringify(disabled),JSON.stringify(nextOne(before,{...opts,underground:true,stitches:[]})),'unassigned network cannot change simulation');
const wrongPairRoute={...route,bondPair:'colony-A\u001fnonexistent'};
assert.equal(C.compileUnderground(geo,[wrongPairRoute],[a,b]).edges.length,0,'invalid bond never becomes conduit');
const disabledRoute={...route,enabled:false};
assert.equal(C.compileUnderground(geo,[disabledRoute],[a,b]).edges.length,0,'disabled authored path has no transport');
const treatyOpts={...opts,treaties:{[pair]:'feud'}};
const feudBefore=start({...treatyOpts,underground:false},120).save();
const feudOn=nextOne(feudBefore,treatyOpts),feudOff=nextOne(feudBefore,{...treatyOpts,underground:false});
assert.notEqual(JSON.stringify(feudOn.cells),JSON.stringify(feudOff.cells),'hostile pair creates local inhibitory sink');
const loaded=C.createSignalMemory();loaded.load(enabled);assert.equal(JSON.stringify(loaded.save()),JSON.stringify(enabled),'memory and pairs survive save/load');
const shifted=C.generate(radius,1931,.16,-.06,grid),reprojected=C.compileUnderground(shifted,[route],[a,b]);
assert(reprojected.edges.length>2);const shiftedEdges=new Set(shifted.connections.map(e=>[Math.min(e.a,e.b),Math.max(e.a,e.b)].join(':')));
for(const e of reprojected.edges)assert(shiftedEdges.has([Math.min(e.a,e.b),Math.max(e.a,e.b)].join(':')),'changed quasicrystal reconnection is real');
console.log('PASS Phase 011:',geo.tiles.length,'tiles,',network.edges.length,'bound edges;',reprojected.edges.length,'after phason, exact OFF, alliance flow, feud sink, replay and persistence.');
