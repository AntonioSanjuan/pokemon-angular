import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { Output, EventEmitter } from '@angular/core';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-filterable-list',
  templateUrl: './pokemon-filterable-list.component.html',
  styleUrls: ['./pokemon-filterable-list.component.scss']
})
export class PokemonFilterableListComponent {
  public filteredPokemons$: Observable<IFilteredPokemons | undefined>
  constructor(
    public usePokemons: UsePokemons, 
    public useFilterPokemons: UseFilterPokemons,
  ) {
    this.filteredPokemons$ = this.useFilterPokemons.filteredPokemons$
  }

  @Output() public onPokemonClick: EventEmitter<IPokemon> = new EventEmitter<IPokemon>();
}
