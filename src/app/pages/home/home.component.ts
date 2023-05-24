import { Component } from '@angular/core';
import { PokemonAdapter } from 'src/app/adapters/pokemon/pokemon.adapter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private pokemonAdapter: PokemonAdapter) {}

  private page: number = 0;

  async ngOnInit() {
    this.pokemonAdapter.getPokemons(this.page).subscribe((pokemons) => {
      console.log("🚀 ~ file: home.component.ts:16 ~ HomeComponent ~ this.pokemonAdapter.getPokemons ~ resp:", pokemons)
    })
  }
}
