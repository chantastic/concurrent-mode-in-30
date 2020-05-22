import React from "react";
import PokemonList from "./pokemon-list";
import PokemonDetail from "./pokemon-detail";

let initialPokemon = {
  name: "bulbasaur",
  types: [
    {
      slot: 2,
      type: {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    },
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
  ],
};

let initialPokemonCollection = {
  count: 5,
  next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  previous: null,
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
  ],
};

const warnStatic = { border: "1px solid fuchsia" };

function App() {
  return (
    <div>
      <header style={{ fontSize: "2rem", fontWeight: "bold" }}>Pokedex</header>

      <React.Suspense fallback={<h1>Catching pokemon...</h1>}>
        <PokemonDetail resource={initialPokemon} style={warnStatic} />
      </React.Suspense>

      <PokemonList resource={initialPokemonCollection} style={warnStatic} />
    </div>
  );
}

export default App;
