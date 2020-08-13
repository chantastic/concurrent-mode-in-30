/*
 * 1. import PokemonDetail dynamically
 * * app breaks because it loads with the component it needs to render
 * * this means it's working
 * 2. wrap in ErrorBoundary with Fallback
 * * you can get this off the shelf by googling "react error boundary"
 * * yay! we caught the error but it still doesn't work
 * * read error
 * 3. wrap in React.Suspense component with fallback
 */
import React from "react";
import ErrorBoundary from "./error-boundary";
import { suspensify, fetchPokemon } from "./api.js";
// import PokemonDetail from "./pokemon-detail";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

function App() {
  return (
    <div>
      <header style={{ fontSize: "2rem", fontWeight: "bold" }}>Pokedex</header>

      <ErrorBoundary>
        <React.Suspense fallback="...gotta catch 'em all">
          <PokemonDetail resource={initialPokemon} />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

let initialPokemon = suspensify(
  fetchPokemon(4)
  // Promise.reject()
  // new Promise(() => {})
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
