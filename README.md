# PHASON RIOT — Living Quasicrystal Studio · Phase 004

A colorful, touch-first, offline-capable art studio based on a genuine finite **de Bruijn five-family dual pentagrid**. Two independently animated quasicrystal layers, opt-in graph-native luminous tracks, touch gestures, and a real looping GIF encoder. No build system, external assets, paid API, or Netlify.

## Play

GitHub Pages: enable **Deploy from branch → main → /(root)** in repository Settings → Pages. Open the published website in Safari. Opening an `.html` source file in iPhone Files Quick Look or GitHub's code preview does **not** run JavaScript.

## Phase 004 — new

### Direct touch instruments

Three persistent buttons above the controls select what one finger does:

- **✧ Primary:** finger drags adjust the *primary* global perpendicular-space phason coordinates `baseU/baseV`.
- **◇ Twin:** finger drags adjust the *independent second pentagrid's* phason coordinates `twinU/twinV`.
- **〰 Stitch:** draw a persistent world-space guide stroke onto the artwork. Every sampled point snaps to a nearby rhomb center and successive centers connect through a shortest-path search on actual tile shared-edge adjacency. The resulting **luminous route** contains no non-neighbor jumps. A bright pulse travels each route on a deterministic **out-and-back closed path**. Up to 8 strokes, 28 sampled points each; Undo last stroke and Clear stitches are in Geometry.

Two-finger pinch zooms in every instrument. Each finger action becomes one Undo/Redo step; cancellation rolls back the operation. Stitch routes remain in the artwork recipe JSON and are drawn into GIF/PNG. A global phason change can cause the shortest path to **re-route** abruptly; this is not a physically simulated local tile flip.

### New network styles

Choose **Signal anatomy** in Motion:

- **Flowing nerve signals**: existing traveling edge pulses.
- **Branching graph wavefronts**: BFS distance across real rhomb adjacency, computed from the first stitch origin (or the center if no strokes), controls traveling illumination.
- **Triple-strand braided circuitry**: three stylized strands are drawn for each selected genuine tile adjacency link. The offsets are optical ornament; they do not create extra connections.

Control **Stitch glow**, **Stitch travel cycles**, **Signal rhythm**, and **Preview frame cap (8–30 FPS)** separately.

### Mobile layout

The live geometry statistics now sit *below* the artwork rather than fighting with the top overlay. Long slider decimals are displayed to two places. Touch modes remain visible above tabbed controls.

## Previous features remain

Seven periodic global phason paths, original eight materials, independent twin material overlays, living shared-edge graph travelers, color animation, seven named starter palettes, imported named palette JSON, aspect ratios 1:1 / 9:16 / 16:9 / 3:4 / 4:3, reversible artwork settings, confirmed New Design, PNG, JSON recipe import/export, four-by-four frame atlas, real local dithered GIF89a loop encoding at 360/480/720 px and 8/12/16 FPS. MP4 is **not yet available**.

## Technical truth

Dual rhombs are derived from five line families `x·v_j + γ_j = n` using fivefold star vectors. Changing `u,v` in the second harmonic of `γ` changes rhomb neighborhood assignments of a *global* finite patch. This is not yet a local phason kinetics solver, a square-seamless wallpaper, nor a universal Penrose matching-rule checker. Stitch paths and signal propagation are graph-theoretically exact within each rendered patch; the moving lights and braided optical strands are an artistic visualization.

GIF animation is true GIF89a with a 256-color palette and ordered dithering; it cannot provide true 24-bit color or the quality/bitrate of MP4. Export uses a deterministic timeline. iPhone Safari performance remains unverified on a physical device.

## Test

Run `node test.cjs` (no dependencies) for basic rhomb integrity, graph adjacency, closed motion, deterministic stitch shortest paths and BFS propagation. Desktop Chromium testing at 390px and 1280px verified rendering, independent Twin dragging, Stitch creation, Undo and Redo. A sample 16-frame 2-second GIF decoded successfully with exact 2000ms duration. These are **browser simulations**, not physical iPhone QA.

See `ROADMAP.md` for the next phase. All work is on GitHub only: **no Netlify deployments, no API charges**.