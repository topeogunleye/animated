import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-key-idea.mp3",
    text: "Run-length encoding is a classic compression technique that replaces consecutive repeating characters with each letter and its count. Run-length decoding performs the exact inverse, reconstructing the original text. We begin our round trip with the input string a, a, a, b, b, c. In the encode function, we start with an empty result string and place our pointer, i, at index zero."
  },
  {
    filename: "02-encode-run-a.mp3",
    text: "At index zero, pointer i inspects the letter a. A second pointer, j, scans forward as long as it finds matching a's, stepping across indices zero, one, and two. At index three, it encounters the letter b, ending the run. The run length is j minus i, which is three minus zero, giving three. We append a-3 to our result and jump pointer i forward to index three."
  },
  {
    filename: "03-encode-run-b.mp3",
    text: "Now at index three, pointer i picks up the letter b. Pointer j scans forward, matching b at index three and index four. At index five, it sees the letter c, which breaks the run. The run length is five minus three, which equals two. We append b-2 to our compressed result, giving a-3-b-2, and advance pointer i to index five."
  },
  {
    filename: "04-encode-run-c-and-return.mp3",
    text: "At index five, pointer i inspects the final character, c. Pointer j moves forward to index six, reaching the end of the text. This single character gives a run length of one. We append c-1, bringing the encoded string to a-3-b-2-c-1. Because pointer i has reached the end of the text, the loop terminates and encode returns our finished compressed string."
  },
  {
    filename: "05-decode-setup-and-run-a.mp3",
    text: "Now we begin the decoding phase. The top row now holds our compressed string, a-3-b-2-c-1, and the bottom result row resets to empty. At index zero, we read the character a and advance pointer i to index one. The inner loop parses the consecutive digits, reading the digit three to establish a count of three. Multiplying a by three appends a, a, a to our result."
  },
  {
    filename: "06-decode-run-b.mp3",
    text: "Next at index two, pointer i reads the letter b and steps to index three. The inner loop parses the digit two, setting the count to two. Multiplying the character b by two appends b, b to our reconstructed text, bringing our decoded string to a, a, a, b, b."
  },
  {
    filename: "07-decode-run-c-and-round-trip.mp3",
    text: "At index four, pointer i reads the letter c, followed by the digit one at index five. Appending c once yields our full string, a, a, a, b, b, c. Pointer i reaches the end of the encoded text, so decode returns. Finally, we verify that the decoded string matches our original input: they are identical, confirming our round-trip check is true."
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
