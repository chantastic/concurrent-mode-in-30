import React from "react";
import ErrorBoundary from "./error-boundary";
import { suspensify, fetchPokemon } from "./api.js";
// import PokemonDetail from "./pokemon-detail";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));
const PokemonList = React.lazy(() => import("./pokemon-list"));

function App() {
  let [pokemon, updatePokemon] = React.useState(initialPokemon);
  let [startTransition, isPending] = React.unstable_useTransition({
    timeoutMs: 2000,
  });

  return (
    <div>
      <header style={{ fontSize: "2rem", fontWeight: "bold" }}>Pokedex</header>

      <ErrorBoundary>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
          <React.unstable_SuspenseList revealOrder="forwards" tail="collapsed">
            <React.Suspense fallback={<div>...fetching your pokemon</div>}>
              <div>
                <PokemonDetail resource={pokemon}>
                  {(resolvedPokemon, stats) => (
                    <>
                      <div style={isPending ? { color: "gray" } : null}>
                        {stats}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          startTransition(() =>
                            updatePokemon(
                              suspensify(fetchPokemon(resolvedPokemon.id + 1))
                            )
                          )
                        }
                      >
                        Next
                        {isPending && "…"}
                      </button>
                    </>
                  )}
                </PokemonDetail>
              </div>
            </React.Suspense>
            <React.Suspense fallback={<div>...gotta fetch 'em all</div>}>
              <div>
                <PokemonList />
              </div>
            </React.Suspense>
          </React.unstable_SuspenseList>
        </div>
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
