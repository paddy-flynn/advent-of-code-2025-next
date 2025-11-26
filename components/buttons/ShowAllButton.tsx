import { FC } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const ShowAllButton: FC = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-accent-cyan border border-transparent rounded-md shadow-sm max-sm:w-full text-white hover:bg-white hover:text-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ring-offset-transparent transition-all duration-200 backdrop-blur-md glow-cyan"
    >
      Show All Days
      <ArrowUturnLeftIcon
        aria-hidden="true"
        className="w-4 h-4 ml-1.5 -mr-1 text-white"
      />
    </Link>
  );
};
export default ShowAllButton;
