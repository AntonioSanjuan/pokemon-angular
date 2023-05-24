import { NgModule } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonAdapter } from './pokemon.adapter';

@NgModule({
  declarations: [],
  imports: [],
  providers: [PokemonService, PokemonAdapter],
  bootstrap: []
})
export class PokemonAdapterModule { }
