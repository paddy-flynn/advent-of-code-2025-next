import { FC, useContext } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {  PlayIcon } from "@heroicons/react/24/outline";
import { puzzlePartStatusState, queuedPuzzlePartsState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const RunPartButton: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const status = useAtomValue(puzzlePartStatusState(puzzlePartID));
  const setQueuedPuzzleParts = useSetAtom(queuedPuzzlePartsState);
  return (
    <button
      className="relative inline-flex items-center rounded-md px-4 py-1.5 btn-defaults group"
      type="button"
      disabled={status === "queued" || status === "running"}
      onClick={() => {
        setQueuedPuzzleParts((oldQueuedPuzzleParts) => [
          ...oldQueuedPuzzleParts,
          puzzlePartID,
        ]);
      }}
    >
      <span>Run</span>
      <PlayIcon
        aria-hidden="true"
        className="w-4 h-4 ml-2 -mr-1 text-vscode-blue group-hover:text-white group-focus:text-white"
      />
    </button>
  );
};
export default RunPartButton;
