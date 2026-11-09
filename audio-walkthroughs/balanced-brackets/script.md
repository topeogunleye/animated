# Balanced Brackets in 3D: Voice Walkthrough Master Script

An educational audio walkthrough for the 3D interactive visualization of bracket validation in [`12-balanced-brackets/Balanced brackets in 3D, step by step.html`](../../12-balanced-brackets/Balanced%20brackets%20in%203D%2C%20step%20by%20step.html).

This script follows the built-in preset:
- Expression: `text = "(a + b) * [c - d]"`
- Verified Result: `is_balanced` returns **True**; `max_depth` returns **1**.

All narration clips are written for curious beginners, linking the highlighted Python code to the visual changes in the 3D scene (input string pedestals, vertical stack rack, and depth gauge) without reciting raw syntax. The spoken text is formatted specifically for ElevenLabs text-to-speech generation.

---

## 1. Verified Outline and Ground Truth

### Input and Expression Layout
- **Input text**: `"(a + b) * [c - d]"` (length `n = 17` characters)
- **Goal**: Confirm every opening bracket has an exact matching partner in Last-In, First-Out order, ignoring non-bracket characters.
- **Bonus Goal**: Measure the maximum nesting depth without using `max()`.

| Index | Character | Role in Walkthrough |
|:-----:|:---------:|:-------------------|
| 0 | `(` | Opening parenthesis; pushed to stack rack (depth 1). |
| 1 | `a` | Non-bracket variable; ignored. |
| 2 | ` ` | Space; ignored. |
| 3 | `+` | Plus operator; ignored. |
| 4 | ` ` | Space; ignored. |
| 5 | `b` | Non-bracket variable; ignored. |
| 6 | `)` | Closing parenthesis; matches `(` at top of stack; popped. |
| 7 | ` ` | Space; ignored. |
| 8 | `*` | Multiplication operator; ignored. |
| 9 | ` ` | Space; ignored. |
| 10 | `[` | Opening square bracket; pushed to stack rack (depth 1). |
| 11 | `c` | Non-bracket variable; ignored. |
| 12 | ` ` | Space; ignored. |
| 13 | `-` | Minus operator; ignored. |
| 14 | ` ` | Space; ignored. |
| 15 | `d` | Non-bracket variable; ignored. |
| 16 | `]` | Closing square bracket; matches `[` at top of stack; popped. |

---

### Algorithm Logic and Python Source

The animation displays the following 24-line Python source code:

```python
 1: def is_balanced(text):
 2:     matching = {')': '(', ']': '[', '}': '{'}
 3:     openers = set(matching.values())
 4:     stack = []
 5:     for ch in text:
 6:         if ch in openers:
 7:             stack.append(ch)
 8:         elif ch in matching:
 9:             if not stack or stack[-1] != matching[ch]:
10:                 return False
11:             stack.pop()
12:     return len(stack) == 0
13: def max_depth(text):
14:     matching = {')': '(', ']': '[', '}': '{'}
15:     openers = set(matching.values())
16:     deepest, current = 0, 0
17:     for ch in text:
18:         if ch in openers:
19:             current += 1
20:             if current > deepest:
21:                 deepest = current
22:         elif ch in matching:
23:             current -= 1
24:     return deepest
```

### The Key Invariants
1. **LIFO Matching**: The most recently opened bracket must be the first one closed.
2. **Immediate Failure Cases**:
   - If a closing bracket appears and the stack is empty (`not stack`), return `False`.
   - If the closing bracket does not match the opener on top of the stack (`stack[-1] != matching[ch]`), return `False`.
3. **Completion**: When the loop terminates, return `len(stack) == 0`. If unclosed openers remain, return `False`.
4. **Depth Tracking**: The physical height of the stack directly represents nesting depth. `current > deepest` tracks peak depth without calling `max()`.

---

### Verified Simulation Trace (25 Frames)

