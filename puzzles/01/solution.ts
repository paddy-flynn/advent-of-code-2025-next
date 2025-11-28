import { Puzzle } from "@/lib/types";

const parsePerElfCalories = (input: string): number[] => {
  const elfGroups = input.split(/\n\s*\n/);
  return elfGroups.map((group) => {
    const answers = group.split(/\n/).map((line) => parseInt(line, 10));
    return answers.reduce((acc, answer) => acc + answer, 0);
  });
};

async function solvePart1(input: string): Promise<number> {
  return Math.max(...parsePerElfCalories(input));
}

async function solvePart2(input: string): Promise<number> {
  return parsePerElfCalories(input)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, answer) => acc + answer, 0);
}

const inputPromise = fetch("/puzzles/01/input.txt").then((res) => res.text());

export default {
  day: "01",
  name: "Calorie Counting",
  input: await inputPromise,
  solvePart1,
  solvePart2,
} as Puzzle;
