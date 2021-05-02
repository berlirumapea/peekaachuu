import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import fetch from "cross-fetch";
import { createHttpLink } from "apollo-link-http";
import { typeDefs } from "../queries";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        myPokes: {
          read() {
            return myPokeVar();
          },
        },
      },
    },
  },
});

export const myPokesVar = makeVar([]);

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    fetch: fetch,
  }),
  cache,
  typeDefs: typeDefs,
});

export default client;
