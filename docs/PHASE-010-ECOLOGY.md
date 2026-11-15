# PHASON RIOT · Long Memory · Phase 010

## Verified system

This extension preserves a finite five-family de Bruijn dual pentagrid and its genuine global perpendicular-space phason offsets, plus the Phase 007/008/009 graph signal history, three tile-conduction regimes, and source genomes. The simulated ecology is an **original mathematical art model**, not biology, thermodynamic phason kinetics or trained machine learning.

## Pair state

Every unordered pair of active source IDs owns a persistent relationship `{a,b,score,contact,age}`. `score` is clamped to [-1,1]; `contact` is clamped to [0,1]; `age` counts fixed simulation steps. Six sources permit at most fifteen relationships.

## Fixed-step update order

1. Reconcile source identities and tile label identities. Remap stored tile histories only for exact matches of the stable rhombus key.
2. For each colony and tile, run the preserved source diffusion, decay, competition, imprint, fatigue, cultivation and genetic operators. **When ecology is ON**, read the *previous tick's* pair scores and apply: a positive cooperation term (proportional to the other colony's local energy and unoccupied capacity) or a negative suppression term (proportional to local competing energies). Keep concentration in [0,1].
3. Update tile fatigue and the existing dormant / conducting / refractory laws.
4. Measure encounters from the **new tile energies**: count shared significantly occupied tiles, plus real shared-edge frontier contacts from `geo.connections`. Smooth the pair's contact and signed score toward its treaty-dependent learning target. Adaptive also uses rivalry and genome inhibition. If no meaningful encounter exists, score relaxation is strongly attenuated.
5. Advance the fixed simulation tick. Rendering and export are read-only.

A truce or feud changes the learning target, **not the present score instantly**. The colored chord drawn between source cores is an annotation of relationship history, *not* a new rhomb edge or a physical energy conduit.

## Preservation and causality

- Ecology OFF bypasses the entire added transport operator and freezes bond memories. Its tile energy field exactly matches Phase 009 for identical inputs and step counts.
- The independent settings are `ecologyEnabled`, `ecologyCooperation`, `ecologyExclusion`, `ecologyMemory`, `ecologyGlow`, `pairTreaties` and `bondPair`.
- Existing `signal-memory-v2` remains valid; pair records live in an **optional** `relationships` field. Old v1/v2 records without it load successfully. Old recipe files without `ecologyEnabled` import with the feature OFF.
- New pair values are compressed to four decimal places in checkpoints; tile concentrations remain 8-bit quantized. An uninterrupted run is deterministic, but restarting from a compressed save is not bit-for-bit identical.
- `Evolve 120 steps` pauses animated preview, advances the real simulation at the current fixed geometry and stores one Undo transaction. The history itself is nonperiodic. GIF/MP4 capture a frozen history portrait with closed structural and chromatic phases.

## Tests actually executed

Phase 007, 008, 009 and 010 Node math regressions passed locally. Phase 010 includes an exact OFF ablation, deterministic replay, truce/feud sign and causal energy differences, checkpoint storage, a non-mutating view, old-recipe migration, phason remapping and removal of vanished pair bonds. Chromium on 390px and 1280px viewports passed interactions, bond controls, Undo/Redo, recipe saving and no-JS-error checks. Decoded GIF89a output contained 16 frames totaling 2,000ms with infinite loop. A legacy Phase 009 recipe imported with Long Memory OFF. **A real iPhone Safari and its native MP4 codec have not been tested.**

No Netlify deployment, paid API or GitHub Action was needed.
