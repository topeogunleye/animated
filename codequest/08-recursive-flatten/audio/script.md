# Narration Script: Recursive Flatten & Group
Target Visualizer: `codequest/08-recursive-flatten/recursive_flatten_3d.html`  
Target Preset: Preset 0 (`[["apple", "avocado"], ["banana"], [["cherry"]]]`)  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 16, 20 | We begin with a nested list of fruit names containing arbitrary layers of nesting. Our combined solution operates in two clear phases: first, recursively unpacking all elements into a flat list, and second, grouping the items by their starting letter. | 14s |
| clip_02 | `clip_02_recursive_unpacking.mp3` | Frame 1 | 0-5, 17 | In phase one, our recursive flatten function splits lists into a head and tail. If the head is a single value, our base case captures it. Otherwise, it recurses deeper. In this manner, apple, avocado, banana, and cherry are extracted into a single linear list. | 16s |
| clip_03 | `clip_03_init_grouping.mp3` | Frame 12 | 7-9, 18 | Now phase two begins. We initialize an empty dictionary to organize our flattened fruits into categorical bins based on the first letter of each word. | 9s |
| clip_04 | `clip_04_bucket_accumulation.mp3` | Frame 13 | 10-14 | Scanning through our flattened list, apple creates a bin for key a, and avocado is appended to the same bin. Next, banana creates bin b, and cherry creates bin c. | 12s |
| clip_05 | `clip_05_combined_result.mp3` | Frame 32 | 15, 19 | Both phases have executed successfully. The arbitrary nested hierarchy has been transformed into a cleanly grouped dictionary with three letter keys. | 10s |

### Pronunciation & Formatting Notes
- Keys "a", "b", "c": spoken clearly as individual letters.
