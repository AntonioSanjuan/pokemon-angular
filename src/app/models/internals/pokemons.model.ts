import { PokemonPaginationDto } from "../dtos/common/pokemonPaginationDto.model"
import { IPokemonPagination, PokemonPagination } from "./common/pokemonPagination.model"
import { PokemonType } from "./pokemonTypes.model";

export interface IPokemon {
    name: string
    image: string  
    
    weight: number;
    height: number;
    types: PokemonType[]
}

export class Pokemon implements IPokemon {
    constructor(
        public name: string, 
        public image: string,
        public weight: number,
        public height: number,
        public types: PokemonType[],
    ) {}
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