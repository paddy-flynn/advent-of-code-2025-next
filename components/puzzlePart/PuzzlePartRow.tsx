import { FC, useContext } from "react";
import PuzzlePartStatus from "@/components/puzzlePart/PuzzlePartStatus";
import PuzzlePartTime from "@/components/puzzlePart/PuzzlePartTime";
import PuzzlePartResult from "@/components/puzzlePart/PuzzlePartResult";
import RunPartButton from "@/components/buttons/RunPartButton";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartRow: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  return (
    <li>
      <div className="grid items-center grid-cols-2 sm:grid-cols-4 gap-y-3 sm:gap-y-0 px-3 py-3 md:px-6 md:py-4 lg:px-8">
        <div className="flex items-center gap-x-3 text-white">
          <span className="text-sm font-medium font-mono">
            <span className="max-sm:hidden">Part </span>
            {puzzlePartID.split("-")[1]}
          </span>
          <PuzzlePartStatus />
        </div>
        <div className="flex justify-end sm:justify-end">
          <PuzzlePartResult />
        </div>
        <div className="flex justify-start sm:justify-end">
          <PuzzlePartTime />
        </div>
        <div className="flex justify-end">
          <RunPartButton />
        </div>
      </div>
    </li>
  );
};

export default PuzzlePartRow;
