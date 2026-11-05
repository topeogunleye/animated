import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-call-one.mp3",
    text: "Welcome to recursive leftmost binary search in 3D. When searching for a value with potential duplicates, finding any match isn't enough—we want the first occurrence. Recursively, whenever nums[mid] matches our target, we record mid as first_index and immediately make a recursive call searching the left half, knowing the earliest copy can only exist at or before our current match. The outer function kicks off Call 1 with search(0, 5, -1, 0). With low 0 and high 5, mid calculates to 2. Checking nums[2], we find 3 equals our target. We record first_index as 2 and prepare Call 2 on the left subarray."
  },
  {
    filename: "02-calls-two-through-four-and-completion.mp3",
    text: "Call 2 searches indices 0 through 1. At mid index 0, the value 1 is too small, discarding the left and advancing low to 1. Call 3 focuses solely on index 1. Here, nums[1] equals 3! We update first_index from 2 to 1 and narrow high down to 0. Call 4 triggers our base case where low 1 exceeds high 0. With no active window remaining, Call 4 returns the final tuple (1, 3). This result unwinds back up the call stack, confirming that the leftmost 3 resides at index 1 after 3 comparisons."
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
