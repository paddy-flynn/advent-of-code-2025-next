import { PuzzleContext } from "@/lib/context";
import { usePuzzleManager } from "@/lib/usePuzzleManager";
import { FC } from "react";
import puzzles from "../puzzles";
import ShowAllButton from "./buttons/ShowAllButton";
import Footer from "./Footer";
import PuzzleCard from "./PuzzleCard";
import ParticleBackground from "./ParticleBackground";

const ViewSinglePuzzle: FC<{ puzzleDay: string; puzzleInput: string }> = ({ puzzleDay, puzzleInput }) => {
  usePuzzleManager();
  const puzzle = { ...puzzles.find((puzzle) => puzzle.day === puzzleDay)!, input: puzzleInput };
  return (
    <div className="relative max-w-4xl pt-6 mx-auto md:pt-12 lg:pt-16">
      <ParticleBackground />
      <div className="px-4 sm:px-6 lg:px-8">
        <PuzzleContext.Provider value={puzzle}>
          <header className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-accent-cyan md:text-2xl">
                Advent of Code 2025 - Day {puzzle.day}
              </h1>
              <p className="max-w-xl mt-2 text-sm leading-6 text-white/90">
                This is{" "}
                <a
                  href={`https://github.com/paddy-flynn/advent-of-code-2025-next/blob/main/puzzles/${puzzle.day}/solution.ts`}
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="a-defaults"
                >
                  my solution
                </a>{" "}
                for the{" "}
                <a
                  href={`https://adventofcode.com/2025/day/${parseInt(
                    puzzle.day
                  )}`}
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="a-defaults"
                >
                  Advent of Code 2025 - Day {puzzle.day}
                </a>{" "}
                puzzle, written in TypeScript, using{" "}
                <a
                  href="https://nextjs.org/"
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="a-defaults"
                >
                  Next.js
                </a>
                ,{" "}
                <a
                  href="https://tailwindui.com/"
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="a-defaults"
                >
                  Tailwind CSS
                </a>{" "}
                and{" "}
                <a
                  href="https://recoiljs.org/"
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="a-defaults"
                >
                  Recoil
                </a>
                .
              </p>
            </div>
          </header>
          <main className="flex flex-col my-8 space-y-8">
            <PuzzleCard hideLink />
            <div className="flex justify-center">
              <ShowAllButton />
            </div>
          </main>
          <Footer />
        </PuzzleContext.Provider>
      </div>
    </div>
  );
};
export default ViewSinglePuzzle;
