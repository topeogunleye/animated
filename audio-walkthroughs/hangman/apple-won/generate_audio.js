import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-early-guesses.mp3",
    text: "Welcome to Hangman in 3D. In Hangman, we track guessed letters, wrong attempts, and our current revealed word. Repeated letters cost nothing, misses increment our wrong attempts counter, and the game halts the moment all letters are revealed or the attempt limit is breached. We initialize with the target word apple, allowing up to three wrong attempts. First, we guess a: it hits at index zero, revealing one of five letters. Next, we guess z: z is not in apple, so it records our first miss. Then, we guess p: because p appears twice, a single guess reveals both middle positions, bringing us to three of five letters shown."
  },
  {
    filename: "02-solving-and-victory.mp3",
    text: "Continuing our sequence, we guess l, revealing the fourth letter. Finally, guessing e uncovers the last remaining position. With five of five letters displayed, the winning condition triggers immediately and breaks from the loop. The display string is assembled as apple, and the function returns status won, display apple, and the single wrong guess z."
  }
];

async function main() {
  const client = new ElevenLabsClient();
  const response = await client.voices.getAll();
  const voice = (response.voices || []).find(v => v.name && v.name.toLowerCase().includes("lauren"));
  if (!voice) throw new Error("Voice 'Lauren' not found.");

  for (let i = 0; i < CLIPS.length; i++) {
    const clip = CLIPS[i];
    const targetPath = path.join(__dirname, clip.filename);
    console.log(`[${i + 1}/${CLIPS.length}] Generating ${clip.filename}...`);
    const audioStream = await client.textToSpeech.convert(voice.voiceId, {
      text: clip.text,
      modelId: "eleven_multilingual_v2",
      voiceSettings: { stability: 0.50, similarityBoost: 0.75, style: 0.0, useSpeakerBoost: true }
    });
    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(targetPath);
      Readable.fromWeb(audioStream).pipe(fileStream).on("finish", resolve).on("error", reject);
    });
    console.log(`Saved ${clip.filename}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
