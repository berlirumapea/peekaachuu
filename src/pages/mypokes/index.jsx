import Head from "next/head";
import Page from "../../components/Page";
import PokeCard, { PokesContainer } from "../../components/PokeCard";

export default function MyPokes() {
  const pokemons = [];
  return (
    <div>
      <Head>
        <title>My Pokes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title="My Pokes">
        <PokesContainer>
          {pokemons?.results?.map((poke) => (
            <PokeCard poke={poke} key={poke.name} />
          ))}
        </PokesContainer>
      </Page>
    </div>
  );
}
