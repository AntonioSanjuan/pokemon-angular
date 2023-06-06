import { NgModule } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { StoreModule } from '@ngrx/store';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';
import { PokeApiAdapter, PokemonsAdapter } from 'src/app/adapters/poke-api/poke-api.adapter';
import { PokemonManager } from '../pokemonManager/pokemonManager.service';

const adapters = [PokemonsAdapter, PokeApiAdapter]

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(featureData, DataReducer),
  ],
  providers: [
    PokeApiService,
    PokemonManager,
    adapters
  ],
  bootstrap: []
})
export class PokemonServiceModule { }
