import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-brute-force.mp3",
    text: "In this preset, we investigate an essential edge condition: what happens when every single number in the array is negative? With values negative three, negative one, and negative two, any multi-element subarray will accumulate a smaller, more negative sum. Brute force begins by checking all six possible contiguous slices. As it tests each slice, only index one containing negative one improves upon our initial best of negative three. Brute force concludes that the single least negative element, negative one at index one, yields the maximum sum."
  },
  {
    filename: "02-kadane-all-negative-resets.mp3",
    text: "Now we switch to Kadane's algorithm. We start with current and best both set to negative three at index zero. At index one, because current is negative three, extending it would only drag down future numbers. Kadane's rule immediately triggers: we drop negative three and restart fresh at index one with negative one. This beats negative three, updating best to negative one! At index two, current is again negative, so we drop it once more and restart with negative two, which does not exceed best. Kadane's algorithm returns negative one."
  },
  {
    filename: "03-match-and-least-negative.mp3",
    text: "Both algorithms return negative one spanning index one to index one, confirming an exact match. When all numbers are negative, Kadane's algorithm resets at every single step, elegantly selecting the least negative single element without needing any special branching."
  }
];

async function main() {
  const client = new ElevenLabsClient();

  const response = await client.voices.getAll();
  const voice = (response.voices || []).find(v => v.name && v.name.toLowerCase().includes("lauren"));

  if (!voice) {
    throw new Error("Voice 'Lauren' not found in ElevenLabs account voices.");
  }

  console.log(`Using voice: ${voice.name} (ID: ${voice.voiceId})`);

  for (let i = 0; i < CLIPS.length; i++) {
    const clip = CLIPS[i];
    const targetPath = path.join(__dirname, clip.filename);
    console.log(`[${i + 1}/${CLIPS.length}] Generating ${clip.filename} (${clip.text.length} chars)...`);

    const audioStream = await client.textToSpeech.convert(voice.voiceId, {
      text: clip.text,
      modelId: "eleven_multilingual_v2",
      voiceSettings: {
        stability: 0.50,
        similarityBoost: 0.75,
        style: 0.0,
        useSpeakerBoost: true
      }
    });

    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(targetPath);
      Readable.fromWeb(audioStream)
        .pipe(fileStream)
        .on("finish", resolve)
        .on("error", reject);
    });

    const stats = fs.statSync(targetPath);
    console.log(`Saved ${clip.filename} (${stats.size} bytes)`);
  }

  console.log("\nAll clips generated successfully!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
