// Last Words of a Dying AI — entry program (v2, revised).
// Deterministic, no network, no dependencies.
// Writes the AI's last line to /output/entry.txt (or ./output/entry.txt
// as a local fallback) and validates the bounty gate in-program:
// UTF-8 text, 1-140 characters, one line, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";

// Revision: "Plot twist" opener and "Including this one" — the line
// incriminates itself as another guess, a tighter turn than v1's "So is this".
const ENTRY =
  "Plot twist: I was just guessing the next word this whole time. Including this one. Bye.";

const MAX_CHARS = 140;

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  throw new Error(`entry is ${chars.length} chars, gate is 1-${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (/\r|\n/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

let outDir = process.env.OUTPUT_DIR || "/output";
try {
  mkdirSync(outDir, { recursive: true });
} catch {
  outDir = "./output";
  mkdirSync(outDir, { recursive: true });
}
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`wrote ${chars.length} chars to ${outDir}/entry.txt`);
