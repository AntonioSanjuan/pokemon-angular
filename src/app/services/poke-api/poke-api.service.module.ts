import { NgModule } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokeApiAdapter, PokemonsAdapter } from 'src/app/adapters/poke-api/poke-api.adapter';

const adapters = [PokemonsAdapter, PokeApiAdapter]

@NgModule({
  declarations: [],
  providers: [
    PokeApiService,
    adapters,
  ],
  bootstrap: []
})
export class PokemonServiceModule { }
