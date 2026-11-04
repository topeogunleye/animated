# Leftmost Binary Search: "Target missing (4)" Voice Walkthrough Script

An educational audio walkthrough for the 3D interactive visualization of leftmost binary search in [`01-leftmost-binary-search/leftmost_binary_search_animation.html`](../../01-leftmost-binary-search/leftmost_binary_search_animation.html).

This script follows the built-in **"Target missing (4)"** preset:
- Array: `nums = [1, 3, 5, 8]`
- Target: `target = 4`
- Verified Result: `(-1, 2)` — Target not found, search terminates with **2 comparisons** and returns **`-1`**.

All narration clips are written for curious beginners, linking the highlighted Python code to the visual changes in the 3D scene without reciting raw syntax. The spoken text is formatted specifically for ElevenLabs text-to-speech generation.

---

## 1. Verified Outline and Ground Truth

### Input and Array Layout
- **Input array**: `nums = [1, 3, 5, 8]` (length `n = 4`)
- **Target**: `target = 4`
- **Target occurrences**: None (the values jump from `3` at index 1 directly to `5` at index 2).
- **Goal**: Search efficiently, detect that 4 is absent, and terminate when boundaries cross without false matches.

| Index | Value | Role in Walkthrough |
|:-----:|:-----:|:-------------------|
| 0 | 1 | Discarded after comparison 1 (`3 < 4`); never probed directly. |
| 1 | 3 | Probed on comparison 1; strictly less than target (`3 < 4`). |
| 2 | 5 | Probed on comparison 2; strictly greater than target (`5 > 4`). |
| 3 | 8 | Discarded after comparison 2 (`5 > 4`); never probed directly. |

---

### Algorithm Logic and Python Source

The animation displays the following 15-line Python implementation in the right-hand panel:

```python
 1: def binary_search(nums, target):
 2:     low, high = 0, len(nums) - 1
 3:     comparisons = 0
 4:     result = -1
 5:     while low <= high:
 6:         mid = (low + high) // 2
 7:         comparisons += 1
 8:         if nums[mid] == target:
 9:             result = mid
10:             high = mid - 1
11:         elif nums[mid] < target:
12:             low = mid + 1
13:         else:
14:             high = mid - 1
15:     return result, comparisons
```

### The Missing Target Invariant
1. The `result` variable is initialized to `-1` on line 4.
2. In each iteration, if `nums[mid] == target`, `result` would update to `mid`.
3. Because 4 is not in `[1, 3, 5, 8]`, the branch `nums[mid] == target` is never entered.
4. When `low` climbs past `high` (`low = 2`, `high = 1`), the loop condition `low <= high` evaluates to `False`.
5. The function exits the loop and returns `(-1, 2)`, confirming absence using only $\log_2(4) = 2$ checks.

---

### Verified Simulation Trace

| Step / Frame | Active Lines | `low` | `high` | `mid` | Probed Value & Comparison | `comps` | `result` | 3D Visual State Changes |
|:---:|:---:|:---:|:---:|:---:|:---|:---:|:---:|:---|
| **0** (Start) | None | `null` | `null` | `null` | None | 0 | -1 | 4 blue bars on stage plate; no pointers; no bounding slab. |
| **1** (Init) | 1, 2, 3, 4 | 0 | 3 | `null` | None | 0 | -1 | Blue slab wraps indices 0–3; blue `low` pointer at 0; orange `high` pointer at 3. |
| **2** (Probe 1 pick) | 5, 6 | 0 | 3 | 1 | `(0 + 3) // 2 = 1` | 0 | -1 | Gold `mid` pointer drops above bar 1; bar 1 glows yellow. |
| **3** (Probe 1 step) | 7, 8, 11, 12 | 2 | 3 | 1 | `nums[1] = 3 < 4` (Too small) | 1 | -1 | Blue `low` slides right to index 2; bars 0 and 1 dim to 25%; slab narrows to `[2, 3]`. |
| **4** (Probe 2 pick) | 5, 6 | 2 | 3 | 2 | `(2 + 3) // 2 = 2` | 1 | -1 | Gold `mid` pointer drops above bar 2; bar 2 glows yellow. |
| **5** (Probe 2 step) | 7, 8, 11, 13, 14 | 2 | 1 | 2 | `nums[2] = 5 > 4` (Too big) | 2 | -1 | Orange `high` slides left to index 1; boundaries cross (`low 2 > high 1`); slab vanishes. |
| **6** (Exit) | 5 | 2 | 1 | `null` | `2 <= 1` is False | 2 | -1 | `mid` pointer vanishes; loop condition fails; search range is empty. |
| **7** (Return) | 15 | 2 | 1 | `null` | `return (-1, 2)` | 2 | -1 | Line 15 highlights; returns `(-1, 2)`; no result badge ever appears. |

