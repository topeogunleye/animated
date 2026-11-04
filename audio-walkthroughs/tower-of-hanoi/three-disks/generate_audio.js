import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-recursive-strategy.mp3",
    text: "We now explore the classic three-disk Tower of Hanoi puzzle. Our mission is to transfer all three disks from peg A to peg C using helper peg B. To free our largest disk, disk three, we must first park the top two disks on helper peg B. To park those two disks on B, we must first park disk one on peg C. Watch the call stack build on the right: hanoi of three spawns hanoi of two, which spawns hanoi of one, which reaches our base case hanoi of zero. The base case returns an empty list, and our physical disk movements begin."
  },
  {
    filename: "02-parking-top-disks-on-b.mp3",
    text: "In move one, disk one moves from peg A to peg C. Returning from hanoi of one, we reach move two: transferring disk two from peg A to peg B. Now, to place disk one on top of disk two on peg B, we launch hanoi of one from C to B using A as the helper. In move three, disk one transfers from peg C onto peg B. Notice the intermediate state: the top two disks are now cleanly parked on peg B in sorted order, leaving peg A with only the giant disk three, and leaving target peg C completely empty!"
  },
  {
    filename: "03-transferring-disk-three.mp3",
    text: "With the runway clear, we execute move four: the pivotal transition where disk three moves from source peg A to target peg C. Our largest disk is permanently home! Now begins the mirror subproblem: hanoi of two from peg B to peg C, using peg A as the helper. To free disk two, we must first park disk one on peg A. In move five, disk one moves from peg B to peg A. Disk two is now uncovered on peg B, ready to move."
  },
  {
    filename: "04-reassembling-and-final-return.mp3",
    text: "In move six, disk two moves from peg B onto target peg C, resting comfortably on disk three. Finally, we invoke hanoi of one to bring disk one from peg A onto peg C. In move seven, disk one lands on top, fully reassembling the tower. The recursive calls collapse up the stack: three moves plus one plus three equals exactly seven moves. Two to the third minus one is satisfied, and our three-disk journey is triumphantly complete!"
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
