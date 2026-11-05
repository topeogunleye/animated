# Pascal's Row (One List) in 3D — Walkthrough Playbook & Narration Cues

This document defines the complete audio walkthrough design, clip breakdown, narration scripts, and monotonic timeline cue mappings for **Pascal's Row with One List in 3D** (`07-pascals-triangle/Pascal's row (one list) in 3D, step by step.html`).

---

## 1. Overview & Voice Settings

- **Algorithm**: `pascal_row(k)` computes row $k$ in-place using a single Python list of length $k + 1$.
- **Space Complexity**: $O(k)$ auxiliary space (single list in-place).
- **Time Complexity**: $O(k^2)$ additions across $k$ passes ($1 + 2 + \dots + k = \frac{k(k+1)}{2}$ additions).
- **In-place Direction**: Right-to-left (`range(r + 1, 0, -1)`), preventing values from overwriting prior left neighbors before they are consumed.
- **Voice Model**: ElevenLabs `eleven_multilingual_v2`
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`, "Lauren - Friendly, Comforting and Soft")
- **Settings**: Stability: 0.50, Similarity Boost: 0.75, Style: 0.0, Speaker Boost: true

---

## 2. Preset 0: $k = 4$ (`row 1 4 6 4 1`) — Default Preset (18 Frames)

- **Total Frames**: 18 (indices `0` to `17`)
- **Total Updates**: 10 updates
- **Audio Clips**: 2 clips

### Clip 1: `01-setup-and-early-passes.mp3`
- **Frames**: `0` – `8` (9 frames)
- **Measured Duration**: ~53.79s
- **Script**:
  > "Welcome to Pascal's Row in 3D. While computing Pascal's triangle usually requires storing entire triangular grids, we can find any single row k using only one list of length k plus 1. The key trick is updating elements from right to left, ensuring each value we read from the left has not yet been overwritten. We start with row equals [1], representing row 0. To reach row 4, we perform 4 passes. In pass 1, we append 0 to make room, then update row[1] by adding row[1] plus row[0], giving [1, 1]. In pass 2, we append 0 and update right to left: row[2] becomes 1, and row[1] becomes 1 plus 1, which is 2. In pass 3, we append 0 and set row[3] to 1."
- **Cues**:
  - `frame: 0, at: 0.0` — "Key idea: one list is enough..."
  - `frame: 1, at: 22.0` — "row = [1] is row 0. We need 4 passes..."
  - `frame: 2, at: 29.5` — "Pass 1: row holds row 0. Append 0..."
  - `frame: 3, at: 33.0` — "row[1] = 0 + 1 = 1..."
  - `frame: 4, at: 38.5` — "Pass 2: row holds row 1. Append 0..."
  - `frame: 5, at: 41.5` — "row[2] = 0 + 1 = 1..."
  - `frame: 6, at: 45.0` — "row[1] = 1 + 1 = 2..."
  - `frame: 7, at: 49.0` — "Pass 3: row holds row 2. Append 0..."
  - `frame: 8, at: 51.5` — "row[3] = 0 + 1 = 1..."

### Clip 2: `02-passes-three-four-and-completion.mp3`
- **Frames**: `9` – `17` (9 frames)
- **Measured Duration**: ~35.55s
- **Script**:
  > "Continuing pass 3, row[2] becomes 1 plus 2, which is 3, and row[1] becomes 2 plus 1, also 3, yielding [1, 3, 3, 1]. In pass 4, we append 0 and sweep right to left one final time: row[4] becomes 1, row[3] becomes 1 plus 3, which is 4, row[2] becomes 3 plus 3, which is 6, and row[1] becomes 3 plus 1, which is 4. With range of k completed, the function returns [1, 4, 6, 4, 1]—producing the complete fourth row of Pascal's triangle in linear O of k space."
- **Cues**:
  - `frame: 9, at: 0.0` — "row[2] = 1 + 2 = 3..."
  - `frame: 10, at: 3.5` — "row[1] = 2 + 1 = 3..."
  - `frame: 11, at: 9.0` — "Pass 4: row holds row 3. Append 0..."
  - `frame: 12, at: 13.5` — "row[4] = 0 + 1 = 1..."
  - `frame: 13, at: 15.5` — "row[3] = 1 + 3 = 4..."
  - `frame: 14, at: 18.5` — "row[2] = 3 + 3 = 6..."
  - `frame: 15, at: 21.5` — "row[1] = 3 + 1 = 4..."
  - `frame: 16, at: 25.5` — "range(k) is used up: row is now row 4."
  - `frame: 17, at: 28.0` — "Return [1, 4, 6, 4, 1]..."

---

## 3. Preset 1: $k = 0$ — Edge Case Apex (4 Frames)

- **Total Frames**: 4 (indices `0` to `3`)
- **Total Updates**: 0 updates
- **Audio Clips**: 1 clip

### Clip 1: `01-zero-row-edge-case.mp3`
- **Frames**: `0` – `3` (4 frames)
- **Measured Duration**: ~20.87s
- **Script**:
  > "Here we test the base edge case where k equals 0. The row list initializes to [1], representing the apex of Pascal's triangle. Because k is 0, range of 0 is empty, so the loop never executes and zero updates are performed. The function immediately returns [1] as row 0."
