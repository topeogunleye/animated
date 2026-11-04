import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-repeat-guess.mp3",
    text: "Now let's explore an ongoing game with repeated guesses. We play with the word python and five allowed misses. We start with empty guessed and wrong lists. Our first guess is p, hitting at index zero to reveal the first letter. Next, p is guessed a second time. Because p is already in our guessed collection, the algorithm skips it entirely—costing zero misses and keeping our game state unchanged."
  },
  {
    filename: "02-reveal-and-incomplete-game.mp3",
    text: "Our third guess is y, which hits at index one, revealing two of six letters. At this point, our guesses list is exhausted before reaching either a win or a loss. The loop terminates, keeping the status as playing. The display string is constructed as p, y, followed by four underscores, and the function returns status playing, display py with four blanks, and an empty list of wrong guesses."
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
