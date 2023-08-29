import { DataState } from "./data.state";

export const appDataInitialState: DataState = {
  pokemonList: {
    pokemons: undefined,
    filteredPokemons: undefined,
    filters: {
      pokemonTypes: undefined,
    }
  },
  detailedPokemons: undefined
};
