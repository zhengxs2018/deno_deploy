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
        <link rel="stylesheet" href="/reset.css" />
      </Helmet>

      <h1>Hello nano!</h1>
    </Fragment>
  );
}

export default Home;
