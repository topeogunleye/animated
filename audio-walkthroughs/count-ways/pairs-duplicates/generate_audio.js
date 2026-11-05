import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-frequency-map-and-first-pair.mp3",
    text: "Welcome to Count Pairs in 3D. Given an array of integers and a target sum, this function counts how many pairs add up to the target in a single linear pass using a frequency hash map. We start with numbers [1, 5, 7, -1, 5] and target 6. We initialize an empty frequencies dictionary and set pairs to 0. First, we visit 1. Its complement, 6 minus 1, is 5. Since 5 has not appeared yet, matching pairs is 0. We store 1 in our frequency map. Next, we visit 5. Its complement, 6 minus 5, is 1. Looking up 1 reveals 1 earlier match! We increment pairs to 1, recording the pair (1, 5), and add 5 to our map. Next, at 7, its complement 6 minus 7 is -1, which is not yet present, so we store 7."
  },
  {
    filename: "02-negative-complement-and-duplicate-pair.mp3",
    text: "Continuing to the fourth element, -1, we calculate its complement: 6 minus -1 equals 7. Checking our map, 7 was already seen once, so we increment pairs to 2, capturing the pair (7, -1), and add -1 to our dictionary. Finally, we encounter a duplicate value: 5. Its complement, 6 minus 5, is 1. The map still holds one instance of 1, so pairs increments to 3, capturing our second (1, 5) pair! The frequency of 5 increases to 2. With the loop complete, count pairs returns 3—efficiently finding all pairs in linear time."
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
