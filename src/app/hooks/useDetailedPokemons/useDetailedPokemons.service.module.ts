import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PokemonServiceModule } from 'src/app/services/poke-api/poke-api.service.module';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';
import { UseDetailedPokemons } from './useDetailedPokemons.service';

@NgModule({
  providers: [UseDetailedPokemons],
  imports: [
    StoreModule.forFeature(featureData, DataReducer),
    PokemonServiceModule
  ],
})
export class UseDetailedPokemonsModule { }
