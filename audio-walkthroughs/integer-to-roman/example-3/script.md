# Educational Voice Script: Example: 3 (`num = 3`)

- **Topic**: Integer to Roman conversion (additive units)
- **Input**: `num = 3`
- **Output**: `"III"`
- **Frames**: 22 (0 to 21)
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`

---

## Segment 1: Setup and Key Idea (`01-setup-and-key-idea.mp3`)
**Frames**: 0 to 2
**Cues**:
- `0.0s`: Frame 0 (Key idea)
- `14.0s`: Frame 1 (Check range guard $1 \le 3 \le 3999$)
- `21.0s`: Frame 2 (Initialize table and empty result string)

**Text**:
> "Welcome to Integer to Roman. In Roman numerals, we greedily take the largest value that still fits our remaining number. Our descending lookup table holds all thirteen standard denominations, including the subtractive pairs like nine hundred and four. We start with three. Three falls safely within the valid range of one to three thousand, nine hundred and ninety-nine, so the guard check passes. We initialize our result string to empty, and prepare to scan through our table."

---

## Segment 2: Skipping Large Denominations (`02-skipping-large-pairs.mp3`)
**Frames**: 3 to 14
**Cues**:
- `0.0s`: Frame 3 (Pair 1000, M)
- `2.0s`: Frame 5 (Pair 500, D)
- `4.0s`: Frame 7 (Pair 100, C)
- `6.0s`: Frame 9 (Pair 50, L)
- `8.0s`: Frame 11 (Pair 10, X)
- `10.0s`: Frame 13 (Pair 5, V)
- `12.0s`: Frame 14 (Pair 4, IV)

**Text**:
> "Now the for loop begins at one thousand. Since three is less than one thousand, nine hundred, and five hundred, the while loop condition is false and each large denomination is skipped. The pointer continues down past one hundred, fifty, ten, five, and four. None of these fit into three, so our numeral remains empty as we sweep toward the smallest units."

---

## Segment 3: Greedily Adding Ones and Return (`03-greedy-ones-and-return.mp3`)
**Frames**: 15 to 21
**Cues**:
- `0.0s`: Frame 15 (Pair 1, I: 3 >= 1)
- `4.0s`: Frame 16 (Append I, num = 2)
- `8.0s`: Frame 17 (Append I, num = 1)
- `12.0s`: Frame 18 (Append I, num = 0)
- `16.0s`: Frame 19 (Loop stops: 0 < 1)
- `20.0s`: Frame 20 (Loop ends)
- `23.0s`: Frame 21 (Return "III")

**Text**:
> "Finally, we reach the pair one and capital I. Three is greater than or equal to one, so our while loop runs. In the first iteration, we append I and subtract one, leaving two. Two is still greater than or equal to one, so we append a second I, leaving one. One fits once more: we append our third I, and the remaining number becomes zero. With zero remaining, the while loop exits, the table scan concludes, and we return the finished Roman numeral: I, I, I."
