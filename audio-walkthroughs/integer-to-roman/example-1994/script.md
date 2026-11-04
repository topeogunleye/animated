# Educational Voice Script: Example: 1994 (`num = 1994`)

- **Topic**: Integer to Roman conversion (subtractive pairs and multi-tier greedy reductions)
- **Input**: `num = 1994`
- **Output**: `"MCMXCIV"`
- **Frames**: 25 (0 to 24)
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`

---

## Segment 1: Setup and Thousands (`01-setup-and-thousands.mp3`)
**Frames**: 0 to 5
**Cues**:
- `0.0s`: Frame 0 (Key idea)
- `14.0s`: Frame 1 (Check range guard 1994 valid)
- `21.0s`: Frame 2 (Table runs 1000 down to 1, result empty)
- `28.0s`: Frame 3 (Pair 1000 M: 1994 >= 1000)
- `32.0s`: Frame 4 (Append M, num = 994)
- `37.0s`: Frame 5 (994 < 1000, pair 1000 finished)

**Text**:
> "Here we trace nineteen ninety-four, the quintessential test of Roman subtractive notation. One thousand, nine hundred and ninety-four is within our range, so the guard check passes, and our result string starts empty. We examine the largest denomination: one thousand, represented by M. Nineteen ninety-four is greater than one thousand, so we greedily append M and subtract one thousand. With nine hundred and ninety-four remaining, one thousand no longer fits, and our while loop advances."

---

## Segment 2: Subtractive Hundreds and Tens (`02-subtractive-hundreds-and-tens.mp3`)
**Frames**: 6 to 14
**Cues**:
- `0.0s`: Frame 6 (Pair 900 CM: 994 >= 900)
- `4.5s`: Frame 7 (Append CM, result = "MCM", num = 94)
- `9.0s`: Frame 8 (94 < 900, CM finished)
- `12.5s`: Frame 9 (Skip 500 D)
- `14.5s`: Frame 10 (Skip 400 CD)
- `16.5s`: Frame 11 (Skip 100 C)
- `19.0s`: Frame 12 (Pair 90 XC: 94 >= 90)
- `23.5s`: Frame 13 (Append XC, result = "MCMXC", num = 4)
- `28.0s`: Frame 14 (4 < 90, XC finished)

**Text**:
> "Next is the subtractive pair nine hundred, written as CM. Nine hundred and ninety-four is greater than nine hundred, so we append CM and subtract nine hundred, leaving just ninety-four. Because ninety-four is less than five hundred, four hundred, and one hundred, those pairs are skipped. Then we encounter ninety, written as XC. Ninety-four is greater than ninety: we append XC and subtract ninety, leaving only four."

---

## Segment 3: Subtractive Fours and Return (`03-subtractive-fours-and-return.mp3`)
**Frames**: 15 to 24
**Cues**:
- `0.0s`: Frame 15 (Skip 50 L)
- `2.0s`: Frame 16 (Skip 40 XL)
- `4.0s`: Frame 17 (Skip 10 X)
- `6.0s`: Frame 18 (Skip 9 IX)
- `8.0s`: Frame 19 (Skip 5 V)
- `10.5s`: Frame 20 (Pair 4 IV: 4 >= 4)
- `14.0s`: Frame 21 (Append IV, result = "MCMXCIV", num = 0)
- `18.5s`: Frame 22 (0 < 4, IV finished)
- `21.5s`: Frame 23 (num is 0, loop runs out)
- `26.0s`: Frame 24 (Return "MCMXCIV")

**Text**:
> "With four remaining, pairs fifty, forty, ten, nine, and five are all too large and get bypassed. We arrive at four, represented by the subtractive pair IV. Four is greater than or equal to four, so we append IV and subtract four. The remaining number is now zero. No further pairs fit, so the loop exits early. We return the final numeral: M, CM, XC, IV—nineteen ninety-four expressed with optimal brevity."
