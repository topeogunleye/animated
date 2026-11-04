# Educational Voice Script: n = 1 (`n = 1`)

- **Topic**: Tower of Hanoi (single disk base case)
- **Input**: `n = 1, source = 'A', target = 'C', helper = 'B'`
- **Output**: `[('A', 'C')]` (1 move)
- **Frames**: 6 (0 to 5)
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`

---

## Segment 1: Setup and Base Cases (`01-setup-and-base-cases.mp3`)
**Frames**: 0 to 2
**Cues**:
- `0.0s`: Frame 0 (Key idea)
- `14.0s`: Frame 1 (hanoi(1, A, C, B): n is 1, not 0, recurse on 0 disks above it)
- `21.0s`: Frame 2 (hanoi(0, A, B, C): n is 0, return [] base case)

**Text**:
> "Welcome to the Tower of Hanoi. The classic puzzle asks us to move a stack of disks from source peg A to target peg C, using helper peg B, never placing a larger disk onto a smaller one. The master recursive strategy is threefold: park the top n minus one disks on the helper, transfer the largest disk directly to the target, and finally restack the n minus one disks on top. With n equals one, we enter hanoi of one from A to C. Because n is one, the algorithm first calls hanoi of zero to simulate moving any disks above disk one. Zero disks require zero moves, returning an empty list immediately."

---

## Segment 2: Single Move and Return (`02-single-move-and-return.mp3`)
**Frames**: 3 to 5
**Cues**:
- `0.0s`: Frame 3 (Back in hanoi(1): move disk 1 from A to C)
- `7.5s`: Frame 4 (hanoi(0, B, C, A): n is 0, return [])
- `13.0s`: Frame 5 (hanoi(1) returns [('A', 'C')], 1 move total)

**Text**:
> "Returning to hanoi of one, we execute the middle step: moving disk one directly from peg A to target peg C. Next, we recurse on the trailing subproblem, hanoi of zero, to restack disks from the helper onto the target. As before, zero disks return an empty move list. We combine the first part, the middle move, and the last part, returning exactly one move. With two to the first minus one equals one move completed, the single-disk base case is solved."
