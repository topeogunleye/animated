# Can Sum: "Pair Sum to 16" Voice Walkthrough Script

An educational audio walkthrough for the 3D interactive visualization of `can_sum` (recursive pair search) in [`20-can-sum/can_sum in 3D_ trying every pair.html`](../../20-can-sum/can_sum%20in%203D_%20trying%20every%20pair.html).

This script follows the built-in preset:
- Array: `nums = [2, 4, 6, 10]`
- Target: `target = 16`
- Verified Result: `(6, 10)` — Winning pair found at indices `i = 2, j = 3`.
- Narrator Voice: **Lauren** (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`).

---

## 1. Verified Trace & Ground Truth

The visualization simulates the recursive pair search function:

```python
def can_sum(nums, target, i = 0, j = 1):
    if i >= len(nums) - 1:
        return None
    if j >= len(nums):
        return can_sum(nums, target, i + 1, i + 2)
    if nums[i] + nums[j] == target:
        return (nums[i], nums[j])
    return can_sum(nums, target, i, j + 1)
```

### Trace Steps for `nums = [2, 4, 6, 10]`, `target = 16`:

| Frame | Call | `i` | `j` | Pair / Values | Sum & Comparison | Outcome / Action | Active Lines |
|:---:|:---:|:---:|:---:|:---:|:---:|:---|:---:|
| **0** | 1 | 0 | 1 | `nums[0]=2, nums[1]=4` | Initial call setup | Start simulation; inspect initial pair | 1 |
| **1** | 1 | 0 | 1 | `2, 4` | `2 + 4 = 6 != 16` | No match; slide `j` right to index 2 | 1, 2, 4, 6, 8 |
| **2** | 2 | 0 | 2 | `2, 6` | `2 + 6 = 8 != 16` | No match; slide `j` right to index 3 | 1, 2, 4, 6, 8 |
| **3** | 3 | 0 | 3 | `2, 10` | `2 + 10 = 12 != 16` | No match; slide `j` right to index 4 | 1, 2, 4, 6, 8 |
| **4** | 4 | 0 | 4 | `2, -` | `j = 4 >= len(nums)` | Overflow: 2 has no partners left; advance `i = 1`, reset `j = 2` | 1, 2, 4, 5 |
| **5** | 5 | 1 | 2 | `nums[1]=4, nums[2]=6` | `4 + 6 = 10 != 16` | No match; slide `j` right to index 3 | 1, 2, 4, 6, 8 |
| **6** | 6 | 1 | 3 | `nums[1]=4, nums[3]=10` | `4 + 10 = 14 != 16` | No match; slide `j` right to index 4 | 1, 2, 4, 6, 8 |
| **7** | 7 | 1 | 4 | `4, -` | `j = 4 >= len(nums)` | Overflow: 4 has no partners left; advance `i = 2`, reset `j = 3` | 1, 2, 4, 5 |
| **8** | 8 | 2 | 3 | `nums[2]=6, nums[3]=10` | `6 + 10 = 16 == 16` | Match found! Success guard triggers, returns `(6, 10)` | 1, 2, 4, 6, 7 |

---

## 2. Segment Table (ElevenLabs Audio Clips)

| Filename | Milestone Title | Active Lines | Spoken Text | Approx Duration |
|:---|:---|:---:|:---|:---:|
| `01-setup-and-first-probe.mp3` | Setup & Testing First Pair (2, 4) | Lines 1, 2, 4, 6, 8 | Welcome to can sum in three D. Our goal is to find the first pair of numbers that add up to our target of sixteen. We start at call one with pointer i at index zero holding two, and pointer j at index one holding four. Adding two plus four gives six, which does not equal sixteen. So we advance j to try the next partner. | 18s |
| `02-exhausting-first-element.mp3` | Testing Remaining Partners for 2 | Lines 1, 2, 4, 5, 6, 8 | Next, j moves to index two. Two plus six equals eight, still missing sixteen. j advances again to index three. Two plus ten equals twelve, which is also not our target. Now j runs past the end of the list. That means the number two has no partners left. We advance i to index one and position j right after it at index two. | 22s |
| `03-testing-with-second-element.mp3` | Testing Partners for 4 | Lines 1, 2, 4, 5, 6, 8 | Now pointer i rests at index one with the number four. We test four plus six, which gives ten, not sixteen. Moving j to index three, we test four plus ten, giving fourteen, still short of sixteen. Once again, j exceeds the list length. The number four has exhausted all its possible partners, so we advance i to index two and reset j to index three. | 23s |
| `04-match-found-and-return.mp3` | Target Match (6, 10) Found | Lines 1, 2, 4, 6, 7 | With pointer i at index two holding six, and pointer j at index three holding ten, we evaluate the sum: six plus ten equals sixteen. That matches our target exactly. Our recursive guard succeeds, and the function returns the winning pair: six and ten. | 18s |

---

## 3. Continuous Read-Through

> Welcome to can sum in three D. Our goal is to find the first pair of numbers that add up to our target of sixteen. We start at call one with pointer i at index zero holding two, and pointer j at index one holding four. Adding two plus four gives six, which does not equal sixteen. So we advance j to try the next partner.
>
> Next, j moves to index two. Two plus six equals eight, still missing sixteen. j advances again to index three. Two plus ten equals twelve, which is also not our target. Now j runs past the end of the list. That means the number two has no partners left. We advance i to index one and position j right after it at index two.
>
> Now pointer i rests at index one with the number four. We test four plus six, which gives ten, not sixteen. Moving j to index three, we test four plus ten, giving fourteen, still short of sixteen. Once again, j exceeds the list length. The number four has exhausted all its possible partners, so we advance i to index two and reset j to index three.
>
> With pointer i at index two holding six, and pointer j at index three holding ten, we evaluate the sum: six plus ten equals sixteen. That matches our target exactly. Our recursive guard succeeds, and the function returns the winning pair: six and ten.
