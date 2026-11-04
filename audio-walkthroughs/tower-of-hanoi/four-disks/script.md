# Script: Tower of Hanoi — Preset 2: n = 4

- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Input**: `4, 'A', 'C', 'B'`
- **Total Frames**: 62 (0 – 61)
- **Moves**: 15 ($2^4 - 1$)

## Segments

### 01-setup-and-four-disk-strategy.mp3 (Frames 0 – 5)
"We now tackle the four-disk Tower of Hanoi puzzle. To transfer all four disks from peg A to peg C, our master strategy requires three macroscopic phases: first, park the top three disks onto helper peg B; second, transfer base disk four onto target peg C; and third, reassemble the three disks on peg C. Watch the call stack dive: hanoi of four spawns hanoi of three, then two, then one, until hanoi of zero reaches the base case without moving a disk."

### 02-parking-three-disks-on-b.mp3 (Frames 6 – 30)
"Now the subproblem unfolds over moves one through seven. Move one sends disk one from A to B. Move two moves disk two from A to C. In move three, disk one jumps onto C. Move four places disk three onto helper peg B. Next, moves five, six, and seven transfer disks one and two over to join disk three on peg B. Seven moves are complete: the top three disks are cleanly parked in ascending order on helper peg B, leaving base disk four fully exposed on peg A!"

### 03-transferring-disk-four.mp3 (Frames 31 – 45)
"With the runway wide open, we execute move eight: the central milestone where disk four journeys from source peg A to target peg C. Disk four has reached its permanent home! Next begins the second subproblem: hanoi of three from peg B to peg C using peg A as the helper. Through moves nine, ten, and eleven, disks one and two shift onto peg A, clearing the way for disk three."

### 04-restacking-and-final-assembly.mp3 (Frames 46 – 61)
"In move twelve, disk three transfers from helper peg B to peg C, landing on disk four. Finally, hanoi of two brings the remaining two disks home: move thirteen sends disk one to peg B, move fourteen puts disk two onto peg C, and in move fifteen, disk one caps the summit! Seven plus one plus seven yields exactly fifteen moves. Two to the fourth minus one is fulfilled, and the four-disk tower stands complete!"
