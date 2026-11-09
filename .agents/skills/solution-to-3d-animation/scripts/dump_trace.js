#!/usr/bin/env node
// Usage: node dump_trace.js page.html [trace.json]
// Extracts SOURCE, PRESETS, and SIMULATE blocks from the generated HTML,
// executes simulate(...preset.args) for each preset in an isolated VM context,
// checks snapshot independence on live objects, and writes trace.json.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const [file, out = 'trace.json'] = process.argv.slice(2);
if (!file) {
  console.error('Usage: node dump_trace.js page.html [trace.json]');
  process.exit(2);
}

if (!fs.existsSync(file)) {
  console.error(`File not found: ${file}`);
  process.exit(1);
}

const html = fs.readFileSync(file, 'utf8');
const grab = (name) => {
  const m = html.match(new RegExp('/\\* ' + name + ':BEGIN \\*/([\\s\\S]*?)/\\* ' + name + ':END \\*/'));
  if (!m) {
    console.error(`Missing block: ${name} (keep the /* ${name}:BEGIN */ ... /* ${name}:END */ markers intact)`);
    process.exit(1);
  }
  return m[1];
};

const code = grab('SOURCE') + '\n' + grab('PRESETS') + '\n' + grab('SIMULATE') +
  '\n;({SRC, PRESETS, simulate, FIXED: typeof FIXED !== "undefined" ? FIXED : []})';

let api;
try {
  api = vm.runInNewContext(code, {
    console,
    Math,
    JSON,
    Array,
    Object,
    Set,
    Map,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    structuredClone: typeof structuredClone !== 'undefined' ? structuredClone : (o) => JSON.parse(JSON.stringify(o))
  }, { timeout: 10000 });
} catch (e) {
  console.error('Could not evaluate code blocks: ' + e.message);
  process.exit(1);
}

if (!Array.isArray(api.SRC)) {
  console.error('SRC must be an array of code strings');
  process.exit(1);
}
if (!Array.isArray(api.PRESETS)) {
  console.error('PRESETS must be an array of preset objects');
  process.exit(1);
}
if (typeof api.simulate !== 'function') {
  console.error('simulate must be a pure function returning {frames, result}');
  process.exit(1);
}

// Live snapshot independence check across frames
function checkSnapshotIndependence(frames) {
  const seen = new Map();
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const stack = [{ val: frame, path: `frame[${i}]` }];
    while (stack.length) {
      const { val, path } = stack.pop();
      if (val && typeof val === 'object') {
        if (seen.has(val)) {
          const prev = seen.get(val);
          if (prev.frame !== i) {
            return `${path} shares object reference with ${prev.path} (frame ${prev.frame}). Each frame must be an independent deep copy!`;
          }
        } else {
          seen.set(val, { frame: i, path });
        }
        for (const k of Object.keys(val)) {
          stack.push({ val: val[k], path: `${path}.${k}` });
        }
      }
    }
  }
  return null;
}

const trace = { lines: api.SRC.length, fixed: api.FIXED || [], presets: {} };
let failed = false;

for (const p of api.PRESETS) {
  if (!p || typeof p.name !== 'string') {
    failed = true;
    console.error('Each preset must have a name string');
    continue;
  }
  const args = Array.isArray(p.args) ? p.args : (p.args !== undefined ? [p.args] : []);
  try {
    const r = api.simulate(...args);
    if (!r || !Array.isArray(r.frames)) {
      failed = true;
      console.error(`Preset "${p.name}": simulate() did not return an object with a frames array`);
      continue;
    }
    const sharedErr = checkSnapshotIndependence(r.frames);
    if (sharedErr) {
      failed = true;
      console.error(`Preset "${p.name}": snapshot independence failed: ${sharedErr}`);
    }
    trace.presets[p.name] = { frames: r.frames, result: r.result };
    console.log(`✓ ${p.name}: ${r.frames.length} frames, result: ${JSON.stringify(r.result)}`);
  } catch (e) {
    failed = true;
    console.error(`Preset "${p.name}": simulate threw: ${e.message}`);
  }
}

try {
  fs.writeFileSync(out, JSON.stringify(trace, null, 2));
  console.log(`Wrote trace to ${out}`);
} catch (e) {
  console.error(`Failed to write trace file ${out}: ${e.message}`);
  process.exit(1);
}

process.exit(failed ? 1 : 0);
