# PHASON RIOT — Living Quasicrystal Studio · Phase 005

PHASON RIOT is a fully self-contained, touch-first animated art instrument. It uses an actual finite **de Bruijn five-family dual pentagrid** to build thick/thin rhombus geometry, not a kaleidoscopic wallpaper masquerading as one. The primary and twin pentagrid layers each have independent phason orbits. No server, build system, paid API, or Netlify is used.

## Open and play

Open the GitHub Pages site in Safari after enabling **Settings → Pages → Deploy from a branch → main → /(root)**. GitHub's source/file viewer or the iPhone Files app's HTML preview cannot execute the app's JavaScript. The repository `index.html` is the entire app; it needs no additional scripts or CDN assets.

## Phase 005 — routes become editable living instruments

Select a touch instrument above the art:

- **✧ Primary** changes the first pentagrid's internal-space U/V offsets by dragging.
- **◇ Twin** changes the second pentagrid's internal-space U/V offsets independently.
- **〰 Stitch** draws a new world-coordinate guide through the artwork. Its points are projected onto rhomb centers and connected through valid tile-to-tile shared edges.
- **✎ Edit** taps a saved guide to select it and lets the artist drag the guide to a new place. This changes its authored coordinates, so its shortest-path projection can legitimately reroute. Undo/Redo records one completed drag, and pinching cancels an in-progress guide move.

Under **Geometry**, each of the eight possible saved routes has an editable **name**, on/off switch, **integer movement speed**, **palette offset**, and **0–3 side branches**. Select any route from the drop-down or directly on the canvas. **Delete selected**, **Undo last stitch** and **Clear all** are distinct actions; Clear asks for confirmation. Saved recipe JSON contains the route identities and settings; GIF, PNG and MP4 capture route visuals.

**Forked travelers** branch from the actual route network and return along their route; each segment is a real shared-edge adjacency in the generated tile patch. **Collision sparks** respond deterministically when two rendered travelers approach within a local radius. The sparks are a proximity visualization, *not a physical collision solver or kinetic simulation*. The guided routes can change abruptly at global phason reassignment points. This is not local legal-flip kinetics or an exact physical quasicrystal experiment.

## Native MP4: new and honest

The Export tab now offers a **native real MP4** recorder (480 / 720 / 1080 longest edge; 12 / 16 / 24 target FPS). It uses `MediaRecorder` only when the browser reports an actual `video/mp4` capability, and then checks the output's `ftyp` box before saving. It **never renames WebM as MP4**.

A bounded pre-rendered frame cache (at most 64 MiB raw) can improve the regularity of recording on modest resolutions. When the cache would exceed budget, MP4 falls back to drawing live. Video timestamps are set by the *real-time* browser encoder, **not** a frame-perfect offline MP4 muxer: the result may drop frames or vary slightly in duration if the device is overloaded. The recorder has a Cancel action and doesn't overwrite the artwork. MediaRecorder may be unavailable in some browsers. GIF remains the most reproducible local exact-phase loop export.

**Verified on local desktop Chromium (not physical iPhone):** a requested 2-second, 480×480, 12 FPS MP4 produced a genuine **H.264 video** with an MP4 container and an observed ~**2.005 s** duration (`ffprobe`). This does not certify all settings or device-specific iOS recording. High-resolution settings are explicitly memory/performance-dependent.

## Preserved from earlier phases

- Seven mathematically closed phason trajectories; a second independent pentagrid, seven starter palettes and imported palette JSON, eight materials, animated color cycles and saturation boost.
- Genuine shared-edge signal graph, guided strokes, braided circuitry, thickness-aware geometry, non-physical optical materials.
- PNG at 2048px, reproducible recipe JSON import/export, 4×4 loop frame atlas, genuine dithered **GIF89a** (360/480/720px, 8/12/16FPS), and aspect ratios 1:1, 9:16, 16:9, 3:4, 4:3.
- Undo/Redo, New Design confirmation, preview FPS setting, responsive tabs and an artwork-first layout.

## Numerical provenance and limits

Five unit vectors `v_j=(cos(2πj/5),sin(2πj/5))`, `j=0…4`, define the grid families `x·v_j + γ_j = integer`. The zero-sum base offsets and the perpendicular-space `u cos(4πj/5) + v sin(4πj/5)` component change the finite dual rhomb neighborhoods. Elementary isolated local flips, Penrose edge-matching enforcement and square-periodic wallpaper seams are **not** implemented. Branches use the dual rhomb adjacency graph, not invented visual nearest-neighbor guesses.

## Tests

Run `node test.cjs` with Node.js; it checks unit-edge rhombi, deterministic dual-graph route paths, graph-distance propagation, and closed guided/forked branches. Desktop Chromium smoke tests at 390px and 1280px verified editable named route controls, touch-style movement, recipe export, original canvas, and no JavaScript page exceptions. A 16-frame, 2-second exported GIF decoded with **exact 2000ms summed frame duration**. Native MP4 was checked with `ffprobe` in desktop Chromium only. **Physical iPhone Safari testing remains outstanding**.

## Running costs

No Netlify, backend, subscription API or paid service is required. Site hosting through GitHub Pages must be enabled in repository settings if not already active.