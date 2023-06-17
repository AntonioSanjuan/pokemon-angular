import { createAction, props } from '@ngrx/store';
import { IPokemons } from 'src/app/models/internals/pokemons.model';

export enum DataActionTypes {
  SetPokemons = '[Data] Set Pokemons Data',
  AddPokemons = '[Data] Add Pokemons Data',
}

export const setPokemonsAction = createAction(
    DataActionTypes.SetPokemons,
  props<IPokemons>()
);

export const addPokemonsAction = createAction(
  DataActionTypes.AddPokemons,
  props<IPokemons>()
)