#!/usr/bin/env python3
"""
Generate audio clips for Leftmost Binary Search walkthrough using ElevenLabs API.

This script reads from script.md (or defined clips dictionary), checks for ELEVENLABS_API_KEY
in the environment, locates the "Lauren" voice, and generates MP3 files saved in this folder.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CLIPS = [
    {
        "filename": "01-setup-and-key-idea.mp3",
        "title": "Setup and Key Idea",
        "text": (
            "Suppose we want to find the number three in a sorted list containing one, three, three, "
            "three, five, and eight. Standard binary search stops the moment it finds any three. But here, "
            "the number three appears three times, and our goal is to find its very first occurrence: "
            "the leftmost one. To search efficiently, we set two boundaries: low at index zero, and high "
            "at index five. We also prepare a result variable set to negative one, meaning no match has "
            "been found yet. The blue bounding box marks our active search window, covering all six items."
        )
    },
    {
        "filename": "02-probe-one-mid-two.mp3",
        "title": "Probe 1 (Index 2)",
        "text": (
            "We begin our search by checking the middle of the range. Halfway between zero and five is "
            "index two, which holds a three. That matches our target on our very first comparison. In "
            "regular binary search, we would stop right now. But because we want the leftmost three, "
            "earlier duplicates might still be hiding to our left. So we save index two as our current best "
            "answer, highlighting it in green, and pull our high boundary left to index one. In one quick "
            "step, we have eliminated the entire right half of the list."
        )
    },
    {
        "filename": "03-probe-two-mid-zero.mp3",
        "title": "Probe 2 (Index 0)",
        "text": (
            "Our active search window is now down to just two items: index zero and index one. Halfway "
            "between them is index zero, which holds the number one. One is smaller than three. Because our "
            "list is sorted, nothing at index zero or before it could possibly be our target. So we advance "
            "our low boundary past index zero up to index one. Now both boundaries narrow in on the single "
            "remaining item."
        )
    },
    {
        "filename": "04-probe-three-mid-one.mp3",
        "title": "Probe 3 (Index 1)",
        "text": (
            "With low and high both resting at index one, our next midpoint is index one. When we inspect it, "
            "we find another three. This matches our target again. Because index one is further left than our "
            "previous answer, we update our saved result, and the green highlight moves to index one. "
            "Following our rule, we search left once more by moving the high pointer down to index zero."
        )
    },
    {
        "filename": "05-termination-and-result.mp3",
        "title": "Termination and Result",
        "text": (
            "Look at what just happened to our boundaries: low is at one, but high has moved down to zero. "
            "The boundaries have crossed. Because low is now greater than high, our search range is empty, "
            "and the loop finishes. The function returns index one along with three comparisons. We "
            "successfully found the true leftmost three in only three checks, leaving the rest of the list "
            "completely untouched."
        )
    }
]

def main():
    api_key = os.environ.get("ELEVENLABS_API_KEY") or os.environ.get("XI_API_KEY")
    if not api_key:
        print("ERROR: ELEVENLABS_API_KEY environment variable is not set.", file=sys.stderr)
        print("Please set it in your environment using: export ELEVENLABS_API_KEY='your-key-here'", file=sys.stderr)
        sys.exit(1)

    output_dir = os.path.dirname(os.path.abspath(__file__))

    # Fetch voices to locate Lauren
    req = urllib.request.Request(
        "https://api.elevenlabs.io/v1/voices",
        headers={"xi-api-key": api_key, "Accept": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"Failed to fetch voices from ElevenLabs: {e}", file=sys.stderr)
        sys.exit(1)

    voices = data.get("voices", [])
    lauren_voice = None
    for v in voices:
        if "lauren" in v.get("name", "").lower():
            lauren_voice = v
            break

    if not lauren_voice:
        print("Could not find a voice with name containing 'Lauren'.", file=sys.stderr)
        print("Available voices:", [v.get("name") for v in voices], file=sys.stderr)
        sys.exit(1)

    voice_id = lauren_voice["voice_id"]
    voice_name = lauren_voice["name"]
    print(f"Using voice: '{voice_name}' (ID: {voice_id})")

    total_chars = sum(len(c["text"]) for c in CLIPS)
    print(f"Total characters to generate: {total_chars}")
    print(f"Estimated credits: {total_chars} (Multilingual v2) or {total_chars // 2} (Turbo v2.5)")

    model_id = "eleven_multilingual_v2"
    voice_settings = {
        "stability": 0.50,
        "similarity_boost": 0.75,
        "style": 0.0,
        "use_speaker_boost": True
    }

    for idx, clip in enumerate(CLIPS, 1):
        filename = clip["filename"]
        target_path = os.path.join(output_dir, filename)
        text = clip["text"]
        print(f"\n[{idx}/{len(CLIPS)}] Generating {filename} ({len(text)} chars)...")

        payload = {
            "text": text,
            "model_id": model_id,
            "voice_settings": voice_settings
        }
        post_data = json.dumps(payload).encode("utf-8")

        tts_url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
        req = urllib.request.Request(
            tts_url,
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
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")
            print(f"HTTP error generating {filename}: {e.code} {err_body}", file=sys.stderr)
            sys.exit(1)
        except Exception as e:
            print(f"Error generating {filename}: {e}", file=sys.stderr)
            sys.exit(1)

    print("\nAll 5 audio clips successfully generated and verified!")

if __name__ == "__main__":
    main()
