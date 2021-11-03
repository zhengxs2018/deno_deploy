import { pick } from "https://cdn.skypack.dev/lodash-es";
import type { ExtendableResponse } from "../types.ts";

export default {
  get type() {
    return this.headers.get("content-type");
  },
  set type(value) {
    if (value == null) {
      this.headers.delete("content-type");
    } else {
      this.headers.set("content-type", value);
    }
  },
  status: 404,
  message: "Not Found",
  has(name) {
    return this.headers.has(name);
  },
  get(name) {
    return this.headers.get(name);
  },
  set(name, value) {
    this.headers.set(name, value);
  },
  append(name, value) {
    this.headers.append(name, value);
  },
  remove(name) {
    this.headers.delete(name);
  },
  toJSON() {
    return pick(this, ["status", "message", "headers"]);
  },
  inspect() {
    return pick(this, ["status", "message", "headers", "body"]);
  },
} as ExtendableResponse;
