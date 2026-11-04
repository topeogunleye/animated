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
    text: "Suppose we want to find the number four in a sorted list containing one, three, five, and eight. Our goal is to locate the target if it exists, or confirm that it is missing. To begin our search, we set two boundaries: low at index zero, and high at index three. We also initialize our result variable to negative one, indicating that no match has been found yet. The blue bounding box outlines our entire four-item search window."
  },
  {
    filename: "02-probe-one-mid-one.mp3",
    title: "Probe 1 (Index 1)",
    text: "We start by checking the middle of our active range. Halfway between zero and three is index one, which holds the number three. Three is smaller than our target of four. Because the list is sorted in ascending order, no number at index one or to its left can possibly equal four. So we advance our low boundary past index one up to index two. In one quick step, we discard the entire left half of the list."
  },
  {
    filename: "03-probe-two-mid-two.mp3",
    title: "Probe 2 (Index 2)",
    text: "Our active search window is now narrowed to just two items: index two and index three. Halfway between two and three is index two, which holds the number five. Five is larger than four. Because all subsequent numbers are even larger, our target cannot be at index two or anywhere to its right. Following our rule, we pull our high boundary down to index one."
  },
  {
    filename: "04-termination-and-missing-result.mp3",
    title: "Termination and Missing Result",
    text: "Look at what just happened to our boundaries: low is at index two, but high has moved down to index one. The boundaries have crossed. Because low is now greater than high, our search interval is completely empty, and the loop terminates. The function returns negative one along with two comparisons. In only two checks, we proved conclusively that the number four is not in the list."
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

  console.log("\nAll 4 audio clips successfully generated!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
