# Voice Walkthrough Script: Run-Length Round Trip — No repeated letters

**Preset Name**: No repeated letters  
**Source File**: [`02-run-length-round-trip/Run-Length Round Trip.html`](../../../02-run-length-round-trip/Run-Length%20Round%20Trip.html)  
**Input String**: `s = "abcabc"` (6 characters, no adjacent duplicates)  
**Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)  
**Target Duration**: ~3.0 minutes total (5 clips)

---

## 1. Verified Trace & Algorithm Summary

### Educational Purpose
Demonstrates the **worst-case scenario** for run-length encoding: data expansion. When consecutive characters never repeat, every run length is 1 (`ch + "1"`). The 6-character input `"abcabc"` expands into a 12-character compressed string: `'a1b1c1a1b1c1'`. This illustrates that run-length encoding is only effective when repetition is high, while confirming that decompression remains fully correct and lossless regardless of compression efficiency.

### Simulation Trace Table (`s = "abcabc"`)

| Frame | Stage / Phase | Lines Highlighted | Pointer State | Visual / Output State |
|:---:|:---|:---:|:---|:---|
| **0** | Key Idea | None | — | Tag: `round trip 'abcabc'` |
| **1** | Init Encode | 24, 25, 1, 2, 3 | `i = 0` | `result = ""` |
| **2–5** | Encode 1st 'a' | `[3,4,5]`, `[6,7]`, `[6]`, `[8,9]` | `i = 0 -> 1` | Run length 1 $\to$ `result = 'a1'` |
| **6–9** | Encode 1st 'b' | `[3,4,5]`, `[6,7]`, `[6]`, `[8,9]` | `i = 1 -> 2` | Run length 1 $\to$ `result = 'a1b1'` |
| **10–13**| Encode 1st 'c' | `[3,4,5]`, `[6,7]`, `[6]`, `[8,9]` | `i = 2 -> 3` | Run length 1 $\to$ `result = 'a1b1c1'` |
| **14–17**| Encode 2nd 'a' | `[3,4,5]`, `[6,7]`, `[6]`, `[8,9]` | `i = 3 -> 4` | Run length 1 $\to$ `result = 'a1b1c1a1'` |
| **18–21**| Encode 2nd 'b' | `[3,4,5]`, `[6,7]`, `[6]`, `[8,9]` | `i = 4 -> 5` | Run length 1 $\to$ `result = 'a1b1c1a1b1'` |
| **22–25**| Encode 2nd 'c' | `[3,4,5]`, `[6,7]`, `[6]`, `[8,9]` | `i = 5 -> 6` | Run length 1 $\to$ `result = 'a1b1c1a1b1c1'` |
| **26–27**| Encode loop end| `[3]`, `[10]` | `i = 6` | Returns 12-char `'a1b1c1a1b1c1'` |
| **28** | Init Decode | 26, 12, 13, 14 | `i = 0` | Top row: `'a1b1c1a1b1c1'`, `result = ""` |
| **29–32**| Decode 'a1' | `[14-17]`, `[18-20]`, `[18]`, `[21]` | `i = 0 -> 2` | Appends `'a'` $\to$ `result = 'a'` |
| **33–36**| Decode 'b1' | `[14-17]`, `[18-20]`, `[18]`, `[21]` | `i = 2 -> 4` | Appends `'b'` $\to$ `result = 'ab'` |
| **37–40**| Decode 'c1' | `[14-17]`, `[18-20]`, `[18]`, `[21]` | `i = 4 -> 6` | Appends `'c'` $\to$ `result = 'abc'` |
| **41–44**| Decode 'a1' | `[14-17]`, `[18-20]`, `[18]`, `[21]` | `i = 6 -> 8` | Appends `'a'` $\to$ `result = 'abca'` |
| **45–48**| Decode 'b1' | `[14-17]`, `[18-20]`, `[18]`, `[21]` | `i = 8 -> 10` | Appends `'b'` $\to$ `result = 'abcab'` |
| **49–52**| Decode 'c1' | `[14-17]`, `[18-20]`, `[18]`, `[21]` | `i = 10 -> 12` | Appends `'c'` $\to$ `result = 'abcabc'` |
| **53–54**| Decode loop end| `[14]`, `[22]` | `i = 12` | Returns `'abcabc'` |
| **55** | Round trip check| 26 | — | `decoded == s` is True (`'abcabc' a1b1c1a1b1c1 True`) |

---

## 2. Segment Table (ElevenLabs-Ready)

