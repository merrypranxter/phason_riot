# Phase 011 — Underground coupling contract

Core: `PhasonCore.compileUnderground(geo,stitches,sources)` returns `{edges,routes}` for explicit pair-bound authored stitches only. Source pairs use sorted immutable IDs separated by U+001F. Every output edge is confirmed against the current `geo.connections`. Recompute when global phason geometry or authored path/source state changes. No shortcut or new geometry edge is created.

`createSignalMemory().advance` first runs the original Phase 010 transport/interaction equations. When both `opts.ecology` and `opts.underground` are true, it applies one of two optional corridor operations **before** fatigue/regime updates and pair learning. Each uses the pair score from the previous simulation step.

**Cooperation:** For owner j across bound rhomb edge (u,v), let d=|E_j[u]-E_j[v]|, b=positive pair score, g=user transport strength. Transfer `min(d*0.11*b*g,0.035*g, donor energy, receiver headroom)` from high energy to low energy. Each added edge flux conserves owner j's energy before later safety clamps.

**Hostility:** For negative bond score, a bounded inhibitory sink at each endpoint is proportional to the owner's local energy and the opponent's energy across the edge. It is explicitly nonconservative and does not imply physically measured electrical behavior.

**Proofs:** Exact OFF baseline Phase 010, reproducible causal ON divergence, all compiled route segments are actual shared neighbors, explicit invalid/disabled pair guard, recipe/relationship save and load, new phason patch connection verification. Same initial state evolves deterministically until lossy 8-bit checkpoint encoding, which is not bitwise identical on resumed runs. Stateful colony memories themselves are not periodic; GIF/MP4 freeze them while looping periodic visual phases.

This is a designed synthetic electrical art model, not validated neuronal physics, biological symbiosis or a local phason-flip solver.