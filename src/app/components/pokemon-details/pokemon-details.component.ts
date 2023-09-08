import { Component, Input } from '@angular/core';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {
  @Input() pokemons!: IDetailedPokemons;
}
