import { createReducer, on } from '@ngrx/store';
import { DataState } from './models/data.state';
import { appDataInitialState } from './models/data.initialState';
import { setPokemonAction } from './data.actions';

export const featureData = 'data';

export const DataReducer = createReducer<DataState>(
  appDataInitialState,
  on(setPokemonAction, (state, action): DataState => {
    return {
      ...state,
      pokemons: action,
    };
  })
);
