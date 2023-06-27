import { NgModule } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokeApiAdapter, PokemonTypesAdapter, PokemonsAdapter } from 'src/app/adapters/poke-api/poke-api.adapter';

const adapters = [PokemonsAdapter, PokeApiAdapter, PokemonTypesAdapter]

@NgModule({
  declarations: [],
  providers: [
    PokeApiService,
    adapters,
  ],
  bootstrap: []
})
export class PokemonServiceModule { }
