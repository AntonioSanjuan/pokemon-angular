import { createAction, props } from '@ngrx/store';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { IPokemonTypes } from 'src/app/models/internals/pokemonTypes.model';
import { IPokemons } from 'src/app/models/internals/pokemons.model';

export enum DataActionTypes {
  SetPokemons = '[Data] Set Pokemons Data',
  AddPokemons = '[Data] Add Pokemons Data',
  SetPokemonTypes = '[Data] Set PokemonTypes Data',
  SetFilteredPokemons = '[Data] Set Filtered Pokemons Data',

}

export const setPokemonsAction = createAction(
  DataActionTypes.SetPokemons,
  props<IPokemons>()
);

export const setFilteredPokemonsAction = createAction(
  DataActionTypes.SetFilteredPokemons,
  props<IFilteredPokemons>()
);

export const addPokemonsAction = createAction(
  DataActionTypes.AddPokemons,
  props<IPokemons>()
)

export const setPokemonTypesAction = createAction(
  DataActionTypes.SetPokemonTypes,
  props<IPokemonTypes>()
)