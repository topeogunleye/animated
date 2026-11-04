# Voice Walkthrough Script: Run-Length Round Trip — Exactly ten k’s

**Preset Name**: Exactly ten k’s  
**Source File**: [`02-run-length-round-trip/Run-Length Round Trip.html`](../../../02-run-length-round-trip/Run-Length%20Round%20Trip.html)  
**Input String**: `s = "kkkkkkkkkk"` (10 identical characters)  
**Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)  
**Target Duration**: ~2.5 minutes total (4 clips)

---

## 1. Verified Trace & Algorithm Summary

### Educational Purpose
Demonstrates a clean **boundary condition** for run-length encoding: a single, uninterrupted run of exactly ten identical characters (`"kkkkkkkkkk"`). This preset highlights two fundamental concepts:
1. **High compression ratio**: Ten characters compress down to just three (`'k10'`), demonstrating how run-length encoding excels on highly repetitive data.
2. **Multi-digit run boundary**: Ten is the smallest run length requiring two digits in the count, cleanly demonstrating the base-10 accumulator (`count = count * 10 + digit`) without intervening characters or subsequent runs.

### Simulation Trace Table (`s = "kkkkkkkkkk"`)

| Frame | Stage / Phase | Lines Highlighted | Pointer State | Visual / Output State |
|:---:|:---|:---:|:---|:---|
| **0** | Key Idea | None | — | Tag: `round trip 'kkkkkkkkkk'` |
| **1** | Init Encode | 24, 25, 1, 2, 3 | `i = 0` | `result = ""` |
| **2** | Encode start | `[3, 4, 5]` | `i = 0, j = 0` | `ch = 'k'`, slab at `[0, 0]` |
| **3–12** | Scan 'k' run | `[6, 7]` | `j = 1 -> 10` | Slab widens from index 0 across all 10 'k's |
| **13** | Run end | `[6]` | `i = 0, j = 10` | `j = 10` reaches text end; run stops |
| **14** | Append 'k10' | `[8, 9]` | `i = 10, j = 10` | Appends `'k' + str(10 - 0) = 'k10'`, `i = 10` |
| **15** | Loop exit | `[3]` | `i = 10` | `i = 10` not less than 10; loop terminates |
| **16** | Return | `[10]` | `i = 10` | Returns `'k10'` |
| **17** | Init Decode | 26, 12, 13, 14 | `i = 0` | Top row: `'k10'`, `result = ""` |
| **18** | Read 'k' | `[14, 15, 16, 17]` | `i = 1` | `ch = 'k'`, `count = 0` |
| **19** | Parse '1' | `[18, 19, 20]` | `i = 2` | Digit '1' $\to$ `count = 0 * 10 + 1 = 1` |
| **20** | Parse '0' | `[18, 19, 20]` | `i = 3` | Digit '0' $\to$ `count = 1 * 10 + 0 = 10` |
| **21** | Number end | `[18]` | `i = 3` | `i = 3` reaches encoded end; count is 10 |
| **22** | Reconstruct | `[21]` | `i = 3` | Appends `'k' * 10` $\to$ `result = 'kkkkkkkkkk'` |
| **23** | Loop exit | `[14]` | `i = 3` | `i = 3` not less than 3; loop terminates |
| **24** | Return | `[22]` | `i = 3` | Returns `'kkkkkkkkkk'` |
| **25** | Round trip check| 26 | — | `decoded == s` is True (`'kkkkkkkkkk' k10 True`) |

---

## 2. Segment Table (ElevenLabs-Ready)

