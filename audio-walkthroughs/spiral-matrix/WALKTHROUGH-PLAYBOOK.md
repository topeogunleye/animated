# Spiral Matrix: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Spiral Matrix in 3D** (`11-spiral-matrix/Spiral matrix in 3D, step by step.html`).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/spiral-matrix/`

---

## 2. Presets Overview

| Preset | Dimensions | Elements / Total Frames | Audio Clips | Mode | Status |
|---|:---:|:---:|:---:|:---:|:---:|
| **Preset 0: 3x3 Square [[1..9]]** | 3 × 3 | 9 cells / 23 frames | 3 clips (`01`–`03`) | Studio Voice (Lauren) | Completed |
| **Preset 1: 2x4 Rect [[1..8]]** | 2 × 4 | 8 cells / 17 frames | 2 clips (`01`–`02`) | Studio Voice (Lauren) | Completed |
| **Preset 2: 3x1 Single Col [[1],[2],[3]]** | 3 × 1 | 3 cells / 12 frames | 1 clip (`01`) | Studio Voice (Lauren) | Completed |
| **Preset 3: Empty matrix []** | 0 × 0 | 0 cells / 2 frames | 1 clip (`01`) | Studio Voice (Lauren) | Completed |
| **Preset 4: 1x4 Single Row [[1,2,3,4]]** | 1 × 4 | 4 cells / 13 frames | 1 clip (`01`) | Studio Voice (Lauren) | Completed |
| **Preset 5: 4x4 Matrix [[1..16]]** | 4 × 4 | 16 cells / 30 frames | Dynamic TTS | Web Speech Fallback | Active |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
```python
def spiral_order(matrix):
    result = []
    if not matrix:
        return result
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1
    return result
```

### Visual State & Mechanics
1. **3D Matrix Grid**: Cells are laid out on a floor plate with distinct colors for unvisited (blue), actively scanned (amber), and collected (green).
2. **Four Boundary Wall Pointers**:
   - `top` (blue wall): moves downward (+Z) as top rows are harvested.
   - `bottom` (purple wall): moves upward (-Z) as bottom rows are harvested.
   - `left` (cyan wall): moves rightward (+X) as left columns are harvested.
   - `right` (orange wall): moves leftward (-X) as right columns are harvested.
3. **Guard Boundary Protection**:
   - `if top <= bottom:` avoids re-visiting bottom row elements when a single remaining row was already harvested by the top sweep.
   - `if left <= right:` avoids re-visiting left column elements when a single remaining column was already harvested by the right sweep.
4. **Arcing Number Flyer**: As each matrix value is appended to `result`, a 3D sprite lifts from the matrix cell in a parabolic arc and slots into the front result tray.

---

## 4. Preset 0: "3x3 Square [[1..9]]"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-top-row` | `01-setup-and-top-row.mp3` | 0 – 6 | "Welcome to Spiral Matrix in 3D. We traverse an m by n grid in clockwise spiral order by contracting four boundary walls: top, bottom, left, and right. We begin with a three-by-three matrix containing the numbers one through nine. Boundaries are initialized with top at zero, bottom at two, left at zero, and right at two. Since the boundaries define an active ring, we sweep the top row from left to right, collecting one, two, and three into our result. Having cleared this row, we push the top wall down by incrementing top to one." |
| `02-outer-ring-completion` | `02-outer-ring-completion.mp3` | 7 – 14 | "Now we traverse the right boundary downward from top to bottom, picking up six and nine. We then contract the right wall leftward by decrementing right to one. Next, the top-less-than-or-equal-to-bottom check passes, so we sweep the bottom row in reverse from right to left, collecting eight and seven, and shift the bottom wall upward by decrementing bottom to one. Finally, the left-less-than-or-equal-to-right check passes, sweeping the left column upward to collect four, and advancing the left wall rightward to one. The outer ring is now completely harvested." |
| `03-inner-ring-and-completion` | `03-inner-ring-and-completion.mp3` | 15 – 22 | "With top, bottom, left, and right all equal to one, a single inner cell remains. The while condition evaluates to true, and our top row sweep collects the center value, five. Moving the top wall down advances top to two, and moving the right wall left decreases right to zero. Notice how our guard conditions prevent duplicate reads: because top now exceeds bottom, the bottom sweep is skipped, and because left exceeds right, the left sweep is skipped. The boundary walls have crossed, terminating the loop and returning all nine elements in spiral order." |

