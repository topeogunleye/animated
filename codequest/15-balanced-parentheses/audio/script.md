# Narration Script: Balanced Parentheses Multi-Type
Target Visualizer: `codequest/15-balanced-parentheses/balanced_parentheses_3d.html`  
Target Preset: Preset 0 (`"(a + b) * [c - d]"`)  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 0-3 | We initialize an empty stack and a dictionary mapping closing brackets to their matching openers: parentheses, square brackets, and curly braces. Non-bracket characters will be bypassed. | 13s |
| clip_02 | `clip_02_first_pair.mp3` | Frame 1 | 5-9 | At index zero, an opening parenthesis is pushed onto our stack. We step over the mathematical tokens a, plus, and b until index six, where a closing parenthesis pops and matches the opening parenthesis. | 14s |
| clip_03 | `clip_03_middle_tokens.mp3` | Frame 8 | 5 | Our scanner steps past the multiplication symbol and whitespace without modifying the stack, leaving it clear for the second bracket segment. | 10s |
| clip_04 | `clip_04_second_pair.mp3` | Frame 11 | 5-9 | At index ten, an opening square bracket is pushed onto the stack. After passing c minus d, a closing bracket at index seventeen pops and matches the bracket on top of the stack. | 14s |
| clip_05 | `clip_05_balanced_conclusion.mp3` | Frame 18 | 14 | The string scan concludes and our stack is completely empty with zero mismatches. The expression is confirmed to be properly balanced. | 10s |

### Pronunciation & Formatting Notes
- Parentheses and bracket names are pronounced naturally.
