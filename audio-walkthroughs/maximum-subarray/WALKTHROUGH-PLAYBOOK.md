# Reusable Audio Walkthrough Playbook: Maximum Subarray Two Ways

A repeatable, end-to-end 3-step pipeline to create, synthesize, and integrate ElevenLabs voice walkthroughs for any preset or custom integer list in [`03-Maximum-Sub-Array/Maximum Subarray Two Ways.html`](../../03-Maximum-Sub-Array/Maximum%20Subarray%20Two%20Ways.html).

---

## Overview of the 3-Step Process

```
┌───────────────────────────────────────┐
│ Step 1: Script Inspection & Authoring │ ──► Outputs verified script.md
└──────────────────┬────────────────────┘
                   ▼
┌───────────────────────────────────────┐
│ Step 2: ElevenLabs Audio Generation   │ ──► Generates synced .mp3 files
└──────────────────┬────────────────────┘
                   ▼
┌───────────────────────────────────────┐
│ Step 3: Interactive Visual Sync       │ ──► Wires audio into animation HTML
└───────────────────────────────────────┘
```

---

## Step 1: Inspect the Animation & Create the Script

### Reusable Prompt Template

```text
Work in the repository currently open in the workspace. Create an ElevenLabs-ready voice walkthrough for the Maximum Subarray Two Ways animation.

Source of truth:
03-Maximum-Sub-Array/Maximum Subarray Two Ways.html

Target Example:
- Preset name: "[PRESET_NAME]" (e.g., "Mixed list (the classic)")
- Input list: nums = [NUMS] (e.g., [-2, 1, -3, 4, -1, 2, 1, -5, 4])

Inspect the actual simulation logic in simulate() and the displayed code in SRC before writing. Verify the brute force slice exploration (i, j loops, running total, best update), the single-pass Kadane algorithm (current accumulator, negative reset condition, best update), and the return comparison; do not rely on assumed behavior.

Write for curious beginners:
- Explain the worked example using concrete values, indices, and running sums.
- Connect highlighted code lines to the visual changes (3D pillar bars, positive vs negative heights/colors, slice slab, best slice slab, i and j pointers) without reading raw syntax.
- Split the narration into short, meaningful clips suitable for separate ElevenLabs generation (intro/setup, brute force summary, Kadane reset and accumulation, comparison and complexity).

Create:
audio-walkthroughs/maximum-subarray/[PRESET_SLUG]/script.md

Include:
1. A verified outline of the example, input list, simulation trace table, and return values.
2. A segment table with:
   - Clip IDs and suggested filenames (e.g., 01-setup-and-key-idea.mp3)
   - Animation cue / state
   - Active code lines
   - Spoken text (ElevenLabs-ready: natural language, written-out numbers, zero stage directions/markdown)
   - Approximate duration
3. A continuous read-through section.
4. Pronunciation notes and an accuracy checklist.
```

---

## Step 2: Generate Audio with ElevenLabs

### Prerequisites

1. Project is onboarded via ElevenLabs CLI / SDK:
   ```bash
   npm install @elevenlabs/elevenlabs-js
   ```
2. Voice configured: **Lauren** (`Lauren - Friendly, Comforting and Soft`, Voice ID: `DODLEQrClDo8wCz460ld`).
3. Audio generation script:
   ```bash
   node --env-file=.env.local audio-walkthroughs/maximum-subarray/[PRESET_SLUG]/generate_audio.js
   ```

---

## Step 3: Integrate Audio Clips into the Animation

### Integration Rules

1. Follow the project's existing UI and JavaScript patterns (matching the unified `WALKTHROUGHS` registry and milestone mapping pattern).
2. Wire `audioClips` with relative paths (e.g., `../audio-walkthroughs/maximum-subarray/[PRESET_SLUG]/...`).
3. Configure milestone mapping with `startIdx`, `endIdx`, and `cues: [{ time, idx }]` for seamless multi-frame playback.
4. Handle replay, stepping backward/forward, reset, preset switching, and pausing so audio never overlaps or continues from a stale step.
5. Keep audio playback optional via the Narration button (Narration: Off by default).
6. Provide accessible status updates in `#narrationStatus` and fallback to Web Speech API if clips fail to load or when running custom/other inputs.
7. Do not change the underlying algorithm or its 3D visual layout.
8. Run automated headless Chrome verification tests.

---

## Available Maximum Subarray Presets

| Preset ID | Preset Name | Input (`nums`) | Best Result `(sum, start, end)` | Key Educational Focus |
|:---:|:---|:---|:---:|:---|
| 0 | **Mixed list (the classic)** *(Completed)* | `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` | `(6, 3, 6)` | Classic Kadane problem: restarts twice after negative drops, reaches max sum 6. |
| 1 | **Single element** *(Completed)* | `[5]` | `(5, 0, 0)` | Base case: single element must be chosen, zero iterations of inner loop. |
| 2 | **All negative** *(Completed)* | `[-3, -1, -2]` | `(-1, 1, 1)` | All negative values: best choice is least negative single element (`-1`). |
| 3 | **Empty list** *(Completed)* | `[]` | `(0, -1, -1)` | Edge case: guard condition returns `(0, -1, -1)` without loop execution. |
| 4 | **Tie: 1, -1, 1** *(Completed)* | `[1, -1, 1]` | `(1, 0, 0)` | Symmetrical tie: multiple slices achieve optimal sum 1, ties handled cleanly. |
