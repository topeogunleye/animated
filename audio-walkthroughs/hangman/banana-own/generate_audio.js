import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-multi-letter-hits-and-miss.mp3",
    text: "Here we test the word banana, featuring repeated letters and four allowed misses. We start fresh with empty tracking lists. Our first guess is n: because n occurs at two indices, a single guess uncovers two positions simultaneously. Next, guessing n again triggers the duplicate check and is ignored without penalty. Then, guessing x misses the word entirely, recording our first strike."
  },
  {
    filename: "02-triple-hit-and-victory.mp3",
    text: "Fourth, we guess a: a appears three times, instantly filling positions one, three, and five, bringing us to five of six letters uncovered. Finally, guessing b reveals the initial letter. With all six positions displayed, the victory condition triggers immediately and halts execution. The display is formatted as banana, and the function returns status won, display banana, and the single miss x."
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
