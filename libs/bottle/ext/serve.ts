/// <reference lib="deno.ns" />
import { extname, join, relative, resolve } from "std/path";
import { lookup } from "mime_types";

import type { Context, Middleware } from "../types.ts";

export type ServeOptions = {
  index?: string;
  defer?: boolean;
};

export function serve(
  base: string = "public",
  options: ServeOptions = {},
): Middleware {
  const root = resolve(Deno.cwd(), base);
  const index = options.index ?? "index.html";
  const defer = options.defer ?? true;

  const send = async (ctx: Context) => {
    const [filename, extension] = normalizePath(ctx.path, index);

    // todo 如何判断文件存不存在？
    // https://deno.com/deploy/docs/runtime-fs/
    const data = await Deno.readFile(resolve(root, filename));

    ctx.status = 200;
    ctx.type = getMimeType(extension);
    ctx.body = data;
  };

  if (defer) {
    return async (ctx, next) => {
      await next();

      if (ctx.method !== "HEAD" && ctx.method !== "GET") return;
      // response is already handled
      if (ctx.body != null || ctx.status !== 404) return;

      try {
        await send(ctx);
      } catch (err) {
        if (err instanceof Deno.errors.NotFound) return;
        throw err;
      }
    };
  }

  return async (ctx, next) => {
    if (ctx.method !== "HEAD" && ctx.method !== "GET") return next();

    try {
      await send(ctx);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) return next();
      throw err;
    }
  };
}

function normalizePath(path: string, index: string): readonly [string, string] {
  const filename = relative("/", path);

  const extension = extname(filename);
  if (extension === "") {
    return [join(filename, index), extname(index)];
  }

  return [filename, extension];
}

function getMimeType(extension: string): string | undefined {
  const result = lookup(extension);
  const mimeType = result === false ? undefined : result;

  return mimeType;
}
