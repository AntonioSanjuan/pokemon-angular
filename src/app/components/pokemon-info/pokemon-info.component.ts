import { Component, Input } from '@angular/core';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss']
})
export class PokemonInfoComponent {
  @Input() pokemon!: IPokemon
}
