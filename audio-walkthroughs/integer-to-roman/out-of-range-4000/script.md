# Educational Voice Script: Out of range: 4000 (`num = 4000`)

- **Topic**: Integer to Roman conversion (defensive range guard and ValueError handling)
- **Input**: `num = 4000`
- **Output**: `ValueError: num must be between 1 and 3999`
- **Frames**: 3 (0 to 2)
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`

---

## Segment 1: Setup and Range Check (`01-setup-and-range-check.mp3`)
**Frames**: 0 to 1
**Cues**:
- `0.0s`: Frame 0 (Key idea)
- `14.0s`: Frame 1 (Check range guard: 4000 is outside 1 to 3999)

**Text**:
> "Now we examine the out-of-range boundary case with input four thousand. Roman numerals in standard notation only support integers from one to three thousand, nine hundred and ninety-nine, because four thousand would require four consecutive M's, violating the standard repetition rule. When int to Roman is called with four thousand, the guard condition evaluates whether num is less than one or greater than thirty-nine ninety-nine. Since four thousand is strictly greater than thirty-nine ninety-nine, the guard triggers."

---

## Segment 2: ValueError Guard (`02-value-error-guard.mp3`)
**Frames**: 2
**Cues**:
- `0.0s`: Frame 2 (Raise ValueError: num must be between 1 and 3999)

**Text**:
> "The function immediately raises a Value Error stating that num must be between one and three thousand, nine hundred and ninety-nine. Execution halts immediately without initializing the table, allocating an output string, or building any numeral blocks, demonstrating robust defensive input validation."
