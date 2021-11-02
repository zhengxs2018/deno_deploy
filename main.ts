import { run, use } from "./libs/bottle/mod.ts";
import { serve } from './libs/bottle/ext/serve.ts'

use(serve('public'))

use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.path} - ${rt}`);
});

use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.set("X-Response-Time", `${ms}ms`);
});

use((ctx) => {
  ctx.status = 200;
  ctx.type = "text/html";
  ctx.body = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>hello,world</title>
      <link rel="stylesheet" href="reset.css" />
    </head>
    <body>
      <h1>hello,world</h1>
    </body>
  </html>`
});

console.log('Listen on http://127.0.0.1:8080')
await run(':8080');
