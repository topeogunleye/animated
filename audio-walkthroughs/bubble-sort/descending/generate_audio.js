import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-pass-one.mp3",
    text: "Now let us explore Bubble Sort configured for descending order. When sorting in descending order, the condition reverses: an inversion occurs when the left element is strictly less than the right element. Instead of bubbling the largest value forward, each pass sinks the smallest remaining item to the end of the array. In pass one, five is greater than one, so no swap is made. But then one is less than four, less than two, and less than eight, triggering three consecutive swaps. The smallest element, one, is now settled at index four."
  },
  {
    filename: "02-pass-two-and-three.mp3",
    text: "Pass two begins, checking pairs up to index three. Five and four are in order, as are four and two. But two is less than eight, swapping them and locking two in place at index three. Pass three checks two pairs: five and four are in order, but four is less than eight, swapping them to place eight ahead of four. Four is now settled at index two."
  },
  {
    filename: "03-pass-four-and-completion.mp3",
    text: "Finally, pass four conducts the last comparison between five and eight. Five is less than eight, prompting our sixth swap. With eight, five, four, two, and one, the entire list is sorted in descending order. Ten comparisons and six swaps were required, completing the descending demonstration."
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
