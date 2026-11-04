# Voice Walkthrough Script: Run-Length Round Trip — Twelve a’s (two digits)

**Preset Name**: Twelve a’s (two digits)  
**Source File**: [`02-run-length-round-trip/Run-Length Round Trip.html`](../../../02-run-length-round-trip/Run-Length%20Round%20Trip.html)  
**Input String**: `s = "aaaaaaaaaaaab"` (12 consecutive 'a's followed by 1 'b')  
**Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)  
**Target Duration**: ~3.0 minutes total (5 clips)

---

## 1. Verified Trace & Algorithm Summary

### Educational Purpose
Demonstrates how run-length encoding handles run lengths that require **two or more digits** (here, a run of 12 identical letters). Crucially, during decoding, `rle_decode` cannot assume single-digit counts; it uses an inner `while` loop with `encoded[i].isdigit()` to parse multi-digit integers (`count = count * 10 + int(encoded[i])`).

### Simulation Trace Table (`s = "aaaaaaaaaaaab"`)

| Frame | Stage / Phase | Lines Highlighted | Pointer State | Visual / Output State |
|:---:|:---|:---:|:---|:---|
| **0** | Key Idea | None | — | Tag: `round trip 'aaaaaaaaaaaab'` |
| **1** | Init Encode | 24, 25, 1, 2, 3 | `i = 0` | `result = ""` |
| **2** | Probe 'a' | 4, 5, 6 | `i = 0, j = 0` | `ch = 'a'`, slab `[0, 0]` |
| **3–14** | Scan 12 matches | 7, 8 | `i = 0, j = 1..12` | `text[0..11] == 'a'`, slab expands `[0, 11]` |
| **15** | Run stop | 7 | `i = 0, j = 12` | `text[12] = 'b' != 'a'` |
| **16** | Append 'a12' | 9, 10 | `i = 12, j = 12` | `result = 'a12'` (two digits appended) |
| **17** | Probe 'b' | 4, 5, 6 | `i = 12, j = 12` | `ch = 'b'`, slab `[12, 12]` |
| **18** | Scan match 'b'| 7, 8 | `i = 12, j = 13` | `text[12] == 'b'` |
| **19** | Run stop | 7 | `i = 12, j = 13` | `j = 13` reaches text end |
| **20** | Append 'b1' | 9, 10 | `i = 13, j = 13` | `result = 'a12b1'` |
| **21** | Loop ends | 4 | `i = 13` | `i < len(text)` is False |
| **22** | Return encoded | 11 | `i = 13` | Returns `'a12b1'` |
| **23** | Init Decode | 26, 12, 13, 14 | `i = 0` | Top row: `'a12b1'`, `result = ""` |
| **24** | Read char 'a' | 15, 16, 17, 18 | `i = 1` | `ch = 'a'`, `count = 0` |
| **25** | Parse 1st digit '1' | 19, 20, 21 | `i = 2` | `count = 0 * 10 + 1 = 1` |
| **26** | Parse 2nd digit '2' | 19, 20, 21 | `i = 3` | `count = 1 * 10 + 2 = 12` |
| **27** | Digit stop | 19 | `i = 3` | `encoded[3] = 'b'` is not a digit |
| **28** | Append 12 a's | 22 | `i = 3` | `result = 'aaaaaaaaaaaa'` |
| **29** | Read char 'b' | 15, 16, 17, 18 | `i = 4` | `ch = 'b'`, `count = 0` |
| **30** | Parse digit '1'| 19, 20, 21 | `i = 5` | `count = 0 * 10 + 1 = 1` |
| **31** | Digit stop | 19 | `i = 5` | `i = 5` reaches encoded end |
| **32** | Append 'b' | 22 | `i = 5` | `result = 'aaaaaaaaaaaab'` |
| **33** | Loop ends | 15 | `i = 5` | `i < len(encoded)` is False |
| **34** | Return decoded | 23 | `i = 5` | Returns `'aaaaaaaaaaaab'` |
| **35** | Round trip check | 26 | — | `decoded == s` is True (`'aaaaaaaaaaaab' a12b1 True`) |

---

## 2. Segment Table (ElevenLabs-Ready)

