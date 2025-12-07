import puzzle from "./solution";

describe("Day 06 - Trash Compactor", () => {
  it.each([[`123 328  51 64 
45 64  387 23 
6 98  215 314
*   +   *   +`, 4277556]])(
    "should solve part 1",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.each([[`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `, 3263827]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
