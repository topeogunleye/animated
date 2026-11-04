# Voice Walkthrough Script: Maximum Subarray Two Ways — Empty list

**Preset Name**: Empty list  
**Source File**: [`03-Maximum-Sub-Array/Maximum Subarray Two Ways.html`](../../../03-Maximum-Sub-Array/Maximum%20Subarray%20Two%20Ways.html)  
**Input List**: `nums = []` (0 elements, base guard case)  
**Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)  
**Target Duration**: ~1.0 minute total (2 clips)

---

## 1. Verified Trace & Algorithm Summary

### Educational Purpose
Demonstrates the **empty list guard condition** (`nums = []`, length 0).
1. **Guard Clause**: Both `max_subarray_brute` and `max_subarray_fast` check `if len(nums) == 0: return 0, -1, -1` at their entry.
2. **Zero Iterations**: Neither nested loops nor linear loops execute.
3. **Comparison**: Both return `(0, -1, -1)`, validating `Match`.

---

## 2. Segment Table

| Clip ID & Filename | Animation Cue / Frames | Active Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---:|
| **01-setup-and-brute-empty.mp3** | Frame 0 -> Frame 2 | `[]` to `[1, 2]` | In this preset, we analyze the empty list boundary condition. When given an array with zero elements, there are no items to form a subarray. Both algorithms guard against this edge case at their very first line. Brute force checks the array length, finds it to be zero, and immediately returns zero with indices negative one, negative one, indicating that no slice exists. | ~26s |
| **02-kadane-empty-and-match.mp3** | Frame 3 -> Frame 5 | `[37, 15]` to `[38]` | Next, the single pass executes on the same empty list. It checks the identical guard condition, finds length zero, and also returns zero with indices negative one, negative one without executing its main loop. Comparing both outputs confirms a match: zero, negative one, negative one. Early exit checks ensure our algorithms terminate safely and predictably when inputs are empty. | ~28s |