### Timeline Cues
- **Clip 1 (`setupAndTopRow`)**:
  - `0.0s`: Frame 0 (`result = []`)
  - `12.5s`: Frame 1 (`top = 0, bottom = 2, left = 0, right = 2`)
  - `21.5s`: Frame 2 (`while top <= bottom and left <= right`)
  - `26.5s`: Frame 3 (`matrix[0][0] = 1 -> result = [1]`)
  - `28.5s`: Frame 4 (`matrix[0][1] = 2 -> result = [1, 2]`)
  - `30.5s`: Frame 5 (`matrix[0][2] = 3 -> result = [1, 2, 3]`)
  - `33.5s`: Frame 6 (`top += 1 -> top = 1`)
- **Clip 2 (`outerRingCompletion`)**:
  - `0.0s`: Frame 7 (`matrix[1][2] = 6 -> result = [1, 2, 3, 6]`)
  - `5.5s`: Frame 8 (`matrix[2][2] = 9 -> result = [1, 2, 3, 6, 9]`)
  - `8.0s`: Frame 9 (`right -= 1 -> right = 1`)
  - `13.5s`: Frame 10 (`matrix[2][1] = 8 -> result = [1, 2, 3, 6, 9, 8]`)
  - `21.5s`: Frame 11 (`matrix[2][0] = 7 -> result = [1, 2, 3, 6, 9, 8, 7]`)
  - `24.0s`: Frame 12 (`bottom -= 1 -> bottom = 1`)
  - `29.5s`: Frame 13 (`matrix[1][0] = 4 -> result = [1, 2, 3, 6, 9, 8, 7, 4]`)
  - `36.0s`: Frame 14 (`left += 1 -> left = 1`)
- **Clip 3 (`innerRingAndCompletion`)**:
  - `0.0s`: Frame 15 (`while top <= bottom and left <= right: ring 2`)
  - `8.0s`: Frame 16 (`matrix[1][1] = 5 -> result = [..., 5]`)
  - `12.5s`: Frame 17 (`top += 1 -> top = 2`)
  - `16.0s`: Frame 18 (`right -= 1 -> right = 0`)
  - `20.5s`: Frame 19 (`guard top <= bottom is False (2 > 1); skip bottom`)
  - `27.5s`: Frame 20 (`guard left <= right is False (1 > 0); skip left`)
  - `32.0s`: Frame 21 (`loop ended: boundaries crossed`)
  - `36.0s`: Frame 22 (`return result: [1, 2, 3, 6, 9, 8, 7, 4, 5]`)

---

## 5. Preset 1: "2x4 Rect [[1..8]]"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-top-and-right` | `01-setup-and-top-and-right.mp3` | 0 – 9 | "Let's trace a rectangular matrix with two rows and four columns. Boundaries start with top at zero, bottom at one, left at zero, and right at three. We traverse the top row across all four columns, appending one, two, three, and four. We advance the top boundary wall down to one. Next, we traverse the right column from top to bottom, picking up eight, and pull the right wall leftward to two." |
| `02-bottom-row-and-termination` | `02-bottom-row-and-termination.mp3` | 10 – 16 | "Because top remains less than or equal to bottom, the bottom row sweep executes from right to left, collecting seven, six, and five. Decrementing bottom brings it to zero, which crosses below top. Left advances to one, and with boundaries crossed, no leftover elements remain. The loop concludes after a single clockwise perimeter sweep, successfully returning all eight elements." |

### Timeline Cues
- **Clip 1 (`setupAndTopAndRight`)**:
  - `0.0s`: Frame 0 (`result = []`)
  - `4.5s`: Frame 1 (`top = 0, bottom = 1, left = 0, right = 3`)
  - `10.5s`: Frame 2 (`while top <= bottom and left <= right`)
  - `14.0s`: Frame 3 (`matrix[0][0] = 1`)
  - `16.0s`: Frame 4 (`matrix[0][1] = 2`)
  - `17.5s`: Frame 5 (`matrix[0][2] = 3`)
  - `19.0s`: Frame 6 (`matrix[0][3] = 4`)
  - `21.0s`: Frame 7 (`top += 1 -> top = 1`)
  - `24.5s`: Frame 8 (`matrix[1][3] = 8`)
  - `27.0s`: Frame 9 (`right -= 1 -> right = 2`)
- **Clip 2 (`bottomRowAndTermination`)**:
  - `0.0s`: Frame 10 (`matrix[1][2] = 7`)
  - `7.5s`: Frame 11 (`matrix[1][1] = 6`)
  - `9.0s`: Frame 12 (`matrix[1][0] = 5`)
  - `11.0s`: Frame 13 (`bottom -= 1 -> bottom = 0`)
  - `15.5s`: Frame 14 (`left += 1 -> left = 1`)
  - `18.5s`: Frame 15 (`loop ended: top 1 > bottom 0`)
  - `22.5s`: Frame 16 (`return result: [1, 2, 3, 4, 8, 7, 6, 5]`)

---

