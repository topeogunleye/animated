import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-early-passes.mp3",
    text: "Welcome to Pascal's Row in 3D. While computing Pascal's triangle usually requires storing entire triangular grids, we can find any single row k using only one list of length k plus 1. The key trick is updating elements from right to left, ensuring each value we read from the left has not yet been overwritten. We start with row equals [1], representing row 0. To reach row 4, we perform 4 passes. In pass 1, we append 0 to make room, then update row[1] by adding row[1] plus row[0], giving [1, 1]. In pass 2, we append 0 and update right to left: row[2] becomes 1, and row[1] becomes 1 plus 1, which is 2. In pass 3, we append 0 and set row[3] to 1."
  },
  {
    filename: "02-passes-three-four-and-completion.mp3",
    text: "Continuing pass 3, row[2] becomes 1 plus 2, which is 3, and row[1] becomes 2 plus 1, also 3, yielding [1, 3, 3, 1]. In pass 4, we append 0 and sweep right to left one final time: row[4] becomes 1, row[3] becomes 1 plus 3, which is 4, row[2] becomes 3 plus 3, which is 6, and row[1] becomes 3 plus 1, which is 4. With range of k completed, the function returns [1, 4, 6, 4, 1]—producing the complete fourth row of Pascal's triangle in linear O of k space."
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
