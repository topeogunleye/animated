#!/usr/bin/env python3
"""
Generate audio clips for Tic-Tac-Toe Referee 3D walkthrough using ElevenLabs API.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CLIPS = [
    {
        "filename": "01-x-wins-top-row.mp3",
        "title": "Preset 0: Top Row Immediate Win",
        "text": (
            "Welcome to Tic-Tac-Toe Referee in 3D. To evaluate any board, a referee only needs to inspect "
            "eight lines: three rows, three columns, and two diagonals. In our loop, each pass checks a row "
            "and a column together. On pass one with index zero, we examine row zero. All three squares contain "
            "an X, and none are empty. Three matching symbols in a line means a win, so the referee immediately "
            "returns 'X wins'."
        )
    },
    {
        "filename": "02-o-wins-setup-and-pass-zero.mp3",
        "title": "Preset 1: Milestone 1/3 (Setup & Pass Zero)",
        "text": (
            "Now let us referee a full match where player O takes the victory. The referee begins by checking "
            "row zero and column zero in pass one. Row zero holds O, X, X: the squares are not all identical, "
            "so no win here. Next, column zero holds O, X, and an empty square. It is not three of the same, "
            "so column zero fails as well."
        )
    },
    {
        "filename": "03-o-wins-passes-one-and-two.mp3",
        "title": "Preset 1: Milestone 2/3 (Passes One & Two)",
        "text": (
            "The loop continues into pass two, testing index one. Row one has X, O, and an empty square, "
            "while column one has X, O, and an empty square. Neither line wins. In pass three at index two, "
            "row two starts with an empty square, so it cannot win, and column two has X, empty, and O. "
            "With all three rows and three columns exhausted, no player has won along the grid."
        )
    },
    {
        "filename": "04-o-wins-diagonal-victory.mp3",
        "title": "Preset 1: Milestone 3/3 (Diagonal Victory)",
        "text": (
            "With rows and columns clear, the referee moves to the diagonals. Because every diagonal must "
            "pass through the centre square, we first check that position. It contains an O, so diagonals "
            "are worth testing. Looking down the main diagonal from top left to bottom right, we find three "
            "O's in a row. Player O wins the match!"
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
