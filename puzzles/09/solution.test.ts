import puzzle from "./solution";

describe("Day 09 - Movie Theater", () => {
  it.each([[`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`, 50]])(
    "should solve part 1",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.each([[`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`, 24]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
