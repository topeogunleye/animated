import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-expansion-concept.mp3",
    text: "In this preset, we investigate the worst-case scenario for run-length encoding: what happens when there are no repeated letters? Compression algorithms rely on redundancy, but here, our input string is a-b-c-a-b-c, where every single run has a length of one. Storing each letter along with its count will actually expand our six-character input into twelve characters. In the encode function, we start with an empty result string and place pointer i at index zero."
  },
  {
    filename: "02-encode-first-half-abc.mp3",
    text: "At index zero, pointer i inspects the letter a. Pointer j checks the next character, but at index one it sees b, which breaks the run immediately. With a length of one, we append a-1. Next at index one, pointer i inspects b, which stops at index two when it sees c, appending b-1. At index two, letter c stops at index three, appending c-1. Through the first three letters, our compressed result has already grown to a-1-b-1-c-1."
  },
  {
    filename: "03-encode-second-half-and-return.mp3",
    text: "Now we encode the second half of the string. At index three, letter a stops at index four, appending a-1. At index four, letter b stops at index five, appending b-1. Finally, at index five, letter c reaches the end of the text, appending c-1. Pointer i reaches the end of the string, and encode returns a-1-b-1-c-1-a-1-b-1-c-1. Because there were no repeated characters, our encoded string is now twice as long as the original."
  },
  {
    filename: "04-decode-setup-and-first-half.mp3",
    text: "Now we enter the decoding phase to verify that decompression still works correctly. The top row holds our twelve-character encoded text, and the result resets to empty. At index zero, we read the letter a, and the inner loop parses the digit one, appending a single a. Moving to index two, letter b with count one appends b. At index four, letter c with count one appends c, successfully reconstructing the first three letters: a-b-c."
  },
  {
    filename: "05-decode-second-half-and-round-trip.mp3",
    text: "We continue decoding the second triad. At index six, letter a with count one appends a. At index eight, letter b with count one appends b. At index ten, letter c with count one appends c, bringing our reconstructed text to a-b-c-a-b-c. Pointer i reaches the end of the encoded string, terminating the loop. Finally, comparing the decoded result with our original string shows they match identically, confirming that even during data expansion, our round trip is true."
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
