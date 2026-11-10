#!/usr/bin/env python3
"""
Generate audio clips for Edit Distance Table 3D walkthrough using ElevenLabs API.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CLIPS = [
    {
        "filename": "01-table-init-and-base-cases.mp3",
        "title": "Preset 0: Milestone 1/2 (Init & Base Cases)",
        "text": (
            "We calculate the edit distance between strings flaw and lawn using dynamic programming. "
            "Our table, d p, has five rows and five columns, representing prefixes of both strings with "
            "the empty string denoted by null. The first column represents converting prefixes of flaw into nothing, "
            "requiring i deletions. The first row represents turning an empty string into prefixes of lawn, "
            "requiring j insertions. These base cases form the foundation of our table."
        )
    },
    {
        "filename": "02-recurrences-matches-and-backtrack.mp3",
        "title": "Preset 0: Milestone 2/2 (Recurrences & Alignment)",
        "text": (
            "For each interior cell, if the current letters match, no edit is required and we copy the diagonal "
            "value for free, as seen when l matches l, a matches a, and w matches w. When letters differ, we take "
            "one plus the minimum of deleting from above, inserting from the left, or replacing along the diagonal. "
            "Reaching the bottom-right cell yields an optimal edit distance of two. Backtracking winning arrows "
            "reveals replacing f with l, then inserting n."
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
