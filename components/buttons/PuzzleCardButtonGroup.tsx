import { FC, Fragment, useContext } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { PuzzleContext } from "@/lib/context";
import { Menu, Transition } from "@headlessui/react";
import RunDayButton from "./RunDayButton";
import EditInputButton from "./EditInputButton";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const PuzzleCardButtonGroup: FC = () => {
  const { day } = useContext(PuzzleContext);
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <EditInputButton />
      <RunDayButton />
      <Menu as="div" className="relative block -ml-px">
        <Menu.Button className="relative inline-flex items-center px-2 py-2 btn-defaults rounded-r-md">
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="glass-panel absolute right-0 z-10 w-56 mt-2 -mr-1 origin-top-right rounded-md shadow-lg focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://adventofcode.com/2025/day/${parseInt(
                      day,
                      10
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-accent-gold/20 text-white" : "text-accent-gold",
                      "flex items-center justify-between px-4 py-2 text-sm hover:bg-accent-gold/20 hover:text-white transition-all duration-200"
                    )}
                  >
                    Puzzle Description
                    <ArrowTopRightOnSquareIcon
                      aria-hidden="true"
                      className="w-4 h-4"
                    />
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://github.com/paddy-flynn/advent-of-code-2025-next/tree/main/puzzles/${day}/solution.ts`}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-accent-gold/20 text-white" : "text-accent-gold",
                      "flex items-center justify-between px-4 py-2 text-sm hover:bg-accent-gold/20 hover:text-white transition-all duration-200"
                    )}
                  >
                    Source Code
                    <ArrowTopRightOnSquareIcon
                      aria-hidden="true"
                      className="w-4 h-4"
                    />
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default PuzzleCardButtonGroup;
