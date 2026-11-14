# PHASON RIOT — Living Quasicrystal Studio · Phase 003

A touch-first, offline-capable generative-art app based on an actual **five-family de Bruijn dual pentagrid**, with structural phason animation, a second independent tiling field, closed-route walkers through verified rhomb adjacency, animated color, and a locally encoded looping GIF.

**Play:** open `index.html` through a real browser or enable GitHub Pages from the `main` branch / root folder. GitHub's HTML file viewer and iPhone Files preview do not run the app. No build tools, backend, paid API, or Netlify needed.

## Features
- Seven periodic phason motion trajectories with deterministic seeds. Each changes *perpendicular-space offsets*, not just camera rotation.
- True dual pentagrid thick/thin rhombi with measured changed five-dimensional K labels. The changed-label count is **not** an elementary local phason-flip count.
- **Twin Field:** independently seeded, independently moving second pentagrid, with its own motion law, integer harmonic, internal-space U/V offsets, amplitude, phase, opacity, scale, and three overlay materials. Disable it to return to the original single-field output.
- **Living Travelers:** bright particles follow seeded out-and-back paths through the real shared-edge tile adjacency graph. Routes are deterministic, closed, and continuously connected *within a particular generated patch*; they can reroute when the global phason state changes. This is art-directed traversal, not a physical particle simulation.
- Eight materials, color timing, neon boost, named palette imports, adjustable intensity, editable background, touch drag, pinch zoom, Undo/Redo, seed-confirmed New Design.
- Responsive 1:1, 9:16, 16:9, 3:4, 4:3 compositions.
- **Actual GIF89a animation** encoded inside a Web Worker, using a fixed dithered 256-color palette. Loop frames are sampled at k/N without duplicating the endpoint and frame delays sum to the chosen cycle duration. Current options: 360/480/720 longest-edge pixels, 8/12/16 fps. Long and large exports have a mobile memory guard. Real iPhone testing is still needed.
- PNG longest edge 2048, reproducible JSON recipe import/export, and 4×4 frame atlas.

## Export truth
GIF is an actual animation. GIF's format is **8-bit indexed color**, so it cannot preserve full 24-bit RGB, exact gradients, or high-bitrate MP4 appearance. This version uses 3-3-2 quantization with ordered dithering. Browser memory/performance limits apply. MP4 is **not implemented yet**; renaming WebM to MP4 would not be acceptable. The GIF closes by its deterministic finite phase sampling. Global phason reassignments are discrete, so individual tile changes can appear as snapping.

## Mathematical integrity
Five star vectors `(cos(2πj/5),sin(2πj/5))`, `j=0…4`, define grid families `x·v_j + γ_j = integer`. The second harmonic `γ_j = b_j + u cos(4πj/5) + v sin(4πj/5)` controls genuine perpendicular-space offsets with `sum γ=0`. The twin uses the same construction independently, with `seed+104729`.

A finite patch is **not square-periodic**. No local phason dynamics, simulated thermal relaxation, or verified global Penrose matching-rule decorations are claimed. The base palette/lighting are artistic, not spectral ray tracing.

## Development and testing
- `node test.cjs`: deterministic geometry, shared-edge adjacency, exact closed out-and-back graph walkers, primary and twin harmonic closure.
- Phase 003 local browser checks: Chromium at 390px and 1280px, Twin tab interaction, control render, GIF downloaded and all frames decoded with Pillow, exact summed delay 2000 ms for a 2-second/16-frame GIF. These tests do **not** establish physical iPhone Safari performance.
- `index.html` is a standalone file with no imports/CDNs and can be opened directly from GitHub Pages.

See `ROADMAP.md` for the next phase.