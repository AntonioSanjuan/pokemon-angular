import { IDetailedPokemons } from "src/app/models/internals/detailedPokemons.model";
import { IFilteredPokemons } from "src/app/models/internals/filteredPokemons.model";
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model";
import { IPokemons } from "src/app/models/internals/pokemons.model";

export interface DataState {
  pokemonList?: DataPokemonListState,
  detailedPokemons?: IDetailedPokemons
}

export interface DataPokemonListState {
  pokemons?: IPokemons;
  filteredPokemons?: IFilteredPokemons;
  filters?: {
    pokemonTypes?: IPokemonTypes;
  }
}
