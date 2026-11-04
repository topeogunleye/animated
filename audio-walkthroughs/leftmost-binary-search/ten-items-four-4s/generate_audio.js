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
    text: "Here we have a ten element sorted list containing four duplicate fours clustered together in the middle. Our goal is to find the very first four: the leftmost one at index three. To search efficiently, we set our boundaries: low at index zero and high at index nine, wrapping all ten items in our blue bounding box. We also initialize our result variable to negative one, ready to track our leftmost match."
  },
  {
    filename: "02-probe-one-mid-four.mp3",
    title: "Probe 1 (Index 4)",
    text: "We start our search by checking the middle of our active range. Halfway between zero and nine is index four, which holds a four. That matches our target on our very first comparison. A standard binary search would stop here, but earlier duplicate fours might still exist to our left. So we save index four as our candidate result in green, and pull our high boundary down to index three. In one single comparison, we have safely eliminated sixty percent of the list."
  },
  {
    filename: "03-probe-two-mid-one.mp3",
    title: "Probe 2 (Index 1)",
    text: "Our active search window is now narrowed to indices zero through three. Halfway between zero and three is index one, which holds the number two. Two is strictly smaller than our target of four. Because the list is sorted in ascending order, no number at or before index one can possibly equal four. So we advance our low boundary past index one up to index two, while keeping our saved answer of four safely in memory."
  },
  {
    filename: "04-probe-three-mid-two.mp3",
    title: "Probe 3 (Index 2)",
    text: "Now our search window contains only two items: index two and index three. Halfway between two and three is index two, which holds another two. Once again, two is smaller than four. Following our rule, we discard index two and advance our low boundary up to index three. Now both boundaries, low and high, rest at index three, focusing on the single remaining item."
  },
  {
    filename: "05-probe-four-mid-three.mp3",
    title: "Probe 4 (Index 3)",
    text: "With both low and high at index three, our next midpoint is index three. When we inspect it, we find another four. This matches our target again. Because index three is further left than our previous candidate at index four, our saved result updates to index three, and the green highlight moves left. Searching left once more, we pull our high boundary down to index two."
  },
  {
    filename: "06-termination-and-result.mp3",
    title: "Termination and Result",
    text: "Look at what just happened to our boundaries: low is at index three, but high has moved down to index two. The boundaries have crossed. Because low is now greater than high, our search interval is empty, and the loop terminates. The function returns index three along with four comparisons. Out of ten items and four duplicate matches, we conclusively proved that the true leftmost four is at index three in only four checks."
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

  console.log("\nAll 6 audio clips successfully generated with Lauren!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
