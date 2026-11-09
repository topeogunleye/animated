# Balanced Brackets in 3D: Voice Walkthrough Master Script

This document provides verified, ElevenLabs-ready narration scripts for the **Balanced Brackets** visualization (`12-balanced-brackets/Balanced brackets in 3D, step by step.html`).

---

## Production Specifications

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Settings**:
  - Stability: 50%
  - Similarity Boost: 75%
  - Style: 0%
  - Speaker Boost: ON
- **Format**: MP3 44.1kHz, 128kbps

---

## Preset 0: Mixed Valid — `(a + b) * [c - d]`

### Verified Trace Summary
- Input: `"(a + b) * [c - d]"` (17 characters)
- Opener at index 0: `'('` pushed to stack (depth 1)
- Indices 1, 2, 3: `'a'`, `'+'`, `'b'` ignored (non-brackets)
- Closer at index 4: `')'` matches `'('` popped from stack (depth drops to 0)
- Indices 5, 6, 7: `' '`, `'*'`, `' '` ignored
- Opener at index 8: `'['` pushed to stack (depth 1)
- Indices 9, 10, 11: `'c'`, `'-'`, `'d'` ignored
- Closer at index 12: `']'` matches `'['` popped from stack (depth drops to 0)
- End of loop: `len(stack) == 0` returns `True`
- Bonus `max_depth`: Peak nesting depth is 1

### Segments Table

| Clip ID | Filename | Cues / Frame Range | Spoken Text | Approx Duration |
|---|---|---|---|:---:|
| `01-setup-and-first-pair` | `01-setup-and-first-pair.mp3` | Frames 0 – 7 | Welcome to Balanced Brackets in 3D. We use a last-in, first-out stack to verify that every opening bracket has an exact matching partner in the correct order. We begin with our first expression: open paren, a plus b, close paren, times, open bracket, c minus d, close bracket. On the right, our 3D stack rack is completely empty. We scan the first character, an open parenthesis, and push it straight into the stack rack. Next, the characters a, plus, and b are standard math symbols, not brackets, so our algorithm ignores them. When we reach the closing parenthesis at index four, we check the top of our stack. It holds the matching open parenthesis, so we pop it out. The first sub-expression is perfectly balanced. | 32s |
| `02-second-pair-and-completion` | `02-second-pair-and-completion.mp3` | Frames 8 – 15 | Continuing down the string, the multiplication operator and spaces are ignored. At index eight, we meet an open square bracket and push it into the stack rack. Once again, the letters c and d along with the subtraction sign pass through untouched. At index twelve, we encounter the closing square bracket. Checking our stack, the top item is the matching open square bracket. We pop it out, leaving the stack empty. With all seventeen characters scanned and zero leftover brackets on the stack, the function returns True. | 28s |
| `03-bonus-max-depth` | `03-bonus-max-depth.mp3` | Frames 16 – 24 | Now we trace the bonus function, max depth. Because the expression contains two separate pairs that never nest inside one another, the depth rises to one during each set of brackets and drops back to zero immediately after. Our depth gauge records a peak nesting level of one without ever calling Python's built-in max function. | 18s |

---

## Preset 1: All Three Nested — `{[()]}`

### Verified Trace Summary
- Input: `"{[()]}"` (6 characters)
- Opener at index 0: `'{'` pushed (depth 1)
- Opener at index 1: `'['` pushed (depth 2)
- Opener at index 2: `'('` pushed (depth 3)
- Closer at index 3: `')'` matches `'('` popped (depth 2)
- Closer at index 4: `']'` matches `'['` popped (depth 1)
- Closer at index 5: `'}'` matches `'{'` popped (depth 0)
- Result: `True`, peak depth 3

### Segments Table

| Clip ID | Filename | Cues / Frame Range | Spoken Text | Approx Duration |
|---|---|---|---|:---:|
| `01-nested-push-and-pop` | `01-nested-push-and-pop.mp3` | Frames 0 – 15 | In this example, we test all three bracket types nested deeply inside one another. Watch the stack rack grow on the right. First, the curly brace drops in at level one. Next, the square bracket stacks on top at level two. Finally, the inner parenthesis stacks at level three. Now, the closing brackets arrive in mirror order. The closing parenthesis pops the top parenthesis. The closing bracket pops the square bracket. And the final closing brace pops the curly brace. Every pair matches in textbook last-in, first-out order, and our depth gauge reaches a peak level of three. | 31s |

---

## Preset 2: Order Mismatch — `([)]`

### Verified Trace Summary
- Input: `"([)]"` (4 characters)
- Opener at index 0: `'('` pushed (depth 1)
- Opener at index 1: `'['` pushed (depth 2)
- Closer at index 2: `')'` arrives, but `stack[-1]` is `'['`!
- Mismatch detected: Return `False`

### Segments Table

| Clip ID | Filename | Cues / Frame Range | Spoken Text | Approx Duration |
|---|---|---|---|:---:|
| `01-mismatch-detection` | `01-mismatch-detection.mp3` | Frames 0 – 3 | Here is a classic trap: both brackets have pairs, but their nesting order is interleaved. We push the open parenthesis, then push the open square bracket on top of it. But at index two, a closing parenthesis arrives. We inspect the top of the stack and find an open square bracket instead of a parenthesis. Because the most recently opened bracket must be the first one closed, this mismatch immediately returns False. | 22s |

---

## Preset 3: Empty Stack Closer — `}{`

### Verified Trace Summary
- Input: `"}{"` (2 characters)
- Closer at index 0: `'}'` arrives with empty stack
- Underflow detected: Return `False`

### Segments Table

| Clip ID | Filename | Cues / Frame Range | Spoken Text | Approx Duration |
|---|---|---|---|:---:|
| `01-empty-stack-closer` | `01-empty-stack-closer.mp3` | Frames 0 – 1 | What happens when a closing bracket appears at the very beginning? At index zero, we see a closing curly brace. But our stack rack has zero items. You cannot close a bracket that was never opened. The stack underflow check fails immediately, returning False without scanning another step. | 16s |

---

## Preset 4: Leftover Openers — `((`

### Verified Trace Summary
- Input: `"(("` (2 characters)
- Opener at index 0: `'('` pushed (depth 1)
- Opener at index 1: `'('` pushed (depth 2)
- String ends, but `len(stack) == 2 != 0`
- Return `False`

### Segments Table

| Clip ID | Filename | Cues / Frame Range | Spoken Text | Approx Duration |
|---|---|---|---|:---:|
| `01-leftover-openers` | `01-leftover-openers.mp3` | Frames 0 – 3 | In this case, two opening parentheses are pushed onto the stack, raising the stack height to two. The string ends, but two unclosed openers remain waiting in the rack. Because the stack is not empty, our final length check evaluates to False. | 16s |
