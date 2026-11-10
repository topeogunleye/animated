# Voiceover Script: The Cache That Forgets Wisely (LRU vs FIFO)

Voice: Lauren (`DODLEQrClDo8wCz460ld`)  
Model: `eleven_multilingual_v2`  
Visualizer: `16-cache-that-forgets-wisely/The cache that forgets wisely, in 3D.html`

---

## Preset 0: LRU Cache (1, 2, 1, 3, 2, 1 → 1 hit, 5 misses)

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Exact Duration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `lru-01` | `01-lru-setup-and-first-hit.mp3` | Frame 0 (0.0s)<br>Frame 1 (11.5s)<br>Frame 2 (19.0s)<br>Frame 3 (25.5s) | `init`<br>`miss, store`<br>`miss, store`<br>`hit, mv1, mv2` | We initialize a least recently used cache of capacity two. Keys are arranged with the oldest on the left and the newest on the right. When function of one is called, it is a cold miss: the value is computed and stored. Next, function of two is called, filling our second slot. When function of one is called again, we find it in the cache: a hit! In least recently used caching, accessing a key renews it, moving key one to the newest position on the right, while key two becomes the oldest. | 38.55s |
| `lru-02` | `02-lru-eviction-and-thrashing.mp3` | Frame 4 (0.0s)<br>Frame 5 (9.5s)<br>Frame 6 (19.0s)<br>Frame 7 (26.5s) | `miss, full, evict`<br>`miss, full, evict`<br>`miss, full, evict`<br>`ret2` | Now function of three arrives. Because the cache is full, our oldest key, two, is evicted to make room for three. Immediately after, the program requests function of two! Since two was just discarded, this results in a miss, forcing key one out. Function of one is requested next, triggering another miss and evicting three. This classic thrashing pattern shows that while least recently used caching typically excels with temporal locality, cyclic access patterns can repeatedly evict the exact key needed next, resulting in just one hit and five misses. | 42.35s |

---

## Preset 1: FIFO Cache (Same Calls → 2 hits, 4 misses)

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Exact Duration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `fifo-01` | `03-fifo-comparison.mp3` | Frame 0 (0.0s)<br>Frame 1 (6.0s)<br>Frame 2 (10.0s)<br>Frame 3 (14.0s)<br>Frame 4 (24.5s)<br>Frame 5 (31.0s)<br>Frame 6 (36.0s)<br>Frame 7 (39.0s) | `init`<br>`miss, store`<br>`miss, store`<br>`hit, ret1`<br>`miss, evict`<br>`hit, ret1`<br>`miss, evict`<br>`ret2` | Now let us examine the first-in, first-out policy on the exact same sequence. Function of one and two fill the two slots. When function of one is requested, it registers as a hit, but first-in, first-out ignores key usage and never updates age: key one remains the oldest! Therefore, when function of three arrives, key one is evicted, leaving key two safely in the cache. When function of two is called next, it scores an unexpected second hit! While first-in, first-out won here by pure luck, it demonstrates how eviction policies behave under identical workloads. | 42.86s |
