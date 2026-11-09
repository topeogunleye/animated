#!/usr/bin/env node
// Usage: node validate_trace.js trace.json [--lines N]
// Validates trace structure, frame fields, line ranges, kinds, and line coverage.
'use strict';
const fs = require('fs');

const KINDS = new Set(['start', 'init', 'pick', 'move', 'step', 'enter', 'ret', 'err', 'end']);
const args = process.argv.slice(2);
const file = args[0];
const li = args.indexOf('--lines');
let nLines = li >= 0 ? parseInt(args[li + 1], 10) : null;

if (!file) {
  console.error('Usage: node validate_trace.js trace.json [--lines N]');
  process.exit(2);
}

if (!fs.existsSync(file)) {
  console.error(`File not found: ${file}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`Could not parse JSON from ${file}: ${e.message}`);
  process.exit(1);
}

if (!data.presets || !Object.keys(data.presets).length) {
  console.error('ERROR: trace.json has no presets');
  process.exit(1);
}

if (nLines == null && Number.isInteger(data.lines)) {
  nLines = data.lines;
}

let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log('  ERROR: ' + m); };
const warn = (m) => { warnings++; console.log('  warn:  ' + m); };

const allUsed = new Set();

for (const [name, p] of Object.entries(data.presets)) {
  console.log(`Preset "${name}"`);
  const fr = p.frames || [];
  if (!fr.length) {
    err('No frames found');
    continue;
  }
  if (fr.length > 400) {
    warn(`${fr.length} frames is long; consider capping`);
  }

  const usedInPreset = new Set();
  fr.forEach((f, i) => {
    if (!Array.isArray(f.lines)) {
      err(`frame ${i}: lines must be an array`);
    } else {
      f.lines.forEach((l) => {
        if (!Number.isInteger(l) || l < 0 || (nLines != null && l >= nLines)) {
          err(`frame ${i}: invalid line index ${l} (total source lines: ${nLines || 'unknown'})`);
        } else {
          usedInPreset.add(l);
          allUsed.add(l);
        }
      });
    }

    if (f.wait !== undefined) {
      if (!Array.isArray(f.wait)) {
        err(`frame ${i}: wait must be an array`);
      } else {
        f.wait.forEach((l) => {
          if (!Number.isInteger(l) || l < 0 || (nLines != null && l >= nLines)) {
            err(`frame ${i}: invalid wait line index ${l}`);
          }
        });
      }
    }

    if (typeof f.msg !== 'string' || !f.msg.trim()) {
      err(`frame ${i}: missing msg`);
    } else if (f.msg.length > 140) {
      warn(`frame ${i}: msg longer than 140 chars (${f.msg.length} chars)`);
    }

    if (!KINDS.has(f.kind)) {
      err(`frame ${i}: unrecognized kind "${f.kind}" (must be one of: ${[...KINDS].join(', ')})`);
    }

    if (typeof f.hold !== 'number' || !Number.isFinite(f.hold) || f.hold <= 0) {
      err(`frame ${i}: hold must be a positive number`);
    }

    if (i > 0 && JSON.stringify(f) === JSON.stringify(fr[i - 1])) {
      warn(`frame ${i}: identical snapshot to previous frame`);
    }
  });

  const firstKind = fr[0].kind;
  if (firstKind !== 'start' && firstKind !== 'init') {
    warn(`First frame kind is "${firstKind}", expected "start" or "init"`);
  }

  const lastKind = fr[fr.length - 1].kind;
  if (lastKind !== 'end' && lastKind !== 'err' && lastKind !== 'ret') {
    warn(`Last frame kind is "${lastKind}", expected "end", "err", or "ret"`);
  }

  if (!('result' in p)) {
    warn('No result recorded for preset');
  }
}

if (nLines != null) {
  const missing = [];
  for (let l = 0; l < nLines; l++) {
    if (!allUsed.has(l)) missing.push(l);
  }
  if (missing.length) {
    console.log('Across all presets:');
    warn(`Source lines never highlighted: ${missing.map(l => l + 1).join(', ')} (1-based; normal for function definitions or unreachable error branches, but verify key logic is covered)`);
  }
}

console.log(`\nValidation complete: ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
