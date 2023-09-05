import { featureData } from './data.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './models/data.state';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
import { IPokemonTypes } from 'src/app/models/internals/pokemonTypes.model';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { IPokemons } from 'src/app/models/internals/pokemons.model';

// feature selector
export const selectDataState = createFeatureSelector<DataState>(featureData);

// child selector
export const selectPokemons = createSelector(
  selectDataState,
  (state: DataState): IPokemons | undefined => state.pokemonList?.pokemons
);

export const selectPokemonTypes = createSelector(
  selectDataState,
  (state: DataState): IPokemonTypes | undefined => state.pokemonList?.filters?.pokemonTypes
);

export const selectFilteredPokemons = createSelector(
  selectDataState,
  (state: DataState): IFilteredPokemons | undefined => state.pokemonList?.filteredPokemons
);

export const selectDetailedPokemons = createSelector(
  selectDataState,
  (state: DataState): IDetailedPokemons | undefined => state.detailedPokemons
);

export const selectDetailedPokemonsByName = (pokemonNames: string[]) => createSelector(
  selectDataState,
  (state: DataState): IDetailedPokemons | undefined => {
    return {
      ...state.detailedPokemons,
      data: state.detailedPokemons?.data.filter((detailedPokemon) => { 
        return pokemonNames.includes(detailedPokemon.name)})
    } as IDetailedPokemons | undefined;
  }  
);