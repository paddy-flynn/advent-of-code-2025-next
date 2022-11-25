import { FC } from "react";
import { useAtom } from "jotai";
import { queuedPuzzlePartsState } from "@/lib/atoms";

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
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-[#1a1a2e] border-2 rounded-md max-sm:w-full text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ring-offset-transparent transition-all duration-200 backdrop-blur-md christmas-lights"
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
      Run All 🎄  
    </button>
  );
};
export default RunAllButton;
