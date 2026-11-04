# Leftmost Binary Search: "Ten items, four 4s" Voice Walkthrough Script

An educational audio walkthrough for the 3D interactive visualization of leftmost binary search in [`01-leftmost-binary-search/leftmost_binary_search_animation.html`](../../01-leftmost-binary-search/leftmost_binary_search_animation.html).

This script follows the built-in **"Ten items, four 4s"** preset:
- Array: `nums = [1, 2, 2, 4, 4, 4, 4, 6, 9, 11]` (length `n = 10`)
- Target: `target = 4`
- Verified Result: `(3, 4)` — Leftmost match found at **index 3** in **4 comparisons**.
- Narrator Voice: **Lauren** (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`).

All narration clips are written for curious beginners, demonstrating how leftmost binary search navigates a realistic 10-element sorted array with a cluster of identical duplicates, updating candidate answers and contracting boundaries to isolate the true leftmost match in logarithmic time.

---

## 1. Verified Outline and Ground Truth

### Input and Array Layout
- **Input array**: `nums = [1, 2, 2, 4, 4, 4, 4, 6, 9, 11]` (length `n = 10`)
- **Target**: `target = 4`
- **Target occurrences**: 4 items, located at indices 3, 4, 5, and 6.
- **Goal**: Find the first occurrence (index 3) while demonstrating both branch contractions (`nums[mid] == target` searching left, and `nums[mid] < target` searching right).

| Index | Value | Role in Walkthrough |
|:-----:|:-----:|:-------------------|
| 0 | 1 | Discarded after comparison 2 (`2 < 4`); never probed. |
| 1 | 2 | Probed on comparison 2; strictly less than target (`2 < 4`); advances `low` to index 2. |
| 2 | 2 | Probed on comparison 3; strictly less than target (`2 < 4`); advances `low` to index 3. |
| 3 | 4 | Probed on comparison 4; matches target; updates verified leftmost result (`result = 3`). |
| 4 | 4 | Probed on comparison 1; matches target; initial candidate result (`result = 4`). |
| 5 | 4 | Discarded after comparison 1 (`high` moves to 3); duplicate bypassed. |
| 6 | 4 | Discarded after comparison 1 (`high` moves to 3); duplicate bypassed. |
| 7 | 6 | Discarded after comparison 1 (`high` moves to 3); never probed. |
| 8 | 9 | Discarded after comparison 1 (`high` moves to 3); never probed. |
| 9 | 11 | Discarded after comparison 1 (`high` moves to 3); never probed. |

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

### The Invariant in Action
1. **Probe 1 (`mid = 4`)**: Matches target `4`. Regular binary search would halt here and return index 4. Leftmost binary search saves candidate `result = 4` and sets `high = 3`, discarding 60% of the list immediately.
2. **Probe 2 (`mid = 1`)**: Probes value `2 < 4`. Discards the left half by setting `low = 2`.
3. **Probe 3 (`mid = 2`)**: Probes value `2 < 4`. Sets `low = 3`. Both pointers now focus on index 3.
4. **Probe 4 (`mid = 3`)**: Probes value `4 == 4`. Matches again! Result updates from index 4 to index 3. `high` moves to index 2.
5. **Exit & Return**: Boundaries cross (`low = 3 > high = 2`), returning `(3, 4)` in $\lceil\log_2(10)\rceil = 4$ comparisons.

---

### Verified Simulation Trace

| Step / Frame | Active Lines | `low` | `high` | `mid` | Probed Value & Comparison | `comps` | `result` | 3D Visual State Changes |
|:---:|:---:|:---:|:---:|:---:|:---|:---:|:---:|:---|
| **0** (Start) | None | `null` | `null` | `null` | None | 0 | -1 | 10 blue bars on stage plate; no pointers; no bounding slab. |
| **1** (Init) | 1, 2, 3, 4 | 0 | 9 | `null` | None | 0 | -1 | Blue slab wraps indices 0–9; blue `low` pointer at 0; orange `high` pointer at 9. |
| **2** (Probe 1 pick) | 5, 6 | 0 | 9 | 4 | `(0 + 9) // 2 = 4` | 0 | -1 | Gold `mid` pointer drops above bar 4; bar 4 glows yellow. |
| **3** (Probe 1 step) | 7, 8, 9 | 0 | 3 | 4 | `nums[4] = 4 == 4` (Equal) | 1 | 4 | Green result badge appears at index 4; bar 4 turns green; orange `high` slides left to index 3; slab shrinks to `[0, 3]`. |
| **4** (Probe 2 pick) | 5, 6 | 0 | 3 | 1 | `(0 + 3) // 2 = 1` | 1 | 4 | Gold `mid` pointer drops above bar 1; bar 1 glows yellow. |
| **5** (Probe 2 step) | 7, 8, 11, 12 | 2 | 3 | 1 | `nums[1] = 2 < 4` (Too small) | 2 | 4 | Blue `low` slides right to index 2; bars 0 and 1 dim; slab narrows to `[2, 3]`; result remains 4 at index 4. |
| **6** (Probe 3 pick) | 5, 6 | 2 | 3 | 2 | `(2 + 3) // 2 = 2` | 2 | 4 | Gold `mid` pointer drops above bar 2; bar 2 glows yellow. |
| **7** (Probe 3 step) | 7, 8, 11, 12 | 3 | 3 | 2 | `nums[2] = 2 < 4` (Too small) | 3 | 4 | Blue `low` slides right to index 3; bar 2 dims; slab narrows to single bar 3 (`[3, 3]`). |
| **8** (Probe 4 pick) | 5, 6 | 3 | 3 | 3 | `(3 + 3) // 2 = 3` | 3 | 4 | Gold `mid` pointer drops above bar 3; bar 3 glows yellow. |
| **9** (Probe 4 step) | 7, 8, 9 | 3 | 2 | 3 | `nums[3] = 4 == 4` (Equal) | 4 | 3 | Green result badge moves from index 4 to index 3; bar 3 turns green; orange `high` slides left to index 2; boundaries cross; slab vanishes. |
| **10** (Exit) | 5 | 3 | 2 | `null` | `3 <= 2` is False | 4 | 3 | `mid` pointer vanishes; loop condition fails; search range is empty. |
| **11** (Return) | 15 | 3 | 2 | `null` | `return (3, 4)` | 4 | 3 | Line 15 highlights; returns `(3, 4)`; green badge remains over leftmost match at index 3. |

---

## 2. Segment Table (ElevenLabs Audio Clips)

The walkthrough is organized into 6 self-contained clips, each aligned with a visual milestone:

> **Note for generation**: Spoken text contains only natural narration words. All cues, directions, and line references are kept strictly in metadata columns.

| Clip ID & Filename | Animation Cue & State | Active Code Lines | Spoken Text (ElevenLabs-Ready) | Approx. Duration |
|:---|:---|:---:|:---|:---:|
| `01-setup-and-key-idea.mp3` | **Initial scene & setup**<br>List `[1, 2, 2, 4, 4, 4, 4, 6, 9, 11]` appears with blue bounding slab wrapping indices 0 to 9. Low at 0, high at 9. | Lines 1–4 | Here we have a ten element sorted list containing four duplicate fours clustered together in the middle. Our goal is to find the very first four: the leftmost one at index three. To search efficiently, we set our boundaries: low at index zero and high at index nine, wrapping all ten items in our blue bounding box. We also initialize our result variable to negative one, ready to track our leftmost match. | 32.5s |
| `02-probe-one-mid-four.mp3` | **Probe 1 (Index 4)**<br>Mid drops on index 4. `nums[4] == 4`. Candidate result 4 saved in green. High slides left to index 3. Slab narrows to `[0, 3]`. | Lines 5–6, then 7–9 | We start our search by checking the middle of our active range. Halfway between zero and nine is index four, which holds a four. That matches our target on our very first comparison. A standard binary search would stop here, but earlier duplicate fours might still exist to our left. So we save index four as our candidate result in green, and pull our high boundary down to index three. In one single comparison, we have safely eliminated sixty percent of the list. | 33.0s |
| `03-probe-two-mid-one.mp3` | **Probe 2 (Index 1)**<br>Mid drops on index 1. `nums[1] = 2 < 4`. Low slides right to index 2. Bars 0 and 1 dim. Slab narrows to `[2, 3]`. | Lines 5–6, then 7, 8, 11, 12 | Our active search window is now narrowed to indices zero through three. Halfway between zero and three is index one, which holds the number two. Two is strictly smaller than our target of four. Because the list is sorted in ascending order, no number at or before index one can possibly equal four. So we advance our low boundary past index one up to index two, while keeping our saved answer of four safely in memory. | 35.3s |
| `04-probe-three-mid-two.mp3` | **Probe 3 (Index 2)**<br>Mid drops on index 2. `nums[2] = 2 < 4`. Low slides right to index 3. Slab contracts to single index 3. | Lines 5–6, then 7, 8, 11, 12 | Now our search window contains only two items: index two and index three. Halfway between two and three is index two, which holds another two. Once again, two is smaller than four. Following our rule, we discard index two and advance our low boundary up to index three. Now both boundaries, low and high, rest at index three, focusing on the single remaining item. | 27.4s |
| `05-probe-four-mid-three.mp3` | **Probe 4 (Index 3)**<br>Mid drops on index 3. `nums[3] = 4 == 4`. Result badge moves to index 3. High pulls down to index 2. Boundaries cross. | Lines 5–6, then 7–9 | With both low and high at index three, our next midpoint is index three. When we inspect it, we find another four. This matches our target again. Because index three is further left than our previous candidate at index four, our saved result updates to index three, and the green highlight moves left. Searching left once more, we pull our high boundary down to index two. | 28.9s |
| `06-termination-and-result.mp3` | **Boundary crossover & return**<br>`low` is 3, `high` is 2 (`low > high`). Slab vanishes. Function returns `(3, 4)`. | Line 5, then 15 | Look at what just happened to our boundaries: low is at index three, but high has moved down to index two. The boundaries have crossed. Because low is now greater than high, our search interval is empty, and the loop terminates. The function returns index three along with four comparisons. Out of ten items and four duplicate matches, we conclusively proved that the true leftmost four is at index three in only four checks. | 31.7s |

---

## 3. Continuous Read-Through

Use this unbroken version for recording full-length voiceover:

> Here we have a ten element sorted list containing four duplicate fours clustered together in the middle. Our goal is to find the very first four: the leftmost one at index three.
>
> To search efficiently, we set our boundaries: low at index zero and high at index nine, wrapping all ten items in our blue bounding box. We also initialize our result variable to negative one, ready to track our leftmost match.
>
> We start our search by checking the middle of our active range. Halfway between zero and nine is index four, which holds a four. That matches our target on our very first comparison. A standard binary search would stop here, but earlier duplicate fours might still exist to our left. So we save index four as our candidate result in green, and pull our high boundary down to index three. In one single comparison, we have safely eliminated sixty percent of the list.
>
> Our active search window is now narrowed to indices zero through three. Halfway between zero and three is index one, which holds the number two. Two is strictly smaller than our target of four. Because the list is sorted in ascending order, no number at or before index one can possibly equal four. So we advance our low boundary past index one up to index two, while keeping our saved answer of four safely in memory.
>
> Now our search window contains only two items: index two and index three. Halfway between two and three is index two, which holds another two. Once again, two is smaller than four. Following our rule, we discard index two and advance our low boundary up to index three. Now both boundaries, low and high, rest at index three, focusing on the single remaining item.
>
> With both low and high at index three, our next midpoint is index three. When we inspect it, we find another four. This matches our target again. Because index three is further left than our previous candidate at index four, our saved result updates to index three, and the green highlight moves left. Searching left once more, we pull our high boundary down to index two.
>
> Look at what just happened to our boundaries: low is at index three, but high has moved down to index two. The boundaries have crossed. Because low is now greater than high, our search interval is empty, and the loop terminates.
>
> The function returns index three along with four comparisons. Out of ten items and four duplicate matches, we conclusively proved that the true leftmost four is at index three in only four checks.

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
| 1 | `01-setup-and-key-idea.mp3` | Frames 0 & 1 | `0` | `1` | Transition at *"To search efficiently, we set our boundaries..."* | `14.0s` |
| 2 | `02-probe-one-mid-four.mp3` | Frames 2 & 3 | `2` | `3` | Transition at *"A standard binary search would stop here..."* | `13.0s` |
| 3 | `03-probe-two-mid-one.mp3` | Frames 4 & 5 | `4` | `5` | Transition at *"Two is strictly smaller than our target of four..."* | `16.5s` |
| 4 | `04-probe-three-mid-two.mp3` | Frames 6 & 7 | `6` | `7` | Transition at *"Once again, two is smaller than four..."* | `13.5s` |
| 5 | `05-probe-four-mid-three.mp3` | Frames 8 & 9 | `8` | `9` | Transition at *"Because index three is further left than our previous candidate..."* | `11.5s` |
| 6 | `06-termination-and-result.mp3` | Frames 10 & 11 | `10` | `11` | Transition at *"The function returns index three along with four comparisons..."* | `17.0s` |

---

## 5. Pronunciation and Text-to-Speech Notes

1. **Number words instead of digits**:
   - The script writes `"zero"`, `"one"`, `"two"`, `"three"`, `"four"`, `"nine"`, `"ten"`, `"sixty percent"` rather than numeric digits.
   - For negative integers, `"negative one"` is explicitly written instead of `"-1"`.
2. **Avoiding syntax symbols**:
   - Instead of `(0 + 9) // 2`: `"Halfway between zero and nine is index four"`.
   - Instead of `nums[1] < target`: `"Two is strictly smaller than our target of four"`.
   - Instead of `high = mid - 1`: `"pull our high boundary down to index three"`.
   - Instead of `low <= high`: `"low is now greater than high"`.
3. **Tone and Delivery**:
   - Friendly and reassuring, guiding the learner through why finding the front of a cluster of duplicates is both fast and elegant.

---

## 6. Accuracy Checklist and Verification Summary

- [x] **Source of truth verified**: Checked `simulate(cfg)` for `PRESETS[4]` in `01-leftmost-binary-search/leftmost_binary_search_animation.html`.
- [x] **Preset configuration verified**: Preset 4 defines `name: 'Ten items, four 4s'`, `nums: [1, 2, 2, 4, 4, 4, 4, 6, 9, 11]`, and `target: 4`.
- [x] **Midpoint probe sequence**: Verified exactly as `mid = 4` $\rightarrow$ `mid = 1` $\rightarrow$ `mid = 2` $\rightarrow$ `mid = 3` (4 probes).
- [x] **Comparison count**: Verified as strictly `comps = 4`.
- [x] **Result sequence**:
  - Initial: `-1`
  - Probe 1 (`mid = 4`, `4 == 4`): updates to `result = 4`
  - Probe 2 (`mid = 1`, `2 < 4`): remains `result = 4`
  - Probe 3 (`mid = 2`, `2 < 4`): remains `result = 4`
  - Probe 4 (`mid = 3`, `4 == 4`): updates to `result = 3`
  - Return: `(3, 4)`
- [x] **Boundary updates**:
  - Init: `low = 0`, `high = 9`
  - Probe 1: `high = 3`
  - Probe 2: `low = 2`
  - Probe 3: `low = 3`
  - Probe 4: `high = 2`
  - Exit: `low = 3 > high = 2` (crossover).
- [x] **Visual state synchronization**:
  - Green result badge appears at index 4 after Probe 1.
  - Green result badge moves to index 3 after Probe 4.
  - Slab narrows progressively: `[0, 9]` $\rightarrow$ `[0, 3]` $\rightarrow$ `[2, 3]` $\rightarrow$ `[3, 3]` $\rightarrow$ disappears.
- [x] **ElevenLabs-ready clean narration**: Written-out numerals, zero code symbols, natural spoken English.
