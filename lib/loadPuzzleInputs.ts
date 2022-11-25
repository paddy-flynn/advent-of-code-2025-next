import { promises as fs } from 'fs';
import path from 'path';
import { Puzzle } from "@/lib/types";

async function loadPuzzleInput(puzzleDay: string) {
  const filePath = path.join(process.cwd(), `puzzles/${puzzleDay}/input.txt`);
  const text = await fs.readFile(filePath, 'utf8');
  return text;
}

export async function loadPuzzleInputs(puzzles: Puzzle[]): Promise<Puzzle[]> {
  const puzzlesWithInputs = await Promise.all(
    puzzles.map(async (puzzle) => ({
      ...puzzle,
      input: await loadPuzzleInput(puzzle.day)
    }))
  );
  return puzzlesWithInputs;
}
