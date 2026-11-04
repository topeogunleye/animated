# Bubble Sort: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Solution 06: Bubble Sort in 3D** (`06-bubble-sort/Bubble sort in 3D, step by step.html`).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/bubble-sort/`

---

## 2. Presets Overview

| Preset | Input | Inversions / Swaps | Frames | Audio Clips | Status |
|---|---|:---:|:---:|:---:|:---:|
| **Preset 0: Example [5, 1, 4, 2, 8]** | `[5, 1, 4, 2, 8], ascending` | 4 swaps / 9 comps | 22 | 3 clips (`01`–`03`) | Completed |
| **Preset 1: Already sorted (best case)** | `[1, 2, 3, 4, 5], ascending` | 0 swaps / 4 comps | 9 | 2 clips (`01`–`02`) | Completed |
| **Preset 2: Reverse sorted (worst case)** | `[5, 4, 3, 2, 1], ascending` | 10 swaps / 10 comps | 32 | 4 clips (`01`–`04`) | Planned |
| **Preset 3: Descending order (bonus)** | `[5, 1, 4, 2, 8], descending` | 6 swaps / 10 comps | 28 | 3 clips (`01`–`03`) | Planned |
| **Preset 4: Empty list** | `[], ascending` | 0 swaps / 0 comps | 4 | 1 clip (`01`) | Planned |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
```python
def bubble_sort(items, descending=False):
    comparisons = 0
    swaps = 0
    n = len(items)
    for end in range(n - 1, 0, -1):
        swapped = False
        for i in range(end):
            comparisons += 1
            if descending:
                out_of_order = items[i] < items[i + 1]
            else:
                out_of_order = items[i] > items[i + 1]
            if out_of_order:
                items[i], items[i + 1] = items[i + 1], items[i]
                swaps += 1
                swapped = True
        if not swapped:
            break
    return comparisons, swaps
```

### Visual State & Mechanics
1. **3D Vertical Pillars**: Heights proportional to item values, with index tags underneath and value badges floating above.
2. **Comparison Bracket & Slabs**: Glowing pointer bracket highlighting indices `i` and `i + 1` during pairwise comparisons.
3. **Settled Pillar Highlighting**: Settled elements at the end of each pass change color to indicate permanent sorting in place.
4. **Early Exit Detection**: Real-time counter of comparisons, swaps, and pass counts, highlighting the `break` line when no swaps take place.

---

## 4. Preset 0: "Example [5, 1, 4, 2, 8]"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-pass-one` | `01-setup-and-pass-one.mp3` | 0 – 10 | "Welcome to Bubble Sort in 3D. Bubble sort works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. With each complete pass, the largest remaining value bubbles up to its final position at the end. We begin with five items: five, one, four, two, eight. In pass one, we check four adjacent pairs. First, five is greater than one, so we swap them. Next, five is greater than four, triggering our second swap. Then, five is greater than two, swapping again. Finally, five is less than or equal to eight, so no swap is needed. Pass one concludes with three swaps, permanently locking the largest item, eight, in place at index four." |
| `02-pass-two-bubbling-four` | `02-pass-two-bubbling-four.mp3` | 11 – 16 | "Because swaps occurred in the previous pass, the algorithm launches pass two. Notice our optimization: because eight is already sorted, we only need to inspect three pairs. Comparing one and four, they are in order. Comparing four and two, four is greater, so we swap them, marking our fourth total swap. Comparing four and five, they are in order. Pass two concludes having placed the second-largest value, five, at index three." |
| `03-pass-three-and-early-exit` | `03-pass-three-and-early-exit.mp3` | 17 – 21 | "Pass three begins, testing only the remaining two pairs: positions zero through two. First, one and two are compared and found in order. Next, two and four are compared and found in order. Crucially, pass three completed with zero swaps! The swapped flag remains false, allowing the algorithm to execute an early break after nine comparisons rather than running redundant passes. The list is fully sorted in place, returning nine comparisons and four swaps." |

---

## 5. Preset 1: "Already sorted (best case)"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-single-pass` | `01-setup-and-single-pass.mp3` | 0 – 6 | "We now examine the optimal best-case scenario for Bubble Sort: an array that is already sorted in ascending order from one to five. The algorithm initializes comparisons and swaps to zero and starts pass one. It compares one and two: in order. Two and three: in order. Three and four: in order. And four and five: in order. Four comparisons are made, but not a single swap was needed." |
| `02-early-break-and-best-case` | `02-early-break-and-best-case.mp3` | 7 – 8 | "Because the swapped flag remained false throughout the entire pass, the early termination condition triggers immediately. Rather than blindly executing additional quadratic loops, the sort breaks out after just four comparisons. This demonstrates why the swapped flag provides an optimal big-O of n best-case time complexity, returning four comparisons and zero swaps." |
