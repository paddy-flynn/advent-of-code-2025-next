import { FC, useContext } from "react";
import { useAtomValue } from "jotai";
import { puzzlePartResultState, puzzlePartStatusState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartResult: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const puzzlePartResult = useAtomValue(puzzlePartResultState(puzzlePartID));
  const puzzlePartStatus = useAtomValue(puzzlePartStatusState(puzzlePartID));

  return (
    <span className="text-sm text-white font-mono break-all">
      {puzzlePartStatus === "queued" || puzzlePartStatus === "running"
        ? "..."
        : typeof puzzlePartResult === "string"
          ? puzzlePartResult
          : puzzlePartResult === null || isNaN(puzzlePartResult)
            ? "No Result"
            : puzzlePartResult}
    </span>
  );
};
export default PuzzlePartResult;
