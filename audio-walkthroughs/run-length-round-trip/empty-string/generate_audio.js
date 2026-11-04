import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-encode-empty.mp3",
    text: "In this final preset, we examine the fundamental base case for run-length round trip: an empty input string. Edge case analysis is critical in algorithm design to ensure our loops terminate gracefully without index errors or false assumptions. With an empty string, the length is zero. We begin the encode function by initializing an empty result string and placing pointer i at index zero. The loop condition checks whether i is less than the string length. Because zero is not less than zero, the condition evaluates to false immediately. The loop body never executes, and the encode function directly returns an empty string."
  },
  {
    filename: "02-decode-and-round-trip.mp3",
    text: "Now we transition to the decode function with our empty compressed string. As with encoding, the top row is empty, the result string starts empty, and pointer i begins at index zero. When evaluating the while loop condition, i less than the encoded length tests whether zero is less than zero. Since this is false from the very start, the decoding loop ends without a single iteration, and the function safely returns an empty string. Finally, we verify that the decoded string matches our original input. Both are empty strings, so the round-trip equality check evaluates to true. Our algorithm proves robust even at length zero."
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
