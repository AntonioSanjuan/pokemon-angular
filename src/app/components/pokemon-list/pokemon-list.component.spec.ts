import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { UsePokemonsMock } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { PokemonListFilterComponent } from '../pokemon-list-filter/pokemon-list-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.mock';
import { UseFilterPokemonsMock } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListComponent, PokemonListFilterComponent, PokemonTypePillDirective, IntersectionObserverDirective],
      imports: [SharedModule],
      providers: [
        {
          provide: UseFilterPokemons,
          useValue: UseFilterPokemonsMock
        },
        {
          provide: UsePokemons,
          useValue: UsePokemonsMock
        },
        {
          provide: UsePokemonTypes,
          useValue: UsePokemonTypesMock
        },
      ]
    });
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
