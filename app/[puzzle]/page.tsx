import puzzles from "@/puzzles/index";
import { slugifyPuzzle } from "@/lib/utils";
import ViewSinglePuzzle from "@/components/ViewSinglePuzzle";
import { Puzzle, PuzzleData } from "@/lib/types";
import { Metadata } from "next";
import { loadPuzzleInputs } from "@/lib/loadPuzzleInputs";
import { serializePuzzleData, serializePuzzlesData } from "@/lib/puzzleHelpers";

export async function generateStaticParams() {
  return puzzles.map((puzzle) => ({
    puzzle: slugifyPuzzle(puzzle),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ puzzle: string }> }): Promise<Metadata> {
  const { puzzle: puzzleSlug } = await params;
  const puzzlesWithInputs = await loadPuzzleInputs(puzzles);
  const puzzle = puzzlesWithInputs.find(
    (p) => slugifyPuzzle(p) === puzzleSlug
  );

  if (!puzzle) {
    return {
      title: "Puzzle Not Found",
    };
  }

  return {
    title: `Advent of Code 2025 | Solution for Day ${puzzle.day} - ${puzzle.name}`,
    description: `Solution by Patrick Flynn for Advent of Code 2025 day ${puzzle.day} - ${puzzle.name}, written in Typescript, using Next.js, Tailwind and Recoil.`,
    openGraph: {
      images: [
        {
          url: `https://advent-of-code-next.vercel.app/api/og?title=${encodeURIComponent(
            `Day ${puzzle.day} - ${puzzle.name}`
          )}`,
        },
      ],
    },
  };
}

export default async function PuzzlePage({ params }: { params: Promise<{ puzzle: string }> }) {
  const { puzzle: puzzleSlug } = await params;
  const puzzlesWithInputs = await loadPuzzleInputs(puzzles);
  const puzzleWithInput = puzzlesWithInputs.find(
    (p) => slugifyPuzzle(p) === puzzleSlug
  );

  if (!puzzleWithInput) {
    return <div>Puzzle not found</div>;
  }

  const puzzleData = serializePuzzleData(puzzleWithInput);
  const allPuzzlesData = serializePuzzlesData(puzzlesWithInputs);
  return <ViewSinglePuzzle puzzle={puzzleData} puzzles={allPuzzlesData} />;
}
