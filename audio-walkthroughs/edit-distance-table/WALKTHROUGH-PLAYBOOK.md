# Walkthrough Playbook: Edit Distance Table in 3D

## Target Visualizer
- Path: `18-edit-distance-table/Edit distance table in 3D.html`
- Presets Supported:
  - Preset 0: `flaw to lawn (answer 2)` (21 frames)

## ElevenLabs Synthesis Configuration
- Voice: `Lauren` (`DODLEQrClDo8wCz460ld`)
- Model: `eleven_multilingual_v2`
- Voice Settings:
  - Stability: `0.50`
  - Clarity / Similarity Boost: `0.75`
  - Style: `0.0`
  - Speaker Boost: `true`

## Clips & Synchronization Mapping

### Preset 0 (flaw to lawn)
- **Milestone 1: Table Initialization & Base Cases**
  - File: `01-table-init-and-base-cases.mp3` (36.97s)
  - Start frame: 0, End frame: 3
  - Cues:
    - 0.0s: Frame 0 (Key idea: dp[i][j] prefix distance)
    - 7.5s: Frame 1 (Make empty table 5x5, empty string \u2205)
    - 18.0s: Frame 2 (Column 0: i deletions)
    - 27.0s: Frame 3 (Row 0: j insertions)
- **Milestone 2: Recurrences, Free Matches & Optimal Alignment**
  - File: `02-recurrences-matches-and-backtrack.mp3` (35.20s)
  - Start frame: 4, End frame: 20
  - Cues:
    - 0.0s: Frame 4 (f != l)
    - 8.5s: Frame 8 (Match: l == l, copy diagonal)
    - 14.0s: Frame 13 (Match: a == a, copy diagonal)
    - 18.0s: Frame 18 (Match: w == w, copy diagonal)
    - 21.0s: Frame 19 (w != n, 1 + min choices)
    - 27.5s: Frame 20 (Return dp[4][4] = 2, winning route highlighted)
