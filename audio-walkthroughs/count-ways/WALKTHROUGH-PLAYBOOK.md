# Performance Lab in 3D: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Solution 10: Performance Lab in 3D / Count Ways** ([`10-count-ways/performance-lab-3d.html`](../../10-count-ways/performance-lab-3d.html)).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/count-ways/`

---

## 2. Presets Overview

| Preset | Scenario / Input | Target / Detail | Frames | Audio Clips | Status |
|---|---|:---:|:---:|:---:|:---:|
| **Preset 0: Coins · naive · 5** | Coins `[1, 2, 5]` | Amount 5 (un-memoized tree) | 203 | 4 clips (`01`–`04`) | Completed |
| **Preset 1: Coins · cached · 3** | Coins `[1, 2, 5]` | Amount 3 (with `@memoize`) | 193 | 3 clips (`01`–`03`) | Completed |
| **Preset 2: Fibonacci · cached · 4** | $n=4$ | With `@memoize` (hits & misses) | 86 | 2 clips (`01`–`02`) | Completed |
| **Preset 3: Consecutive · mixed** | `[100, 4, 200, 1, 3, 2]` | Longest streak in $O(n)$ | 53 | 2 clips (`01`–`02`) | Completed |
| **Preset 4: Pairs · duplicates** | `[1, 5, 7, -1, 5]` | Target sum 6 in $O(n)$ | 22 | 2 clips (`01`–`02`) | Completed |

---

## 3. Algorithm & Visualizer Mechanics

### Source Algorithms
The lab benchmarks multiple algorithmic paradigms:
1. **Coin Change (Naive vs Memoized)**: Demonstrates how un-memoized tree recursion duplicates identical subproblems exponentially, whereas caching captures hits and prunes redundant branches.
2. **Fibonacci (Memoized)**: Illustrates function decorator caching (`@memoize`), call counting, and cache hits on subproblems like $f(1)$ and $f(2)$.
3. **Longest Consecutive Sequence**: Uses a hash set / dictionary to identify streak starts ($x-1 \notin \text{table}$) and count streaks in amortized $O(n)$ time.
4. **Count Pairs**: Uses a single-pass complement frequency map (`frequencies.get(target - value)`) to find all pairs in $O(n)$ time.

### Visual State & Mechanics
1. **3D Value Pillars**: Vertical pillars with height proportional to argument values (or dictionary frequencies); highlighted in gold when active, green when completing or hitting base cases.
2. **Active Focus Slab**: Translucent volumetric focus box framing the active call depth or dictionary key slot.
3. **Pointers & Call Depths**: Bottom indicator showing current active column or call depth level.
4. **Status & Captions**: Real-time line-by-line Python code highlighting synchronized with caption explanations and live execution state.

---