| Frame | Active Lines | `ch` (Index) | Action | Stack State | Depth | 3D Visual Changes |
|:---:|:---:|:---:|:---|:---:|:---:|:---|
| **0** | 1, 2, 3, 4 | None | Initialize | `[]` | 0 | Floor plate, upright blocks, empty stack rack, depth gauge at 0. |
| **1** | 5, 6, 7 | `(` (0) | Push | `['(']` | 1 | Gold `ch` pointer above index 0; blue block drops into stack rack; depth marker rises to 1. |
| **2** | 5, 6, 8 | `a` (1) | Ignore | `['(']` | 1 | Scanner moves to index 1; non-bracket block dims; stack unchanged. |
| **3** | 5, 6, 8 | ` ` (2) | Ignore | `['(']` | 1 | Scanner moves to index 2; space block dims; stack unchanged. |
| **4** | 5, 6, 8 | `+` (3) | Ignore | `['(']` | 1 | Scanner moves to index 3; operator block dims; stack unchanged. |
| **5** | 5, 6, 8 | ` ` (4) | Ignore | `['(']` | 1 | Scanner moves to index 4; space block dims; stack unchanged. |
| **6** | 5, 6, 8 | `b` (5) | Ignore | `['(']` | 1 | Scanner moves to index 5; variable block dims; stack unchanged. |
| **7** | 8, 9, 11 | `)` (6) | Match & Pop | `[]` | 0 | Scanner at index 6; index 6 and stack block glow green; stack block lifts out and fades; depth drops to 0. |
| **8** | 5, 6, 8 | ` ` (7) | Ignore | `[]` | 0 | Scanner at index 7; space block dims. |
| **9** | 5, 6, 8 | `*` (8) | Ignore | `[]` | 0 | Scanner at index 8; multiplication block dims. |
| **10** | 5, 6, 8 | ` ` (9) | Ignore | `[]` | 0 | Scanner at index 9; space block dims. |
| **11** | 5, 6, 7 | `[` (10) | Push | `['[']` | 1 | Scanner at index 10; amber block drops into stack rack; depth marker rises to 1. |
| **12** | 5, 6, 8 | `c` (11) | Ignore | `['[']` | 1 | Scanner at index 11; variable block dims. |
| **13** | 5, 6, 8 | ` ` (12) | Ignore | `['[']` | 1 | Scanner at index 12; space block dims. |
| **14** | 5, 6, 8 | `-` (13) | Ignore | `['[']` | 1 | Scanner at index 13; operator block dims. |
| **15** | 5, 6, 8 | ` ` (14) | Ignore | `['[']` | 1 | Scanner at index 14; space block dims. |
| **16** | 5, 6, 8 | `d` (15) | Ignore | `['[']` | 1 | Scanner at index 15; variable block dims. |
| **17** | 8, 9, 11 | `]` (16) | Match & Pop | `[]` | 0 | Scanner at index 16; index 16 and stack block glow green; stack block lifts out and fades; depth drops to 0. |
| **18** | 12 | None | Return | `[]` | 0 | Loop terminates; stack is empty; floating green banner displays "RESULT: TRUE (BALANCED)". |
| **19** | 13, 14, 15, 16 | None | Start Depth | `[]` | 0 | Phase banner updates to "PHASE 2: BONUS MAX DEPTH"; deepest and current set to 0. |
| **20** | 17, 18, 19, 20, 21 | `(` (0) | Depth Rise | `[]` | 1 | Scanner at index 0; depth gauge rises to 1; golden peak line locks at 1. |
| **21** | 17, 22, 23 | `)` (6) | Depth Drop | `[]` | 0 | Scanner at index 6; depth gauge drops to 0; golden peak line stays at 1. |
| **22** | 17, 18, 19, 20 | `[` (10) | Depth Rise | `[]` | 1 | Scanner at index 10; depth gauge rises to 1 (does not exceed peak 1). |
| **23** | 17, 22, 23 | `]` (16) | Depth Drop | `[]` | 0 | Scanner at index 16; depth gauge drops to 0; peak line stays at 1. |
| **24** | 24 | None | Return Peak | `[]` | 0 | Traversal complete; returns deepest nesting level 1. |

---

## 2. Segment Table (ElevenLabs Audio Clips)

The walkthrough is split into 3 self-contained clips aligning with the major visual milestones.

