import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-call-one.mp3",
    text: "In this scenario, we search for the value 4 within a four-element list where it does not exist. The outer function begins Call 1 over indices 0 to 3. Mid is chosen at index 1, where the value 3 is strictly less than target 4. Because all elements to the left must also be too small, Call 1 eliminates them and delegates to the right half by setting low to 2."
  },
  {
    filename: "02-calls-two-and-three-missing-result.mp3",
    text: "Call 2 probes the window from index 2 to 3. Mid evaluates to index 2, where the value 5 is strictly greater than 4. This eliminates the right side and shifts high down to 1. Call 3 immediately hits the base case: low 2 is greater than high 1. With first_index remaining at its initial negative 1 sentinel, Call 3 returns (-1, 2). The recursion unwinds, conclusively reporting that 4 is absent from the array after 2 comparisons."
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
