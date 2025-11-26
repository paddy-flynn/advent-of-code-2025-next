import puzzles from "@/puzzles/index";
import { loadPuzzleInputs } from "@/lib/loadPuzzleInputs";
import {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { slugifyPuzzle } from "@/lib/utils";
import Head from "next/head";
import dynamic from "next/dynamic";
const ViewSinglePuzzle = dynamic(
  () => import("@/components/ViewSinglePuzzle"),
  {
    ssr: false,
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = puzzles.map((puzzle) => ({
    params: { puzzle: slugifyPuzzle(puzzle) },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const puzzlesWithInputs = loadPuzzleInputs(puzzles);
  const puzzle = puzzlesWithInputs.find(
    (p) => slugifyPuzzle(p) === params?.puzzle
  );
  return { props: { puzzleDay: puzzle?.day, puzzleInput: puzzle?.input || "" } };
};

const PuzzlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  puzzleDay,
  puzzleInput,
}) => {
  const puzzle = { ...puzzles.find((p) => p.day === puzzleDay)!, input: puzzleInput };
  return (
    <>
      <Head>
        <title>
          Advent of Code 2025 | Solution for Day {puzzle.day} - {puzzle.name}
        </title>
        <meta
          name="description"
          content={`Solution by Patrick Flynn for Advent of Code 2025 day ${puzzle.day} - ${puzzle.name}, written in Typescript, using Next.js, Tailwind and Recoil.`}
        />
        <meta
          property="og:image"
          content={`https://advent-of-code-next.vercel.app/api/og?title=${encodeURIComponent(
            `Day ${puzzle.day} - ${puzzle.name}`
          )}`}
        />
      </Head>
      <ViewSinglePuzzle puzzleDay={puzzleDay} puzzleInput={puzzleInput} />
    </>
  );
};

export default PuzzlePage;
