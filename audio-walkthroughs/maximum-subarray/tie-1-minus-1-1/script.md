# Voice Walkthrough Script: Maximum Subarray Two Ways — Tie: 1, -1, 1

**Preset Name**: Tie: 1, -1, 1  
**Source File**: [`03-Maximum-Sub-Array/Maximum Subarray Two Ways.html`](../../../03-Maximum-Sub-Array/Maximum%20Subarray%20Two%20Ways.html)  
**Input List**: `nums = [1, -1, 1]` (3 elements, symmetrical tie)  
**Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)  
**Target Duration**: ~2.0 minutes total (3 clips)

---

## 1. Verified Trace & Algorithm Summary

### Educational Purpose
Demonstrates **symmetrical tie-breaking**:
1. **Multiple Optimal Slices**: Slices `[0..0]` (sum 1), `[2..2]` (sum 1), and `[0..2]` (`1 + (-1) + 1 = 1`) all tie for the maximum sum.
2. **Strict Inequality (`>`)**: Both algorithms only update when `> best`. Thus, the leftmost optimal slice `[0..0]` is preserved.
3. **Kadane’s Zero Threshold**: At $i=1$, `current` drops to `0`. Since `0 < 0` is false, Kadane does **not** reset; it keeps extending to index 2!
4. **Comparison**: Both return `(1, 0, 0)`, validating `Match`.

---

## 2. Segment Table

| Clip ID & Filename | Animation Cue / Frames | Active Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---:|
| **01-setup-and-brute-force.mp3** | Frame 0 -> Frame 12 | `[]` to `[14]` | In this preset, we explore an intriguing scenario: symmetrical tie-breaking. Our array contains one, negative one, and one. Notice that several different subarrays achieve the exact same maximum sum: the single element at index zero has sum one, the single element at index two has sum one, and the entire three-element array sums to one! Brute force evaluates all six slices. Because our update condition requires total to be strictly greater than best, ties do not overwrite earlier findings, and brute force returns the first optimal slice: sum one at index zero to index zero. | ~38s |
| **02-kadane-symmetry-and-ties.mp3** | Frame 13 -> Frame 19 | `[37, 15]` to `[33]` | Now Kadane's algorithm executes. It initializes both current and best to one at index zero. At index one, adding negative one reduces current to zero. Crucially, zero is not negative, so Kadane's rule does not drop the subarray; it keeps extending. At index two, adding one raises current back to one. Since one is not strictly greater than our existing best of one, best remains at index zero to index zero. Kadane's algorithm returns one from index zero to index zero. | ~40s |
| **03-tie-resolution-and-match.mp3** | Frame 20 | `[38]` | Both algorithms return a maximum sum of one from index zero to index zero, confirming a match. This preset demonstrates that strict inequality ensures consistent, deterministic tie-breaking across both algorithms, preserving the leftmost optimal subarray. | ~22s |
