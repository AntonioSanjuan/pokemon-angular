import { Component } from '@angular/core';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

@Component({
  selector: 'app-pokemon-section-details',
  templateUrl: './pokemon-section-details.component.html',
  styleUrls: ['./pokemon-section-details.component.scss'],
})
export class PokemonSectionDetails {
  constructor(
    public usePokemons: UsePokemons, 
  ) {}
}
