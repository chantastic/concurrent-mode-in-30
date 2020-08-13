import React from "react";
import { suspensify, fetchPokemon } from "./api";
import ErrorBoundary from "./error-boundary";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

function App() {
  let [currentPokemon, setCurrentPokemon] = React.useState(initialPokemon);
  let [startTransition, isPending] = React.unstable_useTransition({
    timeoutMs: 1000,
  });

  return (
    <div>
      <header style={{ fontSize: "2rem", fontWeight: "bold" }}>Pokedex</header>

      <ErrorBoundary fallback={<h1>couldn't catch 'em all...</h1>}>
        <React.Suspense fallback={<h1>fetching pokemon...</h1>}>
          <PokemonDetail resource={currentPokemon} isStale={isPending}>
            {(pokemon, detail) => (
              <React.Fragment>
                {detail}
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() =>
                      setCurrentPokemon(
                        suspensify(fetchPokemon(pokemon.id + 1))
                      )
                    )
                  }
                >
                  next {isPending && "..."}
                </button>
              </React.Fragment>
            )}
          </PokemonDetail>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

let initialPokemon = suspensify(fetchPokemon(2));

export default App;
