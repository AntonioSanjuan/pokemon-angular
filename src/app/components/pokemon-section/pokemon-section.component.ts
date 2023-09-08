import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-section',
  templateUrl: './pokemon-section.component.html',
  styleUrls: ['./pokemon-section.component.scss'],
})
export class PokemonSection {
  constructor(
    private readonly router: Router,
  ) {}

  public goToPokemonDetails(pokemon: IPokemon) {
    this.router.navigate([`/home/${pokemon?.name}`]);
  }
}
