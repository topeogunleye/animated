# Walkthrough Playbook: Shortest Route with BFS in 3D

## Target Visualizer
- Path: `17-shortest-route-BFS/Shortest route (BFS) in 3D.html`
- Presets Supported:
  - Preset 0: `Example: A to F` (26 frames)
  - Preset 1: `Two routes: shorter wins` (21 frames)

## ElevenLabs Synthesis Configuration
- Voice: `Lauren` (`DODLEQrClDo8wCz460ld`)
- Model: `eleven_multilingual_v2`
- Voice Settings:
  - Stability: `0.50`
  - Clarity / Similarity Boost: `0.75`
  - Style: `0.0`
  - Speaker Boost: `true`

## Clips & Synchronization Mapping

### Preset 0 (Example: A to F)
- **Milestone 1: BFS Level-by-Level Queue & Discovery**
  - File: `01-bfs-queue-and-discovery.mp3` (36.92s)
  - Start frame: 0, End frame: 12
  - Cues:
    - 0.0s: Frame 0 (Start overview)
    - 7.0s: Frame 1 (Start at A, queue=[A], head=0)
    - 12.0s: Frame 2 (Take A from queue, head=1)
    - 19.5s: Frame 3 (Neighbours of A: B, C)
    - 22.0s: Frame 4 (B added to queue)
    - 24.0s: Frame 5 (C added to queue)
    - 25.5s: Frame 6 (Take B from queue, head=2)
    - 27.5s: Frame 8 (D added to queue)
    - 29.5s: Frame 9 (Take C from queue, head=3)
    - 32.0s: Frame 11 (D already in parent, skip)
    - 34.5s: Frame 12 (E added to queue)
- **Milestone 2: Reaching Goal F & Reconstructing Shortest Path**
  - File: `02-reaching-goal-and-backtracking.mp3` (38.45s)
  - Start frame: 13, End frame: 25
  - Cues:
    - 0.0s: Frame 13 (Take D from queue, head=4)
    - 2.5s: Frame 14 (Look at neighbour F)
    - 5.0s: Frame 15 (F added to queue at dist 3)
    - 7.5s: Frame 16 (Take E from queue, head=5)
    - 10.5s: Frame 18 (Skip F)
    - 12.5s: Frame 19 (Take F from queue, head=6)
    - 14.5s: Frame 20 (F is goal! Rebuild route backwards)
    - 23.5s: Frame 21 (Add F, back to parent D)
    - 26.0s: Frame 22 (Add D, back to parent B)
    - 28.5s: Frame 23 (Add B, back to parent A)
    - 30.5s: Frame 24 (Add A, back at start)
    - 32.5s: Frame 25 (Reverse path: [A, B, D, F])

### Preset 1 (Two routes: shorter wins)
- **Milestone 1: Level-by-Level Exploration Proof**
  - File: `03-shorter-route-wins.mp3` (32.79s)
  - Start frame: 0, End frame: 20
  - Cues:
    - 0.0s: Frame 0 (Start overview)
    - 2.5s: Frame 1 (Start at S)
    - 4.5s: Frame 2 (Take S from queue, head=1)
    - 6.5s: Frame 4 (A added to queue)
    - 8.0s: Frame 5 (B added to queue)
    - 9.5s: Frame 6 (Take A from queue, head=2)
    - 12.5s: Frame 8 (C added to queue)
    - 15.0s: Frame 9 (Take B from queue, head=3)
    - 18.0s: Frame 11 (G added to queue at dist 2!)
    - 20.0s: Frame 12 (Take C from queue, head=4)
    - 22.0s: Frame 14 (Skip G)
    - 23.5s: Frame 15 (Take G from queue, head=5)
    - 25.5s: Frame 16 (G is goal!)
    - 27.5s: Frame 17 (Trace back G)
    - 29.0s: Frame 19 (Trace back S)
    - 30.5s: Frame 20 (Reverse path: [S, B, G])
