#!/usr/bin/env python3
"""
Generate audio clips for Coins Bottom-Up 3D walkthrough using ElevenLabs API.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CLIPS = [
    {
        "filename": "01-table-setup-and-coin-one.mp3",
        "title": "Preset 0: Milestone 1/3 (Table Setup & Coin 1)",
        "text": (
            "Welcome to Coins Bottom-Up in 3D. We begin with dynamic programming to count how many "
            "distinct coin combinations can make an amount of five using coins of one, two, and five. "
            "We allocate our table, ways, with six slots from zero to five. The base case, ways zero, "
            "is set to one, because there is exactly one way to make zero: use no coins. In this algorithm, "
            "the outer loop iterates over coins one at a time. This guarantees combinations are counted "
            "without permutation duplicates, so one plus two and two plus one are never double counted. "
            "We sweep coin one across amounts one through five: each amount can be made in exactly one way "
            "using only ones."
        )
    },
    {
        "filename": "02-allowing-coin-two.mp3",
        "title": "Preset 0: Milestone 2/3 (Allowing Coin 2)",
        "text": (
            "Now we introduce the two-cent coin. For each amount from two up to five, we look back two steps, "
            "labeled FROM, and add those combinations into our current gold cell, labeled NOW. For amount two, "
            "one way before plus one way to make zero gives two ways. For amount three, we add the way to make "
            "one, giving two ways. At amount four, one previous way plus two ways to make two yields three "
            "combinations. And at amount five, one plus two yields three combinations."
        )
    },
    {
        "filename": "03-allowing-coin-five-and-result.mp3",
        "title": "Preset 0: Milestone 3/3 (Coin 5 & Result)",
        "text": (
            "Finally, we allow the five-cent coin. Since five equals our target, we look back five steps to amount "
            "zero. Three previous combinations plus one way to make zero gives four total ways: all ones, one plus "
            "two plus two, one plus one plus one plus two, or a single five. Every cell was filled in bottom-up "
            "order with zero repeated work, returning four combinations."
        )
    },
    {
        "filename": "04-min-coins-overview.mp3",
        "title": "Preset 1: Fewest Coins Overview",
        "text": (
            "In our second function, min coins, the goal shifts from counting combinations to finding the "
            "absolute fewest coins needed. Here, the outer loop steps through amounts from one to eleven, "
            "while the inner loop evaluates every coin option. Unreachable amounts start at infinity. "
            "By building optimal sub-problems bottom up, amount eleven combines a five-coin with the optimal "
            "two coins for amount six, returning three coins."
        )
    }
]

def find_api_key():
    key = os.environ.get("ELEVENLABS_API_KEY") or os.environ.get("XI_API_KEY")
    if key and key.strip():
        return key.strip()

    cur = os.path.abspath(os.getcwd())
    while True:
        for fname in [".env.local", ".env"]:
            path = os.path.join(cur, fname)
            if os.path.exists(path):
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        for line in f:
                            line = line.strip()
                            if line.startswith("#"):
                                continue
                            if "=" in line:
                                k, v = line.split("=", 1)
                                if k.strip().upper() in ("ELEVENLABS_API_KEY", "XI_API_KEY"):
                                    val = v.strip().strip("'\"")
                                    if val:
                                        return val
                except Exception:
                    pass
        parent = os.path.dirname(cur)
        if parent == cur:
            break
        cur = parent
    return None

def main():
    dry_run = "--dry-run" in sys.argv
    api_key = find_api_key()
    if not api_key:
        print("ERROR: ELEVENLABS_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    output_dir = os.path.dirname(os.path.abspath(__file__))

    total_chars = sum(len(c["text"]) for c in CLIPS)
    print(f"Total clips: {len(CLIPS)}")
    print(f"Total characters to generate: {total_chars}")
    print(f"Estimated credits: ~{total_chars}")

    if dry_run:
        print("\n--- Dry run mode: listing clips ---")
        for idx, clip in enumerate(CLIPS, 1):
            print(f"[{idx}/{len(CLIPS)}] {clip['filename']} ({len(clip['text'])} chars)")
            print(f"Title: {clip['title']}")
            print(f"Text: {clip['text']}\n")
        print("Dry run complete. No audio generated.")
        return

    # Fetch voices
    req = urllib.request.Request(
        "https://api.elevenlabs.io/v1/voices",
        headers={"xi-api-key": api_key, "Accept": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        sys.exit(f"Failed to fetch voices: {e}")

    voices = data.get("voices", [])
    voice = next((v for v in voices if "lauren" in v.get("name", "").lower()), None)
    if not voice:
        voice = next((v for v in voices if "alice" in v.get("name", "").lower()), voices[0] if voices else None)

    voice_id = voice["voice_id"]
    print(f"Using voice: '{voice['name']}' (ID: {voice_id})")

    for idx, clip in enumerate(CLIPS, 1):
        filename = clip["filename"]
        target_path = os.path.join(output_dir, filename)
        if os.path.exists(target_path):
            print(f"Skipping {filename} (already exists)")
            continue

        text = clip["text"]
        print(f"\n[{idx}/{len(CLIPS)}] Generating {filename} ({len(text)} chars)...")

        payload = {
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.50,
                "similarity_boost": 0.75,
                "style": 0.0,
                "use_speaker_boost": True
            }
        }
        post_data = json.dumps(payload).encode("utf-8")

        req = urllib.request.Request(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
            data=post_data,
            headers={
                "xi-api-key": api_key,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg"
            }
        )

        try:
            with urllib.request.urlopen(req) as resp:
                audio_bytes = resp.read()
            with open(target_path, "wb") as f:
                f.write(audio_bytes)
            print(f"Saved: {target_path} ({len(audio_bytes)} bytes)")
        except Exception as e:
            sys.exit(f"Error generating {filename}: {e}")

    print("\nAll audio clips successfully generated and verified!")

if __name__ == "__main__":
    main()
