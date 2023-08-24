import { Component } from '@angular/core';
import { collapseAnimation } from 'src/app/animations/collapse/collapse.animation';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';

@Component({
  selector: 'app-pokemon-list-filter',
  templateUrl: './pokemon-list-filter.component.html',
  styleUrls: ['./pokemon-list-filter.component.scss'],
  animations: [collapseAnimation]
})
export class PokemonListFilterComponent {
  constructor(
    public usePokemonTypes: UsePokemonTypes, 
    public useFilteredPokemons: UseFilterPokemons
  ) {}

  collapsed = true;
  filterByName!: string;
  
  toggle() {
    this.collapsed = !this.collapsed;
  }
}
