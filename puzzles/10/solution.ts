import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

interface Machine {
  lightDiagrams: number;
  buttons: number[];
  joltages: number[];
}

function lightsToNumber(input: string): number {
  const match = input.match(/\[(.*?)\]/);

  if (!match || match.length < 2) {
    return 0;
  }

  const binaryString = match[1];

  const reversedString = binaryString.split('').reverse().join('');

  let carry = 0;

  for (const char of reversedString) {
    const nextBit = (char === '#') ? 1 : 0;
    carry = (carry << 1) | nextBit;
  }
  return carry;
}

const parseLightDiagrams = (line: string): number => {
  return lightsToNumber(line.split('(')[0])
}

function buttonsToNumber(numStr: string): number {
  const indices = numStr.split(',');
  let carry = 0;

  for (const next of indices) {
    const index = parseInt(next.trim(), 10);
    if (isNaN(index) || index < 0) {
      continue;
    }
    const powerOfTwo = 1 << index;
    carry = carry | powerOfTwo;
  }

  return carry;
}

const parseButtons = (line: string): number[] => {
  const elements = line.split(' ')
  const buttonSting = elements.slice(1, -1)
  const buttons = buttonSting.map(str => {
    const numbersAsString = str.replaceAll(/[()]/g, '');
    return buttonsToNumber(numbersAsString)
  });
  return buttons
}

const parseJoltages = (line: string): number[] => {
  const elements = line.split(' ')
  const joltages = elements.slice(-1)[0].replaceAll(/[{})]/g, '').split(',').map(Number)
  return joltages
}

const parseInput = (input: string): Machine[] => {
  const lines = input.split('\n')
  const machines: Machine[] = [];
  for (const line of lines) {
    const lightDiagrams = parseLightDiagrams(line);
    const buttons = parseButtons(line);
    const joltages = parseJoltages(line);
    machines.push({ lightDiagrams, buttons, joltages });
  }
  return machines;
}

// Find minimum number of buttons to press to achieve target XOR using BFS
function findMinimumButtonPresses(buttons: number[], target: number): number {
  if (target === 0) return 0;

  // BFS to find shortest path to target
  const queue: { xorValue: number; buttonCount: number; buttonIndices: Set<number> }[] = [];
  const visited = new Map<number, number>(); // xorValue -> minimum buttons to reach it

  queue.push({ xorValue: 0, buttonCount: 0, buttonIndices: new Set() });
  visited.set(0, 0);

  while (queue.length > 0) {
    const { xorValue, buttonCount, buttonIndices } = queue.shift()!;

    // Try adding each button we haven't used yet
    for (let i = 0; i < buttons.length; i++) {
      if (buttonIndices.has(i)) continue; // Already used this button

      const newXor = xorValue ^ buttons[i];
      const newCount = buttonCount + 1;

      // Found the target!
      if (newXor === target) {
        return newCount;
      }

      // Only explore if we haven't seen this XOR value with fewer buttons
      if (!visited.has(newXor) || visited.get(newXor)! > newCount) {
        visited.set(newXor, newCount);
        const newIndices = new Set(buttonIndices);
        newIndices.add(i);
        queue.push({ xorValue: newXor, buttonCount: newCount, buttonIndices: newIndices });
      }
    }
  }

  return 0; // No solution found
}

