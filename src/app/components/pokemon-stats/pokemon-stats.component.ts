import { Component, Input, OnChanges } from '@angular/core';
import { IChartOptions } from 'src/app/models/internals/chartOptions.model';
import { IPokemon } from 'src/app/models/internals/pokemons.model';
import { ChartOptionsFactory } from 'src/app/utils/tests/factories/chartOptions.factory';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnChanges{
  @Input() pokemons!: IPokemon[];

  public chartOptions?: IChartOptions;

  ngOnChanges(): void {
    if(this.pokemons) {
      this.chartOptions = ChartOptionsFactory.getRadarChartOptions(this.pokemons)
    }
  }
}
