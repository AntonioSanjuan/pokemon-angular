import { Component } from '@angular/core';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  constructor(public usePokemons: UsePokemons) {}

  public isIntersecting(intersecting: boolean) {
    if(intersecting) {
      this.usePokemons.fetchNextPokemons()
    }
  }
}
