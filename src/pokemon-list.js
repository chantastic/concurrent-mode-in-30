import React from "react";

export default function PokemonList({ resource, ...props }) {
  return (
    <ul {...props}>
      {resource.read().results.map((pokemon) => (
        <li>{pokemon.name}</li>
      ))}
    </ul>
  );
}
