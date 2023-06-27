import { Component } from '@angular/core';
import { collapseAnimation } from 'src/app/animations/collapse/collapse.animation';

@Component({
  selector: 'app-pokemon-list-filter',
  templateUrl: './pokemon-list-filter.component.html',
  styleUrls: ['./pokemon-list-filter.component.scss'],
  animations: [collapseAnimation]
})
export class PokemonListFilterComponent {
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
