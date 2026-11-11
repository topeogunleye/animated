# Narration Script: Run-Length Encoding
Target Visualizer: `codequest/19-run-length-encoding/run_length_3d.html`  
Target Preset: Preset 0 ("aaabbc")  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 0, 3-5 | We begin by initializing our run-length encoder. We set our current character to a, our streak count to one, and an empty parts accumulator to collect compressed runs. | 13s |
| clip_02 | `clip_02_first_run.mp3` | Frame 1 | 7-9 | Scanning indices one and two, consecutive a characters match our current streak, incrementing our count to two and then three. | 10s |
| clip_03 | `clip_03_first_break.mp3` | Frame 3 | 10-13 | At index three, the character b arrives, breaking the run. We compress the previous streak into a-three, append it to parts, and reset our active tracker to b with count one. | 13s |
| clip_04 | `clip_04_second_run_and_break.mp3` | Frame 5 | 7-13 | The second b increments our count to two. When c arrives, the b streak breaks, appending b-two to parts and setting c as our new active character. | 12s |
| clip_05 | `clip_05_final_compression.mp3` | Frame 8 | 15-16 | Reaching the end of the text, we flush the final run, c-one. Joining the segments together yields our completed compressed string: a three b two c one. | 12s |

### Pronunciation & Formatting Notes
- "a-three", "b-two", "c-one": hyphenated words spoken phonetically.
