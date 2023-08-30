import { IPokemonFilter, PokemonFilter } from "./common/pokemonFiltered.model";
import { IPokemon } from "./pokemons.model";


export type IFilteredPokemons = IPokemonFilter<IPokemon>

export class FilteredPokemons extends PokemonFilter<IPokemon> implements IFilteredPokemons {
    constructor(
        data: IPokemon[],
        byNameOrId?: string, 
        byType?: string, 
    ) {
        super(
            data,
            byNameOrId,
            byType,
        )
    }
}