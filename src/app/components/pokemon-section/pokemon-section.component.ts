import { Component } from '@angular/core';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

@Component({
  selector: 'app-pokemon-section',
  templateUrl: './pokemon-section.component.html',
  styleUrls: ['./pokemon-section.component.scss'],
})
export class PokemonSection {
  constructor(
    public usePokemons: UsePokemons, 
    public useFilterPokemons: UseFilterPokemons
  ) {}
}
