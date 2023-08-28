import { createReducer, on } from '@ngrx/store';
import { DataState } from './models/data.state';
import { appDataInitialState } from './models/data.initialState';
import { addDetailedPokemonAction, addPokemonsAction, deleteFilteredPokemonsAction, setFilteredPokemonsAction, setPokemonTypesAction, setPokemonsAction } from './data.actions';

export const featureData = 'data';

export const DataReducer = createReducer<DataState>(
  appDataInitialState,
  on(setPokemonsAction, (state, action): DataState => {
    return {
      ...state,
      pokemonList: {
        ...state.pokemonList,
        pokemons: action
      }
    };
  }),
  on(setFilteredPokemonsAction, (state, action): DataState => {
    return {
      ...state,
      pokemonList: {
        ...state.pokemonList,
        filteredPokemons: action,
      }
    };
  }),
  on(deleteFilteredPokemonsAction, (state): DataState => {
    return {
      ...state,
      pokemonList: {
        ...state.pokemonList,
        filteredPokemons: undefined,
      }
    };
  }),
  on(addPokemonsAction, (state, action): DataState => {
    return {
      ...state,
      pokemonList: {
        ...state.pokemonList,
        pokemons: {
          prevPage: state.pokemonList?.pokemons?.prevPage,
          ...action,
          data: state.pokemonList?.pokemons?.data
            ? [...state.pokemonList.pokemons.data, ...action.data]
            : [...action.data]
        },
      }
 
    };
  }),
  on(setPokemonTypesAction, (state, action): DataState => {
    return {
      ...state,
      pokemonList: {
        ...state.pokemonList,
        filters: {
          ...state.pokemonList?.filters,
          pokemonTypes: action

        }
      }
    }
  }),
  on(addDetailedPokemonAction, (state, action): DataState => {
    return {
      ...state,
      detailedPokemons: {
        ...state.detailedPokemons,
        data: state.detailedPokemons?.data
        ? [...state.detailedPokemons?.data, ...action.data]
        : [...action.data]
      }
    };
  }),
);
