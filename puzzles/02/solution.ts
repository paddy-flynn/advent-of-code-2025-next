import { Puzzle } from "@/lib/types";

async function solvePart1(input: string): Promise<number> {
  // eslint-disable-next-line fp/no-throw
  throw new Error("Day 02 is not implemented yet!");
}

async function solvePart2(input: string): Promise<number> {
  // eslint-disable-next-line fp/no-throw
  throw new Error("Day 02 is not implemented yet!");
}

const inputPromise = fetch("/puzzles/02/input.txt").then((res) => res.text());

export default {
  day: "02",
  name: "Paddy",
  input: await inputPromise,
  solvePart1,
  solvePart2,
} as Puzzle;
