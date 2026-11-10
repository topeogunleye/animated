#!/usr/bin/env python3
"""
Cross-platform ElevenLabs Audio Generator in Python 3.
Zero third-party dependencies (uses built-in urllib, json, os, sys).
Automatically searches for ELEVENLABS_API_KEY in environment or .env.local / .env.
"""

import os
import sys
import json
import urllib.request
import urllib.error

def find_api_key():
    key = os.environ.get("ELEVENLABS_API_KEY") or os.environ.get("XI_API_KEY")
    if key and key.strip():
        return key.strip()

    # Search current directory and parents for .env.local or .env
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
        if sys.stdin.isatty():
            print("\n[ElevenLabs Setup] No ELEVENLABS_API_KEY found in environment or .env.local.")
            print("Get your API key at: https://elevenlabs.io/app/settings/api-keys\n")
            try:
                entered = input("Paste your ElevenLabs API Key: ").strip()
                if entered:
                    api_key = entered
                    env_path = os.path.join(os.getcwd(), ".env.local")
                    with open(env_path, "a", encoding="utf-8") as f:
                        f.write(f"\nELEVENLABS_API_KEY={api_key}\n")
                    print(f"Saved key to {env_path}\n")
                else:
                    sys.exit("No key provided. Aborted.")
            except (KeyboardInterrupt, EOFError):
                sys.exit(1)
        else:
            print("ERROR: ELEVENLABS_API_KEY is not set.", file=sys.stderr)
            print("On Windows (PowerShell), run:", file=sys.stderr)
            print('  Set-Content -Path .env.local -Value "ELEVENLABS_API_KEY=your_key_here"', file=sys.stderr)
            print("Or for the current session:", file=sys.stderr)
            print('  $env:ELEVENLABS_API_KEY="your_key_here"', file=sys.stderr)
            sys.exit(1)

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

    if not voice:
        sys.exit("No voices found in ElevenLabs account.")

    print(f"Using voice: '{voice.get('name')}' (ID: {voice.get('voice_id')})")

if __name__ == "__main__":
    main()