| Clip ID & Filename | Animation Cue / Frames | Active Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---:|
| **01-setup-and-expansion-concept.mp3** | Frame 0 -> Frame 1 | `[23, 24, 0, 1, 2]` | In this preset, we investigate the worst-case scenario for run-length encoding: what happens when there are no repeated letters? Compression algorithms rely on redundancy, but here, our input string is a-b-c-a-b-c, where every single run has a length of one. Storing each letter along with its count will actually expand our six-character input into twelve characters. In the encode function, we start with an empty result string and place pointer i at index zero. | ~36s |
| **02-encode-first-half-abc.mp3** | Frame 2 -> Frame 13 | `[3, 4, 5]` to `[8, 9]` | At index zero, pointer i inspects the letter a. Pointer j checks the next character, but at index one it sees b, which breaks the run immediately. With a length of one, we append a-1. Next at index one, pointer i inspects b, which stops at index two when it sees c, appending b-1. At index two, letter c stops at index three, appending c-1. Through the first three letters, our compressed result has already grown to a-1-b-1-c-1. | ~33s |
| **03-encode-second-half-and-return.mp3** | Frame 14 -> Frame 27 | `[3, 4, 5]` to `[10]` | Now we encode the second half of the string. At index three, letter a stops at index four, appending a-1. At index four, letter b stops at index five, appending b-1. Finally, at index five, letter c reaches the end of the text, appending c-1. Pointer i reaches the end of the string, and encode returns a-1-b-1-c-1-a-1-b-1-c-1. Because there were no repeated characters, our encoded string is now twice as long as the original. | ~33s |
| **04-decode-setup-and-first-half.mp3** | Frame 28 -> Frame 40 | `[25, 11, 12, 13]` to `[21]` | Now we enter the decoding phase to verify that decompression still works correctly. The top row holds our twelve-character encoded text, and the result resets to empty. At index zero, we read the letter a, and the inner loop parses the digit one, appending a single a. Moving to index two, letter b with count one appends b. At index four, letter c with count one appends c, successfully reconstructing the first three letters: a-b-c. | ~34s |
| **05-decode-second-half-and-round-trip.mp3** | Frame 41 -> Frame 55 | `[14, 15, 16, 17]` to `[25]` | We continue decoding the second triad. At index six, letter a with count one appends a. At index eight, letter b with count one appends b. At index ten, letter c with count one appends c, bringing our reconstructed text to a-b-c-a-b-c. Pointer i reaches the end of the encoded string, terminating the loop. Finally, comparing the decoded result with our original string shows they match identically, confirming that even during data expansion, our round trip is true. | ~36s |

---

## 3. Continuous Read-Through

> In this preset, we investigate the worst-case scenario for run-length encoding: what happens when there are no repeated letters? Compression algorithms rely on redundancy, but here, our input string is a-b-c-a-b-c, where every single run has a length of one. Storing each letter along with its count will actually expand our six-character input into twelve characters. In the encode function, we start with an empty result string and place pointer i at index zero.
>
> At index zero, pointer i inspects the letter a. Pointer j checks the next character, but at index one it sees b, which breaks the run immediately. With a length of one, we append a-1. Next at index one, pointer i inspects b, which stops at index two when it sees c, appending b-1. At index two, letter c stops at index three, appending c-1. Through the first three letters, our compressed result has already grown to a-1-b-1-c-1.
>
> Now we encode the second half of the string. At index three, letter a stops at index four, appending a-1. At index four, letter b stops at index five, appending b-1. Finally, at index five, letter c reaches the end of the text, appending c-1. Pointer i reaches the end of the string, and encode returns a-1-b-1-c-1-a-1-b-1-c-1. Because there were no repeated characters, our encoded string is now twice as long as the original.
>
> Now we enter the decoding phase to verify that decompression still works correctly. The top row holds our twelve-character encoded text, and the result resets to empty. At index zero, we read the letter a, and the inner loop parses the digit one, appending a single a. Moving to index two, letter b with count one appends b. At index four, letter c with count one appends c, successfully reconstructing the first three letters: a-b-c.
>
> We continue decoding the second triad. At index six, letter a with count one appends a. At index eight, letter b with count one appends b. At index ten, letter c with count one appends c, bringing our reconstructed text to a-b-c-a-b-c. Pointer i reaches the end of the encoded string, terminating the loop. Finally, comparing the decoded result with our original string shows they match identically, confirming that even during data expansion, our round trip is true.

---

## 4. Pronunciation & TTS Tuning Notes

- **String sequences**: Written as `a-b-c-a-b-c` so ElevenLabs reads each letter cleanly with a natural cadence.
- **Tokens**: Written as `a-1`, `b-1`, `c-1`, and `a-1-b-1-c-1-a-1-b-1-c-1` so the voice reads them as "ay one", "bee one", "see one".
- **Zero stage directions / markdown** in spoken text.

---

## 5. Accuracy Checklist

- [x] Input text is `"abcabc"` (length 6).
- [x] Encoded string is `'a1b1c1a1b1c1'` (length 12, exactly double).
- [x] Decoded string is `'abcabc'`.
- [x] Round-trip check evaluates to `True`.
- [x] All 56 frames in `simulate("abcabc")` are accounted for.
