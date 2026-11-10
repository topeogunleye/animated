# Reusable Audio Walkthrough Playbook: Tic-Tac-Toe Referee in 3D

A repeatable, end-to-end pipeline to create, synthesize, and integrate ElevenLabs voice walkthroughs for:
- [`14-tic-tac-toe-referee/Tic-Tac-Toe referee in 3D, step by step.html`](../../14-tic-tac-toe-referee/Tic-Tac-Toe%20referee%20in%203D%2C%20step%20by%20step.html)
- [`14-tic-tac-toe-referee/Tic-Tac-Toe referee in 3D, every line of code.html`](../../14-tic-tac-toe-referee/Tic-Tac-Toe%20referee%20in%203D%2C%20every%20line%20of%20code.html)

---

## Overview of the 3-Step Process

```
┌───────────────────────────────────────┐
│ Step 1: Script Inspection & Authoring │ ──► Outputs verified script.md
└──────────────────┬────────────────────┘
                   ▼
┌───────────────────────────────────────┐
│ Step 2: ElevenLabs Audio Generation   │ ──► Generates synced .mp3 files
└──────────────────┬────────────────────┘
                   ▼
┌───────────────────────────────────────┐
│ Step 3: Interactive Visual Sync       │ ──► Wires 1-Click Guided Audio Tour
└───────────────────────────────────────┘
```

---

## Step 1: Ground Truth & Educational Focus
- **Visual Structure**: 3D elevated board with glowing scanning slabs for rows, columns, and diagonals. Status banner tracking the 8 winning lines.
- **Core Concept**:
  - The 8 winning lines invariant (3 rows, 3 columns, 2 diagonals).
  - Loop efficiency: evaluating row $i$ and column $i$ concurrently in pass $i$.
  - Diagonals center check: diagonals can only win if the center square is non-empty.
- **Reference Script**: [`audio-walkthroughs/tic-tac-toe-referee/script.md`](./script.md).

---

## Step 2: Generation Execution

Run the synthesizer script to produce `.mp3` files:

```bash
# Preview characters and credits:
python3 audio-walkthroughs/tic-tac-toe-referee/generate_audio.py --dry-run

# Synthesize all clips:
python3 audio-walkthroughs/tic-tac-toe-referee/generate_audio.py
```

Voice Parameters:
- **Voice**: `Lauren` (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`
- **Stability**: `0.50`
- **Similarity**: `0.75`
- **Style**: `0.0`
- **Speaker Boost**: `true`

---

## Step 3: Integration Pattern

Wire the clips into both visualizer files:
1. **Hero Button (`#bTour`)**: Triggers audio and visual playback simultaneously on click.
2. **Silent Mode (`#bMute`)**: Toggles voiceover without interrupting visual stepping.
3. **Status Pill (`#tourStatus`)**: Displays `Milestone X/N` and the milestone topic.
4. **Master Clock**: Active audio drives frame transitions on timestamp cues.
5. **Top Navigation**: Consistent header links connecting `13-shop-inventory` to `14-tic-tac-toe-referee` to `insertion-sort`.
