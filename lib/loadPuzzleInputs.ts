import fs from "fs";
import path from "path";
import { Puzzle } from "./types";

export function loadPuzzleInputs(puzzles: Puzzle[]): Puzzle[] {
  return puzzles.map((puzzle) => ({
    ...puzzle,
    input: fs.readFileSync(
      path.join(process.cwd(), `puzzles/${puzzle.day}/input.txt`),
      "utf8"
    ),
  }));
}
