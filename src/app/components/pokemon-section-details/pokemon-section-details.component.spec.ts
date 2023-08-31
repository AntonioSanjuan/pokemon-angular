import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePokemonsMockReset } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { PokemonListFilterComponent } from '../pokemon-list-filter/pokemon-list-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { UseFilterPokemonsMockReset } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonSectionDetails } from './pokemon-section-details.component';
import { Observable, of } from 'rxjs';
import { UseDetailedPokemons } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service';
import { UseDetailedPokemonsMock } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { routesMock } from 'src/app/modules/routing/routing.mock';
import { ActivatedRoute } from '@angular/router';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';

describe('PokemonSectionDetails', () => {
  let component: PokemonSectionDetails;
  let fixture: ComponentFixture<PokemonSectionDetails>;
  const pokemonNameParam = 'pokemonNameParamTest';

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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                pokemonName: pokemonNameParam
              }
            }
          },
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

  it('initially should request ChartOptionsFactory.getRadarChartOptions', () => {
    const getDetailedPokemonOutput: Observable<IDetailedPokemons | undefined> = of({} as IDetailedPokemons)
    const getDetailedPokemonSpy = jest.spyOn(UseDetailedPokemonsMock, 'getDetailedPokemon').mockReturnValue(getDetailedPokemonOutput)

    expect(getDetailedPokemonSpy).toHaveBeenCalledWith(pokemonNameParam);
  });
});
