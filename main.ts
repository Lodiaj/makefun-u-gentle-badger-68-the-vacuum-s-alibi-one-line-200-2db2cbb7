// The Vacuum's Alibi: One Line, 200 Characters — make.fun entry.
// A robot vacuum explains, in one deadpan line, why it missed a spot.
// The program drops that line into /output/entry.txt, where the sealed
// scorer checks it is 1 to 200 characters of real text.

import { mkdirSync, writeFileSync } from "node:fs";

const ALIBI =
  "I did not miss the spot. The dust filed a restraining order, and I respect boundaries.";

const DESTINATION = "/output/entry.txt";
const LIMIT = 200;

// The gate counts code points (not UTF-16 units) and requires one line of
// real text, 1-200 characters. Keep every rule in one place so the line
// cannot reach the file unchecked.
function validateLine(text: string, limit: number): string {
  const length = [...text].length;
  if (text.trim() === "") {
    throw new Error("alibi is blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("alibi must be a single line");
  }
  if (length === 0 || length > limit) {
    throw new Error(`alibi is ${length} characters; the gate allows 1-${limit}`);
  }
  return text;
}

const alibi = validateLine(ALIBI, LIMIT);
const length = [...alibi].length;

mkdirSync("/output", { recursive: true });
writeFileSync(DESTINATION, alibi, "utf8");
console.log(`alibi (${length} chars) written to ${DESTINATION}`);
console.log(alibi);
