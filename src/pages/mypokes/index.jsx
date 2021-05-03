import Head from "next/head";
import React from "react";
import Page from "../../components/Page";
import PokeCard, { PokesContainer } from "../../components/PokeCard";
import { useMyPokemons } from "../../apollo/useMyPokemons";

export default function MyPokes() {
  const { myPokes } = useMyPokemons();

  return (
    <div>
      <Head>
        <title>My Pokes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title="My Pokes">
        <PokesContainer data-testid="poke-container">
          {myPokes?.map((poke, index) => (
            <PokeCard
              poke={poke}
              key={poke.name + index}
              data-testid="mypoke-card"
            />
          ))}
        </PokesContainer>
      </Page>
    </div>
  );
}
