// No dependencies. Uses the exact mathematical kernel shipped in index.html.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const m=html.match(/<script id="mathcore">([\s\S]*?)<\/script>/);
assert(m,'core script exists');
const C=vm.runInNewContext(m[1]+'\nPhasonCore;');
const G=C.makeGrid(8),A=C.generate(8,1931,0,0,G),B=C.generate(8,1931,.41,-.18,G);
assert(A.tiles.length>100,'finite patch');
assert(A.thick>A.thin,'thick-rhomb majority');
assert(A.connections.length>100,'adjacency graph');
assert(C.compare(A,B).changed>0,'internal offsets change K-labels');
for(const t of A.tiles){
  assert.equal(t.p.length,4);
  for(let i=0;i<4;i++){
    const a=t.p[i],b=t.p[(i+1)%4];
    assert(Math.abs(Math.hypot(a[0]-b[0],a[1]-b[1])-1)<1e-9,'unit edge');
  }
}
for(const e of A.connections){
  assert(e.a>=0&&e.b>=0&&e.a<A.tiles.length&&e.b<A.tiles.length);
  const a=A.tiles[e.a].p,b=A.tiles[e.b].p;
  let count=0;
  for(const p of a)for(const q of b)if(Math.hypot(p[0]-q[0],p[1]-q[1])<1e-6)count++;
  assert.equal(count,2,'graph link crosses a genuine shared edge');
}
for(const mode of ['orbit','choir','saw','tide','braid','gyre','quake']){
  const first=C.phasonAt(0,mode,.82,.13,-.21),last=C.phasonAt(1,mode,.82,.13,-.21);
  assert(Math.hypot(first[0]-last[0],first[1]-last[1])<1e-11,'closed '+mode);
}
console.log('PHASON RIOT checks PASS:',A.tiles.length,'rhombi,',A.connections.length,'neighbor links, 7 closed paths.');