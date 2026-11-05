# Spoken Script: [1, 2, 3, 4]

## Voice
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Tone**: Engaging, educational, comprehensive power set traversal across 16 subsets

---

### Clip 1: `01-skip-one-and-two.mp3`
**Frames**: 0 – 23
**Text**:
> "Welcome to the full 4-element power set walkthrough for items 1, 2, 3, and 4. With four elements, the binary choice tree spans depth 4, generating 2 to the fourth, or 16 subsets. We begin by taking the skip branch for item 1 and item 2. Deep in the tree at items 3 and 4, we evaluate all combinations: skipping both gives the empty set; including 4 gives [4]; including 3 and skipping 4 gives [3]; and including both gives [3, 4]. We pop back to depth 1 having collected our first four subsets."

---

### Clip 2: `02-include-two-branch.mp3`
**Frames**: 24 – 45
**Text**:
> "At depth 1, we now take the include branch for item 2, keeping item 1 skipped. We descend the remaining choices for items 3 and 4: skipping both reveals [2]; including 4 uncovers [2, 4]; including 3 reveals [2, 3]; and including 3 and 4 yields [2, 3, 4]. Popping our stack back to depth 0 brings us to eight subsets—completing the entire first half of the power set."

---

### Clip 3: `03-include-one-skip-two.mp3`
**Frames**: 46 – 67
**Text**:
> "Now at depth 0, we enter the second half of the tree by including item 1. We first skip item 2 and explore items 3 and 4: skipping both yields [1]; including 4 gives [1, 4]; including 3 gives [1, 3]; and including both produces [1, 3, 4]. After unwinding these calls, we have twelve subsets in total."

---

### Clip 4: `04-include-one-and-two-finish.mp3`
**Frames**: 68 – 92
**Text**:
> "Finally, at depth 1, we include both item 1 and item 2. Navigating our final leaves yields [1, 2], [1, 2, 4], [1, 2, 3], and the complete set [1, 2, 3, 4]. With all sixteen leaves recorded, the recursion unwinds completely back to the caller. Subsets returns 16 subsets—flawlessly validating 2 to the fourth equals 16."
