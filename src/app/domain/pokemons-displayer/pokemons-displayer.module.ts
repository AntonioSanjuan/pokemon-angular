import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DataReducer, featureData } from '../store/data/data.reducer';
import { PokemonServiceModule } from 'src/app/adapters/poke-api/poke-api.service.module';

@NgModule({
  imports: [
    StoreModule.forFeature(featureData, DataReducer),
    PokemonServiceModule
  ],
})
export class PokemonsDisplayerModule { }
