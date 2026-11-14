# PHASON RIOT — Living Quasicrystal Studio · Phase 006

A **zero-dependency**, touch-first, offline generative-art studio. `index.html` is the entire app, with a finite de Bruijn five-family dual pentagrid, two independently animated phason fields, glowing adjacency networks, interactive stitched circuits, animated palettes, PNG, GIF, recipe JSON and browser-capability-checked MP4.

## Play

To run on iPhone, enable GitHub Pages in **Settings → Pages → Deploy from a branch → main → /(root)**, then visit `https://merrypranxter.github.io/phason_riot/` in Safari. GitHub's HTML preview and iPhone Files Quick Look display the page but do **not** execute its interactive JavaScript. A real browser or JavaScript-capable HTML preview is required. No Netlify or paid API.

## Newly added in Phase 006

### Surgical route editing — the Gesture Witch

1. Choose **〰 Stitch** and draw a route on the artwork.
2. Choose **✎ Edit**. Tap a route and drag its **white control nodes** to move individual points, *or* drag between nodes to translate the entire path.
3. In **Geometry**, use **Insert control point** or **Delete selected point**. The app preserves at least two nodes and at most 28 per stitch, with at most eight stitches.
4. Undo/Redo treats a finger gesture as one reversible edit. `pointercancel` rolls back. The route reprojects through actual shared-edge rhomb adjacency after edits; the fingertip's authored polyline is a **guide**, not a guarantee of a fixed rhomb path as phason offsets change.

### Three genuine branch behaviors

Routes can have independently selected **Wander**, **Fan**, or **Reef** branch species. Wander selects reproducible neighboring tiles; Fan favors outward directions; Reef favors highly connected nearby tiles. Every fork follows shared edges and returns along its path for loop closure. These are deterministic graph navigation styles, **not** biological growth or thermal physics.

### Independent living color territories

Under **Color**, select:

- **Traveling fronts**: directional moving wavebands.
- **Drifting islands**: two orbiting localized chromatic sources.
- **Spiral regions**: rotating angular color domains.
- **Off**: restore the Phase 005 color mapping.

Territories have independent **strength, harmonic and scale**. Their phase formulas close exactly for whole-number harmonic settings; they are used by tile, twin, signal, and stitched-route colors. This is a mathematically varying *color-field layer*, not colored pigment motion or a phason displacement.

### Lamellar Opal material

A stylized nacre-like finish with oriented, phase-shifting band highlights and optional glint strokes. Control **Lamellar sparkle** under Materials. This is artistic interference-inspired shading in Canvas2D, **not** measured spectral reflectance or thin-film simulation.

## Preserved

The old settings, seed/determinism, built-in named palette stops and palette JSON imports, phason motion, twin field, stitches, GIF/PNG, recipe JSON, native MP4 capability checks, export clocks, 1:1/9:16/16:9/3:4/4:3 artwork ratios, and Undo/Redo all remain available. Existing recipes load with new fields defaulted; old routes gain the default `wander` species.

## Truth and limits

- The underlying pentagrid is a *finite patch*, not a periodic seamless square texture. Its global phason offsets cause **actual rhomb-neighborhood changes**, not a certified count of individual legal local phason flips.
- GIF89a is genuine animated, indexed-color GIF. MP4 uses native browser encoding only when real `video/mp4` capture is supported; its real-time timestamps may drift, and iPhone Safari playback/encoding still needs on-device verification.
- User's larger palette vault is not silently loaded from other apps. Import a named JSON palette archive if desired.
- No Netlify calls, no remote image/font/audio fetches, no paid API, no build step.

## Validation

Run `node test.cjs` for mathematical geometry, closed branch paths, color phase closure and deterministic branching. Chromium tests exercised desktop (1280px) and mobile-sized (390px) screen layouts, drawing a route, point-specific drag, Undo/Redo, inserting/deleting nodes, choosing a branch species, switching material and color territories, valid PNG output, and a 16-frame/2.000s looped GIF. **Physical iPhone Safari has not been tested.**