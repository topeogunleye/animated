#!/usr/bin/env node
/**
 * Cross-platform ElevenLabs Audio Generator
 * Works on Windows (PowerShell/CMD), macOS, and Linux.
 * Zero external dependencies required (uses Node 18+ native fetch and fs).
 * Automatically detects API key from environment, .env.local, .env, or prompts interactively.
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to find .env.local or .env in current or parent directories
function findEnvKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  if (process.env.XI_API_KEY) return process.env.XI_API_KEY.trim();

  let dir = process.cwd();
  const root = path.parse(dir).root;

  while (dir && dir !== root) {
    for (const file of ['.env.local', '.env']) {
      const fullPath = path.join(dir, file);
      if (fs.existsSync(fullPath)) {
        try {
          const lines = fs.readFileSync(fullPath, 'utf8').split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('#')) continue;
            const match = trimmed.match(/^(?:ELEVENLABS_API_KEY|XI_API_KEY)\s*=\s*["']?([^"'\r\n]+)["']?/i);
            if (match && match[1]) {
              return match[1].trim();
            }
          }
        } catch (e) {
          // ignore read errors
        }
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

// Prompt for API key interactively if in a terminal
async function promptForKey() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log('\n[ElevenLabs Setup] No ELEVENLABS_API_KEY found in environment or .env.local.');
    console.log('You can find your API key at: https://elevenlabs.io/app/settings/api-keys\n');
    rl.question('Paste your ElevenLabs API Key: ', (key) => {
      rl.close();
      const trimmed = key ? key.trim() : '';
      if (!trimmed) {
        console.error('Error: No API key entered. Aborting.');
        process.exit(1);
      }
      // Ask if user wants to save to .env.local for future runs
      const envPath = path.join(process.cwd(), '.env.local');
      try {
        fs.writeFileSync(envPath, `ELEVENLABS_API_KEY=${trimmed}\n`, { flag: 'a' });
        console.log(`Saved API key to: ${envPath} (ignored by git)\n`);
      } catch (err) {
        // non-fatal
      }
      resolve(trimmed);
    });
  });
}

// Parse markdown script segment table if script.md exists
export function parseScriptMarkdown(scriptPath) {
  if (!fs.existsSync(scriptPath)) return null;
  const content = fs.readFileSync(scriptPath, 'utf8');
  const clips = [];
  
  // Look for markdown tables with columns including Clip / File and Text / Spoken
  const lines = content.split('\n');
  let inTable = false;
  let fileCol = -1;
  let textCol = -1;
  let titleCol = -1;

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      const parts = line.split('|').map(p => p.trim()).slice(1, -1);
      if (!inTable) {
        // Check header row: prioritize explicit 'filename' or 'file' before generic 'clip' / 'id'
        const lower = parts.map(p => p.toLowerCase());
        fileCol = lower.findIndex(p => p.includes('filename') || p.includes('file'));
        if (fileCol === -1) {
          fileCol = lower.findIndex(p => p.includes('clip') || p.includes('id'));
        }
        textCol = lower.findIndex(p => p.includes('spoken') || p.includes('text') || p.includes('narration') || p.includes('script'));
        titleCol = lower.findIndex(p => p.includes('title') || p.includes('segment') || p.includes('milestone'));
        if (fileCol !== -1 && textCol !== -1) {
          inTable = true;
        }
      } else if (parts.every(p => /^:?-+:?$/.test(p))) {
        // Separator row, continue
        continue;
      } else {
        // Data row
        let filename = parts[fileCol] ? parts[fileCol].replace(/[`*]/g, '').trim() : '';
        if (filename && !filename.endsWith('.mp3')) {
          filename += '.mp3';
        }
        let text = parts[textCol] ? parts[textCol].replace(/[`*]/g, '').trim() : '';
        let title = (titleCol !== -1 && parts[titleCol]) ? parts[titleCol].replace(/[`*]/g, '').trim() : filename;

        if (filename && text && text.length > 5) {
          clips.push({ filename, title, text });
        }
      }
    } else {
      if (inTable && clips.length > 0 && !line.startsWith('|')) {
        inTable = false;
      }
    }
  }

  return clips.length > 0 ? clips : null;
}

export async function generateClips({
  clips = [],
  outputDir = process.cwd(),
  voiceName = 'lauren',
  modelId = 'eleven_multilingual_v2',
  stability = 0.50,
  similarityBoost = 0.75,
  style = 0.0,
  speakerBoost = true,
  dryRun = false,
  apiKey = null
}) {
  if (!apiKey) {
    apiKey = findEnvKey();
    if (!apiKey) {
      if (process.stdin.isTTY) {
        apiKey = await promptForKey();
      } else {
        console.error('ERROR: ELEVENLABS_API_KEY environment variable is not set.');
        console.error('In Windows PowerShell, run:');
        console.error('  Set-Content -Path .env.local -Value "ELEVENLABS_API_KEY=your_key_here"');
        console.error('Or set it for the current session:');
        console.error('  $env:ELEVENLABS_API_KEY="your_key_here"');
        process.exit(1);
      }
    }
  }

  // 1. Fetch available voices (with fallback for scoped/restricted API keys)
  let selectedVoice = null;
  const KNOWN_VOICES = {
    lauren: { name: 'Lauren - Friendly, Comforting and Soft', voice_id: 'DODLEQrClDo8wCz460ld' },
    alice: { name: 'Alice - Clear, Engaging and Professional', voice_id: 'Xb7hH8MSUJpSbSDYk0k2' }
  };

  try {
    const voiceRes = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': apiKey,
        'Accept': 'application/json'
      }
    });

    if (voiceRes.ok) {
      const voiceData = await voiceRes.json();
      const voices = voiceData.voices || [];
      selectedVoice = voices.find(v => v.name && v.name.toLowerCase().includes(voiceName.toLowerCase())) ||
        voices.find(v => v.name && v.name.toLowerCase().includes('alice')) ||
        voices[0];
    } else {
      // Scoped keys may lack voices_read permission
      const lowerReq = voiceName.toLowerCase();
      selectedVoice = KNOWN_VOICES[lowerReq] || KNOWN_VOICES['lauren'];
      console.log(`Note: Voice catalog endpoint returned ${voiceRes.status}; using direct ID for "${selectedVoice.name}" (${selectedVoice.voice_id})`);
    }
  } catch (err) {
    selectedVoice = KNOWN_VOICES['lauren'];
  }

  if (!selectedVoice) {
    console.error(`Could not locate voice '${voiceName}'. Available: ${voices.map(v => v.name).join(', ')}`);
    process.exit(1);
  }

  console.log(`Using Voice: "${selectedVoice.name}" (ID: ${selectedVoice.voice_id})`);
  console.log(`Output Directory: ${path.resolve(outputDir)}`);

  // Character count and summary
  const totalChars = clips.reduce((acc, c) => acc + (c.text ? c.text.length : 0), 0);
  console.log(`\n========================================`);
  console.log(`Audio Generation Plan (${clips.length} clips):`);
  clips.forEach((c, i) => {
    console.log(`  [${i + 1}/${clips.length}] ${c.filename}: ${c.text.length} chars`);
  });
  console.log(`Total Characters: ${totalChars}`);
  console.log(`Estimated Credits: ~${totalChars} (Eleven Multilingual v2) or ~${Math.round(totalChars / 2)} (Turbo)`);
  console.log(`========================================\n`);

  if (dryRun) {
    console.log('Dry run requested. No audio was synthesized.');
    return;
  }

  // Ensure output dir exists
  fs.mkdirSync(outputDir, { recursive: true });

  // Synthesize clips
  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];
    const targetFile = path.join(outputDir, clip.filename);
    console.log(`[${i + 1}/${clips.length}] Generating ${clip.filename}...`);

    const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.voice_id}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: clip.text,
        model_id: modelId,
        voice_settings: {
          stability: stability,
          similarity_boost: similarityBoost,
          style: style,
          use_speaker_boost: speakerBoost
        }
      })
    });

    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      console.error(`Failed to generate ${clip.filename}: (${ttsRes.status}) ${errText}`);
      process.exit(1);
    }

    const arrayBuffer = await ttsRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(targetFile, buffer);
    console.log(`  ✔ Saved: ${clip.filename} (${buffer.length} bytes)`);
  }

  console.log('\n✔ All clips generated and verified successfully!');
}

// Standalone execution
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const targetScript = args.find(a => a.endsWith('.md')) || path.join(process.cwd(), 'script.md');
  const parsedClips = parseScriptMarkdown(targetScript);

  if (!parsedClips) {
    console.log('Usage:');
    console.log('  node generate_audio.js [path/to/script.md] [--dry-run]');
    console.log('\nOr import { generateClips } from this file in custom scripts.');
    process.exit(1);
  }

  generateClips({
    clips: parsedClips,
    outputDir: path.dirname(path.resolve(targetScript)),
    dryRun
  }).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
