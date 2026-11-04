import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-key-idea.mp3",
    text: "In this preset, we examine a clean boundary condition for run-length encoding: a single, uninterrupted run of exactly ten identical letters. This example serves two key pedagogical purposes: it showcases maximum compression efficiency where ten characters compress into just three, and it isolates the threshold where run counts transition from single-digit to two-digit numbers. In the encode function, we begin with an empty result string and place pointer i at index zero."
  },
  {
    filename: "02-encode-ten-ks.mp3",
    text: "At index zero, pointer i inspects the letter k. A second pointer, j, scans forward to measure the length of this continuous run. Because all ten characters in the string match k, pointer j sweeps across every single position from index zero to index nine. At index ten, j reaches the end of the text, ending our run. Calculating j minus i gives ten minus zero, which equals ten. We append k-10 to our result, advance pointer i to index ten, and the encode loop terminates, returning our compressed string: k-10."
  },
  {
    filename: "03-decode-parse-ten.mp3",
    text: "Now we enter the decoding phase, where our parser must accurately reconstruct the original ten letters from the compressed string k-10. The top row now holds our three-character encoded text, and the result resets to empty. At index zero, we read the character k and move pointer i to index one. The inner loop parses the two-digit count: first reading digit one to give count 1, then reading digit zero to compute 1 times 10 plus 0, which equals ten! Multiplying k by ten appends all ten k's into our result."
  },
  {
    filename: "04-termination-and-round-trip.mp3",
    text: "Pointer i has now reached index three, the end of our encoded text, so the decode loop terminates and returns our reconstructed string of ten k's. Finally, we verify that the decoded text matches the original input: both are exactly ten k's, confirming that our round-trip check evaluates to true. Through encode and decode, our ten identical characters have completed a perfect round trip."
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
