# Leftmost Binary Search: "All equal (7 x 5)" Voice Walkthrough Script

An educational audio walkthrough for the 3D interactive visualization of leftmost binary search in [`01-leftmost-binary-search/leftmost_binary_search_animation.html`](../../01-leftmost-binary-search/leftmost_binary_search_animation.html).

This script follows the built-in **"All equal (7 x 5)"** preset:
- Array: `nums = [7, 7, 7, 7, 7]` (length `n = 5`)
- Target: `target = 7`
- Verified Result: `(0, 2)` — Leftmost match found at **index 0** in **2 comparisons**.
- Narrator Voice: **Lauren** (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`).

All narration clips are written for curious beginners, highlighting the fundamental difference between standard binary search (which halts immediately at the first match at index 2) and leftmost binary search (which saves candidate matches and searches left, guaranteeing the true first occurrence at index 0).

---

## 1. Verified Outline and Ground Truth

### Input and Array Layout
- **Input array**: `nums = [7, 7, 7, 7, 7]` (length `n = 5`)
- **Target**: `target = 7`
- **Target occurrences**: 5 (every item in the array is equal to the target).
- **Goal**: Demonstrate how the algorithm systematically contracts the right boundary on identical elements until finding index 0.

| Index | Value | Role in Walkthrough |
|:-----:|:-----:|:-------------------|
| 0 | 7 | Probed on comparison 2; matches target; becomes final verified leftmost result (`result = 0`). |
| 1 | 7 | Bounded by interval after comparison 1; never probed directly because `mid = (0 + 1) // 2 = 0`. |
| 2 | 7 | Probed on comparison 1; matches target; saved as initial candidate result (`result = 2`). |
| 3 | 7 | Discarded after comparison 1 when `high` moves to index 1; never probed. |
| 4 | 7 | Discarded after comparison 1 when `high` moves to index 1; never probed. |

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

### The All-Duplicates Invariant
1. In a regular binary search, the loop terminates on line 8 the moment `nums[mid] == target` is true. For `[7, 7, 7, 7, 7]`, regular binary search would return index 2, failing to locate the leftmost occurrence.
2. In leftmost binary search, matching the target triggers `result = mid` and `high = mid - 1` (lines 9–10).
3. The right boundary `high` contracts leftward on every single probe:
   - Initial: `low = 0`, `high = 4`
   - Comparison 1 (`mid = 2`): `result = 2`, `high = 2 - 1 = 1`
   - Comparison 2 (`mid = 0`): `result = 0`, `high = 0 - 1 = -1`
4. The boundaries cross (`low = 0 > high = -1`), terminating the loop.
5. In only $\log_2(5) \approx 2$ comparisons, the algorithm proves that index 0 is the true first occurrence.

---

### Verified Simulation Trace

| Step / Frame | Active Lines | `low` | `high` | `mid` | Probed Value & Comparison | `comps` | `result` | 3D Visual State Changes |
|:---:|:---:|:---:|:---:|:---:|:---|:---:|:---:|:---|
| **0** (Start) | None | `null` | `null` | `null` | None | 0 | -1 | 5 blue bars on stage plate; no pointers; no bounding slab. |
| **1** (Init) | 1, 2, 3, 4 | 0 | 4 | `null` | None | 0 | -1 | Blue slab wraps indices 0–4; blue `low` pointer at index 0; orange `high` pointer at index 4. |
| **2** (Probe 1 pick) | 5, 6 | 0 | 4 | 2 | `(0 + 4) // 2 = 2` | 0 | -1 | Gold `mid` pointer drops above bar 2; bar 2 glows yellow. |
| **3** (Probe 1 step) | 7, 8, 9 | 0 | 1 | 2 | `nums[2] = 7 == 7` (Equal) | 1 | 2 | Green result badge appears at index 2; bar 2 turns green; orange `high` slides left to index 1; slab narrows to `[0, 1]`. |
| **4** (Probe 2 pick) | 5, 6 | 0 | 1 | 0 | `(0 + 1) // 2 = 0` | 1 | 2 | Gold `mid` pointer drops above bar 0; bar 0 glows yellow. |
| **5** (Probe 2 step) | 7, 8, 9 | 0 | -1 | 0 | `nums[0] = 7 == 7` (Equal) | 2 | 0 | Green result badge moves from index 2 to index 0; bar 0 turns green; orange `high` slides left to index -1; boundaries cross; slab vanishes. |
| **6** (Exit) | 5 | 0 | -1 | `null` | `0 <= -1` is False | 2 | 0 | `mid` pointer vanishes; loop condition fails; search range is empty. |
| **7** (Return) | 15 | 0 | -1 | `null` | `return (0, 2)` | 2 | 0 | Line 15 highlights; returns `(0, 2)`; green result badge remains over bar 0. |

---

## 2. Segment Table (ElevenLabs Audio Clips)

The walkthrough is organized into 4 self-contained clips, each aligned with a visual milestone:

> **Note for generation**: Spoken text contains only natural narration words. All cues, directions, and line references are kept strictly in metadata columns.

| Clip ID & Filename | Animation Cue & State | Active Code Lines | Spoken Text (ElevenLabs-Ready) | Approx. Duration |
|:---|:---|:---:|:---|:---:|
| `01-setup-and-key-idea.mp3` | **Initial scene & setup**<br>List `[7, 7, 7, 7, 7]` appears. Blue translucent bounding box wraps indices 0 through 4. Blue `low` pointer at index 0; orange `high` pointer at index 4. No result badge. | Lines 1–4 | Suppose we are searching for the number seven in a sorted list where every single element is the number seven. A standard binary search would stop on its very first check because any midpoint is already a match. But our goal is to find the leftmost seven: the one at the very front of the list. To begin, we set low at index zero and high at index four, wrapping all five numbers in our blue bounding box. We also initialize our result variable to negative one, ready to track our leftmost match. | 38.9s |
| `02-probe-one-mid-two.mp3` | **First probe (Index 2)**<br>Gold `mid` pointer drops onto index 2. Comparison 1 evaluates `nums[2] == 7`. Result updates to 2 (green badge appears). Orange `high` slides left to index 1. Slab shrinks to `[0, 1]`. | Lines 5–6, then Lines 7–9 | We start our search by inspecting the middle of our active range. Halfway between zero and four is index two, which holds a seven. That matches our target on our very first comparison. Rather than stopping here, our leftmost rule tells us to save index two as our candidate result, marked by the green badge, and search left by pulling our high boundary down to index one. In one single comparison, we have safely ruled out indices two, three, and four. | 34.0s |
| `03-probe-two-mid-zero.mp3` | **Second probe (Index 0)**<br>Gold `mid` pointer drops onto index 0. Comparison 2 evaluates `nums[0] == 7`. Result updates to 0 (green badge moves to index 0). Orange `high` slides left to index negative 1. Boundaries cross; slab vanishes. | Lines 5–6, then Lines 7–9 | Our active search window is now narrowed to just indices zero and one. Using integer division, halfway between zero and one is index zero, which holds another seven. We have matched our target again. Because index zero is further left than our previous answer, our saved result updates to index zero, and the green highlight moves to the front of the list. Searching left once more, we pull our high boundary down past index zero to negative one. | 34.3s |
| `04-termination-and-result.mp3` | **Boundary crossover & return**<br>`low` is 0 and `high` is negative 1 (`low > high`). Boundaries crossed. Line 15 highlights. Function returns `(0, 2)`. | Line 5, then Line 15 | Look at what just happened to our boundaries: low is still at index zero, but high has moved down to negative one. The boundaries have crossed. Because low is now greater than high, our search interval is empty, and the loop terminates. The function returns index zero along with two comparisons. In only two probes, leftmost binary search bypassed all later duplicates and conclusively proved that the very first seven is at index zero. | 32.6s |

---

## 3. Continuous Read-Through

Use this unbroken version for recording full-length voiceover:

> Suppose we are searching for the number seven in a sorted list where every single element is the number seven. A standard binary search would stop on its very first check because any midpoint is already a match. But our goal is to find the leftmost seven: the one at the very front of the list.
>
> To begin, we set low at index zero and high at index four, wrapping all five numbers in our blue bounding box. We also initialize our result variable to negative one, ready to track our leftmost match.
>
> We start our search by inspecting the middle of our active range. Halfway between zero and four is index two, which holds a seven. That matches our target on our very first comparison. Rather than stopping here, our leftmost rule tells us to save index two as our candidate result, marked by the green badge, and search left by pulling our high boundary down to index one. In one single comparison, we have safely ruled out indices two, three, and four.
>
> Our active search window is now narrowed to just indices zero and one. Using integer division, halfway between zero and one is index zero, which holds another seven. We have matched our target again. Because index zero is further left than our previous answer, our saved result updates to index zero, and the green highlight moves to the front of the list. Searching left once more, we pull our high boundary down past index zero to negative one.
>
> Look at what just happened to our boundaries: low is still at index zero, but high has moved down to negative one. The boundaries have crossed. Because low is now greater than high, our search interval is empty, and the loop terminates.
>
> The function returns index zero along with two comparisons. In only two probes, leftmost binary search bypassed all later duplicates and conclusively proved that the very first seven is at index zero.

---

## 4. Voice Configuration & Synchronization Map

### Recommended ElevenLabs Voice & Settings
- **Voice**: `Lauren - Friendly, Comforting and Soft` (Voice ID: `DODLEQrClDo8wCz460ld`)
- **Model**: `Eleven Multilingual v2` (or `Eleven Turbo v2.5`)
- **Stability**: `50%`
- **Clarity / Similarity**: `75%`
- **Style Exaggeration**: `0%`
- **Speaker Boost**: `On`
- **Speed**: `1.0 (100%)`

### Milestone Synchronization Map for Step 3

| Milestone | Clip ID | Frames Covered | `startIdx` | `subIdx` | Split Timing Cue | Split Time |
|:---:|:---|:---:|:---:|:---:|:---|:---:|
| 1 | `01-setup-and-key-idea.mp3` | Frames 0 & 1 | `0` | `1` | Transition at *"To begin, we set low at index zero..."* | `19.5s` |
| 2 | `02-probe-one-mid-two.mp3` | Frames 2 & 3 | `2` | `3` | Transition at *"Rather than stopping here, our leftmost rule..."* | `13.5s` |
| 3 | `03-probe-two-mid-zero.mp3` | Frames 4 & 5 | `4` | `5` | Transition at *"We have matched our target again..."* | `14.0s` |
| 4 | `04-termination-and-result.mp3` | Frames 6 & 7 | `6` | `7` | Transition at *"The function returns index zero..."* | `16.5s` |

---

## 5. Pronunciation and Text-to-Speech Notes

1. **Number words instead of digits**:
   - The script writes `"zero"`, `"one"`, `"two"`, `"three"`, `"four"`, `"seven"` instead of digits to avoid TTS number glitches.
   - For negative integers, `"negative one"` is explicitly written instead of `"-1"`.
2. **Avoiding syntax symbols**:
   - Instead of `(0 + 4) // 2`: `"Halfway between zero and four is index two"`.
   - Instead of `nums[2] == target`: `"That matches our target on our very first comparison"`.
   - Instead of `high = mid - 1`: `"pulling our high boundary down to index one"`.
   - Instead of `low <= high`: `"low is now greater than high"`.
3. **Tone and Delivery**:
   - Friendly and reassuring, guiding the learner through why finding the front of an all-duplicate array is both fast and elegant.

---

## 6. Accuracy Checklist and Verification Summary

- [x] **Source of truth verified**: Checked `simulate(cfg)` for `PRESETS[3]` in `01-leftmost-binary-search/leftmost_binary_search_animation.html`.
- [x] **Preset configuration verified**: Preset 3 defines `name: 'All equal (7 x 5)'`, `nums: [7, 7, 7, 7, 7]`, and `target: 7`.
- [x] **Midpoint probe sequence**: Verified exactly as `mid = 2` $\rightarrow$ `mid = 0` (2 probes).
- [x] **Comparison count**: Verified as strictly `comps = 2` (not 3).
- [x] **Result sequence**:
  - Initial: `-1`
  - Probe 1 (`mid = 2`): matches, updates to `result = 2`
  - Probe 2 (`mid = 0`): matches, updates to `result = 0`
  - Return: `(0, 2)`
- [x] **Boundary updates**:
  - Init: `low = 0`, `high = 4`
  - Probe 1: `result = 2`, `high = 1`
  - Probe 2: `result = 0`, `high = -1`
  - Exit: `low = 0 > high = -1` (crossover).
- [x] **Visual state synchronization**:
  - Green result badge appears at index 2 after Probe 1.
  - Green result badge slides to index 0 after Probe 2.
  - Slab narrows to `[0, 1]` after Probe 1, and disappears after Probe 2.
- [x] **ElevenLabs-ready clean narration**: Written-out numerals, zero code symbols, natural spoken English.
