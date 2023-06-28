import { NgModule } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokemonAdapter, PokemonTypesAdapter, PokemonsAdapter } from 'src/app/adapters/poke-api/poke-api.adapter';

const adapters = [PokemonsAdapter, PokemonAdapter, PokemonTypesAdapter]

@NgModule({
  declarations: [],
  providers: [
    PokeApiService,
    adapters,
  ],
  bootstrap: []
})
export class PokemonServiceModule { }
