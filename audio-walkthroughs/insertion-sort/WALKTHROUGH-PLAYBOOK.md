# Insertion Sort: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Insertion Sort in 3D** (`insertion-sort/Insertion sort in 3D, step by step.html`).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/insertion-sort/`

---

## 2. Presets Overview

| Preset | Input | Comparisons / Shifts | Total Frames | Audio Clips | Mode | Status |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **Preset 0: Example [5, 2, 4, 1]** | `[5, 2, 4, 1]` | 6 comps / 5 shifts | 23 | 3 clips (`01`–`03`) | Studio Voice (Lauren) | Completed |
| **Preset 1: Already sorted (4)** | `[1, 2, 3, 4]` | 3 comps / 0 shifts | 13 | 2 clips (`01`–`02`) | Studio Voice (Lauren) | Completed |
| **Preset 2: Reversed (4)** | `[4, 3, 2, 1]` | 6 comps / 6 shifts | 25 | 2 clips (`01`–`02`) | Studio Voice (Lauren) | Completed |
| **Preset 3: Empty list** | `[]` | 0 comps / 0 shifts | 4 | 1 clip (`01`) | Studio Voice (Lauren) | Completed |
| **Preset 4: Reversed (10)** | `[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]` | 45 comps / 45 shifts | 121 | Dynamic TTS | Web Speech Fallback | Active |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
```python
def insertion_sort(nums):
    comparisons = 0
    shifts = 0
    for i in range(1, len(nums)):
        key = nums[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if nums[j] > key:
                nums[j + 1] = nums[j]
                shifts += 1
                j -= 1
            else:
                break
        nums[j + 1] = key
    return comparisons, shifts
```

### Visual State & Mechanics
1. **Vertical Pillars & Floor Slots**: Each element in `nums` is rendered as a 3D pillar whose height corresponds to its numeric value, with index floor plates below.
2. **Hovering Key Slot**: When `key = nums[i]` is lifted, the pillar is elevated into a floating inspection slot above the array, leaving an empty target vacancy below.
3. **Pointers `i` and `j`**: Glowing brackets and labels distinguish the outer loop index `i` (current element to insert) and inner loop index `j` (comparing against elements in the sorted prefix).
4. **Sliding Animation**: When `nums[j] > key`, pillar `j` slides smoothly one slot to the right into `j + 1`, and `shifts` increments.
5. **Key Insertion**: Key drops down into slot `j + 1` once `nums[j] <= key` or `j < 0`.
6. **Settled State**: Elements in the growing sorted prefix `[0..i]` are highlighted, culminating in a celebration color pulse across all pillars upon algorithm completion.

---

## 4. Preset 0: "Example [5, 2, 4, 1]"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-insert-two` | `01-setup-and-insert-two.mp3` | 0 – 6 | "Welcome to Insertion Sort in 3D. Insertion sort builds a sorted prefix one element at a time: we lift each key out, slide any larger items one slot to the right, and drop the key into the resulting opening. We begin with the list five, two, four, and one. Comparisons and shifts start at zero, and the first element five is already sorted by itself. At index one, we lift key two out of slot one, while j at index zero marks the end of the sorted prefix. We compare five with key two: because five is greater, five shifts one position right into slot one. With j now negative one, the inner loop finishes, and we drop key two into slot zero, growing our sorted prefix to two items." |
| `02-insert-four` | `02-insert-four.mp3` | 7 – 11 | "Next, index advances to two, lifting key four out of slot two. With j at index one, we compare five with key four: five is larger, so five shifts right into slot two. Now j points to index zero. We compare two with key four: because two is not greater, the while condition fails and sliding immediately stops. We drop key four into slot one, expanding our sorted prefix to three items: two, four, and five." |
| `03-insert-one-and-completion` | `03-insert-one-and-completion.mp3` | 12 – 22 | "Finally, index reaches three, lifting key one out of slot three. We compare five with one: five shifts right into slot three. Then we compare four with one: four shifts right into slot two. Next, we compare two with one: two shifts right into slot one. With j decremented to negative one, sliding terminates. We drop key one into slot zero, completing the full list. Having processed every element, the algorithm returns six comparisons and five shifts, with the array successfully sorted into one, two, four, five." |

### Timeline Cues
- **Clip 1 (`setupAndInsertTwo`)**:
  - `0.0s`: Frame 0 (`comparisons = 0, shifts = 0`)
  - `13.5s`: Frame 1 (`for i in range(1, len(nums)): i = 1`)
  - `24.0s`: Frame 2 (`key = nums[i] = 2; lift out of slot 1`)
  - `33.0s`: Frame 3 (`j = i - 1 = 0`)
  - `38.5s`: Frame 4 (`compare nums[j=0]=5 > key=2 -> True`)
  - `43.0s`: Frame 5 (`nums[1] = nums[0] (5 shifts right into slot 1)`)
  - `47.5s`: Frame 6 (`nums[0] = key (drop key 2 into slot 0)`)
