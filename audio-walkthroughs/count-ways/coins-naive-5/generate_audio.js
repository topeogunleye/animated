import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-all-ones-path.mp3",
    text: "Welcome to the Performance Lab in 3D. Here we explore the classic coin change problem, counting how many distinct combinations of coins can form our target amount. We begin with our naive recursive implementation for amount 5 using coin denominations 1, 2, and 5. First, normalize coins sanitizes our denominations, verifying that each coin is a positive integer and deduplicating them into an immutable tuple: (1, 2, 5). Next, count ways defines an internal helper, ways, taking remaining amount and a coin index, then launches our initial call: ways(5, 0). At depth 1, remaining is 5. We subtract our first coin, denomination 1, and recurse into ways(4, 0). Stepping deeper, each call uses coin 1: ways(3, 0) at depth 3, ways(2, 0) at depth 4, ways(1, 0) at depth 5, and finally ways(0, 0) at depth 6. With remaining equal to 0, our base case triggers, returning 1—representing our first valid combination: five 1-cent coins."
  },
  {
    filename: "02-coin-two-combinations.mp3",
    text: "Backtracking up the call stack, we now explore the alternative choice: skipping coin 1 to evaluate coin 2. From remaining 1 at index 1, subtracting 2 drops remaining to -1, which is negative and immediately returns 0. Testing coin 5 also goes negative to -4, returning 0. Reaching the end of our coin list at index 3 returns 0 as well. Backtracking further to remaining 2, using coin 2 calls ways(0, 1). Because remaining is exactly 0, it returns 1, discovering our second valid combination: three 1s plus one 2. After unwinding negative dead ends, combining these branches yields two valid combinations so far."
  },
  {
    filename: "03-exploring-subtrees-and-overlap.mp3",
    text: "Continuing up the tree to remaining 3 and remaining 4, we evaluate further coin choices. Notice something critical: subproblems like ways(1, 1) and ways(2, 1) are re-evaluated from scratch, duplicating identical recursive subtrees. Without memoization, every path explores redundant calculations. Branching from remaining 4 with coin 2 calls ways(0, 1), which returns 1 to give our third combination: one 1 plus two 2s. Unwinding through remaining 4 completes the first half of our recursion with three combinations found."
  },
  {
    filename: "04-coin-five-and-completion.mp3",
    text: "Finally, we return to the root level and take the branch that skips coin 1 entirely, starting with coin 2 for amount 5. The algorithm once again re-evaluates overlapping subtrees. Advancing to coin 5 at index 2, we execute ways(5, 2). Subtracting 5 gives ways(0, 2), immediately returning 1—representing our fourth valid combination: a single 5-cent coin. Moving past index 2 hits our boundary and returns 0. The stack unwinds all the way back to the root caller, summing three plus one. The function completes with result 4—confirming four distinct ways to make 5 cents."
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
