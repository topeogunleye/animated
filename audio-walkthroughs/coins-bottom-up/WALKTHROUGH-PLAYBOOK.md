# Reusable Audio Walkthrough Playbook: Coins, Bottom-Up, in 3D

A repeatable, end-to-end pipeline to synthesize, calibrate, and integrate ElevenLabs voice walkthroughs for [`15-coins-bottom-up/Coins, bottom-up, in 3D.html`](../../15-coins-bottom-up/Coins%2C%20bottom-up%2C%20in%203D.html).

---

## 1. Overview & Pedagogical Objective

Dynamic programming solves complex optimization and counting problems by combining solutions to overlapping sub-problems:
- **`count_ways_dp(amount, coins)`**:
  - State definition: `ways[a]` = number of combinations to make `amount`.
  - Invariant: Loop over coins in the outer loop, and update amounts in the inner loop (`ways[a] += ways[a - c]`). This preserves canonical coin order and prevents permutation duplicates.
- **`min_coins(amount, coins)`**:
  - State definition: `best[a]` = fewest coins to make `amount`.
  - Transition: `best[a] = min(best[a], best[a - c] + 1)`.

---

## 2. Audio Generation Commands

Run the synthesizer script to produce `.mp3` files:

```bash
# Dry run character & credit preview:
python3 audio-walkthroughs/coins-bottom-up/generate_audio.py --dry-run

# Synthesize all clips:
python3 audio-walkthroughs/coins-bottom-up/generate_audio.py
```

Voice Parameters:
- **Voice**: `Lauren` (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`
- **Stability**: `0.50`
- **Similarity**: `0.75`
- **Style**: `0.0`
- **Speaker Boost**: `true`

---

## 3. Integration Checklist

1. **1-Click Guided Audio Tour (`#bTour`)**: Hero button with play/pause/replay states.
2. **Silent Mode Toggle (`#bMute`)**: Clean mute toggle between audio tour and silent stepping.
3. **Live Status Pill (`#tourStatus`)**: Displays milestone progress and topic badge.
4. **Top Navigation Header**: Consistent sequence links from `14-tic-tac-toe-referee` to `15-coins-bottom-up` to `16-cache-that-forgets-wisely`.
5. **Collapsible Code Pane (`#bHideCode` / `#bShowCodeNav`)**: Full-width 3D view toggle with automatic camera refitting.
