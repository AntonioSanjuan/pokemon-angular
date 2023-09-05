import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-section',
  templateUrl: './pokemon-section.component.html',
  styleUrls: ['./pokemon-section.component.scss'],
})
export class PokemonSection {
  public filteredPokemons$: Observable<IFilteredPokemons | undefined>
  constructor(
    public useFilterPokemons: UseFilterPokemons,
    private readonly router: Router,

  ) {
    this.filteredPokemons$ = this.useFilterPokemons.filteredPokemons$
  }

  public goToPokemonDetails(pokemon: IPokemon) {
    this.router.navigate([`/home/${pokemon?.name}`]);
  }
}
