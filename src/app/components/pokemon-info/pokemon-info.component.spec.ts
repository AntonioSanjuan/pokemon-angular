import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonInfoComponent } from './pokemon-info.component';
import { IPokemon } from 'src/app/models/internals/pokemons.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';

describe('PokemonInfoComponent', () => {
  let component: PokemonInfoComponent;
  let fixture: ComponentFixture<PokemonInfoComponent>;
  let inputPokemonData: IPokemon

  beforeEach(() => {
    inputPokemonData = {
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

    TestBed.configureTestingModule({
      declarations: [PokemonInfoComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(PokemonInfoComponent);
    component = fixture.componentInstance;
    component.pokemon = inputPokemonData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
