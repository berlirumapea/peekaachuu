import React from "react";
import { css } from "@emotion/react";
import Head from "next/head";
import { useLazyQuery, useQuery } from "@apollo/client";
import Page from "../components/Page";
import PokeCard, { PokesContainer } from "../components/PokeCard";
import PokeCardPlaceholder from "../components/PokeCardPlaceholder";
import Container from "../components/Container";
import client from "../apollo/client";
import { PokemonsQuery } from "../queries";
import LoadMoreButton from "../components/LoadMoreButton";

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
  // indicate a total of load more being clicked
  const renderPlaceholcers = React.useMemo(() => {
    return [0, 1, 2, 3, 4, 5].map((item) => (
      <PokeCardPlaceholder key={item} data-testid="placeholder" />
    ));
  }, []);

  const { data, loading, fetchMore, error } = useQuery(PokemonsQuery, {
    variables: {
      limit: 10,
      offset: pokemons?.nextOffset,
    },
    notifyOnNetworkStatusChange: true,
  });

  const onLoadMore = () => {
    fetchMore({
      variables: {
        limit: 10,
        offset: data?.pokemons?.nextOffset,
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
            <PokeCard poke={poke} key={poke.name} data-testid="poke-card" />
          ))}

          {/* And this one is to render the data on client */}
          {data?.pokemons?.results?.map((poke) => (
            <PokeCard poke={poke} key={poke.name} data-testid="poke-card-new" />
          ))}
          {loading ? renderPlaceholcers : null}
        </PokesContainer>

        <LoadMoreButton onClick={onLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </LoadMoreButton>
      </Page>
    </div>
  );
}

// I CANT TEST USELAZYQUERY SO FUCK IT I WILL JUST USE USEQUERY

/*
    Since I use useLazyQuery here, the cached data won't be automatically
    rendered on init, instead the cached data will be rendered after you
    click Load More button, which I think it's not bad 
  */

// const [loadMore, { loading, data, fetchMore }] = useLazyQuery(PokemonsQuery, {
//   variables: {
//     offset: pokemons?.nextOffset,
//     limit: 10,
//   },
//   /*
//     Since pokemons data won't be changing frequently, I use cache-first so
//     it will decrease our request time
//   */
//   fetchPolicy: "cache-first",
//   notifyOnNetworkStatusChange: true,
// });

// const onLoadMore = () => {
//   /*
//     At init, fetch more will undefined since loadMore function will be called
//     on Load More button. So we need to call it first and after that we can call fetchMore
//   */
//   if (!fetchMore) {
//     loadMore();
//   } else {
//     fetchMore({
//       variables: {
//         offset: data?.pokemons?.nextOffset,
//         limit: 10,
//       },
//       updateQuery: (prev, { fetchMoreResult }) => {
//         if (!fetchMoreResult) return prev;
//         return Object.assign({}, prev, {
//           pokemons: {
//             ...fetchMoreResult.pokemons,
//             results: [
//               ...prev.pokemons.results,
//               ...fetchMoreResult.pokemons.results,
//             ],
//           },
//         });
//       },
//     });
//   }
// };
