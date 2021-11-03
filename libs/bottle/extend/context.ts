import delegate from "delegates";

import type { ExtendableContext } from "../types.ts";

const proto = {
  env: Deno.env.get("SERVER_APP_ENV") ?? "development",
  get path() {
    return this.location.pathname;
  },
  get(name) {
    return this.request.headers.get(name);
  },
  toJSON() {
    return {
      request: "<original deno req>",
      response: this.response.toJSON(),
      originalUrl: this.url,
    };
  },
  inspect() {
    if (this === proto) return this;
    return this.toJSON();
  },
} as ExtendableContext;

delegate(proto, "response")
  // .method('attachment')
  // .method('redirect')
  .method("remove")
  .method("has")
  .method("set")
  .method("append")
  .access("status")
  .access("type")
  .access("body")
  .access("message");

delegate(proto, "location")
  .getter("origin")
  .getter("protocol")
  .getter("host")
  .getter("hostname")
  .getter("href")
  .getter("search")
  .getter("searchParams")
  .getter("username")
  .getter("password");

delegate(proto, "request")
  .access("method")
  .getter("url")
  .getter("headers");

// todo 对象代理
export default proto;
