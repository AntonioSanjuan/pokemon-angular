import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonSectionDetails } from './pokemon-section-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routesMock } from 'src/app/modules/routing/routing.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
import { GoBackComponent } from '../common/go-back/go-back.component';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { UsePopUp } from 'src/app/hooks/usePopUp/usePopUp.service';
import { UsePopUpMock, UsePopUpMockReset } from 'src/app/hooks/usePopUp/usePopUp.service.mock';
import { HomeModule } from 'src/app/pages/home/home.module';
import { IPokemon } from 'src/app/models/internals/pokemons.model';
import { of } from 'rxjs';

describe('PokemonSectionDetails', () => {
  let component: PokemonSectionDetails;
  let fixture: ComponentFixture<PokemonSectionDetails>;
  let router: Router;
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
  } as IDetailedPokemons;

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
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  afterEach(() => {
    UsePopUpMockReset();
  })
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addPokemonComparison subscribe to usePopUp open, once the subscription triggers, if pokemon is returned, should navigate', () => {
    const inputPokemon = {
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
    } as IPokemon;
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true)
    jest.spyOn(UsePopUpMock, 'open').mockReturnValue(of(inputPokemon))
    
    component.addPokemonComparison()


    expect(navigateSpy).toHaveBeenCalledWith([`${router.url}-vs-${inputPokemon.name}`], { replaceUrl: true })
  });

  it('removePokemonComparison should navigate without vs-{pokemon} url', () => {
    Object.defineProperty(router, 'url', {
      value: 'a-vs-b'
    })
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true)
    
    component.removePokemonComparison()

    expect(navigateSpy).toHaveBeenCalledWith([`a`], { replaceUrl: true })
  });
});
