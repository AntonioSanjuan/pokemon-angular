import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { UsePokemonsMock, UsePokemonsMockReset } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { PokemonListFilterComponent } from '../pokemon-list-filter/pokemon-list-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.mock';
import { UseFilterPokemonsMock, UseFilterPokemonsMockReset } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonSectionDetails } from './pokemon-section-details.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { mockGetter } from 'src/app/utils/tests/commonMocks';
import { UseDetailedPokemons } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service';
import { UseDetailedPokemonsMock } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { routesMock } from 'src/app/modules/routing/routing.mock';

describe('PokemonSectionDetails', () => {
  let component: PokemonSectionDetails;
  let fixture: ComponentFixture<PokemonSectionDetails>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonSectionDetails, PokemonListComponent, PokemonListFilterComponent, PokemonTypePillDirective, IntersectionObserverDirective],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes(routesMock)
      ],
      providers: [
        {
          provide: UseDetailedPokemons,
          useValue: UseDetailedPokemonsMock
        },
      ],
    });
    fixture = TestBed.createComponent(PokemonSectionDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();

    UsePokemonsMockReset();
    UseFilterPokemonsMockReset();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
