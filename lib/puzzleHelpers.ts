import { Puzzle, PuzzleData } from "./types";

export function serializePuzzleData(puzzle: Puzzle): PuzzleData {
  return {
    day: puzzle.day,
    name: puzzle.name,
    input: puzzle.input,
  };
}

export function serializePuzzlesData(puzzles: Puzzle[]): PuzzleData[] {
  return puzzles.map(serializePuzzleData);
}
