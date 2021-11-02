/// <reference lib="deno.ns" />
import { relative, resolve, extname } from "../../deps/path.ts";
import { lookup } from '../../deps/mime_types.ts'

import { isFile } from "../../util/fs-extra.ts";

import { Middleware } from "../interfaces.ts";

const cwd = Deno.cwd();

export function serve(base: string = "public"): Middleware {
  const root = resolve(cwd, base);

  return async (ctx, next) => {
    if (ctx.method !== "GET") return next();

    const file = resolve(root, relative("/", ctx.path));
    if (isFile(file) === false) return next();

    const type = lookup(extname(file))

    ctx.status = 200;
    ctx.type = type === false ? null : type;
    ctx.body = await Deno.readFile(file);
  };
}