## 6. Preset 2: "3x1 Single Col [[1],[2],[3]]"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-single-column-and-guard-protection` | `01-single-column-and-guard-protection.mp3` | 0 – 11 | "Here we examine a critical edge case: a single column matrix with three rows and one column. Boundaries initialize to top zero, bottom two, left zero, and right zero. Our top sweep reads cell one at index zero-zero, moving top down to one. Next, the right column sweep continues downward, reading two and three, and decrements right to negative one. Crucially, the left-less-than-or-equal-to-right guard evaluates to false because left is zero and right is negative one. This prevents the left sweep from reading the column a second time in reverse. The loop terminates, returning one, two, three." |

### Timeline Cues
- **Clip 1 (`singleColumnAndGuardProtection`)**:
  - `0.0s`: Frame 0 (`result = []`)
  - `6.5s`: Frame 1 (`top = 0, bottom = 2, left = 0, right = 0`)
  - `12.5s`: Frame 2 (`while condition`)
  - `14.5s`: Frame 3 (`matrix[0][0] = 1`)
  - `17.5s`: Frame 4 (`top += 1 -> top = 1`)
  - `20.5s`: Frame 5 (`matrix[1][0] = 2`)
  - `25.0s`: Frame 6 (`matrix[2][0] = 3`)
  - `27.5s`: Frame 7 (`right -= 1 -> right = -1`)
  - `30.5s`: Frame 8 (`bottom -= 1 -> bottom = 1`)
  - `34.0s`: Frame 9 (`guard left <= right is False (0 > -1); skip left`)
  - `41.5s`: Frame 10 (`loop ended`)
  - `44.0s`: Frame 11 (`return result: [1, 2, 3]`)

---

## 7. Preset 3: "Empty matrix []"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-empty-matrix-base-case` | `01-empty-matrix-base-case.mp3` | 0 – 1 | "In this boundary case with an empty matrix, the guard condition if not matrix immediately evaluates to true. The function returns an empty list without entering the loop or initializing boundary walls." |

### Timeline Cues
- **Clip 1 (`emptyMatrixBaseCase`)**:
  - `0.0s`: Frame 0 (`result = []`)
  - `3.5s`: Frame 1 (`if not matrix -> return []`)

---

## 8. Preset 4: "1x4 Single Row [[1,2,3,4]]"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-single-row-and-guard-protection` | `01-single-row-and-guard-protection.mp3` | 0 – 12 | "Now consider a single row matrix with one row and four columns. Boundaries start with top at zero, bottom at zero, left at zero, and right at three. The top row traversal collects one, two, three, and four. Incrementing top sets it to one, which immediately exceeds bottom. The right column sweep finds no cells and decrements right to two. Then, the top-less-than-or-equal-to-bottom guard evaluates to false, safely preventing the bottom traversal from running backward across the same row. The loop finishes, returning one, two, three, four." |

### Timeline Cues
- **Clip 1 (`singleRowAndGuardProtection`)**:
  - `0.0s`: Frame 0 (`result = []`)
  - `4.5s`: Frame 1 (`top = 0, bottom = 0, left = 0, right = 3`)
  - `10.5s`: Frame 2 (`while condition`)
  - `12.5s`: Frame 3 (`matrix[0][0] = 1`)
  - `14.5s`: Frame 4 (`matrix[0][1] = 2`)
  - `16.0s`: Frame 5 (`matrix[0][2] = 3`)
  - `17.5s`: Frame 6 (`matrix[0][3] = 4`)
  - `19.5s`: Frame 7 (`top += 1 -> top = 1`)
  - `24.0s`: Frame 8 (`right -= 1 -> right = 2`)
  - `27.5s`: Frame 9 (`guard top <= bottom is False (1 > 0); skip bottom`)
  - `33.5s`: Frame 10 (`left += 1 -> left = 1`)
  - `35.5s`: Frame 11 (`loop ended`)
  - `37.5s`: Frame 12 (`return result: [1, 2, 3, 4]`)

---

## 9. Preset 5: "4x4 Matrix [[1..16]]" (Web Speech Fallback)

- Matrix: 4 × 4 grid (16 cells, 30 frames).
- Status: Handled via browser Web Speech Synthesis (`window.speechSynthesis`) dynamically speaking step captions.
- Status Message: `"Narration enabled (using browser speech synthesis for custom/other inputs)."`

---

## 10. Verification & Quality Assurance

- **Audio Playback**: Verified that audio plays seamlessly across consecutive frames.
- **Cue Synchronization**: Timed cues ensure the 3D scene highlights, active code line, wall contractions, and spoken explanation remain tightly in sync.
- **Controls Integration**:
  - `Narration: On/Off` toggle button (`#bNarration`).
  - Voice selector dropdown (`#voice`).
  - Real-time status badge (`#narrationStatus`).
  - Seamless fallback to Web Speech Synthesis when studio recordings are not present.
