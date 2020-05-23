import React from "react";
import PokemonList from "./pokemon-list";
import { suspensify, fetchPokemon, fetchPokemonCollection } from "./api";
import DelaySpinner from "./spinner";
import ErrorBoundary from "./error-boundary";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

function App() {
  let [currentPokemon, setPokemon] = React.useState(initialPokemon);
  // let [startTransition, isPending] = React.unstable_useTransition({
  //   timeoutMs: 500,
  // });
  let deferredPokemon = React.unstable_useDeferredValue(currentPokemon, {
    timeoutMs: 1000,
  });

  let isPending = currentPokemon !== deferredPokemon;

  return (
    <div>
      <header style={{ fontSize: "2rem", fontWeight: "bold" }}>Pokedex</header>

      <div
        style={{
          display: "grid",
          gridAutoColumns: "1fr",
          gridAutoFlow: "column",
        }}
      >
        <React.unstable_SuspenseList revealOrder="forwards" tail="collapsed">
          <div>
            <ErrorBoundary fallback="Couldn't catch 'em all...">
              <React.Suspense fallback={<div>catching pokemon...</div>}>
                <PokemonDetail resource={deferredPokemon} isStale={isPending}>
                  {(pokemon, details) => (
                    <React.Fragment>
                      {details}

                      <button
                        type="button"
                        onClick={() =>
                          setPokemon(suspensify(fetchPokemon(pokemon.id + 1)))
                        }
                      >
                        next
                      </button>
                      {isPending && <DelaySpinner />}
                    </React.Fragment>
                  )}
                </PokemonDetail>
              </React.Suspense>
            </ErrorBoundary>
          </div>

          <div>
            <React.Suspense fallback={<div>gotta catch 'em all...</div>}>
              <PokemonList
                as="ul"
                renderItem={(pokemon) => (
                  <li key={pokemon.id}>
                    <button
                      type="button"
                      onClick={
                        () =>
                          // startTransition(() =>
                          setPokemon(suspensify(fetchPokemon(pokemon.id)))
                        // )
                      }
                    >
                      {pokemon.id} {pokemon.name}
                    </button>
                  </li>
                )}
                resource={initialPokemonCollection}
              />
            </React.Suspense>
          </div>
        </React.unstable_SuspenseList>
      </div>
    </div>
  );
}

let initialPokemon = suspensify(fetchPokemon(10000));

let initialPokemonCollection = suspensify(fetchPokemonCollection());

export default App;
