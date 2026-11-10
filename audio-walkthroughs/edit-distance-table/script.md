# Voiceover Script: Edit Distance Table in 3D

Voice: Lauren (`DODLEQrClDo8wCz460ld`)  
Model: `eleven_multilingual_v2`  
Visualizer: `18-edit-distance-table/Edit distance table in 3D.html`

---

## Preset 0: flaw to lawn (answer 2)

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Exact Duration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `edit-01` | `01-table-init-and-base-cases.mp3` | Frame 0 (0.0s)<br>Frame 1 (7.5s)<br>Frame 2 (18.0s)<br>Frame 3 (27.0s) | `def, m, n`<br>`dp = [[0]...]`<br>`dp[i][0] = i`<br>`dp[0][j] = j` | We calculate the edit distance between strings flaw and lawn using dynamic programming. Our table, d p, has five rows and five columns, representing prefixes of both strings with the empty string denoted by null. The first column represents converting prefixes of flaw into nothing, requiring i deletions. The first row represents turning an empty string into prefixes of lawn, requiring j insertions. These base cases form the foundation of our table. | 36.97s |
| `edit-02` | `02-recurrences-matches-and-backtrack.mp3` | Frame 4 (0.0s)<br>Frame 8 (8.5s)<br>Frame 13 (14.0s)<br>Frame 18 (18.0s)<br>Frame 19 (21.0s)<br>Frame 20 (27.5s) | `for i, for j`<br>`if a[i-1] == b[j-1]`<br>`dp[i][j] = dp[i-1][j-1]`<br>`dp[i][j] = dp[i-1][j-1]`<br>`dp[i][j] = 1 + min(...)`<br>`return dp[m][n]` | For each interior cell, if the current letters match, no edit is required and we copy the diagonal value for free, as seen when l matches l, a matches a, and w matches w. When letters differ, we take one plus the minimum of deleting from above, inserting from the left, or replacing along the diagonal. Reaching the bottom-right cell yields an optimal edit distance of two. Backtracking winning arrows reveals replacing f with l, then inserting n. | 35.20s |
