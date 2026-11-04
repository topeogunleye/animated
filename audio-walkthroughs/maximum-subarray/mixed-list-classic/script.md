# Voice Walkthrough Script: Maximum Subarray Two Ways — Mixed list (the classic)

**Preset Name**: Mixed list (the classic)  
**Source File**: [`03-Maximum-Sub-Array/Maximum Subarray Two Ways.html`](../../../03-Maximum-Sub-Array/Maximum%20Subarray%20Two%20Ways.html)  
**Input List**: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]` (9 elements, mixed positive/negative)  
**Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)  
**Target Duration**: ~3.0 minutes total (5 clips)

---

## 1. Verified Trace & Algorithm Summary

### Educational Purpose
Demonstrates the classic **Maximum Subarray Problem (LeetCode 53)** by comparing:
1. **Brute Force ($O(n^2)$)**: Tests all $\frac{n(n+1)}{2} = 45$ contiguous subarrays using nested loops, updating `best` whenever `total > best`.
2. **Kadane’s Algorithm ($O(n)$)**: Solves the problem in a single pass. The crucial invariant: whenever `current < 0`, carrying that running sum forward into future subarrays can only decrease their sum. Thus, we immediately discard negative sums and restart at index $i$.
3. **Optimal Subarray**: `nums[3..6] = [4, -1, 2, 1]` with sum **6**.

### Simulation Trace Table (`nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`)

| Frame | Stage / Phase | Lines Highlighted | State / Pointers | Visual State |
|:---:|:---|:---:|:---|:---|
| **0** | Key Idea | None | — | Tag: `brute force vs single pass` |
| **1–2** | Brute Init | `[35, 36, 0]`, `[3, 4, 5]` | `best = -2` at `(0, 0)` | Slab at index 0 |
| **3–56** | Brute 45 Slices | `[6, 7]` and `[8, 9, 10...]` | `i = 0..8`, `j = i..8` | Blue pillar bars, slice slab expanding |
| **34** | Brute Peak | `[8, 9, 10, 11, 12, 13]` | `best = 6` at `(3, 6)` | Best slice established at `[3..6]` |
| **57** | Brute Return | `[14]` | Returns `(6, 3, 6)` | All 45 slices checked |
| **58–59** | Kadane Init | `[37, 15]`, `[16, 18-22]` | `current = -2`, `best = -2` | Pointer start=0, i=0 |
| **60–61** | Kadane Drop 1 | `[23-26]`, `[29-32]` | `current = 1`, `best = 1` at `(1, 1)` | Drop -2, restart at index 1 |
| **62–63** | Kadane Extends | `[23, 24, 27, 28]`, `[29]` | `current = -2`, `best = 1` | Add -3 $\to$ current goes negative |
| **64–65** | Kadane Drop 2 | `[23-26]`, `[29-32]` | `current = 4`, `best = 4` at `(3, 3)` | Drop -2, restart at index 3 |
| **66–67** | Kadane Extends | `[23, 24, 27, 28]`, `[29]` | `current = 3`, `best = 4` | Add -1 $\to$ current remains 3 |
| **68–69** | Kadane Extends | `[23, 24, 27, 28]`, `[29-32]` | `current = 5`, `best = 5` at `(3, 5)` | Add 2 $\to$ new best 5 |
| **70–71** | Kadane Peak | `[23, 24, 27, 28]`, `[29-32]` | `current = 6`, `best = 6` at `(3, 6)` | Add 1 $\to$ global max best 6! |
| **72–75** | Kadane Finish | `[23, 24, 27, 28]`, `[29]` | `current = 1`, then `current = 5` | Add -5, then add 4 |
| **76** | Kadane Return | `[33]` | Returns `(6, 3, 6)` | Single pass completed in 9 steps |
| **77** | Comparison | `[38]` | Result: `Match` | Prints Match: `(6, 3, 6)` identical |

---

## 2. Segment Table (ElevenLabs-Ready)

| Clip ID & Filename | Animation Cue / Frames | Active Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---:|
| **01-setup-and-key-idea.mp3** | Frame 0 -> Frame 2 | `[]` to `[3, 4, 5]` | In this visualizer, we explore the maximum subarray problem using two distinct approaches: brute force and Kadane's algorithm. The core idea is that brute force exhaustively evaluates every contiguous slice, whereas the single-pass algorithm maintains a running sum and immediately resets whenever that sum drops below zero. We test both methods on our nine-element array containing positive and negative values. Brute force begins first, initializing best to our first element, negative two, at index zero. | ~32s |
| **02-brute-force-all-slices.mp3** | Frame 3 -> Frame 57 | `[6, 7]` to `[14]` | Brute force systematically checks all forty-five possible contiguous subarrays. An outer pointer i selects each starting position, while an inner pointer j expands the slice rightward, accumulating values into total. Whenever total surpasses best, we record the new peak and its bounding indices. As the visualizer sweeps through all pairs, the slice from index three to index six emerges as the winner, reaching a total of six. Having checked all combinations, brute force returns sum six from index three to six. | ~40s |
| **03-kadane-init-and-early-drops.mp3** | Frame 58 -> Frame 65 | `[37, 15]` to `[29, 30, 31, 32]` | Now we execute Kadane's algorithm, which solves the problem in a single linear pass. We initialize both current and best to the first element, negative two, at index zero. At index one, because our current sum is negative, carrying it forward would only hurt any future slice. Kadane's rule triggers: we discard negative two and restart our subarray at index one with value one, which updates best to one. At index two, adding negative three pulls current to negative two. At index three, seeing a negative current sum again, we drop it and restart fresh with four, updating best to four. | ~44s |
| **04-kadane-accumulate-maximum.mp3** | Frame 66 -> Frame 75 | `[23, 24, 27, 28]` to `[29]` | With a healthy positive sum of four, we continue extending our window. At index four, adding negative one drops current to three, but because three is still positive, our subarray remains alive. At index five, adding two elevates current to five, surpassing four and setting a new best. At index six, adding one lifts current to six, capturing our optimal subarray: four, negative one, two, one, with a maximum sum of six! Adding negative five at index seven and four at index eight completes the pass. | ~38s |
| **05-comparison-and-complexity.mp3** | Frame 76 -> Frame 77 | `[33]` to `[38]` | With one pass completed, Kadane's algorithm returns our maximum sum of six from index three to index six. Comparing the results confirms an exact match: both methods identified the identical optimal slice. However, while brute force required forty-five checks quadratic in array size, Kadane's algorithm arrived at the exact same answer in just nine linear steps, illustrating the elegant efficiency of resetting negative prefixes. | ~32s |

---

## 3. Continuous Read-Through

> In this visualizer, we explore the maximum subarray problem using two distinct approaches: brute force and Kadane's algorithm. The core idea is that brute force exhaustively evaluates every contiguous slice, whereas the single-pass algorithm maintains a running sum and immediately resets whenever that sum drops below zero. We test both methods on our nine-element array containing positive and negative values. Brute force begins first, initializing best to our first element, negative two, at index zero.
>
> Brute force systematically checks all forty-five possible contiguous subarrays. An outer pointer i selects each starting position, while an inner pointer j expands the slice rightward, accumulating values into total. Whenever total surpasses best, we record the new peak and its bounding indices. As the visualizer sweeps through all pairs, the slice from index three to index six emerges as the winner, reaching a total of six. Having checked all combinations, brute force returns sum six from index three to six.
>
> Now we execute Kadane's algorithm, which solves the problem in a single linear pass. We initialize both current and best to the first element, negative two, at index zero. At index one, because our current sum is negative, carrying it forward would only hurt any future slice. Kadane's rule triggers: we discard negative two and restart our subarray at index one with value one, which updates best to one. At index two, adding negative three pulls current to negative two. At index three, seeing a negative current sum again, we drop it and restart fresh with four, updating best to four.
>
> With a healthy positive sum of four, we continue extending our window. At index four, adding negative one drops current to three, but because three is still positive, our subarray remains alive. At index five, adding two elevates current to five, surpassing four and setting a new best. At index six, adding one lifts current to six, capturing our optimal subarray: four, negative one, two, one, with a maximum sum of six! Adding negative five at index seven and four at index eight completes the pass.
>
> With one pass completed, Kadane's algorithm returns our maximum sum of six from index three to index six. Comparing the results confirms an exact match: both methods identified the identical optimal slice. However, while brute force required forty-five checks quadratic in array size, Kadane's algorithm arrived at the exact same answer in just nine linear steps, illustrating the elegant efficiency of resetting negative prefixes.

---

## 4. Pronunciation & TTS Tuning Notes

- **Signed values**: Written as `negative two`, `negative three`, `negative one`, `negative five` so ElevenLabs articulates the sign cleanly.
- **Indices**: Written as `index zero`, `index one`, `index three to index six`.
- **Zero code syntax / markdown** in spoken text blocks.

---

## 5. Accuracy Checklist

- [x] Input list is `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` (length 9).
- [x] Brute force checks 45 slices and returns `(6, 3, 6)`.
- [x] Kadane’s algorithm resets at index 1 and index 3, and returns `(6, 3, 6)`.
- [x] Final comparison validates `Match`.
- [x] All 78 frames (0 to 77) are accounted for.
