# Narration Script: Simple Calculator with Undo Stack
Target Visualizer: `codequest/11-simple-calculator/simple_calculator_3d.html`  
Target Preset: Preset 0 (`[["+", 5], ["*", 4], ["-", 2], "undo", ["*", 3]]`)  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 16-17 | We initialize our calculator with a running total of zero and an empty undo history stack. As operations arrive, we save previous totals onto the stack so any step can be reverted seamlessly. | 13s |
| clip_02 | `clip_02_forward_operations.mp3` | Frame 1 | 0-6 | First, we add five to reach a total of five. Next, we multiply by four, pushing five to the stack and updating the running total to twenty. Then, subtracting two sets our total to eighteen with twenty saved. | 14s |
| clip_03 | `clip_03_undo_reversion.mp3` | Frame 7 | 11-14 | Now an undo command arrives. Checking our history stack, we pop the top value, twenty, instantly reverting our running total back to twenty as if the subtraction never occurred. | 12s |
| clip_04 | `clip_04_subsequent_multiplication.mp3` | Frame 9 | 0-1, 5-6 | Following the undo, we multiply by three. The prior total of twenty is saved onto the history stack, and our running accumulator climbs to sixty. | 10s |
| clip_05 | `clip_05_final_total.mp3` | Frame 11 | 18 | All commands have finished processing. Our final calculation yields sixty, supported by an active undo stack depth of three. | 9s |

### Pronunciation & Formatting Notes
- Numbers and operations spelled out in conversational English.
