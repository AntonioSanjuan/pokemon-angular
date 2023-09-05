import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatsComponent } from './pokemon-stats.component';
import { IPokemon } from 'src/app/models/internals/pokemons.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ChartOptionsFactory } from 'src/app/utils/tests/factories/chartOptions.factory';
import { IChartOptions } from 'src/app/models/internals/chartOptions.model';

describe('PokemonStatsComponent', () => {
  let component: PokemonStatsComponent;
  let inputPokemonData: IPokemon
  let fixture: ComponentFixture<PokemonStatsComponent>;

  let getRadarChartOptionsSpy: jest.SpyInstance;
  const getRadarChartOptionsOutput: Partial<IChartOptions> = {
    series: []
  };

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
      declarations: [PokemonStatsComponent],
      imports: [SharedModule]
    });

    getRadarChartOptionsSpy = jest.spyOn(ChartOptionsFactory, 'getRadarChartOptions').mockReturnValue(getRadarChartOptionsOutput as IChartOptions)

    
    fixture = TestBed.createComponent(PokemonStatsComponent);
    component = fixture.componentInstance;
    component.pokemons = [inputPokemonData];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('once onChanges is triggered, ChartOptionsFactory.getRadarChartOptions should be requested', () => {
    const newPokemonSut = [
      {
        ...inputPokemonData,
        id: 2
      }
    ]
    component.pokemons = newPokemonSut
    component.ngOnChanges()
    
    expect(getRadarChartOptionsSpy).toHaveBeenCalledWith(newPokemonSut);
    expect(component.chartOptions).toEqual(getRadarChartOptionsOutput as IChartOptions);
  });
});
