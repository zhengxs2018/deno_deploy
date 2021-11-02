import type { BaseContext } from "../interfaces.ts";

export default {
  get headers(): Headers {
    return this.request.headers;
  },
  get(name) {
    return this.headers.get(name);
  },
  get type() {
    return this.response.headers.get("content-type");
  },
  set type(value) {
    const headers = this.response.headers;

    if (value == null) {
      headers.delete("content-type");
    } else {
      headers.set("content-type", value);
    }
  },
  get body() {
    return this.response.body;
  },
  set body(value) {
    this.response.body = value;
  },
  get status() {
    return this.response.status;
  },
  set status(value) {
    this.response.status = value;
  },
  get statusText() {
    return this.response.statusText;
  },
  set statusText(value) {
    this.response.statusText = value;
  },
} as BaseContext;
