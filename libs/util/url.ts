import { normalize } from "https://deno.land/std@0.113.0/path/mod.ts";

export function fileURLToPath(url: string | URL) {
  const { pathname } = url instanceof URL ? url : new URL(url, "file:");
  return normalize(pathname);
}
