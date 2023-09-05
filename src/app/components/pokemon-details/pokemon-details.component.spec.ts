import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { IPokemon } from 'src/app/models/internals/pokemons.model';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
import { PokemonInfoComponent } from '../pokemon-info/pokemon-info.component';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;

  let inputDetailedPokemons: IDetailedPokemons;

  beforeEach(() => {
    inputDetailedPokemons = {
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
        }
      ]
    } as IDetailedPokemons;

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        PokemonDetailsComponent, 
        PokemonStatsComponent,
        PokemonInfoComponent
      ]
    });
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    component.pokemons= inputDetailedPokemons
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
