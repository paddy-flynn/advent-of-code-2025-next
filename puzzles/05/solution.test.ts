import puzzle from "./solution";

describe("Day 05 - Cafeteria", () => {
  it.each([[`3-5
10-14
16-20
12-18

1
5
8
11
17
32`, 3]])(
    "should solve part 1",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.each([[`3-5
10-14
16-20
12-18

1
5
8
11
17
32`, 14]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
