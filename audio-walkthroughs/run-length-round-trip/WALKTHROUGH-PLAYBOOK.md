# Reusable Audio Walkthrough Playbook: Run-Length Round Trip

A repeatable, end-to-end 3-step pipeline to create, synthesize, and integrate ElevenLabs voice walkthroughs for any preset or custom string in [`02-run-length-round-trip/Run-Length Round Trip.html`](../../02-run-length-round-trip/Run-Length%20Round%20Trip.html).

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

Copy and paste this prompt when authoring narration for a new example:

```text
Work in the repository currently open in the workspace. Create an ElevenLabs-ready voice walkthrough for the Run-Length Round Trip animation.

Source of truth:
02-run-length-round-trip/Run-Length Round Trip.html

Target Example:
- Preset name: "[PRESET_NAME]" (e.g., "Runs of 3, 2, 1")
- Input string: s = "[STRING]" (e.g., "aaabbc")

Inspect the actual simulation logic in simulate() and the displayed code in SRC before writing. Verify the character scanning loop, run length calculation, encoding output, digit parsing loop, decoding output, and round-trip equality check; do not rely on assumed behavior.

Write for curious beginners:
- Explain the worked example using concrete characters, indices, and counts.
- Connect highlighted code lines to the visual changes (top bar string, bottom bar result, bounding box/slab, i and j pointers) without reading raw syntax.
- Split the narration into short, meaningful clips suitable for separate ElevenLabs generation (intro/setup, each character run, decode phase, and round-trip verification).

Create:
audio-walkthroughs/run-length-round-trip/[PRESET_SLUG]/script.md

Include:
1. A verified outline of the example, input string, simulation trace table, and result.
2. A segment table with:
   - Clip IDs and suggested filenames (e.g., 01-setup-and-key-idea.mp3)
   - Animation cue / state
   - Active code lines
   - Spoken text (ElevenLabs-ready: natural language, written-out numbers, zero stage directions/markdown)
   - Approximate duration
3. A continuous read-through section.
4. Pronunciation notes and an accuracy checklist.

Do not edit the animation or generate audio yet. At the end, summarize what you verified and any uncertainties.
```

---

## Step 2: Generate Audio in ElevenLabs

### Pre-Requisites
1. Project is onboarded via:
   ```bash
   npx -y @elevenlabs/cli@latest onboard init
   ```
   *(API key is securely stored in `.env.local` and never printed/pasted into chat.)*
2. SDK is installed:
   ```bash
   npm install @elevenlabs/elevenlabs-js
   ```

### Reusable Prompt Template

```text
Generate the audio clips described in:
audio-walkthroughs/run-length-round-trip/[PRESET_SLUG]/script.md

Use the ElevenLabs integration configured in this environment (.env.local).
Use the Lauren voice ("Lauren - Friendly, Comforting and Soft", ID: DODLEQrClDo8wCz460ld) with consistent settings across every clip:
- Model: Eleven Multilingual v2
- Stability: 50%
- Clarity / Similarity: 75%
- Style: 0%
- Speaker Boost: ON

Before generating anything that spends credits, show me:
- The list of clips to be generated
- Character count per clip
- Estimated credit usage
Then wait for my approval. Do not ask me to paste API keys or secrets into chat.

Once approved:
1. Generate each segment separately using the official SDK loaded via:
   node --env-file=.env.local audio-walkthroughs/run-length-round-trip/[PRESET_SLUG]/generate_audio.js
2. Save the finished MP3 files in:
   audio-walkthroughs/run-length-round-trip/[PRESET_SLUG]/
3. Verify that every requested clip exists and report file sizes, durations, and status.
Do not edit the animation yet.
```

---

## Step 3: Integrate Audio Clips into the Animation

### Reusable Prompt Template

```text
Inspect the Run-Length Round Trip animation and the audio clips in:
audio-walkthroughs/run-length-round-trip/[PRESET_SLUG]/

Integrate the clips into the animation so narration plays at the appropriate steps for the "[PRESET_NAME]" preset:
1. Follow the project's existing UI and JavaScript patterns (matching the unified WALKTHROUGHS registry and milestone mapping pattern).
2. Wire audioClips with relative paths (e.g., ../audio-walkthroughs/run-length-round-trip/[PRESET_SLUG]/...).
3. Configure milestone mapping with startIdx, subIdx, and splitTime for seamless multi-frame playback.
4. Handle replay, stepping backward/forward, reset, preset switching, and pausing so audio never overlaps or continues from a stale step.
5. Keep audio playback optional via the Narration button (Narration: Off by default).
6. Provide accessible status updates in #narrationStatus and fallback to Web Speech API if clips fail to load or when running custom/other inputs.
7. Do not change the encoding/decoding algorithm or its 3D visual layout.
8. Run an automated verification check (e.g. headless browser test), then report changed files and how to test in the browser.
```

---

## Available Run-Length Round Trip Presets

| Preset ID | Preset Name | String (`s`) | Encoded Result | Key Educational Focus |
|:---:|:---|:---|:---:|:---|
| 0 | **Runs of 3, 2, 1** *(Completed)* | `'aaabbc'` | `'a3b2c1'` | Standard runs of varying lengths (3, 2, and 1); full round trip demonstration. |
| 1 | **Twelve a’s (two digits)** | `'aaaaaaaaaaaab'` | `'a12b1'` | Multi-digit run lengths; decodes `12` by parsing digits `1` and `2` sequentially. |
| 2 | **No repeated letters** | `'abcabc'` | `'a1b1c1a1b1c1'` | Worst-case run length encoding where every run length is 1, expanding total length. |
| 3 | **Exactly ten k’s** | `'kkkkkkkkkk'` | `'k10'` | Single long run of 10 identical letters showing round trip boundary condition. |
| 4 | **Empty string** | `''` | `''` | Base case / edge case: zero iterations, loops terminate immediately, round trip holds. |
