import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-single-pass.mp3",
    text: "We now examine the optimal best-case scenario for Bubble Sort: an array that is already sorted in ascending order from one to five. The algorithm initializes comparisons and swaps to zero and starts pass one. It compares one and two: in order. Two and three: in order. Three and four: in order. And four and five: in order. Four comparisons are made, but not a single swap was needed."
  },
  {
    filename: "02-early-break-and-best-case.mp3",
    text: "Because the swapped flag remained false throughout the entire pass, the early termination condition triggers immediately. Rather than blindly executing additional quadratic loops, the sort breaks out after just four comparisons. This demonstrates why the swapped flag provides an optimal big-O of n best-case time complexity, returning four comparisons and zero swaps."
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
