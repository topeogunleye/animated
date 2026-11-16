# Wildcard Matcher: "hello" vs "h*o" Voice Walkthrough Script

An educational audio walkthrough for the 3D interactive call-stack tower visualization of wildcard matching in [`21-wildcard-matcher-call-stack/Wildcard matcher_ call-stack tower.html`](../../21-wildcard-matcher-call-stack/Wildcard%20matcher_%20call-stack%20tower.html).

This script follows the built-in preset:
- Text: `text = "hello"`
- Pattern: `pattern = "h*o"`
- Verified Result: `True` — Pattern matches the text via wildcard exploration.
- Narrator Voice: **Lauren** (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`).

---

## 1. Verified Trace & Ground Truth

The visualization models recursive backtracking of `is_match(text, pattern)`:

```python
def is_match(text, pattern):
    if pattern == "":
        return text == ""
    if pattern[0] == "*":
        if is_match(text, pattern[1:]):
            return True
        return text != "" and is_match(text[1:], pattern)
    if text == "":
        return False
    if pattern[0] in ("?", text[0]):
        return is_match(text[1:], pattern[1:])
    return False
```

### Trace Summary for `hello` vs `h*o`:
- Frame 0: Call 1 matches `"h"` on `"hello"` and `"h*o"`. Advances to `"ello"` vs `"*o"`.
- Frames 1–3: Call 2 branches on `*`. Branch A ("match nothing") calls `"ello"` vs `"o"` $\rightarrow$ `e != o`, returns `False`.
- Frames 4–6: Branch B ("eat 'e'") calls `"llo"` vs `"*o"`. Branch A calls `"llo"` vs `"o"` $\rightarrow$ `l != o`, returns `False`.
- Frames 7–9: Branch B ("eat 'l'") calls `"lo"` vs `"*o"`. Branch A calls `"lo"` vs `"o"` $\rightarrow$ `l != o`, returns `False`.
- Frames 10–14: Branch B ("eat 'l'") calls `"o"` vs `"*o"`. Branch A calls `"o"` vs `"o"`. Matches `"o"`! Base case `""` vs `""` returns `True`.
- Frames 15–19: Success bubbles up through calls 6, 4, 2, and 1. Final answer is `True`.

---

## 2. Segment Table (ElevenLabs Audio Clips)

| Filename | Milestone Title | Active Lines | Spoken Text | Approx Duration |
|:---|:---|:---:|:---|:---:|
| `01-first-match-and-star-branch.mp3` | Matching 'h' & First Star Branch | Lines 1, 2, 4, 8, 10, 11 | Welcome to the wildcard matcher call stack tower. Our goal is to test if the pattern matches the full text, where question mark matches any single character and star matches any sequence. We begin with text hello and pattern h star o. The first letters match on h, so both advance. Now the pattern encounters a star. The algorithm tries the cheaper option first: letting star match nothing, comparing ello to o. Because e and o differ, this branch returns false. | 25s |
| `02-backtracking-and-eating-letters.mp3` | Backtracking & Consuming Letters with Star | Lines 1, 2, 4, 5, 7, 10 | Because matching nothing failed, our call stack backtracks to the star and tries its second choice: let star eat the letter e and keep the star. It stacks a new call comparing double l o to star o. Once again, matching nothing fails because l does not match o. So the star consumes the first l and tries again with l o against star o. Matching nothing fails one more time on l. | 24s |
| `03-base-match-on-o.mp3` | Reaching Base Match on 'o' | Lines 1, 2, 3, 4, 5, 10 | Now the star eats the second l, leaving text o against pattern star o. This time, when star matches nothing, we compare o against o. The letters match perfectly. Both sides advance to the empty string, reaching our base case. Because both text and pattern are fully consumed, this call succeeds and returns true in green. | 22s |
| `04-unwinding-the-tower.mp3` | Unwinding Call Stack to Victory | Lines 5, 6, 7, 11 | With a true result in hand, the call stack begins unwinding. Each parent call receives the success signal from its child branch, turns green, and pops off the tower. The final answer is true. A wildcard star simply explores two possibilities: match nothing or consume one letter, succeeding whenever either path finds a match. | 20s |

---

## 3. Continuous Read-Through

> Welcome to the wildcard matcher call stack tower. Our goal is to test if the pattern matches the full text, where question mark matches any single character and star matches any sequence. We begin with text hello and pattern h star o. The first letters match on h, so both advance. Now the pattern encounters a star. The algorithm tries the cheaper option first: letting star match nothing, comparing ello to o. Because e and o differ, this branch returns false.
>
> Because matching nothing failed, our call stack backtracks to the star and tries its second choice: let star eat the letter e and keep the star. It stacks a new call comparing double l o to star o. Once again, matching nothing fails because l does not match o. So the star consumes the first l and tries again with l o against star o. Matching nothing fails one more time on l.
>
> Now the star eats the second l, leaving text o against pattern star o. This time, when star matches nothing, we compare o against o. The letters match perfectly. Both sides advance to the empty string, reaching our base case. Because both text and pattern are fully consumed, this call succeeds and returns true in green.
>
> With a true result in hand, the call stack begins unwinding. Each parent call receives the success signal from its child branch, turns green, and pops off the tower. The final answer is true. A wildcard star simply explores two possibilities: match nothing or consume one letter, succeeding whenever either path finds a match.
