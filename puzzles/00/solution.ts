import { Puzzle } from "@/lib/types";

async function solvePart1(input: string): Promise<number> {
  const seconds = Math.floor(Math.random() * 10);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds * 1000);
  });
}

async function solvePart2(input: string): Promise<number> {
  const seconds = Math.floor(Math.random() * 10);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds * 1000);
  });
}

export default {
  day: "00",
  name: "UI Demo Day",
  solvePart1,
  solvePart2,
} as Puzzle;
