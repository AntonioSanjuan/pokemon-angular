import { Component, Input, OnInit } from '@angular/core';
import { IChartOptions } from 'src/app/models/internals/chartOptions.model';
import { IPokemon } from 'src/app/models/internals/pokemons.model';
import { ChartOptionsFactory } from 'src/app/utils/tests/factories/chartOptions.factory';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit{
  @Input() data!: IPokemon;

  public chartOptions!: IChartOptions;

  ngOnInit(): void {
    this.chartOptions = ChartOptionsFactory.getRadarChartOptions([this.data])
  }
}
