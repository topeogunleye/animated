# Narration Script: Word Frequency Counter
Target Visualizer: `codequest/03-word-frequency/word_frequency_3d.html`  
Target Preset: Preset 0 ("Python is fun, and Python is powerful!")  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 0-1 | We begin by initializing an empty frequency dictionary. Our input sentence contains seven words, and our task is to sanitize them, count their frequencies, and determine the most common word. | 11s |
| clip_02 | `clip_02_cleaning_and_counting.mp3` | Frame 1 | 3-8 | As we iterate through the words, each token is converted to lowercase and stripped of punctuation marks like commas and exclamation points. When a sanitized word first appears, we create a new entry with an initial count of one. | 14s |
| clip_03 | `clip_03_incrementing_counts.mp3` | Frame 5 | 3, 7-8 | When we encounter the second instance of the word python, our dictionary recognizes the existing key and increments its count to two. The same update happens when the word is appears again. | 12s |
| clip_04 | `clip_04_finding_maximum.mp3` | Frame 8 | 9-13 | With counting complete across five unique word bins, we scan through our dictionary entries to locate the highest count, comparing each frequency against our running best. | 10s |
| clip_05 | `clip_05_conclusion.mp3` | Frame 14 | 14 | Both python and is share the top frequency with two occurrences each. Because python was recorded first, our scan returns python as the most frequent word. | 10s |

### Pronunciation & Formatting Notes
- "python": pronounced "pie-thon"
- Words are pronounced conversationally without code ticks.
