import React from "react";

export default function PokemonDetail({ resource, ...props }) {
  let { name, types } = resource;

  return (
    <article {...props}>
      <h1>{name}</h1>
      <ol>
        {types.map(({ type }) => (
          <li>{type.name}</li>
        ))}
      </ol>
    </article>
  );
}
