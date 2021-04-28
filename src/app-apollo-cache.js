import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemons: {
          read() {
            return pokemonsVar();
          },
        },
      },
    },
  },
});

const pokemonsInitialState = {};

export const pokemonsVar = makeVar(pokemonsInitialState);
