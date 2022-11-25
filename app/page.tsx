import ViewAllPuzzles from "@/components/ViewAllPuzzles";
import { Metadata } from "next";
import puzzles from "@/puzzles/index";
import { loadPuzzleInputs } from "@/lib/loadPuzzleInputs";
import { serializePuzzlesData } from "@/lib/puzzleHelpers";

export const metadata: Metadata = {
  title: "Advent of Code 2025 | Solutions",
  description: "These are my solutions for the Advent of Code 2025 puzzles, written in TypeScript, using Next.js.",
  openGraph: {
    images: ["/og-image.png"],
    url: "https://advent-of-code-2025-next.vercel.app",
    type: "website",
  },
  other: {
    "og:logo": "/og-image.png",
  },
};

export default async function Home() {
  const puzzlesWithInputs = await loadPuzzleInputs(puzzles);
  const puzzleData = serializePuzzlesData(puzzlesWithInputs);
  return <ViewAllPuzzles puzzles={puzzleData} />;
}
