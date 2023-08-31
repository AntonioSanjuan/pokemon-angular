import { IChartOptions } from "src/app/models/internals/chartOptions.model";
import { IPokemon } from "src/app/models/internals/pokemons.model";

export class ChartOptionsFactory {
    static getRadarChartOptions(pokemons: IPokemon[]): IChartOptions {
        const chartName = pokemons.map((pokemon) => {return pokemon.name}).join(' vs ')

        return {
            series: pokemons.map((pokemon) => {
                return {
                    name: pokemon.name,
                    data: [
                        pokemon.stats.hp,
                        pokemon.stats.attack,
                        pokemon.stats.defense,
                        pokemon.stats.specialAttack,
                        pokemon.stats.specialDefense,
                        pokemon.stats.speed,
                    ]
                }
            }),
            chart: {
              height: 350,
              type: "radar",
              dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
              }
            },
            title: {
              text: chartName
            },
            stroke: {
              width: 0
            },
            fill: {
              opacity: 0.4
            },
            xaxis: {
              categories: ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"]
            }
          } as IChartOptions
    }
}