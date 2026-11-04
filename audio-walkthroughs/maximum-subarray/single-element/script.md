# Voice Walkthrough Script: Maximum Subarray Two Ways — Single element

**Preset Name**: Single element  
**Source File**: [`03-Maximum-Sub-Array/Maximum Subarray Two Ways.html`](../../../03-Maximum-Sub-Array/Maximum%20Subarray%20Two%20Ways.html)  
**Input List**: `nums = [5]` (1 element, positive)  
**Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)  
**Target Duration**: ~1.5 minutes total (3 clips)

---

## 1. Verified Trace & Algorithm Summary

### Educational Purpose
Demonstrates the **base case boundary condition** where the array contains exactly one element (`[5]`).
1. **Brute Force**: Exactly 1 slice exists (`[0..0]`). Total is 5, returning `(5, 0, 0)`.
2. **Kadane’s Algorithm**: `best` and `current` are initialized to `nums[0] = 5`. The main loop `for i in range(1, len(nums))` has 0 iterations because `len(nums) == 1`. Returns `(5, 0, 0)` immediately.
3. **Comparison**: Both return `(5, 0, 0)`, validating `Match`.

---

## 2. Segment Table

| Clip ID & Filename | Animation Cue / Frames | Active Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---:|
| **01-setup-and-key-idea.mp3** | Frame 0 -> Frame 2 | `[]` to `[3, 4, 5]` | In this preset, we examine the base case of the maximum subarray problem: an array containing a single element, the number five. When an array has only one item, any contiguous subarray must consist solely of that single element. We begin by setting up brute force, initializing best to our first element, five, at index zero. | ~28s |
| **02-brute-and-fast-single-element.mp3** | Frame 3 -> Frame 8 | `[6, 7]` to `[33]` | Brute force checks the only slice available: the single element at index zero. Total equals five, which matches best, so brute force returns five from index zero to index zero. Now we run Kadane's algorithm. It initializes both current and best to five. Because the array has length one, the loop from index one onward has zero iterations to perform, so the single pass also returns five immediately. | ~36s |
| **03-match-and-base-case.mp3** | Frame 9 | `[38]` | Both algorithms return a maximum sum of five from index zero to index zero, resulting in a match. This confirms that even without any loop iterations, our boundary conditions and initial variables naturally handle single-element arrays correctly. | ~22s |
