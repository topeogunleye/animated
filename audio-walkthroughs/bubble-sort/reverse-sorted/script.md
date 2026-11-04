# Spoken Script: Reverse Sorted [5, 4, 3, 2, 1] (Worst Case)

## Voice
- **Voice**: Lauren (`DODLEQrClDo8wCz460ld`)
- **Tone**: Clear, educational, paced, highlighting the quadratic inversion penalty

---

### Clip 1: `01-setup-and-pass-one.mp3`
**Frames**: 0 – 11
**Text**:
> "Here we examine the true worst-case scenario for Bubble Sort: an array completely reversed from five down to one. Because every single pair is inverted, every comparison will force a swap. We initialize our counters and launch pass one with four pair checks. First, five is greater than four, so they swap. Next, five is compared with three and swapped. Then five compares with two and swaps. Finally, five compares with one and swaps. In this single pass, the maximum value five had to bubble all the way across the array to index four, racking up four comparisons and four swaps."

---

### Clip 2: `02-pass-two-bubbling-four.mp3`
**Frames**: 12 – 19
**Text**:
> "Pass two begins, checking the three unsorted pairs up to index three. Four is compared with three and swapped. Four is then compared with two and swapped. Finally, four is compared with one and swapped. Four reaches its proper home at index three, bringing our totals to seven comparisons and seven swaps."

---

### Clip 3: `03-pass-three-bubbling-three.mp3`
**Frames**: 20 – 25
**Text**:
> "Pass three narrows the search window down to just two pairs. Three is compared with two and swapped. Three is then compared with one and swapped. Three is now permanently settled at index two, leaving only two elements left to be verified."

---

### Clip 4: `04-pass-four-and-worst-case.mp3`
**Frames**: 26 – 31
**Text**:
> "Pass four performs the final comparison between two and one. Two is greater than one, triggering our tenth and final swap. Both remaining items are now settled in their proper positions. Because the array was reversed, no early exit could trigger. The sort required exactly n times n minus one divided by two, or ten comparisons, and ten swaps. We return ten comparisons and ten swaps, demonstrating the quadratic big-O of n squared worst case."
