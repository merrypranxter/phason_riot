// Run with: node test.cjs. Dependency-free geometry regression checks.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const src=fs.readFileSync(__dirname+'/index.html','utf8'),match=src.match(/<script id="mathcore">([\s\S]*?)<\/script>/);
assert(match,'math core inline script');
const C=vm.runInNewContext(match[1]+'\nPhasonCore');
const grid=C.makeGrid(8),A=C.generate(8,1931,0,0,grid),B=C.generate(8,1931,.41,-.18,grid);
assert(A.tiles.length>100);assert(A.thick>A.thin);assert(A.connections.length>100);
assert(C.compare(A,B).changed>0,'internal offsets change K labels');
for(const t of A.tiles){assert.equal(t.p.length,4);for(let j=0;j<4;j++){const p=t.p[j],q=t.p[(j+1)%4];assert(Math.abs(Math.hypot(p[0]-q[0],p[1]-q[1])-1)<1e-9,'unit edges');}}
const edges=new Set(A.connections.map(e=>[Math.min(e.a,e.b),Math.max(e.a,e.b)].join(':')));
for(const e of A.connections){let common=0;for(const p of A.tiles[e.a].p)for(const q of A.tiles[e.b].p)if(Math.hypot(p[0]-q[0],p[1]-q[1])<1e-6)common++;assert.equal(common,2,'adjacent tiles share exactly one edge');}
const routes=C.walks(A,1931,28,14);assert.equal(routes.length,28);
assert.equal(JSON.stringify(routes),JSON.stringify(C.walks(A,1931,28,14)),'replay');
for(const route of routes)for(let i=0;i<route.length;i++){const a=route[i],b=route[(i+1)%route.length];assert(edges.has([Math.min(a,b),Math.max(a,b)].join(':')),'closed route follows shared-edge graph');}
for(const mode of ['orbit','choir','saw','tide','braid','gyre','quake']){
 const x=C.phasonAt(0,mode,.82,.13,-.21),y=C.phasonAt(1,mode,.82,.13,-.21);
 assert(Math.hypot(x[0]-y[0],x[1]-y[1])<1e-11,'primary closure: '+mode);
 for(let n=1;n<=4;n++){const a=C.phasonAt(.23,mode,.56,.08,-.12),b=C.phasonAt(n+.23,mode,.56,.08,-.12);assert(Math.hypot(a[0]-b[0],a[1]-b[1])<1e-11,'twin closure: '+mode);}
}
console.log('PASS',A.tiles.length,'rhombi,',A.connections.length,'edges,',routes.length,'closed routes, seven + twin loops.');

// Phase 004: a finger-stroke follows real graph adjacency, never teleports.
const stitches=[{id:'stitch-a',points:[[0,0],[1.5,-1.1],[2.3,1.7],[-.6,2]]}];
const guided=C.stitchRoutes(A,stitches);
assert.equal(guided.length,1,'one editable stitch becomes one real graph path');
assert(guided[0].indices.length>4,'route has multiple real tiles');
assert.equal(JSON.stringify(guided),JSON.stringify(C.stitchRoutes(A,stitches)),'guided deterministic replay');
for(const route of guided){
 for(let i=0;i<route.indices.length;i++){
  const a=route.indices[i],b=route.indices[(i+1)%route.indices.length];
  assert(edges.has([Math.min(a,b),Math.max(a,b)].join(':')),'stitch only traverses shared-edge neighbors');
 }
}
const depths=C.graphDepths(A,[0,0]);
assert.equal(depths.length,A.tiles.length,'graph-distance field covers all tile identities');
assert.equal(Math.min(...depths),0,'branching propagation has a real source');
for(const e of A.connections)if(depths[e.a]>=0&&depths[e.b]>=0)assert(Math.abs(depths[e.a]-depths[e.b])<=1,'BFS neighboring depths differ by at most one');
assert.equal(C.stitchRoutes(A,[]).length,0,'no authored guides produce no guide routes');
console.log('PASS: Phase 004 stitched rhomb graph routes, deterministic replay, branching network depths.');


// Phase 005: forked guides traverse actual neighboring tile edges, replay and close.
for(const item of guided){
 const x=C.branchRoutes(A,item,1931,3),y=C.branchRoutes(A,item,1931,3);
 assert.equal(JSON.stringify(x),JSON.stringify(y),'branch determinism');
 assert(x.length>0,'branch generation yields paths');
 for(const branch of x){
  assert(branch.indices.length>=3,'branch returns along its path');
  for(let i=0;i<branch.indices.length;i++){
   const a=branch.indices[i],b=branch.indices[(i+1)%branch.indices.length];
   assert(edges.has([Math.min(a,b),Math.max(a,b)].join(':')),'branch traverses a real edge');
  }
  const first=C.routePosition(A,branch.indices,0),last=C.routePosition(A,branch.indices,1);
  assert(Math.hypot(first[0]-last[0],first[1]-last[1])<1e-9,'branch closes at a repeated phase');
 }
}
console.log('PASS: Phase 005 branching graph routes, closed motion, deterministic replay.');
