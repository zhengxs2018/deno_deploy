import type { Next } from "../util/compose.ts";

export interface DefaultState {
  [key: string]: any;
}

export interface DefaultContext {
  [key: string]: any;
}

export interface BaseContext extends DefaultContext {
  headers: Headers;
  body: BodyInit;
  status: number;
  statusText: string;
  type: string | null;
  get(name: string): string | null;
}

export interface Context<StateT = DefaultState> extends BaseContext {
  request: Request;
  method: string;
  path: string;
  location: URL;
  originalUrl: string;
  response: {
    body?: BodyInit;
    status: number;
    statusText?: string;
    headers: Headers;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
  };
  state: StateT;
}

export type Middleware<
  StateT = DefaultState,
  ContextT extends Context<StateT> = Context<StateT>,
> = (context: ContextT, next: Next) => any;
