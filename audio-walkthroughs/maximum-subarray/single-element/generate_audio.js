import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-key-idea.mp3",
    text: "In this preset, we examine the base case of the maximum subarray problem: an array containing a single element, the number five. When an array has only one item, any contiguous subarray must consist solely of that single element. We begin by setting up brute force, initializing best to our first element, five, at index zero."
  },
  {
    filename: "02-brute-and-fast-single-element.mp3",
    text: "Brute force checks the only slice available: the single element at index zero. Total equals five, which matches best, so brute force returns five from index zero to index zero. Now we run Kadane's algorithm. It initializes both current and best to five. Because the array has length one, the loop from index one onward has zero iterations to perform, so the single pass also returns five immediately."
  },
  {
    filename: "03-match-and-base-case.mp3",
    text: "Both algorithms return a maximum sum of five from index zero to index zero, resulting in a match. This confirms that even without any loop iterations, our boundary conditions and initial variables naturally handle single-element arrays correctly."
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
