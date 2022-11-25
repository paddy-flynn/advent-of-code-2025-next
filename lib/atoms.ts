import { PuzzlePartStatus } from "./types";
import { atom } from "jotai";
import { atomFamily, atomWithDefault } from "jotai/utils";

export const customPuzzleInputState = atomFamily((_id: string) =>
  atom<string | null>(null)
);

export const puzzlePartErrorState = atomFamily((_id: string) =>
  atom<Error | null>(null)
);

export const puzzlePartRunningState = atomFamily((_id: string) =>
  atom<boolean>(false)
);

export const puzzlePartResultState = atomFamily((_id: string) =>
  atom<number | string | null>(null)
);

export const puzzlePartTimeState = atomFamily((_id: string) =>
  atom<number | null>(null)
);

export const puzzlePartStatusState = atomFamily((puzzlePartID: string) =>
  atomWithDefault<PuzzlePartStatus>((get) => {
    const isQueued = get(queuedPuzzlePartsState).includes(puzzlePartID);
    if (!isQueued) {
      const result = get(puzzlePartResultState(puzzlePartID));
      if (result === null) {
        const error = get(puzzlePartErrorState(puzzlePartID));
        return error === null ? "idle" : "error";
      }
      return "success";
    }
    const isRunning = get(currentlyRunningPuzzlePartState) === puzzlePartID;
    if (isRunning) {
      return "running";
    }
    return "queued";
  })
);

export const currentlyRunningPuzzlePartState = atom<string | null>(null);

export const queuedPuzzlePartsState = atom<string[]>([]);
