import ViewAllPuzzles from "@/components/ViewAllPuzzles";
import { Metadata } from "next";
import puzzles from "@/puzzles/index";
import { loadPuzzleInputs } from "@/lib/loadPuzzleInputs";
import { serializePuzzlesData } from "@/lib/puzzleHelpers";

export const metadata: Metadata = {
  title: "Advent of Code 2025| Solutions",
  description: "Solutions by Patrick Flynn for Advent of Code 2025, written in Typescript, using Next.js, Tailwind and Recoil.",
  openGraph: {
    images: [
      {
        url: "https://advent-of-code-next.vercel.app/api/og",
      },
    ],
  },
};

export default async function Home() {
  const puzzlesWithInputs = await loadPuzzleInputs(puzzles);
  const puzzleData = serializePuzzlesData(puzzlesWithInputs);
  return <ViewAllPuzzles puzzles={puzzleData} />;
}
