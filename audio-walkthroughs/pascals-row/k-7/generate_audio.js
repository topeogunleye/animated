import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-through-pass-four.mp3",
    text: "For k equals 7, we compute the eighth row of Pascal's triangle across seven sequential passes. Starting with row equals [1], each pass appends a trailing zero and sweeps inward from right to left. Passes 1 through 3 produce [1, 1], [1, 2, 1], and [1, 3, 3, 1]. In pass 4, we append 0 and compute row[4] down to row[1], establishing [1, 4, 6, 4, 1]. Notice how symmetry naturally emerges as each cell sums adjacent parent values in place without allocating auxiliary lists."
  },
  {
    filename: "02-passes-five-through-seven.mp3",
    text: "Pass 5 appends 0 and sweeps backwards to form [1, 5, 10, 10, 5, 1]. In pass 6, the values expand to [1, 6, 15, 20, 15, 6, 1]. Finally, pass 7 appends 0 and performs 7 in-place additions: row[7] is 1, followed by 7, 21, 35, 35, 21, and 7. The loop finishes after 28 total updates, returning [1, 7, 21, 35, 35, 21, 7, 1]. This single-list in-place algorithm runs in O of k squared time while using strictly O of k space."
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
