import puzzle from "./solution";

describe("Day 01 - Secret Entrance", () => {
  it.each([[
    `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`, 3]])(
    "should solve part 1",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.each([[
    `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`, 6]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
