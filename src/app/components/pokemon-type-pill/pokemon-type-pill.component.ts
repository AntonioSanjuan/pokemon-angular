import { Component, Input } from '@angular/core';
import { IPokemonType } from 'src/app/models/internals/pokemonTypes.model';

@Component({
  selector: 'app-pokemon-type-pill',
  templateUrl: './pokemon-type-pill.component.html',
  styleUrls: ['./pokemon-type-pill.component.scss']
})
export class PokemonTypePillComponent {
  @Input() public pokemonType!: IPokemonType | undefined;
}
