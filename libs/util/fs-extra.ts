/// <reference lib="deno.ns" />
import { existsSync } from "../deps/fs.ts";

export function isFile(path: string): boolean {
  return existsSync(path) && Deno.statSync(path).isFile;
}
