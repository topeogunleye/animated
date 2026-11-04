import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-rows-zero-to-one.mp3",
    text: "Welcome to Pascal's Triangle in 3D. The fundamental property of Pascal's triangle is that every interior cell is the direct sum of the two cells directly above it, while the outer boundaries are always ones. We initialize an empty list called rows to construct five rows row by row. Row zero begins with a single cell at index zero. Because it is an edge, we append one and finish row zero. Row one holds two cells: indices zero and one are both boundaries, so both receive ones, giving us the row one, one."
  },
  {
    filename: "02-rows-two-and-three.mp3",
    text: "In row two, we see the additive recurrence take effect for the first time. The left edge cell receives one. For the interior cell at column one, the algorithm looks up to the previous row and adds one plus one to get two. The right edge receives one, completing row two as one, two, one. Moving to row three, the edges are one, while column one sums one plus two to yield three, and column two sums two plus one to yield three, finishing row three as one, three, three, one."
  },
  {
    filename: "03-row-four-and-completion.mp3",
    text: "Finally, row four starts with an edge of one. The interior cells compute one plus three equals four, three plus three equals six, and three plus one equals four, followed by the terminating edge of one. Row four appends one, four, six, four, one. All five rows are now completely assembled, totaling fifteen cells. The outer loop terminates, and the function returns the completed list of rows."
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
