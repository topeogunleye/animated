# Narration Script: Palindrome Validator
Target Visualizer: `codequest/01-palindrome/palindrome_3d.html`  
Target Preset: Preset 0 ("Was it a car or a cat I saw?")  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 2-3 | We start by placing two pointers at opposite ends of the sentence. The left pointer begins at the very first character, while the right pointer starts at the trailing question mark. Our goal is to verify if the phrase reads identically forwards and backwards, while ignoring spaces and punctuation. | 14s |
| clip_02 | `clip_02_skip_punctuation.mp3` | Frame 1 | 4-8 | Right away, the right pointer lands on a question mark. Because this character is not an alphanumeric letter, our helper function flags it to be skipped, shifting the right pointer one step inward to find a valid letter. | 11s |
| clip_03 | `clip_03_first_matches.mp3` | Frame 2 | 4, 11-13 | Now both pointers face valid letters, a capital W on the left and a lowercase w on the right. After converting both to lowercase, they match perfectly, so we advance the left pointer forward and retreat the right pointer inward. | 13s |
| clip_04 | `clip_04_skip_spaces.mp3` | Frame 5 | 4-8 | Whenever either pointer encounters a whitespace character, it steps over it without comparing. This ensures that words separated by spaces align naturally with their symmetric counterparts on the opposite side. | 11s |
| clip_05 | `clip_05_completion.mp3` | Frame 19 | 4, 14 | Both pointers continue inwards, matching every single letter until they finally meet at the center character. Having encountered zero mismatches, the function returns true, confirming that this sentence is a valid palindrome. | 12s |

### Pronunciation & Formatting Notes
- "W": pronounced "double-you"
- "true": pronounced "true"
- Numbers spelled out in full. No special symbols or markdown in spoken text.
