import React from "react";
import { css } from "@emotion/react";
import Head from "next/head";
import { useLazyQuery } from "@apollo/client";
import Page from "../components/Page";
import PokeCard, { PokesContainer } from "../components/PokeCard";
import PokeCardPlaceholder from "../components/PokeCardPlaceholder";
import Container from "../components/Container";
import client from "../apollo/client";
import { PokemonsQuery } from "../queries";

export async function getStaticProps() {
  const { data } = await client.query({
    query: PokemonsQuery,
    fetchPolicy: "cache-first",
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}

export default function Home({ pokemons }) {
  const renderPlaceholcers = React.useMemo(() => {
    return [0, 1, 2, 3, 4, 5].map((item) => <PokeCardPlaceholder key={item} />);
  }, []);

  /*
    Since I use useLazyQuery here, the cached data won't be automatically
    rendered on init, instead the cached data will be rendered after you
    click Load More button, which I think it's not bad 
  */

  const [loadMore, { loading, data, fetchMore }] = useLazyQuery(PokemonsQuery, {
    /*
      Since pokemons data won't be changing frequently, I use cache-first so
      it will decrease our request time
    */
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const onLoadMore = () => {
    /*
      At init, fetch more will undefined since loadMore function will be called
      on Load More button. So we need to call it first and after that we can call fetchMore
    */
    if (!fetchMore) {
      return loadMore({
        variables: {
          offset: pokemons?.nextOffset,
          limit: 10,
        },
      });
    } else {
      return fetchMore({
        variables: {
          offset: data?.pokemons?.nextOffset,
          limit: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            pokemons: {
              ...fetchMoreResult.pokemons,
              results: [
                ...prev.pokemons.results,
                ...fetchMoreResult.pokemons.results,
              ],
            },
          });
        },
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Peekaachuw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <PokesContainer>
          {/* This one is to render the data on server */}
          {pokemons?.results?.map((poke) => (
            <PokeCard poke={poke} key={poke.name} />
          ))}

          {/* And this one is to render the data on client */}
          {data?.pokemons?.results?.map((poke) => (
            <PokeCard poke={poke} key={poke.name} />
          ))}
          {loading ? renderPlaceholcers : null}
        </PokesContainer>
        <Container
          css={css`
            padding-left: 1rem;
            padding-right: 1rem;

            button {
              width: 100%;
              outline: none;
              background-color: var(--primary);
              border: 2px solid var(--tertiary);
              font-weight: 500;
              font-size: 1rem;
              padding-top: 10px;
              padding-bottom: 10px;
              cursor: pointer;

              &:active {
                box-shadow: inset 0px 0px 999px 100px rgba(0, 0, 0, 0.08);
              }
            }
          `}
        >
          <button onClick={onLoadMore}>Load more</button>
        </Container>
      </Page>
    </div>
  );
}
