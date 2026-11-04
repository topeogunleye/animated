import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIPS = [
  {
    filename: "01-setup-and-key-idea.mp3",
    text: "In this visualizer, we explore the maximum subarray problem using two distinct approaches: brute force and Kadane's algorithm. The core idea is that brute force exhaustively evaluates every contiguous slice, whereas the single-pass algorithm maintains a running sum and immediately resets whenever that sum drops below zero. We test both methods on our nine-element array containing positive and negative values. Brute force begins first, initializing best to our first element, negative two, at index zero."
  },
  {
    filename: "02-brute-force-all-slices.mp3",
    text: "Brute force systematically checks all forty-five possible contiguous subarrays. An outer pointer i selects each starting position, while an inner pointer j expands the slice rightward, accumulating values into total. Whenever total surpasses best, we record the new peak and its bounding indices. As the visualizer sweeps through all pairs, the slice from index three to index six emerges as the winner, reaching a total of six. Having checked all combinations, brute force returns sum six from index three to six."
  },
  {
    filename: "03-kadane-init-and-early-drops.mp3",
    text: "Now we execute Kadane's algorithm, which solves the problem in a single linear pass. We initialize both current and best to the first element, negative two, at index zero. At index one, because our current sum is negative, carrying it forward would only hurt any future slice. Kadane's rule triggers: we discard negative two and restart our subarray at index one with value one, which updates best to one. At index two, adding negative three pulls current to negative two. At index three, seeing a negative current sum again, we drop it and restart fresh with four, updating best to four."
  },
  {
    filename: "04-kadane-accumulate-maximum.mp3",
    text: "With a healthy positive sum of four, we continue extending our window. At index four, adding negative one drops current to three, but because three is still positive, our subarray remains alive. At index five, adding two elevates current to five, surpassing four and setting a new best. At index six, adding one lifts current to six, capturing our optimal subarray: four, negative one, two, one, with a maximum sum of six! Adding negative five at index seven and four at index eight completes the pass."
  },
  {
    filename: "05-comparison-and-complexity.mp3",
    text: "With one pass completed, Kadane's algorithm returns our maximum sum of six from index three to index six. Comparing the results confirms an exact match: both methods identified the identical optimal slice. However, while brute force required forty-five checks quadratic in array size, Kadane's algorithm arrived at the exact same answer in just nine linear steps, illustrating the elegant efficiency of resetting negative prefixes."
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
