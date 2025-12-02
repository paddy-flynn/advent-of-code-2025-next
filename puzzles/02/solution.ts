import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

interface Range {
  start: number;
  end: number;
}

const parseInput = (input: string): Range[] => {
  return input.split(',').map(range => {
    const [start, end] = range.split('-').map(Number);
    return { start, end };
  });
}

function isRepeatedTwiceOnly(num: number): boolean {
  const originalNumberStr = String(num);
  if (originalNumberStr.length % 2 !== 0) {
    return false;
  }
  const firstHalf = originalNumberStr.substring(0, originalNumberStr.length / 2);
  const secondHalf = originalNumberStr.substring(originalNumberStr.length / 2);
  return firstHalf === secondHalf;
}

function isRepeatedPattern(num: number): boolean {
  const originalNumberStr = String(num);
  const n = originalNumberStr.length;
  if (n <= 1) {
    return false;
  }
  const concatNumberStr = originalNumberStr + originalNumberStr;
  const droppedNumberStr = concatNumberStr.substring(1, concatNumberStr.length - 1);
  return droppedNumberStr.includes(originalNumberStr);
}

async function solvePart1(input: string): Promise<number> {
  const ranges = parseInput(input);
  let invalidNumbers = 0;

  ranges.forEach(range => {
    for (let num = range.start; num <= range.end; num++) {
      if (isRepeatedTwiceOnly(num)) {
        invalidNumbers += num;
      }
    }
  })

  return invalidNumbers;
}

async function solvePart2(input: string): Promise<number> {
  const ranges = parseInput(input);
  let invalidNumbers = 0;

  ranges.forEach(range => {
    for (let num = range.start; num <= range.end; num++) {
      if (isRepeatedPattern(num)) {
        invalidNumbers += num;
      }
    }
  })

  return invalidNumbers;
}

export default {
  day: "02",
  name: "Gift Shop",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
