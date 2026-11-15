# PHASON RIOT — The Symbiotic Underground · Phase 011

Offline-capable single-file JavaScript art app using actual five-family de Bruijn pentagrid geometry. Open `index.html` in a JavaScript-enabled browser or enable GitHub Pages; iPhone Files Quick Look alone cannot run the app.

## New: real stitched relationship corridors
The Underground tab connects individually editable graph-projected stitches with the pairwise relationship scores of the Phase 010 Long Memory engine.

- Choose a colony pair, and **Grow corridor between pair** creates a new, undoable, editable route through real shared rhomb-edge connections. Or use **Bind selected stitch** / **Unbind** to pair an existing finger-drawn route.
- A positive earned relationship adds bounded owner-specific transport along the corridor's actual shared edges, moving signal from higher-energy tiles toward lower-energy tiles. The *extra transfer* conserves transported energy; the wider simulation still has injection, damping and competition.
- A negative earned relationship adds bounded inhibition at corridor contacts, reducing opposing energy. This artificial sink is deliberately nonconservative.
- If the pair is neutral or the route is disabled, no new transport is applied. The bond must develop through actual fixed-step encounters; choosing Truce or Feud does not grant instant energy transfer.
- **Underground ON/OFF**, independent transport strength and radiance, bound route and colony selectors, and undoable **Cultivate 120 relationship steps** controls. Cyan/teal and magenta edge flashes track alliance/feud, but are visualization rather than invented graph edges.

Old Phase 010 recipes import with Underground OFF; the **OFF baseline reproduces Phase 010 exactly**. The previously existing seven phason paths, twin grid, stitches and edit gestures, signal species, breeding, life cycles, palettes, GIF and browser-supported true MP4 are preserved. Global phason offsets may re-route corridor edges; the app does NOT claim to simulate locally legal Penrose phason flips.

## History and export limits
Signal history is not periodic. Existing GIF and MP4 renderers freeze the current history while sampling periodic geometry/color loops. GIF is 8-bit indexed GIF89a; MP4 is only attempted when the browser truly supports video/mp4 recording. Memory snapshots quantize concentrations to 8-bit.

## Tested
- All existing Phase 007–010 Node suites passed; `node test-011.cjs` also passed: verified shared-edge routing, positive/negative causal effects, deterministic reproduction, source/route validation, phason reprojection, exact OFF baseline and save/load.
- Phone-sized 390×844 and desktop 1280×900 Chromium: grow, bind/unbind, cultivate, Undo/Redo, recipe export, no JavaScript errors.
- 360×360 GIF: 16 decoded frames, total 2.000 seconds, infinite loop. Phase 010 recipe import: Underground OFF.
- Actual iPhone Safari and the platform's native MP4 encoder have **not** been tested in this phase. No Netlify build, paid API or GitHub Action was used.

See `ROADMAP.md` and `docs/PHASE-011-CONDUITS.md`.