import compose from "../util/compose.ts";
import { listenAndServe, Handler, ServeInit } from "../deps/server.ts";

import baseContext from "./base/context.ts";

import type { Context, DefaultState, Middleware } from "./interfaces.ts";

export const middleware: Middleware<any>[] = [];

export function createContext(request: Request) {
  const context: Context = Object.create(baseContext);
  const originalUrl = request.url;
  const location = new URL(originalUrl);

  context.location = location;
  context.path = location.pathname;
  context.originalUrl = originalUrl;

  // todo base request
  context.request = request;
  context.method = request.method;

  // todo base response
  const headers = new Headers();
  context.response = {
    status: 404,
    headers: new Headers(),
    has(name: string) {
      return headers.has(name);
    },
    get(name: string) {
      return headers.get(name);
    },
    set(name: string, value: string) {
      headers.set(name, value);
    },
  };

  context.state = {};

  return context;
}

export function use<StateT = DefaultState>(fn: Middleware<StateT>) {
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

      const response = ctx.response;

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })
    } catch (err) {
      let message: string | undefined;
      if (err && err.expose) {
        message = err.message;
      } else {
        // todo logger
        console.error(err);
      }

      return new Response(null, {
        status: 500,
        statusText: message,
      })
    }
  };
}

export function run(addr: string = ':8080', options?: ServeInit) {
  return listenAndServe(addr, callback(), options);
}
