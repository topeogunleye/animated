# Reusable Audio Walkthrough Playbook: Shop Inventory in 3D

A repeatable, end-to-end 3-step pipeline to create, synthesize, and integrate ElevenLabs voice walkthroughs for [`13-shop-inventory/Shop inventory in 3D, step by step.html`](../../13-shop-inventory/Shop%20inventory%20in%203D%2C%20step%20by%20step.html).

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
│ Step 3: Interactive Visual Sync       │ ──► Wires 1-Click Guided Audio Tour
└───────────────────────────────────────┘
```

---

## Step 1: Ground Truth & Educational Focus
- **Visual Structure**: Back shelf (locked original stock) vs Front shelf (new dictionary copy).
- **Core Concept**: Immutability. Rather than mutating dictionaries in place, pure functions create a copy, modify only the copy, and verify the original is untouched.
- **Reference Script**: [`audio-walkthroughs/shop-inventory/script.md`](./script.md).

---

## Step 2: Generation Execution

Run the synthesizer script to produce `.mp3` files:

```bash
# Preview characters and credits:
node .agents/skills/elevenlabs-audio-walkthrough/scripts/generate_audio.js audio-walkthroughs/shop-inventory/script.md --dry-run

# Synthesize all clips:
node .agents/skills/elevenlabs-audio-walkthrough/scripts/generate_audio.js audio-walkthroughs/shop-inventory/script.md
```

Voice Parameters:
- **Voice**: `Lauren` (`DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`
- **Stability**: `0.50`
- **Similarity**: `0.75`
- **Style**: `0.0`
- **Speaker Boost**: `true`

---

## Step 3: Integration Pattern

Wire the clips into `13-shop-inventory/Shop inventory in 3D, step by step.html`:
1. **Hero Button (`#bTour`)**: Triggers audio and visual playback simultaneously on click.
2. **Silent Mode (`#bMute`)**: Toggles voiceover without interrupting visual stepping.
3. **Status Pill (`#tourStatus`)**: Displays `Milestone X/5` and the milestone topic.
4. **Master Clock**: Active audio drives frame transitions on timestamp cues.
