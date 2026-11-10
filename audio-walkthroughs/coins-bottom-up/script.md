# Coins, Bottom-Up, in 3D: Voice Walkthrough Master Script

An educational audio walkthrough for the 3D interactive visualizations of bottom-up Dynamic Programming for coin change in [`15-coins-bottom-up/Coins, bottom-up, in 3D.html`](../../15-coins-bottom-up/Coins%2C%20bottom-up%2C%20in%203D.html).

This script provides guided voiceover walkthroughs for:
1. **`count_ways_dp(amount, coins)` (Preset 0: `count 5 with [1, 2, 5] -> 4`)**: Explains unbounded knapsack combination counting, the base case `ways[0] = 1`, and why looping over coins externally avoids permutation duplicates.
2. **`min_coins(amount, coins)` (Preset 1: `min 11 with [1, 2, 5] -> 3`)**: Explains finding the fewest coins, initializing with infinity, and optimal substructure.

---

## 1. Verified Algorithm Ground Truth

### Python Source Code

```python
 1: def count_ways_dp(amount, coins):
 2:     ways = [0] * (amount + 1)
 3:     ways[0] = 1
 4:     for c in coins:
 5:         if c > amount:
 6:             continue
 7:         for a in range(c, amount + 1):
 8:             ways[a] += ways[a - c]
 9:     return ways[amount]
10: 
11: def min_coins(amount, coins):
12:     INF = amount + 1
13:     best = [INF] * (amount + 1)
14:     best[0] = 0
15:     for a in range(1, amount + 1):
16:         for c in coins:
17:             if c <= a and best[a - c] + 1 < best[a]:
18:                 best[a] = best[a - c] + 1
19:     return best[amount] if best[amount] < INF else -1
```

---

## 2. Audio Segment Table

| Filename | Preset & Milestone | Cues / Frames | Spoken Text | Chars |
|:---|:---|:---:|:---|:---:|
| `01-table-setup-and-coin-one.mp3` | **Preset 0: Milestone 1/3** (Setup & Coin 1) | Frame 0 (t=0.0s)<br>Frame 1 (t=27.0s)<br>Frame 2 (t=37.0s)<br>Frame 3 (t=40.0s)<br>Frame 4 (t=43.0s)<br>Frame 5 (t=46.0s)<br>Frame 6 (t=49.0s) | Welcome to Coins Bottom-Up in 3D. We begin with dynamic programming to count how many distinct coin combinations can make an amount of five using coins of one, two, and five. We allocate our table, ways, with six slots from zero to five. The base case, ways zero, is set to one, because there is exactly one way to make zero: use no coins. In this algorithm, the outer loop iterates over coins one at a time. This guarantees combinations are counted without permutation duplicates, so one plus two and two plus one are never double counted. We sweep coin one across amounts one through five: each amount can be made in exactly one way using only ones. | 692 |
| `02-allowing-coin-two.mp3` | **Preset 0: Milestone 2/3** (Allowing Coin 2) | Frame 7 (t=0.0s)<br>Frame 8 (t=11.0s)<br>Frame 9 (t=17.0s)<br>Frame 10 (t=22.0s)<br>Frame 11 (t=28.0s) | Now we introduce the two-cent coin. For each amount from two up to five, we look back two steps, labeled FROM, and add those combinations into our current gold cell, labeled NOW. For amount two, one way before plus one way to make zero gives two ways. For amount three, we add the way to make one, giving two ways. At amount four, one previous way plus two ways to make two yields three combinations. And at amount five, one plus two yields three combinations. | 459 |
| `03-allowing-coin-five-and-result.mp3` | **Preset 0: Milestone 3/3** (Coin 5 & Result) | Frame 12 (t=0.0s)<br>Frame 13 (t=4.0s)<br>Frame 14 (t=21.0s) | Finally, we allow the five-cent coin. Since five equals our target, we look back five steps to amount zero. Three previous combinations plus one way to make zero gives four total ways: all ones, one plus two plus two, one plus one plus one plus two, or a single five. Every cell was filled in bottom-up order with zero repeated work, returning four combinations. | 361 |
| `04-min-coins-overview.mp3` | **Preset 1: Fewest Coins Overview** | Frame 0 (t=0.0s)<br>Frame 15 (t=14.0s)<br>Frame 30 (t=20.0s)<br>Frame 34 (t=24.0s) | In our second function, min coins, the goal shifts from counting combinations to finding the absolute fewest coins needed. Here, the outer loop steps through amounts from one to eleven, while the inner loop evaluates every coin option. Unreachable amounts start at infinity. By building optimal sub-problems bottom up, amount eleven combines a five-coin with the optimal two coins for amount six, returning three coins. | 421 |

---

## 3. Voice Configuration

- **Voice**: `Lauren` (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`
- **Stability**: `0.50`
- **Similarity**: `0.75`
- **Style**: `0.0`
- **Speaker Boost**: `true`
- **Total Characters**: 1,933 characters
