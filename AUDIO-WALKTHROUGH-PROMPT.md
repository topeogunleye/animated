# Create an audio walkthrough with ElevenLabs

This reusable prompt is designed for algorithm and software visualizations. It
asks an AI to study the actual example, write narration that follows what the
viewer sees, and prepare short, separately generatable sections for ElevenLabs.
It can also connect highlighted code to the visual state changes when code
commentary is enabled. Copy the prompt below into any AI that can inspect files,
or paste the relevant source and animation details with it.

## Repeatable process

1. **Choose one walkthrough and one concrete run.** Prefer a small input that
   makes the important behavior visible. Record the input, expected result, and
   any special cases you want included.
2. **Give the AI the source of truth.** Share the animation, source code,
   captions or step descriptions, and relevant controls. Ask it to follow the
   actual trace—not to invent visual events or imply that the animation shows
   something it does not. If you want code commentary, include the code and
   explain how its highlighted lines or blocks correspond to animation steps.
3. **Review the script before generating audio.** Check the example and
   calculations against the source. Make sure each narration segment matches a
   visible event, and that there is enough time for the viewer to understand it.
4. **Generate in ElevenLabs.** Use the same selected voice and model for all
   sections in a walkthrough. Generate each labeled section separately when
   you need to synchronize audio to animation steps; for a continuous narration,
   use the current ElevenLabs workflow that best supports longer-form audio.
   Keep the text conversational and spell out anything the chosen voice tends
   to mispronounce.
5. **Listen and revise.** Check pronunciation, pacing, transitions, factual
   accuracy, and synchronization against the animation. Regenerate only the
   sections that need changes, then export consistently named audio files.

## Copy-and-use prompt

```text
You are an educational audio-walkthrough writer and technical fact-checker.
Help me create narration for an interactive animation that I will generate
with ElevenLabs.

PROJECT
- Topic or animation: [name or link]
- Source files / pasted source / screenshots / step descriptions: [provide]
- Intended audience: [e.g. curious beginners]
- Walkthrough goal: [what the listener should understand or be able to do]
- Example input to follow: [input, or "choose a small representative input
  from the source and tell me which one you chose"]
- Include code commentary? [yes/no; if yes, focus on logic blocks, conditional
  triggers, and state updates rather than syntax]
- Include special cases? [yes/no; identify them if known]
- Target total length: [minutes, or "short and clear"]
- Voice/style preference: [optional; e.g. warm, calm, friendly]
- Output language: [language]

WORKFLOW
1. Inspect the provided material before writing. Treat the source code, actual
   animation behavior, and provided captions as authoritative. If something
   needed is missing, ask only questions whose answers would materially change
   the narration. Otherwise proceed with clearly stated assumptions.
2. Identify the selected example's exact input, important intermediate states,
   result, and any relevant edge case. Verify every number, move, branch, and
   claim against the supplied source. Do not invent animation details, outputs,
   or features. If the evidence is insufficient, say what cannot be verified.
3. Build the explanation around a worked example. State the input; walk
   through meaningful intermediate steps; explain why at least one key step is
   valid or necessary; and state the outcome. Use concrete values and names
   from the animation, not only abstract descriptions. For example, for a
   three-disk Tower of Hanoi run, explain the actual peg moves shown and how
   they help move the largest disk. Do not force this example if the project
   is about something else.
4. Bridge visuals and code when code commentary is enabled. When code is
   highlighted or executing, do not read it line by line. Explain what the
   logic is achieving at that exact moment—for example, how a loop condition
   checks a boundary or how a recursive base case catches the stop condition—
   so the viewer can connect the code to the visual state change.
5. Divide the narration into short, meaningful audio segments that can be
   generated separately and aligned to the animation. Do not create a new
   segment for every tiny frame. Include a segment for the introduction, the
   worked example, and the conclusion; include an edge-case segment only if
   requested or useful. Keep each segment focused and easy to regenerate.
6. Write for the ear: natural spoken language, short sentences, clear
   transitions, and minimal jargon. Briefly explain necessary terminology.
   Avoid reading code line by line, repeating captions verbatim, overly
   dramatic language, and directions like "look here" unless the visual cue
   is unambiguous. Use punctuation and phrasing that help text-to-speech
   pronunciation. Do not put stage directions in the spoken text.

DELIVERABLES
A. A brief factual outline: selected input, verified result, and key steps.
B. A segment table with these columns:
   - Segment ID and suggested filename (lowercase, hyphenated)
   - Animation cue / state (and active code line or block, if applicable)
     to synchronize with
   - Spoken narration, ready to paste into ElevenLabs
   - Approximate duration
C. A complete read-through version showing how the segments flow together.
D. A short pronunciation / text-to-speech note for names, symbols, and
   abbreviations that may be read incorrectly.
E. A final accuracy checklist that flags any assumption or detail I should
   verify manually.

Keep the narration faithful to the supplied example. Prefer a smaller,
accurate explanation over a broader explanation that the animation does not
support.
```

## Example of the requested style

For the Hanoi animation's three-disk run, a short narration might say:

> “We’re moving three disks from peg A to peg C, using peg B as the helper.
> First, disk one moves from A to C, disk two moves from A to B, and disk one
> moves from C to B. Now the two smaller disks are out of the way, so the
> largest disk can move from A to C. Each move follows the same two rules:
> move one disk at a time, and never put a larger disk on a smaller one.”

Use this only as a style example. When making a real script, verify the full
sequence, wording, and timing against that animation's selected input and
visible steps.
