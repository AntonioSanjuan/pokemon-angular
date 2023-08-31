import { PokemonPaginationDto } from "../dtos/common/pokemonPaginationDto.model"
import { IPokemonPagination, PokemonPagination } from "./common/pokemonPagination.model"
import { IPokemonImages } from "./pokemonImages.model";
import { IPokemonStats, PokemonStats } from "./pokemonStats.model";
import { IPokemonType, PokemonType } from "./pokemonTypes.model";

export interface IPokemon {
    id: number;
    name: string
    images: IPokemonImages  
    
    weight: number;
    height: number;
    types: IPokemonType[]
    stats: IPokemonStats
    moves: string[]
}

export class Pokemon implements IPokemon {
    constructor(
        public id: number,
        public name: string, 
        public images: IPokemonImages,
        public weight: number,
        public height: number,
        public types: IPokemonType[],
        public moves: string[],
        public stats: IPokemonStats
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