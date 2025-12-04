import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

const makeGrid = (input: string): string[][] => {
  return input.split('\n')
    .map(line => line.split(''));
};

const rollOfPaper = '@'

const directions = [
  { direction: 'up-left', row: -1, col: -1 },
  { direction: 'up', row: -1, col: 0 },
  { direction: 'up-right', row: -1, col: 1 },
  { direction: 'right', row: 0, col: 1 },
  { direction: 'down-right', row: 1, col: 1 },
  { direction: 'down', row: 1, col: 0 },
  { direction: 'down-left', row: 1, col: -1 },
  { direction: 'left', row: 0, col: -1 }
]

const getAmountOfRollsOfPaper = (grid: string[][], x: number, y: number, xMax: number, yMax: number, rollsRemoved: Set<string>): number => {
  let amountOfRollsOfPaper = 0;
  directions.forEach((direction) => {
    const newX = x + direction.col;
    const newY = y + direction.row;
    if (newX < 0 || newX >= xMax || newY < 0 || newY >= yMax) {
      amountOfRollsOfPaper += 0;
      return;
    }
    if (rollsRemoved.has(`${newX}-${newY}`)) {
      amountOfRollsOfPaper += 0;
      return;
    }

    const cell = grid[newY][newX];
    if (cell === rollOfPaper) {
      amountOfRollsOfPaper++;
    }

  });

  return amountOfRollsOfPaper;
}

async function solvePart1(input: string): Promise<number> {
  const grid = makeGrid(input);
  const visited = new Set<string>();
  let validRollsOfPaper = 0;
  const xMax = grid[0].length;
  const yMax = grid.length;

  grid.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === rollOfPaper) {
        const amountOfRollsOfPaper = getAmountOfRollsOfPaper(grid, x, y, xMax, yMax, visited);
        if (amountOfRollsOfPaper < 4) {
          validRollsOfPaper++;
        }
      }
    });
  });
  return validRollsOfPaper;
}

async function solvePart2(input: string): Promise<number> {
  const grid = makeGrid(input);
  const rollsRemoved = new Set<string>();  
  const xMax = grid[0].length;
  const yMax = grid.length;  
  let previousRollsRemovedSize = 0;
  while (true) {       
    grid.forEach((line, y) => {
      line.forEach((cell, x) => {
        if (cell === rollOfPaper) {
          const amountOfRollsOfPaper = getAmountOfRollsOfPaper(grid, x, y, xMax, yMax, rollsRemoved);
          if (amountOfRollsOfPaper < 4) {            
            rollsRemoved.add(`${x}-${y}`);            
          }
        }
      });
    });
    if (previousRollsRemovedSize === rollsRemoved.size) {
      break;
    }
    previousRollsRemovedSize = rollsRemoved.size;
  }
  return rollsRemoved.size;
}

export default {
  day: "04",
  name: "Printing Department",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
