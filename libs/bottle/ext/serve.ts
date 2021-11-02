/// <reference lib="deno.ns" />
import { relative, resolve, extname } from "../../deps/path.ts";
import { lookup } from '../../deps/mime_types.ts'

// import { isFile } from "../../util/fs-extra.ts";

import { Middleware } from "../interfaces.ts";

const cwd = Deno.cwd();

export function serve(base: string = "public"): Middleware {
  const root = resolve(cwd, base);

  return async (ctx, next) => {
    if (ctx.method !== "GET") return next();

    // todo 文件不存在如何处理
    const file = resolve(root, relative("/", ctx.path));
    // if (isFile(file) === false) return next();

    try {
      const body = await Deno.readFile(file)
      const type = lookup(extname(file))
  
      ctx.status = 200;
      ctx.type = type === false ? null : type;
      ctx.body = body
    } catch(err) {
      // todo 如何判断文件存不存在？
      // https://deno.com/deploy/docs/runtime-fs/
      if (err.name === 'NotFound') {
        return next();
      }
      throw err;
    }
  };
}
