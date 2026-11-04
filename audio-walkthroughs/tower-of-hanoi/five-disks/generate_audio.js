import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-exponential-scale.mp3",
    text: "Welcome to the five-disk Tower of Hanoi. Here we witness the rapid exponential growth of the puzzle: two to the fifth minus one equals thirty-one distinct moves! The top four disks must first be parked on helper peg B so base disk five can reach peg C. As the call stack descends five levels deep, physical movements begin. Moves one through seven maneuver disks one, two, and three into their first intermediate arrangement, demonstrating the self-similar fractal nature of recursive decomposition."
  },
  {
    filename: "02-clearing-four-disks-to-b.mp3",
    text: "In move eight, disk four steps across to helper peg B. Through moves nine through fifteen, the smaller three-disk pyramid is systematically disassembled and rebuilt atop disk four on peg B. Notice the state after move fifteen: fifteen individual moves have been executed, and all four top disks are resting in perfect order on helper peg B. Source peg A holds only disk five, and target peg C is completely clear!"
  },
  {
    filename: "03-transferring-disk-five.mp3",
    text: "Move sixteen is the crowning centerpiece of the five-disk puzzle: the largest disk, disk five, moves majestically from peg A to target peg C. Halfway through our thirty-one move journey, the base is anchored! Now the entire fifteen-move process mirrors in reverse, transferring the four disks from helper peg B to peg C. Moves seventeen through twenty-three cycle the three smallest disks over to peg A, setting up the transfer of disk four."
  },
  {
    filename: "04-final-tower-assembly.mp3",
    text: "In move twenty-four, disk four moves onto peg C above disk five. Then, the final seven-move sequence begins: disk three joins the main tower in move twenty-eight, followed by disks two and one. In move thirty-one, the final disk clicks into place on peg C. Fifteen moves to park the top, one move for the giant, and fifteen moves to reassemble: exactly thirty-one moves. Our five-disk tower is flawlessly complete!"
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
