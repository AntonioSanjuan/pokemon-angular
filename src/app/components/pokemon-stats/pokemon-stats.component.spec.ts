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
    fixture = TestBed.createComponent(PokemonStatsComponent);
    component = fixture.componentInstance;
    component.data = inputPokemonData;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initially should request ChartOptionsFactory.getRadarChartOptions', () => {
    const getRadarChartOptionsOutput: Partial<IChartOptions> = {
      series: []
    };
    const getRadarChartOptionsSpy = jest.spyOn(ChartOptionsFactory, 'getRadarChartOptions').mockReturnValue(getRadarChartOptionsOutput as IChartOptions)

    component.ngOnInit()
    expect(getRadarChartOptionsSpy).toHaveBeenCalledWith([inputPokemonData]);
    expect(component.chartOptions).toEqual(getRadarChartOptionsOutput as IChartOptions);
  });
});
