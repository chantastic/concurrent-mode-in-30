import React from "react";

export default function PokemonDetail({
  resource,
  // children,
  ...props
}) {
  let pokemon = resource; // let pokemon = resource.read();

  return (
    <article>
      <Stats {...pokemon} />
    </article>
  );

  // return (
  //   <article {...props}>
  //     {typeof children === "function" ? (
  //       children(pokemon, <Stats {...pokemon} />)
  //     ) : (
  //     <Stats {...pokemon} />
  //     )}
  //   </article>
  // );
}

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
