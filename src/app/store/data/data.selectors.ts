import { featureData } from './data.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './models/data.state';

// feature selector
export const selectDataState = createFeatureSelector<DataState>(featureData);

// child selector
export const selectPokemons = createSelector(
  selectDataState,
  (state) => state.pokemonList?.pokemons
);

export const selectPokemonTypes = createSelector(
  selectDataState,
  (state) => state.pokemonList?.filters?.pokemonTypes
);

export const selectFilteredPokemons = createSelector(
  selectDataState,
  (state) => state.pokemonList?.filteredPokemons
);

export const selectDetailedPokemons = createSelector(
  selectDataState,
  (state) => state.detailedPokemons
);

export const selectDetailedPokemon = (pokemonName: string) => createSelector(
  selectDataState,
  (state) => state.detailedPokemons.data.find((detailedPokemon) => { return detailedPokemon.name === pokemonName})
);