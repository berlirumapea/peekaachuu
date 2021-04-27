import { css } from "@emotion/react";
import Head from "next/head";
import Page from "../../components/Page";
import { useRouter } from "next/router";

export default function PokemonDetail() {
  const router = useRouter();
  const title = router.query?.poke || "Pokemon Detail";

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
