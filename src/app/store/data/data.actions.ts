import { createAction, props } from '@ngrx/store';
import { IPokemonTypes } from 'src/app/models/internals/pokemonTypes.model';
import { IPokemons } from 'src/app/models/internals/pokemons.model';

export enum DataActionTypes {
  SetPokemons = '[Data] Set Pokemons Data',
  AddPokemons = '[Data] Add Pokemons Data',
  SetPokemonTypes = '[Data] Set PokemonTypes Data',
}

export const setPokemonsAction = createAction(
  DataActionTypes.SetPokemons,
  props<IPokemons>()
);

export const addPokemonsAction = createAction(
  DataActionTypes.AddPokemons,
  props<IPokemons>()
)

export const setPokemonTypesAction = createAction(
  DataActionTypes.SetPokemonTypes,
  props<IPokemonTypes>()
)