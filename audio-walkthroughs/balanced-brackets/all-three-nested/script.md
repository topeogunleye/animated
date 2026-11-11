# Script: Balanced Brackets — Preset 1: "All three nested: {[()]}"

- **Target Visualizer**: [`12-balanced-brackets/Balanced brackets in 3D, step by step.html`](../../12-balanced-brackets/Balanced%20brackets%20in%203D%2C%20step%20by%20step.html)
- **Preset Name**: `"All three nested: {[()]}"`
- **Input Argument**: `text = "{[()]}"` (length: 6 characters)
- **Verified Result**: `is_balanced` returns **True**; bonus `max_depth` returns **3**
- **Narrator Voice**: **Lauren** (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`)
- **ElevenLabs Model**: `eleven_multilingual_v2`
- **Stability**: `0.50` | **Clarity / Similarity Boost**: `0.75` | **Style**: `0.0` | **Speaker Boost**: `true`

---

## 1. Verified Outline & Ground Truth

### Expression Layout
- **Input**: `"{[()]}"` (all six characters are bracket delimiters)
- **Structure**: Three concentric layers of nesting:
  1. Outer layer: `{` at index 0 and `}` at index 5 (Curly braces)
  2. Middle layer: `[` at index 1 and `]` at index 4 (Square brackets)
  3. Inner core: `(` at index 2 and `)` at index 3 (Parentheses)

| Index | Character | Type | Stack Action | Stack After Step | Current Depth | Peak Depth |
|:---:|:---:|:---:|:---|:---:|:---:|:---:|
| 0 | `{` | Opener | Push onto stack rack | `['{']` | 1 | 1 |
| 1 | `[` | Opener | Push onto stack rack | `['{', '[']` | 2 | 2 |
| 2 | `(` | Opener | Push onto stack rack | `['{', '[', '(']` | 3 | 3 |
| 3 | `)` | Closer | Matches top `(`; Pop | `['{', '[']` | 2 | 3 |
| 4 | `]` | Closer | Matches top `[`; Pop | `['{']` | 1 | 3 |
| 5 | `}` | Closer | Matches top `{`; Pop | `[]` | 0 | 3 |

---

### Python Source Code (24 Lines)

The 3D visualizer highlights the following source lines in the right-hand code panel:

```python
 0: def is_balanced(text):
 1:     matching = {')': '(', ']': '[', '}': '{'}
 2:     openers = set(matching.values())
 3:     stack = []
 4:     for ch in text:
 5:         if ch in openers:
 6:             stack.append(ch)
 7:         elif ch in matching:
 8:             if not stack or stack[-1] != matching[ch]:
 9:                 return False
10:             stack.pop()
11:     return len(stack) == 0
12: def max_depth(text):
13:     matching = {')': '(', ']': '[', '}': '{'}
14:     openers = set(matching.values())
15:     deepest, current = 0, 0
16:     for ch in text:
17:         if ch in openers:
18:             current += 1
19:             if current > deepest:
20:                 deepest = current
21:         elif ch in matching:
22:             current -= 1
23:     return deepest
```

---

### Simulation Frame Trace (16 Frames)

| Frame | Active Code Lines | Phase | `curIdx` | `curCh` | Stack State | Depth | 3D Visual State Changes |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **0** | Lines 0, 1, 2, 3 | Balance | None | None | `[]` | 0 | Blue Phase 1 banner appears; 6 character pedestal blocks rest on floor; empty stack rack on right. |
| **1** | Lines 4, 5, 6 | Balance | 0 | `{` | `['{']` | 1 | Gold pointer hovers over index 0 (`{`); cyan block drops into rack level 1; translucent slab expands to height 1. |
| **2** | Lines 4, 5, 6 | Balance | 1 | `[` | `['{', '[']` | 2 | Gold pointer moves to index 1 (`[`); cyan block stacks at level 2; slab and TOP pointer elevate. |
| **3** | Lines 4, 5, 6 | Balance | 2 | `(` | `['{', '[', '(']` | 3 | Gold pointer moves to index 2 (`(`); cyan block stacks at level 3; stack reaches peak depth 3. |
| **4** | Lines 7, 8, 10 | Balance | 3 | `)` | `['{', '[']` | 2 | Gold pointer moves to closer `)`; top block `(` pops out and glows green; matched counter increments; depth drops to 2. |
| **5** | Lines 7, 8, 10 | Balance | 4 | `]` | `['{']` | 1 | Gold pointer moves to closer `]`; block `[` pops out and glows green; depth drops to 1. |
| **6** | Lines 7, 8, 10 | Balance | 5 | `}` | `[]` | 0 | Gold pointer moves to closer `}`; bottom block `{` pops out; stack rack is now empty. |
| **7** | Line 11 | Balance | None | None | `[]` | 0 | Green success banner appears: `RESULT: TRUE (BALANCED)`; all 6 pedestals illuminate green. |
| **8** | Lines 12, 13, 14, 15 | Depth | None | None | `[]` | 0 | Gold Phase 2 banner appears: `PHASE 2: BONUS MAX DEPTH`; vertical depth gauge resets with markers at 0. |
| **9** | Lines 16, 17, 18, 19, 20 | Depth | 0 | `{` | `[]` | 1 | Scanner advances to index 0; depth gauge rises to 1; peak line moves to 1. |
| **10** | Lines 16, 17, 18, 19, 20 | Depth | 1 | `[` | `[]` | 2 | Scanner advances to index 1; depth gauge rises to 2; peak line moves to 2. |
| **11** | Lines 16, 17, 18, 19, 20 | Depth | 2 | `(` | `[]` | 3 | Scanner advances to index 2; depth gauge rises to 3; peak line moves to 3. |
| **12** | Lines 16, 21, 22 | Depth | 3 | `)` | `[]` | 2 | Scanner advances to index 3; closer decrements gauge to 2; peak line remains locked at 3. |
| **13** | Lines 16, 21, 22 | Depth | 4 | `]` | `[]` | 1 | Scanner advances to index 4; closer decrements gauge to 1; peak line remains locked at 3. |
| **14** | Lines 16, 21, 22 | Depth | 5 | `}` | `[]` | 0 | Scanner advances to index 5; closer decrements gauge to 0; peak line remains locked at 3. |
| **15** | Line 23 | Depth | None | None | `[]` | 0 | Line 23 highlights; returns peak nesting level of 3. |

---

## 2. Segments Table (ElevenLabs Ready)

The following table contains the 5 verified audio segments for this preset. The Spoken Text column contains conversational English formatted strictly for text-to-speech synthesis (no markdown symbols, no raw brackets, numbers written in words).

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---:|:---|:---:|
| 1 | `01-setup-and-first-opener.mp3` | **Frames 0 – 1**<br>Init matching dict, set of openers, empty stack. At index 0, opener `{` drops into rack level 1. | Lines 0–3, 4–6 | Welcome to Balanced Brackets in three dimensions. In this walkthrough, we test an expression containing all three bracket types nested deeply inside one another: open curly brace, open square bracket, open parenthesis, close parenthesis, close square bracket, close curly brace. To verify that every bracket closes in correct order, we initialize a matching dictionary, an openers set, and an empty stack rack. At index zero, we inspect our first character, an opening curly brace. Because it is an opener, line six pushes it onto our stack rack, establishing a stack depth of one. | ~39.9s |
| 2 | `02-stack-building-to-peak.mp3` | **Frames 2 – 3**<br>Index 1 pushes `[` to depth 2. Index 2 pushes `(` to peak depth 3. | Lines 4–6 | Continuing our scan, we encounter two more opening brackets in rapid succession. At index one, we see an opening square bracket, which pushes onto the stack and raises our depth to two. Then at index two, we encounter an opening parenthesis, pushing it to the very top and bringing our stack depth to three. Notice how the vertical rack visualizes the core principle of a stack: each new opening bracket rests directly on top of the previous one, waiting for its corresponding partner. | ~35.6s |
| 3 | `03-unwinding-the-stack.mp3` | **Frames 4 – 6**<br>Index 3 pops `(` (depth 2). Index 4 pops `[` (depth 1). Index 5 pops `{` (depth 0). | Lines 7–8, 10 | Now the closing brackets arrive in mirror order, testing last in, first out matching. At index three, a closing parenthesis appears. We check the top of our stack, find a matching opening parenthesis, and pop it, lowering our stack depth to two. At index four, a closing square bracket arrives, matching and popping the square bracket to reach depth one. Finally, at index five, the closing curly brace matches and pops the outer curly brace, leaving our stack completely empty. | ~34.3s |
| 4 | `04-balanced-completion.mp3` | **Frame 7**<br>Loop finishes. Line 11 evaluates `len(stack) == 0`. Green balanced banner displays. | Line 11 | With all six characters scanned, our loop terminates. On line twelve, the function executes its final verification: is the stack empty? Because every opener was paired and popped in textbook order, length of stack equals zero evaluates to True. The green success banner confirms that our nested expression is perfectly balanced. | ~21.9s |
| 5 | `05-bonus-max-depth.mp3` | **Frames 8 – 15**<br>Phase 2 initialization and live traversal of `max_depth`. Depth gauge rises to 3 and returns 3. | Lines 12–15, 16–23 | Because the expression is balanced, we now trace the bonus maximum depth function. This algorithm measures how deeply brackets nest without needing Python's built-in max function. Starting with deepest and current at zero, each opening bracket increments our depth counter, pushing the recorded peak up to three at the innermost parenthesis. As the closing brackets arrive, current steps down to zero, and line twenty-four returns our final peak nesting level of three. | ~30.9s |

---

## 3. Pronunciation & Synthesis Notes

| Term / Expression | Spoken Phrasing | Reason |
|:---|:---|:---|
| `{[()]}` | "open curly brace, open square bracket, open parenthesis, close parenthesis, close square bracket, close curly brace" | Clear verbal expansion prevents punctuation swallowing by TTS. |
| `is_balanced` | "is balanced" | Conversational pronunciation matches student mental model. |
| `max_depth` | "max depth" or "maximum depth" | Natural phrasing in spoken English. |
| `len(stack) == 0` | "length of stack equals zero" | Eliminates operator confusion in speech synthesis. |
| `LIFO` | "last in, first out" | Natural speaking cadence avoids harsh abbreviation artifacts. |
| `indices` | "in-dih-seez" | Standard English plural for indexing positions. |
| Numbers (`0`, `1`, `2`, `3`, etc.) | "zero", "one", "two", "three", "twelve", "twenty-four" | Ensures ElevenLabs generates smooth numeric phrasing. |

---

## 4. Character & Word Count Summary

| Clip Filename | Word Count | Character Count (with spaces) | Est. Duration (140 wpm) |
|:---|:---:|:---:|:---:|
| `01-setup-and-first-opener.mp3` | 93 words | 581 chars | ~39.9s |
| `02-stack-building-to-peak.mp3` | 83 words | 485 chars | ~35.6s |
| `03-unwinding-the-stack.mp3` | 80 words | 478 chars | ~34.3s |
| `04-balanced-completion.mp3` | 51 words | 328 chars | ~21.9s |
| `05-bonus-max-depth.mp3` | 72 words | 469 chars | ~30.9s |
| **Total Production** | **379 words** | **2,341 chars** | **~162.6s (2m 43s)** |
