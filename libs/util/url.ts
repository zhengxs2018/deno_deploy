import { normalize } from "std/path";

export function fileURLToPath(url: string | URL) {
  const { pathname } = url instanceof URL ? url : new URL(url, "file:");
  return normalize(pathname);
}
