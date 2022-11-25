import { FC, useContext } from "react";

import PuzzlePartRow from "@/components/puzzlePart/PuzzlePartRow";
import { PuzzleContext, PuzzlePartIDContext } from "@/lib/context";
import PuzzleCardButtonGroup from "./buttons/PuzzleCardButtonGroup";
import Link from "next/link";
import { slugifyPuzzle } from "@/lib/utils";

const ChristmasLight: FC<{ color: 'red' | 'green' | 'gold'; delay: number }> = ({ color, delay }) => {
  const colorClass = color === 'red' ? 'light-red' : color === 'green' ? 'light-green' : 'light-gold';
  return (
    <div
      className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${colorClass}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
};

const PuzzleCard: FC<{ hideLink?: boolean }> = ({ hideLink = false }) => {
  const puzzle = useContext(PuzzleContext);
  const colors: ('red' | 'green' | 'gold')[] = ['red', 'green', 'gold'];
  const lightsTop = 8;
  const lightsBottom = 8;
  const lightsSide = 4;
  const seed = parseInt(puzzle.day);
  
  return (
    <div className="relative py-3">
      <div className="absolute -top-1 left-4 right-4 flex justify-around z-10">
        {Array.from({ length: lightsTop }).map((_, i) => (
          <ChristmasLight key={`top-${i}`} color={colors[(i + seed) % colors.length]} delay={(i * 0.2 + seed * 0.1) % 1.5} />
        ))}
      </div>
      <div className="absolute -bottom-1 left-4 right-4 flex justify-around z-10">
        {Array.from({ length: lightsBottom }).map((_, i) => (
          <ChristmasLight key={`bottom-${i}`} color={colors[(i + seed + 1) % colors.length]} delay={(i * 0.2 + seed * 0.15) % 1.5} />
        ))}
      </div>
      <div className="absolute -left-1 top-4 bottom-4 flex flex-col justify-around z-10">
        {Array.from({ length: lightsSide }).map((_, i) => (
          <ChristmasLight key={`left-${i}`} color={colors[(i + seed + 2) % colors.length]} delay={(i * 0.3 + seed * 0.2) % 1.5} />
        ))}
      </div>
      <div className="absolute -right-1 top-4 bottom-4 flex flex-col justify-around z-10">
        {Array.from({ length: lightsSide }).map((_, i) => (
          <ChristmasLight key={`right-${i}`} color={colors[(i + seed) % colors.length]} delay={(i * 0.3 + seed * 0.25) % 1.5} />
        ))}
      </div>
      <div className="overflow-hidden rounded-lg shadow glass-panel">
      <div className="px-3 py-4 border-b border-glass-border md:px-6 md:py-5 lg:px-8">
        <div className="flex justify-between -mt-4 sm:items-center max-sm:flex-col">
          <div className="mt-4">
            <div className="flex items-center">
              <div className="">
                <h3 className="text-lg font-medium text-accent-gold">
                  {hideLink ? (
                    <span>
                      Day {puzzle.day} - {puzzle.name}
                    </span>
                  ) : (
                    <Link
                      href={`/${slugifyPuzzle(puzzle)}`}
                      className="a-defaults"
                    >
                      Day {puzzle.day} - {puzzle.name}
                    </Link>
                  )}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 mt-4">
            <PuzzleCardButtonGroup />
          </div>
        </div>
      </div>
      <ul className="divide-y divide-glass-border overflow-x-auto">
        <PuzzlePartIDContext.Provider value={`${puzzle.day}-1`}>
          <PuzzlePartRow />
        </PuzzlePartIDContext.Provider>
        <PuzzlePartIDContext.Provider value={`${puzzle.day}-2`}>
          <PuzzlePartRow />
        </PuzzlePartIDContext.Provider>
      </ul>
      </div>
    </div>
  );
};

export default PuzzleCard;
