import { Component } from '@angular/core';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  providers: [UsePokemons]

})
export class PokemonListComponent {
  constructor(public usePokemons: UsePokemons) {}

  private page: number = 0;

  ngOnInit() {
    this.usePokemons.fetchPokemons(this.page)
  }
}
