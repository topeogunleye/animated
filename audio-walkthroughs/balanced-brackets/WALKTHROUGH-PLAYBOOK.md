# Balanced Brackets: Voice Walkthrough Master Playbook

This master playbook defines the spoken educational narration, timeline cues, and Three.js animation milestone mappings for **Balanced Brackets in 3D** (`12-balanced-brackets/Balanced brackets in 3D, step by step.html`).

---

## 1. Production Parameters

- **Voice**: Lauren (`Lauren - Friendly, Comforting and Soft`)
- **Voice ID**: `DODLEQrClDo8wCz460ld`
- **Model**: `eleven_multilingual_v2`
- **Output Format**: MP3 44.1kHz 128kbps
- **Directory**: `audio-walkthroughs/balanced-brackets/`

---

## 2. Presets & Milestones Overview

| Preset | Input | Frames | Audio Clips / Milestones | Mode | Status |
|---|---|:---:|:---:|:---:|:---:|
| **Preset 0: Mixed Valid** | `"(a + b) * [c - d]"` | 25 frames | 3 clips (`01`–`03`) | Studio Voice + Web Speech Fallback | Active |
| **Preset 1: All Three Nested** | `"{[()]}"` | 16 frames | 1 clip (`01`) | Studio Voice + Web Speech Fallback | Active |
| **Preset 2: Order Mismatch** | `"([)]"` | 4 frames | 1 clip (`01`) | Studio Voice + Web Speech Fallback | Active |
| **Preset 3: Empty Stack Closer** | `"}{"` | 2 frames | 1 clip (`01`) | Studio Voice + Web Speech Fallback | Active |
| **Preset 4: Leftover Openers** | `"(("` | 4 frames | 1 clip (`01`) | Studio Voice + Web Speech Fallback | Active |
| **Preset 5: Bonus Depth** | `"((a)(b))"` | 18 frames | Dynamic TTS | Web Speech Fallback | Active |
| **Preset 6: Empty String** | `""` | 4 frames | Dynamic TTS | Web Speech Fallback | Active |

---

## 3. Timeline Cues & Frame Synchronization

### Preset 0: Mixed Valid — `(a + b) * [c - d]`
- **Milestone 1 (`01-setup-and-first-pair.mp3`)**:
  - Frames: 0 to 7
  - Cues:
    - `0.0s`: Frame 0 (`lines: [0, 1, 2, 3]`, Stack initialized)
    - `12.0s`: Frame 1 (`lines: [4, 5, 6]`, Push `'('` at index 0)
    - `17.5s`: Frame 2 (`lines: [4, 5, 7]`, Ignore `'a'` at index 1)
    - `19.0s`: Frame 3 (`lines: [4, 5, 7]`, Ignore `' '` at index 2)
    - `20.5s`: Frame 4 (`lines: [4, 5, 7]`, Ignore `'+'` at index 3)
    - `22.0s`: Frame 5 (`lines: [4, 5, 7]`, Ignore `' '` at index 4)
    - `23.5s`: Frame 6 (`lines: [4, 5, 7]`, Ignore `'b'` at index 5)
    - `25.5s`: Frame 7 (`lines: [7, 8, 10]`, Match `')'` at index 6 with `'('`, pop)
- **Milestone 2 (`02-second-pair-and-completion.mp3`)**:
  - Frames: 8 to 18
  - Cues:
    - `0.0s`: Frame 8 (`lines: [4, 5, 7]`, Ignore `' '` at index 7)
    - `2.0s`: Frame 9 (`lines: [4, 5, 7]`, Ignore `'*'` at index 8)
    - `4.0s`: Frame 10 (`lines: [4, 5, 7]`, Ignore `' '` at index 9)
    - `6.5s`: Frame 11 (`lines: [4, 5, 6]`, Push `'['` at index 10)
    - `11.5s`: Frame 12 (`lines: [4, 5, 7]`, Ignore `'c'` at index 11)
    - `13.0s`: Frame 13 (`lines: [4, 5, 7]`, Ignore `' '` at index 12)
    - `14.5s`: Frame 14 (`lines: [4, 5, 7]`, Ignore `'-'` at index 13)
    - `16.0s`: Frame 15 (`lines: [4, 5, 7]`, Ignore `' '` at index 14)
    - `17.5s`: Frame 16 (`lines: [4, 5, 7]`, Ignore `'d'` at index 15)
    - `20.0s`: Frame 17 (`lines: [7, 8, 10]`, Match `']'` at index 16 with `'['`, pop)
    - `24.5s`: Frame 18 (`lines: [11]`, Empty stack check -> return True)
- **Milestone 3 (`03-bonus-max-depth.mp3`)**:
  - Frames: 19 to 24
  - Cues:
    - `0.0s`: Frame 19 (`lines: [12, 13, 14, 15]`, Start max_depth)
    - `5.5s`: Frame 20 (`lines: [16, 17, 18, 19, 20]`, First `'('` -> depth 1)
    - `9.0s`: Frame 21 (`lines: [16, 21, 22]`, First `')'` -> depth 0)
    - `12.5s`: Frame 22 (`lines: [16, 17, 18, 19]`, Second `'['` -> depth 1)
    - `15.0s`: Frame 23 (`lines: [16, 21, 22]`, Second `']'` -> depth 0)
    - `17.5s`: Frame 24 (`lines: [23]`, Return peak depth 1)

---

## 4. Automation & Synthesis Script

Use `generate_audio.py` to synthesize all audio clips using ElevenLabs API:
```bash
python generate_audio.py
```
*(Requires `ELEVENLABS_API_KEY` in environment).*
