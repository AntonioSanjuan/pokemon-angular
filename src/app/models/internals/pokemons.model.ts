import { Adapter } from "src/app/adapters/common/adapter"
import { PokemonPaginationDto } from "../dtos/common/pokemonPaginationDto.model"
import { IPokemonPagination, PokemonPagination } from "./common/pokemonPagination.model"
import { PokemonDto } from "../dtos/pokemonDto.model"

export type IPokemons = IPokemonPagination<IPokemon>

export class Pokemons extends PokemonPagination<IPokemon> {
    constructor(
        pokemonPagination: PokemonPaginationDto<any>, 
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


export interface IPokemon {
    name: string
    image: string    
}

export class Pokemon implements IPokemon {
    public name: string
    public image: string 

    constructor(name: string, image: string){
        this.name = name;
        this.image = image;
    }

    adapt(item: PokemonDto): Pokemon {
        return new Pokemon(
            item.name, item.sprites.front_default
        )
    }
}