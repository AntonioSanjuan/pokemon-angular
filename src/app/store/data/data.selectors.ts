import { featureData } from './data.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './models/data.state';

// feature selector
export const selectDataState = createFeatureSelector<DataState>(featureData);

// child selector
export const selectPokemons = createSelector(
  selectDataState,
  (state) => state.pokemons
);

export const selectPokemonTypes = createSelector(
  selectDataState,
  (state) => state.pokemonTypes
);