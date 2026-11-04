# Educational Voice Script: Example: 58 (`num = 58`)

- **Topic**: Integer to Roman conversion (additive fifties, fives, and ones)
- **Input**: `num = 58`
- **Output**: `"LVIII"`
- **Frames**: 26 (0 to 25)
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`

---

## Segment 1: Setup and Tens (`01-setup-and-tens.mp3`)
**Frames**: 0 to 11
**Cues**:
- `0.0s`: Frame 0 (Key idea)
- `14.0s`: Frame 1 (Check range guard 58 valid)
- `21.0s`: Frame 2 (Table runs 1000 down to 1, result empty)
- `27.0s`: Frame 3 (Skip 1000 M)
- `28.5s`: Frame 4 (Skip 900 CM)
- `30.0s`: Frame 5 (Skip 500 D)
- `31.5s`: Frame 6 (Skip 400 CD)
- `33.0s`: Frame 7 (Skip 100 C)
- `34.5s`: Frame 8 (Skip 90 XC)
- `36.5s`: Frame 9 (Pair 50 L: 58 >= 50)
- `40.5s`: Frame 10 (Append L, result = "L", num = 8)
- `44.5s`: Frame 11 (8 < 50, pair 50 finished)

**Text**:
> "We now convert fifty-eight to Roman numerals. Fifty-eight easily passes the range guard between one and three thousand, nine hundred and ninety-nine, and result starts as an empty string. The table begins scanning at one thousand. Since fifty-eight is much smaller than one thousand, nine hundred, five hundred, four hundred, one hundred, and ninety, those pairs are all skipped. At fifty, represented by L, fifty-eight is greater than or equal to fifty. We append L, subtract fifty, and are left with eight. Fifty no longer fits into eight, so the loop moves forward."

---

## Segment 2: Fives and Subtractive Check (`02-fives-and-subtractive-check.mp3`)
**Frames**: 12 to 18
**Cues**:
- `0.0s`: Frame 12 (Skip 40 XL)
- `2.5s`: Frame 13 (Skip 10 X)
- `4.5s`: Frame 14 (Skip 9 IX)
- `7.0s`: Frame 15 (Pair 5 V: 8 >= 5)
- `11.0s`: Frame 16 (Append V, result = "LV", num = 3)
- `15.5s`: Frame 17 (3 < 5, pair 5 finished)
- `19.0s`: Frame 18 (Skip 4 IV: 3 < 4)

**Text**:
> "With eight remaining, the pointer checks forty, ten, and nine. None of these fit into eight, so they are bypassed. Next is five, written as V. Eight is greater than or equal to five, so we append V and subtract five, leaving three. Five no longer fits into three, concluding the pair. Then we check the subtractive pair four, written as IV. Since three is less than four, IV is skipped without running."

---

## Segment 3: Ones and Return (`03-ones-and-return.mp3`)
**Frames**: 19 to 25
**Cues**:
- `0.0s`: Frame 19 (Pair 1 I: 3 >= 1)
- `4.5s`: Frame 20 (Append I, result = "LVI", num = 2)
- `8.5s`: Frame 21 (Append I, result = "LVII", num = 1)
- `12.5s`: Frame 22 (Append I, result = "LVIII", num = 0)
- `16.5s`: Frame 23 (0 < 1, pair 1 finished)
- `19.5s`: Frame 24 (Loop ends)
- `22.5s`: Frame 25 (Return "LVIII")

**Text**:
> "Finally, we reach one, represented by I. Three is greater than or equal to one, so our while loop runs. We append I leaving two, append a second I leaving one, and append a third I leaving zero. With zero remaining, our while loop halts, the table scan concludes, and we return the final numeral: L, V, I, I, I—fifty-eight in clean additive Roman notation."
