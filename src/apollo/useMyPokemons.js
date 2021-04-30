import { useReactiveVar } from "@apollo/client";
import React from "react";
import { myPokesVar } from "./client";

export function useMyPokemons() {
  /* 
    set initial value of reactive variable
    from localStorage
  */
  const myPokesLocalStorage = localStorage.getItem("myPokes")
    ? JSON.parse(localStorage.getItem("myPokes"))
    : [];

  React.useEffect(() => {
    myPokesVar(myPokesLocalStorage);
  }, []);

  const createNewPokeId = (allPokes) => {
    return allPokes.reduce((maxId, poke) => Math.max(poke.id, maxId), -1) + 1;
  };

  const catchPoke = (poke) => {
    const pokeItem = {
      id: createNewPokeId(myPokesLocalStorage),
      ...poke,
    };

    const newPokes = [...myPokesLocalStorage, pokeItem];

    // persist it to localStorage
    localStorage.setItem("myPokes", JSON.stringify(newPokes));

    // also update the reactive var
    return myPokesVar(newPokes);
  };

  const releasePoke = (pokeId) => {
    const newPokes = myPokesLocalStorage.filter((poke) => poke.id !== pokeId);

    // persist it to localStorage
    localStorage.setItem("myPokes", JSON.stringify(newPokes));

    // also update the reactive var
    return myPokesVar(newPokes);
  };

  return {
    myPokes: useReactiveVar(myPokesVar),
    operations: { catchPoke, releasePoke },
  };
}
