---
name: elevenlabs-audio-walkthrough
description: Author, synthesize with ElevenLabs, and synchronize high-quality educational audio walkthroughs into 3D algorithm visualizers. Supports cross-platform execution (Windows PowerShell/CMD, macOS, Linux) with automated environment resolution (.env.local), zero-dependency synthesis scripts, script authoring, and 1-Click Guided Audio Tour integration. Use when authoring voiceover scripts, generating ElevenLabs audio files, setting up audio on Windows or new machines, or wiring audio tours into visualizations.
---

# ElevenLabs Audio Walkthrough Skill

A standardized, cross-platform pipeline to author narration, synthesize studio-quality ElevenLabs voice clips, and synchronize them into 3D educational algorithm visualizations.

---

## 1. Quick Start on Windows PC

When running in a new terminal or session on Windows where the `ELEVENLABS_API_KEY` is not yet configured:

### 1-Line Setup (No Admin Rights Needed)
Run from PowerShell in your repository root:
```powershell
Set-Content -Path .env.local -Value "ELEVENLABS_API_KEY=your_elevenlabs_api_key_here"
```

Or in Command Prompt (CMD):
```cmd
echo ELEVENLABS_API_KEY=your_elevenlabs_api_key_here > .env.local
```

Both Node (`node --env-file=.env.local`) and the included `scripts/generate_audio.js` / `scripts/generate_audio.py` automatically detect and parse this file.

---

## 2. The 3-Step Walkthrough Lifecycle

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

### Step 1: Script Inspection & Authoring
1. Inspect the visualizer's actual `simulate()` function and `SRC` code lines. Never guess algorithm steps.
2. Formulate 4 to 6 concise spoken segments matching educational milestones:
   - Setup & Key Idea
   - Probes / Comparisons / Iterations
   - State updates (pointer moves, highlights)
   - Termination and final return value
3. Format as a Markdown segment table in `audio-walkthroughs/<slug>/<preset>/script.md`:
   | Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
4. **TTS Formatting Rules**:
   - Write out numbers in words ("three", not "3").
   - Write out operators in words ("equals", not "=="; "less than", not "<").
   - No markdown formatting, bracketed notes, or stage directions in the spoken text.

### Step 2: ElevenLabs Audio Generation
Standard Voice & Generation Parameters:
- **Voice**: `"Lauren"` (`"Lauren - Friendly, Comforting and Soft"`, ID: `DODLEQrClDo8wCz460ld`)
  *(Fallback: `"Alice"`)*
- **Model**: `eleven_multilingual_v2`
- **Stability**: `0.50`
- **Clarity / Similarity Boost**: `0.75`
- **Style Exaggeration**: `0.0`
- **Speaker Boost**: `true`

**Synthesis Execution**:
```bash
# Using Node.js (zero dependencies, works out of the box in Node 18+)
node scripts/generate_audio.js audio-walkthroughs/<slug>/<preset>/script.md

# Or dry-run to check character count before spending credits:
node scripts/generate_audio.js audio-walkthroughs/<slug>/<preset>/script.md --dry-run
```

### Step 3: Interactive Visual Sync (1-Click Guided Audio Tour)
Wire the generated clips into the visualizer using the standardized pattern:
- **Hero Tour Button (`#bTour`)**: Starts synchronized visual stepping and audio playback simultaneously on a direct user gesture (`audio.play()` inside the click handler to satisfy browser autoplay).
- **Audio as Master Clock**: Visual frames advance on exact timestamp cues (`{ time, frameIdx }`).
- **Silent Mode Toggle (`#bMute`)**: `🔊` / `🔇` toggles between audio tour and silent timer-based stepping.
- **Milestone Status Pill (`#tourStatus`)**: Displays `Milestone X/N` and active educational title.
- **Transport Harmony**: Back, Next, and Reset pause audio immediately.

---

## 3. Included Utilities

- `scripts/generate_audio.js`: Cross-platform Node.js generator using native `fetch` (zero npm packages required). Auto-detects `.env.local`, parses markdown tables directly, and supports `--dry-run`.
- `scripts/generate_audio.py`: Standalone Python 3 script using standard library `urllib` (zero pip packages required).
- `references/windows-setup.md`: Complete Windows setup options (PowerShell, CMD, Git Bash, persistent user env).
- `references/prompts.md`: Copy-paste prompt templates for each phase of the workflow.

---

## 4. Exporting to Another Machine / Session

To export this skill to another session on Windows:
1. Copy the `.agents/skills/elevenlabs-audio-walkthrough/` folder into your Windows project directory under `.agents/skills/`, OR
2. Copy it to your user skills directory at `%USERPROFILE%\.gemini\antigravity\skills\elevenlabs-audio-walkthrough\`.
3. Provide the prompt from `references/prompts.md` (Prompt A or Prompt E) to your assistant.
