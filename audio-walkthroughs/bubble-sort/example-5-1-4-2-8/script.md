# Script: Bubble Sort — Preset 0: Example [5, 1, 4, 2, 8]

- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Input**: `[5, 1, 4, 2, 8], ascending`
- **Total Frames**: 22 (0 – 21)
- **Comparisons**: 9
- **Swaps**: 4

## Segments

### 01-setup-and-pass-one.mp3 (Frames 0 – 10)
"Welcome to Bubble Sort in 3D. Bubble sort works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. With each complete pass, the largest remaining value bubbles up to its final position at the end. We begin with five items: five, one, four, two, eight. In pass one, we check four adjacent pairs. First, five is greater than one, so we swap them. Next, five is greater than four, triggering our second swap. Then, five is greater than two, swapping again. Finally, five is less than or equal to eight, so no swap is needed. Pass one concludes with three swaps, permanently locking the largest item, eight, in place at index four."

### 02-pass-two-bubbling-four.mp3 (Frames 11 – 16)
"Because swaps occurred in the previous pass, the algorithm launches pass two. Notice our optimization: because eight is already sorted, we only need to inspect three pairs. Comparing one and four, they are in order. Comparing four and two, four is greater, so we swap them, marking our fourth total swap. Comparing four and five, they are in order. Pass two concludes having placed the second-largest value, five, at index three."

### 03-pass-three-and-early-exit.mp3 (Frames 17 – 21)
"Pass three begins, testing only the remaining two pairs: positions zero through two. First, one and two are compared and found in order. Next, two and four are compared and found in order. Crucially, pass three completed with zero swaps! The swapped flag remains false, allowing the algorithm to execute an early break after nine comparisons rather than running redundant passes. The list is fully sorted in place, returning nine comparisons and four swaps."
