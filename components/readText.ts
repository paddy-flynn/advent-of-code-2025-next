"use server";

import { promises as fs } from 'fs';
import path from "path";

export async function readText(filePath: string) {
  const file = await fs.readFile(process.cwd() + filePath, 'utf8');
  return file;
}