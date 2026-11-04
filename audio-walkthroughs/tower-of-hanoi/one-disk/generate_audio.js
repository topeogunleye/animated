import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-base-cases.mp3",
    text: "Welcome to the Tower of Hanoi. The classic puzzle asks us to move a stack of disks from source peg A to target peg C, using helper peg B, never placing a larger disk onto a smaller one. The master recursive strategy is threefold: park the top n minus one disks on the helper, transfer the largest disk directly to the target, and finally restack the n minus one disks on top. With n equals one, we enter hanoi of one from A to C. Because n is one, the algorithm first calls hanoi of zero to simulate moving any disks above disk one. Zero disks require zero moves, returning an empty list immediately."
  },
  {
    filename: "02-single-move-and-return.mp3",
    text: "Returning to hanoi of one, we execute the middle step: moving disk one directly from peg A to target peg C. Next, we recurse on the trailing subproblem, hanoi of zero, to restack disks from the helper onto the target. As before, zero disks return an empty move list. We combine the first part, the middle move, and the last part, returning exactly one move. With two to the first minus one equals one move completed, the single-disk base case is solved."
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
