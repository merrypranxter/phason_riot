# PHASON RIOT 014 — coupling model, invariants and test contract

## Actual reagent editing

The Phase 013 finite-difference Gray–Scott concentration fields U and V remain numerical state, not shader colors. The new Reagents touch tool operates at normalized chemical coordinates (u,v) on a periodic grid. A bounded Gaussian stamp is applied inside radius r:

- weight = strength × exp(-3 × toroidalDistance²/r²), with distance less than r
- Inject V: V ← clamp(V + weight(1−V)); U ← clamp(U−0.4 weight)
- Erase V: V ← V(1−weight); U ← clamp(U+0.65 weight)
- Replenish U: U ← clamp(U+weight(1−U)); V ← V(1−0.22 weight)

U and V remain in [0,1]. Each brush stamp changes the actual chemical initial conditions but does not advance chemical tick. A separate paint revision prompts paused Canvas rendering to update. Strokes are saved as chemical concentration checkpoints within the existing recipe/Undo design. Checkpoints quantize U/V to 8-bit values, so restored Float32 fields are approximate.

## Opt-in chemical influence on electrical graph

For each actual rhomb i in the current five-family de Bruijn dual pentagrid, sample V at the rhomb center using the same chemical coordinate mapping as the renderer. Let c_i be that value clamped to [0,1], and s the user influence in [0,1.5].

The existing signal transport term D_i is multiplied by:

- Promote: clamp(1 + 1.15 s c_i, 0.16, 2.5)
- Suppress: clamp(1 − 1.15 s c_i, 0.16, 2.5)
- Contrast: clamp(1 + 1.15 s (2c_i−1), 0.16, 2.5)

When coupling is OFF, Pattern Lab is OFF, s=0, or the chemical field length doesn't match the rhomb count, the multiplier is 1. **The Phase 013 electrical operator is then exactly unchanged**. Chemical coupling changes the local effective transfer coefficient, not graph topology. The full system has injection, damping, memory and inhibition and is not claimed to globally conserve electrical energy. This is an artistic synthetic dynamical system, not a validated material/biological law.

The temporal chemical state is not periodic. GIF capture freezes chemistry/colony history and records periodic phase-driven geometry/colors; no false claim is made that the Gray–Scott solution evolves as a perfect loop.

## Pattern palettes

Three optional visual layers have independently selected names from the existing palette registry, including imported JSON palettes. New paletteShift is a reversible per-layer color-role rotation, not destructive rewriting of palette stops. Recipe export includes the global palette plus all referenced layer palettes so a recipe opened in a fresh browser retains its custom names/colors.

## Verification summary

Phase 014 Node tests: bounded U/V stamps; Inject V, Erase V, Replenish U; deterministic repeatability; checkpoint load; causal electricity ON difference; promote-vs-suppress divergence; exact OFF, strength-zero and invalid-field fallback.

Browser tests: simulated 390px phone and 1280px desktop; visual rendering without JS errors; touch painting and Undo/Redo; independent palettes and imported custom palette recipe roundtrip; Phase 013 pixel-for-pixel image parity when Pattern Lab is OFF; actual 360×360 GIF89a with 16 decoded frames totaling 2,000 ms. Real iPhone Safari and Phase 014 native MP4 performance were not tested.