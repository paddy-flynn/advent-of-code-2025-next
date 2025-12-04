import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

const makeJoltage = (num1: number, num2: number): number => {
  return Number(`${num1}${num2}`);
};

const makeJoltageFromArray = (nums: number[]): number => {
  return Number(`${nums.join('')}`);
};

async function solvePart1(input: string): Promise<number> {
  const banks = input.split('\n').map(line => line.split('').map(Number));
  const joltages: number[] = [];
  banks.forEach(bank => {
    let maxNum = Math.max(bank[0], bank[1]);
    let maxJoltage = makeJoltage(bank[0], bank[1]);

    for (let i = 2; i < bank.length; i++) {
      const currentNum = bank[i];
      const tempVoltage = makeJoltage(maxNum, currentNum);
      maxNum = Math.max(maxNum, currentNum);
      maxJoltage = Math.max(maxJoltage, tempVoltage);
      if (maxJoltage === 99) {
        break;
      }
    }
    joltages.push(maxJoltage);
  });

  return _.sum(joltages);
}

function getLargest12DigitNumber(nums: number[]): number[] {
  let digitsToDrop = nums.length - 12; 

  const resultStack: number[] = [];

  for (const currentDigit of nums) {
    
      while (
          digitsToDrop > 0 &&
          !_.isEmpty(resultStack) && 
          _.last(resultStack)! < currentDigit 
      ) {          
          _.pullAt(resultStack, resultStack.length - 1); 
          digitsToDrop--;
      }
      
      resultStack.push(currentDigit);
  }

  if (digitsToDrop > 0) {
      return _.dropRight(resultStack, digitsToDrop)
  }

  return resultStack
}

async function solvePart2(input: string): Promise<number> {
  const banks = input.split('\n').map(line => line.split('').map(Number));
  const joltages: number[] = [];
  banks.forEach(bank => {
    const maxJoltage = getLargest12DigitNumber(bank);
    joltages.push(makeJoltageFromArray(maxJoltage));
  });

  return _.sum(joltages);
}

export default {
  day: "03",
  name: "Lobby",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
