# Narration Script: Two Sum Hash Map
Target Visualizer: `codequest/04-two-sum/two_sum_3d.html`  
Target Preset: Preset 0 (`[2, 7, 11, 15]`, target 9)  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 0-1 | We initialize an empty hash map called seen, which will remember the numbers we visit alongside their array indices. Our target sum is nine, and we aim to find the two values that add up to this target in a single linear pass. | 13s |
| clip_02 | `clip_02_first_element.mp3` | Frame 1 | 2-3 | We inspect our first element at index zero, which is the number two. To reach nine, we need a complement of nine minus two, which is seven. We look inside our hash map to see if seven has already been stored. | 13s |
| clip_03 | `clip_03_store_element.mp3` | Frame 2 | 6-7 | Since seven is not yet in our hash map, we record the current number two and map it to its index zero. This allows future elements to easily check if two is their missing partner. | 11s |
| clip_04 | `clip_04_find_partner.mp3` | Frame 3 | 2-3 | Moving to index one, we encounter the number seven. Its complement is nine minus seven, which equals two. We query our hash map and instantly find that two is indeed waiting in memory. | 12s |
| clip_05 | `clip_05_return_solution.mp3` | Frame 4 | 4-5 | Because the complement is present, we immediately retrieve its stored index zero and pair it with our current index one. The algorithm returns the index pair zero and one, solving the problem in optimal linear time. | 13s |

### Pronunciation & Formatting Notes
- "seen": spoken as "seen"
- Numbers and arithmetic ("nine minus two") are fully spelled out.
