# Walkthrough Playbook: The Cache That Forgets Wisely (LRU vs FIFO in 3D)

## Target Visualizer
- Path: `16-cache-that-forgets-wisely/The cache that forgets wisely, in 3D.html`
- Presets Supported:
  - Preset 0: `LRU: 1,2,1,3,2,1 → 1 hit, 5 misses` (8 frames)
  - Preset 1: `FIFO: same calls → 2 hits, 4 misses` (8 frames)

## ElevenLabs Synthesis Configuration
- Voice: `Lauren` (`DODLEQrClDo8wCz460ld`)
- Model: `eleven_multilingual_v2`
- Voice Settings:
  - Stability: `0.50`
  - Clarity / Similarity Boost: `0.75`
  - Style: `0.0`
  - Speaker Boost: `true`

## Clips & Synchronization Mapping

### Preset 0 (LRU Cache)
- **Milestone 1: Setup, Cold Misses, and First Hit**
  - File: `01-lru-setup-and-first-hit.mp3` (38.55s)
  - Start frame: 0, End frame: 3
  - Cues:
    - 0.0s: Frame 0 (Init empty cache of capacity 2)
    - 11.5s: Frame 1 (Call f(1), cold miss, stored as newest)
    - 19.0s: Frame 2 (Call f(2), cold miss, filling capacity)
    - 25.5s: Frame 3 (Call f(1), hit! Key 1 popped and re-inserted at newest position)
- **Milestone 2: Eviction, Thrashing, and LRU Pathology**
  - File: `02-lru-eviction-and-thrashing.mp3` (42.35s)
  - Start frame: 4, End frame: 7
  - Cues:
    - 0.0s: Frame 4 (Call f(3), miss, cache full, evicts oldest key 2)
    - 9.5s: Frame 5 (Call f(2), miss, cache full, evicts oldest key 1)
    - 19.0s: Frame 6 (Call f(1), miss, cache full, evicts oldest key 3)
    - 26.5s: Frame 7 (Done, summary of 1 hit and 5 misses due to cyclical thrashing)

### Preset 1 (FIFO Cache)
- **Milestone 1: FIFO Eviction by Age & Lucky Survival**
  - File: `03-fifo-comparison.mp3` (42.86s)
  - Start frame: 0, End frame: 7
  - Cues:
    - 0.0s: Frame 0 (Init empty cache)
    - 6.0s: Frame 1 (Call f(1), stored)
    - 10.0s: Frame 2 (Call f(2), stored)
    - 14.0s: Frame 3 (Call f(1), hit! FIFO does NOT move 1, 1 stays oldest)
    - 24.5s: Frame 4 (Call f(3), miss, oldest key 1 evicted, key 2 retained)
    - 31.0s: Frame 5 (Call f(2), hit! Key 2 survived in cache)
    - 36.0s: Frame 6 (Call f(1), miss, oldest key 2 evicted)
    - 39.0s: Frame 7 (Done, summary of 2 hits and 4 misses)
