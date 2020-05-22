import React from "react";
import PokemonList from "./pokemon-list";
import { suspensify, fetchPokemon, fetchPokemonCollection } from "./api";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

function App() {
  return (
    <div>
      <header style={{ fontSize: "2rem", fontWeight: "bold" }}>Pokedex</header>

      <React.Suspense fallback={<div>catching pokemon...</div>}>
        <PokemonDetail resource={initialPokemon} />
      </React.Suspense>

      <React.Suspense fallback={<div>catching pokemon...</div>}>
        <PokemonList resource={initialPokemonCollection} />
      </React.Suspense>
    </div>
  );
}

let initialPokemon = suspensify(fetchPokemon(2));

let initialPokemonCollection = suspensify(fetchPokemonCollection());

let warnStatic = { border: "1px solid fuchsia" };

export default App;
