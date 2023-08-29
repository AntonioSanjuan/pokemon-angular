import { Component } from '@angular/core';
import { UseDetailedPokemons } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service';
@Component({
  selector: 'app-pokemon-section-details',
  templateUrl: './pokemon-section-details.component.html',
  styleUrls: ['./pokemon-section-details.component.scss'],
})
export class PokemonSectionDetails {
  constructor(
    public useDetailedPokemons: UseDetailedPokemons, 
  ) {}
}
