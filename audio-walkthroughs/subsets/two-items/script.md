# Spoken Script: [1, 2]

## Voice
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Tone**: Engaging, educational, clear breakdown of 2-item recursive tree

---

### Clip 1: `01-skip-one-branch.mp3`
**Frames**: 0 – 9
**Text**:
> "Here we examine a two-element list with items 1 and 2. We start at depth 0, evaluating item 1. Choosing the skip branch, we proceed to depth 1 without 1. Next, at depth 1, we skip 2 as well. Reaching depth 2 with all choices made, we save our first subset: the empty set. Backtracking to depth 1, we now test the include branch for item 2, reaching depth 2 to record our second subset: [2]. We pop 2 to restore our current state, and return upward."

---

### Clip 2: `02-include-one-and-finish.mp3`
**Frames**: 10 – 20
**Text**:
> "Back at depth 0, we now explore the include branch, appending item 1. At depth 1, skipping 2 leads to the base case, capturing our third subset: [1]. Then, including 2 produces our fourth subset: [1, 2]. We pop 2 and then pop 1, returning all branches to the top level. The function completes, returning four subsets—confirming 2 squared equals 4."
