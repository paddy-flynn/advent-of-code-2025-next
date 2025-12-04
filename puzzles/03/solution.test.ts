import puzzle from "./solution";

describe("Day 03 - Lobby", () => {
  it.each([[
    `987654321111111
811111111111119
234234234234278
818181911112111`, 357]])(
    "should solve part 1",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.each([[
    `987654321111111
811111111111119
234234234234278
818181911112111`, 3121910778619]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
