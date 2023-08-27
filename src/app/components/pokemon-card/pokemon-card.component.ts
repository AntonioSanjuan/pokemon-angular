import { Component, Input } from '@angular/core';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() public pokemon!: IPokemon |undefined;
  @Input() public isLoading!: boolean;
}
