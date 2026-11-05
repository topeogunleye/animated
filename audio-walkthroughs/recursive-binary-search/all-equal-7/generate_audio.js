import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-call-one.mp3",
    text: "When every element in the list equals our target 7, leftmost binary search relentlessly marches leftward to isolate the very first index. The outer function launches Call 1 over indices 0 to 4. Mid evaluates to index 2, which matches 7. We record index 2 as first_index and recurse left with high set to 1."
  },
  {
    filename: "02-calls-two-and-three-and-apex.mp3",
    text: "Call 2 tests indices 0 through 1. Mid is index 0, which also equals 7! We update first_index to 0 and search left once more with high set to negative 1. Call 3 detects low 0 exceeding high negative 1 and halts the recursion. The return value (0, 2) passes back up the call chain, identifying index 0 as the leftmost match in just 2 comparisons."
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
