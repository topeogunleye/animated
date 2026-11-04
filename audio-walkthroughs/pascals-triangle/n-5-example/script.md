# Spoken Script: n = 5 (example)

## Voice
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Tone**: Clear, educational, engaging, emphasizing parent-sum recurrence

---

### Clip 1: `01-setup-and-rows-zero-to-one.mp3`
**Frames**: 0 – 8
**Text**:
> "Welcome to Pascal's Triangle in 3D. The fundamental property of Pascal's triangle is that every interior cell is the direct sum of the two cells directly above it, while the outer boundaries are always ones. We initialize an empty list called rows to construct five rows row by row. Row zero begins with a single cell at index zero. Because it is an edge, we append one and finish row zero. Row one holds two cells: indices zero and one are both boundaries, so both receive ones, giving us the row one, one."

---

### Clip 2: `02-rows-two-and-three.mp3`
**Frames**: 9 – 19
**Text**:
> "In row two, we see the additive recurrence take effect for the first time. The left edge cell receives one. For the interior cell at column one, the algorithm looks up to the previous row and adds one plus one to get two. The right edge receives one, completing row two as one, two, one. Moving to row three, the edges are one, while column one sums one plus two to yield three, and column two sums two plus one to yield three, finishing row three as one, three, three, one."

---

### Clip 3: `03-row-four-and-completion.mp3`
**Frames**: 20 – 28
**Text**:
> "Finally, row four starts with an edge of one. The interior cells compute one plus three equals four, three plus three equals six, and three plus one equals four, followed by the terminating edge of one. Row four appends one, four, six, four, one. All five rows are now completely assembled, totaling fifteen cells. The outer loop terminates, and the function returns the completed list of rows."
