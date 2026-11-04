# Hangman in 3D: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Solution 08: Hangman in 3D** ([`08-hangman/Hangman in 3D, step by step.html`](../../08-hangman/Hangman%20in%203D,%20step%20by%20step.html)).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/hangman/`

---

## 2. Presets Overview

| Preset | Word & Guesses | Max Misses | Frames | Audio Clips | Status |
|---|---|:---:|:---:|:---:|:---:|
| **Preset 0: apple: won with one miss** | `apple`, `['a','z','p','l','e']` | 3 | 9 | 2 clips (`01`–`02`) | Completed |
| **Preset 1: python: lost after 3 misses** | `python`, `['a','b','c','d']` | 3 | 7 | 2 clips (`01`–`02`) | Completed |
| **Preset 2: python: repeat, still playing** | `python`, `['p','p','y']` | 5 | 8 | 2 clips (`01`–`02`) | Planned |
| **Preset 3: a: no guesses** | `a`, `[]` | 3 | 5 | 1 clip (`01`) | Planned |
| **Preset 4: banana: own word** | `banana`, `['n','n','x','a','b']` | 4 | 9 | 2 clips (`01`–`02`) | Planned |

---

## 3. Algorithm & Visualizer Mechanics

### Source Code
```python
def play_hangman(word, guesses, max_attempts):
    guessed = []
    wrong = []
    status = "playing"
    for letter in guesses:
        if letter in guessed:
            continue
        guessed.append(letter)
        if letter not in word:
            wrong.append(letter)
        revealed = 0
        for ch in word:
            if ch in guessed:
                revealed += 1
        if revealed == len(word):
            status = "won"
            break
        if len(wrong) >= max_attempts:
            status = "lost"
            break
    display = ""
    for ch in word:
        if ch in guessed:
            display += ch
        else:
            display += "_"
    return status, display, wrong
```

### Visual State & Mechanics
1. **3D Letter Tiles & Pedestals**: Elevated horizontal letter tiles displaying discovered letters or masked underscores.
2. **Gallows & Hangman Rig**: Visual scaffold and strike badges displaying accumulated incorrect guesses.
3. **Current Guess Badge**: Floating callout highlighting the currently evaluated letter, hit/miss outcome, and duplicate status.
4. **Outcome Banner**: Real-time status badge transitioning between "playing", "won", and "lost" with responsive color changes.

---

## 4. Preset 0: "apple: won with one miss"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-early-guesses` | `01-setup-and-early-guesses.mp3` | 0 – 4 | "Welcome to Hangman in 3D. In Hangman, we track guessed letters, wrong attempts, and our current revealed word. Repeated letters cost nothing, misses increment our wrong attempts counter, and the game halts the moment all letters are revealed or the attempt limit is breached. We initialize with the target word apple, allowing up to three wrong attempts. First, we guess a: it hits at index zero, revealing one of five letters. Next, we guess z: z is not in apple, so it records our first miss. Then, we guess p: because p appears twice, a single guess reveals both middle positions, bringing us to three of five letters shown." |
| `02-solving-and-victory` | `02-solving-and-victory.mp3` | 5 – 8 | "Continuing our sequence, we guess l, revealing the fourth letter. Finally, guessing e uncovers the last remaining position. With five of five letters displayed, the winning condition triggers immediately and breaks from the loop. The display string is assembled as apple, and the function returns status won, display apple, and the single wrong guess z." |

---

## 5. Preset 1: "python: lost after 3 misses"

### Segments Table
| Segment ID | Filename | Frames | Spoken Narration |
|---|---|:---:|---|
| `01-setup-and-consecutive-misses` | `01-setup-and-consecutive-misses.mp3` | 0 – 3 | "Here we examine a losing game with the secret word python and a strict limit of three wrong attempts. Guessed letters and wrong attempts start empty. Our first guess is a: it is not in python, marking our first strike. Next, we guess b: also absent, consuming two of our three allowed attempts." |
| `02-final-miss-and-loss` | `02-final-miss-and-loss.mp3` | 4 – 6 | "Our third guess is c. Because c is not in python, wrong reaches three, hitting our maximum attempt ceiling. The loss condition triggers immediately, halting further play before d is ever evaluated. The final masked display is constructed with six underscores, and the function returns status lost, display six blanks, and wrong guesses a, b, and c." |
