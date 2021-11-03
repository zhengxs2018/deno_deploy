import type { Middleware as ComposedMiddleware } from "../util/compose.ts";

export interface DefaultState {
  [key: string]: any;
}

export interface DefaultContext {
  [key: string]: any;
}

export interface ContextDelegatedRequest {
  readonly method: string;
  readonly path: string;
  readonly url: string;
  readonly origin: string;
  readonly protocol: string;
  readonly host: string;
  readonly hostname: string;
  readonly href: string;
  readonly search: string;
  readonly headers: Headers;
  readonly searchParams: URLSearchParams;
  readonly username: string;
  readonly password: string;
}

export interface BaseResponse {
  status: number;
  body: BodyInit;
  headers: Headers;
  message: string;
}

export interface ExtendableResponse extends BaseResponse {
  type: string;
  has(name: string): boolean;
  get(name: string): string | null;
  set(name: string, value: string): void;
  append(name: string, value: string): void;
  remove(name: string): void;
  toJSON(): any;
  inspect(): any;
  // todo redirect attachment lastModified etag
}

export interface ServerResponse extends ExtendableResponse {
  // pass
}

export interface ContextDelegatedResponse {
  type?: string;
  body: BodyInit;
  status: number;
  message: string;
  has(name: string): boolean;
  set(name: string, value: string): void;
  append(name: string, value: string): void;
  remove(name: string): void;
}

export interface BaseContext
  extends ContextDelegatedRequest, ContextDelegatedResponse {
  // ip: string;
  get(name: string): string | null;
  toJSON(): any;
  inspect(): any;
}

export interface ExtendableContext extends BaseContext {
  env: string;
  location: URL;
  request: Request;
  response: ServerResponse;
  // todo cookies, accepts, throw, assert
}

export type ParameterizedContext<
  StateT = DefaultState,
  ContextT = DefaultContext,
  ResponseBodyT = unknown,
> =
  & ExtendableContext
  & { state: StateT }
  & ContextT
  & { body: ResponseBodyT; response: { body: ResponseBodyT } };

export interface Context extends ParameterizedContext {}

export type Middleware<
  StateT = DefaultState,
  ContextT = DefaultContext,
  ResponseBodyT = any,
> = ComposedMiddleware<ParameterizedContext<StateT, ContextT, ResponseBodyT>>;
