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
| **Preset 2: n = 4** | `4, 'A', 'C', 'B'` | 15 | 62 | 4 clips (`01`–`04`) | Completed |
| **Preset 3: n = 5** | `5, 'A', 'C', 'B'` | 31 | 126 | 4 clips (`01`–`04`) | Completed |
| **Preset 4: n = 0 (no disks)** | `0, 'A', 'C', 'B'` | 0 | 2 | 1 clip (`01`) | Completed |
| **Preset 5: n = -1 (error branch)** | `-1, 'A', 'C', 'B'` | Error | 4 | 2 clips (`01`–`02`) | Completed |

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

---

## 6. Preset 2: "n = 4" (`n = 4`)

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-four-disk-strategy` | `01-setup-and-four-disk-strategy.mp3` | 0 – 5 | "We now tackle the four-disk Tower of Hanoi puzzle. To transfer all four disks from peg A to peg C, our master strategy requires three macroscopic phases: first, park the top three disks onto helper peg B; second, transfer base disk four onto target peg C; and third, reassemble the three disks on peg C. Watch the call stack dive: hanoi of four spawns hanoi of three, then two, then one, until hanoi of zero reaches the base case without moving a disk." |
| `02-parking-three-disks-on-b` | `02-parking-three-disks-on-b.mp3` | 6 – 30 | "Now the subproblem unfolds over moves one through seven. Move one sends disk one from A to B. Move two moves disk two from A to C. In move three, disk one jumps onto C. Move four places disk three onto helper peg B. Next, moves five, six, and seven transfer disks one and two over to join disk three on peg B. Seven moves are complete: the top three disks are cleanly parked in ascending order on helper peg B, leaving base disk four fully exposed on peg A!" |
| `03-transferring-disk-four` | `03-transferring-disk-four.mp3` | 31 – 45 | "With the runway wide open, we execute move eight: the central milestone where disk four journeys from source peg A to target peg C. Disk four has reached its permanent home! Next begins the second subproblem: hanoi of three from peg B to peg C using peg A as the helper. Through moves nine, ten, and eleven, disks one and two shift onto peg A, clearing the way for disk three." |
| `04-restacking-and-final-assembly` | `04-restacking-and-final-assembly.mp3` | 46 – 61 | "In move twelve, disk three transfers from helper peg B to peg C, landing on disk four. Finally, hanoi of two brings the remaining two disks home: move thirteen sends disk one to peg B, move fourteen puts disk two onto peg C, and in move fifteen, disk one caps the summit! Seven plus one plus seven yields exactly fifteen moves. Two to the fourth minus one is fulfilled, and the four-disk tower stands complete!" |

---

## 7. Preset 3: "n = 5" (`n = 5`)

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-exponential-scale` | `01-setup-and-exponential-scale.mp3` | 0 – 31 | "Welcome to the five-disk Tower of Hanoi. Here we witness the rapid exponential growth of the puzzle: two to the fifth minus one equals thirty-one distinct moves! The top four disks must first be parked on helper peg B so base disk five can reach peg C. As the call stack descends five levels deep, physical movements begin. Moves one through seven maneuver disks one, two, and three into their first intermediate arrangement, demonstrating the self-similar fractal nature of recursive decomposition." |
| `02-clearing-four-disks-to-b` | `02-clearing-four-disks-to-b.mp3` | 32 – 62 | "In move eight, disk four steps across to helper peg B. Through moves nine through fifteen, the smaller three-disk pyramid is systematically disassembled and rebuilt atop disk four on peg B. Notice the state after move fifteen: fifteen individual moves have been executed, and all four top disks are resting in perfect order on helper peg B. Source peg A holds only disk five, and target peg C is completely clear!" |
| `03-transferring-disk-five` | `03-transferring-disk-five.mp3` | 63 – 93 | "Move sixteen is the crowning centerpiece of the five-disk puzzle: the largest disk, disk five, moves majestically from peg A to target peg C. Halfway through our thirty-one move journey, the base is anchored! Now the entire fifteen-move process mirrors in reverse, transferring the four disks from helper peg B to peg C. Moves seventeen through twenty-three cycle the three smallest disks over to peg A, setting up the transfer of disk four." |
| `04-final-tower-assembly` | `04-final-tower-assembly.mp3` | 94 – 125 | "In move twenty-four, disk four moves onto peg C above disk five. Then, the final seven-move sequence begins: disk three joins the main tower in move twenty-eight, followed by disks two and one. In move thirty-one, the final disk clicks into place on peg C. Fifteen moves to park the top, one move for the giant, and fifteen moves to reassemble: exactly thirty-one moves. Our five-disk tower is flawlessly complete!" |

---

## 8. Preset 4: "n = 0 (no disks)" (`n = 0`)

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-zero-disks-base-case` | `01-zero-disks-base-case.mp3` | 0 – 1 | "When n is zero, the puzzle begins with an empty source peg. Following the recursive definition, the condition if n equals zero evaluates to true immediately, returning an empty list of moves with no peg transfers. Mathematically, two to the power of zero minus one is zero, confirming that zero moves are required. This base case is the foundation that allows every higher recursion to terminate cleanly." |

---

## 9. Preset 5: "n = -1 (error branch)" (`n = -1`)

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-guard-check` | `01-setup-and-guard-check.mp3` | 0 – 1 | "In this scenario, hanoi is invoked with n equals negative one. A negative disk count is physically impossible and invalid for the puzzle. Before allocating memory or recursing, our initial guard clause if n less than zero evaluates to true." |
| `02-raising-value-error` | `02-raising-value-error.mp3` | 2 – 3 | "The function executes raise ValueError with the descriptive message that n must be non-negative. Because the exception is uncaught within hanoi, it halts execution and propagates up the call stack to the caller, preventing illegal disk operations." |