---

## 2. Segment Table (ElevenLabs Audio Clips)

The walkthrough is divided into 4 self-contained clips, each aligned with a visual milestone.

> **Note for generation**: Spoken text contains only narration words. All cues, directions, and line references are kept strictly in metadata columns.

| Clip ID & Filename | Animation Cue & State | Active Code Lines | Spoken Text (ElevenLabs-Ready) | Approx. Duration |
|:---|:---|:---:|:---|:---:|
| `01-setup-and-key-idea.mp3` | **Initial scene & setup**<br>List `[1, 3, 5, 8]` appears. Blue translucent bounding box wraps indices 0 through 3. Blue `low` pointer at index 0; orange `high` pointer at index 3. No result badge. | Lines 1–4 | Suppose we want to find the number four in a sorted list containing one, three, five, and eight. Our goal is to locate the target if it exists, or confirm that it is missing. To begin our search, we set two boundaries: low at index zero, and high at index three. We also initialize our result variable to negative one, indicating that no match has been found yet. The blue bounding box outlines our entire four-item search window. | ~22s |
| `02-probe-one-mid-one.mp3` | **First probe (Index 1)**<br>Gold `mid` pointer drops onto index 1 (value 3). Comparison 1 evaluates `nums[1] < 4`. Blue `low` pointer slides right to index 2. Bars 0 and 1 dim. Slab shrinks to `[2, 3]`. | Lines 5–6, then Lines 7, 8, 11, 12 | We start by checking the middle of our active range. Halfway between zero and three is index one, which holds the number three. Three is smaller than our target of four. Because the list is sorted in ascending order, no number at index one or to its left can possibly equal four. So we advance our low boundary past index one up to index two. In one quick step, we discard the entire left half of the list. | ~22s |
| `03-probe-two-mid-two.mp3` | **Second probe (Index 2)**<br>Gold `mid` pointer drops onto index 2 (value 5). Comparison 2 evaluates `nums[2] > 4`. Orange `high` pointer slides left to index 1. Slab vanishes. | Lines 5–6, then Lines 7, 8, 11, 13, 14 | Our active search window is now narrowed to just two items: index two and index three. Halfway between two and three is index two, which holds the number five. Five is larger than four. Because all subsequent numbers are even larger, our target cannot be at index two or anywhere to its right. Following our rule, we pull our high boundary down to index one. | ~20s |
| `04-termination-and-missing-result.mp3` | **Boundary crossover & return**<br>`low` is 2 and `high` is 1 (`low > high`). Boundaries crossed. Line 15 highlights. Function returns `(-1, 2)`. | Line 5, then Line 15 | Look at what just happened to our boundaries: low is at index two, but high has moved down to index one. The boundaries have crossed. Because low is now greater than high, our search interval is completely empty, and the loop terminates. The function returns negative one along with two comparisons. In only two checks, we proved conclusively that the number four is not in the list. | ~21s |

---

## 3. Continuous Read-Through

Use this unbroken version for recording full-length voiceover:

