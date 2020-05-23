/* 
  # Suspense for components
    - import PokemonDetail dynamically and wrap in `React.lazy`
    - ErrorBoundary w/fallback
    - React Suspense w/fallback
  # Wrap Data promises
    - import 
 */
import React from "react";
import ErrorBoundary from "./error-boundary";
import { suspensify } from "./api";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

function App() {
  return (
    <div>
      <header style={{ fontSize: "2rem", fontWeight: "bold" }}>Pokedex</header>

      <ErrorBoundary>
        <React.Suspense fallback={<div>Catching Pokemon...</div>}>
          <PokemonDetail resource={initialPokemon} />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

let initialPokemon = suspensify(
  new Promise((_) => {})
  // Promise.resolve({
  //   name: "bulbasaur",
  //   types: [
  //     {
  //       slot: 2,
  //       type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
  //     },
  //     {
  //       slot: 1,
  //       type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
  //     },
  //   ],
  // })
);

export default App;
