import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-hash-table-setup-and-isolated-streaks.mp3",
    text: "Welcome to Longest Consecutive Sequence in 3D. We are given the unsorted list [100, 4, 200, 1, 3, 2] and want to find the length of the longest consecutive elements sequence in optimal O of n time. First, we populate a hash table with all elements for constant-time lookups. We initialize our best streak length to 0. We begin iterating through table keys. First, at 100, we check if 100 minus 1, or 99, is in the table. Because 99 is absent, 100 marks the beginning of a streak. The while loop checks for 101, which is not present, yielding streak length 1. We update best to 1. Next, at 4, 4 minus 1, or 3, is already in the table—so 4 cannot be a streak beginning, and we skip it instantly! Next, at 200, 199 is absent, so 200 starts a streak. 201 is missing, yielding length 1."
  },
  {
    filename: "02-longest-streak-and-skips.mp3",
    text: "Continuing to 1, we check if 1 minus 1, or 0, is in the table. 0 is absent, confirming 1 is a streak start! The while loop checks 2, 3, 4, and 5: 2 is present, 3 is present, 4 is present, and 5 is absent. This reveals the sequence 1, 2, 3, 4 with length 4! We update best from 1 to 4. Next, at 3, its predecessor 2 is in the table, so we skip it. At 2, its predecessor 1 is present, so we skip it. With all keys evaluated, longest consecutive returns 4—achieving linear time by only checking sequences from their true start elements."
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
