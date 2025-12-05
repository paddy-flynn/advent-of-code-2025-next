import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

interface Range {
  start: bigint;
  end: bigint;
}

const parseInput = (input: string): { ranges: Range[], ids: bigint[] } => {
  const ranges: Range[] = [];
  const ids: bigint[] = [];
  const inputParts = input.split('\n\n');

  inputParts[0].split('\n').forEach(line => {
    const [start, end] = line.split('-').map(BigInt);
    ranges.push({ start, end });
  });

  inputParts[1].split('\n').forEach(line => {
    ids.push(BigInt(line));
  });

  return { ranges, ids };
}

const isRangeValid = (range: Range, id: bigint): boolean => {
  return (id >= range.start && id <= range.end);
}

async function solvePart1(input: string): Promise<number> {
  const { ranges, ids } = parseInput(input);

  const validRanges: Set<bigint> = new Set();
  ranges.forEach(range => {
    ids.forEach(id => {
      if (isRangeValid(range, id)) {
        validRanges.add(id);
      }
    });
  });

  return validRanges.size;
}


async function solvePart2(input: string): Promise<number> {
  const { ranges } = parseInput(input);

  // Sort ranges by start position and end position
  const sortedRanges = ranges.sort((a, b) => {
    const startComparison = Number(a.start - b.start);
    if (startComparison !== 0) return startComparison;
    return Number(a.end - b.end);
  });

  // Merge overlapping or adjacent ranges
  const mergedRanges: Range[] = [];
  let currentRange = sortedRanges[0];
  
  for (let i = 1; i < sortedRanges.length; i++) {
    const nextRange = sortedRanges[i];
    
    // Check if ranges overlap or are adjacent (end + 1 touches next start)
    const rangesCanMerge = currentRange.end + 1n >= nextRange.start;
    
    if (rangesCanMerge) {
      // Pick which range has the bigger end value
      const maxEnd = currentRange.end > nextRange.end 
        ? currentRange.end 
        : nextRange.end;
      currentRange = { start: currentRange.start, end: maxEnd };
    } else {
      // No overlap, save current and move to next
      mergedRanges.push(currentRange);
      currentRange = nextRange;
    }
  }
  
  mergedRanges.push(currentRange);

  // Count total IDs across all merged ranges
  const totalIds = mergedRanges.reduce((sum, range) => {
    return sum + (range.end - range.start + 1n);
  }, 0n);
  
  return Number(totalIds);
}

export default {
  day: "05",
  name: "Cafeteria",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
