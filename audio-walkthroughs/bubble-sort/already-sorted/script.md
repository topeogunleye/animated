# Script: Bubble Sort — Preset 1: Already sorted (best case)

- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Input**: `[1, 2, 3, 4, 5], ascending`
- **Total Frames**: 9 (0 – 8)
- **Comparisons**: 4
- **Swaps**: 0

## Segments

### 01-setup-and-single-pass.mp3 (Frames 0 – 6)
"We now examine the optimal best-case scenario for Bubble Sort: an array that is already sorted in ascending order from one to five. The algorithm initializes comparisons and swaps to zero and starts pass one. It compares one and two: in order. Two and three: in order. Three and four: in order. And four and five: in order. Four comparisons are made, but not a single swap was needed."

### 02-early-break-and-best-case.mp3 (Frames 7 – 8)
"Because the swapped flag remained false throughout the entire pass, the early termination condition triggers immediately. Rather than blindly executing additional quadratic loops, the sort breaks out after just four comparisons. This demonstrates why the swapped flag provides an optimal big-O of n best-case time complexity, returning four comparisons and zero swaps."
