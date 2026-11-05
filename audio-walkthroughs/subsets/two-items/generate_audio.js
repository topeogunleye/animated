import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-skip-one-branch.mp3",
    text: "Here we examine a two-element list with items 1 and 2. We start at depth 0, evaluating item 1. Choosing the skip branch, we proceed to depth 1 without 1. Next, at depth 1, we skip 2 as well. Reaching depth 2 with all choices made, we save our first subset: the empty set. Backtracking to depth 1, we now test the include branch for item 2, reaching depth 2 to record our second subset: [2]. We pop 2 to restore our current state, and return upward."
  },
  {
    filename: "02-include-one-and-finish.mp3",
    text: "Back at depth 0, we now explore the include branch, appending item 1. At depth 1, skipping 2 leads to the base case, capturing our third subset: [1]. Then, including 2 produces our fourth subset: [1, 2]. We pop 2 and then pop 1, returning all branches to the top level. The function completes, returning four subsets—confirming 2 squared equals 4."
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
