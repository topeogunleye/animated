# Voiceover Script: Shortest Route with BFS in 3D

Voice: Lauren (`DODLEQrClDo8wCz460ld`)  
Model: `eleven_multilingual_v2`  
Visualizer: `17-shortest-route-BFS/Shortest route (BFS) in 3D.html`

---

## Preset 0: Example: A to F (Result: [A, B, D, F])

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Exact Duration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `bfs-01` | `01-bfs-queue-and-discovery.mp3` | Frame 0 (0.0s)<br>Frame 1 (7.0s)<br>Frame 2 (12.0s)<br>Frame 3 (19.5s)<br>Frame 4 (22.0s)<br>Frame 5 (24.0s)<br>Frame 6 (25.5s)<br>Frame 8 (27.5s)<br>Frame 9 (29.5s)<br>Frame 11 (32.0s)<br>Frame 12 (34.5s) | `def, if`<br>`parent, queue, head`<br>`while, node, head`<br>`for, nxt`<br>`parent[B] = A`<br>`parent[C] = A`<br>`while, node, head`<br>`parent[D] = B`<br>`while, node, head`<br>`if nxt not in parent`<br>`parent[E] = C` | Breadth-first search finds the shortest route in an unweighted graph by exploring level by level. We start at node A, recording its parent as None and placing it in our queue. Rather than calling a slow pop zero which shifts every element, we maintain a head pointer that steps forward in constant time. A expands to neighbours B and C at distance one. Next, B expands to D at distance two. When C inspects D, D is already visited, avoiding cycles and preserving the shortest route. | 36.92s |
| `bfs-02` | `02-reaching-goal-and-backtracking.mp3` | Frame 13 (0.0s)<br>Frame 14 (2.5s)<br>Frame 15 (5.0s)<br>Frame 16 (7.5s)<br>Frame 18 (10.5s)<br>Frame 19 (12.5s)<br>Frame 20 (14.5s)<br>Frame 21 (23.5s)<br>Frame 22 (26.0s)<br>Frame 23 (28.5s)<br>Frame 24 (30.5s)<br>Frame 25 (32.5s) | `while, node, head`<br>`for, nxt`<br>`parent[F] = D`<br>`while, node, head`<br>`if nxt not in parent`<br>`while, node, head`<br>`if node == goal`<br>`while node is not None`<br>`path.append`<br>`path.append`<br>`path.append`<br>`return path[::-1]` | Now node D expands and discovers our goal, F, at distance three, appending it to the queue. After inspecting E, the head pointer reaches F. Because breadth-first search visits every closer node first, the moment we pop the goal, we are guaranteed to have found the fewest possible arrows. We reconstruct the path by following parent pointers backward from F to D, D to B, and B to A. Reversing this list yields the optimal route: A, B, D, F. | 38.45s |

---

## Preset 1: Two routes: shorter wins (Result: [S, B, G])

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Exact Duration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `bfs-03` | `03-shorter-route-wins.mp3` | Frame 0 (0.0s)<br>Frame 1 (2.5s)<br>Frame 2 (4.5s)<br>Frame 4 (6.5s)<br>Frame 5 (8.0s)<br>Frame 6 (9.5s)<br>Frame 8 (12.5s)<br>Frame 9 (15.0s)<br>Frame 11 (18.0s)<br>Frame 12 (20.0s)<br>Frame 14 (22.0s)<br>Frame 15 (23.5s)<br>Frame 16 (25.5s)<br>Frame 17 (27.5s)<br>Frame 19 (29.0s)<br>Frame 20 (30.5s) | `def, if`<br>`parent, queue, head`<br>`while, node, head`<br>`parent[A] = S`<br>`parent[B] = S`<br>`while, node, head`<br>`parent[C] = A`<br>`while, node, head`<br>`parent[G] = B`<br>`while, node, head`<br>`if nxt not in parent`<br>`while, node, head`<br>`if node == goal`<br>`while node is not None`<br>`path.append`<br>`return path[::-1]` | In this two-route graph, node S branches into A and B. Path S, B, G requires only two arrows, while S, A, C, G takes three. Watch how breadth-first search processes both distance one nodes first. When B expands, it discovers goal G at distance two and places it in the queue before C can ever look at G. The search reaches G on the shorter route first, proving why level-by-level exploration always guarantees the shortest path. | 32.79s |
