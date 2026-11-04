import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIPS = [
  {
    filename: "01-setup-and-key-idea.mp3",
    title: "Setup and Key Idea",
    text: "Suppose we want to find the number three in a sorted list containing one, three, three, three, five, and eight. Standard binary search stops the moment it finds any three. But here, the number three appears three times, and our goal is to find its very first occurrence: the leftmost one. To search efficiently, we set two boundaries: low at index zero, and high at index five. We also prepare a result variable set to negative one, meaning no match has been found yet. The blue bounding box marks our active search window, covering all six items."
  },
  {
    filename: "02-probe-one-mid-two.mp3",
    title: "Probe 1 (Index 2)",
    text: "We begin our search by checking the middle of the range. Halfway between zero and five is index two, which holds a three. That matches our target on our very first comparison. In regular binary search, we would stop right now. But because we want the leftmost three, earlier duplicates might still be hiding to our left. So we save index two as our current best answer, highlighting it in green, and pull our high boundary left to index one. In one quick step, we have eliminated the entire right half of the list."
  },
  {
    filename: "03-probe-two-mid-zero.mp3",
    title: "Probe 2 (Index 0)",
    text: "Our active search window is now down to just two items: index zero and index one. Halfway between them is index zero, which holds the number one. One is smaller than three. Because our list is sorted, nothing at index zero or before it could possibly be our target. So we advance our low boundary past index zero up to index one. Now both boundaries narrow in on the single remaining item."
  },
  {
    filename: "04-probe-three-mid-one.mp3",
    title: "Probe 3 (Index 1)",
    text: "With low and high both resting at index one, our next midpoint is index one. When we inspect it, we find another three. This matches our target again. Because index one is further left than our previous answer, we update our saved result, and the green highlight moves to index one. Following our rule, we search left once more by moving the high pointer down to index zero."
  },
  {
    filename: "05-termination-and-result.mp3",
    title: "Termination and Result",
    text: "Look at what just happened to our boundaries: low is at one, but high has moved down to zero. The boundaries have crossed. Because low is now greater than high, our search range is empty, and the loop finishes. The function returns index one along with three comparisons. We successfully found the true leftmost three in only three checks, leaving the rest of the list completely untouched."
  }
];

async function main() {
  const client = new ElevenLabsClient();

  console.log("Fetching voices to find Alice...");
  const response = await client.voices.getAll();
  const voices = response.voices || [];
  const selectedVoice = voices.find(v => v.name && v.name.toLowerCase().includes("alice"));

  if (!selectedVoice) {
    console.error("Could not find a voice with name containing 'Alice'.");
    console.log("Available voices:", voices.map(v => v.name).join(", "));
    process.exit(1);
  }

  const voiceId = selectedVoice.voiceId || selectedVoice.voice_id;
  const voiceName = selectedVoice.name;
  console.log(`Using voice: '${voiceName}' (ID: ${voiceId})`);

  for (let i = 0; i < CLIPS.length; i++) {
    const clip = CLIPS[i];
    const targetPath = path.join(__dirname, clip.filename);
    console.log(`\n[${i + 1}/${CLIPS.length}] Generating ${clip.filename} (${clip.text.length} chars)...`);

    const audioStream = await client.textToSpeech.convert(voiceId, {
      text: clip.text,
      modelId: "eleven_multilingual_v2",
      voiceSettings: {
        stability: 0.50,
        similarityBoost: 0.75,
        style: 0.0,
        useSpeakerBoost: true
      }
    });

    const fileStream = fs.createWriteStream(targetPath);
    await new Promise((resolve, reject) => {
      Readable.fromWeb(audioStream)
        .pipe(fileStream)
        .on("finish", resolve)
        .on("error", reject);
    });

    const stat = fs.statSync(targetPath);
    console.log(`Saved: ${clip.filename} (${stat.size} bytes)`);
  }

  console.log("\nAll 5 audio clips successfully generated!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
