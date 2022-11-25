import { FC } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const ShowAllButton: FC = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-[#1a1a2e] border-2 rounded-md max-sm:w-full text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ring-offset-transparent transition-all duration-200 backdrop-blur-md christmas-lights"
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
