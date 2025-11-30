import { useEffect } from "react";
import { useAtom, useStore } from "jotai";
import {
  queuedPuzzlePartsState,
  currentlyRunningPuzzlePartState,
  puzzlePartResultState,
  puzzlePartTimeState,
  puzzlePartErrorState  
} from "./atoms";
import { Puzzle, PuzzleData, SolvePuzzleFn } from "./types";
import puzzleSolvers from "@/puzzles/index";

export const usePuzzleManager = (puzzlesData: PuzzleData[]) => {
  const puzzles: Puzzle[] = puzzlesData.map(data => {
    const solver = puzzleSolvers.find(s => s.day === data.day);
    return {
      ...data,
      solvePart1: solver?.solvePart1 || (async () => 0),
      solvePart2: solver?.solvePart2 || (async () => 0),
    };
  });
  const [queuedPuzzleParts, setQueuedPuzzleParts] = useAtom(
    queuedPuzzlePartsState
  );
  const [currentlyRunningPuzzlePart, setCurrentlyRunningPuzzlePart] = useAtom(
    currentlyRunningPuzzlePartState
  );
  const store = useStore();

  useEffect(() => {
    if (queuedPuzzleParts.length > 0 && !currentlyRunningPuzzlePart) {
      const nextPuzzlePart = queuedPuzzleParts[0];
      setCurrentlyRunningPuzzlePart(nextPuzzlePart);
      const [puzzleDay, puzzlePartId] = nextPuzzlePart.split("-");
      const puzzleToSolveNext: Puzzle | undefined = puzzles.find(
        (x) => x.day === puzzleDay
      );
    
      if (puzzleToSolveNext) {
        store.set(puzzlePartTimeState(nextPuzzlePart), null);
        const startTime = Date.now();

        (async () => {
          try {
            const customInput = null;
            const solveFn: SolvePuzzleFn =
              puzzlePartId === "1"
                ? puzzleToSolveNext.solvePart1
                : puzzleToSolveNext.solvePart2;
            const res = await solveFn(customInput || puzzleToSolveNext.input || "");
            
            if (typeof res !== "string" && isNaN(res)) {
              console.error(`Received result ${res}`);
              throw new Error("Received NaN result");
            }
            if (res === null) {
              throw new Error("Received null result");
            }

            return { result: res };
          } catch (error) {
            console.error(
              `Solution for Day ${puzzleDay} Part ${puzzlePartId} Failed with`,
              error
            );
            return { error: error as Error };
          }
        })().then((outcome) => {
          const endTime = Date.now();
          
          if ("error" in outcome) {
            store.set(puzzlePartErrorState(nextPuzzlePart), outcome.error || null);
            store.set(puzzlePartResultState(nextPuzzlePart), null);
          } else {
            store.set(puzzlePartErrorState(nextPuzzlePart), null);
            store.set(puzzlePartResultState(nextPuzzlePart), outcome.result || null);
          }
          
          store.set(puzzlePartTimeState(nextPuzzlePart), (endTime - startTime) / 1000.0);

          setQueuedPuzzleParts((oldQueuedPuzzleParts) =>
            oldQueuedPuzzleParts.filter((x) => x !== nextPuzzlePart)
          );
          setCurrentlyRunningPuzzlePart(null);
        });
      } else {
        console.error(`Puzzle ${puzzleDay} not found`);
        setQueuedPuzzleParts((oldQueuedPuzzleParts) =>
          oldQueuedPuzzleParts.filter((x) => x !== nextPuzzlePart)
        );
        setCurrentlyRunningPuzzlePart(null);
      }
    }
  }, [
    currentlyRunningPuzzlePart,
    queuedPuzzleParts,
    setCurrentlyRunningPuzzlePart,
    setQueuedPuzzleParts,
    store,
  ]);
};
