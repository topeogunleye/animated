# Lagos Traffic Adventure (19-your-own-adventure) - Audio Walkthrough Script

**Voice**: Alice (`Xb7hH8MSUJpSbSDYk0k2`)  
**Preset**: Preset 0 (`Win: get change, take the bus`)  
**Total Clips**: 2  
**Total Duration**: ~72.44s  

---

## Clip 1: State Machine & Finding Change
- **File**: `01-state-machine-and-finding-change.mp3`
- **Duration**: 41.05s
- **Milestone**: Preset 0 (Milestone 1/2, frames 0–12)
- **Text**:
  > This text adventure models a state machine using a Python dictionary and a command loop. The rooms dictionary stores each location's narrative description, available directional exits, and lock conditions. Starting at Ojota bus stop with an empty inventory, our goal is to reach work on time. The yellow danfo bus heading north is locked because the conductor demands exact change. We first command the player east into Mama Put's kiosk. Spotting a two-hundred-naira note, we execute the take command, appending the change into our inventory list, before navigating west back to the bus stop.

### Cues & Synchronization
| Timestamp | Frame | Description |
|-----------|-------|-------------|
| 0.0s | 0 | Key idea: state machine with dictionary of rooms and command loop |
| 5.5s | 1 | Rooms dictionary definition and structure |
| 12.0s | 2 | `play()` starts at Ojota bus stop, inventory is empty `[]` |
| 17.5s | 3 | Input command: `east` |
| 21.0s | 4 | Direction check in command loop |
| 22.5s | 5 | `move()` resolves exit to kiosk without lock |
| 24.5s | 6 | Player enters Mama Put's kiosk |
| 26.5s | 7 | Input command: `take` |
| 28.5s | 8 | Room item `change` picked up and appended to `inventory` |
| 33.0s | 9 | Input command: `west` |
| 35.0s | 10 | Direction check in command loop |
| 36.5s | 11 | `move()` resolves exit to `bus_stop` |
| 38.0s | 12 | Player returns to Ojota bus stop with change |

---

## Clip 2: Boarding Danfo & Winning Commute
- **File**: `02-boarding-danfo-and-winning.mp3`
- **Duration**: 31.39s
- **Milestone**: Preset 0 (Milestone 2/2, frames 13–25)
- **Text**:
  > Now holding the required change, we command north to board the danfo. The move function inspects the room's locked mapping, confirms the change is in our inventory, and unlocks the door. Squeezing in, we advance northward along the corridor until gridlock stalls traffic on the Third Mainland Bridge. We step out on foot and walk north one last stretch. Arriving at the office at eight fifty-nine a.m., the boss nods in approval as the engine detects the winning ending key and breaks the loop, completing our morning commute.

### Cues & Synchronization
| Timestamp | Frame | Description |
|-----------|-------|-------------|
| 0.0s | 13 | Input command: `north` |
| 2.5s | 14 | Direction check in command loop |
| 4.0s | 15 | `move()` detects locked door, checks inventory, and unlocks door |
| 9.0s | 16 | Player enters `danfo` corridor |
| 11.5s | 17 | Input command: `north` |
| 13.0s | 18 | Direction check in command loop |
| 14.5s | 19 | `move()` resolves route to bridge |
| 16.0s | 20 | Player arrives at Third Mainland Bridge |
| 17.5s | 21 | Input command: `north` |
| 19.5s | 22 | Direction check in command loop |
| 21.0s | 23 | `move()` resolves route to office |
| 22.5s | 24 | Player reaches the office |
| 25.5s | 25 | Terminal win state reached: loop breaks with victory message |
