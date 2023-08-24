import { IFilteredPokemons } from "src/app/models/internals/filteredPokemons.model";
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model";
import { IPokemons } from "src/app/models/internals/pokemons.model";

export interface DataState {
  pokemons?: IPokemons;
  pokemonTypes?: IPokemonTypes
  filteredPokemons?: IFilteredPokemons
}
