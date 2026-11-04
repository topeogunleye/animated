import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-rows-zero-to-three.mp3",
    text: "We now observe a larger, eight-row expansion of Pascal's triangle. Building out eight complete rows will produce thirty-six total cells, exhibiting rich combinatorial symmetry. Rows zero and one establish our apex with one and one, one. Row two introduces our first sum: one plus one equals two, giving one, two, one. Row three sums one plus two to three, and two plus one to three, generating the cubic coefficients one, three, three, one."
  },
  {
    filename: "02-rows-four-and-five.mp3",
    text: "Continuing to row four, the interior cells compute one plus three equals four, three plus three equals six, and three plus one equals four, appending row four. In row five, each interior position sums the adjacent pair from row four: one plus four is five, four plus six is ten, six plus four is ten, and four plus one is five, assembling the six-element row one, five, ten, ten, five, one."
  },
  {
    filename: "03-rows-six-and-seven-and-completion.mp3",
    text: "Row six produces twenty at its center, with symmetric flanks of fifteen, six, and one. Finally, row seven calculates our largest values: thirty-five at the twin peaks, flanked by twenty-one, seven, and the boundary ones. The outer loop exhausts all eight rows. The function returns the complete thirty-six-cell triangle, beautifully displaying the binomial coefficients for powers zero through seven."
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