- **Cues**:
  - `frame: 0, at: 0.0` — "Key idea: one list is enough..."
  - `frame: 1, at: 4.5` — "row = [1] is row 0..."
  - `frame: 2, at: 10.5` — "range(0) is empty: no pass runs and row stays [1]."
  - `frame: 3, at: 16.5` — "Return [1]: row 0..."

---

## 4. Preset 2: $k = 1$ — Single Pass (6 Frames)

- **Total Frames**: 6 (indices `0` to `5`)
- **Total Updates**: 1 update
- **Audio Clips**: 1 clip

### Clip 1: `01-first-row-single-pass.mp3`
- **Frames**: `0` – `5` (6 frames)
- **Measured Duration**: ~25.10s
- **Script**:
  > "For k equals 1, we require exactly one pass to compute row 1. Starting from row equals [1], we append 0 to expand the list. The inner loop performs a single right-to-left addition: row[1] equals 0 plus 1, which is 1. The loop finishes after just one update, returning [1, 1] as the first row of Pascal's triangle."
- **Cues**:
  - `frame: 0, at: 0.0` — "Key idea: one list is enough..."
  - `frame: 1, at: 5.0` — "row = [1] is row 0..."
  - `frame: 2, at: 8.0` — "Pass 1: row holds row 0. Append 0..."
  - `frame: 3, at: 11.5` — "row[1] = 0 + 1 = 1..."
  - `frame: 4, at: 18.0` — "range(k) is used up: row is now row 1."
  - `frame: 5, at: 21.0` — "Return [1, 1]: row 1..."

---

## 5. Preset 3: $k = 7$ — Full 8-Element Row (39 Frames)

- **Total Frames**: 39 (indices `0` to `38`)
- **Total Updates**: 28 updates
- **Audio Clips**: 2 clips

### Clip 1: `01-setup-through-pass-four.mp3`
- **Frames**: `0` – `15` (16 frames)
- **Measured Duration**: ~39.76s
- **Script**:
  > "For k equals 7, we compute the eighth row of Pascal's triangle across seven sequential passes. Starting with row equals [1], each pass appends a trailing zero and sweeps inward from right to left. Passes 1 through 3 produce [1, 1], [1, 2, 1], and [1, 3, 3, 1]. In pass 4, we append 0 and compute row[4] down to row[1], establishing [1, 4, 6, 4, 1]. Notice how symmetry naturally emerges as each cell sums adjacent parent values in place without allocating auxiliary lists."
- **Cues**:
  - `frame: 0, at: 0.0`
  - `frame: 1, at: 4.5`
  - `frame: 2, at: 7.0`
  - `frame: 3, at: 9.5`
  - `frame: 4, at: 12.0`
  - `frame: 5, at: 13.5`
  - `frame: 6, at: 15.0`
  - `frame: 7, at: 16.5`
  - `frame: 8, at: 18.0`
  - `frame: 9, at: 19.5`
  - `frame: 10, at: 21.0`
  - `frame: 11, at: 23.5`
  - `frame: 12, at: 25.5`
  - `frame: 13, at: 27.5`
  - `frame: 14, at: 29.5`
  - `frame: 15, at: 32.0`

### Clip 2: `02-passes-five-through-seven.mp3`
- **Frames**: `16` – `38` (23 frames)
- **Measured Duration**: ~36.65s
- **Script**:
  > "Pass 5 appends 0 and sweeps backwards to form [1, 5, 10, 10, 5, 1]. In pass 6, the values expand to [1, 6, 15, 20, 15, 6, 1]. Finally, pass 7 appends 0 and performs 7 in-place additions: row[7] is 1, followed by 7, 21, 35, 35, 21, and 7. The loop finishes after 28 total updates, returning [1, 7, 21, 35, 35, 21, 7, 1]. This single-list in-place algorithm runs in O of k squared time while using strictly O of k space."
- **Cues**:
  - `frame: 16, at: 0.0`
  - `frame: 17, at: 1.5`
  - `frame: 18, at: 2.5`
  - `frame: 19, at: 3.5`
  - `frame: 20, at: 4.5`
  - `frame: 21, at: 5.5`
  - `frame: 22, at: 7.0`
  - `frame: 23, at: 8.0`
  - `frame: 24, at: 9.0`
  - `frame: 25, at: 10.0`
  - `frame: 26, at: 11.0`
  - `frame: 27, at: 12.0`
  - `frame: 28, at: 13.0`
  - `frame: 29, at: 15.0`
  - `frame: 30, at: 18.0`
  - `frame: 31, at: 19.5`
  - `frame: 32, at: 21.0`
  - `frame: 33, at: 22.0`
  - `frame: 34, at: 23.0`
  - `frame: 35, at: 24.0`
  - `frame: 36, at: 25.0`
  - `frame: 37, at: 26.5`
  - `frame: 38, at: 29.5`

---

## 6. Custom Input Behavior

For custom integer $k \ge 0$:
- If $k \in \{4, 0, 1, 7\}$, the matched studio walkthrough plays with pre-recorded ElevenLabs audio.
- For other custom $k$, dynamic Web Speech synthesis tutor fallback is triggered on a per-frame basis, providing spoken explanations while running.