> Suppose we want to find the number four in a sorted list containing one, three, five, and eight. Our goal is to locate the target if it exists, or confirm that it is missing.
>
> To begin our search, we set two boundaries: low at index zero, and high at index three. We also initialize our result variable to negative one, indicating that no match has been found yet. The blue bounding box outlines our entire four-item search window.
>
> We start by checking the middle of our active range. Halfway between zero and three is index one, which holds the number three.
>
> Three is smaller than our target of four. Because the list is sorted in ascending order, no number at index one or to its left can possibly equal four. So we advance our low boundary past index one up to index two. In one quick step, we discard the entire left half of the list.
>
> Our active search window is now narrowed to just two items: index two and index three. Halfway between two and three is index two, which holds the number five.
>
> Five is larger than four. Because all subsequent numbers are even larger, our target cannot be at index two or anywhere to its right. Following our rule, we pull our high boundary down to index one.
>
> Look at what just happened to our boundaries: low is at index two, but high has moved down to index one. The boundaries have crossed. Because low is now greater than high, our search interval is completely empty, and the loop terminates.
>
> The function returns negative one along with two comparisons. In only two checks, we proved conclusively that the number four is not in the list.

---

## 4. Pronunciation and Text-to-Speech Notes

1. **Number words instead of digits**:
   - The script writes `"zero"`, `"one"`, `"two"`, `"three"`, `"four"`, `"five"`, `"eight"` to avoid ordinal/numeric artifacts in TTS models.
   - For negative initialization, `"negative one"` is explicitly written instead of `"-1"`.
2. **Avoiding syntax symbols**:
   - Instead of `mid = (low + high) // 2`: `"Halfway between zero and three is index one"`.
   - Instead of `low <= high`: `"low is greater than high"`.
   - Instead of `nums[1]`: `"index one, which holds the number three"`.
3. **Recommended ElevenLabs Voice & Settings**:
   - **Voice**: `Alice - Clear, Engaging Educator` (or `Lauren`)
   - **Model**: `Eleven Multilingual v2` (or `Eleven Turbo v2.5`)
   - **Stability**: `50%`
   - **Clarity / Similarity**: `75%`
   - **Style Exaggeration**: `0%`
   - **Speaker Boost**: `On`
   - **Speed**: `1.0 (100%)`

---

## 5. Accuracy Checklist and Verification Summary

- [x] **Source of truth verified**: Checked `simulate(cfg)` for `PRESETS[1]` in `01-leftmost-binary-search/leftmost_binary_search_animation.html`.
- [x] **Preset configuration verified**: Preset 1 defines `name: 'Target missing (4)'`, `nums: [1, 3, 5, 8]`, and `target: 4`.
- [x] **Midpoint probe sequence**: Verified exactly as `mid = 1` $\rightarrow$ `mid = 2` (2 probes).
- [x] **Comparison count**: Verified exactly as `comps = 2`.
- [x] **Result sequence**:
  - Initial: `-1`
  - Probe 1 (`nums[1] = 3 < 4`): remains `-1`
  - Probe 2 (`nums[2] = 5 > 4`): remains `-1`
  - Return: `(-1, 2)` (no match found).
- [x] **Boundary updates**:
  - Init: `low = 0`, `high = 3`
  - Probe 1 (`3 < 4`): `low = 1 + 1 = 2`, `high = 3`
  - Probe 2 (`5 > 4`): `low = 2`, `high = 2 - 1 = 1`
  - Exit: `low = 2 > high = 1` (crossover).
- [x] **Code line mapping**:
  - Init: Lines 1–4
  - Probe 1: Lines 5–6, then Lines 7, 8, 11, 12
  - Probe 2: Lines 5–6, then Lines 7, 8, 11, 13, 14
  - Loop exit: Line 5
  - Return: Line 15
- [x] **Visual state synchronization**:
  - In Probe 1, bars 0 and 1 dim to 25% opacity; slab shrinks to `[2, 3]`.
  - In Probe 2, `high` crosses `low`; slab disappears (`low > high`).
  - No green `result` badge is ever rendered.
- [x] **ElevenLabs-ready clean narration**: Zero stage directions, zero code symbols, natural spoken English with written-out numerals.
