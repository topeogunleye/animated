# Subsets and Permutations in 3D (Bonus Lab): Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Solution 09b: Subsets and Permutations in 3D (Bonus Lab)** ([`09-subsets-and-permutations/Subsets and permutations in 3D-bonus.html`](../../09-subsets-and-permutations/Subsets%20and%20permutations%20in%203D-bonus.html)).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/subsets-and-permutations/`

---

## 2. Presets Overview

| Preset | Function / Items | Frames | Audio Clips | Status |
|---|---|:---:|:---:|:---:|
| **Preset 0: subsets([1, 2, 3])** | `subsets([1, 2, 3])` | 18 | 2 clips (`01`–`02`) | Completed |
| **Preset 1: permutations([1, 2, 3])** | `permutations([1, 2, 3])` | 34 | 3 clips (`01`–`03`) | Completed |
| **Preset 2: subsets_with_sum([1, 2, 3, 4], 5)** | `subsets_with_sum([1, 2, 3, 4], 5)` | 32 | 2 clips (`01`–`02`) | Completed |
| **Preset 3: subsets_with_sum([2, 4], 5): no match** | `subsets_with_sum([2, 4], 5)` | 10 | 1 clip (`01`) | Completed |
| **Preset 4: subsets_with_sum([-2, 1, 3], 1)** | `subsets_with_sum([-2, 1, 3], 1)` | 18 | 1 clip (`01`) | Completed |
| **Preset 5: subsets([]) edge case** | `subsets([])` | 4 | 1 clip (`01`) | Completed |
| **Preset 6: permutations([]) edge case** | `permutations([])` | 4 | 1 clip (`01`) | Completed |
| **Preset 7: subsets_with_sum([], 0) edge case** | `subsets_with_sum([], 0)` | 4 | 1 clip (`01`) | Completed |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
The bonus lab visualizes three classic combinatorial algorithms side by side:
1. `subsets(items)`: Recursive binary skip-or-take tree producing $2^n$ subsets.
2. `permutations(items)`: Backtracking search picking remaining items for prefix positions producing $n!$ orderings.
3. `subsets_with_sum(items, target)`: Subset search with running totals and nonnegative branch pruning.

### Visual State & Mechanics
1. **3D Item Pillars**: Elevated pillars showing each item with height proportional to value; highlighted in gold when active, green when included in `current`, and dimmed when skipped.
2. **Current Window Slab**: Translucent volumetric focus box spanning active elements.
3. **Prefix Display**: Floating bars in the foreground representing the active prefix list currently assembled.
4. **Live Status Badge**: Live status tag displaying accumulated subsets/permutations and running totals.

---

## 4. Clips & Audio Map

### Subsets ([1, 2, 3])
- `subsets-three/01-skip-one-branch.mp3` (Frames 0 – 9)
- `subsets-three/02-take-one-and-finish.mp3` (Frames 10 – 17)

### Permutations ([1, 2, 3])
- `permutations-three/01-place-one-branch.mp3` (Frames 0 – 13)
- `permutations-three/02-place-two-branch.mp3` (Frames 14 – 23)
- `permutations-three/03-place-three-and-finish.mp3` (Frames 24 – 33)

### Subset Sum ([1, 2, 3, 4], target 5)
- `subset-sum-match/01-skip-one-and-prune.mp3` (Frames 0 – 17)
- `subset-sum-match/02-take-one-and-finish.mp3` (Frames 18 – 31)

### Subset Sum Edge Cases & Negative Numbers
- `subset-sum-nomatch/01-no-match-walkthrough.mp3` (Frames 0 – 9)
- `subset-sum-negative/01-negative-items-walkthrough.mp3` (Frames 0 – 17)
- `subsets-empty/01-empty-subsets.mp3` (Frames 0 – 3)
- `permutations-empty/01-empty-permutations.mp3` (Frames 0 – 3)
- `subset-sum-empty/01-empty-subset-sum.mp3` (Frames 0 – 3)

---

## 5. Verification Suite

All presets and custom modes are verified via headless Chrome CDP in [`scratch/test_subsets_permutations_bonus_walkthrough.mjs`](../../scratch/test_subsets_permutations_bonus_walkthrough.mjs).
