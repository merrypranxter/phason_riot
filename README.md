# PHASON RIOT — Living Quasicrystal Studio · Phase 009

PHASON RIOT is a **touch-first, zero-dependency art application** built around a genuine finite de Bruijn five-family dual pentagrid. Open `index.html` through GitHub Pages (or another JavaScript-enabled local HTTP server), not a GitHub code view or iPhone Files preview. The application does not require Netlify, a paid API, remote backend, or build system.

## Phase 009: The Species War

Synthetic electric colonies now carry individual, bounded **genomes**. This is a mathematical art ecology, not biological genetics or a claim that these are actual physical quasicrystal defects. The new **Species War** tab has a master ON/OFF switch and four editable genes for whichever source is selected:

| Trait | Range | What actually changes |
| --- | --- | --- |
| **Tile preference** (`affinity`) | −1..+1 | Source-specific neighbor edge weights: positive favors **thick** rhombi, negative **thin**. The neighbor-weighted mean is normalized to preserve boundedness. |
| **Sabotage** (`inhibition`) | 0..2 | A colony inhibits its *rival* owners through local concentration. Every rival contributes according to its **own** genome. |
| **Stamina** (`stamina`) | 0.45..2 | Controls the rate of fatigue accumulation in tile regimes dominated by that source; also modifies that source's vulnerability to rival suppression. |
| **Recovery** (`recovery`) | 0.45..2 | Controls the fatigue recovery rate at tiles currently dominated by that source. |

Genomes use species-based templates for **Bloom**, **Leech**, and **Fossil**, and support source-specific manual editing, deterministic seeded **Mutate** (incrementing persistent `geneSerial`), template reset, and two-parent **Crossbreed**. Breeding creates a new independent source with its own ID and blended bounded traits. The parents, their identities, and existing mathematical history remain unchanged. Maximum six sources. Undo/Redo preserve all genomic edits and new source identities; recipe JSON includes all genes.

Optional **competition frontiers** visually connect actual adjacency links between neighboring rhombi whose strongest nontrivial signal belongs to different sources. A live **colony census** reports the number of rhombi actually dominated by each source; these are discrete winning territories, *not* area fractions or percentages of the infinite tiling.

### Switch OFF = previous equations

When `speciesWar` is disabled, all genetic modifications are ignored by the graph simulation. The Phase 008 transport, inhibition, fatigue, and recovery laws run **unchanged**, even if the source objects still carry customized genomes. The feature does not rewrite the pentagrid, replace existing palettes, delete strokes, or alter twin-field animations. Phase 009 defaults to ON in a fresh studio, with an immediate OFF switch for comparisons.

## Mathematics / truth boundaries

Under `genetics=true`, source-specific neighbor contributions are weighted by

`w_j(k) = 1 + 0.62 × affinity_j × (tile[k].thick ? +1 : −1)`

with normalized weighted averages, so `w_j(k)` remains strictly positive for all permitted traits. Rival penalty for source `j` depends on the concentrations of *other* sources multiplied by their `inhibition` traits. The tile's maximum-energy source determines local stamina/recovery modifiers used by the existing dormant–conducting–refractory state machine.

This synthetic ecology uses a **global per-tile** life-cycle regime (shared by all species at that tile), not a separate neuronal compartment for every species. Genetics are changed by the artist's buttons, not automatically bred by simulation history. Newborns are created by seeded arithmetic blending with small bounded variation; no evolutionary optimization or Darwinian fitness is claimed. Real local phason flips, thermal quasicrystal dynamics, physical interference colors and true biological genetics are not implemented.

The signal-history checkpoint remains `signal-memory-v2`, keyed by original tile intersection ID and five-dimensional K-label; recipe envelope remains `phason-riot-1`. Old recipes with sources that lack `genes` transparently receive their species template. All history save/load caveats remain: 8-bit concentrations/fatigue are quantized, so checkpoint resume is **approximately**, not bitwise, identical. An unsaved continuous deterministic simulation replays exactly with the same seed and update steps. Nonperiodic living memory is **frozen** during periodic GIF/MP4 exports, so the actual evolving ecology is not a mathematically perfect loop.

## Controls

1. **Signal Garden** → plant/move up to six electric sources using ✺ Seed. Control their power, hue and broad species identity.
2. **Cultivation** → turn tile regime changes ON, tune fatigue/recovery, or use Undoable **Cultivate +60 history steps**.
3. **Species War** → select a source; change four genes, mutate, pick another parent and crossbreed; toggle the law and frontier overlay.
4. All other existing panels are preserved: Motion, Materials, Twin Field, Geometry, Color, Export.

## Verification

- `node test-007.cjs` and `node test-008.cjs`: preserved regressions.
- `node test-009.cjs`: deterministic reproduction, unchanged exact OFF baseline, causal tests for all four genes, stable bounded mutation and two-parent breeding, immutable census and checkpoint retention.
- Local Chromium tests at 390px and 1280px: real source-select, gene slider, mutate, breed, Undo/Redo, recipe download, ON/OFF census and runtime exception checks.
- Local paused evolution check: 60 history steps, restored with Undo/Redo, real owner counts of 21/17 in that tested two-source setup.
- Actual 360×360 16-frame GIF produced, decoded with Pillow, 2,000 ms total duration and infinite loop flag.
- Physical iPhone Safari, native MP4 codec/performance and public Pages availability are **not independently verified**.

No GitHub Actions, Netlify builds, or paid services were run for this development phase.