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
    text: "A great test for any search algorithm is how gracefully it handles an empty list. Here, our list contains zero items, and we are searching for the target number seven. When we initialize our search, low begins at index zero, and high is set to the length of the list minus one, which gives negative one. We also record zero comparisons and set our result variable to negative one. Notice that before we even begin searching, our low boundary is already greater than our high boundary."
  },
  {
    filename: "02-termination-and-result.mp3",
    title: "Termination and Result",
    text: "Next, the algorithm checks the loop condition: is low less than or equal to high? Since zero is greater than negative one, this condition evaluates to false right away. The loop never runs, meaning we avoid any midpoint calculations or out of bounds errors. The function proceeds straight to the return statement, giving back negative one along with zero comparisons. In zero steps, binary search safely confirms that the target cannot be found in an empty list."
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

  console.log("\nAll 2 audio clips successfully generated with Lauren!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
