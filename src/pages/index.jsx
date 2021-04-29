import { css } from "@emotion/react";
import Head from "next/head";
import Page from "../components/Page";
import PokeCard, { PokesContainer } from "../components/PokeCard";
import PokeCardPlaceholder from "../components/PokeCardPlaceholder";
import React from "react";
import Button from "../components/Button";
import Container from "../components/Container";

import client from "../app-apollo-client";
import { PokemonsQuery } from "../queries";
import { useLazyQuery } from "@apollo/client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: PokemonsQuery,
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

  const [loadMore, { loading, data, fetchMore }] = useLazyQuery(PokemonsQuery, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const onLoadMore = () => {
    // fetchMore will be undefined if we dont run loadMore first
    if (!fetchMore) {
      return loadMore({
        variables: {
          offset: pokemons?.nextOffset,
          limit: 10,
        },
      });
    } else {
      // then we can use the pagination
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
          {pokemons?.results?.map((poke) => (
            <PokeCard poke={poke} key={poke.name} />
          ))}
          {data?.pokemons?.results?.map((poke) => (
            <PokeCard poke={poke} key={poke.name} />
          ))}
          {loading ? renderPlaceholcers : null}
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
            onClick={onLoadMore}
          >
            Load more
          </Button>
        </Container>
      </Page>
    </div>
  );
}
