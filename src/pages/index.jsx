import { css } from "@emotion/react";
import Head from "next/head";
import Page from "../components/Page";
import PokeCard, { PokesContainer } from "../components/PokeCard";
import PokeCardPlaceholder from "../components/PokeCardPlaceholder";
import { pokes } from "../constants";
import React from "react";
import Button from "../components/Button";
import Container from "../components/Container";

export default function Home() {
  const renderPlaceholcers = React.useMemo(() => {
    return [0, 1, 2, 3, 4, 5].map((item) => <PokeCardPlaceholder key={item} />);
  }, []);

  return (
    <div>
      <Head>
        <title>Peekaachuw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <PokesContainer>
          {pokes.length === 0 ? (
            renderPlaceholcers
          ) : (
            <>
              {pokes.map((poke) => (
                <PokeCard poke={poke} key={poke.name} />
              ))}
            </>
          )}
        </PokesContainer>
        <Container
          css={css`
            padding-left: 1rem;
            padding-right: 1rem;
          `}
        >
          <Button
            css={css`
              width: 100%;
            `}
          >
            Load more
          </Button>
        </Container>
      </Page>
    </div>
  );
}
