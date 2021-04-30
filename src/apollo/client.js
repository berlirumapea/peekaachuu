import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
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
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache,
  typeDefs: typeDefs,
});

export default client;
