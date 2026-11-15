# PHASON RIOT — Living Quasicrystal Studio · Phase 007

A standalone, mobile-first animated generative-art app based on the **finite five-family de Bruijn pentagrid** and its dual rhomb tiling. Everything is in `index.html` — no installation, CDN, build tooling, paid APIs, or Netlify deployment is necessary. To run it in Safari, use an actual webpage (e.g. enable GitHub Pages for this repo); the iPhone Files Quick Look HTML preview does **not** execute scripts.

## What's new: Signal Garden

Phase 007 introduces an **actual evolving graph state**, not just a time-varying shader. The artist can plant up to **six persistent sources** onto the underlying rhomb network using the **✺ Seed** touch mode; drag the circle to reposition an existing source, pinch to zoom, use `Signal Garden` to select/edit sources, or press **Spawn a trio** for deterministic starting colonies. Each source has a power, hue, enabled state, and one of three phenotypes:

- **Bloom**: relatively fast expansion to graph neighbors.
- **Leech**: greater inhibition of rival source concentrations.
- **Fossil**: slower expansion and slower energy loss.

A source injects energy at its nearest rhomb center. On each fixed, bounded `0.14s` simulation tick, tile concentrations spread **only along verified shared rhomb edges**, decay, and compete with rival concentrations. A separate stored **scar/imprint field** integrates past excitation, decays slowly, and changes subsequent diffusion, creating real history-dependent behavior. No randomness or wall-clock dependence exists in the equations themselves; live animation time determines how many discrete steps occur. Pausing stops progression. The math is an *invented graph-field artistic simulation*, not a claim of physical phason kinetics or scientific neuron dynamics.

When global phason offsets rearrange tile neighborhoods, the simulator retains memory only on cells where **both** the stable grid intersection ID **and** its five-dimensional K-label remain the same. New or changed cell identities start without inherited concentrations. A source's world-space placement is persistent artwork state.

## Touch and controls

`✧ Primary` shifts the primary pentagrid's perpendicular-space offset. `◇ Twin` independently shifts the second pentagrid. `〰 Stitch` draws permanent guided graph routes. `✎ Edit` drags individual stitch control points or whole paths. `✺ Seed` plants or moves the Signal Garden's persistent colonies. Pinch to change camera zoom.

The Signal Garden tab has diffusion, decay, competition, memory, radiance, source phenotype, power, and hue settings. **Clear memory** resets only the signal histories and is undoable. **Clear all sources** requires confirmation and is undoable. Edits use the existing Undo/Redo snapshots, now including a compact quantized history checkpoint. The recipe JSON saves the source settings **and** the memory checkpoint; importing rehydrates the memory, not merely the source positions.

## Animation and export truth

The 7 original analytically periodic phason motions, twin geometry, chromatic territories, guided routes, and color/material controls are preserved. **Signal Garden's stateful accumulation is not periodic.** PNG captures the current field. GIF and MP4 export freeze the current memory checkpoint and animate only the periodic geometry/color layers, giving a *looped memory portrait*, not a counterfeit perfectly repeating live simulation.

GIF89a uses a local worker with a 256-color dithered palette. Native MP4 uses `MediaRecorder` **only when `video/mp4` is genuinely supported by the current browser**, with best-effort recording; a WebM file is never disguised as MP4. Frame loops may change discretely when the pentagrid reassigns tile types, and MP4 timing is not guaranteed to be frame-exact.

## Verification

- `node test.cjs`: full original geometry, rhomb neighbors, stitched routes, closed phason paths, all three branch species, and periodic color fields.
- `node test-007.cjs`: deterministic history replay; competition and imprint ablation; finite bounded concentrations; save/load; state remapping across changed pentagrid neighborhoods; and non-mutating render-read checks.
- Browser test (desktop Linux Chromium, viewport sizes **390×844 and 1280×900**): no page errors; source planting, trio, editing, Undo/Redo, JSON recipe export. Actual iPhone Safari still requires testing.
- 360px/8fps two-second GIF: **16 decoded frames, exactly 2000ms** total duration.

The 007 source is compatible with the existing app's `phason-riot-1` recipe format; recipes from older phases load without signal history and receive the new defaults. Nothing calls Netlify or third-party services.