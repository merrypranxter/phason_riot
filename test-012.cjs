// PHASON RIOT Phase 012: deterministic closed procedural texture fields.
// node test-012.cjs
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const match=html.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(match,'inline math core');
const C=vm.runInNewContext(match[1]+'\nPhasonCore');
const families=['voronoi','triangles','labyrinth','moire','contours','weave','fracture','halftone','flow','glyph','quasi','marble','bubbles','stipple'];
const signatures=new Set();
for(const kind of families){
 const samples=[];
 for(let n=0;n<13;n++){
  const x=Math.sin(n*1.367)*3.7+2,y=Math.cos(n*2.037)*4-1;
  const v=C.patternAt(kind,x,y,.217,431,1,3),later=C.patternAt(kind,x,y,1.217,431,1,3);
  assert(Number.isFinite(v)&&v>=0&&v<=1,kind+' is bounded');
  assert(Math.abs(v-later)<1e-10,kind+' closes at 1 loop');
  samples.push(v.toFixed(3));
 }
 const signature=samples.join(',');
 assert(!signatures.has(signature),kind+' actually differs from the other families');
 signatures.add(signature);
 assert.equal(C.patternAt(kind,1.2,-.7,.135,99,1,3),C.patternAt(kind,1.2,-.7,.135,99,1,3),kind+' deterministic replay');
}
const geo=C.generate(6,1931,.17,-.12,C.makeGrid(6));assert(geo.tiles.length>600);
const sim=C.createSignalMemory(),before=JSON.stringify(sim.save());
for(const kind of families)for(let n=0;n<15;n++)C.patternAt(kind,n/3,-n/4,n/15,125,1,3);
assert.equal(JSON.stringify(sim.save()),before,'patterns must not alter living simulation state');
console.log('PASS Phase 012:',families.length,'distinct bounded periodic deterministic fields; signal-state isolation');
