/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { h, Helmet, Fragment } from "nano_jsx";

function Home() {
  return (
    <Fragment>
      <Helmet>
        <title>测试 SSR</title>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/reset.css" />
      </Helmet>

      <div class="bg-white flex h-screen">
        <h1 class="text-5xl text-gray-600 m-auto mt-20">Hello nano!</h1>
      </div>
    </Fragment>
  );
}

export default Home;
