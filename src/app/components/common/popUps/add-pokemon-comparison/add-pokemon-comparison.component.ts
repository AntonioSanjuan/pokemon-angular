import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-add-pokemon-comparison',
  templateUrl: './add-pokemon-comparison.component.html',
  styleUrls: ['./add-pokemon-comparison.component.scss']
})
export class AddPokemonComparisonComponent {
  constructor(
    private readonly router: Router,
  ) {}
  public addNewPokemonComparison(pokemon: IPokemon) {
    this.router.navigate([`${this.router.url}-vs-${pokemon.name}`], { replaceUrl: true });
  }

}
