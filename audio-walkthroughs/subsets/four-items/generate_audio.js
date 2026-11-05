import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-skip-one-and-two.mp3",
    text: "Welcome to the full 4-element power set walkthrough for items 1, 2, 3, and 4. With four elements, the binary choice tree spans depth 4, generating 2 to the fourth, or 16 subsets. We begin by taking the skip branch for item 1 and item 2. Deep in the tree at items 3 and 4, we evaluate all combinations: skipping both gives the empty set; including 4 gives [4]; including 3 and skipping 4 gives [3]; and including both gives [3, 4]. We pop back to depth 1 having collected our first four subsets."
  },
  {
    filename: "02-include-two-branch.mp3",
    text: "At depth 1, we now take the include branch for item 2, keeping item 1 skipped. We descend the remaining choices for items 3 and 4: skipping both reveals [2]; including 4 uncovers [2, 4]; including 3 reveals [2, 3]; and including 3 and 4 yields [2, 3, 4]. Popping our stack back to depth 0 brings us to eight subsets—completing the entire first half of the power set."
  },
  {
    filename: "03-include-one-skip-two.mp3",
    text: "Now at depth 0, we enter the second half of the tree by including item 1. We first skip item 2 and explore items 3 and 4: skipping both yields [1]; including 4 gives [1, 4]; including 3 gives [1, 3]; and including both produces [1, 3, 4]. After unwinding these calls, we have twelve subsets in total."
  },
  {
    filename: "04-include-one-and-two-finish.mp3",
    text: "Finally, at depth 1, we include both item 1 and item 2. Navigating our final leaves yields [1, 2], [1, 2, 4], [1, 2, 3], and the complete set [1, 2, 3, 4]. With all sixteen leaves recorded, the recursion unwinds completely back to the caller. Subsets returns 16 subsets—flawlessly validating 2 to the fourth equals 16."
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
