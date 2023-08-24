import { Component, Input } from '@angular/core';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  constructor(public usePokemons: UsePokemons) {}
  
  @Input() public pokemons!: IPokemon[] | undefined;
  @Input() public infiniteListScroll: boolean = false;
  @Input() public loading: boolean = false;

  public isIntersecting(intersecting: boolean) {
    if(this.infiniteListScroll && intersecting ) {
      this.usePokemons.fetchNextPokemons()
    }
  }
}
