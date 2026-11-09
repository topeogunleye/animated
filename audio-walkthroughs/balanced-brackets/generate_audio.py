#!/usr/bin/env python3
"""
Generate audio clips for Balanced Brackets walkthrough using ElevenLabs API.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CLIPS = [
    {
        "filename": "01-setup-and-first-pair.mp3",
        "title": "Setup and First Bracket Pair",
        "text": (
            "Welcome to Balanced Brackets in 3D. We use a last-in, first-out stack to verify that every opening bracket has an exact matching partner in the correct order. "
            "We begin with our first expression: open paren, a plus b, close paren, times, open bracket, c minus d, close bracket. "
            "On the right, our 3D stack rack is completely empty. We scan the first character, an open parenthesis, and push it straight into the stack rack. "
            "Next, the characters a, plus, and b are standard math symbols, not brackets, so our algorithm ignores them. "
            "When we reach the closing parenthesis at index six, we check the top of our stack. "
            "It holds the matching open parenthesis, so we pop it out. The first sub-expression is perfectly balanced."
        )
    },
    {
        "filename": "02-second-pair-and-completion.mp3",
        "title": "Second Bracket Pair and Completion",
        "text": (
            "Continuing down the string, the multiplication operator and spaces are ignored. At index ten, we meet an open square bracket and push it into the stack rack. "
            "Once again, the letters c and d along with the subtraction sign pass through untouched. "
            "At index sixteen, we encounter the closing square bracket. Checking our stack, the top item is the matching open square bracket. "
            "We pop it out, leaving the stack empty. With all seventeen characters scanned and zero leftover brackets on the stack, the function returns True."
        )
    },
    {
        "filename": "03-bonus-max-depth.mp3",
        "title": "Bonus Max Depth",
        "text": (
            "Now we trace the bonus function, max depth. Because the expression contains two separate pairs that never nest inside one another, "
            "the depth rises to one during each set of brackets and drops back to zero immediately after. "
            "Our depth gauge records a peak nesting level of one without ever calling Python's built-in max function."
        )
    },
    {
        "filename": "nested-01.mp3",
        "title": "All Three Nested Walkthrough",
        "text": (
            "In this example, we test all three bracket types nested deeply inside one another. Watch the stack rack grow on the right. "
            "First, the curly brace drops in at level one. Next, the square bracket stacks on top at level two. Finally, the inner parenthesis stacks at level three. "
            "Now, the closing brackets arrive in mirror order. The closing parenthesis pops the top parenthesis. The closing bracket pops the square bracket. "
            "And the final closing brace pops the curly brace. Every pair matches in textbook last-in, first-out order, and our depth gauge reaches a peak level of three."
        )
    },
    {
        "filename": "mismatch-01.mp3",
        "title": "Order Mismatch Walkthrough",
        "text": (
            "Here is a classic trap: both brackets have pairs, but their nesting order is interleaved. We push the open parenthesis, then push the open square bracket on top of it. "
            "But at index two, a closing parenthesis arrives. We inspect the top of the stack and find an open square bracket instead of a parenthesis. "
            "Because the most recently opened bracket must be the first one closed, this mismatch immediately returns False."
        )
    },
    {
        "filename": "empty-closer-01.mp3",
        "title": "Empty Stack Closer Walkthrough",
        "text": (
            "What happens when a closing bracket appears at the very beginning? At index zero, we see a closing curly brace. "
            "But our stack rack has zero items. You cannot close a bracket that was never opened. "
            "The stack underflow check fails immediately, returning False without scanning another step."
        )
    },
    {
        "filename": "leftover-01.mp3",
        "title": "Leftover Openers Walkthrough",
        "text": (
            "In this case, two opening parentheses are pushed onto the stack, raising the stack height to two. "
            "The string ends, but two unclosed openers remain waiting in the rack. Because the stack is not empty, our final length check evaluates to False."
        )
    }
]

def main():
    api_key = os.environ.get("ELEVENLABS_API_KEY") or os.environ.get("XI_API_KEY")
    if not api_key:
        print("INFO: ELEVENLABS_API_KEY environment variable is not set.", file=sys.stderr)
        print("Please set it using: export ELEVENLABS_API_KEY='your-key-here'", file=sys.stderr)
        return

    output_dir = os.path.dirname(os.path.abspath(__file__))
    lauren_voice_id = "DODLEQrClDo8wCz460ld"

    print(f"Generating {len(CLIPS)} audio clips using ElevenLabs Lauren voice...")
    for clip in CLIPS:
        dest_path = os.path.join(output_dir, clip["filename"])
        if os.path.exists(dest_path):
            print(f"Skipping {clip['filename']} (already exists)")
            continue

        url = f"https://api.elevenlabs.io/v1/text-to-speech/{lauren_voice_id}"
        payload = {
            "text": clip["text"],
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.50,
                "similarity_boost": 0.75,
                "style": 0.0,
                "use_speaker_boost": True
            }
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "xi-api-key": api_key,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg"
            }
        )
        try:
            with urllib.request.urlopen(req) as resp:
                audio_bytes = resp.read()
            with open(dest_path, "wb") as f:
                f.write(audio_bytes)
            print(f"Synthesized: {clip['filename']} ({len(audio_bytes)} bytes)")
        except Exception as e:
            print(f"Failed to generate {clip['filename']}: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
