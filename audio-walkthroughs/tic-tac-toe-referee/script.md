# Tic-Tac-Toe Referee in 3D: Voice Walkthrough Master Script

An educational audio walkthrough for the 3D interactive visualizations of the Tic-Tac-Toe Referee algorithm in:
- [`14-tic-tac-toe-referee/Tic-Tac-Toe referee in 3D, step by step.html`](../../14-tic-tac-toe-referee/Tic-Tac-Toe%20referee%20in%203D%2C%20step%20by%20step.html)
- [`14-tic-tac-toe-referee/Tic-Tac-Toe referee in 3D, every line of code.html`](../../14-tic-tac-toe-referee/Tic-Tac-Toe%20referee%20in%203D%2C%20every%20line%20of%20code.html)

This script provides guided voiceover walkthroughs for the two primary presets:
1. **Preset 0 ("X wins (top row)")**: Demonstrates immediate win detection on the very first pass.
2. **Preset 1 ("O wins (diagonal)")**: Demonstrates the full multi-pass referee workflow across rows, columns, and diagonal inspection.

---

## 1. Verified Algorithm Ground Truth

### Core Invariant
- In a $3 \times 3$ grid, only **8 lines** can win: 3 rows, 3 columns, and 2 diagonals.
- A single loop `for i in range(3):` evaluates row $i$ and column $i$ concurrently in pass $i$.
- Diagonals are only evaluated if the center square (`board[1][1]`) is non-empty, as every diagonal must pass through the center.
- If no line wins, a secondary scan inspects each row for empty spaces (`" " in row`) to distinguish between `"In progress"` and `"Draw"`.

### Python Source Code

```python
 1: def game_status(board):
 2:     for i in range(3):
 3:         if board[i][0] != " " and board[i][0] == board[i][1] == board[i][2]:
 4:             return board[i][0] + " wins"
 5:         if board[0][i] != " " and board[0][i] == board[1][i] == board[2][i]:
 6:             return board[0][i] + " wins"
 7:     if board[1][1] != " ":
 8:         if board[0][0] == board[1][1] == board[2][2]:
 9:             return board[1][1] + " wins"
10:         if board[0][2] == board[1][1] == board[2][0]:
11:             return board[1][1] + " wins"
12:     for row in board:
13:         if " " in row:
14:             return "In progress"
15:     return "Draw"
```

---

## 2. Audio Segment Table

| Filename | Preset & Milestone | Step by Step Cues | Every Line Cues | Spoken Text | Chars |
|:---|:---|:---:|:---:|:---|:---:|
| `01-x-wins-top-row.mp3` | **Preset 0: Top Row Immediate Win** | Frame 0 (t=0.0s)<br>Frame 1 (t=10.0s) | Frame 0 (t=0.0s)<br>Frame 1 (t=9.5s)<br>Frame 2 (t=13.5s)<br>Frame 3 (t=18.0s) | Welcome to Tic-Tac-Toe Referee in 3D. To evaluate any board, a referee only needs to inspect eight lines: three rows, three columns, and two diagonals. In our loop, each pass checks a row and a column together. On pass one with index zero, we examine row zero. All three squares contain an X, and none are empty. Three matching symbols in a line means a win, so the referee immediately returns 'X wins'. | 414 |
| `02-o-wins-setup-and-pass-zero.mp3` | **Preset 1: Milestone 1/3 (Setup & Pass Zero)** | Frame 0 (t=0.0s)<br>Frame 1 (t=7.0s)<br>Frame 2 (t=12.5s) | Frame 0 (t=0.0s)<br>Frame 1 (t=3.5s)<br>Frame 2 (t=7.0s)<br>Frame 3 (t=12.5s) | Now let us referee a full match where player O takes the victory. The referee begins by checking row zero and column zero in pass one. Row zero holds O, X, X: the squares are not all identical, so no win here. Next, column zero holds O, X, and an empty square. It is not three of the same, so column zero fails as well. | 318 |
| `03-o-wins-passes-one-and-two.mp3` | **Preset 1: Milestone 2/3 (Passes One & Two)** | Frame 3 (t=0.0s)<br>Frame 4 (t=4.5s)<br>Frame 5 (t=9.0s)<br>Frame 6 (t=13.5s) | Frame 4 (t=0.0s)<br>Frame 5 (t=1.8s)<br>Frame 6 (t=5.0s)<br>Frame 7 (t=8.5s)<br>Frame 8 (t=10.0s)<br>Frame 9 (t=14.0s) | The loop continues into pass two, testing index one. Row one has X, O, and an empty square, while column one has X, O, and an empty square. Neither line wins. In pass three at index two, row two starts with an empty square, so it cannot win, and column two has X, empty, and O. With all three rows and three columns exhausted, no player has won along the grid. | 369 |
| `04-o-wins-diagonal-victory.mp3` | **Preset 1: Milestone 3/3 (Diagonal Victory)** | Frame 7 (t=0.0s) | Frame 10 (t=0.0s)<br>Frame 11 (t=9.0s)<br>Frame 12 (t=14.0s) | With rows and columns clear, the referee moves to the diagonals. Because every diagonal must pass through the centre square, we first check that position. It contains an O, so diagonals are worth testing. Looking down the main diagonal from top left to bottom right, we find three O's in a row. Player O wins the match! | 327 |

---

## 3. Continuous Narration Script

### Preset 0 Walkthrough
> Welcome to Tic-Tac-Toe Referee in 3D. To evaluate any board, a referee only needs to inspect eight lines: three rows, three columns, and two diagonals. In our loop, each pass checks a row and a column together. On pass one with index zero, we examine row zero. All three squares contain an X, and none are empty. Three matching symbols in a line means a win, so the referee immediately returns 'X wins'.

### Preset 1 Walkthrough
> Now let us referee a full match where player O takes the victory. The referee begins by checking row zero and column zero in pass one. Row zero holds O, X, X: the squares are not all identical, so no win here. Next, column zero holds O, X, and an empty square. It is not three of the same, so column zero fails as well.
>
> The loop continues into pass two, testing index one. Row one has X, O, and an empty square, while column one has X, O, and an empty square. Neither line wins. In pass three at index two, row two starts with an empty square, so it cannot win, and column two has X, empty, and O. With all three rows and three columns exhausted, no player has won along the grid.
>
> With rows and columns clear, the referee moves to the diagonals. Because every diagonal must pass through the centre square, we first check that position. It contains an O, so diagonals are worth testing. Looking down the main diagonal from top left to bottom right, we find three O's in a row. Player O wins the match!

---

## 4. Voice Configuration

- **Voice**: `Lauren` (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`
- **Stability**: `0.50`
- **Similarity**: `0.75`
- **Style**: `0.0`
- **Speaker Boost**: `true`
- **Total Characters**: 1,428 characters
