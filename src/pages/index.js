import { css } from "@emotion/react";
import Head from "next/head";
import Page from "../components/Page";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Peekaachuw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div
          css={css`
          height: inherit;
          display: flex;
          justify-content: center;
          align-items: center
        `}
        >
          Index
        </div>
      </Page>
    </div>
  );
}
