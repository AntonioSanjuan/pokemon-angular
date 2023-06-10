import { NgModule } from '@angular/core';
import { PokeApiService } from './poke-api.service';
import { PokeApiMapper, PokemonsAdapter } from '../mappers/poke-api/poke-api-mapper';

const adapters = [PokemonsAdapter, PokeApiMapper]

@NgModule({
  declarations: [],
  providers: [
    PokeApiService,
    adapters,
  ],
  bootstrap: []
})
export class PokemonServiceModule { }
