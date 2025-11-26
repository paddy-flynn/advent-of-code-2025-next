import { FC } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const ShowAllButton: FC = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-vscode-blue border border-transparent rounded-md shadow-sm max-sm:w-full text-white hover:bg-vscode-blue-hover focus:outline-none focus:ring-2 focus:ring-vscode-blue focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ring-offset-vscode-editor-bg"
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
