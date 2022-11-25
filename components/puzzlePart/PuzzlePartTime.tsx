import { FC, useContext, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useElapsedTime } from "use-elapsed-time";
import { puzzlePartStatusState, puzzlePartTimeState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartTime: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const status = useAtomValue(puzzlePartStatusState(puzzlePartID));
  const time = useAtomValue(puzzlePartTimeState(puzzlePartID));
  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: status === "running",
  });
  useEffect(() => {
    if (status === "queued") {
      reset();
    }
    return;
  }, [status, reset]);
  return status === "queued" ? (
    <span className="text-sm text-white font-mono">--:---</span>
  ) : (
    <span className="text-sm text-white font-mono">
      {(time || elapsedTime)
        .toLocaleString(undefined, {
          minimumIntegerDigits: 2,
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })
        .replace(",", ":")}
    </span>
  );
};
export default PuzzlePartTime;
