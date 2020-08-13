import React from "react";
import { suspensify, fetchPokemonCollection } from "./api";

let resource = suspensify(fetchPokemonCollection());

export default function PokemonList({
  as: As = React.Fragment,
  // resource,
  renderItem = (pokemon) => <li>{pokemon.name}</li>,
  ...props
}) {
  return <As {...props}>{resource.read().results.map(renderItem)}</As>;
}
