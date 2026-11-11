# Narration Script: Caesar Cipher
Target Visualizer: `codequest/06-caesar-cipher/caesar_cipher_3d.html`  
Target Preset: Preset 0 ("hello, world!", shift 3, encrypt)  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 0, 7-8 | We begin by configuring our Caesar cipher closure in encryption mode with a shift of plus three. Our goal is to transform every lowercase letter by rotating it three positions forward along the twenty-six letter alphabet ring, while keeping punctuation intact. | 14s |
| clip_02 | `clip_02_first_letters.mp3` | Frame 1 | 1-3 | We feed in the first word, hello. The letter h at index seven shifts forward three steps to land on k at index ten. Next, e shifts to h, both l letters shift to o, and the letter o rotates forward to become r. | 14s |
| clip_03 | `clip_03_non_alpha_symbols.mp3` | Frame 6 | 1, 6 | When our cipher encounters the comma and whitespace character, our helper function recognizes that they are non-alphabetic symbols. It preserves them directly into the output string without applying any rotation. | 12s |
| clip_04 | `clip_04_second_word_and_wrap.mp3` | Frame 8 | 1-3 | Next comes the word world. The letter w sits at index twenty-two. Shifting by three brings it to twenty-five, producing z. The remaining letters o, r, l, and d shift cleanly to r, u, o, and g. | 13s |
| clip_05 | `clip_05_completion.mp3` | Frame 14 | 9 | The trailing exclamation point is preserved, completing our encryption. The final ciphertext reads khoor, zruog, successfully obfuscating the original greeting. | 11s |

### Pronunciation & Formatting Notes
- "khoor, zruog": pronounced phonetically "koor, zroog"
- Numbers and shifts are fully written out.
