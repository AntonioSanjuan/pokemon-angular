import { Component } from '@angular/core';
import { collapseAnimation } from 'src/app/animations/collapse/collapse.animation';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';

@Component({
  selector: 'app-pokemon-list-filter',
  templateUrl: './pokemon-list-filter.component.html',
  styleUrls: ['./pokemon-list-filter.component.scss'],
  animations: [collapseAnimation]
})
export class PokemonListFilterComponent {
  constructor(public usePokemonTypes: UsePokemonTypes) {}
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
