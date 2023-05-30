import { NgModule } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonAdapter, PokemonsAdapter } from '../../adapters/common/adapter';

const adapters = [PokemonsAdapter, PokemonAdapter]

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    PokemonService,
    adapters
  ],
  bootstrap: []
})
export class PokemonServiceModule { }
