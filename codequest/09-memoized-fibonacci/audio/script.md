# Narration Script: Memoized Fibonacci
Target Visualizer: `codequest/09-memoized-fibonacci/memoized_fibonacci_3d.html`  
Target Preset: Preset 0 (N = 6)  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 0-2, 10 | We set out to compute the sixth Fibonacci number using a memoization decorator. Without memoization, recursive Fibonacci requires twenty-five redundant function calls. Our cache dictionary will remember past answers to eliminate duplicate work. | 14s |
| clip_02 | `clip_02_cache_miss_branching.mp3` | Frame 1 | 3-5, 14 | When computing fib of six, our wrapper checks the cache. Experiencing a cache miss, it branches left to fib of five, four, three, two, and one, establishing our initial stack frames down to the base cases. | 13s |
| clip_03 | `clip_03_base_cases_and_storage.mp3` | Frame 19 | 5, 12-14 | At the base cases of one and zero, the function returns immediately. We store these results in the cache table, allowing fib of two to be computed as one plus zero and saved into memoization memory. | 13s |
| clip_04 | `clip_04_cache_hits.mp3` | Frame 31 | 3, 6, 14 | Now the magic of memoization activates. When computing the right branch for fib of one, two, three, and four, our decorator finds them already stored in the cache. These instant cache hits completely prune out entire recursive subtrees. | 15s |
| clip_05 | `clip_05_final_result_and_savings.mp3` | Frame 55 | 16 | The final answer, eight, is returned. Thanks to our memoization cache, the total call count dropped from twenty-five down to just eleven, saving fourteen redundant computations. | 11s |

### Pronunciation & Formatting Notes
- "fib of six": pronounced "fib of six"
- All numerical values are spelled out in words.
