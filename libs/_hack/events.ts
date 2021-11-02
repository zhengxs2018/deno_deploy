// todo 如何处理 vscode 类型提示？
declare class FetchEvent extends Event {
  request: Request;
  respondWith(response: Response | Promise<Response>): void;
}

declare interface FetchEventListener {
  (evt: FetchEvent): any;
}

declare function addEventListener(
  type: "fetch",
  listener: FetchEventListener,
  options?: boolean | AddEventListenerOptions,
): void;

export function addRequestHandler(
  listener: FetchEventListener,
  options?: boolean | AddEventListenerOptions,
) {
  return addEventListener("fetch", listener, options);
}

export type { FetchEvent, FetchEventListener };
