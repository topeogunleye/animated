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
| **Preset 2: Reverse sorted (worst case)** | `[5, 4, 3, 2, 1], ascending` | 10 swaps / 10 comps | 32 | 4 clips (`01`–`04`) | Completed |
| **Preset 3: Descending order (bonus)** | `[5, 1, 4, 2, 8], descending` | 6 swaps / 10 comps | 28 | 3 clips (`01`–`03`) | Completed |
| **Preset 4: Empty list** | `[], ascending` | 0 swaps / 0 comps | 4 | 1 clip (`01`) | Completed |

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

---

## 6. Preset 2: "Reverse sorted (worst case)"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-pass-one` | `01-setup-and-pass-one.mp3` | 0 – 11 | "Here we examine the true worst-case scenario for Bubble Sort: an array completely reversed from five down to one. Because every single pair is inverted, every comparison will force a swap. We initialize our counters and launch pass one with four pair checks. First, five is greater than four, so they swap. Next, five is compared with three and swapped. Then five compares with two and swaps. Finally, five compares with one and swaps. In this single pass, the maximum value five had to bubble all the way across the array to index four, racking up four comparisons and four swaps." |
| `02-pass-two-bubbling-four` | `02-pass-two-bubbling-four.mp3` | 12 – 19 | "Pass two begins, checking the three unsorted pairs up to index three. Four is compared with three and swapped. Four is then compared with two and swapped. Finally, four is compared with one and swapped. Four reaches its proper home at index three, bringing our totals to seven comparisons and seven swaps." |
| `03-pass-three-bubbling-three` | `03-pass-three-bubbling-three.mp3` | 20 – 25 | "Pass three narrows the search window down to just two pairs. Three is compared with two and swapped. Three is then compared with one and swapped. Three is now permanently settled at index two, leaving only two elements left to be verified." |
| `04-pass-four-and-worst-case` | `04-pass-four-and-worst-case.mp3` | 26 – 31 | "Pass four performs the final comparison between two and one. Two is greater than one, triggering our tenth and final swap. Both remaining items are now settled in their proper positions. Because the array was reversed, no early exit could trigger. The sort required exactly n times n minus one divided by two, or ten comparisons, and ten swaps. We return ten comparisons and ten swaps, demonstrating the quadratic big-O of n squared worst case." |

---

## 7. Preset 3: "Descending order (bonus)"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-pass-one` | `01-setup-and-pass-one.mp3` | 0 – 10 | "Now let us explore Bubble Sort configured for descending order. When sorting in descending order, the condition reverses: an inversion occurs when the left element is strictly less than the right element. Instead of bubbling the largest value forward, each pass sinks the smallest remaining item to the end of the array. In pass one, five is greater than one, so no swap is made. But then one is less than four, less than two, and less than eight, triggering three consecutive swaps. The smallest element, one, is now settled at index four." |
| `02-pass-two-and-three` | `02-pass-two-and-three.mp3` | 11 – 21 | "Pass two begins, checking pairs up to index three. Five and four are in order, as are four and two. But two is less than eight, swapping them and locking two in place at index three. Pass three checks two pairs: five and four are in order, but four is less than eight, swapping them to place eight ahead of four. Four is now settled at index two." |
| `03-pass-four-and-completion` | `03-pass-four-and-completion.mp3` | 22 – 27 | "Finally, pass four conducts the last comparison between five and eight. Five is less than eight, prompting our sixth swap. With eight, five, four, two, and one, the entire list is sorted in descending order. Ten comparisons and six swaps were required, completing the descending demonstration." |

---

## 8. Preset 4: "Empty list"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-empty-list-and-base-case` | `01-empty-list-and-base-case.mp3` | 0 – 3 | "Here we examine the edge case of an empty list where n equals zero. The outer loop range from negative one down to zero with step negative one is empty, so zero passes are executed. The function exits immediately and returns zero comparisons and zero swaps, confirming graceful handling of empty inputs in constant time." |