## 4. Preset 0: "Coins · naive · 5"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-all-ones-path` | `01-setup-and-all-ones-path.mp3` | 0 – 34 | "Welcome to the Performance Lab in 3D. Here we explore the classic coin change problem, counting how many distinct combinations of coins can form our target amount. We begin with our naive recursive implementation for amount 5 using coin denominations 1, 2, and 5. First, normalize coins sanitizes our denominations, verifying that each coin is a positive integer and deduplicating them into an immutable tuple: (1, 2, 5). Next, count ways defines an internal helper, ways, taking remaining amount and a coin index, then launches our initial call: ways(5, 0). At depth 1, remaining is 5. We subtract our first coin, denomination 1, and recurse into ways(4, 0). Stepping deeper, each call uses coin 1: ways(3, 0) at depth 3, ways(2, 0) at depth 4, ways(1, 0) at depth 5, and finally ways(0, 0) at depth 6. With remaining equal to 0, our base case triggers, returning 1—representing our first valid combination: five 1-cent coins." |
| `02-coin-two-combinations` | `02-coin-two-combinations.mp3` | 35 – 80 | "Backtracking up the call stack, we now explore the alternative choice: skipping coin 1 to evaluate coin 2. From remaining 1 at index 1, subtracting 2 drops remaining to -1, which is negative and immediately returns 0. Testing coin 5 also goes negative to -4, returning 0. Reaching the end of our coin list at index 3 returns 0 as well. Backtracking further to remaining 2, using coin 2 calls ways(0, 1). Because remaining is exactly 0, it returns 1, discovering our second valid combination: three 1s plus one 2. After unwinding negative dead ends, combining these branches yields two valid combinations so far." |
| `03-exploring-subtrees-and-overlap` | `03-exploring-subtrees-and-overlap.mp3` | 81 – 150 | "Continuing up the tree to remaining 3 and remaining 4, we evaluate further coin choices. Notice something critical: subproblems like ways(1, 1) and ways(2, 1) are re-evaluated from scratch, duplicating identical recursive subtrees. Without memoization, every path explores redundant calculations. Branching from remaining 4 with coin 2 calls ways(0, 1), which returns 1 to give our third combination: one 1 plus two 2s. Unwinding through remaining 4 completes the first half of our recursion with three combinations found." |
| `04-coin-five-and-completion` | `04-coin-five-and-completion.mp3` | 151 – 202 | "Finally, we return to the root level and take the branch that skips coin 1 entirely, starting with coin 2 for amount 5. The algorithm once again re-evaluates overlapping subtrees. Advancing to coin 5 at index 2, we execute ways(5, 2). Subtracting 5 gives ways(0, 2), immediately returning 1—representing our fourth valid combination: a single 5-cent coin. Moving past index 2 hits our boundary and returns 0. The stack unwinds all the way back to the root caller, summing three plus one. The function completes with result 4—confirming four distinct ways to make 5 cents." |

---

## 5. Preset 1: "Coins · cached · 3"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-decorator-setup-and-all-ones` | `01-decorator-setup-and-all-ones.mp3` | 0 – 50 | "Here we explore memoized coin change for amount 3 with denominations 1, 2, and 5. The memoize decorator wraps our recursive ways function with an in-memory lookup table. First, normalize coins deduplicates our denominations to (1, 2, 5). We then initialize wrapper hit and miss counters. Launching ways(3, 0), the wrapper records a cache miss for key (3, 0) and recurses. Subtracting coin 1, we descend into ways(2, 0), ways(1, 0), and ways(0, 0), with each call registering a cache miss. At depth 4, remaining reaches 0, returning 1 for our first valid combination: three 1-cent coins. The wrapper caches result 1 for key (0, 0) and returns." |
| `02-branching-and-storing-subproblems` | `02-branching-and-storing-subproblems.mp3` | 51 – 147 | "Backtracking to explore coin 2, branches with negative remaining amounts or exceeding coin bounds return 0 and are stored in our cache. At remaining 2, branch ways(2, 1) subtracts coin 2 to call ways(0, 1). Remaining is 0, returning 1—our second valid combination: one 1 plus one 2. As each unique subproblem resolves, the wrapper records its return value in cache. Unwinding through remaining 2, we return result 1, and unwinding through remaining 3 concludes the all-ones branch." |
| `03-cache-hit-and-final-accounting` | `03-cache-hit-and-final-accounting.mp3` | 148 – 192 | "Now we take the top-level branch that skips coin 1: ways(3, 1). Subtracting coin 2 reaches ways(1, 1). When the wrapper inspects the cache for key (1, 1), it finds an existing entry! The hits counter increments to 1, and the cached value is returned instantly—skipping redundant recursive calls entirely. Advancing to coin 5 produces negative remaining amounts and returns 0. The function completes with result 2, recording 1 hit, 12 misses, and 13 total calls." |

---

