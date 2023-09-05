import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { UsePokemonsMock, UsePokemonsMockReset } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { PokemonFilterComponent } from '../pokemon-filter/pokemon-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock, UsePokemonTypesMockReset } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.mock';
import { UseFilterPokemonsMock, UseFilterPokemonsMockReset } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonSection } from './pokemon-section.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { mockGetter } from 'src/app/utils/tests/commonMocks';
import { PokemonFilterableListComponent } from '../pokemon-filterable-list/pokemon-filterable-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PokemonSection', () => {
  let component: PokemonSection;
  let fixture: ComponentFixture<PokemonSection>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonSection, 
        PokemonListComponent, 
        PokemonFilterComponent, 
        PokemonFilterableListComponent,
        PokemonTypePillDirective, 
        IntersectionObserverDirective
      ],
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
      ],
    });
    fixture = TestBed.createComponent(PokemonSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    UsePokemonsMockReset()
    UseFilterPokemonsMockReset();
    UsePokemonTypesMockReset();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
