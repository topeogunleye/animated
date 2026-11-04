# Reusable Audio Walkthrough Playbook: Leftmost Binary Search

A repeatable, end-to-end 3-step pipeline to create, synthesize, and integrate ElevenLabs voice walkthroughs for any preset or custom example in [`01-leftmost-binary-search/leftmost_binary_search_animation.html`](../../01-leftmost-binary-search/leftmost_binary_search_animation.html).

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
Work in the repository currently open in the workspace. Create an ElevenLabs-ready voice walkthrough for the leftmost binary search animation.

Source of truth:
01-leftmost-binary-search/leftmost_binary_search_animation.html

Target Example:
- Preset name: "[PRESET_NAME]" (e.g., "Target missing (4)")
- Array: nums = [NUMS] (e.g., [1, 3, 5, 8])
- Target: target = [TARGET] (e.g., 4)

Inspect the actual simulation logic in simulate() and the displayed code in CODE before writing. Verify the midpoint probe sequence, comparison count, result, and relevant code lines from the source; do not rely on assumed binary-search behavior.

Write for curious beginners:
- Explain the worked example using concrete values.
- Connect highlighted code lines to the visual changes (bounding box, pointers, bar colors) without reading raw syntax.
- Split the narration into short, meaningful clips suitable for separate ElevenLabs generation (each probe cycle or milestone as its own clip).

Create:
audio-walkthroughs/leftmost-binary-search/[PRESET_SLUG]/script.md

Include:
1. A verified outline of the example, array layout, simulation trace table, and result.
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
audio-walkthroughs/leftmost-binary-search/[PRESET_SLUG]/script.md

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
   node --env-file=.env.local audio-walkthroughs/leftmost-binary-search/[PRESET_SLUG]/generate_audio.js
2. Save the finished MP3 files in:
   audio-walkthroughs/leftmost-binary-search/[PRESET_SLUG]/
3. Verify that every requested clip exists and report file sizes, durations, and status.
Do not edit the animation yet.
```

### Reusable Node.js Generator Script Template (`generate_audio.js`)

```javascript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Populate from script.md segment table:
const CLIPS = [
  { filename: "01-setup.mp3", text: "..." },
  { filename: "02-probe-one.mp3", text: "..." }
];

async function main() {
  const client = new ElevenLabsClient();
  const response = await client.voices.getAll();
  const voice = (response.voices || []).find(v => v.name && v.name.toLowerCase().includes("lauren"));
  if (!voice) throw new Error("Voice 'Lauren' not found.");

  for (let i = 0; i < CLIPS.length; i++) {
    const clip = CLIPS[i];
    const targetPath = path.join(__dirname, clip.filename);
    console.log(`[${i + 1}/${CLIPS.length}] Generating ${clip.filename}...`);

    const audioStream = await client.textToSpeech.convert(voice.voiceId, {
      text: clip.text,
      modelId: "eleven_multilingual_v2",
      voiceSettings: { stability: 0.50, similarityBoost: 0.75, style: 0.0, useSpeakerBoost: true }
    });

    await new Promise((res, rej) => {
      Readable.fromWeb(audioStream)
        .pipe(fs.createWriteStream(targetPath))
        .on("finish", res)
        .on("error", rej);
    });
    console.log(`Saved: ${clip.filename} (${fs.statSync(targetPath).size} bytes)`);
  }
}
main().catch(console.error);
```

---

## Step 3: Integrate Audio Clips into the Animation

### Reusable Prompt Template

```text
Inspect the leftmost binary search animation and the audio clips in:
audio-walkthroughs/leftmost-binary-search/[PRESET_SLUG]/

Integrate the clips into the animation so narration plays at the appropriate steps for the "[PRESET_NAME]" preset:
1. Follow the project's existing UI and JavaScript patterns (matching the Hanoi and Duplicate 3s pattern).
2. Wire audioClips with relative paths (e.g., ../audio-walkthroughs/leftmost-binary-search/[PRESET_SLUG]/...).
3. Configure the milestone mapping CLIP_MAPPING with startIdx, subIdx, and splitTime for seamless multi-frame playback.
4. Handle replay, stepping backward/forward, reset, preset switching, and pausing so audio never overlaps or continues from a stale step.
5. Keep audio playback optional via the Narration button (Narration: Off by default).
6. Provide accessible status updates in #narrationStatus and fallback to Web Speech API if clips fail to load or when running custom/other inputs.
7. Do not change the search algorithm or its visual layout.
8. Run an automated verification check (e.g. headless browser test), then report changed files and how to test in the browser.
```

---

## Available Leftmost Binary Search Presets for Future Walkthroughs

| Preset ID | Preset Name | Array (`nums`) | Target | Key Educational Focus |
|:---:|:---|:---|:---:|:---|
| 0 | **Duplicate 3s** *(Completed)* | `[1, 3, 3, 3, 5, 8]` | `3` | Leftward search continuation after finding matches at midpoints. |
| 1 | **Target missing (4)** *(Completed)* | `[1, 3, 5, 8]` | `4` | Demonstrates boundary crossover when target does not exist; returns `(-1, comps)`. |
| 2 | **Empty list** *(Completed)* | `[]` | `7` | Edge case: loop condition `0 <= -1` fails immediately; 0 comparisons. |
| 3 | **All equal (7 x 5)** *(Completed)* | `[7, 7, 7, 7, 7]` | `7` | Every probe is a match, forcing the algorithm to march left to index 0. |
| 4 | **Ten items, four 4s** *(Completed)* | `[1, 2, 2, 4, 4, 4, 4, 6, 9, 11]` | `4` | Larger array demonstrating logarithmic scaling with multiple duplicates. |
