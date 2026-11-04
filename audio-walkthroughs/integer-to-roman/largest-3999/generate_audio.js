import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-three-thousands.mp3",
    text: "Here we test three thousand, nine hundred and ninety-nine: the maximum allowed value in standard Roman numerals. Thirty-nine ninety-nine lies right at the upper bound of our range guard, so execution proceeds normally and result starts empty. We begin with one thousand, represented by M. Thirty-nine ninety-nine is greater than one thousand, so we append our first M leaving twenty-nine ninety-nine. We append a second M leaving nineteen ninety-nine, and a third M leaving nine hundred and ninety-nine. At nine hundred and ninety-nine, one thousand no longer fits, finishing our thousands."
  },
  {
    filename: "02-hundreds-and-tens.mp3",
    text: "Next is the subtractive pair nine hundred, written as CM. Nine hundred and ninety-nine is greater than nine hundred, so we append CM and subtract nine hundred, leaving ninety-nine. Denominations five hundred, four hundred, and one hundred are skipped because ninety-nine is too small. We reach ninety, written as XC. Ninety-nine is greater than ninety, so we append XC and subtract ninety, leaving exactly nine. Ninety no longer fits into nine, completing our tens reduction."
  },
  {
    filename: "03-nines-and-return.mp3",
    text: "With nine remaining, fifty, forty, and ten are bypassed. We reach nine, represented by the subtractive pair IX. Nine is greater than or equal to nine, so we append IX and subtract nine. Our remaining number drops to zero. With zero remaining, no subsequent pairs can match, and the loop exits cleanly. We return the largest valid numeral: M, M, M, CM, XC, IX—three thousand, nine hundred and ninety-nine in all its majestic glory."
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
