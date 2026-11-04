import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-pass-one.mp3",
    text: "Here we examine the true worst-case scenario for Bubble Sort: an array completely reversed from five down to one. Because every single pair is inverted, every comparison will force a swap. We initialize our counters and launch pass one with four pair checks. First, five is greater than four, so they swap. Next, five is compared with three and swapped. Then five compares with two and swaps. Finally, five compares with one and swaps. In this single pass, the maximum value five had to bubble all the way across the array to index four, racking up four comparisons and four swaps."
  },
  {
    filename: "02-pass-two-bubbling-four.mp3",
    text: "Pass two begins, checking the three unsorted pairs up to index three. Four is compared with three and swapped. Four is then compared with two and swapped. Finally, four is compared with one and swapped. Four reaches its proper home at index three, bringing our totals to seven comparisons and seven swaps."
  },
  {
    filename: "03-pass-three-bubbling-three.mp3",
    text: "Pass three narrows the search window down to just two pairs. Three is compared with two and swapped. Three is then compared with one and swapped. Three is now permanently settled at index two, leaving only two elements left to be verified."
  },
  {
    filename: "04-pass-four-and-worst-case.mp3",
    text: "Pass four performs the final comparison between two and one. Two is greater than one, triggering our tenth and final swap. Both remaining items are now settled in their proper positions. Because the array was reversed, no early exit could trigger. The sort required exactly n times n minus one divided by two, or ten comparisons, and ten swaps. We return ten comparisons and ten swaps, demonstrating the quadratic big-O of n squared worst case."
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
