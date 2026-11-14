# PHASON RIOT — Living Quasicrystal Studio · Phase 002

**Offline-capable, touch-first, animated mathematical art.** This repository is the source; it does not need Netlify, paid APIs, npm, React, or external libraries. `index.html` is the full working application.

## Open on iPhone (important)

The GitHub source-code preview, ChatGPT attachment preview and Apple Files Quick Look **do not execute the app**. Host the repository on **GitHub Pages** to get a real Safari URL:

1. On GitHub open this repo → **Settings** → **Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**; select `main`, directory `/(root)`, then **Save**.
3. When the deployment finishes, open `https://merrypranxter.github.io/phason_riot/` in Safari. If GitHub reports this Pages address is not ready, follow the URL shown in Pages settings. Pages configuration needs to be enabled by the repository owner; code being pushed does not itself make the site live.

A standalone copy of `index.html` can also run in a JavaScript-enabled HTML editor/preview on iOS. Do not try to *preview the source* in the Files viewer.

## Real mathematics vs visual effects

This app generates a finite dual of five equally spaced de Bruijn grid families. Each regular pairwise intersection generates a thick 72° or thin 36° rhomb based on 5D integer data. Its offsets are

`gamma_j = seededZeroSum_j + u*cos(4πj/5) + v*sin(4πj/5)`.

The two `u,v` phason controls are internal-space modes orthogonal to physical translations. Seven **closed periodic paths** evolve them: Orbit, Choir, Riot, Tidal, Braid, Gyre, Quake. Their changing K-label assignments affect tiling neighborhoods, unlike a wallpaper rotation.

The new edge graph connects tile centers *only across actual shared polygon edges*. Traveling graph lights, opalescent/glass treatments, faux thread filaments, glow, and color waves are artistic visualizations, **not** thermodynamic local phason kinetics or spectrally accurate optics. The `CHANGED` display compares K-tuples on shared grid-line IDs with the fixed base-U/V patch; it is **not** a certified elementary-flip count. Finite Penrose patches are not seamless square tiles.

## Controls

- **Touch artwork:** one finger drags authored phason coordinates; two fingers pinch to zoom the artwork. A gesture commits as one Undo step; cancellation restores the previous state.
- **Motion:** seven genuine phason paths, period, amplitude, structural update steps per loop (separate from color/lights), network signal intensity/rhythm, traveling light wave and edge comets.
- **Materials:** Opal cathedral, Electric circuitry, Velvet brocade, Mineral glass, Ink constellation, Living filament network, Phason faultlines, Prism faceted glass.
- **Geometry:** pentagrid radius, zoom, aspect ratio (1:1, 9:16, 16:9, 3:4, 4:3), U/V, inspect highlights and pentagrid grid overlay.
- **Color:** seven built-in palettes plus named JSON import, neon boost, integer chromatic cycles; palette shuffle changes only currently selected palette's order. Imported palettes persist in this browser.
- **Export:** static 2048px PNG, reproducible JSON art recipe, and 16-frame 4×4 PNG atlas. **Animated GIF/MP4 encoding not implemented yet**. A 16-frame atlas is *not* a GIF. Animated loops sample phases `k/N` and omit the repeated endpoint.
- **Artwork safety:** Undo/Redo, confirmed New Design, no silent resetting when controls change.

## Verification

`node test.cjs` checks geometry, shared-edge graph and phase closure with no dependencies.

Phase 002 was also run in headless Chromium with 390×844 and 1220×850 viewports. Verified: app initialization, visible non-black rendered artwork, seven motion/material controls, one-finger gesture and Undo, 9:16 portrait framing, exported PNG dimensions (1152×2048), and absence of browser JavaScript exceptions. **This is not an actual iPhone Safari device test**.

## Resource policy

Everything renders in the user's browser. Structural updates are quantized to a selectable number of steps per loop, independent of smoother color/light frames, with conservative preview frame rates. Heavy settings can still slow older phones. **No Netlify calls or credits used.**