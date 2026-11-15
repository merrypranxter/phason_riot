# PHASON RIOT — Living Quasicrystal Studio · Phase 008

PHASON RIOT is an offline-capable, zero-dependency animated generative art studio using genuine finite five-family de Bruijn pentagrid geometry. Its main artifact is `index.html`; no Netlify deployment, paid API, server logic, or build system is needed. Serve `index.html` in a JavaScript-enabled webpage (e.g. GitHub Pages), **not** an iPhone Files/HTML preview.

## Phase 008: The Cultivation Chamber

Real tile-by-tile life cycles evolve on the existing **shared-edge rhombus adjacency graph**, driven by accumulated signal energy and fatigue. This is an original artist-designed dynamical model, *not* scientifically validated neural/biological kinetics, nor a local phason-flip simulation.

The three regimes alter the **signal-transfer operator itself**, not just the tile colors:

- **Dormant (q=0):** lower conduction. Wakes when strongest energy exceeds adjustable Wake threshold, provided fatigue is low enough.
- **Conducting (q=1):** increased neighbor-to-neighbor transfer. Accumulates fatigue from actual concentration and switches to refractory after sustained exhaustion (fatigue ≥ 0.72).
- **Refractory (q=2):** sharply restricted conductivity; outgoing edge weight is 0.1 of normal, source injection is blocked, and recovery requires minimum dwell plus fatigue ≤ 0.24.

The new **Cultivation** tab holds the ON/OFF toggle (OFF returns to the Phase 007 equation), Wake threshold, Exhaustion/tick, Recovery/tick, Minimum refractory ticks, and independent Life-cycle glow. Live counts show conducting, refractory and dormant rhombi. **⚡ Cultivate +60 history steps** performs a bounded fast-forward at fixed present geometry and saves a single Undo checkpoint.

The preexisting Signal Garden source controls, twin pentagrid, seven phason motion laws, graph stitches, color territory modes, materials, aspect ratios, palette imports, PNG/GIF/MP4 exports, and Undo/Redo are preserved.

## History / compatibility

- New checkpoint `signal-memory-v2` includes concentrations per source, scars, fatigue, regime and dwell, keyed by intersection ID plus five-dimensional K-label. Global phason rearrangement retains history **only** for still-identical rhombi.
- The recipe envelope remains `phason-riot-1`. Version 1 signal histories load as dormant tiles with zero fatigue, while older recipes without histories start empty.
- Concentration/scar/fatigue values are saved as **8-bit quantized fields**. Restarting from a checkpoint approximates uninterrupted execution; it is *not* bit-for-bit identical. Same initial conditions and simulation steps before compression replay deterministically.
- Stateful life history is **not periodic**. Existing looping GIF and browser-supported real MP4 exports use a *frozen memory portrait* while periodic phason and chromatic parts animate. MP4 is available only where native `MediaRecorder` reports actual `video/mp4` support, never by renaming WebM.

## Testing

- `node test-007.cjs` — Phase 007 history and graph regression.
- `node test-008.cjs` — deterministic same-start simulation; three regimes; ON/OFF causal ablation; bounded checkpoint values; version 1 migration; approximate resumed checkpoint; non-mutating view; phason remap.
- Local Chromium checks at 390×844 and 1280×900 tested HTML execution and rendering, controls/toggle/slider, recipe JSON download, and JavaScript runtime errors. A separate paused +60-step test verified Undo restored the earlier tick count.
- Physical iPhone Safari performance and codec support remain unverified.

No GitHub Action, Netlify deploy, paid API or external analytics is required.