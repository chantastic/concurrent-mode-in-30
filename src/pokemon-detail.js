import React from "react";

export default function PokemonDetail({
  resource,
  isStale,
  children,
  ...props
}) {
  let pokemon = resource.read();

  function Stats(props) {
    return (
      <React.Fragment>
        <h1>{props.name}</h1>
        <ol>
          {props.types.map(({ type }) => (
            <li key={type.name}>{type.name}</li>
          ))}
        </ol>
      </React.Fragment>
    );
  }

  return (
    <article {...props} style={isStale ? { color: "lightgray" } : null}>
      {typeof children === "function" ? (
        children(pokemon, <Stats {...pokemon} />)
      ) : (
        <Stats {...pokemon} />
      )}
    </article>
  );
}
