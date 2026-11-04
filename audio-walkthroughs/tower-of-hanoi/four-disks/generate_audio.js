import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-four-disk-strategy.mp3",
    text: "We now tackle the four-disk Tower of Hanoi puzzle. To transfer all four disks from peg A to peg C, our master strategy requires three macroscopic phases: first, park the top three disks onto helper peg B; second, transfer base disk four onto target peg C; and third, reassemble the three disks on peg C. Watch the call stack dive: hanoi of four spawns hanoi of three, then two, then one, until hanoi of zero reaches the base case without moving a disk."
  },
  {
    filename: "02-parking-three-disks-on-b.mp3",
    text: "Now the subproblem unfolds over moves one through seven. Move one sends disk one from A to B. Move two moves disk two from A to C. In move three, disk one jumps onto C. Move four places disk three onto helper peg B. Next, moves five, six, and seven transfer disks one and two over to join disk three on peg B. Seven moves are complete: the top three disks are cleanly parked in ascending order on helper peg B, leaving base disk four fully exposed on peg A!"
  },
  {
    filename: "03-transferring-disk-four.mp3",
    text: "With the runway wide open, we execute move eight: the central milestone where disk four journeys from source peg A to target peg C. Disk four has reached its permanent home! Next begins the second subproblem: hanoi of three from peg B to peg C using peg A as the helper. Through moves nine, ten, and eleven, disks one and two shift onto peg A, clearing the way for disk three."
  },
  {
    filename: "04-restacking-and-final-assembly.mp3",
    text: "In move twelve, disk three transfers from helper peg B to peg C, landing on disk four. Finally, hanoi of two brings the remaining two disks home: move thirteen sends disk one to peg B, move fourteen puts disk two onto peg C, and in move fifteen, disk one caps the summit! Seven plus one plus seven yields exactly fifteen moves. Two to the fourth minus one is fulfilled, and the four-disk tower stands complete!"
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
