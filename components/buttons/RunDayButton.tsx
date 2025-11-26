import { FC, useContext } from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { queuedPuzzlePartsState } from "@/lib/atoms";
import { useAtom } from "jotai";
import { PuzzleContext } from "@/lib/context";

const RunDayButton: FC = () => {
  const { day } = useContext(PuzzleContext);
  const [queuedPuzzleParts, setQueuedPuzzleParts] = useAtom(
    queuedPuzzlePartsState
  );
  const onRunDay = () => {
    setQueuedPuzzleParts((oldQueuedPuzzleParts) => [
      ...oldQueuedPuzzleParts,
      `${day}-1`,
      `${day}-2`,
    ]);
  };
  return (
    <button
      type="button"
      disabled={
        queuedPuzzleParts.includes(`${day}-1`) &&
        queuedPuzzleParts.includes(`${day}-2`)
      }
      onClick={onRunDay}
      className="relative inline-flex items-center px-4 py-2 -ml-px btn-defaults group"
    >
      Run Day
      <PlayIcon
        aria-hidden="true"
        className="w-4 h-4 ml-2 -mr-1 text-vscode-blue group-hover:text-white group-focus:text-white"
      />
    </button>
  );
};
export default RunDayButton;
