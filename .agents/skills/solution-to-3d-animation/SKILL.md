---
name: solution-to-3d-animation
description: >-
  Build a single-file Three.js 3D walkthrough animating how code or an algorithm executes, in a clean fixed house style: perspective camera, solid pillars on a floor plate, translucent search-window slab, drag-to-rotate (yaw only), synchronized comment-free code highlighting line by line, one-sentence captions, and playback controls. Use when the user asks for a 3D animation of code or an algorithm (binary search, two pointers, sliding window, sorting, DP, trees, graphs, recursion), says "show me this in 3D", or pastes a LeetCode-style problem or solution.
---

# Solution to 3D Animation

Turn a coding question and/or solution into **one self-contained HTML page** that follows the proven reference implementation in `assets/template.html`. **Copy the reference template and swap only the algorithm-specific parts.** Do not redesign the layout, palette, camera, or controls.

## The House Style

- **Layout**: Single-line title (`h1`), then a responsive two-column grid: left = 3D stage, one caption line, controls; right = code panel. Collapses to a single column below 760 px. No subtitle, legends, metric cards, or step counters.
- **Stage**: 4:3 box (`aspect-ratio: 4/3`, `max-height: 64vh`), rounded 12px, `--stage` background, 1px border. Inside: the canvas, monospace status badge `.tag` at top-left (e.g. `target 3 · comparisons 1`), and interaction hint at bottom-right (`drag to rotate · double-click to reset`).
- **3D Scene (Three.js r128, plain script from cdnjs, `alpha: true`)**:
  - `PerspectiveCamera`, FOV 32, looking at the center of the floor plate from slightly above (pitch ~0.46 rad, yaw ~-0.22 rad).
  - Ambient light 0.58 plus directional light 0.85 from upper left front. `MeshLambertMaterial` for solids.
  - **Solid Pillars**: One `BoxGeometry` per element, width 0.78, spacing 1.0, height proportional to value (scaled so tallest is 3 units, minimum 0.12), standing on the floor. Value label on top, index label on floor in front.
  - **Floor Plate**: Thin box plate (`--plate` color, 0.14 high) under the row, deep enough in z to hold pointer lanes.
  - **Translucent Slab**: Unit box scaled to the active range `[low, high]` in x, taller than the tallest pillar, `MeshBasicMaterial` blue at opacity 0.12, `depthWrite: false`, with an accent-colored `EdgesGeometry` outline. Slides and resizes between frames; hidden when range is empty.
  - **Pointers**: Cones with sprite labels. `low` (blue `#2563a8`) and `high` (orange `#c46a14`) point up from the floor in separate z-lanes (z 1.2 and 2.2) so they never collide; offset ±0.23 in x when `low === high`. `mid` (gold `#e8a900`) points down above the tallest pillar.
  - **Emphasis without Color Alone**: Examined pillar gets a gold outline and emissive tint; found result turns green `#2e9e5b` with a `result` label; out-of-range pillars fade to opacity 0.25.
  - Empty input shows an `empty list` sprite instead of a floor plate.
- **Drag to Rotate**: Pointer drag rotates yaw only (clamped to ±0.55 rad); double-click resets view. `touch-action: pan-y` preserves vertical scrolling on touch devices. Camera distance auto-fits so the floor and tallest pillar remain visible at extreme angles.
- **Motion & On-Demand Rendering**: Eased tweens for pointers and slab when stepping one frame; instant jumps on Reset, preset change, or `prefers-reduced-motion`. Render on demand (only while tweening or interacting). No particles or camera tours.
- **Code Panel**: Comment-free code, exact indentation, 1-based line numbers, monospace. Highlights `frame.lines` only (fill plus solid left bar); never speculative next lines. Populated with `textContent`; scrolls only inside its own container.
- **Playback Controls**: Back, Play/Pause/Replay, Next, Reset, preset select (3 to 5), speed select (Slow 1300ms, Normal 850ms, Fast 450ms, Very fast 220ms, times `frame.hold`). Space and arrow keys for keyboard navigation. Pauses when tab is hidden.
- **Theming & Resilience**: CSS variables on `:root` and `:root[data-theme="dark"]`. Explicit body background; safe-area padding; no horizontal overflow at 380 px. Rebuilds scene and text sprites on theme change. If WebGL fails, shows a concise message inside the stage while captions and code panel remain functional.

## Algorithm Mapping (`references/3d-patterns.md`)

Consult `references/3d-patterns.md` for algorithm-specific spatial mappings:
- **Binary Search / Two Pointers / Sliding Window**: Pillars, pointer cones in z-lanes, translucent window slab.
- **Sorting**: Pillars on a row, gold outline on compared pair, arc swaps, sorted prefix turns green.
- **Merge / Quick Sort**: Pillars grouped by subarray partitions, pivot marker, recursion lanes receding in z.
- **DP Table**: Grid of low blocks, read cells outlined, written cell lifts.
- **Trees / Graphs**: Node spheres and edge cylinders on floor plate, lit frontier.
- **Stack / Queue**: Linear rack of blocks, push drops in from above, pop lifts out.

## What to Change per Algorithm

Start from `assets/template.html`. Keep marked comment blocks intact:
1. `/* SOURCE:BEGIN */ ... /* SOURCE:END */`: `SRC` code lines array (0-based indices) and `FIXED` lines array.
2. `/* PRESETS:BEGIN */ ... /* PRESETS:END */`: `[{name, args: [...]}]` presets array.
3. `/* SIMULATE:BEGIN */ ... /* SIMULATE:END */`: Pure `simulate()` function returning `{frames, result}`.
4. `build()`: Creates meshes representing the data structure.
5. `applyScene(frame, animate)`: Updates targets, pointers, slab, and pillar states from the frame snapshot.
6. `.tag`: Status text showing key metrics (e.g. `target 3 · comparisons 1`).

All other components (camera fitting, yaw drag, tween manager, code panel, playback state machine, theme handling) are reused untouched.

## Frame and Trace Specification

Every frame in `frames` must be an **independent, deep-copied snapshot**:
- `lines`: 0-based source line indices executing in `SRC`.
- `wait`: 0-based line indices waiting on child recursion (dashed border).
- `msg`: One concrete sentence with actual values (<= 140 chars).
- `kind`: `'start' | 'init' | 'pick' | 'step' | 'move' | 'enter' | 'ret' | 'err' | 'end'`.
- `hold`: Timing multiplier (1.0 default, 1.4 - 1.7 for key events).
- Algorithm state: Deep-copied state variables (e.g. `low, high, mid, comps, target`).

## Verification Workflow in Antigravity

Before delivering the animation, run automated verification:

1. Write the HTML file to workspace (e.g. `animations/<problem>_3d.html` or in Antigravity artifact directory).
2. Run trace extraction and validator:
   ```bash
   node scripts/dump_trace.js <path_to_html> trace.json
   node scripts/validate_trace.js trace.json
   ```
3. Verify `0 error(s)` reported. Fix any invalid line indices or shared object references.

## Delivery

- Provide a clickable markdown link: `[Open 3D Animation](file:///absolute/path/to/<problem>_3d.html)`.
- For compact inline visualization, embed with:
  ```html
  <agent-embed src="file:///absolute/path/to/<problem>_3d.html"></agent-embed>
  ```
- Summarize the algorithm insight, presets included, and any bug fixes applied.
