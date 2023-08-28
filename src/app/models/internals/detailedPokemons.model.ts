import { IPokemonDetails, PokemonDetails } from "./common/pokemonDetailed.model";
import { IPokemon } from "./pokemons.model";


export type IDetailedPokemons = IPokemonDetails<IPokemon>

export class DetailedPokemons extends PokemonDetails<IPokemon> implements IDetailedPokemons {
    constructor(
        data: IPokemon[],
    ) {
        super(
            data
        )
    }
}