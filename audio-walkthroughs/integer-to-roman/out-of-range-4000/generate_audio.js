import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-range-check.mp3",
    text: "Now we examine the out-of-range boundary case with input four thousand. Roman numerals in standard notation only support integers from one to three thousand, nine hundred and ninety-nine, because four thousand would require four consecutive M's, violating the standard repetition rule. When int to Roman is called with four thousand, the guard condition evaluates whether num is less than one or greater than thirty-nine ninety-nine. Since four thousand is strictly greater than thirty-nine ninety-nine, the guard triggers."
  },
  {
    filename: "02-value-error-guard.mp3",
    text: "The function immediately raises a Value Error stating that num must be between one and three thousand, nine hundred and ninety-nine. Execution halts immediately without initializing the table, allocating an output string, or building any numeral blocks, demonstrating robust defensive input validation."
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
