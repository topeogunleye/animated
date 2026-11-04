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
| **Preset 1: Example: 58** | `58` | `"LVIII"` | 26 | 3 clips (`01`–`03`) | Completed |
| **Preset 2: Example: 1994** | `1994` | `"MCMXCIV"` | 25 | 3 clips (`01`–`03`) | Completed |
| **Preset 3: Largest: 3999** | `3999` | `"MMMCMXCIX"` | 25 | 3 clips (`01`–`03`) | Completed |
| **Preset 4: Out of range: 4000** | `4000` | `ValueError` | 3 | 2 clips (`01`–`02`) | Completed |

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
 
---
 
## 6. Preset 1: "Example: 58" (`num = 58`)
 
### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-tens` | `01-setup-and-tens.mp3` | 0 – 11 | "We now convert fifty-eight to Roman numerals. Fifty-eight easily passes the range guard between one and three thousand, nine hundred and ninety-nine, and result starts as an empty string. The table begins scanning at one thousand. Since fifty-eight is much smaller than one thousand, nine hundred, five hundred, four hundred, one hundred, and ninety, those pairs are all skipped. At fifty, represented by L, fifty-eight is greater than or equal to fifty. We append L, subtract fifty, and are left with eight. Fifty no longer fits into eight, so the loop moves forward." |
| `02-fives-and-subtractive-check` | `02-fives-and-subtractive-check.mp3` | 12 – 18 | "With eight remaining, the pointer checks forty, ten, and nine. None of these fit into eight, so they are bypassed. Next is five, written as V. Eight is greater than or equal to five, so we append V and subtract five, leaving three. Five no longer fits into three, concluding the pair. Then we check the subtractive pair four, written as IV. Since three is less than four, IV is skipped without running." |
| `03-ones-and-return` | `03-ones-and-return.mp3` | 19 – 25 | "Finally, we reach one, represented by I. Three is greater than or equal to one, so our while loop runs. We append I leaving two, append a second I leaving one, and append a third I leaving zero. With zero remaining, our while loop halts, the table scan concludes, and we return the final numeral: L, V, I, I, I—fifty-eight in clean additive Roman notation." |
 
---
 
## 7. Preset 3: "Largest: 3999" (`num = 3999`)
 
### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-three-thousands` | `01-setup-and-three-thousands.mp3` | 0 – 7 | "Here we test three thousand, nine hundred and ninety-nine: the maximum allowed value in standard Roman numerals. Thirty-nine ninety-nine lies right at the upper bound of our range guard, so execution proceeds normally and result starts empty. We begin with one thousand, represented by M. Thirty-nine ninety-nine is greater than one thousand, so we append our first M leaving twenty-nine ninety-nine. We append a second M leaving nineteen ninety-nine, and a third M leaving nine hundred and ninety-nine. At nine hundred and ninety-nine, one thousand no longer fits, finishing our thousands." |
| `02-hundreds-and-tens` | `02-hundreds-and-tens.mp3` | 8 – 16 | "Next is the subtractive pair nine hundred, written as CM. Nine hundred and ninety-nine is greater than nine hundred, so we append CM and subtract nine hundred, leaving ninety-nine. Denominations five hundred, four hundred, and one hundred are skipped because ninety-nine is too small. We reach ninety, written as XC. Ninety-nine is greater than ninety, so we append XC and subtract ninety, leaving exactly nine. Ninety no longer fits into nine, completing our tens reduction." |
| `03-nines-and-return` | `03-nines-and-return.mp3` | 17 – 24 | "With nine remaining, fifty, forty, and ten are bypassed. We reach nine, represented by the subtractive pair IX. Nine is greater than or equal to nine, so we append IX and subtract nine. Our remaining number drops to zero. With zero remaining, no subsequent pairs can match, and the loop exits cleanly. We return the largest valid numeral: M, M, M, CM, XC, IX—three thousand, nine hundred and ninety-nine in all its majestic glory." |
 
---
 
## 8. Preset 4: "Out of range: 4000" (`num = 4000`)
 
### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-range-check` | `01-setup-and-range-check.mp3` | 0 – 1 | "Now we examine the out-of-range boundary case with input four thousand. Roman numerals in standard notation only support integers from one to three thousand, nine hundred and ninety-nine, because four thousand would require four consecutive M's, violating the standard repetition rule. When int to Roman is called with four thousand, the guard condition evaluates whether num is less than one or greater than thirty-nine ninety-nine. Since four thousand is strictly greater than thirty-nine ninety-nine, the guard triggers." |
| `02-value-error-guard` | `02-value-error-guard.mp3` | 2 | "The function immediately raises a Value Error stating that num must be between one and three thousand, nine hundred and ninety-nine. Execution halts immediately without initializing the table, allocating an output string, or building any numeral blocks, demonstrating robust defensive input validation." |

