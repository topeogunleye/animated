import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-calls-one-and-two.mp3",
    text: "Here we trace a ten-element array containing a cluster of four duplicate 4s. The outer function begins Call 1 spanning indices 0 to 9. Mid evaluates to index 4, hitting target 4! We set first_index to 4 and recurse into indices 0 through 3. In Call 2, mid index 1 holds 2, which is too small, pruning the lower range and advancing low to 2."
  },
  {
    filename: "02-calls-three-through-five-and-finish.mp3",
    text: "Call 3 searches indices 2 to 3. Mid index 2 contains 2, again too small, shifting low up to 3. Call 4 isolates index 3. Here, nums[3] equals 4! We update first_index to 3 and recurse with high set to 2. Call 5 encounters low 3 exceeding high 2 and triggers the base return. Unwinding through all five recursive frames, the function returns (3, 4), successfully pinpointing the earliest 4 at index 3 with 4 total comparisons."
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
