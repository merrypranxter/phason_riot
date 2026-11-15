# PHASON RIOT — Phase 015: The Chemical Feedback Loop

**Offline-capable, self-contained living quasicrystal studio.** Open index.html in a JavaScript-enabled browser or through GitHub Pages. GitHub source view and iPhone Files preview do not execute it. No Netlify deployment, paid APIs, package installation, external libraries or GitHub Actions are required.

## What's new
A dedicated **⚡↔⚗ Feedback** tab keeps the new controls out of the long Patterns tab. The reciprocal bridge is OFF by default.

- **✦ Start 2-way feedback:** enables an existing or new Gray–Scott visual layer, real electrical colonies, the existing chemistry→electricity bridge and the new electricity→chemistry bridge. Does not erase existing signals, chemicals, seeds, palettes, routes, genes or bonds.
- **Species-specific chemical production:** Bloom secretes activator V; Leech consumes V; Fossil replenishes U substrate. Three override modes apply one behavior to all enabled source species.
- **Bounded strength and source-energy threshold.** Only the real owner-specific electrical concentration above a threshold deposits chemicals at existing rhomb centers. Deposits are applied locally to the 96×96 periodic Gray–Scott grid.
- **⚡ Evolve +48 linked steps:** advances the same deterministic causal operator used live. One Undo/Redo transaction restores both chemical and electrical checkpoints.
- **Disconnect only:** turns off new deposition without deleting either memory. Chemistry→electricity remains separately switchable. With OFF or strength zero the original Phase 014 behavior is unchanged.
- **Reaction settings:** feed, kill and chemical substep count are available directly in the Feedback tab; the Patterns tab retains all 17 family options, painting/masks and independent palettes.

## Causal operator
Each opt-in fixed step (1) evolves actual rhomb-graph electrical energy using the **previous chemical concentration**, (2) deposits synthetic source-specific reagents from the newly computed electrical energy, and (3) advances Gray–Scott chemistry by the chosen numerical substeps. The next electrical step reads the newly evolved chemical field.

This is **original mathematical artwork**, not validated neuroscience, material chemistry or simulated local phason kinetics. The deposition law is nonconservative; chemical concentrations are clamped to [0,1]. Electrical connectivity remains real shared rhomb edges. With feedback disabled, the original Phase 014 independent clock path is executed unchanged. Recipe histories remain 8-bit quantized and resuming them is approximately, not bit-for-bit, identical to uninterrupted Float32 evolution. The living state is not temporally periodic; GIF/MP4 exports freeze history and loop the periodic visual fields.

## Tests performed
- Nine local Node suites, test-007.cjs through test-015.cjs, passed. The new suite covers actual U/V secretion, consumption and replenishment, bounded fields, exact zero-strength behavior, deterministic replay, and causal divergence of one-way versus two-way history.
- Browser tests at 390×844 and 1280×900 in Chromium: separate Feedback controls, activation without clearing prior signal state, 48 linked steps, both histories restored with Undo and Redo, disconnect, recipe export and no JavaScript exceptions.
- With feedback OFF, Phase 015 matches Phase 014 **pixel for pixel** at both viewport sizes.
- Verified real 360×360 GIF89a, 16 frames, infinite loop, total exactly 2.000 seconds.
- Verified native H.264 MP4, 480×480, measured 2.0312 seconds on desktop Chromium for a requested 2-second loop. Real-time MP4 capture may vary in frame timing.
- Physical iPhone Safari, thermal/memory behavior and social-app playback were **not** tested. A phone-sized Chromium viewport is not physical iPhone Safari.

## Try it
Open **⚡↔⚗ Feedback**, tap **✦ Start 2-way feedback**, then **⚡ Evolve +48 linked steps**. Modify the gene/source species in Species War/Signal Garden; change which reagent they emit in Feedback; alter paints, visual layers and palettes in Patterns. Export a PNG, genuine GIF, supported true MP4 or full recipe.

See docs/PHASE-015-COUPLING.md and ROADMAP.md.