## 6. Preset 2: "Fibonacci · cached · 4"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-memoized-calls-and-base-cases` | `01-memoized-calls-and-base-cases.mp3` | 0 – 49 | "Welcome to Fibonacci with memoization for n equals 4. Without caching, naive Fibonacci exhibits exponential O of 2 to the n complexity. Here, our memoize decorator intercepts every call. We start by calling fib(4), which misses the cache and invokes fib(3). fib(3) misses and invokes fib(2). fib(2) misses and invokes fib(1). At n equals 1, the base case triggers immediately, returning 1, which the wrapper stores in cache for key (1,). Next, fib(2) invokes fib(0), which hits the base case, returning 0 and caching key (0,). fib(2) sums 1 and 0, caching result 1 for key (2,)." |
| `02-cache-hits-and-completion` | `02-cache-hits-and-completion.mp3` | 50 – 85 | "Now back at fib(3), the second branch requires fib(1). Checking the cache, key (1,) is already present! The wrapper records a cache hit and returns 1 immediately without any recursive recomputation. fib(3) sums 1 plus 1 to return 2, caching result 2 for key (3,). Finally, returning to the root call fib(4), the second branch requires fib(2). Once again, key (2,) is found in our cache, scoring our second cache hit! The wrapper returns 1 immediately. fib(4) sums 2 plus 1, returning final answer 3 with 2 cache hits and 5 misses." |

---

## 7. Preset 3: "Consecutive · mixed"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-hash-table-setup-and-isolated-streaks` | `01-hash-table-setup-and-isolated-streaks.mp3` | 0 – 32 | "Welcome to Longest Consecutive Sequence in 3D. We are given the unsorted list [100, 4, 200, 1, 3, 2] and want to find the length of the longest consecutive elements sequence in optimal O of n time. First, we populate a hash table with all elements for constant-time lookups. We initialize our best streak length to 0. We begin iterating through table keys. First, at 100, we check if 100 minus 1, or 99, is in the table. Because 99 is absent, 100 marks the beginning of a streak. The while loop checks for 101, which is not present, yielding streak length 1. We update best to 1. Next, at 4, 4 minus 1, or 3, is already in the table—so 4 cannot be a streak beginning, and we skip it instantly! Next, at 200, 199 is absent, so 200 starts a streak. 201 is missing, yielding length 1." |
| `02-longest-streak-and-skips` | `02-longest-streak-and-skips.mp3` | 33 – 52 | "Continuing to 1, we check if 1 minus 1, or 0, is in the table. 0 is absent, confirming 1 is a streak start! The while loop checks 2, 3, 4, and 5: 2 is present, 3 is present, 4 is present, and 5 is absent. This reveals the sequence 1, 2, 3, 4 with length 4! We update best from 1 to 4. Next, at 3, its predecessor 2 is in the table, so we skip it. At 2, its predecessor 1 is present, so we skip it. With all keys evaluated, longest consecutive returns 4—achieving linear time by only checking sequences from their true start elements." |

---

## 8. Preset 4: "Pairs · duplicates"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-frequency-map-and-first-pair` | `01-frequency-map-and-first-pair.mp3` | 0 – 11 | "Welcome to Count Pairs in 3D. Given an array of integers and a target sum, this function counts how many pairs add up to the target in a single linear pass using a frequency hash map. We start with numbers [1, 5, 7, -1, 5] and target 6. We initialize an empty frequencies dictionary and set pairs to 0. First, we visit 1. Its complement, 6 minus 1, is 5. Since 5 has not appeared yet, matching pairs is 0. We store 1 in our frequency map. Next, we visit 5. Its complement, 6 minus 5, is 1. Looking up 1 reveals 1 earlier match! We increment pairs to 1, recording the pair (1, 5), and add 5 to our map. Next, at 7, its complement 6 minus 7 is -1, which is not yet present, so we store 7." |
| `02-negative-complement-and-duplicate-pair` | `02-negative-complement-and-duplicate-pair.mp3` | 12 – 21 | "Continuing to the fourth element, -1, we calculate its complement: 6 minus -1 equals 7. Checking our map, 7 was already seen once, so we increment pairs to 2, capturing the pair (7, -1), and add -1 to our dictionary. Finally, we encounter a duplicate value: 5. Its complement, 6 minus 5, is 1. The map still holds one instance of 1, so pairs increments to 3, capturing our second (1, 5) pair! The frequency of 5 increases to 2. With the loop complete, count pairs returns 3—efficiently finding all pairs in linear time." |
