import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-brute-empty.mp3",
    text: "In this preset, we analyze the empty list boundary condition. When given an array with zero elements, there are no items to form a subarray. Both algorithms guard against this edge case at their very first line. Brute force checks the array length, finds it to be zero, and immediately returns zero with indices negative one, negative one, indicating that no slice exists."
  },
  {
    filename: "02-kadane-empty-and-match.mp3",
    text: "Next, the single pass executes on the same empty list. It checks the identical guard condition, finds length zero, and also returns zero with indices negative one, negative one without executing its main loop. Comparing both outputs confirms a match: zero, negative one, negative one. Early exit checks ensure our algorithms terminate safely and predictably when inputs are empty."
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

  console.log("\nAll clips generated successfully!");
}

main().catch(err => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
