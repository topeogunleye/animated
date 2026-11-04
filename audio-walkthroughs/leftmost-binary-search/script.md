# Leftmost Binary Search: Voice Walkthrough Script

An educational audio walkthrough for the 3D interactive visualization of leftmost binary search in [`01-leftmost-binary-search/leftmost_binary_search_animation.html`](../../01-leftmost-binary-search/leftmost_binary_search_animation.html).

This script follows the built-in **"Duplicate 3s"** preset:
- Array: `nums = [1, 3, 3, 3, 5, 8]`
- Target: `target = 3`
- Verified Result: `(1, 3)` — Leftmost match at **index 1**, found in **3 comparisons**.

All narration clips are written for curious beginners, linking the highlighted Python code to the visual changes in the 3D scene without reciting raw syntax. The spoken text is formatted specifically for ElevenLabs text-to-speech generation.

---

## 1. Verified Outline and Ground Truth

### Input and Array Layout
- **Input array**: `nums = [1, 3, 3, 3, 5, 8]` (length `n = 6`)
- **Target**: `target = 3`
- **Target occurrences**: Indices 1, 2, and 3 (all hold the value `3`).
- **Goal**: Find the first occurrence (index 1), not just any occurrence.

| Index | Value | Role in Walkthrough |
|:-----:|:-----:|:-------------------|
| 0 | 1 | Probed on comparison 2; strictly less than target (`1 < 3`). |
| 1 | 3 | **True leftmost match**; probed on comparison 3; final result. |
| 2 | 3 | Probed on comparison 1; matches target; intermediate result. |
| 3 | 3 | Duplicate; never probed because right half is pruned after comparison 1. |
| 4 | 5 | Pruned after comparison 1. |
| 5 | 8 | Pruned after comparison 1. |

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

### The Key Invariant
In standard binary search, finding `nums[mid] == target` triggers an immediate `return mid`. 
In **leftmost** binary search:
1. When a match is found (`nums[mid] == target`), the algorithm records `result = mid` as the best candidate so far.
2. It then deliberately searches the left partition by setting `high = mid - 1`.
3. The loop continues until the search interval is exhausted (`low > high`).
4. This guarantees that if any earlier duplicates exist, the algorithm will inspect them; if none exist, the saved candidate remains intact.

---

### Verified Simulation Trace

| Step / Frame | Active Lines | `low` | `high` | `mid` | Probed Value & Comparison | `comps` | `result` | 3D Visual State Changes |
|:---:|:---:|:---:|:---:|:---:|:---|:---:|:---:|:---|
| **0** (Start) | None | `null` | `null` | `null` | None | 0 | -1 | 6 blue bars on stage plate; no pointers; no bounding slab. |
| **1** (Init) | 1, 2, 3, 4 | 0 | 5 | `null` | None | 0 | -1 | Blue slab covers indices 0–5; blue `low` pointer at 0; orange `high` pointer at 5. |
| **2** (Probe 1 pick) | 5, 6 | 0 | 5 | 2 | `(0 + 5) // 2 = 2` | 0 | -1 | Gold `mid` pointer drops above bar 2; bar 2 glows yellow. |
| **3** (Probe 1 step) | 7, 8, 9, 10 | 0 | 1 | 2 | `nums[2] = 3 == 3` (Equal) | 1 | 2 | Bar 2 turns green with floating "result" badge; `high` moves to 1; slab narrows to `[0, 1]`; bars 3–5 fade to 25% opacity. |
| **4** (Probe 2 pick) | 5, 6 | 0 | 1 | 0 | `(0 + 1) // 2 = 0` | 1 | 2 | Gold `mid` pointer drops above bar 0; bar 0 glows yellow. |
| **5** (Probe 2 step) | 7, 8, 11, 12 | 1 | 1 | 0 | `nums[0] = 1 < 3` (Too small) | 2 | 2 | Blue `low` moves to 1; bar 0 dims; `low` and `high` stand side by side at index 1; slab narrows to single bar at 1. |
| **6** (Probe 3 pick) | 5, 6 | 1 | 1 | 1 | `(1 + 1) // 2 = 1` | 2 | 2 | Gold `mid` pointer drops above bar 1; bar 1 glows yellow. |
| **7** (Probe 3 step) | 7, 8, 9, 10 | 1 | 0 | 1 | `nums[1] = 3 == 3` (Equal) | 3 | 1 | Bar 1 turns green with floating "result" badge; bar 2 reverts to dimmed blue; `high` moves to 0; slab disappears (`low > high`). |
| **8** (Exit) | 5 | 1 | 0 | `null` | `1 <= 0` is False | 3 | 1 | `mid` pointer vanishes; loop condition fails; range is empty. |
| **9** (Return) | 15 | 1 | 0 | `null` | `return (1, 3)` | 3 | 1 | Function returns tuple `(1, 3)`; bar 1 stays highlighted in green. |

---

## 2. Segment Table (ElevenLabs Audio Clips)

