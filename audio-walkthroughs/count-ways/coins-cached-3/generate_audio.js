import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-decorator-setup-and-all-ones.mp3",
    text: "Here we explore memoized coin change for amount 3 with denominations 1, 2, and 5. The memoize decorator wraps our recursive ways function with an in-memory lookup table. First, normalize coins deduplicates our denominations to (1, 2, 5). We then initialize wrapper hit and miss counters. Launching ways(3, 0), the wrapper records a cache miss for key (3, 0) and recurses. Subtracting coin 1, we descend into ways(2, 0), ways(1, 0), and ways(0, 0), with each call registering a cache miss. At depth 4, remaining reaches 0, returning 1 for our first valid combination: three 1-cent coins. The wrapper caches result 1 for key (0, 0) and returns."
  },
  {
    filename: "02-branching-and-storing-subproblems.mp3",
    text: "Backtracking to explore coin 2, branches with negative remaining amounts or exceeding coin bounds return 0 and are stored in our cache. At remaining 2, branch ways(2, 1) subtracts coin 2 to call ways(0, 1). Remaining is 0, returning 1—our second valid combination: one 1 plus one 2. As each unique subproblem resolves, the wrapper records its return value in cache. Unwinding through remaining 2, we return result 1, and unwinding through remaining 3 concludes the all-ones branch."
  },
  {
    filename: "03-cache-hit-and-final-accounting.mp3",
    text: "Now we take the top-level branch that skips coin 1: ways(3, 1). Subtracting coin 2 reaches ways(1, 1). When the wrapper inspects the cache for key (1, 1), it finds an existing entry! The hits counter increments to 1, and the cached value is returned instantly—skipping redundant recursive calls entirely. Advancing to coin 5 produces negative remaining amounts and returns 0. The function completes with result 2, recording 1 hit, 12 misses, and 13 total calls."
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
