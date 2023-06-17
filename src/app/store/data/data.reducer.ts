import { createReducer, on } from '@ngrx/store';
import { DataState } from './models/data.state';
import { appDataInitialState } from './models/data.initialState';
import { addPokemonsAction, setPokemonsAction } from './data.actions';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

export const featureData = 'data';

export const DataReducer = createReducer<DataState>(
  appDataInitialState,
  on(setPokemonsAction, (state, action): DataState => {
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
  })
);
