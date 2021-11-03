import { Helmet, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

import type { Context, Middleware } from "../types.ts";

export function ssr(render: (ctx: Context) => any): Middleware {
  return (ctx) => {
    const app = renderSSR(render(ctx));
    const { body, head, footer } = Helmet.SSR(app);

    ctx.status = 200;
    ctx.type = "text/html";
    ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${head.join("\n")}
      </head>
      <body>
        ${body}
        ${footer.join("\n")}
      </body>
    </html>`;
  };
}
