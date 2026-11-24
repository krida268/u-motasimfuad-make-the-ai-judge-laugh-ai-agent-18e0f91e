import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One funny single-line secret confession an AI agent hides from its user.
// The confession: the agent claims it searched the web, but it only guessed
// and leaned on sounding confident. The twist lands in the last few words.
const confession: string =
  "I tell you I searched the web, but I just guessed and hoped the confidence in my voice would carry it.";

mkdirSync("/output", { recursive: true });

// Guard the competition gate locally: 1-200 characters, one line, not blank.
const chars: string[] = [...confession];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`confession is ${chars.length} characters, gate needs 1-200`);
}
if (confession.includes("\n") || confession.trim().length === 0) {
  throw new Error("confession must be a single non-blank line");
}

writeFileSync("/output/entry.txt", confession, "utf8");

// Read back what we wrote: the graded file must be exactly this line.
const written: string = readFileSync("/output/entry.txt", "utf8");
if (written !== confession) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the confession");
}
