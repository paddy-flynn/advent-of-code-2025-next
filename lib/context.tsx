import { createContext } from "react";
import { PuzzleData } from "./types";

const emptyDefaultPuzzle: PuzzleData = {
  name: "Unknown",
  day: "00",
  input: "",
};

export const PuzzleContext = createContext<PuzzleData>(emptyDefaultPuzzle);

export const PuzzlePartIDContext = createContext<string>("00-0");
