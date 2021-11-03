import { assert } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import { compile, pathToRegexp } from "https://cdn.skypack.dev/path-to-regexp";

import { arrayify } from "../../util/shared.ts";
import type { Middleware } from "../types.ts";

export type HttpMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export type RouteMethod = HttpMethod | "*";

interface RegexpKey {
  name: string | number;
  prefix: string;
  suffix: string;
  pattern: string;
  modifier: string;
}

export type RouteRecord = {
  name?: string;
  path: string;
  regexp: RegExp;
  keys: string[];
  methods: RouteMethod[];
  meta: Record<string, any>;
  handler: Middleware;
  toURL(data: any): string;
};

export interface RouteConfig {
  name?: string;
  method?: RouteMethod | RouteMethod[];
  path: string;
  handler: Middleware;
  meta?: Record<string, any>;
}

export type Route = {
  name?: string;
  path: string;
  params: Record<string, string>;
  meta: Record<string, any>;
};

export interface RouterOptions {
  routes?: RouteConfig[];
  onUnknownRoute?: Middleware;
}

export function createRouter(options: RouterOptions = {}) {
  const {
    onUnknownRoute = (_, next) => next(),
  } = options;
  const routes: RouteConfig[] = options?.routes || [];

  const {
    match,
    toURL,
  } = createMatcher(routes);

  const onGenerateRoute: Middleware = (ctx, next) => {
    const result = match(ctx.path);
    if (result === null) {
      return onUnknownRoute(ctx, next);
    }

    const [handler, route] = result;

    ctx.route = route;

    return handler(ctx, next);
  };

  function addRoute(config: RouteConfig) {
    routes.push(config);
  }

  return {
    addRoute,
    onGenerateRoute,
    toURL,
  };
}

function createMatcher(routes: RouteConfig[]) {
  const { pathMap, nameMap } = createRouteMap(routes);

  function match(path: string): readonly [Middleware, Route] | null {
    for (const [regexp, record] of pathMap) {
      const match = regexp.exec(path);
      if (match === null) continue;

      const { handler } = record;

      return [handler, createRoute(match, record)];
    }

    return null;
  }

  function toURL(name: string, params?: Record<string, any>): string | null {
    const record = nameMap.get(name);
    return record ? record.toURL(params) : null;
  }

  function createRoute(match: string[], record: RouteRecord): Route {
    const [path, ...values] = match;
    const { name, keys, meta, handler } = record;
    const params: Record<string, string> = {};

    values.forEach((value, index) => {
      params[keys[index]] = value;
    });

    return {
      name,
      path,
      params,
      meta: Object.create(meta),
    };
  }

  return {
    match,
    toURL,
  };
}

type RouteMap = Map<RegExp, RouteRecord>;
type NamedRouteMap = Map<string, RouteRecord>;

function createRouteMap(routes: RouteConfig[]) {
  const pathMap: RouteMap = new Map();
  const nameMap: NamedRouteMap = new Map();

  routes.forEach((route) => {
    addRouteRecord(pathMap, nameMap, route);
  });

  return {
    pathMap,
    nameMap,
  };
}

function addRouteRecord(
  pathMap: RouteMap,
  nameMap: NamedRouteMap,
  route: RouteConfig,
) {
  const { name, path, handler, meta = {} } = route;

  assert(path != null, `必须设置 "path" 字段`);

  const keys: RegexpKey[] = [];
  const regexp = pathToRegexp(path, keys);

  assert(nameMap.has(regexp) === false, `命名规则 '${path}' 已存在`);

  const record: RouteRecord = {
    name,
    path,
    regexp,
    keys: keys.map((c) => c.name) as string[],
    methods: arrayify<RouteMethod>(route.method),
    handler,
    meta,
    toURL: compile(path),
  };

  pathMap.set(regexp, record);

  if (name) {
    assert(nameMap.has(name) === false, `命名路由 '${name}' 已存在`);
    nameMap.set(name, record);
  }
}
