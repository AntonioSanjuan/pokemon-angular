import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { collapseAnimation } from 'src/app/animations/collapse/collapse.animation';
import { rotateAnimation } from 'src/app/animations/rotate/rotate.animation';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';

@Component({
  selector: 'app-pokemon-list-filter',
  templateUrl: './pokemon-list-filter.component.html',
  styleUrls: ['./pokemon-list-filter.component.scss'],
  animations: [collapseAnimation, rotateAnimation]
})
export class PokemonListFilterComponent implements OnChanges {
  constructor(
    public usePokemonTypes: UsePokemonTypes, 
  ) {}
  @Input() filteredPokemons: IFilteredPokemons | undefined;
  @Output() filterByNameEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterByTypeEvent: EventEmitter<string> = new EventEmitter<string>();

  collapsed = true;
  filterByName!: string;

 ngOnChanges() {
    if(this.filteredPokemons) {
      this.collapsed = false;

      if(this.filteredPokemons.byName) {
        this.filterByName = this.filteredPokemons.byName
      }
    }
   }	

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }
}
