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