The walkthrough is split into 5 self-contained clips. Each clip aligns with a major visual milestone in the animation.

> **Note for generation**: The spoken text contains only the narration words to be read by the voice actor or pasted into ElevenLabs. All directions, cues, and line references are kept strictly in the metadata columns.

| Clip ID & Filename | Animation Cue & State | Active Code Lines | Spoken Text (ElevenLabs-Ready) | Approx. Duration |
|:---|:---|:---:|:---|:---:|
| `01-setup-and-key-idea.mp3` | **Initial scene & setup**<br>List `[1, 3, 3, 3, 5, 8]` appears. Blue translucent bounding box wraps indices 0 through 5. Blue `low` pointer points to index 0; orange `high` pointer points to index 5. Result badge is absent. | Lines 1–4 | Suppose we want to find the number three in a sorted list containing one, three, three, three, five, and eight. Standard binary search stops the moment it finds any three. But here, the number three appears three times, and our goal is to find its very first occurrence: the leftmost one. To search efficiently, we set two boundaries: low at index zero, and high at index five. We also prepare a result variable set to negative one, meaning no match has been found yet. The blue bounding box marks our active search window, covering all six items. | ~24s |
| `02-probe-one-mid-two.mp3` | **First probe (Index 2)**<br>Gold `mid` pointer drops onto index 2. Comparison 1 confirms `nums[2] == 3`. Bar 2 turns emerald green with the floating "result" badge. Orange `high` pointer slides left to index 1. Slab shrinks to `[0, 1]`; bars 3–5 fade. | Lines 5–6, then Lines 7–10 | We begin our search by checking the middle of the range. Halfway between zero and five is index two, which holds a three. That matches our target on our very first comparison. In regular binary search, we would stop right now. But because we want the leftmost three, earlier duplicates might still be hiding to our left. So we save index two as our current best answer, highlighting it in green, and pull our high boundary left to index one. In one quick step, we have eliminated the entire right half of the list. | ~25s |
| `03-probe-two-mid-zero.mp3` | **Second probe (Index 0)**<br>Gold `mid` pointer drops onto index 0 (value 1). Comparison 2 evaluates `nums[0] < 3`. Blue `low` pointer moves right to index 1. Bar 0 dims. Both `low` and `high` stand side by side at index 1. | Lines 5–6, then Lines 7, 8, 11, 12 | Our active search window is now down to just two items: index zero and index one. Halfway between them is index zero, which holds the number one. One is smaller than three. Because our list is sorted, nothing at index zero or before it could possibly be our target. So we advance our low boundary past index zero up to index one. Now both boundaries narrow in on the single remaining item. | ~20s |
| `04-probe-three-mid-one.mp3` | **Third probe (Index 1)**<br>Gold `mid` pointer drops onto index 1 (value 3). Comparison 3 confirms `nums[1] == 3`. Bar 1 turns emerald green, taking over the "result" badge; bar 2 reverts to dimmed blue. Orange `high` pointer slides left to index 0. Slab vanishes. | Lines 5–6, then Lines 7–10 | With low and high both resting at index one, our next midpoint is index one. When we inspect it, we find another three. This matches our target again. Because index one is further left than our previous answer, we update our saved result, and the green highlight moves to index one. Following our rule, we search left once more by moving the high pointer down to index zero. | ~18s |
| `05-termination-and-result.mp3` | **Loop exit & return**<br>`low` is 1 and `high` is 0 (`low > high`). `mid` pointer disappears. Line 15 highlights. The function returns `(1, 3)`. Bar 1 remains green with the "result" badge. | Line 5, then Line 15 | Look at what just happened to our boundaries: low is at one, but high has moved down to zero. The boundaries have crossed. Because low is now greater than high, our search range is empty, and the loop finishes. The function returns index one along with three comparisons. We successfully found the true leftmost three in only three checks, leaving the rest of the list completely untouched. | ~19s |

---

## 3. Continuous Read-Through

Use this continuous script when recording an unbroken voiceover or generating full-length narration in ElevenLabs:

> Suppose we want to find the number three in a sorted list containing one, three, three, three, five, and eight. Standard binary search stops the moment it finds any three. But here, the number three appears three times, and our goal is to find its very first occurrence: the leftmost one.
>
> To search efficiently, we set two boundaries: low at index zero, and high at index five. We also prepare a result variable set to negative one, meaning no match has been found yet. The blue bounding box marks our active search window, covering all six items.
>
> We begin our search by checking the middle of the range. Halfway between zero and five is index two, which holds a three. That matches our target on our very first comparison.
>
> In regular binary search, we would stop right now. But because we want the leftmost three, earlier duplicates might still be hiding to our left. So we save index two as our current best answer, highlighting it in green, and pull our high boundary left to index one. In one quick step, we have eliminated the entire right half of the list.
>
> Our active search window is now down to just two items: index zero and index one. Halfway between them is index zero, which holds the number one.
>
> One is smaller than three. Because our list is sorted, nothing at index zero or before it could possibly be our target. So we advance our low boundary past index zero up to index one. Now both boundaries narrow in on the single remaining item.
>
> With low and high both resting at index one, our next midpoint is index one. When we inspect it, we find another three.
>
> This matches our target again. Because index one is further left than our previous answer, we update our saved result, and the green highlight moves to index one. Following our rule, we search left once more by moving the high pointer down to index zero.
>
> Look at what just happened to our boundaries: low is at one, but high has moved down to zero. The boundaries have crossed. Because low is now greater than high, our search range is empty, and the loop finishes.
>
> The function returns index one along with three comparisons. We successfully found the true leftmost three in only three checks, leaving the rest of the list completely untouched.

