import { FC } from "react";
import { useAtom } from "jotai";
import { queuedPuzzlePartsState } from "@/lib/atoms";
import { PlayIcon } from "@heroicons/react/24/outline";

const RunAllButton: FC<{ allDays: string[] }> = ({ allDays }) => {
  const allPuzzlePartIDs: string[] = allDays.flatMap((day) => [
    `${day}-1`,
    `${day}-2`,
  ]);
  const [queuedPuzzleParts, seQueuedPuzzleParts] = useAtom(
    queuedPuzzlePartsState
  );
  return (
    <button
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-accent-cyan border border-transparent rounded-md shadow-sm max-sm:w-full text-white hover:bg-white hover:text-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ring-offset-transparent transition-all duration-200 backdrop-blur-md glow-cyan"
      type="button"
      disabled={allPuzzlePartIDs.every((id) => queuedPuzzleParts.includes(id))}
      onClick={() => {
        seQueuedPuzzleParts((oldQueuedPuzzleParts) => {
          const newParts = allPuzzlePartIDs.filter(
            (id) => !oldQueuedPuzzleParts.includes(id)
          );
          return [...oldQueuedPuzzleParts, ...newParts];
        });
      }}
    >
      Run All
      <PlayIcon
        aria-hidden="true"
        className="w-4 h-4 ml-1.5 -mr-1 text-white"
      />
    </button>
  );
};
export default RunAllButton;