| Clip ID & Filename | Animation Cue / Frames | Active Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---:|
| **01-setup-and-key-idea.mp3** | Frame 0 -> Frame 1 | `[23, 24, 0, 1, 2]` | In this preset, we examine a clean boundary condition for run-length encoding: a single, uninterrupted run of exactly ten identical letters. This example serves two key pedagogical purposes: it showcases maximum compression efficiency where ten characters compress into just three, and it isolates the threshold where run counts transition from single-digit to two-digit numbers. In the encode function, we begin with an empty result string and place pointer i at index zero. | ~37s |
| **02-encode-ten-ks.mp3** | Frame 2 -> Frame 16 | `[3, 4, 5]` to `[10]` | At index zero, pointer i inspects the letter k. A second pointer, j, scans forward to measure the length of this continuous run. Because all ten characters in the string match k, pointer j sweeps across every single position from index zero to index nine. At index ten, j reaches the end of the text, ending our run. Calculating j minus i gives ten minus zero, which equals ten. We append k-10 to our result, advance pointer i to index ten, and the encode loop terminates, returning our compressed string: k-10. | ~40s |
| **03-decode-parse-ten.mp3** | Frame 17 -> Frame 22 | `[25, 11, 12, 13]` to `[21]` | Now we enter the decoding phase, where our parser must accurately reconstruct the original ten letters from the compressed string k-10. The top row now holds our three-character encoded text, and the result resets to empty. At index zero, we read the character k and move pointer i to index one. The inner loop parses the two-digit count: first reading digit one to give count 1, then reading digit zero to compute 1 times 10 plus 0, which equals ten! Multiplying k by ten appends all ten k's into our result. | ~41s |
| **04-termination-and-round-trip.mp3** | Frame 23 -> Frame 25 | `[14]` to `[25]` | Pointer i has now reached index three, the end of our encoded text, so the decode loop terminates and returns our reconstructed string of ten k's. Finally, we verify that the decoded text matches the original input: both are exactly ten k's, confirming that our round-trip check evaluates to true. Through encode and decode, our ten identical characters have completed a perfect round trip. | ~31s |

---

## 3. Continuous Read-Through

> In this preset, we examine a clean boundary condition for run-length encoding: a single, uninterrupted run of exactly ten identical letters. This example serves two key pedagogical purposes: it showcases maximum compression efficiency where ten characters compress into just three, and it isolates the threshold where run counts transition from single-digit to two-digit numbers. In the encode function, we begin with an empty result string and place pointer i at index zero.
>
> At index zero, pointer i inspects the letter k. A second pointer, j, scans forward to measure the length of this continuous run. Because all ten characters in the string match k, pointer j sweeps across every single position from index zero to index nine. At index ten, j reaches the end of the text, ending our run. Calculating j minus i gives ten minus zero, which equals ten. We append k-10 to our result, advance pointer i to index ten, and the encode loop terminates, returning our compressed string: k-10.
>
> Now we enter the decoding phase, where our parser must accurately reconstruct the original ten letters from the compressed string k-10. The top row now holds our three-character encoded text, and the result resets to empty. At index zero, we read the character k and move pointer i to index one. The inner loop parses the two-digit count: first reading digit one to give count 1, then reading digit zero to compute 1 times 10 plus 0, which equals ten! Multiplying k by ten appends all ten k's into our result.
>
> Pointer i has now reached index three, the end of our encoded text, so the decode loop terminates and returns our reconstructed string of ten k's. Finally, we verify that the decoded text matches the original input: both are exactly ten k's, confirming that our round-trip check evaluates to true. Through encode and decode, our ten identical characters have completed a perfect round trip.

---

## 4. Pronunciation & TTS Tuning Notes

- **String token**: Written as `k-10` so ElevenLabs reads cleanly as "kay ten".
- **Letter references**: Single letter `k` is read as "kay".
- **Mathematical expressions**: Spoken in plain prose ("ten minus zero, which equals ten", "1 times 10 plus 0, which equals ten!").
- **Zero markdown or stage cues** in spoken text blocks.

---

## 5. Accuracy Checklist

- [x] Input text is `"kkkkkkkkkk"` (length 10).
- [x] Encoded string is `'k10'` (length 3, single run of 10).
- [x] Decoded string is `'kkkkkkkkkk'`.
- [x] Round-trip check evaluates to `True`.
- [x] All 26 frames in `simulate("kkkkkkkkkk")` are accounted for.