| Clip ID & Filename | Animation Cue / Frames | Active Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---:|
| **01-setup-and-key-idea.mp3** | Frame 0 -> Frame 1 | `[23, 24, 0, 1, 2]` | In this example, we explore a crucial behavior in run-length encoding: handling runs that span ten or more characters. When a run reaches two digits, the count requires multiple characters to represent. We begin our round trip with twelve consecutive letter a's followed by a single letter b, making thirteen characters total. In the encode function, we start with an empty result string and place pointer i at index zero. | ~35s |
| **02-encode-twelve-as.mp3** | Frame 2 -> Frame 16 | `[3, 4, 5]` to `[8, 9]` | At index zero, pointer i inspects the letter a. A second pointer, j, scans forward through the text as long as each character matches a. It advances across twelve consecutive positions, from index zero all the way to index eleven. At index twelve, it encounters the letter b, which ends the run. Calculating j minus i gives twelve minus zero, which equals twelve. We append a-12 to our result and jump pointer i forward to index twelve. | ~36s |
| **03-encode-b-and-return.mp3** | Frame 17 -> Frame 22 | `[3, 4, 5]` to `[10]` | Now at index twelve, pointer i inspects the letter b. Pointer j moves to index thirteen, reaching the end of the text. Because this run has length one, we append b-1 to our compressed result, giving a-12-b-1. Pointer i has now reached the end of the text, so the encode loop terminates and returns our finished compressed string. | ~27s |
| **04-decode-two-digit-run-twelve.mp3** | Frame 23 -> Frame 28 | `[25, 11, 12, 13]` to `[21]` | Now we enter the decoding phase, where parsing multi-digit numbers is essential. The top row displays our compressed string, a-12-b-1, and the result resets to empty. At index zero, we read the character a and advance pointer i to index one. The inner while loop parses consecutive digits. First, it reads digit 1, giving count 1. Then it reads digit 2, computing 1 times 10 plus 2, which equals twelve! At index three, it sees the letter b, terminating the number. Multiplying a by twelve reconstructs our twelve consecutive a's. | ~42s |
| **05-decode-b-and-round-trip.mp3** | Frame 29 -> Frame 35 | `[14, 15, 16, 17]` to `[25]` | Moving to index three, pointer i reads the letter b and steps to index four. The inner loop reads the digit one, setting the count to one. Repeating b once appends b to our result, completing the reconstruction of twelve a's and one b. Pointer i reaches the end of the encoded text, so decode returns. Finally, we verify that the decoded string matches our original input: they are identical, confirming our round-trip check is true. | ~36s |

---

## 3. Continuous Read-Through

> In this example, we explore a crucial behavior in run-length encoding: handling runs that span ten or more characters. When a run reaches two digits, the count requires multiple characters to represent. We begin our round trip with twelve consecutive letter a's followed by a single letter b, making thirteen characters total. In the encode function, we start with an empty result string and place pointer i at index zero.
>
> At index zero, pointer i inspects the letter a. A second pointer, j, scans forward through the text as long as each character matches a. It advances across twelve consecutive positions, from index zero all the way to index eleven. At index twelve, it encounters the letter b, which ends the run. Calculating j minus i gives twelve minus zero, which equals twelve. We append a-12 to our result and jump pointer i forward to index twelve.
>
> Now at index twelve, pointer i inspects the letter b. Pointer j moves to index thirteen, reaching the end of the text. Because this run has length one, we append b-1 to our compressed result, giving a-12-b-1. Pointer i has now reached the end of the text, so the encode loop terminates and returns our finished compressed string.
>
> Now we enter the decoding phase, where parsing multi-digit numbers is essential. The top row displays our compressed string, a-12-b-1, and the result resets to empty. At index zero, we read the character a and advance pointer i to index one. The inner while loop parses consecutive digits. First, it reads digit 1, giving count 1. Then it reads digit 2, computing 1 times 10 plus 2, which equals twelve! At index three, it sees the letter b, terminating the number. Multiplying a by twelve reconstructs our twelve consecutive a's.
>
> Moving to index three, pointer i reads the letter b and steps to index four. The inner loop reads the digit one, setting the count to one. Repeating b once appends b to our result, completing the reconstruction of twelve a's and one b. Pointer i reaches the end of the encoded text, so decode returns. Finally, we verify that the decoded string matches our original input: they are identical, confirming our round-trip check is true.

---

## 4. Pronunciation & TTS Tuning Notes

- **Multi-digit tokens**: Written as `a-12`, `b-1`, and `a-12-b-1` so ElevenLabs pronounces them naturally as "ay twelve", "bee one", "ay twelve bee one".
- **Mathematical evaluation**: Written as "one times ten plus two, which equals twelve" so the voice delivers the number parsing logic smoothly and clearly.
- **Indices & numbers**: Written out phonetically in plain English (`zero`, `one`, `two`, `three`, `four`, `eleven`, `twelve`, `thirteen`) without symbols.

---

## 5. Accuracy Checklist

- [x] Input text is `"aaaaaaaaaaaab"` (12 'a's + 1 'b', length 13).
- [x] Encoded string is `'a12b1'` (length 5).
- [x] Decoded string is `'aaaaaaaaaaaab'` (length 13).
- [x] Multi-digit loop arithmetic (`0 * 10 + 1 = 1`, `1 * 10 + 2 = 12`) verified against code.
- [x] Round-trip check evaluates to `True`.
- [x] All 36 frames in `simulate("aaaaaaaaaaaab")` are accounted for.
