# Lagos Traffic Adventure (19-your-own-adventure) - Guided Tour Playbook

This document specifies the audio tour synchronization and milestone breakdown for `Lagos Traffic Adventure.html`.

## Voice & Audio Asset Information
- **Voice**: Alice (`Xb7hH8MSUJpSbSDYk0k2`)
- **Format**: MP3, 44.1kHz, 128kbps CBR
- **Directory**: `audio-walkthroughs/your-own-adventure/`
- **Total Duration**: ~72.44s across 2 milestones

## Milestones & Timestamps

### Milestone 1: State Machine & Finding Change
- **Audio File**: `01-state-machine-and-finding-change.mp3`
- **Duration**: 41.05s
- **Frame Range**: 0 to 12
- **Cues**:
  - `0.0s`: Frame 0 (State machine overview)
  - `5.5s`: Frame 1 (Rooms dictionary)
  - `12.0s`: Frame 2 (Init `bus_stop`, `inv=[]`)
  - `17.5s`: Frame 3 (Input `east`)
  - `21.0s`: Frame 4 (Move check)
  - `22.5s`: Frame 5 (Move to kiosk)
  - `24.5s`: Frame 6 (Inside kiosk)
  - `26.5s`: Frame 7 (Input `take`)
  - `28.5s`: Frame 8 (Pick up `change`)
  - `33.0s`: Frame 9 (Input `west`)
  - `35.0s`: Frame 10 (Move check)
  - `36.5s`: Frame 11 (Move to bus stop)
  - `38.0s`: Frame 12 (Back at bus stop)

### Milestone 2: Boarding Danfo & Winning Commute
- **Audio File**: `02-boarding-danfo-and-winning.mp3`
- **Duration**: 31.39s
- **Frame Range**: 13 to 25
- **Cues**:
  - `0.0s`: Frame 13 (Input `north`)
  - `2.5s`: Frame 14 (Move check)
  - `4.0s`: Frame 15 (Unlock danfo door with change)
  - `9.0s`: Frame 16 (Board danfo)
  - `11.5s`: Frame 17 (Input `north`)
  - `13.0s`: Frame 18 (Move check)
  - `14.5s`: Frame 19 (Advance to bridge)
  - `16.0s`: Frame 20 (Third Mainland Bridge gridlock)
  - `17.5s`: Frame 21 (Input `north`)
  - `19.5s`: Frame 22 (Move check)
  - `21.0s`: Frame 23 (Advance to office)
  - `22.5s`: Frame 24 (Reach office)
  - `25.5s`: Frame 25 (Game over: YOU WIN!)

## Integration Rules
1. Autoplay compliance: `.play()` is invoked on the first clip directly inside the `#bTour` click user gesture.
2. Code panel hotkey 'C' collapses or restores the code panel.
3. Top navigation links: Prev (`18-edit-distance-table`), Next (`insertion-sort`), Indicator `22 / 23`.
4. Mute toggle persists across audio tour playback without desynchronizing visual animation cues.
