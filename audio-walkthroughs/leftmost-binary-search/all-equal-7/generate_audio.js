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
    text: "Suppose we are searching for the number seven in a sorted list where every single element is the number seven. A standard binary search would stop on its very first check because any midpoint is already a match. But our goal is to find the leftmost seven: the one at the very front of the list. To begin, we set low at index zero and high at index four, wrapping all five numbers in our blue bounding box. We also initialize our result variable to negative one, ready to track our leftmost match."
  },
  {
    filename: "02-probe-one-mid-two.mp3",
    title: "Probe 1 (Index 2)",
    text: "We start our search by inspecting the middle of our active range. Halfway between zero and four is index two, which holds a seven. That matches our target on our very first comparison. Rather than stopping here, our leftmost rule tells us to save index two as our candidate result, marked by the green badge, and search left by pulling our high boundary down to index one. In one single comparison, we have safely ruled out indices two, three, and four."
  },
  {
    filename: "03-probe-two-mid-zero.mp3",
    title: "Probe 2 (Index 0)",
    text: "Our active search window is now narrowed to just indices zero and one. Using integer division, halfway between zero and one is index zero, which holds another seven. We have matched our target again. Because index zero is further left than our previous answer, our saved result updates to index zero, and the green highlight moves to the front of the list. Searching left once more, we pull our high boundary down past index zero to negative one."
  },
  {
    filename: "04-termination-and-result.mp3",
    title: "Termination and Result",
    text: "Look at what just happened to our boundaries: low is still at index zero, but high has moved down to negative one. The boundaries have crossed. Because low is now greater than high, our search interval is empty, and the loop terminates. The function returns index zero along with two comparisons. In only two probes, leftmost binary search bypassed all later duplicates and conclusively proved that the very first seven is at index zero."
  }
];

async function main() {
  const client = new ElevenLabsClient();

  console.log("Fetching voices to find Lauren...");
  const response = await client.voices.getAll();
  const voices = response.voices || [];
  const selectedVoice = voices.find(v =>
    (v.voiceId === "DODLEQrClDo8wCz460ld" || v.voice_id === "DODLEQrClDo8wCz460ld") ||
    (v.name && v.name.toLowerCase().includes("lauren"))
  );

  if (!selectedVoice) {
    console.error("Could not find voice 'Lauren' (ID: DODLEQrClDo8wCz460ld).");
    console.log("Available voices:", voices.map(v => `${v.name} (${v.voiceId || v.voice_id})`).join(", "));
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

  console.log("\nAll 4 audio clips successfully generated with Lauren!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
