import { Puzzle } from "@/lib/types";
import { memoize } from 'lodash';

const hasTachyonBeamHitSplitter = (tachyonBeamsAtPreviousRow: Set<number>, splitter: number): boolean => {
  return tachyonBeamsAtPreviousRow.values().some(beam => beam === splitter);
}

async function solvePart1(input: string): Promise<number> {
  const lines = input.split('\n');
  const start = [...lines[0]].findIndex(line => line.includes('S'));

  const tachyonBeams: Map<number, Set<number>> = new Map();
  tachyonBeams.set(0, new Set([start]));
  let spillterCounter = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = [...lines[i]];
    const splitters = line
      .map((char, index) => (char === '^' ? index : null))
      .filter(index => index !== null);

    if (splitters.length === 0) {
      tachyonBeams.set(i, new Set(tachyonBeams.get(i - 1) || []));
      continue;
    }

    const tachyonBeamsAtPreviousRow = new Set(tachyonBeams.get(i - 1));
    const tachyonBeamsToAdd = new Set<number>();
    const tachyonBeamsToRemove = new Set<number>();

    for (let j = 0; j < splitters.length; j++) {
      const splitter = splitters[j];

      if (hasTachyonBeamHitSplitter(tachyonBeamsAtPreviousRow, splitter)) {
        spillterCounter++;
        const leftBeam = splitter - 1;
        const rightBeam = splitter + 1;
        tachyonBeamsToRemove.add(splitter);
        tachyonBeamsToAdd.add(leftBeam);
        tachyonBeamsToAdd.add(rightBeam);
      }
    }

    const newTachyonBeams = new Set([...tachyonBeams.get(i - 1) || [], ...tachyonBeamsToAdd]);
    tachyonBeamsToRemove.forEach(beam => newTachyonBeams.delete(beam));
    tachyonBeams.set(i, newTachyonBeams);
  }
  return spillterCounter;
}

const countTimelines = (splitters: Set<number>[], rowIndex: number, column: number): number => {
  for (const [index, splitLine] of splitters.slice(rowIndex).entries()) {
    if (splitLine.has(column)) {
      return (
        memoizedCountTimelines(splitters, rowIndex + index + 1, column - 1) +
        memoizedCountTimelines(splitters, rowIndex + index + 1, column + 1)
      );
    }
  }

  return 1;
};

const memoizedCountTimelines = memoize(countTimelines, (splitters, rowIndex, column) => `${rowIndex}:${column}`);

async function solvePart2(input: string): Promise<number> {
  const splitters = input
    .split('\n')
    .filter((line) => line.includes('^'))
    .map((line) => new Set(Array.from(line.matchAll(/\^/g), (m) => m.index)));

  const [firstBeam] = splitters[0];
  return memoizedCountTimelines(splitters, 0, firstBeam);
}

export default {
  day: "07",
  name: "Laboratories",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