// Solve restricted linear system for Part 2
function solveRestrictedSystem(
  matrix: number[][],
  target: number[],
  bounds: number[],
  numButtons: number,
  numCounters: number
): number {
  const M = numCounters;
  const N = numButtons;

  // Copy matrix and target for Gaussian elimination
  const A = matrix.map(row => [...row]);
  const b = [...target];

  const pivotCols: number[] = [];
  let pivotRow = 0;
  const colToPivotRow = new Map<number, number>();

  // Gaussian elimination
  for (let col = 0; col < N && pivotRow < M; col++) {
    // Find pivot
    let candidate = pivotRow;
    while (candidate < M && Math.abs(A[candidate][col]) < 1e-9) {
      candidate++;
    }

    if (candidate === M) continue;

    // Swap rows
    [A[pivotRow], A[candidate]] = [A[candidate], A[pivotRow]];
    [b[pivotRow], b[candidate]] = [b[candidate], b[pivotRow]];

    // Scale pivot row
    const pivot = A[pivotRow][col];
    for (let j = col; j < N; j++) {
      A[pivotRow][j] /= pivot;
    }
    b[pivotRow] /= pivot;

    // Eliminate
    for (let i = 0; i < M; i++) {
      if (i !== pivotRow) {
        const factor = A[i][col];
        if (Math.abs(factor) > 1e-9) {
          for (let j = col; j < N; j++) {
            A[i][j] -= factor * A[pivotRow][j];
          }
          b[i] -= factor * b[pivotRow];
        }
      }
    }

    pivotCols.push(col);
    colToPivotRow.set(col, pivotRow);
    pivotRow++;
  }

  // Check for inconsistency
  for (let i = pivotRow; i < M; i++) {
    if (Math.abs(b[i]) > 1e-4) {
      return 0; // No solution
    }
  }

  // Find free variables
  const freeCols: number[] = [];
  const isPivot = new Set(pivotCols);
  for (let j = 0; j < N; j++) {
    if (!isPivot.has(j)) {
      freeCols.push(j);
    }
  }

  let minPresses = Infinity;
  const solution = new Array(N).fill(0);

  // Backtracking search over free variables
  function search(freeIdx: number, cost: number) {
    if (cost >= minPresses) return;

    if (freeIdx === freeCols.length) {
      let totalCost = cost;
      let valid = true;

      // Back-substitute for pivot variables
      for (let i = pivotCols.length - 1; i >= 0; i--) {
        const col = pivotCols[i];
        const row = colToPivotRow.get(col)!;

        let val = b[row];
        for (let j = col + 1; j < N; j++) {
          if (Math.abs(A[row][j]) > 1e-9) {
            val -= A[row][j] * solution[j];
          }
        }

        // Check if integer
        if (Math.abs(val - Math.round(val)) > 1e-4) {
          valid = false;
          break;
        }
        val = Math.round(val);

        // Check bounds
        if (val < 0 || val > bounds[col]) {
          valid = false;
          break;
        }

        solution[col] = val;
        totalCost += val;

        if (totalCost >= minPresses) {
          valid = false;
          break;
        }
      }

      if (valid) {
        minPresses = totalCost;
      }
      return;
    }

    const col = freeCols[freeIdx];
    const bound = bounds[col];

    for (let val = 0; val <= bound; val++) {
      solution[col] = val;
      search(freeIdx + 1, cost + val);
    }
  }

  search(0, 0);
  return minPresses === Infinity ? 0 : minPresses;
}

async function solvePart1(input: string): Promise<number> {
  const machines = parseInput(input);
  let sum = 0;
  machines.forEach(({ lightDiagrams, buttons }) => {
    const minPresses = findMinimumButtonPresses(buttons, lightDiagrams);
    sum += minPresses;
  })
  return sum;
}

async function solvePart2(input: string): Promise<number> {
  const machines = parseInput(input);
  let totalPresses = 0;

  for (const machine of machines) {
    const numCounters = machine.joltages.length;
    const numButtons = machine.buttons.length;

    // Build matrix
    const matrix: number[][] = Array(numCounters).fill(0).map(() => Array(numButtons).fill(0));

    // Compute bounds for each button
    const bounds = new Array(numButtons).fill(Infinity);

    for (let j = 0; j < numButtons; j++) {
      const buttonMask = machine.buttons[j];
      let hasEffect = false;

      for (let i = 0; i < numCounters; i++) {
        if ((buttonMask & (1 << i)) !== 0) {
          matrix[i][j] = 1;
          hasEffect = true;
          if (machine.joltages[i] < bounds[j]) {
            bounds[j] = machine.joltages[i];
          }
        }
      }

      if (!hasEffect) {
        bounds[j] = 0;
      }
    }

    // Set any remaining Infinity bounds to 0
    for (let j = 0; j < numButtons; j++) {
      if (bounds[j] === Infinity) {
        bounds[j] = 0;
      }
    }

    const result = solveRestrictedSystem(matrix, machine.joltages, bounds, numButtons, numCounters);
    totalPresses += result;
  }

  return totalPresses;
}

export default {
  day: "10",
  name: "Factory",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
