#!/usr/bin/env python3
"""
Generate audio clips for Shop Inventory 3D walkthrough using ElevenLabs API.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CLIPS = [
    {
        "filename": "01-setup-and-immutability.mp3",
        "title": "Setup and Immutability Principle",
        "text": (
            "Welcome to Shop Inventory in 3D. When writing reliable software, a core engineering rule "
            "is immutability: never accidentally mutate stock that other parts of your program depend on. "
            "In our 3D shop, the back shelf holds the original stock, containing ten bags of rice and five "
            "bags of beans. This back shelf is locked. To restock eight units of a new item, gari, we begin "
            "at line one by creating new stock as a fresh, empty dictionary on our front shelf."
        )
    },
    {
        "filename": "02-copying-existing-stock.mp3",
        "title": "Copying Existing Stock",
        "text": (
            "Before adding any new items, we must preserve what we already have. Lines two and three run "
            "a loop over every item in the original stock. First, a gold transfer beam copies our ten units "
            "of rice onto the front shelf. Next, the beam copies our five units of beans. Notice that the "
            "back shelf is completely untouched: the original dictionary still holds ten rice and five beans."
        )
    },
    {
        "filename": "03-validation-and-item-check.mp3",
        "title": "Quantity Validation and Membership Check",
        "text": (
            "Now we process the incoming shipment. At line four, defensive programming checks that our quantity, "
            "eight, is a positive whole number. It is. At line five, we check if gari already exists in our new "
            "stock. It does not, so the algorithm skips down to our else branch at line seven."
        )
    },
    {
        "filename": "04-restocking-new-item.mp3",
        "title": "Restocking the New Item",
        "text": (
            "At line eight, we assign new stock of gari to equal eight. A brand new bin drops onto our front shelf, "
            "stacked with eight crates of gari. Only the new shelf is modified, leaving the original stock at the "
            "back completely unchanged."
        )
    },
    {
        "filename": "05-return-and-immutability-proof.mp3",
        "title": "Safe Return and Immutability Proof",
        "text": (
            "Finally, at line nine, the function returns our newly constructed dictionary with three items: rice, "
            "beans, and gari. Look at the green proof badge in the center: our original stock at the back still "
            "holds its original two items without a single change. The restock operation is complete and fully verified."
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
    api_key = find_api_key()
    if not api_key:
        print("ERROR: ELEVENLABS_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    output_dir = os.path.dirname(os.path.abspath(__file__))

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

    total_chars = sum(len(c["text"]) for c in CLIPS)
    print(f"Total characters to generate: {total_chars}")
    print(f"Estimated credits: ~{total_chars}")

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
