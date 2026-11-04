# Educational Voice Script: Largest: 3999 (`num = 3999`)

- **Topic**: Integer to Roman conversion (maximum boundary condition and triple-M repetition)
- **Input**: `num = 3999`
- **Output**: `"MMMCMXCIX"`
- **Frames**: 25 (0 to 24)
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`

---

## Segment 1: Setup and Three Thousands (`01-setup-and-three-thousands.mp3`)
**Frames**: 0 to 7
**Cues**:
- `0.0s`: Frame 0 (Key idea)
- `14.0s`: Frame 1 (Check range guard 3999 valid)
- `21.0s`: Frame 2 (Table runs 1000 down to 1, result empty)
- `26.0s`: Frame 3 (Pair 1000 M: 3999 >= 1000)
- `29.5s`: Frame 4 (Append M, result = "M", num = 2999)
- `33.0s`: Frame 5 (Append M, result = "MM", num = 1999)
- `36.5s`: Frame 6 (Append M, result = "MMM", num = 999)
- `40.5s`: Frame 7 (999 < 1000, pair 1000 finished)

**Text**:
> "Here we test three thousand, nine hundred and ninety-nine: the maximum allowed value in standard Roman numerals. Thirty-nine ninety-nine lies right at the upper bound of our range guard, so execution proceeds normally and result starts empty. We begin with one thousand, represented by M. Thirty-nine ninety-nine is greater than one thousand, so we append our first M leaving twenty-nine ninety-nine. We append a second M leaving nineteen ninety-nine, and a third M leaving nine hundred and ninety-nine. At nine hundred and ninety-nine, one thousand no longer fits, finishing our thousands."

---

## Segment 2: Hundreds and Tens (`02-hundreds-and-tens.mp3`)
**Frames**: 8 to 16
**Cues**:
- `0.0s`: Frame 8 (Pair 900 CM: 999 >= 900)
- `4.5s`: Frame 9 (Append CM, result = "MMMCM", num = 99)
- `9.0s`: Frame 10 (99 < 900, pair 900 finished)
- `12.0s`: Frame 11 (Skip 500 D)
- `14.0s`: Frame 12 (Skip 400 CD)
- `16.0s`: Frame 13 (Skip 100 C)
- `18.5s`: Frame 14 (Pair 90 XC: 99 >= 90)
- `23.0s`: Frame 15 (Append XC, result = "MMMCMXC", num = 9)
- `27.5s`: Frame 16 (9 < 90, pair 90 finished)

**Text**:
> "Next is the subtractive pair nine hundred, written as CM. Nine hundred and ninety-nine is greater than nine hundred, so we append CM and subtract nine hundred, leaving ninety-nine. Denominations five hundred, four hundred, and one hundred are skipped because ninety-nine is too small. We reach ninety, written as XC. Ninety-nine is greater than ninety, so we append XC and subtract ninety, leaving exactly nine. Ninety no longer fits into nine, completing our tens reduction."

---

## Segment 3: Nines and Return (`03-nines-and-return.mp3`)
**Frames**: 17 to 24
**Cues**:
- `0.0s`: Frame 17 (Skip 50 L)
- `2.0s`: Frame 18 (Skip 40 XL)
- `4.0s`: Frame 19 (Skip 10 X)
- `6.5s`: Frame 20 (Pair 9 IX: 9 >= 9)
- `10.5s`: Frame 21 (Append IX, result = "MMMCMXCIX", num = 0)
- `15.0s`: Frame 22 (0 < 9, pair 9 finished)
- `18.0s`: Frame 23 (num is 0, loop ends)
- `22.0s`: Frame 24 (Return "MMMCMXCIX")

**Text**:
> "With nine remaining, fifty, forty, and ten are bypassed. We reach nine, represented by the subtractive pair IX. Nine is greater than or equal to nine, so we append IX and subtract nine. Our remaining number drops to zero. With zero remaining, no subsequent pairs can match, and the loop exits cleanly. We return the largest valid numeral: M, M, M, CM, XC, IX—three thousand, nine hundred and ninety-nine in all its majestic glory."
