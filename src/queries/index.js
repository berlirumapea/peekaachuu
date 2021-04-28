import { gql } from "@apollo/client";

export const PokemonsQuery = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      nextOffset
      results {
        url
        name
        image
      }
    }
  }
`;

export const PokemonDetailQuery = gql`
  query Query($pokemonName: String!) {
    pokemon(name: $pokemonName) {
      id
      name
      species {
        url
      }
      weight
      moves {
        move {
          name
        }
      }
      sprites {
        front_default
      }
      types {
        type {
          name
        }
        slot
      }
      abilities {
        ability {
          name
        }
      }
      height
      base_experience
      order
    }
  }
`;
