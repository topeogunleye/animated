# Voice Walkthrough Script: Maximum Subarray Two Ways — All negative

**Preset Name**: All negative  
**Source File**: [`03-Maximum-Sub-Array/Maximum Subarray Two Ways.html`](../../../03-Maximum-Sub-Array/Maximum%20Subarray%20Two%20Ways.html)  
**Input List**: `nums = [-3, -1, -2]` (3 elements, all negative)  
**Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)  
**Target Duration**: ~2.0 minutes total (3 clips)

---

## 1. Verified Trace & Algorithm Summary

### Educational Purpose
Demonstrates the **all-negative numbers boundary condition**.
1. **The Trap**: Beginners often think the maximum subarray might be empty or zero, but when non-empty subarrays are required, the maximum sum must be the single **least negative** element.
2. **Brute Force**: Evaluates all 6 slices. Slice `[1..1]` with sum `-1` is highest.
3. **Kadane’s Algorithm**: Resets at every single position because `current < 0` at every step! Resets to `-1` at index 1 (updating `best`), and resets to `-2` at index 2.
4. **Comparison**: Both return `(-1, 1, 1)`, validating `Match`.

---

## 2. Segment Table

| Clip ID & Filename | Animation Cue / Frames | Active Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---:|
| **01-setup-and-brute-force.mp3** | Frame 0 -> Frame 12 | `[]` to `[14]` | In this preset, we investigate an essential edge condition: what happens when every single number in the array is negative? With values negative three, negative one, and negative two, any multi-element subarray will accumulate a smaller, more negative sum. Brute force begins by checking all six possible contiguous slices. As it tests each slice, only index one containing negative one improves upon our initial best of negative three. Brute force concludes that the single least negative element, negative one at index one, yields the maximum sum. | ~38s |
| **02-kadane-all-negative-resets.mp3** | Frame 13 -> Frame 19 | `[37, 15]` to `[33]` | Now we switch to Kadane's algorithm. We start with current and best both set to negative three at index zero. At index one, because current is negative three, extending it would only drag down future numbers. Kadane's rule immediately triggers: we drop negative three and restart fresh at index one with negative one. This beats negative three, updating best to negative one! At index two, current is again negative, so we drop it once more and restart with negative two, which does not exceed best. Kadane's algorithm returns negative one. | ~42s |
| **03-match-and-least-negative.mp3** | Frame 20 | `[38]` | Both algorithms return negative one spanning index one to index one, confirming an exact match. When all numbers are negative, Kadane's algorithm resets at every single step, elegantly selecting the least negative single element without needing any special branching. | ~24s |
