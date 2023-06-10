import { createAction, props } from '@ngrx/store';
import { IPokemons } from 'src/app/models/internals/pokemons.model';

export enum DataActionTypes {
  SetPokemons = '[Data] Set Data Pokemons',
}

export const setPokemonAction = createAction(
    DataActionTypes.SetPokemons,
  props<IPokemons>()
);