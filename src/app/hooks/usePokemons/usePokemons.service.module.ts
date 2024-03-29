import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PokemonServiceModule } from 'src/app/services/poke-api/poke-api.service.module';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';
import { UsePokemons } from './usePokemons.service';

@NgModule({
  providers: [UsePokemons],
  imports: [
    StoreModule.forFeature(featureData, DataReducer),
    PokemonServiceModule
  ],
})
export class UsePokemonsModule { }
