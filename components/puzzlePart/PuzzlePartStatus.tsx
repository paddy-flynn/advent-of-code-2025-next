import {
  ArrowPathIcon,
  CheckIcon,
  RectangleStackIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FC, useContext } from "react";
import { useAtomValue } from "jotai";
import { puzzlePartStatusState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartStatus: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const status = useAtomValue(puzzlePartStatusState(puzzlePartID));
  switch (status) {
    case "success":
      return (
        <div className="text-status-success badge-defaults glow-green">
          <CheckIcon className="sm:mr-1.5 -ml-1 h-4 w-4 text-status-success" />
          <span>Solved</span>
        </div>
      );
    case "error":
      return (
        <div className="text-status-error badge-defaults glow-red">
          <XMarkIcon
            className="sm:mr-1.5 -ml-1 h-4 w-4 text-status-error"
            aria-hidden="true"
          />
          <span>Failed</span>
        </div>
      );
    case "running":
      return (
        <div className="text-status-warning badge-defaults glow-yellow">
          <ArrowPathIcon
            aria-hidden="true"
            className="sm:mr-1.5 -ml-1 h-4 w-4 text-status-warning animate-spin"
          />
          <span>Running</span>
        </div>
      );
    case "queued":
      return (
        <div className="text-accent-gold badge-defaults glow-gold">
          <RectangleStackIcon
            aria-hidden="true"
            className="sm:mr-1.5 -ml-1 h-4 w-4 text-accent-gold"
          />
          <span>Queued</span>
        </div>
      );
    default:
      return <span className="text-white/60 badge-defaults">Idle</span>;
  }
};
export default PuzzlePartStatus;
