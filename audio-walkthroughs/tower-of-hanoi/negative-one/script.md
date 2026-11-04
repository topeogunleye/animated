# Script: Tower of Hanoi — Preset 5: n = -1 (error branch)

- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Input**: `-1, 'A', 'C', 'B'`
- **Total Frames**: 4 (0 – 3)
- **Result**: `ValueError("n must be non-negative")`

## Segments

### 01-setup-and-guard-check.mp3 (Frames 0 – 1)
"In this scenario, hanoi is invoked with n equals negative one. A negative disk count is physically impossible and invalid for the puzzle. Before allocating memory or recursing, our initial guard clause if n less than zero evaluates to true."

### 02-raising-value-error.mp3 (Frames 2 – 3)
"The function executes raise ValueError with the descriptive message that n must be non-negative. Because the exception is uncaught within hanoi, it halts execution and propagates up the call stack to the caller, preventing illegal disk operations."