- **Clip 2 (`insertFour`)**:
  - `0.0s`: Frame 7 (`for i in range(1, len(nums)): i = 2`)
  - `5.5s`: Frame 8 (`key = nums[i] = 4; lift out of slot 2`)
  - `11.5s`: Frame 9 (`compare nums[j=1]=5 > key=4 -> True`)
  - `15.5s`: Frame 10 (`nums[2] = nums[1] (5 shifts right into slot 2)`)
  - `25.0s`: Frame 11 (`nums[1] = key (drop key 4 into slot 1)`)
- **Clip 3 (`insertOneAndFinish`)**:
  - `0.0s`: Frame 12 (`for i in range(1, len(nums)): i = 3`)
  - `5.5s`: Frame 13 (`key = nums[i] = 1; lift out of slot 3`)
  - `8.0s`: Frame 14 (`j = i - 1 = 2`)
  - `11.5s`: Frame 15 (`compare nums[j=2]=5 > key=1 -> True`)
  - `14.0s`: Frame 16 (`nums[3] = nums[2] (5 shifts right into slot 3)`)
  - `17.5s`: Frame 17 (`compare nums[j=1]=4 > key=1 -> True`)
  - `20.0s`: Frame 18 (`nums[2] = nums[1] (4 shifts right into slot 2)`)
  - `23.5s`: Frame 19 (`compare nums[j=0]=2 > key=1 -> True`)
  - `27.5s`: Frame 20 (`nums[1] = nums[0] (2 shifts right into slot 1)`)
  - `32.0s`: Frame 21 (`nums[0] = key (drop key 1 into slot 0)`)
  - `34.5s`: Frame 22 (`return comparisons, shifts -> (6, 5)`)

---

## 5. Preset 1: "Already sorted (4)"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-insert-two-and-three` | `01-setup-and-insert-two-and-three.mp3` | 0 – 7 | "Now let's examine the best-case scenario: an array of four elements that is already in ascending order: one, two, three, four. Counter variables start at zero, with element one forming the initial sorted prefix. At index one, key two is lifted. We compare one with key two: because one is smaller, the loop breaks after just one comparison and zero shifts, dropping two right back into slot one. Moving to index two, key three is lifted. We compare two with key three: two is smaller, so key three drops back into slot two with no shifts required." |
| `02-insert-four-and-best-case` | `02-insert-four-and-best-case.mp3` | 8 – 12 | "Advancing to index three, we lift key four. We compare three with key four: three is not greater, breaking the loop instantly and dropping key four into slot three. The loop concludes, returning three comparisons and zero shifts. Because every key required exactly one comparison and zero movements, insertion sort runs in linear O of n time on already sorted data." |

### Timeline Cues
- **Clip 1 (`insertTwoAndThree`)**:
  - `0.0s`: Frame 0 (`comparisons = 0, shifts = 0`)
  - `10.0s`: Frame 1 (`for i in range(1, len(nums)): i = 1`)
  - `16.5s`: Frame 2 (`key = nums[1] = 2; lift out`)
  - `20.0s`: Frame 3 (`compare nums[0]=1 > key=2 -> False; break`)
  - `28.0s`: Frame 4 (`nums[1] = key; drop 2 back in`)
  - `31.5s`: Frame 5 (`for i in range(1, len(nums)): i = 2`)
  - `35.0s`: Frame 6 (`key = nums[2] = 3; lift out`)
  - `38.5s`: Frame 7 (`nums[2] = key; drop 3 back in`)
- **Clip 2 (`insertFourAndBestCase`)**:
  - `0.0s`: Frame 8 (`for i in range(1, len(nums)): i = 3`)
  - `4.0s`: Frame 9 (`key = nums[3] = 4; lift out`)
  - `9.5s`: Frame 10 (`compare nums[2]=3 > key=4 -> False; break`)
  - `13.5s`: Frame 11 (`nums[3] = key; drop 4 back in`)
  - `16.0s`: Frame 12 (`return comparisons, shifts -> (3, 0)`)

---

