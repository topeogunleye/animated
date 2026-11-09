# 3D patterns by algorithm family

All families share one visual language, taken from the reference page: solid objects standing on a floor plate, cones for pointers (up-pointing from the floor in their own z lanes, down-pointing above for the "current" element), a translucent slab for the active region, a gold outline for the element being examined, green for the result, faded objects for discarded ones. Yaw-only drag-to-rotate, perspective camera FOV 32.

| Family | Objects | Slab means | Notes |
|---|---|---|---|
| Binary search, two pointers, sliding window | Pillars (height = value) | Active range `[low, high]` or window | Offset low/high in z lanes; when equal, offset in x by 0.23 |
| Sorting (bubble, insertion, selection) | Pillars on a row | Sorted prefix or current pass range | Compared pair gets the gold outline; swaps move the same two meshes along arcs; sorted pillars turn green |
| Merge / quick sort | Pillars grouped by subarray | Current partition | Pivot is a taller cone marker; sub-problems sit in lanes at increasing z |
| Prefix sums, Kadane | Pillars plus a running-value pillar | Current best subarray | Reset visible as the running pillar dropping to the floor |
| DP table | Grid of low blocks on a larger plate | Cells being read | Read cells outlined, written cell lifts; thin lines to dependencies |
| Recursion / DFS | One block per active call, receding in z | Active call's range | Active call lit, waiting calls dashed outline, return value pops with the block |
| BFS / DFS on graphs | Spheres for nodes, thin cylinders for edges, on the floor plate | Frontier | Layers by distance along z; label every state so colour is never the only cue |
| Trees | Spheres by level (y) and in-order position (x) | Current subtree | Highlight current node and path so far |
| Stack / queue | Blocks in a rack | Occupied region | Push drops in from above, pop lifts out; front and back labelled |

## Budget and performance
- 300 meshes or fewer, reuse geometries, render on demand.
- Sprites for text, rebuilt on theme change; dispose textures on rebuild.
- If the input is too large, show a clear message in the stage and offer a smaller preset.

## Camera
- Fixed target at the floor centre. Yaw clamped to about ±0.55 rad, pitch fixed at 0.46. Distance fitted from the stage aspect and the widest rotated extent. No auto-follow, no zoom; double-click resets.
