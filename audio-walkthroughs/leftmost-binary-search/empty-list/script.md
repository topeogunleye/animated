# Leftmost Binary Search: "Empty list" Voice Walkthrough Script

An educational audio walkthrough for the 3D interactive visualization of leftmost binary search in [`01-leftmost-binary-search/leftmost_binary_search_animation.html`](../../01-leftmost-binary-search/leftmost_binary_search_animation.html).

This script follows the built-in **"Empty list"** preset:
- Array: `nums = []` (length `n = 0`)
- Target: `target = 7`
- Verified Result: `(-1, 0)` — Target not found, search terminates safely with **0 comparisons** and returns **`-1`**.
- Narrator Voice: **Lauren** (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`).

All narration clips are written for curious beginners, explaining why testing the empty array edge case matters and demonstrating how the standard binary search loop condition `while low <= high` naturally protects against out-of-bounds indexing without requiring special-case guard clauses.

---

## 1. Verified Outline and Ground Truth

### Input and Array Layout
- **Input array**: `nums = []` (length `n = 0`)
- **Target**: `target = 7`
- **Key Educational Focus**: Edge case safety. Demonstrates why binary search does not require a separate `if len(nums) == 0:` check; the boundary initialization `low = 0`, `high = -1` immediately produces an invalid interval (`low > high`), causing the `while` loop to bypass completely.

| Property | Value | Role in Walkthrough |
|:---|:---:|:---|
| `len(nums)` | `0` | Empty collection; no bars on the stage; an `"empty"` label appears. |
| `target` | `7` | The value sought; cannot exist in an empty list. |
| Initial `low` | `0` | Starting index candidate. |
| Initial `high` | `-1` | Computed as `len(nums) - 1 = 0 - 1 = -1`. |
| Initial Loop Check | `0 <= -1` | Evaluates immediately to `False`; loop body never executes. |
| Total Comparisons | `0` | No elements are ever probed or compared. |
| Final Return Value | `(-1, 0)` | Indicates target was not found, resolved in zero comparisons. |

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

### The Empty List Invariant
1. On line 2, `high` is assigned `len(nums) - 1`. For an empty list with `len(nums) == 0`, `high` becomes `0 - 1 = -1`.
2. On line 3, `comparisons` initializes to `0`.
3. On line 4, `result` initializes to `-1`.
4. On line 5, the condition `low <= high` tests `0 <= -1`, which is strictly `False`.
5. Because the condition is `False` from the outset, the entire `while` block (lines 6–14) is skipped.
6. Execution jumps straight to line 15, returning `(-1, 0)`.
7. This proves that binary search is naturally robust against empty inputs in $O(1)$ time with zero memory or indexing faults.

---

### Verified Simulation Trace

| Step / Frame | Active Lines | `low` | `high` | `mid` | Evaluation | `comps` | `result` | 3D Visual State Changes |
|:---:|:---:|:---:|:---:|:---:|:---|:---:|:---:|:---|
| **0** (Start) | None | `null` | `null` | `null` | None | 0 | -1 | Stage displays grey `"empty"` sprite label; no bars, no pointers, no bounding slab. |
| **1** (Init) | 1, 2, 3, 4 | 0 | -1 | `null` | `high = 0 - 1 = -1` | 0 | -1 | Blue `low` pointer appears at $x = 0.5$; orange `high` pointer appears at $x = -0.5$; boundaries are already crossed (`low > high`); slab remains invisible. |
| **2** (Loop Check) | 5 | 0 | -1 | `null` | `0 <= -1` is False | 0 | -1 | Line 5 highlights; loop condition fails immediately; no midpoint is selected. |
| **3** (Return) | 15 | 0 | -1 | `null` | `return (-1, 0)` | 0 | -1 | Line 15 highlights; returns `(-1, 0)`; no result badge appears. |

---

## 2. Segment Table (ElevenLabs Audio Clips)

The walkthrough is organized into 2 educational clips aligned with visual milestones:

> **Note for generation**: Spoken text contains only natural narration words. All cues, directions, and line references are kept strictly in metadata columns.

| Clip ID & Filename | Animation Cue & State | Active Code Lines | Spoken Text (ElevenLabs-Ready) | Approx. Duration |
|:---|:---|:---:|:---|:---:|
| `01-setup-and-key-idea.mp3` | **Initial scene & setup**<br>Empty stage appears with grey `"empty"` label. No bars or slab. Blue `low` pointer appears at index 0 ($x = 0.5$), and orange `high` pointer appears at index negative 1 ($x = -0.5$). | Lines 1–4 | A great test for any search algorithm is how gracefully it handles an empty list. Here, our list contains zero items, and we are searching for the target number seven. When we initialize our search, low begins at index zero, and high is set to the length of the list minus one, which gives negative one. We also record zero comparisons and set our result variable to negative one. Notice that before we even begin searching, our low boundary is already greater than our high boundary. | 35.2s |
| `02-termination-and-result.mp3` | **Loop condition & immediate return**<br>Line 5 highlights (`while low <= high:`). Condition `0 <= -1` evaluates to `False`. Line 15 highlights. Function returns `(-1, 0)`. | Line 5, then Line 15 | Next, the algorithm checks the loop condition: is low less than or equal to high? Since zero is greater than negative one, this condition evaluates to false right away. The loop never runs, meaning we avoid any midpoint calculations or out of bounds errors. The function proceeds straight to the return statement, giving back negative one along with zero comparisons. In zero steps, binary search safely confirms that the target cannot be found in an empty list. | 36.2s |

---

## 3. Continuous Read-Through

Use this unbroken version for recording full-length voiceover:

> A great test for any search algorithm is how gracefully it handles an empty list. Here, our list contains zero items, and we are searching for the target number seven.
>
> When we initialize our search, low begins at index zero, and high is set to the length of the list minus one, which gives negative one. We also record zero comparisons and set our result variable to negative one. Notice that before we even begin searching, our low boundary is already greater than our high boundary.
>
> Next, the algorithm checks the loop condition: is low less than or equal to high? Since zero is greater than negative one, this condition evaluates to false right away. The loop never runs, meaning we avoid any midpoint calculations or out of bounds errors.
>
> The function proceeds straight to the return statement, giving back negative one along with zero comparisons. In zero steps, binary search safely confirms that the target cannot be found in an empty list.

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
| 1 | `01-setup-and-key-idea.mp3` | Frames 0 & 1 | `0` | `1` | Transition at *"When we initialize our search, low begins at index zero..."* | `12.0s` |
| 2 | `02-termination-and-result.mp3` | Frames 2 & 3 | `2` | `3` | Transition at *"The function proceeds straight to the return statement..."* | `17.5s` |

---

## 5. Pronunciation and Text-to-Speech Notes

1. **Number words instead of digits**:
   - The script writes `"zero"`, `"one"`, `"seven"` rather than `"0"`, `"1"`, `"7"` to avoid erratic TTS pronunciation.
   - For negative integers, `"negative one"` is explicitly written instead of `"-1"`.
2. **Avoiding programming syntax symbols**:
   - Instead of `len(nums) - 1`: `"the length of the list minus one"`.
   - Instead of `low <= high`: `"is low less than or equal to high"`.
   - Instead of `result = -1`: `"set our result variable to negative one"`.
   - Instead of `return (-1, 0)`: `"giving back negative one along with zero comparisons"`.
3. **Pacing and Tone**:
   - Comforting, reassuring delivery that highlights how elegant the zero-comparison exit is.

---

## 6. Accuracy Checklist and Verification Summary

- [x] **Source of truth verified**: Inspected `simulate(cfg)` for `PRESETS[2]` in `01-leftmost-binary-search/leftmost_binary_search_animation.html`.
- [x] **Preset configuration verified**: Preset 2 defines `name: 'Empty list'`, `nums: []`, and `target: 7`.
- [x] **Frame count verified**: Exactly 4 frames (Frames 0 to 3).
- [x] **Loop condition behavior**: Verified that `low <= high` evaluates `0 <= -1`, which is `False` on the initial check.
- [x] **Comparisons made**: Verified as strictly `0`.
- [x] **Result value**: Verified as `(-1, 0)`.
- [x] **3D Visual behavior**:
  - Empty list displays `"empty"` text label on stage plate.
  - No bars or values rendered (`bars.length == 0`).
  - Translucent slab is hidden (`n == 0`).
  - Low and high pointers render at $x = 0.5$ and $x = -0.5$ respectively, visually showing crossed boundaries from the very start.
- [x] **ElevenLabs-ready clean narration**: Natural spoken English with written-out numerals, zero stage directions, and zero code symbols.
