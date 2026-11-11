# Narration Script: Find Duplicates Ordered Scanner
Target Visualizer: `codequest/18-find-duplicates/find_duplicates_3d.html`  
Target Preset: Preset 0 (`[1, 2, 3, 2, 4, 5, 1]`)  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 0-2 | We initialize two empty lists: seen, to remember every unique number visited, and duplicates, to record repeated numbers without using the built-in set data structure. | 13s |
| clip_02 | `clip_02_tracking_uniques.mp3` | Frame 1 | 7-8 | We process one, two, and three. Since none of them are present in seen, each number is added to our seen basket. | 9s |
| clip_03 | `clip_03_first_duplicate.mp3` | Frame 4 | 4-6 | At index three, the number two reappears. Because two is already in seen, our algorithm catches the duplicate and records two in our duplicates list. | 11s |
| clip_04 | `clip_04_second_duplicate.mp3` | Frame 5 | 4-8 | After adding four and five as unique elements, the number one reappears at the final index. Recognizing that one is already seen, we append one to duplicates. | 12s |
| clip_05 | `clip_05_ordered_result.mp3` | Frame 8 | 10-14 | The scan finishes with our duplicate pairs identified: one and two, preserving the exact original ordering of the input numbers. | 10s |

### Pronunciation & Formatting Notes
- Numbers written out as words.
