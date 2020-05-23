import sleep from "sleep-promise";

export function fetchPokemon(id = 1) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((pokemon) => ({ ...pokemon }))
    .then(sleep(1000));
}

export function fetchPokemonCollection() {
  return fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then((res) => res.json())
    .then((res) => ({
      ...res,
      results: res.results.map((pokemon) => ({
        ...pokemon,
        id: pokemon.url.split("/")[6],
      })),
    }))
    .then(sleep(2000));
}

export function suspensify(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
