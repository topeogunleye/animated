import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-key-idea.mp3",
    text: "Welcome to Integer to Roman. In Roman numerals, we greedily take the largest value that still fits our remaining number. Our descending lookup table holds all thirteen standard denominations, including the subtractive pairs like nine hundred and four. We start with three. Three falls safely within the valid range of one to three thousand, nine hundred and ninety-nine, so the guard check passes. We initialize our result string to empty, and prepare to scan through our table."
  },
  {
    filename: "02-skipping-large-pairs.mp3",
    text: "Now the for loop begins at one thousand. Since three is less than one thousand, nine hundred, and five hundred, the while loop condition is false and each large denomination is skipped. The pointer continues down past one hundred, fifty, ten, five, and four. None of these fit into three, so our numeral remains empty as we sweep toward the smallest units."
  },
  {
    filename: "03-greedy-ones-and-return.mp3",
    text: "Finally, we reach the pair one and capital I. Three is greater than or equal to one, so our while loop runs. In the first iteration, we append I and subtract one, leaving two. Two is still greater than or equal to one, so we append a second I, leaving one. One fits once more: we append our third I, and the remaining number becomes zero. With zero remaining, the while loop exits, the table scan concludes, and we return the finished Roman numeral: I, I, I."
  }
];

async function main() {
  const client = new ElevenLabsClient();

  const response = await client.voices.getAll();
  const voice = (response.voices || []).find(v => v.name && v.name.toLowerCase().includes("lauren"));

  if (!voice) {
    throw new Error("Voice 'Lauren' not found in ElevenLabs account voices.");
  }

  console.log(`Using voice: ${voice.name} (ID: ${voice.voiceId})`);

  for (let i = 0; i < CLIPS.length; i++) {
    const clip = CLIPS[i];
    const targetPath = path.join(__dirname, clip.filename);
    console.log(`[${i + 1}/${CLIPS.length}] Generating ${clip.filename} (${clip.text.length} chars)...`);

    const audioStream = await client.textToSpeech.convert(voice.voiceId, {
      text: clip.text,
      modelId: "eleven_multilingual_v2",
      voiceSettings: {
        stability: 0.50,
        similarityBoost: 0.75,
        style: 0.0,
        useSpeakerBoost: true
      }
    });

    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(targetPath);
      Readable.fromWeb(audioStream)
        .pipe(fileStream)
        .on("finish", resolve)
        .on("error", reject);
    });

    const stats = fs.statSync(targetPath);
    console.log(`Saved ${clip.filename} (${stats.size} bytes)`);
  }

  console.log("\nPreset 0 clips generated successfully!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
