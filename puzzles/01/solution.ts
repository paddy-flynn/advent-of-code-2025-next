import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

interface DialTurn {
  direction: string,
  turns: number
}

const parseInput = (input: string): DialTurn[] => {
  return input.split('\n')
    .map((line) => {
      const d = line.substring(0, 1);
      const t = parseInt(line.substring(1));
      return { direction: d, turns: t };
    });
};

function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}

async function solvePart1(input: string): Promise<number> {
  const dialTurns = parseInput(input);
  let pointsAtZeroCount = 0;
  let currentPosition = 50;

  dialTurns.forEach((dialTurn) => {

    switch (dialTurn.direction) {
      case 'L':
        currentPosition -= dialTurn.turns;
        break;
      case 'R':
        currentPosition += dialTurn.turns;
        break;
    }

    currentPosition = mod(currentPosition, 100);
    if (currentPosition === 0) {
      pointsAtZeroCount++;
    }
  })

  return pointsAtZeroCount
}

async function solvePart2(input: string): Promise<number> {
  const dialTurns = parseInput(input);
  let pointsAtZeroCount = 0;
  let currentPosition = 50;

  dialTurns.forEach((dialTurn) => {
    pointsAtZeroCount += Math.trunc(dialTurn.turns / 100);

    switch (dialTurn.direction) {
      case 'L':
        if (currentPosition != 0 && currentPosition - (mod(dialTurn.turns, 100)) < 0) {
          pointsAtZeroCount++;
        }
        currentPosition -= dialTurn.turns;
        break;
      case 'R':
        if (currentPosition + (mod(dialTurn.turns, 100)) > 100) {
          pointsAtZeroCount++;
        }
        currentPosition += dialTurn.turns;
        break;
    }
    currentPosition = mod(currentPosition, 100);

    if (currentPosition === 0) {
      pointsAtZeroCount++;
    }

  })

  return pointsAtZeroCount;
}

export default {
  day: "01",
  name: "Secret Entrance",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
