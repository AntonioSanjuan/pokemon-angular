import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';

@Component({
  selector: 'app-pokemon-section',
  templateUrl: './pokemon-section.component.html',
  styleUrls: ['./pokemon-section.component.scss'],
})
export class PokemonSection {
  public filteredPokemons$: Observable<IFilteredPokemons | undefined>
  constructor(
    public usePokemons: UsePokemons, 
    public useFilterPokemons: UseFilterPokemons
  ) {
    this.filteredPokemons$ = this.useFilterPokemons.filteredPokemons$
  }
}
