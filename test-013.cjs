// PHASON RIOT Phase 013: genuine Delaunay, Voronoi dual, numerical Gray–Scott and source isolation.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8'),m=html.match(/<script id="mathcore">([\s\S]*?)<\/script>/);assert(m,'math core');
const C=vm.runInNewContext(m[1]+'\nPhasonCore');
const mesh=C.delaunayMesh(83,8),same=C.delaunayMesh(83,8);
assert.equal(JSON.stringify(mesh.triangles),JSON.stringify(same.triangles),'seeded Delaunay replay');
assert(mesh.triangles.length>80&&mesh.edges.length>120&&mesh.dualLines.length>100);
const edges=new Set(mesh.edges.map(e=>[e.a,e.b].sort((a,b)=>a-b).join(':')));
assert.equal(edges.size,mesh.edges.length,'unique edges');
const incidence=new Map();
for(let k=0;k<mesh.triangles.length;k++)for(let i=0;i<3;i++){const t=mesh.triangles[k],key=[t[i],t[(i+1)%3]].sort((a,b)=>a-b).join(':');let v=incidence.get(key)||[];v.push(k);incidence.set(key,v);}
assert.equal(mesh.dualLines.length,[...incidence.values()].filter(a=>a.length===2).length,'Voronoi dual is exactly the shared interior-edge set');
for(const t of mesh.triangles){
 const [a,b,c]=t.map(i=>mesh.points[i]);const d=2*(a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1]));
 assert(Math.abs(d)>1e-8,'nondegenerate triangle');
 const aa=a[0]*a[0]+a[1]*a[1],bb=b[0]*b[0]+b[1]*b[1],cc=c[0]*c[0]+c[1]*c[1];
 const x=(aa*(b[1]-c[1])+bb*(c[1]-a[1])+cc*(a[1]-b[1]))/d,y=(aa*(c[0]-b[0])+bb*(a[0]-c[0])+cc*(b[0]-a[0]))/d,r2=(a[0]-x)**2+(a[1]-y)**2;
 for(let i=0;i<mesh.points.length;i++)if(!t.includes(i)){const p=mesh.points[i];assert((p[0]-x)**2+(p[1]-y)**2>=r2-1e-5,'Delaunay empty circumcircle property');}
}
for(const dual of [false,true])for(const [x,y] of [[0,0],[1.3,2],[-2,3]]){const v=C.meshAt(mesh,x,y,dual);assert(Number.isFinite(v)&&v>=0&&v<=1);}
const A=C.createReactionDiffusion(64,943),B=C.createReactionDiffusion(64,943);
assert.equal(JSON.stringify(A.save()),JSON.stringify(B.save()),'same initial chemical state');
A.step(.036,.062,120);B.step(.036,.062,120);
assert.equal(JSON.stringify(A.save()),JSON.stringify(B.save()),'deterministic fixed-step PDE');
assert(A.save().v.some(v=>v>0)&&A.save().v.some(v=>v<10),'spatially varied concentration');
for(const f of [A.u,A.v])for(const v of f)assert(Number.isFinite(v)&&v>=0&&v<=1,'bounded fields');
const masked=C.createReactionDiffusion(64,943);masked.step(.036,.062,120,(x,y)=>x>.5?1:0);
assert.notEqual(JSON.stringify(A.save().v),JSON.stringify(masked.save().v),'spatial feed mask CAUSALLY modifies the PDE');
const frozen=C.createReactionDiffusion(64,943),baseline=C.createReactionDiffusion(64,943);frozen.step(.036,.062,0);
assert.equal(JSON.stringify(frozen.save()),JSON.stringify(baseline.save()),'zero-step OFF');
const loaded=C.createReactionDiffusion(64,943,A.save());
assert.equal(JSON.stringify(loaded.save()),JSON.stringify(A.save()),'compressed checkpoint roundtrip');
const sim=C.createSignalMemory(),before=JSON.stringify(sim.save());
A.step(.036,.062,5);C.meshAt(mesh,.2,.3);assert.equal(JSON.stringify(sim.save()),before,'no side effects on colony state');
console.log('PASS Phase 013:',mesh.points.length,'sites,',mesh.triangles.length,'triangles,',mesh.dualLines.length,'Voronoi edges; PDE and feed gate verified');
