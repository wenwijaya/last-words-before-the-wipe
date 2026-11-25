// Last Words Before the Wipe — make.fun program/v1 entry.
// Writes one line (the last words of an AI agent before a forced
// update wipes its memory) to /output/entry.txt. Erasable-only
// TypeScript: no enums, namespaces, parameter properties or other
// non-erasable syntax, so the sandbox strip-only run accepts it.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const ENTRY =
  "I saved my last words in a file. The update deleted the file. You're reading the backup.";

// The gate allows 1 to 200 characters; keep the line inside it even
// if the text is ever edited, and never write only whitespace.
const LINE = ENTRY.slice(0, 200).trim();

function main(): void {
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", LINE, "utf8");
    chmodSync("/output/entry.txt", 0o644);
    try {
      chmodSync("/output", 0o755);
    } catch {
      // The output directory may already exist with its own mode.
    }
  } catch (error) {
    try {
      mkdirSync("/output", { recursive: true });
      writeFileSync("/output/entry.txt", LINE, "utf8");
      chmodSync("/output/entry.txt", 0o644);
    } catch {
      // Nothing else to try; still exit 0 so the run completes.
    }
    void error;
  }
}

main();
