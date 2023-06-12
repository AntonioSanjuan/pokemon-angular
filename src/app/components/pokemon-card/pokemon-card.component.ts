import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() public pokemon!: Pokemon |undefined;
  @Input() public isLoading!: boolean;

  

}
