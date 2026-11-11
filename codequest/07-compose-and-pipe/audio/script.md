# Narration Script: Compose & Pipe Functional Pipeline
Target Visualizer: `codequest/07-compose-and-pipe/compose_pipe_3d.html`  
Target Preset: Preset 0 ("  Hello World  ")  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 3-5, 31-32 | We construct a clean functional pipeline using pipe, chaining four pure transformation functions: strip, lowercase, remove vowels, and reverse. Our raw input string contains padding spaces surrounding the phrase Hello World. | 13s |
| clip_02 | `clip_02_strip_and_lower.mp3` | Frame 2 | 6, 10-14 | In stage one, the strip function trims the leading and trailing whitespace, producing the clean phrase Hello World. In stage two, the lower function normalizes all uppercase letters to lowercase, yielding hello world. | 13s |
| clip_03 | `clip_03_remove_vowels.mp3` | Frame 6 | 6, 16-21 | Stage three passes the text through our vowel filter. As the character scanner advances, vowels like e and o are discarded, while consonants and spaces remain, leaving behind the condensed string hll wrld. | 13s |
| clip_04 | `clip_04_reverse_scan.mp3` | Frame 19 | 6, 23-28 | In stage four, our reverse function steps backward from the final character down to index zero, iteratively appending each symbol to construct the reversed string. | 11s |
| clip_05 | `clip_05_pipeline_result.mp3` | Frame 29 | 7, 32 | The pipeline execution is complete. The input has flowed seamlessly through all four transformation stages, returning the final transformed output: dlrw llh. | 11s |

### Pronunciation & Formatting Notes
- "hll wrld": pronounced phonetically "h-l-l, w-r-l-d"
- "dlrw llh": spelled out clearly
