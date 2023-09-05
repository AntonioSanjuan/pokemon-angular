import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PokemonServiceModule } from 'src/app/services/poke-api/poke-api.service.module';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';
import { UsePokemonTypes } from './usePokemonTypes.service';

@NgModule({
  providers: [UsePokemonTypes],
  imports: [
    StoreModule.forFeature(featureData, DataReducer),
    PokemonServiceModule
  ],
})
export class UsePokemonTypesModule { }
