#!/usr/bin/env python3
"""
Generate audio clips for Shortest Route (BFS) 3D walkthrough using ElevenLabs API.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CLIPS = [
    {
        "filename": "01-bfs-queue-and-discovery.mp3",
        "title": "Preset 0: Milestone 1/2 (Queue & Discovery)",
        "text": (
            "Breadth-first search finds the shortest route in an unweighted graph by exploring level by level. "
            "We start at node A, recording its parent as None and placing it in our queue. Rather than calling "
            "a slow pop zero which shifts every element, we maintain a head pointer that steps forward in constant time. "
            "A expands to neighbours B and C at distance one. Next, B expands to D at distance two. When C inspects D, "
            "D is already visited, avoiding cycles and preserving the shortest route."
        )
    },
    {
        "filename": "02-reaching-goal-and-backtracking.mp3",
        "title": "Preset 0: Milestone 2/2 (Reaching Goal & Backtracking)",
        "text": (
            "Now node D expands and discovers our goal, F, at distance three, appending it to the queue. "
            "After inspecting E, the head pointer reaches F. Because breadth-first search visits every closer node first, "
            "the moment we pop the goal, we are guaranteed to have found the fewest possible arrows. We reconstruct the path "
            "by following parent pointers backward from F to D, D to B, and B to A. Reversing this list yields the optimal "
            "route: A, B, D, F."
        )
    },
    {
        "filename": "03-shorter-route-wins.mp3",
        "title": "Preset 1: Milestone 1/1 (Shorter Route Wins)",
        "text": (
            "In this two-route graph, node S branches into A and B. Path S, B, G requires only two arrows, "
            "while S, A, C, G takes three. Watch how breadth-first search processes both distance one nodes first. "
            "When B expands, it discovers goal G at distance two and places it in the queue before C can ever look at G. "
            "The search reaches G on the shorter route first, proving why level-by-level exploration always guarantees the "
            "shortest path."
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
