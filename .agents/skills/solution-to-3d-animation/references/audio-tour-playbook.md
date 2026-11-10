# Audio Walkthrough Playbook: 1-Click Guided Audio Tour

A standardized architecture and prompt playbook for building, synchronizing, and refactoring educational algorithm visualizations with high-quality ElevenLabs voice narration.

---

## 1. The Core Architecture

### A. The User Problem
- Old pattern: separate "Play", "Narration: Off/On", and "Voice" selection controls.
- Friction: Users miss the narration toggle, audio doesn't start due to browser autoplay blocks, or fixed-interval animation timers desync from natural spoken voiceover.

### B. The 1-Click Guided Audio Tour Solution
- **Hero Tour Button (`#bTour`)**: A prominent button (`▶ Audio Tour` / `⏸ Pause Tour`) that initiates synchronized visual playback and audio playback simultaneously on a direct user gesture.
- **Audio as Master Clock**: Pre-recorded voice clips dictate the pace. Visual frames (`show(frameIdx, true)`) trigger on exact audio timestamp cues (`{ time, frameIdx }`).
- **Silent Mode Toggle (`#bMute`)**: A compact `🔊` / `🔇` button allowing users to switch between voiceover and silent timer-based stepping.
- **Live Tour Status (`#tourStatus`)**: Displays the active milestone (e.g. `Milestone 2/5`) and caption/status.
- **Resilience & Autoplay Compliance**:
  - `audio.play()` is invoked synchronously inside the user's click handler.
  - Tab visibility changes (`visibilitychange`) pause audio and animation automatically.
  - Graceful fallback: If audio files are missing, the UI displays *"Audio clip unavailable; running silent animation"* and advances smoothly via standard timers.

---

## 2. Universal Guided Audio Tour Refactor Prompt

Use this prompt to instruct an AI coding assistant to refactor any visualization in the repository:

```text
# TASK: Universal Guided Audio Tour Refactor for Animated Solutions

You are working in `/home/gamp/Downloads/Animated-Solutions`.

Systematically refactor the playback controls and audio state machines across the visualization files listed below to use the unified 1-Click "Guided Audio Tour" pattern:

TARGET FILES & AUDIO FOLDERS:
1. `01-leftmost-binary-search/leftmost_binary_search_animation.html` -> `../audio-walkthroughs/leftmost-binary-search/`
2. `02-run-length-round-trip/Run-Length Round Trip.html` -> `../audio-walkthroughs/run-length-round-trip/`
3. `03-Maximum-Sub-Array/Maximum Subarray Two Ways.html` -> `../audio-walkthroughs/maximum-subarray/`
4. `04-Integer-to-roman/Integer to Roman in 3D, step by step.html` -> `../audio-walkthroughs/integer-to-roman/`
5. `05-tower-of-hanoi/Tower of Hanoi in 3D, step by step.html` -> `../audio-walkthroughs/tower-of-hanoi/`
6. `06-bubble-sort/Bubble sort in 3D, step by step.html` -> `../audio-walkthroughs/bubble-sort/`
7. `07-pascals-triangle/Pascal's Triangle in 3D, step by step.html` -> `../audio-walkthroughs/pascals-triangle/`
8. `08-hangman/Hangman in 3D, step by step.html` -> `../audio-walkthroughs/hangman/`
9. `09-subsets-and-permutations/Subsets and permutations in 3D-bonus.html` -> `../audio-walkthroughs/subsets-and-permutations/`
10. `10-count-ways/performance-lab-3d.html` -> `../audio-walkthroughs/count-ways/`
11. `11-spiral-matrix/Spiral matrix in 3D, step by step.html` -> `../audio-walkthroughs/spiral-matrix/`
12. `insertion-sort/Insertion sort in 3D, step by step.html` -> `../audio-walkthroughs/insertion-sort/`

STANDARDIZED REQUIREMENTS FOR EACH FILE:
1. Replace separate "Play", "Narration: Off", and "Voice" buttons with:
   - Primary Hero Button: `<button id="bTour" class="btn-tour"><span class="tour-icon">▶</span> Audio Tour</button>`
   - Standard Stepping: `<button id="bBack">Back</button>`, `<button id="bNext">Next</button>`, `<button id="bReset">Reset</button>`
   - Silent Mode Toggle: `<button id="bMute" class="btn-mute" aria-pressed="false"><span class="mute-icon">🔊</span></button>`
   - Live Milestone Pill: `<div class="tour-status" id="tourStatus"><span class="tour-badge" id="tourBadge">Milestone 1/N</span><span class="tour-msg" id="tourMsg">...</span></div>`
2. Synchronous First-Click Playback: Calling `audio.play()` synchronously inside the `#bTour` click handler to guarantee compliance with browser autoplay policies.
3. Audio as Master Clock: Milestones and frame cues (`{ time, frameIdx }`) drive visual stepping; the animation advances exactly when spoken.
4. Transport Harmony: Next/Back/Reset pause audio immediately and clear pending timers. Mute toggles cleanly between audio tour and silent stepping.
5. No drift or unhandled rejections: Pause on tab switch (`visibilitychange`), clean up audio instances on preset change, and fallback gracefully if MP3s fail to load.
```

---

## 3. Data Model Reference (`WALKTHROUGHS`)

```javascript
const WALKTHROUGHS = {
  '<Preset Name>': {
    milestones: [
      {
        id: 'step-1',
        name: 'Milestone Title',
        audio: makeAudio('../audio-walkthroughs/<slug>/01-clip.mp3'),
        cues: [
          { time: 0.0, frameIdx: 0, text: 'Initial state description.' },
          { time: 5.4, frameIdx: 2, text: 'First transition event.' }
        ]
      }
    ]
  }
};
```
