import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-pass-one.mp3",
    text: "Welcome to Bubble Sort in 3D. Bubble sort works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. With each complete pass, the largest remaining value bubbles up to its final position at the end. We begin with five items: five, one, four, two, eight. In pass one, we check four adjacent pairs. First, five is greater than one, so we swap them. Next, five is greater than four, triggering our second swap. Then, five is greater than two, swapping again. Finally, five is less than or equal to eight, so no swap is needed. Pass one concludes with three swaps, permanently locking the largest item, eight, in place at index four."
  },
  {
    filename: "02-pass-two-bubbling-four.mp3",
    text: "Because swaps occurred in the previous pass, the algorithm launches pass two. Notice our optimization: because eight is already sorted, we only need to inspect three pairs. Comparing one and four, they are in order. Comparing four and two, four is greater, so we swap them, marking our fourth total swap. Comparing four and five, they are in order. Pass two concludes having placed the second-largest value, five, at index three."
  },
  {
    filename: "03-pass-three-and-early-exit.mp3",
    text: "Pass three begins, testing only the remaining two pairs: positions zero through two. First, one and two are compared and found in order. Next, two and four are compared and found in order. Crucially, pass three completed with zero swaps! The swapped flag remains false, allowing the algorithm to execute an early break after nine comparisons rather than running redundant passes. The list is fully sorted in place, returning nine comparisons and four swaps."
  }
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
    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(targetPath);
      Readable.fromWeb(audioStream).pipe(fileStream).on("finish", resolve).on("error", reject);
    });
    console.log(`Saved ${clip.filename}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
