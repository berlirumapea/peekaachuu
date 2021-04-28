import { gql } from "@apollo/client";

export const PokemonsQuery = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      nextOffset
      prevOffset
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;
