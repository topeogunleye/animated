import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-brute-force.mp3",
    text: "In this preset, we explore an intriguing scenario: symmetrical tie-breaking. Our array contains one, negative one, and one. Notice that several different subarrays achieve the exact same maximum sum: the single element at index zero has sum one, the single element at index two has sum one, and the entire three-element array sums to one! Brute force evaluates all six slices. Because our update condition requires total to be strictly greater than best, ties do not overwrite earlier findings, and brute force returns the first optimal slice: sum one at index zero to index zero."
  },
  {
    filename: "02-kadane-symmetry-and-ties.mp3",
    text: "Now Kadane's algorithm executes. It initializes both current and best to one at index zero. At index one, adding negative one reduces current to zero. Crucially, zero is not negative, so Kadane's rule does not drop the subarray; it keeps extending. At index two, adding one raises current back to one. Since one is not strictly greater than our existing best of one, best remains at index zero to index zero. Kadane's algorithm returns one from index zero to index zero."
  },
  {
    filename: "03-tie-resolution-and-match.mp3",
    text: "Both algorithms return a maximum sum of one from index zero to index zero, confirming a match. This preset demonstrates that strict inequality ensures consistent, deterministic tie-breaking across both algorithms, preserving the leftmost optimal subarray."
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
