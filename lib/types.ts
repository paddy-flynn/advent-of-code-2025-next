export type PuzzleInput = string;
export type PuzzleResult = number | string;

export type SolvePuzzleFn = (_: PuzzleInput) => Promise<PuzzleResult>;

export interface PuzzleData {
  day: string;
  name: string;
  input?: string;
}

export interface Puzzle extends PuzzleData {
  solvePart1: SolvePuzzleFn;
  solvePart2: SolvePuzzleFn;
}

export type PuzzlePartStatus =
  | "idle"
  | "queued"
  | "running"
  | "error"
  | "success";
