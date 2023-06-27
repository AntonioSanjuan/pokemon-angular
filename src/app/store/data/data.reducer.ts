import { createReducer, on } from '@ngrx/store';
import { DataState } from './models/data.state';
import { appDataInitialState } from './models/data.initialState';
import { addPokemonsAction, setPokemonTypesAction, setPokemonsAction } from './data.actions';
import { IPokemon } from 'src/app/models/internals/pokemons.model';
import { IPokemonTypes } from 'src/app/models/internals/pokemonTypes.model';

export const featureData = 'data';

export const DataReducer = createReducer<DataState>(
  appDataInitialState,
  on(setPokemonsAction, (state, action): DataState => {
    console.log("🚀 ~ file: data.reducer.ts:13 ~ on ~ action:", action)
    return {
      ...state,
      pokemons: action,
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
