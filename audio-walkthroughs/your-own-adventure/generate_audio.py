#!/usr/bin/env python3
"""
Generate audio clips for Lagos Traffic Adventure (19-your-own-adventure) walkthrough using ElevenLabs API.
Uses Alice voice (Xb7hH8MSUJpSbSDYk0k2) compatible with ElevenLabs Free tier.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CLIPS = [
    {
        "filename": "01-state-machine-and-finding-change.mp3",
        "title": "Preset 0: Milestone 1/2 (State Machine & Finding Change)",
        "text": (
            "This text adventure models a state machine using a Python dictionary and a command loop. "
            "The rooms dictionary stores each location's narrative description, available directional exits, and lock conditions. "
            "Starting at Ojota bus stop with an empty inventory, our goal is to reach work on time. "
            "The yellow danfo bus heading north is locked because the conductor demands exact change. "
            "We first command the player east into Mama Put's kiosk. Spotting a two-hundred-naira note, "
            "we execute the take command, appending the change into our inventory list, "
            "before navigating west back to the bus stop."
        )
    },
    {
        "filename": "02-boarding-danfo-and-winning.mp3",
        "title": "Preset 0: Milestone 2/2 (Boarding Danfo & Winning Commute)",
        "text": (
            "Now holding the required change, we command north to board the danfo. "
            "The move function inspects the room's locked mapping, confirms the change is in our inventory, "
            "and unlocks the door. Squeezing in, we advance northward along the corridor until gridlock stalls traffic "
            "on the Third Mainland Bridge. We step out on foot and walk north one last stretch. "
            "Arriving at the office at eight fifty-nine a.m., the boss nods in approval as the engine detects "
            "the winning ending key and breaks the loop, completing our morning commute."
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

    # Direct premade voice Alice: Xb7hH8MSUJpSbSDYk0k2
    voice_id = "Xb7hH8MSUJpSbSDYk0k2"
    model_id = "eleven_turbo_v2_5"
    tts_url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    }

    voice_settings = {
        "stability": 0.5,
        "similarity_boost": 0.75,
        "style": 0.0,
        "use_speaker_boost": True
    }

    for idx, clip in enumerate(CLIPS, 1):
        filename = clip["filename"]
        out_path = os.path.join(output_dir, filename)
        print(f"\n[{idx}/{len(CLIPS)}] Generating {filename} ({len(clip['text'])} chars)...")

        payload = {
            "text": clip["text"],
            "model_id": model_id,
            "voice_settings": voice_settings
        }

        req = urllib.request.Request(
            tts_url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST"
        )

        try:
            with urllib.request.urlopen(req) as resp:
                data = resp.read()
                with open(out_path, "wb") as f:
                    f.write(data)
                print(f"Saved {out_path} ({len(data)} bytes)")
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8")
            print(f"HTTP Error {e.code}: {e.reason}\nBody: {err_body}", file=sys.stderr)
            sys.exit(1)
        except Exception as e:
            print(f"Error generating {filename}: {e}", file=sys.stderr)
            sys.exit(1)

    print("\nAll audio clips generated successfully!")

if __name__ == "__main__":
    main()
