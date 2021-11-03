import { run, use } from "./libs/bottle/mod.ts";
import { serve } from "./libs/bottle/ext/serve.ts";

import { onGenerateRoute } from "./router.tsx"

// defer 是延迟执行，等其他中间件执行后再操作
use(serve("public", { defer: true }));

use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.set("X-Response-Time", `${ms}ms`);
  console.debug(`${ctx.method} ${ctx.path} - ${ms}ms`);
});

use(onGenerateRoute)

console.log("Listen on http://127.0.0.1:8080");
await run(":8080");
