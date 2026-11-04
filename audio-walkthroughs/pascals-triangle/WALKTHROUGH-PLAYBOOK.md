# Pascal's Triangle: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Solution 07: Pascal's Triangle in 3D** ([`07-pascals-triangle/Pascal's Triangle in 3D, step by step.html`](../../07-pascals-triangle/Pascal's%20Triangle%20in%203D,%20step%20by%20step.html)).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/pascals-triangle/`

---

## 2. Presets Overview

| Preset | Input | Rows / Cells | Frames | Audio Clips | Status |
|---|---|:---:|:---:|:---:|:---:|
| **Preset 0: n = 5 (example)** | `n = 5` | 5 rows / 15 cells | 29 | 3 clips (`01`–`03`) | Completed |
| **Preset 1: n = 1** | `n = 1` | 1 row / 1 cell | 7 | 1 clip (`01`) | Completed |
| **Preset 2: n = 0 (empty)** | `n = 0` | 0 rows / 0 cells | 4 | 1 clip (`01`) | Completed |
| **Preset 3: n = 8** | `n = 8` | 8 rows / 36 cells | 56 | 3 clips (`01`–`03`) | Completed |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
```python
def pascal_rows(n):
    rows = []
    for r in range(n):
        row = []
        for c in range(r + 1):
            if c == 0 or c == r:
                row.append(1)
            else:
                row.append(rows[r - 1][c - 1] + rows[r - 1][c])
        rows.append(row)
    return rows
```

### Visual State & Mechanics
1. **3D Vertical Hex/Cylindrical Pillars**: Heights and label badges proportional to cell values in the triangle.
2. **Current Row Search Slab**: Translucent amber slab highlighting the active row `r` being populated.
3. **Parent Pair Pointer Brackets**: Twin cyan/orange beams pointing up to `(r - 1, c - 1)` and `(r - 1, c)` as their sum forms the current interior cell.
4. **Dynamic Camera & Perspective**: Yaw rotation with double-click reset, smoothly centering larger triangles as rows grow.

---

## 4. Preset 0: "n = 5 (example)"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-rows-zero-to-one` | `01-setup-and-rows-zero-to-one.mp3` | 0 – 8 | "Welcome to Pascal's Triangle in 3D. The fundamental property of Pascal's triangle is that every interior cell is the direct sum of the two cells directly above it, while the outer boundaries are always ones. We initialize an empty list called rows to construct five rows row by row. Row zero begins with a single cell at index zero. Because it is an edge, we append one and finish row zero. Row one holds two cells: indices zero and one are both boundaries, so both receive ones, giving us the row one, one." |
| `02-rows-two-and-three` | `02-rows-two-and-three.mp3` | 9 – 19 | "In row two, we see the additive recurrence take effect for the first time. The left edge cell receives one. For the interior cell at column one, the algorithm looks up to the previous row and adds one plus one to get two. The right edge receives one, completing row two as one, two, one. Moving to row three, the edges are one, while column one sums one plus two to yield three, and column two sums two plus one to yield three, finishing row three as one, three, three, one." |
| `03-row-four-and-completion` | `03-row-four-and-completion.mp3` | 20 – 28 | "Finally, row four starts with an edge of one. The interior cells compute one plus three equals four, three plus three equals six, and three plus one equals four, followed by the terminating edge of one. Row four appends one, four, six, four, one. All five rows are now completely assembled, totaling fifteen cells. The outer loop terminates, and the function returns the completed list of rows." |

---

## 5. Preset 1: "n = 1"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-single-row-base-case` | `01-single-row-base-case.mp3` | 0 – 6 | "Here we observe the minimal non-empty base case where n equals one. The rows list is initialized, and the outer loop executes exactly one iteration for row zero. A single cell at position zero, zero is an edge, so we append one. Row zero is appended to rows, the loop concludes, and the algorithm returns a list containing a single row of one." |

---

## 6. Preset 2: "n = 0 (empty)"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-empty-triangle-base-case` | `01-empty-triangle-base-case.mp3` | 0 – 3 | "Here we inspect the edge case where n equals zero, representing an empty Pascal's triangle. The rows list is initialized to empty. Because range of zero contains no values, the outer loop never executes, and no cells or rows are created. The function immediately returns an empty list, validating our edge case handling in constant time." |

---

## 7. Preset 3: "n = 8"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-rows-zero-to-three` | `01-setup-and-rows-zero-to-three.mp3` | 0 – 19 | "We now observe a larger, eight-row expansion of Pascal's triangle. Building out eight complete rows will produce thirty-six total cells, exhibiting rich combinatorial symmetry. Rows zero and one establish our apex with one and one, one. Row two introduces our first sum: one plus one equals two, giving one, two, one. Row three sums one plus two to three, and two plus one to three, generating the cubic coefficients one, three, three, one." |
| `02-rows-four-and-five` | `02-rows-four-and-five.mp3` | 20 – 34 | "Continuing to row four, the interior cells compute one plus three equals four, three plus three equals six, and three plus one equals four, appending row four. In row five, each interior position sums the adjacent pair from row four: one plus four is five, four plus six is ten, six plus four is ten, and four plus one is five, assembling the six-element row one, five, ten, ten, five, one." |
| `03-rows-six-and-seven-and-completion` | `03-rows-six-and-seven-and-completion.mp3` | 35 – 55 | "Row six produces twenty at its center, with symmetric flanks of fifteen, six, and one. Finally, row seven calculates our largest values: thirty-five at the twin peaks, flanked by twenty-one, seven, and the boundary ones. The outer loop exhausts all eight rows. The function returns the complete thirty-six-cell triangle, beautifully displaying the binomial coefficients for powers zero through seven." |

