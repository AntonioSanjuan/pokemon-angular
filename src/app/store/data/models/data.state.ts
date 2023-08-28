import { IFilteredPokemons } from "src/app/models/internals/filteredPokemons.model";
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model";
import { IPokemons } from "src/app/models/internals/pokemons.model";

export interface DataState {
  pokemonList?: DataPokemonListState
}

export interface DataPokemonListState {
  pokemons?: IPokemons;
  filteredPokemons?: IFilteredPokemons;
  filters?: {
    pokemonTypes?: IPokemonTypes;
  }
}
