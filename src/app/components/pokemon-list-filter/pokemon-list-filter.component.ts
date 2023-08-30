import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { collapseAnimation } from 'src/app/animations/collapse/collapse.animation';
import { rotateAnimation } from 'src/app/animations/rotate/rotate.animation';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';

@Component({
  selector: 'app-pokemon-list-filter',
  templateUrl: './pokemon-list-filter.component.html',
  styleUrls: ['./pokemon-list-filter.component.scss'],
  animations: [collapseAnimation, rotateAnimation]
})
export class PokemonListFilterComponent implements OnInit, OnDestroy {
  constructor(
    public usePokemonTypes: UsePokemonTypes, 
    public useFilteredPokemons: UseFilterPokemons
  ) {}

  private subscriptions: Subscription[] = []
  collapsed = true;
  filterByName!: string;

  ngOnInit(): void {
    this.subscriptions.push(this.useFilteredPokemons.filteredPokemons$.subscribe((filteredPokemons) => {
      if(filteredPokemons) {
        this.collapsed = false;

        if(filteredPokemons?.byName) {
          this.filterByName = filteredPokemons?.byName
        }
      }

    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    });
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }
}
