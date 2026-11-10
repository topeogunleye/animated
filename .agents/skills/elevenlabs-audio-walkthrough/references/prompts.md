# Ready-to-Use Prompts for Your Windows PC Session

Copy and paste these prompts directly into your AI assistant session (Antigravity, Claude Code, Cursor, Windsurf, or terminal) on your Windows PC.

---

## Prompt A: Windows Environment Bootstrap (Handles Missing API Key)

Use this prompt first to let the assistant inspect your Windows environment and configure the ElevenLabs key without friction:

```markdown
# TASK: Setup & Verify ElevenLabs Environment on Windows

You are working in the repository on my Windows PC.

I need to generate educational audio walkthroughs using ElevenLabs, but I have NOT added the ELEVENLABS_API_KEY to my Windows terminal environment variables yet.

Please perform the following bootstrap steps:
1. Check if `.env.local` or `.env` exists in the project root containing `ELEVENLABS_API_KEY`.
2. If neither exists, check if `process.env.ELEVENLABS_API_KEY` is present.
3. If no key is configured:
   - Provide me with the exact PowerShell command to create `.env.local` locally (`Set-Content -Path .env.local -Value "ELEVENLABS_API_KEY=your_key_here"`), OR
   - Run `npx -y @elevenlabs/cli@latest onboard init` to let me securely input it via terminal.
   - Do NOT ask me to paste API keys directly into this chat transcript.
4. Once configured, verify the connection by listing available voices (looking for "Lauren" or "Alice") and confirm ready status.
```

---

## Prompt B: Step 1 – Script Inspection & Segment Authoring

Use this prompt to generate the timed spoken narration table from the algorithm visualizer:

```markdown
# TASK: Author Narration Script for [PRESET_NAME]

Target Visualizer:
`[PATH_TO_HTML]` (e.g., `01-leftmost-binary-search/leftmost_binary_search_animation.html`)

Target Preset:
- Preset Name: "[PRESET_NAME]" (e.g., "Duplicate 3s")
- Arguments: [INPUT_VALUES]

Output Destination:
`audio-walkthroughs/[PROBLEM_SLUG]/[PRESET_SLUG]/script.md`

Requirements:
1. Inspect the visualizer's actual `simulate()` function and `SRC` code lines. Do not guess the step sequence.
2. Formulate 4 to 6 concise spoken segments matching key educational milestones:
   - Setup & Key Idea
   - Probes / Comparisons / Iterations
   - State updates (e.g., pointer moves, highlights)
   - Termination and final return value
3. Format as a Markdown segment table:
   | Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
4. Guidelines for Spoken Text:
   - Written out in clear, natural conversational English for ElevenLabs TTS (write "three" instead of "3", "equals" instead of "==").
   - Zero markdown formatting, stage directions, or brackets in the spoken text column.
5. Provide pronunciation notes and character counts.
```

---

## Prompt C: Step 2 – Credit Approval & Audio Synthesis

Use this prompt to synthesize the MP3 clips using ElevenLabs:

```markdown
# TASK: Synthesize Audio Clips for [PROBLEM_SLUG]/[PRESET_SLUG]

Input Source:
`audio-walkthroughs/[PROBLEM_SLUG]/[PRESET_SLUG]/script.md`

Output Directory:
`audio-walkthroughs/[PROBLEM_SLUG]/[PRESET_SLUG]/`

Settings:
- Voice: "Lauren" (or "Alice" if Lauren is not present)
- Model: Eleven Multilingual v2 (`eleven_multilingual_v2`)
- Stability: 50%
- Similarity Boost: 75%
- Style: 0%
- Speaker Boost: ON

Workflow:
1. Read the segment table in `script.md`.
2. Display a credit approval summary before spending credits:
   - Table of filenames and character counts
   - Total character count and estimated credits
   - Request confirmation to proceed.
3. Upon approval:
   - Execute the generator script (e.g. `node --env-file=.env.local .agents/skills/elevenlabs-audio-walkthrough/scripts/generate_audio.js path/to/script.md` or the local generator script).
   - Verify every `.mp3` file is generated and non-empty.
   - Report finished file list with sizes.
```

---

## Prompt D: Step 3 – Wire into 1-Click Guided Audio Tour

Use this prompt to connect the generated audio clips into the visualizer's milestone machine:

```markdown
# TASK: Integrate Guided Audio Tour into [VISUALIZER_NAME]

Target File:
`[PATH_TO_HTML]`

Audio Clips:
`audio-walkthroughs/[PROBLEM_SLUG]/[PRESET_SLUG]/*.mp3`

Requirements:
1. Add or update the `WALKTHROUGHS` object in the visualizer HTML:
   - Point relative paths to the generated MP3s (e.g. `../audio-walkthroughs/...`).
   - Define milestones with `{ id, name, clip, cues: [{ time, frameIdx }] }`.
2. Connect to the unified 1-Click Guided Audio Tour UX:
   - Primary Hero Button `#bTour`: `▶ Audio Tour` / `⏸ Pause Tour`.
   - Audio is the master clock: Spoken cues trigger visual `show(frameIdx, true)`.
   - Silent Mode Toggle `#bMute`: `🔊` / `🔇` toggles between voiceover and timer-based stepping.
   - Status Pill `#tourStatus`: Displays `Milestone X/N` and active description.
3. Transport Harmony: Next/Back/Reset pause audio immediately.
4. Autoplay Compliance: Synchronous `play()` on user click.
5. Verify in browser or automated headless test.
```

---

## Prompt E: All-in-One Autonomous Pipeline

If you want the agent on your Windows PC to run all 3 steps end-to-end for a given problem:

```markdown
# TASK: End-to-End Guided Audio Tour for [PROBLEM_NAME]

Target: `[PATH_TO_HTML]`
Preset: "[PRESET_NAME]"

Please execute the complete 3-step walkthrough pipeline:
1. Environment check: Confirm `.env.local` contains `ELEVENLABS_API_KEY`. (If not, guide me to create it).
2. Author `audio-walkthroughs/[SLUG]/script.md` based on `simulate()` logic.
3. Show character count and estimated credits, then generate `.mp3` files into `audio-walkthroughs/[SLUG]/`.
4. Integrate the clips into the visualizer using the 1-Click Guided Audio Tour architecture.
5. Run automated verification and report test results.
```
