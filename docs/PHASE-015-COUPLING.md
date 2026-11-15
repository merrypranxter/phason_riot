# PHASON RIOT Phase 015 — Reciprocal Feedback Model

## Mathematical state

E[j,i] is the existing electrical concentration of source owner j at a real pentagrid rhomb i, propagated along verified shared-edge neighbors. U[x,y] and V[x,y] are Gray–Scott substrate and activator concentrations in [0,1] on a periodic 96×96 numerical grid. Each rhomb center projects to the same chemical torus coordinates as Phase 014: (p/(2.6R+5)+1/2) mod 1.

This is an original synthetic mathematical ecology for artwork, not validated biochemistry or a local phason-flip model.

## Fixed-step operator and causality

Phase 015's opt-in linked clock advances these systems in an explicit order:

1. Electrical energy advances on actual rhomb graph connections, reading chemical V from the preceding step if the chemistry→electrical bridge is enabled.
2. Per-owner electrical concentrations are read from the newly updated graph state.
3. Excited rhombi deposit local, bounded chemicals into the Gray–Scott grid.
4. Gray–Scott reaction/diffusion advances by the chosen number of numerical substeps. The next electrical tick sees this updated chemistry.

Live preview executes at most three 0.14-second coupled steps per rendered frame. Evolve +48 performs the same operator with fixed present geometry and records both histories as a single Undo action. Neither rendering nor GIF/MP4 export advances the chemical or electrical equations.

## Reagent deposition

For each owner and rhomb, use the real electrical concentration E in [0,1]. If E is below the adjustable threshold it deposits nothing; above threshold define q=(E−threshold)/(1−threshold). Project the real rhomb center to the chemical torus, add q to its central cell, 0.55q to orthogonal neighboring cells and 0.30q to diagonal neighbors, using wrapped edges.

Species Ecology chooses a chemical action per colony: Bloom emits V; Leech consumes V; Fossil replenishes U. Global overrides can make every enabled colony secrete V, consume V or add U.

For each chemical pixel, let e, c, n be accumulated emission, consumption and nourishment. Define:

dV=min(0.12, 0.08 × strength × e)
dC=min(0.12, 0.075 × strength × c)
dU=min(0.12, 0.085 × strength × n)

Vnew=clamp((V+dV(1−V))(1−dC)(1−0.17dU),0,1)
Unew=clamp(U(1−0.42dV)+dU(1−U)+0.24dC(1−U),0,1)

All amounts and concentrations are bounded. These source/sink terms do not conserve chemical mass; no physical units are claimed. They do NOT add imaginary graph edges or mutate the pentagrid.

## Exact OFF and saved work

The new bridge is OFF by default. It becomes active only with a positive deposit strength, enabled electrical sources, Pattern Lab plus an enabled reaction-diffusion layer, and positive chemical step speed. When any prerequisite fails, the original Phase 014 independent evolution clocks and laws run unchanged. Chemical-to-electrical coupling remains separately switchable: two-way feedback requires both switches ON.

Zero deposit strength is an exact chemical no-op. Undo, Redo and recipe JSON preserve the existing signals, chemical field, gene traits, routes and palettes. The saved fields are quantized to 8-bit, so restarting approximates rather than bit-exactly reproduces continuous Float32 evolution.

The living chemical/electrical equations are not periodic. True GIF/MP4 looping visual exports freeze their current state while sampling periodic geometry and light motion. This is not a claim of a temporally looping reaction-diffusion solution.

## Validation

Nine local Node suites (Phases 007–015) passed; Phase 015 covers species-specific U/V changes, bounded state, deterministic replay, zero-dose OFF baseline, and one-way versus two-way causal differences. Phone-sized 390×844 and desktop 1280×900 Chromium checks passed start, Evolve +48, two-history Undo/Redo, disconnect and recipes. OFF rendering is pixel-identical to Phase 014 at both sizes.

Valid GIF89a: 360×360, 16 frames, 2.000 seconds, infinite loop. Valid H.264 MP4: 480×480, measured 2.0312 seconds in desktop Chromium. Physical iPhone Safari and downstream social-app playback were NOT tested. No Netlify or paid APIs used.