---

## 4. Pronunciation and Text-to-Speech Notes

To ensure clean pronunciation across ElevenLabs voices and models (such as Eleven Multilingual v2 or Eleven English v1), adhere to the following conventions:

1. **Number words instead of numerals**:
   - The script intentionally uses written words ("zero", "one", "two", "three", "five", "eight") rather than digits (`0, 1, 2, 3, 5, 8`) to prevent text-to-speech engines from reading them as ordinals or telephone sequences.
   - For negative initialization, write `"negative one"` rather than `"-1"`, which voice engines frequently mispronounce as "minus one" or "dash one".
2. **Avoiding code syntax symbols**:
   - Do not feed symbols such as `//`, `<=`, `==`, or array brackets `nums[mid]` to the voice model. The narration translates these into conversational phrasing:
     - Instead of `mid = (low + high) // 2`: `"Halfway between zero and five is index two"`.
     - Instead of `low <= high`: `"low is greater than high"`.
     - Instead of `nums[2]`: `"index two, which holds a three"`.
3. **Variable names**:
   - `"low"`, `"high"`, `"mid"`, and `"result"` are standard English words and are pronounced reliably.
   - Avoid saying `"nums"` aloud; use `"list"` or `"items"`.
4. **Pacing and Pauses**:
   - Commas and periods create natural cadence pauses.
   - For emphasis on boundary shifts, the script uses short, direct sentences rather than compound clauses.
5. **Recommended ElevenLabs Settings**:
   - **Voice**: A warm, calm, educational voice (e.g., *Lauren - Friendly, Comforting and Soft*, *Adam*, or *Rachel*).
   - **Model**: *Eleven Multilingual v2* or *Eleven Turbo v2.5*.
   - **Stability**: `55%` – provides consistent pronunciation without sounding flat.
   - **Similarity / Clarity**: `80%` – maintains distinct articulation on technical terms.
   - **Style Exaggeration**: `0%` to `10%` – preserves natural conversational pacing.

---

## 5. Accuracy Checklist and Verification Summary

This checklist verifies all factual points against `01-leftmost-binary-search/leftmost_binary_search_animation.html`:

- [x] **Source of truth verified**: Examined simulation code lines 143–184 and Three.js visual setup lines 280–436 in `01-leftmost-binary-search/leftmost_binary_search_animation.html`.
- [x] **Preset configuration verified**: Preset 0 defines `name: 'Duplicate 3s'`, `nums: [1, 3, 3, 3, 5, 8]`, and `target: 3`.
- [x] **Midpoint probe sequence**: Verified exactly as `mid = 2` $\rightarrow$ `mid = 0` $\rightarrow$ `mid = 1`.
- [x] **Comparison count**: Verified exactly as `comps = 3` (one comparison per probe).
- [x] **Result sequence**:
  - Initial: `-1`
  - Probe 1: updates to `2` (bar 2 highlighted green)
  - Probe 2: remains `2` (bar 2 stays green, bar 0 dims)
  - Probe 3: updates to `1` (bar 1 highlighted green, bar 2 reverts to dimmed blue)
  - Return: `(1, 3)`
- [x] **Boundary updates**:
  - Init: `low = 0`, `high = 5`
  - Probe 1: `high = 2 - 1 = 1`
  - Probe 2: `low = 0 + 1 = 1`
  - Probe 3: `high = 1 - 1 = 0`
  - Exit: `low = 1 > high = 0`
- [x] **Code line mapping**:
  - Init: Lines 1–4
  - Probe 1: Lines 5–6, then Lines 7–10
  - Probe 2: Lines 5–6, then Lines 7, 8, 11, 12
  - Probe 3: Lines 5–6, then Lines 7–10
  - Loop termination: Line 5
  - Return: Line 15
- [x] **Visual synchronization**:
  - Pointer colors confirmed: `low` is blue (`#2563a8`), `high` is orange (`#c46a14`), `mid` is gold (`#e8a900`).
  - Result color confirmed: emerald green (`#2e9e5b`) with floating text sprite `"result"`.
  - When `low === high === 1` in probe 2 & 3, the cones are horizontally offset (`-0.23` and `+0.23`) to render side by side.
  - Inactive bars dim to 25% opacity (`0.25`).
- [x] **No extraneous text in narration**: Spoken text is clean, free of stage directions, filenames, or Markdown headings.