| Clip ID & Filename | Animation Cue & State | Active Code Lines | Spoken Text (ElevenLabs-Ready) | Characters | Duration |
|:---|:---|:---:|:---|:---:|:---:|
| `01-setup-and-first-pair.mp3` | **Initial scene & First Bracket Pair**<br>String `(a + b) * [c - d]` appears on left pedestals. Stack rack is empty on right. Scanner pushes open parenthesis at index zero into stack rack. Variable and math symbols pass through. Closing parenthesis at index six pops matching open parenthesis. | Lines 1–4, then 5–7, then 8–11 | Welcome to Balanced Brackets in 3D. We use a last-in, first-out stack to verify that every opening bracket has an exact matching partner in the correct order. We begin with our first expression: open paren, a plus b, close paren, times, open bracket, c minus d, close bracket. On the right, our 3D stack rack is completely empty. We scan the first character, an open parenthesis, and push it straight into the stack rack. Next, the characters a, plus, and b are standard math symbols, not brackets, so our algorithm ignores them. When we reach the closing parenthesis at index six, we check the top of our stack. It holds the matching open parenthesis, so we pop it out. The first sub-expression is perfectly balanced. | 682 chars | ~32s |
| `02-second-pair-and-completion.mp3` | **Second Bracket Pair & Completion**<br>Scanner steps past multiplication symbol. Open bracket at index ten drops into stack rack. Characters c, minus, and d are ignored. Closing bracket at index sixteen pops matching open bracket. Loop finishes with empty stack; returns True. | Lines 5–8, then 5–7, then 8–11, then Line 12 | Continuing down the string, the multiplication operator and spaces are ignored. At index ten, we meet an open square bracket and push it into the stack rack. Once again, the letters c and d along with the subtraction sign pass through untouched. At index sixteen, we encounter the closing square bracket. Checking our stack, the top item is the matching open square bracket. We pop it out, leaving the stack empty. With all seventeen characters scanned and zero leftover brackets on the stack, the function returns True. | 520 chars | ~26s |
| `03-bonus-max-depth.mp3` | **Bonus Max Depth Traversal**<br>Phase banner switches to "PHASE 2: BONUS MAX DEPTH". Depth gauge tracks current depth as it rises to one at index zero, drops to zero at index six, rises to one at index ten, and drops to zero at index sixteen. Golden peak line locks at one. Returns 1. | Lines 13–16, then 17–21, then 22–23, then Line 24 | Now we trace the bonus function, max depth. Because the expression contains two separate pairs that never nest inside one another, the depth rises to one during each set of brackets and drops back to zero immediately after. Our depth gauge records a peak nesting level of one without ever calling Python's built-in max function. | 324 chars | ~18s |

---

## 3. Continuous Read-Through

> Welcome to Balanced Brackets in 3D. We use a last-in, first-out stack to verify that every opening bracket has an exact matching partner in the correct order.
>
> We begin with our first expression: open paren, a plus b, close paren, times, open bracket, c minus d, close bracket. On the right, our 3D stack rack is completely empty.
>
> We scan the first character, an open parenthesis, and push it straight into the stack rack. Next, the characters a, plus, and b are standard math symbols, not brackets, so our algorithm ignores them.
>
> When we reach the closing parenthesis at index six, we check the top of our stack. It holds the matching open parenthesis, so we pop it out. The first sub-expression is perfectly balanced.
>
> Continuing down the string, the multiplication operator and spaces are ignored. At index ten, we meet an open square bracket and push it into the stack rack.
>
> Once again, the letters c and d along with the subtraction sign pass through untouched. At index sixteen, we encounter the closing square bracket. Checking our stack, the top item is the matching open square bracket.
>
> We pop it out, leaving the stack empty. With all seventeen characters scanned and zero leftover brackets on the stack, the function returns True.
>
> Now we trace the bonus function, max depth. Because the expression contains two separate pairs that never nest inside one another, the depth rises to one during each set of brackets and drops back to zero immediately after.
>
> Our depth gauge records a peak nesting level of one without ever calling Python's built-in max function.

---

## 4. Pronunciation and Text-to-Speech Notes

1. **Numbers as Words**:
   - Spoken numbers are written in full: `"six"`, `"ten"`, `"sixteen"`, `"seventeen"` rather than digits (`6, 10, 16, 17`).
2. **Bracket Terminology**:
   - Pronounce `(` as `"open parenthesis"` or `"open paren"`.
   - Pronounce `)` as `"closing parenthesis"`.
   - Pronounce `[` as `"open square bracket"`.
   - Pronounce `]` as `"closing square bracket"`.
   - Pronounce `{` as `"opening curly brace"`.
   - Pronounce `}` as `"closing curly brace"`.
3. **Variable Names**:
   - Pronounce `"stack"` naturally as the English noun.
   - Refer to `"text"` as `"string"` or `"expression"`.
   - Refer to mathematical symbols conversationally (`"plus"`, `"minus"`, `"times"`).
4. **Cadence and Pauses**:
   - Periods and commas provide clean phrasing breaks so the listener can watch the 3D block animations drop, lift, and match in sync.

---

## 5. ElevenLabs Production Summary

- **Total Voice Clips**: 3 clips
- **Total Character Count**: 1,526 characters
- **Estimated ElevenLabs Credit Usage**: ~1,526 credits
- **Voice**: `Lauren - Friendly, Comforting and Soft` (ID: `DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`
