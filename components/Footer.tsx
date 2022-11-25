import { CandyCane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="max-w-md px-4 py-6 mx-auto overflow-hidden md:py-8 lg:py-12 sm:px-6 lg:px-8 glass-panel rounded-lg">
      <div className="flex flex-col gap-6">
        <p className="flex items-center justify-center text-base text-white/80 gap-x-2">
          <a
            href="https://github.com/paddy-flynn/advent-of-code-2025-next"
            target={"_blank"}
            rel="noopener noreferrer"
            className="a-defaults"
          >
            View on GitHub
          </a>
        </p>
        <p className="flex items-center justify-center text-white/80 gap-x-2 font-base">
          <CandyCane aria-hidden="true" className="w-8 h-8 text-red-500" />
          <a
            href="https://paddy-flynn.com/"
            target={"_blank"}
            rel="noopener noreferrer"
            className="a-defaults"
          >
            Patrick Flynn
          </a>
          <CandyCane aria-hidden="true" className="w-8 h-8 text-red-500" />
        </p>
      </div>
    </footer>
  );
};
export default Footer;
