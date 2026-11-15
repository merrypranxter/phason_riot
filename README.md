# PHASON RIOT — Phase 013 · The Physical Pattern Lab

A touch-first, single-file generative art app driven by a real finite five-family de Bruijn dual pentagrid, independently animated twin grid, living colonies, authored shared-edge routes, inherited traits and synthetic relationship memory. `index.html` runs without CDNs, build tools or paid APIs. Serve it from GitHub Pages or another static server; iPhone Files/ChatGPT HTML preview generally does **not** execute the app.

## What shipped in 013

The **Patterns** tab now contains **17** families, including the prior fourteen and three new modes:

1. **Delaunay — actual triangulation.** A deterministic seeded set of jittered sites is passed through Bowyer–Watson. Triangles satisfy the empty circumcircle criterion. Rendered lines follow actual computed edges, not a triangle-grid visual approximation.
2. **Voronoi dual — shared circumcenters.** Adjacent triangles from the *same Delaunay site set* generate clipped, finite dual segments between their circumcenters. (Unbounded Voronoi rays at the outside are not drawn.) The original artistic Voronoi field remains available separately.
3. **Gray–Scott — numerical reaction–diffusion.** A fixed-step 96×96 periodic-grid simulation integrates two chemical fields with Du=0.16, Dv=0.08, selectable feed and kill coefficients, seeded initial concentrations and eight-neighbor Laplacian. This is a model-inspired creative simulation, **not measured chemical physics**. It has its own state and is not inherently periodic.

For each of the three pattern layers, **Driven by** can select independent / revealed by previous / inverse previous. The layer-0 pattern may also control the *local feed coefficient in the actual Gray–Scott update* when **Pattern A controls RD feed** is on. When A is itself the reaction field, the feed gate is disabled to avoid recursive self-sampling. The gate pattern is held at a reproducible frame while each bounded reaction batch advances.

**◉ Paint Mask** gives you a one-finger brush on the canvas, configurable to erase/reveal. Use **Full** to erase portions of the existing stack and **Empty** to reveal only painted regions. Brush strokes persist in recipe JSON, and each stroke is one Undo/Redo transaction. Mask painting never mutates the Penrose grid, source energy, genomes, or ecological history. Pinch zoom remains supported.

The **Grow +120** button advances numerical chemistry, not just the visual phase. **Freeze chemicals** sets numeric stepping to zero; **Reseed chemicals** reinitializes only this chemical field. Reaction-history checkpoints are included in Undo and recipe exports as lossy 8-bit concentrations (`gray-scott-v1`). Recipe reload has bounded quantization differences from uninterrupted execution. The live state intentionally is *not* guaranteed to loop; GIF/MP4 renders freeze it and sample closed periods of the original phason/chromatic animation.

## Performance and backwards compatibility

- Phase 013 starts with Pattern Lab **OFF**, so the Phase 012 default picture is pixel-for-pixel identical. No hidden change to the existing signal simulation.
- The 14 original patterns, routes, palettes, touch modes, saved genetics, relationship ecology and exports remain available.
- New Delaunay/RD visual layers use a bounded 185px preview longest-edge raster and independently cached Delaunay meshes. RD feed gates precompute their spatial mask once per bounded batch.
- Paused artwork avoids unnecessary repeated redraws, and a resize observer no longer clears unchanged canvas dimensions.
- Legacy Phase 012 recipes load with the old visuals intact. New recipes save painted masks and chemical history.
- Full-res PNG/MP4 overlays inherit the bounded texture resolution and may look softer than vector geometry. This is a performance tradeoff, not an actual continuous high-resolution PDE solver.

## Test evidence

Run `node test-007.cjs` through `node test-013.cjs`. Phase 013 tests specifically check seed determinism, the Delaunay empty circumcircle property, finite dual adjacency, Gray–Scott deterministic fixed-step history, bounded concentrations, causal feed gating, save/reload, and isolation from the existing colony system.

Chromium checks were run at 390×844 and 1280×900: baseline pixel equality with Phase 012, Delaunay and dual Voronoi renders, 120 reaction steps, A→B visual gate, feed mask, painting, Undo/Redo and recipe save passed with no JS errors. GIF89a export decoded to 16 frames, 2.000s total, infinite loop. Old Phase 012 recipe and new Phase 013 chemical/brush recipe imported successfully.

**A physical iPhone Safari was NOT tested. Native MP4 was preserved but not retested this phase.** No Netlify deployment, GitHub Actions or paid API calls.