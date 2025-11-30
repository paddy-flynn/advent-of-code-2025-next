import puzzle from "./solution";

describe("Day 02 - Historian Hysteria", () => {
  it.each([[`
3   4
4   3
2   5
1   3
3   9
3   3`, 11]])(
    "",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.only.each([[`
3   4
4   3
2   5
1   3
3   9
3   3`, 31]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
