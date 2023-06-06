import { NgModule } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { StoreModule } from '@ngrx/store';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';
import { PokemonAdapter, PokemonsAdapter } from 'src/app/adapters/pokemon/pokemon.adapter';
import { PokemonManager } from '../pokemonManager/pokemonManager.service';

const adapters = [PokemonsAdapter, PokemonAdapter]

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(featureData, DataReducer),
  ],
  providers: [
    PokemonService,
    PokemonManager,
    adapters
  ],
  bootstrap: []
})
export class PokemonServiceModule { }
