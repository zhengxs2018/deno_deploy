import { Handler, listenAndServe, ServeInit } from "https://deno.land/std@0.113.0/http/server.ts";

import compose from "../util/compose.ts";

import context from "./extend/context.ts";
import response from "./extend/response.ts";

import type { Context, Middleware } from "./types.ts";

export const middleware: Middleware[] = [];

export function createContext(request: Request) {
  const ctx: Context = Object.create(context);

  ctx.state = {};
  ctx.location = new URL(request.url);

  ctx.request = request;

  ctx.response = Object.create(response);
  ctx.response.headers = new Headers();

  return ctx;
}

export function use(fn: Middleware) {
  if (typeof fn !== "function") {
    throw new TypeError("middleware must be a function!");
  }

  middleware.push(fn);
}

export function callback(): Handler {
  const fnMiddleware = compose(middleware.filter(Boolean));

  return async (request) => {
    const ctx = createContext(request);

    try {
      await fnMiddleware(ctx);

      const { body, status, message, headers } = ctx.response;

      // 404 特殊处理
      if (status === 404) {
        return new Response(message, { status, headers });
      }

      return new Response(body, { status, headers });
    } catch (err) {
      if (err && err.expose) {
        const status = err.statusCode || err.status;
        return new Response(err.message, { status });
      }

      // todo logger
      console.error(err);
      return new Response("Internal Server Error", { status: 500 });
    }
  };
}

export function run(addr: string = ":8080", options?: ServeInit) {
  return listenAndServe(addr, callback(), options);
}
