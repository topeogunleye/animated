# Tower of Hanoi: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Solution 05: Tower of Hanoi in 3D** (`05-tower-of-hanoi/Tower of Hanoi in 3D, step by step.html`).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/tower-of-hanoi/`

---

## 2. Presets Overview

| Preset | Input | Moves ($2^n - 1$) | Frames | Audio Clips | Status |
|---|---|:---:|:---:|:---:|:---:|
| **Preset 0: n = 1** | `1, 'A', 'C', 'B'` | 1 | 6 | 2 clips (`01`–`02`) | Completed |
| **Preset 1: n = 3 (the classic)** | `3, 'A', 'C', 'B'` | 7 | 30 | 4 clips (`01`–`04`) | Completed |
| **Preset 2: n = 4** | `4, 'A', 'C', 'B'` | 15 | 62 | 4 clips (`01`–`04`) | Planned |
| **Preset 3: n = 5** | `5, 'A', 'C', 'B'` | 31 | 126 | 4 clips (`01`–`04`) | Planned |
| **Preset 4: n = 0 (no disks)** | `0, 'A', 'C', 'B'` | 0 | 2 | 1 clip (`01`) | Planned |
| **Preset 5: n = -1 (error branch)** | `-1, 'A', 'C', 'B'` | Error | 4 | 2 clips (`01`–`02`) | Planned |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
```python
def hanoi(n, source, target, helper):
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return []
    first_part = hanoi(n - 1, source, helper, target)
    middle_part = [(source, target)]
    last_part = hanoi(n - 1, helper, target, source)
    return first_part + middle_part + last_part
```

### Visual State & Mechanics
1. **Three 3D Pegs**: Peg A (source, left), Peg B (helper, center), and Peg C (target, right).
2. **Disks with Cylindrical Physics**: Colored disks with decreasing diameters stacked in non-increasing order.
3. **Call Stack Visualization**: A 3D call-stack rack on the right side of the canvas dynamically stacks frames showing `hanoi(m, s, t, h)` with active frame highlighting.
4. **Move Counter**: Live counter tracking moves $1 \le k \le 2^n - 1$.

---

## 4. Preset 0: "n = 1" (`n = 1`)

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-base-cases` | `01-setup-and-base-cases.mp3` | 0 – 2 | "Welcome to the Tower of Hanoi. The classic puzzle asks us to move a stack of disks from source peg A to target peg C, using helper peg B, never placing a larger disk onto a smaller one. The master recursive strategy is threefold: park the top n minus one disks on the helper, transfer the largest disk directly to the target, and finally restack the n minus one disks on top. With n equals one, we enter hanoi of one from A to C. Because n is one, the algorithm first calls hanoi of zero to simulate moving any disks above disk one. Zero disks require zero moves, returning an empty list immediately." |
| `02-single-move-and-return` | `02-single-move-and-return.mp3` | 3 – 5 | "Returning to hanoi of one, we execute the middle step: moving disk one directly from peg A to target peg C. Next, we recurse on the trailing subproblem, hanoi of zero, to restack disks from the helper onto the target. As before, zero disks return an empty move list. We combine the first part, the middle move, and the last part, returning exactly one move. With two to the first minus one equals one move completed, the single-disk base case is solved." |

---

## 5. Preset 1: "n = 3" (`n = 3`, The Classic)

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-recursive-strategy` | `01-setup-and-recursive-strategy.mp3` | 0 – 4 | "We now explore the classic three-disk Tower of Hanoi puzzle. Our mission is to transfer all three disks from peg A to peg C using helper peg B. To free our largest disk, disk three, we must first park the top two disks on helper peg B. To park those two disks on B, we must first park disk one on peg C. Watch the call stack build on the right: hanoi of three spawns hanoi of two, which spawns hanoi of one, which reaches our base case hanoi of zero. The base case returns an empty list, and our physical disk movements begin." |
| `02-parking-top-disks-on-b` | `02-parking-top-disks-on-b.mp3` | 5 – 14 | "In move one, disk one moves from peg A to peg C. Returning from hanoi of one, we reach move two: transferring disk two from peg A to peg B. Now, to place disk one on top of disk two on peg B, we launch hanoi of one from C to B using A as the helper. In move three, disk one transfers from peg C onto peg B. Notice the intermediate state: the top two disks are now cleanly parked on peg B in sorted order, leaving peg A with only the giant disk three, and leaving target peg C completely empty!" |
| `03-transferring-disk-three` | `03-transferring-disk-three.mp3` | 15 – 21 | "With the runway clear, we execute move four: the pivotal transition where disk three moves from source peg A to target peg C. Our largest disk is permanently home! Now begins the mirror subproblem: hanoi of two from peg B to peg C, using peg A as the helper. To free disk two, we must first park disk one on peg A. In move five, disk one moves from peg B to peg A. Disk two is now uncovered on peg B, ready to move." |
| `04-reassembling-and-final-return` | `04-reassembling-and-final-return.mp3` | 22 – 29 | "In move six, disk two moves from peg B onto target peg C, resting comfortably on disk three. Finally, we invoke hanoi of one to bring disk one from peg A onto peg C. In move seven, disk one lands on top, fully reassembling the tower. The recursive calls collapse up the stack: three moves plus one plus three equals exactly seven moves. Two to the third minus one is satisfied, and our three-disk journey is triumphantly complete!" |
