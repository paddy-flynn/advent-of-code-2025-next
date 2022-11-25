'use client';

import { PuzzleContext } from "@/lib/context";
import { usePuzzleManager } from "@/lib/usePuzzleManager";
import { PuzzleData } from "@/lib/types";
import RunAllButton from "./buttons/RunAllButton";
import Footer from "./Footer";
import PuzzleCard from "./PuzzleCard";
import ParticleBackground from "./ParticleBackground";

const AllPuzzles = ({ puzzles }: { puzzles: PuzzleData[] }) => {
  usePuzzleManager(puzzles);
  return (
    <div className="relative max-w-4xl pt-6 mx-auto md:pt-12 lg:pt-16 overflow-x-hidden">
      <ParticleBackground />
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-accent-gold md:text-2xl">
              Advent of Code 2025
            </h1>
            <p className="max-w-xl mt-2 text-sm leading-6 text-white/90">
              These are{" "}
              <a
                href="https://github.com/paddy-flynn/advent-of-code-2025-next"
                target={"_blank"}
                rel="noopener noreferrer"
                className="a-defaults"
              >
                my solutions
              </a>{" "}
              for the{" "}
              <a
                href="https://adventofcode.com/2025"
                target={"_blank"}
                rel="noopener noreferrer"
                className="a-defaults"
              >
                Advent of Code 2025
              </a>{" "}
              puzzles, written in TypeScript, using Next.js.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <RunAllButton allDays={puzzles.map((x) => x.day)} />
          </div>
        </header>
        <main className="flex flex-col my-8 space-y-8">
          {puzzles.map((puzzle) => (
            <PuzzleContext.Provider value={puzzle} key={`card-${puzzle.day}`}>
              <PuzzleCard />
            </PuzzleContext.Provider>
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default AllPuzzles;
