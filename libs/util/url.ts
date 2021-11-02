import path from "../deps/path.ts";

export function fileURLToPath(url: string | URL) {
  const { pathname } = url instanceof URL ? url : new URL(url);
  return path.normalize(pathname);
}
