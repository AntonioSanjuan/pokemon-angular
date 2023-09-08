import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonSection } from './pokemon-section.component';
import { PokemonFilterableListComponent } from '../pokemon-filterable-list/pokemon-filterable-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { routesMock } from 'src/app/modules/routing/routing.mock';
import { Router } from '@angular/router';
import { HomeModule } from 'src/app/pages/home/home.module';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

describe('PokemonSection', () => {
  let component: PokemonSection;
  let fixture: ComponentFixture<PokemonSection>;
  let router: Router

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonSection, 
        PokemonFilterableListComponent,
      ],
      imports: [
        HomeModule,
        SharedModule,
        RouterTestingModule.withRoutes(routesMock)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(PokemonSection);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  afterEach(() => {
    // UseFilterPokemonsMockReset();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true)

    component.goToPokemonDetails(inputPokemon)

    expect(navigateSpy).toHaveBeenCalledWith([`/home/${inputPokemon?.name}`])
  });
});
