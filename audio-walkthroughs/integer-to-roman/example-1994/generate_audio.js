import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-thousands.mp3",
    text: "Here we trace nineteen ninety-four, the quintessential test of Roman subtractive notation. One thousand, nine hundred and ninety-four is within our range, so the guard check passes, and our result string starts empty. We examine the largest denomination: one thousand, represented by M. Nineteen ninety-four is greater than one thousand, so we greedily append M and subtract one thousand. With nine hundred and ninety-four remaining, one thousand no longer fits, and our while loop advances."
  },
  {
    filename: "02-subtractive-hundreds-and-tens.mp3",
    text: "Next is the subtractive pair nine hundred, written as CM. Nine hundred and ninety-four is greater than nine hundred, so we append CM and subtract nine hundred, leaving just ninety-four. Because ninety-four is less than five hundred, four hundred, and one hundred, those pairs are skipped. Then we encounter ninety, written as XC. Ninety-four is greater than ninety: we append XC and subtract ninety, leaving only four."
  },
  {
    filename: "03-subtractive-fours-and-return.mp3",
    text: "With four remaining, pairs fifty, forty, ten, nine, and five are all too large and get bypassed. We arrive at four, represented by the subtractive pair IV. Four is greater than or equal to four, so we append IV and subtract four. The remaining number is now zero. No further pairs fit, so the loop exits early. We return the final numeral: M, CM, XC, IV—nineteen ninety-four expressed with optimal brevity."
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

  console.log("\nPreset 2 clips generated successfully!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
