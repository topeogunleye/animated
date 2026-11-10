# solution-to-3d-animation (Upgraded Guided Audio Tour Edition)

Exported Antigravity skill for building standalone Three.js 3D algorithm walkthroughs with synchronized line-by-line highlighting and 1-Click Guided Audio Tours.

---

## How to Install on Your Home Computer

Choose one of the two options below depending on how you want to use the skill:

### Option 1: Global Installation (Recommended)
Make the skill automatically available across **all projects and workspaces** on your home machine:

1. Locate or create your global Antigravity skills directory:
   * **Linux / macOS**: `~/.gemini/config/skills/`
   * **Windows**: `%USERPROFILE%\.gemini\config\skills\`
2. Extract or copy this `solution-to-3d-animation/` folder into that directory so it looks like:
   ```text
   ~/.gemini/config/skills/solution-to-3d-animation/
   ├── SKILL.md
   ├── package.json
   ├── assets/
   │   ├── template.html
   │   └── icon.svg
   ├── references/
   │   ├── 3d-patterns.md
   │   └── audio-tour-playbook.md
   └── scripts/
       ├── dump_trace.js
       └── validate_trace.js
   ```
3. Restart or open your Antigravity chat. The skill will be auto-discovered immediately.

---

### Option 2: Project-Specific Installation
If you want the skill stored inside a specific repository and committed to Git:

1. In your project root, create `.agents/skills/`:
   ```bash
   mkdir -p .agents/skills/
   ```
2. Copy this folder into `.agents/skills/solution-to-3d-animation/`.
3. Antigravity will discover it automatically whenever that workspace is open.

---

## Included Features in this Upgraded Edition

1. **1-Click Guided Audio Tour**: Unified `#bTour` button (`▶ Audio Tour` / `⏸ Pause Tour`) with synchronous first-click audio execution (bypassing browser autoplay blocks).
2. **Audio-Driven Milestone Machine**: Pre-recorded ElevenLabs audio clips drive the pacing as the master clock, firing visual frame cues (`show(frameIdx, true)`) in lockstep with spoken commentary.
3. **Mute / Silent Mode Toggle**: A compact `🔊` / `🔇` button allows switching between voiceover and silent timer-based stepping.
4. **Universal Refactor Playbook**: Includes `references/audio-tour-playbook.md` containing the universal prompt to refactor existing visualizations.
5. **Headless Verification Tools**: `scripts/dump_trace.js` and `scripts/validate_trace.js` test your animations before delivery with zero DOM overhead and memory snapshot independence validation.
