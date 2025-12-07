import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

const parseInput = (input: string): MathProblem[] => {
  const mathProblems: MathProblem[] = [];
  const lines = input.split('\n');
  lines.forEach((line, lineIndex) => {
    line.split(/\s+/).forEach((item, index) => {
      const itemTrimmed = item.trim();
      if (lineIndex === 0) {
        const mathProblem = new MathProblem();
        mathProblem.addNumber(Number(itemTrimmed));
        mathProblems.push(mathProblem);
        return;
      }
      const mathProblem = mathProblems[index];
      if (itemTrimmed === '*' || itemTrimmed === '+') {
        mathProblem.addOperator(itemTrimmed);
      } else {
        mathProblem.addNumber(Number(itemTrimmed));
      }
      mathProblems[index] = mathProblem;
    })
  });
  return mathProblems;
}

class MathProblem {
  private numbers: number[] = [];
  private operator: string | null = null;

  constructor() {
  }

  addNumber(number: number) {
    this.numbers.push(number);
  }

  addOperator(operator: string) {
    this.operator = operator;
  }

  solve(): number {
    let result = this.numbers[0];

    for (let i = 1; i < this.numbers.length; i++) {
      const number = this.numbers[i];
      switch (this.operator) {
        case '*':
          result = result * number;
          break;
        case '+':
          result += number;
          break;
      }
    };
    return result;
  }
}
async function solvePart1(input: string): Promise<number> {
  const mathProblems = parseInput(input);
  return _.sum(mathProblems.map(problem => problem.solve()));
}

const parseInputToGrid = (input: string): string[][] => {
  const grid: string[][] = [];
  const lines = input.split('\n');
  lines.forEach((line, lineIndex) => {
    grid[lineIndex] = [];
    line.split('').forEach((item, index) => {
      grid[lineIndex][index] = item;
    })
  });
  return grid;
}

function isSeparatorColumn(grid: string[][], colIndex: number): boolean {
  for (const row of grid) {
    if (row[colIndex] !== ' ') {
      return false;
    }
  }
  return true;
}

function findSeparatorIndices(grid: string[][]): number[] {
  const numCols = grid[0].length;
  const separatorIndices = [];

  for (let j = 0; j < numCols; j++) {
    if (isSeparatorColumn(grid, j)) {
      separatorIndices.push(j);
    }
  }
  return separatorIndices;
}

function splitGrid(grid: string[][]): string[][][] {
  if (grid.length === 0 || grid[0].length === 0) return [];
  const separatorIndices = findSeparatorIndices(grid);
  const numCols = grid[0].length;
  const subGrids = [];
  let currentStartIndex = 0;
  for (let j = 0; j <= numCols; j++) {
    if (separatorIndices.includes(j) || j === numCols) {
      const currentEndIndex = j;
      if (currentEndIndex > currentStartIndex) {
        const subGrid = grid.map(row => row.slice(currentStartIndex, currentEndIndex));
        subGrids.push(subGrid);
      }
      currentStartIndex = j + 1;
    }
  }

  return subGrids;
}

const convertSubGridsToMathProblems = (subGrids: string[][][]): MathProblem[] => {
  const mathProblems: MathProblem[] = [];

  const I = subGrids.length; // 1000
  const J = subGrids[0].length;// 5

  for (let i = 0; i < I; i++) { // SLOWEST (subGrids[**i**][j][k])
    const mathProblem = new MathProblem();
    const K = subGrids[i][0].length;
    for (let k = 0; k < K; k++) { // MIDDLE (subGrids[i][j][**k**])
      let number = '';

      for (let j = 0; j < J; j++) { // FASTEST (subGrids[i][**j**][k])
        const char = subGrids[i][j][k] || '';
        if (char === '*' || char === '+') {
          mathProblem.addOperator(char);
          continue;
        }
        number += char;
      }
      const numberAsNumber = Number(number);
      if (numberAsNumber > 0) {
        mathProblem.addNumber(numberAsNumber);
      }
    }
    const operator = subGrids[i][subGrids[i].length - 1][0];
    mathProblem.addOperator(operator);
    mathProblems.push(mathProblem);
  }
  return mathProblems;
}

async function solvePart2(input: string): Promise<number> {
  const grid = parseInputToGrid(input);
  const subGrids = splitGrid(grid);
  const mathProblems = convertSubGridsToMathProblems(subGrids);

  return _.sum(mathProblems.map(problem => problem.solve()));
}

export default {
  day: "06",
  name: "Trash Compactor",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
