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

function combinations(inputList: number[]): Set<number>[] {
  if (inputList.length === 0) {
    return [new Set<number>()];
  }

  const firstElement = inputList[0];
  const restOfList = inputList.slice(1);
  const powerSetRest = combinations(restOfList);

  const newSets = powerSetRest.map(existingSet => {
    const newSet = new Set(existingSet);
    newSet.add(firstElement);
    return newSet;
  });

  return powerSetRest.concat(newSets);
}

function setsToArray(sets: Set<number>[]): number[][] {
  return sets.map(set => {
    // Use Array.from() or the spread operator (...) to convert the Set to an Array
    return Array.from(set);
    // OR: return [...set];
  });
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

const calculateXORSum = (numberArray: number[]): number => {
  return numberArray.reduce((carry, next) => {
    return carry ^ next;
  }, 0);
}

async function solvePart1(input: string): Promise<number> {
  const machines = parseInput(input);
  let sum = 0;
  machines.forEach(({ lightDiagrams, buttons }) => {    
    const combos = combinations(buttons)
    const sortedCombos = combos.sort((a, b) => a.size - b.size)    
    const result = sortedCombos.find(combination => {
      const result = calculateXORSum(Array.from(combination))
      return result === lightDiagrams
    })
    
    sum += result?.size ?? 0
  })
  return sum;
}

async function solvePart2(input: string): Promise<number> {
  return 0;
}

export default {
  day: "10",
  name: "Factory",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;