## 6. Preset 2: "Reversed (4)"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-insert-three-and-two` | `01-setup-and-insert-three-and-two.mp3` | 0 – 13 | "Now let's observe the worst-case scenario: an array sorted in reverse order: four, three, two, one. Element four starts as our sorted prefix. At index one, key three is lifted. We compare four with three: four shifts right, and three drops into slot zero. At index two, key two is lifted. We compare four with two: four shifts right. Then we compare three with two: three shifts right. With j at negative one, key two drops into slot zero, leaving three items sorted." |
| `02-insert-one-and-worst-case` | `02-insert-one-and-worst-case.mp3` | 14 – 24 | "At index three, key one is lifted. Four shifts right into slot three, three shifts right into slot two, and two shifts right into slot one. Finally, key one drops into slot zero. The sort completes, returning six comparisons and six shifts. Every single element had to slide across the entire sorted prefix, demonstrating the quadratic O of n squared worst-case behavior of insertion sort." |

### Timeline Cues
- **Clip 1 (`insertThreeAndTwo`)**:
  - `0.0s`: Frame 0 (`comparisons = 0, shifts = 0`)
  - `7.5s`: Frame 1 (`for i in range(1, len(nums)): i = 1`)
  - `11.0s`: Frame 2 (`key = 3`)
  - `14.0s`: Frame 3 (`j = 0`)
  - `16.5s`: Frame 4 (`compare nums[0]=4 > key=3 -> True`)
  - `18.5s`: Frame 5 (`nums[1] = nums[0] (4 shifts right)`)
  - `20.0s`: Frame 6 (`nums[0] = key (drop 3)`)
  - `22.5s`: Frame 7 (`for i in range(1, len(nums)): i = 2`)
  - `26.0s`: Frame 8 (`key = 2`)
  - `28.5s`: Frame 9 (`nums[2] = nums[1] (4 shifts right)`)
  - `30.0s`: Frame 10 (`compare nums[0]=3 > key=2 -> True`)
  - `32.5s`: Frame 11 (`nums[1] = nums[0] (3 shifts right)`)
  - `34.0s`: Frame 12 (`nums[0] = key (drop 2)`)
  - `35.5s`: Frame 13 (`end of i=2 iteration`)
- **Clip 2 (`insertOneAndWorstCase`)**:
  - `0.0s`: Frame 14 (`for i in range(1, len(nums)): i = 3`)
  - `3.0s`: Frame 15 (`key = 1`)
  - `5.0s`: Frame 16 (`nums[3] = nums[2] (4 shifts right)`)
  - `7.0s`: Frame 17 (`compare nums[1]=3 > key=1 -> True`)
  - `9.0s`: Frame 18 (`nums[2] = nums[1] (3 shifts right)`)
  - `11.0s`: Frame 19 (`compare nums[0]=2 > key=1 -> True`)
  - `13.0s`: Frame 20 (`nums[1] = nums[0] (2 shifts right)`)
  - `15.0s`: Frame 21 (`nums[0] = key (drop 1)`)
  - `16.5s`: Frame 22 (`j = -1`)
  - `19.5s`: Frame 23 (`prefix 0..3 now fully sorted`)
  - `21.5s`: Frame 24 (`return comparisons, shifts -> (6, 6)`)

---

## 7. Preset 3: "Empty list"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-empty-list-and-base-case` | `01-empty-list-and-base-case.mp3` | 0 – 3 | "This preset demonstrates the boundary edge case with an empty list. Comparisons and shifts start at zero. Because the length of the list is zero, the loop range from one to zero is empty and never executes. The function immediately returns zero comparisons and zero shifts on the empty list." |

### Timeline Cues
- **Clip 1 (`emptyBaseCase`)**:
  - `0.0s`: Frame 0 (`comparisons = 0`)
  - `5.0s`: Frame 1 (`shifts = 0`)
  - `9.0s`: Frame 2 (`for i in range(1, 0) -> empty range`)
  - `15.5s`: Frame 3 (`return comparisons, shifts -> (0, 0)`)

---

## 8. Preset 4: "Reversed (10)" (Web Speech Fallback)

- Input: `[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]` (45 comparisons, 45 shifts, 121 frames).
- Status: Handled via browser Web Speech Synthesis (`window.speechSynthesis`) dynamically speaking step captions.
- Status Message: `"Narration enabled (using browser speech synthesis for custom/other inputs)."`

---

## 9. Verification & Quality Assurance

- **Audio Playback**: Verified that audio plays seamlessly across consecutive frames.
- **Cue Synchronization**: Timed cues ensure the 3D scene highlights, active code line, and spoken explanation remain tightly in sync.
- **Controls Integration**:
  - `Narration: On/Off` toggle button (`#bNarration`).
  - Voice selector dropdown (`#voice`).
  - Real-time status badge (`#narrationStatus`).
  - Seamless fallback to Web Speech Synthesis when studio recordings are not present.
