import React from "react";
import PokemonDetail from "./pokemon-detail";

function App() {
  return (
    <>
      <h1>Pokedex</h1>
      <div>
        <PokemonDetail resource={initialPokemon} />
      </div>
    </>
  );
}

let initialPokemon = {
  name: "bulbasaur",
  types: [
    {
      slot: 2,
      type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
    },
    {
      slot: 1,
      type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
    },
  ],
};

export default App;
