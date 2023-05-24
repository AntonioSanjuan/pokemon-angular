import { MinifiedPokemonDto, PokemonsDto } from "src/app/models/dtos/pokemonsDto.model"
import { Pokemon, Pokemons } from "src/app/models/internals/pokemons.model";


const pokemonMapperFn = (pokemon: MinifiedPokemonDto): Pokemon => (
    {} as Pokemon
)

export function PokemonsMapper(pokemons: PokemonsDto, page: number): Pokemons{
    const mapperOutput: Pokemons = {
        numberOfElements: pokemons.count,
        currentPage: page,
        prevPage: pokemons.previous,
        nextPage: pokemons.next,
        data: pokemons.results.map(pokemonMapperFn)
    }

    return mapperOutput;
}