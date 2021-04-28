export function usePokemons(pokemonsVar) {
  const deletePokemon = (name) => {
    const pokemons = pokemonsVar();
    const filteredPokemons = pokemons.filter(
      (pokemon) => pokemon.name !== name
    );
    pokemonsVar(filteredPokemons);
  };

  return {
    operations: { deletePokemon },
  };
}
