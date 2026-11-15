# PHASON RIOT — Living Quasicrystal Studio · Phase 010

A zero-dependency, animated mathematical-art studio in one self-contained `index.html`. Its geometry is a finite five-family **de Bruijn dual pentagrid** with real phason offset animation. The app preserves the two independent pentagrid layers, touch editing, stitched graph routes, signal gardens, tile cultivation, colony genomes, named palettes and native-browser export paths from phases 001–009.

## New in Phase 010 — The Long Memory

Each colony pair now accumulates an **earned relationship score** in `[-1,1]`, contact strength in `[0,1]`, and history age in fixed simulation ticks. Scores are not assigned merely by a color preset; they arise from historical signal co-occupation and actual shared-edge frontier encounters. Positive bonds add a bounded mutual-aid term to local colony propagation. Negative bonds add a bounded territorial-exclusion term. They alter the **tile-energy equations**, not only the drawing.

New **Long Memory** tab:

- **Enable Long Memory:** ON/OFF causal toggle. OFF freezes existing relationships and exactly restores the Phase 009 per-tile transport equation.
- **Cooperative transfer** and **Territorial exclusion:** independently scale the positive and negative coupling terms.
- **Relationship memory / tick:** sets how quickly repeated encounters update the score; when colonies do not meet, the score relaxes slowly.
- **Relationship radiance:** cyan partnership chords or magenta rivalry chords. These chords are an annotation of remembered relationships between colony cores, **not** new mathematical edges in the pentagrid.
- **Pair selector** and **Relationship tendency:** Adaptive, Truce, or Feud; these choose the target the learned score moves toward. They do not magically create an immediate alliance or feud.
- **⚡ Evolve 120 steps:** advances true history at the present frozen pentagrid geometry, pauses and resumes playback, then stores one Undo checkpoint.
- **Relationship census:** real pair scores and recorded simulation steps.

Default new artworks have Long Memory ON; **imported recipes created before 010 automatically leave it OFF** to preserve legacy behavior. Old state files use `signal-memory-v1` or `signal-memory-v2`; relationship data is an **optional** `relationships` array added to v2 rather than changing the required file schema.

## Mathematical provenance and limits

Five star vectors at 72° increments form a finite dual grid. Its internal two-parameter offsets are second-harmonic perpendicular-space coordinates, not simulated local thermodynamic phason flips. The Signal Garden is an **original artist-designed graph simulation**, not biology or a trained AI.

For a colony `j` at rhomb `i`, the ecology extension changes its previous update by:

`E_j'(i) = clip( E_j,baseline'(i) + 0.095 × help × (1-E_j(i)) × Σ_{h≠j} max(bond_jh,0) E_h(i) − 0.22 × exclusion × E_j(i) × Σ_{h≠j} max(-bond_jh,0) E_h(i) )`.

Pair history updates after the entire field update (no dependence on the current frame color). Bond scores relax towards an encounter-dependent target via bounded exponential smoothing. On each tick, co-occupied rhombi and actual shared-edge frontier encounters determine contact. Adaptive mode incorporates genetic inhibition and rivalry. Truce/Feud modify the target sign when interactions are observed. The optional pair `relationships` array is quantized to four decimal places in saved checkpoints, while tile concentrations are quantized to 8-bit values. **Uninterrupted runs are deterministic**; reloading compressed checkpoints yields close rather than bit-identical future runs.

The history is not periodic. GIF and supported native MP4 capture a **frozen history portrait** while periodic phason/chromatic phases animate. A valid GIF loop does not mean the colony simulation itself loops. Browser-native MP4 support varies; no WebM renaming is attempted. Finite Penrose patches are not square-tile seamless.

## Running / deployment

1. Enable GitHub Pages from the repository's `main` branch at the root folder, then open `https://merrypranxter.github.io/phason_riot/` in Safari. Pages availability is separate from committing source files.
2. Or open `index.html` from a JavaScript-capable local HTML server/editor. iPhone Files Quick Look only previews HTML and **does not run** the JS app.
3. No paid APIs, no external libraries, no GitHub Actions required, **no Netlify**.

## Automated tests

Run:

```sh
node test.cjs
node test-007.cjs
node test-008.cjs
node test-009.cjs
node test-010.cjs
```

Phase 010 verifies: exact Phase009 OFF ablation; sign and causal consequences of truce/feud; independent replay; bounded relationships; checkpoint storage and migration; non-mutating viewing; relationship survival after phason remap; deletion cleanup. Local Chromium checks were run at 390×844 and 1280×900 for tab controls, pairing, fast forward, Undo/Redo, recipe download, legacy recipe import, canvas display and JS errors. A real GIF89a loop was decoded with Pillow: 16 frames and 2,000 ms. **Physical iPhone Safari remains untested**.

See `docs/PHASE-010-ECOLOGY.md` for the precise ecological mechanism and honest scope, and `ROADMAP.md` for future phases.