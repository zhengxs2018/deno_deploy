/** @jsx h */
import { h } from "nano_jsx";

import { createRouter } from "./libs/bottle/ext/router.ts";
import { ssr } from "./libs/bottle/ext/ssr.ts";

import Home from "./pages/index.tsx";

export const { onGenerateRoute } = createRouter({
  routes: [
    {
      path: "/",
      handler: ssr(() => <Home />),
    },
  ],
});
