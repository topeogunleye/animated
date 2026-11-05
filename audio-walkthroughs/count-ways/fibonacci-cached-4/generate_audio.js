import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-memoized-calls-and-base-cases.mp3",
    text: "Welcome to Fibonacci with memoization for n equals 4. Without caching, naive Fibonacci exhibits exponential O of 2 to the n complexity. Here, our memoize decorator intercepts every call. We start by calling fib(4), which misses the cache and invokes fib(3). fib(3) misses and invokes fib(2). fib(2) misses and invokes fib(1). At n equals 1, the base case triggers immediately, returning 1, which the wrapper stores in cache for key (1,). Next, fib(2) invokes fib(0), which hits the base case, returning 0 and caching key (0,). fib(2) sums 1 and 0, caching result 1 for key (2,)."
  },
  {
    filename: "02-cache-hits-and-completion.mp3",
    text: "Now back at fib(3), the second branch requires fib(1). Checking the cache, key (1,) is already present! The wrapper records a cache hit and returns 1 immediately without any recursive recomputation. fib(3) sums 1 plus 1 to return 2, caching result 2 for key (3,). Finally, returning to the root call fib(4), the second branch requires fib(2). Once again, key (2,) is found in our cache, scoring our second cache hit! The wrapper returns 1 immediately. fib(4) sums 2 plus 1, returning final answer 3 with 2 cache hits and 5 misses."
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
