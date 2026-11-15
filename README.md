# PHASON RIOT — Phase 012: The Pattern Lab

PHASON RIOT is a self-contained, offline-capable generative-art app. Run `index.html` in a real JavaScript-enabled browser or via GitHub Pages. The iPhone Files preview cannot run it. No Netlify or paid services are involved.

## The new Patterns tab
Fourteen independent procedural families are available: Voronoi, triangular lattice, analytic labyrinth, moiré, topographic contours, crossweave, fracture, halftone, flow grain, alien glyphs, fivefold quasiperiodic interference, marbling, bubble rings, and stipple.

The **three stackable pattern layers** each control family, enabled state, target, blend, scale, rotation, opacity, contrast, integer-periodic movement and seeded variation. Targets: background, all/thick/thin rhombi, actual rhomb borders, authored stitches, occupied signal-colony territory, and whole-frame overlay. Blend modes: normal, screen, multiply, overlay, difference, lighten and darken.

**Surprise Me**, **One**, **Mix two**, **Go apeshit**, reseed each layer, and **Reset stack** make variants without resetting the existing colonies, routes, signal history, genes or relationships. The visual settings persist in recipe JSON, with Undo/Redo.

## Geometry and scientific honesty
All 14 patterns are deterministic mathematical **visual fields**, not new physical simulations. The labyrinth is analytic and reaction-diffusion-*inspired*, not a Gray–Scott solver; the triangular mesh is a true triangular lattice, **not** Delaunay triangulation. The underlying five-family de Bruijn dual pentagrid and graph dynamics are unchanged. Phase 012 starts with Patterns OFF; old recipes also import with Patterns OFF.

Time-dependent patterns use integer-harmonic closed phases. Nonperiodic living-colony history is held fixed during periodic GIF/MP4 visual capture. Pattern rendering uses bounded-resolution Canvas2D buffers for mobile performance. Full-resolution PNGs may show slightly softer pattern overlays than vector-only output.

## Testing
- `node test-007.cjs` through `node test-012.cjs`: legacy geometry/simulation and new periodicity, deterministic field, distinctness and isolation checks.
- Phone-sized 390px and desktop 1280px Chromium: pattern editor, each layer controls, surprise variations, reset/Undo/Redo and recipes passed without JS errors.
- Pixel-for-pixel baseline comparison: **Patterns OFF matches Phase 011 canvas PNG SHA-256 exactly**.
- Actual GIF89a export: decoded 16 frames, infinite looping, total **2.000 seconds**.
- Phase 011 recipe import: Patterns OFF; legacy artwork retained.
- Actual iPhone Safari performance and MP4 codec support are still unverified.

See `ROADMAP.md`. The repository does not deploy or consume Netlify credits.