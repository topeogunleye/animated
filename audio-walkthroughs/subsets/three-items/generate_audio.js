import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-skip-one-branch.mp3",
    text: "Welcome to Recursive Subsets in 3D. The power set contains all possible subsets of our input items. For each item, our recursive algorithm makes a binary choice: first, recurse while skipping the item; then, recurse while including it. When index reaches the length of our list, we hit our base case and return a snapshot of the current subset. We begin with items 1, 2, and 3. At depth 0, we examine item 1 and choose the skip branch. At depth 1, we skip 2. At depth 2, we skip 3. At depth 3, all choices are made, saving our first subset: the empty set. Backtracking to depth 2, we now test the include branch with 3, reaching depth 3 to record our second subset: [3]. Both branches for 3 finish, we pop 3, and return upward."
  },
  {
    filename: "02-include-two-branch.mp3",
    text: "Returning to depth 1, we now explore the include branch for item 2, appending 2 to our current list. At depth 2, we first skip 3, reaching the base case to collect our third subset: [2]. Next, we include 3, discovering our fourth subset: [2, 3]. Popping 3 and then popping 2 restores our collection. At this halfway point, the entire skip branch for item 1 is resolved, yielding the first four subsets."
  },
  {
    filename: "03-include-one-and-completion.mp3",
    text: "Now we take the include branch at depth 0, adding item 1. Skipping 2 and 3 uncovers [1]. Including 3 reveals [1, 3]. Continuing through the include branch for item 2, we uncover [1, 2], and finally, including all three items yields [1, 2, 3]. With all recursive leaves evaluated, the stack unwinds back to the caller. Subsets returns eight total subsets—confirming 2 cubed equals 8."
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
