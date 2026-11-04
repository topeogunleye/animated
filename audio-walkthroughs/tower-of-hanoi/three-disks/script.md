# Educational Voice Script: n = 3 (`n = 3`, The Classic)

- **Topic**: Tower of Hanoi (classic 3-disk problem)
- **Input**: `n = 3, source = 'A', target = 'C', helper = 'B'`
- **Output**: 7 moves ($2^3 - 1 = 7$)
- **Frames**: 30 (0 to 29)
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`

---

## Segment 1: Setup and Recursive Strategy (`01-setup-and-recursive-strategy.mp3`)
**Frames**: 0 to 4
**Cues**:
- `0.0s`: Frame 0 (Key idea)
- `14.0s`: Frame 1 (hanoi(3, A, C, B): park 2 disks on B)
- `21.0s`: Frame 2 (hanoi(2, A, B, C): park 1 disk on C)
- `27.5s`: Frame 3 (hanoi(1, A, C, B): recurse on 0 disks above it)
- `34.0s`: Frame 4 (hanoi(0, A, B, C): base case return [])

**Text**:
> "We now explore the classic three-disk Tower of Hanoi puzzle. Our mission is to transfer all three disks from peg A to peg C using helper peg B. To free our largest disk, disk three, we must first park the top two disks on helper peg B. To park those two disks on B, we must first park disk one on peg C. Watch the call stack build on the right: hanoi of three spawns hanoi of two, which spawns hanoi of one, which reaches our base case hanoi of zero. The base case returns an empty list, and our physical disk movements begin."

---

## Segment 2: Parking the Top Two Disks on Peg B (`02-parking-top-disks-on-b.mp3`)
**Frames**: 5 to 14
**Cues**:
- `0.0s`: Frame 5 (Move 1: disk 1 from A to C)
- `6.0s`: Frame 7 (hanoi(1) returns 1 move)
- `10.0s`: Frame 8 (Move 2: disk 2 from A to B)
- `16.0s`: Frame 9 (hanoi(1, C, B, A) enter)
- `21.0s`: Frame 11 (Move 3: disk 1 from C to B)
- `28.0s`: Frame 13 (hanoi(1) returns 1 move)
- `32.5s`: Frame 14 (hanoi(2) returns 3 moves)

**Text**:
> "In move one, disk one moves from peg A to peg C. Returning from hanoi of one, we reach move two: transferring disk two from peg A to peg B. Now, to place disk one on top of disk two on peg B, we launch hanoi of one from C to B using A as the helper. In move three, disk one transfers from peg C onto peg B. Notice the intermediate state: the top two disks are now cleanly parked on peg B in sorted order, leaving peg A with only the giant disk three, and leaving target peg C completely empty!"

---

## Segment 3: Moving the Largest Disk and Reorienting (`03-transferring-disk-three.mp3`)
**Frames**: 15 to 21
**Cues**:
- `0.0s`: Frame 15 (Move 4: disk 3 from A to C)
- `9.0s`: Frame 16 (hanoi(2, B, C, A) enter)
- `16.0s`: Frame 17 (hanoi(1, B, A, C) enter)
- `21.0s`: Frame 19 (Move 5: disk 1 from B to A)
- `28.0s`: Frame 21 (hanoi(1) returns 1 move)

**Text**:
> "With the runway clear, we execute move four: the pivotal transition where disk three moves from source peg A to target peg C. Our largest disk is permanently home! Now begins the mirror subproblem: hanoi of two from peg B to peg C, using peg A as the helper. To free disk two, we must first park disk one on peg A. In move five, disk one moves from peg B to peg A. Disk two is now uncovered on peg B, ready to move."

---

## Segment 4: Reassembling and Final Return (`04-reassembling-and-final-return.mp3`)
**Frames**: 22 to 29
**Cues**:
- `0.0s`: Frame 22 (Move 6: disk 2 from B to C)
- `6.0s`: Frame 23 (hanoi(1, A, C, B) enter)
- `11.0s`: Frame 25 (Move 7: disk 1 from A to C)
- `17.5s`: Frame 27 (hanoi(1) returns 1 move)
- `21.0s`: Frame 28 (hanoi(2) returns 3 moves)
- `25.0s`: Frame 29 (hanoi(3) returns 7 moves total)

**Text**:
> "In move six, disk two moves from peg B onto target peg C, resting comfortably on disk three. Finally, we invoke hanoi of one to bring disk one from peg A onto peg C. In move seven, disk one lands on top, fully reassembling the tower. The recursive calls collapse up the stack: three moves plus one plus three equals exactly seven moves. Two to the third minus one is satisfied, and our three-disk journey is triumphantly complete!"
