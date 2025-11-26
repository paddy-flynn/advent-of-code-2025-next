"use server";

import fs from "fs";
import path from "path";

export function readText(...segments: string[]) {
  const file = path.join(process.cwd(), ...segments);
  return fs.readFileSync(file, "utf8");
}