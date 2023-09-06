import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFilterComponent } from '../pokemon-filter/pokemon-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonSectionDetails } from './pokemon-section-details.component';
import { UseDetailedPokemons } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service';
import { UseDetailedPokemonsMock, UseDetailedPokemonsMockReset } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { routesMock } from 'src/app/modules/routing/routing.mock';
import { ActivatedRoute } from '@angular/router';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
import { GoBackComponent } from '../common/go-back/go-back.component';
import { PokemonDetails } from 'src/app/models/internals/common/pokemonDetailed.model';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { UsePopUp } from 'src/app/hooks/usePopUp/usePopUp.service';
import { UsePopUpMock, UsePopUpMockReset } from 'src/app/hooks/usePopUp/usePopUp.service.mock';
import { PokemonInfoComponent } from '../pokemon-info/pokemon-info.component';
import { HomeModule } from 'src/app/pages/home/home.module';

describe('PokemonSectionDetails', () => {
  let component: PokemonSectionDetails;
  let fixture: ComponentFixture<PokemonSectionDetails>;
  const pokemonsDeailsResolver = {
    data: [
      {
        id: 1,
        name: 'pokemonName_1',
        images: {
          normal: 'pokemonNormalImage_1',
          shiny: 'pokemonShinyImage_1'
        },      weight: 1,
        height: 1,
        types: [],
        moves: [
          'move0',
          'move1'
        ],
        stats: {
          specialAttack: 1,
          specialDefense: 2,
          defense: 3,
          attack: 4,
          hp: 5,
          speed: 6
        }
      },
    ]
  } as IDetailedPokemons
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonSectionDetails, 
        GoBackComponent ,
        PokemonDetailsComponent, 
      ],
      imports: [
        SharedModule,
        HomeModule,
        RouterTestingModule.withRoutes(routesMock)
      ],
      providers: [
        {
          provide: UsePopUp,
          useValue: UsePopUpMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                pokemonsDeailsResolver: pokemonsDeailsResolver
              }
            }
          },
        },
      ],
    });
    fixture = TestBed.createComponent(PokemonSectionDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    UseDetailedPokemonsMockReset();
    UsePopUpMockReset();
  })
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
