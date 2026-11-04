# Recursive Subsets in 3D: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Solution 09: Recursive Subsets in 3D** ([`09-subsets/subsets_3d.html`](../../09-subsets/subsets_3d.html)).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/subsets/`

---

## 2. Presets Overview

| Preset | Items | Depth / Leaves | Frames | Audio Clips | Status |
|---|---|:---:|:---:|:---:|:---:|
| **Preset 0: [1, 2, 3]** | `[1, 2, 3]` | 3 / 8 subsets | 45 | 3 clips (`01`–`03`) | Completed |
| **Preset 1: [1, 2]** | `[1, 2]` | 2 / 4 subsets | 21 | 2 clips (`01`–`02`) | Planned |
| **Preset 2: Empty list** | `[]` | 0 / 1 subset | 3 | 1 clip (`01`) | Completed |
| **Preset 3: Single [5]** | `[5]` | 1 / 2 subsets | 9 | 1 clip (`01`) | Planned |
| **Preset 4: [1, 2, 3, 4]** | `[1, 2, 3, 4]` | 4 / 16 subsets | 93 | 4 clips (`01`–`04`) | Planned |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
```python
def subsets(items):
    return build(0, [], items)

def build(index, current, items):
    if index == len(items):
        return [list(current)]
    result = build(index + 1, current, items)  # skip this item
    current.append(items[index])
    result += build(index + 1, current, items)  # include this item
    current.pop()
    return result
```

### Visual State & Mechanics
1. **3D Item Pillars**: Elevated pillars showing each item with height proportional to value; highlighted in gold when active, green when included in `current`, and dimmed when skipped.
2. **Current Window Slab**: Translucent volumetric focus box spanning active elements from `currentIdx` to `n - 1`.
3. **Recursion Depth Stack Blocks**: Vertical tiered blocks along the side representing the current recursion call stack (`d=0`, `d=1`, `d=2`, ...).
4. **Subsets Leaf Count Badge**: Live status tag displaying accumulated subsets discovered at base cases.

---

## 4. Preset 0: "[1, 2, 3]"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-skip-one-branch` | `01-setup-and-skip-one-branch.mp3` | 0 – 11 | "Welcome to Recursive Subsets in 3D. The power set contains all possible subsets of our input items. For each item, our recursive algorithm makes a binary choice: first, recurse while skipping the item; then, recurse while including it. When index reaches the length of our list, we hit our base case and return a snapshot of the current subset. We begin with items 1, 2, and 3. At depth 0, we examine item 1 and choose the skip branch. At depth 1, we skip 2. At depth 2, we skip 3. At depth 3, all choices are made, saving our first subset: the empty set. Backtracking to depth 2, we now test the include branch with 3, reaching depth 3 to record our second subset: [3]. Both branches for 3 finish, we pop 3, and return upward." |
| `02-include-two-branch` | `02-include-two-branch.mp3` | 12 – 21 | "Returning to depth 1, we now explore the include branch for item 2, appending 2 to our current list. At depth 2, we first skip 3, reaching the base case to collect our third subset: [2]. Next, we include 3, discovering our fourth subset: [2, 3]. Popping 3 and then popping 2 restores our collection. At this halfway point, the entire skip branch for item 1 is resolved, yielding the first four subsets." |
| `03-include-one-and-completion` | `03-include-one-and-completion.mp3` | 22 – 44 | "Now we take the include branch at depth 0, adding item 1. Skipping 2 and 3 uncovers [1]. Including 3 reveals [1, 3]. Continuing through the include branch for item 2, we uncover [1, 2], and finally, including all three items yields [1, 2, 3]. With all recursive leaves evaluated, the stack unwinds back to the caller. Subsets returns eight total subsets—confirming 2 cubed equals 8." |

---

## 5. Preset 2: "Empty list"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-empty-list-base-case` | `01-empty-list-base-case.mp3` | 0 – 2 | "Here we test the base edge case: an empty input list. When items is empty, our initial index of zero immediately matches the list length. The base case triggers without a single recursive branch, saving our current empty list as the sole subset. The function promptly finishes, returning a list containing one empty subset—confirming two to the power of zero equals one." |
