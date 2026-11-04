import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-tens.mp3",
    text: "We now convert fifty-eight to Roman numerals. Fifty-eight easily passes the range guard between one and three thousand, nine hundred and ninety-nine, and result starts as an empty string. The table begins scanning at one thousand. Since fifty-eight is much smaller than one thousand, nine hundred, five hundred, four hundred, one hundred, and ninety, those pairs are all skipped. At fifty, represented by L, fifty-eight is greater than or equal to fifty. We append L, subtract fifty, and are left with eight. Fifty no longer fits into eight, so the loop moves forward."
  },
  {
    filename: "02-fives-and-subtractive-check.mp3",
    text: "With eight remaining, the pointer checks forty, ten, and nine. None of these fit into eight, so they are bypassed. Next is five, written as V. Eight is greater than or equal to five, so we append V and subtract five, leaving three. Five no longer fits into three, concluding the pair. Then we check the subtractive pair four, written as IV. Since three is less than four, IV is skipped without running."
  },
  {
    filename: "03-ones-and-return.mp3",
    text: "Finally, we reach one, represented by I. Three is greater than or equal to one, so our while loop runs. We append I leaving two, append a second I leaving one, and append a third I leaving zero. With zero remaining, our while loop halts, the table scan concludes, and we return the final numeral: L, V, I, I, I—fifty-eight in clean additive Roman notation."
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
