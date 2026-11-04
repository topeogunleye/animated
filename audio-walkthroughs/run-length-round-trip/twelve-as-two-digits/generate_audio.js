import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-key-idea.mp3",
    text: "In this example, we explore a crucial behavior in run-length encoding: handling runs that span ten or more characters. When a run reaches two digits, the count requires multiple characters to represent. We begin our round trip with twelve consecutive letter a's followed by a single letter b, making thirteen characters total. In the encode function, we start with an empty result string and place pointer i at index zero."
  },
  {
    filename: "02-encode-twelve-as.mp3",
    text: "At index zero, pointer i inspects the letter a. A second pointer, j, scans forward through the text as long as each character matches a. It advances across twelve consecutive positions, from index zero all the way to index eleven. At index twelve, it encounters the letter b, which ends the run. Calculating j minus i gives twelve minus zero, which equals twelve. We append a-12 to our result and jump pointer i forward to index twelve."
  },
  {
    filename: "03-encode-b-and-return.mp3",
    text: "Now at index twelve, pointer i inspects the letter b. Pointer j moves to index thirteen, reaching the end of the text. Because this run has length one, we append b-1 to our compressed result, giving a-12-b-1. Pointer i has now reached the end of the text, so the encode loop terminates and returns our finished compressed string."
  },
  {
    filename: "04-decode-two-digit-run-twelve.mp3",
    text: "Now we enter the decoding phase, where parsing multi-digit numbers is essential. The top row displays our compressed string, a-12-b-1, and the result resets to empty. At index zero, we read the character a and advance pointer i to index one. The inner while loop parses consecutive digits. First, it reads digit 1, giving count 1. Then it reads digit 2, computing 1 times 10 plus 2, which equals twelve! At index three, it sees the letter b, terminating the number. Multiplying a by twelve reconstructs our twelve consecutive a's."
  },
  {
    filename: "05-decode-b-and-round-trip.mp3",
    text: "Moving to index three, pointer i reads the letter b and steps to index four. The inner loop reads the digit one, setting the count to one. Repeating b once appends b to our result, completing the reconstruction of twelve a's and one b. Pointer i reaches the end of the encoded text, so decode returns. Finally, we verify that the decoded string matches our original input: they are identical, confirming our round-trip check is true."
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
