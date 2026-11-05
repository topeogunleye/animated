# Recursive Leftmost Binary Search in 3D — Walkthrough Playbook & Narration Cues

This playbook documents the narration audio, scripts, and timeline cue mappings for **Recursive Leftmost Binary Search in 3D** (`01-leftmost-binary-search/Recursive leftmost binary search in 3D.html`).

---

## 1. Overview & Voice Settings

- **Algorithm**: `binary_search_recursive(nums, target)` finds the earliest occurrence index and count of comparisons using recursive helper `search(low, high, first_index, comparisons)`.
- **Time Complexity**: $O(\log n)$ comparisons.
- **Space Complexity**: $O(\log n)$ call stack frames.
- **Voice Model**: ElevenLabs `eleven_multilingual_v2`
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`, "Lauren - Friendly, Comforting and Soft")
- **Voice Settings**: Stability: 0.50, Similarity Boost: 0.75, Style: 0.0, Speaker Boost: true

---

## 2. Preset 0: Duplicate 3s (`[1, 3, 3, 3, 5, 8]`, target 3) — 10 Frames

- **Total Frames**: 10 (indices `0` to `9`)
- **Result**: `(1, 3)` (first occurrence at index 1, 3 comparisons)
- **Audio Clips**: 2 clips

### Clip 1: `01-setup-and-call-one.mp3`
- **Frames**: `0` – `3` (4 frames)
- **Measured Duration**: ~45.40s
- **Cues**:
  - `frame: 0, at: 0.0` — "Key idea: on a match, remember mid as first_index and search the left side again..."
  - `frame: 1, at: 22.0` — "The outer function makes the first call: search(0, 5, -1, 0)."
  - `frame: 2, at: 28.5` — "Call 1: search(0, 5, -1, 0). low 0 <= high 5, so mid = 2."
  - `frame: 3, at: 34.0` — "comparisons = 1. nums[2] = 3 vs 3: equal. The next call gets first_index = 2 and searches left with high = 1."

### Clip 2: `02-calls-two-through-four-and-completion.mp3`
- **Frames**: `4` – `9` (6 frames)
- **Measured Duration**: ~38.90s
- **Cues**:
  - `frame: 4, at: 0.0` — "Call 2: search(0, 1, 2, 1). low 0 <= high 1, so mid = 0."
  - `frame: 5, at: 3.5` — "comparisons = 2. nums[0] = 1 vs 3: too small. The next call drops the left side with low = 1."
  - `frame: 6, at: 10.5` — "Call 3: search(1, 1, 2, 2). low 1 <= high 1, so mid = 1."
  - `frame: 7, at: 13.5` — "comparisons = 3. nums[1] = 3 vs 3: equal. The next call gets first_index = 1 and searches left with high = 0."
  - `frame: 8, at: 20.5` — "Call 4: search(1, 0, 1, 3) has low 1 > high 0, so it returns (1, 3)."
  - `frame: 9, at: 29.0` — "All 4 calls pass the same pair back up, so the function returns (1, 3)..."

---

## 3. Preset 1: Target missing (4) (`[1, 3, 5, 8]`, target 4) — 8 Frames

- **Total Frames**: 8 (indices `0` to `7`)
- **Result**: `(-1, 2)` (not in list, 2 comparisons)
- **Audio Clips**: 2 clips

### Clip 1: `01-setup-and-call-one.mp3`
- **Frames**: `0` – `3` (4 frames)
- **Measured Duration**: ~27.38s
- **Cues**:
  - `frame: 0, at: 0.0`
  - `frame: 1, at: 5.5`
  - `frame: 2, at: 10.5`
  - `frame: 3, at: 13.5`

### Clip 2: `02-calls-two-and-three-missing-result.mp3`
- **Frames**: `4` – `7` (4 frames)
- **Measured Duration**: ~35.68s
- **Cues**:
  - `frame: 4, at: 0.0`
  - `frame: 5, at: 3.5`
  - `frame: 6, at: 12.0`
  - `frame: 7, at: 23.0`

---

## 4. Preset 2: Empty list (`[]`, target 7) — 4 Frames

- **Total Frames**: 4 (indices `0` to `3`)
- **Result**: `(-1, 0)` (not in list, 0 comparisons)
- **Audio Clips**: 1 clip

### Clip 1: `01-empty-list-base-case.mp3`
- **Frames**: `0` – `3` (4 frames)
- **Measured Duration**: ~27.09s
- **Cues**:
  - `frame: 0, at: 0.0`
  - `frame: 1, at: 4.5`
  - `frame: 2, at: 10.0`
  - `frame: 3, at: 18.0`

---

## 5. Preset 3: All equal (7 x 5) (`[7, 7, 7, 7, 7]`, target 7) — 8 Frames

- **Total Frames**: 8 (indices `0` to `7`)
- **Result**: `(0, 2)` (first occurrence at index 0, 2 comparisons)
- **Audio Clips**: 2 clips

### Clip 1: `01-setup-and-call-one.mp3`
- **Frames**: `0` – `3` (4 frames)
- **Measured Duration**: ~25.18s
- **Cues**:
  - `frame: 0, at: 0.0`
  - `frame: 1, at: 7.5`
  - `frame: 2, at: 12.5`
  - `frame: 3, at: 17.5`

### Clip 2: `02-calls-two-and-three-and-apex.mp3`
- **Frames**: `4` – `7` (4 frames)
- **Measured Duration**: ~26.54s
- **Cues**:
  - `frame: 4, at: 0.0`
  - `frame: 5, at: 3.0`
  - `frame: 6, at: 11.5`
  - `frame: 7, at: 17.0`

---

## 6. Preset 4: Ten items, four 4s (`[1, 2, 2, 4, 4, 4, 4, 6, 9, 11]`, target 4) — 12 Frames

- **Total Frames**: 12 (indices `0` to `11`)
- **Result**: `(3, 4)` (first occurrence at index 3, 4 comparisons)
- **Audio Clips**: 2 clips

### Clip 1: `01-setup-and-calls-one-and-two.mp3`
- **Frames**: `0` – `5` (6 frames)
- **Measured Duration**: ~26.80s
- **Cues**:
  - `frame: 0, at: 0.0`
  - `frame: 1, at: 5.0`
  - `frame: 2, at: 9.0`
  - `frame: 3, at: 13.0`
  - `frame: 4, at: 17.5`
  - `frame: 5, at: 19.5`

### Clip 2: `02-calls-three-through-five-and-finish.mp3`
- **Frames**: `6` – `11` (6 frames)
- **Measured Duration**: ~33.70s
- **Cues**:
  - `frame: 6, at: 0.0`
  - `frame: 7, at: 2.5`
  - `frame: 8, at: 7.5`
  - `frame: 9, at: 10.0`
  - `frame: 10, at: 17.5`
  - `frame: 11, at: 23.5`

---

## 7. Custom Input Behavior

For custom arrays or targets, browser Speech Synthesis serves as a dynamic tutor reading frame captions in real-time, while matching recorded presets if the input matches any configured preset.
