import { css } from "@emotion/react";
import Head from "next/head";
import Page from "../../components/Page";

export default function MyPokemons() {
  const title = "My Peekaachuw";
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Page title={title}>
        <div
          css={css`
            height: inherit;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        ></div>
      </Page>
    </div>
  );
}
