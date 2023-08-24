import { createReducer, on } from '@ngrx/store';
import { DataState } from './models/data.state';
import { appDataInitialState } from './models/data.initialState';
import { addPokemonsAction, deleteFilteredPokemonsAction, setFilteredPokemonsAction, setPokemonTypesAction, setPokemonsAction } from './data.actions';

export const featureData = 'data';

export const DataReducer = createReducer<DataState>(
  appDataInitialState,
  on(setPokemonsAction, (state, action): DataState => {
    return {
      ...state,
      pokemons: action,
    };
  }),
  on(setFilteredPokemonsAction, (state, action): DataState => {
    return {
      ...state,
      filteredPokemons: action,
    };
  }),
  on(deleteFilteredPokemonsAction, (state): DataState => {
    return {
      ...state,
      filteredPokemons: undefined,
    };
  }),
  on(addPokemonsAction, (state, action): DataState => {
    return {
      ...state,
      pokemons: {
        prevPage: state.pokemons?.prevPage,
        ...action,
        data: state.pokemons?.data
          ? [...state.pokemons.data, ...action.data]
          : [...action.data]
      },
    };
  }),
  on(setPokemonTypesAction, (state, action): DataState => {
    return {
      ...state,
      pokemonTypes: action
    }
  })
);
