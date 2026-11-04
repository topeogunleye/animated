# Integer to Roman: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Solution 04: Integer to Roman in 3D** (`04-Integer-to-roman/Integer to Roman in 3D, step by step.html`).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/integer-to-roman/`

---

## 2. Presets Overview

| Preset | Input | Result | Frames | Audio Clips | Status |
|---|---|:---:|:---:|:---:|:---:|
| **Preset 0: Example: 3** | `3` | `"III"` | 22 | 3 clips (`01`–`03`) | Completed |
| **Preset 1: Example: 58** | `58` | `"LVIII"` | 26 | 3 clips (`01`–`03`) | Planned |
| **Preset 2: Example: 1994** | `1994` | `"MCMXCIV"` | 25 | 3 clips (`01`–`03`) | Completed |
| **Preset 3: Largest: 3999** | `3999` | `"MMMCMXCIX"` | 25 | 3 clips (`01`–`03`) | Planned |
| **Preset 4: Out of range: 4000** | `4000` | `ValueError` | 3 | 2 clips (`01`–`02`) | Planned |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
```python
PAIRS = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
         (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
         (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
def int_to_roman(num):
    if num < 1 or num > 3999:
        raise ValueError("num must be between 1 and 3999")
    result = ""
    for value, symbol in PAIRS:
        while num >= value:
            result += symbol
            num -= value
    return result
```

### Visual State & Mechanics
1. **The Descending Table**: 13 pillar blocks representing standard values ($1000, 500, 100, 50, 10, 5, 1$) alongside the 6 subtractive pairs ($900, 400, 90, 40, 9, 4$).
2. **The Scanner & Pointer**: A pointer sweeps left-to-right across the table. When `num >= value`, the while loop triggers, emitting the symbol into the output row and subtracting `value` from `num`.
3. **The Output Row**: Roman numeral blocks assemble dynamically in the foreground (`OUT_Z = 2.8`).
4. **Range Guard**: Inputs outside $1 \le \text{num} \le 3999$ halt immediately with a visible `ValueError` sprite without building any numeral.

---

## 4. Preset 0: "Example: 3" (`num = 3`)

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-key-idea` | `01-setup-and-key-idea.mp3` | 0 – 2 | "Welcome to Integer to Roman. In Roman numerals, we greedily take the largest value that still fits our remaining number. Our descending lookup table holds all thirteen standard denominations, including the subtractive pairs like nine hundred and four. We start with three. Three falls safely within the valid range of one to three thousand, nine hundred and ninety-nine, so the guard check passes. We initialize our result string to empty, and prepare to scan through our table." |
| `02-skipping-large-pairs` | `02-skipping-large-pairs.mp3` | 3 – 14 | "Now the for loop begins at one thousand. Since three is less than one thousand, nine hundred, and five hundred, the while loop condition is false and each large denomination is skipped. The pointer continues down past one hundred, fifty, ten, five, and four. None of these fit into three, so our numeral remains empty as we sweep toward the smallest units." |
| `03-greedy-ones-and-return` | `03-greedy-ones-and-return.mp3` | 15 – 21 | "Finally, we reach the pair one and capital I. Three is greater than or equal to one, so our while loop runs. In the first iteration, we append I and subtract one, leaving two. Two is still greater than or equal to one, so we append a second I, leaving one. One fits once more: we append our third I, and the remaining number becomes zero. With zero remaining, the while loop exits, the table scan concludes, and we return the finished Roman numeral: I, I, I." |

---

## 5. Preset 2: "Example: 1994" (`num = 1994`)

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-thousands` | `01-setup-and-thousands.mp3` | 0 – 5 | "Here we trace nineteen ninety-four, the quintessential test of Roman subtractive notation. One thousand, nine hundred and ninety-four is within our range, so the guard check passes, and our result string starts empty. We examine the largest denomination: one thousand, represented by M. Nineteen ninety-four is greater than one thousand, so we greedily append M and subtract one thousand. With nine hundred and ninety-four remaining, one thousand no longer fits, and our while loop advances." |
| `02-subtractive-hundreds-and-tens` | `02-subtractive-hundreds-and-tens.mp3` | 6 – 14 | "Next is the subtractive pair nine hundred, written as CM. Nine hundred and ninety-four is greater than nine hundred, so we append CM and subtract nine hundred, leaving just ninety-four. Because ninety-four is less than five hundred, four hundred, and one hundred, those pairs are skipped. Then we encounter ninety, written as XC. Ninety-four is greater than ninety: we append XC and subtract ninety, leaving only four." |
| `03-subtractive-fours-and-return` | `03-subtractive-fours-and-return.mp3` | 15 – 24 | "With four remaining, pairs fifty, forty, ten, nine, and five are all too large and get bypassed. We arrive at four, represented by the subtractive pair IV. Four is greater than or equal to four, so we append IV and subtract four. The remaining number is now zero. No further pairs fit, so the loop exits early. We return the final numeral: M, CM, XC, IV—nineteen ninety-four expressed with optimal brevity." |
