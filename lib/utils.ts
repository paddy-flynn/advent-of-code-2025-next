import slugify from "@sindresorhus/slugify";
import { PuzzleData } from "@/lib/types";

export const slugifyPuzzle = (puzzle: PuzzleData) => {
  return slugify(`Day ${puzzle.day} - ${puzzle.name}`);
};
