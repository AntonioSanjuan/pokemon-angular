import { PokemonPaginationDto } from "../dtos/common/pokemonPaginationDto.model"
import { IPokemonPagination, PokemonPagination } from "./common/pokemonPagination.model"

export interface IPokemon {
    name: string
    image: string    
}

export class Pokemon implements IPokemon {
    constructor(public name: string, public image: string) {}
}

export type IPokemons = IPokemonPagination<IPokemon>

export class Pokemons extends PokemonPagination<IPokemon> implements IPokemons {
    constructor(
        pokemonPagination: PokemonPaginationDto<IPokemon>, 
        currentPage: number, 
        data: IPokemon[]
    ) {
        super(
            pokemonPagination.count,
            currentPage,
            data,
            pokemonPagination.next,
            pokemonPagination.previous
        )
    }
}